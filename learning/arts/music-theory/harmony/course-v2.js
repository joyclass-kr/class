"use strict";

const COURSE_KEY = "musicTheoryHarmonyCourseV3";
const UNITS = [
  { id: 1, title: "악보 읽기의 기초", english: "Notation Foundations", lessons: [1, 2, 3, 4, 5, 6] },
  { id: 2, title: "음높이와 변화표", english: "Pitch & Accidentals", lessons: [7, 8, 9, 10] },
  { id: 3, title: "음정", english: "Intervals", lessons: [11, 12, 13, 14, 15, 16] }
];

const LESSONS = {
  1: {
    title: "오선과 음표의 자리", english: "Staff, Lines and Spaces",
    terms: [["오선", "Staff"], ["선", "Line"], ["칸", "Space"]],
    sections: [
      { title: "다섯 줄은 음의 높이를 기록하는 좌표예요", body: "오선(Staff)은 아래에서부터 제1선·제2선·제3선·제4선·제5선으로 셉니다. 선과 선 사이의 네 칸도 아래에서부터 제1칸·제2칸·제3칸·제4칸으로 셉니다. 음표 머리가 놓인 자리가 그 음의 높이를 나타냅니다.", visual: "staffGuide", caption: "선과 칸은 언제나 아래에서 위로 셉니다." },
      { title: "한 칸씩 움직이면 음이름도 한 단계씩 움직여요", body: "음표가 선에서 바로 위 칸으로, 다시 다음 선으로 이동할 때마다 음이름은 알파벳 순서로 한 단계씩 올라갑니다. 아직 특정 음이름을 외우기보다 ‘선–칸–선–칸’의 규칙적인 이동을 먼저 눈으로 확인하세요.", visual: "staffSteps", caption: "선과 칸을 건너뛰지 않으면 인접한 음입니다." }
    ], quiz: "staff"
  },
  2: {
    title: "높은음자리표", english: "Treble Clef / G Clef",
    terms: [["높은음자리표", "Treble Clef"], ["사음자리표", "G Clef"], ["가운데 도", "Middle C"]],
    sections: [
      { title: "높은음자리표는 제2선의 G를 가리켜요", body: "높은음자리표(Treble Clef)는 기호의 둥근 부분이 오선의 제2선을 감쌉니다. 그래서 G Clef라고도 부릅니다. 제2선이 G라는 기준을 잡으면 아래 칸은 F, 위 칸은 A처럼 나머지 음도 순서대로 찾을 수 있습니다.", visual: "treble", caption: "기호가 감싸는 제2선 = G4" },
      { title: "가운데 C에서 출발해 G까지 올라가 보세요", body: "가운데 C(Middle C, C4)는 높은음자리표 오선 바로 아래의 덧줄에 놓입니다. C–D–E–F–G를 차례로 따라가면 G가 제2선에 도착합니다. 이 관계를 악보와 건반에서 함께 확인하면 음표 위치를 통째로 외울 필요가 없습니다.", visual: "middleC", caption: "C4에서 한 자리씩 올라가 제2선 G4에 도착합니다.", audio: [[60], [62], [64], [65], [67]] }
    ], quiz: "treble"
  },
  3: {
    title: "낮은음자리표", english: "Bass Clef / F Clef",
    terms: [["낮은음자리표", "Bass Clef"], ["바음자리표", "F Clef"], ["큰보표", "Grand Staff"]],
    sections: [
      { title: "두 점 사이의 제4선이 F예요", body: "낮은음자리표(Bass Clef)의 두 점은 제4선을 사이에 둡니다. 그 선의 음이 F이므로 F Clef라고도 부릅니다. 첼로·베이스·피아노 왼손처럼 낮은 음역을 읽을 때 주로 사용합니다.", visual: "bass", caption: "두 점 사이 제4선 = F3" },
      { title: "두 음자리표는 가운데 C를 사이에 두고 이어져요", body: "높은음자리표와 낮은음자리표는 서로 다른 체계가 아닙니다. 피아노 악보의 큰보표(Grand Staff)에서는 가운데 C를 중심으로 위쪽은 높은음자리표, 아래쪽은 낮은음자리표가 이어집니다.", visual: "grandStaff", caption: "가운데 C는 두 오선을 연결하는 기준점입니다.", audio: [[48], [60], [72]] }
    ], quiz: "bass"
  },
  4: {
    title: "덧줄과 가운데 C", english: "Ledger Lines & Middle C",
    terms: [["덧줄", "Ledger Line"], ["가운데 C", "Middle C"], ["음역", "Register"]],
    sections: [
      { title: "오선 밖의 음은 짧은 덧줄로 확장해요", body: "다섯 줄보다 높거나 낮은 음을 적을 때는 필요한 자리만큼 짧은 덧줄(Ledger Line)을 더합니다. 덧줄도 오선과 똑같이 선과 칸을 번갈아 세며, 음표를 중심으로 필요한 만큼만 그립니다.", visual: "ledger", caption: "덧줄도 선–칸–선의 규칙을 그대로 따릅니다." },
      { title: "가운데 C는 표준 번호 C4예요", body: "가운데 C는 음자리표와 건반을 연결하는 가장 중요한 기준음입니다. 국제식 옥타브 표기에서는 C4라고 씁니다. ‘도’라는 계이름과 혼동하지 말고, 여기서는 고정된 음이름 C와 옥타브 번호 4로 읽습니다.", visual: "middleCKeyboard", caption: "가운데 C = C4. ‘도’라고 고정하지 않습니다.", audio: [[60]] }
    ], quiz: "ledger"
  },
  5: {
    title: "고정 음이름과 건반", english: "Pitch Names & Keyboard",
    terms: [["음이름", "Pitch Name"], ["흰건반", "White Key"], ["옥타브", "Octave"]],
    sections: [
      { title: "흰건반의 고정 음이름은 C·D·E·F·G·A·B예요", body: "영문 음이름(Pitch Name)은 조성이 바뀌어도 같은 건반을 가리킵니다. C 다음은 D, E, F, G, A, B이며 그 뒤에 다시 C가 옵니다. 도·레·미는 이동도법에서는 조성에 따라 가리키는 음이 달라질 수 있으므로 여기서는 C와 도를 같은 뜻으로 고정하지 않습니다.", visual: "whiteNames", caption: "고정 음이름 C–D–E–F–G–A–B" },
      { title: "검은건반 두 개의 바로 왼쪽에서 C를 찾으세요", body: "건반의 검은 키는 두 개와 세 개가 반복됩니다. 두 개 묶음 바로 왼쪽 흰건반은 항상 C입니다. 이 모양을 기준으로 나머지 음이름을 찾으면 건반 전체를 외우지 않아도 됩니다.", visual: "findC", caption: "두 검은건반 묶음 왼쪽 = C", audio: [[48], [60], [72]] }
    ], quiz: "whiteNames"
  },
  6: {
    title: "옥타브와 음역 번호", english: "Octave Registers",
    terms: [["옥타브", "Octave"], ["음역", "Register"], ["과학적 음높이 표기", "Scientific Pitch Notation"]],
    sections: [
      { title: "C에서 다음 C까지가 한 옥타브예요", body: "같은 음이름이 다시 나타날 때까지의 거리를 옥타브(Octave)라고 합니다. 건반에서는 C부터 오른쪽의 다음 C까지 흰건반 일곱 개와 검은건반 다섯 개, 모두 열두 반음이 들어 있습니다.", visual: "octave", caption: "C3에서 C4까지 = 1옥타브 = 12반음", audio: [[48], [60]] },
      { title: "C가 나올 때마다 옥타브 번호가 바뀌어요", body: "과학적 음높이 표기(Scientific Pitch Notation)는 음이름 뒤에 숫자를 붙입니다. B3 다음 반음은 C4이고, C4부터 B4까지 같은 번호를 씁니다. 그래서 가운데 C는 C4입니다.", visual: "registers", caption: "… B3 | C4 D4 … B4 | C5 …" }
    ], quiz: "octave"
  },
  7: {
    title: "반음과 온음", english: "Semitone & Whole Tone",
    terms: [["반음", "Semitone / Half Step"], ["온음", "Whole Tone / Whole Step"], ["반음 수", "Semitone Count"]],
    sections: [
      { title: "건반에서 바로 이웃한 두 키는 반음이에요", body: "반음(Semitone, Half Step)은 음높이 사이의 가장 작은 기본 거리입니다. 흰건반과 검은건반의 색과 관계없이 중간에 다른 건반이 없으면 반음입니다. E–F와 B–C 사이에는 검은건반이 없으므로 흰건반끼리도 반음입니다.", visual: "semitone", caption: "C–C♯, E–F, B–C는 모두 반음", audio: [[60], [61]] },
      { title: "반음 두 칸을 합치면 온음이에요", body: "온음(Whole Tone, Whole Step)은 반음 두 개의 거리입니다. C에서 D로 갈 때 중간의 C♯을 지나므로 온음입니다. 먼저 건반의 실제 칸 수를 세고, 그다음 악보의 표기를 연결하세요.", visual: "wholeTone", caption: "C → C♯ → D = 반음 2개 = 온음", audio: [[60], [61], [62]] }
    ], quiz: "steps"
  },
  8: {
    title: "샵·플랫·제자리표", english: "Sharp, Flat & Natural",
    terms: [["샵", "Sharp ♯"], ["플랫", "Flat ♭"], ["제자리표", "Natural ♮"]],
    sections: [
      { title: "샵은 반음 올리고 플랫은 반음 내려요", body: "샵(Sharp, ♯)은 원래 음에서 반음 높이고, 플랫(Flat, ♭)은 반음 낮춥니다. C♯은 C의 바로 오른쪽 건반이고, D♭은 D의 바로 왼쪽 건반입니다. ‘검은건반 이름’이 아니라 기준음에서 어느 방향으로 움직였는지를 나타내는 기호입니다.", visual: "accidentals", caption: "♭ ← 기준음 → ♯", audio: [[60], [61], [62]] },
      { title: "제자리표는 앞서 적용된 변화를 취소해요", body: "제자리표(Natural, ♮)는 같은 마디에서 앞서 붙은 샵이나 플랫을 취소하고 원래 음으로 되돌립니다. 변화표는 특별한 지시가 없으면 같은 마디, 같은 높이의 음에 계속 적용됩니다.", visual: "natural", caption: "F♯ 다음의 F♮은 원래 F로 돌아갑니다.", audio: [[66], [65]] }
    ], quiz: "accidentals"
  },
  9: {
    title: "이명동음", english: "Enharmonic Equivalents",
    terms: [["이명동음", "Enharmonic Equivalent"], ["C♯", "C Sharp"], ["D♭", "D Flat"]],
    sections: [
      { title: "같은 건반도 문맥에 따라 이름이 달라져요", body: "C♯과 D♭은 피아노에서 같은 건반으로 소리 나지만 표기와 음악적 역할은 다릅니다. 이렇게 소리는 같고 이름이 다른 음을 이명동음(Enharmonic Equivalent)이라고 합니다.", visual: "enharmonic", caption: "C♯ = D♭, D♯ = E♭, F♯ = G♭ …", audio: [[61]] },
      { title: "이름은 음이 진행하는 방향과 조성을 보여 줘요", body: "C에서 반음 올라간 흐름은 C♯으로, D에서 반음 내려간 흐름은 D♭으로 적는 편이 의미가 분명합니다. 이후 음계와 화음을 배울 때는 같은 건반이라도 올바른 음이름을 선택해야 구조가 보입니다.", visual: "enharmonicTable", caption: "건반은 같아도 철자와 기능은 다릅니다." }
    ], quiz: "enharmonic"
  },
  10: {
    title: "악보와 건반 연결", english: "Notation to Keyboard",
    terms: [["음높이", "Pitch"], ["임시표", "Accidental"], ["건반 위치", "Keyboard Position"]],
    sections: [
      { title: "음자리표·음표 자리·변화표 순서로 읽으세요", body: "먼저 음자리표로 기준선을 찾고, 음표 머리의 선·칸 위치로 기본 음이름을 정합니다. 마지막으로 음표 앞의 변화표를 적용합니다. 예를 들어 높은음자리표 제2선에 샵이 붙으면 G♯입니다.", visual: "readingOrder", caption: "음자리표 → 자리 → 변화표 → 건반" },
      { title: "같은 음을 눈·귀·손으로 세 번 확인해요", body: "악보의 음을 눈으로 읽고, 건반에서 위치를 찾은 뒤, 소리를 들어 확인하세요. 세 감각을 함께 연결해야 음표가 단순한 암기 기호가 아니라 실제 소리로 기억됩니다.", visual: "notationKeyboard", caption: "표기 G♯4와 건반 G♯4를 연결합니다.", audio: [[68]] }
    ], quiz: "notation"
  },
  11: {
    title: "음정의 두 부분", english: "Interval Number & Quality",
    terms: [["음정", "Interval"], ["도수", "Interval Number"], ["성질", "Interval Quality"]],
    sections: [
      { title: "음정은 두 음 사이의 거리예요", body: "음정(Interval)은 두 음의 높이 차이입니다. 이름은 ‘몇 도인가’를 나타내는 도수(Number)와 ‘어떤 종류인가’를 나타내는 성질(Quality)의 두 부분으로 구성됩니다. 예를 들어 장3도는 Major Third입니다.", visual: "intervalParts", caption: "장(Major) + 3도(Third)" },
      { title: "도수는 처음 음과 끝 음을 모두 포함해 세요", body: "C에서 E까지는 C(1)–D(2)–E(3)로 세므로 3도입니다. 건반을 누른 횟수나 중간 음의 개수가 아니라 음이름 철자의 개수를 셉니다. C–F는 4도, C–G는 5도입니다.", visual: "numberCount", caption: "C–E = 세 음이름 = 3도", audio: [[60], [64]] }
    ], quiz: "intervalNumber"
  },
  12: {
    title: "반음 수로 거리 재기", english: "Measuring Intervals",
    terms: [["반음 수", "Semitone Count"], ["동음", "Unison"], ["옥타브", "Octave"]],
    sections: [
      { title: "같은 도수라도 반음 수가 다를 수 있어요", body: "C–E와 C–E♭은 모두 C부터 E까지 세 음이름을 사용하므로 3도입니다. 그러나 C–E는 4반음, C–E♭은 3반음입니다. 이 반음 수의 차이가 장3도와 단3도를 구분합니다.", visual: "thirdCompare", caption: "C–E = 4반음, C–E♭ = 3반음", audio: [[60,64], [60,63]] },
      { title: "도수와 반음 수를 따로 계산하세요", body: "첫째, 음이름을 포함해 세어 도수를 정합니다. 둘째, 건반에서 실제 반음 수를 셉니다. 두 결과를 함께 보면 음정의 정확한 이름을 결정할 수 있습니다.", visual: "semitoneRuler", caption: "음이름 개수 + 반음 수 = 정확한 음정" }
    ], quiz: "semitoneCount"
  },
  13: {
    title: "완전음정", english: "Perfect Intervals",
    terms: [["완전1도", "Perfect Unison, P1"], ["완전4도", "Perfect Fourth, P4"], ["완전5도", "Perfect Fifth, P5"], ["완전8도", "Perfect Octave, P8"]],
    sections: [
      { title: "1·4·5·8도는 완전 계열이에요", body: "기본 음정에서 1도·4도·5도·8도는 완전(Perfect) 계열입니다. C를 기준으로 C–C는 완전1도, C–F는 완전4도, C–G는 완전5도, C–높은 C는 완전8도입니다.", visual: "perfectFamily", caption: "P1 · P4 · P5 · P8", audio: [[60,60], [60,65], [60,67], [60,72]] },
      { title: "완전 계열은 장·단으로 나뉘지 않아요", body: "완전음정은 반음 넓어지면 증(Augmented), 반음 좁아지면 감(Diminished)이 됩니다. ‘장4도’나 ‘단5도’라고 부르지 않습니다. 이 계열 구분은 뒤의 변화 관계를 이해하는 기준입니다.", visual: "perfectRelation", caption: "감 ← 완전 → 증" }
    ], quiz: "perfect"
  },
  14: {
    title: "장음정과 단음정", english: "Major & Minor Intervals",
    terms: [["장음정", "Major Interval"], ["단음정", "Minor Interval"], ["2·3·6·7도", "Major/Minor Family"]],
    sections: [
      { title: "2·3·6·7도는 장·단 계열이에요", body: "2도·3도·6도·7도는 장(Major)과 단(Minor)으로 나뉩니다. 장음정에서 반음 하나 좁아지면 같은 도수의 단음정이 됩니다. C–E는 장3도, C–E♭은 단3도입니다.", visual: "majorMinorFamily", caption: "장 − 반음 = 단", audio: [[60,64], [60,63]] },
      { title: "도수는 그대로, 반음 수만 달라져요", body: "E가 E♭으로 바뀌어도 C부터 E까지의 철자는 여전히 세 개이므로 3도입니다. 달라진 것은 반음 수와 성질입니다. 변화표가 붙었다고 도수를 다시 세지 않는 점이 중요합니다.", visual: "majorMinorTable", caption: "장2/단2, 장3/단3, 장6/단6, 장7/단7" }
    ], quiz: "majorMinor"
  },
  15: {
    title: "증음정과 감음정", english: "Augmented & Diminished Intervals",
    terms: [["증음정", "Augmented Interval"], ["감음정", "Diminished Interval"], ["겹증·겹감", "Doubly Augmented/Diminished"]],
    sections: [
      { title: "기준 음정보다 반음 넓거나 좁은 관계예요", body: "완전음정이나 장음정보다 반음 넓어지면 증(Augmented)이 됩니다. 완전음정이나 단음정보다 반음 좁아지면 감(Diminished)이 됩니다. 먼저 도수를 고정한 뒤 두 음 중 하나를 변화시켜 성질의 이동을 관찰하세요.", visual: "qualityFlow", caption: "감–완전–증 / 감–단–장–증" },
      { title: "같은 소리라도 철자가 다르면 음정 이름도 달라져요", body: "C–F♯과 C–G♭은 피아노에서 같은 소리지만, C–F♯은 네 음이름을 세므로 증4도이고 C–G♭은 다섯 음이름을 세므로 감5도입니다. 이명동음과 음정 철자가 만나는 대표 사례입니다.", visual: "tritone", caption: "C–F♯ = 증4도, C–G♭ = 감5도", audio: [[60,66], [60,66]] }
    ], quiz: "quality"
  },
  16: {
    title: "음정의 전위와 종합", english: "Interval Inversion & Review",
    terms: [["전위", "Inversion"], ["보수 음정", "Complementary Interval"], ["협화·불협화", "Consonance/Dissonance"]],
    sections: [
      { title: "한 음을 옥타브 옮기면 두 음의 자리가 뒤집혀요", body: "C–E의 아래 C를 한 옥타브 올리면 E–C가 됩니다. 이를 음정의 전위(Inversion)라고 합니다. 원래 도수와 전위된 도수의 합은 9가 됩니다. 3도는 6도, 4도는 5도가 됩니다.", visual: "inversion", caption: "1↔8, 2↔7, 3↔6, 4↔5", audio: [[60,64], [64,72]] },
      { title: "전위하면 장과 단, 증과 감이 서로 바뀌어요", body: "완전은 전위해도 완전이며, 장은 단으로, 단은 장으로 바뀝니다. 증은 감으로, 감은 증으로 바뀝니다. 도수 합 9와 성질 변환을 함께 사용하면 복잡한 음정도 검산할 수 있습니다.", visual: "inversionTable", caption: "완전↔완전 · 장↔단 · 증↔감" }
    ], quiz: "review"
  }
};
const els = Object.fromEntries([
  "dashboard","progressText","unitList","study","backToCourse","currentLesson","lessonUnit","lessonTitle","lessonEnglish","lessonSections","termList","practicePanel","roundCounter","scoreText","questionPrompt","listenButton","answerChoices","feedback","nextButton","piano","toast","resetProgress"
].map(id => [id, document.getElementById(id)]));

const state = { lesson: null, completed: loadProgress(), index: 0, score: 0, current: null, seen: new Set(), locked: false };
const NOTE_NAMES = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"];
const WHITE_NAMES = ["C","D","E","F","G","A","B","C"];

function loadProgress() {
  try { return new Set(JSON.parse(localStorage.getItem(COURSE_KEY) || "[]")); }
  catch (_) { return new Set(); }
}
function saveProgress() { localStorage.setItem(COURSE_KEY, JSON.stringify([...state.completed])); }
function unitForLesson(id) { return UNITS.find(unit => unit.lessons.includes(id)); }
function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => els.toast.classList.remove("show"), 1700);
}
function playGroups(groups) {
  if (!window.HarmonyPiano || !groups || !groups.length) return;
  const promise = groups.length === 1
    ? window.HarmonyPiano.playNotes(groups[0], { duration: .9 })
    : window.HarmonyPiano.playSequence(groups, .58);
  promise.catch(() => showToast("오디오를 불러오지 못했습니다."));
}

function keyboardMarkup(active = [], mode = "names", bracket = "") {
  const whites = WHITE_NAMES.map((name, index) => {
    const on = active.includes(name) || active.includes(index);
    return `<span class="v-white${on ? " active" : ""}><b>${mode === "blank" ? "" : name}</b></span>`;
  }).join("");
  const blacks = [
    [7.1,"C♯ / D♭"],[21.4,"D♯ / E♭"],[50,"F♯ / G♭"],[64.3,"G♯ / A♭"],[78.6,"A♯ / B♭"]
  ].map(([left,name]) => `<span class="v-black${active.includes(name.split(" ")[0]) || active.includes(name) ? " active" : ""}" style="left:${left}%"><b>${mode === "accidentals" ? name : ""}</b></span>`).join("");
  return `<div class="keyboard-visual"><div class="white-keys">${whites}</div>${blacks}</div>${bracket ? `<div class="keyboard-bracket">${bracket}</div>` : ""}`;
}
function staffMarkup(kind = "treble", notes = [], labels = []) {
  const clef = kind === "bass" ? "𝄢" : "𝄞";
  const positions = notes.length ? notes : [48,53,57,60,64];
  const marks = positions.map((midi,index) => {
    const x = 15 + index * (72 / Math.max(1,positions.length - 1));
    const letterSteps = [0,0,1,1,2,3,3,4,4,5,5,6];
    const octave = Math.floor(midi / 12) - 1;
    const diatonic = octave * 7 + letterSteps[midi % 12];
    const baseDiatonic = kind === "bass" ? 18 : 30;
    const y = Math.max(4, Math.min(82, 64 - (diatonic - baseDiatonic) * 6));
    const ledger = (kind === "treble" && midi <= 60) || (kind === "bass" && midi >= 60);
    return `<i class="note-mark${index === positions.length - 1 ? " highlight" : ""}${ledger ? " ledger" : ""}" style="left:${x}%;top:${y}px"></i><span class="staff-note-label" style="left:${x}%">${labels[index] || NOTE_NAMES[midi % 12]}</span>`;
  }).join("");
  return `<div class="staff-stack"><div class="staff-row"><div class="clef ${kind}">${clef}</div><div class="staff-lines"></div>${marks}</div></div>`;
}
function stepStrip(items, active = []) {
  return `<div class="step-strip">${items.map((item,index) => `<div class="step-cell${active.includes(index) ? " active" : ""}"><b>${item[0]}</b><small>${item[1] || ""}</small></div>`).join("")}</div>`;
}
function comparison(headers, rows) {
  return `<table class="comparison-table"><thead><tr>${headers.map(x => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function relation(nodes) {
  return `<div class="interval-family">${nodes.map((node,index) => `${index ? '<span class="interval-arrow">→</span>' : ""}<span class="interval-node${node[1] ? " primary" : ""}">${node[0]}</span>`).join("")}</div>`;
}
function visualMarkup(type) {
  const keyboardVisuals = {
    whiteNames: [["C","D","E","F","G","A","B"],"names","고정 음이름"], findC: [["C"],"names","두 검은건반 묶음 왼쪽"],
    middleCKeyboard: [["C"],"names","가운데 C = C4"], octave: [["C",7],"names","C3 → C4 · 12반음"],
    registers: [["C"],"names","C3 | C4 | C5"], semitone: [["C","C♯"],"accidentals","반음 1칸"],
    wholeTone: [["C","C♯","D"],"accidentals","반음 2칸 = 온음"], accidentals: [["C♯"],"accidentals","C♯과 D♭은 같은 건반"],
    enharmonic: [["C♯"],"accidentals","C♯ = D♭"], notationKeyboard: [["G♯"],"accidentals","G♯4"],
    thirdCompare: [["C","E"],"names","C–E 4반음 / C–E♭ 3반음"]
  };
  if (keyboardVisuals[type]) return keyboardMarkup(...keyboardVisuals[type]);
  if (type === "staffGuide") return staffMarkup("treble", [64,65,67,69,71], ["제1선 E","제1칸 F","제2선 G","제2칸 A","제3선 B"]);
  if (type === "staffSteps") return staffMarkup("treble", [60,62,64,65,67,69,71,72], ["C","D","E","F","G","A","B","C"]);
  if (type === "treble") return staffMarkup("treble", [67], ["제2선 G4"]);
  if (type === "middleC") return staffMarkup("treble", [60,62,64,65,67], ["C4","D4","E4","F4","G4"]);
  if (type === "bass") return staffMarkup("bass", [53], ["제4선 F3"]);
  if (type === "grandStaff") return `<div class="staff-stack">${staffMarkup("treble",[60],["C4"])}${staffMarkup("bass",[60],["C4"])}</div>`;
  if (type === "ledger") return staffMarkup("treble", [57,59,60,62,64], ["A3","B3","C4","D4","E4"]);
  if (type === "natural") return staffMarkup("treble", [66,65], ["F♯","F♮"]);
  if (type === "readingOrder") return relation([["① 음자리표",1],["② 선·칸"],["③ 변화표"],["④ 건반"]]);
  if (type === "enharmonicTable") return comparison(["건반","올려 읽기","내려 읽기"], [["검은건반","C♯","D♭"],["검은건반","D♯","E♭"],["검은건반","F♯","G♭"]]);
  if (type === "intervalParts") return comparison(["성질 Quality","도수 Number","완성된 이름"], [["장 Major","3도 Third","<strong>장3도 Major Third</strong>"]]);
  if (type === "numberCount") return stepStrip([["C","1"],["D","2"],["E","3"]],[0,2]);
  if (type === "semitoneRuler") return stepStrip([["C","0"],["C♯","1"],["D","2"],["D♯","3"],["E","4"],["F","5"],["F♯","6"],["G","7"]],[0,4,7]);
  if (type === "perfectFamily") return comparison(["음정","철자","반음"], [["P1","C–C","0"],["P4","C–F","5"],["P5","C–G","7"],["P8","C–C","12"]]);
  if (type === "perfectRelation") return relation([["감 Diminished"],["완전 Perfect",1],["증 Augmented"]]);
  if (type === "majorMinorFamily") return relation([["감 Diminished"],["단 Minor"],["장 Major",1],["증 Augmented"]]);
  if (type === "majorMinorTable") return comparison(["도수","단 Minor","장 Major"], [["2도","1반음","2반음"],["3도","3반음","4반음"],["6도","8반음","9반음"],["7도","10반음","11반음"]]);
  if (type === "qualityFlow") return `<div>${relation([["감"],["완전",1],["증"]])}<div style="height:14px"></div>${relation([["감"],["단"],["장",1],["증"]])}</div>`;
  if (type === "tritone") return comparison(["같은 건반 소리","음이름 수","음정"], [["C–F♯","4","<strong>증4도</strong>"],["C–G♭","5","<strong>감5도</strong>"]]);
  if (type === "inversion") return comparison(["원래","전위","합"], [["1도","8도","9"],["2도","7도","9"],["3도","6도","9"],["4도","5도","9"]]);
  if (type === "inversionTable") return comparison(["원래 성질","전위 성질"], [["완전 Perfect","완전 Perfect"],["장 Major","단 Minor"],["단 Minor","장 Major"],["증 Augmented","감 Diminished"]]);
  return staffMarkup("treble", [60,64,67], ["C","E","G"]);
}
const FIXED_QUIZZES = {
  staff: [
    ["오선의 선은 몇 개인가요?",["4개","5개","6개","8개"],"5개"],
    ["오선의 칸은 몇 개인가요?",["3개","4개","5개","6개"],"4개"],
    ["선과 칸은 어느 방향으로 세나요?",["위에서 아래","아래에서 위","오른쪽부터","상관없음"],"아래에서 위"],
    ["제1선 바로 위의 자리는 무엇인가요?",["제1칸","제2선","제2칸","덧줄"],"제1칸"],
    ["음표가 선–칸–선으로 움직이면 음이름은?",["한 단계씩 이동","항상 같은 음","두 단계씩 이동","옥타브 이동"],"한 단계씩 이동"]
  ],
  treble: [
    ["높은음자리표의 다른 이름은?",["G Clef","F Clef","C Clef","Bass Clef"],"G Clef"],
    ["높은음자리표 제2선의 음이름은?",["F","G","A","B"],"G"],
    ["가운데 C의 표준 표기는?",["C3","C4","C5","D4"],"C4"],
    ["높은음자리표는 주로 어느 음역을 적나요?",["높은 음역","낮은 음역","리듬만","조표만"],"높은 음역"],
    ["C4에서 G4까지 음이름은 몇 단계인가요?",["3","4","5","7"],"5"]
  ],
  bass: [
    ["낮은음자리표의 다른 이름은?",["F Clef","G Clef","C Clef","Treble Clef"],"F Clef"],
    ["낮은음자리표 두 점 사이의 선은?",["제2선","제3선","제4선","제5선"],"제4선"],
    ["낮은음자리표 제4선의 음은?",["D3","E3","F3","G3"],"F3"],
    ["피아노에서 낮은음자리표는 주로 어느 손인가요?",["왼손","오른손","양손 불가","페달"],"왼손"],
    ["두 오선을 연결하는 기준음은?",["C4","F3","G4","A4"],"C4"]
  ],
  ledger: [
    ["오선 밖의 음을 적는 짧은 선은?",["덧줄","마디선","세로줄","꼬리"],"덧줄"],
    ["덧줄의 영어 명칭은?",["Ledger Line","Bar Line","Staff Line","Bass Line"],"Ledger Line"],
    ["가운데 C는 높은음자리표 어디에 놓이나요?",["오선 아래 덧줄","제2선","제4칸","오선 위 덧줄"],"오선 아래 덧줄"],
    ["Middle C의 표기는?",["C4","C3","B3","D4"],"C4"],
    ["덧줄에서도 위치를 세는 규칙은?",["선과 칸을 번갈아 셈","선만 셈","칸만 셈","무작위"],"선과 칸을 번갈아 셈"]
  ],
  whiteNames: [
    ["검은건반 두 개 묶음 바로 왼쪽 흰건반은?",["C","D","E","F"],"C"],
    ["C 다음의 고정 음이름은?",["D","E","B","C♯"],"D"],
    ["B 다음의 흰건반 음이름은?",["C","A","B♯","D"],"C"],
    ["고정 음이름 순서에 들어가지 않는 것은?",["H","A","B","G"],"H"],
    ["조성이 달라도 같은 건반을 가리키는 것은?",["고정 음이름","이동도법 계이름","박자표","셈여림"],"고정 음이름"]
  ],
  octave: [
    ["한 옥타브는 몇 반음인가요?",["8","10","12","14"],"12"],
    ["B3 바로 다음 반음의 표기는?",["C4","C3","B4","D4"],"C4"],
    ["C4부터 다음 C까지의 표기는?",["C5","C3","B4","D5"],"C5"],
    ["가운데 C는?",["C4","C5","A4","B3"],"C4"],
    ["같은 음이름이 다시 나타날 때까지의 거리는?",["옥타브","반음","3도","마디"],"옥타브"]
  ],
  steps: [
    ["C–C♯의 거리는?",["반음","온음","3도","옥타브"],"반음"],
    ["E–F의 거리는?",["반음","온음","완전4도","두 옥타브"],"반음"],
    ["B–C의 거리는?",["반음","온음","장3도","완전5도"],"반음"],
    ["C–D의 거리는?",["온음","반음","3반음","옥타브"],"온음"],
    ["온음은 반음 몇 개인가요?",["1개","2개","3개","12개"],"2개"]
  ],
  accidentals: [
    ["음을 반음 높이는 기호는?",["♯","♭","♮","𝄢"],"♯"],
    ["음을 반음 낮추는 기호는?",["♭","♯","♮","𝄞"],"♭"],
    ["변화를 취소하는 기호는?",["♮","♯","♭","𝄫"],"♮"],
    ["C에서 반음 높은 음은?",["C♯","D","C♭","B"],"C♯"],
    ["D에서 반음 낮은 음은?",["D♭","C","D♯","E"],"D♭"]
  ],
  enharmonic: [
    ["C♯과 같은 건반은?",["D♭","D♯","C♭","E♭"],"D♭"],
    ["D♯과 같은 건반은?",["E♭","D♭","F♭","E♯"],"E♭"],
    ["F♯과 같은 건반은?",["G♭","F♭","G♯","E♯"],"G♭"],
    ["G♯과 같은 건반은?",["A♭","G♭","A♯","F♯"],"A♭"],
    ["소리는 같고 이름이 다른 음은?",["이명동음","옥타브","동음반복","온음"],"이명동음"]
  ],
  notation: [
    ["악보를 읽는 올바른 순서는?",["음자리표→자리→변화표","변화표→건반→박자","자리→셈여림→조표","건반→음자리표→자리"],"음자리표→자리→변화표"],
    ["높은음자리표 제2선에 ♯이 붙으면?",["G♯","F♯","A♭","G♭"],"G♯"],
    ["음표 머리가 알려 주는 것은?",["선·칸 위치","템포","음색","손가락 번호"],"선·칸 위치"],
    ["임시표의 영어 명칭은?",["Accidental","Interval","Register","Ledger"],"Accidental"],
    ["악보 학습에서 함께 연결할 세 감각은?",["눈·귀·손","눈·코·발","귀·코·입","손·발·코"],"눈·귀·손"]
  ]
};

function shuffled(array) { return [...array].sort(() => Math.random() - .5); }
function optionSet(answer, pool) { return shuffled([answer, ...shuffled(pool.filter(x => x !== answer)).slice(0,3)]); }
function generatedQuiz(type) {
  const roots = shuffled([48,49,50,51,52,53,54,55,56,57,58,59]).slice(0,5);
  const intervalMap = { 0:"완전1도",1:"단2도",2:"장2도",3:"단3도",4:"장3도",5:"완전4도",6:"증4도",7:"완전5도",8:"단6도",9:"장6도",10:"단7도",11:"장7도",12:"완전8도" };
  const allNames = Object.values(intervalMap);
  const specs = {
    intervalNumber: [[2,"2도"],[4,"3도"],[5,"4도"],[7,"5도"],[9,"6도"]],
    semitoneCount: [[1,"1반음"],[3,"3반음"],[4,"4반음"],[7,"7반음"],[12,"12반음"]],
    perfect: [[0,"완전1도"],[5,"완전4도"],[7,"완전5도"],[12,"완전8도"],[5,"완전4도"]],
    majorMinor: [[1,"단2도"],[2,"장2도"],[3,"단3도"],[4,"장3도"],[9,"장6도"]],
    quality: [[6,"증4도"],[6,"감5도"],[4,"장3도"],[3,"단3도"],[7,"완전5도"]],
    review: [[2,"장2도"],[3,"단3도"],[5,"완전4도"],[7,"완전5도"],[11,"장7도"]]
  }[type] || [[2,"장2도"],[4,"장3도"],[5,"완전4도"],[7,"완전5도"],[12,"완전8도"]];
  return specs.map((spec,index) => {
    const [distance, answer] = spec;
    const root = roots[index];
    const top = root + distance;
    let prompt = `${NOTE_NAMES[root % 12]}에서 ${NOTE_NAMES[top % 12]}까지의 음정을 듣고 고르세요.`;
    let choices = optionSet(answer, allNames);
    if (type === "intervalNumber") {
      prompt = `${NOTE_NAMES[root % 12]}부터 ${NOTE_NAMES[top % 12]}까지 음이름을 포함해 세면 몇 도인가요?`;
      choices = optionSet(answer,["1도","2도","3도","4도","5도","6도","7도","8도"]);
    }
    if (type === "semitoneCount") {
      prompt = `${NOTE_NAMES[root % 12]}에서 ${NOTE_NAMES[top % 12]}까지는 몇 반음인가요?`;
      choices = optionSet(answer,["1반음","2반음","3반음","4반음","5반음","7반음","12반음"]);
    }
    return { prompt, choices, answer, audio: [[root],[top]], key: `${type}-${root}-${distance}-${answer}` };
  });
}
function questionSet(type) {
  const fixed = FIXED_QUIZZES[type];
  if (fixed) return shuffled(fixed).map((q,index) => ({ prompt:q[0], choices:shuffled(q[1]), answer:q[2], audio:null, key:`${type}-${index}` }));
  return shuffled(generatedQuiz(type));
}
function renderDashboard() {
  els.progressText.textContent = `완료 ${state.completed.size} / 16`;
  els.unitList.innerHTML = UNITS.map(unit => `
    <section class="unit-block">
      <header class="unit-heading"><h2>${unit.id}. ${unit.title}</h2><span>${unit.english}</span></header>
      <div class="lesson-list">${unit.lessons.map(id => {
        const lesson = LESSONS[id];
        return `<button class="lesson-button" type="button" data-lesson="${id}">
          <span class="lesson-number">${id}</span><span class="lesson-copy"><strong>${lesson.title}</strong><small>${lesson.english}</small></span><span class="lesson-check">${state.completed.has(id) ? "✓" : ""}</span>
        </button>`;
      }).join("")}</div>
    </section>`).join("");
  els.unitList.querySelectorAll("[data-lesson]").forEach(button => button.addEventListener("click", () => openLesson(Number(button.dataset.lesson))));
}
function renderLessonSections(lesson) {
  els.lessonSections.innerHTML = lesson.sections.map((section,index) => `
    <section class="lesson-section">
      <div class="section-copy"><span class="section-step">개념 ${index + 1}</span><h2>${section.title}</h2><p>${section.body}</p>${section.audio ? `<button class="example-button" type="button" data-audio="${index}">♪ 예시 듣기</button>` : ""}</div>
      <div class="visual-board">${visualMarkup(section.visual)}<p class="visual-caption">${section.caption}</p></div>
    </section>`).join("");
  els.lessonSections.querySelectorAll("[data-audio]").forEach(button => button.addEventListener("click", () => playGroups(lesson.sections[Number(button.dataset.audio)].audio)));
}
function openLesson(id) {
  const lesson = LESSONS[id];
  const unit = unitForLesson(id);
  state.lesson = id;
  state.index = 0;
  state.score = 0;
  state.locked = false;
  state.questions = questionSet(lesson.quiz);
  state.seen = new Set();
  els.dashboard.hidden = true;
  els.study.hidden = false;
  els.currentLesson.textContent = `${id} / 16`;
  els.lessonUnit.textContent = `${unit.title} · ${unit.english}`;
  els.lessonTitle.textContent = lesson.title;
  els.lessonEnglish.textContent = lesson.english;
  renderLessonSections(lesson);
  els.termList.innerHTML = lesson.terms.map(term => `<div class="term-item"><strong>${term[0]}</strong><span>${term[1]}</span></div>`).join("");
  els.practicePanel.open = false;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function leaveLesson() {
  els.study.hidden = true;
  els.dashboard.hidden = false;
  state.lesson = null;
  renderDashboard();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function renderQuestion() {
  const q = state.questions[state.index];
  state.current = q;
  state.seen.add(q.key);
  state.locked = false;
  els.roundCounter.textContent = `${state.index + 1} / 5`;
  els.scoreText.textContent = `정답 ${state.score}`;
  els.questionPrompt.textContent = q.prompt;
  els.listenButton.hidden = !q.audio;
  els.feedback.textContent = "";
  els.feedback.className = "feedback";
  els.nextButton.hidden = true;
  els.answerChoices.innerHTML = q.choices.map(choice => `<button class="answer-choice" type="button" data-answer="${choice}">${choice}</button>`).join("");
  els.answerChoices.querySelectorAll("button").forEach(button => button.addEventListener("click", () => chooseAnswer(button.dataset.answer)));
}
function chooseAnswer(choice) {
  if (state.locked) return;
  state.locked = true;
  const correct = choice === state.current.answer;
  if (correct) state.score += 1;
  els.answerChoices.querySelectorAll("button").forEach(button => {
    button.disabled = true;
    if (button.dataset.answer === state.current.answer) button.classList.add("correct");
    else if (button.dataset.answer === choice) button.classList.add("wrong");
  });
  els.scoreText.textContent = `정답 ${state.score}`;
  els.feedback.textContent = correct ? "맞았습니다." : `정답은 ${state.current.answer}입니다.`;
  els.feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  els.nextButton.textContent = state.index === 4 ? "결과 보기" : "다음 문제";
  els.nextButton.hidden = false;
}
function nextQuestion() {
  if (!state.locked) return;
  if (state.index < 4) {
    state.index += 1;
    renderQuestion();
    return;
  }
  finishRound();
}
function finishRound() {
  if (state.score >= 4) {
    state.completed.add(state.lesson);
    saveProgress();
  }
  const passed = state.score >= 4;
  els.questionPrompt.textContent = `5문제 중 ${state.score}문제를 맞혔습니다.`;
  els.listenButton.hidden = true;
  els.answerChoices.innerHTML = "";
  els.feedback.textContent = passed ? "이 차시를 완료했습니다. 전체 과정에서 다음 차시를 선택하세요." : "설명을 다시 확인한 뒤 한 번 더 풀어 보세요.";
  els.feedback.className = `feedback ${passed ? "correct" : "wrong"}`;
  els.nextButton.textContent = passed ? "전체 과정으로" : "다시 풀기";
  els.nextButton.hidden = false;
  els.nextButton.onclick = passed ? leaveLesson : retryRound;
}
function retryRound() {
  state.index = 0;
  state.score = 0;
  state.questions = questionSet(LESSONS[state.lesson].quiz);
  state.seen = new Set();
  els.nextButton.onclick = nextQuestion;
  renderQuestion();
}
function buildPiano() {
  const blackPitchClasses = new Set([1,3,6,8,10]);
  const whiteMidis = [];
  for (let midi = 48; midi <= 72; midi += 1) if (!blackPitchClasses.has(midi % 12)) whiteMidis.push(midi);
  els.piano.innerHTML = whiteMidis.map(midi => `<button class="piano-key white" type="button" data-midi="${midi}" aria-label="${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}"><span>${NOTE_NAMES[midi % 12]}</span></button>`).join("");
  const whiteIndex = new Map(whiteMidis.map((midi,index) => [midi,index]));
  for (let midi = 49; midi < 72; midi += 1) {
    if (!blackPitchClasses.has(midi % 12)) continue;
    let previous = midi - 1;
    while (!whiteIndex.has(previous)) previous -= 1;
    const left = ((whiteIndex.get(previous) + 1) / whiteMidis.length) * 100;
    const key = document.createElement("button");
    key.type = "button";
    key.className = "piano-key black";
    key.dataset.midi = midi;
    key.style.left = `${left}%`;
    key.setAttribute("aria-label", `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`);
    els.piano.appendChild(key);
  }
  els.piano.querySelectorAll(".piano-key").forEach(key => {
    const press = event => {
      event.preventDefault();
      key.classList.add("active");
      window.HarmonyPiano?.playMidi(Number(key.dataset.midi), { duration: .75 }).catch(() => {});
    };
    const release = () => key.classList.remove("active");
    key.addEventListener("pointerdown", press);
    key.addEventListener("pointerup", release);
    key.addEventListener("pointercancel", release);
    key.addEventListener("pointerleave", release);
    key.addEventListener("keydown", event => { if ((event.key === " " || event.key === "Enter") && !event.repeat) press(event); });
    key.addEventListener("keyup", release);
  });
}

els.backToCourse.addEventListener("click", leaveLesson);
els.listenButton.addEventListener("click", () => playGroups(state.current.audio));
els.nextButton.addEventListener("click", nextQuestion);
els.resetProgress.addEventListener("click", () => {
  if (!confirm("화성학 학습 기록을 초기화할까요?")) return;
  state.completed.clear();
  saveProgress();
  renderDashboard();
  showToast("학습 기록을 초기화했습니다.");
});
renderDashboard();
buildPiano();
window.HarmonyPiano?.preload().catch(() => {});

// 철자에 따라 답이 달라지는 음정은 소리만으로 묻지 않고 표기를 함께 제시한다.
FIXED_QUIZZES.intervalNumber = [
  ["C–D는 음이름을 포함해 세면 몇 도인가요?",["1도","2도","3도","4도"],"2도"],
  ["D–F는 음이름을 포함해 세면 몇 도인가요?",["2도","3도","4도","5도"],"3도"],
  ["E–A는 음이름을 포함해 세면 몇 도인가요?",["3도","4도","5도","6도"],"4도"],
  ["F–C는 음이름을 포함해 세면 몇 도인가요?",["4도","5도","6도","7도"],"5도"],
  ["G–E는 음이름을 포함해 세면 몇 도인가요?",["4도","5도","6도","7도"],"6도"]
];
FIXED_QUIZZES.quality = [
  ["C–F♯은 음이름을 네 개 세고 6반음입니다. 정확한 이름은?",["증4도","감5도","완전4도","완전5도"],"증4도"],
  ["C–G♭은 음이름을 다섯 개 세고 6반음입니다. 정확한 이름은?",["감5도","증4도","완전5도","단5도"],"감5도"],
  ["C–E♭은 3도이며 3반음입니다. 정확한 이름은?",["단3도","장3도","감3도","증2도"],"단3도"],
  ["C–E는 3도이며 4반음입니다. 정확한 이름은?",["장3도","단3도","완전3도","증3도"],"장3도"],
  ["C–G는 5도이며 7반음입니다. 정확한 이름은?",["완전5도","감5도","증5도","장5도"],"완전5도"]
];
