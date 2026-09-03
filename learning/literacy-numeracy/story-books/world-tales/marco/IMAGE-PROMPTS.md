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
bold clean outlines, saturated storybook colors, warm southern light, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), Genoa harbour, ocean crossing, and Argentine city and
countryside settings, expressive faces, wide panoramic composition, warm and
hopeful.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Marco: a determined boy about 13 with dark hair, a worn jacket, short trousers
and a small cloth bundle. His mother: a tired gentle woman with dark hair tied
back. The ship's captain: a bearded man in a peaked cap. Kindly strangers:
various working people in aprons, ponchos and work clothes along the way.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a boy with a small bundle standing at a ship's railing looking out over a vast ocean toward a distant horizon, gulls overhead and a faint coastline ahead, warm hopeful light. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 오지 않는 편지

| 파일명 | 장면 |
|---|---|
| `images/01-letter.webp` | A modest Italian kitchen where a father and son read a letter from far away, an old photograph on the table, warm afternoon light, tender. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이탈리아 제노바에 마르코라는 아이가 살았습니다. 열세 살 난 아이였지요. 집안 형편이 몹시 어려웠습니다. 빚이 자꾸 늘어만 갔지요. 그래서 어머니가 먼 곳으로 떠났습니다. 바다 건너 아르헨티나였지요. / 오른쪽: 거기서 일해 돈을 부치기로 한 것이었습니다. 처음에는 다달이 편지가 왔지요. 모두 잘 지내고 있으니 걱정 말아라. 마르코는 그 편지를 몇 번씩 읽었습니다. 아버지도 그 편지로 힘을 냈지요.〕 |
| `images/01-letter-2.webp` | A worried father sitting with unanswered letters at night while a determined boy stands with his hand on the table, lamplight, moving. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 한 달이 가고 두 달이 갔습니다. 그래도 소식이 없었지요. 아버지는 여러 곳에 편지를 보냈습니다. 아무 데서도 답이 오지 않았지요. 어머니가 일하던 집 주소만 남아 있었습니다. 아버지는 밤마다 한숨을 쉬었지요. 갈 돈도 없고 갈 사람도 없었습니다. / 오른쪽: 그때 마르코가 입을 열었지요. 밥상 앞이 조용해졌습니다. 형이 숟가락을 내려놓았지요. 제가 가서 찾아올게요. 아버지는 깜짝 놀랐습니다. 하지만 마르코는 뜻을 굽히지 않았지요.〕 |

## 2장 · 제노바 항구

| 파일명 | 장면 |
|---|---|
| `images/02-harbor.webp` | A crowded Genoa harbour at departure with a great steamship, smoke rising and families waving handkerchiefs on the quay, golden Mediterranean light. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아버지는 아는 사람에게 부탁을 했습니다. 겨우 뱃삯을 마련했지요. 마르코는 작은 보따리 하나만 챙겼습니다. 옷 몇 벌과 어머니의 사진이 전부였지요. 떠나는 날 아침이 되었습니다. 제노바 항구는 사람들로 가득했지요. 커다란 배가 뱃고동을 울렸습니다. / 오른쪽: 굴뚝에서 검은 연기가 올랐지요. 부우웅— 소리가 배 속까지 울렸습니다.〕 |
| `images/02-harbor-2.webp` | A boy at a ship's railing waving back to his father on a receding quay as the coastline shrinks and open ocean spreads ahead, moving. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아버지가 부두에서 손을 흔들었습니다. 얼굴이 잘 보이지 않았지요. 마르코는 목청껏 소리쳤습니다. 꼭 어머니를 모시고 돌아올게요! 아버지가 고개를 끄덕이는 것 같았지요. 배가 천천히 항구를 빠져나갔습니다. 집들이 점점 작아졌지요. / 오른쪽: 이윽고 육지가 보이지 않게 되었습니다. 눈앞에는 바다뿐이었지요. 한 달이 넘는 긴 항해가 시작되었습니다. 마르코는 난간을 꼭 잡았지요. 무섭기보다 마음이 급했습니다. 품속에서 사진을 꺼내 봤지요. 조금만 기다리세요.〕 |

## 3장 · 바다를 건너

| 파일명 | 장면 |
|---|---|
| `images/03-voyage.webp` | A crowded steamship deck where a boy sleeps among bundles, and at night lies looking up at a brilliant field of stars over a dark ocean, quiet and moving. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 배 안은 발 디딜 틈이 없었습니다. 아래층 짐칸까지 사람이 가득했지요. 마르코는 갑판 구석에 자리를 잡았습니다. 보따리를 베고 잠을 잤지요. 파도가 치면 몸이 이리저리 굴렀습니다. 멀미가 나서 아무것도 먹지 못한 날도 있었지요. / 오른쪽: 배도 자주 고팠습니다. 그래도 마르코는 참았지요. 어머니를 만날 생각뿐이었습니다. 밤이면 하늘을 올려다보았습니다. 별이 어찌나 많은지 몰랐지요. 어머니도 이 별을 보고 계실 거야. 그렇게 생각하면 견딜 만했지요.〕 |
| `images/03-voyage-2.webp` | Emigrant passengers sharing bread with a boy on a ship deck, then the whole deck crowding to the rail as a distant coastline appears, hopeful. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 배에는 이런저런 사람이 많았습니다. 농부도 있고 목수도 있었지요. 다들 일자리를 찾아 떠나는 사람들이었습니다. 마르코의 사정을 듣고 안타까워했지요. 어떤 아주머니는 빵을 나눠 주었습니다. 마르코는 고맙다고 몇 번이나 인사했지요. 착한 아이로구나. 꼭 만나야 할 텐데. / 오른쪽: 그렇게 하루하루가 지났지요. 스물일곱 밤이 지났습니다. 어느 아침 갑판이 술렁였지요. 멀리 육지가 보였던 것입니다. 부에노스아이레스였지요. 마르코는 난간을 붙잡고 눈을 크게 떴습니다.〕 |

## 4장 · 이미 떠난 뒤

| 파일명 | 장면 |
|---|---|
| `images/04-moved.webp` | A boy stepping off a ship into a busy Buenos Aires street of pastel buildings, then knocking at a house door with a paper in his hand, hopeful. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마르코는 배에서 내렸습니다. 낯선 말소리가 사방에서 들렸지요. 거리는 넓고 집들은 알록달록했습니다. 마르코는 주소가 적힌 종이를 꺼냈지요. 사람들에게 물어물어 길을 찾았습니다. 말이 통하지 않아 손짓만 했지요. / 오른쪽: 종이가 땀에 젖어 흐물흐물해졌습니다. 한참 만에 그 집 앞에 닿았지요. 마르코는 숨을 고르고 문을 두드렸습니다. 가슴이 쿵쿵 뛰었지요. 이윽고 문이 열렸습니다.〕 |
| `images/04-moved-2.webp` | A boy standing at a shuttered doorway as a stranger points north down a dusty street, his shoulders sagging then straightening, late afternoon light. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마르코는 어머니의 이름을 댔습니다. 그 사람은 고개를 저었지요. 그 사람들은 벌써 이사 갔단다. 로사리오라는 도시로 갔지. / 오른쪽: 여기서 한참 북쪽이란다. 마르코는 주머니를 뒤졌지요. 가진 돈은 거의 남아 있지 않았습니다. 그래도 마르코는 고개를 들었지요.〕 |

## 5장 · 도와준 사람들

| 파일명 | 장면 |
|---|---|
| `images/05-help.webp` | A wide pampas road under a huge sky where a boy walks and is offered a ride by poncho-wearing travellers, cattle in the distance, warm and generous. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마르코는 로사리오로 향했습니다. 걷다가 얻어 타고 또 걸었지요. 길은 끝없이 이어졌습니다. 들판이 하늘 끝까지 펼쳐졌지요. 풀밭에 소 떼가 어른거렸습니다. 가는 곳마다 낯선 사람들이 도와주었지요. / 오른쪽: 어디까지 가니? 어머니를 찾으러 갑니다. 사람들은 그 말에 걸음을 멈췄습니다.〕 |
| `images/05-help-2.webp` | A boy riding on a loaded ox cart eating shared bread, sleeping in a barn, and walking on with worn shoes across endless plains, warm and moving. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어떤 이는 빵을 쥐여 주었습니다. 어떤 이는 짐수레 한구석에 태워 주었지요. 어떤 이는 하룻밤 잠자리를 내주었습니다. 마르코는 그때마다 고개를 숙였지요. 고맙습니다. 이 은혜 잊지 않겠습니다. / 오른쪽: 밤이면 별을 보며 이름을 되뇌었지요. 그렇게 몇백 리를 나아갔습니다. 신발 바닥이 닳아 구멍이 났지요. 얼굴은 햇볕에 새까맣게 탔지요. 옷도 흙투성이가 되었습니다.〕 |

## 6장 · 다시 어긋난 길

| 파일명 | 장면 |
|---|---|
| `images/06-again.webp` | A boy slumping onto a kerb outside another empty house as a neighbour gestures far to the north, dusty street, deeply disheartening. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마침내 로사리오에 닿았습니다. 마르코는 곧장 그 집을 찾아갔지요. 이번에는 틀림없으리라 여겼습니다. 그런데 또 한발 늦었지요. 그 집은 투쿠만으로 옮겨 갔다는구나. / 오른쪽: 발밑에 흙먼지가 뽀얗게 일었지요. 목이 타는데 물도 없었습니다. 투쿠만은 또 얼마나 먼가요? 여기서 육백 킬로미터란다. 산 밑까지 가야 해.〕 |
| `images/06-again-2.webp` | A boy taking a small photograph from his pocket and looking at his smiling mother, then standing up with his bundle and setting off north, resilient. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 주머니에 손이 닿았습니다. 어머니의 사진이 만져졌지요. 마르코는 그것을 꺼내 보았습니다. 머리를 뒤로 묶은 어머니가 웃고 있었지요. 떠나던 날의 얼굴 그대로였습니다. 마르코는 눈물을 닦았지요. / 오른쪽: 여기까지 와서 돌아갈 수는 없어. 마르코는 다시 일어섰습니다. 보따리를 어깨에 고쳐 멨지요. 발이 아파도 참기로 했습니다.〕 |

## 7장 · 마지막 길

| 파일명 | 장면 |
|---|---|
| `images/07-final.webp` | A footsore boy with broken shoes crossing rivers and hills toward distant Andean mountains, dusty track, golden dusk, resilient. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마르코는 들판을 지났습니다. 강을 건너고 언덕을 넘었지요. 며칠을 걷고 또 걸었습니다. 신발은 다 해져 발이 드러났지요. 발바닥이 부르터 걸음마다 아팠습니다. 돌부리에 걸려 몇 번이나 넘어졌지요. 무릎에 딱지가 앉았습니다. / 오른쪽: 어느 날은 하루 종일 굶기도 했지요. 멀리 산줄기가 보이기 시작했습니다. 안데스 산맥이었지요. 마르코는 그것을 보고 힘을 냈습니다. 거의 다 왔어. 조금만 더.〕 |
| `images/07-final-2.webp` | A small cluster of adobe houses under mountains where a woman hanging laundry stops and stares at an approaching ragged boy, hopeful golden dusk. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 흙집 몇 채가 보였습니다. 작은 마을이었지요. 마르코는 마지막 힘을 다해 걸었습니다. 마당에서 빨래를 널던 아주머니가 돌아보았지요. 그러고는 손을 멈췄습니다. 아주머니가 마르코를 빤히 보았지요. 너…… 혹시. / 오른쪽: 마르코의 심장이 쿵쾅거렸습니다. 손에 든 보따리가 툭 떨어졌지요. 아주머니가 얼른 그것을 주워 주었습니다. 저희 어머니를 아세요? 마르코는 숨이 가빴습니다. 아주머니의 눈이 붉어졌지요.〕 |

## 8장 · 어머니의 방

| 파일명 | 장면 |
|---|---|
| `images/08-reunion.webp` | A simple sunlit room where a boy kneels beside a bed holding the hand of a pale woman who lies very still, a window open to mountains, deeply tender. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아주머니가 마르코를 안으로 데려갔습니다. 작은 방에 침대가 하나 있었지요. 어머니가 거기 누워 있었습니다. 얼굴이 종잇장처럼 하얬지요. 몹시 앓고 있었습니다. 수술을 받아야 하는 몸이었지요. 그런데 어머니는 마음을 놓아 버린 뒤였습니다. / 오른쪽: 가족 소식을 못 들은 지 오래였거든요. 마르코는 침대 옆에 무릎을 꿇었습니다. 목소리가 떨렸지요. 어머니의 손이 아주 가벼웠지요. 마르코는 그 손을 두 손으로 감쌌습니다.〕 |
| `images/08-reunion-2.webp` | A pale woman opening her eyes and reaching for her son's face, and later mother and son standing together at a ship's rail heading home, radiant and moving. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어머니가 천천히 눈을 떴습니다. 한참 동안 마르코를 바라보았지요. 마르코……? / 오른쪽: 어머니의 눈에서 눈물이 흘렀습니다. 두 사람은 오래 서로를 안고 있었지요. 그날부터 어머니는 마음을 고쳐먹었습니다. 수술도 받고 약도 잘 먹었지요. 몸은 조금씩 나아졌습니다. 이듬해 봄이 되었지요. 두 사람은 함께 배를 타고 집으로 돌아갔답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
