# 제미나이 그림 프롬프트 — 쥐의 사위 고르기

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**쥐 부부를 늘 작게 그려 주세요.** 해, 구름, 바람, 돌부처를 만날 때마다 상대는 화면을 가득 채우고 쥐 부부는 구석의 작은 점이어야 합니다. 그래야 마지막에 그 작은 쥐가 답이었다는 것이 웃기고 뭉클해져요. 해·구름·바람·돌부처는 모두 얼굴이 있는 옛이야기 속 존재로, 인자하고 조금 익살스럽게 그립니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and warm colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era countryside: a granary with a mouse hole beneath it, a
wide open sky, a high mountain ridge above the clouds, a windy grass field, and a
stone Buddha statue standing at a mountain pass. Warm gold, sky blue and grass
green. The sun, the cloud, the wind and the stone Buddha all have kind
old-fashioned faces. Nothing frightening. No text or letters in the image.
Villains and unkind characters are drawn as ordinary, nice-looking people -
never grotesque, never ugly, no mean squinting eyes, no warts, no snarling
teeth. What is wrong with them shows only in what they are doing and in their
posture, never in a deformed or repulsive face. A cruel character may be
handsome; a kind one may be plain.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Father mouse: a small round grey mouse in a tiny scholar's hat and vest, walking
upright, very serious and self-important. Mother mouse: a small brown mouse in a
tiny apron-like jeogori, brisk and practical. Both are always drawn TINY compared
to whoever they are talking to. Their daughter: a little mouse with a red ribbon,
appearing only in the first and last pictures. The sun: a great golden face with
warm crinkled eyes and a laughing mouth, rays like a mane. The cloud: a soft
white billowing figure with a drowsy round face. The wind: a swirling blue-grey
figure with streaming hair and a mischievous open mouth. The stone Buddha: a
weathered grey granite statue with a calm half-smiling face, moss at its base.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking straight up a towering stone Buddha statue
that fills almost the whole tall frame, its calm face far above at the top
against a blue sky. At the very bottom, at the foot of the statue, two tiny mice
in small hats stand looking up, no bigger than the moss on the stone. Warm
sunlight. The size gap is the whole picture.
```

## 본문  장 (모두 가로 2:1)

### `01-family.webp` — 곳간 밑의 쥐 가족

```
Wide cutaway view of a cosy mouse home under a wooden granary floor. In the
centre, father mouse in a tiny hat and mother mouse in an apron sit beside a
little daughter mouse with a red ribbon, all three round and content. Grains of
rice stacked neatly in a corner, a wooden floorboard ceiling above. Warm amber
light through a knothole. Sweet and domestic.
```

### `02-decide.webp` — 세상에서 제일 센 사위를 찾자

```
Wide scene at the mouse hole entrance at dawn. On the left, father mouse strides
out with one paw raised in a grand declaration, chest puffed out, tiny hat
straight. Beside him mother mouse ties a small bundle, nodding. On the right, the
enormous world opens up - the granary post like a tower, the yard beyond, a huge
sky. Comic ambition.
```

### `03-sun.webp` — 해를 찾아가다

```
Wide sky scene. The whole upper two thirds of the frame is filled by the great
golden face of the sun, rays spreading like a mane, eyes crinkled in a warm
laugh. At the very bottom edge, on a bare hilltop, the two tiny mice stand
looking up with their hats tipped back, one paw raised in a question. Blazing
gold light. Absurd size difference.
```

### `04-sunanswer.webp` — 구름이 나를 가리면

```
Wide sky scene. The sun's face is now half covered by a large soft white cloud
drifting across it, the sun's expression rueful, one ray pointing at the cloud. At
the bottom, the two mice have both turned to follow the pointing ray, mouths
open. Light dimming across the hilltop below them. Funny and clear.
```

### `05-cloud.webp` — 높은 산에서 만난 구름

```
Wide mountain scene above the treeline. Filling the frame, a great billowing
white cloud with a drowsy round face, resting on a ridge. On a rocky outcrop at
the lower right, the two tiny mice stand, mother mouse's skirt whipping, father
mouse gripping his hat. Thin blue air, distant peaks below. Grand and airy.
```

### `06-wind.webp` — 들판에서 부른 바람

```
Wide grass field scene. Across the whole frame, the wind sweeps through as a
swirling blue-grey figure with streaming hair and a laughing open mouth, grass
bending in long waves before it. In the lower left, the two mice are nearly blown
over, father mouse hanging on to a grass stem with both paws, hat flying away.
Dynamic and funny.
```

### `07-windanswer.webp` — 돌부처만은 못 이긴다

```
Wide field scene, calmer. The wind figure has curled around to point off toward a
distant mountain pass on the right, where a small grey stone figure stands. The
mice, still windblown, follow the gesture with their eyes, father mouse retrieving
his hat from a bush. Long grass, low afternoon light. A new direction.
```

### `08-buddha.webp` — 고갯마루의 돌부처

```
Wide scene at a mountain pass. On the right, a weathered grey stone Buddha stands
tall against the sky, moss at its base, face calm and half smiling. At its feet on
the left, the two mice bow low with their paws together, tiny beside the stone
pedestal. Pine ridges behind, warm late light. Reverent and comic at once.
```

### `09-answer.webp` — 쥐라네

```
Wide scene at the pass. The stone Buddha's calm face is tilted slightly downward,
eyes lowered toward its own base. Following that look, in the foreground, the two
mice stand frozen with their jaws hanging open and their eyes gone perfectly
round, paws still raised mid-question. A beat of pure comic silence. Warm gold
light.
```

### `10-explain.webp` — 발밑을 파면 넘어진다

```
Wide scene at the base of the statue, low viewpoint. The stone pedestal fills the
right side, and at its foot the earth is drawn away in a small cutaway showing
tunnels and loose soil beneath. The Buddha's face is far above, speaking calmly.
The two mice look at the soil, then at each other. A single pebble trickles down.
Quietly enormous idea.
```

### `11-realize.webp` — 집으로 돌아오는 길

```
Wide scene of a country road at sunset. In the centre, the two mice walk home
side by side, and both have stopped to look at each other, mouths open in
laughter, father mouse slapping his own knee. Their shadows stretch long and
huge behind them across the road - far bigger than they are. Warm orange light.
Wry and warm.
```

### `12-wedding.webp` — 곳간 밑의 조촐한 혼례

```
Wide cutaway of the mouse home under the granary, decorated for a wedding. In the
centre, the daughter mouse with her red ribbon stands beside a sturdy young mouse
groom, both bowing. Around them, mouse guests raise tiny cups, a table of rice
grains and berries. On the left, father mouse scratches the back of his head with
a sheepish grin. Warm lamplight, festive and tiny.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet mountain pass at dawn, no one there. The old stone Buddha stands calm in
the morning mist, and at its mossy base a single small hole in the earth with a
few grains of soil freshly pushed out. Soft pink light. Peaceful, with a joke
hidden in it.
```
