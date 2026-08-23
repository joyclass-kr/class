# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm candlelight, no text or
letters in the image, old European cobbler's workshop and snowy village street,
expressive faces, wide panoramic composition, cosy and heartwarming.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The cobbler: a thin kindly old man with white hair, spectacles and a leather
apron. His wife: a round cheerful old woman in a shawl and cap. The two elves:
tiny bare-limbed sprites with wild hair and cheerful faces, later dressed in
bright little coats, hats and boots.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small cobbler's workshop at night seen through a frosted window, a pair of finished shoes glowing on the workbench under a candle, two tiny shadowy figures just slipping away, warm and cosy. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 마지막 가죽 한 장

| 파일명 | 장면 |
|---|---|
| `images/01-leather.png` | A thin old cobbler in spectacles laying out neatly cut leather pieces on a workbench by candlelight in a small tidy workshop, worn tools on the wall, warm quiet evening. |

## 2장 · 저절로 만들어진 신발

| 파일명 | 장면 |
|---|---|
| `images/02-shoes.png` | An old cobbler and his wife staring in astonishment at a pair of beautifully finished shoes on the workbench in morning light, the shop door open behind them, warm golden surprise. |

## 3장 · 밤마다 늘어나는 신발

| 파일명 | 장면 |
|---|---|
| `images/03-more.png` | A now-busy cobbler's shop with rows of fine shoes and boots on shelves, customers browsing happily, the old couple smiling behind the counter, bright cheerful daytime. |

## 4장 · 몰래 지켜본 밤

| 파일명 | 장면 |
|---|---|
| `images/04-watching.png` | Two tiny bare sprites perched on a workbench hammering and stitching shoes by moonlight, while an old couple peek from behind hanging coats with wide delighted eyes, cosy midnight workshop. |

## 5장 · 작은 옷을 만들다

| 파일명 | 장면 |
|---|---|
| `images/05-clothes.png` | An old woman sewing tiny colourful clothes and an old man tapping together miniature boots by lamplight, the finished little outfits laid neatly on the workbench, warm and tender. |

## 6장 · 옷을 입고 춤을 추며

| 파일명 | 장면 |
|---|---|
| `images/06-dance.png` | Two tiny elves now dressed in bright little coats, hats and boots dancing hand in hand across a workbench and leaping toward the door crack, the old couple watching fondly from the shadows, joyful. |

## 7장 · 남은 것

| 파일명 | 장면 |
|---|---|
| `images/07-after.png` | A prosperous cobbler shop in winter with the old couple working contentedly, and on the windowsill a tiny set of clothes laid out beside a candle, snow falling outside, warm and gently nostalgic. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
