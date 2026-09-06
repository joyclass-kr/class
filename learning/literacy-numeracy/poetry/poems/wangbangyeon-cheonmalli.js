(() => {
    "use strict";
    // 천만 리 머나먼 길에 — 본문·낱말·해설과 이 시의 문제.
    window.POETRY_PART = window.POETRY_PART || {};
    window.POETRY_PART["wangbangyeon-cheonmalli"] = {
        "poem": {
            "lines": [
                "천만 리 머나먼 길에 고운 님 여의옵고",
                "내 마음 둘 데 없어 냇가에 앉았으니",
                "저 물도 내 안 같아서 울어 밤길 예놋다"
            ],
            "words": [
                {
                    "word": "여의옵고",
                    "mean": "이별하고"
                },
                {
                    "word": "내 안",
                    "mean": "내 마음속"
                },
                {
                    "word": "예놋다",
                    "mean": "가는구나"
                }
            ],
            "note": [
                "왕방연은 조선 시대 벼슬아치였어요. 임금 자리에서 밀려나 강원도 영월로 쫓겨 가는 어린 단종을 모시고 갔다가 혼자 돌아오는 길에 이 시조를 지었다고 전해져요.",
                "천만 리는 실제 거리가 아니라 아주 멀다는 말이에요. 그 먼 길에 임을 두고 왔으니 마음 둘 데가 없지요. 그래서 냇가에 그냥 주저앉아요.",
                "마지막 줄에서 냇물이 울며 밤길을 간다고 해요. 물이 울 리는 없지요. 우는 것은 앉아 있는 사람이에요. 제 마음을 앞에 있는 물에 옮겨 놓은 거예요.",
                "이렇게 제 마음을 다른 것에 옮겨 대신 울게 하는 방법은 옛 시에서 아주 자주 쓰였어요. 슬프다고 한 번도 말하지 않고 슬픔을 다 보여 주는 방법이지요."
            ]
        },
        "questions": [
            {
                "id": "cheonmalli-who",
                "poemId": "wangbangyeon-cheonmalli",
                "category": "장면 확인",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "말하는 이는 지금 어디에 앉아 있나요?",
                "choices": [
                    "냇가",
                    "산꼭대기",
                    "집 마당"
                ],
                "answer": "냇가",
                "explanation": "고운 님을 멀리 보내고 마음 둘 데가 없어 냇가에 앉았어요."
            },
            {
                "id": "cheonmalli-water",
                "poemId": "wangbangyeon-cheonmalli",
                "category": "표현 찾기",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "'저 물도 내 안 같아서 울어'에서 정말 우는 것은 누구인가요?",
                "choices": [
                    "말하는 이",
                    "냇물",
                    "떠나간 님"
                ],
                "answer": "말하는 이",
                "explanation": "물소리를 울음소리로 들은 거예요. 제 마음을 물에 옮겨 놓았어요."
            },
            {
                "id": "cheonmalli-night",
                "poemId": "wangbangyeon-cheonmalli",
                "category": "마음 읽기",
                "prompt": "시를 읽고 답해 보세요.",
                "sentence": "물이 '울어 밤길 예놋다'는 무슨 뜻인가요?",
                "choices": [
                    "울면서 밤길을 간다는 뜻",
                    "밤에는 물이 마른다는 뜻",
                    "밤에 물소리가 그친다는 뜻"
                ],
                "answer": "울면서 밤길을 간다는 뜻",
                "explanation": "물도 나처럼 밤새 울며 흘러간다고 본 거예요."
            }
        ]
    };
})();
