# 제미나이 그림 프롬프트 — 주인을 구한 누렁이

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

## 이 책만의 요령

슬랩스틱이 아니라 **가슴 졸이는 이야기**예요. 불은 크고 무섭게 그리되, 사람이나 개가 다치는 모습은 절대 그리지 않습니다. 마지막 두 장은 따뜻하게 끝내 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean bold
outlines and rich colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era country district: a roadside tavern with paper lanterns,
a wide open field of dry autumn grass, a shallow stream, and low pine hills.
Warm amber for the tavern, deep indigo night, then huge orange firelight, then
soft gold dawn. Strong dramatic lighting. Never show burns, wounds or a dead
animal - the fire is a wall of light and smoke, never touching anyone.
No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Kim: a cheerful farmer in his forties, round red-cheeked face, topknot under a
worn headband, plain off-white hanbok, a little unsteady after drinking.
Nureongi the dog: a sturdy yellow-brown Korean Jindo-type dog with a curled tail
and dark muzzle, warm intelligent eyes. In the second half his coat is soaked
dark and dripping, and in the last two pictures he is exhausted but plainly
alive and breathing. Keep his colour and shape identical in every picture.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A wall of orange flame sweeps across a dark field
from the top of the frame downward. At the very bottom, a small circle of unburnt
wet grass where a man lies asleep, and beside him a soaked yellow-brown dog
standing with legs braced, facing the fire. Sparks and smoke fill the sky.
Dramatic and heroic, nobody harmed.
```

## 본문 열 장 (모두 가로 2:1)

### `01-pair.webp` — 그림자처럼 붙어 다니는 김 서방과 누렁이

```
Wide autumn country scene. A dirt path between harvested fields, low pine hills
behind. On the left, Kim walks with a hoe over his shoulder, laughing, head
turned back. Right behind him, close enough to touch, the yellow-brown dog trots
with his tail curled up, looking up at his master. Warm afternoon light, long
paired shadows on the road.
```

### `02-tavern.webp` — 주막에서 한잔 걸치는 김 서방

```
Wide interior of a roadside tavern at night lit by paper lanterns. On the right,
Kim sits at a low table among other villagers, one cup raised high, face flushed
and merry, a friend refilling it. On the left, near the open doorway, the dog
lies with his chin on his paws, eyes open and patient. Warm amber light, blue
night outside.
```

### `03-asleep.webp` — 마른 풀밭에 쓰러져 잠든 주인

```
Wide night field scene. In the centre-left, Kim lies flat on his back in dry
autumn grass, arms flung out, mouth open, fast asleep. On the right, the dog sits
upright beside him, ears pricked, looking out into the dark. A wide empty field
stretches to both edges, stars overhead. Peaceful, with a faint unease.
```

### `04-fire.webp` — 들판 끝에서 번지기 시작한 불

```
Wide night field scene. Along the far right edge, a low line of orange fire
creeps through the dry grass, with smoke rising and glowing sparks blowing left
on the wind. On the left, Kim still sleeps, unaware. Between them, the dog has
sprung to his feet, body turned toward the fire, ears flat. Deep indigo and
burning orange.
```

### `05-wake.webp` — 아무리 짖어도 깨지 않는 주인

```
Wide night scene, close in. On the right, the dog stands over Kim with the man's
sleeve gripped in his teeth, hauling backward with all four legs braced, eyes
wide. On the left, Kim rolls the other way, still snoring, one hand batting
vaguely at the air. Orange firelight already lighting one side of their faces.
Desperate and frustrating.
```

### `06-stream.webp` — 개울로 뛰어들어 몸을 적시다

```
Wide night scene at a shallow stream. In the centre, the dog leaps into the
water with an enormous splash, body half submerged, droplets flying in an arc,
his reflection broken across the surface. Behind him on the right, the orange
glow of the fire lights the far bank. Motion lines and spray. Urgent.
```

### `07-roll.webp` — 젖은 몸으로 풀밭을 구르는 누렁이

```
Wide night field scene. In the centre, the soaked dog rolls on his back and side
through the dry grass around the sleeping man, drawn as a blur of motion with
curved trails and flying water droplets, flattening a dark wet ring into the
field. Kim sleeps on in the middle of the ring. Fire glowing large on the right.
```

### `08-stop.webp` — 젖은 풀 앞에서 멈춘 불길

```
Wide night scene from above. A huge sweep of orange flame fills most of the
frame, but stops in a clean curve at the edge of a dark wet circle of grass.
Inside that circle, Kim lies asleep, untouched, and beside him the soaked dog has
collapsed onto his side, sides visibly rising with breath. Smoke and sparks
above. Dramatic and moving.
```

### `09-dawn.webp` — 까맣게 탄 들판 한가운데

```
Wide dawn scene. A vast blackened field of ash stretches to every edge under a
pale pink sky. In the very centre, one small green circle of unburnt grass. Kim
has sat bolt upright there, both hands on his head, mouth open, staring around
him. Beside him the wet dog lies with eyes closed, one ear twitching. Stark and
striking.
```

### `10-tree.webp` — 그 자리에 심은 나무

```
Wide scene of the same field weeks later, green shoots pushing through the burnt
ground. On the left, Kim kneels pressing earth around a young sapling with both
hands. On the right, the dog sits beside him, healthy again, tail curled, watching
the sapling. Warm gold light, a few villagers approaching in the distance.
Hopeful and warm.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet Korean field at sunset years later, no people. A grown tree stands alone
in the middle of a green field, its shadow long across the grass, a small stone
marker at its foot. Warm orange light, swallows in the sky. Peaceful and
remembering.
```
