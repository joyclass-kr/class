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
bold clean outlines, saturated storybook colors, warm hearth light against cool
moonlit blues, no text or letters in the image, a shabby kitchen with a great
fireplace, a walled garden, a palace ballroom and staircase, and a village lane,
expressive faces, wide panoramic composition, warm and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Cinderella: a girl about 15 with ash-smudged cheeks and hair tied back, first in
a patched grey dress, later in a shimmering pale-blue gown. The stepmother: a
tall woman in stiff dark silk with a thin mouth. The two stepsisters: one lanky
and one plump, both in loud frilly dresses, comic rather than cruel-looking. The
fairy godmother: a round twinkling old woman in a soft lilac cloak. The prince: a
friendly young man in a green coat. The chamberlain: a fussy little man with a
cushion.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a single glass slipper resting on a red velvet cushion at the foot of a grand palace staircase at midnight, a clock face glowing above and a pumpkin coach fading into the dark beyond, elegant and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 재투성이 소녀

| 파일명 | 장면 |
|---|---|
| `images/story-01-chores.png` | A shabby kitchen with a great stone fireplace where a girl in a patched grey dress scrubs the floor at dawn, ashes on her sleeves, two overdressed stepsisters laughing in the doorway, warm firelight and cold morning through the window. |

## 2장 · 무도회 초대장

| 파일명 | 장면 |
|---|---|
| `images/story-02-invite.png` | A cluttered bedroom where two stepsisters preen before a mirror while a girl in grey pins up their hair, and in the yard beyond a sack of beans and lentils spilled across the flagstones, comic and pointed. |

## 3장 · 요정 대모의 마법

| 파일명 | 장면 |
|---|---|
| `images/story-03-magic.png` | A moonlit cottage yard where a twinkling old woman in a lilac cloak sweeps her wand and a pumpkin swells into a glittering coach, mice rearing up as white horses, a girl in grey watching open-mouthed, magical and joyful. |

## 4장 · 무도회의 밤

| 파일명 | 장면 |
|---|---|
| `images/story-04-ball.png` | A brilliant palace ballroom where dancers freeze as a girl in a pale-blue gown enters, and in the same wide scene she flees down a great staircase at midnight leaving one glass slipper behind, clock striking, dramatic and beautiful. |

## 5장 · 유리구두를 찾아서

| 파일명 | 장면 |
|---|---|
| `images/story-05-search.png` | A village lane where a fussy chamberlain carries a glass slipper on a cushion from door to door, women queueing and squeezing their feet, and at the end of the lane a carriage halting before a shabby house, comic and lively. |

## 6장 · 신데렐라의 발

| 파일명 | 장면 |
|---|---|
| `images/story-06-fit.png` | A shabby parlour where two stepsisters strain to force their feet into a glass slipper, and then a girl in grey sitting quietly as it slides on perfectly while she produces its twin from her apron, astonished faces all round. |

## 7장 · 행복한 시작

| 파일명 | 장면 |
|---|---|
| `images/story-07-wedding.png` | A palace doorway where a prince hurries down the steps to greet a girl stepping from a carriage, and a wide festive hall beyond where she draws her two shamefaced stepsisters into the celebration, warm and generous. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
