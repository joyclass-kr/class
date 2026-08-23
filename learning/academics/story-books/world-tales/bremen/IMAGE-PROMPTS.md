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
bold clean outlines, saturated storybook colors, warm lantern light against cool
night blue, no text or letters in the image, German farmyards, a country road and
a robbers' cottage in the woods, very expressive comic animal faces, wide
panoramic composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The donkey: a grey donkey with a drooping lip and tired knees, the leader. The
dog: a shaggy brown hound with grey around his muzzle. The cat: a striped cat
with worn whiskers and a crooked tail. The rooster: a red-combed rooster with
splendid tail feathers. The robbers: three scruffy men in patched coats and
floppy hats, drawn as bumbling and comic, never menacing.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a donkey with a dog on its back, a cat on the dog, and a rooster on top of the cat, all standing on a moonlit country road, a lit cottage window glowing far ahead, funny and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 늙은 당나귀

| 파일명 | 장면 |
|---|---|
| `images/01-donkey.png` | A moonlit mill yard where an old grey donkey slips quietly out of the gate with a bundle of straw on its back, the miller silhouetted in a lit doorway behind, wistful and determined. |

## 2장 · 길에서 만난 개

| 파일명 | 장면 |
|---|---|
| `images/02-dog.png` | A dusty roadside where a shaggy old hound lies panting under a hedge as a grey donkey stops beside him, both animals mid-conversation with comic expressions, warm morning light. |

## 3장 · 고양이와 수탉

| 파일명 | 장면 |
|---|---|
| `images/03-four.png` | A village lane where a grumpy striped cat sits on a wall and a red rooster crows from a fence post, a donkey and hound looking up at them, all four then walking off together, lively and funny. |

## 4장 · 숲속의 불빛

| 파일명 | 장면 |
|---|---|
| `images/04-light.png` | A dark forest at night where four animals creep toward a small cottage with one glowing window, the rooster pointing from a high branch, moonlight through pines, atmospheric and exciting. |

## 5장 · 도둑들의 밥상

| 파일명 | 장면 |
|---|---|
| `images/05-robbers.png` | Seen through a cottage window, three scruffy robbers feasting at a laden table, while outside four animals stack themselves one on top of another beneath the sill, hilarious contrast. |

## 6장 · 한꺼번에

| 파일명 | 장면 |
|---|---|
| `images/06-noise.png` | A cottage interior in chaos as a window bursts inward and three robbers flee out the door, chairs flying, and then the four animals happily seated at the table feasting, riotously comic. |

## 7장 · 다시 온 도둑

| 파일명 | 장면 |
|---|---|
| `images/07-return.png` | A dark cottage kitchen where a robber recoils from two glowing cat eyes he mistook for embers, then is chased through the doorway by a dog and kicked by a donkey while a rooster crows from the roof, comic mayhem. |

## 8장 · 브레멘은 못 갔지만

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | A cosy woodland cottage at dusk with warm light in every window, the four animals singing together on the doorstep, robbers fleeing as small distant figures, joyful and homey. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
