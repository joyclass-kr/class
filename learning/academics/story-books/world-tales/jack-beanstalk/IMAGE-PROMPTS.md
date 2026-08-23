# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 여덟 개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

같은 인물(잭, 어머니, 거인, 거인의 아내)이 책 전체에 계속 등장하니, 매번 생김새를
비슷하게 유지하는 게 중요해요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, soft golden lighting, no text or
letters in the image, English countryside and cloud-kingdom setting, expressive
exaggerated character faces, wide panoramic composition, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Jack: a lively boy about 11, messy brown hair, patched green shirt, brown
trousers, bare feet. Mother: a thin tired but kind woman in a grey dress and
white apron, hair in a bun. The Giant: an enormous bearded man in a huge brown
tunic and boots, big round nose, comically fearsome rather than horrifying.
The Giant's wife: a large motherly giantess in a red dress and white apron,
gentle worried eyes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: an enormous green beanstalk twisting upward from a tiny cottage garden and disappearing into a bank of clouds high above, a small boy at the bottom looking up in wonder, a castle faintly visible among the clouds, warm inviting storybook mood. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 소를 팔러 가는 길

| 파일명 | 장면 |
|---|---|
| `images/01-cow.png` | A tired mother handing a rope halter to her son outside a shabby little cottage, a bony old milk cow standing beside them, a country road stretching away toward a distant market town, morning light. |

## 2장 · 콩 다섯 알

| 파일명 | 장면 |
|---|---|
| `images/02-beans.png` | A curious old man on a country road holding out five glowing beans in his open palm to a wide-eyed boy, the old cow standing between them, dusty afternoon light, a hint of magic sparkle around the beans. |

## 3장 · 하늘까지 자란 나무

| 파일명 | 장면 |
|---|---|
| `images/03-beanstalk.png` | A colossal beanstalk erupting from a tiny cottage garden and spiralling up into the clouds, the boy already climbing partway up while his mother calls after him from the doorway, bright morning sky. |

## 4장 · 구름 위의 성

| 파일명 | 장면 |
|---|---|
| `images/04-castle.png` | A vast stone castle rising out of a sea of clouds with a door many times the boy's height, the tiny boy standing at the doorstep as a huge motherly giantess peers down at him kindly, soft cloud light. |

## 5장 · 쿵, 쿵, 쿵

| 파일명 | 장면 |
|---|---|
| `images/05-giant.png` | A cutaway of an enormous kitchen: a huge bearded giant sniffing the air suspiciously at a massive table while the boy hides inside a giant cooking pot peeking through the gap, the giantess calmly serving supper, warm firelight. |

## 6장 · 황금알을 낳는 거위

| 파일명 | 장면 |
|---|---|
| `images/06-goose.png` | The giant slumped asleep and snoring at his huge table while the tiny boy tiptoes away clutching a white goose, a gleaming golden egg left rolling on the tabletop, warm dim lamplight. |

## 7장 · 노래하는 하프

| 파일명 | 장면 |
|---|---|
| `images/07-harp.png` | A golden harp with a carved face crying out in alarm as the boy lifts it, the giant bolting upright from his chair behind him with a furious expression, dramatic torchlit hall. |

## 8장 · 도끼 한 자루

| 파일명 | 장면 |
|---|---|
| `images/08-axe.png` | The boy swinging an axe at the base of the enormous beanstalk while the giant clings high above amid toppling coils of vine, the mother watching from the cottage doorway, dramatic sky, action-comedy energy, nothing gruesome. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
