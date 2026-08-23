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
bold clean outlines, saturated storybook colors, warm golden light, no text or
letters in the image, a forest pond, a castle garden, a grand dining hall and a
bedchamber, very expressive comic faces, wide panoramic composition, funny and
warm, never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The princess: a girl about 11 in a bright yellow gown with a small crown, lively
and easily annoyed. The frog: a plump green frog with big earnest eyes, drawn as
appealing rather than slimy. The king: a broad older man with a grey beard and a
calm steady face. Heinrich: a stout loyal servant with three iron bands around
his chest.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a golden ball resting at the edge of a dark forest pond with a small green frog perched beside it, a castle roof visible through the trees, low golden light on the water, charming and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 황금 공

| 파일명 | 장면 |
|---|---|
| `images/01-ball.png` | A sunlit forest pond where a girl in a yellow gown reaches out in dismay as a golden ball splashes into the dark water, ripples spreading, trees reflected, vivid and lively. |

## 2장 · 연못에서 나온 목소리

| 파일명 | 장면 |
|---|---|
| `images/02-frog.png` | A pond edge where a plump green frog surfaces and speaks to a weeping girl in a yellow gown, lily pads around him, comic and sweet. |

## 3장 · 가벼운 약속

| 파일명 | 장면 |
|---|---|
| `images/03-promise.png` | A frog holding a golden ball in its mouth at the water's edge while a girl snatches it and runs off down a forest path without looking back, the frog left calling after her, funny and pointed. |

## 4장 · 문을 두드리는 소리

| 파일명 | 장면 |
|---|---|
| `images/04-knock.png` | A grand dining hall with a family at table, and at the open door a small green frog sitting on the threshold while a girl in yellow slams the door shut in horror, hilarious contrast of scale. |

## 5장 · 임금님의 말

| 파일명 | 장면 |
|---|---|
| `images/05-king.png` | A dining hall where a bearded king speaks gently but firmly to his daughter, other courtiers listening, the door standing open with a frog waiting beyond, dignified and warm. |

## 6장 · 한 밥상에서

| 파일명 | 장면 |
|---|---|
| `images/06-dinner.png` | A frog perched on a fine dinner plate eating happily while a girl in yellow leans as far away as her chair allows, the king hiding a smile behind his hand, very funny. |

## 7장 · 방문 앞에서

| 파일명 | 장면 |
|---|---|
| `images/07-room.png` | A candlelit bedchamber where a small frog crouches alone on cold stone in the corner, and the girl in yellow finally kneeling to gather it gently into both hands, tender and quiet. |

## 8장 · 풀린 마법

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A bedchamber filling with light as a frog transforms into a young prince, and outside a carriage where a stout servant's three iron bands snap and fall away from his chest, joyous and magical. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
