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
bold clean outlines, saturated storybook colors, soft lantern light and misty
garden greens, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), an imperial Chinese porcelain
palace, blossom gardens, a forest by the sea and a fisherman's boat, expressive
faces, wide panoramic composition, beautiful and gentle.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The nightingale: a small plain grey-brown bird with bright eyes, unremarkable to
look at. The emperor: an elderly man in embroidered silk robes with a kind
worn face. The chief courtier: a fussy official in tall hat and stiff robes,
comic. The kitchen maid: a small girl in simple clothes who knows the woods. The
mechanical bird: a jewelled clockwork bird glittering with rubies and sapphires.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small plain brown bird singing on a branch outside a magnificent porcelain palace at dusk, lanterns glowing in the windows and a garden of blossoms below, delicate and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 세상에서 가장 아름다운 궁궐

| 파일명 | 장면 |
|---|---|
| `images/01-palace.webp` | A magnificent porcelain palace with curved roofs surrounded by blossom gardens hung with silver bells, a great forest and the sea beyond, luminous and delicate. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 옛날 중국에 도자기로 지은 궁궐이 있었습니다. 기둥도 지붕도 모두 도자기였지요. 얼마나 고운지 먼 나라에서도 구경을 왔습니다. 다만 어찌나 얇은지 조심조심 걸어야 했지요. 뜰에는 은방울을 매단 꽃이 피어 있었습니다. 궁궐 뒤로는 크고 깊은 숲이 있었습니다. / 오른쪽: 숲 너머에는 바다가 있었지요. 그 숲에 작은 새 한 마리가 살았습니다. 어찌나 노래를 잘하는지 고기잡이도 일손을 놓곤 했지요. 잿빛에 몸집도 작은 밤꾀꼬리였지요. 저 소리를 들으면 힘든 것도 잊는다니까.〕 |
| `images/01-palace-2.webp` | An elderly emperor in embroidered silk robes reading a book on a palace terrace and looking up puzzled, lanterns and blossoms around him, warm evening light. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 먼 나라 사람들이 이 궁궐을 보고 책을 썼습니다. 그 책은 여러 나라로 퍼져 나갔지요. 그 책이 마침내 임금님 손에까지 들어왔습니다. 임금님은 흐뭇한 마음으로 책장을 넘겼습니다. 궁궐 이야기도 뜰 이야기도 칭찬뿐이었습니다. 임금님은 어깨가 으쓱해졌지요. / 오른쪽: 궁궐도 뜰도 훌륭하지만, 가장 훌륭한 것은 밤꾀꼬리다. 임금님이 고개를 갸웃했습니다. 밤꾀꼬리? 그런 게 우리 궁궐에 있었나?〕 |

## 2장 · 아무도 몰랐던 새

| 파일명 | 장면 |
|---|---|
| `images/02-search.webp` | A palace corridor in uproar as a fussy official in a tall hat questions bewildered courtiers who shrug and guess, comic and lively, lantern light. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 곧바로 신하를 불렀습니다. 밤꾀꼬리를 오늘 저녁까지 데려오너라. 못 데려오면 큰일 날 줄 알아라. / 오른쪽: 하지만 아는 사람이 아무도 없었습니다. 소 우는 소리 아닙니까? 개구리 소리 아닐까요? 신하는 애가 탔습니다.〕 |
| `images/02-search-2.webp` | A small kitchen girl in simple clothes raising her hand at the back of a crowded palace kitchen while a fussy official seizes her hands in relief, comic and warm. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 해가 기울도록 새를 찾지 못했습니다. 신하는 발을 동동 굴렀지요. 그때 부엌 쪽에서 작은 목소리가 났습니다. 부엌일을 하는 아이였습니다. / 오른쪽: 아이는 날마다 바닷가 어머니께 밥을 나르러 다녔습니다. 오가는 길에 그 노래를 들었던 것이지요. 아이는 그 소리가 참 좋았습니다. 신하는 아이의 손을 덥석 잡았습니다. 어서 안내해 다오! 신하는 아이를 앞세우고 숲으로 향했습니다.〕 |

## 3장 · 숲에서 온 손님

| 파일명 | 장면 |
|---|---|
| `images/03-nightingale.webp` | Richly dressed courtiers stumbling through a misty forest behind a small kitchen girl, mistaking a cow and a frog for the famous singer, very comic. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아이는 신하들을 데리고 숲으로 갔습니다. 비단옷을 입은 사람들이 줄줄이 따라나섰지요. 가다가 소가 음매 하고 울었습니다. 오, 저 소리로구나! 아이는 웃으며 고개를 저었습니다. / 오른쪽: 이번에는 개구리가 개굴개굴 울었지요. 이번에야말로 맞겠지! 저건 개구리예요.〕 |
| `images/03-nightingale-2.webp` | A misty forest where a small plain grey bird sings on a low branch while richly dressed courtiers stand transfixed, one wiping his eyes, a kitchen girl smiling, soft green light. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 아이가 걸음을 멈추었습니다. 쉿, 저기 있어요. 낮은 나뭇가지에 작은 새가 앉아 있었지요. 볼품없는 잿빛 새였습니다. / 오른쪽: 그러고는 노래를 부르기 시작했지요. 숲이 온통 조용해졌습니다. 신하들은 그 자리에 얼어붙었지요. 한 사람은 저도 모르게 눈물을 흘렸습니다. 이런 소리가 세상에 있었구나. 아이는 빙그레 웃었지요.〕 |

## 4장 · 궁궐의 밤

| 파일명 | 장면 |
|---|---|
| `images/04-court.webp` | A grand candlelit throne hall where a tiny plain bird sings from a golden perch, the whole court silent and rapt, silver bells and lanterns, beautiful and moving. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 밤꾀꼬리는 궁궐로 초대를 받았습니다. 작은 새는 낯선 곳이 조금 무서웠지요. 그날 저녁 궁궐에는 등불이 가득 켜졌지요. 은방울 꽃들이 딸랑딸랑 울렸습니다. 궁궐 사람들이 모두 모여 앉았습니다. 밤꾀꼬리는 금빛 횃대에 앉았지요. 작은 새가 임금님 앞에서 노래를 불렀습니다. / 오른쪽: 어떤 노래는 웃음이 나게 하고 어떤 노래는 눈물이 나게 했지요. 노래가 끝나자 궁궐이 쥐 죽은 듯 조용해졌습니다. 아무도 숨소리조차 내지 못했지요. 촛불만 조용히 흔들렸습니다. 궁녀들도 소매로 눈가를 눌렀습니다.〕 |
| `images/04-court-2.webp` | An emperor with tears on his cheeks offering a gold chain to a small bird that gently refuses, and the bird later in a gilded cage with a silk thread on its foot, bittersweet. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 임금님이 고개를 들었습니다. 뺨에 눈물이 흐르고 있었지요. 내가 이런 소리를 들어 본 적이 없구나. 임금님은 금목걸이를 상으로 주려 했습니다. / 오른쪽: 임금님의 눈물이면 저에게는 충분합니다. 그날부터 밤꾀꼬리는 궁궐에서 지냈습니다. 금빛 새장과 시중드는 사람이 딸렸지요. 하지만 밖에 나갈 때는 발에 실이 매였습니다. 밤꾀꼬리는 그것이 조금 슬펐습니다. 숲의 나뭇가지가 자꾸 생각났지요. 바람 냄새도 그리웠습니다.〕 |

## 5장 · 보석으로 만든 새

| 파일명 | 장면 |
|---|---|
| `images/05-machine.webp` | A dazzling jewelled clockwork bird lifted from a silk-wrapped box, courtiers gasping and crowding around it in a lantern-lit hall, glittering and gaudy. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 날 이웃 나라에서 선물이 왔습니다. 비단 보자기에 싸인 상자였지요. 뚜껑을 열자 사람들이 탄성을 질렀습니다. 온몸이 보석으로 뒤덮인 기계 새였거든요. 진짜 새와 크기가 꼭 같았습니다. 루비와 사파이어가 촘촘히 박혀 있었습니다. / 오른쪽: 태엽을 감으면 노래를 불렀지요. 세상에! 진짜 새보다 훨씬 곱구나! 기계 새는 몇 번을 시켜도 똑같이 불렀습니다. 한 음도 틀리는 법이 없었지요. 사람들은 그것을 더 훌륭하다고 여겼습니다.〕 |
| `images/05-machine-2.webp` | A crowd admiring a jewelled clockwork bird while at an open window a small plain bird slips out unnoticed into the dusk toward a dark forest, poignant. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 사람들은 두 새를 함께 부르게 해 보았습니다. 그런데 노래가 도무지 맞지 않았지요. 진짜 새는 부를 때마다 다르게 불렀거든요. 저 새는 제멋대로구나. / 오른쪽: 서른세 번이나 같은 노래를 들었지요. 아무도 창가를 돌아보지 않았습니다. 그사이 진짜 밤꾀꼬리는 창밖으로 날아가 버렸지요. 숲으로 돌아간 것이었습니다. 임금님은 화가 나서 그 새를 나라 밖으로 내쫓으라고 했습니다. 빈 횃대가 그대로 남았지요.〕 |

## 6장 · 뚝 멈춘 노래

| 파일명 | 장면 |
|---|---|
| `images/06-broken.webp` | A palace hall where a jewelled clockwork bird stops mid-song with a spring poking out and courtiers gasp in dismay, lantern light, comic alarm. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 기계 새는 밤낮없이 노래를 불렀습니다. 사람들은 그 노래를 모두 외워 버렸지요. 길에서도 흥얼거릴 정도였습니다. 그렇게 한 해가 지난 어느 날이었지요. 임금님이 잠자리에서 노래를 청했습니다. 기계 새가 여느 때처럼 노래를 시작했지요. / 오른쪽: 노래 도중에 뚝, 하는 소리가 났습니다. 이어서 드르륵 소리가 나더니 노래가 멈췄지요. 태엽 속 부품이 닳아 버린 것이었습니다. 궁궐 사람들이 새파랗게 질렸습니다. 임금님이 얼른 시계장이를 불렀지요. 방 안이 갑자기 너무 조용했습니다.〕 |
| `images/06-broken-2.webp` | A watchmaker peering through a lens at a jewelled bird's worn gears while the emperor and courtiers wait anxiously, then an empty silent hall, quiet and sad. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 솜씨 좋은 시계장이가 한참을 들여다보았습니다. 작은 톱니를 갈아 끼우고 기름을 쳤지요. 겨우 소리가 다시 나기는 했습니다. 하지만 시계장이는 고개를 저었습니다. 안이 많이 닳았습니다. / 오른쪽: 이제 일 년에 한 번만 부르게 하십시오. 그 말대로 하는 수밖에 없었지요. 궁궐은 그날부터 아주 조용해졌습니다. 기계 새는 유리 상자 안에 들어갔지요. 사람들은 노래가 있던 자리를 자꾸 돌아보았습니다. 그래도 숲의 새를 떠올리는 사람은 없었지요.〕 |

## 7장 · 임금님이 앓아눕다

| 파일명 | 장면 |
|---|---|
| `images/07-illness.webp` | A vast dim bedchamber where an elderly emperor lies alone in a huge bed, moonlight through an open window, distant courtiers whispering in a corridor, deeply lonely. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그로부터 몇 해가 지났습니다. 임금님이 병으로 자리에 눕고 말았지요. 얼굴이 하얗게 여위었습니다. 궁궐 사람들은 벌써 다음 임금 이야기를 했습니다. 복도에서 소곤거리는 소리가 들렸지요. 넓은 방에는 아무도 남지 않았습니다. 창이 열려 달빛만 들어왔지요. / 오른쪽: 임금님은 움직일 수가 없었습니다. 손끝 하나 까딱하기 힘들었지요. 가슴이 답답했지요. 누구라도 곁에 있어 주기를 바랐습니다. 그런데 발소리 하나 들리지 않았지요. 문밖 복도는 텅 비어 있었습니다.〕 |
| `images/07-illness-2.webp` | An old emperor gazing at a silent jewelled bird glinting coldly in moonlight beside his bed, his eyes closing as he remembers, deeply moving. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 머리맡의 기계 새를 바라보았습니다. 보석이 달빛에 차갑게 반짝였지요. 노래를 좀 불러 다오. 기계 새는 아무 소리도 내지 않았습니다. 태엽을 감아 줄 사람이 없었기 때문이지요. 임금님은 눈을 감았습니다. / 오른쪽: 지난 일들이 하나하나 떠올랐습니다. 숲에서 온 작은 잿빛 새도 떠올랐지요. 내가 그 새를 내쫓았구나. 임금님은 오래 그 생각을 했습니다. 밤이 몹시 길었지요. 창밖에서는 바람 소리만 났습니다.〕 |

## 8장 · 창가로 돌아온 노래

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A bedchamber at dawn where a small plain bird sings on the windowsill and colour returns to an old emperor's face as he sits up, first light spilling across the bed, warm and hopeful. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 창밖에서 노랫소리가 들려왔습니다. 맑고 고운 소리였지요. 임금님이 겨우 고개를 돌렸습니다. 창턱에 작은 잿빛 새가 앉아 있었습니다. 숲으로 갔던 밤꾀꼬리였지요. / 오른쪽: 임금님이 앓으신다는 말을 들었거든요. 밤꾀꼬리는 밤새 노래를 불렀습니다. 숲과 바다와 아침 이야기를 담은 노래였지요. 노래를 듣는 사이 임금님의 얼굴에 핏기가 돌았습니다. 아침에는 자리에서 일어나 앉을 수 있었지요. 창으로 아침 해가 들어왔습니다.〕 |
| `images/08-ending-2.webp` | An emperor sitting up in bed reaching a hand toward a small grey bird on the windowsill that then flies out toward a sunlit forest, serene and hopeful. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 새에게 손을 내밀었습니다. 내가 너를 내쫓았는데도 와 주었구나. 이 궁궐에서 살아 주겠느냐? / 오른쪽: 그게 서로에게 더 좋은 일이니까요. 다만 한 가지만 약속해 주세요. 제가 온다는 것은 비밀로 해 주세요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
