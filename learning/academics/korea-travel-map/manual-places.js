(() => {
  const entries = [
    ['gyeonggi-children-museum','경기도어린이박물관','경기도 용인시','science','🔬',37.2683,127.1097,'https://gcm.ggcf.kr/','몸·환경·건축·문화를 놀이로 탐구하는 참여형 전시','직접 움직여 결과가 달라지는 전시 하나의 원리를 설명해 보세요.'],
    ['imjingak-peace','임진각평화누리','경기도 파주시','culture','🕊️',37.8895,126.7401,'https://tour.paju.go.kr/','분단의 흔적과 접경지역의 지리, 평화를 바라는 상징','분단을 보여주는 시설 하나와 평화를 바라는 상징 하나를 찾아보세요.'],
    ['nakdong-estuary','낙동강하구에코센터','부산광역시 사하구','nature','🦆',35.1043,128.9463,'https://www.busan.go.kr/wetland/','강과 바다가 만나는 하구의 습지와 철새 생태','철새가 쉬거나 먹이를 찾기 좋은 환경 조건을 세 가지 찾아보세요.'],
    ['incheon-open-port-museum','인천개항박물관','인천광역시 중구','culture','⚓',37.4731,126.6215,'https://www.icjgss.or.kr/open_port/','개항 이후 들어온 교통·통신·금융과 도시 변화','개항으로 새로 생긴 물건이나 제도 하나가 생활을 어떻게 바꿨는지 설명해 보세요.'],
    ['ganghwa-dolmen-site','강화 고인돌 유적','인천광역시 강화군','culture','🪨',37.7547,126.4374,'https://www.ganghwa.go.kr/open_content/museum/','청동기 시대 무덤과 거대한 돌을 옮긴 공동체 기술','큰 돌을 운반하고 세우는 방법을 당시 도구로 상상해 그림으로 나타내 보세요.'],
    ['may18-records','5·18민주화운동기록관','광주광역시 동구','culture','📜',35.1483,126.9189,'https://www.518archives.go.kr/','시민의 기록으로 살펴보는 민주주의와 인권','같은 사건을 보여주는 서로 다른 기록 두 개에서 공통 사실을 찾아보세요.'],
    ['gangchon-rail-bike','강촌레일파크','강원특별자치도 춘천시','adventure','🚲',37.8180,127.7141,'https://www.railpark.co.kr/','옛 철길을 활용한 레일바이크와 북한강 지형','페달의 힘이 바퀴로 전달되는 부분을 관찰해 움직임을 설명해 보세요.'],
    ['chuncheon-forest-center','국립춘천숲체원','강원특별자치도 춘천시','adventure','🌲',37.9878,127.7304,'https://chuncheon.fowi.or.kr/','숲 생태와 협동 모험, 산림치유 활동','가족이 함께 활동할 때 안전과 협력을 위해 지킬 약속을 정해 보세요.'],
    ['samyang-round-hill','삼양라운드힐','강원특별자치도 평창군','career','🐄',37.7062,128.7395,'https://samyangroundhill.com/','넓은 고원 목장과 식품 생산, 풍력발전','목장에서 생산된 것이 식품이 되기까지 필요한 과정을 정리해 보세요.'],
    ['cheongju-early-printing','청주고인쇄박물관','충청북도 청주시','culture','📚',36.6432,127.4715,'https://www.cheongju.go.kr/jikjiworld/','금속활자와 직지, 인쇄가 지식 확산에 준 변화','목판과 금속활자의 제작·수정·대량 인쇄 차이를 비교해 보세요.'],
    ['seaquarium-seocheon','국립해양생물자원관 씨큐리움','충청남도 서천군','animal','🐚',36.0311,126.7187,'https://www.mabik.re.kr/','해양생물 표본과 생물자원 연구, 바다 보전','생김새가 비슷한 해양생물 두 종을 찾아 분류 기준을 적어 보세요.'],
    ['jeonju-hanok-village','전주 한옥마을','전북특별자치도 전주시','culture','🏘️',35.8150,127.1530,'https://hanok.jeonju.go.kr/','한옥 골목과 공예·한지·음식으로 만나는 전통생활','한옥의 지붕·마당·창호가 계절에 대응하는 방법을 찾아보세요.'],
    ['gyeongju-daereungwon','경주 대릉원','경상북도 경주시','culture','⛰️',35.8380,129.2121,'https://www.gyeongju.go.kr/tour/','신라 왕과 귀족의 돌무지덧널무덤과 고분 도시','무덤의 크기와 출토품이 당시 사회를 어떻게 보여주는지 추리해 보세요.'],
    ['andong-hahoe','안동 하회마을','경상북도 안동시','culture','🏡',36.5392,128.5182,'https://www.hahoe.or.kr/','강이 감싸는 전통마을의 지형과 가옥·탈춤 문화','강과 산의 위치가 마을을 보호하고 생활에 준 도움을 찾아보세요.'],
    ['mungyeong-eco-world','문경 에코월드','경상북도 문경시','career','⛏️',36.6544,128.0587,'https://www.mungyeong.go.kr/ecoworld/','석탄 산업의 역사와 영상 세트·모험시설의 재활용','폐광 지역이 새로운 체험 공간으로 바뀐 요소를 세 가지 찾아보세요.'],
    ['yeongju-sunbi-world','영주 선비세상','경상북도 영주시','culture','📖',36.8228,128.6255,'https://www.sunbiworld.kr/','한글·한복·한식·한옥·한지·국악을 연결한 전통문화 체험','여섯 주제 중 하나를 골라 오늘날 생활에 이어진 모습을 찾아보세요.'],
    ['gimhae-national-museum','국립김해박물관','경상남도 김해시','culture','⚔️',35.2427,128.8717,'https://gimhae.museum.go.kr/','가야의 철기와 무덤, 낙동강 교류','철로 만든 물건 세 가지를 찾아 가야 사회에서의 쓰임을 설명해 보세요.'],
    ['sacheon-aerospace-museum','사천항공우주박물관','경상남도 사천시','science','🛩️',35.0714,128.0632,'https://www.aerospacemuseum.co.kr/','항공기 실물과 국내 항공산업, 비행 원리','서로 다른 임무의 항공기 두 대를 골라 날개와 몸체를 비교해 보세요.'],
    ['park-981-jeju','9.81파크 제주','제주특별자치도 제주시','adventure','🏎️',33.3891,126.3665,'https://981park.com/','중력으로 움직이는 레이싱과 센서·기록 데이터','경사·무게·브레이크 사용이 기록에 어떤 영향을 주는지 비교해 보세요.']
  ];
  const info = {
    science:['과학·진로','사계절','실내 이용 가능','체험 회차 사전예약 확인'],
    culture:['역사·문화','사계절','실내·야외 동선 확인','해설·휴관일 확인'],
    nature:['자연·생태','봄·가을','날씨·탐방로 상태 확인','개방시간·탐방 안내 확인'],
    adventure:['모험·체육','봄·가을','기상 악화 시 제한 가능','신장·연령·운영 제한 확인'],
    career:['직업·생활','사계절','체험별 실내·야외 확인','체험 프로그램 사전예약 확인'],
    animal:['동물·생태','봄·가을','실내·야외 시설 확인','먹이주기·체험 시간 확인']
  };
  const endings = {
    science:'직접 만지고 비교하며 과학 원리를 실제 기술과 현상에 연결할 수 있어요.',culture:'현장의 공간과 기록을 연결해 사람들의 생활과 선택을 이해할 수 있어요.',nature:'지형과 생물의 관계를 관찰하며 자연환경이 연결되는 방식을 배울 수 있어요.',adventure:'몸을 움직이며 힘과 균형, 안전장비와 판단의 중요성을 확인할 수 있어요.',career:'결과가 만들어지기까지 필요한 사람과 기술, 과정과 협업을 살펴볼 수 있어요.',animal:'동물의 행동과 생활환경을 관찰하며 생태 보전과 책임 있는 관람을 생각할 수 있어요.'
  };
  window.KOREA_TRAVEL_PLACES.push(...entries.map(([id,name,region,category,emoji,lat,lng,officialUrl,focus,mission]) => {
    const [categoryName,season,weather,reservation] = info[category];
    return {id,name,region,category,categoryName,emoji,lat,lng,description:`${name}에서는 ${focus}에 관한 내용을 직접 살펴볼 수 있어요. ${endings[category]}`,mission,season,weather,reservation,officialUrl};
  }));
})();