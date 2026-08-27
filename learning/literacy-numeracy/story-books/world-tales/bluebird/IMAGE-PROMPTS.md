# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 아홉 개의 장(챕터)으로 나눠 담았고, 각 장이 **펼침면 두 개**로
이루어집니다. 펼침면마다 그림이 한 장씩 들어가니 본문 그림은 모두 **열여덟 장**이에요.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

> **✅ 본문 그림 열여덟 장은 이미 다 만들어져 있습니다.**
> 예전에 만들어 두신 `-2` 파일들이 한동안 코드에서 빠져 있었는데, 지금은 전부 제자리에
> 들어가 쓰이고 있어요. 다시 만드실 필요 없습니다.
> 다만 예전 4:3 비율로 뽑은 그림이라 양옆이 조금 잘려 보일 수 있으니, 여유가 되실 때
> 아래 새 비율로 다시 뽑으시면 더 깔끔합니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.

같은 인물(치르치르, 미치르, 빛의 요정, 강아지 치로, 고양이 치레트)이 책 전체에 계속
등장하니, 매번 인물 생김새를 비슷하게 유지하는 게 중요해요.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, warm watercolor and colored-pencil style,
soft golden lighting, gentle rounded shapes, storybook atmosphere, no text or
letters in the image, consistent warm fairytale color palette (parchment, gold,
soft blue, forest green), expressive character faces, dynamic staging.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Tyltyl (치르치르): a boy around 8 years old, brown hair, red pointed cap, simple
blue jacket and brown trousers. Mytyl (미치르): a girl around 6, light brown
hair in braids, simple white and pink dress. The Fairy (빛의 요정): a graceful
woman with long golden hair, a flowing pale blue-white gown, a sparkling star
wand. Tylo the dog (치로): a small brown dog. Tylette the cat (치레트): an
orange tabby cat, both walking upright like small people once transformed.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a small bird cage glowing with soft blue light standing on a windowsill at night, a crescent moon and stars outside, a tiny magic star-topped cap resting beside it, warm and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 크리스마스이브

| 파일명 | 장면 |
|---|---|
| `images/01-eve.webp` | Two children sitting up in bed in a modest dark bedroom at night, peering out a frosty window at a grand brightly lit mansion across the street where a festive party glows warmly. |
| `images/01-eve-2.webp` | Two children pressed close against a frosty cottage window from inside, warm golden party light and the smell of food drifting in from the mansion across the street, the girl swallowing hungrily, longing expressions, quiet night interior. |

## 2장 · 빛의 요정

| 파일명 | 장면 |
|---|---|
| `images/02-fairy.webp` | An old woman transforming into a radiant fairy with golden hair and a starry wand in the middle of a small cottage room, two astonished children watching, a small green cap with a glowing diamond in her outstretched hand, warm magical light. |
| `images/02-fairy-2.webp` | A boy turning the glowing diamond on a small green cap, the whole cottage room bursting into radiant light around him, ordinary objects beginning to stir and come alive, his sister beside him with wide astonished eyes. |

## 3장 · 요정들과의 만남

| 파일명 | 장면 |
|---|---|
| `images/03-elements.webp` | A cozy cottage room suddenly full of whimsical characters — a dog and cat standing upright in little clothes, a water droplet spirit, a flickering fire spirit, a bread spirit, and a sugar spirit — all gathered around the two delighted children, warm chaotic magical scene. |
| `images/03-elements-2.webp` | The two children setting out from their cottage door into a starry night with the light fairy leading, the dog trotting eagerly in front with tail wagging, the cat lagging behind with a sly look, a crowd of little spirits following. |

## 4장 · 추억의 나라

| 파일명 | 장면 |
|---|---|
| `images/04-memory.webp` | A misty dreamlike clearing with a huge ancient tree bearing a wooden sign, a warm elderly couple welcoming two children and a fairy with open arms, soft golden nostalgic light. |
| `images/04-memory-2.webp` | The two children walking away from a misty clearing holding a birdcage, the bird inside having turned coal black, their shoulders drooping in disappointment, the grandparents waving small and faint in the fog behind them. |

## 5장 · 밤의 나라

| 파일명 | 장면 |
|---|---|
| `images/05-night.webp` | Two children surrounded by angry animate trees and forest animals in a dark clearing, shadowy monster shapes looming behind them, dramatic moonlit confrontation. |
| `images/05-night-2.webp` | Towering trees stretching branches like arms to block the path, wolves and bears baring teeth in the dark, the little sister clinging to her brother's arm in terror, the circle of danger closing in, dramatic night forest. |

## 6장 · 무덤 앞에서

| 파일명 | 장면 |
|---|---|
| `images/06-escape.webp` | The two children standing before a single blooming red rose in a quiet moonlit graveyard clearing, the dark forest having vanished, calm and gentle scene. |
| `images/06-escape-2.webp` | A grave slowly opening in a moonlit clearing to reveal nothing but a single red rose blooming inside, the two children peering in with held breath, no monsters anywhere, hushed and gentle. |

## 7장 · 행복의 나라

| 파일명 | 장면 |
|---|---|
| `images/07-happiness.webp` | A festive banquet hall with glowing lanterns and tables of food shimmering and dissolving into golden smoke, the fairy gesturing urgently, the children's mother emerging in soft warm light nearby. |
| `images/07-happiness-2.webp` | The banquet and its plump revellers dissolving into curling smoke, and in the clearing light a group of gentle children and the mother's warm face appearing, the two children gazing with a tender aching look. |

## 8장 · 미래의 나라

| 파일명 | 장면 |
|---|---|
| `images/08-future.webp` | A vast dreamy harbor full of rows of small glowing infant spirits boarding a ship under the guidance of a tall wise old bearded figure with a staff, magical twilight scene. |
| `images/08-future-2.webp` | A sky-blue harbour where rows of infant spirits board a white-sailed ship bound for earth, the ship gliding off beyond the clouds, and in the foreground a small bird turning red in the boy's reaching hands. |

## 9장 · 파랑새는 집에 있었다

| 파일명 | 장면 |
|---|---|
| `images/09-home.webp` | A warm sunlit bedroom on Christmas morning, a mother gently waking two children, an elderly neighbor smiling nearby, an ordinary birdcage on the windowsill quietly glowing pale blue. |
| `images/09-home-2.webp` | An ordinary birdcage on a sunlit windowsill, the bird inside catching the morning light and shining a clear bright blue, the two children staring in wonder as the elderly neighbour points at it with a knowing smile. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 인물 생김새를 통일하려면 공통 스타일 지시문과 인물 설명을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
