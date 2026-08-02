const histories={
  classical:{kicker:'CLASSICAL MUSIC HISTORY',title:'클래식 음악사의 큰 흐름',intro:'사회와 예술관, 악기와 연주 공간의 변화가 음악의 형식과 소리를 어떻게 바꾸었는지 살펴봅니다.',more:'../classical-music/',eras:[
    {year:'500–1400',name:'중세 음악',story:'서양 교회음악을 중심으로 단선율 성가가 기록되었고, 이후 여러 성부가 함께 움직이는 초기 다성음악이 발전했습니다. 기보법의 발달은 음악을 보존하고 널리 전하는 토대가 되었습니다.',listen:'Gregorian chant Dies Irae',point:'하나의 선율과 울림이 만드는 고요한 분위기를 들어 보세요.'},
    {year:'1400–1600',name:'르네상스 음악',story:'인문주의의 확산과 인쇄술의 발달 속에서 부드럽게 어우러지는 다성음악이 꽃피었습니다. 종교음악뿐 아니라 마드리갈 같은 세속 성악곡도 널리 불렸습니다.',listen:'Palestrina Sicut cervus',point:'각 성부가 모방하며 자연스럽게 이어지는 흐름을 찾아보세요.'},
    {year:'1600–1750',name:'바로크 음악',story:'오페라가 탄생하고 장·단조 체계와 통주저음이 자리 잡았습니다. 화려한 장식, 강한 대비, 반복되는 리듬 속에서 협주곡·모음곡·푸가가 발전했습니다.',listen:'Vivaldi Four Seasons Spring',point:'독주와 합주가 주고받는 대비를 들어 보세요.'},
    {year:'1750–1820',name:'고전주의 음악',story:'균형과 명료함을 중시하며 소나타 형식, 교향곡, 현악 사중주가 정교해졌습니다. 공개 연주회와 시민 청중이 성장하면서 기악음악의 중심이 확대되었습니다.',listen:'Mozart Symphony 40 first movement',point:'대조되는 두 주제가 어떻게 제시되고 발전하는지 들어 보세요.'},
    {year:'1820–1900',name:'낭만주의 음악',story:'개인의 감정, 문학, 자연과 민족적 정체성을 음악에 담았습니다. 오케스트라가 커지고 음색이 풍부해졌으며 예술가곡, 교향시와 성격소품이 사랑받았습니다.',listen:'Tchaikovsky Swan Lake Scene',point:'선율과 셈여림이 감정을 크게 움직이는 방식을 느껴 보세요.'},
    {year:'1900–Now',name:'현대·동시대 음악',story:'조성의 경계를 넘어 인상주의, 무조음악, 신고전주의, 전자음악, 미니멀리즘 등 다양한 언어가 공존합니다. 오늘날에는 영상과 디지털 기술, 세계 여러 전통도 창작의 재료가 됩니다.',listen:'Stravinsky Rite of Spring introduction',point:'익숙한 박자와 화음에서 벗어난 새로운 소리를 찾아보세요.'}
  ]},
  pop:{kicker:'POP HISTORY',title:'팝의 역사를 귀로 따라가요',intro:'기술과 청년 문화가 바뀔 때마다 대중음악의 소리도 달라졌습니다.',eras:[
    {year:'1950s',name:'로큰롤의 탄생',story:'리듬 앤 블루스와 컨트리 음악이 만나 강한 백비트와 전기 기타 중심의 로큰롤이 탄생했습니다. 라디오와 10대 문화가 새 음악을 빠르게 퍼뜨렸습니다.',listen:'Chuck Berry Johnny B. Goode',point:'기타 리프와 2·4박의 강한 스네어를 들어 보세요.'},
    {year:'1960s',name:'밴드와 창작의 시대',story:'영국 밴드의 세계적 성공, 소울과 모타운의 성장, 녹음 기술의 발전이 팝을 바꾸었습니다. 스튜디오 자체가 새로운 악기처럼 쓰이기 시작했습니다.',listen:'The Beatles A Day in the Life',point:'한 곡 안에서 달라지는 편곡과 음색을 찾아보세요.'},
    {year:'1970s',name:'록·디스코·싱어송라이터',story:'록은 더 크고 다양해졌고, 디스코는 춤추기 좋은 일정한 박자로 클럽을 채웠습니다. 자신의 이야기를 직접 쓰고 부르는 싱어송라이터도 주목받았습니다.',listen:'Bee Gees Stayin Alive',point:'끊임없이 이어지는 4박자와 높은 보컬을 들어 보세요.'},
    {year:'1980s',name:'MTV와 전자음향',story:'뮤직비디오가 음악의 이미지를 바꾸고 신시사이저, 드럼 머신, 디지털 녹음이 팝의 중심에 섰습니다. 스타의 시각적 연출도 음악만큼 중요해졌습니다.',listen:'Michael Jackson Billie Jean',point:'베이스 리듬과 드럼 머신의 정확한 박자를 들어 보세요.'},
    {year:'1990s',name:'장르의 경계가 흐려지다',story:'힙합과 R&B가 주류로 성장하고 얼터너티브 록, 보이 밴드와 걸 그룹이 공존했습니다. 샘플링은 과거의 소리를 새 곡 안에 불러왔습니다.',listen:'TLC No Scrubs',point:'겹쳐지는 보컬과 잘게 나뉜 리듬을 들어 보세요.'},
    {year:'2000s–Now',name:'디지털과 글로벌 팝',story:'다운로드와 스트리밍이 앨범 중심의 감상을 바꾸었습니다. EDM, 힙합, 라틴 팝, K-pop이 국경을 넘으며 여러 언어와 스타일이 한 곡에서 만납니다.',listen:'global pop music history playlist',point:'전자음향과 서로 다른 지역의 리듬이 섞이는 방식을 찾아보세요.'}
  ]},
  jazz:{kicker:'JAZZ HISTORY',title:'재즈의 역사를 리듬으로 걸어요',intro:'즉흥연주와 스윙을 중심으로 재즈는 도시와 시대에 따라 끊임없이 모습을 바꾸었습니다.',eras:[
    {year:'1900s–20s',name:'뉴올리언스와 초기 재즈',story:'블루스, 래그타임, 행진 음악과 아프리카계 미국인의 음악 전통이 뉴올리언스에서 만났습니다. 여러 악기가 동시에 선율을 꾸미는 집단 즉흥연주가 특징입니다.',listen:'Louis Armstrong West End Blues',point:'트럼펫이 선율을 자유롭게 바꾸는 순간을 들어 보세요.'},
    {year:'1930s',name:'스윙과 빅밴드',story:'큰 댄스홀에서 빅밴드가 연주하는 스윙이 대중음악의 중심이 되었습니다. 섹션별로 주고받는 편곡과 몸을 움직이게 하는 리듬이 인기를 끌었습니다.',listen:'Duke Ellington It Dont Mean a Thing',point:'긴 음과 짧은 음이 튕기듯 이어지는 스윙감을 느껴 보세요.'},
    {year:'1940s',name:'비밥의 혁신',story:'소규모 연주자들이 빠른 템포, 복잡한 화음, 긴 즉흥연주를 탐구했습니다. 춤을 위한 음악에서 집중해 듣는 예술 음악으로 재즈의 무게중심이 이동했습니다.',listen:'Charlie Parker Ornithology',point:'주제 뒤에 이어지는 빠르고 복잡한 즉흥 선율을 따라가 보세요.'},
    {year:'1950s',name:'쿨 재즈와 하드 밥',story:'절제되고 부드러운 쿨 재즈와 블루스·가스펠의 힘을 되살린 하드 밥이 서로 다른 매력으로 발전했습니다.',listen:'Miles Davis So What',point:'짧은 주제를 바탕으로 각 연주자의 솔로가 달라지는지 들어 보세요.'},
    {year:'1960s',name:'모달과 프리 재즈',story:'정해진 화음 진행에서 벗어나 선법을 활용하거나 형식 자체를 자유롭게 만드는 실험이 이어졌습니다. 연주자 사이의 즉각적인 대화가 더욱 중요해졌습니다.',listen:'John Coltrane My Favorite Things',point:'같은 선법 위에서 선율이 점점 확장되는 과정을 들어 보세요.'},
    {year:'1970s–Now',name:'퓨전과 오늘의 재즈',story:'록의 전기 악기와 강한 비트가 재즈 즉흥연주와 결합해 퓨전이 탄생했습니다. 오늘날 재즈는 힙합, 전자음악, 세계 각지의 전통음악과 계속 만나고 있습니다.',listen:'Herbie Hancock Chameleon',point:'신시사이저 베이스의 반복 위에 즉흥연주가 쌓이는 모습을 들어 보세요.'}
  ]}
};

let genre='classical',index=0;
const $=selector=>document.querySelector(selector);
function render(){
  const data=histories[genre], era=data.eras[index];
  $('#history-kicker').textContent=data.kicker; $('#history-title').textContent=data.title; $('#history-intro').textContent=data.intro;
  $('#era-tabs').innerHTML=data.eras.map((item,i)=>`<button role="tab" aria-selected="${i===index}" data-index="${i}">${item.year}</button>`).join('');
  $('#era-panel').innerHTML=`<div class="era-year">${era.year}</div><div><h3>${era.name}</h3><p>${era.story}</p><p><strong>감상 포인트:</strong> ${era.point}</p></div><div class="listen-actions"><a class="listen" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(era.listen)}">대표 음악 찾아 듣기<small>${era.listen}</small></a>${data.more?`<a class="more" href="${data.more}">클래식 감상·퀴즈 →</a>`:''}</div>`;
  $('#timeline').innerHTML=data.eras.map((item,i)=>`<button class="${i===index?'active':''}" data-index="${i}"><b>${item.year}</b><br>${item.name}</button>`).join('');
  document.querySelectorAll('[data-index]').forEach(button=>button.addEventListener('click',()=>{index=Number(button.dataset.index);render()}));
}
document.querySelectorAll('[data-genre]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-genre]').forEach(x=>x.classList.remove('active'));button.classList.add('active');genre=button.dataset.genre;index=0;render()}));
render();
