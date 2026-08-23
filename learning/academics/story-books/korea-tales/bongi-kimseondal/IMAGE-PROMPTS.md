# 제미나이 그림 프롬프트 — 봉이 김선달

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 이 책만의 요령

능청스럽고 재미있는 이야기예요. 김선달은 사기꾼이 아니라 **한 수 위인 사람**으로 그려 주세요. 늘 여유롭고, 늘 반쯤 웃고 있어야 합니다.

- **대동강이 이 책의 또 다른 주인공입니다.** 강은 넓고 시원하게, 물빛이 살아 있게 그려 주세요.
- **상인 셋의 표정 변화가 이야기의 축입니다.** 2번 거만함 → 6번 놀람 → 8번 흥분 → 10번 새파랗게 질림 → 12번 할 말 없음. 같은 세 사람의 얼굴이 그림마다 확실히 달라야 합니다.
- **물장수는 물지게를 진 사람이에요.** 어깨에 지게를 지고 양쪽에 나무 물통을 매단 모습으로, 여러 명이 줄지어 다니게 그려 주세요.
- 12번에서 김선달은 돈이 아니라 **강물을 가리키고** 있어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, in the look of a classic Korean animated storybook.
Setting is late-Joseon Pyongyang: the wide blue-green Daedong River with willow
trees along the bank, big flat rocks at the water's edge, a stone city gate and
tiled roofs on the hillside behind, and small boats on the water. Bright clear
daylight, sparkling water, fresh greens and warm earth tones. Lively cartoon
expressions. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Kim Seondal: a lean middle-aged man in a clean but plain off-white durumagi coat
and a black horsehair hat, a neat short beard, narrow amused eyes and a faint
half-smile in every single picture. Relaxed, never sly-looking. The three
merchants: from Hanyang, in glossy silk coats - one in deep blue and stout with a
round face, one in wine red and tall and thin, one in dark green and short with a
fan. Strings of brass coins hang from all their belts. They always appear as a
set of three and always react together. The water sellers: ordinary working
people in hemp clothes with wooden A-frame carriers on their shoulders and a
wooden bucket hanging from each side.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. The wide blue-green Daedong River fills the lower
two thirds of the tall frame, sparkling in the sun, willow branches trailing in
from the sides. On a big flat rock at the near bank, Kim Seondal sits
cross-legged with his hat tipped back and a faint half-smile, one hand resting on
a small heap of brass coins. Behind him, up on the far bank, the tiled roofs and
stone gate of Pyongyang. Bright, wide, and calm.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-seondal.png` — 평양 사람이면 다 아는 김선달

```
Wide scene in a busy Pyongyang market street. In the centre, Kim Seondal walks
along with his hands behind his back and a faint smile, and everyone he passes
turns to greet him - a rice seller waves, two women laugh behind their sleeves, a
child tugs his coat hem. Tiled roofs, hanging signs, warm morning light. Everyone
here knows him.
```

### `02-merchants.png` — 한양에서 온 상인 셋

```
Wide scene at the stone city gate. In the centre, the three silk-coated
merchants stride in side by side, chins up, strings of brass coins swinging from
their belts, the short one fanning himself lazily. Behind them a laden packhorse.
On the left, two Pyongyang townsfolk step aside and exchange a look. Bright day.
Comic arrogance.
```

### `03-water.png` — 대동강가의 물장수들

```
Wide scene at the riverbank. Across the middle of the frame, the wide sparkling
Daedong River. Along the near bank, a line of water sellers dip their wooden
buckets and hoist their A-frame carriers, working steadily. On the right, half
out of frame, Kim Seondal watches from under a willow with one eyebrow raised and
his eyes bright with an idea. Morning light on water.
```

### `04-plan.png` — 물장수들을 불러 모으다

```
Wide interior of a modest room at night, one oil lamp. In the centre, Kim
Seondal sits with a pile of brass coin strings in front of him, pressing one
string into a water seller's hand while explaining with his other hand. Around
him, half a dozen water sellers sit in a rough circle, heads tilted, brows
furrowed in total confusion. Warm amber lamplight. Conspiratorial and funny.
```

### `05-collect.png` — 어르신, 오늘 물값입니다

```
Wide scene at the riverbank in the early morning. On the left, Kim Seondal sits
squarely on a big flat rock, perfectly at ease. In front of him a water seller
bows deeply and sets a string of coins down at his feet. On the right, the three
merchants are passing by and the stout one has stopped mid-step, head turning.
Golden morning light on the water.
```

### `06-line.png` — 줄줄이 돈을 내놓다

```
Wide scene at the riverbank. On the left, Kim Seondal sits on his rock counting
coins without looking up, the pile in front of him now large. A line of water
sellers waits its turn, each bowing and paying. On the right, the three merchants
have gathered shoulder to shoulder, all three with their eyes enormous and their
mouths open, the fan frozen halfway. Sparkling water behind.
```

### `07-claim.png` — 조상 대대로 물려받은 것이지요

```
Wide scene at the riverbank. On the right, Kim Seondal finally looks up, one
hand gesturing lazily out across the whole river behind him, half-smiling. On the
left, the three merchants lean in as one, the tall one pointing at the water with
a shaking finger, the short one clutching his own coin strings. The wide river
sparkles between them. Comic disbelief turning to greed.
```

### `08-sell.png` — 우리에게 파시오!

```
Wide scene at the riverbank. On the left, the three merchants crowd around Kim
Seondal, all talking at once - the stout one gripping his sleeve, the tall one
shoving a heavy wooden chest of coins forward with the lid thrown open, the short
one waving his fan wildly. On the right, Kim Seondal turns his face half away with
a reluctant expression that is not quite hiding a smile. Bright noon.
```

### `09-morning.png` — 이튿날 아침, 바위 위의 세 사람

```
Wide scene at the riverbank in the morning. On the right, the three merchants
sit in a row on the big flat rock, arms folded, chins up, looking enormously
pleased with themselves. On the left, water sellers come down to the water and
begin filling their buckets, paying them no attention at all. Willows, sparkling
water, blue sky. The calm before.
```

### `10-refuse.png` — 강물이 어떻게 누구 것이 됩니까

```
Wide scene at the riverbank. On the left, a water seller stands with one hand on
his hip and the other waving them off, laughing openly, and behind him the others
shoulder their carriers and walk away chuckling. On the right, the three
merchants are on their feet, faces drained white, the stout one's arms out, the
tall one gripping his own hair, the fan lying dropped on the rock. Bright
merciless daylight.
```

### `11-return.png` — 한 푼도 안 썼소

```
Wide interior of a plain room. On the right, Kim Seondal sits calmly behind the
wooden coin chest, pushing it back across the floor with one hand, the lid open
and every string of coins still inside. On the left, the three merchants have
burst in red-faced and furious - and are now stopped dead, fists still raised,
faces sliding into bewilderment. Warm light. The turn of the story.
```

### `12-lesson.png` — 저 강물은 아무도 못 삽니다

```
Wide scene on the riverbank at sunset. On the right, Kim Seondal stands with one
arm stretched out pointing at the wide river, not at the money, his face for once
completely serious. On the left, the three merchants stand in a row looking out at
the water, hats in their hands, saying nothing. The Daedong River glows gold and
rose from bank to bank. Quiet and large.
```

### `end.png` — 마지막 (가로 16:9)

```
The wide Daedong River at dusk, no people. A big flat rock at the near bank with
a single wooden water bucket left standing on it, willow branches trailing in the
water, the last light spreading gold across the whole surface of the river.
Calm and open.
```
