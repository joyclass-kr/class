(() => {
    "use strict";
    // 성탄제 — 본문·낱말·해설과 이 시의 문제.
    window.POETRY_PART = window.POETRY_PART || {};
    window.POETRY_PART["kimjonggil-seongtanje"] = {
        "poem": {
            "lines": [],
            "words": [],
            "point": "앓는 아이를 위해 아버지가 눈 속에서 구해 온 붉은 열매를, 어른이 되어 눈 오는 날 떠올려요.",
            "note": [
                "이 시는 아직 저작권이 살아 있어서 본문을 여기에 옮기지 못했어요. 교과서나 시집에서 찾아 읽어 보세요.",
                "제목의 성탄제는 크리스마스를 뜻해요. 그런데 시의 중심에 있는 것은 잔치가 아니라 아버지의 어떤 밤이에요.",
                "어린 시절, 말하는 이는 열이 나 앓아누워 있었어요. 아버지는 눈이 쌓인 밖으로 나가 붉은 열매를 구해 왔지요. 그 열매 하나가 이 시에서 가장 또렷한 빛깔이에요. 온통 하얀 눈 속에 붉은 점 하나가 찍힌 셈이거든요.",
                "시는 거기서 끝나지 않고 어른이 된 지금으로 옮겨 와요. 도시에 눈이 내리는 날, 문득 그 밤이 떠오르는 것이지요.",
                "어린 날의 한 장면과 어른이 된 지금을 이어 붙이는 짜임은 「엄마 걱정」과 닮았어요. 두 시를 나란히 읽어 보면 그 짜임이 더 잘 보여요."
            ]
        },
        "questions": [
            {
                "id": "seongtanje-father",
                "poemId": "kimjonggil-seongtanje",
                "category": "장면 확인",
                "prompt": "교과서에서 시를 읽고 답해 보세요.",
                "sentence": "아버지가 눈 속을 헤치고 구해 온 것은 무엇인가요?",
                "choices": [
                    "붉은 산수유 열매",
                    "약초 뿌리",
                    "장작"
                ],
                "answer": "붉은 산수유 열매",
                "explanation": "흰 눈 속의 붉은 열매라 빛깔이 또렷하게 남아요."
            },
            {
                "id": "seongtanje-why",
                "poemId": "kimjonggil-seongtanje",
                "category": "마음 읽기",
                "prompt": "교과서에서 시를 읽고 답해 보세요.",
                "sentence": "아버지가 그것을 구해 온 까닭은 무엇인가요?",
                "choices": [
                    "앓는 아들의 약으로 쓰려고",
                    "성탄절 상을 차리려고",
                    "이웃에게 팔려고"
                ],
                "answer": "앓는 아들의 약으로 쓰려고",
                "explanation": "열이 나는 아이에게 먹일 약이 그 열매였어요."
            },
            {
                "id": "seongtanje-now",
                "poemId": "kimjonggil-seongtanje",
                "category": "마음 읽기",
                "prompt": "교과서에서 시를 읽고 답해 보세요.",
                "sentence": "어른이 된 말하는 이가 눈을 보며 떠올리는 것은 무엇인가요?",
                "choices": [
                    "아버지의 사랑",
                    "어린 날의 병",
                    "성탄절 선물"
                ],
                "answer": "아버지의 사랑",
                "explanation": "세월이 흘러 그때 아버지 나이가 되어서야 그 마음을 알아요."
            }
        ]
    };
})();
