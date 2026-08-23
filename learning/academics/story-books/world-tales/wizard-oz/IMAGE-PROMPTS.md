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
bold clean outlines, saturated storybook colors, sunny open landscapes, no text
or letters in the image, American prairie and fantastical Oz settings, expressive
faces, wide panoramic composition, playful and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Dorothy: a girl about 10 with brown braids, a blue-and-white checked dress and
silver shoes, carrying a small basket. Toto: a scruffy little black terrier.
The Scarecrow: a friendly straw-stuffed man in patched blue clothes and a
pointed hat, floppy limbs. The Tin Woodman: a shiny jointed man of tin with a
funnel hat and an axe. The Cowardly Lion: a big shaggy lion with a nervous
expression and a bow in his mane. The Wizard: a small bald old man in a shabby
waistcoat, embarrassed and kindly.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a long yellow brick road curving away through green fields toward a distant sparkling emerald city under a wide blue sky, four small travelling figures walking together in the middle distance, warm and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 회오리바람

| 파일명 | 장면 |
|---|---|
| `images/01-tornado.png` | A small wooden farmhouse being lifted into a swirling grey tornado above flat prairie fields, a girl and small dog visible in a window, dramatic wind and flying debris, adventurous rather than terrifying. |

## 2장 · 노란 벽돌 길

| 파일명 | 장면 |
|---|---|
| `images/02-road.png` | A girl in a checked dress and silver shoes setting off along a winding yellow brick road with a small dog, cheerful little townsfolk waving farewell, bright flower-filled countryside. |

## 3장 · 허수아비를 만나다

| 파일명 | 장면 |
|---|---|
| `images/03-scarecrow.png` | A friendly straw scarecrow being helped down from a pole in a golden cornfield by a girl and a small dog, straw poking from his sleeves, warm sunny afternoon, comic and warm. |

## 4장 · 양철 나무꾼과 사자

| 파일명 | 장면 |
|---|---|
| `images/04-friends.png` | A tin man being oiled back to life beside a forest path while a large shaggy lion cowers comically from a tiny barking dog, a girl and scarecrow laughing, dappled green forest light. |

## 5장 · 에메랄드 시

| 파일명 | 장면 |
|---|---|
| `images/05-emerald.png` | A dazzling city of green towers and glittering spires, four travellers wearing green spectacles standing small before an enormous ornate throne room door, awe and wonder. |

## 6장 · 서쪽 마녀의 성

| 파일명 | 장면 |
|---|---|
| `images/06-witch.png` | A dark castle hall where a girl throws a bucket of water at a startled green witch who shrinks away in comic dismay, winged monkeys peering from the rafters, dramatic but funny. |

## 7장 · 커튼 뒤의 사람

| 파일명 | 장면 |
|---|---|
| `images/07-curtain.png` | A small dog pulling back a green curtain in a grand throne room to reveal a small embarrassed old man with a speaking trumpet and levers, four travellers staring in astonishment, comic revelation. |

## 8장 · 이미 가지고 있던 것

| 파일명 | 장면 |
|---|---|
| `images/08-home.png` | A wide two-part scene: the old man kindly explaining to the scarecrow, tin man and lion who look at each other in dawning realisation; and a girl clicking her silver heels and appearing back on a sunny Kansas farm hugging her family. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
