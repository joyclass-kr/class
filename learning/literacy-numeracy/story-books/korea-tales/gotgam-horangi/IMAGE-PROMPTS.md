# 제미나이 그림 프롬프트 — 곶감과 호랑이

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **열 개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **열두 장**입니다.

프롬프트를 제미나이에 그대로 넣어 생성한 뒤, 파일명을 정확히 맞춰서 `images/` 폴더에 저장하면 자동으로 책에 나타납니다. (그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

실제 화면에서 그림칸을 재 본 값이에요. 비율이 맞지 않으면 남는 쪽이 잘려나갑니다.

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데, 눈에 띄지 않는 정도라 그대로 쓰면 됩니다. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요. 인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스러워요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean rural village of the Joseon era: thatched-roof
cottages, low stone walls, straw-roofed barns, pine trees, rolling hills, dirt
paths, rice paddies. Characters wear hanbok. Night scenes lit by warm lantern
glow and cool blue moonlight. Big expressive faces, exaggerated comic gestures,
lively motion. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The tiger: a big orange-and-black striped Korean folk-painting tiger, round face,
comically expressive - hungry and sly at first, then wide-eyed and utterly
terrified for most of the story. Never menacing for long; he is the funny one.
The cow thief: a wiry grown man in dark brown clothes with a cloth wrapped over
the lower half of his face, sneaky posture, carrying a coiled rope. The mother:
a young woman in a pale yellow and white hanbok with her hair in a bun. The baby:
a chubby infant in a red and green jeogori. Villagers wear muted straw and indigo
hanbok.
```

---

## 표지 — `cover.webp` (세로 2:3)

```
Vertical portrait composition. A moonlit Korean village at night seen from a low
hill: thatched roofs, a straw-roofed barn, a warm yellow glow from one paper
window. In the foreground at the bottom, a big striped tiger crouches behind a
stone wall, peeking toward the lit window with wide nervous eyes, one paw raised.
A single dried persimmon sits on the wall beside him, glowing faintly. Playful
and mysterious.
```

## 본문 열 장 (모두 가로 2:1)

### `01-hungry.webp` — 굶주린 호랑이가 산을 내려온다

```
Wide panoramic night scene. A deep pine forest on a mountainside on the left, a
sleeping village with thatched roofs far away on the right. A big striped tiger
slouches down a winding mountain path in the middle, head hanging, ribs showing
slightly, tongue out, one paw on his empty belly, an exaggerated grumpy-hungry
expression. Cool blue moonlight, long shadows.
```

### `02-crying.webp` — 아기 울음소리를 엿듣는 호랑이

```
Wide night scene outside a thatched-roof cottage. On the right, a paper-screen
window glows warm yellow, the silhouettes of a mother and a crying baby visible
inside. On the left, a big striped tiger presses one ear flat against the wooden
door, eyes squeezed shut in concentration, a huge drop of drool hanging from his
mouth, front paws braced on the wall. Comic sneaking pose.
```

### `03-tiger-came.webp` — 엄마가 호랑이 온다고 해도 아기는 더 크게 운다

```
Wide cutaway view of a Korean room, seen as if the front wall were removed. On
the left inside, a young mother in pale yellow hanbok kneels holding a chubby
baby who is bawling at full volume, mouth enormous, tears spraying, tiny fists
clenched. On the right outside the door, the tiger has pulled back, ears flat,
face twisted in offended disbelief, one paw pointing at himself. Warm lamplight
inside, blue night outside.
```

### `04-persimmon.webp` — 곶감이라는 말에 아기가 뚝 그친다

```
Wide cutaway view of the same Korean room. On the left, the mother holds up a
single dried persimmon between her fingers; the baby has stopped mid-sob, mouth
closed, eyes huge and fixed on it, one tear still on his cheek, arms reaching.
On the right outside the door, the tiger is frozen stiff, eyes bulging, jaw
dropped, entirely rigid with shock. Strong comic contrast between the two halves.
```

### `05-scared.webp` — 곶감이 자기보다 무섭다고 믿는 호랑이

```
Wide night scene outside the cottage. The tiger dominates the left, backing away
on trembling legs drawn with shaky motion lines, tail tucked between his legs,
both front paws raised in surrender, face pure terror, sweat drops flying. Above
his head, a small thought bubble shows a single dried persimmon drawn as a huge
glowing monster with fangs. The lit cottage sits small on the right. Very comic.
```

### `06-thief.webp` — 담을 넘는 소도둑

```
Wide night scene of the same farmyard. On the left, a wiry man in dark brown
clothes with a cloth over the lower half of his face swings a leg over a low
stone wall, a coiled rope on his shoulder, grinning slyly, tiptoeing posture. On
the right, the dark open mouth of a straw-roofed barn, with just two glowing eyes
faintly visible deep inside. Blue moonlight, long shadows, the two characters
unaware of each other.
```

### `07-mount.webp` — 소도둑이 호랑이 등에 올라탄다

```
Wide dark interior of a straw-roofed Korean barn, lit only by a thin shaft of
moonlight through the doorway. On the left, the thief has just swung himself onto
the back of a large striped animal, one hand on its neck, still grinning,
completely unaware. On the right, the tiger's head fills the frame in close-up,
eyes gigantic and white with terror, mouth open in a silent scream, ears pinned
back. Comic horror.
```

### `08-running.webp` — 미친 듯이 달리는 호랑이

```
Wide panoramic night landscape, extreme motion. The tiger tears across rice
paddies from right to left in a full sprint, all four legs stretched out, eyes
squeezed shut, drawn with heavy speed lines and a dust cloud behind him. The
thief clings to his back with both arms, hair and clothes blown straight back,
face bewildered and yelling, one hand reaching forward. Moonlit fields, a stream
splashing beneath them.
```

### `09-branch.webp` — 호랑이 무늬를 알아본 소도둑

```
Wide landscape at dawn, the eastern sky turning pale pink on the right. Mid-run,
the thief looks down at the striped orange fur beneath him, his face frozen in
open-mouthed horror, the cloth slipping from his face. He is reaching up with
both hands toward a thick tree branch passing overhead on the left. Strong motion
lines, the tiger still charging forward oblivious.
```

### `10-flee.webp` — 서로 반대쪽으로 달아나는 둘

```
Wide dawn landscape split in two. On the left, the tiger bolts away toward the
pine-covered mountains, seen from behind, tail straight out, a relieved sweat
drop flying, kicking up dust. On the right, the thief drops from a tree branch
and runs the opposite way toward the fields, arms flailing, rope forgotten on the
ground. A wide empty gap between them in the middle. Pink and gold morning sky,
funny and energetic.
```

## 마지막 — `end.webp` (가로 2:1)

```
A quiet Korean farmyard in the early morning, no people. A wooden tray of dried
persimmons sits on a low stone wall in the warm sunlight, a straw rope of them
hanging from the eaves above. Green hills and a thatched roof behind. Peaceful
and warm.
```
