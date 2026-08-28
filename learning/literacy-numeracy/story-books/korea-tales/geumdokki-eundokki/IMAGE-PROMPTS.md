# 제미나이 그림 프롬프트 — 금도끼 은도끼

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **10개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **12장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean mountain country of the Joseon era: pine forests,
steep green ridges, a deep still pond, thatched-roof cottages, dirt paths,
stacked firewood. Characters wear hanbok. Magical moments lit with warm golden
light rising out of the water. Big expressive faces, exaggerated comic gestures,
lively motion. No text or letters in the image.
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
The woodcutter: a lean kind-faced young man in a patched pale grey hanbok with
his sleeves tied back, a rough headband, straw sandals, an A-frame carrying rack
on his back. His face is open and honest, easily moved to tears.
The mountain spirit (Sanshin): a tall serene old man with a long flowing white
beard and white robes, wide sleeves, standing on the surface of the water inside
a soft golden halo. Kind but unreadable. Never frightening.
The greedy neighbour: a round well-fed man in a showy blue hanbok with a wide
belt. Big round eager eyes that go into spirals when he sees gold, an enormous
grin, comic sweat, always over-acting with his whole body. Funny and likeable to
look at - the greed is in the over-acting, never in an ugly face.
The three axes: a plain worn iron axe with a smooth wooden handle; a silver axe
that glows cool white; a gold axe that glows warm yellow.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 연못 위로 갈라진 물과 도끼 셋.

```
Vertical portrait composition. A deep green mountain pond at dusk seen from the
shore. The water in the middle has parted into a glowing golden opening, and a
white-bearded mountain spirit in white robes rises from it holding a gleaming
gold axe in one hand and a silver axe in the other. At the very bottom of the
frame, seen from behind and small, the young woodcutter kneels on the bank with
his hands on his knees, looking up. Pine trees frame both sides. Warm gold light
against cool blue-green water. Awe-struck and magical.
```

## 본문 10장 (모두 가로 2:1)

### `01-woodcutter.webp` — 가난한 나무꾼과 낡은 쇠도끼

```
Wide panoramic scene. Evening inside a small thatched cottage yard on the left,
with a mountain ridge on the right. The young woodcutter sits on the wooden
porch edge sharpening a worn iron axe on a whetstone, both hands on the blade,
face lit warm orange by a small oil lamp. His A-frame carrying rack leans on the
wall beside him. A pile of firewood on the right. Cosy and poor.
```

### `02-splash.webp` — 손이 미끄러져 도끼가 날아간다

```
Wide panoramic scene. A pond fills the right two-thirds of the frame, dark green
and still. On the left bank the woodcutter has just swung at a tree and lost his
grip - his body twisted, both hands empty and open, mouth wide in shock. The iron
axe is flying through the air over the water toward the right, with motion lines.
Bright midday, sunlight on the water.
```

### `03-cry.webp` — 물가에 주저앉아 엉엉 운다

```
Wide panoramic scene. Sunset. The woodcutter sits collapsed on the pond bank on
the left, knees drawn up, face buried in his arms, shoulders shaking, big
cartoon tears. His empty axe handle lies beside him. The wide empty pond fills
the right side, reflecting an orange sky. Long shadows. Lonely and sad but not
grim.
```

### `04-spirit.webp` — 물이 갈라지고 산신령이 나타난다

```
Wide panoramic scene. The pond water in the centre-right splits open in a burst
of golden light, and a tall white-bearded mountain spirit in white robes rises
standing on the surface, wide sleeves spread. On the left bank the woodcutter has
scrambled backward onto his hands, rubbing one eye with a fist, mouth open in
astonishment. Cool blue water, brilliant warm gold light, sparkles on the ripples.
```

### `05-gold.webp` — 번쩍이는 금도끼를 내민다

```
Wide panoramic scene. The mountain spirit stands on the water on the right,
holding out a brilliantly glowing gold axe in both hands toward the left. The
woodcutter kneels on the near bank at the left, shielding his eyes with one
raised forearm, squinting away from the glare, the other hand waving 'no'.
Strong yellow light rays radiating from the axe across the water.
```

### `06-silver.webp` — 은도끼를 내민다

```
Wide panoramic scene. Same pond, now with a cool silvery-white glow. The mountain
spirit on the right holds out a shining silver axe. The woodcutter on the left
bank kneels and shakes his head firmly, both hands raised palm-out in refusal,
eyes closed, a small polite smile. Moon-pale light on the rippling water.
```

### `07-iron.webp` — 낡은 쇠도끼를 알아보고 펄쩍 뛴다

```
Wide panoramic scene. The mountain spirit on the right holds out a plain worn
iron axe with a shabby smooth handle - no glow at all. On the left the woodcutter
has leapt up off both feet, arms thrown wide, face split by an enormous delighted
grin, tears of joy flying. Motion lines around him. Bright and comic and warm.
```

### `08-reward.webp` — 산신령이 셋을 다 준다

```
Wide panoramic scene. The mountain spirit stands on the water on the right,
laughing with his head back and a hand on his beard, the three axes - gold,
silver, iron - floating in a row in the air in front of him. The woodcutter on
the left bank waves both hands in flustered refusal, half bowing, cheeks red.
Warm golden light flooding the whole pond.
```

### `09-copy.webp` — 욕심쟁이가 일부러 도끼를 던지고 우는 시늉을 한다

```
Wide panoramic scene. The plump greedy neighbour in a showy blue hanbok stands on
the pond bank at the left, having just hurled his axe far out over the water -
the axe is a small splash on the right. He is squeezing out fake tears, one hand
over his eyes with the fingers spread wide so he can peek through them, the other
hand on his hip. Overacted and funny. Bright daylight.
```

### `10-greedy.webp` — 금도끼가 제 것이라 하자 산신령이 사라진다

```
Wide panoramic scene. The mountain spirit stands on the water on the right,
face gone completely blank and cool, already turning half transparent and
beginning to sink into the closing water, the gold axe pulled back and held
low. On the left bank the greedy man reaches out desperately with both arms
toward the vanishing light, mouth open, one foot lifted, panicking. The golden
glow is shrinking. Cold blue-grey light returning.
```

---

## 마지막 장 — `end.webp` (가로 2:1)

나무꾼이 산으로 돌아간다.

```
Wide scene at dawn. The young woodcutter walks a mountain path away from the
viewer toward a bright sunrise over green ridges, his A-frame rack on his back
and the plain iron axe tucked in his belt. Mist in the valley below, pine trees
either side, birds in the sky. Peaceful, warm, hopeful.
```
