# 제미나이 그림 프롬프트 — 자린고비

그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 이 책만의 요령

1장과 2장은 **웃기는 이야기**, 3장은 **가슴이 뭉클해지는 이야기**예요. 그림의 분위기가 10번부터 확실히 달라져야 합니다.

- **자린고비를 인색해 보이게 그리지 마세요.** 마르고 검소하지만 눈매가 따뜻한 노인으로요. 표정은 늘 진지한데 하는 짓이 웃겨야 합니다.
- **굴비 한 마리가 이 책의 상징입니다.** 2번, 3번, 14번에 똑같은 굴비가 똑같은 자리에 매달려 있어야 해요. 바싹 마른 갈색 조기 한 마리를 새끼줄로 꼬리부터 묶어 천장에 매답니다.
- **4번의 부채질이 최고로 웃긴 장면이에요.** 부채는 완전히 정지, 얼굴만 좌우로 흔들리는 잔상으로 그려 주세요.
- **12번이 이 책의 절정입니다.** 새벽 마당 가득 쌀가마가 줄지어 나와 있는 장면이니 크고 시원하게 그려 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with clean bold
outlines and rich colors, in the look of a classic Korean animated storybook.
Setting is a Joseon-era town in Chungju: a deliberately shabby tiled-roof house
with a sagging roof and a leaning wall, a plain room with a low meal table, a
row of brown earthenware jars on a raised platform in the yard, a big wooden
granary, and dry cracked rice paddies. Warm earth tones, amber lamplight, cold
blue for the famine scenes and gold sunrise at the end. Expressive comic faces.
No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Jaringobi: a thin elderly man with a short white beard and a very plain
undyed hemp coat, patched at the elbows, a black horsehair hat gone soft with
age. His face is always perfectly serious and his eyes are kind. Never draw him
as sour or mean. His wife: a small tidy woman in faded grey, long past being
surprised by anything. The youngest child: a round-cheeked boy of about seven in
a patched jacket, endlessly hungry. The rival miser: a stout man from Gyeongsang
in a neat dark coat with a bundle on his back and a competitive glint. The
dried fish: one whole flat brown salted croaker on a straw cord, drawn exactly
the same every time.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A plain Korean room seen from floor level. In
the upper part of the tall frame, a single flat brown dried fish hangs from the
ceiling beam on a straw cord, lit warmly. Below it, near the bottom of the
frame, a low table holding one bowl of rice and one bowl of water, and around
the table four faces all tipped straight up, eyes fixed on the fish. Amber
lamplight, deep shadow at the edges. Funny and a little touching.
```

## 본문 열네 장 (모두 가로 16:9)

### `01-house.png` — 저 집이 부잣집이라고?

```
Wide scene in a Joseon town street. On the right, a shabby house with a sagging
tiled roof, a leaning earthen wall and a weathered gate. On the left, two
passers-by have stopped to look at it, one leaning over to whisper behind his
hand, the other with his eyebrows raised. Fine houses further down the street for
contrast. Warm afternoon light.
```

### `02-gulbi.png` — 한 술 뜨고 한 번 보아라

```
Wide interior of a plain room. In the centre, a low table with one bowl of rice
and one bowl of water. Hanging from the ceiling beam directly above it, a flat
brown dried fish on a straw cord. Jaringobi holds up one finger, perfectly
serious. His wife and the small boy have their spoons in their mouths and their
faces tipped straight up at the fish. Amber lamplight. Absurd and funny.
```

### `03-twice.png` — 짜다! 어서 물을 켜라!

```
Wide interior scene. On the right, Jaringobi is on his feet with one arm flung
out pointing at the water bowl, mouth wide open, hat askew, thoroughly outraged.
On the left, the small boy shrinks back with his spoon still raised, cheeks
puffed, lower lip pushed out in enormous injustice. The dried fish swings gently
overhead. Lamplight, dust motes. Hilarious.
```

### `04-fan.png` — 부채는 가만, 고개만 절레절레

```
Wide interior scene on a hot summer day. In the centre, Jaringobi sits
cross-legged holding an open paper fan out at arm's length, absolutely still and
rigid - while his own head blurs left and right with motion arcs, beard flying.
His expression is completely serious. On the right, his wife watches with one
hand over her eyes. Bright hot light, sweat drops. The funniest picture in the
book.
```

### `05-fly.png` — 내 된장 내놓고 가거라!

```
Wide scene at the jar platform in the yard. On the left, a fat housefly lifts
off the rim of an open brown soybean-paste jar with a tiny smear on its front
legs, drawn with a motion trail. On the right, Jaringobi bursts out of the door
in his socks, one arm outstretched, hat flying off, face thunderous. Sunlight,
jars, scattering chickens. Comic fury.
```

### `06-chase.png` — 한양! 저놈이 한양으로 간다!

```
Wide scene of open countryside with a road winding over a hill. In the upper
left, the fly buzzes along with a long dotted flight line. Below and behind it,
Jaringobi runs flat out, coat streaming, one straw sandal already flying off. On
the right, three farmers by the roadside double over laughing, one pointing.
Bright wide daylight, dust cloud.
```

### `07-hanyang.png` — 짚신이 다 떨어졌구나

```
Wide scene in a busy Hanyang market street. In the centre, Jaringobi sits down
hard against a tiled wall with his legs straight out, holding up one completely
destroyed straw sandal, head thrown back laughing at the sky. The fly disappears
over a roof in the upper right. Crowds and shop signs all around him ignoring
him. Warm evening light. Funny and oddly happy.
```

### `08-rival.png` — 어디 한번 겨루어 보자

```
Wide scene on a country road at dawn. In the centre, the rival miser strides
along with a bundle on his back and a walking stick, jaw set, eyes narrowed with
determination, mountains ahead of him. Beside the road, a milestone. Cool morning
light, mist in the valley. Absurdly serious.
```

### `09-contest.png` — 보면 밥을 더 먹게 되지 않소

```
Wide interior of the plain room. On the right, the rival miser eats his rice
with his eyes fixed straight down on his bowl, refusing to look up, a bead of
sweat on his temple. Above him hangs the dried fish. On the left, Jaringobi has
frozen with his spoon halfway up, staring at his guest with dawning respect.
Lamplight. Two ridiculous men in perfect earnest.
```

### `10-drought.png` — 쩍쩍 갈라진 논바닥

```
Wide scene of a valley of rice paddies in a drought. The whole foreground is
cracked dry mud in a pattern like a turtle shell, stubble burnt brown. A dry
stream bed cuts through. In the distance, small figures stand in the fields with
their arms hanging down. Harsh white sky, no clouds, bleached colours. Bleak and
quiet - the mood of the book changes here.
```

### `11-mutter.png` — 그 양반이 쌀 한 톨을 내놓겠나

```
Wide scene outside the granary wall at night. On the left, three thin villagers
stand in the dark looking up at a lit window, faces hollow and resentful, one
child holding a mother's skirt. On the right, warm light spills from the granary
window across the wall. Cold blue night against one warm square of light. Tense
and sad.
```

### `12-open.png` — 활짝 열린 곳간

```
Wide scene of the house yard at sunrise. The granary doors stand wide open in
the centre and rows and rows of full straw rice sacks have been carried out and
lined up across the whole yard, dozens of them. Gold sunrise light pours over
them. At the gate on the left, villagers stand frozen mid-step with their hands
over their mouths. Enormous, warm, overwhelming.
```

### `13-share.png` — 오늘 같은 날 쓰려고 아낀 것이지요

```
Wide scene at the gate. On the right, Jaringobi leans against the gatepost with
his arms folded and a small quiet smile, entirely at ease. On the left,
villagers load sacks onto their backs, and an old woman has caught his sleeve
with both hands, weeping. Children run between the sacks. Gold morning light.
Warm and moving.
```

### `14-fish.png` — 이번엔 못 본 척했답니다

```
Wide interior of the plain room that evening. The same low table, one bowl of
rice and one bowl of water, the same dried fish on its cord above. The small boy
sneaks a second long look up at the fish with one eye on his grandfather. On the
right, Jaringobi looks pointedly the other way, the corner of his mouth turned
up. Warm lamplight. Gentle and funny.
```

### `end.png` — 마지막 (가로 16:9)

```
A plain empty Korean room at night, no people. A ceiling beam with a straw cord
hanging from it and one flat brown dried fish, and on the floor below a low table
wiped clean with two empty bowls turned upside down. A single oil lamp burning
low. Quiet and warm.
```
