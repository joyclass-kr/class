# 제미나이 그림 프롬프트 — 망두석 재판

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Joseon-era county town: a tiled-roof government office
(gwana) with a wide packed-earth courtyard, a raised wooden platform where the
magistrate sits behind a low desk, plus a dusty country road with pine trees and
a grave mound. Warm daylight, rich fabric colors for the silk. Big expressive
faces, exaggerated comic gestures. Nobody is beaten or hurt. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The silk merchant: a middle-aged man in worn brown hanbok with a cloth headband,
a tall stack of colourful silk bolts on a wooden A-frame carrier, round anxious
face. The magistrate: a dignified man in a dark blue official robe and a winged
black official hat, long thin beard, a completely straight face throughout - the
joke is that he never once looks like he is joking, until the very last picture
where he allows himself a small knowing smile. The constables: two men in yellow
tunics with black hats and staffs, permanently baffled. The stone post: a
weathered grey granite pillar about the height of a man, carved with a simple
rounded top - draw it exactly the same in every picture, completely inert.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A weathered grey stone post stands upright in the
middle of a government office courtyard, bound around with thick rope, filling
most of the tall frame. At the bottom, small in comparison, a magistrate in dark
blue robes sits behind a low desk pointing sternly up at it. A ring of villagers'
heads peeks in from the edges. Warm sunlight, absurd and intriguing.
```

## 본문 열 장 (모두 가로 2:1)

### `01-merchant.webp` — 망두석 그늘에서 잠들다

```
Wide summer country road scene at midday. On the right, a tall weathered grey
stone post stands beside the road near a low grass grave mound, casting a narrow
patch of shade. In that shade on the left, the silk merchant lies asleep with his
head on his arm, mouth open, his A-frame carrier stacked with bright silk bolts
propped beside him. Blazing sun, cicada-loud stillness.
```

### `02-gone.webp` — 사라진 비단

```
Wide road scene. In the centre, the merchant is on his feet spinning around with
both arms flung wide, mouth open in a wail, eyes streaming. The spot where his
carrier stood is empty except for a flattened patch of grass. The stone post
stands beside him, utterly indifferent. Empty road stretching to both edges, not
a soul in sight.
```

### `03-court.webp` — 관아에 아뢰다

```
Wide scene in a government office courtyard. On the right, the magistrate sits on
a raised wooden platform behind a low desk in dark blue robes and winged hat,
leaning forward with one hand raised in a question. On the left, the merchant
kneels on the packed earth with both hands on the ground, head bowed, one hand
lifted to point weakly back toward the road. Two constables stand at the sides.
```

### `04-arrest.webp` — 돌을 잡아 오너라

```
Wide courtyard scene. On the right, the magistrate stands and points offstage
with a straight arm, face absolutely serious, robes sweeping. On the left, the
two constables stare at him with their jaws hanging open, one pointing at himself
in disbelief, the other's hat sliding sideways. Huge comic contrast between the
magistrate's calm and their panic.
```

### `05-drag.webp` — 밧줄로 끌려오는 돌기둥

```
Wide scene on the road into town. In the centre, the two constables heave on
thick ropes wrapped around the grey stone post, which is lying on a wooden sled,
both men red-faced and straining. Along both sides of the road, villagers gather,
pointing and laughing behind their hands, more running in from the edges of the
frame. Dust and effort lines.
```

### `06-question.webp` — 돌을 심문하는 원님

```
Wide courtyard scene. On the right, the magistrate leans over his desk and
bellows at the stone post, one fist raised, beard bristling, absolutely furious.
In the centre, the grey stone post stands roped upright, doing nothing at all. On
the left and behind, a packed crowd of villagers presses in, all wide-eyed, some
biting their lips. Peak absurdity, played completely straight.
```

### `07-laugh.webp` — 터져 버린 웃음

```
Wide courtyard scene. The crowd fills most of the frame, every single person
doubled over laughing, heads thrown back, hands slapping knees, hats falling off,
tears flying. In the centre the stone post stands silent. On the right edge, the
magistrate sits frozen mid-shout, staring at them. Explosive noise and motion.
```

### `08-fine.webp` — 비단 한 필씩 바쳐라

```
Wide courtyard scene. On the right, the magistrate slams one palm down on his low
desk, the desk jumping, his face thunderous. On the left, the crowd has gone dead
silent and pale, mouths shut tight, several already backing away toward the gate
with stiff frightened steps. The stone post stands unbothered in the middle.
Comic reversal.
```

### `09-silk.webp` — 산더미처럼 쌓인 비단

```
Wide courtyard scene in evening light. In the centre, a big heap of colourful
rolled silk bolts piled on straw mats. On the left, the merchant kneels beside it
holding one bolt up to the light, eyes wide, one arm shooting up as he shouts. On
the right, the magistrate watches from his platform, expression unreadable. Warm
orange light across the courtyard.
```

### `10-caught.webp` — 무릎을 탁 친 사람들

```
Wide courtyard scene. On the left, the two constables take hold of a shifty-looking
man in grey who hangs his head. In the centre-right, the magistrate finally allows
a small knowing smile, one hand stroking his beard. Around them, villagers slap
their own knees and foreheads in dawning realisation, several pointing at the
stone post. Warm evening light, satisfying and funny.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet country road at sunset, no people. The weathered grey stone post stands
back in its own place beside the grave mound, a loose length of rope coiled at
its base, long shadows across the dirt road, pine trees behind. Warm orange
light. Calm and a little wry.
```
