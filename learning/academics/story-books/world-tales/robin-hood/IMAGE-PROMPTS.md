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
bold clean outlines, saturated storybook colors, dappled forest light, no text or
letters in the image, medieval English forest, village fair and castle settings,
expressive faces, wide panoramic composition, adventurous and never gruesome.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Robin Hood: a nimble young archer in a green hooded tunic with a feathered cap
and a longbow, always grinning. Little John: a huge good-natured man with a
staff and a brown beard. Friar Tuck: a round jolly monk in a brown robe. The
Sheriff of Nottingham: a thin sour man in red and gold with a pointed beard,
comically pompous. Maid Marian: a spirited young woman in a blue riding dress.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an archer in a green hooded tunic standing among towering oak trees with a longbow, shafts of sunlight falling through the leaves, a distant castle glimpsed beyond the forest, adventurous and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 셔우드 숲의 활잡이

| 파일명 | 장면 |
|---|---|
| `images/01-forest.png` | A vast sunlit oak forest where a green-hooded archer stands on a fallen log with a longbow, villagers gathered below listening, dappled light through leaves, warm and heroic. |

## 2장 · 통나무 다리 위에서

| 파일명 | 장면 |
|---|---|
| `images/02-little-john.png` | Two men duelling with quarterstaffs on a narrow log bridge over a stream, one huge and bearded, one in green, the green one toppling into the water with a splash, comic energy and forest greenery. |

## 3장 · 숲의 식구들

| 파일명 | 장면 |
|---|---|
| `images/03-band.png` | A cheerful outlaw camp in a forest clearing at night with a big fire, a huge man, a round monk and a green-clad archer laughing together, roast food and longbows leaning on trees, warm firelight. |

## 4장 · 활쏘기 대회

| 파일명 | 장면 |
|---|---|
| `images/04-contest.png` | A bustling medieval fair with archery butts and colourful banners, a shabbily dressed archer loosing an arrow that splits the target centre, the crowd roaring and a sour official frowning on a platform. |

## 5장 · 마리안 아가씨

| 파일명 | 장면 |
|---|---|
| `images/05-marian.png` | A spirited young woman on horseback meeting a green-clad archer on a woodland path, both smiling in mutual challenge, sunlight through birch trees, lively and warm. |

## 6장 · 붙잡힌 리틀 존

| 파일명 | 장면 |
|---|---|
| `images/06-captured.png` | A moonlit castle courtyard where a round monk distracts guards with a barrel while a green-clad archer cuts the ropes binding a huge bearded man, tense but comic rescue, torchlight and shadows. |

## 7장 · 곳간을 열다

| 파일명 | 장면 |
|---|---|
| `images/07-granary.png` | Villagers waking at dawn to find sacks of grain left at every cottage door, cart tracks in the mud leading back toward the forest, warm sunrise over thatched roofs, quietly joyful. |

## 8장 · 숲은 그대로

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A king revealing himself by removing a hunter's cloak in a forest clearing before astonished outlaws who kneel and then cheer, sunlight streaming through great oaks, triumphant and warm. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
