# 제미나이 그림 프롬프트 — 나무꾼과 호랑이 형님

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **12개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **14장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 마지막 「끝」 쪽 한 자리에만 쓰입니다.** 가로로 넓은 칸(1.7 : 1)입니다.
> 「읽고 나서」 쪽에는 그림이 들어가지 않습니다 — 두 칸 다 글입니다.
> 칸에 꽉 차게 잘라 넣는 방식이니, 아래 비율표대로 만들어 주세요.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean mountain country of the Joseon era: deep pine and
oak forest, rocky ravines, mist between ridges, a lone thatched cottage at the
foot of the mountain with a low stone wall and a swept dirt yard. Characters wear
hanbok. Night scenes lit by warm lantern glow and cool blue moonlight. Big
expressive faces, exaggerated comic gestures, lively motion. No text or letters
in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The woodcutter: a thin young man in a patched pale grey hanbok with sleeves tied
back, a cloth headband, straw sandals, an A-frame carrying rack, an axe at his
belt. Quick-witted face; terrified at first, then increasingly guilty and
tender-hearted as the story goes on.
The tiger: an enormous orange-and-black striped Korean folk-painting tiger with a
broad round face and huge round eyes. He is never truly menacing after the first
scene - he is the most soft-hearted character in the book, prone to enormous
sentimental tears. In later pictures his fur is greying at the muzzle and brows,
and finally he iswhite-whiskered and old. Draw him with great dignity at the end.
The old mother: a small stooped woman in a plain white and pale-blue hanbok, grey
hair in a low bun, a deeply gentle face.
```

---

## 표지 — `cover.png` (세로 2:3)

세로로 긴 표지. 호랑이와 나무꾼이 산길에 마주 서 있다.

```
Vertical portrait composition. A misty mountain ravine seen from the path. Filling
the upper two-thirds of the frame, an enormous orange-and-black striped tiger sits
upright on the path like a listening elder, head tilted, huge round eyes soft and
brimming. At the bottom of the frame, small, a thin young woodcutter with an
A-frame rack on his back bows deeply toward the tiger with both hands together.
Tall pines and drifting mist on both sides, pale gold light coming through the
trees from behind the tiger. Tender and slightly comic, not frightening.
```

## 본문 12장 (모두 가로 2:1)

### `01-woodcutter.png` — 나무꾼이 깊은 골짜기까지 들어간다

```
Wide panoramic scene. Deep mountain forest in the late afternoon. On the left a
thin young woodcutter with an empty A-frame rack climbs a narrow path between
huge pine trunks, wiping his brow, looking up at the ridge. On the right the
ravine opens dark and quiet, mist pooling between the trees. Slanting gold light
through the branches. Very still.
```

### `02-tiger.png` — 덤불이 갈라지고 커다란 호랑이가 나온다

```
Wide panoramic scene. On the right an enormous striped tiger bursts out through a
wall of undergrowth, mouth open in a roar, one paw raised high, leaves flying. On
the left the woodcutter has dropped his axe mid-air and frozen stiff as a board,
eyes gone to white circles, hair standing straight up, knees knocking together.
Comic terror rather than horror. Green forest gloom.
```

### `03-brother.png` — "혀, 형님!"

```
Wide panoramic scene. Same forest. On the left the woodcutter has flung himself
face down on the ground with both arms stretched out in a deep bow, one eye
peeking upward. On the right the tiger has stopped mid-pounce, front paw still
lifted in the air, his whole body frozen, head tilted, one enormous eyebrow
raised in bewilderment. Motion lines stopping dead. Very funny.
```

### `04-story.png` — 나무꾼이 눈물을 짜내며 이야기를 지어낸다

```
Wide panoramic scene. On the left the woodcutter kneels, one hand over his heart
and the other wiping an obviously forced tear, face contorted into an exaggerated
mask of grief, while sneaking a sideways look. On the right the tiger sits back on
his haunches, both front paws on the ground, leaning in, listening with his whole
face. Dappled forest light.
```

### `05-tears.png` — 호랑이가 큰 눈에서 눈물을 뚝뚝 흘린다

```
Wide panoramic scene. The tiger fills the right two-thirds of the frame, sitting
up with his head thrown back, enormous tears streaming from both eyes in comic
streams and splashing on the ground, one paw pressed to his chest. On the left the
small woodcutter stands with his mouth slightly open, taken aback, one hand half
raised as if to pat the tiger and not quite daring. Warm late light through mist.
```

### `06-farewell.png` — 호랑이가 지게를 지고 산 밑까지 데려다준다

```
Wide panoramic scene. Dusk on a mountain path going downhill to the right. The
enormous tiger walks in front with the woodcutter's A-frame rack strapped
absurdly onto his striped back, piled high with firewood, padding along with
great dignity. Behind him on the left the woodcutter trots to keep up, hands
empty, glancing back up the mountain, legs still wobbly. Long violet shadows,
first stars.
```

### `07-gift.png` — 아침마다 마당에 짐승과 산나물이 놓여 있다

```
Wide panoramic scene. Early morning in the cottage yard, frost in the air. On the
right a large wild boar lies neatly laid on a mat in the swept dirt yard, with a
bundle of mountain greens and herbs beside it. On the left the woodcutter stands
in the open doorway in his undershirt, hair sticking up, staring with both hands
on his head. A single line of huge pawprints leads away toward the mountain.
Pale pink dawn light.
```

### `08-mother.png` — 어머니가 어두운 산 쪽을 오래 바라본다

```
Wide panoramic scene. Night. On the left the small old mother stands alone in the
middle of the yard, seen mostly from behind, her hands folded in front of her,
facing the black mountain that rises on the right under a scattering of stars. A
single paper window glows warm yellow behind her. The woodcutter watches from the
doorway, hesitant. Deep blue night, very quiet, moving.
```

### `09-years.png` — 어머니가 밤마다 마당에 밥 한 그릇을 내놓는다

```
Wide panoramic scene. Moonlit yard. On the left the old mother, now more stooped,
sets a single brass bowl of rice on a flat stone by the gate, both hands careful,
her lips moving. On the right, just at the edge of the pines beyond the wall, two
round golden eyes and the faint striped shape of the tiger wait in the dark,
watching her. Silver moonlight, warm little glow from the bowl. Tender.
```

### `10-guilt.png` — 나무꾼은 밥이 목에 넘어가지 않는다

```
Wide panoramic scene. Inside the lamplit room at night. On the right the
woodcutter, now a grown man, sits at a low table with a full rice bowl untouched
in front of him, chopsticks resting across it, staring down at nothing, one hand
pressed to his forehead. On the left, through the open door, the dark shape of the
mountain and a sliver of moon. Warm orange lamp against cold blue night. Heavy
and quiet.
```

### `11-confess.png` — 나무꾼이 무릎을 꿇고 사실을 털어놓는다

```
Wide panoramic scene. The mountain ravine again, autumn, leaves on the ground. On
the left the woodcutter kneels on both knees with his head bowed almost to the
earth, hands flat on the ground before him. On the right the tiger stands facing
him, much older now - white around the muzzle and brows, fur duller, one shoulder
bonier - listening in total stillness, eyes half closed. Cold clear air, low
amber light, absolute silence.
```

### `12-know.png` — "진작 알고 있었다." 호랑이가 산속으로 걸어 들어간다

```
Wide panoramic scene. The same ravine a moment later. On the right the old white-
muzzled tiger walks away from the viewer up into the misty pines, seen from
behind, his tail low, head high, unhurried. On the left the woodcutter has looked
up from his knees, face lifted, one hand half reaching after him, tears on his
cheeks. Shafts of pale gold light between the trunks, mist closing behind the
tiger. Quiet, warm, a little heartbreaking.
```

---

## 마지막 장 — `end.png` (가로 2:1)

나무꾼이 산을 올려다본다.

```
Wide scene at dawn. The cottage yard from behind: the grown woodcutter stands at
the low stone wall with a brass bowl of rice in his hands, looking up at the
misty green mountain that fills the right side of the frame. First light on the
ridge. Empty path, drifting mist. Peaceful and full of feeling.
```
