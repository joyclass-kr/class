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
bold clean outlines, saturated storybook colors, warm golden lamplight, no text
or letters in the image, Middle Eastern desert, market and courtyard house
settings, expressive faces, wide panoramic composition, adventurous and never
gruesome.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Ali Baba: a modest woodcutter about 40 with a short beard, brown robe and
turban. Morgiana: a quick-witted young servant woman in a green dress and gold
earrings, always alert. The robber chief: a burly man with a black beard and red
sash, comically fierce. Kasim: Ali Baba's plump greedy older brother in fine
striped robes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a huge stone door standing ajar in a desert cliffside at dusk with golden treasure light spilling out, a small figure silhouetted at the entrance, palm trees and dunes around, warm and mysterious. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 열려라 참깨

| 파일명 | 장면 |
|---|---|
| `images/01-cave.png` | A man hiding among the branches of a tree watching a band of robbers on horseback before a great cliff face that is splitting open, dust and desert scrub, dramatic afternoon light. |

## 2장 · 보물이 가득한 동굴

| 파일명 | 장면 |
|---|---|
| `images/02-treasure.png` | A cavern piled high with gold coins, jewelled cups and silk bales glowing in torchlight, a modest woodcutter carefully filling one small sack while looking around in awe, warm treasure glow. |

## 3장 · 형의 욕심

| 파일명 | 장면 |
|---|---|
| `images/03-brother.png` | A plump man in fine robes frantically piling sacks of gold onto donkeys inside a treasure cave while gesturing at a sealed stone door, comic panic, torchlight and glittering heaps. |

## 4장 · 표시된 대문

| 파일명 | 장면 |
|---|---|
| `images/04-chalk.png` | A narrow moonlit alley of courtyard houses where a young servant woman quietly chalks the same white mark on door after door, one robber already gone around the corner, clever and quiet mood. |

## 5장 · 기름 항아리

| 파일명 | 장면 |
|---|---|
| `images/05-jars.png` | A moonlit courtyard lined with many huge clay jars, a young woman pausing mid-step with a lamp, her head tilted listening, one jar lid slightly ajar, tense and quiet. |

## 6장 · 모르지아나의 춤

| 파일명 | 장면 |
|---|---|
| `images/06-dance.png` | A young woman dancing with a small dagger and tambourine before a seated dinner guest in a warm lamplit room, the guest's red robber sash slipping into view, guests watching, dramatic and lively. |

## 7장 · 정체가 드러나다

| 파일명 | 장면 |
|---|---|
| `images/07-revealed.png` | A courtyard where townspeople and guards surround a startled bearded robber chief while a household gathers safely behind a young woman, lanterns and warm relief, no violence shown. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
