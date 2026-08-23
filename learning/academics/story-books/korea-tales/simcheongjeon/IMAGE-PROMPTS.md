# 제미나이 그림 프롬프트 — 효녀 심청

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


**소설 틀**이에요. 그림이 있는 펼침면은 오른쪽 쪽 **위쪽**에 그림이 가로로 꽉 차게 들어가고,
그 아래 남는 자리를 글이 채웁니다. 그림이 쪽을 통째로 먹지 않아요.

7장이고 장마다 그림이 3장씩, 여기에 표지와 마지막 장을 더해 모두 **23장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

## 비율

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 21장 | 1.33 : 1 | **가로 4 : 세로 3** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.png` | 1.33 : 1 | **가로 4 : 세로 3** |

표지 칸은 책을 펼쳤을 때 왼쪽 반쪽을 통째로 채우는 세로 칸이에요. 가로 그림을 넣으면 양옆이 절반 가까이 잘려 나갑니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolour, bold clean outlines, saturated but
slightly muted colours, realistic human proportions with expressive faces.
Setting is Joseon-era Korea - a poor seaside village of thatched cottages in
Hwanghae province, mountain temples, a merchant sailing ship, the open sea, and
finally a royal palace. Everyone wears period hanbok. Strong light and shadow,
lantern and candlelight at night; underwater scenes lit with cool green-blue
radiance. Restrained and serious mood. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Sim Cheong: as a small child, a thin barefoot girl in a patched pale hanbok
carrying a gourd bowl too big for her; at fifteen, a slight grave-faced girl with
a long braid in a worn white and indigo hanbok; at the end, a young queen in
formal red and gold court robes with a high coiffure, but the same steady face.
Blind Sim (her father, Sim Hakgyu): a thin middle-aged blind man in a shabby
white hanbok, eyes closed or clouded, always feeling ahead with a stick or an
outstretched hand. His face is gentle, anxious, easily ashamed.
Lady Jang: a dignified older woman in fine deep-blue silk hanbok, kind and
straight-backed.
The monk: a shaven-headed monk in grey robes with a straw travelling hat.
The sailors: weathered men in short jackets and headbands, rough but not cruel;
their leader is a big bearded man who cannot meet Sim Cheong's eyes.
The Dragon King's realm: not a palace of monsters - a vast calm green-blue space
with drifting light, jade pillars, slow shoals of fish, and gentle robed figures.
Lady Gwak (the dead mother): a serene woman in flowing white, faintly luminous.
The king: a grave youngish man in a dragon-embroidered robe.
```

---

## 표지 — `cover.png` (세로 2:3)

세로로 긴 표지. 인당수 물속에서 피어오르는 연꽃.

```
Vertical portrait composition. Deep sea water filling the frame, graded from dark
blue-green at the top to luminous pale green at the bottom. In the lower half, a
single enormous pink lotus flower opens in the water, glowing softly from within,
and inside its cupped petals a young girl sits with her eyes closed and her hands
folded, perfectly at peace, her long hair drifting. Slow bubbles and shafts of
light rise past her toward the distant surface far above, where the underside of
a small ship is a tiny dark shape. Serene and luminous, not frightening. No sense
of drowning.
```

## 본문 21장 (모두 가로 4:3)

### `story-01-a.png` — 1장 — 앞 못 보는 아버지가 갓난아기를 안고 젖동냥을 나선다

```
Wide 4:3 scene. A poor village lane in early morning. A thin blind man in a shabby
white hanbok stands at a stranger's gate with a swaddled newborn held awkwardly
against his chest in one arm, the other hand feeling for the gatepost, his face
turned slightly up and away as blind people do. A woman in the doorway is already
reaching out to take the baby. Frost on the thatch, pale winter light, neighbours
looking on from further down the lane.
```

### `story-01-b.png` — 1장 — 어린 심청이 바가지를 들고 밥을 얻으러 다닌다

```
Wide 4:3 scene. A village path in autumn. A very small barefoot girl in a patched
hanbok walks along holding a gourd bowl with both arms, the bowl almost as wide as
she is, her face solemn and businesslike. At a gate on the right a farm wife bends
to scrape an extra spoonful into the bowl, her mouth turned down with pity. Fallen
leaves, low golden light, a long lane behind her.
```

### `story-01-c.png` — 1장 — 장 승상 부인이 심청의 손을 잡는다

```
Wide 4:3 scene. A fine room with polished floors and a folding screen. A dignified
older woman in deep-blue silk sits and holds both hands of a young girl kneeling
before her, leaning forward to look into her face, her own eyes shining. Sewing
work is folded neatly on the floor beside them. Warm afternoon light through paper
windows, quiet and tender.
```

### `story-02-a.png` — 2장 — 심 봉사가 개천에 빠지고 스님이 건져 낸다

```
Wide 4:3 scene. Winter dusk beside a frozen stream below a footpath. A grey-robed
monk in a straw hat is hauling a soaked blind man up out of the water by both
arms, bracing his feet on the icy bank. The blind man's stick floats away
downstream. Bare willows, blue cold light, breath steaming.
```

### `story-02-b.png` — 2장 — "공양미 삼백 석"이라는 말

```
Wide 4:3 scene. Inside a small dark room. The blind man sits by a low fire wrapped
in a dry quilt, his mouth open in the middle of speaking, one hand raised as if
already regretting the words. Across from him the monk has paused with his hands
together, head tilted, listening carefully. A single guttering lamp; huge shadows
on the paper walls. Foreboding.
```

### `story-02-c.png` — 2장 — 심청이 뒤뜰에서 정화수를 떠 놓고 빈다

```
Wide 4:3 scene. A back yard at night under a bright moon. A girl of fifteen kneels
on a straw mat before a low earthenware jar lid holding a single bowl of clear
water, her hands pressed together and raised, head bowed, eyes closed. Bare
persimmon branches above, frost on the ground, deep blue and silver. Very still.
```

### `story-03-a.png` — 3장 — 마을 어귀에 붙은 방을 보는 뱃사람들

```
Wide 4:3 scene. A village entrance with an old zelkova tree. Three or four
weathered sailors in short jackets and headbands are pasting up a notice on a
board, one holding the paste pot. A little apart, a girl in a worn hanbok has
stopped on the path with a bundle on her head and is watching them, her face
carefully blank. Bright hard daylight, the sea a thin blue line beyond the roofs.
```

### `story-03-b.png` — 3장 — "낭자, 이건 장난이 아니오"

```
Wide 4:3 scene. On the shore beside a beached boat. A big bearded sailor has
crouched down on one knee to bring his face level with the girl's, both hands
raised in protest, his expression appalled. The girl stands straight with her
hands folded in front of her, meeting his eyes without flinching. The other
sailors have gone silent behind him, caps in hand. Grey sea, wind, gulls.
```

### `story-03-c.png` — 3장 — 잠든 아버지 곁에서 밤을 새운다

```
Wide 4:3 scene. A tiny room at night. The blind father lies asleep on the floor
under a thin quilt. Beside him his daughter sits awake with her legs folded,
holding his hand in both of hers, looking down at his face. The oil lamp has burnt
low. Everything is warm brown and gold, and utterly quiet. Her face shows no tears
- only attention.
```

### `story-04-a.png` — 4장 — 아침상을 차려 놓고 옷을 갈아입는다

```
Wide 4:3 scene. Dawn in the small room. A neatly set breakfast tray sits on the
floor with a bowl of rice and a bowl of soup covered with a cloth. The girl stands
at the side tying the sash of a clean jacket, half turned toward the sleeping
figure of her father, her face composed. Cold blue-grey first light through the
paper door. Everything tidied and folded.
```

### `story-04-b.png` — 4장 — 배가 인당수에 이른다

```
Wide 4:3 scene. A wooden merchant ship on a heaving grey-green sea, sails
half-furled, seen from slightly above and to one side. Ahead of the bow the water
turns in a wide dark whirl. Sailors cling to the rail, some kneeling. A small
white figure stands alone at the bow. Enormous sky, low cloud, spray. Awe rather
than horror.
```

### `story-04-c.png` — 4장 — 뱃전에 엎드려 통곡하는 뱃사람들

```
Wide 4:3 scene. The ship's deck immediately after. The rail is empty; a discarded
outer jacket lies folded on the boards. Every sailor has thrown himself down on
the deck, faces hidden, shoulders shaking - the bearded leader gripping the rail
with his forehead against his hands. The sea beyond is already smooth. No figure
in the water. Grey light, terrible quiet.
```

### `story-05-a.png` — 5장 — 물속으로 한없이 가라앉는데 숨이 막히지 않는다

```
Wide 4:3 underwater scene. A girl in white drifts slowly downward through
luminous green-blue water, eyes open in wonder, hair and skirts floating around
her, her hands loose at her sides. Shafts of pale light come down from the distant
surface; shoals of small silver fish curve past her. Utterly calm and beautiful,
no struggle, no fear.
```

### `story-05-b.png` — 5장 — 물 아래에서 어머니를 만난다

```
Wide 4:3 underwater scene. A vast calm hall of pale jade pillars in green-blue
water. A serene faintly glowing woman in flowing white holds the girl in both arms,
her cheek against the girl's hair, eyes closed. The girl's face is turned up,
astonished, one hand gripping her mother's sleeve. Soft drifting light, slow
bubbles, a few gentle robed figures further back. Warm within cool.
```

### `story-05-c.png` — 5장 — 인당수에 떠오른 연꽃을 뱃사람들이 건져 올린다

```
Wide 4:3 scene. Calm sea at dawn. Alongside the merchant ship, an enormous pink
lotus floats closed on the water, glowing faintly. Sailors lean far over the rail
with ropes and boat hooks, faces lit with astonishment, the bearded leader
pointing and shouting. Pink and gold sunrise on the water. Wonder.
```

### `story-06-a.png` — 6장 — 대궐 뜰에 놓인 연꽃

```
Wide 4:3 scene. A palace courtyard at evening. The huge closed lotus stands on a
stone pedestal in the middle of a swept court, softly luminous. A young king in
dragon-embroidered robes stands before it alone with his hands behind his back,
looking at it. Red pillars, tiled roofs, lantern light beginning. Hushed and
strange.
```

### `story-06-b.png` — 6장 — 왕후가 되었으나 아버지 생각뿐이다

```
Wide 4:3 scene. A palace room. A young queen in red and gold court robes sits at
an open door looking out at a garden, her hands idle in her lap, her face turned
away and distant. Behind her the king has half risen from his seat, concerned,
one hand out. Rich brocade, gold screens - and a completely absent expression on
her face. Wealth and homesickness together.
```

### `story-06-c.png` — 6장 — 심 봉사가 지팡이로 문지방을 더듬어 대궐로 들어선다

```
Wide 4:3 scene. A great palace gate. A thin shabby blind man in a patched white
hanbok stands at the threshold, feeling for it with the tip of his stick and one
outstretched hand, his other arm held out for balance. Around him other blind
guests are being helped through by attendants. The gate is enormous and he is very
small. Bright daylight, red pillars, banners.
```

### `story-07-a.png` — 7장 — 맹인 잔치 마당

```
Wide 4:3 scene. A vast palace courtyard filled with low tables, at each a blind
guest with a bowl of rice and soup. Attendants move among them pouring. Awnings,
banners, spring blossom. The mood is generous and noisy. In the far background, on
the raised hall, a small red-robed figure stands watching the crowd.
```

### `story-07-b.png` — 7장 — 왕후가 노인 앞에 무릎을 꿇는다

```
Wide 4:3 scene. Among the tables. A young queen in full red and gold court robes
has come down into the yard and dropped to her knees on the flagstones in front of
one thin old blind man, gripping his hands, her mouth open but no sound coming,
tears running. He has half risen, head tilted, his whole face a question. All
around them people are standing up and turning to look. Blazing daylight.
```

### `story-07-c.png` — 7장 — 심 봉사가 눈을 뜬다

```
Wide 4:3 scene of pure release. The same spot a heartbeat later. The old man's
eyes are wide open for the first time, staring straight at his daughter's face,
his hands still in hers, his whole body arched back in shock and joy, tears
streaming. A burst of white light seems to break across the courtyard. Behind
them the whole crowd of guests is on its feet, arms raised, caps flying. Radiant.
```

---

## 마지막 장 — `end.png` (가로 4:3)

노인이 마당에서 손녀에게 이야기를 들려준다.

```
Wide 4:3 scene. A sunny verandah years later. A healthy old man with clear open
eyes sits on the wooden edge telling a story, hands shaping something in the air,
laughing. A small child sits on the step below listening with her chin in her
hands. A woman's shadow falls from the doorway. Persimmon tree, blue sky, ordinary
happiness.
```
