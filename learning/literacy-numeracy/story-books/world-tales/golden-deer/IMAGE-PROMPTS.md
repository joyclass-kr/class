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
bold clean outlines, saturated storybook colors, warm golden Indian forest light,
no text or letters in the image, an ancient Indian forest, a river, a royal park
and a palace of carved stone, expressive gentle faces, wide panoramic
composition, warm and never violent on screen.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The golden deer: a large stag with a shining golden coat and silver antlers,
calm and steady. The young doe: a slender deer with soft eyes, expecting a fawn.
The king: a broad man in white and gold Indian robes with a short beard, proud
but capable of change. The chief huntsman: a wiry man with a bow and a worried
face.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a magnificent deer with a golden coat and silver antlers standing in a sunlit Indian forest glade, other deer resting among ferns behind it, shafts of light through great trees, serene and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 숲의 우두머리

| 파일명 | 장면 |
|---|---|
| `images/01-forest.webp` | A lush Indian forest glade where a golden stag with silver antlers leads a large herd of deer to a stream, waiting for a small fawn at the back, dappled sunlight. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아주 오랜 옛날 인도의 큰 숲에서 있었던 일입니다. 그 숲에 사슴 무리가 살았지요. 수백 마리나 되는 큰 무리였습니다. 무리를 이끄는 사슴이 하나 있었지요. 털빛이 금처럼 빛나는 사슴이었습니다. 뿔은 은빛으로 반짝였지요. 사람들은 그 사슴을 황금 사슴이라 불렀습니다. / 오른쪽: 황금 사슴은 늘 앞장서 걸었지요. 물길과 풀밭을 먼저 찾아 주었습니다. 어린 사슴이 뒤처지면 걸음을 늦추었지요. 천천히 오너라. 아무도 두고 가지 않는다. 무리는 그 말을 늘 들으며 자랐지요.〕 |
| `images/01-forest-2.webp` | A peaceful Indian forest through the seasons with deer grazing, fawns playing and a golden stag watching from a high rock, warm golden light, serene. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 숲은 오래도록 평화로웠습니다. 봄이면 새싹이 돋았지요. 여름이면 강물이 시원했습니다. / 오른쪽: 어미들은 그늘에서 새끼를 돌보았습니다. 황금 사슴은 늘 높은 바위에 올라 있었지요. 숲 어디에 무슨 일이 있는지 살폈습니다. 무리는 그 사슴을 아주 믿었지요. 그런 날이 오래 이어질 줄 알았지요. 하지만 그렇지 않았습니다.〕 |

## 2장 · 사냥이 시작되다

| 파일명 | 장면 |
|---|---|
| `images/02-hunt.webp` | A forest edge in uproar as horns sound and hunters on horseback advance, deer scattering through ferns, a golden stag rearing on a rock, tense but not gory. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그러던 어느 날이었습니다. 숲 밖에서 나팔 소리가 울렸지요. 임금님이 사냥을 나온 것이었습니다. 말발굽 소리가 땅을 울렸지요. 사냥꾼들이 숲을 빙 에워쌌습니다. 황금 사슴이 바위에서 벌떡 일어섰지요. / 오른쪽: 모두 흩어져 달아나라! 사슴들이 사방으로 뛰었습니다. 덤불이 사정없이 찢겼지요. 어린 사슴들은 어미를 잃고 헤맸습니다. 숲이 온통 뒤집혔지요.〕 |
| `images/02-hunt-2.webp` | A quiet forest at dusk where a golden stag tends injured deer through the night, and then walks out alone at dawn toward a distant palace, solemn. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 해가 질 무렵 사냥이 끝났습니다. 숲은 다시 조용해졌지요. 그런데 여기저기서 신음 소리가 났습니다. 여러 마리가 다치고 말았지요. 황금 사슴은 밤새 무리를 돌보았습니다. 상처를 핥아 주고 자리를 봐 주었지요. / 오른쪽: 날이 밝을 무렵 황금 사슴이 중얼거렸습니다. 이대로는 다 죽고 만다. 쫓기다 다치는 것이 더 무섭구나.〕 |

## 3장 · 임금님 앞에서

| 파일명 | 장면 |
|---|---|
| `images/03-king.webp` | A golden stag walking through villages and into a carved stone palace courtyard between rows of astonished guards, sunlight on pillars, awe-struck. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 황금 사슴은 궁궐로 향했습니다. 들을 지나고 마을을 지났지요. 사람들이 그 모습을 보고 놀랐습니다. 저것 좀 봐! 금빛 사슴이야! / 오른쪽: 황금 사슴은 그대로 안으로 들어갔지요. 병사들이 창을 겨누었습니다. 그래도 사슴은 멈추지 않았지요. 뜰 한가운데까지 곧장 걸어갔습니다. 임금님이 놀라 자리에서 일어섰지요. 손에 든 잔을 떨어뜨렸습니다.〕 |
| `images/03-king-2.webp` | A golden stag speaking calmly before a king who has risen from his throne in astonishment, courtiers holding their breath, morning light on stone. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 짐승이 어찌 사람처럼 걸어 들어오느냐? 황금 사슴이 고개를 숙였습니다. 드릴 말씀이 있어 왔습니다. / 오른쪽: 하루에 사슴이 몇 마리나 필요하십니까? 임금님이 활을 슬며시 내렸지요. 한 마리면 넉넉하다만.〕 |

## 4장 · 이상한 약속

| 파일명 | 장면 |
|---|---|
| `images/04-promise.webp` | A palace hall where a king listens intently to a golden stag and slowly nods in agreement, courtiers watching in silence, solemn and warm. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 쫓기다 흩어져 죽는 것보다 낫지요. 사냥을 하시면 열 마리가 다칩니다. 한 마리로 아홉을 살릴 수 있습니다. / 오른쪽: 그렇습니다. 대신 숲을 함부로 짓밟지는 말아 주십시오. 임금님은 천천히 고개를 끄덕였지요.〕 |
| `images/04-promise-2.webp` | A forest clearing where deer quietly agree and draw lots, and a hushed dawn where the whole herd stands silently to see one of them off, solemn and moving. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 황금 사슴은 무리에게 그 이야기를 했습니다. 사슴들은 한참 동안 아무 말도 못 했지요. 그러다 하나둘 고개를 끄덕였습니다. 그편이 낫겠어요. / 오른쪽: 아무도 쫓기지 않았지요. 숲에는 다시 조용한 날들이 이어졌습니다. 풀밭에서 어린 사슴들이 뛰어놀았지요. 다만 차례가 돌아오는 아침만은 달랐습니다. 모두 말없이 배웅을 나갔지요. 떠나는 사슴은 뒤를 돌아보지 않았습니다.〕 |

## 5장 · 어린 어미 사슴

| 파일명 | 장면 |
|---|---|
| `images/05-doe.webp` | A quiet forest hollow at dawn where a slender doe heavy with fawn approaches a golden stag with lowered head, ferns all around, gentle and moving. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그렇게 여러 날이 지났습니다. 어느 날 아침 차례가 된 사슴이 있었지요. 아주 어린 암사슴이었습니다. 눈이 크고 몸이 가늘었지요. 그런데 배가 불룩했습니다. 곧 새끼를 낳을 몸이었거든요. 암사슴은 한참을 망설였습니다. / 오른쪽: 제 차례를 하루만 미룰 수 있을까요? 새끼를 낳고 나서 가고 싶습니다. 목소리가 가늘게 떨렸지요. 황금 사슴은 한참 그 사슴을 보았습니다.〕 |
| `images/05-doe-2.webp` | A golden stag asking the herd for a volunteer while every deer looks away, then blocking the doe's path as she starts to leave, tense and moving. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 황금 사슴은 무리를 둘러보았습니다. 오늘 대신 갈 사슴이 있느냐? 사슴들은 저마다 고개를 돌렸지요. 누구도 선뜻 나서지 못했습니다. 숲이 아주 조용해졌지요. / 오른쪽: 아무도 눈을 마주치지 않았습니다. 제가 가겠습니다. 괜한 말씀을 드렸습니다.〕 |

## 6장 · 스스로 걸어간 길

| 파일명 | 장면 |
|---|---|
| `images/06-walk.webp` | A golden stag lifting his head in morning light to announce he will go, the herd surging in protest, an old deer stepping forward, deeply moving. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 황금 사슴은 조용히 고개를 들었습니다. 아침 햇살이 금빛 털에 내려앉았지요. 오늘은 내가 가겠다. 무리가 크게 술렁였습니다. 늙은 사슴이 앞으로 나섰지요. / 오른쪽: 우두머리가 가시면 저희는 어떡합니까! 황금 사슴은 빙그레 웃었습니다. 내가 가지 않으면 어찌 되겠느냐.〕 |
| `images/06-walk-2.webp` | A long forest path at sunrise where a golden stag walks away alone toward a distant palace while the whole herd stands motionless watching, long shadows. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아무도 더 말하지 못했습니다. 암사슴은 그 자리에 주저앉았지요. 안 됩니다. 제가 가겠습니다. 황금 사슴은 고개를 저었습니다. / 오른쪽: 천천히, 그러나 멈추지 않고 걸었습니다. 무리는 그 자리에 서서 지켜보았지요. 아무도 그 걸음을 막지 못했습니다. 금빛 등이 나무 사이로 멀어졌지요. 숲에는 새소리 하나 나지 않았습니다. 암사슴은 오래 울었지요.〕 |

## 7장 · 임금님의 물음

| 파일명 | 장면 |
|---|---|
| `images/07-question.webp` | A palace courtyard where a barefoot king hurries out to face a golden stag standing calmly, guards astonished, morning light on stone. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 아침 궁궐 뜰이 술렁였습니다. 금빛 사슴이 서 있었으니까요. 병사가 얼른 임금님께 알렸지요. 임금님이 맨발로 달려 나왔습니다. 어찌 그대가 왔느냐. / 오른쪽: 나는 그대를 원한 적이 없다. 황금 사슴은 조용히 대답했지요. 오늘 차례인 사슴은 곧 어미가 됩니다.〕 |
| `images/07-question-2.webp` | A king standing shaken before a golden stag in a hushed courtyard, courtiers bowing their heads, the king's eyes reddening, deeply moving. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 한참을 말하지 못했습니다. 손이 부들부들 떨렸지요. 그대는 우두머리가 아니냐. 다른 사슴을 보내면 되지 않느냐. / 오른쪽: 제가 지지 않으면 누가 지겠습니까. 뜰이 물을 끼얹은 듯 조용해졌지요. 신하들도 고개를 숙였습니다. 임금님의 눈시울이 붉어졌지요. 내가 부끄럽구나. 임금님이 나직이 말했습니다.〕 |

## 8장 · 숲이 열린 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A palace courtyard where a king lays down his bow before a golden stag, the bow clattering on stone, courtiers murmuring, generous and moving. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 임금님이 입을 열었습니다. 그대는 짐승인데 사람보다 낫구나. 나는 사람이면서 짐승만도 못했다. / 오른쪽: 이제 이 나라에서는 사슴을 잡지 않겠다. 돌아가거라. 신하들이 술렁였지요.〕 |
| `images/08-ending-2.webp` | A king promising to protect all creatures as a golden stag bows deeply, then the stag returning to a forest where the whole herd rushes joyfully to meet him. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 사슴은 이제 안전합니다. 그럼 새는 어찌합니까? 물고기와 다른 짐승들은요? / 오른쪽: 이 나라의 모든 목숨을 지키겠다. 황금 사슴은 깊이 고개를 숙였습니다. 그러고는 숲으로 돌아갔지요. 무리가 달려 나와 그를 맞았습니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
