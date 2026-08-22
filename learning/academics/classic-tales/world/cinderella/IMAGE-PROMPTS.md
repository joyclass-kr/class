# 제미나이 그림 프롬프트

이 책은 앞의 명작 동화 시리즈와 달리 **하나의 이야기를 일곱 개의 장(챕터)**으로 나눠 담았어요.
각 장마다 그림이 **두 장**이에요 — 장의 시작 장면 한 장, 그 장의 핵심 장면 한 장.
아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(신데렐라, 새어머니, 언니 둘, 왕자, 요정 대모)이 책 전체에 계속 등장하니,
매번 인물 생김새를 비슷하게 유지하는 게 중요해요. 아래 "인물 설명"을 프롬프트 뒤에
같이 붙여 넣으면 그림체가 훨씬 일관되게 나와요.

권장 크기: 가로 4 : 세로 3 비율, PNG. **단, 표지(`cover.png`)만 예외 — 세로 2 : 3 비율(세로가 긴 인물화 느낌)로 만들어주세요.** 표지 그림칸은 책을 펼쳤을 때 왼쪽 반쪽 전체를 꽉 채우는데, 그 칸 자체가 가로로 넓은 4:3이 아니라 세로로 긴 2:3 모양이에요. 4:3 가로 그림을 넣으면 화면에 꽉 채우려다 양옆이 절반 가까이 잘려나가니 꼭 세로 비율로 따로 생성해주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, warm watercolor and colored-pencil style,
soft golden lighting, gentle rounded shapes, storybook atmosphere, no text or
letters in the image, consistent warm fairytale color palette (parchment, gold,
rose, deep blue), European fairytale castle and countryside setting,
expressive character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Cinderella: a gentle young woman with warm brown hair often tied back, kind eyes,
in worn patched clothes early in the story and a shimmering pale blue ball gown
later. Stepmother: a tall stern woman with sharp features, dark elegant clothing.
Two stepsisters: exaggerated, comically vain, one plump in bright pink, one thin
in bright yellow. Prince: a handsome young man in a royal blue and gold uniform.
Fairy Godmother: a plump kind elderly woman in a sparkling silver-blue cloak.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format fairytale book cover: Cinderella in her shimmering pale blue ball gown standing at the top of a grand castle staircase at dusk, one glass slipper glinting on the step beside her, a castle silhouette rising behind her, magical sparkles drifting in the air, elegant and inviting fairytale cover composition. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 재투성이 소녀

| 파일명 | 장면 |
|---|---|
| `images/story-01-chores.png` | A modest household scene: the stepmother and two stepsisters admiring themselves in fine clothes in a bright room, while Cinderella in worn clothes carries a heavy water bucket past them, warm daylight. |
| `images/story-01-chores-2.png` | Cinderella sitting alone by a dying fireplace at night, ash smudged on her cheek, gazing wistfully out a small window at the stars, warm dim firelight, peaceful and hopeful expression despite hardship. |

## 2장 · 무도회 초대장

| 파일명 | 장면 |
|---|---|
| `images/story-02-invite.png` | The two stepsisters excitedly holding up a golden royal invitation scroll and fancy dresses, Cinderella watching hopefully from the doorway, warm bright room. |
| `images/story-02-invite-2.png` | Cinderella alone at dusk, sitting before a huge pile of beans to sort, tears on her cheeks, an empty house behind her, the family's carriage disappearing down the road outside the window. |

## 3장 · 요정 대모의 마법

| 파일명 | 장면 |
|---|---|
| `images/story-03-magic.png` | A warm glowing fairy godmother appearing before crying Cinderella in a moonlit garden, waving a sparkling wand at a large pumpkin that is transforming into a golden carriage, magical light. |
| `images/story-03-magic-2.png` | Cinderella marveling at her reflection in a garden pond, now wearing a shimmering pale blue ball gown and glass slippers, the fairy godmother beside her holding up a warning finger, white horses and carriage waiting behind them, magical moonlit garden. |

## 4장 · 무도회의 밤

| 파일명 | 장면 |
|---|---|
| `images/story-04-ball.png` | Cinderella and the prince dancing together in the center of a grand glowing ballroom, other guests watching in awe, warm golden chandelier light, romantic fairytale atmosphere. |
| `images/story-04-ball-2.png` | Cinderella rushing down a grand castle staircase at midnight, one glass slipper left behind on a step glinting in the moonlight, the prince reaching out from the top of the stairs, dramatic warm-to-dark lighting. |

## 5장 · 유리구두를 찾아서

| 파일명 | 장면 |
|---|---|
| `images/story-05-search.png` | A royal servant kneeling in a modest sitting room holding out a glass slipper on a velvet cushion, one stepsister struggling to force her foot into it, the other watching impatiently, warm indoor light. |
| `images/story-05-search-2.png` | Cinderella standing quietly in the doorway in her worn clothes, raising her hand to ask permission, the stepmother and stepsisters looking at her with scornful surprise, warm afternoon light. |

## 6장 · 신데렐라의 발

| 파일명 | 장면 |
|---|---|
| `images/story-06-fit.png` | Cinderella's foot slipping perfectly into the glass slipper held by the astonished royal servant, the stepmother and stepsisters gasping in the background, warm triumphant lighting. |
| `images/story-06-fit-2.png` | The prince kneeling before Cinderella in her simple patched dress, recognizing her with a joyful smile, gently taking her hand, warm golden afternoon light, heartfelt reunion. |

## 7장 · 행복한 시작

| 파일명 | 장면 |
|---|---|
| `images/story-07-wedding.png` | A grand royal wedding celebration in a castle courtyard, Cinderella in a beautiful gown beside the prince, crowds cheering, flower petals falling, warm joyful sunset light. |
| `images/story-07-wedding-2.png` | Cinderella as queen, kindly helping ordinary villagers at a castle gate, warm gentle smile, soft golden light, peaceful and content closing scene. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- "-2" 파일이 각 장의 핵심 장면을 담당하니, 시간이 부족하면 이 그림들부터 먼저 만드는 걸 추천해요.
