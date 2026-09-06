(() => {
    "use strict";
    // 햇비 — 본문·낱말·해설과 이 시의 문제.
    window.POETRY_PART = window.POETRY_PART || {};
    window.POETRY_PART["dongju-haetbi"] = {
        "poem": {
            "lines": [
                "아씨처럼 나린다",
                "보슬보슬 햇비",
                "맞아 주자 다 같이",
                "옥수숫대처럼 크게",
                "닷 자 엿 자 자라게",
                "햇님이 웃는다",
                "나 보고 웃는다",
                "",
                "하늘 다리 놓였다",
                "알롱알롱 무지개",
                "노래하자 즐겁게",
                "동무들아 이리 오나",
                "다 같이 춤을 추자",
                "햇님이 웃는다",
                "즐거워 웃는다"
            ],
            "words": [
                {
                    "word": "햇비",
                    "mean": "해가 난 채로 내리는 비"
                },
                {
                    "word": "닷 자 엿 자",
                    "mean": "다섯 자 여섯 자. 키를 재던 옛 단위"
                },
                {
                    "word": "동무",
                    "mean": "친구"
                }
            ],
            "note": [
                "햇비는 해가 난 날에 잠깐 내리는 비예요. 첫 도막은 그 비를 맞는 이야기고, 둘째 도막은 비 그친 뒤 무지개가 뜬 이야기예요.",
                "흉내내는 말이 줄마다 놓여 있어요. 비가 내리는 모습은 '보슬보슬', 무지개 빛깔은 '알롱알롱'이지요. 이런 말은 뜻을 설명하지 않고 곧바로 그림과 소리를 데려와요.",
                "'닷 자 엿 자'는 다섯 자 여섯 자라는 뜻으로 키를 재는 옛말이에요. 비를 맞으면 옥수숫대처럼 쑥쑥 크겠다는 마음이 담겼지요. 소리 내어 읽으면 정말 뛰어놀고 싶어져요."
            ]
        },
        "questions": [
            {
                "id": "haetbi-rain",
                "poemId": "dongju-haetbi",
                "category": "표현 찾기",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "비가 내리는 모습을 흉내낸 말은 무엇인가요?",
                "choices": [
                    "보슬보슬",
                    "알롱알롱",
                    "닷 자 엿 자"
                ],
                "answer": "보슬보슬",
                "explanation": "가늘게 내리는 비를 나타내는 말이에요."
            },
            {
                "id": "haetbi-rainbow",
                "poemId": "dongju-haetbi",
                "category": "표현 찾기",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "무지개를 흉내낸 말은 무엇인가요?",
                "choices": [
                    "알롱알롱",
                    "보슬보슬",
                    "즐거워"
                ],
                "answer": "알롱알롱",
                "explanation": "여러 빛깔이 어른어른 겹쳐 보이는 모습이에요."
            },
            {
                "id": "haetbi-grow",
                "poemId": "dongju-haetbi",
                "category": "장면 확인",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "아이들은 무엇처럼 크게 자라고 싶어 하나요?",
                "choices": [
                    "옥수숫대",
                    "버드나무",
                    "무지개"
                ],
                "answer": "옥수숫대",
                "explanation": "비를 맞고 쑥쑥 자라는 옥수숫대에 자기를 견주었어요."
            },
            {
                "id": "mimetic-shape",
                "poemId": "dongju-haetbi",
                "category": "표현 찾기",
                "prompt": "흉내내는 말에는 소리를 옮긴 것과 모습을 옮긴 것이 있어요.",
                "sentence": "'알롱알롱'은 무엇을 흉내낸 말인가요?",
                "choices": [
                    "빛깔이 어른거리는 모습",
                    "무지개가 내는 소리",
                    "비가 떨어지는 소리"
                ],
                "answer": "빛깔이 어른거리는 모습",
                "explanation": "눈으로 본 것을 옮긴 말이에요. 무지개는 소리를 내지 않아요."
            },
            {
                "id": "haetbi-simile",
                "poemId": "dongju-haetbi",
                "category": "표현 찾기",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "비가 내리는 모습을 누구에 견주었나요?",
                "choices": [
                    "아씨",
                    "무지개",
                    "옥수숫대"
                ],
                "answer": "아씨",
                "explanation": "'아씨처럼 나린다'고 했어요. 곱고 얌전하게 내린다는 뜻이에요."
            },
            {
                "id": "haetbi-sound-feel",
                "poemId": "dongju-haetbi",
                "category": "표현 찾기",
                "prompt": "소리 내어 읽고 답해 보세요.",
                "sentence": "'보슬보슬'을 '쏴아쏴아'로 바꾸면 무엇이 달라지나요?",
                "choices": [
                    "가늘던 비가 굵고 세차게 느껴져요",
                    "비가 그친 느낌이 들어요",
                    "아무 차이가 없어요"
                ],
                "answer": "가늘던 비가 굵고 세차게 느껴져요",
                "explanation": "같은 비라도 어떤 소리로 적느냐에 따라 세기가 달라져요."
            }
        ]
    };
})();
