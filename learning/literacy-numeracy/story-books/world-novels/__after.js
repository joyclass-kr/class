// 「읽고 나서」 펼침면만 따로 잰다. 재는 방식은 __lines.js 와 같다.
// PAGES 는 창에 붙어 있지 않으므로 eval 로 들여다본다.
window.__after = function (slug) {
  return new Promise(function (res) {
    var f = document.createElement('iframe');
    f.style.cssText = 'position:fixed;left:0;top:0;width:1280px;height:800px;opacity:0.01;pointer-events:none;z-index:-1;border:0;';
    f.src = slug + '/?v=' + Date.now();
    fetch(slug + '/app.js', { cache: 'reload' }).then(function () { document.body.appendChild(f); });
    f.onload = function () {
      setTimeout(function () {
        try {
          var w = f.contentWindow, d = f.contentDocument;
          var idx = JSON.parse(w.eval('JSON.stringify(PAGES.map(function(p,i){return p.kind===\'after\'?i:-1;}).filter(function(i){return i>=0;}))'));
          if (!idx.length) { res({ slug: slug, 없음: true }); f.remove(); return; }
          var rows = [], cap = 0;
          idx.forEach(function (i) {
            w.eval('current=' + i + '; paint();');
            var cols = d.querySelectorAll('#book .page-after .story-page-left, #book .page-after .story-page-right');
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
          });
          var txt = rows.filter(function (r) { return !r.그림; });
          var avg = function (a, k) { return a.length ? a.reduce(function (s, x) { return s + x[k]; }, 0) / a.length : 0; };
          res({
            slug: slug, 펼침: idx.length, 글쪽: txt.length,
            줄: +avg(txt, '줄').toFixed(1), 칸: +cap.toFixed(1),
            찬율: Math.round(avg(txt, '줄') / cap * 100),
            자: Math.round(avg(txt, '자')),
            낱쪽: rows.map(function (r) { return (r.그림 ? '그림' : '글') + r.줄.toFixed(1); }).join(' ')
          });
        } catch (e) { res({ slug: slug, err: String(e) }); }
        f.remove();
      }, 1200);
    };
  });
};
