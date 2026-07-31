(() => {
  'use strict';

  const boardElement = document.getElementById('board');
  const titleElement = document.getElementById('gameTitle');
  const introElement = document.getElementById('intro');
  const moveElement = document.getElementById('moveCount');
  const timerElement = document.getElementById('timer');
  const bestElement = document.getElementById('bestScore');
  const statusElement = document.getElementById('status');
  const celebration = document.getElementById('celebration');
  const resultSummary = document.getElementById('resultSummary');
  const soundButton = document.getElementById('soundButton');

  let size = new URLSearchParams(location.search).get('size') === '4' ? 4 : 3;
  let tiles = [];
  let initialTiles = [];
  let moves = 0;
  let elapsed = 0;
  let timerId = null;
  let started = false;
  let soundEnabled = true;
  let audioContext = null;

  const solvedTiles = () => [...Array(size * size - 1)].map((_, index) => index + 1).concat(0);
  const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const bestKey = () => `songhwaplay-sliding-${size}-best`;

  function neighboringIndexes(blankIndex) {
    const row = Math.floor(blankIndex / size);
    const column = blankIndex % size;
    const indexes = [];
    if (row > 0) indexes.push(blankIndex - size);
    if (row < size - 1) indexes.push(blankIndex + size);
    if (column > 0) indexes.push(blankIndex - 1);
    if (column < size - 1) indexes.push(blankIndex + 1);
    return indexes;
  }

  function shuffledSolvableTiles() {
    const values = solvedTiles();
    let previousBlank = -1;
    const turns = size === 3 ? 90 : 180;
    for (let turn = 0; turn < turns; turn += 1) {
      const blank = values.indexOf(0);
      let choices = neighboringIndexes(blank).filter(index => index !== previousBlank);
      if (!choices.length) choices = neighboringIndexes(blank);
      const next = choices[Math.floor(Math.random() * choices.length)];
      [values[blank], values[next]] = [values[next], values[blank]];
      previousBlank = blank;
    }
    return values.join(',') === solvedTiles().join(',') ? shuffledSolvableTiles() : values;
  }

  function render() {
    boardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    boardElement.setAttribute('aria-label', `${size === 3 ? '8' : '15'} 퍼즐 게임판`);
    boardElement.replaceChildren();
    tiles.forEach((value, index) => {
      if (value === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty';
        empty.setAttribute('aria-hidden', 'true');
        boardElement.append(empty);
        return;
      }
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `tile${value === index + 1 ? ' correct' : ''}`;
      button.textContent = value;
      button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', `${value}번 타일`);
      button.addEventListener('click', () => moveTile(index));
      boardElement.append(button);
    });
  }

  function startTimer() {
    if (started) return;
    started = true;
    timerId = window.setInterval(() => {
      elapsed += 1;
      timerElement.textContent = formatTime(elapsed);
    }, 1000);
  }

  function stopTimer() {
    window.clearInterval(timerId);
    timerId = null;
  }

  function tone(frequency, duration = .06) {
    if (!soundEnabled) return;
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }

  function isSolved() {
    return tiles.every((value, index) => value === solvedTiles()[index]);
  }

  function completeGame() {
    stopTimer();
    statusElement.textContent = '완성했습니다!';
    statusElement.classList.add('success');
    const previous = JSON.parse(localStorage.getItem(bestKey()) || 'null');
    if (!previous || moves < previous.moves || (moves === previous.moves && elapsed < previous.time)) {
      localStorage.setItem(bestKey(), JSON.stringify({ moves, time: elapsed }));
    }
    updateBest();
    resultSummary.textContent = `${moves}번 이동 · ${formatTime(elapsed)}`;
    window.setTimeout(() => {
      celebration.hidden = false;
      document.getElementById('playAgainButton').focus();
      tone(659, .18);
    }, 220);
  }

  function moveTile(index) {
    const blank = tiles.indexOf(0);
    if (!neighboringIndexes(blank).includes(index)) {
      tone(150, .04);
      return;
    }
    startTimer();
    [tiles[blank], tiles[index]] = [tiles[index], tiles[blank]];
    moves += 1;
    moveElement.textContent = moves;
    statusElement.textContent = '빈칸 옆의 타일을 눌러 이동하세요.';
    tone(300 + tiles[blank] * 10);
    render();
    if (isSolved()) completeGame();
  }

  function updateBest() {
    const best = JSON.parse(localStorage.getItem(bestKey()) || 'null');
    bestElement.textContent = best ? `${best.moves}회` : '—';
    bestElement.title = best ? `${best.moves}번 이동, ${formatTime(best.time)}` : '';
  }

  function resetRound(values) {
    stopTimer();
    tiles = [...values];
    moves = 0;
    elapsed = 0;
    started = false;
    moveElement.textContent = '0';
    timerElement.textContent = '00:00';
    statusElement.textContent = '빈칸 옆의 타일을 눌러 이동하세요.';
    statusElement.classList.remove('success');
    celebration.hidden = true;
    render();
  }

  function newGame() {
    initialTiles = shuffledSolvableTiles();
    resetRound(initialTiles);
  }

  function selectMode(nextSize) {
    size = nextSize;
    const puzzleName = size === 3 ? '8 퍼즐' : '15 퍼즐';
    titleElement.textContent = puzzleName;
    introElement.textContent = `숫자 타일을 밀어 1부터 ${size * size - 1}까지 순서대로 맞춰 보세요.`;
    document.title = `${puzzleName} | songhwaplay`;
    history.replaceState(null, '', `?size=${size}`);
    document.querySelectorAll('[data-size]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.size) === size));
    });
    updateBest();
    newGame();
  }

  document.querySelectorAll('[data-size]').forEach(button => {
    button.addEventListener('click', () => selectMode(Number(button.dataset.size)));
  });
  document.getElementById('newGameButton').addEventListener('click', newGame);
  document.getElementById('resetButton').addEventListener('click', () => resetRound(initialTiles));
  document.getElementById('playAgainButton').addEventListener('click', newGame);
  soundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundButton.textContent = soundEnabled ? '소리 켬' : '소리 끔';
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
  });
  document.addEventListener('keydown', event => {
    if (celebration.hidden === false) return;
    const blank = tiles.indexOf(0);
    const row = Math.floor(blank / size);
    const column = blank % size;
    const targets = {
      ArrowUp: row < size - 1 ? blank + size : -1,
      ArrowDown: row > 0 ? blank - size : -1,
      ArrowLeft: column < size - 1 ? blank + 1 : -1,
      ArrowRight: column > 0 ? blank - 1 : -1
    };
    if (event.key in targets && targets[event.key] >= 0) {
      event.preventDefault();
      moveTile(targets[event.key]);
    }
  });

  selectMode(size);
})();
