# 제미나이 그림 프롬프트 — 호랑이를 속인 토끼

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
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Korean mountain of the Joseon era across three seasons:
autumn pine forest with dry golden grass, a rocky clearing, and a frozen winter
river. Big expressive faces, exaggerated slapstick gestures, heavy motion lines.
Comedy first - the tiger is never actually hurt, only comically startled. No
blood, no injuries, no burns on skin. No text or letters in the image.
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
The tiger: a huge orange-and-black striped Korean folk-painting tiger with a
round face, enormous whiskers and big gullible eyes. He is the straight man -
greedy, slow, and endlessly trusting, with a new comic disaster each chapter (his
whiskers end up frizzled and curly after the fire, and stay that way). Never
menacing for long. The rabbit: a small grey-brown Korean hare with very long
ears, one ear often flopped over, a perfectly innocent face with a tiny sly
sparkle in the eye. Always small in frame next to the tiger - the size gap is the
joke.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up from low on the forest floor: a huge
striped tiger fills the upper half of the frame, peering down with wide puzzled
eyes and frizzled whiskers. At the bottom, tiny by comparison, a small grey-brown
hare sits upright with both paws politely folded, ears straight up, wearing a
perfectly innocent expression. Autumn pines and golden light behind them.
```

## 본문 열 장 (모두 가로 16:9)

### `01-caught.webp` — 붙잡힌 토끼

```
Wide autumn forest scene. On the right, the huge tiger looms with one paw pinning
the ground beside a small hare, mouth open in a roar, tongue out. On the left,
the tiny hare sits perfectly still with ears up and paws folded, eyes calm,
utterly composed despite the size difference. Dry golden grass and red-barked
pines, dappled light. Funny rather than frightening.
```

### `02-sparrow.webp` — 참새가 더 맛있다며

```
Wide forest scene. On the left, the hare stands on his hind legs gesturing
grandly with both front paws, describing something delicious, eyes closed in
mock-appreciation. On the right, the tiger sits back on his haunches, head
tilted, a huge drop of drool hanging from his mouth, completely taken in. Small
sparrows flit in the branches above, unnoticed by both.
```

### `03-fire.webp` — 눈 감고 입 벌린 호랑이

```
Wide forest scene, strong left-right split. On the right, the tiger sits with
eyes squeezed tight shut and mouth stretched comically wide open, waiting. On the
left, the hare crouches low behind him striking a flint into a heap of dry golden
grass, one paw shielding the tiny spark, glancing sideways with a sly grin. First
wisps of smoke curling up.
```

### `04-burn.webp` — 개울로 뛰어드는 호랑이

```
Wide forest scene full of action. On the left, a wall of orange flame roars up
through dry grass with billowing smoke. On the right, the tiger leaps headlong
into a stream with an enormous splash, all four legs splayed, eyes bulging, his
whiskers now frizzled into comic corkscrews. Far in the background, a tiny hare
silhouette bounding away over a ridge. Pure slapstick.
```

### `05-again.webp` — 며칠 뒤 다시 마주치다

```
Wide rocky forest clearing. On the left, the tiger plants both front paws down
and leans in furious, teeth bared, his frizzled corkscrew whiskers still sticking
out sideways. On the right, the small hare stands calmly with one paw raised to
his chin, head tilted, wearing an expression of polite concern - the picture of
innocence. Autumn colors, comic standoff.
```

### `06-stones.webp` — 돌을 떡이라며 굽다

```
Wide clearing scene with a small campfire in the centre. Round smooth grey stones
sit in the flames glowing faintly red. On the left, the hare gestures toward them
like a proud cook presenting a dish. On the right, the tiger leans in over the
fire, eyes shining, licking his lips, one paw already reaching. Warm firelight on
both faces, evening forest behind.
```

### `07-hot.webp` — 뜨거운 돌을 물고 펄쩍

```
Wide clearing scene. In the centre, the tiger springs straight up into the air
with all four legs stretched out, eyes bulging, tongue hanging out, steam puffing
comically from his mouth, a round grey stone tumbling away. Motion lines and
sweat drops everywhere. On the far right edge, a single long rabbit ear
disappearing behind a rock. Peak slapstick, no injury shown.
```

### `08-winter.webp` — 얼어붙은 강가

```
Wide winter river scene. A broad frozen river stretches across the frame, snow on
the banks, bare trees and blue-white hills behind. On the right, the tiger walks
along the ice, breath steaming, whiskers still frizzled, a thick scarf of snow on
his back. On the left, the small hare sits on a snowy rock, ears up, watching him
with bright interest. Crisp blue and white.
```

### `09-tail.webp` — 얼음 구멍에 꼬리를 담그다

```
Wide winter river scene at dusk. In the centre, the tiger sits hunched on the ice
beside a round hole, his long striped tail dangling down into the dark water, an
expression of patient concentration. On the left, the hare points helpfully at
the hole with one paw while already half turned away, taking a first sneaky step
in the other direction. Purple-blue evening light, first stars.
```

### `10-escape.webp` — 얼음이 쩍 갈라지고

```
Wide winter river scene at sunrise. In the centre, the tiger heaves backward with
every muscle straining, eyes screwed shut, as the ice around his tail cracks
apart in jagged white lines with chips flying. On the left edge, distant village
figures approach over the snow. On the right, far away on a hill, the tiny hare
watches with folded paws. Pale gold dawn, explosive motion.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet snowy Korean riverbank at sunrise, no animals in sight. A round hole in
the ice with cracks radiating out from it, a single line of small rabbit tracks
crossing the snow toward the pine hills, soft pink and gold light. Peaceful and
a little amused.
```
