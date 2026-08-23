# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, strong contrast between cold
blue snowy streets and warm golden matchlight visions, no text or letters in the
image, 19th-century European town setting, expressive faces, wide panoramic
composition, tender and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The little girl: a thin child about 8 with pale cheeks, a worn brown shawl, a
faded blue dress and bare feet, carrying a bundle of matches in her apron.
The grandmother: a warm elderly woman with silver hair and a soft shawl, always
drawn glowing and kind. Townspeople: bundled-up figures hurrying past in coats
and hats.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small girl in a thin shawl sitting in a snowy alley corner at night holding a single glowing match, its warm light making a soft golden circle against the deep blue winter street, tender and gentle. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 한 해의 마지막 밤

| 파일명 | 장면 |
|---|---|
| `images/01-street.png` | A small barefoot girl in a thin shawl holding out matches on a snowy evening street while bundled townspeople hurry past without looking, warm lit windows above, cold blue tones with golden window glow. |

## 2장 · 창문 너머의 저녁상

| 파일명 | 장면 |
|---|---|
| `images/02-window.png` | A girl pausing outside a brightly lit window where a family gathers around a laden dinner table, her breath visible in the cold air, snow falling, strong warm-versus-cold contrast. |

## 3장 · 첫 번째 성냥

| 파일명 | 장면 |
|---|---|
| `images/03-stove.png` | A girl striking a match in a dark alley as the small flame blossoms into a glowing vision of a warm iron stove floating before her, golden light spilling over her face, magical and comforting. |

## 4장 · 두 번째 성냥

| 파일명 | 장면 |
|---|---|
| `images/04-feast.png` | A vision of a laden feast table with a roast goose comically waddling toward the girl, all glowing inside the matchlight, the cold brick wall faintly visible behind the vision, whimsical and warm. |

## 5장 · 세 번째 성냥

| 파일명 | 장면 |
|---|---|
| `images/05-tree.png` | A towering Christmas tree covered in countless glowing candles rising out of the matchlight above the girl, the candles lifting into the night sky to become stars, one star streaking downward, wondrous. |

## 6장 · 할머니

| 파일명 | 장면 |
|---|---|
| `images/06-grandmother.png` | A warm glowing grandmother figure appearing in bright matchlight with arms open as the girl reaches toward her, the whole alley lit up gold as a whole bundle of matches burns at once, radiant and loving. |

## 7장 · 아침이 오고

| 파일명 | 장면 |
|---|---|
| `images/07-morning.png` | A gentle scene of the grandmother carrying the girl upward into soft golden light, and below in the morning street townspeople gathering quietly around the alley corner with sorrowful faces, snow softly lit by sunrise, tender and dignified. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
