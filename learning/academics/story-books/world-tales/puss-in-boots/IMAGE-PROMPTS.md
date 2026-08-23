# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
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
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, French countryside and castle setting, expressive
exaggerated character faces, wide panoramic composition, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Puss: a clever orange tabby cat standing upright in tall brown boots, a red
feathered hat, a small belt with a pouch, always looking pleased with himself.
The youngest son: a thin young man about 18 in patched brown clothes, later in a
fine blue and gold coat. The King: a plump jolly monarch in ermine robes. The
Princess: a cheerful young woman in a yellow gown. The sorcerer: a tall thin man
in a long green robe, comically vain rather than sinister.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a confident tabby cat wearing tall leather boots, a wide feathered hat and a belt, standing with paws on hips in a sunlit meadow, a distant castle on a hill behind him, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 남은 것은 고양이 한 마리

| 파일명 | 장면 |
|---|---|
| `images/01-inherit.png` | Three brothers standing outside an old mill dividing an inheritance — the eldest beside the mill, the middle one holding a donkey, and the youngest looking glumly at a cat sitting at his feet, warm afternoon light. |

## 2장 · 임금님께 바친 선물

| 파일명 | 장면 |
|---|---|
| `images/02-gift.png` | A booted cat bowing grandly before a plump king on his throne while presenting a plump rabbit from a sack, courtiers looking on amused, warm golden throne room. |

## 3장 · 강물에 빠진 후작님

| 파일명 | 장면 |
|---|---|
| `images/03-river.png` | A cat waving frantically at a royal carriage on a riverside road while a young man stands chest-deep in the river looking bewildered, servants rushing to help, sunny riverbank scene, comic energy. |

## 4장 · 이 밭은 누구 것이냐

| 파일명 | 장면 |
|---|---|
| `images/04-fields.png` | A booted cat running ahead along a country road speaking urgently to farmers in a golden wheat field, while a royal carriage approaches in the distance, wide sunny panorama. |

## 5장 · 마법사의 성

| 파일명 | 장면 |
|---|---|
| `images/05-castle.png` | A huge lion rearing up in a grand stone hall while a small booted cat watches with exaggerated admiration, tapestries and pillars around them, dramatic warm torchlight, comic tension. |

## 6장 · 아주 작은 쥐

| 파일명 | 장면 |
|---|---|
| `images/06-mouse.png` | A booted cat pouncing gleefully at the spot where a tiny mouse just appeared on a grand hall floor, the sorcerer gone, sunlight streaming through tall windows, triumphant comic moment. |

## 7장 · 진짜 후작이 되다

| 파일명 | 장면 |
|---|---|
| `images/07-wedding.png` | A joyful wedding celebration in a castle courtyard, the young man now in a fine blue and gold coat beside a smiling princess, the king raising a toast, and the booted cat lounging proudly on a velvet cushion in the foreground. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
