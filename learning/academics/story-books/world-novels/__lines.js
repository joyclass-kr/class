// 쪽이 얼마나 찼는지 '줄'로 잰다. 전래동화 방에서 온 방식.
// scrollHeight 는 못 쓴다. 내용이 칸보다 작아도 칸 높이 밑으로 안 내려가서
// 늘 꽉 찬 것처럼 나온다. 자식들의 위아래 좌표로 직접 재야 한다.
//
// goTo() 는 넘김 시늉 때문에 230ms 뒤에야 다시 그린다.
// 그래서 current 를 바로 바꾸고 paint() 를 부른다.
window.__lines = function (slug) {
  return new Promise(function (res) {
    var f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;left:0;top:0;width:1280px;height:800px;opacity:0.01;pointer-events:none;z-index:-1;border:0;';
    f.src = slug + '/?v=' + Date.now();
    fetch(slug + '/app.js', { cache: 'reload' }).then(function () { document.body.appendChild(f); });
    f.onload = function () {
      setTimeout(function () {
        try {
          var w = f.contentWindow, d = f.contentDocument;
          var total = w.eval('PAGES.length');
          var rows = [], cap = 0;
          for (var i = 0; i < total; i++) {
            w.eval('current=' + i + '; paint();');
            var cols = d.querySelectorAll('#book .page-story .story-page-left, #book .page-story .story-page-right');
            for (var c = 0; c < cols.length; c++) {
              var el = cols[c];
              var p = el.querySelector('p'); if (!p) continue;
              var kids = Array.prototype.slice.call(el.children)
                .filter(function (x) { return x.getBoundingClientRect().height > 0; });
              if (!kids.length) continue;
              var lh = parseFloat(getComputedStyle(p).lineHeight);
              var cs = getComputedStyle(el);
              var top = Math.min.apply(null, kids.map(function (x) { return x.getBoundingClientRect().top; }));
              var bot = Math.max.apply(null, kids.map(function (x) { return x.getBoundingClientRect().bottom; }));
              cap = Math.max(cap, (el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)) / lh);
              rows.push({
                줄: (bot - top) / lh,
                자: el.textContent.replace(/\s/g, '').length,
                그림: !!el.querySelector('.story-art-top, .art-frame')
              });
            }
          }
          var txt = rows.filter(function (r) { return !r.그림; });
          var art = rows.filter(function (r) { return r.그림; });
          var avg = function (a, k) { return a.length ? a.reduce(function (s, x) { return s + x[k]; }, 0) / a.length : 0; };
          res({
            slug: slug, 쪽: rows.length,
            글쪽: txt.length, 글쪽줄: +avg(txt, '줄').toFixed(1), 글쪽자: Math.round(avg(txt, '자')),
            그림쪽: art.length, 그림쪽줄: +avg(art, '줄').toFixed(1), 그림쪽자: Math.round(avg(art, '자')),
            칸: +cap.toFixed(1),
            찬율: Math.round(avg(txt, '줄') / cap * 100)
          });
        } catch (e) { res({ slug: slug, err: String(e) }); }
        f.remove();
      }, 1200);
    };
  });
};
// 여러 권을 줄줄이 잰다: __linesAll(['a','b']).then(...)
window.__linesAll = function (list) {
  var out = [];
  return list.reduce(function (p, s) {
    return p.then(function () {
      return window.__lines(s).then(function (r) {
        out.push(r.err ? s + ' ERR ' + r.err
          : s + ' 글쪽 ' + r.글쪽줄 + '/' + r.칸 + '줄 (' + r.찬율 + '%) ' + r.글쪽자 + '자 · 그림쪽 ' + r.그림쪽줄 + '줄');
      });
    });
  }, Promise.resolve()).then(function () { return out.join('\n'); });
};
'installed';
