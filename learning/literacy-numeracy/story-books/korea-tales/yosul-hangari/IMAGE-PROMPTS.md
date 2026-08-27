# 제미나이 그림 프롬프트 — 요술 항아리

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 10장 (`01`~`10`) | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean village of the Joseon era: thatched-roof and
tiled-roof houses, earthen walls, rows of large brown onggi jars on a raised
platform, ploughed fields, persimmon trees. Warm earth-tone palette with clay
brown, straw yellow and grass green. Big expressive faces, exaggerated comic
gestures. No text or letters in the image.
Villains and unkind characters are drawn as ordinary, nice-looking people -
never grotesque, never ugly, no mean squinting eyes, no warts, no snarling
teeth. What is wrong with them shows only in what they are doing and in their
posture, never in a deformed or repulsive face. A cruel character may be
handsome; a kind one may be plain.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
The farmer: a lean man in his forties in patched off-white work hanbok with the
trousers tied at the ankles, a towel around his head, sun-browned honest face.
His wife: a cheerful woman in a faded blue and white hanbok with her hair in a
bun and sleeves tied back. The rich man: a plump man in a fine dark blue silk
durumagi and a black horsehair hat, thin moustache, greedy narrowed eyes and a
permanently smug expression. The old father: a small round-faced elderly man with
a white beard and topknot, plain grey hanbok, mild and slightly confused - drawn
identically every time he multiplies. The jar: a large round dark-brown Korean
onggi jar, wide-mouthed, waist-high.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A single large round dark-brown Korean onggi jar
standing alone in the middle of a ploughed field at sunset, earth heaped around
its base where it was just dug out. A stream of copper coins arcs up out of its
open mouth and scatters into the air, catching the golden light. Distant
thatched roofs and hills at the bottom. Warm and magical.
```

## 본문 열 장 (모두 가로 2:1)

### `01-dig.webp` — 밭에서 항아리를 파내다

```
Wide scene in a small ploughed field in spring. On the right, a farmer in patched
work hanbok kneels in the freshly turned soil, hoe set aside, brushing dirt off
the shoulder of a large brown onggi jar half buried in the ground, eyebrows up in
surprise. On the left, low green hills and a few thatched roofs. Warm morning
light, dark rich earth.
```

### `02-hoe.webp` — 호미가 두 개

```
Wide scene in a modest Korean house yard. In the centre, the jar sits on the
ground. The farmer holds one hoe in his right hand while staring down into the
jar where a second identical hoe lies at the bottom, his mouth open and eyes wide
in total bewilderment, free hand scratching his head. Simple wooden veranda and
earthen wall behind. Comic.
```

### `03-coin.webp` — 끝없이 나오는 엽전

```
Wide night scene inside a small Korean room lit by an oil lamp. The jar sits in
the middle. The wife reaches in with both hands while copper coins spill over the
rim and pile up across the floor in a growing heap. The farmer sits back on his
heels laughing with his head thrown back, coins in his lap. Warm lamplight,
joyful chaos.
```

### `04-rich.webp` — 몰라보게 달라진 농부의 집

```
Wide village scene by day. On the right, the farmer's house now has a handsome
tiled roof, a full storehouse and two oxen in the yard; the farmer and his wife
stand smiling in fine clean hanbok. On the left, two village women on the path
lean their heads together whispering behind their hands, glancing over. Bright
sunny day, gossip in the air.
```

### `05-seize.webp` — 항아리를 빼앗아 가는 부자

```
Wide scene in the farmer's yard. On the right, the plump rich man in dark blue
silk clutches the large jar against his chest with both arms, already striding
away, chin up and smug. On the left, the farmer and his wife reach after him,
mouths open in protest, hands out. Two of the rich man's servants block their
way. Dust kicked up, comic outrage.
```

### `06-gold.webp` — 금붙이를 퍼내는 부자

```
Wide scene inside a fine Korean room with the paper door shut tight. The rich man
kneels over the jar in the centre, both arms plunged inside, pulling out fistfuls
of gold rings and ingots, face split by an enormous greedy grin, gold heaped high
around him and spilling toward both edges of the frame. Lamplight, warm gold
glow.
```

### `07-father.webp` — 항아리에 빠지는 아버지

```
Wide scene in the same room. On the right, the rich man spins around with one arm
raised, shouting, face startled. On the left, the small old father is tipping
head-first over the rim of the jar, feet in the air, hat flying off, arms
windmilling. Exaggerated comic motion lines. Gold scattered on the floor between
them.
```

### `08-two.webp` — 아버지가 둘

```
Wide scene in the same room. On the left, the rich man has just hauled one old
father out and sits him on the floor, still holding his arm. On the right, a
second identical old father is climbing out of the jar by himself, one leg over
the rim, waving cheerfully. The rich man looks back and forth between the two,
face frozen in horror. Perfect comic timing.
```

### `09-many.webp` — 마당 가득한 아버지들

```
Wide scene in the courtyard of the rich man's house. Dozens of identical small
old fathers in grey hanbok fill the yard from edge to edge, sitting, standing,
waving, all with the same mild face, all with mouths open calling out. In the
centre, the rich man clutches his own head with both hands, mouth open in a
howl. Bright daylight, overwhelming and very funny.
```

### `10-ruined.webp` — 텅 빈 곳간

```
Wide scene. On the left, an empty storehouse with its doors thrown open, bare
shelves, one last rice sack being carried out. In the middle, the rich man in a
plain worn hanbok stirs an enormous cauldron, sweating, surrounded by a queue of
identical old fathers holding bowls. On the right, villagers peer over the wall,
doubled over laughing. Sunny and comic.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet Korean village yard at sunset, no people. A row of ordinary brown onggi
jars sits on a raised stone platform beside an earthen wall, persimmon branches
above, warm orange light across the ground. Ordinary and peaceful.
```
