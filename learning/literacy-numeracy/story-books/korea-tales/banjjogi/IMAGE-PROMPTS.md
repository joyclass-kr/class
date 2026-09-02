# 제미나이 그림 프롬프트 — 반쪽이

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
storybook. Traditional Korean rural village of the Joseon era: thatched-roof
cottages, low stone walls, tile-roofed rich family's house with a big wooden gate,
pine forests, rice paddies, dirt paths, a village well and a stream. Characters
wear hanbok. Night scenes lit by warm lantern glow and cool blue moonlight. Big
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
Banjjogi is HALF a boy. ONE single straight line runs down through his head AND
his body together - crown, forehead, between the eyes, nose, mouth, chin, chest,
belly, to the ground - and everything on the PICTURE-LEFT of that one line is
gone. The missing eye is on the SAME side as the missing arm and missing leg,
never opposite sides. Face him straight at the viewer. Smooth flat side, never a
cutaway.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Banjjogi (Half-boy). His FACE is whole and natural; his BODY is one-sided. Keep
these two things separate and he comes out right every time.

HIS FACE - draw it complete and cute, never blank or damaged. Both eyebrows, a
full head of thick black hair in a long braid with a ribbon, a wide happy open
mouth. The one thing that marks him: ONE eye is big, round and wide open, and the
OTHER eye is drawn as a closed, curved-up winking line, like the "^" of a smiling
squint. He looks as if he is winking at you and enjoying it. The open eye is on
the same side as his arm and his leg.

HIS BODY - one arm and one leg only, both on the same side as his open eye. On
the other side the sleeve of his jacket and the leg of his trousers are empty and
tied off in a neat knot, so they hang and swing in the air. He balances and hops
about on his single leg, quick and sure-footed. His one arm is thick with muscle.

He wears a simple pale hanbok. Always cheerful, strong and heroic.
The two elder brothers: two good-looking young men in their twenties in tidy grey
and tan hanbok, always together, always sulking or whispering behind their hands.
Draw them handsome and comic - the meanness is in what they do, never in ugly
faces.
The parents: a healthy, plain, kindly couple in their mid thirties who waited ten
years for a child. Smooth faces, thick black hair, no grey and no wrinkles, no
stoop. She wears plain white and pale blue, he wears undyed working hanbok.
Kim the rich WOMAN (she is a woman - the story never says otherwise): a well-fed
lady in her forties, mistress of the biggest house in the village, in fine silk
with a bright yellow jeogori and a deep wine skirt, hair in a heavy bun with a
gold pin. Plump and handsome and pleasant to look at, chin up, very sure of
herself - and hugely comic when she is cornered: cheeks puffing, hands
fluttering, sweat drops flying.
HER FACE AND SKIN - her skin is the SAME warm peachy tone as every other
villager in the picture, rosy on the cheeks. Her hair is glossy black. Her face
is round, smooth and full, with no lines. When she is dismayed her cheeks stay
pink and her mouth makes a small round comic "o" - she is a funny grown-up
caught out, the kind of face a child laughs at.
His daughter: a calm graceful young woman in a soft pink and mint hanbok, long
braid, watching everything quietly.
The tiger: a huge orange-and-black striped Korean folk-painting tiger, round
face, fierce at first and then comically indignant once tied up.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 소나무를 뿌리째 지고 선 반쪽이.

```
Vertical portrait composition. Standing tall in the centre of the frame, seen
from slightly below against a twilight sky, Banjjogi balances on his single
leg with a whole pine tree slung across his back, roots and clumps of earth still
hanging from it. Thick ropes are still wound around his half body. His one eye is
bright and he wears a huge cheerful grin. Below him at the bottom of the frame, a
small moonlit village of thatched roofs. Heroic and funny, warm orange sunset
behind, deep blue sky above.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

## 본문 12장 (모두 가로 16:9)

### `01-carp.webp` — 노인이 잉어 세 마리를 준다

```
Wide panoramic scene. A humble thatched cottage yard. On the right an elderly
Buddhist monk in a grey robe, head shaved, a long string of wooden prayer beads
over one arm, holds out a shallow basket with carp in it, one finger
raised as if giving careful instructions.
COUNT THE CARP: there must be exactly THREE fish in the basket, and all three
clearly separate and countable - three heads and three tails plainly visible, not
overlapping into a heap. Three is the whole point of the story: three carp mean
three sons, and the third one is only half eaten, which is why the youngest is
born a half boy. Two fish or four fish break the story. On the left a middle-aged couple in plain hanbok receive them with
both hands, bowing slightly, hopeful faces. Late afternoon, warm gold light.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
The couple receiving the carp are in their MID THIRTIES - smooth faces, thick
black hair, no grey, no wrinkles, no stoop. They have waited ten years for a
child and they look it: hopeful, not worn out.
```

### `02-half.webp` — 세 마리째를 반만 먹고, 셋째 아이가 반쪽으로 태어난다

```
Wide panoramic scene split in feeling. On the left, inside a warm lamplit room,
the woman sets down her spoon and turns toward the door where a neighbour's hand
is knocking - a bowl on the low table still half full. On the right, a warm
sunlit room with three newborn babies swaddled on the floor: two plump ordinary
babies, and the third a cheerful baby who is exactly one vertical half of a baby,
one eye, one arm, one leg, gurgling happily. The old mother looks down at them
with wide surprised eyes and a soft smile. Never gruesome - the half baby is
round and cute.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
Here Banjjogi is a NEWBORN BABY. Same rules: his face is whole and cute with one
big round open eye and one closed curved-up winking line, and he has one arm and
one leg only, on the open-eye side. The other sleeve and the other trouser leg of
his baby clothes are empty and knotted. His mother is in her mid thirties, smooth
faced and dark haired.
```

### `03-grow.webp` — 한 팔로 쌀가마를 번쩍 든다

```
Wide panoramic scene. A village threshing yard in bright daylight. On the right
Banjjogi, now grown, balances on his one leg and hoists an enormous rice sack
high over his head with his single arm, grinning, effortless. On the left a crowd
of villagers - farmers, an old man, children - throw up their hands and cheer,
mouths wide open in amazement. Dust motes and straw in the golden air.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `04-jealous.webp` — 형 둘이 시샘하며 수군거린다

```
Wide panoramic scene. Evening behind a low stone wall. On the left the two elder
brothers crouch together with their heads almost touching, whispering behind
cupped hands, eyes narrowed and sour, one jabbing a thumb over his shoulder. On
the right, far away and out of earshot, Banjjogi hops cheerfully along a path
carrying a huge bundle of firewood, oblivious. Long blue evening shadows.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `05-tie.webp` — 깊은 산에서 반쪽이를 소나무에 묶는다

```
Wide panoramic scene. Deep pine forest at dusk. In the centre-left Banjjogi is
bound with many coils of thick rope to a massive pine trunk, but his expression
is only mildly puzzled, one eyebrow up, not frightened at all. On the right the
two brothers hurry away downhill without looking back, glancing sideways at each
other. Cool dim blue-green light, tall dark trunks.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `06-uproot.webp` — 소나무를 통째로 지고 마당에 나타난다

```
Wide panoramic scene. Night in the cottage yard, warm lamplight spilling from an
open door on the left where the two brothers stand frozen mid-step, rice bowls
falling from their hands, eyes and mouths enormous with shock. On the right
Banjjogi stands in the yard still wrapped in ropes, the whole uprooted pine tree
across his back with earth and roots dangling, scratching his head with his one
hand and smiling apologetically. Dust puffing up around his foot.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `07-tiger.webp` — 밤마다 호랑이가 마을로 내려온다

```
Wide panoramic scene. A sleeping village under a cold blue moon, thatched roofs
and shuttered doors on the right, black pine ridge on the left. A huge striped
tiger prowls down the empty village lane in the centre, head low, eyes glowing
yellow, one paw raised. An overturned water jar and a broken fence rail. Every
window dark. Tense but stylised, not gory.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `08-catch.webp` — 한 팔로 호랑이 목덜미를 붙들어 꽁꽁 묶는다

```
Wide panoramic scene. Night at the village entrance under a moon. In the centre
Banjjogi balances on his one leg and grips the huge tiger by the scruff of its
neck with his single arm, holding it up so its paws paddle helplessly in the air.
The tiger's face is comically outraged, tongue out, eyes crossed. A coil of thick
rope is slung over Banjjogi's shoulder and one loop is already around the tiger's
middle. Moonlight, motion lines, funny not frightening.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `09-promise.webp` — 김 부자 대문 앞에 호랑이를 끌고 선다

```
Wide panoramic scene. Morning outside the rich woman's tile-roofed house with a big
wooden gate on the right. Banjjogi stands on the left in the lane holding a rope,
the enormous tiger trussed up like a bundle at his side, sulking. Kim the rich
man has come out through the gate and stopped dead, her smile frozen, one hand
half raised, sweat drops flying off her forehead. Villagers peek over the wall,
delighted.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `10-excuse.webp` — "세 가지 내기를 해서 이기면"

```
Wide panoramic scene. The same gateway, now with a crowd. On the right Kim the
rich woman holds up three fingers with a forced hearty smile, chin lifted
with the other hand, eyes sliding sideways. On the left Banjjogi nods calmly,
arms - arm - at his side, completely unbothered. Between and behind them
villagers mutter to one another with raised eyebrows and folded arms. Bright
midday.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `11-contest.webp` — 기둥 들기와 달리기 (한 장에 두 장면)

**이 그림은 세로선 하나로 좌우를 나눠 두 장면을 담습니다.** 왼쪽 반은
힘겨루기, 오른쪽 반은 달리기입니다. 글도 그렇게 나뉘어 있습니다.

```
Wide panoramic scene split down the middle into two moments.
LEFT HALF - the strength contest: Banjjogi has torn an entire granary pillar
clean out of the ground and holds it overhead in his one arm, clods of earth
still raining off the bottom. At his feet five big village men sprawl backwards
where they have fallen, having just failed to shift it. Seen from a low angle so
the pillar towers up and breaks out of the top of the frame.
RIGHT HALF - the running race: Banjjogi hops across the finish rope on his single
leg, already sitting down to wait, while two ordinary young men are still far
behind, red-faced and streaming sweat. Speed lines, a cloud of dust, the crowd
doubled over laughing. Kim the rich woman watches with her mouth open.
Bright daylight, big cheering crowd, playful comic energy.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `12-jar.webp` — 항아리를 통째로 안고 개울로

**이 그림은 펼침면 양쪽을 다 씁니다. 크고 시원하게 그려 주세요.**
이 책에서 가장 통쾌한 대목입니다.

```
Wide panoramic scene, the big moment of the book. Banjjogi wades out into a
clear shallow stream with an enormous earthenware jar - taller than his own
chest - hugged against him in his one arm, and is tipping it down into the water
so it fills with a great gulp. His single leg is braced in the current, water
foaming white around it. He is grinning hugely and winking back over his
shoulder at the crowd.
On the bank behind him the whole village is packed together, mouths open,
pointing, some already cheering. Kim the rich woman stands at the front with the
useless bucket dangling forgotten from her hand and her jaw hanging down. A
low angle from the water, so Banjjogi and the jar loom large and the crowd is
small behind. Bright water sparkle, splashes flying out of the frame.

COUNT HIS LEGS: there is exactly ONE. One thigh, one knee, one shin, one foot,
standing in the stream. On his other side the empty trouser leg is rolled up
clear of the water and its knot is plainly visible in the air, so anyone can see
at a glance that nothing is there. Take care that ripples, foam and the shadow of
the jar are never mistaken for a second leg - keep the water around him clear and
simple so his single leg reads unmistakably.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

### `13-wedding.webp` — 혼례, 형 둘을 윗자리에 앉힌다

```
Wide panoramic scene. An autumn wedding in a courtyard hung with red and blue
cloth. In the centre Banjjogi in a bridegroom's robe stands beside the bride in
her red wedding hanbok and headpiece, both smiling. On the left, seated at the
place of honour under the awning on good cushions, the TWO elder brothers - only
two, both in their twenties, handsome and smooth-faced - sit with crimson faces
looking at the ground while Banjjogi pours them wine. Their parents, in their
thirties, watch from the right, the mother wiping her eyes. Persimmon trees,
warm golden autumn light, festive.

His bridegroom's robe is long, so take care: the hem must be cut or lifted so
that his ONE leg and ONE foot are clearly visible below it, with the empty
trouser leg knotted and swinging beside them. A long robe must never hide how
many legs he has.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```

## 마지막 장 — `end.webp` (가로 4:3)

반쪽이와 형들이 함께 밭에서 일한다.

```
Wide scene at golden hour. A ripening field. Banjjogi and his two brothers work
side by side in a row, all three laughing at something one of them has just said,
sleeves rolled up. The old mother and the young wife carry a lunch tray toward
them along the ridge path. Warm harvest colours, distant blue mountains, wide
open sky. Peaceful and companionable.
Banjjogi's FACE is whole and cute - both eyebrows, thick braided hair, a wide
smile, ONE eye big and round and open, the OTHER eye a closed curved-up winking
line. His BODY is one-sided: one arm and one leg, both on the open-eye side; the
empty sleeve and trouser leg are knotted and swing in the air. He hops on his
one leg.
```
