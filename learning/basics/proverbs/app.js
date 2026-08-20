"use strict";

const decks = window.PROVERB_BANKS;
const $ = (id) => document.getElementById(id);
const LESSONS = {
  ko: [
    ["말과 소통", "말의 힘과 바른 소통", /말|입은|아 다르고|낮말|발 없는|소문/],
    ["노력과 성장", "작은 노력과 꾸준한 성장", /노력|연습|꾸준|시작|공든|낙숫|천 리|한 술|구슬|고생|티끌|서당/],
    ["준비와 실수", "서두름·방심·뒤늦은 후회", /실수|확인|미리|뒤늦|급할수록|호미|소 잃|돌다리|아는 길|원숭이|다 된/],
    ["사람과 관계", "협력·신뢰·갈등과 관계", /친구|함께|서로|사촌|누이|팔은|손뼉|백지장|고래|가재|믿는 도끼/],
    ["욕심과 이익", "욕심·기대·이익과 손해", /욕심|이익|손해|달면|김칫국|말 타면|배보다|꿩 먹고|혹 떼러/],
    ["겉모습과 본질", "겉과 속을 구별하는 판단", /겉|실속|본질|눈 가리고|수박|개살구|빈 수레|제 눈|그림의 떡/],
    ["어려움과 희망", "위기에서 찾는 용기와 희망", /어려|위급|위태|희망|호랑이|하늘|쥐구멍|산 넘어|바람 앞/],
    ["행동과 결과", "원인·행동·습관이 만드는 결과", /결과|원인|행동|버릇|도둑|콩 심|바늘|씨가 된다/],
    ["재능과 겸손", "재능·실력·겸손을 보는 태도", /실력|재주|겸손|뛰어난|공자|벼는|굼벵이|작은 고추|뛰는 놈/],
    ["세상살이의 지혜", "비교·선택·질서와 삶의 지혜", /.*/]
  ],
  en: [
    ["Effort and growth", "Practice, patience, and progress", /연습|노력|인내|기회|시작|성공|배우|지식/],
    ["Words and relationships", "Honesty, friendship, and communication", /친구|정직|말|사람|함께|관습|웃음/],
    ["Careful choices", "Planning, caution, and consequences", /조심|서두|결과|위험|판단|확실|잃|낭비/],
    ["Life wisdom", "Choices and lessons for everyday life", /.*/]
  ]
};
let language = "ko", lessonIndex = 0, mode = "study";
let studyBatch = [], studyPosition = 0, quizOrder = [], quizPosition = 0;
let currentChoices = null, correct = 0, attempts = 0, questionHadWrong = false;
let completed = loadCompleted();

function shuffle(items) { const a=[...items]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function key() { return "class-proverb-lessons-" + language; }
function loadCompleted() { try { return new Set(JSON.parse(localStorage.getItem("class-proverb-lessons-" + language) || "[]")); } catch (_) { return new Set(); } }
function lessonFor(item) { const text=item.proverb+" "+item.meaning; const lessons=LESSONS[language]; for(let i=0;i<lessons.length;i++) if(lessons[i][2].test(text)) return i; return lessons.length-1; }
function lessonItems(index) { return decks[language].filter((item)=>lessonFor(item)===index); }

function renderLessonList() {
  const lessons=LESSONS[language];
  $("lessonHeading").textContent=language==="ko"?"한국 속담 차시 학습":"English Proverb Lessons";
  $("lessonIntro").textContent=language==="ko"?"비슷한 뜻과 쓰임을 연결해 익혀요.":"Study proverbs by meaning and use.";
  $("completionSummary").textContent=completed.size+" / "+lessons.length+(language==="ko"?" 완료":" complete");
  $("lessonList").replaceChildren(...lessons.map((lesson,index)=>{
    const items=lessonItems(index), button=document.createElement("button"); button.type="button"; button.className="lesson-item";
    button.innerHTML='<span class="lesson-number">'+String(index+1).padStart(2,"0")+'</span><span class="lesson-copy"><strong>'+lesson[0]+'</strong><small>'+lesson[1]+'</small><em>'+items.slice(0,3).map(x=>x.proverb).join(" · ")+'</em></span><span class="lesson-meta">'+items.length+(language==="ko"?"개":"")+(completed.has(index)?'<b>✓ '+(language==="ko"?"완료":"done")+'</b>':"")+'</span>';
    button.addEventListener("click",()=>startLesson(index)); return button;
  }));
}
function prepareLesson() { studyBatch=decks[language].map((_,i)=>i).filter(i=>lessonFor(decks[language][i])===lessonIndex); studyPosition=0; quizOrder=shuffle(studyBatch); quizPosition=0; correct=0; attempts=0; currentChoices=null; }
function startLesson(index){ lessonIndex=index; prepareLesson(); $("lessonOverview").hidden=true; $("learningShell").hidden=false; $("currentLessonTitle").textContent=(language==="ko"?(index+1)+"차시 · ":"Lesson "+(index+1)+" · ")+LESSONS[language][index][0]; setMode("study"); }
function renderStudy(){ const item=decks[language][studyBatch[studyPosition]], en=language==="en"; $("label").textContent=(studyPosition+1)+" / "+studyBatch.length; $("proverb").textContent=item.proverb; $("literal").textContent=item.literal||""; $("literal").hidden=!item.literal; $("meaning").textContent=item.meaning; if(item.image){$("proverbIllustrationImage").src=item.image;$("proverbIllustrationImage").alt=item.proverb;$("proverbIllustrationFrame").hidden=false;}else $("proverbIllustrationFrame").hidden=true; $("example").textContent=(en?"Example: ":"예: ")+item.example; $("previous").disabled=studyPosition===0; $("next").textContent=studyPosition===studyBatch.length-1?(en?"Lesson quiz":"차시 확인 문제"):(en?"Next proverb":"다음 속담"); }
function buildChoices(correctIndex){ const wrong=shuffle(decks[language].map((_,i)=>i).filter(i=>i!==correctIndex)).slice(0,2), ids=shuffle([correctIndex,...wrong]); return {texts:ids.map(i=>decks[language][i].proverb),answer:ids.indexOf(correctIndex)}; }
function renderQuiz(){ questionHadWrong=false; const idx=quizOrder[quizPosition],item=decks[language][idx],en=language==="en"; currentChoices=buildChoices(idx); $("quizKicker").textContent=(en?"LESSON CHECK ":"차시 확인 ")+(quizPosition+1)+" / "+quizOrder.length; $("quiz-title").textContent=en?"Which proverb best fits?":"이 상황에 알맞은 속담은?"; $("question").textContent=item.question; $("feedback").textContent=""; $("reviewAnswer").hidden=true; $("nextQuestion").hidden=false; $("nextQuestion").disabled=true; $("nextQuestion").dataset.action="next"; $("nextQuestion").textContent=en?"Next question":"다음 문제"; $("choices").replaceChildren(...currentChoices.texts.map((text,i)=>{const b=document.createElement("button");b.type="button";b.textContent=text;b.addEventListener("click",()=>answer(i,b));return b;})); }
function answer(choice,button){ const buttons=[...$("choices").querySelectorAll("button")]; if(choice!==currentChoices.answer){questionHadWrong=true;button.classList.add("wrong");button.disabled=true;$("feedback").textContent=language==="ko"?"다시 생각해 보세요.":"Try again.";return;} buttons.forEach((b,i)=>{b.disabled=true;if(i===currentChoices.answer)b.classList.add("correct")}); attempts++;if(!questionHadWrong)correct++;$("score").textContent=(language==="ko"?"정답 ":"Correct ")+correct+" / "+attempts;$("feedback").textContent=language==="ko"?"정답! 뜻과 상황을 잘 연결했어요.":"Correct!";$("nextQuestion").disabled=false;$("nextQuestion").textContent=quizPosition===quizOrder.length-1?(language==="ko"?"차시 마무리":"Finish lesson"):(language==="ko"?"다음 문제":"Next question"); }
function completeQuiz(){ completed.add(lessonIndex);localStorage.setItem(key(),JSON.stringify([...completed]));$("quizKicker").textContent=language==="ko"?"차시 학습 완료":"LESSON COMPLETE";$("quiz-title").textContent=language==="ko"?"이번 차시를 끝냈어요!":"Great work!";$("question").textContent=quizOrder.length+(language==="ko"?"문제 중 ":" questions, ")+correct+(language==="ko"?"문제를 한 번에 맞혔습니다.":" correct on the first try.");$("choices").replaceChildren();$("feedback").textContent="";$("nextQuestion").disabled=false;$("nextQuestion").dataset.action="overview";$("nextQuestion").textContent=language==="ko"?"차시 목록으로":"Back to lessons"; }
function setMode(next){mode=next;const study=mode==="study";$("studyView").hidden=!study;$("quizView").hidden=study;$("score").hidden=study;document.querySelectorAll(".mode-tab").forEach(b=>{const a=b.dataset.mode===mode;b.classList.toggle("active",a);b.setAttribute("aria-selected",String(a));});study?renderStudy():renderQuiz();}
function showOverview(){ $("learningShell").hidden=true;$("lessonOverview").hidden=false;renderLessonList(); }

document.querySelectorAll(".language-tab").forEach(b=>b.addEventListener("click",()=>{language=b.dataset.language;lessonIndex=0;completed=loadCompleted();document.querySelectorAll(".language-tab").forEach(x=>x.classList.toggle("active",x===b));showOverview();}));
document.querySelectorAll(".mode-tab").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));
$("backToLessons").addEventListener("click",showOverview);
$("next").addEventListener("click",()=>{if(studyPosition===studyBatch.length-1)setMode("quiz");else{studyPosition++;renderStudy();}});
$("previous").addEventListener("click",()=>{if(studyPosition>0)studyPosition--;renderStudy();});
$("nextQuestion").addEventListener("click",()=>{if($("nextQuestion").dataset.action==="overview")showOverview();else if(quizPosition===quizOrder.length-1)completeQuiz();else{quizPosition++;renderQuiz();}});
$("reviewAnswer").addEventListener("click",()=>{});
if(!decks?.ko?.length||!decks?.en?.length)throw new Error("속담 자료를 불러오지 못했습니다.");
renderLessonList();
