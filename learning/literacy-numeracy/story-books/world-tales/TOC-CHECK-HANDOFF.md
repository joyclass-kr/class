# 차례 화면 점검 — 다른 방으로

세계명작 예순 권에서 찾아 고친 것입니다. 같은 틀을 쓰는 책이면 그대로 있을 가능성이 높습니다.

## 찾은 것 넷

1. **차례 글씨가 본문보다 작습니다.** `.toc-list strong { font-size: 14.5px; }`처럼 고정값인데,
   본문은 `clamp(14px, 2.315cqh, 24px)`로 화면이 커질수록 최대 24px까지 자랍니다.
   크롬북·아이패드처럼 큰 화면에서 차례만 유난히 작아 보입니다.

2. **오른쪽 칸 첫 줄이 왼쪽 칸 첫 줄과 높이가 안 맞습니다.**
   원인 둘: ① 왼쪽에만 "차례" 제목(h2)이 있어 두 칸 내용 높이가 다름
   ② 각 칸이 세로 중앙 정렬이라 높이가 다르면 중심도 달라 첫 줄이 어긋남.

3. **차례에 쪽수가 없습니다.** 책에는 이미 실제 쪽번호 체계(FOLIOS, 화면 아래 "3/18" 표시)가
   있는데 차례에는 안 씁니다. CSS에도 작은 글씨 자리(`.toc-list small`)가 이미 있는데
   비어 있습니다.

4. **장 제목 배너 글씨가 본문보다 큽니다.** (해당하면) `.spread-chapter-badge`의
   `font-size: clamp(13px, 2.605cqh, 27px)`가 본문 최대치(24px)보다도 큽니다.

## 세계명작에서 어떻게 고쳤는지

commit `acf454faf` (world-tales)에서 확인할 수 있습니다. 요점만 옮기면:

```css
/* ① 차례 글씨를 본문과 같은 크기로 */
.toc-list strong { font-size: clamp(14px, 2.315cqh, 24px); }
.toc-list small { font-size: clamp(11px, 1.7cqh, 15px); }

/* ② 오른쪽에도 안 보이는 "차례" 자리를 넣어 높이를 맞추고,
      차례 칸만 중앙 정렬 대신 위 정렬로 */
.toc-h2-ghost { visibility: hidden; }
.page-toc .story-page-left,
.page-toc .story-page-right { justify-content: flex-start; }

/* ④ 배너는 본문보다 작게 */
.spread-chapter-badge { font-size: clamp(12px, 1.9cqh, 19px); padding: 5px 14px 6px; }
```

```js
// ② JS 쪽: 오른쪽 칸에 유령 h2를 추가
// <h2 class="toc-h2-ghost" aria-hidden="true">차례</h2>

// ③ 쪽수: PAGES/FOLIOS는 이미 있으니 찾아서 붙이기만 하면 됩니다
const pageOf = num => {
    const idx = PAGES.findIndex(p => p.kind === 'spread' && p.chapter.num === num && p.isFirst);
    return idx >= 0 ? FOLIOS[idx].start : '';
};
// itemHtml 안에서: <small>${pageOf(s.num)}쪽</small>
```

**주의 — 파일 구조가 방마다 다릅니다.** 위 코드는 세계명작의 `p.chapter.num`
기준입니다. 소설틀은 `p.kind === 'chapter' && p.first && p.ch.num`처럼 속성 이름이
다를 수 있습니다(탈무드·예수님의 비유가 그 경우였습니다). 그대로 복사하지 말고
각자 `PAGES` 배열이 spread/chapter를 어떻게 저장하는지 먼저 확인하세요.

## 검사하는 법

책마다 브라우저에서 직접 열어 실측하는 게 제일 확실합니다.
좌우 첫 줄 `getBoundingClientRect().top`을 재서 같은 값인지 보면 됩니다.

```js
document.querySelector('.story-page-left .toc-list li:first-child button').getBoundingClientRect().top
document.querySelector('.story-page-right .toc-list li:first-child button').getBoundingClientRect().top
```

**미리 재 봤습니다.** 두 방 다 똑같은 문제가 있습니다.

- 명작소설: 42권 전부 `tocPage(part)` 구조, 차례 글씨 고정값 42/42, 쪽수·읽고나서 없음
- 전래동화: 62권 전부 차례 글씨 고정값 62/62, 배너(①) 있는 책 55/62 (`clamp(13px, 2.605cqh, 27px)` 그대로)
