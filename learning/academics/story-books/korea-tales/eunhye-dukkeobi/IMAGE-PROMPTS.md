# 제미나이 그림 프롬프트 — 은혜 갚은 두꺼비

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


> **`end` 그림은 두 자리에 쓰입니다.** 마지막 「끝」 쪽에서는 가로로 넓게(1.7 : 1),
> 「읽고 나서」 오른쪽 위에서는 세로로 길게(0.8 : 1) 들어갑니다.
> 칸에 꽉 차게 잘라 넣는 방식이라, 가로로 넓은 그림을 세로 칸에 넣으면 **좌우가 절반 넘게 잘립니다.**
> 그러니 **중요한 것은 한가운데에 크게 두고, 좌우 가장자리는 하늘이나 들판처럼 잘려도 되는 것으로 채워 주세요.**
> 비율은 아래 표대로 만들되, 가운데만 남겨도 그림이 되도록 그려 달라고 적어 주세요.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**지네를 징그럽게 그리지 마세요.** 사실적인 벌레가 아니라 시퍼런 빛을 두른 커다란 그림자처럼, 옛 그림 속 괴수처럼 다뤄야 합니다. 다리를 자세히 그리지 말고 실루엣과 빛으로만 보여 주세요. 두꺼비도 마찬가지로 귀엽되 위엄이 있어야 하고, 두 빛이 맞부딪히는 9번 장면이 이 책에서 가장 아름다운 그림이 되어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean outlines and
rich colors, similar to a classic Korean animated storybook. Setting is a
Joseon-era village: a dim kitchen with a clay stove and firewood, a mountain path
through pines, and an old wooden shrine with a tiled roof and faded paint. Warm
amber for the kitchen scenes, cold blue and gold for the shrine at night.
Never grotesque or gory - the centipede is a glowing silhouette, never a detailed
insect. Nobody is harmed on the page. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The girl: a thin girl of about twelve in a patched pale hanbok with her hair in a
single plait, a quiet steady face, work-roughened hands. She is never drawn
crying or pitiful - she is calm and kind. The toad: a brown-green toad with a
wide gentle mouth and warm amber eyes. He must visibly GROW across the book -
palm-sized in picture 3, cat-sized by picture 4, and as large as the girl's torso
in the shrine scenes. A soft golden glow gathers on his back in the fight. The
centipede: never drawn in detail - a vast dark coiled silhouette across the shrine
rafters, edged in cold blue-green light, with two pale points where the eyes
would be. Suggestive, not disgusting.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. The dark interior of an old wooden shrine at
night. In the lower half, a large brown-green toad sits facing upward with a warm
golden glow rising from his back. In the upper half, a vast dark coiled shadow
edged in cold blue light presses down from the rafters. The two lights meet in a
band across the middle of the frame. A small girl is just visible behind the
toad. Beautiful and tense.
```

## 본문  장 (모두 가로 2:1)

### `01-girl.png` — 남의 집 부엌에서 일하는 소녀

```
Wide interior of a dim Korean kitchen at evening. On the right, the girl kneels
before a clay stove feeding it firewood, her face lit warm orange from below. On
the left, a low table with several full bowls being carried out, and one very
small bowl left behind on the ledge. Steam, soot, worn wooden beams. Humble and
quiet.
```

### `02-toad.png` — 부뚜막 구석에서 눈을 껌뻑이는 두꺼비

```
Wide interior kitchen scene. On the left, the girl has half risen with a broom in
one hand, stopped mid-motion, looking down in surprise. On the right, in the
shadowed corner of the stove ledge, a small palm-sized brown-green toad sits
blinking up at her, entirely unbothered. Warm firelight, a moment of stillness.
```

### `03-share.png` — 자기 밥을 덜어 주는 소녀

```
Wide interior kitchen scene, close and warm. In the centre, the girl crouches and
tips a few grains of rice from her own small bowl onto the stove ledge with two
fingers, smiling faintly. The little toad stretches its neck toward them. Her
bowl is visibly emptier now. Amber light, tender.
```

### `04-grow.png` — 몰라보게 자란 두꺼비

```
Wide interior kitchen scene, some seasons later. On the right, the toad now sits
as big as a cat on the stove ledge, filling the corner, blinking placidly. On the
left, the girl kneels beside him laughing with both hands raised in mock
astonishment, measuring his width in the air. Warm and funny.
```

### `05-shrine.png` — 뒷산 사당에 산다는 지네

```
Wide mountain scene at dusk seen from the village. In the lower left, thatched
roofs and villagers gathered in a worried knot. High on the ridge to the right,
an old wooden shrine with a tiled roof stands alone among pines, one dark
doorway. Cold blue evening light on the mountain, warm lamplight in the village
below. Dread at a distance.
```

### `06-chosen.png` — 혼자 산길을 오르는 소녀

```
Wide mountain path scene at sunset. In the centre, the girl climbs a winding
path alone, small against the slope, back straight, one hand holding her skirt.
Far below on the left, a cluster of villagers stand watching her go, several with
their heads bowed. Long orange light, very long shadows. Lonely but dignified.
```

### `07-hidden.png` — 치마 속에서 나온 두꺼비

```
Wide interior of the dim shrine. In the centre, the girl sits on the wooden floor
with her knees drawn up, and has just lifted the fold of her skirt to find the big
toad curled inside, blinking up at her. Her face has changed from fear to
astonishment. A single shaft of moonlight through the doorway. Warm relief in a
cold room.
```

### `08-centipede.png` — 들보에 매달린 시퍼런 그림자

```
Wide interior of the shrine at midnight. Across the whole upper half of the
frame, a vast dark coiled silhouette hangs from the rafters, its outline rimmed in
cold blue-green light, two pale eye points glinting. In the lower left, tiny by
comparison, the girl presses back against the wall with both hands over her
mouth. Never detailed, only shape and glow. Terrifying without being gross.
```

### `09-glow.png` — 맞부딪힌 두 빛

```
Wide interior of the shrine, the most beautiful image in the book. In the
centre-left, the big toad stands squarely in front of the girl with a warm golden
light blazing up from his back. From the upper right, the cold blue-green light of
the coiled shadow pours down. The two lights collide in a bright band across the
middle of the frame, sparks and ripples spreading from the seam. The girl is
silhouetted behind the toad. Awe.
```

### `10-retreat.png` — 물러가는 시퍼런 빛

```
Wide interior of the shrine. The blue-green light has faded to a thin trace
retreating into the darkness of the upper right corner, the coiled shadow already
half gone. In the centre, the golden glow is also dimming, and the toad's legs
have begun to fold. The girl reaches out one hand toward him. Quiet after the
storm.
```

### `11-morning.png` — 문을 열자 무사히 앉아 있던 소녀

```
Wide scene at the shrine door at dawn. On the right, villagers push the wooden
door open and crowd the threshold, faces caught between fear and disbelief. On
the left, inside, the girl sits on the floor in a shaft of pink morning light
holding the limp toad in both arms against her chest, her cheek against his back.
Soft and moving.
```

### `12-recover.png` — 눈을 껌뻑 뜬 두꺼비

```
Wide interior of the girl's small room, days later. In the centre, the toad lies
on a folded cloth with his eyes just opening, one amber eye visible. On the left,
the girl leans over him with both hands clasped and her face breaking into a
smile, a small bowl of water beside her. Warm daylight through the paper door.
Green shoots visible outside. Joyful and gentle.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean kitchen at morning, no people. A few grains of rice sit on the
stove ledge in a patch of sunlight, a broom leaning in the corner, the door open
onto a green yard. Warm and settled.
```
