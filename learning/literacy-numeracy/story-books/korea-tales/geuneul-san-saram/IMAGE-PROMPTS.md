# 제미나이 그림 프롬프트 — 그늘을 산 사람

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

**그늘의 위치가 이야기입니다.** 장면마다 나무 그늘이 어디까지 와 있는지를 바닥에 또렷한 모양으로 그려 주세요 — 길 위 → 담 밑 → 마당 한복판 → 대청마루. 그늘 가장자리를 뚜렷하게 그려서 어디까지가 그늘인지 한눈에 보이게 하는 것이 중요합니다. 해의 위치도 장면마다 조금씩 옮겨 가야 해요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and warm colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era village: a huge old zelkova tree at the village
entrance, a wealthy man's tiled-roof house with an earthen wall, a swept
courtyard and a wooden verandah. Blazing summer light with very strong, clearly
edged shadows - the shadow of the tree must read as a distinct shape on the
ground in every picture. Cicada-loud midsummer. No text or letters.
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
The traveller: a lean man in his forties in a plain travel hanbok with a bundle
and a folding fan, a wide unbothered smile and calm eyes - never smug, never
angry. The rich man: a plump elderly man in a fine grey silk coat and horsehair
hat, thin moustache, always red in the face; proud at first, then flustered, then
deflated, and finally sheepish. Villagers: farmers and children in worn hanbok,
increasingly relaxed and cheerful as they take over the shade. The tree: an
enormous ancient zelkova with a thick trunk and a very broad flat canopy - the
same tree, same shape, in every picture.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking down from above onto a Korean village at
midday. A huge round tree canopy fills the upper part of the frame, and its dark
shadow falls across the lower part - spilling over a wall and covering most of a
tiled-roof house's courtyard. In the middle of that shadow, one small figure lies
comfortably on a mat. Blazing white sunlight everywhere the shadow is not.
```

## 본문  장 (모두 가로 16:9)

### `01-tree.webp` — 마을 어귀의 아름드리 느티나무

```
Wide village scene at midday. In the centre, an enormous ancient zelkova tree
with a broad flat canopy stands at the village entrance, its dark shadow pooled
neatly on the dirt road at its foot. On the right, just beyond the shadow, a
prosperous tiled-roof house behind an earthen wall. Blazing sun, sharp shadow
edges, cicada heat.
```

### `02-rest.webp` — 그늘에 짐을 내려놓은 나그네

```
Wide scene at the foot of the tree. In the centre of the tree's shadow on the
road, the traveller lies back on his bundle with one knee up, fanning himself,
eyes closed in bliss. Everything outside the shadow is bleached white with sun.
Cicadas suggested on the trunk. Deliciously cool inside a very hot picture.
```

### `03-scold.webp` — 대문을 박차고 나온 부자

```
Wide scene at the tree and the house gate. On the right, the rich man storms out
through his gate with one arm flung up, face scarlet, mouth wide open shouting.
On the left, the traveller is propping himself up on one elbow in the shade,
eyebrows raised but calm. The shadow's edge lies clearly between them on the
ground. Comic confrontation.
```

### `04-buy.webp` — 엽전 꾸러미를 꺼내며

```
Wide scene at the tree. In the centre, the traveller stands and holds out a
string of copper coins on his open palm, smiling pleasantly. On the right, the
rich man has stopped mid-shout with his mouth still open, eyes now fixed on the
coins, one hand already half raised. Behind them, the shadow lies on the road.
Beautifully absurd.
```

### `05-deal.webp` — 흐뭇하게 돌아서는 부자

```
Wide scene. On the right, the rich man walks back toward his gate counting coins
into his palm, shoulders shaking with a private chuckle, thoroughly pleased with
himself. On the left, the traveller stands in the shade with his fan folded,
watching him go with a mild unreadable smile. The shadow has already shifted a
little toward the wall. Warm and ominous.
```

### `06-move.webp` — 담을 넘어간 그늘

```
Wide scene later in the afternoon, sun visibly lower on the right. The tree's
shadow has swung across the road, climbed the earthen wall and spilled over into
the courtyard beyond, its edge now well inside the property. Nobody is in the
frame except a cat blinking at the edge of the shade. The whole picture is about
the shadow moving.
```

### `07-enter.webp` — 마당에 멍석을 펴는 나그네

```
Wide scene in the rich man's courtyard. In the centre, the traveller calmly
unrolls a straw mat in the middle of the shaded part of the yard and sits down
cross-legged, fan in hand. On the right, the rich man stands frozen on his own
verandah with both arms out, mouth open, face purple. Strong shadow edge cutting
across the swept earth. Perfect comic timing.
```

### `08-friends.webp` — 사람들을 데려온 이튿날

```
Wide scene in the courtyard. A dozen villagers of all ages sit around on mats in
the tree's shadow, fanning, chatting, sharing a bowl of chilled noodles, one man
napping with his hat over his face. Children play at the shadow's edge, careful
not to step out of it. On the far right, the rich man peers out from a
paper-screened window, seething. Warm, sociable, hilarious.
```

### `09-porch.webp` — 대청마루까지 닿은 그늘

```
Wide scene of the house verandah in late afternoon. The tree's shadow now reaches
right up onto the wooden verandah floor. Villagers sit along the edge of it with
their feet dangling, one asleep against a pillar. On the very end of the
verandah, squeezed into the last sunlit corner of his own house, the rich man
sits stiffly with his knees together. Deliciously awkward.
```

### `10-beg.webp` — 나그네를 찾아온 부자

```
Wide scene in the courtyard at evening. On the left, the rich man stands with his
hat in his hands and his shoulders slumped, holding out a doubled string of coins,
head slightly bowed - all the bluster gone. On the right, the traveller sits on
the mat looking up at him, silent and thoughtful. The shadow is long and soft
now. Quiet turning point.
```

### `11-return.webp` — 그늘은 마을 사람 모두의 것

```
Wide scene in the courtyard. In the centre, the traveller stands and gestures
outward with one open hand toward the gate and the village beyond, speaking
plainly. On the left, the rich man stares at him with his mouth slightly open,
the coins forgotten in his hand, face turning red for a completely different
reason. Warm gold evening light. Generous and unexpected.
```

### `12-village.webp` — 이듬해 여름의 느티나무 아래

```
Wide scene under the great tree the following summer. Straw mats are spread
across the shade and the whole village sits on them - grandmothers, children, a
man with a drum. On one edge of the mat, the rich man sits in plain clothes
fanning himself, chatting with a neighbour, entirely at ease. The tree's shadow
covers everyone equally. Warm, green, generous.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet village entrance at sunset, no people. The great zelkova stands alone
with a rolled straw mat leaning against its trunk, its long shadow stretching
across the empty road and over a low earthen wall. Warm orange light, cicadas
finished for the day. Peaceful and shared.
```
