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
bold clean outlines, saturated storybook colors, strong contrast between icy
blues and warm firelight, no text or letters in the image, northern European
towns, forests and arctic landscapes, expressive faces, wide panoramic
composition, gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Gerda: a determined girl about 10 with brown braids, a red coat and boots, later
barefoot. Kai: a boy the same age with light hair and a blue scarf, growing pale
and cold-eyed after the mirror shard. The Snow Queen: a tall serene woman in a
white-silver gown and ice crown, beautiful and remote rather than wicked. The
robber girl: a wild-haired girl in furs with a cheeky grin. The reindeer: a
sturdy brown reindeer with wide antlers.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a girl in a red coat walking alone across a vast snowfield toward a distant glittering ice palace under green auroras, her small footprints trailing behind, cold blues and greens with one warm red figure. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 창가의 장미

| 파일명 | 장면 |
|---|---|
| `images/01-roses.png` | Two children leaning out of facing attic windows across a narrow gap between rooftops, tending a shared window box of red roses, warm summer light over a northern European town. |

## 2장 · 눈에 박힌 조각

| 파일명 | 장면 |
|---|---|
| `images/02-shard.png` | Tiny glittering glass splinters drifting down over a snowy town, one catching a boy in the eye as he flinches, his expression turning cold while a girl beside him looks worried, chilly blue evening. |

## 3장 · 하얀 썰매

| 파일명 | 장면 |
|---|---|
| `images/03-sleigh.png` | A white sleigh drawn by pale horses sweeping out of a snowy town square with a boy's small sled hitched behind, a serene woman in silver looking back at him, swirling snow and northern lights beginning. |

## 4장 · 게르다가 길을 나서다

| 파일명 | 장면 |
|---|---|
| `images/04-journey.png` | A girl in a red coat pushing off from a riverbank in a small wooden boat holding out her red shoes over the water, willow branches and spring flowers along the shore, hopeful morning light. |

## 5장 · 도둑 소녀

| 파일명 | 장면 |
|---|---|
| `images/05-robber.png` | A wild-haired girl in furs sitting cross-legged in a firelit robber camp listening intently as a girl in a red coat tells her story, a reindeer tethered nearby, warm orange firelight against dark forest. |

## 6장 · 북쪽 끝으로

| 파일명 | 장면 |
|---|---|
| `images/06-reindeer.png` | A reindeer carrying a girl across an endless snowfield under vivid green auroras, then stopping at a ridge where a vast ice palace glitters in the distance, tiny figure against huge landscape. |

## 7장 · 얼음 궁전

| 파일명 | 장면 |
|---|---|
| `images/07-ice-palace.png` | A vast hall of blue ice where a pale boy sits alone arranging flat ice pieces on a frozen floor, a girl in a thin dress running toward him with arms outstretched, cold blue with one warm point of light. |

## 8장 · 다시 여름

| 파일명 | 장면 |
|---|---|
| `images/08-home.png` | Two children walking hand in hand out of a melting ice palace into a landscape turning green, and beyond them their familiar rooftop window box bursting with red roses in summer sunlight, joyful warmth. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
