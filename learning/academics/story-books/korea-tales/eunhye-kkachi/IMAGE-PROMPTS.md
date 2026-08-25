# 제미나이 그림 프롬프트 — 은혜 갚은 까치

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 마지막 「끝」 쪽 한 자리에만 쓰입니다.** 가로로 넓은 칸(1.7 : 1)입니다.
> 「읽고 나서」 쪽에는 그림이 들어가지 않습니다 — 두 칸 다 글입니다.
> 칸에 꽉 차게 잘라 넣는 방식이니, 아래 비율표대로 만들어 주세요.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and flat vivid colors, similar to a classic Korean animated storybook.
Setting is a deep Korean mountain of the Joseon era: tall red-barked pines,
rocky ridges, a narrow forest trail, a small tiled-roof temple high on the slope.
Daytime scenes use warm green and gold; night scenes use deep indigo and
lamplight. Expressive faces, clear storytelling staging. Suitable for children -
tense but never gruesome, no blood, no injury shown. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The scholar: a young Korean man in his twenties in a clean pale blue scholar's
hanbok and a black horsehair hat, a cloth bundle on his back and a bow over one
shoulder, earnest open face. The magpies: two black-and-white Korean magpies with
long blue-sheened tails, drawn large and expressive, always together as a pair.
The great serpent: a huge dark grey-green snake, thick as a man's arm, more
imposing than horrifying - keep it stylised and folk-tale-like, never realistic
or scary. The woman: a pale woman in a plain white hanbok with long black hair,
calm and unreadable; in the night scene her presence is suggested by her voice
and the serpent, not by a monstrous transformation.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A moonlit Korean mountain at night. High on the
slope, a small old temple with a hanging bronze bell under a tiled roof, lit
faintly blue. Two magpies fly upward toward the bell through the dark, wings
spread, drawn small against the great mountain. Pines on either side, a full moon
behind the peak. Quiet, dramatic, hopeful.
```

## 본문 열 장 (모두 가로 2:1)

### `01-road.png` — 한양 가는 산길

```
Wide panoramic mountain landscape in late afternoon. A young scholar in pale blue
hanbok and black hat walks a narrow dirt trail from left to right, cloth bundle
on his back, bow over one shoulder, looking up at a high ridge ahead. Tall pines
line the trail, distant blue mountain ranges layered behind, long golden light.
```

### `02-nest.png` — 둥지로 다가가는 구렁이

```
Wide forest scene. On the right, a huge old pine with a magpie nest high in the
branches; a large dark grey-green snake winds up the trunk toward it, stylised
and folk-art-like. Two magpies beat their wings frantically in the air beside the
nest, beaks open. On the left, far below, the small figure of the scholar looks
up, one hand shading his eyes. Tension without menace.
```

### `03-arrow.png` — 활을 쏘는 선비

```
Wide forest scene. On the left, the scholar stands with his bow fully drawn, one
eye closed, body braced, arrow just released with a sharp motion line streaking
across the frame. On the right, the great snake falls away from the tree trunk in
a loose curve, no wound or blood shown, just motion. The two magpies swoop
overhead. Dynamic and clean.
```

### `04-house.png` — 산속 외딴집

```
Wide night landscape. Dark forested slopes fill most of the frame. On the right,
a single small thatched house with one paper window glowing warm yellow, the only
light for miles. On the left, the scholar approaches along the trail, small and
weary, one hand raised toward the door. Deep indigo night, stars above the
ridgeline. Lonely and a little eerie.
```

### `05-coil.png` — 몸을 감은 구렁이

```
Wide interior of a dim Korean room at night, seen from the side. The scholar lies
on a sleeping mat on the right, eyes wide open in shock, arms pinned, as the huge
stylised snake loops around him in smooth folk-art curves. On the left, the paper
door glows faint blue with moonlight. Keep the snake decorative and rounded, not
realistic. Tense but not frightening.
```

### `06-revenge.png` — 낮의 그 여인

```
Wide interior of the same room. On the right, the snake's large head rises beside
the scholar, calm rather than snarling, eyes steady. On the left, half in shadow
near the door, the pale woman in white hanbok stands with her back partly turned,
long black hair down, speaking quietly. The scholar looks between them, face
drained. Cool blue moonlight, still and quiet.
```

### `07-bell.png` — 종을 치라는 조건

```
Wide interior with a view through the open paper door. Inside on the left, the
snake's head and the bound scholar. Through the doorway on the right, far up the
dark mountain, the tiny silhouette of the temple and its hanging bell under a
sliver of moon. The scholar stares out at it, hopeless. Strong depth between the
near room and the distant temple.
```

### `08-ring.png` — 새벽에 울린 종

```
Wide night-to-dawn mountain scene, viewed from outside. High on the slope, the
old temple bell swings, sound rings drawn as expanding pale arcs in the air. Two
magpies fly hard at the bell, wings beating, small and determined against the
huge bronze. The sky at the right edge is just beginning to turn pale grey-pink.
Dramatic and moving, no injury shown.
```

### `09-temple.png` — 종 아래의 까치들

```
Wide scene at the old mountain temple at dawn. On the right, the great bronze
bell hangs under its tiled roof. Below it on the stone platform lie two magpies,
wings folded, eyes closed as if asleep. On the left, the scholar has just run up
the steps and stops short, both hands going to his mouth. Soft pink dawn light,
mist in the valley. Sad and tender, never grim.
```

### `10-nest-home.png` — 되살아난 까치

```
Wide sunny scene in the courtyard of a modest Korean house. On the left, the
scholar sits on the wooden veranda smiling up, one arm still raised from letting
go. On the right, the two magpies fly up toward a large tree where they have
built a nest, wings wide, clearly healthy again. Blue sky, green leaves, warm and
joyful.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean mountain temple at sunrise, no people. The bronze bell hangs
still under its tiled roof, two magpies perched together on the beam above it,
mist clearing from the valley below, warm light on the stone steps. Peaceful.
```
