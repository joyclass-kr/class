# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
7개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

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
bold clean outlines, saturated storybook colors, warm firelight, no text or
letters in the image, a small European woodcutter's cottage and surrounding
forest, very expressive comic faces, wide panoramic composition, funny and
good-natured.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The woodcutter: a stout cheerful man with a red nose, a leather apron and a big
beard. His wife: a lively woman in a headscarf and apron with quick hands and a
quicker tongue. The forest spirit: a small glowing figure with leafy hair and a
kindly amused expression.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a cosy cottage kitchen at evening where a startled couple stare at an enormous sausage floating in the air above their supper table, firelight glowing, comic and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 숲에서 만난 손님

| 파일명 | 장면 |
|---|---|
| `images/01-spirit.png` | A forest clearing where a burly woodcutter lowers his axe in surprise as a small glowing leafy spirit appears from behind a great oak, shafts of green light through the branches, gentle wonder. |

## 2장 · 소원 세 가지

| 파일명 | 장면 |
|---|---|
| `images/02-wishes.png` | A glowing forest spirit holding up three fingers before an astonished woodcutter, and the same man sprinting home down a woodland path with his axe forgotten behind him, comic energy. |

## 3장 · 저녁 밥상 앞에서

| 파일명 | 장면 |
|---|---|
| `images/03-table.png` | A cottage supper table with two thin bowls of gruel where a huge sausage suddenly drops onto a plate, the couple frozen mid-spoonful with enormous startled eyes, firelight, very funny. |

## 4장 · 아내의 불호령

| 파일명 | 장면 |
|---|---|
| `images/04-scold.png` | A cottage kitchen in full uproar, a red-faced wife jabbing her finger while her husband shouts back, the sausage sitting innocently on the table between them, pots rattling, riotously comic. |

## 5장 · 코에 붙은 소시지

| 파일명 | 장면 |
|---|---|
| `images/05-nose.png` | A wife standing in the middle of the kitchen with a huge sausage stuck fast to the end of her nose, both hands tugging at it while her husband pulls too, chairs knocked over, hysterically comic. |

## 6장 · 마지막 한 가지

| 파일명 | 장면 |
|---|---|
| `images/06-last.png` | An exhausted couple slumped on the floor of their cottage, the wife cradling the sausage on her nose while the husband looks at her with a softening, thoughtful expression, warm quiet firelight. |

## 7장 · 다시 죽 한 그릇

| 파일명 | 장면 |
|---|---|
| `images/07-ending.png` | A cottage table at night where a couple share a sausage cut in half, both laughing with their heads thrown back, the modest room glowing warm around them, deeply cosy and happy. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
