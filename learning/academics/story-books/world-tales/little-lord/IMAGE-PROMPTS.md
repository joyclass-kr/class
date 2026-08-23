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
bold clean outlines, saturated storybook colors, warm hearth and lamplight, no
text or letters in the image, New York tenement street and English country
castle settings, expressive faces, wide panoramic composition, warm and
heartening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Cedric: a cheerful boy about 8 with golden curls, first in simple American
clothes, later in a black velvet suit with a lace collar. His mother: a gentle
young widow in a plain dark dress. The Earl: a very tall stern old man with white
hair, a heavy cane and a fur-collared coat, gruff but thawing. Mr Hobbs: a burly
friendly grocer in an apron. Dick: a scrappy boot-black boy with a cap.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small boy in a black velvet suit with a lace collar standing beside a very tall stern old man in a great stone castle hall, the boy looking up cheerfully and the old man glancing down despite himself, warm hearth light. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 뉴욕의 작은 친구

| 파일명 | 장면 |
|---|---|
| `images/01-newyork.png` | A lively 19th-century New York street corner with a grocery shop, a burly aproned grocer laughing with a small curly-haired boy, a boot-black boy waving from the kerb, warm bustling city scene. |

## 2장 · 뜻밖의 손님

| 파일명 | 장면 |
|---|---|
| `images/02-lawyer.png` | A modest tenement parlour where a formal English lawyer in a top hat presents papers to a startled young widow and her small son, sunlight through a lace curtain, sober but warm. |

## 3장 · 성으로 가다

| 파일명 | 장면 |
|---|---|
| `images/03-castle.png` | A vast stone castle hall with high windows and a huge fireplace where a stern old man in a fur-collared coat sits with a cane, a small boy walking straight up to him with a beaming smile, dramatic scale contrast. |

## 4장 · 할아버지의 오해

| 파일명 | 장면 |
|---|---|
| `images/04-misunder.png` | An old lord riding a horse beside a small boy on a pony through a green English park, the boy chatting happily while the old man looks away with an embarrassed half-smile, dappled sunshine. |

## 5장 · 마을을 돌아보며

| 파일명 | 장면 |
|---|---|
| `images/05-village.png` | A carriage passing through a poor village of sagging cottages where a boy points out a broken roof to a silent old lord, and in the same wide scene carpenters later repairing those same roofs, hopeful transition. |

## 6장 · 가짜 상속자

| 파일명 | 장면 |
|---|---|
| `images/06-claim.png` | A tense castle drawing room where a sharply dressed woman presents a claim with a sullen boy beside her, the old lord gripping his cane, servants exchanging worried glances, dramatic lamplight. |

## 7장 · 뉴욕에서 온 편지

| 파일명 | 장면 |
|---|---|
| `images/07-hobbs.png` | A castle hall where a scrappy cap-wearing boy points accusingly at a startled woman while a burly grocer stands beside him holding an old newspaper clipping, onlookers astonished, lively vindication. |

## 8장 · 성문이 열리던 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A grand winter feast filling a castle hall with villagers, a young widow being welcomed at the door, a small boy pulling a gruff old lord toward the celebration, warm festive glow. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
