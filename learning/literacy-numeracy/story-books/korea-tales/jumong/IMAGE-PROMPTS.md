# 제미나이 그림 프롬프트 — 주몽

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

**힘차고 시원한 이야기**예요. 북쪽 땅의 넓은 하늘과 벌판을 크게 그려 주세요.

- **13번이 이 책의 절정입니다.** 강물 위로 물고기와 자라가 떼로 떠올라 다리가 되는 장면이에요. 등껍질이 물 위에 촘촘히 깔려 길이 되어야 하고, 사람 넷이 그 위를 달리는 모습이 한눈에 보여야 합니다. 이 그림 하나에 가장 공을 들여 주세요.
- **말은 처음부터 끝까지 같은 말로.** 8번과 10번에 나오는 말이 같은 말이어야 해요. 8번에서는 비쩍 마르고 털이 거칠게, 10번에서는 같은 무늬 그대로 살이 오르고 윤이 나게요.
- **고구려답게 그려 주세요.** 사람들은 점무늬 저고리에 통 좁은 바지, 깃털 꽂은 모자를 쓰고, 활은 짧고 굽은 활입니다.
- **3번은 우습게.** 돼지도 소도 새도 알을 아끼는 장면이니 짐승들 표정을 익살스럽게 그려 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bold cel-animation style with strong
outlines and rich colors, in the look of a classic Korean animated film about
myth, with touches of Goguryeo tomb-mural design. Setting is the far north:
wide grass plains under enormous skies, birch and pine forest, a walled Buyeo
town of timber and thatch, long low stables, a broad grey river, and later a
steep valley with clear water at Jolbon. Deep greens, ochre grass, iron greys,
big dramatic skies. Energetic compositions with lots of movement. Never
frightening. No text or letters.
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
Jumong: first a bright-eyed boy, then a lean strong young man in a Goguryeo
tunic of pale cloth with dark dot patterns, narrow trousers, boots, and a cap
with two feathers; he carries a short recurved bow and always stands as if about
to move. Yuhwa: a calm dignified woman of about thirty-five in flowing pale blue
and white with long loose hair, always associated with water and light. King
Geumwa: a heavy-set older king with a broad grey beard and a fur-trimmed coat,
stern but not cruel. Daeso and the seven princes: young men in finer patterned
tunics, sulky and self-important. The horse: a compact steppe horse, dark chestnut
with a white blaze down its nose and one white foot - the same markings every
time. Yuri: a boy of about twelve, unmistakably Jumong's son.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A broad grey river fills the lower two thirds of
the tall frame, and across its surface, from the bottom edge toward the middle
distance, hundreds of fish backs and turtle shells have risen and locked together
into a living road. Running along that road, small and far away, four figures on
horseback. Above them, filling the upper third, an enormous northern sky of
racing cloud and low gold light. Wide, strange and thrilling.
```

## 본문  장 (모두 가로 16:9)

### `01-yuhwa.webp` — 하백의 딸 유화

```
Wide scene on a reedy riverbank in the north. On the left, Yuhwa stands ankle
deep at the water's edge in pale blue and white, her long hair loose, turning to
look back. On the right, King Geumwa has reined in his horse on the bank with his
retinue behind him, one hand raised. Wide grey river, huge sky, wind in the
reeds. Still and strange.
```

### `02-sunlight.webp` — 따라다니는 햇빛 한 줄기

```
Wide interior of a timber hall with the blinds pulled down and the room in
shadow - except for one narrow shaft of sunlight that has found Yuhwa where she
sits, falling exactly across her. She has moved to the far corner and it has
followed. On the left, two servants press themselves against the wall, wide-eyed.
Dark room, one blade of gold. Eerie and beautiful.
```

### `03-throw.webp` — 짐승들이 알을 아끼다

```
Wide scene divided into three parts. On the left, a pig pen where the pigs have
all crowded to the far corner, tiptoeing comically around a large pale egg in the
straw. In the centre, an open field where cattle and horses step carefully around
the egg, one with an exaggerated high step. On the right, a wood where birds have
settled over it in a feathered dome. Very funny.
```

### `04-hatch.webp` — 쩍, 알이 갈라지다

```
Wide interior of a warm room. In the centre, the pale egg lies on a folded cloth
with a bright crack splitting across it and golden light coming through. Yuhwa
leans over it with both hands to her mouth, hair falling forward. In the crack, a
small hand and a wide-open eye. Firelight, soft shadows. Wonder.
```

### `05-bow.webp` — 쏘았다 하면 백발백중

```
Wide scene on a practice ground. On the right, a boy of about seven stands with a
homemade short bow, arm still extended after loosing. On the left, a straw target
with three arrows in a tight cluster at the centre, and behind it a row of adults
turning to look with their eyebrows up, one dropping the arrow he was holding.
Bright day, dust. Comic astonishment.
```

### `06-princes.webp` — 저놈 때문에 우리가 우스워진다

```
Wide scene at an archery field. On the left, the seven princes stand in a knot
with their bows lowered, faces sour, Daeso snapping an arrow in his fist. On the
right, some distance away, Jumong pulls his arrows out of the target's bullseye
without looking up. Between them, a wide space of trodden grass. Big sky. Envy.
```

### `07-stable.webp` — 말똥을 치우는 일

```
Wide interior of a long timber stable. In the centre, Jumong forks straw with a
pitchfork, sleeves rolled, working steadily. But his head is turned and he is
studying the horses down the line, one at a time. On the left, two princes lean in
the doorway laughing at him. Dust in shafts of light, rows of horses. Patient.
```

### `08-needle.webp` — 혀 밑에 꽂아 둔 바늘

```
Wide interior of the stable at night. In the centre, Jumong stands close to a
dark chestnut horse with a white blaze and one white foot, holding its head gently
with one hand and reaching to its mouth with the other, a tiny needle between his
fingers. His face is apologetic. One lantern, deep shadows. Secretive and a
little sad.
```

### `09-gift.webp` — 저건 네가 가져라

```
Wide scene in the stable yard. On the left, King Geumwa points from horseback
while the princes lead away sleek, well-fed horses. On the right, one bony,
dull-coated chestnut with a white blaze stands alone at the rail, and Jumong bows
low beside it - with a barely hidden grin. Bright morning, straw and dust. Comic
triumph.
```

### `10-secret.webp` — 바람보다 빨랐어요

```
Wide scene on a moonlit plain. Across the middle of the frame, Jumong rides the
same chestnut horse flat out, now filled out and glossy, mane and tail streaming,
hooves barely touching the grass, long motion lines behind them. Blue night, huge
sky, silver grass. Exhilarating.
```

### `11-flee.webp` — 네 나라를 세우거라

```
Wide interior of a dim room before dawn. In the centre, Yuhwa presses a small
cloth bundle of seed grain into Jumong's hands with both of hers, her face steady,
his uncertain. On the right, three friends wait at the door with bows and packs,
one glancing out into the dark. One small lamp. Urgent and tender.
```

### `12-river.webp` — 나는 하늘의 손자다!

```
Wide scene at a broad grey river at first light. On the near bank, Jumong has
reined his horse to a halt at the water's edge and stands in the stirrups with one
arm flung up to the sky, shouting, his three companions crowding behind him. On
the far left, a dust cloud and the shapes of pursuing riders. Mist on the water,
no bridge, no boat. Desperate.
```

### `13-bridge.webp` — 물고기와 자라가 등을 맞대다

```
Wide scene across the whole river. The water boils and hundreds of fish backs
and turtle shells surge up and lock together shell to shell into a broad living
road stretching from bank to bank. On it, the four riders gallop across, spray
flying from the hooves. Behind them at the near bank, the pursuers rein up in
astonishment. Silver water, dark shells, enormous sky. The most spectacular
picture in the book.
```

### `14-jolbon.webp` — 여기다

```
Wide landscape scene of a steep green valley with a clear river and rocky
ridges. In the foreground, Jumong crouches and lets seed grain run from the cloth
bundle through his fingers into turned earth, his three friends already cutting
timber behind him. Mist on the ridges, morning light. Beginning again.
```

### `15-yuri.webp` — 성문 앞에 나타난 소년

```
Wide scene at the timber gate of a new walled town. In the centre, a boy of about
twelve stands travel-worn with a bundle on his back, holding out half a broken
sword on both palms. Guards on either side have stepped back. Beyond the gate,
people are stopping to look. Dusty road, clear light. A held moment.
```

### `16-sword.webp` — 쩌억, 하나로 붙은 칼

```
Wide interior of a plain timber hall. In the centre, Jumong and Yuri hold the two
halves of the broken sword together and the blade has joined into one, a thin line
of light along the break. Jumong grips his son's shoulder with his free hand, head
bowed. Around them, the three old friends stand with their hands over their mouths.
Warm firelight. Overwhelming.
```

### `end.webp` — 마지막 (가로 4:3)

```
A steep green valley at dawn with no people. A new timber palisade on a ridge,
turned fields with the first green shoots coming up, a clear river below, and a
short recurved bow left leaning against a fence post. Mist and gold light on the
ridges. Wide, quiet and hopeful.
```
