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
bold clean outlines, saturated storybook colors, warm Mediterranean sunlight, no
text or letters in the image, ancient Greek palace, olive groves, mountain
hillsides and a reed marsh, expressive comic faces, wide panoramic composition,
funny and never cruel.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
King Midas: a round-faced king in a purple Greek robe and gold crown, easily
flustered, with long donkey ears he tries to hide under a tall pointed cap. The
barber: a thin nervous man with scissors and a comb, bursting with a secret. Pan:
a cheerful goat-legged piper. Apollo: a tall golden-haired figure with a lyre.
The queen and courtiers in white Greek dress.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a crowned king in Greek robes clutching a tall pointed hat over his head while two long donkey ears peek out from beneath it, a grove of whispering reeds in the foreground, comic and inviting, warm Mediterranean light. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 산속의 음악 대결

| 파일명 | 장면 |
|---|---|
| `images/01-contest.png` | A sunlit Greek mountainside where a goat-legged piper and a golden-haired lyre player perform before a crowd of nymphs, animals and a seated king, olive trees and blue sky, festive. |

## 2장 · 혼자 다른 대답

| 파일명 | 장면 |
|---|---|
| `images/02-judgment.png` | A hushed mountain gathering where a plump king stands alone with his hand raised in objection while everyone else stares, the lyre player regarding him with a cool level gaze, comic tension. |

## 3장 · 아침에 생긴 일

| 파일명 | 장면 |
|---|---|
| `images/03-ears.png` | A palace bedchamber where a horrified king stares into a bronze mirror at his long furry donkey ears, and beside it the same king striding out wearing an enormous pointed cap, very comic. |

## 4장 · 이발사만은 알았다

| 파일명 | 장면 |
|---|---|
| `images/04-barber.png` | A palace room where a barber lifts a king's enormous cap and freezes with wide eyes at the donkey ears beneath, scissors dangling from his hand, the king glaring sideways, hilarious. |

## 5장 · 참을 수 없는 말

| 파일명 | 장면 |
|---|---|
| `images/05-itch.png` | A cramped village house where a gaunt barber tosses sleeplessly in bed with both hands clamped over his mouth, his worried wife watching, a candle guttering, comic misery. |

## 6장 · 갈대밭 구덩이

| 파일명 | 장면 |
|---|---|
| `images/06-hole.png` | A riverside reed bed at dusk where a barber kneels shouting into a hole he has dug in the earth, reeds towering around him, and then walking home light-footed, comic relief. |

## 7장 · 바람이 지나가자

| 파일명 | 장면 |
|---|---|
| `images/07-reeds.png` | A wide riverside marsh where tall reeds bend in the wind, travellers on the bank stopping to listen with astonished faces, the sound rippling across the whole valley, golden afternoon. |

## 8장 · 모자를 벗은 날

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A palace courtyard where a king finally takes off his huge cap revealing donkey ears, the crowd bursting into laughter and the king laughing along with them, warm sunny relief. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
