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
bold clean outlines, saturated storybook colors, sweeping skies and cloud seas,
no text or letters in the image, classical Chinese mountain, palace and cloud
settings, expressive comic faces, wide panoramic composition, energetic and never
frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The Monkey King (손오공): a nimble monkey with golden-brown fur, a red cape, a
small golden circlet on his head and a long red-and-gold staff, always grinning
mischievously. The Jade Emperor: a stately robed emperor with a long beard and a
flat crown. Heavenly officials: robed figures with long sleeves and tall hats,
comically flustered. The Buddha: a serene giant figure with a gentle smile,
drawn respectfully and softly glowing.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a lively monkey king in golden armour and a red cape standing atop a craggy mountain peak above a sea of clouds holding a long staff, sunrise light behind him, bold and heroic. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 바위에서 태어난 원숭이

| 파일명 | 장면 |
|---|---|
| `images/01-birth.png` | A great boulder splitting open on a misty mountain peak as a lively monkey leaps out into the sunrise, other monkeys gathering below in amazement, dramatic golden light and swirling clouds. |

## 2장 · 도술을 배우다

| 파일명 | 장면 |
|---|---|
| `images/02-training.png` | A monkey practising magic in a mountain courtyard before a serene old master, leaping through the air on a small cloud while dozens of tiny monkey duplicates appear from a blown hair, dynamic and comic. |

## 3장 · 여의봉을 얻다

| 파일명 | 장면 |
|---|---|
| `images/03-staff.png` | An undersea dragon palace of coral and pearl where a monkey grasps a towering golden pillar that shrinks to needle size in his palm, a flustered dragon king looking on, shimmering blue-green light. |

## 4장 · 하늘 궁전을 뒤집다

| 파일명 | 장면 |
|---|---|
| `images/04-heaven.png` | A monkey causing joyful chaos in a heavenly peach orchard and banquet hall, overturned tables and flying peaches, robed heavenly officials scattering in comic panic, bright clouds and gold. |

## 5장 · 부처님의 손바닥

| 파일명 | 장면 |
|---|---|
| `images/05-palm.png` | A tiny monkey riding a cloud at tremendous speed across a vast sky toward five towering red pillars at the horizon, the whole scene subtly shaped like an enormous open hand, awe-inspiring scale. |

## 6장 · 산 아래에서

| 파일명 | 장면 |
|---|---|
| `images/06-mountain.png` | A serene giant open palm held out showing tiny marks on one finger while a monkey stares in dismay, and beside it the same monkey sitting quietly beneath a great mountain, soft glowing light, gentle rather than punishing. |

## 7장 · 새로운 길

| 파일명 | 장면 |
|---|---|
| `images/07-journey.png` | A monkey stepping out from beneath a mountain and bowing to a travelling monk, then the two walking together along a winding mountain road toward distant western peaks at sunrise, hopeful new beginning. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
