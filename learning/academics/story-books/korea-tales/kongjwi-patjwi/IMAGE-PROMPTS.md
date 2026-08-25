# 제미나이 그림 프롬프트 — 콩쥐 팥쥐

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
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.png` | 1.33 : 1 | **가로 4 : 세로 3** |

> **`end` 그림은 「읽고 나서」 쪽에 들어갑니다.** 쪽 위쪽에 가로로 얹히므로 비율은 아래 표대로면 됩니다.
> 다만 글 분량에 따라 높이가 조금씩 달라지니, **중요한 것은 한가운데에 두고 위아래 가장자리는 여유를 두세요.**

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolour, bold clean outlines, saturated but
slightly muted colours, realistic human proportions with expressive faces.
Setting is Joseon-era Jeonju in Jeolla province: a modest tile-and-thatch home
with a kitchen and a stone-walled yard, stony hillside fields, a village feast
house, a stream with stepping stones, and later a provincial governor's fine
residence with a lotus pond in the back garden. Everyone wears period hanbok.
Warm daylight, firelit kitchens, moonlit ponds. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Kongjwi: a girl of about fifteen with a long single braid, always in a worn
patched hanbok of faded indigo and undyed cotton, often with soot on her cheek
and her sleeves tied back. Her face is patient and unresentful, quick to smile at
animals. Later, as the governor's wife, she wears fine soft colours but is drawn
with exactly the same face.
Patjwi: her stepsister, the same age, in bright showy pink and yellow hanbok,
plump and idle, a sulky mouth, always eating something or lying down.
Lady Bae, the stepmother: a handsome hard-faced woman in good dark hanbok, thin
lips, a hand-scale or a switch usually nearby.
Choe Manchun, the father: a mild worried older man in a plain scholar's coat who
never quite looks at what is happening in his own house.
The black ox: an enormous quiet black ox with no rope, no nose ring and no
halter, deep calm eyes, appearing where he is needed and gone when you look
again.
The toad: a big brown warty toad, dignified rather than comic.
The sparrows: a flock of small brown sparrows, drawn in great whirling numbers.
The governor: a grave dignified man in a blue official's robe.
The red bead / the red lotus: a small glowing red bead, and a tall red lotus
flower on the pond.
```

---

## 표지 — `cover.png` (세로 2:3)

세로로 긴 표지. 달빛 연못에 뜬 붉은 연꽃과 두꺼비.

```
Vertical portrait composition. A still lotus pond at night in a walled garden,
seen from the bank. Filling the upper part of the frame, one tall red lotus stands
open above the black water, glowing faintly from within, its reflection running
down toward the viewer. At the bottom edge of the frame, on the muddy bank, a big
brown toad sits facing the flower, very still. A few sparrows perch on the wall
behind. Deep blue-black water, silver moonlight, one warm red flame of colour in
the middle. Beautiful and a little eerie.
```

## 본문 18장 (모두 가로 4:3)

### `story-01-a.png` — 1장 — 밥상이 둘로 나뉜다

```
Wide 4:3 scene. Evening in a modest house, shown through two openings at once. In
the warm inner room on the right, a low table with white rice and meat soup where
the stepmother and Patjwi are settling down to eat. On the left, in the dim
kitchen, Kongjwi kneels alone on the earth floor with a single bowl of cold barley
in front of her. The doorway divides gold from grey. Nobody is shouting.
```

### `story-01-b.png` — 1장 — 자갈밭에 나무 호미 하나

```
Wide 4:3 scene. A steep stony hillside field under a hard sun, nothing but grey
rock and clods. Kongjwi kneels small in the middle of it striking at the ground
with a wooden hoe whose blade has already split, her braid stuck to her neck with
sweat. The field stretches away enormous in every direction. Far below, tiny, the
roofs of the village. Heat shimmer.
```

### `story-01-c.png` — 1장 — 검은 소가 밭을 갈아 준다

```
Wide 4:3 scene. The same field, late afternoon. An enormous black ox with no rope
or nose ring walks the stony ground, turning it into dark furrows behind him.
Kongjwi has woken from sleep at the edge of the field and risen to her knees,
bowing with her hands together toward him, astonished. A few strange red fruits
lie on the ground in front of her. Long gold light, the finished field dark and
soft.
```

### `story-02-a.png` — 2장 — 밑 빠진 독 앞에서

```
Wide 4:3 scene. The stone-walled yard at midday. A tall earthenware jar stands
with a wide hole broken through its base; a puddle spreads across the yard beneath
it. Kongjwi stands beside it with an empty water bucket hanging from one hand,
looking down at the hole, shoulders dropped. On the right, at the gate, the
stepmother and Patjwi are leaving for the feast in their good clothes without
looking back. Hard bright light.
```

### `story-02-b.png` — 2장 — 두꺼비가 독 밑을 막아 준다

```
Wide 4:3 scene. Close on the base of the jar. A big brown toad has wedged himself
firmly into the broken hole from the inside, back braced, looking calmly out.
Kongjwi kneels beside the jar with a bucket tipped and pouring, water rising, her
face lit with disbelief and gratitude. Cool shade under the eaves, splashing
water, sunlight beyond.
```

### `story-02-c.png` — 2장 — 참새 떼가 벼를 쓿어 준다

```
Wide 4:3 scene of joyous motion. Inside an open granary, three great heaps of
unhulled rice on straw mats. Hundreds of sparrows fill the whole air of the room
in a whirling storm, working over the grain, chaff flying up in clouds. Kongjwi
stands in the doorway with both hands raised and her face turned up, laughing.
Shafts of dusty sunlight through the door.
```

### `story-03-a.png` — 3장 — 징검다리에서 꽃신 한 짝을 잃는다

```
Wide 4:3 scene. A stream with stepping stones, late afternoon. Kongjwi has
slipped, one foot plunged into the water, arms out for balance, her face turned
back over her shoulder in dismay. A single embroidered flower shoe is already
turning away downstream on the current in the lower right. Splashing water,
sunlight on ripples, willows on the bank.
```

### `story-03-b.png` — 3장 — 팥쥐의 발에 참기름을 발라 억지로 밀어 넣는다

```
Wide 4:3 scene, comic and awful. A room at the feast house. The stepmother kneels
gripping Patjwi's bare heel and forcing it into a small embroidered shoe with both
hands, a bottle of sesame oil overturned beside her. Patjwi sits back on her hands
with her face screwed up in pain, one leg rigid. Onlookers in the doorway watch
with raised eyebrows. Bright lantern light.
```

### `story-03-c.png` — 3장 — 부엌 문이 열리고, 꽃신이 꼭 맞는다

```
Wide 4:3 scene. A kitchen doorway opened from outside. Kongjwi stands in the dim
kitchen with soot on her cheek and her sleeves tied back, one flower shoe on her
foot. A servant holds out the matching shoe on his palm, having just stopped
dead. Behind him the light of the yard floods in. Grey kitchen, blazing doorway,
the moment of being seen.
```

### `story-04-a.png` — 4장 — 아버지가 딸의 손을 놓지 못한다

```
Wide 4:3 scene. A gate at morning, a palanquin waiting. A mild worried older man
holds his daughter's hand in both of his and cannot let go, his head bent. She
stands quietly in new clothes letting him hold it, her other hand resting on his.
Neighbours wait at a distance. Soft clear light, blossom on the wall. Gentle and
sad.
```

### `story-04-b.png` — 4장 — "그 소를 이제는 제가 먹여 주고 싶습니다"

```
Wide 4:3 scene. A fine room in the governor's residence. Kongjwi sits speaking
earnestly with one hand raised, describing something; across from her the
governor listens with his chin on his knuckles, eyebrows up, half amused and
wholly attentive. Through the open door behind her, a green pasture. Warm
afternoon light on polished floors.
```

### `story-04-c.png` — 4장 — 연못가에서 두꺼비가 밤새 물가를 맴돈다

```
Wide 4:3 scene. The back garden pond at night, empty and silvered with moonlight.
On the bank a single brown toad crawls along the water's edge, turning back,
crawling again. On the roof ridge above, a row of sparrows sit awake in the dark,
all facing the water. Nothing else in the picture. Deep blue, absolute silence,
dread.
```

### `story-05-a.png` — 5장 — 연꽃 줄기가 부인의 머리채를 후려친다

```
Wide 4:3 scene. Daylight at the pond. A woman in bright pink hanbok walking the
bank has been struck across the head by the long stem of a red lotus, which has
bent right over out of the water; her hair has come loose and she is stumbling
sideways with both arms up, face outraged and frightened. The flower itself is
upright and calm. Servants at a distance stare. Green water, hot sun.
```

### `story-05-b.png` — 5장 — 붉은 구슬이 감사의 발 앞에 멈춘다

```
Wide 4:3 scene. A lamplit room at night. A small glowing red bead has rolled
across the polished floor and stopped against the foot of the seated governor,
who has looked down at it and gone completely still, one hand frozen on his knee.
The room is otherwise empty. The bead casts a faint red light up onto his face.
Deep shadows, one impossible small light.
```

### `story-05-c.png` — 5장 — "나리, 저를 좀 보십시오"

```
Wide 4:3 scene. The same room, close. The governor has risen and is standing over
the small red bead on the floor, staring down at it, his face open with shock and
recognition. Behind him a paper door glows with moonlight and the faint shape of a
lotus is thrown across it. Red light below, blue light behind. The voice is in the
composition, not in the picture.
```

### `story-06-a.png` — 6장 — 새벽에 연못 물을 퍼낸다

```
Wide 4:3 scene. First light in the back garden. A line of servants passes buckets
hand to hand out of the draining pond; the water is low and the muddy bottom is
beginning to show. The governor stands on the bank with his arms folded, watching,
face like stone. Mist over the water, lanterns still lit, tense purposeful
activity.
```

### `story-06-b.png` — 6장 — 팥쥐와 배 씨가 마당에 끌려 나온다

```
Wide 4:3 scene. The main courtyard in the morning. The stepmother and Patjwi
kneel on the flagstones with runners either side; the stepmother's face is
defiant, Patjwi's has crumpled completely. On the raised hall the governor stands
delivering judgment with one hand raised. Household and neighbours line the
walls. Cold clear light, no pleasure anywhere.
```

### `story-06-c.png` — 6장 — 아버지가 딸 가까이로 옮겨 온다

```
Wide 4:3 scene. A small house near a larger one, autumn. The old father sits on
a sunny verandah edge; his daughter is setting a full tray of food down in front
of him and he has both hands raised in protest, embarrassed, while she smiles and
sets it down anyway. Persimmons on the tree, warm light, an ordinary afternoon
that took a whole book to reach.
```

---

## 마지막 장 — `end.png` (가로 4:3)

검은 소와 두꺼비와 참새.

```
Wide 4:3 scene. A green pasture at golden hour. An enormous black ox with no rope
grazes quietly; a brown toad sits on a warm flat stone nearby; sparrows line the
fence rail above. In the far background a woman walks along a path toward them
carrying a bucket. Nobody is doing anything remarkable. Warm low light, deep
green, complete peace.
```
