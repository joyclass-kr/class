# 제미나이 그림 프롬프트 — 황소가 된 농부

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.

## 다시 만들 그림 — `04-become` 한 장

받은 그림 안에 **「MOOO?!」라는 영어 말풍선**이 박혀 있습니다. 우리말 그림책에 영어가 들어간 셈이라 그 한 장만 다시 만들어 주세요. 그림 자체는 아주 좋습니다 — 반쯤 소가 된 몸에 바지만 사람 것이 남아 있고 노인이 팔짱을 낀 채 지켜보는 구도 그대로면 됩니다.

아래 `04-become` 프롬프트에 글자 금지 문장을 맨 앞으로 옮겨 두었습니다. 문단 끝에 묻어 두면 잘 안 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean farming village of the Joseon era: thatched-roof
cottages, earthen walls, ploughed fields and rice paddies, a village market of
straw-mat stalls, a cattle shed, pine hills. Warm earth palette - straw yellow,
clay brown, grass green, sky blue. Big expressive faces, exaggerated comic
gestures. Never show the ox being struck or hurt. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The farmer: a man in his thirties with a round face and droopy sleepy eyes, messy
topknot, rumpled off-white hanbok, always slouching - later, after he turns back,
the same face but upright and bright-eyed. His wife: a brisk woman in a faded
green and white hanbok, hands on hips, one eyebrow permanently raised. The old
man of the mountain: a lean elder with a long white beard and a wide straw hat
that shadows his eyes, quietly amused, faintly mischievous. The ox: a large
yellow-brown Korean ox with a broad back and gentle dark eyes - his eyes should
carry the farmer's very human dismay throughout. The ox mask: a simple carved
wooden ox-head mask, brown, painted like a Korean folk dance mask.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A carved wooden ox-head mask hangs from a low
branch of a large tree, swaying slightly, seen up close in the foreground. Behind
and far below, a small Korean village with thatched roofs and ploughed fields in
warm afternoon light. Long shadows stretch toward the viewer. Curious and a
little ominous.
```

## 본문 열 장 (모두 가로 16:9)

### `01-lazy.png` — 해가 중천인데 누워 있는 농부

```
Wide cutaway view of a modest Korean room with the front wall removed. On the
left, the farmer sprawls flat on his back on the floor, one arm over his eyes,
mouth open, clearly asleep at midday. On the right, his wife stands in the
doorway with hands on hips, one eyebrow up, pointing outside toward the fields.
Bright noon sunlight streaming in. Comic domestic scene.
```

### `02-leave.png` — 슬그머니 집을 나서는 농부

```
Wide village scene. On the left, the farmer sneaks away down a dirt path with
exaggerated tiptoeing steps, hands raised, glancing back over his shoulder with a
guilty face. On the right, his house sits with the door still open. The path
leads off toward pine-covered hills. Bright day, long grass along the path.
```

### `03-mask.png` — 나무 아래의 노인

```
Wide scene under an enormous old tree on a mountain path. On the right, a lean
white-bearded elder in a wide straw hat sits cross-legged on a root, holding up a
carved wooden ox-head mask in both hands, a faint knowing smile. On the left, the
farmer leans in with both hands on his knees, eyes wide and greedy with interest.
Dappled green light.
```

### `04-become.png` — 탈을 쓰자 황소가 되다

```
ABSOLUTELY NO TEXT ANYWHERE IN THIS IMAGE. No speech bubbles, no letters, no
sound effects, no "moo", no writing of any kind. This is a Korean picture book.

Wide scene under the same tree, mid-transformation and very comic. In the centre,
the farmer has the ox mask pressed to his face; his hands are already turning
into hooves, brown fur sweeping up his arms, his hanbok bursting at the seams,
one leg still human. He is bellowing with his mouth wide open, but draw the sound
only through his face and posture - never as written letters. Motion lines and
puffs of smoke. On the right, the elder watches calmly with his arms folded,
wearing a Korean gat or a plain topknot, not a conical straw hat.
```

### `05-sold.png` — 장터에서 팔리는 황소

```
Wide bustling village market scene with straw-mat stalls. In the centre, the
elder holds a rope halter and gestures proudly toward a large yellow-brown ox
whose eyes are wide with very human panic and whose mouth hangs open. On the
right, a buyer in work clothes counts coins into the elder's palm. Villagers and
other animals fill the background. Sunny and busy.
```

### `06-work.png` — 새벽부터 밭을 가는 황소

```
Wide field scene at dawn. The ox pulls a wooden plough from right to left across
a broad ploughed field, head down, straining, breath steaming in the cold air.
The new owner walks behind holding the plough handles, calling out. Long furrows
stretch to the edges of the frame, pale pink and grey sunrise sky. Hard work, but
nothing cruel shown.
```

### `07-regret.png` — 외양간에서 후회하는 황소

```
Wide cutaway view of a straw-roofed cattle shed at night. The ox lies on straw
filling most of the frame, chin resting on the ground, one big tear rolling down
his cheek, eyes full of human sorrow. A trough of dull fodder sits untouched
beside him. Through the shed opening on the right, the moon and the distant
silhouette of a village. Quiet and touching.
```

### `08-radish.png` — 무를 뽑아 먹는 황소

```
Wide scene beside a radish field. On the left, rows of white Korean radishes with
green tops in dark soil. In the centre, the ox has pulled one up and is chewing
it whole, leaves sticking out of his mouth, eyes half closed in pure hunger,
completely absorbed. On the right, a rope trails loose behind him. Bright sunny
afternoon.
```

### `09-human.png` — 사람으로 돌아오다

```
Wide scene in the radish field, the moment of transformation. In the centre, the
farmer stands upright among the radish rows, arms flung wide, mouth open in
astonishment, fur and hooves vanishing into puffs of smoke around him, the ox
mask lying split on the ground. On the right, the owner has fallen backward onto
his seat, hat rolling away, eyes like saucers. Explosive comic energy.
```

### `10-work-hard.png` — 부지런해진 농부

```
Wide sunny field scene. On the left, the farmer works a hoe with real energy,
sleeves rolled, sweat flying, a wide grin on his face. On the right, his wife
carries a lunch tray along the path, laughing, one hand raised in greeting.
Behind them, a neat well-tended field and their thatched house. Bright green and
gold, warm and cheerful.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet Korean field at sunset, no people. A wooden plough rests at the edge of a
neatly ploughed field, a hoe leaning against a low stone wall, rows of green
radish tops in the foreground, warm orange light across the furrows. Peaceful and
satisfied.
```
