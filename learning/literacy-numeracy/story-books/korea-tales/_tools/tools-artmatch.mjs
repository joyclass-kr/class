/* 그림 지시문과 본문이 어긋나는 자리를 찾는다.

   그림 자체는 볼 수 없다. 볼 수 있는 것은 그림을 그리라고 적어 둔 글이다.
   지시문에는 moonlight, waddles away 같은 말이 그대로 적혀 있으니,
   그 펼침면 본문과 맞대면 「글은 달이 없다는데 그림에는 달이 있다」,
   「글은 거위를 매어 두었다는데 그림에서는 걸어 나간다」 같은 어긋남은 잡힌다.

   처음에 잣대 일곱 개로 만들었더니 열네 군데가 걸렸는데 열어 보니
   진짜는 하나뿐이었다. 맨발과 매어 둔 짐승은 그림에 그런 것이 있다고
   해서 본문에 그 말이 있어야 하는 게 아니었다. 잣대가 고장 난 것이다.
   그래서 「본문에 없다」로는 걸지 않고, 본문이 아니라고 말한 것만 건다.

   「본문은 검게 탔다는데 지시문에 그 말이 없다」는 잣대도 만들어 봤다가 뺐다.
   누렁이 그림에서 시험해 보니 들판이 blackened라 지시문 쪽이 먼저 걸려서
   정작 개의 털은 보지 못했다. 제 짝한테서도 안 짖는 잣대는 두지 않는다.

   소설틀은 재지 않는다. 소설은 그림 한 장이 장 전체를 받으므로, 장 어딘가에
   밤이 나온다고 해서 그 그림이 밤인 것은 아니다. 실제로 춘향전이 그렇게 걸렸다.

   기계는 후보만 낸다. 그림 자체는 못 본다. 걸린 쪽은 열어 눈으로 본다. */
import fs from 'fs';

/* 밤이 밝은지 어두운지는 그 쪽 글이 딱 잘라 말한 때만 본다.
   「한밤중에 누가 잡아다 놓았다」처럼 지나가는 말로 밤이 나오는 쪽은
   장면이 아침일 수 있으므로 아침·낮을 가리키는 말이 함께 있으면 뺀다. */
const 아침낮 = /아침|한낮|대낮|낮이 되|해가 뜨|해가 오르|날이 밝|이튿날/;
const 밤그림 = /at night|night scene|midnight|moonlit|moonlight|indigo night|dark|lantern/i;

const 잣대 = [
    {
        이름: '달·별',
        말: '본문은 달도 별도 없다는데 지시문은 달빛 밤이다',
        재기: (그림, 글) =>
            /moonlit|moonlight|full moon|crescent|sliver of moon|stars above|starlit|starry/i.test(그림)
            && /달[도이가은]? ?없|별빛?도 없|달빛 한 점|칠흑|앞뒤를 분간할 수 없|한 치 앞도/.test(글),
    },
    {
        이름: '달 없는 밤',
        말: '지시문은 달 없는 밤인데 본문에 달빛이 있다',
        재기: (그림, 글) =>
            /no moon|moonless|without a moon|no stars/i.test(그림)
            && /달빛|달[이도]? ?밝|보름달|초승달|별빛이/.test(글),
    },
    {
        이름: '낮과 밤',
        말: '본문은 한밤중인데 지시문은 낮이나 아침뿐이다',
        재기: (그림, 글) =>
            /golden afternoon|sunny|midday|noon light|bright daylight|morning light|dawn light/i.test(그림)
            && !밤그림.test(그림)
            && /한밤중|깊은 밤|밤이 깊|자정 무렵/.test(글) && !아침낮.test(글),
    },
    {
        이름: '매어 둔 짐승',
        말: '본문은 짐승을 매어 두었다는데 지시문에서는 그 짐승이 걸어 나간다',
        재기: (그림, 글) =>
            /(거위|누렁이|나귀|염소|송아지|말|소|개)[가를은는]? ?[^.]{0,12}(매어|매인|묶어|묶인)/.test(글)
            && /(waddles?|walks?|wanders?|trots?|runs?|strolls?) (away|off)|has (wandered|walked) off/i.test(그림),
    },
];

const 책들 = process.argv.slice(2).filter(a => !a.startsWith('--'));
const 목록 = (책들.length ? 책들 : fs.readdirSync('.').filter(d => fs.existsSync(d + '/app.js')));

function 지시문읽기(책) {
    const p = 책 + '/IMAGE-PROMPTS.md';
    if (!fs.existsSync(p)) return null;
    const 칸 = new Map();
    for (const c of fs.readFileSync(p, 'utf8').split(/^### /m).slice(1)) {
        const m = c.match(/^`([^`]+\.webp)`/);
        if (m) 칸.set(m[1], c);
    }
    return 칸;
}

function 본문읽기(책) {
    const s = fs.readFileSync(책 + '/app.js', 'utf8');
    const i = s.indexOf('const CHAPTERS = [');
    if (i < 0) return null;
    let CH;
    try { CH = eval('(' + s.slice(s.indexOf('[', i), s.indexOf('\n];', i) + 2) + ')'); }
    catch (e) { return null; }
    const 글자 = v => Array.isArray(v) ? v.map(글자).join(' ')
        : (typeof v === 'string' ? v : (v && typeof v.t === 'string' ? v.t : ''));
    const 칸 = new Map();
    for (const c of CH) {
        for (const b of c.beats || []) if (b.art) 칸.set(b.art, 글자(b.left) + ' ' + 글자(b.right));
    }
    return 칸;
}

let 걸린것 = 0, 본책 = 0, 본칸 = 0;
for (const 책 of 목록) {
    const 지시 = 지시문읽기(책), 본문 = 본문읽기(책);
    if (!지시 || !본문) continue;
    본책++;
    const 줄 = [];
    for (const [그림, 글] of 본문) {
        const 지시글 = 지시.get(그림);
        if (!지시글) continue;
        본칸++;
        for (const r of 잣대) {
            if (r.재기(지시글, 글)) { 줄.push('  ' + 그림.padEnd(20) + '[' + r.이름 + '] ' + r.말); 걸린것++; }
        }
    }
    if (줄.length) console.log('■ ' + 책 + '\n' + 줄.join('\n'));
}
console.log('\n책 ' + 본책 + '권 · 그림 ' + 본칸 + '칸을 지시문과 맞대 봤다. 후보 ' + 걸린것 + '군데.');
console.log('기계는 후보만 낸다. 그림 자체는 못 본다. 걸린 쪽은 열어서 눈으로 본다.');
