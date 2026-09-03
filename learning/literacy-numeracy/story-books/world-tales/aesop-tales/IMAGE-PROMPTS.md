# 제미나이 그림 프롬프트

이 책은 짧은 우화 열네 편을 담았고, 우화 하나마다 그림이 **세 장**이에요 —
도입 / 전개 / 결말 장면 각각 한 장씩. 각 그림은 펼침면 전체 폭을 가득 채우고,
그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **한 파일 = 한 장면입니다. 앞질러 가지 마세요.**
> 파일마다 뒤에 〔이 쪽에 실린 글〕을 붙여 두었습니다. 그 쪽에 실제로 실리는 글이에요.
> 그림은 **그 글에 나오는 장면만** 그려 주세요. 다음 쪽 이야기를 미리 그리면
> 그림이 글보다 한 칸씩 밀려서 책 전체가 어긋납니다. 실제로 그런 일이 있었어요.
> 장면이 둘 적혀 있으면 둘을 **한 그림 안에** 담아 주세요. 하나만 골라 그리면 안 됩니다.

> **아직 없는 그림은 여섯 장뿐입니다.**
> 열두 편이던 책에 우화 두 편을 더했어요. 앞의 열두 편과 표지·마무리는 다 그려져 있습니다.
> - 13장 말과 당나귀 — `story-13-horse.webp` · `story-13-horse-2.webp` · `story-13-horse-3.webp`
> - 14장 깃털을 주운 까마귀 — `story-14-crow.webp` · `story-14-crow-2.webp` · `story-14-crow-3.webp`
>
> 프롬프트는 이 글 아래 13장·14장 칸에 적어 두었습니다.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft golden lighting, ABSOLUTELY NO TEXT ANYWHERE IN THE IMAGE - no letters, no words, no speech bubbles, no captions, no subtitles (the story text below is only to tell you what the scene is; never draw it), animals dressed in simple little clothes and standing
upright like people, expressive exaggerated faces, wide panoramic composition,
dynamic staging.
```

## 표지 · 마무리 (이미 완성 — 다시 만들 필요 없어요)

| 파일명 | 상태 |
|---|---|
| `images/cover.webp` (세로 2:3) | 완성됨 |
| `images/end.webp` | 완성됨 |

## 1 · 토끼와 거북이

| 파일명 | 장면 |
|---|---|
| `images/story-01-race.webp` | A cocky hare pointing and laughing at a calm tortoise plodding along a country path, sunny woodland, wide panoramic view. 〔이 쪽에 실린 글 (1/42) — 그림에 글자는 넣지 마세요. 왼쪽: 숲에서 제일 빠르기로 소문난 토끼가 길을 가다 걸음을 뚝 멈추었습니다. 거북이가 엉금엉금 기어가고 있었기 때문이지요. 토끼는 거북이 앞에 폴짝 뛰어가 앉았습니다. 거북아, 너는 걸음이 어쩌면 그렇게 느리니? / 오른쪽: 토끼가 배를 잡고 깔깔 웃었습니다. 그런데 거북이는 화도 내지 않았지요. 천천히 고개를 들고 토끼를 바라봤습니다. 눈빛이 아주 차분했지요.〕 |
| `images/story-01-race-2.webp` | A squirrel raising a flag at a starting line as the hare bursts away in a cloud of dust while the tortoise takes his first slow step, forest animals crowding both sides to watch. 〔이 쪽에 실린 글 (2/42) — 그림에 글자는 넣지 마세요. 왼쪽: 뭐라고? 하하, 좋아! 어디 한번 해 보자. 소문을 들은 숲속 동물들이 우르르 모여들었습니다. 다람쥐가 깃발을 번쩍 들어 올렸지요. 준비— 땅! / 오른쪽: 거북이는 그제야 한 걸음, 또 한 걸음 떼기 시작했지요. 구경하던 동물들이 저희끼리 수군거렸습니다. 저래서야 오늘 안에 도착이나 하겠어? 괜히 나섰지, 뭐.〕 |
| `images/story-01-race-3.webp` | The hare fast asleep under a tree on one side while far across the scene the tortoise crosses the hilltop finish line with arms raised, animals cheering, warm sunset light. 〔이 쪽에 실린 글 (3/42) — 그림에 글자는 넣지 마세요. 왼쪽: 산길을 반쯤 오른 토끼가 뒤를 돌아보았습니다. 거북이는 아직도 저 아래 산기슭에 있었지요. 어휴, 저 느림보. 여기서 한참 쉬어도 되겠네. / 오른쪽: 그러고는 쿨쿨 잠이 들었지요. 그 틈에 거북이는 조금도 쉬지 않고 걷고 또 걸었습니다. 눈을 뜬 토끼가 산꼭대기를 올려다봤습니다. 거북이가 벌써 깃발 옆에 서 있었지요. 동물들이 손뼉을 치며 환호했습니다. 이겼다, 이겼다! 만세!〕 |

## 2 · 여우와 신 포도

| 파일명 | 장면 |
|---|---|
| `images/story-02-grapes.webp` | A thin hungry fox stopping in his tracks and staring up hungrily at a heavy bunch of purple grapes hanging from a tall trellis, golden vineyard afternoon. 〔이 쪽에 실린 글 (4/42) — 그림에 글자는 넣지 마세요. 왼쪽: 며칠을 굶은 여우가 있었습니다. 먹을 것을 찾아 숲을 어슬렁어슬렁 돌아다녔지요. 그런데 아무것도 눈에 띄지 않았습니다. 배에서 꼬르륵 소리가 크게 났지요. 그러다 무언가를 보고는 걸음을 뚝 멈추었습니다. / 오른쪽: 높다란 시렁 위에 포도가 주렁주렁 매달려 있었기 때문이지요. 잘 익은 포도알이 햇빛을 받아 보랏빛으로 반짝였습니다. 여우는 저도 모르게 침을 꿀꺽 삼켰지요. 목을 길게 빼고 한참을 올려다봤습니다. 오, 저거야말로 딱이로구나!〕 |
| `images/story-02-grapes-2.webp` | The fox caught mid-leap with front paws stretched out, just barely missing the grapes, sweat flying, motion lines showing several failed jumps. 〔이 쪽에 실린 글 (5/42) — 그림에 글자는 넣지 마세요. 왼쪽: 여우는 뒷다리에 힘을 잔뜩 주고 훌쩍 뛰어올랐습니다. 아깝게도 앞발 끝이 스치기만 했지요. 조금만 더, 조금만 더! 여우는 다시 폴짝, 또 폴짝 뛰어올랐습니다. / 오른쪽: 몇 번이고 뛰고 또 뛰었지만 포도는 여전히 그대로였지요. 이번에는 뒤로 물러섰다가 달려와 뛰어 봤습니다. 그래도 발끝이 닿을락 말락 할 뿐이었지요. 어느새 여우의 이마에 땀이 뻘뻘 흘렀습니다. 숨이 턱까지 차올랐지요. 포도는 저 높은 곳에서 흔들거리기만 했습니다.〕 |
| `images/story-02-grapes-3.webp` | The exhausted fox walking away with his nose haughtily in the air, the grapes still hanging untouched behind him, dust settling where he had been jumping. 〔이 쪽에 실린 글 (6/42) — 그림에 글자는 넣지 마세요. 왼쪽: 여우는 헉헉대며 털썩 주저앉고 말았습니다. 아무리 애를 써도 닿지 않았거든요. 한참을 앉아 포도를 올려다봤습니다. 그러고는 몸에 묻은 흙을 툭툭 털며 천천히 일어섰지요. 흥, 저 포도는 분명 시고 맛도 없을 거야. / 오른쪽: 괜히 먹었다가 배탈이나 났겠지. 안 먹기를 잘했군. 여우는 고개를 빳빳이 들고 그 자리를 떠났습니다. 그러면서도 자꾸 뒤를 돌아보았지요. 포도는 여전히 보랏빛으로 반짝이고 있었습니다.〕 |

## 3 · 양치기 소년

| 파일명 | 장면 |
|---|---|
| `images/story-03-wolf-boy.webp` | A bored shepherd boy yawning on a grassy hillside among grazing sheep, gazing down at a small village far below, lazy sunny afternoon. 〔이 쪽에 실린 글 (7/42) — 그림에 글자는 넣지 마세요. 왼쪽: 산비탈에서 혼자 양을 치는 소년이 있었습니다. 양들은 하루 종일 풀만 뜯었지요. 말을 붙일 사람이라고는 하나도 없었습니다. 소년은 하루 종일 풀잎만 뜯어 던졌지요. 아, 심심해. / 오른쪽: 하품을 하며 마을을 내려다보던 소년의 눈이 반짝였지요. 짓궂은 생각이 하나 떠올랐기 때문입니다. 소년은 저도 모르게 씩 웃었지요. 마을이 발밑에 조그맣게 보였지요. 소년은 두 손을 입에 모았습니다. 그러고는 숨을 크게 들이마시고 목청을 가다듬었지요.〕 |
| `images/story-03-wolf-boy-2.webp` | The boy laughing and slapping his knee while red-faced villagers with scythes and sticks puff up the hill and find nothing, sheep looking on placidly. 〔이 쪽에 실린 글 (8/42) — 그림에 글자는 넣지 마세요. 왼쪽: 늑대다! 늑대가 나타났어요! 마을 사람들이 낫이며 몽둥이를 들고 헐레벌떡 뛰어 올라왔습니다. 하지만 늑대는 그림자도 없었지요. 하하하! 다들 속았다! / 오른쪽: 어이구, 이 녀석을 그냥. 그 뒤로도 소년은 심심할 때마다 늑대가 나타났다고 외쳤지요. 마을 사람들은 몇 번이나 헛걸음을 해야 했습니다. 그때마다 소년은 배를 잡고 웃었지요. 사람들의 얼굴은 점점 굳어 갔습니다. 이제는 소리가 나도 서로 눈치만 봤지요.〕 |
| `images/story-03-wolf-boy-3.webp` | The boy shouting desperately as a real wolf slinks out of the bushes toward his sheep, while far below the villagers stay in the village ignoring him, tense dusk light. 〔이 쪽에 실린 글 (9/42) — 그림에 글자는 넣지 마세요. 왼쪽: 그러던 어느 날이었습니다. 수풀이 스윽 흔들리더니 이번에는 진짜 늑대가 나타났지요. 늑대다! 이번엔 진짜예요! 진짜라고요! / 오른쪽: 소년은 다리가 후들거렸습니다. 하지만 마을에서는 아무도 올라오지 않았지요. 또 저러는군. 신경 쓰지 말자. 마침 지나던 사냥꾼 덕분에 양들은 무사했지요. 소년은 그제야 무릎을 꿇고 울었습니다. 이제 아무도 제 말을 믿지 않았거든요.〕 |

## 4 · 개미와 베짱이

| 파일명 | 장면 |
|---|---|
| `images/story-04-ant.webp` | A long line of ants hauling grain across a sunbaked field under a blazing red sun, a grasshopper lounging in the shade of a big leaf playing a violin. 〔이 쪽에 실린 글 (10/42) — 그림에 글자는 넣지 마세요. 왼쪽: 뙤약볕이 쨍쨍 내리쬐는 여름날이었습니다. 개미들이 땀을 흘리며 부지런히 일을 했지요. 아침부터 줄을 지어 곡식을 날랐습니다. 아무도 쉬려 하지 않았지요. 겨울이 오기 전에 곳간을 채워야 했거든요. / 오른쪽: 그때 시원한 나무 그늘에서 소리가 났습니다. 베짱이가 바이올린을 켜고 있었지요. 그러다 활을 멈추고 말했습니다. 어이, 개미 친구들!〕 |
| `images/story-04-ant-2.webp` | The grasshopper laughing and gesturing mockingly with his bow while a sweating ant pauses to reply, hot summer afternoon, comic contrast. 〔이 쪽에 실린 글 (11/42) — 그림에 글자는 넣지 마세요. 왼쪽: 나처럼 즐겁게 놀면 좋을 텐데 말이야. 베짱이가 낄낄 웃으며 다시 바이올린을 켰습니다. 개미는 이마의 땀을 슥 닦았지요. 그러고는 조용히 대꾸했습니다. 겨울은 생각보다 금방 온답니다. / 오른쪽: 에이, 겨울이 오려면 아직 멀었잖아. 걱정도 팔자로군. 베짱이는 대수롭지 않다는 듯 어깨를 으쓱했지요. 그러고는 다시 신나게 노래를 불렀습니다. 개미들은 말없이 곡식을 날랐지요.〕 |
| `images/story-04-ant-3.webp` | A shivering grasshopper knocking at the ants' warm glowing door in deep snow, an ant opening it with a kindly but pointed expression, cozy light spilling into the winter night. 〔이 쪽에 실린 글 (12/42) — 그림에 글자는 넣지 마세요. 왼쪽: 이윽고 겨울이 되었지요. 들판에는 먹을 것이 없었습니다. 개미들은 따뜻한 방에서 편히 지냈지요. 그때 문 두드리는 소리가 났습니다. 굶주린 베짱이였지요. / 오른쪽: 제발 먹을 것 좀 나눠 주세요. 드리지요. 하지만 우리를 깔본 일은 반성하셔야 된답니다. 베짱이는 부끄러워 고개를 숙였습니다. 개미는 따뜻한 죽을 한 그릇 내주었지요.〕 |

## 5 · 늑대와 아기 양

| 파일명 | 장면 |
|---|---|
| `images/story-05-lamb.webp` | A big wolf standing upstream at a brook glaring down at a small lamb drinking downstream, the wolf gesturing accusingly, dappled woodland light. 〔이 쪽에 실린 글 (13/42) — 그림에 글자는 넣지 마세요. 왼쪽: 목이 마른 아기 양이 시냇가에서 물을 마시고 있었습니다. 물이 어찌나 맑은지 바닥의 조약돌까지 보였지요. 아기 양은 조심조심 물에 입을 댔습니다. 그때 저 위쪽에서 늑대 한 마리가 어슬렁어슬렁 다가왔습니다. 늑대는 아기 양을 무섭게 노려봤지요. 그러고는 괜한 트집을 잡기 시작했습니다. / 오른쪽: 너, 지금 내가 마실 물을 흐려 놓았지? 아기 양은 깜짝 놀라 대답했지요. 저는 아저씨보다 아래쪽에서 마시고 있는걸요.〕 |
| `images/story-05-lamb-2.webp` | The wolf scratching his head with a stumped expression while the little lamb calmly explains, brook and reeds around them, comic standoff. 〔이 쪽에 실린 글 (14/42) — 그림에 글자는 넣지 마세요. 왼쪽: 늑대는 잠시 말문이 막혔지만 곧 다른 트집을 꺼냈지요. 그, 그럼 작년에 네가 내 욕을 하고 다녔다며? 아기 양은 더욱 놀라며 말했습니다. / 오른쪽: 아기 양의 말은 하나도 틀린 데가 없었거든요. 아무리 생각해도 트집 잡을 것이 없었습니다. 그래도 물러설 마음은 없었지요. 늑대는 눈을 부라리며 한 걸음 다가섰습니다. 아기 양은 뒷걸음질을 쳤지요. 발밑에서 자갈이 자그락 소리를 냈습니다.〕 |
| `images/story-05-lamb-3.webp` | A large shaggy sheepdog bounding in barking as the startled wolf flees toward the trees, the little lamb safe behind the dog, sunny meadow. 〔이 쪽에 실린 글 (15/42) — 그림에 글자는 넣지 마세요. 왼쪽: 어떤 핑계도 통하지 않자 늑대는 슬슬 화가 났습니다. 흥, 그럼 네 형이 그랬겠지! 어차피 한통속 아니냐! / 오른쪽: 바로 그때였습니다. 멍멍! 거기 누구냐!〕 |

## 6 · 황금알을 낳는 거위

| 파일명 | 장면 |
|---|---|
| `images/story-06-goose.webp` | A delighted farmer couple in a humble cottage holding up a gleaming golden egg while a plump white goose sits contentedly in a straw nest, warm morning light. 〔이 쪽에 실린 글 (16/42) — 그림에 글자는 넣지 마세요. 왼쪽: 가난한 농부 부부에게 어느 날 신기한 거위 한 마리가 생겼습니다. 글쎄, 이 거위가 아침마다 알을 하나씩 낳는데 말이지요. 그 알이 온통 황금빛으로 번쩍이는 것이 아니겠습니까? 여보, 이것 좀 봐요! / 오른쪽: 우리도 이제 부자가 되는 건가? 부부는 뛸 듯이 기뻐하며 서로를 얼싸안았습니다. 이튿날 아침에도 둥지에 황금알이 놓여 있었지요. 그다음 날도 마찬가지였습니다. 곳간에 황금알이 차곡차곡 쌓였지요.〕 |
| `images/story-06-goose-2.webp` | The same cottage now repaired and comfortable, the farmer staring greedily at the goose with a calculating gleam in his eye while his wife looks uneasy. 〔이 쪽에 실린 글 (17/42) — 그림에 글자는 넣지 마세요. 왼쪽: 부부는 황금알을 팔아 살림을 하나둘 늘려 갔습니다. 낡은 지붕도 새로 고치고 밭도 한 뙈기 사들였지요. 동네에서 부러워하지 않는 사람이 없었습니다. 부부는 처음 얼마간 참 행복했지요. 그런데 시간이 지날수록 농부는 자꾸만 조바심이 났지요. / 오른쪽: 하루에 딱 하나라니, 너무 느리잖아. 저 거위 뱃속에는 황금이 잔뜩 들어 있을 게 분명해! 농부의 눈이 욕심으로 번쩍였습니다.〕 |
| `images/story-06-goose-3.webp` | The farmer slumped on the floor with his head in his hands beside an axe and an empty nest, his wife turning away sadly, the cottage suddenly bare and quiet. 〔이 쪽에 실린 글 (18/42) — 그림에 글자는 넣지 마세요. 왼쪽: 여보, 배를 갈라서 한 번에 다 꺼냅시다! 그러다 큰일 나요! 지금도 충분하잖아요. 아내가 소매를 붙잡고 말렸습니다. 그래도 농부는 끝내 듣지 않았지요. / 오른쪽: 그런데 거위의 배 속에는 황금이 하나도 없었지요. 그저 평범한 거위일 뿐이었습니다. 농부는 그제야 땅을 치고 후회했지요. 내가 무슨 짓을 한 거지… 이제 황금알도 거위도 없었습니다. 부부는 다시 가난해지고 말았지요.〕 |

## 7 · 시골 쥐와 도시 쥐

| 파일명 | 장면 |
|---|---|
| `images/story-07-mice.webp` | A country mouse proudly presenting a modest spread of grain and sweet potato on a rustic table while a city mouse in a fancy waistcoat wrinkles his nose, cozy burrow. 〔이 쪽에 실린 글 (19/42) — 그림에 글자는 넣지 마세요. 왼쪽: 시골 쥐가 도시에 사는 사촌을 집으로 초대했습니다. 시골 쥐는 아침부터 상을 차렸지요. 밀과 콩을 내놓고 잘 말린 고구마까지 정성껏 차려 냈습니다. 사촌을 맞는 마음이 설레었지요. 많이 먹어. 내가 직접 가꾼 것들이란다. / 오른쪽: 음… 이게 다야? 도시에서는 이런 맛없는 건 먹지 않아. 쇠고기나 치즈, 케이크처럼 맛있는 것만 먹지.〕 |
| `images/story-07-mice-2.webp` | Two mice arriving at a grand candlelit dining hall, the country mouse gaping in awe at a huge table piled with cheese, cake and fruit. 〔이 쪽에 실린 글 (20/42) — 그림에 글자는 넣지 마세요. 왼쪽: 나랑 도시로 가자. 진짜 맛있는 걸 보여 줄게! 호기심이 생긴 시골 쥐는 사촌을 따라나섰습니다. 둘은 밤새 걸어 반짝이는 도시에 닿았지요. 도시에 도착한 시골 쥐는 눈이 휘둥그레졌습니다. 커다란 식탁 위에 정말 진귀한 음식이 가득했기 때문이지요. / 오른쪽: 우와, 이런 건 태어나서 처음 봐! 두 쥐는 식탁 위로 폴짝 뛰어올랐습니다. 신나게 치즈를 갉아먹으려는 참이었지요. 코끝에 고소한 냄새가 확 퍼졌습니다. 시골 쥐는 침을 꿀꺽 삼켰지요.〕 |
| `images/story-07-mice-3.webp` | Two mice fleeing in panic across the banquet table as a huge cat pounces and a door bursts open, food flying, dramatic chase. 〔이 쪽에 실린 글 (21/42) — 그림에 글자는 넣지 마세요. 왼쪽: 벌컥! 문이 열리며 사람들과 고양이가 들이닥쳤습니다. 도망쳐! / 오른쪽: 심장이 터질 것 같았지요. 숨소리조차 크게 낼 수 없었습니다. 겨우 숨을 돌린 시골 쥐가 헐떡이며 말했지요. 맛 좋은 음식을 두려워하며 먹느니, 맛은 없어도 마음 놓고 먹는 편이 행복해.〕 |

## 8 · 사자와 쥐

| 파일명 | 장면 |
|---|---|
| `images/story-08-lion.webp` | A huge lion pinning a tiny trembling mouse under one paw and roaring, sunlit savanna grass, comic size contrast. 〔이 쪽에 실린 글 (22/42) — 그림에 글자는 넣지 마세요. 왼쪽: 낮잠을 자던 사자의 코 위로 작은 생쥐 한 마리가 쪼르르 지나갔습니다. 사자는 재채기를 하며 벌떡 깨어났지요. 그러고는 앞발로 생쥐를 콱 붙잡았습니다. 생쥐는 꼼짝도 할 수 없었지요. 감히 내 잠을 깨워? / 오른쪽: 생쥐는 그 자리에 납작 엎드렸지요. 생쥐는 벌벌 떨며 애원했습니다. 목소리가 가늘게 떨렸지요. 사자의 앞발이 생쥐의 몸통보다 컸습니다. 사자님, 제발 살려 주세요!〕 |
| `images/story-08-lion-2.webp` | The lion laughing heartily as he lifts his paw and the tiny mouse bows again and again before scurrying into the grass, warm sunny plain. 〔이 쪽에 실린 글 (23/42) — 그림에 글자는 넣지 마세요. 왼쪽: 뭐라고? 너 같은 조그만 녀석이 나를 어떻게 돕는다는 거냐? 사자는 어이가 없어 한참을 껄껄 웃었습니다. 웃다 보니 화도 슬그머니 풀렸지요. 사자는 눈가에 맺힌 눈물을 닦았습니다. / 오른쪽: 재미있는 녀석이군. 어서 가 보거라. 생쥐는 몇 번이나 꾸벅 인사하고 풀숲으로 사라졌지요. 사자는 대수롭지 않게 여기고 다시 잠을 청했습니다. 그 일은 곧 잊어버렸지요. 생쥐가 무슨 도움이 되겠나 싶었거든요. 숲에 다시 조용한 낮이 흘렀지요.〕 |
| `images/story-08-lion-3.webp` | The lion tangled in a hunter's rope net at night while the small mouse gnaws determinedly at the ropes, moonlight, heroic tiny effort. 〔이 쪽에 실린 글 (24/42) — 그림에 글자는 넣지 마세요. 왼쪽: 며칠 뒤 사자가 사냥꾼의 그물에 걸리고 말았지요. 아무리 몸부림쳐도 풀리지 않았습니다. 으르렁! 사자의 절망스러운 포효가 온 숲을 울렸지요. 그 소리를 들은 생쥐가 쪼르르 달려왔습니다. / 오른쪽: 생쥐는 작고 날카로운 이빨로 밤새 밧줄을 갉았지요. 사각, 사각. 새벽이 되자 그물이 툭 끊어졌습니다. 사자는 작은 친구를 오래 바라보았지요.〕 |

## 9 · 여우와 까마귀

| 파일명 | 장면 |
|---|---|
| `images/story-09-crow.webp` | A crow perched on a high branch with a wedge of cheese in its beak, a fox below looking up and beginning to flatter him, sunlit forest. 〔이 쪽에 실린 글 (25/42) — 그림에 글자는 넣지 마세요. 왼쪽: 까마귀가 어디선가 먹음직스러운 치즈 한 조각을 물고 왔습니다. 높다란 나뭇가지에 앉아 이제 막 먹으려는 참이었지요. 마침 배가 고팠던 여우가 그 아래를 지나갔습니다. 코를 킁킁거리다 위를 올려다봤지요. 그러고는 살금살금 다가왔습니다. 그러고는 목소리를 아주 곱게 냈지요. / 오른쪽: 까마귀님, 안녕하세요? 오늘따라 깃털이 어쩌면 그렇게 까맣고 윤이 나는지요! 숲에서 제일 아름다우십니다.〕 |
| `images/story-09-crow-2.webp` | The crow puffing out his chest proudly on the branch while the fox below clasps his paws in exaggerated admiration, dappled light. 〔이 쪽에 실린 글 (26/42) — 그림에 글자는 넣지 마세요. 왼쪽: 까마귀는 우쭐해져서 가슴을 쭉 폈습니다. 여우는 능청스럽게 말을 이었지요. 그런데 목소리도 그렇게 곱다던데, 사실인가요? 딱 한 소절만 들려주실 수 있을까요? / 오른쪽: 까마귀는 어깨가 으쓱해져 견딜 수가 없었습니다. 나뭇가지가 흔들릴 만큼 몸을 들썩였지요. 목을 가다듬어 보았지요. 치즈만 아니었다면 벌써 노래했을 텐데 말입니다. 여우는 시치미를 뚝 뗐지요. 그러면서도 눈은 치즈에서 떨어지지 않았습니다. 앞발을 살며시 앞으로 내밀었지요.〕 |
| `images/story-09-crow-3.webp` | The crow with beak wide open mid-caw as the cheese tumbles down toward the grinning waiting fox, motion lines, comic timing. 〔이 쪽에 실린 글 (27/42) — 그림에 글자는 넣지 마세요. 왼쪽: 까마귀는 자기도 모르게 입을 크게 벌렸습니다. 까악! 그 순간 툭! / 오른쪽: 까마귀는 빈 부리로 멍하니 앉아 있었습니다. 잘 먹겠습니다. 그리고 하나만 알려 드리자면,〕 |

## 10 · 북풍과 해님

| 파일명 | 장면 |
|---|---|
| `images/story-10-sun.webp` | A stylized north wind face and a smiling sun face facing off in the sky above a country road where a traveler in a thick coat walks along, wide sky composition. 〔이 쪽에 실린 글 (28/42) — 그림에 글자는 넣지 마세요. 왼쪽: 북풍과 해님이 하늘에서 마주쳤습니다. 둘은 서로 자기가 더 힘이 세다며 다투었지요. 다툼은 좀처럼 끝이 나지 않았습니다. 내가 한번 불면 아름드리나무도 뽑힌다고! 글쎄, 힘이란 게 과연 그런 걸까? / 오른쪽: 해님이 조용히 제안했습니다. 저 나그네의 외투를 먼저 벗기는 쪽이 이기는 것으로 하자. 좋아, 그쯤이야 식은 죽 먹기지!〕 |
| `images/story-10-sun-2.webp` | The north wind blowing a fierce gale as the traveler clutches his coat tighter, trees bending, leaves and dust flying, cold blue tones. 〔이 쪽에 실린 글 (29/42) — 그림에 글자는 넣지 마세요. 왼쪽: 북풍이 먼저 나서서 볼을 크게 부풀렸습니다. 휘잉— 휘이잉— 나뭇가지가 부러질 듯 흔들리고 먼지가 사납게 휘몰아쳤지요. 하지만 나그네는 몸을 잔뜩 웅크릴 뿐이었습니다. / 오른쪽: 그러고는 외투를 오히려 더 꽁꽁 여미는 것이었지요. 북풍은 숨이 차도록 불었지만 아무 소용이 없었습니다. 세게 불수록 나그네는 더 옷깃을 여몄지요. 모자까지 눌러쓰고 걸음을 재촉했습니다. 옷깃 사이로 바람이 한 줄기도 들지 않았지요. 북풍은 결국 두 손을 들었지요.〕 |
| `images/story-10-sun-3.webp` | The warm sun beaming down as the traveler happily pulls off his coat and slings it over his arm, wiping his brow, melting frost, golden warm tones. 〔이 쪽에 실린 글 (30/42) — 그림에 글자는 넣지 마세요. 왼쪽: 지친 북풍이 물러나자 이번에는 해님의 차례였습니다. 해님은 부드럽고 따스한 햇살을 나그네에게 가만히 비춰 주었지요. 얼었던 길이 녹고 새들이 다시 노래하기 시작했습니다. 나그네가 모자를 벗어 부채질을 했지요. 아까는 그렇게 춥더니. / 오른쪽: 이마에 땀이 송글송글 맺혔습니다. 아이고, 덥다. 나그네는 스스로 외투를 훌훌 벗었지요. 그러고는 팔에 척 걸쳤습니다. 북풍은 아무 말도 하지 못했지요.〕 |

## 11 · 개와 그림자

| 파일명 | 장면 |
|---|---|
| `images/story-11-dog.webp` | A happy dog trotting along a country road with a large piece of meat in his mouth, approaching a small wooden bridge, sunny day. 〔이 쪽에 실린 글 (31/42) — 그림에 글자는 넣지 마세요. 왼쪽: 맛있는 고깃덩어리를 입에 문 개가 있었습니다. 개는 신이 나서 집으로 돌아가고 있었지요. 오늘은 참 운이 좋은 날이야! 절로 콧노래가 나왔습니다. 오늘 저녁은 배부르게 먹을 참이었지요. 꼬리가 절로 살랑살랑 흔들렸습니다. / 오른쪽: 개는 무심코 다리 아래를 내려다보았지요. 잔잔한 개울물에 고기를 문 개가 비쳐 보였습니다. 개는 걸음을 뚝 멈췄지요. 눈이 그쪽에서 떨어지지 않았습니다. 물속의 개도 이쪽을 빤히 보고 있었지요. 개는 다리 위에서 꼼짝하지 않았습니다.〕 |
| `images/story-11-dog-2.webp` | The dog standing on the bridge staring down at his own reflection in the calm stream, tilting his head, the reflected meat looking deceptively large. 〔이 쪽에 실린 글 (32/42) — 그림에 글자는 넣지 마세요. 왼쪽: 어라? 물속에도 고기를 문 녀석이 있잖아? 개는 눈을 동그랗게 떴습니다. 고기를 문 채 물속을 한참 들여다보았지요. 게다가 저건 내 것보다 훨씬 커 보이는데! / 오른쪽: 욕심이 스멀스멀 올라왔지요. 개는 다리 난간으로 바짝 다가갔습니다. 그러자 물속의 개도 똑같이 다가왔지요. 개는 이빨을 드러냈습니다. 저것까지 빼앗아야겠어!〕 |
| `images/story-11-dog-3.webp` | The dog barking with mouth wide open as the real meat splashes into the water and drifts away, stunned expression, ripples spreading. 〔이 쪽에 실린 글 (33/42) — 그림에 글자는 넣지 마세요. 왼쪽: 개는 물속의 개를 향해 힘껏 짖었습니다. 왈! 그 순간 입이 쩍 벌어지면서— / 오른쪽: 앞발을 뻗어 봤지만 이미 늦었습니다. 개는 멍하니 그것을 바라보았지요. 그제야 깨달았습니다. 물속의 개는 바로 자기 자신이었다는 것을요. 개는 빈 입으로 터덜터덜 집에 돌아갔지요. 개는 다시는 다리 아래를 보지 않았답니다.〕 |

## 12 · 박쥐의 두 얼굴

| 파일명 | 장면 |
|---|---|
| `images/story-12-bat.webp` | A bat spreading its wings and presenting itself eagerly to a flock of birds on one side of a dramatic battlefield sky, beasts massing on the other side. 〔이 쪽에 실린 글 (34/42) — 그림에 글자는 넣지 마세요. 왼쪽: 아주 오래전 일입니다. 새들의 나라와 짐승들의 나라 사이에 큰 전쟁이 벌어졌지요. 박쥐는 어느 편에도 서지 않고 눈치만 살폈습니다. 나무 위에 앉아 아래를 내려다볼 뿐이었지요. 처음에는 새들이 이길 것처럼 보였습니다. 하늘이 온통 날개로 덮였지요. / 오른쪽: 짐승들이 자꾸 뒤로 밀리고 있었습니다. 그것을 본 박쥐는 날개를 활짝 펼쳤지요. 그러고는 새들에게 달려갔습니다. 보세요, 저도 날개가 있으니 새랍니다! 부디 저를 새 편으로 받아 주세요.〕 |
| `images/story-12-bat-2.webp` | The same bat now baring its teeth and showing its fur to a group of beasts, the birds visible retreating in the background, shifting tides of battle. 〔이 쪽에 실린 글 (35/42) — 그림에 글자는 넣지 마세요. 왼쪽: 그런데 얼마 뒤 전세가 뒤집혔습니다. 이번에는 짐승들이 우세해졌지요. 박쥐는 그것을 나무 위에서 가만히 지켜보았습니다. 그러고는 얼른 말을 바꾸었지요. 이번에는 입을 벌려 이빨을 드러냈습니다. 그러고는 곧장 짐승들에게 달려갔지요. / 오른쪽: 낯빛 하나 바뀌지 않았습니다. 저는 털도 있고 이빨도 있으니 짐승이랍니다! 부디 저를 짐승 편으로 받아 주세요.〕 |
| `images/story-12-bat-3.webp` | Birds and beasts celebrating together at a joyful feast while the bat slinks away alone toward a dark cave mouth, both groups turning their backs, dusk. 〔이 쪽에 실린 글 (36/42) — 그림에 글자는 넣지 마세요. 왼쪽: 마침내 전쟁이 끝나고 화해를 축하하는 잔치가 열렸습니다. 박쥐가 슬쩍 끼어들려 하자 양쪽 모두 등을 돌렸지요. 너는 우리가 불리할 때 짐승 편에 붙었잖아. 너는 우리가 불리할 때 새 편에 붙었잖아. / 오른쪽: 박쥐는 어느 쪽에도 끼지 못했지요. 잔칫상 한구석에 우두커니 서 있다가 돌아섰습니다. 아무도 붙잡지 않았지요. 그러고는 깜깜한 동굴로 숨어들었지요. 그때부터 밤에만 날아다니게 되었답니다. 박쥐가 나는 소리만 어둠 속에 남았지요.〕 |

## 13장 · 말과 당나귀

| 파일명 | 장면 |
|---|---|
| `images/story-13-horse.webp` | A hot dusty road under a blazing summer sun where a sleek horse walks lightly beside a small donkey buckling under a towering load of sacks, the donkey turning its head to plead. 〔이 쪽에 실린 글 (37/42) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 무더운 여름날이었습니다. 말과 당나귀가 나란히 길을 가고 있었지요. 둘 다 등에 짐을 잔뜩 지고 있었습니다. 그런데 당나귀 짐이 훨씬 무거웠지요. 자루가 등을 눌러 허리가 휘었습니다. / 오른쪽: 해가 머리 위로 올라왔습니다. 당나귀는 숨이 턱까지 찼지요. 다리가 자꾸 후들거렸습니다. 말아, 부탁이 하나 있어. 내 짐을 조금만 덜어서 져 주지 않겠니?〕 |
| `images/story-13-horse-2.webp` | The horse tossing its mane and striding ahead with its face turned away while the donkey stumbles behind, knees folding, sacks sliding sideways on the dirt track. 〔이 쪽에 실린 글 (38/42) — 그림에 글자는 넣지 마세요. 왼쪽: 당나귀가 다시 한번 부탁했습니다. 한 자루만이라도 좋아. 이대로는 못 가겠어. / 오른쪽: 말은 갈기를 흔들며 걸음을 빨리했습니다. 당나귀는 뒤에서 헐떡였지요. 그러다 그만 무릎이 꺾였습니다. 쿵!〕 |
| `images/story-13-horse-3.webp` | A roadside where a farmer piles every sack from the collapsed donkey onto the horse's back, the horse's eyes wide with dismay under the doubled load. 〔이 쪽에 실린 글 (39/42) — 그림에 글자는 넣지 마세요. 왼쪽: 주인이 달려와 당나귀를 살폈습니다. 하지만 당나귀는 일어서지 못했지요. 할 수 없구나. 주인은 당나귀 등에서 자루를 다 내렸습니다. 그러고는 그것을 몽땅 말 등에 옮겨 실었지요. / 오른쪽: 말은 그제야 눈이 휘둥그레졌습니다. 등이 아까보다 두 배로 무거워졌으니까요. 한 자루만 져 줄걸. 말은 그 말을 몇 번이나 되뇌었지요. 그래도 이제 와서 어쩔 수 없었습니다.〕 |

## 14장 · 깃털을 주운 까마귀

| 파일명 | 장면 |
|---|---|
| `images/story-14-crow.webp` | A woodland clearing where peacocks, parrots and bright birds preen for a beauty contest while a plain black crow stares glumly at its reflection in a pool. 〔이 쪽에 실린 글 (40/42) — 그림에 글자는 넣지 마세요. 왼쪽: 새들의 나라에서 잔치를 열기로 했습니다. 가장 아름다운 새를 뽑는 잔치였지요. 새들은 저마다 깃을 다듬었습니다. 공작은 꼬리를 활짝 폈고 앵무새는 부리를 닦았지요. 까마귀는 물에 제 모습을 비춰 보았습니다. / 오른쪽: 온몸이 새까맸지요. 이래서는 뽑힐 리가 없지. 까마귀는 이리저리 궁리했습니다.〕 |
| `images/story-14-crow-2.webp` | The crow gathering fallen red, yellow, blue and green feathers from the ground and sticking them all over itself, transformed into a gaudy rainbow bird, comically proud. 〔이 쪽에 실린 글 (41/42) — 그림에 글자는 넣지 마세요. 왼쪽: 다른 새들이 몸단장을 하느라 떨어뜨린 깃털이 여기저기 널려 있었습니다. 빨강, 노랑, 파랑, 초록이 다 있었지요. 까마귀는 그것을 하나씩 주웠습니다. 그러고는 제 몸에 척척 붙였지요. / 오른쪽: 얼마 뒤 까마귀는 무지개처럼 알록달록해졌습니다. 물에 비춰 보니 저도 몰라볼 지경이었지요. 이만하면 내가 가장 아름답구나! 까마귀는 가슴을 쭉 펴고 잔치에 나갔습니다.〕 |
| `images/story-14-crow-3.webp` | The feast where birds crowd around plucking their own feathers back off the crow one by one, colours falling away, a small plain black bird left standing alone. 〔이 쪽에 실린 글 (42/42) — 그림에 글자는 넣지 마세요. 왼쪽: 잔치에 모인 새들이 웅성거렸습니다. 저건 처음 보는 새인데? 그런데 공작이 고개를 갸웃했지요. / 오른쪽: 앵무새도 눈을 크게 떴습니다. 저 파란 깃은 내 거야! 새들이 하나씩 다가와 제 깃털을 도로 뽑아 갔지요. 뽑을 때마다 알록달록한 빛이 하나씩 사라졌습니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
