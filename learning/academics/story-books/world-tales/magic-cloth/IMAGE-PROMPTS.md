# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm woodland and workshop
light, no text or letters in the image, a German village, a carpenter's shop, a
mill, a forest inn and a family cottage, expressive comic faces, wide panoramic
composition, funny and good-natured.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The three brothers: the eldest a broad carpenter with sawdust in his hair, the
second a wiry miller dusted with flour, the youngest a small quick lad with a
turner's apron. Their father: an old tailor with spectacles and a tape measure.
The innkeeper: a plump smiling man with restless eyes and a fine waistcoat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a white cloth spread on a forest floor laden with steaming dishes, a donkey standing behind it, and a wooden cudgel leaning against a tree, dappled green light through leaves, warm and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 집을 나선 삼형제

| 파일명 | 장면 |
|---|---|
| `images/01-leaving.png` | A village crossroads where three young brothers with bundles set off in three different directions while an old spectacled tailor waves from a cottage doorway, morning light, hopeful. |

## 2장 · 큰아들의 식탁보

| 파일명 | 장면 |
|---|---|
| `images/02-cloth.png` | A forest clearing where a broad young carpenter spreads a white cloth on the ground and steaming dishes appear on it out of nowhere, his mouth open in delight, dappled sunlight. |

## 3장 · 주막에서 생긴 일

| 파일명 | 장면 |
|---|---|
| `images/03-inn.png` | A candlelit inn room at night where a plump innkeeper swaps a folded white cloth for an identical one while a young man sleeps, and next a cottage where the same cloth lies flat and empty, comic dismay. |

## 4장 · 둘째의 당나귀

| 파일명 | 장면 |
|---|---|
| `images/04-donkey.png` | A stable yard where a wiry flour-dusted young man watches gold coins pour from a donkey's mouth into a straw-lined trough, and behind him an innkeeper peeking around the door post, comic greed. |

## 5장 · 막내의 자루

| 파일명 | 장면 |
|---|---|
| `images/05-sack.png` | A woodturner's workshop where an old master hands a small quick lad a worn sack, wood shavings curling on the floor, and the lad setting out with the sack over his shoulder wearing a knowing grin. |

## 6장 · 자루 속의 몽둥이

| 파일명 | 장면 |
|---|---|
| `images/06-cudgel.png` | A dark inn room where a wooden cudgel leaps out of a sack and chases a startled innkeeper around the furniture while a grinning lad sits up in bed, chairs toppling, hilariously comic. |

## 7장 · 돌려받은 물건들

| 파일명 | 장면 |
|---|---|
| `images/07-return.png` | An inn courtyard at dawn where a sheepish innkeeper leads out a donkey and holds out a white cloth to a young man who shoulders his sack, other guests peering from windows, comic relief. |

## 8장 · 한 상 가득

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A cottage yard packed with villagers feasting around a white cloth heaped with food, a donkey shedding gold coins nearby, an old tailor holding his three sons' hands, joyous celebration under evening lanterns. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
