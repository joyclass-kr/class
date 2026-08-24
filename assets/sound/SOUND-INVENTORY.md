# Site sound inventory

## Current shared effects

The shared `game-sfx.js` exposes seven synthesized effects: click, bell, card, stone, success, error, and tick. These remain useful as loading-failure fallbacks, but should gradually be replaced by short file-based variants.

## Priority production backlog

| Priority | Family | Recommended variants | Typical uses |
| --- | --- | ---: | --- |
| P0 | UI click / select / back | 3 each | Buttons, tabs, dialogs |
| P0 | Correct / wrong / complete | 3 each | Quizzes and practice |
| P0 | Card flip / deal / collect | 3 each | Card and board games |
| P0 | Timer tick / warning / timeout | 2 each | Turn-based games |
| P1 | Stone / tile / token placement | 4 each | Omok, Janggi, Blokus, Rummikub |
| P1 | Round start / result reveal / victory / defeat | 2 each | Multiplayer games |
| P1 | Coin / gem / reward | 3 each | Scores and collections |
| P2 | Paper / pencil / stamp | 3 each | Classroom tools |
| P2 | Soft notification / urgent notification | 2 each | Teacher and lobby notices |

## First completed set: Fruit Bell

- 3 recorded bell strikes
- 3 recorded card/paper flips
- correct and wrong feedback
- card collection
- turn timeout
- round start and match finish

Total: 12 optimized OGG files.
