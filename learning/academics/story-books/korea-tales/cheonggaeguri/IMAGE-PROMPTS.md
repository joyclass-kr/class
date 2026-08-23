# 제미나이 그림 프롬프트 — 청개구리

그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

파일명을 정확히 맞춰서 `images/` 폴더에 넣으면 자동으로 나타납니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 1.92 : 1 | **가로 16 : 세로 9** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.76 : 1 | **가로 16 : 세로 9** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Setting is a Korean countryside stream and the green hills around it:
reeds and cattails along the water, flat wet stones, lily pads, willow branches
overhead, rice paddies and pine hills in the distance. Fresh green and water-blue
palette. Big expressive faces, warm gentle mood. No text or letters in the image.
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

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A quiet Korean countryside stream seen from low at
the water's edge at dusk. Tall reeds frame both sides, a small round mound of
smooth stones sits on the near bank, and a single small green frog sits beside it
looking up at a sky heavy with coming rain. Soft blue and green, gentle and a
little lonely.
```

## 본문 열 장 (모두 가로 16:9)

### `01-opposite.png` — 산에 가라니 개울로 뛰는 아들

```
Wide scene by a countryside stream. On the left, the mother frog stands on a flat
stone pointing firmly toward green hills in the far distance, mouth open giving
an instruction. On the right, the small son frog is already mid-leap in exactly
the opposite direction, toward the water, grinning over his shoulder, tongue out.
Motion arcs behind him. Comic, sunny, full of energy.
```

### `02-backwards.png` — 무엇이든 반대로

```
Wide scene divided into three small moments across the frame, like a comic strip
without panel borders. Left: the mother points forward, the son hops backward.
Middle: the mother points up, the son dives down into the water. Right: the
mother slumps with a hand on her forehead, exhausted. Keep the frogs clearly the
same characters in each moment. Playful and funny.
```

### `03-gulgae.png` — 우는 소리도 거꾸로

```
Wide scene on a lily-pad-covered pond. On the left, the mother frog demonstrates
croaking, throat puffed round, eyes closed in concentration. On the right, the
son frog croaks with his head tilted upside down, throat puffed, clearly doing it
backwards. Behind them a row of village frogs on the bank laugh with their heads
thrown back. Bright and comic.
```

### `04-sigh.png` — 밤마다 한숨 쉬는 엄마

```
Wide night scene at the edge of the stream. On the right, the mother frog sits
alone on a stone under moonlight, shoulders drooping, chin resting on one hand,
letting out a long sigh. On the left, far away and small, the son frog plays
happily by himself, splashing, completely unaware. Cool blue night, quiet and a
little sad.
```

### `05-sick.png` — 자리에 누운 엄마

```
Wide scene inside a small cozy burrow among the reeds, seen in cutaway. On the
right, the mother frog lies on a bed of soft moss and grass, covered with a
leaf-like blanket, eyes half closed, looking weak. On the left, the son frog
crouches at the entrance peering in, his usual grin gone, one hand on the ground.
Warm dim green light.
```

### `06-plan.png` — 반대로 말하기로 마음먹는 엄마

```
Wide scene in the same burrow. The mother frog lies propped on one elbow, eyes
open and thoughtful, a faint knowing smile on her face. Above her head, a small
thought bubble is split in two: on one side a stone mound up on a green hill, on
the other side a stone mound beside a stream. Soft warm light, tender rather than
sad.
```

### `07-last-words.png` — 마지막 부탁

```
Wide scene in the burrow. The mother frog has drawn the small son frog close with
one hand on his shoulder, speaking quietly and clearly, her other hand pointing
toward the stream outside. The son frog looks up at her with wide startled eyes,
mouth slightly open, confused. Soft golden light through the reed entrance.
Gentle and quiet.
```

### `08-regret.png` — 목놓아 우는 아들

```
Wide scene by the stream at dawn. The small son frog sits alone on a wet flat
stone in the centre, curled forward, both hands covering his face, crying hard,
tears flying. Reeds bend around him, pale grey and pink dawn light on the water.
The frame is mostly empty space around the tiny figure. Sad but soft, not grim.
```

### `09-grave.png` — 개울가에 무덤을 쌓는 아들

```
Wide scene on the stream bank. The son frog carries a smooth round stone in both
arms toward a low mound he is building beside the water, other stones already set
in place in a careful circle. His face is calm and serious for the first time.
Reeds and wildflowers around the mound, warm afternoon light on the water.
```

### `10-rain.png` — 비 오는 날 우는 청개구리

```
Wide scene in heavy rain. The stream has swollen and the water pushes close to a
small stone mound on the bank. The son frog stands in front of the mound with his
arms spread wide as if shielding it, throat puffed enormous, croaking up at the
sky with all his strength, rain streaming off him. Dark blue-grey rain, silver
streaks, dramatic and moving.
```

### `end.png` — 마지막 (가로 16:9)

```
A calm countryside stream the morning after rain, no frogs. A small round mound
of smooth stones sits safe on the grassy bank, water sparkling beside it, reeds
straightening up, a rainbow faint in the clearing sky. Peaceful and hopeful.
```
