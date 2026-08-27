# 제미나이 그림 프롬프트 — 석탈해

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**바다에서 시작해 바다로 끝나는 이야기**예요. 앞부분은 넓고 쓸쓸하게, 뒷부분은 따뜻하게 그려 주세요.

- **까치가 이 책의 표식입니다.** 3번, 5번, 14번에 반드시 까치가 나와야 해요. 검고 흰 우리 까치 그대로요.
- **나무 궤는 늘 같은 궤로.** 2번, 3번, 4번에 나오는 궤가 같은 물건이어야 합니다. 쇠 띠를 두른 크고 묵직한 나무 상자예요.
- **9번과 10번은 나쁜 짓처럼 보이게 그리지 마세요.** 탈해의 얼굴에 미안함이 남아 있어야 합니다. 능글맞게 웃는 표정은 안 됩니다.
- **11번이 이 책의 진짜 절정이에요.** 이긴 사람이 열쇠를 도로 내미는 장면이니 두 사람의 표정에 공을 들여 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean outlines
and rich natural colors, in the look of a classic Korean animated film about
myth. Setting is the east coast of Silla: an open grey-green sea, a rocky fishing
shore with drying nets and a small thatched hut, a wooded mountain called
Toham-san looking down over a wide basin, and in the basin a growing town with a
crescent-shaped ridge and tiled houses. Sea greys and blues, warm earth and
thatch tones, gold evening light. Wide horizons. Never frightening. No text or
letters.
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
Talhae: first a boy of about eight with sea-tangled black hair and a plain
wrap, then a lean strong young man in a simple undyed robe with rope-worn hands
and quick alert eyes; he always looks like he is working something out. The old
woman: a small weather-beaten fisherwoman with white hair under a cloth, a hemp
jacket and bare feet, a gruff kind face. Hogong: a well-fed man of about fifty in
a good dark blue coat with a neat beard, quick-tempered at first, warmly amused
later. The magpies: ordinary Korean magpies, black and white with blue-sheened
wings. The chest: a big heavy wooden chest bound with iron bands, drawn exactly
the same every time.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A rocky shore under a wide pale sky. In the lower
half of the tall frame, a big iron-bound wooden chest lies half in the shallows
with waves washing around it, seaweed caught on one corner. Above it, filling the
upper half, five or six black-and-white magpies wheel and cry over the chest, wings
spread. Grey-green sea, pale gold morning light. Lonely and full of promise.
```

## 본문  장 (모두 가로 2:1)

### `01-sea.webp` — 상서롭지 못합니다

```
Wide interior of a foreign palace hall of unfamiliar design. In the centre, a
large pale egg rests on a low table wrapped in silk. Around it, courtiers in
strange robes lean away from it, whispering behind their hands, faces uneasy. On
the right, a king sits with his chin on his fist, silent, looking at it. Cool
light through high openings. Uneasy and quiet.
```

### `02-chest.webp` — 살 만한 땅에 닿거라

```
Wide scene at a foreign harbour at dusk. In the centre, a big iron-bound wooden
chest is being pushed off the end of a stone jetty into the water by servants,
already tilting into the waves. On the left, the king stands at the jetty's edge
with one hand half raised in farewell. Grey sea, low red sun, a long empty
horizon. Sad and open.
```

### `03-magpie.webp` — 깍깍! 깍깍!

```
Wide scene on a rocky Korean shore in the morning. On the right, a flock of
magpies wheels and clamours over one spot in the shallows, some perched on the
rocks, all facing the same way. In the water below them, the iron-bound chest
rocks in the surf. On the left, the old fisherwoman straightens up from her nets,
one hand on her back, staring. Salt spray, pale gold light.
```

### `04-open.webp` — 여기가 어디예요?

```
Wide scene on the shore. The chest has been hauled up onto the shingle, ropes
still around it, its lid thrown back. Sitting up inside it, a boy of about eight
rubs one eye with the back of his hand, hair full of salt. Beside the chest, the
old woman has sat straight down on the stones with her mouth open. Nets, gulls,
morning light. Astonishing and funny.
```

### `05-name.webp` — 성은 석, 이름은 탈해

```
Wide interior of a tiny thatched fisherman's hut. On the left, the old woman
ladles soup into a bowl for the boy, talking over her shoulder. On the right, the
boy sits wrapped in a dry cloth with the bowl in both hands, watching her. Through
the open door behind them, a magpie sits on the fence post. Warm firelight,
smoke, nets hanging from the beams. Home.
```

### `06-grow.webp` — 손도 야무진데 머리도 비상하구나

```
Wide scene on the shore. In the centre, the young man Talhae sits on an upturned
boat mending a net with a wooden needle, working fast without looking - because a
book is propped open on his knee and he is reading it. On the left, two old
fishermen watch him and nudge each other. Bright sea light, drying nets, gulls.
Warm and slightly comic.
```

### `07-mountain.webp` — 이레 동안 내려다보다

```
Wide landscape scene from a mountain summit at dawn. In the foreground on the
right, Talhae sits on a rock with his arms around his knees, small against the
view, a bundle and a water gourd beside him. Below and ahead, a vast basin with
a river, fields and a scattering of tiled roofs, and one long crescent-shaped
ridge catching the first light. Enormous space. Deciding.
```

### `08-house.webp` — 담 밖에 서 있던 사람

```
Wide scene in a town lane. On the right, a fine walled house with a tiled roof
sits on the crescent ridge, its gate shut. On the left, Talhae stands out in the
lane with his hands at his sides, looking up at it, his face torn between longing
and doubt. Long shadows, a dog asleep in the dust. Quiet and uncomfortable.
```

### `09-trick.webp` — 담 밑에 묻은 숯과 숫돌

```
Wide scene split between night and morning. On the left, at night, Talhae
crouches at the foot of the wall burying a bundle of charcoal and a whetstone,
glancing over his shoulder, his face guilty rather than sly. On the right, in
morning light, he stands at the gate knocking while Hogong bursts out red-faced
and shouting. Moonlight and daylight in one frame.
```

### `10-court.webp` — 정말로 숯과 숫돌이 나왔어요

```
Wide scene in a government courtyard. In the centre, two servants have dug a
hole at the foot of the wall and are holding up lumps of black charcoal and a
grey whetstone for everyone to see. On the left, an official nods from a raised
seat. On the right, Hogong's arms drop to his sides, and behind him Talhae is not
smiling at all. Dust, bright noon light.
```

### `11-return.webp` — 도로 내민 열쇠

```
Wide scene at the gate of the fine house at evening. In the centre, Talhae holds
out a large iron key on his open palm toward Hogong, his face serious and calm. On
the right, Hogong stares at the key with his eyebrows up and his mouth half open,
completely thrown. Warm orange light along the wall. The most important picture in
the book.
```

### `12-friend.webp` — 그날부터 둘도 없는 벗

```
Wide scene on the porch of the house. On the left, Hogong is doubled over
laughing with one hand slapping his knee and the other on Talhae's shoulder. On
the right, Talhae grins and scratches the back of his head, embarrassed. Between
them, a small table with two cups. Lantern light, moths, a warm evening. Easy and
happy.
```

### `13-king.webp` — 물러설 줄도 아는구나

```
Wide interior of a modest Silla hall. On the right, an elderly king leans forward
from his seat with one hand extended, looking closely at Talhae with real
interest. On the left, Talhae kneels straight-backed, hands on his knees. Courtiers
and Hogong stand along the wall, Hogong openly proud. Warm plain wood, daylight
from the door. Respect.
```

### `14-shore.webp` — 내가 여기서 시작했지

```
Wide scene on the rocky shore at sunrise. In the centre, Talhae, now older and
dressed as a king but with his shoes off and his feet in the shallows, stands
looking out at the sea, trousers rolled. Behind him on the beach, the old
fisherwoman's tiny hut and a few magpies on the roof ridge. Gold light on the
water, gulls, wide horizon. Full circle.
```

### `end.webp` — 마지막 (가로 2:1)

```
A rocky shore at evening with no people. A tiny thatched hut with nets drying on
a rack, an old iron-bound wooden chest set down beside the door and used to hold
floats and rope, and one magpie on the fence post. The sea calm and gold to the
horizon. Peaceful and warm.
```
