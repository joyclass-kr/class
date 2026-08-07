"use strict";

const INDEPENDENT_TOPICS = require("./reading-independent-topics-v3");
const MORE_INDEPENDENT_TOPICS = require("./reading-independent-topics-v4");
const FINAL_INDEPENDENT_TOPICS = require("./reading-independent-topics-v5");
const TOPIC_EXTENSIONS = require("./reading-topic-extensions-v1");
const TOPIC_REGISTERS = require("./reading-topic-registers-v1");

// The classroom pilot bank stays deliberately small and reviewed.  This
// catalogue supplies broader, low-stakes self-study practice without changing
// the teacher review workflow.
const TOPICS = [
  {
    key: "SCI-WATER-CYCLE",
    ko: "물의 순환",
    en: "The Water Cycle",
    facts: [
      ["햇빛을 받은 물은 수증기가 되어 공기 중으로 올라간다.", "Water warmed by sunlight can become vapor and rise into the air."],
      ["수증기가 식으면 작은 물방울로 변해 구름을 이룬다.", "When water vapor cools, it forms tiny droplets that make clouds."],
      ["구름 속 물방울이 무거워지면 비나 눈으로 내린다.", "When droplets in clouds become heavy, they fall as rain or snow."],
      ["땅에 내린 물의 일부는 흙 속으로 스며든다.", "Some water that reaches the ground soaks into the soil."],
      ["강과 지하수의 물은 다시 바다로 흘러갈 수 있다.", "Water in rivers and underground can flow back to the ocean."],
      ["식물은 잎을 통해 수증기를 공기 중으로 내보낸다.", "Plants release water vapor into the air through their leaves."],
      ["물의 순환은 물이 여러 장소와 상태 사이를 이동하는 과정이다.", "The water cycle moves water among places and physical states."],
      ["물의 순환을 움직이는 주요 에너지원은 태양이다.", "The Sun is the main energy source that drives the water cycle."]
    ],
    wrong: [
      ["구름은 수증기가 높은 곳에서 빗방울 크기로 자라면서 처음 만들어진다.", "Clouds first form when vapor grows directly into raindrop-sized drops high in the air."],
      ["지표에 내린 비는 땅의 경사를 따라 바다로 흐르는 과정을 중심으로 순환한다.", "Rain on the ground mainly cycles back to the ocean by flowing down the slope of the land."],
      ["땅속으로 스며든 물은 지표의 물보다 먼저 수증기로 변해 대기로 돌아간다.", "Water in the soil returns to the air as vapor before water on the surface does."],
      ["식물은 뿌리에서 흡수한 물을 줄기 안에 저장하면서 물의 순환 속도를 늦춘다.", "Plants slow the water cycle by storing water from their roots inside their stems."],
      ["바람의 세기가 물의 순환을 움직이는 주된 에너지의 양을 결정한다.", "Wind strength determines the main supply of energy that drives the water cycle."]
    ],
    applications: [
      ["햇볕에 널어 둔 젖은 수건의 물이 공기 중으로 이동할 수 있다.", "Water in a wet towel can move into the air when the towel is left in sunlight."],
      ["차가운 컵 표면에 물방울이 생기는 것은 기체 상태의 물이 식은 사례다.", "Droplets on a cold cup are an example of water vapor cooling into a liquid."],
      ["구름 속 작은 물방울이 합쳐져 충분히 무거워지면 지표로 떨어질 수 있다.", "Tiny cloud droplets can join and fall when they become heavy enough."],
      ["비가 그친 뒤에도 일부 물은 땅속에 남아 이동한다.", "After rain stops, some water remains underground and continues moving."],
      ["산에 내린 비가 하천을 거쳐 바다로 가는 것은 순환의 한 경로다.", "Rain moving from a mountain through a river to the sea is one path in the cycle."],
      ["숲이 대기 중 수증기의 양에 영향을 줄 수 있다.", "A forest can influence the amount of water vapor in the air."],
      ["한 물방울은 이동하면서 액체와 기체 상태를 오갈 수 있다.", "A drop of water can alternate between liquid and gas as it moves."],
      ["햇빛이 줄면 다른 조건이 같을 때 증발 속도도 느려질 수 있다.", "With other conditions unchanged, less sunlight can slow evaporation."]
    ]
  },
  {
    key: "SCI-ECOSYSTEM",
    ko: "생태계의 연결",
    en: "Connections in Ecosystems",
    facts: [
      ["생산자는 햇빛 등의 에너지를 이용해 스스로 양분을 만든다.", "Producers use energy such as sunlight to make their own food."],
      ["소비자는 다른 생물을 먹어 에너지를 얻는다.", "Consumers get energy by eating other organisms."],
      ["분해자는 죽은 생물을 분해해 물질이 다시 순환하도록 돕는다.", "Decomposers break down dead organisms and help matter cycle again."],
      ["먹이 그물은 여러 먹이 사슬이 서로 연결된 모습이다.", "A food web shows how several food chains are connected."],
      ["한 종의 수가 크게 변하면 연결된 다른 종에도 영향이 갈 수 있다.", "A large change in one population can affect other connected species."],
      ["서식지는 생물이 먹이와 물, 공간을 얻어 살아가는 장소다.", "A habitat is where an organism finds food, water, and space to live."],
      ["생물 다양성이 높으면 환경 변화에 대응할 가능성이 커질 수 있다.", "Greater biodiversity can improve an ecosystem's ability to handle change."],
      ["에너지는 먹이 관계를 따라 이동하지만 양은 단계마다 줄어든다.", "Energy moves through feeding relationships but decreases at each step."]
    ],
    wrong: [
      ["생산자는 다른 생물에서 얻은 물질을 햇빛으로 바꾸어 자신의 양분을 만든다.", "Producers use sunlight to change material taken from other organisms into their own food."],
      ["분해자가 줄면 낙엽과 사체에 저장된 물질이 토양으로 더 빠르게 이동한다.", "When decomposers decline, matter stored in leaves and remains moves into the soil more quickly."],
      ["포식자의 수가 늘면 먹이가 되는 종도 함께 늘어 먹이 그물이 안정된다.", "When predator numbers rise, prey numbers rise with them and stabilize the food web."],
      ["먹이와 물의 양이 한 서식지에서 생물이 사용할 수 있는 공간의 크기를 결정한다.", "The amount of food and water determines how much space organisms can use in a habitat."],
      ["먹이 단계가 높아질수록 에너지가 모여 상위 포식자에게 더 많이 전달된다.", "Energy accumulates at higher feeding levels and reaches top predators in larger amounts."]
    ],
    applications: [
      ["풀은 햇빛 에너지로 양분을 만들어 먹이 관계의 출발점이 될 수 있다.", "Grass can use sunlight to make food and begin a feeding relationship."],
      ["사슴이 풀을 먹으면 풀에 저장된 에너지가 사슴으로 이동할 수 있다.", "When a deer eats grass, energy stored in the grass can move to the deer."],
      ["토양의 분해자가 줄면 낙엽이 분해되는 속도가 느려질 수 있다.", "Fewer soil decomposers can slow the breakdown of fallen leaves."],
      ["여러 먹이 사슬에 동시에 등장하는 생물이 있을 수 있다.", "One organism can appear in several food chains at the same time."],
      ["곤충 한 종이 크게 줄면 그 곤충을 먹는 새도 영향을 받을 수 있다.", "A sharp decline in one insect species can affect birds that eat it."],
      ["연못이 마르면 그곳에서 먹이와 물을 얻던 생물의 생활이 어려워진다.", "If a pond dries up, organisms that relied on it for food and water may struggle."],
      ["비슷한 역할을 하는 종이 여럿이면 한 종의 감소를 다른 종이 일부 보완할 수 있다.", "When several species fill similar roles, others may partly offset the loss of one."],
      ["같은 양의 먹이로는 초식동물보다 상위 포식자를 더 적게 지탱하게 된다.", "The same food base supports fewer top predators than it does herbivores."]
    ]
  },
  {
    key: "SCI-WEATHER-CLIMATE",
    ko: "날씨와 기후",
    en: "Weather and Climate",
    facts: [
      ["날씨는 특정 장소의 짧은 기간 동안 나타나는 대기 상태다.", "Weather is the state of the atmosphere at a place over a short time."],
      ["기후는 한 지역의 날씨를 오랫동안 관찰해 나타낸 경향이다.", "Climate describes long-term weather patterns in a region."],
      ["하루의 추운 날씨 하나만으로 장기적인 기후 변화를 판단할 수 없다.", "One cold day cannot by itself show a long-term climate change."],
      ["기온, 강수량, 바람은 날씨를 설명하는 요소다.", "Temperature, precipitation, and wind are elements of weather."],
      ["기후를 비교하려면 여러 해 동안 모은 자료가 필요하다.", "Comparing climates requires data collected over many years."],
      ["바다와 산맥은 지역의 기후에 영향을 줄 수 있다.", "Oceans and mountain ranges can influence regional climate."],
      ["일기 예보는 관측 자료와 모형을 사용해 앞으로의 날씨를 예상한다.", "Weather forecasts use observations and models to predict future conditions."],
      ["기후의 평균이 비슷해도 극한 날씨의 빈도는 달라질 수 있다.", "Places with similar climate averages can differ in extreme weather frequency."]
    ],
    wrong: [
      ["일주일의 평균 기온은 그 지역의 계절별 기후를 대표하는 자료가 된다.", "A weekly mean temperature represents the seasonal climate of a region."],
      ["평년보다 추운 날이 이어지면 장기 기후 추세는 그 기간의 방향으로 이동한다.", "A run of colder-than-average days shifts the long-term climate trend in the same direction."],
      ["평균 기온이 같은 지역은 비슷한 대기 순환을 겪어 강수와 바람도 비슷해진다.", "Regions with the same mean temperature develop similar rainfall and wind through similar air circulation."],
      ["해안과 내륙의 기온 변화 차이는 주로 두 지역의 위도 차이에서 생긴다.", "The temperature gap between coastal and inland areas mainly results from a difference in latitude."],
      ["관측 지점이 많아질수록 예보 모형이 없어도 날씨 변화는 정확히 예측된다.", "As observation sites increase, a forecast model is no longer needed to calculate weather changes."]
    ],
    applications: [
      ["내일 우산이 필요한지 판단하려면 장기 평균보다 단기 예보가 더 직접적이다.", "A short-term forecast is more useful than a long-term average for deciding whether to carry an umbrella tomorrow."],
      ["한 도시의 계절적 특징을 알려면 여러 해의 기록을 살펴봐야 한다.", "To identify a city's seasonal pattern, records from many years should be examined."],
      ["수십 년의 변화 방향은 한파가 있었던 하루보다 장기간의 관측 자료로 판단해야 한다.", "A decades-long direction should be judged from long-term observations rather than one extremely cold day."],
      ["기온이 같아도 비와 바람이 다르면 두 날의 날씨는 다르게 설명된다.", "Two days with equal temperatures can have different weather if rain and wind differ."],
      ["지역의 평소 경향을 설명하려면 짧은 기록보다 여러 세대에 걸친 관측을 살핀다.", "A researcher studies records across several decades before describing a region's usual pattern."],
      ["산의 양쪽 지역은 공기의 상승과 강수 차이 때문에 서로 다른 기후가 나타날 수 있다.", "Opposite sides of a mountain can have different climates because of rising air and rainfall."],
      ["새 관측 자료가 들어오면 예보 결과가 수정될 수 있다.", "A forecast may be revised when new observations become available."],
      ["평균 기온만 같은 두 지역이라도 폭염 위험은 다를 수 있다.", "Two regions with the same mean temperature can still have different heat-wave risks."]
    ]
  },
  {
    key: "SCI-ENERGY",
    ko: "에너지의 전환",
    en: "Energy Transformations",
    facts: [
      ["전구는 전기 에너지의 일부를 빛 에너지로 바꾼다.", "A lamp changes some electrical energy into light energy."],
      ["움직이는 물체는 운동 에너지를 가진다.", "A moving object has kinetic energy."],
      ["높은 곳에 있는 물체는 위치와 관련된 에너지를 가질 수 있다.", "An object above the ground can have energy related to its position."],
      ["배터리는 저장된 화학 에너지를 전기 에너지로 바꿀 수 있다.", "A battery can change stored chemical energy into electrical energy."],
      ["에너지는 전환 과정에서 사라지기보다 다른 형태로 이동하거나 바뀐다.", "During a transformation, energy moves or changes form rather than vanishing."],
      ["마찰이 일어나면 운동 에너지의 일부가 열에너지로 바뀔 수 있다.", "Friction can change some kinetic energy into thermal energy."],
      ["태양 전지는 빛 에너지를 전기 에너지로 전환한다.", "Solar cells transform light energy into electrical energy."],
      ["기계의 효율은 들어간 에너지 중 유용하게 전환된 비율과 관련된다.", "Machine efficiency relates to the fraction of input energy changed usefully."]
    ],
    wrong: [
      ["전구는 빛이 강해질수록 전기 에너지에서 빛으로 바뀌는 비율도 같은 폭으로 커진다.", "As a lamp becomes brighter, the fraction of electrical energy changed into light rises by the same amount."],
      ["같은 속력과 방향으로 움직이는 물체는 질량이 달라도 운동 에너지의 크기가 비슷하다.", "Objects moving at the same speed and direction have similar kinetic energy even when their masses differ."],
      ["같은 높이의 물체는 바닥과의 거리가 같아 위치 에너지의 크기도 비슷하다.", "Objects at the same height have similar potential energy because their distance from the ground is equal."],
      ["마찰로 생긴 열에너지는 접촉한 물질의 성질에서 새롭게 만들어진다.", "Thermal energy from friction is newly produced by the properties of the touching materials."],
      ["효율이 80%인 기계는 입력 에너지 가운데 80%를 열에너지로 전환한다.", "A machine with 80 percent efficiency changes 80 percent of its input into thermal energy."]
    ],
    applications: [
      ["전구가 켜질 때 빛뿐 아니라 열도 생길 수 있다.", "A lamp can produce heat as well as light when switched on."],
      ["같은 물체가 더 빠르게 움직이면 운동과 관련된 에너지도 커진다.", "When the same object moves faster, its energy of motion increases."],
      ["책을 위쪽 선반에 두면 바닥에 있을 때보다 떨어지면서 더 많은 일을 할 수 있다.", "A raised book can do more work while falling than it could from the floor."],
      ["손전등은 배터리에 저장된 에너지를 이용해 전구에 전기를 공급한다.", "A flashlight uses stored battery energy to supply electricity to its lamp."],
      ["선풍기가 작동할 때 전기 에너지는 날개의 운동과 열 등으로 전환된다.", "When a fan runs, electrical energy changes into blade motion, heat, and other forms."],
      ["브레이크를 잡은 자전거 바퀴가 따뜻해지는 것은 에너지 전환의 결과다.", "A bicycle wheel warming under braking is evidence of an energy transformation."],
      ["빛이 약해지면 같은 태양 전지의 전기 생산량도 줄 수 있다.", "The same solar cell may produce less electricity when the light becomes weaker."],
      ["두 기계가 같은 일을 한다면 열로 덜 빠져나가는 쪽이 더 효율적일 수 있다.", "If two machines do the same work, the one losing less energy as heat may be more efficient."]
    ]
  },
  {
    key: "TECH-DIGITAL-SAFETY",
    ko: "디지털 안전",
    en: "Digital Safety",
    facts: [
      ["긴 비밀번호는 짧은 비밀번호보다 추측하기 어려운 경우가 많다.", "A long password is often harder to guess than a short one."],
      ["서비스마다 다른 비밀번호를 쓰면 한 계정의 유출이 다른 계정으로 번지는 위험을 줄인다.", "Unique passwords reduce the risk that one breach spreads to other accounts."],
      ["다단계 인증은 비밀번호 외의 확인 단계를 추가한다.", "Multi-factor authentication adds a check beyond the password."],
      ["의심스러운 링크를 누르기 전에 보낸 사람과 주소를 확인해야 한다.", "Before opening a suspicious link, check the sender and address."],
      ["운영체제와 앱을 업데이트하면 알려진 보안 문제를 고칠 수 있다.", "Updating systems and apps can fix known security problems."],
      ["공개 게시물에는 주소나 연락처 같은 개인정보를 올리지 않는 편이 안전하다.", "It is safer not to post private details such as an address or phone number publicly."],
      ["백업은 기기가 고장 나거나 파일이 손상됐을 때 복구에 도움이 된다.", "Backups help recovery when a device fails or files are damaged."],
      ["온라인 정보는 여러 신뢰할 만한 출처와 비교해 확인해야 한다.", "Online information should be checked against several reliable sources."]
    ],
    wrong: [
      ["긴 비밀번호를 여러 서비스에 함께 쓰면 짧고 서로 다른 비밀번호보다 유출 위험을 낮출 수 있다.", "Reusing one long password across services can lower breach risk more than using shorter unique passwords."],
      ["아는 사람의 계정에서 온 링크는 주소보다 메시지 내용의 자연스러움을 먼저 확인하는 편이 효율적이다.", "For a link from a familiar account, checking whether the message sounds natural is more useful than checking its address."],
      ["다단계 인증은 비밀번호 확인 뒤 로그인 기록을 저장해 다음 접속의 안전성을 높이는 기능이다.", "Multi-factor authentication improves later access by saving a login record after the password is checked."],
      ["클라우드 동기화는 파일을 여러 기기에 복사해 별도의 백업과 같은 복구 효과를 제공한다.", "Cloud synchronization copies files across devices and provides the same recovery effect as a separate backup."],
      ["검색 결과 상단의 정보는 이용자가 많이 선택한 자료이므로 출처 신뢰도가 높은 편이다.", "Information near the top of search results tends to be reliable because many users select it."]
    ],
    applications: [
      ["비밀번호의 길이를 늘리면 가능한 조합이 많아져 추측이 더 어려워질 수 있다.", "Increasing password length can create more possible combinations and make guessing harder."],
      ["한 사이트의 비밀번호가 새어도 다른 사이트의 비밀번호가 다르면 피해 확산을 줄일 수 있다.", "If passwords differ, a breach at one site is less likely to spread to other accounts."],
      ["비밀번호를 알아낸 공격자도 추가 인증 수단까지 갖춰야 로그인을 마칠 수 있다.", "An attacker who knows the password still needs the additional factor to complete login."],
      ["친구 이름으로 온 메시지도 링크 주소가 이상하면 다른 방법으로 본인에게 확인하는 편이 안전하다.", "Even a message using a friend's name should be verified another way if its link looks unusual."],
      ["보안 수정이 포함된 업데이트를 미루면 알려진 취약점이 남을 수 있다.", "Delaying an update with security fixes can leave a known vulnerability open."],
      ["공개 사진의 명찰이나 배경도 개인정보를 드러낼 수 있다.", "A name tag or background in a public photo can reveal private information."],
      ["원본과 분리된 백업이 있으면 파일 손상 뒤 복구 가능성이 높아진다.", "A separate backup improves the chance of recovery after file damage."],
      ["같은 주장을 독립적인 여러 기관이 뒷받침하는지 확인할 필요가 있다.", "A claim should be checked for support from several independent sources."]
    ]
  },
  {
    key: "SOC-DEMOCRATIC-DECISION",
    ko: "함께 결정하는 방법",
    en: "Making Decisions Together",
    facts: [
      ["공동의 결정에서는 서로 다른 의견을 들을 기회가 필요하다.", "A shared decision should give different views a chance to be heard."],
      ["주장의 근거를 확인하면 의견을 더 공정하게 비교할 수 있다.", "Checking evidence helps people compare claims more fairly."],
      ["다수결은 한 가지 결정 방법이지만 소수의 권리도 함께 고려해야 한다.", "Majority voting is one method, but minority rights still matter."],
      ["토론의 목적은 상대를 모욕하는 것이 아니라 쟁점을 검토하는 것이다.", "The purpose of discussion is to examine issues, not insult opponents."],
      ["결정 과정과 기준을 공개하면 책임성을 높일 수 있다.", "Sharing the process and criteria can increase accountability."],
      ["이해관계가 다른 사람들은 같은 정책의 영향을 다르게 받을 수 있다.", "People with different interests can be affected differently by one policy."],
      ["합의는 모든 차이를 없애기보다 함께 받아들일 수 있는 안을 찾는 과정이다.", "Consensus seeks an acceptable option rather than erasing every difference."],
      ["결정 뒤에도 결과를 살펴보고 필요하면 규칙을 고칠 수 있다.", "After a decision, people can review results and revise rules when needed."]
    ],
    wrong: [
      ["참여자가 많을수록 대표 의견을 먼저 정리한 뒤 소수 의견을 추가로 듣는 방식이 효율적이다.", "With many participants, it is efficient to settle the representative view first and hear minority views afterward."],
      ["근거의 신뢰도보다 각 의견에 같은 시간을 배정하는 것이 공정한 비교에 더 중요하다.", "Giving each view equal time matters more to a fair comparison than differences in evidence quality."],
      ["과반수 결정을 먼저 확정한 뒤 소수 권리 문제를 시행 과정에서 조정하면 갈등을 줄일 수 있다.", "Confirming the majority decision first and adjusting minority-rights issues during implementation can reduce conflict."],
      ["토론에서는 주장 내용보다 말한 사람의 책임과 동기를 먼저 평가해야 쟁점을 정확히 판단할 수 있다.", "A discussion judges an issue accurately by weighing the speaker's responsibility and motives ahead of the claim."],
      ["절차가 투명하면 결정 이후의 평가는 참여자의 만족도를 중심으로 진행하는 것이 적절하다.", "When a process is transparent, later evaluation should focus mainly on participant satisfaction."]
    ],
    applications: [
      ["회의에서 발언 기회를 고르게 주는 것은 의견 수렴의 공정성을 높일 수 있다.", "Giving balanced speaking opportunities can make consultation fairer."],
      ["두 제안의 효과를 비교할 때는 각 주장이 어떤 자료에 근거하는지 살펴봐야 한다.", "Comparing proposals requires examining the evidence behind each claim."],
      ["표결에서 이긴 안이라도 특정 집단의 기본권을 침해하는지는 검토해야 한다.", "Even a winning proposal should be checked for harm to a group's basic rights."],
      ["사람이 아니라 그 사람이 제시한 주장과 근거를 비판하는 것이 토론 목적에 맞다.", "Discussion should criticize claims and evidence rather than the person presenting them."],
      ["선정 기준과 회의 기록을 공개하면 결정한 사람에게 이유를 물을 수 있다.", "Publishing criteria and meeting records makes decision-makers answerable for their reasons."],
      ["통학로 변경은 보행 학생과 차량 이용자에게 서로 다른 영향을 줄 수 있다.", "A school-route change can affect walkers and drivers differently."],
      ["의견이 맞서는 사람들도 감당할 수 있는 해결책을 함께 찾아본다.", "A group searches for a proposal that competing sides can live with."],
      ["새 규칙의 부작용이 확인되면 시행 결과를 근거로 수정할 수 있다.", "If a new rule has harmful effects, its results can justify revision."]
    ]
  },
  {
    key: "MATH-RATIO",
    ko: "비와 비율",
    en: "Ratios and Rates",
    facts: [
      ["비는 두 양의 크기를 비교하는 방법이다.", "A ratio compares the sizes of two quantities."],
      ["2 대 3과 4 대 6은 같은 관계를 나타내는 동치비다.", "The ratios 2 to 3 and 4 to 6 describe the same relationship."],
      ["단위율은 비교하는 양 중 하나를 1로 놓고 나타낸 비율이다.", "A unit rate expresses a comparison for one unit."],
      ["전체가 달라지면 같은 개수라도 비율은 달라질 수 있다.", "The same count can represent a different fraction when the total changes."],
      ["비례 관계에서는 한 양이 일정한 배수가 되면 다른 양도 같은 배수가 된다.", "In a proportional relationship, scaling one quantity scales the other equally."],
      ["그래프가 원점을 지나는 직선이면 비례 관계를 나타낼 수 있다.", "A straight line through the origin can represent a proportional relationship."],
      ["백분율은 전체를 100으로 보았을 때의 비율이다.", "A percentage is a ratio expressed out of one hundred."],
      ["단위가 다른 비율을 비교할 때는 단위를 같게 맞춰야 한다.", "Rates with different units should be converted to matching units before comparison."]
    ],
    wrong: [
      ["비의 앞항과 뒷항을 바꾸면 비교 기준이 달라져도 두 양의 관계는 유지된다.", "Reversing the terms changes the reference point while preserving the relationship between the quantities."],
      ["동치비는 두 항의 차이가 같도록 같은 수를 더해 만들 수 있다.", "Equivalent ratios can be formed by adding the same number to keep the difference between terms equal."],
      ["전체가 커져도 부분의 수가 같으면 부분이 차지하는 비율도 같은 수준으로 유지된다.", "When the total grows but the part stays fixed, the part keeps about the same share."],
      ["두 양이 같은 양만큼 꾸준히 늘면 변화가 일정해 비례 관계로 볼 수 있다.", "When two quantities rise by equal amounts, their steady change represents a proportional relationship."],
      ["50%는 전체가 얼마이든 언제나 기준 수량 50에 해당하는 양만을 뜻한다.", "Fifty percent names the quantity 50 itself, whatever the size of the whole may be."]
    ],
    applications: [
      ["빨간 공 2개와 파란 공 5개를 비교하면 빨강 대 파랑의 비는 2 대 5다.", "With 2 red balls and 5 blue balls, the ratio of red to blue is 2 to 5."],
      ["2 대 3의 두 항에 같은 수 2를 곱하면 4 대 6이 된다.", "Multiplying both terms of 2 to 3 by 2 gives 4 to 6."],
      ["180킬로미터를 3시간에 갔다면 한 시간당 거리는 60킬로미터다.", "Traveling 180 kilometers in 3 hours gives a unit rate of 60 kilometers per hour."],
      ["해당하는 수가 같아도 전체 규모가 달라지면 차지하는 몫은 달라진다.", "Equal counts can still describe unequal portions when their totals differ."],
      ["각 재료의 양을 3배로 늘리면 조리법에 담긴 맛의 비율은 그대로 유지된다.", "Multiplying each ingredient by three preserves the ratios in a proportional recipe."],
      ["거리와 시간이 비례하고 시작 거리가 0이라면 그래프는 원점을 지난다.", "If distance is proportional to time and starts at zero, its graph passes through the origin."],
      ["학생 200명의 25%는 전체를 네 등분한 한 부분인 50명이다.", "Twenty-five percent of 200 students is one quarter, or 50 students."],
      ["시속과 분속을 바로 비교하려면 먼저 시간 단위를 맞춰야 한다.", "Comparing hourly and per-minute rates requires matching time units."]
    ]
  },
  {
    key: "ART-LOOKING",
    ko: "작품을 보는 방법",
    en: "Looking at Art",
    facts: [
      ["작품 감상은 먼저 화면에서 실제로 보이는 것을 관찰하는 데서 시작할 수 있다.", "Art viewing can begin by observing what is actually visible."],
      ["색, 선, 형태, 질감은 작품을 설명할 때 살펴볼 수 있는 요소다.", "Color, line, shape, and texture are elements used to describe art."],
      ["같은 작품도 관람자의 경험에 따라 다르게 해석될 수 있다.", "The same artwork can be interpreted differently depending on a viewer's experience."],
      ["해석에는 작품에서 찾은 구체적인 근거를 덧붙이는 것이 좋다.", "An interpretation is stronger when supported by specific evidence from the artwork."],
      ["작품이 만들어진 시대와 장소는 의미를 이해하는 데 도움을 줄 수 있다.", "The time and place in which art was made can help explain its meaning."],
      ["작가의 의도는 중요한 정보지만 작품의 의미를 하나로만 고정하지는 않는다.", "An artist's intention matters but does not always fix a single meaning."],
      ["재료와 제작 방법은 작품이 주는 느낌에 영향을 줄 수 있다.", "Materials and techniques can influence the effect of an artwork."],
      ["감상에서는 관찰한 사실과 개인의 느낌을 구분해 말할 수 있다.", "In art discussion, viewers can distinguish observations from personal reactions."]
    ],
    wrong: [
      ["처음 떠오른 느낌을 기준으로 색과 선의 특징을 정리하면 작품 해석의 방향이 분명해진다.", "Using the first emotional response to organize colors and lines makes the direction of interpretation clearer."],
      ["색과 선을 정확히 기록하면 관람자의 경험 차이가 줄어 비슷한 해석에 도달하게 된다.", "Accurately recording colors and lines reduces differences in viewer experience and leads to similar interpretations."],
      ["작가의 의도를 알게 되면 시대 배경보다 제작 과정의 설명이 작품 해석의 중심이 된다.", "Once the artist's intention is known, explanations of the making process become more central than historical context."],
      ["같은 형태를 사용한 작품에서는 재료보다 화면의 구성 방식이 느낌을 결정한다.", "In works using the same forms, composition determines the effect more strongly than material."],
      ["강한 감정 반응을 먼저 공유하면 작품의 세부 요소도 더 정확하게 해석된다.", "Sharing a strong emotional response first makes the interpretation of details more accurate."]
    ],
    applications: [
      ["그림에 파란색 곡선이 반복된다는 말은 해석보다 관찰에 가깝다.", "Saying that blue curves repeat in a painting is closer to observation than interpretation."],
      ["두꺼운 직선과 거친 질감에 주목하면 작품의 긴장감을 설명할 근거를 찾을 수 있다.", "Thick straight lines and rough texture can support an interpretation of tension."],
      ["관람 경험이 다른 두 사람이 같은 그림에서 서로 다른 의미를 찾을 수 있다.", "Two viewers with different experiences can find different meanings in the same painting."],
      ["‘불안해 보인다’고 해석했다면 불규칙한 선 같은 시각적 근거를 함께 제시할 수 있다.", "An interpretation of anxiety can be supported by visual evidence such as irregular lines."],
      ["갈등이 이어지던 시대적 배경을 이용해 그림에 반복되는 표시의 뜻을 해석한다.", "A viewer uses the period of conflict around a painting to interpret its repeated signs."],
      ["작가의 설명을 알아도 작품에서 다른 근거를 찾은 관람자는 추가 해석을 제시할 수 있다.", "Even with the artist's statement, a viewer may offer another evidence-based interpretation."],
      ["같은 형상도 돌로 만들 때와 천으로 만들 때 무게감이 다르게 느껴질 수 있다.", "The same form can feel heavier in stone than in fabric."],
      ["‘화면 중앙에 인물이 있다’와 ‘외로워 보인다’는 서로 다른 종류의 진술이다.", "‘A figure is centered’ and ‘the figure seems lonely’ are different kinds of statements."]
    ]
  }
];

function rotate(values, amount) {
  const offset = amount % values.length;
  return values.slice(offset).concat(values.slice(0, offset));
}

const TOKEN_STOP_WORDS = new Set([
  "about", "after", "again", "also", "among", "another", "because", "before",
  "between", "from", "have", "into", "more", "other", "should", "than", "that",
  "their", "there", "these", "they", "this", "through", "toward", "when",
  "where", "which", "while", "with",
  "같다", "같은", "그리고", "따라", "대한", "된다", "되는", "되어", "또는",
  "때문", "보다", "있다", "하는", "한다", "하여"
]);

function contentTokens(value, track) {
  const matches = String(value || "").toLocaleLowerCase().match(track === "en" ? /[a-z]{3,}/g : /[가-힣]{2,}/g) || [];
  return new Set(matches.map((token) => {
    if (track === "en") return token;
    const stripped = token.replace(/(에서는|으로는|에게는|까지는|부터는|이라는|라는|에서|으로|에게|까지|부터|처럼|에는|과는|와는|은|는|이|가|을|를|도|의|에|로|과|와)$/u, "");
    return stripped.length >= 2 ? stripped : token;
  }).filter((token) => token.length >= 2 && !TOKEN_STOP_WORDS.has(token)));
}

function contentOverlapScore(left, right, track) {
  const leftTokens = contentTokens(left, track);
  const rightTokens = contentTokens(right, track);
  let score = 0;
  leftTokens.forEach((token) => {
    const related = [...rightTokens].some((candidate) =>
      candidate === token
      || (track === "ko"
        && Math.min(candidate.length, token.length) >= 2
        && (candidate.startsWith(token) || token.startsWith(candidate)))
    );
    if (related) score += 1;
  });
  return score;
}

function localizedText(value, languageIndex) {
  return Array.isArray(value) ? value[languageIndex] : value;
}

// ---------------------------------------------------------------------------
// 문항 조립 (2026-08-06 개편)
//
// 개편 전 문제:
//   1) 정답은 항상 applications(구체 사례), 오답은 항상 wrong(일반 진술)에서
//      뽑혀 문체와 길이가 갈렸다. 지문을 읽지 않고 "가장 짧은 선지"만 골라도
//      한국어 68%, 영어 58%가 정답이었다(무작위 24.6%).
//   2) 지문은 facts 배열을 회전시켜 이어붙인 것이라 중간부터 시작했고
//      접속어가 없었다.
//   3) 8개 급을 두었지만 주제당 사실이 8개뿐이라 지문 길이 말고는 구분이
//      없었고, 7급과 8급 지문은 완전히 같았다. 문두는 판단을 묻는데 정답은
//      행동 문장인 경우가 81%였다.
//   4) 급이 초3~고3을 표방했지만 문장 난도는 전 급이 같았다. 초3이 읽는
//      문장과 고3이 읽는 문장의 길이·구조가 다르지 않았다.
//   5) buildReferenceDistractors는 호출되지 않는 죽은 코드였다.
//
// 개편 후:
//   - 문두를 "사례형"과 "진술형"으로 나누고, 각 계열 안에서 정답과 오답을
//     같은 문장 계열에서 뽑는다.
//       사례형: 정답 applications[i] / 오답 wrongApplications
//       진술형: 정답 inferences[i]   / 오답 wrong
//   - 지문은 회전 없이 facts의 연속 구간을 순서대로 사용하고 도입문과
//     접속 표현을 붙인다.
//   - 급은 4단계이고, 급마다 문장 등급·지문 길이·도입문 유무·선지 수·
//     요구 사고·오답 근접도가 모두 달라진다.
//   - 문장 등급(easy/base/hard)은 같은 내용을 세 가지 언어 난도로 쓴 것이다.
//     easy와 hard는 reading-topic-registers-v1.js 에, base는 이 파일의 TOPICS와
//     reading-topic-extensions-v1.js 에 있다.
//   - 급마다 변형 8개를 두어 주제의 사실 8개가 모두 한 번씩 근거로 쓰인다.
// ---------------------------------------------------------------------------

const APPLICATION_QUESTION_TYPES = new Set([
  "implication",
  "evidence_application",
  "causal_reasoning"
]);

const CONNECTIVES = {
  ko: { second: "또한 ", late: "이와 함께 " },
  en: { second: "Also, ", late: "At the same time, " }
};

function lowerFirst(sentence) {
  return sentence.charAt(0).toLowerCase() + sentence.slice(1);
}

function joinPassage(intro, sentences, track, useIntro) {
  const parts = sentences.slice();
  const marks = CONNECTIVES[track === "en" ? "en" : "ko"];
  if (parts.length >= 3) {
    parts[1] = track === "en" ? marks.second + lowerFirst(parts[1]) : marks.second + parts[1];
  }
  if (parts.length >= 5) {
    const lateIndex = parts.length - 2;
    parts[lateIndex] = track === "en"
      ? marks.late + lowerFirst(parts[lateIndex])
      : marks.late + parts[lateIndex];
  }
  return (useIntro ? [intro].concat(parts) : parts).join(" ");
}

function questionTypeFor(level, variant) {
  return LEVEL_PROFILES[level].questionTypes[variant];
}

function promptFor(track, questionType) {
  const prompts = track === "ko"
    ? {
        content_match: "윗글을 바탕으로 판단한 내용으로 가장 적절한 것을 고르세요.",
        inference: "윗글을 바탕으로 추론한 내용으로 가장 적절한 것을 고르세요.",
        implication: "윗글의 원리를 가장 잘 적용한 사례를 고르세요.",
        causal_reasoning: "윗글에 제시된 원인과 결과의 관계를 가장 정확히 적용한 사례를 고르세요.",
        synthesis: "윗글의 여러 정보를 함께 고려할 때 가장 타당한 판단을 고르세요.",
        condition_analysis: "윗글에서 설명한 조건을 바꾸었을 때 예상되는 결과로 가장 타당한 것을 고르세요.",
        evidence_application: "윗글의 근거를 새로운 상황에 가장 타당하게 적용한 사례를 고르세요.",
        claim_evaluation: "윗글 전체의 근거로 평가할 때 가장 타당한 판단을 고르세요.",
        boundary_reasoning: "윗글의 조건과 적용 범위를 가장 정확하게 반영한 판단을 고르세요."
      }
    : {
        content_match: "Which statement is best supported by the passage?",
        inference: "Which conclusion can best be inferred from the passage?",
        implication: "Which example best applies the idea in the passage?",
        causal_reasoning: "Which example most accurately applies the cause-and-effect relationship in the passage?",
        synthesis: "Which judgment is strongest when the information in the passage is considered together?",
        condition_analysis: "Which result is most reasonable if a condition described in the passage changes?",
        evidence_application: "Which example applies the passage's reasoning most soundly to a new situation?",
        claim_evaluation: "Which judgment is best supported by the passage as a whole?",
        boundary_reasoning: "Which judgment best preserves the conditions and scope of the passage?"
      };
  return prompts[questionType];
}

// 오답을 고르는 기준은 세 가지다.
//
//  1. 지문 관련성 - 지문에 나온 내용을 다루는 오답이어야 "윗글을 바탕으로"
//     판단할 수 있다. 사례형은 지문에 실린 사실과 짝이 맞는 오답에 가산점.
//  2. 정답 근접도(closeness) - 급이 올라갈수록 정답과 같은 소재를 다루는
//     오답을 뽑아 변별을 높인다. 낮은 급에서는 음수라 결이 다른 오답이 뽑힌다.
//  3. 길이 보정 - 정답과 길이가 비슷한 오답을 우선한다. 이것이 없으면 오답
//     풀의 길이 분포가 정답 풀보다 좁을 때 "가장 짧은 선지가 정답"이라는
//     지름길이 생긴다. 문장 등급마다 절대 길이가 크게 다르므로(easy 27자,
//     hard 60자) 글자 수가 아니라 정답 대비 비율로 벌점을 준다.
//     길이가 정답보다 약 8% 차이 나면 어휘 겹침 1점만큼 손해를 본다.
const LENGTH_PENALTY_WEIGHT = 12;

function pickDistractors(pool, options) {
  const {
    passageText, answerText, track, count,
    closeness = 0, preferredIndexes = null, forceIndex = -1, banIndex = -1
  } = options;
  const preferred = new Set(preferredIndexes || []);
  const answerLength = Math.max(1, answerText.length);
  const score = (entry) =>
    (preferred.has(entry.index) ? 4 : 0)
    + contentOverlapScore(entry.text, passageText, track)
    + closeness * contentOverlapScore(entry.text, answerText, track)
    - LENGTH_PENALTY_WEIGHT * Math.abs(entry.text.length - answerLength) / answerLength;

  const candidates = pool
    .map((text, index) => ({ text, index }))
    .filter((entry) => entry.text !== answerText && entry.index !== banIndex);

  const forced = forceIndex >= 0
    ? candidates.filter((entry) => entry.index === forceIndex)
    : [];
  const rest = candidates
    .filter((entry) => entry.index !== forceIndex)
    .sort((left, right) => score(right) - score(left) || left.index - right.index);

  const chosen = [];
  forced.concat(rest).forEach((entry) => {
    if (chosen.length < count && !chosen.includes(entry.text)) chosen.push(entry.text);
  });
  return chosen;
}

// 정답 위치를 고르게 흩뿌리기 위한 결정적 해시.
function spreadHash(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return hash;
}

// 변형 수 = 주제의 fact 수. 변형 v는 facts[v]를 근거로 하는 문항이므로,
// 한 급에서 8개 사실이 모두 한 번씩 출제된다.
const VARIANTS_PER_LEVEL = 8;

// 급마다 아래 여섯 가지가 함께 달라진다.
//
//   register      문장 등급. easy(초3~4) / base(초5~중2) / hard(중3~고1)
//   detailCount   지문에 담는 문장 수 (3 → 5 → 7 → 8)
//   useIntro      도입문 유무. 가장 높은 급은 안내 문장 없이 바로 시작한다.
//   choiceCount   선지 수 (3 → 4 → 5 → 5)
//   questionTypes 요구하는 사고 (사실 확인 → 추론·인과 → 종합·조건 → 근거 적용·범위 평가)
//   closeness     오답이 정답에 얼마나 가까운지. 낮으면 결이 다른 오답이,
//                 높으면 정답과 같은 소재를 다루는 오답이 뽑힌다.
//   sameFactCase  사례형에서 "정답과 같은 사실을 잘못 적용한 사례"를 넣을지.
//                 가장 헷갈리는 오답이라 상위 급에서만 넣는다.
//
// answerOffsets[v] 는 지문 안에서 근거 문장이 놓이는 자리다. 지문 창은
// facts 배열을 회전하지 않고 잘라 쓰므로 사실의 순서가 흐트러지지 않는다.
// 문두 유형은 급마다 진술형 4개 · 사례형 4개이고, 급마다 두 계열이 걸리는
// 변형 자리를 다르게 두었다. 그 결과 주제의 사실 8개가 진술형 정답
// (inferences)으로도, 사례형 정답(applications)으로도 모두 한 번씩 쓰인다.
const LEVEL_PROFILES = Object.freeze({
  1: {
    schoolBand: "초3~4",
    focus: "사실 확인과 직접 적용",
    register: "easy",
    detailCount: 3,
    choiceCount: 3,
    useIntro: true,
    closeness: -0.8,
    sameFactCase: false,
    answerOffsets: [0, 1, 2, 1, 0, 2, 1, 2],
    questionTypes: [
      "content_match", "implication", "content_match", "implication",
      "content_match", "implication", "content_match", "implication"
    ]
  },
  2: {
    schoolBand: "초5~6",
    focus: "추론과 인과 관계",
    register: "base",
    detailCount: 5,
    choiceCount: 4,
    useIntro: true,
    closeness: 0,
    sameFactCase: false,
    answerOffsets: [0, 1, 2, 3, 3, 3, 3, 4],
    questionTypes: [
      "causal_reasoning", "inference", "causal_reasoning", "inference",
      "causal_reasoning", "inference", "causal_reasoning", "inference"
    ]
  },
  3: {
    schoolBand: "중1~2",
    focus: "정보 종합과 조건 판단",
    register: "base",
    detailCount: 7,
    choiceCount: 5,
    useIntro: true,
    closeness: 0.8,
    sameFactCase: true,
    answerOffsets: [0, 1, 2, 3, 4, 5, 6, 6],
    questionTypes: [
      "synthesis", "condition_analysis", "evidence_application", "implication",
      "synthesis", "condition_analysis", "evidence_application", "implication"
    ]
  },
  4: {
    schoolBand: "중3~고1",
    focus: "근거 적용과 범위 평가",
    register: "hard",
    detailCount: 8,
    choiceCount: 5,
    useIntro: false,
    closeness: 1.6,
    sameFactCase: true,
    answerOffsets: [0, 1, 2, 3, 4, 5, 6, 7],
    questionTypes: [
      "evidence_application", "causal_reasoning", "claim_evaluation", "boundary_reasoning",
      "evidence_application", "causal_reasoning", "claim_evaluation", "boundary_reasoning"
    ]
  }
});

const LEVEL_COUNT = Object.keys(LEVEL_PROFILES).length;

// 급이 요구하는 문장 등급에 맞춰 그 주제의 6개 배열을 꺼낸다.
// base는 기존 TOPICS + reading-topic-extensions-v1.js 조합이고,
// easy·hard는 reading-topic-registers-v1.js 에 통째로 들어 있다.
function contentFor(topic, register) {
  const extension = TOPIC_EXTENSIONS[topic.key];
  if (!extension) {
    throw new Error(`reading-topic-extensions-v1.js 에 ${topic.key} 항목이 없습니다.`);
  }
  if (register === "base") {
    return {
      intro: extension.intro,
      facts: topic.facts,
      inferences: extension.inferences,
      applications: topic.applications,
      wrongApplications: extension.wrongApplications,
      wrong: topic.wrong.concat(extension.wrongExtra || [])
    };
  }
  const graded = (TOPIC_REGISTERS[topic.key] || {})[register];
  if (!graded) {
    throw new Error(`reading-topic-registers-v1.js 에 ${topic.key}/${register} 항목이 없습니다.`);
  }
  return graded;
}

function explanationFor(track, questionType, evidence) {
  const isApplication = APPLICATION_QUESTION_TYPES.has(questionType);
  const quoted = String(evidence).replace(/[.\s]+$/, "");
  if (track === "ko") {
    return isApplication
      ? `윗글의 “${quoted}”가 말하는 원리를 그대로 지킨 사례를 골라야 합니다. 나머지는 같은 상황을 다루지만 원리를 어긋나게 적용했습니다.`
      : `윗글의 “${quoted}”에서 한 걸음 나아가 판단할 수 있는 내용입니다. 나머지는 윗글과 어긋나는 진술입니다.`;
  }
  return isApplication
    ? `Choose the case that follows the principle in “${quoted}.” The other options describe similar situations but apply it incorrectly.`
    : `This follows one step beyond “${quoted}.” The other options conflict with the passage.`;
}

function buildItem(topic, track, level, variant = 0) {
  const profile = LEVEL_PROFILES[level];
  const languageIndex = track === "ko" ? 0 : 1;
  const content = contentFor(topic, profile.register);

  // 변형 v = facts[v]를 근거로 하는 문항. 근거 문장이 지문 안에서 놓일 자리를
  // answerOffsets로 정하고, 거기서 역산해 지문 창의 시작 위치를 구한다.
  const factIndex = Math.min(variant, content.facts.length - 1);
  const maxStart = Math.max(0, content.facts.length - profile.detailCount);
  const windowStart = Math.min(
    Math.max(0, factIndex - profile.answerOffsets[variant]),
    maxStart
  );

  const windowIndexes = Array.from(
    { length: profile.detailCount },
    (unused, offset) => windowStart + offset
  ).filter((index) => index < content.facts.length);

  const sentences = windowIndexes.map((index) => localizedText(content.facts[index], languageIndex));
  const passageText = joinPassage(
    localizedText(content.intro, languageIndex),
    sentences,
    track,
    profile.useIntro
  );

  const questionType = questionTypeFor(level, variant);
  const isApplication = APPLICATION_QUESTION_TYPES.has(questionType);

  const answer = isApplication
    ? localizedText(content.applications[factIndex], languageIndex)
    : localizedText(content.inferences[factIndex], languageIndex);

  const pool = (isApplication ? content.wrongApplications : content.wrong)
    .map((entry) => localizedText(entry, languageIndex));

  // wrongApplications[factIndex]는 정답과 같은 사실을 잘못 적용한 사례라
  // 가장 헷갈리는 오답이다. 상위 급에서는 반드시 넣고, 낮은 급에서는 뺀다.
  const distractors = pickDistractors(pool, {
    passageText,
    answerText: answer,
    track,
    count: profile.choiceCount - 1,
    closeness: profile.closeness,
    preferredIndexes: isApplication ? windowIndexes : null,
    forceIndex: isApplication && profile.sameFactCase ? factIndex : -1,
    banIndex: isApplication && !profile.sameFactCase ? factIndex : -1
  });

  const correctIndex = spreadHash(`${topic.key}|${track}|${level}|${variant}|${answer}`)
    % (distractors.length + 1);
  const choices = distractors.slice();
  choices.splice(correctIndex, 0, answer);

  const evidence = localizedText(content.facts[factIndex], languageIndex);
  const isKorean = track === "ko";

  return {
    id: `${topic.key}-${isKorean ? "K" : "E"}${level}-V${variant + 1}`,
    familyId: topic.key,
    topicTitle: isKorean ? topic.ko : topic.en,
    track,
    targetLevel: level,
    schoolBand: profile.schoolBand,
    skillFocus: profile.focus,
    sentenceRegister: profile.register,
    reasoningDemand: questionType,
    distractorMode: isApplication ? "misapplied_case" : "misconception",
    questionType,
    passageText,
    promptText: promptFor(track, questionType),
    choices,
    correctIndex,
    explanation: explanationFor(track, questionType, evidence)
  };
}

function createSelfStudyItems() {
  return TOPICS.concat(INDEPENDENT_TOPICS, MORE_INDEPENDENT_TOPICS, FINAL_INDEPENDENT_TOPICS).flatMap((topic) =>
    (topic.tracks || ["ko", "en"]).flatMap((track) =>
    Array.from({ length: LEVEL_COUNT }, (unused, index) =>
      Array.from(
        { length: VARIANTS_PER_LEVEL },
        (unusedVariant, variant) => buildItem(topic, track, index + 1, variant)
      )
    ).flat()
  ));
}

module.exports = { LEVEL_PROFILES, contentOverlapScore, createSelfStudyItems };
