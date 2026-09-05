# 제미나이 그림 프롬프트 — 서동과 선화공주

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

**마와 금을 같은 자리에 두세요.** 마는 흙 묻은 길쭉한 갈색 뿌리이고, 6장에서 그 마 뿌리 사이에 누런 금덩이가 박혀 있어야 이야기가 됩니다. 서동은 열대여섯 살 소년, 공주는 열대여섯 살 소녀 — 둘 다 어른으로 그리지 않습니다. 신라(서라벌)와 백제는 옷 빛깔로 나눕니다: 신라 쪽은 흰 옷에 푸른 띠, 백제 쪽은 누런 흙빛 옷. 3장 노래 장면은 아이들이 주인공이고, 7장 금이 하늘을 나는 장면은 이 책에서 가장 화려한 그림입니다. 9장 미륵사 탑은 실제 익산 미륵사지 석탑처럼 네모난 돌을 층층이 쌓은 모양으로.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, an ancient kingdom
setting (Baekje and Silla, 7th century) with thatched huts, tiled palaces,
lotus ponds and low green hills, simple period clothing, expressive lively
faces, playful and bright. Absolutely no text, no letters, no speech bubbles,
no sound effects, no signage anywhere in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Seodong: a barefoot boy of about fifteen in a patched ochre hemp shirt, a
bamboo basket of muddy yams (long brown roots) on his back, quick clever eyes
and a wide grin. Princess Seonhwa: a girl of about fifteen in a white silk
jeogori with a pale blue sash, long black hair with a small jade hairpin,
bright and a little stubborn. Seodong's mother: a thin woman in grey hemp with
a kind tired face. The Silla king: a stern older man in a red-and-gold robe
and a tall crown. The Silla queen: gentle, in green silk. Monk Jimyeong: a
very old monk in a grey robe with a long white beard and a wooden staff. The
Silla children: a dozen barefoot kids in simple white clothes. The gold: fat
lumps of yellow ore, dull and earthy, not shiny coins. Mireuksa pagoda: a
square stone pagoda of stacked grey blocks, many tiers.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A barefoot boy with a basket of muddy yams on
his back stands on a green hill and sings, one hand cupped by his mouth; the
notes are shown only as small floating birds, no musical symbols. Far below,
the tiled roofs of a royal city, and at the palace gate a small girl in white
silk looking up toward the hill. Warm evening sky. No text anywhere.
```

## 본문 열 장 (모두 가로 16:9)

### `01-ma.webp` — 마 캐는 아이

```
A wide hillside above a lotus pond. On the left, a barefoot boy of fifteen
digs a long brown yam root out of red earth with a wooden spade, grinning,
basket half full beside him. On the right, down at the pond's edge, a small
thatched hut where a thin woman in grey hangs washing. Bright morning light,
dragonflies over the water.
```

### `02-rumor.webp` — 신라 공주 소문

```
A busy market lane. On the left, two old men in straw hats squat over a mat
of vegetables, gossiping with wide gestures. In the centre, the yam boy has
set down his basket and stands very still, listening, eyes far away. On the
right, behind him, a small painted screen at a stall shows a faint image of
a princess in white — the thing being talked about. Lively crowd, warm dust.
```

### `03-song.webp` — 골목에서 부른 노래

```
A narrow alley in the Silla capital, tiled walls and a stone gate. A dozen
barefoot children sit and stand around the yam boy, each holding a muddy yam
and chewing; the boy in the middle sings with his arms wide, the children
singing back with open mouths. A few adults peek from doorways. Sunny, noisy,
joyful. No visible letters or musical notes anywhere.
```

### `04-banish.webp` — 궁에서 쫓겨나다

```
The Silla palace hall. On the left, the king on his throne has just slammed
his fist on the armrest, face red; courtiers bow low. In the centre, the
princess in white stands with her hands clasped, tears on her cheeks, chin
up. On the right, half hidden by a pillar, the queen presses a small cloth
bag of gold into the princess's hand. Tall lacquered columns, cold light.
```

### `05-meet.webp` — 산길에서

```
A mountain path among pines. On the right, the princess walks alone with a
small bundle, looking back over her shoulder. On the left, a few steps
behind, the yam boy has dropped to one knee with his basket beside him, one
hand on his chest, confessing. Between them a shaft of sunlight through the
trees. She is starting to laugh despite herself.
```

### `06-gold.webp` — 흙처럼 쌓인 금

```
The same yam hillside as picture 1, but now the red earth is cut open and
between the long brown yam roots lie fat lumps of dull yellow gold, dozens
of them, half buried. The princess has sunk to her knees with both hands
over her mouth. The boy stands beside her scratching his head, holding one
lump as if it were a stone. Bright noon.
```

### `07-monk.webp` — 하늘을 나는 금

```
Night. On the left, a very old monk with a long white beard stands with his
eyes closed and his staff raised beside a great heap of gold lumps. The gold
is lifting off the ground in a long glittering stream that arcs up into the
starry sky and away over distant hills toward the right edge. The boy and the
princess watch with their hands clasped. Magical, the most spectacular
picture in the book.
```

### `08-king.webp` — 뉘우친 임금

```
The Silla palace courtyard at dawn, heaped with gold lumps. The king,
barefoot and in his night robe, stands in the middle of the heap holding a
small folded letter, his face soft with regret. Courtiers and guards crowd
the edges, astonished. The queen on the steps behind him presses her hands
together. Pale gold morning light.
```

### `09-temple.webp` — 못에서 솟은 부처님

```
A lotus pond at sunset. From the middle of the water, three serene stone
Buddha figures rise gently above the surface, glowing softly. On the bank
on the left, the now grown Seodong in a king's ochre robe and the princess
in green kneel together in awe. On the right, faint in the distance, the
square tiered stone pagoda of the future temple as a pale vision. Reverent.
```

### `10-song.webp` — 지금도 부르는 노래

```
Present-day feeling but timeless: the great square stone pagoda of Mireuksa
stands tall in a wide grassy field under a blue sky. In the foreground, a
grandmother and a small child walk hand in hand toward it; the child is
singing, mouth open, one hand raised. A few pigeons rise from the stones.
Peaceful, open, sunny. No text anywhere.
```

### `end.webp` — 마지막 (가로 4:3)

```
Very calm. Close on a patch of red earth on a hillside: one long muddy yam
root lying beside one small lump of dull yellow gold, side by side in the
grass. Nobody there. Soft afternoon light, a single dragonfly. Quiet joke.
```
