/**
 * 주기율표 (Periodic Table) App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        currentTab: 'explore',
        difficulty: 'elem', // Default to 'elem' (초급 필수 20종)
        searchQuery: '',
        selectedCategory: 'all',
        selectedState: 'all',
        selectedElement: null,
        
        // Quiz state
        quiz: {
            score: 0,
            streak: 0,
            currentQuestion: null,
            answered: false,
            autoTimer: null
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
    /**
     * Quiz Engine
     */
    function initQuiz() {
        const nextBtn = document.getElementById('nextQuizBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (state.quiz.autoTimer) clearTimeout(state.quiz.autoTimer);
                loadNewQuestion();
            });
        }

        const quizDiffBtns = document.querySelectorAll('.quiz-diff-btn');
        quizDiffBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                quizDiffBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Sync main difficulty too
                state.difficulty = btn.dataset.diff;
                document.querySelectorAll('.difficulty-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.diff === state.difficulty);
                });

                if (state.quiz.autoTimer) clearTimeout(state.quiz.autoTimer);
                loadNewQuestion();
            });
        });
    }

    function loadNewQuestion() {
        if (state.quiz.autoTimer) {
            clearTimeout(state.quiz.autoTimer);
            state.quiz.autoTimer = null;
        }

        state.quiz.answered = false;

        // Quiz Question Pool:
        // elem: 1~20 (기초 20종)
        // mid: 1~50 (주요 50종)
        // all: 1~92 (천연 원소 92종 - 100번대 인공 실습 원소는 무작위 출제에서 제외하여 실용성 극대화)
        const maxNum = state.difficulty === 'elem' ? 20 : state.difficulty === 'mid' ? 50 : 92;
        const available = window.ELEMENTS_DATA.slice(0, maxNum);
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
            qSub.textContent = `원자 번호: ${correctEl.number}번 | 분류: ${(window.PERIODIC_CATEGORIES[correctEl.category] || {}).name || ''}`;
        } else if (qType === 'number') {
            qText.textContent = `원자 번호 ${correctEl.number}번 원소는 무엇일까요?`;
            qSub.textContent = `상온 상태: ${correctEl.state === 'gas' ? '기체' : correctEl.state === 'liquid' ? '액체' : '고체'}`;
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
            msg.textContent = '🎉 정답입니다! (+10점)  ➔ 잠시 후 다음 문제로 자동 이동합니다.';
            msg.style.color = '#38ef7d';

            // Auto-advance after 1.2s on correct answer
            state.quiz.autoTimer = setTimeout(() => {
                loadNewQuestion();
            }, 1200);
        } else {
            btn.classList.add('wrong');
            state.quiz.streak = 0;
            msg.textContent = `❌ 아쉽네요! 정답은 ${correctEl.name} (${correctEl.symbol}) 입니다.  ➔ 잠시 후 다음 문제로 자동 이동합니다.`;
            msg.style.color = '#ff5e57';

            // Highlight correct button
            document.querySelectorAll('.quiz-opt-btn').forEach(b => {
                if (b.textContent.includes(correctEl.symbol) || b.textContent.includes(correctEl.name)) {
                    b.classList.add('correct');
                }
            });

            // Auto-advance after 2.0s on wrong answer
            state.quiz.autoTimer = setTimeout(() => {
                loadNewQuestion();
            }, 2000);
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
            token.dataset.atom = num;
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
        if (!beaker) return;

        let totalCount = 0;
        const currentElements = state.lab.selectedElements;
        for (const count of Object.values(currentElements)) {
            totalCount += count;
        }

        if (totalCount === 0) {
            beaker.innerHTML = `<div style="color: #64748b; font-size: 14px; font-weight: 600; text-align: center;">아래의 원소 토큰을 클릭하여 비커에 담아보세요!</div>`;
            checkCompoundMatch();
            return;
        }

        // Check if current mix matches a compound
        const matchedComp = getMatchingCompound();
        renderMoleculeSVG(beaker, matchedComp, currentElements);
        checkCompoundMatch();
    }

    function getMatchingCompound() {
        if (!window.COMPOUNDS_DATA) return null;
        for (const comp of window.COMPOUNDS_DATA) {
            const required = comp.elements;
            const reqKeys = Object.keys(required);
            const selKeys = Object.keys(state.lab.selectedElements);

            if (reqKeys.length !== selKeys.length) continue;
            let isMatch = true;
            for (const num of reqKeys) {
                if (state.lab.selectedElements[num] !== required[num]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) return comp;
        }
        return null;
    }

    /**
     * SVG 2D Molecule Visualizer with Chemical Bond Lines
     */
    function renderMoleculeSVG(container, compound, elementsMap) {
        const atomColors = {
            1: { bg: '#e2e8f0', stroke: '#94a3b8', text: '#0f172a', r: 14 },  // H (Smallest - 14px)
            6: { bg: '#334155', stroke: '#38ef7d', text: '#38ef7d', r: 23 },  // C (Medium Carbon - 23px)
            7: { bg: '#2563eb', stroke: '#60a5fa', text: '#ffffff', r: 22 },  // N (Medium Nitrogen - 22px)
            8: { bg: '#ef4444', stroke: '#fca5a5', text: '#ffffff', r: 21 },  // O (Medium Oxygen - 21px)
            11: { bg: '#f59e0b', stroke: '#fcd34d', text: '#000000', r: 28 }, // Na (Large Sodium - 28px)
            17: { bg: '#10b981', stroke: '#6ee7b7', text: '#ffffff', r: 28 }, // Cl (Large Chlorine - 28px)
            20: { bg: '#eab308', stroke: '#fef08a', text: '#000000', r: 31 }, // Ca (Very Large Calcium - 31px)
            26: { bg: '#ef5777', stroke: '#f53b57', text: '#ffffff', r: 29 }  // Fe (Large Iron - 29px)
        };

        let nodes = [];
        let bonds = []; // { x1, y1, x2, y2, type: 'single' | 'double' | 'ionic' }

        const formula = compound ? compound.formula : null;

        if (formula === 'H₂O') {
            nodes = [
                { id: 'O1', num: 8, sym: 'O', x: 0, y: -18, z: 0 },
                { id: 'H1', num: 1, sym: 'H', x: -50, y: 26, z: 15 },
                { id: 'H2', num: 1, sym: 'H', x: 50, y: 26, z: -15 }
            ];
            bonds = [
                { x1: 0, y1: -18, z1: 0, x2: -50, y2: 26, z2: 15, type: 'single' },
                { x1: 0, y1: -18, z1: 0, x2: 50, y2: 26, z2: -15, type: 'single' }
            ];
        } else if (formula === 'CO₂') {
            nodes = [
                { id: 'C1', num: 6, sym: 'C', x: 0, y: 0, z: 0 },
                { id: 'O1', num: 8, sym: 'O', x: -70, y: 0, z: 0 },
                { id: 'O2', num: 8, sym: 'O', x: 70, y: 0, z: 0 }
            ];
            bonds = [
                { x1: -70, y1: 0, z1: 0, x2: 0, y2: 0, z2: 0, type: 'double' },
                { x1: 0, y1: 0, z1: 0, x2: 70, y2: 0, z2: 0, type: 'double' }
            ];
        } else if (formula === 'NaCl') {
            nodes = [
                { id: 'Na1', num: 11, sym: 'Na', x: -45, y: 0, z: 0, charge: '+' },
                { id: 'Cl1', num: 17, sym: 'Cl', x: 45, y: 0, z: 0, charge: '-' }
            ];
            bonds = [
                { x1: -45, y1: 0, z1: 0, x2: 45, y2: 0, z2: 0, type: 'ionic' }
            ];
        } else if (formula === 'CH₄') {
            // Methane: Exact 109.5° Tetrahedral 3D Geometry & Wedge-Dash Chemical Projection
            nodes = [
                { id: 'C1', num: 6, sym: 'C', x: 0, y: 5, z: 0 },
                { id: 'H1', num: 1, sym: 'H', x: 0, y: -58, z: 0 },          // Top In-Plane
                { id: 'H2', num: 1, sym: 'H', x: -56, y: -5, z: 0 },         // Left In-Plane
                { id: 'H3', num: 1, sym: 'H', x: 42, y: 46, z: 45 },         // Solid Wedge (Front)
                { id: 'H4', num: 1, sym: 'H', x: -36, y: 54, z: -45 }        // Dashed Wedge (Back)
            ];
            bonds = [
                { x1: 0, y1: 5, z1: 0, x2: 0, y2: -58, z2: 0, type: 'single' },
                { x1: 0, y1: 5, z1: 0, x2: -56, y2: -5, z2: 0, type: 'single' },
                { x1: 0, y1: 5, z1: 0, x2: 42, y2: 46, z2: 45, type: 'solid-wedge' },   // 쐐기형 튀어나온 결합
                { x1: 0, y1: 5, z1: 0, x2: -36, y2: 54, z2: -45, type: 'dash-wedge' }   // 점선형 들어간 결합
            ];
        } else if (formula === 'NH₃') {
            // Ammonia: Trigonal Pyramid 3D Projection
            nodes = [
                { id: 'N1', num: 7, sym: 'N', x: 0, y: -22, z: 0 },
                { id: 'H1', num: 1, sym: 'H', x: 0, y: 46, z: -10 },
                { id: 'H2', num: 1, sym: 'H', x: -52, y: 28, z: 40 },        // Solid Wedge
                { id: 'H3', num: 1, sym: 'H', x: 52, y: 28, z: -40 }         // Dash Wedge
            ];
            bonds = [
                { x1: 0, y1: -22, z1: 0, x2: 0, y2: 46, z2: -10, type: 'single' },
                { x1: 0, y1: -22, z1: 0, x2: -52, y2: 28, z2: 40, type: 'solid-wedge' },
                { x1: 0, y1: -22, z1: 0, x2: 52, y2: 28, z2: -40, type: 'dash-wedge' }
            ];
        } else if (formula === 'H₂O₂') {
            nodes = [
                { id: 'O1', num: 8, sym: 'O', x: -28, y: -10, z: 0 },
                { id: 'O2', num: 8, sym: 'O', x: 28, y: -10, z: 0 },
                { id: 'H1', num: 1, sym: 'H', x: -72, y: 22, z: 30 },
                { id: 'H2', num: 1, sym: 'H', x: 72, y: 22, z: -30 }
            ];
            bonds = [
                { x1: -72, y1: 22, z1: 30, x2: -28, y2: -10, z2: 0, type: 'solid-wedge' },
                { x1: -28, y1: -10, z1: 0, x2: 28, y2: -10, z2: 0, type: 'single' },
                { x1: 28, y1: -10, z1: 0, x2: 72, y2: 22, z2: -30, type: 'dash-wedge' }
            ];
        } else if (formula === 'C₂H₆O') {
            nodes = [
                { id: 'C1', num: 6, sym: 'C', x: -50, y: 0, z: 0 },
                { id: 'C2', num: 6, sym: 'C', x: 10, y: 0, z: 0 },
                { id: 'O1', num: 8, sym: 'O', x: 70, y: 0, z: 0 },
                { id: 'H1', num: 1, sym: 'H', x: -50, y: -50, z: 0 },
                { id: 'H2', num: 1, sym: 'H', x: -50, y: 50, z: 0 },
                { id: 'H3', num: 1, sym: 'H', x: -95, y: 0, z: 0 },
                { id: 'H4', num: 1, sym: 'H', x: 10, y: -50, z: 0 },
                { id: 'H5', num: 1, sym: 'H', x: 10, y: 50, z: 0 },
                { id: 'H6', num: 1, sym: 'H', x: 112, y: 25, z: 0 }
            ];
            bonds = [
                { x1: -95, y1: 0, z1: 0, x2: -50, y2: 0, z2: 0, type: 'single' },
                { x1: -50, y1: -50, z1: 0, x2: -50, y2: 0, z2: 0, type: 'single' },
                { x1: -50, y1: 50, z1: 0, x2: -50, y2: 0, z2: 0, type: 'single' },
                { x1: -50, y1: 0, z1: 0, x2: 10, y2: 0, z2: 0, type: 'single' },
                { x1: 10, y1: -50, z1: 0, x2: 10, y2: 0, z2: 0, type: 'single' },
                { x1: 10, y1: 50, z1: 0, x2: 10, y2: 0, z2: 0, type: 'single' },
                { x1: 10, y1: 0, z1: 0, x2: 70, y2: 0, z2: 0, type: 'single' },
                { x1: 70, y1: 0, z1: 0, x2: 112, y2: 25, z2: 0, type: 'single' }
            ];
        } else if (formula === 'CaCO₃') {
            nodes = [
                { id: 'Ca1', num: 20, sym: 'Ca', x: -80, y: 0, z: 0, charge: '2+' },
                { id: 'C1', num: 6, sym: 'C', x: 20, y: 0, z: 0 },
                { id: 'O1', num: 8, sym: 'O', x: 20, y: -52, z: 0 },
                { id: 'O2', num: 8, sym: 'O', x: -18, y: 35, z: 0 },
                { id: 'O3', num: 8, sym: 'O', x: 58, y: 35, z: 0 }
            ];
            bonds = [
                { x1: -80, y1: 0, z1: 0, x2: -18, y2: 35, z2: 0, type: 'ionic' },
                { x1: 20, y1: 0, z1: 0, x2: 20, y2: -52, z2: 0, type: 'double' },
                { x1: 20, y1: 0, z1: 0, x2: -18, y2: 35, z2: 0, type: 'single' },
                { x1: 20, y1: 0, z1: 0, x2: 58, y2: 35, z2: 0, type: 'single' }
            ];
        } else if (formula === 'Fe₂O₃') {
            nodes = [
                { id: 'Fe1', num: 26, sym: 'Fe', x: -50, y: -20, z: 0, charge: '3+' },
                { id: 'Fe2', num: 26, sym: 'Fe', x: 50, y: -20, z: 0, charge: '3+' },
                { id: 'O1', num: 8, sym: 'O', x: 0, y: -52, z: 0, charge: '2-' },
                { id: 'O2', num: 8, sym: 'O', x: -50, y: 35, z: 0, charge: '2-' },
                { id: 'O3', num: 8, sym: 'O', x: 50, y: 35, z: 0, charge: '2-' }
            ];
            bonds = [
                { x1: -50, y1: -20, z1: 0, x2: 0, y2: -52, z2: 0, type: 'ionic' },
                { x1: 50, y1: -20, z1: 0, x2: 0, y2: -52, z2: 0, type: 'ionic' },
                { x1: -50, y1: -20, z1: 0, x2: -50, y2: 35, z2: 0, type: 'ionic' },
                { x1: 50, y1: -20, z1: 0, x2: 50, y2: 35, z2: 0, type: 'ionic' }
            ];
        } else {
            // Unmatched Mixture: Dynamic ring layout
            const atomList = [];
            for (const [numStr, count] of Object.entries(elementsMap)) {
                const num = parseInt(numStr, 10);
                const el = window.ELEMENTS_DATA.find(item => item.number === num);
                if (!el) continue;
                for (let i = 0; i < count; i++) {
                    atomList.push({ num, sym: el.symbol });
                }
            }

            const total = atomList.length;
            const radius = Math.min(110, 35 + total * 12);

            atomList.forEach((at, idx) => {
                const angle = (Math.PI * 2 / total) * idx - Math.PI / 2;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                nodes.push({ id: `unmatched_${idx}`, num: at.num, sym: at.sym, x, y, z: 0 });

                if (idx > 0) {
                    const prevNode = nodes[idx - 1];
                    bonds.push({ x1: prevNode.x, y1: prevNode.y, z1: 0, x2: x, y2: y, z2: 0, type: 'single' });
                }
            });
            if (total > 2) {
                bonds.push({ x1: nodes[total - 1].x, y1: nodes[total - 1].y, z1: 0, x2: nodes[0].x, y2: nodes[0].y, z2: 0, type: 'single' });
            }
        }

        // Generate SVG Markup with linearGradients for Wedge 3D bonds
        let svgHtml = `
            <svg class="molecule-svg-canvas" viewBox="-160 -100 320 200">
                <defs>
                    <linearGradient id="solidWedgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#38ef7d" stop-opacity="0.2" />
                        <stop offset="100%" stop-color="#38ef7d" stop-opacity="0.95" />
                    </linearGradient>
                </defs>
        `;

        // Render Bonds (Wedge, Dash, Double, Ionic, Single)
        bonds.forEach(b => {
            if (b.type === 'solid-wedge') {
                // Chemical Solid Wedge Bond (▲ 튀어나온 결합)
                const dx = b.x2 - b.x1;
                const dy = b.y2 - b.y1;
                const len = Math.hypot(dx, dy) || 1;
                const nx = (-dy / len) * 8;
                const ny = (dx / len) * 8;
                
                // Polygon triangle from origin atom to wider target atom
                const points = `${b.x1},${b.y1} ${b.x2 + nx},${b.y2 + ny} ${b.x2 - nx},${b.y2 - ny}`;
                svgHtml += `<polygon points="${points}" class="bond-wedge-solid" />`;
            } else if (b.type === 'dash-wedge') {
                // Chemical Dashed Wedge Bond (▨ 들어간 결합)
                const steps = 6;
                svgHtml += `<g class="bond-wedge-dashed">`;
                for (let i = 1; i <= steps; i++) {
                    const t1 = i / steps;
                    const px = b.x1 + (b.x2 - b.x1) * t1;
                    const py = b.y1 + (b.y2 - b.y1) * t1;
                    const width = (i / steps) * 10;
                    
                    const dx = b.x2 - b.x1;
                    const dy = b.y2 - b.y1;
                    const len = Math.hypot(dx, dy) || 1;
                    const nx = (-dy / len) * (width / 2);
                    const ny = (dx / len) * (width / 2);

                    svgHtml += `<line x1="${px - nx}" y1="${py - ny}" x2="${px + nx}" y2="${py + ny}" />`;
                }
                svgHtml += `</g>`;
            } else if (b.type === 'double') {
                const dx = b.x2 - b.x1;
                const dy = b.y2 - b.y1;
                const len = Math.hypot(dx, dy) || 1;
                const nx = (-dy / len) * 4.5;
                const ny = (dx / len) * 4.5;

                svgHtml += `
                    <g class="bond-double-group">
                        <line x1="${b.x1 + nx}" y1="${b.y1 + ny}" x2="${b.x2 + nx}" y2="${b.y2 + ny}" class="bond-double"/>
                        <line x1="${b.x1 - nx}" y1="${b.y1 - ny}" x2="${b.x2 - nx}" y2="${b.y2 - ny}" class="bond-double"/>
                    </g>
                `;
            } else if (b.type === 'ionic') {
                svgHtml += `<line x1="${b.x1}" y1="${b.y1}" x2="${b.x2}" y2="${b.y2}" class="bond-ionic"/>`;
            } else {
                svgHtml += `<line x1="${b.x1}" y1="${b.y1}" x2="${b.x2}" y2="${b.y2}" class="bond-single"/>`;
            }
        });

        // Sort nodes by Z depth so back atoms render behind front atoms
        const sortedNodes = [...nodes].sort((a, b) => (a.z || 0) - (b.z || 0));

        // Render Atom Nodes
        sortedNodes.forEach(nd => {
            const style = atomColors[nd.num] || { bg: '#38ef7d', stroke: '#ffffff', text: '#000', r: 22 };

            // Depth scale effect for 3D perspective projection
            const zOffset = nd.z || 0;
            const zScale = 1 + (zOffset / 200);
            const rScaled = Math.round(style.r * zScale);

            svgHtml += `
                <g class="atom-svg-group" data-num="${nd.num}" transform="translate(${nd.x}, ${nd.y})">
                    <circle r="${rScaled}" fill="${style.bg}" stroke="${style.stroke}" stroke-width="2.5" />
                    <text text-anchor="middle" dy="5" fill="${style.text}" font-size="${Math.round(14 * zScale)}" font-weight="900" font-family="Pretendard, sans-serif">${nd.sym}</text>
                    ${nd.charge ? `<text text-anchor="middle" dx="14" dy="-10" fill="#ffd18a" font-size="11" font-weight="900">${nd.charge}</text>` : ''}
                </g>
            `;
        });

        svgHtml += `</svg>`;
        container.innerHTML = svgHtml;

        // Attach click handlers to SVG atom nodes to allow removing atoms
        container.querySelectorAll('.atom-svg-group').forEach(group => {
            group.addEventListener('click', (e) => {
                e.stopPropagation();
                const num = parseInt(group.dataset.num, 10);
                if (state.lab.selectedElements[num]) {
                    state.lab.selectedElements[num]--;
                    if (state.lab.selectedElements[num] <= 0) {
                        delete state.lab.selectedElements[num];
                    }
                    renderBeaker();
                }
            });
        });
    }

    function checkCompoundMatch() {
        const statusMsg = document.getElementById('labStatusMsg');
        if (!statusMsg || !window.COMPOUNDS_DATA) return;

        const matched = getMatchingCompound();
        if (matched) {
            statusMsg.innerHTML = `<div style="color: #38ef7d; font-weight: 800; font-size: 16px; animation: fadeIn 0.3s ease;">✨ [합성 성공] ${matched.icon} ${matched.name} (${matched.formula}) 이(가) 완성되었습니다!</div>`;
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
