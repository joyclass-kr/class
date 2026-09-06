// data/exams/*.js를 읽어 data/index.js(차례표)를 다시 만든다.
// 문항을 더하거나 고친 뒤에 이것을 돌린다. 차례표가 실제 문항과 어긋나면 개수 표시가 거짓말을 한다.
//   node tools/rebuild-index.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const DATA = path.join(ROOT, "data");
const EXAMS = path.join(DATA, "exams");

const context = { window: {}, console, String };
vm.createContext(context);

// 지금 차례표에서 단원표와 회차표를 가져온다. 이 둘은 손으로 적는 자료다.
vm.runInContext(fs.readFileSync(path.join(DATA, "index.js"), "utf8"), context, { filename: "index.js" });
const { units, exams } = context.window.CSAT_MATH;

for (const file of fs.readdirSync(EXAMS).sort()) {
    vm.runInContext(fs.readFileSync(path.join(EXAMS, file), "utf8"), context, { filename: file });
}

const LIST_KEYS = ["id", "exam", "no", "score", "units"];
const problems = [];
const seen = new Set();
for (const exam of exams) {
    const part = context.window.CSAT_MATH_PART[exam.id];
    if (!part) throw new Error(`${exam.id} 회차 파일이 없습니다.`);
    for (const problem of part) {
        if (seen.has(problem.id)) throw new Error(`문항 번호가 겹칩니다: ${problem.id}`);
        seen.add(problem.id);
        if (problem.exam !== exam.id) throw new Error(`${problem.id}의 회차가 파일과 다릅니다.`);
        for (const key of ["no", "score", "units", "body", "answer"]) {
            if (problem[key] === undefined) throw new Error(`${problem.id}에 ${key}가 없습니다.`);
        }
        const row = {};
        for (const key of LIST_KEYS) row[key] = problem[key];
        problems.push(row);
    }
}

const extra = Object.keys(context.window.CSAT_MATH_PART).filter((id) => !exams.some((exam) => exam.id === id));
if (extra.length) throw new Error(`회차표에 없는 파일이 있습니다: ${extra.join(", ")}`);

fs.writeFileSync(path.join(DATA, "index.js"), `// 고르고 세는 데 필요한 칸만 담은 차례표.
// 문제 본문과 풀이는 회차를 고를 때 data/exams/<회차>.js로 따로 받는다.
// tools/rebuild-index.mjs가 data/exams에서 만든다. 손으로 고치지 않는다.
(function () {
  "use strict";
  window.CSAT_MATH = ${JSON.stringify({ units, exams, problems }, null, 1)};
})();
`, "utf8");

console.log(`회차 ${exams.length}개, 문항 ${problems.length}개로 차례표를 다시 만들었습니다.`);
