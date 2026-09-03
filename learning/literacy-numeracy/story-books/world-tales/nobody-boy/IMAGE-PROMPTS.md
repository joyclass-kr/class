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
bold clean outlines, saturated storybook colors, soft French countryside light,
ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), 19th-century French villages, country roads,
market squares, a coal mine and a river barge, expressive faces, wide panoramic
composition, warm and hopeful, never bleak.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Rémi: a boy about 10 with dark curls, a patched jacket and bare feet, later
carrying a small harp. Vitalis: a tall dignified old street musician with white
hair, a wide hat and a worn cloak. Capi: a clever white poodle. Zerbino and
Dolce: two smaller dogs. Joli-Coeur: a little monkey in a red jacket and cap.
Mother Barberin: a kind round-faced village woman in an apron.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a boy with a harp on his back walking a country road at dawn with two dogs and a small monkey in a red jacket, poplar trees lining the way and a village steeple far ahead, warm and hopeful. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 바르브랭 아주머니

| 파일명 | 장면 |
|---|---|
| `images/01-home.webp` | A humble French cottage kitchen with a copper pot on the fire where a round-faced woman in an apron tells stories to a small boy on her lap, evening light, tender. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 프랑스의 작은 시골 마을에 레미가 살았습니다. 머리가 곱슬곱슬하고 눈이 큰 아이였지요. 바르브랭 아주머니가 길러 주었지요. 집은 아주 가난했습니다. 그래도 부엌은 늘 따뜻했지요. 아궁이에는 구리 냄비가 걸려 있었습니다. 아주머니는 레미에게 늘 다정했지요. / 오른쪽: 오늘은 하나 더 먹으렴. 아주머니는 늘 제 몫을 레미 앞에 밀어 놓았습니다. 겨울이면 무릎에 앉히고 이야기를 들려주었습니다. 레미는 그 시간이 제일 좋았지요. 아버지는 멀리 파리에서 일했습니다.〕 |
| `images/01-home-2.webp` | A woman in an apron holding a boy tightly in a firelit cottage kitchen, both faces stricken, warm light and long shadows, deeply tender. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그러던 어느 날이었습니다. 아주머니가 레미를 꼭 끌어안았지요. 한참 동안 말이 없었습니다. 그러다 겨우 입을 열었지요. / 오른쪽: 길에 버려진 너를 우리가 데려온 거였어. 이제 그 사실을 알아야 할 때가 되었구나. 레미는 입술만 달싹였지요. 가슴이 이상하게 먹먹했습니다.〕 |

## 2장 · 비탈리스 할아버지

| 파일명 | 장면 |
|---|---|
| `images/02-vitalis.webp` | A village square where a dignified old street musician in a wide hat arrives with three dogs and a monkey in a red jacket, villagers crowding round, warm afternoon. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 얼마 뒤 마을에 낯선 사람이 들어왔습니다. 떠돌이 악사였지요. 흰 머리에 챙 넓은 모자를 쓰고 있었습니다. 망토는 낡았지만 걸음이 반듯했지요. 이름은 비탈리스라고 했습니다. 뒤에는 개 세 마리가 따랐지요. / 오른쪽: 흰 푸들 한 마리와 작은 개 두 마리였습니다. 어깨에는 원숭이가 앉아 있었지요. 빨간 웃옷을 입은 작은 원숭이였습니다. 마을 사람들이 우르르 모여들었지요. 레미도 그 틈에 끼어 구경했지요. 이런 구경거리는 처음이었습니다.〕 |
| `images/02-vitalis-2.webp` | An old musician speaking gently to a barefoot boy while a village woman wipes her eyes and nods, then the boy walking out of the village at dawn, moving. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 공연이 끝나자 노인이 레미를 보았습니다. 한참 동안 눈을 떼지 않았지요. 그러고는 아주머니와 이야기를 나누었습니다. 레미는 무슨 말인지 알 수 없었지요. 두 사람의 목소리가 자꾸 낮아졌지요. 아주머니가 앞치마 자락을 만지작거렸습니다. / 오른쪽: 얘야, 나와 함께 길을 가 보겠니? 레미는 아주머니를 돌아보았지요. 아주머니는 눈물을 닦고 있었습니다. 그러고는 천천히 고개를 끄덕였지요. 저분을 따라가거라. 그편이 낫겠구나.〕 |

## 3장 · 길 위의 식구들

| 파일명 | 장면 |
|---|---|
| `images/03-troupe.webp` | A sunny village market square where a white poodle counts on its paws and a monkey in a red jacket doffs its cap, delighted children crowding round, joyful. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 길 위의 하루하루는 고단했습니다. 아침이면 걷고 낮이면 공연을 했지요. 밤에는 헛간이나 나무 밑에서 잤습니다. 비가 오면 온몸이 젖었지요. 그래도 레미는 금세 식구들과 친해졌습니다. / 오른쪽: 털이 따뜻해서 추운 줄을 몰랐습니다. 흰 푸들 카피는 아주 똑똑했지요. 앞발로 셈까지 할 줄 알았습니다. 작은 개 제르비노와 돌체도 재주가 많았지요. 원숭이 졸리쾨르는 모자를 벗어 인사했습니다. 사람들이 그때마다 웃음을 터뜨렸지요. 이 아이들이 네 형제란다.〕 |
| `images/03-troupe-2.webp` | An old musician teaching a boy to play a small harp by a campfire and writing letters in the dust with a stick, dogs curled nearby, warm and tender. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 비탈리스 할아버지는 하프도 가르쳐 주었습니다. 처음에는 손끝이 아팠지요. 줄이 뜻대로 울리지 않았습니다. 그래도 레미는 밤마다 연습했지요. 손끝이 부르트고 딱지가 앉았지요. 그래도 줄을 놓지 않았습니다. / 오른쪽: 오늘은 소리가 좀 낫구나. 몇 달이 지나자 제법 소리가 났습니다. 할아버지는 글도 가르쳐 주었지요. 흙바닥에 나뭇가지로 글자를 썼습니다. 배워 두면 언젠가 쓸 데가 있단다.〕 |

## 4장 · 눈보라 치던 밤

| 파일명 | 장면 |
|---|---|
| `images/04-snow.webp` | A snowbound forest at night where an old man and a boy struggle through whirling snow with dogs, distant wolf howls, dramatic but not frightening. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 겨울이 오자 길이 훨씬 험해졌습니다. 사람들은 문을 닫고 나오지 않았지요. 공연을 해도 동전이 잘 모이지 않았습니다. 먹을 것이 자꾸 떨어졌지요. 어느 밤에는 눈보라를 만났습니다. 앞이 하나도 보이지 않았지요. / 오른쪽: 길을 잃고 숲속을 헤맸습니다. 멀리서 늑대 울음소리가 들렸지요. 개들이 낮게 으르렁거렸습니다. 레미는 겁이 나서 할아버지 옷을 붙잡았지요. 레미, 등을 맞대고 앉아라. 할아버지가 나직이 말했지요.〕 |
| `images/04-snow-2.webp` | A snowy hollow where an old man wraps his cloak around a boy while dogs press close and a monkey burrows into his coat, dawn glow at the horizon, moving. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 할아버지는 나무 밑 우묵한 곳을 찾았습니다. 거기 레미를 앉혔지요. 그러고는 제 외투를 벗었습니다. 그것을 레미에게 덮어 주었지요. 할아버지는 안 추우세요? / 오른쪽: 개들도 몸을 바짝 붙여 왔지요. 카피가 레미의 발치에 웅크렸습니다. 졸리쾨르는 품속으로 파고들었지요. 그렇게 다 함께 아침을 기다렸습니다. 눈은 밤새 그치지 않았지요.〕 |

## 5장 · 헤어짐

| 파일명 | 장면 |
|---|---|
| `images/05-parting.webp` | A cold city street before dawn where a boy and a frail old man huddle against a wall with their dogs, breath misting, pale winter light, tender and quiet. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 겨울 뒤로 할아버지가 자주 기침을 했습니다. 걸음도 눈에 띄게 느려졌지요. 그래도 공연은 그치지 않았습니다. 좀 쉬세요, 할아버지. 쉬면 굶는단다. / 오른쪽: 그런데 걸음이 자꾸 비틀거렸습니다. 레미가 얼른 팔을 붙들었지요. 어느 도시의 추운 새벽이었지요. 두 사람은 잘 곳이 없었습니다. 담벼락 아래에 앉았지요. 할아버지가 레미의 손을 잡았습니다. 손이 몹시 차가웠지요.〕 |
| `images/05-parting-2.webp` | A boy holding a white poodle and weeping beside a still old man wrapped in a cloak at dawn, the city waking around them, deeply moving but gentle. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 카피를 잘 돌보아라. 그 아이가 너를 지켜 줄 것이다. 그리고 어디서든 노래를 그치지 말아라. / 오른쪽: 그러고는 조용히 눈을 감았지요. 레미는 카피를 안고 한참을 울었습니다. 카피도 목을 길게 빼고 울었지요. 해가 뜨고 거리에 사람이 오갔습니다.〕 |

## 6장 · 물 위의 집

| 파일명 | 장면 |
|---|---|
| `images/06-barge.webp` | A canal barge with flower boxes moored under willow trees where a kind woman waves to a boy with a harp and a poodle, a pale child resting on deck, golden light. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 레미는 카피와 함께 길을 걸었습니다. 하프를 켜서 겨우 끼니를 이었지요. 어느 날 강가에 이르렀습니다. 버드나무가 늘어진 조용한 물가였지요. 물에서 시원한 바람이 불어왔지요. 레미는 발을 담그고 한참을 앉아 있었습니다. / 오른쪽: 거기 배 한 척이 매여 있었습니다. 창가에 꽃 화분이 놓인 배였지요. 부인 한 사람이 갑판에 나와 있었습니다. 곁에는 창백한 아이가 누워 있었지요. 오래 앓고 있는 아이였습니다. 부인이 레미를 불렀지요. 괜찮다면 우리 배에서 지내지 않겠니? 레미는 고개를 숙였지요.〕 |
| `images/06-barge-2.webp` | A boy playing a harp at a barge bow as the canal slips past, a pale child smiling from a deck chair and a woman wiping her eyes, golden afternoon. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 레미는 배에 올랐습니다. 오랜만에 지붕 아래에서 잤지요. 아침이면 뱃머리에 앉아 하프를 켰습니다. 강물이 천천히 흘러갔지요. 아픈 아이가 그 소리를 좋아했습니다. 한 번만 더 해 줘. / 오른쪽: 어느 날 그 아이가 처음으로 웃었지요. 부인이 눈물을 글썽였습니다. 네 덕분이구나. 레미도 마음이 따뜻해졌지요. 제 집이 생긴 것 같았습니다. 그렇게 여름이 지나갔지요.〕 |

## 7장 · 어두운 갱도

| 파일명 | 장면 |
|---|---|
| `images/07-mine.webp` | A coal-mining village with smoking chimneys, and a boy descending into a deep dark gallery with a lamp among miners, water dripping, atmospheric. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 가을이 되자 레미는 다시 길을 떠났습니다. 제 힘으로 살아 보고 싶었거든요. 한참을 걸어 광산 마을에 닿았지요. 굴뚝에서 검은 연기가 올랐습니다. 레미는 거기서 일자리를 얻었지요. 갱도는 땅속 깊이 뻗어 있었습니다. 등불 하나에 의지해 내려갔지요. / 오른쪽: 공기가 답답하고 물이 뚝뚝 떨어졌습니다. 광부들이 곡괭이로 벽을 쪼았지요. 깡, 깡, 깡. 소리가 굴 안에서 웅웅 울렸습니다.〕 |
| `images/07-mine-2.webp` | A dark flooded mine gallery lit by one lamp where miners and a boy sit against the rock, the boy singing softly, a faint pickaxe glow far down the tunnel, hopeful. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 물이다! 어서 위로! 하지만 길이 이미 막혔습니다. 레미와 광부들은 좁은 굴에 갇혔지요. 등불 하나만 겨우 남았습니다. / 오른쪽: 배가 고프고 몸이 떨렸습니다. 누군가 흐느끼기 시작했지요. 그때 레미가 조용히 노래를 불렀습니다. 어둠 속에 그 소리만 울렸지요. 열나흘 만에 곡괭이 소리가 들려왔습니다. 사람들이 서로를 얼싸안았지요.〕 |

## 8장 · 찾아낸 가족

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A rescue crew breaking through into a mine gallery and miners emerging into blinding daylight to cheering villagers, then strangers approaching a boy, hopeful. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 구조대가 벽을 뚫고 들어왔습니다. 레미와 광부들은 겨우 밖으로 나왔지요. 햇빛이 눈부셔 앞이 보이지 않았습니다. 마을 사람들이 몰려나와 손뼉을 쳤지요. 레미는 그 마을에서 한동안 지냈습니다. 얼굴에 묻은 검댕을 씻어 내는 데만 한참이 걸렸지요. 카피가 레미의 뺨을 자꾸 핥았습니다. / 오른쪽: 그러다 다시 길을 걷기로 했지요. 카피와 하프가 늘 함께였습니다. 어느 날 낯선 사람들이 레미를 찾아왔지요. 오래도록 레미를 찾아다녔다고 했습니다. 레미에게는 원래 어머니와 형제가 있었던 것이지요. 레미는 한참 동안 믿기지가 않았습니다.〕 |
| `images/08-ending-2.webp` | A bright garden gathering where a boy is embraced by his family, a village woman in an apron arriving at the gate and a white poodle bounding to meet her, joyful. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 레미는 새 식구들과 함께 지내게 되었습니다. 그런데 가장 먼저 한 일이 있었지요. 바르브랭 아주머니를 모셔 온 것이었습니다. 아주머니는 레미를 보고 한참을 울었지요. 카피도 물론 함께였습니다. / 오른쪽: 어느 저녁 레미가 하프를 꺼냈습니다. 뜰에 사람들이 둘러앉았지요. 할아버지가 그러셨어요. 어디서든 노래를 그치지 말라고요.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
