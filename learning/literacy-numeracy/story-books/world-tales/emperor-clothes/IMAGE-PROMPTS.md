# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 7개의 장(챕터)으로 나눠 담았고, 펼침면은 모두
14개예요. 펼침면 하나에 그림이 한 장씩 들어갑니다.
그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가 왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

> **⚠️ 다시 그려 주실 것 (2026-08-28 점검)**
> - `05-dressing` — 두 사람이 **촛불 열여섯 개를 켜 놓고 허공에 바느질하고 가위로 허공을 싹둑 자르는** 장면으로. 지금은 이미 옷을 입혀 주는 장면이라 다음 장과 겹칩니다.

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
bold clean outlines, saturated storybook colors, bright palace daylight, no text
or letters in the image, a palace wardrobe hall, a weaving room with empty looms,
a dressing chamber with tall mirrors, and a town parade street, very expressive
comic faces, wide panoramic composition, funny and never mean.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
The emperor: a round vain man with a curled moustache who changes clothes every
hour, comic rather than cruel. The two swindlers: a tall one and a short one,
both with sly grins and empty hands. The old minister: a thin worried man with
spectacles and a long beard. The honest official: a nervous younger man. The
child: a small boy on his father's shoulders with a plain open face. Crowds of
townspeople in bright clothes.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.webp` (세로 2:3 비율) | A tall portrait-format cover: an empty wooden loom standing in a grand hall with sunlight streaming through tall windows, a golden crown resting on a stool beside it and a bolt of nothing at all on the frame, witty and inviting. |
| `images/end.webp` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 옷을 좋아하는 임금님

| 파일명 | 장면 |
|---|---|
| `images/01-emperor.webp` | A palace wardrobe hall lined with rails of gorgeous coats where a round moustached emperor admires himself before a mirror while courtiers applaud, ten doorways of more wardrobes beyond, comic excess. 〔이 쪽에 실린 글 (1/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 한 시간마다 옷을 갈아입었습니다. 나랏일보다 옷이 먼저였지요. 새 옷 이야기가 나오면 밥도 잊었습니다. 신하들도 그걸 다 알았지요. 옷장이 방 하나를 다 차지했습니다. 아니, 방 열 개였지요. 오늘 아침 옷은 어떤가? / 오른쪽: 신하들은 늘 같은 대답을 했습니다. 참으로 훌륭하십니다! 오늘 것이 어제 것보다 낫습니다.〕 |
| `images/01-emperor-2.webp` | A palace audience room where two sly-faced strangers, one tall and one short, lean in to whisper to a wide-eyed emperor on his throne, empty hands spread as if displaying cloth, comic conspiracy. 〔이 쪽에 실린 글 (2/14) — 그림에 글자는 넣지 마세요. 왼쪽: 어느 날 낯선 두 사람이 왔습니다. 하나는 키가 크고 하나는 작았지요. 스스로 옷감 짜는 사람이라 했습니다. 저희 옷감은 아주 특별합니다. / 오른쪽: 무엇이 그리 특별하냐? 두 사람이 목소리를 낮췄지요. 어리석은 사람에게는……〕 |

## 2장 · 이상한 옷감

| 파일명 | 장면 |
|---|---|
| `images/02-swindlers.webp` | A palace room where two swindlers set up two looms and receive sacks of gold thread from servants, quietly slipping the thread into their own bags when no one looks, comic mischief. 〔이 쪽에 실린 글 (3/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 무릎을 쳤습니다. '그 옷을 입기만 하면……' '누가 어리석은지 알 수 있겠구나.' / 오른쪽: 두 사람은 방을 하나 받았습니다. 베틀도 두 대 들여놓았지요. 금실도 자루로 받았습니다. 비단실도 한가득 받았지요. 임금님은 아까운 줄도 몰랐습니다. 그런데 그것들은 어디로 갔을까요? 모두 자기 주머니로 들어갔습니다. 두 사람은 빈 베틀만 달그락달그락 돌렸지요.〕 |
| `images/02-swindlers-2.webp` | A lamplit room at night where two men work two completely empty looms with elaborate mimed gestures, snipping at air with scissors, shadows on the wall, absurd and funny. 〔이 쪽에 실린 글 (4/14) — 그림에 글자는 넣지 마세요. 왼쪽: 두 사람은 밤늦도록 일했습니다. 베틀이 달그락달그락 울렸지요. 문틈으로 그 소리가 새어 나왔습니다. 지나가던 사람들이 수군거렸지요. 얼마나 고운 옷감일까? / 오른쪽: 그런데 베틀에는 아무것도 없었습니다. 빈 틀만 돌아가고 있었지요. 두 사람은 허공에 손을 놀렸습니다. 실을 뽑는 시늉을 했지요. 가위로 허공을 자르기도 했습니다. 아주 진지한 얼굴이었지요.〕 |

## 3장 · 빈 베틀

| 파일명 | 장면 |
|---|---|
| `images/03-loom.webp` | A palace corridor where an emperor hesitates at a doorway and sends a bespectacled old minister instead, and the minister peering closely at a bare loom with rising panic, comic dread. 〔이 쪽에 실린 글 (5/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 궁금해 견딜 수 없었습니다. 그런데 선뜻 가지 못했지요. '혹시 나에게도 안 보이면?' / 오른쪽: 가서 보고 오너라. 대신은 방으로 들어갔습니다. 안경을 고쳐 썼지요. 베틀 앞에 바짝 다가갔습니다. 눈을 크게 떠 봤지요. 아무것도 보이지 않았습니다. 얼굴이 하얗게 질렸지요.〕 |
| `images/03-loom-2.webp` | A weaving room where an old minister stands before an empty loom praising it with a stiff smile while the two swindlers exchange a knowing glance behind him, hilariously awkward. 〔이 쪽에 실린 글 (6/14) — 그림에 글자는 넣지 마세요. 왼쪽: '내 눈에는 안 보이는구나.' '내가 어리석다는 뜻인가?' '아니면 자리에 안 맞는다는 뜻인가?' / 오른쪽: 참으로… 훌륭하구먼. 빛깔이 아주 곱네. 무늬도 나무랄 데가 없어.〕 |

## 4장 · 아무도 말하지 못했다

| 파일명 | 장면 |
|---|---|
| `images/04-nobody.webp` | A weaving room where a sweating young official praises an empty loom, and then a whole procession of courtiers behind an emperor entering the same room, the emperor's face draining of colour, comic horror. 〔이 쪽에 실린 글 (7/14) — 그림에 글자는 넣지 마세요. 왼쪽: 이번에는 젊은 관리가 갔습니다. 역시 아무것도 보이지 않았지요. 땀이 등을 타고 흘렀습니다. 무늬가 아주 새롭습니다. 빛깔도 눈이 부십니다. / 오른쪽: 드디어 임금님이 갔습니다. 신하들이 줄줄이 따랐지요. 방문이 열렸습니다. 임금님은 베틀을 보았지요. 눈앞이 캄캄해졌습니다. 신하들 앞이라 내색도 못 했습니다.〕 |
| `images/04-nobody-2.webp` | A weaving room packed with courtiers all nodding and praising an entirely empty loom, each glancing sideways at the others, the emperor loudest of all, absurd and funny. 〔이 쪽에 실린 글 (8/14) — 그림에 글자는 넣지 마세요. 왼쪽: '내가 어리석다는 말인가?' '임금 자리에 안 맞는다는 말인가?' '그럴 리가 없지, 그럴 리가!' 임금님이 크게 고개를 끄덕였습니다. 오, 참으로 아름답구나! / 오른쪽: 신하들도 따라 고개를 끄덕였지요. 과연! 훌륭합니다!〕 |

## 5장 · 옷을 입는 임금님

| 파일명 | 장면 |
|---|---|
| `images/05-dressing.webp` | A dressing chamber blazing with sixteen candles where two men mime tailoring in the air, then dress an emperor in nothing at all before tall mirrors, courtiers watching solemnly, hilarious. 〔이 쪽에 실린 글 (9/14) — 그림에 글자는 넣지 마세요. 왼쪽: 행진하는 날이 정해졌습니다. 두 사람은 밤을 새웠지요. 촛불을 열여섯 개나 켰습니다. 허공에 대고 바느질을 했지요. 아침에 손을 들어 보였습니다. 가위로 허공을 싹둑싹둑 자르기도 했지요. 다 지었습니다! / 오른쪽: 두 사람이 옷을 입혀 주었지요. 이건 윗도리입니다. 이건 바지고요.〕 |
| `images/05-dressing-2.webp` | A dressing chamber where an emperor turns before mirrors admiring nothing while four courtiers solemnly lift an invisible train behind him, everyone straight-faced, peak comedy. 〔이 쪽에 실린 글 (10/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님은 거울을 돌아봤습니다. 이쪽저쪽 몸을 틀어 봤지요. 거울에는 아무것도 없었습니다. 그래도 임금님은 웃었지요. 아주 잘 어울리는군. / 오른쪽: 뒷자락을 들어 드리겠습니다. 신하 넷이 허리를 굽혔지요. 허공을 두 손으로 받쳐 들었습니다. 아무것도 없는 자락이었지요.〕 |

## 6장 · 임금님이 벌거벗었다

| 파일명 | 장면 |
|---|---|
| `images/06-parade.webp` | A packed town street where an emperor parades in nothing at all under a canopy while crowds cheer and point at the imaginary robe, faces at every window, riotously funny. 〔이 쪽에 실린 글 (11/14) — 그림에 글자는 넣지 마세요. 왼쪽: 거리에 사람이 가득했습니다. 나팔이 울렸지요. 임금님이 걸어 나왔습니다. 사람들은 숨을 삼켰지요. 그러고는 한목소리로 외쳤습니다. 우아, 정말 곱다! / 오른쪽: 저런 옷은 처음 봐! 과연 임금님이시다! 누구도 안 보인다고 하지 않았지요. 그러면 어리석은 사람이 되니까요. 창문마다 사람이 매달렸습니다.〕 |
| `images/06-parade-2.webp` | A parade street where a small boy on his father's shoulders points and speaks plainly, the father clapping a hand over his mouth too late, the words rippling outward through the crowd, powerful and funny. 〔이 쪽에 실린 글 (12/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그때 작은 목소리가 났습니다. 아버지 어깨에 탄 아이였지요. 임금님이 벌거벗었어요! 아버지가 얼른 입을 막았습니다. / 오른쪽: 옆 사람이 그 말을 들었습니다. 저 아이가 뭐라 그랬지? 벌거벗었다는데?〕 |

## 7장 · 끝까지 걸어간 임금님

| 파일명 | 장면 |
|---|---|
| `images/07-ending.webp` | A parade street where an emperor, ears burning, straightens his back and keeps walking as laughter spreads, four courtiers still solemnly carrying an invisible train behind, comic and oddly dignified. 〔이 쪽에 실린 글 (13/14) — 그림에 글자는 넣지 마세요. 왼쪽: 임금님도 그 소리를 들었습니다. 얼굴이 화끈 달아올랐지요. '저 아이 말이 맞구나.' '다들 알고 있었구나.' / 오른쪽: 뒤돌아 뛰고 싶었지요. 하지만 그러지 않았습니다. 허리를 더 곧게 폈지요. 한 걸음, 또 한 걸음. 나팔 소리만 크게 울렸습니다.〕 |
| `images/07-ending-2.webp` | A quiet palace at night where an emperor closes wardrobe doors one by one, and next morning a small council room where he speaks plainly to relieved courtiers, warm and wry. 〔이 쪽에 실린 글 (14/14) — 그림에 글자는 넣지 마세요. 왼쪽: 그날 밤 궁궐은 조용했습니다. 두 사람은 이미 떠난 뒤였지요. 금실 자루도 함께 사라졌습니다. 임금님은 옷장 앞에 섰지요. 문을 하나씩 닫았습니다. 방이 어두워졌지요. 옷이 그렇게 많은데 입고 싶은 것이 없었습니다. / 오른쪽: 앞으로는 이렇게 하자. 보이면 보인다고 하라. 안 보이면 안 보인다고 하라.〕 |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
