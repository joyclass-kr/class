# 제미나이 그림 프롬프트 — 팥죽 할멈과 호랑이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열여섯 개의 펼침** + 표지 + 마지막 장 = 그림 **열여덟 장**.


> **`end` 그림은 마지막 「끝」 쪽 한 자리에만 쓰입니다.** 가로로 넓은 칸(1.7 : 1)입니다.
> 「읽고 나서」 쪽에는 그림이 들어가지 않습니다 — 두 칸 다 글입니다.
> 칸에 꽉 차게 잘라 넣는 방식이니, 아래 비율표대로 만들어 주세요.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 16장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

처음부터 끝까지 **웃기는 이야기**예요. 호랑이는 무섭게가 아니라 **당하는 쪽**으로 그려 주세요.

**여섯 조력자가 이 책의 얼굴입니다.** 밤, 자라, 개똥, 절구, 멍석, 지게. 모두 **얼굴과 팔다리가 달린 만화 캐릭터**로 그려야 합니다. 물건이 아니라 등장인물이에요.
- **숨은 자리를 6번부터 10번 그림에 확실히 보여 주세요.** 밤은 아궁이 잿속, 자라는 물동이 속, 개똥은 부엌 바닥, 절구는 문틀 위, 멍석은 마당, 지게는 담 옆. 그래야 12번부터 순서대로 튀어나올 때 독자가 "아!" 하게 됩니다.
- **개똥은 더럽지 않게 그려 주세요.** 동글동글하고 반들반들한 갈색 덩어리에 눈과 입만 달린, 귀엽고 우스운 모양으로요.
- **12번부터 16번까지가 절정입니다.** 다섯 장면이 쉬지 않고 이어지는 슬랩스틱이니 화면을 크게 쓰고 동작선을 아끼지 마세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a small Joseon-era cottage at the foot of a mountain: a red
bean field, a swept earthen yard, and above all a traditional Korean kitchen with
a clay stove and ash pit, a big brown water jar, a wooden door frame, straw mats
and an A-frame carrier. Warm autumn colours by day, deep amber firelight and blue
moonlight at night. Big exaggerated comic expressions, heavy motion lines.
The tiger is never actually injured, only comically battered. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The old woman: a small round-backed grandmother with white hair in a bun, a faded
grey and white hanbok, a worried kind face that turns to delight at the end. The
tiger: a big orange-and-black striped Korean folk-painting tiger, round face, huge
whiskers, boastful at first and utterly bewildered later - funny, never
menacing. The six helpers, all drawn as cartoon characters with faces and small
limbs, each the same design every time: Bam the chestnut - a glossy brown
chestnut with a cheeky face; Jara the soft-shell turtle - a flat green turtle with
a long neck and a determined frown; Gaettong the dung - a small round shiny brown
lump with dot eyes and a wide grin, kept cute and never dirty; Jeolgu the mortar -
a stout grey stone mortar that hops; Meongseok the straw mat - a rolled straw mat
with two eyes at one end; Jige the A-frame carrier - a wooden carrier that walks
on its two legs.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A dim Korean kitchen at night seen from the
doorway. In the middle of the tall frame, a big black pot of red bean porridge
steams on a clay stove. Around it, hidden in six places, the six helpers peek out
- a chestnut in the ash pit, a turtle's head over the rim of the water jar, a
round brown lump on the floor, a mortar perched on the door frame, a rolled mat
and a wooden carrier just outside. Two tiger eyes glow in the dark doorway at the
top. Funny and full of secrets.
```

## 본문  장 (모두 가로 2:1)

### `01-field.png` — 팥밭을 매는 할머니

```
Wide autumn scene at the foot of a mountain. In the centre, a small plot of red
bean plants, and in it the old woman bent over with a hoe, working steadily. Her
tiny thatched cottage sits on the right, pine hills behind. Warm gold afternoon
light, red bean pods just starting to swell. Peaceful and modest.
```

### `02-tiger.png` — 등 뒤에 나타난 호랑이

```
Wide scene in the bean field. On the right, an enormous striped tiger rears up
behind the old woman with front paws raised and mouth wide open in a roar, filling
half the frame. On the left, the old woman has spun round, hoe dropping from her
hand, mouth open, knees knocking together with comic wobble lines. Huge size
difference.
```

### `03-deal.png` — 가을에 팥죽을 쑤어 드리리다

```
Wide scene in the bean field. On the left, the old woman holds up one finger with
a suddenly canny expression, the other hand gesturing at the bean plants. On the
right, the tiger has settled back on his haunches, head tilted, one paw to his
chin, licking his lips as he imagines something. Above his head a small daydream
bubble of a steaming bowl of red porridge. Warm and comic.
```

### `04-agree.png` — 가을에 다시 오마

```
Wide scene. On the right, the tiger strolls away up the mountain path with his
tail swinging jauntily, glancing back with a grin. On the left, the old woman sits
down hard in the dirt among the bean plants, shoulders slumped, one hand to her
forehead. Long evening shadows, falling leaves. Funny and a little sad.
```

### `05-cry.png` — 팥죽을 쑤며 엉엉 울다

```
Wide interior of a Korean kitchen. In the centre, a big black pot of red bean
porridge bubbles on the clay stove, steam rising thickly. Beside it the old woman
stirs with a long wooden ladle while crying openly, tears running down both
cheeks and dripping into the pot. Warm firelight, rich red porridge. Sad and
funny at once.
```

### `06-chestnut.png` — 아궁이 잿속으로 쏙

```
Wide kitchen scene. On the left, a glossy brown chestnut with a cheeky little
face has finished a bowl of porridge and is diving head first into the grey ash
pit under the stove, only its bottom still showing. On the right, the old woman
watches with the ladle in her hand and her eyebrows raised. Warm amber light,
comic.
```

### `07-turtle.png` — 물동이 속으로 첨벙

```
Wide kitchen scene. On the right, a big brown water jar, and a flat green turtle
with a determined frown is climbing over its rim and dropping in with a small
splash, one back foot still in the air. An empty porridge bowl sits beside the
jar. On the left, the old woman peers over, ladle forgotten. Warm light.
```

### `08-dung.png` — 부엌 바닥에 철퍼덕

```
Wide kitchen scene. In the middle of the packed earth floor, a small round shiny
brown lump with dot eyes and a wide grin settles itself flat and spreads out
slightly, looking pleased. Keep it cute and clean-looking, never disgusting. On
the left, the old woman looks down at it with a face caught between gratitude and
doubt. Warm firelight, very funny.
```

### `09-mortar.png` — 문틀 위로 낑낑

```
Wide kitchen scene looking toward the door. In the centre, a stout grey stone
mortar with a little face is hauling itself up the wooden door frame, wobbling on
the narrow lintel, tongue out with effort. Below it, the old woman holds both
hands up as if ready to catch it. Dust falling from the frame. Precarious and
comic.
```

### `10-mat.png` — 마당의 멍석과 담 옆의 지게

```
Wide scene of the cottage yard at dusk. On the left, a rolled straw mat with two
eyes at one end lies flat across the middle of the yard, pretending to be an
ordinary mat. On the right, a wooden A-frame carrier stands leaning against the
earthen wall, one leg crossed casually over the other. The old woman watches from
the kitchen door. Blue evening light, everything in place.
```

### `11-arrive.png` — 캄캄한 부엌에 들어선 호랑이

```
Wide scene at the kitchen door at night. Filling the right of the frame, the
tiger's huge striped shoulder and head push through the doorway, eyes glinting,
mouth open calling out. The kitchen beyond is pitch dark except for the faint
outline of the pot. Nothing else visible - the reader knows what is waiting.
Deep blue night, one warm gleam. Tense and funny.
```

### `12-pop.png` — 팍! 눈을 때린 밤

```
Wide kitchen scene, explosion of motion. The tiger crouches at the ash pit
blowing on the embers - and the chestnut rockets out of the ashes in a spray of
grey ash, straight into his eye, drawn with impact stars and a long motion arc.
The tiger's head snaps back, both front paws flying to his face, mouth open in a
howl. Firelight, ash everywhere.
```

### `13-bite.png` — 물동이 속에서 콱

```
Wide kitchen scene. On the right, the tiger has plunged one front paw into the
big water jar, and the green turtle has clamped onto it, all four legs braced,
eyes squeezed shut with effort. The tiger rears back with the whole jar lifting
off the floor, water sloshing out, his one good eye enormous. Splashes and
motion lines. Hilarious.
```

### `14-slip.png` — 개똥에 미끄러져 벌러덩

```
Wide kitchen scene. In the centre, the tiger lands from a leap onto the small
brown lump on the floor - and both hind legs shoot out from under him in
opposite directions, tail up, arms windmilling, water jar still stuck on one paw.
Long skid lines across the packed earth. The lump grins up at him. Peak
slapstick.
```

### `15-roll.png` — 절구가 쿵, 멍석이 둘둘

```
Wide scene split between doorway and yard. On the left, the tiger bolts through
the door and the stone mortar drops from the lintel onto his head with a starburst
of impact, stars circling. On the right, in the yard, the straw mat has sprung
upright and is rolling the dazed tiger up inside itself like a spring roll, only
his head and tail sticking out. Moonlight, dust, chaos.
```

### `16-river.png` — 지게가 지고 나가 강물에 텀벙

```
Wide moonlit scene at a riverbank. In the centre, the wooden A-frame carrier
walks on its two legs with the rolled-up mat and tiger on its back, and is just
tipping the whole bundle off the bank into the river with an enormous splash. The
tiger's face pokes out of the roll, eyes crossed. On the left, back at the
cottage, the old woman and the five helpers watch from the yard, all cheering.
Moonlight on water. Triumphant and funny.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean kitchen in the morning, no one there. An empty black pot on the
clay stove with a wooden ladle across it, six small empty bowls set out in a neat
row on the floor beside it, and warm sunlight coming through the open door.
Peaceful and satisfied.
```
