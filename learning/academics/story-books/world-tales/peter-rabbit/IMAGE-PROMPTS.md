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
bold clean outlines, saturated storybook colors, soft English countryside light,
no text or letters in the image, a sandy rabbit burrow under a fir tree, a walled
vegetable garden with frames and tool shed, a lane and a farmhouse, expressive
comic animal faces, wide panoramic composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Peter: a small brown rabbit in a blue jacket with brass buttons, curious and
reckless. His mother: a rabbit in an apron and cap with a basket. Flopsy, Mopsy
and Cotton-tail: three tidy little rabbits in red cloaks. Mr McGregor: a stout
gardener in a wide hat and heavy boots, drawn as comically grumpy, never
menacing. A friendly sparrow trio.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small brown rabbit in a blue jacket squeezing under a wooden garden gate into a lush vegetable garden, cabbages and carrot tops all around, a watering can in the corner, charming and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 그 밭에는 가지 마라

| 파일명 | 장면 |
|---|---|
| `images/01-warning.png` | A sandy burrow under a great fir tree where a rabbit mother in apron and cap gives instructions to four young rabbits, three attentive and one in a blue jacket looking away, warm morning. |

## 2장 · 대문 밑으로

| 파일명 | 장면 |
|---|---|
| `images/02-gate.png` | A wooden garden gate with a small gap beneath, a rabbit in a blue jacket squeezing through, and beyond it rows of lettuces and beans stretching away, exciting and lush. |

## 3장 · 배가 아파서

| 파일명 | 장면 |
|---|---|
| `images/03-parsley.png` | A vegetable garden corner where a rabbit in a blue jacket rounds a cucumber frame and comes face to face with a stout gardener kneeling over cabbage seedlings, both frozen in shock, hilarious. |

## 4장 · 갈퀴를 든 아저씨

| 파일명 | 장면 |
|---|---|
| `images/04-chase.png` | A garden path chase where a rabbit in a blue jacket sprints between cabbage rows, one tiny shoe flying off behind him, a stout gardener pounding after with a rake, comic motion. |

## 5장 · 그물에 걸린 단추

| 파일명 | 장면 |
|---|---|
| `images/05-net.png` | A gooseberry net where a rabbit is tangled by his jacket buttons, three sparrows fluttering encouragement around him, and the empty blue jacket left hanging in the net, funny and touching. |

## 6장 · 물뿌리개 속에서

| 파일명 | 장면 |
|---|---|
| `images/06-can.png` | A dim tool shed where a soaked rabbit crouches inside a metal watering can with only his ears showing, mid-sneeze, a large shadow falling across the doorway, comic suspense. |

## 7장 · 대문을 찾아서

| 파일명 | 장면 |
|---|---|
| `images/07-escape.png` | A wide garden panorama where a small rabbit races past a pond and a white cat toward a distant wooden gate, then tumbling out into open meadow grass, relief and speed. |

## 8장 · 저녁에 마신 차

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A cosy burrow where a rabbit mother spoons chamomile tea to a tired rabbit in bed while three tidy young rabbits feast on bread and berries, and outside a scarecrow wearing a small blue jacket, warm and funny. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
