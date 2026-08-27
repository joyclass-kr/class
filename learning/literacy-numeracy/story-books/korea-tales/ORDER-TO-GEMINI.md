# 제미나이 주문서 — 전래동화 (2026-08-28)

`learning/literacy-numeracy/story-books/korea-tales/`

전체 62권 가운데 그림이 다 온 책 56권, 907장이 들어와 있습니다.
아래 세 묶음을 부탁드립니다. **① 규칙 → ② 다시 그릴 것 → ③ 빠진 것** 순서입니다.

---

## ① 먼저 읽어 주세요 — 악당을 흉하게 그리지 마세요

지금 들어온 그림에서 악당이 **혐오스럽게** 그려진 것이 여럿입니다.
주름진 얼굴, 튀어나온 눈, 벌린 입에 드러난 이, 심술궂게 찡그린 눈매입니다.

**이것은 제미나이 잘못이 아니라 프롬프트 잘못이었습니다.** 예를 들어
흥부전 인물 설명에 이렇게 적혀 있었습니다.

    Nolbu's wife: a big loud woman with a red face, usually holding a rice paddle.

놀부에게는 "괴물이 아니라 속 좁고 겁 많은 사람"이라는 단서를 달아 두고
**아내에게는 안 달았습니다.** 그래서 흉하게 그릴 수밖에 없었습니다.

62권 프롬프트를 모두 고쳤습니다. 공통 스타일 지시문에 이 규칙이 들어갔습니다.

    Villains and unkind characters are drawn as ordinary, nice-looking people -
    never grotesque, never ugly, no mean squinting eyes, no warts, no snarling
    teeth. What is wrong with them shows only in what they are doing and in their
    posture, never in a deformed or repulsive face. A cruel character may be
    handsome; a kind one may be plain.

**다시 그리실 때 이 규칙이 들어간 새 프롬프트를 쓰셔야 합니다.**
각 책의 `IMAGE-PROMPTS.md`를 새로 받아 주세요.

### 특히 고친 인물 넷

| 책 | 인물 | 예전 | 지금 |
|---|---|---|---|
| 흥부전 | 놀부 아내 | big loud woman with a red face | 좋은 비단옷, 단정한 머리, **평범하고 보기 좋은 얼굴** |
| 구렁덩덩 신선비 | 언니 둘 | sneering or peeking, small mean eyes | **셋째 딸만큼 예쁘게**, 심술은 행동으로만 |
| 금도끼 은도끼 | 욕심쟁이 이웃 | smug face, small darting eyes | **잘생긴 열린 얼굴**, 욕심은 몸짓으로만 |
| 콩쥐 팥쥐 | 팥쥐 | plump and idle, a sulky mouth | **콩쥐만큼 예쁘게** |

---

## ② 다시 그려 주세요

### 확인한 것 셋 (눈으로 보고 확정)

| 파일 | 무엇이 문제인가 |
|---|---|
| `heungbujeon/story-01-c` | 놀부 아내가 주름진 얼굴에 눈이 튀어나오고 입을 벌린 채 그려짐 |
| `gureongdeongdeong/07-burn` | 언니 둘이 주름지고 심술궂은 중년으로, 밖의 셋째 딸과 딴판 |
| `geumdokki-eundokki/10-greedy` | 욕심쟁이 이웃이 얼굴을 일그러뜨린 채 그려짐 |

### 같은 규칙으로 다시 봐 주실 것 — 악당이 나오는 그림 전부

프롬프트에서 악당이 등장한다고 적힌 그림만 뽑았습니다. **얼굴이 흉하게
나온 것만** 다시 그려 주시면 됩니다. 멀쩡한 것은 그대로 두셔도 됩니다.

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

- 규격 (`webp`, 품질은 저희가 맞춥니다)

  | 자리 | 비율 | 크기 예 |
  |---|---|---|
  | 표지 `cover` | 세로 2 : 3 | 848 x 1264 |
  | 동화틀 장면·`end` | 가로 16 : 9 | 1376 x 768 |
  | 소설틀 장면·`end` | 가로 4 : 3 | 1200 x 900 |

  소설틀은 그림 이름이 `story-`로 시작하는 책입니다 — 흥부전, 춘향전,
  홍길동전, 심청전, 옹고집전, 토끼전, 콩쥐 팥쥐입니다.
