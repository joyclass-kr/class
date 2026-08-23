# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm lantern light, no text or
letters in the image, medieval German town of half-timbered houses, cobbled
streets and a river, expressive faces, wide panoramic composition, whimsical and
never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The piper: a tall lanky man in a patchwork coat of red and yellow, a feathered
cap and a slender wooden pipe, enigmatic but never sinister. The mayor: a short
round man in a fur-trimmed robe and gold chain, comically pompous. Townsfolk:
bustling medieval villagers in aprons and caps. The children: cheerful kids in
simple tunics and dresses.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a tall figure in a patchwork coat of red and yellow standing on a cobbled street at dusk playing a wooden pipe, medieval German half-timbered houses leaning above, warm lantern light in the windows, mysterious and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 쥐가 들끓는 마을

| 파일명 | 장면 |
|---|---|
| `images/01-rats.png` | A medieval town square overrun with cheeky rats scurrying over market stalls, barrels and rooftops while angry townsfolk shout at a flustered round mayor on the town hall steps, comic chaos. |

## 2장 · 낯선 사나이

| 파일명 | 장면 |
|---|---|
| `images/02-piper.png` | A tall figure in a patchwork red-and-yellow coat standing before the town hall shaking hands with a pompous mayor, townsfolk crowding around hopefully, warm afternoon light on cobblestones. |

## 3장 · 피리 소리를 따라

| 파일명 | 장면 |
|---|---|
| `images/03-rats-follow.png` | A piper walking down a winding cobbled street playing his pipe with a vast river of rats pouring out of doorways and following behind him toward a wide river, dramatic and rhythmic. |

## 4장 · 약속을 어긴 마을

| 파일명 | 장면 |
|---|---|
| `images/04-refuse.png` | A piper standing with an open palm before a smug mayor who waves him off dismissively, townsfolk avoiding his gaze, coins clinking in a small pouch, tense and uncomfortable mood. |

## 5장 · 두 번째 피리 소리

| 파일명 | 장면 |
|---|---|
| `images/05-children.png` | A cheerful procession of laughing children skipping after a piper out of a town gate toward distant green hills, parents frozen in the street reaching out and calling, bright but urgent. |

## 6장 · 산 앞에서

| 파일명 | 장면 |
|---|---|
| `images/06-mountain.png` | At the foot of a green mountain a breathless mayor kneels before the piper with a heavy money chest as the line of children pauses and turns around, townsfolk hurrying up the road behind, hopeful resolution. |

## 7장 · 돌아온 아이들

| 파일명 | 장면 |
|---|---|
| `images/07-return.png` | Children running joyfully back into the arms of their parents on a country road while the piper walks away alone over a hill with a modest sack, warm golden evening light, bittersweet and warm. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
