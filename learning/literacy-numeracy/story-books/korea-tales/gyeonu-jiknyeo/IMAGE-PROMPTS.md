# 제미나이 그림 프롬프트 — 견우와 직녀

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


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
| 본문 그림 12장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A vast silver river of stars runs from the bottom
of the tall frame to the top, splitting a deep indigo sky. On the left bank near
the bottom, a tiny figure in pale hanbok reaches out one hand; on the right bank,
another tiny figure reaches back. Between them, across the middle of the frame, a
faint bridge of birds is just beginning to form. Silent, enormous, aching.
```

## 본문  장 (모두 가로 16:9)

### `01-gyeonu.webp` — 은하수 건너편에서 소를 치는 견우

```
Wide heavenly landscape. Rolling meadows of cloud stretch across the frame under
a deep blue sky scattered with daytime stars. On the right, a young herdsman
walks with a switch over his shoulder among three great white oxen, small against
the vastness. On the far left edge, the silver band of a star river marks the
horizon. Warm gold light, peaceful and industrious.
```

### `02-jiknyeo.webp` — 베틀 앞의 직녀

```
Wide interior of an open pavilion on a cloud terrace. On the left, a young woman
sits at a large wooden loom, her hands mid-motion on the shuttle, threads
stretched taut and glowing. On the right, the cloth spilling from the loom flows
out of the pavilion and becomes actual sunset clouds and starlight in the sky
beyond. Silver and rose light. Magical and calm.
```

### `03-meet.webp` — 옥황상제가 짝지어 준 날

```
Wide scene on a bridge of light across the star river. In the centre, the
herdsman and the weaver meet at the middle of the bridge and bow to each other,
her long ribbons and sleeves lifting. Above and behind, huge and softly lit,
crowds of heavenly figures look on. The whole sky is unusually bright. Joyful and
ceremonial.
```

### `04-idle.webp` — 멈춘 베틀과 흩어진 소

```
Wide split scene. On the left, the wooden loom sits abandoned with a spider web
between its posts and a layer of dust on the shuttle. On the right, white oxen
wander loose across cloud meadows with no one herding them, one chewing at a torn
bolt of cloth. In the far distance in the middle, two small figures sit close
together, oblivious. Gently reproachful.
```

### `05-anger.webp` — 노한 옥황상제

```
Wide scene from a very low viewpoint. Filling the upper two thirds, the Jade
Emperor stands in deep crimson robes with one arm raised, face stern, storm light
gathering behind his crown. At the bottom, tiny, the herdsman and the weaver
kneel side by side with their heads bowed. Dark clouds and shafts of cold light.
Awe rather than terror.
```

### `06-parted.webp` — 은하수 양쪽으로 갈라지다

```
Wide scene dominated by the star river running down the centre of the frame,
wide and impassable. On the left bank, the weaver stands with one hand pressed to
her chest; on the right bank, the herdsman with his ox. Both are turned toward
each other, both very small, separated by an enormous glittering emptiness. Deep
indigo and silver. Lonely and beautiful.
```

### `07-year.webp` — 일하면서도 자꾸 강 쪽을 보고

```
Wide split scene through the seasons. On the left, the weaver works her loom but
her head is turned toward the window and the star river beyond. On the right, the
herdsman drives his oxen but looks back over his shoulder in the same direction.
Between them, cloud meadows change colour from spring green to summer gold.
Quietly aching.
```

### `08-river.webp` — 다리가 없는 강가에서

```
Wide scene at the star river on the seventh night. On both banks the two figures
have run right to the water's edge and dropped to their knees, arms reaching
across, faces lifted. The river between them is impossibly wide and bright. No
bridge anywhere. Above, a thin crescent moon. Heart-breaking and still.
```

### `09-birds.webp` — 울음소리를 들은 땅 위의 새들

```
Wide scene on earth at night. Below, a Korean village of thatched roofs under a
summer sky. On rooftops, walls and branches, hundreds of magpies and crows have
all turned their heads upward at once, listening. Above them, high and far, the
faint silver band of the star river. Moonlight on black and white feathers.
Hushed and expectant.
```

### `10-bridge.webp` — 몸으로 놓은 다리, 오작교

```
Wide scene, the biggest image in the book. Across the entire width of the frame,
thousands of magpies and crows have linked together wing to wing over the star
river, forming a living bridge of black and white and blue sheen. Their feathers
catch starlight. On the far left and far right, two tiny figures step onto the
bridge from opposite banks. Vast, breathtaking, reverent.
```

### `11-reunion.webp` — 강 한가운데의 하룻밤

```
Wide scene at the centre of the bird bridge. The herdsman and the weaver have met
in the middle and stand with their hands joined, foreheads close, her long
ribbons streaming. Beneath their feet the birds hold steady. All around, the star
river blazes. Their two figures are small in an enormous glittering frame.
Tender and fleeting.
```

### `12-rain.webp` — 헤어지며 흘린 눈물이 비가 되어

```
Wide scene split between sky and earth. Above, the bird bridge is coming apart as
birds peel away, the two figures drawing back toward opposite banks, a few bright
drops falling from the middle. Below, on earth, warm summer rain falls on green
rice paddies and thatched roofs, and a magpie with a bare patch on its head shakes
water from its wings. Melancholy and warm at once.
```

### `end.webp` — 마지막 (가로 4:3)

```
A summer night sky over a quiet Korean village, no people. The Milky Way arcs
overhead in silver, two brighter stars facing each other from opposite banks of
it, a few magpies asleep on a roof ridge below. Deep indigo and silver.
Peaceful and vast.
```
