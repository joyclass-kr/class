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
bold clean outlines, saturated storybook colors, warm southern light, no text or
letters in the image, Genoa harbour, ocean crossing, and Argentine city and
countryside settings, expressive faces, wide panoramic composition, warm and
hopeful.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Marco: a determined boy about 13 with dark hair, a worn jacket, short trousers
and a small cloth bundle. His mother: a tired gentle woman with dark hair tied
back. The ship's captain: a bearded man in a peaked cap. Kindly strangers:
various working people in aprons, ponchos and work clothes along the way.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a boy with a small bundle standing at a ship's railing looking out over a vast ocean toward a distant horizon, gulls overhead and a faint coastline ahead, warm hopeful light. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 오지 않는 편지

| 파일명 | 장면 |
|---|---|
| `images/01-letter.png` | A modest Italian kitchen where a worried father sits with unopened enquiries while a determined boy stands with his hand on the table, an old letter and a small photograph nearby, warm afternoon light. |

## 2장 · 제노바 항구

| 파일명 | 장면 |
|---|---|
| `images/02-harbor.png` | A crowded Genoa harbour at departure, a great steamship with smoke rising, families waving handkerchiefs, a boy at the railing waving back to his father on the quay, golden Mediterranean light. |

## 3장 · 바다를 건너

| 파일명 | 장면 |
|---|---|
| `images/03-voyage.png` | A crowded steamship deck at night where a boy lies among bundles looking up at a brilliant field of stars over a dark ocean, other passengers sleeping nearby, quiet and moving. |

## 4장 · 이미 떠난 뒤

| 파일명 | 장면 |
|---|---|
| `images/04-moved.png` | A boy standing at the doorway of a shuttered city house as a neighbour points down the road, his shoulders sagging, dusty South American street with pastel buildings, late afternoon. |

## 5장 · 도와준 사람들

| 파일명 | 장면 |
|---|---|
| `images/05-help.png` | A boy riding on the back of a loaded ox cart along a wide dusty plain road, a poncho-wearing driver offering him bread, endless pampas grass and big sky, warm and generous mood. |

## 6장 · 다시 어긋난 길

| 파일명 | 장면 |
|---|---|
| `images/06-again.png` | A boy sitting on a roadside kerb with his head down and a small photograph in his hand, then standing up again with the bundle over his shoulder, long empty road stretching to distant hills, resilient. |

## 7장 · 마지막 길

| 파일명 | 장면 |
|---|---|
| `images/07-final.png` | A footsore boy with worn shoes walking a dusty track toward a small cluster of adobe houses under mountains, a woman in the doorway raising her hand in recognition, hopeful golden dusk. |

## 8장 · 어머니의 방

| 파일명 | 장면 |
|---|---|
| `images/08-reunion.png` | A simple sunlit room where a boy kneels beside a bed as a pale woman slowly opens her eyes and reaches for his face, a window open to mountains beyond, deeply tender reunion. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
