# 제미나이 그림 프롬프트 — 옹고집전

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

6장이고 장마다 그림이 3장씩, 여기에 표지와 마지막 장을 더해 모두 **20장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 18장 | 1.33 : 1 | **가로 4 : 세로 3** |
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
Setting is a Joseon-era village called Ongdangchon: a rich man's walled compound
with six granaries, high walls and a heavy barred gate; poor thatched lanes
outside it; a mountain temple in the pines on Wolchulbong peak; snowbound
mountain passes in winter. Everyone wears period hanbok. Cold blue winters, warm
lamplit interiors. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Ong Gojip: a hard lean middle-aged man in a good but plain dark hanbok, sharp
cheekbones, a permanently suspicious set to his mouth, an account book or an
abacus usually in his hand. As the story goes on he becomes ragged, frostbitten
and hollow-eyed, and finally quiet and much older-looking.
The false Ong Gojip: identical to him in every way except the expression - his
face is calm, open and warm. Draw them as literally the same man with different
eyes. He wears the same clothes.
Ong Gojip's wife: a tired careful woman in modest hanbok, always watching her
husband's face before speaking.
His old mother: a very old woman with clouded blind eyes, wrapped in a quilt in a
cold room, later warm and cared for.
The old abbot: a serene ancient monk in grey robes at the mountain temple, a
straw mat and a straw doll beside him.
The young monk: a shaven-headed monk in grey with a begging bowl, bruised in
chapter two.
The straw talisman: a yellow paper charm with red seal writing; and a plain straw
doll about the size of a forearm.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 똑같은 두 사람이 마당에서 마주 서 있다.

```
Vertical portrait composition. A rich man's courtyard seen from above and behind,
the high walls and granary roofs closing it in. In the middle of the empty swept
yard two men in identical dark hanbok stand facing each other, exactly the same
height and build and face - but one stands rigid with his fists clenched and his
mouth twisted, and the other stands easy with his hands open at his sides. Their
two shadows stretch out and cross. Around the edges of the yard, servants and
neighbours press back against the walls, staring. Cold clear autumn light,
long shadows. Unsettling and quiet.
```

## 본문 18장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — 곳간 여섯 채를 거느린 부자

```
Wide 4:3 scene. A wealthy walled compound seen from the yard: six granaries in a
row with heavy locks, a tiled main house, a barred gate. In the foreground a lean
middle-aged man in dark hanbok walks the line of granaries checking each padlock
with one hand, an account book under his arm, not looking at the servants who bow
as he passes. Hard bright light, deep shadows under the eaves. Prosperous and
joyless.
```

### `story-01-b.webp` — 1장 — 쌀 몇 되에도 저울부터 가져온다

```
Wide 4:3 scene. An inner room. A woman kneels beside a small sack of rice with a
folded cloth, looking up; her husband is setting a hand-balance down on the floor
between them with great care, one eyebrow raised, already reaching for the scoop.
The room is fine but bare. Cold north light through the paper door.
```

### `story-01-c.webp` — 1장 — 늙은 어머니의 방에는 불을 넣지 않는다

```
Wide 4:3 scene. A cold dim room at night. A very old blind woman sits wrapped in
a thin quilt on the floor, her breath faintly visible, hands tucked under her
arms. Through the open door on the right, a bright warm lamplit room where her son
sits at his ledger with his back to her. The cold room is blue, the warm room is
gold, and the doorway divides them. Terrible in its quietness.
```

### `story-02-a.webp` — 2장 — 시주 온 스님을 매질해 내쫓는다

```
Wide 4:3 scene, restrained. The compound gateway. A young monk in grey has been
driven out into the lane and is on one knee picking up his fallen begging bowl,
one arm raised to shield his head, his face more sad than frightened. In the
gateway the master stands with a club in his hand, chest heaving. Servants hang
back with their hands half raised, unwilling. Autumn leaves, hard afternoon light.
No blood.
```

### `story-02-b.webp` — 2장 — 취암사의 밤, 노승이 짚으로 사람을 만든다

```
Wide 4:3 scene. A mountain temple hall at night, candles on the altar. An ancient
monk in grey sits cross-legged on the floor binding a straw doll the length of his
forearm, his fingers working, his face serene and absorbed. Around him other monks
sit in a half circle watching in silence. A single yellow paper charm with red
writing lies on the mat before him. Warm candlelight, huge shadows on the
pillars, wind in the pines outside.
```

### `story-02-c.webp` — 2장 — 짚 사람이 산을 내려간다

```
Wide 4:3 scene. A mountain path at dawn. A man in dark hanbok walks down toward
the village, seen from behind, quite ordinary in every way. Behind him at the top
of the path the old abbot stands watching with his hands folded. Mist between the
pines, first pale light on the valley, the village roofs far below. Calm and
strange.
```

### `story-03-a.webp` — 3장 — 마당에 또 하나의 옹고집이 나타난다

```
Wide 4:3 scene. The courtyard in daylight, full of shouting servants. In the
centre two identical men in identical clothes face each other a few paces apart -
one with his account book still in his hand and his face contorted with rage, the
other standing calmly with his hands at his sides. Servants scatter between them
pointing at both. Bright noon, no shadows to hide in.
```

### `story-03-b.webp` — 3장 — 아내가 두 사람 사이에서 어쩔 줄 모른다

```
Wide 4:3 scene. The same yard. The wife has run out and stopped dead between the
two men, one hand half extended toward each, her head turning from one to the
other, her face collapsing in confusion and fear. Both men have their arms out to
her. The two identical faces on either side of her. Very close in, very cruel.
```

### `story-03-c.webp` — 3장 — 관가에서 어머니의 밥상을 묻는다

```
Wide 4:3 scene. A magistrate's hall. The two identical men kneel side by side on
the flagstones before the seated magistrate. One - on the left - has his mouth
open and no answer, eyes darting, sweat on his temple. The other answers steadily,
head slightly bowed. The magistrate leans forward, looking only at the one who is
speaking. Officials and villagers crowd the edges. Hard clear daylight.
```

### `story-04-a.webp` — 4장 — 곤장을 맞고 고을 밖으로 쫓겨난다

```
Wide 4:3 scene, restrained. A village boundary marker on a road at evening.
Runners are turning back toward the town; a man in torn clothes is picking himself
up out of the dust of the road, hair loose, one sandal gone, looking back at the
gate. No blows shown, no blood. Grey dusk, bare fields, a very long empty road
ahead. Bleak.
```

### `story-04-b.webp` — 4장 — 남의 집 헛간 처마 밑에서 잔다

```
Wide 4:3 scene. Night. Under the eaves of a stranger's barn, a man curls on the
frozen ground with his arms wrapped around himself, knees drawn up, shivering
visibly, breath steaming. A dog watches him from a few paces off. Snow beginning
to fall. Cold blue-black, one distant warm window far away across the yard.
```

### `story-04-c.webp` — 4장 — 제 집 담 밖에서 안을 들여다본다

```
Wide 4:3 scene. Night at his own compound wall. A ragged man stands outside
gripping the top of the wall with both hands, his face pressed to the gap,
looking in. Inside, warm gold light spills from his mother's room - the room that
was always dark - and a figure is carrying a tray toward it. His face is
breaking. Cold blue outside, warm gold inside, the wall between.
```

### `story-05-a.webp` — 5장 — 눈 덮인 산길에 쓰러진다

```
Wide 4:3 scene. A snowbound mountain pass, everything white and pale blue. A
ragged figure lies collapsed face down in the snow at the bottom of the frame,
one hand outstretched, already half drifted over. Bare black trees, an enormous
empty white slope, no tracks but his own. Utterly still.
```

### `story-05-b.webp` — 5장 — 노승이 그를 일으킨다

```
Wide 4:3 scene. The same pass. The old grey-robed abbot crouches in the snow with
one arm under the fallen man's shoulders, lifting him, his other hand brushing
snow from the man's face. The abbot's expression is neither pitying nor
triumphant, only attentive. Pale winter light, falling flakes. Quiet mercy.
```

### `story-05-c.webp` — 5장 — 제 집 대문 앞에 선다

```
Wide 4:3 scene. Daylight at the compound gate. A thin, much-aged man in borrowed
grey clothes stands in the lane before his own high wall and heavy gate, hands at
his sides, looking up at it. He is very small against the wall. The gate is
standing open. Cold clear winter light. He does not move.
```

### `story-06-a.webp` — 6장 — 열려 있는 대문

```
Wide 4:3 scene. Looking through the open gateway into the courtyard from outside.
Inside, the yard is busy and warm-looking: a granary door propped open, sacks
being carried out to villagers waiting with baskets, children underfoot. The bar
that used to lock the gate leans unused against the wall. Bright light inside,
the viewer still standing in the shadow of the gateway.
```

### `story-06-b.webp` — 6장 — 짚 사람이 부적을 건넨다

```
Wide 4:3 scene. An inner room. The two identical men sit facing each other on the
floor. One holds out the yellow paper charm with both hands; the other receives it
with both hands, his fingers visibly shaking, head bowed. Between them on the mat,
a plain straw doll. Warm lamplight; the giver is already very slightly less solid
than the receiver, his edges softening. Strange and gentle.
```

### `story-06-c.webp` — 6장 — 어머니 앞에 무릎을 꿇는다

```
Wide 4:3 scene. A warm lamplit room, a brazier glowing. A thin worn man kneels
before a very old blind woman, holding both her hands in his and pressing his
forehead down onto them. She has turned her clouded eyes toward him and lifted one
hand free to touch his hair, not recognising him, but comforting him anyway.
Quilts, warm floor, soft gold light. Deeply quiet.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

취암사 지붕에 새 기와가 얹힌다.

```
Wide 4:3 scene. Autumn at the mountain temple. Workmen on the roof of the main
hall are laying fresh grey tiles, passing them up a ladder; monks carry water
below. Red maples and gold pines all around, blue sky. Nobody in the picture is
identifiable as the donor. Bright, ordinary, quietly satisfying.
```
