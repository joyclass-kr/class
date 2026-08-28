# 제미나이 그림 프롬프트 — 삼년 고개

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


이 책은 파랑새와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **열 개의 펼침**으로 되어 있어요. 펼침마다 그림 한 장씩, 여기에 표지와 마지막 장을 더해 모두 **열두 장**입니다.

아래 프롬프트를 제미나이에 그대로 넣어 생성한 뒤, 파일명을 정확히 맞춰서 `images/` 폴더에 저장하면 자동으로 책에 나타납니다. (그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

실제 화면에서 그림칸을 재 본 값이에요. 비율이 맞지 않으면 남는 쪽이 잘려나갑니다.

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean rural village of the Joseon era: thatched-roof
cottages, low stone walls, pine trees, rolling green hills, dirt paths.
Characters wear hanbok. Warm sunny palette (grass green, straw yellow, clay
brown, sky blue, white hanbok). Big expressive faces, exaggerated comic gestures,
lively motion. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
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
Bak the old man: a Korean elder in his seventies, wiry and straight-backed, thin
white beard, hair in a topknot under a small black horsehair hat, plain off-white
hanbok with a short grey vest, often carrying a wooden A-frame carrier (jige)
loaded with straw sandals. Very expressive - cheerful, then comically terrified,
then joyful. Grandmother: a kind round-faced elderly woman in a pale green and
white hanbok. Deok-i: a bright ten-year-old boy, short cropped hair, round
cheeks, pale blue and white hanbok, always mid-gesture. Villagers: farmers in
muted hanbok of straw, indigo and brown.
```

---

## 표지 — `cover.webp` (세로 2:3)

```
Vertical portrait composition. A grassy mountain pass at golden hour, a winding
dirt path climbing from a small thatched-roof village at the bottom up over the
ridge. An old Korean man in white hanbok with a wooden A-frame carrier on his
back stands at the top of the pass, small against a wide evening sky. Pine trees
frame both sides. Warm and inviting.
```

## 본문 열 장 (모두 가로 2:1)

### `01-pass.webp` — 삼년 고개를 살금살금 넘는 사람들

```
Wide panoramic view of a low grassy mountain pass with a narrow dirt path. Four
or five villagers in hanbok cross it in single file, every one of them staring
down at their own feet, stepping with exaggerated caution, arms out for balance.
A mother holds a child's hand to stop him running. A gnarled pine and a cracked
boulder stand beside the path. Comic, hushed, everyone tiptoeing.
```

### `02-sandals.webp` — 밤에 짚신을 삼는 박 노인

```
Wide interior of a simple Korean thatched-roof house at night, seen from the
side. On the left, an old Korean man sits cross-legged on the ondol floor under
an oil lamp, weaving a straw sandal with practiced hands, a neat row of finished
sandals lined up beside him. On the right, through the open paper-screen door,
a dark blue night sky with stars. Warm lamplight, cozy.
```

### `03-homeward.webp` — 빈 지게 지고 콧노래 부르며 돌아오는 길

```
Wide sunset landscape. An old Korean man walks a country road from left to
right, empty wooden A-frame carrier on his back, chin up, mouth open in a happy
hum, one hand swinging. Rice paddies and a small thatched village on the right,
the sun sinking behind a mountain ridge on the left, long golden light stretching
across the road.
```

### `04-stumble.webp` — 돌부리에 걸려 넘어지는 순간

```
Wide shot at the top of the mountain pass. The exact instant of the fall: an old
Korean man pitching forward, body almost horizontal, eyes and mouth wide open in
comic alarm, straw sandal caught on a half-buried stone, his empty A-frame
carrier flying sideways off his back, dust puffing up. Motion lines. The gnarled
pine on the right, open sky.
```

### `05-realize.webp` — 여기가 삼년 고개라는 걸 깨닫는 장면

```
Wide shot of the mountain pass. An old Korean man sits slumped on the dirt path
on the right, face drained white, mouth open in horror, both hands on his cheeks,
staring at the cracked boulder and gnarled pine on the left that tell him where
he is. His A-frame carrier lies tipped over beside him. Dramatic, comic despair.
```

### `06-bedridden.webp` — 자리에 누워 벽만 보는 박 노인

```
Wide interior of a Korean thatched-roof house. On the right, an old man lies on
a floor sleeping mat facing the wall, blanket pulled to his chin, eyes open and
hollow. On the left, a kind elderly woman in pale green hanbok kneels holding a
small meal tray, looking worried, the food untouched. Soft dim light through the
paper-screen door.
```

### `07-doctor.webp` — 아픈 데가 없다는 의원

```
Wide interior of the same house. In the centre, a village doctor in a scholar's
robe and horsehair hat kneels with two fingers on the old man's wrist, eyebrows
raised, head tilted in complete puzzlement, free hand spread in a "there's
nothing wrong" gesture. The old man lies flat with his eyes shut, refusing to
listen. On the right, neighbours peer in through the doorway looking worried.
```

### `08-deoki.webp` — 찾아온 덕이

```
Wide interior of the same house. On the right, a bright ten-year-old boy in pale
blue hanbok sits cross-legged beside the sleeping mat, leaning forward with both
hands on his knees, head tilted, asking a question. On the left, the old man lies
propped on one elbow, gaunt and gloomy, answering weakly. Warm light through the
paper-screen door.
```

### `09-counting.webp` — 손가락을 꼽으며 셈하는 덕이

```
Wide interior. On the left, the boy in pale blue hanbok is up on his knees,
beaming, counting on his raised fingers, eyes sparkling with a bright idea. On
the right, the old man has shot upright on his mat, blanket falling away, eyes
enormous, mouth open, one finger raised as the realisation hits him. Big comic
contrast between the two.
```

### `10-rolling.webp` — 데굴데굴 구르는 박 노인

```
Wide panoramic view of the grassy top of the mountain pass. In the centre an old
Korean man rolls sideways down a gentle slope, arms tucked, hanbok tumbling,
mouth wide open in laughter, drawn as a blur of motion with curved speed lines. A
crowd of villagers on both sides counts on their fingers and cheers, some doubled
over laughing, the boy in blue jumping with both arms up. Bright open sky.
Joyful, full of movement.
```

## 마지막 — `end.webp` (가로 2:1)

```
A peaceful mountain pass at dawn seen from a distance, the dirt path empty and
inviting, wildflowers along the roadside, a pair of worn straw sandals resting on
a flat stone, soft morning mist in the valley below. Quiet and warm, no people.
```
