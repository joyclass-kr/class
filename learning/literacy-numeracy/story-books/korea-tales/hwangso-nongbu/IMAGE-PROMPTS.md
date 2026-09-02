# 제미나이 그림 프롬프트 — 황소가 된 농부

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> **4 : 3**으로 받아서 위아래를 조금 잘라 씁니다(각 5.5퍼센트). 이 책의 마지막
> 그림이니 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 다시 만들 그림 — `04-become` 한 장

받은 그림 안에 **「MOOO?!」라는 영어 말풍선**이 박혀 있습니다. 우리말 그림책에 영어가 들어간 셈이라 그 한 장만 다시 만들어 주세요. 그림 자체는 아주 좋습니다 — 반쯤 소가 된 몸에 바지만 사람 것이 남아 있고 노인이 팔짱을 낀 채 지켜보는 구도 그대로면 됩니다.

아래 `04-become` 프롬프트에 글자 금지 문장을 맨 앞으로 옮겨 두었습니다. 문단 끝에 묻어 두면 잘 안 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

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


## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean farming village of the Joseon era: thatched-roof
cottages, earthen walls, ploughed fields and rice paddies, a village market of
straw-mat stalls, a cattle shed, pine hills. Warm earth palette - straw yellow,
clay brown, grass green, sky blue. Big expressive faces, exaggerated comic
gestures. Never show the ox being struck or hurt. No text or letters.
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
The farmer: a man in his thirties with a round face and droopy sleepy eyes, messy
topknot, rumpled off-white hanbok, always slouching - later, after he turns back,
the same face but upright and bright-eyed. His wife: a brisk woman in a faded
green and white hanbok, hands on hips, one eyebrow permanently raised. The old
man of the mountain: a lean elder with a long white beard and a wide straw hat
that shadows his eyes, quietly amused, faintly mischievous. The ox: a large
yellow-brown Korean ox with a broad back and gentle dark eyes - his eyes should
carry the farmer's very human dismay throughout. The ox mask: a simple carved
wooden ox-head mask, brown, painted like a Korean folk dance mask.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A carved wooden ox-head mask hangs from a low
branch of a large tree, swaying slightly, seen up close in the foreground. Behind
and far below, a small Korean village with thatched roofs and ploughed fields in
warm afternoon light. Long shadows stretch toward the viewer. Curious and a
little ominous.
```

## 본문 열 장 (모두 가로 16:9)

### `01-lazy.webp` — 해가 중천인데 누워 있는 농부

```
Wide cutaway view of a modest Korean room with the front wall removed. On the
left, the farmer sprawls flat on his back on the floor, one arm over his eyes,
mouth open, clearly asleep at midday. On the right, his wife stands in the
doorway with hands on hips, one eyebrow up, pointing outside toward the fields.
Bright noon sunlight streaming in. Comic domestic scene.
```

### `02-leave.webp` — 슬그머니 집을 나서는 농부

```
Wide village scene. On the left, the farmer sneaks away down a dirt path with
exaggerated tiptoeing steps, hands raised, glancing back over his shoulder with a
guilty face. On the right, his house sits with the door still open. The path
leads off toward pine-covered hills. Bright day, long grass along the path.
```

### `03-mask.webp` — 나무 아래의 노인

```
Wide scene under an enormous old tree on a mountain path. On the right, a lean
white-bearded elder in a wide straw hat sits cross-legged on a root, holding up a
carved wooden ox-head mask in both hands, a faint knowing smile. On the left, the
farmer leans in with both hands on his knees, eyes wide and greedy with interest.
Dappled green light.
```

### `04-become.webp` — 탈을 쓰자 황소가 되다

```
ABSOLUTELY NO TEXT ANYWHERE IN THIS IMAGE. No speech bubbles, no letters, no
sound effects, no "moo", no writing of any kind. This is a Korean picture book.

Wide scene under the same tree, mid-transformation and very comic. In the centre,
the farmer has the ox mask pressed to his face; his hands are already turning
into hooves, brown fur sweeping up his arms, his hanbok bursting at the seams,
one leg still human. He is bellowing with his mouth wide open, but draw the sound
only through his face and posture - never as written letters. Motion lines and
puffs of smoke. On the right, the elder watches calmly with his arms folded,
wearing a Korean gat or a plain topknot, not a conical straw hat.
```

### `05-sold.webp` — 장터에서 팔리는 황소

```
Wide bustling village market scene with straw-mat stalls. In the centre, the
elder holds a rope halter and gestures proudly toward a large yellow-brown ox
whose eyes are wide with very human panic and whose mouth hangs open. On the
right, a buyer in work clothes counts coins into the elder's palm. Villagers and
other animals fill the background. Sunny and busy.
```

### `06-work.webp` — 새벽부터 밭을 가는 황소

```
Wide field scene at dawn. The ox pulls a wooden plough from right to left across
a broad ploughed field, head down, straining, breath steaming in the cold air.
The new owner walks behind holding the plough handles, calling out. Long furrows
stretch to the edges of the frame, pale pink and grey sunrise sky. Hard work, but
nothing cruel shown.
```

### `07-regret.webp` — 외양간에서 후회하는 황소

```
Wide cutaway view of a straw-roofed cattle shed at night. The ox lies on straw
filling most of the frame, chin resting on the ground, one big tear rolling down
his cheek, eyes full of human sorrow. A trough of dull fodder sits untouched
beside him. Through the shed opening on the right, the moon and the distant
silhouette of a village. Quiet and touching.
```

### `08-radish.webp` — 무를 뽑아 먹는 황소

```
Wide scene beside a radish field. On the left, rows of white Korean radishes with
green tops in dark soil. In the centre, the ox has pulled one up and is chewing
it whole, leaves sticking out of his mouth, eyes half closed in pure hunger,
completely absorbed. On the right, a rope trails loose behind him. Bright sunny
afternoon.
```

### `09-human.webp` — 사람으로 돌아오다

```
Wide scene in the radish field, the moment of transformation. In the centre, the
farmer stands upright among the radish rows, arms flung wide, mouth open in
astonishment, fur and hooves vanishing into puffs of smoke around him, the ox
mask lying split on the ground. On the right, the owner has fallen backward onto
his seat, hat rolling away, eyes like saucers. Explosive comic energy.
```

### `10-work-hard.webp` — 부지런해진 농부

```
Wide sunny field scene. On the left, the farmer works a hoe with real energy,
sleeves rolled, sweat flying, a wide grin on his face. On the right, his wife
carries a lunch tray along the path, laughing, one hand raised in greeting.
Behind them, a neat well-tended field and their thatched house. Bright green and
gold, warm and cheerful.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean field at sunset, no people. A wooden plough rests at the edge of a
neatly ploughed field, a hoe leaning against a low stone wall, rows of green
radish tops in the foreground, warm orange light across the furrows. Peaceful and
satisfied.
```
