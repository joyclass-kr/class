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
bold clean outlines, saturated storybook colors, warm lamplight and cool night
blues, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a 19th-century nursery, city gutters,
canals and rooftops seen from a toy's low viewpoint, expressive faces, wide
panoramic composition, tender and never grim.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The tin soldier: a small painted tin figure in a blue and red uniform with a
musket, standing on one leg, calm and steady. The paper ballerina: a cut-paper
dancer in a white gauze skirt with a spangle at her waist, poised on one toe.
The jack-in-the-box goblin: a grinning black-hatted spring toy. A large fish and
a curious kitchen maid appear along the way.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a one-legged tin soldier standing at attention on a wooden windowsill at night, a paper ballerina on a toy castle behind him, city rooftops and a big moon beyond the glass, warm nostalgic light. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 다리가 하나뿐인 병정

| 파일명 | 장면 |
|---|---|
| `images/01-soldier.webp` | A nursery table where a child unpacks a long box of twenty-five tin soldiers in blue and red uniforms and lines them up, low toy-level viewpoint, warm lamplight. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 아이가 생일 선물을 받았습니다. 기다란 상자 하나였지요. 뚜껑을 열자 장난감 병정이 가득했습니다. 모두 스물다섯이었지요. 주석을 녹여 만든 병정들이었습니다. 옛날 숟가락 하나로 만든 형제들이었지요. / 오른쪽: 푸른 웃옷에 붉은 바지를 입고 있었습니다. 어깨에는 총을 척 메고 있었지요. 아이는 병정들을 탁자에 죽 세웠습니다. 그런데 마지막 하나가 좀 달랐지요. 다리가 한쪽뿐이었던 것입니다. 어? 이 병정은 왜 이래?〕 |
| `images/01-soldier-2.webp` | A one-legged tin soldier standing firmly at the end of a row of soldiers on a table full of toys, a child leaving the room, warm lamplight, tender. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 주석이 모자라 미처 다 만들지 못한 것이었습니다. 마지막에 부은 병정이었거든요. 그래도 그 병정은 잘 서 있었습니다. 한 다리로도 꼿꼿했지요. 오히려 누구보다 씩씩한 얼굴이었습니다. 한참 놀다 자러 들어갔지요. 방에는 장난감들만 남았습니다. / 오른쪽: 장난감들이 병정 둘레를 돌며 놀렸습니다. 다리 하나로 뭘 할 수 있겠어? 병정은 가만히 서 있었지요.〕 |

## 2장 · 종이 무희

| 파일명 | 장면 |
|---|---|
| `images/02-ballerina.webp` | A paper castle on a table with a mirror lake and a cut-paper ballerina poised on one toe in a white gauze skirt with a spangle, candlelight and long shadows. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 탁자 저편에 종이로 만든 성이 있었습니다. 창문마다 얇은 종이가 발려 있었지요. 성 앞에는 작은 호수도 만들어 두었습니다. 거울 조각으로 만든 호수였지요. 그 앞에 종이 무희가 서 있었습니다. 하얀 치마가 나풀나풀했지요. 어깨에는 파란 띠를 둘렀습니다. 허리에는 반짝이가 하나 달려 있었지요. / 오른쪽: 무희는 한 발로 사뿐히 서 있었습니다. 병정은 그 모습에서 눈을 뗄 수 없었지요. 가슴이 이상하게 두근거렸습니다. 이런 마음은 처음이었지요. '저 사람도 나처럼 다리가 하나인가 보다.'〕 |
| `images/02-ballerina-2.webp` | A one-legged tin soldier peeking from behind a snuffbox at a paper ballerina on her castle across a tabletop, soft candlelight, tender and wistful. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병정은 속으로 생각했습니다. 저 아이도 다리가 하나구나. 나와 똑같네. / 오른쪽: 하지만 무희는 성에 살았습니다. 병정은 상자에 스물넷과 함께 사는 처지였지요. 그래도 인사는 해 보고 싶구나. 병정은 한참을 망설였지요. 병정은 코담뱃갑 뒤에 몸을 숨겼습니다. 그러고는 밤새 무희를 지켜보았지요.〕 |

## 3장 · 창밖으로

| 파일명 | 장면 |
|---|---|
| `images/03-fall.webp` | A grinning black-hatted goblin springing up from a snuffbox at midnight and shaking a fist at a calm one-legged tin soldier, comic and eerie but not scary. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 밤이 깊어 열두 시가 되었습니다. 그때 코담뱃갑 뚜껑이 탁 열렸지요. 까만 모자를 쓴 도깨비 인형이 튀어나왔습니다. 용수철이 달린 장난감이었지요. 이봐, 병정! / 오른쪽: 너는 남의 것을 넘보지 마라! 병정은 못 들은 척 앞만 보았습니다. 도깨비 인형이 발끈했지요. 내일 두고 보자!〕 |
| `images/03-fall-2.webp` | A tin soldier tumbling from a third-floor windowsill toward cobblestones and landing head-down with his musket stuck between the stones, dramatic and comic. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아침이었습니다. 누가 병정을 창턱에 올려놓았지요. 창문이 활짝 열려 있었습니다. 병정은 바깥 거리를 내려다보았지요. 마차와 사람들이 저 아래로 오갔습니다. 그런데 갑자기 바람이 세게 불었습니다. 병정은 그대로 창밖으로 굴러떨어졌지요. 삼 층 아래로 떨어졌습니다. / 오른쪽: 길바닥에 총이 먼저 꽂혔지요. 병정은 총을 짚은 채 거꾸로 박혔습니다. 아이가 뛰어 내려와 여기저기 찾았지요. 하지만 끝내 찾지 못하고 돌아갔지요. 병정은 소리쳐 부를 수도 없었습니다. 여기예요 하고 외치고 싶었지만요.〕 |

## 4장 · 종이배를 타고

| 파일명 | 장면 |
|---|---|
| `images/04-boat.webp` | Two children folding a newspaper boat and setting a tin soldier inside, launching it down a rain-swollen street gutter, cobblestones towering, lively. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 곧 비가 쏟아지기 시작했습니다. 길에 빗물이 콸콸 흘렀지요. 비가 그치자 아이 둘이 지나갔습니다. 어, 여기 병정이 있네! / 오른쪽: 아이들은 신문지로 배를 접었습니다. 그 안에 병정을 세워 넣었지요. 그러고는 도랑 물에 띄웠습니다. 종이배가 쏜살같이 떠내려갔지요. 아이들은 손뼉을 치며 따라 뛰었지요.〕 |
| `images/04-boat-2.webp` | A folded newspaper boat spinning and taking on water in a rushing gutter with a tiny tin soldier standing upright inside, a dark drain mouth ahead, thrilling. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 물살이 점점 빨라졌습니다. 배가 빙글빙글 돌았지요. 물이 뱃전을 넘어 들어왔습니다. 종이가 축축하게 젖어 갔지요. 그래도 병정은 꼿꼿하게 서 있었습니다. 총을 든 손도 그대로였지요. 눈 하나 깜짝하지 않았습니다. 물이 무릎까지 차올랐지요. / 오른쪽: 나는 병정이니까. 아이들의 목소리가 점점 멀어졌지요. 이윽고 아무 소리도 들리지 않았습니다. 앞쪽에 컴컴한 구멍이 보였지요. 물이 그리로 빨려 들어가고 있었습니다.〕 |

## 5장 · 어두운 물길

| 파일명 | 장면 |
|---|---|
| `images/05-tunnel.webp` | A dark stone drain tunnel where a paper boat rushes past a scolding water rat while a tin soldier grips his musket, dramatic and eerie. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 도랑은 컴컴한 굴속으로 이어졌습니다. 배가 그 안으로 빨려 들어갔지요. 사방이 새까맸습니다. 아무것도 보이지 않았지요. 병정은 그대로 굳었습니다. 물소리만 벽에 울렸지요. 그때 어디선가 소리가 났지요. 커다란 쥐 한 마리가 나타났습니다. / 오른쪽: 통행세를 내라! 통행세 없이는 못 지나간다! 병정은 대답 대신 총을 꽉 쥐었지요. 배는 쥐를 지나쳐 쏜살같이 떠내려갔습니다. 쥐가 물속으로 뛰어들어 뒤를 쫓았지요.〕 |
| `images/05-tunnel-2.webp` | A bright tunnel mouth where water pours out like a waterfall into a canal, a paper boat plunging over the edge with a tin soldier standing firm, dramatic. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 쥐가 뒤에서 소리를 질렀습니다. 저놈을 잡아라! 세를 안 냈다! 물살은 점점 더 빨라졌지요. 멀리 앞쪽이 환해졌습니다. 굴이 끝나는 곳이었지요. / 오른쪽: 굴 끝에서 물이 폭포처럼 떨어지고 있었지요. 배는 그대로 곤두박질쳤습니다. 병정은 총을 놓지 않았지요. 몸이 물속으로 잠겼습니다. 종이배는 이미 흐물흐물해져 있었지요. 햇빛이 물 위에서 일렁였습니다.〕 |

## 6장 · 물고기 뱃속

| 파일명 | 장면 |
|---|---|
| `images/06-fish.webp` | A large fish swallowing a tiny tin soldier in murky green canal water as a soggy paper boat sinks behind, dramatic underwater light. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 종이배는 물을 먹고 스르르 가라앉았습니다. 병정도 함께 물속으로 잠겼지요. 푸른 물이 사방을 감쌌습니다. 병정은 아래로 아래로 내려갔지요. 그때 앞이 갑자기 캄캄해졌습니다. 커다란 물고기가 입을 쩍 벌린 것이었지요. / 오른쪽: 병정은 그대로 뱃속으로 들어갔습니다. 안은 굴속보다도 캄캄했지요. 게다가 몹시 비좁았습니다. 그래도 병정은 어깨를 폈지요. 총끝이 물고기 배에 닿았습니다. 어디에 있든 나는 병정이니까. 병정은 그렇게 되뇌었습니다.〕 |
| `images/06-fish-2.webp` | A fish caught in a net and carried to a market, then a kitchen where a maid slices it open and gasps at a tin soldier inside, bright and surprising. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 물고기는 이리저리 헤엄쳤습니다. 몸이 흔들릴 때마다 병정도 흔들렸지요. 그러다 갑자기 물고기가 멈췄습니다. 몸이 위로 쭉 끌려 올라갔지요. 어부의 그물에 걸린 것이었습니다. 물고기는 시장으로 팔려 갔지요. / 오른쪽: 어느 집 부엌으로 들어갔습니다. 하녀가 도마 위에 물고기를 올려놓았지요. 칼을 들어 배를 갈랐습니다. 그 순간 하녀가 소리를 질렀지요. 칼끝에 딱딱한 것이 걸렸거든요. 어머나! 이게 웬 병정이야? 물고기 뱃속에서 병정이 나온 것이었지요.〕 |

## 7장 · 돌아온 자리

| 파일명 | 장면 |
|---|---|
| `images/07-return.webp` | A maid carrying a rescued tin soldier into a familiar nursery where a delighted child recognises it, the same window in the background, joyful homecoming. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 하녀는 병정을 두 손으로 집어 들었습니다. 물기를 닦고 이리저리 살펴보았지요. 다리가 하나밖에 없네. 하녀는 병정을 들고 방으로 갔습니다. / 오른쪽: 병정이 살던 바로 그 집이었습니다. 창밖으로 떨어졌던 그 창문도 그대로였지요. 아이가 달려와 병정을 받아 들었습니다. 내 병정이잖아! 어디 갔었어? 아이는 병정을 탁자 위에 올려놓았지요. 형제 병정들 옆자리였습니다.〕 |
| `images/07-return-2.webp` | A one-legged tin soldier set back on a nursery table facing a paper ballerina on her castle across the tabletop, warm lamplight, tender and quiet. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병정은 둘레를 살펴보았습니다. 장난감들이 그대로 있었지요. 종이 성도 그 자리에 있었습니다. 그 앞에 종이 무희가 서 있었지요. 여전히 한 발로 사뿐히 서 있었습니다. 병정은 가슴이 뜨거워졌지요. / 오른쪽: 먼 길을 돌아 다시 만난 것이었습니다. 하지만 아무 말도 하지 못했지요. 병정은 그저 무희를 바라보았습니다. 무희도 병정 쪽을 보는 것 같았지요. 치맛자락이 조금 흔들렸습니다.〕 |

## 8장 · 작은 주석 심장

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A hearth fire where a small tin soldier glows red-hot but stands straight with his musket, still facing the paper ballerina across the room, moving. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그런데 그때 한 아이가 다가왔습니다. 무슨 생각이었는지 알 수 없었지요. 아이는 병정을 집어 들었습니다. 그러고는 난롯불에 툭 던져 버렸지요. 아마 도깨비 인형의 심술이었을지도 모릅니다. 병정의 몸이 발갛게 달아올랐습니다. / 오른쪽: 온몸이 뜨거웠지요. 그래도 병정은 총을 놓지 않았습니다. 어깨도 그대로 펴고 있었지요. 눈은 무희 쪽을 향해 있었습니다. 한 번도 눈을 떼지 않았지요. 주석이 조금씩 녹아내렸습니다.〕 |
| `images/08-ending-2.webp` | A paper ballerina drifting into a hearth to land beside a tin soldier in the glow, and a hand next morning lifting a tiny tin heart and a blackened spangle from the ashes. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 문이 열리며 바람이 불어왔습니다. 종이 무희가 사뿐 떠올랐지요. 무희는 날아와 병정 곁에 내려앉았지요. 둘은 나란히 불빛 속에 있었습니다. 아주 잠깐이었지만 함께였지요. / 오른쪽: 이튿날 아침이었지요. 하녀가 난로의 재를 치웠습니다. 그러다 무언가를 발견했지요. 작은 주석 하트가 하나 있었습니다. 그 옆에는 새까맣게 그을린 반짝이가 있었지요. 하녀는 그 둘을 오래 들여다봤답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
