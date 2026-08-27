(function () {
    "use strict";

    const DATA = window.PianoSkillsData;
    const SOURCE = window.PianoSourceCatalog;
    const SOURCE_SCORES = window.PianoVoicingSourceData;
    const ROOT_NAMES = ["C", "F", "Bb", "Eb", "Ab", "Db", "F#", "B", "E", "A", "D", "G"];
    const ROOT_LABELS = ["C", "F", "B♭", "E♭", "A♭", "D♭", "F♯", "B", "E", "A", "D", "G"];
    const ROOT_MIDIS = [60, 65, 58, 63, 68, 61, 66, 59, 64, 69, 62, 67];
    const NATURAL_PC = { C:0, D:2, E:4, F:5, G:7, A:9, B:11 };
    const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
    const FLAT_NAMES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
    const SHARP_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const SCALE_KEY_ORDER = ["C", "D", "E", "G", "A", "F", "B", "Db", "Eb", "Gb", "Ab", "Bb"];
    // Exact written starting registers from the fingering source. Upper tonics
    // start below middle C instead of being forced above C4 by pitch class.
    const SCALE_ROOT_MIDIS = {
        C:60, D:62, E:64, F:65,
        G:55, A:57, B:59,
        Db:61, Eb:63,
        Gb:54, Ab:56, Bb:58
    };
    const SCALE_PAGE_LABELS = { major:"Major Scale", naturalMinor:"Natural Minor Scale", harmonicMinor:"Harmonic Minor Scale", melodicMinor:"Melodic Minor Scale" };
    const SCALE_ROOT_NAMES = {
        Db:{ major:"Db", minor:"C#" },
        Gb:{ major:"Gb", minor:"F#" },
        Ab:{ major:"Ab", minor:"G#" }
    };
    const MINOR_KEY_SIGNATURES = {
        C:"Eb", D:"F", E:"G", G:"Bb", A:"C", F:"Ab", B:"D",
        "C#":"E", Eb:"Gb", "F#":"A", "G#":"B", Bb:"Db"
    };

    const DEGREE_MAP = {
        1:[1,3,5,7], 2:[1,3,5,7], 3:[1,3,5,7], 4:[1,3,5,7], 5:[1,3,5,7], 6:[1,4,5,7],
        7:[3,6,9], 8:[3,6,9], 9:[3,7,9], 10:[3,7,9], 11:[3,7,9],
        12:[7,10,12], 13:[7,10,12], 14:[7,10,12], 15:[7,10,12],
        16:[7,10,13], 17:[7,10,13], 18:[7,10,13], 19:[4,7,9], 20:[7,9,11,13]
    };

    function mod(value, base) {
        return ((value % base) + base) % base;
    }

    function parseRoot(name) {
        const letter = name[0].toUpperCase();
        let accidental = 0;
        if (name.includes("b") || name.includes("♭")) accidental = -1;
        if (name.includes("#") || name.includes("♯")) accidental = 1;
        return { letter:letter, accidental:accidental, pc:mod(NATURAL_PC[letter] + accidental, 12) };
    }

    function rootNameAtPc(pc, preferSharp) {
        return (preferSharp ? SHARP_NAMES : FLAT_NAMES)[mod(pc, 12)];
    }

    function rootMidiAtPc(pc) {
        const found = ROOT_MIDIS.find(function (midi) { return midi % 12 === mod(pc, 12); });
        return found === undefined ? 60 + mod(pc, 12) : found;
    }

    function displayRoot(name) {
        return name.replace("b", "♭").replace("#", "♯");
    }

    function accidentalForDiff(diff) {
        if (diff === -2) return "bb";
        if (diff === -1) return "b";
        if (diff === 1) return "#";
        if (diff === 2) return "##";
        return "";
    }

    function pitchSpec(rootName, midi, degree) {
        const root = parseRoot(rootName);
        const rootLetterIndex = LETTERS.indexOf(root.letter);
        const letter = LETTERS[mod(rootLetterIndex + degree - 1, 7)];
        let diff = mod(mod(midi, 12) - NATURAL_PC[letter], 12);
        if (diff > 6) diff -= 12;
        const accidental = accidentalForDiff(diff);
        return {
            midi:midi,
            degree:degree,
            key:letter.toLowerCase() + accidental + "/" + (Math.floor(midi / 12) - 1),
            accidental:accidental
        };
    }

    function diatonicRootName(tonicName, targetPc, degree) {
        const tonic = parseRoot(tonicName);
        const letter = LETTERS[mod(LETTERS.indexOf(tonic.letter) + degree - 1, 7)];
        let diff = mod(targetPc - NATURAL_PC[letter], 12);
        if (diff > 6) diff -= 12;
        return letter + accidentalForDiff(diff);
    }

    function makeFormulaGroup(rootName, voiceRootMidi, bassMidi, intervals, degrees, label) {
        return {
            label:label,
            left:[pitchSpec(rootName, bassMidi, 1)],
            right:intervals.map(function (interval, index) {
                return pitchSpec(rootName, voiceRootMidi + interval, degrees[index]);
            })
        };
    }

    function makeSplitGroup(rootName, voiceRootMidi, leftIntervals, leftDegrees, rightIntervals, rightDegrees, label) {
        return {
            label:label,
            left:leftIntervals.map(function (interval, index) {
                return pitchSpec(rootName, voiceRootMidi + interval, leftDegrees[index]);
            }),
            right:rightIntervals.map(function (interval, index) {
                return pitchSpec(rootName, voiceRootMidi + interval, rightDegrees[index]);
            })
        };
    }

    function audioNotes(group) {
        return group.left.concat(group.right).map(function (note) { return note.midi; });
    }

    function paginateSections(sections, pageSize) {
        const pages = [];
        sections.forEach(function (section) {
            for (let index = 0; index < section.groups.length; index += pageSize) {
                pages.push({
                    kind:"chords",
                    sectionLabel:section.label,
                    continuation:index > 0,
                    groups:section.groups.slice(index, index + pageSize)
                });
            }
        });
        return pages;
    }

    function buildScale(settings) {
        const key = DATA.keys.find(function (item) { return item.id === settings.keyId; });
        const type = DATA.scaleTypes[settings.scaleType];
        const rootNames = SCALE_ROOT_NAMES[key.id];
        const rootName = rootNames
            ? (settings.scaleType === "major" ? rootNames.major : rootNames.minor)
            : key.id;
        const rootMidi = SCALE_ROOT_MIDIS[key.id];
        const ascendingIntervals = type.intervals.slice(0, -1).concat(type.intervals.map(function (interval) { return interval + 12; }));
        const descendingIntervals = settings.scaleType === "melodicMinor"
            ? [24,22,20,19,17,15,14,12,10,8,7,5,3,2,0]
            : ascendingIntervals.slice().reverse();
        const degreesUp = Array.from({ length:15 }, function (_, index) { return index + 1; });
        const degreesDown = degreesUp.slice().reverse();
        const fingeringType = settings.scaleType === "major" ? "major" : "minor";
        const selectedFingering = DATA.fingering[key.id][fingeringType];
        const rightUpFingers = selectedFingering.right;
        const leftUpFingers = selectedFingering.left;
        const makeLine = function (intervals, degrees, direction) {
            const rightFingers = direction === "up" ? rightUpFingers : rightUpFingers.slice().reverse();
            const leftFingers = direction === "up" ? leftUpFingers : leftUpFingers.slice().reverse();
            return {
                right:intervals.map(function (interval, index) {
                    const note = pitchSpec(rootName, rootMidi + interval, degrees[index]);
                    note.finger = rightFingers[index];
                    return note;
                }),
                left:intervals.map(function (interval, index) {
                    const note = pitchSpec(rootName, rootMidi + interval - 12, degrees[index]);
                    note.finger = leftFingers[index];
                    return note;
                })
            };
        };
        const up = makeLine(ascendingIntervals, degreesUp, "up");
        const down = makeLine(descendingIntervals, degreesDown, "down");
        const combinedRight = up.right.concat(down.right.slice(1));
        const combinedLeft = up.left.concat(down.left.slice(1));
        const audioGroups = combinedRight.map(function (note, index) {
            if (settings.hand === "right") return [note.midi];
            if (settings.hand === "left") return [combinedLeft[index].midi];
            return [combinedLeft[index].midi, note.midi];
        });
        return {
            kind:"scale",
            pages:[{
                kind:"scale",
                up:up,
                down:down,
                hand:settings.hand,
                keyLabel:displayRoot(rootName),
                typeLabel:SCALE_PAGE_LABELS[settings.scaleType],
                keySignature:settings.scaleType === "major" ? rootName : MINOR_KEY_SIGNATURES[rootName]
            }],
            audioGroups:audioGroups
        };
    }

    function buildFoundationSkill(skillId) {
        const definition = DATA.blockSkills.concat(DATA.shellSkills).find(function (item) { return Number(item.id) === skillId; });
        const groups = ROOT_NAMES.map(function (rootName, index) {
            return makeFormulaGroup(
                rootName,
                ROOT_MIDIS[index],
                ROOT_MIDIS[index] - 12,
                definition.intervals,
                DEGREE_MAP[skillId],
                ROOT_LABELS[index] + definition.suffix
            );
        });
        return { pages:paginateSections([{ label:"Skill " + skillId + " · " + definition.label, groups:groups }], 12), audioGroups:groups.map(audioNotes) };
    }

    function seventhFormula(quality) {
        const formulas = {
            maj7:{ intervals:[11,16,19], degrees:[7,10,12], suffix:"Δ" },
            min7:{ intervals:[10,15,19], degrees:[7,10,12], suffix:"m7" },
            dom7:{ intervals:[10,16,19], degrees:[7,10,12], suffix:"7" },
            halfDim:{ intervals:[10,15,18], degrees:[7,10,12], suffix:"ø" }
        };
        return formulas[quality];
    }

    function buildDiatonicSkill(skillId) {
        const keyIndex = skillId - 21;
        const tonicName = ROOT_NAMES[keyIndex];
        const tonicPc = parseRoot(tonicName).pc;
        const tonicMidi = 48 + tonicPc;
        const scale = [0,2,4,5,7,9,11,12,11,9,7,5,4,2,0];
        const degrees = [1,2,3,4,5,6,7,8,7,6,5,4,3,2,1];
        const qualities = ["maj7","min7","min7","maj7","dom7","min7","halfDim","maj7","halfDim","min7","dom7","maj7","min7","min7","maj7"];
        const groups = scale.map(function (offset, index) {
            const degree = degrees[index];
            const pc = mod(tonicPc + offset, 12);
            const name = diatonicRootName(tonicName, pc, degree);
            const formula = seventhFormula(qualities[index]);
            const chordRootMidi = tonicMidi + offset;
            return makeFormulaGroup(name, chordRootMidi, chordRootMidi, formula.intervals, formula.degrees, displayRoot(name) + formula.suffix);
        });
        return { pages:paginateSections([{ label:"Skill " + skillId + " · " + displayRoot(tonicName) + " Major", groups:groups }], 8), audioGroups:groups.map(audioNotes) };
    }

    function cycleFormula(kind, upper) {
        const map = {
            majA:{ intervals:[11,16,19], degrees:[7,10,12], suffix:"Δ" },
            majB:{ intervals:[4,11,14], degrees:[3,7,9], suffix:"Δ9" },
            minA:{ intervals:[10,15,19], degrees:[7,10,12], suffix:"m7" },
            minB:{ intervals:[3,10,14], degrees:[3,7,9], suffix:"m9" },
            domA:{ intervals:[10,16,19], degrees:[7,10,12], suffix:"7" },
            domB:{ intervals:[4,10,14], degrees:[3,7,9], suffix:"9" },
            susA:{ intervals:[5,10,14], degrees:[4,7,9], suffix:"9sus4" },
            susB:{ intervals:[10,14,17,21], degrees:[7,9,11,13], suffix:"13sus4" }
        };
        return map[kind + (upper ? "B" : "A")];
    }

    function cycleGroups(startIndex, firstFormula, secondFormula) {
        const groups = [];
        for (let step = 0; step <= 12; step += 1) {
            const index = mod(startIndex + step, 12);
            const formula = step % 2 === 0 ? firstFormula : secondFormula;
            groups.push(makeFormulaGroup(ROOT_NAMES[index], ROOT_MIDIS[index], ROOT_MIDIS[index] - 12, formula.intervals, formula.degrees, ROOT_LABELS[index] + formula.suffix));
        }
        return groups;
    }

    function buildSimpleCycleSkill(skillId) {
        const kind = {33:"maj",34:"min",35:"dom",36:"sus"}[skillId];
        const formulaA = cycleFormula(kind, false);
        const formulaB = cycleFormula(kind, true);
        const sections = [
            { label:"Skill " + skillId + "a · " + SOURCE.skills[skillId - 1].title, groups:cycleGroups(0, formulaA, formulaB) },
            { label:"Skill " + skillId + "b · " + SOURCE.skills[skillId - 1].title, groups:cycleGroups(0, formulaB, formulaA) }
        ];
        return { pages:paginateSections(sections, 8), audioGroups:sections.flatMap(function (section) { return section.groups.map(audioNotes); }) };
    }

    function buildLinkedCycleSkill(skillId) {
        const definitions = skillId === 37 ? [
            [cycleFormula("min", false), cycleFormula("dom", true), "m7 → 9"],
            [cycleFormula("min", false), cycleFormula("dom", true), "m7 → 9"],
            [cycleFormula("min", true), { intervals:[10,16,21], degrees:[7,10,13], suffix:"13" }, "m9 → 13"],
            [cycleFormula("min", true), { intervals:[10,16,21], degrees:[7,10,13], suffix:"13" }, "m9 → 13"]
        ] : skillId === 38 ? [
            [cycleFormula("dom", true), cycleFormula("maj", false), "9 → Δ"],
            [cycleFormula("dom", false), cycleFormula("maj", true), "7 → Δ9"],
            [{ intervals:[10,16,21], degrees:[7,10,13], suffix:"13" }, cycleFormula("maj", true), "13 → Δ9"],
            [{ intervals:[4,10,14], degrees:[3,7,9], suffix:"9" }, cycleFormula("maj", false), "9 → Δ"]
        ] : [
            [{ intervals:[4,10,13], degrees:[3,7,9], suffix:"7♭9" }, cycleFormula("min", false), "7♭9 → m7"],
            [{ intervals:[10,16,21], degrees:[7,10,13], suffix:"13" }, cycleFormula("min", true), "13 → m9"],
            [{ intervals:[4,10,13], degrees:[3,7,9], suffix:"7♭9" }, cycleFormula("min", true), "7♭9 → m9"],
            [{ intervals:[10,16,21], degrees:[7,10,13], suffix:"13" }, cycleFormula("min", false), "13 → m7"]
        ];
        const letters = ["a","b","c","d"];
        const sections = definitions.map(function (definition, index) {
            return {
                label:"Skill " + skillId + letters[index] + " · " + definition[2],
                groups:cycleGroups(index % 2, definition[0], definition[1])
            };
        });
        return { pages:paginateSections(sections, 8), audioGroups:sections.flatMap(function (section) { return section.groups.map(audioNotes); }) };
    }

    function formulaGroupForPc(pc, formula, label, preferSharp) {
        const name = rootNameAtPc(pc, preferSharp);
        const midi = rootMidiAtPc(pc);
        return makeFormulaGroup(name, midi, midi - 12, formula.intervals, formula.degrees, displayRoot(name) + label);
    }

    function iiVIForKey(tonicIndex, minor, format) {
        const tonicName = ROOT_NAMES[tonicIndex];
        const tonicPc = parseRoot(tonicName).pc;
        const sharp = tonicName.includes("#") || ["B","E","A","D","G"].includes(tonicName);
        const iiPc = mod(tonicPc + 2, 12);
        const vPc = mod(tonicPc + 7, 12);
        if (!minor && format === 1) return [
            formulaGroupForPc(iiPc, cycleFormula("min", false), "m7", sharp),
            formulaGroupForPc(vPc, cycleFormula("dom", true), "9", sharp),
            formulaGroupForPc(tonicPc, cycleFormula("maj", false), "Δ", sharp)
        ];
        if (!minor && format === 2) return [
            formulaGroupForPc(iiPc, cycleFormula("min", true), "m9", sharp),
            formulaGroupForPc(vPc, { intervals:[10,16,21], degrees:[7,10,13] }, "13", sharp),
            formulaGroupForPc(tonicPc, cycleFormula("maj", true), "Δ9", sharp)
        ];
        if (minor && format === 1) return [
            formulaGroupForPc(iiPc, { intervals:[10,15,18], degrees:[7,10,12] }, "m7♭5", sharp),
            formulaGroupForPc(vPc, { intervals:[4,10,13], degrees:[3,7,9] }, "7♭9", sharp),
            formulaGroupForPc(tonicPc, cycleFormula("min", false), "m7", sharp)
        ];
        return [
            formulaGroupForPc(iiPc, { intervals:[3,10,13], degrees:[3,7,9] }, "m7♭5", sharp),
            formulaGroupForPc(vPc, { intervals:[10,16,21], degrees:[7,10,13] }, "7♭9", sharp),
            formulaGroupForPc(tonicPc, cycleFormula("min", true), "m9", sharp)
        ];
    }

    function buildCadenceSkill(skillId) {
        const format = [41,43,45].includes(skillId) ? 2 : 1;
        const minor = [42,43].includes(skillId);
        const relative = [44,45].includes(skillId);
        const groups = [];
        ROOT_NAMES.forEach(function (_, tonicIndex) {
            groups.push.apply(groups, iiVIForKey(tonicIndex, minor, format));
            if (relative) {
                const relativePc = mod(parseRoot(ROOT_NAMES[tonicIndex]).pc + 9, 12);
                const relativeIndex = ROOT_NAMES.findIndex(function (name) {
                    return parseRoot(name).pc === relativePc;
                });
                groups.push.apply(groups, iiVIForKey(relativeIndex, true, format));
            }
        });
        return { pages:paginateSections([{ label:"Skill " + skillId + " · " + SOURCE.skills[skillId - 1].title, groups:groups }], 12), audioGroups:groups.map(audioNotes) };
    }

    function buildModalAndProgressionSkill(skillId) {
        const groups = [];
        if (skillId === 46) {
            ROOT_NAMES.forEach(function (name, index) {
                const first = cycleFormula("maj", false);
                const nextIndex = mod(index + 1, 12);
                groups.push(makeFormulaGroup(name, ROOT_MIDIS[index], ROOT_MIDIS[index] - 12, first.intervals, first.degrees, ROOT_LABELS[index] + "Δ"));
                groups.push(makeFormulaGroup(ROOT_NAMES[nextIndex], ROOT_MIDIS[nextIndex], ROOT_MIDIS[nextIndex] - 12, cycleFormula("maj", true).intervals, cycleFormula("maj", true).degrees, ROOT_LABELS[nextIndex] + "Δ9"));
            });
        } else if (skillId === 47) {
            const dorian = [0,2,3,5,7,9,10,12,14,15,17,19,21,22];
            ROOT_NAMES.forEach(function (name, rootIndex) {
                for (let degree = 0; degree < 7; degree += 1) {
                    const midi = ROOT_MIDIS[rootIndex];
                    groups.push(makeFormulaGroup(name, midi, midi - 12, [dorian[degree],dorian[degree+3],dorian[degree+6]], [degree+1,degree+4,degree+7], ROOT_LABELS[rootIndex] + " Dorian · " + (degree + 1)));
                }
            });
        } else if (skillId === 48 || skillId === 49) {
            ROOT_NAMES.forEach(function (name, index) {
                const baseMidi = ROOT_MIDIS[index];
                groups.push(makeSplitGroup(name, baseMidi, [0,5], [1,4], [10,15,19], [7,11,13], ROOT_LABELS[index] + (skillId === 48 ? "m · So What" : "Δ · So What")));
            });
        } else if (skillId === 50) {
            const dorian = [0,2,3,5,7,9,10,12,14,15,17,19,21,22,24,26,27,29];
            ROOT_NAMES.forEach(function (name, rootIndex) {
                for (let degree = 0; degree < 7; degree += 1) {
                    const midi = ROOT_MIDIS[rootIndex];
                    groups.push(makeSplitGroup(name, midi, [dorian[degree],dorian[degree+3]], [degree+1,degree+4], [dorian[degree+6],dorian[degree+9],dorian[degree+11]], [degree+7,degree+10,degree+12], ROOT_LABELS[rootIndex] + " Dorian · " + (degree + 1)));
                }
            });
        } else if (skillId >= 51 && skillId <= 58) {
            const format = skillId % 2 === 0 ? 2 : 1;
            ROOT_NAMES.forEach(function (name, index) {
                const rootPc = parseRoot(name).pc;
                if (skillId <= 52) {
                    const iiPc = mod(rootPc + 2, 12);
                    const iiName = rootNameAtPc(iiPc, !name.includes("b"));
                    const iiMidi = rootMidiAtPc(iiPc);
                    const target = makeSplitGroup(name, ROOT_MIDIS[index], [4,9], [3,6], [14,19,23], [9,12,14], ROOT_LABELS[index] + "Δ");
                    const sideShift = format === 1 ? -1 : 1;
                    groups.push(makeSplitGroup(iiName, iiMidi, [0,5], [1,4], [10,15,19], [7,11,13], displayRoot(iiName) + "m7"));
                    groups.push({
                        label:"side-slip",
                        left:target.left.map(function (note) { return Object.assign({}, note, { midi:note.midi + sideShift, key:pitchSpec(name, note.midi + sideShift, note.degree).key }); }),
                        right:target.right.map(function (note) { return Object.assign({}, note, { midi:note.midi + sideShift, key:pitchSpec(name, note.midi + sideShift, note.degree).key }); })
                    });
                    groups.push(target);
                } else {
                    const progression = iiVIForKey(index, false, format);
                    if (skillId <= 54) {
                        const flatSixPc = mod(rootPc + 8, 12);
                        const flatTwoPc = mod(rootPc + 1, 12);
                        groups.push(progression[0], progression[1]);
                        groups.push(formulaGroupForPc(flatSixPc, cycleFormula("min", false), "m7", false));
                        groups.push(formulaGroupForPc(flatTwoPc, cycleFormula("dom", false), "7", false));
                        groups.push(progression[2]);
                    } else {
                        groups.push.apply(groups, progression);
                    }
                }
            });
        } else if (skillId === 59 || skillId === 60) {
            ROOT_NAMES.forEach(function (name, index) {
                const first = skillId === 59
                    ? makeSplitGroup(name, ROOT_MIDIS[index], [0,10], [1,7], [13,16,21], [9,11,13], ROOT_LABELS[index] + "13♭9")
                    : makeSplitGroup(name, ROOT_MIDIS[index], [0,4,10], [1,3,7], [15,20], [10,12], ROOT_LABELS[index] + "7♯5♯9");
                groups.push(first);
            });
        }
        return { pages:paginateSections([{ label:"Skill " + skillId + " · " + SOURCE.skills[skillId - 1].title, groups:groups }], 12), audioGroups:groups.map(audioNotes) };
    }

    function bluesRootPcs(tonicPc) {
        return [0,5,0,0,5,10,0,9,2,7,0,7].map(function (offset) { return mod(tonicPc + offset, 12); });
    }

    function buildBluesFormat(tonicName, kind, format) {
        const tonicPc = parseRoot(tonicName).pc;
        return bluesRootPcs(tonicPc).map(function (pc, index) {
            const name = rootNameAtPc(pc, tonicName.includes("#"));
            const midi = rootMidiAtPc(pc);
            if (kind === "minor") {
                const left = format === "b" ? [3,10,14] : [10,15,19];
                const leftDegrees = format === "b" ? [3,7,9] : [7,10,12];
                return makeSplitGroup(name, midi, left, leftDegrees, [26,31,36], [16,19,22], displayRoot(name) + "m9");
            }
            if (kind === "fourthy") {
                const left = format === "b" ? [4,10,14] : [10,16,21];
                const leftDegrees = format === "b" ? [3,7,9] : [7,10,13];
                return makeSplitGroup(name, midi, left, leftDegrees, [26,31,36], [16,19,22], displayRoot(name) + "13");
            }
            if (kind === "major7") {
                const quality = index < 4 ? "maj" : index % 3 === 0 ? "min" : "dom";
                const formula = quality === "maj" ? cycleFormula("maj", index % 2 === 1) : quality === "min" ? cycleFormula("min", index % 2 === 1) : cycleFormula("dom", index % 2 === 1);
                return makeFormulaGroup(name, midi, midi - 12, formula.intervals, formula.degrees, displayRoot(name) + formula.suffix);
            }
            const left = format === "b" ? [4,10,14] : [10,16,21];
            const leftDegrees = format === "b" ? [3,7,9] : [7,10,13];
            const upperRoot = index === 7 || index === 8 ? 3 : 0;
            const right = format === "b" ? [upperRoot+31,upperRoot+36,upperRoot+40] : [upperRoot+28,upperRoot+31,upperRoot+36];
            const rightDegrees = format === "b" ? [19,22,24] : [17,19,22];
            const suffix = format === "b"
                ? ["9","13","9","9","13","9","9","7♯5♯9","m9","13","9","13"][index]
                : ["13","9","13","13","9","13","13","7♯9","m9","9","13","9"][index];
            return makeSplitGroup(name, midi, left, leftDegrees, right, rightDegrees, displayRoot(name) + suffix);
        });
    }

    function buildBluesSkill(skillId) {
        let tonicName;
        let kind;
        if (skillId <= 72) { tonicName = ROOT_NAMES[skillId - 61]; kind = "polychord"; }
        else if (skillId <= 84) { tonicName = ROOT_NAMES[skillId - 73]; kind = "fourthy"; }
        else if (skillId <= 96) { tonicName = ROOT_NAMES[skillId - 85]; kind = "major7"; }
        else { tonicName = ["C","F","Bb","Eb","G#","C#","F#","B","E","A","D","G"][skillId - 97]; kind = "minor"; }
        const sections = kind === "major7" ? [
            { label:"Skill " + skillId + " · " + SOURCE.skills[skillId - 1].title, groups:buildBluesFormat(tonicName, kind, "a") }
        ] : [
            { label:"Skill " + skillId + "a · Format a", groups:buildBluesFormat(tonicName, kind, "a") },
            { label:"Skill " + skillId + "b · Format b", groups:buildBluesFormat(tonicName, kind, "b") }
        ];
        return { pages:paginateSections(sections, 12), audioGroups:sections.flatMap(function (section) { return section.groups.map(audioNotes); }) };
    }

    function buildAdvancedDominantSkill(skillId) {
        const groups = [];
        if (skillId <= 116) {
            const index = skillId - 109;
            const upperOffsets = [2,3,6,8,9,1,3,6];
            const minor = index >= 5;
            ROOT_NAMES.forEach(function (name, rootIndex) {
                const upper = upperOffsets[index];
                const right = minor ? [upper+12,upper+15,upper+19] : [upper+12,upper+16,upper+19];
                groups.push(makeSplitGroup(name, ROOT_MIDIS[rootIndex], [0,4,10], [1,3,7], right, [9,11,13], ROOT_LABELS[rootIndex] + " · " + SOURCE.skills[skillId - 1].title.replace("Dominant ","")));
            });
        } else if (skillId === 117) {
            ROOT_NAMES.forEach(function (name, rootIndex) {
                [2,3,6,8,9].forEach(function (upper) {
                    groups.push(makeSplitGroup(name, ROOT_MIDIS[rootIndex], [0,4,10], [1,3,7], [upper+12,upper+16,upper+19], [9,11,13], ROOT_LABELS[rootIndex] + "7 / " + displayRoot(rootNameAtPc(parseRoot(name).pc + upper, true))));
                });
            });
        } else {
            const transposition = mod(skillId - 118, 3);
            const direction = skillId >= 121 ? -1 : 1;
            ROOT_NAMES.forEach(function (name, rootIndex) {
                for (let step = 0; step < 4; step += 1) {
                    const shift = (transposition + direction * step) * 3;
                    const pc = mod(parseRoot(name).pc + shift, 12);
                    const shiftedName = rootNameAtPc(pc, name.includes("#"));
                    const midi = rootMidiAtPc(pc);
                    groups.push(makeSplitGroup(shiftedName, midi, [0,4,10], [1,3,7], [13,21], [9,13], displayRoot(shiftedName) + "13♭9"));
                }
                groups.push(makeFormulaGroup(name, ROOT_MIDIS[rootIndex], ROOT_MIDIS[rootIndex] - 12, cycleFormula("maj", false).intervals, cycleFormula("maj", false).degrees, ROOT_LABELS[rootIndex] + "Δ"));
            });
        }
        return { pages:paginateSections([{ label:"Skill " + skillId + " · " + SOURCE.skills[skillId - 1].title, groups:groups }], 12), audioGroups:groups.map(audioNotes) };
    }

    function buildSkill(skillId) {
        if (skillId <= 20) return buildFoundationSkill(skillId);
        if (SOURCE_SCORES && SOURCE_SCORES.skills && SOURCE_SCORES.skills[String(skillId)]) {
            return buildSourceSkill(skillId);
        }
        if (skillId <= 32) return buildDiatonicSkill(skillId);
        if (skillId <= 36) return buildSimpleCycleSkill(skillId);
        if (skillId <= 39) return buildLinkedCycleSkill(skillId);
        if (skillId <= 45) return buildCadenceSkill(skillId);
        if (skillId <= 60) return buildModalAndProgressionSkill(skillId);
        if (skillId <= 108) return buildBluesSkill(skillId);
        return buildAdvancedDominantSkill(skillId);
    }

    function sourceMeasureWeight(measure) {
        return Math.max(
            1,
            measure.right.reduce(function (sum, event) { return sum + (event.rest ? .5 : 1); }, 0),
            measure.left.reduce(function (sum, event) { return sum + (event.rest ? .5 : 1); }, 0)
        );
    }

    function reflowSourceSystems(systems) {
        const result = [];
        systems.forEach(function (system) {
            const weight = system.reduce(function (sum, measure) { return sum + sourceMeasureWeight(measure); }, 0);
            if (system.length <= 6 && weight <= 10) {
                result.push(system);
                return;
            }
            let current = [];
            let currentWeight = 0;
            system.forEach(function (measure) {
                const measureWeight = sourceMeasureWeight(measure);
                if (current.length && (current.length >= 6 || currentWeight + measureWeight > 10)) {
                    result.push(current);
                    current = [];
                    currentWeight = 0;
                }
                current.push(measure);
                currentWeight += measureWeight;
            });
            if (current.length) result.push(current);
        });
        return result;
    }

    function sourceAudioGroups(pages) {
        const groups = [];
        pages.forEach(function (page) {
            page.systems.flat().forEach(function (measure) {
                const onsets = Array.from(new Set(measure.right.concat(measure.left).map(function (event) {
                    return event.at;
                }))).sort(function (a, b) { return a - b; });
                onsets.forEach(function (onset) {
                    const notes = measure.right.concat(measure.left)
                        .filter(function (event) { return event.at === onset && !event.rest; })
                        .flatMap(function (event) { return event.midis || []; });
                    if (notes.length) groups.push(Array.from(new Set(notes)).sort(function (a, b) { return a - b; }));
                });
            });
        });
        return groups;
    }

    function durationBeats(duration) {
        const base = { w:4, h:2, q:1, "8":.5, "16":.25 }[String(duration).replace(/d/g, "")] || 1;
        const dots = (String(duration).match(/d/g) || []).length;
        let total = base;
        let addition = base / 2;
        for (let index = 0; index < dots; index += 1) {
            total += addition;
            addition /= 2;
        }
        return total;
    }

    function sourcePageAudioEvents(systems) {
        const events = [];
        let measureStart = 0;
        let displayMeasure = 1;
        systems.flat().forEach(function (measure) {
            const hands = [measure.right, measure.left];
            const beatByOnset = new Map();
            hands.forEach(function (hand) {
                let beat = 0;
                hand.forEach(function (event) {
                    if (!beatByOnset.has(event.at) || beat < beatByOnset.get(event.at)) beatByOnset.set(event.at, beat);
                    beat += durationBeats(event.d);
                });
            });
            Array.from(beatByOnset.keys()).sort(function (a, b) { return a - b; }).forEach(function (onset, eventIndex) {
                const attacks = measure.right.concat(measure.left).filter(function (event) {
                    return event.at === onset && !event.rest;
                });
                const notes = Array.from(new Set(attacks.flatMap(function (event) {
                    return event.midis || [];
                }))).sort(function (a, b) { return a - b; });
                if (!notes.length) return;
                events.push({
                    at:measureStart + beatByOnset.get(onset),
                    beats:Math.max.apply(Math, attacks.map(function (event) { return durationBeats(event.d); })),
                    notes:notes,
                    label:"Bar " + displayMeasure + (eventIndex ? " · Beat " + (eventIndex + 1) : "")
                });
            });
            const timeParts = String(measure.time || "4/4").split("/").map(Number);
            measureStart += (timeParts[0] || 4) * (4 / (timeParts[1] || 4));
            displayMeasure += 1;
        });
        return events;
    }

    function transposeChordSymbol(symbol, semitones, preferSharp) {
        const match = symbol.match(/^([A-G])([♭♯]?)(.*)$/);
        if (!match) return symbol;
        const sourceName = match[1] + (match[2] === "♭" ? "b" : match[2] === "♯" ? "#" : "");
        const pc = mod(parseRoot(sourceName).pc + semitones, 12);
        return displayRoot(rootNameAtPc(pc, preferSharp)) + match[3];
    }

    function sourceAttackLabels(skillId) {
        if (skillId >= 85 && skillId <= 96) {
            const template = [
                "CΔ","Bm7♭5","E7♭9","Am7","D9","Gm7","C9","FΔ","Fm7","B♭9","Em7",
                "A9","E♭m7","A♭9","Dm7","G9","A♭m9","D♭13","CΔ","A7♭9","Dm7","G7♭9"
            ];
            const tonic = ROOT_NAMES[skillId - 85];
            const semitones = parseRoot(tonic).pc;
            const preferSharp = tonic.includes("#") || ["B","E","A","D","G"].includes(tonic);
            return template.map(function (symbol) { return transposeChordSymbol(symbol, semitones, preferSharp); });
        }
        if (skillId >= 97 && skillId <= 108) {
            const template = [
                "Cm9","Fm6/9","Cm9","C7♯5♯9","Fm6/9","B♭13",
                "E♭Δ13","A♭Δ13","Dm7♭5","G7♯5♯9","Cm9","G7♯5♯9"
            ];
            const tonic = ["C","F","Bb","Eb","G#","C#","F#","B","E","A","D","G"][skillId - 97];
            const semitones = parseRoot(tonic).pc;
            const preferSharp = tonic.includes("#") || ["B","E","A","D","G"].includes(tonic);
            return template.map(function (symbol) { return transposeChordSymbol(symbol, semitones, preferSharp); });
        }
        if (skillId >= 118 && skillId <= 123) {
            const transposition = (skillId - 118) % 3;
            const pairs = [
                [["C7","FΔ"],["E♭7","A♭Δ"],["F♯7","BΔ"],["A7","DΔ"]],
                [["D♭7","G♭Δ"],["E7","AΔ"],["G7","CΔ"],["B♭7","E♭Δ"]],
                [["D7","GΔ"],["F7","B♭Δ"],["A♭7","D♭Δ"],["B7","EΔ"]]
            ][transposition];
            const labels = [];
            pairs.forEach(function (pair) {
                labels.push(pair[0], "", "", "", pair[1], pair[0], "", "", "", pair[1]);
            });
            return skillId <= 120 ? labels.concat(labels) : labels;
        }
        return [];
    }

    function cloneSourceSystems(systems) {
        return systems.map(function (system) {
            return system.map(function (measure) {
                return Object.assign({}, measure, {
                    right:measure.right.map(function (event) { return Object.assign({}, event); }),
                    left:measure.left.map(function (event) { return Object.assign({}, event); })
                });
            });
        });
    }

    function applySourceAttackLabels(systems, labels, startIndex) {
        let labelIndex = startIndex;
        systems.flat().forEach(function (measure) {
            const onsets = Array.from(new Set(measure.right.concat(measure.left).map(function (event) {
                return event.at;
            }))).sort(function (a, b) { return a - b; });
            onsets.forEach(function (onset) {
                const label = labels[labelIndex] || "";
                const target = measure.right.find(function (event) { return event.at === onset && !event.rest; })
                    || measure.left.find(function (event) { return event.at === onset && !event.rest; });
                if (target && label) target.label = label;
                labelIndex += 1;
            });
        });
        return labelIndex;
    }

    function buildSourceSkill(skillId) {
        const source = SOURCE_SCORES.skills[String(skillId)];
        const skill = SOURCE.skills[skillId - 1];
        const labels = sourceAttackLabels(skillId);
        let labelIndex = 0;
        const pages = [];
        source.pages.forEach(function (sourcePage) {
            const sourceSystems = cloneSourceSystems(sourcePage.systems);
            labelIndex = applySourceAttackLabels(sourceSystems, labels, labelIndex);
            const systems = reflowSourceSystems(sourceSystems);
            for (let index = 0; index < systems.length; index += 4) {
                const pageSystems = systems.slice(index, index + 4);
                pages.push({
                    kind:"source-chords",
                    skillId:skillId,
                    sectionLabel:"Skill " + skillId + " · " + skill.title,
                    sourcePage:sourcePage.sourcePage,
                    part:Math.floor(index / 4) + 1,
                    partCount:Math.ceil(systems.length / 4),
                    systems:pageSystems,
                    audioEvents:sourcePageAudioEvents(pageSystems)
                });
            }
        });
        return {
            kind:"source-chords",
            pages:pages,
            audioGroups:sourceAudioGroups(pages)
        };
    }

    function staveNote(VF, clef, specs, duration, stemDirection) {
        const note = new VF.StaveNote({
            clef:clef,
            keys:specs.map(function (spec) { return spec.key; }),
            duration:duration,
            stem_direction:stemDirection
        });
        specs.forEach(function (spec, index) {
            if (spec.accidental) note.addModifier(new VF.Accidental(spec.accidental), index);
        });
        return note;
    }

    function renderChordPage(container, page, options) {
        const VF = window.Vex.Flow;
        const width = 1200;
        const height = 650;
        const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
        renderer.resize(width, height);
        const context = renderer.getContext();
        context.setFillStyle("#17201d");
        context.setStrokeStyle("#17201d");
        context.setFont("Inter, Arial, sans-serif", 18, "600");
        context.fillText(page.sectionLabel + (page.continuation ? " · 계속" : ""), 38, 32);
        context.setFont("Inter, Arial, sans-serif", 14, "500");
        context.fillText("♩ = " + options.tempo, 1080, 32);
        const columns = 6;
        const cellWidth = 188;
        const left = 34;
        const systems = [
            { treble:78, bass:180 },
            { treble:358, bass:460 }
        ];
        page.groups.forEach(function (group, index) {
            const row = Math.floor(index / columns);
            const column = index % columns;
            const system = systems[row];
            const x = left + column * cellWidth;
            const staveWidth = cellWidth + (column === columns - 1 ? 0 : 1);
            const treble = new VF.Stave(x, system.treble, staveWidth);
            const bass = new VF.Stave(x, system.bass, staveWidth);
            if (column === 0) {
                treble.addClef("treble");
                bass.addClef("bass");
            }
            treble.setContext(context).draw();
            bass.setContext(context).draw();
            if (column === 0) {
                new VF.StaveConnector(treble, bass).setType(VF.StaveConnector.type.BRACE).setContext(context).draw();
                new VF.StaveConnector(treble, bass).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(context).draw();
            }
            context.setFont("Inter, Arial, sans-serif", 13, "600");
            const labelWidth = Array.from(group.label).length * 7.2;
            const labelCenter = x + staveWidth / 2 + (column === 0 ? 14 : 0);
            context.fillText(group.label, labelCenter - labelWidth / 2, system.treble - 10);
            if (group.right.length) {
                const rightNote = staveNote(VF, "treble", group.right, "w", 1);
                VF.Formatter.FormatAndDraw(context, treble, [rightNote]);
            }
            if (group.left.length) {
                const leftNote = staveNote(VF, "bass", group.left, "w", -1);
                VF.Formatter.FormatAndDraw(context, bass, [leftNote]);
            }
        });
        const svg = container.querySelector("svg");
        if (svg) {
            svg.setAttribute("viewBox", "0 0 " + width + " " + height);
            svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
            svg.setAttribute("aria-label", page.sectionLabel);
        }
    }

    function sourceStaveNote(VF, event, clef, stemDirection) {
        const duration = event.d + (event.rest ? "r" : "");
        const note = new VF.StaveNote({
            clef:clef,
            keys:event.rest ? [clef === "treble" ? "b/4" : "d/3"] : event.keys,
            duration:duration,
            stem_direction:stemDirection
        });
        (event.acc || []).forEach(function (accidental, index) {
            if (accidental) note.addModifier(new VF.Accidental(accidental), index);
        });
        if (event.label) {
            note.addModifier(
                new VF.Annotation(event.label)
                    .setFont("Inter, Arial, sans-serif", 12, "600")
                    .setVerticalJustification(VF.Annotation.VerticalJustify.TOP),
                0
            );
        }
        return note;
    }

    function drawSourceVoice(VF, context, stave, events, clef, stemDirection, time) {
        if (!events.length) return;
        const notes = events.map(function (event) {
            return sourceStaveNote(VF, event, clef, stemDirection);
        });
        const timeParts = String(time || "4/4").split("/").map(Number);
        const voice = new VF.Voice({
            num_beats:timeParts[0] || 4,
            beat_value:timeParts[1] || 4
        }).setStrict(false).addTickables(notes);
        new VF.Formatter().joinVoices([voice]).formatToStave([voice], stave);
        voice.draw(context, stave);
    }

    function drawSourceMeasure(VF, context, measure, x, y, width, firstInSystem, firstOnPage) {
        const treble = new VF.Stave(x, y, width);
        const bass = new VF.Stave(x, y + 66, width);
        if (firstInSystem) {
            treble.addClef("treble");
            bass.addClef("bass");
            if (firstOnPage && measure.time) treble.addTimeSignature(measure.time);
        }
        treble.setContext(context).draw();
        bass.setContext(context).draw();
        if (firstInSystem) {
            new VF.StaveConnector(treble, bass)
                .setType(VF.StaveConnector.type.BRACE)
                .setContext(context)
                .draw();
            new VF.StaveConnector(treble, bass)
                .setType(VF.StaveConnector.type.SINGLE_LEFT)
                .setContext(context)
                .draw();
        }
        drawSourceVoice(VF, context, treble, measure.right, "treble", 1, measure.time);
        drawSourceVoice(VF, context, bass, measure.left, "bass", -1, measure.time);
    }

    function renderSourceChordPage(container, page, options) {
        const VF = window.Vex.Flow;
        const width = 1200;
        const systemHeight = 154;
        const height = 106 + page.systems.length * systemHeight;
        const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
        renderer.resize(width, height);
        const context = renderer.getContext();
        context.setFillStyle("#17201d");
        context.setStrokeStyle("#17201d");
        context.setFont("Inter, Arial, sans-serif", 18, "700");
        context.fillText(page.sectionLabel, 34, 29);
        context.setFont("Inter, Arial, sans-serif", 12, "500");
        const sourceLabel = "Source p." + page.sourcePage + (page.partCount > 1 ? " · Part " + page.part + "/" + page.partCount : "");
        context.fillText(sourceLabel, 34, 50);
        context.setFont("Inter, Arial, sans-serif", 14, "600");
        context.fillText("♩ = " + options.tempo, 1080, 31);

        page.systems.forEach(function (system, systemIndex) {
            const y = 98 + systemIndex * systemHeight;
            const left = 38;
            const available = 1124;
            const weights = system.map(sourceMeasureWeight);
            const totalWeight = weights.reduce(function (sum, weight) { return sum + weight; }, 0);
            let x = left;
            system.forEach(function (measure, measureIndex) {
                const isFirst = measureIndex === 0;
                const proportional = available * weights[measureIndex] / totalWeight;
                const measureWidth = proportional + (isFirst ? 24 : 0);
                drawSourceMeasure(
                    VF,
                    context,
                    measure,
                    x,
                    y,
                    measureWidth,
                    isFirst,
                    systemIndex === 0 && isFirst
                );
                x += measureWidth;
            });
        });
        const svg = container.querySelector("svg");
        if (svg) {
            svg.setAttribute("viewBox", "0 0 " + width + " " + height);
            svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
            svg.setAttribute("aria-label", page.sectionLabel + " · Source page " + page.sourcePage);
        }
    }

    function scaleStaveNotes(VF, specs, clef, stemDirection, fingerPosition) {
        return specs.map(function (spec, index) {
            const duration = index === specs.length - 1 ? "q" : "8";
            const note = staveNote(VF, clef, [spec], duration, stemDirection);
            const finger = new VF.Annotation(String(spec.finger))
                .setFont("Inter, Arial, sans-serif", 11, "500")
                .setVerticalJustification(fingerPosition);
            note.addModifier(finger, 0);
            return note;
        });
    }

    function buildFingeringBeams(VF, notes, specs, breakBeforeThumb) {
        const groups = [];
        let current = [];
        notes.forEach(function (note, index) {
            const previousFinger = index > 0 ? specs[index - 1].finger : null;
            const finger = specs[index].finger;
            const crosses = index > 0 && (breakBeforeThumb
                ? finger === 1 && previousFinger > 1
                : previousFinger === 1 && finger >= 3);
            if (crosses && current.length) {
                groups.push(current);
                current = [];
            }
            current.push(note);
        });
        if (current.length) groups.push(current);
        const beamGroups = groups.map(function (group) {
            return group.filter(function (note) { return note.getDuration() === "8"; });
        }).filter(function (group) { return group.length; });
        beamGroups.forEach(function (group, index) {
            if (group.length !== 1) return;
            const next = beamGroups[index + 1];
            const previous = beamGroups[index - 1];
            if (next) {
                next.unshift(group[0]);
                beamGroups[index] = [];
            } else if (previous) {
                previous.push(group[0]);
                beamGroups[index] = [];
            }
        });
        return beamGroups.filter(function (group) {
            return group.length >= 2;
        }).map(function (group) {
            return new VF.Beam(group);
        });
    }

    function drawScaleSystem(VF, context, line, y, label, ascending, hand) {
        const width = 1028;
        const x = 128;
        const bothHands = hand === "both";
        const treble = hand === "left" ? null : new VF.Stave(x, y, width).addClef("treble");
        const bassY = bothHands ? y + 92 : y;
        const bass = hand === "right" ? null : new VF.Stave(x, bassY, width).addClef("bass");
        context.setFont("Inter, Arial, sans-serif", 14, "700");
        context.fillText(label, 34, y + 48);
        if (treble) treble.setContext(context).draw();
        if (bass) bass.setContext(context).draw();
        if (bothHands) {
            new VF.StaveConnector(treble, bass)
                .setType(VF.StaveConnector.type.BRACE)
                .setContext(context)
                .draw();
            new VF.StaveConnector(treble, bass)
                .setType(VF.StaveConnector.type.SINGLE_LEFT)
                .setContext(context)
                .draw();
        }
        const voices = [];
        const beams = [];
        let rightVoice = null;
        let leftVoice = null;
        if (hand !== "left") {
            const rightNotes = scaleStaveNotes(VF, line.right, "treble", 1, VF.Annotation.VerticalJustify.TOP);
            beams.push.apply(beams, buildFingeringBeams(VF, rightNotes, line.right, ascending));
            rightVoice = new VF.Voice({ num_beats:8, beat_value:4 }).addTickables(rightNotes);
            voices.push(rightVoice);
        }
        if (hand !== "right") {
            const leftNotes = scaleStaveNotes(VF, line.left, "bass", -1, VF.Annotation.VerticalJustify.BOTTOM);
            beams.push.apply(beams, buildFingeringBeams(VF, leftNotes, line.left, !ascending));
            leftVoice = new VF.Voice({ num_beats:8, beat_value:4 }).addTickables(leftNotes);
            voices.push(leftVoice);
        }
        new VF.Formatter().joinVoices(voices).format(voices, width - 100);
        if (rightVoice) rightVoice.draw(context, treble);
        if (leftVoice) leftVoice.draw(context, bass);
        beams.forEach(function (beam) {
            beam.setContext(context).draw();
        });
    }

    function renderScalePage(container, page) {
        const VF = window.Vex.Flow;
        const width = 1200;
        const bothHands = page.hand === "both";
        const height = bothHands ? 620 : 520;
        const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);
        renderer.resize(width, height);
        const context = renderer.getContext();
        context.setFillStyle("#17201d");
        context.setStrokeStyle("#17201d");
        context.setFont("Inter, Arial, sans-serif", 20, "700");
        const handLabel = { both:"Both Hands", right:"Right Hand", left:"Left Hand" }[page.hand] || "Both Hands";
        context.fillText(page.keyLabel + " " + page.typeLabel + " · " + handLabel + " · Two Octaves", 34, 30);
        context.setFont("Inter, Arial, sans-serif", 12, "500");
        const guide = page.hand === "right"
            ? "Right Hand · Treble Clef · Fingering numbers above notes"
            : page.hand === "left"
                ? "Left Hand · Bass Clef · Fingering numbers below notes"
                : "Right Hand: upper staff · Left Hand: lower staff · Fingering numbers";
        context.fillText(guide, 34, 52);
        if (bothHands) {
            drawScaleSystem(VF, context, page.up, 100, "Ascending", true, page.hand);
            drawScaleSystem(VF, context, page.down, 370, "Descending", false, page.hand);
        } else {
            drawScaleSystem(VF, context, page.up, 112, "Ascending", true, page.hand);
            drawScaleSystem(VF, context, page.down, 342, "Descending", false, page.hand);
        }
        const svg = container.querySelector("svg");
        if (svg) {
            svg.setAttribute("viewBox", "0 0 " + width + " " + height);
            svg.setAttribute("preserveAspectRatio", "xMidYMin meet");
            svg.setAttribute("aria-label", page.keyLabel + " " + page.typeLabel + " " + handLabel + " Two Octaves");
        }
    }

    function buildReference(sectionId) {
        const modules = DATA.voicingModules.map(function (module) {
            return "Skill " + module.skills[0] + "-" + module.skills[module.skills.length - 1] + " · " + module.title;
        });
        const pages = [
            { kind:"reference", title:"연습의 기본 원칙 1", items:DATA.practicePrinciples.slice(0, 5) },
            { kind:"reference", title:"연습의 기본 원칙 2", items:DATA.practicePrinciples.slice(5) },
            { kind:"reference", title:"Skills 1-123 과정 지도", items:modules },
            { kind:"reference", title:"기초 학기 통과 순서", items:DATA.semesterTracks.foundation },
            { kind:"reference", title:"고급 학기 통과 순서", items:DATA.semesterTracks.advanced }
        ];
        return { pages:pages, audioGroups:[] };
    }

    function renderReferencePage(container, page) {
        const wrapper = document.createElement("div");
        wrapper.className = "engraved-reference";
        const title = document.createElement("h3");
        title.textContent = page.title;
        const list = document.createElement("ol");
        page.items.forEach(function (text) {
            const item = document.createElement("li");
            item.textContent = text;
            list.appendChild(item);
        });
        wrapper.append(title, list);
        container.appendChild(wrapper);
    }

    function render(container, model, pageIndex, options) {
        container.replaceChildren();
        const page = model.pages[Math.max(0, Math.min(pageIndex, model.pages.length - 1))];
        try {
            if (page.kind === "scale") renderScalePage(container, page);
            else if (page.kind === "reference") renderReferencePage(container, page);
            else if (page.kind === "source-chords") renderSourceChordPage(container, page, options);
            else renderChordPage(container, page, options);
        } catch (error) {
            container.replaceChildren();
            const message = document.createElement("p");
            message.className = "engraving-error";
            message.textContent = "악보 조판 중 오류가 발생했습니다: " + error.message;
            container.appendChild(message);
            throw error;
        }
    }

    function build(settings) {
        if (settings.mode === "scale") return buildScale(settings);
        if (settings.mode === "voicing") return buildSkill(settings.skillId);
        return buildReference(settings.referenceId);
    }

    window.PianoEngraving = { build:build, render:render };
})();
