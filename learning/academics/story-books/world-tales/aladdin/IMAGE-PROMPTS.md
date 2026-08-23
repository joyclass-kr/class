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
bold clean outlines, saturated storybook colors, warm golden lamplight, no text
or letters in the image, Middle Eastern market, palace and desert cave settings,
expressive faces, wide panoramic composition, playful and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Aladdin: a lively boy about 14 with black hair, a red vest over a white shirt,
loose trousers and a small sash. The genie: an enormous friendly blue spirit made
of swirling smoke with a topknot and gold armbands, booming but good-natured.
The sorcerer: a tall thin man in a dark green robe with a pointed beard,
comically greedy. The princess: a cheerful young woman in a turquoise gown with
gold jewellery. The sultan: a plump kindly man in white robes and a jewelled turban.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an ornate brass oil lamp resting on a rug in a torchlit cave, thin golden smoke curling upward into the shape of a giant hand, piles of treasure glinting in the shadows, warm and magical. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 낯선 아저씨

| 파일명 | 장면 |
|---|---|
| `images/01-stranger.png` | A bustling Middle Eastern market street where a tall thin man in a dark robe places a friendly hand on a poor boy's shoulder, stalls of fruit and cloth around them, warm sunny bustle, a hint of slyness in the man's smile. |

## 2장 · 동굴 속 램프

| 파일명 | 장면 |
|---|---|
| `images/02-cave.png` | A boy standing on stone steps inside a treasure-filled cave holding up an old brass lamp while a robed man reaches down greedily from the opening above, glittering jewels everywhere, dramatic torchlight. |

## 3장 · 램프의 지니

| 파일명 | 장면 |
|---|---|
| `images/03-genie.png` | A colossal friendly blue genie of swirling smoke bursting from a small brass lamp in a dark cave, filling the space with golden light, a wide-eyed boy staring up in astonishment, joyful energy. |

## 4장 · 공주를 만나다

| 파일명 | 장면 |
|---|---|
| `images/04-princess.png` | A humble woman kneeling before a plump sultan in a grand palace hall presenting a tray heaped with enormous glowing jewels, courtiers gasping, warm golden throne room. |

## 5장 · 하룻밤 사이의 궁전

| 파일명 | 장면 |
|---|---|
| `images/05-palace.png` | A vast marble palace with golden domes standing where an empty plain was the day before, astonished townspeople pointing from the road, brilliant morning sunlight, jaw-dropping scale. |

## 6장 · 낡은 램프를 새 램프로

| 파일명 | 장면 |
|---|---|
| `images/06-swap.png` | A disguised peddler calling out in a palace courtyard holding shiny new lamps while a princess hands over an old brass one, and in the same wide scene the entire palace lifting off the ground in swirling magic, comic disaster. |

## 7장 · 사막 끝의 궁전

| 파일명 | 장면 |
|---|---|
| `images/07-desert.png` | A marble palace standing incongruously among vast sand dunes at sunset, a boy climbing in through a window as a princess signals from inside, long shadows and warm desert colors. |

## 8장 · 다시 돌아온 자리

| 파일명 | 장면 |
|---|---|
| `images/08-return.png` | The palace settling back into its rightful place beside the city as crowds cheer, a boy and princess waving from a balcony, and a giant blue genie laughing warmly in the sky above, festive golden light. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
