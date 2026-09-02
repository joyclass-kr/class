# 제미나이 그림 프롬프트 — 멸치의 꿈

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

**물고기들이 왜 그렇게 생겼는지가 그림으로 보여야 합니다.** 8번부터 12번까지 다섯 장면은 각각 한 물고기의 생김새가 바뀌는 순간이에요. **바뀌기 전과 후가 확실히 달라야** 합니다 — 넙치는 처음에 눈이 양옆에 하나씩, 메기는 입이 보통, 병어는 입이 보통, 꼴뚜기는 눈이 머리에, 망둥이는 눈이 보통. 1번부터 7번까지는 전부 평범한 생김새로 그려 주세요. 그래야 마지막 장들이 웃깁니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and vivid colors, similar to a classic Korean animated
storybook. Setting is the sea floor drawn like a Korean room: sandy ground,
swaying seaweed, coral and shells arranged like furniture, a low Korean feast
table set with dishes. Bright blue-green water with shafts of light from above.
Big exaggerated cartoon faces on all the fish, heavy slapstick motion lines.
Funny, never scary, no blood. No text or letters in the image.
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
Myeolchi the anchovy: a small slim silver fish with a huge self-important face,
tiny body, always puffed up and gesturing grandly. Neopchi the flatfish: a broad
flat brown fish, and CRUCIALLY - in pictures 1 to 7 he has one eye on each side
of his head like a normal fish; only from picture 8 do both eyes end up on one
side. Mangdungi the goby: a stubby speckled fish, exhausted and put-upon; normal
eyes until picture 12, then bulging. Megi the catfish: a long grey fish with
whiskers and a NORMAL mouth until picture 9, then split wide side to side.
Byeongeo the pomfret: a round silver fish, normal mouth until picture 10, then
tiny and pursed. Kkolttugi the small squid: normal eyes on the head until picture
11, then slid down onto the body.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up from the sea floor through bright
blue-green water toward the surface far above. A tiny silver anchovy floats in
the middle of the frame with its eyes closed, drifting upward as if in a dream,
surrounded by soft bubbles. Near the top, the shimmering underside of the water
surface and a faint suggestion of a net. Dreamy and slightly ominous.
```

## 본문  장 (모두 가로 16:9)

### `01-dream.webp` — 하늘로 떠올랐다 떨어지는 꿈

```
Wide dream-like underwater scene. Across the frame, a small silver anchovy
floats with eyes closed, drawn twice in a soft arc - once rising up through
bubbles toward the light, once falling back down. Pale dream colours, hazy edges,
clouds suggested in the water above. Beautiful and strange.
```

### `02-wake.webp` — 벌떡 일어난 멸치

```
Wide underwater scene at the sea floor. In the centre, the anchovy has shot
upright out of a bed of seaweed with both fins raised and eyes enormous, mouth
open. Around him, ordinary sea floor - shells, coral, waving weed. A few startled
small fish dart away. Bright morning light through the water. Comic.
```

### `03-send.webp` — 망둥이를 부르는 멸치

```
Wide underwater scene. On the left, the anchovy points imperiously off to the
right with one fin, chest puffed, chin high - absurdly grand for something so
tiny. On the right, a stubby speckled goby with normal round eyes slumps with his
fins drooping, mouth open in dismay. Bright and funny.
```

### `04-journey.webp` — 밤낮으로 헤엄친 망둥이

```
Wide panoramic underwater seascape. The goby swims from right to left across the
entire frame with heavy speed lines and a trail of bubbles, fins visibly ragged,
tongue out. The sea floor changes beneath him from rocks to sand to mudflat,
showing the distance travelled. Behind him at the far right, a broad flat fish
follows with one eye on each side of its head. Epic and exhausting.
```

### `05-feast.webp` — 상다리가 휘어지게 차린 상

```
Wide underwater scene arranged like a Korean room. In the centre, a low feast
table piled with seaweed dishes and shell bowls. On the right, the anchovy
gestures grandly at it. On the left, the flatfish settles at the table - draw him
clearly with one eye on each side. Behind them, the catfish, the pomfret and the
small squid crane in, all with completely normal faces. Warm and festive.
```

### `06-tell.webp` — 꿈 이야기를 늘어놓는 멸치

```
Wide underwater scene at the table. In the centre, the anchovy stands on his tail
acting out the dream with both fins sweeping upward, eyes shining. Above him, a
soft thought bubble shows him rising through clouds. Around the table, all five
fish lean in, mouths slightly open, still perfectly normal-looking. Bubbles and
lamplight-like glow.
```

### `07-bad.webp` — 그물에 걸려 올라가는 꿈이오

```
Wide underwater scene at the table. On the left, the flatfish speaks with his
eyes closed and one fin raised in solemn explanation - still one eye per side.
Above him, a thought bubble shows a net, then smoke, then a soup bowl. On the
right, the anchovy's face has gone from delight to disbelief to fury in one
frame, fins clenched. The others freeze. Perfect comic beat.
```

### `08-slap.webp` — 뺨을 맞고 눈이 한쪽으로

```
Wide underwater scene, explosive slapstick. In the centre, the anchovy's tail
whips around in a huge arc with impact stars, and the flatfish tumbles sideways
across the frame in a roll of bubbles. At the end of his tumble, his two eyes have
slid together onto one side of his head, both blinking in astonishment. Dust of
sand kicked up. Hilarious.
```

### `09-catfish.webp` — 웃다가 입이 찢어진 메기

```
Wide underwater scene. In the centre, the catfish throws his head back roaring
with laughter, whiskers flying - and mid-laugh his mouth tears wide open from side
to side, drawn with small motion cracks at each corner. His eyes go round with
alarm even as he laughs. In the background, the flatfish sits dazed with both eyes
on one side. Big and funny.
```

### `10-pomfret.webp` — 입을 오므리다 작아진 병어

```
Wide underwater scene. On the right, the round silver pomfret squeezes his mouth
shut with both fins pressed over it, cheeks bulging, eyes screwed tight, trying
desperately not to laugh. Small strain lines all around his mouth, which has
shrunk to a tiny pucker. On the left, the catfish with his new split mouth points
at him and laughs harder. Comic chain reaction.
```

### `11-squid.webp` — 넘어져 눈이 아래로 내려간 꼴뚜기

```
Wide underwater scene. In the centre, the small squid has tripped over a rock in
mid-flight and is somersaulting head-first, tentacles flailing, bubbles
everywhere. As he lands, his two eyes slide visibly down off his head onto his
body, drawn with little slip lines. His expression is pure bewilderment.
Slapstick.
```

### `12-goby.webp` — 눈이 툭 불거진 망둥이

```
Wide underwater scene, everyone in frame. In the foreground on the left, the goby
stares at the chaos with both eyes bulging right out of his head, fins limp,
utterly done. Behind him, the whole cast now shows their new faces - flatfish with
eyes on one side, catfish with a split mouth, pomfret with a tiny mouth, squid
with eyes on his body - and the anchovy still fuming in the middle. Bright,
loud, absurd.
```

### `end.webp` — 마지막 (가로 4:3)

```
A calm sea floor at dawn, no drama. An abandoned low feast table lies tipped
over on the sand with a few shell bowls scattered around it, seaweed swaying
gently, shafts of pale light coming down through the water. Quiet after the
uproar, and a little funny.
```
