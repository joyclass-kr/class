# 제미나이 주문서 — 전래동화 (2026-08-28)

`learning/literacy-numeracy/story-books/korea-tales/`

전체 62권 가운데 그림이 다 온 책 56권, 907장이 들어와 있습니다.
아래 세 묶음을 부탁드립니다. **① 규칙 → ② 다시 그릴 것 → ③ 빠진 것** 순서입니다.

---

## ① 먼저 읽어 주세요 — 악당은 재미있고 귀엽게

지금 들어온 그림에서 악당이 **혐오스럽게** 그려진 것이 여럿입니다.
주름진 얼굴, 튀어나온 눈, 벌린 입에 드러난 이입니다.

**과장이 문제가 아닙니다. 과장은 실컷 해 주세요.**
악당은 **보는 재미가 있어야** 합니다. 볼이 부풀고, 눈이 동그래지고,
때로는 빙빙 돌아가고, 땀방울이 튀는 그런 과장 말입니다.
**웃기면 되고 징그러우면 안 됩니다.**

**이것은 제미나이 잘못이 아니라 프롬프트 잘못이었습니다.** 예를 들어
흥부전 인물 설명이 이랬습니다.

    Nolbu's wife: a big loud woman with a red face, usually holding a rice paddle.

놀부에게는 "괴물이 아니다"라는 단서를 달아 두고 **아내에게는 안 달았습니다.**
그래서 흉하게 그릴 수밖에 없었습니다.

62권 프롬프트를 모두 고쳤습니다. 공통 스타일 지시문에 이 규칙이 들어갔습니다.

    Villains and unkind characters must be FUN to look at - comic, lively and cute,
    with big round expressive eyes and big exaggerated expressions. Exaggerate
    freely: puffed-up cheeks, enormous grins, comic sweat drops, tiny pupils when
    startled, whole body leaning into the gag. But never repulsive - no wrinkled
    scowling faces, no warts, no bared yellow teeth, no mean squinting slits, no
    ugly caricature. The reader should enjoy watching them and laugh at them, never
    be disgusted by them. A greedy character can be adorable; what is wrong with
    them shows in what they DO, not in an ugly face.

**다시 그리실 때 이 규칙이 든 새 프롬프트를 쓰셔야 합니다.**
각 책의 `IMAGE-PROMPTS.md`를 새로 받아 주세요.

### 특히 고친 인물 넷

| 책 | 인물 | 예전 | 지금 |
|---|---|---|---|
| 흥부전 | 놀부 아내 | 크고 시끄럽고 얼굴 붉은 여자 | 동그란 얼굴에 **큰 둥근 눈**, 화나면 볼이 부풀 대로 부푸는 |
| 구렁덩덩 신선비 | 언니 둘 | 비웃거나 엿보는, 작고 심술궂은 눈 | **셋째 딸만큼 귀엽게**, 둘이 똑같이 움직이는 게 대목 |
| 금도끼 은도끼 | 욕심쟁이 이웃 | 능글맞은 얼굴, 작고 굴리는 눈 | 금을 보면 **눈이 빙빙 돌아가는** 둥글둥글한 사람 |
| 콩쥐 팥쥐 | 팥쥐 | 통통하고 게으르고 뾰로통한 입 | **콩쥐만큼 귀엽게**, 샐쭉거리는 건 크고 웃기게 |

---

## ② 다시 그려 주세요

### 확인한 것 셋 (눈으로 보고 확정)

| 파일 | 무엇이 문제인가 |
|---|---|
| `heungbujeon/story-01-c` | 놀부 아내가 주름진 얼굴에 눈이 튀어나오고 입을 벌린 채 |
| `gureongdeongdeong/07-burn` | 언니 둘이 주름진 중년으로, 밖의 셋째 딸과 딴판 |
| `geumdokki-eundokki/10-greedy` | 욕심쟁이 이웃이 얼굴을 일그러뜨린 채 |

### 같은 규칙으로 다시 봐 주실 것 — 악당이 나오는 그림 전부

프롬프트에서 악당이 등장한다고 적힌 그림만 뽑았습니다. **얼굴이 흉하게
나온 것만** 다시 그려 주시면 됩니다. 웃기고 귀엽게 나온 것은 그대로 두세요.

    흥부전       story-02-a/b/c  story-04-a/b/c  story-05-a/b/c  story-06-a/b/c
    그늘을 산 사람  03-scold 04-buy 05-deal 07-enter 08-friends
                09-porch 10-beg 11-return 12-village
    반쪽이       04-jealous 05-tie 06-uproot 09-promise 10-excuse 12-wedding end
    빨간 부채     01-nap 02-red 04-feast 06-cure 07-trade 14-fall
    연이와 버들 도령 01-yeoni 02-order 08-suspect 09-follow 10-strike 11-flee
    요술 항아리    05-seize 06-gold 07-father 08-two 09-many 10-ruined
    곶감과 호랑이   07-mount 08-running 09-branch 10-flee
    도깨비 방망이   01-brothers 10-copy 11-caught 12-nose
    춘향전       story-04-c story-05-a story-07-a story-07-b
    콩쥐 팥쥐     story-01-a story-02-a story-03-b story-06-b
    구렁덩덩      04-marry
    금도끼 은도끼   09-copy
    주몽        06-princes
    옹고집전      story-02-a

---

## ③ 빠진 그림 — 이건 아직 안 왔습니다

### 한 권 통째로

**삼형제의 재주** (`samhyeongje-jaeju`) — **14장 전부**. 폴더가 비어 있습니다.

    01-brothers 02-depart 03-return 04-skills 05-hear 06-village
    07-run 08-cliff 09-aim 10-ready 11-catch 12-reward cover end

### 한두 장씩

| 책 | 빠진 그림 | 비고 |
|---|---|---|
| 반쪽이 `banjjogi` | `01-carp` | 이 자리에 `11-contest`와 **똑같은 파일**이 들어와 있어 지웠습니다 |
| 자린고비 `jaringobi` | `04-fan` | 이 자리에 `14-fish`와 **똑같은 파일**이 들어와 있어 지웠습니다 |
| 단군 `dangun` | `02-descend` | |
| 그늘을 산 사람 `geuneul-san-saram` | `08-friends` | |
| 석탈해 `seok-talhae` | `12-friend` | |

---

## 저장할 때 부탁

- **파일 이름을 `IMAGE-PROMPTS.md`에 적힌 그대로** 붙여 주세요.
  지난번에 이런 것들이 어긋나 손으로 맞췄습니다.

      01-market -> 01-stranger    07-peace -> 07-revealed
      06-reward -> 08-reward      08-end   -> end

  **앞의 번호를 마음대로 바꾸지 말아 주세요.** 번호가 어긋나면 그림이
  엉뚱한 쪽에 붙습니다.

- **같은 그림을 두 자리에 저장하지 말아 주세요.** 이번에 세 건 있었습니다.

- 규격 (`webp` 변환은 저희가 합니다)

  | 자리 | 비율 | 크기 예 |
  |---|---|---|
  | 표지 `cover` | 세로 2 : 3 | 848 x 1264 |
  | 동화틀 장면·`end` | 가로 16 : 9 | 1376 x 768 |
  | 소설틀 장면·`end` | 가로 4 : 3 | 1200 x 900 |

  소설틀은 그림 이름이 `story-`로 시작하는 책입니다 — 흥부전, 춘향전,
  홍길동전, 심청전, 옹고집전, 토끼전, 콩쥐 팥쥐입니다.
