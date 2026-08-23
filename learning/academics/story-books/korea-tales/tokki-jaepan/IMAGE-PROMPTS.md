# 제미나이 그림 프롬프트 — 토끼의 재판

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Korean mountain forest of the Joseon era: tall red-barked
pines, mossy rocks, a narrow dirt trail, ferns and fallen leaves, distant ridges.
Deep green and warm brown palette with shafts of sunlight through the trees.
Big expressive faces, exaggerated comic gestures. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The traveller: a middle-aged Korean man in a worn pale hanbok and a wide-brimmed
black horsehair hat, a small bundle tied across his back and a walking stick,
kind round face, easily flustered. The tiger: a large orange-and-black striped
Korean folk-painting tiger, round face and big whiskers, wildly expressive -
pitiful and weeping at first, then smug and menacing, then red-faced with
frustration. The rabbit: a small white rabbit with very long ears and a calm
innocent face, hands politely folded, blinking slowly - never looks clever, which
is the joke.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking down into a deep pit dug in a Korean
mountain forest trail. A striped tiger stares up from the bottom of the pit with
huge eyes and paws braced on the earth walls. At the top edge of the frame, a
small white rabbit sits calmly on the rim looking down, ears upright, one paw
resting on a thick wooden pole. Tall pines and dappled light around the pit.
```

## 본문 열 장 (모두 가로 16:9)

### `01-pit.png` — 함정 속의 호랑이를 발견하는 나그네

```
Wide forest scene. On the right, a traveller in hanbok and black hat stops on a
narrow trail, one hand cupped to his ear, leaning toward a sound. On the left, a
deep pit in the ground with a striped tiger leaping up inside it, only his head
and front paws showing above the rim, mouth wide open shouting for help.
Scattered branches that once covered the trap lie broken around the edge.
```

### `02-beg.png` — 눈물까지 흘리며 애원하는 호랑이

```
Wide scene at the pit. On the left, the tiger inside the pit clasps both front
paws together in front of his chest, huge shining eyes brimming with fat comic
tears streaming down his cheeks, the picture of pitiful pleading. On the right,
the traveller crouches at the rim, hand on his chin, clearly wavering, brow
furrowed with doubt. Sunlight through pines.
```

### `03-rescue.png` — 나무를 타고 올라오는 호랑이

```
Wide scene at the pit. A thick log now slants from the bottom of the pit up to
the rim. The tiger climbs up it, already halfway out, front paws on the ground,
smiling broadly with his eyes closed in gratitude. On the right, the traveller
stands back with both hands raised, smiling nervously. A small hint of a sly
sideways glance from the tiger. Warm afternoon light.
```

### `04-betray.png` — 태도가 돌변한 호랑이

```
Wide forest scene. On the left, the tiger now stands at full height, front paw
raised with claws out, mouth wide open in a roar, eyes narrowed and hungry,
looming large in the frame. On the right, the traveller stumbles backward, hat
tipping off his head, arms flung up, mouth open in shock, walking stick dropped
on the ground. Dramatic and comic.
```

### `05-pine.png` — 소나무에게 묻다

```
Wide forest scene. On the right stands a huge ancient red-barked pine with a
gnarled trunk, its bark and knots suggesting a stern old face. On the left, the
traveller bows slightly with both hands together, asking the tree a question,
while the tiger stands behind him with front paws crossed, wearing a smug
confident grin. Shafts of light through the branches.
```

### `06-cow.png` — 소에게 묻다

```
Wide scene at the edge of the forest where it opens onto a small field. On the
right, a large brown ox stands hitched to a wooden plough, head turned toward the
pair, tired heavy-lidded eyes, speaking. On the left, the traveller has dropped
to his knees on the path with his head in his hands, utterly defeated, while the
tiger throws his head back laughing. Open sky above the field.
```

### `07-rabbit.png` — 지나가던 토끼

```
Wide forest trail scene. In the centre, a small white rabbit has stopped
mid-hop, ears straight up, head tilted, one paw to his cheek with a completely
blank innocent expression. On the left, the traveller leans down speaking
urgently, hands out, desperate. On the right, the tiger sits back on his
haunches, arms folded, waiting impatiently. Size contrast between the tiny rabbit
and the huge tiger.
```

### `08-confused.png` — 못 알아듣는 척하는 토끼

```
Wide forest scene near the pit. On the left, the tiger has both front paws
pressed to his own head in exasperation, mouth open mid-shout, veins comically
popping, pointing at the pit with one paw. On the right, the rabbit stands
perfectly calm, one paw raised in a polite question, blinking innocently, head
tilted the other way. The traveller peeks from behind a tree in the middle,
starting to catch on.
```

### `09-back-in.png` — 다시 구덩이로 내려가는 호랑이

```
Wide scene at the pit. The tiger stomps down the slanted log back into the pit,
already at the bottom, turning around with both front paws spread wide in a
"like THIS!" gesture, face red with frustration. At the rim on the right, the
rabbit watches with hands folded neatly, expression still perfectly blank. The
traveller stands behind the rabbit, eyes wide, hand over his mouth.
```

### `10-verdict.png` — 나무를 치워 버리는 토끼

```
Wide scene at the pit. The rabbit has hauled the thick log clear of the pit and
holds one end, giving a small polite bow toward the hole. Inside the pit the
tiger leaps up furiously, only his head and flailing paws visible above the rim,
roaring. On the right, the traveller and the rabbit are already turning to walk
down the trail together, both laughing, the traveller's hat back on his head.
Bright and triumphant.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet Korean mountain trail in late afternoon, no characters. A thick wooden
log lies to one side of the path, dappled sunlight falling across fallen pine
needles, a pair of small rabbit tracks leading away down the trail. Warm and
peaceful.
```
