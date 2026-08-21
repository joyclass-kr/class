"use strict";

// Key-vocabulary glosses shown under an English passage. One list per topic,
// reused across all three registers (easy/base/hard) -- buildItem in
// reading-self-study-v2.js only keeps the entries that actually occur in the
// specific passage text shown, so a word missing from a shorter register's
// wording is simply skipped rather than shown out of context.
module.exports = {
  "SCI-WATER-CYCLE": [
    ["vapor", "수증기"],
    ["droplet", "작은 물방울"],
    ["groundwater", "지하수"],
    ["soil", "흙, 토양"],
    ["evaporation", "증발"]
  ],
  "SCI-ECOSYSTEM": [
    ["producer", "생산자"],
    ["consumer", "소비자"],
    ["decomposer", "분해자"],
    ["habitat", "서식지"],
    ["biodiversity", "생물 다양성"]
  ],
  "SCI-WEATHER-CLIMATE": [
    ["climate", "기후"],
    ["weather", "날씨"],
    ["forecast", "예보"],
    ["latitude", "위도"],
    ["extreme weather", "극한 날씨"],
    ["average", "평균"]
  ],
  "SCI-ENERGY": [
    ["energy", "에너지"],
    ["kinetic energy", "운동 에너지"],
    ["potential energy", "위치 에너지"],
    ["friction", "마찰"],
    ["efficiency", "효율"],
    ["transform", "전환하다, 바꾸다"]
  ],
  "TECH-DIGITAL-SAFETY": [
    ["password", "비밀번호"],
    ["combination", "조합"],
    ["multi-factor authentication", "다단계 인증"],
    ["suspicious", "수상한, 의심스러운"],
    ["vulnerability", "보안 취약점"],
    ["backup", "백업"]
  ],
  "SOC-DEMOCRATIC-DECISION": [
    ["decision", "결정"],
    ["evidence", "근거"],
    ["majority", "다수"],
    ["minority", "소수"],
    ["accountable", "책임을 져야 하는"],
    ["consensus", "합의"]
  ],
  "MATH-RATIO": [
    ["ratio", "비"],
    ["proportional", "비례하는"],
    ["unit rate", "단위율"],
    ["percentage", "백분율"],
    ["origin", "원점"]
  ],
  "ART-LOOKING": [
    ["texture", "질감"],
    ["interpretation", "해석"],
    ["evidence", "근거"],
    ["intent", "의도"],
    ["material", "재료"]
  ],
  "EN-ATTENTION-NOTIFICATIONS": [
    ["attention", "주의력"],
    ["notification", "알림"],
    ["interrupt", "방해하다, 중단시키다"],
    ["priority", "우선순위"],
    ["concentration", "집중"],
    ["routine", "정해진 일, 루틴"]
  ],
  "EN-URBAN-TREES": [
    ["canopy", "나무 지붕(잎이 우거진 부분)"],
    ["pavement", "포장도로"],
    ["intercept", "가로막다"],
    ["maintenance", "유지 관리"],
    ["shade", "그늘"]
  ],
  "EN-RETRIEVAL-PRACTICE": [
    ["retrieval", "인출, 기억해 내기"],
    ["recall", "회상하다, 기억해 내다"],
    ["feedback", "피드백"],
    ["effortful", "노력이 드는"],
    ["session", "학습 시간, 세션"]
  ],
  "EN-ANIMAL-SIGNALS": [
    ["signal", "신호"],
    ["reliable", "믿을 만한"],
    ["predator", "포식자"],
    ["receiver", "수신자, 받는 쪽"],
    ["display", "과시 행동"]
  ],
  "EN-MODELS-PREDICTIONS": [
    ["model", "모형"],
    ["prediction", "예측"],
    ["assumption", "가정"],
    ["observation", "관측, 관찰"],
    ["confidence", "신뢰도"]
  ],
  "EN-FEEDBACK-SYSTEMS": [
    ["feedback", "피드백"],
    ["balancing feedback", "균형 피드백"],
    ["reinforcing feedback", "강화 피드백"],
    ["delay", "지연"],
    ["loop", "순환 고리"]
  ]
};
