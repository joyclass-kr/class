window.__chk3 = function (slug) {
  return new Promise(function (resolve) {
    var old = document.getElementById('__probeframe');
    if (old) old.remove();
    var f = document.createElement('iframe');
    f.id = '__probeframe';
    f.style.cssText = 'position:fixed;left:0;top:0;width:1280px;height:800px;opacity:0.01;pointer-events:none;z-index:-1;border:0;';
    f.src = slug + '/?v=' + Date.now();
    // 브라우저가 app.js 를 캐시해 두면 고친 글이 반영되지 않는다. 먼저 새로 받는다.
    Promise.all([
      fetch(slug + '/app.js', { cache: 'reload' }),
      fetch(slug + '/styles.css', { cache: 'reload' })
    ]).then(function () { document.body.appendChild(f); });
    f.onload = function () {
      setTimeout(function () {
        try {
          var w = f.contentWindow;
          if (!w.makeProbe) return resolve({ err: 'no makeProbe' });
          var P = w.eval('PROBE = makeProbe()');
          var usable = P.usable, headH = P.headHeight;
          var underArt = Math.max(60, usable - P.artHeight);
          var rows = [];
          var CH=w.eval('CHAPTERS'), SEGS=w.eval('CHAPTER_SEGS'), LAB=w.eval('CHAPTER_LABEL');
          CH.forEach(function (ch, ci) {
            var spreads = w.paginateChapter(ch, ci);
            var segs = SEGS[ci];
            var head = '<h2>' + LAB(ch.num) + ch.title + '</h2>';
            var used = 0, cap = 0, n = 0, over = 0;
            spreads.forEach(function (sp, si) {
              [sp.left, sp.right].forEach(function (rg, k) {
                var isArt = sp.art && k === 1;
                var c = isArt ? underArt : usable;
                var first = (si === 0 && k === 0);
                var h = P.measure((first ? head : '') + w.runHtml(segs, rg[0], rg[1]));
                used += h; cap += c; n++;
                if (h > c + 1) over++;
              });
            });
            var chars = ch.paras.join('').replace(/<[^>]+>/g, '').length;
            var fill = Math.round(used / cap * 100);
            var sp3 = spreads.length;
            rows.push({
              ch: ch.num, n: sp3, pages: n, chars: chars, fill: fill, over: over,
              t3: Math.round(chars * 88 / Math.max(fill, 1)),
              t4: Math.round(chars * 88 / Math.max(fill, 1))
            });
          });
          P.close();
          resolve({ u: usable, ua: underArt, rows: rows });
        } catch (e) { resolve({ err: String(e) }); }
      }, 700);
    };
  });
};
window.__scan = function (list) {
  var out = [];
  return list.reduce(function (p, s) {
    return p.then(function () {
      return window.__chk3(s).then(function (r) {
        if (r.err) { out.push(s + ' ERR ' + r.err); return; }
        var avg = Math.round(r.rows.reduce(function (a, b) { return a + b.fill; }, 0) / r.rows.length);
        var over = r.rows.reduce(function (a, b) { return a + b.over; }, 0);
        var lo = Math.min.apply(null, r.rows.map(function (x) { return x.fill; }));
        out.push(s + ' avg=' + avg + ' min=' + lo + ' over=' + over);
      });
    });
  }, Promise.resolve()).then(function () { return out.join('\n'); });
};
'installed';
