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
bold clean outlines, saturated storybook colors, warm lamplight against cool
evening blues, no text or letters in the image, 19th-century European city of
rooftops, bridges and narrow streets, expressive faces, wide panoramic
composition, tender and never grim.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The Happy Prince: a tall statue of a young prince covered in gold leaf with two
bright sapphire eyes and a ruby-set sword hilt, kind serene face. The swallow: a
small sleek blue-black swallow with a white breast, cheerful and chatty. The
seamstress: a tired young woman sewing by candlelight. The playwright: a thin
young man at a desk. The match girl: a small girl with a tray of matches.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a golden statue of a prince on a tall stone column overlooking a city of rooftops at dusk, a single small swallow perched on his shoulder, warm lamplight beginning in the windows below, gentle and moving. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 도시를 내려다보는 동상

| 파일명 | 장면 |
|---|---|
| `images/01-statue.png` | A gilded statue of a young prince standing on a tall column above a busy city square at golden hour, townspeople passing below without looking up, rooftops stretching to the horizon. |

## 2장 · 하룻밤만 묵어가는 제비

| 파일명 | 장면 |
|---|---|
| `images/02-swallow.png` | A small swallow settling between the feet of a golden statue at night, looking up in surprise as a tear runs down the statue's cheek, starry sky and quiet dark rooftops. |

## 3장 · 첫 번째 심부름

| 파일명 | 장면 |
|---|---|
| `images/03-ruby.png` | A swallow flying across dark rooftops carrying a glowing red ruby in its beak toward a small lit attic window where a tired woman sews beside a sleeping child, warm window glow in cold night. |

## 4장 · 파란 눈을 주다

| 파일명 | 장면 |
|---|---|
| `images/04-sapphire.png` | A swallow gently prying a glowing blue sapphire from a statue's eye, and in the same wide scene delivering it to a thin young man writing by a guttering candle in a cold garret, tender blue and gold. |

## 5장 · 제비의 눈이 되어

| 파일명 | 장면 |
|---|---|
| `images/05-eyes.png` | A swallow perched on a statue's shoulder describing the city, with vignettes visible below — children laughing behind a bright window, other children huddled under a bridge — and gold leaf beginning to peel from the statue. |

## 6장 · 첫눈이 내리던 밤

| 파일명 | 장면 |
|---|---|
| `images/06-snow.png` | Snow falling on a dulled grey statue as a small swallow settles at its feet with wings folded, soft white flakes and quiet blue night, tender and peaceful rather than grim. |

## 7장 · 가장 귀한 것 둘

| 파일명 | 장면 |
|---|---|
| `images/07-ending.png` | Workers lowering a dull grey statue from its column under a frowning official's direction, and beside a furnace an unmelted lead heart lying next to a small still swallow, soft respectful light. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
