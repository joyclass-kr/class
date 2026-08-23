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
bold clean outlines, saturated storybook colors, crisp mountain light, no text or
letters in the image, Swiss Alps meadows, wooden huts and a grand city house,
expressive faces, wide panoramic composition, warm and heartening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Heidi: a small lively girl about 8 with short dark curls, a red dress and bare
feet. The grandfather: a tall gruff old man with a white beard, a wide hat and a
walking stick, softening over time. Peter: a barefoot goatherd boy with a
battered hat and a stick. Klara: a pale gentle girl in fine clothes seated in a
wheelchair. Fräulein Rottenmeier: a stiff tall housekeeper in a grey high-collared
dress.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a girl in a red dress sitting on a grassy alpine slope with goats grazing around her, snow-capped peaks rising behind under a wide blue sky, a small wooden hut on the ridge, warm and expansive. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 산으로 올라간 아이

| 파일명 | 장면 |
|---|---|
| `images/01-mountain.png` | A small girl in a red dress being led up a steep alpine path toward a lone wooden hut on a high ridge, a stern white-bearded old man standing in the doorway, sweeping mountain vista. |

## 2장 · 건초 침대와 별

| 파일명 | 장면 |
|---|---|
| `images/02-hut.png` | A cosy hayloft under a wooden roof where a girl lies looking up through a small window at a sky full of stars, and below an old man tending a fire, warm lamplight and deep blue night. |

## 3장 · 페터와 염소들

| 파일명 | 장면 |
|---|---|
| `images/03-goats.png` | Two children driving a herd of goats up a flower-filled alpine meadow, snow peaks glowing pink in the evening sun, the girl pointing excitedly at the light, joyful and expansive. |

## 4장 · 도시로 가는 마차

| 파일명 | 장면 |
|---|---|
| `images/04-city.png` | A carriage descending a mountain road while a small girl looks back out of the window at a lone hut growing distant, an old man standing silently at his door, bittersweet golden light. |

## 5장 · 클라라의 집

| 파일명 | 장면 |
|---|---|
| `images/05-klara.png` | A grand formal parlour with tall windows where a pale girl in a wheelchair smiles warmly at a small girl in a red dress, a stiff housekeeper standing disapprovingly nearby, cool elegant interior. |

## 6장 · 다시 산으로

| 파일명 | 장면 |
|---|---|
| `images/06-return.png` | A girl running up the last stretch of an alpine path toward a hut as a white-bearded old man strides out to lift her into his arms, mountains blazing in morning light, joyful reunion. |

## 7장 · 클라라가 온 여름

| 파일명 | 장면 |
|---|---|
| `images/07-summer.png` | A pale girl taking her first unsteady steps on a sunny alpine meadow with hands outstretched, two children cheering and reaching toward her, an old man watching from a distance holding his hat, radiant summer. |

## 8장 · 산이 준 것

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A girl waving from a departing carriage while another girl and an old man stand together on a mountain path watching, autumn colours creeping into the meadow, warm and settled. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
