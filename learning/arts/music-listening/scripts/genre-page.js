const data=window.MUSIC_GENRE;
const eraTabs=document.querySelector('#era-tabs');
const eraPanel=document.querySelector('#era-panel');
const filters=document.querySelector('#lineage-filters');
const playlist=document.querySelector('#playlist');
const dialog=document.querySelector('#detail-dialog');
const detail=document.querySelector('#detail-content');
const studyGuide=data.guides?document.createElement('aside'):null;
const subfilters=data.subgroups?document.createElement('div'):null;
let eraIndex=0;

if(studyGuide){
  studyGuide.id='study-guide';
  studyGuide.className='study-guide';
  studyGuide.setAttribute('aria-live','polite');
  playlist.before(studyGuide);
}
if(subfilters){
  subfilters.id='subgenre-filters';
  subfilters.className='filters subfilters';
  subfilters.setAttribute('aria-label','R&B·소울 하위 갈래');
  filters.after(subfilters);
}

function renderEra(){
  const era=data.eras[eraIndex];
  eraTabs.innerHTML=data.eras.map((item,index)=>`<button class="${index===eraIndex?'active':''}" data-era-index="${index}">${item.years}</button>`).join('');
  eraPanel.innerHTML=`<div class="years">${era.years}</div><div><h3>${era.name}<small>${era.english}</small></h3><p>${era.story}</p><p class="turn"><strong>시대를 바꾼 소리:</strong> ${era.turn}</p></div>`;
  eraTabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{eraIndex=Number(button.dataset.eraIndex);renderEra()}));
}

function renderCards(lineage='all',subgroup='all'){
  const cards=data.cards.filter(card=>(lineage==='all'||card.lineage===lineage)&&(subgroup==='all'||card.subgroup===subgroup)).sort((a,b)=>Number.parseInt(a.years)-Number.parseInt(b.years));
  if(studyGuide){
    const guide=data.guides[subgroup==='all'?lineage:`${lineage}:${subgroup}`];
    studyGuide.hidden=!guide;
    if(guide)studyGuide.innerHTML=`<div><span>COMPARE &amp; DISCOVER</span><h3>${guide.title}</h3><p>${guide.question}</p></div><p class="traits"><strong>공통점 후보</strong>${guide.traits}</p><b>${cards.length}곡</b>`;
  }
  playlist.innerHTML=cards.map((card,index)=>`<article class="piece"><p class="meta">${card.years} · ${card.style} (${card.styleEn})</p><h3 lang="en">${card.original}</h3><p class="artist">${card.artist}</p><p class="point">${card.point}</p><div class="actions"><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(card.artist+' '+card.original)}" target="_blank" rel="noopener">찾아 듣기</a><button data-card="${data.cards.indexOf(card)}">자세한 해설</button></div></article>`).join('');
  playlist.querySelectorAll('[data-card]').forEach(button=>button.addEventListener('click',()=>openDetail(Number(button.dataset.card))));
}

function renderSubgroups(lineage){
  if(!subfilters)return;
  const groups=data.subgroups[lineage];
  subfilters.hidden=!groups;
  if(!groups){subfilters.innerHTML='';return;}
  subfilters.innerHTML=groups.map(([key,label],index)=>`<button class="${index===0?'active':''}" data-subgroup="${key}">${label}</button>`).join('');
  subfilters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    subfilters.querySelector('.active')?.classList.remove('active');
    button.classList.add('active');
    renderCards(lineage,button.dataset.subgroup);
  }));
}

function openDetail(index){
  const card=data.cards[index];
  detail.innerHTML=`<p class="kind">${card.years} · ${card.style} (${card.styleEn})</p><h2 lang="en">${card.original}</h2><p class="original">${card.artist}</p><section><h3>음악사 속 위치</h3><p>${card.history}</p></section><section><h3>음악적 특징</h3><p>${card.sound}</p></section><section><h3>감상 포인트</h3><p>${card.point}</p></section>`;
  dialog.showModal();
}

const defaultLineage=data.lineages[0][0];
filters.innerHTML=[...data.lineages,['all',`전체 ${data.cards.length}곡 (All)`]].map(([key,label],index)=>`<button class="${index===0?'active':''}" data-lineage="${key}">${label}</button>`).join('');
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{filters.querySelector('.active').classList.remove('active');button.classList.add('active');renderSubgroups(button.dataset.lineage);renderCards(button.dataset.lineage)}));
dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('.dialog-close'))dialog.close()});
renderEra();renderSubgroups(defaultLineage);renderCards(defaultLineage);
