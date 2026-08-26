/*
 * 내려받는 결과 파일 검증
 * 1) HTML 리포트가 실제로 받아지고, 새 탭에서 열었을 때 화면과 같은 내용이 보이는가
 * 2) 원자료 JSON이 파싱되고 필요한 칸이 다 있는가
 * 3) HTML 안에 원자료가 함께 들어 있는가
 */
const { chromium } = require("playwright");
const http = require("http");
const path = require("path");
const fs = require("fs");
const assert = require("assert");
const { METACOG_ITEMS } = require("./items.js");

const OUT = "/tmp/metacog-downloads";
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };

/* 학생은 포털 주소(http)로 접속한다. 파일로 직접 열면 브라우저가 내려받기
 * 파일 이름과 스타일시트 읽기를 다르게 다루므로, 실제와 같은 조건에서 검사한다. */
function serve(directory) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const name = req.url === "/" ? "/index.html" : req.url.split("?")[0];
      const target = path.join(directory, path.normalize(name).replace(/^(\.\.[/\\])+/, ""));
      fs.readFile(target, (error, data) => {
        if (error) return res.writeHead(404).end();
        res.writeHead(200, { "Content-Type": MIME[path.extname(target)] || "text/plain" });
        res.end(data);
      });
    });
    server.listen(0, () => resolve({ server, port: server.address().port }));
  });
}

(async () => {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const { server, port } = await serve(__dirname);
  const BASE = "http://127.0.0.1:" + port + "/";

  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
  });
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    acceptDownloads: true
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));

  await page.goto(BASE);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click("#startBtn");
  await page.waitForTimeout(120);

  for (let i = 0; i < METACOG_ITEMS.length; i += 1) {
    await page.locator(".choice-btn").nth(i % 4).click();
    await page.locator(".conf-btn").nth(i % 2 === 0 ? 3 : 1).click();
    await page.click("#nextBtn");
    await page.waitForTimeout(30);
  }
  await page.waitForSelector("#reportView:not([hidden])");
  await page.waitForTimeout(200);

  const liveProfile = await page.$eval("#profileName", (n) => n.textContent);
  const liveStats = await page.$$eval(".stat-tile .stat-value", (ns) => ns.map((n) => n.textContent));
  const liveCards = await page.$$eval(".counsel-title", (ns) => ns.map((n) => n.textContent));

  async function grab(selector) {
    const [download] = await Promise.all([page.waitForEvent("download"), page.click(selector)]);
    const target = path.join(OUT, download.suggestedFilename());
    await download.saveAs(target);
    return target;
  }

  const htmlPath = await grab("#downloadBtn");
  const jsonPath = await grab("#rawBtn");

  let passed = 0;
  const check = (name, fn) => {
    fn();
    passed += 1;
    console.log("  ok  " + name);
  };

  // 한글 파일명은 크로미움이 통째로 버리고 확장자 없는 "download"로 저장한다.
  // 확장자가 살아 있어야 학생이 파일을 열 수 있으므로 아스키 이름을 강제한다.
  check("파일 이름이 아스키이고 확장자가 살아 있다", () => {
    assert.match(path.basename(htmlPath), /^metacognition-report-\d{4}-\d{2}-\d{2}\.html$/);
    assert.match(path.basename(jsonPath), /^metacognition-raw-\d{4}-\d{2}-\d{2}\.json$/);
  });

  const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  check("원자료 JSON에 필요한 칸이 다 있다", () => {
    assert.strictEqual(rawJson.responses.length, METACOG_ITEMS.length);
    assert.ok(rawJson.itemSetVersion && rawJson.completedAt);
    ["n", "accuracy", "confidence", "bias", "discrimination", "profileKey"].forEach((key) => {
      assert.ok(key in rawJson.summary, key + " 없음");
    });
  });

  const htmlText = fs.readFileSync(htmlPath, "utf8");
  check("HTML 리포트에 원자료가 함께 들어 있다", () => {
    const match = htmlText.match(/<script type="application\/json" id="metacog-raw">([\s\S]*?)<\/script>/);
    assert.ok(match, "원자료 블록 없음");
    const embedded = JSON.parse(
      match[1].replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\u0026/g, "&")
    );
    assert.deepStrictEqual(embedded.summary, rawJson.summary);
  });

  check("조작용 버튼은 리포트에서 빠졌다", () => {
    assert.doesNotMatch(htmlText, /id="retryBtn"|id="downloadBtn"|id="toggleTableBtn"/);
  });

  // 받은 파일을 실제로 열어 본다
  const viewer = await context.newPage();
  const viewerErrors = [];
  viewer.on("pageerror", (e) => viewerErrors.push(String(e.message)));
  await viewer.goto("file://" + htmlPath);
  await viewer.waitForTimeout(200);

  const savedProfile = await viewer.$eval("#profileName", (n) => n.textContent);
  const savedStats = await viewer.$$eval(".stat-tile .stat-value", (ns) => ns.map((n) => n.textContent));
  const savedCards = await viewer.$$eval(".counsel-title", (ns) => ns.map((n) => n.textContent));
  const savedRows = await viewer.$$eval(".item-table tbody tr", (ns) => ns.length);
  const chartCount = await viewer.$$eval(".chart-holder svg", (ns) => ns.length);
  const tableVisible = await viewer.$eval("#itemTableHolder", (n) => !n.hidden);
  const styled = await viewer.$eval("body", (n) => getComputedStyle(n).backgroundColor);

  check("받은 파일의 내용이 화면과 같다", () => {
    assert.strictEqual(savedProfile, liveProfile);
    assert.deepStrictEqual(savedStats, liveStats);
    assert.deepStrictEqual(savedCards, liveCards);
    assert.ok(savedCards.length > 0, "상담 카드가 하나도 없다");
  });

  check("차트와 문항별 기록이 펼쳐진 채로 들어 있다", () => {
    assert.strictEqual(chartCount, 2, "차트 " + chartCount + "개");
    assert.strictEqual(savedRows, METACOG_ITEMS.length);
    assert.strictEqual(tableVisible, true, "문항별 기록이 접혀 있다");
  });

  check("스타일이 살아 있다 (배경이 흰색 기본값이 아님)", () => {
    assert.notStrictEqual(styled, "rgba(0, 0, 0, 0)");
    assert.notStrictEqual(styled, "rgb(255, 255, 255)");
  });

  check("열 때 오류가 없다", () => {
    assert.deepStrictEqual(errors, []);
    assert.deepStrictEqual(viewerErrors, []);
  });

  /* 인쇄하면 흰 종이에 흰 글씨가 되는 곳이 없어야 한다.
   * 화면이 어두운 바탕이라 그냥 두면 반드시 생기는 문제다. */
  await viewer.emulateMedia({ media: "print" });
  await viewer.waitForTimeout(150);
  const faint = await viewer.evaluate(() => {
    function luminance(color) {
      const parts = (color.match(/[\d.]+/g) || []).map(Number);
      if (parts.length < 3) return null;
      if (parts.length > 3 && parts[3] === 0) return null; // 투명은 검사 대상 아님
      return (0.2126 * parts[0] + 0.7152 * parts[1] + 0.0722 * parts[2]) / 255;
    }
    const problems = [];
    document.querySelectorAll("body *").forEach((node) => {
      const text = (node.textContent || "").trim();
      if (!text || node.children.length) return;
      const ink =
        node.namespaceURI === "http://www.w3.org/2000/svg"
          ? getComputedStyle(node).fill
          : getComputedStyle(node).color;
      const level = luminance(ink);
      if (level !== null && level > 0.75) problems.push(text.slice(0, 20) + " → " + ink);
    });
    return problems;
  });
  check("인쇄 모드에서 흰 종이에 흰 글씨가 없다", () => {
    assert.deepStrictEqual(faint, [], "밝은 글씨: " + faint.join(" / "));
  });
  await viewer.emulateMedia({ media: "screen" });

  await viewer.screenshot({ path: path.join(__dirname, "shot-export.png"), fullPage: true });
  console.log("\n" + passed + "개 검사 통과 · " + Math.round(htmlText.length / 1024) + "KB");
  await browser.close();
  server.close();
})();
