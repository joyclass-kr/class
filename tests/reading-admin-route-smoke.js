"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");
const { spawn } = require("node:child_process");

const root = path.join(__dirname, "..");
const serverRoot = path.join(root, "game-hub-server");
const port = 24500 + Math.floor(Math.random() * 500);

function waitForServer(child) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Server startup timed out.")), 8000);
    let errors = "";
    child.stderr.on("data", (chunk) => { errors += chunk.toString(); });
    child.stdout.on("data", (chunk) => {
      if (!chunk.toString().includes("listening on port")) return;
      clearTimeout(timer);
      resolve();
    });
    child.once("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Server exited early (${code}). ${errors}`));
    });
  });
}

async function run() {
  const child = spawn(process.execPath, [path.join(serverRoot, "server.js")], {
    cwd: serverRoot,
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: "test",
      DATABASE_URL: "",
      GOOGLE_CLIENT_ID: ""
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  try {
    await waitForServer(child);
    const base = `http://127.0.0.1:${port}`;
    const [page, script, style, pilotPage, pilotScript, studentPage, studentScript, studentDeck, selfStudy, config] = await Promise.all([
      fetch(`${base}/admin/reading/`),
      fetch(`${base}/admin/reading/app.js`),
      fetch(`${base}/admin/reading/style.css`),
      fetch(`${base}/admin/reading/pilots.html`),
      fetch(`${base}/admin/reading/pilots.js`),
      fetch(`${base}/learning/literacy-numeracy/reading/`),
      fetch(`${base}/learning/literacy-numeracy/reading/app.js`),
      fetch(`${base}/learning/literacy-numeracy/reading/deck.js`),
      fetch(`${base}/api/reading/self-study`),
      fetch(`${base}/api/auth/config`)
    ]);
    const [legacyBasics, legacyAcademics, legacyStoryBooks] = await Promise.all([
      fetch(`${base}/learning/basics/reading/`, { redirect: "manual" }),
      fetch(`${base}/learning/academics/body-explorer/`, { redirect: "manual" }),
      fetch(`${base}/learning/academics/story-books/korea-tales/`, { redirect: "manual" }),
    ]);
    assert.equal(legacyBasics.status, 308);
    assert.equal(legacyBasics.headers.get("location"), "/learning/literacy-numeracy/reading/");
    assert.equal(legacyAcademics.status, 308);
    assert.equal(legacyAcademics.headers.get("location"), "/learning/inquiry/body-explorer/");
    assert.equal(legacyStoryBooks.status, 308);
    assert.equal(legacyStoryBooks.headers.get("location"), "/learning/literacy-numeracy/story-books/korea-tales/");
    assert.equal(page.status, 200);
    assert.equal(script.status, 200);
    assert.equal(style.status, 200);
    assert.equal(pilotPage.status, 200);
    assert.equal(pilotScript.status, 200);
    assert.equal(studentPage.status, 200);
    assert.equal(studentScript.status, 200);
    assert.equal(studentDeck.status, 200);
    assert.equal(selfStudy.status, 200);
    assert.equal(config.status, 200);
    assert.match(await page.text(), /독해 문제 검수실/);
    assert.match(await script.text(), /\/api\/reading\/admin\/items/);
    assert.match(await style.text(), /\.workbench/);
    assert.match(await pilotPage.text(), /실전 응답 수집/);
    assert.match(await pilotScript.text(), /\/api\/reading\/admin\/pilots/);
    assert.match(await studentPage.text(), /독해 자습/);
    assert.match(await studentScript.text(), /\/api\/reading\/self-study/);
    assert.match(await studentDeck.text(), /ReadingQuestionDeck/);
    assert.ok((await selfStudy.json()).items.length > 0);
    const configuration = await config.json();
    assert.equal(configuration.enabled, false);
    console.log("Reading admin route smoke: OK");
  } finally {
    child.kill();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
