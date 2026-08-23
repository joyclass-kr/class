# 제미나이 그림 프롬프트 — 푸른 구슬

그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 이 책만의 요령

**9번과 10번 장면이 이 책의 얼굴입니다.** 고양이가 쥐들의 왕 목덜미를 붙잡고 으르는 대목이에요. 크게, 가깝게, 두 얼굴이 화면을 꽉 채우게 그려 주세요 — 고양이는 느긋하게 웃고 있고, 왕관 쓴 쥐는 발버둥 치며 사색이 되어 있어야 합니다. 무섭게가 아니라 **웃기게**요. 쥐들의 왕에게는 반드시 작은 금 왕관을 씌워 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, in the look of an early-1990s Korean television
cartoon. Setting is a Joseon-era riverside village: a poor thatched cottage that
later becomes a tiled-roof house, a wide slow river with a sandy bank, and a
greedy old woman's dim cluttered room with a heavy wooden chest. Warm amber
indoors, blue-green river light, deep indigo for the night raid. Big expressive
animal faces, comic staging. Nothing gory - the rats are never harmed. No text or
letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The old man: a thin kindly fisherman with a white beard and a worn straw hat.
The old woman: his wife, small and round-faced in a faded hanbok. The dog: a
sturdy yellow-brown Korean dog with a curled tail, earnest and a bit slow, always
the one carrying or asking. The cat: a lean grey tabby with sharp green eyes and
a permanently half-amused expression - the clever one. The greedy old woman: a
gaunt woman in dark clothes with a sharp chin and darting eyes. The rat king: a
plump dark rat wearing a tiny gold crown, pompous when safe and utterly pathetic
when caught. The bead: a smooth glowing blue-green sphere the size of a plum,
identical in every picture.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A dim room at night. Filling the upper half of
the tall frame, a grey cat's face in close-up, eyes narrowed and mouth curved in
a lazy smile. In its raised front paw, held up by the scruff, dangles a plump
dark rat wearing a tiny gold crown, all four legs flailing, face frozen in panic.
Below them, a heavy wooden chest with a big iron lock. Funny and iconic.
```

## 본문 열네 장 (모두 가로 16:9)

### `01-carp.png` — 그물에 걸린 커다란 잉어

```
Wide riverside scene at sunset. On the left, the old fisherman kneels on the
sandy bank hauling in a net, and in it a single large golden carp thrashes. On
the right, the wide slow river and low hills catching the last orange light. His
empty basket sits beside him. Warm and quiet, a hard day ending.
```

### `02-release.png` — 눈물을 흘린 잉어를 놓아 주다

```
Wide riverside scene. In the centre, the old man holds the big carp in both arms
at the water's edge, and the fish looks up at him with one large eye brimming, a
single tear catching the light. The man's face is torn. The net lies open and
empty behind him. Soft violet dusk. Tender.
```

### `03-prince.png` — 푸른 구슬을 건넨 젊은이

```
Wide scene at the cottage door at night. On the right, a young man in fine
blue-green robes stands with a faint watery shimmer around him, holding out a
glowing blue-green bead on his open palm. On the left, the old couple stand in
the doorway in their nightclothes, mouths open, lamplight behind them. Deep
indigo night, magical glow.
```

### `04-rich.png` — 낡은 집이 기와집으로

```
Wide scene of the house by day, split as before and after. On the left, the old
thatched cottage in outline; on the right and larger, the same spot now a fine
tiled-roof house with full storehouses. In the yard, the old couple laugh
together while the dog rolls on his back and the cat sits fat and blinking on a
full rice sack. Bright and joyful.
```

### `05-steal.png` — 구슬을 들고 강을 건너는 할멈

```
Wide river scene at dusk. On the right, a gaunt woman in dark clothes sits in a
small ferry boat clutching something to her chest, glancing back over her
shoulder with a sly grin. On the left, far behind on the bank, the old couple
stand very small, one with a hand raised. Cold blue water between them. A theft
already done.
```

### `06-decide.png` — 마주 앉은 개와 고양이

```
Wide scene in a bare moonlit yard, the house behind them poor again. In the
centre, the dog and the cat sit facing each other close, ears forward, both
serious. Around them, the yard is empty and the storehouse door hangs open. Cool
blue night, one small resolve in a big empty frame.
```

### `07-swim.png` — 개 등에 탄 고양이

```
Wide river scene at night. In the middle of the frame, the dog swims steadily
with his head high and water streaming off his muzzle, and flattened along his
back rides the cat, paws gripping fur, tail straight up, expression of pure
dignity under great strain. Moonlight on the ripples. Funny and heroic.
```

### `08-chest.png` — 자물쇠가 채워진 궤짝

```
Wide interior of a dim cluttered room. In the centre, a heavy wooden chest with
a big iron lock. On the left, the cat claws uselessly at the lid; on the right,
the dog bites at the lock with his eyes screwed shut. Neither is working. In the
background, the greedy old woman sleeps under a quilt. Amber lamp stub, tense and
comic.
```

### `09-ratking.png` — 쥐구멍 앞에 엎드린 고양이

```
Wide interior scene, low viewpoint at floor level. On the right, a small hole at
the base of the wall, and a plump rat in a tiny gold crown has just poked his head
and shoulders out, whiskers up, entirely unsuspecting. On the left, stretched
flat along the floor in shadow, the cat waits with only its green eyes and one
raised paw catching the light. Perfect held breath.
```

### `10-threat.png` — 목덜미를 잡고 으르는 고양이

```
Wide interior scene, the big one. Two faces fill the frame in close-up. On the
right, the cat's face, eyes half closed, mouth curved in a slow smile, one paw
raised. Dangling from that paw on the left, held by the scruff, the rat king
kicks all four legs in the air, crown sliding sideways, face a mask of terror,
tiny hands clasped in pleading. Claws visible but nothing harmed. Hilarious.
```

### `11-gnaw.png` — 궤짝을 갉아 내는 쥐들

```
Wide interior scene. Dozens of rats swarm over and around the wooden chest,
gnawing at one corner in a frenzy of tiny motion lines, wood shavings flying. The
rat king stands on top directing with one imperious arm, crown straightened,
recovering his dignity now that he is not being held. On the right, the cat sits
watching with the dog, tail curled neatly. Busy and funny.
```

### `12-drop.png` — 퐁당

```
Wide river scene at dawn. In the centre, the dog swims with the cat on his back,
head turned back over his shoulder mid-question, mouth open. The cat has just
opened its mouth to answer - and the blue-green bead is falling from between its
teeth toward the water, a small splash already starting below. Both animals'
eyes are enormous. Frozen disaster, very funny.
```

### `13-fish.png` — 모래밭의 죽은 물고기

```
Wide riverside scene in late afternoon. On the sandy bank in the centre, a
washed-up fish, and the cat crouched over it mid-bite, one paw on the fish, whole
body suddenly gone rigid, eyes wide, ears up - having just bitten something hard.
Long orange light, empty shore, gulls. The moment luck turns.
```

### `14-home.png` — 방 안으로 들어간 고양이

```
Wide scene at the cottage in warm evening light. On the right, inside the open
door, the cat sits on the warm floor beside the old couple, the blue-green bead
glowing on a cloth in front of them, everyone delighted. On the left, outside in
the yard, the dog lies with his chin on his paws looking in through the door,
ears down. Warm gold inside, cooler blue outside. Funny and a little sad.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet riverside cottage at dusk, no people. Warm lamplight from an open
door falls across the yard, where a dog-shaped dent remains in the straw. Just
inside the doorway, a cat's tail disappears around the frame. The wide slow river
beyond catches the last light. Warm and wry.
```
