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
bold clean outlines, saturated storybook colors, warm lamplight and cool night
blues, no text or letters in the image, a 19th-century nursery, city gutters,
canals and rooftops seen from a toy's low viewpoint, expressive faces, wide
panoramic composition, tender and never grim.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The tin soldier: a small painted tin figure in a blue and red uniform with a
musket, standing on one leg, calm and steady. The paper ballerina: a cut-paper
dancer in a white gauze skirt with a spangle at her waist, poised on one toe.
The jack-in-the-box goblin: a grinning black-hatted spring toy. A large fish and
a curious kitchen maid appear along the way.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a one-legged tin soldier standing at attention on a wooden windowsill at night, a paper ballerina on a toy castle behind him, city rooftops and a big moon beyond the glass, warm nostalgic light. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 다리가 하나뿐인 병정

| 파일명 | 장면 |
|---|---|
| `images/01-soldier.png` | A nursery floor where a child opens a box of twenty-five identical tin soldiers lined up in rows, one at the end standing firmly on a single leg, low toy-level viewpoint, warm lamplight. |

## 2장 · 종이 무희

| 파일명 | 장면 |
|---|---|
| `images/02-ballerina.png` | A paper castle on a table with a cut-paper ballerina poised on one toe with her other leg raised behind her, a one-legged tin soldier gazing across the tabletop, soft candlelight and long shadows. |

## 3장 · 창밖으로

| 파일명 | 장면 |
|---|---|
| `images/03-fall.png` | A jack-in-the-box goblin springing up on a table at night, and a tin soldier tumbling from a third-floor windowsill toward a cobbled street below, dramatic motion lines, comic and exciting. |

## 4장 · 종이배를 타고

| 파일명 | 장면 |
|---|---|
| `images/04-boat.png` | A folded newspaper boat racing down a rain-swollen street gutter with a tiny tin soldier standing upright inside, water spraying, cobblestones towering like cliffs, thrilling low viewpoint. |

## 5장 · 어두운 물길

| 파일명 | 장면 |
|---|---|
| `images/05-tunnel.png` | A dark stone drain tunnel where a paper boat rushes past a scolding water rat, the tin soldier gripping his musket, a bright opening ahead spilling into a canal, dramatic contrast. |

## 6장 · 물고기 뱃속

| 파일명 | 장면 |
|---|---|
| `images/06-fish.png` | A large fish swallowing a tiny tin soldier in murky green canal water as the soggy paper boat sinks behind, and the soldier standing upright inside the dim belly, brave and calm. |

## 7장 · 돌아온 자리

| 파일명 | 장면 |
|---|---|
| `images/07-return.png` | A bright kitchen where a maid slices open a fish and gasps at the tin soldier inside, and the same soldier set back on the nursery table facing the paper ballerina, joyful homecoming. |

## 8장 · 작은 주석 심장

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A hearth fire glowing warm and golden with a small tin soldier and a paper ballerina side by side in the light, and in the next moment a hand lifting a tiny tin heart and a spangle from the ashes, tender and beautiful. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
