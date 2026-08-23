# 제미나이 그림 프롬프트 — 호랑이를 속인 토끼

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Korean mountain of the Joseon era across three seasons:
autumn pine forest with dry golden grass, a rocky clearing, and a frozen winter
river. Big expressive faces, exaggerated slapstick gestures, heavy motion lines.
Comedy first - the tiger is never actually hurt, only comically startled. No
blood, no injuries, no burns on skin. No text or letters in the image.
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

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up from low on the forest floor: a huge
striped tiger fills the upper half of the frame, peering down with wide puzzled
eyes and frizzled whiskers. At the bottom, tiny by comparison, a small grey-brown
hare sits upright with both paws politely folded, ears straight up, wearing a
perfectly innocent expression. Autumn pines and golden light behind them.
```

## 본문 열 장 (모두 가로 16:9)

### `01-caught.png` — 붙잡힌 토끼

```
Wide autumn forest scene. On the right, the huge tiger looms with one paw pinning
the ground beside a small hare, mouth open in a roar, tongue out. On the left,
the tiny hare sits perfectly still with ears up and paws folded, eyes calm,
utterly composed despite the size difference. Dry golden grass and red-barked
pines, dappled light. Funny rather than frightening.
```

### `02-sparrow.png` — 참새가 더 맛있다며

```
Wide forest scene. On the left, the hare stands on his hind legs gesturing
grandly with both front paws, describing something delicious, eyes closed in
mock-appreciation. On the right, the tiger sits back on his haunches, head
tilted, a huge drop of drool hanging from his mouth, completely taken in. Small
sparrows flit in the branches above, unnoticed by both.
```

### `03-fire.png` — 눈 감고 입 벌린 호랑이

```
Wide forest scene, strong left-right split. On the right, the tiger sits with
eyes squeezed tight shut and mouth stretched comically wide open, waiting. On the
left, the hare crouches low behind him striking a flint into a heap of dry golden
grass, one paw shielding the tiny spark, glancing sideways with a sly grin. First
wisps of smoke curling up.
```

### `04-burn.png` — 개울로 뛰어드는 호랑이

```
Wide forest scene full of action. On the left, a wall of orange flame roars up
through dry grass with billowing smoke. On the right, the tiger leaps headlong
into a stream with an enormous splash, all four legs splayed, eyes bulging, his
whiskers now frizzled into comic corkscrews. Far in the background, a tiny hare
silhouette bounding away over a ridge. Pure slapstick.
```

### `05-again.png` — 며칠 뒤 다시 마주치다

```
Wide rocky forest clearing. On the left, the tiger plants both front paws down
and leans in furious, teeth bared, his frizzled corkscrew whiskers still sticking
out sideways. On the right, the small hare stands calmly with one paw raised to
his chin, head tilted, wearing an expression of polite concern - the picture of
innocence. Autumn colors, comic standoff.
```

### `06-stones.png` — 돌을 떡이라며 굽다

```
Wide clearing scene with a small campfire in the centre. Round smooth grey stones
sit in the flames glowing faintly red. On the left, the hare gestures toward them
like a proud cook presenting a dish. On the right, the tiger leans in over the
fire, eyes shining, licking his lips, one paw already reaching. Warm firelight on
both faces, evening forest behind.
```

### `07-hot.png` — 뜨거운 돌을 물고 펄쩍

```
Wide clearing scene. In the centre, the tiger springs straight up into the air
with all four legs stretched out, eyes bulging, tongue hanging out, steam puffing
comically from his mouth, a round grey stone tumbling away. Motion lines and
sweat drops everywhere. On the far right edge, a single long rabbit ear
disappearing behind a rock. Peak slapstick, no injury shown.
```

### `08-winter.png` — 얼어붙은 강가

```
Wide winter river scene. A broad frozen river stretches across the frame, snow on
the banks, bare trees and blue-white hills behind. On the right, the tiger walks
along the ice, breath steaming, whiskers still frizzled, a thick scarf of snow on
his back. On the left, the small hare sits on a snowy rock, ears up, watching him
with bright interest. Crisp blue and white.
```

### `09-tail.png` — 얼음 구멍에 꼬리를 담그다

```
Wide winter river scene at dusk. In the centre, the tiger sits hunched on the ice
beside a round hole, his long striped tail dangling down into the dark water, an
expression of patient concentration. On the left, the hare points helpfully at
the hole with one paw while already half turned away, taking a first sneaky step
in the other direction. Purple-blue evening light, first stars.
```

### `10-escape.png` — 얼음이 쩍 갈라지고

```
Wide winter river scene at sunrise. In the centre, the tiger heaves backward with
every muscle straining, eyes screwed shut, as the ice around his tail cracks
apart in jagged white lines with chips flying. On the left edge, distant village
figures approach over the snow. On the right, far away on a hill, the tiny hare
watches with folded paws. Pale gold dawn, explosive motion.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet snowy Korean riverbank at sunrise, no animals in sight. A round hole in
the ice with cracks radiating out from it, a single line of small rabbit tracks
crossing the snow toward the pine hills, soft pink and gold light. Peaceful and
a little amused.
```
