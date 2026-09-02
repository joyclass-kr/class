# 제미나이 그림 프롬프트 — 연이와 버들 도령

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.


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
| 본문 그림 14장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**추위와 봄의 대비가 이 책의 전부입니다.** 바깥 장면은 얼어붙은 흰색과 잿빛으로, 바위 문 안쪽은 눈이 시릴 만큼 화사한 연둣빛과 분홍빛으로 그려 주세요. 두 세계가 한 그림 안에 같이 나올 때 그 차이가 가장 크게 보여야 합니다.

- **4번과 5번이 이 책의 첫 절정입니다.** 눈밭 한가운데 열린 바위 틈으로 봄빛이 쏟아져 나오는 장면이에요. 문틈에서 새어 나오는 따뜻한 빛과 꽃잎을 아끼지 마세요.
- **10번과 11번은 무섭지 않게.** 계모가 쓰러뜨리는 순간은 직접 그리지 말고, 도령이 풀밭에 쓰러져 있는 모습과 당황한 계모만 보여 주세요.
- **13번의 세 송이 꽃 색을 정확히.** 새하얀 꽃, 연분홍 꽃, 새빨간 꽃 순서예요.
- **14번이 마지막 절정입니다.** 열린 바위 문에서 봄이 눈 덮인 산으로 번져 나가는 장면을 크고 시원하게요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean bold
outlines and vivid colors, in the look of a classic Korean animated storybook.
Two contrasting worlds. Outside: a Joseon-era mountain village buried in deep
snow, bare grey branches, a poor thatched house, an icy stream - painted in
white, pale grey and cold blue. Inside the rock door: a hidden spring valley
with a clear brook, soft green grass, peach blossom, butterflies and warm golden
light - painted in bright fresh greens and pinks. The contrast between the two
is the whole point. No text or letters.
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
Yeoni: a thin girl of about eleven with her hair in a single braid, a patched
pale blue jeogori and a worn indigo skirt far too thin for winter, red chapped
hands and cheeks, a quiet steady face. The stepmother: a sturdy woman in a good
padded dark-green jacket, hair pulled back tight, a hard mouth and quick
calculating eyes - stern, never monstrous or witch-like. Beodeul Doryeong: a boy
of about twelve in a soft grass-green robe with his hair tied back with a green
band, bare feet, a warm easy grin; there is always something green and living
about him. The three flowers: one pure white, one soft pink, one deep red, all
the same simple five-petal shape.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A wall of deep snow and bare grey branches fills
the tall frame. In the middle of it, a great boulder has slid aside, and through
the gap pours warm golden light and a rush of green - grass, blossom and a
butterfly spilling out into the snow. A small girl in a thin blue jacket stands
in the snow before the opening with her hand raised against the brightness, seen
from behind. Cold white outside, blazing spring inside.
```

## 본문  장 (모두 가로 16:9)

### `01-yeoni.webp` — 쉬는 날이 없는 아이

```
Wide scene in the yard of a poor thatched house in deep winter. In the centre,
Yeoni hauls a wooden water bucket with both hands, breath steaming, hands red and
cracked. On the right, the stepmother stands in the doorway with her arms folded,
watching. Snow banked against the walls, icicles on the eaves, bare grey
branches. Cold blue-white light. Bleak but not cruel-looking.
```

### `02-order.webp` — 봄나물을 뜯어 오너라

```
Wide interior of a cold room. On the right, the stepmother tosses a woven
basket across the floor with a flick of her wrist, chin lifted, eyes narrow. On
the left, Yeoni catches it against her chest and looks up with her mouth open in
disbelief. Through the open door behind her, nothing but falling snow. Pale grey
light. Unfair and hard.
```

### `03-snow.webp` — 눈 덮인 산을 헤매다

```
Wide scene on a snowbound mountainside. In the centre, small in a vast white
slope, Yeoni kneels in snow up to her thighs, scraping at the ground with bare
hands, the empty basket beside her. Bare black trees, a frozen stream, snow
still falling. Almost no colour but white, grey and one small patch of pale blue
jacket. Lonely and cold.
```

### `04-door.webp` — 드르륵, 바위가 열리다

```
Wide scene beneath an enormous old willow on the snowy slope. On the right, a
great boulder has slid partway aside and a blade of warm golden light cuts out
across the blue snow, carrying loose pink petals with it. In the gap, a boy's
hand and half his face lean out, grinning. On the left, Yeoni looks up from the
snow, eyes enormous. Cold and warm meeting on one page.
```

### `05-garden.webp` — 바위 안은 온통 봄이었어요

```
Wide scene inside the hidden valley, looking in from the doorway. A clear brook
winds through soft green grass, peach trees in full pink blossom, butterflies,
warm gold sunlight everywhere. In the centre, Yeoni stands just inside with snow
still on her shoulders and both hands pressed to her mouth. Beside her, Beodeul
Doryeong spreads his arms wide in welcome. Overwhelming spring.
```

### `06-doryeong.webp` — 소쿠리 가득 담아 주다

```
Wide scene in the spring valley. In the centre, Beodeul Doryeong kneels in the
grass piling handfuls of fresh green shoots into Yeoni's basket, already
overflowing. Yeoni holds it with both hands, looking down at it, then up at him,
her face slowly breaking into a smile. Butterflies, blossom, warm gold light.
Generous and easy.
```

### `07-again.webp` — 냇가에 발을 담그고

```
Wide scene beside the brook. In the centre, the two children sit side by side
on the bank with their bare feet in the clear water, kicking gently, talking.
Yeoni is laughing with her head back - the first time in the book. Fish in the
water, blossom drifting down, a butterfly on her knee. Dappled warm light.
Peaceful and happy.
```

### `08-suspect.webp` — 이걸 어디서 뜯어 오느냐

```
Wide interior of the cold house. On the right, the stepmother holds up a bunch
of impossibly fresh green shoots against the grey winter light from the door,
turning it over, eyes narrowing to slits. On the left, Yeoni stands with her
hands behind her back and her eyes on the floor. Snow visible outside. Cold light.
Suspicion.
```

### `09-follow.webp` — 눈 위의 발자국을 따라

```
Wide scene on the snowy slope. On the left, Yeoni walks ahead toward the willow,
small, unaware. On the right, the stepmother creeps from tree to tree behind her,
bent low, following a line of small footprints in the snow, her face lit with
greed as the golden crack in the boulder appears ahead. Cold blue snow, one warm
sliver of light. Tense.
```

### `10-strike.webp` — 풀밭에 쓰러진 도령

```
Wide scene inside the spring valley. On the left, the stepmother has stopped
dead, arms full of torn greens and blossom branches, bundle spilling, her face
frozen in shock at what she has done. On the right, Beodeul Doryeong lies still
in the green grass with his eyes closed, one arm out, looking asleep. Do not draw
any violence. Warm light gone slightly pale. Quiet and awful.
```

### `11-flee.webp` — 쿠르릉, 닫히는 문

```
Wide scene at the rock doorway from inside. In the centre, the great boulder is
grinding shut, dust and small stones raining down, the gap narrowing to a slot of
white winter light. Through it, the stepmother scrambles out on all fours,
bundle abandoned behind her, face white with terror. Motion lines, falling grit.
Frightening but bloodless.
```

### `12-flowers.webp` — 냇가에 핀 세 송이

```
Wide scene by the brook. On the left, Yeoni kneels beside the fallen boy with
one hand on his shoulder, shoulders shaking. On the right, at the water's edge,
three simple five-petal flowers have opened where there were none before - one
pure white, one soft pink, one deep red - each glowing faintly. Yeoni's head has
turned toward them. Soft light, held breath.
```

### `13-revive.webp` — 에취!

```
Wide scene in the grass. In the centre, Beodeul Doryeong sits bolt upright
mid-sneeze, eyes squeezed shut, hair flying, the deep red flower tumbling off his
chest. On the left, Yeoni falls back onto her hands with her mouth wide open. The
white and pink flowers lie beside him. Petals and light bursting outward. Joyful
and funny.
```

### `14-spring.webp` — 봄이 문으로 걸어 나오다

```
Wide scene of the whole snowy mountainside from a distance. In the centre, the
rock door stands wide open and a broad wave of green and blossom pours out of it
across the white slope, snow retreating before it, colour spreading up the valley.
Small in the middle of it, the two children stand together in the opening. Bright,
huge, triumphant.
```

### `end.webp` — 마지막 (가로 4:3)

```
A hidden spring valley with no one in it. A clear brook, soft green grass, peach
blossom drifting down, and on the bank an empty woven basket lying on its side
with three simple flowers beside it - one white, one pink, one red. Warm gold
light. Peaceful and alive.
```
