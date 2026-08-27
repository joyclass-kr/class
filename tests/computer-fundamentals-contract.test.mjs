import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const read = (relativePath) => fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
const exists = (relativePath) => fs.existsSync(new URL(`../${relativePath}`, import.meta.url));
const courseRoot = "learning/inquiry/information-computing/computer-fundamentals";
const portal = read("index.html");
const coursePage = read(`${courseRoot}/index.html`);
const lessonPage = read(`${courseRoot}/lessons/index.html`);
const lessonSource = read(`${courseRoot}/lessons/system-lessons.js`);
const lessonStyles = read(`${courseRoot}/lessons/system-lessons.css`);
const curriculum = read(`${courseRoot}/CURRICULUM.md`);
const glossary = read(`${courseRoot}/GLOSSARY-KO-EN.md`);
const foundationFiles = [
  "foundation-core.js",
  "foundation-compact.js",
  "foundation-b.js",
  "foundation-c.js",
  "foundation-d.js",
  "foundation-e.js",
  "foundation-fg.js",
  "foundation-h.js",
  "foundation-ij.js"
];
const foundationSources = foundationFiles.map((file) => read(`${courseRoot}/lessons/${file}`));
const context = vm.createContext({ window: {} });
for (let index = 0; index < foundationFiles.length; index += 1) {
  vm.runInContext(foundationSources[index], context, { filename: foundationFiles[index] });
}
const generatedLessons = context.window.COMPUTER_FOUNDATION_LESSONS;
const detailedContext = vm.createContext({
  window: {},
  document: { body: { dataset: { courseRoot: "true" } } }
});
const detailedCut = lessonSource.indexOf("    const lessons = [...detailedLessons");
assert.ok(detailedCut > 0, "detailed lesson extraction marker should exist");
vm.runInContext(`${lessonSource.slice(0, detailedCut)}\nwindow.__DETAILED_LESSONS = detailedLessons;\n})();`, detailedContext);
const detailedLessons = detailedContext.window.__DETAILED_LESSONS;
const allLessons = [...detailedLessons, ...generatedLessons].sort((left, right) => left.number - right.number);
const componentImages = ["cpu", "ram", "gpu", "ssd", "hdd", "motherboard", "psu", "cooling"];

test("the information and computing menu keeps both course links", () => {
  assert.match(portal, /data-access-group="information-computing"/);
  assert.match(portal, /learning\/inquiry\/information-computing\/computer-fundamentals\//);
  assert.match(portal, /learning\/inquiry\/information-computing\/typing\//);
  assert.doesNotMatch(portal, /learning\/basics\/typing\//);
});

test("the 36-lesson core course is loaded in dependency order", () => {
  assert.equal(generatedLessons.length, 30);
  assert.equal(new Set(generatedLessons.map((lesson) => lesson.id)).size, 30);
  for (const id of ["a01", "a02", "a03", "a04", "a05", "b01"]) {
    assert.match(lessonSource, new RegExp(`id: "${id}"`));
  }
  for (const id of ["b02", "c01", "d01", "e01", "f01", "g01", "h01", "i01", "j03"]) {
    assert.ok(generatedLessons.some((lesson) => lesson.id === id), `${id} should be generated`);
  }
  assert.match(lessonSource, /\.\.\.detailedLessons, \.\.\.\(window\.COMPUTER_FOUNDATION_LESSONS/);
  assert.match(coursePage, /data-course-root="true"/);
  assert.match(lessonPage, /id="lessonTitle"/);
  for (const page of [coursePage, lessonPage]) {
    const coreAt = page.indexOf("foundation-core.js");
    const compactAt = page.indexOf("foundation-compact.js");
    const courseAt = page.indexOf("foundation-b.js");
    const engineAt = page.indexOf("system-lessons.js");
    assert.ok(coreAt >= 0 && coreAt < compactAt && compactAt < courseAt && courseAt < engineAt);
  }
});

test("every generated lesson has substantive bilingual content, manipulation, and six questions", () => {
  for (const lesson of generatedLessons) {
    assert.ok(lesson.title && lesson.english, `${lesson.id} needs a bilingual title`);
    assert.ok(lesson.details.length >= 4, `${lesson.id} needs four concept explanations`);
    assert.ok(lesson.workedExample.steps.length >= 4, `${lesson.id} needs a four-step example`);
    assert.ok(lesson.comparisons.cards.length >= 4, `${lesson.id} needs four comparisons`);
    assert.ok(lesson.activity.items.length >= 6, `${lesson.id} needs at least six activity items`);
    assert.equal(lesson.questions.length, 6, `${lesson.id} needs six scenario questions`);
    for (const question of lesson.questions) {
      assert.equal(question.options.length, 4, `${lesson.id} question needs four options`);
      assert.ok(question.answer >= 0 && question.answer < question.options.length);
      assert.ok(question.explanation.length >= 20, `${lesson.id} needs a reasoned explanation`);
      assert.doesNotMatch(question.options.join(" "), /무조건|항상|전부 다|오직 .*만/);
    }
  }
});

test("all 36 lessons have complete render data without undefined text", () => {
  assert.equal(detailedLessons.length, 6);
  assert.equal(allLessons.length, 36);
  assert.deepEqual(allLessons.map((lesson) => lesson.number), Array.from({ length: 36 }, (_, index) => index + 1));
  assert.equal(new Set(allLessons.map((lesson) => lesson.id)).size, 36);
  const shortQuizzes = allLessons.filter((lesson) => lesson.questions.length < 6).map((lesson) => `${lesson.id}:${lesson.questions.length}`);
  assert.deepEqual(shortQuizzes, [], "every lesson needs at least six scenario questions");
  for (const lesson of allLessons) {
    assert.ok(lesson.title && lesson.english, `${lesson.id} needs a bilingual title`);
    assert.ok(lesson.conceptTitle, `${lesson.id} needs a relationship statement`);
    assert.ok(lesson.workedExample.steps.length >= 4, `${lesson.id} needs at least four operation steps`);
    for (const step of lesson.workedExample.steps) {
      assert.equal(step.length, 3, `${lesson.id} operation steps need title, English, and explanation`);
      assert.ok(step.every((value) => typeof value === "string" && value.trim() && value !== "undefined"));
    }
    assert.ok(lesson.comparisons.cards.length >= 4, `${lesson.id} needs four comparison cards`);
    for (const card of lesson.comparisons.cards) {
      assert.ok(card.length >= 3, `${lesson.id} comparison cards need three fields`);
      assert.ok(card.every((value) => value !== undefined && value !== "undefined"));
    }
    assert.doesNotMatch(JSON.stringify(lesson), /"undefined"/);
  }
  const mobileLesson = allLessons.find((lesson) => lesson.id === "b02");
  assert.equal(mobileLesson.deviceComparison.cards.length, 4);
  for (const device of ["desktop-hardware-cutaway", "chromebook-internals-exploded", "tablet-internals-exploded", "smartphone-internals-exploded"]) {
    assert.ok(mobileLesson.deviceComparison.cards.some((card) => card.image.includes(device)));
  }
});

test("every lesson activity and assessment is internally consistent", () => {
  const itemIds = [];
  for (const lesson of allLessons) {
    assert.ok(lesson.activity?.type && lesson.activity.title && lesson.activity.instruction && lesson.activity.success, `${lesson.id} activity needs complete directions and feedback`);
    assert.ok(["sort", "analog", "sampling"].includes(lesson.activity.type), `${lesson.id} uses an unknown activity type`);
    if (lesson.activity.type === "sort") {
      const categoryIds = new Set(lesson.activity.categories.map((category) => category.id));
      assert.ok(categoryIds.size >= 2, `${lesson.id} needs at least two activity categories`);
      assert.ok(lesson.activity.items.length >= 6, `${lesson.id} needs at least six draggable items`);
      for (const item of lesson.activity.items) {
        assert.ok(item.id && item.label && item.english, `${lesson.id} activity items need bilingual labels`);
        assert.ok(categoryIds.has(item.category), `${lesson.id}:${item.id} points to a missing category`);
      }
      assert.equal(new Set(lesson.activity.items.map((item) => item.id)).size, lesson.activity.items.length, `${lesson.id} activity item ids must be unique`);
    }
    const prompts = lesson.questions.map((question) => question.prompt || question.text);
    assert.ok(prompts.every(Boolean), `${lesson.id} questions need prompts`);
    assert.equal(new Set(prompts).size, lesson.questions.length, `${lesson.id} question prompts must be unique`);
    for (const question of lesson.questions) {
      const prompt = question.prompt || question.text;
      const term = question.term || question.concept;
      assert.equal(question.options.length, 4, `${lesson.id} question needs four choices`);
      assert.equal(new Set(question.options).size, 4, `${lesson.id} choices must be distinct`);
      assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, `${lesson.id} needs a valid answer index`);
      assert.ok(term && question.explanation.length >= 20, `${lesson.id} needs a term and reasoned feedback`);
      assert.doesNotMatch([prompt, ...question.options].join(" "), /무조건|항상|전부 다|오직 .*만/);
    }
  }

});

test("every referenced WebP lesson visual exists in the course assets", () => {
  const source = [lessonSource, ...foundationSources].join("\n");
  const imageNames = [...source.matchAll(/[A-Za-z0-9-]+\.webp/g)].map((match) => match[0]);
  assert.ok(imageNames.length >= 20, "the lessons should use a substantial set of visual assets");
  for (const imageName of new Set(imageNames)) {
    assert.ok(exists(`${courseRoot}/assets/images/${imageName}`), `${imageName} should exist`);
  }
});
test("the curriculum presents ten progressive modules instead of an unimplemented outline", () => {
  for (const moduleCode of ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]) {
    assert.match(curriculum, new RegExp(`### ${moduleCode}\\.`));
  }
  assert.match(curriculum, /B02 \| 휴대전화와 태블릿 안에도 컴퓨터가 있을까/);
  assert.match(curriculum, /H04 \| 프론트엔드·백엔드·API·데이터베이스는 어떻게 협력할까/);
  assert.match(curriculum, /J03 \| 버그를 찾고 입력·처리·출력·저장 프로젝트를 완성하려면/);
  assert.match(lessonPage, /id="lessonList" class="course-modules"/);
  assert.match(lessonSource, /<details class="course-module"/);
  assert.match(lessonStyles, /\.course-module summary/);
});

test("every B01 component close-up is visible through an image tab and detailed panel", () => {
  for (const name of componentImages) {
    const asset = `${courseRoot}/assets/images/component-${name}-768.webp`;
    assert.ok(exists(asset), `${asset} should exist`);
    assert.match(lessonSource, new RegExp(`component-${name}-768\\.webp`));
  }
  assert.match(lessonSource, /class="component-tabs"/);
  assert.match(lessonSource, /<img src="\${part\.image}"/);
  assert.match(lessonSource, /Name and Origin/);
  assert.match(lessonStyles, /\.component-tabs button img/);
  assert.match(lessonStyles, /grid-auto-flow: column/);
  assert.match(lessonStyles, /overflow-x: auto/);
  assert.match(lessonSource, /showPart\(index, true\)/);
  assert.match(lessonSource, /partPanel\.scrollIntoView/);
});

test("activities support touch, pointer, and keyboard while feedback waits for submit", () => {
  assert.match(lessonSource, /document\.addEventListener\("pointermove", moveDrag/);
  assert.match(lessonSource, /탭 방식: 카드와 분류 칸을 차례로 누르기/);
  assert.match(lessonSource, /event\.key === "Enter" \|\| event\.key === " "/);
  assert.match(lessonSource, /submitAnswer\.addEventListener\("click"/);
  const submitHandler = lessonSource.slice(lessonSource.indexOf('submitAnswer.addEventListener("click"'));
  assert.match(submitHandler, /quizFeedback\.textContent = question\.explanation/);
  assert.match(lessonPage, /id="submitAnswer"[^>]*disabled>답 확인/);
});

test("mobile and Chromebook interiors are project assets used in device comparisons", () => {
  for (const name of ["smartphone", "chromebook", "tablet"]) {
    for (const width of [768, 1536]) {
      assert.ok(exists(`${courseRoot}/assets/images/${name}-internals-exploded-${width}.webp`));
    }
    assert.ok(exists(`${courseRoot}/assets/source/${name}-internals-exploded-v1.png`));
  }
  assert.match(lessonSource, /class="device-comparison-grid"/);
  assert.match(lessonSource, /스마트폰.*SoC/s);
  assert.match(lessonStyles, /\.device-comparison-grid/);
  assert.match(lessonStyles, /\.concept-relationship-board/);
});

test("the bilingual glossary covers every core vocabulary family", () => {
  const requiredTerms = [
    "아날로그", "디지털", "하드웨어", "소프트웨어", "입력", "처리", "출력", "저장",
    "중앙 처리 장치", "그래픽 처리 장치", "주기억장치·RAM", "솔리드 스테이트 드라이브", "하드 디스크 드라이브", "메인보드", "시스템 온 칩", "장치 드라이버",
    "운영체제", "Windows", "ChromeOS", "Android", "iOS", "iPadOS", "프로그램", "프로세스", "창", "탭", "설정", "제어판", "권한", "업데이트",
    "포인터", "텍스트 커서", "드래그 앤 드롭", "탭", "길게 누르기", "스와이프", "핀치", "키보드 단축키", "클립보드",
    "드라이브", "폴더", "파일", "경로", "확장자", "파일 형식", "아이콘", "원본", "바로가기 아이콘", "북마크", "즐겨찾기", "클라우드 저장소", "동기화", "백업", "압축 파일",
    "픽셀", "해상도", "화면 크기", "픽셀 밀도", "표시 배율", "RGB", "래스터 이미지", "벡터 이미지", "스크린샷", "화면 녹화", "샘플링", "프레임",
    "이진수", "비트", "바이트", "킬로바이트", "메가바이트", "기가바이트", "테라바이트", "문자 인코딩", "압축", "데이터 전송률",
    "네트워크", "Wi-Fi", "공유기", "인터넷", "클라이언트", "서버", "URL", "DNS", "요청", "응답", "브라우저", "검색 엔진", "웹사이트", "웹페이지", "링크",
    "프론트엔드", "백엔드", "API", "데이터베이스", "다운로드", "업로드", "쿠키", "캐시", "호스팅", "배포",
    "사용자 계정", "로그인", "인증", "2단계 인증", "역할", "피싱", "개인정보", "저작권", "라이선스", "디지털 발자국",
    "문제 분해", "순서", "알고리즘", "추적", "테스트", "이벤트", "조건", "분기", "반복", "버그", "디버깅", "상태"
  ];
  for (const term of requiredTerms) {
    assert.match(glossary, new RegExp(term));
  }
});

test("quiz totals follow each lesson and answer positions are shuffled", () => {
  assert.match(lessonPage, /id="scoreTotal"/);
  assert.match(lessonSource, /lesson\.questions\.length \* 0\.8/);
  assert.match(lessonSource, /presentedOptions/);
  assert.match(lessonSource, /Math\.random/);
});

test("student-facing copy names the content without promotional filler", () => {
  const studentFacingCopy = [coursePage, lessonPage, lessonSource, ...foundationSources].join("\n");
  for (const phrase of ["헷갈리지 않기", "쉽게 비유하면", "한눈에 비교", "원리 보기", "직접 확인하기", "앞의 개념을 이해하면"] ) {
    assert.doesNotMatch(studentFacingCopy, new RegExp(phrase));
  }
  for (const label of ["개념 설명", "활동 시작", "개념 비교", "동작 순서", "명칭과 어원"]) {
    assert.match(studentFacingCopy, new RegExp(label));
  }
});
