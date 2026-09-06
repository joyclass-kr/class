# 제미나이 그림 프롬프트 — 주인을 구한 누렁이

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

## 본문 열 장 (모두 가로 16:9)

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
collapsed onto his side, sides visibly rising with breath. HIS YELLOW COAT IS
BURNT BLACK in patches — he rolled through the fire's edge to soak the grass.
Smoke and sparks above. Dramatic and moving.
```

### `09-dawn.webp` — 까맣게 탄 들판 한가운데

```
Wide dawn scene. A vast blackened field of ash stretches to every edge under a
pale pink sky. In the very centre, one small green circle of unburnt grass. Kim
has sat bolt upright there, both hands on his head, mouth open, staring around
him. Beside him the dog lies with his eyes closed, still soaking wet, HIS COAT
BURNT BLACK all over — he does not move. Stark and striking.
```

### `10-tree.webp` — 그 자리에 심은 나무

```
Wide scene of the same field weeks later, green shoots pushing through the burnt
ground. On the left, Kim kneels pressing earth around a young sapling with both
hands, his face quiet and sad — the dog is buried under it. NO LIVE DOG in this
picture. Warm gold light, a few villagers approaching in the distance. Sad but
warm: the tree is how the village keeps him.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean field at sunset years later, no people. A grown tree stands alone
in the middle of a green field, its shadow long across the grass, a small stone
marker at its foot. Warm orange light, swallows in the sky. Peaceful and
remembering.
```
