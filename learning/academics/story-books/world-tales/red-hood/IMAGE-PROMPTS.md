# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(빨간 모자, 늑대, 할머니, 사냥꾼)이 책 전체에 계속 등장하니, 매번 생김새를
비슷하게 유지하는 게 중요해요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, European forest and cottage setting, expressive
exaggerated character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Little Red Riding Hood: a cheerful girl about 7 years old, brown braided hair,
bright red hooded cape, blue dress with white apron, carrying a woven basket.
The Wolf: a large brown wolf standing upright, long snout, comically sly grin,
bushy tail. Grandmother: a kind plump elderly woman with white hair in a bun,
round glasses, pink nightgown and nightcap. The Huntsman: a sturdy bearded man
in a green hunting coat and cap.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a little girl in a bright red hooded cape walking away down a sunlit forest path with a basket on her arm, tall trees framing both sides, a pair of yellow wolf eyes barely visible in the shadows between the trunks, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 할머니 댁 심부름

| 파일명 | 장면 |
|---|---|
| `images/01-errand.png` | A mother handing a covered basket to a smiling girl in a red hooded cape at a cottage doorway on a bright morning, the mother raising one finger in gentle warning, a forest path visible in the distance behind them. |

## 2장 · 숲에서 만난 늑대

| 파일명 | 장면 |
|---|---|
| `images/02-wolf-meets.png` | A large wolf standing upright on a sunlit forest path leaning down with a friendly sly smile to talk to the girl in the red cape, one paw gesturing toward a patch of colorful wildflowers off the path, dappled light through leaves. |

## 3장 · 먼저 도착한 늑대

| 파일명 | 장면 |
|---|---|
| `images/03-wolf-arrives.png` | The wolf inside a cozy cottage bedroom pulling a frilly nightcap over his head and climbing into the grandmother's bed, a wardrobe door shut tight beside him, mischievous expression, warm lamplight. |

## 4장 · 할머니, 왜 그렇게 커요?

| 파일명 | 장면 |
|---|---|
| `images/04-questions.png` | The girl in the red cape standing beside the bed holding a bouquet of wildflowers, tilting her head with a puzzled look at the disguised wolf tucked under the covers with only his huge ears, eyes and snout showing, cozy but tense bedroom scene. |

## 5장 · 코를 고는 늑대

| 파일명 | 장면 |
|---|---|
| `images/05-snoring.png` | The wolf sprawled asleep on the bed with a comically round belly, snoring loudly, while a bearded huntsman in a green coat peeks in through the half-open cottage door with a suspicious frown, warm afternoon light. |

## 6장 · 배 속에서 나온 두 사람

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.png` | The huntsman kneeling beside the sleeping wolf with scissors as the girl in the red cape pops out joyfully, the grandmother stepping out of the opened wardrobe behind them, relieved happy expressions, warm cottage interior. |

## 7장 · 큰길로만

| 파일명 | 장면 |
|---|---|
| `images/07-lesson.png` | The girl, her grandmother and the huntsman sitting around a small table sharing bread, a jar of flowers in the middle, the grandmother patting the girl's head, warm cozy afternoon light through the window. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
