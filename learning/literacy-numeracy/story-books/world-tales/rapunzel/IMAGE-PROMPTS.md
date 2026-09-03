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
bold clean outlines, saturated storybook colors, soft dusk and forest light, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a walled garden, a lone stone tower, a deep forest
and a distant kingdom, expressive faces, wide panoramic composition, gentle and
never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Rapunzel: a girl with an extremely long golden braid, in a simple green dress,
curious and warm. The sorceress: a tall woman in a deep-plum cloak with a stern
face, drawn as severe rather than monstrous. The prince: a young man in a russet
riding coat with a lute. Rapunzel's parents: a worried young couple in plain
clothes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a slender stone tower rising above a dark forest, a long golden braid tumbling from its single high window, wildflowers and a garden wall in the foreground, dusk light, beautiful and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 담 너머의 밭

| 파일명 | 장면 |
|---|---|
| `images/01-garden.webp` | A modest cottage room where a pale young wife gazes from the window toward a high garden wall, and beyond it rows of lush green herbs growing in a walled garden, wistful evening light. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 요람 하나가 다 만들어졌습니다. 오래도록 아이가 없던 젊은 부부에게 드디어 아이가 생긴 것이었지요. 두 사람은 뛸 듯이 기뻤습니다. 아기 옷을 짓고 이름을 골라 보며 날을 세었지요. 창가에는 배냇저고리가 걸려 있었습니다. 그런데 아내가 시름시름 입맛을 잃었습니다. / 오른쪽: 집 뒤에는 아주 높은 담이 있었습니다. 담 너머는 마녀의 밭이라 아무도 넘보지 못했지요. 아내는 날마다 창가에서 그 담 너머를 바라보았습니다. 밭에는 라푼젤이라는 나물이 파랗게 자라 있었지요. 아침 이슬을 맞아 유난히 싱싱해 보였습니다. 저 나물이 어찌나 먹고 싶은지 몰라요.〕 |
| `images/01-garden-2.webp` | A moonless walled garden where a man crouches picking herbs and freezes as a tall figure in a plum cloak appears behind him in the shadow of the wall, tense and dramatic. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아내는 밥도 제대로 넘기지 못했습니다. 얼굴이 하루가 다르게 여위어 갔지요. 남편은 며칠을 망설였습니다. 마녀의 밭이라는 것을 알면서도 다른 수가 없었지요. 결국 달도 없는 밤에 담을 넘었습니다. 담은 어른 키의 두 배나 되었지요. / 오른쪽: 남편은 담을 넘어 손을 떨며 나물을 한 줌 뜯었습니다. 잎에서 서늘한 풀 냄새가 났지요. 그러고는 서둘러 돌아서려 했지요. 바로 그때 등 뒤에서 목소리가 났습니다. 남의 밭에서 무얼 하는 게냐.〕 |

## 2장 · 탑에 갇힌 아이

| 파일명 | 장면 |
|---|---|
| `images/02-tower.webp` | A walled garden where a kneeling man pleads with a tall cloaked woman who names her price, and later the same woman at a cottage door reaching for a newborn, sombre and moving. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 남편은 그 자리에 주저앉았습니다. 있는 대로 사정을 털어놓았지요. 아내가 이 나물을 못 먹어 앓아누웠습니다. 마녀는 한참 남편을 내려다보았습니다. / 오른쪽: 나물은 얼마든지 가져가도 좋다. 대신 태어날 아이를 내게 다오. 남편은 겁에 질려 그러겠다고 하고 말았습니다. 다른 생각을 할 겨를이 없었지요. 얼마 뒤 딸이 태어났습니다.〕 |
| `images/02-tower-2.webp` | A lone stone tower with a single high window standing in a forest clearing, a small girl looking up at it in dismay as a cloaked woman gestures, tall dark pines all around. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마녀는 아이에게 라푼젤이라는 이름을 지어 주었습니다. 어머니가 먹고 싶어 했던 그 나물 이름이었지요. 라푼젤은 마녀의 집에서 자랐습니다. 밥도 옷도 모자란 것이 없었지만 밖에 나가 본 적은 없었지요. 대문은 늘 자물쇠로 잠겨 있었습니다. 열두 살이 되던 해였습니다. 마녀는 라푼젤을 숲 한가운데로 데려갔지요. / 오른쪽: 거기 높다란 탑이 하나 서 있었습니다. 문도 계단도 없고 꼭대기에 창문 하나만 있었지요. 라푼젤은 고개를 한껏 젖혀 그 창을 올려다봤습니다. 이제부터 여기서 지내야 한다. 여기가 제일 안전하단다.〕 |

## 3장 · 머리카락을 내려라

| 파일명 | 장면 |
|---|---|
| `images/03-hair.webp` | The base of a tower where a cloaked woman grips a long golden braid hanging from the high window and begins to climb, the girl bracing at the sill above, dramatic vertical composition. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 라푼젤의 머리카락은 한 번도 자르지 않았습니다. 어느새 탑 높이만큼 길어졌지요. 금빛으로 반짝였습니다. 빗질을 하면 손목이 아플 정도였지요. 라푼젤은 그것을 고리에 걸어 두었습니다. 탑을 오르내리는 길은 그것뿐이었지요. / 오른쪽: 마녀는 하루에 한 번 탑 아래로 왔습니다. 그러고는 늘 이렇게 외쳤지요. 바구니에 먹을 것을 담아 왔지요. 라푼젤, 라푼젤, 머리카락을 내려라!〕 |
| `images/03-hair-2.webp` | A girl sitting at a high tower window singing as her voice drifts out over an endless forest, birds passing, clouds moving, lonely and beautiful. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 라푼젤의 하루는 늘 같았습니다. 아침이면 창가에 앉아 숲을 내려다보았습니다. 새가 날아가는 것을 세고 구름도 보았지요. 그러다 심심하면 노래를 불렀지요. 마녀에게 배운 노래가 아니라 저절로 생겨난 노래였습니다. / 오른쪽: 나무 사이를 지나 멀리까지 갔지요. 라푼젤은 그것을 알지 못했습니다. 듣는 사람이 있으리라고는 몰랐지요. 그렇게 여러 해가 지났습니다. 그동안 본 사람은 마녀 하나뿐이었지요. 말을 나눌 사람도 마녀뿐이었습니다.〕 |

## 4장 · 노래를 들은 사람

| 파일명 | 장면 |
|---|---|
| `images/04-prince.webp` | A young man in a russet coat reining in his horse in a deep forest, then circling a doorless stone tower and craning up at the single high window, wondering. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 날 젊은 왕자가 숲으로 사냥을 나왔습니다. 말을 몰고 깊은 곳까지 들어갔지요. 그러다 문득 고삐를 당겨 걸음을 멈췄습니다. 숲이 조용해진 것 같았지요. 어디선가 맑은 노랫소리가 들려왔거든요. 왕자는 소리를 따라 말을 몰았습니다. 이렇게 고운 노래는 처음이었지요. / 오른쪽: 나무를 헤치고 나아가자 빈터가 나왔습니다. 거기 탑이 하나 우뚝 서 있었지요. 왕자는 탑을 한 바퀴 돌아보았습니다. 그런데 아무리 찾아도 문이 없었습니다. 왕자는 고개를 들어 꼭대기 창을 올려다보았지요. 저 위에 누가 있는 걸까.〕 |
| `images/04-prince-2.webp` | A young man crouching behind ferns watching a cloaked woman call up at a tower and climb a golden braid, and the next evening standing alone at the tower base calling out himself, tense. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 왕자는 며칠을 숨어서 지켜보았습니다. 덤불 뒤에 몸을 낮추고 기다렸지요. 모기가 물어도 꼼짝하지 않았습니다. 해가 기울 무렵이면 늘 한 사람이 왔습니다. 자줏빛 망토를 두른 여인이었지요. 여인이 탑 아래에 서서 외쳤습니다. 라푼젤, 라푼젤, 머리카락을 내려라! / 오른쪽: 왕자는 그 말을 똑똑히 들었습니다. 그러고는 여인이 갈 때까지 기다렸지요. 해가 완전히 넘어간 뒤였습니다. 이튿날 저녁, 여인이 돌아간 뒤에 탑 아래로 갔지요. 그러고는 목소리를 낮추어 똑같이 외쳐 보았습니다. 가슴이 두근거렸지요.〕 |

## 5장 · 처음 만난 사람

| 파일명 | 장면 |
|---|---|
| `images/05-meeting.webp` | A small round tower room where a startled girl backs away as a young man climbs in over the sill, evening light through the window, wary and charged. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 머리카락이 스르르 내려왔습니다. 왕자는 그것을 붙잡고 올라갔지요. 창턱을 넘어 방으로 들어섰습니다. 그런데 라푼젤이 깜짝 놀라 뒤로 물러섰지요. 누, 누구세요? 목소리가 떨렸습니다. / 오른쪽: 놀라게 해서 미안합니다. 노랫소리를 듣고 왔습니다. 제 노래를요? 밖에서도 들려요? 숲 저쪽까지 들립니다. 그 말에 라푼젤의 얼굴이 조금 풀렸습니다.〕 |
| `images/05-meeting-2.webp` | A tower room at dusk where a young man tells stories to a rapt girl, and later the same girl secretly knotting silk thread into a ladder under her bed, hopeful and conspiratorial. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 두 사람은 해가 질 때까지 이야기를 나누었습니다. 왕자는 바깥세상 이야기를 들려주었지요. 바다가 얼마나 넓은지, 장날이 얼마나 떠들썩한지 말해 주었지요. 라푼젤은 눈을 반짝이며 들었습니다. 창밖 숲 너머에 그런 곳이 있다니 믿기지 않았습니다. / 오른쪽: 내일 또 와도 될까요? 네, 꼭 오세요. 그날부터 왕자는 저녁마다 찾아왔습니다. 올 때마다 비단실을 한 타래씩 가져왔지요. 라푼젤이 부탁한 것이었습니다.〕 |

## 6장 · 들켜 버린 저녁

| 파일명 | 장면 |
|---|---|
| `images/06-caught.webp` | A tower room where a girl claps a hand over her mouth too late as a cloaked woman's face hardens into fury, silk thread spilling from a basket, tense and sad. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 사다리는 좀처럼 길어지지 않았습니다. 탑이 워낙 높았으니까요. 라푼젤은 밤마다 실을 이어 매듭을 지었습니다. 그러던 어느 날이었지요. 매듭이 겨우 절반쯤 되었을 무렵이었습니다. 그날도 마녀가 머리카락을 붙잡고 올라왔습니다. / 오른쪽: 라푼젤이 무심코 말했지요. 할머니는 올라오실 때 왜 그렇게 무거우세요? 왕자님은 훨씬 가볍게 올라오시던데요.〕 |
| `images/06-caught-2.webp` | A tower room with shears and a cut golden braid heaped on the floor, and a bleak treeless moorland where a girl stands alone, and the braid tied to the window hook, stark and sorrowful. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마녀는 그 자리에서 가위를 꺼냈습니다. 라푼젤의 머리카락을 싹둑 잘랐지요. 금빛 머리카락이 바닥에 쌓였습니다. 라푼젤은 목소리가 나오지 않았습니다. 그저 두 손을 꼭 쥐고 서 있었지요. 마녀는 라푼젤을 먼 들판으로 데려갔습니다. / 오른쪽: 나무 한 그루 없는 벌판이었지요. 바람만 휑하니 지나갔습니다. 여기서 혼자 지내거라. 그러고는 혼자 탑으로 돌아왔습니다. 잘린 머리카락을 창가 고리에 단단히 매어 두었지요. 그러고는 저녁이 오기를 기다렸습니다.〕 |

## 7장 · 빈 탑

| 파일명 | 장면 |
|---|---|
| `images/07-empty.webp` | A tower window where a young man hauls himself up expecting joy and finds a cloaked woman waiting with folded arms, his face draining, dramatic and cold. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 저녁 왕자가 여느 때처럼 탑 아래에 왔습니다. 아무것도 모른 채였지요. 오늘도 라푼젤이 있으리라 믿었지요. 품에는 비단실 한 타래가 들어 있었습니다. 라푼젤, 라푼젤, 머리카락을 내려라! / 오른쪽: 왕자는 기쁜 마음에 얼른 올라갔지요. 그런데 기다린 것은 라푼젤이 아니었습니다. 마녀가 팔짱을 끼고 서 있었지요. 그 아이는 여기 없다. 다시는 못 본다.〕 |
| `images/07-empty-2.webp` | A young man falling into brambles at a tower base, and then walking blindly through forests and villages over the seasons with a stick, asking strangers, moving but not gory. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 왕자는 발을 헛디뎌 아래로 떨어졌습니다. 탑 밑은 온통 가시덤불이었지요. 가시에 눈을 긁혀 앞이 잘 보이지 않았습니다. 앞이 뿌옇게 흐려졌지요. 왕자는 그날부터 숲을 헤맸습니다. 어디로 가야 할지 막막하기만 했지요. / 오른쪽: 나무를 짚고 더듬더듬 걸었지요. 들판을 지나고 마을을 지나며 몇 해를 떠돌았습니다. 가는 곳마다 사람들에게 물었지요. 금빛 머리카락을 가진 아가씨를 못 보셨습니까? 하지만 아무도 알지 못했습니다. 옷은 갈수록 해지고 신발도 다 닳았지요.〕 |

## 8장 · 들판에서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A wide moorland where a young woman digs herbs beside a small turf hut and sings, and far off a stumbling figure walking straight toward the sound, hopeful and vast. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 한편 라푼젤은 들판에서 혼자 살아가고 있었습니다. 흙집을 짓고 나물을 캐며 지냈지요. 여름에는 풀을 엮어 지붕을 덮었습니다. 어머니가 먹고 싶어 했다던 그 나물이 그 들판에도 자랐습니다. 라푼젤은 그것을 볼 때마다 마음이 이상했지요. 한 번도 본 적 없는 어머니가 떠올랐습니다. / 오른쪽: 외로울 때면 예전처럼 노래를 불렀지요. 들어 줄 사람이 없어도 불렀습니다. 몇 해가 지난 어느 날이었지요. 멀리서 누가 비틀거리며 걸어오고 있었습니다. 지팡이를 짚은 사람이었지요. 노랫소리 쪽으로 곧장 오고 있었지요. 넘어지면 다시 일어나 걸었습니다.〕 |
| `images/08-ending-2.webp` | A sunlit moorland where a young woman runs to embrace a ragged blind man, her tears falling on his eyes as light returns, the two then walking away hand in hand, radiant and moving. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 라푼젤은 노래를 멈추고 그쪽을 보았습니다. 가까이 온 사람은 왕자였습니다. 눈은 앞을 보지 못했지요. 라푼젤은 달려가 그를 끌어안았습니다. 라푼젤의 뜨거운 눈물이 왕자의 두 눈 위로 떨어졌습니다. / 오른쪽: 그러자 놀라운 일이 벌어졌지요. 흐릿하던 앞이 환해졌습니다. 왕자는 오랜만에 라푼젤의 얼굴을 보았지요. 두 사람은 손을 잡고 그 들판을 걸어 나왔습니다. 그 뒤로 오래오래 함께 살았지요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
