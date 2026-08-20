"use strict";

const bank = window.IDIOMATIC_EXPRESSION_BANK;
const LESSONS = [{title:"1차시 · 마음과 감정",test:/^(마음|몸)/},{title:"2차시 · 생각하고 판단하기",test:/^(생각|능숙함)/},{title:"3차시 · 말하고 듣기",test:/^말/},{title:"4차시 · 사람과 관계",test:/^관계/},{title:"5차시 · 행동과 책임",test:/^행동/},{title:"6차시 · 관심과 평가",test:/^(평가|관심|성과)/},{title:"7차시 · 상황과 생활",test:/^(시간|상황|생활)/}]; let lessonIndex=0; let BATCH_SIZE=0;
let mode = "study";
let bankOrder = [];
let bankCursor = 0;
let studyBatch = [];
let studyPosition = 0;
let quizOrder = [];
let quizPosition = 0;
let currentChoices = null;
let correct = 0;
let attempts = 0;
let questionHadWrong = false;

const byId = (id) => document.getElementById(id);

function shuffle(items) {
  const result = [...items];
  for (let current = result.length - 1; current > 0; current -= 1) {
    const swap = Math.floor(Math.random() * (current + 1));
    [result[current], result[swap]] = [result[swap], result[current]];
  }
  return result;
}

function resetBank() {
  bankOrder = Array.from({ length: bank.length }, (_, index) => index).filter((index) => LESSONS[lessonIndex].test.test(bank[index].category)); BATCH_SIZE = bankOrder.length;
  bankCursor = 0;
}

function prepareBatch() {
  if (!bankOrder.length || bankCursor + BATCH_SIZE > bankOrder.length) resetBank();
  studyBatch = bankOrder.slice(bankCursor, bankCursor + BATCH_SIZE);
  bankCursor += BATCH_SIZE;
  studyPosition = 0;
  quizOrder = shuffle(studyBatch);
  quizPosition = 0;
  currentChoices = null;
  correct = 0;
  attempts = 0;
  byId("nextQuestion").dataset.action = "next";
}

function renderStudy() {
  const item = bank[studyBatch[studyPosition]];
  byId("progress").textContent = LESSONS[lessonIndex].title + " · " + (studyPosition + 1) + " / " + BATCH_SIZE;
  byId("category").textContent = item.category;
  byId("expression").textContent = item.expression;
  byId("meaning").textContent = item.meaning;
  byId("example").textContent = "예: " + item.example;
  byId("previous").disabled = studyPosition === 0;
  byId("next").textContent = studyPosition === BATCH_SIZE - 1 ? "차시 확인 문제" : "다음 관용구";
}

function buildChoices(correctIndex) {
  const correctItem = bank[correctIndex];
  const sameCategory = shuffle(
    Array.from({ length: bank.length }, (_, index) => index)
      .filter((index) => index !== correctIndex && bank[index].category === correctItem.category)
  );
  const others = shuffle(
    Array.from({ length: bank.length }, (_, index) => index)
      .filter((index) => index !== correctIndex && bank[index].category !== correctItem.category)
  );
  const choiceIndices = shuffle([correctIndex, ...sameCategory, ...others].slice(0, 3));
  return {
    answer: choiceIndices.indexOf(correctIndex),
    texts: choiceIndices.map((index) => bank[index].expression)
  };
}

function renderQuiz() {
  questionHadWrong = false;
  const itemIndex = quizOrder[quizPosition];
  const item = bank[itemIndex];
  currentChoices = buildChoices(itemIndex);
  byId("quizProgress").textContent = "확인 문제 " + (quizPosition + 1) + " / " + BATCH_SIZE;
  byId("quizTitle").textContent = "이 상황에 알맞은 관용구는?";
  byId("question").textContent = item.question;
  byId("feedback").textContent = "";
  byId("nextQuestion").hidden = false;
  byId("nextQuestion").disabled = true;
  byId("nextQuestion").dataset.action = "next";
  byId("nextQuestion").textContent = "다음 문제";
  byId("score").textContent = "정답 " + correct + " / " + attempts;

  byId("choices").replaceChildren(...currentChoices.texts.map((choice, choiceIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => answer(choiceIndex, button));
    return button;
  }));
}

function answer(choiceIndex, selectedButton) {
  const item = bank[quizOrder[quizPosition]];
  const buttons = [...byId("choices").querySelectorAll("button")];
  if (choiceIndex !== currentChoices.answer) {
    questionHadWrong = true;
    selectedButton.classList.add("wrong");
    selectedButton.disabled = true;
    byId("feedback").textContent = "이 상황과는 맞지 않아요. 다른 표현을 골라보세요.";
    return;
  }

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === currentChoices.answer) button.classList.add("correct");
  });
  attempts += 1;
  if (!questionHadWrong) correct += 1;
  byId("feedback").textContent = "정답! ‘" + item.expression + "’은 " + item.meaning;
  byId("score").textContent = "정답 " + correct + " / " + attempts;
  byId("nextQuestion").disabled = false;
  byId("nextQuestion").textContent = quizPosition === BATCH_SIZE - 1 ? "결과 보기" : "다음 문제";
}

function renderQuizComplete() {
  byId("quizProgress").textContent = LESSONS[lessonIndex].title + " 완료";
  byId("quizTitle").textContent = "이번 차시를 끝냈어요!";
  byId("question").textContent = BATCH_SIZE + "문제 중 " + correct + "문제를 한 번에 맞혔습니다.";
  byId("choices").replaceChildren();
  byId("feedback").textContent = "";
  byId("nextQuestion").hidden = false;
  byId("nextQuestion").disabled = false;
  byId("nextQuestion").dataset.action = "next-batch";
  byId("nextQuestion").textContent = "이 차시 다시 공부";
}

function setMode(nextMode) {
  mode = nextMode;
  const studying = mode === "study";
  byId("studyView").hidden = !studying;
  byId("quizView").hidden = studying;
  byId("score").hidden = studying;
  document.querySelectorAll(".mode-tab").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (studying) renderStudy();
  else renderQuiz();
}

document.querySelectorAll(".mode-tab").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

byId("next").addEventListener("click", () => {
  if (studyPosition === BATCH_SIZE - 1) setMode("quiz");
  else {
    studyPosition += 1;
    renderStudy();
  }
});

byId("previous").addEventListener("click", () => {
  if (studyPosition > 0) studyPosition -= 1;
  renderStudy();
});

byId("nextQuestion").addEventListener("click", () => {
  if (byId("nextQuestion").dataset.action === "next-batch") {
    prepareBatch();
    setMode("study");
  } else if (quizPosition === BATCH_SIZE - 1) {
    renderQuizComplete();
  } else {
    quizPosition += 1;
    renderQuiz();
  }
});

if (!Array.isArray(bank) || bank.length < BATCH_SIZE) {
  throw new Error("관용구 학습 자료를 불러오지 못했습니다.");
}

const lessonSelect = byId("lessonSelect");
LESSONS.forEach((lesson, index) => { const count = bank.filter((item) => lesson.test.test(item.category)).length; lessonSelect.add(new Option(lesson.title + " · " + count + "개", String(index))); });
lessonSelect.addEventListener("change", () => { lessonIndex = Number(lessonSelect.value); resetBank(); prepareBatch(); setMode("study"); });
resetBank();
prepareBatch();
renderStudy();
