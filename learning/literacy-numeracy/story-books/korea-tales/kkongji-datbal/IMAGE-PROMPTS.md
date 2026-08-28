# 제미나이 그림 프롬프트 — 꽁지 닷발 주둥이 닷발

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


파랑새·삼년 고개와 같은 **그림책 틀**이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고,
아래쪽 띠에 글이 좌우로 나뉘어 들어갑니다.

이야기는 **14개의 펼침**이고, 여기에 표지와 마지막 장을 더해 그림은 모두 **16장**입니다.

프롬프트를 제미나이에 그대로 넣어 만든 뒤, 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율이 그림마다 다릅니다 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 14장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.webp` | 0.67 : 1 | **세로 2 : 3** (세로로 긴 그림) |
| 마지막 `end.webp` | 1.5 : 1 | **가로 3 : 세로 2** |

제미나이는 가로 그림을 1376×768(16:9)로 내보냅니다. 칸이 1.92:1이라 위아래가 3.5퍼센트쯤 잘리는데
눈에 띄지 않는 정도예요. 4:3으로 만들면 위아래가 삼십 퍼센트쯤 잘려나가니 그것만 피하세요.
인물을 가운데에 몰지 말고 좌우로 나눠 배치하면 훨씬 자연스럽습니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and flat vivid colors, similar to a classic Korean animated
storybook. Traditional Korean mountain country of the Joseon era: a small
thatched cottage under a green ridge, terraced fields, streams with flat washing
stones, dirt roads winding west, and finally a towering bare rock cliff at the
end of the world. Characters wear hanbok. Danger is shown with sky, shadow and
scale rather than blood - never any gore. Big expressive faces, exaggerated
gestures, strong sense of motion. No text or letters in the image.
Villains and unkind characters must be FUN to look at - comic, lively and cute,
with big round expressive eyes and big exaggerated expressions. Exaggerate
freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
startled, whole body leaning into the gag. But never repulsive - no wrinkled
scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
ugly caricature. The reader should enjoy watching them and laugh at them, never
be disgusted by them. A greedy character can be adorable; what is wrong with
them shows in what they DO, not in an ugly face.
The same goes for monsters and beasts. A monster may be FRIGHTENING but never
DISGUSTING. Scary is about scale, darkness, silence and what you cannot quite
see - a huge shadow, two points of light where the eyes are, one clawed foot at
the edge of the frame. Disgusting is about detail: segmented legs, wet mouths,
dripping fangs, bristles, many small eyes. Draw the first, never the second.
When in doubt, show less of the monster, not more.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The son: a sturdy boy of twelve in a plain undyed hanbok with the sleeves tied
back and a cloth headband, straw sandals, an A-frame carrying rack. Small but
built like a young ox; a stubborn set to his jaw. He never looks frightened for
long.
The mother: a thin woman in a faded indigo and white hanbok with her hair in a
low bun, carrying a namul basket.
The monster bird: an enormous black bird whose tail is five arm-spans long and
whose beak is five arm-spans long - so vast that a whole grown person is smaller
than its head. Ragged oil-black feathers, a long bony hooked beak, small burning
orange eyes, a tail streaming behind it like a torn banner. When it flies, its
wings blot out the whole sky. Frightening in scale and silhouette only, never
bloody.
The old washerwoman: a broad cheerful old woman in a hitched-up work hanbok,
sleeves rolled, forearms strong.
The old farmer: a very stooped old man with a white beard and a straw hat,
hoeing slowly.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 벼랑 위 둥지와 하늘을 덮은 거대한 새.

```
Vertical portrait composition. Looking up at a towering bare rock cliff that
fills the frame from bottom to top, a huge messy stick nest on its summit. Across
the top of the frame, enormous and dark, the silhouette of a gigantic black bird
banks across the sky with an impossibly long ragged tail streaming behind it, one
small burning orange eye visible, blotting out the sun so that only a rim of gold
shows around it. At the very bottom of the frame, tiny, a boy in white stands at
the foot of the cliff looking up, one hand shading his eyes. Awe and scale.
Dramatic, never gory.
```

## 본문 14장 (모두 가로 2:1)

### `01-mother.webp` — 어머니가 나물 바구니를 끼고 뒷산으로 오른다

```
Wide panoramic scene. Morning. On the left a small thatched cottage with a swept
yard, where a sturdy boy stands with an A-frame rack on his back waving. On the
right a thin woman in faded indigo climbs a green path up the hill behind the
house with a namul basket on her hip, half turned to wave back. Fresh spring
green, clear light, birdsong feeling. Warm and ordinary.
```

### `02-shadow.webp` — 대낮인데 하늘이 시커먼 날개로 덮인다

```
Wide panoramic scene. A green hillside meadow. The mother stands small in the
lower left, frozen mid-crouch with her namul knife in one hand, head tilted all
the way back, her face and the whole hillside plunged into deep blue shadow. The
entire top two-thirds of the frame is filled by the underside of gigantic ragged
black wings sweeping across the sky, edges rimmed with blinding gold sunlight. No
body visible yet - only the wings and the enormous shadow. Terrifying scale.
```

### `03-empty.webp` — 풀밭에 나물 바구니와 시커먼 깃털 하나

```
Wide panoramic scene. The same hillside, evening. On the right the overturned
namul basket lies in the trampled grass with greens spilled around it, and beside
it a single enormous oil-black feather, taller than a person's arm, stuck
upright in the ground. On the left the boy has dropped his firewood and is
running toward it, arms out, mouth open in a shout. Long low orange light, wind
in the grass. Empty and awful.
```

### `04-name.webp` — 마을에서 제일 나이 많은 노인이 그 이름을 말한다

```
Wide panoramic scene. Evening in the village lane, a small crowd. On the right a
very old white-bearded man holds the giant black feather in both trembling hands,
his face gone bloodless, leaning away from it. On the left the boy stands with
his fists clenched and his jaw set, already stepping back toward the road. Around
them villagers cover their mouths and turn away. Lantern light, deep blue dusk.
```

### `05-set-out.webp` — 짚신 한 켤레를 매달고 해 지는 쪽으로 나선다

```
Wide panoramic scene. A road running west toward a low red sun. On the right the
boy walks away from the viewer down the road with a spare pair of straw sandals
tied at his waist, small and determined. On the left, back at the pass, the
villagers stand in a line watching him go, one old woman with a hand raised.
Huge red-and-gold sunset sky, very long shadows. Lonely and brave.
```

### `06-washing.webp` — 냇가에서 할머니의 빨래를 밟아 준다

```
Wide panoramic scene. A bright stream with flat washing stones. On the right a
broad cheerful old woman kneels beside a mountain of laundry, laughing and
pointing into a big wooden tub. On the left the boy stands in the tub with his
trousers rolled to the knee, stamping the laundry with both feet, suds flying up
around him, grinning through the effort. Sparkling water, dragonflies, hot
afternoon sun.
```

### `07-direction.webp` — "저 서쪽 끝 벼랑에 산다"

```
Wide panoramic scene. The stream bank at day's end, laundry hung on a line. On
the left the old woman grips the boy's shoulder with one hand and points west
with the other, her face suddenly grave. On the right, following her finger, the
far horizon shows a thin dark spike of rock against a burning orange sky. The boy
looks toward it, wet to the knees, listening. Warm light, sober mood.
```

### `08-field.webp` — 허리 굽은 노인과 나란히 밭을 맨다

```
Wide panoramic scene. A terraced field on a hillside. On the right a very stooped
old farmer in a straw hat works a hoe slowly along one furrow. On the left the
boy works the next furrow over, bent double, going twice as fast, sweat flying.
Behind them the finished rows stretch away. Late gold light, dust in the air,
companionable silence.
```

### `09-club.webp` — 노인이 헛간에서 무쇠 몽둥이를 꺼내 온다

```
Wide panoramic scene. Outside a dark barn at dusk. On the right the old farmer
emerges from the barn door holding out a heavy black iron club in both hands, his
face lit from below by a lantern, speaking urgently. On the left the boy reaches
for it with both arms, eyes wide, his torn and bleeding palms visible. Warm
lantern glow against blue dusk. The iron club is the darkest thing in the frame.
```

### `10-cliff.webp` — 벼랑 꼭대기 둥지와 하얗게 널린 뼈다귀

```
Wide panoramic scene. A towering bare rock cliff rises on the right against a
sickly yellow-grey sky, a huge messy stick nest on its summit. Scattered white
bones lie bleached among the rocks at its base. On the far left, tiny, the boy
stands at the bottom looking up with the iron club over his shoulder,
swallowing hard. Enormous sense of scale. Stylised bones only - no gore.
```

### `11-nest.webp` — 둥지 안에서 어머니를 찾아낸다

```
Wide panoramic scene. The top of the cliff, inside the huge stick nest, sky all
around. On the right the mother is huddled in a hollow of the nest, thin and
worn, lifting her head as light falls on her. On the left the boy has just
hauled himself over the rim of the nest on his stomach, one arm reaching toward
her, face breaking open with relief. Wind, high cold blue light, enormous empty
sky beyond.
```

### `12-fire.webp` — 무쇠 몽둥이를 불 속에 넣어 벌겋게 달군다

```
Wide panoramic scene. The nest at nightfall. On the left the boy crouches over a
small fire of dry branches, feeding it, the iron club thrust deep into the coals
and glowing cherry-red at one end. On the right the mother is tucked out of sight
in a cleft of rock, only her worried face showing. Warm red firelight on the boy's
face against a darkening violet sky. Tense and focused.
```

### `13-fight.webp` — 괴물 새가 둥지로 내려앉고 부리가 쩍 벌어진다

```
Wide panoramic scene. Night on the cliff top. Filling the right two-thirds of the
frame, the gigantic black bird drops onto the nest with its wings still spread,
its enormous hooked beak yawning wide open toward the left, small orange eyes
blazing, its long tail whipping off the edge of the frame. On the left the boy
stands his ground with both hands on the glowing red-hot iron club, braced,
absolutely unafraid. Sparks, wind, cold moonlight and hot red glow.
```

### `14-home.webp` — 어머니를 업고 벼랑을 내려온다

```
Wide panoramic scene. Dawn at the foot of the cliff. On the left the boy walks
away down a path with his mother on his back, her arms around his neck, both of
them lit by the first pink light. On the right the cliff stands empty and quiet,
the nest dark and abandoned, an ordinary blue sky above it at last with birds
flying free. Relief and morning.
```

---

## 마지막 장 — `end.webp` (가로 2:1)

집으로 돌아와 나물을 다듬는다.

```
Wide scene at golden hour. The cottage yard again. The mother sits on the wooden
porch edge trimming mountain greens from a basket, and the boy sits on the step
below her mending a straw sandal, both of them talking. Chickens in the yard,
smoke from the chimney, the green ridge behind. Completely ordinary and
completely safe. Warm and quiet.
```
