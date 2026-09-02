# 제미나이 그림 프롬프트 — 봉이 김선달

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


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
| 본문 그림 12장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

능청스럽고 재미있는 이야기예요. 김선달은 사기꾼이 아니라 **한 수 위인 사람**으로 그려 주세요. 늘 여유롭고, 늘 반쯤 웃고 있어야 합니다.

- **대동강이 이 책의 또 다른 주인공입니다.** 강은 넓고 시원하게, 물빛이 살아 있게 그려 주세요.
- **상인 셋의 표정 변화가 이야기의 축입니다.** 2번 거만함 → 6번 놀람 → 8번 흥분 → 10번 새파랗게 질림 → 12번 할 말 없음. 같은 세 사람의 얼굴이 그림마다 확실히 달라야 합니다.
- **물장수는 물지게를 진 사람이에요.** 어깨에 지게를 지고 양쪽에 나무 물통을 매단 모습으로, 여러 명이 줄지어 다니게 그려 주세요.
- 12번에서 김선달은 돈이 아니라 **강물을 가리키고** 있어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, in the look of a classic Korean animated storybook.
Setting is late-Joseon Pyongyang: the wide blue-green Daedong River with willow
trees along the bank, big flat rocks at the water's edge, a stone city gate and
tiled roofs on the hillside behind, and small boats on the water. Bright clear
daylight, sparkling water, fresh greens and warm earth tones. Lively cartoon
expressions. No text or letters.
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
Kim Seondal: a lean middle-aged man in a clean but plain off-white durumagi coat
and a black horsehair hat, a neat short beard, narrow amused eyes and a faint
half-smile in every single picture. Relaxed, never sly-looking. The three
merchants: from Hanyang, in glossy silk coats - one in deep blue and stout with a
round face, one in wine red and tall and thin, one in dark green and short with a
fan. Strings of brass coins hang from all their belts. They always appear as a
set of three and always react together. The water sellers: ordinary working
people in hemp clothes with wooden A-frame carriers on their shoulders and a
wooden bucket hanging from each side.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. The wide blue-green Daedong River fills the lower
two thirds of the tall frame, sparkling in the sun, willow branches trailing in
from the sides. On a big flat rock at the near bank, Kim Seondal sits
cross-legged with his hat tipped back and a faint half-smile, one hand resting on
a small heap of brass coins. Behind him, up on the far bank, the tiled roofs and
stone gate of Pyongyang. Bright, wide, and calm.
```

## 본문  장 (모두 가로 16:9)

### `01-seondal.webp` — 평양 사람이면 다 아는 김선달

```
Wide scene in a busy Pyongyang market street. In the centre, Kim Seondal walks
along with his hands behind his back and a faint smile, and everyone he passes
turns to greet him - a rice seller waves, two women laugh behind their sleeves, a
child tugs his coat hem. Tiled roofs, hanging signs, warm morning light. Everyone
here knows him.
```

### `02-merchants.webp` — 한양에서 온 상인 셋

```
Wide scene at the stone city gate. In the centre, the three silk-coated
merchants stride in side by side, chins up, strings of brass coins swinging from
their belts, the short one fanning himself lazily. Behind them a laden packhorse.
On the left, two Pyongyang townsfolk step aside and exchange a look. Bright day.
Comic arrogance.
```

### `03-water.webp` — 대동강가의 물장수들

```
Wide scene at the riverbank. Across the middle of the frame, the wide sparkling
Daedong River. Along the near bank, a line of water sellers dip their wooden
buckets and hoist their A-frame carriers, working steadily. On the right, half
out of frame, Kim Seondal watches from under a willow with one eyebrow raised and
his eyes bright with an idea. Morning light on water.
```

### `04-plan.webp` — 물장수들을 불러 모으다

```
Wide interior of a modest room at night, one oil lamp. In the centre, Kim
Seondal sits with a pile of brass coin strings in front of him, pressing one
string into a water seller's hand while explaining with his other hand. Around
him, half a dozen water sellers sit in a rough circle, heads tilted, brows
furrowed in total confusion. Warm amber lamplight. Conspiratorial and funny.
```

### `05-collect.webp` — 어르신, 오늘 물값입니다

```
Wide scene at the riverbank in the early morning. On the left, Kim Seondal sits
squarely on a big flat rock, perfectly at ease. In front of him a water seller
bows deeply and sets a string of coins down at his feet. On the right, the three
merchants are passing by and the stout one has stopped mid-step, head turning.
Golden morning light on the water.
```

### `06-line.webp` — 줄줄이 돈을 내놓다

```
Wide scene at the riverbank. On the left, Kim Seondal sits on his rock counting
coins without looking up, the pile in front of him now large. A line of water
sellers waits its turn, each bowing and paying. On the right, the three merchants
have gathered shoulder to shoulder, all three with their eyes enormous and their
mouths open, the fan frozen halfway. Sparkling water behind.
```

### `07-claim.webp` — 조상 대대로 물려받은 것이지요

```
Wide scene at the riverbank. On the right, Kim Seondal finally looks up, one
hand gesturing lazily out across the whole river behind him, half-smiling. On the
left, the three merchants lean in as one, the tall one pointing at the water with
a shaking finger, the short one clutching his own coin strings. The wide river
sparkles between them. Comic disbelief turning to greed.
```

### `08-sell.webp` — 우리에게 파시오!

```
Wide scene at the riverbank. On the left, the three merchants crowd around Kim
Seondal, all talking at once - the stout one gripping his sleeve, the tall one
shoving a heavy wooden chest of coins forward with the lid thrown open, the short
one waving his fan wildly. On the right, Kim Seondal turns his face half away with
a reluctant expression that is not quite hiding a smile. Bright noon.
```

### `09-morning.webp` — 이튿날 아침, 바위 위의 세 사람

```
Wide scene at the riverbank in the morning. On the right, the three merchants
sit in a row on the big flat rock, arms folded, chins up, looking enormously
pleased with themselves. On the left, water sellers come down to the water and
begin filling their buckets, paying them no attention at all. Willows, sparkling
water, blue sky. The calm before.
```

### `10-refuse.webp` — 강물이 어떻게 누구 것이 됩니까

```
Wide scene at the riverbank. On the left, a water seller stands with one hand on
his hip and the other waving them off, laughing openly, and behind him the others
shoulder their carriers and walk away chuckling. On the right, the three
merchants are on their feet, faces drained white, the stout one's arms out, the
tall one gripping his own hair, the fan lying dropped on the rock. Bright
merciless daylight.
```

### `11-return.webp` — 한 푼도 안 썼소

```
Wide interior of a plain room. On the right, Kim Seondal sits calmly behind the
wooden coin chest, pushing it back across the floor with one hand, the lid open
and every string of coins still inside. On the left, the three merchants have
burst in red-faced and furious - and are now stopped dead, fists still raised,
faces sliding into bewilderment. Warm light. The turn of the story.
```

### `12-lesson.webp` — 저 강물은 아무도 못 삽니다

```
Wide scene on the riverbank at sunset. On the right, Kim Seondal stands with one
arm stretched out pointing at the wide river, not at the money, his face for once
completely serious. On the left, the three merchants stand in a row looking out at
the water, hats in their hands, saying nothing. The Daedong River glows gold and
rose from bank to bank. Quiet and large.
```

### `end.webp` — 마지막 (가로 4:3)

```
The wide Daedong River at dusk, no people. A big flat rock at the near bank with
a single wooden water bucket left standing on it, willow branches trailing in the
water, the last light spreading gold across the whole surface of the river.
Calm and open.
```
