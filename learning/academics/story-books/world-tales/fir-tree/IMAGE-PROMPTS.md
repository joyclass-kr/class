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
bold clean outlines, saturated storybook colors, cool forest greens and warm
indoor golds, no text or letters in the image, a northern pine forest through
four seasons, a ship's harbour, a decorated parlour and a farmyard, expressive
faces, wide panoramic composition, gentle and warm, never bleak.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The little fir: a small bright-green fir tree with an expressive, hopeful face
in its branches. The hares: plump brown hares that leap over it. The sunbeams and
wind: drawn as soft warm light and swirling leaves rather than characters. The
children: cheerful children in nightgowns around a decorated tree. The storyteller:
a round grandfather in a knitted vest.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small fir tree standing alone in a snowy forest clearing under a wide starry sky, larger firs all around, a warm light glowing from a distant farmhouse window, quiet and beautiful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 빨리 크고 싶어

| 파일명 | 장면 |
|---|---|
| `images/01-small.png` | A sunlit forest floor where a very small fir tree stands among ferns while plump hares leap right over it, tall pines towering behind, warm green light, sweet and comic. |

## 2장 · 잘려 나간 나무들

| 파일명 | 장면 |
|---|---|
| `images/02-felled.png` | An autumn forest where woodcutters drag away tall straight trunks, a small fir watching from between stumps, and a stork alighting nearby to speak, wistful and vivid. |

## 3장 · 반짝이는 나무들

| 파일명 | 장면 |
|---|---|
| `images/03-christmas.png` | A snowy forest where sparrows chatter to a small fir tree, and above them a vision of a warm parlour window glowing with a decorated tree full of candles and gilded apples, magical. |

## 4장 · 드디어 온 날

| 파일명 | 장면 |
|---|---|
| `images/04-cut.png` | A snowy clearing where a small fir is lifted onto a cart, the forest receding behind as the cart rolls toward a village with chimney smoke, bittersweet and bright. |

## 5장 · 가장 빛나던 저녁

| 파일명 | 장면 |
|---|---|
| `images/05-decorated.png` | A warm parlour where a fir tree stands ablaze with candles, gilded apples and a great star, children rushing in clapping, family gathered, radiant and joyful. |

## 6장 · 다락방의 겨울

| 파일명 | 장면 |
|---|---|
| `images/06-attic.png` | A dim dusty attic where a bare fir tree leans against boxes, a family of mice sitting attentively at its base, one shaft of light through a small window, quiet and tender. |

## 7장 · 뒤늦게 떠오른 것

| 파일명 | 장면 |
|---|---|
| `images/07-memory.png` | An attic where a fir tree tells stories to gathered mice, and behind it a soft translucent memory of a sunlit summer forest with hares and warm light, gentle and moving. |

## 8장 · 마당에 나온 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A spring farmyard where a fir tree lies in the sun, its old star picked up by a child who pins it to her coat, green shoots pushing up through the earth nearby, quiet and hopeful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
