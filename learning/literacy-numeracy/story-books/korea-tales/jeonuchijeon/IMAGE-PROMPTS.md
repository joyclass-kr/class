# 제미나이 그림 프롬프트 — 전우치전

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
slightly muted colours, realistic human proportions with expressive faces.
Setting is Joseon Korea in the early 1500s: the old capital Songdo with its
mountain passes and persimmon trees; the royal palace courtyard in Hanyang;
country magistrates' offices, jails and market squares; a tiny thatched
scholar's cottage in a green valley called Hwadam. Everyone wears period
hanbok. Warm lamplit interiors, bright comic daylight outdoors, misty
mountains at the end. No text or letters in the image.
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

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Jeon Uchi: a lively young man of sixteen to twenty-five, slim, bright mischievous
eyes, quick grin, black hair tied under a scholar's headband, in a plain white
or pale blue scholar's coat; often a brush tucked in his sleeve. In chapter 6 he
wears rough work clothes and carries a water yoke.
His mother: a small tidy woman in her forties in modest hanbok, worried
eyebrows, kind mouth.
The fox maiden: a beautiful young woman in a white jacket and red skirt with
unusually long narrow eyes; as a fox, a huge white fox with nine tails.
The old man on the rock: a white-bearded hermit with a beard to his waist, a
brush in his hand, calm and amused.
The king: a middle-aged man in a red dragon robe and black winged crown, easily
startled, not stupid.
The police chief (podo-daejang): a big square man in dark official's coat and
black hat with a red tassel, moustache, always red in the face.
The magistrates: plump comic officials in blue or green robes and tall black
hats, big round faces, comic sweat drops; one grows large pink pig ears.
Seo Hwadam: a lean old scholar in undyed hemp clothes, thin white beard, a book
always in his hand, utterly still and unbothered; never magical-looking.
The donkey: a small grey donkey, drawn in ink-painting style when in the scroll.
The heavenly official disguise: gold paper crown, jade tablet, rainbow cloud,
glowing robes - obviously theatrical to the viewer, convincing to the court.
```

---

## 표지 — `cover.webp` (세로 2:3)

세로로 긴 표지. 족자 속으로 걸어 들어가는 전우치.

```
Vertical portrait composition. A tall hanging scroll fills the frame; painted on
it in ink is a grey donkey on a misty path. A young man in a white scholar's
coat is stepping INTO the scroll - his front leg and shoulder already flat ink
on paper, his back leg and grinning face still solid and full colour in the
room, one hand waving back at the viewer. Behind him, half cut off at the frame
edge, an armoured hand reaching too late. Warm lamplit room, cool grey ink
world. Playful and magical.
```

## 본문 18장 (모두 가로 4:3)

### `story-01-a.webp` — 1장 — 여우가 구슬을 꺼내다

```
Wide 4:3 scene. Dusk on a mountain pass. Close on two figures: a young man in a
white coat with wide eyes, and a beautiful young woman in a white jacket and red
skirt who has just taken a glowing blue marble from between her lips and holds
it up between finger and thumb. Her eyes are long and narrow; behind her,
faintly, the shadow on the rock is a fox's shadow with many tails. Blue dusk,
one bright glow.
```

### `story-01-b.webp` — 1장 — 바위 위의 노인

```
Wide 4:3 scene. Dawn on a mountain top. A young man sits on a great flat rock,
exhausted and pale; beside him sits an old hermit with a white beard to his
waist, holding up a writing brush as if about to draw on the air. Below them
the whole town of Songdo lies tiny in the mist. Pink dawn light. Quiet and
strange.
```

### `story-01-c.webp` — 1장 — 처음 탄 구름

```
Wide 4:3 scene. Comic. A young man sprawled face-first in a muddy rice paddy,
legs in the air, mud on his cheek, laughing. Above him a small puffy cloud hangs
tilted in the air like a misbehaving cushion. In the distance a farmer stares
with his mouth open. Bright morning, splashes of mud flying.
```

### `story-02-a.webp` — 2장 — 오색구름을 타고 온 선관

```
Wide 4:3 scene. THE big picture. Low angle from among the kneeling courtiers in
the palace courtyard. A rainbow-coloured cloud descends from the sky with a
glowing figure standing on it: gold crown, jade tablet, robes shining white.
The king at the front has dropped to his knees, mouth open. Dozens of officials
flat on the ground. Morning sky, rays of light. Grand and just slightly
theatrical.
```

### `story-02-b.webp` — 2장 — 황금 들보

```
Wide 4:3 scene. The palace courtyard at dawn. A huge golden beam, ten feet long
and an arm-span thick, lies on wooden trestles, blazing yellow in the first
light; a hundred exhausted blacksmiths sit slumped around it. Officials in
silk clutch empty jewellery boxes with comic tearful faces. The king stands
over it wringing his hands. Everything tinted gold.
```

### `story-02-c.webp` — 2장 — 문 앞마다 쌀가마니

```
Wide 4:3 scene. A poor thatched village lane at sunrise. In front of every door
stands a fat straw rice sack with a paper note pinned to it. Villagers are just
coming out - a thin mother with three children hugging a sack, an old man
reading the note with his mouth open, a boy dancing. Warm gold light, steam
from a first pot of rice. Joy.
```

### `story-03-a.webp` — 3장 — 그림 속으로 들어가는 전우치

```
Wide 4:3 scene. A small inn room. A hanging scroll of an ink-painted donkey on
the wall. The young man is halfway INTO the scroll - his upper body already
flat grey ink riding the donkey, his legs still in colour stepping off the
floor. The police chief bursts through the door with fifty soldiers behind
him, all skidding, his outstretched hand grabbing air. Speed lines, dust,
comic shock.
```

### `story-03-b.webp` — 3장 — 병 하나를 붙들고

```
Wide 4:3 scene. The palace courtyard. A cluster of soldiers stand around a
single small wine bottle held up by the police chief, all staring at it,
helmets tilted. Laughter lines are drawn coming out of the bottle's neck. In
the foreground a fly zooms past toward the viewer, huge with foreshortening.
Up on the hall steps the king rubs the tip of his nose. Comic.
```

### `story-03-c.webp` — 3장 — 밤에 임금과 밥상을 놓고

```
Wide 4:3 scene. The king's private study at night. The young man sits at a low
dinner table eating calmly with chopsticks while the king, in night robes,
kneels at a writing desk with a brush, writing down names, glancing at him
sideways. One candle, deep warm shadows, two men who should be enemies having
supper.
```

### `story-04-a.webp` — 4장 — 사라진 옥문

```
Wide 4:3 scene. A country jail at morning. The jail's doorway is simply an empty
frame - no door at all - and an old man in white walks out through it holding
a small boy's hand. A jailer stands scratching his head, keys dangling
uselessly. Sunlight pours through the empty doorway. Gentle and funny.
```

### `story-04-b.webp` — 4장 — 원님의 돼지 귀

```
Wide 4:3 scene. Comic close-up. A plump magistrate in a green robe bends over
a brass washbasin and sees his reflection: two large pink pig ears sticking up
through his hair. His eyes bulge, water sprays, his hat flies off. Behind him
servants clap hands over their mouths, faces red. Bright morning light.
```

### `story-04-c.webp` — 4장 — 논문서를 안은 노인

```
Wide 4:3 scene. A humble yard. An old man in white sits on the ground hugging a
folded paper document to his chest, weeping, while a small boy hugs his neck.
Behind them a rice field green in the sun. In the far background, small, a
young man in a scholar's coat walks away down the road without looking back.
Warm afternoon.
```

### `story-05-a.webp` — 5장 — 화담 골짜기의 초가

```
Wide 4:3 scene. A green mountain valley. A tiny thatched cottage under a
persimmon tree. On the veranda an old lean scholar in hemp reads a book, not
looking up. At the gate a young traveller has stopped mid-step, startled, as if
he has just been called by name. Students with books peek from the side yard.
Soft spring light.
```

### `story-05-b.webp` — 5장 — 호랑이가 강아지가 되다

```
Wide 4:3 scene. Sequence across one picture. From the left a huge striped tiger
leaps from a sheet of paper, roaring; in the middle it is already smaller, a
cub; by the time it reaches the veranda on the right it is a tiny puppy wagging
its tail and licking the foot of the old scholar, who has not looked up from
his book. The young man in the yard clutches his brush, jaw dropped. Bold
cartoon shapes.
```

### `story-05-c.webp` — 5장 — 처음으로 꿇은 무릎

```
Wide 4:3 scene. The cottage veranda at dusk. The young man kneels on the ground
before the steps, head bowed, his brush laid down beside him. The old scholar
has closed his book at last and looks at him - not stern, not kind, just
seeing him. Persimmon leaves drifting. Quiet.
```

### `story-06-a.webp` — 6장 — 감나무 아래 묻은 붓

```
Wide 4:3 scene. Dawn under a persimmon tree. The young man in rough work
clothes kneels pressing earth down with both hands over a small hole; the tip
of a brush handle is just disappearing under the soil. His hands are shaking a
little. Mist in the valley behind. Intimate close view.
```

### `story-06-b.webp` — 6장 — 벼슬 첩지를 받지 않다

```
Wide 4:3 scene. The cottage yard. A royal messenger in a blue robe and tall hat
holds out a rolled document with both hands, bowing. Facing him, a young man
with a water yoke across his shoulders and two dripping buckets shakes his
head with a small smile, hands still on the yoke. On the veranda the old
scholar reads. Bright noon.
```

### `story-06-c.webp` — 6장 — 안개 속으로

```
Wide 4:3 scene. A mountain path rising into thick white mist. Two figures seen
from behind, small: an old scholar with a book and a younger man with a bundle,
walking side by side into the white. In the foreground, large, the persimmon
tree by the empty cottage, one new green shoot at its foot. Pale, still, kind.
```

---

## 마지막 장 — `end.webp` (가로 4:3)

이름 없는 쌀가마니.

```
Wide 4:3 scene. A snowy mountain village at dawn. In front of a poor thatched
door stands a single fat straw rice sack, no note on it. A small child in a
padded jacket has just opened the door and stares at it. Fresh footprints lead
away up the slope into the pines and stop. Soft blue snow light, one warm
window. Quiet wonder.
```
