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
bold clean outlines, saturated storybook colors, warm lamplight against cold
Victorian London streets, no text or letters in the image, boarding school
interiors, attic rooms and foggy streets, expressive faces, wide panoramic
composition, tender and never grim.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Sara: a thoughtful girl about 11 with long dark hair, first in a fine green
dress, later in a patched grey one. Captain Crewe: a warm smiling father in a
travelling coat. Miss Minchin: a tall severe headmistress in black with a tight
bun. Becky: a small cheerful scullery maid in a smudged apron and cap. Mr
Carrisford: a thin kindly gentleman with a blanket over his knees.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a girl in a worn dress standing at a frosted attic window of a tall London boarding school at night, a single candle beside her and warm lamplight in the windows across the street, snow falling, wistful and hopeful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 기숙 학교에 온 아이

| 파일명 | 장면 |
|---|---|
| `images/01-arrival.png` | A grand Victorian boarding school entrance hall where a warm father says goodbye to his daughter while a tall severe headmistress smiles ingratiatingly, trunks and a doll beside them, rich interior. |

## 2장 · 다락방의 친구

| 파일명 | 장면 |
|---|---|
| `images/02-becky.png` | A richly furnished bedroom where a girl in a fine dress sits telling a story with animated gestures to a small maid perched shyly on a stool, firelight and warm colours, tender friendship. |

## 3장 · 갑작스러운 소식

| 파일명 | 장면 |
|---|---|
| `images/03-news.png` | A birthday party in a decorated schoolroom coming to a sudden halt as a grim-faced headmistress returns with a letter, children turning to stare, one girl standing very still among the streamers, muted colours. |

## 4장 · 다락방으로

| 파일명 | 장면 |
|---|---|
| `images/04-attic.png` | A bare cold attic room with a narrow bed and a single candle where a girl in a patched dress sits with a small maid, both wrapped in thin blankets, one bright window of stars, warm within cold. |

## 5장 · 비 오는 날의 빵

| 파일명 | 장면 |
|---|---|
| `images/05-bread.png` | A rainy London street outside a warm bakery where a thin girl hands most of her bread to an even more ragged child huddled on the step, the baker watching thoughtfully through the window, glistening cobblestones. |

## 6장 · 어느 밤의 기적

| 파일명 | 장면 |
|---|---|
| `images/06-transformed.png` | A transformed attic room glowing with firelight, a laden table, thick quilts and a lamp, two astonished girls standing in the doorway with hands over their mouths, magical warmth. |

## 7장 · 옆집 신사

| 파일명 | 장면 |
|---|---|
| `images/07-neighbor.png` | A warm firelit drawing room where a thin kindly gentleman with a blanket over his knees leans forward in astonishment toward a girl in a patched dress standing in the doorway, an Indian servant smiling nearby. |

## 8장 · 여전히 같은 아이

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A bright morning street where a girl in fine clothes walks arm in arm with her former maid friend past a bakery where children receive bread, the headmistress watching sourly from a doorway, cheerful and warm. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
