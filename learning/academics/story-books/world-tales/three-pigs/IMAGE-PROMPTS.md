# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(삼형제, 엄마 돼지, 늑대)이 책 전체에 계속 등장하니, 매번 생김새를 비슷하게
유지하는 게 중요해요. 특히 삼형제는 옷 색으로 구분되게 해 주세요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, sunny countryside meadow and woodland setting, expressive
exaggerated character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Three little pigs standing upright, round and cheerful: the eldest wears a blue
cap and yellow overalls, the middle one wears a green vest, the youngest wears
red overalls and a small tool belt. Mother Pig: a plump kindly pig in a floral
apron and headscarf. The Wolf: a lanky grey-brown wolf standing upright in a
tattered black coat, long snout, comically greedy grin, big bushy tail.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: three cheerful little pigs standing proudly in front of a sturdy red brick house on a sunny hill, a straw house and a stick house visible smaller in the distance behind them, a wolf's tail just disappearing behind a tree, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 집을 지어라

| 파일명 | 장면 |
|---|---|
| `images/01-leaving.png` | A mother pig in a floral apron handing three small bundles to her three excited piglet sons outside a cozy farmhouse, the piglets grinning and waving, a sunny country road leading off toward distant woods. |

## 2장 · 짚으로 뚝딱

| 파일명 | 장면 |
|---|---|
| `images/02-straw.png` | The eldest pig lounging lazily in front of a hastily built straw house, hands behind his head, whistling, loose straw blowing off the wobbly walls in the breeze, bright sunny meadow. |

## 3장 · 나뭇가지로 대충

| 파일명 | 장면 |
|---|---|
| `images/03-sticks.png` | The middle pig waving off his youngest brother's concern in front of a crooked house of loosely tied sticks, the little house visibly leaning, the youngest pig pointing at it with a worried expression, woodland edge. |

## 4장 · 벽돌을 한 장씩

| 파일명 | 장면 |
|---|---|
| `images/04-bricks.png` | The youngest pig sweating as he carefully lays bricks with a trowel on a half-built brick house, while his two older brothers lean on the fence laughing and pointing at him, warm afternoon light. |

## 5장 · 훅! 후!

| 파일명 | 장면 |
|---|---|
| `images/05-blown-down.png` | The wolf puffing out his cheeks with tremendous force as a straw house explodes into flying straw, the eldest pig sprinting away in panic toward a stick house in the background, dramatic windswept night scene. |

## 6장 · 꿈쩍도 않는 집

| 파일명 | 장면 |
|---|---|
| `images/06-brick-house.png` | The wolf red-faced and exhausted, bent over gasping in front of a solid brick house that has not moved an inch, three pig faces peeking smugly out of the window, moonlit night. |

## 7장 · 굴뚝으로 내려온 늑대

| 파일명 | 장면 |
|---|---|
| `images/07-chimney.png` | Cutaway view of the brick house: the wolf sliding down the chimney with a shocked expression toward a big bubbling cauldron in the fireplace below, the three pigs watching wide-eyed from the side, warm firelight, comedic energy. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
