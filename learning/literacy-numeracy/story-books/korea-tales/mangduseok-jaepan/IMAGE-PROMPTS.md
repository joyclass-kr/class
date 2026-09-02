# 제미나이 그림 프롬프트 — 망두석 재판

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
storybook. Setting is a Joseon-era county town: a tiled-roof government office
(gwana) with a wide packed-earth courtyard, a raised wooden platform where the
magistrate sits behind a low desk, plus a dusty country road with pine trees and
a grave mound. Warm daylight, rich fabric colors for the silk. Big expressive
faces, exaggerated comic gestures. Nobody is beaten or hurt. No text or letters.
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
The silk merchant: a middle-aged man in worn brown hanbok with a cloth headband,
a tall stack of colourful silk bolts on a wooden A-frame carrier, round anxious
face. The magistrate: a dignified man in a dark blue official robe and a winged
black official hat, long thin beard, a completely straight face throughout - the
joke is that he never once looks like he is joking, until the very last picture
where he allows himself a small knowing smile. The constables: two men in yellow
tunics with black hats and staffs, permanently baffled. The stone post: a
weathered grey granite pillar about the height of a man, carved with a simple
rounded top - draw it exactly the same in every picture, completely inert.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A weathered grey stone post stands upright in the
middle of a government office courtyard, bound around with thick rope, filling
most of the tall frame. At the bottom, small in comparison, a magistrate in dark
blue robes sits behind a low desk pointing sternly up at it. A ring of villagers'
heads peeks in from the edges. Warm sunlight, absurd and intriguing.
```

## 본문 열 장 (모두 가로 16:9)

### `01-merchant.webp` — 망두석 그늘에서 잠들다

```
Wide summer country road scene at midday. On the right, a tall weathered grey
stone post stands beside the road near a low grass grave mound, casting a narrow
patch of shade. In that shade on the left, the silk merchant lies asleep with his
head on his arm, mouth open, his A-frame carrier stacked with bright silk bolts
propped beside him. Blazing sun, cicada-loud stillness.
```

### `02-gone.webp` — 사라진 비단

```
Wide road scene. In the centre, the merchant is on his feet spinning around with
both arms flung wide, mouth open in a wail, eyes streaming. The spot where his
carrier stood is empty except for a flattened patch of grass. The stone post
stands beside him, utterly indifferent. Empty road stretching to both edges, not
a soul in sight.
```

### `03-court.webp` — 관아에 아뢰다

```
Wide scene in a government office courtyard. On the right, the magistrate sits on
a raised wooden platform behind a low desk in dark blue robes and winged hat,
leaning forward with one hand raised in a question. On the left, the merchant
kneels on the packed earth with both hands on the ground, head bowed, one hand
lifted to point weakly back toward the road. Two constables stand at the sides.
```

### `04-arrest.webp` — 돌을 잡아 오너라

```
Wide courtyard scene. On the right, the magistrate stands and points offstage
with a straight arm, face absolutely serious, robes sweeping. On the left, the
two constables stare at him with their jaws hanging open, one pointing at himself
in disbelief, the other's hat sliding sideways. Huge comic contrast between the
magistrate's calm and their panic.
```

### `05-drag.webp` — 밧줄로 끌려오는 돌기둥

```
Wide scene on the road into town. In the centre, the two constables heave on
thick ropes wrapped around the grey stone post, which is lying on a wooden sled,
both men red-faced and straining. Along both sides of the road, villagers gather,
pointing and laughing behind their hands, more running in from the edges of the
frame. Dust and effort lines.
```

### `06-question.webp` — 돌을 심문하는 원님

```
Wide courtyard scene. On the right, the magistrate leans over his desk and
bellows at the stone post, one fist raised, beard bristling, absolutely furious.
In the centre, the grey stone post stands roped upright, doing nothing at all. On
the left and behind, a packed crowd of villagers presses in, all wide-eyed, some
biting their lips. Peak absurdity, played completely straight.
```

### `07-laugh.webp` — 터져 버린 웃음

```
Wide courtyard scene. The crowd fills most of the frame, every single person
doubled over laughing, heads thrown back, hands slapping knees, hats falling off,
tears flying. In the centre the stone post stands silent. On the right edge, the
magistrate sits frozen mid-shout, staring at them. Explosive noise and motion.
```

### `08-fine.webp` — 비단 한 필씩 바쳐라

```
Wide courtyard scene. On the right, the magistrate slams one palm down on his low
desk, the desk jumping, his face thunderous. On the left, the crowd has gone dead
silent and pale, mouths shut tight, several already backing away toward the gate
with stiff frightened steps. The stone post stands unbothered in the middle.
Comic reversal.
```

### `09-silk.webp` — 산더미처럼 쌓인 비단

```
Wide courtyard scene in evening light. In the centre, a big heap of colourful
rolled silk bolts piled on straw mats. On the left, the merchant kneels beside it
holding one bolt up to the light, eyes wide, one arm shooting up as he shouts. On
the right, the magistrate watches from his platform, expression unreadable. Warm
orange light across the courtyard.
```

### `10-caught.webp` — 무릎을 탁 친 사람들

```
Wide courtyard scene. On the left, the two constables take hold of a shifty-looking
man in grey who hangs his head. In the centre-right, the magistrate finally allows
a small knowing smile, one hand stroking his beard. Around them, villagers slap
their own knees and foreheads in dawning realisation, several pointing at the
stone post. Warm evening light, satisfying and funny.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet country road at sunset, no people. The weathered grey stone post stands
back in its own place beside the grave mound, a loose length of rope coiled at
its base, long shadows across the dirt road, pine trees behind. Warm orange
light. Calm and a little wry.
```
