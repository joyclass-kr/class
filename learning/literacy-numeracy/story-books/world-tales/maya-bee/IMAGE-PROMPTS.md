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
bold clean outlines, saturated storybook colors, sparkling summer light, no text
or letters in the image, a summer meadow, pond edge, tree hollow and beehive seen
from an insect's viewpoint, giant flowers and grass blades, expressive friendly
insect faces, wide panoramic composition, delightful and never scary.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Maya: a small round honeybee with big curious eyes, golden fuzz and translucent
wings. Kassandra: an older teacher bee with spectacles perched on her feelers.
Peppi: a lanky green grasshopper who never stops bouncing. Kurt: a solid brown
dung beetle in a stiff collar. Schnuck: a shimmering blue dragonfly. The hornets:
larger striped wasps, drawn stern rather than monstrous.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small bright-eyed honeybee hovering over a wide summer meadow full of poppies and cornflowers, dragonflies and grasshoppers among the stems below, dew catching the light, joyful and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 벌집을 나서다

| 파일명 | 장면 |
|---|---|
| `images/01-hive.webp` | The golden interior of a beehive with rows of hexagonal cells where a stern spectacled teacher bee instructs a small newly hatched bee, warm honey light. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 커다란 나무 속에 벌집이 하나 있었습니다. 수천 마리 꿀벌이 사는 집이었지요. 방마다 육각형 칸이 촘촘히 붙어 있었습니다. 어느 날 그곳에서 어린 벌이 깨어났지요. 이름은 마야였습니다. 눈이 크고 호기심이 많은 벌이었지요. 선생님 벌 카산드라가 마야를 맡았습니다. / 오른쪽: 더듬이에 안경을 걸친 늙은 벌이었지요. 카산드라는 규칙을 하나하나 일러 주었습니다. 꽃가루를 모아 오는 것이 우리 일이란다. 해가 지기 전에는 꼭 돌아와야 하고.〕 |
| `images/01-hive-2.webp` | A small bee raising her arm eagerly among rows of young bees while a spectacled teacher shakes her head, then lying awake alone at night by a hive doorway. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 앞발을 번쩍 들었습니다. 저 바깥에는 뭐가 있어요? 카산드라가 안경을 고쳐 썼지요. / 오른쪽: 하지만 속으로는 그렇지 않았지요. 오히려 더 궁금해졌거든요. 그날 밤 마야는 잠이 오지 않았습니다. 문틈으로 바람 냄새가 들어왔지요. 풀 냄새와 꽃 냄새가 섞여 있었습니다. 마야는 밤새 그 냄새를 맡았지요.〕 |

## 2장 · 첫 아침

| 파일명 | 장면 |
|---|---|
| `images/02-meadow.webp` | A tiny bee slipping out of a hive entrance into an enormous sunlit meadow of towering poppies and cornflowers, dew sparkling, exhilarating sense of scale. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 아주 이른 아침이었습니다. 아직 아무도 일어나지 않았지요. 마야는 살그머니 벌집 문으로 갔습니다. 잠시 망설이다 밖으로 나갔지요. 그러고는 그대로 얼어붙었습니다. 눈앞에 들판이 끝없이 펼쳐져 있었거든요. / 오른쪽: 꽃들이 마야의 몇 배나 컸습니다. 양귀비도 있고 수레국화도 있었지요. 저마다 다른 냄새를 풍겼습니다. 이슬이 햇빛에 반짝반짝 빛났지요. 세상이 이렇게 넓었구나! 마야는 저도 모르게 소리를 냈습니다.〕 |
| `images/02-meadow-2.webp` | A small bee flitting joyfully among giant flowers meeting butterflies and ladybirds, then hovering puzzled under a high noon sun with no hive tree in sight. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 정신없이 날아다녔습니다. 이 꽃에 앉았다 저 꽃으로 옮겼지요. 꽃마다 맛이 달랐습니다. 나비도 만나고 무당벌레도 만났지요. 모두 처음 보는 이웃이었습니다. 어느새 해가 중천에 떴지요. / 오른쪽: 마야는 그제야 둘레를 살펴보았습니다. 어디가 어디인지 도무지 짐작이 가지 않았지요. 벌집이 있던 나무도 보이지 않았습니다. 어? 돌아가는 길이 어디지? 그래도 마야는 별로 겁나지 않았지요. 볼 것이 아직 많았으니까요.〕 |

## 3장 · 메뚜기 페피

| 파일명 | 장면 |
|---|---|
| `images/03-grasshopper.webp` | A lanky green grasshopper bouncing mid-air among towering grass stems while a small bee recoils in surprise, blades of grass like green pillars, comic. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 풀숲으로 내려앉았습니다. 풀잎이 초록 기둥처럼 서 있었지요. 그때 무언가가 폴짝 튀어나왔습니다. 마야는 깜짝 놀라 뒤로 물러섰지요. 다리가 아주 긴 초록빛 벌레였습니다. 너 누구니? / 오른쪽: 뛰는 게 내 일이니까! 나는 페피야. 메뚜기지. 페피가 가슴을 폈습니다. 페피는 말하는 중에도 세 번이나 뛰었지요. 한 번 뛸 때마다 풀잎이 크게 흔들렸습니다. 마야는 눈이 핑핑 돌 것 같았지요.〕 |
| `images/03-grasshopper-2.webp` | A grasshopper laughing and pointing at the pollen dusting a small bee, the two chatting among grass stems, then the grasshopper leaping away, sunny and comic. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 너 벌집에서 나온 벌이구나? 어떻게 알았어? 몸에 꽃가루가 잔뜩 묻었잖아. / 오른쪽: 글쎄. 좀 더 돌아다녀 보려고. 돌아가는 길도 모르는데? 응, 그래도 괜찮아.〕 |

## 4장 · 쇠똥구리 쿠르트

| 파일명 | 장면 |
|---|---|
| `images/04-beetle.webp` | A stout brown dung beetle in a stiff collar straining to push a large ball up a slope of soil while a small bee hovers offering help, comic dignity. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 다시 길을 나섰습니다. 흙길을 따라 낮게 날았지요. 저 앞에서 무언가가 꿈틀거렸습니다. 커다란 공을 굴리는 딱정벌레였지요. 목에는 빳빳한 깃을 두르고 있었습니다. 얼굴이 온통 벌게져 있었지요. 공이 자꾸 뒤로 굴러 내려왔거든요. 마야는 딱한 마음이 들었습니다. / 오른쪽: 데굴, 데굴. 공이 또 밑으로 굴러갔지요. 좀 도와줄까요?〕 |
| `images/04-beetle-2.webp` | A dung beetle finally rolling his ball to the top of a soil slope, sweating and grinning, while a small bee watches thoughtfully, warm afternoon light. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 제 이름은 쿠르트라고 하네. 쿠르트는 헛기침을 하고 다시 공을 밀었습니다. 자기 일을 남에게 미루면 말이야. / 오른쪽: 쿠르트는 결국 공을 언덕 위로 올렸지요. 땀을 뻘뻘 흘리면서도 웃었습니다. 깃이 삐뚤어진 줄도 몰랐지요. 마야는 그만 웃음이 났습니다. 봐라, 되지 않느냐.〕 |

## 5장 · 거미줄

| 파일명 | 장면 |
|---|---|
| `images/05-web.webp` | A dew-jewelled spiderweb strung between grass stems at sunset with a small bee drifting closer, entranced, then her wing catching fast, tense. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 저녁이었습니다. 해가 기울며 들판이 붉어졌지요. 마야는 반짝이는 것을 보았습니다. 풀잎 사이에 실이 촘촘히 걸려 있었지요. 이슬이 맺혀 보석처럼 빛났습니다. / 오른쪽: 마야는 가까이 다가갔지요. 조금만 더 보려고 했을 뿐이었습니다. 그런데 날개가 실에 척 붙어 버렸지요. 어? 이게 뭐야?〕 |
| `images/05-web-2.webp` | A small bee thoroughly tangled in a spiderweb calling for help in a quiet dusk meadow, then a green grasshopper appearing at the edge of the frame, hopeful. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 몸을 비틀었습니다. 그런데 움직일수록 실이 더 감겼지요. 이제 다리까지 붙어 버렸습니다. 마야는 겁이 덜컥 났지요. 거미가 언제 나타날지 몰랐거든요. / 오른쪽: 들판은 조용하기만 했습니다. 그때 어디선가 노랫소리가 들렸지요. 누군가 폴짝폴짝 다가오고 있었습니다. 초록빛 다리가 풀잎 위로 나타났지요. 메뚜기 페피였습니다.〕 |

## 6장 · 구해 준 이웃

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.webp` | A grasshopper carefully snapping web threads with his hind legs to free a small bee, both tumbling into soft grass below, dusk light, warm friendship. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 어라, 너 거기서 뭐 해? 보면 몰라! 얼른 좀 도와줘! 페피는 얼른 다가왔습니다. / 오른쪽: 실이 손끝에서 끈적끈적했지요. 거미 오기 전에 서두르자. 이윽고 마야가 겨우 빠져나왔지요. 둘은 풀밭으로 데굴데굴 굴렀습니다. 마야는 숨을 크게 쉬었지요.〕 |
| `images/06-rescue-2.webp` | A grasshopper bounding away shyly into the grass, and a small bee resting under a leaf beneath a starry sky, thoughtful and tender. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 페피는 쑥스러운 듯 훌쩍 뛰어올랐습니다. 이제 조심해서 다녀. 그러고는 풀숲으로 사라졌지요. 마야는 나뭇잎 아래에 몸을 뉘였습니다. / 오른쪽: 쿠르트도 떠오르고 페피도 떠올랐지요. 혼자 사는 벌레는 하나도 없구나. 그러자 벌집 생각이 났습니다. 카산드라 선생님도 떠올랐지요.〕 |

## 7장 · 말벌들의 계획

| 파일명 | 장면 |
|---|---|
| `images/07-hornets.webp` | A dark hollow tree where large striped hornets confer in a huddle while a tiny bee flattens herself against the bark listening in terror, atmospheric. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 며칠이 지났습니다. 마야는 낡은 나무 곁을 지나고 있었지요. 나무에 커다란 구멍이 뚫려 있었습니다. 그 안에서 낮은 소리가 들렸지요. 마야는 나무껍질에 몸을 붙였습니다. 안을 들여다보니 말벌들이 모여 있었지요. 몸집이 꿀벌의 몇 배나 되었습니다. / 오른쪽: 무언가를 의논하는 중이었지요. 오늘 밤 꿀벌 집을 친다. 문이 열리는 때를 노려라.〕 |
| `images/07-hornets-2.webp` | A tiny bee streaking away from a hollow tree across a sunset meadow, rising high to spot a familiar tree in the distance, wings blurring, urgent. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 알려야 해. 지금 당장. 마야는 나무에서 몸을 뗐습니다. 그러고는 있는 힘껏 날았지요. 날개가 부러질 것 같았습니다. 숨이 턱까지 차올랐지요. 그래도 마야는 멈추지 않았습니다. / 오른쪽: 그런데 어느 쪽으로 가야 할지 몰랐지요. 마야는 높이 올라가 둘레를 살폈습니다. 저 멀리 낯익은 나무가 보였지요. 해가 뉘엿뉘엿 지고 있었습니다. 마야는 그쪽으로 곧장 날았지요. 바람이 얼굴을 세게 때렸습니다. 조금만 더, 조금만 더! 마야는 이를 악물었습니다.〕 |

## 8장 · 돌아온 마야

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A bee arriving breathless at a hive entrance at night past guard bees, raising the alarm as the whole hive erupts into motion, urgent and dramatic. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마야는 밤이 되어서야 벌집에 닿았습니다. 문지기 벌들이 앞을 막았지요. 너는 나갔던 그 벌 아니냐? 그건 나중에요! 큰일 났어요! / 오른쪽: 카산드라 선생님이 달려 나왔지요. 틀림없느냐? 제 귀로 똑똑히 들었어요.〕 |
| `images/08-ending-2.webp` | A beehive entrance at night with ranks of bees standing shoulder to shoulder as hornets hover and turn away, a small bee praised by an older bee, triumphant glow. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 꿀벌들이 문 앞에 빽빽이 늘어섰습니다. 어깨를 맞대고 꼼짝하지 않았지요. 한밤중에 말벌들이 날아왔습니다. 윙윙 소리가 온 나무를 울렸지요. 꿀벌들은 숨을 죽였습니다. 마야도 맨 앞줄에 서 있었지요. / 오른쪽: 그런데 문이 단단히 막혀 있었습니다. 말벌들은 한참을 맴돌았지요. 그러다 그냥 물러갔습니다. 벌집에 환호성이 터졌지요. 카산드라가 마야의 어깨를 툭 쳤습니다. 바깥세상을 궁금해한 게 헛일은 아니었구나.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
