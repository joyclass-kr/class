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
bold clean outlines, saturated storybook colors, soft Flemish light with warm
lanterns against cool blue snow, no text or letters in the image, a Belgian
village, windmills, canals, a market square and a great cathedral interior,
expressive faces, wide panoramic composition, warm and gentle, never grim.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Nello: a boy about 12 with fair hair, a patched coat and a charcoal stick always
in his pocket. Patrasche: a large tawny Flemish draft dog with a broad head and
steady eyes. Grandfather Jehan: a bent old man with a white beard and a kind
face. Aloise: a rosy-cheeked girl in a blue pinafore. Her father: a stout
prosperous miller in a good coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a boy and a large tawny dog resting together beside a milk cart on a snowy Flemish road at dusk, windmills and a tall cathedral spire on the horizon, warm lantern light against the blue snow, tender and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 길가에 쓰러진 개

| 파일명 | 장면 |
|---|---|
| `images/01-found.png` | A dusty Flemish roadside in summer where an old man and a boy kneel beside a collapsed tawny dog still harnessed to a heavy cart, poplar trees and a windmill behind, compassionate. |

## 2장 · 우유 수레

| 파일명 | 장면 |
|---|---|
| `images/02-cart.png` | A pre-dawn village lane where a boy walks beside a big tawny dog harnessed to a small milk cart loaded with brass cans, lantern light on cobblestones, mist over the fields, warm and companionable. |

## 3장 · 그림 그리는 아이

| 파일명 | 장면 |
|---|---|
| `images/03-drawing.png` | A barn interior where a boy draws with charcoal on a plank wall by the light of a small window, a big dog lying beside him watching, straw and milk cans around, quietly happy. |

## 4장 · 아로아와 풍차 집

| 파일명 | 장면 |
|---|---|
| `images/04-aloise.png` | A windmill yard where a boy shows a charcoal portrait to a rosy-cheeked girl in a blue pinafore, while her stout father watches disapprovingly from a doorway, golden wheat and turning sails. |

## 5장 · 대성당의 그림

| 파일명 | 장면 |
|---|---|
| `images/05-cathedral.png` | A vast dim cathedral interior with soaring stone pillars where a small boy stands before two great curtained paintings, a dog sitting at his heel, shafts of coloured light from high windows, awed and longing. |

## 6장 · 그림 대회

| 파일명 | 장면 |
|---|---|
| `images/06-contest.png` | A city hall exhibition where judges announce a winner as a small boy quietly picks up his own drawing of a dog and cart, snow beginning to fall outside tall windows, poignant. |

## 7장 · 눈길에서 주운 지갑

| 파일명 | 장면 |
|---|---|
| `images/07-purse.png` | A snowy lane at night where a big dog carries a fat leather purse to a boy, and beside it the boy handing the purse back at a lamplit windmill doorway before turning away into the snow, quietly noble. |

## 8장 · 커튼이 걷힌 밤

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A moonlit cathedral where the curtains have fallen away from two great paintings, the light pouring over a boy and his dog resting peacefully together on the stone floor before them, hushed and beautiful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
