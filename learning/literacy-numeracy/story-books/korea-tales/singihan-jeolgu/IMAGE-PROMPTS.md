# 제미나이 그림 프롬프트 — 신기한 절구

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

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and flat vivid colors, similar to a classic Korean animated storybook.
Two settings: a Korean mountain village of the Joseon era (thatched roofs, pine
forest, mist) and the open sea (wooden fishing boat, rolling waves, wide sky).
Warm greens and browns on land, deep blue-teal and white foam at sea. Expressive
faces, strong storytelling staging. Tense but never frightening - no drowning
shown, no one in real danger of dying. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
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

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. An underwater view looking down into deep blue
sea. Far below on the sandy seabed sits a small round grey stone mortar, and from
its mouth a thick white cloud of salt billows endlessly upward, spreading through
the water toward the surface. Shafts of pale light come down from above, a few
fish drifting. Quiet, strange, beautiful.
```

## 본문 열 장 (모두 가로 2:1)

### `01-mountain.webp` — 안개 속의 노인

```
Wide misty mountain forest scene. On the left, the woodcutter stands on a narrow
trail with his empty A-frame carrier, looking up in surprise, one hand still on
the strap. On the right, a tall white-bearded elder in pale flowing robes stands
half hidden in drifting mist between the pines, feet not quite visible. Cool grey
green light, hushed and mysterious.
```

### `02-mortar.webp` — 절구를 건네받다

```
Wide forest scene. In the centre, the elder holds out a small round grey stone
mortar in both hands toward the woodcutter, who reaches for it with both hands
and a puzzled, careful expression. Mist swirls thickly behind the elder, already
beginning to close over him. Soft light through pine branches.
```

### `03-rice.webp` — 쏟아지는 쌀

```
Wide scene inside a modest Korean house yard. In the centre, the stone mortar
sits on a straw mat with a bright stream of white rice pouring up and out of it,
heaping high across the ground. On the left, the woodcutter throws both arms up
in delight. On the right, neighbours crowd in with bowls and sacks, laughing.
Sunny, joyful, generous.
```

### `04-rumor.webp` — 소문을 들은 도둑

```
Wide village street scene. On the left, two villagers stand talking with animated
gestures, one pointing back toward a house. On the right, in the foreground, the
thief leans against a wall with the cloth over his face, head tilted to
eavesdrop, one eye narrowed and a sly grin showing above the cloth. Bright day,
long shadows.
```

### `05-steal.webp` — 한밤중의 도둑질

```
Wide moonlit night scene. On the left, the thief straddles the top of a low
earthen wall, a bulging sack on his back with the round shape of the mortar
inside, one leg already over. On the right, the sleeping house with its dark
paper windows, and beyond it a path leading toward a strip of moonlit sea on the
horizon. Deep blue night, tiptoeing tension.
```

### `06-salt.webp` — 바다 위에서 소금을 부르다

```
Wide open sea scene. A small wooden boat sits alone in the middle of calm dark
water under a wide sky. The thief kneels in the boat with both arms raised in
triumph, mouth open shouting, the stone mortar in front of him already spitting a
white fountain of salt into the air. Land is a thin line far away on the left.
Bright and comic.
```

### `07-more.webp` — 멈추지 않는 소금

```
Wide sea scene, closer in. The boat is now half full of white salt piling up
around the thief's legs. He grabs the mortar with both hands trying to tip it
over, face contorted in panic, mouth wide open yelling, while the salt fountain
sprays higher than his head. Waves start to slap the hull. Dramatic and funny at
once.
```

### `08-sinking.webp` — 기울어지는 배

```
Wide sea scene. The boat tilts steeply, gunwale almost at the waterline, buried
in a mountain of white salt. The thief clings to the mast with both arms, waving
one hand toward the empty horizon, mouth open calling for help. Grey-blue rolling
waves all around, empty sea to every edge. Keep it dramatic but not grim - no
sense of drowning.
```

### `09-plank.webp` — 널빤지를 붙잡고

```
Wide dawn sea scene. In the centre, the thief floats holding onto a broad wooden
plank with both arms, soaked and exhausted, blinking at the sky, the cloth gone
from his face. A calm pale pink and grey dawn, low gentle swells, a distant
shoreline on the right. Empty-handed and worn out, but plainly safe.
```

### `10-sea.webp` — 바닷속의 절구

```
Wide underwater scene. On the seabed toward the left sits the small grey stone
mortar, endlessly pouring a thick white plume of salt that drifts and spreads
across the entire width of the frame. Fish swim through the cloud. Above, the
underside of the water surface glitters with light. Calm, strange, wondrous.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet Korean seashore at sunrise, no people. Gentle waves washing over dark
rocks, white salt crusted along the tide line, a wooden boat pulled up on the
sand in the distance, warm pink and gold sky. Peaceful.
```
