# 제미나이 그림 프롬프트 — 진주를 삼킨 거위

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> **4 : 3**으로 받아서 위아래를 조금 잘라 씁니다(각 5.5퍼센트). 이 책의 마지막
> 그림이니 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 화면에서 칸을 직접 재서 적은 값입니다

**제미나이는 16:9(1376×768)보다 옆으로 넓은 그림을 못 만듭니다.** 그런데 본문
그림칸은 그보다 넓은 **2.15 : 1**이라, 아무리 시켜도 칸에 딱 맞는 그림은 받을 수
없습니다. 16:9로 받아 위아래를 잘라 쓰는 수밖에 없습니다. 그러니 **잘려 나갈
자리를 미리 비워 두고 그리게 하는 것**이 요령입니다.

| 그림 | 칸 비율 | 시킬 비율 | 잘려 나가는 곳 |
|---|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

```
python _tools/imgratio.py 책이름
```

지난번에 이 책들은 2:1로 시켰는데 전부 16:9로 받았고, 그걸 아무도 몰랐습니다.

> **이미 그려 둔 그림은 그대로 씁니다. 다시 그리지 마세요.**
> 본문 그림은 이미 16:9라 비율로는 새 기준과 같습니다. 달라지는 것은 구도뿐이라,
> 새로 그리는 그림에만 아래 규칙을 적용하면 됩니다. 다만 `end.webp`는 지난번에
> 16:9로 받아 좌우가 8퍼센트씩 잘리고 있습니다. 그 그림을 언젠가 다시 그릴 일이
> 생기면 그때 4 : 3으로 받으세요.

### 그래서 프롬프트에 이렇게 적어 주세요

- **중요한 것은 한가운데 84퍼센트 안에.** 위 8퍼센트와 아래 8퍼센트는 화면에서 잘립니다.
- **머리 위와 발밑에 여유를 둘 것.** 머리가 그림 위쪽에 붙으면 정수리가 날아갑니다.
- **인물을 가운데에 몰지 말고 좌우로 나눌 것.** 칸이 옆으로 아주 넓습니다.

영어 프롬프트 끝에 이 문장을 덧붙이면 잘 듣습니다.

```
16:9 wide composition. Keep every important element inside the central 84% of
the frame height; the top 8% and bottom 8% will be cropped away. Leave headroom
above heads and space below feet. Spread the figures to the left and right
rather than clustering them in the middle.
```

`end.webp`**만은 4 : 3으로** 시키세요. 칸이 1.5 : 1이라 4 : 3으로 받으면 위아래가
5.5퍼센트씩만 잘리는데, 16:9로 받으면 좌우가 8퍼센트씩 잘려 그림 양옆이 날아갑니다.

세로 화면(태블릿을 세워 볼 때)에서는 `end.webp` 칸이 **4.4 : 1**짜리 가느다란
띠가 됩니다. 그때는 그림 높이의 칠십 퍼센트가 잘리니, 중요한 것은 반드시
그림 한가운데 높이에 두세요.


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
Make every picture EXCITING to look at, like a frame from 1980s-90s Korean TV
animation. Never a flat mid-distance shot with everyone standing in a row.
CAMERA: use a strong angle every time - look up steeply at whoever is powerful,
look down steeply on whoever is small, push right in close on a face at the
moment it changes. Let things break out of the frame: a hand, a tail, a swinging
club, a gourd bigger than the panel. Use deep foreshortening - the fist or the
foot nearest the viewer is huge.
BODIES: cartoon proportions, not realistic ones. Big heads on children, squash
and stretch, whole bodies leaning into what they are doing, fingers splayed,
feet off the ground.
MOTION: speed lines, dust clouds at the feet, impact stars, flying sweat drops,
objects tumbling through the air, hair and clothes streaming.
LIGHT: strong and graphic - hard shadows, warm light from one side, a bright rim
where the light hits, deep saturated darks at night.
```

## 인물 설명 (일관성을 위해 매번 붙이세요 — 등장인물 3명 명확히 구분)

```
1. 손님 / 나그네 (The Traveller):
   30~40대, 온화하고 차분한 얼굴, 단정한 턱수염, 흰색/미색 삼베옷과 머리띠, 봇짐과 지팡이.
   어떤 상황에서도(묶여 있을 때도) 결코 화내거나 억울해하지 않고 깊고 평온한 눈빛을 유지합니다.

2. 집주인 (The Master):
   60대 양반 어르신, 백발 상투와 흰 수염(콧수염+턱수염), 고급 회색 비단 도포 차림.
   1장~5장에서 진주를 보여주고 의심하다가, 6장에서 하인에게 묶으라 명하고, 8장(진주 발견)·9장(눈물 흘리며 밧줄 풂)·10장(사과하며 고개 숙임)에 모두 등장하는 핵심 인물입니다.

3. 하인 (The Servant):
   20~30대 젊은 남성, 검은 머리 상투, 수염 없음, 거친 갈색/베옷 차림.
   오직 6장(나그네를 기둥에 묶고 거위를 말뚝에 매는 장면)에만 등장하며 8, 9, 10장에는 나오지 않습니다.

4. 거위 (The Goose): 통통하고 순진한 흰 거위, 주황색 부리와 발.
5. 진주 (The Pearl): 은은하게 빛나는 콩알만 한 흰색 진주.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A plump white goose stands calmly in the centre of
a moonlit Korean courtyard, looking straight out. Beside it, a thick wooden
pillar with a rope coiled around its base. Behind, the dark silhouette of a
tiled-roof house with one warm lit window. A single tiny point of light glimmers
on the ground near the goose's feet. Quiet, still, gently mysterious.
```

## 본문 열 장 (모두 가로 16:9)

### `01-guest.webp` — 기와집 문 앞의 나그네

```
Wide scene at the gate of a fine tiled-roof Korean house at dusk. On the left,
the traveller in plain hemp hanbok stands with his staff and small bundle, bowing
slightly with both hands together. On the right, the old master of the house (elderly man, white hair and beard, grey silk robe) holds
the gate open, smiling broadly and gesturing him in. Warm lantern light spilling
out, deep blue evening sky behind.
```

### `02-pearl.webp` — 손바닥 위의 진주

```
Wide interior of a warm Korean room. On the right, the old master (white hair and beard, grey robe) sits cross-legged
holding out one open palm with a single luminous pearl on it, chest puffed with
pride, a silk pouch beside him. On the left, the traveller leans in politely to
look, hands on his knees. At the bottom left edge, a white goose has just waddled
into the open doorway, unnoticed. Amber lamplight.
```

### `03-swallow.webp` — 꿀꺽 삼킨 거위

```
Wide interior scene, the key moment. On the right, the old master (white hair and beard, grey robe) has turned away to
open the silk pouch, his back to the room. In the centre, the pearl bounces on
the wooden floor mid-roll. On the left, the white goose stretches its neck down
and takes it in its beak, eyes wide and innocent. The traveller sits behind,
mouth slightly open, having just seen it. Nobody else has.
```

### `04-accuse.webp` — 향하는 눈길

```
Wide interior scene. On the left, the old master (white hair and beard, grey robe) is on his knees with a quilt thrown
back and a drawer pulled out, papers scattered, searching frantically. On the
right, the traveller sits perfectly still and calm on the floor. Between them,
the master's head has turned and his eyes have locked onto the traveller. Tense,
quiet, no shouting yet.
```

### `05-silent.webp` — 아무 말도 하지 않는 나그네

```
Wide interior scene. On the left, the old master (white hair and beard, grey robe) leans forward with one hand
outstretched demanding, face flushed red, furious. On the right, the
traveller shakes his head gently, eyes lowered, hands resting on his knees,
utterly composed. The white goose is visible through the open door in the
background, preening quietly. Strong contrast between fury and calm.
```

### `06-tied.webp` — 기둥에 묶이다

```
Wide night scene in the courtyard. In the centre, the traveller kneels bound with
rope to a thick wooden pillar, still calm, head slightly bowed. On the right, a
young servant with black hair and brown clothes ties the white goose to a small stake beside him
with a puzzled expression. On the left, the old master (white hair and beard, grey robe) watches with folded arms, still
angry. One lantern, deep indigo night.
```

### `07-night.webp` — 긴 밤

```
Wide night scene, quiet and still. The traveller sits tied to the pillar on the
left, eyes open, breath faintly visible in the cold. On the right, the white
goose has tucked its head under one wing, asleep on the ground beside him. A
lantern glows low, stars above the tiled roof, a thin crescent moon. Nothing
happens - the stillness is the point.
```

### `08-morning.webp` — 똥 속에서 반짝인 것

```
Wide courtyard scene at dawn. On the right, the old master (elderly gentleman, white hair in topknot, long white beard, grey silk hanbok) crouches low with both
hands on his knees, staring in shock and realization at the ground where a single pearl glints among the
goose droppings. On the left, the goose has stood up and waddles away cheerfully.
The traveller is still tied to the pillar behind, watching quietly. Pale pink
morning light.
```

### `09-untie.webp` — 밧줄을 푸는 주인

```
Wide courtyard scene in morning light. In the centre, the old master (elderly gentleman, white hair in topknot, long white beard, grey silk hanbok) kneels in front
of the pillar, hands busy loosening the rope from the traveller's arms, his face
crumpled with shame and tears, head bowed low. The traveller looks down at him with a
gentle expression, no anger at all. The pearl sits on a red cloth on the ground
beside them. Warm and forgiving.
```

### `10-answer.webp` — 고개를 숙인 주인

```
Wide courtyard scene. On the right, the traveller stands rubbing one stiff arm,
speaking quietly, his staff and bundle already picked up. On the left, the old master
(elderly gentleman, white hair and beard, grey silk hanbok) stands with his head bowed deeply in sincere apology, both hands at his
sides. Between them, the white goose waddles past, oblivious. Soft golden morning
light. Still and moving.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean courtyard in the morning, no people. A white goose waddles across
the swept earth toward a wooden gate standing open onto a country road, a coiled
rope resting at the foot of a pillar, persimmon leaves on the ground. Soft warm
light. Calm and gentle.
```
