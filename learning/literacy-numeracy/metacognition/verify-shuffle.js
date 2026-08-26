/*
 * 선택지 섞기 검증 (브라우저 실주행)
 * 1) 화면에 보이는 글자만 보고 정답을 골랐을 때 리포트가 정답률 100%로 나오는가
 *    → 섞인 화면 번호 → 원래 번호 되돌리기가 맞는지 확인
 * 2) 일부러 오답만 골랐을 때 0%로 나오는가
 * 3) 두 번 실행하면 선택지 순서가 달라지는가
 */
const { chromium } = require("playwright");
const path = require("path");
const assert = require("assert");
const { METACOG_ITEMS } = require("./items.js");

const PAGE = "file://" + path.join(__dirname, "index.html");

async function run(page, pickCorrect) {
  const seenOrders = [];
  await page.goto(PAGE);
  await page.evaluate(() => localStorage.clear());
  await page.goto(PAGE);
  await page.click("#startBtn");
  await page.waitForTimeout(120);

  for (let i = 0; i < METACOG_ITEMS.length; i += 1) {
    const item = METACOG_ITEMS[i];
    const texts = await page.$$eval(".choice-btn", (nodes) =>
      nodes.map((node) => node.lastChild.textContent)
    );
    assert.strictEqual(texts.length, item.choices.length, item.id + " 선택지 개수");
    assert.deepStrictEqual(
      texts.slice().sort(),
      item.choices.slice().sort(),
      item.id + " 선택지 내용이 그대로 나와야 함"
    );
    seenOrders.push(texts.join("|"));

    const correctText = item.choices[item.answer];
    const target = pickCorrect
      ? texts.indexOf(correctText)
      : texts.findIndex((text) => text !== correctText);
    await page.locator(".choice-btn").nth(target).click();
    await page.locator(".conf-btn").nth(3).click(); // 확실해요
    await page.click("#nextBtn");
    await page.waitForTimeout(40);
  }

  await page.waitForSelector("#reportView:not([hidden])");
  const accuracy = await page.$eval(".stat-tile .stat-value", (node) => node.textContent);
  return { accuracy, seenOrders };
}

(async () => {
  const browser = await chromium.launch({
    executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
  });
  const page = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));

  const allCorrect = await run(page, true);
  assert.strictEqual(allCorrect.accuracy, "100%", "정답만 골랐는데 정답률이 " + allCorrect.accuracy);
  console.log("  ok  화면 글자만 보고 정답을 고르면 정답률 100%");

  const allWrong = await run(page, false);
  assert.strictEqual(allWrong.accuracy, "0%", "오답만 골랐는데 정답률이 " + allWrong.accuracy);
  console.log("  ok  오답만 고르면 정답률 0%");

  const second = await run(page, true);
  const changed = second.seenOrders.filter(
    (order, index) => order !== allCorrect.seenOrders[index]
  ).length;
  assert.ok(
    changed >= METACOG_ITEMS.length * 0.5,
    `순서가 바뀐 문항이 ${changed}/${METACOG_ITEMS.length}개뿐 — 섞이지 않는다`
  );
  console.log(`  ok  다시 풀면 선택지 순서가 바뀐다 (${changed}/${METACOG_ITEMS.length}문항)`);

  assert.deepStrictEqual(errors, [], "브라우저 오류: " + errors.join(", "));
  console.log("  ok  브라우저 오류 없음");
  console.log("\n4개 검사 통과");
  await browser.close();
})();
