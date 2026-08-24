# 제미나이 그림 프롬프트 — 바보 온달과 평강 공주

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열여섯 개의 펼침** + 표지 + 마지막 장 = 그림 **열여덟 장**.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 16장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 2.14 : 1 | **가로 2 : 세로 1** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**앞은 웃기고 뒤는 뭉클한 이야기**예요. 1장은 익살스럽게, 3장은 시원하고 당당하게 그려 주세요.

- **말 한 마리가 이 책의 상징입니다.** 10번에서는 갈비뼈가 드러난 여윈 말로, 그 뒤로는 같은 무늬 그대로 살이 오르고 윤이 나는 말로 그려 주세요. **얼룩무늬와 이마의 흰 별을 똑같이** 유지해야 같은 말인 줄 압니다.
- **온달을 우스꽝스럽게 그리되 불쌍하게 그리지는 마세요.** 옷은 해지고 신은 짝짝이지만 표정은 늘 환하게 웃고 있습니다. 몸집은 크고 어깨가 넓어야 나중이 자연스러워요.
- **13번이 이 책의 절정입니다.** 남루한 젊은이 앞에만 잡은 짐승이 산더미처럼 쌓여 있고, 온 나라 무사들이 그것을 보고 얼어붙은 장면이에요.
- **고구려답게.** 점무늬 저고리에 통 좁은 바지, 깃털 꽂은 모자, 짧고 굽은 활입니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, warm cel-animation style with clean bold
outlines and rich colors, in the look of a classic Korean animated film, with
touches of Goguryeo tomb-mural design. Setting is Goguryeo: a busy walled
capital with timber and tile buildings and a market street, a tumbledown
one-room hut at the foot of a wooded hill, a horse market, and a wide grassy
ridge called Nangnang Hill where the spring hunt is held. Warm ochres, deep
greens, iron greys, big spring skies. Lively and expressive. No text or letters.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Ondal: a big broad-shouldered young man of about twenty-five with a wide open
face and an easy grin, hair roughly tied, wearing a patched hemp tunic and
mismatched shoes; later the same face and grin above a proper dot-patterned
Goguryeo tunic and leather armour. Never draw him as dim-looking - just poor and
cheerful. His mother: a small blind old woman with cloudy eyes and grey hair, one
hand always feeling ahead of her. Princess Pyeonggang: first a small furious
crying child, then a composed young woman of sixteen with her hair in braided
loops, plain travelling clothes rather than silk, a calm and very determined
face. King Pyeongwon: a heavy-bearded king in fur-trimmed robes, exasperated
early on and delighted at the end. The horse: a dappled grey with a white star on
its forehead - the same markings every time, gaunt at first, magnificent later.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. A wide green ridge under a big spring sky. In the
middle of the tall frame, a dappled grey horse with a white star on its forehead
rears up, and on its back a broad-shouldered young man in a patched tunic draws a
short bow, laughing. Behind and below him, far off along the ridge, a whole line
of finely dressed riders has pulled up and is staring. Green grass, racing cloud,
gold light. Triumphant and funny.
```

## 본문  장 (모두 가로 2:1)

### `01-ondal.png` — 바보 온달이다!

```
Wide scene in a busy Goguryeo market street. In the centre, Ondal walks along in
a patched hemp tunic and two different shoes, carrying a small bundle, grinning
broadly. Behind him a knot of children skips along pointing and jeering, one
pulling a face. Stall-keepers glance up. Ochre timber buildings, hanging goods,
dust and sunlight. Comic and a bit sad.
```

### `02-kind.png` — 어머니 몫부터 덜어 두고

```
Wide interior of a bare one-room hut. On the right, Ondal crouches at a small
clay stove, stripping bark from a piece of elm into a pot, sleeves pushed up. On
the left, his blind mother sits on the floor with her hands folded, face turned
toward the sound. Between them, one bowl already set aside on a low tray. Firelight,
smoke, almost nothing else in the room. Tender.
```

### `03-cry.png` — 하루에도 몇 번씩 앙—

```
Wide interior of a palace hall. In the centre, a small girl of about five lies
flat on her back on the floor howling at the ceiling, fists and feet in the air.
Around her, four court ladies flap uselessly with toys and sweets. On the right,
the king backs out through the door with both hands over his ears. Painted beams,
bright daylight. Very funny.
```

### `04-threat.png` — 바보 온달에게 시집보내겠다!

```
Wide interior scene. On the left, the king leans down at the small crying
princess and points out the door with one arm, mouth wide open, beard bristling,
clearly not serious. On the right, the little princess has stopped mid-sob, and
her eyes have gone narrow and thoughtful, one tear still on her cheek. Court
ladies frozen behind. Comic - and the whole story turns here.
```

### `05-sixteen.png` — 저는 온달에게 가겠습니다

```
Wide interior of the palace hall. On the right, the sixteen-year-old princess
kneels straight-backed, hands folded, chin level, speaking calmly. On the left,
the king half rises from his seat with one hand gripping the arm rest, mouth
open. Around them, courtiers with the wedding gifts of a fine noble family
frozen in place. Bright formal light. Enormous tension.
```

### `06-argue.png` — 임금의 말은 농담이어도 말입니다

```
Wide interior scene. On the left, the king is on his feet, face scarlet, one arm
thrown out toward the door, robes swinging. On the right, the princess is already
rising, and she is bowing - a full formal bow, unhurried and respectful. Courtiers
press back against the pillars. Strong diagonal composition. Neither of them is
backing down.
```

### `07-leave.png` — 다 쓰러져 가는 집

```
Wide scene at the foot of a wooded hill in the evening. On the right, a tiny
sagging one-room hut with a broken fence and a bare yard. On the left, the
princess stands on the path in plain travelling clothes with a small bundle,
having stopped some distance away, just looking at it. Long shadows, dry grass,
gold evening light. A very long pause.
```

### `08-refuse.png` — 어서 돌아가십시오

```
Wide scene at the hut door at dusk. In the doorway, the blind old mother waves
both hands in front of her in refusal, face turned slightly away, one hand feeling
for the door frame. On the path, the princess stands quite still, not moving to
leave. Behind her, night coming on. One small lamp inside. Painful and quiet.
```

### `09-horse.png` — 나라에서 내다 판 여윈 말을 사 오세요

```
Wide scene in the yard in the morning. In the centre, the princess presses two
gold bracelets into Ondal's huge open palm and holds up one finger, explaining
with great precision. Ondal looks down at the bracelets, then at her, completely
baffled, mouth slightly open. Chickens, a broken fence, bright light. Funny and
warm.
```

### `10-train.png` — 굶었을 뿐이지요

```
Wide scene split across the frame. On the left, Ondal leads home a gaunt dappled
grey horse with its ribs showing and a white star on its forehead, head hanging.
On the right, some months later, the same horse - same dapples, same white star -
stands glossy and strong while the princess brushes its neck and it tosses its
head. Green yard, summer light. The change is the point.
```

### `11-study.png` — 손바닥이 터지고 아물기를 몇 번이나

```
Wide scene in the yard. On the left, the princess kneels with a wooden board and
traces a character while Ondal, far too big for the low table, copies it with his
tongue between his teeth. On the right, later in the day, he draws a short bow at
a straw target, and a row of arrows stands in the ground where he has been
practising since dawn, his palms wrapped in cloth. Warm light, sweat, effort.
```

### `12-hunt.png` — 낙랑 언덕의 사냥 대회

```
Wide scene on a broad grassy ridge in spring. Across the frame, a long line of
riders in fine dot-patterned tunics and feathered caps gallops out, banners
flying, hounds running ahead, the king at the centre. At the far right edge, well
behind the rest, one shabby figure on a dappled grey nobody is looking at. Big
sky, green grass, dust. Energy and scale.
```

### `13-win.png` — 저자가 누구냐?

```
Wide scene on the ridge at the end of the hunt. On the right, a huge heap of
game is piled in front of one shabby young man standing beside his dappled grey,
far more than anyone else has taken. On the left, the whole field of finely
dressed hunters stands frozen beside their own small piles, staring. In the
middle, the king rides forward with his eyebrows up. Gold afternoon light. The
best moment in the book.
```

### `14-king.png` — 과연 내 사위로다!

```
Wide scene on the ridge. In the centre, the king throws his head back laughing
with one hand on Ondal's shoulder, while Ondal grins and scratches his head,
embarrassed. Courtiers cheer around them. Down the slope on the left, small in the
frame, the princess stands alone among the grass watching, one hand at her mouth.
Warm light, banners. Joyful.
```

### `15-general.png` — 온달 장군

```
Wide scene of a mountain pass at dawn. In the centre, Ondal rides at the head of
a Goguryeo column in leather-and-iron armour on his dappled grey, one arm raised
to signal, still with the same easy grin on his face. Behind him, ranks of
soldiers with short bows and long spears. Mist in the valley, cold blue and gold
light. Strong and cheerful.
```

### `16-together.png` — 말은 당신이 키운 겁니다

```
Wide scene on the wooden porch of a modest house at night. Ondal and the
princess sit side by side on the edge of the porch with their feet down, a small
tray between them, both laughing, his armour dumped in a heap beside the step. In
the yard, the dappled grey stands at the rail with its head over the fence,
listening. Lantern light, moths, warm dark. Quiet and happy.
```

### `end.png` — 마지막 (가로 2:1)

```
A modest house yard at dawn with no people. A dappled grey horse with a white
star on its forehead stands dozing at the rail, a short bow hangs on a peg by the
door, and a pair of mismatched old shoes has been kept on a shelf beside it. Warm
first light, mist on the hill behind. Peaceful and fond.
```
