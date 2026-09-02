# 제미나이 그림 프롬프트 — 들쥐와 손톱

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> **4 : 3**으로 받아서 위아래를 조금 잘라 씁니다(각 5.5퍼센트). 이 책의 마지막
> 그림이니 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 화면에서 칸을 직접 재서 적은 값입니다

**제미나이는 16:9(1376×768)보다 옆으로 넓은 그림을 못 만듭니다.** 그런데 본문
그림칸은 그보다 넓은 **2.15 : 1**이라, 아무리 시켜도 칸에 딱 맞는 그림은 받을 수
없습니다. 16:9로 받아 위아래를 잘라 쓰는 수밖에 없습니다. 그러니 **잘려 나갈
자리를 미리 비워 두고 그리게 하는 것**이 요령입니다.

| 그림 | 칸 비율 | 시킬 비율 | 잘려 나가는 곳 |
|---|---|---|---|
| 본문 그림 12장 | 2.15 : 1 | **16 : 9** | 위 8퍼센트 · 아래 8퍼센트 |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** | 없음 |
| 마지막 `end.webp` | 1.5 : 1 | **가로 4 : 세로 3** | 위 5.5퍼센트 · 아래 5.5퍼센트 |

받은 그림이 정말 그 비율로 왔는지는 파일에서 직접 재 보면 금방 알 수 있습니다.

```
python _tools/imgratio.py 책이름
```

지난번에 이 책들은 2:1로 시켰는데 전부 16:9로 받았고, 그걸 아무도 몰랐습니다.

> **이미 그려 둔 그림은 그대로 씁니다. 다시 그리지 마세요.**
> 본문 그림은 이미 16:9라 비율로는 새 기준과 같습니다. 달라지는 것은 구도뿐이라,
> 새로 그리는 그림에만 아래 규칙을 적용하면 됩니다. 다만 `end.webp`는 지난번에
> 16:9로 받아 좌우가 8퍼센트씩 잘리고 있습니다. 그 그림을 언젠가 다시 그릴 일이
> 생기면 그때 4 : 3으로 받으세요.

### 그래서 프롬프트에 이렇게 적어 주세요

- **중요한 것은 한가운데 84퍼센트 안에.** 위 8퍼센트와 아래 8퍼센트는 화면에서 잘립니다.
- **머리 위와 발밑에 여유를 둘 것.** 머리가 그림 위쪽에 붙으면 정수리가 날아갑니다.
- **인물을 가운데에 몰지 말고 좌우로 나눌 것.** 칸이 옆으로 아주 넓습니다.

영어 프롬프트 끝에 이 문장을 덧붙이면 잘 듣습니다.

```
16:9 wide composition. Keep every important element inside the central 84% of
the frame height; the top 8% and bottom 8% will be cropped away. Leave headroom
above heads and space below feet. Spread the figures to the left and right
rather than clustering them in the middle.
```

`end.webp`**만은 4 : 3으로** 시키세요. 칸이 1.5 : 1이라 4 : 3으로 받으면 위아래가
5.5퍼센트씩만 잘리는데, 16:9로 받으면 좌우가 8퍼센트씩 잘려 그림 양옆이 날아갑니다.

세로 화면(태블릿을 세워 볼 때)에서는 `end.webp` 칸이 **4.4 : 1**짜리 가느다란
띠가 됩니다. 그때는 그림 높이의 칠십 퍼센트가 잘리니, 중요한 것은 반드시
그림 한가운데 높이에 두세요.


## 이 책만의 요령

**가짜 덕구를 괴물처럼 그리지 마세요.** 진짜와 완전히 똑같이, 구별이 안 되게 그려야 합니다. 그것이 이 이야기의 무서움이에요. 다만 눈빛만은 미묘하게 다르게 — 가짜는 시선이 조금 얕고 태연합니다. 6번과 8번 장면에서는 **어느 쪽이 진짜인지 독자도 알 수 없게** 그려 주세요. 12번에서 쥐로 되돌아가는 장면만 확실하게 보여 주면 됩니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, cel-animation style with clean outlines and
warm colors, similar to a classic Korean animated storybook. Setting is a
Joseon-era village home: a thatched cottage with a wooden verandah, a swept
earthen yard with a low wall and a mouse hole at its base, a kitchen, and a
rainy village lane. Warm amber indoors, cool blue moonlight outdoors, grey for
the rainy scenes. Uncanny rather than frightening - no horror, no gore. No text
or letters in the image.
Make every picture EXCITING to look at, like a frame from 1980s-90s Korean TV
animation. Never a flat mid-distance shot with everyone standing in a row.
CAMERA: use a strong angle every time - look up steeply at whoever is powerful,
look down steeply on whoever is small, push right in close on a face at the
moment it changes. Let things break out of the frame: a hand, a tail, a swinging
club, a gourd bigger than the panel. Use deep foreshortening - the fist or the
foot nearest the viewer is huge.
BODIES: cartoon proportions, not realistic ones. Big heads on children, squash
and stretch, whole bodies leaning into what they are doing, fingers splayed,
feet off the ground.
MOTION: speed lines, dust clouds at the feet, impact stars, flying sweat drops,
objects tumbling through the air, hair and clothes streaming.
LIGHT: strong and graphic - hard shadows, warm light from one side, a bright rim
where the light hits, deep saturated darks at night.
Every picture should make a child want to turn the page.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
Two things that keep going wrong. First, PLUMP IS NOT UGLY. A well-fed character
is round AND good-looking: soft round face, smooth clear skin, big bright eyes,
rosy cheeks, glossy hair. Roundness is charm, never the joke. Second, DRAW PEOPLE
YOUNG unless the story says otherwise. Parents of small children are in their
twenties or thirties - smooth faces, thick black hair, no wrinkles, no balding,
no stoop. Only grandparents and village elders are old.
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
Deokgu: a young man of about twenty in a plain off-white hanbok with his hair in
a topknot, round easygoing face, slightly careless posture. The fake Deokgu: drawn
absolutely identically - same face, same clothes, same hair. The ONLY difference
is the eyes: the fake's gaze is a little flat and too calm. Never give the fake
fangs, shadows or a sinister look. The family: an elderly mother in grey hanbok
and a younger sister, both increasingly distressed. The field mouse: a small
brown rat with a long tail. The cat: a lean yellow-and-white village cat with
bright green eyes.
```

---

### `cover.webp` — 표지 (세로 2:3)

```
Vertical portrait composition. A moonlit Korean yard at night seen from low
down. In the foreground at the bottom, a scattering of small pale nail clippings
on the swept earth, drawn very close and sharp. Behind them, mid-frame, a small
brown rat crouches over the clippings. Rising behind the rat and filling the
upper half of the frame, a faint human silhouette is beginning to form out of
pale mist. Uncanny and quiet.
```

## 본문  장 (모두 가로 16:9)

### `01-clip.webp` — 마루에 걸터앉아 손톱을 깎다

```
Wide scene on a cottage verandah in the afternoon. On the right, Deokgu sits on
the edge of the wooden floor clipping his nails with a small blade, one leg
swinging, entirely careless. On the left, his elderly mother stands in the
doorway with one hand raised, mid-scolding. Warm light, ordinary domestic
moment.
```

### `02-toss.webp` — 마당으로 훅 뿌려 버린 손톱

```
Wide scene in the yard. In the centre, Deokgu flicks his hand outward and a
small spray of pale nail clippings arcs through the air toward the swept earth,
drawn with fine motion lines. He is already turning away, not watching where they
land. Late afternoon light, long shadows. Careless and small.
```

### `03-rat.webp` — 담 밑에서 나온 들쥐

```
Wide night scene in the empty yard. On the left, a small brown rat has emerged
from a hole at the base of the low earthen wall and creeps across the moonlit
ground toward the pale clippings scattered in the centre. Everything else is
still and dark. Cool blue moonlight, sharp little shadow behind the rat.
```

### `04-change.webp` — 김이 피어오르고 두 발로 일어서다

```
Wide night scene in the yard, the transformation. In the centre, pale mist rises
in a column from where the rat was, and inside it a human shape is forming -
already standing on two legs, the last of the fur dissolving. The finished figure
is unmistakably Deokgu, and he is smiling faintly. Moonlight, drifting mist. Eerie
but not monstrous.
```

### `05-return.webp` — 방 안에서 밥을 먹고 있는 나

```
Wide scene at the cottage door in the evening. On the left, Deokgu stands in the
open doorway with one hand still on the frame, frozen, eyes wide. On the right,
inside the lamplit room, an identical Deokgu sits at a low table with a spoon
halfway to his mouth, looking calmly back at him. The family eats on around him.
Warm light, cold shock.
```

### `06-family.webp` — 나란히 세워 놓고 보아도

```
Wide scene in the yard at night. In the centre, two identical Deokgus stand side
by side facing the viewer, exactly the same in every detail - same clothes, same
posture, same face. Around them, the mother and sister circle with a lantern,
peering desperately from face to face. Draw them so the reader genuinely cannot
tell which is which. Lantern light, dread.
```

### `07-test.webp` — 가짜가 더 술술 대답하고

```
Wide interior scene by lamplight. The family sits in a half circle firing
questions. On the left, one Deokgu talks fluently with easy gestures, the family
leaning toward him and nodding. On the right, the other Deokgu has his mouth
half open, one hand raised, faltering. Nothing in the drawing says which is real.
Amber light, sinking feeling.
```

### `08-out.webp` — 닫히는 대문

```
Wide scene at the cottage gate at night. On the right, inside the yard, one
Deokgu stands with the family behind him, one arm pointing outward, calm. On the
left, outside, the other Deokgu has been pushed out and reaches back with both
hands as the heavy wooden gate swings shut between them. Moonlight, one narrowing
band of warm light from inside. Heartbreaking.
```

### `09-wander.webp` — 처마 밑에 웅크린 밤

```
Wide rainy night scene in a village lane. In the centre, Deokgu sits hunched
under the eaves of a shed with his arms around his knees, soaked, staring at
nothing. Rain streaks down in long grey lines and pools in the lane. Distant
lamplit windows he cannot go into. Cold greys and blues. Lonely.
```

### `10-cat.webp` — 고양이를 데려가 보렴

```
Wide scene in a village lane the next day. On the right, a small elderly woman
in a shawl holds out a lean yellow-and-white cat with both hands, speaking
kindly. On the left, Deokgu takes it, looking down at the cat with dawning hope,
still bedraggled. Grey morning light beginning to clear. Small kindness.
```

### `11-reveal.webp` — 등을 세우고 달려든 고양이

```
Wide scene in the yard. On the left, the cat lands with its back arched and every
hair on end, yowling, launched straight at one of the two identical figures. On
the right, that figure staggers backward with both arms up, face finally
cracking into panic. The family recoils behind. Dust, motion lines. The moment
everything flips.
```

### `12-rat-again.webp` — 담 밑 구멍으로 사라진 들쥐

```
Wide scene in the yard. On the right, a small brown rat scurries into the hole at
the base of the wall, only its tail still showing, a scrap of pale mist trailing
behind it. On the left, the family have thrown their arms around the real Deokgu,
the mother's face buried in his shoulder. The cat sits washing one paw, entirely
unimpressed. Warm daylight, relief.
```

### `end.webp` — 마지막 (가로 4:3)

```
A quiet Korean cottage verandah in the morning, no people. A folded square of
paper sits on the wooden floor beside a small blade, and beyond it the kitchen
stove door stands open with a low fire inside. A cat dozes in a patch of
sunlight. Warm and settled.
```
