# 제미나이 그림 프롬프트 — 반쪽이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **12개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **14장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 마지막 「끝」 쪽 한 자리에만 쓰입니다.** 가로로 넓은 칸(1.7 : 1)입니다.
> 「읽고 나서」 쪽에는 그림이 들어가지 않습니다 — 두 칸 다 글입니다.
> 칸에 꽉 차게 잘라 넣는 방식이니, 아래 비율표대로 만들어 주세요.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

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
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Banjjogi (Half-boy): a cheerful sturdy young man drawn as exactly one vertical
half of a person - one eye, one arm, one leg, half a torso - but solid and
three-dimensional, never gruesome or bloody, never a cutaway. Think of a
strongman split down the middle and still standing, hopping easily on his one
leg, his single arm thick with muscle. He wears a simple pale hanbok cut to fit
his half body, hair in a topknot. His one eye is bright and good-humoured; he
smiles a lot. Always drawn warmly and heroically, never pitiful.
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

## 표지 — `cover.png` (세로 2:3)

세로로 긴 표지. 소나무를 뿌리째 지고 선 반쪽이.

```
Vertical portrait composition. Standing tall in the centre of the frame, seen
from slightly below against a twilight sky, Banjjogi - a young man who is exactly
one vertical half of a person, one eye, one arm, one leg - balances on his single
leg with a whole pine tree slung across his back, roots and clumps of earth still
hanging from it. Thick ropes are still wound around his half body. His one eye is
bright and he wears a huge cheerful grin. Below him at the bottom of the frame, a
small moonlit village of thatched roofs. Heroic and funny, warm orange sunset
behind, deep blue sky above.
```

## 본문 12장 (모두 가로 2:1)

### `01-carp.png` — 노인이 잉어 세 마리를 준다

```
Wide panoramic scene. A humble thatched cottage yard. On the right an old
traveller in a wide straw hat and grey robe holds out a straw string threaded
with three plump carp toward the left, one finger raised as if giving careful
instructions. On the left a middle-aged couple in plain hanbok receive them with
both hands, bowing slightly, hopeful faces. Late afternoon, warm gold light.
```

### `02-half.png` — 세 마리째를 반만 먹고, 셋째 아이가 반쪽으로 태어난다

```
Wide panoramic scene split in feeling. On the left, inside a warm lamplit room,
the woman sets down her spoon and turns toward the door where a neighbour's hand
is knocking - a bowl on the low table still half full. On the right, a warm
sunlit room with three newborn babies swaddled on the floor: two plump ordinary
babies, and the third a cheerful baby who is exactly one vertical half of a baby,
one eye, one arm, one leg, gurgling happily. The old mother looks down at them
with wide surprised eyes and a soft smile. Never gruesome - the half baby is
round and cute.
```

### `03-grow.png` — 한 팔로 쌀가마를 번쩍 든다

```
Wide panoramic scene. A village threshing yard in bright daylight. On the right
Banjjogi, now grown, balances on his one leg and hoists an enormous rice sack
high over his head with his single arm, grinning, effortless. On the left a crowd
of villagers - farmers, an old man, children - throw up their hands and cheer,
mouths wide open in amazement. Dust motes and straw in the golden air.
```

### `04-jealous.png` — 형 둘이 시샘하며 수군거린다

```
Wide panoramic scene. Evening behind a low stone wall. On the left the two elder
brothers crouch together with their heads almost touching, whispering behind
cupped hands, eyes narrowed and sour, one jabbing a thumb over his shoulder. On
the right, far away and out of earshot, Banjjogi hops cheerfully along a path
carrying a huge bundle of firewood, oblivious. Long blue evening shadows.
```

### `05-tie.png` — 깊은 산에서 반쪽이를 소나무에 묶는다

```
Wide panoramic scene. Deep pine forest at dusk. In the centre-left Banjjogi is
bound with many coils of thick rope to a massive pine trunk, but his expression
is only mildly puzzled, one eyebrow up, not frightened at all. On the right the
two brothers hurry away downhill without looking back, glancing sideways at each
other. Cool dim blue-green light, tall dark trunks.
```

### `06-uproot.png` — 소나무를 통째로 지고 마당에 나타난다

```
Wide panoramic scene. Night in the cottage yard, warm lamplight spilling from an
open door on the left where the two brothers stand frozen mid-step, rice bowls
falling from their hands, eyes and mouths enormous with shock. On the right
Banjjogi stands in the yard still wrapped in ropes, the whole uprooted pine tree
across his back with earth and roots dangling, scratching his head with his one
hand and smiling apologetically. Dust puffing up around his foot.
```

### `07-tiger.png` — 밤마다 호랑이가 마을로 내려온다

```
Wide panoramic scene. A sleeping village under a cold blue moon, thatched roofs
and shuttered doors on the right, black pine ridge on the left. A huge striped
tiger prowls down the empty village lane in the centre, head low, eyes glowing
yellow, one paw raised. An overturned water jar and a broken fence rail. Every
window dark. Tense but stylised, not gory.
```

### `08-catch.png` — 한 팔로 호랑이 목덜미를 붙들어 꽁꽁 묶는다

```
Wide panoramic scene. Night at the village entrance under a moon. In the centre
Banjjogi balances on his one leg and grips the huge tiger by the scruff of its
neck with his single arm, holding it up so its paws paddle helplessly in the air.
The tiger's face is comically outraged, tongue out, eyes crossed. A coil of thick
rope is slung over Banjjogi's shoulder and one loop is already around the tiger's
middle. Moonlight, motion lines, funny not frightening.
```

### `09-promise.png` — 김 부자 대문 앞에 호랑이를 끌고 선다

```
Wide panoramic scene. Morning outside a rich man's tile-roofed house with a big
wooden gate on the right. Banjjogi stands on the left in the lane holding a rope,
the enormous tiger trussed up like a bundle at his side, sulking. Kim the rich
man has come out through the gate and stopped dead, his smile frozen, one hand
half raised, sweat drops flying off his forehead. Villagers peek over the wall,
delighted.
```

### `10-excuse.png` — "세 가지 내기를 해서 이기면"

```
Wide panoramic scene. The same gateway, now with a crowd. On the right Kim the
rich man holds up three fingers with a forced hearty smile, stroking his beard
with the other hand, eyes sliding sideways. On the left Banjjogi nods calmly,
arms - arm - at his side, completely unbothered. Between and behind them
villagers mutter to one another with raised eyebrows and folded arms. Bright
midday.
```

### `11-contest.png` — 힘겨루기, 달리기, 슬기 겨루기

```
Wide panoramic scene showing three moments in one strip, left to right. Left:
Banjjogi lifts an entire granary pillar off the ground with his one arm while
onlookers reel back. Centre: he hops across a finish line on his single leg,
well ahead of two ordinary runners. Right: he wades chest-deep into a clear
stream carrying a huge earthenware jar in his arm and dunks it straight into the
water. Bright daylight, cheering crowd, playful energy.
```

### `12-wedding.png` — 혼례, 형 둘을 윗자리에 앉힌다

```
Wide panoramic scene. An autumn wedding in a courtyard hung with red and blue
cloth. In the centre Banjjogi in a bridegroom's robe stands beside the bride in
her red wedding hanbok and headpiece, both smiling. On the left, at the place of
honour under the awning, the two elder brothers sit stiffly on cushions with
crimson faces, looking at the ground, one scratching his neck. The old mother
wipes her eyes on the right. Persimmon trees, warm golden autumn light,
festive.
```

---

## 마지막 장 — `end.png` (가로 2:1)

반쪽이와 형들이 함께 밭에서 일한다.

```
Wide scene at golden hour. A ripening field. Banjjogi and his two brothers work
side by side in a row, all three laughing at something one of them has just said,
sleeves rolled up. The old mother and the young wife carry a lunch tray toward
them along the ridge path. Warm harvest colours, distant blue mountains, wide
open sky. Peaceful and companionable.
```
