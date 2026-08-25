# 제미나이 그림 프롬프트 — 우렁이 색시

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

**따뜻하고 조용한 이야기예요.** 슬랩스틱은 넣지 마세요. 색시가 우렁이에서 나오는 여덟 번째 장면이 이 책에서 가장 아름다운 그림이 되어야 합니다. 마지막 장면은 아쉬움과 따뜻함이 같이 있어야 해요 — 색시는 웃고 있지만 눈가가 젖어 있습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with soft outlines
and gentle colors, similar to a classic Korean animated storybook. Setting is a
Joseon-era farming village: green rice paddies with water reflecting the sky, a
small thatched cottage with an earthen kitchen, a large brown water jar in the
corner, low stone walls and persimmon trees. Fresh greens and water blues by day,
warm amber lamplight at night. Quiet and tender - no exaggerated comedy. No text
or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The young man: a lean farmer in his twenties in a patched off-white hanbok with
the trouser legs rolled up, a towel round his head, honest lonely face that
gradually brightens. The bride: a young woman in a soft pale green and white
hanbok with her hair in a long plait, calm gentle face with something faintly
otherworldly about her - she should look slightly luminous, especially when she
first appears. The shell: a large smooth freshwater snail shell the size of a
fist, glossy dark green with pale spiral bands. Keep it identical every time.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. The dim corner of an earthen kitchen at night. A
large brown water jar stands in the lower half of the frame, and from its mouth a
soft green-white light rises, curling upward like steam and taking the faint
shape of a woman's sleeve near the top of the tall frame. A single fist-sized
snail shell rests on the jar's rim. Quiet and enchanted.
```

## 본문  장 (모두 가로 2:1)

### `01-field.png` — 혼자 김을 매는 총각

```
Wide rice paddy scene at midday. A wide flooded field reflecting a blue sky
fills most of the frame. In the centre-left, the young man stands knee-deep in
water bent over the rice, alone, the only figure anywhere in the landscape.
Distant thatched roofs, green hills. Beautiful but very empty. Loneliness in a
wide space.
```

### `02-voice.png` — 어디선가 들려온 대답

```
Wide rice paddy scene. The young man has straightened up sharply, one hand still
in the water, head turned and eyes wide, scanning the empty field. Rings of
ripples spread from where his hand was. The paddy, the dyke, the hills - all
empty. Nothing to explain the voice. Sunlit and strange.
```

### `03-again.png` — 벼 포기를 헤치며

```
Wide paddy scene, closer in. The young man wades through the rice with both
hands parting the green stalks, water swirling around his shins, face intent and
half disbelieving. Rice leaves lean away on both sides. Sunlight glinting off the
water surface. Anticipation.
```

### `04-shell.png` — 손바닥 위의 커다란 우렁이

```
Wide scene at the edge of the paddy. In the centre, the young man crouches on
the earthen dyke holding a large glossy dark-green snail shell on his open palm,
turning it toward the light, eyebrows raised in wonder. Water drips from his
sleeve. Green rice on one side, dry dyke path on the other. Small and marvellous.
```

### `05-table.png` — 차려져 있던 밥상

```
Wide interior of a small thatched cottage room at evening. On the right, the door
stands half open with the young man frozen in it, one hand still on the frame,
mouth open. On the left, in the middle of the empty room, a low table set with a
steaming bowl of rice, three side dishes and a soup bowl. Nobody else. Warm lamp
glow. Wonderful and unsettling.
```

### `06-days.png` — 이웃에게 물어보아도

```
Wide scene in a village lane in daylight. On the right, the young man gestures
back toward his house, talking earnestly. On the left, two neighbours - an older
woman with a basin and a man with a hoe - both shake their heads with puzzled
faces, one shrugging. Bright day, thatched roofs, ordinary and baffled.
```

### `07-hide.png` — 짚더미 뒤에 숨어서

```
Wide scene in the cottage yard at dusk. On the right, the young man crouches
low behind a straw stack with only his head and one eye visible past the edge,
holding his breath. On the left, across the swept yard, the dark open mouth of the
earthen kitchen with the big water jar just visible inside. Long blue shadows.
Held breath.
```

### `08-appear.png` — 우렁이에서 나온 색시

```
Wide interior of the earthen kitchen, the most beautiful image in the book. In
the centre, soft green-white light spills from the mouth of the big water jar and
the bride steps out of it, her long sleeves unfurling like water, feet not quite
touching the floor yet. The light picks out the stove, the woodpile, the hanging
gourd. On the far right edge, one eye of the watching man. Luminous and hushed.
```

### `09-caught.png` — 뛰어나온 총각

```
Wide interior of the kitchen. On the left, the young man has burst in with one
arm outstretched, straw still clinging to his shoulder, face urgent. On the
right, the bride has drawn back a step toward the water jar with one hand raised,
startled, her glow flickering. Firelight and green light mixing. A moment that
cannot be taken back.
```

### `10-wait.png` — 사흘만 기다려 주세요

```
Wide interior of the kitchen, calmer. The two stand facing each other across the
small room. The bride has lowered her head and holds up three fingers of one
hand, speaking quietly. The young man listens with both hands at his sides,
nodding. Between them on the floor, the empty snail shell catches the lamplight.
Gentle and serious.
```

### `11-impatient.png` — 하루를 못 넘긴 마음

```
Wide interior of the cottage room at night. On the left, the young man lies awake
on his sleeping mat with his eyes wide open, staring at the ceiling, one hand
gripping the blanket. On the right, through the paper door, the faint green glow
of the kitchen. A small thought bubble above him shows the water jar standing
empty. Restless and human.
```

### `12-together.png` — 조촐한 혼례

```
Wide scene in the cottage yard in warm morning light. In the centre, the young
man and the bride stand together in simple wedding clothes, bowing to a few
neighbours gathered at the gate. The bride is smiling, but her eyes are bright
with tears and she no longer glows. On a stone by the wall, the empty snail shell
sits in the sun. Warm, happy, and just a little wistful.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean farmyard at sunset, no people. A large brown water jar stands
beside the kitchen door, and on the stone ledge next to it an empty green snail
shell rests in the last warm light. Green paddies beyond the wall. Peaceful and
settled.
```
