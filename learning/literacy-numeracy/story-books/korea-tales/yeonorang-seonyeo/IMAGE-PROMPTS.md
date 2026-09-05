# 제미나이 그림 프롬프트 — 연오랑 세오녀

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
| 본문 그림 10장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**빛이 이 책의 주인공입니다.** 1~5장은 햇살이 가득하고, 6장(신라의 어둠)만 한낮인데 잿빛으로 어둑하게, 8장에서 빛이 터지듯 돌아옵니다. 그 대비가 이야기입니다. **바위는 늘 같은 바위** — 미역이 붙은 평평한 검은 갯바위, 어른 둘이 앉을 만한 크기, 물 위에 떠 갈 때도 그 모양 그대로. 세오녀의 비단은 옅은 하늘빛에 은실이 비치는 것으로, 7·8·9장에서 같은 빛깔이어야 합니다. 신라 바닷가와 바다 건너 섬은 옷차림으로 구별합니다 — 신라 쪽은 흰 삼베, 섬 쪽은 붉고 검은 무늬옷.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, an ancient East-coast
fishing shore with black rocks, kelp, pine-topped headlands and a wide open
sea, generous sunlight, simple ancient clothing (hemp and rough silk, no
Joseon-era hats), expressive gentle faces, calm and luminous. Absolutely no
text, no letters, no speech bubbles, no sound effects, no signage anywhere in
the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Yeono-rang: a sturdy young fisherman with sun-browned skin, hair tied in a
topknot with a cloth band, plain white hemp shirt and trousers rolled to the
knee, a kelp basket on his back, warm open face. Seo-nyeo: a young woman with
long black hair in a low knot, white hemp jeogori and a faded indigo skirt,
calm steady eyes, often with a shuttle or a bolt of pale sky-blue silk in her
hands. The rock: a flat black tidal boulder about two people wide, fringed
with wet kelp, the same in every picture. The islanders: people in red-and-
black patterned robes with different headbands, curious and respectful. The
Silla king: an older man in a simple gold-trimmed robe and a modest crown.
The envoy: a thin nervous official in a grey robe. The silk: a single bolt of
pale sky-blue silk with a faint silver shimmer.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A flat black kelp-fringed rock floats far out
on a golden sea at sunrise, and a young couple stand on it side by side, the
man shading his eyes toward the horizon, the woman holding a bolt of pale
blue silk that streams in the wind. The huge rising sun fills the top half of
the frame. Radiant, hopeful.
```

## 본문 열 장 (모두 가로 16:9)

### `01-couple.webp` — 바닷가의 부부

```
Wide bright morning shore. On the left, a small thatched hut by the pines
where a young woman sits at a loom in the open doorway, pale blue silk on
the frame. On the right, her husband walks down to the black rocks with a
kelp basket on his back, turning to wave. Calm sea, long light, gulls.
```

### `02-rock.webp` — 떠오른 바위

```
The flat black kelp rock has lifted off the shore and is gliding out across
the water like a raft. The fisherman lies flat on it gripping the edge, his
basket sliding, looking back in alarm. On the far left, the shore and the hut
are already small. Sunlit sea, a wake behind the rock. Startling but not
frightening.
```

### `03-island.webp` — 낯선 섬의 사람들

```
A foreign shore at dawn: dark volcanic sand, unfamiliar trees. The kelp rock
rests at the water's edge with the fisherman standing on it, bewildered.
Across the picture, a crowd of islanders in red-and-black patterned robes has
dropped to their knees, some pointing at the rock, one elder bowing low.
Golden light behind the fisherman.
```

### `04-search.webp` — 짚신 한 짝

```
The Silla shore, late afternoon. On the left, the young woman walks the
rocks with her skirt hitched up, feet bare and sore, searching. On the right
in the foreground, the flat black kelp rock, and on it one worn straw sandal.
Long shadows, worried mood, the sea very still.
```

### `05-follow.webp` — 다시 만나다

```
The island shore. The kelp rock has just landed, the young woman still
standing on it holding a straw sandal to her chest. From the right, her
husband in a fine robe runs barefoot down the beach toward her with his arms
open, a crown slipping in his hand. Islanders watch in wonder. Bright joyful
light.
```

### `06-dark.webp` — 빛을 잃은 신라

```
A Silla village at midday, but the light is grey and dim as dusk: the sun is
a pale disc with no glow, colours drained. Villagers stand in the fields
looking up, a farmer holding limp grain, a rooster silent on a fence. On the
right, the king on a palace terrace with an old astronomer pointing at the
faint sun. Cold, muted, uneasy.
```

### `07-envoy.webp` — 사신과 비단

```
The island palace hall. On the left, a thin envoy in a grey robe kneels with
his forehead to the floor. In the centre, the fisherman-king sits on a low
throne, troubled, hand on his chin. On the right, the queen steps forward
holding out a folded bolt of pale sky-blue silk that catches the light. Warm
lamplight, expectant.
```

### `08-silk.webp` — 빛이 돌아오다

```
A grassy headland above the Silla sea. A stone altar with the pale blue silk
spread over it; the king bows low before it, courtiers behind. The whole sky
is bursting back into light — a great warm sun breaking through grey cloud,
rays across the water, people on the slope lifting their faces and beginning
to dance. Triumphant, luminous.
```

### `09-names.webp` — 귀비고와 영일

```
Split picture. On the left, inside a wooden treasury, the bolt of blue silk
laid on a lacquered stand under a guard's watch, warm lamp. On the right,
across the sea, the island palace garden where the queen weaves at a loom in
the sun and the king stands beside her looking west over the water. Two lands
joined by the same blue silk colour.
```

### `10-sunrise.webp` — 영일만의 해돋이

```
Present-day feeling but timeless: a wide bay at dawn, crowds of people in
warm clothes gathered on a long beach, children on shoulders, everyone facing
the sea. The sun is just lifting out of the water, a path of gold across the
waves to the shore. An old man crouches beside a child, pointing at the sun.
Peaceful, communal, glowing.
```

### `end.webp` — 마지막 (가로 4:3)

```
Very calm. An empty black kelp rock at the water's edge at first light, wet
and shining, a few gulls nearby. Draped over one corner of the rock, a
single thread of pale blue silk trailing into the water. Nobody there. Quiet
morning.
```
