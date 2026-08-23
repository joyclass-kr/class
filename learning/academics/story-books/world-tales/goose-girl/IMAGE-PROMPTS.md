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
bold clean outlines, saturated storybook colors, soft northern European light, no
text or letters in the image, castle halls, country roads, a stream, a goose
meadow and a stone town gate, expressive faces, wide panoramic composition,
gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The princess: a fair-haired girl, first in a rich blue travelling gown, later in
a plain grey dress with a kerchief. The maid: a dark-haired young woman with a
bold jaw who takes the princess's fine clothes. Falada: a white horse with a
gentle face. Conrad: a freckled goose-boy with a straw hat. The old king: a
kindly bearded man with sharp eyes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a fair-haired girl in a plain grey dress sitting on a grassy hillside with a flock of white geese around her, a distant castle on the horizon and a horse's head carved above a stone gateway below, wistful and beautiful. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 먼 길을 떠나며

| 파일명 | 장면 |
|---|---|
| `images/01-departure.png` | A castle gate at dawn where a queen presses a handkerchief into her daughter's hands beside a white horse, a maid waiting with the baggage, morning mist and long shadows, tender farewell. |

## 2장 · 냇가에서

| 파일명 | 장면 |
|---|---|
| `images/02-stream.png` | A shady stream where a richly dressed girl kneels to drink while a white handkerchief slips from her bodice into the current, a maid standing on the bank with arms folded, tense and quiet. |

## 3장 · 뒤바뀐 자리

| 파일명 | 장면 |
|---|---|
| `images/03-swap.png` | A lonely roadside where a maid pulls on a fine blue gown and mounts a white horse while the true princess stands in a plain grey dress holding the reins, dust and pale sky, quietly cruel. |

## 4장 · 거위를 치는 아이

| 파일명 | 장면 |
|---|---|
| `images/04-geese.png` | A wide green meadow where a girl in a plain grey dress drives a flock of white geese with a freckled boy in a straw hat, a castle in the distance, bright open sky, gentle melancholy. |

## 5장 · 성문 위의 팔라다

| 파일명 | 장면 |
|---|---|
| `images/05-falada.png` | A stone town gateway with a carved white horse's head mounted above the arch, a girl in grey pausing beneath it each morning with her geese flowing past her feet, soft golden light, poignant. |

## 6장 · 바람아 불어라

| 파일명 | 장면 |
|---|---|
| `images/06-wind.png` | A breezy hilltop meadow where a girl's long golden hair streams loose as a boy chases his straw hat tumbling far across the grass, geese scattering, funny and lively. |

## 7장 · 난로에게 한 이야기

| 파일명 | 장면 |
|---|---|
| `images/07-stove.png` | A dim castle kitchen where a girl kneels and speaks into the open door of a great iron stove, firelight on her face, an old king listening just outside the doorway, hushed and moving. |

## 8장 · 제자리로

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A grand castle banquet hall where a maid in fine clothes declares a judgment and then realises with horror, while the true princess is led to her seat in restored finery, courtiers astonished, warm resolution. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
