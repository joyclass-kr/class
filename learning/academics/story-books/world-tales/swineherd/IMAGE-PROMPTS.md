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
bold clean outlines, saturated storybook colors, crisp northern light, no text or
letters in the image, a small tidy kingdom, a grand palace with balconies, a
muddy pig yard and a windswept road, expressive comic faces, wide panoramic
composition, funny and never mean.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The prince: a cheerful young man with dark hair, first in a plain travelling
cloak, later disguised as a soot-smudged swineherd in a brown smock. The
princess: a haughty girl in an enormous glittering gown who is easily bored. The
emperor: a small round man with a huge crown that keeps slipping. The ladies in
waiting: a flock of identically dressed girls who move as one.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a young man in a rough brown smock standing among pigs in a castle yard, holding a small clay pot hung with tiny bells, a glittering princess and her ladies peering down from a balcony above, comic and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 작은 나라의 왕자

| 파일명 | 장면 |
|---|---|
| `images/01-prince.png` | A modest castle garden where a young prince stands between a rose bush bearing one perfect bloom and a small nightingale on a branch, morning light, warm and hopeful. |

## 2장 · 시큰둥한 공주

| 파일명 | 장면 |
|---|---|
| `images/02-gifts.png` | A glittering palace hall where a princess recoils in disappointment from an open silver casket holding a real rose, ladies in waiting fanning themselves, the emperor peering over, comic disdain. |

## 3장 · 돼지치기가 되어

| 파일명 | 장면 |
|---|---|
| `images/03-disguise.png` | A muddy castle back yard where a young man with soot-smudged cheeks in a rough smock is hired among grunting pigs, and a tiny attic room where he works by candlelight, cosy and comic. |

## 4장 · 노래하는 냄비

| 파일명 | 장면 |
|---|---|
| `images/04-pot.png` | A small clay cooking pot ringed with tiny bells steaming on a fire, musical notes and wisps of vapour rising, a delighted swineherd holding his hand in the steam, magical and funny. |

## 5장 · 열 번의 입맞춤

| 파일명 | 장면 |
|---|---|
| `images/05-bargain.png` | A palace balcony where a blushing lady in waiting relays a message to an outraged princess who then hesitates, glancing back toward the pig yard, comic inner struggle. |

## 6장 · 시녀들의 담장

| 파일명 | 장면 |
|---|---|
| `images/06-kisses.png` | A pig yard where a ring of ladies in waiting hold out their wide skirts to form a screen, a princess behind them with eyes squeezed shut, pigs looking on curiously, hilariously comic. |

## 7장 · 이번엔 딸랑이

| 파일명 | 장면 |
|---|---|
| `images/07-rattle.png` | A swineherd holding up a spinning rattle that trails swirling ribbons of music, a princess reaching for it eagerly while ladies form their skirt-screen again, lively and funny. |

## 8장 · 성문 밖에서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A rainy road outside a castle gate where a bedraggled princess sits on her trunk, and a young man washes the soot from his face revealing a prince who looks down at her with rueful pity, dramatic sky. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
