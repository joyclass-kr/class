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
bold clean outlines, saturated storybook colors, brilliant sea light and warm
desert gold, no text or letters in the image, Arabian ports, wooden dhows, open
ocean, strange islands and a valley of gems, expressive faces, wide panoramic
composition, adventurous and never gruesome.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Sinbad: a wiry cheerful sailor with a short beard, a striped sash and a
sun-faded turban. The captain: a broad weathered man with a brass spyglass. The
roc: a colossal white bird, drawn as majestic rather than menacing. Merchants:
various robed traders with beards and bundles of goods.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a wooden sailing dhow riding a huge turquoise wave under a golden sky, an enormous bird circling far above and a rocky island on the horizon, adventurous and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 바다로 나가다

| 파일명 | 장면 |
|---|---|
| `images/01-port.png` | A bustling Arabian port at sunrise crowded with wooden dhows, porters carrying bales, and a young sailor stepping aboard with his bundle, minarets behind, golden and lively. |

## 2장 · 섬이 아니었다

| 파일명 | 장면 |
|---|---|
| `images/02-whale.png` | Sailors scattering as the grassy island beneath them heaves and reveals itself to be the back of an enormous whale sinking into the sea, a man clinging to a floating barrel, thrilling. |

## 3장 · 거대한 새

| 파일명 | 장면 |
|---|---|
| `images/03-roc.png` | A rocky island with a gigantic white egg, the sky darkening as a colossal white bird descends, a tiny man lashing himself to its leg with a turban cloth, awe-inspiring scale. |

## 4장 · 보석 골짜기

| 파일명 | 장면 |
|---|---|
| `images/04-valley.png` | A deep narrow canyon whose floor glitters with scattered gems, sheer cliffs rising impossibly high on both sides, a small figure standing amazed and then sitting to think, dramatic light. |

## 5장 · 고깃덩이를 타고

| 파일명 | 장면 |
|---|---|
| `images/05-meat.png` | A gem-strewn canyon floor where a man ties himself to a huge slab of meat as a great eagle swoops down to seize it, gems sticking to the meat, inventive and exciting. |

## 6장 · 다시 바다로

| 파일명 | 장면 |
|---|---|
| `images/06-sea.png` | A cliff top where astonished robed merchants crowd around a man untying himself from a slab of meat, and beside it a ship setting out again from a golden port, humorous and warm. |

## 7장 · 어깨에 올라탄 노인

| 파일명 | 장면 |
|---|---|
| `images/07-old-man.png` | A stream on a lush island where a wiry sailor carries a wizened old man on his shoulders, the old man's legs locked tight around his neck and grinning slyly, comic distress. |

## 8장 · 마지막 항해

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | An island grove where a sailor offers a gourd of grape juice to the old man on his shoulders who then slumps asleep, and the sailor running free toward a ship on the shore, triumphant and funny. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
