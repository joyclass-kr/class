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
bold clean outlines, saturated storybook colors, warm night blues and lamp golds,
no text or letters in the image, a merchant's town, a night sky, a domed eastern
city, a tall tower and a marketplace, very expressive comic faces, wide panoramic
composition, funny and warm.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The merchant's son: a cheerful young man in a fine coat that grows shabbier as
the story goes, quick with words. The old friend: a stooped man with spectacles
who gives him the trunk. The princess: a curious girl in a tower room who loves
stories. The king and queen: a stout pair in ceremonial robes, easily impressed.
The townspeople: a lively crowd of market folk.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an old leather travelling trunk flying high above a moonlit city of domes and minarets, a young man sitting inside it with his hair blown back, stars all around, whimsical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 다 써 버린 재산

| 파일명 | 장면 |
|---|---|
| `images/01-spend.png` | A grand house being emptied of furniture while a young man in a fine coat sits alone on the floor, and a battered leather trunk being carried in by a stooped friend, comic and rueful. |

## 2장 · 가방이 날아올랐다

| 파일명 | 장면 |
|---|---|
| `images/02-fly.png` | An old leather trunk shooting up out of a chimney into the night sky with a startled young man inside clutching the sides, the town shrinking below, exhilarating and funny. |

## 3장 · 낯선 나라의 탑

| 파일명 | 장면 |
|---|---|
| `images/03-tower.png` | A busy eastern city street of domes and awnings where a young man questions a market seller, a tall lone tower rising beyond the rooftops, colourful and lively. |

## 4장 · 창문으로 들어가다

| 파일명 | 장면 |
|---|---|
| `images/04-window.png` | A tower bedroom at night where a young man steps in from the window with a trunk hovering behind him, a startled princess sitting up on a couch, moonlight and gauzy curtains, charming. |

## 5장 · 이야기를 들려주다

| 파일명 | 장면 |
|---|---|
| `images/05-story.png` | A tower room where a young man acts out a story with sweeping gestures, kitchen objects magically sketched in the air around him, the princess laughing on the couch, warm lamplight. |

## 6장 · 임금님 앞에서

| 파일명 | 장면 |
|---|---|
| `images/06-parents.png` | A domed throne room where a young man tells a story with animated gestures, the queen dabbing her eyes and the king slapping his knee, courtiers delighted, festive. |

## 7장 · 하늘에서 터진 불꽃

| 파일명 | 장면 |
|---|---|
| `images/07-fireworks.png` | A night sky above a domed city bursting with fireworks launched from a flying trunk, crowds below cheering with upturned faces, spectacular and joyful. |

## 8장 · 타 버린 가방

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A forest clearing at dawn where only a heap of ash remains where the trunk stood, a young man staring at it, and far off a princess at a tower window scanning the empty sky, wistful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
