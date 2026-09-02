# 제미나이 그림 프롬프트 — 요술 항아리

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
storybook. Traditional Korean village of the Joseon era: thatched-roof and
tiled-roof houses, earthen walls, rows of large brown onggi jars on a raised
platform, ploughed fields, persimmon trees. Warm earth-tone palette with clay
brown, straw yellow and grass green. Big expressive faces, exaggerated comic
gestures. No text or letters in the image.
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
The farmer: a lean man in his forties in patched off-white work hanbok with the
trousers tied at the ankles, a towel around his head, sun-browned honest face.
His wife: a cheerful woman in a faded blue and white hanbok with her hair in a
bun and sleeves tied back. The rich man: a plump man in a fine dark blue silk
durumagi and a black horsehair hat, thin moustache, greedy narrowed eyes and a
permanently smug expression. The old father: a small round-faced elderly man with
a white beard and topknot, plain grey hanbok, mild and slightly confused - drawn
identically every time he multiplies. The jar: a large round dark-brown Korean
onggi jar, wide-mouthed, waist-high.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A single large round dark-brown Korean onggi jar
standing alone in the middle of a ploughed field at sunset, earth heaped around
its base where it was just dug out. A stream of copper coins arcs up out of its
open mouth and scatters into the air, catching the golden light. Distant
thatched roofs and hills at the bottom. Warm and magical.
```

## 본문 열 장 (모두 가로 16:9)

### `01-dig.webp` — 밭에서 항아리를 파내다

```
Wide scene in a small ploughed field in spring. On the right, a farmer in patched
work hanbok kneels in the freshly turned soil, hoe set aside, brushing dirt off
the shoulder of a large brown onggi jar half buried in the ground, eyebrows up in
surprise. On the left, low green hills and a few thatched roofs. Warm morning
light, dark rich earth.
```

### `02-hoe.webp` — 호미가 두 개

```
Wide scene in a modest Korean house yard. In the centre, the jar sits on the
ground. The farmer holds one hoe in his right hand while staring down into the
jar where a second identical hoe lies at the bottom, his mouth open and eyes wide
in total bewilderment, free hand scratching his head. Simple wooden veranda and
earthen wall behind. Comic.
```

### `03-coin.webp` — 끝없이 나오는 엽전

```
Wide night scene inside a small Korean room lit by an oil lamp. The jar sits in
the middle. The wife reaches in with both hands while copper coins spill over the
rim and pile up across the floor in a growing heap. The farmer sits back on his
heels laughing with his head thrown back, coins in his lap. Warm lamplight,
joyful chaos.
```

### `04-rich.webp` — 몰라보게 달라진 농부의 집

```
Wide village scene by day. On the right, the farmer's house now has a handsome
tiled roof, a full storehouse and two oxen in the yard; the farmer and his wife
stand smiling in fine clean hanbok. On the left, two village women on the path
lean their heads together whispering behind their hands, glancing over. Bright
sunny day, gossip in the air.
```

### `05-seize.webp` — 항아리를 빼앗아 가는 부자

```
Wide scene in the farmer's yard. On the right, the plump rich man in dark blue
silk clutches the large jar against his chest with both arms, already striding
away, chin up and smug. On the left, the farmer and his wife reach after him,
mouths open in protest, hands out. Two of the rich man's servants block their
way. Dust kicked up, comic outrage.
```

### `06-gold.webp` — 금붙이를 퍼내는 부자

```
Wide scene inside a fine Korean room with the paper door shut tight. The rich man
kneels over the jar in the centre, both arms plunged inside, pulling out fistfuls
of gold rings and ingots, face split by an enormous greedy grin, gold heaped high
around him and spilling toward both edges of the frame. Lamplight, warm gold
glow.
```

### `07-father.webp` — 항아리에 빠지는 아버지

```
Wide scene in the same room. On the right, the rich man spins around with one arm
raised, shouting, face startled. On the left, the small old father is tipping
head-first over the rim of the jar, feet in the air, hat flying off, arms
windmilling. Exaggerated comic motion lines. Gold scattered on the floor between
them.
```

### `08-two.webp` — 아버지가 둘

```
Wide scene in the same room. On the left, the rich man has just hauled one old
father out and sits him on the floor, still holding his arm. On the right, a
second identical old father is climbing out of the jar by himself, one leg over
the rim, waving cheerfully. The rich man looks back and forth between the two,
face frozen in horror. Perfect comic timing.
```

### `09-many.webp` — 마당 가득한 아버지들

```
Wide scene in the courtyard of the rich man's house. Dozens of identical small
old fathers in grey hanbok fill the yard from edge to edge, sitting, standing,
waving, all with the same mild face, all with mouths open calling out. In the
centre, the rich man clutches his own head with both hands, mouth open in a
howl. Bright daylight, overwhelming and very funny.
```

### `10-ruined.webp` — 텅 빈 곳간

```
Wide scene. On the left, an empty storehouse with its doors thrown open, bare
shelves, one last rice sack being carried out. In the middle, the rich man in a
plain worn hanbok stirs an enormous cauldron, sweating, surrounded by a queue of
identical old fathers holding bowls. On the right, villagers peer over the wall,
doubled over laughing. Sunny and comic.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean village yard at sunset, no people. A row of ordinary brown onggi
jars sits on a raised stone platform beside an earthen wall, persimmon branches
above, warm orange light across the ground. Ordinary and peaceful.
```
