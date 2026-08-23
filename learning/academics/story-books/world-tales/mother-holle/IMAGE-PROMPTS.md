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
bold clean outlines, saturated storybook colors, warm meadow light and soft
snowfall, no text or letters in the image, a German farmyard with a stone well,
a sunlit otherworld meadow with a bread oven and an apple tree, and a cosy
cottage, expressive faces, wide panoramic composition, gentle and never
frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The diligent girl: a plain-dressed girl with a kerchief and busy hands, calm and
willing. The lazy stepsister: a plump girl in a frilled dress who is always
yawning. The stepmother: a sharp-faced woman with a wooden spoon. Mother Holle:
a large kindly old woman with enormous teeth and a huge feather quilt, drawn as
warm and grandmotherly, never witch-like.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an old woman shaking a great feather quilt out of a window in the sky while snow falls onto a sunlit meadow below, a stone well in the foreground, magical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 우물가의 물레

| 파일명 | 장면 |
|---|---|
| `images/01-well.png` | A farmyard beside a stone well where a plain-dressed girl spins thread, her spindle slipping from her fingers into the dark water, a sharp-faced woman watching from a doorway, warm afternoon. |

## 2장 · 우물 속으로

| 파일명 | 장면 |
|---|---|
| `images/02-fall.png` | A dark well shaft with a girl falling, and the same wide scene opening into a brilliant sunlit meadow where she lands unhurt among wildflowers, wondrous transition. |

## 3장 · 빵을 꺼내 주세요

| 파일명 | 장면 |
|---|---|
| `images/03-bread.png` | A meadow with a stone bread oven whose door stands open, golden loaves calling out, a girl scooping them onto a paddle with a warm smile, homely and charming. |

## 4장 · 사과를 흔들어 주세요

| 파일명 | 장면 |
|---|---|
| `images/04-apples.png` | A meadow apple tree bowed almost to the ground under its fruit, a girl shaking the trunk as apples rain down, then stacking them neatly in a pile, bright and satisfying. |

## 5장 · 이불을 터는 할머니

| 파일명 | 장면 |
|---|---|
| `images/05-holle.png` | A cottage doorway in a sky-meadow where a large kindly old woman with big teeth welcomes a girl, an enormous feather quilt over her arm, snowflakes drifting from it, warm and magical. |

## 6장 · 금빛 소나기

| 파일명 | 장면 |
|---|---|
| `images/06-gold.png` | A great gateway where a girl steps through and a shower of gold pours over her, coating her from head to foot, and then standing beside the familiar farmyard well glittering, joyful. |

## 7장 · 나도 갈래

| 파일명 | 장면 |
|---|---|
| `images/07-lazy.png` | A sunlit meadow where a frilly-dressed girl strolls past a smoking bread oven and a groaning apple tree with her nose in the air, both calling after her in vain, comic. |

## 8장 · 문을 지나며

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A great gateway where a girl steps through expecting gold but is drenched in black sticky pitch, standing dismayed by the farmyard well as her stepmother gapes, comic and pointed. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
