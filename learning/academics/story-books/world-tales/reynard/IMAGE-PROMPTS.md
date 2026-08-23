# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm autumn woodland light, no
text or letters in the image, a medieval animal court in a forest clearing, a
fox's burrow, a farmyard and a river bank, animals dressed in simple medieval
clothes, very expressive comic faces, wide panoramic composition, funny and
never cruel.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Reynard the fox: a lean red fox with a knowing grin, a small green cloak and
restless paws. King Noble the lion: a broad golden lion in a crown, slow and
grand. Isengrim the wolf: a big grey wolf in a dented helmet, always furious.
Bruin the bear: a huge brown bear with a honey-stained muzzle. Tibert the cat: a
small striped cat with a nervous tail. Grimbart the badger: a stout badger in a
scholar's cap.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a sly red fox standing calmly in the centre of a woodland clearing court, a lion king on a mossy throne above and animals crowded on all sides, autumn leaves falling, witty and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 임금님의 부름

| 파일명 | 장면 |
|---|---|
| `images/01-court.png` | A woodland clearing court where a crowned lion sits on a mossy throne surrounded by animals in medieval dress, one empty seat in the front row, an angry wolf standing to accuse, autumn light. |

## 2장 · 쏟아지는 고발

| 파일명 | 장면 |
|---|---|
| `images/02-accusations.png` | An uproarious animal court where a bear with a swollen nose and a cat with a bandaged tail both shout their complaints at once, other animals leaning in, the lion king frowning, comic chaos. |

## 3장 · 곰이 다녀오다

| 파일명 | 장면 |
|---|---|
| `images/03-bear.png` | A forest scene where a huge bear jams his head into a split tree trunk after honey while a fox quietly pulls out the wedge, bees swirling, the bear's legs kicking, hilariously comic. |

## 4장 · 고양이도 다녀오다

| 파일명 | 장면 |
|---|---|
| `images/04-cat.png` | A barn doorway at dusk where a striped cat leaps in and is caught by a rope snare while a fox strolls away yawning with his paws behind his back, moonlit farmyard, very funny. |

## 5장 · 오소리의 설득

| 파일명 | 장면 |
|---|---|
| `images/05-badger.png` | A cosy earth burrow entrance where a stout badger in a scholar's cap earnestly persuades a lounging fox, the fox's eyes glinting with a plan, warm evening woodland. |

## 6장 · 여우의 이야기

| 파일명 | 장면 |
|---|---|
| `images/06-trial.png` | A fox standing before a lion king in a woodland court, one paw on his heart with an expression of injured innocence, the king leaning forward greedily at the word treasure, animals murmuring. |

## 7장 · 있지도 않은 보물

| 파일명 | 장면 |
|---|---|
| `images/07-treasure.png` | A muddy swamp where a wolf and a bear flounder up to their chests searching for treasure, while far behind them a fox tiptoes away over a hill with a travelling staff, comic and bright. |

## 8장 · 숲은 여전히

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A woodland court at the end of day where animals avoid each other's eyes as a furious wolf demands action, the lion king coughing awkwardly, falling autumn leaves, wry and warm. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
