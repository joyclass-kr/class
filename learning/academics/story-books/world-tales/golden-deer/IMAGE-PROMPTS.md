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
bold clean outlines, saturated storybook colors, warm golden Indian forest light,
no text or letters in the image, an ancient Indian forest, a river, a royal park
and a palace of carved stone, expressive gentle faces, wide panoramic
composition, warm and never violent on screen.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The golden deer: a large stag with a shining golden coat and silver antlers,
calm and steady. The young doe: a slender deer with soft eyes, expecting a fawn.
The king: a broad man in white and gold Indian robes with a short beard, proud
but capable of change. The chief huntsman: a wiry man with a bow and a worried
face.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a magnificent deer with a golden coat and silver antlers standing in a sunlit Indian forest glade, other deer resting among ferns behind it, shafts of light through great trees, serene and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 숲의 우두머리

| 파일명 | 장면 |
|---|---|
| `images/01-forest.png` | A lush Indian forest glade where a golden stag with silver antlers leads a herd of deer to a stream, waiting for a small fawn at the back, dappled sunlight, peaceful and warm. |

## 2장 · 사냥이 시작되다

| 파일명 | 장면 |
|---|---|
| `images/02-hunt.png` | A forest edge in uproar as horns sound and hunters advance, deer scattering through ferns, a golden stag standing firm and looking back at his frightened herd, tense but not gory. |

## 3장 · 임금님 앞에서

| 파일명 | 장면 |
|---|---|
| `images/03-king.png` | A carved stone palace courtyard where a golden stag walks calmly between rows of astonished guards toward a king rising from his throne, sunlight on the pillars, awe-struck stillness. |

## 4장 · 이상한 약속

| 파일명 | 장면 |
|---|---|
| `images/04-promise.png` | A palace hall where a king and a golden stag face each other in agreement, courtiers watching in silence, and beside it a quiet forest morning where deer stand together saying farewell, solemn and warm. |

## 5장 · 어린 어미 사슴

| 파일명 | 장면 |
|---|---|
| `images/05-doe.png` | A quiet forest hollow at dawn where a slender doe heavy with fawn pleads with a golden stag, other deer looking away uneasily among the ferns, gentle and moving. |

## 6장 · 스스로 걸어간 길

| 파일명 | 장면 |
|---|---|
| `images/06-walk.png` | A long forest path at sunrise where a golden stag walks away alone toward a distant palace, the whole herd standing motionless watching him go, long shadows, deeply moving. |

## 7장 · 임금님의 물음

| 파일명 | 장면 |
|---|---|
| `images/07-question.png` | A palace courtyard where a king stands face to face with a golden stag, one hand half raised, his expression breaking from authority into astonishment, morning light on stone. |

## 8장 · 숲이 열린 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A palace courtyard where a king lays down his bow before a golden stag as courtiers look on, and beyond the gate a forest full of deer, birds and other animals in bright sunlight, joyful and generous. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
