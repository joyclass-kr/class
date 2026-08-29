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

## 브라우저로 여는 검사기는 위(korea-tales)에 그대로 두었다

`_sweep-all.html`(62권 여섯 화면 넘침), `_novel-overflow.html`(소설틀),
`_anchor-check.html`, `_measure.html`, `_fill.html` 들은 `책이름/app.js`를
브라우저가 상대 경로로 읽으므로 옮기면 못 쓴다.
