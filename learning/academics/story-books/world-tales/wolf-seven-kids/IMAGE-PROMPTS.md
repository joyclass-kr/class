# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(엄마 염소, 일곱 아기 염소, 늑대)이 책 전체에 계속 등장하니, 매번 생김새를
비슷하게 유지하는 게 중요해요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, cozy European countryside cottage setting, expressive
exaggerated character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Mother Goat: a gentle white goat standing upright, wearing a blue dress, apron
and headscarf, kind eyes. The seven kids: small fluffy white baby goats standing
upright in colorful little outfits, big round eyes, very expressive. The Wolf:
a large brown wolf standing upright in red checkered overalls, long snout,
comically villainous grin.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a cozy cottage door slightly ajar at dusk with seven little white goat kids peeking out nervously, a large wolf's shadow falling across the doorstep from outside, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 엄마 염소의 당부

| 파일명 | 장면 |
|---|---|
| `images/01-warning.png` | A mother goat in a blue dress and headscarf standing at the cottage doorway with a basket on her arm, raising one finger in warning, seven little goat kids gathered around her nodding earnestly, warm morning light. |

## 2장 · 첫 번째 속임수

| 파일명 | 장면 |
|---|---|
| `images/02-first-try.png` | A big brown wolf in red overalls leaning against the closed cottage door mid-knock with a sly grin, while inside several little goat kids press their ears to the door looking suspicious and defiant, cutaway view of both sides of the door. |

## 3장 · 하얀 발과 고운 목소리

| 파일명 | 장면 |
|---|---|
| `images/03-disguise.png` | The wolf standing in a mill dusting his front paws white with flour while holding an empty honey jar, a mischievous satisfied expression, sacks of flour around him, warm interior light. |

## 4장 · 시계 속에 숨은 막내

| 파일명 | 장면 |
|---|---|
| `images/04-hiding.png` | Chaos inside the cottage as the wolf bursts in and little goat kids scatter everywhere, one tiny kid quietly hiding inside a tall grandfather clock with the door cracked open, dramatic comedic energy. |

## 5장 · 엄마 염소가 돌아왔어요

| 파일명 | 장면 |
|---|---|
| `images/05-mother-returns.png` | The mother goat standing shocked in the doorway of the wrecked, empty cottage — chairs overturned, door wide open — as the smallest kid peeks tearfully out of the grandfather clock, soft sad afternoon light. |

## 6장 · 늑대의 배 속에서

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.png` | Six little goat kids leaping joyfully out of the sleeping wolf's belly in a sunny garden as the mother goat holds scissors and hugs them, tearful happy reunion, the wolf still snoring obliviously. |

## 7장 · 우물가의 늑대

| 파일명 | 장면 |
|---|---|
| `images/07-well.png` | The wolf staggering toward a stone well with a comically heavy round belly, the mother goat and seven kids peeking from behind a bush watching, warm sunny farmyard, humorous moment just before he tips in. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
