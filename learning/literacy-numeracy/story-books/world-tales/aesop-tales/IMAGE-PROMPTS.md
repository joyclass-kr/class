# 제미나이 그림 프롬프트

이 책은 짧은 우화 열네 편을 담았고, 우화 하나마다 그림이 **세 장**이에요 —
도입 / 전개 / 결말 장면 각각 한 장씩. 각 그림은 펼침면 전체 폭을 가득 채우고,
그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

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
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, animals dressed in simple little clothes and standing
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
| `images/story-01-race.webp` | A cocky hare pointing and laughing at a calm tortoise plodding along a country path, sunny woodland, wide panoramic view. |
| `images/story-01-race-2.webp` | A squirrel raising a flag at a starting line as the hare bursts away in a cloud of dust while the tortoise takes his first slow step, forest animals crowding both sides to watch. |
| `images/story-01-race-3.webp` | The hare fast asleep under a tree on one side while far across the scene the tortoise crosses the hilltop finish line with arms raised, animals cheering, warm sunset light. |

## 2 · 여우와 신 포도

| 파일명 | 장면 |
|---|---|
| `images/story-02-grapes.webp` | A thin hungry fox stopping in his tracks and staring up hungrily at a heavy bunch of purple grapes hanging from a tall trellis, golden vineyard afternoon. |
| `images/story-02-grapes-2.webp` | The fox caught mid-leap with front paws stretched out, just barely missing the grapes, sweat flying, motion lines showing several failed jumps. |
| `images/story-02-grapes-3.webp` | The exhausted fox walking away with his nose haughtily in the air, the grapes still hanging untouched behind him, dust settling where he had been jumping. |

## 3 · 양치기 소년

| 파일명 | 장면 |
|---|---|
| `images/story-03-wolf-boy.webp` | A bored shepherd boy yawning on a grassy hillside among grazing sheep, gazing down at a small village far below, lazy sunny afternoon. |
| `images/story-03-wolf-boy-2.webp` | The boy laughing and slapping his knee while red-faced villagers with scythes and sticks puff up the hill and find nothing, sheep looking on placidly. |
| `images/story-03-wolf-boy-3.webp` | The boy shouting desperately as a real wolf slinks out of the bushes toward his sheep, while far below the villagers stay in the village ignoring him, tense dusk light. |

## 4 · 개미와 베짱이

| 파일명 | 장면 |
|---|---|
| `images/story-04-ant.webp` | A long line of ants hauling grain across a sunbaked field under a blazing red sun, a grasshopper lounging in the shade of a big leaf playing a violin. |
| `images/story-04-ant-2.webp` | The grasshopper laughing and gesturing mockingly with his bow while a sweating ant pauses to reply, hot summer afternoon, comic contrast. |
| `images/story-04-ant-3.webp` | A shivering grasshopper knocking at the ants' warm glowing door in deep snow, an ant opening it with a kindly but pointed expression, cozy light spilling into the winter night. |

## 5 · 늑대와 아기 양

| 파일명 | 장면 |
|---|---|
| `images/story-05-lamb.webp` | A big wolf standing upstream at a brook glaring down at a small lamb drinking downstream, the wolf gesturing accusingly, dappled woodland light. |
| `images/story-05-lamb-2.webp` | The wolf scratching his head with a stumped expression while the little lamb calmly explains, brook and reeds around them, comic standoff. |
| `images/story-05-lamb-3.webp` | A large shaggy sheepdog bounding in barking as the startled wolf flees toward the trees, the little lamb safe behind the dog, sunny meadow. |

## 6 · 황금알을 낳는 거위

| 파일명 | 장면 |
|---|---|
| `images/story-06-goose.webp` | A delighted farmer couple in a humble cottage holding up a gleaming golden egg while a plump white goose sits contentedly in a straw nest, warm morning light. |
| `images/story-06-goose-2.webp` | The same cottage now repaired and comfortable, the farmer staring greedily at the goose with a calculating gleam in his eye while his wife looks uneasy. |
| `images/story-06-goose-3.webp` | The farmer slumped on the floor with his head in his hands beside an axe and an empty nest, his wife turning away sadly, the cottage suddenly bare and quiet. |

## 7 · 시골 쥐와 도시 쥐

| 파일명 | 장면 |
|---|---|
| `images/story-07-mice.webp` | A country mouse proudly presenting a modest spread of grain and sweet potato on a rustic table while a city mouse in a fancy waistcoat wrinkles his nose, cozy burrow. |
| `images/story-07-mice-2.webp` | Two mice arriving at a grand candlelit dining hall, the country mouse gaping in awe at a huge table piled with cheese, cake and fruit. |
| `images/story-07-mice-3.webp` | Two mice fleeing in panic across the banquet table as a huge cat pounces and a door bursts open, food flying, dramatic chase. |

## 8 · 사자와 쥐

| 파일명 | 장면 |
|---|---|
| `images/story-08-lion.webp` | A huge lion pinning a tiny trembling mouse under one paw and roaring, sunlit savanna grass, comic size contrast. |
| `images/story-08-lion-2.webp` | The lion laughing heartily as he lifts his paw and the tiny mouse bows again and again before scurrying into the grass, warm sunny plain. |
| `images/story-08-lion-3.webp` | The lion tangled in a hunter's rope net at night while the small mouse gnaws determinedly at the ropes, moonlight, heroic tiny effort. |

## 9 · 여우와 까마귀

| 파일명 | 장면 |
|---|---|
| `images/story-09-crow.webp` | A crow perched on a high branch with a wedge of cheese in its beak, a fox below looking up and beginning to flatter him, sunlit forest. |
| `images/story-09-crow-2.webp` | The crow puffing out his chest proudly on the branch while the fox below clasps his paws in exaggerated admiration, dappled light. |
| `images/story-09-crow-3.webp` | The crow with beak wide open mid-caw as the cheese tumbles down toward the grinning waiting fox, motion lines, comic timing. |

## 10 · 북풍과 해님

| 파일명 | 장면 |
|---|---|
| `images/story-10-sun.webp` | A stylized north wind face and a smiling sun face facing off in the sky above a country road where a traveler in a thick coat walks along, wide sky composition. |
| `images/story-10-sun-2.webp` | The north wind blowing a fierce gale as the traveler clutches his coat tighter, trees bending, leaves and dust flying, cold blue tones. |
| `images/story-10-sun-3.webp` | The warm sun beaming down as the traveler happily pulls off his coat and slings it over his arm, wiping his brow, melting frost, golden warm tones. |

## 11 · 개와 그림자

| 파일명 | 장면 |
|---|---|
| `images/story-11-dog.webp` | A happy dog trotting along a country road with a large piece of meat in his mouth, approaching a small wooden bridge, sunny day. |
| `images/story-11-dog-2.webp` | The dog standing on the bridge staring down at his own reflection in the calm stream, tilting his head, the reflected meat looking deceptively large. |
| `images/story-11-dog-3.webp` | The dog barking with mouth wide open as the real meat splashes into the water and drifts away, stunned expression, ripples spreading. |

## 12 · 박쥐의 두 얼굴

| 파일명 | 장면 |
|---|---|
| `images/story-12-bat.webp` | A bat spreading its wings and presenting itself eagerly to a flock of birds on one side of a dramatic battlefield sky, beasts massing on the other side. |
| `images/story-12-bat-2.webp` | The same bat now baring its teeth and showing its fur to a group of beasts, the birds visible retreating in the background, shifting tides of battle. |
| `images/story-12-bat-3.webp` | Birds and beasts celebrating together at a joyful feast while the bat slinks away alone toward a dark cave mouth, both groups turning their backs, dusk. |

## 13장 · 말과 당나귀

| 파일명 | 장면 |
|---|---|
| `images/story-13-horse.webp` | A hot dusty road under a blazing summer sun where a sleek horse walks lightly beside a small donkey buckling under a towering load of sacks, the donkey turning its head to plead. |
| `images/story-13-horse-2.webp` | The horse tossing its mane and striding ahead with its face turned away while the donkey stumbles behind, knees folding, sacks sliding sideways on the dirt track. |
| `images/story-13-horse-3.webp` | A roadside where a farmer piles every sack from the collapsed donkey onto the horse's back, the horse's eyes wide with dismay under the doubled load. |

## 14장 · 깃털을 주운 까마귀

| 파일명 | 장면 |
|---|---|
| `images/story-14-crow.webp` | A woodland clearing where peacocks, parrots and bright birds preen for a beauty contest while a plain black crow stares glumly at its reflection in a pool. |
| `images/story-14-crow-2.webp` | The crow gathering fallen red, yellow, blue and green feathers from the ground and sticking them all over itself, transformed into a gaudy rainbow bird, comically proud. |
| `images/story-14-crow-3.webp` | The feast where birds crowd around plucking their own feathers back off the crow one by one, colours falling away, a small plain black bird left standing alone. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
