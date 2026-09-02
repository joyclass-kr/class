# 제미나이 그림 프롬프트 — 혹부리 영감

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

**도깨비를 무섭게 그리지 마세요.** 우리 도깨비는 괴물이 아니라 흥이 많고 어수룩한 존재예요. 노래를 듣고 신이 나서 몰려드는 장면이니, 무서운 습격이 아니라 시끌벅적한 잔치처럼 그려야 합니다. 두 영감은 얼굴이 확실히 달라야 해요 — 착한 영감은 둥글고 환하게, 욕심쟁이 영감은 뾰족하고 심술궂게.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Joseon-era mountain village: thatched cottages, a deep
pine forest, a tumbledown wooden hut in a valley. Warm daylight for the village,
deep indigo and firelight for the night scenes inside the hut. Big exaggerated
expressions, musical energy. The goblins are festive, never menacing. No text or
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
The kind old man: a cheerful elderly man with a round face, white beard and a
warm crinkled smile, a fist-sized lump under his right jaw, plain off-white
hanbok, an A-frame carrier of firewood. He sings with his whole body - eyes shut,
chest out, arms wide. The greedy old man: an elderly man with a narrow pinched
face, thin beard, sharp suspicious eyes, a lump under his LEFT jaw, a slightly
better coat. Sour where the other is warm.
The dokkaebi (Korean goblins) - draw them EXACTLY like this every time:
SMOOTH bare skin in a strong flat colour, NEVER furry, NEVER hairy, NEVER
bristly, no shaggy fur anywhere on the body or legs. Round cartoon proportions,
big friendly round eyes with thick eyebrows, a broad rounded nose, pointed
elf-like ears, a wide grin with two small blunt tusks, and TWO curved ridged
horns like a goat's (only babies have a single horn). Short tidy dark hair.
The LEADER is bright tomato RED, heavy-set and barrel-bellied, wearing a
leopard-print hide slung over one shoulder like a tunic, barefoot, carrying a
golden club studded with blunt spikes.
Another is grass GREEN with a small flower tucked behind one horn, dressed in a
proper hanbok - pink jeogori, purple skirt, tiger-stripe vest - neat and
homely.
The smallest is a chubby SKY-BLUE baby with one little horn and a bib, always
underfoot, always delighted.
They are comic and warm, never frightening - closer to a noisy family than to
monsters.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Inside a dark wooden hut lit by one small fire. At
the bottom, a cheerful old man sits singing with his eyes closed and mouth wide
open, one hand raised. Filling the upper half of the tall frame, a crowd of
blue-grey goblin faces leans in through the door and windows from every side,
grinning, eyes shining, entranced by the song. Warm firelight, festive not
frightening.
```

## 본문  장 (모두 가로 16:9)

### `01-oldman.webp` — 노래 잘하는 혹부리 영감

```
Wide sunny village scene. In the centre, the kind old man stands in a field with
a hoe forgotten in one hand, eyes shut, mouth wide open in song, the lump under
his jaw clearly visible. All around him villagers have stopped working - a woman
with a water jar on her head, a boy with a sickle, an old woman on a veranda -
all turned toward him, smiling. Musical notes suggested by drifting blossom.
```

### `02-mountain.webp` — 해가 넘어간 깊은 산

```
Wide mountain forest scene at dusk. On the left, the old man stoops to tie
another bundle onto his overloaded A-frame carrier, not noticing the light. On
the right, the sun has already dropped behind a ridge and the pines are turning
to black silhouettes. Long purple shadows sweep across the slope. A sense of time
running out.
```

### `03-hut.webp` — 골짜기의 낡은 빈 오두막

```
Wide night scene in a valley. In the centre, a small tumbledown wooden hut with a
sagging roof and a crooked door, one shutter hanging loose. On the left, the old
man pushes the door open, his carrier set down outside, peering into the dark
with a lantern-less hand raised. Deep blue night, pines pressing in on both
sides.
```

### `04-dokkaebi.webp` — 문을 벌컥 열고 몰려든 도깨비들

```
Wide interior of the hut. On the left, the old man has flattened himself against
the wall, arms spread, eyes enormous, mouth open. On the right, the door bursts
open and a crowd of stout blue-grey goblins pours in, clubs over shoulders,
grinning ear to ear, jostling each other to get inside. Firelight, dust, chaos -
but they are clearly excited, not angry.
```

### `05-question.webp` — 그 소리가 어디서 나느냐

```
Wide interior scene. On the right, the biggest goblin leans down until his face
is level with the old man's, one huge finger pointing, eyebrows raised in genuine
curiosity, tusks showing in a grin. On the left, the old man presses back against
the wall with both hands up, sweating, eyes darting. Other goblins crowd behind,
all leaning in to listen. Comic tension.
```

### `06-lie.webp` — 이 혹에서 나옵니다

```
Wide interior scene. In the centre, the old man has raised one trembling hand to
the lump under his jaw, pointing at it with an expression halfway between panic
and disbelief at his own words. All around, goblin faces light up in unison,
eyes going wide and round, several pointing at the lump. Firelight on every
face. Perfect comic beat.
```

### `07-trade.webp` — 보물을 쏟아 내고 혹을 떼어 가다

```
Wide interior scene, riotous. Goblins hammer their knobbly clubs on the floor and
gold coins, silver bowls and rolls of silk erupt upward and rain down around the
room. On the left, the biggest goblin gently plucks the lump from the old man's
jaw between two fingers and holds it up like a prize. The old man sits in a heap
of treasure, utterly bewildered. Sparkling and funny.
```

### `08-home.webp` — 매끈한 턱으로 돌아온 아침

```
Wide village street scene in bright morning. In the centre, the old man walks
home with a heaped A-frame carrier of treasure, one hand stroking his now smooth
jaw, beaming. Villagers crowd around him on both sides pointing at his chin,
mouths open, hands on their own faces in astonishment. Warm gold light, joyful
uproar.
```

### `09-greedy.webp` — 소문을 듣고 달려온 욕심쟁이 영감

```
Wide scene in the kind old man's yard. On the right, the greedy old man leans in
close with a pinched eager face, one bony finger jabbing questions, the lump
under his left jaw shaking. On the left, the kind old man leans back with both
palms up, brows raised in mild warning, clearly trying to say something the other
will not hear. Bright day, comic mismatch.
```

### `10-sing.webp` — 목청껏 불러 보지만

```
Wide interior of the same hut at night. In the centre, the greedy old man sits
bolt upright singing with forced effort, neck straining, one hand cupped to his
own ear as if checking how good he sounds. The song is visibly not going well -
a spider drops from the rafters, a mouse covers its ears. Behind the door on the
right, the first goblin shadows are arriving anyway. Very funny.
```

### `11-angry.webp` — 험악해진 도깨비 대장

```
Wide interior scene. On the left, the greedy old man thrusts his chin forward
with both hands, offering the lump, a greedy grin splitting his face. On the
right, the big goblin has drawn back with his brows crashed down, mouth open in a
roar, one fist raised - furious but comic, more offended than dangerous. Other
goblins behind him fold their arms and scowl in unison. Firelight, red-tinged.
```

### `12-two.webp` — 혹을 둘이나 달고 내려오는 길

```
Wide mountain path scene at dawn. In the centre, the greedy old man trudges
downhill with his shoulders slumped and head down, and now there is a lump under
each side of his jaw, making his face perfectly symmetrical and absurd. Behind
him, the hut sits quiet in the valley. On the roadside, a couple of early
villagers stare with their hands over their mouths. Pale morning light, richly
deserved.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet mountain valley at sunrise, no people. The tumbledown wooden hut stands
with its door hanging open, a single gold coin glinting on the threshold, mist
lifting off the pines around it. Warm pale light. Calm, with a hint of mischief.
```
