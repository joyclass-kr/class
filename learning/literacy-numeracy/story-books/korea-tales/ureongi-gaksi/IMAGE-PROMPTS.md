# 제미나이 그림 프롬프트 — 우렁이 색시

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

**따뜻하고 조용한 이야기예요.** 슬랩스틱은 넣지 마세요. 색시가 우렁이에서 나오는 여덟 번째 장면이 이 책에서 가장 아름다운 그림이 되어야 합니다. 마지막 장면은 아쉬움과 따뜻함이 같이 있어야 해요 — 색시는 웃고 있지만 눈가가 젖어 있습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with soft outlines
and gentle colors, similar to a classic Korean animated storybook. Setting is a
Joseon-era farming village: green rice paddies with water reflecting the sky, a
small thatched cottage with an earthen kitchen, a large brown water jar in the
corner, low stone walls and persimmon trees. Fresh greens and water blues by day,
warm amber lamplight at night. Quiet and tender - no exaggerated comedy. No text
or letters in the image.
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
The young man: a lean farmer in his twenties in a patched off-white hanbok with
the trouser legs rolled up, a towel round his head, honest lonely face that
gradually brightens. The bride: a young woman in a soft pale green and white
hanbok with her hair in a long plait, calm gentle face with something faintly
otherworldly about her - she should look slightly luminous, especially when she
first appears.
The river snail (우렁이 / 논우렁이 - Cipangopaludina): An authentic Korean freshwater river snail (NOT a terrestrial garden snail - 달팽이가 아님!). Features: 1) A tall, pointed conical spiral shell (원뿔형 소라/고둥 모양의 나선형 껍데기) in dark olive-brown/blackish color with distinct stepped whorls and a round operculum (뚜껑); 2) An aquatic snail head with a tapered snout and small dark eyes at the base of two slender soft tentacles (NO long land-snail eyestalks! 달팽이 눈자루 더듬이가 아님); 3) A broad crawling muscular foot. Keep it identical every time.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. The dim corner of an earthen kitchen at night. A
large brown water jar stands in the lower half of the frame, and from its mouth a
soft green-white light rises, curling upward like steam and taking the faint
shape of a woman's sleeve near the top of the tall frame. A single fist-sized
snail shell rests on the jar's rim. Quiet and enchanted.
```

## 본문  장 (모두 가로 16:9)

### `01-field.webp` — 혼자 김을 매는 총각

```
Wide rice paddy scene at midday. A wide flooded field reflecting a blue sky
fills most of the frame. In the centre-left, the young man stands knee-deep in
water bent over the rice, alone, the only figure anywhere in the landscape.
Distant thatched roofs, green hills. Beautiful but very empty. Loneliness in a
wide space.
```

### `02-voice.webp` — 어디선가 들려온 대답

```
Wide rice paddy scene. The young man has straightened up sharply, one hand still
in the water, head turned and eyes wide, scanning the empty field. Rings of
ripples spread from where his hand was. The paddy, the dyke, the hills - all
empty. Nothing to explain the voice. Sunlit and strange.
```

### `03-again.webp` — 벼 포기를 헤치며

```
Wide paddy scene, closer in. The young man wades through the rice with both
hands parting the green stalks, water swirling around his shins, face intent and
half disbelieving. Rice leaves lean away on both sides. Sunlight glinting off the
water surface. Anticipation.
```

### `04-shell.webp` — 손바닥 위의 커다란 우렁이

```
Wide scene at the edge of the paddy. In the centre, the young man crouches on
the earthen dyke holding a large glossy dark-green snail shell on his open palm,
turning it toward the light, eyebrows raised in wonder. Water drips from his
sleeve. Green rice on one side, dry dyke path on the other. Small and marvellous.
```

### `05-table.webp` — 차려져 있던 밥상

```
Wide interior of a small thatched cottage room at evening. On the right, the door
stands half open with the young man frozen in it, one hand still on the frame,
mouth open. On the left, in the middle of the empty room, a low table set with a
steaming bowl of rice, three side dishes and a soup bowl. Nobody else. Warm lamp
glow. Wonderful and unsettling.
```

### `06-days.webp` — 이웃에게 물어보아도

```
Wide scene in a village lane in daylight. On the right, the young man gestures
back toward his house, talking earnestly. On the left, two neighbours - an older
woman with a basin and a man with a hoe - both shake their heads with puzzled
faces, one shrugging. Bright day, thatched roofs, ordinary and baffled.
```

### `07-hide.webp` — 짚더미 뒤에 숨어서

```
Wide scene in the cottage yard at dusk. On the right, the young man crouches
low behind a straw stack with only his head and one eye visible past the edge,
holding his breath. On the left, across the swept yard, the dark open mouth of the
earthen kitchen with the big water jar just visible inside. Long blue shadows.
Held breath.
```

### `08-appear.webp` — 우렁이에서 나온 색시

```
Wide interior of the earthen kitchen, the most beautiful image in the book. In
the centre, soft green-white light spills from the mouth of the big water jar and
the bride steps out of it, her long sleeves unfurling like water, feet not quite
touching the floor yet. The light picks out the stove, the woodpile, the hanging
gourd. On the far right edge, one eye of the watching man. Luminous and hushed.
```

### `09-caught.webp` — 뛰어나온 총각

```
Wide interior of the kitchen. On the left, the young man has burst in with one
arm outstretched, straw still clinging to his shoulder, face urgent. On the
right, the bride has drawn back a step toward the water jar with one hand raised,
startled, her glow flickering. Firelight and green light mixing. A moment that
cannot be taken back.
```

### `10-wait.webp` — 사흘만 기다려 주세요

```
Wide interior of the kitchen, calmer. The two stand facing each other across the
small room. The bride has lowered her head and holds up three fingers of one
hand, speaking quietly. The young man listens with both hands at his sides,
nodding. Between them on the floor, the empty snail shell catches the lamplight.
Gentle and serious.
```

### `11-impatient.webp` — 하루를 못 넘긴 마음

```
Wide interior of the cottage room at night. On the left, the young man lies awake
on his sleeping mat with his eyes wide open, staring at the ceiling, one hand
gripping the blanket. On the right, through the paper door, the faint green glow
of the kitchen. A small thought bubble above him shows the water jar standing
empty. Restless and human.
```

### `12-together.webp` — 조촐한 혼례, 그리고 저물녀

```
Wide scene in the cottage yard at dusk. On the left, the young man and the bride
stand together in simple wedding clothes; a few neighbours are leaving through
the gate behind them. The bride is smiling, but her eyes are bright with tears
and she is looking down at her own hand — her fingertips have gone faintly
translucent, the colour of pond water, and a soft glow is beginning to run up
her wrist. The young man has just noticed. On a stone by the wall, the green
snail shell waits in the last light. Warm and happy on the surface, quietly
wrong underneath.
```

### `13-jar.webp` — 물독 앞의 밤

```
Night interior of the cottage kitchen, lit only by a single oil lamp. The young
man sits on the earthen floor with his arms wrapped around the big brown water
jar, his cheek resting against it, eyes open and unfocused. Inside the jar, just
under the surface of the water, the green snail shell rests on the bottom. Two
low meal tables stand ready by the wall — one set for him, one set beside the
jar. Very still. Grief without drama, and a man who has decided to wait.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean farmyard at sunset, no people. A large brown water jar stands
beside the kitchen door, and on the stone ledge next to it an empty green snail
shell rests in the last warm light. Green paddies beyond the wall. Peaceful and
settled.
```
