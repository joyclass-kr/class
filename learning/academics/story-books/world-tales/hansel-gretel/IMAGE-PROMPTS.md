# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 일곱 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요 — 그 장의 핵심 장면을 담은 큰 그림이 펼침면 전체를 가득 채우고,
그 아래에 대사가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(헨젤, 그레텔, 아버지, 마귀할멈)이 책 전체에 계속 등장하니, 매번 생김새를
비슷하게 유지하는 게 중요해요.

**이 이야기는 무서운 장면이 있어서 글을 순화했어요. 그림도 마찬가지로 무섭지 않게
그려 주세요** — 마귀할멈은 사납기보다 우스꽝스럽게, 갇힌 장면도 어둡지 않게요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft warm lighting even in night
scenes, no text or letters in the image, German forest and cottage setting,
expressive character faces, gentle and never frightening, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Hansel: a clever boy about 9, tousled brown hair, brown vest over a cream shirt,
short trousers. Gretel: a girl about 7, blonde braids with a blue ribbon, red
pinafore dress over a white blouse. Father: a weary kind woodcutter with a beard,
patched work clothes. The old witch: a small hunched comical old woman with a
big crooked nose, round spectacles, purple shawl — silly-looking rather than
scary.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: two children standing hand in hand with their backs to us, gazing up in wonder at a magical cottage made of cookies, candy canes and frosting glowing warmly in a moonlit forest clearing, whimsical and inviting rather than eerie. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 하얀 조약돌

| 파일명 | 장면 |
|---|---|
| `images/01-pebbles.png` | A boy crouching in a moonlit cottage yard filling his pockets with smooth white pebbles that glint in the moonlight, the small thatched cottage behind him with one warm lit window, quiet night, hopeful rather than sad. |

## 2장 · 다시 찾아온 길

| 파일명 | 장면 |
|---|---|
| `images/02-back-home.png` | Two children walking hand in hand through a moonlit forest following a trail of glowing white pebbles on the path ahead, the boy pointing confidently forward, soft blue moonlight with warm highlights. |

## 3장 · 새들이 먹어 버린 빵

| 파일명 | 장면 |
|---|---|
| `images/03-breadcrumbs.png` | Two children turning to look back down an empty forest path in dismay as cheerful little birds peck up the last breadcrumbs behind them, dappled daylight, gently comic rather than frightening. |

## 4장 · 과자로 만든 집

| 파일명 | 장면 |
|---|---|
| `images/04-candy-house.png` | Two delighted children breaking off pieces of a cottage built of cookies, chocolate roof tiles and swirled candy windows, a small hunched old woman with spectacles opening the door with an overly sweet smile, warm sunny clearing. |

## 5장 · 우리에 갇힌 헨젤

| 파일명 | 장면 |
|---|---|
| `images/05-cage.png` | The boy sitting inside a roomy wooden-barred pen holding out a thin chicken bone between the bars, the near-sighted old woman squinting closely at it through her spectacles with a puzzled frown, the girl watching from the kitchen, warm cozy interior, comedic tone. |

## 6장 · 그레텔의 꾀

| 파일명 | 장면 |
|---|---|
| `images/06-oven.png` | The girl bracing her shoulder against a big iron oven door and swinging it shut with a determined expression, the old woman's startled feet visible tumbling inside, the boy cheering from his opened pen, warm firelight, action-comedy energy, nothing gruesome. |

## 7장 · 집으로

| 파일명 | 장면 |
|---|---|
| `images/07-home.png` | A bearded woodcutter running out of a small cottage with open arms as his two children rush toward him, jewels spilling from their pockets, a friendly white duck waddling behind them, warm golden sunrise, joyful reunion. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
