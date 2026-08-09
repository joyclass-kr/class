import io
import json
import re
import sys
import unicodedata
from pathlib import Path
from xml.etree import ElementTree as ET

SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT = SCRIPT_DIR / 'hanja-krdict-examples.json'
BAD_CONTEXT = re.compile(r'나는|내가|우리는|우리 가족|아버지|어머니|할머니|할아버지|남편|아내|엄마|아빠|언니|오빠|누나|형부|동생|사촌|여자 친구|남자 친구|친구가|친구에게|선생님께서|교수님|사모님|민수|민준|지수|승규|유민|영수|수지|지민|그는|그녀|그 사람|김 [가-힣]+|김씨|형은|맞아요|있대요|심하네요|“|”|"|\?|!|네,|아뇨|저는|제가|나의|우리 집')


def norm(value: str) -> str:
    return unicodedata.normalize('NFKC', value or '').replace(' ', '').replace('^', '')


def feat_value(element, att):
    for feat in element.findall('feat'):
        if feat.get('att') == att:
            return feat.get('val', '')
    return ''


def nested_feat_value(element, path, att):
    child = element.find(path)
    return feat_value(child, att) if child is not None else ''


def load_targets():
    targets = {}
    for batch_number in range(1, 7):
        source = SCRIPT_DIR / f'hanja-v2-lessons-{batch_number:02d}.json'
        lessons = json.loads(source.read_text(encoding='utf-8'))
        for lesson in lessons:
            for character in lesson['characters']:
                for term, hanja, _sentence in character['examples']:
                    targets[(term, norm(hanja))] = {'term': term, 'hanja': hanja}
            for question in lesson['questions']:
                for term, hanja, _sentence in question['options']:
                    if norm(hanja):
                        targets[(term, norm(hanja))] = {'term': term, 'hanja': hanja}
    return targets

def main(xml_dir: Path):
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    targets = load_targets()
    by_term = {}
    for key in targets:
        by_term.setdefault(key[0], set()).add(key[1])
    found = {}

    invalid_xml_controls = re.compile(rb'[\x00-\x08\x0b\x0c\x0e-\x1f]')
    for xml_path in sorted(xml_dir.glob('*.xml')):
        clean_xml = invalid_xml_controls.sub(b'', xml_path.read_bytes())
        for _event, entry in ET.iterparse(io.BytesIO(clean_xml), events=('end',)):
            if entry.tag != 'LexicalEntry':
                continue
            lemma = nested_feat_value(entry, 'Lemma', 'writtenForm')
            if lemma not in by_term:
                entry.clear()
                continue
            origin = norm(feat_value(entry, 'origin'))
            if origin not in by_term[lemma]:
                entry.clear()
                continue
            definitions = []
            sentences = []
            for sense in entry.findall('Sense'):
                definition = feat_value(sense, 'definition')
                if definition:
                    definitions.append(definition)
                for example in sense.findall('SenseExample'):
                    kind = feat_value(example, 'type')
                    if kind not in ('문장', '대화'):
                        continue
                    for feat in example.findall('feat'):
                        if feat.get('att') != 'example':
                            continue
                        sentence = feat.get('val', '').strip()
                        if lemma in sentence and 24 <= len(sentence) <= 110 and not BAD_CONTEXT.search(sentence):
                            sentences.append(sentence)
            if sentences:
                sentences.sort(key=lambda value: (abs(len(value) - 52), value))
                found[(lemma, origin)] = {
                    'term': lemma,
                    'hanja': targets[(lemma, origin)]['hanja'],
                    'definition': definitions[0] if definitions else '',
                    'sentences': sentences[:20],
                    'source': '국립국어원 한국어기초사전'
                }
            entry.clear()

    rows = [found[key] for key in sorted(found)]
    OUTPUT.write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    missing = [targets[key] for key in targets if key not in found]
    print(json.dumps({'targets': len(targets), 'found': len(rows), 'missing': len(missing), 'missingItems': missing}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        raise SystemExit('usage: extract_krdict_hanja_examples.py <krdict-xml-directory>')
    main(Path(sys.argv[1]))