# 제미나이 그림 프롬프트 — 견우와 직녀

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

**이 책은 아름다움이 전부입니다.** 웃긴 장면이 하나도 없어요. 밤하늘과 은하수를 화면 가득 쓰고, 인물은 그 안에서 작게 그려 주세요. 열 번째 장면(오작교)이 이 책에서 가장 큰 그림이 되어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, luminous cel-animation style with clean
lines and deep rich colors, similar to a classic Korean animated storybook.
Setting is a mythic heavenly realm: rolling cloud meadows, a weaving room with a
wooden loom, and above all a vast silver river of stars - the Milky Way - cutting
across a deep indigo sky. Palette of indigo, silver, warm gold and soft rose.
Characters wear flowing hanbok with long ribbons. Grand, quiet and beautiful -
never comic, never frightening. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Gyeonu: a young herdsman in a simple pale hanbok with sleeves tied back, a
straw hat slung on his back, honest sunburnt face. He is always shown with at
least one large white ox. Jiknyeo: a young woman in a flowing pale blue and white
hanbok with very long ribbons and sleeves that trail like cloud, hair in a long
plait. She is always near her wooden loom or reaching across the star river. The
Jade Emperor: an immense dignified old figure in deep crimson robes and a tall
crown, white beard, seen from below - stern but not cruel. The birds: magpies
(black and white with blue-sheened tails) and crows (glossy black), drawn in
their hundreds as a single moving mass.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A vast silver river of stars runs from the bottom
of the tall frame to the top, splitting a deep indigo sky. On the left bank near
the bottom, a tiny figure in pale hanbok reaches out one hand; on the right bank,
another tiny figure reaches back. Between them, across the middle of the frame, a
faint bridge of birds is just beginning to form. Silent, enormous, aching.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-gyeonu.png` — 은하수 건너편에서 소를 치는 견우

```
Wide heavenly landscape. Rolling meadows of cloud stretch across the frame under
a deep blue sky scattered with daytime stars. On the right, a young herdsman
walks with a switch over his shoulder among three great white oxen, small against
the vastness. On the far left edge, the silver band of a star river marks the
horizon. Warm gold light, peaceful and industrious.
```

### `02-jiknyeo.png` — 베틀 앞의 직녀

```
Wide interior of an open pavilion on a cloud terrace. On the left, a young woman
sits at a large wooden loom, her hands mid-motion on the shuttle, threads
stretched taut and glowing. On the right, the cloth spilling from the loom flows
out of the pavilion and becomes actual sunset clouds and starlight in the sky
beyond. Silver and rose light. Magical and calm.
```

### `03-meet.png` — 옥황상제가 짝지어 준 날

```
Wide scene on a bridge of light across the star river. In the centre, the
herdsman and the weaver meet at the middle of the bridge and bow to each other,
her long ribbons and sleeves lifting. Above and behind, huge and softly lit,
crowds of heavenly figures look on. The whole sky is unusually bright. Joyful and
ceremonial.
```

### `04-idle.png` — 멈춘 베틀과 흩어진 소

```
Wide split scene. On the left, the wooden loom sits abandoned with a spider web
between its posts and a layer of dust on the shuttle. On the right, white oxen
wander loose across cloud meadows with no one herding them, one chewing at a torn
bolt of cloth. In the far distance in the middle, two small figures sit close
together, oblivious. Gently reproachful.
```

### `05-anger.png` — 노한 옥황상제

```
Wide scene from a very low viewpoint. Filling the upper two thirds, the Jade
Emperor stands in deep crimson robes with one arm raised, face stern, storm light
gathering behind his crown. At the bottom, tiny, the herdsman and the weaver
kneel side by side with their heads bowed. Dark clouds and shafts of cold light.
Awe rather than terror.
```

### `06-parted.png` — 은하수 양쪽으로 갈라지다

```
Wide scene dominated by the star river running down the centre of the frame,
wide and impassable. On the left bank, the weaver stands with one hand pressed to
her chest; on the right bank, the herdsman with his ox. Both are turned toward
each other, both very small, separated by an enormous glittering emptiness. Deep
indigo and silver. Lonely and beautiful.
```

### `07-year.png` — 일하면서도 자꾸 강 쪽을 보고

```
Wide split scene through the seasons. On the left, the weaver works her loom but
her head is turned toward the window and the star river beyond. On the right, the
herdsman drives his oxen but looks back over his shoulder in the same direction.
Between them, cloud meadows change colour from spring green to summer gold.
Quietly aching.
```

### `08-river.png` — 다리가 없는 강가에서

```
Wide scene at the star river on the seventh night. On both banks the two figures
have run right to the water's edge and dropped to their knees, arms reaching
across, faces lifted. The river between them is impossibly wide and bright. No
bridge anywhere. Above, a thin crescent moon. Heart-breaking and still.
```

### `09-birds.png` — 울음소리를 들은 땅 위의 새들

```
Wide scene on earth at night. Below, a Korean village of thatched roofs under a
summer sky. On rooftops, walls and branches, hundreds of magpies and crows have
all turned their heads upward at once, listening. Above them, high and far, the
faint silver band of the star river. Moonlight on black and white feathers.
Hushed and expectant.
```

### `10-bridge.png` — 몸으로 놓은 다리, 오작교

```
Wide scene, the biggest image in the book. Across the entire width of the frame,
thousands of magpies and crows have linked together wing to wing over the star
river, forming a living bridge of black and white and blue sheen. Their feathers
catch starlight. On the far left and far right, two tiny figures step onto the
bridge from opposite banks. Vast, breathtaking, reverent.
```

### `11-reunion.png` — 강 한가운데의 하룻밤

```
Wide scene at the centre of the bird bridge. The herdsman and the weaver have met
in the middle and stand with their hands joined, foreheads close, her long
ribbons streaming. Beneath their feet the birds hold steady. All around, the star
river blazes. Their two figures are small in an enormous glittering frame.
Tender and fleeting.
```

### `12-rain.png` — 헤어지며 흘린 눈물이 비가 되어

```
Wide scene split between sky and earth. Above, the bird bridge is coming apart as
birds peel away, the two figures drawing back toward opposite banks, a few bright
drops falling from the middle. Below, on earth, warm summer rain falls on green
rice paddies and thatched roofs, and a magpie with a bare patch on its head shakes
water from its wings. Melancholy and warm at once.
```

### `end.png` — 마지막 (가로 16:9)

```
A summer night sky over a quiet Korean village, no people. The Milky Way arcs
overhead in silver, two brighter stars facing each other from opposite banks of
it, a few magpies asleep on a roof ridge below. Deep indigo and silver.
Peaceful and vast.
```
