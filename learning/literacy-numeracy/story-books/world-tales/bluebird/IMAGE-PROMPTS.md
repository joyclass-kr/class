# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 아홉 개의 장(챕터)으로 나눠 담았고, 각 장이 **펼침면 두 개**로
이루어집니다. 펼침면마다 그림이 한 장씩 들어가니 본문 그림은 모두 **열여덟 장**이에요.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

> **✅ 본문 그림 열여덟 장은 이미 다 만들어져 있습니다.**
> 예전에 만들어 두신 `-2` 파일들이 한동안 코드에서 빠져 있었는데, 지금은 전부 제자리에
> 들어가 쓰이고 있어요. 다시 만드실 필요 없습니다.
> 다만 예전 4:3 비율로 뽑은 그림이라 양옆이 조금 잘려 보일 수 있으니, 여유가 되실 때
> 아래 새 비율로 다시 뽑으시면 더 깔끔합니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.

> **한 파일 = 한 장면입니다. 앞질러 가지 마세요.**
> 파일마다 뒤에을 붙여 두었습니다. 그 쪽에 실제로 실리는 글이에요.
> 그림은 **그 글에 나오는 장면만** 그려 주세요. 다음 쪽 이야기를 미리 그리면
> 그림이 글보다 한 칸씩 밀려서 책 전체가 어긋납니다. 실제로 그런 일이 있었어요.
> 장면이 둘 적혀 있으면 둘을 **한 그림 안에** 담아 주세요. 하나만 골라 그리면 안 됩니다.

같은 인물(치르치르, 미치르, 빛의 요정, 강아지 치로, 고양이 치레트)이 책 전체에 계속
등장하니, 매번 인물 생김새를 비슷하게 유지하는 게 중요해요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, warm watercolor and colored-pencil style,
soft golden lighting, gentle rounded shapes, storybook atmosphere, no text or
letters in the image, consistent warm fairytale color palette (parchment, gold,
soft blue, forest green), expressive character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Tyltyl (치르치르): a boy around 8 years old, brown hair, red pointed cap, simple
blue jacket and brown trousers. Mytyl (미치르): a girl around 6, light brown
hair in braids, simple white and pink dress. The Fairy (빛의 요정): a graceful
woman with long golden hair, a flowing pale blue-white gown, a sparkling star
wand. Tylo the dog (치로): a small brown dog. Tylette the cat (치레트): an
orange tabby cat, both walking upright like small people once transformed.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small bird cage glowing with soft blue light standing on a windowsill at night, a crescent moon and stars outside, a tiny magic star-topped cap resting beside it, warm and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 크리스마스이브

| 파일명 | 장면 |
|---|---|
| `images/01-eve.webp` | Two children sitting up in bed in a modest dark bedroom at night, peering out a frosty window at a grand brightly lit mansion across the street where a festive party glows warmly. 〔이 쪽에 실린 글 (1/18) — 그림에 글자는 넣지 마세요. 왼쪽: 그날은 크리스마스이브였습니다. 눈이 소복소복 내리는 밤이었지요. 가난한 나무꾼의 오누이 치르치르와 미치르는 벌써 잠자리에 들었습니다. 방이 좁아 둘은 나란히 누웠고 이불도 하나뿐이었지요. 그런데 한밤중에 창밖이 갑자기 환해졌습니다. / 오른쪽: 음악 소리도 담을 넘어왔지요. 아, 시끄러워. 잠을 잘 수가 없잖아. 치르치르가 눈을 비비며 일어났습니다. 이웃 부잣집에서 요란한 파티가 열리고 있었던 것입니다. 창마다 불이 환하게 켜져 있었지요.〕 |
| `images/01-eve-2.webp` | Two children pressed close against a frosty cottage window from inside, warm golden party light and the smell of food drifting in from the mansion across the street, the girl swallowing hungrily, longing expressions, quiet night interior. 〔이 쪽에 실린 글 (2/18) — 그림에 글자는 넣지 마세요. 왼쪽: 저기 좀 봐. 정말 근사한 파티다. 창문 너머로 반짝이는 불빛이 새어 들어왔습니다. 맛있는 냄새도 함께 흘러들어 왔지요. 미치르가 침을 꿀꺽 삼켰습니다. 오누이는 창가에 딱 붙어 눈을 떼지 못했습니다. / 오른쪽: 우리도 저런 잔치를 해 보면 얼마나 좋을까. 미치르가 작은 목소리로 중얼거렸습니다. 치르치르도 말없이 고개를 끄덕였지요. 두 아이는 한참을 그렇게 서 있었습니다. 발이 시린 줄도 몰랐지요.〕 |

## 2장 · 빛의 요정

| 파일명 | 장면 |
|---|---|
| `images/02-fairy.webp` | An old woman transforming into a radiant fairy with golden hair and a starry wand in the middle of a small cottage room, two astonished children watching, a small green cap with a glowing diamond in her outstretched hand, warm magical light. 〔이 쪽에 실린 글 (3/18) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 문을 두드리는 소리가 났습니다. 똑똑똑. 누구세요? / 오른쪽: 아픈 딸이 파랑새를 보고 싶어 하는데, 너희가 좀 찾아다 주겠니? 오누이는 머뭇거렸습니다. 저희는 아직 어려서 힘이 없는걸요. 치르치르가 머리를 긁적였습니다.〕 |
| `images/02-fairy-2.webp` | A boy turning the glowing diamond on a small green cap, the whole cottage room bursting into radiant light around him, ordinary objects beginning to stir and come alive, his sister beside him with wide astonished eyes. 〔이 쪽에 실린 글 (4/18) — 그림에 글자는 넣지 마세요. 왼쪽: 그 순간 할머니의 모습이 스르르 바뀌었습니다. 머리에서 눈부신 빛이 쏟아지는 빛의 요정이었지요. 요정은 작은 초록 모자를 내밀었습니다. 위에 다이아몬드가 하나 박혀 있었지요. 오누이는 눈이 휘둥그레졌습니다. 이 모자를 쓰고 다이아몬드를 돌리렴. / 오른쪽: 그러면 사물의 참모습이 보인단다. 치르치르가 다이아몬드를 조심스레 돌렸습니다. 그 순간 방 안이 환해졌지요. 온갖 것들이 꿈틀거렸지요. 오누이는 숨도 크게 못 쉬었습니다.〕 |

## 3장 · 요정들과의 만남

| 파일명 | 장면 |
|---|---|
| `images/03-elements.webp` | A cozy cottage room suddenly full of whimsical characters — a dog and cat standing upright in little clothes, a water droplet spirit, a flickering fire spirit, a bread spirit, and a sugar spirit — all gathered around the two delighted children, warm chaotic magical scene. 〔이 쪽에 실린 글 (5/18) — 그림에 글자는 넣지 마세요. 왼쪽: 강아지 치로와 고양이 치레트가 사람처럼 옷을 입고 뒷발로 서기 시작했습니다. 물독에서는 물의 요정이 찰랑찰랑 흘러나왔습니다. 벽시계도 냄비도 살아 움직였지요. 난로에서는 불의 요정이 통통 뛰어나왔습니다. 빵 그릇에서는 빵의 요정이 나왔지요. / 오른쪽: 설탕 단지에서는 설탕의 요정이 잇따라 나타났습니다. 저마다 몸집이 제각각이었지요. 어머, 방이 요정들로 꽉 찼네! 미치르가 손뼉을 쳤습니다. 다들 저마다 떠드는 통에 정신이 없었지요. 치레트만 구석에서 눈을 가늘게 떴습니다. 좁은 방이 금세 북적북적해졌지요.〕 |
| `images/03-elements-2.webp` | The two children setting out from their cottage door into a starry night with the light fairy leading, the dog trotting eagerly in front with tail wagging, the cat lagging behind with a sly look, a crowd of little spirits following. 〔이 쪽에 실린 글 (6/18) — 그림에 글자는 넣지 마세요. 왼쪽: 빛의 요정이 앞으로 나서며 말했습니다. 파랑새를 찾으러 가자. 길은 내가 안내할게. 저희도 함께 가겠어요! / 오른쪽: 긴 여행이 그렇게 시작되었습니다. 문을 나서자 하늘에 별이 가득했지요. 앞길이 어떨지는 아무도 몰랐습니다. 개 치로가 앞장서서 꼬리를 흔들었지요. 고양이 치레트만 뒤에서 딴생각을 했습니다.〕 |

## 4장 · 추억의 나라

| 파일명 | 장면 |
|---|---|
| `images/04-memory.webp` | A misty dreamlike clearing with a huge ancient tree bearing a wooden sign, a warm elderly couple welcoming two children and a fairy with open arms, soft golden nostalgic light. 〔이 쪽에 실린 글 (7/18) — 그림에 글자는 넣지 마세요. 왼쪽: 한참을 걷자 희미한 안개 속에 커다란 나무가 나타났습니다. 나무에는 추억의 나라라고 쓰인 팻말이 걸려 있었습니다. 안개가 어찌나 짙은지 앞이 잘 보이지 않았지요. 오누이는 손을 잡고 걸어 들어갔습니다. 그 나라에 들어서자 돌아가신 할아버지와 할머니가 반갑게 맞아 주셨습니다. / 오른쪽: 오, 어서 오너라. 이렇게 와 줘서 정말 기쁘구나. 오누이는 두 분의 품에 와락 안겼습니다. 할머니가 오누이의 볼을 쓰다듬었지요. 많이 컸구나.〕 |
| `images/04-memory-2.webp` | The two children walking away from a misty clearing holding a birdcage, the bird inside having turned coal black, their shoulders drooping in disappointment, the grandparents waving small and faint in the fog behind them. 〔이 쪽에 실린 글 (8/18) — 그림에 글자는 넣지 마세요. 왼쪽: 할아버지와 할머니는 파랑새 한 마리를 선물로 주셨습니다. 이 새가 너희가 찾는 새일지도 모르겠구나. 오누이는 뛸 듯이 기뻐하며 새장을 안았습니다. 할아버지 할머니가 손을 흔들어 주었지요. / 오른쪽: 그런데 돌아오는 길에 새장을 들여다본 치르치르가 걸음을 멈췄습니다. 파랑새가 그만 새까만 새로 변해 있었던 것입니다. 이건 진짜 파랑새가 아니구나. 오누이는 어깨가 축 처졌습니다. 그래도 다시 길을 나섰지요. 빛의 요정이 앞에서 길을 밝혀 주었습니다.〕 |

## 5장 · 밤의 나라

| 파일명 | 장면 |
|---|---|
| `images/05-night.webp` | Two children surrounded by angry animate trees and forest animals in a dark clearing, shadowy monster shapes looming behind them, dramatic moonlit confrontation. 〔이 쪽에 실린 글 (9/18) — 그림에 글자는 넣지 마세요. 왼쪽: 오누이는 다시 마음을 다잡고 '밤의 나라'로 갔습니다. 사방이 캄캄했지요. 발밑도 보이지 않아 손을 더듬어 걸었습니다. 커다란 문이 죽 늘어서 있었지요. 문을 열 때마다 무서운 것들이 뛰쳐나왔습니다. 으악, 괴물이다! 도망가자! / 오른쪽: 문틈으로 붉은 눈들이 번쩍였지요. 오누이는 정신없이 달아났습니다. 그러다 숲속으로 뛰어들었지요. 나무들이 하늘을 가릴 만큼 높았습니다. 하지만 숲에서 더 무서운 일이 기다리고 있었습니다. 나무들이 스스로 움직이기 시작했거든요. 뿌리가 땅에서 쑥 뽑혀 나왔지요.〕 |
| `images/05-night-2.webp` | Towering trees stretching branches like arms to block the path, wolves and bears baring teeth in the dark, the little sister clinging to her brother's arm in terror, the circle of danger closing in, dramatic night forest. 〔이 쪽에 실린 글 (10/18) — 그림에 글자는 넣지 마세요. 왼쪽: 화가 난 나무들과 동물들이 오누이를 둘러쌌습니다. 너희 아버지가 우리 숲의 나무를 너무 많이 베어 냈어! 오늘 단단히 혼내 주자! 나무들이 우지끈 소리를 냈습니다. / 오른쪽: 치르치르와 미치르는 겁에 질려 옴짝달싹할 수 없었습니다. 어떡해, 오빠! 미치르가 치르치르의 팔에 매달렸습니다. 사방이 점점 좁혀 왔지요.〕 |

## 6장 · 무덤 앞에서

| 파일명 | 장면 |
|---|---|
| `images/06-escape.webp` | The two children standing before a single blooming red rose in a quiet moonlit graveyard clearing, the dark forest having vanished, calm and gentle scene. 〔이 쪽에 실린 글 (11/18) — 그림에 글자는 넣지 마세요. 왼쪽: 치르치르야, 빨리 다이아몬드를 돌리렴! 어디선가 빛의 요정의 목소리가 들려왔습니다. 치르치르는 벌벌 떨리는 손으로 얼른 다이아몬드를 돌렸습니다. 눈을 꼭 감은 채였지요. 손끝이 미끄러워 몇 번이나 헛돌았습니다. / 오른쪽: 정신을 차려 보니 오누이는 고요한 무덤 앞에 서 있었지요. 달빛만 조용히 내려앉아 있었습니다. 풀벌레 소리조차 나지 않았지요. 오누이는 겨우 숨을 골랐습니다. 어디선가 풀벌레가 다시 울기 시작했지요. 달빛에 비석 글씨가 하얗게 드러났습니다.〕 |
| `images/06-escape-2.webp` | A grave slowly opening in a moonlit clearing to reveal nothing but a single red rose blooming inside, the two children peering in with held breath, no monsters anywhere, hushed and gentle. 〔이 쪽에 실린 글 (12/18) — 그림에 글자는 넣지 마세요. 왼쪽: 죽은 사람은 파랑새를 알고 있을지도 몰라. 치르치르는 무서움을 꾹 참았습니다. 그러고는 다이아몬드를 다시 돌렸지요. 무덤이 스르르 열렸습니다. / 오른쪽: 파랑새는 어디에도 없었지요. 장미 향기만 은은하게 퍼졌습니다. 무서운 것도 하나 없었지요. 오누이는 어깨를 축 늘어뜨렸습니다. 그래도 포기할 수는 없었지요. 두 아이는 다음 나라로 발걸음을 옮겼습니다. 다음에는 꼭 있을 거야.〕 |

## 7장 · 행복의 나라

| 파일명 | 장면 |
|---|---|
| `images/07-happiness.webp` | A festive banquet hall with glowing lanterns and tables of food shimmering and dissolving into golden smoke, the fairy gesturing urgently, the children's mother emerging in soft warm light nearby. 〔이 쪽에 실린 글 (13/18) — 그림에 글자는 넣지 마세요. 왼쪽: 이번에 도착한 곳은 '행복의 나라'였습니다. 어디서나 맛있는 음식 냄새와 웃음소리가 가득했지요. 이번에야말로 파랑새를 찾을 수 있을 거야! 뚱뚱한 사람들이 춤을 추고 있었지요. 상마다 음식이 넘치도록 차려져 있었습니다. 오누이는 서로 손을 꼭 잡았지요. / 오른쪽: 고기 굽는 냄새가 코를 찔렀습니다. 그런데 그 음식은 먹기만 하면 게으름뱅이가 되는 것이었지요. 오누이는 그런 줄도 모르고 식탁 앞에 앉았습니다. 눈앞에 먹음직스러운 것이 가득했지요. 막 음식에 손을 뻗으려는 순간이었습니다. 미치르는 벌써 입에 침이 고였지요.〕 |
| `images/07-happiness-2.webp` | The banquet and its plump revellers dissolving into curling smoke, and in the clearing light a group of gentle children and the mother's warm face appearing, the two children gazing with a tender aching look. 〔이 쪽에 실린 글 (14/18) — 그림에 글자는 넣지 마세요. 왼쪽: 안 돼! 빨리 다이아몬드를 돌리렴! 빛의 요정이 급히 날아왔습니다. 치르치르가 서둘러 다이아몬드를 돌렸지요. 그러자 음식이 연기처럼 사라졌지요. 뚱뚱한 사람들도 함께 사라졌습니다. / 오른쪽: 자, 이제 진짜 행복이 무엇인지 보여 줄게. 빛의 요정을 따라 귀여운 아이들과 오누이의 어머니가 나타났습니다. 오누이는 웬일인지 가슴이 뭉클해졌습니다. 늘 곁에 있던 얼굴이었으니까요.〕 |

## 8장 · 미래의 나라

| 파일명 | 장면 |
|---|---|
| `images/08-future.webp` | A vast dreamy harbor full of rows of small glowing infant spirits boarding a ship under the guidance of a tall wise old bearded figure with a staff, magical twilight scene. 〔이 쪽에 실린 글 (15/18) — 그림에 글자는 넣지 마세요. 왼쪽: 기운을 내렴. 이번에는 미래의 나라로 가 보자. 빛의 요정이 앞장서 걸었습니다. 그곳은 온통 파란빛이었습니다. 수많은 아기들이 무언가를 열심히 하고 있었지요. 저마다 손에 무언가를 들고 있었습니다. / 오른쪽: 태어나서 하게 될 일을 미리 배우고 있는 거야. 빛의 요정이 찬찬히 설명해 주었습니다. 어떤 아기는 약을 만들고 있었지요. 어떤 아기는 커다란 책을 들고 있었습니다. 미치르는 그 사이를 조심조심 걸었지요. 아기들이 저마다 손을 흔들어 주었습니다.〕 |
| `images/08-future-2.webp` | A sky-blue harbour where rows of infant spirits board a white-sailed ship bound for earth, the ship gliding off beyond the clouds, and in the foreground a small bird turning red in the boy's reaching hands. 〔이 쪽에 실린 글 (16/18) — 그림에 글자는 넣지 마세요. 왼쪽: 자, 지구로 떠날 시간이 되었다! 어서 배를 타거라! 시간의 할아버지가 큰 소리로 외쳤습니다. 아기들이 줄을 지어 차례로 배에 올랐습니다. 하얀 돛이 바람에 부풀었지요. 배는 하늘 저편으로 미끄러져 갔습니다. / 오른쪽: 그때 오누이는 파랑새 한 마리를 발견하고 조심스레 손을 뻗었습니다. 하지만 그 새 역시 곧 빨간 새로 변해 버렸습니다. 또 아니야…… 치르치르는 힘없이 새를 놓아주었습니다.〕 |

## 9장 · 파랑새는 집에 있었다

| 파일명 | 장면 |
|---|---|
| `images/09-home.webp` | A warm sunlit bedroom on Christmas morning, a mother gently waking two children, an elderly neighbor smiling nearby, an ordinary birdcage on the windowsill quietly glowing pale blue. 〔이 쪽에 실린 글 (17/18) — 그림에 글자는 넣지 마세요. 왼쪽: 치르치르, 미치르, 일어나렴. 어머니 목소리에 오누이는 눈을 떴습니다. 창밖에는 눈이 하얗게 쌓여 있었지요. 그 긴 여행이 다 꿈이었을까요. / 오른쪽: 할머니, 죄송해요. 파랑새를 못 찾았어요. 치르치르가 풀 죽은 목소리로 말했습니다. 미치르도 고개를 숙였지요. 그러자 할머니가 빙그레 웃었습니다.〕 |
| `images/09-home-2.webp` | An ordinary birdcage on a sunlit windowsill, the bird inside catching the morning light and shining a clear bright blue, the two children staring in wonder as the elderly neighbour points at it with a knowing smile. 〔이 쪽에 실린 글 (18/18) — 그림에 글자는 넣지 마세요. 왼쪽: 오누이는 그쪽을 돌아보았습니다. 어, 우리 집에 있던 새잖아! 새장 속 새가 창으로 든 햇빛을 받고 있었지요. 어제까지는 잿빛으로만 보였는데 말입니다. / 오른쪽: 오누이는 그 새를 할머니께 드렸습니다. 아픈 딸이 새를 보고 자리에서 일어났지요. 그때 새가 포르르 날아올랐습니다. 아, 파랑새가 날아갔어요!〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
