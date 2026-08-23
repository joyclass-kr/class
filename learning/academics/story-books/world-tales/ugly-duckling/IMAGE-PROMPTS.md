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
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, farmyard, pond and countryside setting through four seasons,
expressive animal faces, wide panoramic composition, gentle and never cruel.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The ugly duckling: a large fluffy grey-brown duckling with a long neck and big
gentle eyes, later a graceful white swan. Mother duck: a plump brown duck with a
kindly face. The other ducklings: small bright yellow ducklings, smug and
teasing. The old farm woman: a stout woman in a headscarf and apron.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small grey duckling standing alone at the edge of a reedy pond looking up at a graceful white swan gliding past in the distance, soft golden light on the water, gentle and hopeful mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 마지막에 깨어난 알

| 파일명 | 장면 |
|---|---|
| `images/01-hatching.png` | A nest in tall grass where several bright yellow ducklings have just hatched around a mother duck, while one much larger grey duckling emerges from an oversized egg, warm spring morning light. |

## 2장 · 미운 오리라고 불렀어요

| 파일명 | 장면 |
|---|---|
| `images/02-teased.png` | A busy farmyard where yellow ducklings, hens and a turkey crowd around and jeer at a large grey duckling who shrinks back against a fence post, feathers ruffled, warm but lonely afternoon light. |

## 3장 · 혼자 떠난 길

| 파일명 | 장면 |
|---|---|
| `images/03-leaving.png` | A lone grey duckling walking away down a country path away from a farm fence, tall reeds and wide empty fields stretching ahead, soft overcast light, quiet and wistful. |

## 4장 · 처음 본 하얀 새

| 파일명 | 장면 |
|---|---|
| `images/04-swans.png` | A flock of brilliant white swans flying across an autumn sunset sky with necks outstretched, while far below a small grey duckling on a pond stares up in wonder, golden and rose light on the water. |

## 5장 · 길고 추운 겨울

| 파일명 | 장면 |
|---|---|
| `images/05-winter.png` | A grey duckling stuck in the frozen edge of a pond at dawn as a farmer in a heavy coat breaks the ice with a stick to free it, snow-covered reeds and bare trees around, cold blue light with a warm figure. |

## 6장 · 물에 비친 모습

| 파일명 | 장면 |
|---|---|
| `images/06-reflection.png` | A young swan gazing down at its own reflection in still spring water with an astonished expression, the reflection showing a beautiful white swan, blossoms drifting on the surface, radiant morning light. |

## 7장 · 백조가 되어

| 파일명 | 장면 |
|---|---|
| `images/07-swan.png` | A young white swan being warmly welcomed by three older swans on a sunlit lake as children on the bank clap and point in delight, blossom trees and bright spring colors, joyful uplifting scene. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
