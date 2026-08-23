# 제미나이 그림 프롬프트 — 김수로

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

**밝고 시끌시끌한 이야기**예요. 앞부분은 축제처럼, 뒷부분은 바다 냄새가 나게 그려 주세요.

- **4번이 이 책의 첫 절정입니다.** 이백 명이 봉우리 위에서 발을 구르며 노래하는 장면이에요. 사람 수를 아끼지 말고 흙먼지와 동작선을 잔뜩 넣어 주세요.
- **황금 알 여섯 개는 늘 여섯 개.** 6번과 7번에 정확히 여섯 개가 보여야 합니다.
- **가야는 쇠의 나라예요.** 10번과 14번에 철갑옷, 말투구, 덩이쇠, 대장간을 확실히 보여 주세요. 이 책에서 가장 가야다운 부분입니다.
- **12번의 허황옥을 신라나 백제 사람처럼 그리지 마세요.** 바다 건너에서 온 사람이라는 것이 옷과 배 모양에서 한눈에 보여야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, in the look of a classic Korean animated film about
myth. Setting is the Gimhae area in the far past: a low round grassy peak called
Gujibong above a river delta, reed marshes, a busy river-mouth harbour with
wooden boats, ironworking villages with charcoal smoke, and the open sea beyond.
Warm greens and ochres, iron greys, and deep blue sea. Big lively crowds. Joyful
and energetic, never dark. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The nine chiefs: nine older men in undyed hemp with different hats and beards,
always drawn as the same recognisable nine, boisterous and loud. Suro: first a
baby, then a broad-shouldered young man in a plain dark robe with a wide leather
belt and iron ornaments, black hair in a topknot, a steady friendly face; never
draw him in Chinese-style court dress. The five brothers: five young men who look
like Suro but each slightly different, always shown as a group of five. Heo
Hwangok: a young woman in flowing patterned cloth of deep red and saffron with
gold bangles and a long shawl over her hair - clearly dressed from far overseas,
not Korean; a calm curious face. Gaya people: workers in hemp with iron tools,
and warriors in riveted iron plate armour with iron horse masks.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A low round grassy hilltop under a bright sky.
Down the middle of the tall frame hangs a long purple cord stretching up out of
the clouds, with a red cloth bundle tied at its end, just reaching the grass. The
bundle is half open and golden light spills from it. Around the hilltop, a crowd
of people has thrown its arms up mid-dance, mouths open in song, dust rising from
stamping feet. Gold, purple and green. Loud and joyful.
```

## 본문 열네 장 (모두 가로 16:9)

### `01-gugan.png` — 우리 마을이 제일이지

```
Wide scene of a river delta with nine small villages scattered across it among
reed marshes. In the foreground on a path, three of the chiefs have met and are
squabbling cheerfully, each pointing back toward his own village. Smoke from
roofs, boats on the water, low hills beyond. Bright morning, green and ochre.
Lively but scattered.
```

### `02-voice.png` — 여기에 사람이 있느냐?

```
Wide scene on a low round grassy peak. The hilltop is bare and empty except for
grass bending in the wind. Coming up over the rim from all sides, the nine chiefs
scramble onto the summit, out of breath, looking wildly around for whoever is
speaking - and there is no one there at all. Big empty sky. Eerie and exciting.
```

### `03-song.png` — 거북아 거북아, 머리를 내어라

```
Wide scene on the hilltop. The nine chiefs kneel in a ring on the grass with
their heads tilted, listening hard, one cupping his ear, one already scraping at
the earth with his hands. Above them the empty bright sky. In the grass at the
centre, a small tortoise has poked its head out and is watching. Wind, sunlight.
Comic and solemn at once.
```

### `04-dance.png` — 봉우리가 들썩들썩

```
Wide scene on the hilltop packed with people - two hundred villagers and the
nine chiefs stamping, clapping, arms flung up, mouths wide open in song, dust
boiling up around their feet. Hats and sleeves flying, drums being beaten.
Everyone is looking upward. Gold afternoon light through the dust. The most
crowded, loudest picture in the book.
```

### `05-rope.png` — 하늘에서 내려온 자줏빛 줄

```
Wide scene on the hilltop. Down through a break in the clouds comes a long
purple cord with a red cloth bundle knotted at its end, settling onto the grass in
the centre of the frame. The crowd has fallen back in a ring, arms half raised,
every face turned up, the song stopped mid-word. Shafts of light through cloud.
Held breath.
```

### `06-eggs.png` — 황금빛 알 여섯 개

```
Wide interior of a simple house that night. In the centre, a golden box sits open
on a low table with exactly six round golden eggs inside, each glowing like a
small sun and lighting the whole room. Around the table, the nine chiefs sit
wide-awake in a ring, chins on hands, not one of them able to sleep. Warm gold
light, deep shadows. Wonder and comedy.
```

### `07-hatch.png` — 여섯이 한꺼번에 방긋

```
Wide interior scene at dawn. In the centre, the golden box lies open with six
broken shells in it, and six identical newborn baby boys sit in a row inside,
all beaming at once. Around them, the nine chiefs have fallen over backwards in
shock, hats flying, arms in the air. Morning light through the door. Hilarious
and miraculous.
```

### `08-suro.png` — 이 아이가 우리 임금이오

```
Wide scene in a village square. In the centre, the young man Suro stands in a
plain dark robe with an iron-studded belt, tall and calm, having grown to
adulthood in ten days. Around him the nine chiefs bow, and villagers crane to
look over each other's shoulders. Sunlight, thatched roofs, banners of plain
cloth. Simple and strong.
```

### `09-six.png` — 각자 제 골짜기로

```
Wide landscape scene of a river valley splitting into several smaller valleys. In
the foreground, Suro clasps hands with his five brothers, each of whom is setting
off on a different path with a small group of followers. Five roads lead away into
five valleys under a wide sky. Green hills, morning light. Parting without
sadness.
```

### `10-iron.png` — 골짜기마다 망치 소리

```
Wide scene of an ironworking village. On the left, a charcoal furnace with
bellows being pumped and orange metal glowing. In the centre, smiths hammer on
anvils, sparks flying. On the right, stacks of flat iron bars are being carried
down to boats at a jetty, and a finished suit of riveted iron armour hangs on a
frame. Smoke, sparks, iron grey and orange. Busy and strong.
```

### `11-alone.png` — 내 짝은 하늘이 보내 줄 것이오

```
Wide scene on a terrace above the harbour at night. On the right, Suro stands
alone at the rail looking out at the dark sea, one hand on the wood. On the left,
two of the chiefs stand back with their heads together, one gesturing helplessly.
Moonlight on the water, lamps at the jetty below. Quiet and patient.
```

### `12-ship.png` — 붉은 돛을 단 배

```
Wide scene at the harbour. On the right, a large seagoing ship with a deep red
sail has come alongside the jetty, its hull and rigging clearly foreign in shape.
Coming down the plank, Heo Hwangok in flowing red and saffron patterned cloth with
gold bangles and a shawl over her hair, her attendants behind her with chests and
jars. On the left, a crowd of Gaya villagers stares. Bright sea light. Wonder.
```

### `13-wedding.png` — 새벽까지 이어진 북소리

```
Wide night scene of the whole harbour town lit with lanterns and bonfires.
Drummers and gong players fill the square, people dance in long lines, children
run between the fires. On a rise at the centre, Suro and Heo Hwangok stand side by
side looking out at it all. Warm orange firelight against deep blue night.
Festival.
```

### `14-gaya.png` — 이제는 바다까지가 우리 마당이오

```
Wide scene of the harbour at midday from a height. Boats loaded with stacked
iron bars pull out toward the open sea while others come in carrying jars and
bolts of cloth. Along the quay, armoured warriors, traders and porters mix. In the
foreground on a terrace, Suro stands with one arm out over the view. Blue sea,
white sails, iron grey and warm ochre. Wide and prosperous.
```

### `end.png` — 마지막 (가로 16:9)

```
A low round grassy hilltop at sunset with no one on it. The grass is trampled
flat in a wide ring from dancing, a length of purple cord lies coiled on the
ground, and beyond the hill the river delta and the open sea catch the last gold
light. A small tortoise sits in the grass. Calm and satisfied.
```
