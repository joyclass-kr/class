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
bold clean outlines, saturated storybook colors, warm candlelight and rose-gold
dusk, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a castle great hall, a spiral tower stair,
a small attic room with a spinning wheel, and a castle overgrown with briar
roses, expressive faces, wide panoramic composition, gentle and never
frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The princess: a girl about 15 with chestnut hair and a pale rose gown, curious
and kind. The king and queen: a warm middle-aged pair in simple crowns. The
twelve fairies: small bright figures in different colours, each carrying a
different gift. The thirteenth fairy: a tall figure in deep grey and violet,
drawn as proud and hurt rather than wicked. The old spinner: a bent woman at a
wheel in a tower room. The prince: a young man in a blue riding coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a castle almost swallowed by a wall of blooming briar roses and thorns, one high tower window still visible above the tangle, evening light gilding the petals, beautiful and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 오래 기다린 공주

| 파일명 | 장면 |
|---|---|
| `images/01-birth.webp` | A castle nursery where a king and queen lean over a cradle in wonder as courtiers celebrate, bells ringing beyond the window, spring blossom outside, warm and joyful. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님 부부는 해마다 같은 소원을 빌었습니다. 아이가 없어 궁궐이 늘 조용했거든요. 딸 하나만 있으면 좋겠구나. 그렇게 여러 해가 지났지요. / 오른쪽: 종이 밤새도록 울렸습니다. 임금님은 큰 잔치를 열기로 했지요. 요정들을 모두 부르시오. 이 나라에는 요정이 열셋 있었습니다.〕 |
| `images/01-birth-2.webp` | A grand candlelit hall where twelve small bright fairies step forward one by one to a cradle, each offering a different gift, courtiers smiling, twelve gold plates on the table, festive. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그럼 열둘만 부르시오. 임금님은 대수롭지 않게 여겼지요. 그렇게 초대장이 열두 장만 나갔습니다. 요정 한 사람이 빠진 것이었지요. / 오른쪽: 요정들이 하나씩 앞으로 나왔습니다. 그러고는 아기에게 선물을 주었지요. 아름다움을 주겠어요. 고운 목소리를 주겠어요.〕 |

## 2장 · 초대받지 못한 손님

| 파일명 | 장면 |
|---|---|
| `images/02-curse.webp` | A festive hall falling silent as the doors blow open and a tall figure in grey and violet walks in, candle flames guttering, guests drawing back, dramatic but not monstrous. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 열한 번째 요정이 물러섰습니다. 이제 한 사람만 남았지요. 그때 문이 쾅 열렸습니다. 찬바람이 홀을 훑고 지나갔지요. 촛불이 한꺼번에 흔들렸습니다. 열세 번째 요정이었지요. / 오른쪽: 저는 왜 부르지 않으셨나요? 홀이 쥐 죽은 듯 조용해졌습니다. 임금님은 아무 말도 하지 못했지요. 요정이 천천히 걸어왔습니다. 그러고는 요람 앞에 섰지요.〕 |
| `images/02-curse-2.webp` | A hushed hall where a tall grey-violet figure pronounces over a cradle as a queen cries out, then sweeps out through the doors leaving the court frozen, powerful and sad. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 저도 선물을 드리지요. 목소리가 서늘했습니다. 공주는 열다섯 살이 되는 날, / 오른쪽: 임금님이 자리에서 벌떡 일어섰습니다. 요정은 그대로 돌아섰습니다. 그러고는 문밖으로 사라졌지요. 홀이 얼어붙었습니다. 아무도 움직이지 못했지요. 금접시 부딪는 소리조차 나지 않았습니다.〕 |

## 3장 · 마지막 요정의 선물

| 파일명 | 장면 |
|---|---|
| `images/03-softened.webp` | A hall where a small bright fairy steps forward to a cradle with her hands raised in blessing, soft light spreading, the queen clutching her hand in tears, hopeful and moving. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 열두 번째 요정이 앞으로 나왔습니다. 아직 선물을 주지 않았거든요. 저는 그 말을 지울 수 없어요. / 오른쪽: 공주는 쓰러지지만, 죽는 것이 아닙니다. 백 년 동안 잠들 뿐이지요.〕 |
| `images/03-softened-2.webp` | A town square where soldiers pile spinning wheels onto a bonfire as smoke rises, and beside it a growing girl singing in a castle garden over the years, bittersweet. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 그날로 명을 내렸습니다. 나라 안의 물레를 모두 없애라. 병사들이 집집마다 다녔지요. 물레가 수레에 실려 나갔습니다. / 오른쪽: 그사이 공주는 무럭무럭 자랐지요. 요정들이 준 선물 그대로였습니다. 곱고, 다정하고, 노래를 잘했지요. 누구나 공주를 좋아했습니다. 그렇게 열다섯 해가 흘렀지요. 그래도 아무도 그날을 잊지 않았습니다.〕 |

## 4장 · 탑 위의 방

| 파일명 | 장면 |
|---|---|
| `images/04-spindle.webp` | A narrow dusty spiral stair inside an old tower where a girl in a rose gown climbs toward a small door at the top with a rusted key in its lock, shafts of light through arrow slits, curious. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 드디어 공주의 열다섯 번째 생일이었습니다. 그날따라 임금님과 왕비는 성을 비웠지요. 공주는 혼자 성을 이리저리 돌아다녔습니다. 아직 가 보지 않은 곳이 많았거든요. 북쪽 끝에 낡은 탑이 하나 있었지요. 좁은 계단이 위로 이어져 있었습니다. 공주는 한 칸씩 조심조심 올라갔지요. / 오른쪽: 계단에 먼지가 뽀얗게 앉아 있었습니다. 꼭대기에 작은 문이 있었지요. 녹슨 열쇠가 그대로 꽂혀 있었습니다. 돌리자 삐걱 소리가 났지요. 문이 스르르 열렸습니다.〕 |
| `images/04-spindle-2.webp` | A small sunlit tower room where a bent old woman works a spinning wheel and a curious girl reaches out to the spindle, and in the same wide scene the girl sinking gently to the floor, quiet and gentle. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 방 안에 할머니가 앉아 있었습니다. 무언가를 빙글빙글 돌리고 있었지요. 할머니, 그게 뭐예요? 물레란다. 실을 잣는 것이지. / 오른쪽: 저도 해 봐도 될까요? 그럼, 이리 와 앉으렴. 공주가 손을 뻗었습니다. 그 순간 바늘 끝이 손끝에 닿았지요.〕 |

## 5장 · 성 전체가 잠들다

| 파일명 | 장면 |
|---|---|
| `images/05-sleep.webp` | A castle frozen mid-motion — a cook asleep with ladle raised, a dog curled in the yard, pigeons still on the roof, the king and queen dozing on the threshold, flames paused, magical stillness. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그 순간 성 전체가 우뚝 멈췄습니다. 부엌에서 요리사가 멈췄지요. 들어 올렸던 국자가 그대로 멈춰 섰습니다. 마당의 개도 엎드린 채 잠들었지요. 지붕의 비둘기도 날개를 편 그대로였습니다. 난롯불마저 멈춰 섰지요. 때마침 돌아온 임금님도 마찬가지였습니다. / 오른쪽: 문턱을 넘다 그대로 잠이 들었지요. 바람도 딱 그쳤습니다. 뜰의 분수도 물줄기를 세운 채였지요. 나뭇잎 하나 흔들리지 않았지요. 성은 아주 조용해졌습니다.〕 |
| `images/05-sleep-2.webp` | A castle being swallowed year by year in a rising wall of briar and thorn, roses blooming in spring and snow settling in winter over the same wall, villagers pointing from afar, beautiful and timeless. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 성 둘레에서 가시덤불이 자라기 시작했습니다. 하루가 다르게 쑥쑥 뻗었지요. 덤불이 담을 덮고 창을 가렸습니다. 이내 지붕까지 올라갔지요. 가시가 창끝처럼 뾰족하게 돋았습니다. 아무도 안으로 들어갈 수 없었지요. / 오른쪽: 그렇게 해가 뜨고 지기를 되풀이했습니다. 봄이면 덤불에 장미가 피었지요. 겨울이면 그 위에 눈이 소복이 덮였습니다. 마을에는 이런 이야기가 전해졌지요.〕 |

## 6장 · 가시덤불을 헤치고

| 파일명 | 장면 |
|---|---|
| `images/06-prince.webp` | A young man in a blue riding coat before a towering wall of thorns as villagers warn him, and the thorns parting of their own accord into an arch of blooming roses, wondrous and radiant. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 백 년이 되던 해였습니다. 한 왕자가 그 나라를 지나가게 되었지요. 왕자는 마을에서 가시덤불 이야기를 들었습니다. 저 안에 성이 있다고요? 들어가려던 이가 많았지요. / 오른쪽: 왕자는 덤불 앞으로 다가갔습니다. 가시가 빽빽하게 얽혀 있었지요. 왕자가 칼을 뽑으려는 순간이었습니다. 덤불이 스르르 갈라졌지요. 가시가 하나둘 꽃으로 바뀌었습니다. 길이 저절로 활짝 열렸지요.〕 |
| `images/06-prince-2.webp` | A dusty sleeping castle interior where a young man walks past a slumbering dog and a motionless cook, cobwebs and shafts of light everywhere, then climbing a narrow tower stair, hushed. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 왕자는 그 길로 걸어 들어갔습니다. 마당의 개가 엎드린 채 잠들어 있었지요. 부엌에는 요리사가 서 있었습니다. 국자를 든 그대로였지요. 어디에나 먼지가 소복이 쌓여 있었습니다. 거미줄이 촛대마다 걸려 있었지요. 왕자는 발소리를 죽이고 걸었지요. 그러고는 계단을 올랐습니다. 방마다 문을 열어 봤지요. / 오른쪽: 모두 잠들었구나. 방마다 사람들이 그대로 잠들어 있었습니다. 북쪽 끝에 오래된 탑이 서 있었지요. 좁은 계단이 위로 이어졌습니다. 왕자는 한 칸씩 천천히 올랐지요. 계단이 발밑에서 삐걱삐걱 울었습니다.〕 |

## 7장 · 백 년 만의 아침

| 파일명 | 장면 |
|---|---|
| `images/07-wake.webp` | A tower room filled with morning light where a girl lies asleep as she was a century ago, a young man standing quietly by, and a stopped clock beginning to tick as her fingers stir, radiant. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 탑 꼭대기 방이었습니다. 문이 반쯤 열려 있었지요. 창으로 아침 햇살이 비껴들었습니다. 공주가 그 자리에 잠들어 있었지요. 백 년 전 모습 그대로였습니다. 창턱에 앉은 먼지만 세월을 말해 주었지요. 왕자는 한참 동안 그 앞에 서 있었지요. / 오른쪽: 똑, 똑, 똑. 아래층에서 사람들이 뒤척이는 소리도 났습니다. 멈췄던 시계가 다시 가기 시작한 것이었지요. 공주의 손끝이 움찔 움직였습니다. 그러고는 천천히 눈을 떴지요.〕 |
| `images/07-wake-2.webp` | A castle waking all at once — a dog barking, a cook blinking at his ladle, fire leaping up, pigeons bursting from the roof, the king and queen rising on the threshold, roses where thorns had been, joyous. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 성이 깨어나기 시작했습니다. 마당의 개가 벌떡 일어나 짖었지요. 요리사가 국자를 내려놓았습니다. 어라, 내가 뭘 하고 있었지? 멈췄던 난롯불이 다시 타올랐지요. 비둘기가 지붕에서 푸드덕 날아올랐습니다. 임금님과 왕비도 눈을 떴지요. / 오른쪽: 문턱에서 서로를 마주 봤습니다. 온 성이 웅성웅성했지요. 가시덤불도 어느새 모두 사라졌습니다. 그 자리에는 장미만 남았지요. 그날 성에서는 큰 잔치가 열렸답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
