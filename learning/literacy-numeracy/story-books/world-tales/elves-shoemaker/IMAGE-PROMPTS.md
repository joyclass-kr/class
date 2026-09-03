# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
14개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **한 파일 = 한 장면입니다. 앞질러 가지 마세요.**
> 파일마다 뒤에 〔이 쪽에 실린 글〕을 붙여 두었습니다. 그 쪽에 실제로 실리는 글이에요.
> 그림은 **그 글에 나오는 장면만** 그려 주세요. 다음 쪽 이야기를 미리 그리면
> 그림이 글보다 한 칸씩 밀려서 책 전체가 어긋납니다. 실제로 그런 일이 있었어요.
> 장면이 둘 적혀 있으면 둘을 **한 그림 안에** 담아 주세요. 하나만 골라 그리면 안 됩니다.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm candlelight and cosy
workshop browns, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a small European cobbler's
shop with a bench, lasts and hanging boots, a snug back room, and a snowy street
outside, expressive comic faces, wide panoramic composition, warm and never
frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The cobbler: a thin kindly old man with spectacles pushed up on his forehead
and worn hands. His wife: a small round woman with a needle always in her collar.
The two elves: tiny bare-limbed figures the size of a hand, cheerful and quick,
dressed first in rags and later in bright little coats and pointed caps.
Customers: a fine lady, a merchant and a farmer, all delighted.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a cobbler's workbench at night lit by one candle where two tiny figures in ragged clothes stitch a pair of fine shoes far too big for them, tools and leather scraps around, warm and enchanting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 마지막 가죽 한 장

| 파일명 | 장면 |
|---|---|
| `images/01-leather.webp` | A cosy but shabby cobbler's shop in winter where a thin old man in spectacles holds up a single last piece of leather, empty shelves behind him, his wife watching quietly, warm lamplight. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 골목 끝 구둣방에서는 밤늦도록 망치 소리가 났습니다. 늙은 구두장이가 가죽을 두드리는 소리였지요. 그 집 신발은 발이 편하기로 온 마을이 알아주었습니다. 그런데 살림은 자꾸 기울었지요. 값을 너무 헐하게 받았거든요. 딱한 사람에게 어떻게 제값을 받겠소. / 오른쪽: 그러다 어느 겨울날이었습니다. 창고를 아무리 뒤져도 텅 비어 있었지요. 가죽이라고는 딱 한 장 남아 있었습니다. 신발 한 켤레 지을 분량이었지요. 이걸로 마지막이구려.〕 |
| `images/01-leather-2.webp` | A cobbler carefully cutting leather pieces by candlelight late at night and laying them out on his bench, then blowing out the candle as his wife touches his shoulder, tender. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 구두장이는 남은 가죽을 작업대에 폈습니다. 자로 재고 금을 그었지요. 가위로 조심조심 오려 나갔습니다. 한 조각도 버리지 않았지요. 그러는 사이 밤이 깊어 눈이 침침해졌습니다. 촛불 심지가 자꾸 타들어 가 불빛이 흔들렸지요. 구두장이는 눈을 몇 번이나 비볐습니다. / 오른쪽: 내일 아침에 꿰매야겠소. 구두장이는 오려 둔 조각을 작업대에 가지런히 올려 두었지요. 그러고는 촛불을 후 껐습니다. 잘될 거예요.〕 |

## 2장 · 저절로 만들어진 신발

| 파일명 | 장면 |
|---|---|
| `images/02-shoes.webp` | A morning workshop where an old cobbler picks up a perfectly finished pair of shoes from his bench in astonishment, his wife hurrying in, sunlight through the window, wondrous. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아침이었습니다. 구두장이가 눈을 비비며 작업대로 갔지요. 그런데 오려 둔 조각이 하나도 없었습니다. 대신 신발 한 켤레가 놓여 있었지요. 이미 다 만들어져 있는 것이었습니다. 가죽 냄새가 아직 남아 있는 새 신발이었지요. 구두장이는 제 눈을 믿을 수가 없었습니다. / 오른쪽: 구두장이는 그것을 집어 들고 창가로 갔지요. 바느질이 어찌나 고운지 한 땀도 어긋나지 않았습니다. 실 끝을 감춘 자리조차 찾을 수 없었지요. 이런 솜씨는 난생처음 보네. 여보, 이리 좀 와 보시오!〕 |
| `images/02-shoes-2.webp` | A shop where a well-dressed customer pays double for a fine pair of shoes, and that evening the cobbler laying out leather for two pairs on his bench, snow falling outside, hopeful. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 아침 손님이 하나 찾아왔습니다. 신발을 보더니 눈이 커졌지요. 이건 값을 더 드려야겠소. 손님은 값을 두 배로 치르고 갔습니다. 구두장이는 어리둥절한 채로 그 돈을 세어 봤지요. / 오른쪽: 이걸로 가죽을 사 옵시다. 이번에는 두 켤레 지을 분량을 사 왔습니다. 저녁에 마름질을 해서 작업대에 올려 두었지요. 설마 또 그럴까.〕 |

## 3장 · 밤마다 늘어나는 신발

| 파일명 | 장면 |
|---|---|
| `images/03-more.webp` | A shop bench holding two, then four, then eight pairs of fine shoes on successive mornings, and a queue of customers forming outside the door, lively and prosperous. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 아침이 되자 두 사람은 서둘러 작업대로 갔습니다. 이번에도 신발이 놓여 있었지요. 두 켤레가 나란히, 전보다 더 곱게요. 세상에. 아내는 신발을 한참이나 들여다봤습니다. / 오른쪽: 이튿날은 네 켤레, 그다음 날은 여덟 켤레가 되었습니다. 아침마다 작업대 위에는 새 신발이 줄지어 놓여 있었지요. 구둣방 소문이 온 고을에 퍼졌지요. 먼 마을에서도 사람들이 찾아왔습니다. 그 집 신발은 하루 종일 걸어도 발이 안 아프대.〕 |
| `images/03-more-2.webp` | A now-prosperous workshop with full shelves and a warm back room where an old couple sit talking over supper, glancing toward the darkened shop, cosy and curious. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 살림은 금세 폈습니다. 따뜻한 이불도 사고 아내는 새 앞치마도 얻었지요. 두 사람은 오랜만에 잘 먹고 푹 잤습니다. 이제 밤늦도록 일하지 않아도 되었지요. 그런데 궁금한 것이 하나 있었습니다. / 오른쪽: 구두장이가 밥숟가락을 놓고 중얼거렸지요. 고맙다는 말은 해야 하지 않겠소? 아내가 고개를 끄덕였지요.〕 |

## 4장 · 몰래 지켜본 밤

| 파일명 | 장면 |
|---|---|
| `images/04-watching.webp` | A dark workshop where an old couple peek from behind a wardrobe as two tiny nearly naked figures slip in under the door at midnight, moonlight on the bench, magical and tender. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 밤 두 사람은 촛불을 끄고 옷장 뒤에 숨었습니다. 커튼 사이로 작업대가 빤히 보였지요. 아내는 숨소리가 날까 봐 손으로 입을 가렸습니다. 방 안이 어찌나 조용한지 시계 소리만 째깍째깍 들렸지요. 숨을 죽이고 기다리는데 시계가 열두 번 뎅뎅 울렸습니다. / 오른쪽: 바로 그때 문틈이 흔들렸지요. 손바닥만 한 것 둘이 쏙 들어왔습니다. 둘은 사뿐사뿐 걸어 작업대 다리를 타고 올라갔지요. 실오라기 같은 옷을 걸쳤는데, 아니 거의 벗은 몸이었지요. 한겨울인데도 말입니다. 발도 맨발이었습니다. 아내가 저도 모르게 입을 막았지요.〕 |
| `images/04-watching-2.webp` | Two tiny figures working at lightning speed on a cobbler's bench, hammering and stitching and humming, and at dawn setting the finished shoes in a neat row before vanishing, delightful. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 둘은 작업대로 폴짝 올라가 연장을 손에 잡았습니다. 어찌나 빠른지 눈으로 따라가기가 어려웠지요. 가죽 조각이 손안에서 저절로 신발이 되어 가는 것 같았습니다. 톡톡, 톡톡. / 오른쪽: 망치질 소리가 나고 실이 슥슥 지나갔습니다. 흥얼흥얼 노래까지 불렀지요. 창밖이 희끄무레해질 무렵 신발이 모두 완성되었습니다. 둘은 그것을 가지런히 놓고는 문틈으로 쏙 사라졌지요. 구두장이는 한참 동안 그 자리에 서 있었습니다. 가슴이 뜨거워졌지요.〕 |

## 5장 · 작은 옷을 만들다

| 파일명 | 장면 |
|---|---|
| `images/05-clothes.webp` | A workshop where an old woman cuts red and green cloth into doll-sized coats and caps while her husband stitches minuscule shoes, tiny buttons like grains, warm and loving. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 여보, 봤소? 그 옷차림을. 한겨울에 저러고 있으니 어쩐대요. 아내가 눈시울을 붉혔습니다. / 오른쪽: 구두장이가 무릎을 탁 쳤지요. 두 사람은 그날부터 아주 바빴습니다. 아내가 천을 고르는데 눈이 반짝였지요. 빨강과 초록으로 아주 작은 웃옷을 지었습니다. 바지도 만들고 모자도 만들었지요. 단추는 좁쌀만 했습니다.〕 |
| `images/05-clothes-2.webp` | A cobbler stitching thumbnail-sized shoes with his best leather, and the couple laying out two complete tiny outfits on the empty bench on Christmas Eve before hiding, expectant and warm. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 구두장이도 가만있지 않았지요. 창고에서 가장 좋은 가죽을 꺼내 왔습니다. 엄지손톱만 한 구두를 지었지요. 바느질을 몇 번이나 뜯고 다시 했습니다. 이만하면 부끄럽지 않겠소. / 오른쪽: 그날은 크리스마스이브였습니다. 두 사람은 작업대를 깨끗이 치웠지요. 가죽 대신 옷과 구두를 나란히 올려놓았습니다. 놀라지나 않을까요? 좋아할 거요.〕 |

## 6장 · 옷을 입고 춤을 추며

| 파일명 | 장면 |
|---|---|
| `images/06-dance.webp` | A midnight workbench where two tiny figures find bright little clothes instead of leather, hold them up in wonder and quickly dress, grinning at each other, joyful and enchanting. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 자정이 되자 작은 것 둘이 들어왔습니다. 늘 하던 대로 작업대에 폴짝 올랐지요. 그런데 가죽이 없었습니다. 대신 조그만 옷이 나란히 놓여 있었지요. 둘은 잠시 멈칫하고 서로를 쳐다봤습니다. 처음에는 손도 대지 못하고 빙 둘러보기만 했지요. / 오른쪽: 하나가 웃옷을 조심스레 집어 들었지요. 몸에 대 보니 꼭 맞았습니다. 우리 거야! 둘은 폴짝폴짝 뛰며 좋아했습니다. 둘은 서둘러 옷을 입었지요. 바지도, 모자도, 구두도요.〕 |
| `images/06-dance-2.webp` | Two tiny figures in bright coats and caps dancing and singing on a workbench, then leaping over the threshold into a snowy yard leaving small footprints that the snow soon covers, bittersweet. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 둘은 작업대 위에서 팔짝팔짝 뛰었습니다. 손을 잡고 빙글빙글 춤을 췄지요. 노래도 큰 소리로 불렀습니다. 작업대가 들썩일 만큼 신이 났지요. 이제 우리는 멋쟁이! / 오른쪽: 둘은 문 쪽으로 우르르 뛰어갔지요. 문지방을 폴짝 넘어 눈 덮인 마당으로 나갔습니다. 하얀 눈 위에 작은 발자국이 조르르 남았지요. 구두장이 부부는 창에 얼굴을 대고 그 발자국을 오래 보았습니다. 이내 그것도 새로 내린 눈에 덮였습니다. 둘은 그 뒤로 다시 오지 않았지요.〕 |

## 7장 · 남은 것

| 파일명 | 장면 |
|---|---|
| `images/07-after.webp` | An empty workbench in morning light where an old couple sit down together to cut leather themselves again, hands slower but steady, quiet and warm. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 아침이 되었습니다. 작업대는 텅 비어 있었지요. 아내가 조금 서운한 얼굴을 했습니다. 작업대에는 실밥 하나 남아 있지 않았지요. 우리가 잘못한 걸까요? / 오른쪽: 할 일을 다 했으니 간 거요. 구두장이는 소매를 걷어 올렸지요. 우리도 이제 할 수 있잖소.〕 |
| `images/07-after-2.webp` | A busy cobbler's shop with customers and shelves of fine shoes, and each winter a tiny coat left on the windowsill in the snow, untouched but placed again year after year, tender. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그날부터 구둣방이 다시 돌아갔습니다. 이번에는 두 사람이 만든 신발이었지요. 손님들은 여전히 문을 밀고 들어왔습니다. 망치 소리가 골목 끝까지 다시 울려 퍼졌지요. 역시 이 집이 최고야. / 오른쪽: 대신 딱한 사람이 오면 여전히 헐하게 내주었습니다. 겨울이 올 때마다 아내는 아주 작은 옷을 지었지요. 그러고는 창가에 가만히 올려 두었습니다. 아침이면 옷은 늘 그대로 있었지요. 그래도 아내는 해마다 지었습니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
