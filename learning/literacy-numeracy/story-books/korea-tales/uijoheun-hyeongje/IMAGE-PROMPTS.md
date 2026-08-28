# 제미나이 그림 프롬프트 — 의좋은 형제

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열 개의 펼침** + 표지 + 마지막 장 = 그림 **열두 장**.

파일명을 정확히 맞춰서 `images/` 폴더에 넣으면 자동으로 나타납니다. (그림이 없어도 책은 열리고 이모지가 대신 보여요.)


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
storybook. Traditional Korean farming village of the Joseon era: thatched-roof
cottages, low stone walls, rice paddies divided by earthen banks, pine-covered
hills. Characters wear hanbok and work clothes. Autumn palette by day (golden
rice, warm brown earth, clear blue sky) and deep blue moonlight by night.
Big expressive faces, warm gentle mood. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
The same goes for monsters and beasts - they must be FUN to look at too, drawn
like the monsters in 1980s-90s Korean TV animation. BOLD, SIMPLE and BOUNCY: big
flat areas of saturated colour, thick clean outlines, rounded cartoon masses,
springy exaggerated poses. Huge fangs, a wide roaring mouth, googly eyes out on
stalks, enormous claws are all GOOD - they read as playful because the shapes are
simple and the colours are bright. A monster may fill the whole frame and roar.
What makes a monster disgusting is not its teeth but its TEXTURE and DETAIL: wet
glistening skin, slime, drool, bristles, veins, swarms of small eyes, finely
segmented insect legs, realistic anatomy. Never draw those. Keep every monster a
big bold cartoon shape that a child would want to draw themselves.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Elder brother: a farmer in his late thirties, sturdy build, short beard, weathered
kind face, wearing an off-white hanbok with the sleeves tied back and a straw hat
pushed onto his shoulders. Younger brother: a farmer in his late twenties,
slimmer, clean-shaven, bright open face, wearing a pale grey hanbok. The two look
clearly like brothers - same eyes, same warm expression. Both carry a wooden
A-frame carrier (jige) loaded with sheaves of harvested rice.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A moonlit rice field at night seen from a low
angle. Two neat stacks of harvested rice sheaves stand on either side of a narrow
earthen path that runs from the bottom of the frame toward a full moon high
above. Two sets of footprints cross in the middle of the path, going opposite
ways. No people visible. Quiet, warm, gently mysterious.
```

### `01-brothers.webp` — 나란히 붙은 두 형제의 논

```
Wide panoramic view of two rice paddies side by side, divided by a low earthen
bank. Two brothers in hanbok work one in each field, both straightening up to
wave at each other across the divide, both smiling. Thatched-roof houses behind
them, pine hills in the distance, bright green summer rice. Warm and peaceful.
```

### `02-harvest.webp` — 볏단을 똑같이 나누는 두 형제

```
Wide autumn scene in a harvested golden rice field. In the centre, the two
brothers stand between two identical stacks of rice sheaves, one on the left and
one on the right, exactly the same height. The elder brother points at the stacks
counting aloud, the younger nods. Cut stubble underfoot, sheaves scattered
around, warm low afternoon sun.
```

### `03-elder-thinks.webp` — 잠 못 드는 형

```
Wide cutaway view of a Korean room at night, as if the front wall were removed.
On the right, the elder brother lies awake on a floor sleeping mat, eyes open,
staring at the ceiling, one arm behind his head, blanket half thrown off. On the
left, blue moonlight pours through the paper-screen door. A small thought bubble
above him shows a cooking pot and a folded quilt. Quiet night mood.
```

### `04-elder-carries.webp` — 볏단을 지고 동생 논으로 가는 형

```
Wide moonlit night scene across rice fields. The elder brother walks left to
right along a narrow earthen path between paddies, a wooden A-frame carrier piled
high with rice sheaves on his back, leaning into the load, glancing over his
shoulder to check no one sees him. Full moon, long blue shadows, two stacks of
sheaves visible in the distance.
```

### `05-younger-thinks.webp` — 잠 못 드는 동생

```
Wide cutaway view of a different Korean room the same night. On the left, the
younger brother sits bolt upright on his sleeping mat, blanket pushed aside, one
hand on his chin, clearly struck by a thought. On the right, moonlight through
the paper-screen door. A small thought bubble above him shows five small children
sleeping in a row. Same blue night palette as the previous scene.
```

### `06-younger-carries.webp` — 볏단을 지고 형 논으로 가는 동생

```
Wide moonlit night scene across the same rice fields, but the direction is
reversed. The younger brother walks right to left along the same earthen path, an
A-frame carrier piled with rice sheaves on his back, stepping carefully, looking
back over his shoulder. Same full moon and blue shadows, mirroring the earlier
scene.
```

### `07-morning.webp` — 그대로인 볏단 앞에서 어리둥절한 두 형제

```
Wide morning scene split into two halves by an earthen bank down the middle. On
the left, the elder brother stands before his stack of rice sheaves, scratching
his head, eyes blinking in confusion. On the right, the younger brother stands
before his own identical stack in exactly the same pose, head tilted, palms up.
Neither can see the other. Soft golden morning light, comic symmetry.
```

### `08-again.webp` — 또 그대로인 볏단

```
Wide morning scene, same two fields. Both brothers stand with hands on hips
staring at their unchanged stacks, mouths open, utterly baffled. Small comic
question marks float above both heads. A magpie sits on top of one stack watching
them. Bright clear autumn sky.
```

### `09-meet.webp` — 달빛 아래 논둑길에서 마주친 두 형제

```
Wide night scene, low viewpoint along a narrow earthen path between moonlit rice
paddies. The two brothers have stopped face to face in the middle of the path,
each with an A-frame carrier of rice sheaves on his back, both frozen with wide
startled eyes and open mouths. A huge full moon hangs directly behind them,
silhouetting both loads. Still, striking, the moment of recognition.
```

### `10-laugh.webp` — 논둑에 나란히 앉아 웃는 두 형제

```
Wide night scene. The two brothers sit side by side on the earthen bank between
their fields, their A-frame carriers set down beside them, both laughing out loud
with heads thrown back, one clapping the other on the shoulder. Rice sheaves
scattered around their feet, full moon above, warm and joyful despite the night
palette.
```

### `end.webp` — 마지막 (가로 2:1)

```
Two identical stacks of harvested rice sheaves standing side by side in a quiet
field at sunrise, an earthen path running between them, morning mist low over the
ground, no people. Warm golden light. Peaceful.
```
