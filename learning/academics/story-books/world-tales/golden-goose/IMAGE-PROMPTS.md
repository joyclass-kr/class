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
bold clean outlines, saturated storybook colors, warm village daylight, no text
or letters in the image, a German forest, a village street, an inn and a castle
courtyard, very expressive comic faces, wide panoramic composition, funny and
never mean.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Dummling: a cheerful ordinary-looking youngest brother in a patched brown coat,
kind and unbothered by teasing. The two elder brothers: a tall proud one and a
stout smug one. The little grey man: a small old man with a long beard sitting on
a stump. The princess: a girl in a fine gown who never smiles. Villagers who get
stuck: three sisters, a priest and a baker, all comically flailing.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a long comical line of people stuck one behind another — a young man carrying a golden goose at the front, then girls, a priest and a baker — all trailing down a village street, absurd and delightful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 숲에 간 큰형

| 파일명 | 장면 |
|---|---|
| `images/01-eldest.png` | A forest clearing where a proud young man waves away a small bearded old man sitting on a stump, then winces clutching his arm as his axe slips, comic consequence. |

## 2장 · 둘째도 마찬가지

| 파일명 | 장면 |
|---|---|
| `images/02-second.png` | A forest path where a stout smug young man shoulders past a small old man without looking, and moments later hops on one foot clutching his toes, comic. |

## 3장 · 막내가 나서다

| 파일명 | 장면 |
|---|---|
| `images/03-share.png` | A sunny forest clearing where a patched-coat young man spreads a cloth and shares his meagre bread with a small bearded old man, the food transforming into a fine loaf and wine, warm and magical. |

## 4장 · 나무 밑동의 거위

| 파일명 | 장면 |
|---|---|
| `images/04-goose.png` | A felled tree whose hollow stump reveals a goose with feathers of shining gold, a young man lifting it out in astonishment, the old man smiling from behind a trunk, magical. |

## 5장 · 손이 붙어 버렸다

| 파일명 | 장면 |
|---|---|
| `images/05-stuck.png` | An inn room where three sisters are stuck one behind another to a golden goose, tugging and shrieking, the young man asleep in a chair unaware, hilariously comic. |

## 6장 · 줄줄이 따라온 사람들

| 파일명 | 장면 |
|---|---|
| `images/06-parade.png` | A village street with an absurd chain of people stuck together — a young man with a golden goose, three girls, a priest and a baker — all shuffling along while onlookers howl with laughter. |

## 7장 · 웃지 않는 공주

| 파일명 | 장면 |
|---|---|
| `images/07-princess.png` | A castle window where a solemn princess suddenly bursts into helpless laughter at the ridiculous human chain shuffling past below, courtiers astonished, joyous and bright. |

## 8장 · 손이 떨어지던 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A castle courtyard where the stuck people spring apart in relief, and a young man releases the golden goose toward the forest as the king and laughing princess look on, warm celebration. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
