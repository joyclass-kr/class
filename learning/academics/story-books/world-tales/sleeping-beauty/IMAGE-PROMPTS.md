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
bold clean outlines, saturated storybook colors, soft warm lighting, no text or
letters in the image, European fairytale castle and forest setting, expressive
character faces, gentle and never frightening, wide panoramic composition.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Princess Aurora: a girl with long golden hair and a pale rose gown, gentle round
face. The King and Queen: warm middle-aged royals in blue and crimson robes with
simple gold crowns. The good fairies: small kindly women in pastel gowns with
tiny wings and wands. The uninvited fairy: a tall thin woman in deep purple with
a sharp chin — sulky and haughty rather than monstrous. The Prince: a young man
in a green riding coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a slender castle tower wrapped in thick climbing rose vines under a soft moonlit sky, a single lit window near the top, thorny briars curling across the foreground, warm and magical rather than gloomy. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 오래 기다린 공주

| 파일명 | 장면 |
|---|---|
| `images/01-birth.png` | A joyful christening feast in a bright castle hall, a king and queen beaming beside a cradle, several small pastel-gowned fairies arriving with gifts, flowers and banners everywhere, warm celebratory light. |

## 2장 · 초대받지 못한 손님

| 파일명 | 장면 |
|---|---|
| `images/02-curse.png` | A tall purple-gowned fairy sweeping into the feast hall with a haughty pointing gesture, guests recoiling in shock, the cradle in the foreground, dramatic contrast of warm hall light and her cool shadow. |

## 3장 · 마지막 요정의 선물

| 파일명 | 장면 |
|---|---|
| `images/03-softened.png` | A small young fairy in a pale blue gown raising her wand gently over the cradle as soft silver light spreads through the hall, the relieved king and queen watching, hopeful warm glow. |

## 4장 · 탑 위의 방

| 파일명 | 장면 |
|---|---|
| `images/04-spindle.png` | A curious young princess reaching toward an old spinning wheel in a small round tower room lit by a single window, an old woman seated beside it, dust motes floating in the sunbeam, quiet and gentle mood. |

## 5장 · 성 전체가 잠들다

| 파일명 | 장면 |
|---|---|
| `images/05-sleep.png` | A cutaway of a castle where everyone has fallen asleep mid-action — a cook frozen with a ladle, guards dozing on the stairs, horses asleep standing — while thick rose briars begin creeping up the outer walls, soft dreamy light. |

## 6장 · 가시덤불을 헤치고

| 파일명 | 장면 |
|---|---|
| `images/06-prince.png` | A young prince on horseback riding through a wall of thorny rose briars that part before him into a green tunnel, sunlight streaming through the gap, the castle towers visible beyond, hopeful adventurous mood. |

## 7장 · 백 년 만의 아침

| 파일명 | 장면 |
|---|---|
| `images/07-wake.png` | A princess sitting up and stretching in a sunlit tower room as a prince smiles beside her, and in the background the whole castle waking at once — fire relighting, servants blinking, roses blooming across the walls, joyful golden morning. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
