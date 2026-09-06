(() => {
    "use strict";
    // 두껍아 두껍아 — 본문·낱말·해설과 이 시의 문제.
    window.POETRY_PART = window.POETRY_PART || {};
    window.POETRY_PART["folk-dukkeobi"] = {
        "poem": {
            "lines": [
                "두껍아 두껍아",
                "헌 집 줄게",
                "새 집 다오"
            ],
            "words": [
                {
                    "word": "헌",
                    "mean": "낡은"
                },
                {
                    "word": "다오",
                    "mean": "달라는 뜻의 옛말"
                }
            ],
            "note": [
                "아이들이 모래밭에서 놀 때 부르던 노래예요. 손등에 모래를 덮고 토닥토닥 다진 뒤 손을 살살 빼면 굴이 하나 생기지요. 그 굴을 두꺼비 집이라고 불렀어요.",
                "세 줄밖에 안 되는데 부르는 말과 주고받는 말이 다 들어 있어요. '두껍아 두껍아' 하고 부르고, 헌 집을 줄 테니 새 집을 달라고 하지요.",
                "두꺼비는 대답하지 않아요. 그래도 아이들은 진짜 바꾸기라도 한 것처럼 신이 났어요. 놀이가 노래가 되고 노래가 다시 놀이가 되는 셈이에요."
            ]
        },
        "questions": [
            {
                "id": "dukkeobi-trade",
                "poemId": "folk-dukkeobi",
                "category": "장면 확인",
                "prompt": "노래를 읽고 답해 보세요.",
                "sentence": "두꺼비에게 주겠다고 한 것은 무엇인가요?",
                "choices": [
                    "헌 집",
                    "새 집",
                    "모래 한 줌"
                ],
                "answer": "헌 집",
                "explanation": "헌 집을 줄 테니 새 집을 달라고 조르는 노래예요."
            },
            {
                "id": "dukkeobi-short",
                "poemId": "folk-dukkeobi",
                "category": "표현 찾기",
                "prompt": "노래를 읽고 답해 보세요.",
                "sentence": "세 줄뿐인 이 노래에 들어 있는 것은 무엇인가요?",
                "choices": [
                    "부르는 말과 주고받는 말",
                    "묻는 말과 대답하는 말",
                    "흉내내는 말만 여럿"
                ],
                "answer": "부르는 말과 주고받는 말",
                "explanation": "'두껍아 두껍아'가 부르는 말이고, '줄게 / 다오'가 주고받는 말이에요."
            }
        ]
    };
})();
