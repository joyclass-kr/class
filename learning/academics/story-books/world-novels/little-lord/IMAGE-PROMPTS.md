# 제미나이 그림 프롬프트 — 소공자

하나의 이야기를 열다섯 장으로 나눠 담았고, 장마다 그림이 두 장씩 들어갑니다.
그림이 있는 펼침면은 오른쪽 쪽에 그림 한 장이 들어가고, 그림이 없는 펼침면은 양쪽 쪽에 글만 들어갑니다.
아래 프롬프트를 제미나이에 넣어 생성한 뒤 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보입니다.)

권장 크기: **가로 4 : 세로 3** 비율, PNG.
**단 표지(`cover.png`)만 예외 — 세로 2 : 3 비율입니다.** 표지 그림칸은 책을 펼쳤을 때 왼쪽 반쪽 전체를 채우는데,
그 칸 자체가 세로로 긴 2:3 모양입니다. 4:3 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolor, bold clean outlines, warm
saturated colors, realistic proportions with expressive faces, the 1880s:
a cramped New York side street on one side and an old English castle and
green estate on the other, firelight and lamplight indoors, warm and
good-humoured mood, no text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Cedric: a sturdy boy of seven with shoulder-length golden curls and large
brown eyes, straight-backed and completely unafraid, in a black velvet suit
with a lace collar once he reaches England.
Mrs Errol ("Dearest"): a young widow in a plain black dress, quiet and
composed, gentle eyes.
The Earl of Dorincourt: a tall gaunt old aristocrat with white hair, a high
nose and heavy brows, one bandaged foot on a stool, a gold-headed cane, a
severe mouth that is not as severe as it looks.
Mr Hobbs: a large heavy New York grocer in shirtsleeves and an apron, always
with a newspaper, a booming voice.
Dick: a wiry teenage shoeshine boy in patched clothes with a shoeblack box.
Mr Havisham: a thin precise old lawyer in black with a leather case.
Dougal: a huge deerhound that follows the Earl everywhere.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a small golden-haired boy in a velvet suit standing beside a huge armchair holding the hand of a gaunt white-haired old man who is seated with a bandaged foot; a great hound at their feet, a firelit library rising into shadow behind them, tall windows above. |
| `images/end.png` | A firelit library at night with two empty chairs drawn close together, a footstool between them, a large sleeping hound on the rug, one lamp still burning. |

## 1장 · 뉴욕의 골목

| 파일명 | 장면 |
|---|---|
| `images/story-01-a.png` | A crowded narrow New York street in the 1880s: laundry lines, stoops, barrels; a small golden-haired boy walking through it greeted by everyone he passes. |
| `images/story-01-b.png` | A grocery store front: a big man in an apron reading a newspaper in a chair, a small boy sitting solemnly on a crate beside him, both talking like equals. |

## 2장 · 낯선 손님

| 파일명 | 장면 |
|---|---|
| `images/story-02-a.png` | A carriage entirely out of place at the mouth of a poor street, neighbours staring, a thin lawyer in black stepping down with a leather case. |
| `images/story-02-b.png` | A small plain parlour: the lawyer explaining with papers on his knee, a young widow gone pale, a boy standing in the doorway not understanding a word of it. |

## 3장 · 골목과의 작별

| 파일명 | 장면 |
|---|---|
| `images/story-03-a.png` | The grocery store: the big grocer with his hat off fanning himself in shock, a boy on the crate explaining something very seriously. |
| `images/story-03-b.png` | A ship pulling away from a New York pier: a boy at the rail waving hard, and on the dock a huge man in an apron and a shoeshine boy waving back. |

## 4장 · 도린코트 성

| 파일명 | 장면 |
|---|---|
| `images/story-04-a.png` | A carriage on a long drive through ancient oaks, a great grey castle with ivy on its walls appearing ahead, deer on the grass. |
| `images/story-04-b.png` | A castle entrance hall: a line of servants standing stiffly, a small boy walking down the line greeting each one, a butler entirely at a loss. |

## 5장 · 할아버지

| 파일명 | 장면 |
|---|---|
| `images/story-05-a.png` | A vast dim library: a gaunt old man in a great chair with a bandaged foot on a stool, a huge hound rising, a small golden-haired boy walking in and putting out his hand without a trace of fear. |
| `images/story-05-b.png` | A very long dining table: the old man at one end and the small boy at the other, the boy talking happily, the old man leaning forward to hear despite himself. |

## 6장 · 날마다 가는 길

| 파일명 | 장면 |
|---|---|
| `images/story-06-a.png` | A boy on a small pony trotting down a tree-lined lane with a groom riding behind, morning light, the castle small in the distance behind them. |
| `images/story-06-b.png` | A modest cottage parlour: a young widow and her son sitting close together on a settle, an hour's visit almost over, the boy's cap already in his hand. |

## 7장 · 언쇼 마을

| 파일명 | 장면 |
|---|---|
| `images/story-07-a.png` | A poor tenant village: sagging roofs with holes, standing water in the lane, barefoot children in doorways, a small well-dressed boy standing among them looking up at a broken roof. |
| `images/story-07-b.png` | The library: the boy standing before the old man's chair speaking earnestly, the old man's face closed and hard, the fire low. |

## 8장 · 지붕이 고쳐지다

| 파일명 | 장면 |
|---|---|
| `images/story-08-a.png` | The same village under repair: scaffolding, workmen on new roofs, fresh timber and stone, a small boy in the middle of it carrying a bucket of water to the men. |
| `images/story-08-b.png` | An estate office: a stunned land agent with his hat in his hands, the old earl at a desk giving an order he has never given before. |

## 9장 · 교회에서

| 파일명 | 장면 |
|---|---|
| `images/story-09-a.png` | An old village church: the earl walking up the aisle leaning on a boy's shoulder, the whole congregation turned to watch, sunlight through the windows. |
| `images/story-09-b.png` | Outside the church after the service: an old tenant with his hat off thanking the earl, the earl gruff and looking away, the boy beaming beside him. |

## 10장 · 낯선 여자

| 파일명 | 장면 |
|---|---|
| `images/story-10-a.png` | The library: an overdressed woman standing before the earl holding a paper out, a loud sullen child at her side, the earl half risen from his chair. |
| `images/story-10-b.png` | A cottage room: a mother and son sitting on the hearthrug, the boy asking a question, the mother holding both his hands. |

## 11장 · 뉴욕에서 온 사람들

| 파일명 | 장면 |
|---|---|
| `images/story-11-a.png` | A New York grocery: the grocer thrusting an English newspaper at a shoeshine boy who has half risen from his box in astonishment. |
| `images/story-11-b.png` | A ship's deck crossing the Atlantic: the big grocer in an ill-fitting travelling coat gripping the rail, the shoeshine boy beside him, grey water. |

## 12장 · 밝혀지다

| 파일명 | 장면 |
|---|---|
| `images/story-12-a.png` | An inn room: a door thrown open, a lawyer and several men in the doorway, and behind them a weather-beaten man from the west whom the woman inside has clearly recognised. |
| `images/story-12-b.png` | The library at night: the earl standing at a dark window with his back to the room, the lawyer waiting at the door with his hat in his hands. |

## 13장 · 성으로 오시오

| 파일명 | 장면 |
|---|---|
| `images/story-13-a.png` | A small cottage parlour: the tall old earl seated stiffly with both hands on his cane, a young widow across from him, a workbasket on the table between them, firelight. |
| `images/story-13-b.png` | The cottage doorway: the old man about to step out into the night, the young woman's hand on his arm, and he does not pull away. |

## 14장 · 여덟 번째 생일

| 파일명 | 장면 |
|---|---|
| `images/story-14-a.png` | A great garden party on castle lawns: marquees, long tables, village families in their best clothes, children running; on the steps the earl, the boy and his mother receiving them together. |
| `images/story-14-b.png` | The earl shaking hands with a large embarrassed American grocer in a brand-new suit, the boy between them delighted, guests looking on. |

## 15장 · 서재의 불빛

| 파일명 | 장면 |
|---|---|
| `images/story-15-a.png` | The library late at night: the old man in his chair and the boy sitting on the footstool leaning against his knee, the hound asleep between them, the fire burnt low. |
| `images/story-15-b.png` | The castle seen from the dark park outside: one library window still lit, the rest of the great house in shadow, stars above. |
