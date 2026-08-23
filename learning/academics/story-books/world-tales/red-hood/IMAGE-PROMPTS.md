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
bold clean outlines, saturated storybook colors, dappled forest greens and warm
cottage light, no text or letters in the image, a village lane, a deep forest
path with wildflowers, a grandmother's cottage inside and out, expressive comic
faces, wide panoramic composition, the wolf drawn as comically sly rather than
menacing.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Red Hood: a small girl about 7 with a bright red hooded cape, brown braids and
a covered basket. The mother: a young woman in an apron at a cottage door. The
wolf: a lanky grey wolf with a long snout and a scheming grin, drawn as goofy and
theatrical. The grandmother: a small white-haired woman in a nightcap and
spectacles. The huntsman: a broad man in a green coat with a shoulder bag.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small girl in a bright red hooded cape walking a narrow forest path with a covered basket, tall dark trees leaning over her and two yellow eyes glinting between the trunks, atmospheric but not frightening. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 할머니 댁 심부름

| 파일명 | 장면 |
|---|---|
| `images/01-errand.png` | A sunny village cottage doorway where a mother in an apron hands a covered basket to a small girl in a red hooded cape, a forest path curving away beyond the gate, warm and homely. |

## 2장 · 숲에서 만난 늑대

| 파일명 | 장면 |
|---|---|
| `images/02-wolf-meets.png` | A forest path where a lanky wolf leans down conversationally to a small girl in a red cape, one paw gesturing toward a sunlit meadow of wildflowers off the path, comic and sly. |

## 3장 · 먼저 도착한 늑대

| 파일명 | 장면 |
|---|---|
| `images/03-wolf-arrives.png` | A cottage interior where a wolf in a nightgown and cap pulls a quilt up to its chin in bed, an old woman peeking from a wardrobe crack behind, spectacles askew, hilariously comic. |

## 4장 · 할머니, 왜 그렇게 커요?

| 파일명 | 장면 |
|---|---|
| `images/04-questions.png` | A dim cottage bedroom where a small girl in red leans toward a bed occupied by a wolf in a nightcap, its ears and eyes comically huge, the quilt bulging, funny and theatrical. |

## 5장 · 코를 고는 늑대

| 파일명 | 장면 |
|---|---|
| `images/05-snoring.png` | A cottage bedroom where a fat-bellied wolf sprawls snoring on the bed, and outside the window a huntsman in a green coat peering in with raised eyebrows, comic and bright. |

## 6장 · 배 속에서 나온 두 사람

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.png` | A cottage room where a girl and an old woman climb out unharmed while a huntsman kneels with shears, and the three then filling the sleeping wolf with round stones, comic teamwork. |

## 7장 · 큰길로만

| 파일명 | 장면 |
|---|---|
| `images/07-lesson.png` | A cottage yard where a stone-heavy wolf waddles away down the path, and inside a sunny kitchen a grandmother eating bread while a girl in red hangs her cape by the door, warm and reassuring. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
