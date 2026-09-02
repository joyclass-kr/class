# 제미나이 그림 프롬프트 — 신기한 절구

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


## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and flat vivid colors, similar to a classic Korean animated storybook.
Two settings: a Korean mountain village of the Joseon era (thatched roofs, pine
forest, mist) and the open sea (wooden fishing boat, rolling waves, wide sky).
Warm greens and browns on land, deep blue-teal and white foam at sea. Expressive
faces, strong storytelling staging. Tense but never frightening - no drowning
shown, no one in real danger of dying. No text or letters in the image.
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
The woodcutter: a lean kind-faced man in his thirties in patched off-white work
hanbok, a towel tied round his head, a wooden A-frame carrier on his back. The
old man of the mountain: a tall elder with a long white beard and flowing pale
robes, calm and slightly unreal, always partly veiled in mist. The thief: a wiry
man in dark brown clothes with a cloth over the lower half of his face, darting
eyes, greedy grin that turns to panic later. The mortar: a small round grey stone
mortar, about the size of a large bowl, with a simple carved rim - keep it
identical in every picture.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. An underwater view looking down into deep blue
sea. Far below on the sandy seabed sits a small round grey stone mortar, and from
its mouth a thick white cloud of salt billows endlessly upward, spreading through
the water toward the surface. Shafts of pale light come down from above, a few
fish drifting. Quiet, strange, beautiful.
```

## 본문 열 장 (모두 가로 16:9)

### `01-mountain.webp` — 안개 속의 노인

```
Wide misty mountain forest scene. On the left, the woodcutter stands on a narrow
trail with his empty A-frame carrier, looking up in surprise, one hand still on
the strap. On the right, a tall white-bearded elder in pale flowing robes stands
half hidden in drifting mist between the pines, feet not quite visible. Cool grey
green light, hushed and mysterious.
```

### `02-mortar.webp` — 절구를 건네받다

```
Wide forest scene. In the centre, the elder holds out a small round grey stone
mortar in both hands toward the woodcutter, who reaches for it with both hands
and a puzzled, careful expression. Mist swirls thickly behind the elder, already
beginning to close over him. Soft light through pine branches.
```

### `03-rice.webp` — 쏟아지는 쌀

```
Wide scene inside a modest Korean house yard. In the centre, the stone mortar
sits on a straw mat with a bright stream of white rice pouring up and out of it,
heaping high across the ground. On the left, the woodcutter throws both arms up
in delight. On the right, neighbours crowd in with bowls and sacks, laughing.
Sunny, joyful, generous.
```

### `04-rumor.webp` — 소문을 들은 도둑

```
Wide village street scene. On the left, two villagers stand talking with animated
gestures, one pointing back toward a house. On the right, in the foreground, the
thief leans against a wall with the cloth over his face, head tilted to
eavesdrop, one eye narrowed and a sly grin showing above the cloth. Bright day,
long shadows.
```

### `05-steal.webp` — 한밤중의 도둑질

```
Wide moonlit night scene. On the left, the thief straddles the top of a low
earthen wall, a bulging sack on his back with the round shape of the mortar
inside, one leg already over. On the right, the sleeping house with its dark
paper windows, and beyond it a path leading toward a strip of moonlit sea on the
horizon. Deep blue night, tiptoeing tension.
```

### `06-salt.webp` — 바다 위에서 소금을 부르다

```
Wide open sea scene. A small wooden boat sits alone in the middle of calm dark
water under a wide sky. The thief kneels in the boat with both arms raised in
triumph, mouth open shouting, the stone mortar in front of him already spitting a
white fountain of salt into the air. Land is a thin line far away on the left.
Bright and comic.
```

### `07-more.webp` — 멈추지 않는 소금

```
Wide sea scene, closer in. The boat is now half full of white salt piling up
around the thief's legs. He grabs the mortar with both hands trying to tip it
over, face contorted in panic, mouth wide open yelling, while the salt fountain
sprays higher than his head. Waves start to slap the hull. Dramatic and funny at
once.
```

### `08-sinking.webp` — 기울어지는 배

```
Wide sea scene. The boat tilts steeply, gunwale almost at the waterline, buried
in a mountain of white salt. The thief clings to the mast with both arms, waving
one hand toward the empty horizon, mouth open calling for help. Grey-blue rolling
waves all around, empty sea to every edge. Keep it dramatic but not grim - no
sense of drowning.
```

### `09-plank.webp` — 널빤지를 붙잡고

```
Wide dawn sea scene. In the centre, the thief floats holding onto a broad wooden
plank with both arms, soaked and exhausted, blinking at the sky, the cloth gone
from his face. A calm pale pink and grey dawn, low gentle swells, a distant
shoreline on the right. Empty-handed and worn out, but plainly safe.
```

### `10-sea.webp` — 바닷속의 절구

```
Wide underwater scene. On the seabed toward the left sits the small grey stone
mortar, endlessly pouring a thick white plume of salt that drifts and spreads
across the entire width of the frame. Fish swim through the cloud. Above, the
underside of the water surface glitters with light. Calm, strange, wondrous.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean seashore at sunrise, no people. Gentle waves washing over dark
rocks, white salt crusted along the tide line, a wooden boat pulled up on the
sand in the distance, warm pink and gold sky. Peaceful.
```
