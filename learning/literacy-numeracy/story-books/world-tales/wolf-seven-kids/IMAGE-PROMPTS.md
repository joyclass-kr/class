# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
14개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **⚠️ 다시 그려 주실 것 (2026-08-28 점검)**
> - `06-rescue` — 늑대가 나무 밑에서 **배가 산처럼 불룩한 채 코를 골고**, 엄마와 막내가 살금살금 다가가는 장면으로. 지금은 이미 구해 낸 뒤입니다.
> - 엄마 염소 옷이 `01`(분홍 꽃무늬 앞치마 + 빨간 두건)과 뒤쪽(파란 원피스 + 밀짚모자)이 다릅니다. `01` 쪽으로 통일해 주세요.

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
bold clean outlines, saturated storybook colors, warm cottage lamplight and green
meadow daylight, no text or letters in the image, a goat family cottage with a
grandfather clock, a village lane, a miller's shop and a well in a meadow, very
expressive comic faces, wide panoramic composition, funny and never frightening;
the wolf is drawn as goofy and vain.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Mother goat: a white goat in an apron and headscarf with a market basket. The
seven kids: small goats of slightly different sizes and markings, the youngest
the smallest with a bell. The wolf: a shaggy grey wolf who keeps changing his
disguise — first hoarse, then chalk-white paws, then flour-dusted, drawn as
comically vain. The miller: a floury man with a scoop.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a cottage door seen from inside with seven little goat kids peeking from hiding places — under the table, in a cupboard, behind a broom — and a grey paw pushing at the door crack, tense but comic, warm lamplight. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 엄마 염소의 당부

| 파일명 | 장면 |
|---|---|
| `images/01-warning.webp` | A cosy cottage room where a mother goat in a headscarf with a basket gathers seven little goat kids around her to give instructions, morning sun through the door, warm and tender. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 숲가 오두막에 엄마 염소가 살았습니다. 아기 염소가 일곱이나 되었지요. 첫째는 키가 제일 크고 막내는 목에 방울을 달고 다녔습니다. 일곱은 하루 종일 마당에서 뛰어놀았지요. 그러던 어느 날 아침 찬장이 텅 비었습니다. 엄마는 장에 다녀와야 했지요. / 오른쪽: 엄마가 일곱을 불러 모았습니다. 오늘은 너희끼리 있어야 한다. 늑대를 조심해야 해.〕 |
| `images/01-warning-2.webp` | A cottage doorway where a mother goat sets off down a lane with her basket while seven kids crowd the window waving, and the room quiet behind them, warm and homely. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 목소리가 걸걸하단다. 우리처럼 곱지 않아. 발도 새까맣지. 우리 발은 하얗잖니. 그 둘만 잘 보면 된단다. / 오른쪽: 엄마 염소는 바구니를 팔에 걸고 문을 나섰지요. 일곱은 창가에 매달려 손을 흔들고 또 흔들었습니다. 엄마가 언덕을 넘어가자 집 안이 조용해졌지요. 문고리에는 빗장이 단단히 걸려 있었습니다. 일곱은 이내 방울 소리를 내며 놀이를 시작했습니다.〕 |

## 2장 · 첫 번째 속임수

| 파일명 | 장면 |
|---|---|
| `images/02-first-try.webp` | A cottage door with seven kids pressed against it listening warily, one standing forward with a hoof raised, and a grey shape looming outside the window, tense but comic. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 얼마 지나지 않아 문에서 소리가 났습니다. 쿵쿵. 누군가 문을 세게 두드리는 소리였지요. / 오른쪽: 목소리가 어쩐지 걸걸했거든요. 엄마 목소리가 아니었지요. 첫째가 문 앞으로 조심조심 다가섰습니다. 우리 엄마 목소리가 아니에요!〕 |
| `images/02-first-try-2.webp` | A wolf stamping in frustration outside a cottage, then at a village shop counter swallowing a lump of chalk and clearing its throat, comic determination. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 문밖에서 늑대가 발을 쿵쿵 굴렀습니다. 이런 영리한 것들 같으니. 늑대는 한참을 마당에서 서성거렸지요. 아무리 생각해도 목소리가 걸렸습니다. / 오른쪽: 늑대는 그길로 마을로 달려갔습니다. 가게에서 분필을 사서 통째로 꿀꺽 삼켰지요. 목이 간질간질했습니다. 분필 가루가 목구멍에 달라붙어 캑캑거렸지요. 아, 아. 어험.〕 |

## 3장 · 하얀 발과 고운 목소리

| 파일명 | 장면 |
|---|---|
| `images/03-disguise.webp` | A cottage window where a black paw rests on the sill and seven kids recoil shouting, one small kid pointing at it, sunlight showing the dark fur clearly, comic. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 얘들아, 엄마 왔단다. 이번에는 목소리가 제법 고왔습니다. 아까와는 딴판이었지요. 일곱이 문 쪽으로 귀를 기울였지요. / 오른쪽: 그럼 발을 보여 주세요. 늑대가 앞발을 창턱에 척 올렸지요. 털이 숯처럼 새까맸습니다. 일곱은 한꺼번에 뒷걸음질을 쳤지요. 늑대다! 저리 가!〕 |
| `images/03-disguise-2.webp` | A mill interior where a floury man dusts a wolf's paws white, and a cottage window where the same paw now snowy rests on the sill as kids reach to unbar the door, comic and ominous. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 늑대는 이번에 방앗간으로 갔습니다. 내 발에 밀가루를 발라 다오. 방앗간 주인이 망설였지요. / 오른쪽: 주인은 겁이 나서 결국 발을 하얗게 발라 주었습니다. 늑대는 세 번째로 오두막을 찾아왔지요. 고운 목소리로 부르고는 앞발을 창턱에 올렸습니다. 이번에는 발이 눈처럼 하얬지요. 우리 엄마 맞나 봐!〕 |

## 4장 · 시계 속에 숨은 막내

| 파일명 | 장면 |
|---|---|
| `images/04-hiding.webp` | A cottage in comic uproar as six kids dive under a table, into a quilt, up a chimney, into a cupboard, behind a wardrobe and under a basin while a wolf lumbers in, funny not frightening. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 늑대가 성큼 안으로 들어섰습니다. 온 방이 발칵 뒤집혔지요. 늑대다! 숨어! 첫째는 책상 밑으로 기어들었습니다. 둘째는 이불 속으로 쏙 들어갔지요. 셋째는 아궁이로, 넷째는 부엌 찬장으로 몸을 숨겼습니다. / 오른쪽: 다섯째는 옷장 뒤에, 여섯째는 대야 밑에 납작 엎드렸지요. 막내만 두리번거렸습니다. 어디로 가지, 어디로 가지…〕 |
| `images/04-hiding-2.webp` | A tiny goat kid hidden inside a grandfather clock case peering through the crack, and outside under a tree a fat-bellied wolf sprawled asleep and snoring, comic relief. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 막내는 시계 문을 살며시 열고 안으로 쏙 들어갔습니다. 그러고는 숨도 크게 쉬지 않았지요. 시계추가 코앞에서 째깍째깍 흔들렸습니다. 늑대는 방을 뒤지며 하나씩 찾아냈습니다. 찾았다! / 오른쪽: 늑대는 온 집을 뒤졌지만 시계 속은 들여다보지 않았거든요. 배가 부르니 슬슬 졸음이 왔지요. 하품이 크게 나왔습니다. 이만하면 됐다. 늑대는 집을 나가 나무 밑에 벌렁 누웠습니다. 금세 코를 골았지요.〕 |

## 5장 · 엄마 염소가 돌아왔어요

| 파일명 | 장면 |
|---|---|
| `images/05-mother-returns.webp` | A wrecked cottage room with overturned chairs and a tipped basin where a mother goat stands stricken, her basket fallen from her hoof, late afternoon light, moving. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 해질 무렵 엄마 염소가 돌아왔습니다. 그런데 문이 활짝 열려 있었지요. 방 안은 엉망이었습니다. 의자가 넘어지고 대야도 뒤집혀 있었지요. 얘들아, 어디 있니? / 오른쪽: 엄마는 방마다 다니며 이름을 불렀지요. 첫째야, 둘째야, 셋째야… 집 안은 여전히 조용하기만 했습니다. 엄마는 그 자리에 털썩 주저앉았지요. 손에 든 바구니가 툭 떨어졌습니다.〕 |
| `images/05-mother-returns-2.webp` | A cottage where a tiny kid pushes open a clock case and runs into a mother goat's arms, and the same goat opening a sewing box to take out shears and thread, tender and resolute. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 바로 그때 시계가 덜컹거렸습니다. 엄마! 엄마! 막내가 시계 문을 밀고 기어 나왔지요. 엄마가 달려가 막내를 와락 끌어안았습니다. / 오른쪽: 막내는 그제야 울음을 터뜨렸지요. 늑대가 왔었어요. 목소리도 발도 다 속였어요.〕 |

## 6장 · 늑대의 배 속에서

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.webp` | A meadow under a tree where a wolf sleeps with a lumpy heaving belly, a mother goat kneeling with shears while a tiny kid holds the cloth, six heads popping out one by one, joyful relief. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 두 모자는 살금살금 밖으로 나갔습니다. 늑대는 나무 밑에 그대로 있었지요. 드르렁드르렁. 코를 골며 자는데 배가 산처럼 불룩 솟아 있었습니다. 숨을 쉴 때마다 배가 오르락내리락했지요. / 오른쪽: 아직 살아 있구나! 엄마가 가위를 꺼내 들었습니다. 손이 조금 떨렸지요. 막내야, 여기 꼭 잡고 있어.〕 |
| `images/06-rescue-2.webp` | Seven kids clinging to their mother in a meadow, then scattering to a stream to gather round stones in their aprons, the wolf still asleep under the tree behind, lively and warm. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 엄마! 엄마! 일곱이 한꺼번에 엄마에게 매달렸습니다. 다행히 모두 멀쩡했지요. / 오른쪽: 얘들아, 개울에 가서 돌을 주워 오너라. 일곱이 우르르 흩어져 개울가로 달려갔습니다. 동글동글한 돌을 골라 치마폭에 담아 왔지요. 늑대는 그때까지도 쿨쿨 자고 있었습니다. 무슨 일이 벌어지는지 까맣게 몰랐지요.〕 |

## 7장 · 우물가의 늑대

| 파일명 | 장면 |
|---|---|
| `images/07-well.webp` | A meadow where a mother goat stitches a sleeping wolf's belly closed while seven kids peek from behind a tree, and the wolf waking and staggering toward a stone well, comic. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 여덟은 늑대의 배 속에 돌을 가득 채웠습니다. 엄마가 실을 꿰어 배를 촘촘히 꿰맸지요. 일곱은 그동안 숨소리도 내지 않았습니다. 바느질 솜씨가 어찌나 좋은지 자국도 거의 보이지 않았습니다. 그러고는 여덟이 나무 뒤에 숨어 숨을 죽였지요. 이윽고 늑대가 부스스 깨어났습니다. / 오른쪽: 해가 나무 위로 높이 올라간 뒤였지요. 기지개를 켜려다 말고 멈칫했지요. 어이쿠, 배가 왜 이리 무겁지?〕 |
| `images/07-well-2.webp` | A meadow well where a stone-bellied wolf leans over the rim and topples in with a splash, eight goats bursting from behind a tree and dancing in a ring, bright and triumphant. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 걸을 때마다 뱃속에서 소리가 났습니다. 덜그럭, 덜그럭. 늑대가 고개를 갸웃했지요. / 오른쪽: 그러거나 말거나 목이 말라 우물가에 이르렀습니다. 늑대가 몸을 굽혀 물을 마시려는 순간이었지요. 무거운 배가 앞으로 쏠리면서 그만 풍덩 빠지고 말았습니다. 나무 뒤에서 웃음이 와르르 터졌지요. 여덟은 손을 잡고 빙글빙글 돌았습니다. 늑대는 그 뒤로 다시 오지 않았답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
