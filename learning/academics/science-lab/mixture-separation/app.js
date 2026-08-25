document.addEventListener('DOMContentLoaded', () => {
    const magnetBtn = document.getElementById('magnetBtn');
    const waterBtn = document.getElementById('waterBtn');
    const sieveBtn = document.getElementById('sieveBtn');
    const meshRange = document.getElementById('meshRange');
    const graphGroup = document.getElementById('graphGroup');
    const meshOutput = document.getElementById('meshOutput');
    const resetBtn = document.getElementById('resetBtn');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const resultLeft = document.getElementById('resultLeft');
    const resultDone = document.getElementById('resultDone');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const stageBadge = document.getElementById('stageBadge');
    const mixtureGroup = document.getElementById('mixtureGroup');
    const trayGroup = document.getElementById('trayGroup');
    const propertyTable = document.getElementById('propertyTable');

    // Real grain sizes in mm and densities in g/cm³. The sieve decision uses
    // these numbers, not the drawn radii — the drawing has to compress a 27x
    // size range to stay visible, and the page says so.
    const SUBSTANCES = [
        { id: 'iron', name: '철가루',      mm: 0.3, density: 7.9,  magnetic: true,  soluble: false, color: '#8a8f98' },
        { id: 'salt', name: '소금',        mm: 0.4, density: 2.2,  magnetic: false, soluble: true,  color: '#eef2f5' },
        { id: 'sand', name: '모래',        mm: 0.5, density: 2.6,  magnetic: false, soluble: false, color: '#c8a97a' },
        { id: 'foam', name: '스타이로폼',  mm: 6,   density: 0.05, magnetic: false, soluble: false, color: '#f2f4f6' },
        { id: 'bean', name: '콩',          mm: 8,   density: 1.3,  magnetic: false, soluble: false, color: '#d5b25e' },
    ];
    const GRAINS_PER = { iron: 7, salt: 7, sand: 7, foam: 3, bean: 3 };

    const BOWL = { x0: 44, x1: 192, yTop: 96, yBottom: 222 };
    const TRAY = { x: 244, w: 200, yTop: 40, h: 52, gap: 8 };

    let separated = [];     // [{id, method}] in the order they came out
    let grains = [];        // one entry per drawn grain

    // Korean particles agree with the final consonant of the preceding word:
    // 철가루가/콩이, 모래를/콩을, 소금은/모래는. Substance names are assembled
    // into sentences at runtime, so these can't be written inline. For a
    // comma-joined list the particle follows the last item.
    function hasBatchim(phrase) {
        const w = phrase.trim();
        const code = w.charCodeAt(w.length - 1);
        if (code < 0xac00 || code > 0xd7a3) return false;
        return (code - 0xac00) % 28 !== 0;
    }
    const subjectP = w => (hasBatchim(w) ? '이' : '가');   // 이/가
    const objectP  = w => (hasBatchim(w) ? '을' : '를');   // 을/를
    const topicP   = w => (hasBatchim(w) ? '은' : '는');   // 은/는

    const remaining = () => SUBSTANCES.filter(s => !separated.some(v => s.id === v.id));
    const isSeparated = id => separated.some(v => v.id === id);
    const drawRadius = mm => 2.5 + 2.6 * Math.sqrt(mm);

    function buildGrains() {
        grains = [];
        SUBSTANCES.forEach(s => {
            for (let i = 0; i < GRAINS_PER[s.id]; i += 1) {
                grains.push({ sub: s.id, key: `${s.id}-${i}`, i });
            }
        });
        // Deterministic scatter so a reset reproduces the same picture.
        let seed = 7;
        const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
        grains.forEach(g => {
            const s = SUBSTANCES.find(x => x.id === g.sub);
            const r = drawRadius(s.mm);
            g.homeX = BOWL.x0 + r + rnd() * (BOWL.x1 - BOWL.x0 - 2 * r);
            g.homeY = BOWL.yTop + r + rnd() * (BOWL.yBottom - BOWL.yTop - 2 * r);
        });
        mixtureGroup.innerHTML = grains.map(g => {
            const s = SUBSTANCES.find(x => x.id === g.sub);
            return `<circle class="grain" id="g-${g.key}" cx="${g.homeX.toFixed(1)}" cy="${g.homeY.toFixed(1)}" r="${drawRadius(s.mm).toFixed(1)}" fill="${s.color}" stroke="rgba(0,0,0,.28)" stroke-width="0.8"/>`;
        }).join('');
    }

    function trayRect(index) {
        return { x: TRAY.x, y: TRAY.yTop + index * (TRAY.h + TRAY.gap), w: TRAY.w, h: TRAY.h };
    }

    function render() {
        // trays
        trayGroup.innerHTML = separated.map((entry, idx) => {
            const s = SUBSTANCES.find(x => x.id === entry.id);
            const r = trayRect(idx);
            return `<rect class="tray-box" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="8"/>` +
                   `<text class="tray-label" x="${r.x + 10}" y="${r.y + 21}">${s.name}</text>` +
                   `<text class="tray-method" x="${r.x + 10}" y="${r.y + 38}">${entry.method}</text>`;
        }).join('');

        // move each grain to its tray, or leave it in the bowl
        grains.forEach(g => {
            const el = document.getElementById(`g-${g.key}`);
            const idx = separated.findIndex(v => v.id === g.sub);
            if (idx === -1) { el.setAttribute('transform', 'translate(0 0)'); return; }
            const r = trayRect(idx);
            const s = SUBSTANCES.find(x => x.id === g.sub);
            const rad = drawRadius(s.mm);
            const perRow = Math.max(1, Math.floor((r.w - 96) / (rad * 2 + 3)));
            const col = g.i % perRow, row = Math.floor(g.i / perRow);
            const tx = r.x + 92 + rad + col * (rad * 2 + 3);
            const ty = r.y + 18 + row * (rad * 2 + 3);
            el.setAttribute('transform', `translate(${(tx - g.homeX).toFixed(1)} ${(ty - g.homeY).toFixed(1)})`);
        });

        const left = remaining();
        stageBadge.textContent = left.length <= 1 ? '분리 완료' : `${left.length}가지 섞여 있음`;
        resultLeft.textContent = `${left.length}가지`;
        resultDone.textContent = `${separated.length}가지`;

        magnetBtn.disabled = left.length === 0;
        waterBtn.disabled = left.length === 0;
        sieveBtn.disabled = left.length === 0;

        propertyTable.innerHTML =
            `<div class="property-row head"><span>물질</span><span>크기</span><span>자석</span><span>물에서</span></div>` +
            SUBSTANCES.map(s => {
                const done = isSeparated(s.id);
                const water = s.soluble ? '녹음' : s.density < 1 ? '뜸' : '가라앉음';
                return `<div class="property-row${done ? ' separated' : ''}">` +
                       `<span><i class="swatch" style="background:${s.color}"></i>${s.name}</span>` +
                       `<span>${s.mm} mm</span><span>${s.magnetic ? '붙음' : '안 붙음'}</span><span>${water}</span></div>`;
            }).join('');

        renderSizes();
    }

    /* ------------------------------- 알갱이 크기와 체 구멍을 견주는 그림 */
    /* 가장 작은 철가루(0.3 mm)와 가장 큰 콩(8 mm)은 27배 차이라, 곧이곧대로
       그리면 작은 것들이 점이 되어 버립니다. 그래서 가로축을 로그로 잡고 그
       사실을 아래에 적어 둡니다. 체 구멍 선은 슬라이더 값을 그대로 씁니다. */
    const SZ = { x0: 96, x1: 400, top: 34, h: 17, gap: 6 };
    const MM_MIN = 0.2, MM_MAX = 12;
    const sxOf = mm => SZ.x0 + (Math.log(mm / MM_MIN) / Math.log(MM_MAX / MM_MIN)) * (SZ.x1 - SZ.x0);

    function renderSizes() {
        const mesh = Number(meshRange.value);
        let out = `<text class="size-title" x="20" y="18">알갱이 크기와 체 구멍</text>`;

        SUBSTANCES.forEach((s, i) => {
            const y = SZ.top + i * (SZ.h + SZ.gap);
            const done = isSeparated(s.id);
            out += `<rect class="size-track" x="${SZ.x0}" y="${y}" width="${SZ.x1 - SZ.x0}" height="${SZ.h}" rx="5"/>`;
            out += `<rect class="size-bar" x="${SZ.x0}" y="${y + 3}" width="${(sxOf(s.mm) - SZ.x0).toFixed(1)}" height="${SZ.h - 6}" rx="4" fill="${s.color}" opacity="${done ? .45 : .95}"/>`;
            out += `<text class="size-name" x="${SZ.x0 - 8}" y="${y + 13}" text-anchor="end">${s.name}</text>`;
            out += `<text class="size-mm" x="${(sxOf(s.mm) + 6).toFixed(1)}" y="${y + 13}">${s.mm} mm</text>`;
            if (done) out += `<text class="size-done" x="${SZ.x1 + 6}" y="${y + 13}">분리됨</text>`;
        });

        const bottom = SZ.top + SUBSTANCES.length * (SZ.h + SZ.gap);
        out += `<line class="size-axis" x1="${SZ.x0}" y1="${bottom}" x2="${SZ.x1}" y2="${bottom}"/>`;
        for (const mm of [0.2, 1, 4, 12]) {
            out += `<text class="size-tick" x="${sxOf(mm).toFixed(1)}" y="${bottom + 12}" text-anchor="middle">${mm}</text>`;
        }
        out += `<text class="size-tick" x="${SZ.x1 + 6}" y="${bottom + 12}">mm</text>`;

        // where the sieve cuts: anything to the left of the line falls through
        const mx = sxOf(mesh);
        out += `<line class="mesh-line" x1="${mx.toFixed(1)}" y1="${SZ.top - 8}" x2="${mx.toFixed(1)}" y2="${bottom}"/>`;
        const flip = mx > (SZ.x0 + SZ.x1) / 2;
        out += `<text class="mesh-text" x="${(mx + (flip ? -6 : 6)).toFixed(1)}" y="${SZ.top - 12}"${flip ? ' text-anchor="end"' : ''}>체 구멍 ${mesh} mm</text>`;
        out += `<text class="size-note" x="20" y="${bottom + 28}">왼쪽이 구멍보다 작아 빠져나가고, 오른쪽은 체에 남습니다. 가로 눈금은 27배 차이를 담으려고 촘촘해집니다.</text>`;
        graphGroup.innerHTML = out;
    }

    function showResult(text) {
        resultEmpty.hidden = true;
        resultContent.hidden = false;
        explanation.textContent = text;
    }

    // Each tool splits whatever is still mixed into two groups by one real
    // property. If every remaining substance falls on the same side, nothing
    // has actually been separated — which is itself worth showing.
    function applyTool(name, predicate, methodLabel, describe) {
        const left = remaining();
        if (left.length === 0) return;
        const picked = left.filter(predicate);
        if (picked.length === 0 || picked.length === left.length) {
            stageCaption.textContent = describe.none;
            showResult(describe.noneDetail);
            render();
            return;
        }
        picked.forEach(s => separated.push({ id: s.id, method: methodLabel(s) }));
        const names = picked.map(s => s.name).join(', ');
        stageCaption.textContent = describe.ok(names);
        showResult(describe.okDetail(names));
        render();
        if (remaining().length === 1) {
            const last = remaining()[0];
            stageCaption.textContent = `${names}${objectP(names)} 분리했습니다. 그릇에는 ${last.name}만 남아 모두 나뉘었습니다.`;
        }
    }

    magnetBtn.addEventListener('click', () => applyTool('magnet',
        s => s.magnetic,
        () => '자석에 붙음',
        {
            none: '자석에 붙는 물질이 따로 없어 분리되지 않았습니다.',
            noneDetail: '자석은 철로 된 물질만 끌어당깁니다. 남은 물질 중에는 자석에 붙는 것이 없습니다.',
            ok: n => `${n}${subjectP(n)} 자석에 붙어 분리되었습니다.`,
            okDetail: n => `${n}만 자석에 붙는 성질이 있어 다른 물질과 나눌 수 있었습니다.`,
        }));

    waterBtn.addEventListener('click', () => {
        const left = remaining();
        if (left.length === 0) return;
        // Water sorts by two properties at once: what dissolves and what floats.
        const dissolved = left.filter(s => s.soluble);
        const floated = left.filter(s => !s.soluble && s.density < 1);
        const picked = [...dissolved, ...floated];
        if (picked.length === 0 || picked.length === left.length) {
            stageCaption.textContent = '물에 넣어도 남은 물질이 모두 같게 행동해 분리되지 않았습니다.';
            showResult('물로 나누려면 녹는 물질이나 뜨는 물질이 섞여 있어야 합니다.');
            render();
            return;
        }
        dissolved.forEach(s => separated.push({ id: s.id, method: '물에 녹음' }));
        floated.forEach(s => separated.push({ id: s.id, method: '물에 뜸' }));
        const parts = [];
        if (dissolved.length) {
            const n = dissolved.map(s => s.name).join(', ');
            parts.push(`${n}${topicP(n)} 물에 녹고`);
        }
        if (floated.length) {
            const n = floated.map(s => s.name).join(', ');
            parts.push(`${n}${topicP(n)} 물에 떠서`);
        }
        stageCaption.textContent = `${parts.join(' ')} 분리되었습니다.`;
        showResult(`물에 녹는 성질과 물에 뜨는 성질이 서로 달라 나눌 수 있었습니다. 가라앉은 물질은 그릇에 남습니다.`);
        render();
    });

    sieveBtn.addEventListener('click', () => {
        const mesh = Number(meshRange.value);
        applyTool('sieve',
            s => s.mm < mesh,                       // smaller than the opening falls through
            () => `체를 빠져나감 (${mesh} mm 구멍)`,
            {
                none: `구멍이 ${mesh} mm라 남은 물질이 모두 같은 쪽으로 가서 분리되지 않았습니다.`,
                noneDetail: `체로 나누려면 구멍 크기가 두 물질의 알갱이 크기 사이에 있어야 합니다. 지금은 모두 통과하거나 모두 남았습니다.`,
                ok: n => `${n}${subjectP(n)} ${mesh} mm 구멍을 빠져나가 분리되었습니다.`,
                okDetail: n => `${n}${topicP(n)} 구멍보다 작아 빠져나가고, 더 큰 알갱이는 체 위에 남았습니다.`,
            });
    });

    meshRange.addEventListener('input', () => { meshOutput.textContent = `${meshRange.value} mm`; renderSizes(); });

    resetBtn.addEventListener('click', () => {
        separated = [];
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        stageCaption.textContent = '자석·물·체 가운데 알맞은 도구를 골라 보세요.';
        render();
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

    window.__mixtureModel = {
        SUBSTANCES, remaining, separated: () => separated.map(v => ({ ...v })),
        setMesh(v) { meshRange.value = String(v); meshOutput.textContent = `${v} mm`; },
        reset: () => resetBtn.click(),
        grainCount: () => grains.length,
    };

    buildGrains();
    resetBtn.click();
});
