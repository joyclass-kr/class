# 제미나이 그림 프롬프트 — 도깨비 감투

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **16개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **18장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 16장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean rural village of the Joseon era: thatched-roof
cottages, low stone walls, a pebbly stream with big flat boulders, a busy market
of straw awnings and wooden stalls, a village schoolroom. Characters wear hanbok.
Night scenes lit by warm firelight and cool blue moonlight. Big expressive faces,
exaggerated comic gestures, lively motion. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Dolsoe: a wiry hardworking man in his thirties in a patched undyed hanbok with a
cloth headband and straw sandals, a big open honest face that shows every feeling
at once. When invisible he is drawn as an outline of empty space - objects float,
dust puffs up, clothes and ropes move - but never as a transparent ghost.

Give each one a running trait: the BIGGEST has one huge horn and sings terribly
with his head thrown back; the HICCUPING one jolts upright every few seconds; the
SMALLEST is knee-high and keeps dropping things. The others are background.
The gamtu: a small round black horsehair cap.
The red patch: a bright scarlet scrap of cloth sewn crookedly on the cap's side.
The market people: a plump tteok seller behind a steaming tray, a cloth merchant,
farm wives, children.
The schoolmaster: a thin bearded old man in a wide black horsehair hat.
The ox: a big cream-brown Korean ox with a rope halter.
The dokkaebi (Korean goblins) - draw them EXACTLY like this every time:
SMOOTH bare skin in a strong flat colour, NEVER furry, NEVER hairy, NEVER
bristly, no shaggy fur anywhere on the body or legs. Round cartoon proportions,
big friendly round eyes with thick eyebrows, a broad rounded nose, pointed
elf-like ears, a wide grin with two small blunt tusks, and TWO curved ridged
horns like a goat's (only babies have a single horn). Short tidy dark hair.
The LEADER is bright tomato RED, heavy-set and barrel-bellied, wearing a
leopard-print hide slung over one shoulder like a tunic, barefoot, carrying a
golden club studded with blunt spikes.
Another is grass GREEN with a small flower tucked behind one horn, dressed in a
proper hanbok - pink jeogori, purple skirt, tiger-stripe vest - neat and
homely.
The smallest is a chubby SKY-BLUE baby with one little horn and a bib, always
underfoot, always delighted.
They are comic and warm, never frightening - closer to a noisy family than to
monsters.
In this book there are SIX of them around a campfire: the big red leader,
a green one, a hiccuping one, the sky-blue baby, and two more in the same
family style. Each wears a small black horsehair cap (gamtu) when hidden.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 달밤 개울가, 허공에 뜬 게와 도깨비 감투.

```
Vertical portrait composition. A moonlit stream at night with a crackling
campfire on the pebbly bank. Around the fire nobody is visible - but a grilled
crab hovers in mid-air being eaten, a gourd cup tips itself, and six small black
horsehair caps float at head height in a ring around the flames, each with two
faint dents where horns would be. In the lower foreground, peeking over a big flat
boulder with only his eyes and fingertips showing, a wiry man in a headband stares
with enormous round eyes. Warm orange firelight against deep blue night, sparks
rising. Funny and eerie at once.
```

## 본문 16장 (모두 가로 2:1)

### `01-poor.webp` — 돌쇠가 빈 밥그릇한테 말을 건다

```
Wide panoramic scene. Evening inside a bare little thatched cottage. On the right
a wiry man in a patched hanbok sits cross-legged at a low table holding up a
completely empty brass rice bowl at eye level, talking to it, eyebrows raised as
if waiting for an answer. On the left, through the open door, the darkening yard
with his A-frame rack and hoe leaning by the wall, everything neat and swept. Warm
low lamplight. Poor but not miserable - comic and companionable.
```

### `02-fire.webp` — 모닥불은 타는데 둘레에 아무도 없다

```
Wide panoramic scene. A pebbly stream bank at night. On the right a campfire
burns high and bright with a ring of stones around it - and absolutely nobody
sitting there. On the left, at the edge of the firelight, the man has stopped
dead on the path with one foot still lifted, both hands frozen halfway up, mouth
a small round O. Deep blue night, orange light pooling on the empty stones. Very
strange, very quiet.
```

### `03-crab.webp` — 게가 저 혼자 걸어가 불 위에 올라앉는다

```
Wide panoramic scene. Close along the ground at the fire's edge. On the left a
crab walks briskly out of the shallow water and along the pebbles in a little
trail of wet footprints, claws up, entirely by itself. On the right it has climbed
onto a flat stone over the flames and settled down. Above the fire, another
already-grilled crab hovers in mid-air with one leg snapped off and floating away.
Firelight on wet stones, no people anywhere. Absurd and wonderful.
```

### `04-appear.webp` — 허공에서 뿔이 쑥, 도깨비가 통째로 나타난다

```
Wide panoramic scene. The fire on the left. In the middle of the frame a
dokkaebi is materialising out of thin air from the top down: one big knobby horn
and a wild-haired head are already solid, the shoulders and one arm are half
formed, the legs are still nothing at all. The visible hand holds a small black
horsehair cap. On the right, behind a big boulder, the man's eyes and clenched
fingertips show over the top, eyebrows shot up into his headband. Warm firelight,
comic astonishment.
```

### `05-party.webp` — 도깨비 여섯이 나타나 노래하고 딸꾹질하고 게를 떨어뜨린다

```
Wide panoramic scene of joyful chaos. Six stocky green and reddish dokkaebi
around the fire. On the left the biggest one, with one huge horn, sings with his
head thrown back, mouth enormous, arms spread, obviously off-key. In the centre
another jolts bolt upright mid-hiccup, cup flying out of his hand. On the right
the smallest one, knee-high, fumbles a grilled crab leg that is already falling,
while a neighbour throws both hands up in exasperation. Six little black caps
tossed on a flat boulder in the foreground. Sparks, motion lines, huge grins.
```

### `06-wrestle.webp` — 감투를 벗어 던지고 씨름을 시작한다

```
Wide panoramic scene. On the right two dokkaebi are locked together in a Korean
wrestling grip, legs braced, dust billowing up around them, the others crowded
around cheering with their fists in the air. On the left, in the foreground, six
small black horsehair caps lie scattered on a wide flat boulder - and just at the
very edge of that boulder, half hidden in shadow, a human hand is beginning to
creep into frame. Firelight, dust, energy on one side and stillness on the other.
```

### `07-steal.webp` — 감투를 품에 넣고 냅다 뛴다

```
Wide panoramic scene. On the left the man sprints away along the dark stream bank
toward the viewer's left, one hand clamped over his chest where the cap is
hidden, legs a blur, face lit with terror and glee at once. On the right, back at
the fire, one dokkaebi stands scratching his head over the boulder where five
caps now lie, while another points an accusing finger at him. Moonlit water, motion
lines, a comic chase that hasn't started yet.
```

### `08-mirror.webp` — 거울 앞에 섰는데 아무것도 비치지 않는다

```
Wide panoramic scene. Inside the cottage at night. On the right stands a small
bronze mirror on a stand, reflecting only the empty wall and a corner of the
quilt. On the left, in front of it, the man is invisible - but his position is
unmistakable: the floor mat is dented, one straw sandal is tipped over
mid-step, and his hat is floating at head height. A single raised bump in the
air where his hand must be. Warm lamplight, hilarious and slightly spooky.
```

### `09-prank.webp` — 빨랫줄을 건드리고 훈장님 갓을 눌러 본다

```
Wide panoramic scene split into two gags. On the left, a laundry line in a yard
jerks and swings wildly with no wind, wet clothes flapping, while a man beneath it
stares straight up at the perfectly still sky, scratching his head. On the right,
in a village schoolroom, a thin bearded schoolmaster's tall black hat has been
shoved down over his eyes and he is bellowing with one arm raised, while four
small boys sit bolt upright with their hands on their knees and identical
expressions of total innocence. Bright daylight, comic outrage.
```

### `10-cow.webp` — 소가 저절로 온 동네를 뛰어다닌다

```
Wide panoramic scene of full comic motion. A big cream-brown ox gallops down the
village lane from right to left with its eyes rolling white, tail straight up,
rope halter flying - and nobody on its back, though its back is visibly dented
down in the middle and the loose rope is held up in mid-air. Behind it a whole
crowd of villagers pours down the lane pointing and shouting, hats falling off,
one woman with a water jar tipping over. Chickens exploding out of the way. Dust,
motion lines, bright noon. The funniest picture in the book.
```

### `11-market.webp` — 떡 하나가 공중으로 슥 떠오른다

```
Wide panoramic scene. A busy market under straw awnings. On the right a plump
tteok seller behind a steaming tray of rice cakes has half turned away to serve
someone. On the left, above the tray, one single rice cake floats up into the air
by itself, tilting slightly, steam trailing off it. A shopper nearby has stopped
mid-bite and is staring at it with her eyes crossed. Bright colours, crowded
stalls, one impossible detail.
```

### `12-rumor.webp` — 곳간은 차오르는데 마음은 무거워진다

```
Wide panoramic scene. On the left, inside a storehouse, bolts of cloth, fruit
baskets and grain sacks are heaped to the beams - and the man sits on the floor in
front of them with his arms around his knees, not looking at any of it, face
heavy. On the right, out in the market at dusk, merchants sit hunched over their
goods with their arms wrapped around them, lanterns lit, watching the dark
suspiciously. Warm hoard on one side, worried faces on the other.
```

### `13-hole.webp` — 불티가 튀어 구멍이 나고, 빨간 헝겊으로 기운다

```
Wide panoramic scene. A lamplit room at night. On the left a small charcoal
brazier throws up a spray of orange sparks, and the black cap lying beside it has
a scorched hole in its side with a thread of smoke curling up. On the right the
man sits cross-legged squinting hard, tongue between his teeth, stitching a
brilliant scarlet scrap of cloth over the hole with big crooked stitches. An open
chest of rags beside him. Warm light, one shocking spot of red.
```

### `14-spot.webp` — 허공에 빨간 점 하나가 둥둥 떠다닌다

```
Wide panoramic scene. The market in broad daylight. In the middle of the frame,
floating at head height above the crowd with absolutely nothing around it, is a
single bright scarlet patch of cloth, drifting steadily toward a rice cake stall
on the right. On the left the whole market has turned to look at it - dozens of
faces, pointing arms, one man standing on a barrel. Bright hard sunlight makes
the red blaze. Tense and very funny.
```

### `15-caught.webp` — 감투가 벗겨지고 돌쇠가 불쑥 나타난다

```
Wide panoramic scene. The market, the moment after. On the right a crowd has
piled in and a hand has snatched the black cap up into the air. On the left, in
the sudden gap in the crowd, the man has appeared out of nowhere, on his knees on
the ground with his head bowed and his hands flat in front of him. Every single
face around him has gone silent and still, mouths open. Bright noon, dust
settling. No anger yet - just shock.
```

### `16-burn.webp` — 감투를 태우고, 개울가의 도깨비를 다시 만난다

```
Wide panoramic scene split between two moments. On the left, a kitchen fire hole
at night: the black cap is burning down to ash and the scarlet patch is the last
bright thing left in the flames, while the man crouches watching it with his chin
on his fists. On the right, the moonlit stream: one lone dokkaebi sits on a flat
boulder gnawing a crab leg, and the man stands a little way off with his hands
together, head slightly bowed. Behind them the other five dokkaebi are still
playing around the fire. Warm orange on one side, cool blue on the other, peace on
both.
```

---

## 마지막 장 — `end.webp` (가로 2:1)

돌쇠가 지게를 지고 장터를 간다.

```
Wide scene in bright morning. The village lane. The man walks toward the market
with a loaded A-frame rack on his back and a plain hat on his head, greeting the
tteok seller who waves back from her stall. Ordinary people, ordinary light,
nothing floating anywhere. Warm and unremarkable and completely earned.
```
