# 제미나이 그림 프롬프트

이 책은 하나의 이야기를 8개의 장(챕터)으로 나눠 담았고, 각 장마다 그림이
**한 장**이에요. 그림이 펼침면 전체 폭을 가득 채우고, 그 아래에 이야기가
왼쪽·오른쪽으로 나뉘어 들어갑니다.

아래 프롬프트를 제미나이에 그대로 넣어서 생성한 뒤, 파일명을 정확히 맞춰서
`images/` 폴더에 저장하면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보여요.)

권장 크기: **본문 그림은 가로 2 : 세로 1 비율**(가로로 아주 길쭉한 모양)로 만들어 주세요, PNG. 펼침면 전체 폭을 채우는 자리라 이렇게 길어야 잘리지 않아요. **표지(`cover.png`)는 세로 2 : 3 비율**, 마무리(`end.png`)는 가로 3 : 세로 2 정도면 됩니다.

마지막 장의 그림만 아래에 교훈 한 줄이 더 붙는 자리 때문에 위아래가 조금
잘려 나갑니다. 그림은 똑같이 2:1로 만들되, 중요한 것(얼굴 등)은 너무
위쪽이나 아래쪽에 두지 말고 가운데에 놓아 주세요.

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 사용하세요)

```
Children's picture book illustration, bright cheerful cartoon-animation style,
bold clean outlines, saturated storybook colors, warm woodland morning light, no
text or letters in the image, a log cottage in a birch forest with three of
everything in three sizes, very expressive comic faces, wide panoramic
composition, funny and never frightening.
```

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Goldilocks: a small girl about 6 with bouncy golden curls, a red pinafore and
grass-stained knees. Father Bear: a huge brown bear in a waistcoat with a
booming voice. Mother Bear: a middling bear in an apron and spectacles. Baby
Bear: a small round bear cub with a bib, easily upset and very expressive.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: a cosy log cottage interior seen from the doorway with three bowls of porridge on a table — big, middle and tiny — and a small girl with golden curls peeking in, sunlight through the door, charming and inviting. |
| `images/end.png` | A closed storybook resting under a starry night sky with soft golden sparkles rising from its pages, peaceful and warm closing scene. |

## 1장 · 너무 뜨거운 죽

| 파일명 | 장면 |
|---|---|
| `images/01-porridge.png` | A cosy log cottage kitchen where three bowls of steaming porridge sit in three sizes and a small bear cub recoils with its tongue out, parent bears laughing, warm morning light. |

## 2장 · 문이 열려 있어

| 파일명 | 장면 |
|---|---|
| `images/02-door.png` | A birch forest clearing where a small girl with golden curls pushes open the door of a log cottage and peeks inside, wildflowers and dappled light, curious and a little sneaky. |

## 3장 · 세 그릇의 죽

| 파일명 | 장면 |
|---|---|
| `images/03-bowls.png` | A table with three porridge bowls in three sizes where a girl grimaces at the big one, frowns at the middle one, and beams while scraping the tiny one clean, comic sequence in one wide scene. |

## 4장 · 세 개의 의자

| 파일명 | 장면 |
|---|---|
| `images/04-chairs.png` | A cottage parlour with three chairs in three sizes where a girl swings her legs happily in the smallest one just as it splinters beneath her, splinters flying, hilariously comic. |

## 5장 · 세 개의 침대

| 파일명 | 장면 |
|---|---|
| `images/05-beds.png` | A sunlit attic bedroom with three beds in three sizes, a small girl curled fast asleep in the tiniest one clutching a patchwork quilt, peaceful and sweet. |

## 6장 · 돌아온 곰들

| 파일명 | 장면 |
|---|---|
| `images/06-return.png` | Three bears of three sizes standing around their table staring at disturbed porridge bowls, the smallest bear holding up an empty bowl with a trembling lip, very funny and expressive. |

## 7장 · 부서진 의자

| 파일명 | 장면 |
|---|---|
| `images/07-broken.png` | A cottage parlour where three bears discover a smashed little chair, the cub wailing over the pieces, and then all three creeping up a narrow staircase, comic suspense. |

## 8장 · 눈이 딱 마주쳐서

| 파일명 | 장면 |
|---|---|
| `images/08-ending.png` | An attic bedroom where three astonished bears stare at a girl sitting bolt upright in the smallest bed, and in the same wide scene she leaps out the window and sprints into the birch forest, hilarious and lively. |

## 사용 팁

- 이미지가 준비되기 전에도 페이지는 이모지로 예쁘게 보여요. 준비되는 대로 하나씩 교체하면 됩니다.
- 그림체를 통일하려면 공통 스타일 지시문을 매번 그대로 붙여넣는 게 중요해요.
- 파일명이 정확히 일치해야 자동으로 표시됩니다 (대소문자 포함).
- 이미지를 다 저장하고 나면 파일 형식은 신경 쓰지 마세요 — 용량을 줄이는 webp 변환은 Claude가 알아서 처리해줍니다.
