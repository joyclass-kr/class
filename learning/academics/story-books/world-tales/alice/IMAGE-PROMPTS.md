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
bold clean outlines, saturated storybook colors, playful surreal scale changes,
no text or letters in the image, Victorian English garden and dreamlike
Wonderland settings, expressive comic faces, wide panoramic composition,
whimsical and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Alice: a girl about 9 with long blonde hair, a blue dress with a white pinafore
and black shoes. The White Rabbit: a fussy white rabbit in a checked waistcoat
carrying a large pocket watch. The Cheshire Cat: a wide-grinning striped cat that
fades in and out. The Mad Hatter: a lanky man in an oversized top hat and bow
tie. The March Hare: a scruffy brown hare in a jacket. The Queen of Hearts: a
round, red-faced queen in a heart-patterned gown, comically bossy. Playing-card
soldiers: flat card figures with arms and legs.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a girl in a blue dress peering down a huge dark rabbit hole at the roots of a great tree, a white rabbit in a waistcoat disappearing into it with a pocket watch, oversized flowers and toadstools around, whimsical and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 조끼 입은 토끼

| 파일명 | 장면 |
|---|---|
| `images/01-rabbit.png` | A girl in a blue dress leaping up from a riverbank to chase a waistcoated white rabbit checking a pocket watch, and tumbling headfirst into a huge hole beneath a tree, summer greenery, comic motion. |

## 2장 · 커졌다 작아졌다

| 파일명 | 장면 |
|---|---|
| `images/02-potion.png` | A whimsical round hall with a tiny door, a glass table with a labelled bottle and a small cake, and the same girl shown both shrunk to doll-size and grown so tall her head bumps the ceiling, comic scale contrast. |

## 3장 · 눈물 웅덩이

| 파일명 | 장면 |
|---|---|
| `images/03-pool.png` | A shrunken girl swimming across a wide pool of tears alongside a mouse, then a shore crowded with soggy birds and animals running in a disorganised circle to dry off, silly and cheerful. |

## 4장 · 웃는 고양이

| 파일명 | 장면 |
|---|---|
| `images/04-cheshire.png` | A wide-grinning striped cat lounging on a tree branch, half of its body already faded to transparency leaving only the grin, a puzzled girl looking up from a forked forest path, dreamy and funny. |

## 5장 · 엉망진창 다과회

| 파일명 | 장면 |
|---|---|
| `images/05-teaparty.png` | A long outdoor table crowded with mismatched teacups and teapots where a lanky hatter in an oversized top hat and a scruffy hare shout cheerfully, a girl standing with hands on hips looking exasperated, dappled forest light. |

## 6장 · 장미를 칠하는 병정들

| 파일명 | 장면 |
|---|---|
| `images/06-garden.png` | Flat playing-card soldiers frantically painting white roses red with dripping brushes in a formal garden while a girl watches, trumpets sounding in the background, comic panic and bright colours. |

## 7장 · 하트 여왕의 재판

| 파일명 | 장면 |
|---|---|
| `images/07-trial.png` | A chaotic courtroom of playing cards with a round red-faced queen shouting from a raised throne, a rabbit herald blowing a trumpet, and a girl standing up boldly among them, comic uproar. |

## 8장 · 강둑에서 눈을 뜨다

| 파일명 | 장면 |
|---|---|
| `images/08-wake.png` | A whirlwind of playing cards flying up around a girl, dissolving into falling leaves as she wakes on a sunny riverbank beside her reading sister, warm green summer afternoon, gentle transition. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
