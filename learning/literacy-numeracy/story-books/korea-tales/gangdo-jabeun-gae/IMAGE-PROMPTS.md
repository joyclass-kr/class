# 제미나이 그림 프롬프트 — 강도를 잡은 개

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

웃기는 이야기가 아니라 **손에 땀을 쥐는 이야기**예요. 슬랩스틱은 넣지 말고, 안개와 달리기로 긴장을 만들어 주세요. 강도는 무섭게 그리되 폭력 장면은 넣지 않습니다 — 미는 동작까지만이에요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean bold
outlines and rich colors, similar to a classic Korean animated storybook.
Setting is Joseon-era country roads: a busy market of straw-mat stalls, a
roadside tavern with paper lanterns, a fog-filled mountain pass at dawn, and a
dense pine forest with rocky gullies. Warm amber for the market and tavern, cold
grey-blue for the fog scenes. Expressive faces, real tension in the chase scenes.
No violence beyond a shove, no blood, nobody injured. No text or letters.
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
The pedlar: a lean cheerful man in his forties in worn brown hanbok with a towel
tied round his head and a wooden A-frame carrier on his back, kind crinkled eyes.
Badugi the dog: a medium-sized Korean Jindo-type dog, creamy white with a few
distinct black patches - one over the back, one over the left eye. Alert upright
ears, curled tail. Draw the same patches every time. The robber: a wiry man in
dark grey clothes with a cloth wound round his head, sunken eyes and a mean
narrow mouth, always half hidden by fog or shadow until the end.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A creamy white dog with black patches stands
alert on a fog-covered mountain path, front paws braced, ears up, head turned
sharply toward something off to one side, muscles tensed to run. Thick grey-blue
fog swallows the pines behind him. Far below at the bottom of the frame, the
faint shape of a man sitting slumped on the road. Tense and atmospheric.
```

## 본문 열 장 (모두 가로 2:1)

### `01-dog.webp` — 눈 오는 날 주워 온 개

```
Wide winter scene of a country road under falling snow, drawn as a warm memory.
On the left, a small shivering white puppy with black patches huddles at the foot
of a stone wall. On the right, the pedlar crouches with his hands already
reaching out, snow on his shoulders, a soft smile. Muted white and grey with warm
skin tones. Gentle and tender.
```

### `02-market.webp` — 물건이 다 팔린 장날

```
Wide busy market scene at late afternoon. Rows of straw-mat stalls, crowds in
hanbok, bundles and pots everywhere. In the centre, the pedlar stands beside his
completely empty A-frame carrier, laughing, tucking a fat cloth money pouch into
his waistband. At his feet, Badugi sits with his tail sweeping the ground. Warm
gold light, cheerful bustle.
```

### `03-inn.webp` — 주막의 흘끔거리는 눈

```
Wide interior of a roadside tavern at night, lit by paper lanterns. On the left,
the pedlar sits at a low table over a bowl of soup, holding a piece out to Badugi
who sits beside him. On the right, at the next table, a wiry man in dark grey
watches sideways over his cup, eyes fixed on the pedlar's waistband. Badugi's
head has turned toward him, lip curled. Warm light, cold undertone.
```

### `04-dawn.webp` — 안개 낀 고갯길

```
Wide mountain pass scene at dawn, thick grey-blue fog reducing the pines to
silhouettes. In the centre-left, the pedlar walks up the narrow path with his
carrier, breath steaming. Behind him, Badugi has stopped and turned to look back
down the trail, ears up, whole body tense. The road behind vanishes into white.
Quiet dread.
```

### `05-robbed.webp` — 안개 속에서 튀어나온 사내

```
Wide scene at the top of the fogged pass. In the centre, the robber lunges out of
the fog and shoves the pedlar sideways with one arm while snatching the money
pouch with the other. The pedlar staggers, arms flung out, carrier tipping. On
the right, Badugi launches forward barking, too far to reach them. Motion lines,
sharp diagonal composition. A shove only, nothing worse.
```

### `06-lost.webp` — 방향을 잃은 숲

```
Wide forest scene drowned in fog. In the centre, the pedlar sits slumped on the
ground between the pines, shoulders down, hands limp in his lap, staring at
nothing. Beside him, Badugi has his nose to the earth, sniffing intently, the one
purposeful thing in the picture. Grey-blue light, trees fading to nothing on both
sides.
```

### `07-scent.webp` — 냄새를 잡은 바둑이

```
Wide forest scene. On the right, Badugi has snapped upright, ears rigid, head
pointed sharply to the left, mouth open in a single sharp bark, one front paw
lifted. On the left, the pedlar has half risen with one arm reaching after him,
mouth open calling. Fog swirling in the gap between them. All the energy suddenly
in the dog.
```

### `08-chase.webp` — 나무 사이를 가로질러

```
Wide forest scene, full sprint. Badugi tears from right to left across the frame
between pine trunks, body stretched flat out, ears back, drawn with strong speed
lines and scattered pine needles flying. Fog thinning ahead. In the far left
distance, a rocky gully with a small crouched shape barely visible behind a
boulder. Pure momentum.
```

### `09-bark.webp` — 물고 늘어진 바둑이

```
Wide scene in a rocky gully. On the right, the robber stands with his back to a
boulder, clutching the money pouch to his chest with one arm and kicking out with
one leg, face twisted in panic. On the left and centre, Badugi has the man's
trouser leg gripped in his teeth, all four legs braced, barking around the cloth.
On the far left edge, woodcutters come running with axes over their shoulders.
```

### `10-return.webp` — 다시 돌아온 돈주머니

```
Wide forest clearing scene in morning light, fog lifting. In the centre, the
pedlar kneels on the ground with both arms wrapped tightly around Badugi, face
buried in the dog's neck, eyes shut. The money pouch sits safe on the ground
beside them. On the right, the woodcutters lead the robber away between the
trees. Warm gold light breaking through. Relief and warmth.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet Korean farmyard at sunset, no people. A wooden dog bowl sits by the
veranda step with a piece of meat in it, an empty A-frame carrier leaning against
the wall behind, warm orange light across the swept earth, a few paw prints in
the dust. Peaceful and grateful.
```
