(() => {
  'use strict';

  const artworkRoot = '../art-appreciation/museum/assets/artworks/';
  const lessons = [
    {
      id: 'color-perception', number: '01', track: '색을 이해하기', title: '색은 어떻게 보이는가',
      question: '빛·물체·눈 가운데 하나만 없어도 색을 볼 수 있을까?',
      concept: `
        <p class="lead">색은 물체에 고정된 이름표가 아닙니다. <strong>광원이 낸 빛</strong>이 물체에 닿고, 물체가 일부 파장의 빛을 반사하며, 눈과 뇌가 그 신호를 해석할 때 비로소 색으로 지각됩니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>광원</dt><dd>태양·전등·화면처럼 빛을 내는 원천입니다. 광원의 빛 성분이 달라지면 같은 물체도 다른 색으로 보입니다.</dd></div>
          <div class="term-row"><dt>선택적 반사</dt><dd>물체는 들어온 빛의 일부를 흡수하고 일부를 반사합니다. 붉게 보이는 물체는 주어진 조명 아래에서 붉은 계열의 빛을 상대적으로 많이 반사합니다.</dd></div>
          <div class="term-row"><dt>시각적 지각</dt><dd>눈의 원추세포가 파장 정보를 받아들이고 뇌가 주변 밝기·색·기억과 함께 해석합니다. 그래서 색은 주변 조건에 따라 달라 보일 수 있습니다.</dd></div>
          <div class="term-row"><dt>색 순응</dt><dd>조명이 바뀌어도 익숙한 물체의 색을 비교적 일정하게 보려는 시각의 작용입니다. 완전히 정확한 보정은 아니므로 색채 작업에서는 조명 조건이 중요합니다.</dd></div>
        </dl>
        <p class="claim"><strong>핵심</strong> — “사과는 빨갛다”보다 “이 조명 아래에서 사과가 붉은 계열의 빛을 많이 반사해 그렇게 보인다”가 더 정확한 설명입니다.</p>`,
      visual: { type: 'image', src: 'p08.jpg', alt: '요하네스 페르메이르의 우유를 따르는 여인', title: '요하네스 페르메이르, 〈우유를 따르는 여인〉', meta: '1658–1660년경 · 캔버스에 유채', note: '왼쪽 창에서 들어온 빛이 벽·빵·주전자·옷에 닿으며 재료마다 서로 다른 색과 질감으로 반사됩니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>광원의 방향:</strong> 인물 왼쪽 창에서 빛이 들어온다는 근거를 밝은 면과 그림자의 방향에서 찾습니다.</li>
          <li><strong>재료별 반사:</strong> 흰 벽, 노란 옷, 금속 주전자, 빵 표면이 같은 빛을 어떻게 다르게 반사하는지 비교합니다.</li>
          <li><strong>명암:</strong> 가장 밝은 곳부터 어두운 곳까지 시선을 옮기며 입체감이 생기는 과정을 봅니다.</li>
          <li><strong>해석:</strong> 빛의 세밀한 차이가 평범한 부엌일을 조용하고 집중된 장면으로 바꾸는지 설명합니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '광원', title: '같은 물체도 조명에 따라 달라진다', body: '태양빛, 백열등, 차가운 LED는 포함하는 빛의 성분이 다릅니다. 작품이나 색표를 비교할 때는 어떤 조명 아래에서 보는지 먼저 확인해야 합니다.' },
        { label: '반사', title: '물체는 빛을 선택적으로 반사한다', body: '물체가 모든 빛을 똑같이 반사하면 흰색이나 회색으로, 특정 영역을 더 많이 반사하면 그 영역에 해당하는 색으로 보입니다.' },
        { label: '주변색', title: '색은 혼자 보이지 않는다', body: '같은 회색도 밝은 바탕에서는 어둡게, 어두운 바탕에서는 밝게 보입니다. 색을 판단할 때는 주변의 명도와 색을 함께 보아야 합니다.' }
      ] },
      quiz: { question: '같은 흰 종이가 노란 조명 아래에서 누렇게 보이는 가장 직접적인 까닭은?', choices: ['종이의 재료가 즉시 노란색으로 변해서', '종이에 도달한 광원의 빛 성분이 달라서', '색상환의 위치가 움직여서'], correct: 1, explanation: '물체에서 반사되어 눈에 들어오는 빛은 광원의 성분에 영향을 받습니다.' }
    },
    {
      id: 'color-properties', number: '02', track: '색을 이해하기', title: '색의 세 가지 속성',
      question: '같은 파랑도 왜 서로 다른 색으로 보일까?',
      concept: `
        <p class="lead">색을 정확히 비교하려면 “무슨 색인가”, “얼마나 밝은가”, “얼마나 선명한가”를 나누어 보아야 합니다. 이 세 기준이 각각 <strong>색상·명도·채도</strong>입니다.</p>
        <p class="lead">먼셀 색 체계의 기본 10색상환은 <strong>R–YR–Y–GY–G–BG–B–PB–P–RP</strong> 순서로 이어집니다. 빨강과 노랑 사이의 주황을 YR처럼 두 기본색의 중간 색상으로 표시하므로, 색의 이웃 관계와 반대 관계를 원 위에서 확인할 수 있습니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>색상 Hue</dt><dd>빨강·노랑·파랑처럼 색의 종류를 구분하는 속성입니다. 10색상환에서는 R·YR·Y·GY·G·BG·B·PB·P·RP의 위치로 이웃색과 반대색의 관계를 살핍니다.</dd></div>
          <div class="term-row"><dt>명도 Value</dt><dd>밝고 어두운 정도입니다. 명도 차가 크면 형태와 글자가 또렷해지고, 작으면 경계가 부드럽게 이어집니다.</dd></div>
          <div class="term-row"><dt>채도 Chroma</dt><dd>색의 선명하고 탁한 정도입니다. 채도가 낮아질수록 무채색에 가까워지지만, 명도까지 반드시 낮아지는 것은 아닙니다.</dd></div>
        </dl>
        <p class="claim"><strong>구분할 점</strong> — 밝은 색이 언제나 선명한 색은 아닙니다. ‘밝기’와 ‘선명함’을 따로 관찰해야 합니다.</p>`,
      visual: { type: 'image', src: 'n02.jpg', alt: '클로드 모네의 수련', title: '클로드 모네, 〈수련〉', meta: '1916년 · 캔버스에 유채', note: '물과 하늘의 경계를 없애고, 가까이서는 붓자국으로 보이는 색들이 멀리서 수면의 빛으로 읽히게 했습니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>색상:</strong> 화면 전체에서 파랑·초록·보라 계열이 어떻게 이어지는지 찾습니다.</li>
          <li><strong>명도:</strong> 가장 밝은 반사광과 가장 어두운 수면을 찾아 시선이 먼저 가는 곳을 확인합니다.</li>
          <li><strong>채도:</strong> 선명한 꽃과 탁한 물의 차이가 앞뒤 공간을 어떻게 나누는지 봅니다.</li>
          <li><strong>해석:</strong> 모네가 사물의 윤곽보다 빛에 따라 변하는 색을 더 중요하게 다루었다는 근거를 말합니다.</li>
        </ol>`,
      study: { type: 'property' },
      quiz: { question: '회색을 섞어 색이 탁해졌지만 밝기는 거의 같다면, 가장 크게 달라진 속성은?', choices: ['색상', '명도', '채도'], correct: 2, explanation: '회색에 가까워져 선명함이 줄어든 변화이므로 채도가 낮아진 것입니다.' }
    },
    {
      id: 'color-mixing', number: '03', track: '색을 이해하기', title: '색의 혼합',
      question: '물감, 빛, 작은 색점은 왜 서로 다른 방식으로 섞일까?',
      concept: `
        <p class="lead">색 혼합은 하나의 공식이 아닙니다. <strong>무엇을 섞는지</strong>에 따라 결과가 달라집니다. 안료는 빛을 흡수하고, 화면의 빛은 빛을 더하며, 작은 색점은 관람자의 눈에서 함께 지각됩니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>감산 혼합</dt><dd>물감·잉크처럼 빛을 흡수하는 재료의 혼합입니다. 섞을수록 반사되는 빛이 줄어 대체로 어두워집니다. 인쇄는 청록·자홍·노랑(CMY)을 기본으로 사용합니다.</dd></div>
          <div class="term-row"><dt>가산 혼합</dt><dd>모니터·조명처럼 빛 자체의 혼합입니다. 빨강·초록·파랑빛(RGB)을 더할수록 밝아지며 세 빛이 충분히 합쳐지면 흰빛에 가까워집니다.</dd></div>
          <div class="term-row"><dt>병치 혼합</dt><dd>작은 색을 실제로 섞지 않고 나란히 놓아, 일정 거리에서 관람자의 눈이 하나의 색감으로 받아들이게 하는 방식입니다.</dd></div>
        </dl>`,
      visual: { type: 'image', src: 'c06.jpg', alt: '조르주 쇠라의 그랑드 자트 섬의 일요일 오후', title: '조르주 쇠라, 〈그랑드 자트 섬의 일요일 오후〉', meta: '1884–1886년 · 캔버스에 유채', note: '순수한 색점을 나란히 놓아 가까이에서는 점, 멀리에서는 인물과 빛으로 보이게 한 신인상주의 작품입니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>가까이 보기:</strong> 옷과 잔디의 색이 하나의 면이 아니라 여러 색점으로 이루어졌는지 확인합니다.</li>
          <li><strong>멀리 보기:</strong> 거리를 두었을 때 작은 색점이 어떤 색감과 형태로 묶여 보이는지 비교합니다.</li>
          <li><strong>재료 확인:</strong> 이 작품은 빛을 직접 더한 것이 아니라 캔버스 위의 안료를 병치한 것입니다.</li>
          <li><strong>효과 판단:</strong> 팔레트에서 미리 섞는 것보다 색점의 병치가 화면의 밝고 떨리는 느낌을 유지하는지 살핍니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '안료', title: '감산 혼합 · Pigment', swatches: ['#d22f27','#f1c928','#3d4f9e','#5a4b37','#2c2927'], body: '물감은 특정 파장의 빛을 흡수하고 남은 빛을 반사합니다. 여러 안료를 섞을수록 흡수 범위가 넓어져 대체로 어두워집니다.', note: '수업에서 RYB는 기초 색상환을 설명하는 단순화된 모형이고, 인쇄의 실제 표준은 CMY(K)입니다.' },
        { label: '빛', title: '가산 혼합 · Light', swatches: ['#ff3038','#31d46a','#326dff','#f2ec57','#ffffff'], body: '빛은 에너지를 더합니다. 빨강빛과 초록빛은 노랑빛, 초록빛과 파랑빛은 청록빛, 파랑빛과 빨강빛은 자홍빛으로 지각됩니다.', note: '세 빛이 충분히 겹치면 흰빛에 가까워집니다.' },
        { label: '색점', title: '병치 혼합 · Optical mixture', swatches: ['#2451a4','#f2a22c','#2451a4','#f2a22c','#8e724d'], body: '서로 다른 색을 작은 단위로 나란히 두면, 멀리서 볼 때 눈이 평균적인 색감으로 묶어 지각합니다.', note: '점의 크기, 관람 거리, 주변 색에 따라 효과가 달라집니다.' }
      ] },
      quiz: { question: '모니터에서 빨강빛과 초록빛을 겹쳐 노랑빛을 만드는 혼합은?', choices: ['감산 혼합', '가산 혼합', '병치 혼합'], correct: 1, explanation: '모니터는 빛을 더하는 장치이므로 가산 혼합입니다.' }
    },
    {
      id: 'color-harmony', number: '04', track: '색을 이해하기', title: '색의 관계와 배색',
      question: '색상환의 거리와 색의 비율은 화면의 긴장을 어떻게 바꿀까?',
      concept: `
        <p class="lead">배색은 ‘잘 어울리는 색 조합’을 외우는 일이 아닙니다. 색상환에서의 거리, 명도 차, 채도 차, 사용 면적을 함께 조절해 <strong>통일과 대비의 정도</strong>를 설계하는 일입니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>유사색</dt><dd>색상환에서 가까운 색입니다. 공통된 색 성분이 많아 연결감이 크지만, 명도 차가 작으면 형태 구분이 약해질 수 있습니다.</dd></div>
          <div class="term-row"><dt>보색</dt><dd>색상환에서 마주 보는 색입니다. 서로를 선명하게 보이게 하지만, 같은 면적과 채도로 쓰면 화면이 지나치게 경쟁할 수 있습니다.</dd></div>
          <div class="term-row"><dt>주조색</dt><dd>화면에서 가장 넓은 면적을 차지해 전체 분위기를 이끄는 색입니다. 보조색과 강조색의 비율이 위계를 만듭니다.</dd></div>
        </dl>
        <p class="claim"><strong>핵심</strong> — 배색의 효과는 색 이름만으로 결정되지 않습니다. 같은 두 색도 면적·명도·채도·주변색에 따라 전혀 다르게 보입니다.</p>`,
      visual: { type: 'image', src: 'c08.jpg', alt: '앙리 마티스의 춤', title: '앙리 마티스, 〈춤〉', meta: '1910년 · 캔버스에 유채', note: '빨강 인체, 초록 대지, 파랑 하늘의 제한된 팔레트와 반복되는 곡선으로 강한 움직임을 만든 작품입니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>주조색:</strong> 가장 넓은 파랑이 화면의 바탕과 정서를 지배합니다.</li>
          <li><strong>색 대비:</strong> 붉은 인체가 초록 대지와 맞닿을 때 윤곽이 더 강하게 드러납니다.</li>
          <li><strong>면적 비율:</strong> 세 색은 같은 면적으로 쓰이지 않습니다. 큰 바탕과 작은 인체의 비율이 위계를 만듭니다.</li>
          <li><strong>형태와 연결:</strong> 색의 대비만이 아니라 이어진 팔과 둥근 구도가 시선을 순환시킵니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '유사색', title: '가까운 색으로 통일하기', swatches: ['#d34b2c','#e56d2f','#e99335','#f2b441','#f5cf59'], body: '색상 차는 좁게 두고 명도와 채도에 변화를 주면, 통일감을 유지하면서도 단조로움을 피할 수 있습니다.' },
        { label: '보색', title: '마주 보는 색으로 강조하기', swatches: ['#1f4ca0','#315fba','#f0a22c','#d97c1d','#17366e'], body: '보색은 서로를 강하게 드러냅니다. 한 색을 넓고 낮은 채도로, 다른 색을 작고 선명하게 쓰면 초점을 만들 수 있습니다.' },
        { label: '제한 배색', title: '적은 색으로 위계 만들기', swatches: ['#1b4386','#1b4386','#1b4386','#ad3b2e','#e2c229'], body: '색 수를 줄이면 각 색의 역할이 명확해집니다. 바탕색·보조색·강조색의 면적을 다르게 배분해 시선의 순서를 만듭니다.' }
      ] },
      quiz: { question: '보색 두 가지가 서로 지나치게 경쟁할 때 가장 적절한 조절 방법은?', choices: ['두 색을 항상 같은 면적으로 쓴다', '한 색의 면적이나 채도를 줄인다', '색상 이름을 바꾼다'], correct: 1, explanation: '보색 관계는 유지하면서 면적이나 채도의 차이를 주면 시각적 위계가 생깁니다.' }
    },
    {
      id: 'obangsaek', number: '05', track: '색을 이해하기', title: '오방색',
      question: '다섯 색은 어떻게 방향·자연·생활의 의미 체계를 이루었을까?',
      concept: `
        <p class="lead">오방색은 단순한 다섯 가지 ‘예쁜 전통색’ 묶음이 아닙니다. 음양오행의 질서 속에서 색을 <strong>방향과 자연의 성질</strong>에 연결한 문화적 색 체계입니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>청 · 동</dt><dd>목(木)·봄·청룡에 연결됩니다. 청룡은 동쪽을 지키는 푸른 용이며, 전통의 ‘청’은 오늘날의 파랑 한 점보다 청록을 아우르는 넓은 색 범주입니다.</dd></div>
          <div class="term-row"><dt>적 · 남</dt><dd>화(火)·여름·주작에 연결됩니다. 주작은 남쪽을 지키는 붉은 상상의 새로 표현됩니다.</dd></div>
          <div class="term-row"><dt>황 · 중앙</dt><dd>토(土)와 중심에 연결되어 네 방향을 매개합니다. 중앙의 동물 표상은 자료에 따라 황룡 또는 봉황 등으로 다르게 나타나므로 하나로 고정하지 않습니다.</dd></div>
          <div class="term-row"><dt>백 · 서</dt><dd>금(金)·가을·백호에 연결됩니다. 백호는 서쪽을 지키는 흰 호랑이입니다.</dd></div>
          <div class="term-row"><dt>흑 · 북</dt><dd>수(水)·겨울·현무에 연결됩니다. 현무는 북쪽을 지키며 거북과 뱀이 결합된 모습으로 표현됩니다.</dd></div>
        </dl>`,
      visual: { type: 'obang' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>단청:</strong> 국가유산청은 단청의 기본색을 오행사상에 따른 청·적·황·백·흑의 배합으로 설명합니다.</li>
          <li><strong>색동:</strong> 여러 색 띠를 나란히 배열해 복식의 리듬을 만들고, 건강과 행복을 바라는 뜻을 담았습니다.</li>
          <li><strong>오방간색:</strong> 기본 오방색 사이의 관계에서 파생된 색들이 함께 쓰이며 실제 전통 색채는 다섯 색보다 훨씬 다양합니다.</li>
          <li><strong>주의:</strong> 현대 화면의 고정된 RGB 값 하나를 ‘정답 오방색’으로 단정하면 재료와 시대에 따른 차이를 놓치게 됩니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '단청', title: '건축의 구조와 위계를 드러내는 색', swatches: ['#205e53','#a93b31','#d4a91f','#ece8da','#20201e'], body: '단청은 목재를 보호하는 기능과 장식 기능을 함께 지니며, 건축물의 격과 쓰임에 따라 색과 문양의 밀도가 달라집니다.' },
        { label: '색동', title: '색 띠의 반복과 생활 속 상징', swatches: ['#b53d32','#d6a91d','#27675b','#ede9de','#282828'], body: '색동은 서로 다른 색의 띠를 이어 붙여 반복과 대비를 만듭니다. 복식의 쓰임과 시대에 따라 배열과 색의 수가 달라집니다.' },
        { label: '현대 적용', title: '상징을 이해한 뒤 재구성하기', swatches: ['#173f86','#a3372b','#d0a51b','#f0eee8','#171717'], body: '오방색을 현대 작업에 쓸 때는 다섯 색을 그대로 늘어놓는 데 그치지 않고 방향, 중심, 균형 같은 관계를 어떤 방식으로 번역할지 결정해야 합니다.' }
      ] },
      quiz: { question: '오방색을 가장 정확하게 설명한 것은?', choices: ['물감을 섞어 모든 색을 만드는 삼원색 체계', '다섯 색을 방향과 자연의 성질에 연결한 문화적 체계', '현대 디지털 화면의 표준 색상 코드'], correct: 1, explanation: '오방색은 색 혼합 공식이 아니라 음양오행과 방향·자연의 의미가 연결된 문화적 색 체계입니다.' }
    },
    {
      id: 'visual-elements', number: '06', track: '화면을 구성하기', title: '조형 요소',
      question: '작품에서 실제로 보고 지목할 수 있는 시각적 재료는 무엇인가?',
      concept: `
        <p class="lead">조형 요소는 작품을 이루는 관찰 가능한 시각적 재료입니다. 작품의 주제나 느낌을 먼저 말하기 전에 <strong>선·형·색·명암·질감·공간</strong>이 화면에서 어떻게 나타나는지 기술하면 해석의 근거가 생깁니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>선</dt><dd>점의 이동으로 인식되는 경로입니다. 굵기·방향·속도·윤곽이 시선의 움직임과 정서를 만듭니다.</dd></div>
          <div class="term-row"><dt>형과 형태</dt><dd>형은 길이와 너비를 가진 2차원 영역, 형태는 깊이와 부피를 가진 3차원 덩어리입니다.</dd></div>
          <div class="term-row"><dt>명암과 색</dt><dd>밝고 어두운 관계는 부피와 초점을 만들고, 색의 세 속성은 정서와 구분, 공간 관계를 조직합니다.</dd></div>
          <div class="term-row"><dt>질감</dt><dd>실제로 만져지는 촉각적 질감과, 붓질·명암으로 그렇게 보이게 한 시각적 질감을 구분합니다.</dd></div>
          <div class="term-row"><dt>공간</dt><dd>대상이 차지하는 양의 공간과 그 사이·주변의 음의 공간을 함께 봅니다.</dd></div>
        </dl>`,
      visual: { type: 'image', src: 'p05.jpg', alt: '에드바르 뭉크의 절규', title: '에드바르 뭉크, 〈절규〉', meta: '1893년 · 판지에 유채·템페라·파스텔', note: '감정을 직접 그린 것이 아니라, 구불거리는 선·강한 색 대비·압축된 공간으로 불안이 느껴지게 한 작품입니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>선:</strong> 하늘과 물의 곡선은 흔들리지만 다리 난간은 화면 안쪽으로 곧게 뻗습니다.</li>
          <li><strong>색:</strong> 붉고 노란 하늘과 어두운 청색 풍경의 대비가 긴장을 높입니다.</li>
          <li><strong>형:</strong> 인물의 얼굴과 몸은 세부가 지워지고 길게 압축된 형태로 단순화되었습니다.</li>
          <li><strong>공간:</strong> 난간의 사선은 깊이를 만들지만, 인물은 화면 바로 앞을 막아 관람자와 거리를 좁힙니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '선', title: '방향과 속도를 기술하기', body: '“선이 많다”에서 멈추지 말고 수평·수직·사선·곡선, 굵기, 반복, 끊김을 말합니다. 그 뒤 시선이 어디로 이동하는지 연결합니다.' },
        { label: '형·공간', title: '대상과 빈자리의 관계 보기', body: '형의 크기와 겹침뿐 아니라 형 사이의 빈 공간을 봅니다. 음의 공간도 화면의 긴장과 균형을 만드는 적극적인 요소입니다.' },
        { label: '질감·명암', title: '표면과 빛의 근거 찾기', body: '매끈해 보이는지 거칠어 보이는지, 실제 재료 때문인지 묘사 때문인지 구분합니다. 가장 밝고 어두운 곳은 시각적 초점을 만드는 근거가 됩니다.' }
      ] },
      quiz: { question: '다음 중 조형 요소를 근거로 한 관찰에 가장 가까운 문장은?', choices: ['이 그림은 왠지 슬프다', '굵은 사선이 화면 왼쪽 위로 반복된다', '작가는 분명 외로웠을 것이다'], correct: 1, explanation: '선의 굵기·방향·반복처럼 화면에서 확인할 수 있는 사실을 기술한 문장입니다.' }
    },
    {
      id: 'visual-principles', number: '07', track: '화면을 구성하기', title: '조형 원리',
      question: '조형 요소들은 어떤 관계를 맺을 때 화면의 질서가 되는가?',
      concept: `
        <p class="lead">조형 요소가 화면의 ‘재료’라면 조형 원리는 그 재료들이 관계를 맺는 ‘방식’입니다. 원리는 작품에 붙은 정답 이름이 아니라, <strong>시선이 움직이는 이유를 설명하는 분석 도구</strong>입니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>균형</dt><dd>크기·색·질감·공간이 만드는 시각적 무게의 분배입니다. 대칭·비대칭·방사형 균형을 구분할 수 있습니다.</dd></div>
          <div class="term-row"><dt>강조와 대비</dt><dd>차이를 이용해 특정 부분을 먼저 보이게 합니다. 초점은 크기·색·명도·고립·방향의 차이로 생깁니다.</dd></div>
          <div class="term-row"><dt>반복과 리듬</dt><dd>요소의 되풀이와 간격 변화가 시각적 박자와 이동을 만듭니다. 완전히 같은 반복만이 리듬은 아닙니다.</dd></div>
          <div class="term-row"><dt>통일과 변화</dt><dd>공통점은 화면을 묶고 차이는 단조로움을 막습니다. 두 힘의 정도를 조절하는 것이 구성의 핵심입니다.</dd></div>
        </dl>`,
      visual: { type: 'image', src: 'c01.jpg', alt: '피트 몬드리안의 빨강 파랑 노랑의 구성 II', title: '피트 몬드리안, 〈빨강, 파랑, 노랑의 구성 II〉', meta: '1930년 · 캔버스에 유채', note: '수직·수평선과 제한된 기본색만으로 동일하지 않은 양쪽이 안정되는 비대칭 균형을 만들었습니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>비대칭 균형:</strong> 큰 붉은 면 한쪽과 작은 파랑·노랑·검정 면 여러 개의 무게를 비교합니다.</li>
          <li><strong>비례:</strong> 사각형은 같은 크기로 반복되지 않습니다. 면적 차이가 화면에 위계를 만듭니다.</li>
          <li><strong>통일:</strong> 모든 선이 수직·수평이고 색의 수가 제한되어 서로 다른 면들이 하나의 체계로 묶입니다.</li>
          <li><strong>변화:</strong> 선의 굵기, 면의 크기, 색의 위치가 달라 기계적인 격자와 다른 긴장이 생깁니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '균형', title: '같음이 아니라 시각적 무게의 조절', body: '대칭은 안정감을 빠르게 만들지만 균형의 유일한 방법은 아닙니다. 작고 진한 형 하나가 크고 옅은 형과 균형을 이룰 수도 있습니다.' },
        { label: '강조', title: '차이가 초점을 만든다', body: '주변과 다른 색·크기·방향·질감, 또는 홀로 떨어진 위치는 초점을 만듭니다. 모든 요소를 강조하면 오히려 강조가 사라집니다.' },
        { label: '리듬', title: '반복 사이의 간격을 읽는다', body: '같은 요소를 되풀이하되 크기와 간격을 변화시키면 시선의 속도가 달라집니다. 규칙적·점진적·교대 리듬을 비교할 수 있습니다.' }
      ] },
      quiz: { question: '화면의 양쪽 모양은 다르지만 시각적 무게가 안정되어 보이는 구성은?', choices: ['비대칭 균형', '완전한 반복', '선 원근법'], correct: 0, explanation: '서로 다른 요소가 시각적 무게를 맞춘 상태를 비대칭 균형이라고 합니다.' }
    },
    {
      id: 'space-composition', number: '08', track: '화면을 구성하기', title: '공간과 화면 구성',
      question: '평평한 화면은 어떻게 깊이와 시선의 이동 경로를 만드는가?',
      concept: `
        <p class="lead">회화의 공간은 실제 공간이 아니라 화면 위에서 조직된 시각적 약속입니다. 겹침·크기·위치·명암·원근으로 깊이를 만들 수도 있고, 여러 시점과 여백으로 <strong>시간에 따라 이동하는 시선</strong>을 만들 수도 있습니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>중첩과 크기</dt><dd>앞의 형이 뒤의 형을 가리고, 같은 대상이 작아질수록 멀리 있는 것으로 지각됩니다.</dd></div>
          <div class="term-row"><dt>선 원근법</dt><dd>평행선이 수평선 위 소실점으로 모이도록 구성해 고정된 한 시점의 깊이를 만듭니다.</dd></div>
          <div class="term-row"><dt>대기 원근법</dt><dd>먼 대상을 흐리고 대비와 채도를 낮춰 공기층 너머에 있는 듯 보이게 합니다.</dd></div>
          <div class="term-row"><dt>다시점과 여백</dt><dd>한 시점에 고정되지 않고 이동하며 본 장면을 펼치거나, 비어 있는 공간으로 거리·시간·호흡을 만듭니다.</dd></div>
        </dl>
        <p class="claim"><strong>주의</strong> — 선 원근법은 공간을 표현하는 여러 방법 가운데 하나입니다. 사실적으로 보이는 한 가지 방식만을 모든 회화의 기준으로 삼을 수는 없습니다.</p>`,
      visual: { type: 'pair', images: [
        { src: 's04.jpg', alt: '레오나르도 다 빈치의 최후의 만찬', title: '레오나르도 다 빈치, 〈최후의 만찬〉', meta: '1495–1498년 · 벽화' },
        { src: 'd16.jpg', alt: '정선의 금강전도', title: '정선, 〈금강전도〉', meta: '1734년 · 종이에 수묵담채' }
      ], note: '한 작품은 단일 소실점으로 방을 연장하고, 다른 작품은 높은 시점과 이동하는 시선으로 산 전체를 펼칩니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>〈최후의 만찬〉:</strong> 천장과 벽의 선이 예수의 머리 뒤 한 점에 모여 중심과 깊이를 동시에 만듭니다.</li>
          <li><strong>〈금강전도〉:</strong> 실제 한 자리에서는 볼 수 없는 산세를 높은 시점에서 굽어보며 한 화면에 조직합니다.</li>
          <li><strong>공통점:</strong> 두 작품 모두 인물이나 산을 단순히 나열하지 않고 시선이 이동할 경로를 설계합니다.</li>
          <li><strong>차이:</strong> 하나는 고정된 시점의 일관성을, 다른 하나는 이동하며 경험한 공간의 총체성을 중시합니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '선 원근', title: '하나의 시점에서 깊이 만들기', body: '건축의 평행선이 소실점에 모이고, 같은 크기의 대상은 멀어질수록 작게 보입니다. 소실점의 위치는 관람자의 눈높이와 연결됩니다.' },
        { label: '다시점', title: '이동하며 본 장면을 펼치기', body: '관람자의 시선이 산길이나 두루마리를 따라 이동하도록 여러 관찰 지점을 한 화면에 조직할 수 있습니다. 이는 원근법의 실패가 아니라 다른 공간 개념입니다.' },
        { label: '여백', title: '비어 있는 곳도 공간으로 읽기', body: '여백은 아무것도 하지 않은 자리가 아닙니다. 대상 사이의 거리, 안개, 물, 시간의 흐름을 암시하고 화면의 호흡을 조절합니다.' }
      ] },
      quiz: { question: '선 원근법을 사용한 화면에서 소실점과 가장 직접적으로 연결되는 것은?', choices: ['관람자의 눈높이', '물감의 채도', '표면의 촉각적 질감'], correct: 0, explanation: '소실점이 놓이는 수평선은 관람자의 눈높이와 대응합니다.' }
    },
    {
      id: 'formal-analysis', number: '09', track: '작품에 적용하기', title: '작품 형식 분석',
      question: '보이는 사실에서 작품의 의미까지 어떻게 논리를 세울까?',
      concept: `
        <p class="lead">형식 분석은 작품에서 확인할 수 있는 시각적 증거를 바탕으로 의미를 설명하는 방법입니다. 감상을 없애는 것이 아니라, “좋다·슬프다” 같은 느낌에 <strong>왜 그렇게 보였는지</strong>를 연결합니다.</p>
        <dl class="term-table">
          <div class="term-row"><dt>1. 관찰</dt><dd>작품 정보와 화면에서 실제로 보이는 인물·사물·색·선·빛·공간을 판단 없이 기록합니다.</dd></div>
          <div class="term-row"><dt>2. 분석</dt><dd>조형 요소가 균형·대비·강조·리듬·공간을 어떻게 만드는지 관계를 설명합니다.</dd></div>
          <div class="term-row"><dt>3. 해석</dt><dd>관찰과 분석을 근거로 작품이 전달하는 분위기·주제·관람자의 위치를 해석합니다.</dd></div>
          <div class="term-row"><dt>4. 판단</dt><dd>작품의 목적과 맥락을 고려해 표현이 얼마나 설득력 있는지 근거와 함께 평가합니다.</dd></div>
        </dl>
        <p class="claim"><strong>분석 문장의 구조</strong> — 화면의 사실 → 조형 관계 → 그로 인해 생기는 효과. 예: “열린 문 주변의 밝은 명도 대비가 시선을 화면 안쪽으로 이끌어 방의 깊이를 강조한다.”</p>`,
      visual: { type: 'image', src: 'd08.jpg', alt: '디에고 벨라스케스의 시녀들', title: '디에고 벨라스케스, 〈시녀들〉', meta: '1656년 · 캔버스에 유채', note: '인물들의 시선, 거울, 열린 문, 캔버스의 뒷면이 그림 안과 밖의 공간을 복잡하게 연결합니다.' },
      analysis: `
        <ol class="evidence-list">
          <li><strong>관찰:</strong> 중앙의 공주, 시녀들, 왼쪽의 화가, 뒤쪽 거울 속 두 인물, 열린 문 속 인물을 구분합니다.</li>
          <li><strong>색과 명암:</strong> 어두운 방에서 공주의 밝은 옷과 뒤쪽 열린 문이 두 개의 강한 초점을 만듭니다.</li>
          <li><strong>공간:</strong> 바닥·천장·액자의 선이 깊이를 만들고, 거울은 화면 밖의 왕과 왕비가 있는 자리를 암시합니다.</li>
          <li><strong>시선:</strong> 여러 인물이 화면 밖을 바라보므로 관람자는 왕과 왕비 또는 화가의 모델이 서 있을 법한 자리에 놓입니다.</li>
          <li><strong>해석:</strong> 이 작품은 공주의 초상만이 아니라 보는 사람·보이는 사람·그리는 사람의 관계 자체를 주제로 삼았다고 해석할 수 있습니다.</li>
        </ol>`,
      study: { type: 'tabs', options: [
        { label: '관찰', title: '해석 전에 보이는 사실을 분리한다', body: '“공주가 외롭다”는 해석이지만 “공주 주변 인물들이 서로 다른 방향을 바라본다”는 관찰입니다. 먼저 누구나 화면에서 확인할 수 있는 사실을 적습니다.' },
        { label: '분석', title: '요소 사이의 관계를 문장으로 만든다', body: '색·선·형을 나열하지 말고 “밝은 문과 어두운 방의 명도 대비가 시선을 안쪽으로 이동시킨다”처럼 원인과 효과를 연결합니다.' },
        { label: '해석', title: '한 가지 근거로 단정하지 않는다', body: '작품 정보, 시대적 맥락, 화면의 증거를 함께 사용합니다. 다른 해석이 가능하다면 어느 해석이 더 많은 증거를 설명하는지 비교합니다.' },
        { label: '판단', title: '취향과 평가를 구분한다', body: '좋아하는지와 잘 표현되었는지는 다른 질문입니다. 작품의 목적, 재료, 관람 환경을 기준으로 판단하고 근거를 밝힙니다.' }
      ] },
      quiz: { question: '형식 분석 문장으로 가장 적절한 것은?', choices: ['이 그림은 유명해서 훌륭하다', '나는 어두운 색을 좋아하지 않는다', '밝은 문과 어두운 방의 명도 대비가 시선을 화면 안쪽으로 이끈다'], correct: 2, explanation: '화면에서 확인되는 명도 대비와 그로 인한 시선 이동을 근거로 연결한 문장입니다.' }
    }
  ];

  const courseMenu = document.getElementById('courseMenu');
  const lessonView = document.getElementById('lessonView');
  const previousLesson = document.getElementById('previousLesson');
  const nextLesson = document.getElementById('nextLesson');
  let currentIndex = 0;

  function renderVisual(visual) {
    const figure = document.getElementById('artworkFigure');
    if (visual.type === 'obang') {
      const items = [
        { key:'east', color:'#22675b', label:'청', direction:'동', element:'목', season:'봄', guardian:'청룡', animal:'푸른 용', description:'동쪽 하늘과 봄의 생명력을 지키는 상상의 용입니다. 고분벽화와 의궤에서는 길게 휘어진 몸과 비늘, 뿔을 지닌 모습으로 나타납니다.' },
        { key:'south', color:'#b43b31', label:'적', direction:'남', element:'화', season:'여름', guardian:'주작', animal:'붉은 상상의 새', description:'남쪽과 불의 기운을 지키는 새입니다. 봉황과 닮은 긴 깃과 펼친 날개를 지닌 모습으로 표현됩니다.' },
        { key:'center', color:'#d5a91d', label:'황', direction:'중앙', element:'토', season:'중심·전환', guardian:'중앙 표상', animal:'황룡·봉황 등', description:'중앙은 흙과 네 방향의 중심에 대응합니다. 동물 표상은 문헌과 전승에 따라 황룡 또는 봉황 등으로 달라 하나로 단정하지 않습니다.' },
        { key:'west', color:'#f1efe8', label:'백', direction:'서', element:'금', season:'가을', guardian:'백호', animal:'흰 호랑이', description:'서쪽을 지키는 흰 호랑이입니다. 힘찬 발과 긴 꼬리로 사악한 기운을 막는 수호신의 성격을 드러냅니다.' },
        { key:'north', color:'#202124', label:'흑', direction:'북', element:'수', season:'겨울', guardian:'현무', animal:'거북과 뱀의 결합', description:'북쪽과 물을 지키는 신수입니다. 거북의 몸을 뱀이 휘감은 독특한 결합 형상으로 표현됩니다.' }
      ];
      figure.innerHTML = `
        <div class="obang-atlas" aria-label="오방색 상징 관계표">
          <div class="obang-table-head" aria-hidden="true"><span>색</span><span>방위</span><span>오행</span><span>계절</span><span>수호 상징</span></div>
          ${items.map((item) => `<button type="button" data-obang="${item.key}" class="${item.key === 'east' ? 'active' : ''}"><i style="--obang-color:${item.color}"></i><strong>${item.label}</strong><span>${item.direction}</span><span>${item.element}</span><span>${item.season}</span><span>${item.guardian}</span></button>`).join('')}
          <div class="guardian-detail" id="guardianDetail"></div>
        </div>
        <figcaption class="obang-caption">사신은 오방색과 동일한 개념은 아니지만 같은 오행·방위의 상징 체계 안에서 연결됩니다.<br><a class="source-link" href="https://www.museum.go.kr/uigwe/story/story" target="_blank" rel="noopener">국립중앙박물관 사수도 자료 ↗</a> <a class="source-link" href="https://www.heritage.go.kr/heri/html/HtmlPage.do?pageNo=5_5_1_0&pg=%2Fcul%2FcultureEasySub01_13.jsp" target="_blank" rel="noopener">국가유산청 단청 자료 ↗</a></figcaption>`;
      const showGuardian = (key) => {
        const item = items.find((entry) => entry.key === key);
        figure.querySelectorAll('[data-obang]').forEach((button) => button.classList.toggle('active', button.dataset.obang === key));
        document.getElementById('guardianDetail').innerHTML = `<p>${item.label} · ${item.direction} · ${item.element} · ${item.season}</p><h3>${item.guardian} <small>${item.animal}</small></h3><p>${item.description}</p>`;
      };
      figure.querySelectorAll('[data-obang]').forEach((button) => button.addEventListener('click', () => showGuardian(button.dataset.obang)));
      showGuardian('east');
      return;
    }

    if (visual.type === 'pair') {
      figure.innerHTML = `<div class="artwork-pair">${visual.images.map((image) => `<div><img src="${artworkRoot}${image.src}" alt="${image.alt}"><p class="artwork-caption"><strong>${image.title}</strong>${image.meta}</p></div>`).join('')}</div><figcaption>${visual.note}</figcaption>`;
      return;
    }

    figure.innerHTML = `<img class="artwork-image" src="${artworkRoot}${visual.src}" alt="${visual.alt}"><figcaption><strong>${visual.title}</strong>${visual.meta}<br>${visual.note}</figcaption>`;
  }

  function renderStudy(study) {
    const host = document.getElementById('studyContent');
    if (study.type === 'property') {
      const tenHues = [
        { code:'R', name:'빨강', hue:0, color:'#c83b37' }, { code:'YR', name:'주황', hue:28, color:'#d9782e' },
        { code:'Y', name:'노랑', hue:52, color:'#d7b51f' }, { code:'GY', name:'연두', hue:82, color:'#91a62e' },
        { code:'G', name:'초록', hue:135, color:'#328357' }, { code:'BG', name:'청록', hue:174, color:'#268b87' },
        { code:'B', name:'파랑', hue:215, color:'#326dad' }, { code:'PB', name:'남보라', hue:252, color:'#5c5ea8' },
        { code:'P', name:'보라', hue:286, color:'#8a4b96' }, { code:'RP', name:'자주', hue:327, color:'#b6426d' }
      ];
      host.innerHTML = `
        <div class="ten-hue-lab">
          <section class="hue-wheel-panel">
            <header><h3>먼셀 기본 10색상환</h3><p>색상 기호를 눌러 이웃색과 반대편 색의 위치를 확인하세요.</p></header>
            <div class="ten-hue-wheel" aria-label="R, YR, Y, GY, G, BG, B, PB, P, RP 10색상환">
              <div class="hue-ring" aria-hidden="true"></div>
              ${tenHues.map((item, index) => `<button type="button" data-hue-index="${index}" style="--i:${index};--hue-color:${item.color}" class="${item.code === 'B' ? 'active' : ''}"><strong>${item.code}</strong><small>${item.name}</small></button>`).join('')}
              <div class="wheel-center"><span>선택한 색상</span><strong id="selectedHueName">B · 파랑</strong></div>
            </div>
          </section>
          <section class="attribute-panel">
            <div class="property-preview" id="propertyPreview"><span id="propertyNotation">B 5/8</span></div>
            <div class="scale-block"><header><h3>명도 Value</h3><output id="valueOutput">5</output></header><div class="value-scale" id="valueScale"></div><input id="valueControl" type="range" min="1" max="9" value="5" aria-label="명도"></div>
            <div class="scale-block"><header><h3>채도 Chroma</h3><output id="chromaOutput">8</output></header><div class="chroma-scale" id="chromaScale"></div><input id="chromaControl" type="range" min="0" max="12" step="2" value="8" aria-label="채도"></div>
            <p class="screen-color-note">화면의 색은 색상·명도·채도의 관계를 비교하기 위한 근사값입니다. 표준 먼셀 색표의 실물 색과 같지 않을 수 있습니다.</p>
          </div>
        </div>
        <p class="claim">표기 <strong>B 5/8</strong>은 파랑(B), 명도 5, 채도 8을 뜻합니다. 색상은 각도가 아니라 색상환의 위치와 기호로 읽습니다.</p>`;
      let selectedHue = tenHues[6];
      const valueControl = host.querySelector('#valueControl');
      const chromaControl = host.querySelector('#chromaControl');
      const update = () => {
        const value = Number(valueControl.value);
        const chroma = Number(chromaControl.value);
        const lightness = 8 + value * 8.4;
        const saturation = Math.min(92, chroma * 7.5);
        host.querySelector('#propertyPreview').style.background = `hsl(${selectedHue.hue} ${saturation}% ${lightness}%)`;
        host.querySelector('#selectedHueName').textContent = `${selectedHue.code} · ${selectedHue.name}`;
        host.querySelector('#propertyNotation').textContent = `${selectedHue.code} ${value}/${chroma}`;
        host.querySelector('#valueOutput').textContent = value;
        host.querySelector('#chromaOutput').textContent = chroma;
        host.querySelector('#valueScale').innerHTML = Array.from({length:11}, (_, index) => `<i style="background:hsl(${selectedHue.hue} ${saturation}% ${index * 10}%)" title="명도 ${index}"></i>`).join('');
        host.querySelector('#chromaScale').innerHTML = Array.from({length:7}, (_, index) => `<i style="background:hsl(${selectedHue.hue} ${index * 15}% 50%)" title="채도 ${index * 2}"></i>`).join('');
      };
      host.querySelectorAll('[data-hue-index]').forEach((button) => button.addEventListener('click', () => {
        selectedHue = tenHues[Number(button.dataset.hueIndex)];
        host.querySelectorAll('[data-hue-index]').forEach((item) => item.classList.toggle('active', item === button));
        update();
      }));
      [valueControl, chromaControl].forEach((control) => control.addEventListener('input', update));
      update();
      return;
    }

    host.innerHTML = `<div class="study-tabs" role="tablist">${study.options.map((option, index) => `<button type="button" role="tab" data-study-index="${index}" aria-selected="${index === 0}" class="${index === 0 ? 'active' : ''}">${option.label}</button>`).join('')}</div><div class="study-output" role="tabpanel"></div>`;
    const output = host.querySelector('.study-output');
    const showOption = (index) => {
      const option = study.options[index];
      const swatches = option.swatches ? `<div class="swatch-strip" aria-label="${option.label} 색 조합">${option.swatches.map((color) => `<i style="background:${color}"></i>`).join('')}</div>` : '';
      output.innerHTML = `<h3>${option.title}</h3>${swatches}<p>${option.body}</p>${option.note ? `<p><strong>살펴볼 점:</strong> ${option.note}</p>` : ''}`;
      host.querySelectorAll('[data-study-index]').forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('active', active);
        button.setAttribute('aria-selected', String(active));
      });
    };
    host.querySelectorAll('[data-study-index]').forEach((button) => button.addEventListener('click', () => showOption(Number(button.dataset.studyIndex))));
    showOption(0);
  }

  function renderQuiz(quiz) {
    const host = document.getElementById('checkContent');
    host.innerHTML = `<p class="check-question">${quiz.question}</p><div class="answer-list">${quiz.choices.map((choice, index) => `<button type="button" data-answer="${index}">${index + 1}. ${choice}</button>`).join('')}</div><p class="check-feedback" aria-live="polite">선택한 답의 근거를 확인할 수 있습니다.</p>`;
    const feedback = host.querySelector('.check-feedback');
    host.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
      const selected = Number(button.dataset.answer);
      host.querySelectorAll('[data-answer]').forEach((item) => item.classList.remove('correct', 'wrong'));
      button.classList.add(selected === quiz.correct ? 'correct' : 'wrong');
      host.querySelector(`[data-answer="${quiz.correct}"]`).classList.add('correct');
      feedback.innerHTML = `<strong>${selected === quiz.correct ? '맞았습니다.' : '다시 구분해 보세요.'}</strong> ${quiz.explanation}`;
    }));
  }

  function showLesson(id) {
    const index = lessons.findIndex((lesson) => lesson.id === id);
    if (index < 0) return;
    const lesson = lessons[index];
    currentIndex = index;
    courseMenu.hidden = true;
    lessonView.hidden = false;
    document.getElementById('lessonKicker').textContent = `${lesson.track} · ${lesson.number} / 09`;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonQuestion').textContent = lesson.question;
    document.getElementById('conceptContent').innerHTML = lesson.concept;
    document.getElementById('analysisContent').innerHTML = lesson.analysis;
    renderVisual(lesson.visual);
    renderStudy(lesson.study);
    renderQuiz(lesson.quiz);
    previousLesson.disabled = index === 0;
    nextLesson.disabled = index === lessons.length - 1;
    document.title = `${lesson.title} · 미술 이론`;
    window.scrollTo(0, 0);
  }

  function showCourseMenu() {
    lessonView.hidden = true;
    courseMenu.hidden = false;
    document.title = '미술 이론 · 색채와 조형';
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('[data-open-lesson]').forEach((button) => button.addEventListener('click', () => showLesson(button.dataset.openLesson)));
  previousLesson.addEventListener('click', () => showLesson(lessons[currentIndex - 1].id));
  nextLesson.addEventListener('click', () => showLesson(lessons[currentIndex + 1].id));
  window.addEventListener('sitebackrequest', (event) => {
    if (lessonView.hidden) return;
    event.preventDefault();
    showCourseMenu();
  });
})();
