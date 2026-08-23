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
bold clean outlines, saturated storybook colors, sparkling summer light, no text
or letters in the image, a summer meadow, pond edge, tree hollow and beehive seen
from an insect's viewpoint, giant flowers and grass blades, expressive friendly
insect faces, wide panoramic composition, delightful and never scary.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Maya: a small round honeybee with big curious eyes, golden fuzz and translucent
wings. Kassandra: an older teacher bee with spectacles perched on her feelers.
Peppi: a lanky green grasshopper who never stops bouncing. Kurt: a solid brown
dung beetle in a stiff collar. Schnuck: a shimmering blue dragonfly. The hornets:
larger striped wasps, drawn stern rather than monstrous.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small bright-eyed honeybee hovering over a wide summer meadow full of poppies and cornflowers, dragonflies and grasshoppers among the stems below, dew catching the light, joyful and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 벌집을 나서다

| 파일명 | 장면 |
|---|---|
| `images/01-hive.png` | The golden interior of a beehive with rows of hexagonal cells where a stern spectacled teacher bee lectures a row of young bees, one small bee at the front raising her arm eagerly, warm honey light. |

## 2장 · 첫 아침

| 파일명 | 장면 |
|---|---|
| `images/02-meadow.png` | A tiny bee bursting out of a hive entrance into an enormous sunlit meadow of towering poppies and daisies, the flowers vast from her viewpoint, exhilarating sense of scale and freedom. |

## 3장 · 메뚜기 페피

| 파일명 | 장면 |
|---|---|
| `images/03-grasshopper.png` | A lanky green grasshopper bouncing mid-air among tall grass stems while a small bee hovers watching, blades of grass like green pillars, sunny and comic. |

## 4장 · 쇠똥구리 쿠르트

| 파일명 | 장면 |
|---|---|
| `images/04-beetle.png` | A stout brown dung beetle in a stiff collar pushing a large ball up a slope of soil with great effort while a small bee hovers offering help, dandelion stems and pebbles around, comic dignity. |

## 5장 · 거미줄

| 파일명 | 장면 |
|---|---|
| `images/05-web.png` | A dew-jewelled spiderweb strung between grass stems at dusk with a small bee tangled in the threads, her wings caught, a green grasshopper appearing at the edge of the frame, tense but hopeful. |

## 6장 · 구해 준 이웃

| 파일명 | 장면 |
|---|---|
| `images/06-rescue.png` | A grasshopper snapping web threads with his hind legs to free a small bee, both tumbling into soft grass below, moonlight through leaves, warm friendship. |

## 7장 · 말벌들의 계획

| 파일명 | 장면 |
|---|---|
| `images/07-hornets.png` | A dark hollow tree where large striped hornets confer in a huddle, and a tiny bee flattened against the bark listening in terror, then streaking away across a sunset meadow, urgent. |

## 8장 · 돌아온 마야

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A beehive entrance at night with ranks of bees standing shoulder to shoulder as hornets hover and then turn away, a small bee at the front being clapped on the shoulder by an older bee, triumphant warm glow. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
