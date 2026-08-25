# 제미나이 그림 프롬프트 — 좁쌀 한 톨

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
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령 — 점점 커지는 것이 보여야 합니다

이야기의 재미는 좁쌀 한 톨이 쥐, 고양이, 개, 말, 황소로 점점 커지는 데 있어요. **소년은 모든 그림에서 같은 크기로, 얻은 것만 눈에 띄게 커지도록** 그려 달라고 요청하세요. 소년을 화면의 같은 쪽(왼쪽)에 두면 크기 차이가 더 잘 보인답니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean countryside of the Joseon era: dirt roads between
rice paddies, thatched-roof farmhouses with earthen walls, straw-roofed stables
and cattle sheds, pine hills, wooden gates. Warm daylight palette of straw
yellow, clay brown and grass green. Big expressive faces, gentle warm humour.
Nothing frightening, no animals harmed. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The boy: a cheerful boy of about twelve in a patched pale hanbok with a small
cloth bundle on his back and straw sandals, round friendly face, always polite,
hands together when he speaks to grown-ups. Draw him exactly the same size in
every picture. The hosts: different farmers and villagers each time - one old
man, one plump woman, one thin man with a pipe, one grandmother, one bearded
farmer - all embarrassed and apologetic, scratching their heads or bowing
slightly. The animals in order: a small grey mouse, a striped cat, a shaggy white
Korean dog, a brown horse, and finally a huge yellow-brown ox.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. In the foreground at the bottom, a boy's open palm
holds a single tiny grain of millet, drawn very close up. Rising behind and above
it, growing larger toward the top of the frame, the faint stacked silhouettes of
a mouse, a cat, a dog, a horse and finally a huge ox filling the sky. Warm golden
light. The idea of one small thing becoming enormous.
```

## 본문 열 장 (모두 가로 2:1)

### `01-depart.png` — 좁쌀 한 톨을 품에 넣고

```
Wide country road scene at morning. On the left, the boy stands on a dirt path
between green rice paddies, carefully folding a small square of paper around
something tiny, holding it close to his chest, a determined little smile. His
cloth bundle on his back is almost empty and flat. The road stretches away to the
right toward distant pine hills.
```

### `02-first.png` — 첫 번째 집

```
Wide scene at the gate of a thatched farmhouse at dusk. On the left, the boy
stands with both hands together, holding out a tiny paper packet toward the host.
On the right, an old man in work hanbok takes it between two fingers, squinting at
how small it is, one eyebrow raised in amusement. Warm lamplight from the door,
purple evening sky.
```

### `03-mouse.png` — 좁쌀을 먹어 버린 쥐

```
Wide interior scene of a simple Korean room in the morning. On the right, an
empty wooden shelf with a torn scrap of paper and a few crumbs, and the old man
standing before it with his face gone red, one hand rubbing the back of his neck.
On the left, the boy holds a small grey mouse by the tail, looking at it with
polite surprise. Comic and warm.
```

### `04-cat.png` — 쥐를 물어 간 고양이

```
Wide scene in a farmyard in the morning. On the right, a plump woman in a blue
and white hanbok gestures apologetically at a striped cat sitting smugly on a
wall, licking one paw. On the left, the boy stands holding an empty little cage of
woven straw, blinking. The cat is clearly bigger than the mouse was. Sunny.
```

### `05-dog.png` — 고양이를 쫓아낸 개

```
Wide scene at a farmhouse gate. On the right, a shaggy white Korean dog stands
proudly with his chest out, tail wagging, while a thin man with a long pipe
scratches his head and points over the wall where a cat's tail is just
disappearing. On the left, the boy looks up at the dog, which comes up to his
waist. Bright morning light.
```

### `06-horse.png` — 말의 뒷발질

```
Wide scene beside a straw-roofed stable at dawn. On the right, a brown horse
stands calmly with one hind hoof still raised, an innocent expression. Beside him
a grandmother in grey hanbok presses both hands to her cheeks in dismay, looking
at a broken tether. On the left, the boy stands with his mouth open, the horse
towering over him. Cool early light.
```

### `07-ox.png` — 뿔을 휘두른 황소

```
Wide scene at a cattle shed in the morning. On the right, an enormous
yellow-brown ox fills much of the frame, head lowered, one great horn tipped as
if he has just swung it, chewing placidly. Beside him a bearded farmer bows
slightly with both hands together, apologising. On the left, the boy looks up and
up at the ox, tiny in comparison. Strong size contrast.
```

### `08-road.png` — 황소를 끌고 가는 소년

```
Wide country road scene at midday. In the centre-left, the boy walks along the
dirt road holding a rope halter, and behind him plods the huge ox, taking up most
of the frame. On the right, two villagers by the roadside stop and stare, one
pointing, both open-mouthed. Rice paddies and pine hills behind, bright blue sky.
```

### `09-home.png` — 눈이 휘둥그레진 어머니

```
Wide scene in a small farmyard. On the right, the boy's mother has just come out
of a modest thatched house, both hands raised to her face, eyes and mouth wide
open in disbelief. On the left, the boy waves cheerfully with one hand, the other
holding the ox's rope, the huge animal standing patiently beside him. Warm
afternoon light.
```

### `10-millet.png` — 좁쌀을 쌌던 종이

```
Wide scene in the farmyard. In the centre, the boy holds open a small square of
worn paper on his flat palm, showing it to his mother, who leans in to look. The
paper is empty except for a faint crease. On the right, the ox lifts his head and
bellows, mouth open. Soft golden late-afternoon light, warm and satisfying.
```

### `end.png` — 마지막 (가로 2:1)

```
A quiet Korean farmyard at sunset, no people. A huge ox rests in the shade beside
a thatched house, and on a low stone by the gate lies a small folded square of
paper, weighted down with a pebble. Warm orange light, long shadows. Peaceful.
```
