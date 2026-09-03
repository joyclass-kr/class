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
bold clean outlines, saturated storybook colors, warm countryside light, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), European country roads, orchards and market towns,
expressive comic faces, wide panoramic composition, funny and never cruel.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The traveller: a cheerful young man with a walking staff, a wide hat and a
patched pack. The greedy innkeeper: a plump red-faced man in an apron with small
darting eyes. The innkeeper's wife: a sharp-eyed woman in a headscarf. A friendly
old woman: a small bent woman in a shawl who knows about the trees.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a leafy country lane with two fruit trees on either side, one bearing red fruit and one bearing yellow, a traveller's pack lying beneath and a donkey's shadow stretching across the path, whimsical and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 두 그루의 나무

| 파일명 | 장면 |
|---|---|
| `images/01-trees.webp` | A dusty country lane climbing a sunny hill between two heavily laden fruit trees, one red and one yellow, a hungry young traveller with a staff arriving, inviting. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 젊은 나그네가 길을 떠돌고 있었습니다. 지팡이 하나에 등짐 하나가 전부였지요. 이 마을 저 마을을 다니며 일을 도왔습니다. 그날은 아침부터 아무것도 먹지 못했지요. 배에서 자꾸 꼬르륵 소리가 났습니다. 해는 벌써 중천에 떠 있었지요. / 오른쪽: 나그네는 낯선 언덕길에 이르렀습니다. 길 양쪽에 나무가 한 그루씩 서 있었지요. 가지가 휘도록 열매가 달려 있었습니다. 한쪽은 붉은 열매였지요. 다른 쪽은 노란 열매였습니다. 이게 웬 떡이냐!〕 |
| `images/01-trees-2.webp` | A traveller happily eating red fruit under a tree, then clutching his head in comic alarm as his ears stretch long like a donkey's, sunny hillside. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 나그네는 붉은 열매를 하나 땄습니다. 한 입 베어 무니 달콤한 물이 흘렀지요. 어라, 맛이 아주 좋은데? 나그네는 두 개, 세 개를 더 따 먹었습니다. / 오른쪽: 그런데 귀가 자꾸 길어지는 것이었지요. 어어? 이게 무슨 일이야! 나그네는 귀를 붙잡고 잡아당겼습니다. 하지만 귀는 점점 더 길어졌지요.〕 |

## 2장 · 당나귀가 되어

| 파일명 | 장면 |
|---|---|
| `images/02-donkey.webp` | A man mid-transformation into a donkey on a country road, grey fur sprouting and limbs bending, then staring at his reflection in a puddle, comic dismay. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 귀만 길어진 것이 아니었습니다. 손발이 굽어지기 시작했지요. 등에는 잿빛 털이 돋았습니다. 허리가 굽고 얼굴이 길어졌지요. 나그네는 그 자리에 네 발로 서 있었습니다. 어느새 당나귀가 되어 있었던 것이지요. / 오른쪽: 나그네는 소리를 지르려 했습니다. 입을 크게 벌렸지요. 그런데 히히힝 소리만 나왔지요. 아무리 애를 써도 말이 되지 않았습니다. 나그네는 물웅덩이에 제 모습을 비춰 보았지요. 틀림없는 당나귀였습니다.〕 |
| `images/02-donkey-2.webp` | A merchant delightedly slipping a halter onto a bewildered donkey and hitching it to a loaded cart on a country road, the donkey's eyes wide with human dismay, comic. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 짐수레가 언덕을 올라왔습니다. 장사꾼이 몰고 오는 수레였지요. 당나귀를 보더니 눈이 번쩍했지요. 주인 없는 당나귀로군! / 오른쪽: 하지만 네 발이 마음대로 움직이지 않았습니다. 장사꾼이 목에 고삐를 걸었지요. 자, 이제부터 내 것이다. 장사꾼이 고삐를 툭툭 당겨 보았지요. 나그네는 그렇게 짐수레에 매이고 말았습니다. 아무리 울어도 소용없었지요.〕 |

## 3장 · 무거운 짐

| 파일명 | 장면 |
|---|---|
| `images/03-labor.webp` | A weary donkey hauling a heavily loaded cart up a dusty hill under hot sun while a merchant walks alongside with a switch, sympathetic and vivid. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그날부터 나그네는 짐을 날랐습니다. 아침 해가 뜨기 전부터 길을 나섰지요. 수레에는 곡식 자루가 잔뜩 실렸습니다. 오르막길에서는 발이 푹푹 빠졌지요. 등이 아프고 발굽이 갈라졌습니다. 장사꾼은 조금이라도 느리면 회초리를 들었지요. / 오른쪽: 이놈, 어서 걷지 못해! 회초리가 등을 후려쳤습니다. 나그네는 그저 참을 수밖에 없었습니다. 사람일 때는 몰랐는데.〕 |
| `images/03-labor-2.webp` | A donkey lying on straw in a stable yard at night looking up at stars through a gap in the door, a memory of two fruit trees glowing faintly above, wistful. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 밤이 되면 마구간에 매였습니다. 마른 짚 위에 몸을 눕혔지요. 나그네는 문틈으로 별을 올려다보았습니다. 집이 그립고 사람 말이 그리웠지요. 그러다 문득 그 언덕이 떠올랐습니다. 나무가 두 그루 있었지요. / 오른쪽: 붉은 열매를 먹고 이렇게 되었습니다. 그럼 노란 열매를 먹으면 어떻게 될까? 나그네는 그 생각을 놓지 않았지요. 언젠가 그 언덕으로 돌아가야겠다고 마음먹었습니다.〕 |

## 4장 · 다시 그 언덕으로

| 파일명 | 장면 |
|---|---|
| `images/04-escape.webp` | A donkey suddenly recognising two familiar fruit trees on a hillside and yanking its halter free as the merchant tumbles backwards, comic action. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그렇게 몇 달이 지났습니다. 어느 날 장사꾼이 새 길로 들어섰지요. 수레가 덜컹덜컹 언덕을 올랐습니다. 나그네는 문득 걸음을 늦췄지요. 길 양쪽 풍경이 눈에 익었거든요. / 오른쪽: 붉은 열매와 노란 열매가 그대로였지요. 나그네는 가슴이 쿵쿵 뛰었습니다. 이때다! 나그네는 고삐를 힘껏 잡아당겼지요.〕 |
| `images/04-escape-2.webp` | A donkey shaking a yellow-fruited tree and eating, then transforming back into a delighted young man mid-stride as the merchant gapes, comic and joyful. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이놈, 어디 가느냐! 당나귀는 언덕으로 내달렸습니다. 노란 열매가 달린 나무 아래로 갔지요. 가지를 흔들어 열매를 떨어뜨렸습니다. 그러고는 우적우적 먹었지요. 그 순간 몸이 이상해졌습니다. / 오른쪽: 털이 스르르 사라졌지요. 귀가 줄어들고 허리가 펴졌습니다. 나그네는 다시 사람이 되었지요. 장사꾼은 뒷걸음질을 쳤습니다. 다, 당나귀가 사람이 되다니! 장사꾼은 그길로 달아났지요.〕 |

## 5장 · 욕심 많은 주막 주인

| 파일명 | 장면 |
|---|---|
| `images/05-innkeeper.webp` | A tavern where a traveller tells his tale to laughing patrons while a plump innkeeper leans across the table with greedy gleaming eyes, warm lamplight. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 나그네는 그길로 마을로 내려왔습니다. 오랜만에 사람 말로 인사를 나누었지요. 주막에 들러 밥을 시켰습니다. 사람들이 둘러앉아 이야기를 청했지요. 나그네는 그동안의 일을 다 털어놓았습니다. 붉은 열매를 먹으면 당나귀가 됩니다. / 오른쪽: 노란 열매를 먹으면 사람으로 돌아오지요. 사람들이 신기해하며 웃었습니다. 그런 나무가 다 있소?〕 |
| `images/05-innkeeper-2.webp` | A plump innkeeper sneaking out at night with a lantern to a hillside and stuffing red fruit into his mouth beneath a tree, comic greed, moonlight. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 주인은 그날 밤 잠을 이루지 못했습니다. 자꾸 셈을 해 보았지요. 그 열매만 있으면 말이야. 손님들을 당나귀로 만들어 팔 수 있겠구나. / 오른쪽: 등불을 들고 언덕으로 달려갔지요. 두 나무가 어둠 속에 서 있었습니다. 어느 쪽이 그 열매랬더라? 붉은 쪽이던가.〕 |

## 6장 · 히히힝

| 파일명 | 장면 |
|---|---|
| `images/06-transform.webp` | A tavern bedroom at dawn where a large donkey stands where the innkeeper should be, his wife shrieking and patrons peering round the door, very comic. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아침이었습니다. 주막 안이 발칵 뒤집혔지요. 주인이 자던 방에 주인이 없었습니다. 대신 커다란 당나귀가 서 있었지요. 아내가 소리를 질렀습니다. 여보! 여보, 어디 있어요? / 오른쪽: 히히힝! 아내는 놀라 뒤로 물러섰지요. 이게 무슨 일이야!〕 |
| `images/06-transform-2.webp` | A wife shooing a donkey out of a tavern with a broom while it circles the yard helplessly, big tears rolling down its face, comic and touching. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 당나귀는 아내에게 다가갔습니다. 내가 당신 남편이오! 하지만 소리는 히히힝뿐이었지요. 아내는 빗자루를 들었습니다. / 오른쪽: 그러고는 빙빙 돌 뿐이었지요. 아무도 알아보지 못했습니다. 주인은 그제야 후회가 밀려왔지요. 내가 왜 그런 욕심을 부렸을까.〕 |

## 7장 · 나그네가 돌아오다

| 파일명 | 장면 |
|---|---|
| `images/07-return.webp` | Villagers gossiping in a lane, and a traveller crouching before a tethered donkey in a tavern yard as it nods desperately, comic and sympathetic. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 소문은 금세 마을에 퍼졌습니다. 주막 주인이 사라졌대. 난데없이 당나귀가 나타났다지 뭐야. / 오른쪽: 마당에 당나귀 한 마리가 매여 있었습니다. 나그네는 그 앞에 쭈그리고 앉았지요. 이런, 붉은 열매를 드셨군요. 당나귀가 고개를 크게 끄덕였습니다. 눈이 애원하는 듯했지요. 나그네는 그 마음을 잘 알았습니다.〕 |
| `images/07-return-2.webp` | A traveller holding out a yellow fruit to a donkey that transforms back into a shaken innkeeper sitting on the ground as his wife rushes to embrace him, warm. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 나그네는 품에서 무언가를 꺼냈습니다. 노란 열매 한 알이었지요. 혹시 몰라 챙겨 두었던 것이었습니다. 자, 이걸 드십시오. 당나귀가 허겁지겁 받아먹었지요. 그 순간 털이 사라지기 시작했습니다. 귀가 줄어들고 허리가 펴졌지요. / 오른쪽: 주인은 다시 사람이 되었습니다. 그러고는 그 자리에 털썩 주저앉았지요. 아내가 달려와 남편을 끌어안았습니다. 여보! 어디 갔던 거예요! 주인은 고개를 푹 숙였지요. 내가 잠깐 정신이 나갔었소.〕 |

## 8장 · 두 나무 아래에서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A tavern yard where a shamed innkeeper bows to a smiling traveller while neighbours gather round and laugh kindly, warm afternoon light. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 주인은 한참을 고개를 들지 못했습니다. 내가…… 내가 무슨 욕심을 부린 거지. 손님을 당나귀로 만들려 하다니. / 오른쪽: 주인은 나그네에게 고개를 숙였지요. 고맙소. 정말 고맙소. 나그네는 빙그레 웃었습니다.〕 |
| `images/08-ending-2.webp` | A cheerful tavern feast, and next morning a traveller picking a few yellow fruits at the hillside trees before walking on down the road, warm and hopeful. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 주막에는 잔치가 벌어졌습니다. 주인이 손수 상을 차렸지요. 나그네도 마음껏 먹었습니다. 오랜만에 배부른 저녁이었지요. 주인은 자꾸만 그릇을 더 내왔습니다. 이튿날 아침 나그네는 다시 길을 나섰습니다. 가는 길에 그 언덕을 지났지요. / 오른쪽: 두 나무는 그대로 서 있었습니다. 나그네는 노란 열매를 몇 알 챙겼지요. 누가 또 실수를 할지 모르니까. 그러고는 언덕을 내려갔습니다. 주막 주인은 그 뒤로 욕심을 부리지 않았답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
