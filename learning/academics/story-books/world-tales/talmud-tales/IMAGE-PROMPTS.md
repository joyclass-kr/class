# 제미나이 그림 프롬프트

각 이야기마다 그림이 **두 장**이에요 — 도입부(오프닝) 한 장, 결말/반전 장면 한 장.
특히 "결말" 그림은 이야기의 진짜 재미 포인트(트릭, 반전, 웃음 포인트)를 담고 있으니
꼭 챙겨서 넣어주세요. 아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤,
파일명을 정확히 맞춰서 `images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

이야기 분량이 긴 경우(결말 문단이 길어서 한 페이지에 다 안 들어가는 경우) 자동으로
중간 페이지가 하나 더 생기고, 그 페이지 전용 그림(`-3.png`)도 필요해요. 지금은
**소금을 진 당나귀**, **영리한 상인의 함정** 두 편만 해당돼요.

권장 크기: 가로 4 : 세로 3 비율, PNG. **단, 표지(`cover.png`)만 예외 — 세로 2 : 3 비율로 만들어주세요.** 표지 그림칸은 책을 펼쳤을 때 왼쪽 반쪽 전체를 꽉 채우는데, 그 칸 자체가 가로로 넓은 4:3이 아니라 세로로 긴 2:3 모양이에요. 4:3 가로 그림을 넣으면 화면에 꽉 채우려다 양옆이 절반 가까이 잘려나가니 꼭 세로 비율로 따로 생성해주세요. (지금 들어있는 `cover.png`는 가로 비율이라 잘려 보일 거예요 — 세로로 다시 만들어 교체해주세요.)

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, warm watercolor and colored-pencil style,
soft golden lighting, gentle rounded shapes, storybook atmosphere, no text or
letters in the image, consistent warm earthy color palette (parchment, gold,
terracotta, deep brown), expressive character faces, dynamic staging.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an old leather-bound storybook standing upright on a wooden pedestal, glowing warmly from within, a small wise old tree with sprawling roots growing up and out of its open pages, night sky full of stars rising above, magical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 이야기 1 · 소금을 진 당나귀

| 파일명 | 장면 |
|---|---|
| `images/story-01-donkey.png` | A small gray donkey loaded with sacks, mid-splash, falling sideways into a shallow river while crossing with a merchant on the bank, sparkling water droplets, sunny daytime, humorous moment. |
| `images/story-01-donkey-3.png` | The same donkey deliberately flopping sideways into the river again, this time carrying large fluffy cotton sacks instead of salt, mid-splash, a mischievous confident grin, anticipating a lighter load. |
| `images/story-01-donkey-2.png` | The same donkey now visibly exhausted and drenched, straining under a hugely swollen soaked cotton load twice its size, stumbling out of the river, comedic contrast to how light it expected to feel, merchant looking on with a knowing smirk. |

## 이야기 2 · 두 개의 자루

| 파일명 | 장면 |
|---|---|
| `images/story-02-sacks.png` | A traveler walking down a dusty road carrying two cloth sacks tied around the neck, one hanging in front and one hanging behind the back, warm dusk light, a thoughtful expression. |
| `images/story-02-sacks-2.png` | The traveler standing still with a startled, humbled expression as a friend holds up two angled mirrors to reveal the overflowing back sack behind him, warm indoor lantern light, a moment of quiet realization. |

## 이야기 3 · 울타리에 낀 여우

| 파일명 | 장면 |
|---|---|
| `images/story-03-fox.png` | A skinny fox squeezing through a narrow gap in a wooden vineyard fence, lush grapevines with purple grapes visible beyond the fence, golden afternoon light. |
| `images/story-03-fox-2.png` | The same fox now with a round, comically full belly, stuck halfway in the same narrow fence gap trying desperately to escape, grapes scattered around, moonlit night, funny and relatable struggle. |

## 이야기 4 · 세 친구 이야기

| 파일명 | 장면 |
|---|---|
| `images/story-04-friends.png` | A nervous young royal servant standing before a grand palace gate at dawn, clutching a bag of gold coins that refuses to move with him, warm dramatic lighting, anxious expression. |
| `images/story-04-friends-2.png` | The same servant now standing tall and calm before a king on his throne, other officials stepping forward from the crowd to speak in his defense, warm golden throne room, a triumphant and relieved mood. |

## 이야기 5 · 지갑의 진짜 주인

| 파일명 | 장면 |
|---|---|
| `images/story-05-purse.png` | Two travelers in desert robes arguing over a small leather coin purse on a sandy road, gesturing at each other, warm sunset light, a caravan in the background. |
| `images/story-05-purse-2.png` | A wise old judge in a simple tent opening the coin purse to reveal silver coins and a tiny blue glass bead, one traveler smiling with relief and the other looking away guiltily, warm lamp light. |

## 이야기 6 · 한 다리로 서서 배우겠다던 손님

| 파일명 | 장면 |
|---|---|
| `images/story-06-hillel.png` | An angry stern teacher chasing away a surprised visitor with a raised wooden ruler at a doorway, simple room with scrolls and books, dramatic warm light. |
| `images/story-06-hillel-2.png` | A kind elderly teacher balanced calmly on one leg with a gentle smile, teaching the same wide-eyed visitor who now looks amazed and enlightened, soft warm candlelight, a peaceful study room. |

## 이야기 7 · 70년 동안 잠든 나그네

| 파일명 | 장면 |
|---|---|
| `images/story-07-tree.png` | A curious young traveler watching an old man plant a tiny carob tree sapling in the ground, warm afternoon light, a peaceful rural path. |
| `images/story-07-tree-2.png` | The same traveler now waking up astonished beneath an enormous, ancient carob tree heavy with ripe fruit, rubbing his eyes in disbelief, dappled sunlight through leaves, a sense of wonder and passage of time. |

## 이야기 8 · "이것 또한 지나가리라"

| 파일명 | 장면 |
|---|---|
| `images/story-08-ring.png` | A close-up of an ornate engraved gold ring resting on a velvet cushion, soft candlelight, a wise young prince's silhouette blurred in the background, warm and reflective mood. |
| `images/story-08-ring-2.png` | A king in celebratory royal robes amid a joyful victory feast, pausing mid-laugh to glance down at the ring on his hand, his triumphant smile softening into quiet humility, warm golden banquet hall lighting. |

## 이야기 9 · 방을 가득 채운 촛불

| 파일명 | 장면 |
|---|---|
| `images/story-09-candle.png` | Two older brothers proudly presenting piles of straw and cotton wool in a mostly-empty room, while a younger brother stands quietly to the side holding just a tiny candle, warm daylight, comedic contrast in scale. |
| `images/story-09-candle-2.png` | A single small lit candle on a table in a cozy dark room at night, its warm glow filling every corner and reaching into every shadow, the father and older brothers watching in amazed silence, magical warm lighting. |

## 이야기 10 · 왕의 세 가지 질문

| 파일명 | 장면 |
|---|---|
| `images/story-10-riddles.png` | A humble, ragged but confident old wise man standing before a stern king on his throne, royal court watching tensely, warm golden throne room, dramatic tension. |
| `images/story-10-riddles-2.png` | The same old man grinning as the king bursts into laughter, a large old-fashioned balance scale with a huge salt sack nearby, the royal court joining in the laughter, warm celebratory throne room mood. |

## 이야기 11 · 영리한 상인의 함정

| 파일명 | 장면 |
|---|---|
| `images/story-11-jar.png` | A traveling merchant kneeling by an old stone well at night, secretly burying a small sack of gold coins in a freshly dug hole, moonlight, a distant run-down hut with a gap in its wall glowing faintly from a candle inside, quiet and suspenseful mood. |
| `images/story-11-jar-3.png` | A greedy old man rushing back toward the well at night carrying a small sack of gold, sneaky excited expression, unaware he is being watched, moonlit courtyard near a run-down hut. |
| `images/story-11-jar-2.png` | The pivotal "sting" moment: an old man crouched by the well re-burying the stolen gold sack at night by lantern light, while the merchant secretly watches with a sly knowing smile from behind bushes just out of the old man's sight, moonlit, playful dramatic irony, split-second-before-the-reveal energy. |

## 이야기 12 · 닭 한 마리를 나눈 나그네

| 파일명 | 장면 |
|---|---|
| `images/story-12-chicken.png` | A modest wooden family dinner table with a small roasted chicken as the centerpiece, a large family of six and a traveling guest gathered around, warm candlelight, hopeful expectant faces. |
| `images/story-12-chicken-2.png` | The traveler cheerfully eating a generous portion of chicken meat alone while the puzzled family looks on with small individual portions (a head, a wing, a drumstick) on their own plates, comedic warm dinner scene. |

## 이야기 13 · 세 가지 쓸모없는 것

| 파일명 | 장면 |
|---|---|
| `images/story-13-solomon.png` | A king in royal robes hiding tensely inside a small cave, a spider delicately spinning a web across the cave entrance in the moonlight, enemy soldiers' torches visible passing by outside, suspenseful mood. |
| `images/story-13-solomon-2.png` | The same king disguised as a wandering madman with wild hair and tattered robes, acting strangely in front of confused enemy soldiers who wave him away, dusty warm daylight, dramatic irony. |

## 이야기 14 · 닭이 된 왕자

| 파일명 | 장면 |
|---|---|
| `images/story-14-prince.png` | A young prince crouched naked under a grand dining table pecking at breadcrumbs on the floor like a chicken, worried royal parents and doctors standing helplessly nearby, warm palace interior. |
| `images/story-14-prince-2.png` | A gentle wise old sage sitting under the same table beside the prince, both wearing simple shirts now, smiling warmly at each other like old friends, soft golden light, heartwarming moment. |

## 이야기 15 · 배 밑바닥에 구멍을 뚫는 사람

| 파일명 | 장면 |
|---|---|
| `images/story-15-boat.png` | A wooden ferry boat full of passengers crossing a river, one man in the corner crouched down drilling into the floorboards with a hand auger, a thin trickle of water seeping in, other passengers starting to notice with alarm. |
| `images/story-15-boat-2.png` | The full boat of passengers gathered around the man, an elderly passenger calmly pointing at the small hole while water rises around their feet, the drilling man looking down in sudden realization and shame, tense but warm resolution mood. |

## 이야기 16 · 마흔 살에 글을 배운 목동

| 파일명 | 장면 |
|---|---|
| `images/story-16-akiva.png` | A weathered middle-aged shepherd crouching beside a large rock at a well, staring in wonder at a smooth round hole worn into the stone by dripping water, sheep grazing nearby, warm afternoon light. |
| `images/story-16-akiva-2.png` | The same man now older and dignified, sitting and reading a large book surrounded by young students looking up to him with admiration, warm scholarly room full of scrolls, inspiring golden light. |

## 이야기 17 · 가깝지만 먼 길

| 파일명 | 장면 |
|---|---|
| `images/story-17-path.png` | A wise elderly traveler in robes asking directions from a small clever-looking child at a rural crossroads with two diverging dirt paths, warm daytime countryside. |
| `images/story-17-path-2.png` | The same traveler laughing warmly and patting the child's head after returning from a dead-end path blocked by a fence and field, the child grinning knowingly, warm golden afternoon light. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- "-2" 파일이 진짜 재미 포인트(반전/트릭)를 담당하니, 시간이 부족하면 이 그림들부터 먼저 만드는 걸 추천해요.
