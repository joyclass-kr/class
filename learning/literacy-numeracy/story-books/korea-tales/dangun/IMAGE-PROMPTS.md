# 제미나이 그림 프롬프트 — 단군

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.


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
| 본문 그림 14장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**크고 웅장한 이야기**예요. 우스운 장면은 8번 하나뿐이고 나머지는 넓고 신비롭게 그려 주세요.

- **신단수가 이 책의 중심입니다.** 3번, 5번, 11번, 12번에 같은 나무가 나와야 해요. 산꼭대기에 홀로 선 아주 크고 오래된 나무, 가지가 넓게 퍼지고 밑동에 돌이 둘러쳐져 있습니다.
- **곰과 호랑이는 진짜 짐승으로.** 옷을 입히거나 두 발로 세우지 마세요. 다만 눈빛에 사람의 마음이 담겨 있어야 합니다.
- **9번과 10번의 대비가 이 책의 절정이에요.** 9번은 캄캄한 동굴 속에 웅크린 곰, 10번은 그 자리에 빛이 쏟아지며 선 여인. 두 그림의 구도가 똑같아야 대비가 살아납니다.
- **7번과 9번의 동굴은 진짜 어둡게.** 입구에서 들어오는 빛 한 줄기 말고는 거의 검은 화면이어야 해요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, painterly cel-animation style with clean
outlines and rich colors, in the look of a classic Korean animated film about
myth. Setting is the far distant past: a sea of clouds above, a great forested
mountain, a bare windswept summit with one enormous ancient tree, a dark stone
cave, and later a wide river plain with earthen ramparts. Deep blues and golds
for the heavens, rich greens and browns for the mountain, near-total black for
the cave, warm sunrise gold for the ending. Wide sweeping compositions, small
figures against big landscapes. Solemn and beautiful, never frightening. No text
or letters.
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
Hwanung: a tall young man with long black hair loosely bound, wearing flowing
white and pale gold robes with a wide sash, a calm steady face, faintly lit as
if backlit at all times. Never draw him with a crown or armour. The bear: a real
Asiatic black bear with a white crescent on its chest, shaggy and heavy - drawn
as an animal, never on two legs or in clothes, but with unmistakable patience in
its eyes. The tiger: a real Korean tiger, orange with black stripes, restless and
twitchy. Ungnyeo: a strong-shouldered woman of about thirty in a simple undyed
robe, black hair loose down her back, a plain steady face; a faint white crescent
mark shows at her collar. Dangun: first a baby, then a broad-shouldered young man
in undyed robes with his hair in a topknot. The sacred tree: one enormous ancient
tree alone on a bare summit, wide-spreading branches, a ring of stones around its
base - drawn identically every time.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A great mountain summit rising through a sea of
white cloud fills the tall frame. On the very top, silhouetted against a
gold-and-blue dawn sky, stands one enormous ancient tree with wide-spreading
branches and a ring of stones at its base. Beneath the tree, small and dark, a
bear and a tiger sit side by side looking up. Far above, a break in the clouds
lets a shaft of light down onto the summit. Vast, still, and mythic.
```

## 본문  장 (모두 가로 16:9)

### `01-heaven.webp` — 구름 사이로 내려다보다

```
Wide scene high above the clouds. On the right, Hwanung stands at the edge of a
sea of white cloud in flowing white and gold robes, leaning forward with one hand
shading his eyes, looking down. Through a break in the cloud below, tiny green
mountains and rivers are visible. Deep blue sky, gold light from behind him.
Longing.
```

### `02-descend.webp` — 무리 삼천을 이끌고

```
Wide scene of a great forested mountain seen from the air. Down through a
break in the clouds comes a long column of figures on the wind, Hwanung at its
head with his robes streaming, and just behind him three attendants trailing
wind, rain and cloud in ribbons. Below, the bare summit waits. Sweeping motion,
blue and gold. Enormous scale.
```

### `03-sinsi.webp` — 신단수 아래에 터를 열다

```
Wide scene on a bare windswept mountain summit. In the centre stands one
enormous ancient tree with wide branches and a ring of stones at its base. Beneath
it, Hwanung stands with one arm raised while his people begin to raise poles and
mark out ground around him. Wind in the grass, clouds streaming past below the
summit. Beginning.
```

### `04-rule.webp` — 널리 사람을 이롭게 하라

```
Wide scene of the settlement below the summit. Across the frame, people plant
seed in turned earth, an attendant grinds herbs for a sick child, and two people
who were arguing are being brought together. Hwanung walks among them with his
hands behind his back. Green terraced slopes, warm sunlight, smoke from cooking
fires. Busy and peaceful.
```

### `05-two.webp` — 사람이 되고 싶습니다

```
Wide scene at the sacred tree at dusk. On the left, a black bear with a white
crescent on its chest and an orange tiger lie flat on the ground side by side,
heads down, front paws stretched out. On the right, Hwanung stands looking down
at them, one hand at his chin. Long shadows, gold and violet sky. Solemn, and
strangely moving.
```

### `06-give.webp` — 쑥 한 다발과 마늘 스무 개

```
Wide scene beneath the sacred tree. In the centre, Hwanung sets down a bundle of
grey-green mugwort and a small heap of pale garlic bulbs on a flat stone. On the
left, the bear sniffs at them cautiously. On the right, the tiger has its chin up
and its whiskers back in an unmistakable smirk, one paw already reaching. Morning
light. The tiger is far too confident.
```

### `07-cave.webp` — 빛이라고는 입구에 한 줄기뿐

```
Wide scene inside a deep stone cave, almost entirely black. Far off at the left
edge, a single narrow shaft of daylight from the entrance falls on the cave
floor. In the dark, the shapes of the bear and the tiger are barely visible, two
pairs of eyes catching the light, the pale bundle of mugwort between them. Very
dark, very quiet.
```

### `08-tiger.webp` — 못 하겠다!

```
Wide scene inside the cave. On the right, the tiger bolts for the entrance, body
stretched flat out, mouth open in a roar, the shaft of daylight blazing white
around it as it goes. Mugwort scattered in its wake. On the left, in the dark, the
bear sits perfectly still and watches it go. Black and white light, violent
motion against complete stillness.
```

### `09-bear.webp` — 조금만 더, 조금만 더

```
Wide scene inside the cave, mostly black. In the centre, the bear sits hunched
alone with a stalk of mugwort in its mouth, fur dull and patchy, ribs beginning to
show, eyes half closed but steady. The shaft of light from the entrance has moved
across the floor and changed colour, showing that seasons have passed. Almost no
colour at all. Endurance.
```

### `10-woman.webp` — 삼칠일이 되던 날 아침

```
Wide scene inside the cave with exactly the same composition as the previous
picture, but flooded with white-gold morning light. Where the bear sat, a woman
now kneels in a simple undyed robe, black hair loose, staring down at her own two
open hands. A faint white crescent shows at her collar. Bear fur lies on the floor
around her. Overwhelming light. The turn of the book.
```

### `11-pray.webp` — 날마다 신단수 아래에서

```
Wide scene at the sacred tree in late autumn. In the centre, Ungnyeo kneels alone
at the base of the great tree with her hands together and her forehead bowed to
the stone. Leaves come down all around her, and drifts of fallen leaves have piled
against her knees, showing she has been there a long time. Bare branches, low grey
light. Lonely and persistent.
```

### `12-birth.webp` — 신단수 아래의 울음소리

```
Wide scene at the sacred tree in spring. In the centre, Ungnyeo sits at the foot
of the tree holding a newborn baby wrapped in cloth, her head bent over him,
laughing and crying at once. Beside her stands Hwanung with one hand resting on
the trunk. New leaves overhead, birds, warm green light breaking through. Joy.
```

### `13-asadal.webp` — 이곳을 아사달이라 하겠다

```
Wide landscape scene from a high ridge at sunrise. In the foreground on the
right, the grown Dangun stands with a group of settlers, one arm outstretched.
Below and ahead of them, a huge river bends through a wide fertile plain, mist
lying gold in the low ground, the sun just clearing the far hills. Enormous open
space. Promise.
```

### `14-joseon.webp` — 나라 이름은 조선이다

```
Wide scene of a walled settlement on the river plain in the morning. Earthen
ramparts, thatched roofs, fields laid out in strips, people going out to work with
tools on their shoulders, smoke rising straight up. On a low rise at the centre,
Dangun stands looking out over it all. Gold morning light flooding the whole
plain. Warm, wide and hopeful.
```

### `end.webp` — 마지막 (가로 4:3)

```
A bare mountain summit at dawn with no people. One enormous ancient tree with
wide-spreading branches and a ring of stones at its base, a sea of white cloud
below the ridge, and the first gold light of the sun striking the topmost
branches. Wind in the grass. Vast and peaceful.
```
