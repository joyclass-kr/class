import fs from 'node:fs';
import path from 'node:path';

const sourcePath = path.join(import.meta.dirname, 'hanja-grade6-extension-candidates.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8')).characters;
const officialExampleRows = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'hanja-krdict-examples.json'), 'utf8'));
const normalizeHanja = (value) => value.normalize('NFKC').replace(/[\s^]/g, '');
const officialExamples = new Map(officialExampleRows.map((row) => [`${row.term}|${normalizeHanja(row.hanja)}`, row]));
const exampleOverrides = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'hanja-example-overrides.json'), 'utf8'));

const initialSoundVariants = new Map([
  ['녀', '여'], ['뇨', '요'], ['뉴', '유'], ['니', '이'],
  ['라', '나'], ['래', '내'], ['로', '노'], ['뢰', '뇌'], ['루', '누'],
  ['락', '낙'], ['란', '난'], ['람', '남'], ['랑', '낭'], ['략', '약'],
  ['려', '여'], ['력', '역'], ['련', '연'], ['렬', '열'], ['렴', '염'], ['렵', '엽'], ['령', '영'], ['례', '예'],
  ['료', '요'], ['록', '녹'], ['론', '논'], ['롱', '농'], ['류', '유'], ['륙', '육'], ['륜', '윤'], ['률', '율'],
  ['리', '이'], ['린', '인'], ['림', '임'], ['립', '입']
]);

const T = (term, hanja, sentence = '') => ({ term, hanja, sentence });
const preferred = {
  米:[T('현미','玄米'),T('백미','白米'),T('정미','精米')],
  夫:[T('공부','工夫'),T('부인','夫人'),T('부부','夫婦')],
  美:[T('미국','美國'),T('미술','美術'),T('미인','美人')],
  班:[T('반장','班長'),T('반별','班別'),T('반원','班員')],
  病:[T('병원','病院'),T('질병','疾病'),T('병세','病勢')],
  事:[T('사실','事實'),T('사건','事件'),T('사업','事業')],
  樹:[T('수립','樹立'),T('수목','樹木'),T('수지','樹脂'),T('가로수','街路樹')],
  術:[T('기술','技術'),T('예술','藝術'),T('수술','手術')],
  始:[T('시작','始作'),T('개시','開始'),T('시동','始動')],
  信:[T('통신','通信'),T('신호','信號'),T('신뢰','信賴')],
  洋:[T('서양','西洋'),T('해양','海洋'),T('동양','東洋')],
  陽:[T('태양','太陽'),T('양지','陽地'),T('석양','夕陽')],
  英:[T('영어','英語'),T('영국','英國'),T('영문','英文')],
  用:[T('사용','使用'),T('이용','利用'),T('적용','適用')],
  主:[T('주장','主張'),T('주요','主要'),T('주인','主人')],
  紙:[T('편지','便紙'),T('한지','韓紙'),T('폐지','廢紙')],
  海:[T('해외','海外'),T('해변','海邊'),T('해군','海軍'),T('해양','海洋')],
  苦:[T('고민','苦悶'),T('고통','苦痛'),T('고생','苦生'),T('고난','苦難')],
  果:[T('결과','結果'),T('효과','效果'),T('과실','果實'),T('성과','成果')],
  科:[T('과학','科學'),T('학과','學科'),T('교과','敎科'),T('과목','科目')],
  待:[T('기대','期待'),T('초대','招待'),T('대기','待機'),T('접대','接待')],
  勇:[T('용기','勇氣'),T('용감','勇敢'),T('용사','勇士')],
  定:[T('결정','決定'),T('예정','豫定'),T('확정','確定'),T('지정','指定')],
  注:[T('주의','注意'),T('주목','注目'),T('주입','注入'),T('집중','集中')],
  重:[T('중요','重要'),T('존중','尊重'),T('신중','愼重'),T('비중','比重')],
  親:[T('친구','親舊'),T('친절','親切'),T('친척','親戚'),T('친목','親睦')],
  郡:[T('군청','郡廳'),T('군민','郡民'),T('군수','郡守'),T('군립','郡立')],
  圖:[T('지도','地圖'),T('도표','圖表'),T('도형','圖形'),T('도서','圖書')],
  李:[T('이씨','李氏','가계 기록에서 이씨 성을 가진 인물을 확인했습니다.'),T('이조','李朝','이조는 조선 왕조를 가리키던 옛 표현으로 역사 문헌에서 확인할 수 있습니다.'),T('이순신','李舜臣','이순신의 기록을 읽고 당시 해전의 전략을 정리했습니다.')],
  半:[T('절반','折半'),T('한반도','韓半島'),T('반반','半半'),T('전반','前半')],
  京:[T('경기도','京畿道'),T('상경','上京'),T('경성','京城'),T('북경','北京')],
  界:[T('세계','世界'),T('업계','業界'),T('경계','境界'),T('한계','限界')],
  度:[T('정도','程度'),T('제도','制度'),T('속도','速度')],
  洞:[T('동굴','洞窟'),T('동구','洞口'),T('동공','洞孔')],
  童:[T('아동','兒童'),T('동안','童顔'),T('목동','牧童')],
  頭:[T('선두','先頭'),T('두뇌','頭腦'),T('구두','口頭')],
  等:[T('고등','高等'),T('초등','初等'),T('등급','等級')],
  禮:[T('예절','禮節'),T('무례','無禮'),T('예의','禮儀')],
  朴:[T('박씨','朴氏','인물 관계도에서 박씨 성을 가진 사람을 표시했습니다.'),T('박지원','朴趾源','박지원의 글에서 당시 사회를 비판한 대목을 찾았습니다.'),T('소박','素朴','작품의 소박한 표현이 주제에 미친 효과를 설명했습니다.')],
  白:[T('백색','白色'),T('백지','白紙'),T('결백','潔白')],
  死:[T('사망','死亡'),T('전사','戰死'),T('사인','死因')],
  夕:[T('추석','秋夕','추석의 유래와 시대별 풍습 변화를 조사했습니다.'),T('석양','夕陽','관찰 기록에 석양의 위치와 색 변화를 적었습니다.'),T('조석','朝夕','고문에서 조석이 아침과 저녁을 함께 이르는지 확인했습니다.')],
  姓:[T('성씨','姓氏'),T('동성','同姓'),T('성명','姓名')],
  省:[T('반성','反省'),T('성찰','省察'),T('내성','內省')],
  勝:[T('승리','勝利'),T('우승','優勝'),T('승부','勝負')],
  有:[T('유명','有名'),T('소유','所有'),T('유무','有無')],
  油:[T('석유','石油'),T('유전','油田'),T('유성','油性')],
  衣:[T('의상','衣裳'),T('의류','衣類'),T('의복','衣服')],
  者:[T('환자','患者'),T('기자','記者'),T('피해자','被害者')],
  昨:[T('작년','昨年','작년과 올해의 기온 자료를 같은 기준으로 비교했습니다.'),T('재작년','再昨年','재작년부터 이어진 인구 변화를 그래프로 나타냈습니다.'),T('작일','昨日','공문에서 작일이 어제를 뜻하는 표현인지 확인했습니다.')],
  章:[T('문장','文章'),T('헌장','憲章'),T('훈장','勳章')],
  第:[T('제일','第一'),T('급제','及第'),T('제삼','第三')],
  祖:[T('조국','祖國'),T('조상','祖上'),T('원조','元祖')],
  晝:[T('주간','晝間','주간과 야간의 교통량 차이를 시간대별로 비교했습니다.'),T('주야','晝夜','주야 기온 차이가 큰 지역의 기후 특성을 조사했습니다.'),T('백주','白晝','소설에서 백주가 환한 대낮을 가리키는지 문맥으로 판단했습니다.')],
  直:[T('직접','直接'),T('직전','直前'),T('솔직','率直')],
  花:[T('화단','花壇'),T('화분','花盆'),T('국화','菊花')],
  黃:[T('황금','黃金'),T('황색','黃色'),T('황혼','黃昏')]
};

const manualDistractor = {
  本:T('본드','接着劑','목재를 붙일 때 사용할 본드의 접착력을 비교했습니다.'),
  言:T('언문','諺文','옛 문헌에서 언문이라는 명칭이 쓰인 배경을 살펴봤습니다.'),
  邑:T('읍소','泣訴','고전에서 억울함을 읍소하는 장면의 표현을 분석했습니다.'),
  親:T('친칠라','외래어','친칠라는 안데스산맥의 바위 지대에 사는 설치류로 촘촘한 털을 지녔습니다.'),
  特:T('사특','邪慝','고전에서 사특한 마음을 경계하는 대목을 찾아 읽었습니다.'),
  夕:T('석사','碩士','대학원에서 석사 학위를 받은 연구자의 발표를 들었습니다.'),
  席:T('석사','碩士','대학원에서 석사 학위를 받은 연구자의 발표를 들었습니다.'),
  石:T('석사','碩士','대학원에서 석사 학위를 받은 연구자의 발표를 들었습니다.'),
  業:T('업다','고유어','‘업다’는 사람이나 물건을 등에 올린다는 뜻의 고유어입니다.'),
  不:T('불교','佛敎','불교는 인도에서 시작되어 동아시아 여러 지역으로 전해졌습니다.'),
  事:T('사과','謝過','그는 자신의 잘못을 인정하고 피해자에게 정중히 사과했습니다.'),
  死:T('사과','謝過','그는 자신의 잘못을 인정하고 피해자에게 정중히 사과했습니다.'),
  社:T('사과','謝過','그는 자신의 잘못을 인정하고 피해자에게 정중히 사과했습니다.'),
  世:T('세탁','洗濯','흰옷과 색깔 옷을 나누어 세탁하면 물이 드는 것을 막을 수 있습니다.'),
  全:T('전기','電氣','발전소에서 만든 전기는 송전선을 따라 도시와 공장으로 전달됩니다.'),
  朝:T('조사','調査','학생들은 하천의 수질과 주변 생물을 직접 조사했습니다.'),
  勇:T('용액','溶液','소금이 물에 완전히 녹아 투명한 용액이 되었습니다.')
};

function hasBatchim(word) {
  const code = [...word].at(-1)?.charCodeAt(0) || 0;
  return code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
}

function subjectParticle(word) { return hasBatchim(word) ? '이' : '가'; }
function objectParticle(word) { return hasBatchim(word) ? '을' : '를'; }
function withParticle(word) { return hasBatchim(word) ? '과' : '와'; }

function officialSentenceScore(sentence) {
  let score = Math.abs(sentence.length - 46);
  if (/[?？]/.test(sentence)) score += 80;
  if (/민준|지수|승규|김 과장|김 기자|이 친구|그 친구/.test(sentence)) score += 50;
  if (!/다\\.$/.test(sentence)) score += 45;
  if (/과장님|선생님|그 친구|이 친구|같고\\.$/.test(sentence)) score += 60;
  return score;
}

function sentenceFor(item) {
  if (item.sentence) return item.sentence;
  const key = `${item.term}|${normalizeHanja(item.hanja)}`;
  if (exampleOverrides[key]) return exampleOverrides[key];
  const record = officialExamples.get(key);
  if (record?.sentences?.length) {
    return [...record.sentences].sort((a, b) => officialSentenceScore(a) - officialSentenceScore(b))[0].replace(/\s{2,}/g, ' ');
  }
  throw new Error(`${key}: meaningful example sentence is missing`);
}

function pickTargets(item) {
  const selected = [];
  const seen = new Set();
  const pool = preferred[item.character] || item.targets;
  for (const word of pool) {
    if (seen.has(word.term) || ![...word.hanja].includes(item.character)) continue;
    selected.push(word);
    seen.add(word.term);
    if (selected.length === 4) break;
  }
  if (selected.length < 3) throw new Error(`${item.character}: target examples are incomplete`);
  return selected.map((word, index) => ({ ...word, sentence: sentenceFor(word, index) }));
}

function pickDistractor(item, targets) {
  const manual = manualDistractor[item.character];
  if (manual) return { ...manual, sentence: sentenceFor(manual, 3) };
  const used = new Set(targets.map((word) => word.term));
  const result = item.distractors.find((word) => !used.has(word.term));
  if (!result) throw new Error(`${item.character}: distractor is missing`);
  return { ...result, sentence: sentenceFor(result, 3) };
}

function makeGroups(items) {
  const groups = [];
  let index = 0;
  while (index < items.length) {
    const sound = items[index].mainSound;
    let end = index + 1;
    while (end < items.length && items[end].mainSound === sound) end += 1;
    const run = items.slice(index, end);
    while (run.length >= 2) {
      const take = run.length === 4 ? 2 : Math.min(3, run.length);
      groups.push(run.splice(0, take));
    }
    if (run.length) {
      if (groups.length && groups.at(-1).length === 2) groups.at(-1).push(run[0]);
      else if (end < items.length) {
        const next = items[end];
        groups.push([run[0], next]);
        end += 1;
      } else if (groups.length) groups.at(-1).push(run[0]);
    }
    index = end;
  }
  if (groups.some((group) => group.length < 2 || group.length > 3)) throw new Error('Invalid extension group size');
  return groups;
}

const groups = makeGroups(source);
const lessons = groups.map((group) => {
  const characters = group.map((item) => {
    const targets = pickTargets(item);
    const forms = item.forms.map((form) => ({ hun: form.hun, eum: form.eum.replace(/\(.*?\)/g, '') }));
    const meanings = [...new Set(forms.map((form) => form.hun))].join('·');
    const canonicalSounds = [...new Set(forms.map((form) => form.eum))];
    const appliedSounds = canonicalSounds.map((sound) => initialSoundVariants.get(sound)).filter(Boolean);
    const readings = [...new Set([...canonicalSounds, ...appliedSounds])];
    const wordList = targets.map((word) => `${word.term}(${word.hanja})`).join('·');
    const soundNote = appliedSounds.length ? ` 낱말 첫머리에서는 두음법칙에 따라 ‘${appliedSounds.join('·')}’로도 소리 납니다.` : '';
    return {
      character: item.character,
      reading: readings.join('·'),
      meaning: meanings,
      hunEum: forms,
      explanation: `핵심 뜻은 “${meanings}”입니다.${soundNote} ${wordList}에서 이 글자가 실제로 맡는 뜻과 범위를 문맥으로 확인합니다.`,
      examples: targets.map((word) => [word.term, word.hanja, word.sentence]),
      _source: item,
      _targets: targets
    };
  });
  const questions = characters.map((character) => {
    const miss = pickDistractor(character._source, character._targets);
    const options = [
      ...character.examples.slice(0, 3).map(([term, hanja, sentence]) => [term, hanja, sentence.replace(term, `{{${term}}}`)]),
      [miss.term, miss.hanja, miss.sentence.replace(miss.term, `{{${miss.term}}}`)]
    ];
    return {
      target: character.character,
      answer: 3,
      note: `${character.examples.map(([term, hanja]) => `${term}(${hanja})`).join('·')}에는 ${character.character} 글자가 쓰입니다. ${miss.term}(${miss.hanja})에는 쓰이지 않습니다.`,
      options
    };
  });
  return {
    term: group.map((item) => item.character).join(''),
    reading: characters.map((item) => item.reading).join(' · '),
    theme: characters.map((item) => item.meaning).join(' · '),
    characters: characters.map(({ _source, _targets, ...character }) => character),
    questions
  };
});

fs.writeFileSync(path.join(import.meta.dirname, 'hanja-v2-lessons-05.json'), `${JSON.stringify(lessons, null, 2)}\n`, 'utf8');
console.log(`Created ${lessons.length} extension lessons, ${lessons.reduce((sum, lesson) => sum + lesson.characters.length, 0)} character lessons and ${lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0)} questions.`);
