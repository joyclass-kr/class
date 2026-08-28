# 제미나이 그림 프롬프트 — 나이 자랑

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 다시 만들 그림 — `03` `04` `08` (2026-08-24 검수)

받은 여덟 장을 본문과 하나씩 대조한 결과입니다.

| 그림 | 무엇이 어긋났나 |
|---|---|
| `03-fox` | **잔칫상이 사라졌다.** 1·2·5·6·7번에는 상이 있는데 3번만 빈 흙바닥이다. 같은 자리에서 이어지는 장면이라 상이 나타났다 사라졌다 한다. 별은 정확히 열 개로 잘 그려졌으니 그것만 그대로 살리면 된다 |
| `04-deer` | 같은 문제. 상이 없다 |
| `08-trees` | **배경이 통째로 다르다.** 가을 숲과 잔칫상이 아니라 대낮 풀밭이고, 여우와 사슴도 없다. 두꺼비가 상 앞에서 셋이 마주 앉아 하는 이야기인데 혼자 딴 데 가 있다. 말풍선 속 세 그루 나무는 본문 그대로라 아주 좋다 |

아래 세 프롬프트는 이미 고쳐 두었습니다. 그대로 다시 돌리시면 됩니다.

**사슴은 그림을 따랐습니다.** 인물 설명에는 노루(짧은 뿔, 점 없음)라고 적어 두었는데 제미나이는 여덟 장 모두 흰 점에 가지 뿔이 난 꽃사슴으로 그렸습니다. 여덟 장을 다시 만드느니 본문의 "노루"를 "사슴"으로 바꾸는 편이 낫다고 보아 그렇게 했고, 인물 설명도 그림에 맞추었습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

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
storybook. Setting is a clearing in a Korean pine forest with a low traditional
wooden feast table (soban) set on a straw mat, bowls of rice cakes and seasoned
greens. Warm autumn colors. The animals sit around the table like guests at a
village feast. Big expressive faces, exaggerated comic gestures. When a boast is
told, draw it as a soft glowing daydream picture floating above the speaker's
head, clearly imaginary. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
The same goes for monsters and beasts - they must be FUN to look at too, drawn
like the monsters in 1980s-90s Korean TV animation. BOLD, SIMPLE and BOUNCY: big
flat areas of saturated colour, thick clean outlines, rounded cartoon masses,
springy exaggerated poses. Huge fangs, a wide roaring mouth, googly eyes out on
stalks, enormous claws are all GOOD - they read as playful because the shapes are
simple and the colours are bright. A monster may fill the whole frame and roar.
What makes a monster disgusting is not its teeth but its TEXTURE and DETAIL: wet
glistening skin, slime, drool, bristles, veins, swarms of small eyes, finely
segmented insect legs, realistic anatomy. Never draw those. Keep every monster a
big bold cartoon shape that a child would want to draw themselves.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The fox: a slim red-orange fox sitting upright with a long bushy tail curled
round, narrow clever eyes, stroking his chin whiskers, pompous and theatrical.
The deer: a slender sika deer, tan coat with white spots along the back and
branching antlers, chin lifted, snooty and superior. The toad: a plump brown-green toad with a wide flat
mouth and heavy-lidded eyes, sitting low and still - the same toad character as
in volume 11. He weeps enormous comic tears in the second half. All three are
animals but seated and gesturing like people at a table.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A low traditional Korean feast table seen from the
side in a forest clearing, bowls of rice cakes on top. A plump toad sits alone at
the head of the table in the upper part of the frame, one webbed foot raised, a
single enormous tear on his cheek. Below him, a fox and a sika deer look up at him
with their mouths open. Warm autumn light through pines.
```

## 본문 열 장 (모두 가로 2:1)

### `01-feast.webp` — 잔칫상 앞의 셋

```
Wide forest clearing scene. In the centre, a low wooden Korean feast table on a
straw mat, laden with white rice cakes and bowls of greens. Around it: the fox on
the left and the sika deer on the right, both hovering awkwardly instead of
sitting, glancing sideways at each other. The toad sits low near the bottom edge,
already settled. Golden autumn light, red maple leaves.
```

### `02-rule.webp` — 나이대로 앉자

```
Wide clearing scene. On the left, the fox sits up very straight with one paw
raised in a formal lecturing gesture, eyes closed, chin high, clearly quoting a
rule. On the right, the sika deer nods gravely with his chin tucked. Between and
below them, the toad simply blinks. The feast table sits untouched in the middle.
```

### `03-fox.webp` — 별을 세던 시절

```
Wide clearing scene. The low wooden feast table stands in the middle of the frame
on its straw mat, still laden with rice cakes and bowls - it must be visible, this
is the same meal as the previous picture. On the left, the fox stands beside the
table striking a grand pose with one paw sweeping toward the sky, tail fanned out,
boasting. The deer waits on the right. The toad sits low at the near edge of the
table. Floating above the fox, a soft glowing daydream image: a night sky
containing exactly ten large stars, with a tiny fox silhouette below counting them
on his paws. The daydream is drawn in pale dreamy colors to read as imaginary.
```

### `04-deer.webp` — 뿔로 긁은 골짜기

```
Wide clearing scene. The low wooden feast table stands in the middle of the frame
on its straw mat, still laden with rice cakes and bowls - it must be visible, this
is the same meal as the previous picture. On the right, the deer tosses his head
back with a dismissive snort, one hoof lifted. The fox scowls on the left, the
toad sits low at the near edge of the table. Floating above the deer, a glowing
daydream image: a small round grassy hill where a much larger deer drags his
antlers along the ground, carving deep grooves that become valleys. Pale dreamy
colors for the daydream, solid colors for the real scene.
```

### `05-quarrel.webp` — 얼굴이 벌게지도록

```
Wide clearing scene. The fox and the sika deer are nose to nose across the feast
table, both leaning in, faces flushed red, mouths open shouting, one paw and one
hoof jabbing at each other. Comic impact lines and flying spit between them. At
the very bottom edge, the toad sits under the table, perfectly still, unnoticed.
```

### `06-tears.webp` — 두꺼비의 울음소리

```
Wide clearing scene. On the right, the toad sits on the straw mat with two
enormous cartoon tears fountaining from his eyes, mouth turned down, shoulders
shaking. On the left, the fox and the sika deer have stopped mid-argument and both
turned to stare, mouths still open, one paw still raised. Comic freeze-frame.
```

### `07-why.webp` — 옛날 생각이 나서요

```
Wide clearing scene. In the centre, the toad wipes one eye with a webbed foot,
speaking quietly, eyes downcast and wistful. The fox on the left and the deer on
the right have both leaned in close, ears forward, brows furrowed with genuine
curiosity. The feast table between them. Soft warm light, a hush after the shouting.
```

### `08-trees.webp` — 세 그루의 나무

```
Wide scene dominated by a huge glowing daydream image filling most of the frame:
three enormous trees against a cosmic sky. The first has become a vast pillar
holding up the sky, the second a long pole from which the sun and moon hang, the
third the handle of a great hammer driving stars into the darkness. The real part of the scene, along the bottom of the
frame, is still the autumn forest clearing: the low feast table on its straw mat,
the toad speaking with one webbed foot raised, and the fox and the deer on either
side of him listening open-mouthed. Do not move the toad anywhere else and do not
change the season or the time of day - the daydream is cosmic, the ground beneath
it is the same golden autumn clearing as every other picture in this book. Dreamy
and magnificent.
```

### `09-shock.webp` — 입을 딱 벌린 둘

```
Wide clearing scene. On the left, the fox and the sika deer both sit frozen with
their jaws hanging wide open, eyes blank white circles, completely stunned. On
the right, the toad blinks placidly, one tear still on his cheek. Both boasters
are already shuffling backward off the mat. Comic dead silence.
```

### `10-seat.webp` — 윗자리에 앉은 두꺼비

```
Wide clearing scene. At the head of the low feast table sits the toad, upright
and content, one webbed foot reaching for a rice cake. Below and to either side,
the fox and the sika deer sit in the lower seats, shoulders slumped, faces sour,
picking at their food. Warm golden light, red leaves drifting down. Wry and funny.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet forest clearing at dusk, no animals. The low wooden feast table stands
empty on the straw mat, one rice cake left on a plate, tall pines around, the
first stars appearing in a deep blue sky above. Peaceful, with a hint of the
question left hanging.
```
