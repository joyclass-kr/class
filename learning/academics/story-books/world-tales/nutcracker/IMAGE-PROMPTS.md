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
bold clean outlines, saturated storybook colors, warm candlelight and winter
blues, no text or letters in the image, 19th-century German parlour and
fantastical candy-kingdom settings, expressive faces, wide panoramic composition,
festive and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Clara: a girl about 9 with dark curls, a white nightgown with a red ribbon.
The Nutcracker: a painted wooden soldier with a red coat, gold braid and a big
jaw, later a young prince in the same red and gold. The Mouse King: a plump grey
mouse with a small crown and a cape, comically pompous rather than scary.
Godfather Drosselmeier: a tall old man with an eyepatch and a black cloak, warm
and mischievous. The Sugar Plum Fairy: a graceful woman in a pink shimmering gown.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a painted wooden nutcracker soldier standing beneath a candlelit Christmas tree at night, wrapped presents and a sleeping cat around its base, soft golden light and falling snow outside the window, warm and magical. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 크리스마스이브의 선물

| 파일명 | 장면 |
|---|---|
| `images/01-gift.png` | A festive 19th-century parlour with a huge candlelit Christmas tree and guests, a tall cloaked old man with an eyepatch handing a delighted girl a wooden nutcracker soldier, warm golden light. |

## 2장 · 부러진 턱

| 파일명 | 장면 |
|---|---|
| `images/02-broken.png` | A boy cracking an oversized nut in a wooden nutcracker while a girl reaches out in dismay, then the same girl carefully bandaging the toy's jaw with a handkerchief beside the tree, warm parlour light. |

## 3장 · 한밤중의 시계 소리

| 파일명 | 장면 |
|---|---|
| `images/03-midnight.png` | A girl in a nightgown suddenly tiny beneath a Christmas tree that now towers like a forest, toy soldiers stirring to life on the floor, grey mice streaming from cracks in the floorboards, magical night. |

## 4장 · 생쥐 왕과의 싸움

| 파일명 | 장면 |
|---|---|
| `images/04-battle.png` | A comic battle across a parlour floor between wind-up toy soldiers led by a nutcracker with a sword and an army of mice led by a small crowned mouse, a tiny girl hurling a slipper, energetic and funny. |

## 5장 · 왕자가 된 인형

| 파일명 | 장면 |
|---|---|
| `images/05-prince.png` | A wooden nutcracker transforming in a burst of golden light into a young prince in a red and gold coat, bowing and offering his hand to a small girl amid scattered toys, radiant and warm. |

## 6장 · 눈송이가 춤추는 숲

| 파일명 | 장면 |
|---|---|
| `images/06-snow.png` | A snowy forest where swirling snowflakes take the shape of dancing figures around a boy prince and a girl, leading to a silver river where a shell-shaped boat waits, moonlit and dreamlike. |

## 7장 · 과자 나라

| 파일명 | 장면 |
|---|---|
| `images/07-candy.png` | A dazzling kingdom of gingerbread houses, sugar roads and a chocolate fountain, dancers from many lands performing in a great hall as a graceful pink-gowned fairy welcomes a girl and a young prince, festive and colourful. |

## 8장 · 아침의 트리 아래

| 파일명 | 장면 |
|---|---|
| `images/08-morning.png` | Morning light filling a parlour where a girl wakes on a sofa beneath a Christmas tree hugging a mended nutcracker, an old man with an eyepatch smiling knowingly by the frosted window, warm and gentle. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
