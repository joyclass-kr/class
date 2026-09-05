# 제미나이 그림 프롬프트 — 박씨전

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

6장이고 장마다 그림이 3장씩, 여기에 표지와 마지막 장을 더해 모두 **20장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 18장 | 1.33 : 1 | **가로 4 : 세로 3** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.33 : 1 | **가로 4 : 세로 3** |

> **`end` 그림은 「읽고 나서」 쪽에 들어갑니다.** 쪽 위쪽에 가로로 얹히므로 비율은 아래 표대로면 됩니다.
> 다만 글 분량에 따라 높이가 조금씩 달라지니, **중요한 것은 한가운데에 두고 위아래 가장자리는 여유를 두세요.**

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolour, bold clean outlines, saturated but
slightly muted colours, realistic human proportions with expressive faces.
Setting is Joseon Korea in the 1630s: a high official's tiled compound in
Hanyang; a tiny one-room cottage behind it in a bamboo grove ringed by trees
planted in four directions; the winter road to Namhan mountain fortress; a wide
frozen river crowded with captives and soldiers. Everyone wears period hanbok;
the Qing soldiers wear dark armour, fur caps and long braids. Warm lamplit
interiors, cold blue winter exteriors. No text or letters in the image.
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

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Lady Park (Bakssi), chapters 1-3 before the change: a young woman in modest
hanbok whose face is dark, pockmarked and lopsided, one eye larger than the
other, a flat nose and a crooked mouth - but drawn KINDLY: her posture is
straight and calm, her eyes are steady and intelligent, her hands are graceful.
Never make her disgusting; she is plain in a way the reader can grow fond of.
Lady Park after the change (end of chapter 3 onward): the same height and
posture and the same steady eyes, now with a fair oval face, clear skin, long
black hair. Same modest clothes as before - she does not start wearing silk.
Yi Sibaek, her husband: a handsome young scholar of sixteen to twenty in a
white or pale blue scholar's coat and black horsehair hat, proud at first,
ashamed later, steady at the end.
Minister Yi (Yi Sanggong), her father-in-law: a dignified older man with a grey
beard in a dark official's robe, kind, amused eyes.
Madam Yi, her mother-in-law: a plump well-dressed woman who frowns and sighs a
lot, later softened.
Park Cheosa, her father: a lean old mountain hermit in a wide straw hat and rough
hemp clothes, long white beard, clear bright eyes.
Gyehwa, the maid: a small quick girl of fifteen growing to eighteen, in plain
brown servant's hanbok with her hair in a braid, devoted, brave.
Gi Hongdae, the assassin: a beautiful woman in rich silk with a geomungo zither,
smiling too much, a dagger hidden in her sleeve.
Yonggoldae and Yongguldae, the Qing generals: two huge men in dark lamellar
armour with fur-trimmed helmets and long braids, big round fierce comic faces,
never repulsive.
The tree soldiers: trees that have become warriors in coloured armour - blue on
the east, white on the west, red on the south, black on the north - with bark
faces and leafy plumes, bold and cartoonish.
Pihwadang: a one-room thatched cottage in a bamboo grove behind the big house,
trees planted in a ring around it.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 피화당 뜰에 선 박씨와, 담 밖에 몰려선 군사들.

```
Vertical portrait composition. A small thatched cottage in a bamboo grove at the
bottom of the frame, and in front of it a young woman in plain hanbok standing
very straight with one hand raised. The trees around the cottage are just
beginning to change - bark faces appearing, branches thickening into armoured
arms. Beyond the low wall, filling the upper half of the frame, a crowd of
armoured soldiers on horseback rear back in alarm, a huge general at their
front with his mouth open. Winter dusk, warm lamplight from the cottage window,
cold blue everywhere else. Calm woman, panicking army.
```

## 본문 18장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — 삿갓 쓴 노인이 대문 앞에 서다

```
Wide 4:3 scene. Low angle from the gate stones looking up. A lean old man in a
wide straw hat and rough hemp clothes stands very still before a grand tiled
gate, one hand on a staff, a long white beard, bright clear eyes under the hat
brim. A gatekeeper peers at him doubtfully. Spring morning, blossom petals
drifting. The old man is small against the gate and somehow larger than it.
```

### `story-01-b.webp` — 1장 — 가마에서 내린 신부

```
Wide 4:3 scene. A courtyard crowded with a wedding: guests, red lanterns, a
table piled with food. In the centre a bride in a red and green wedding robe
steps down from a palanquin, her face hidden by a veil of hanging strings.
Everyone cranes to see. On the right the young groom in his ceremonial robe
stands stiffly, looking anywhere but at her. Bright festive colour, tense
faces.
```

### `story-01-c.webp` — 1장 — 첫날밤, 등을 돌리고 앉은 신랑

```
Wide 4:3 scene. A candlelit bridal room. On the left the groom sits with his
back turned to the room and to the viewer, shoulders rigid, staring at the
wall. On the right the bride sits upright and still in her wedding robe, her
plain pockmarked face lit by the single candle - calm, steady eyes, hands
folded. The wide empty floor between them. Quiet and sad, not cruel.
```

### `story-02-a.webp` — 2장 — 뒤뜰에 지은 작은 집

```
Wide 4:3 scene. Behind the big tiled house, in a bamboo grove, a tiny one-room
thatched cottage newly built. The young woman in plain hanbok stands in front
of it directing two workmen who are planting saplings in a ring around the
house - she points to the exact spot. A small maid of fifteen watches from the
doorway hugging a bundle. Green spring light through bamboo.
```

### `story-02-b.webp` — 2장 — 하룻밤에 지은 조복

```
Wide 4:3 scene. Dawn in the minister's study. The old minister holds up a
magnificent dark blue court robe to the window light, mouth open in wonder; a
crane embroidered on the sleeve seems ready to fly. The small maid kneels with
the empty wrapping cloth. In the doorway behind, the plump mother-in-law has
stopped mid-step, staring. Pale gold morning light.
```

### `story-02-c.webp` — 2장 — 비루먹은 말 한 마리

```
Wide 4:3 scene. The courtyard. The maid leads in a pitiful horse - ribs showing,
patchy coat, drooping head - on a rope. Servants and family double over
laughing, pointing, comic tears flying. On the right the young woman with the
plain face stands apart and looks only at the horse's legs with a small,
knowing expression. Bright afternoon, dust in the air.
```

### `story-03-a.webp` — 3장 — 푸른 연적

```
Wide 4:3 scene. Close-up. Two hands: the young scholar's reluctant hand and
the maid's insistent one, and between them a small water dropper of pale blue
stone shaped like a lotus bud. Behind, out of focus, the scholar's turned-away
face and the maid's stubborn one. Lamplight, deep shadow around the edges.
```

### `story-03-b.webp` — 3장 — 달빛 아래서 허물을 벗다

```
Wide 4:3 scene. Night, a full moon over the cottage garden. The old hermit
stands with one hand raised, chanting. Before him his daughter stands with her
eyes closed as a thin dark husk lifts away from her face like a shed skin,
caught mid-air by the moonlight; beneath it a fair calm face is appearing. In
the cottage doorway the maid claps both hands over her mouth. Silver light,
deep blue shadows, magical and hushed.
```

### `story-03-c.webp` — 3장 — 피화당 문 앞에 무릎을 꿇은 시백

```
Wide 4:3 scene. Morning in the bamboo grove. The young scholar kneels in the
dirt before the cottage door, head bowed so low his hat nearly touches the
ground. The door has just opened; the young woman - now fair-faced, same plain
clothes - stands in it looking down at him, not smiling, not angry. The maid
peeks from behind the door frame wiping her eyes. Soft green light.
```

### `story-04-a.webp` — 4장 — 북쪽 하늘의 검은 기운

```
Wide 4:3 scene. Night on the cottage veranda. The young woman stands looking
up, her husband seated beside her following her gaze. Above them the whole
northern sky is stained with a slow dark swirl among the stars, like ink in
water. Her face is grave, lit faintly from below by a lamp. Cold and ominous.
```

### `story-04-b.webp` — 4장 — 거문고를 안고 온 여인

```
Wide 4:3 scene. Dusk at the big house gate. A stunningly dressed woman in
crimson silk with a geomungo zither in her arms smiles at the gatekeeper,
head tilted; in the fold of her sleeve, just visible to the viewer and no one
else, the hilt of a dagger. Behind her the empty lane, lanterns being lit.
Beautiful and wrong.
```

### `story-04-c.webp` — 4장 — 술상 앞에 잠든 자객

```
Wide 4:3 scene. Inside the cottage at night. The woman in crimson silk has
collapsed asleep over her zither, hair spilling. Across the low table the young
woman sits perfectly upright, calm, having just laid a bright dagger down on
the table between the wine cups. The maid holds the wine jar, wide-eyed. One
lamp, strong shadows.
```

### `story-05-a.webp` — 5장 — 남한산성으로 가는 눈길

```
Wide 4:3 scene. A steep snow-covered mountain road in a blizzard. A long line
of officials and guards struggles upward toward a stone fortress wall on the
ridge; a horse has slipped and men are hauling it up. In the foreground a
fleeing family with bundles looks back down at the smoke over the city far
below. Grey-white, bitter, urgent.
```

### `story-05-b.webp` — 5장 — 나무들이 군사가 되다

```
Wide 4:3 scene. THE big picture. In the cottage garden the ring of trees has
burst into life - trunks straightening into armoured warriors with bark faces
and leafy plumes, blue armour on the east side, white on the west, red on the
south, black on the north, branches swinging like clubs. Qing soldiers tumble
back over the wall, helmets flying, comic terror. In the middle the young woman
stands calm with one hand raised. Bold, bright, exciting.
```

### `story-05-c.webp` — 5장 — 안개 속에 갇힌 용골대

```
Wide 4:3 scene. Thick white fog fills the frame. A huge armoured general on a
rearing horse, fur helmet askew, turns this way and that, sword out, eyes
bulging - he can see nothing. Faint tree-shapes loom on all sides. At the very
edge of the fog, small and clear, the young woman stands watching him. White,
grey, one dark bulk in the middle. Lost giant.
```

### `story-06-a.webp` — 6장 — 얼어붙은 강가의 사람들

```
Wide 4:3 scene. A wide river bank in winter. Hundreds of captives - women,
children, old men - stand roped in long lines under guard, breath steaming; a
small child clings to a mother's skirt in the foreground. Boats wait at the
water's edge. Down the bank toward them, alone, walks the young woman in plain
hanbok with the maid a step behind. Grey sky, one small upright figure.
```

### `story-06-b.webp` — 6장 — 말에서 내려 절하는 장수

```
Wide 4:3 scene. Low angle. The frozen river behind, hailstones still bouncing
off the soldiers' helmets. The huge general has dismounted and bows deeply,
helmet in his hands, before the young woman who stands with a closed fan at her
side. Behind him soldiers drop their weapons; behind her the roped captives
lift their heads. Dramatic grey-and-white light.
```

### `story-06-c.webp` — 6장 — 충렬부인

```
Wide 4:3 scene. The palace throne hall. The king, tired and thin, has come down
from his throne and stands before the young woman in plain hanbok holding out a
scroll with both hands; she bows her head. Rows of officials in coloured robes
kneel on either side, several with their faces very red. Warm gold hall, cold
light from the open doors behind her.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

전쟁이 끝난 뒤의 피화당.

```
Wide 4:3 scene. Late spring in the bamboo grove. The little thatched cottage,
its ring of trees now just ordinary green trees in full leaf. On the veranda the
young woman sits reading, and beside her an old grey-bearded man holds two
small children on his knees telling them something with wide funny gestures
while a grey-haired maid brings tea. Nobody looks at the viewer. Warm, ordinary,
peaceful.
```
