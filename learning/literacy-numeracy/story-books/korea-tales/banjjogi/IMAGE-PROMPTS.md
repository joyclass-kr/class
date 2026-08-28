# 제미나이 그림 프롬프트 — 반쪽이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **12개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **14장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean rural village of the Joseon era: thatched-roof
cottages, low stone walls, tile-roofed rich man's house with a big wooden gate,
pine forests, rice paddies, dirt paths, a village well and a stream. Characters
wear hanbok. Night scenes lit by warm lantern glow and cool blue moonlight. Big
expressive faces, exaggerated comic gestures, lively motion. No text or letters
in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
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
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Banjjogi (Half-boy). READ THIS TWICE - it is the whole point of the book and it
keeps being drawn wrong.

HE IS HALF A BOY, AND THE MISSING HALF IS ALWAYS ON THE LEFT SIDE OF THE PICTURE.

Do not think about his left or his right - think about the PICTURE. Draw a whole
boy facing the viewer, then draw one straight vertical line down the middle of
his face and body, and erase everything on the LEFT-HAND SIDE OF THE IMAGE. The
straight cut edge always runs down the picture-left side of him. Everything that
remains is on the picture-right side of that line:

  - ONE eye, on the picture-right. The picture-left eye, eyebrow and ear are gone.
  - HALF a nose and HALF a mouth, the picture-right halves.
  - ONE arm, on the picture-right. No arm at all on the picture-left.
  - ONE leg, on the picture-right. He hops on it.
  - Half a torso, half a topknot - the picture-right halves.

This is the same in EVERY picture, whichever way he is moving or looking. Cut
edge always picture-left, single eye and single arm and single leg always
picture-right. Never both eyes. Never both arms. Never a whole face on a half
body - THE FACE IS HALVED TOO, exactly like the body.

He is NOT a cut-open body. Nothing is exposed - no bone, no organs, no blood, no
red flesh, never a cutaway. The flat side is simply smooth, like the side of a
paper cut-out that has been given thickness. Draw him as a solid, rounded,
three-dimensional half-figure standing on his one leg.

He is cheerful and strong. His single arm is thick with muscle, his one eye is
bright and good-humoured, and half a mouth still grins wide. He wears a simple
pale hanbok cut to fit his half body. Always warm and heroic, never pitiful.
The two elder brothers: two ordinary-looking young men in tidy grey and tan
hanbok, always together, always sulking or whispering behind their hands, small
mean eyes.
The old mother: a stooped kindly woman in a plain white and pale-blue hanbok
with grey hair in a bun.
Kim the rich man: a stout middle-aged man in a fine wine-coloured silk hanbok
and a black horsehair hat, stroking his beard, shifty when cornered.
His daughter: a calm graceful young woman in a soft pink and mint hanbok, long
braid, watching everything quietly.
The tiger: a huge orange-and-black striped Korean folk-painting tiger, round
face, fierce at first and then comically indignant once tied up.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 소나무를 뿌리째 지고 선 반쪽이.

```
Vertical portrait composition. Standing tall in the centre of the frame, seen
from slightly below against a twilight sky, Banjjogi balances on his single
leg with a whole pine tree slung across his back, roots and clumps of earth still
hanging from it. Thick ropes are still wound around his half body. His one eye is
bright and he wears a huge cheerful grin. Below him at the bottom of the frame, a
small moonlit village of thatched roofs. Heroic and funny, warm orange sunset
behind, deep blue sky above.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. The face is halved
exactly like the body. The flat side is SMOOTH - absolutely no bone, organs,
blood or red flesh. Never a cutaway.
```

## 본문 12장 (모두 가로 2:1)

### `01-carp.webp` — 노인이 잉어 세 마리를 준다

```
Wide panoramic scene. A humble thatched cottage yard. On the right an old
traveller in a wide straw hat and grey robe holds out a straw string threaded
with three plump carp toward the left, one finger raised as if giving careful
instructions. On the left a middle-aged couple in plain hanbok receive them with
both hands, bowing slightly, hopeful faces. Late afternoon, warm gold light.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `02-half.webp` — 세 마리째를 반만 먹고, 셋째 아이가 반쪽으로 태어난다

```
Wide panoramic scene split in feeling. On the left, inside a warm lamplit room,
the woman sets down her spoon and turns toward the door where a neighbour's hand
is knocking - a bowl on the low table still half full. On the right, a warm
sunlit room with three newborn babies swaddled on the floor: two plump ordinary
babies, and the third a cheerful baby who is exactly one vertical half of a baby,
one eye, one arm, one leg, gurgling happily. The old mother looks down at them
with wide surprised eyes and a soft smile. Never gruesome - the half baby is
round and cute.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `03-grow.webp` — 한 팔로 쌀가마를 번쩍 든다

```
Wide panoramic scene. A village threshing yard in bright daylight. On the right
Banjjogi, now grown, balances on his one leg and hoists an enormous rice sack
high over his head with his single arm, grinning, effortless. On the left a crowd
of villagers - farmers, an old man, children - throw up their hands and cheer,
mouths wide open in amazement. Dust motes and straw in the golden air.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `04-jealous.webp` — 형 둘이 시샘하며 수군거린다

```
Wide panoramic scene. Evening behind a low stone wall. On the left the two elder
brothers crouch together with their heads almost touching, whispering behind
cupped hands, eyes narrowed and sour, one jabbing a thumb over his shoulder. On
the right, far away and out of earshot, Banjjogi hops cheerfully along a path
carrying a huge bundle of firewood, oblivious. Long blue evening shadows.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `05-tie.webp` — 깊은 산에서 반쪽이를 소나무에 묶는다

```
Wide panoramic scene. Deep pine forest at dusk. In the centre-left Banjjogi is
bound with many coils of thick rope to a massive pine trunk, but his expression
is only mildly puzzled, one eyebrow up, not frightened at all. On the right the
two brothers hurry away downhill without looking back, glancing sideways at each
other. Cool dim blue-green light, tall dark trunks.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `06-uproot.webp` — 소나무를 통째로 지고 마당에 나타난다

```
Wide panoramic scene. Night in the cottage yard, warm lamplight spilling from an
open door on the left where the two brothers stand frozen mid-step, rice bowls
falling from their hands, eyes and mouths enormous with shock. On the right
Banjjogi stands in the yard still wrapped in ropes, the whole uprooted pine tree
across his back with earth and roots dangling, scratching his head with his one
hand and smiling apologetically. Dust puffing up around his foot.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `07-tiger.webp` — 밤마다 호랑이가 마을로 내려온다

```
Wide panoramic scene. A sleeping village under a cold blue moon, thatched roofs
and shuttered doors on the right, black pine ridge on the left. A huge striped
tiger prowls down the empty village lane in the centre, head low, eyes glowing
yellow, one paw raised. An overturned water jar and a broken fence rail. Every
window dark. Tense but stylised, not gory.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `08-catch.webp` — 한 팔로 호랑이 목덜미를 붙들어 꽁꽁 묶는다

```
Wide panoramic scene. Night at the village entrance under a moon. In the centre
Banjjogi balances on his one leg and grips the huge tiger by the scruff of its
neck with his single arm, holding it up so its paws paddle helplessly in the air.
The tiger's face is comically outraged, tongue out, eyes crossed. A coil of thick
rope is slung over Banjjogi's shoulder and one loop is already around the tiger's
middle. Moonlight, motion lines, funny not frightening.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `09-promise.webp` — 김 부자 대문 앞에 호랑이를 끌고 선다

```
Wide panoramic scene. Morning outside a rich man's tile-roofed house with a big
wooden gate on the right. Banjjogi stands on the left in the lane holding a rope,
the enormous tiger trussed up like a bundle at his side, sulking. Kim the rich
man has come out through the gate and stopped dead, his smile frozen, one hand
half raised, sweat drops flying off his forehead. Villagers peek over the wall,
delighted.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `10-excuse.webp` — "세 가지 내기를 해서 이기면"

```
Wide panoramic scene. The same gateway, now with a crowd. On the right Kim the
rich man holds up three fingers with a forced hearty smile, stroking his beard
with the other hand, eyes sliding sideways. On the left Banjjogi nods calmly,
arms - arm - at his side, completely unbothered. Between and behind them
villagers mutter to one another with raised eyebrows and folded arms. Bright
midday.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `11-contest.webp` — 힘겨루기, 달리기, 슬기 겨루기

```
Wide panoramic scene showing three moments in one strip, left to right. Left:
Banjjogi lifts an entire granary pillar off the ground with his one arm while
onlookers reel back. Centre: he hops across a finish line on his single leg,
well ahead of two ordinary runners. Right: he wades chest-deep into a clear
stream carrying a huge earthenware jar in his arm and dunks it straight into the
water. Bright daylight, cheering crowd, playful energy.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

### `12-wedding.webp` — 혼례, 형 둘을 윗자리에 앉힌다

```
Wide panoramic scene. An autumn wedding in a courtyard hung with red and blue
cloth. In the centre Banjjogi in a bridegroom's robe stands beside the bride in
her red wedding hanbok and headpiece, both smiling. On the left, at the place of
honour under the awning, the two elder brothers sit stiffly on cushions with
crimson faces, looking at the ground, one scratching his neck. The old mother
wipes her eyes on the right. Persimmon trees, warm golden autumn light,
festive.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT: the straight
cut edge runs down his picture-left side, and he has ONE eye, ONE arm, ONE leg,
half a nose and half a mouth, all on the picture-right. Never both eyes. The face
is halved exactly like the body. The flat side is smooth - never a cutaway.
```

---

## 마지막 장 — `end.webp` (가로 2:1)

반쪽이와 형들이 함께 밭에서 일한다.

```
Wide scene at golden hour. A ripening field. Banjjogi and his two brothers work
side by side in a row, all three laughing at something one of them has just said,
sleeves rolled up. The old mother and the young wife carry a lunch tray toward
them along the ridge path. Warm harvest colours, distant blue mountains, wide
open sky. Peaceful and companionable.
Banjjogi is HALF a boy and the missing half is on the PICTURE-LEFT - even here
among his whole-bodied brothers. Cut edge picture-left; ONE eye, ONE arm, ONE leg,
half a nose and half a mouth on the picture-right. The face is halved too.
Smooth flat side, never a cutaway.
```
