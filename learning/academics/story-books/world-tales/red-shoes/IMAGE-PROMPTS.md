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
bold clean outlines, saturated storybook colors with one vivid red accent, warm
Danish village light, no text or letters in the image, a shoemaker's shop, a
village church, a country lane and a woodcutter's cottage, expressive faces, wide
panoramic composition, gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Karen: a girl about 10 with fair braids, first barefoot in a patched dress,
later in a neat dark dress with bright red shoes. The old lady: a kind
white-haired woman with spectacles and a lace collar. The shoemaker: a stooped
man with a leather apron and a curious half-smile. A woodcutter's wife: a sturdy
woman with kind eyes and flour on her hands.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a pair of bright red shoes standing alone in the middle of a moonlit village square, faint dancing footprints circling them, a small church and dark trees beyond, striking and slightly mysterious but not frightening. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 맨발의 아이

| 파일명 | 장면 |
|---|---|
| `images/01-barefoot.png` | A poor Danish cottage doorway where a barefoot girl receives a pair of clumsy red cloth shoes from a kindly woman, delight on the girl's face, spring mud and green fields beyond. |

## 2장 · 할머니 댁으로

| 파일명 | 장면 |
|---|---|
| `images/02-adopted.png` | A neat well-lit parlour where a white-haired lady in spectacles welcomes a small girl, a maid carrying away a pair of worn red cloth shoes, warm and comfortable interior. |

## 3장 · 구둣방 창가에서

| 파일명 | 장면 |
|---|---|
| `images/03-shop.png` | A shoemaker's shop with rows of shoes on shelves where a girl points at a pair of gleaming red leather shoes while a short-sighted old lady peers at the counter, the shoemaker smiling oddly. |

## 4장 · 온통 구두 생각

| 파일명 | 장면 |
|---|---|
| `images/04-church.png` | A village church interior where a girl in a pew stares down at her bright red shoes while everyone else looks forward, sunlight through a plain window catching only the shoes, telling composition. |

## 5장 · 멈추지 않는 춤

| 파일명 | 장면 |
|---|---|
| `images/05-dance.png` | A village dance spilling out into a moonlit field where a girl is carried away by her own dancing feet past startled villagers, red shoes glowing, hair and skirt streaming, dramatic but not scary. |

## 6장 · 벗겨지지 않는 구두

| 파일명 | 장면 |
|---|---|
| `images/06-stuck.png` | A misty dawn field where an exhausted girl clings to a birch trunk tugging at one red shoe that will not come off, tears on her face, soft grey light, sad but gentle. |

## 7장 · 나무꾼의 오두막

| 파일명 | 장면 |
|---|---|
| `images/07-cottage.png` | A woodcutter's cottage doorway at sunrise where a sturdy woman helps an exhausted girl sit on the step, and the red shoes slip off her feet onto the grass by themselves, warm relief. |

## 8장 · 다시 집으로

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A sunlit bedroom where a barefoot girl kneels beside an old lady's bed holding her hand, curtains open to a bright morning, and far off in a forest clearing a pair of red shoes lying in the grass. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
