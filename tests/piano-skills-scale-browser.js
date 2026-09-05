const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.PIANO_TEST_URL || "http://127.0.0.1:8765/learning/arts/music-theory/piano-skills/";
(async () => {
    const browser = await chromium.launch({ headless:true, channel:"chrome" });
    try {
        const page = await browser.newPage({ viewport:{ width:1024, height:768 } });
        const errors = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.goto(base + "?mode=scale&key=E&scale=major", { waitUntil:"networkidle" });
        assert.equal(await page.locator("#handChoices, [data-hand]").count(), 0);
        assert.equal(await page.locator(".score-toolbar").isVisible(), false);
        const result = await page.evaluate(() => {
            const host = document.querySelector("#scoreSurface"), VF = window.Vex.Flow;
            const signatures = {
                C:[0,-3], D:[2,-1], E:[4,1], G:[1,-2], A:[3,0], F:[-1,-4],
                B:[5,2], Db:[-5,4], Eb:[-3,-6], Gb:[-6,3], Ab:[-4,5], Bb:[-2,-5]
            };
            const failures = [];
            let rendered = 0, captured = [];
            const original = VF.Accidental.applyAccidentals;
            VF.Accidental.applyAccidentals = function (voices, key) {
                original.call(this, voices, key);
                captured.push(...voices.map(voice => voice.getTickables().map(note =>
                    note.getModifiers().filter(m => m.getCategory() === "Accidental").map(m => m.type)
                )));
            };
            try {
                for (const [keyId, fifths] of Object.entries(signatures)) {
                    for (const scaleType of ["major","naturalMinor","harmonicMinor","melodicMinor"]) {
                        for (const hand of ["both","right","left"]) {
                            const tag = keyId + " " + scaleType + " " + hand;
                            const model = PianoEngraving.build({ mode:"scale", keyId, scaleType, hand });
                            captured = [];
                            PianoEngraving.render(host, model, 0);
                            const hands = hand === "both" ? ["right","left"] : [hand];
                            const expectedFifths = Math.abs(fifths[scaleType === "major" ? 0 : 1]);
                            const keyGroups = [...host.querySelectorAll(".vf-keysignature")];
                            if (keyGroups.length !== hands.length * 2 || keyGroups.some(g => g.querySelectorAll("path").length !== expectedFifths))
                                failures.push(tag + ": wrong rendered key signature");
                            let voiceIndex = 0;
                            for (const direction of ["up","down"]) for (const side of hands) {
                                const required = scaleType === "harmonicMinor"
                                    ? (direction === "up" ? [6,13] : [1,8])
                                    : scaleType === "melodicMinor" && direction === "up" ? [5,6,12,13] : [];
                                const notes = model.pages[0][direction][side];
                                const actual = captured[voiceIndex++];
                                notes.forEach((note, i) => {
                                    const expected = required.includes(i) ? [note.accidental || "n"] : [];
                                    if (JSON.stringify(actual[i]) !== JSON.stringify(expected))
                                        failures.push(tag + " " + direction + " " + side + " note " + i + ": wrong accidental " + actual[i]);
                                });
                            }
                            if (hand === "both") {
                                const groups = [...host.querySelectorAll(".vf-stavenote")];
                                const upBottom = Math.max(...groups.slice(0,30).map(e => { const b=e.getBBox(); return b.y+b.height; }));
                                const downTop = Math.min(...groups.slice(30).map(e => e.getBBox().y));
                                if (downTop - upBottom < 14) failures.push(tag + ": ascending and descending overlap");
                            }
                            const svg = host.querySelector("svg"), bounds = svg.viewBox.baseVal;
                            for (const element of svg.querySelectorAll(".vf-notehead, .vf-annotation")) {
                                const box = element.getBBox();
                                if (box.x < 0 || box.y < 0 || box.x + box.width > bounds.width || box.y + box.height > bounds.height)
                                    failures.push(tag + ": clipped note or fingering");
                            }
                            if (/Two Octaves|Fingering numbers/.test(svg.textContent))
                                failures.push(tag + ": redundant heading");
                            rendered++;
                        }
                    }
                }
            } finally {
                VF.Accidental.applyAccidentals = original;
            }
            return { rendered, failures };
        });
        assert.deepEqual(result.failures, []);
        for (const viewport of [{width:1024,height:768},{width:1180,height:820},{width:768,height:1024}]) {
            await page.setViewportSize(viewport);
            await page.goto(base + "?mode=scale&key=E&scale=major", {waitUntil:"networkidle"});
            await page.locator('[data-scale-key="Bb"]').click();
            await page.locator('[data-scale-type="melodicMinor"]').click();
            assert.match(await page.locator("#exerciseTitle").textContent(), /Melodic Minor/);
            const layout = await page.evaluate(() => {
                const score = document.querySelector("#scoreViewport"), dock = document.querySelector(".practice-dock");
                const s = score.getBoundingClientRect(), d = dock.getBoundingClientRect();
                return { overflow:score.scrollWidth > score.clientWidth || score.scrollHeight > score.clientHeight,
                    overlap:Math.max(0, Math.min(s.bottom,d.bottom) - Math.max(s.top,d.top)) };
            });
            assert.deepEqual(layout, {overflow:false,overlap:0});
        }
        assert.deepEqual(errors, []);
        console.log("Scale engraving: " + result.rendered + " combinations checked for key signatures, exact accidental placement, clipping; three tablet layouts and UI selection passed.");
    } finally {
        await browser.close();
    }
})().catch(error => { console.error(error); process.exitCode = 1; });
