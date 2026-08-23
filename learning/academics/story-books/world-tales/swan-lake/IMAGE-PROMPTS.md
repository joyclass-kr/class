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
bold clean outlines, saturated storybook colors, silvery moonlight and warm
ballroom candlelight, no text or letters in the image, a forest lake, pine woods
and a grand palace ballroom, expressive faces, wide panoramic composition,
beautiful and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Odette: a gentle girl in a white feathered dress with a small crown, who becomes
a white swan by day. Prince Siegfried: an earnest young man in a blue doublet
with a crossbow. Odile: a girl in black who looks almost exactly like Odette but
smiles too sharply. Rothbart: a tall figure in a dark feathered cloak, drawn as a
grand owl-like shape rather than a monster.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a white swan gliding on a moonlit forest lake, its reflection subtly shaped like a dancing girl, dark pines all around and a distant castle glowing, ethereal and beautiful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 스무 살 생일

| 파일명 | 장면 |
|---|---|
| `images/01-birthday.png` | A sunny castle courtyard birthday feast with garlands and dancing villagers, a young prince standing apart looking troubled as his mother speaks to him, warm festive colours. |

## 2장 · 호수의 백조들

| 파일명 | 장면 |
|---|---|
| `images/02-lake.png` | A moonlit forest lake where a flock of white swans glides, one stepping ashore and transforming into a girl in a white feathered dress as a startled prince lowers his crossbow, silver and magical. |

## 3장 · 오데트의 사연

| 파일명 | 장면 |
|---|---|
| `images/03-odette.png` | A lakeside at night where a girl in white tells her story to a kneeling prince, other swans watching from the water, a dark winged shape faintly visible among the pines, tender and hushed. |

## 4장 · 검은 옷의 아가씨

| 파일명 | 장면 |
|---|---|
| `images/04-ball.png` | A grand candlelit ballroom where a girl in a black gown enters and every head turns, the prince rushing toward her with joy, an imposing dark-cloaked figure behind her, dramatic and glittering. |

## 5장 · 창밖의 백조

| 파일명 | 장면 |
|---|---|
| `images/05-window.png` | A ballroom where a prince announces his betrothal to a girl in black while outside a tall window a white swan-girl presses against the glass in anguish, guests frozen mid-turn, powerful contrast. |

## 6장 · 다시 호수로

| 파일명 | 장면 |
|---|---|
| `images/06-return.png` | A young prince running through dark pines toward a moonlit lake where swan-girls gather, one sitting with bowed head at the water's edge, a vast dark winged shadow spreading above the trees. |

## 7장 · 마주 선 밤

| 파일명 | 장면 |
|---|---|
| `images/07-confront.png` | A storm-tossed lakeside where a prince and a swan-girl stand shoulder to shoulder facing a towering dark-winged figure that is beginning to break apart into feathers and mist, dawn light breaking. |

## 8장 · 아침 호수

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A golden sunrise over a calm lake where feathers fall away from swans and young women walk ashore, a prince and a girl standing together at the water's edge, radiant and peaceful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
