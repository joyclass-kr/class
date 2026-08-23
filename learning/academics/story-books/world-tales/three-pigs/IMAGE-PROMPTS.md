# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
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
bold clean outlines, saturated storybook colors, bright meadow greens and warm
brick reds, no text or letters in the image, a green hillside with three little
houses of straw, sticks and brick, and a cosy brick kitchen with a fireplace,
very expressive comic faces, wide panoramic composition, funny and never
frightening; the wolf is drawn as scrawny and theatrical.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The three pigs: the eldest plump and hasty in a red cap, the middle one lanky
and lazy in a blue scarf, the youngest small and steady in dungarees with a
trowel. Their mother: a round pig in an apron waving from a gate. The wolf: a
scrawny grey wolf with a long snout, always out of breath, drawn as comically
frustrated rather than scary.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: three little houses standing in a row on a green hillside — one of straw, one of sticks, one of brick — with three small pigs at their doors and a wolf's long shadow stretching up the slope, funny and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 집을 지어라

| 파일명 | 장면 |
|---|---|
| `images/01-leaving.png` | A green hillside where a mother pig in an apron waves from a gate as three young pigs set off in different directions with bundles, the eldest strutting, the middle yawning, the youngest carrying a trowel, sunny and lively. |

## 2장 · 짚으로 뚝딱

| 파일명 | 장면 |
|---|---|
| `images/02-straw.png` | A sunny meadow where a plump pig lounges in the shade beside a lopsided straw house, another pig strolling past laughing, and far down the slope a small pig pushing a barrow of bricks, comic contrast. |

## 3장 · 나뭇가지로 대충

| 파일명 | 장면 |
|---|---|
| `images/03-sticks.png` | A hillside with a rickety stick house leaning slightly, its owner admiring it, while nearby a small pig lays bricks one by one with mortar, blistered hands, patient and determined. |

## 4장 · 벽돌을 한 장씩

| 파일명 | 장면 |
|---|---|
| `images/04-bricks.png` | A finished brick cottage with a tiled roof, a straight chimney, shutters and a barred door, its small builder standing proudly in the yard while two brothers peer over the fence, warm and satisfying. |

## 5장 · 훅! 후!

| 파일명 | 장면 |
|---|---|
| `images/05-blown-down.png` | A night hillside where a straw house blows apart in a great gust from a wolf, and a stick house collapsing in the same wide scene, two pigs sprinting toward a distant brick cottage, dramatic and comic. |

## 6장 · 꿈쩍도 않는 집

| 파일명 | 장면 |
|---|---|
| `images/06-brick-house.png` | A brick cottage standing firm as a scrawny wolf puffs with all its might, cheeks ballooning, leaves swirling but not a tile moving, three pig faces at the window, hilariously comic. |

## 7장 · 굴뚝으로 내려온 늑대

| 파일명 | 장면 |
|---|---|
| `images/07-chimney.png` | A brick cottage interior where a pot bubbles on the hearth as a wolf shoots back up the chimney clutching its rear, and outside the wolf sprinting over the hill, three pigs laughing together, funny and warm. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
