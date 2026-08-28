# 제미나이 그림 프롬프트 — 두꺼비와 토끼와 호랑이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a grassy Korean hillside in autumn: golden and green
slopes, scattered rocks, red maple and yellow gingko, pine ridges and a thatched
village far below. Warm autumn palette. Big expressive faces, exaggerated comic
gestures, heavy motion lines. Nobody gets hurt - this is a pure comedy. No text
or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
The same goes for monsters and beasts. A monster may be FRIGHTENING but never
DISGUSTING. Scary is about scale, darkness, silence and what you cannot quite
see - a huge shadow, two points of light where the eyes are, one clawed foot at
the edge of the frame. Disgusting is about detail: segmented legs, wet mouths,
dripping fangs, bristles, many small eyes. Draw the first, never the second.
When in doubt, show less of the monster, not more.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The tiger: a big orange-and-black striped Korean folk-painting tiger, round face,
huge whiskers, loud and boastful, always taking up the most space in the frame.
The rabbit: a slim grey-brown hare with very long ears and springy legs, quick and
cocky, usually mid-motion. The toad: a plump brown-green toad with a wide flat
mouth, heavy-lidded sleepy eyes that blink slowly, sitting low and still - his
stillness next to the other two is the running joke. His belly grows visibly
rounder in the last three pictures. The steamer: a wide round grey earthenware
siru (Korean steaming pot) full of pale rice cakes.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A steep grassy autumn hillside seen from the side.
Near the top, a round grey earthenware steamer tumbles down the slope with pale
rice cakes flying out of it in an arc. Partway down, a plump toad sits calmly on
the grass with one rice cake already in his mouth. Far below at the bottom, tiny
tiger and rabbit figures sprint after the steamer. Warm gold and green.
```

## 본문 열 장 (모두 가로 2:1)

### `01-cake.webp` — 떡시루를 둘러싼 셋

```
Wide autumn hillside scene. In the centre, a round grey steamer heaped with pale
rice cakes sits on the grass with steam curling up. Around it: on the left the
big striped tiger leans in sniffing deeply, in the middle the hare rises on his
back legs with both paws up in delight, on the right the plump toad sits low and
still, blinking. Golden afternoon light.
```

### `02-argue.webp` — 누가 다 먹을지 다투다

```
Wide hillside scene. On the left, the tiger slams one huge paw down on the grass,
mouth open in a roar, chest puffed out. In the centre-right, the hare stands on
tiptoe jabbing a paw toward the tiger, ears back, arguing right in his face. Dust
puffs and comic impact lines between them. Far right at the edge, the toad sits
watching, unmoved.
```

### `03-quiet.webp` — 아무 말 없는 두꺼비

```
Wide hillside scene. On the left, the tiger and the hare have both turned to look
over their shoulders, eyebrows raised in mid-question. On the right, the toad
sits alone on a flat rock, small in the wide frame, blinking slowly with a
completely blank expression, one webbed foot tucked under him. Lots of open grass
between them. Comic timing through empty space.
```

### `04-idea.webp` — 내기를 제안하는 두꺼비

```
Wide hillside scene. On the right, the toad has risen slightly and lifted one
webbed foot in a small polite gesture, mouth open just a little, still calm. On
the left, the tiger and the hare both lean in sharply toward him, ears and
whiskers forward, wide-eyed and interested. The steamer sits between them at the
crest of the slope.
```

### `05-agree.webp` — 출발선에 선 둘

```
Wide hillside scene at the top of the slope. On the left, the tiger crouches in
an exaggerated racing stance, haunches high, tail up, grinning with all his
teeth. Next to him the hare stretches one long leg behind him, warming up, chin
lifted confidently. On the right, the toad sits flat on the grass beside the
steamer, completely relaxed. The long slope falls away below them.
```

### `06-roll.webp` — 굴러가는 시루를 쫓아

```
Wide hillside scene full of motion. The round steamer bounces down the slope from
upper right to lower left, drawn with heavy motion arcs and dust. Just behind it,
the tiger and the hare tear downhill neck and neck, legs stretched flat out, both
reaching forward with one paw, mouths open shouting. Grass and leaves fly up
behind them.
```

### `07-scatter.webp` — 언덕에 떨어지는 떡

```
Wide hillside scene. The steamer bounces away toward the bottom left, and along
its whole path pale rice cakes have popped out and landed in the grass, scattered
in a trail across the entire width of the frame. On the upper right, the toad
plods slowly downhill, one webbed foot lifted mid-step, eyeing the nearest rice
cake. Warm gold light.
```

### `08-eat.webp` — 떡을 주워 먹는 두꺼비

```
Wide hillside scene. The toad sits square in the middle of the trail of scattered
rice cakes, one held in both front feet and pressed into his wide mouth, cheeks
bulging, eyes closed in bliss. Several more rice cakes are lined up beside him
like a little collection. Far below at the very bottom edge, two tiny running
figures. Sunny and satisfying.
```

### `09-empty.webp` — 텅 빈 시루

```
Wide scene at the foot of the hill. In the centre, the tiger and the hare both
grip opposite sides of the round steamer, having caught it together, and both
stare down into it. The steamer is completely empty. Their faces have gone blank
and slack, mouths hanging open, ears and whiskers drooping. A single dry crumb
sits in the bottom. Dead silence, comic.
```

### `10-belly.webp` — 배를 두드리는 두꺼비

```
Wide hillside scene. On the right, the toad reclines back on the grass with an
enormously round belly, patting it with one webbed foot, eyes closed in a
contented smile. On the left, the tiger and the hare have scrambled back up the
slope and stand frozen mid-stride, pointing at him with mouths wide open in
outrage. Empty steamer abandoned behind them. Very funny.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet grassy Korean hillside at sunset, no animals. An empty round grey
earthenware steamer lies tipped on its side in the grass, a few crumbs scattered
around it, red maple leaves drifting down, warm orange light across the slope.
Peaceful and a little wry.
```
