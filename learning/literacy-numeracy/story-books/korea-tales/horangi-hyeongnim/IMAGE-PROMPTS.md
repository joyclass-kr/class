# 제미나이 그림 프롬프트 — 나무꾼과 호랑이 형님

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **12개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **14장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


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


## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean mountain country of the Joseon era: deep pine and
oak forest, rocky ravines, mist between ridges, a lone thatched cottage at the
foot of the mountain with a low stone wall and a swept dirt yard. Characters wear
hanbok. Night scenes lit by warm lantern glow and cool blue moonlight. Big
expressive faces, exaggerated comic gestures, lively motion. No text or letters
in the image.
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
The woodcutter: a thin young man in a patched pale grey hanbok with sleeves tied
back, a cloth headband, straw sandals, an A-frame carrying rack, an axe at his
belt. Quick-witted face; terrified at first, then increasingly guilty and
tender-hearted as the story goes on.
The tiger: an enormous orange-and-black striped Korean folk-painting tiger with a
broad round face and huge round eyes. He is never truly menacing after the first
scene - he is the most soft-hearted character in the book, prone to enormous
sentimental tears. In later pictures his fur is greying at the muzzle and brows,
and finally he iswhite-whiskered and old. Draw him with great dignity at the end.
The old mother: a small stooped woman in a plain white and pale-blue hanbok, grey
hair in a low bun, a deeply gentle face.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 호랑이와 나무꾼이 산길에 마주 서 있다.

```
Vertical portrait composition. A misty mountain ravine seen from the path. Filling
the upper two-thirds of the frame, an enormous orange-and-black striped tiger sits
upright on the path like a listening elder, head tilted, huge round eyes soft and
brimming. At the bottom of the frame, small, a thin young woodcutter with an
A-frame rack on his back bows deeply toward the tiger with both hands together.
Tall pines and drifting mist on both sides, pale gold light coming through the
trees from behind the tiger. Tender and slightly comic, not frightening.
```

## 본문 12장 (모두 가로 16:9)

### `01-woodcutter.webp` — 나무꾼이 깊은 골짜기까지 들어간다

```
Wide panoramic scene. Deep mountain forest in the late afternoon. On the left a
thin young woodcutter with an empty A-frame rack climbs a narrow path between
huge pine trunks, wiping his brow, looking up at the ridge. On the right the
ravine opens dark and quiet, mist pooling between the trees. Slanting gold light
through the branches. Very still.
```

### `02-tiger.webp` — 덤불이 갈라지고 커다란 호랑이가 나온다

```
Wide panoramic scene. On the right an enormous striped tiger bursts out through a
wall of undergrowth, mouth open in a roar, one paw raised high, leaves flying. On
the left the woodcutter has dropped his axe mid-air and frozen stiff as a board,
eyes gone to white circles, hair standing straight up, knees knocking together.
Comic terror rather than horror. Green forest gloom.
```

### `03-brother.webp` — "혀, 형님!"

```
Wide panoramic scene. Same forest. On the left the woodcutter has flung himself
face down on the ground with both arms stretched out in a deep bow, one eye
peeking upward. On the right the tiger has stopped mid-pounce, front paw still
lifted in the air, his whole body frozen, head tilted, one enormous eyebrow
raised in bewilderment. Motion lines stopping dead. Very funny.
```

### `04-story.webp` — 나무꾼이 눈물을 짜내며 이야기를 지어낸다

```
Wide panoramic scene. On the left the woodcutter kneels, one hand over his heart
and the other wiping an obviously forced tear, face contorted into an exaggerated
mask of grief, while sneaking a sideways look. On the right the tiger sits back on
his haunches, both front paws on the ground, leaning in, listening with his whole
face. Dappled forest light.
```

### `05-tears.webp` — 호랑이가 큰 눈에서 눈물을 뚝뚝 흘린다

```
Wide panoramic scene. The tiger fills the right two-thirds of the frame, sitting
up with his head thrown back, enormous tears streaming from both eyes in comic
streams and splashing on the ground, one paw pressed to his chest. On the left the
small woodcutter stands with his mouth slightly open, taken aback, one hand half
raised as if to pat the tiger and not quite daring. Warm late light through mist.
```

### `06-farewell.webp` — 호랑이가 지게를 지고 산 밑까지 데려다준다

```
Wide panoramic scene. Dusk on a mountain path going downhill to the right. The
enormous tiger walks in front with the woodcutter's A-frame rack strapped
absurdly onto his striped back, piled high with firewood, padding along with
great dignity. Behind him on the left the woodcutter trots to keep up, hands
empty, glancing back up the mountain, legs still wobbly. Long violet shadows,
first stars.
```

### `07-gift.webp` — 아침마다 마당에 짐승과 산나물이 놓여 있다

```
Wide panoramic scene. Early morning in the cottage yard, frost in the air. On the
right a large wild boar lies neatly laid on a mat in the swept dirt yard, with a
bundle of mountain greens and herbs beside it. On the left the woodcutter stands
in the open doorway in his undershirt, hair sticking up, staring with both hands
on his head. A single line of huge pawprints leads away toward the mountain.
Pale pink dawn light.
```

### `08-mother.webp` — 어머니가 어두운 산 쪽을 오래 바라본다

```
Wide panoramic scene. Night. On the left the small old mother stands alone in the
middle of the yard, seen mostly from behind, her hands folded in front of her,
facing the black mountain that rises on the right under a scattering of stars. A
single paper window glows warm yellow behind her. The woodcutter watches from the
doorway, hesitant. Deep blue night, very quiet, moving.
```

### `09-years.webp` — 어머니가 밤마다 마당에 밥 한 그릇을 내놓는다

```
Wide panoramic scene. Moonlit yard. On the left the old mother, now more stooped,
sets a single brass bowl of rice on a flat stone by the gate, both hands careful,
her lips moving. On the right, just at the edge of the pines beyond the wall, two
round golden eyes and the faint striped shape of the tiger wait in the dark,
watching her. Silver moonlight, warm little glow from the bowl. Tender.
```

### `10-guilt.webp` — 나무꾼은 밥이 목에 넘어가지 않는다

```
Wide panoramic scene. Inside the lamplit room at night. On the right the
woodcutter, now a grown man, sits at a low table with a full rice bowl untouched
in front of him, chopsticks resting across it, staring down at nothing, one hand
pressed to his forehead. On the left, through the open door, the dark shape of the
mountain and a sliver of moon. Warm orange lamp against cold blue night. Heavy
and quiet.
```

### `11-confess.webp` — 나무꾼이 무릎을 꿇고 사실을 털어놓는다

```
Wide panoramic scene. The mountain ravine again, autumn, leaves on the ground. On
the left the woodcutter kneels on both knees with his head bowed almost to the
earth, hands flat on the ground before him. On the right the tiger stands facing
him, much older now - white around the muzzle and brows, fur duller, one shoulder
bonier - listening in total stillness, eyes half closed. Cold clear air, low
amber light, absolute silence.
```

### `12-know.webp` — "진작 알고 있었다." 호랑이가 산속으로 걸어 들어간다

```
Wide panoramic scene. The same ravine a moment later. On the right the old white-
muzzled tiger walks away from the viewer up into the misty pines, seen from
behind, his tail low, head high, unhurried. On the left the woodcutter has looked
up from his knees, face lifted, one hand half reaching after him, tears on his
cheeks. Shafts of pale gold light between the trunks, mist closing behind the
tiger. Quiet, warm, a little heartbreaking.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

나무꾼이 산을 올려다본다.

```
Wide scene at dawn. The cottage yard from behind: the grown woodcutter stands at
the low stone wall with a brass bowl of rice in his hands, looking up at the
misty green mountain that fills the right side of the frame. First light on the
ridge. Empty path, drifting mist. Peaceful and full of feeling.
```
