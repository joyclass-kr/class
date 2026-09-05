# 제미나이 그림 프롬프트 — 조신의 꿈

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
| 본문 그림 10장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

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


## 이 책만의 요령

**꿈속 장면(3~5장)은 가장자리를 안개처럼 부옇게, 현실 장면(1·2·6~10장)은 또렷하게.** 그 차이가 이야기입니다. 조신은 1·2장에서 젊은 스님(머리를 민 이십 대), 3~5장 꿈속에서는 머리를 기른 농부로 조금씩 늙어 가고, 6장부터는 다시 젊은 얼굴인데 **머리만 하얗게** 셉니다. 이 대비가 6장의 전부입니다. 촛불 하나가 2장에서 켜지고 6장에서 아직 타고 있어야 합니다 — 같은 촛대, 거의 같은 길이. 4장의 슬픈 장면은 조용하고 담담하게, 피나 상처는 그리지 않습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, an ancient Silla
setting: a temple on a sea cliff, pine hills, small farms and dirt roads,
simple hemp clothing, muted earthy colours with one warm candle-light accent,
quiet and reflective, never frightening. Absolutely no text, no letters, no
speech bubbles, no sound effects, no signage anywhere in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Josin: a young Buddhist monk in his twenties with a shaved head and a plain
grey robe, thin earnest face. In the dream he has grown-out hair tied back
and wears a farmer's brown hemp clothes, aging picture by picture. After
waking he is young-faced again but his short hair is pure white. The woman:
the governor's daughter, in a fine pale-green silk dress in the early
pictures; in the dream she wears plain worn hemp and ages with him. Their
five children: small, in patched clothes. The Buddha statue in the temple
hall: a seated gilt figure with a calm face, one tall candle burning before
it. The stone Buddha from the earth: a small rough grey standing figure the
size of a child.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A temple hall at night: a young monk kneels
with his forehead on the floor before a calm gilt Buddha, one tall candle
burning beside him. Above his bowed back, filling the upper half of the
frame like smoke from the candle, a soft misty dream-scene: a little
thatched house, a woman, five small children, a long road. Warm candle
glow below, cool mist above.
```

## 본문 열 장 (모두 가로 16:9)

### `01-monk.webp` — 태수의 딸을 보다

```
A village road below green hills. On the left, a young shaved-headed monk in
grey stands frozen with a bundle in his arms. On the right, a procession
passes: a fine palanquin with its curtain half open, and inside a young
woman in pale green silk looking calmly ahead. Petals in the air, soft
spring light. The monk's face is stricken.
```

### `02-news.webp` — 법당에서 잠들다

```
Inside a temple hall on a sea cliff at night, the sea faint through the open
door on the right. The young monk has collapsed asleep on the floor before
the gilt Buddha, one arm outstretched, tears still on his face. A single tall
candle burns beside him, barely shortened. On the left, faintly, in the
doorway, the silhouette of a woman in green just arriving. Hushed.
```

### `03-life.webp` — 꿈속의 집

```
Dream scene, edges softly misted. A small thatched cottage by a rice field.
On the left, the man (now with tied-back hair, brown hemp) drives a plough
behind an ox. On the right, the woman sits at the doorway sewing, and five
children of different sizes tumble in the yard with a puppy. Golden
afternoon, poor but happy.
```

### `04-loss.webp` — 해현 고개

```
Dream scene, misted edges, winter. A bare mountain pass, snow on the ground.
On the left, the man kneels beside a small fresh mound of earth, his hands
resting on it, head bowed. On the right, the woman sits on a rock with her
face hidden in her sleeve, the four remaining children huddled against her.
Grey sky, one bare tree. Very quiet, no blood, no coffin.
```

### `05-part.webp` — 갈림길

```
Dream scene, misted edges. A fork in a dirt road at dawn. On the right, the
woman, now grey-haired and thin, walks away down one road with two children;
she does not look back. On the left, the man, also aged, stands at the fork
with two children clutching his legs, one hand half raised. Long low light,
mist between the two roads.
```

### `06-wake.webp` — 눈을 뜨다

```
Sharp and clear, no mist. The temple hall at night exactly as in picture 2:
the gilt Buddha, the same candle still burning at nearly the same height.
The monk sits up on the floor, young-faced, staring at his own smooth hands
— but his short hair is now completely white. The doorway on the right is
empty. Candle-light and shadow. The white hair is the whole picture.
```

### `07-dig.webp` — 흙 속의 부처님

```
The same mountain pass as picture 4, but real and in spring, clear light.
The white-haired young monk kneels in freshly dug red earth with muddy hands,
and lifts out a small rough grey stone Buddha the size of a child. His face
is stunned and gentle. Green shoots around, a bird on the bare tree.
```

### `08-after.webp` — 남은 삶

```
A modest temple courtyard in warm light. The white-haired monk in grey sweeps
the yard with a twig broom, smiling faintly. On the right, two village women
and a child watch him from the gate, whispering, curious about his hair. A
bowl of rice on the step beside him. Peaceful, ordinary, content.
```

### `09-dream.webp` — 이어진 이야기

```
Split picture. On the left, the white-haired monk of Silla sits under a pine
telling the story to a circle of children. On the right, many centuries
later, a Joseon scholar in a black horsehair hat sits at a low desk by
lamplight with brush and paper — writing a book, but no visible letters on
the page, only a soft dream-cloud rising from the paper with tiny figures
inside. Time flows left to right.
```

### `10-naksan.webp` — 낙산사

```
Present-day feeling but timeless: a temple hall on a high sea cliff, pines,
the East Sea vast and blue below, white waves on the rocks. On the wooden
steps of the hall, a few visitors bow with their hands together; a child
looks out at the sea instead. Bright clean air, gulls. Serene.
```

### `end.webp` — 마지막 (가로 4:3)

```
Very still. Close on a single tall candle on a temple floor, burned down only
a little, its flame steady, a thin curl of smoke rising into darkness. Beside
it, a folded grey monk's robe. Nobody there. Warm and quiet.
```
