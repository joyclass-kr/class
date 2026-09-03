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
bold clean outlines, saturated storybook colors, warm firelight against deep
underground blues, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), a country road, a hollow
tree, three underground treasure chambers, a town street and a copper castle,
expressive comic faces, wide panoramic composition, funny and never frightening;
the three dogs are drawn as huge but goofy and friendly-looking.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The soldier: a cheerful young man in a worn red coat with a sabre and empty
pockets. The witch: a bent old woman in a striped shawl with a very long chin,
drawn as odd rather than evil. The three dogs: enormous dogs with eyes the size
of teacups, mill wheels and towers, all goofy and eager. The princess: a girl in
a copper-coloured gown who is bored of her tower.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small battered tin tinderbox resting on a stone floor with three pairs of enormous glowing dog eyes in the darkness behind it, a hollow tree opening above, mysterious and inviting, never scary. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 길에서 만난 노파

| 파일명 | 장면 |
|---|---|
| `images/01-witch.webp` | A dusty country road beside a huge hollow tree where a bent old woman in a striped shawl with a very long chin beckons to a young soldier in a worn red coat, autumn light. 〔이 쪽에 실린 글 (1/16) — 그림에 글자는 넣지 마세요. 왼쪽: 전쟁이 끝났습니다. 병사 하나가 집으로 가는 길이었지요. 어깨에는 배낭을, 허리에는 칼을 차고 있었습니다. 옷은 낡았지만 걸음은 씩씩했지요. 다만 주머니에는 동전 몇 닢뿐이었습니다. 길가에 커다란 나무가 한 그루 서 있었지요. / 오른쪽: 그 아래 등이 굽은 노파가 앉아 있었습니다. 턱이 가슴에 닿을 만큼 길었지요. 노파가 병사를 불러 세웠습니다. 돈을 벌고 싶지 않나? 병사는 걸음을 멈추었습니다.〕 |
| `images/01-witch-2.webp` | An old woman pointing into the dark opening of a hollow tree while a soldier peers in with gleaming eyes, a coil of rope at their feet, curious and comic. 〔이 쪽에 실린 글 (2/16) — 그림에 글자는 넣지 마세요. 왼쪽: 노파는 나무를 가리켰습니다. 이 나무 속은 텅 비어 있다네. 밧줄을 타고 내려가면 방이 셋 있지. / 오른쪽: 그런데 왜 저에게 그런 걸 알려 주십니까? 대신 내 부싯깃 통만 찾아다 주게. 우리 할머니가 두고 온 것이거든.〕 |

## 2장 · 첫 번째 방

| 파일명 | 장면 |
|---|---|
| `images/02-first-dog.webp` | A soldier descending on a rope into a wide underground cavern with three doors, opening the first to face a huge dog with teacup-sized eyes staring at him, comic tension. 〔이 쪽에 실린 글 (3/16) — 그림에 글자는 넣지 마세요. 왼쪽: 노파는 병사의 허리에 밧줄을 매어 주었습니다. 앞치마도 한 장 건네주었지요. 개가 나오거든 이것을 펴서 그 위에 올려놓게. 그러면 얌전해질 걸세. / 오른쪽: 넓은 굴에 문이 셋 나란히 있었습니다. 병사가 첫 번째 문을 열었지요. 안에 커다란 개 한 마리가 앉아 있었습니다. 눈이 찻잔만 했지요. 개가 병사를 빤히 쳐다보았습니다. 병사는 침을 꿀꺽 삼켰지요.〕 |
| `images/02-first-dog-2.webp` | An underground chamber where a huge dog sits obediently on a spread apron wagging its tail beside an open chest of copper coins, a grinning soldier stuffing his pockets, warm and funny. 〔이 쪽에 실린 글 (4/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 노파가 일러 준 대로 했습니다. 앞치마를 바닥에 척 펼쳤지요. 그러고는 개를 번쩍 들어 그 위에 올려놓았습니다. 그러자 개가 얌전해졌지요. 꼬리까지 살랑살랑 흔들었습니다. 조금 전까지 이글이글하던 눈이 순해졌지요. 어이쿠, 정말이잖아. / 오른쪽: 병사는 방 한가운데 궤짝을 열어 보았습니다. 동전이 가득 들어 있었지요. 이게 다 내 것이란 말이지! 병사는 주머니를 두둑하게 채웠습니다. 배낭에도 모자에도 동전을 담았지요. 그러고는 두 번째 방으로 갔습니다.〕 |

## 3장 · 두 번째, 세 번째 방

| 파일명 | 장면 |
|---|---|
| `images/03-more-dogs.webp` | An underground chamber with a dog with mill-wheel eyes on an apron beside a chest of silver, a soldier gleefully dumping copper coins on the floor, absurd and comic. 〔이 쪽에 실린 글 (5/16) — 그림에 글자는 넣지 마세요. 왼쪽: 두 번째 방에도 개가 앉아 있었습니다. 이번에는 눈이 물레방아만 했지요. 병사는 이번에도 앞치마를 폈습니다. 개는 순순히 그 위에 올라앉았지요. 궤짝을 여니 은화가 가득했습니다. 동전은 이제 필요 없지. / 오른쪽: 병사는 동전을 몽땅 쏟아 버렸습니다. 그러고는 은화를 그득그득 채웠지요. 주머니가 묵직해졌습니다. 이제 남은 것은 세 번째 방뿐이었지요. 병사는 문고리를 잡았습니다. 안에서 굵은 숨소리가 들렸지요.〕 |
| `images/03-more-dogs-2.webp` | An underground chamber with a dog whose eyes are as big as towers sitting on an apron, a soldier filling every pocket with gold and pocketing a small battered tinderbox, dazzling. 〔이 쪽에 실린 글 (6/16) — 그림에 글자는 넣지 마세요. 왼쪽: 세 번째 방의 개는 어마어마했지요. 눈이 탑만큼이나 컸습니다. 숨을 내쉴 때마다 방 안이 후끈했지요. 발톱이 돌바닥을 드르륵 긁었습니다. 병사는 다리가 후들거렸습니다. 그래도 앞치마를 펴서 개를 올려놓았지요. / 오른쪽: 개는 이번에도 얌전해졌습니다. 궤짝을 여니 금화가 넘칠 듯 담겨 있었습니다. 병사는 은화도 미련 없이 버렸지요. 금화만 골라 몸에 지닐 수 있는 만큼 담았습니다. 이제 됐다. 부싯깃 통도 챙기자.〕 |

## 4장 · 노파와의 다툼

| 파일명 | 장면 |
|---|---|
| `images/04-quarrel.webp` | A roadside beside a hollow tree where a soldier holds a battered tinderbox behind his back while a bent old woman reaches for it furiously, comic standoff. 〔이 쪽에 실린 글 (7/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사가 나무 밖으로 올라왔습니다. 햇빛이 눈부셨지요. 노파가 얼른 손을 내밀었습니다. 부싯깃 통은 챙겼겠지? 병사는 통을 손에 든 채 물었습니다. / 오른쪽: 그건 자네가 알 바 아니네. 어서 이리 내놓기나 하게. 병사는 통을 뒤로 감췄지요. 노파의 손이 부들부들 떨렸습니다.〕 |
| `images/04-quarrel-2.webp` | A soldier walking away down a country road with heavy pockets while an old woman stamps her feet behind him, and ahead a busy town at sunset, comic and lively. 〔이 쪽에 실린 글 (8/16) — 그림에 글자는 넣지 마세요. 왼쪽: 노파는 끝내 입을 열지 않았습니다. 병사도 물러서지 않았지요. 그럼 저는 이만 가 보겠습니다. 병사는 통을 챙겨 들고 걸음을 옮겼습니다. 노파가 뒤에서 발을 굴렀지요. / 오른쪽: 병사는 뒤도 돌아보지 않았습니다. 주머니가 무거워 걸음이 느렸지만 기분은 좋았지요. 걸을 때마다 금화가 짤랑짤랑 울렸지요. 병사는 저도 모르게 콧노래를 불렀습니다. 해가 기울 무렵 큰 마을에 닿았습니다. 거리에는 사람이 북적였지요. 병사는 제일 좋은 여관 앞에 섰습니다.〕 |

## 5장 · 돈을 다 써 버리고

| 파일명 | 장면 |
|---|---|
| `images/05-town.webp` | A lively town street where a well-dressed soldier treats a laughing crowd outside an inn and hands coins to the poor, golden light, generous and warm. 〔이 쪽에 실린 글 (9/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 여관에서 제일 좋은 방을 얻었습니다. 좋은 옷을 지어 입고 새 신도 샀지요. 거리에서 만나는 사람마다 한턱을 냈습니다. 가난한 사람에게는 금화를 나누어 주었지요. 친구가 순식간에 늘었습니다. 자네처럼 훌륭한 사람은 처음 보네! / 오른쪽: 사람들은 병사를 떠받들었지요. 병사는 어깨가 으쓱했습니다. 그러다 문득 주머니를 들여다보았지요. 금화가 생각보다 빨리 줄어 있었습니다. 얼마 뒤에는 한 닢도 남지 않았지요. 여관 주인이 방값을 달라고 했습니다.〕 |
| `images/05-town-2.webp` | A bare attic room where a soldier in shabby clothes sits alone with an empty purse and a stub of candle, digging a battered tinderbox out of his pack, quiet and telling. 〔이 쪽에 실린 글 (10/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 좋은 방을 내주어야 했습니다. 지붕 밑 좁은 다락방으로 옮겼지요. 옷도 하나둘 팔았습니다. 친구들도 발길을 끊었지요. 요즘 통 안 보이던데. / 오른쪽: 아무도 계단을 올라와 주지 않았습니다. 어느 밤 병사는 초에 불을 붙이려 했지요. 그런데 성냥이 하나도 없었습니다.〕 |

## 6장 · 통을 세 번 치면

| 파일명 | 장면 |
|---|---|
| `images/06-summon.webp` | A bare attic room where a soldier strikes a tinderbox and a huge dog with teacup eyes bursts through the door wagging its tail, candle flame flaring, comic and delightful. 〔이 쪽에 실린 글 (11/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 부싯돌을 탁 쳤습니다. 불꽃이 튀는 순간이었지요. 방문이 벌컥 열렸습니다. 커다란 개 한 마리가 성큼 들어왔지요. 눈이 찻잔만 한 그 개였습니다. / 오른쪽: 병사는 놀라 뒤로 넘어질 뻔했지요. 그러다 곧 정신을 차렸습니다. 먹을 것 좀 가져다주게.〕 |
| `images/06-summon-2.webp` | A soldier in fine clothes at a laden table with three dogs of increasing size behind him, friends crowding back in, warm lamplight, funny and pointed. 〔이 쪽에 실린 글 (12/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 이것저것 시험해 보았습니다. 한 번 치면 첫째 개가 왔지요. 두 번 치면 눈이 물레방아만 한 개가 왔습니다. 세 번 치면 눈이 탑만 한 개가 왔지요. 병사는 다시 좋은 방으로 옮겼습니다. 옷도 새로 지어 입었지요. 떠났던 친구들이 하나둘 돌아왔습니다. 다들 어제 만난 사이처럼 굴었지요. / 오른쪽: 자네를 얼마나 찾았는지 아나! 자네가 그렇게 훌륭한 줄 알았지! 병사는 그 말을 듣고 속으로 웃었지요.〕 |

## 7장 · 밀가루 자국

| 파일명 | 장면 |
|---|---|
| `images/07-flour.webp` | A moonlit town where a huge dog carries a sleeping princess on its back across the rooftops toward a lit attic window, magical and gentle. 〔이 쪽에 실린 글 (13/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 공주가 몹시 궁금해졌습니다. 얼굴 한 번만 보면 좋겠는데. 그날 밤 병사는 통을 한 번 쳤지요. 첫째 개가 나타났습니다. / 오른쪽: 개는 지붕을 넘어 성으로 달려갔습니다. 잠든 공주를 등에 태우고 돌아왔지요. 병사는 공주와 밤새 이야기를 나누었습니다. 공주는 성 밖 이야기를 처음 들었지요. 새벽이 되자 개가 공주를 다시 데려다주었습니다. 공주는 그것이 꿈인 줄만 알았지요.〕 |
| `images/07-flour-2.webp` | A thin white trail of flour running along moonlit cobbles and up to an inn door, soldiers following it by daylight, clever and funny. 〔이 쪽에 실린 글 (14/16) — 그림에 글자는 넣지 마세요. 왼쪽: 이튿날 공주가 간밤의 꿈 이야기를 했습니다. 왕비는 고개를 갸웃했지요. 아무래도 그냥 꿈 같지 않았습니다. 그래서 꾀를 하나 냈지요. 공주의 옷자락에 작은 주머니를 매달았습니다. 주머니에는 밀가루를 채우고 구멍을 뚫어 두었지요. 이러면 어디로 가는지 알겠지. / 오른쪽: 왕비는 밤새 잠을 이루지 못했습니다. 그날 밤에도 개가 공주를 데려갔습니다. 달리는 내내 밀가루가 조금씩 새어 나왔지요. 길 위에 하얀 자국이 죽 이어졌습니다. 아침에 군사들이 그 자국을 따라갔지요. 자국은 어느 여관 다락방 앞에서 멈췄습니다.〕 |

## 8장 · 광장에서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.webp` | A soldier at a barred prison window asking a small boy in the street for a favour, and the boy handing a battered tinderbox through the bars, hopeful and clever. 〔이 쪽에 실린 글 (15/16) — 그림에 글자는 넣지 마세요. 왼쪽: 병사는 그길로 붙잡히고 말았습니다. 감옥에 갇혀 하룻밤을 보냈지요. 그런데 부싯깃 통은 여관에 두고 온 뒤였습니다. 병사는 창살 틈으로 밖을 보았지요. 길에서 놀던 아이가 눈에 띄었습니다. 얘야, 심부름 하나만 해 주련? / 오른쪽: 병사는 여관에 둔 통을 가져다 달라고 했지요. 아이는 신이 나서 달려갔습니다. 그러고는 창살 사이로 통을 건넸지요. 병사는 그것을 품에 꼭 넣었습니다. 고맙다, 얘야.〕 |
| `images/08-ending-2.webp` | A packed town square where a soldier strikes his tinderbox and three colossal goofy dogs appear at once, the crowd tumbling backwards laughing, banners and sunshine, joyous chaos. 〔이 쪽에 실린 글 (16/16) — 그림에 글자는 넣지 마세요. 왼쪽: 광장에는 사람들이 가득했습니다. 임금님도 왕비도 나와 앉았지요. 병사가 조용히 부탁했습니다. 마지막으로 소원 하나만 들어주세요. 임금님이 고개를 끄덕였지요. 병사는 부싯깃 통을 꺼내 세 번 쳤습니다. / 오른쪽: 개 세 마리가 한꺼번에 나타났지요. 어찌나 크고 요란한지 사람들이 나자빠졌습니다. 그러다 다들 웃음보를 터뜨렸지요. 개들이 꼬리를 살랑살랑 흔들었거든요. 임금님이 맨 먼저 자리에서 일어났습니다. 그날 병사는 벌 대신 잔치를 대접받았답니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
