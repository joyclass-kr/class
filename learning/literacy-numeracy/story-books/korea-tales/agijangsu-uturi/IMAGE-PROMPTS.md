# 제미나이 그림 프롬프트 — 아기장수 우투리

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

**우투리의 날개는 작게.** 겨드랑이에 비둘기 날개만 한 것이 양쪽에 하나씩 — 등에 달린 큰 천사 날개가 아닙니다. 아기 때는 손바닥만 하고, 다섯 살 때도 팔꿈치까지만 옵니다. **우투리는 늘 다섯 살 아이 얼굴로**, 몸은 또래보다 단단하지만 어른이 아닙니다. 콩은 노랗고 팥은 붉게, 서 말 자루 두 개를 늘 같은 모양으로. 바위는 집채만 한 둥근 화강암, 이끼 낀 것. 용마는 흰 말에 등에 큰 날개, 물에서 솟구칩니다. 8장의 횃불 장면과 10장의 화살 장면은 긴장은 있되 피가 보이지 않게, 11장 용마의 울음은 이 책에서 가장 크고 슬픈 그림입니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, a poor mountain village
of thatched cottages, deep pine forests and granite boulders, rice-paddy
terraces below, earthy greens and browns with a single strong accent colour
per picture, expressive faces, gentle even in sad scenes, never gory.
Absolutely no text, no letters, no speech bubbles, no sound effects, no signage
anywhere in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Uturi: a sturdy five-year-old Korean boy in a plain hemp shirt and trousers,
round face, bright determined eyes, short black hair tied in a small knot; two
SMALL dove-sized feathered wings grow from under his armpits, reaching only to
his elbows. His mother: a thin woman in her forties in a worn white jeogori and
grey skirt, hair in a low bun, tired kind eyes. His father: a lean farmer with a
weathered face and a straw hat. The magistrate's soldiers: men in dark blue
tunics and black felt hats carrying long spears, one captain with a torch.
The bean sacks: two bulging hemp sacks, one leaking yellow soybeans, one red
adzuki beans. The boulder: a house-sized rounded grey granite rock furred with
moss. The dragon horse (yongma): a huge white horse with great white wings,
mane streaming with water.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A five-year-old Korean boy stands on top of a
huge mossy granite boulder against a stormy dawn sky, small feathered wings
spread from under his arms, looking down the mountain. Far below, a dark
pond reflects the sky, and a faint white horse shape stirs under its surface.
Pines cling to the slope. Brave and lonely.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-birth.webp` — 날개 달린 아기

```
Inside a dim thatched cottage at night, a lamp burning. On the right, a mother
kneels over a wooden tub bathing a newborn; she has frozen with her hands
lifted, staring at two tiny feathered wings under the baby's arms. On the left,
the father in the doorway with his straw hat in his hands, mouth open. The baby
is calm and looking up. Warm lamplight, deep shadows, wonder and fear together.
```

### `02-fly.webp` — 대들보 위에 앉은 아기

```
Wide view of a cottage room. High up on the left, a laughing baby sits on the
thick wooden roof beam under the thatch, small wings fluttering. Far below on
the right, his mother has sunk to the floor with a dropped bowl, looking up in
shock. Morning light through the paper door. Funny and unsettling at once.
```

### `03-law.webp` — 무서운 법

```
Evening in a village lane. On the left, an old neighbour in a straw hat leans
close to the father and mother, whispering with a finger to his lips. On the
right, farther down the lane, three villagers glance back over their shoulders
as they gossip. In a doorway between them, half hidden by the mother's skirt,
the small boy Uturi peers out. Long shadows, uneasy mood.
```

### `04-decide.webp` — 산으로 가겠어요

```
Inside the cottage at night. On the right, five-year-old Uturi sits very
straight and calm on the floor, hands on his knees, small wings folded. On the
left, his mother has pulled him half into her arms, face pressed to his hair,
eyes shut. Behind them in the dark, his father stands turned away, a hand over
his face. One oil lamp. Very quiet.
```

### `05-beans.webp` — 콩을 볶다가

```
A farmhouse kitchen. On the left, the mother stirs soybeans in a big iron
cauldron over a fire, steam and smoke rising; with her other hand she is
lifting one single bean to her mouth without noticing, her eyes wet. On the
right, in the yard doorway, Uturi already stands with two big hemp sacks on his
back, one yellow with soybeans, one red with adzuki, waiting. Golden firelight.
```

### `06-rock.webp` — 바위가 갈라지다

```
Deep in a pine forest. A house-sized mossy granite boulder has split open like
a door, showing a dark empty chamber inside. Small Uturi stands at the opening
with his palm still on the rock, his two sacks set down inside. Dust motes in
a shaft of light. The rest of the forest is dim and still. Mysterious.
```

### `07-soldiers.webp` — 바위 속의 소리

```
Split picture. On the right, the outside of the closed boulder in the forest,
with a deer and a hare shying away from it. On the left, a cutaway inside the
rock: rows of tiny soldiers in armour forming out of yellow beans, and small
red horses forming out of adzuki beans, all still and half-made, faint and
glowing. Uturi sits among them, eyes closed. Dreamlike.
```

### `08-torch.webp` — 횃불

```
The village yard at dusk. On the left, a soldier captain holds a burning torch
up close to the edge of a thatched roof, spearmen behind him. On the right, the
villagers crowd together; a neighbour woman clutches a screaming baby. In the
middle, apart from the others, Uturi's mother has dropped to her knees, one arm
half raised toward the mountain. Orange torchlight, tense but not violent.
```

### `09-open.webp` — 어머니 손으로

```
In front of the great boulder in the forest. The mother's thin hand is pressed
flat against the rock, and the rock is splitting open with light pouring out.
Inside, rows of armoured soldiers stand with eyes half shut, and at the front
Uturi sits on a small horse, turning his head to look at his mother with a
stunned face. Soldiers with spears crowd behind her on the right. Bright
against dark.
```

### `10-onebean.webp` — 빈 자리 하나

```
Close on the ranks inside the rock. A neat row of small bean-soldiers in armour
stands at attention — and at the very end of the row, one place is empty, just
a bare patch of stone. Uturi, on horseback on the left, looks at that empty
spot. From the right edge, the first arrows are flying in. The soldiers'
faces are still half asleep. Held breath.
```

### `11-horse.webp` — 용마의 울음

```
The biggest picture in the book. A dark mountain pond has burst open and a huge
white winged horse rears up out of the water, mane and wings streaming spray,
head thrown back in a cry. Above on the left, the great boulder on the slope
with a small figure lying still on top of it. Tiny soldiers and villagers
below have frozen. Grey sky, white water, one crimson sack spilling beans on
the rock. Grief and power.
```

### `12-pond.webp` — 용마못

```
Years later, calm. A quiet mountain pond ringed with reeds, evening mist. On
the left, an old woman in white sets a single yellow bean on top of the mossy
boulder, where a hoofprint-shaped hollow holds rainwater. On the right, two
village children stand at the pond's edge looking at the still water. Soft
light, peaceful, a little sad.
```

### `end.webp` — 마지막 (가로 4:3)

```
Very still. The surface of a dark mountain pond at dawn, mist lying on it.
Just under the water, faintly, the pale curve of a white horse's back and the
edge of a folded wing, as if sleeping. A single yellow bean floats on the
surface. Nobody there. Quiet waiting.
```
