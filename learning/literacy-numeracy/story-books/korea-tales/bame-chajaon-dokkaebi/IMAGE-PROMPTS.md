# 제미나이 그림 프롬프트 — 밤에 찾아온 도깨비

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


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
| 본문 그림 10장 (`01`~`10`) | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**도깨비를 무섭게 그리지 마세요.** 우리 도깨비는 괴물이 아니라 짓궂은 이웃 같은 존재예요. 덩치는 크되 얼굴은 우스꽝스럽고 어수룩해야 합니다. 마지막 두 장에서 정체가 낡은 빗자루로 드러나는 것이 이 이야기의 웃음이니, 도깨비의 생김새 어딘가에 빗자루를 슬쩍 닮은 구석을 넣어 주면 좋아요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era village at night: a dark dirt road, a shallow stream
with stepping stones, a big old willow on the bank, thatched roofs beyond.
NO MOON AND NO STARS in any night scene — a goblin only comes out when the air
is damp and it is too dark to tell one thing from another. Light the night
scenes with a faint blue-grey glow low on the horizon and a little mist, deep
indigo everywhere else: shapes just readable, never pitch black on the page.
Warm gold for the morning ones. Playful and funny, never scary. No text or letters in the image.
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
Kim: a wiry cheerful farmer in his thirties, topknot, an old jacket with the
sleeves rolled, red-cheeked from drink, plucky rather than brave.
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
The broom: an old Korean broom of bound straw, the bristles worn down to a stub.
THIS book has only ONE dokkaebi and he is the exception: he was once a
worn-out straw broom, so give him a single short horn and a few straw-
coloured tufts standing up on top of his head - but his skin is still
smooth blue, not furry, and he is built like the others.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up a dark village road. In the upper
half, a huge blue-grey goblin with one stubby horn and straw-like bristly hair
stands astride the road, hands on hips, grinning down. At the bottom of the
frame, small by comparison, a man in a topknot stands frozen with his arms out.
No moon and no stars — only a faint pale glow low behind them and drifting mist. Funny rather than frightening.
```

## 본문 열 장 (모두 가로 16:9)

### `01-nightroad.webp` — 앞이 안 보이는 밤, 집으로 가는 길

```
Wide country road scene on a moonless night. On the left, Kim weaves along a
dirt path between fields, both fists balled up, chin out, putting on courage. On
the right, the road drops toward a shallow stream with flat stepping stones and a
big old willow, all of it half swallowed in mist. No moon, no stars — a faint
blue-grey glow low in a deep indigo sky is the only light. Damp and dark.
```

### `02-challenge.webp` — 징검다리를 막아선 도깨비

```
Wide night scene at the stream. On the right, the huge blue-grey goblin stands on
the far end of the stepping stones with his feet planted wide and hands on his
hips, grinning, one stubby horn catching the faint glow, bristly hair sticking out
in all directions. On the left, Kim has stopped dead on the near bank, arms up,
eyes like saucers. Only a faint pale glow on the water. No moon, no stars.
```

### `03-grip.webp` — 허리를 맞잡은 두 사람

```
Wide night scene on the sandy bank. In the centre, Kim and the goblin have taken
Korean wrestling grips on each other's belts, foreheads almost touching, both
braced low. The size difference is enormous and absurd - Kim's head barely
reaches the goblin's chest. A faint glow rimming both figures, dust at their feet.
Comic tension.
```

### `04-wrestle.webp` — 바위를 미는 것 같은 힘

```
Wide night scene. The goblin leans in casually with one arm, almost bored, while
Kim's feet have left the ground entirely, legs pedalling in the air, face
squeezed with effort, sweat flying off him in droplets. Deep footprint grooves
dragged across the sand behind him. Dark, misty and very funny.
```

### `05-remember.webp` — 왼다리가 약하다던 말

```
Wide night scene. Kim, still gripped, has gone suddenly still and thoughtful, one
eyebrow lifting as a memory arrives; a small glowing thought bubble beside his
head shows an old grandmother wagging a finger and pointing at a leg. Above him,
the goblin grins on, oblivious. The stream and willow behind. Beat of
anticipation.
```

### `06-throw.webp` — 쿵! 나자빠진 도깨비

```
Wide night scene, explosive. The goblin crashes flat onto his back on the sand
with his legs in the air and his club flying away, a huge dust cloud and impact
lines around him, eyes spinning. On the left, Kim stands panting in a low finishing
stance, one fist clenched. Sand flying everywhere in the dark. Peak slapstick.
```

### `07-tied.webp` — 버드나무에 꽁꽁 묶다

```
Wide night scene at the willow. In the centre, the goblin is lashed to the thick
willow trunk with a long cloth belt wound many times around him, only his head
and one arm free, mouth wide open bellowing, eyebrows up in outrage. On the left,
Kim walks away backwards pointing a warning finger, grinning, his other hand
holding his trousers up at the waist — he used his belt to tie the goblin. Mist
through the willow leaves, no moon.
```

### `08-boast.webp` — 마을 사람들을 데리고 나서다

```
Wide village street scene in bright morning. On the left, Kim strides ahead with
his chest puffed out, both arms sweeping in a grand gesture, talking loudly. Behind
and to the right, a crowd of villagers of all ages follows, some sceptical with
folded arms, children running ahead excitedly. Warm gold morning light, long
shadows.
```

### `09-broom.webp` — 묶여 있던 것은 낡은 빗자루

```
Wide morning scene at the willow. In the centre, the cloth belt is still wound
many times around the trunk exactly as before - and inside it, a single worn-out
straw broom with its bristles rubbed down to a stub. The crowd on the right
leans in staring, mouths open. On the left, Kim points with one finger, his own
face slowly falling. Bright, ridiculous, perfect.
```

### `10-laugh.webp` — 웃음바다가 된 마을

```
Wide morning scene by the stream. The whole crowd has dissolved into laughter -
people doubled over, slapping knees and each other's backs, children rolling on
the grass, one man holding the old broom up like a trophy. In the centre-left,
Kim stands crimson to the ears, hat pulled down over his eyes. Bright and
joyful.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet village lane at dusk, no people. A worn-out straw broom leans against a
mud wall beside a gate, the last of the daylight behind the roofs, one long shadow
stretching from the broom across the lane. Calm, with a wink.
```
