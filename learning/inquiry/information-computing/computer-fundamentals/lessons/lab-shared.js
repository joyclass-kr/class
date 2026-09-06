(() => {
    "use strict";

    // 차시마다 자기 그림 코드만 받아 가도록 등록소를 공용으로 둔다.
    const renderers = {};
    const setups = [];


    const setBilingualButtonLabel = (button, korean, english) => {
        button.replaceChildren(document.createTextNode(korean + " "));
        const small = document.createElement("small");
        small.textContent = english;
        button.append(small);
    };
    const figure = (spec, className, body) => `
        <figure class="lesson-specific-figure premium-concept-figure visual-${spec.id} ${className}" aria-label="${spec.concept}">
            <div class="lesson-specific-board">${body}</div>
            <figcaption>${spec.caption}</figcaption>
        </figure>
    `;
    const contextImage = (asset, basename, alt, height = 512) => `
        <figure class="context-illustration">
            <picture>
                <img
                    src="${asset(`${basename}-768.webp`)}"
                    srcset="${asset(`${basename}-768.webp`)} 768w, ${asset(`${basename}-1536.webp`)} 1536w"
                    sizes="(max-width: 820px) calc(100vw - 72px), (max-width: 1180px) calc(100vw - 112px), 1020px"
                    width="768"
                    height="${height}"
                    alt="${alt}"
                >
            </picture>
            <figcaption><b>관찰 <small>Observe</small></b><span>${alt}</span></figcaption>
        </figure>
    `;

    const compactContextImage = (asset, basename, alt, caption, englishCaption) => `
        <figure class="lab-context-figure">
            <picture>
                <img
                    src="${asset(`${basename}-768.webp`)}"
                    srcset="${asset(`${basename}-768.webp`)} 768w, ${asset(`${basename}-1536.webp`)} 1536w"
                    sizes="(max-width: 620px) 244px, (max-width: 820px) 144px, (max-width: 1180px) 16vw, 190px"
                    width="1536"
                    height="1024"
                    loading="eager"
                    decoding="async"
                    alt="${alt}"
                >
            </picture>
            <figcaption>${caption}<small>${englishCaption}</small></figcaption>
        </figure>
    `;


    window.COMPUTER_LAB_RENDERERS = renderers;
    window.COMPUTER_LAB_SETUPS = setups;
    window.COMPUTER_LAB_HELPERS = { setBilingualButtonLabel, figure, contextImage, compactContextImage };
    window.COMPUTER_CONCEPT_VISUAL = (spec, asset) => {
        const renderer = renderers[spec.id];
        // 맡은 그림 코드가 없으면 foundation-core의 기본 관계도가 대신 그린다.
        return renderer ? renderer(spec, asset) : null;
    };
    window.COMPUTER_PREMIUM_VISUAL_IDS = [];
    window.COMPUTER_SETUP_CONCEPT_LABS = () => setups.forEach((run) => run());
})();
