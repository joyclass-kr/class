# 제미나이 그림 프롬프트 — 밤에 찾아온 도깨비

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

## 이 책만의 요령

**도깨비를 무섭게 그리지 마세요.** 우리 도깨비는 괴물이 아니라 짓궂은 이웃 같은 존재예요. 덩치는 크되 얼굴은 우스꽝스럽고 어수룩해야 합니다. 마지막 두 장에서 정체가 낡은 빗자루로 드러나는 것이 이 이야기의 웃음이니, 도깨비의 생김새 어딘가에 빗자루를 슬쩍 닮은 구석을 넣어 주면 좋아요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cel-animation style with clean bold
outlines and vivid colors, similar to a classic Korean animated storybook.
Setting is a Joseon-era village at night: a moonlit dirt road, a shallow stream
with stepping stones, a big old willow on the bank, thatched roofs beyond. Deep
indigo and silver moonlight for the night scenes, warm gold for the morning
ones. Playful and funny, never scary. No text or letters in the image.
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
Kim: a wiry cheerful farmer in his thirties, topknot, an old jacket with the
sleeves rolled, red-cheeked from drink, plucky rather than brave.
The dokkaebi (Korean goblins) - draw them EXACTLY like this every time:
SMOOTH bare skin in a strong flat colour, NEVER furry, NEVER hairy, NEVER
bristly, no shaggy fur anywhere on the body or legs. Round cartoon proportions,
big friendly round eyes with thick eyebrows, a broad rounded nose, pointed
elf-like ears, a wide grin with two small blunt tusks, and TWO curved ridged
horns like a goat's (only babies have a single horn). Short tidy dark hair.
The LEADER is bright tomato RED, heavy-set and barrel-bellied, wearing a
leopard-print hide slung over one shoulder like a tunic, barefoot, carrying a
golden club studded with blunt spikes.
Another is grass GREEN with a small flower tucked behind one horn, dressed in a
proper hanbok - pink jeogori, purple skirt, tiger-stripe vest - neat and
homely.
The smallest is a chubby SKY-BLUE baby with one little horn and a bib, always
underfoot, always delighted.
They are comic and warm, never frightening - closer to a noisy family than to
monsters.
The broom: an old Korean broom of bound straw, the bristles worn down to a stub.
THIS book has only ONE dokkaebi and he is the exception: he was once a
worn-out straw broom, so give him a single short horn and a few straw-
coloured tufts standing up on top of his head - but his skin is still
smooth blue, not furry, and he is built like the others.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up a moonlit village road. In the upper
half, a huge blue-grey goblin with one stubby horn and straw-like bristly hair
stands astride the road, hands on hips, grinning down. At the bottom of the
frame, small by comparison, a man in a topknot stands frozen with his arms out.
An enormous full moon behind them. Funny rather than frightening.
```

## 본문 열 장 (모두 가로 2:1)

### `01-nightroad.webp` — 달 밝은 밤, 집으로 가는 길

```
Wide moonlit country road scene. On the left, Kim weaves happily along a dirt
path between fields, arms swinging wide, mouth open in song, hat askew. On the
right, the road drops toward a shallow stream with flat stepping stones and a big
old willow. An enormous full moon low in a deep indigo sky. Cheerful and calm.
```

### `02-challenge.webp` — 징검다리를 막아선 도깨비

```
Wide night scene at the stream. On the right, the huge blue-grey goblin stands on
the far end of the stepping stones with his feet planted wide and hands on his
hips, grinning, one stubby horn catching the moonlight, bristly hair sticking out
in all directions. On the left, Kim has stopped dead on the near bank, arms up,
eyes like saucers. Silver moonlight on the water.
```

### `03-grip.webp` — 허리를 맞잡은 두 사람

```
Wide night scene on the sandy bank. In the centre, Kim and the goblin have taken
Korean wrestling grips on each other's belts, foreheads almost touching, both
braced low. The size difference is enormous and absurd - Kim's head barely
reaches the goblin's chest. Moonlight rimming both figures, dust at their feet.
Comic tension.
```

### `04-wrestle.webp` — 바위를 미는 것 같은 힘

```
Wide night scene. The goblin leans in casually with one arm, almost bored, while
Kim's feet have left the ground entirely, legs pedalling in the air, face
squeezed with effort, sweat flying off him in droplets. Deep footprint grooves
dragged across the sand behind him. Moonlit and very funny.
```

### `05-remember.webp` — 왼다리가 약하다던 말

```
Wide night scene. Kim, still gripped, has gone suddenly still and thoughtful, one
eyebrow lifting as a memory arrives; a small glowing thought bubble beside his
head shows an old grandmother wagging a finger and pointing at a leg. Above him,
the goblin grins on, oblivious. The stream and willow behind. Beat of
anticipation.
```

### `06-throw.webp` — 쿵! 나자빠진 도깨비

```
Wide night scene, explosive. The goblin crashes flat onto his back on the sand
with his legs in the air and his club flying away, a huge dust cloud and impact
lines around him, eyes spinning. On the left, Kim stands panting in a low finishing
stance, one fist clenched. Sand and moonlight everywhere. Peak slapstick.
```

### `07-tied.webp` — 버드나무에 꽁꽁 묶다

```
Wide night scene at the willow. In the centre, the goblin is lashed to the thick
willow trunk with a long cloth belt wound many times around him, only his head
and one arm free, mouth wide open bellowing, eyebrows up in outrage. On the left,
Kim walks away backwards pointing a warning finger, grinning. Moonlight through
willow leaves.
```

### `08-boast.webp` — 마을 사람들을 데리고 나서다

```
Wide village street scene in bright morning. On the left, Kim strides ahead with
his chest puffed out, both arms sweeping in a grand gesture, talking loudly. Behind
and to the right, a crowd of villagers of all ages follows, some sceptical with
folded arms, children running ahead excitedly. Warm gold morning light, long
shadows.
```

### `09-broom.webp` — 묶여 있던 것은 낡은 빗자루

```
Wide morning scene at the willow. In the centre, the cloth belt is still wound
many times around the trunk exactly as before - and inside it, a single worn-out
straw broom with its bristles rubbed down to a stub. The crowd on the right
leans in staring, mouths open. On the left, Kim points with one finger, his own
face slowly falling. Bright, ridiculous, perfect.
```

### `10-laugh.webp` — 웃음바다가 된 마을

```
Wide morning scene by the stream. The whole crowd has dissolved into laughter -
people doubled over, slapping knees and each other's backs, children rolling on
the grass, one man holding the old broom up like a trophy. In the centre-left,
Kim stands crimson to the ears, hat pulled down over his eyes. Bright and
joyful.
```

### `end.webp` — 마지막 (가로 2:1)

```
A quiet village lane at dusk, no people. A worn-out straw broom leans against a
mud wall beside a gate, an enormous moon rising behind the roofs, one long shadow
stretching from the broom across the lane. Calm, with a wink.
```
