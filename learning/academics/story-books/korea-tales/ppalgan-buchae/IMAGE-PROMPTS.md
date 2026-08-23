# 제미나이 그림 프롬프트 — 빨간 부채 파란 부채

그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 이 책만의 요령

처음부터 끝까지 **웃기는 이야기**예요. 코는 굵기가 일정한 긴 원통처럼 만화적으로 그려 주세요. 장면마다 코가 얼마나 길어졌는지가 한눈에 보여야 합니다.

**이 책에서 가장 중요한 두 장면입니다.**
- **8번** — 부자네 식구가 세간을 이고 지고 줄줄이 집을 나서는 장면. 보따리를 머리에 인 할머니, 지게에 항아리와 세간을 잔뜩 진 남자, 소매로 눈물을 찍는 여자, 그 뒤에서 부채를 흔들며 신난 영감. 식구들은 울상인데 영감만 신나 있는 대비가 웃음입니다.
- **11번** — 옥황상제가 밥을 드시다가 상이 흔들리는 장면. 하늘나라 궁전은 구름 위에 금빛으로 빛나게, 상에는 생선과 과일과 국그릇을 차려 놓으세요. 국그릇의 국물이 찰랑거리고, 옥황상제가 수저를 든 채 눈을 부릅뜬 얼굴이어야 합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, in the look of an early-1990s Korean
television cartoon. Settings: a sunny pine hillside, a wealthy family's
tiled-roof house with a feast courtyard, a village road, and a golden heavenly
palace floating above the clouds. Sunny warm palette below, luminous gold and
pastel cloud colours above. Big exaggerated cartoon expressions, heavy motion
lines. Long noses are smooth even tubes, comic and never grotesque. Nobody is
hurt. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Kim Cheomji: a scrawny middle-aged man with a thin moustache, a battered
horsehair hat and a patched grey hanbok, lazy droopy eyes that light up whenever
he has a bad idea. The rich old master: a very plump elderly man in fine dark
blue silk with a white beard, loud and greedy; his nose grows to enormous length
in the last chapter. His family: an elderly wife, a grown son, a daughter-in-law
and servants - all in decent hanbok, all miserable in the moving-out scene. The
Jade Emperor: a tall dignified old figure with a long grey beard, a golden crown
with hanging beads and wide golden-yellow robes, seated at a white dining table.
His attendant: a young court lady in green and gold robes with looped black hair.
The fans: one flat bright red folding fan and one flat bright blue folding fan.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A golden heavenly palace floats among pink and
lilac clouds in the upper half of the tall frame, glowing with light. Rising from
the bottom of the frame and passing right up through the clouds beside it, an
absurdly long smooth nose, with a small startled blue bird flying away from it.
At the very bottom, tiny, a man lies in a courtyard fanning himself. Funny and
grand at once.
```

## 본문 열네 장 (모두 가로 16:9)

### `01-nap.png` — 산에서 낮잠을 자다 깨어 보니

```
Wide sunny pine hillside scene. On the left, Kim Cheomji sprawls on his back in
the grass under a pine, hat tipped over his face, one leg crossed over the other,
mid-yawn as he wakes. On the right, on a flat stone beside him, a red fan and a
blue fan lie neatly side by side, as if placed there. Bright green and gold,
comic.
```

### `02-red.png` — 빨간 부채를 부치자 코가 쑥

```
Wide hillside scene. In the centre, Kim Cheomji sits cross-legged fanning
himself with the red fan, eyes half closed in comfort - and his nose has shot out
a hand's length, drawn as a smooth tube with motion lines showing it extending.
He has not noticed yet. A butterfly perches on the tip. Very funny, sunny.
```

### `03-blue.png` — 파란 부채로 도로 줄이다

```
Wide hillside scene split in two. On the left, Kim leaps up with both eyes
bulging and hands flying, having just seen his own nose. On the right, a moment
later, he fans furiously with the blue fan while the nose shrinks back with comic
retraction lines. Alarm is already turning into a sly grin. Fast comic timing.
```

### `04-feast.png` — 부잣집 잔치에 숨어들다

```
Wide scene in a rich family's courtyard during a feast. Low tables laden with
food, guests in fine hanbok laughing, musicians at the side. On the right, the
plump old master sits at the head table, mouth wide with laughter. On the far
left, Kim Cheomji peeks from behind a wooden pillar, red fan half hidden against
his chest, eyes narrowed. Sunny and busy.
```

### `05-nose.png` — 쑥쑥 자라는 영감의 코

```
Wide courtyard scene, chaos. In the centre, the old master's nose has grown
three hand-spans long and knocked a bowl off the table; he stares down its length
cross-eyed with both hands raised. All around him guests leap up, food flying,
hats falling, mouths open in shock. On the far left, Kim hides behind the pillar
biting his knuckle. Peak comedy.
```

### `06-cure.png` — 파란 부채로 고쳐 주자

```
Wide courtyard scene, calmer. In the centre, Kim Cheomji fans the old master with
the blue fan wearing a solemn healer's expression, while the master's nose
retracts to normal and his eyes stream with relief. But the master's eyes have
already slid sideways and locked onto the blue fan, pupils gone greedy. Warm gold
light, the exact moment the trouble starts.
```

### `07-trade.png` — 이 집을 통째로 주겠소

```
Wide scene on the verandah of the tiled-roof house. On the right, the old master
leans in with both arms flung wide, gesturing at his whole house and courtyard,
face flushed with greed. On the left, Kim Cheomji holds the two fans behind his
back with one eyebrow raised, half tempted, half alarmed. Behind them the fine
house, the storehouse, the full yard. Absurd bargain.
```

### `08-moveout.png` — 세간을 이고 지고 집을 나서는 식구들

```
Wide scene on a village road, a single long line of figures walking from right to
left. In front, an elderly woman balances a big cloth bundle on her head. Behind
her, a man bent under an A-frame carrier stacked absurdly high with chests, jars
and a washbasin. Then a young woman in a red skirt wiping her eyes with her
sleeve, carrying a bundle. Behind them all, the plump old master strides along
grinning and waving the red fan, delighted, and a servant follows with the last
box. Everyone miserable except him. Sunny road, distant hills.
```

### `09-play.png` — 빈 마당에서 신이 난 영감

```
Wide scene in the now empty courtyard. In the centre, the old master reclines on
a straw mat in the middle of a bare yard, fanning himself with the red fan, legs
kicking with delight, his nose already a metre long and rising. The house behind
him is stripped - open doors, empty storehouse, nothing in the yard. Bright
midday, gleeful and stupid.
```

### `10-sky.png` — 구름을 뚫고 올라가는 코

```
Wide scene, mostly sky. From the bottom left of the frame, an enormously long
smooth nose rises across the whole picture, past a roof, past a pine, and up
through a bank of white clouds at the top right. A small blue bird veers away
from it in fright, wings blurred, beak open. Bright blue sky, absurd and
beautiful.
```

### `11-emperor.png` — 밥을 드시다 상이 흔들리고

```
Wide interior of a golden heavenly palace hall. On the left, the Jade Emperor
sits at a white round dining table in golden-yellow robes and a tall crown with
hanging beads, a cup halfway to his lips, eyes suddenly wide and glaring. On the
right, a court lady in green and gold robes sits opposite him, cup raised,
startled. On the table: a whole fish on a plate, a bowl of red apples and purple
grapes, a lidded soup tureen with the soup visibly sloshing. Motion lines shaking
the table. Very funny.
```

### `12-pillar.png` — 구름 위에 솟은 벌건 기둥

```
Wide scene on a cloud terrace outside the palace. On the right, the Jade Emperor
stands pointing down with one finger, brows crashed together, sleeves sweeping,
thoroughly annoyed; the court lady peers over his shoulder. On the left, poking up
through the cloud floor, the pale round tip of an enormous nose, sitting there
like a badly placed post. Golden light, pink clouds. Deadpan absurdity.
```

### `13-tied.png` — 꽁꽁 묶인 코

```
Wide scene split between sky and ground. Above, two heavenly attendants wind
thick golden rope around the nose tip, pulling it tight with braced feet. Below,
in the empty courtyard, the old master leaps and writhes with both hands on his
face, mouth open in a howl, the blue fan flapping wildly in one hand. Motion
lines top and bottom. Slapstick.
```

### `14-fall.png` — 짚더미에 쿵, 그리고 돌려준 집

```
Wide courtyard scene. On the left, the old master has landed head first in a
haystack with only his legs sticking out, straw exploding outward, his nose back
to normal size. High above, the red and blue fans tumble away on the wind, already
small. On the right, Kim Cheomji holds out a folded paper deed toward the
returning family, who are coming back through the gate with their bundles, faces
lighting up. Warm and satisfying.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet Korean courtyard at sunset, no people. A haystack with a person-shaped
dent in it, a battered horsehair hat resting on top, and high in the orange sky
two tiny specks - one red, one blue - drifting away on the wind. Warm and wry.
```
