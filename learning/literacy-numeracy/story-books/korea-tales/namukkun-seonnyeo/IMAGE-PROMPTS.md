# 제미나이 그림 프롬프트 — 나무꾼과 선녀

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열여섯 개의 펼침** + 표지 + 마지막 장 = 그림 **열여덟 장**.


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
| 본문 그림 16장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**따뜻하고 아름다운 이야기**예요. 산과 하늘의 대비가 이 책의 중심입니다. 산은 초록과 흙빛으로 소박하게, 하늘나라는 흰빛과 옥빛으로 환하게 그려 주세요.

- **4번과 5번이 첫 절정입니다.** 달빛 아래 연못에 선녀 일곱이 내려앉는 장면, 그리고 날개옷 한 벌이 바람에 날려 가시덤불에 걸리는 장면이에요. 날개옷은 새 깃털처럼 가벼운 흰 비단으로, 어깨에서 긴 띠가 흘러내리게 그려 주세요.
- **7번이 이 책에서 가장 중요한 그림이에요.** 주운 옷을 두 손으로 내미는 장면입니다. 나무꾼의 표정에 조금의 망설임도 없어야 해요. 이 책은 감추지 않는 이야기입니다.
- **두레박은 늘 같은 두레박으로.** 14번과 16번에 같은 물건이 나와야 합니다. 굵은 새끼줄에 매달린 커다란 나무 두레박이에요.
- **16번에 수탉을 꼭 넣어 주세요.** 마당의 수탉들이 목을 빼고 하늘을 올려다보는 모습이 보여야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with clean
outlines and rich colors, in the look of a classic Korean animated film. Two
worlds. Earth: a poor thatched cottage at the foot of a steep wooded mountain,
a swept dirt yard, pine forest, and a small clear pond on the summit - painted
in greens, browns and moonlit blues. Heaven: terraces of white cloud, pale jade
pavilions, drifting silk banners and soft light with no shadows - painted in
white, jade and gold. Warm and gentle throughout, never frightening. No text or
letters.
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
The woodcutter: a young man of about twenty-five in patched off-white hemp with
his hair in a topknot and a cloth headband, an A-frame carrier and an axe, broad
hands and a plain honest face. The mother: a small bent old woman with white hair
in a bun and a faded grey jacket, quick and busy. The heavenly woman: a young
woman with long black hair and a jade-green skirt with a pale yellow jacket; her
winged robe is white silk that falls like feathers with long trailing ribbons
from the shoulders - always drawn the same. The deer: a slender roe deer with
large dark eyes, a white patch at its throat. The two children: a boy of about
six and a girl of about four in plain hemp. The bucket: a large wooden bucket on
a thick straw rope, drawn identically every time.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A small clear pond on a mountain summit under a
full moon. In the lower half of the tall frame, the pond glows with moonlight and
mist rises off it. In the upper half, a broad shaft of moonlight comes down
through the clouds, and along it seven figures in white winged robes descend
toward the water, ribbons trailing. On the near bank among the rocks, a single
white robe has caught in a thicket and flutters. Silver, blue and white. Hushed
and magical.
```

## 본문  장 (모두 가로 16:9)

### `01-woodcutter.webp` — 지게 하나와 도끼 한 자루

```
Wide scene at a poor thatched cottage at the foot of a steep wooded mountain in
the early morning. On the right, the woodcutter hoists his A-frame carrier with
an axe tucked in it, turning to answer. On the left, his old mother stands in the
doorway with one hand raised, saying something. Mist on the mountain, cold blue
dawn light, a thin curl of smoke. Poor and warm.
```

### `02-deer.webp` — 나뭇더미에 숨긴 사슴

```
Wide scene in a pine forest. On the right, the woodcutter throws an armful of
cut branches over a slender roe deer crouched flat against the ground, its huge
dark eyes showing through the twigs. On the left, further off between the trunks,
a hunter runs past with a bow, not looking their way. Dappled green light, motion
lines. Tense and quick.
```

### `03-tell.webp` — 보름달 뜨는 밤에요

```
Wide scene in a forest clearing. In the centre, the roe deer stands with one
front hoof raised and its head tilted up toward the sky, speaking. On the left,
the woodcutter crouches on one knee listening with his axe across his lap and his
mouth slightly open. Above them, a daytime moon faint in the blue. Sunlight
through pines. Quiet and strange.
```

### `04-pond.webp` — 연못에 내려앉은 일곱

```
Wide night scene at a small pond on a mountain summit. In the upper part of the
frame, a broad shaft of moonlight comes down through the clouds and seven figures
in white winged robes descend along it toward the water, ribbons streaming behind
them. On the near bank, the woodcutter crouches behind a boulder, only his head
showing, eyes wide. Silver light, mist off the water. Breathtaking.
```

### `05-robe.webp` — 가시덤불에 걸린 날개옷

```
Wide scene at the pond. A gust of wind sweeps across the frame, bending the
grasses. On the left, one white winged robe has been lifted from a flat rock and
blown into a thorn thicket, where it flaps and catches. On the right, the
woodcutter is already scrambling toward it with his arms up, brambles snagging his
sleeves. Moonlight, flying leaves. Urgent and kind.
```

### `06-left.webp` — 못가에 남은 한 사람

```
Wide scene at the pond at first light. In the upper part of the frame, six
figures in white are already far away, rising into a break in the clouds. Below,
on the flat rock at the water's edge, one young woman sits alone with her knees
drawn up and her face buried in them, hair loose over her shoulders. Empty pale
sky, cold mist. Lonely.
```

### `07-give.webp` — 두 손으로 내민 옷

```
Wide scene at the pond. In the centre, the woodcutter stands holding out the
folded white winged robe on both open palms, head slightly bowed, his face
completely straightforward with no hesitation at all. On the right, the young
woman has lifted her tear-streaked face and is staring at him, not yet reaching
for it. Pale gold dawn light on the water. The most important picture in the
book.
```

### `08-closed.webp` — 하늘 문이 닫혔어요

```
Wide scene at the pond in the morning. In the centre, the young woman stands in
her white winged robe with both arms lifted and her face turned up to the sky -
and her feet are still flat on the rock, going nowhere. Above her, the clouds have
closed into an unbroken white ceiling. On the right, the woodcutter watches with
his hands at his sides. Ordinary morning light. Comically anticlimactic and
sad.
```

### `09-home.webp` — 산나물 이름은 하나도 빠짐없이

```
Wide interior of the small cottage at night. Around a low table, the old mother
laughs with her hand over her mouth, the heavenly woman spreads out an armful of
mountain greens and names them one by one on her fingers, and the woodcutter
leans in listening. A pot of scorched rice sits to one side. Warm lamplight,
smoke-darkened beams. Homely and happy.
```

### `10-stay.webp` — 조금만 더 있다 갈게요

```
Wide interior of the cottage under a full moon shining through the open door. In
the centre, the woodcutter holds out the neatly folded white robe, and the
heavenly woman takes it - and is setting it down inside a wooden chest, one hand
on the lid. She is not looking at him. Blue moonlight and warm lamplight
together. A decision.
```

### `11-children.webp` — 마당에 아이가 둘

```
Wide scene of the cottage yard in summer. Two children chase a chicken across
the swept dirt, the boy in front, the girl howling behind. On the left, the
woodcutter stacks firewood; on the right, the heavenly woman spreads herbs on a
mat to dry; in the doorway, the grandmother laughs with her hands on her knees.
Bright green mountain behind. Full of noise and life.
```

### `12-homesick.webp` — 자꾸 올려다본 하늘

```
Wide scene of the yard on a bright day. In the centre, the heavenly woman stands
at the washing line with a wet cloth in her hands, but she has stopped and her
face is tipped up at the clouds, still and far away. The washing hangs half hung.
On the right, from the doorway, the woodcutter watches her without saying
anything. Sunlight, drifting cloud. Quiet ache.
```

### `13-up.webp` — 구름 속으로

```
Wide scene of the yard. In the centre, the heavenly woman rises off the ground in
her white winged robe with a child in each arm, ribbons streaming, already several
feet up and turning to call back. Below, the woodcutter stands with one hand
half-raised, and the grandmother has both hands pressed to her mouth. Wind, dust,
a shaft of light in the cloud. Beautiful and painful.
```

### `14-bucket.webp` — 마당 한가운데로 내려온 두레박

```
Wide scene of the yard at midday. Straight down through a break in the clouds
comes a thick straw rope with a big wooden bucket on the end, settling in the
middle of the swept yard. The woodcutter has one leg over the rim, gripping the
rope, looking up. The grandmother holds his sleeve with one hand and waves him on
with the other. Bright light pouring down. Wonderful and funny.
```

### `15-mother.webp` — 땅에 발을 딛으면 안 돼요

```
Wide scene on a terrace of white cloud in the heavens. On the right, a white
heavenly horse stands saddled at the edge of the cloud. In the centre, the
heavenly woman holds the bridle and speaks urgently, one finger raised in warning.
On the left, the woodcutter is already up in the saddle, nodding, half turned
toward the gap in the clouds below. Jade pavilions, silk banners, no shadows.
```

### `16-rooster.webp` — 그날 아침 수탉들이 하늘을 보고 울었대요

```
Wide scene of the cottage yard. In the centre, the woodcutter sits flat on the
ground where he fell, a spilled bowl of red porridge beside him, looking up. High
above, the white horse is disappearing into the clouds - but coming down through
the same gap is the big wooden bucket on its straw rope, with the heavenly woman
and both children in it, waving. On the right, three roosters stand with their
necks stretched straight up, crowing at the sky. Gold morning light. Joyful and
funny.
```

### `end.webp` — 마지막 (가로 4:3)

```
A poor thatched cottage yard at dawn with no people. A big wooden bucket on a
thick straw rope rests upside down by the wall and is being used as a stool, an
A-frame carrier leans beside it, and a white robe with long ribbons hangs folded
over a line, fluttering. A rooster on the fence post looks up at the sky. Warm
first light. Peaceful and happy.
```
