# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, luminous northern light, no text
or letters in the image, Nordic castle, seashore, forest and cave settings,
expressive faces, wide panoramic composition, beautiful and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Elisa: a gentle determined girl about 12 with long dark hair and a simple linen
dress, later a plain gown. Her eleven brothers: princes with golden circlets who
turn into large white swans by day. The false queen: a tall woman in a black and
purple gown with cold eyes. The king of the neighbouring land: a kind young man
with a short beard and a green cloak.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: eleven white swans wheeling across an evening sky above a young girl standing on a seashore with a bundle of nettles in her arms, the low sun turning the water gold, beautiful and wistful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 열한 명의 오빠

| 파일명 | 장면 |
|---|---|
| `images/01-family.png` | A sunny castle courtyard where eleven boy princes play with a small laughing girl on their shoulders, and at an upper window a tall woman in dark robes watches them coldly, striking contrast. |

## 2장 · 백조가 된 오빠들

| 파일명 | 장면 |
|---|---|
| `images/02-swans.png` | Eleven great white swans rising from a castle courtyard into a pale morning sky as a small girl runs out with her arms raised, feathers drifting down, dramatic and moving. |

## 3장 · 바닷가에서의 재회

| 파일명 | 장면 |
|---|---|
| `images/03-reunion.png` | A rocky sea islet at sunset where eleven swans land and transform into young princes who embrace a weeping girl, waves breaking below, deeply emotional golden light. |

## 4장 · 쐐기풀 옷

| 파일명 | 장면 |
|---|---|
| `images/04-nettles.png` | A girl in a cave weaving shirts from green nettles by firelight, her hands red and blistered, finished shirts hanging on the wall behind her, quiet determination. |

## 5장 · 낯선 임금님

| 파일명 | 장면 |
|---|---|
| `images/05-king.png` | A young king on horseback pausing at a cave mouth where a silent girl looks up from her weaving, hunting party behind him, mossy forest light, gentle curiosity. |

## 6장 · 오해

| 파일명 | 장면 |
|---|---|
| `images/06-accused.png` | A stone tower room at night where a girl keeps weaving nettles by moonlight while whispering courtiers point at her through the doorway, tense and sad but not menacing. |

## 7장 · 마지막 한 벌

| 파일명 | 장면 |
|---|---|
| `images/07-finish.png` | A town square where a girl flings woven nettle shirts over eleven descending swans that transform into princes mid-air, the crowd falling back in astonishment, bright dramatic morning. |

## 8장 · 되찾은 말

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | Eleven princes reunited with their sister in a sunlit square, the youngest with one white swan wing instead of an arm smiling and shrugging, the king bowing to the girl, joyful celebration. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
