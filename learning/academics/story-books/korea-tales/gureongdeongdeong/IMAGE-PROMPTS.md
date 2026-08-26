# 제미나이 그림 프롬프트 — 구렁덩덩 신선비

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **12개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **14장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean village of the Joseon era: thatched cottages, paper
sliding doors, warm ondol floors, low stone walls, a village well, persimmon
trees, then wide open country - fields, streams, mountain passes - as the journey
goes on. Characters wear hanbok. Night scenes lit by warm lantern glow and cool
blue moonlight. Big expressive faces, gentle warm mood. No text or letters in the
image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The old mother: a small stooped grey-haired woman in a plain white and pale-blue
hanbok, endlessly patient, always drawn tenderly.
The serpent son: a large handsome dark-green snake with a smooth glossy body and
soft intelligent eyes - never slimy, never menacing, drawn like a beloved pet or
a shy child. In the house he lies curled on the warm part of the floor under a
quilt.
The scholar-groom (the same person transformed): a tall graceful young man in a
pale blue-green scholar's robe and black horsehair hat, calm handsome face,
faintly luminous.
The third daughter (the wife): a young woman in a soft coral and cream hanbok
with a long single braid, then later travel-worn - hair tied up in a cloth, hem
muddy, straw sandals in tatters. Her face stays steady and determined throughout;
she almost never cries.
The two elder sisters: two young women in showier pink and yellow hanbok, always
paired, sneering or peeking, small mean eyes.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 아내가 먼 길을 걷고, 위쪽에 구렁이가 감돈다.

```
Vertical portrait composition. A long country road winding from the bottom of the
frame up toward distant blue mountain ridges at dusk. At the bottom, small and
seen from behind, a young woman in a coral hanbok with a cloth bundle on her head
walks away up the road, worn straw sandals on her feet. Curving through the sky
above her, translucent and gentle like a memory, the long body of a dark-green
serpent loops among the evening clouds, its soft eyes looking down at her. A
magpie flies between them. Deep blue and rose sky, first stars. Longing and
tender, never frightening.
```

## 본문 12장 (모두 가로 2:1)

### `01-birth.webp` — 할머니가 구렁이 아이를 이불에 싸서 아랫목에 뉜다

```
Wide panoramic scene. Inside a small warm lamplit room at night. On the right the
old mother kneels and tucks a folded quilt around a large glossy dark-green snake
curled on the warm floor, her hands gentle, her face calm and loving. On the left,
outside the paper door, the dark blue silhouettes of two neighbours leaning in to
listen. Warm orange lamplight against cold blue night.
```

### `02-neighbors.webp` — 이웃 두 딸이 들여다보고 달아난다

```
Wide panoramic scene. Daytime at the paper sliding door of the cottage. On the
right two young women in pink and yellow hanbok recoil backward from a gap in the
door, faces screwed up in exaggerated disgust, one holding her nose, the other
mid-flight with her skirts flying and one sandal coming off. On the left, dimly
seen through the gap, the quiet coiled snake. Bright daylight, comic.
```

### `03-third.webp` — 셋째 딸이 "구렁덩덩 신선비를 낳으셨네요"

```
Wide panoramic scene. The same doorway, quiet now. On the right the third
daughter kneels at the open door with her hands folded in her lap, looking in
with a soft warm smile, completely unafraid. On the left inside the room the
serpent has lifted his head off the floor toward her, eyes wide and startled. The
old mother stands behind with a hand pressed to her mouth, tears in her eyes.
Soft afternoon light falling across the threshold.
```

### `04-marry.webp` — 셋째가 "제가 가겠습니다"

```
Wide panoramic scene. Evening in the neighbours' room. On the left the two elder
sisters leap up in outrage, arms flung wide, mouths huge, one knocking over a
cushion. On the right the third daughter sits perfectly still and straight with
her hands in her lap, chin level, speaking quietly. Between them their startled
parents. Warm lamplight, strong contrast between the chaos and her stillness.
```

### `05-shed.webp` — 첫날밤, 허물을 벗은 신선비

```
Wide panoramic scene. A lamplit bridal room at night. On the right a tall
graceful young man in a pale blue-green robe sits calmly on the floor, faintly
luminous, one hand raised in a small reassuring gesture; beside him the empty
serpent skin lies neatly shed in a soft coil, pearly and translucent. On the left
the young bride sits up from her bedding, one hand to her heart, eyes wide with
wonder rather than fear. Warm gold light, sparkles in the air.
```

### `06-promise.webp` — 허물을 곱게 접어 건네며 당부한다

```
Wide panoramic scene. Night, the same room, a travelling bundle packed by the
door. In the centre the young man holds out the neatly folded pearly serpent skin
in both hands toward his wife, his face grave. She receives it with both hands,
looking up into his face, listening hard. On the far left, through the open door,
the dark road he will take. Deep blue night outside, warm circle of lamplight
inside.
```

### `07-burn.webp` — 언니들이 허물을 아궁이에 던진다

```
Wide panoramic scene. A kitchen with a clay stove on the right. The two elder
sisters crowd at the stove mouth, one shoving the pearly serpent skin into the
flames with a poker, the other looking over her shoulder toward the door with a
guilty grin. Bright orange fire, acrid grey smoke curling up the chimney. On the
left, through the doorway and far away, the third daughter walks back from the
well with a water jar, unaware. Lurid firelight.
```

### `08-gone.webp` — 빈 방에 편지 한 장

```
Wide panoramic scene. An empty room at dawn. On the right the bedding is folded
and untouched and a single sheet of paper lies alone in the middle of the bare
floor, a slant of pale light falling across it. On the left the young wife stands
in the open doorway holding the door frame with one hand, seen from behind,
absolutely still. Cold blue-grey morning light. Very quiet and empty.
```

### `09-magpie.webp` — 까치들에게 겉옷을 벗어 덮어 준다

```
Wide panoramic scene. A bare windy field under a grey sky. On the right a flock
of magpies huddle together on a fence rail, feathers puffed, shivering. On the
left the young wife, now travel-worn, pulls her outer jacket off her shoulders
and spreads it over them, kneeling, her own arms bare in the cold. One magpie
lifts a wing to point west. Chilly blue-grey palette with the warm colour of her
jacket at the centre.
```

### `10-boar.webp` — 멧돼지와 함께 밤새 밭을 뒤집는다

```
Wide panoramic scene. A huge field at night under a low moon. On the right a big
bristly wild boar roots along a furrow. On the left the young wife works beside
him on her hands and knees, turning the earth with her bare hands, sleeves rolled,
hair falling loose, jaw set. Half the enormous field is already turned. Cool
moonlight, dark rich soil, exhausting and determined.
```

### `11-washer.webp` — 빨래하는 할머니에게 길을 듣는다

```
Wide panoramic scene. A clear stream with flat washing stones. On the left an old
woman kneels beating laundry with a wooden bat, half turned to point up over a
hill on the right with one dripping hand. In the centre the young wife stands in
the shallow water, skirts tucked up, treading a tub of laundry, listening
intently. Beside her on the bank, four worn-out pairs of straw sandals lie in a
row. Bright water, dragonflies, midday sun.
```

### `12-reunion.webp` — 담 밖에서 노래를 부르자 신선비가 일어선다

```
Wide panoramic scene. A rich tile-roofed house at a wedding feast. On the right,
inside the courtyard, a banquet with guests seated at low tables, and among them
the young man in his blue-green robe has shot to his feet, cup falling from his
hand, head turned sharply toward the wall, face transformed. On the left, outside
the low wall, the travel-worn wife stands alone singing with her hands cupped at
her mouth and her eyes closed. Lanterns, red and blue festival cloth, warm
evening light. The moment of recognition.
```

---

## 마지막 장 — `end.webp` (가로 2:1)

두 사람이 함께 집으로 돌아간다.

```
Wide scene at golden hour. A country road going away from the viewer toward a
small thatched cottage among persimmon trees. The young man in his blue-green
robe and the young woman walk side by side, seen from behind, her bundle now
carried on his shoulder. Magpies on the wire above, the turned field on one side.
Warm autumn light, long soft shadows, deeply peaceful.
```
