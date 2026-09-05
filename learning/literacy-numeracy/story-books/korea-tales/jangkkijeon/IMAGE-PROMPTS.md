# 제미나이 그림 프롬프트 — 장끼전

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


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
| 본문 그림 12장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
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

**장끼와 까투리를 한눈에 구별되게 그려 주세요.** 장끼(수꿩)는 붉은 뺨과 초록빛 목, 길고 화려한 꽁지. 까투리(암꿩)는 온몸이 갈색 얼룩에 꽁지가 짧습니다. 새끼 스물한 마리는 노랗고 동글동글하게, 늘 어머니 곁에 뭉쳐 있게 그립니다. **콩 한 알은 새빨갛게, 하얀 눈 위에 딱 하나만.** 그 콩이 이 책의 주인공이니 1·2·5·7·11·12장에서 같은 콩으로 보여야 합니다. 덫은 쇠로 된 옛날 짐승 덫(반원 두 개가 맞물리는 것)으로, 무섭지 않게 눈 속에 반쯤 묻힌 모습으로만 보여 주세요. 새들이 청혼하는 9장은 익살스럽게, 2장 덫 장면과 6장 이별 장면은 조용하고 담담하게 — 잔인하게 그리지 않습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Korean folk-tale picture book illustration, warm hand-painted storybook style
with soft watercolour textures and clean ink outlines, gentle winter light,
a snowy Korean mountain valley with bare oaks, pine trees and dry reed grass,
expressive animal characters with readable faces, cosy and a little funny,
never gory or frightening. Absolutely no text, no letters, no speech bubbles,
no sound effects, no signage anywhere in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Janggi, the cock pheasant: proud and puffed-up, bright red cheeks, glossy
green-black neck with a white ring, copper-brown body, a very long barred
tail feather he carries high; vain, cheerful, stubborn. Kkaturi, the hen
pheasant: mottled warm brown all over, short tail, calm watchful eyes, an
apron-like darker patch on her chest; steady and clever. Their twenty-one
chicks: small round yellow-brown fluffballs that huddle together, always
near their mother. The red bean: a single fat scarlet bean, the only bright
red thing in the snow. The crow: glossy black, sly, half-covering its face
with a wing. The owl: round, wide-eyed, pompous. The wild duck: green-headed,
plump, chatty. The stranger cock pheasant (chapter 3): like Janggi but
slimmer, quieter, head slightly lowered, polite.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A wide snowy valley seen from above the reeds.
Near the bottom, a proud cock pheasant strides forward with his long tail
raised, while a brown hen pheasant beside him reaches out a wing to hold him
back, twenty-one fluffy chicks bunched behind her. In front of them, alone on
the white snow, one fat scarlet bean. Pale winter sky, bare trees, soft light.
The red bean is the brightest spot in the picture.
```

## 본문 열두 장 (모두 가로 16:9)

### `01-family.webp` — 눈 덮인 산골의 꿩 가족

```
Wide view of a snow-covered Korean mountain hollow under dry reed grass. On the
left, a proud cock pheasant with a long tail stands tall; on the right, a brown
hen pheasant sits low with twenty-one round yellow-brown chicks huddled against
her, several with beaks open as if begging. Snow on every branch, no food
anywhere, thin morning light. Cold but tender.
```

### `02-bean.webp` — 눈 위의 붉은 콩 한 알

```
A wide empty snowfield. In the centre, one fat scarlet bean lies on the white
snow, the only colour in the picture. From the left, the cock pheasant rushes
toward it with wings half spread and eyes shining; from the right, the hen
pheasant has stopped dead, one foot raised, looking not at the bean but at
faint footprints pressed into the snow beside it. Chicks peek from the reeds.
```

### `03-dream.webp` — 까투리의 꿈

```
Wide scene split in two. On the right, the hen pheasant speaks earnestly with
her wing to her chest, chicks gathered close around her. On the left, drawn as
a soft misty dream-cloud, the cock pheasant appears with a black gentleman's
hat (gat) placed on his head, then again floating helplessly on grey water.
The dream part is pale and watery; the real part is crisp. Worried mood.
```

### `04-scold.webp` — 아녀자가 무얼 안다고

```
The cock pheasant on the left has flung his wing outward and puffed up his
chest, beak open in a loud scolding, tail feathers bristling. The hen pheasant
on the right shrinks back, wings drooping, hurt. Between them the chicks have
frozen mid-step, one covering its eyes with a wing. The red bean waits on the
snow at the far left edge. Snow dust flies from the cock's stamping foot.
```

### `05-trap.webp` — 콩을 쪼는 순간

```
Very still, wide snowfield. In the centre-left, the cock pheasant leans forward
and touches the scarlet bean with the tip of his beak. Under the snow around
the bean, just barely visible, the two dark half-circles of an old iron animal
trap. On the right, the hen pheasant has both eyes squeezed shut and the chicks
bury their faces in her feathers. Held breath. Nothing has snapped yet.
```

### `06-lastwords.webp` — 마지막 말

```
Quiet, close and low. The cock pheasant lies on his side in the snow, the iron
trap closed on his neck but shown small and mostly buried, no blood. The hen
pheasant crouches nose to nose with him, wing over his body; the chicks press
in behind her. His long tail feather lies across the white snow. Soft grey
evening light, gentle and sad, not frightening.
```

### `07-burial.webp` — 양지바른 언덕에

```
A small sunlit hillside above the snowfield. A low mound of fresh snow with
one scarlet bean placed on top of it. The hen pheasant stands beside the
mound with her head bowed; twenty-one chicks stand in a ragged line behind
her, some still scraping snow with their feet. Long shadows, the sun low and
orange behind bare trees. Dignified and calm.
```

### `08-crow.webp` — 제일 먼저 온 까마귀

```
Next morning, the same hillside. A glossy black crow stands very close to the
hen pheasant, one wing dramatically covering its face as if weeping, but one
eye clearly peeking sideways at her. The hen pheasant looks straight ahead,
unmoved. Farther back, an owl and a green-headed wild duck are landing. The
chicks watch the crow suspiciously. Comic.
```

### `09-suitors.webp` — 저마다 제 자랑

```
Three suitors line up on the left, each posing: the crow spreading its black
wings like a fine coat, the owl with its chest out and huge round eyes, the
wild duck gesturing back toward a pond. On the right, the hen pheasant sits
calmly with her chicks, unimpressed, and the chicks copy her expression.
Snow on the ground, a frozen pond in the far background. Funny and warm.
```

### `10-alone.webp` — 조용해진 산

```
Night on the hillside. The hen pheasant sits awake beside the snow mound
with its red bean, looking up at the moon; the chicks sleep in a warm pile
under her wings. Deep blue snow, a few stars, bare branches. Very quiet,
thoughtful, a little lonely, but not bleak.
```

### `11-spring.webp` — 봄에 온 낯선 장끼

```
Early spring: snow patches melting, green shoots, a stream running. In a
patch of young grass lies a single red bean. A slimmer, quieter cock pheasant
stands beside it with his head politely lowered, turned toward the hen
pheasant as if asking permission. The hen pheasant, mid-laugh, wing to her
beak. The chicks, bigger now, gather around curiously. Light and hopeful.
```

### `12-choice.webp` — 나란히

```
Wide spring valley in full green. A long line of twenty-one half-grown
pheasant chicks walks ahead along a path; behind them the hen pheasant and
the new cock pheasant walk side by side, exactly level, neither in front.
On a sunny hill in the background, a small grassy mound with a tiny green
sprout on top. Blossoms on the trees. Peaceful.
```

### `end.webp` — 마지막 (가로 4:3)

```
A close, quiet picture. On a grassy spring hill, a small mound with a single
young bean sprout growing from its top, two little leaves open. Nobody there.
Morning light, dew on the grass, a long pheasant tail feather lying in the
grass nearby. Calm, with a small hope in it.
```
