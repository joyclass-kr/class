(()=>{
const {pieces,allQuestions}=window.CLASSICAL_DATA;
const playlist=document.querySelector('#playlist');
const filters=document.querySelector('#classical-filters');
const dialog=document.querySelector('#detail-dialog');
const detail=document.querySelector('#detail-content');
const eras=[['all','전체 30'],['baroque','바로크 (Baroque)'],['classical','고전주의 (Classical)'],['romantic','낭만주의 (Romantic)'],['modern','20세기 (20th Century)']];

function renderCards(era='all'){
  const cards=pieces.filter(piece=>era==='all'||piece.era===era);
  playlist.innerHTML=cards.map(piece=>`<article class="piece"><p class="meta">${piece.period} · ${piece.form}</p><h3>${piece.title}</h3><p class="original">${piece.originalTitle}</p><p class="artist">${piece.composer} · ${piece.year}</p><p class="point">${piece.feature}</p><div class="actions"><a href="${piece.url}" target="_blank" rel="noopener">찾아 듣기</a><button data-piece="${piece.no}">자세한 해설</button></div></article>`).join('');
  playlist.querySelectorAll('[data-piece]').forEach(button=>button.addEventListener('click',()=>openDetail(button.dataset.piece)));
}
function openDetail(no){const piece=pieces.find(item=>item.no===no);detail.innerHTML=`<p class="kind">${piece.period} · ${piece.form}</p><h2>${piece.title}</h2><p class="original">${piece.originalTitle} · ${piece.composer}</p><section><h3>시대와 작품</h3><p>${piece.story}</p></section><section><h3>음악적 특징</h3><p>${piece.feature}</p></section><section><h3>감상 포인트</h3><p>${piece.note}</p></section>`;dialog.showModal()}
filters.innerHTML=eras.map(([key,label],index)=>`<button class="${index===0?'active':''}" data-era="${key}">${label}</button>`).join('');
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{filters.querySelector('.active').classList.remove('active');button.classList.add('active');renderCards(button.dataset.era)}));
dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('.dialog-close'))dialog.close()});

let current=[];
const quizBox=document.querySelector('#quiz-box');
function shuffle(items){return [...items].map(value=>({value,order:Math.random()})).sort((a,b)=>a.order-b.order).map(item=>item.value)}
document.querySelector('#new-quiz').addEventListener('click',()=>{const era=document.querySelector('#quiz-era').value;const count=Number(document.querySelector('#quiz-count').value);const pool=allQuestions.filter(question=>era==='all'||question.piece.era===era);current=shuffle(pool).slice(0,count);quizBox.innerHTML=current.map((question,index)=>`<fieldset><legend><span>${index+1}</span>${question.stem}</legend><p class="quiz-piece">${question.piece.title} · ${question.piece.composer}</p>${question.choices.map((choice,choiceIndex)=>`<label><input type="radio" name="q${index}" value="${choiceIndex}"><span>${choice}</span></label>`).join('')}<p class="feedback" hidden></p></fieldset>`).join('');document.querySelector('.quiz-actions').hidden=false;document.querySelector('#quiz-result').textContent=''});
document.querySelector('#check-answer').addEventListener('click',()=>{let correct=0;current.forEach((question,index)=>{const field=quizBox.querySelectorAll('fieldset')[index];const selected=field.querySelector('input:checked');const ok=selected&&Number(selected.value)===question.correct;if(ok)correct++;const feedback=field.querySelector('.feedback');feedback.hidden=false;feedback.textContent=ok?'정답입니다.':`정답: ${question.answer}`;field.classList.toggle('correct',!!ok);field.classList.toggle('wrong',!ok)});document.querySelector('#quiz-result').textContent=`${current.length}문제 중 ${correct}문제를 맞혔습니다.`});
renderCards();
})();
