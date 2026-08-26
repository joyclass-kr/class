# 제미나이 그림 프롬프트 — 춘향전

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
Setting is late-Joseon Korea in the town of Namwon, Jeolla province: tile-roofed
pavilions, willow-lined streams, thatched lanes, a walled government office with
a wide flagstone courtyard, paper-windowed rooms lit by oil lamps. Everyone wears
period hanbok. Strong light and shadow, lantern and candlelight at night.
Restrained and serious mood. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Seong Chunhyang: a beautiful composed young woman of sixteen, long thick black
braid with a red ribbon, a crimson skirt and pale green jeogori in the early
chapters. Her face is calm and level even in danger; she almost never weeps in
front of others. Later in prison she is thin and pale in a soiled white
underdress, hair loose, but her eyes are unchanged.
Yi Mongryong: a slender bright-faced young man of sixteen in a pale blue
scholar's robe and black horsehair hat. Later, at eighteen, in a beggar's
disguise: a torn brown coat, straw sandals, a broken-brimmed hat, unshaven,
carrying nothing. At the very end, in the dark blue-black robe and stiff hat of a
royal secret inspector.
Bangja: a wiry cheerful servant boy in a short brown jacket and headband, always
half a step behind Mongryong, comic and knowing.
Wolmae: Chunhyang's mother, a handsome middle-aged woman in dignified dark green
and white hanbok, watchful and shrewd, later grief-worn.
Byeon Hakdo, the new magistrate: a heavy florid man in a gorgeous crimson
official robe and winged hat, fleshy face, small greedy eyes, always seated above
everyone else.
The royal secret inspector's men: a dozen rough runners in dark clothes with
staves, bursting through gates.
The mapae: a round bronze plaque cast with horses, hung on a cord.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 광한루 그네와 옥에 갇힌 춘향이 위아래로.

```
Vertical portrait composition, one image with a strong top-and-bottom division.
In the upper half: a bright spring day at Gwanghallu pavilion, a young woman in a
crimson skirt flying high on a swing among green willow branches, her skirt and
ribbons streaming, seen from a distance and slightly below. In the lower half,
darker and cooler: the same young woman seated on the floor of a stone prison
behind heavy wooden bars, hair loose, chin lifted, a single shaft of moonlight
falling across her. The two halves joined by a willow branch that reaches down
across the middle. Gold and green above, blue and grey below. Dignified, not
pitiful.
```

## 본문 21장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — 광한루에서 그네 타는 춘향을 본다

```
Wide 4:3 scene. Late spring, the Dano festival. On the right, the tiled Gwanghallu
pavilion on its stone platform above a clear stream, with a young man in a pale
blue robe leaning on the balustrade, one hand shading his eyes, staring off to the
left. On the left, across the water among tall green willows, a young woman in a
crimson skirt rides a swing high into the air, skirts and ribbons flying. Bright
clear daylight, fresh green, festival colour.
```

### `story-01-b.webp` — 1장 — 방자가 빈손으로 돌아온다

```
Wide 4:3 scene. On the pavilion. A wiry servant boy stands scratching the back of
his head with an awkward apologetic grin, one shoulder hunched, reporting to the
young scholar who has turned around fast with his eyebrows up and his mouth open
in disbelief. Willow shade, dappled light on the wooden floor.
```

### `story-01-c.webp` — 1장 — 버드나무 아래에서 처음 마주 본다

```
Wide 4:3 scene. In the willow grove by the stream. The young woman stands beside
her swing with the rope still in one hand, having just stepped down, straightening
her jacket, looking directly at the young man. He stands a respectful distance
away on the left with his hands together in a small bow, cheeks faintly red.
Green filtered light, drifting willow leaves, a charged quiet moment.
```

### `story-02-a.webp` — 2장 — 밤중에 월매의 집 문 앞에서

```
Wide 4:3 scene. Night at a small walled house in a quiet lane. A handsome
middle-aged woman in dark green holds the gate half open with an oil lamp raised
in one hand, her face guarded and unsmiling. On the other side of the threshold
the young scholar bows deeply, the servant boy holding a lantern behind him.
Warm lamp glow against deep blue night, bamboo against the wall.
```

### `story-02-b.webp` — 2장 — 종이에 글을 쓰고 손도장을 찍는다

```
Wide 4:3 scene. Inside a lamplit room. The young man kneels at a low writing table
pressing his thumb onto a sheet of paper he has just written, brush laid aside,
his face very serious. Across the table the older woman watches with folded arms
and an unreadable expression. In the doorway behind, a young woman's silhouette.
Warm gold lamplight, deep shadows in the corners.
```

### `story-02-c.webp` — 2장 — 마루에 나란히 앉아 글씨를 배운다

```
Wide 4:3 scene. Autumn afternoon on a wooden verandah, persimmon tree in the
yard. The young couple sit side by side at a low table; he guides her hand on the
brush over a sheet of paper, both of them absorbed and smiling faintly. Ink stone,
scattered papers, warm slanting light and long shadows.
```

### `story-03-a.webp` — 3장 — 이별을 말하는 밤

```
Wide 4:3 scene. A small lamplit room at night, two people seated on the floor
facing each other with a low table between them. The young man's head is bowed
and his hands are on his knees; the young woman sits very straight, hands folded,
listening without moving. The lamp flame is the only light. Long silence in the
composition, lots of dark space.
```

### `story-03-b.webp` — 3장 — 거울과 옥가락지를 주고받는다

```
Wide 4:3 scene. Close in on the same room. The young woman holds out a small round
hand mirror in both hands; the young man is slipping a jade ring off his own
finger with the other hand extended toward her. Their hands are the centre of the
picture, lit warm by the lamp; their faces above are half in shadow. Intimate and
still.
```

### `story-03-c.webp` — 3장 — 오리정에서 배웅한다

```
Wide 4:3 scene. Dawn on a road outside the town wall, a small roadside pavilion on
the right. A line of horses and baggage carts moves away toward the left; the
young man on horseback has twisted around in the saddle to look back. On the right
the young woman stands alone in the road, small, not moving, her mother a few
steps behind her. Cold blue-grey morning, mist in the fields, very long road.
```

### `story-04-a.webp` — 4장 — 변학도의 요란한 부임 행차

```
Wide 4:3 scene. A palanquin procession entering a town gate. In front, bearers
carry a grand palanquin; behind it a long line of heaped baggage carts loaded with
silk bolts, chests and dishware. Townspeople stand back along the wall watching
with flat unimpressed faces, one old man frowning. Bright hard daylight, dust,
too much colour and noise.
```

### `story-04-b.webp` — 4장 — 사령들이 춘향의 집에 들이닥친다

```
Wide 4:3 scene. A narrow lane before a small gate. On the left two government
runners with staves push forward; in the gateway the mother stands with both arms
spread wide across the opening, face fierce. Behind her, stepping out calmly with
her hair freshly combed and her jacket straightened, the young woman puts a hand
on her mother's shoulder. Neighbours watching from doorways. Tense, midday light.
```

### `story-04-c.webp` — 4장 — 관가 마당, "저는 이미 지아비가 있습니다"

```
Wide 4:3 scene. A wide flagstone courtyard packed with onlookers. On the raised
wooden hall at the right, the heavy magistrate in crimson leans forward from his
seat with a pleased expression. Alone in the middle of the empty stone yard below,
the young woman stands straight with her hands at her sides and her chin level,
speaking. Every face in the crowd is turned toward her. Strong overhead sun, her
shadow small and sharp beneath her.
```

### `story-05-a.webp` — 5장 — 매를 맞으면서도 소리를 지르지 않는다

```
Wide 4:3 scene, restrained and not graphic. The same courtyard. The young woman
kneels on the stone with her back to the viewer, head unbowed, her white
underdress and loose hair visible. A runner stands beside her with a rod, but his
arm is lowered and his face is turned away, unwilling. Beyond the wall, villagers
grip the top of the stones and weep. The magistrate is a small angry red shape far
up on the hall. No blood, no wounds - the weight is in the faces of the watchers.
```

### `story-05-b.webp` — 5장 — 옥 안, 어머니가 창살 사이로 밥을 넣어 준다

```
Wide 4:3 scene. A dark stone prison. Through heavy wooden bars on the right, the
young woman sits on the straw with her knees drawn up, thin and pale, reaching one
hand toward the bars. On the left, outside, her mother crouches pushing a small
bowl of rice between the bars, her face crumpled with weeping. A single high
barred window lets in one shaft of cold light. Damp stone, straw, deep shadow.
```

### `story-05-c.webp` — 5장 — 임금이 마패를 내린다

```
Wide 4:3 scene. A formal palace hall. On the right the king sits on a raised seat
in dragon-embroidered robes, extending a round bronze horse plaque on a cord. On
the left a young man in the dark robes of a new official kneels on one knee with
both hands raised to receive it, head bowed. Vast polished floor, red pillars,
gold light from high windows. Ceremonial and grave.
```

### `story-06-a.webp` — 6장 — 거지 차림으로 남원 땅에 들어선다

```
Wide 4:3 scene. A country road in poor country. A young man in a torn brown coat,
straw sandals and a broken-brimmed hat walks toward the viewer on the left, thin
and unshaven, expression sharp and watchful. Around him: a cracked dry paddy, a
fallen fence, weeds growing across the road, an empty farmhouse. Overcast light,
dull colours, silence.
```

### `story-06-b.webp` — 6장 — 주막에서 옆자리 이야기를 듣는다

```
Wide 4:3 scene. Inside a crowded roadside tavern. On the right, at the next table,
two farmers lean together talking with grim faces, one counting on his fingers.
On the left the beggar-dressed young man has stopped with his spoon halfway to his
mouth, his whole body gone still, eyes fixed on nothing. A half-eaten bowl of
soup. Smoky warm interior, tallow light.
```

### `story-06-c.webp` — 6장 — 옥 창살 앞에서 다시 만난다

```
Wide 4:3 scene. Night outside the prison wall. The young man presses his face and
one hand against the heavy wooden bars from outside; inside, in the dark, the thin
young woman has come to the bars and is pushing a jade ring out through them into
his hand. Moonlight falls in a narrow band across both their faces. Everything
else is deep blue-black. The two hands at the bars are the centre of the picture.
```

### `story-07-a.webp` — 7장 — 생일잔치, 거지가 시를 짓겠다고 나선다

```
Wide 4:3 scene. A magistrate's birthday banquet in a courtyard: officials seated
at laden tables on the raised hall, musicians, wine jars, lanterns. Down in the
corner of the yard at the left, at a bare little table with one bowl, the ragged
beggar has risen to his feet with a brush in his hand. Faces at the tables turn
toward him, laughing, pointing. Rich colour above, poor grey corner below.
```

### `story-07-b.webp` — 7장 — 시를 읽자 좌중이 얼어붙는다

```
Wide 4:3 scene. The same banquet a moment later. The ragged man stands holding up
a sheet of paper, reading aloud, calm. Around the tables the laughter has died:
one official has set his cup down and is staring at it, another is half out of his
seat edging backwards, a third has gone grey. The magistrate's face is purple with
rage, one fist raised. Lanterns still swinging. Total silence in a noisy room.
```

### `story-07-c.webp` — 7장 — "암행어사 출두야!"

```
Wide 4:3 scene of explosive motion. The courtyard gate bursts inward on the right
and a dozen runners with staves pour through. Tables overturn, wine jars roll,
dishes fly, officials scramble over the wall with their hats falling off. In the
centre of it all the young man stands perfectly still, one arm raised high holding
up the round bronze horse plaque, which catches the lantern light. Dust, flying
cloth, chaos around a single fixed point.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

광한루에서 거울을 돌려준다.

```
Wide 4:3 scene. Autumn afternoon at the Gwanghallu pavilion, willows going gold.
A young man in an official's dark robe and a young woman in a soft coloured hanbok
stand together at the balustrade looking out over the stream. He is holding out a
small round hand mirror, its rim worn thin, toward her; she is reaching to take
it. Empty pavilion, low warm light, drifting yellow leaves. Quiet and complete.
```
