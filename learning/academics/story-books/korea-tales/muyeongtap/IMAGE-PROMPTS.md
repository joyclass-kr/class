# 제미나이 그림 프롬프트 — 무영탑

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열네 개의 펼침** + 표지 + 마지막 장 = 그림 **열여섯 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**조용하고 아름다운 이야기**예요. 웃기는 장면이 하나도 없습니다. 화면을 넓게 쓰고, 인물은 작게, 산과 물과 하늘을 크게 그려 주세요.

- **물이 이 책의 주인공입니다.** 8번부터 14번까지 같은 못을 계속 그리게 되는데, 늘 같은 바위·같은 갈대·같은 자리에서 본 모습이어야 합니다. 계절만 바뀌게요.
- **10번이 가장 중요한 그림입니다.** 못에 산도 하늘도 새도 비치는데 **탑만 비치지 않아야** 해요. 물속에 산과 구름은 또렷하게 그리고, 탑이 있어야 할 자리는 그냥 빈 물로 남겨 주세요.
- **석가탑을 정확하게.** 이중 기단 위에 삼층, 지붕돌 끝이 살짝 들린 단정한 화강암 석탑입니다. 화려한 장식이 없어야 해요.
- 슬프게 그리되 무섭게는 그리지 마세요. 아사녀는 야위어 가지만 표정은 늘 담담합니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, painterly cel-animation style with clean
outlines and soft natural colors, in the look of a classic Korean animated film.
Setting is Silla-period Gyeongju: a temple building site on a wooded mountain
with stone terraces and granite blocks, pine forest, and below it a still round
pond called Yeongji with reeds, a big flat rock at its edge and azaleas on the
bank. Muted greens, grey granite, warm ochre earth, silver water. Wide open
compositions with small figures. Quiet and beautiful, never frightening or
comic. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Asadal: a lean stonemason of about forty in a grey-brown Baekje working robe with
the sleeves tied back, a cloth band around his head, strong scarred hands, stone
dust in his hair and beard. He grows visibly older and greyer as the book goes on.
Asanyeo: a woman of about thirty-five in a faded homespun jacket and a long
russet skirt, hair in a low bun, a calm patient face; she grows thinner and her
clothes more worn, but her expression stays steady. The old monk: a small elderly
monk in a grey robe with a kind lined face. The pagoda: a plain granite
three-storey Silla pagoda on a double base, roof stones with slightly upturned
corners, no ornament at all.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A still round pond fills the lower half of the
tall frame, silver and perfectly calm, reeds along the near edge. Reflected in
the water: a wooded mountain, a pale sky and a single flying bird - all sharp and
clear. Rising above the pond in the upper half of the frame, a plain granite
three-storey pagoda stands on the mountain. Where its reflection should be, the
water is simply empty. A small woman sits on a flat rock at the water's edge with
her back to us. Quiet, still, and strange.
```

## 본문  장 (모두 가로 2:1)

### `01-asadal.png` — 돌도 숨을 쉬게 하는 손

```
Wide scene in a Baekje village stoneyard. In the centre, Asadal kneels over a
half-carved granite block with a chisel and mallet, stone dust in the air around
him, his whole attention on the stone. On the right, Asanyeo stands in the
doorway of a modest house holding a water gourd, watching him with quiet pride.
Warm afternoon light, chips of stone on the ground.
```

### `02-farewell.png` — 탑이 다 서면 돌아오리다

```
Wide scene at the edge of a village, a dirt road running away over the fields.
On the right, Asadal walks away with a bundle of tools on his back, turning to
raise one hand. On the left, Asanyeo stands at the village gate with her hand
lifted, small against the wide barley fields. Long low evening light, a long
road. Gentle and sad.
```

### `03-bulguksa.png` — 땅땅, 새벽까지 이어진 소리

```
Wide scene of a temple building site on a wooded mountain. Scaffolding, stone
terraces, workers hauling baskets of earth, half-cut granite blocks everywhere.
In the middle of all the noise, Asadal sits alone on a block with his chisel,
apart from everyone, absorbed. Dust in the shafts of sunlight, pine trees behind.
Busy but lonely.
```

### `04-years.png` — 머리에 흰 것이 섞이다

```
Wide scene at the building site in autumn. In the centre, Asadal works on the
same kind of block, but his hair is now streaked with grey and his face is
thinner and lined. Fallen leaves have drifted against the finished lower base of
the pagoda behind him. Fewer workers than before. Ochre and rust colours, low
slanting light. Time passing.
```

### `05-asanyeo.png` — 저 안에 그이가 있구나

```
Wide landscape scene of a road coming over a hill toward Gyeongju. In the
centre, small in the frame, Asanyeo hurries along the ridge with a bundle on her
back and her worn-out straw sandals, one hand shading her eyes. Ahead and below,
the tiled roofs of a great temple on the mountainside. Wide sky, clear light.
Hope.
```

### `06-refused.png` — 아무도 못 들어갑니다

```
Wide scene at a temple gate. On the right, a gatekeeper stands square in the
gateway with one arm across it, face apologetic but immovable. On the left,
Asanyeo has both hands raised, pleading, her bundle at her feet, road dust to her
knees. Beyond the gate, scaffolding and stone. Grey stone, hard midday light.
```

### `07-monk.png` — 저 못을 영지라 하오

```
Wide scene on the mountain path below the temple. On the right, the old monk
stands beside Asanyeo with one arm extended, pointing down the slope. On the
left and below, a still round pond lies among the trees, silver in the sun. Asanyeo
follows his hand with her eyes. Pine shadows, soft green light. Kind and quiet.
```

### `08-wait.png` — 저건가? 구름이었어요

```
Wide scene at the pond in spring. On the left, Asanyeo sits on the big flat rock
at the water's edge, leaning forward, staring down into the water. In the water,
a single white cloud drifts across the reflected sky. Reeds, azaleas in bloom on
the bank behind. Everything perfectly still. Patient and lonely.
```

### `09-seasons.png` — 피었다 지고, 얼었다 풀리고

```
Wide scene of the same pond from the same viewpoint, but divided across the
frame into four seasons left to right: pink azaleas, green summer reeds, yellow
autumn grass, and a frozen white edge with snow on the rock. In each part, the
same small figure sits on the same rock. The rock and the reeds stay in the same
place throughout. Beautiful and aching.
```

### `10-nothing.png` — 탑만은 비치지 않았어요

```
Wide scene at the pond. In the upper half, the mountain with the nearly finished
granite pagoda standing clear against the sky. In the lower half, the pond
reflecting that same mountain, the clouds, and a flying bird - all sharp and
perfect - except that where the pagoda's reflection should stand there is nothing
at all, only empty silver water. On the rock, Asanyeo leans out over the surface.
The most important picture in the book.
```

### `11-done.png` — 달빛 아래 우뚝 선 탑

```
Wide night scene on the mountain. In the centre, the finished granite pagoda
stands complete under a full moon, plain and perfect, three storeys on a double
base. At its foot, tiny by comparison, Asadal stands with his mallet hanging from
one hand, head tipped back, looking up. Blue moonlight, deep shadow, silence.
Awe.
```

### `12-run.png` — 연장도 팽개치고

```
Wide scene of a mountain path at dawn in heavy mist. In the centre, Asadal runs
downhill through the pines, robe flying, one hand out for balance, his mallet
dropped and left behind on the path above. Thick white mist between the trunks,
first grey light. Motion and urgency in a still world.
```

### `13-meet.png` — 무릎에는 진달래 한 줌

```
Wide scene at the pond at sunrise. In the centre, Asanyeo is curled asleep
against the flat rock with a small bunch of azaleas in her lap. Asadal has just
dropped to his knees beside her and reaches out to touch her shoulder, his face
breaking. Mist lying low on the water, first gold light on the reeds. Tender and
overwhelming.
```

### `14-tower.png` — 못에 나란히 비친 두 얼굴

```
Wide scene at the pond, seen looking down into the water. The still surface
reflects the sky, the mountain, and side by side near the centre, the faces of the
two of them leaning over the water together, both smiling faintly. Where the
pagoda should be reflected, the water is still empty. Reeds and azaleas at the
edges, warm morning gold. Quiet, complete, and lovely.
```

### `end.png` — 마지막 (가로 2:1)

```
The still round pond at evening with no one there. A big flat rock at the water's
edge with a small bunch of azaleas laid on it, reeds standing motionless, and the
surface reflecting the mountain and the last light of the sky. Where a pagoda
should be reflected, the water is empty. Calm and beautiful.
```
