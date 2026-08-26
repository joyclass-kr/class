(function () {
    "use strict";

    const KEYS = [
        { id: "C", label: "C", pc: 0, spelling: "sharp" },
        { id: "F", label: "F", pc: 5, spelling: "flat" },
        { id: "Bb", label: "B♭", pc: 10, spelling: "flat" },
        { id: "Eb", label: "E♭", pc: 3, spelling: "flat" },
        { id: "Ab", label: "A♭", pc: 8, spelling: "flat" },
        { id: "Db", label: "D♭", pc: 1, spelling: "flat" },
        { id: "Gb", label: "G♭/F♯", pc: 6, spelling: "flat" },
        { id: "B", label: "B", pc: 11, spelling: "sharp" },
        { id: "E", label: "E", pc: 4, spelling: "sharp" },
        { id: "A", label: "A", pc: 9, spelling: "sharp" },
        { id: "D", label: "D", pc: 2, spelling: "sharp" },
        { id: "G", label: "G", pc: 7, spelling: "sharp" }
    ];

    const SCALE_TYPES = {
        major: { label: "Major Scale", intervals: [0, 2, 4, 5, 7, 9, 11, 12] },
        naturalMinor: { label: "Natural Minor Scale", intervals: [0, 2, 3, 5, 7, 8, 10, 12] },
        harmonicMinor: { label: "Harmonic Minor Scale", intervals: [0, 2, 3, 5, 7, 8, 11, 12] },
        melodicMinor: {
            label: "Melodic Minor Scale",
            intervals: [0, 2, 3, 5, 7, 9, 11, 12],
            descending: [12, 10, 8, 7, 5, 3, 2, 0]
        }
    };

    const FINGERING = {
        C:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        D:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        E:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        G:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        A:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        F:  { right: [1, 2, 3, 4, 1, 2, 3, 4], left: [5, 4, 3, 2, 1, 3, 2, 1] },
        B:  { right: [1, 2, 3, 1, 2, 3, 4, 5], left: [4, 3, 2, 1, 4, 3, 2, 1] },
        Db: { right: [2, 3, 1, 2, 3, 4, 1, 2], left: [3, 2, 1, 4, 3, 2, 1, 3] },
        Eb: { right: [3, 1, 2, 3, 4, 1, 2, 3], left: [3, 2, 1, 4, 3, 2, 1, 3] },
        Gb: { right: [2, 3, 4, 1, 2, 3, 1, 2], left: [4, 3, 2, 1, 3, 2, 1, 4] },
        Ab: { right: [3, 4, 1, 2, 3, 1, 2, 3], left: [3, 2, 1, 4, 3, 2, 1, 3] },
        Bb: { right: [2, 1, 2, 3, 4, 1, 2, 3], left: [3, 2, 1, 4, 3, 2, 1, 3] }
    };

    const SCALE_LESSONS = [
        {
            id: "scale-foundation",
            title: "Fingering Basics",
            eyebrow: "Fingering Number와 손바꿈",
            summary: "Thumb는 1번, Little Finger는 5번입니다. Note Name보다 손의 이동 지점을 먼저 익힙니다.",
            keys: ["C", "D", "E", "G", "A"],
            concepts: [
                "Both Hands 모두 Thumb부터 Little Finger까지 1·2·3·4·5로 셉니다.",
                "Right Hand Ascending은 Thumb-under, Left Hand Ascending은 Finger-over 동작을 사용합니다.",
                "Fingering Number는 Note Name이 아니라 건반 위에서 손이 이동하는 순서를 나타냅니다."
            ],
            practice: [
                "건반을 누르지 않고 1-2-3, 엄지 통과, 1-2-3-4-5 동작을 천천히 해 봅니다.",
                "One Octave를 Out of Tempo로 정확히 연결한 뒤 Metronome 60 BPM에서 한 박에 한 음씩 연주합니다.",
                "시선을 건반에서 떼고 손바꿈 지점의 촉감이 같은지 확인합니다."
            ]
        },
        {
            id: "scale-white",
            title: "White-key Starts",
            eyebrow: "C·D·E·G·A",
            summary: "다섯 Keys는 Common Fingering Pattern으로 먼저 묶어서 익힙니다.",
            keys: ["C", "D", "E", "G", "A"],
            concepts: [
                "Right Hand Ascending의 기본 Pattern은 1-2-3 | 1-2-3-4-5입니다.",
                "Left Hand Ascending의 기본 Pattern은 5-4-3-2-1 | 3-2-1입니다.",
                "Major·Natural Minor·Harmonic Minor·Melodic Minor Scale의 Half Step 위치가 달라도 손바꿈 Pattern을 먼저 유지합니다."
            ],
            practice: [
                "선택한 Scale을 Ascending만 연주하며 3번 뒤 Thumb 이동을 따로 점검합니다.",
                "Ascending과 Descending을 이어서 같은 Tempo로 연주합니다.",
                "다섯 Keys를 Circle of Fifths 또는 Half Step·Whole Step·Minor 3rd 순서로 바꾸어 연습합니다."
            ]
        },
        {
            id: "scale-exceptions",
            title: "F·B Fingering Exceptions",
            eyebrow: "White-key Start Exceptions",
            summary: "F Major의 Right Hand와 B Major의 Left Hand는 Common Pattern과 다른 손바꿈을 씁니다.",
            keys: ["F", "B"],
            concepts: [
                "F Major Right Hand는 1-2-3-4 | 1-2-3-4로, B♭에 Thumb를 놓지 않습니다.",
                "B Major Left Hand는 4-3-2-1 | 4-3-2-1로 두 Fingering Group의 모양을 반복합니다.",
                "Exception Fingering은 Black Key에 Thumb를 억지로 올리지 않고 손의 방향을 자연스럽게 유지합니다."
            ],
            practice: [
                "F Major Right Hand의 4-1, B Major Left Hand의 1-4 연결만 네 번 반복합니다.",
                "예외 지점 앞에서 멈추지 않고 느린 일정 박으로 통과합니다.",
                "Major Scale을 통과한 뒤 같은 Tonic의 세 Minor Scales와 Hand Shape를 비교합니다."
            ]
        },
        {
            id: "scale-black",
            title: "Black-key Starts",
            eyebrow: "D♭·E♭·G♭·A♭·B♭",
            summary: "Black Key에서 시작할 때는 2번이나 3번으로 출발하고 Thumb는 White Key에 놓습니다.",
            keys: ["Db", "Eb", "Gb", "Ab", "Bb"],
            concepts: [
                "Black-key Tonic은 보통 Right Hand 2번 또는 3번으로 시작합니다.",
                "Black Key에서 White Key로 내려오는 자리에 Thumb 1번을 사용합니다.",
                "Finger-over에서는 3번과 4번을 Key의 모양에 맞추어 번갈아 사용합니다."
            ],
            practice: [
                "첫 세 Notes만 반복해 Black-key Start Hand Shape를 기억합니다.",
                "Thumb가 닿는 White Key를 먼저 표시하고 나머지 Fingers를 채웁니다.",
                "눈을 감고 같은 Key의 Starting Shape를 다시 찾아 정확히 착지합니다."
            ]
        },
        {
            id: "scale-all-keys",
            title: "All Keys Pass",
            eyebrow: "12 Keys · Four Scale Types",
            summary: "48개 조합을 Wrong Note와 Hesitation 없이 연주해 완전히 익혔는지 확인합니다.",
            keys: KEYS.map((key) => key.id),
            concepts: [
                "Major Scale과 세 Minor Scales는 3rd·6th·7th의 차이를 귀와 손으로 함께 구별합니다.",
                "Melodic Minor는 Ascending에서 6th·7th를 올리고 Descending에서는 Natural Minor로 돌아옵니다.",
                "한 번의 우연한 성공보다 여러 조에서 같은 원리를 재현하는 것이 통과 기준입니다."
            ],
            practice: [
                "Out of Tempo로 Notes와 Fingering을 확인한 뒤 Target BPM으로 통과 시험을 합니다.",
                "Circle of Fifths, Half Step, Whole Step, Major·Minor 3rd 순서를 번갈아 사용해 Key를 바꿉니다.",
                "틀리거나 머뭇거리면 속도를 낮추고 해당 손바꿈만 고친 뒤 처음부터 다시 연주합니다."
            ]
        }
    ];

    function range(start, end) {
        return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
    }

    const VOICING_MODULES = [
        {
            id: "block", title: "Block Chords", skills: range(1, 6), tempo: 120,
            sourcePage:4,
            summary: "Voicing을 배우기 전에 Chord Structure(코드 구조)와 Chord Spelling(구성음 철자)을 확실히 익히는 챕터입니다.",
            concepts: ["Root·3rd·5th·7th를 정확히 말하고 눌러 Chord Spelling을 고정합니다.", "Root는 Left Hand에 두고 Right Hand로 Block Chord를 연주하거나, Both Hands로 같은 Block Chord를 연주합니다.", "Root·3rd·5th·7th 위에서 시작하는 네 Inversion(전위)을 같은 Chord로 인식합니다."],
            practice: ["각 Chord를 four beats의 Harmonic Rhythm으로 유지합니다.", "Quarter Notes로 Ascending 또는 Descending Arpeggio를, Eighth Notes로 왕복 Arpeggio를 연주합니다.", "네 Inversion을 Eighth Notes로 연결하며 틀린 음이나 멈춤 없이 통과합니다."]
        },
        {
            id: "shell", title: "Shell Voicings", skills: range(7, 20), tempo: 120,
            sourcePage:8,
            summary: "Common Voicing Shell의 음뿐 아니라 손가락 간격과 Hand Shape의 촉감을 Rote Learning으로 익히는 챕터입니다.",
            concepts: ["Voicing의 Note Names와 함께 손이 만드는 Spacing과 Shape를 기억합니다.", "흰건반 일부가 검은건반으로 바뀌어도 Hand Shape의 전체 촉감은 크게 달라지지 않습니다.", "Root를 Left Hand에 두는 형태와 Rootless Voicing을 Both Hands에서 모두 준비합니다."],
            practice: ["눈을 감고 Chromatic으로 Ascending·Descending하며 Hand Shape에 집중합니다.", "확실해지면 Whole Step과 Minor 3rd로 이동 간격을 넓힙니다.", "Voicing을 누른 뒤 손을 건반 위로 들어 올리고, 보지 않은 채 같은 Voicing에 다시 착지합니다.", "손의 높이를 점차 높여도 틀리지 않는지 확인합니다."]
        },
        {
            id: "diatonic", title: "Diatonic 7th Chords", skills: range(21, 32), tempo: 120,
            sourcePage:16,
            summary: "모든 Major Key의 Diatonic 7th Chords를 Key Signature, Chord Quality, Harmonic Function과 함께 익히는 챕터입니다.",
            concepts: ["Non-scale Tone 건반이 사라지고 한 Octave에 Scale Tone 일곱 개만 남았다고 시각화합니다.", "II·V·I뿐 아니라 III·IV·VI와 V의 Substitute로 쓰이는 VII의 Function을 함께 봅니다.", "Chord Quality의 Sound로 맞는 Voicing인지 확인하고, Key Signature 지식과 서로 교차 검증합니다."],
            practice: ["각 Key의 Major Scale을 먼저 연주한 뒤 I부터 VII까지 Diatonic 7th Chords를 연결합니다.", "각 Chord를 누르며 Roman Numeral과 Chord Quality를 소리 내어 말합니다.", "Circle of Fifths 순서로 12 Keys를 틀림없이 통과합니다."]
        },
        {
            id: "cycle", title: "Cycle Progressions", skills: range(33, 39), tempo: 120,
            sourcePage:24,
            summary: "전형적인 Progression에서 서로 다른 Inversion을 idiomatic하게 연결하며 smooth Voice Leading을 만드는 챕터입니다.",
            concepts: ["I-IV, Dominant 7th Cycle, Major II-V, Major·Minor V-I를 Cycle로 연결합니다.", "두 Inversion은 각 Chord의 3rd 또는 7th를 Bass에 둡니다.", "Common Tone은 유지하고 나머지 Voice는 Stepwise Motion으로 가장 가까운 음에 연결합니다.", "Skill 37에서는 Minor 7th의 5th를 낮춰 다음 Dominant 7th의 ♭9으로 유지하는 Minor II-V를 관찰합니다."],
            practice: ["두 Chord씩 Out of Tempo로 왕복하며 각 Voice의 이동을 확인합니다.", "Skill 37의 Minor II에서 Major 9th와 Minor 9th를 모두 시험합니다.", "두 Inversion과 Major·Minor 형태를 Circle of Fifths 전체에서 연결합니다."]
        },
        {
            id: "ii-v-i", title: "II-V-I in Major & Minor", skills: range(40, 45), tempo: 120,
            sourcePage:36,
            summary: "Cycle Progressions를 완전한 Major·Minor II-V-I Cadence로 확장하고, Common Tone과 Stepwise Voice Leading으로 부드럽게 연결합니다.",
            concepts: ["Format 1의 첫 II는 7th 위의 7-3-5 Voicing이며 Key Center와 연결됩니다.", "II→V에서는 위 두 Voice를 Common Tone으로 두고 아래 Voice가 Half Step Descending합니다.", "V→I에서는 아래 Voice를 유지하고 위 두 Voice가 Scale 안에서 Stepwise Descending합니다.", "Skill 43의 Half-diminished II에 있는 ♭9은 Bebop 어법의 Tension이므로 짧게 연주할 수 있습니다.", "Skills 44-45는 Major Key와 Relative Minor를 한 Progression으로 연결합니다."],
            practice: ["각 Voice의 Horizontal Motion을 따로 말하고 노래한 뒤 연주합니다.", "Skill 43의 ♭9 Chord는 Short Duration과 Sustained Duration을 비교합니다.", "Major와 Minor Format을 따로 통과한 뒤 Relative Major-Minor Progression으로 연결합니다.", "틀린 음과 Hesitation 없이 Chord Symbol만 보고 연주합니다."]
        },
        {
            id: "i-iv", title: "I-IV Cycle Progression", skills: ["46"], tempo: 120,
            sourcePage:50,
            summary: "I에서 IV로 이동한 뒤 그 IV를 새로운 Key Center의 I로 바꾸는 common Cycle Progression을 모든 Major Key에서 익힙니다.",
            concepts: ["첫 I는 7th 위의 7-3-5 Voicing이며 Leading Tone에서 시작합니다.", "첫 Voicing은 Key의 III Chord를 2nd Inversion으로 본 형태와 같습니다.", "Diatonic Motion과 Chromatic Alteration을 Voice별로 구분하고, 두 번째 Measure의 Half-diminished Chord부터 Right Hand Bottom Voice가 다음 Key의 Leading Tone까지 Chromatic Descending하는 것을 봅니다."],
            practice: ["각 Key의 첫 네 Chords가 Relative Minor Modulation으로 들리는지 확인합니다.", "Dominant 7th Alteration을 하나 선택하고 모든 Keys에서 같은 Alteration을 유지합니다.", "각 Voice의 움직임을 따로 연습한 뒤 12 Keys를 멈춤 없이 Cycle로 연결합니다."]
        },
        {
            id: "modal-fourths", title: "Modal Fourthy Voicings", skills: ["47"], tempo: 120,
            sourcePage:54,
            summary: "Dorian Mode 안에서 Diatonic Fourthy Voicing을 이동하며 Scale Degree에 따라 달라지는 Interval Structure를 익힙니다.",
            concepts: ["1st·2nd·4th·5th·6th Degree의 Voicing은 Perfect 4ths로 쌓입니다.", "3rd Degree는 아래에 Tri-tone, 7th Degree는 위에 Tri-tone이 생깁니다.", "Modal Key Signature와 Fourthy Structure를 서로 확인 수단으로 사용합니다."],
            practice: ["Non-scale Tone 건반이 사라지고 Dorian의 일곱 음만 남았다고 시각화합니다.", "각 위치의 Perfect 4th와 Tri-tone을 말하며 맞는 Sound를 기억합니다.", "모든 Dorian Modes를 Circle of Fifths로 이동합니다."]
        },
        {
            id: "so-what", title: "“So What” Voicings", skills: ["48", "49"], tempo: 120,
            sourcePage:58,
            summary: "Miles Davis의 ‘So What’으로 알려진 Three Perfect 4ths + Major 3rd 구조를 Minor·Major Chord Family에 적용합니다.",
            concepts: ["Skill 48은 Dorian의 1st·2nd·5th Degree에서 같은 Modal Center의 Minor 7th Chord와 연결됩니다.", "Skill 49는 Lydian의 3rd·6th·7th Degree에서 같은 Modal Center의 Major 7th Chord와 연결됩니다.", "아래부터 Three Perfect 4ths와 Major 3rd가 쌓인 Five-note Voicing입니다.", "Right Hand의 위 세 음은 2nd Inversion Major Triad, Left Hand의 아래 세 음은 Two Perfect 4ths로 느낄 수 있습니다.", "Skill 48 Voicing은 Root가 Perfect 5th 아래에 있는 Unaltered Dominant 7th에도 사용할 수 있습니다."],
            practice: ["Five-note Voicing의 Middle Note를 어느 Hand가 맡을지 두 가지 Fingering을 비교합니다.", "Chromatic으로 이동한 뒤 Diatonic Voicing의 Half Step 위·아래에서 Side-slipping합니다.", "12 Minor Keys와 12 Major Keys에서 같은 Structure를 재현합니다."]
        },
        {
            id: "modal-so-what", title: "Modal “So What” Voicings", skills: ["50"], tempo: 120,
            sourcePage:62,
            summary: "‘So What’ Voicing을 Dorian Mode의 각 Degree로 옮기며 Mode 안에 머물도록 달라지는 3rd와 4th의 종류를 익힙니다.",
            concepts: ["1st·2nd·5th Degree는 Three Perfect 4ths + Major 3rd의 pure ‘So What’ Structure를 유지합니다.", "나머지 Degree에서는 Dorian Mode에 맞추기 위해 Interval Structure가 달라집니다.", "Modal Key Signature와 Voicing Structure를 서로 확인해 맞는 Sound와 오류를 구별합니다."],
            practice: ["Dorian의 일곱 Degree 위에 Voicing을 천천히 쌓습니다.", "각 위치의 Major·Minor 3rd와 Perfect·Augmented 4th를 말합니다.", "Notation을 보지 않고 Key Signature와 Hand Shape의 촉감으로 이동합니다."]
        },
        {
            id: "fourthy-ii-v-i", title: "Fourthy II-V-I", skills: ["51", "52"], tempo: 120,
            sourcePage:66,
            summary: "Skill 48의 ‘So What’ Voicing을 II의 Root와 I의 3rd 위에 두고, 중간 V 자리는 Chromatic Side-slipping으로 I에 Resolution합니다.",
            concepts: ["중간의 V 표기는 실제 Dominant Voicing이라기보다 I로 가는 Passing Sound입니다.", "이 V Sound는 강조하지 않고 Short Rhythmic Duration으로 처리합니다.", "Skill 51은 Parallel Chromatic Ascending, Skill 52는 tune-like한 Smooth Melodic Curve를 만듭니다."],
            practice: ["II와 I의 ‘So What’ Structure를 먼저 고정합니다.", "V Sound를 짧게 두고 I Resolution 방향이 들리는지 확인합니다.", "Format 1과 Format 2의 서로 다른 Melodic Motion을 모든 Keys에서 비교합니다."]
        },
        {
            id: "tritone-ii-v-i", title: "Tri-Tone Sub II-V-I", skills: ["53", "54"], tempo: 120,
            sourcePage:70,
            summary: "Normal II-V와 Tri-tone 떨어진 II-V를 결합해 먼 Key로 갑자기 Modulation하는 듯한 Deceptive Cadence를 만듭니다.",
            concepts: ["Dominant Chord는 Perfect 5th Descending뿐 아니라 Half Step Descending으로도 강하게 Resolution합니다.", "첫 II는 7th 위의 7-3-5 Voicing이며 Key Center와 연결됩니다.", "II→V는 위 두 Voice가 Common Tone이고 아래 Voice가 Half Step Descending합니다.", "V→♭VI와 ♭II→I는 같은 Inversion을 유지하며, ♭VI→♭II는 Outside Voices를 유지하고 Middle Voice만 Half Step Descending합니다."],
            practice: ["각 연결에서 Common Tone을 실제 손가락으로 남긴 채 나머지 Voice만 이동합니다.", "Format별 Horizontal Voice Leading을 한 Voice씩 노래한 뒤 연주합니다.", "Stepwise Motion과 같은 Inversion을 유지해 빠르기보다 Smooth Connection을 우선합니다."]
        },
        {
            id: "polychord-ii-v-i", title: "Polychordal II-V-I", skills: range(55, 58), tempo: 120,
            sourcePage:74,
            summary: "Left Hand의 conventional inversion 위에 Right Hand Triadic Structure를 겹쳐 Extension과 Alteration을 만드는 Polychordal II-V-I입니다.",
            concepts: ["Skill 55의 첫 Left Hand는 II의 3rd 위에 놓인 3-7-9 Voicing입니다.", "Right Hand는 Key의 Triad를 2nd Inversion으로 두고 Parallel Chromatic Ascending합니다.", "Left Hand Top Voice는 반대 방향으로 Chromatic Descending합니다.", "전체 목표는 Common Tone과 Stepwise Motion 중심의 Smooth Voice Leading입니다."],
            practice: ["Left Hand conventional inversion과 Right Hand Triad를 따로 외운 뒤 합칩니다.", "Right Hand Ascending과 Left Hand Top Voice Descending을 느리게 분리 연습합니다.", "네 Formats에서 각 Voice의 Horizontal Motion을 확인한 뒤 Chord Symbol만 보고 연주합니다."]
        },
        {
            id: "altered-dominants", title: "Cycling Altered Dominants", skills: ["59", "60"], tempo: 120,
            sourcePage:82,
            summary: "Left Hand Dominant Structure와 Right Hand Triad를 결합해 Extension·Alteration을 만들고 Circle of Fifths로 순환합니다.",
            concepts: ["Skill 59에서 Left Hand는 1-7 Shell과 1-3 Shell을 번갈아 사용합니다.", "첫 Right Hand는 Dominant Root의 Major 6th 위 Major Triad를 2nd Inversion으로 둡니다.", "Right Hand는 Parallel Chromatic Descending하고, Left Hand Top Voice도 Chromatic Descending합니다.", "Left Hand Bottom Voice의 Root만 Circle of Fifths로 이동합니다."],
            practice: ["Left Hand Shell 교대와 Circle of Fifths Root만 먼저 연습합니다.", "Right Hand Major Triad의 Parallel Chromatic Descending을 따로 연결합니다.", "13♭9→7♯9과 7♯5♯9→13 두 Formats를 Smooth Voice Leading으로 합칩니다."]
        },
        {
            id: "polychord-blues", title: "Polychordal Blues Voicings", skills: range(61, 72), tempo: 132,
            sourcePage:86,
            summary: "Left Hand conventional inversion과 Right Hand Triadic Structure를 결합해 12-bar Blues의 Two-hand Polychordal Voicing을 만듭니다.",
            concepts: ["Skill 61의 첫 Left Hand는 I의 7th 위에 놓인 7-3-6 Voicing이고, Right Hand는 Key Triad의 1st Inversion입니다.", "Bar 1→2에서 Right Hand Top Voice는 Common Tone, 나머지 두 Voice는 Stepwise Ascending합니다.", "같은 연결에서 Left Hand 아래 두 Voice는 Half Step Descending, Top Voice는 Whole Step Descending합니다.", "Upper Triad는 대체로 Basic Triad이며 VI와 II에서만 Extension·Alteration을 만듭니다."],
            practice: ["한 Key의 12 bars를 Format 1과 Format 2로 나누어 익힙니다.", "Bar 사이 Common Tone을 손가락으로 남기고 Stepwise Voice만 이동합니다.", "C-F-B♭ 순의 Circle of Fifths로 12 Keys를 132 BPM까지 연결합니다."]
        },
        {
            id: "fourthy-blues", title: "Fourthy Blues Voicings", skills: range(73, 84), tempo: 132,
            sourcePage:100,
            summary: "Left Hand conventional inversion 위에 Right Hand의 Two Perfect 4ths를 얹어 12-bar Blues의 Two-hand Fourthy Voicing을 만듭니다.",
            concepts: ["Skill 73의 첫 Left Hand는 I의 7th 위 7-3-6 Voicing이고, Right Hand는 2-5-8 Voicing입니다.", "Bar 1→2에서 Right Hand 세 Voice는 모두 Common Tone이며, Left Hand 아래 두 Voice는 Half Step, Top Voice는 Whole Step Descending합니다.", "Bar 7→8에서는 모든 Voice가 Minor 3rd Parallel Ascending합니다.", "Upper Fourths는 대체로 Unaltered Chord Tones이고 Bar 8의 VI에서 Extension·Alteration이 생깁니다."],
            practice: ["Right Hand의 Two Perfect 4ths Hand Shape를 먼저 고정합니다.", "Left Hand의 Half Step·Whole Step Voice Leading을 따로 연습합니다.", "Bar 7→8의 Minor 3rd Parallel Motion을 반복한 뒤 두 Formats와 12 Keys를 연결합니다."]
        },
        {
            id: "major7-blues", title: "Major 7th Blues Voicings", skills: range(85, 96), tempo: 120,
            sourcePage:114,
            summary: "앞에서 익힌 Major II-V-I, I-IV Cycle, Tri-Tone II-V-I를 하나의 12-bar Blues Progression에 통합합니다.",
            concepts: ["Bars 1-4는 I-IV Cycle과 같습니다.", "Bars 6-8은 Chromatic Descending으로 Modulation하는 Major II-V의 연속입니다.", "Bars 9-10은 Tri-Tone II-V Progression입니다.", "전체 목표는 Common Tone과 Stepwise Motion을 이용한 Smooth Voice Leading입니다."],
            practice: ["세 구간을 각각 이전 Skill과 대조해 따로 통과합니다.", "각 Bar에서 사용된 이전 Progression 이름을 말하며 연주합니다.", "세 구간을 12 bars로 합쳐 12 Keys에서 120 BPM 무정지 통과를 목표로 합니다."]
        },
        {
            id: "minor-blues", title: "Minor Blues Voicings", skills: range(97, 108), tempo: 132,
            sourcePage:124,
            summary: "Minor Blues에서 Left Hand conventional inversion과 Right Hand의 Two Perfect 4ths를 결합한 Two-hand Voicing을 익힙니다.",
            concepts: ["Skill 97의 첫 Left Hand는 I의 7th 위 7-3-5 Voicing이고, Right Hand는 Key Center에서 아래로 쌓은 2-5-8 Voicing입니다.", "Bar 1→2에서 Right Hand 세 Voice와 Left Hand 위 두 Voice는 Common Tone이며, Left Hand Bottom Voice만 Whole Step Descending합니다.", "Upper Fourths는 대체로 Unaltered Chord Tones입니다.", "Bars 4·10·12의 Dominant Chords에서만 Extension·Alteration이 생깁니다."],
            practice: ["I→IV의 Common Tone을 유지하고 Left Hand Bottom Voice만 이동하는 연결부터 익힙니다.", "Bars 4·10·12의 Altered Dominant Sound를 따로 확인합니다.", "두 Formats를 C-F-B♭ 순의 12 Minor Keys에서 132 BPM까지 연결합니다."]
        },
        {
            id: "dominant-polychords", title: "Dominant 7th Polychords", skills: range(109, 116), tempo: 120,
            sourcePage:138,
            summary: "Dominant 7th 위에 Upper-structure Triad를 겹치는 Polychord Formula로 다양한 Extension과 Alteration의 색채를 만듭니다.",
            concepts: ["Upper Major Triad는 Dominant Root의 Whole Step·Minor 3rd·Tri-tone·Minor 6th·Major 6th 위에 놓을 수 있습니다.", "Upper Minor Triad는 Dominant Root의 Half Step·Minor 3rd·Tri-tone 위에 놓습니다.", "Basic Dominant 7th의 5th는 생략합니다. Upper Triad의 Altered 5th가 그 기능을 대신하거나 5th 자체가 Dispensable Tone이기 때문입니다.", "각 관계를 ‘Upper Triad over Dominant Root = Dominant Sound’라는 Formula로 기억합니다."],
            practice: ["Upper Triad와 Dominant Root의 Interval 관계를 말한 뒤 누릅니다.", "Left Hand를 Root Position에서 3-7-9 또는 7-3-6 Voicing으로 바꿉니다.", "Right Hand Triad의 Inversion을 바꾸고 한 Note를 Octave Doubling해 Variations를 만듭니다."]
        },
        {
            id: "polychord-groups", title: "Dominant Polychord Groups", skills: ["117"], tempo: 96,
            sourcePage:144,
            summary: "Skills 109-113의 Polychord Formulas를 Melodic Motion으로 연결해 Harmony는 유지하면서 Dominant 7th의 Color를 변화시킵니다.",
            concepts: ["모든 Upper Structures는 Major Triads가 Parallel Motion으로 이동합니다.", "원문 Sequence는 Half Step Up → Minor 3rd Up → Whole Step Up → Half Step Up입니다.", "표기는 Root Position Triads이지만 Both Hands 모두 다른 Inversion을 사용할 수 있습니다.", "긴 Dominant 7th Duration이 있는 Ballad에서 Color와 Melody를 움직이는 방법으로 쓸 수 있습니다."],
            practice: ["Left Hand Dominant를 유지한 채 Right Hand Major Triads만 원문 Sequence로 이동합니다.", "Upper Triad의 Inversion을 바꾸어 다른 Melodic Line을 비교합니다.", "Polychord의 조합과 이동 방향을 바꾸어 자신의 Variation을 만듭니다."]
        },
        {
            id: "diminished-sub", title: "Diminished Substitutions", skills: range(118, 123), tempo: 96,
            sourcePage:148,
            summary: "Dominant 7th와 연결되는 Half-Whole Diminished Scale의 13♭9 Voicing을 Minor 3rd Parallel Motion으로 이동해 여러 지점에서 I로 Resolution합니다.",
            concepts: ["하나의 Half-Whole Diminished Scale은 Minor 3rd 간격의 네 Dominant 7th Chords와 연결됩니다.", "Resolution 직전의 13♭9 Voicing 외 세 Voicings는 다른 Dominant로 Transposition된 형태지만 Main Dominant 위에서도 사용할 수 있습니다.", "모든 Voicing은 같은 Diminished Scale의 Notes만 사용하며 Minor 3rd로 Parallel Ascending·Descending합니다.", "Sequence는 원하는 Landing에서 내려 I로 Resolution할 수 있는 계단처럼 생각합니다."],
            practice: ["Quarter-note Voicings를 Two or Three Octaves에 걸쳐 Ascending·Descending합니다.", "빠른 Tempo에서는 두 Voicings, Ballad에서는 다섯·여섯 Voicings 뒤에 Resolution해 봅니다.", "13♭9 외의 세 Transposition에서도 자신만의 I Resolution을 만듭니다."]
        }
    ];

    const BLOCK_SKILLS = [
        { id: "1", label: "Major 7ths", suffix: "maj7", intervals: [0, 4, 7, 11] },
        { id: "2", label: "Dominant 7ths", suffix: "7", intervals: [0, 4, 7, 10] },
        { id: "3", label: "Minor 7ths", suffix: "m7", intervals: [0, 3, 7, 10] },
        { id: "4", label: "Half-Diminished", suffix: "m7♭5", intervals: [0, 3, 6, 10] },
        { id: "5", label: "Diminished 7ths", suffix: "dim7", intervals: [0, 3, 6, 9] },
        { id: "6", label: "Dominant 7ths sus4", suffix: "7sus4", intervals: [0, 5, 7, 10] }
    ];

    const SHELL_SKILLS = [
        { id: "7", label: "3-6-9 Major", suffix: "6/9", intervals: [4, 9, 14] },
        { id: "8", label: "3-6-9 Minor", suffix: "m6/9", intervals: [3, 9, 14] },
        { id: "9", label: "3-7-9 Major", suffix: "maj9", intervals: [4, 11, 14] },
        { id: "10", label: "3-7-9 Dominant", suffix: "9", intervals: [4, 10, 14] },
        { id: "11", label: "3-7-9 Minor", suffix: "m9", intervals: [3, 10, 14] },
        { id: "12", label: "7-3-5 Major", suffix: "maj7", intervals: [11, 16, 19] },
        { id: "13", label: "7-3-5 Dominant", suffix: "7", intervals: [10, 16, 19] },
        { id: "14", label: "7-3-5 Minor", suffix: "m7", intervals: [10, 15, 19] },
        { id: "15", label: "7-3-5 Half-Diminished", suffix: "m7♭5", intervals: [10, 15, 18] },
        { id: "16", label: "7-3-6 Major", suffix: "6", intervals: [11, 16, 21] },
        { id: "17", label: "7-3-6 Dominant", suffix: "13", intervals: [10, 16, 21] },
        { id: "18", label: "7-3-6 Minor", suffix: "m6", intervals: [10, 15, 21] },
        { id: "19", label: "4-7-9 Dominant sus4", suffix: "9sus4", intervals: [5, 10, 14] },
        { id: "20", label: "7-9-4-6 Dominant sus4", suffix: "13sus4", intervals: [10, 14, 17, 21] }
    ];

    const PRACTICE_PRINCIPLES = [
        "Notation보다 One Octave 아래가 더 풍성하게 들리면 Register를 내려 연주합니다.",
        "Voicing 사이의 Interval·Common Tone·Voice Leading 관계를 찾아 말합니다.",
        "처음에는 Out of Tempo로 문제를 익힌 뒤 느린 Metronome으로 옮깁니다.",
        "Target Tempo에서 Practice Run을 해 현재 상태를 확인합니다.",
        "Wrong Note나 Hesitation이 한 번이라도 있으면 아직 통과하지 않은 것으로 봅니다.",
        "Circle of Fifths뿐 아니라 Half Step·Whole Step·Major 3rd·Minor 3rd 순서로도 All Keys를 연습합니다.",
        "Swing·Bossa Nova 같은 반복 Rhythm을 입혀 실제 음악처럼 연주합니다.",
        "Smooth Progression은 손을 가능한 한 보지 않고 Voicing Shape와 촉감에 집중합니다.",
        "Printed Notation에서 빨리 벗어나 Chord Symbol과 기억만으로 연주합니다.",
        "배운 Voicing으로 간단한 Chord Progression을 Sight-reading하며 실제 적용을 확인합니다."
    ];

    const SEMESTER_TRACKS = {
        foundation: ["1-3", "4-6", "9-11", "12-14", "15·19·20", "21·22·32", "33·34", "35·36", "37", "38", "40", "42", "43", "Chord Progression Sight-reading 시험"],
        advanced: ["44·45", "46", "47", "48·49", "53·54", "55·58", "59·60", "61-64·70-72 중 임의의 한 조", "73-76·82-84 중 임의의 한 조", "85-88·94-96 중 임의의 한 조", "97-100·106-108 중 임의의 한 조", "117", "118-120"]
    };

    window.PianoSkillsData = {
        keys: KEYS,
        scaleTypes: SCALE_TYPES,
        fingering: FINGERING,
        scaleLessons: SCALE_LESSONS,
        voicingModules: VOICING_MODULES,
        blockSkills: BLOCK_SKILLS,
        shellSkills: SHELL_SKILLS,
        practicePrinciples: PRACTICE_PRINCIPLES,
        semesterTracks: SEMESTER_TRACKS
    };
})();
