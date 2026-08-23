# 제미나이 그림 프롬프트 — 도깨비 감투

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

**돌쇠가 보이지 않는 장면이 이 책의 핵심입니다.** 감투를 쓴 돌쇠는 그리지 말고, 그가 있다는 것을 다른 것으로 보여 주세요 — 허공에 떠 있는 떡, 저절로 열리는 문, 흙바닥의 발자국처럼요. 뒤로 갈수록 돌쇠의 표정이 즐거움에서 불안으로 바뀌어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean bold
outlines and warm colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era village and its market: thatched cottages, an earthen
yard, a busy market of straw-mat stalls with rice cakes, fruit and bolts of
cloth, and a dim kitchen with a clay stove. Warm daylight for the market, deep
amber firelight at night. Expressive faces, gentle humour early on turning
uneasy later. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Dolsoe: a thin hardworking man in his thirties, patched grey hanbok, a towel tied
round his head, honest tired face. Early on he grins with mischief; by the middle
his eyes have gone shifty and hollow. The magic hat: a small round black Korean
gamtu, worn and slightly dented; from the ninth picture onward it has a bright
red cloth patch stitched crookedly on one side. When Dolsoe wears it he is
completely invisible - do not draw him at all, only the effects he causes.
Market people: stallholders and shoppers in muted hanbok, increasingly nervous as
the story goes on.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A busy Korean market seen from above at midday,
stalls and shoppers filling the lower two thirds. Floating in the empty air above
the crowd, at head height, a single small bright red cloth patch - nothing else
around it. Every face in the market is turned up toward it, mouths open. Warm
daylight. Unsettling and irresistible.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-poor.png` — 늘 가난한 돌쇠

```
Wide interior of a bare Korean room at evening. On the right, Dolsoe sits
cross-legged on the floor in patched clothes, staring down at a single empty
wooden bowl in front of him, chin in one hand, shoulders slumped. On the left,
the open door shows a modest yard and a fading sky. Warm dim light, quiet and
humble.
```

### `02-find.png` — 무너진 무덤가에서 주운 것

```
Wide scene on a grassy hillside with an old collapsed grave mound overgrown with
weeds. On the right, Dolsoe crouches with his A-frame carrier beside him, lifting
a small dusty black hat out of the long grass with two fingers, head tilted in
curiosity. Late afternoon light through pines, a slight stillness in the air.
```

### `03-vanish.png` — 거울에 비치지 않는 몸

```
Wide interior of Dolsoe's room. On the right, an old bronze mirror on a low
stand, and in it - nothing. The room reflects back empty. On the left, we see
only the effects of an invisible man: the hat is gone from the floor, a sleeve of
his jacket hangs impossibly in mid-air, one straw sandal lifted off the ground.
Lamplight. Eerie and thrilling.
```

### `04-play.png` — 재미로 시작한 장난

```
Wide scene in a neighbour's sunny yard. A laundry line jerks and swings with no
one near it; a broom tips over on its own; a chicken flaps away from an empty
patch of ground. On the right, a woman stands with a basin on her hip staring at
the line, brow furrowed, hair lifting. No sign of Dolsoe at all. Bright and
comic.
```

### `05-market.png` — 허공에 떠오른 떡 하나

```
Wide market scene at midday. In the centre, above a stall of white rice cakes, a
single rice cake hovers in mid-air about chest height, tilted as if held. The
stallholder has half risen from her stool, one hand out, mouth open. Two shoppers
beside her have frozen mid-gesture. Busy market all around, ordinary and sunny -
which makes the floating cake worse.
```

### `06-bolder.png` — 점점 대담해지는 손

```
Wide market scene, wider and busier. Across the frame, several impossible things
happen at once: a persimmon lifts off a pile, a bolt of blue cloth slides off a
table and floats away, the lid of a coin box swings open by itself and coins rise
out in a small stream. Stallholders lunge and grab at empty air from every
direction. Chaotic and unnerving.
```

### `07-fear.png` — 귀신이 든다는 소문

```
Wide market scene at dusk, stalls half packed up. Stallholders sit hunched on
their mats with their arms wrapped around their goods, lanterns lit early, eyes
darting. Two men stand back to back with sticks. An old woman ties a rope around
her basket. Long blue shadows. On the far right, half hidden behind a post,
Dolsoe stands visible for once, hat in hand, watching them - and his face is not
happy.
```

### `08-hole.png` — 불티에 뚫린 구멍

```
Wide interior of a dim kitchen at night. On the left, a clay stove with a low
fire, a single spark arcing up. On the right, the black hat lying on the floor
with a small scorched hole in its side and a thin curl of smoke rising. Dolsoe's
hands rush into frame from the edge, patting at it frantically. Deep amber
firelight, sharp shadows.
```

### `09-patch.png` — 빨간 헝겊을 대고 기우다

```
Wide interior scene by lamplight. In the centre, Dolsoe sits hunched over the hat
on his knee, tongue between his teeth, pushing a needle through a bright red
square of cloth, the stitches crooked and clumsy. An open sewing box beside him.
His face is lit from below, tired and set. Warm dim light, quiet before
disaster.
```

### `10-spot.png` — 둥둥 떠다니는 빨간 점

```
Wide market scene at midday, from a low angle. Through the crowd, a small bright
red patch of cloth glides along at head height, nothing attached to it. Along its
path, one after another, people's heads turn and follow it - a boy pointing, a
woman gripping her neighbour's sleeve, a man half standing. The red is the only
strong colour in the frame. Tension building.
```

### `11-caught.png` — 감투가 벗겨지는 순간

```
Wide market scene, the moment of exposure. In the centre, a hand has closed on
the red patch and yanked the black hat up into the air - and Dolsoe appears out
of nothing beneath it, mid-stride, arms up, face stricken. All around, the crowd
recoils in a ring, mouths open, some falling backward. Dust and dropped goods.
Silence you can hear.
```

### `12-burn.png` — 아궁이에 넣은 감투

```
Wide interior scene of Dolsoe's kitchen at night. In the centre, Dolsoe crouches
before the open stove mouth, having just pushed the black hat into the flames,
watching it curl and blacken, the red patch the last thing to catch. His face is
calm and clear for the first time in the book, firelight warm on it. Behind him,
the room is bare again. Quietly hopeful.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet Korean village yard at sunrise, no people. A clay stove with cold grey
ash and one small scrap of red cloth half burnt at the edge, a broom leaning
against the wall, warm morning light across the swept earth. Calm and settled.
```
