(() => {
  'use strict';

  const lessons = ['color-properties', 'color-mixing', 'color-harmony', 'obangsaek', 'visual-elements', 'visual-principles', 'space-composition'];
  const courseMenu = document.getElementById('courseMenu');
  const lessonView = document.getElementById('lessonView');
  const lessonProgress = document.getElementById('lessonProgress');
  const previousLesson = document.getElementById('previousLesson');
  const nextLesson = document.getElementById('nextLesson');
  let currentLessonIndex = 0;

  function showCourseMenu() {
    lessonView.hidden = true;
    courseMenu.hidden = false;
    document.querySelectorAll('.lesson-screen').forEach((screen) => screen.hidden = true);
    window.scrollTo(0, 0);
  }

  function showLesson(id) {
    const index = lessons.indexOf(id);
    if (index < 0) return;
    currentLessonIndex = index;
    courseMenu.hidden = true;
    lessonView.hidden = false;
    document.querySelectorAll('.lesson-screen').forEach((screen) => screen.hidden = screen.dataset.lesson !== id);
    lessonProgress.textContent = `${index + 1} / ${lessons.length}`;
    previousLesson.disabled = index === 0;
    nextLesson.disabled = index === lessons.length - 1;
    window.scrollTo(0, 0);
  }

  document.querySelectorAll('[data-open-lesson]').forEach((button) => button.addEventListener('click', () => showLesson(button.dataset.openLesson)));
  document.getElementById('backToList').addEventListener('click', showCourseMenu);
  previousLesson.addEventListener('click', () => showLesson(lessons[currentLessonIndex - 1]));
  nextLesson.addEventListener('click', () => showLesson(lessons[currentLessonIndex + 1]));

  const hueControl = document.getElementById('hueControl');
  const lightControl = document.getElementById('lightControl');
  const saturationControl = document.getElementById('saturationControl');
  const propertySample = document.getElementById('propertySample');
  const colorNames = ['빨강', '주황', '노랑', '연두', '초록', '청록', '파랑', '남색', '보라', '자홍', '빨강'];

  function updateColorProperties() {
    const hue = Number(hueControl.value);
    const light = Number(lightControl.value);
    const saturation = Number(saturationControl.value);
    propertySample.style.background = `hsl(${hue} ${saturation}% ${light}%)`;
    document.getElementById('hueValue').textContent = `${hue}°`;
    document.getElementById('lightValue').textContent = `${light}%`;
    document.getElementById('saturationValue').textContent = `${saturation}%`;
    document.getElementById('propertyColorName').textContent = colorNames[Math.round(hue / 36)];
  }
  [hueControl, lightControl, saturationControl].forEach((control) => control.addEventListener('input', updateColorProperties));

  const mixSets = {
    paint: {
      rule: '<strong>물감의 기초 색상환</strong>은 빨강·노랑·파랑을 출발색으로 살펴봐요.',
      colors: [{ id: 'red', name: '빨강', color: '#ef493d' }, { id: 'yellow', name: '노랑', color: '#f5ce35' }, { id: 'blue', name: '파랑', color: '#2858e8' }],
      mixes: { 'red+yellow': ['주황', '#ec7c31'], 'blue+red': ['보라', '#7949a9'], 'blue+yellow': ['초록', '#388b5b'] }
    },
    light: {
      rule: '<strong>빛의 삼원색</strong>은 빨강·초록·파랑(RGB)이에요. 빛은 더할수록 밝아져요.',
      colors: [{ id: 'red', name: '빨강빛', color: '#ff243c' }, { id: 'green', name: '초록빛', color: '#20dc65' }, { id: 'blue', name: '파랑빛', color: '#2468ff' }],
      mixes: { 'green+red': ['노랑빛', '#fff02d'], 'blue+red': ['자홍빛', '#ff32e6'], 'blue+green': ['청록빛', '#2dfff2'] }
    }
  };
  let mixMode = 'paint';
  let selectedColors = [];
  const mixStage = document.querySelector('.mix-stage');
  const mixChoices = document.getElementById('mixChoices');
  const mixCircles = [document.getElementById('mixCircleA'), document.getElementById('mixCircleB')];
  const mixIntersection = document.getElementById('mixIntersection');

  function renderMixChoices() {
    mixChoices.innerHTML = mixSets[mixMode].colors.map((color) => {
      const selected = selectedColors.some((item) => item.id === color.id);
      const disabled = selectedColors.length >= 2 && !selected;
      return `<button type="button" class="mix-choice${selected ? ' selected' : ''}" data-mix-color="${color.id}" style="--choice-color:${color.color}" aria-pressed="${selected}" ${disabled ? 'disabled' : ''}>${color.name}</button>`;
    }).join('');
  }

  function resetMix() {
    selectedColors = [];
    const neutralCircle = mixMode === 'light' ? '#17203b' : '#cbd1de';
    const neutralIntersection = mixMode === 'light' ? '#202b4a' : '#aeb7c9';
    mixCircles.forEach((circle) => circle.style.fill = neutralCircle);
    mixIntersection.style.fill = neutralIntersection;
    mixIntersection.style.filter = '';
    document.getElementById('mixFormula').textContent = '? + ?';
    document.getElementById('mixName').textContent = '두 색을 골라 보세요.';
    renderMixChoices();
  }

  function updateMix() {
    renderMixChoices();
    selectedColors.forEach((color, index) => mixCircles[index].style.fill = color.color);
    if (selectedColors.length === 1) {
      document.getElementById('mixFormula').textContent = `${selectedColors[0].name} + ?`;
      document.getElementById('mixName').textContent = '한 색을 더 골라 보세요.';
      return;
    }
    if (selectedColors.length !== 2) return;
    const result = mixSets[mixMode].mixes[selectedColors.map((color) => color.id).sort().join('+')];
    mixIntersection.style.fill = result[1];
    if (mixMode === 'light') mixIntersection.style.filter = `drop-shadow(0 0 16px ${result[1]})`;
    document.getElementById('mixFormula').textContent = `${selectedColors[0].name} + ${selectedColors[1].name}`;
    document.getElementById('mixName').textContent = `${result[0]}이 되었어요.`;
  }

  document.querySelectorAll('[data-mix-mode]').forEach((button) => button.addEventListener('click', () => {
    mixMode = button.dataset.mixMode;
    document.querySelectorAll('[data-mix-mode]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    mixStage.dataset.mode = mixMode;
    document.getElementById('mixRule').innerHTML = mixSets[mixMode].rule;
    resetMix();
  }));
  mixChoices.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mix-color]');
    if (!button || selectedColors.length >= 2) return;
    const color = mixSets[mixMode].colors.find((item) => item.id === button.dataset.mixColor);
    if (!color || selectedColors.some((item) => item.id === color.id)) return;
    selectedColors.push(color);
    updateMix();
  });
  document.getElementById('mixReset').addEventListener('click', resetMix);

  const harmonyCopy = {
    analogous: ['비슷한색', '노랑·주황·빨강처럼 색상환에서 가까운 색을 함께 쓰는 배색이에요.'],
    complementary: ['보색', '파랑과 주황처럼 색상환에서 마주 보는 색을 함께 쓰는 배색이에요.'],
    temperature: ['따뜻한색과 차가운색', '따뜻한색은 활기와 온기를, 차가운색은 시원함과 고요함을 느끼게 해요.']
  };
  document.querySelectorAll('[data-harmony]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-harmony]').forEach((item) => item.classList.toggle('active', item === button));
    document.getElementById('palettePreview').dataset.harmony = button.dataset.harmony;
    document.getElementById('harmonyTerm').textContent = harmonyCopy[button.dataset.harmony][0];
    document.getElementById('harmonyText').textContent = harmonyCopy[button.dataset.harmony][1];
  }));

  const obangCopy = {
    black: ['黑 · NORTH', '흑색 · 북쪽', '물 · 겨울', '단청, 복식, 먹 그림', '북쪽과 겨울, 물의 성질에 연결했어요.', '#151a2a'],
    white: ['白 · WEST', '백색 · 서쪽', '쇠 · 가을', '백자, 한복, 의례', '서쪽과 가을, 쇠의 성질에 연결했어요.', '#aeb4c3'],
    yellow: ['黃 · CENTER', '황색 · 가운데', '흙 · 계절 사이', '단청, 색동, 전통 문양', '중심을 잡고 다른 네 방향을 이어 주는 색으로 보았어요.', '#c39a00'],
    blue: ['靑 · EAST', '청색 · 동쪽', '나무 · 봄', '청자, 단청, 색동', '동쪽과 봄, 나무의 성질에 연결했어요.', '#27846e'],
    red: ['赤 · SOUTH', '적색 · 남쪽', '불 · 여름', '단청, 혼례복, 부적', '남쪽과 여름, 불의 성질에 연결했어요.', '#cf4038']
  };
  document.querySelectorAll('[data-obang]').forEach((button) => button.addEventListener('click', () => {
    const item = obangCopy[button.dataset.obang];
    document.querySelectorAll('[data-obang]').forEach((other) => other.classList.toggle('active', other === button));
    document.getElementById('obangHanja').textContent = item[0];
    document.getElementById('obangName').textContent = item[1];
    document.getElementById('obangNature').textContent = item[2];
    document.getElementById('obangUse').textContent = item[3];
    document.getElementById('obangMeaning').textContent = item[4];
    document.getElementById('obangCard').style.setProperty('--card-color', item[5]);
  }));

  const elementCopy = {
    dot: ['점', '점은 위치를 나타내고, 모이거나 흩어지며 움직임과 밀도를 만들어요.'],
    line: ['선', '선은 방향과 속도를 만들고 형태의 윤곽을 나타내요.'],
    plane: ['면', '면은 선으로 둘러싸인 넓은 자리이며 색과 무늬를 담을 수 있어요.'],
    form: ['형', '형은 대상의 생김새와 덩어리를 나타내며 기하형과 자연형으로 나눌 수 있어요.'],
    texture: ['질감', '질감은 재료의 매끈함·거침·단단함 같은 표면 느낌이에요.']
  };
  document.querySelectorAll('[data-element]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-element]').forEach((item) => item.classList.toggle('active', item === button));
    document.getElementById('abstractArt').dataset.highlight = button.dataset.element;
    document.getElementById('elementTerm').textContent = elementCopy[button.dataset.element][0];
    document.getElementById('elementText').textContent = elementCopy[button.dataset.element][1];
  }));

  const principleCopy = {
    balance: ['균형', '양쪽이 똑같지 않아도 크기와 색의 무게가 어울리면 안정되어 보여요.'],
    emphasis: ['강조와 대비', '주변과 다른 크기·색·모양을 사용하면 중요한 부분이 먼저 보여요.'],
    rhythm: ['반복과 리듬', '비슷한 요소의 크기와 간격을 바꾸며 반복하면 화면에 흐름이 생겨요.']
  };
  document.querySelectorAll('[data-principle]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-principle]').forEach((item) => item.classList.toggle('active', item === button));
    document.getElementById('principleCanvas').dataset.principle = button.dataset.principle;
    document.getElementById('principleTerm').textContent = principleCopy[button.dataset.principle][0];
    document.getElementById('principleText').textContent = principleCopy[button.dataset.principle][1];
  }));

  const spaceCopy = {
    overlap: ['겹침', '형태가 서로 겹치면 앞뒤 관계가 생겨 평면에서도 공간감이 나타나요.'],
    size: ['크기 변화', '같은 종류의 대상도 크게 그리면 가깝게, 작게 그리면 멀게 보여요.'],
    position: ['위치 변화', '대상을 화면 아래에 놓으면 가깝게, 위쪽에 놓으면 멀게 느껴져요.']
  };
  document.querySelectorAll('[data-space]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-space]').forEach((item) => item.classList.toggle('active', item === button));
    document.getElementById('spaceCanvas').dataset.space = button.dataset.space;
    document.getElementById('spaceTerm').textContent = spaceCopy[button.dataset.space][0];
    document.getElementById('spaceText').textContent = spaceCopy[button.dataset.space][1];
  }));

  updateColorProperties();
  resetMix();
})();
