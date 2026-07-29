/**
 * 시험 대비 단주기 주기율표 (Elements 1-20) App Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        currentTab: 'explore',
        searchQuery: '',
        selectedCategory: 'all',
        selectedState: 'all',
        selectedElement: null,
        memorizeHidden: false,
        tableMode: 'exam',
        
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
    const EXAM_MAX_ATOMIC_NUMBER = 20;

    // Initialize App
    initNavTabs();
    initCategoryBar();
    initGrid();
    initFilters();
    initModal();
    initQuiz();
    initLab();
    initTeacherMode();

    function getExamElements() {
        return window.ELEMENTS_DATA.filter(el => el.number <= EXAM_MAX_ATOMIC_NUMBER);
    }

    function getVisibleElements() {
        return state.tableMode === 'exam' ? getExamElements() : window.ELEMENTS_DATA;
    }

    function getShortGroup(group) {
        if (group <= 2) return group;
        return group - 10;
    }

    function isExamCompound(compound) {
        return Object.keys(compound.elements).every(number => Number(number) <= EXAM_MAX_ATOMIC_NUMBER);
    }

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

        renderCategoryBar();

        categoryBar.addEventListener('click', (e) => {
            const chip = e.target.closest('.cat-chip');
            if (!chip) return;

            categoryBar.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            state.selectedCategory = chip.dataset.cat;
            applyFilters();
        });
    }

    function renderCategoryBar() {
        const visibleCategories = new Set(getVisibleElements().map(el => el.category));
        const allLabel = state.tableMode === 'exam' ? '시험 범위 전체' : '118개 전체';
        let html = `<div class="cat-chip ${state.selectedCategory === 'all' ? 'active' : ''}" data-cat="all" style="background: rgba(255,255,255,0.1); color: #fff;">${allLabel}</div>`;
        for (const [key, cat] of Object.entries(window.PERIODIC_CATEGORIES).filter(([key]) => visibleCategories.has(key))) {
            html += `<div class="cat-chip" data-cat="${key}" style="background: ${cat.bg}; border-color: ${cat.border}; color: ${cat.color};">${cat.name}</div>`;
        }
        categoryBar.innerHTML = html;
    }

    /**
     * Compute positions for short-form and full periodic tables.
     */
    function getShortGridPosition(el) {
        return { col: getShortGroup(el.group) + 1, row: el.period + 1 };
    }

    function getFullGridPosition(el) {
        if (el.number >= 57 && el.number <= 71) {
            return { col: (el.number - 57) + 4, row: 9 };
        }
        if (el.number >= 89 && el.number <= 103) {
            return { col: (el.number - 89) + 4, row: 10 };
        }
        return { col: el.group, row: el.period };
    }

    /**
     * Initialize Periodic Table Grid
     */
    function initGrid() {
        if (!elementsGrid || !window.ELEMENTS_DATA) return;

        elementsGrid.innerHTML = '';
        elementsGrid.classList.toggle('short-table', state.tableMode === 'exam');
        elementsGrid.classList.toggle('full-table', state.tableMode === 'full');
        elementsGrid.classList.toggle('memorize-mode', state.memorizeHidden);

        if (state.tableMode === 'exam') {
            for (let group = 1; group <= 8; group += 1) {
                const label = document.createElement('div');
                label.className = 'axis-label group-label';
                label.textContent = `${group}족`;
                label.style.gridColumn = String(group + 1);
                label.style.gridRow = '1';
                elementsGrid.appendChild(label);
            }

            for (let period = 1; period <= 4; period += 1) {
                const label = document.createElement('div');
                label.className = 'axis-label period-label';
                label.textContent = `${period}주기`;
                label.style.gridColumn = '1';
                label.style.gridRow = String(period + 1);
                elementsGrid.appendChild(label);
            }
        } else {
            const lanthanideLabel = document.createElement('div');
            lanthanideLabel.className = 'series-placeholder';
            lanthanideLabel.innerHTML = '57–71<br>란타넘족';
            lanthanideLabel.style.gridColumn = '3';
            lanthanideLabel.style.gridRow = '6';
            elementsGrid.appendChild(lanthanideLabel);

            const actinideLabel = document.createElement('div');
            actinideLabel.className = 'series-placeholder';
            actinideLabel.innerHTML = '89–103<br>악티늄족';
            actinideLabel.style.gridColumn = '3';
            actinideLabel.style.gridRow = '7';
            elementsGrid.appendChild(actinideLabel);
        }

        getVisibleElements().forEach(el => {
            const pos = state.tableMode === 'exam' ? getShortGridPosition(el) : getFullGridPosition(el);
            const cell = document.createElement('button');
            cell.type = 'button';
            cell.className = 'element-cell';
            cell.dataset.number = el.number;
            cell.dataset.category = el.category;
            cell.dataset.state = el.state;
            cell.style.gridColumn = pos.col;
            cell.style.gridRow = pos.row;
            cell.setAttribute('aria-label', `${el.number}번 ${el.name}, 원소 기호 ${el.symbol}`);

            const catInfo = window.PERIODIC_CATEGORIES[el.category] || {};
            const stateIcon = el.state === 'gas' ? '☁️' : el.state === 'liquid' ? '💧' : el.state === 'solid' ? '🧱' : '⚛️';

            cell.innerHTML = `
                <div class="element-header">
                    <span class="element-number">${el.number}</span>
                    <span class="element-mass">${el.mass}</span>
                </div>
                <div class="element-symbol" style="color: ${catInfo.color || '#fff'}">${el.symbol}</div>
                <div class="element-name">${el.name}</div>
                <div class="element-shells" title="전자 배치">${el.shells.join(' · ')}</div>
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
        const tableModeBtns = document.querySelectorAll('.table-mode-btn');
        tableModeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextMode = btn.dataset.tableMode;
                if (nextMode === state.tableMode) return;

                state.tableMode = nextMode;
                state.searchQuery = '';
                state.selectedCategory = 'all';
                state.selectedState = 'all';
                searchInput.value = '';

                tableModeBtns.forEach(modeBtn => {
                    const isActive = modeBtn.dataset.tableMode === state.tableMode;
                    modeBtn.classList.toggle('active', isActive);
                    modeBtn.setAttribute('aria-pressed', String(isActive));
                });
                document.querySelectorAll('.btn-filter[data-state]').forEach(stateBtn => {
                    stateBtn.classList.toggle('active', stateBtn.dataset.state === 'all');
                });

                updateTableModeUI();
                renderCategoryBar();
                initGrid();
            });
        });

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

        const memorizeBtn = document.getElementById('toggleMemorizeBtn');
        if (memorizeBtn) {
            memorizeBtn.addEventListener('click', () => {
                state.memorizeHidden = !state.memorizeHidden;
                elementsGrid.classList.toggle('memorize-mode', state.memorizeHidden);
                memorizeBtn.classList.toggle('active', state.memorizeHidden);
                memorizeBtn.setAttribute('aria-pressed', String(state.memorizeHidden));
                memorizeBtn.textContent = state.memorizeHidden ? '👀 이름 다시 보기' : '🙈 이름 가리고 외우기';
            });
        }
    }

    function updateTableModeUI() {
        const isExam = state.tableMode === 'exam';
        document.body.dataset.tableMode = state.tableMode;
        document.title = isExam
            ? '단주기 주기율표 | songhwaplay 교과학습'
            : '실제 주기율표 | songhwaplay 교과학습';

        document.getElementById('appTitleText').textContent = isExam ? '단주기 주기율표' : '실제 주기율표';
        document.getElementById('appTitleBadge').textContent = isExam ? '시험 대비 · 1~20' : '전체 원소 · 1~118';
        document.getElementById('tabExploreLabel').textContent = isExam ? '단주기표' : '실제 주기율표';
        document.getElementById('tableModeKicker').textContent = isExam ? '시험 범위만 한눈에' : '전체 원소를 한눈에';
        document.getElementById('examFocusTitle').textContent = isExam
            ? '원자번호 1번 수소부터 20번 칼슘까지'
            : '1번 수소부터 118번 오가네손까지';
        document.getElementById('examFocusDescription').textContent = isExam
            ? '원소 기호·이름·원자번호와 전자 배치, 족과 주기를 연결해서 외워 보세요.'
            : '현재 표준 18족 배열과 란타넘족·악티늄족을 포함한 전체 주기율표입니다.';
        document.getElementById('elementCountStat').textContent = isExam ? '20' : '118';
        document.getElementById('elementCountLabel').textContent = isExam ? '필수 원소' : '전체 원소';
        document.getElementById('groupCountStat').textContent = isExam ? '8' : '18';
        document.getElementById('periodCountStat').textContent = isExam ? '4' : '7';
        document.getElementById('guidePeriod').innerHTML = isExam ? '<b>가로</b>는 주기' : '<b>7개</b> 주기';
        document.getElementById('guideGroup').innerHTML = isExam ? '<b>세로</b>는 족' : '<b>18개</b> 족';
        document.getElementById('guideDetail').innerHTML = isExam
            ? '<b>전자 배치</b>는 아래 숫자로 확인'
            : '<b>아래 두 줄</b>은 란타넘족·악티늄족';

        searchInput.placeholder = isExam
            ? '이름, 기호(H, Na), 원자번호(1~20) 검색'
            : '이름, 기호(Fe, Au), 원자번호(1~118) 검색';
        searchInput.setAttribute('aria-label', isExam ? '시험 범위 원소 검색' : '전체 원소 검색');
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

            if (matchesSearch && matchesCat && matchesState) {
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
        document.getElementById('modalGroupPeriod').textContent = state.tableMode === 'exam'
            ? `${getShortGroup(el.group)}족 / ${el.period}주기`
            : `${el.group}족 / ${el.period}주기 (${el.block} 블록)`;
        document.getElementById('modalShells').textContent = el.shells.join(' - ');
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

    }

    function loadNewQuestion() {
        if (state.quiz.autoTimer) {
            clearTimeout(state.quiz.autoTimer);
            state.quiz.autoTimer = null;
        }

        state.quiz.answered = false;

        // Every question stays inside the exam scope: elements 1 through 20.
        const available = getExamElements();
        const correctEl = available[Math.floor(Math.random() * available.length)];

        // Select 3 wrong options from the same difficulty pool
        const wrongOpts = [];
        while (wrongOpts.length < 3) {
            const rand = available[Math.floor(Math.random() * available.length)];
            if (rand.number !== correctEl.number && !wrongOpts.includes(rand)) {
                wrongOpts.push(rand);
            }
        }

        const options = [correctEl, ...wrongOpts].sort(() => Math.random() - 0.5);
        state.quiz.currentQuestion = { correctEl, options };

        // Render short-form periodic table exam questions.
        const qText = document.getElementById('quizQuestionText');
        const qSub = document.getElementById('quizSubText');
        const optGrid = document.getElementById('quizOptionsGrid');

        const qTypes = ['symbol_name', 'name_symbol', 'atomic_number', 'electron_arrangement', 'position'];
        const chosenType = qTypes[Math.floor(Math.random() * qTypes.length)];

        let optionLabel = opt => opt.name;

        if (chosenType === 'symbol_name') {
            qText.textContent = `원소 기호 『 ${correctEl.symbol} 』 의 올바른 한글 원소 이름은?`;
            qSub.textContent = '기호의 첫 글자는 대문자, 두 번째 글자는 소문자입니다.';
        } else if (chosenType === 'name_symbol') {
            qText.textContent = `『 ${correctEl.name} 』의 올바른 원소 기호는?`;
            qSub.textContent = '시험 필수 원소 1~20번에서 고르세요.';
            optionLabel = opt => opt.symbol;
        } else if (chosenType === 'atomic_number') {
            qText.textContent = `『 ${correctEl.name} (${correctEl.symbol}) 』의 원자번호는?`;
            qSub.textContent = '원자번호는 원자핵 속 양성자 수와 같습니다.';
            optionLabel = opt => `${opt.number}번`;
        } else if (chosenType === 'electron_arrangement') {
            qText.textContent = `『 ${correctEl.name} (${correctEl.symbol}) 』의 전자 배치는?`;
            qSub.textContent = '안쪽 전자 껍질부터 차례대로 고르세요.';
            optionLabel = opt => opt.shells.join(' - ');
        } else {
            qText.textContent = `단주기표에서 『 ${correctEl.name} (${correctEl.symbol}) 』의 위치는?`;
            qSub.textContent = '가로줄은 주기, 세로줄은 족입니다.';
            optionLabel = opt => `${getShortGroup(opt.group)}족 · ${opt.period}주기`;
        }

        optGrid.innerHTML = '';
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.dataset.number = String(opt.number);
            btn.textContent = optionLabel(opt);
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
                if (Number(b.dataset.number) === correctEl.number) {
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

        // Keep the molecule lab inside the same 1-20 exam scope.
        const commonAtoms = [1, 6, 7, 8, 11, 17, 20];
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
        for (const comp of window.COMPOUNDS_DATA.filter(isExamCompound)) {
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
            20: { bg: '#eab308', stroke: '#fef08a', text: '#000000', r: 31 } // Ca (Very Large Calcium - 31px)
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
        window.COMPOUNDS_DATA.filter(isExamCompound).forEach(comp => {
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
