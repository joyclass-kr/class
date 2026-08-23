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
bold clean outlines, saturated storybook colors, warm lamplight, no text or
letters in the image, Italian village, seaside and workshop settings, expressive
exaggerated faces, wide panoramic composition, playful and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Pinocchio: a wooden puppet boy with jointed limbs, a yellow pointed cap, red
shorts, and a nose that grows when he lies. Geppetto: a kindly old woodcarver
with white hair, an apron and round spectacles. The blue fairy: a gentle young
woman with pale blue hair and a soft glowing gown. The fox and the cat: a sly
lanky fox in a tattered coat and a scruffy cat, comic swindlers. The whale: an
enormous but goofy-looking whale.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a wooden marionette boy with a long nose sitting on a carpenter's workbench under a warm lamp, wood shavings and tools around him, a small blue star glowing in the dark window behind, warm and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 나무로 만든 아이

| 파일명 | 장면 |
|---|---|
| `images/01-carving.png` | An old woodcarver in a lamplit workshop carving a puppet boy, wood shavings curling on the floor, and a soft blue fairy light drifting in through the window, warm and magical. |

## 2장 · 학교 가는 길

| 파일명 | 장면 |
|---|---|
| `images/02-school.png` | A puppet boy with a schoolbook under his arm distracted by a colorful travelling puppet theatre with a drum and banners in a village square, crowds gathering, sunny lively morning. |

## 3장 · 여우와 고양이

| 파일명 | 장면 |
|---|---|
| `images/03-foxcat.png` | A sly fox and scruffy cat leaning over a wooden puppet boy on a country road, gesturing grandly at a patch of ground, their expressions comically greedy, dusty golden afternoon. |

## 4장 · 코가 길어졌어요

| 파일명 | 장면 |
|---|---|
| `images/04-nose.png` | A wooden puppet boy in a cottage room with his nose comically stretched far across the room, bumping a vase and a birdcage, the blue fairy watching with a patient raised eyebrow, humorous. |

## 5장 · 놀기만 하는 섬

| 파일명 | 장면 |
|---|---|
| `images/05-island.png` | A carnival island crowded with rowdy children on rides and swings eating sweets, while in the foreground a puppet boy stares in shock at his own newly grown donkey ears reflected in a shop window, comic alarm. |

## 6장 · 고래 뱃속에서

| 파일명 | 장면 |
|---|---|
| `images/06-whale.png` | The cavernous inside of a whale lit by a single candle where an old man sits on a broken boat, a wooden puppet boy running toward him with arms outstretched, warm light in vast blue darkness, joyful reunion. |

## 7장 · 재채기를 타고

| 파일명 | 장면 |
|---|---|
| `images/07-escape.png` | A giant whale sneezing an enormous spray as an old man and a wooden puppet boy tumble out on the blast into the open sea, comic action, bright daylight and flying foam. |

## 8장 · 진짜 아이가 되다

| 파일명 | 장면 |
|---|---|
| `images/08-real-boy.png` | A boy of flesh and blood waking in a small cottage bed staring at his own hands in wonder as an old woodcarver embraces him with tears of joy, morning sunlight through the window, warm and tender. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
