# 제미나이 그림 프롬프트 — 삼형제의 재주

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

**삼형제를 한눈에 구별되게 그려 주세요.** 옷 색을 각각 다르게(첫째 갈색, 둘째 남색, 셋째 초록) 고정하고, 모든 장면에서 같은 색을 씁니다. 셋째는 형들보다 작고 어려 보여야 해요 — 그래야 형들이 웃는 장면과 마지막이 살아납니다. 이무기는 무섭게가 아니라 옛 그림 속 용처럼 크고 위엄 있게 그리세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean bold
outlines and rich colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era mountain region: a poor thatched cottage, a forked
country road, deep pine forests, rocky ridges, and finally an enormous sheer
cliff face rising into cloud. Warm earth tones on the ground, cool blue-grey for
the cliff. Dynamic staging, strong sense of height and distance in the last
chapter. The imugi is a grand folk-painting serpent, never gory. No text or
letters in the image.
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
Eldest brother: a broad-shouldered young man in a brown hanbok, calm steady face,
often with one hand cupped to his ear or pressed to the ground. Second brother: a
lean young man in a navy hanbok with a bow and quiver, sharp confident eyes,
usually mid-draw. Third brother: noticeably younger and smaller, in a green
hanbok, round open face, always with his arms slightly out as if ready to catch
something. Keep the three colours constant. The child: a small boy of about five
in a red jeogori. The imugi: a huge coiling serpent in the style of Korean folk
painting - long body, whiskers, patterned scales, imposing rather than horrifying.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. An enormous sheer cliff face fills the tall frame
from top to bottom. At the very top, tiny, a coiled serpent shape and a small
speck of red falling away from it. Two thirds of the way down, an arrow streaks
upward. At the very bottom, a small figure in green stands with both arms spread
wide, looking up. Vertigo and hope in one image.
```

## 본문  장 (모두 가로 16:9)

### `01-brothers.webp` — 물려줄 것이 없는 아버지

```
Wide interior of a bare thatched cottage room. On the right, an elderly father
sits on the floor with his hands on his knees, speaking gravely. On the left,
three sons kneel in a row facing him - a broad one in brown, a lean one in navy,
and a smaller one in green. The room is almost empty: one chest, one lamp. Warm
dim light. Poor and dignified.
```

### `02-depart.webp` — 갈림길에 선 세 사람

```
Wide scene at a three-way fork in a country road at dawn. In the centre, the
three brothers stand back to back at the junction, each facing a different road.
The brown one strides east, the navy one west, the small green one south. Their
three roads run off toward three different horizons. Long morning shadows.
Hopeful and lonely.
```

### `03-return.webp` — 삼 년 만에 다시 만난 형제

```
Wide scene in the cottage yard. In the centre, the eldest in brown kneels with
one ear pressed flat to the ground, eyes closed in concentration. Around him, the
father and the other two brothers lean in watching. Chickens scatter. Bright
daylight, dust motes. Curiosity and reunion.
```

### `04-skills.webp` — 받는 재주라니

```
Wide scene in the yard, split. On the left, the second brother in navy has just
loosed an arrow and a single leaf is falling from a distant tree, his pose
perfect. On the right, the small brother in green stands with his arms out
awkwardly explaining, while the two elder brothers double over laughing, one
slapping his knee. The younger one's face is patient. Comic but a little
stinging.
```

### `05-hear.webp` — 백 리 밖 소리를 듣다

```
Wide scene in the yard. In the centre, the eldest stands with one hand raised
sharply for silence and the other cupped behind his ear, eyes shut, whole body
still. Around him everyone has frozen mid-motion. Concentric ripples of sound are
suggested faintly in the air, coming from far beyond the hills on the right.
Charged stillness.
```

### `06-village.webp` — 이무기가 아이를 채어 갔다

```
Wide scene in a village lane. On the left, a crowd of anxious villagers surrounds
a magistrate's servant who gestures helplessly toward the mountains. Women hold
each other; a man points at the sky. On the right, the three brothers stand
listening, already turning toward the ridge. Overcast light, real fear in the
faces.
```

### `07-run.webp` — 산을 넘고 골짜기를 건너

```
Wide mountain landscape, full of motion. The three brothers run in single file
along a ridge trail from right to left, the eldest in brown leading with one arm
pointing, the navy one behind, the small green one bringing up the rear with his
arms pumping. Pines blur past; a valley drops away below. Speed lines, urgency.
```

### `08-cliff.webp` — 하늘을 찌를 듯한 절벽

```
Wide scene looking up at an enormous cliff face that fills the frame, its top
lost in cloud. Near the very top, tiny, the coiled shape of a great serpent and a
speck of red beside it. At the bottom of the frame, the three brothers are small
dark figures with their heads tipped all the way back. Overwhelming scale.
```

### `09-aim.webp` — 쏘면 아이가 떨어진다

```
Wide scene at the cliff base. On the right, the second brother has an arrow
nocked and drawn, aiming upward, jaw set. On the left, the eldest grips his arm
with both hands, face urgent, mouth open in warning. Between them, the small
brother in green looks up at the cliff, already thinking. Tension in three
directions.
```

### `10-ready.webp` — 두 팔을 벌린 셋째

```
Wide scene at the cliff base. In the centre, the small brother in green has
walked out to an open patch of ground and stands with both arms spread wide,
knees bent, looking straight up. On the left, the eldest holds up one hand
reading the wind with his eyes closed. On the right, the second draws his bow.
Three men, three jobs, one moment. Quiet before action.
```

### `11-catch.webp` — 품에 사뿐히 안긴 아이

```
Wide vertical-feeling scene at the cliff base. A long arrow trail streaks up the
right side of the frame; high above, the serpent recoils and a small red figure
falls, drawn as a streak. At the bottom centre, the brother in green has taken
three running steps and closed his arms around the child, knees bending to absorb
the fall, dust puffing at his feet. The child is safe, eyes shut. Triumphant and
tender.
```

### `12-reward.webp` — 셋에게 똑같이 내린 상

```
Wide scene in a magistrate's courtyard. On the right, the magistrate holds the
small child tightly with tears on his face. In the centre, the three brothers
stand in a row - brown, navy, green - all three shaking their heads with hands
raised in refusal, the small one in the middle. Servants bring forward three
identical trays of reward. Warm gold light, villagers applauding at the edges.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet mountain valley at sunset, no people. Three sets of footprints lead away
down a dusty trail side by side, an arrow standing upright in the earth beside
the path, and the great cliff face glowing orange in the last light. Peaceful and
proud.
```
