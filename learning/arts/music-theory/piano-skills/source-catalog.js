(function () {
    "use strict";

    const skillPages = {
        1:[5],2:[5],3:[6],4:[6],5:[7],6:[7],7:[9],8:[9],9:[10],10:[10],11:[11],12:[11],
        13:[12],14:[12],15:[13],16:[13],17:[14],18:[14],19:[15],20:[15],21:[17],22:[17],23:[18],24:[18],
        25:[19],26:[19],27:[20],28:[20],29:[21],30:[21],31:[22],32:[22],33:[25],34:[26],35:[27],36:[28],
        37:[29,30],38:[31,32],39:[33,34],40:[37,38],41:[38,39],42:[40,41],43:[41,42],44:[43,44,45],
        45:[46,47,48],46:[51,52,53],47:[55,56,57],48:[59,60],49:[60,61],50:[63,64,65],51:[67,68],52:[68,69],
        53:[71,72],54:[72,73],55:[75,76],56:[76,77],57:[78,79],58:[79,80],59:[83],60:[84],
        61:[87],62:[88],63:[89],64:[90],65:[91],66:[92],67:[93],68:[94],69:[95],70:[96],71:[97],72:[98],
        73:[101],74:[102],75:[103],76:[104],77:[105],78:[106],79:[107],80:[108],81:[109],82:[110],83:[111],84:[112],
        85:[115],86:[115,116],87:[116,117],88:[117],89:[118],90:[118,119],91:[119,120],92:[120],
        93:[121],94:[121,122],95:[122,123],96:[123],97:[125],98:[126],99:[127],100:[128],101:[129],102:[130],
        103:[131],104:[132],105:[133],106:[134],107:[135],108:[136],109:[139],110:[139],111:[140],112:[140],
        113:[141],114:[141],115:[142],116:[142],117:[145,146,147],118:[149],119:[150],120:[151],121:[152],122:[153],123:[154]
    };

    const exactTitles = [
        "Major 7ths", "Dominant 7ths", "Minor 7ths", "Half-Diminished", "Diminished 7ths", "Dominant 7ths sus4",
        "3-6-9 Major", "3-6-9 Minor", "3-7-9 Major", "3-7-9 Dominant", "3-7-9 Minor", "7-3-5 Major",
        "7-3-5 Dominant", "7-3-5 Minor", "7-3-5 Half-Diminished", "7-3-6 Major", "7-3-6 Dominant",
        "7-3-6 Minor", "4-7-9 Dominant sus4", "7-9-4-6 Dominant sus4"
    ];
    const keyOrder = ["C", "F", "B♭", "E♭", "A♭", "D♭", "F♯", "B", "E", "A", "D", "G"];
    const minorKeyOrder = ["C", "F", "B♭", "E♭", "G♯", "C♯", "F♯", "B", "E", "A", "D", "G"];
    const middleTitles = {
        33:"Major 7ths · Circle of Fifths",34:"Minor 7ths · Circle of Fifths",35:"Dominant 7ths · Circle of Fifths",
        36:"Dominant sus4 · Circle of Fifths",37:"Minor to Dominant",38:"Dominant to Major",39:"Dominant to Minor",
        40:"Major Keys · Format 1",41:"Major Keys · Format 2",42:"Minor Keys · Format 1",43:"Minor Keys · Format 2",
        44:"Major & Relative Minor · Format 1",45:"Major & Relative Minor · Format 2",46:"All Major Keys",
        47:"All Dorian Modes",48:"All Minor Keys",49:"All Major Keys",50:"All Dorian Modes",51:"Format 1",52:"Format 2",
        53:"Format 1",54:"Format 2",55:"Format 1",56:"Format 2",57:"Format 3",58:"Format 4",
        59:"13♭9 to 7♯9",60:"7♯5♯9 to 13",109:"Dominant 13",110:"Dominant 7♯9",
        111:"Dominant 7♭5♭9",112:"Dominant 7♯5♯9",113:"Dominant 13♭9",114:"Dominant 7♯5♭9",
        115:"Dominant 7♭5♯9",116:"Dominant 13♭5♭9",117:"Dominant Polychord Groups"
    };

    function moduleFor(id) {
        return window.PianoSkillsData.voicingModules.find(function (module) {
            return module.skills.some(function (skill) { return Number(skill) === id; });
        });
    }

    function titleFor(id) {
        if (id <= 20) return exactTitles[id - 1];
        if (id >= 21 && id <= 32) return keyOrder[id - 21] + " Major · Diatonic 7th Chords";
        if (middleTitles[id]) return middleTitles[id];
        if (id >= 61 && id <= 72) return "Blues in " + keyOrder[id - 61] + " · Formats a/b";
        if (id >= 73 && id <= 84) return "Fourth Voicings · Blues in " + keyOrder[id - 73] + " · Formats a/b";
        if (id >= 85 && id <= 96) return "Major 7th Blues in " + keyOrder[id - 85];
        if (id >= 97 && id <= 108) return "Minor Blues in " + minorKeyOrder[id - 97] + " · Formats a/b";
        if (id >= 118 && id <= 123) {
            const format = id <= 120 ? 1 : 2;
            const transposition = ((id - 118) % 3) + 1;
            return "Diminished Substitution · Format " + format + " · Transposition " + transposition;
        }
        return "Skill " + id;
    }

    const skills = Array.from({ length: 123 }, function (_, index) {
        const id = index + 1;
        const module = moduleFor(id);
        return {
            id: id,
            title: titleFor(id),
            moduleId: module.id,
            moduleTitle: module.title,
            tempo: module.tempo,
            pages: skillPages[id],
            summary: module.summary,
            concepts: module.concepts,
            practice: module.practice,
            guided: id <= 20
        };
    });

    const referenceSections = [
        { id:"cover", label:"표지", pages:[1] },
        { id:"intro", label:"기본 개념·Practice Tips", pages:[2,3] },
        { id:"block-notes", label:"Block Chords 설명", pages:[4] },
        { id:"shell-notes", label:"Shell Voicings 설명", pages:[8] },
        { id:"diatonic-notes", label:"Diatonic 7th Chords 설명", pages:[16] },
        { id:"cycle-notes", label:"Cycle·II-V-I 설명", pages:[24,36,50] },
        { id:"modal-notes", label:"Modal·Fourthy Voicings 설명", pages:[54,58,62,66,70,74,82] },
        { id:"blues-notes", label:"Blues Voicings 설명", pages:[86,100,114,124] },
        { id:"advanced-notes", label:"Polychords·Diminished Substitutions 설명", pages:[138,144,148] },
        { id:"course", label:"학기 과정표", pages:[155,156,157,158] }
    ];

    window.PianoSourceCatalog = { skills: skills, skillPages: skillPages, referenceSections: referenceSections };
})();
