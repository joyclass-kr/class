# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(백설공주, 왕비, 사냥꾼, 일곱 난쟁이, 왕자)이 책 전체에 계속 등장하니, 매번
생김새를 비슷하게 유지하는 게 중요해요.

**이 이야기도 무서운 장면이 있어서 글을 순화했어요. 그림도 무섭지 않게 그려 주세요** —
왕비는 사납기보다 도도하고 얄미운 느낌으로, 쓰러진 장면도 어둡지 않고 잠든 것처럼요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft warm lighting, no text or
letters in the image, European castle and forest setting, expressive character
faces, gentle and never frightening, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Snow White: a gentle girl about 12, jet-black bobbed hair with a red ribbon,
fair skin, a blue and yellow dress with puffed sleeves, warm smile. The Queen:
a tall haughty woman with dark hair in a crown, deep purple gown with a high
collar — vain and sulky rather than menacing. The seven dwarfs: seven short
cheerful bearded miners in colorful caps and work clothes, each a different
cap color. The Prince: a young man in a white and gold riding coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a gentle black-haired girl in a blue and yellow dress standing in a sunlit forest clearing surrounded by friendly birds and deer, a small cottage behind her, one shiny red apple resting on a mossy stone in the foreground, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 거울아, 거울아

| 파일명 | 장면 |
|---|---|
| `images/01-mirror.png` | A haughty queen in a purple gown standing before a tall ornate mirror in a castle chamber, her face twisting into a sulky pout as a faint face shimmers in the glass, rich warm candlelight, dramatic but not scary. |

## 2장 · 숲으로 간 공주

| 파일명 | 장면 |
|---|---|
| `images/02-forest.png` | A kindly huntsman kneeling and gesturing urgently for the young princess to run deeper into a sunlit forest, his expression gentle and worried, the girl looking back at him, dappled daylight through tall trees. |

## 3장 · 일곱 난쟁이의 집

| 파일명 | 장면 |
|---|---|
| `images/03-dwarfs.png` | Seven cheerful little bearded miners crowding around a small bed in their cozy cottage, holding lanterns and looking surprised and delighted at the girl sitting up awake, tiny furniture everywhere, warm lamplight. |

## 4장 · 빗과 허리끈

| 파일명 | 장면 |
|---|---|
| `images/04-disguise.png` | The queen disguised as a peddler woman with a basket of ribbons and sashes, leaning at the cottage doorway offering a bright sash to the curious princess, sly sideways glance, sunny afternoon. |

## 5장 · 새빨간 사과

| 파일명 | 장면 |
|---|---|
| `images/05-apple.png` | The queen disguised as a friendly old woman biting the white half of a large red-and-white apple while holding out the red half to the hesitant princess at the cottage window, warm daylight, gently suspenseful. |

## 6장 · 유리관 속의 공주

| 파일명 | 장면 |
|---|---|
| `images/06-glass-coffin.png` | Seven dwarfs standing quietly around a glass casket on a flower-covered hilltop where the princess lies as if peacefully asleep, birds perched on the rim, soft golden sunset, tender and calm rather than sad. |

## 7장 · 사과 조각이 튀어나오다

| 파일명 | 장면 |
|---|---|
| `images/07-awake.png` | The princess sitting up inside the opened glass casket rubbing her eyes as the seven dwarfs leap and cheer around her and the prince smiles in astonishment, bright morning light, joyful celebration. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
