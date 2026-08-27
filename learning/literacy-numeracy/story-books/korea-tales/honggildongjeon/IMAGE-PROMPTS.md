# 제미나이 그림 프롬프트 — 홍길동전

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

7장이고 장마다 그림이 3장씩, 여기에 표지와 마지막 장을 더해 모두 **23장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 21장 | 1.33 : 1 | **가로 4 : 세로 3** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.33 : 1 | **가로 4 : 세로 3** |

> **`end` 그림은 「읽고 나서」 쪽에 들어갑니다.** 쪽 위쪽에 가로로 얹히므로 비율은 아래 표대로면 됩니다.
> 다만 글 분량에 따라 높이가 조금씩 달라지니, **중요한 것은 한가운데에 두고 위아래 가장자리는 여유를 두세요.**

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolour, bold clean outlines, saturated but
slightly muted colours, realistic human proportions with expressive faces.
Setting is early-Joseon Korea in the reign of King Sejong: a great minister's
walled mansion in Hanyang with tiled roofs and inner courtyards, misty mountain
passes, a hidden bandit valley behind a great stone gate, provincial government
offices, the royal palace, and finally a green island kingdom across the sea.
Everyone wears period hanbok. Magic is shown as mist, paper and wind - never as
sparkles. No text or letters in the image.
Villains and unkind characters are drawn as ordinary, nice-looking people -
never grotesque, never ugly, no mean squinting eyes, no warts, no snarling
teeth. What is wrong with them shows only in what they are doing and in their
posture, never in a deformed or repulsive face. A cruel character may be
handsome; a kind one may be plain.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Hong Gildong: as a boy of twelve, a slight intense child in a plain white hanbok,
too watchful for his age. At eighteen, a tall composed young man in dark travelling
clothes with his hair tied up, a straight back and a level stare. Later, as the
leader of the Hwalbindang, in dark blue with a plain sword. At the end, an aging
king in simple robes, no crown.
Minister Hong, his father: a heavy dignified old official in fine crimson robes
and a black horsehair hat, a troubled face, unable to meet his son's eyes.
Chora, the concubine: a beautiful sharp-eyed woman in expensive pink silk,
always half in shadow.
Gildong's elder brother: a kind anxious young official in blue.
The Hwalbindang: ragged mountain men in patched clothes and headbands, carrying
farm tools as weapons, and a plain white banner with three large characters.
The paper men: cut-out paper figures the size of a person, flat and pale, that
stand up and walk - drawn as slightly translucent, seams visible, unsettling.
The king: a middle-aged king in dragon-embroidered robes, more curious than
angry.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 안개 속으로 걸어 들어가는 길동.

```
Vertical portrait composition. A mountain road at dawn seen from behind a
traveller. Thick white mist fills the middle and upper frame, swallowing the road,
the pines and the far ridges. In the lower half, walking away from the viewer into
it, a young man in dark travelling clothes with his hair tied up, a bundle on his
back, one hand at his side. Behind him at the very bottom edge of the frame, the
tiled roofs of a great house are just visible, small and already distant. Faint
gold light somewhere ahead inside the mist. Solitary, resolute, open-ended.
```

## 본문 21장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — "대감"이라 불러야 하는 아들

```
Wide 4:3 scene. A fine study in a great house. A boy of twelve kneels formally on
the polished floor with his hands on his knees and his head up, speaking. Across
the room a heavy old official in crimson sits at a low desk holding a brush that
he has stopped using, looking not at the boy but at the paper. The distance
between them is the subject of the picture. Cold north light, expensive empty
space.
```

### `story-01-b.webp` — 1장 — 밤마다 뒤뜰에서 혼자 익힌다

```
Wide 4:3 scene. A back garden at night under a half moon. The boy stands alone
among bare trees in a plain white hanbok, mid-movement, one arm extended, eyes
closed in concentration. Around him the air is faintly disturbed - leaves lifting
off the ground in a slow spiral without wind. Blue moonlight, deep shadow, no
sparkle or glow. Quietly uncanny.
```

### `story-01-c.webp` — 1장 — 종이 사람이 일어나 걸어 다닌다

```
Wide 4:3 scene. A lamplit inner room. Three flat pale paper cut-out figures the
size of grown men stand upright on the floor, slightly translucent, their edges
visible, one caught mid-step. Among them the boy stands with a pair of scissors
still in his hand, watching them without expression. Their shadows on the wall are
solid and human. Warm lamplight and something very wrong. Unsettling, not comic.
```

### `story-02-a.webp` — 2장 — 초란이 어둠 속에서 사람을 부른다

```
Wide 4:3 scene. A corner of a courtyard at night. A beautiful woman in pink silk
stands half in shadow beneath the eaves, pressing a small heavy purse into the
hand of a man whose face is turned away, her own face composed and cold. One
lantern behind her throws her shadow long across the flagstones. Deep blue night,
one warm point of light.
```

### `story-02-b.webp` — 2장 — 안개 속에서 자객이 길을 잃는다

```
Wide 4:3 scene. An inner courtyard filled floor to roof with impossible white
mist. A man with a drawn knife turns in a circle in the middle of it, arm out,
seeing nothing, his face slack with fear. Somewhere in the mist a straight
vertical shape that might be a standing figure. The buildings are barely visible.
Almost monochrome white and grey. Terrifying and beautiful.
```

### `story-02-c.webp` — 2장 — 새벽 안개 속으로 집을 떠난다

```
Wide 4:3 scene. The great gate of the mansion at dawn, seen from inside the yard.
A young man of eighteen walks out through the open gate into a wall of white mist,
already half dissolved into it, a bundle on his back, not looking back. Behind him
in the yard his father stands at the top of the steps in a night robe with one
hand half raised. Grey-blue dawn, wet flagstones. Nobody speaks.
```

### `story-03-a.webp` — 3장 — 바위 문 너머의 도적 마을

```
Wide 4:3 scene. A hidden valley behind an enormous split boulder that forms a
natural gate. Through the gap: a village of rough huts, cooking fires, men
sharpening tools, laundry on lines, children. A young man stands in the gap
looking in, seen from behind, small against the rock. Deep green shadow, warm
firelight beyond. A whole world hidden.
```

### `story-03-b.webp` — 3장 — 큰 돌을 들고 마당을 한 바퀴 돈다

```
Wide 4:3 scene. The bandit village clearing. A young man carries an enormous
boulder on his shoulders and back, walking steadily around the yard, face
composed and unstrained. Around him fifty ragged mountain men have risen to their
feet, mouths open, some dropping what they were holding. Bright hard daylight,
dust, disbelief.
```

### `story-03-c.webp` — 3장 — 활빈당 깃발을 세운다

```
Wide 4:3 scene. The clearing at sunrise. A plain white cotton banner with three
large bold characters brushed on it is being raised on a pole; men haul the rope,
others stand back looking up. The young leader stands at the base with one hand on
the pole. Long red-gold light across the valley, wind snapping the cloth. Rough,
plain, stirring.
```

### `story-04-a.webp` — 4장 — 함경 감사의 곳간이 열린다

```
Wide 4:3 scene. Night at a provincial granary, a fire burning at the far end of
the compound drawing everyone away. In the near foreground the granary doors stand
wide and ragged villagers are carrying out sacks of grain in an orderly line,
faces amazed. Men in dark clothes hold the doors and gesture them on. Orange
firelight far off, blue night near.
```

### `story-04-b.webp` — 4장 — 벽에 남은 글씨

```
Wide 4:3 scene. Morning at the emptied granary. A provincial governor in official
robes has sunk to his knees on the flagstones in front of a wall where three bold
characters have been brushed in enormous strokes. His hat has fallen off. Runners
stand behind him not daring to speak. Cold morning light, the writing dominating
the frame.
```

### `story-04-c.webp` — 4장 — 여덟 명의 길동이 한꺼번에 대답한다

```
Wide 4:3 scene. A palace hall. Eight identical young men in identical dark blue
kneel in a row on the polished floor, all with their heads lifted at exactly the
same angle, all speaking at once. Above them the king has half risen from his
seat; his officials are backing toward the pillars. Absolutely symmetrical
composition. Red pillars, gold light, deep unease.
```

### `story-05-a.webp` — 5장 — 임금이 홍 판서를 불러들인다

```
Wide 4:3 scene. The palace hall. The old minister in crimson kneels before the
throne with his forehead almost to the floor, his shoulders shaking. The king
leans forward looking down at him, not unkindly, one hand extended. The hall is
enormous and nearly empty around them. Cold high light from clerestory windows.
```

### `story-05-b.webp` — 5장 — "네가 진짜 홍길동이냐"

```
Wide 4:3 scene. The throne hall. A single young man stands alone in the middle of
the floor - not kneeling - facing the king, his hands at his sides, head level.
The king has come down one step from the throne. Officials line both walls,
rigid, appalled that he is standing. The whole picture is built on that one
upright figure. Shafts of light, red and gold.
```

### `story-05-c.webp` — 5장 — 대궐 뜰에서 구름 속으로 솟구친다

```
Wide 4:3 scene. A palace courtyard from below. A young man has launched upward
off the flagstones and is already high in the air, robes streaming, rising into a
bank of cloud that has come down over the roofs. Below him the entire court -
scores of officials in coloured robes - stands in the yard with their heads
thrown back, hats falling off. Bright sky, tumbling cloud, no sparkles.
```

### `story-06-a.webp` — 6장 — 무리를 배에 태운다

```
Wide 4:3 scene. A shore at dawn. Several broad wooden ships lie at anchor; a long
line of men, women and children carrying bundles, tools and children wades and
climbs aboard. The leader stands on a rock directing them, one arm out. Behind
them the mountains of Joseon; ahead, open sea and morning light. Migration, not
war.
```

### `story-06-b.webp` — 6장 — 성문마다 사람들이 스스로 문을 연다

```
Wide 4:3 scene. An island town gate. The heavy gates are being pushed open from
the inside by ordinary townspeople - a farmer, an old woman, two boys - while a
column of Gildong's people waits in the road outside with their weapons pointed at
the ground. Nobody is fighting. Bright green island light, palms of banana leaf
and stone walls. Astonishing quiet.
```

### `story-06-c.webp` — 6장 — "사람은 다만 사람일 뿐이다"

```
Wide 4:3 scene. A wide public square packed with people of every kind - farmers,
fishers, scholars, servants, children - standing shoulder to shoulder with nobody
in front and nobody behind. On a low platform, not a high throne, a man in plain
dark robes speaks with one hand open. No canopy, no guards. Warm even daylight
falling on everyone equally.
```

### `story-07-a.webp` — 7장 — 율도국의 법은 몇 가지뿐이다

```
Wide 4:3 scene. A plain stone stele standing in a village square, a few short
lines carved on it. A farmer with a hoe over his shoulder has stopped to read it;
a child sits on the base swinging her legs; an old woman rests in its shade. No
officials, no soldiers. Bright ordinary morning, green fields beyond. Law as
furniture, not as fear.
```

### `story-07-b.webp` — 7장 — 조선으로 건너가 아버지의 장례를 치른다

```
Wide 4:3 scene. A hillside burial in the rain, Joseon. A man in white mourning
clothes kneels alone before a fresh grave mound with his forehead to the wet
ground. His elder brother stands a little behind under an umbrella, watching him.
Grey rain, dark pines, mud. Nothing is said.
```

### `story-07-c.webp` — 7장 — 늘그막에 성 밖 작은 집으로 옮겨 간다

```
Wide 4:3 scene. A small thatched house outside a town wall, late afternoon. An old
man in plain undyed clothes sits on the verandah edge mending a straw sandal.
Children from the road have wandered into his yard and one is talking to him with
her hands on her knees. He is smiling. The town wall in the distance, a persimmon
tree, hens. Utterly unremarkable and completely earned.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

아이가 이름을 부른다.

```
Wide 4:3 scene. A village lane in golden light. A small child runs toward an old
man with both arms up, shouting something, and he has crouched down to catch her.
Other children, a dog, women carrying water, a man with a hoe - everyone in plain
clothes, nobody bowing to anybody. Warm low sun down the length of the lane.
Ordinary and quietly triumphant.
```
