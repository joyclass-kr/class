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
bold clean outlines, saturated storybook colors, warm cottage lamplight and green
meadow daylight, no text or letters in the image, a goat family cottage with a
grandfather clock, a village lane, a miller's shop and a well in a meadow, very
expressive comic faces, wide panoramic composition, funny and never frightening;
the wolf is drawn as goofy and vain.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Mother goat: a white goat in an apron and headscarf with a market basket. The
seven kids: small goats of slightly different sizes and markings, the youngest
the smallest with a bell. The wolf: a shaggy grey wolf who keeps changing his
disguise — first hoarse, then chalk-white paws, then flour-dusted, drawn as
comically vain. The miller: a floury man with a scoop.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a cottage door seen from inside with seven little goat kids peeking from hiding places — under the table, in a cupboard, behind a broom — and a grey paw pushing at the door crack, tense but comic, warm lamplight. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 엄마 염소의 당부

| 파일명 | 장면 |
|---|---|
| `images/01-warning.png` | A cosy cottage room where a mother goat in a headscarf with a basket gives careful instructions to seven little goat kids gathered around her, sunlight through the door, warm and tender. |

## 2장 · 첫 번째 속임수

| 파일명 | 장면 |
|---|---|
| `images/02-first-try.png` | A cottage door with seven kids pressed against it listening warily, and outside a wolf stamping in frustration, then swallowing a lump of chalk at a shop counter, comic and lively. |

## 3장 · 하얀 발과 고운 목소리

| 파일명 | 장면 |
|---|---|
| `images/03-disguise.png` | A cottage window where a black paw rests on the sill and kids recoil, then a mill interior where a floury man dusts the wolf's paws white, and the paw returning snowy on the sill, comic sequence. |

## 4장 · 시계 속에 숨은 막내

| 파일명 | 장면 |
|---|---|
| `images/04-hiding.png` | A cottage in comic uproar as kids dive under the table, into a cupboard and behind a broom while a wolf lumbers in, and a tiny kid hidden inside a grandfather clock case, funny not frightening. |

## 5장 · 엄마 염소가 돌아왔어요

| 파일명 | 장면 |
|---|---|
| `images/05-mother-returns.png` | A wrecked cottage room where a mother goat stands stricken among overturned chairs, and a tiny kid pushing open the clock case door and running to her, emotional and warm. |

## 6장 · 늑대의 배 속에서

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.png` | A meadow under a tree where a wolf sleeps with a lumpy belly, a mother goat kneeling with shears as six kids tumble out unharmed into her arms, joyful relief, gentle not gory. |

## 7장 · 우물가의 늑대

| 파일명 | 장면 |
|---|---|
| `images/07-well.png` | A meadow well where a stone-bellied wolf leans over the rim and topples in with a splash, eight goats peeking from behind a tree laughing, bright daylight, comic and triumphant. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
