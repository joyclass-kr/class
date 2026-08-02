const data=window.MUSIC_GENRE;
const eraTabs=document.querySelector('#era-tabs');
const eraPanel=document.querySelector('#era-panel');
const filters=document.querySelector('#lineage-filters');
const playlist=document.querySelector('#playlist');
const dialog=document.querySelector('#detail-dialog');
const detail=document.querySelector('#detail-content');
let eraIndex=0;

function renderEra(){
  const era=data.eras[eraIndex];
  eraTabs.innerHTML=data.eras.map((item,index)=>`<button class="${index===eraIndex?'active':''}" data-era-index="${index}">${item.years}</button>`).join('');
  eraPanel.innerHTML=`<div class="years">${era.years}</div><div><h3>${era.name}<small>${era.english}</small></h3><p>${era.story}</p><p class="turn"><strong>시대를 바꾼 소리:</strong> ${era.turn}</p></div>`;
  eraTabs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{eraIndex=Number(button.dataset.eraIndex);renderEra()}));
}

function renderCards(lineage='all'){
  const cards=data.cards.filter(card=>lineage==='all'||card.lineage===lineage);
  playlist.innerHTML=cards.map((card,index)=>`<article class="piece"><p class="meta">${card.years} · ${card.style} (${card.styleEn})</p><h3 lang="en">${card.original}</h3><p class="artist">${card.artist}</p><p class="point">${card.point}</p><div class="actions"><a href="https://www.youtube.com/results?search_query=${encodeURIComponent(card.artist+' '+card.original)}" target="_blank" rel="noopener">찾아 듣기</a><button data-card="${data.cards.indexOf(card)}">자세한 해설</button></div></article>`).join('');
  playlist.querySelectorAll('[data-card]').forEach(button=>button.addEventListener('click',()=>openDetail(Number(button.dataset.card))));
}

function openDetail(index){
  const card=data.cards[index];
  detail.innerHTML=`<p class="kind">${card.years} · ${card.style} (${card.styleEn})</p><h2 lang="en">${card.original}</h2><p class="original">${card.artist}</p><section><h3>음악사 속 위치</h3><p>${card.history}</p></section><section><h3>음악적 특징</h3><p>${card.sound}</p></section><section><h3>감상 포인트</h3><p>${card.point}</p></section>`;
  dialog.showModal();
}

filters.innerHTML=[['all','전체 (All)'],...data.lineages].map(([key,label],index)=>`<button class="${index===0?'active':''}" data-lineage="${key}">${label}</button>`).join('');
filters.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{filters.querySelector('.active').classList.remove('active');button.classList.add('active');renderCards(button.dataset.lineage)}));
dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('.dialog-close'))dialog.close()});
renderEra();renderCards();
