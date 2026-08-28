# 제미나이 그림 프롬프트 — 청개구리

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

파일명을 정확히 맞춰서 `images/` 폴더에 넣으면 자동으로 나타납니다.


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
storybook. Setting is a Korean countryside stream and the green hills around it:
reeds and cattails along the water, flat wet stones, lily pads, willow branches
overhead, rice paddies and pine hills in the distance. Fresh green and water-blue
palette. Big expressive faces, warm gentle mood. No text or letters in the image.
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
Mother frog: a gentle green tree frog with soft rounded features, kind tired
eyes, a small pale apron or a folded cloth on her head to read as motherly. Son
frog: a small bright green tree frog, big round eyes, wide grin, always mid-jump
or facing the wrong way, cheeky and full of energy. Village frogs: assorted green
and brown frogs of different sizes, used as onlookers. Keep both main frogs
clearly the same characters in every image.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A quiet Korean countryside stream seen from low at
the water's edge at dusk. Tall reeds frame both sides, a small round mound of
smooth stones sits on the near bank, and a single small green frog sits beside it
looking up at a sky heavy with coming rain. Soft blue and green, gentle and a
little lonely.
```

## 본문 열 장 (모두 가로 2:1)

### `01-opposite.webp` — 산에 가라니 개울로 뛰는 아들

```
Wide scene by a countryside stream. On the left, the mother frog stands on a flat
stone pointing firmly toward green hills in the far distance, mouth open giving
an instruction. On the right, the small son frog is already mid-leap in exactly
the opposite direction, toward the water, grinning over his shoulder, tongue out.
Motion arcs behind him. Comic, sunny, full of energy.
```

### `02-backwards.webp` — 무엇이든 반대로

```
Wide scene divided into three small moments across the frame, like a comic strip
without panel borders. Left: the mother points forward, the son hops backward.
Middle: the mother points up, the son dives down into the water. Right: the
mother slumps with a hand on her forehead, exhausted. Keep the frogs clearly the
same characters in each moment. Playful and funny.
```

### `03-gulgae.webp` — 우는 소리도 거꾸로

```
Wide scene on a lily-pad-covered pond. On the left, the mother frog demonstrates
croaking, throat puffed round, eyes closed in concentration. On the right, the
son frog croaks with his head tilted upside down, throat puffed, clearly doing it
backwards. Behind them a row of village frogs on the bank laugh with their heads
thrown back. Bright and comic.
```

### `04-sigh.webp` — 밤마다 한숨 쉬는 엄마

```
Wide night scene at the edge of the stream. On the right, the mother frog sits
alone on a stone under moonlight, shoulders drooping, chin resting on one hand,
letting out a long sigh. On the left, far away and small, the son frog plays
happily by himself, splashing, completely unaware. Cool blue night, quiet and a
little sad.
```

### `05-sick.webp` — 자리에 누운 엄마

```
Wide scene inside a small cozy burrow among the reeds, seen in cutaway. On the
right, the mother frog lies on a bed of soft moss and grass, covered with a
leaf-like blanket, eyes half closed, looking weak. On the left, the son frog
crouches at the entrance peering in, his usual grin gone, one hand on the ground.
Warm dim green light.
```

### `06-plan.webp` — 반대로 말하기로 마음먹는 엄마

```
Wide scene in the same burrow. The mother frog lies propped on one elbow, eyes
open and thoughtful, a faint knowing smile on her face. Above her head, a small
thought bubble is split in two: on one side a stone mound up on a green hill, on
the other side a stone mound beside a stream. Soft warm light, tender rather than
sad.
```

### `07-last-words.webp` — 마지막 부탁

```
Wide scene in the burrow. The mother frog has drawn the small son frog close with
one hand on his shoulder, speaking quietly and clearly, her other hand pointing
toward the stream outside. The son frog looks up at her with wide startled eyes,
mouth slightly open, confused. Soft golden light through the reed entrance.
Gentle and quiet.
```

### `08-regret.webp` — 목놓아 우는 아들

```
Wide scene by the stream at dawn. The small son frog sits alone on a wet flat
stone in the centre, curled forward, both hands covering his face, crying hard,
tears flying. Reeds bend around him, pale grey and pink dawn light on the water.
The frame is mostly empty space around the tiny figure. Sad but soft, not grim.
```

### `09-grave.webp` — 개울가에 무덤을 쌓는 아들

```
Wide scene on the stream bank. The son frog carries a smooth round stone in both
arms toward a low mound he is building beside the water, other stones already set
in place in a careful circle. His face is calm and serious for the first time.
Reeds and wildflowers around the mound, warm afternoon light on the water.
```

### `10-rain.webp` — 비 오는 날 우는 청개구리

```
Wide scene in heavy rain. The stream has swollen and the water pushes close to a
small stone mound on the bank. The son frog stands in front of the mound with his
arms spread wide as if shielding it, throat puffed enormous, croaking up at the
sky with all his strength, rain streaming off him. Dark blue-grey rain, silver
streaks, dramatic and moving.
```

### `end.webp` — 마지막 (가로 2:1)

```
A calm countryside stream the morning after rain, no frogs. A small round mound
of smooth stones sits safe on the grassy bank, water sparkling beside it, reeds
straightening up, a rainbow faint in the clearing sky. Peaceful and hopeful.
```
