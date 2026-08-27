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
bold clean outlines, saturated storybook colors, warm German town light and misty
mountain blues, no text or letters in the image, a medieval town of half-timbered
houses, a market square, a river, and a green mountainside, expressive comic
faces, wide panoramic composition, never frightening; the rats are drawn as comic
and the mountain scene as gentle.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The piper: a tall lean man in a patchwork coat of many colours with a feathered
cap and a plain wooden pipe, drawn as odd and striking rather than sinister. The
mayor: a round self-important man in a fur-trimmed robe and heavy chain. The
councillors: a row of anxious men in caps. The children: a lively crowd of
townspeople's children. One small boy with a crutch who cannot keep up.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a tall figure in a patched coat of many colours standing at the end of a cobbled medieval street playing a wooden pipe, a long line of shapes following him into the mist beyond, half-timbered houses leaning close, striking and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 쥐가 들끓는 마을

| 파일명 | 장면 |
|---|---|
| `images/01-rats.webp` | A pretty riverside town of half-timbered houses overrun with comic rats scampering along beams, into pots and over cradles, exasperated townspeople waving brooms, funny not horrid. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 하멜른이라는 마을이 있었습니다. 강가에 자리 잡은 고운 마을이었지요. 그런데 그해 여름이 이상했습니다. 쥐가 부쩍부쩍 늘어난 것입니다. 처음에는 창고에만 있었지요. / 오른쪽: 그러다 곧 온 마을에 퍼졌습니다. 쥐들이 부엌 그릇을 갉아 먹었지요. 요람까지 기어오르고 수프 냄비에서 헤엄쳤습니다. 밤이면 천장에서 다다다 소리가 났지요. 사람들은 도무지 잠을 잘 수 없었습니다. 이러다 마을이 망하겠어!〕 |
| `images/01-rats-2.webp` | A town hall besieged by angry citizens where a sweating mayor and councillors argue over traps and cats piled uselessly in a corner, and a knock sounding at the great door, comic. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 참다못한 사람들이 시청으로 몰려갔습니다. 시장님, 어떻게 좀 해 주세요! 시장은 땀을 뻘뻘 흘렸지요. 이웃 마을에서 고양이를 잔뜩 사 왔습니다. / 오른쪽: 의원들이 머리를 맞대고 앉았지요. 강에 몰아넣을까요? 불을 놓을까요?〕 |

## 2장 · 낯선 사나이

| 파일명 | 장면 |
|---|---|
| `images/02-piper.webp` | A town hall where a tall lean man in a coat of many patched colours with a feathered cap and a wooden pipe stands before a startled mayor and councillors, striking and odd. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 키가 껑충한 사람이 들어왔습니다. 옷이 아주 이상했지요. 천 조각을 이어 붙인 옷이었습니다. 빨강, 노랑, 파랑이 뒤섞여 있었지요. 허리에는 나무 피리를 차고 있었습니다. / 오른쪽: 제가 없애 드리겠습니다. 시장이 자리에서 벌떡 일어났지요. 정말인가? 얼마를 주면 되나?〕 |
| `images/02-piper-2.webp` | A mayor eagerly shaking hands with the piper as councillors applaud, and the piper stepping into the market square and raising the pipe to his lips as faces crowd every window, expectant. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그러다 얼른 고개를 끄덕였지요. 좋네, 천 닢을 주지. 쥐만 없애 준다면 이만 닢인들. / 오른쪽: 물론이지, 물론이고말고. 사나이는 그길로 밖으로 나갔습니다. 그러고는 광장 한가운데 우뚝 섰지요. 피리를 천천히 입에 갖다 댔습니다. 사람들이 창문에 다닥다닥 매달렸지요.〕 |

## 3장 · 피리 소리를 따라

| 파일명 | 장면 |
|---|---|
| `images/03-rats-follow.webp` | A market square where a piper plays and rats pour from every cellar door, gutter and roof, streets turning grey with them all flowing toward the music, comic and spectacular. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 가늘고 맑은 소리였습니다. 처음에는 아무 일도 일어나지 않았지요. 그러다 어디선가 소리가 났습니다. 사각사각, 찍찍. / 오른쪽: 집집마다 문틈으로 기어 나왔지요. 지붕에서도 우수수 내려왔습니다. 골목이 온통 회색으로 뒤덮였지요. 쥐들은 하나같이 피리 쪽으로 갔습니다. 큰 쥐도 작은 쥐도 마찬가지였지요. 사람들은 창가에서 숨을 죽였습니다.〕 |
| `images/03-rats-follow-2.webp` | A piper walking through streets trailing an enormous grey river of rats behind him down to the riverbank where the current carries them away, townspeople cheering from the bridge, triumphant. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 사나이가 천천히 걸음을 옮겼습니다. 쥐들이 그 뒤를 졸졸 따랐지요. 줄이 골목을 가득 메웠습니다. 광장을 지나 큰길로 나갔지요. 이윽고 강가에 이르렀습니다. / 오른쪽: 그런데 사나이는 멈추지 않았지요. 피리를 불며 그대로 물가로 걸어갔습니다. 쥐들도 홀린 듯 따라 들어갔지요. 물살이 쥐들을 저 아래로 실어 갔습니다. 한참 만에 강이 조용해졌지요. 마을에 쥐가 한 마리도 남지 않았습니다. 사람들이 와아 환호했지요.〕 |

## 4장 · 약속을 어긴 마을

| 파일명 | 장면 |
|---|---|
| `images/04-refuse.webp` | A town hall where a mayor pushes a small purse across a table with a dismissive shrug while councillors nod, the piper standing motionless before them, tense and pointed. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 사나이가 시청으로 돌아왔습니다. 이제 값을 주십시오. 그런데 시장의 얼굴이 굳었지요. / 오른쪽: 의원들도 옆에서 거들었습니다. 쥐는 어차피 곧 갔을 거요. 오십 닢이면 넉넉하지.〕 |
| `images/04-refuse-2.webp` | A piper turning silently for the door as a mayor waves him off with a laugh, and that evening the town square full of feasting and dancing townspeople, ominous contrast. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 약속은 약속입니다. 잔말 말고 그거나 받아 가게! 시장이 손을 훠이훠이 내저었습니다. 사나이가 낮은 목소리로 말했지요. / 오른쪽: 뭐라고? 사나이는 대답하지 않았지요. 그저 문을 열고 나갔습니다. 시장은 등 뒤에서 코웃음을 쳤지요.〕 |

## 5장 · 두 번째 피리 소리

| 파일명 | 장면 |
|---|---|
| `images/05-children.webp` | A sunlit street where children stop their ball game and turn toward bright music, and a piper standing in the square playing a merry tune as children come running, joyful and uneasy. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아침이었습니다. 어른들은 모두 교회에 갔지요. 골목에는 아이들만 남았습니다. 다들 공놀이를 하고 있었지요. 공이 담벼락에 통통 튀었습니다. 그때 광장 쪽에서 소리가 났습니다. 어제 그 피리였지요. / 오른쪽: 아주 밝고 신나는 가락이었지요. 발이 저절로 들썩이는 소리였습니다. 아이들이 하던 놀이를 뚝 멈췄습니다. 저 소리 뭐야?〕 |
| `images/05-children-2.webp` | A long line of laughing children following a piper out through the town gate, and one small boy on a crutch struggling far behind calling after them, church bells ringing, moving. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 아이들이 사나이의 뒤를 따랐습니다. 웃고 뛰며 신이 나서 걸었지요. 줄이 점점 길어졌습니다. 어느새 온 마을 아이들이 되었지요. 맨발로 뛰어나온 아이도 있었습니다. 그런데 한 아이만 뒤처졌습니다. 다리를 절었거든요. 아이는 목발을 짚고 애를 썼지요. / 오른쪽: 같이 가! 기다려! 하지만 아무도 듣지 못했습니다. 다들 피리 소리에만 귀를 기울였거든요. 줄은 그대로 마을 밖으로 나갔지요.〕 |

## 6장 · 산 앞에서

| 파일명 | 장면 |
|---|---|
| `images/06-mountain.webp` | Townspeople streaming out of the gate too late as a distant line of children reaches a green hillside where the piper lowers his pipe, wide sunlit landscape, urgent and beautiful. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 어른들은 그 자리에 얼어붙었습니다. 거리가 텅 비어 있었지요. 우리 아이들 어디 갔어요? 저기, 저 언덕으로! / 오른쪽: 줄은 어느새 산 앞에 이르렀습니다. 풀이 파랗게 덮인 언덕이었지요. 사나이가 피리를 멈췄습니다. 아이들도 따라서 걸음을 멈췄지요. 여기가 어디예요?〕 |
| `images/06-mountain-2.webp` | A green hillside where a small boy on a crutch arrives breathless before the piper, who kneels down to look at him closely and slowly lowers his pipe, tender and pivotal. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 뒤에서 소리가 났습니다. 또각, 또각. 목발 짚는 소리였지요. 뒤처졌던 아이가 겨우 따라온 것이었습니다. 숨이 턱까지 차 있었지요. / 오른쪽: 한참을 내려다봤지요. 그러고는 천천히 무릎을 굽혔습니다. 여기까지 혼자 왔구나. 네, 다들 가 버려서요.〕 |

## 7장 · 돌아온 아이들

| 파일명 | 장면 |
|---|---|
| `images/07-return.webp` | A hillside where a piper speaks quietly with a small boy on a crutch as a breathless crowd of parents led by the mayor comes running up the slope, emotional and hopeful. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 나는 값을 받으러 왔단다. 어른들이 약속을 어겼거든. 아이가 고개를 갸웃했지요. / 오른쪽: 그런데 네가 오는 걸 보니…… 내가 뭘 하려던 건가 싶구나. 바로 그때 멀리서 사람들이 달려왔지요. 시장이 맨 앞이었습니다.〕 |
| `images/07-return-2.webp` | A hillside where a mayor counts out a thousand gold coins with shaking hands and children run into their parents' arms, the piper walking away down the road and turning once to raise a hand, warm and complete. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 사나이가 말없이 자루를 내밀었습니다. 시장이 그 자리에서 금화 천 닢을 세어 담았지요. 손이 덜덜 떨렸습니다. 진작 이럴 것을. 사나이는 자루를 받아 어깨에 멨지요. 그러고는 아이들을 모두 돌려보냈습니다. / 오른쪽: 언덕이 금세 울음바다가 됐습니다. 사나이는 조용히 돌아섰지요. 그러다 길 끝에서 한 번 돌아봤습니다. 목발 짚은 아이가 손을 흔들고 있었지요. 사나이도 손을 들어 보였답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
