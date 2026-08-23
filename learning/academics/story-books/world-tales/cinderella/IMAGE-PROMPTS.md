# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(신데렐라, 새어머니, 언니 둘, 왕자, 요정 대모)이 책 전체에 계속 등장하니,
매번 인물 생김새를 비슷하게 유지하는 게 중요해요. 아래 "인물 설명"을 프롬프트 뒤에
같이 붙여 넣으면 그림체가 훨씬 일관되게 나와요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

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
| `images/story-01-chores.png` | A modest household scene: the stepmother scolding Cinderella over a bucket of water while the two vain stepsisters look on smugly in their fine clothes, Cinderella kneeling by a dying fireplace with ash on her cheek, warm dim firelight, weary but hopeful expression. |

## 2장 · 무도회 초대장

| 파일명 | 장면 |
|---|---|
| `images/story-02-invite.png` | The two stepsisters excitedly holding up a golden royal invitation scroll and fancy dresses in a bright room, while Cinderella sits alone at dusk before a huge pile of beans, tears on her cheeks, the family's carriage disappearing down the road outside the window. |

## 3장 · 요정 대모의 마법

| 파일명 | 장면 |
|---|---|
| `images/story-03-magic.png` | A warm glowing fairy godmother waving a sparkling wand over a large pumpkin transforming into a golden carriage in a moonlit garden, astonished Cinderella now wearing a shimmering pale blue ball gown and glass slippers, magical light. |

## 4장 · 무도회의 밤

| 파일명 | 장면 |
|---|---|
| `images/story-04-ball.png` | A grand glowing ballroom where Cinderella and the prince dance together as other guests watch in awe on one side, and on the other Cinderella rushing down the castle staircase at midnight leaving one glass slipper behind, warm-to-dark dramatic lighting spanning the whole scene. |

## 5장 · 유리구두를 찾아서

| 파일명 | 장면 |
|---|---|
| `images/story-05-search.png` | A royal servant kneeling in a modest sitting room holding out a glass slipper on a velvet cushion, one stepsister struggling to force her foot into it while the other watches impatiently, Cinderella standing quietly in the doorway raising her hand to ask permission, warm indoor light. |

## 6장 · 신데렐라의 발

| 파일명 | 장면 |
|---|---|
| `images/story-06-fit.png` | Cinderella's foot slipping perfectly into the glass slipper held by the astonished royal servant, the stepmother and stepsisters gasping in the background, the prince arriving and kneeling before her with a joyful smile, warm triumphant lighting. |

## 7장 · 행복한 시작

| 파일명 | 장면 |
|---|---|
| `images/story-07-wedding.png` | A grand royal wedding celebration in a castle courtyard, Cinderella in a beautiful gown beside the prince, crowds cheering and flower petals falling, warm joyful sunset light. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
