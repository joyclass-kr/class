# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
14개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **⚠️ 다시 그려 주실 것 (2026-08-28 점검)**
> - `07-awake` — 관이 흔들려 사과가 튀어나오는 **그 순간**을 그려 주세요. 지금은 이미 깨어난 뒤만 그려져 있어 제일 재미난 대목이 빠졌습니다.
> - `05-apple-2` — 공주 머리색이 갈색입니다. 다른 장처럼 **검은 머리**로. (이름이 눈처럼 흰 살결과 검은 머리에서 왔습니다.)
> - 공주 옷이 디즈니 백설공주와 똑같습니다(파랑 상의+노랑 치마+빨간 머리띠). 저작권이 살아 있는 디자인이라, 앞으로는 **다른 빛깔의 소박한 옷**으로 그려 주세요.

> **한 파일 = 한 장면입니다. 앞질러 가지 마세요.**
> 파일마다 뒤에 〔이 쪽에 실린 글〕을 붙여 두었습니다. 그 쪽에 실제로 실리는 글이에요.
> 그림은 **그 글에 나오는 장면만** 그려 주세요. 다음 쪽 이야기를 미리 그리면
> 그림이 글보다 한 칸씩 밀려서 책 전체가 어긋납니다. 실제로 그런 일이 있었어요.
> 장면이 둘 적혀 있으면 둘을 **한 그림 안에** 담아 주세요. 하나만 골라 그리면 안 됩니다.

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, WebP. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.webp`)는 세로 2 : 3 비율**, 마무리(`end.webp`)는 가로 3 : 세로 2 정도면 됩니다.

> **마무리 그림(`end`)은 이제 「읽고 나서」 쪽 오른쪽 위 한 자리에만 쓰입니다.** 따로 있던 마지막 쪽은 없앴어요.
> 칸은 **가로 3 : 세로 2** 그대로입니다. 적어 둔 비율대로 그리면 잘리지 않고 그대로 들어갑니다.


본문 그림칸은 마지막 장까지 모두 같은 비율입니다. 어느 장이든 똑같이
2:1로 만들면 되고, 따로 신경 쓸 것이 없어요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, cold blue snow against warm
cottage golds, no text or letters in the image, a castle chamber with a great
mirror, a winter forest, a tiny seven-bed cottage and a clearing with a glass
casket, expressive faces, wide panoramic composition, gentle and never
frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Snow White: a girl about 12 with black hair, pale skin and a red ribbon, in a
simple blue and yellow dress. The queen: a tall woman in a dark plum gown with a
high collar, drawn as cold and vain rather than monstrous. The huntsman: a broad
bearded man with kind troubled eyes. The seven dwarfs: small bearded miners in
seven different colours of cap, each with a distinct face. The prince: a young
man in a green riding coat.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: a single red apple resting on snow beneath a dark winter tree, seven small lanterns glowing in a cottage window far behind, an ornate mirror frame faintly visible in the sky above, striking and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 거울아, 거울아

| 파일명 | 장면 |
|---|---|
| `images/01-mirror.webp` | A castle window in winter where a queen sews as three drops of blood fall on the snowy sill, and beside it a cradle with a newborn, snow drifting past the glass, tender and quiet. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 눈 내리는 겨울이었습니다. 왕비가 창가에서 바느질을 했지요. 손끝을 바늘에 찔렸습니다. 피 세 방울이 눈에 떨어졌지요. 하얀 눈 위에 붉은 점이 또렷했습니다. 눈처럼 희고 피처럼 붉은 아이. / 오른쪽: 창밖에는 눈이 소복소복 쌓였지요. 얼마 뒤 정말 딸이 태어났습니다. 살결이 눈처럼 희었지요. 이름은 백설공주라 지었습니다. 그런데 왕비는 곧 세상을 떠났습니다. 임금님은 새 왕비를 맞았지요. 아주 아름다운 사람이었습니다.〕 |
| `images/01-mirror-2.webp` | A cold marble chamber where a tall queen in a plum gown stares into a great ornate mirror whose surface glows, her knuckles white on the frame, a young girl glimpsed in a sunlit corridor beyond, dramatic. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 새 왕비에게는 거울이 있었습니다. 무엇이든 답해 주는 거울이었지요. 왕비는 날마다 물었습니다. 거울아, 누가 제일 곱지? 왕비님이 제일 고우십니다. / 오른쪽: 해가 여러 번 바뀌었습니다. 공주가 부쩍 자랐지요. 궁궐 사람들이 공주를 보고 웃었습니다. 그날도 왕비가 물었습니다. 거울의 대답이 달라졌지요. 이제는 백설공주가 곱습니다.〕 |

## 2장 · 숲으로 간 공주

| 파일명 | 장면 |
|---|---|
| `images/02-forest.webp` | A winter forest path where a huntsman leads a small girl deeper among great dark trunks as she stops to pick flowers, his face troubled, low grey light through the branches. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 왕비가 사냥꾼을 불렀습니다. 문을 걸어 잠그고 말했지요. 공주를 숲으로 데려가라. 다시는 돌아오지 못하게 해라. / 오른쪽: 공주님, 저 꽃 좀 보십시오. 공주는 꽃을 따며 걸었습니다. 길이 점점 깊어졌지요.〕 |
| `images/02-forest-2.webp` | A deep dusk forest where a huntsman strides away leaving a small girl alone, and the same girl pushing through undergrowth toward a distant glimmer of light, lonely and hopeful. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 공주님, 어서 달아나십시오. 이 숲을 넘어 멀리 가십시오. 성으로는 오시면 안 됩니다. / 오른쪽: 공주는 홀로 숲을 걸었습니다. 나뭇가지가 옷을 잡아챘지요. 발이 부르트고 아팠습니다. 해가 뉘엿뉘엿 넘어갔습니다. 이제 어디가 어딘지 몰랐지요. 어디선가 짐승 우는 소리가 들렸습니다. 그때 작은 불빛이 보였습니다. 공주는 그 불빛을 향해 걸었지요.〕 |

## 3장 · 일곱 난쟁이의 집

| 파일명 | 장면 |
|---|---|
| `images/03-dwarfs.webp` | A tiny tidy cottage interior with seven little plates, cups and chairs at a table and seven small beds along the wall, a girl eating a little from each plate, warm lamplight, charming. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 숲 한가운데 작은 집이 있었습니다. 문이 살짝 열려 있었지요. 계세요? 아무도 안 계세요? 안은 아주 깔끔했습니다. 상에 접시가 일곱 놓였지요. 잔도 일곱, 의자도 일곱이었습니다. / 오른쪽: 벽 쪽에는 침대가 일곱이었습니다. 공주는 배가 몹시 고팠지요. 접시마다 조금씩만 덜어 먹었습니다. 한 사람 것만 축내기 싫었거든요. 그러고는 침대에 누웠습니다. 금세 잠이 들었지요.〕 |
| `images/03-dwarfs-2.webp` | Seven bearded miners crowding around a small bed with lanterns raised, astonished at the sleeping girl, their picks propped by the door, comic and warm. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: 밤이 되자 문이 열렸습니다. 난쟁이 일곱이 돌아왔지요. 광에서 일하고 오는 길이었습니다. 어? 누가 내 의자에 앉았네. 내 접시도 누가 썼어! / 오른쪽: 얼마 뒤 공주가 눈을 떴습니다. 공주는 있었던 일을 다 말했습니다. 난쟁이들은 서로를 쳐다봤지요. 그럼 우리와 함께 지내요.〕 |

## 4장 · 빗과 허리끈

| 파일명 | 장면 |
|---|---|
| `images/04-disguise.webp` | A cottage doorway where a disguised old pedlar woman with a basket ties a bright sash around a girl's waist, pulling it tight, forest light behind, tense but not frightening. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 왕비가 다시 거울에 물었습니다. 백설공주가 숲에 있습니다. 일곱 난쟁이와 지냅니다. / 오른쪽: 고운 허리끈 사세요! 공주가 문을 빼꼼 열었습니다. 장사꾼 할머니로군요.〕 |
| `images/04-disguise-2.webp` | Seven dwarfs cutting a sash free from a fallen girl in one half of the scene, and in the other a disguised woman holding out a comb at the door, worried faces, dramatic but gentle. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: 공주는 숨이 막혀 쓰러졌습니다. 왕비는 웃으며 사라졌지요. 저녁에 난쟁이들이 돌아왔습니다. 얼른 끈을 끊어 냈지요. 공주가 크게 숨을 쉬었습니다. / 오른쪽: 며칠 뒤 또 누가 왔습니다. 이번에는 빗을 팔러 왔지요. 이 빗으로 머리를 빗어 보렴. 공주는 또 깜빡 넘어갔습니다. 다행히 난쟁이들이 일찍 왔지요.〕 |

## 5장 · 새빨간 사과

| 파일명 | 장면 |
|---|---|
| `images/05-apple.webp` | A castle cellar where a queen paints one side of a red apple, and a cottage window where a disguised farm woman holds the apple out to a girl who shakes her head, autumn light, suspenseful. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 왕비는 지하실로 내려갔습니다. 사과 하나를 골랐지요. 한쪽은 새빨갛고 한쪽은 하얬습니다. 빨간 쪽에만 약을 발랐지요. 겉으로는 표가 나지 않았습니다. 이번에는 틀림없겠지. / 오른쪽: 맛있는 사과 사세요. 저는 문을 못 열어요. 약속을 했거든요.〕 |
| `images/05-apple-2.webp` | A cottage window where a woman bites the white half of an apple to reassure a girl who then bites the red half and sinks down, and the queen walking away smiling, dramatic but not gruesome. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 무섭거든 반씩 나눠 먹읍시다. 할머니가 사과를 반으로 쪼갰지요. 왕비가 하얀 쪽을 베어 물었지요. 맛있게 씹어 삼켰습니다. / 오른쪽: 공주가 스르르 쓰러졌습니다. 왕비는 웃으며 돌아갔지요. 성으로 와 거울에 물었습니다. 거울아, 이제 누가 제일 곱지? 왕비님이 제일 고우십니다.〕 |

## 6장 · 유리관 속의 공주

| 파일명 | 장면 |
|---|---|
| `images/06-glass-coffin.webp` | A hilltop clearing where seven dwarfs set a glass casket among planted flowers, one kneeling beside it, others carrying blooms up the slope, soft evening light, quiet and beautiful. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 난쟁이들이 돌아왔습니다. 이번에는 아무 끈도 없었지요. 빗도 보이지 않았습니다. 무엇을 해 봐도 소용없었지요. 일곱은 사흘을 울었습니다. 광에도 나가지 않았습니다. / 오른쪽: 이렇게 고운데 어떻게…… 난쟁이들은 유리로 관을 만들었습니다. 금빛 글씨를 새겼지요. '임금님의 딸 백설공주'라고요.〕 |
| `images/06-glass-coffin-2.webp` | A hilltop where seasons have turned, birds perched on a glass casket ringed with flowers, and a young man in a green riding coat dismounting to speak earnestly with seven dwarfs, wistful. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 계절이 여러 번 지났습니다. 눈이 왔다가 다시 꽃이 폈지요. 새들이 날아와 노래했습니다. 공주는 잠든 듯 그대로였습니다. / 오른쪽: 왕자는 한참을 서 있었습니다. 이분을 성으로 모시고 싶습니다. 난쟁이들이 고개를 저었지요.〕 |

## 7장 · 사과 조각이 튀어나오다

| 파일명 | 장면 |
|---|---|
| `images/07-awake.webp` | A hillside path where bearers stumble and a glass casket jolts, a piece of apple flying free as the girl inside opens her eyes, seven dwarfs racing up cheering, joyous and bright. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 신하들이 관을 메고 내려갔습니다. 언덕길이 몹시 가팔랐지요. 난쟁이들이 뒤를 따랐습니다. 그때 앞선 신하가 휘청했지요. 돌부리에 걸린 것입니다. 관이 크게 흔들렸습니다. 쿵 하고 뚜껑이 들썩였지요. / 오른쪽: 잠시 아무 소리도 없었습니다. 새 우는 소리마저 그쳤습니다. 공주가 눈을 번쩍 떴습니다.〕 |
| `images/07-awake-2.webp` | A hilltop farewell where a girl hugs seven dwarfs before riding away, and a festive palace hall where the same seven sit at the feast, while far off a lone figure in plum walks into the distance, warm. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 공주는 난쟁이들을 안았습니다. 그동안 고마웠어요. 이 집은 잊지 않을게요. / 오른쪽: 얼마 뒤 성에서 잔치가 열렸습니다. 난쟁이 일곱도 초대받았지요. 한편 왕비는 거울에 물었습니다. 거울은 또 백설공주를 말했지요. 왕비는 그 자리를 떠났습니다.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
