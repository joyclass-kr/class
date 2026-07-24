/**
 * 주기율표 탐험가 (Periodic Table Explorer) App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        currentTab: 'explore',
        difficulty: 'all', // 'all', 'elem', 'mid'
        searchQuery: '',
        selectedCategory: 'all',
        selectedState: 'all',
        selectedElement: null,
        
        // Quiz state
        quiz: {
            score: 0,
            streak: 0,
            currentQuestion: null,
            answered: false
        },

        // Molecule lab state
        lab: {
            selectedElements: {}, // { number: count }
            unlockedCompounds: new Set()
        },

        // Animation state
        animFrameId: null,
        atomAngle: 0
    };

    // DOM Elements
    const elementsGrid = document.getElementById('elementsGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryBar = document.getElementById('categoryBar');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const bohrCanvas = document.getElementById('bohrAtomCanvas');
    const ctx = bohrCanvas ? bohrCanvas.getContext('2d') : null;

    // Initialize App
    initNavTabs();
    initCategoryBar();
    initGrid();
    initFilters();
    initModal();
    initQuiz();
    initLab();
    initTeacherMode();

    /**
     * Navigation Tabs setup
     */
    function initNavTabs() {
        const tabs = document.querySelectorAll('.nav-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                const targetPane = document.getElementById(`tab-${target}`);
                if (targetPane) targetPane.classList.add('active');

                state.currentTab = target;
                if (target === 'quiz' && !state.quiz.currentQuestion) {
                    loadNewQuestion();
                }
            });
        });
    }

    /**
     * Category Legend Chips setup
     */
    function initCategoryBar() {
        if (!categoryBar || !window.PERIODIC_CATEGORIES) return;

        let html = `<div class="cat-chip ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all" style="background: rgba(255,255,255,0.1); color: #fff;">전체 보기</div>`;
        for (const [key, cat] of Object.entries(window.PERIODIC_CATEGORIES)) {
            html += `<div class="cat-chip" data-cat="${key}" style="background: ${cat.bg}; border-color: ${cat.border}; color: ${cat.color};">${cat.name}</div>`;
        }
        categoryBar.innerHTML = html;

        categoryBar.addEventListener('click', (e) => {
            const chip = e.target.closest('.cat-chip');
            if (!chip) return;

            document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            state.selectedCategory = chip.dataset.cat;
            applyFilters();
        });
    }

    /**
     * Compute Grid position for standard 18-column Periodic Table layout
     */
    function getGridPosition(el) {
        const num = el.number;
        const group = el.group;
        const period = el.period;

        // Lanthanides (57 - 71) -> row 9, cols 4..18
        if (num >= 57 && num <= 71) {
            return { col: (num - 57) + 4, row: 9 };
        }
        // Actinides (89 - 103) -> row 10, cols 4..18
        if (num >= 89 && num <= 103) {
            return { col: (num - 89) + 4, row: 10 };
        }

        // Standard 1..7 periods
        return { col: group, row: period };
    }

    /**
     * Initialize Periodic Table Grid
     */
    function initGrid() {
        if (!elementsGrid || !window.ELEMENTS_DATA) return;

        elementsGrid.innerHTML = '';

        // Lanthanide & Actinide placeholders in main grid (Row 6 col 3 & Row 7 col 3)
        const lanthHold = document.createElement('div');
        lanthHold.className = 'lanthanide-placeholder';
        lanthHold.innerHTML = '57-71<br>란타넘족';
        lanthHold.style.gridColumn = '3';
        lanthHold.style.gridRow = '6';

        const actHold = document.createElement('div');
        actHold.className = 'actinide-placeholder';
        actHold.innerHTML = '89-103<br>악티늄족';
        actHold.style.gridColumn = '3';
        actHold.style.gridRow = '7';

        elementsGrid.appendChild(lanthHold);
        elementsGrid.appendChild(actHold);

        window.ELEMENTS_DATA.forEach(el => {
            const pos = getGridPosition(el);
            const cell = document.createElement('div');
            cell.className = 'element-cell';
            cell.dataset.number = el.number;
            cell.dataset.category = el.category;
            cell.dataset.state = el.state;
            cell.style.gridColumn = pos.col;
            cell.style.gridRow = pos.row;

            const catInfo = window.PERIODIC_CATEGORIES[el.category] || {};
            const stateIcon = el.state === 'gas' ? '☁️' : el.state === 'liquid' ? '💧' : el.state === 'solid' ? '🧱' : '⚛️';

            cell.innerHTML = `
                <div class="element-header">
                    <span class="element-number">${el.number}</span>
                    <span class="element-mass">${el.mass}</span>
                </div>
                <div class="element-symbol" style="color: ${catInfo.color || '#fff'}">${el.symbol}</div>
                <div class="element-name">${el.name}</div>
                <span class="state-indicator" title="상온 상태: ${el.state}">${stateIcon}</span>
            `;

            cell.addEventListener('click', () => openElementModal(el));
            elementsGrid.appendChild(cell);
        });
    }

    /**
     * Search and Filter Handler
     */
    function initFilters() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value.trim().toLowerCase();
                applyFilters();
            });
        }

        const stateBtns = document.querySelectorAll('.btn-filter[data-state]');
        stateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                stateBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.selectedState = btn.dataset.state;
                applyFilters();
            });
        });

        const diffBtns = document.querySelectorAll('.difficulty-btn');
        diffBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                diffBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.difficulty = btn.dataset.diff;
                applyFilters();
            });
        });
    }

    function applyFilters() {
        const cells = document.querySelectorAll('.element-cell');
        cells.forEach(cell => {
            const num = parseInt(cell.dataset.number, 10);
            const el = window.ELEMENTS_DATA.find(item => item.number === num);
            if (!el) return;

            let matchesSearch = true;
            if (state.searchQuery) {
                matchesSearch = el.name.toLowerCase().includes(state.searchQuery) ||
                                el.symbol.toLowerCase().includes(state.searchQuery) ||
                                el.enName.toLowerCase().includes(state.searchQuery) ||
                                String(el.number) === state.searchQuery;
            }

            let matchesCat = state.selectedCategory === 'all' || el.category === state.selectedCategory;
            let matchesState = state.selectedState === 'all' || el.state === state.selectedState;

            let matchesDiff = true;
            if (state.difficulty === 'elem') {
                matchesDiff = num <= 20; // 초등 기초 20개
            } else if (state.difficulty === 'mid') {
                matchesDiff = num <= 50; // 중등 50개
            }

            if (matchesSearch && matchesCat && matchesState && matchesDiff) {
                cell.classList.remove('filtered-out');
            } else {
                cell.classList.add('filtered-out');
            }
        });
    }

    /**
     * Modal Controller & Bohr Atom Orbit Animation
     */
    function initModal() {
        if (!modalOverlay || !closeModalBtn) return;

        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function openElementModal(el) {
        state.selectedElement = el;
        const cat = window.PERIODIC_CATEGORIES[el.category] || {};

        document.getElementById('modalZ').textContent = `N° ${el.number}`;
        document.getElementById('modalNameKo').textContent = el.name;
        document.getElementById('modalNameEn').textContent = el.enName;
        
        const badge = document.getElementById('modalCatBadge');
        badge.textContent = cat.name || el.category;
        badge.style.background = cat.bg || '#333';
        badge.style.color = cat.color || '#fff';
        badge.style.border = `1px solid ${cat.border || '#555'}`;

        document.getElementById('modalSymbol').textContent = el.symbol;
        document.getElementById('modalMass').textContent = el.mass;
        document.getElementById('modalState').textContent = el.state === 'gas' ? '기체 (Gas)' : el.state === 'liquid' ? '액체 (Liquid)' : el.state === 'solid' ? '고체 (Solid)' : '합성/미정';
        document.getElementById('modalGroupPeriod').textContent = `${el.group}족 / ${el.period}주기 (${el.block} 블록)`;
        document.getElementById('modalDiscovery').textContent = el.discovery || '선사 시대';

        document.getElementById('modalDesc').textContent = el.desc;
        document.getElementById('modalTrivia').textContent = el.trivia || '알려진 흥미로운 특성이 기록되어 있습니다.';

        const usesContainer = document.getElementById('modalUses');
        if (usesContainer && el.uses) {
            usesContainer.innerHTML = el.uses.map(u => `<span class="use-tag"># ${u}</span>`).join('');
        }

        modalOverlay.classList.add('active');
        startBohrAtomAnimation(el);
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        if (state.animFrameId) {
            cancelAnimationFrame(state.animFrameId);
            state.animFrameId = null;
        }
    }

    /**
     * Canvas Bohr Atom 2D Orbit Animation
     */
    function startBohrAtomAnimation(el) {
        if (!bohrCanvas || !ctx) return;

        const width = bohrCanvas.width = 240;
        const height = bohrCanvas.height = 240;
        const centerX = width / 2;
        const centerY = height / 2;
        const shells = el.shells || [1];

        function drawFrame() {
            ctx.clearRect(0, 0, width, height);

            // Draw Nucleus
            ctx.beginPath();
            ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
            ctx.fillStyle = '#38ef7d';
            ctx.shadowColor = '#38ef7d';
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#0b1320';
            ctx.font = 'bold 12px Pretendard, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(el.symbol, centerX, centerY);

            // Draw Shell orbits & Electrons
            state.atomAngle += 0.015;
            const maxRadius = 95;
            const baseRadius = 32;
            const radiusStep = (maxRadius - baseRadius) / Math.max(shells.length, 1);

            shells.forEach((electronCount, shellIdx) => {
                const r = baseRadius + (shellIdx * radiusStep);

                // Orbit path
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Electrons on orbit
                for (let i = 0; i < electronCount; i++) {
                    const angleOffset = (Math.PI * 2 / electronCount) * i;
                    const speedMultiplier = 1 - (shellIdx * 0.1);
                    const currentAngle = (state.atomAngle * speedMultiplier) + angleOffset;

                    const ex = centerX + r * Math.cos(currentAngle);
                    const ey = centerY + r * Math.sin(currentAngle);

                    ctx.beginPath();
                    ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
                    ctx.fillStyle = '#4bcffa';
                    ctx.shadowColor = '#4bcffa';
                    ctx.shadowBlur = 8;
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            state.animFrameId = requestAnimationFrame(drawFrame);
        }

        drawFrame();
    }

    /**
     * Quiz Engine
     */
    function initQuiz() {
        const nextBtn = document.getElementById('nextQuizBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', loadNewQuestion);
        }
    }

    function loadNewQuestion() {
        state.quiz.answered = false;
        const available = window.ELEMENTS_DATA.slice(0, state.difficulty === 'elem' ? 20 : state.difficulty === 'mid' ? 50 : 118);
        const correctEl = available[Math.floor(Math.random() * available.length)];

        // Select 3 random wrong options
        const wrongOpts = [];
        while (wrongOpts.length < 3) {
            const rand = available[Math.floor(Math.random() * available.length)];
            if (rand.number !== correctEl.number && !wrongOpts.includes(rand)) {
                wrongOpts.push(rand);
            }
        }

        const options = [correctEl, ...wrongOpts].sort(() => Math.random() - 0.5);
        state.quiz.currentQuestion = { correctEl, options };

        // Render Question
        const qText = document.getElementById('quizQuestionText');
        const qSub = document.getElementById('quizSubText');
        const optGrid = document.getElementById('quizOptionsGrid');

        const questionTypes = ['symbol', 'number', 'name'];
        const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

        if (qType === 'symbol') {
            qText.textContent = `원소 기호 『 ${correctEl.symbol} 』 의 한글 이름은 무엇일까요?`;
            qSub.textContent = `Atomic Number: ${correctEl.number}`;
        } else if (qType === 'number') {
            qText.textContent = `원자 번호 ${correctEl.number}번 원소는 무엇일까요?`;
            qSub.textContent = `분류: ${(window.PERIODIC_CATEGORIES[correctEl.category] || {}).name || ''}`;
        } else {
            qText.textContent = `『 ${correctEl.name} (${correctEl.enName}) 』 의 올바른 원소 기호는?`;
            qSub.textContent = `실생활 쓰임새: ${correctEl.uses ? correctEl.uses[0] : '화학 원소'}`;
        }

        optGrid.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = qType === 'name' ? opt.symbol : `${opt.name} (${opt.symbol})`;
            btn.addEventListener('click', () => checkAnswer(opt, btn));
            optGrid.appendChild(btn);
        });

        document.getElementById('quizResultMsg').textContent = '';
    }

    function checkAnswer(selectedOpt, btn) {
        if (state.quiz.answered) return;
        state.quiz.answered = true;

        const { correctEl } = state.quiz.currentQuestion;
        const isCorrect = selectedOpt.number === correctEl.number;
        const msg = document.getElementById('quizResultMsg');

        if (isCorrect) {
            btn.classList.add('correct');
            state.quiz.score += 10;
            state.quiz.streak += 1;
            msg.textContent = '🎉 정답입니다! (+10점)';
            msg.style.color = '#38ef7d';
        } else {
            btn.classList.add('wrong');
            state.quiz.streak = 0;
            msg.textContent = `❌ 아쉽네요! 정답은 ${correctEl.name} (${correctEl.symbol}) 입니다.`;
            msg.style.color = '#ff5e57';

            // Highlight correct button
            document.querySelectorAll('.quiz-opt-btn').forEach(b => {
                if (b.textContent.includes(correctEl.symbol) || b.textContent.includes(correctEl.name)) {
                    b.classList.add('correct');
                }
            });
        }

        document.getElementById('quizScore').textContent = state.quiz.score;
        document.getElementById('quizStreak').textContent = state.quiz.streak;
    }

    /**
     * Molecule Synthesis Laboratory Engine
     */
    function initLab() {
        const beaker = document.getElementById('labBeaker');
        const resetBtn = document.getElementById('resetLabBtn');
        const atomPalette = document.getElementById('atomPalette');

        if (!beaker || !atomPalette) return;

        // Render basic atom tokens palette (H, O, C, Na, Cl, N, Ca, Fe)
        const commonAtoms = [1, 6, 7, 8, 11, 17, 20, 26];
        atomPalette.innerHTML = '';

        commonAtoms.forEach(num => {
            const el = window.ELEMENTS_DATA.find(item => item.number === num);
            if (!el) return;

            const token = document.createElement('div');
            token.className = 'atom-token';
            token.textContent = el.symbol;
            token.title = `${el.name} (${el.symbol})`;

            token.addEventListener('click', () => {
                state.lab.selectedElements[num] = (state.lab.selectedElements[num] || 0) + 1;
                renderBeaker();
            });

            atomPalette.appendChild(token);
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                state.lab.selectedElements = {};
                renderBeaker();
            });
        }

        renderCompoundsList();
    }

    function renderBeaker() {
        const beaker = document.getElementById('labBeaker');
        const statusMsg = document.getElementById('labStatusMsg');
        if (!beaker) return;

        beaker.innerHTML = '';
        let totalCount = 0;

        for (const [num, count] of Object.entries(state.lab.selectedElements)) {
            const el = window.ELEMENTS_DATA.find(item => item.number === parseInt(num, 10));
            if (!el) continue;

            for (let i = 0; i < count; i++) {
                totalCount++;
                const token = document.createElement('div');
                token.className = 'atom-token';
                token.textContent = el.symbol;
                token.addEventListener('click', () => {
                    state.lab.selectedElements[num]--;
                    if (state.lab.selectedElements[num] <= 0) {
                        delete state.lab.selectedElements[num];
                    }
                    renderBeaker();
                });
                beaker.appendChild(token);
            }
        }

        if (totalCount === 0) {
            beaker.innerHTML = `<div style="color: #64748b; font-size: 14px; font-weight: 600;">아래의 원소 토큰을 클릭하여 비커에 담아보세요!</div>`;
        }

        // Check matching compound
        checkCompoundMatch();
    }

    function checkCompoundMatch() {
        const statusMsg = document.getElementById('labStatusMsg');
        if (!statusMsg || !window.COMPOUNDS_DATA) return;

        let matched = null;
        for (const comp of window.COMPOUNDS_DATA) {
            let isMatch = true;
            const required = comp.elements;

            // Check if selected matches required exactly
            const reqKeys = Object.keys(required);
            const selKeys = Object.keys(state.lab.selectedElements);

            if (reqKeys.length !== selKeys.length) {
                isMatch = false;
            } else {
                for (const num of reqKeys) {
                    if (state.lab.selectedElements[num] !== required[num]) {
                        isMatch = false;
                        break;
                    }
                }
            }

            if (isMatch) {
                matched = comp;
                break;
            }
        }

        if (matched) {
            statusMsg.innerHTML = `<div style="color: #38ef7d; font-weight: 800; font-size: 16px;">✨ [합성 성공] ${matched.icon} ${matched.name} (${matched.formula}) 이(가) 만들어졌습니다!</div>`;
            state.lab.unlockedCompounds.add(matched.formula);
            renderCompoundsList();
        } else {
            statusMsg.innerHTML = ``;
        }
    }

    function renderCompoundsList() {
        const list = document.getElementById('compoundsList');
        if (!list || !window.COMPOUNDS_DATA) return;

        list.innerHTML = '';
        window.COMPOUNDS_DATA.forEach(comp => {
            const isUnlocked = state.lab.unlockedCompounds.has(comp.formula);
            const card = document.createElement('div');
            card.className = 'compound-card';
            card.style.borderColor = isUnlocked ? '#38ef7d' : 'rgba(255,255,255,0.1)';

            card.innerHTML = `
                <div class="compound-header">
                    <span>${comp.icon} ${comp.name}</span>
                    <span class="compound-formula">${comp.formula}</span>
                </div>
                <div style="font-size: 12px; color: #94a3b8;">${comp.desc}</div>
            `;
            list.appendChild(card);
        });
    }

    /**
     * Teacher & Presentation Mode Handler
     */
    function initTeacherMode() {
        const toggleBtn = document.getElementById('togglePresentationBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('presentation-mode');
                toggleBtn.classList.toggle('active');
            });
        }
    }
});
