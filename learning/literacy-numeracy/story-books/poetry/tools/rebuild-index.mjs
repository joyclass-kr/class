// poems/*.js를 읽어 차례표(poems-index.js)의 문제 수를 다시 적는다.
// 시나 문제를 더하거나 고친 뒤에 이것을 돌린다. 어긋나면 목록 화면의 개수가 거짓말을 한다.
//   node tools/rebuild-index.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.dirname(path.dirname(url.fileURLToPath(import.meta.url)));
const read = (name) => fs.readFileSync(path.join(ROOT, name), "utf8");

const context = { window: {}, console };
vm.createContext(context);
for (const name of ["poems-index.js", "lessons.js"]) {
    vm.runInContext(read(name), context, { filename: name });
}
const index = context.window.POETRY_POEM_INDEX;

for (const entry of index) {
    const file = path.join(ROOT, "poems", entry.id, "poem.js");
    if (!fs.existsSync(file)) throw new Error(`시 ${entry.id}: poems/${entry.id}/poem.js가 없습니다.`);
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: `${entry.id}/poem.js` });
    const part = context.window.POETRY_PART[entry.id];
    if (!part) throw new Error(`시 ${entry.id}: 본문 파일이 제 자리에 등록되지 않았습니다.`);
    entry.questionCount = (part.questions || []).length;
    entry.hasModern = Array.isArray(part.poem?.modern) && part.poem.modern.length > 0;
}

fs.writeFileSync(path.join(ROOT, "poems-index.js"), `(() => {
    "use strict";
    // 책장·소재 화면이 쓰는 칸만 모은 차례표. 본문과 문제는 시를 열 때 poems/<아이디>.js로 따로 받는다.
    // 문제 수와 현대어 유무는 tools/rebuild-index.mjs가 다시 적는다.
    window.POETRY_POEM_INDEX = ${JSON.stringify(index, null, 4).replace(/\n/g, "\n    ")};
})();
`, "utf8");

console.log(`시 ${index.length}편의 문제 수를 다시 적었습니다.`);
