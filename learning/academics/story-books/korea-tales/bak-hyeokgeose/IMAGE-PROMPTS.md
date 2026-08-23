# 제미나이 그림 프롬프트 — 박혁거세

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


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

**환하고 상서로운 이야기**예요. 무섭거나 어두운 장면이 하나도 없습니다. 빛을 아끼지 마세요.

- **나정 우물이 이 책의 시작점입니다.** 3번과 4번에 같은 우물이 나와야 해요. 돌을 둥글게 쌓아 올린 낮은 우물에, 곁에 오래된 나무 한 그루가 서 있습니다.
- **흰말은 진짜 말로.** 날개를 달지 말고, 갈기와 꼬리가 빛을 뿜는 새하얀 말로 그려 주세요.
- **8번의 계룡을 무섭게 그리지 마세요.** 몸은 용인데 머리가 닭인 짐승이에요. 볏과 부리는 또렷하되 눈매는 순하게, 비늘은 무지갯빛으로요.
- **9번은 조심스럽게.** 아기 얼굴에서 부리가 떨어지는 장면인데, 아프거나 징그럽지 않게 그려야 합니다. 물에 잠긴 얼굴에서 부리가 살짝 벗겨져 나뭇잎처럼 떠내려가는 모습으로요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, luminous cel-animation style with clean
outlines and vivid colors, in the look of a classic Korean animated film about
myth. Setting is the Gyeongju basin in the far past: six thatched villages
scattered across a wide green plain ringed by low mountains, a grove with an old
stone-ringed well, a clear stream, mulberry trees and barley fields. Bright
daylight, fresh greens, gold and rose light, rainbow shimmer around anything
miraculous. Wide open compositions. Serene and joyful, never dark. No text or
letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The six village chiefs: six older men in undyed hemp robes with different beards
and hats, always drawn as the same recognisable six - one very tall, one very
round, one with a white beard to his chest, one bald, one with a walking stick,
one much younger than the others. Hyeokgeose: first a newborn with a faintly
glowing brow, then a bright-eyed boy of thirteen in a simple white robe with a
red sash, black hair in a topknot, an open confident face; never draw him in
heavy royal robes. Aryeong: first a baby, then a calm clear-faced girl in pale
green with her hair in a long braid, often holding mulberry leaves. The white
horse: a real horse, brilliant white, mane and tail trailing light. The
chicken-dragon: a serpentine rainbow-scaled dragon body with a rooster's head,
red comb and beak, gentle eyes - strange but never scary.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A grove at dawn. In the lower half of the tall
frame, a low round stone well with an old tree beside it, and on the ground before
it a single large egg glowing deep red. From the egg, a broad beam of warm light
rises straight up through the branches and fills the whole upper half of the
frame, spreading into the sky. A brilliant white horse is just lifting off the
ground at the edge of the light. Radiant and still.
```

## 본문 열네 장 (모두 가로 16:9)

### `01-six.png` — 우리를 묶을 임금이 있어야 합니다

```
Wide scene on a grassy hilltop above a broad green plain. In the centre, the six
village chiefs sit in a rough circle on the grass, deep in argument - one with his
palms up, one shaking his head, one stroking his long white beard. Below and
around them, six small thatched villages are scattered across the plain. Bright
morning light, wide sky.
```

### `02-light.png` — 저것 좀 보시오!

```
Wide scene on the same hilltop. On the left, all six chiefs are on their feet,
one pointing south with his whole arm, the others shading their eyes, robes
whipping. On the right, far across the plain above a dark grove, a broad column of
warm light rises from the ground into the sky and spreads out at the top. Awe and
motion.
```

### `03-horse.png` — 무릎 꿇고 우는 흰말

```
Wide scene in a quiet grove. In the centre, beside a low round stone well and an
old tree, a brilliant white horse kneels on its front knees with its head thrown
back, mane and tail trailing streams of light, mouth open in a long cry. On the
right, the six chiefs come running in through the trees and stop dead. Green
shade, one blazing white shape.
```

### `04-egg.png` — 그 자리에 남은 붉은 알

```
Wide scene in the grove. In the upper left, the white horse is streaking up into
the sky and vanishing into the light. In the centre, on the ground beside the
well, sits a single large deep red egg, smooth and glowing softly. Around it, the
six chiefs kneel in a ring, faces lit red from below, hands half raised. Hushed
and enormous.
```

### `05-boy.png` — 쩌억, 갈라진 알

```
Wide scene in the grove. In the centre, the red egg has split open in a starburst
of golden light, and a newborn baby sits up inside it with his eyes wide open,
looking calmly around, not crying at all. All six chiefs have thrown themselves
flat on the ground around him, foreheads to the earth. Light pouring upward.
Joyful shock.
```

### `06-bath.png` — 씻길수록 빛이 나는 아이

```
Wide scene at a clear stream. In the centre, an old chief holds the baby in the
shallow water and washes him while the baby laughs, light spilling out from the
child across the surface of the stream. All along the banks, birds land in rows
and deer and rabbits come out of the trees to look. Sunlight through leaves.
Wondrous and warm.
```

### `07-name.png` — 꼭 박처럼 생기지 않았소

```
Wide scene in the grove. On the left, a chief holds up the two halves of the
broken red shell, one in each hand, turning them to show their round gourd-like
shape, mouth open in explanation. On the right, another chief holds the baby, and
the rest lean in nodding. Broken shell fragments on the grass. Bright shade.
Ordinary talk about an extraordinary thing.
```

### `08-dragon.png` — 알영 우물의 계룡

```
Wide scene at a second stone well among reeds. In the centre, a long
rainbow-scaled dragon with a rooster's head, red comb and gentle eyes coils out of
the well mouth, already fading and becoming transparent. At the foot of the well
lies a newborn baby girl wrapped in cloth, whose mouth is a small pale bird's
beak. On the left, a village woman has both hands to her cheeks. Strange and
gentle.
```

### `09-beak.png` — 툭 떨어져 떠내려간 부리

```
Wide scene at the stream. In the centre, an old woman kneels in the shallows
holding the baby girl low over the clear water and washing her face with a cupped
hand. A small pale beak has come loose and floats away downstream like a leaf,
and beneath it the baby is laughing with an ordinary little mouth. Sunlit ripples.
Keep it soft and painless.
```

### `10-grow.png` — 여섯 마을이 함께 기르다

```
Wide scene of village life across the plain. On the left, the boy Hyeokgeose
draws a bow at a straw target while an old chief steadies his elbow. On the right,
the girl Aryeong carries a basket of mulberry leaves past a rack of silkworm
trays, showing something to two women. Between them, people going about work,
smoke from roofs. Green summer, busy and warm.
```

### `11-thirteen.png` — 열세 살에 임금이 되다

```
Wide scene on the grassy hilltop. In the centre, the thirteen-year-old
Hyeokgeose stands on a low flat stone in a simple white robe with a red sash,
looking slightly overwhelmed but standing straight. Around him, the six chiefs
bow deeply, and below on the plain, crowds of villagers have gathered up the
slope. Wide sky, gold afternoon light.
```

### `12-queen.png` — 논밭을 보고, 뽕나무를 보고

```
Wide scene of the countryside. On the left, Hyeokgeose crouches at the edge of a
barley field with a farmer, running the ears through his fingers. On the right,
Aryeong stands under a mulberry tree with two women, holding up a leaf and a
silkworm cocoon. A path connects the two halves of the picture. Green and gold,
ordinary work. Partnership.
```

### `13-seorabeol.png` — 담을 헐고 길을 내다

```
Wide scene of the six villages growing together into one town. In the middle
of the frame, people pull down an old earthen boundary wall while others lay a
straight new road through the gap, carrying baskets of stone. Market stalls are
going up along it. Dust, shouting, cheerful chaos. Bright day. A town being
born.
```

### `14-people.png` — 여섯 마을이 모였기 때문이지요

```
Wide autumn scene of the whole plain, gold with ripe grain from edge to edge.
In the foreground, villagers carry sheaves and fill straw granaries. On a low rise
at the centre, Hyeokgeose and Aryeong stand together among the people, and he is
shaking his head with a smile and gesturing out at the six villages. Warm gold
light everywhere. Abundant and happy.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet grove at evening with no people. A low round stone well with an old tree
beside it, two halves of a broken red eggshell resting on the well's rim, and long
gold light slanting between the trunks. A single white feather on the grass.
Peaceful and luminous.
```
