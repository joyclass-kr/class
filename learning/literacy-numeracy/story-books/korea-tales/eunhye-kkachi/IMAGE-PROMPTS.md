# 제미나이 그림 프롬프트 — 은혜 갚은 까치

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


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
| 본문 그림 10장 (`01`~`10`) | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

```
python _tools/imgratio.py 책이름
```

지난번에 이 책들은 2:1로 시켰는데 전부 16:9로 받았고, 그걸 아무도 몰랐습니다.

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


## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and flat vivid colors, similar to a classic Korean animated storybook.
Setting is a deep Korean mountain of the Joseon era: tall red-barked pines,
rocky ridges, a narrow forest trail, a small tiled-roof temple high on the slope.
Daytime scenes use warm green and gold; night scenes use deep indigo and
lamplight. Expressive faces, clear storytelling staging. Suitable for children -
tense but never gruesome, no blood, no injury shown. No text or letters.
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
The scholar: a young Korean man in his twenties in a clean pale blue scholar's
hanbok and a black horsehair hat, a cloth bundle on his back and a bow over one
shoulder, earnest open face. The magpies: two black-and-white Korean magpies with
long blue-sheened tails, drawn large and expressive, always together as a pair.
The great serpent: a huge dark grey-green snake, thick as a man's arm, more
imposing than horrifying - keep it stylised and folk-tale-like, never realistic
or scary. The woman: a pale woman in a plain white hanbok with long black hair,
calm and unreadable; in the night scene her presence is suggested by her voice
and the serpent, not by a monstrous transformation.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A moonlit Korean mountain at night. High on the
slope, a small old temple with a hanging bronze bell under a tiled roof, lit
faintly blue. Two magpies fly upward toward the bell through the dark, wings
spread, drawn small against the great mountain. Pines on either side, a full moon
behind the peak. Quiet, dramatic, hopeful.
```

## 본문 열 장 (모두 가로 16:9)

### `01-road.webp` — 한양 가는 산길

```
Wide panoramic mountain landscape in late afternoon. A young scholar in pale blue
hanbok and black hat walks a narrow dirt trail from left to right, cloth bundle
on his back, bow over one shoulder, looking up at a high ridge ahead. Tall pines
line the trail, distant blue mountain ranges layered behind, long golden light.
```

### `02-nest.webp` — 둥지로 다가가는 구렁이

```
Wide forest scene. On the right, a huge old pine with a magpie nest high in the
branches; a large dark grey-green snake winds up the trunk toward it, stylised
and folk-art-like. Two magpies beat their wings frantically in the air beside the
nest, beaks open. On the left, far below, the small figure of the scholar looks
up, one hand shading his eyes. Tension without menace.
```

### `03-arrow.webp` — 활을 쏘는 선비

```
Wide forest scene. On the left, the scholar stands with his bow fully drawn, one
eye closed, body braced, arrow just released with a sharp motion line streaking
across the frame. On the right, the great snake falls away from the tree trunk in
a loose curve, no wound or blood shown, just motion. The two magpies swoop
overhead. Dynamic and clean.
```

### `04-house.webp` — 산속 외딴집

```
Wide night landscape. Dark forested slopes fill most of the frame. On the right,
a single small thatched house with one paper window glowing warm yellow, the only
light for miles. On the left, the scholar approaches along the trail, small and
weary, one hand raised toward the door. Deep indigo night, stars above the
ridgeline. Lonely and a little eerie.
```

### `05-coil.webp` — 몸을 감은 구렁이

```
Wide interior of a dim Korean room at night, seen from the side. The scholar lies
on a sleeping mat on the right, eyes wide open in shock, arms pinned, as the huge
stylised snake loops around him in smooth folk-art curves. On the left, the paper
door glows faint blue with moonlight. Keep the snake decorative and rounded, not
realistic. Tense but not frightening.
```

### `06-revenge.webp` — 낮의 그 여인

```
Wide interior of the same room. On the right, the snake's large head rises beside
the scholar, calm rather than snarling, eyes steady. On the left, half in shadow
near the door, the pale woman in white hanbok stands with her back partly turned,
long black hair down, speaking quietly. The scholar looks between them, face
drained. Cool blue moonlight, still and quiet.
```

### `07-bell.webp` — 종을 치라는 조건

```
Wide interior with a view through the open paper door. Inside on the left, the
snake's head and the bound scholar. Through the doorway on the right, far up the
dark mountain, the tiny silhouette of the temple and its hanging bell under a
sliver of moon. The scholar stares out at it, hopeless. Strong depth between the
near room and the distant temple.
```

### `08-ring.webp` — 종이 울리던 순간

> **이 그림은 다시 그려야 합니다.** 본문이 바뀌었습니다.
> 구렁이는 종이 울릴 리 없다고 여기고, 날이 밝으면 선비를 잡아먹고 하늘로 오를
> 셈으로 종 아래에 와 있습니다. 하늘만 올려다보는데 등 뒤에서 종이 울립니다.
> **이 책에서 가장 웃긴 자리입니다.** 무섭게 그리지 마세요.

```
Wide dawn scene at an old mountain temple bell pavilion. The great bronze bell
hangs under its tiled roof, sound drawn as expanding pale golden arcs. Two
magpies fly hard at the bell, wings beating, small and determined against the
huge bronze.
In front of the bell, alone, a large pale serpent sits coiled up, no one else
around — it came up the mountain by itself to watch, certain nothing could ring.
It has just whipped its head around toward the bell and is comically appalled:
eyes huge and round, mouth hanging open, tongue out sideways, sweat drops flying
off its head, tail tip curled up in shock. Flustered, not menacing. No fangs,
no blood, nobody being squeezed.
The sky at the right edge is turning pale grey-pink.
```

### `09-temple.webp` — 혼자 오르는 용과 종 아래의 까치들

> **이 그림은 다시 그려야 합니다.** 본문에 용이 들어갔습니다.
> 용은 **혼자** 올라갑니다. 곁에 다른 용이 있으면 안 됩니다.
> 크게 그리면 아래 까치가 묻히니 하늘 쪽에 알맞게 넣어 주세요.

```
Wide scene at the old mountain temple at dawn. On the right, the great bronze
bell hangs under its tiled roof; below it on the stone platform lie two magpies,
wings folded, eyes closed as if asleep, and the young scholar kneels beside them
with both hands going to his mouth.
Rising through the clouds in the upper left, a single white Korean dragon climbs
away into the pink dawn sky, alone. Draw the dragon comically distraught rather
than grand: eyes squeezed shut, mouth open in a wail, two fat cartoon tears
flying off, its short front legs stamping the empty air. There is no second
dragon anywhere in the picture.
Soft pink dawn light, mist in the valley. Sad and tender and a little funny,
never grim. No injury shown.
```

### `10-nest-home.webp` — 되살아난 까치

```
Wide sunny scene in the courtyard of a modest Korean house. On the left, the
scholar sits on the wooden veranda smiling up, one arm still raised from letting
go. On the right, the two magpies fly up toward a large tree where they have
built a nest, wings wide, clearly healthy again. Blue sky, green leaves, warm and
joyful.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean mountain temple at sunrise, no people. The bronze bell hangs
still under its tiled roof, two magpies perched together on the beam above it,
mist clearing from the valley below, warm light on the stone steps. Peaceful.
```
