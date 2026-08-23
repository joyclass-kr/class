# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, cold blue northern light with
warm golden accents, no text or letters in the image, Russian wheat fields,
birch woods, snowy steppe and an onion-domed palace, expressive comic faces,
wide panoramic composition, magical and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Ivan: a cheerful scruffy youngest brother in a patched peasant coat and bast
shoes. The humpbacked pony: a small shaggy horse with two humps, huge floppy ears
and clever bright eyes. The tsar: a fat old man in a fur hat and gold robe, greedy
and impatient. The firebird: a bird of pure flame with sweeping golden feathers.
The two elder brothers: lazy, loud and always eating.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small shaggy pony with two humps and enormous ears standing beside a young peasant boy in a snowy Russian field at night, a glowing feather in the boy's hand casting golden light, onion-domed towers far behind, magical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 밀밭을 지키는 밤

| 파일명 | 장면 |
|---|---|
| `images/01-field.png` | A moonlit Russian wheat field where a scruffy young peasant sits wide awake among the stalks as a white-maned mare comes trotting through the grain, silver light, magical. |

## 2장 · 조랑말을 얻다

| 파일명 | 장면 |
|---|---|
| `images/02-pony.png` | A dawn field where a white mare presents two magnificent stallions and one small shaggy two-humped pony with long floppy ears to a delighted young peasant, comic contrast, golden light. |

## 3장 · 궁궐로 가다

| 파일명 | 장면 |
|---|---|
| `images/03-palace.png` | A bustling Russian market square before an onion-domed palace where a fat tsar in a fur hat marvels at two splendid horses, a scruffy boy on a tiny humpbacked pony trotting up behind, lively. |

## 4장 · 불새의 깃털

| 파일명 | 장면 |
|---|---|
| `images/04-feather.png` | A dark birch forest path lit by a single blazing golden feather lying on the moss, a boy reaching for it while a small pony shakes its head in warning, dramatic light. |

## 5장 · 불새를 잡아라

| 파일명 | 장면 |
|---|---|
| `images/05-firebird.png` | A mountain clearing at midnight where blazing firebirds descend onto scattered grain, one boy leaping to grab a bird while a small pony braces beside him, showers of sparks, thrilling. |

## 6장 · 이번엔 공주님

| 파일명 | 장면 |
|---|---|
| `images/06-princess.png` | A silver tent on a moonlit seashore where a young woman in pale robes sings, a boy bowing awkwardly with his cap in hand and a small pony waiting on the sand, serene and lovely. |

## 7장 · 세 개의 가마솥

| 파일명 | 장면 |
|---|---|
| `images/07-cauldrons.png` | A palace courtyard with three great cauldrons steaming, a boy poised to leap into one while a small pony blows a stream of frosty breath across the water, courtiers gasping, dramatic and comic. |

## 8장 · 다시 나온 이반

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A palace courtyard where a transformed handsome young man steps from a cauldron to cheers, the tsar scrambling out of another cauldron flinging off his crown, the princess laughing and the little pony standing proudly, joyous. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
