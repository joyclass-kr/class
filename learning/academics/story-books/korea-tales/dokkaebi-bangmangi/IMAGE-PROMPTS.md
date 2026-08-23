# 제미나이 그림 프롬프트 — 도깨비 방망이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 이 책만의 요령

밝고 신나는 이야기예요. 도깨비는 무섭게가 아니라 **시끄럽고 우스운 잔치꾼**으로 그려 주세요.

- **도깨비 생김새를 처음부터 끝까지 똑같이** 그려 주세요. 뿔 하나, 울퉁불퉁한 얼굴, 알록달록한 옷, 손에는 울퉁불퉁한 나무 방망이. 겁이 아주 많은 얼굴이어야 합니다.
- **7번이 이 책의 절정입니다.** 개암 하나 깨무는 소리에 도깨비 수십 마리가 아수라장이 되는 장면이니 화면을 크게 쓰고 동작선을 아끼지 마세요.
- **개암은 밤보다 훨씬 작습니다.** 엄지손톱만 한 동글동글 갈색 열매로 그려 주세요. 밤처럼 뾰족하면 안 됩니다.
- **12번의 코는 우스꽝스럽게.** 아프거나 징그럽지 않게, 길게 늘어져 바닥에 늘어진 우스운 모양으로요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, in the look of a classic Korean
animated storybook. Setting is a Joseon-era mountain village: an autumn oak and
hazel forest with fallen leaves, a tumbledown abandoned cottage in a valley with
a dusty loft, and small thatched houses in the village below. Warm gold autumn
daylight, deep amber firelight and blue moonlight at night. Big exaggerated
comic expressions, heavy motion lines. Nobody is hurt. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The younger brother: a lean cheerful young man in patched off-white hanbok with
his hair in a topknot and a straw A-frame carrier on his back, an open honest
face. The elder brother: a plumper man in a better blue-grey coat with a thin
moustache and greedy narrow eyes, always leaning forward.
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
The hazelnuts: small round glossy brown nuts the size of a thumbnail.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. The dim interior of an abandoned cottage at
night, seen from the loft above. Filling the lower two thirds of the tall frame,
a crowd of horned dokkaebi in bright patchwork jackets dance around a heap of
gold and silver, clubs raised, mouths open in song. In the upper part of the
frame, in the dark loft, the younger brother peers down through a gap between
the boards with one hand over his mouth and a tiny brown nut held in the other.
Amber firelight from below, deep blue shadow above.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-brothers.png` — 욕심 많은 형과 마음 고운 아우

```
Wide autumn scene in a small mountain village. On the left, the younger brother
carries an A-frame stacked with firewood, smiling at a neighbour. On the right,
the elder brother stands in front of a better house with his arms folded and his
chin up, looking away. Thatched roofs, persimmon trees, gold afternoon light.
The difference between them is all in the posture.
```

### `02-pick.png` — 개암 네 알을 줍다

```
Wide scene in an autumn oak and hazel forest floor thick with fallen leaves. In
the centre, the younger brother crouches with four small round brown hazelnuts
lined up on his open palm, counting them off with a happy face. Above his head,
three small thought bubbles showing his father, his mother and his brother, and
a fourth showing himself. Dappled gold light, drifting leaves.
```

### `03-house.png` — 해가 진 골짜기의 빈 집

```
Wide scene in a dark mountain valley at dusk. In the centre, a tumbledown
thatched cottage with a sagging roof and a broken door stands alone among bare
trees. On the right, small in the frame, the younger brother approaches with his
firewood carrier, one hand shading his eyes. Deep blue-violet twilight, one
early star. Lonely and a little eerie, not frightening.
```

### `04-dokkaebi.png` — 한밤중에 몰려온 도깨비들

```
Wide interior of the cottage at night. Through the broken door on the left, a
crowd of horned dokkaebi in patchwork jackets come pouring in, clubs on their
shoulders, mouths open in song, feet stamping. On the upper right, the younger
brother scrambles up a ladder into the dark loft, looking back over his shoulder
with huge frightened eyes. Blue moonlight, dust shaken from the beams.
```

### `05-feast.png` — 금 나와라, 뚝딱!

```
Wide interior scene, the whole floor filled with the party. In the centre, a
dokkaebi swings his club down onto the floor and a fountain of gold coins and
silver ingots and rice cakes erupts upward in a glittering spray. All around,
dokkaebi dance in a ring with their arms up, singing. Amber firelight, sparkles,
motion lines everywhere. Pure noisy joy.
```

### `06-hungry.png` — 다락 위에서 꼬르륵

```
Wide scene of the dark loft above. In the centre, the younger brother lies flat
on the boards peering down through a knothole, one hand clutching his growling
stomach, the other pulling a small brown hazelnut from his pocket. Curls of
steam from the rice cakes below drift up through the gap and coil around his
nose. Blue shadow above, warm glow from below. Comic longing.
```

### `07-crack.png` — 딱! 집이 무너진다!

```
Wide interior scene, total pandemonium. From the loft at the top, a single
starburst of sound. Below, the whole crowd of dokkaebi bolt for the broken door
at once - tripping over each other, one flat on his face, one wedged in the
doorway, clubs and gold flying, mouths open in screams, eyes enormous. Dust and
falling straw. The funniest picture in the book.
```

### `08-left.png` — 덩그러니 남은 방망이 하나

```
Wide interior scene in the pale morning. The cottage floor is empty and still,
straw and dust settling, the broken door swinging. In the centre of the bare
floor lies a single gnarled wooden club, dropped and forgotten. On the right,
the younger brother stands at the foot of the ladder looking at it with his
mouth open. Cool morning light through the gaps. Quiet after the storm.
```

### `09-brother.png` — 하나도 빠짐없이 말해 보아라

```
Wide scene in the yard of a brand-new tiled-roof house. On the left, the
younger brother scratches his head, talking modestly. On the right, the elder
brother grips him by both shoulders and leans in until their noses almost touch,
eyes wide and glittering, teeth bared in a grin. Behind them the fine new roof
and a full grain jar. Bright day. Comic greed.
```

### `10-copy.png` — 개암을 한 자루나

```
Wide scene split between forest and cottage. On the left, the elder brother
sweeps hazelnuts into a bulging sack with both arms, leaves flying, sweat
pouring. On the right, he sits cross-legged in the middle of the abandoned
cottage floor at dusk with the sack in his lap, grinning at the door and
waiting. Deep blue evening light. Too eager by half.
```

### `11-caught.png` — 저놈이다!

```
Wide interior scene at night. On the left in the loft, the elder brother has a
huge fistful of nuts crammed in his cheeks, crunching hard, eyes squeezed shut.
On the right, the dokkaebi have not run at all - they point up at him with their
clubs, faces furious, and come swarming up the ladder in a knot of arms and
horns. Amber firelight. His eyes fly open. Comic doom.
```

### `12-nose.png` — 코 늘어나라, 뚝딱!

```
Wide interior scene. In the centre, the elder brother sits on the floor with an
enormously long nose stretching down and coiling across the boards, holding it up
in both arms with a stunned face. All around, dokkaebi roll on the floor
laughing, clubs waving, one wiping a tear. Keep the nose silly and rubbery, never
gruesome. Firelight, chaos, laughter.
```

### `end.png` — 마지막 (가로 16:9)

```
A quiet mountain village yard in the morning, no people. A gnarled wooden club
leans against a low stone wall, and beside it a small wooden bowl holding four
round brown hazelnuts. Persimmon leaves on the ground, warm low sunlight.
Peaceful and wry.
```
