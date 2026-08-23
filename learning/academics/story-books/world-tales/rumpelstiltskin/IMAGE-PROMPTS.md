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
bold clean outlines, saturated storybook colors, warm firelight against cool
stone, no text or letters in the image, a miller's cottage, castle store rooms
full of straw, a forest hut and a throne room, expressive comic faces, wide
panoramic composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The miller's daughter: a girl about 16 with braided hair and a plain grey dress,
frightened at first, steady later. The miller: a boastful red-faced man in a
floury apron. The king: a young man in a fur-trimmed cloak, greedy for gold. The
little man: a tiny wiry figure in a pointed cap and green coat with a wispy beard,
drawn as comical and sly, never scary. A messenger: a lanky man with muddy boots.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a dim tower room piled with golden thread on spindles, a small spinning wheel turning by itself and a tiny cloaked figure dancing in the corner shadows, moonlight through a barred window, mysterious and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 방앗간 주인의 허풍

| 파일명 | 장면 |
|---|---|
| `images/01-boast.png` | A castle audience hall where a floury-aproned miller gestures grandly while a young king leans forward with gleaming eyes, the miller's face already turning sheepish, comic. |

## 2장 · 짚이 가득한 방

| 파일명 | 장면 |
|---|---|
| `images/02-straw.png` | A stone store room piled to the ceiling with straw, a single spinning wheel in the middle and a weeping girl beside it, a tiny figure slipping in through the door crack, tense and eerie but not scary. |

## 3장 · 작은 남자

| 파일명 | 장면 |
|---|---|
| `images/03-little-man.png` | A tiny man in a pointed cap sitting at a spinning wheel, straw feeding in one side and glittering golden thread winding out the other, the girl watching wide-eyed, magical and funny. |

## 4장 · 더 큰 방

| 파일명 | 장면 |
|---|---|
| `images/04-bigger.png` | A much larger store room heaped with straw at dusk, the girl handing over a small ring to a tiny man who is already rolling up his sleeves at the wheel, resigned and comic. |

## 5장 · 줄 것이 없어서

| 파일명 | 장면 |
|---|---|
| `images/05-promise.png` | A vast straw-filled hall at night where a tiny man holds out his hand and the girl hesitates with her own hand half raised, torchlight throwing long shadows, heavy and quiet. |

## 6장 · 찾아온 약속

| 파일명 | 장면 |
|---|---|
| `images/06-baby.png` | A nursery at night where a queen clutches her baby as a tiny man stands on the windowsill holding up three fingers, moonlight and gauzy curtains, tense but gentle. |

## 7장 · 온 나라의 이름

| 파일명 | 장면 |
|---|---|
| `images/07-names.png` | A throne room where a queen reads from a long unrolled scroll of names while a tiny man shakes his head smugly, courtiers crowding the doorway, comic tension. |

## 8장 · 숲속의 노래

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A forest clearing at night where a tiny man capers around a bonfire singing, and in a lit palace room a queen calmly speaking his name as he leaps in shock, comic and triumphant. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
