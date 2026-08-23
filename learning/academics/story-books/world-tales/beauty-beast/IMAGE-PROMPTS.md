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
bold clean outlines, saturated storybook colors, warm candlelight and snowy blue
exteriors, no text or letters in the image, a merchant's cottage, a snowy forest,
an enchanted castle with a rose garden and a grand library, expressive faces,
wide panoramic composition, warm and gentle; the Beast is drawn as large, shaggy
and sad-eyed, never frightening or monstrous.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Belle: a girl about 15 with dark braided hair, a blue cloak and always a book in
hand. The merchant: a kindly greying father in a worn travelling coat. The two
elder sisters: fashionable girls in bright ruffled dresses, vain and comic. The
Beast: a large shaggy creature with horns, a velvet coat and gentle sad eyes,
drawn like a big awkward animal rather than a monster.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a single red rose under a glass dome on a stone table in a grand candlelit hall, a large shaggy silhouette in the shadows behind and a girl in a blue cloak at the doorway, warm and mysterious, never scary. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 장사꾼의 세 딸

| 파일명 | 장면 |
|---|---|
| `images/01-family.png` | A modest country cottage where two showily dressed sisters wail over lost finery while a plain-dressed girl calmly kneads bread and their father sits with his head in his hands, warm domestic light. |

## 2장 · 아버지의 선물

| 파일명 | 장면 |
|---|---|
| `images/02-rose.png` | A snowbound forest road at night where a lost traveller stumbles toward the gates of a vast castle, and inside a warm hall with a laid table and no one present, eerie but inviting. |

## 3장 · 꺾어서는 안 될 꽃

| 파일명 | 장면 |
|---|---|
| `images/03-plucked.png` | A snowy castle garden where roses bloom impossibly in the cold, a traveller freezing mid-reach as a huge shaggy horned figure looms in the archway behind, dramatic but not gory. |

## 4장 · 벨이 나서다

| 파일명 | 장면 |
|---|---|
| `images/04-belle.png` | A cottage doorway at dawn where a girl in a blue cloak steps out into the snow while her father reaches after her and two sisters look on, lanterns and long shadows, resolute. |

## 5장 · 성에서의 나날

| 파일명 | 장면 |
|---|---|
| `images/05-castle.png` | A vast castle library with shelves to the ceiling where a girl reads in a window seat and a large shaggy figure sits awkwardly on a too-small chair listening, firelight, warm and gentle. |

## 6장 · 거울 속의 집

| 파일명 | 장면 |
|---|---|
| `images/06-mirror.png` | A candlelit room where a girl gazes into a hand mirror showing a sick old man in a distant cottage, a large shaggy figure standing quietly behind her with bowed head, tender and sad. |

## 7장 · 늦어 버린 날

| 파일명 | 장면 |
|---|---|
| `images/07-late.png` | A cottage where two sisters cling to a girl's sleeves delaying her while a calendar of days slips by, and then the same girl running down a moonlit road toward a distant castle, urgent. |

## 8장 · 뜰에 쓰러진 야수

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A castle rose garden at dawn where a girl cradles a fallen shaggy figure, light bursting across the roses as the figure becomes a young man opening his eyes, radiant and moving. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
