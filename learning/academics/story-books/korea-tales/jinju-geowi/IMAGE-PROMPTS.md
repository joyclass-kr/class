# 제미나이 그림 프롬프트 — 진주를 삼킨 거위

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 두 자리에 쓰입니다.** 마지막 「끝」 쪽에서는 가로로 넓게(1.7 : 1),
> 「읽고 나서」 오른쪽 위에서는 세로로 길게(0.8 : 1) 들어갑니다.
> 칸에 꽉 차게 잘라 넣는 방식이라, 가로로 넓은 그림을 세로 칸에 넣으면 **좌우가 절반 넘게 잘립니다.**
> 그러니 **중요한 것은 한가운데에 크게 두고, 좌우 가장자리는 하늘이나 들판처럼 잘려도 되는 것으로 채워 주세요.**
> 비율은 아래 표대로 만들되, 가운데만 남겨도 그림이 되도록 그려 달라고 적어 주세요.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령 — 조용한 이야기입니다

앞의 책들과 달리 이 이야기는 웃기지 않아요. 과장된 슬랩스틱 대신 **차분하고 따뜻한 그림**으로 가야 합니다. 나그네는 화내거나 억울해하는 표정이 아니라 **끝까지 평온한 얼굴**이어야 해요. 그게 이 이야기의 전부거든요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with clean lines
and soft rich colors, similar to a classic Korean animated storybook. Setting is
a well-to-do Joseon-era house: tiled roof, a wooden veranda, paper-screen doors,
a swept earthen courtyard with a wooden pillar and a low stone wall, persimmon
tree. Daytime warm amber, night deep indigo with a single lantern. Calm and
gentle throughout - this is a quiet story, not a funny one. Never show violence,
striking, or an animal being harmed. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The traveller: a man of about forty in a plain undyed hemp hanbok with a small
cloth bundle and a walking staff, a calm gentle face with steady eyes. His
expression stays serene in every single picture - even tied to the post he looks
untroubled, never angry, never pleading. The master of the house: a
well-dressed man in a fine grey silk overcoat and horsehair hat, round face, warm
and proud at first, then suspicious and red-faced, then deeply ashamed at the end.
The goose: a plump white domestic goose with an orange beak and feet, drawn
innocent and slightly comic, waddling. The pearl: a single luminous white pearl
the size of a large bean.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A plump white goose stands calmly in the centre of
a moonlit Korean courtyard, looking straight out. Beside it, a thick wooden
pillar with a rope coiled around its base. Behind, the dark silhouette of a
tiled-roof house with one warm lit window. A single tiny point of light glimmers
on the ground near the goose's feet. Quiet, still, gently mysterious.
```

## 본문 열 장 (모두 가로 2:1)

### `01-guest.png` — 기와집 문 앞의 나그네

```
Wide scene at the gate of a fine tiled-roof Korean house at dusk. On the left,
the traveller in plain hemp hanbok stands with his staff and small bundle, bowing
slightly with both hands together. On the right, the master of the house holds
the gate open, smiling broadly and gesturing him in. Warm lantern light spilling
out, deep blue evening sky behind.
```

### `02-pearl.png` — 손바닥 위의 진주

```
Wide interior of a warm Korean room. On the right, the master sits cross-legged
holding out one open palm with a single luminous pearl on it, chest puffed with
pride, a silk pouch beside him. On the left, the traveller leans in politely to
look, hands on his knees. At the bottom left edge, a white goose has just waddled
into the open doorway, unnoticed. Amber lamplight.
```

### `03-swallow.png` — 꿀꺽 삼킨 거위

```
Wide interior scene, the key moment. On the right, the master has turned away to
open the silk pouch, his back to the room. In the centre, the pearl bounces on
the wooden floor mid-roll. On the left, the white goose stretches its neck down
and takes it in its beak, eyes wide and innocent. The traveller sits behind,
mouth slightly open, having just seen it. Nobody else has.
```

### `04-accuse.png` — 향하는 눈길

```
Wide interior scene. On the left, the master is on his knees with a quilt thrown
back and a drawer pulled out, papers scattered, searching frantically. On the
right, the traveller sits perfectly still and calm on the floor. Between them,
the master's head has turned and his eyes have locked onto the traveller. Tense,
quiet, no shouting yet.
```

### `05-silent.png` — 아무 말도 하지 않는 나그네

```
Wide interior scene. On the left, the master leans forward with one hand
outstretched demanding, face flushed red, veins on his neck. On the right, the
traveller shakes his head gently, eyes lowered, hands resting on his knees,
utterly composed. The white goose is visible through the open door in the
background, preening quietly. Strong contrast between fury and calm.
```

### `06-tied.png` — 기둥에 묶이다

```
Wide night scene in the courtyard. In the centre, the traveller kneels bound with
rope to a thick wooden pillar, still calm, head slightly bowed. He is looking
toward the right, where a servant is tying the white goose to a stake beside him
with a puzzled expression. On the left, the master watches with folded arms, still
angry. One lantern, deep indigo night.
```

### `07-night.png` — 긴 밤

```
Wide night scene, quiet and still. The traveller sits tied to the pillar on the
left, eyes open, breath faintly visible in the cold. On the right, the white
goose has tucked its head under one wing, asleep on the ground beside him. A
lantern glows low, stars above the tiled roof, a thin crescent moon. Nothing
happens - the stillness is the point.
```

### `08-morning.png` — 똥 속에서 반짝인 것

```
Wide courtyard scene at dawn. On the right, the master crouches low with both
hands on his knees, staring at the ground where a single pearl glints among the
straw. On the left, the goose has stood up and waddles away, entirely unconcerned.
The traveller is still tied to the pillar behind, watching quietly. Pale pink
morning light.
```

### `09-untie.png` — 밧줄을 푸는 주인

```
Wide courtyard scene in morning light. In the centre, the master kneels in front
of the pillar, hands busy loosening the rope from the traveller's arms, his face
crumpled with shame, head bowed low. The traveller looks down at him with a
gentle expression, no anger at all. The pearl sits on a cloth on the ground
beside them. Warm and forgiving.
```

### `10-answer.png` — 고개를 숙인 주인

```
Wide courtyard scene. On the right, the traveller stands rubbing one stiff arm,
speaking quietly, his staff and bundle already picked up. On the left, the master
stands with his head bowed deeply, hat brim hiding his eyes, both hands at his
sides. Between them, the white goose waddles past, oblivious. Soft golden morning
light. Still and moving.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean courtyard in the morning, no people. A white goose waddles across
the swept earth toward a wooden gate standing open onto a country road, a coiled
rope resting at the foot of a pillar, persimmon leaves on the ground. Soft warm
light. Calm and gentle.
```
