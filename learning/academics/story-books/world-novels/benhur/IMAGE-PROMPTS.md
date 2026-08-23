# 제미나이 그림 프롬프트 — 벤허

하나의 이야기를 열두 장으로 나눠 담았고, 장마다 그림이 두 장씩 들어갑니다.
그림이 있는 펼침면은 오른쪽 쪽에 그림 한 장이 들어가고, 그림이 없는 펼침면은 양쪽 쪽에 글만 들어갑니다.
아래 프롬프트를 제미나이에 넣어 생성한 뒤 파일명을 정확히 맞춰 `images/` 폴더에 넣으면 자동으로 책에 나타납니다.
(그림이 없어도 책은 정상적으로 열리고, 이모지 자리표시자가 대신 보입니다.)

권장 크기: **가로 4 : 세로 3** 비율, PNG.
**단 표지(`cover.png`)만 예외 — 세로 2 : 3 비율입니다.**

## 공통 스타일 지시문 (모든 프롬프트 앞에 붙여서 쓰세요)

```
Classic children's literature illustration in the style of 1980s Korean
illustrated classics: gouache and watercolor, bold clean outlines, realistic
proportions with expressive faces; the eastern Roman Empire around 30 CE —
Jerusalem's limestone streets and flat roofs under the Antonia fortress,
Galilean hills, the Syrian city of Antioch with colonnaded avenues, a Roman
war galley, desert camps of black goat-hair tents, and a great oval hippodrome.
Roman military kit, Judean robes and head cloths, Arab desert dress.
No blood or wounds shown. No text or letters in the image.
```

**세 세계를 색으로 갈라 주세요.** 예루살렘은 흰 석회석과 마른 볕,
바다와 갤리선은 어둡고 축축한 갈색, 안티오키아와 경기장은 붉은빛과 금빛,
갈릴리 장면은 초록과 옅은 하늘빛입니다.

**예수를 정면으로 그리지 마세요.** 이 소설은 그 인물을 정면으로 그리지 않습니다.
3장과 11장에서만 나오는데, **뒤에서 보거나, 손만 보이거나, 얼굴이 빛에 가려지게** 그려 주세요.
그 대신 그 사람을 보는 유다의 얼굴을 크게 그려 주세요.

**병에 걸린 사람들을 흉하게 그리지 마세요.** 10장의 골짜기는 거리와 그림자로만
표현하고, 인물의 몸이나 얼굴을 자세히 그리지 마세요. 본문에서 그 시절의 무지를
짚어 두었으니, 그림도 구경거리로 만들면 안 됩니다.

**전차 경주는 이 책의 하이라이트입니다.** 9장 두 장면에 가장 공을 들여 주세요.

## 인물 설명 (일관성을 위해 매번 붙여 넣으세요)

```
Judah Ben-Hur: a Judean man — seventeen and slight in chapters 1-3, then
hardened and heavily muscled from three years at the oar, about twenty-eight
at the end; dark hair, Judean robes early, Roman dress in Rome, a plain tunic
when driving.
Messala: a Roman of the same age, handsome, polished, wearing his rank; his
face never cruel-looking, only certain.
Tirzah: Judah's younger sister, about fifteen at the start.
Judah's mother: a dignified woman of about forty-five.
Esther: a quiet young woman of about twenty with steady eyes.
Simonides: a heavy grey-bearded merchant who cannot move his limbs, always
seated in a wheeled chair, sharp-eyed.
Quintus Arrius: a weathered Roman admiral of about fifty.
Sheik Ilderim: a big cheerful Arab chieftain with a white beard.
Balthasar: a very old Egyptian, frail, gentle.
The four horses: matched Arabian bays with a white one on the left.
```

## 표지 · 마무리

| 파일명 | 장면 |
|---|---|
| `images/cover.png` (세로 2:3 비율) | A tall portrait-format cover: four horses abreast in full gallop coming almost straight at the viewer, dust and sand flying, a chariot behind them and a driver leaning far forward with the reins wrapped round his body; the packed tiers of a hippodrome rising out of focus behind. |
| `images/end.png` | A Jerusalem rooftop at dawn with a low parapet and one loose tile lying beside a gap in it, the city quiet below. |

## 1장 · 로마가 다스리던 땅

| 파일명 | 장면 |
|---|---|
| `images/story-01-a.png` | A Jerusalem street: a Roman patrol marching through, and the local people standing back against the walls in silence, no one meeting the soldiers' eyes. |
| `images/story-01-b.png` | A courtyard garden: two young men of the same age facing each other, one in a Judean robe and one in Roman dress, the friendly moment already gone out of both faces. |

## 2장 · 떨어진 기와

| 파일명 | 장면 |
|---|---|
| `images/story-02-a.png` | A flat rooftop with a low parapet: a young man leaning out to watch a procession below, his sister beside him, one tile shifting under his hand. |
| `images/story-02-b.png` | A doorway of a great house being sealed with wax and cord by soldiers, furniture still inside, the courtyard empty. |

## 3장 · 나사렛의 우물

| 파일명 | 장면 |
|---|---|
| `images/story-03-a.png` | A line of chained prisoners on a dusty road, guards resting at a village well and drinking, the prisoners left in the sun. |
| `images/story-03-b.png` | A young man on his knees in the dust drinking from a bowl held to his lips — draw only the giver's hands and forearms and the edge of a robe; the whole picture is the drinker's face. |

## 4장 · 노 젓는 자리

| 파일명 | 장면 |
|---|---|
| `images/story-04-a.png` | Below the deck of a Roman galley: three banks of oars, rows of men chained to benches in half-darkness, a drum keeping time. |
| `images/story-04-b.png` | A Roman admiral standing on the gangway looking down at one rower, the rower looking straight back at him. |

## 5장 · 바다에서

| 파일명 | 장면 |
|---|---|
| `images/story-05-a.png` | A galley ramming another at speed, oars shattering, seen from a distance across the water. |
| `images/story-05-b.png` | Night, open sea: two men clinging to a floating plank, one holding a sword out of the other's reach. |

## 6장 · 로마에서

| 파일명 | 장면 |
|---|---|
| `images/story-06-a.png` | A Roman training ground: a young man practising with a four-horse chariot on a bare oval track, an instructor watching. |
| `images/story-06-b.png` | An office in Antioch: a heavy man seated motionless in a wheeled chair with a great ledger open before him, a young man standing across the table reading it. |

## 7장 · 시모니데스

| 파일명 | 장면 |
|---|---|
| `images/story-07-a.png` | The same room later: a written document being handed across the table, a young woman standing beside the seated man with her hand on his shoulder. |
| `images/story-07-b.png` | A warehouse yard on the Orontes river: bales, amphorae, ships at a quay, clerks with tablets — the scale of a business built up over years. |

## 8장 · 발타사르

| 파일명 | 장면 |
|---|---|
| `images/story-08-a.png` | A desert camp of black tents at evening: four matched horses in a rope corral, a big Arab chieftain gesturing at them, a young man moving among them quietly. |
| `images/story-08-b.png` | A very old Egyptian seated at a fire telling something, three cups set out but only one man drinking. |

## 9장 · 전차 경주

| 파일명 | 장면 |
|---|---|
| `images/story-09-a.png` | Nine four-horse chariots at the starting gates of a great oval hippodrome, the stands packed, the spina down the middle with turning posts at each end. |
| `images/story-09-b.png` | The inside turning post: two chariots locked side by side, one with iron spikes on its wheel hub, the other pulling a hand's breadth wider — the exact instant before the spiked wheel loses its bite. |

## 10장 · 문둥이 골짜기

| 파일명 | 장면 |
|---|---|
| `images/story-10-a.png` | A dry ravine outside the city walls at dusk with a few small shelters among the rocks, seen from far off; figures indistinct at that distance. |
| `images/story-10-b.png` | A young man standing still on the path above the ravine with his arms at his sides, and a woman's raised hand far below telling him to stop — the whole picture is the distance between them. |

## 11장 · 그 사람을 다시 보다

| 파일명 | 장면 |
|---|---|
| `images/story-11-a.png` | A Galilean hillside crowd seated on the grass listening; at the front, seen from behind, a standing figure with a hand raised, face not visible. |
| `images/story-11-b.png` | A road outside the city walls: three people standing at the roadside as a crowd passes, the mother and daughter with cloths over their faces, the son's face turned toward something out of frame. |

## 12장 · 그 뒤

| 파일명 | 장면 |
|---|---|
| `images/story-12-a.png` | A courtyard of armed men being dismissed: weapons being stacked, men walking away, a young man watching them go. |
| `images/story-12-b.png` | An underground vaulted room in Rome fitted out as a refuge: bedding, lamps, food stores, ordinary families settling in; a man and a woman in the doorway. |
