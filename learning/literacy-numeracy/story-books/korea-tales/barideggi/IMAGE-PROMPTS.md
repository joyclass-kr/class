# 제미나이 그림 프롬프트 — 바리데기

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열여섯 개의 펼침** + 표지 + 마지막 장 = 그림 **열여덟 장**.


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
| 본문 그림 16장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**바리데기는 끝까지 무명옷입니다.** 궁에 돌아와도 비단을 입지 않습니다 — 그것이 이야기입니다. 1~4장 아기·아이, 5~8장 열다섯 살 처녀, 9~12장 길 위에서 점점 여위고 옷이 해지며, 11~12장 아홉 해 뒤에는 스물넷 어른(머리를 올려 묶음), 13~16장 그 모습 그대로. **접힌 종이 한 장**(이름 적힌 것)이 2·4·7장에 같은 모양으로 나옵니다. 저승은 무섭게 그리지 않습니다: 10장의 검은 강은 안개와 잿빛뿐, 죽은 이들은 얼굴이 희고 조용할 뿐입니다. 꽃 세 송이는 흰·분홍·붉은 작은 꽃으로 12·13·14장에서 같아야 합니다. 16장은 이 책에서 가장 넓고 고요한 그림입니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, an old kingdom with a
tiled palace, a wide river, thatched riverside huts, then far western lands of
mist and stone; muted blues and greys for the journey, warm ochre for home,
one bright accent per picture; expressive faces, solemn but never frightening.
Absolutely no text, no letters, no speech bubbles, no sound effects, no signage
anywhere in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Baridegi: as a baby, a round-faced infant in white swaddling in a jade box; as
a girl and young woman, always in plain undyed hemp clothes with a dark blue
sash, long black hair in a single braid (later tied up), steady calm eyes, a
small folded paper kept at her chest. The old ferry couple: a bent old man with
a long pole and a straw hat, a small old woman in grey with a warm wrinkled
face. The king: a heavy older man in a red robe and gold crown, stern, later
ill and grey. The queen: gentle, in green silk, often weeping. The six elder
sisters: young women in bright coloured silks, always in a row, faces turned
away. The keeper of the water (Mujangseung): a giant nine feet tall with a
wild black beard, bare arms, a plain brown robe, not evil, just stern. The
three flowers: one white, one pink, one red, small, on short green stems. The
black river: still dark water under thick white mist, grey people standing on
the bank. The jade box: a small pale-green stone chest.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A young woman in plain hemp clothes with a
single braid walks away from the viewer along a narrow path into thick white
mist, a small clay water bottle at her hip and three tiny flowers held to her
chest. Behind her at the bottom of the frame, far away and small, a tiled
palace gate in warm light. Everything ahead is grey mist. Brave and lonely.
```

## 본문 열여섯 장 (모두 가로 16:9)

### `01-palace.webp` — 일곱째도 딸

```
A palace bedchamber. On the right, the queen in green silk sits up in bed
holding a newborn, tears on her face. On the left, the king in a red robe
stands with his back half turned, fist clenched, face hard. Between them, six
little girls of different ages peek from behind a screen. Warm lamplight,
cold mood.
```

### `02-box.webp` — 옥함

```
A river bank at dawn. On the left, the queen kneels at the water's edge, one
hand still touching the lid of a small pale-green jade chest that has begun
to float away; a folded paper and a tiny white garment show inside. On the
right, a servant in grey stands with his head bowed. The river wide and
silver, mist on the far bank. Very quiet.
```

### `03-oldcouple.webp` — 강에서 건진 아기

```
A riverside hut and a ferry boat pulled up on the mud. In the centre, an old
man in a straw hat has lifted a pale-green jade chest from the water and
opened it; a baby inside looks up at him. An old woman hurries down from
the hut on the right, arms out. Morning light, reeds, a heron. Tender.
```

### `04-grow.webp` — 강가에서 자라다

```
Inside the riverside hut at night. A girl of about ten in plain hemp sits by
a lamp holding a small folded paper open on her knees, reading it with a
still face. The old woman beside her holds the empty jade chest. On the left,
through the doorway, the old man mends a net by the moonlit river. Warm and
quiet.
```

### `05-illness.webp` — 여섯 언니

```
The palace hall. On the right, the king and queen lie ill on two low beds,
pale. In the centre, an old fortune-teller with a white beard gestures toward
the west. On the left, six young women in bright silks stand in a row, each
turned slightly away, hands raised in excuse — one pointing at a baby on her
hip, one at her own fine dress. Cool grey light.
```

### `06-remember.webp` — 강가 마을에서

```
The riverside hut in bright afternoon. On the left, a royal messenger in
blue with a tall hat stands at the gate holding the reins of a horse,
astonished. On the right, a girl of fifteen in plain hemp stands in the yard
with a ferry pole in her hands, looking at him calmly. The old couple watch
from the doorway. The river glitters behind.
```

### `07-reunion.webp` — 다시 만난 부모

```
The palace bedchamber. The queen, thin and grey, has reached up from her bed
to touch the face of a girl in plain hemp who kneels beside her; the girl
holds out a small folded paper. On the left, the king in bed has turned his
face to the wall. Soft lamplight on the two women, shadow on the king.
```

### `08-depart.webp` — 서쪽으로

```
The palace gate at sunrise. On the right, the girl in hemp walks out through
the great gate with a small bundle on her back and straw sandals tied to it,
a small silver knife at her sash. On the left, behind the gate wall, six
sisters in silk watch from the top of the wall without moving. The road ahead
runs west into low golden hills.
```

### `09-helpers.webp` — 밭과 빨래

```
Split picture. On the left, the girl hoes a long vegetable field beside a
bent old farmer, both sweating in the sun. On the right, at a stream, she
treads laundry in a wooden tub while an old washerwoman points up toward a
grey mountain pass. Her clothes are already a little worn. Warm light on the
left, cooler grey toward the right.
```

### `10-river.webp` — 검은 강

```
A wide black river under thick white mist. On the near bank on the left, a
line of grey, pale-faced people stand silently, an old woman at the front
pointing at a small wooden boat. The girl in worn hemp steps into the boat
alone. The far bank is invisible in mist. Cool, still, sad but not
frightening — no monsters.
```

### `11-keeper.webp` — 아홉 해

```
A stony highland with a great stone well. On the right, a giant nine feet
tall with a wild black beard stands with his arms folded, stern. On the left,
shown as three small vignettes fading into one another across the picture:
the young woman carrying firewood on a frame, tending a roaring fire,
hauling water buckets on a yoke — growing thinner and older in each. Grey
light, her hair now tied up.
```

### `12-flowers.webp` — 약수와 꽃 세 송이

```
At the stone well. The giant, softer now, holds out three small flowers —
white, pink, red — on his huge palm. The young woman, in her twenties, thin,
kneels with a clay bottle she has just filled from the well, looking up at
the flowers with wide eyes. A single shaft of light on the flowers. Hushed.
```

### `13-funeral.webp` — 상여 앞에서

```
The palace gate. Two white funeral biers with paper flowers are being carried
out through the gate by mourners in white. In front of them on the road, the
young woman in worn hemp has thrown herself down with both arms spread to
block the way, three small flowers in one fist. On the left, six women in
white mourning robes gape. Grey morning.
```

### `14-revive.webp` — 꽃 세 송이

```
Close and warm. The king and queen lie side by side on white cloth; on each
chest rests a tiny flower, and the queen's eyes are just opening while the
king draws a great breath, colour returning to their faces. The young woman
bends over them tipping a clay bottle to the king's lips. Mourners behind
have dropped to their knees. Golden light breaking in.
```

### `15-wish.webp` — 나라의 반보다

```
The palace hall. The king, healthy again, kneels on the floor before his
daughter with his crown in his hands, offering it. The young woman in plain
hemp stands with her hands folded, shaking her head gently, looking past him
toward the open door on the left where mist and a grey road can be seen.
The queen weeps beside the king. Warm hall, grey door.
```

### `16-guide.webp` — 죽은 이의 길잡이

```
The widest, quietest picture. The black river in soft mist, a small boat in
the middle. The young woman stands in the boat holding a lantern that glows
warm gold, reaching out her free hand to help a grey old man step aboard
from the bank; behind him a line of pale people wait calmly. On the far bank,
faintly, a warm light. Peace, not fear.
```

### `end.webp` — 마지막 (가로 4:3)

```
Very still. On a river bank at dusk, an empty small boat tied to a stake, and
resting on its seat a lit paper lantern and three small flowers — white,
pink, red. Mist on the water. Nobody there. Calm and kind.
```
