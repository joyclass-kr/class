# 제미나이 그림 프롬프트 — 이야기 주머니

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

**갇힌 이야기들을 어떻게 그릴지가 이 책의 핵심입니다.** 주머니 속 이야기들은 작고 반투명한 빛덩이 같은 존재로 그려 주세요 — 각각 조그만 얼굴과 팔다리가 있고, 안에 자기 이야기의 장면(호랑이, 배, 도깨비 같은 것)이 흐릿하게 비칩니다. 처음에는 밝고 예쁘지만 뒤로 갈수록 빛이 탁해지고 표정이 성나야 해요. 무섭게가 아니라 **딱하고 성난** 느낌으로.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean outlines and
warm colors, similar to a classic Korean animated storybook. Setting is a
well-off Joseon-era household: a paper-screened room with a cloth pouch hanging
on the wall, a stable yard, a country road with a stone well and a strawberry
patch, and a bridal room lit by candles. Warm amber indoors, bright daylight on
the road. The trapped stories are small translucent glowing sprites. Nothing
gory; the snake appears only briefly and is never struck. No text or letters.
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
The young master: a boy who grows into a young man across the book - round eager
face as a child, well-dressed in a fine blue hanbok as a bridegroom, easily
annoyed. The old servant: a stooped elderly man with a white topknot and a
weathered kind face, plain brown clothes, always half a step behind his master.
He is the only one who ever looks worried. The story sprites: dozens of small
translucent glowing beings the size of a fist, each with a tiny face and limbs and
a faint scene shimmering inside it - one holds a tiger, one a boat, one a goblin.
Bright and merry at first, dull and scowling by the middle of the book. The
pouch: a fat cloth pouch with a drawstring, hanging from a nail on the wall,
visibly bulging more in each picture.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A fat cloth pouch hangs from a nail on a paper-
screened wall, filling the middle of the tall frame, its drawstring pulled tight.
The cloth glows faintly from within, and pressed against it from the inside are
dozens of small hand and face shapes, straining outward. At the bottom of the
frame, a boy sleeps peacefully on his mat, unaware. Warm lamplight, quietly
unsettling.
```

## 본문  장 (모두 가로 16:9)

### `01-boy.webp` — 이야기라면 사족을 못 쓰는 도련님

```
Wide interior of a warm Korean room. On the right, an old woman sits telling a
story with both hands raised in mid-gesture. On the left, a small boy leans so far
forward that his rice bowl has tipped, spoon abandoned, eyes shining, mouth open.
Other family members eat on unbothered in the background. Amber lamplight, funny
and warm.
```

### `02-pouch.webp` — 주머니에 후 불어 넣기

```
Wide interior scene at night. In the centre, the boy stands on his toes at the
wall, holding a cloth pouch open with one hand and blowing into it, cheeks
puffed. A single small glowing sprite is being drawn from his lips into the
pouch, its tiny arms reaching back. His face is delighted and possessive. Warm
lamplight, magical and just slightly wrong.
```

### `03-years.webp` — 열 해가 지나 터질 듯 불룩해진 주머니

```
Wide interior scene. On the right, the pouch hangs from its nail, now enormously
swollen and straining at the drawstring, faint glowing shapes pressing out
against the cloth from inside. On the left, the boy - now a young man - sits with
his back to it reading, entirely used to it. Dust on the nail. Time visibly
passed.
```

### `04-angry.webp` — 주머니 속의 웅성거림

```
Cutaway view into the inside of the pouch, filling the whole wide frame. Dozens
of small glowing story sprites are crammed shoulder to shoulder in a cramped
dark space, elbows in each other's faces, their light gone dull and greenish.
Some sit slumped, some shout with their fists raised, one bangs on the cloth
wall. Cramped and stuffy. Pitiable and cross, not scary.
```

### `05-plot.webp` — 혼례 전날 밤의 모의

```
Cutaway into the pouch again, at night. The sprites have gathered in a tight ring
with their heads together, plotting, three of them pointing in different
directions - one at a well shape shimmering inside itself, one at a berry, one at
a coiled shape. Their dull light throws long shadows in the cramped space.
Conspiratorial and comic-sinister.
```

### `06-listen.webp` — 문밖에서 엿들은 하인

```
Wide interior scene at night, seen from the corridor. On the right, inside the
room, the glowing pouch hangs on the wall. On the left, outside the paper door,
the old servant stands frozen with his ear pressed to the paper, a lantern held
low, eyes wide, mouth open. His shadow stretches long down the corridor. Tense
and quiet.
```

### `07-well.webp` — 우물가를 그대로 지나쳐

```
Wide scene on a country road in the morning. A wedding procession moves from
right to left - the young master on a horse, servants with chests. On the right,
a stone well by the roadside with a bucket. The master twists in the saddle
pointing back at it, mouth open, annoyed. At the horse's head, the old servant
faces stubbornly forward and walks faster. Bright and comic-tense.
```

### `08-berry.webp` — 탐스러운 딸기밭도 그냥 지나쳐

```
Wide scene further along the road. On the left, a lush patch of ripe red
strawberries beside the path, unnaturally perfect. On the right, the procession
hurries past; the master half rises in the stirrups pointing at the berries, face
red with irritation, while the old servant tugs the reins and keeps going.
Sunlight, dust, comic stubbornness.
```

### `09-scold.webp` — 신부 집 앞의 꾸중

```
Wide scene in a courtyard before a fine tiled-roof house. On the right, the young
master stands with one finger jabbing down at the old servant, face flushed,
wedding robes askew. On the left, the old servant kneels with his head bowed and
his hands on the ground, saying nothing. Onlookers watch awkwardly from the
edges. Warm afternoon light, painful silence.
```

### `10-room.webp` — 몽둥이를 들고 신방 문을 열다

```
Wide scene at night outside the bridal room. In the centre, the old servant
shoves the paper door open with one shoulder, a wooden club in his raised hand,
face grim and determined. On the right, inside, candlelight and the startled
faces of the bride and groom. On the left, family members come running with
lanterns, mouths open in outrage. Chaos and candle glow.
```

### `11-snake.webp` — 이불 밑에서 미끄러져 나온 것

```
Wide interior of the bridal room. In the centre, the old servant has lifted the
edge of a quilt with the tip of his club, and a long dark snake pours out from
under it and slides toward an open window on the right, already half gone. On the
left, the bride and groom recoil, and behind them the family stands frozen in the
doorway. Candlelight, no blood, nobody struck.
```

### `12-tell.webp` — 주머니를 활짝 열고

```
Wide interior of the young master's room in daylight. In the centre, he stands
holding the pouch open with both hands and dozens of small glowing sprites stream
up and out of it into the sunlit air, their light turning bright and clear again
as they rise. On the right, village children sit in a row, faces upturned and
delighted. The old servant smiles from the doorway. Joyful and released.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean room in the afternoon, no people. An empty cloth pouch hangs
loose and flat from its nail, drawstring untied, and a warm shaft of sunlight
falls through the open paper door onto the floor where children's cushions lie
scattered. Peaceful and generous.
```
