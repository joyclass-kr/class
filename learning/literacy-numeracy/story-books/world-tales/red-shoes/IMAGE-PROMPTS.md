# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
16개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **⚠️ 다시 그려 주실 것 (2026-09-03)**
> - `cover` — 지금 파일에 **파란 군복을 입은 늙은 병사**가 그려져 있습니다.
>   그 인물은 안데르센 원작에는 나오지만 **이 책에는 나오지 않습니다.** 우리 책에
>   나오는 사람은 카렌, 할머니, 구둣방 주인, 숲속 나무꾼의 아내뿐입니다.
>   주문서에 적힌 대로 **사람은 한 명도 넣지 말고**, 달빛 어린 마을 광장에 빨강 구두
>   한 켤레만 놓인 그림으로 다시 그려 주세요.

> **그림 놓는 자리 (2026-09-03)**
> 파일은 1376×768로 주시는데 화면의 그림칸은 약 2.13:1이라 **위아래가 잘립니다.**
> 위 61px, 아래 61px을 하늘이나 바닥 같은 **빈 띠**로 두세요. 얼굴·손·발이 그 안에
> 들어가면 잘려 나갑니다. 그림 안에 테두리나 가로줄은 그리지 마세요.
> (지금 파일 가운데 `01-barefoot`·`02-adopted`·`05-dance` 석 장이 띠 없이 꽉 차 있어
> 위아래로 61px씩 잘립니다. `05-dance`에는 흰 가로줄도 하나 들어가 있습니다.)
>
> 아직 없는 그림: `08-ending-2.webp`, `end.webp`

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
bold clean outlines, saturated storybook colors with one vivid red accent, warm
Danish village light, no text or letters in the image, a shoemaker's shop, a
village church, a country lane and a woodcutter's cottage, expressive faces, wide
panoramic composition, gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Karen: a girl about 10 with fair braids, first barefoot in a patched dress,
later in a neat dark dress with bright red shoes. The old lady: a kind
white-haired woman with spectacles and a lace collar. The shoemaker: a stooped
man with a leather apron and a curious half-smile. A woodcutter's wife: a sturdy
woman with kind eyes and flour on her hands.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover with NO PEOPLE IN IT AT ALL - no girl, no soldier, nobody: just a pair of bright red shoes standing alone in the middle of a moonlit village square, faint dancing footprints circling them, a small church and dark trees beyond, striking and slightly mysterious but not frightening. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 맨발의 아이

| 파일명 | 장면 |
|---|---|
| `images/01-barefoot.webp` | A poor Danish cottage doorway where a barefoot girl receives a pair of clumsy red cloth shoes from a kindly woman, delight on her face, spring mud and green fields. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카렌은 여름 내내 맨발로 다녔습니다. 신발을 살 돈이 없는 집이었지요. 그래도 카렌은 잘 웃는 아이였습니다. 흙길을 걸으면 발바닥이 따끔거렸지요. 겨울에는 나막신을 신었습니다. 나막신은 딱딱해서 발뒤꿈치가 벌겋게 부었습니다. 카렌은 그래도 내색하지 않았지요. / 오른쪽: 걸을 때마다 딱, 딱 소리가 났지요. 아이들이 그 소리를 듣고 돌아봤습니다. 마을에 마음씨 좋은 아주머니가 하나 있었습니다. 헌 헝겊을 이어 신을 만들어 주었지요. 빨간 헝겊을 이어 붙인 투박한 신이었습니다. 어머, 이렇게 예쁜 신은 처음이에요! 카렌은 그것을 신고 폴짝폴짝 뛰었습니다.〕 |
| `images/01-barefoot-2.webp` | A small girl treasuring her red cloth shoes at night, and later walking behind a funeral procession wearing them while villagers whisper, tender and sad. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카렌은 그 신을 아주 아꼈습니다. 흙이 묻을까 봐 조심조심 걸었지요. 자기 전에는 머리맡에 두고 보았습니다. 그런데 얼마 뒤 어머니가 몸져누웠지요. 카렌은 곁에서 밤을 새웠습니다. / 오른쪽: 어머니를 묻는 날이었습니다. 카렌은 그 빨간 헝겊 신을 신고 갔지요. 가진 신이 그것뿐이었으니까요. 사람들이 수군거렸습니다. 저런 날에 빨간 신이라니. 카렌은 고개를 푹 숙였습니다.〕 |

## 2장 · 할머니 댁으로

| 파일명 | 장면 |
|---|---|
| `images/02-adopted.webp` | A neat well-lit parlour where a white-haired lady in spectacles welcomes a small thin girl, a fire burning and books on the shelf, warm and comfortable. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 마을을 지나던 부인이 있었습니다. 머리가 하얗고 안경을 쓴 부인이었지요. 부인은 카렌을 오래 바라보았습니다. 작고 여윈 아이가 안쓰러웠거든요. 너 혼자 남았느냐? / 오른쪽: 우리 집에서 함께 살자꾸나. 카렌은 부인을 따라갔지요. 부인의 집은 따뜻하고 깨끗했습니다. 난롯불이 늘 타고 있었지요. 부인은 카렌에게 좋은 옷을 입혔습니다.〕 |
| `images/02-adopted-2.webp` | An old lady dropping a pair of worn red cloth shoes into a hearth fire while a girl watches silently from the doorway, firelight, quiet and telling. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 다만 한 가지가 마음에 걸렸습니다. 부인이 그 빨간 헝겊 신을 보았거든요. 이런 건 이제 필요 없단다. 부인은 그 신을 난롯불에 넣어 버렸지요. 카렌은 고개를 떨궜습니다. / 오른쪽: 카렌은 그 자리에 서서 오래 보았습니다. 가슴이 이상하게 답답했지요. 그날 밤 카렌은 잠이 오지 않았습니다. 자꾸 빨간 신이 떠올랐거든요. 그 뒤로도 그 색깔을 잊지 못했지요. 눈을 감으면 빨간빛이 어른거렸습니다.〕 |

## 3장 · 구둣방 창가에서

| 파일명 | 장면 |
|---|---|
| `images/03-shop.webp` | A shoemaker's shop with rows of shoes on shelves, a short-sighted old lady peering at the counter while a girl scans the display, leather and lamplight. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 날 부인이 카렌을 데리고 나섰습니다. 큰 행사가 있어 새 구두를 사려는 것이었지요. 두 사람은 마을 구둣방으로 갔습니다. 벽마다 구두가 죽 놓여 있었지요. 가죽 냄새가 코를 찔렀습니다. 부인은 눈이 몹시 어두웠습니다. 진열장을 잘 보지 못했지요. / 오른쪽: 네 마음에 드는 걸로 고르렴. 카렌은 하나씩 살펴보았습니다. 까만 구두는 어쩐지 마음이 가지 않았지요. 갈색 구두도 그랬습니다.〕 |
| `images/03-shop-2.webp` | A girl pointing at gleaming red leather shoes while a shoemaker smiles oddly and a short-sighted lady pays, the girl hugging the box on the way home, vivid. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 반짝반짝 윤이 나는 구두였습니다. 카렌은 눈을 뗄 수가 없었지요. 그 빨간 헝겊 신이 떠올랐습니다. 카렌은 조심스레 그것을 가리켰지요. 이걸로 할게요. / 오른쪽: 무언가 아는 듯한 웃음이었지요. 부인은 검은 구두인 줄 알고 값을 치렀습니다. 잘 골랐구나. 카렌은 그 구두를 품에 꼭 안았지요.〕 |

## 4장 · 온통 구두 생각

| 파일명 | 장면 |
|---|---|
| `images/04-church.webp` | A village church interior where a girl in a pew stares down at her bright red shoes while everyone else looks forward, sunlight catching only the shoes, telling. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 일요일 아침이 되었습니다. 카렌은 그 구두를 신고 예배당에 갔지요. 문을 들어서자 사람들이 돌아보았습니다. 눈길이 모두 발끝으로 모였지요. 카렌은 어깨가 으쓱해졌습니다. 자리에 앉아서도 발만 내려다보았지요. / 오른쪽: 앞에서 무슨 말을 하는지 들리지 않았습니다. 머릿속은 온통 빨간 구두 생각뿐이었지요. 내일은 어디에 신고 갈까. 사람들이 또 쳐다보겠지.〕 |
| `images/04-church-2.webp` | A girl polishing red shoes obsessively by a window while an old lady lies pale in bed behind her calling for water, neighbours at the door, telling and sad. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 집에 돌아와서도 마찬가지였습니다. 카렌은 구두만 닦고 또 닦았지요. 헝겊으로 문지르며 들여다보았습니다. 부인이 부르는 소리도 듣지 못했지요. 카렌아, 물 좀 다오. / 오른쪽: 기침이 심하고 얼굴이 파리했지요. 이웃 사람들이 걱정하며 찾아왔습니다. 곁을 잘 지켜 드려야 한다. 카렌은 건성으로 대답했지요.〕 |

## 5장 · 멈추지 않는 춤

| 파일명 | 장면 |
|---|---|
| `images/05-dance.webp` | A lantern-lit village square with musicians where a girl in red shoes slips in and begins to dance, villagers clapping, festive and warm. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 저녁 마을에 잔치가 열렸습니다. 광장에 등불이 걸리고 악사들이 모였지요. 카렌은 창밖을 내다보았습니다. 발이 근질근질했지요. 부인은 자리에 누워 잠들어 있었습니다. 카렌은 살그머니 구두를 신었지요. 그러고는 몰래 집을 빠져나갔습니다. 광장에 이르자 음악이 울렸지요. / 오른쪽: 그 순간 발이 저절로 움직였습니다. 카렌은 신이 나서 빙글빙글 돌았지요. 사람들이 손뼉을 쳐 주었지요. 카렌은 더욱 신이 났습니다. 치맛자락이 팽이처럼 돌았지요. 등불이 눈앞에서 어른거렸습니다.〕 |
| `images/05-dance-2.webp` | A girl carried away by her own dancing feet out of a village square and across a moonlit field toward dark woods, startled villagers behind, dramatic but not scary. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그런데 한 곡이 끝나도 발이 멈추지 않았습니다. 두 곡이 끝나도 마찬가지였지요. 어? 왜 이러지? 카렌은 발을 붙잡으려 했습니다. / 오른쪽: 카렌을 이끌고 광장 밖으로 나갔습니다. 사람들이 놀라 길을 비켰지요. 구두는 들판을 지나 숲으로 향했습니다. 달빛 아래를 밤새 춤추며 갔지요. 카렌은 숨이 턱까지 찼습니다. 나뭇가지가 얼굴을 스쳤지요. 그래도 발은 멈추지 않았습니다.〕 |

## 6장 · 벗겨지지 않는 구두

| 파일명 | 장면 |
|---|---|
| `images/06-stuck.webp` | A misty dawn field where an exhausted girl clings to a birch trunk tugging at one red shoe that will not come off, soft grey light, sad but gentle. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 새벽이 되어도 춤은 그치지 않았습니다. 옷은 이슬에 젖고 머리는 헝클어졌지요. 카렌은 나무를 붙잡았습니다. 그러고는 구두를 힘껏 잡아당겼지요. 하지만 구두는 발에 딱 붙어 있었습니다. 아무리 당겨도 꿈쩍하지 않았지요. / 오른쪽: 발이 저절로 또 움직였습니다. 제발…… 이제 그만하고 싶어. 카렌은 울먹였지요. 숲 위로 해가 뿌옇게 떠올랐습니다. 새들이 지저귀기 시작했지요.〕 |
| `images/06-stuck-2.webp` | A weeping girl dragged onward by her red shoes at sunrise, a soft memory of an old lady in bed appearing behind her, moving and gentle. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카렌은 그제야 부인을 떠올렸습니다. 자리에 누워 있던 얼굴이 눈에 밟혔지요. 아주머니가 편찮으신데. 나는 대체 뭘 한 거지. / 오른쪽: 그때 건성으로 대답했던 것도 떠올랐습니다. 카렌은 부끄러워서 견딜 수가 없었지요. 돌아가고 싶어요. 이 구두는 이제 필요 없어요.〕 |

## 7장 · 나무꾼의 오두막

| 파일명 | 장면 |
|---|---|
| `images/07-cottage.webp` | A woodcutter's cottage at sunrise where a sturdy floury-handed woman catches an exhausted girl and sits her on the step with a bowl of warm water, kind and warm. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 춤에 끌려간 곳은 숲속 빈터였습니다. 작은 오두막이 하나 서 있었지요. 굴뚝에서 연기가 오르고 있었습니다. 나무꾼 아주머니가 문을 열고 나왔지요. 손에 밀가루가 잔뜩 묻어 있었습니다. / 오른쪽: 아주머니는 카렌을 붙잡아 주었지요. 그러자 발이 잠시 멈췄습니다. 그러고는 카렌을 문지방에 앉혔지요. 따뜻한 물을 한 그릇 떠 왔습니다. 카렌은 그것을 단숨에 마셨지요. 그제야 숨이 돌아왔습니다. 손이 아직도 덜덜 떨렸지요.〕 |
| `images/07-cottage-2.webp` | Red shoes slipping off a girl's feet by themselves onto the grass beside a cottage step, the girl looking down at her bare feet with relief, warm morning. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아주머니가 구두를 내려다보았습니다. 그 구두, 정말로 벗고 싶으냐? 카렌은 망설임 없이 고개를 끄덕였지요. / 오른쪽: 구두가 스르르 발에서 벗겨졌습니다. 툭 소리를 내며 풀밭에 떨어졌지요. 카렌은 제 발을 내려다보았습니다. 맨발이 오히려 홀가분했지요. 고맙습니다, 아주머니. 아주머니는 빙그레 웃기만 했지요.〕 |

## 8장 · 다시 집으로

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A barefoot girl walking home along a stony lane at midday and pushing open a cottage door where an old lady lies quietly in bed, tender. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카렌은 맨발로 집을 향해 걸었습니다. 자갈에 발이 아팠지요. 그래도 마음은 오히려 가벼웠습니다. 해가 중천에 오를 무렵이었지요. 낯익은 지붕이 보였습니다. 굴뚝에는 연기가 없었지요. 카렌은 걸음을 빨리했습니다. / 오른쪽: 부인은 침대에 누워 있었지요. 카렌을 보자 천천히 고개를 돌렸습니다. 어디를 그렇게 다녀왔니. 목소리가 아주 작았지요. 카렌은 눈물이 왈칵 솟았습니다. 침대 곁에 무릎을 꿇었지요.〕 |
| `images/08-ending-2.webp` | A sunlit bedroom where a barefoot girl kneels holding an old lady's hand, and far off in a forest clearing a pair of red shoes lying forgotten in the grass. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카렌은 침대 옆에 무릎을 꿇었습니다. 죄송해요. 이제 곁에 있을게요. / 오른쪽: 카렌은 그날부터 부인의 곁을 지켰지요. 약을 달이고 죽을 끓였습니다. 얼마 뒤 부인은 자리에서 일어났지요. 두 사람은 오래오래 함께 지냈습니다. 빨간 구두는 숲속 풀밭에 그대로 남았지요. 카렌은 다시 그것을 찾지 않았답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
