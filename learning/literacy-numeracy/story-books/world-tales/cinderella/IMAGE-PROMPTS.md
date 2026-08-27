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
bold clean outlines, saturated storybook colors, warm hearth light against cool
moonlit blues, no text or letters in the image, a shabby kitchen with a great
fireplace, a walled garden, a palace ballroom and staircase, and a village lane,
expressive faces, wide panoramic composition, warm and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Cinderella: a girl about 15 with ash-smudged cheeks and hair tied back, first in
a patched grey dress, later in a shimmering pale-blue gown. The stepmother: a
tall woman in stiff dark silk with a thin mouth. The two stepsisters: one lanky
and one plump, both in loud frilly dresses, comic rather than cruel-looking. The
fairy godmother: a round twinkling old woman in a soft lilac cloak. The prince: a
friendly young man in a green coat. The chamberlain: a fussy little man with a
cushion.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a single glass slipper resting on a red velvet cushion at the foot of a grand palace staircase at midnight, a clock face glowing above and a pumpkin coach fading into the dark beyond, elegant and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 재투성이 소녀

| 파일명 | 장면 |
|---|---|
| `images/story-01-chores.webp` | A modest parlour where a stepmother in stiff dark silk coldly instructs a girl to move out of her room, two stepsisters already carrying her things away, a black mourning ribbon on the door, subdued light. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 한 소녀가 살았습니다. 어머니를 일찍 여의었지요. 아버지는 얼마 뒤 새 부인을 맞았습니다. 그 부인에게는 딸이 둘 있었지요. 처음에는 다들 상냥했습니다. 소녀도 그제야 마음을 놓았지요. 그런데 아버지가 그만 병이 들었습니다. 약을 써 봐도 소용이 없었지요. / 오른쪽: 소녀는 밤마다 아버지 곁을 지켰습니다. 얼마 못 가 아버지마저 세상을 떠났습니다. 장례를 치른 바로 이튿날이었지요. 새어머니가 소녀를 불렀습니다. 오늘부터 부엌에서 자거라.〕 |
| `images/story-01-chores-2.webp` | A shabby kitchen with a great stone fireplace where a girl in a patched grey dress curls up on the hearth beside the ashes at night, a broom and water pail nearby, two stepsisters laughing in the doorway, warm firelight. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그날부터 소녀의 하루가 아주 달라졌습니다. 새벽에 일어나 우물에서 물을 길었지요. 아침에는 아궁이에 불을 지폈습니다. 낮에는 마루를 닦고 저녁에는 그릇을 씻었지요. 밤이 되어서야 겨우 자리에 앉을 수 있었습니다. 그동안 언니들은 빈둥빈둥 놀기만 했지요. 잠자리는 벽난로 옆이었습니다. / 오른쪽: 집에서 따뜻한 곳이라고는 거기뿐이었거든요. 그러다 보니 옷자락에 늘 재가 묻었습니다. 언니들이 그걸 보고 놀려 댔지요. 우리 재투성이 아가씨 납셨네!〕 |

## 2장 · 무도회 초대장

| 파일명 | 장면 |
|---|---|
| `images/story-02-invite.webp` | A cluttered bedroom where two overdressed stepsisters preen before a mirror amid ribbons and fabric while a girl in grey patiently pins up their hair, a gold invitation propped on the dresser, comic and busy. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 날 심부름꾼이 대문을 두드렸습니다. 손에 금빛 초대장을 들고 있었지요. 궁궐에서 무도회를 엽니다! 왕자님이 신붓감을 찾으신대요. / 오른쪽: 언니들은 그날로 새 옷을 맞췄지요. 그러고는 사흘 내내 거울 앞을 떠나지 않았습니다. 얘, 이리 와서 내 리본부터 매 줘! 아니야, 내 머리를 먼저 올려 줘야지!〕 |
| `images/story-02-invite-2.webp` | A cottage yard at dusk where a stepmother upends a sack of beans and lentils across the flagstones as a carriage waits at the gate, a girl in grey standing alone before the scattered heap, pointed and sad. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 신데렐라도 무도회에 가고 싶었습니다. 저녁상을 물리고 나서 용기를 내어 물었지요. 저도 가 보면 안 될까요? 언니들이 배를 잡고 깔깔 웃었습니다. / 오른쪽: 그러더니 말없이 마당으로 나갔습니다. 그러고는 콩 자루를 와르르 쏟았지요. 저녁까지 이걸 다 골라 놓아라. 그러면 생각해 보마.〕 |

## 3장 · 요정 대모의 마법

| 파일명 | 장면 |
|---|---|
| `images/story-03-magic.webp` | A moonlit cottage yard where a weeping girl kneels over scattered beans and a round twinkling old woman in a lilac cloak appears behind her, soft light gathering at the wand tip, gentle and magical. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 콩은 아무리 골라도 좀처럼 줄지 않았습니다. 손끝이 얼얼하고 허리도 아팠지요. 그러는 사이 해가 뉘엿뉘엿 넘어갔습니다. 마차 소리는 이미 멀어진 지 오래였지요. 신데렐라는 그만 마당에 주저앉았습니다. 눈물이 콩 위로 뚝뚝 떨어졌지요. / 오른쪽: 그때 등 뒤에서 목소리가 들렸습니다. 얘야, 왜 울고 있니? 돌아보니 낯선 할머니가 서 있었지요. 보드라운 보랏빛 망토를 두른 할머니였습니다. 신데렐라는 사정을 하나하나 털어놓았지요.〕 |
| `images/story-03-magic-2.webp` | A cottage yard bursting with light as a pumpkin swells into a glittering coach, mice rearing up as white horses and a lizard straightening into a coachman, a girl in grey transforming into a pale-blue gown, joyous. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 자, 마당의 호박을 하나 가져오렴. 할머니의 지팡이가 휙 움직였습니다. 그러자 호박이 부풀어 오르더니 금세 반짝이는 마차가 되었지요. 생쥐 여섯 마리는 새하얀 말이 되었습니다. 담장 밑 도마뱀은 마부가 되었지요. / 오른쪽: 이번에는 지팡이가 신데렐라를 가리켰습니다. 누더기가 눈부신 옷으로 바뀌었지요. 발에는 유리로 만든 구두가 신겨졌습니다. 걸을 때마다 또각또각 맑은 소리가 났지요. 참, 한 가지만 기억하렴.〕 |

## 4장 · 무도회의 밤

| 파일명 | 장면 |
|---|---|
| `images/story-04-ball.webp` | A brilliant palace ballroom where the music stops and every head turns as a girl in a pale-blue gown enters at the top of the stairs, a young prince already crossing the floor toward her, chandeliers blazing. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 무도회장 문이 열렸습니다. 그 순간 음악이 뚝 그쳤지요. 사람들이 하나같이 고개를 돌렸습니다. 어느 나라 공주님이시래? 언니들도 신데렐라를 알아보지 못했지요. 바로 옆에 서서 수군거리기까지 했습니다. / 오른쪽: 그때 왕자가 사람들 사이를 지나 곧장 걸어왔지요. 저와 춤추시겠습니까? 두 사람은 밤이 깊도록 춤을 췄습니다. 왕자가 이런저런 것을 물었지요.〕 |
| `images/story-04-ball-2.webp` | A grand palace staircase at midnight where a girl flees down the steps leaving one glass slipper behind, the prince reaching after her, and beyond the gates a pumpkin rolling on the cobbles, dramatic and beautiful. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 시간이 어찌나 빨리 가는지 몰랐습니다. 그때 궁궐 시계가 울리기 시작했지요. 뎅— 뎅— 뎅— / 오른쪽: 그러고는 그대로 계단을 뛰어 내려갔지요. 잠깐만요! 이름이라도! 왕자가 뒤를 쫓았습니다. 계단 중간쯤이었지요. 구두 한 짝이 발에서 벗겨졌습니다.〕 |

## 5장 · 유리구두를 찾아서

| 파일명 | 장면 |
|---|---|
| `images/story-05-search.webp` | A palace staircase at dawn where a prince picks up a glass slipper, and a village lane where a fussy chamberlain carries it on a cushion from door to door as women crowd out to try it, lively and comic. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아침이었습니다. 왕자가 계단에서 구두 한 짝을 주웠지요. 유리로 만든 아주 작은 구두였습니다. 햇빛에 비추자 안이 훤히 들여다보였지요. 이름도 못 물어봤구나. / 오른쪽: 이 구두가 맞는 이를 찾아오너라. 신하들이 그날로 길을 나섰습니다. 구두는 비단 방석에 얹어 들고 다녔지요. 집집마다 문을 두드렸지요. 어느 집에서나 한바탕 소동이 났습니다.〕 |
| `images/story-05-search-2.webp` | A village street of weary queues where women contort their feet trying a glass slipper, and at the end of the lane a carriage halting before a shabby gate as the sun goes down, comic and expectant. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 발이 큰 사람도 신어 봤습니다. 발이 작은 사람도 신어 봤지요. 억지로 밀어 넣는 사람도 있었습니다. 발가락을 잔뜩 오므린 사람도 있었지요. 뒤꿈치를 슬쩍 든 사람도 있었습니다. 그래도 구두는 꿈쩍도 하지 않았지요. / 오른쪽: 유리라서 억지로 밀면 깨질 것 같았습니다. 그렇게 여러 날이 지났습니다. 신하들도 슬슬 지쳐 갔지요. 방석을 든 손이 다 저렸습니다. 이제 저 집이 마지막입니다.〕 |

## 6장 · 신데렐라의 발

| 파일명 | 장면 |
|---|---|
| `images/story-06-fit.webp` | A shabby parlour where a lanky stepsister strains red-faced to force her toes into a glass slipper while the plump one waits her turn, a chamberlain holding the cushion with a weary expression, hilarious. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 언니들이 소식을 듣고 먼저 달려 나왔습니다. 큰언니가 얼른 의자에 앉았지요. 그런데 발끝이 걸려 들어가지 않았습니다. 얼굴이 벌게지도록 발을 밀어 넣었지요. 조금만 더, 조금만 더! / 오른쪽: 이번에는 둘째가 자리에 앉았지요. 앞은 들어갔는데 뒤가 남았습니다. 뒤꿈치가 도무지 들어가지 않았지요. 이 구두가 잘못 만들어졌어요!〕 |
| `images/story-06-fit-2.webp` | A shabby parlour hushed as a girl in grey with ash on her hands slides her foot into the glass slipper perfectly, then draws its twin from her apron, stepmother and stepsisters open-mouthed, quietly triumphant. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 새어머니가 얼른 손사래를 쳤습니다. 부엌데기 하나뿐이지요. 그 아이도 불러 주십시오. / 오른쪽: 신하가 의자를 내주었습니다. 신데렐라가 발을 넣자 구두가 쏙 들어갔지요. 꼭 맞춘 듯이 알맞았습니다. 방 안이 물을 끼얹은 듯 조용해졌지요. 새어머니의 부채질이 뚝 멈췄습니다. 그때 신데렐라가 품에서 무언가를 꺼냈습니다. 나머지 한 짝이었지요. 언니들은 서로 얼굴만 쳐다봤습니다.〕 |

## 7장 · 행복한 시작

| 파일명 | 장면 |
|---|---|
| `images/story-07-wedding.webp` | A palace doorway where a prince hurries down the steps to greet a girl stepping from a carriage, spring flowers along the courtyard walls, both smiling as they walk in together, warm and hopeful. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 마차가 궁궐로 향했습니다. 왕자가 문 앞에 나와 서 있었지요. 그날 밤 이름도 못 물어봤네요. 신데렐라예요. / 오른쪽: 부끄러운 이름은 아닙니다. 저도 그렇게 생각해요. 이제는 부끄럽지 않아요.〕 |
| `images/story-07-wedding-2.webp` | A festive palace hall full of villagers where a bride takes the hands of her two shamefaced stepsisters at the doorway and draws them inside, lanterns and music, warm and generous. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 궁궐에서 큰 잔치가 열렸습니다. 온 마을 사람이 초대를 받았지요. 그런데 문가에 두 사람이 서 있었습니다. 들어오지도 가지도 못한 채였지요. 언니들이었습니다. 둘은 고개를 푹 숙이고 있었지요. 차마 안으로 들어설 엄두가 나지 않았거든요. / 오른쪽: 그때 신데렐라가 다가갔습니다. 그러고는 두 손을 잡아 주었지요. 지난 일은 그만해요. 오늘은 같이 웃어요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
