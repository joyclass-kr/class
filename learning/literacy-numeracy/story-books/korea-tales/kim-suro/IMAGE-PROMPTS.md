# 제미나이 그림 프롬프트 — 김수로

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> **4 : 3**으로 받아서 위아래를 조금 잘라 씁니다(각 5.5퍼센트). 이 책의 마지막
> 그림이니 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 화면에서 칸을 직접 재서 적은 값입니다

**제미나이는 16:9(1376×768)보다 옆으로 넓은 그림을 못 만듭니다.** 그런데 본문
그림칸은 그보다 넓은 **2.15 : 1**이라, 아무리 시켜도 칸에 딱 맞는 그림은 받을 수
없습니다. 16:9로 받아 위아래를 잘라 쓰는 수밖에 없습니다. 그러니 **잘려 나갈
자리를 미리 비워 두고 그리게 하는 것**이 요령입니다.

| 그림 | 칸 비율 | 시킬 비율 | 잘려 나가는 곳 |
|---|---|---|---|
| 본문 그림 14장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

```
python _tools/imgratio.py 책이름
```

지난번에 이 책들은 2:1로 시켰는데 전부 16:9로 받았고, 그걸 아무도 몰랐습니다.

> **이미 그려 둔 그림은 그대로 씁니다. 다시 그리지 마세요.**
> 본문 그림은 이미 16:9라 비율로는 새 기준과 같습니다. 달라지는 것은 구도뿐이라,
> 새로 그리는 그림에만 아래 규칙을 적용하면 됩니다. 다만 `end.webp`는 지난번에
> 16:9로 받아 좌우가 8퍼센트씩 잘리고 있습니다. 그 그림을 언젠가 다시 그릴 일이
> 생기면 그때 4 : 3으로 받으세요.

### 그래서 프롬프트에 이렇게 적어 주세요

- **중요한 것은 한가운데 84퍼센트 안에.** 위 8퍼센트와 아래 8퍼센트는 화면에서 잘립니다.
- **머리 위와 발밑에 여유를 둘 것.** 머리가 그림 위쪽에 붙으면 정수리가 날아갑니다.
- **인물을 가운데에 몰지 말고 좌우로 나눌 것.** 칸이 옆으로 아주 넓습니다.

영어 프롬프트 끝에 이 문장을 덧붙이면 잘 듣습니다.

```
16:9 wide composition. Keep every important element inside the central 84% of
the frame height; the top 8% and bottom 8% will be cropped away. Leave headroom
above heads and space below feet. Spread the figures to the left and right
rather than clustering them in the middle.
```

`end.webp`**만은 4 : 3으로** 시키세요. 칸이 1.5 : 1이라 4 : 3으로 받으면 위아래가
5.5퍼센트씩만 잘리는데, 16:9로 받으면 좌우가 8퍼센트씩 잘려 그림 양옆이 날아갑니다.

세로 화면(태블릿을 세워 볼 때)에서는 `end.webp` 칸이 **4.4 : 1**짜리 가느다란
띠가 됩니다. 그때는 그림 높이의 칠십 퍼센트가 잘리니, 중요한 것은 반드시
그림 한가운데 높이에 두세요.


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
Make every picture EXCITING to look at, like a frame from 1980s-90s Korean TV
animation. Never a flat mid-distance shot with everyone standing in a row.
CAMERA: use a strong angle every time - look up steeply at whoever is powerful,
look down steeply on whoever is small, push right in close on a face at the
moment it changes. Let things break out of the frame: a hand, a tail, a swinging
club, a gourd bigger than the panel. Use deep foreshortening - the fist or the
foot nearest the viewer is huge.
BODIES: cartoon proportions, not realistic ones. Big heads on children, squash
and stretch, whole bodies leaning into what they are doing, fingers splayed,
feet off the ground.
MOTION: speed lines, dust clouds at the feet, impact stars, flying sweat drops,
objects tumbling through the air, hair and clothes streaming.
LIGHT: strong and graphic - hard shadows, warm light from one side, a bright rim
where the light hits, deep saturated darks at night.
Every picture should make a child want to turn the page.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
Two things that keep going wrong. First, PLUMP IS NOT UGLY. A well-fed character
is round AND good-looking: soft round face, smooth clear skin, big bright eyes,
rosy cheeks, glossy hair. Roundness is charm, never the joke. Second, DRAW PEOPLE
YOUNG unless the story says otherwise. Parents of small children are in their
twenties or thirties - smooth faces, thick black hair, no wrinkles, no balding,
no stoop. Only grandparents and village elders are old.
The same goes for monsters and beasts - they must be FUN to look at too, drawn
like the monsters in 1980s-90s Korean TV animation. BOLD, SIMPLE and BOUNCY: big
flat areas of saturated colour, thick clean outlines, rounded cartoon masses,
springy exaggerated poses. Huge fangs, a wide roaring mouth, googly eyes out on
stalks, enormous claws are all GOOD - they read as playful because the shapes are
simple and the colours are bright. A monster may fill the whole frame and roar.
What makes a monster disgusting is not its teeth but its TEXTURE and DETAIL: wet
glistening skin, slime, drool, bristles, veins, swarms of small eyes, finely
segmented insect legs, realistic anatomy. Never draw those. Keep every monster a
big bold cartoon shape that a child would want to draw themselves.
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

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A low round grassy hilltop under a bright sky.
Down the middle of the tall frame hangs a long purple cord stretching up out of
the clouds, with a red cloth bundle tied at its end, just reaching the grass. The
bundle is half open and golden light spills from it. Around the hilltop, a crowd
of people has thrown its arms up mid-dance, mouths open in song, dust rising from
stamping feet. Gold, purple and green. Loud and joyful.
```

## 본문  장 (모두 가로 16:9)

### `01-gugan.webp` — 우리 마을이 제일이지

```
Wide scene of a river delta with nine small villages scattered across it among
reed marshes. In the foreground on a path, three of the chiefs have met and are
squabbling cheerfully, each pointing back toward his own village. Smoke from
roofs, boats on the water, low hills beyond. Bright morning, green and ochre.
Lively but scattered.
```

### `02-voice.webp` — 여기에 사람이 있느냐?

```
Wide scene on a low round grassy peak. The hilltop is bare and empty except for
grass bending in the wind. Coming up over the rim from all sides, the nine chiefs
scramble onto the summit, out of breath, looking wildly around for whoever is
speaking - and there is no one there at all. Big empty sky. Eerie and exciting.
```

### `03-song.webp` — 거북아 거북아, 머리를 내어라

```
Wide scene on the hilltop. The nine chiefs kneel in a ring on the grass with
their heads tilted, listening hard, one cupping his ear, one already scraping at
the earth with his hands. Above them the empty bright sky. In the grass at the
centre, a small tortoise has poked its head out and is watching. Wind, sunlight.
Comic and solemn at once.
```

### `04-dance.webp` — 봉우리가 들썩들썩

```
Wide scene on the hilltop packed with people - two hundred villagers and the
nine chiefs stamping, clapping, arms flung up, mouths wide open in song, dust
boiling up around their feet. Hats and sleeves flying, drums being beaten.
Everyone is looking upward. Gold afternoon light through the dust. The most
crowded, loudest picture in the book.
```

### `05-rope.webp` — 하늘에서 내려온 자줏빛 줄

```
Wide scene on the hilltop. Down through a break in the clouds comes a long
purple cord with a red cloth bundle knotted at its end, settling onto the grass in
the centre of the frame. The crowd has fallen back in a ring, arms half raised,
every face turned up, the song stopped mid-word. Shafts of light through cloud.
Held breath.
```

### `06-eggs.webp` — 황금빛 알 여섯 개

```
Wide interior of a simple house that night. In the centre, a golden box sits open
on a low table with exactly six round golden eggs inside, each glowing like a
small sun and lighting the whole room. Around the table, the nine chiefs sit
wide-awake in a ring, chins on hands, not one of them able to sleep. Warm gold
light, deep shadows. Wonder and comedy.
```

### `07-hatch.webp` — 여섯이 한꺼번에 방긋

```
Wide interior scene at dawn. In the centre, the golden box lies open with six
broken shells in it, and six identical newborn baby boys sit in a row inside,
all beaming at once. Around them, the nine chiefs have fallen over backwards in
shock, hats flying, arms in the air. Morning light through the door. Hilarious
and miraculous.
```

### `08-suro.webp` — 이 아이가 우리 임금이오

```
Wide scene in a village square. In the centre, the young man Suro stands in a
plain dark robe with an iron-studded belt, tall and calm, having grown to
adulthood in ten days. Around him the nine chiefs bow, and villagers crane to
look over each other's shoulders. Sunlight, thatched roofs, banners of plain
cloth. Simple and strong.
```

### `09-six.webp` — 각자 제 골짜기로

```
Wide landscape scene of a river valley splitting into several smaller valleys. In
the foreground, Suro clasps hands with his five brothers, each of whom is setting
off on a different path with a small group of followers. Five roads lead away into
five valleys under a wide sky. Green hills, morning light. Parting without
sadness.
```

### `10-iron.webp` — 골짜기마다 망치 소리

```
Wide scene of an ironworking village. On the left, a charcoal furnace with
bellows being pumped and orange metal glowing. In the centre, smiths hammer on
anvils, sparks flying. On the right, stacks of flat iron bars are being carried
down to boats at a jetty, and a finished suit of riveted iron armour hangs on a
frame. Smoke, sparks, iron grey and orange. Busy and strong.
```

### `11-alone.webp` — 내 짝은 하늘이 보내 줄 것이오

```
Wide scene on a terrace above the harbour at night. On the right, Suro stands
alone at the rail looking out at the dark sea, one hand on the wood. On the left,
two of the chiefs stand back with their heads together, one gesturing helplessly.
Moonlight on the water, lamps at the jetty below. Quiet and patient.
```

### `12-ship.webp` — 붉은 돛을 단 배

```
Wide scene at the harbour. On the right, a large seagoing ship with a deep red
sail has come alongside the jetty, its hull and rigging clearly foreign in shape.
Coming down the plank, Heo Hwangok in flowing red and saffron patterned cloth with
gold bangles and a shawl over her hair, her attendants behind her with chests and
jars. On the left, a crowd of Gaya villagers stares. Bright sea light. Wonder.
```

### `13-wedding.webp` — 새벽까지 이어진 북소리

```
Wide night scene of the whole harbour town lit with lanterns and bonfires.
Drummers and gong players fill the square, people dance in long lines, children
run between the fires. On a rise at the centre, Suro and Heo Hwangok stand side by
side looking out at it all. Warm orange firelight against deep blue night.
Festival.
```

### `14-gaya.webp` — 이제는 바다까지가 우리 마당이오

```
Wide scene of the harbour at midday from a height. Boats loaded with stacked
iron bars pull out toward the open sea while others come in carrying jars and
bolts of cloth. Along the quay, armoured warriors, traders and porters mix. In the
foreground on a terrace, Suro stands with one arm out over the view. Blue sea,
white sails, iron grey and warm ochre. Wide and prosperous.
```

### `end.webp` — 마지막 (가로 4:3)

```
A low round grassy hilltop at sunset with no one on it. The grass is trampled
flat in a wide ring from dancing, a length of purple cord lies coiled on the
ground, and beyond the hill the river delta and the open sea catch the last gold
light. A small tortoise sits in the grass. Calm and satisfied.
```
