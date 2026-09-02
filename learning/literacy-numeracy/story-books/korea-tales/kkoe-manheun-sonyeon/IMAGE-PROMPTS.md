# 제미나이 그림 프롬프트 — 꾀 많은 소년

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

**푸는 방법이 그림만 봐도 이해되어야 합니다.** 세 문제의 해법 그림(4, 8, 10번)은 과정이 한눈에 보이게 그려 주세요 — 재가 된 새끼줄의 결, 구슬 속을 기어가는 개미와 실, 물에 잠기기 시작하는 통나무 한쪽. 소년은 잘난 척하는 얼굴이 아니라 **차분하고 담담한 얼굴**이어야 해요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and warm colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era county office: a wide packed-earth courtyard, a raised
wooden platform, tiled roofs, officials in robes and hats, and a crowd of
villagers. Warm daylight, dust in the air. Faces are expressive and varied - the
adults flustered, the boy calm. Nothing frightening. No text or letters in the
image.
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
The boy: a twelve-year-old in a patched pale hanbok with his hair in a single
plait down his back, small and thin among grown men, with a calm unhurried face
and steady eyes. He never smirks. The envoy: a tall foreign official in an
elaborate embroidered robe and a stiff wide hat, proud bearing, growing more
astonished in each chapter. The magistrate: a stout worried man in dark blue
official robes and a winged hat, forever mopping his brow. The villagers and
officials: a crowd of assorted adults in hanbok, always leaning in and craning
their necks.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A single blue glass bead fills the middle of the
tall frame, seen very close up, its nine-times-curved inner channel drawn
visible through the glass. A tiny ant carrying a thread is halfway along the
winding tunnel inside. Above and below, out of focus, the faces of a crowd
leaning in to look. Warm light through the bead. Curious and clever.
```

## 본문  장 (모두 가로 16:9)

### `01-boy.webp` — 꾀 많기로 이름난 소년

```
Wide village street scene. On the left, three adults stand in a knot pointing
after someone and talking with raised eyebrows. On the right, a small thin boy in
a patched hanbok walks past carrying a bundle of firewood, entirely unbothered,
looking straight ahead. Thatched roofs, warm daylight. Ordinary and quietly
interesting.
```

### `02-envoy.webp` — 세 가지 문제를 들고 온 사신

```
Wide scene in a county office courtyard. On the right, a tall foreign envoy in an
embroidered robe stands on the raised platform unrolling a scroll with both arms,
chin high. On the left, the magistrate half rises from his seat, face already
stricken. Officials and villagers crowd the courtyard, murmuring. Warm daylight,
formal tension.
```

### `03-first.webp` — 재로 새끼줄을 꼬아 오라

```
Wide courtyard scene. In the centre, an official holds up a scroll reading the
first task aloud. All around him, the crowd has erupted - men throwing up their
hands, shaking their heads, one holding a handful of grey ash that trickles
uselessly through his fingers. Dust and gestures everywhere. Comic despair.
```

### `04-solve1.webp` — 꼰 새끼를 태워서

```
Wide courtyard scene, split in two moments. On the left, the boy kneels twisting
straw into a tight rope with both hands, a neat coil beside him. On the right,
the same rope lies on a broad flat tray, burnt from end to end, holding its exact
twisted shape in pale grey ash while a last thread of smoke rises. The crowd
leans in from all sides, mouths open. Sunlight, awe.
```

### `05-second.webp` — 아홉 번 굽은 구슬

```
Wide courtyard scene. On the right, the envoy stands holding out one hand with a
single blue bead resting on his palm, a small superior smile. On the left, the
magistrate and officials crane forward to peer at it. Above them all, a small
inset detail shows the bead in cross-section with its winding nine-curve tunnel.
Bright and taunting.
```

### `06-stuck.webp` — 실은 첫 굽이도 넘지 못하고

```
Wide courtyard scene. Around a low table, four grown men take turns at the bead -
one pushing a thread in with a wet fingertip, one poking with a thin bamboo
sliver, one blowing into it with puffed cheeks, one just staring at it in
despair. Threads and slivers scattered on the table. Sweat drops and comic
frustration.
```

### `07-ant.webp` — 개미 허리에 실을 매고

```
Wide courtyard scene, low viewpoint. In the foreground, the boy crouches in the
dirt with his head down, tying a very fine thread around the waist of a single
ant held delicately between finger and thumb, tongue just touching his lip in
concentration. Behind and above him, a ring of adult faces leans in, utterly
baffled. Warm light, tiny and enormous at once.
```

### `08-honey.webp` — 꿀 냄새를 따라 기어 나온 개미

```
Wide scene, close on a low table. In the centre, the blue bead is shown large,
with the interior tunnel visible and the ant halfway through, trailing the
thread behind it. At the far opening, a bright golden drop of honey glistens. On
the right edge, the boy watches quietly; on the left, the envoy's face is
beginning to change. Beautiful and clear.
```

### `09-third.webp` — 껍질을 벗긴 통나무

```
Wide courtyard scene. In the centre, a smooth peeled log lies across two
trestles, identical at both ends. On the right, the envoy slaps one end with his
palm, red-faced now, almost shouting. On the left, the crowd walks slowly around
the log studying it from every angle, hands behind backs. Bright daylight,
puzzled silence.
```

### `10-water.webp` — 물에 띄워 가려낸 위아래

```
Wide courtyard scene. In the centre, a big wooden tub of water with the peeled
log floating in it, one end riding high and the other clearly settling lower into
the water, ripples spreading. The boy stands beside it pointing calmly at the
sinking end. All around, the crowd erupts - hands to heads, mouths open, one man
grabbing another's shoulder. Splashes and sunlight.
```

### `11-bow.webp` — 고개를 숙인 사신

```
Wide courtyard scene. On the right, the tall envoy has stepped down from the
platform and bows deeply toward the small boy, hands together, hat tipping
forward. On the left, the boy bows back politely, still calm. Between and behind
them, the whole courtyard has erupted in cheering, hats thrown into the air.
Warm gold light, triumphant.
```

### `12-school.webp` — 서당을 지어 주십시오

```
Wide courtyard scene, quieter. On the right, the magistrate sits forward with one
hand open in offer, servants beside him holding trays of coin and silk. On the
left, the boy stands with his hands together, speaking simply, and behind him a
cluster of village children have crept up to the courtyard edge, watching him
with wide eyes. Warm afternoon light. Modest and moving.
```

### `end.webp` — 마지막 (가로 4:3)

```
A small village schoolroom at morning, no one yet arrived. Low writing desks in
neat rows, a brush and inkstone on each, sunlight falling through an open paper
door onto the wooden floor. A single blue bead sits on the master's desk as an
ornament. Warm and hopeful.
```
