# 제미나이 그림 프롬프트 — 그늘을 산 사람

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

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

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking down from above onto a Korean village at
midday. A huge round tree canopy fills the upper part of the frame, and its dark
shadow falls across the lower part - spilling over a wall and covering most of a
tiled-roof house's courtyard. In the middle of that shadow, one small figure lies
comfortably on a mat. Blazing white sunlight everywhere the shadow is not.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-tree.png` — 마을 어귀의 아름드리 느티나무

```
Wide village scene at midday. In the centre, an enormous ancient zelkova tree
with a broad flat canopy stands at the village entrance, its dark shadow pooled
neatly on the dirt road at its foot. On the right, just beyond the shadow, a
prosperous tiled-roof house behind an earthen wall. Blazing sun, sharp shadow
edges, cicada heat.
```

### `02-rest.png` — 그늘에 짐을 내려놓은 나그네

```
Wide scene at the foot of the tree. In the centre of the tree's shadow on the
road, the traveller lies back on his bundle with one knee up, fanning himself,
eyes closed in bliss. Everything outside the shadow is bleached white with sun.
Cicadas suggested on the trunk. Deliciously cool inside a very hot picture.
```

### `03-scold.png` — 대문을 박차고 나온 부자

```
Wide scene at the tree and the house gate. On the right, the rich man storms out
through his gate with one arm flung up, face scarlet, mouth wide open shouting.
On the left, the traveller is propping himself up on one elbow in the shade,
eyebrows raised but calm. The shadow's edge lies clearly between them on the
ground. Comic confrontation.
```

### `04-buy.png` — 엽전 꾸러미를 꺼내며

```
Wide scene at the tree. In the centre, the traveller stands and holds out a
string of copper coins on his open palm, smiling pleasantly. On the right, the
rich man has stopped mid-shout with his mouth still open, eyes now fixed on the
coins, one hand already half raised. Behind them, the shadow lies on the road.
Beautifully absurd.
```

### `05-deal.png` — 흐뭇하게 돌아서는 부자

```
Wide scene. On the right, the rich man walks back toward his gate counting coins
into his palm, shoulders shaking with a private chuckle, thoroughly pleased with
himself. On the left, the traveller stands in the shade with his fan folded,
watching him go with a mild unreadable smile. The shadow has already shifted a
little toward the wall. Warm and ominous.
```

### `06-move.png` — 담을 넘어간 그늘

```
Wide scene later in the afternoon, sun visibly lower on the right. The tree's
shadow has swung across the road, climbed the earthen wall and spilled over into
the courtyard beyond, its edge now well inside the property. Nobody is in the
frame except a cat blinking at the edge of the shade. The whole picture is about
the shadow moving.
```

### `07-enter.png` — 마당에 멍석을 펴는 나그네

```
Wide scene in the rich man's courtyard. In the centre, the traveller calmly
unrolls a straw mat in the middle of the shaded part of the yard and sits down
cross-legged, fan in hand. On the right, the rich man stands frozen on his own
verandah with both arms out, mouth open, face purple. Strong shadow edge cutting
across the swept earth. Perfect comic timing.
```

### `08-friends.png` — 사람들을 데려온 이튿날

```
Wide scene in the courtyard. A dozen villagers of all ages sit around on mats in
the tree's shadow, fanning, chatting, sharing a bowl of chilled noodles, one man
napping with his hat over his face. Children play at the shadow's edge, careful
not to step out of it. On the far right, the rich man peers out from a
paper-screened window, seething. Warm, sociable, hilarious.
```

### `09-porch.png` — 대청마루까지 닿은 그늘

```
Wide scene of the house verandah in late afternoon. The tree's shadow now reaches
right up onto the wooden verandah floor. Villagers sit along the edge of it with
their feet dangling, one asleep against a pillar. On the very end of the
verandah, squeezed into the last sunlit corner of his own house, the rich man
sits stiffly with his knees together. Deliciously awkward.
```

### `10-beg.png` — 나그네를 찾아온 부자

```
Wide scene in the courtyard at evening. On the left, the rich man stands with his
hat in his hands and his shoulders slumped, holding out a doubled string of coins,
head slightly bowed - all the bluster gone. On the right, the traveller sits on
the mat looking up at him, silent and thoughtful. The shadow is long and soft
now. Quiet turning point.
```

### `11-return.png` — 그늘은 마을 사람 모두의 것

```
Wide scene in the courtyard. In the centre, the traveller stands and gestures
outward with one open hand toward the gate and the village beyond, speaking
plainly. On the left, the rich man stares at him with his mouth slightly open,
the coins forgotten in his hand, face turning red for a completely different
reason. Warm gold evening light. Generous and unexpected.
```

### `12-village.png` — 이듬해 여름의 느티나무 아래

```
Wide scene under the great tree the following summer. Straw mats are spread
across the shade and the whole village sits on them - grandmothers, children, a
man with a drum. On one edge of the mat, the rich man sits in plain clothes
fanning himself, chatting with a neighbour, entirely at ease. The tree's shadow
covers everyone equally. Warm, green, generous.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet village entrance at sunset, no people. The great zelkova stands alone
with a rolled straw mat leaning against its trunk, its long shadow stretching
across the empty road and over a low earthen wall. Warm orange light, cicadas
finished for the day. Peaceful and shared.
```
