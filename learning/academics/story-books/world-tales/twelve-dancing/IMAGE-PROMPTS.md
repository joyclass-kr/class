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
bold clean outlines, saturated storybook colors, silvery moonlight and warm
candle golds, no text or letters in the image, a castle bedchamber, a staircase
beneath a bed, forests of silver, gold and diamond leaves, an underground lake
and a lantern-lit ballroom, expressive faces, wide panoramic composition,
magical and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The old soldier: a weathered cheerful man with a grey moustache and a patched
coat. The twelve princesses: sisters in matching pale gowns, the eldest proud and
watchful, the youngest small and nervous. The king: a worried man with a heavy
crown. An old woman on the road: a small bent figure with a bundle and a knowing
smile.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: twelve pairs of worn-through dancing shoes lined up outside a bedroom door, a trapdoor glowing faintly beneath a bed, and a silvery forest visible through the opening below, mysterious and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 닳아 버린 신발

| 파일명 | 장면 |
|---|---|
| `images/01-shoes.png` | A castle bedchamber at dawn with twelve beds in a row and twelve pairs of worn-through dancing shoes on the floor, a worried king in the doorway, morning light, puzzling. |

## 2장 · 임금님의 방

| 파일명 | 장면 |
|---|---|
| `images/02-decree.png` | A castle hall where a herald reads a proclamation to a crowd, and beside it a young prince slumped fast asleep in a chair outside a bedroom door, comic failure. |

## 3장 · 길에서 만난 노파

| 파일명 | 장면 |
|---|---|
| `images/03-cloak.png` | A country roadside where a weathered old soldier carries a bundle for a small bent old woman, who hands him a worn grey cloak in return, warm afternoon light, kindly. |

## 4장 · 마시지 않은 술

| 파일명 | 장면 |
|---|---|
| `images/04-wine.png` | A candlelit antechamber where a princess offers a goblet to an old soldier who pretends to drink while the wine trickles into his collar, comic and sly. |

## 5장 · 침대 밑의 계단

| 파일명 | 장면 |
|---|---|
| `images/05-trapdoor.png` | A bedchamber where a bed slides aside to reveal a glowing staircase descending into the earth, princesses in fine gowns filing down, a faint outline of a cloaked figure following, magical. |

## 6장 · 은과 금과 다이아몬드 숲

| 파일명 | 장면 |
|---|---|
| `images/06-forests.png` | Three enchanted underground forests in one wide panorama — silver leaves, then gold, then diamond — with princesses walking through and a branch snapping behind them, dazzling. |

## 7장 · 호수 건너 무도회장

| 파일명 | 장면 |
|---|---|
| `images/07-ball.png` | An underground lake with twelve small boats crossing toward a brilliantly lit ballroom on the far shore, one boat riding noticeably low in the water, lanterns reflecting, enchanting. |

## 8장 · 세 개의 가지

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A throne room where an old soldier holds up three branches of silver, gold and diamond leaves, the twelve princesses lowering their eyes and the king rising in astonishment, triumphant. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
