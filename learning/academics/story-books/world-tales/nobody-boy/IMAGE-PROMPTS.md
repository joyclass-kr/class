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
bold clean outlines, saturated storybook colors, soft French countryside light,
no text or letters in the image, 19th-century French villages, country roads,
market squares, a coal mine and a river barge, expressive faces, wide panoramic
composition, warm and hopeful, never bleak.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Rémi: a boy about 10 with dark curls, a patched jacket and bare feet, later
carrying a small harp. Vitalis: a tall dignified old street musician with white
hair, a wide hat and a worn cloak. Capi: a clever white poodle. Zerbino and
Dolce: two smaller dogs. Joli-Coeur: a little monkey in a red jacket and cap.
Mother Barberin: a kind round-faced village woman in an apron.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a boy with a harp on his back walking a country road at dawn with two dogs and a small monkey in a red jacket, poplar trees lining the way and a village steeple far ahead, warm and hopeful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 바르브랭 아주머니

| 파일명 | 장면 |
|---|---|
| `images/01-home.png` | A humble French cottage kitchen with a copper pot on the fire where a round-faced woman in an apron holds a small boy close, evening light through a small window, tender and warm. |

## 2장 · 비탈리스 할아버지

| 파일명 | 장면 |
|---|---|
| `images/02-vitalis.png` | A village square where a dignified old street musician in a wide hat stands with three dogs and a monkey in a red jacket, speaking to a barefoot boy, villagers watching, warm afternoon. |

## 3장 · 길 위의 식구들

| 파일명 | 장면 |
|---|---|
| `images/03-troupe.png` | A sunny village market square where a boy plays a small harp while a white poodle counts on its paws and a monkey in a red jacket doffs its cap, delighted children crowding round, lively and joyful. |

## 4장 · 눈보라 치던 밤

| 파일명 | 장면 |
|---|---|
| `images/04-snow.png` | A snowbound forest hollow at night where an old man wraps his cloak around a boy while dogs press close for warmth, snow whirling, a faint glow of dawn beginning at the horizon, moving. |

## 5장 · 헤어짐

| 파일명 | 장면 |
|---|---|
| `images/05-parting.png` | A cold city street at dawn where a boy kneels beside an old man wrapped in a cloak, a white poodle pressing against them both, pale winter light, deeply tender and quiet. |

## 6장 · 물 위의 집

| 파일명 | 장면 |
|---|---|
| `images/06-barge.png` | A canal barge with flower boxes drifting under willow trees where a boy plays a harp at the bow, a pale child smiling from a deck chair and a kind woman steering, golden afternoon light. |

## 7장 · 어두운 갱도

| 파일명 | 장면 |
|---|---|
| `images/07-mine.png` | A dark flooded mine gallery lit by a single lamp where miners and a boy sit against the rock wall, the boy singing softly, and a faint pickaxe glow appearing far down the tunnel, hopeful. |

## 8장 · 찾아낸 가족

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A bright garden gathering where a boy is embraced by a family while a village woman in an apron arrives at the gate and a white poodle bounds toward them, harp propped on a bench, joyful reunion. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
