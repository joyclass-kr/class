# 제미나이 그림 프롬프트 — 토끼전

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

6장이고 장마다 그림이 3장씩, 여기에 표지와 마지막 장을 더해 모두 **20장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 18장 | 1.33 : 1 | **가로 4 : 세로 3** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.33 : 1 | **가로 4 : 세로 3** |

> **`end` 그림은 「읽고 나서」 쪽에 들어갑니다.** 쪽 위쪽에 가로로 얹히므로 비율은 아래 표대로면 됩니다.
> 다만 글 분량에 따라 높이가 조금씩 달라지니, **중요한 것은 한가운데에 두고 위아래 가장자리는 여유를 두세요.**

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolour, bold clean outlines, saturated but
slightly muted colours. Two worlds: the Dragon King's undersea palace - coral
pillars, mother-of-pearl roofs, everything shimmering rainbow as the current
passes, courtiers who are fish and shellfish and octopus dressed in Joseon court
robes and hats; and the land - a Korean pine mountain, grass meadows, chestnut
trees, a sandy shore. Animals are drawn as animals wearing human clothes only in
the sea court; the land animals wear nothing. Expressive faces, satirical
comedy played straight. No text or letters in the image.
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
The Dragon King of the South Sea: a great long-bearded dragon-faced king in a
gold and jade robe and a tall crown, seated on a coral throne. In the early
chapters he is visibly ill - thin, grey, hollow-eyed, wrapped in furs.
The court: an octopus prime minister in a scholar's robe with eight sleeves; a
shark general in armour; a flounder, a crab, a sea bream, all in official hats,
all edging backwards whenever volunteers are called for.
Jara, the terrapin: a modest middle-sized soft-shelled turtle who walks upright,
plain dark shell, a small official's hat perched on his head and a cloth bundle
on his back. Earnest, dogged, faintly sad. The most decent character in the book.
The rabbit: a lean sharp-eyed brown hare with very long ears and quick nervous
limbs. Vain, greedy, and extremely fast-thinking. His ears lie flat when he is
calculating.
The old terrapin mother: a small wrinkled turtle.
The painted portrait: a scroll with a comically wrong-looking rabbit painted on
it.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 자라 등에 탄 토끼가 바다 아래로 내려간다.

```
Vertical portrait composition. A column of blue-green sea from the bright
surface at the top down to a distant glowing palace at the bottom. In the middle
of the frame, a terrapin swims steadily downward with a lean brown rabbit
clinging to his shell, the rabbit's long ears streaming upward in the water, both
eyes squeezed shut. Above them, far up, the wobbling silver ceiling of the surface
and the dark shape of a pine-covered shore. Below them, far down, the rainbow
shimmer of a coral-and-pearl palace. Bubbles trailing. Beautiful and slightly
absurd.
```

## 본문 18장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — 수정궁과 병든 용왕

```
Wide 4:3 undersea scene. A vast palace of coral pillars and mother-of-pearl roofs
in green-blue water, everything shimmering with rainbow light as a current passes.
On a coral throne at the right, a long-bearded dragon-faced king slumps wrapped in
furs, thin and grey, one hand at his chest. Courtiers who are fish and shellfish
in Joseon court robes stand in ranks below. Drifting light, slow bubbles,
magnificence and sickness together.
```

### `story-01-b.webp` — 1장 — 늙은 의원이 토끼의 간을 말한다

```
Wide 4:3 undersea scene. Before the throne, an ancient bent fish-doctor in a grey
robe with a long white beard speaks with one finger raised, half smiling. The
king leans forward off his throne, gaunt face suddenly sharp with hope. Around
them the court exchanges glances. Green light, coral columns, a hush.
```

### `story-01-c.webp` — 1장 — 신하들이 서로 미룬다

```
Wide 4:3 undersea scene. The full court in ranks. Every courtier - octopus, shark,
crab, flounder - is looking sideways at someone else, pointing at a neighbour,
studying the floor, or shrinking behind the fish in front. Not one meets the
king's eye. On the throne the king glares down at them. Comic cowardice played
completely straight.
```

### `story-02-a.webp` — 2장 — 문어 승상이 핑계를 댄다

```
Wide 4:3 undersea scene. An octopus in an oversized scholar's robe spreads all
eight sleeved arms in a gesture of helpless regret, eyes closed, head tilted,
gesturing with two of them toward an armoured shark general beside him. The shark
general's face is pure alarm. Behind them the court watches. Rich robes, absurd
dignity.
```

### `story-02-b.webp` — 2장 — 용왕이 자리에서 일어선다

```
Wide 4:3 undersea scene. The king has forced himself up off the throne, one thin
trembling hand gripping the armrest, the other flung out toward his court, his
face terrible with anger and disappointment. The whole court has dropped to the
floor in a wave of prostration. Furs sliding off his shoulders. Shafts of cold
green light.
```

### `story-02-c.webp` — 2장 — 자라가 어머니께 절을 올린다

```
Wide 4:3 undersea scene, small and domestic. A modest little house of stacked
stones in the sand. A terrapin in a small official's hat kneels with his head
bowed low; an old wrinkled turtle rests one webbed hand on his shell, her eyes
closed. A packed bundle at the door. Soft dim water-light, seaweed swaying. Very
tender.
```

### `story-03-a.webp` — 3장 — 화공이 토끼 화상을 그린다

```
Wide 4:3 undersea scene. A court painter with brush and ink stone works on a
hanging scroll while courtiers crowd around calling out corrections - one
gesturing enormous ears, another miming buck teeth. The painted rabbit on the
scroll is comically wrong: too long, too round-eyed, absurd. Everyone very
serious. Green palace light.
```

### `story-03-b.webp` — 3장 — 자라가 뭍에 올라 산을 오른다

```
Wide 4:3 scene, land. A sandy shore at the bottom left, a green pine mountain
rising to the right. A small terrapin crawls determinedly up a steep dirt path
with a rolled scroll strapped to his shell, his little hat askew, leaving a long
drag-trail behind him. The path ahead is enormous. Bright hard sunlight, dry
grass, a very long way to go.
```

### `story-03-c.webp` — 3장 — 풀밭의 짐승들이 윗자리를 다툰다

```
Wide 4:3 scene, land. A broad grass meadow crowded with animals - deer, boar,
fox, badger, pheasant, tiger - all arguing at once, standing up on their hind legs,
gesturing, mouths open. In the bottom corner, ignored by everyone, a lean brown
rabbit calmly picks up a fallen chestnut and eats it. Bright green, comic energy,
one still figure in the middle of the noise.
```

### `story-04-a.webp` — 4장 — 자라가 토끼에게 다가간다

```
Wide 4:3 scene, land. A grassy slope. On the right a terrapin edges forward,
one webbed foot raised, trying to look harmless. On the left the rabbit has
already spun half around with his weight on his hind legs, ears swivelled
forward, one eye narrowed, ready to bolt. Tension and comedy. Afternoon light,
long grass.
```

### `story-04-b.webp` — 4장 — 수궁 자랑을 늘어놓는다

```
Wide 4:3 scene, land, with the sea visible far below. The terrapin gestures
grandly out toward the ocean with both arms, painting a picture in the air, eyes
half closed with rapture. Beside him the rabbit sits up on his haunches, ears
straight up, whiskers forward, eyes gone round and greedy. Behind them, drawn as
a faint dreamlike wash in the sky, a shimmering rainbow palace. Golden light.
```

### `story-04-c.webp` — 4장 — 물가에서 두 눈을 꼭 감는다

```
Wide 4:3 scene. A sandy shore at evening. The terrapin is already half into the
shallow water; the rabbit sits on his shell gripping the edge with both forepaws,
eyes squeezed shut, ears flat back, face a mask of second thoughts. Behind them
the pine mountain is going dark and a single crow flies over it. Long red light on
the water. A point of no return.
```

### `story-05-a.webp` — 5장 — 수궁에 닿아 눈을 뜬다

```
Wide 4:3 undersea scene. The rabbit, still on the terrapin's back, has opened his
eyes and is staring upward and around with his mouth hanging open at the coral
pillars and pearl roofs rising all around them, rainbow light rippling over
everything. The terrapin swims steadily on, not looking at him. Vast, glittering,
overwhelming.
```

### `story-05-b.webp` — 5장 — 용왕 앞에 끌려 나온다

```
Wide 4:3 undersea scene. The throne hall. The rabbit stands very small and alone
on the open floor, surrounded by a ring of court officials and armed shark
soldiers with spears. The king leans forward from the throne pointing down at
him, mouth open, ordering something. The terrapin stands to one side with his head
turned away. Cold green light, spears, absolute isolation.
```

### `story-05-c.webp` — 5장 — "제 간은 산속 바위틈에 있습니다" 하고 배를 내민다

```
Wide 4:3 undersea scene. The rabbit has recovered completely: he stands with his
chest out and his belly thrust forward, both forepaws spread wide in an
exaggerated invitation, chin up, eyes half closed with insolent confidence. The
king has frozen with one hand still raised, brow furrowed. Around them the whole
court is exchanging baffled looks. The comic peak of the book.
```

### `story-06-a.webp` — 6장 — 용왕이 토끼를 노려본다

```
Wide 4:3 undersea scene, close and tense. The gaunt king leans far forward off
his throne, staring straight down at the rabbit with narrowed eyes. The rabbit
looks back up at him without blinking, ears calmly at rest. Everyone else in the
hall is a blurred green shape behind them. A pure contest of nerve.
```

### `story-06-b.webp` — 6장 — 모래밭에 닿자마자 뛰어내린다

```
Wide 4:3 scene. The shore in daylight. The rabbit has leapt off the terrapin's
shell and landed on the sand, already scratching at the earth with one forepaw and
lifting his nose to smell the grass, his whole body electric with relief. Behind
him the terrapin sits in the shallows watching, small and still. Bright sun,
sparkling water, green mountain ahead.
```

### `story-06-c.webp` — 6장 — 자라가 홀로 물가에 남는다

```
Wide 4:3 scene. The empty shore at dusk. The terrapin sits alone at the water's
edge, seen from behind, his small hat in front of him on the sand, looking up at
the dark pine mountain where the rabbit has gone. The rolled scroll lies unrolled
and forgotten beside him. Long violet light, the tide coming in over his tracks.
Quiet and sad.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

토끼가 산속에서 귀를 눕힌다.

```
Wide 4:3 scene. A sunny mountain meadow. The lean brown rabbit sits among the
grass eating a chestnut, perfectly at ease - except that his ears are laid flat
back along his spine and one eye is turned watchfully toward the distant blue line
of the sea. Pine trees, wildflowers, bright safe daylight. Funny and knowing.
```
