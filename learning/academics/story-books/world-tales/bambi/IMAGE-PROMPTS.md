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
bold clean outlines, saturated storybook colors, green forest light shifting
through four seasons, no text or letters in the image, a central European forest,
a wide meadow, a winter thicket and a stream, expressive gentle animal faces,
wide panoramic composition, warm and never gory.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Bambi: a spotted fawn with long legs and huge dark eyes, growing into a young
stag. His mother: a slender doe with a calm watchful face. Feline: a lively young
doe with a white throat. Gobo: a small weak fawn. Thumper the hare: a plump brown
hare with twitching ears. The old stag: a great grey-muzzled deer with wide
antlers who appears and disappears without a sound.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a spotted fawn standing on thin legs in a sunlit forest thicket, its mother's head lowered protectively beside it, ferns and wildflowers all around, shafts of green light, tender and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 덤불 속에서

| 파일명 | 장면 |
|---|---|
| `images/01-birth.png` | A hidden forest thicket where a newborn spotted fawn wobbles on thin legs as its mother licks it clean, a plump hare and small birds peeking through the ferns, soft green light. |

## 2장 · 넓은 풀밭

| 파일명 | 장면 |
|---|---|
| `images/02-meadow.png` | A wide sunlit meadow bordered by dark trees where a fawn bounds out joyfully into the grass while its mother steps carefully behind, butterflies rising, exhilarating openness. |

## 3장 · 숲의 친구들

| 파일명 | 장면 |
|---|---|
| `images/03-friends.png` | A meadow edge where two young fawns chase each other through tall grass while a hare, squirrels and a weaker fawn resting on the ground look on, summer flowers everywhere, joyful. |

## 4장 · 늙은 사슴

| 파일명 | 장면 |
|---|---|
| `images/04-old-stag.png` | A hushed forest clearing where a great grey-muzzled stag with wide antlers stands regarding a small fawn, mist between the trunks, awe-struck stillness. |

## 5장 · 첫눈

| 파일명 | 장면 |
|---|---|
| `images/05-winter.png` | A snow-covered forest where a fawn touches its nose to fresh snow in wonder, and deeper in the scene deer stripping bark from a tree in the blue winter dusk, beautiful and sober. |

## 6장 · 혼자 남은 날

| 파일명 | 장면 |
|---|---|
| `images/06-alone.png` | A snowy forest where a young deer runs hard between dark trunks, and then stands alone in a wide empty clearing looking back, falling snow, quiet and poignant without any violence shown. |

## 7장 · 다시 봄

| 파일명 | 장면 |
|---|---|
| `images/07-spring.png` | A spring meadow bright with new grass where a young stag with small antlers pauses at the treeline, ears turned and nose lifted to the wind, a doe waiting beyond, hopeful. |

## 8장 · 숲을 걷는 법

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A deep evening forest where an old stag leads a young one along a hidden path, and then walks away alone between the trunks as the young stag stands steady in the fading light, quietly majestic. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
