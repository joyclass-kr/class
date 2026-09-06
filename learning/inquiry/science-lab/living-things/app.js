document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = [...document.querySelectorAll('[data-mode]')];
    const controlArea = document.getElementById('controlArea');
    const predictionArea = document.getElementById('predictionArea');
    const predictionLegend = document.getElementById('predictionLegend');
    const methodHint = document.getElementById('methodHint');
    const checkBtn = document.getElementById('checkBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const labelA = document.getElementById('labelA');
    const labelB = document.getElementById('labelB');
    const valueA = document.getElementById('valueA');
    const valueB = document.getElementById('valueB');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const mainGroup = document.getElementById('mainGroup');
    const graphGroup = document.getElementById('graphGroup');
    const dataNote = document.getElementById('dataNote');

    const RUN_SECONDS = 8;

    const batchim = w => { const c = w.charCodeAt(w.length - 1); return c >= 0xAC00 && c <= 0xD7A3 ? (c - 0xAC00) % 28 !== 0 : false; };
    const eun = w => w + (batchim(w) ? '은' : '는');
    const iga = w => w + (batchim(w) ? '이' : '가');

    /* -------------------------------------------------------------- data */
    // Twelve cards. Each fact is plain yes or no so any rule sorts every card.
    const CARDS = [
        { name: '참새', icon: '🐦', animal: true, legs: true, flies: true, water: false, fur: false },
        { name: '개구리', icon: '🐸', animal: true, legs: true, flies: false, water: true, fur: false },
        { name: '붕어', icon: '🐟', animal: true, legs: false, flies: false, water: true, fur: false },
        { name: '고양이', icon: '🐱', animal: true, legs: true, flies: false, water: false, fur: true },
        { name: '뱀', icon: '🐍', animal: true, legs: false, flies: false, water: false, fur: false },
        { name: '나비', icon: '🦋', animal: true, legs: true, flies: true, water: false, fur: false },
        { name: '지렁이', icon: '🪱', animal: true, legs: false, flies: false, water: false, fur: false },
        { name: '오리', icon: '🦆', animal: true, legs: true, flies: true, water: true, fur: false },
        { name: '소나무', icon: '🌲', animal: false, legs: false, flies: false, water: false, fur: false },
        { name: '연꽃', icon: '🪷', animal: false, legs: false, flies: false, water: true, fur: false },
        { name: '선인장', icon: '🌵', animal: false, legs: false, flies: false, water: false, fur: false },
        { name: '민들레', icon: '🌼', animal: false, legs: false, flies: false, water: false, fur: false },
    ];
    const RULES = {
        animal: { label: '동물인가, 식물인가', yes: '동물', no: '식물', key: 'animal' },
        legs: { label: '다리가 있는가', yes: '다리 있음', no: '다리 없음', key: 'legs' },
        flies: { label: '날 수 있는가', yes: '날 수 있음', no: '날 수 없음', key: 'flies' },
        water: { label: '물에서 사는가', yes: '물에서 삶', no: '땅에서 삶', key: 'water' },
        fur: { label: '털이 있는가', yes: '털 있음', no: '털 없음', key: 'fur' },
    };

    // Six living things, each with the body it has and the home it fits.
    const HABITATS = {
        desert: { label: '사막', hint: '뜨겁고 물이 없음', cls: 'desert', icon: '🏜️' },
        polar: { label: '극지방', hint: '얼음과 눈, 매우 추움', cls: 'polar', icon: '🧊' },
        water: { label: '물속', hint: '강과 연못', cls: 'water', icon: '🌊' },
        forest: { label: '숲', hint: '나무가 많음', cls: 'forest', icon: '🌳' },
    };
    const BEINGS = {
        camel: { name: '낙타', icon: '🐫', home: 'desert',
                 traits: ['넓고 두꺼운 발바닥 — 뜨거운 모래', '긴 눈썹과 닫히는 코 — 모래바람', '혹에 저장한 지방 — 먹이 없는 날', '물을 오래 참는 몸'],
                 trouble: { polar: '털이 얇아 추위를 견디지 못합니다', water: '헤엄치지도 숨 쉬지도 못합니다', forest: '먹이는 있지만 젖은 땅에서 발이 미끄러지고 습기에 약합니다' } },
        bear: { name: '북극곰', icon: '🐻', home: 'polar',
                traits: ['두꺼운 털과 지방 — 추위 막기', '흰 털 — 눈 속에서 숨기', '넓은 발 — 눈과 얼음 위 걷기', '작은 귀 — 열 지키기'],
                trouble: { desert: '두꺼운 털과 지방 때문에 열을 내보내지 못해 너무 덥습니다', water: '헤엄은 치지만 숨 쉬며 살 수는 없습니다', forest: '추위 막는 두꺼운 털이 너무 더워 오래 살기 힘듭니다' } },
        fish: { name: '붕어', icon: '🐟', home: 'water',
                traits: ['아가미 — 물속에서 숨 쉬기', '지느러미 — 헤엄치기', '비늘 — 몸 보호', '매끈한 몸 — 물을 잘 가름'],
                trouble: { desert: '아가미로는 물 밖에서 숨을 쉴 수 없습니다', polar: '얼음 위라 숨도 못 쉬고 움직이지도 못합니다', forest: '물이 없어 살 수 없습니다' } },
        squirrel: { name: '다람쥐', icon: '🐿️', home: 'forest',
                    traits: ['날카로운 발톱 — 나무 오르기', '긴 꼬리 — 균형 잡기', '튼튼한 앞니 — 도토리 깨기', '갈색 털 — 나무 사이에 숨기'],
                    trouble: { desert: '먹을 도토리도 숨을 나무도 없고 너무 뜨겁습니다', polar: '먹이가 없고 털이 추위를 막기에 얇습니다', water: '숨을 쉴 수 없고 헤엄도 오래 못 칩니다' } },
        cactus: { name: '선인장', icon: '🌵', home: 'desert',
                  traits: ['잎 대신 가시 — 물이 날아가지 않게', '굵은 줄기 — 물 저장', '넓게 퍼진 뿌리 — 빗물 모으기'],
                  trouble: { polar: '얼어 버려 살 수 없습니다', water: '뿌리가 물에 잠기면 썩습니다', forest: '햇빛이 모자라고 물이 너무 많아 썩기 쉽습니다' } },
        lily: { name: '수련', icon: '🪷', home: 'water',
                traits: ['넓은 잎 — 물 위에 떠 햇빛 받기', '공기가 든 줄기 — 물에 뜨기', '물속 뿌리 — 바닥에 붙기'],
                trouble: { desert: '물이 없으면 하루도 못 버팁니다', polar: '얼어서 자라지 못합니다', forest: '뜰 물이 없어 잎이 땅에 늘어져 마릅니다' } },
    };

    const state = {
        mode: 'sort',
        rule: 'legs',
        habitat: 'desert', being: 'camel',
        progress: 0, prediction: null,
    };
    let running = false, frameId = 0, lastStamp = 0;

    /* ------------------------------------------------------------ models */
    function analyseSort(s = state) {
        const rule = RULES[s.rule];
        const yes = CARDS.filter(c => c[rule.key]), no = CARDS.filter(c => !c[rule.key]);
        const verdict = yes.length <= 4 ? 'few' : yes.length <= 7 ? 'mid' : 'many';
        return { kind: 'sort', rule, yes, no, verdict };
    }
    const sortedCount = p => Math.min(CARDS.length, Math.floor(p * CARDS.length + 1e-9));

    function analyseHabitat(s = state) {
        const habitat = HABITATS[s.habitat], being = BEINGS[s.being];
        const fit = being.home === s.habitat;
        return { kind: 'habitat', habitat, being, fit, verdict: fit ? 'fit' : 'unfit', trouble: being.trouble[s.habitat] || '' };
    }
    const shownTraits = (a, p) => Math.min(a.being.traits.length, Math.floor(p * (a.being.traits.length + 1)));

    const analyse = () => (state.mode === 'sort' ? analyseSort() : analyseHabitat());

    /* ---------------------------------------------------------- controls */
    function pickRow(legend, name, options, current, cols) {
        return `<fieldset class="pick-field"><legend>${legend}</legend>` +
            `<div class="pick-buttons cols${cols}" data-pick="${name}">` +
            options.map(o => `<button type="button" data-value="${o.value}" class="${o.value === String(current) ? 'selected' : ''}">` +
                `${o.label}${o.hint ? `<small>${o.hint}</small>` : ''}</button>`).join('') +
            `</div></fieldset>`;
    }

    function buildControls() {
        if (state.mode === 'sort') {
            controlArea.innerHTML = pickRow('나누는 기준', 'rule', Object.entries(RULES).map(([k, v]) => ({ value: k, label: v.label })), state.rule, 2);
        } else {
            controlArea.innerHTML =
                pickRow('사는 곳', 'habitat', Object.entries(HABITATS).map(([k, v]) => ({ value: k, label: `${v.icon} ${v.label}`, hint: v.hint })), state.habitat, 4) +
                pickRow('생물', 'being', Object.entries(BEINGS).map(([k, v]) => ({ value: k, label: `${v.icon} ${v.name}` })), state.being, 3);
        }
        controlArea.querySelectorAll('[data-pick]').forEach(group => {
            group.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
                state[group.dataset.pick] = button.dataset.value;
                group.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
                buildPrediction();
                settingsChanged();
            }));
        });
    }

    function buildPrediction() {
        let list;
        if (state.mode === 'sort') {
            const rule = RULES[state.rule];
            list = [{ value: 'few', label: '4장 이하' }, { value: 'mid', label: '5~7장' }, { value: 'many', label: '8장 이상' }];
            predictionLegend.textContent = `'${rule.yes}' 상자에 몇 장이 들어갈까요?`;
        } else {
            list = [{ value: 'fit', label: '잘 산다' }, { value: 'unfit', label: '살기 힘들다' }];
            predictionLegend.textContent = `${eun(BEINGS[state.being].name)} ${HABITATS[state.habitat].label}에서 어떨까요?`;
        }
        predictionArea.innerHTML = list.map(o => `<button type="button" data-prediction="${o.value}"${o.value === state.prediction ? ' class="selected"' : ''}>${o.label}</button>`).join('');
        predictionArea.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
            state.prediction = button.dataset.prediction;
            predictionArea.querySelectorAll('button').forEach(b => b.classList.toggle('selected', b === button));
        }));
    }

    /* ----------------------------------------------------------- visuals */
    function card(x, y, c, hit) {
        return `<rect class="card${hit ? ' hit' : ''}" x="${x}" y="${y}" width="46" height="40" rx="5"/>` +
            `<text class="card-icon" x="${x + 23}" y="${y + 22}" text-anchor="middle">${c.icon}</text>` +
            `<text class="card-name" x="${x + 23}" y="${y + 35}" text-anchor="middle">${c.name}</text>`;
    }

    function renderSort(a, p) {
        const n = sortedCount(p);
        let out = '';
        // the two boxes
        const BOXES = [{ x: 20, title: a.rule.yes, list: a.yes }, { x: 240, title: a.rule.no, list: a.no }];
        BOXES.forEach(b => {
            out += `<rect class="box${n > 0 ? ' filled' : ''}" x="${b.x}" y="46" width="200" height="150" rx="8"/>`;
            out += `<text class="box-title" x="${b.x + 8}" y="40">${b.title}</text>`;
        });
        // cards fall into their box one by one, in deck order
        const placed = { yes: 0, no: 0 };
        CARDS.slice(0, n).forEach(c => {
            const isYes = !!c[a.rule.key];
            const box = BOXES[isYes ? 0 : 1];
            const k = placed[isYes ? 'yes' : 'no'];
            const col = k % 4, row = Math.floor(k / 4);
            out += card(box.x + 6 + col * 48, 54 + row * 46, c, false);
            placed[isYes ? 'yes' : 'no'] += 1;
        });
        // the card on its way, shown above the boxes
        if (n < CARDS.length && p > 0) {
            const c = CARDS[n];
            out += card(300, 2, c, true);
        }
        BOXES.forEach((b, i) => {
            const count = i === 0 ? placed.yes : placed.no;
            out += `<text class="count-text" x="${b.x + 192}" y="40" text-anchor="end">${count}장${n >= CARDS.length ? '' : ` / ${b.list.length}`}</text>`;
        });
        out += `<text class="rule-text" x="20" y="16">기준: ${a.rule.label}</text>`;
        out += `<text class="note-text" x="20" y="210">${n === 0 ? '카드 12장을 기준에 따라 두 상자에 나눕니다' : n < CARDS.length ? `${n}장 나눔 · 다음 카드: ${CARDS[n].name}` : '12장을 모두 나누었습니다'}</text>`;
        return out;
    }

    function renderHabitat(a, p) {
        const shown = shownTraits(a, p);
        let out = `<rect class="scene ${a.habitat.cls}" x="12" y="30" width="200" height="160" rx="8"/>`;
        out += `<text class="box-title" x="22" y="48">${a.habitat.icon} ${a.habitat.label} — ${a.habitat.hint}</text>`;
        out += `<text style="font-size:56px" x="112" y="140" text-anchor="middle">${a.being.icon}</text>`;
        out += `<text class="box-title" x="112" y="176" text-anchor="middle">${a.being.name}</text>`;
        // the body's features, listed one by one, marked for this place
        out += `<text class="box-title" x="226" y="48">${a.being.name}의 몸</text>`;
        a.being.traits.slice(0, shown).forEach((t, i) => {
            out += `<text class="trait-text" x="226" y="${68 + i * 20}">${a.fit ? '✓' : '·'} ${t}</text>`;
        });
        if (p >= 1) {
            const y = 68 + a.being.traits.length * 20 + 6;
            out += `<text class="trait-text ${a.fit ? 'trait-good' : 'trait-bad'}" x="226" y="${y}">${a.fit ? `→ ${a.habitat.label}에 딱 맞는 몸입니다` : `✗ ${a.trouble}`.slice(0, 26)}</text>`;
            if (!a.fit && a.trouble.length > 24) out += `<text class="trait-text trait-bad" x="226" y="${y + 14}">${a.trouble.slice(24)}</text>`;
        }
        out += `<text class="rule-text" x="20" y="16">${a.being.name} · ${a.habitat.label} → ${a.fit ? '잘 산다' : '살기 힘들다'} (원래 사는 곳: ${HABITATS[a.being.home].label})</text>`;
        out += `<text class="note-text" x="20" y="210">${shown < a.being.traits.length ? '몸의 특징을 하나씩 살피는 중' : '몸의 특징을 모두 살폈습니다'}</text>`;
        return out;
    }

    function renderMain(a) {
        mainGroup.innerHTML = a.kind === 'sort' ? renderSort(a, state.progress) : renderHabitat(a, state.progress);
    }

    /* ------------------------------------------------------------ graphs */
    // every rule at once: how the same twelve cards split under each
    function graphSort(a) {
        let out = `<text class="axis-title" x="20" y="20">기준마다 열두 장이 어떻게 나뉘는가</text>`;
        Object.entries(RULES).forEach(([k, r], i) => {
            const yes = CARDS.filter(c => c[r.key]).length;
            const y = 44 + i * 30;
            const mine = k === state.rule;
            out += `<text class="bar-text" fill="${mine ? '#d97706' : '#334155'}" x="20" y="${y + 4}">${r.label}</text>`;
            const x0 = 150, w = 280;
            out += `<rect class="bar" x="${x0}" y="${y - 6}" width="${(w * yes / 12).toFixed(1)}" height="14" rx="3" fill="#059669" opacity="${mine ? '.95' : '.45'}"/>`;
            out += `<rect class="bar" x="${(x0 + w * yes / 12).toFixed(1)}" y="${y - 6}" width="${(w * (12 - yes) / 12).toFixed(1)}" height="14" rx="3" fill="#6f8f8d" opacity="${mine ? '.9' : '.4'}"/>`;
            out += `<text class="bar-text" fill="#10202a" x="${x0 + 6}" y="${y + 4}">${r.yes} ${yes}</text>`;
            out += `<text class="bar-text" fill="#e8f2f5" x="${x0 + w - 6}" y="${y + 4}" text-anchor="end">${r.no} ${12 - yes}</text>`;
        });
        out += `<text class="note-text" x="20" y="190">같은 열두 장인데 기준이 달라지면 무리가 달라집니다</text>`;
        return out;
    }

    // which of the six belong in this place
    function graphHabitat(a) {
        let out = `<text class="axis-title" x="20" y="20">${a.habitat.label}에서 잘 살 수 있는 생물은?</text>`;
        Object.entries(BEINGS).forEach(([k, b], i) => {
            const col = i % 3, row = Math.floor(i / 3);
            const x = 20 + col * 146, y = 40 + row * 66;
            const ok = b.home === state.habitat, mine = k === state.being;
            out += `<rect class="card${mine ? ' hit' : ''}" x="${x}" y="${y}" width="134" height="56" rx="6"/>`;
            out += `<text style="font-size:22px" x="${x + 22}" y="${y + 36}" text-anchor="middle">${b.icon}</text>`;
            out += `<text class="bar-text" fill="#0f172a" x="${x + 44}" y="${y + 22}">${b.name}</text>`;
            out += `<text class="bar-text" fill="${ok ? '#059669' : '#ff7d6b'}" x="${x + 44}" y="${y + 42}">${ok ? '✓ 잘 산다' : `✗ ${HABITATS[b.home].label}이 집`}</text>`;
        });
        out += `<text class="note-text" x="20" y="188">몸의 특징이 그곳에 맞는 생물만 잘 살 수 있습니다</text>`;
        return out;
    }

    function noteFor(a) {
        if (a.kind === 'sort') {
            return `<div class="data-row"><span class="data-name">기준</span><span class="data-val">${a.rule.label}</span></div>` +
                `<div class="data-row"><span class="data-name">${a.rule.yes}</span><span class="data-val">${a.yes.map(c => c.name).join(', ') || '없음'} (${a.yes.length}장)</span></div>` +
                `<div class="data-row"><span class="data-name">${a.rule.no}</span><span class="data-val">${a.no.map(c => c.name).join(', ')} (${a.no.length}장)</span></div>` +
                `<div class="data-row match"><span class="data-name">나눈 카드</span><span class="data-val">${sortedCount(state.progress)} / 12장</span></div>`;
        }
        return `<div class="data-row"><span class="data-name">사는 곳</span><span class="data-val">${a.habitat.label} — ${a.habitat.hint}</span></div>` +
            `<div class="data-row"><span class="data-name">생물</span><span class="data-val">${a.being.name} (원래 사는 곳: ${HABITATS[a.being.home].label})</span></div>` +
            `<div class="data-row"><span class="data-name">몸의 특징</span><span class="data-val">${a.being.traits.join(' · ')}</span></div>` +
            `<div class="data-row match"><span class="data-name">여기서는</span><span class="data-val">${a.fit ? '몸이 사는 곳에 딱 맞아 잘 산다' : a.trouble}</span></div>`;
    }

    function render() {
        const a = analyse();
        renderMain(a);
        graphGroup.innerHTML = a.kind === 'sort' ? graphSort(a) : graphHabitat(a);
        stageBadge.textContent = a.kind === 'sort' ? a.rule.label : `${a.being.name} · ${a.habitat.label}`;
        methodHint.textContent = state.mode === 'sort'
            ? '같은 카드라도 나누는 기준이 달라지면 무리가 달라집니다'
            : '몸의 특징이 사는 곳에 맞는 생물만 그곳에서 잘 살 수 있습니다';
        dataNote.innerHTML = noteFor(a);
        return a;
    }

    /* --------------------------------------------------------------- run */
    function tick(dt) {
        state.progress = Math.min(1, state.progress + dt / RUN_SECONDS);
        render();
        return state.progress >= 1;
    }

    function stopRun() { running = false; if (frameId) cancelAnimationFrame(frameId); frameId = 0; }

    function frame(stamp) {
        if (!running) return;
        const dt = Math.min(0.05, (stamp - lastStamp) / 1000 || 0);
        lastStamp = stamp;
        if (tick(dt)) { stopRun(); finish(); } else frameId = requestAnimationFrame(frame);
    }

    function startRun() {
        stopRun();
        state.progress = 0;
        running = true;
        lastStamp = performance.now();
        render();
        frameId = requestAnimationFrame(frame);
    }

    function finish() {
        const a = render();
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        if (a.kind === 'sort') {
            labelA.textContent = a.rule.yes; labelB.textContent = a.rule.no;
            valueA.textContent = `${a.yes.length}장`; valueB.textContent = `${a.no.length}장`;
            predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
                : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
            let s = `'${a.rule.label}'로 나누니 ${a.rule.yes} 상자에 ${a.yes.map(c => c.name).join('·')} ${a.yes.length}장, ${a.rule.no} 상자에 ${a.no.length}장이 들어갔습니다. `;
            if (state.rule === 'legs') s += `다리가 없는 상자에 붕어·뱀·지렁이 같은 동물과 식물이 함께 들어갔습니다. 다리로는 동물과 식물을 가를 수 없다는 뜻입니다.`;
            else if (state.rule === 'animal') s += `스스로 움직여 먹이를 찾는 것이 동물, 한자리에서 햇빛으로 양분을 만드는 것이 식물입니다. 이 기준이면 딱 8장과 4장으로 나뉩니다.`;
            else if (state.rule === 'water') s += `개구리와 오리는 물과 땅을 오가지만 물에서 사는 쪽으로 넣었습니다. 연꽃처럼 식물도 물에 사는 것이 있습니다.`;
            else if (state.rule === 'flies') s += `참새·나비·오리처럼 날개가 있어도 생김새는 아주 다릅니다. 기준이 하나면 무리 안이 다양할 수 있습니다.`;
            else s += `털이 있는 카드는 고양이 하나뿐입니다. 이런 기준은 한 무리가 너무 작아 나누는 데 별로 쓸모가 없습니다. 다른 기준을 골라 견주어 보세요.`;
            explanation.textContent = s;
            return;
        }
        labelA.textContent = `${a.habitat.label}에서`; labelB.textContent = '원래 사는 곳';
        valueA.textContent = a.fit ? '잘 산다' : '살기 힘들다';
        valueB.textContent = HABITATS[a.being.home].label;
        predictionResult.textContent = !state.prediction ? '다음에는 결과를 먼저 예상해 보세요.'
            : state.prediction === a.verdict ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';
        explanation.textContent = a.fit
            ? `${eun(a.being.name)} ${a.being.traits.join(', ')} 같은 몸의 특징을 가져 ${a.habitat.label}에 딱 맞습니다. 사는 곳에 알맞은 몸을 가졌기 때문에 그곳에서 잘 살 수 있습니다.`
            : `${a.being.name}의 몸은 ${HABITATS[a.being.home].label}에 맞추어져 있어 ${a.habitat.label}에서는 ${a.trouble}. 생물의 몸은 원래 사는 곳에 맞게 생겼기 때문에 다른 곳에 옮기면 살기 어렵습니다.`;
    }

    function settingsChanged() {
        stopRun();
        state.progress = 0;
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        render();
    }

    modeButtons.forEach(button => button.addEventListener('click', () => {
        state.mode = button.dataset.mode;
        state.prediction = null;
        modeButtons.forEach(item => item.classList.toggle('selected', item === button));
        buildControls();
        buildPrediction();
        stageCaption.textContent = state.mode === 'sort'
            ? '카드가 한 장씩 기준에 맞는 상자로 들어갑니다.'
            : '왼쪽은 사는 곳, 오른쪽은 그 생물의 몸의 특징입니다.';
        settingsChanged();
    }));
    checkBtn.addEventListener('click', startRun);
    resetBtn.addEventListener('click', () => {
        stopRun();
        Object.assign(state, { rule: 'legs', habitat: 'desert', being: 'camel', progress: 0, prediction: null });
        modeButtons.find(b => b.dataset.mode === 'sort').click();
    });

    function shuffleQuizOptions(card) {
        const optionGroup = card.querySelector('.quiz-options');
        const options = Array.from(optionGroup.children);
        for (let index = options.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [options[index], options[randomIndex]] = [options[randomIndex], options[index]];
        }
        optionGroup.append(...options);
    }

    document.querySelectorAll('.quiz-card').forEach(card => {
        shuffleQuizOptions(card);
        const answerButton = card.querySelector('.answer-button');
        const answerResult = card.querySelector('.answer-result');
        const answerExplanation = card.querySelector('.answer-explanation');
        answerButton.addEventListener('click', () => {
            const selected = card.querySelector('input:checked');
            if (!selected) {
                delete card.dataset.state;
                answerResult.textContent = '답을 먼저 선택하세요.';
                return;
            }
            const correct = selected.value === card.dataset.answer;
            card.dataset.state = correct ? 'correct' : 'incorrect';
            answerResult.textContent = correct ? '맞았습니다.' : '다시 생각해 보세요.';
            answerExplanation.hidden = !correct;
            if (!correct) {
                selected.checked = false;
                selected.disabled = true;
                answerResult.textContent = '다시 생각하고 다른 답을 골라보세요.';
            }
        });
    });

    window.__livingThingsModel = {
        CARDS, RULES, HABITATS, BEINGS, state,
        analyseSort, analyseHabitat, analyse, render,
        runSeconds: () => RUN_SECONDS,
        setMode(m) { modeButtons.find(b => b.dataset.mode === m).click(); },
        set(key, value) { state[key] = value; buildControls(); buildPrediction(); settingsChanged(); },
        setProgress(p) { stopRun(); state.progress = p; render(); },
        runToEnd(dt = 0.25, cap = 5000) {
            stopRun(); state.progress = 0;
            let steps = 0;
            while (!tick(dt) && steps < cap) steps += 1;
            finish();
            return { steps, progress: state.progress };
        },
        tick, finish,
    };

    resetBtn.click();
});
