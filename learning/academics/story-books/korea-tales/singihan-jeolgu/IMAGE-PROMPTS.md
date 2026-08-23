# 제미나이 그림 프롬프트 — 신기한 절구

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
Children's picture book illustration, bright cel-animation style with clean bold
outlines and flat vivid colors, similar to a classic Korean animated storybook.
Two settings: a Korean mountain village of the Joseon era (thatched roofs, pine
forest, mist) and the open sea (wooden fishing boat, rolling waves, wide sky).
Warm greens and browns on land, deep blue-teal and white foam at sea. Expressive
faces, strong storytelling staging. Tense but never frightening - no drowning
shown, no one in real danger of dying. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The woodcutter: a lean kind-faced man in his thirties in patched off-white work
hanbok, a towel tied round his head, a wooden A-frame carrier on his back. The
old man of the mountain: a tall elder with a long white beard and flowing pale
robes, calm and slightly unreal, always partly veiled in mist. The thief: a wiry
man in dark brown clothes with a cloth over the lower half of his face, darting
eyes, greedy grin that turns to panic later. The mortar: a small round grey stone
mortar, about the size of a large bowl, with a simple carved rim - keep it
identical in every picture.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. An underwater view looking down into deep blue
sea. Far below on the sandy seabed sits a small round grey stone mortar, and from
its mouth a thick white cloud of salt billows endlessly upward, spreading through
the water toward the surface. Shafts of pale light come down from above, a few
fish drifting. Quiet, strange, beautiful.
```

## 본문 열 장 (모두 가로 16:9)

### `01-mountain.png` — 안개 속의 노인

```
Wide misty mountain forest scene. On the left, the woodcutter stands on a narrow
trail with his empty A-frame carrier, looking up in surprise, one hand still on
the strap. On the right, a tall white-bearded elder in pale flowing robes stands
half hidden in drifting mist between the pines, feet not quite visible. Cool grey
green light, hushed and mysterious.
```

### `02-mortar.png` — 절구를 건네받다

```
Wide forest scene. In the centre, the elder holds out a small round grey stone
mortar in both hands toward the woodcutter, who reaches for it with both hands
and a puzzled, careful expression. Mist swirls thickly behind the elder, already
beginning to close over him. Soft light through pine branches.
```

### `03-rice.png` — 쏟아지는 쌀

```
Wide scene inside a modest Korean house yard. In the centre, the stone mortar
sits on a straw mat with a bright stream of white rice pouring up and out of it,
heaping high across the ground. On the left, the woodcutter throws both arms up
in delight. On the right, neighbours crowd in with bowls and sacks, laughing.
Sunny, joyful, generous.
```

### `04-rumor.png` — 소문을 들은 도둑

```
Wide village street scene. On the left, two villagers stand talking with animated
gestures, one pointing back toward a house. On the right, in the foreground, the
thief leans against a wall with the cloth over his face, head tilted to
eavesdrop, one eye narrowed and a sly grin showing above the cloth. Bright day,
long shadows.
```

### `05-steal.png` — 한밤중의 도둑질

```
Wide moonlit night scene. On the left, the thief straddles the top of a low
earthen wall, a bulging sack on his back with the round shape of the mortar
inside, one leg already over. On the right, the sleeping house with its dark
paper windows, and beyond it a path leading toward a strip of moonlit sea on the
horizon. Deep blue night, tiptoeing tension.
```

### `06-salt.png` — 바다 위에서 소금을 부르다

```
Wide open sea scene. A small wooden boat sits alone in the middle of calm dark
water under a wide sky. The thief kneels in the boat with both arms raised in
triumph, mouth open shouting, the stone mortar in front of him already spitting a
white fountain of salt into the air. Land is a thin line far away on the left.
Bright and comic.
```

### `07-more.png` — 멈추지 않는 소금

```
Wide sea scene, closer in. The boat is now half full of white salt piling up
around the thief's legs. He grabs the mortar with both hands trying to tip it
over, face contorted in panic, mouth wide open yelling, while the salt fountain
sprays higher than his head. Waves start to slap the hull. Dramatic and funny at
once.
```

### `08-sinking.png` — 기울어지는 배

```
Wide sea scene. The boat tilts steeply, gunwale almost at the waterline, buried
in a mountain of white salt. The thief clings to the mast with both arms, waving
one hand toward the empty horizon, mouth open calling for help. Grey-blue rolling
waves all around, empty sea to every edge. Keep it dramatic but not grim - no
sense of drowning.
```

### `09-plank.png` — 널빤지를 붙잡고

```
Wide dawn sea scene. In the centre, the thief floats holding onto a broad wooden
plank with both arms, soaked and exhausted, blinking at the sky, the cloth gone
from his face. A calm pale pink and grey dawn, low gentle swells, a distant
shoreline on the right. Empty-handed and worn out, but plainly safe.
```

### `10-sea.png` — 바닷속의 절구

```
Wide underwater scene. On the seabed toward the left sits the small grey stone
mortar, endlessly pouring a thick white plume of salt that drifts and spreads
across the entire width of the frame. Fish swim through the cloud. Above, the
underside of the water surface glitters with light. Calm, strange, wondrous.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet Korean seashore at sunrise, no people. Gentle waves washing over dark
rocks, white salt crusted along the tide line, a wooden boat pulled up on the
sand in the distance, warm pink and gold sky. Peaceful.
```
