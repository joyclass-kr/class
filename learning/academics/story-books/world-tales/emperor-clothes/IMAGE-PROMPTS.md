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
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, European palace and town square setting, expressive
exaggerated comic faces, wide panoramic composition, dynamic staging.
The emperor is always drawn decently — in an undershirt and long shorts, never bare.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The Emperor: a plump vain middle-aged man with a curly moustache, always in
elaborate robes, later in a white undershirt and knee-length striped shorts.
The two swindlers: a tall thin one and a short round one, both in shabby
travelling clothes with sly grins. The old minister: a bearded man in a black
robe with spectacles. The child: a small boy in a red cap, wide-eyed and honest.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an ornate empty royal robe stand and a tall mirror in a lavish dressing chamber, a crown resting on a velvet cushion, rich curtains framing the scene, warm candlelight, whimsical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 옷을 좋아하는 임금님

| 파일명 | 장면 |
|---|---|
| `images/01-emperor.png` | A plump emperor admiring himself in a huge gilded mirror in a dressing room overflowing with lavish robes, weary servants holding up more outfits, comically excessive wardrobe, warm palace light. |

## 2장 · 이상한 옷감

| 파일명 | 장면 |
|---|---|
| `images/02-swindlers.png` | Two shabby swindlers leaning in conspiratorially before the seated emperor in his throne room, gesturing at an imaginary bolt of cloth, the emperor leaning forward greedily, comic scheming atmosphere. |

## 3장 · 빈 베틀

| 파일명 | 장면 |
|---|---|
| `images/03-loom.png` | Two swindlers miming furious work at a completely empty loom in a workshop while a bearded old minister stands in the doorway squinting hard with a panicked expression, dust and empty spools around, comic staging. |

## 4장 · 아무도 말하지 못했다

| 파일명 | 장면 |
|---|---|
| `images/04-nobody.png` | The emperor and a crowd of courtiers gathered around the empty loom, all nodding and gesturing in exaggerated admiration at nothing at all, a few exchanging nervous sideways glances, warm workshop light. |

## 5장 · 옷을 입는 임금님

| 파일명 | 장면 |
|---|---|
| `images/05-dressing.png` | The emperor in a white undershirt and striped knee shorts turning before a tall mirror with a satisfied expression, the two swindlers miming the fitting of an invisible garment, courtiers solemnly holding up an imaginary train, comic dignity. |

## 6장 · 임금님이 벌거벗었다

| 파일명 | 장면 |
|---|---|
| `images/06-parade.png` | A grand street parade with the emperor marching in his undershirt and shorts under a canopy, crowds cheering on both sides, and one small boy in a red cap pointing and shouting while nearby faces turn to shock and laughter. |

## 7장 · 끝까지 걸어간 임금님

| 파일명 | 장면 |
|---|---|
| `images/07-ending.png` | The emperor walking on with his chin held high and cheeks bright red as the parade continues, courtiers solemnly carrying the invisible train behind him, townsfolk laughing kindly, warm late-afternoon light. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
