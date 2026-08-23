# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm firelight against deep
underground blues, no text or letters in the image, a country road, a hollow
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
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small battered tin tinderbox resting on a stone floor with three pairs of enormous glowing dog eyes in the darkness behind it, a hollow tree opening above, mysterious and inviting, never scary. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 길에서 만난 노파

| 파일명 | 장면 |
|---|---|
| `images/01-witch.png` | A dusty country road beside a huge hollow tree where a bent old woman in a striped shawl beckons to a young soldier in a worn red coat, autumn light, curious and comic. |

## 2장 · 첫 번째 방

| 파일명 | 장면 |
|---|---|
| `images/02-first-dog.png` | An underground chamber where a huge dog with teacup-sized eyes sits obediently on a spread apron beside an open chest of copper coins, a grinning soldier filling his pockets, warm and funny. |

## 3장 · 두 번째, 세 번째 방

| 파일명 | 장면 |
|---|---|
| `images/03-more-dogs.png` | Two more underground chambers side by side, one dog with mill-wheel eyes over silver and one with tower-sized eyes over gold, a soldier gleefully swapping his loot, absurd scale and comedy. |

## 4장 · 노파와의 다툼

| 파일명 | 장면 |
|---|---|
| `images/04-quarrel.png` | A roadside beside the hollow tree where a soldier holds up a battered tinderbox and a bent old woman clutches her shawl in fury, and then the soldier walking off toward a town, comic standoff. |

## 5장 · 돈을 다 써 버리고

| 파일명 | 장면 |
|---|---|
| `images/05-town.png` | A lively town street where a well-dressed soldier treats a crowd at an inn, and beside it the same man alone in a bare attic room with an empty purse, telling contrast. |

## 6장 · 통을 세 번 치면

| 파일명 | 장면 |
|---|---|
| `images/06-summon.png` | A bare attic room where a soldier strikes a tinderbox and a huge dog with teacup eyes bursts through the door wagging its tail, candle flame flaring, comic and delightful. |

## 7장 · 밀가루 자국

| 파일명 | 장면 |
|---|---|
| `images/07-flour.png` | A moonlit town where a huge dog carries a princess on its back across the rooftops, and by day a thin white trail of flour running along the cobbles to a door, clever and funny. |

## 8장 · 광장에서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A packed town square where a soldier strikes his tinderbox and three colossal goofy dogs appear at once, the crowd tumbling backwards laughing, banners and sunshine, joyous chaos. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
