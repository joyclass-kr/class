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
bold clean outlines, saturated storybook colors, warm amber desert light, no text
or letters in the image, a Middle Eastern palace with domes and tiled courtyards,
a bazaar, palm groves and ruined desert halls, expressive comic faces, wide
panoramic composition, funny and adventurous, never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The caliph Chasid: a good-natured king with a round beard, a turban and a green
robe, who becomes a tall white stork with an anxious expression. Mansor the
vizier: a lean older man with a grey beard who becomes a second, skinnier stork.
The pedlar: a hunched man with a sly grin and a tray of trinkets. The owl
princess: a small brown owl with enormous gentle eyes. The wizard Kaschnur: a
tall man in dark robes with a pointed beard, comically villainous.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: two white storks standing on a domed palace rooftop at sunset looking out over a Middle Eastern city of minarets and palm trees, a small carved box lying open beside them, warm amber light, magical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 이상한 가루

| 파일명 | 장면 |
|---|---|
| `images/01-powder.png` | A tiled palace chamber where a turbaned king and his lean vizier lean over a small carved box holding dark powder and a scroll, a hunched pedlar bowing at the door, warm lamplight and rich carpets. |

## 2장 · 절대 웃지 말 것

| 파일명 | 장면 |
|---|---|
| `images/02-warning.png` | A palace garden pond at dawn where a king and vizier crouch behind reeds watching two white storks wading, the open box in the king's hand, anticipation and comic secrecy. |

## 3장 · 황새가 되어

| 파일명 | 장면 |
|---|---|
| `images/03-storks.png` | Two newly transformed storks doubled over laughing on a pond bank as a real stork performs a ridiculous high-stepping dance, feathers flying, hilariously comic. |

## 4장 · 잊어버린 주문

| 파일명 | 장면 |
|---|---|
| `images/04-forgot.png` | Two storks staring at their reflections in a pond in dismay, and beside it the same storks being chased out of a palace courtyard by servants with brooms, comic despair. |

## 5장 · 폐허의 올빼미

| 파일명 | 장면 |
|---|---|
| `images/05-owl.png` | A ruined desert hall with broken pillars and moonlight through a collapsed roof, two storks meeting a small brown owl with huge sorrowful eyes huddled in the shadows, atmospheric and tender. |

## 6장 · 엿들은 밤

| 파일명 | 장면 |
|---|---|
| `images/06-eavesdrop.png` | A candlelit ruin where dark-robed figures sit around a low table laughing, while behind a broken wall two storks and an owl press themselves flat, eyes wide with sudden realisation, tense and thrilling. |

## 7장 · 무타보르

| 파일명 | 장면 |
|---|---|
| `images/07-mutabor.png` | Two storks and an owl transforming back into a king, a vizier and a princess in a moonlit desert courtyard, feathers scattering into light, radiant and triumphant. |

## 8장 · 궁궐로 돌아가다

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A joyful palace courtyard where courtiers rush to greet a returning king who holds up the little box with a rueful grin, the vizier and princess beside him, banners and bright daylight, warm celebration. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
