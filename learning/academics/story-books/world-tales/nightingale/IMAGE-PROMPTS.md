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
bold clean outlines, saturated storybook colors, soft lantern light and misty
garden greens, no text or letters in the image, an imperial Chinese porcelain
palace, blossom gardens, a forest by the sea and a fisherman's boat, expressive
faces, wide panoramic composition, beautiful and gentle.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The nightingale: a small plain grey-brown bird with bright eyes, unremarkable to
look at. The emperor: an elderly man in embroidered silk robes with a kind
worn face. The chief courtier: a fussy official in tall hat and stiff robes,
comic. The kitchen maid: a small girl in simple clothes who knows the woods. The
mechanical bird: a jewelled clockwork bird glittering with rubies and sapphires.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small plain brown bird singing on a branch outside a magnificent porcelain palace at dusk, lanterns glowing in the windows and a garden of blossoms below, delicate and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 세상에서 가장 아름다운 궁궐

| 파일명 | 장면 |
|---|---|
| `images/01-palace.png` | A magnificent porcelain palace with curved roofs surrounded by blossom gardens and a great forest beyond, an elderly emperor reading a book on a terrace and looking up puzzled, luminous. |

## 2장 · 아무도 몰랐던 새

| 파일명 | 장면 |
|---|---|
| `images/02-search.png` | A palace corridor in uproar as a fussy official questions bewildered courtiers, one small kitchen girl raising her hand at the back, comic and lively. |

## 3장 · 숲에서 온 손님

| 파일명 | 장면 |
|---|---|
| `images/03-nightingale.png` | A misty forest where a small plain grey bird sings on a low branch while richly dressed courtiers stand transfixed, one wiping his eyes, a kitchen girl smiling, soft green light. |

## 4장 · 궁궐의 밤

| 파일명 | 장면 |
|---|---|
| `images/04-court.png` | A grand candlelit throne hall where a tiny plain bird sings from a golden perch, the emperor on his throne with tears on his cheeks and the whole court silent, moving and beautiful. |

## 5장 · 보석으로 만든 새

| 파일명 | 장면 |
|---|---|
| `images/05-machine.png` | A dazzling jewelled clockwork bird on a stand surrounded by an admiring crowd, while at an open window a small plain bird slips out unnoticed into the dusk, poignant contrast. |

## 6장 · 뚝 멈춘 노래

| 파일명 | 장면 |
|---|---|
| `images/06-broken.png` | A palace hall where a jewelled clockwork bird has stopped mid-song with a spring poking out, a watchmaker peering at it through a lens while courtiers look on dismayed, quiet and sad. |

## 7장 · 임금님이 앓아눕다

| 파일명 | 장면 |
|---|---|
| `images/07-illness.png` | A vast dim bedchamber where an elderly emperor lies alone in a huge bed, a silent jewelled bird on the table beside him, moonlight through an open window, deeply lonely. |

## 8장 · 창가로 돌아온 노래

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A bedchamber at dawn where a small plain bird sings on the windowsill and colour returns to an old emperor's face as he sits up, first light spilling across the bed, warm and hopeful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
