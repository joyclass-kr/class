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
bold clean outlines, saturated storybook colors, soft glowing light, no text or
letters in the image, undersea palace and seaside kingdom setting, expressive
faces, wide panoramic composition, gentle and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The little mermaid: a young mermaid with long red-gold hair, a shimmering
blue-green tail, later a girl in a simple white dress with bare feet. The sea
king: a bearded merman with a coral crown and trident. The sea witch: a stout
purple-skinned woman with swirling hair in a shell cave — eccentric and
theatrical rather than horrifying. The prince: a young man in a navy and gold
coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a young mermaid with long flowing hair sitting on a rock just above the waves at dusk, gazing toward a distant lighted ship on the horizon, soft blue and rose sky, gentle wistful mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 바닷속 궁전

| 파일명 | 장면 |
|---|---|
| `images/01-palace.png` | A magnificent undersea palace of coral and shell where a bearded sea king sits with six mermaid daughters, the youngest gazing up longingly toward the distant bright surface, glowing blue-green underwater light. |

## 2장 · 폭풍우 치던 밤

| 파일명 | 장면 |
|---|---|
| `images/02-storm.png` | A ship breaking apart in a night storm with towering waves and lightning, a young mermaid diving through the water toward a falling prince, dramatic but not gruesome, deep blues and flashes of gold. |

## 3장 · 모래밭에 눕히고

| 파일명 | 장면 |
|---|---|
| `images/03-rescue.png` | A mermaid hiding behind a rock at dawn watching as a young woman discovers the unconscious prince lying on the sand, soft pink morning light on calm water, tender and quiet. |

## 4장 · 바다 마녀를 찾아가다

| 파일명 | 장면 |
|---|---|
| `images/04-witch.png` | A theatrical purple sea witch in a cave of glowing shells and bubbling pots leaning toward a young mermaid who nods solemnly, swirling green light, whimsical and eerie rather than scary. |

## 5장 · 목소리를 잃고

| 파일명 | 장면 |
|---|---|
| `images/05-legs.png` | A young girl with bare feet standing unsteadily on a sunlit beach as a prince kneels to offer his hand, her mouth open but silent, sea foam around her ankles, warm hopeful morning light. |

## 6장 · 다른 나라의 공주

| 파일명 | 장면 |
|---|---|
| `images/06-wedding.png` | A festive wedding celebration on a ship deck at night with lanterns and dancing, the prince smiling with his bride, while the silent girl stands apart at the railing looking out at the dark sea. |

## 7장 · 단검을 바다에 던지고

| 파일명 | 장면 |
|---|---|
| `images/07-dagger.png` | A girl standing at a ship railing at dawn throwing a small dagger far out into the sea, her sisters visible in the water below with cropped hair, soft violet and gold sky, quiet and noble. |

## 8장 · 바람이 된 인어공주

| 파일명 | 장면 |
|---|---|
| `images/08-air.png` | Sea foam rising into shimmering translucent figures of air in golden sunrise light above a calm ocean, the little mermaid among them looking peaceful and free, uplifting and luminous rather than sad. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
