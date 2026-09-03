# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
16개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
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
bold clean outlines, saturated storybook colors, cold blue northern light with
warm golden accents, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), Russian wheat fields,
birch woods, snowy steppe and an onion-domed palace, expressive comic faces,
wide panoramic composition, magical and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Ivan: a cheerful scruffy youngest brother in a patched peasant coat and bast
shoes. The humpbacked pony: a small shaggy horse with two humps, huge floppy ears
and clever bright eyes. The tsar: a fat old man in a fur hat and gold robe, greedy
and impatient. The firebird: a bird of pure flame with sweeping golden feathers.
The two elder brothers: lazy, loud and always eating.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small shaggy pony with two humps and enormous ears standing beside a young peasant boy in a snowy Russian field at night, a glowing feather in the boy's hand casting golden light, onion-domed towers far behind, magical and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 밀밭을 지키는 밤

| 파일명 | 장면 |
|---|---|
| `images/01-field.webp` | A Russian farm at dawn where a father shows his three sons a trampled wheat field, the two elder ones yawning and the youngest scruffy and alert, warm light. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 러시아의 어느 마을에 농부가 살았습니다. 아들이 셋 있었지요. 큰아들과 둘째는 게으르고 시끄러웠습니다. 막내 이반은 늘 헝클어진 머리로 다녔지요. 집에는 밀밭이 하나 있었습니다. 온 식구가 그 밀로 먹고살았지요. / 오른쪽: 그런데 걱정거리가 생겼습니다. 밤마다 누가 밀밭을 짓밟고 가는 것이었지요. 아침이면 밀이 자빠져 있었습니다. 아버지가 아들들을 불렀지요. 오늘 밤은 네가 나가 지켜라.〕 |
| `images/01-field-2.webp` | A moonlit Russian wheat field where a scruffy young peasant sits wide awake among the stalks as a white-maned mare comes trotting through the grain, silver light. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 큰아들은 헛간에서 코를 골다 돌아왔습니다. 아무것도 없었습니다. 둘째도 마찬가지였지요. 밀밭은 또 짓밟혀 있었습니다. 이제 막내 이반의 차례가 되었지요. / 오른쪽: 눈을 부릅뜨고 사방을 살폈습니다. 한밤중이 되었을 때였지요. 갈기가 눈처럼 흰 암말이 나타났습니다. 달빛에 온몸이 반짝였지요. 이반은 숨을 죽였습니다. 암말이 밀 이삭을 짓밟았지요.〕 |

## 2장 · 조랑말을 얻다

| 파일명 | 장면 |
|---|---|
| `images/02-pony.webp` | A moonlit field where a boy clings to the mane of a rearing white mare that gallops in circles, dust and grain flying, thrilling and comic. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이반은 살금살금 다가갔습니다. 그러고는 갈기를 덥석 붙잡았지요. 암말이 놀라 뛰어올랐습니다. 이반은 그대로 매달렸지요. 암말은 벌판을 몇 바퀴나 내달렸습니다. 그래도 이반은 놓지 않았지요. / 오른쪽: 이윽고 암말이 헐떡이며 멈춰 섰습니다. 놓아 다오! 대신 좋은 것을 주마.〕 |
| `images/02-pony-2.webp` | A dawn field where a white mare presents two magnificent golden-maned stallions and one tiny shaggy two-humped pony with huge floppy ears, comic contrast. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 새벽 암말이 다시 왔습니다. 뒤에 훌륭한 말 두 마리를 데려왔지요. 갈기가 금빛으로 빛나는 말이었습니다. 이반은 입이 벌어졌지요. 그런데 그 뒤에 한 마리가 더 있었습니다. 아주 작고 못생긴 조랑말이었지요. / 오른쪽: 등에 혹이 둘이나 있었습니다. 귀는 축 늘어져 땅에 닿을 지경이었지요. 이건 뭡니까? 이 아이가 네 진짜 친구가 될 것이다.〕 |

## 3장 · 궁궐로 가다

| 파일명 | 장면 |
|---|---|
| `images/03-palace.webp` | Two brothers leading golden-maned horses away at night, and a boy racing after them on a tiny humpbacked pony that flies over the steppe, exhilarating. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 두 형은 그 말들을 보고 눈이 뒤집혔습니다. 어느 날 밤 몰래 말을 끌고 나갔지요. 도시에 내다 팔 셈이었습니다. 이반은 새벽에 그것을 알았지요. / 오른쪽: 내 등에 올라타. 이반은 반신반의하며 올라탔지요. 그런데 조랑말은 바람처럼 달렸습니다. 작은데도 어찌나 빠른지 몰랐지요.〕 |
| `images/03-palace-2.webp` | A bustling Russian market square before an onion-domed palace where a fat tsar in a fur hat marvels at two splendid horses that only a scruffy boy can calm, lively. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 세 형제는 함께 도시로 갔습니다. 양파 모양 지붕이 즐비한 도시였지요. 시장에 말을 세우자 사람들이 몰려들었습니다. 마침 임금님이 지나가던 참이었지요. 임금님은 눈이 휘둥그레졌습니다. 이런 말은 처음 보는구나! / 오른쪽: 임금님은 그 자리에서 말을 사들였지요. 그런데 말들이 아무도 따르지 않았습니다. 이반이 다가가자 그제야 얌전해졌지요. 너도 궁궐로 들어오너라. 임금님이 손짓했지요.〕 |

## 4장 · 불새의 깃털

| 파일명 | 장면 |
|---|---|
| `images/04-feather.webp` | A dark birch forest path lit by a single blazing golden feather lying on the moss, a boy reaching for it while a small pony shakes its head in warning, dramatic. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이반은 조랑말과 함께 궁궐에서 지냈습니다. 말들을 돌보는 일은 어렵지 않았지요. 어느 날 밤이었습니다. 이반은 조랑말을 타고 숲길을 지나고 있었지요. 그런데 앞쪽이 환했습니다. 땅에 무언가가 떨어져 빛나고 있었지요. / 오른쪽: 금빛으로 활활 타는 깃털이었습니다. 불새의 깃털이었지요. 이반이 손을 뻗으려 했습니다. 그때 조랑말이 고개를 저었지요. 주우면 걱정거리가 생길 텐데.〕 |
| `images/04-feather-2.webp` | A servant's room glowing bright from a single golden feather while other servants peer in astonished, then a tsar summoning the boy, warm and tense. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이렇게 예쁜 걸 어떻게 두고 가. 이반은 깃털을 품에 넣었습니다. 조랑말은 한숨을 쉬었지요. 나중에 나를 원망하지나 마. / 오른쪽: 다른 하인들이 그것을 보았습니다. 소문은 금세 퍼졌지요. 아니나 다를까 임금님 귀에도 들어갔습니다. 임금님이 이반을 불렀지요. 그 깃털을 어디서 얻었느냐? 눈빛이 예사롭지 않았지요.〕 |

## 5장 · 불새를 잡아라

| 파일명 | 장면 |
|---|---|
| `images/05-firebird.webp` | A tsar in a fur hat pointing sternly at a dismayed boy holding a glowing feather, then the boy slumped in a stable while a small pony pricks up its ears, comic. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 숲에서 주웠습니다. 임금님은 수염을 쓰다듬었습니다. 깃털이 있으면 새도 잡아 오너라. / 오른쪽: 그런데 조랑말이 귀를 쫑긋 세웠지요. 그러게 내가 뭐랬어. 그래도 걱정 마.〕 |
| `images/05-firebird-2.webp` | A mountain clearing at midnight where blazing firebirds descend onto scattered grain and wine, one boy leaping from behind a tree to seize a bird, showers of sparks. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 두 사람은 밤에 높은 산으로 갔습니다. 꼭대기에 넓은 빈터가 있었지요. 이반은 밀을 사방에 뿌렸습니다. 포도주도 골고루 부었지요. 그러고는 나무 뒤에 숨었습니다. 한밤중이 되자 하늘이 붉어졌지요. / 오른쪽: 불새들이 줄지어 내려앉았습니다. 날개에서 불꽃이 튀었지요. 새들은 밀을 쪼아 먹었습니다. 이윽고 포도주에 취해 비틀거렸지요. 이반은 그중 한 마리를 덥석 붙잡았습니다.〕 |

## 6장 · 이번엔 공주님

| 파일명 | 장면 |
|---|---|
| `images/06-princess.webp` | A tsar clapping over a caged firebird then giving a new order, and a boy on a tiny pony bounding over mountains and seas, exhilarating. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 불새를 보고 손뼉을 쳤습니다. 하지만 욕심은 끝이 없었지요. 며칠 뒤 다시 이반을 불렀습니다. 바닷가 끝에 달의 공주가 산다더구나. / 오른쪽: 조랑말이 앞발로 땅을 툭툭 쳤습니다. 천막과 좋은 음식을 챙겨. 두 사람은 다시 길을 나섰지요. 조랑말은 산도 바다도 성큼성큼 건넜습니다.〕 |
| `images/06-princess-2.webp` | A silver tent on a moonlit seashore where a woman in pale robes sings, a boy bowing awkwardly with his cap in hand and a small pony waiting on the sand, lovely. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이반은 모래밭에 천막을 쳤습니다. 안에 좋은 음식을 차려 놓았지요. 그러고는 멀찍이 숨었습니다. 달이 뜨자 은빛 옷을 입은 아가씨가 왔지요. 달의 공주였습니다. / 오른쪽: 한참 만에 겨우 정신을 차렸습니다. 이반은 모자를 벗고 앞으로 나갔지요. 임금님이 뵙기를 청하십니다. 공주는 빙그레 웃으며 따라나섰습니다. 궁금한 것이 있었거든요.〕 |

## 7장 · 세 개의 가마솥

| 파일명 | 장면 |
|---|---|
| `images/07-cauldrons.webp` | A palace hall where a moon princess coolly refuses an eager old tsar and proposes three cauldrons, courtiers murmuring, ornate and comic. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 공주가 궁궐에 도착했습니다. 임금님이 버선발로 뛰어나왔지요. 나와 혼인해 주시오. 공주는 임금님을 보고 고개를 저었지요. / 오른쪽: 그럼 나더러 어쩌라는 말이오? 가마솥을 셋 걸어 주세요. 끓는 물과 찬물에 차례로 들어가시면요.〕 |
| `images/07-cauldrons-2.webp` | A palace courtyard with three great steaming cauldrons, a boy poised to leap while a small pony blows frosty breath across the water, courtiers gasping. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마당에 커다란 가마솥 셋이 걸렸습니다. 하나는 펄펄 끓고 하나는 얼음처럼 찼지요. 임금님은 슬쩍 이반을 돌아보았습니다. 네가 먼저 들어가 보아라. 이반은 다리가 후들거렸지요. / 오른쪽: 내가 물을 식혀 줄 테니 걱정 마. 눈 딱 감고 들어가. 이반은 숨을 크게 들이쉬었습니다. 그러고는 눈을 감고 가마솥으로 뛰어들었지요.〕 |

## 8장 · 다시 나온 이반

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A palace courtyard where a transformed handsome young man rises from a cauldron to gasps and cheers while an eager tsar flings off his robe, joyous and comic. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 사람들이 숨을 죽였습니다. 잠시 뒤 물속에서 무언가가 올라왔지요. 이반이었습니다. 그런데 몰라보게 달라져 있었지요. 훤칠하고 잘생긴 젊은이가 되어 있었습니다. 사람들이 눈을 비볐지요. 저게 그 마구간지기가 맞나? / 오른쪽: 임금님도 눈이 뒤집혔지요. 나도 어서 들어가야겠다! 임금님은 옷을 벗어 던지고 냅다 뛰어들었습니다.〕 |
| `images/08-ending-2.webp` | A tsar leaping out of a scalding cauldron flinging off his crown while everyone laughs, the princess joining the young man and the little pony standing proudly, joyous. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그런데 이번에는 달랐습니다. 조랑말이 물을 식혀 주지 않았거든요. 임금님은 발을 담그자마자 소리를 질렀지요. 뜨거워! 뜨겁다니까! 허둥지둥 밖으로 뛰쳐나왔습니다. 왕관이 데굴데굴 굴러갔지요. / 오른쪽: 에잇, 나는 그냥 늙은 채로 살겠다! 사람들이 배를 잡고 웃었습니다. 공주는 이반의 곁으로 다가갔지요. 두 사람은 나란히 섰습니다. 그 곁에는 곱사등이 조랑말이 서 있었지요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
