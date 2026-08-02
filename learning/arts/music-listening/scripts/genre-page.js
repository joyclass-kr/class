const data=window.MUSIC_GENRE;
const history=document.querySelector('#history');
const library=document.querySelector('#library');
const eraTabs=document.querySelector('#era-tabs');
const eraPanel=document.querySelector('#era-panel');
const filters=document.querySelector('#lineage-filters');
const playlist=document.querySelector('#playlist');
const dialog=document.querySelector('#detail-dialog');
const detail=document.querySelector('#detail-content');
const studyGuide=data.guides?document.createElement('aside'):null;
const subfilters=data.subgroups?document.createElement('div'):null;
let eraIndex=0;
let currentLineage='all';
let currentSubgroup='all';

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
if(data.integrated){
  document.body.classList.add('integrated-genre');
  const eraMode=data.integrated==='era';
  document.body.classList.add(eraMode?'era-integrated':'lineage-integrated');
  eraTabs.hidden=!eraMode;
  filters.setAttribute('aria-label',eraMode?'팝 장르 선택':'재즈 시대와 양식 선택');
  if(eraMode){
    eraTabs.setAttribute('aria-label','팝 시대 선택');
    history.append(eraTabs,filters);
    if(subfilters)history.append(subfilters);
    history.append(eraPanel,playlist);
  }else{
    history.append(filters,eraPanel,playlist);
  }
  library.hidden=true;
  if(studyGuide)studyGuide.hidden=true;
}

function cardInEra(card){
  if(data.integrated!=='era')return true;
  const year=Number.parseInt(card.years);
  if(eraIndex===data.eras.length-1)return year>=2000;
  const start=1950+eraIndex*10;
  return year>=start&&year<start+10;
}

function matchingCount(lineage='all',subgroup='all'){
  return data.cards.filter(card=>cardInEra(card)&&(lineage==='all'||card.lineage===lineage)&&(subgroup==='all'||card.subgroup===subgroup)).length;
}

function normalizeEraFilters(){
  if(data.integrated!=='era')return;
  if(currentLineage!=='all'&&matchingCount(currentLineage,'all')===0){
    currentLineage='all';
    currentSubgroup='all';
    renderSubgroups('all');
  }
  filters.querySelectorAll('button').forEach(button=>{
    const key=button.dataset.lineage;
    button.disabled=key!=='all'&&matchingCount(key,'all')===0;
    button.classList.toggle('active',key===currentLineage);
  });
  subfilters?.querySelectorAll('button').forEach(button=>{
    const key=button.dataset.subgroup;
    button.disabled=key!=='all'&&matchingCount(currentLineage,key)===0;
  });
}

function renderEra(lineage=currentLineage,subgroup=currentSubgroup){
  if(data.integrated===true){
    const era=data.lineageStories[lineage]||data.lineageStories.all;
    const count=data.cards.filter(card=>lineage==='all'||card.lineage===lineage).length;
    eraPanel.innerHTML=`<div class="years">${era.years}</div><div><h3>${era.name}<small>${era.english}</small></h3><p>${era.story}</p><p class="turn"><strong>음악적으로 듣기:</strong> ${era.sound}</p><p class="integrated-question"><strong>들으며 생각하기:</strong> ${era.question}</p><b class="integrated-count">대표곡 ${count}개</b></div>`;
    return;
  }
  if(data.integrated==='era'){
    normalizeEraFilters();
    lineage=currentLineage;
    subgroup=currentSubgroup;
    const era=data.eras[eraIndex];
    const guide=guideFor(lineage,subgroup);
    const description=data.descriptions?.[subgroup==='all'?lineage:`${lineage}:${subgroup}`];
    const count=data.cards.filter(card=>cardInEra(card)&&(lineage==='all'||card.lineage===lineage)&&(subgroup==='all'||card.subgroup===subgroup)).length;
    const genreName=(subgroup!=='all'?(guide?.title||'세부 장르'):lineage!=='all'?(guide?.title||'장르'):'').replace(/\d+곡/,`${count}곡`);
    const question=(guide?.question||'이 시대의 악기, 리듬과 제작 방식이 이전 시대와 어떻게 달라졌는지 비교해 보세요.').replace(/(?:다섯|여섯|일곱|여덟|아홉|열|\d+) 곡에서/g,'선택된 곡들에서');
    eraPanel.innerHTML=`<div class="years">${era.years}</div><div><h3>${era.name}<small>${era.english}</small></h3><p>${era.story}</p>${genreName?`<h4 class="context-title">${genreName}</h4>`:''}${description?`<p>${description}</p>`:''}<p class="turn"><strong>음악적으로 듣기:</strong> ${guide?.traits||era.turn}</p><p class="integrated-question"><strong>들으며 생각하기:</strong> ${question}</p><b class="integrated-count">대표곡 ${count}개</b></div>`;
    eraTabs.innerHTML=data.eras.map((item,index)=>`<button class="${index===eraIndex?'active':''}" data-era-index="${index}">${item.years}</button>`).join('');
    eraTabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{eraIndex=Number(button.dataset.eraIndex);renderEra();renderCards(currentLineage,currentSubgroup)}));
    return;
  }
  const era=data.eras[eraIndex];
  eraTabs.innerHTML=data.eras.map((item,index)=>`<button class="${index===eraIndex?'active':''}" data-era-index="${index}">${item.years}</button>`).join('');
  eraPanel.innerHTML=`<div class="years">${era.years}</div><div><h3>${era.name}<small>${era.english}</small></h3><p>${era.story}</p><p class="turn"><strong>시대를 바꾼 소리:</strong> ${era.turn}</p></div>`;
  eraTabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{eraIndex=Number(button.dataset.eraIndex);renderEra()}));
}

function guideFor(lineage,subgroup='all'){
  return data.guides?.[subgroup==='all'?lineage:`${lineage}:${subgroup}`]||data.guides?.[lineage];
}

function cardStyle(card){
  if(card.style&&!card.style.includes('?'))return card.style;
  return guideFor(card.lineage,card.subgroup)?.title
    .replace(/\s+\d+곡.*$/,'')
    .replace(' 비교 듣기','')||card.styleEn;
}

function cardPoint(card){
  if(card.point&&!card.point.includes('?'))return card.point;
  return guideFor(card.lineage,card.subgroup)?.question||'같은 세부 장르의 다른 곡과 리듬·음색·보컬을 비교해보세요.';
}

function renderCards(lineage='all',subgroup='all'){
  const cards=data.cards.filter(card=>cardInEra(card)&&(lineage==='all'||card.lineage===lineage)&&(subgroup==='all'||card.subgroup===subgroup)).sort((a,b)=>Number.parseInt(a.years)-Number.parseInt(b.years));
  if(studyGuide&&!data.integrated){
    const guide=guideFor(lineage,subgroup);
    const description=data.descriptions?.[subgroup==='all'?lineage:`${lineage}:${subgroup}`];
    studyGuide.hidden=!guide;
    if(guide)studyGuide.innerHTML=`<div><span>GENRE GUIDE · COMPARE &amp; DISCOVER</span><h3>${guide.title}</h3>${description?`<p class="genre-description">${description}</p>`:''}<p class="question"><strong>들으며 생각하기</strong>${guide.question}</p></div><p class="traits"><strong>공통점 후보</strong>${guide.traits}</p><b>${cards.length}곡</b>`;
  }
  playlist.innerHTML=cards.length?cards.map(card=>`<article class="piece"><p class="meta">${card.years} · ${cardStyle(card)} (${card.styleEn})</p><h3 lang="en">${card.original}</h3><p class="artist">${card.artist}</p><p class="point">${cardPoint(card)}</p><div class="actions"><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(card.artist+' '+card.original)}" target="_blank" rel="noopener">찾아 듣기</a><button data-card="${data.cards.indexOf(card)}">자세한 해설</button></div></article>`).join(''):`<p class="empty-state">이 조건에 해당하는 대표곡이 없습니다. 다른 시대나 장르를 선택해 보세요.</p>`;
  playlist.querySelectorAll('[data-card]').forEach(button=>button.addEventListener('click',()=>openDetail(Number(button.dataset.card))));
}

function renderSubgroups(lineage){
  if(!subfilters)return;
  const groups=data.subgroups[lineage];
  subfilters.hidden=!groups;
  if(!groups){subfilters.innerHTML='';return 'all';}
  const selected=groups[0][0];
  const lineageLabel=data.lineages.find(([key])=>key===lineage)?.[1]||lineage;
  subfilters.setAttribute('aria-label',`${lineageLabel} 하위 갈래`);
  subfilters.innerHTML=groups.map(([key,label])=>`<button class="${key===selected?'active':''}" data-subgroup="${key}">${label}</button>`).join('');
  subfilters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    subfilters.querySelector('.active')?.classList.remove('active');
    button.classList.add('active');
    currentSubgroup=button.dataset.subgroup;
    if(data.integrated==='era')renderEra(lineage,currentSubgroup);
    renderCards(lineage,currentSubgroup);
  }));
  return selected;
}

function openDetail(index){
  const card=data.cards[index];
  const guide=guideFor(card.lineage,card.subgroup);
  const description=data.descriptions?.[`${card.lineage}:${card.subgroup}`];
  detail.innerHTML=`<p class="kind">${card.years} · ${cardStyle(card)} (${card.styleEn})</p><h2 lang="en">${card.original}</h2><p class="original">${card.artist}</p><section><h3>음악사 속 위치</h3><p>${card.history||`${guide?.title||cardStyle(card)}의 대표적인 비교 감상곡입니다.`}</p></section><section><h3>음악적 특징</h3><p>${card.sound||description||guide?.traits||cardStyle(card)}</p></section><section><h3>감상 포인트</h3><p>${cardPoint(card)}</p></section>`;
  dialog.showModal();
}

const eraMode=data.integrated==='era';
const filterItems=eraMode?[['all','전체 장르 (All)'],...data.lineages]:[...data.lineages,['all',`전체 ${data.cards.length}곡 (All)`]];
const defaultLineage=filterItems[0][0];
currentLineage=defaultLineage;
filters.innerHTML=filterItems.map(([key,label],index)=>`<button class="${index===0?'active':''}" data-lineage="${key}">${label}</button>`).join('');
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{filters.querySelector('.active').classList.remove('active');button.classList.add('active');currentLineage=button.dataset.lineage;currentSubgroup=renderSubgroups(currentLineage);if(data.integrated)renderEra(currentLineage,currentSubgroup);renderCards(currentLineage,currentSubgroup)}));
dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('.dialog-close'))dialog.close()});
currentSubgroup=renderSubgroups(defaultLineage);
renderEra(data.integrated?defaultLineage:undefined,currentSubgroup);renderCards(defaultLineage,currentSubgroup);
