# 제미나이 그림 프롬프트 — 이야기 주머니

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

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

## 본문  장 (모두 가로 2:1)

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

### `end.webp` — 마지막 (가로 2:1)

```
A quiet Korean room in the afternoon, no people. An empty cloth pouch hangs
loose and flat from its nail, drawstring untied, and a warm shaft of sunlight
falls through the open paper door onto the floor where children's cushions lie
scattered. Peaceful and generous.
```
