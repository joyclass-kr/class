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

> **그림 자리가 하나 늘었습니다 (2026-08-28).**
> 5장에 들어갈 장면이 셋(문 두드림 / 문 열고 웃음 / 사자)인데 펼침면이 둘뿐이라
> 그림이 글보다 한 칸씩 밀려 있었어요. 5장을 세 펼침면으로 늘려 바로잡았습니다.
> 이미 그리신 그림은 파일 이름만 옮겨서 다 제자리를 찾았고,
> **새로 그릴 것은 `06-mouse-2.webp` 한 장뿐입니다.**

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm French countryside light,
no text or letters in the image, a mill and cottage, wheat fields and meadows, a
river bank, a royal carriage road and an ogre's grand castle, very expressive
comic faces, wide panoramic composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The cat: a lean tabby in tall red boots, a plumed hat and a small cloak, always
one step ahead. The youngest son: a plain honest young man in a patched shirt,
easily flustered. The king: a round jovial man in a gold-trimmed coat. The
princess: a curious young woman with a lace collar. The ogre: an enormous man in
a purple coat with a booming laugh, drawn as vain and gullible rather than
frightening. Field workers in straw hats.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a lean tabby cat in tall red leather boots and a plumed hat standing confidently on a country road with a sack over one shoulder, a castle on a distant hill behind, witty and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 남은 것은 고양이 한 마리

| 파일명 | 장면 |
|---|---|
| `images/01-inherit.webp` | A mill yard where two brothers claim a mill and a donkey while the youngest sits dejected on a step with only a tabby cat beside him, warm afternoon light, quietly sad. 〔이 쪽에 실린 글 (1/15) — 그림에 글자는 넣지 마세요. 왼쪽: 방앗간 주인이 세상을 떠났습니다. 아들이 셋 있었지요. 남긴 것은 세 가지였습니다. 방앗간과 당나귀와 고양이였지요. 첫째가 방앗간을 가졌습니다. 둘째는 당나귀를 가졌지요. 막내에게는 고양이만 남았습니다. 막내는 그 자리에 주저앉았지요. / 오른쪽: 형들은 함께 일하면 되지만…… 나는 뭘 하고 살지? 고양이가 옆에 앉았습니다. 가만히 막내를 올려다봤지요.〕 |
| `images/01-inherit-2.webp` | A cottage room where a talking cat asks for a sack and boots, then pulls on tall red leather boots and admires itself in a mirror with a plumed hat, comic swagger. 〔이 쪽에 실린 글 (2/15) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 고양이가 입을 열었습니다. 걱정하지 마십시오. 막내가 고개를 번쩍 들었지요. / 오른쪽: 장화를 신고 어디를 가려고? 글쎄요, 두고 보시지요. 막내는 남은 돈을 털었습니다. 빨간 가죽 장화를 사 주었지요. 고양이가 발을 쑥 넣었습니다.〕 |

## 2장 · 임금님께 바친 선물

| 파일명 | 장면 |
|---|---|
| `images/02-gift.webp` | A meadow where a booted cat lies in wait beside an open sack baited with carrots, and a palace hall where the same cat bows deeply before a puzzled king, comic and confident. 〔이 쪽에 실린 글 (3/15) — 그림에 글자는 넣지 마세요. 왼쪽: 고양이는 들판으로 갔습니다. 자루를 벌려 놓았지요. 안에 당근을 몇 개 넣었습니다. 풀숲에 납작 엎드렸지요. 이윽고 토끼가 들어왔습니다. 고양이가 끈을 잡아당겼지요. 자루가 팽팽해졌습니다. / 오른쪽: 고양이는 궁궐로 갔습니다. 문지기 앞에서 허리를 굽혔지요. 임금님께 선물을 가져왔습니다. 카라바 후작님이 보내셨습니다.〕 |
| `images/02-gift-2.webp` | A palace corridor where a booted cat presents game birds to a delighted king again and again over months, and the cat listening at a doorway to servants gossiping, sly and comic. 〔이 쪽에 실린 글 (4/15) — 그림에 글자는 넣지 마세요. 왼쪽: 그날부터 선물이 이어졌습니다. 토끼도 보내고 꿩도 보냈지요. 늘 같은 말을 덧붙였습니다. 카라바 후작님이 보내셨습니다. / 오른쪽: 몇 달이 지났습니다. 고양이는 궁궐 소식을 다 알게 됐지요. 어느 날 이런 이야기를 들었습니다. 내일 임금님이 강가로 나가신대.〕 |

## 3장 · 강물에 빠진 후작님

| 파일명 | 장면 |
|---|---|
| `images/03-river.webp` | A river bank where a young man bathes while his clothes lie on a rock, and a booted cat stuffing those clothes deep into the reeds as a royal carriage approaches on the road, comic scheming. 〔이 쪽에 실린 글 (5/15) — 그림에 글자는 넣지 마세요. 왼쪽: 고양이가 막내를 깨웠습니다. 오늘 강에서 헤엄을 치십시오. 뭐? 갑자기 왜? / 오른쪽: 옷을 벗어 바위에 놓았지요. 물에 들어가 몸을 씻었습니다. 그사이 고양이가 옷을 숨겼지요. 풀숲 깊이 밀어 넣었습니다. 멀리서 마차 소리가 들렸지요. 고양이는 길로 뛰어나갔습니다.〕 |
| `images/03-river-2.webp` | A river bank where courtiers haul a young man from the water as a booted cat gestures dramatically, and the same man moments later dressed in fine borrowed clothes beside a royal carriage, funny. 〔이 쪽에 실린 글 (6/15) — 그림에 글자는 넣지 마세요. 왼쪽: 사람 살려! 사람 살려요! 후작님이 물에 빠졌습니다! 마차가 급히 멈췄습니다. / 오른쪽: 막내가 물에서 건져졌습니다. 옷은 도둑이 가져갔습니다! 고양이가 큰 소리로 말했지요. 임금님이 옷을 내주게 했습니다.〕 |

## 4장 · 이 밭은 누구 것이냐

| 파일명 | 장면 |
|---|---|
| `images/04-fields.webp` | A royal carriage rolling along a country road with a blushing young man beside a princess, while ahead a booted cat instructs field workers in straw hats, wheat fields stretching away, comic. 〔이 쪽에 실린 글 (7/15) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님이 마차에 태워 주었습니다. 공주 옆자리였지요. 막내는 얼굴이 빨개졌습니다. 그사이 고양이는 앞서 달렸지요. 길가 밭에 일꾼들이 있었습니다. 고양이가 다가갔지요. 곧 마차가 지나갑니다. / 오른쪽: 카라바 후작님 것이라 하십시오. 일꾼들이 눈을 껌뻑였습니다. 카라바가 누군데요?〕 |
| `images/04-fields-2.webp` | A carriage passing field after field where workers straighten and answer in unison, the king leaning further out of the window each time in growing amazement, the young man shrinking in his seat, hilarious. 〔이 쪽에 실린 글 (8/15) — 그림에 글자는 넣지 마세요. 왼쪽: 마차가 밭 앞을 지났습니다. 임금님이 창밖을 봤지요. 이 밭은 누구 것인가? / 오른쪽: 다음 밭도 마찬가지였습니다. 그다음 밭도 그랬지요. 풀밭도, 숲도 그랬습니다. 임금님은 갈수록 놀랐지요. 후작이 이렇게 큰 부자였나?〕 |

## 5장 · 마법사의 성

| 파일명 | 장면 |
|---|---|
| `images/05-castle.webp` | **이미 있음** — 성문 앞 다리 위에서 장화 신은 고양이가 사자 머리 문고리를 잡고 두드리는 장면, 뒤로 뾰족한 탑이 늘어선 커다란 성. 〔이 쪽에 실린 글 (9/15) — 그림에 글자는 넣지 마세요. 왼쪽: 마차는 넓은 길을 달렸습니다. 길 끝에 커다란 성이 서 있었지요. 임금님이 또 물었습니다. 저 성은 누구 것인가? / 오른쪽: 성의 주인은 마법을 부리는 거인이었습니다. 고양이는 마차보다 먼저 달렸지요. 숨이 턱에 찼지만 멈추지 않았습니다. 성문 앞에 서서 옷매무새를 가다듬었지요.〕 |
| `images/05-castle-2.webp` | **이미 있음** — 횃불 켜진 성 안 넓은 홀, 화려한 옷을 입은 마법사가 고개를 젖히고 껄껄 웃고, 장화 신은 고양이가 한 손을 내밀며 이야기하는 장면. 〔이 쪽에 실린 글 (10/15) — 그림에 글자는 넣지 마세요. 왼쪽: 커다란 문이 스르르 열렸습니다. 안에서 그림자가 쑥 나왔지요. 거인이 내려다보았지요. 천장에 닿을 만큼 컸습니다. 고양이가 무슨 일이냐. / 오른쪽: 소문을 듣고 여기까지 왔습니다. 무엇으로든 변하신다지요? 거인이 껄껄 웃었습니다. 웃음소리에 벽이 다 울렸지요.〕 |
| `images/05-castle-3.webp` | **이미 있음** — 같은 홀에서 마법사가 커다란 사자로 변해 포효하고, 고양이는 벽장 위로 뛰어올라 털을 곤두세운 채 놀라는 장면. 〔이 쪽에 실린 글 (11/15) — 그림에 글자는 넣지 마세요. 왼쪽: 이를테면 사자 같은 것도요? 그것쯤이야 쉽지. 거인의 몸이 부풀어 올랐습니다. 털이 돋고 갈기가 솟았지요. / 오른쪽: 고양이는 얼른 벽장 위로 뛰었습니다. 털이 곤두섰지요. 심장이 쿵쿵 뛰었습니다. 그래도 고양이는 태연한 척했지요. 수염을 쓱 쓸어 보이기까지 했습니다.〕 |

## 6장 · 아주 작은 쥐

| 파일명 | 장면 |
|---|---|
| `images/06-mouse.webp` | **이미 있음** — 같은 홀에서 마법이 반짝이며 흩어지고, 작은 쥐가 마룻바닥을 달리자 고양이가 앞발을 내려놓는 장면. 피 흘리는 묘사 없이 익살스럽게. 〔이 쪽에 실린 글 (12/15) — 그림에 글자는 넣지 마세요. 왼쪽: 사자가 다시 사람으로 돌아왔습니다. 고양이가 벽장에서 내려왔지요. 사자는 어차피 크니까요. 작은 것도 되십니까? / 오른쪽: 쥐 따위가 어렵겠느냐! 어디 잘 보아라! 몸이 쭉쭉 줄어들었습니다. 이내 작은 쥐가 되었지요. 쥐는 마룻바닥을 쪼르르 달렸습니다.〕 |
| `images/06-mouse-2.webp` | **← 이 한 장만 새로 그리면 됩니다.** A booted cat flinging open a huge castle gate with both paws to welcome a royal carriage that has just pulled up, and beyond the gate a bright hall with a long banquet table already laid, the king gaping in amazement, the young man quietly overwhelmed, comic and warm. 〔이 쪽에 실린 글 (13/15) — 그림에 글자는 넣지 마세요. 왼쪽: 고양이는 성문으로 달려갔습니다. 마차가 막 도착한 참이었지요. 고양이가 두 손으로 문을 활짝 열었습니다. 어서 오십시오, 임금님! / 오른쪽: 성 안은 눈부셨습니다. 긴 식탁에 상이 그득 차려져 있었지요. 거인이 손님을 부른 참이었거든요. 자, 드시지요.〕 |

## 7장 · 진짜 후작이 되다

| 파일명 | 장면 |
|---|---|
| `images/07-wedding.webp` | A candlelit banquet corner where a princess and a plain young man talk quietly, she glancing at his work-worn hands with a knowing smile, the feast bustling behind them, warm and tender. 〔이 쪽에 실린 글 (14/15) — 그림에 글자는 넣지 마세요. 왼쪽: 잔치가 무르익었습니다. 공주와 막내는 이야기를 나눴지요. 막내는 말재주가 없었습니다. 대신 거짓말도 하지 않았지요. 저는 방앗간에서 자랐습니다. / 오른쪽: 알고 있었어요. 손을 보면 알거든요. 막내는 얼굴이 화끈했지요.〕 |
| `images/07-wedding-2.webp` | A banquet hall where a young man stands to confess his true origins, the hall hushed then the king laughing warmly, and in a sunny window seat the cat pulling off its boots to nap, funny and warm. 〔이 쪽에 실린 글 (15/15) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님이 잔을 들었습니다. 후작, 내 딸을 부탁하네. 막내는 자리에서 일어섰지요. / 오른쪽: 그래도 눈은 똑바로 들었지요. 저는 방앗간 집 막내입니다. 홀이 조용해졌습니다. 임금님이 한참 있다 웃었지요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
