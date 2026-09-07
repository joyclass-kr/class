/* 어려운 말에 풀이가 붙었는지 본다.

   그림책에는 소설처럼 낱말 뜻풀이 딱지(<span class="gloss">)가 없다.
   그래서 어려운 말은 글 안에서 풀어 주어야 한다. 이 책들이 쓰는 방식이다.

       과거는 벼슬아치를 뽑는 시험이었어요.
       사당은 조상을 모시는 작은 집인데, 사람 발길이 끊긴 지 오래였지요.
       이런 이야기를 소화(笑話)라고 합니다. 웃기려고 지은 이야기라는 뜻입니다.

   재는 방법은 이렇다. 어려운 말이 그 책에서 **처음 나오는 쪽**을 찾고,
   그 말이 든 문장과 바로 다음 문장에 풀이가 있는지 본다. 풀이는 말 뒤에
   올 수도 있고(「사당은 조상을 모시는 …」) 앞에 올 수도 있다
   (「지은이가 없는 구전 설화예요」). 둘 다 본다.

   처음 한 번만 본다. 같은 말이 뒤에 또 나오는 것은 흠이 아니다.

   기계는 후보만 낸다. 아이가 아는 말인지는 사람이 가린다. */
import fs from 'fs';

/* 처음에는 옛 살림 이름(지게·짚신·곳간·봇짐·멍석)까지 넣어 예순여덟 군데가
   걸렸는데, 열 개를 열어 보니 진짜는 둘이었다. 그런 말은 그림이 받쳐 주고
   앞뒤로 뜻이 짐작된다. 그래서 **짐작으로 알 수 없는 말**만 남겼다.
   이야기 갈래 이름, 벼슬과 제도 이름, 한자말이 그것이다. */
const 어려운말 = ('구전 설화|판본|유래담|소화|향가|의견|망두석|암행어사|아전|태수|승상|'
    + '소임|명부|부임|수양딸|공양미|정화수|마패|장원').split('|');

/* 풀이로 치는 말투 */
const 뒤풀이 = '(이에요|입니다|이지요|이랍니다|이었어요|였어요|이란|라는 뜻|라고 (하|부르|불|해)|말이(에요|지요|랍니다))';

const 책들 = process.argv.slice(2).filter(a => !a.startsWith('--'));
const 목록 = 책들.length ? 책들 : fs.readdirSync('.').filter(d => fs.existsSync(d + '/app.js'));

function 쪽들뽑기(src) {
    const out = [];
    const cov = src.indexOf('const COVER = {');
    if (cov >= 0) out.push(['표지', src.slice(cov, src.indexOf('\n};', cov))]);
    const i = src.indexOf('const CHAPTERS = [');
    if (i < 0) return null;
    let CH;
    try { CH = eval('(' + src.slice(src.indexOf('[', i), src.indexOf('\n];', i) + 2) + ')'); }
    catch (e) { return null; }
    const 글자 = v => Array.isArray(v) ? v.map(글자).join(' ')
        : (typeof v === 'string' ? v : (v && typeof v.t === 'string' ? v.t : ''));
    for (const c of CH) for (const b of c.beats || []) out.push([b.art, 글자(b.left) + ' ' + 글자(b.right)]);
    const af = src.indexOf('const AFTERWORD = {');
    if (af >= 0) out.push(['읽고 나서', src.slice(af, src.indexOf('\n};', af))]);
    return out;
}

function 풀었나(글, 말) {
    const 다 = 글.split(/(?<=[.!?])\s+/);
    const 문장 = [];
    다.forEach((s, i) => { if (s.includes(말)) { 문장.push(s); if (다[i + 1]) 문장.push(s + ' ' + 다[i + 1]); } });
    for (const s of 문장) {
        if (s.includes(말 + '(')) return true;                       // 소화(笑話)
        const 뒤 = s.split(말).slice(1).join(말);
        if (new RegExp('^[은는이가]?[^.!?]{0,34}' + 뒤풀이).test(뒤)) return true;
        const 앞 = s.split(말)[0];
        if (/(하는|짓는|뽑는|모시는|전해 온|없는|이라는|맡아보던|다니는|파는|타는|짜는|엮은|적은|기리는|쓰는|삼는|올리는|지내는|막는|캐는|긷는|알려 주는|풀어 주는|일 보던|몰래 보낸|구한 개|나라 서울|신라 서울|백제 서울)\s*$/.test(앞)) return true;
        if (/(이런|그런) 이야기를\s*$/.test(앞)) return true;
        if (/(곧|바로)\s*$/.test(앞)) return true;          // 「… 이야기, 곧 유래담」
        if (/[,·]\s*$/.test(앞) && /^[은는이가]?\s*(곧|바로)/.test(뒤)) return true;
    }
    return false;
}

let 후보 = 0, 본책 = 0;
for (const 책 of 목록) {
    const src = fs.readFileSync(책 + '/app.js', 'utf8');
    const 쪽들 = 쪽들뽑기(src);
    if (!쪽들 || !src.includes('beats:')) continue;                  // 동화틀만
    본책++;
    const 줄 = [];
    for (const 말 of 어려운말) {
        const 첫 = 쪽들.find(([, t]) => t.includes(말));
        if (!첫) continue;
        if (!풀었나(첫[1], 말)) { 줄.push('  ' + 말.padEnd(7) + ' 처음 나온 쪽: ' + 첫[0].replace('.webp', '')); 후보++; }
    }
    if (줄.length) console.log('■ ' + 책 + '\n' + 줄.join('\n'));
}
console.log('\n동화틀 ' + 본책 + '권 · 풀이가 없는 어려운 말 ' + 후보 + '군데.');
console.log('기계는 후보만 낸다. 아이가 아는 말인지는 눈으로 가린다.');
