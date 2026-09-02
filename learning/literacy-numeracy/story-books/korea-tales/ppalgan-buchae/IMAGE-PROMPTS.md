# 제미나이 그림 프롬프트 — 빨간 부채 파란 부채

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

처음부터 끝까지 **웃기는 이야기**예요. 코는 굵기가 일정한 긴 원통처럼 만화적으로 그려 주세요. 장면마다 코가 얼마나 길어졌는지가 한눈에 보여야 합니다.

**이 책에서 가장 중요한 두 장면입니다.**
- **8번** — 부자네 식구가 세간을 이고 지고 줄줄이 집을 나서는 장면. 보따리를 머리에 인 할머니, 지게에 항아리와 세간을 잔뜩 진 남자, 소매로 눈물을 찍는 여자, 그 뒤에서 부채를 흔들며 신난 영감. 식구들은 울상인데 영감만 신나 있는 대비가 웃음입니다.
- **11번** — 옥황상제가 밥을 드시다가 상이 흔들리는 장면. 하늘나라 궁전은 구름 위에 금빛으로 빛나게, 상에는 생선과 과일과 국그릇을 차려 놓으세요. 국그릇의 국물이 찰랑거리고, 옥황상제가 수저를 든 채 눈을 부릅뜬 얼굴이어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, in the look of an early-1990s Korean
television cartoon. Settings: a sunny pine hillside, a wealthy family's
tiled-roof house with a feast courtyard, a village road, and a golden heavenly
palace floating above the clouds. Sunny warm palette below, luminous gold and
pastel cloud colours above. Big exaggerated cartoon expressions, heavy motion
lines. Long noses are smooth even tubes, comic and never grotesque. Nobody is
hurt. No text or letters in the image.
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
Kim Cheomji: a scrawny middle-aged man with a thin moustache, a battered
horsehair hat and a patched grey hanbok, lazy droopy eyes that light up whenever
he has a bad idea. The rich old master: a very plump elderly man in fine dark
blue silk with a white beard, loud and greedy; his nose grows to enormous length
in the last chapter. His family: an elderly wife, a grown son, a daughter-in-law
and servants - all in decent hanbok, all miserable in the moving-out scene. The
Jade Emperor: a tall dignified old figure with a long grey beard, a golden crown
with hanging beads and wide golden-yellow robes, seated at a white dining table.
His attendant: a young court lady in green and gold robes with looped black hair.
The fans: one flat bright red folding fan and one flat bright blue folding fan.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A golden heavenly palace floats among pink and
lilac clouds in the upper half of the tall frame, glowing with light. Rising from
the bottom of the frame and passing right up through the clouds beside it, an
absurdly long smooth nose, with a small startled blue bird flying away from it.
At the very bottom, tiny, a man lies in a courtyard fanning himself. Funny and
grand at once.
```

## 본문  장 (모두 가로 16:9)

### `01-nap.webp` — 산에서 낮잠을 자다 깨어 보니

```
Wide sunny pine hillside scene. On the left, Kim Cheomji sprawls on his back in
the grass under a pine, hat tipped over his face, one leg crossed over the other,
mid-yawn as he wakes. On the right, on a flat stone beside him, a red fan and a
blue fan lie neatly side by side, as if placed there. Bright green and gold,
comic.
```

### `02-red.webp` — 빨간 부채를 부치자 코가 쑥

```
Wide hillside scene. In the centre, Kim Cheomji sits cross-legged fanning
himself with the red fan, eyes half closed in comfort - and his nose has shot out
a hand's length, drawn as a smooth tube with motion lines showing it extending.
He has not noticed yet. A butterfly perches on the tip. Very funny, sunny.
```

### `03-blue.webp` — 파란 부채로 도로 줄이다

```
Wide hillside scene split in two. On the left, Kim leaps up with both eyes
bulging and hands flying, having just seen his own nose. On the right, a moment
later, he fans furiously with the blue fan while the nose shrinks back with comic
retraction lines. Alarm is already turning into a sly grin. Fast comic timing.
```

### `04-feast.webp` — 부잣집 잔치에 숨어들다

```
Wide scene in a rich family's courtyard during a feast. Low tables laden with
food, guests in fine hanbok laughing, musicians at the side. On the right, the
plump old master sits at the head table, mouth wide with laughter. On the far
left, Kim Cheomji peeks from behind a wooden pillar, red fan half hidden against
his chest, eyes narrowed. Sunny and busy.
```

### `05-nose.webp` — 쑥쑥 자라는 영감의 코

```
Wide courtyard scene, chaos. In the centre, the old master's nose has grown
three hand-spans long and knocked a bowl off the table; he stares down its length
cross-eyed with both hands raised. All around him guests leap up, food flying,
hats falling, mouths open in shock. On the far left, Kim hides behind the pillar
biting his knuckle. Peak comedy.
```

### `06-cure.webp` — 파란 부채로 고쳐 주자

```
Wide courtyard scene, calmer. In the centre, Kim Cheomji fans the old master with
the blue fan wearing a solemn healer's expression, while the master's nose
retracts to normal and his eyes stream with relief. But the master's eyes have
already slid sideways and locked onto the blue fan, pupils gone greedy. Warm gold
light, the exact moment the trouble starts.
```

### `07-trade.webp` — 이 집을 통째로 주겠소

```
Wide scene on the verandah of the tiled-roof house. On the right, the old master
leans in with both arms flung wide, gesturing at his whole house and courtyard,
face flushed with greed. On the left, Kim Cheomji holds the two fans behind his
back with one eyebrow raised, half tempted, half alarmed. Behind them the fine
house, the storehouse, the full yard. Absurd bargain.
```

### `08-moveout.webp` — 세간을 이고 지고 집을 나서는 식구들

```
Wide scene on a village road, a single long line of figures walking from right to
left. In front, an elderly woman balances a big cloth bundle on her head. Behind
her, a man bent under an A-frame carrier stacked absurdly high with chests, jars
and a washbasin. Then a young woman in a red skirt wiping her eyes with her
sleeve, carrying a bundle. Behind them all, the plump old master strides along
grinning and waving the red fan, delighted, and a servant follows with the last
box. Everyone miserable except him. Sunny road, distant hills.
```

### `09-play.webp` — 빈 마당에서 신이 난 영감

```
Wide scene in the now empty courtyard. In the centre, the old master reclines on
a straw mat in the middle of a bare yard, fanning himself with the red fan, legs
kicking with delight, his nose already a metre long and rising. The house behind
him is stripped - open doors, empty storehouse, nothing in the yard. Bright
midday, gleeful and stupid.
```

### `10-sky.webp` — 구름을 뚫고 올라가는 코

```
Wide scene, mostly sky. From the bottom left of the frame, an enormously long
smooth nose rises across the whole picture, past a roof, past a pine, and up
through a bank of white clouds at the top right. A small blue bird veers away
from it in fright, wings blurred, beak open. Bright blue sky, absurd and
beautiful.
```

### `11-emperor.webp` — 밥을 드시다 상이 흔들리고

```
Wide interior of a golden heavenly palace hall. On the left, the Jade Emperor
sits at a white round dining table in golden-yellow robes and a tall crown with
hanging beads, a cup halfway to his lips, eyes suddenly wide and glaring. On the
right, a court lady in green and gold robes sits opposite him, cup raised,
startled. On the table: a whole fish on a plate, a bowl of red apples and purple
grapes, a lidded soup tureen with the soup visibly sloshing. Motion lines shaking
the table. Very funny.
```

### `12-pillar.webp` — 구름 위에 솟은 벌건 기둥

```
Wide scene on a cloud terrace outside the palace. On the right, the Jade Emperor
stands pointing down with one finger, brows crashed together, sleeves sweeping,
thoroughly annoyed; the court lady peers over his shoulder. On the left, poking up
through the cloud floor, the pale round tip of an enormous nose, sitting there
like a badly placed post. Golden light, pink clouds. Deadpan absurdity.
```

### `13-tied.webp` — 꽁꽁 묶인 코

```
Wide scene split between sky and ground. Above, two heavenly attendants wind
thick golden rope around the nose tip, pulling it tight with braced feet. Below,
in the empty courtyard, the old master leaps and writhes with both hands on his
face, mouth open in a howl, the blue fan flapping wildly in one hand. Motion
lines top and bottom. Slapstick.
```

### `14-fall.webp` — 짚더미에 쿵, 그리고 돌려준 집

```
Wide courtyard scene. On the left, the old master has landed head first in a
haystack with only his legs sticking out, straw exploding outward, his nose back
to normal size. High above, the red and blue fans tumble away on the wind, already
small. On the right, Kim Cheomji holds out a folded paper deed toward the
returning family, who are coming back through the gate with their bundles, faces
lighting up. Warm and satisfying.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean courtyard at sunset, no people. A haystack with a person-shaped
dent in it, a battered horsehair hat resting on top, and high in the orange sky
two tiny specks - one red, one blue - drifting away on the wind. Warm and wry.
```
