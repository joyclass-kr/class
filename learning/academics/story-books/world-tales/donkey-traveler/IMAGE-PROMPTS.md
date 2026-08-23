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
bold clean outlines, saturated storybook colors, warm countryside light, no text
or letters in the image, European country roads, orchards and market towns,
expressive comic faces, wide panoramic composition, funny and never cruel.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The traveller: a cheerful young man with a walking staff, a wide hat and a
patched pack. The greedy innkeeper: a plump red-faced man in an apron with small
darting eyes. The innkeeper's wife: a sharp-eyed woman in a headscarf. A friendly
old woman: a small bent woman in a shawl who knows about the trees.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a leafy country lane with two fruit trees on either side, one bearing red fruit and one bearing yellow, a traveller's pack lying beneath and a donkey's shadow stretching across the path, whimsical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 두 그루의 나무

| 파일명 | 장면 |
|---|---|
| `images/01-trees.png` | A country lane between two fruit trees, one with red fruit and one with yellow, where a startled traveller clutches his head as his ears stretch long like a donkey's, comic alarm, sunny hillside. |

## 2장 · 당나귀가 되어

| 파일명 | 장면 |
|---|---|
| `images/02-donkey.png` | A man mid-transformation into a donkey on a country road, and beside it the same donkey being cheerfully hitched to a merchant's cart, the donkey's eyes wide with human dismay, comic and lively. |

## 3장 · 무거운 짐

| 파일명 | 장면 |
|---|---|
| `images/03-labor.png` | A weary donkey hauling a heavily loaded cart up a dusty road under hot sun while a merchant walks alongside, and at night the same donkey lying in a stable yard looking up at stars, sympathetic. |

## 4장 · 다시 그 언덕으로

| 파일명 | 장면 |
|---|---|
| `images/04-escape.png` | A donkey breaking free from a cart and galloping to a yellow-fruited tree, then transforming back into a delighted young man mid-stride, the merchant tumbling backwards in astonishment, comic action. |

## 5장 · 욕심 많은 주막 주인

| 파일명 | 장면 |
|---|---|
| `images/05-innkeeper.png` | A plump innkeeper leaning across a tavern table with greedy gleaming eyes as a traveller tells his story, and beside it the same innkeeper at night stuffing red fruit into his mouth beneath a tree, comic greed. |

## 6장 · 히히힝

| 파일명 | 장면 |
|---|---|
| `images/06-transform.png` | A tavern kitchen in uproar at dawn with a large donkey standing where the innkeeper should be, his wife shooing it out with a broom, patrons peering in astonished, very comic. |

## 7장 · 나그네가 돌아오다

| 파일명 | 장면 |
|---|---|
| `images/07-return.png` | A traveller holding out a yellow fruit to a donkey in a tavern yard, the donkey transforming back into a shaken innkeeper sitting on the ground, onlookers gasping and laughing, warm resolution. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
