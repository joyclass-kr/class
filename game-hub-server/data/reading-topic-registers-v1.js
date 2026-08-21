"use strict";

// 문장 등급(register) 데이터 (2026-08-06 추가).
//
// 급마다 지문 길이와 선지 수는 달랐지만 "문장 자체의 난도"는 전 급이 같았다.
// 초3이 읽는 문장과 고1이 읽는 문장이 같은 글자 수, 같은 구조였다.
// 그래서 같은 내용을 세 가지 언어 난도로 갖춰 급마다 다른 등급을 쓰게 했다.
//
//   easy : 1급(초3~4)용. 한국어 평균 27자 · 절 표지 0.4개, 영어 평균 10단어.
//   base : 2·3급(초5~중2)용. 기존 문장. reading-self-study-v2.js 와
//          reading-topic-extensions-v1.js 에 그대로 있으므로 이 파일에는 없다.
//   hard : 4급(중3~고1)용. 한국어 평균 60자 · 절 표지 2.4개, 영어 평균 24단어.
//
// 세 등급의 배열은 index가 같으면 같은 내용·같은 참거짓이다. easy[i], base[i],
// hard[i] 의 대응이 깨지면 정답 키가 통째로 어긋나므로 문장을 고칠 때는
// 반드시 세 등급을 함께 본다.
//
// 등급 안에서 지켜야 할 길이 균형:
//   applications[i] ↔ wrongApplications[i]  (한국어 ±3자 / 영어 ±2단어)
//   inferences 평균 ↔ wrong 평균            (5% 이내)
// 이 균형이 깨지면 지문을 읽지 않고 선지 길이만 보고 정답을 고를 수 있게 된다.

module.exports = {
  "SCI-WATER-CYCLE": {
    "easy": {
      "intro": [
        "물이 어떻게 옮겨 다니고 모습을 바꾸는지 알아보자.",
        "Here is how water moves around and changes its form."
      ],
      "facts": [
        [
          "햇빛을 받은 물은 수증기가 되어 위로 올라간다.",
          "Water warmed by sunlight turns to vapor and rises."
        ],
        [
          "이렇게 올라간 수증기가 식으면 작은 물방울이 되어 구름을 만든다.",
          "As that rising vapor cools, it turns into tiny drops and forms a cloud."
        ],
        [
          "구름 속 물방울이 무거워지면 비나 눈이 되어 떨어진다.",
          "Once the drops in that cloud grow heavy, they fall as rain or snow."
        ],
        [
          "이렇게 내린 물 가운데 일부는 땅속으로 스며든다.",
          "Some of that falling water soaks into the soil."
        ],
        [
          "땅속에 스민 물과 강물은 다시 바다로 흘러갈 수 있다.",
          "Water in the soil and in rivers can flow back to the sea."
        ],
        [
          "바다나 땅 위 식물도 잎으로 수증기를 공기 중에 내보낸다.",
          "Plants near the land or sea also send water vapor into the air through their leaves."
        ],
        [
          "이렇게 물이 여러 곳을 돌고 모습도 바꾸는 것을 물의 순환이라 한다.",
          "This whole movement of water, changing form as it goes, is called the water cycle."
        ],
        [
          "이 순환을 일으키는 가장 큰 힘은 태양이다.",
          "The Sun gives most of the energy that drives this cycle."
        ]
      ],
      "inferences": [
        [
          "물이 사라진 듯 보여도 공기 중에 다른 모습으로 있다.",
          "Water seems to vanish, but it stays in the air."
        ],
        [
          "구름이 생긴 곳의 공기는 전보다 차가워진 상태다.",
          "The air around a newly formed cloud has grown cooler."
        ],
        [
          "물방울이 작게 있는 동안에는 비가 늦게 내린다.",
          "Rain comes later as long as cloud drops stay small."
        ],
        [
          "땅에 남은 물만 재면 내린 비보다 적게 나온다.",
          "The water left on the ground shows less rain than fell."
        ],
        [
          "바다에서 먼 곳에 내린 비도 나중에 바닷물이 된다.",
          "Rain far from the sea still reaches the ocean in time."
        ],
        [
          "잎이 많은 숲의 공기는 수증기를 더 많이 받는다.",
          "Air in a leafy forest takes in more water vapor."
        ],
        [
          "물의 순환을 말할 때는 이동과 모습 변화를 함께 본다.",
          "The water cycle covers both moving water and changing form."
        ],
        [
          "태양에서 오는 힘이 줄면 물의 순환도 느려진다.",
          "Less energy from the Sun slows the whole water cycle down."
        ]
      ],
      "applications": [
        [
          "햇볕에 널어 둔 수건의 물은 공기 중으로 옮겨 간다.",
          "Water in a wet towel moves into the air outside."
        ],
        [
          "차가운 컵에 맺힌 물방울은 식은 수증기가 변한 것이다.",
          "Drops on a cold cup show water vapor cooling down."
        ],
        [
          "구름 속 물방울이 뭉쳐 무거워지면 땅으로 떨어진다.",
          "Small cloud drops join, grow heavy, and then fall."
        ],
        [
          "비가 그친 뒤에도 일부 물은 땅속에서 움직인다.",
          "Some water still moves underground once the rain ends."
        ],
        [
          "산에 내린 비는 하천을 지나 바다까지 흘러간다.",
          "Rain on a mountain runs down a river to the sea."
        ],
        [
          "숲은 공기 중 수증기의 양에 영향을 줄 수 있다.",
          "A forest changes how much vapor the air holds."
        ],
        [
          "물 한 방울은 움직이면서 액체와 기체로 바뀐다.",
          "One drop of water turns from liquid to gas."
        ],
        [
          "햇빛이 줄면 물이 증발하는 속도도 함께 느려진다.",
          "Less sunlight can slow how fast water dries up."
        ]
      ],
      "wrongApplications": [
        [
          "수건이 마르는 것은 물이 햇빛에 빨려 없어진 일이다.",
          "A drying towel shows water soaked up and lost by sunlight."
        ],
        [
          "차가운 컵의 물방울은 컵 안의 물이 새어 나온 것이다.",
          "Drops on a cold cup leaked out from inside it."
        ],
        [
          "구름이 두꺼우면 물방울 크기와 상관없이 비가 온다.",
          "Thick clouds bring rain soon at any drop size."
        ],
        [
          "길이 마르면 내린 비는 모두 강으로 흘러간 것이다.",
          "A dry road means all the rain went to the river."
        ],
        [
          "흙으로 스며든 물은 바다에 가지 못하고 남는다.",
          "Water soaking into soil stays put and misses the sea."
        ],
        [
          "숲에서는 나무가 물을 붙잡아 공기가 메마르게 된다.",
          "In a forest, trees hold water and the air dries."
        ],
        [
          "물이 얼음이 되면 순환에서 아주 빠져나온 것이 된다.",
          "Water turning to ice leaves the cycle for good."
        ],
        [
          "바람이 없는 날에는 햇빛이 강해도 증발이 멈춘다.",
          "Calm air can stop drying even in strong sunlight."
        ]
      ],
      "wrong": [
        [
          "구름은 수증기가 곧바로 빗방울만큼 커지며 생긴다.",
          "Clouds start as vapor growing straight into big raindrops."
        ],
        [
          "땅에 내린 비는 모두 경사를 따라 바다로 흐른다.",
          "Rain runs down slopes to the sea, none soaking in."
        ],
        [
          "흙 속에 스며든 물이 지표의 물보다 먼저 증발한다.",
          "Soil water turns to vapor sooner than surface water does."
        ],
        [
          "식물은 빨아들인 물을 줄기에 모아 순환을 늦춘다.",
          "Plants store root water in stems and slow the cycle."
        ],
        [
          "물의 순환을 움직이는 힘의 양은 바람 세기가 정한다.",
          "Wind strength sets the main energy for the water cycle."
        ],
        [
          "구름이 사라지면 그 안의 물은 공기 밖으로 나간다.",
          "A cloud fades and its water leaves the air completely."
        ],
        [
          "흙에 들어간 물은 지표의 물과 섞이지 않고 남는다.",
          "Water in soil stays apart from surface water for good."
        ],
        [
          "바다에서 증발한 물은 육지로 가지 않고 바다에 내린다.",
          "Sea water evaporates and rains back down over the sea."
        ]
      ]
    },
    "hard": {
      "intro": [
        "물이 어떤 경로를 따라 이동하고 어떤 상태로 모습을 바꾸는지, 그 과정을 단계별로 정리하면 다음과 같다.",
        "The paragraphs below trace the paths that water follows as it travels between the ocean, the sky and the land, and as it changes state."
      ],
      "facts": [
        [
          "햇빛에서 열을 얻으면 물은 액체 상태를 벗어나 수증기가 되며 그 수증기는 공기 중으로 올라간다.",
          "When water absorbs heat from sunlight, it turns from a liquid into vapor and rises into the air."
        ],
        [
          "위로 올라간 수증기가 식으면 아주 작은 물방울로 변하는데, 이 물방울들이 모여서 구름을 이룬다.",
          "As that vapor rises, it cools, and the cooling turns it into tiny droplets that gather together as a cloud."
        ],
        [
          "구름 속 물방울이 뭉쳐 무거워지면 공기가 더는 떠받치지 못하므로, 그 방울은 비나 눈이 되어 땅으로 떨어진다.",
          "Once the droplets inside a cloud merge and grow too heavy for the air to support, they fall as rain or snow."
        ],
        [
          "땅에 닿은 물이 모두 강으로 흘러가는 것은 아니며 일부는 흙 사이 틈을 따라 내려가며 지하수가 된다.",
          "Not all of that rain runs off the surface — some of it sinks through the soil and becomes groundwater."
        ],
        [
          "강물은 지표를 지나고 지하수는 보이지 않는 길을 지나지만, 두 물줄기는 모두 바다로 되돌아갈 수 있다.",
          "Rivers carry water across the surface while groundwater moves underground, but both eventually return it to the sea."
        ],
        [
          "식물은 뿌리로 빨아올린 물을 잎의 구멍으로 내보내며 이 과정에서 상당한 양의 수증기가 대기에 더해진다.",
          "Plants also draw water up through their roots and release it as vapor through their leaves, adding moisture to the air around them."
        ],
        [
          "물의 순환은 동일한 물이 장소를 옮기는 이동에 그치지 않고 액체와 기체, 고체를 오가는 상태 변화도 포함한다.",
          "The water cycle, then, is not just water moving between places — it is also water changing between liquid, gas, and solid states."
        ],
        [
          "순환에 관여하는 힘은 여럿이지만, 증발과 대기의 흐름을 실제로 움직이는 주된 에너지원인 태양이 중심에 있다.",
          "Several forces drive this cycle, but the energy that powers evaporation and moves the air ultimately comes from the Sun."
        ]
      ],
      "inferences": [
        [
          "표면에서 물이 사라진 것처럼 보이더라도 그 물이 없어진 것은 아니며 수증기가 되어 공기 중에 남는다.",
          "Though water on a surface appears to vanish, it has not been destroyed, because it is still present in the air as vapour."
        ],
        [
          "구름이 생겨난 자리의 공기는 수증기가 물방울로 바뀔 만큼 열을 잃었으므로, 생기기 전과 견주면 온도가 낮다.",
          "The air where a cloud has just formed has lost enough heat that its vapour could condense, so it is cooler than it was before."
        ],
        [
          "같은 구름이라도 물방울이 작은 크기에 머무르는 한 무게가 모자라므로, 비가 내리기까지 시간이 더 걸린다.",
          "Even within one cloud, rain is delayed for as long as the droplets inside stay small, because drops of that size remain light."
        ],
        [
          "비가 그친 뒤 지표에 남은 물만 재면, 스며들거나 증발한 몫이 빠지므로 실제로 내린 비보다 적게 계산된다.",
          "Measuring the water left on the surface once rain stops gives a figure smaller than the rain that fell, because some has sunk in."
        ],
        [
          "바다에서 멀리 떨어진 내륙에 내린 비라도 하천과 지하수의 경로를 거치고 나면 결국 바닷물의 일부가 된다.",
          "Rain that falls deep inland does not stay there, because rivers and slow underground flows carry most of that water down to the ocean."
        ],
        [
          "잎이 무성한 숲에서는 나무가 내보내는 수증기가 더해지므로, 그 공기는 주변 지역보다 더 많은 수증기를 머금는다.",
          "In a forest whose leaves are dense, vapour from the trees is added to the air, which then holds more moisture than the nearby open land."
        ],
        [
          "물의 순환을 설명하려면 장소 사이의 이동만 짚어서는 부족하고 물이 어떤 상태로 바뀌는지까지 함께 다루어야 한다.",
          "An account of the water cycle stays incomplete if it follows the path of water without describing the changes of state that also happen."
        ],
        [
          "태양에서 오는 에너지의 양이 줄어들면 증발과 대기의 순환이 약해지므로 물의 순환 전체가 느리게 진행될 수 있다.",
          "If the energy arriving from the Sun falls, evaporation and the circulation of air both weaken, so that the whole water cycle runs more slowly."
        ]
      ],
      "applications": [
        [
          "햇볕이 드는 곳에 널어 둔 수건에서는 천에 배어 있던 물이 수증기로 바뀌고 공기 중으로 옮겨 가며 흩어진다.",
          "A wet towel that is hung out in warm sunlight dries because the water held in the cloth becomes vapour and moves into the air."
        ],
        [
          "차가운 컵의 바깥면에 물방울이 맺히는 것은, 공기 중 기체 상태의 물이 찬 표면에 닿으면 식는다는 사례다.",
          "Droplets forming on the outside of a cold glass show that water in gas form cools and returns to liquid on a chilled surface."
        ],
        [
          "구름 속에 흩어져 있던 물방울들이 서로 부딪쳐 하나로 합쳐지고 무게가 늘어나면 그 방울은 지표로 떨어진다.",
          "Small droplets that are scattered through a cloud collide, and when the merged drop is heavy enough, it is carried down to the ground."
        ],
        [
          "비가 그치고 지표가 말라 보이더라도, 흙으로 스며든 물의 일부는 그 아래에서 천천히 자리를 옮기며 움직인다.",
          "Even when the surface of a road looks dry again, part of the rain that soaked into the soil keeps moving slowly beneath it."
        ],
        [
          "산에 내린 비가 골짜기를 타고 하천에 모이고 바다에 이르는 길은, 물의 순환을 이루는 여러 경로 가운데 하나다.",
          "Rain that lands on a mountain, gathers into a stream and finally reaches the sea follows one of the several routes of the cycle."
        ],
        [
          "잎이 우거진 숲은 나무가 물을 꾸준히 내보내며 그 지역의 대기가 머금는 수증기의 양에 뚜렷한 영향을 준다.",
          "A forest whose trees release vapour through their leaves can raise the amount of moisture that the air above the region holds."
        ],
        [
          "물방울 하나는 순환의 길을 따라가는 동안 액체에서 기체로 바뀌고 다시 액체로 돌아오며 상태를 여러 번 오간다.",
          "A single drop of water may pass from liquid to gas and back again several times while it travels along the stages of the cycle."
        ],
        [
          "다른 조건이 그대로인 채 구름이 해를 가려 햇빛이 줄어들면, 수면에서 일어나는 증발의 속도도 함께 느려진다.",
          "When cloud cover reduces the sunlight that reaches a lake and other conditions stay the same, the rate at which water evaporates falls."
        ]
      ],
      "wrongApplications": [
        [
          "햇볕에 널어 둔 수건이 마르는 것은 천에 배어 있던 물이 햇빛에 흡수되고 그대로 사라진 일이라고 본다.",
          "A wet towel hung out in warm sunlight dries because the water held in the cloth is soaked up by the sunlight and destroyed."
        ],
        [
          "차가운 컵의 바깥면에 맺힌 물방울은, 컵 안에 들어 있던 물이 벽을 지나 밖으로 새어 나온 것이라고 본다.",
          "Droplets forming on the outside of a cold glass show that the drink inside has seeped through the wall and reached the outer face."
        ],
        [
          "구름이 두껍고 어둡게 보이면 그 안의 물방울이 어떤 크기이든 상관없이 곧 비가 내리게 된다고 볼 수 있다.",
          "A cloud that looks thick and dark will soon release rain whatever the size of the droplets inside, since thickness settles it."
        ],
        [
          "비가 그친 뒤 길바닥이 말라 보이면, 그때 내린 비는 모두 경사를 따라 강으로 흘러 들어간 것이라고 본다.",
          "Once the surface of a road looks dry again, we can say that all of the rain has run down the slope into the river."
        ],
        [
          "흙으로 스며든 물은 지표와 연결되지 않으므로, 아무리 시간이 흘러도 바다에 이르지 못하고 그 자리에 머무른다.",
          "Water that sinks into the soil is cut off from the rest of the cycle, so it stays in place and does not reach the sea."
        ],
        [
          "나무가 우거진 숲에서는 뿌리와 줄기가 물을 붙잡아 두고 내보내지 않으므로, 주변 공기는 오히려 메마르게 된다.",
          "In a forest the trees trap the water that they draw up instead of releasing it, so the air around them grows drier each year."
        ],
        [
          "물이 얼어 얼음이 되면 그 물은 더 움직이지 않으므로, 순환의 길에서 완전히 빠져나온 상태가 된다고 보아야 한다.",
          "A drop of water that freezes into ice has left the cycle for good, since solid water takes no further part in the movement."
        ],
        [
          "바람이 잦아든 날에는 햇빛이 아무리 강하더라도, 수면에서 일어나던 증발은 곧 멈추게 된다고 보아야 한다.",
          "When the wind drops away on a calm day, evaporation at the surface of a lake halts even though the sunlight remains strong."
        ]
      ],
      "wrong": [
        [
          "구름은 높은 곳의 수증기가 곧바로 빗방울 크기까지 자라면서 만들어지고 작은 물방울 단계는 거치지 않는다.",
          "Clouds first appear high in the air when vapour grows directly into drops of raindrop size, so the stage of tiny droplets is skipped."
        ],
        [
          "지표에 내린 비는 대부분 경사를 따라 강으로 흘러가며 흙으로 스며드는 몫은 순환에서 뚜렷한 자리를 얻지 못한다.",
          "Rain that has landed on the ground cycles mainly by running down slopes toward the ocean, while the portion sinking into soil counts little."
        ],
        [
          "흙으로 스며든 물은 지표에 고인 물과 비교하면 더 먼저 수증기로 바뀌므로, 대기로 돌아가는 순서가 앞선다.",
          "Water that has soaked into the soil turns into vapour sooner than water lying on the surface, so it returns to the air first."
        ],
        [
          "식물은 뿌리로 빨아올린 물을 잎으로 내보내지 않고 줄기에 모아 두므로, 그 지역의 물 순환 속도를 늦춘다.",
          "Plants slow the water cycle down because the water taken up by their roots is stored inside their stems rather than released as vapour."
        ],
        [
          "순환에 필요한 에너지의 양은 그날 바람이 얼마나 세게 부는지에 따라 정해지고 햇빛은 보조 역할에 머무른다.",
          "The energy that keeps the water cycle running is set by the strength of the wind, and sunlight plays a minor part in it."
        ],
        [
          "하늘에서 구름이 흩어져 사라지면 그 물은 대기 밖으로 빠져나가고 순환의 흐름에서 제외된 상태가 된다.",
          "When a cloud thins out and disappears from the sky, the water it contained has left the atmosphere rather than staying in another form."
        ],
        [
          "지하수는 한번 흙 속에 들어가고 나면 지표를 흐르는 물과 섞이지 않는 별개의 물로 남아 순환 밖에 머무른다.",
          "Once water sinks into the soil it remains a separate body of water that does not mix with the water flowing over the surface."
        ],
        [
          "바다에서 증발한 물은 육지로 이동하지 않고 바다 위 하늘에 머물다가 시간이 지나면 다시 그 바다에 비로 내린다.",
          "Water evaporating from the sea does not travel over land, because it rises, cools and falls as rain on the same stretch of ocean."
        ]
      ]
    }
  },
  "SCI-ECOSYSTEM": {
    "easy": {
      "intro": [
        "생물들이 서로 어떻게 이어져 사는지 알아보자.",
        "Here is how living things in one place are linked."
      ],
      "facts": [
        [
          "생산자는 햇빛의 힘으로 스스로 양분을 만든다.",
          "Producers make their own food using energy from sunlight."
        ],
        [
          "소비자는 이런 생산자나 다른 생물을 먹어서 힘을 얻는다.",
          "Consumers eat these producers or other living things to get energy."
        ],
        [
          "생산자와 소비자가 죽으면 분해자가 잘게 나누어 흙으로 돌려보낸다.",
          "When producers and consumers die, decomposers break down their remains and return them to the soil."
        ],
        [
          "이렇게 이어진 생산자·소비자·분해자를 먹이 그물이라 한다.",
          "Producers, consumers, and decomposers linked this way form a food web."
        ],
        [
          "먹이 그물 안에서 한 종의 수가 바뀌면 이어진 다른 종도 영향을 받는다.",
          "Within that web, a big change in one species touches other linked species."
        ],
        [
          "이렇게 이어진 생물들이 먹이와 물, 자리를 얻는 곳을 서식지라 한다.",
          "The place where these linked species find food, water, and space is a habitat."
        ],
        [
          "한 서식지에 사는 종이 다양할수록 환경 변화에 잘 버틴다.",
          "A habitat with many kinds of species handles change well."
        ],
        [
          "이런 먹이 관계를 따라 에너지도 옮겨 가며 단계마다 줄어든다.",
          "Energy also moves along these food links, dropping at each step."
        ]
      ],
      "inferences": [
        [
          "생산자가 없는 곳에서는 새 양분이 생기지 않는다.",
          "With no producers, no new food is made there."
        ],
        [
          "먹이가 되는 생물이 있어야 소비자도 살아간다.",
          "Consumers need other living things as food."
        ],
        [
          "분해자가 느린 땅에서는 양분이 늦게 다시 쓰인다.",
          "Slow decomposers delay the reuse of soil matter."
        ],
        [
          "먹이 그물에서 각 종은 여러 생물과 이어져 있다.",
          "In a food web, a single species has many food links."
        ],
        [
          "어떤 종이 갑자기 줄면 이어진 종도 달라진다.",
          "One species drops fast, and linked species change too."
        ],
        [
          "생물에게는 먹이와 물, 지낼 자리가 있어야 한다.",
          "Living things need living space along with food and water."
        ],
        [
          "종이 적은 생태계는 환경이 바뀌면 회복이 더디다.",
          "An ecosystem with few species heals more slowly after change."
        ],
        [
          "상위 포식자는 초식동물보다 수가 적게 유지된다.",
          "Top hunters stay fewer in number than the plant eaters below."
        ]
      ],
      "applications": [
        [
          "풀은 햇빛으로 양분을 만들어 먹이의 출발점이 된다.",
          "Grass uses sunlight to make food and starts a chain."
        ],
        [
          "사슴이 풀을 먹으면 풀의 에너지가 사슴에게 간다.",
          "A deer eats grass and takes in its stored energy."
        ],
        [
          "흙 속 분해자가 줄면 낙엽 분해가 더 느려진다.",
          "Fewer soil decomposers slow the breakdown of fallen leaves."
        ],
        [
          "생물 하나가 여러 먹이 사슬에 함께 나올 수 있다.",
          "One animal can belong to several food chains at once."
        ],
        [
          "곤충이 줄면 그 곤충을 먹는 새도 영향을 받는다.",
          "Fewer insects of one kind can harm the birds above."
        ],
        [
          "연못이 마르면 먹이와 물을 얻던 생물이 힘들어진다.",
          "A dry pond leaves its animals short of food and water."
        ],
        [
          "역할이 같은 종이 여럿이면 빈자리를 서로 메운다.",
          "Many species in one role soften the loss of one."
        ],
        [
          "같은 먹이로는 상위 포식자를 더 적게 먹여 살린다.",
          "The same food base feeds fewer hunters than plant eaters."
        ]
      ],
      "wrongApplications": [
        [
          "풀은 흙만 있으면 빛이 없는 곳에서도 양분을 만든다.",
          "Grass in a dark place still makes food from soil."
        ],
        [
          "사슴이 늘어난 곳에서도 풀의 양은 그대로 남는다.",
          "More deer arrive and the amount of grass holds steady."
        ],
        [
          "분해자가 사라지면 낙엽 양분이 흙으로 빨리 간다.",
          "Losing all decomposers sends leaf nutrients to soil faster."
        ],
        [
          "먹이 사슬 하나를 그리면 먹이 그물이 다 정리된다.",
          "Drawing a single food chain shows the entire food web."
        ],
        [
          "곤충이 줄어도 그 곤충을 먹는 새의 수는 그대로다.",
          "Fewer insects of one kind leave bird numbers unchanged."
        ],
        [
          "연못이 말라도 먹이를 놓아 주면 생물은 잘 지낸다.",
          "Food left at a dry pond keeps its animals fine."
        ],
        [
          "종이 여럿인 숲과 하나인 숲은 변화를 비슷하게 견딘다.",
          "A mixed forest and a one-tree forest endure change alike."
        ],
        [
          "먹이가 늘면 상위 포식자가 초식동물보다 많아진다.",
          "With more food, hunters can outnumber the plant eaters."
        ]
      ],
      "wrong": [
        [
          "생산자는 다른 생물에게 얻은 물질로 양분을 만든다.",
          "Producers turn material from other living things into food."
        ],
        [
          "분해자가 줄면 낙엽 물질이 흙으로 더 빨리 간다.",
          "Fewer decomposers move leaf matter into the soil faster."
        ],
        [
          "포식자가 늘면 먹이가 되는 종도 같이 늘어난다.",
          "More hunters bring more prey and a steady food web."
        ],
        [
          "먹이와 물의 양이 생물이 쓸 공간을 정한다.",
          "Food and water set the space animals can use."
        ],
        [
          "먹이 단계가 높을수록 에너지가 더 많이 모인다.",
          "Energy builds up as it moves to the top hunters."
        ],
        [
          "생산자는 흙의 양분만 빨아들여 빛 없이도 자란다.",
          "Producers pull soil nutrients up and grow with no light."
        ],
        [
          "먹이 그물에서 이어진 두 종은 같은 수로 늘어난다.",
          "Two linked species grow by the same number."
        ],
        [
          "종이 다양한 곳은 경쟁이 커져 변화에 더 약하다.",
          "Many species compete hard, so the place handles change badly."
        ]
      ]
    },
    "hard": {
      "intro": [
        "한 지역에 사는 생물들이 서로 어떤 관계로 이어져 살아가는지, 그 연결의 짜임을 항목별로 살펴보면 다음과 같다.",
        "The passage below sets out the ways in which the living things of a single place depend on one another for food and shelter."
      ],
      "facts": [
        [
          "생산자는 다른 생물에 기대지 않고 햇빛 같은 에너지를 받아들여 자기 몸에 필요한 양분을 스스로 만든다.",
          "Producers do not rely on other organisms for food, because they capture energy such as sunlight and use it to build their own nutrients."
        ],
        [
          "소비자는 스스로 양분을 만들지 못하므로, 식물이든 동물이든 다른 생물을 먹는 방식으로 필요한 에너지를 얻는다.",
          "Consumers cannot build nutrients this way, so they get their energy by feeding on producers or on other organisms."
        ],
        [
          "분해자는 죽은 생물과 배설물을 잘게 분해하며 그 속에 묶여 있던 물질이 흙으로 돌아가고 다시 쓰이도록 돕는다.",
          "Decomposers break down dead organisms and waste, releasing the matter locked inside them back into the soil."
        ],
        [
          "먹이 그물은 사슬 하나를 따로 떼어 낸 그림이 아니며 여러 사슬이 서로 얽히고 이어진 관계를 한꺼번에 보여 준다.",
          "A food web is not a single chain but the whole network of chains that link the species sharing a habitat."
        ],
        [
          "어떤 한 종의 수가 크게 늘거나 줄면, 그 종과 먹이 관계로 이어진 다른 종들에게도 변화가 차례로 이어진다.",
          "When one species' population rises or falls sharply, the species connected to it through feeding can change as well."
        ],
        [
          "서식지는 생물이 먹이와 물을 구하고 몸을 숨기거나 새끼를 기르는 데 필요한 공간까지 얻는 생활의 터전이다.",
          "A habitat supplies more than food and water — it also gives an organism the space it needs to shelter and breed."
        ],
        [
          "한 지역에 사는 생물의 종류가 다양하면, 환경이 달라지더라도 그 변화를 견디고 이겨 낼 가능성이 커진다.",
          "A community with many different species living together tends to withstand change better than one with few."
        ],
        [
          "에너지는 먹고 먹히는 관계를 따라 위 단계로 이동하지만, 단계를 지날 때마다 그 양은 눈에 띄게 줄어든다.",
          "Energy passes upward through these feeding relationships, but the amount available shrinks at every step because much of it is lost along the way."
        ]
      ],
      "inferences": [
        [
          "생산자가 없는 곳에서는 양분이 새로 만들어지지 않으므로, 다른 생물이 먹을 먹이도 생기지 않고 비어 있다.",
          "In a place that has no producers nothing new is made, which leaves no food there for other organisms to use."
        ],
        [
          "소비자의 수가 한자리에서 유지되려면 먹이가 되는 생물이 사라지지 않고 그 지역에 함께 남아 있어야 한다.",
          "The consumers of an area keep their numbers while the organisms that feed them stay in the same place as before."
        ],
        [
          "분해자의 활동이 느려진 땅에서는 낙엽과 사체가 오래 남으므로, 그 속의 양분을 다시 쓰려면 더 긴 시간이 걸린다.",
          "Where decomposers work slowly, leaves and remains sit longer, so the matter that they hold waits before it can be used again."
        ],
        [
          "먹이 그물을 펼쳐 보면, 한 종이 하나의 사슬에 머물지 않고 여러 생물과 먹이 관계를 맺고 있음을 알 수 있다.",
          "A food web makes clear that a single species is not confined to one chain but is joined to several others when it feeds."
        ],
        [
          "한 종의 수가 짧은 기간에 크게 달라진 지역에서는 그와 이어져 있던 다른 종들의 수도 뒤따라 달라지며 균형이 바뀐다.",
          "Where one population has changed sharply in a short time, the numbers of the species that were linked to it shift as well."
        ],
        [
          "생물이 한곳에서 계속 살아가려면 먹이와 물만으로는 충분하지 않고 몸을 두고 지낼 공간까지 갖춰져 있어야 한다.",
          "Food and water are not enough on their own, because an organism also needs somewhere to shelter if it is to stay put."
        ],
        [
          "사는 종의 수가 적은 생태계는 빈자리를 채워 줄 종이 마땅치 않으므로, 환경이 달라지면 회복이 더 더디게 진행된다.",
          "An ecosystem holding few species has no spare kinds that can fill an empty role, so it recovers slowly when its surroundings change."
        ],
        [
          "일정한 넓이의 지역을 놓고 보면, 먹이 단계가 높은 상위 포식자는 아래 단계의 초식동물보다 적은 수로 유지된다.",
          "Within one area the top hunters are held to smaller numbers than the plant eaters, because the food that reaches them supports fewer."
        ]
      ],
      "applications": [
        [
          "들판의 풀은 햇빛 에너지를 받아 스스로 양분을 만들고 저장하므로, 그 들판에서 이어지는 먹이 관계의 출발점이 된다.",
          "Grass in a field captures sunlight and builds nutrients, which makes it the starting point of the feeding links that follow."
        ],
        [
          "사슴이 들판의 풀을 뜯어 먹으면, 풀이 햇빛으로 만들어 몸에 저장해 둔 에너지의 일부가 사슴에게 옮겨 가며 쓰인다.",
          "When a deer grazes on grass, part of the energy that the grass had stored from sunlight passes into the body of the deer."
        ],
        [
          "흙 속에 사는 분해자가 크게 줄면, 땅에 쌓인 낙엽이 분해되어 흙으로 돌아가는 속도가 느려지고 낙엽이 오래 남는다.",
          "In a forest that has lost many soil decomposers, fallen leaves take longer to break apart because fewer organisms work on them."
        ],
        [
          "하나의 생물이 서로 다른 여러 먹이 사슬에 동시에 등장하며 여러 종과 이어지는 모습은, 복잡한 먹이 그물의 한 단면이다.",
          "One organism can appear in several chains at once, which is why a food web is drawn as a tangle that no line shows."
        ],
        [
          "어떤 지역에서 곤충 한 종의 수가 크게 줄어들면, 그 곤충을 먹이로 삼던 새들도 먹이를 구하기 어려워져 영향을 받는다.",
          "When one kind of insect becomes scarce across a region, the birds that had fed on it find much less to eat and decline."
        ],
        [
          "연못이 말라 사라지면, 그 물에서 먹이를 구하고 목을 축이던 생물들은 살아가는 데 필요한 조건을 잃고 어려움을 겪는다.",
          "Once a pond has dried out, the animals that drank there and hunted there lose conditions that they need and begin to struggle."
        ],
        [
          "비슷한 역할을 맡은 종이 여럿 있는 숲에서는, 그중 한 종이 줄어들더라도 남은 종들이 빈자리를 어느 정도 메워 준다.",
          "In a wood that holds several species with a similar role, the loss of any one of them is partly covered by the others."
        ],
        [
          "일정한 양의 먹이가 바탕에 놓여 있을 때, 그 먹이가 지탱할 수 있는 상위 포식자의 수는 초식동물보다 적을 수밖에 없다.",
          "Given a food base that does not change, the number of top hunters that it supports stays below the number of plant eaters."
        ]
      ],
      "wrongApplications": [
        [
          "들판의 풀은 흙에서 양분을 얻고 있으므로, 햇빛이 들지 않는 그늘에서도 스스로 양분을 만드는 일을 이어 갈 수 있다.",
          "Grass in a field draws nutrients from the soil, so it keeps making food when it stands in shade that sunlight misses."
        ],
        [
          "사슴의 수가 크게 늘어난 들판이라 하더라도, 뜯어 먹는 양과 상관없이 그곳의 풀의 양은 줄지 않고 그대로 유지된다.",
          "Even where the number of deer has risen sharply, the amount of grass in the field stays at the level that it held before."
        ],
        [
          "숲에서 분해자가 모두 사라지면, 낙엽에 들어 있던 양분이 오히려 더 빠르게 흙으로 스며들고 식물에게 되돌아간다.",
          "In a forest that has lost every one of its decomposers, the nutrients in fallen leaves reach the soil faster than before."
        ],
        [
          "어떤 생물의 먹이 사슬 한 줄을 종이에 그려 보면, 그 생물이 속한 먹이 그물의 짜임까지 한꺼번에 정리된 셈이 된다.",
          "Drawing a single chain for one animal is enough, since that one line already sets out the whole of the food web around it."
        ],
        [
          "어떤 지역에서 곤충 한 종의 수가 크게 줄어들어도, 그 곤충을 먹이로 삼던 새들의 수는 이전과 다름없이 유지된다.",
          "Even when one kind of insect becomes scarce across a region, the birds that had fed on it hold their numbers unchanged."
        ],
        [
          "연못이 말라 사라진 자리에 충분한 먹이를 놓아 주면, 그곳에 살던 생물들은 예전과 다름없는 생활을 이어 갈 수 있다.",
          "Once a pond has dried out, leaving food beside it lets the animals carry on with the same lives that they led before."
        ],
        [
          "여러 종이 어울려 사는 숲과 한 가지 나무만 심은 숲은, 환경이 크게 달라지더라도 그 변화를 비슷하게 견뎌 낸다.",
          "A wood that mingles many species and a plantation of one tree stand up to a changed climate in much the same way."
        ],
        [
          "먹이의 양이 크게 늘고 조건이 갖춰지면, 그 지역에서는 상위 포식자의 수가 초식동물보다 많아지는 일이 생길 수 있다.",
          "Where the supply of food grows large, the top hunters of that place can come to outnumber the plant eaters below them."
        ]
      ],
      "wrong": [
        [
          "생산자는 다른 생물의 몸에서 얻어 온 물질을 햇빛의 힘으로 바꾸고 자기 몸에 필요한 양분으로 만들어 쓴다.",
          "Producers gather material from the bodies of other organisms, which sunlight then turns into the nutrients that their own growth needs."
        ],
        [
          "분해자의 수가 크게 줄면 낙엽과 사체에 묶여 있던 물질이 오히려 더 빠르게 흙으로 옮겨 가므로, 순환이 빨라진다.",
          "Where decomposers grow scarce, the matter that leaves and remains hold passes into the soil more quickly than it did before."
        ],
        [
          "포식자의 수가 늘어나면 그 포식자에게 먹히는 종의 수도 함께 늘어나므로, 먹이 그물 전체가 더 안정된 상태가 된다.",
          "When the number of predators climbs, the prey species that they hunt climb with them, and the food web settles down."
        ],
        [
          "한 서식지에서 생물이 쓸 수 있는 공간의 크기는, 그곳에 먹이와 물이 얼마나 많은지에 따라 정해지고 달라진다.",
          "The space that organisms are able to use in a habitat is set by the amount of food and water that the place offers."
        ],
        [
          "먹이 단계가 한 칸씩 높아질수록 아래 단계의 에너지가 위로 모이므로, 상위 포식자에게 더 많은 에너지가 전달된다.",
          "Energy gathers while it climbs through the feeding levels, so the hunters that sit at the top receive larger amounts of it."
        ],
        [
          "생산자는 흙 속의 양분을 그대로 빨아들이고 그 물질로 몸을 이루므로, 햇빛이 닿지 않는 곳에서도 잘 자란다.",
          "Producers take soil nutrients straight into their bodies, which is why they grow well in a place that sunlight cannot reach."
        ],
        [
          "먹이 그물에서 이어져 있는 두 종은 한쪽의 수가 늘면 다른 쪽의 수도 똑같은 수만큼 늘어나며 나란히 움직인다.",
          "When two species are linked in a food web, a rise in one brings a rise that matches it exactly in the other."
        ],
        [
          "생물 다양성이 높은 곳은 종들 사이의 경쟁이 치열하므로, 환경이 달라지면 그 변화를 견디는 힘이 오히려 약해진다.",
          "A place that is rich in species stands weaker against change, because competition among the many species there wears it down."
        ]
      ]
    }
  },
  "SCI-WEATHER-CLIMATE": {
    "easy": {
      "intro": [
        "날씨와 기후를 나누어 보는 방법을 알아보자.",
        "Here is how to tell weather and climate apart."
      ],
      "facts": [
        [
          "날씨는 짧은 동안 그곳에 나타난 대기 상태다.",
          "Weather is the air at one place for a short time."
        ],
        [
          "이런 날씨를 그 지역에서 오래 지켜본 흐름을 기후라 한다.",
          "Climate is what you get by watching this weather in a region over the long term."
        ],
        [
          "그래서 하루 추운 날 하나로는 기후 변화를 말하지 못한다.",
          "That is why one cold day is not enough to show a climate change."
        ],
        [
          "날씨를 이루는 요소는 기온과 비와 바람이다.",
          "The elements that make up weather are temperature, rain, and wind."
        ],
        [
          "반면 기후를 견주려면 하루가 아니라 여러 해 자료가 필요하다.",
          "Comparing climates, by contrast, needs data from many years, not one day."
        ],
        [
          "이런 여러 해의 기후는 바다와 큰 산이 바꾸기도 한다.",
          "Seas and big mountains can shape the climate that forms over those years."
        ],
        [
          "한편 다가올 날씨는 관측 자료와 모형으로 예보에서 미리 본다.",
          "Forecasting the weather ahead, meanwhile, uses records and models."
        ],
        [
          "평균이 닮은 두 곳도 거친 날씨가 나타나는 횟수는 다를 수 있다.",
          "Even two places with equal averages can have more or fewer storms."
        ]
      ],
      "inferences": [
        [
          "같은 도시도 아침과 낮의 날씨는 달리 적힌다.",
          "Morning and midday air give one city two weather notes."
        ],
        [
          "올해 기록이 특이해도 기후 설명은 그대로 남는다.",
          "One odd year does not change the climate story of many years."
        ],
        [
          "기후가 가는 쪽은 하루보다 여러 해 자료로 안다.",
          "The way climate moves is read from long records, not one day."
        ],
        [
          "기온만 적은 기록은 그날의 날씨를 다 못 담는다.",
          "A temperature record alone tells little about a day's weather."
        ],
        [
          "자료 기간이 길수록 기후 비교는 더 믿을 만하다.",
          "A climate comparison grows more reliable as records get longer."
        ],
        [
          "위도가 닮아도 바다와의 거리에 따라 기후는 다르다.",
          "Sea distance can split the climates of two places at one latitude."
        ],
        [
          "예보가 틀려도 관측과 모형은 다음에도 쓸모가 있다.",
          "A missed forecast still leaves the records and models worth using."
        ],
        [
          "평균이 같은 두 곳도 대비하는 날씨의 종류는 다르다.",
          "Two places with one average may still prepare for unlike weather."
        ]
      ],
      "applications": [
        [
          "내일 우산이 필요한지는 오랜 평균이 아니라 내일 예보로 정한다.",
          "Whether tomorrow needs an umbrella is decided by tomorrow's forecast, not the long-term average."
        ],
        [
          "도시의 계절 모습은 여러 해 기록을 살펴서 안다.",
          "A city's season pattern shows up in records from many years."
        ],
        [
          "수십 년 변화는 추운 하루보다 오랜 관측으로 본다.",
          "A decades-long change is read from long records, not one cold day."
        ],
        [
          "기온이 같은 두 날도 비와 바람에 따라 다르다.",
          "Rain and wind can make two days at one temperature unlike."
        ],
        [
          "지역의 평소 모습은 여러 해 기록으로 살핀다.",
          "A region's usual pattern shows up in records from many years."
        ],
        [
          "산의 양쪽은 공기와 비가 달라 기후도 다르다.",
          "Rising air and rain give a mountain's two sides unlike climates."
        ],
        [
          "새 자료가 들어오면 예보 내용은 고쳐진다.",
          "New records can change what a forecast says."
        ],
        [
          "평균이 같은 두 곳도 폭염 위험은 다르다.",
          "Two places with one average can face unlike heat-wave risks."
        ]
      ],
      "wrongApplications": [
        [
          "내일 우산이 필요한지를 그곳의 30년 평균 비 양으로 정한다.",
          "Whether tomorrow needs an umbrella is decided by the area's thirty-year average rainfall."
        ],
        [
          "도시의 계절 모습은 지난달 기록만으로 다 안다.",
          "A city's season pattern shows up in records from last month."
        ],
        [
          "어제 눈이 왔으니 올겨울 기후가 추워졌다고 본다.",
          "Heavy snow yesterday means this winter's climate has turned colder."
        ],
        [
          "기온이 같은 두 날은 비와 바람이 달라도 같다.",
          "Two days at one temperature have the same weather, rain aside."
        ],
        [
          "두 도시 기후는 지난주 기록으로 결론을 낸다.",
          "Two cities' climates are judged from just last week's records."
        ],
        [
          "산의 양쪽은 같은 산이니 비도 같다고 본다.",
          "One mountain's two sides share the mountain, so their rain is alike."
        ],
        [
          "예보는 처음 내용을 두고 새 자료는 미룬다.",
          "A forecast keeps its first words and saves new records."
        ],
        [
          "평균이 같은 두 곳은 폭염 대비도 같게 한다.",
          "Two places with one average prepare for heat waves the same way."
        ]
      ],
      "wrong": [
        [
          "일주일 평균 기온은 지역의 계절 기후를 대표한다.",
          "A week's average temperature stands for a region's season climate."
        ],
        [
          "추운 날이 이어지면 오랜 기후 흐름도 따라 간다.",
          "A run of cold days moves the climate trend the same way."
        ],
        [
          "평균 기온이 같으면 공기 흐름도 비와 바람도 같다.",
          "Places with one average share air flow, so rain and wind match."
        ],
        [
          "바닷가와 내륙의 기온 차이는 위도에서 생긴다.",
          "Coast and inland temperature gaps come mostly from latitude gaps."
        ],
        [
          "관측 지점이 늘수록 모형이 다룰 범위는 줄어든다.",
          "More sites leave a model a smaller weather range to work out."
        ],
        [
          "하루에 기온이 크게 뛴 날은 기후가 흔들린 탓이다.",
          "A big one-day temperature swing comes from a shaky climate."
        ],
        [
          "기후 자료는 기간이 길면 요즘 날씨를 담지 못한다.",
          "A long record leaves climate data short of recent weather."
        ],
        [
          "비의 양 차이는 산 높이보다 도시 크기에서 온다.",
          "Rain gaps near mountains come from city size, not peak height."
        ]
      ]
    },
    "hard": {
      "intro": [
        "날씨와 기후는 같은 자료를 다루더라도 시간 규모가 다르므로, 기록을 읽을 때 둘을 갈라 보는 방법을 아래에 정리한다.",
        "Because weather and climate rest on different time scales, the following sets out how the two are told apart when records are read."
      ],
      "facts": [
        [
          "날씨는 어느 한 장소에서 짧은 기간 나타나는 대기 상태이며 같은 하루 안에서도 시간마다 달라질 수 있다.",
          "Weather is the state of the atmosphere at one place over a short span of time, and it can shift from hour to hour."
        ],
        [
          "기후는 한 지역에서 여러 해에 걸쳐 관찰한 날씨의 경향이므로, 하루의 기록과는 층위가 다르다.",
          "Climate, by contrast, is the pattern that emerges when a region's weather is tracked over many years."
        ],
        [
          "하루의 추운 날씨가 아무리 두드러지더라도, 그 하나만으로 여러 해에 걸친 기후 변화를 판단할 수는 없다.",
          "However striking one cold day may feel, it cannot serve as evidence that a region's climate has changed."
        ],
        [
          "기온과 강수량과 바람은 모두 그날의 날씨를 이루므로, 하나만 적어 두면 그날의 대기 상태는 드러나지 않는다.",
          "Temperature, precipitation, and wind together make up a day's weather, so a record of just one of them tells only part of the story."
        ],
        [
          "두 지역의 기후를 견주려면 몇 해 치 기록으로는 모자라며 여러 해에 걸쳐 꾸준히 모은 자료가 있어야 한다.",
          "Comparing two regions' climates takes more than a few years of data — the record has to span many years to be reliable."
        ],
        [
          "바다와 산맥이 만드는 조건은 공기와 습기의 흐름을 바꾸므로, 위도가 같은 지역이더라도 기후는 갈라질 수 있다.",
          "The sea and mountain ranges can alter the air and moisture around them, so two places at the same latitude can still have different climates."
        ],
        [
          "일기 예보는 관측 자료와 모형으로 앞으로의 대기 상태를 추정하므로, 결과가 어긋나더라도 방법이 무너지지는 않는다.",
          "A forecast combines observations with models to estimate coming weather, and a forecast that misses does not mean the method itself has failed."
        ],
        [
          "평균값이 비슷한 두 지역이라도 극한 날씨의 빈도까지 같다고 볼 수는 없으며 대비할 위험의 종류도 달라진다.",
          "Two regions with similar averages need not share the same frequency of extreme weather, so the risks each must prepare for can differ."
        ]
      ],
      "inferences": [
        [
          "같은 도시라도 오전과 오후의 대기가 서로 다르면, 그 하루의 날씨는 하나로 묶이지 않고 나뉘어 기록된다.",
          "When the air over one city differs between morning and midday, that day's weather is written not as one entry but as two."
        ],
        [
          "올해 기록 하나가 예년과 크게 어긋나더라도, 여러 해 자료로 세운 기후 설명이 그 한 해로 바뀌지는 않는다.",
          "Even though one year's record departs from the usual, the account of a climate that rests on many years is not rewritten."
        ],
        [
          "기후가 어느 쪽으로 가는지는 하루하루의 기록을 이어 붙여서는 드러나지 않고 여러 해에 쌓인 자료에서 판단된다.",
          "Which way a climate is moving does not appear when single days are strung together, but in the records that pile up across many years."
        ],
        [
          "기온만 적어 둔 기록은 그 값이 아무리 정확하더라도, 비와 바람을 담지 못하므로 그날의 날씨를 설명하지 못한다.",
          "An observation note that lists temperature alone, however exact the figure is, cannot describe a day whose rain and wind go unrecorded."
        ],
        [
          "두 지역의 기후를 견준 결과는 자료 기간이 길수록 우연한 한 해의 영향을 덜 받으므로 더 믿을 만한 값이 된다.",
          "A comparison between two regions' climates leans less on any chance year as the record that supports it grows longer, which makes it firmer."
        ],
        [
          "위도가 비슷한 두 지역이라도 바다에서 떨어진 거리가 다르면 기온의 오르내림이 달라지며 기후도 서로 갈린다.",
          "Two regions that take in sunlight at one latitude still part ways in climate whenever the distance that separates each from the sea differs."
        ],
        [
          "예보가 한 번 빗나갔다고 해서 관측과 모형을 쓴 예측이 쓸모를 잃지는 않으며 어긋난 기록은 다음 예보에 쓰인다.",
          "A forecast that misses once does not strip the observations and models of their use, because the miss feeds back into the forecasts that follow."
        ],
        [
          "평균 기온이 같은 두 지역이라도 극한 날씨가 찾아오는 방식이 다르면, 대비해야 할 위험의 종류도 서로 달라진다.",
          "Two regions whose average temperatures agree may still meet extreme weather in unlike ways, so that the hazards they prepare for differ as well."
        ]
      ],
      "applications": [
        [
          "내일 우산이 필요한지 알고 싶다면 30년 평균보다, 하루 이틀 앞을 다룬 단기 예보가 더 곧바로 쓰인다.",
          "If you want to know whether an umbrella is needed tomorrow, a short forecast that covers the next two days beats a thirty-year average."
        ],
        [
          "한 도시의 계절 특징을 정리하려면 지난달 기록으로는 모자라며 여러 해 같은 달의 기록을 견주어야 한다.",
          "To set out a city's seasonal character, the past month falls short, because the same months that many years supply have to be compared."
        ],
        [
          "지난 수십 년의 기온이 어느 쪽으로 갔는지 판단할 때에는, 한파가 닥친 하루보다 오랜 기간 쌓인 관측을 근거로 삼는다.",
          "When the direction of temperature over recent decades is judged, the ground that counts is a long run of observations, not one cold day."
        ],
        [
          "기온이 같은 두 날이라도 비의 양과 바람의 세기가 다르면, 그 두 날의 날씨는 하나로 묶이지 않고 나뉘어 설명된다.",
          "Even when two days share a temperature, they are set down as unlike weather if the rain and the wind were not the same."
        ],
        [
          "어느 지역의 평소 기후를 설명하려는 연구자라면 최근 몇 주의 기록보다, 수십 년에 걸쳐 쌓인 관측 자료를 먼저 살핀다.",
          "A researcher who describes a region's usual climate turns first to observations that span decades, rather than to notes that recent weeks supply."
        ],
        [
          "산맥을 사이에 둔 두 지역은 공기가 비탈을 오르내리며 수분을 잃거나 얻으므로, 가까이 있어도 기후가 다를 수 있다.",
          "Two regions split by a mountain range can hold unlike climates, because air that climbs one slope and sinks down the other loses moisture."
        ],
        [
          "예보가 나간 뒤에 새 관측 자료가 들어오면, 앞서 내놓은 예상은 그대로 두지 않고 다시 계산해 고친다.",
          "When new observations arrive after a forecast has gone out, the earlier estimate is not left as it stands but worked out again."
        ],
        [
          "평균 기온이 같은 두 지역이라도 낮 기온이 치솟는 날의 수가 다르면, 폭염 위험이 달라지므로 대비도 달라진다.",
          "Two regions with one average temperature face heat-wave risks of unlike size when scorching afternoons differ in number, so their plans differ."
        ]
      ],
      "wrongApplications": [
        [
          "내일 우산이 필요한지 알고 싶다면 단기 예보보다, 그 지역에 30년 동안 쌓인 평균 강수량이 더 맞는다.",
          "If you want to know whether an umbrella is needed tomorrow, the thirty-year rainfall average that the area keeps beats a short forecast."
        ],
        [
          "한 도시의 계절 특징을 정리하려면 지난 한 달 동안 모은 기록만 살펴도 그 계절을 설명할 수 있다.",
          "To set out a city's seasonal character, the past month is enough, because the same months that many years supply need not be compared."
        ],
        [
          "지난 수십 년의 기온 흐름을 판단할 때에는, 어제 눈이 크게 내린 일이 있으면 올겨울이 추워졌다고 결론지어도 된다.",
          "When the direction of temperature over recent decades is judged, heavy snow that fell yesterday counts as ground for calling this winter colder."
        ],
        [
          "기온이 같은 두 날이라면 비의 양과 바람의 세기를 확인하지 않아도, 그 두 날의 날씨는 같다고 묶어 설명된다.",
          "Once two days share a temperature, they are set down as the same weather even when the rain and the wind that fell go unchecked."
        ],
        [
          "두 도시의 기후를 견주려는 연구자라면 수십 년 자료를 기다릴 필요가 없으므로, 지난주에 모은 자료로도 결론을 내린다.",
          "A researcher who compares two cities' climates need not wait for decades, because the notes that last week supplied already settle it."
        ],
        [
          "산맥을 사이에 둔 두 지역은 같은 산줄기를 나누어 쓰고 있으므로, 비탈의 방향이 달라도 비의 양은 비슷하다고 본다.",
          "Two regions split by a mountain range hold rainfall of similar amount, because the slopes that face apart still belong to one mountain."
        ],
        [
          "예보가 나간 뒤에 새 관측 자료가 들어오더라도, 앞서 내놓은 예상은 그대로 두고 새 자료는 다음에 쓴다.",
          "When new observations arrive after a forecast has gone out, the earlier estimate stands and the newer figures wait for next time."
        ],
        [
          "평균 기온이 같은 두 지역이라면 낮 기온이 치솟는 날의 수를 세지 않아도, 폭염 대비는 같은 수준으로 세운다.",
          "Two regions with one average temperature face heat-wave risks of one size, so their plans match even when scorching afternoons go uncounted."
        ]
      ],
      "wrong": [
        [
          "일주일 동안 잰 평균 기온은 촘촘하게 관측한 값이므로, 그 지역의 계절 기후를 대표하는 자료로 삼아도 된다.",
          "A mean temperature measured across one week rests on readings that come closely spaced, which lets it stand for the seasonal climate of a region."
        ],
        [
          "평년보다 추운 날이 이어지면, 오랜 기간 그려 온 기후의 추세선도 그 방향을 따라 옮겨 가며 자리를 잡는다.",
          "When colder-than-average days run on, the long-term trend line that has been drawn for a climate shifts to follow them."
        ],
        [
          "평균 기온이 같은 두 지역은 비슷한 대기 순환을 겪으므로, 비의 양과 바람의 세기도 서로 닮은 값이 된다.",
          "Regions whose mean temperatures agree come under air circulation of a similar kind, so that the rain and the wind settle at alike values."
        ],
        [
          "해안과 내륙의 기온 변화 폭이 다른 까닭은 바다와의 거리가 아니라, 두 지역이 놓인 위도가 다르므로 생긴다.",
          "The gap between coastal and inland temperature swings does not come from the sea, because it is latitude that sets how far each swings."
        ],
        [
          "관측 지점이 촘촘해질수록 모형에 들어가는 자료가 늘어나므로, 모형이 계산할 날씨 변화의 범위는 오히려 줄어든다.",
          "As observation sites grow denser, the figures that enter a forecast model multiply, so that the range of weather change it works out narrows."
        ],
        [
          "하루 안에서 기온이 크게 오르내린 날이 나타나면, 그 지역의 기후가 이전보다 불안정해진 결과로 설명할 수 있다.",
          "When a day shows a wide swing of temperature, that swing is explained by a climate that has grown unsteady in the region."
        ],
        [
          "기후 자료는 관측 기간이 길수록 자료 수는 늘지만, 오래된 값이 섞이므로 최근 날씨의 특징은 담지 못한다.",
          "Climate data gathers more figures when the record lengthens, yet the older values that mix in leave it unable to show recent weather."
        ],
        [
          "산맥이 자리한 지역에서 강수량이 크게 갈리는 까닭은 산의 높이가 아니라, 아래 도시의 크기가 다르므로 생긴다.",
          "Rainfall near a mountain range splits sharply, because the cities that sit below differ in size rather than because the peaks differ in height."
        ]
      ]
    }
  },
  "SCI-ENERGY": {
    "easy": {
      "intro": [
        "에너지가 어떤 모습으로 바뀌어 옮겨 가는지 알아보자.",
        "Here is how energy changes form and moves."
      ],
      "facts": [
        [
          "전구는 전기 에너지의 일부를 빛으로 바꾼다.",
          "A lamp turns some electric energy into light."
        ],
        [
          "이렇게 형태를 바꾸는 에너지에는 운동 에너지도 있어, 움직이는 물체는 모두 이 에너지를 가진다.",
          "Energy that changes form like this also shows up as motion energy, which every moving object has."
        ],
        [
          "운동 에너지처럼 높은 곳에 있는 물체도 위치 에너지를 가진다.",
          "Just like motion energy, an object up high can hold position energy."
        ],
        [
          "배터리는 이런 에너지들과 달리 안에 모은 화학 에너지를 전기로 바꾼다.",
          "Unlike these, a battery turns chemical energy stored inside it into electricity."
        ],
        [
          "이렇게 여러 모습을 오가도 에너지는 없어지지 않는다. 다른 모습으로 바뀔 뿐이다.",
          "Moving between all these forms, energy does not vanish — it only changes into another form."
        ],
        [
          "이 원리는 마찰에서도 나타나, 마찰이 생기면 운동 에너지가 열로 바뀐다.",
          "This same idea shows up in rubbing, which turns some energy of motion into heat."
        ],
        [
          "태양 전지도 같은 원리로 빛 에너지를 전기로 바꾼다.",
          "A solar cell works the same way, turning light energy into electricity."
        ],
        [
          "효율은 이렇게 넣은 에너지 중 쓸모 있게 바뀐 몫을 말한다.",
          "Efficiency, then, is the useful share of that energy put in."
        ]
      ],
      "inferences": [
        [
          "전구에 들어간 전기 일부는 빛이 아닌 형태로 나온다.",
          "Some energy going into a lamp leaves in another form."
        ],
        [
          "멈춰 있던 물체가 움직이면 에너지 모습이 달라진다.",
          "A resting object gains a new energy form as it moves."
        ],
        [
          "책을 더 높은 곳에 두면 위치 에너지가 커진다.",
          "The same book gains more position energy on a higher shelf."
        ],
        [
          "오래 쓴 배터리는 처음보다 적은 전기를 내보낸다.",
          "A battery used for a long time sends out less electricity."
        ],
        [
          "일이 줄어도 넣은 에너지가 없어진 것은 아니다.",
          "Less useful work does not mean the energy put in has gone."
        ],
        [
          "미끄러지다 멈춘 자리는 바닥이 조금 따뜻해진다.",
          "The floor grows a bit warm where a sliding box comes to rest."
        ],
        [
          "흐린 날에는 태양 전지가 전기를 적게 만든다.",
          "A solar cell makes less electricity on a day with thick cloud."
        ],
        [
          "효율이 낮은 기계는 같은 일에 에너지가 더 든다.",
          "A machine with low efficiency needs more energy for the same job."
        ]
      ],
      "applications": [
        [
          "전구를 켜면 빛과 함께 열도 조금 생긴다.",
          "A lamp gives off heat along with light."
        ],
        [
          "같은 공이 더 빨리 구르면 운동 에너지도 커진다.",
          "The same ball rolling faster has more energy of motion."
        ],
        [
          "같은 두 책 중 높은 쪽이 떨어질 때 일을 더 한다.",
          "Of two equal books, the raised one does more work falling."
        ],
        [
          "손전등은 배터리에 모은 에너지로 전구를 켠다.",
          "A flashlight lights its lamp with battery energy."
        ],
        [
          "선풍기가 돌 때 전기는 날개 움직임과 열로 바뀐다.",
          "A running fan turns electricity into blade motion and heat."
        ],
        [
          "브레이크를 잡으면 바퀴의 열로 에너지가 바뀐 것이다.",
          "A braking wheel warms up as energy changes form."
        ],
        [
          "빛이 약해지면 태양 전지의 전기도 줄어든다.",
          "The same solar cell makes less power in weaker light."
        ],
        [
          "같은 일에 열이 덜 나는 기계가 에너지를 잘 쓴다.",
          "Of two machines doing one job, the cooler one wastes less."
        ]
      ],
      "wrongApplications": [
        [
          "전구가 따뜻할수록 빛으로 바뀌는 비율도 높다.",
          "A lamp turns a larger share into light when warm."
        ],
        [
          "무게가 다른 두 공도 빠르기가 같으면 에너지가 같다.",
          "Two balls of unlike weight at one speed have equal energy."
        ],
        [
          "무게가 같은 두 책은 높이가 달라도 에너지가 같다.",
          "Of two equal books, the raised one holds the same energy."
        ],
        [
          "손전등이 안 켜지면 배터리 에너지가 사라진 것이다.",
          "A dead flashlight shows its battery energy has gone."
        ],
        [
          "선풍기에서 나는 열은 쓴 전기와 상관없이 생긴다.",
          "A running fan makes heat apart from the electricity it uses."
        ],
        [
          "브레이크를 잡으면 바퀴의 열로 운동 에너지가 커진다.",
          "A braking wheel warms up as motion energy grows."
        ],
        [
          "그늘에 둔 태양 전지도 같은 양의 전기를 만든다.",
          "A shaded solar cell makes as much power as a bright one."
        ],
        [
          "같은 일에 열이 더 나는 기계가 에너지를 잘 쓴다.",
          "Of two machines doing one job, the hotter one wastes less."
        ]
      ],
      "wrong": [
        [
          "전구는 밝아질수록 빛으로 바뀌는 몫도 커진다.",
          "A brighter lamp changes a bigger share of power into light."
        ],
        [
          "빠르기가 같은 공은 무게가 달라도 에너지가 같다.",
          "Objects at one speed have alike motion energy at unlike weights."
        ],
        [
          "높이가 같은 물체는 무게가 달라도 에너지가 같다.",
          "Objects at one height have equal energy at unlike weights."
        ],
        [
          "마찰로 나는 열은 닿은 물질에서 새로 생긴다.",
          "Heat from rubbing is newly made by the touching stuff."
        ],
        [
          "효율 80%인 기계는 에너지의 80%를 열로 바꾼다.",
          "A machine at 80 percent efficiency turns 80 percent into heat."
        ],
        [
          "높은 곳의 물체가 바닥에 닿으면 에너지는 없어진다.",
          "An object loses all its energy the moment it lands."
        ],
        [
          "배터리는 전기를 담아 두었다가 그대로 내보낸다.",
          "A battery holds electricity inside and sends the same out later."
        ],
        [
          "태양 전지는 밝기와 상관없이 같은 양의 전기를 만든다.",
          "A solar cell makes a set amount of power at any brightness."
        ]
      ]
    },
    "hard": {
      "intro": [
        "에너지가 어떤 형태로 바뀌며 어디로 옮겨 가는지, 그리고 무엇이 열로 흩어지는지를 아래에 정리한다.",
        "The following sets out how energy changes form and where it travels, and what is kept while the part that scatters leaves as heat."
      ],
      "facts": [
        [
          "전구는 흘러 들어온 전기 에너지의 일부를 빛으로 바꾸지만, 나머지는 열이 되어 주위로 흩어지고 만다.",
          "A lamp turns part of the electrical energy it receives into light, while the rest escapes as heat."
        ],
        [
          "움직이는 물체는 그 움직임과 관련된 에너지를 지니며 같은 물체라면 빠르기가 클수록 그 양도 커진다.",
          "A moving object carries energy of motion, and that energy grows larger as its speed increases."
        ],
        [
          "바닥에서 높이 들어 올려진 물체는 위치 덕분에 에너지를 지니며 같은 물체라면 높을수록 그 양이 커진다.",
          "An object lifted above the ground holds energy because of its position, and that stored energy grows with height."
        ],
        [
          "배터리는 저장해 둔 화학 에너지를 전기 에너지로 바꾸어 내보내므로, 저장된 양이 줄면 나오는 전기도 줄어든다.",
          "A battery changes chemical energy stored inside it into electrical energy, so its output weakens as that store runs down."
        ],
        [
          "에너지는 전환 과정에서 없어지지 않고 다른 형태로 옮겨 가거나 모습을 바꾸므로, 쓸모가 줄었다고 사라진 것은 아니다.",
          "Energy is never destroyed as it changes — it only moves elsewhere or takes another form."
        ],
        [
          "두 물체가 서로 스치며 마찰이 일어나면 운동 에너지의 일부가 열로 바뀌므로, 닿은 자리의 온도가 올라간다.",
          "When two surfaces rub against each other, some of their motion energy turns into heat, warming the point of contact."
        ],
        [
          "태양 전지는 표면에 닿은 빛 에너지를 전기 에너지로 바꾸므로, 들어오는 빛이 약해지면 만드는 전기도 줄어든다.",
          "A solar cell converts the light that falls on it into electrical energy, so its output drops when the light grows weaker."
        ],
        [
          "기계의 효율은 넣어 준 에너지 가운데 쓸모 있는 일로 바뀐 몫을 가리키며 열로 빠져나가는 양이 많으면 낮아진다.",
          "Efficiency measures how much of a machine's input energy becomes useful work, so a machine that loses much of it as heat rates low."
        ]
      ],
      "inferences": [
        [
          "전구에 들어간 전기 에너지 가운데 빛으로 나오지 않는 몫이 있으므로, 그 나머지는 열로 빠져나가고 있다.",
          "Because part of the electrical energy that a lamp draws does not leave as light, the rest is leaving in another form, mostly heat."
        ],
        [
          "멈춰 있던 물체가 움직이기 시작하면 그 물체가 가진 에너지는 없어진 것이 아니며 형태만 서로 달라진 것이다.",
          "When an object at rest begins to move, the energy that it holds has not appeared from nowhere but has taken the form of motion."
        ],
        [
          "같은 물체를 더 높은 선반으로 옮겨 두면 바닥까지의 거리가 늘어나므로, 위치 덕분에 지니는 에너지도 커진다.",
          "When the same object moves to a higher shelf, the distance to the floor grows, and so does the energy that its position gives it."
        ],
        [
          "배터리를 오래 사용한 기기에서는 저장된 화학 에너지가 줄었으므로, 회로로 흘러나오는 전기도 처음보다 적어진다.",
          "In a device whose battery has run a long time, the chemical store that remains is smaller, so the current it supplies falls."
        ],
        [
          "장치가 내놓는 쓸모 있는 일이 줄었더라도 넣어 준 에너지가 없어진 것은 아니며 열이나 소리로 널리 흩어진 것이다.",
          "Even though a device returns less useful work, the energy put into it has not been destroyed, because that share scatters as heat and sound."
        ],
        [
          "미끄러지던 물체가 마찰로 멈추었다면 지녔던 운동 에너지가 닿은 자리를 데우는 데 쓰였으므로 바닥은 따뜻하다.",
          "If a sliding block has come to rest through friction, the motion energy it carried went into warming the surfaces that rubbed together."
        ],
        [
          "구름이 두껍게 낀 날에는 태양 전지에 닿는 빛이 줄어들므로, 같은 전지라도 맑은 날에 견주면 전기가 훨씬 적어진다.",
          "On a day when cloud cuts the light that reaches a solar cell, the same cell yields less electrical energy than under clear sky."
        ],
        [
          "효율이 낮은 기계는 넣어 준 에너지 가운데 열로 빠져나가는 몫이 크므로, 같은 일을 하려면 에너지가 더 많이 든다.",
          "A machine whose efficiency is low loses more of its input as heat, so that more energy goes in for the same work."
        ]
      ],
      "applications": [
        [
          "전구를 켜고 잠시 뒤에 유리가 따뜻해졌다면, 빛으로 바뀌지 않은 전기 에너지가 열로 나온 것이다.",
          "If the glass of a lamp grows warm, the share of electrical energy that did not become light has left as heat."
        ],
        [
          "같은 공을 더 세게 굴리고 나서 빠르기가 커졌다면 그 공이 지닌 운동 에너지도 커진 것으로 본다.",
          "When the same ball is rolled harder so that its speed rises, the energy of motion that it carries rises as well."
        ],
        [
          "무게가 같은 두 책 가운데 위 선반에 놓인 책은 떨어지며 더 큰 일을 할 수 있으므로 위치 에너지가 크다.",
          "Of two books of equal weight, the one that sits higher does more work as it falls, which means its position energy is larger."
        ],
        [
          "손전등에 불이 들어와 있다면 배터리에 저장된 화학 에너지가 전기로 바뀌어 전구까지 흐르고 있는 것이다.",
          "If a flashlight is giving light, the chemical energy that the battery stored is turning into electricity that flows to the lamp."
        ],
        [
          "선풍기가 도는 동안 전기 사용량이 늘고 있다면, 그 전기는 날개의 움직임과 몸체의 열로 나뉘어 바뀌는 중이다.",
          "While a fan runs, the electricity it draws is splitting into the motion of the blades and the heat that the body gives off."
        ],
        [
          "브레이크를 잡으면 바퀴와 패드가 뜨거워지므로, 자전거가 잃은 운동 에너지는 그 자리에서 열로 바뀐 것이다.",
          "When braking makes the wheel and the pad hot, the motion energy that the bicycle loses has turned into heat at that spot."
        ],
        [
          "같은 태양 전지라도 구름이 두꺼운 날에는 표면에 닿는 빛이 약해지므로, 그날 얻는 전기가 적게 나온다.",
          "Even for one solar cell, a day of thick cloud weakens the light that lands on it, so that the electricity gathered comes out lower."
        ],
        [
          "두 기계가 같은 일을 해낸다면 열로 빠져나가는 에너지가 적은 쪽이 넣어 준 에너지를 잘 쓰고 있는 것이다.",
          "If two machines do the same job, the one that lets less energy escape as heat is the one that uses its input well."
        ]
      ],
      "wrongApplications": [
        [
          "전구를 켜고 잠시 뒤에 유리가 따뜻해졌다면, 전기 에너지가 빛으로 바뀌는 비율도 커진 것이다.",
          "If the glass of a lamp grows warm, the share of electrical energy that the lamp turns into light has risen as well."
        ],
        [
          "무게가 다른 두 공이 같은 빠르기로 구르고 있다면 두 공이 지닌 운동 에너지도 같은 것으로 본다.",
          "When two balls of unlike mass roll at one speed, the energy of motion that each of them carries comes out the same."
        ],
        [
          "무게가 같은 두 책이라면 하나가 위 선반에 놓여 있더라도 두 책의 위치 에너지는 같은 값이라고 본다.",
          "Of two books of equal weight, the one that sits higher holds position energy that comes out the same as the floor book."
        ],
        [
          "손전등에 불이 들어오지 않는다면 배터리에 있던 화학 에너지가 어디로도 가지 않고 사라져 버린 것이다.",
          "If a flashlight gives no light, the chemical energy that the battery stored has gone nowhere else and has simply vanished."
        ],
        [
          "선풍기가 도는 동안 몸체에서 열이 나고 있다면, 그 열은 선풍기가 끌어 쓴 전기와 상관없이 따로 생긴 것이다.",
          "While a fan runs, the heat that the body gives off arises on its own, apart from the electricity that the fan draws."
        ],
        [
          "브레이크를 잡으면 바퀴와 패드가 뜨거워지므로, 그 열이 난 만큼 자전거가 지닌 운동 에너지도 커진 것이다.",
          "When braking makes the wheel and the pad hot, the motion energy that the bicycle carries has grown by as much as that heat."
        ],
        [
          "같은 태양 전지를 그늘로 옮기더라도 전지의 구조는 그대로이므로, 밝은 곳에서와 같은 전기를 만든다.",
          "Even for one solar cell moved into shade, the make of the cell holds, so that the electricity that it gathers matches a bright spot."
        ],
        [
          "두 기계가 같은 일을 해낸다면 열이 더 많이 나는 쪽이 넣어 준 에너지를 그만큼 힘차게 쓰고 있는 것이다.",
          "If two machines do the same job, the one that gives off more heat is the one that puts its input to stronger use."
        ]
      ],
      "wrong": [
        [
          "전구에서 나오는 빛이 밝아지면 전기 에너지가 빛으로 바뀌는 비율도 같은 폭으로 커지며 열로 나가는 몫은 줄어든다.",
          "As the light of a lamp grows brighter, the share of electrical energy that becomes light rises by the same amount, while heat falls."
        ],
        [
          "같은 빠르기와 방향으로 움직이는 두 물체는 질량이 다르더라도 운동 에너지가 비슷하므로 구르는 거리도 비슷하다.",
          "Two objects that move at one speed in one direction hold similar kinetic energy even though their masses differ, so they roll alike."
        ],
        [
          "바닥에서 잰 높이가 같은 두 물체는 바닥까지의 거리가 같으므로, 무게가 다르더라도 위치 에너지는 비슷하다.",
          "Two objects at the same height stand the same distance from the floor, so that the position energy which they hold comes out alike."
        ],
        [
          "마찰이 일어나면 열이 생기는데, 이 열은 닿은 두 물질의 성질에서 새로 만들어지므로 운동과는 관계가 없다.",
          "When friction warms two surfaces, the heat is made afresh by the properties of the materials that touch, so motion plays no part."
        ],
        [
          "효율이 80%인 기계는 넣어 준 에너지 가운데 80%를 열에너지로 바꾸므로, 나머지 20%가 쓸모 있는 일로 남는다.",
          "A machine that runs at 80 percent efficiency changes 80 percent of its input into heat, so that the other fifth stays useful."
        ],
        [
          "높은 곳에 있던 물체가 바닥에 닿으면 그 물체가 지녔던 에너지는 어디로도 옮겨 가지 않고 그 자리에서 없어진다.",
          "When an object that was raised reaches the floor, the energy it held moves nowhere else and simply ends at the point of landing."
        ],
        [
          "배터리는 전기 에너지를 그대로 담아 두었다가 필요할 때 꺼내 쓰는 장치이므로, 안에서 형태가 바뀌는 일은 없다.",
          "A battery is a device that keeps electrical energy inside as it is and sends it out when needed, so no change of form occurs."
        ],
        [
          "태양 전지는 빛이 닿기만 하면 정해진 양의 전기 에너지를 만들어 내므로, 흐린 날과 맑은 날의 전기 양은 같다.",
          "A solar cell turns out a set amount of electrical energy if any light touches it, so that a cloudy day yields what a clear day yields."
        ]
      ]
    }
  },
  "TECH-DIGITAL-SAFETY": {
    "easy": {
      "intro": [
        "온라인에서 계정과 정보를 지키는 방법을 알아보자.",
        "Here is how to keep your accounts and information safe."
      ],
      "facts": [
        [
          "긴 비밀번호는 짧은 것보다 알아내기 어렵다.",
          "A long password is harder to guess than a short one."
        ],
        [
          "이런 비밀번호를 사이트마다 다르게 쓰면 피해가 덜 번진다.",
          "Setting a different password for each site like this keeps a leak from spreading."
        ],
        [
          "비밀번호만으로 모자랄 때를 대비해 다단계 인증은 하나 더 물어본다.",
          "In case a password alone is not enough, two-step checking adds one more check."
        ],
        [
          "이렇게 지켜도 수상해 보이는 링크는 누르기 전에 보낸 사람과 주소를 먼저 본다.",
          "Even with these guards up, check the sender and address of a strange link before clicking it."
        ],
        [
          "마찬가지로 업데이트는 앱과 기기의 보안 문제를 고쳐 준다.",
          "In the same way, updates fix known security problems in apps and systems."
        ],
        [
          "이런 관리 못지않게 집 주소나 전화번호는 공개 글에 올리지 않는다.",
          "Just as important, do not post your home address or phone number in public posts."
        ],
        [
          "그래도 문제가 생기면 백업은 고장 난 기기의 파일을 되찾게 해 준다.",
          "If something still goes wrong, a backup helps you get files back from a broken device."
        ],
        [
          "이렇게 계정과 기기를 지키듯 인터넷 정보도 믿을 곳 여러 군데에서 다시 확인한다.",
          "Protecting accounts and devices like this, also check online information against several sources you trust."
        ]
      ],
      "inferences": [
        [
          "짧게 쓰던 사람도 글자를 늘리면 더 안전해진다.",
          "A short password gets safer with a few more letters."
        ],
        [
          "비밀번호가 같은 계정들은 사고 하나로 위험하다.",
          "A shared password lets one breach endanger other accounts."
        ],
        [
          "비밀번호가 알려져도 두 번째 확인이 침입을 막는다.",
          "Even a leaked password still has to clear a second check."
        ],
        [
          "링크를 누른 뒤에 확인하면 피해를 막을 수 없다.",
          "Checking the sender after the click cannot stop the damage."
        ],
        [
          "업데이트를 미룬 기기는 알려진 약점을 그대로 둔다.",
          "A device without updates keeps its already known weak points."
        ],
        [
          "사진 배경에서 사는 곳이 드러나도 위험은 똑같이 크다.",
          "A photo can show where you live and put you at the same risk."
        ],
        [
          "백업본을 같은 기기에 두면 고장이 날 때 함께 잃는다.",
          "A backup kept on the same device is lost with the original."
        ],
        [
          "베낀 글이 여러 곳에 퍼져도 원래 출처는 하나로 남는다.",
          "Many copied posts still trace back to one and the same source."
        ]
      ],
      "applications": [
        [
          "비밀번호가 길면 만들 수 있는 조합이 많아진다.",
          "Making a password longer gives far more possible combinations."
        ],
        [
          "비밀번호가 사이트마다 다르면 피해가 거기서 멈춘다.",
          "Different passwords keep one leak from reaching other sites."
        ],
        [
          "비밀번호를 안 사람도 두 번째 열쇠가 있어야 들어온다.",
          "Even someone with the password needs the second key too."
        ],
        [
          "친구 이름으로 와도 주소가 이상하면 전화로 묻는다.",
          "Even with a friend's name, call first if the link looks odd."
        ],
        [
          "보안 업데이트를 미루면 알려진 약점이 그대로 남는다.",
          "Putting off a security update leaves the weak point open."
        ],
        [
          "사진 속 이름표나 배경도 개인정보를 드러낸다.",
          "A name tag or background in a photo shows information."
        ],
        [
          "따로 떼어 둔 백업이 있으면 파일을 되찾기 쉽다.",
          "A backup kept apart makes recovery likely later on."
        ],
        [
          "같은 말을 따로 알아본 곳이 또 있는지 찾아본다.",
          "Check whether other groups looked into it on their own."
        ]
      ],
      "wrongApplications": [
        [
          "대문자로 쓴 짧은 낱말은 긴 비밀번호만큼 안전하다.",
          "Capitalizing a short word makes it as safe as long ones."
        ],
        [
          "비밀번호가 같아도 아이디가 다르니 안전하다고 본다.",
          "One password with different IDs keeps other sites safe."
        ],
        [
          "휴대폰을 잃은 뒤에는 다단계 인증을 꺼야 안전하다.",
          "After losing a phone, turning off the second key is said to help."
        ],
        [
          "친구 이름으로 오면 주소는 안 봐도 눌러도 된다.",
          "A friend's name makes the link address safe to click."
        ],
        [
          "알림이 잦은 기기는 최신이라는 뜻이니 알림을 꺼 둔다.",
          "Frequent update notices mean the device is already current."
        ],
        [
          "작게 나온 이름표는 안 드러나니 올려도 된다.",
          "A small name tag in a photo shows nothing private."
        ],
        [
          "같은 기기 다른 폴더에 두면 고장 나도 되찾는다.",
          "Another folder on the same device brings files back."
        ],
        [
          "같은 문장이 여러 블로그에 있으면 출처가 많은 것이다.",
          "The same sentence on many blogs means many sources."
        ]
      ],
      "wrong": [
        [
          "긴 비밀번호 하나를 여러 곳에 쓰면 더 안전하다.",
          "One long password used everywhere beats short different ones."
        ],
        [
          "아는 사람의 링크는 주소보다 말투를 먼저 본다.",
          "A known sender's wording matters more than the link address."
        ],
        [
          "다단계 인증은 기록을 저장해 다음 접속을 돕는다.",
          "Two-step checking saves a login record for next time."
        ],
        [
          "클라우드 동기화는 따로 만든 백업과 효과가 같다.",
          "Cloud syncing gives the same result as a separate backup."
        ],
        [
          "검색 위쪽 정보는 많은 사람이 골라서 더 믿을 만하다.",
          "Many users pick top search results, so they are reliable."
        ],
        [
          "다단계 인증을 켜면 비밀번호가 때마다 새로 만들어진다.",
          "Two-step checking creates a fresh password on its own regularly."
        ],
        [
          "앱 업데이트는 기능용이라 보안은 기기 바꿀 때 고친다.",
          "App updates just add features, so security gets fixed only when the device is replaced."
        ],
        [
          "개인정보는 글을 지우면 퍼진 것까지 되돌아온다.",
          "Deleting a post takes back details already copied elsewhere."
        ]
      ]
    },
    "hard": {
      "intro": [
        "온라인에서 계정과 정보를 지키려면 무엇을 확인해야 하고 어떤 습관이 위험을 키우는지 아래에 정리한다.",
        "The points below set out what to check first if you want to protect your accounts, and which habits quietly increase the risk online."
      ],
      "facts": [
        [
          "글자 수가 넉넉한 비밀번호는 가능한 조합이 훨씬 늘어나므로, 짧은 비밀번호보다 추측으로 뚫리기 어렵다.",
          "A longer password allows for far more possible combinations, so it is usually harder to guess than a short one chosen quickly."
        ],
        [
          "비밀번호를 서비스마다 다르게 정해 두면, 한 곳에서 유출이 일어나더라도 다른 계정까지 번지지는 않는다.",
          "Setting a different password for each service keeps a leak at one site from spreading to the accounts that remain."
        ],
        [
          "다단계 인증은 비밀번호가 맞는지 보는 데서 끝나지 않으며 본인만 지닌 수단을 한 번 더 확인한다.",
          "Multi-factor authentication does not stop at a matching password — it also requires a second proof that only the real user holds."
        ],
        [
          "의심이 드는 링크라면 곧바로 누르지 말고 보낸 사람과 주소가 어디로 이어지는지를 먼저 확인해야 한다.",
          "Before opening a suspicious link, check who actually sent it and where the address leads."
        ],
        [
          "운영체제와 앱을 제때 업데이트하면, 이미 알려진 보안 결함을 제조사가 마련한 수정으로 메울 수 있다.",
          "Updating systems and apps promptly closes security flaws that have already been made public and could otherwise be exploited."
        ],
        [
          "누구나 볼 수 있고 오래 남는 공개 글에는, 개인을 특정할 수 있는 주소나 연락처를 올리지 않는 편이 안전하다.",
          "A public post that stays online is safer if it leaves out details such as a home address or phone number."
        ],
        [
          "백업은 평소에는 쓸 일이 없지만, 기기가 고장 나거나 파일이 손상된 뒤 원래대로 되돌리려 할 때 큰 도움이 된다.",
          "A backup sits unused most of the time, but it becomes essential once a device fails or files are damaged and need to be restored."
        ],
        [
          "온라인에서 얻은 정보는 그대로 받아들이지 말고 믿을 만한 여러 출처와 견주어 확인해 보아야 한다.",
          "Information found online should be checked against several trustworthy sources rather than accepted as it stands."
        ]
      ],
      "inferences": [
        [
          "짧은 비밀번호를 오래 써 온 사람이더라도 글자 수를 늘려 다시 정하면 추측에 버티는 힘은 그만큼 올라간다.",
          "Even a person who has relied on a short password raises the resistance that it offers to guessing when more characters are added."
        ],
        [
          "여러 서비스에 같은 비밀번호를 쓰고 있다면, 한 곳의 사고는 거기서 끝나지 않고 나머지 계정의 위험까지 키운다.",
          "If one password is used at several services, an incident at a single site raises the risk that every other account of that user faces."
        ],
        [
          "비밀번호가 이미 새어 나갔더라도 추가 확인 단계가 남아 있으면, 침입을 막아 주는 문턱은 그대로 유지된다.",
          "Even when a password has already leaked, the extra step that the service demands at sign-in keeps the barrier against intrusion standing."
        ],
        [
          "링크를 누르고 나서 확인하는 순서라면, 그 확인은 피해를 막는 힘을 이미 잃은 상태가 된다.",
          "When the sender is checked after the link has already been opened, the check merely reports what has happened instead of preventing the harm."
        ],
        [
          "업데이트를 오래 미뤄 둔 기기는, 수정본이 나와 있는데도 공개된 약점을 그대로 지닌 채 쓰이고 있는 셈이다.",
          "A device whose updates have been put off keeps running with weaknesses that are already public and widely described, even though a fix exists."
        ],
        [
          "주소를 직접 적지 않았더라도 사진 배경이나 설명에서 사는 동네가 드러나면, 같은 종류의 위험이 생긴다.",
          "Even though an address is not typed out anywhere, a background in a photo or a caption that shows the neighbourhood creates the very same risk."
        ],
        [
          "백업을 원본과 같은 기기에 넣어 두고 안심하면, 그 기기가 젖거나 고장 났을 때 원본과 사본을 함께 잃는다.",
          "A backup that is stored on the same device as the original disappears together with it when that one device is dropped, lost or badly damaged."
        ],
        [
          "하나의 자료를 그대로 옮겨 적은 글이라면 그 수가 늘어도, 확인에 쓸 출처는 여전히 하나에 머문다.",
          "When many posts copy a single source word for word, the number of posts keeps growing while the basis that a reader can actually check stays one."
        ]
      ],
      "applications": [
        [
          "비밀번호의 길이를 몇 자 더 늘리면, 가능한 조합의 수가 크게 불어나서 추측으로 맞히기는 어려워진다.",
          "Adding a few more characters to a password enlarges the set of combinations that an attacker has to work through, which makes guessing harder."
        ],
        [
          "한 사이트의 비밀번호가 새어 나가더라도 다른 사이트의 비밀번호가 서로 다르면, 피해는 그 사이트에 머문다.",
          "Even if the password at one site leaks, the different passwords that guard the other sites keep the damage inside that single site."
        ],
        [
          "비밀번호를 이미 알아낸 공격자라 하더라도 추가 인증 수단을 갖추지 못하면, 로그인을 끝내지 못한다.",
          "An attacker who has already worked out the password cannot finish the login if the second factor that the owner alone carries is missing."
        ],
        [
          "친구 이름으로 온 메시지라 하더라도 주소가 달라 보이면, 다른 통로로 본인에게 물어 확인하는 편이 안전하다.",
          "A message that carries a friend's name still deserves a call or another channel if the link address does not look the way it usually does."
        ],
        [
          "보안 수정이 담긴 업데이트를 미루면, 이미 공개된 취약점이 그대로 남아 공격의 통로가 될 수 있다.",
          "An update that contains a security fix leaves a published weakness sitting in the device if it is postponed week after week."
        ],
        [
          "공개한 사진 속 명찰이나 창밖 건물은, 본문에 적지 않았더라도 개인을 알아보게 하는 단서가 된다.",
          "A name tag that can be read in a public photo, or a building behind the window, works as a clue that identifies the person."
        ],
        [
          "원본과 다른 곳에 따로 보관한 백업이 있으면, 파일이 손상된 뒤에도 되돌릴 가능성이 높아진다.",
          "A backup that is kept in a place apart from the original raises the chance that an earlier version can be restored after files are damaged."
        ],
        [
          "같은 주장을 두고 서로 관련 없는 기관들이 저마다 조사하고 같은 결론에 이르렀는지 확인할 필요가 있다.",
          "It is worth checking whether several bodies that have no link to each other studied the claim on their own before they reached the same conclusion."
        ]
      ],
      "wrongApplications": [
        [
          "짧고 익숙한 단어의 첫 글자를 대문자로 바꾸면, 글자 수를 크게 늘린 비밀번호만큼 안전해질 수 있다.",
          "Changing the first letter of a short familiar word that everyone knows to a capital is treated as though it matched a much longer password."
        ],
        [
          "여러 사이트에 같은 비밀번호를 쓰고 있지만 아이디를 다르게 해 두었으므로, 번질 걱정은 없다고 판단한다.",
          "The same password is paired with a different ID at each site, which is taken to mean that a leak cannot reach the other accounts."
        ],
        [
          "휴대전화를 잃은 뒤라면 인증 문자가 엉뚱한 곳으로 가므로, 다단계 인증을 꺼 두는 편이 더 안전하다.",
          "A lost phone sends the codes nowhere useful, so it is assumed that the account stays safer if multi-factor authentication is switched off."
        ],
        [
          "친구 이름으로 온 메시지라면 계정이 도용됐을 리 없으므로, 링크 주소를 살피지 않고 눌러도 위험이 적다.",
          "A message that arrives under a friend's name is taken as safe, so the link inside is opened before anyone looks at the address."
        ],
        [
          "업데이트 알림이 자주 뜨는 것은 기기가 이미 최신이라는 뜻이므로, 알림을 꺼 두어도 문제가 없다.",
          "Notices about updates appear so often that the device is read as already current, and for that reason the notices are switched off."
        ],
        [
          "명찰이 작게 찍히고 글씨도 흐릿하면, 개인정보가 드러날 일은 없으므로 사진을 그대로 올려도 된다.",
          "The name tag appears small and blurred in the photo, which is read as proof that nothing private is on show, so it is posted."
        ],
        [
          "파일을 같은 기기 다른 폴더에 복사해 두면, 기기가 고장 나더라도 사본으로 되돌릴 수 있다.",
          "A copy of the file sits in another folder of the same device, which is expected to allow recovery even when the device breaks down."
        ],
        [
          "똑같은 문장이 여러 블로그에 그대로 올라와 있으면, 서로 독립적인 출처가 그만큼 많이 확보된 셈이다.",
          "The identical sentence appears on many blogs at once, which is counted as the support that a large number of separate independent sources have given."
        ]
      ],
      "wrong": [
        [
          "충분히 긴 비밀번호라면 여러 서비스에 함께 써도, 짧고 서로 다른 비밀번호를 쓰는 경우보다 유출 위험이 낮다.",
          "A password that is long enough lowers the risk of a breach even if it is reused everywhere, more than short passwords that differ site by site."
        ],
        [
          "아는 사람의 계정에서 온 링크라면 주소를 뜯어보지 않고 말투가 자연스러운지를 먼저 살피는 편이 효율적이다.",
          "When a link comes from an account that is familiar, judging whether the wording sounds natural is more useful than reading the address itself."
        ],
        [
          "다단계 인증은 비밀번호 확인 뒤 로그인 기록을 저장하는 기능이며 쌓인 기록이 다음 접속을 안전하게 해 준다.",
          "Multi-factor authentication saves a record of the login after the password has been checked, which is how it improves the safety of later access."
        ],
        [
          "클라우드 동기화는 파일을 여러 기기에 복사하며 사본이 남으므로 별도의 백업과 같은 복구 효과를 준다.",
          "Cloud synchronization copies the same files onto several devices, so that the copies deliver the recovery effect that a separate backup would give."
        ],
        [
          "검색 결과 위쪽에 오른 자료는 많은 이용자가 골라 본 것이므로, 출처의 신뢰도도 더 높은 편이라 할 수 있다.",
          "Material that stands near the top of a search list has been chosen by many users, which means its source is more reliable than lower entries."
        ],
        [
          "다단계 인증을 켜 두면 비밀번호가 주기마다 새로 만들어지므로, 같은 비밀번호를 계속 써도 문제가 없다.",
          "When multi-factor authentication is turned on, the password is generated again at set intervals, so that the same one can stay in use."
        ],
        [
          "앱 업데이트는 새 기능을 넣고 다듬는 작업이므로, 보안 문제는 기기를 바꿀 때 함께 해결하는 편이 낫다.",
          "Because an update to an app is work that adds new features, security problems are better left until the device itself is replaced."
        ],
        [
          "한번 공개한 개인정보라도 게시물을 지우기만 하면, 이미 퍼진 내용까지 함께 지워지며 다시 안전해진다.",
          "Even after private details have been made public, deleting the post pulls back the copies that already spread, so the details become safe again."
        ]
      ]
    }
  },
  "SOC-DEMOCRATIC-DECISION": {
    "easy": {
      "intro": [
        "여럿이 함께 결정하는 자리에서 살펴볼 점을 알아보자.",
        "Here is what to think about in a group decision."
      ],
      "facts": [
        [
          "다 같이 정하는 자리에서는 여러 의견을 들어야 한다.",
          "A group decision needs a chance for different views."
        ],
        [
          "이때 근거를 살펴야 의견을 더 공정하게 비교할 수 있다.",
          "Checking the evidence at this point makes a fair comparison of views easier."
        ],
        [
          "이렇게 견준 뒤 다수결로 정해도, 그것도 한 방법일 뿐 소수의 권리도 함께 살핀다.",
          "Even after weighing evidence this way, majority voting is only one way — minority rights still matter."
        ],
        [
          "다수결로 정하는 자리에서도 토론은 놀리는 자리가 아니라 문제를 따지는 자리다.",
          "Even while deciding by vote, discussion is not for insults. It is for examining issues."
        ],
        [
          "이런 토론과 결정의 과정과 기준을 공개하면 책임을 묻기 쉬워진다.",
          "Sharing this process of discussion and decision, along with its rules, makes people answerable."
        ],
        [
          "그런데 이렇게 정해도 처지가 다른 사람은 같은 규칙을 다르게 겪는다.",
          "Even a rule shared this way can still affect different people in different ways."
        ],
        [
          "그래서 합의는 차이를 없애기보다 이런 사람들이 받아들일 안을 찾는 일이다.",
          "That is why consensus looks for an option everyone can accept, not sameness."
        ],
        [
          "이렇게 정한 뒤에도 결과를 살펴서 규칙을 고칠 수 있다.",
          "Even a rule decided this way can change later once the results are reviewed."
        ]
      ],
      "inferences": [
        [
          "몇 사람이 말을 도맡은 회의에는 빠진 의견이 남는다.",
          "A meeting where a few spoke leaves many views unheard."
        ],
        [
          "결론이 같은 의견도 근거가 다르면 살필 곳이 다르다.",
          "Two views sharing a conclusion may need different checks."
        ],
        [
          "진 쪽의 요구도 권리 문제라면 다시 살펴야 한다.",
          "A losing side's rights claim is a reason to look again."
        ],
        [
          "상대 말투를 따지는 토론은 쟁점에 쓸 시간이 줄어든다.",
          "Talk about someone's manner leaves less time for the issue."
        ],
        [
          "기준 없이 결과만 알리면 나중에 책임을 묻기 어렵다.",
          "A result announced without the rules makes it hard to assign blame later."
        ],
        [
          "같은 규칙이라도 사람마다 부담의 크기는 다르다.",
          "The same rule can still weigh more heavily on some people."
        ],
        [
          "이견이 조금 남았다고 합의가 안 된 것은 아니다.",
          "Some leftover disagreement does not mean the consensus failed."
        ],
        [
          "뒤늦은 문제는 잘못이라기보다 규칙을 고칠 거리다.",
          "A problem found later is less an error than a basis for change."
        ]
      ],
      "applications": [
        [
          "회의에서 말하는 기회를 고르게 나누면 더 공정하다.",
          "Sharing speaking turns evenly makes the group fairer."
        ],
        [
          "두 제안을 견줄 때는 어떤 자료를 썼는지 본다.",
          "Comparing two plans means looking at the data behind each."
        ],
        [
          "표결에서 이긴 안도 남의 권리를 해치는지 살핀다.",
          "A winning plan still needs a check on people's rights."
        ],
        [
          "사람이 아니라 그 사람의 주장과 근거를 따진다.",
          "Criticize the claim and its evidence, not the person."
        ],
        [
          "기준과 회의 기록을 공개하면 이유를 물을 수 있다.",
          "Publishing the rules and records lets people ask why."
        ],
        [
          "길을 바꾸면 걷는 학생과 타는 학생의 영향이 다르다.",
          "A route change affects walkers and riders in different ways."
        ],
        [
          "맞서는 사람들도 받아들일 방법을 함께 찾아본다.",
          "The group looks for an answer both sides can accept."
        ],
        [
          "새 규칙에 문제가 나오면 그 결과로 규칙을 고친다.",
          "A new rule's problems can justify changing it later."
        ]
      ],
      "wrongApplications": [
        [
          "시간을 아끼려고 반대 의견은 나중에 글로만 받는다.",
          "To save time, opposing views are taken in writing later."
        ],
        [
          "발표 자료가 더 자세한 제안이 근거도 튼튼하다.",
          "The plan with more detailed slides has stronger evidence."
        ],
        [
          "이긴 안이니 소수 학생의 이동 문제는 미뤄도 된다.",
          "The plan won, so a minority's travel problem can wait."
        ],
        [
          "지난번에 늦은 사람의 제안은 믿기 어렵다고 본다.",
          "A person who came late last time makes a weak proposal."
        ],
        [
          "혼란을 줄이려고 결과만 알리고 기준은 밝히지 않는다.",
          "To avoid confusion, the rules are left out of the notice."
        ],
        [
          "차로 오는 학생의 의견을 물으면 전체 영향을 안다.",
          "Asking the students who ride shows the whole impact."
        ],
        [
          "양쪽이 다 만족할 때까지 결정을 미루기로 한다.",
          "The group waits until both sides are fully happy."
        ],
        [
          "문제가 드러나도 이미 만든 규칙은 두는 편이 낫다.",
          "A rule already set is better kept as it is."
        ]
      ],
      "wrong": [
        [
          "사람이 많으면 대표 의견을 먼저 정하는 게 낫다.",
          "With many people, the main view should be settled first."
        ],
        [
          "근거보다 의견마다 같은 시간을 주는 것이 더 공정하다.",
          "Equal time for each view matters more than evidence quality."
        ],
        [
          "과반수 결정을 먼저 내린 뒤 소수 권리를 손본다.",
          "Decide by majority first and fix rights issues during rollout."
        ],
        [
          "주장보다 말하는 사람의 속셈을 먼저 따져야 정확하다.",
          "Judging the speaker's motives first makes the answer accurate."
        ],
        [
          "절차가 투명하면 평가는 참여자의 만족도로 한다.",
          "A clear process lets later review focus on satisfaction."
        ],
        [
          "기회를 고르게 나눈 회의는 사람이 늘어도 시간이 같다.",
          "Even turns keep decision time the same as numbers grow."
        ],
        [
          "합의된 안은 차이가 정리되어 다시 다룰 일이 적다.",
          "A consensus option has settled differences and rarely returns."
        ],
        [
          "가장 크게 영향받는 집단의 의견이 전체를 보여 준다.",
          "The most affected group's view shows the whole impact."
        ]
      ]
    },
    "hard": {
      "intro": [
        "여럿이 모여 하나의 결정을 내리려면 무엇을 살펴야 하고 어떤 점을 놓치기 쉬운지 아래에 정리한다.",
        "The points below set out what a group should weigh when it makes a decision together, and which considerations are easily overlooked."
      ],
      "facts": [
        [
          "공동의 결정을 내리는 자리라면 결론을 서두르기보다, 서로 다른 의견을 말할 기회가 먼저 주어져야 한다.",
          "Before a group settles a matter together, everyone with a different view needs the chance to state it."
        ],
        [
          "각 주장이 어떤 근거 위에 서 있는지 확인하고 나면, 서로 다른 의견을 한결 공정하게 견주어 볼 수 있다.",
          "Checking the evidence behind each claim first lets competing views be compared more fairly."
        ],
        [
          "다수결은 여럿의 뜻을 모으는 한 가지 방법이지만, 그 결과가 소수의 권리를 어떻게 건드리는지도 살펴야 한다.",
          "Majority voting is one way to settle a question, but the rights of the minority still have to be weighed once the votes are counted."
        ],
        [
          "토론의 목적은 상대를 깎아내리는 데 있지 않고 어느 주장이 더 단단한 근거를 지녔는지 따져 보는 데 있다.",
          "The point of discussion is not to humiliate an opponent but to examine the issue and see which claim the evidence actually supports."
        ],
        [
          "어떤 과정을 거쳐 무슨 기준으로 골랐는지를 공개하고 기록으로 남기면, 나중에 책임을 묻기가 한결 쉬워진다.",
          "Publishing the process and criteria behind a decision lets people later hold the decision-makers accountable for it."
        ],
        [
          "이해관계가 다른 사람들은 같은 정책이 시행되더라도, 처지에 따라 영향의 크기를 다르게 겪고 평가한다.",
          "Because people's situations differ, the same policy can affect them in different ways."
        ],
        [
          "합의는 구성원의 차이를 남김없이 없애는 일이 아니며 서로 감당할 수 있는 안을 함께 찾아 가는 과정에 가깝다.",
          "Consensus is less about erasing every difference than about finding an option every side can accept."
        ],
        [
          "결정을 내린 뒤에도 그 결정이 실제로 어떤 결과를 낳았는지 살펴보고 필요하다면 규칙을 다시 고칠 수 있다.",
          "Even after a decision is made, a group can review its results and revise the rule if that turns out to be necessary."
        ]
      ],
      "inferences": [
        [
          "발언 순서가 몇 사람에게 치우친 회의라면, 표결로 결론에 이르렀더라도 듣지 못한 의견이 남아 있는 셈이다.",
          "A meeting in which a few people held most of the speaking turns leaves views unheard, even though the group did reach a decision."
        ],
        [
          "결론이 같은 두 의견이라 하더라도 근거로 삼은 자료의 출처가 서로 다르면, 따로 확인해야 할 지점도 달라진다.",
          "Two views that arrive at the same conclusion call for different points to be checked when the sources of evidence differ."
        ],
        [
          "표결에서 진 쪽이 낸 요구라 하더라도 그것이 권리에 관한 것이라면, 시행하기 전에 다시 살펴볼 이유가 된다.",
          "A demand raised by the side that lost the vote is a reason to look again before the outcome is carried out, if it concerns a right of theirs."
        ],
        [
          "상대의 태도나 말투를 문제 삼는 발언이 늘고 나면, 정작 쟁점 자체를 따지는 데 쓰이는 시간은 그만큼 줄어든다.",
          "A discussion that fills up with remarks about an opponent's manner and tone has less time left for the issue that the group came to settle."
        ],
        [
          "어떤 기준으로 판단했는지 밝히지 않고 결과만 알리면, 나중에 그 결정을 두고 누구에게 책임을 묻기가 어려워진다.",
          "When the result is announced while the criteria behind it stay hidden, it grows harder to hold anyone answerable for the decision later on."
        ],
        [
          "모두에게 똑같은 내용을 적용한 정책이라 하더라도, 각자가 놓인 처지에 따라 지게 되는 부담의 크기는 달라진다.",
          "A policy that is applied in the same way to everyone can still leave unequal burdens, because the people it reaches stand in different situations."
        ],
        [
          "몇몇 구성원에게 이견이 남아 있고 그것이 회의 밖으로 드러났다고 해서, 그 안이 합의에 이르지 못한 것은 아니다.",
          "The fact that some members still disagree, and say so, does not by itself show that the option has failed to reach the consensus the group sought."
        ],
        [
          "시행한 뒤에 문제가 드러나고 나면, 그것은 처음 결정이 잘못이었다는 뜻이라기보다 규칙의 세부를 손볼 근거가 된다.",
          "A problem that shows up after the rule has been in force for a while works less as proof of an initial error than as a basis for revising the detail."
        ]
      ],
      "applications": [
        [
          "회의에서 발언 기회를 참석자 모두에게 고르게 나누면, 의견을 모으는 과정을 한결 공정하게 할 수 있다.",
          "When the chance to speak is shared evenly among everyone present, the process that gathers opinions turns out considerably fairer."
        ],
        [
          "두 제안의 효과를 견주려 할 때에는, 각 주장이 어떤 자료에 기대고 있으며 그것이 믿을 만한지 봐야 한다.",
          "Comparing what two proposals would achieve means asking which evidence each claim rests on and whether that evidence holds up."
        ],
        [
          "표결에서 이긴 안이라 하더라도 특정 집단의 기본권을 침해하지 않는지 따져 보고 시행하는 편이 옳다.",
          "Even a proposal that has won the vote should be examined for harm to the basic rights that one group depends on, before it starts."
        ],
        [
          "비판의 과녁을 사람에게 두지 않고 그 사람이 제시한 주장과 근거에 두는 편이 토론의 목적에 맞는다.",
          "Aiming criticism at the claim and the evidence that a person put forward, rather than at the person, fits the purpose for which debate exists."
        ],
        [
          "무엇을 기준으로 골랐는지를 밝히고 회의 기록까지 공개하면, 결정을 내린 사람에게 이유를 물을 수 있다.",
          "When the criteria for the choice and the minutes are published, the people that decided can be asked to give their reasons."
        ],
        [
          "통학로를 바꾸고 나면 걸어서 다니는 학생과 차로 다니는 학생이, 서로 다른 방향의 영향을 받게 된다.",
          "When the school route is changed, students who walk and students who arrive by car are affected in ways that differ from each other."
        ],
        [
          "의견이 맞선 사람들이 저마다 감당할 수 있는 지점을 살피고, 그 안에서 함께 받아들일 안을 찾아본다.",
          "People whose views clash look together for a point that each of them can live with, instead of insisting on the whole of their own plan."
        ],
        [
          "새 규칙에서 예상하지 못한 부작용이 확인되면, 시행 과정에서 모인 결과를 근거로 규칙을 고칠 수 있다.",
          "When a side effect that nobody expected turns up, the results gathered during the rollout give ground for changing the rule itself."
        ]
      ],
      "wrongApplications": [
        [
          "회의 시간이 길어지므로 반대하는 의견은 회의가 끝난 뒤에 서면으로 받고 나중에 따로 정리하기로 한다.",
          "To keep the meeting short, views that object are collected in writing after it ends and sorted out at a later point."
        ],
        [
          "두 제안 가운데 발표 자료의 분량이 많고 설명이 자세한 쪽을, 근거가 더 튼튼한 제안이라고 판단한다.",
          "Of the two proposals, the one that comes with longer slides is judged to be the one which rests on stronger evidence."
        ],
        [
          "표결에서 이긴 안이므로, 소수 학생의 이동권 문제는 일단 시행한 뒤 다음 학기에 다루어도 늦지 않다.",
          "The proposal won the vote, so the access problem that a minority raised can wait until the next term when there is more time."
        ],
        [
          "상대가 지난 회의에 늦게 온 일이 있으므로, 이번에 그가 제시한 제안도 믿을 만하지 않다고 본다.",
          "The speaker arrived late at the last meeting, which is treated as a reason that the proposal he brings now is unreliable as well."
        ],
        [
          "결정 내용을 공지할 때에는 혼란을 줄이려고, 무엇을 기준으로 골랐는지는 빼고 결과만 알리기로 정한다.",
          "So that the notice will not confuse people, the criteria that guided the choice are dropped and the result alone is announced."
        ],
        [
          "통학로를 바꾸기 전에 차로 다니는 학생들의 의견을 물어 보면, 변경이 미칠 전체 영향을 파악할 수 있다.",
          "Before the route is changed, the students who travel by car are surveyed, which is taken to show the full impact of the change."
        ],
        [
          "의견이 갈린 상태이므로, 양쪽이 모두 흡족해할 때까지 결정을 미루고 그 사이에는 아무것도 정하지 않는다.",
          "Because the views are split, the decision is put off until both sides are fully satisfied, and nothing is settled while that wait lasts."
        ],
        [
          "시행 뒤에 문제가 확인되더라도, 이미 정해 놓은 규칙을 도중에 바꾸면 혼란이 크므로 그대로 두는 편이 낫다.",
          "Even when the results show a problem, a rule that has already been set is better left alone, because changing it midway causes confusion."
        ]
      ],
      "wrong": [
        [
          "참여자가 많은 회의라면 대표 의견을 먼저 정리해 두고, 소수 의견은 그 뒤에 따로 듣는 편이 효율적이다.",
          "When many people take part, it is efficient to settle the representative view first and to hear the minority views that remain afterwards."
        ],
        [
          "여러 의견을 공정하게 비교하려면, 근거의 신뢰도보다 각 의견에 똑같은 시간을 배정하는 일이 더 중요한 조건이 된다.",
          "Because a fair comparison rests on equal treatment, giving every view the same time matters more than the quality of the evidence that supports it."
        ],
        [
          "과반수의 결정을 먼저 확정해 두고 소수의 권리 문제는 시행 과정에서 조정하면, 불필요한 갈등을 줄일 수 있다.",
          "Confirming the majority decision first and adjusting the rights of the minority while the policy is rolled out can reduce the conflict that follows."
        ],
        [
          "토론에서는 주장의 내용보다 그 말을 한 사람의 책임과 동기를 먼저 평가해야, 쟁점을 정확히 판단할 수 있다.",
          "A discussion reaches an accurate judgement when the responsibility and the motives of the speaker are weighed ahead of the claim that was made."
        ],
        [
          "결정 절차가 충분히 투명했다면, 그 뒤의 평가는 결과보다 참여자들이 얼마나 만족했는지를 묻고 정리하면 된다.",
          "When the process has been transparent throughout, the evaluation that follows should centre on how satisfied the participants say they are."
        ],
        [
          "회의에서 발언 기회를 고르게 나누어 두면, 참여자 수가 늘어도 결정에 걸리는 시간은 대체로 비슷하게 유지된다.",
          "When speaking turns are shared evenly, the time that a decision takes stays about the same even as the number of participants grows."
        ],
        [
          "합의에 이른 안은 참여자들 사이의 의견 차이가 정리된 결과이므로, 나중에 다시 논의할 일은 거의 생기지 않는다.",
          "An option that has reached consensus has already settled the differences among the participants, so that it seldom needs discussing again."
        ],
        [
          "이해관계가 다른 집단이 여럿 있다면, 영향을 가장 크게 받는 집단의 의견으로 정책의 전체 영향을 파악할 수 있다.",
          "When several groups hold different interests, the view of the group that the policy touches most can stand for its impact as a whole."
        ]
      ]
    }
  },
  "MATH-RATIO": {
    "easy": {
      "intro": [
        "두 양을 비교하는 방법을 알아보자.",
        "Below are some ways to compare two amounts."
      ],
      "facts": [
        [
          "비는 두 양의 크기를 서로 비교하는 방법이다.",
          "A ratio compares the size of two amounts."
        ],
        [
          "이런 비 가운데 2 대 3과 4 대 6은 같은 비를 나타낸다.",
          "Among these ratios, 2 to 3 equals 4 to 6."
        ],
        [
          "비를 나타내는 또 다른 방법으로, 단위율은 한쪽 양을 1로 맞추어 나타낸 비다.",
          "Another way to show a ratio is a unit rate, which tells the amount for one unit."
        ],
        [
          "이런 비율은 전체 수가 다르면 같은 개수라도 값이 달라진다.",
          "A share like this changes even for the same count, since a bigger total makes it smaller."
        ],
        [
          "반면 비례에서는 어느 한쪽이 2배가 되면 나머지도 2배가 되어 비율이 그대로다.",
          "A proportional pair, by contrast, keeps that share the same: doubling one doubles the other."
        ],
        [
          "이런 비례는 원점을 지나는 곧은 직선으로 나타낼 수 있다.",
          "A proportional pair like this can be shown as a straight line through the origin."
        ],
        [
          "비율을 나타내는 방법 중 전체를 100으로 보는 것이 백분율이다.",
          "Among the ways to show a ratio, the one that sets the whole to one hundred is a percent."
        ],
        [
          "이렇게 구한 비율이라도 단위가 다르면 비교하기 전에 같게 맞춘다.",
          "Even a share found this way needs matching units before it can be compared."
        ]
      ],
      "inferences": [
        [
          "비를 쓸 때는 어느 쪽이 앞인지 밝혀야 한다.",
          "A clear ratio names the amount you put first."
        ],
        [
          "3배로 늘린 6 대 9도 2 대 3과 같은 비다.",
          "6 to 9 is 2 to 3 with both terms tripled."
        ],
        [
          "단위율로 바꾸면 전체 양이 달라도 바로 비교한다.",
          "Unit rates let you compare cases with unequal totals."
        ],
        [
          "학생 수가 늘어난 해에는 같은 인원도 비율이 낮다.",
          "With more students, the same number of participants is a smaller share."
        ],
        [
          "한쪽이 2배일 때 다른 쪽이 그대로면 비례가 아니다.",
          "One doubles, the other stays put, so not proportional."
        ],
        [
          "직선이라도 원점을 지나지 않으면 비례가 아니다.",
          "A line missing the origin does not show proportion."
        ],
        [
          "20%가 몇 명인지 알려면 전체 인원을 알아야 한다.",
          "To turn 20 percent into people, you need the total."
        ],
        [
          "숫자가 큰 쪽이 더 빠른지는 단위를 봐야 안다.",
          "A bigger number can be slower in another unit."
        ]
      ],
      "applications": [
        [
          "빨강 2개, 파랑 5개면 빨강 대 파랑은 2 대 5다.",
          "For 2 red and 5 blue, red to blue is 2:5."
        ],
        [
          "2 대 3에 2를 곱한 4 대 6도 같은 비다.",
          "2 to 3 with both terms doubled equals 4 to 6."
        ],
        [
          "3시간에 180킬로미터면 1시간에 60킬로미터다.",
          "180 kilometers in 3 hours is 60 kilometers per hour."
        ],
        [
          "인원이 같아도 전체가 다른 두 반은 비율이 다르다.",
          "Equal counts can be unequal shares of unequal totals."
        ],
        [
          "모든 재료를 3배로 늘리면 조리법의 비는 그대로다.",
          "Tripling every ingredient keeps the recipe ratios the same."
        ],
        [
          "0에서 출발한 거리 그래프는 원점을 지난다.",
          "A trip starting at zero graphs through the origin."
        ],
        [
          "학생 200명을 넷으로 나눈 25%는 50명이다.",
          "Twenty-five percent of 200 students is one quarter, or 50."
        ],
        [
          "시속과 분속은 시간 단위를 맞춘 뒤 비교한다.",
          "Match the time units, then compare hourly and minute rates."
        ]
      ],
      "wrongApplications": [
        [
          "빨강 2개, 파랑 5개면 파랑 대 빨강은 2 대 5다.",
          "For 2 red and 5 blue, blue to red is 2:5."
        ],
        [
          "2 대 3에 3을 더한 5 대 6도 같은 비다.",
          "2 to 3 with 3 added to both equals 5 to 6."
        ],
        [
          "3시간에 180킬로미터면 1시간에 540킬로미터다.",
          "180 kilometers in 3 hours is 540 kilometers per hour."
        ],
        [
          "두 반의 참가자가 12명씩이니 참가 비율도 같다.",
          "Both classes have 12 participants, so their shares are equal."
        ],
        [
          "재료는 3배로, 물은 2배로 늘려도 비는 그대로다.",
          "Ingredients tripled and water doubled keeps the ratios the same."
        ],
        [
          "5킬로미터에서 출발한 그래프도 원점을 지난다.",
          "A trip starting at 5 kilometers graphs through the origin."
        ],
        [
          "학생 200명의 25%는 모두 25명이 된다.",
          "Twenty-five percent of 200 students comes to 25 students."
        ],
        [
          "시속 6킬로미터가 분속 100미터보다 느리다.",
          "6 kilometers an hour is slower than 100 meters a minute."
        ]
      ],
      "wrong": [
        [
          "비의 앞뒤를 바꿔도 두 양의 관계는 그대로다.",
          "Flipping the two terms keeps the same relationship."
        ],
        [
          "같은 수를 더해도 같은 비를 만들 수 있다.",
          "Adding the same number to both terms keeps the ratio."
        ],
        [
          "전체가 커져도 부분 수가 같으면 비율도 그대로다.",
          "A fixed part keeps its share as the total grows."
        ],
        [
          "두 양이 같은 양씩 늘면 두 양의 비도 일정하다.",
          "Two amounts rising by equal steps keep a steady ratio."
        ],
        [
          "50%는 언제나 기준 수 50을 그대로 가리키는 값이다.",
          "Fifty percent always names the number 50 itself."
        ],
        [
          "단위율은 두 양 가운데 큰 쪽을 1로 놓은 값이다.",
          "A unit rate sets the larger amount to one."
        ],
        [
          "백분율이 같은 두 집단은 사람 수도 비슷하다.",
          "Equal percents mean the two groups are close in size."
        ],
        [
          "원점을 안 지나는 직선도 고르게 오르면 비는 같다.",
          "A line off the origin rising evenly keeps its ratio."
        ]
      ]
    },
    "hard": {
      "intro": [
        "두 양을 견주는 여러 방법과, 그 방법을 쓸 때 함께 살펴야 할 조건을 아래에 나누어 정리하였다.",
        "The points below set out ways of comparing two quantities, with the conditions that have to hold when those ways are used."
      ],
      "facts": [
        [
          "비는 어느 쪽을 앞에 두는가에 따라 표현이 달라지지만, 두 양의 크기를 견주는 방법인 점은 변하지 않는다.",
          "A ratio compares two quantities, and the comparison stays the same no matter which term is written first."
        ],
        [
          "2 대 3과 4 대 6은 적힌 값이 다르지만, 두 항이 같은 배수로 늘어난 관계이므로 같은 비를 나타낸다.",
          "The ratios 2 to 3 and 4 to 6 describe the same relationship, because both terms were scaled by the same amount."
        ],
        [
          "단위율은 두 양 가운데 하나를 1로 고정한 뒤 남은 양을 나타낸 값이므로, 기준이 다른 자료끼리도 견줄 수 있다.",
          "A unit rate sets one of the compared quantities to a single unit, which makes it easier to compare unlike totals."
        ],
        [
          "부분의 개수가 같더라도 전체가 커지거나 작아지면 그 부분이 차지하는 비율은 달라지므로, 개수만으로 판단할 수 없다.",
          "Even when a part's count stays fixed, a change in the total can shift the share that part represents."
        ],
        [
          "비례 관계에서는 한 양이 일정한 배수로 커지면 다른 양도 같은 배수로 커지므로, 두 양의 비는 어디서 재도 같다.",
          "In a proportional relationship, scaling one quantity by some factor scales the other by that same factor."
        ],
        [
          "그래프가 직선이면서 원점을 지난다면 비례 관계일 수 있지만, 직선이라는 사실만으로 비례를 확인하기는 어렵다.",
          "A straight line through the origin can represent a proportional relationship, though a straight line alone is not enough to prove one."
        ],
        [
          "백분율은 전체를 100으로 환산한 비율이므로, 같은 백분율이라도 전체가 다르면 가리키는 실제 수량은 달라진다.",
          "A percentage restates a ratio out of one hundred, so equal percentages can still represent very different actual counts."
        ],
        [
          "단위가 다른 비율을 놓고 견줄 때에는 단위를 먼저 맞추어야 하며, 그러지 않으면 수의 크기만 보고 잘못 판단한다.",
          "Rates given in different units need to be converted to the same unit before they can be fairly compared."
        ]
      ],
      "inferences": [
        [
          "비를 말할 때 어느 쪽이 앞항인지 밝히지 않으면, 같은 두 수를 들어도 듣는 쪽이 관계를 거꾸로 이해한다.",
          "A ratio that does not say which quantity comes first can be read backwards, though the two numbers are correct."
        ],
        [
          "두 항에 3을 곱한 6 대 9는 값이 2 대 3과 다르지만, 항 사이의 관계가 그대로이므로 같은 비로 다룬다.",
          "Because both terms of 2 to 3 were multiplied by three, the 6 to 9 that results carries the same relationship as before."
        ],
        [
          "단위율로 바꾸어 두면 전체 양이 다른 경우에도 같은 기준 위에 놓이므로, 어느 쪽이 큰지 곧바로 견줄 수 있다.",
          "Once figures become unit rates, cases whose totals are far apart sit on one scale, so that the larger is read at once."
        ],
        [
          "참가 인원이 지난해와 같더라도 전체 학생 수가 늘어난 해에는 참가자가 차지하는 몫이 줄어들고 비율은 낮아진다.",
          "When the number taking part holds steady while the whole school grows, the share that those people make up steadily falls."
        ],
        [
          "한 양이 2배가 되는 동안 다른 양이 그대로 남아 있다면, 일정한 배수 관계가 없으므로 비례로 보기 어렵다.",
          "If one quantity doubles while the other stays at its earlier value, the two do not scale together, which rules out proportion."
        ],
        [
          "직선으로 그려졌더라도 그 직선이 원점에서 벗어난 곳을 지난다면, 두 양의 비가 구간마다 달라져 비례로 보기 어렵다.",
          "Even where the points fall on a straight line, one that crosses the axis away from the origin gives a ratio that shifts along it."
        ],
        [
          "20%라는 표현은 전체에 대한 비율을 나타낼 따름이므로, 전체 인원을 확인하기 전에는 실제 인원을 정할 수 없다.",
          "A figure like 20 percent reports a share of a whole, not a head count, which means that no number follows until the total is given."
        ],
        [
          "숫자가 큰 쪽이 빠르다고 말하려면 두 값이 같은 단위인지 먼저 확인해야 하며, 그러지 않으면 비교가 성립하지 않는다.",
          "Calling the larger number the faster one holds up when the two values share a unit, because otherwise the comparison has no ground."
        ]
      ],
      "applications": [
        [
          "빨간 공 2개와 파란 공 5개가 담긴 상자에서 빨강을 앞에 두고 적으면, 빨강 대 파랑의 비는 2 대 5가 된다.",
          "When a box holds 2 red balls and 5 blue balls, a ratio that names red first comes out as 2 to 5."
        ],
        [
          "2 대 3의 두 항에 2를 곱하면 4 대 6이 되는데, 두 항이 같은 배수로 늘었으므로 처음 비와 같은 관계다.",
          "Multiplying both terms of 2 to 3 by two gives 4 to 6, a pair that keeps the same relationship because both grew alike."
        ],
        [
          "180킬로미터를 3시간에 달린 자동차의 속력을 시간당 값으로 바꾸면, 한 시간에 60킬로미터를 간 셈이다.",
          "A car that covers 180 kilometers in 3 hours, when the distance is restated for one hour, moves at 60 kilometers an hour."
        ],
        [
          "두 학년의 참가자가 각각 12명으로 같더라도 학년의 전체 인원이 다르다면, 두 학년의 참가 비율은 같지 않다.",
          "Two grades that each sent 12 participants still show unequal rates when the grades differ in overall size."
        ],
        [
          "조리법에 적힌 재료를 하나도 빠뜨리지 않고 3배로 늘리면, 재료 사이의 비가 그대로 유지되어 맛이 달라지지 않는다.",
          "A cook who triples every ingredient that the recipe lists keeps the ratios among them where they were."
        ],
        [
          "출발 지점의 거리가 0이고 시간이 흐른 만큼 거리가 늘어나는 자료를 그리면, 그 직선은 원점을 지나게 된다.",
          "When a trip begins at zero distance and grows in step with time, the line drawn from that data passes through the origin."
        ],
        [
          "학생 200명 가운데 25%가 참여했다면, 전체를 넷으로 나눈 한 묶음이므로 참여한 학생은 50명이 된다.",
          "If 25 percent of 200 students took part, the group is one quarter of the whole, which comes to 50 students."
        ],
        [
          "시속 6킬로미터와 분속 100미터 가운데 어느 쪽이 빠른지 따지려면, 두 값을 같은 시간 단위로 고쳐 놓고 견주어야 한다.",
          "Deciding which is faster, 6 kilometers an hour or 100 meters a minute, means matching the time units before any comparison."
        ]
      ],
      "wrongApplications": [
        [
          "빨간 공 2개와 파란 공 5개가 담긴 상자에서 파랑을 앞에 두고 적으면, 파랑 대 빨강의 비는 2 대 5가 된다.",
          "When a box holds 2 red balls and 5 blue balls, a ratio that names blue first comes out as 2 to 5."
        ],
        [
          "2 대 3의 두 항에 3을 더하면 5 대 6이 되는데, 두 항의 차가 그대로이므로 처음 비와 같은 관계다.",
          "Adding three to both terms of 2 to 3 gives 5 to 6, a pair that keeps the same relationship because the gap holds."
        ],
        [
          "180킬로미터를 3시간에 달린 자동차의 속력을 시간당 값으로 바꾸면, 한 시간에 540킬로미터를 간 셈이다.",
          "A car that covers 180 kilometers in 3 hours, when the distance is restated for one hour, moves at 540 kilometers an hour."
        ],
        [
          "두 학년의 참가자가 각각 12명으로 같으므로 학년의 전체 인원이 다르더라도, 두 학년의 참가 비율은 서로 같다.",
          "Two grades that each sent 12 participants show equal rates even when the grades differ in overall size."
        ],
        [
          "조리법에 적힌 재료는 3배로 늘리면서 물은 2배로 넣더라도, 재료 사이의 비가 그대로 유지되어 맛이 달라지지 않는다.",
          "A cook who triples the ingredients but doubles the water keeps the ratios among them where they were."
        ],
        [
          "출발할 때 이미 5킬로미터를 지난 자료라도 거리가 시간에 따라 고르게 늘어난다면, 그 직선은 원점을 지나게 된다.",
          "When a trip begins 5 kilometers along and grows in step with time, the line drawn from that data still passes through the origin."
        ],
        [
          "학생 200명 가운데 25%가 참여했다면, 전체를 100으로 바꾸어 세는 값이므로 참여한 학생은 25명이 된다.",
          "If 25 percent of 200 students took part, the figure is counted out of one hundred, which comes to 25 students."
        ],
        [
          "시속 6킬로미터와 분속 100미터 가운데 어느 쪽이 빠른지 따지려면, 두 값에 적힌 수의 크기를 그대로 견주면 된다.",
          "Deciding which is faster, 6 kilometers an hour or 100 meters a minute, means reading the printed numbers as they stand."
        ]
      ],
      "wrong": [
        [
          "비의 앞항과 뒷항을 바꾸어 적으면 비교의 기준은 달라지지만, 두 양 사이의 관계는 그대로 유지된다.",
          "Swapping the two terms of a ratio moves the reference point, though the relationship that the ratio records is preserved."
        ],
        [
          "동치비는 두 항의 차이가 일정하게 유지되도록 같은 수를 더해서 만들 수 있으므로, 곱하지 않아도 같은 비가 된다.",
          "Equivalent ratios can be built by adding the same number to both terms, because a difference that stays constant makes them equal."
        ],
        [
          "전체 크기가 커지더라도 부분에 해당하는 수가 변하지 않았다면, 그 부분의 비율도 이전과 비슷하게 남는다.",
          "When a total grows while the part holds at its old count, the share that the part takes up stays about the same."
        ],
        [
          "두 양이 같은 양만큼 꾸준히 늘어난다면 변화의 폭이 일정하게 유지되므로, 두 양의 비도 처음 값으로 남는다.",
          "When two quantities climb by the same amount at every step, the change stays even, which keeps their ratio at its opening value."
        ],
        [
          "50%라는 값은 언제나 기준 수량 50을 그대로 가리키는 값이므로, 전체가 얼마이든 해당하는 인원도 서로 같다.",
          "Fifty percent always names the reference value 50 itself, so it stands for the same count whatever the whole may be."
        ],
        [
          "단위율은 두 양 가운데 큰 쪽을 1로 놓고 나머지를 나타낸 값이므로, 크기가 다른 자료끼리도 견줄 수 있다.",
          "A unit rate works by setting the larger of the two quantities to one, which is how cases that differ in size are compared."
        ],
        [
          "백분율로 나타낸 두 값이 같다면 두 집단이 같은 비율을 보이는 것이므로, 각 집단의 사람 수도 비슷하다고 볼 수 있다.",
          "When two groups report the same percentage, they show one and the same share, so the head counts behind them are close as well."
        ],
        [
          "원점을 지나지 않는 직선 그래프라도 눈금이 일정하게 올라가고 있다면, 두 양의 비는 어느 구간에서나 유지된다.",
          "A line that misses the origin still rises by a steady amount, which means that the ratio between the two reads the same throughout."
        ]
      ]
    }
  },
  "ART-LOOKING": {
    "easy": {
      "intro": [
        "그림을 볼 때 무엇을 살필지 알아보자.",
        "Below are things to look at in an artwork."
      ],
      "facts": [
        [
          "감상은 그림에 보이는 것을 살피는 데서 시작한다.",
          "Looking at art starts with what you can see."
        ],
        [
          "이때 색, 선, 모양, 질감은 그렇게 살필 때 볼 수 있는 요소다.",
          "Color, line, shape, and texture are what to look for while doing that."
        ],
        [
          "같은 요소를 보아도 같은 작품이 보는 사람에 따라 다르게 읽힌다.",
          "Even seeing the same elements, people can read the same work in their own ways."
        ],
        [
          "이렇게 다른 해석에는 작품에서 찾은 근거를 함께 대는 것이 좋다.",
          "An interpretation like this gets stronger with evidence from the work."
        ],
        [
          "그 근거를 찾을 때 작품이 만들어진 때와 곳을 알면 뜻풀이에 도움이 된다.",
          "Looking for that evidence, knowing the time and place of a work can help explain it."
        ],
        [
          "작가의 말도 중요하지만 그것이 작품 뜻을 하나로만 정하지는 않는다.",
          "The artist's aim matters too, but it fixes no single meaning."
        ],
        [
          "뜻만이 아니라 재료와 만드는 방법도 작품의 느낌을 바꿀 수 있다.",
          "Beyond meaning, materials and methods can also change how a work feels."
        ],
        [
          "이런 여러 요소를 볼 때 감상에서는 본 것과 느낀 것을 나누어 말한다.",
          "Weighing all of this, keep what you saw and what you felt apart."
        ]
      ],
      "inferences": [
        [
          "뜻을 먼저 정하면 그림에 있는 것을 놓치기 쉽다.",
          "Decide the meaning too soon and you miss details."
        ],
        [
          "설명이 달라도 색과 질감을 짚으면 견줄 수 있다.",
          "Two accounts can be matched up by color and texture."
        ],
        [
          "찾은 근거가 다르면 두 해석이 함께 맞을 수 있다.",
          "Two readings can both stand on their own evidence."
        ],
        [
          "느낌만 적은 글은 부분을 짚은 짧은 글보다 약하다.",
          "A page of feelings can persuade less than a note on one detail."
        ],
        [
          "시대를 알면 같은 표시가 다르게 보인다.",
          "Knowing the time it was made can change what a sign means."
        ],
        [
          "작가의 말을 들은 뒤에도 새 근거로 해석을 더한다.",
          "Even with the artist's words, new evidence adds a reading."
        ],
        [
          "같은 모양도 돌과 천으로 만들면 느낌이 다르다.",
          "The same shape feels heavy in stone and soft in cloth."
        ],
        [
          "‘무섭다’와 ‘어둡게 칠했다’는 서로 다른 말이다.",
          "‘Scary’ and ‘painted dark’ belong to two kinds of words."
        ]
      ],
      "applications": [
        [
          "‘파란 곡선이 반복된다’는 말은 관찰에 가깝다.",
          "Saying blue curves repeat is closer to observation."
        ],
        [
          "굵은 선과 거친 질감은 긴장감의 근거가 된다.",
          "Thick lines and rough texture back up a tension reading."
        ],
        [
          "경험이 다른 두 사람은 같은 그림을 다르게 읽는다.",
          "Two people with unlike pasts read one painting two ways."
        ],
        [
          "‘불안해 보인다’는 해석은 흔들리는 선으로 뒷받침한다.",
          "An anxious reading can point to shaky, uneven lines."
        ],
        [
          "싸움이 잦던 시대를 알고 반복된 표시를 푼다.",
          "A viewer uses a war-torn era to read repeated signs."
        ],
        [
          "다른 근거를 찾은 사람은 새 해석을 내놓을 수 있다.",
          "A viewer with new evidence can offer one more reading."
        ],
        [
          "같은 모양도 돌은 무겁고 천은 가볍게 느껴진다.",
          "The same shape feels heavy in stone, light in cloth."
        ],
        [
          "‘가운데 사람이 있다’와 ‘외로워 보인다’는 다르다.",
          "‘A figure is centered’ names a fact; ‘it looks lonely’ does not."
        ]
      ],
      "wrongApplications": [
        [
          "‘파란 곡선이 반복된다’는 말은 해석에 가깝다.",
          "Saying blue curves repeat is closer to interpretation."
        ],
        [
          "긴장감을 말했다면 선과 질감은 안 봐도 된다.",
          "Once tension is named, lines and texture can be skipped."
        ],
        [
          "해석이 다르면 더 오래 본 사람이 맞는 쪽이다.",
          "The person who looked longer has the right reading."
        ],
        [
          "‘불안해 보인다’는 해석은 느낌이라 근거가 필요 없다.",
          "An anxious reading is a feeling and needs no lines."
        ],
        [
          "시대를 안 뒤에는 표시를 넘기고 시대로 푼다.",
          "Knowing the era, a viewer skips the repeated signs."
        ],
        [
          "다른 근거를 찾은 사람은 작가의 말을 그냥 따른다.",
          "A viewer with new evidence drops it for the artist."
        ],
        [
          "같은 모양은 돌이든 천이든 무게가 같게 느껴진다.",
          "The same shape feels equally heavy in stone and cloth."
        ],
        [
          "‘가운데 사람이 있다’와 ‘외로워 보인다’는 같다.",
          "‘A figure is centered’ names a fact; ‘it looks lonely’ does too."
        ]
      ],
      "wrong": [
        [
          "처음 느낌대로 색과 선을 정리하면 해석이 뚜렷해진다.",
          "Sorting color and line by first feeling clears the reading."
        ],
        [
          "색과 선을 잘 적으면 해석도 서로 비슷해진다.",
          "Careful notes on color and line bring readings together."
        ],
        [
          "작가의 뜻을 알면 시대보다 만든 과정이 더 중요하다.",
          "Knowing the aim makes the making matter more than history."
        ],
        [
          "모양이 같은 작품은 재료보다 짜임이 느낌을 정한다.",
          "With one shape, layout sets the feel more than material."
        ],
        [
          "센 느낌을 먼저 나누면 작은 부분도 바르게 읽힌다.",
          "Share a strong feeling first and details come out right."
        ],
        [
          "본 것을 자세히 적으면 느낌은 빼도 된다.",
          "Full notes on what you saw leave feelings out."
        ],
        [
          "시대를 알면 그림의 근거보다 시대 설명이 먼저다.",
          "Knowing the era puts history ahead of the picture."
        ],
        [
          "재료가 같으면 만드는 법이 달라도 느낌은 비슷하다.",
          "Two works in one material feel alike, whatever the method."
        ]
      ]
    },
    "hard": {
      "intro": [
        "미술 작품을 앞에 두고 무엇을 어떤 순서로 볼 수 있는지, 또 그때 놓치기 쉬운 점을 아래에 정리하였다.",
        "The points below set out what a viewer can attend to when facing an artwork, and what tends to be missed when looking is hurried."
      ],
      "facts": [
        [
          "작품 감상은 무엇을 뜻하는지 묻기 전에, 화면에 실제로 무엇이 놓여 있는지 관찰하는 데서 시작할 수 있다.",
          "Looking at art can begin with a plain record of what is actually visible, before any question of meaning comes up."
        ],
        [
          "색과 선, 형태와 질감은 작품을 설명할 때 손에 잡히는 단서가 되므로, 감상을 말로 옮길 때 먼저 살펴본다.",
          "Color, line, shape, and texture give a viewer terms that can be checked against the work itself."
        ],
        [
          "같은 작품이라도 관람자가 지나온 경험이 서로 다르면, 눈에 들어오는 부분이 달라져 해석도 여러 갈래로 갈린다.",
          "The same work can be read in several ways, because viewers bring different experiences to what they notice in it."
        ],
        [
          "해석은 그것을 뒷받침하는 근거를 화면에서 찾아 함께 제시할 때, 듣는 사람이 확인할 수 있는 주장이 된다.",
          "An interpretation becomes something others can evaluate once it is backed by specific evidence drawn from the work."
        ],
        [
          "작품이 만들어진 시대와 장소를 알고 나면, 화면에 놓인 표시가 그때 어떤 뜻으로 쓰였는지 가늠할 수 있다.",
          "Knowing when and where a work was made can help a viewer weigh what a particular detail meant at the time."
        ],
        [
          "작가가 밝힌 의도는 작품을 이해하는 데 쓸모 있는 정보이지만, 화면에서 읽히는 뜻까지 하나로 못 박지는 않는다.",
          "What an artist says about their intent is useful, but it does not settle the meaning that later viewers find."
        ],
        [
          "재료를 무엇으로 고르고 어떤 방법으로 만드는가가 달라지면, 작품의 겉모습과 관람자가 받는 느낌도 함께 달라진다.",
          "The material an artist chooses, and the method used to shape it, changes how a piece looks and feels."
        ],
        [
          "감상을 말할 때 화면에서 관찰한 사실과 마음에 일어난 느낌을 구분해 두면, 무엇을 근거로 삼았는지 드러난다.",
          "In discussing art, a viewer can keep what was observed separate from what was simply felt."
        ]
      ],
      "inferences": [
        [
          "작품을 보자마자 뜻을 정해 버리면 뒤의 이야기가 그 뜻을 확인하는 쪽으로 흘러, 화면에 있는 것을 놓친다.",
          "A meaning settled in the first moment steers the talk that follows, so parts of the picture go unmentioned though they sit in view."
        ],
        [
          "같은 그림을 두고 한 두 설명이 달라도, 각자가 색과 질감처럼 화면에서 확인되는 것을 짚는다면 견줄 수 있다.",
          "Two accounts of one painting can be set against each other when each points to color or texture that the picture itself shows."
        ],
        [
          "해석이 다르다는 사실만으로 한쪽이 잘못 보았다고 할 수 없으며, 각자가 든 근거가 다르면 두 해석이 함께 선다.",
          "A gap between two readings is not by itself a sign that one viewer looked badly, because each may rest on evidence the other missed."
        ],
        [
          "느낌만 길게 늘어놓은 감상문이라면 분량이 많더라도, 어느 부분을 짚었는지 밝힌 짧은 글보다 설득하기 어렵다.",
          "A long response built from feelings can persuade less than a short one that names a part of the picture, because a reader can check that part."
        ],
        [
          "같은 표시라도 그것이 쓰이던 시대를 알고 나서 다시 보면, 처음에 읽어 낸 뜻과 다른 뜻으로 읽히곤 한다.",
          "The same sign can be read as something else when a viewer learns the period in which it was used."
        ],
        [
          "작가의 설명을 들은 뒤라도 화면에서 새 근거를 찾아냈다면, 그 근거로 해석을 하나 더 붙일 여지가 남는다.",
          "Even after the artist explains a work, a viewer who finds fresh evidence in the picture keeps room for a reading that the statement missed."
        ],
        [
          "같은 형상이라도 돌처럼 단단한 재료로 옮겨 만들면, 천으로 만들었을 때와 달리 무겁고 굳은 인상이 앞서게 된다.",
          "The same form remade in stone rather than fabric reaches a viewer as something heavier, though the shape that was copied has not changed."
        ],
        [
          "‘무섭다’는 말은 마음에 일어난 반응이고 ‘어둡게 칠했다’는 화면에서 확인되는 사실이라, 감상문에서 자리가 다르다.",
          "Calling a work frightening reports what happened in the viewer, while saying it is painted dark reports the surface, so the two differ."
        ]
      ],
      "applications": [
        [
          "그림에 파란 곡선이 여러 번 되풀이된다고 적은 문장은, 화면에 놓인 것을 그대로 옮긴 진술이므로 관찰에 가깝다.",
          "The sentence saying that blue curves repeat across the canvas records what any viewer can point to, which puts it nearer observation."
        ],
        [
          "긴장감을 느꼈다고 말한 관람자가 두꺼운 직선과 거친 질감을 짚는다면, 그 해석은 화면에서 확인되는 근거를 얻는다.",
          "A viewer who reports tension and points to thick straight lines and rough texture ties that reading to marks that the picture shows."
        ],
        [
          "미술관을 자주 찾던 사람과 처음 온 사람이 같은 그림 앞에 서면, 눈이 머무는 곳이 다르므로 찾는 뜻도 갈린다.",
          "A regular gallery visitor and a first-time visitor standing before the same painting can leave with meanings that do not match at all."
        ],
        [
          "‘불안해 보인다’고 해석한 관람자가 고르지 않게 흔들리는 선을 가리킨다면, 그 해석은 화면에서 나온 근거를 갖춘다.",
          "A viewer who reads the mood as anxious and points to lines that waver without a pattern has grounded that reading in the picture."
        ],
        [
          "갈등이 이어지던 시대에 그려진 작품이라면, 화면에 되풀이되는 표시를 그 시대의 쓰임과 견주어 뜻을 풀 수 있다.",
          "Knowing that a painting comes from years of conflict, a viewer can weigh its repeated signs against what such signs did when they were used."
        ],
        [
          "작가가 밝힌 뜻을 알더라도 화면에서 다른 근거를 찾은 관람자는, 그 근거를 들어 또 하나의 해석을 내놓을 수 있다.",
          "Even though a viewer knows the artist's stated aim, other evidence found in the picture supports a reading that the statement did not carry."
        ],
        [
          "같은 형상을 돌로 깎은 것과 천으로 늘어뜨린 것을 나란히 놓고 보면, 관람자가 받는 무게감은 서로 다르다.",
          "When the same form is cut in stone and hung in fabric, the two press on a viewer with weights that do not match."
        ],
        [
          "‘화면 가운데 인물이 있다’는 누구나 확인할 수 있는 관찰이고, ‘외로워 보인다’는 관람자의 반응이라 종류가 다르다.",
          "The remark that a figure is centered can be checked by anyone, while the remark that the figure seems lonely reports a response."
        ]
      ],
      "wrongApplications": [
        [
          "그림에 파란 곡선이 여러 번 되풀이된다고 적은 문장은, 화면을 보고 받은 인상을 담은 진술이므로 해석에 가깝다.",
          "The sentence saying that blue curves repeat across the canvas reports an impression the viewer formed, which puts it nearer interpretation."
        ],
        [
          "긴장감을 느꼈다고 말한 관람자는 두꺼운 직선과 거친 질감을 살피지 않더라도, 그 해석은 설명으로 충분히 갖추어진다.",
          "A viewer who reports tension has given an account that stands, even though the thick lines and the rough texture went unexamined."
        ],
        [
          "미술관을 자주 찾던 사람과 처음 온 사람의 해석이 갈릴 때에는, 더 오래 본 사람의 해석을 맞다고 보면 된다.",
          "When a regular visitor and a first-time visitor disagree, the reading that comes from the one who looked longer can be taken as correct."
        ],
        [
          "‘불안해 보인다’고 해석한 관람자는 그것이 느낌을 말한 것이므로, 화면에서 근거를 찾지 않아도 해석은 그대로 선다.",
          "A viewer who reads the mood as anxious has named a feeling, so the reading stands even though the picture offers nothing to cite."
        ],
        [
          "갈등이 이어지던 시대에 그려진 작품이라면, 화면에 되풀이되는 표시는 지나치고 시대 설명만으로 뜻을 정해도 된다.",
          "Knowing that a painting comes from years of conflict, a viewer can skip its repeated signs because the era settles what they mean."
        ],
        [
          "작가가 밝힌 뜻을 알더라도 화면에서 다른 근거를 찾은 관람자는, 자기 해석을 접고 작가의 설명을 그대로 따르면 된다.",
          "Even though a viewer knows the artist's stated aim, other evidence that turns up in the picture should be dropped in favor of the statement."
        ],
        [
          "같은 형상을 돌로 깎은 것과 천으로 늘어뜨린 것을 나란히 놓고 보면, 관람자가 받는 무게감은 서로 같다.",
          "When the same form is cut in stone and hung in fabric, the two press on a viewer with weights that match exactly."
        ],
        [
          "‘화면 가운데 인물이 있다’는 누구나 확인할 수 있는 관찰이고, ‘외로워 보인다’도 같은 관찰이므로 종류가 같다.",
          "The remark that a figure is centered can be checked by anyone, and the remark that the figure seems lonely does the same work."
        ]
      ],
      "wrong": [
        [
          "처음 떠오른 느낌을 기준으로 삼아 색과 선의 특징을 정리해 가면, 해석의 방향이 뚜렷해지므로 길을 잃지 않는다.",
          "When the first emotional response is taken as a frame, the colors and lines sorted under it show the direction that a reading should take."
        ],
        [
          "색과 선을 빠짐없이 기록해 두면 관람자마다 다른 경험의 차이가 줄어들므로, 결국 비슷한 해석에 이르게 된다.",
          "Because every color and line is recorded with care, the gap between what viewers have lived through narrows, so that readings converge."
        ],
        [
          "작가의 의도를 알고 나면 이해의 축이 옮겨 가서, 시대 배경보다 제작 과정에 대한 설명이 해석의 중심이 된다.",
          "Once the artist's intention is known, the account that explains how the work was made moves to the center, which leaves the era behind."
        ],
        [
          "같은 형태를 쓴 두 작품을 견주면, 어떤 재료로 만들었는가보다 화면을 어떻게 짜 놓았는가가 느낌을 좌우한다.",
          "In two works that use the same forms, the way the surface is arranged carries more of the effect than the material that each was made from."
        ],
        [
          "강한 감정 반응을 먼저 꺼내 놓고 이야기를 시작하면, 화면의 세부 요소들도 그만큼 정확하게 읽히게 된다.",
          "When a strong emotional response is put on the table first, the details of the picture are read more accurately than they would be."
        ],
        [
          "관찰한 내용을 자세히 적어 갈수록 글이 사실로 채워지므로, 개인의 느낌은 감상에서 따로 다루지 않아도 되는 셈이다.",
          "Because the observations are written out in full, the page is filled with fact, so that a personal reaction needs no place of its own."
        ],
        [
          "작품이 만들어진 시대를 알고 나면 해석의 출발점이 옮겨 가므로, 화면에서 근거를 찾기보다 시대 설명이 앞선다.",
          "Once the period of a work is known, the starting point shifts, so the explanation of the era comes before the search for evidence."
        ],
        [
          "재료가 같은 두 작품이라면 손질하는 방법이 다르더라도, 관람자에게 전해지는 느낌은 비슷한 쪽으로 모인다.",
          "Two works made from the same material reach a viewer in much the same way, even though the techniques that shaped them were not alike."
        ]
      ]
    }
  },
  "KO-MEDIA-EVIDENCE": {
    "easy": {
      "intro": "정보를 믿기 전에 무엇을 볼지 알아보자.",
      "facts": [
        "정보를 볼 때는 만든 사람과 근거를 같이 본다.",
        "이렇게 볼 때 같은 일도 고른 자료에 따라 다르게 보일 수 있다.",
        "그 자료를 볼 때는 날짜도 봐야 지금도 맞는 정보인지 알기 쉽다.",
        "이때 주장과 그 근거가 되는 자료는 나누어 읽는다.",
        "이렇게 나눈 근거라도 여러 곳에서 따로 확인한 사실이 더 믿을 만하다.",
        "다만 그 자료가 사진이나 그래프라면 찍은 범위나 축 간격에 따라 인상이 달라질 수 있다.",
        "자료뿐 아니라 전문가의 말도 그 사람이 해당 분야를 연구했는지 확인한다.",
        "이렇게 확인해도 확실하지 않은 내용은 모른다고 밝힌다."
      ],
      "inferences": [
        "글쓴이와 근거를 모르는 글은 판단을 미룬다.",
        "두 글의 인상이 다르면 자료도 다를 수 있다.",
        "날짜 없는 자료는 지금도 맞는지 가리기 어렵다.",
        "자료와 해석이 섞여 있으면 나눠서 무게를 잰다.",
        "같은 자료를 옮긴 글이 여럿이라도 출처는 하나다.",
        "그림이 준 느낌이 셀수록 범위와 축을 다시 본다.",
        "직함이 붙은 말도 연구 분야와 맞는지 따져 본다.",
        "확실하지 않다는 점을 알리면 오해가 미리 줄어든다."
      ],
      "applications": [
        "건강 글에서 만든 기관과 연구 자료를 함께 본다.",
        "경기의 전체 영상과 일부만 자른 영상을 비교한다.",
        "안내문의 게시 날짜를 지금 운행 시간과 견준다.",
        "기사에서 기자 해석과 조사 수치를 따로 표시한다.",
        "서로 베끼지 않은 기관들의 발표가 같은지 본다.",
        "막대그래프에서 세로축이 어디서 시작하는지 본다.",
        "식품 조언을 준 사람이 영양학을 연구하는지 본다.",
        "조사 결과를 알린다. 표본이 작아 바뀔 수 있다."
      ],
      "wrongApplications": [
        "건강 글이 자세하니 만든 기관은 넘기고 정리한다.",
        "일부만 자른 영상으로 경기 전체 흐름을 짐작한다.",
        "시간표가 자세하니 게시 날짜 없이 맞다고 본다.",
        "조사 수치가 있어 기자 해설도 조사 결과로 표시한다.",
        "같은 글을 실은 곳이 많아서 확인된 자료로 본다.",
        "막대가 길어 보여 세로축은 빼고 길이로만 본다.",
        "식품 조언을 준 사람이 유명하니 연구 분야는 넘긴다.",
        "조사 결과가 뚜렷하니 표본이 작다는 점은 뺀다."
      ],
      "wrong": [
        "조회 수가 많은 글은 검토를 거쳐 더 믿을 만하다.",
        "여러 곳에 같은 글이 있으면 각자 확인한 것이다.",
        "최근에 쓴 글일수록 그 내용은 더 정확하다.",
        "숫자가 적힌 그래프는 축을 살피지 않아도 된다.",
        "이름난 사람의 말은 분야보다 평판으로 판단한다.",
        "두 자료의 결론이 다르면 근거 수준도 다르다.",
        "의견을 밝히면 자료와 주장의 경계도 뚜렷해진다.",
        "모르는 내용도 자세히 설명하면 그만큼 확실해진다."
      ]
    },
    "hard": {
      "intro": "정보의 신뢰도는 한 가지로 정해지지 않으므로, 믿을지 정하기 전에 확인해야 할 것들을 출처와 근거로 나누어 정리해 두었다.",
      "facts": [
        "어떤 정보를 판단할 때에는 내용만 볼 것이 아니라, 누가 만들었으며 어떤 근거를 들었는지까지 함께 살펴야 한다.",
        "같은 사건을 다루더라도 어떤 자료를 골라 앞세우느냐에 따라 읽는 사람이 받는 인상은 서로 다르게 형성될 수 있다.",
        "작성 날짜가 함께 적혀 있으면 그 정보가 만들어진 뒤의 변화까지 고려해 지금도 통하는 내용인지 판단할 수 있다.",
        "글쓴이의 주장과 그것을 뒷받침하려고 끌어온 자료는, 같은 문단에 놓여 있더라도 층위가 다르므로 나누어 읽어야 한다.",
        "서로 자료를 주고받지 않은 여러 출처가 같은 사실을 확인해 준다면, 한 곳의 착오만으로 판단이 흔들릴 가능성은 줄어든다.",
        "사진이나 그래프는 직관적인 인상을 주지만, 어디까지 찍었는지와 축 간격을 어떻게 잡았는지에 따라 과장되어 보일 수 있다.",
        "전문가의 발언이라 하더라도 그 사람이 그 분야를 실제로 연구해 온 사람인지는 따로 확인할 필요가 있다.",
        "확실하지 않은 내용은 뒤집힐 수 있으므로, 어디까지가 확인된 것이고 어디부터가 추정인지를 밝히는 편이 안전하다."
      ],
      "inferences": [
        "내용이 아무리 그럴듯해 보이더라도 누가 어떤 근거로 쓴 글인지 알 수 없다면, 판단을 잠시 미뤄 두는 편이 낫다.",
        "같은 사건을 다룬 두 글이 서로 다른 인상을 남긴다면, 두 글쓴이가 앞세운 자료가 달랐을 가능성부터 살펴야 할 일이다.",
        "날짜가 적히지 않은 자료에서는 지금도 통하는 내용인지 가늠할 단서가 하나 줄어든 셈이므로, 결론을 더 미루어 잡아야 한다.",
        "한 문단 안에 조사 자료와 글쓴이의 해석이 섞여 있다면, 둘을 먼저 갈라낸 뒤 각각에 실어 줄 무게를 따로 정해야 한다.",
        "여러 곳에서 같은 내용을 보았더라도 그 글들이 한 자료를 옮겨 실은 것이라면, 확인된 출처는 여전히 하나에 머문다.",
        "그림이 준 인상이 강할수록 그 인상이 편집에서 왔을 수 있으므로, 촬영 범위와 축 간격을 다시 살펴야 할 이유도 커진다.",
        "직함이 붙은 사람의 말이라 하더라도, 그 사람이 연구해 온 분야가 발언 주제와 겹치는지는 따로 따져 보아야 할 일이다.",
        "결론이 아직 확실하지 않다는 사정을 함께 밝혀 두면, 읽는 사람이 그 내용을 확정된 사실로 알고 넘어가는 오해가 줄어든다."
      ],
      "applications": [
        "건강 정보를 읽을 때에는 그 글을 낸 기관이 어디이며 근거로 든 연구 자료가 무엇인지까지 확인한 뒤에 받아들인다.",
        "같은 경기를 담은 영상이라도 전체를 이어 붙인 것과 일부만 잘라 편집한 것을 나란히 놓고 서로 견주어 본다.",
        "여행 안내문이 자세하더라도 게시 날짜를 먼저 확인하고 현재 운행 시간과 달라진 곳이 없는지 대조한다.",
        "기사를 읽으며 조사 결과로 제시된 수치와 기자가 그 수치에 붙인 해석을 서로 다른 색으로 따로 표시해 둔다.",
        "서로 자료를 옮겨 쓰지 않은 독립적인 기관들이 내놓은 발표가 같은 방향을 가리키는지 대조하며 살펴본다.",
        "막대그래프의 차이가 아무리 커 보이더라도 세로축이 어디에서 시작하고 눈금 간격이 고른지를 먼저 확인한다.",
        "식품에 관한 조언을 한 사람이 영양학을 실제로 연구해 왔는지, 다른 분야의 전문가인지를 갈라 보고 판단한다.",
        "초기 조사 결과를 공유하면서 표본이 작아 뒤이은 조사에서는 결론이 달라질 수 있다고 함께 밝혀 둔다."
      ],
      "wrongApplications": [
        "건강 정보의 설명이 자세하고 조리도 있어 보이므로, 그 글을 낸 기관이 어디인지는 찾아보지 않은 채 정리한다.",
        "일부만 잘라 편집한 영상만 보고도 경기의 흐름은 짐작된다고 여겨, 전체 영상과 견주는 절차는 건너뛴다.",
        "여행 안내문의 시간표가 자세하므로 게시 날짜가 없어도 지금 운행에 맞을 것이라고 보고 그대로 따른다.",
        "기사에 조사 수치가 인용되어 있으므로 기자가 덧붙인 해설도 조사에서 나온 결과인 것으로 보고 표시한다.",
        "같은 문장을 실은 사이트가 여럿이므로 그 내용은 이미 확인된 자료인 것으로 보고 출처는 따지지 않는다.",
        "막대의 차이가 한눈에 커 보이므로 세로축이 어디에서 시작하는지는 살피지 않고 길이만으로 차이를 판단한다.",
        "식품 조언을 한 사람이 방송에 자주 나와 낯익으므로 그 사람이 어느 분야를 연구했는지는 따지지 않는다.",
        "초기 조사 결과의 방향이 뚜렷하므로 표본이 작다는 사정은 굳이 알리지 않고 결론만 간추려 전한다."
      ],
      "wrong": [
        "조회 수가 많은 정보는 그만큼 여러 사람이 읽고 걸러 낸 것이므로, 조회 수는 그 정보를 믿을지 가늠하는 잣대가 된다.",
        "서로 다른 사이트에 같은 문장이 실려 있다면, 그 사이트들이 각각 사실을 확인한 뒤에 같은 결론에 이른 것으로 볼 수 있다.",
        "최근에 작성된 자료일수록 지금 상황이 더 많이 반영된 것이므로, 작성 시점은 그 자료가 얼마나 정확한 자료인지 가려 준다.",
        "그래프에 정확한 숫자가 함께 표시되어 있다면, 축의 범위를 어떻게 잡았는지는 읽는 사람의 해석을 조금도 바꾸지 못한다.",
        "이름이 널리 알려진 사람이 소개한 정보라면, 그 사람이 어떤 분야를 연구했는지보다 쌓아 온 평판이 더 무거운 기준이 된다.",
        "두 자료가 서로 다른 결론에 이르렀다면, 결론이 벌어진 만큼 두 자료가 딛고 선 근거의 수준에도 그만큼 차이가 생긴다.",
        "글쓴이가 자신의 의견을 앞머리에서 분명히 밝히고 나면, 관찰된 자료와 주장 사이의 경계도 뒤따라 분명해지기 마련이다.",
        "불확실한 정보라도 그 배경과 조건을 하나하나 적고 자세히 설명해 두면, 설명이 길어진 만큼 불확실성도 함께 줄어든다."
      ]
    }
  },
  "KO-RULES-EXCEPTIONS": {
    "easy": {
      "intro": "규칙을 지킬 때와 고칠 때 볼 점을 알아보자.",
      "facts": [
        "규칙은 같은 상황에서 서로 무엇을 할지 알려 준다.",
        "이런 규칙을 그대로 적용하기 어려울 때 목적을 아는 사람은 그 상황도 잘 판단한다.",
        "이렇게 목적에 따라 예외를 두어도 남에게도 통하는 이유가 있어야 한다.",
        "이런 예외를 살필 때는 한쪽 편함만 보지 않고 남에게 줄 영향도 본다.",
        "영향을 볼 때는 출발 조건이 다르면 같은 결과 요구가 불공정할 수 있다는 점도 본다.",
        "이런 불공정을 고치려 규칙을 바꿀 때는 풀 문제와 생길 문제를 함께 본다.",
        "다만 이렇게 본 사례를 넓혀 쓰기 전에는 조건이 같은지 먼저 본다.",
        "이 모든 과정을 거친 좋은 결정은 결론과 근거와 고칠 방법도 함께 알린다."
      ],
      "inferences": [
        "규칙을 모르면 남의 다음 행동을 그리기 어렵다.",
        "문장만 외우면 새 상황에서 지킬 것을 놓친다.",
        "사정만 앞세운 예외는 남에게 설명하기 어렵다.",
        "어느 쪽이 편한가만 따지면 상대 불편이 빠진다.",
        "모두에게 같은 기준을 써도 공정하지 않기도 한다.",
        "새 규칙이 문제를 줄여도 새 불편이 없는지 본다.",
        "잘 통한 방법도 조건이 다른 곳에서는 다를 수 있다.",
        "근거 없이 결론만 알린 결정은 다시 볼 길이 좁다."
      ],
      "applications": [
        "도서관에 통화 금지 규칙이 있어 조용할 줄 안다.",
        "대피 때는 문구보다 사람을 지키는 목적을 본다.",
        "기한 예외를 요청할 때 남에게도 통하는 조건을 붙인다.",
        "사진 자유와 남의 사생활이 부딪칠 때 양쪽을 본다.",
        "계단 오르기가 몸 불편한 이에게 공정한지 따져 본다.",
        "교실 소음 규칙을 만들 때 발표가 힘들어질지 본다.",
        "다른 학교 규칙을 들여오기 전에 조건을 견준다.",
        "투표 결과와 근거, 다시 볼 시점을 함께 알린다."
      ],
      "wrongApplications": [
        "통화 금지 문구만 있으니 음악은 크게 들어도 된다.",
        "대피 때도 문구가 분명하니 목적은 빼고 따른다.",
        "예외 신청에 그동안 바빴다는 제 사정만 적어 낸다.",
        "사진 자유가 먼저라 보고 찍히는 사람 불편은 뺀다.",
        "계단 오르기를 모두에게 똑같이 적용해 공정하다고 본다.",
        "교실 소음 규칙을 만들 때 발표가 줄 걱정은 미룬다.",
        "예외가 한 번 있었으니 같은 요청도 모두 받아들인다.",
        "투표 결론만 알린다. 근거와 다시 볼 시점은 뺀다."
      ],
      "wrong": [
        "비슷해 보이면 같은 행동을 고르는 것이 먼저다.",
        "규칙 문장이 분명하면 목적보다 문장이 먼저다.",
        "어려운 사정의 예외는 공통 기준과 따로 떼어 둔다.",
        "권리가 부딪칠 때는 많은 쪽의 뜻이 기준이 된다.",
        "결과만 같게 맞추면 출발 조건과 상관없이 공정하다.",
        "지금 문제를 푸는 힘을 새 문제보다 먼저 따진다.",
        "앞 사례의 판단은 조건이 달라져도 센 근거다.",
        "결과를 알리면 근거와 고칠 절차도 알게 된다."
      ]
    },
    "hard": {
      "intro": "규칙은 문장만 읽어서는 제구실을 하지 못하므로, 지킬 때와 고칠 때 살펴야 할 것들을 아래에 차례로 정리한다.",
      "facts": [
        "공동체가 규칙을 정해 두면, 그 안의 사람들은 비슷한 상황이 닥쳤을 때 서로에게 무엇을 기대할지 미리 알게 된다.",
        "규칙이 무엇을 지키려는 것인지 알고 있으면, 문구를 그대로 적용하기 어려운 상황에서도 기준을 찾기가 쉬워진다.",
        "예외를 인정하려면 같은 처지에 놓인 다른 사람에게도 똑같이 적용할 수 있는 이유가 함께 갖추어져야 한다.",
        "권리가 맞부딪칠 때에는 어느 한 쪽이 편해지는지만 보지 말고 각 선택이 양쪽에 남길 영향까지 견주어야 한다.",
        "같은 결과를 요구하는 규칙이라도 사람마다 출발 조건이 크게 다르다면, 그 요구는 불공정하게 작동할 수 있다.",
        "규칙을 고칠 때에는 풀어 줄 문제가 무엇이며 새로 생길 문제는 무엇인지를 나란히 놓고 함께 검토해야 한다.",
        "한 사례의 판단을 다른 사례로 넓히기 전에, 두 사례가 결론을 가르는 중요한 조건에서 같은지 확인해야 한다.",
        "좋은 결정 절차는 결론이 무엇인지만 알리는 데 그치지 않고 그렇게 정한 근거와 고칠 방법까지 함께 공개한다."
      ],
      "inferences": [
        "규칙이 무엇을 요구하는지 알려지지 않으면, 사람들은 서로의 다음 행동을 그리기 어렵고 부딪치게 된다.",
        "규칙의 문장만 외워 둔 사람은 그 목적을 알지 못하므로, 처음 겪는 상황에서 지켜야 할 것을 놓치기 쉽다.",
        "자기 사정만 앞세운 예외 요청은 같은 처지에 놓인 다른 사람들에게 왜 자기만 달라야 하는지 설명할 길이 없다.",
        "어느 쪽이 더 편한지만 따져 결론을 내리면, 상대편이 떠안게 될 불편은 그 판단 과정에서 통째로 빠지게 된다.",
        "모두에게 똑같은 기준을 적용했다는 사실만으로는, 출발 조건이 달랐던 사람에게 공정한 결정이었다고 말하기 어렵다.",
        "새 규칙이 눈앞의 문제를 줄여 주었더라도, 과정에서 누구의 활동이 위축되었는지를 살펴야 제대로 평가할 수 있다.",
        "다른 곳에서 잘 통했던 방법이라도 결과를 가르는 조건이 다르다면, 여기서도 같은 결과가 나온다고 보기는 어렵다.",
        "결론만 발표하고 그 결론에 이른 근거를 밝히지 않으면, 나중에 그 결정을 다시 들여다볼 통로가 그만큼 좁아진다."
      ],
      "applications": [
        "도서관에 통화를 금지하는 규칙이 걸린 것을 보고 이곳에서는 조용한 환경을 기대해도 되겠다고 판단한다.",
        "대피 상황에서는 출입 금지라고 적혀 있어도 그 문구보다 사람을 안전하게 내보내려는 목적을 먼저 고려한다.",
        "과제 기한의 예외를 요청하면서, 자기 사정만이 아니라 비슷한 처지의 학생에게도 적용할 조건을 함께 제시한다.",
        "사진을 찍을 자유와 남의 사생활이 맞부딪칠 때에는, 한 선택이 무엇을 얻게 하며 무엇을 잃게 하는지 견준다.",
        "같은 시간 안에 계단을 오르게 하는 조건이 이동이 불편한 사람에게도 공정한 요구인지를 따로 떼어 검토한다.",
        "교실 소음을 줄이는 규칙을 만들면서, 모둠 발표 같은 활동이 어려워지지는 않는지 미리 따져 보고 정한다.",
        "다른 학교에서 성공한 규칙을 그대로 들여오기 전에, 학생 수와 공간 조건이 우리와 같은지 견주어 보고 정한다.",
        "학급 투표를 마친 뒤 결과만 내놓지 않고 그렇게 정한 근거와 언제 다시 논의할 수 있는지까지 함께 알린다."
      ],
      "wrongApplications": [
        "도서관에 통화 금지 문구만 적혀 있으므로, 음악을 크게 틀어 놓는 일은 규칙에 걸리지 않는다고 판단한다.",
        "대피 상황에서도 출입 금지 문구가 분명하므로, 그 규칙이 무엇을 지키려는 것인지는 살피지 않고 그대로 따른다.",
        "과제 기한의 예외를 요청하면서, 그동안 자신이 바빴다는 사정만을 이유로 들고 다른 조건은 붙이지 않는다.",
        "사진을 찍을 자유가 앞선다고 보고 찍히는 사람이 겪을 불편은 견주지 않은 채 그 사진을 그대로 올린다.",
        "같은 시간 안에 계단을 오르는 조건을 모두에게 똑같이 적용했으므로, 그 규칙은 공정한 규칙이라고 판단한다.",
        "교실 소음을 줄이는 규칙을 만들면서, 발표 활동이 줄어들 수 있다는 우려는 나중에 보기로 하고 정한다.",
        "예외가 한 번 인정된 사례가 있으므로, 그 뒤에 들어온 요청은 조건을 따지지 않고 모두 받아들일지 검토한다.",
        "학급 투표를 마친 뒤 결론만 게시판에 적어 알리고 그 결론을 고른 근거와 다시 논의할 시점은 밝히지 않는다."
      ],
      "wrong": [
        "규칙이 세워져 있고 그 내용이 알려져 있다면, 비슷해 보이는 상황에서 같은 행동을 고르는 일이 첫째 기준이 된다.",
        "규칙의 문장이 누가 읽어도 분명하다면, 그 규칙을 만든 목적을 따지기보다 문장에 맞추어 적용하는 일이 우선한다.",
        "어려운 사정에 따른 예외는 그 사람만의 개인적인 일이므로, 다른 사례에 적용할 공통 기준과는 떼어 놓아야 한다.",
        "권리가 맞부딪치면 더 많은 사람이 원하는 쪽이 어느 것이냐가, 각 선택의 영향을 가늠할 때의 기준이 된다.",
        "같은 결과를 요구하는 규칙은 출발 조건의 차이보다 결과를 하나로 맞추고 그 통일성을 통해 공정한 상태를 만든다.",
        "규칙이 지금 문제를 얼마나 잘 푸는지는 앞으로 생길 문제보다 먼저 따져야 할 항목이므로 평가에서 앞에 놓인다.",
        "한 사례에서 옳다고 인정된 판단은 조건이 달라진 사례를 다룰 때에도 여전히 가장 든든한 근거가 된다.",
        "결정의 결과를 공개하고 나면, 구성원은 그 결과를 통해 그렇게 정한 근거와 고칠 절차까지 함께 이해하게 된다."
      ]
    }
  },
  "EN-ATTENTION-NOTIFICATIONS": {
    "easy": {
      "intro": "This part looks at alerts and attention during daily digital work.",
      "facts": [
        "Attention is limited, so signals cannot all get deep focus at once.",
        "Because attention works this way, even a short alert that takes seconds to read can still break a task.",
        "Once that break happens, getting the idea back costs extra effort.",
        "When breaks like this repeat often, they build a habit of checking first and judging later whether it mattered.",
        "Turning off small alerts is one way to break that habit, since it cuts outside demands on attention.",
        "Checking at set times works in a similar way, keeping messages open while still guarding focus.",
        "These habits matter most for hard thinking, which is harder to restart than a simple routine.",
        "Managing attention, then, means picking the right time for each tool instead of reacting to every signal."
      ],
      "inferences": [
        "A second job lowers the care given to both tasks.",
        "The cost of an alert is more than its reading time.",
        "The time lost to a work message goes past the reply.",
        "People often open alerts from habit, even useless ones.",
        "Fewer alerts give a person more control over the day's breaks.",
        "Reading messages at a set time is not the same as ignoring them.",
        "A pause in hard work costs more than the same pause in easy work.",
        "Good attention during a task is about timing, not about the tool used."
      ],
      "applications": [
        "A student shuts extra tabs to solve a long problem.",
        "A writer sees a short message break a paragraph's flow.",
        "A reader rereads old lines to find the lost point.",
        "A phone user taps the screen at each sound out of habit.",
        "A student keeps family calls on and blocks ad alerts.",
        "A group reads messages between work blocks, not during them.",
        "A learner guards a proof more than a copying task.",
        "A designer works quietly, then uses online tools at set times."
      ],
      "wrongApplications": [
        "A student opens extra tabs to give each one full care.",
        "A writer counts a three-second message as a three-second cost.",
        "A reader jumps to the next line and expects full recall.",
        "A phone user treats frequent checking as proof of useful alerts.",
        "A student keeps ad alerts on to protect family calls.",
        "A group reads messages at set times and rushes them all.",
        "A learner allows breaks during a proof, trusting its many steps.",
        "A designer drops all online tools for the entire workday."
      ],
      "wrong": [
        "Attention grows deeper with many signals at the same time.",
        "A short alert costs little, so the flow stays whole.",
        "The old idea comes right back once the alert ends.",
        "Frequent phone checks prove each alert holds useful news.",
        "Turning off small alerts also delays the important messages.",
        "Set check times protect focus by treating all messages as urgent.",
        "Hard thinking is easier to restart, since it holds more clues.",
        "Managing attention works best by dropping tools during serious work."
      ]
    },
    "hard": {
      "intro": "Notifications rarely arrive at a convenient moment, and the passage below traces what that does to attention during work that depends on digital tools.",
      "facts": [
        "Because attention is limited, the many signals reaching a person at once cannot all receive the same depth of processing.",
        "A notification may take only seconds to read, but it can still interrupt a task a person was deeply focused on.",
        "Once an interruption ends, the earlier train of thought does not simply return — recovering it takes time and effort.",
        "When signals arrive often enough, checking them can become a habit that runs before anyone judges whether it was worth the interruption.",
        "Turning off low-priority alerts cuts down on the outside demands competing for a person's attention.",
        "Checking messages at scheduled times keeps them accessible while still protecting long stretches of focused work.",
        "Reasoning that depends on several linked steps is harder to pick back up after a pause than a simple routine is.",
        "Managing attention, in the end, means deciding when a task deserves full focus instead of reacting to every signal."
      ],
      "inferences": [
        "When a second demand is added to a task that already requires focus, the depth of attention available to each falls rather than rising.",
        "The cost of an alert is poorly described by the seconds spent reading it, because the disruption continues after the screen has been set aside.",
        "The time a message takes extends past the moment when it is answered, because returning to the work that was interrupted is itself a slow step.",
        "A person may open an alert out of habit rather than judgement, even when the content turns out to be minor after the screen has finally been read.",
        "Fewer incoming alerts leave a person more control over when work is set aside, because the decision follows a plan set in advance rather than a sound.",
        "Waiting to read messages until a set time differs from refusing to read them at all, a distinction that holds because the messages continue to arrive.",
        "An interruption that lands inside a demanding problem costs more than the same pause during routine work, because familiar steps survive a pause better.",
        "Judging attention during a task turns on the timing of tool use rather than the tool, which means an application that helps at one moment can harm at another."
      ],
      "applications": [
        "A student closes tabs unrelated to the task while working through a problem that requires several connected steps to be held in mind.",
        "A writer notices that a brief message, though it takes moments to read, breaks the flow of a paragraph that was already underway.",
        "After answering an alert, a reader deliberately rereads several earlier lines in order to recover the argument that the interruption pushed out of mind.",
        "A phone user reaches for the screen after a sound arrives and before asking whether the alert deserves a look, which shows habit at work.",
        "A student keeps emergency calls from family active while disabling the promotional alerts that would otherwise arrive during a long block of study.",
        "A group agrees to read messages at the end of each work period, which keeps active discussion free of the arrivals that reach every screen.",
        "A learner guards a proof from interruption more carefully than a copying task, because the steps that a proof links together are hard to rebuild.",
        "A designer sets aside a quiet period for work that demands focus, and decides in advance when the online tools will be opened again."
      ],
      "wrongApplications": [
        "A student opens several unrelated tabs at once, assuming that each of them receives the careful attention that a single task would get.",
        "A writer treats a message that was read in three seconds as costing three seconds, because the flow of the paragraph seems intact afterward.",
        "After answering an alert, a reader resumes at the next line, because the earlier argument is expected to return when the screen is closed.",
        "A phone user counts frequent checking as proof that the alerts were worth opening, because nobody would reach for a screen when the message is worthless.",
        "A student leaves every promotional alert switched on, reasoning that urgent family calls would be delayed if the low-priority notices were turned off.",
        "A group sets a shared checking time and answers every message inside it with the same urgency, as though nothing that arrives differs in weight.",
        "A learner allows interruptions during a proof, because the many steps that it contains should work as reminders when the earlier thinking is resumed.",
        "A designer removes digital tools from the entire workday, because the tools themselves are the problem whenever work that matters has to be done."
      ],
      "wrong": [
        "Attention becomes deeper when several signals compete for it at once, since the mind rises to meet each new demand that arrives on the screen.",
        "A notification that takes a few seconds to read leaves the flow of work intact, because the alert's cost equals the seconds spent reading.",
        "Returning to an earlier line of thinking is immediate once the message disappears, because the interruption removes nothing that the mind was already holding.",
        "Frequent checks of a device show that each notification carried useful information, since a person would not reach for the screen without a good reason.",
        "Turning off alerts of low priority also delays access to important messages, because the channel that carries urgent news closes along with the rest.",
        "A planned checking time protects focus by giving every message the same urgency, so that nothing has to be weighed against anything else.",
        "Reasoning that links many steps is easier to resume after a pause, because the extra structure leaves more clues behind than a simple routine does.",
        "Managing attention is best achieved by keeping digital tools away from serious work, because the harm lies in the tools rather than the timing."
      ]
    }
  },
  "EN-URBAN-TREES": {
    "easy": {
      "intro": "This passage looks at trees and heat in city areas.",
      "facts": [
        "Dark city surfaces soak up sun and get hotter than shaded ground.",
        "A tree's leaves help stop that heat by blocking sun from roads, walls, and people.",
        "Beyond blocking sun, leaves also cool the air as the water inside them turns to vapor.",
        "How much cooling this brings depends on a tree's size, health, and kind, plus how much water it gets.",
        "Because of this, young trees need years of care before they can give full shade.",
        "Wherever that shade appears, it helps most where people walk, wait, and live.",
        "Planting trees in those places still brings costs when roots, pollen, and upkeep are ignored.",
        "Weighing both sides, a heat plan works best with trees, built shade, buildings, and water together."
      ],
      "inferences": [
        "Surface color helps explain warm spots on a street.",
        "Shade acts early, before the ground takes in heat.",
        "Air near leaves can cool with no wind at all.",
        "Two trees of one age can cool by unequal amounts.",
        "A newly planted street will not cool much for years.",
        "Where trees stand decides how much shade people use.",
        "A planting plan can add upkeep costs in later years.",
        "Trees are one part of a city's heat plan, not the whole."
      ],
      "applications": [
        "A shaded bench feels cooler than one on dark pavement.",
        "A city puts wide tree cover along a school walk.",
        "Air near healthy leaves cools as leaf water evaporates.",
        "Planners compare tree kinds and water, not just counts.",
        "A block keeps its old trees as young ones grow.",
        "Trees go near bus stops and homes, not empty roads.",
        "A plan checks root space and care, then picks trees.",
        "A school adds trees, drinking water, and covered seats."
      ],
      "wrongApplications": [
        "A visitor picks a dark pavement bench, sure it stays cool.",
        "A city waits for hot pavement, then hopes shade helps.",
        "A gardener expects warmer air as leaf water evaporates.",
        "Planners record tree height and expect equal cooling from each.",
        "A block cuts its old trees the day saplings arrive.",
        "A city counts new trees and ignores where shade lands.",
        "A plan picks fast trees and skips root space costs.",
        "A school plants trees and drops water and covered seats."
      ],
      "wrong": [
        "Dark pavement stays cooler since sunlight sinks below it.",
        "A tree's leaves cool a road by bouncing back its heat.",
        "Water from leaves warms the air as it turns to vapor.",
        "Trees of one height cool the same in any place.",
        "Young trees give full shade as soon as planted.",
        "Where trees stand matters less as tree counts rise.",
        "Root and care costs vanish when a tree grows fast.",
        "A city with many trees needs no other heat help."
      ]
    },
    "hard": {
      "intro": "City summers build up heat unevenly from block to block, and what follows traces the part trees play in where that heat gathers and where it does not.",
      "facts": [
        "Dark surfaces in a city absorb sunlight and grow hotter than ground that stays shaded through the same hours.",
        "A tree canopy blocks that sunlight before it ever reaches the pavement, walls, and people below.",
        "Beyond blocking sunlight, a tree's leaves also cool the surrounding air as the water they release turns into vapor.",
        "How much cooling a tree provides depends on its size, health, species, and how much water its roots can reach.",
        "A young tree needs years of care before it can cast the kind of shade a mature canopy provides.",
        "Shade matters most in places where people actually walk, wait, and live.",
        "Planting trees still carries costs when roots, pollen, and long-term upkeep are left out of the plan.",
        "A heat plan works best when trees are combined with built shade, climate-suited buildings, and water, since no single measure cools every street."
      ],
      "inferences": [
        "Because surfaces differ in color, one part of a street can feel warmer in the afternoon than another part that lies a few steps away.",
        "Shade lowers heat by acting before sunlight is absorbed rather than after a surface has warmed, which makes prevention the mechanism.",
        "Air close to leaves can lose heat even when no breeze moves along the street, because evaporation itself carries energy away from that air.",
        "Two trees planted in the same year can differ in the cooling that they provide, because health, species, and water supply vary by site.",
        "A street planted this season will not deliver its full cooling benefit for several years, because the canopy that produces shade has yet to grow.",
        "Where a city places its trees changes how much of the shade residents actually use, because shade that falls on an empty lot serves nobody at all.",
        "A planting program can add ongoing expenses that appear after the trees are in the ground, when roots lift pavement or when regular pruning becomes necessary.",
        "Trees form one part of a wider heat plan rather than a complete answer to summer heat, because a city that plants heavily still needs drinking water and public shelter."
      ],
      "applications": [
        "A bench that stands under a canopy remains more comfortable through the afternoon than an identical bench placed beside dark pavement in open sunlight.",
        "A city places broad canopies along the route that children use, so that sunlight is stopped before it reaches the pavement or the walkers.",
        "A gardener notices that the air beside well-watered leaves feels cooler when water that the leaves release passes into the air as vapor.",
        "Planners compare the species and the water supply at each site, because trees of a similar age differ in the cooling that they give.",
        "A neighborhood protects the older trees that line its streets while the saplings that were planted last year are still too small to cast shade.",
        "Trees are placed beside the bus stops and homes where residents wait, because shade that falls along an empty road reaches nobody when heat rises.",
        "A planting plan weighs root space and the cost of long-term care before it settles on the fast-growing species that a budget seems to favor.",
        "A school combines new trees with drinking water and covered waiting areas, so that the yard offers relief while the canopy that was planted grows."
      ],
      "wrongApplications": [
        "A visitor chooses a bench on dark pavement, because the surface stores the sunlight that falls on it and stays cooler when the sun is high.",
        "A city waits until a street has heated through the day, because the canopy that it planted should draw the stored warmth back out afterward.",
        "A gardener expects the air beside well-watered leaves to grow warmer when the water evaporates, because the change into vapor is thought to release heat.",
        "Planners record the height of each tree and expect equal cooling from two trees that match in height, because height settles what a tree gives.",
        "A neighborhood removes its old trees on the day when new saplings arrive, because the young trees that replace them should cast shade immediately.",
        "A city counts the trees that it has planted and stops asking where the shade falls, because a larger total means that placement matters little.",
        "A planting plan selects the fastest-growing species available, because root space and future maintenance stop mattering when a tree that grows quickly is chosen.",
        "A school plants a row of trees and drops the plans that it had for drinking water, because the canopy covers what the yard needs."
      ],
      "wrong": [
        "Dark pavement stays cooler than shaded ground, because the sunlight it takes in is stored below the surface rather than felt by anyone above.",
        "A tree canopy cools a street mainly by reflecting heat away after the pavement below it has already warmed in the middle of the day.",
        "Water released by leaves warms the air around them when the liquid changes into vapor, because that change gives off heat into the nearby street.",
        "Trees that reach the same height tend to provide an equivalent cooling effect, because height already captures the qualities that matter across changing conditions.",
        "Young trees provide the shade of a mature canopy as soon as they are placed beside a street, because planting is the step that matters.",
        "The location of each planting matters less when a city raises the total number of trees, because a larger count spreads shade everywhere.",
        "Costs from roots and maintenance disappear when a city selects a species that grows quickly, because rapid growth settles the problems that slower trees create.",
        "A city that has planted enough trees has little need for other heat protection, because a full canopy covers what a heat plan requires."
      ]
    }
  },
  "KO-COMPARISON-STANDARDS": {
    "easy": {
      "intro": "두 가지를 견줄 때 무엇을 먼저 정할지 알아보자.",
      "facts": [
        "둘을 견줄 때 기준을 무엇으로 삼았는지 밝힌다.",
        "이 기준을 정할 때 크기가 다른 무리라면 비율로 견주는 편이 낫다.",
        "비율로 맞추어도 잰 날이 다르면 대상 변화와 시기 영향을 나눈다.",
        "이렇게 시기를 맞춰도 평균이 같은 자료라도 퍼진 모양은 다를 수 있다.",
        "이런 장점 하나만 견주는 비교는 다른 큰 차이를 놓친다.",
        "이런 여러 기준으로 견줄 때는 조건이 같은지 알아야 결과를 읽기 쉽다.",
        "다만 이렇게 뽑은 사례 하나는 가능성만 보일 뿐 흐름은 못 밝힌다.",
        "그래서 좋은 비교는 기준과 한계를 밝혀 범위를 보인다."
      ],
      "inferences": [
        "기준 없는 비교는 사람마다 결론이 달라진다.",
        "학생이 많은 학교에서 건수가 큰 것은 당연하다.",
        "잰 날이 다른 값에는 대상 변화와 시기가 섞인다.",
        "평균만 있는 표로는 값이 몰렸는지 모른다.",
        "기준 하나로 고른 판단은 큰 차이를 놓친다.",
        "조건이 달랐다면 대상 차이와 조건 차이가 섞인다.",
        "잘된 사례 하나는 그 일이 가능함을 알려 준다.",
        "한계를 밝힌 비교는 믿을 범위까지 알려 준다."
      ],
      "applications": [
        "교통편을 비용과 시간 중 무엇으로 견줄지 정한다.",
        "학생 수가 다른 두 학교의 결석을 비율로 견준다.",
        "여름과 겨울의 전기량에서 계절의 몫을 살핀다.",
        "평균이 같은 반들의 최고점과 최저점도 살핀다.",
        "물건의 값과 쓰는 기간, 고치기까지 함께 본다.",
        "두 식물을 같은 기간과 빛에서 쟀는지 본다.",
        "잘된 사람 하나와 여러 사람의 흐름을 가른다.",
        "조사 지역이 좁았다. 결론도 그곳까지만 말한다."
      ],
      "wrongApplications": [
        "교통편을 기준 없이 눈에 띄는 차이부터 견준다.",
        "학생 수가 다른 두 학교의 결석을 건수로 견준다.",
        "여름과 겨울의 전기량 차이를 습관 탓으로 본다.",
        "평균이 같은 반들은 점수 분포도 비슷하다고 본다.",
        "값이 싼 물건은 기간과 고치기도 낫다고 본다.",
        "두 식물의 키만 재고서 빛과 물의 차이는 뺀다.",
        "잘된 사람 하나의 사례를 여러 사람 흐름으로 본다.",
        "조사 지역이 좁은 점은 빼고 결론을 전국으로 넓힌다."
      ],
      "wrong": [
        "숫자가 있는 비교는 기준보다 수치가 중요하다.",
        "크기가 달라도 건수가 많은 쪽은 비율도 높다.",
        "값 차이가 크면 잰 날의 차이는 안 갈라도 된다.",
        "평균이 같은 자료는 값이 퍼진 정도도 비슷하다.",
        "큰 장점에서 갈리면 다른 기준은 거들기만 한다.",
        "같은 도구로 재면 조건 차이는 결과에 덜 나온다.",
        "눈에 띄는 사례가 여러 사례보다 흐름을 잘 보인다.",
        "한계를 밝힌 결론은 약해 보이니 기준만 알린다."
      ]
    },
    "hard": {
      "intro": "두 대상을 견줄 때는 기준부터 정해야 하는데, 그 과정에서 흔히 놓치는 점들을 함께 살펴보자.",
      "facts": [
        "둘을 견주어 어느 쪽이 낫다고 말하려면, 무엇을 기준으로 삼았는지부터 분명히 밝혀야 한다.",
        "전체 크기가 다른 두 집단은 발생한 수를 그대로 맞대기보다, 전체에 대한 비율로 바꾸어 견주는 편이 적절하다.",
        "두 값을 잰 시점이 다르다면, 그 차이에는 대상의 변화와 시점의 영향이 함께 섞여 있으므로 갈라내야 한다.",
        "두 자료의 평균이 같게 나왔더라도, 값이 흩어진 정도와 분포의 모양까지 같다고 볼 수는 없다.",
        "장점 한 가지만 놓고 견주면, 결론을 바꿀 만한 다른 차이가 비교에서 통째로 빠질 수 있다.",
        "두 대상이 같은 조건에서 측정된 것인지 먼저 확인해야 하며, 그래야 결과를 무리 없이 해석할 수 있다.",
        "대표 사례 하나는 그런 일이 일어날 수 있음을 보여 주지만, 전체의 일반적인 경향까지 증명하지는 못한다.",
        "좋은 비교는 기준과 자료의 한계를 함께 밝히며, 그 결론을 어디까지 밀고 갈 수 있는지를 드러낸다."
      ],
      "inferences": [
        "기준을 밝히지 않은 비교는, 읽는 사람마다 세운 기준이 다르므로 같은 자료를 놓고 다른 결론에 닿는다.",
        "학생 수가 많은 학교에서 건수가 크게 잡혔더라도, 그것은 인원이 많은 데서 따라온 결과이지 특별한 신호는 아니다.",
        "다른 날에 잰 두 값의 차이에는, 대상이 변한 몫과 시기가 달라 생긴 몫이 겹쳐 있으므로 하나로 읽을 수 없다.",
        "평균값만 적힌 표라면 아무리 들여다보아도, 값들이 한쪽으로 몰렸는지 고르게 퍼졌는지까지는 알 수 없다.",
        "한 가지 기준에서 앞선 쪽을 골라 결론을 내리면, 다른 기준에서 벌어진 더 큰 차이를 보지 못한 채 끝낼 수 있다.",
        "잰 조건이 서로 달랐다면, 결과의 차이 안에 대상의 차이와 조건의 차이가 뒤엉켜 있으므로 갈라내기 어렵다.",
        "잘된 사례 하나는 그런 일이 일어날 수 있음을 알려 주지만, 그 일이 흔하다는 뜻까지 담고 있지는 않다.",
        "기준과 자료의 한계를 함께 적은 비교는, 그 결론을 어디까지 믿어도 되는지를 읽는 사람이 가늠할 수 있게 해 준다."
      ],
      "applications": [
        "기준에 따라 결론이 달라지므로, 두 이동 수단을 견주기 전에 비용과 시간 중 무엇을 쓸지 정하고 시작한다.",
        "학생 수가 다른 두 학교의 결석을 견줄 때에는, 발생한 건수를 그대로 놓지 않고 전체 학생에 대한 비율로 바꾼다.",
        "여름과 겨울의 전력 사용량이 크게 벌어져 있더라도, 그 차이에서 계절이 만든 몫을 먼저 갈라내고 나머지를 본다.",
        "두 반의 평균 점수가 같게 나왔더라도, 최고점과 최저점이 놓인 자리와 점수가 퍼진 모양을 찾아보고 판단한다.",
        "두 제품 중 하나를 고를 때에는 값이 싸 보이더라도, 얼마나 오래 쓰는지와 고칠 수 있는지를 놓고 함께 견준다.",
        "두 식물이 자란 정도를 견주려면, 같은 기간과 같은 빛 아래에서 키를 잰 자료인지 먼저 확인하고 쓴다.",
        "한 사람이 크게 성공한 사례와 여러 학습자에게서 되풀이된 경향은 무게가 다르므로, 둘을 갈라서 판단한다.",
        "조사한 지역이 좁았다는 한계를 결론과 함께 밝히고, 이 결과가 통하는 범위를 그 지역 안으로 못박아 둔다."
      ],
      "wrongApplications": [
        "두 이동 수단은 겉모습부터 다르므로, 무엇을 기준으로 삼을지 정하지 않고 눈에 띄는 차이부터 견준다.",
        "학생 수가 다른 두 학교의 결석을 견줄 때에도, 그해에 발생한 건수를 그대로 가져다 놓고 많은 쪽을 고른다.",
        "여름과 겨울의 전력 사용량이 크게 벌어져 있는데도, 그 차이를 계절과 무관한 생활 습관의 변화로만 정리한다.",
        "두 반의 평균 점수가 같게 나왔으므로, 최고점과 최저점이 놓인 자리와 점수가 퍼진 모양도 비슷하리라고 본다.",
        "두 제품 중 값이 더 싼 쪽을 고른 다음, 그 제품이 쓰는 기간과 고치는 면에서도 나은 편이라고 판단한다.",
        "두 식물이 자란 정도를 견주면서, 빛과 물의 조건이 달랐던 점은 빼 놓고 키가 큰 쪽이 잘 자랐다고 본다.",
        "한 사람이 크게 성공한 사례가 워낙 또렷하므로, 거기서 본 모습을 학습자 전체의 경향으로 넓혀 정리한다.",
        "조사한 지역이 좁았다는 한계는 적지 않고, 이 결과가 전국에서도 나타나는 경향인 것처럼 넓혀서 쓴다."
      ],
      "wrong": [
        "숫자가 실린 비교에서는 어떤 기준으로 견주었는지보다 수치의 차이가 결론을 더 크게 좌우하므로, 기준은 뒤로 미루고 본다.",
        "전체 크기가 다른 두 집단이라 하더라도, 발생한 수가 더 많은 쪽은 비율도 높은 편이라고 볼 수 있다.",
        "두 값의 차이가 크게 나온 비교에서는, 측정 시점이 달랐다는 점을 굳이 갈라내지 않고 함께 넣어 두어도 된다.",
        "평균이 같게 나온 두 자료라면, 값이 흩어진 정도와 분포의 모양도 크게 다르지 않다고 보는 편이 자연스럽다.",
        "가장 중요하다고 꼽은 장점에서 차이가 벌어졌다면, 나머지 기준들은 그 결론을 뒤에서 보충하는 역할을 맡는다.",
        "같은 측정 도구를 썼다면, 측정 조건이 조금씩 달랐더라도 그 차이는 결과에 거의 반영되지 않는 편이다.",
        "여러 사람에게서 나타난 평범한 사례들보다, 한눈에 인상 깊게 남는 대표 사례 하나가 일반적인 경향을 더 잘 보여 준다.",
        "자료의 한계를 함께 밝히면 비교의 설득력이 오히려 약해지므로, 세운 기준만 제시하고 한계는 적지 않는 편이 낫다."
      ]
    }
  },
  "KO-CAUSE-ALTERNATIVES": {
    "easy": {
      "intro": "어떤 일의 원인을 찾을 때 무엇을 살필지 알아보자.",
      "facts": [
        "둘이 같이 변해도 바로 원인을 정하지는 못한다.",
        "성급히 정하면 안 되는 까닭은 세 번째 원인이 둘에 함께 영향을 줄 수 있어서다.",
        "이런 원인을 가리려면 원인이 결과보다 먼저 있었는지 꼭 확인한다.",
        "순서를 본 다음에는 조건을 비슷하게 맞추면 원인을 가려내기 쉽다.",
        "이렇게 가려도 원인이 여럿 겹친 결과는 설명 하나로 모자라다.",
        "게다가 같은 원인도 환경과 대상에 따라 결과의 크기가 달라진다.",
        "그래서 생각과 다른 사례가 나오면 설명의 조건을 다시 보게 한다.",
        "이런 과정을 거치며 여러 번 살피고 다른 설명도 따질수록 주장이 세진다."
      ],
      "inferences": [
        "나란히 오르내린 자료로는 아직 원인을 못 정한다.",
        "함께 움직인 두 값에 같이 작용하는 원인을 찾는다.",
        "결과가 나온 뒤 시작된 변화는 원인 후보에서 빠진다.",
        "조건이 다른 대상끼리 견주면 까닭을 가리기 힘들다.",
        "원인 하나로 끝낸 설명은 다른 원인을 빠뜨린다.",
        "이곳의 효과를 조건이 다른 곳에 그대로 쓰기 어렵다.",
        "설명에 안 맞는 사례를 보면 통하는 범위를 좁힌다.",
        "결과가 쌓이고 다른 설명이 밀릴수록 주장은 세진다."
      ],
      "applications": [
        "운동과 성적이 함께 늘었을 때 다른 설명도 살핀다.",
        "우산 판매와 길 막힘을 늘린 원인으로 비를 본다.",
        "화분을 옮긴 때와 잘 자란 때의 앞뒤를 살핀다.",
        "빛과 물이 비슷한 화분끼리 거름의 힘을 견준다.",
        "집중이 달라진 까닭에 잠과 소음, 밥 시간도 본다.",
        "같은 비가 와도 흙과 기울기에 따라 잠김이 다르다.",
        "약을 먹고도 늦게 나은 사례는 먹은 때와 몸을 본다.",
        "여러 반에서 결과를 다시 살핀 뒤 다른 설명도 본다."
      ],
      "wrongApplications": [
        "운동과 성적이 함께 늘었을 때 운동을 원인으로 본다.",
        "우산 판매가 늘어서 길이 막혔다고 그대로 본다.",
        "잘 자란 뒤에 화분을 옮겼는데 그 덕분이라 본다.",
        "화분 수가 많으니 빛과 물이 달라도 그냥 견준다.",
        "집중이 달라진 까닭으로 잠만 남기고 소음과 밥은 뺀다.",
        "같은 비가 왔으니 흙과 기울기가 달라도 잠김은 같다.",
        "약을 먹어도 늦게 나은 사례는 드문 일로 보고 넘긴다.",
        "반 하나에서 같은 결과가 나왔으니 다른 설명은 넘긴다."
      ],
      "wrong": [
        "같은 쪽으로 여러 번 변한 모양이 원인을 보여 준다.",
        "세 번째 원인은 변화 빠르기가 같으면 힘을 못 쓴다.",
        "원인과 결과의 관계가 센 자료는 순서가 덜 중요하다.",
        "대상 수가 많은 자료에서는 조건 맞추기를 건너뛴다.",
        "큰 원인을 찾은 뒤 나머지를 빼도 설명은 맞는다.",
        "같은 원인은 대상이 달라도 결과의 크기가 비슷해야 한다.",
        "생각과 다른 사례는 흐름에서 벗어나니 설명에서 뺀다.",
        "되풀이된 관찰에서는 검토보다 횟수가 주장을 세운다."
      ]
    },
    "hard": {
      "intro": "어떤 일의 원인을 섣불리 단정하기 전에 함께 따져야 할 점과 열어 두어야 할 가능성을 살펴보자.",
      "facts": [
        "두 현상이 같은 시기에 나란히 변했다고 하더라도, 그것만으로 한쪽이 다른 쪽의 원인이라고 말할 수는 없다.",
        "겉으로는 두 현상이 맞물려 움직이는 듯 보이더라도, 그 둘에 함께 작용한 세 번째 요인이 숨어 있을 수 있다.",
        "어떤 요인을 원인으로 지목하려면, 그것이 결과보다 앞서 나타났는지를 시간 순서에 따라 따져 보고 확인해야 한다.",
        "결과에 영향을 줄 만한 다른 조건들을 비슷하게 맞추어 놓고 견주면, 원인이 낸 몫을 갈라내기가 한결 쉬워진다.",
        "하나의 결과에는 여러 원인이 겹쳐 작용하는 경우가 많으므로, 원인을 하나만 든 설명으로는 부족할 수 있다.",
        "같은 원인이 작용하더라도 그것이 놓인 환경과 대상이 달라지면, 결과의 크기는 곳에 따라 다르게 나타날 수 있다.",
        "설명과 어긋나는 사례가 나타났다면, 그 설명이 어떤 조건에서 통하는지를 다시 살피라는 신호로 보고 범위를 좁힌다.",
        "같은 관찰이 여러 차례 되풀이되고 다른 설명이 하나씩 밀려날수록, 그 요인을 원인으로 지목한 주장은 튼튼해진다."
      ],
      "inferences": [
        "두 값이 나란히 오르내렸다는 자료는 아직 원인을 정하기 전 단계에 놓인 것이며, 그 자체로 원인을 말해 주지 않는다.",
        "두 현상이 같은 시기에 함께 움직였다면, 둘 모두에 작용한 다른 요인이 있는지부터 찾아보는 편이 순서에 맞는다.",
        "어떤 변화가 결과보다 뒤에 시작된 것이라면, 그 변화는 시간 순서가 맞지 않으므로 원인 후보에서 빠지게 된다.",
        "조건이 제각각인 대상들을 그대로 맞대어 견주면, 나타난 차이가 원인에서 왔는지 조건에서 왔는지 가리기 어렵다.",
        "원인을 하나만 들어 매듭지은 설명이라면, 그 결과에 함께 작용한 다른 원인들을 빠뜨린 채 마무리했을 수 있다.",
        "한 곳에서 확인된 효과의 크기라 하더라도, 흙이나 날씨 같은 조건이 다른 곳에 그대로 옮겨 쓰기는 어렵다.",
        "설명에 들어맞지 않는 사례가 나왔다면, 그 설명을 버리기보다 조건을 다시 살펴보고 범위를 좁힐 일이 생긴다.",
        "같은 결과가 여러 자리에서 되풀이되고 그럴듯한 다른 설명이 밀려날수록, 그 요인을 원인으로 본 주장은 단단해진다."
      ],
      "applications": [
        "운동량과 성적이 함께 늘어난 자료를 보고 결론을 내리기 전에, 운동 말고 다른 설명이 없는지 함께 검토한다.",
        "우산 판매와 교통 체증이 함께 늘어난 날을 두고, 비가 내려 둘을 한꺼번에 늘린 것은 아닌지 먼저 살피고 판단한다.",
        "화분을 옮긴 뒤에 자람이 빨라졌다면, 옮긴 일과 빨라진 변화 가운데 무엇이 먼저였는지 날짜를 짚어 보고 확인한다.",
        "거름이 낸 효과를 따로 보려고, 빛과 물의 양을 비슷하게 맞춘 화분끼리 견주고 자란 정도의 차이를 살핀다.",
        "집중력이 달라진 까닭을 찾을 때에는, 수면 시간과 소음과 식사 시각이 함께 작용한 것은 아닌지 나누어 살핀다.",
        "같은 양의 비가 내렸더라도 흙이 물을 머금는 정도와 땅의 경사가 다르면, 잠기는 정도는 지역마다 다를 수 있다고 본다.",
        "약을 먹었는데도 회복이 더딘 사례를 만나면, 약을 먹은 시점과 그 사람의 건강 상태를 다시 짚어 조건을 살핀다.",
        "여러 학급에서 같은 결과가 되풀이되는지 관찰하고, 학습 시간처럼 결과를 만들 수 있는 다른 설명도 놓고 견준다."
      ],
      "wrongApplications": [
        "운동량과 성적이 함께 늘어난 자료를 근거로 삼아, 다른 설명은 검토하지 않고 운동이 성적을 올렸다고 정리한다.",
        "우산 판매와 교통 체증이 함께 늘어난 날을 두고, 비 이야기는 빼 놓은 채 우산이 늘어 길이 막혔다고 정리한다.",
        "자람이 빨라진 다음에 화분을 옮겼는데도, 자리를 옮긴 덕분에 식물이 잘 자란 것이라고 순서를 뒤집어 판단한다.",
        "견줄 화분의 수가 넉넉하므로, 빛과 물의 양이 화분마다 달랐더라도 그대로 거름의 효과를 견주어도 된다고 본다.",
        "집중력이 달라진 까닭으로 수면 시간 하나만 남겨 두고, 소음과 식사 시각은 검토 목록에서 아예 빼 버린다.",
        "같은 양의 비가 내렸으므로 흙의 성질과 땅의 경사가 서로 달랐더라도, 잠기는 정도는 어느 지역에서나 비슷하다고 본다.",
        "약을 먹었는데도 회복이 더딘 사례를 만나면, 그저 드문 일로 넘기고 그 설명이 통하는 조건은 다시 살피지 않는다.",
        "한 학급에서 같은 결과가 나왔으므로, 학습 시간처럼 결과를 만들 수 있는 다른 설명은 더 살피지 않고 마무리한다."
      ],
      "wrong": [
        "두 현상이 같은 방향으로 여러 차례 변해 온 자료라면, 그 변화의 모양이 맞물린 것이므로 인과 관계를 보여 준다.",
        "두 현상에 함께 얽힌 세 번째 요인이 있더라도, 둘의 변화 속도가 같다면 그 요인은 결과에 영향을 주지 못한다.",
        "원인과 결과 사이의 관계가 강하게 나타난 경우라면, 두 현상이 어느 쪽부터 나타났는지 따지는 일은 덜 중요해진다.",
        "견주려는 대상의 수가 많다면, 결과에 영향을 주는 다른 조건들을 비슷하게 맞추는 과정은 건너뛰어도 된다.",
        "결과에 가장 크게 영향을 준 원인을 찾아냈다면, 나머지 원인들은 설명에서 빼고 정리하더라도 정확성은 유지된다.",
        "같은 원인이라면 대상이 달라지더라도 비슷한 크기의 결과를 내야 하고, 그래야 둘을 인과 관계로 볼 수 있다.",
        "예상과 어긋나는 사례는 경향에서 벗어나 있으므로, 원인을 설명하는 자리에서는 따로 떼어 놓고 다루는 편이 낫다.",
        "관찰이 되풀이되면, 다른 설명을 검토하는 일보다 되풀이된 횟수가 더 크게 작용하고 원인 주장을 강하게 만든다."
      ]
    }
  },
  "EN-RETRIEVAL-PRACTICE": {
    "easy": {
      "intro": "This passage shows how study habits change what you remember.",
      "facts": [
        "Rereading makes a page feel known, but that feeling can mislead.",
        "A better test than that feeling is recall practice, where you try to remember before you check.",
        "Making a hard try like this to remember makes memory stronger later.",
        "Checking the answer once you finish trying then fixes mistakes early.",
        "Spread across many days, this kind of practice beats one long crowded session.",
        "Mixed problems within that practice make you pick a way, not just repeat one.",
        "Even a failed try in this process shows you what to study next.",
        "Put together, good review has three parts: recall, feedback, and a later try."
      ],
      "inferences": [
        "An easy feeling during rereading proves very little.",
        "A visible answer takes away the work of remembering.",
        "A hard, slow recall try still helps your memory later.",
        "An unchecked answer lets a mistake stay in your memory.",
        "The same study time works better spread over several days.",
        "Drilling one problem type hides whether you can pick the right method.",
        "A blank spot in your recalled answer marks your next study step.",
        "One corrected attempt is not a full round of spaced review work."
      ],
      "applications": [
        "A page feels known, so a student shuts the book to test.",
        "A learner writes three causes from memory, then opens the notes.",
        "A hard try to name an idea helps the next day.",
        "A student answers from memory, then checks a model answer.",
        "A learner studies new words over five short days.",
        "A worksheet mixes equations, so students pick a method each time.",
        "A missing step becomes the aim of the next review.",
        "A student recalls, checks, and returns to it two days later."
      ],
      "wrongApplications": [
        "A student reads twice and takes the known feeling as proof.",
        "A learner opens the answer key, then writes the three causes.",
        "A student drops the hard idea and studies easy ones instead.",
        "A student answers from memory and skips the model answer.",
        "A learner studies all the words in one long evening.",
        "A worksheet groups the same equations, keeping the right method visible.",
        "A student skips the missing step and rereads the neat notes.",
        "A student recalls, checks, and moves on; the idea feels clear."
      ],
      "wrong": [
        "Easy reading means the page is stored well in memory.",
        "Recall practice starts by showing you the answer to remember.",
        "An easy try builds memory more by avoiding confusion.",
        "Checking the answer before you recall keeps mistakes away.",
        "One long session builds stronger memory by keeping ideas active.",
        "One problem type teaches choice by keeping the right way visible.",
        "A failed try shows that more practice will help little.",
        "Good review ends at feedback, with the answer now familiar."
      ]
    },
    "hard": {
      "intro": "Two learners can log the same hours of study and still remember very differently, and the paragraphs below trace why the method chosen matters more than the time spent.",
      "facts": [
        "Rereading makes a passage feel familiar, but that familiarity is easy to mistake for knowledge that could actually be recalled.",
        "Retrieval practice asks a learner to produce the material from memory first, checking the answer only afterward.",
        "An effortful attempt to recall something tends to strengthen later access to it, even when the attempt feels slow.",
        "Checking the answer right after that attempt lets a learner correct a mistake before it settles into memory.",
        "Practice spread across several days produces more useful retrieval than one long, crowded session, because each attempt follows some forgetting.",
        "When problem types are mixed together, a learner has to choose a method for each one rather than simply repeating the last.",
        "Even a failed recall attempt is useful, because the gap it exposes shows what the next study session should target.",
        "Review works best when recall, feedback, and a later attempt are all combined, since no single part does the job alone."
      ],
      "inferences": [
        "The smoothness a learner feels while rereading reports on the page in view, not on what would survive once that page is closed.",
        "If the answer stays in view throughout an entire review session, the effortful search that gives retrieval its value is quietly skipped.",
        "Even though a recall attempt feels unsuccessful while it happens, the learner who made it may end up better off than one who reread.",
        "When a recalled answer goes unchecked, an error inside it settles in and returns later on, because nothing has yet marked it as wrong.",
        "An hour of study buys more retention when it is broken into short parts across a week than when the whole hour is spent in one sitting.",
        "A block of identical problems hides a gap, because a learner who solves them all may still not know which method fits an unlabeled item.",
        "The blank that appears in a recalled explanation is itself information, since it marks the part of the topic that deserves attention next.",
        "A single corrected attempt is one step in review rather than the whole cycle, because the spaced return that later consolidates the correction has not yet happened."
      ],
      "applications": [
        "A student who notices that a chapter looks familiar closes the book before writing what remains, treating the easy feeling as a question.",
        "Before opening any notes, a learner writes down the three causes that yesterday's lesson covered, and checks the list against the text afterward.",
        "A student who spends a minute failing to name a concept before it comes finds that the same concept arrives faster the next day.",
        "After writing an answer from memory, a student sets it beside the model answer and marks every place where the two accounts differ.",
        "A learner splits a vocabulary list across five short evenings, returning to each word after enough time has passed that part of it fades.",
        "A worksheet interleaves equations of several types, so that each student has to decide which method fits before starting the line of working.",
        "The step that a student left out of a recalled explanation becomes the first item for the next review, ahead of the settled parts.",
        "A student recalls the idea from memory, reads the feedback that follows, and returns to the idea two days later, after part has faded."
      ],
      "wrongApplications": [
        "A student who rereads a chapter twice notices that it feels familiar and records the chapter as learned, treating the feeling as proof.",
        "After opening the answer key, a learner reads the three causes it lists and writes them down, calling the copied list a recall attempt.",
        "A student who finds one concept hard to recall sets it aside and reviews the concepts that come quickly, counting the round as progress.",
        "After writing an answer from memory, a student leaves the model answer unopened, because a response that came from memory is already correct.",
        "A learner works through the whole vocabulary list in one long evening, because material kept continuously in mind stays fresh for the test.",
        "A worksheet groups identical equations into one block, so that students practice choosing a method while the same method stays in view.",
        "A student who left a step out of an explanation passes over the gap and rereads the finished notes, because the version reads smoothly.",
        "A student recalls the idea from memory, reads the feedback that follows, and moves on to new material, because the idea now feels clear."
      ],
      "wrong": [
        "Information that feels easy during rereading has been stored strongly, because the fluency a learner notices is a direct report on memory.",
        "Retrieval practice begins when the answer is placed before the learner, so that the recall that follows can be accurate from the start.",
        "A recall attempt that comes easily strengthens memory more than a difficult one, because the ease keeps confusion out of the new trace.",
        "When the answer is checked before recall, errors stay out of memory, because the correct form is already in view when the learner writes.",
        "A single crowded session produces stronger retrieval than spaced work, because material that stays continuously active during the session stays available afterward.",
        "Repeating a single problem type builds skill at choosing methods, because the method that applies stays visible while the learner works.",
        "A recall attempt that fails shows that the material is beyond reach, so further attempts would add little that rereading could not add faster.",
        "Review can end once feedback has been read, because the corrected answer is familiar and a later attempt would repeat settled work."
      ]
    }
  },
  "EN-ANIMAL-SIGNALS": {
    "easy": {
      "intro": "This passage shows how animals send signals and how others answer.",
      "facts": [
        "An animal signal can change what another animal does.",
        "Signals that change behavior this way use sound, movement, color, smell, or a mix of these.",
        "Whichever form it takes, a signal works only when the other animal notices it.",
        "A loud call solves that problem over distance, but it can also draw predators.",
        "Some signals stay honest despite this risk, because a weak animal cannot fake them.",
        "Beyond how honest a signal is, its meaning can also change with the setting.",
        "Because signals vary this way, animals gain by answering honest and doubtful ones differently.",
        "Communication changes over time, in the end, through senders and receivers alike."
      ],
      "inferences": [
        "A signal's effect shows in what the receiver does next.",
        "A watcher who tapes sound alone misses the visible part.",
        "A signal's worth depends on what lies between the animals.",
        "Calling far and staying hidden pull against each other.",
        "A costly display gives the receiver a reason to trust.",
        "Reading a signal without its setting can lead to mistakes.",
        "Trusting a doubtful signal as if it were sure costs the receiver.",
        "Slow change in receivers over time can alter the signals senders use."
      ],
      "applications": [
        "A bird turns away after it hears an alarm call.",
        "A lizard shows color and movement in the same meeting.",
        "A soft signal works nearby but fails beside a loud stream.",
        "A far mating call draws mates and also draws a predator.",
        "A costly display shows real proof of an animal's health.",
        "One movement warns a rival here and guides a mate there.",
        "An animal answers a sure caller fast, a doubtful one slowly.",
        "A change in how receivers answer reshapes which signals win later."
      ],
      "wrongApplications": [
        "A bird ignores the alarm call and still counts as responding.",
        "A lizard waits for its movement to end, then shows color.",
        "A soft signal should carry better beside a loud stream.",
        "A far mating call is safe, since distance hides the singer.",
        "A weak animal's frequent display is read as proof of health.",
        "One movement is marked a warning in the next place, unchecked.",
        "An animal answers sure and doubtful callers the same way.",
        "A study follows sender changes and treats the receivers as fixed."
      ],
      "wrong": [
        "A signal gives news by form; the receiver stays unchanged.",
        "Animals mix signal forms after the first form has arrived.",
        "A signal grows more useful as it gets harder to notice.",
        "Loud calls keep a caller safe because distance hides it.",
        "A costly signal is honest simply because it shows up often.",
        "A signal keeps one meaning even as the setting changes.",
        "Receivers gain more by answering all signals in the same way.",
        "Communication changes through senders alone, and receivers stay fixed."
      ]
    },
    "hard": {
      "intro": "An animal signal means little by itself; what follows traces how it is produced and how receivers, shaped by generations of response, decide what it comes to mean.",
      "facts": [
        "When an animal sends a signal, it can change the behavior of the animal that receives it — that is what the signal is for.",
        "Signals can travel as sound, movement, color, or scent, and combining more than one of these forms is common.",
        "A signal only has value if the receiver can actually detect it in the environment between them.",
        "A loud call reaches farther than a quiet one, but the same volume can also reveal the caller to nearby predators.",
        "Some signals stay reliable because a weak animal cannot afford the cost of producing them.",
        "The same display can mean different things depending on the situation, so context becomes part of the message.",
        "Receivers do better when they match their response to a signal's reliability, trusting proven sources more than uncertain ones.",
        "Communication evolves on both sides at once, since a signal only spreads if receivers keep responding to it in ways that make it worthwhile."
      ],
      "inferences": [
        "What a signal accomplishes is visible in the receiver rather than the sender, because the change that follows is where the effect appears.",
        "A researcher whose recording captures sound but no image may miss the visual half of the display that the animal produced at the same moment.",
        "What a signal is worth cannot be judged from the signal alone, because the conditions that separate sender from receiver decide its reach.",
        "Because reaching a distant partner and staying unnoticed pull opposite ways, a call that is loud enough for one purpose works against the other.",
        "Cost is one reason a receiver can trust what a display shows, because a signal that a weak animal cannot afford to produce is difficult to fake.",
        "An observer who notes a display but ignores the situation in which it occurs can record a wrong meaning, because one movement serves several ends.",
        "A receiver that answers an unreliable signal as though it were dependable pays for that error in wasted effort or in exposure to genuine danger.",
        "If receiver responses shift across many generations, the signals that animals produce shift as well, because a display that stops working on receivers is later abandoned."
      ],
      "applications": [
        "A bird that is feeding on open ground flies for cover after an alarm call reaches it from a bird in the next tree.",
        "A lizard that meets a rival raises the colored skin of its throat while performing a rapid push-up display, so both channels arrive together.",
        "A soft call that works between two animals a metre apart becomes useless beside a fast stream, where water covers the frequencies it uses.",
        "A frog whose mating call carries across the pond attracts females that are far away, and also brings a hunting bat toward the same spot.",
        "A display that takes sustained effort gives the watching female real evidence about the male's condition, because a poorly fed male cannot sustain it.",
        "The same tail movement warns a rival when it occurs at a territory border, and guides a partner when it occurs beside the nest.",
        "A monkey moves immediately when the alarm comes from an individual whose calls have proved accurate, and looks around first when the caller is unreliable.",
        "As females begin to prefer longer songs, the males whose songs run long leave more offspring, and the average song lengthens over generations."
      ],
      "wrongApplications": [
        "A bird that is feeding on open ground hears the alarm call, keeps feeding without pausing, and is recorded as having responded.",
        "A lizard meeting a rival finishes its push-up display first and raises the colored skin of its throat afterward, keeping the two channels apart.",
        "A soft call that works between two animals a metre apart is expected to carry even better beside a fast and noisy stream.",
        "A frog whose mating call carries across the pond is treated as safe, because the distance the call travels is assumed to hide him.",
        "A poorly fed male that performs the display very often is taken by the observer as evidence of good condition, because the display appears repeatedly.",
        "The same tail movement is recorded as a warning again beside the nest, because the observer carries the border reading across without checking the setting.",
        "A monkey moves immediately whenever an alarm is heard, giving the same response to an accurate caller and to one whose calls often prove false.",
        "A study measures how male songs lengthen across generations and treats female preference as a fixed background that needs no measuring."
      ],
      "wrong": [
        "A signal carries its information in the form that the sender produces, so the receiver's behavior stays as it was when the display began.",
        "Animals combine sound with movement mainly when the first form has already reached the receiver, so the second channel is added afterward.",
        "A signal becomes more useful as it grows harder to detect, because a display that the environment hides forces the receiver to attend closely.",
        "A loud call protects the animal that produces it, because the distance the sound travels hides the caller from any predator that hears it.",
        "A demanding display is reliable simply because it appears often within the population, and that frequency alone is what receivers read as honesty.",
        "A signal holds one fixed meaning even when the animal's situation changes, because the form the sender produces settles the message by itself.",
        "Receivers gain more by answering every signal in the same way, because a uniform response saves the effort that judging reliability would take.",
        "Communication evolves through changes on the signaler's side, because receiver behavior stays fixed while the displays that animals produce are reshaped over generations."
      ]
    }
  },
  "KO-HIDDEN-ASSUMPTIONS": {
    "easy": {
      "intro": "주장을 살필 때 전제를 어떻게 다루는지 알아보자.",
      "facts": [
        "주장은 글에 적히지 않은 생각도 전제로 삼는다.",
        "이런 전제는 근거에서 결론으로 넘어가도록 이어 주는 구실을 한다.",
        "그래서 같은 근거도 전제에 따라 다른 결론을 낳는다.",
        "이렇게 결론을 가르는 숨은 전제를 찾으려면 근거에 빠진 조건을 살핀다.",
        "이렇게 찾은 전제가 틀리면 맞는 근거도 결론을 지키지 못한다.",
        "특히 무엇이 더 좋다는 주장에는 글쓴이가 중요하게 보는 것이 전제로 깔린다.",
        "이런 전제가 닿는 범위를 보려면 반대 사례를 떠올려 본다.",
        "그러므로 주장을 볼 때는 근거와 함께 전제도 살펴야 한다."
      ],
      "inferences": [
        "문장을 다 읽어도 주장의 바탕은 안 보인다.",
        "근거와 결론이 옳아도 사이가 빈 주장은 흔들린다.",
        "같은 자료에서 결론이 갈리면 전제가 다른 것이다.",
        "근거에 빠진 조건을 찾는 일이 곧 전제 찾기다.",
        "자료가 맞는지 보는 것만으로는 결론을 믿어도 될지 알 수 없다.",
        "무엇이 낫다는 다툼은 사실보다 전제에서 생긴다.",
        "전제가 안 통하는 곳을 찾으면 주장 범위가 좁아진다.",
        "근거를 길게 늘어놓아도 빈 곳은 놓치기 쉽다."
      ],
      "applications": [
        "공원을 넓히면 덜 붐빈다는 생각이 깔렸는지 본다.",
        "자료와 결론 사이 빠진 고리를 한 줄로 써 본다.",
        "같은 자료도 값이냐 품질이냐에 따라 갈리는지 본다.",
        "결론이 서려면 무엇이 더 있어야 하는지 묻는다.",
        "이용자 수가 맞아도 그 수가 사업의 필요를 뜻하는지 본다.",
        "가장 싼 것이 좋다는 말에 값을 앞세운 뜻을 찾는다.",
        "도시에서 맞는 교통 주장이 농촌에서도 맞는지 따진다.",
        "통계를 본 뒤 결론으로 잇는 전제도 함께 살핀다."
      ],
      "wrongApplications": [
        "공원을 넓히자는 말에서 이미 쓰인 문장만 다시 본다.",
        "자료와 결론이 맞으니 사이 연결도 맞다고 본다.",
        "같은 자료로 결론이 갈리자 한쪽이 잘못 읽었다고 본다.",
        "결론에 필요한 조건을 글에 적힌 문장에서 고른다.",
        "이용자 수 자료가 맞으니 결론도 믿을 만하다고 본다.",
        "가장 싼 것이 좋다는 말에서 값 계산만 보고 끝낸다.",
        "도시 교통 주장이 농촌에 안 맞자 별난 사례로 둔다.",
        "정책 주장을 볼 때 통계 출처와 개수만 세어 본다."
      ],
      "wrong": [
        "근거가 있으면 결론과의 연결도 근거 안에 있다.",
        "전제는 결론을 되풀이해 뜻을 밝히는 문장이다.",
        "결론이 갈리면 한쪽이 근거를 잘못 읽은 것이다.",
        "숨은 전제는 글에 쓰인 말 중 결론과 가까운 문장이다.",
        "근거가 맞으면 전제는 결론의 표현만 바꾼다.",
        "가치 판단은 글쓴이 취향이 보여서 전제 찾기가 쉽다.",
        "반대 사례는 다른 결론을 보이나 전제 범위와 무관하다.",
        "근거가 많은 주장은 전제보다 수와 출처로 따진다."
      ]
    },
    "hard": {
      "intro": "어떤 주장을 평가할 때, 겉으로 드러나지 않더라도 그 주장을 떠받치는 전제라는 요소를 어떻게 다루어야 하는지 살펴보자.",
      "facts": [
        "어떤 주장은 글의 표면에 직접 적히지 않은 생각까지 전제로 삼으므로, 문장을 다 읽더라도 그 바탕이 드러나지는 않는다.",
        "전제는 겉으로 드러나지 않더라도 근거에서 결론으로 건너가는 연결이 무너지지 않고 성립하도록 떠받친다.",
        "같은 근거를 놓고도 어떤 전제를 쓰느냐에 따라 결론이 달라질 수 있으므로, 근거가 같다고 결론까지 같아지지는 않는다.",
        "숨은 전제를 찾아내려면, 결론이 성립하는 데 꼭 필요한 조건이 제시된 근거 안에 들어 있는지를 따져 보아야 한다.",
        "전제가 사실과 어긋나 있다면, 근거로 제시된 자료가 아무리 정확하더라도 그 근거가 떠받치려던 결론은 약해질 수 있다.",
        "가치 판단이 섞인 주장에서는, 글쓴이가 무엇을 더 중요하게 여기는지가 문장에 적히지 않더라도 전제로 놓여 있다.",
        "주장과 어긋나는 반대 사례를 떠올려 보면, 그 전제가 어디까지 통하고 어디부터 통하지 않는지 범위를 가늠할 수 있다.",
        "어떤 주장을 평가할 때에는 근거가 옳은지만 확인하고 그치지 말고, 근거와 결론을 이어 주는 전제까지 검토해야 한다."
      ],
      "inferences": [
        "글에 적힌 문장을 처음부터 끝까지 다 읽더라도, 그 주장이 딛고 선 바탕은 끝내 드러나지 않을 수 있다.",
        "근거와 결론이 저마다 그럴듯해 보이더라도, 둘을 이어 주는 자리가 비어 있으면 그 주장은 뿌리부터 흔들리게 된다.",
        "같은 자료를 읽고도 서로 다른 결론에 이르렀다면, 두 사람이 각기 다른 전제를 깔고 있었을 가능성이 크다.",
        "근거에서 빠져 있는 조건이 무엇인지 짚어 내면, 그것이 곧 글에 적히지 않고 숨어 있던 전제를 드러내는 과정이 된다.",
        "자료가 정확한지만 꼼꼼히 따져서는, 그 자료를 딛고 세운 결론을 얼마나 믿어도 되는지까지 충분히 판단할 수 없다.",
        "무엇이 더 낫다는 판단이 갈리는 까닭은 사실을 잘못 확인해서라기보다, 서로 다른 가치를 전제로 깔고 있기 때문이다.",
        "그 전제가 더는 통하지 않는 상황을 찾아 두면, 주장이 미치는 범위를 처음보다 좁혀서 조심스럽게 말할 수 있다.",
        "근거를 몇 개나 댔는지 목록으로 길게 늘어놓는 평가에 머무르면, 그 주장에서 가장 허술한 대목을 놓치기 쉽다."
      ],
      "applications": [
        "공원이 붐비니 더 넓혀야 한다는 주장을 만나면, 공간이 넓어지면 혼잡이 줄어든다는 생각이 그 밑에 깔려 있는지 살핀다.",
        "자료와 결론 사이에서 빠져 있는 연결 고리가 무엇인지를 짚어, 그것을 한 문장으로 정리해서 적어 본다.",
        "똑같은 판매 자료를 놓고 보더라도, 가격을 중시하느냐 품질을 중시하느냐에 따라 결론이 달라짐을 찾는다.",
        "그 결론이 성립하려면 이미 제시된 근거 말고도 어떤 조건이 더 갖추어져야 하는지를 스스로 묻고 확인한다.",
        "이용자 수가 정확하게 조사되었고 믿을 만하더라도, 그 숫자가 곧 사업의 필요성을 뜻하는지까지 따로 검토한다.",
        "가장 싼 선택이 좋다고 말하는 주장이라면, 그 밑에 비용을 다른 가치보다 앞세우는 판단이 깔려 있음을 찾아낸다.",
        "도시에서는 잘 들어맞더라도 농촌에서도 그 교통 주장이 성립하는지, 조건이 반대인 상황을 일부러 떠올려 확인한다.",
        "통계 자료가 믿을 만한지 확인하고 나서, 그 자료가 정책 결론으로 이어지도록 잇는 전제가 옳고 탄탄한지까지 평가한다."
      ],
      "wrongApplications": [
        "공원을 넓히자는 주장에 빠진 생각을 찾으려면, 글에 이미 쓰여 있는 문장들만 살피면 되고 그 밖은 볼 것 없다고 본다.",
        "자료도 옳고 결론도 옳으므로, 그 둘을 잇는 연결 역시 따로 살피지 않아도 당연히 옳은 것으로 본다.",
        "똑같은 판매 자료를 읽었는데 서로 다른 결론이 나오자, 한쪽이 자료를 잘못 읽고 있다고 곧바로 판단한다.",
        "결론이 성립하는 데 꼭 필요한 조건을, 글 밖에서 찾지 않고 적혀 있는 문장들 가운데에서 골라 확인한다.",
        "이용자 수 자료가 정확한지 먼저 확인하고 나서, 그 자료가 정확했으므로 그 주장의 결론까지 믿을 만하다고 본다.",
        "가장 싼 선택이 좋다고 말하는 주장을 만나면, 값을 더한 계산이 틀리지 않았는지만 확인하고 평가를 마무리한다.",
        "도시에서 잘 통하던 교통 주장이 농촌에는 들어맞지 않자, 농촌은 사정이 특수한 곳이라며 예외 사례로 떼어 둔다.",
        "어떤 정책 주장을 평가하면서, 함께 제시된 통계 자료의 출처가 어디이고 개수가 몇 개인지를 세어 보고 판단한다."
      ],
      "wrong": [
        "주장에 근거가 제시되어 있다면, 근거와 결론을 잇는 연결은 따로 살피지 않아도 그 근거 자체에 들어 있는 셈이다.",
        "전제란, 근거의 뜻이 흐릿하더라도 앞서 내세운 결론을 되풀이하여 그 뜻을 분명하게 만들어 주는 문장인 셈이다.",
        "같은 근거를 읽었는데 서로 다른 결론이 나왔다면, 둘 중 한쪽은 그 근거를 잘못 읽어 낸 사람이라고 보아야 한다.",
        "숨은 전제는, 글에 이미 직접 쓰여 있고 결론과 뜻이 가장 가까이 맞닿아 있는 조건 문장을 골라내면 찾을 수 있다.",
        "근거로 든 자료가 정확하다면, 전제가 사실과 맞는지는 결론의 옳고 그름이 아니라 결론의 표현 방식만 좌우한다.",
        "가치 판단이 담긴 글에서는 글쓴이의 선호가 드러나므로, 바탕에 깔린 전제도 애써 뒤지지 않아도 쉽게 찾을 수 있다.",
        "반대 사례는 주장과 어긋나는 결론을 보여 주기는 하지만, 전제가 어디까지 적용되는 범위와는 떼어 놓고 보아야 한다.",
        "근거가 넉넉한 주장이라면, 전제를 따지기보다 근거가 몇 개나 되고 출처가 어디인지를 중심으로 평가해야 한다."
      ]
    }
  },
  "KO-MAIN-RELEVANCE": {
    "easy": {
      "intro": "긴 글에서 무엇을 남길지 정하는 법을 알아보자.",
      "facts": [
        "글의 핵심은 문장들을 묶는 중심 생각에 있다.",
        "이 중심 생각을 기준으로 보면 재미있는 사례도 그 생각을 받쳐야 핵심이 된다.",
        "이때 중심 생각을 찾으려면 겹치는 낱말보다 문장들이 함께 말하는 것을 본다.",
        "이런 관계를 보여 주는 예시는 중심 생각을 보여 주나 주제 자체는 아니다.",
        "이를테면 원인과 결과를 다룬 글은 둘의 관계를 요약에 넣는다.",
        "반면 견주는 글은 한쪽 특징보다 둘의 큰 차이를 본다.",
        "이렇게 중심 생각을 가릴 때 세부 정보를 빼도 결론이 그대로면 줄여도 된다.",
        "다만 좋은 요약은 이렇게 줄여도 원문 범위를 넓히거나 새로운 내용을 덧붙이지 않는다."
      ],
      "inferences": [
        "문장 하나만 옮겨 적으면 중심 생각이 빠진다.",
        "잘 기억나는 이야기도 중심과 멀면 빠질 수 있다.",
        "낱말이 달라도 문장들이 같은 관계를 말하기도 한다.",
        "예시를 그대로 옮긴 요약은 원문의 주제보다 좁다.",
        "원인과 결과만 적은 요약에는 관계가 빠져 모자라다.",
        "한쪽만 자세히 적은 요약에는 견주는 짜임이 빠진다.",
        "어떤 정보를 지우면 결론이 달라지는지 따져서 정한다.",
        "원문에 없던 조언을 넣은 요약은 원문과 다른 말이 된다."
      ],
      "applications": [
        "문단들이 함께 말하는 생각을 한 줄로 묶는다.",
        "재미있는 일화가 결론을 받치는지 보고 넣을지 정한다.",
        "여러 문장이 보여 주는 변화를 한 문장에 담는다.",
        "여러 동물 사례를 환경 적응이라는 생각으로 묶는다.",
        "비가 오면 흙이 젖어 식물이 달라진다는 관계를 남긴다.",
        "두 재료의 특징보다 열 전달 방식 차이를 적는다.",
        "장소와 이름을 빼도 남는 결론을 요약에 적는다.",
        "일부 지역 조사를 요약할 때 범위도 그대로 둔다."
      ],
      "wrongApplications": [
        "문단마다 가장 긴 문장을 뽑아 이어 붙인다.",
        "재미있는 일화가 남아서 요약 첫 줄에 먼저 적는다.",
        "문장에 겹친 낱말이 적으니 내용도 다르다고 본다.",
        "여러 동물 사례 중 자세한 하나를 주제로 정한다.",
        "비와 식물을 다룬 글에서 강수량만 골라 요약한다.",
        "두 재료 중 글쓴이가 좋게 그린 쪽만 골라 적는다.",
        "장소와 이름을 빼도 결론이 남으니 이름을 적는다.",
        "일부 지역 조사를 요약하며 전국 결론까지 함께 낸다."
      ],
      "wrong": [
        "가장 자주 나오는 낱말이 든 문장이 중심 생각이다.",
        "재미있는 사례는 이해를 도우니 먼저 골라야 한다.",
        "겹친 낱말이 적으면 설명하는 관계도 서로 다르다.",
        "예시가 자세할수록 중심 생각보다 주제를 잘 나타낸다.",
        "원인과 결과 중 자세히 나온 쪽만 남기고 관계는 뺀다.",
        "견주는 글은 글쓴이가 좋게 그린 쪽을 골라 적는다.",
        "빼도 결론이 남는 정보가 글의 설득력을 맡는다.",
        "좋은 요약은 뜻을 밝히려 결론을 한 단계 넓힌다."
      ]
    },
    "hard": {
      "intro": "긴 글을 요약할 때는 무엇을 남기고 무엇을 줄일지 판단해야 하는데, 그 기준을 살펴보자.",
      "facts": [
        "글의 핵심은 문장을 많이 옮겨 적더라도 드러나지 않으며 여러 문장을 하나로 묶는 중심 생각 속에서 찾을 수 있다.",
        "아무리 흥미로운 사례라 하더라도 그것이 중심 생각을 뒷받침하고 있어야 비로소 핵심 정보가 된다.",
        "자주 되풀이되는 낱말에 눈길을 빼앗기지 말고 여러 문장이 공통으로 설명하고 있는 관계가 무엇인지를 살펴야 한다.",
        "예시는 중심 생각을 구체적으로 보여 주고 이해를 돕지만, 예시 하나가 곧 글 전체의 주제가 되지는 않는다.",
        "원인과 결과를 설명하고 있는 글에서는 두 요소를 적는 데 그치지 않고 둘을 잇는 관계까지 요약에 담아야 한다.",
        "두 대상을 맞대어 놓고 견주는 글이라면, 어느 한쪽의 특징을 늘어놓기보다 둘의 중요한 차이에 초점을 맞출 수 있다.",
        "어떤 세부 정보를 덜어 내더라도 글의 결론이 그대로 유지된다면, 그 정보는 요약 단계에서 과감히 줄여도 좋다.",
        "좋은 요약은 원문이 말한 범위를 함부로 넓히지 않고 원문에 없던 새로운 판단을 제 마음대로 덧붙이지도 않는다."
      ],
      "inferences": [
        "문장 하나만 골라 두고 그대로 옮겨 적으면, 여러 문장을 아우르는 글 전체의 중심 생각은 빠진다.",
        "오래 기억에 남는 이야기라 하더라도 글의 중심 생각과 멀리 떨어져 있다면 요약 과정에서 빠질 수 있다.",
        "서로 겹치는 낱말이 거의 없는 문장들이라 하더라도 그 문장들이 하나의 같은 관계를 함께 설명하고 있을 수 있다.",
        "인상이 깊다고 하여 예시 하나를 그대로 옮겨 놓고 만든 요약문은, 원문이 다루던 주제보다 좁은 내용만 담게 된다.",
        "원인과 결과를 각각 따로 적어 두었더라도 그 둘을 이어 주는 관계 설명이 빠지면 요약문은 반쪽짜리에 그치게 된다.",
        "두 대상 가운데 한쪽만 자세히 소개하고 마는 요약문이라면, 서로 맞대어 견주는 글의 짜임새를 제대로 살리지 못한다.",
        "어떤 정보를 지웠을 때 글의 결론이 달라지는지 하나하나 따져 보면, 요약문에 남겨 둘 내용을 스스로 정할 수 있다.",
        "원문에는 없던 조언을 글 마무리에 슬쩍 덧붙인 요약문은, 글쓴이가 실제로 한 말과는 다른 내용을 독자에게 전하게 된다."
      ],
      "applications": [
        "각 문단이 저마다 무엇을 말하는지 살핀 뒤, 문단들이 함께 설명하고 있는 생각을 한 문장으로 묶어 본다.",
        "재미있는 일화라 하더라도 그것이 글의 결론을 뒷받침하고 있는지 먼저 확인한 뒤에 요약에 넣을지 말지를 정한다.",
        "여러 문장이 저마다 다른 말을 하면서도 함께 보여 주는 변화가 무엇인지, 그것을 한 문장으로 묶어 정리한다.",
        "여러 동물의 사례가 제각각이더라도 그것들을 생존 환경에 따른 적응이라는 하나의 중심 생각으로 묶고 정리한다.",
        "비가 내리면 토양이 젖고 그에 따라 식물이 자라는 속도가 달라진다는 인과 관계를 요약 속에 그대로 남긴다.",
        "두 재료를 견주는 글이라면, 자잘한 특징을 늘어놓기보다 열을 전달하는 방식이 어떻게 다른지를 중심으로 정리한다.",
        "장소 이름과 사람 이름이 모두 빠지더라도 그대로 살아남는 결론이 무엇인지를 가려내고 그것만 요약에 남긴다.",
        "일부 지역에서만 이루어진 조사 결과를 간추리면서, 결론이 미치는 범위를 넓히지 않고 그 지역으로 한정해 둔다."
      ],
      "wrongApplications": [
        "각 문단에서 내용을 따지지 않고 가장 긴 문장을 하나씩 뽑고 순서대로 그대로 이어 붙여 요약으로 삼는다.",
        "재미있는 일화가 인상 깊게 남았으므로, 결론과 이어지는지 따지지 않고 요약의 첫 문장으로 먼저 적어 둔다.",
        "여러 문장에 겹치는 낱말이 거의 없으므로, 그 문장들은 서로 다른 내용을 말하고 있다고 보고 따로 정리한다.",
        "여러 동물 사례 가운데 가장 자세하게 설명된 하나를 골라내고 나머지는 보지 않고 그것을 글의 주제로 정한다.",
        "비와 식물 성장을 함께 다루고 있는 글에서, 가장 자세하게 설명된 강수량 수치만 골라내고 관계는 적지 않는다.",
        "두 재료를 견주는 글이라면, 글쓴이가 더 좋게 소개해 놓은 쪽의 특징만 골라내고 그것을 중심으로 정리한다.",
        "장소 이름과 사람 이름을 빼도 글의 결론은 그대로 유지되고 있으므로, 그 이름들을 요약 안에 그대로 남겨 둔다.",
        "일부 지역에서만 이루어진 조사 결과를 간추리면서, 결과가 전국에도 들어맞는다고 보고 결론의 범위까지 넓혀 잡는다."
      ],
      "wrong": [
        "글에서 가장 자주 되풀이되는 낱말을 품고 있는 문장을 찾아내면 그것이 곧 글 전체의 중심 생각이 된다.",
        "흥미로운 사례는 독자의 이해를 크게 돕고 있으므로 중심 생각과 이어지는지 따지기 전에 핵심 정보로 먼저 골라야 한다.",
        "문장들 사이에 겹치는 낱말이 얼마 되지 않는다면, 그 문장들이 설명하는 관계도 서로 다르다고 보아도 무리가 없다.",
        "예시가 구체적이면 구체적일수록 그 예시는 중심 생각보다 글 전체의 주제를 더 정확하게 대표한다고 보아도 좋다.",
        "원인과 결과 가운데 더 자세히 설명된 요소만 요약에 남겨 두면, 둘을 잇는 관계는 생략하고 넘어가도 요약이 된다.",
        "두 대상을 맞대어 견주는 글이라면, 글쓴이가 더 긍정적으로 그려 놓은 쪽의 특징을 중심에 두고 간추리는 것이 좋다.",
        "세부 정보를 빼고도 글의 결론이 그대로 유지된다면, 그 정보가 바로 설득력을 떠받치는 핵심 대목이라고 보아도 좋다.",
        "좋은 요약은 분량이 짧더라도 원문의 뜻을 분명하게 드러내려고 글쓴이의 결론을 한 단계 넓혀 준다."
      ]
    }
  },
  "EN-MODELS-PREDICTIONS": {
    "easy": {
      "intro": "This passage tells what models do and how we test them.",
      "facts": [
        "A model shows some parts of a system, not all.",
        "Choosing which parts to show this way is what makes a simple model's big links easy to see.",
        "Working from that simple picture, a guess comes from the model and the data put in.",
        "A test then puts that guess next to real data.",
        "When a test fails, the wrong guess can show a bad idea or a missing part.",
        "That is also why a model may work in one range and fail outside it.",
        "Because of these limits, two models of one system can have two different goals.",
        "Through all of this, a model earns trust from many tests, not from extra parts."
      ],
      "inferences": [
        "Dropping detail can be a choice, not a flaw.",
        "We lose small details in order to see the big link.",
        "A bad guess may come from the data, not the model.",
        "A model is untested until its guess meets real data.",
        "We should study a wrong result, not throw it away.",
        "Past wins say little about work outside the tested range.",
        "We can pick a better model once we know the work's goal.",
        "A big model still needs a record of tests it has passed."
      ],
      "applications": [
        "A map hides small things but keeps roads for travel.",
        "A climate model groups details so big patterns show.",
        "A weather guess changes once new heat data come in.",
        "Workers compare the guessed river height with the real height.",
        "A strange result leads a team to check soil ideas.",
        "A model from young trees is used with care on old woods.",
        "One traffic model studies travel time. Another studies dirty air.",
        "A model earns trust from good guesses in many tests."
      ],
      "wrongApplications": [
        "A map draws every small thing so travelers trust it.",
        "A climate model keeps each detail apart so big patterns show.",
        "A weather guess stays put once new heat data come in.",
        "Workers change the real river height to match the guess.",
        "A strange result leads a team to skip soil ideas.",
        "A model from young trees is used boldly on old woods.",
        "A city drops its air model since the traffic model wins.",
        "A model earns trust from extra parts in its math."
      ],
      "wrong": [
        "A model becomes right by holding every detail of a system.",
        "Making things simple wipes out links a model should show.",
        "A strong model gives the same guess even with new data.",
        "A test makes a model better by bending data to fit.",
        "A wrong guess names the one part behind the fault.",
        "A model working in one range also works past it.",
        "Two models of one system fight to find one goal.",
        "A model with more parts earns more trust."
      ]
    },
    "hard": {
      "intro": "Every model leaves something out on purpose, and what follows traces what it keeps, what it drops, and how its predictions hold up against what is actually observed.",
      "facts": [
        "A model represents only the features its makers judged relevant, not every detail of the real system.",
        "Useful models strip away detail on purpose, because a simpler picture makes an important relationship easier to see.",
        "A prediction depends on both the model's structure and the information fed into it, so changing either one can shift the forecast.",
        "Testing is the moment when a prediction is set beside real-world observations to see whether they agree.",
        "When a prediction fails, the failure often points to a weak assumption or a factor the model left out.",
        "A model can perform well within the range it was tested on and poorly beyond it, since its relationships need not hold everywhere.",
        "Different models of the same system do not have to compete, because each may serve a different purpose.",
        "A model earns confidence by having its predictions survive repeated tests, not by how complex it looks."
      ],
      "inferences": [
        "Detail left out on purpose is a decision rather than a defect, provided that the omission does not touch the question that matters.",
        "A degree of blurring is the price of clarity, because the broad relationship that a reader needs would be lost inside a fully detailed account.",
        "A prediction that misses badly does not convict the model, because the numbers entered into it may have been wrong before any calculation began.",
        "A model remains untested, however elegant it looks, until the moment when one of its predictions meets an observation that someone recorded.",
        "A result that comes out wrong repays close study, because the point where the reasoning parted from the world often shows in the error itself.",
        "A record of past success says little about how a model behaves outside the conditions where that record was gathered, though the record remains genuine.",
        "The question of which model is better becomes answerable once the purpose is stated, because a purpose supplies the standard that the comparison needs.",
        "A model of elaborate design still owes its standing to tests that it passed, because complexity that has proved nothing carries no weight."
      ],
      "applications": [
        "A map that omits small objects still keeps every road a traveler needs, because those objects have nothing to do with finding a route.",
        "A climate model gathers thousands of local details into a few large categories, so that the pattern which spans a continent can be examined.",
        "A weather forecast issued in the morning is revised by afternoon when fresh readings enter the model, though the model itself is unchanged.",
        "Researchers who forecast a river's crest return after the storm to compare the height they predicted with the height that their gauges recorded.",
        "A result that lands far from the forecast sends the team back to the assumption about soil drainage, which they had accepted without testing.",
        "A growth model checked against young plantations is applied to ancient forest with open caution, because nothing in the test covered trees of that age.",
        "One traffic model estimates how long a commute will take, while a second model of the same network estimates the pollution that traffic produces.",
        "A model earns confidence after several separate tests, run in different seasons, produce forecasts that fall close to the measurements taken later."
      ],
      "wrongApplications": [
        "A map that is redrawn to show every small object serves travelers better, because a sheet that leaves nothing out can be trusted.",
        "A climate model keeps every local detail apart from the others, so that the pattern which spans a continent stays visible in the output.",
        "A weather forecast issued in the morning stands unchanged through the afternoon when fresh readings arrive, since the model itself has not changed.",
        "Researchers who forecast a river's crest return after the storm to adjust the height that their gauges recorded until it matches the predicted figure.",
        "A result that lands far from the forecast leaves the team content with the assumption about soil drainage, which they had accepted without testing.",
        "A growth model checked against young plantations is applied to ancient forest with full confidence, because the figures that it gave for young trees held.",
        "A city retires the pollution model of its network, because the travel-time model that it also owns predicts commutes with far greater accuracy.",
        "A model earns confidence after new features, added to its equations, make the description of the system that it offers richer than before."
      ],
      "wrong": [
        "A model becomes accurate when every part of the system has been written into it, because any detail that is dropped is a gap.",
        "Stripping detail away removes the relationships that a model is supposed to explain, so that a reduced picture leaves the reader with less to examine.",
        "A model counts as strong when its predictions stay the same though the information entered into it changes, since a firm structure absorbs variation.",
        "Testing improves a model when observations are brought into line with its prediction, because a record that agrees is what a test should yield.",
        "A prediction that fails identifies the single factor behind the weakness, because the size of the error points to the one assumption that went wrong.",
        "A model that performs well inside the range where it was tested gains support beyond that range, since success in one region carries over.",
        "Different models of one system compete with each other until the single useful purpose that a system permits has been identified by the surviving model.",
        "Confidence in a model rises as more features are written into it, because a model that represents more detail sits closer to the world."
      ]
    }
  },
  "EN-FEEDBACK-SYSTEMS": {
    "easy": {
      "intro": "This passage shows how a system's output shapes its next step.",
      "facts": [
        "Feedback happens as a system's output shapes its next move.",
        "One form this feedback can take is balancing feedback, which pushes a system back toward its target range.",
        "Reinforcing feedback works the opposite way, letting a small change grow through later effects.",
        "Either kind can be thrown off by a delay, which makes it act late, once the state has changed.",
        "Because of that delay and the loop itself, one loop can help in one place and hurt in another.",
        "Judging that from one step is hard, since a step like this can hide a loop built over many steps.",
        "Within such a loop, one changed link can touch far parts of the system.",
        "To grasp feedback like this, trace how effects go back to causes."
      ],
      "inferences": [
        "A result that does not come back is not feedback.",
        "Balancing feedback keeps a system in range, not adrift.",
        "A small starting gap can grow large with no push from outside.",
        "A late answer may fit an earlier state of the system, now gone.",
        "To judge a feedback loop, look at where in the system it works.",
        "A single look can miss a pattern spread over many later steps.",
        "A small local change may show up somewhere far away much later.",
        "Tracing in one direction leaves the whole loop half described."
      ],
      "applications": [
        "A thermostat reads room heat to decide whether to heat more.",
        "Sweating moves body heat back toward a good range.",
        "Melting ice bares dark water. Dark water soaks heat and melts more.",
        "A heater keeps warming since its sensor reads an old temperature.",
        "Fast sharing spreads a warning message but also spreads a rumor.",
        "A price rise cuts supply later, and low supply lifts price again.",
        "Losing one predator changes plants through its prey animals.",
        "A student traces demand to price, then back to demand."
      ],
      "wrongApplications": [
        "A thermostat blows warm air, and its work ends right there.",
        "Sweating returns body heat to the exact starting point.",
        "Ice keeps melting since a new outside heat source comes each summer.",
        "A heater's old sensor reading holds the room at its old heat.",
        "Fast sharing spreads a warning message, so spreading rumors is good too.",
        "One look at falling supply is read as the whole pattern.",
        "Losing one predator changes nearby prey, and plants stay the same.",
        "A student traces demand to price and stops right there."
      ],
      "wrong": [
        "Feedback happens as output leaves the system for a new process.",
        "Balancing feedback brings a system back to its exact start point.",
        "Reinforcing feedback grows by adding a new outside push each step.",
        "A delay holds the old state until the system answers.",
        "A helpful loop keeps the same effect in every setting.",
        "One step shows the whole loop, since effects name their causes.",
        "One changed link touches nearby parts and leaves far parts calm.",
        "To grasp feedback, trace effects forward from the first cause."
      ]
    },
    "hard": {
      "intro": "A system's own output can quietly steer what it does next, and the paragraphs below trace how that loop works and why it disappears from view when only one step is watched.",
      "facts": [
        "Feedback occurs whenever a system's output loops back and shapes what the system does next.",
        "Balancing feedback works against whatever change is under way, pulling a drifting system back toward its target.",
        "Reinforcing feedback works the opposite way, letting each effect feed the next so a small change grows larger.",
        "A delay in the loop means the response arrives only after the conditions that triggered it have already shifted.",
        "The same feedback process can stabilize a system in one setting and destabilize it in another, depending on conditions.",
        "Watching a single step can hide a loop that only becomes visible once the whole cycle is traced.",
        "Changing one connection inside a loop can affect parts of the system that seem far removed from it.",
        "Understanding feedback means tracing how an effect travels back to the cause that produced it."
      ],
      "inferences": [
        "A process whose result travels outward and does not return to the system that produced it falls outside what feedback describes.",
        "Because balancing feedback opposes movement in either direction, a system under its influence tends to stay in the band that the loop defends.",
        "A difference that is too small to notice can end up large, because a reinforcing loop supplies the growth without any push from outside.",
        "A response that arrives long after the situation has moved on may fit a condition that has already passed rather than the state now in place.",
        "Whether a feedback process deserves praise or alarm depends on the setting in which the loop runs, so that the same loop invites different verdicts.",
        "A single observation can miss a pattern that emerges across several later steps, because one measurement records a moment rather than a sequence.",
        "A change that looks confined to one corner of a system may surface later at a considerable distance from its origin, because the loop carries it there.",
        "Following a chain of effects in one direction leaves a description that stops short, because such an account omits the return path that closes the loop."
      ],
      "applications": [
        "A thermostat reads the temperature that the furnace has just produced and uses that reading to decide whether the furnace should keep running.",
        "When the body grows too warm, sweating carries heat away and moves the temperature back toward the range in which the body works best.",
        "As more sea ice melts, the dark water underneath absorbs the sunlight that the ice once reflected, which warms the ocean and melts more ice.",
        "A heater keeps warming a room that is already warm, because the sensor that governs it reports a temperature from minutes earlier.",
        "Rapid sharing pushes an emergency warning across a city, though the same speed carries a false rumor just as far before anyone checks it.",
        "A price rise this season reduces the acreage that farmers plant next season, and the smaller harvest that follows drives the price upward once again.",
        "Removing a single predator from a valley changes the plants along the river, because the deer that it once hunted now browse the willows freely.",
        "A student traces how rising demand lifts the price, then follows the higher price back to the demand that it dampens, closing the loop."
      ],
      "wrongApplications": [
        "A thermostat sends warm air into the room, and its task ends there, because the temperature that follows belongs to a separate process.",
        "When the body grows too warm, sweating carries heat away and returns the temperature to the exact point at which the warming first began.",
        "As more sea ice melts, the melting continues because a fresh source of heat arrives from outside each summer, while the exposed water adds nothing.",
        "The older reading that a heater's sensor reports holds the whole room at the temperature it had minutes earlier, because nothing else changes.",
        "Rapid sharing pushes an emergency warning across a city, which means the speed that carries false rumors is equally welcome, whichever message travels.",
        "A single look at falling supply this season is taken as the whole account of the price change, because the seasons that follow go unexamined.",
        "Removing a single predator from a valley changes the deer that it once hunted, while the willows along the river stay as they were.",
        "A student traces how rising demand lifts the price, and then stops there, because the price change now has an explanation that satisfies the assignment."
      ],
      "wrong": [
        "Feedback occurs when the output of a system leaves it behind and begins a separate process that then runs elsewhere under its own momentum.",
        "Balancing feedback restores the exact condition that existed before the change began, because such a loop carries the system back to its original point.",
        "Reinforcing feedback enlarges a change because a fresh force that arrives from outside is added at every step, while the loop itself contributes nothing.",
        "A delay inside a loop preserves the earlier condition until the system is ready to respond, so that nothing changes while the response travels.",
        "A feedback process that helps in one setting keeps the same effect when the setting changes, because the loop carries its character with it.",
        "A single observed step reveals the whole loop, because an effect visible at that step points back to the cause that produced it.",
        "Changing one connection inside a loop alters the parts that sit beside it while distant parts remain stable, since the effect fades with distance.",
        "Feedback is understood by following effects forward from the cause that started them, because a chain traced in that direction shows everything."
      ]
    }
  }
};
