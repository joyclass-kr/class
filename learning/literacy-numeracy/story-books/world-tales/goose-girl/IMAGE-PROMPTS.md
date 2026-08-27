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
bold clean outlines, saturated storybook colors, soft northern European light, no
text or letters in the image, castle halls, country roads, a stream, a goose
meadow and a stone town gate, expressive faces, wide panoramic composition,
gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The princess: a fair-haired girl, first in a rich blue travelling gown, later in
a plain grey dress with a kerchief. The maid: a dark-haired young woman with a
bold jaw who takes the princess's fine clothes. Falada: a white horse with a
gentle face. Conrad: a freckled goose-boy with a straw hat. The old king: a
kindly bearded man with sharp eyes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a fair-haired girl in a plain grey dress sitting on a grassy hillside with a flock of white geese around her, a distant castle on the horizon and a horse's head carved above a stone gateway below, wistful and beautiful. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 먼 길을 떠나며

| 파일명 | 장면 |
|---|---|
| `images/01-departure.webp` | A castle courtyard before dawn where a queen packs a daughter's travelling chests and a white horse is led out, morning mist, lanterns, tender and solemn. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 공주는 아버지를 일찍 여의고 어머니와 단둘이 지냈습니다. 성이 크고 조용해서 두 사람은 늘 붙어 다녔지요. 어디를 가든 함께였습니다. 공주가 열일곱이 되던 해였지요. 아주 먼 나라에서 혼담이 왔습니다. 산을 셋이나 넘어야 닿는 곳이라고 했지요. / 오른쪽: 어머니는 며칠 밤을 뜬눈으로 새웠습니다. 좋은 옷과 은그릇을 궤짝에 넣었다 뺐다 했지요. 떠나기 전날에는 마구간으로 갔습니다. 하얀 말 팔라다를 손수 끌어냈습니다. 이 말은 네 말을 알아듣는단다. 힘들면 무엇이든 이야기하렴. 공주가 말갈기를 쓰다듬었습니다.〕 |
| `images/01-departure-2.webp` | A castle gate where a queen presses an embroidered handkerchief into her daughter's hands, and the two riders crossing a hill as the castle disappears behind, long shadows, wistful. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 길 떠나는 아침이었습니다. 어머니가 품에서 흰 손수건을 꺼냈습니다. 밤새 손수 수를 놓은 것이었지요. 이걸 품에 넣고 가거라. 어려운 일이 생기면 꺼내 보렴. 어미가 곁에 있다고 여기면 된단다. 공주는 손수건을 옷 안쪽 깊이 넣었습니다. / 오른쪽: 성문이 열리고 두 사람이 길을 나섰습니다. 따르는 이라고는 하녀 하나뿐이었지요. 먼 길이라 짐도 단출했습니다. 어머니는 문가에 그대로 서 있었습니다. 공주가 몇 번이나 고삐를 늦추고 뒤를 돌아보았지요. 언덕을 넘자 성이 보이지 않았습니다. 이제부터는 낯선 길이었습니다.〕 |

## 2장 · 냇가에서

| 파일명 | 장면 |
|---|---|
| `images/02-stream.webp` | A hot noon road beside a shady stream where a richly dressed girl asks for water and a maid stands with folded arms refusing, the girl then climbing down alone, quietly tense. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 한낮이 되자 해가 몹시 뜨거웠습니다. 그늘 한 점 없는 벌판 길이었지요. 공주는 목이 말라 견딜 수가 없었습니다. 마침 길가 아래로 냇물이 흘렀습니다. 물소리가 시원하게 들려왔지요. 미안하지만 물 좀 떠다 주겠니? / 오른쪽: 하녀는 대답이 없었습니다. 팔짱을 낀 채 고삐만 만지작거렸지요. 목이 마르면 직접 가시지요. 저는 이제 시중들지 않겠습니다. 공주는 잠시 멍하니 서 있었습니다. 무슨 말인지 얼른 알아듣지 못했거든요. 그래도 아무 말 없이 혼자 냇가로 내려갔습니다.〕 |
| `images/02-stream-2.webp` | A stream where a white handkerchief slips from a kneeling girl's bodice and is carried away by the current, her hand reaching too late, a maid watching from the bank with a changing expression. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 공주는 두 손을 모아 물을 떴습니다. 몸을 굽히는 순간이었지요. 품에서 무언가 스르르 미끄러졌습니다. 어머니가 준 흰 손수건이었습니다. 물살에 닿자마자 저만치 떠내려갔지요. / 오른쪽: 공주가 손을 뻗었지만 이미 늦었습니다. 손수건은 물굽이를 돌아 그대로 사라졌지요. 공주는 젖은 손을 든 채 우두커니 섰습니다. 어쩐지 다리에 힘이 쭉 빠졌지요. 마음을 붙들어 주던 것이 함께 떠내려간 것 같았습니다. 언덕 위에서 하녀가 그 모습을 지켜보았습니다. 눈빛이 달라져 있었지요.〕 |

## 3장 · 뒤바뀐 자리

| 파일명 | 장면 |
|---|---|
| `images/03-swap.webp` | A lonely roadside where a maid demands a princess exchange clothes, the road empty in both directions, the princess lowering her head, stark and quietly cruel. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 하녀가 말에서 내려 성큼성큼 다가왔습니다. 여느 때와 걸음걸이부터 달랐지요. 옷을 벗으세요. 제 옷과 바꿔 입자고요. 뭐라고? / 오른쪽: 한참 만에야 겨우 입을 열었지요. 그럴 수 없어. 그럼 여기서 어쩌시려고요? 소리쳐 봐야 들을 사람도 없는데요.〕 |
| `images/03-swap-2.webp` | A dusty road where a maid in a fine blue gown rides a white horse while the true princess walks behind in grey, and a flag-decked castle appearing on the horizon at sunset, poignant. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 하녀는 고운 옷으로 갈아입고 팔라다에 올랐습니다. 공주는 낡은 옷 차림으로 그 뒤를 걸어야 했지요. 한 가지 더 있습니다. 이 일을 누구에게든 말하면 그때는 각오하십시오. 공주는 고개를 끄덕였습니다. 그것 말고는 할 수 있는 것이 없었지요. / 오른쪽: 말발굽 아래에서 먼지가 뿌옇게 일었지요. 공주의 신은 금세 흙투성이가 되었습니다. 해가 기울 무렵 멀리 성이 보였습니다. 깃발이 나부끼고 성문이 활짝 열려 있었지요. 사람들이 길가에 나와 손을 흔들었습니다. 모두 말 탄 사람만 바라보았지요.〕 |

## 4장 · 거위를 치는 아이

| 파일명 | 장면 |
|---|---|
| `images/04-geese.webp` | A castle courtyard where a prince hands down a maid in fine clothes while the true princess stands ignored behind, and an old king gesturing toward the goose yard, telling and sad. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 젊은 왕자가 마중을 나와 하녀에게 손을 내밀었습니다. 공주는 그 뒤에 우두커니 서 있었지요. 아무도 눈길을 주지 않았습니다. 저 아이는 누구요? 길에서 데려온 하인입니다. 할 일이 없으면 무엇이든 시키세요. / 오른쪽: 늙은 임금님이 뜰을 건너오다 걸음을 멈췄습니다. 공주를 한참 바라보더니 고개를 갸웃했지요. 저런 눈매를 한 하인은 처음 보는군. 그럼 거위를 치게 하지. 콘라트를 도우면 되겠구나. 공주는 그길로 헛간 옆 작은 방을 받았습니다.〕 |
| `images/04-geese-2.webp` | A wide green meadow where a freckled boy in a straw hat and a girl in grey drive a flock of white geese, the castle small in the distance, open sky, gentle melancholy. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 콘라트라는 아이가 있었습니다. 얼굴에 주근깨가 가득하고 늘 밀짚모자를 눌러쓰고 다녔지요. 넌 이름이 뭐야? 어디서 왔어? / 오른쪽: 콘라트가 모자챙을 들고 얼굴을 들여다봤지요. 공주는 고개를 돌렸습니다. 아침마다 거위 떼를 몰고 들판까지 나갔다가 해가 지면 돌아왔습니다. 손이 트고 발이 부르텄지요. 밤이면 작은 방에서 어머니 생각을 했지요. 그래도 입술을 꾹 깨물었습니다. 약속을 했으니까요.〕 |

## 5장 · 성문 위의 팔라다

| 파일명 | 장면 |
|---|---|
| `images/05-falada.webp` | A castle stable where a maid in fine clothes speaks urgently to a prince about a white horse, and a girl in grey pressing coins into a gatekeeper's hand at a stone archway, moving. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 새 왕자비가 된 하녀는 마음이 놓이지 않았습니다. 저 하얀 말이 언제 입을 열지 몰랐거든요. 밤마다 그 생각에 잠을 설쳤지요. 어느 날 하녀가 왕자에게 부탁했습니다. 저 말을 멀리 보내 주세요. 저를 태우고 오다 다쳐서 볼 때마다 마음이 아픕니다. / 오른쪽: 그 소식에 공주는 가슴이 철렁했습니다. 이 성에서 자기를 아는 건 팔라다뿐이었으니까요. 공주는 성문지기를 찾아가 품에 지닌 돈을 모두 내밀었습니다. 저 말의 얼굴을 성문 위에 걸어 주세요. 아침마다 지나며 볼 수 있게요. 문지기는 망설이다 고개를 끄덕였습니다.〕 |
| `images/05-falada-2.webp` | A stone town gateway with a carved white horse's head mounted above where a girl in grey pauses each morning as geese stream past her feet, tears on her face, poignant and beautiful. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 뒤로 아침마다 공주는 성문 밑에서 걸음을 멈추었습니다. 거위들이 꽥꽥거리며 발밑으로 지나갔지요. 공주는 고개를 들어 조용히 불렀습니다. 팔라다야, 잘 있었니. 거위들이 잠시 조용해졌지요. 성문 그늘이 서늘했습니다. / 오른쪽: 문 위에서 나직한 목소리가 내려왔습니다. 아가씨, 오늘도 힘내세요. 어머님이 아시면 우실 텐데요. 공주는 고개를 숙이고 다시 걸었습니다. 눈물이 흙바닥에 툭 떨어졌지요. 뒤따르던 콘라트가 그 모습을 다 지켜보았습니다.〕 |

## 6장 · 바람아 불어라

| 파일명 | 장면 |
|---|---|
| `images/06-wind.webp` | A breezy hilltop meadow where a girl combs out long golden hair as a freckled boy reaches toward it, geese scattering, sunlit and lively. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 들판에 이르면 공주는 풀밭에 앉아 머리를 풀어 빗었습니다. 금빛 머리카락이 햇빛을 받아 눈부시게 쏟아졌지요. 콘라트는 그것을 볼 때마다 자꾸 손이 갔습니다. 한 올만 뽑아 볼래! 딱 한 올만! 콘라트가 손을 쑥 내밀었지요. 공주가 얼른 몸을 피했습니다. / 오른쪽: 공주는 얼른 고개를 저었습니다. 머리카락 하나도 함부로 내줄 수 없었지요. 그러고는 눈을 감고 조용히 읊조렸습니다. 바람아 불어라. 저 아이 모자를 멀리 날려라. 그러자 정말로 바람이 일었습니다. 풀밭이 한쪽으로 눕고 거위들이 날개를 퍼덕였지요.〕 |
| `images/06-wind-2.webp` | A boy chasing his straw hat tumbling far over a hillside while the girl calmly finishes braiding her hair, and later the same boy complaining earnestly to an old king, funny and pivotal. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 밀짚모자가 데굴데굴 굴러 언덕을 넘어갔습니다. 콘라트가 헐레벌떡 뒤를 쫓았지요. 겨우 주워 돌아왔을 때는 공주가 이미 머리를 다 땋은 뒤였습니다. 모자에 풀물이 잔뜩 들어 있었지요. 또 이러기야! / 오른쪽: 곧장 임금님을 찾아갔지요. 저 아이랑은 더 못 다니겠어요. 바람을 부린다니까요. 성문 위 말하고 이야기도 해요. 말이 대답까지 한다고요!〕 |

## 7장 · 난로에게 한 이야기

| 파일명 | 장면 |
|---|---|
| `images/07-stove.webp` | A quiet castle room where an old king with sharp kind eyes questions a girl in grey who shakes her head, then gestures toward a great iron stove in the kitchen beyond, warm and clever. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 임금님이 공주를 조용한 방으로 불렀습니다. 문을 닫고 마주 앉았지요. 무슨 사연이 있는 게로구나. 나에게 말해 보아라. 말할 수 없습니다. 약속을 했으니까요. / 오른쪽: 공주는 그 말만 되풀이했습니다. 임금님은 억지로 캐물을 일이 아님을 알았지요. 그러다 문득 부엌 쪽을 가리켰습니다. 커다란 무쇠 난로가 있었습니다.〕 |
| `images/07-stove-2.webp` | A dim castle kitchen where a girl kneels before the open door of a great iron stove speaking into it, firelight on her wet face, an old king listening just outside the doorway, deeply moving. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 공주는 부엌으로 가 난로 문을 열었습니다. 무릎을 꿇고 앉아 한참을 말없이 불빛만 바라보았지요. 그러다 겨우 입을 열었습니다. 불빛이 얼굴 위에서 일렁였지요. 장작이 탁 하고 튀었습니다. / 오른쪽: 한번 터진 말은 멈추지 않았습니다. 냇가에서 손수건을 잃은 일, 벌판에서 옷을 바꿔 입은 일, 성문 위 팔라다 이야기까지 모두 털어놓았지요. 말하는 내내 눈물이 볼을 타고 흘렀습니다. 다 말하고 나자 어깨가 한결 가벼워졌지요. 임금님은 문밖에서 그 이야기를 하나도 빠짐없이 듣고 있었습니다.〕 |

## 8장 · 제자리로

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A grand banquet hall where a girl now in fine clothes is seated at the high table and a maid in silks answers a king's question loudly, courtiers falling silent around her, dramatic. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 성에서 큰 잔치가 열렸습니다. 공주는 고운 옷을 받아 입고 높은 자리에 앉으라는 명을 받았지요. 하녀는 영문을 몰라 자꾸 곁눈질을 했습니다. 저 거위지기가 왜 여기 앉지? 하녀는 잔을 든 손이 자꾸 흔들렸지요. 그래도 애써 턱을 치켜들었습니다. / 오른쪽: 잔치가 무르익을 무렵 임금님이 잔을 내려놓고 넌지시 물었습니다. 여기 재미있는 이야기가 하나 있소. 주인 자리를 가로챈 하인이 있다면 어떤 벌을 받아야 하겠소? 그런 자는 성 밖으로 내쫓아야지요! 두 번 다시 못 오게 해야 합니다.〕 |
| `images/08-ending-2.webp` | A banquet hall where a maid realises her own judgment and pales as the king nods, and a prince crossing to speak with the true princess who smiles for the first time, warm resolution. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 넓은 홀이 조용해졌습니다. 그 말이 옳소. 그대가 정한 대로 하시오. 하녀의 얼굴이 하얗게 질렸습니다. 그제야 무슨 일이 벌어졌는지 알아차린 것입니다. 하녀는 그날로 성을 떠났습니다. / 오른쪽: 어쩐지 낯이 익은 얼굴이라고 내내 생각했다면서요. 성문 밑에서 몇 번이나 마주쳤는데요. 그때 저를 못 알아보셨지요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
