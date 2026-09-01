# 제미나이 그림 프롬프트 — 백마의 기수

하나의 이야기를 열 장으로 나눠 담았고, 장마다 그림이 두 장씩 들어갑니다.
그림이 있는 펼침면은 오른쪽 쪽에 그림 한 장이 들어가고, 그림이 없는 펼침면은 양쪽 쪽에 글만 들어갑니다.
아래 프롬프트를 제미나이에 넣어 생성한 뒤 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보입니다.)

권장 크기: **가로 4 : 세로 3** 비율, PNG.
그림이 칸을 꽉 채워야 하니 가장자리에 흰 여백이나 테두리를 두지 마세요. 그림이 네 변 끝까지 닿아야 합니다.

**단 표지(`cover.webp`)만 예외 — 세로 2 : 3 비율입니다.**

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolor, bold clean outlines, realistic
proportions with expressive faces; the North Frisian coast of Germany around
1800 — reclaimed farmland lying below sea level, long grass-covered earthen
dikes running to the horizon, tidal mudflats, big brick farmhouses with reed
roofs, windmills, and an enormous grey sky over everything.
Cold northern light, wind in every scene. No blood or wounds shown.
No text or letters in the image.
Villains and unkind characters are drawn as ordinary, good-looking people -
never grotesque, never ugly, no mean squinting eyes, no warts, no snarling
teeth, no rotten teeth, no leering. What is wrong with them shows only in what
they are doing and in their posture, never in a deformed or repulsive face.
A cruel character may be handsome; a kind one may be plain. Never use a scar,
a missing limb, a burn, fatness, thinness, age or skin as a mark of evil.
Draw the moment in motion, not a posed portrait: catch people mid-stride,
mid-swing, mid-turn, mid-shout, cloth and hair and dust still moving. Faces
are big and expressive. Pick the most interesting instant in the scene and
stage it so a child wants to look at it for a while.
```

**하늘을 크게 잡아 주세요.** 이 책은 배경이 곧 줄거리입니다. 화면의 삼분의 이 이상을
하늘과 바다에 주고, 사람과 집은 그 아래 낮게 깔아 주세요. 사람이 얼마나 작은지가 보여야 합니다.

**제방의 단면을 눈에 보이게 그려 주세요.** 2장과 5장에서 옛 제방은 바다 쪽 면이
벽처럼 가파르고, 하우케의 새 제방은 길게 누워 있습니다. 이 차이가 이 책의 핵심입니다.

**백마를 유령처럼 그리지 마세요.** 처음에는 갈비뼈가 드러난 말라빠진 말이고,
나중에는 아주 훌륭한 흰 말입니다. 소문이 그것을 유령으로 만든 것이지 그 말이 유령이 아닙니다.
1장 표지 장면에서만 비와 어둠 때문에 흐릿하게 보이면 됩니다.

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Hauke Haien: a lean, tall man; a boy of about twelve in chapter 2, eighteen
in chapter 3, and in his forties by chapter 7 — greying, thinner, tired.
A hard closed face, but not unkind. Plain dark coat and boots.
Elke: his wife, a capable woman with a straight back and steady eyes; the one
person he actually listens to.
Wienke: their daughter, a quiet small girl of about five or six.
Ole Peters: a broad well-fed farmer with a loud voice.
The schoolmaster: an old man in an inn corner with a pipe, telling the story.
The traveller: a young man in a wet riding cloak.
The white horse: at first a starved animal with ribs showing and patchy coat;
later a magnificent white horse — always a real horse, never a phantom.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a grass dike running away to the horizon under a huge black storm sky, the sea pushed right up to the dike's shoulder on one side and farmland far below on the other; a single rider on a white horse small on the crest, seen from behind through rain. The picture must bleed to all four edges: no white margin, no white border, no frame, no matting around the artwork. |
| `images/end.webp` | The same dike a century later on a calm bright day, its seaward face long and gently sloped, sheep grazing on it, the sea flat beyond. |

## 1장 · 제방 위의 그림자

| 파일명 | 장면 |
|---|---|
| `images/story-01-a.webp` | Night on a dike in driving rain: a traveller on horseback halted, and ahead of him another rider on a pale horse going away along the crest, indistinct in the weather. |
| `images/story-01-b.webp` | A low-beamed inn parlour with a peat fire, farmers with mugs, and an old schoolmaster in the corner beginning to speak; every face turned to him. |

## 2장 · 제방 감독관의 아들이 아닌 아이

| 파일명 | 장면 |
|---|---|
| `images/story-02-a.webp` | A boy of twelve lying flat on the crest of a dike watching waves strike its steep seaward face, spray going straight up the wall of earth. |
| `images/story-02-b.webp` | A cross-section drawing scratched into the sand with a stick: on one side a steep dike face with an arrow hitting it square, on the other a long gentle slope with the arrow sliding up it; a boy crouched over it, his father standing behind. |

## 3장 · 고양이와 겨울

| 파일명 | 장면 |
|---|---|
| `images/story-03-a.webp` | A farmhouse office in winter: ledgers open on a table by lamplight, a young man and a young woman on either side of it, both working. |
| `images/story-03-b.webp` | A frozen dike at dusk with a young man standing alone, a dead sea bird in his hand and an old cat backing away in the snow. |

## 4장 · 감독관이 되다

| 파일명 | 장면 |
|---|---|
| `images/story-04-a.webp` | A crowded farm hall after a funeral: a young woman standing and speaking to the assembled farmers, a young man at the edge of the room. |
| `images/story-04-b.webp` | A man walking the length of a dike with a measuring rod and a notebook, alone, farmers watching him from a distance and talking to each other. |

## 5장 · 새 제방

| 파일명 | 장면 |
|---|---|
| `images/story-05-a.webp` | A huge earthworks in progress on the mudflats: dozens of men with spades and barrows, ox carts of clay, a long new dike taking shape with a very gentle seaward slope. |
| `images/story-05-b.webp` | A pit dug in the new dike with a dog on a rope beside it, workmen standing round; a man striding in and taking the rope, the dog under his arm. |

## 6장 · 백마

| 파일명 | 장면 |
|---|---|
| `images/story-06-a.webp` | A muddy road: a shabby drover holding the halter of a starved white horse, ribs showing, and a man counting coins into his hand while onlookers laugh. |
| `images/story-06-b.webp` | Months later: the same horse transformed, glossy and powerful, galloping along a dike crest at dusk with a man on its back; two farmers below watching and talking behind their hands. |

## 7장 · 이음매

| 파일명 | 장면 |
|---|---|
| `images/story-07-a.webp` | Close to the ground where a new dike meets an old one: the joint visibly softer and lower, a small channel of water working its way in, a man kneeling with his hand in it. |
| `images/story-07-b.webp` | A meeting of farmers in a hall, one broad man speaking and pointing, and at the front a greying man standing with nothing to say. |

## 8장 · 그 밤

| 파일명 | 장면 |
|---|---|
| `images/story-08-a.webp` | Night on the dike in a north-west gale: a line of men with lanterns, straw and clay being piled at one spot, the sea already halfway up the slope. |
| `images/story-08-b.webp` | Men digging into the crest of the new dike by lantern light, and a rider bearing down on them out of the dark with his arm out. |

## 9장 · 물속으로

| 파일명 | 장면 |
|---|---|
| `images/story-09-a.webp` | A flooded road at night: a tilting carriage with water round its wheels, a woman and a child in it, and a rider stopped a little way off. |
| `images/story-09-b.webp` | Dawn after the flood, seen from high on the new dike: the old dike broken open in one place with water still pouring through, half the farmland a sheet of grey water, and the new dike whole from end to end. |

## 10장 · 그 뒤에 남은 것

| 파일명 | 장면 |
|---|---|
| `images/story-10-a.webp` | The inn parlour again, the fire burnt low, the old schoolmaster finishing, the traveller with his cup untouched. |
| `images/story-10-b.webp` | A modern-looking dike in daylight with a gently sloping seaward face, a small boy walking along the crest with his hands in his pockets. |
