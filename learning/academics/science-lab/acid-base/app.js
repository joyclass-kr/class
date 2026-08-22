document.addEventListener('DOMContentLoaded', () => {
    const solutionButtons = [...document.querySelectorAll('[data-solution]')];
    const predictionButtons = [...document.querySelectorAll('[data-prediction]')];
    const dipButton = document.getElementById('dipButton');
    const resultEmpty = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    const redResult = document.getElementById('redResult');
    const blueResult = document.getElementById('blueResult');
    const predictionResult = document.getElementById('predictionResult');
    const explanation = document.getElementById('elementaryExplanation');
    const stageCaption = document.getElementById('stageCaption');
    const solutionBadge = document.getElementById('solutionBadge');
    const beaker = document.getElementById('beaker');
    const solutionStopTop = document.getElementById('solutionStopTop');
    const solutionStopBottom = document.getElementById('solutionStopBottom');
    const redWrap = document.getElementById('litmusRedWrap');
    const blueWrap = document.getElementById('litmusBlueWrap');
    // The dip motion is applied to the inner <svg>, not the wrapping div: in
    // testing, a transform set directly on .litmus-wrap never took visual
    // effect (confirmed via getBoundingClientRect — the div's own box stayed
    // put while its child svg moved fine under an identical transform), so
    // the svg is the element that actually carries the motion.
    const redSvg = redWrap.querySelector('.litmus-svg');
    const blueSvg = blueWrap.querySelector('.litmus-svg');
    const redChangeClipRect = document.getElementById('redChangeClipRect');
    const blueChangeClipRect = document.getElementById('blueChangeClipRect');
    const solutionSurface = document.getElementById('solutionSurface');
    const solutionRect = document.getElementById('solutionRect');

    const STRIP_TOP = 4, STRIP_BOTTOM = 216, STRIP_HEIGHT = STRIP_BOTTOM - STRIP_TOP;
    // How much further the strip sinks on "dip", as a fraction of its own
    // height. Applied as a JS-computed px transform (not a CSS percentage —
    // percentage translateY on an aspect-ratio-sized box proved unreliable
    // here) so it stays the single source of truth for both the visual dip
    // motion and the wetted-fraction math below.
    const DIP_DEPTH = .14;

    let dipTimers = [];
    function clearDipTimers() {
        dipTimers.forEach(id => clearTimeout(id));
        dipTimers = [];
    }
    function resetStripReveal(clipRect) {
        clipRect.setAttribute('y', '216');
        clipRect.setAttribute('height', '0');
    }
    // Only the part of the strip that actually goes under the liquid should
    // change color — the dry part above the surface stays as it was. y/height
    // default to the full strip (for callers that don't pass them), but dip()
    // always computes the real wetted fraction below.
    function revealStripChange(clipRect, y = STRIP_TOP, height = STRIP_HEIGHT) {
        clipRect.setAttribute('y', String(y));
        clipRect.setAttribute('height', String(height));
    }

    // Measures the dip offset (px) and how far the strip actually sinks below
    // the liquid surface (as a 0..1 fraction of its own length), from real
    // rendered geometry rather than a guessed constant, so both the motion
    // and the color boundary line up with where the strip visually crosses
    // the surface. Must be called BEFORE the dip transform is applied (reads
    // the rest-position box, then adds the known dip offset analytically).
    function measureDip(wrap) {
        const wrapRect = wrap.getBoundingClientRect();
        const offsetPx = wrapRect.height * DIP_DEPTH;
        const dippedBottom = wrapRect.bottom + offsetPx;
        const submergedPx = dippedBottom - solutionRect.getBoundingClientRect().top;
        const fraction = Math.max(0, Math.min(1, submergedPx / wrapRect.height));
        return { offsetPx, fraction };
    }

    // Color and clarity here match the actual observed appearance of each
    // liquid (same classification as the 색깔·투명도 관찰 lesson before this
    // one), not an arbitrary palette. Vinegar, salt water and sugar water are
    // all genuinely colorless and transparent — same as plain water — which
    // is exactly why sight alone can't tell them apart; that's the reason an
    // indicator is needed at all. Opacity does the transparent/cloudy work:
    // low opacity lets the dark backdrop show through (see-through), high
    // opacity blocks it (milky/opaque).
    const SOLUTIONS = {
        vinegar: { label: '식초', type: 'acid', appearance: '무색 · 투명',
            top: '#6ec8eb', topOpacity: .5, bottom: '#3c96c3', bottomOpacity: .62 },
        lemon: { label: '레몬즙', type: 'acid', appearance: '노란색 · 불투명',
            top: '#f2d64e', topOpacity: .86, bottom: '#dfb636', bottomOpacity: .92 },
        saltwater: { label: '소금물', type: 'neutral', appearance: '무색 · 투명',
            top: '#6ec8eb', topOpacity: .5, bottom: '#3c96c3', bottomOpacity: .62 },
        sugarwater: { label: '설탕물', type: 'neutral', appearance: '무색 · 투명',
            top: '#6ec8eb', topOpacity: .5, bottom: '#3c96c3', bottomOpacity: .62 },
        soap: { label: '비눗물', type: 'base', appearance: '흰색 · 불투명',
            top: '#f5f7f8', topOpacity: .82, bottom: '#dfe6e8', bottomOpacity: .88 },
        cleaner: { label: '유리세정제', type: 'base', appearance: '파란색 · 투명',
            top: '#6fb8f2', topOpacity: .5, bottom: '#2f7dcf', bottomOpacity: .65 },
    };
    const TYPE_LABEL = { acid: '산성', base: '염기성', neutral: '중성' };

    // "은/는" varies with whether the preceding syllable has a batchim
    // (final consonant) — 식초는 vs 소금물은. Every solution label gets
    // interpolated into these sentences, so this can't be hardcoded.
    function topicParticle(word) {
        const code = word.charCodeAt(word.length - 1);
        if (code < 0xac00 || code > 0xd7a3) return '는';
        return (code - 0xac00) % 28 === 0 ? '는' : '은';
    }

    let selectedSolution = null;
    let prediction = null;

    function selectSolution(key) {
        selectedSolution = key;
        const data = SOLUTIONS[key];
        solutionButtons.forEach(btn => btn.classList.toggle('selected', btn.dataset.solution === key));
        solutionStopTop.setAttribute('stop-color', data.top);
        solutionStopTop.setAttribute('stop-opacity', data.topOpacity);
        solutionStopBottom.setAttribute('stop-color', data.bottom);
        solutionStopBottom.setAttribute('stop-opacity', data.bottomOpacity);
        solutionBadge.textContent = `${data.label} (${data.appearance})`;
        beaker.classList.add('has-solution');
        clearResult();
    }

    function clearResult() {
        clearDipTimers();
        resultEmpty.hidden = false;
        resultContent.hidden = true;
        redWrap.classList.remove('dipping');
        blueWrap.classList.remove('dipping');
        redSvg.style.transform = '';
        blueSvg.style.transform = '';
        resetStripReveal(redChangeClipRect);
        resetStripReveal(blueChangeClipRect);
        stageCaption.textContent = selectedSolution
            ? '리트머스 종이를 담가 확인해 보세요.'
            : '용액을 고르고 리트머스 종이를 담가 보세요.';
    }

    function dip() {
        if (!selectedSolution) {
            stageCaption.textContent = '먼저 확인할 용액을 골라 주세요.';
            return;
        }
        clearDipTimers();
        const data = SOLUTIONS[selectedSolution];
        const type = data.type;

        // The real litmus rule: acid turns blue paper red (red paper stays
        // red); base turns red paper blue (blue paper stays blue); neutral
        // changes neither.
        const redChanges = type === 'base';
        const blueChanges = type === 'acid';

        // Measure how much of the strip is actually underwater BEFORE moving
        // it (the transform we're about to apply would otherwise contaminate
        // the rest-position box this reads).
        const { offsetPx, fraction } = measureDip(redWrap);
        const revealHeight = fraction * STRIP_HEIGHT;
        const revealY = STRIP_BOTTOM - revealHeight;

        // Dip: both strips move down into the solution, the surface ripples
        // on contact, the colour spreads up from the wetted tip partway
        // through the dip, then the strips lift back out.
        redSvg.style.transform = `translateY(${offsetPx}px)`;
        blueSvg.style.transform = `translateY(${offsetPx}px)`;
        redWrap.classList.add('dipping');
        blueWrap.classList.add('dipping');
        solutionSurface.classList.remove('rippling');
        void solutionSurface.offsetWidth;
        solutionSurface.classList.add('rippling');

        dipTimers.push(setTimeout(() => {
            if (redChanges) revealStripChange(redChangeClipRect, revealY, revealHeight); else resetStripReveal(redChangeClipRect);
            if (blueChanges) revealStripChange(blueChangeClipRect, revealY, revealHeight); else resetStripReveal(blueChangeClipRect);
        }, 380));

        dipTimers.push(setTimeout(() => {
            redWrap.classList.remove('dipping');
            blueWrap.classList.remove('dipping');
            redSvg.style.transform = '';
            blueSvg.style.transform = '';

            redResult.textContent = redChanges ? '푸르게 변함' : '그대로';
            blueResult.textContent = blueChanges ? '붉게 변함' : '그대로';
            resultEmpty.hidden = true;
            resultContent.hidden = false;

            predictionResult.textContent = !prediction
                ? '다음에는 결과를 먼저 예상해 보세요.'
                : prediction === type ? '예상이 맞았습니다.' : '예상과 다른 결과입니다.';

            const particle = topicParticle(data.label);
            stageCaption.textContent = `${data.label}${particle} ${TYPE_LABEL[type]} 용액입니다.`;
            if (type === 'acid') {
                explanation.textContent = `${data.label}${particle} 산성이라 푸른 리트머스 종이가 붉게 변하고, 붉은 리트머스 종이는 그대로입니다.`;
            } else if (type === 'base') {
                explanation.textContent = `${data.label}${particle} 염기성이라 붉은 리트머스 종이가 푸르게 변하고, 푸른 리트머스 종이는 그대로입니다.`;
            } else {
                explanation.textContent = `${data.label}${particle} 중성이라 두 리트머스 종이 색이 모두 변하지 않습니다.`;
            }
        }, 780));
    }

    solutionButtons.forEach(button => button.addEventListener('click', () => selectSolution(button.dataset.solution)));
    predictionButtons.forEach(button => button.addEventListener('click', () => {
        prediction = button.dataset.prediction;
        predictionButtons.forEach(item => item.classList.toggle('selected', item === button));
    }));
    dipButton.addEventListener('click', dip);

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

    clearResult();
});
