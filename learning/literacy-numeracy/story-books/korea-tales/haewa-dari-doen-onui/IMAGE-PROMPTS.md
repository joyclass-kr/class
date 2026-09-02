# 제미나이 그림 프롬프트 — 해와 달이 된 오누이

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

**무섭지만 무섭기만 하지는 않은 이야기**예요. 아이가 이불을 뒤집어쓰고 보면서도 눈은 못 떼는 정도가 딱 좋습니다.

- **호랑이를 잔인하게 그리지 마세요.** 크고 무섭되 만화처럼 그려 주세요. 피나 상처는 한 방울도 나오면 안 됩니다. 4번에서 어머니가 잡아먹히는 장면은 **절대 그리지 마세요** — 텅 빈 광주리와 안개 낀 고갯길만 보여 주면 됩니다.
- **6번이 이 책에서 가장 무서운 그림입니다.** 문틈으로 쑥 들어온 털북숭이 손 하나. 호랑이 몸은 보이지 말고 **손만** 보여 주세요. 그것 하나로 충분합니다.
- **9번이 가장 웃긴 그림이에요.** 호랑이가 바가지로 우물물을 퍼내는 장면입니다. 무서움과 우스움이 뒤집히는 자리니 호랑이를 아주 우스꽝스럽게 그려 주세요.
- **12번이 절정입니다.** 두 줄기 동아줄 — 하나는 새것, 하나는 다 삭은 것 — 이 하늘에서 내려오고, 오누이는 올라가고 호랑이는 떨어집니다. 화면을 세로로 길게 쓰세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, in the look of a classic Korean animated storybook.
Setting is a poor mountain village in old Korea: a small thatched cottage with a
paper door and a swept yard, a stone well with a big old tree beside it, a chain
of misty mountain passes, and a field of sorghum with tall red-brown stalks.
Warm daylight for the early scenes, deep blue night and lamplight for the middle,
and a wide golden sky at the end. Scary in a cartoon way only — never gory, never
a wound, never blood. No text or letters.
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
The brother: a boy of about ten in a patched off-white hanbok with his hair in a
short topknot, quick-eyed and steady; he is the one who thinks first. The sister:
a girl of about seven with a single braid and a faded pink jeogori, big round
eyes, easily frightened and easily amused. The mother: a young widow in a worn
grey-blue hanbok with a cloth wrapped round her head, carrying a woven basket on
her head. The tiger: an enormous Korean folk-painting tiger, orange with bold
black stripes, a broad comic face with huge whiskers and round yellow eyes -
menacing in the early scenes and ridiculous in the later ones, but always a
cartoon. Later he wears the mother's headcloth badly, which should look absurd
rather than horrifying.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A night sky filling the tall frame. Down the
middle hang two ropes side by side from the clouds: one thick and new, one
frayed and rotting. Climbing the new rope near the top, a boy and a small girl,
seen from below, reaching for the light. Far below at the bottom of the frame,
a huge striped tiger dangles from the frayed rope with its eyes wide. Deep blue
night, one warm break of gold in the clouds. Frightening and thrilling at once.
```

## 본문  장 (모두 가로 16:9)

### `01-family.webp` — 문 꼭 잠그고 있어라

```
Wide scene at the door of a small thatched cottage in the morning. On the right,
the mother stands ready to leave with an empty woven basket under her arm, one
hand raised in warning, her face gentle but serious. On the left in the doorway,
the boy and the little girl stand side by side, the girl holding her brother's
sleeve. Bare mountain slopes behind, thin smoke from the roof. Warm and a little
anxious.
```

### `02-tiger.webp` — 떡 하나 주면 안 잡아먹지

```
Wide scene on a misty mountain pass. On the right, an enormous striped tiger
rears up across the path with one paw raised and its mouth open, filling half the
frame. On the left, the mother has stopped dead with the basket of rice cakes on
her head, one hand steadying it, knees bent to run. Evening mist, pine trees, a
narrow path. Huge size difference, comic-scary.
```

### `03-pass.webp` — 고개마다 앉아 있는 그놈

```
Wide scene showing a chain of mountain passes receding into the distance. On each
ridge, the same tiger sits waiting with its tail curled, smaller and smaller into
the distance - four of them along the ridgeline. In the foreground the mother
hurries along with the basket, noticeably emptier than before. Blue-violet dusk.
Funny and dreadful at once.
```

### `04-empty.webp` — 텅 빈 광주리

```
Wide scene of an empty misty mountain path at nightfall - no people in it at all.
A woven basket lies tipped over on the ground, completely empty, one cloth cover
caught on a bush nearby. Fog rolling between the pines, the last light gone from
the sky. Show nothing else. The emptiness is the whole picture. Quiet and
frightening without a single frightening thing in it.
```

### `05-knock.webp` — 얘들아, 엄마다

```
Wide interior of the small cottage at night, one oil lamp burning. On the right,
the boy and girl sit frozen mid-motion, both staring at the closed paper door;
the boy has caught his sister's sleeve to stop her getting up. On the left, the
door glows faintly from something on the other side, and a huge shadow spreads
across the paper. Warm lamplight, deep shadow. Held breath.
```

### `06-hand.webp` — 문틈으로 들어온 손

```
Wide interior scene, close on the door. Through a gap at the bottom of the paper
door, one huge paw pushes in - shaggy black-and-orange fur, thick curved claws
tucked under. Show only the paw and nothing else of the tiger. On the right, the
two children press back against the far wall with their hands over their mouths,
eyes enormous. Lamplight, one terrible detail. The scariest picture in the
book.
```

### `07-escape.webp` — 뒷문으로 살금살금

```
Wide scene of the cottage yard at night. On the left, the two children slip out
of a small back door on tiptoe, the boy pulling his sister by the hand, both
looking back over their shoulders. On the right across the yard, a stone well and
a big old tree with low branches. Blue moonlight, long shadows, silence. Tense
and quick.
```

### `08-well.webp` — 우물에 비친 얼굴

```
Wide scene at the well. In the centre, the tiger leans far over the stone rim
peering down into the water, tail up, completely absorbed. In the dark water, two
small faces are reflected. Up in the tree above and behind him, the two children
cling to a branch, holding perfectly still. Moonlight on water. The reader sees
what he does not.
```

### `09-laugh.webp` — 바가지로 우물물을 푸다

```
Wide scene at the well, comic. The huge tiger is frantically bailing water out of
the well with a tiny gourd dipper that is far too small for his paws, water
slopping everywhere, tongue out with effort, utterly ridiculous. Up in the tree,
the little girl has clapped both hands over her mouth too late and is laughing;
her brother's face is pure alarm. Moonlight, flying droplets. The turn of the
book.
```

### `10-climb.webp` — 참기름을 바르고 주르륵

```
Wide scene at the foot of the tree. The tiger has smeared sesame oil on his paws
from an overturned jar and is sliding straight back down the trunk with all four
legs splayed, an astonished look on his face, oil glistening. Above, the boy
points down with a triumphant grin while the little girl claps a hand over her own
mouth in horror at what she has just blurted out. Moonlight, motion lines. Very
funny.
```

### `11-rope.webp` — 하늘에 빌다

```
Wide scene looking up the tree. Near the top, the two children cling to the last
thin branch with nowhere left to climb, hands pressed together in prayer, faces
turned up to the sky. Below them, the tiger hacks at the trunk with an axe, chips
flying. From a break in the clouds above, a thick new rope has just begun to lower
toward the children. Deep blue night, one shaft of light. Desperate and
hopeful.
```

### `12-sky.webp` — 뚝, 그리고 해와 달

```
Tall dramatic scene. Two ropes hang from the clouds: on the left a strong new one
with the boy and girl climbing high toward a golden opening in the sky; on the
right a frayed one snapping in mid-air, the tiger tumbling away from it with legs
flailing, down toward a field of tall sorghum with red-brown stalks far below.
Above the clouds, a warm sun and a pale moon side by side. No injury shown.
Sweeping and triumphant.
```

### `end.webp` — 마지막 (가로 4:3)

```
A field of tall sorghum at dusk with no one in it, the stalks a deep red-brown,
swaying. Above the field, a wide evening sky with the moon already up on one side
and the last of the sun on the other. A small thatched cottage far off at the edge
of the field. Peaceful, with a faint ache to it.
```
