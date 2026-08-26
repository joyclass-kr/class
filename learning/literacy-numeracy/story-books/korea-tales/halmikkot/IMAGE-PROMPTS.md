# 제미나이 그림 프롬프트 — 할미꽃

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**조용하고 애틋한 이야기예요.** 웃긴 장면이 하나도 없습니다. 과장된 표정 대신 눈빛과 자세로 마음을 보여 주세요. 할머니는 불쌍하게가 아니라 품위 있게 그려야 합니다. 마지막 두 장은 반드시 따뜻하게 끝나야 해요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, soft cel-animation style with gentle
outlines and warm muted colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era mountain village in early spring: thatched cottages, a
tiled-roof rich house, a river with a ferry, and a long grassy hillside path.
Pale spring greens, soft browns, dusty pinks. Restrained and tender - no
exaggerated comedy, no grotesque faces. Never show anyone dying or dead. No text
or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The grandmother: a small elderly woman with white hair in a neat low bun, a
gently curved back, deeply lined kind face, plain undyed hemp hanbok and a
wooden walking stick. She is dignified in every picture, never pitiable. The
eldest daughter: a well-dressed woman in fine silk, seen only as a shadow behind
a closed door. The second daughter: a woman in a good blue hanbok, standing in a
courtyard, avoiding eye contact. The youngest daughter: a young woman in a
simple patched hanbok with her sleeves tied back, warm open face, always in
motion. The flower: a pasqueflower - a bent arching stem with a downward-facing
deep purple bell-shaped bloom, the whole plant covered in fine white hairs.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A single pasqueflower fills the lower half of the
tall frame, seen close up - a bent stem arching over so the deep purple bloom
faces the ground, every part furred with fine silver-white hairs catching the
light. Behind and far below, a small thatched cottage at the foot of a green
spring hillside. Soft pale sky. Quiet and tender.
```

## 본문 열 장 (모두 가로 2:1)

### `01-daughters.webp` — 딸 셋을 키운 할머니

```
Wide scene in a small mountain village yard in daytime. On the left, a
middle-aged woman with a straight back sits on the veranda step sewing by hand, a
basket of gathered greens beside her. On the right, three young girls of
different heights play in the yard. Simple thatched cottage, pine hills behind.
Warm, modest, hardworking.
```

### `02-married.webp` — 하나둘 시집을 간 딸들

```
Wide scene showing three departures across one frame, like a single long road.
On the left, a bridal palanquin heads toward a distant tiled-roof house on a
ridge. In the middle, another heads toward a house across a river. On the right,
the third walks a short path to a small thatched cottage at the foot of a hill.
In the centre foreground, the mother stands watching, one hand raised. Soft
afternoon light.
```

### `03-alone.webp` — 지팡이를 짚고 나선 길

```
Wide scene at a small cottage gate in early spring. On the right, the grandmother
steps out through the gate, white-haired now and slightly stooped, one hand on a
wooden stick, the other pulling her jacket closed. Her house behind her is small
and very quiet. On the left, a long empty path curves away between budding
trees. Pale morning light.
```

### `04-first.webp` — 열리지 않은 첫째 딸네 대문

```
Wide scene at the gate of a fine tiled-roof house. On the left, the grandmother
stands close to the heavy wooden gate with one small hand raised to knock, head
tilted, listening. On the right, through a paper window, the seated silhouette of
a woman who has gone very still. The gate stays shut. Cool light, wide empty
space around the tiny figure.
```

### `05-second.webp` — 스르르 닫힌 둘째 딸네 문

```
Wide courtyard scene at a prosperous house across the river. On the right, the
second daughter stands half turned away, one hand already on the gate, eyes
lowered, mouth forming an excuse. On the left, outside the gate, the grandmother
has stopped mid-step with her stick raised, her face gentle rather than angry.
Muted midday light, a long distance between them.
```

### `06-hill.webp` — 해가 기우는 언덕길

```
Wide scene of a long grassy hillside path in late afternoon. In the lower left,
the grandmother climbs slowly, leaning hard on her stick, both hands on it, back
bowed. Far up and over the crest on the right, the tiny thatched roof of the
youngest daughter's cottage is just visible. The hill looks impossibly long. Low
golden light, long shadow behind her.
```

### `07-rest.webp` — 언덕 중턱에 앉은 할머니

```
Wide hillside scene at dusk. In the centre, the grandmother has sat down in the
spring grass, stick laid beside her, hands folded in her lap, head turned toward
the distant cottage roof, eyes closed and face peaceful. Her white hair lifts in
the breeze. Wide open hillside, first stars in a lilac sky. Still and quiet,
plainly resting, not lifeless.
```

### `08-search.webp` — 앞치마를 벗어 던지고 뛰다

```
Wide scene at the youngest daughter's cottage at dusk. On the right, she has
dropped a bundle of washing and is already running, apron half untied and
trailing, both arms pumping, face urgent. On the left, the hillside path rises
into the deepening evening. Her small cottage door stands open behind her. Motion
and worry.
```

### `09-found.webp` — 언덕에서 어머니를 찾아내다

```
Wide hillside scene in the last light. In the centre, the youngest daughter has
dropped to her knees in the grass with both arms around her mother's shoulders,
her face close to hers. The grandmother's eyes are open and one hand has risen to
touch her daughter's cheek. Wide empty hillside around them, warm last sunlight
on the two figures. Deeply tender.
```

### `10-flower.webp` — 이듬해 봄, 그 자리에 핀 꽃

```
Wide hillside scene the following spring, bright and green. On the left, a small
cluster of pasqueflowers grows where she had rested - bent stems, downward-facing
purple blooms, silver hairs glowing in the sun. On the right, far below, the
grandmother sits on the sunny veranda of the small cottage with a blanket over her
knees while her youngest daughter hangs washing nearby. Warm and hopeful.
```

### `end.webp` — 마지막 (가로 2:1)

```
A sunny spring hillside at morning, no people. A few pasqueflowers with bent
stems and downward-facing purple blooms grow among fresh green grass, silver
hairs catching the light, a wooden walking stick lying at rest beside them, and a
small thatched roof visible far below. Gentle and warm.
```
