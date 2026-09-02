/**
 * 2022 개정 인체 생명과학 전 단원 실전 진단평가 & 100점 챌린지 엔진
 */

(function () {
    'use strict';

    var questions = [
        {
            topic: '소화계',
            moduleUrl: '../digestion/',
            q: '소장에서 3대 영양소(탄수화물, 단백질, 지방)를 모두 최종 분해할 수 있는 소화 효소(아밀레이스, 트립신, 라이페이스)를 분비하는 핵심 기관은?',
            opts: ['위 (Stomach)', '간 (Liver)', '이자 (Pancreas)', '쓸개 (Gallbladder)'],
            ans: 2,
            exp: '이자는 3대 영양소를 모두 분해하는 소화효소(아밀레이스, 트립신, 라이페이스)가 포함된 이자액을 십이지장으로 분비합니다.'
        },
        {
            topic: '소화계 (흡수)',
            moduleUrl: '../digestion/',
            q: '소장 융털에서 물에 녹지 않는 지용성 영양소(지방산, 모노글리세리드, 비타민 A,D,E,K)가 흡수되는 경로는?',
            opts: ['융털의 모세혈관 → 간정맥', '융털의 암죽관 → 림프관 → 가슴관', '식도 점막 → 위정맥', '대장 점막 → 간문맥'],
            ans: 1,
            exp: '포도당/아미노산 등 수용성은 모세혈관으로, 지방산/지용성 비타민은 융털 중심의 암죽관(림프관)으로 흡수됩니다.'
        },
        {
            topic: '순환계 (심장)',
            moduleUrl: '../circulation/',
            q: '심장의 4개 방실 중 온몸 구석구석으로 혈액을 강하게 뿜어내기 위해 근육벽이 가장 두껍고 탄력적인 곳은?',
            opts: ['우심방', '우심실', '좌심방', '좌심실'],
            ans: 3,
            exp: '좌심실은 대동맥을 통해 온몸 순환(체순환)으로 혈액을 보내야 하므로 폐로 보내는 우심실보다 근육벽이 약 3배 두껍습니다.'
        },
        {
            topic: '순환계 (혈관)',
            moduleUrl: '../circulation/',
            q: '폐에서 산소를 가득 채우고 좌심방으로 들어오는 혈관의 이름과 그 속에 흐르는 혈액의 종류로 옳은 것은?',
            opts: ['폐동맥 - 동맥혈', '폐동맥 - 정맥혈', '폐정맥 - 동맥혈', '폐정맥 - 정맥혈'],
            ans: 2,
            exp: '폐에서 기체 교환을 마친 맑고 산소가 풍부한 동맥혈은 "폐정맥"을 통해 좌심방으로 유입됩니다.'
        },
        {
            topic: '호흡계 (원리)',
            moduleUrl: '../respiration/',
            q: '숨을 들이마실 때(들숨, 흡기) 우리 몸속에서 일어나는 물리적 변화로 옳은 것은?',
            opts: [
                '가로막이 위로 올라가 흉강 부피가 작아진다.',
                '가로막이 아래로 내려가고 흉강 내압이 대기압보다 낮아져 공기가 유입된다.',
                '폐 근육이 스스로 힘을 주어 팽창한다.',
                '갈비뼈가 내려가고 폐 내부 압력이 높아진다.'
            ],
            ans: 1,
            exp: '폐에는 스스로 움직이는 근육이 없습니다. 가로막이 하강하고 갈비뼈가 상승하여 흉강 부피가 커지면, 보일 법칙에 의해 내부 압력이 대기압보다 낮아져 공기가 밀려 들어옵니다.'
        },
        {
            topic: '배설계 (여과)',
            moduleUrl: '../excretion/',
            q: '콩팥의 네프론에서 사구체의 높은 혈압으로 보먼주머니로 여과될 때, 분자 크기가 커서 여과되지 않는 물질은?',
            opts: ['물, 포도당', '단백질, 혈구', '요소, 무기염류', '아미노산, 비타민'],
            ans: 1,
            exp: '단백질과 혈구는 분자량이 커서 사구체 모세혈관 벽을 통과하지 못합니다. 오줌에서 단백질/혈구가 나오면 신장 이상입니다.'
        },
        {
            topic: '배설계 (재흡수)',
            moduleUrl: '../excretion/',
            q: '원뇨에는 포함되어 있지만, 세뇨관을 지나며 모세혈관으로 100% 능동수송 재흡수되어 정상인의 오줌에서는 전혀 검출되지 않는 물질은?',
            opts: ['요소 (Urea)', '포도당 (Glucose)', '무기염류', '수분'],
            ans: 1,
            exp: '포도당과 아미노산은 인체의 핵심 에너지원이므로 세뇨관에서 100% 재흡수됩니다. 요소는 물이 재흡수되어 오줌에서 약 67배 농축됩니다.'
        },
        {
            topic: '신경계 (반응)',
            moduleUrl: '../nervous/',
            q: '뜨거운 주전자에 손이 닿았을 때 "앗 뜨거워!" 하고 생각하기도 전에 자신도 모르게 손을 떼는 회피 반사의 조절 중추는?',
            opts: ['대뇌 (Cerebrum)', '척수 (Spinal Cord)', '소뇌 (Cerebellum)', '간뇌 (Diencephalon)'],
            ans: 1,
            exp: '위험 회피 반사와 무릎 반사는 대뇌를 거치지 않고 "척수"에서 즉시 운동 신경으로 명령을 내려 약 30ms 만에 초고속으로 일어납니다.'
        },
        {
            topic: '신경계 (시냅스)',
            moduleUrl: '../synapse/',
            q: '축삭 말단에 활동전위가 도달했을 때, 시냅스 소포가 세포막과 융합하여 신경전달물질을 방출하게 만드는 방아쇠 이온은?',
            opts: ['Na+ (나트륨 이온)', 'Ca2+ (칼슘 이온)', 'K+ (칼륨 이온)', 'Cl- (염소 이온)'],
            ans: 1,
            exp: '탈분극이 축삭 말단에 도달하면 전압 개폐성 Ca2+ 통로가 열려 칼슘 이온이 유입되고, 이로 인해 시냅스 소포의 엑소사이토시스가 유발됩니다.'
        },
        {
            topic: '근육계 (활주설)',
            moduleUrl: '../muscle/',
            q: '골격근이 수축할 때 근절(Sarcomere)의 구간별 길이 변화로 옳은 것은?',
            opts: [
                'A대(암대)의 길이가 짧아진다.',
                '액틴 필라멘트 자체의 길이가 짧아진다.',
                'A대의 길이는 불변이고, I대와 H대의 길이가 짧아진다.',
                'Z선 사이의 거리가 멀어진다.'
            ],
            ans: 2,
            exp: '근육 수축 시 액틴과 마이오신 자체 길이나 A대(마이오신 길이)는 절대 변하지 않으며, 액틴이 활주하여 겹치면서 I대와 H대가 줄어듭니다.'
        },
        {
            topic: '골격계 (길항)',
            moduleUrl: '../skeleton/',
            q: '팔을 안쪽으로 굽힐 때(Flexion) 위팔두갈래근(이두근)과 위팔세갈래근(삼두근)의 상태로 옳은 것은?',
            opts: [
                '이두근 수축, 삼두근 수축',
                '이두근 수축, 삼두근 이완',
                '이두근 이완, 삼두근 수축',
                '이두근 이완, 삼두근 이완'
            ],
            ans: 1,
            exp: '관절 운동은 길항근 쌍의 상호작용으로, 팔을 굽힐 때는 주동근인 이두근이 수축하고 길항근인 삼두근이 이완해야 합니다.'
        },
        {
            topic: '항상성 (혈당)',
            moduleUrl: '../homeostasis/',
            q: '식사 후 혈액 내 포도당 농도(혈당량)가 높아졌을 때 이자에서 분비되어 간에서 포도당을 글리코젠으로 저장시키는 호르몬은?',
            opts: ['글루카곤', '인슐린', '아드레날린', '티록신'],
            ans: 1,
            exp: '고혈당 시 이자 베타세포에서 인슐린이 분비되어 포도당을 글리코젠으로 합성·저장하여 정상 혈당(100 mg/dL)으로 낮춥니다.'
        }
    ];

    var currentIdx = 0;
    var userAnswers = [];
    var score = 0;

    // DOM Elements
    var progressFillEl, qNumEl, qTopicEl, qTextEl, optContainerEl, expBoxEl, nextBtnEl;
    var quizSectionEl, reportSectionEl, scoreValEl, weakListEl;

    function init() {
        progressFillEl = document.getElementById('examProgress');
        qNumEl = document.getElementById('qNum');
        qTopicEl = document.getElementById('qTopic');
        qTextEl = document.getElementById('qText');
        optContainerEl = document.getElementById('optContainer');
        expBoxEl = document.getElementById('expBox');
        nextBtnEl = document.getElementById('nextBtn');

        quizSectionEl = document.getElementById('quizSection');
        reportSectionEl = document.getElementById('reportSection');
        scoreValEl = document.getElementById('scoreVal');
        weakListEl = document.getElementById('weakList');

        if (nextBtnEl) {
            nextBtnEl.addEventListener('click', handleNext);
        }

        renderQuestion();
    }

    function renderQuestion() {
        var q = questions[currentIdx];
        if (!q) {
            showReport();
            return;
        }

        progressFillEl.style.width = ((currentIdx / questions.length) * 100) + '%';
        qNumEl.textContent = '문항 ' + (currentIdx + 1) + ' / ' + questions.length;
        qTopicEl.textContent = q.topic;
        qTextEl.textContent = q.q;

        expBoxEl.style.display = 'none';
        nextBtnEl.style.display = 'none';

        var html = '';
        q.opts.forEach(function (opt, idx) {
            html += '<button class="exam-opt-btn" data-idx="' + idx + '">' +
                '<span style="display:inline-flex; width:24px; height:24px; border-radius:50%; background:rgba(255,255,255,0.1); align-items:center; justify-content:center; font-size:12px;">' + (idx + 1) + '</span>' +
                '<span>' + opt + '</span>' +
                '</button>';
        });
        optContainerEl.innerHTML = html;

        var optBtns = optContainerEl.querySelectorAll('.exam-opt-btn');
        optBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var chosen = parseInt(btn.dataset.idx, 10);
                checkAnswer(chosen, optBtns);
            });
        });
    }

    function checkAnswer(chosen, btns) {
        var q = questions[currentIdx];
        var isCorrect = (chosen === q.ans);

        userAnswers.push({
            qIdx: currentIdx,
            chosen: chosen,
            isCorrect: isCorrect,
            topic: q.topic,
            moduleUrl: q.moduleUrl
        });

        if (isCorrect) score += Math.round(100 / questions.length);

        btns.forEach(function (b, idx) {
            b.disabled = true;
            if (idx === q.ans) b.classList.add('correct');
            else if (idx === chosen) b.classList.add('wrong');
        });

        expBoxEl.innerHTML = '<strong>' + (isCorrect ? '🎉 정답입니다!' : '❌ 오답입니다!') + '</strong><br>' + q.exp;
        expBoxEl.style.display = 'block';
        nextBtnEl.style.display = 'block';

        if (typeof SimEngine !== 'undefined' && SimEngine.SoundFX) {
            if (isCorrect) SimEngine.SoundFX.playPulse();
            else SimEngine.SoundFX.playClick();
        }
    }

    function handleNext() {
        currentIdx++;
        renderQuestion();
    }

    function showReport() {
        progressFillEl.style.width = '100%';
        quizSectionEl.style.display = 'none';
        reportSectionEl.style.display = 'block';

        var finalScore = Math.min(100, score);
        scoreValEl.textContent = finalScore + '점';

        var incorrects = userAnswers.filter(function (a) { return !a.isCorrect; });
        if (incorrects.length === 0) {
            weakListEl.innerHTML = '<div style="padding:16px; background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:8px; color:#34d399; font-weight:700;">🏆 완벽합니다! 2022 개정 교육과정 인체 생체역학·생리학 전 단원 마스터!</div>';
        } else {
            var html = '<div style="text-align:left; margin-top:14px;"><h4 style="font-size:15px; color:#f43f5e; margin-bottom:10px;">⚠️ 취약 개념 처방전 (클릭하여 시뮬레이션 복습):</h4><div style="display:flex; flex-direction:column; gap:8px;">';
            incorrects.forEach(function (inc) {
                var q = questions[inc.qIdx];
                html += '<a href="' + inc.moduleUrl + '" class="sim-btn" style="justify-content:space-between; background:rgba(244,63,94,0.12); border-color:rgba(244,63,94,0.4); text-decoration:none;">' +
                    '<span><strong>[' + inc.topic + ']</strong> ' + q.q.slice(0, 32) + '...</span>' +
                    '<span style="color:#38bdf8; font-size:12px;">시뮬레이션 열기 ➔</span>' +
                    '</a>';
            });
            html += '</div></div>';
            weakListEl.innerHTML = html;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
