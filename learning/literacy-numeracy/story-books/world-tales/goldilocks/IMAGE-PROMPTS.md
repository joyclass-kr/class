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
bold clean outlines, saturated storybook colors, warm woodland morning light, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a log cottage in a birch forest with three of
everything in three sizes, very expressive comic faces, wide panoramic
composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Goldilocks: a small girl about 6 with bouncy golden curls, a red pinafore and
grass-stained knees. Father Bear: a huge brown bear in a waistcoat with a
booming voice. Mother Bear: a middling bear in an apron and spectacles. Baby
Bear: a small round bear cub with a bib, easily upset and very expressive.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a cosy log cottage interior seen from the doorway with three bowls of porridge on a table — big, middle and tiny — and a small girl with golden curls peeking in, sunlight through the door, charming and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 너무 뜨거운 죽

| 파일명 | 장면 |
|---|---|
| `images/01-porridge.webp` | A cosy log cottage kitchen in a birch forest with three of everything in three sizes, a mother bear ladling steaming porridge into three bowls, warm morning light, charming. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 자작나무가 우거진 숲속에 통나무집이 한 채 있었습니다. 그 집에는 곰 세 마리가 살았지요. 아빠 곰과 엄마 곰과 아기 곰이었습니다. 아빠 곰은 몸집이 아주 컸습니다. 엄마 곰은 그보다 조금 작았지요. 아기 곰은 아주 작고 동글동글했습니다. 셋은 사이좋게 지냈지요. / 오른쪽: 집 안에는 무엇이든 셋씩 있었습니다. 그릇도 셋, 의자도 셋, 침대도 셋이었지요. 큰 것, 가운데 것, 아주 작은 것이었습니다. 어느 아침 엄마 곰이 죽을 끓였습니다. 세 그릇에 나누어 김이 나게 펐지요. 꿀을 한 숟가락씩 얹는 것도 잊지 않았습니다.〕 |
| `images/01-porridge-2.webp` | A bear cub recoiling with its tongue out from hot porridge while the parent bears laugh, then the three bears walking out into a sunny birch forest leaving the door ajar, funny. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아기 곰이 제일 먼저 숟가락을 들었습니다. 한 숟가락 뜨더니 폴짝 뛰었지요. 앗 뜨거! 혀 데었어요! 아빠 곰이 껄껄 웃었습니다. / 오른쪽: 엄마 곰이 그릇을 식탁에 늘어놓았습니다. 그럼 식을 때까지 산책이나 하고 오자꾸나. 세 마리는 나란히 숲으로 나갔습니다.〕 |

## 2장 · 문이 열려 있어

| 파일명 | 장면 |
|---|---|
| `images/02-door.webp` | A small girl with golden curls lost among endless birch trees, then spotting a log cottage roof through the trunks and running toward it, dappled light, curious. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 무렵 숲을 돌아다니던 아이가 하나 있었습니다. 머리가 금빛으로 반짝이는 아이였지요. 아침에 꽃을 꺾으러 나왔다가 그만 길을 잃었습니다. 이쪽으로 가도 나무, 저쪽으로 가도 나무였지요. 아무리 걸어도 같은 자리 같았습니다. 다리가 아프고 배도 몹시 고팠습니다. 아이는 그만 울고 싶어졌지요. / 오른쪽: 엄마, 나 여기 있어요! 숲은 아무 대답도 하지 않았지요. 그때 나무 사이로 지붕이 보였습니다. 아이는 반가워서 달려갔지요. 통나무로 지은 예쁜 집이었습니다.〕 |
| `images/02-door-2.webp` | A girl with golden curls peering through a cottage window at steaming bowls, then pushing the door open and tiptoeing in, wildflowers by the step, a little sneaky and comic. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아무리 불러도 대답이 없었습니다. 아이는 창문에 붙어 안을 들여다보았지요. 식탁 위에서 하얀 김이 오르고 있었습니다. 고소한 냄새가 문틈으로 새어 나왔습니다. 배에서 꼬르륵 소리가 났지요. 아이는 참기가 힘들었습니다. 아이는 침을 꿀꺽 삼켰습니다. 그러고는 문을 살짝 밀어 보았지요. / 오른쪽: 문이 스르르 열렸습니다. 잠깐만 들어가 보는 거야. 잠깐만. 아이는 발끝으로 살금살금 들어갔습니다. 마룻바닥이 삐거덕 소리를 냈지요. 아이는 그 자리에서 딱 멈춰 섰습니다.〕 |

## 3장 · 세 그릇의 죽

| 파일명 | 장면 |
|---|---|
| `images/03-bowls.webp` | A table with three porridge bowls in three sizes where a girl fans her burnt mouth after the big bowl and grimaces at the middle one, comic expressions, warm interior. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 식탁 위에 죽이 세 그릇 놓여 있었습니다. 큰 그릇, 가운데 그릇, 아주 작은 그릇이었지요. 아이는 배가 고파 참을 수가 없었습니다. 먼저 제일 큰 그릇부터 한 숟가락 떠먹었습니다. 김이 뭉게뭉게 오르는 그릇이었지요. 그러자마자 입을 벌리고 손부채질을 했지요. / 오른쪽: 으악, 너무 뜨거워! 이번에는 가운데 그릇을 떠먹어 보았습니다. 숟가락을 입에 넣자마자였지요. 혀끝이 서늘했습니다. 아이는 얼굴을 잔뜩 찌푸렸습니다.〕 |
| `images/03-bowls-2.webp` | A girl beaming as she scrapes the tiniest porridge bowl completely clean and pats her full tummy, the empty bowl left on the table, hilarious and warm. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 마지막으로 제일 작은 그릇을 떠먹었습니다. 아이의 눈이 동그래졌지요. 우와, 딱 좋다! 뜨겁지도 차갑지도 않았습니다. / 오른쪽: 아, 살 것 같다. 입가에 죽이 묻은 줄도 몰랐지요. 아이는 손등으로 쓱 문질렀습니다. 아기 곰의 죽이라는 것은 생각도 하지 못했습니다.〕 |

## 4장 · 세 개의 의자

| 파일명 | 장면 |
|---|---|
| `images/04-chairs.webp` | A cottage parlour with three chairs in three sizes by the hearth, a girl perched high on the huge hard chair with dangling feet, then sinking deep into the squashy middle one, comic. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 배가 부른 아이는 앉을 자리를 찾았습니다. 난롯가에 의자가 셋 놓여 있었지요. 이것도 큰 것, 가운데 것, 작은 것이었습니다. 먼저 커다란 의자로 올라갔지요. 겨우 기어올라 앉았는데 발이 땅에 닿지 않았습니다. 앉은 자리가 하도 높아 어지러웠지요. / 오른쪽: 등받이는 나무판처럼 딱딱했지요. 너무 딱딱해. 아이는 가운데 의자로 옮겨 앉았습니다.〕 |
| `images/04-chairs-2.webp` | A girl swinging her legs happily in the smallest chair just as it splinters beneath her and she lands on the floor among the pieces, hilariously comic, dust puffing up. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아이는 제일 작은 의자에 앉아 보았습니다. 엉덩이가 쏙 들어가고 등이 딱 맞았지요. 이거야, 딱 좋아! 아이는 신이 나서 다리를 흔들었습니다. 발끝이 바닥에 닿았다 떨어졌다 했지요. / 오른쪽: 삐걱, 삐걱. 의자가 자꾸만 소리를 냈지요. 뚝, 하고 다리 하나가 부러졌습니다. 와지끈!〕 |

## 5장 · 세 개의 침대

| 파일명 | 장면 |
|---|---|
| `images/05-beds.webp` | A sunlit attic bedroom with three beds in three sizes, a small girl lying on the huge one with her head propped uncomfortably high, patchwork quilts, cosy and funny. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아이는 부서진 의자를 보고 멈칫했습니다. 그래도 미안하다는 말은 하지 않았지요. 아무도 보지 않았으니까요. 들킬 일이 없다고 생각했습니다. 이번에는 슬금슬금 위층으로 올라갔습니다. 좁은 나무 계단이 이어져 있었지요. / 오른쪽: 다락방에 침대가 나란히 셋 놓여 있었지요. 아이는 큰 침대부터 올라가 누웠습니다. 그런데 머리맡이 너무 높았습니다. 목이 뻐근해서 오래 있을 수가 없었지요. 이건 안 되겠어. 아이는 낑낑거리며 침대에서 내려왔습니다.〕 |
| `images/05-beds-2.webp` | A small girl curled fast asleep in the tiniest bed clutching a patchwork quilt, sunlight falling across the attic floor, peaceful and sweet. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 가운데 침대로 옮겨 누워 보았습니다. 이번에는 발치가 너무 푹신했지요. 몸이 자꾸 아래로 미끄러졌습니다. 아이는 다시 일어났습니다. 이불이 발에 감겨 한참을 낑낑거렸지요. 마지막으로 작은 침대에 누웠습니다. 베개에서 풀 냄새가 났지요. / 오른쪽: 이번에는 높지도 낮지도 않았지요. 이불이 몸에 꼭 맞았지요. 딱 좋아……〕 |

## 6장 · 돌아온 곰들

| 파일명 | 장면 |
|---|---|
| `images/06-return.webp` | Three bears of three sizes returning to find their door wide open and spoons stuck in the porridge bowls, the father bear booming, very expressive and funny. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 무렵 곰 세 마리가 산책을 마쳤습니다. 이제 죽이 알맞게 식었겠구나. 세 마리는 기분 좋게 집으로 돌아왔지요. / 오른쪽: 아기 곰이 엄마 곰의 팔을 잡았습니다. 아빠 곰이 식탁을 보고 걸음을 멈췄습니다. 숟가락이 그릇에 꽂혀 있었지요. 아빠 곰이 굵은 목소리로 말했습니다. 누가 내 죽을 먹었지?〕 |
| `images/06-return-2.webp` | A tiny bear cub holding up a completely empty bowl with a trembling lip and bursting into tears while the mother bear comforts it, very funny and touching. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 누가 내 죽도 먹었어요. 아기 곰은 제 그릇으로 달려갔습니다. 그릇 안에는 아무것도 없었지요. 아기 곰은 그릇을 뒤집어 보기까지 했습니다. 숟가락 자국만 바닥에 남아 있었지요. 꿀 한 방울도 남지 않았습니다. / 오른쪽: 아기 곰의 입술이 삐죽삐죽 나왔습니다. 누가 내 죽을 다 먹어 버렸어요! 그러고는 그만 울음을 터뜨렸지요. 엄마 곰이 아기 곰을 토닥였습니다.〕 |

## 7장 · 부서진 의자

| 파일명 | 장면 |
|---|---|
| `images/07-broken.webp` | A cottage parlour where three bears find a squashed cushion, a sagging seat, and a smashed little chair with a broken leg, the cub wailing over the pieces, comic. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 세 마리는 난롯가로 갔습니다. 아빠 곰의 의자에는 방석이 삐뚜름했지요. 누가 내 의자에 앉았지? 엄마 곰의 의자는 가운데가 푹 꺼져 있었습니다. / 오른쪽: 그러고는 그 자리에 굳어 버렸지요. 눈이 점점 동그래졌지요. 작은 의자는 다리가 부러진 채 뒹굴고 있었습니다. 누가 내 의자를 부숴 놨어요!〕 |
| `images/07-broken-2.webp` | Three bears creeping up a narrow creaking staircase in single file, the cub clinging to the father bear, comic suspense, candlelit stairwell. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 아빠 곰이 코를 킁킁거렸습니다. 아직 집 안에 있는 것 같구나. 세 마리는 숨을 죽였습니다. 아기 곰은 눈만 껌뻑였지요. / 오른쪽: 털이 곤두선 채였습니다. 엄마 곰이 아기 곰의 등을 토닥였지요. 무서워요. 내가 앞장서마. 아빠 곰이 앞으로 나섰습니다.〕 |

## 8장 · 눈이 딱 마주쳐서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | An attic bedroom where three astonished bears crowd around the smallest bed, the cub pointing with a trembling paw at a sleeping girl with golden curls, hilarious. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 다락방 문이 스르르 열렸습니다. 아빠 곰이 제 침대를 보았지요. 이불이 잔뜩 헝클어져 있었습니다. 베개도 삐뚜름했습니다. 누가 내 침대에 누웠지? / 오른쪽: 누가 내 침대에도 누웠어요. 그때 아기 곰이 제 침대를 가리켰습니다. 작은 손가락이 부들부들 떨렸지요. 여기…… 아직 누워 있어요!〕 |
| `images/08-ending-2.webp` | A girl bolting upright in the smallest bed facing three bears, then leaping out the attic window and sprinting into the birch forest as the bears watch from the sill, hilarious and lively. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 그 소리에 아이가 눈을 번쩍 떴습니다. 눈앞에 곰 세 마리가 있었지요. 아이는 소리를 지르며 벌떡 일어났습니다. 으아악! 아이는 이불을 걷어차고 창문으로 달려갔습니다. 그대로 뛰어내려 풀밭에 굴렀지요. / 오른쪽: 그러고는 뒤도 돌아보지 않고 숲으로 내달렸습니다. 곰 세 마리는 창밖을 내다보았습니다. 아기 곰이 한참 만에 입을 열었습니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
