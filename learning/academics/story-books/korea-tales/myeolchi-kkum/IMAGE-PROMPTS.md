# 제미나이 그림 프롬프트 — 멸치의 꿈

> **그림 안에 글자가 들어가면 안 됩니다.** 말풍선도, 효과음도, 간판 글씨도요.
> 제미나이가 가끔 영어를 써 넣습니다. 받은 그림에 글자가 보이면 그 장만 다시 만드세요.
> 프롬프트 끝에 `Absolutely no text, no letters, no speech bubbles, no sound effects, no signage anywhere in the image.` 를 덧붙이면 잘 듣습니다.


그림책 틀이에요. 한 펼침마다 위쪽에 큰 그림 하나가 통으로 들어가고, 아래쪽 띠에 글이 좌우로 나뉩니다.
**열두 개의 펼침** + 표지 + 마지막 장 = 그림 **열네 장**.


> **`end` 그림은 「읽고 나서」 쪽 오른쪽 위 한 자리에 쓰입니다.** 칸은 **가로 3 : 세로 2**입니다.
> 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다. 이 책의 마지막 그림이니
> 이야기가 끝난 뒤의 조용한 장면이 어울립니다.

## 비율 — 꼭 지켜주세요

| 그림 | 실제 칸 비율 | 요청할 비율 |
|---|---|---|
| 본문 그림 12장 | 2.14 : 1 | **가로 2 : 세로 1** |
| 표지 `cover.png` | 0.67 : 1 | **세로 2 : 3** |
| 마지막 `end.png` | 1.5 : 1 | **가로 3 : 세로 2** |

그림칸은 **2.14 : 1**이라 아주 길쭉합니다. 제미나이가 기본으로 내보내는 16:9는 위아래가 십육 퍼센트쯤 잘려 나가니, **가로 2 : 세로 1**로 만들어 달라고 적어 주세요. 그러면 잘리는 것이 육 퍼센트로 줄어듭니다. 4:3으로 만들면 삼십 퍼센트가 넘게 잘리니 그것만은 꼭 피하세요. 좌우로 넓은 그림이라 인물을 가운데에 몰지 말고 왼쪽과 오른쪽에 나눠 배치하세요.

## 이 책만의 요령

**물고기들이 왜 그렇게 생겼는지가 그림으로 보여야 합니다.** 8번부터 12번까지 다섯 장면은 각각 한 물고기의 생김새가 바뀌는 순간이에요. **바뀌기 전과 후가 확실히 달라야** 합니다 — 넙치는 처음에 눈이 양옆에 하나씩, 메기는 입이 보통, 병어는 입이 보통, 꼴뚜기는 눈이 머리에, 망둥이는 눈이 보통. 1번부터 7번까지는 전부 평범한 생김새로 그려 주세요. 그래야 마지막 장들이 웃깁니다.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙이세요)

```
Children's picture book illustration, bright cheerful cel-animation style with
clean bold outlines and vivid colors, similar to a classic Korean animated
storybook. Setting is the sea floor drawn like a Korean room: sandy ground,
swaying seaweed, coral and shells arranged like furniture, a low Korean feast
table set with dishes. Bright blue-green water with shafts of light from above.
Big exaggerated cartoon faces on all the fish, heavy slapstick motion lines.
Funny, never scary, no blood. No text or letters in the image.
```

## 인물 설명 (일관성을 위해 매번 붙이세요)

```
Myeolchi the anchovy: a small slim silver fish with a huge self-important face,
tiny body, always puffed up and gesturing grandly. Neopchi the flatfish: a broad
flat brown fish, and CRUCIALLY - in pictures 1 to 7 he has one eye on each side
of his head like a normal fish; only from picture 8 do both eyes end up on one
side. Mangdungi the goby: a stubby speckled fish, exhausted and put-upon; normal
eyes until picture 12, then bulging. Megi the catfish: a long grey fish with
whiskers and a NORMAL mouth until picture 9, then split wide side to side.
Byeongeo the pomfret: a round silver fish, normal mouth until picture 10, then
tiny and pursed. Kkolttugi the small squid: normal eyes on the head until picture
11, then slid down onto the body.
```

---

### `cover.png` — 표지 (세로 2:3)

```
Vertical portrait composition. Looking up from the sea floor through bright
blue-green water toward the surface far above. A tiny silver anchovy floats in
the middle of the frame with its eyes closed, drifting upward as if in a dream,
surrounded by soft bubbles. Near the top, the shimmering underside of the water
surface and a faint suggestion of a net. Dreamy and slightly ominous.
```

## 본문  장 (모두 가로 2:1)

### `01-dream.png` — 하늘로 떠올랐다 떨어지는 꿈

```
Wide dream-like underwater scene. Across the frame, a small silver anchovy
floats with eyes closed, drawn twice in a soft arc - once rising up through
bubbles toward the light, once falling back down. Pale dream colours, hazy edges,
clouds suggested in the water above. Beautiful and strange.
```

### `02-wake.png` — 벌떡 일어난 멸치

```
Wide underwater scene at the sea floor. In the centre, the anchovy has shot
upright out of a bed of seaweed with both fins raised and eyes enormous, mouth
open. Around him, ordinary sea floor - shells, coral, waving weed. A few startled
small fish dart away. Bright morning light through the water. Comic.
```

### `03-send.png` — 망둥이를 부르는 멸치

```
Wide underwater scene. On the left, the anchovy points imperiously off to the
right with one fin, chest puffed, chin high - absurdly grand for something so
tiny. On the right, a stubby speckled goby with normal round eyes slumps with his
fins drooping, mouth open in dismay. Bright and funny.
```

### `04-journey.png` — 밤낮으로 헤엄친 망둥이

```
Wide panoramic underwater seascape. The goby swims from right to left across the
entire frame with heavy speed lines and a trail of bubbles, fins visibly ragged,
tongue out. The sea floor changes beneath him from rocks to sand to mudflat,
showing the distance travelled. Behind him at the far right, a broad flat fish
follows with one eye on each side of its head. Epic and exhausting.
```

### `05-feast.png` — 상다리가 휘어지게 차린 상

```
Wide underwater scene arranged like a Korean room. In the centre, a low feast
table piled with seaweed dishes and shell bowls. On the right, the anchovy
gestures grandly at it. On the left, the flatfish settles at the table - draw him
clearly with one eye on each side. Behind them, the catfish, the pomfret and the
small squid crane in, all with completely normal faces. Warm and festive.
```

### `06-tell.png` — 꿈 이야기를 늘어놓는 멸치

```
Wide underwater scene at the table. In the centre, the anchovy stands on his tail
acting out the dream with both fins sweeping upward, eyes shining. Above him, a
soft thought bubble shows him rising through clouds. Around the table, all five
fish lean in, mouths slightly open, still perfectly normal-looking. Bubbles and
lamplight-like glow.
```

### `07-bad.png` — 그물에 걸려 올라가는 꿈이오

```
Wide underwater scene at the table. On the left, the flatfish speaks with his
eyes closed and one fin raised in solemn explanation - still one eye per side.
Above him, a thought bubble shows a net, then smoke, then a soup bowl. On the
right, the anchovy's face has gone from delight to disbelief to fury in one
frame, fins clenched. The others freeze. Perfect comic beat.
```

### `08-slap.png` — 뺨을 맞고 눈이 한쪽으로

```
Wide underwater scene, explosive slapstick. In the centre, the anchovy's tail
whips around in a huge arc with impact stars, and the flatfish tumbles sideways
across the frame in a roll of bubbles. At the end of his tumble, his two eyes have
slid together onto one side of his head, both blinking in astonishment. Dust of
sand kicked up. Hilarious.
```

### `09-catfish.png` — 웃다가 입이 찢어진 메기

```
Wide underwater scene. In the centre, the catfish throws his head back roaring
with laughter, whiskers flying - and mid-laugh his mouth tears wide open from side
to side, drawn with small motion cracks at each corner. His eyes go round with
alarm even as he laughs. In the background, the flatfish sits dazed with both eyes
on one side. Big and funny.
```

### `10-pomfret.png` — 입을 오므리다 작아진 병어

```
Wide underwater scene. On the right, the round silver pomfret squeezes his mouth
shut with both fins pressed over it, cheeks bulging, eyes screwed tight, trying
desperately not to laugh. Small strain lines all around his mouth, which has
shrunk to a tiny pucker. On the left, the catfish with his new split mouth points
at him and laughs harder. Comic chain reaction.
```

### `11-squid.png` — 넘어져 눈이 아래로 내려간 꼴뚜기

```
Wide underwater scene. In the centre, the small squid has tripped over a rock in
mid-flight and is somersaulting head-first, tentacles flailing, bubbles
everywhere. As he lands, his two eyes slide visibly down off his head onto his
body, drawn with little slip lines. His expression is pure bewilderment.
Slapstick.
```

### `12-goby.png` — 눈이 툭 불거진 망둥이

```
Wide underwater scene, everyone in frame. In the foreground on the left, the goby
stares at the chaos with both eyes bulging right out of his head, fins limp,
utterly done. Behind him, the whole cast now shows their new faces - flatfish with
eyes on one side, catfish with a split mouth, pomfret with a tiny mouth, squid
with eyes on his body - and the anchovy still fuming in the middle. Bright,
loud, absurd.
```

### `end.png` — 마지막 (가로 2:1)

```
A calm sea floor at dawn, no drama. An abandoned low feast table lies tipped
over on the sand with a few shell bowls scattered around it, seaweed swaying
gently, shafts of pale light coming down through the water. Quiet after the
uproar, and a little funny.
```
