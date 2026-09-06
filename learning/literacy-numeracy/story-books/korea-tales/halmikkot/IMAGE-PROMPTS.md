# 제미나이 그림 프롬프트 — 할미꽃

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
| 본문 그림 10장 (`01`~`10`) | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

```
python _tools/imgratio.py 책이름
```

지난번에 이 책들은 2:1로 시켰는데 전부 16:9로 받았고, 그걸 아무도 몰랐습니다.

> **이미 그려 둔 그림은 그대로 씁니다. 다시 그리지 마세요.**
> 본문 그림은 이미 16:9라 비율로는 새 기준과 같습니다. 달라지는 것은 구도뿐이라,
> 새로 그리는 그림에만 아래 규칙을 적용하면 됩니다. 다만 `end.webp`는 지난번에
> 16:9로 받아 좌우가 8퍼센트씩 잘리고 있습니다. 그 그림을 언젠가 다시 그릴 일이
> 생기면 그때 4 : 3으로 받으세요.

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

## 본문 열 장 (모두 가로 16:9)

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

높낮이가 보여야 한다. 할머니는 위쪽에 조그맣게, 초가집은 아래쪽에 놓는다.
언덕을 넘어 내려오다 중턱에서 주저앉은 자리이기 때문이다.

```
Tall hillside scene at dusk, seen from below so the slope reads top to bottom.
High up and small, the grandmother has sat down in the spring grass, stick laid
beside her, hands folded in her lap, head turned downhill, eyes closed and face
peaceful. Her white hair lifts in the breeze. Far below at the foot of the slope,
a single small thatched cottage with supper smoke rising straight from its
chimney. First stars in a lilac sky. Still and quiet, plainly resting, not
lifeless.
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

### `end.webp` — 마지막 (가로 4:3)

```
A sunny spring hillside at morning, no people. A few pasqueflowers with bent
stems and downward-facing purple blooms grow among fresh green grass, silver
hairs catching the light, a wooden walking stick lying at rest beside them, and a
small thatched roof visible far below. Gentle and warm.
```
