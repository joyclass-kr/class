# 도구

한 번 쓰고 마는 스크립트를 여기로 몰아넣었다. **korea-tales 폴더에서**
경로를 붙여 부른다.

    python _tools/tools-verify-all.mjs      (X)
    node _tools/tools-verify-all.mjs        (O)
    python _tools/dup.py                    (O)

책 폴더를 `책이름/app.js`로 상대 경로로 여니, **반드시 korea-tales
폴더에서 실행해야 한다.**

## 늘 쓰는 것

| 도구 | 하는 일 |
|---|---|
| `dup.py` | 62권에서 비슷한 문장이 붙어 있는 곳을 찾는다 |
| `quote.py` | 큰따옴표 **안에** 서술이 들어간 곳을 찾는다 |
| `read.py <책>` | 동화틀 본문을 펼침면마다 L/R 번호를 붙여 보여 준다 |
| `readn.py <책> [장 장]` | 소설 본문을 문단 번호와 함께 보여 준다 |
| `anchor.py` | 소설 그림 닻이 본문에 살아 있는지 본다 (글 고친 뒤 꼭) |
| `imgcheck.py` | 그림 짝맞춤·안 쓰는 그림·겹친 그림을 센다 |
| `tools-verify-all.mjs` | 전체 검사 |
| `tools-quizleak.py` | 문항 답이 본문에 그대로 있는지 본다 |
| `enwords.py [책]` | 영어판 단어장을 본다 (영어판 있는 책만) |

## 영어판을 붙일 때

`enwords.py` 는 네 가지를 본다. 영어 원고를 고치면 반드시 다시 돌린다.

1. **기본형 없음** — `held back a laugh` 만 적으면 `hold` 가 기본형인 줄 모른다.
   본문에 나온 꼴을 앞에 적고 기본형을 괄호에 넣는다 → `held back a laugh (hold back)`
2. **예문이 본문에 없음** — 본문을 고치고 단어장 예문을 안 고치면 여기서 걸린다.
   예문은 본문에 실제로 있는 구절이라야 한다.
3. **낱말이 하나도 없는 쪽** — 표지·펼침면·읽고 나서마다 그 쪽 글의 낱말이 있어야 한다.
4. **같은 낱말이 두 번**

불규칙 변화가 특히 잘 빠진다 — held, went, caught, made, told, lost, felt, kept, eaten, seen.

### 소설틀(쪽을 재어 나누는 책)에 붙일 때 조심할 것

동화틀은 쪽이 미리 정해져 있지만 소설틀은 열 때마다 재어서 나눈다.
그래서 **재기 전에 글꼴 규칙이 먼저 걸려 있어야 한다.**

1. `let LANG = ...` 바로 밑에서 `document.documentElement.lang = LANG` 를 걸어 둔다.
   첫 `buildPages()` 가 그 위에서 돌기 때문이다. 늦게 걸면 영어 글을 한글 글꼴로 재게 되어
   흥부전에서 쪽이 55쪽과 61쪽으로 어긋났다.
2. 말을 바꾸는 단추에서도 `applyLang()` 을 `rebuildPages()` **앞에** 둔다. 같은 까닭이다.
3. 다시 나누기 전에 단어장 화면을 접는다(`rebuildPages`). 아래 화면이 펼쳐진 채로 재면
   문서가 길어져 세로 막대가 생기고 그만큼 칸이 좁아진다.
4. 단어장은 장마다(`ch1`…) 묶고, 화면에는 그 쪽에 실제로 나온 것만 골라 보여 준다.
   쪽이 미리 정해져 있지 않으니 쪽마다 묶을 수가 없다.
5. `artAt` 닻은 영어 문장으로 새로 잡는다. 대문자까지 본문과 똑같아야 한다.

## 브라우저로 여는 검사기는 위(korea-tales)에 그대로 두었다

`_sweep-all.html`(62권 여섯 화면 넘침), `_novel-overflow.html`(소설틀),
`_anchor-check.html`, `_measure.html`, `_fill.html` 들은 `책이름/app.js`를
브라우저가 상대 경로로 읽으므로 옮기면 못 쓴다.
