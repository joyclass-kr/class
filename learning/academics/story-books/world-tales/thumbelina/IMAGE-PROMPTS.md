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
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, garden, pond and meadow seen from a tiny creature's scale
so flowers and leaves loom large, expressive faces, wide panoramic composition.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Thumbelina: a tiny girl no bigger than a thumb, light brown hair, a simple pale
pink dress made from petals, bright curious eyes. The toad: a large green toad
in a frilly bonnet, comically pushy. The field mouse: a plump grey mouse in an
apron and spectacles. The mole: a stout black mole in a velvet waistcoat and
dark glasses. The swallow: a sleek blue-black swallow. The flower prince: a tiny
boy Thumbelina's size with translucent wings and a golden crown.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a tiny girl the size of a thumb sitting on a large tulip blossom in a moonlit garden, a walnut-shell bed and rose-petal blanket beside her, oversized leaves and dewdrops around, warm magical mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 꽃 속에서 태어난 아이

| 파일명 | 장면 |
|---|---|
| `images/01-flower.png` | A large tulip blossom opening on a windowsill to reveal a tiny girl sitting inside, a delighted woman leaning close with hands clasped, sunlight streaming through the window, warm cozy interior. |

## 2장 · 두꺼비가 데려간 밤

| 파일명 | 장면 |
|---|---|
| `images/02-toad.png` | A large green toad in a bonnet carrying a tiny sleeping girl in a walnut-shell bed across a moonlit pond, placing her on a broad lily pad surrounded by dark water, whimsical rather than scary. |

## 3장 · 물고기들이 도와주었어요

| 파일명 | 장면 |
|---|---|
| `images/03-fish.png` | Several fish gathered under a lily pad nibbling through its stem while a tiny girl stands on top holding on, the pad beginning to drift downstream, dappled underwater light and rippling surface. |

## 4장 · 여름 들판의 하루

| 파일명 | 장면 |
|---|---|
| `images/04-summer.png` | A tiny girl sleeping in a hammock of woven grass among towering wildflowers with butterflies and ladybugs around her, one half of the scene shifting into autumn with falling leaves and cooler colours. |

## 5장 · 들쥐 아주머니의 집

| 파일명 | 장면 |
|---|---|
| `images/05-mouse.png` | A cosy underground burrow lined with stored grain, a plump field mouse in an apron gesturing warmly while a tiny girl sits on a thimble stool looking uncertain, warm lamplight and earthy tones. |

## 6장 · 다친 제비

| 파일명 | 장면 |
|---|---|
| `images/06-swallow.png` | A tiny girl covering a weak swallow with dry grass in a dim underground passage, then the same swallow reviving with spread wings as spring light spills in from an opening above, tender and hopeful. |

## 7장 · 제비의 등을 타고

| 파일명 | 장면 |
|---|---|
| `images/07-flight.png` | A tiny girl riding on the back of a swallow high above patchwork fields and winding rivers, wind in her hair, wide sweeping sky with warm sunlight ahead, exhilarating sense of freedom. |

## 8장 · 꽃의 나라에서

| 파일명 | 장면 |
|---|---|
| `images/08-prince.png` | A tiny girl meeting a tiny winged flower prince inside a large white blossom, other tiny flower people waving from surrounding blooms, a swallow perched nearby singing, radiant sunlit garden of the south. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
