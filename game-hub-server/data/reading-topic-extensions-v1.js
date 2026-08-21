"use strict";

// 문항 생성용 보강 데이터 (2026-08-06 추가).
// 기존 데이터만으로는 정답(applications = 사례형)과 오답(wrong = 진술형)의
// 문체와 길이가 달라, 지문을 읽지 않고 겉모습만 보고도 정답을 고를 수 있었다.
// 계열이 맞는 짝을 제공하기 위해 아래 배열을 추가한다.
//
//   intro                : 지문 맨 앞에 붙는 도입문
//   inferences[i]        : facts[i]로 판단 가능한 참인 "진술" (진술형 문항의 정답)
//   wrongApplications[i] : facts[i] 상황을 잘못 적용한 "사례" (사례형 문항의 오답)
//   wrongExtra           : wrong 배열이 5개뿐인 주제에 더하는 진술형 오답
//
// 문장 길이는 짝이 되는 배열에 맞춰 두었다(한국어 ±3자, 영어 ±5자).
// 이 균형이 깨지면 "가장 짧은 선지가 정답"이라는 지름길이 되살아난다.
//
// 이중 언어 주제는 ["한국어", "English"] 2원소 배열, 단일 언어 주제는 평문 문자열.

module.exports = {
  "SCI-WATER-CYCLE": {
    "intro": [
      "물이 어떤 길을 따라 이동하며 형태를 바꾸는지 자세히 살펴보자.",
      "Here is how water moves from place to place and changes its form."
    ],
    "inferences": [
      [
        "물이 보이지 않게 줄어도 그 물은 다른 형태로 공기 중에 남는다.",
        "Water that seems to disappear from a surface is still in the air in another form."
      ],
      [
        "구름이 생긴 자리의 공기는 그전보다 온도가 내려간 상태라고 볼 수 있다.",
        "The air where a cloud forms is cooler now than it was before the cloud appeared."
      ],
      [
        "같은 구름이라도 물방울이 작게 유지되는 동안에는 비가 내리기까지 시간이 더 걸린다.",
        "Even in the same cloud, rain takes longer to fall for as long as the droplets inside stay small."
      ],
      [
        "비가 그친 뒤 지표에 남은 물만 재면 실제로 내린 비의 양보다 적게 계산된다.",
        "Measuring only water left on the surface gives less than the rain that actually fell."
      ],
      [
        "바다에서 멀리 떨어진 곳에 내린 비도 시간이 지나면 바닷물의 일부가 된다.",
        "Rain that falls far from the coast still becomes part of the ocean after some time."
      ],
      [
        "잎이 무성한 숲의 공기는 주변 지역보다 수증기를 더 많이 받아들이게 된다.",
        "Air in a leafy forest takes in more water vapor than air in the surrounding area."
      ],
      [
        "물의 순환을 설명할 때에는 장소의 이동과 상태 변화를 함께 다루어야 한다.",
        "A full account of the water cycle has to cover both movement and changes of state."
      ],
      [
        "태양에서 오는 에너지가 줄면 물의 순환이 일어나는 속도도 느려질 수 있다.",
        "Less energy arriving from the Sun makes the water cycle as a whole proceed more slowly."
      ]
    ],
    "wrongApplications": [
      [
        "젖은 수건이 마르는 것은 물이 햇빛에 흡수되어 없어진 사례다.",
        "A drying towel is an example of water being absorbed into sunlight and lost."
      ],
      [
        "차가운 컵 표면의 물방울은 컵 안의 물이 밖으로 새어 나온 것일 수 있다.",
        "Droplets on a cold cup can be water leaking out from inside."
      ],
      [
        "구름이 두껍게 보이면 물방울 크기와 상관없이 곧 비가 내릴 수 있다.",
        "Clouds that look thick can bring rain soon whatever the droplet size."
      ],
      [
        "길이 마르면 내린 비는 강으로 흘러간 것이 된다.",
        "Once the road dries after rain, the rain has moved into the river."
      ],
      [
        "땅속으로 스며든 물은 바다에 이르지 못하고 그 자리에 남는다.",
        "Water soaking into the ground stays where it is instead of reaching the sea."
      ],
      [
        "숲에서는 나무가 물을 붙잡아 공기가 건조해진다.",
        "In a forested area, trees hold water and the air can grow drier."
      ],
      [
        "물이 얼음이 되면 순환에서 완전히 빠져나온 경우가 된다.",
        "Water becoming ice is a case of leaving the water cycle for good."
      ],
      [
        "바람이 잦아든 날에는 햇빛이 강해도 증발이 멈출 수 있다.",
        "When the wind dies down, evaporation can stop even in strong sunlight."
      ]
    ],
    "wrongExtra": [
      [
        "구름이 사라진 하늘에서는 그 안에 있던 물이 대기에서 빠져나간 상태가 된다.",
        "When a cloud disappears from the sky, the water it held has left the atmosphere."
      ],
      [
        "지하수는 한번 흙 속에 들어가면 지표의 물과 섞이지 않고 별개로 남는다.",
        "Once water enters the soil it stays separate from surface water and does not return."
      ],
      [
        "바다에서 증발한 물은 육지로 이동하지 않고 바다 위에서 비가 되어 돌아온다.",
        "Water evaporating from the sea returns as rain over the sea without moving over land."
      ]
    ]
  },
  "SCI-ECOSYSTEM": {
    "intro": [
      "한 지역에 사는 생물들이 서로 어떻게 이어져 살아가는지 알아보자.",
      "The following describes how living things in one place are connected to each other."
    ],
    "inferences": [
      [
        "생산자가 없는 곳에서는 다른 생물이 쓸 양분의 공급이 처음부터 끊어지게 된다.",
        "In a place without producers, no new food is made for any other organisms to use."
      ],
      [
        "소비자가 사는 곳에서는 먹이가 되는 생물이 함께 있어야 소비자의 수가 유지된다.",
        "The number of consumers in a place holds up when other organisms remain there as food."
      ],
      [
        "분해자의 활동이 느려진 땅에서는 양분이 다시 쓰이기까지 오래 걸린다.",
        "In soil where decomposers work slowly, material takes longer to become usable again."
      ],
      [
        "먹이 그물을 보면 한 종이 여러 생물과 먹이 관계를 맺고 있음을 알 수 있다.",
        "A food web shows that a single species has feeding links with several other species."
      ],
      [
        "한 종의 수가 갑자기 변한 지역에서는 그와 연결된 종의 수도 함께 달라진다.",
        "Where one population changes sharply, the numbers of the species linked to it change as well."
      ],
      [
        "생물이 살아가려면 먹이와 물에 더해 지낼 공간까지 갖춰진 곳이 필요하다.",
        "Living things need a place that supplies space to stay as well as a supply of food and water."
      ],
      [
        "종의 수가 적은 생태계는 환경이 달라졌을 때 회복이 더 더디게 진행된다.",
        "An ecosystem with a small number of species recovers more slowly after its surroundings change."
      ],
      [
        "같은 지역에서 상위 포식자는 초식동물보다 적은 수로 유지되는 경우가 많다.",
        "In any given area, the top predators are kept to smaller numbers than the plant eaters are."
      ]
    ],
    "wrongApplications": [
      [
        "햇빛이 닿지 않는 곳에서도 흙이 있으면 풀은 스스로 양분을 만들 수 있다.",
        "Even out of the light, grass can make its own food as long as it has soil."
      ],
      [
        "사슴의 수가 늘어난 곳에서도 풀의 양은 그대로 유지될 수 있다.",
        "Where the number of deer increases, the amount of grass can stay the same."
      ],
      [
        "숲의 분해자가 사라지면 낙엽의 양분이 흙으로 더 빨리 간다.",
        "If decomposers vanish, leaf nutrients can reach the soil faster."
      ],
      [
        "먹이 사슬 한 줄을 그리면 그 생물의 먹이 그물이 정리된다.",
        "Drawing one food chain gives the whole food web of a species."
      ],
      [
        "곤충 한 종이 크게 줄어도 그 곤충을 먹던 새의 수는 그대로 유지된다.",
        "Even with far fewer insects, the birds that eat them keep their numbers."
      ],
      [
        "연못이 마른 자리에 먹이를 놓아 주면 생물은 예전처럼 지낼 수 있다.",
        "If food is left where a pond dried up, its organisms can live as they did before."
      ],
      [
        "여러 종이 사는 숲과 한 가지 나무를 심은 숲은 환경이 달라져도 비슷하게 견딘다.",
        "A forest of many species and a single-species planting endure change in similar ways."
      ],
      [
        "먹이가 늘어난 곳에서는 상위 포식자가 초식동물보다 많아질 수 있다.",
        "Where food increases, top predators can outnumber plant eaters."
      ]
    ],
    "wrongExtra": [
      [
        "생산자는 흙 속의 양분을 그대로 흡수해 몸을 이루므로 햇빛이 없어도 자란다.",
        "Producers take nutrients straight from the soil to build their bodies and grow without light."
      ],
      [
        "먹이 그물에서 이어진 두 종은 한쪽이 늘면 다른 쪽도 같은 수만큼 늘어난다.",
        "Two species linked in a food web increase by the same number when either one grows."
      ],
      [
        "생물 다양성이 높은 곳은 종 사이의 경쟁이 커져 환경 변화에 더 약해진다.",
        "High biodiversity makes a place weaker against change because competition among species grows."
      ]
    ]
  },
  "SCI-WEATHER-CLIMATE": {
    "intro": [
      "날씨와 기후는 언뜻 비슷해 보이지만, 어떻게 구분해서 읽어야 하는지 짚어 보자.",
      "The following explains how to tell weather and climate apart when reading records."
    ],
    "inferences": [
      [
        "같은 도시라도 오전과 오후의 대기 상태가 다르면 날씨는 다르게 기록된다.",
        "In one city, the weather differs between morning and afternoon if the air itself changes."
      ],
      [
        "올해의 기록 하나가 특이해도 여러 해 자료로 세운 그 지역 기후 설명은 유지된다.",
        "A single unusual year does not immediately change the way a region's climate is described."
      ],
      [
        "기후 변화의 방향은 하루하루의 기록보다 오랜 기간의 자료로 판단된다.",
        "The direction of climate change is judged from long records rather than from single days."
      ],
      [
        "기온만 적어 둔 관찰 기록으로는 그날의 날씨를 충분히 설명하지 못한다.",
        "An observation record listing temperature does not fully describe the weather of that day."
      ],
      [
        "두 지역의 기후를 비교한 결과는 자료를 모은 기간이 길수록 믿을 만해진다.",
        "A comparison of two regions' climates becomes more trustworthy as the collected record grows longer."
      ],
      [
        "위도가 비슷한 두 지역이라도 바다와의 거리가 다르면 기후는 서로 달라진다.",
        "Two regions at a similar latitude can still have different climates when their distance from the sea is not the same."
      ],
      [
        "예보가 빗나간 뒤에도 관측 자료와 모형을 이용한 예측은 계속 쓰일 수 있다.",
        "Even after a forecast turns out wrong, prediction based on observations and models remains a useful tool."
      ],
      [
        "평균 기온이 같은 두 지역에서도 대비해야 할 날씨의 종류는 서로 다를 수 있다.",
        "Two regions with equal average temperatures may still need to prepare for different kinds of weather events."
      ]
    ],
    "wrongApplications": [
      [
        "내일 우산이 필요한지 알려면 그 지역의 30년 평균 강수량을 봐야 한다.",
        "To decide whether an umbrella is needed tomorrow, the thirty-year average rainfall for the area should be checked."
      ],
      [
        "한 도시의 계절 특징은 지난 한 달 동안의 기록으로 충분히 설명된다.",
        "A city's seasonal pattern is fully described by the records of the past month."
      ],
      [
        "어제 하루 눈이 많이 내렸다면 올겨울 기후가 예년보다 추워졌다고 판단해야 한다.",
        "If heavy snow fell yesterday, the climate of this winter should be judged colder than in usual years."
      ],
      [
        "기온이 같은 두 날은 비와 바람을 보지 않아도 같은 날씨로 설명된다.",
        "Two days at the same temperature are the same weather without checking rain or wind."
      ],
      [
        "두 도시의 기후를 비교할 때에는 지난주에 모은 자료로도 결론을 낼 수 있다.",
        "When two cities' climates are compared, data from last week is enough to reach a conclusion."
      ],
      [
        "같은 산에 있으므로 산의 양쪽 지역에 내리는 비의 양도 서로 비슷하다고 확인한다.",
        "Two sides of one mountain can be taken to have similar rainfall since they share the mountain."
      ],
      [
        "예보는 처음 내용을 그대로 유지하고 새로 들어온 자료는 반영하지 않는다.",
        "A forecast should keep its original wording and ignore any new data that arrives."
      ],
      [
        "평균 기온이 같은 두 지역은 폭염 대비도 같은 수준으로 세운다.",
        "Two regions with the same average temperature can prepare for heat waves equally."
      ]
    ],
    "wrongExtra": [
      [
        "하루 안에 기온이 크게 변한 날은 그 지역 기후가 불안정해진 결과로 설명된다.",
        "A day with a large temperature swing is explained by the region's climate turning unstable."
      ],
      [
        "기후 자료는 관측 기간이 길어지면 그 지역의 기후 경향을 담지 못한다.",
        "Climate data cannot show a region's long-term pattern once the observation period grows long."
      ],
      [
        "산맥이 있는 지역의 강수량 차이는 산의 높이보다 도시의 크기에서 생긴다.",
        "Rainfall differences near a mountain range come from city size rather than the height of the peaks."
      ]
    ]
  },
  "SCI-ENERGY": {
    "intro": [
      "에너지가 어떤 형태로 바뀌고 어디로 옮겨 가는지 하나씩 짚어 보자.",
      "The following sets out how energy changes form and moves from one place to another."
    ],
    "inferences": [
      [
        "전구에 들어간 전기 에너지 일부는 빛이 아닌 다른 형태로 나온다.",
        "Part of the electrical energy entering a lamp leaves it in a form other than light."
      ],
      [
        "멈춰 있던 물체가 움직이기 시작하면 지닌 에너지의 형태가 달라진다.",
        "When an object that was at rest starts moving, the form of energy it carries has changed."
      ],
      [
        "같은 물체를 더 높은 선반으로 옮기면 그 물체의 위치 관련 에너지가 커진다.",
        "Moving the same object to a higher shelf increases the energy it has because of its position."
      ],
      [
        "배터리를 오래 쓴 기기에서는 처음보다 적은 양의 전기 에너지가 흘러나오게 된다.",
        "A device with a long-used battery receives a smaller amount of electrical energy than at first."
      ],
      [
        "장치가 하는 일이 줄었다고 해서 들어간 에너지가 없어졌다고 볼 수는 없다.",
        "Getting less useful work out of a device does not mean that the energy put into it has disappeared."
      ],
      [
        "미끄러지다 멈춘 물체가 지나온 바닥 자리는 온도가 조금 올라가 있게 된다.",
        "Where a sliding object comes to a stop, the surfaces that rubbed against each other are slightly warmer."
      ],
      [
        "흐린 날에 태양 전지에서 얻는 전기 에너지의 양은 맑은 날보다 적게 나타난다.",
        "The electrical energy obtained from a solar cell on a cloudy day is less than the amount on a clear day."
      ],
      [
        "효율이 낮은 기계는 같은 양의 일을 하는 데 더 많은 에너지를 넣어 주어야 한다.",
        "A machine with a lower efficiency needs more energy put into it to accomplish the same amount of work."
      ]
    ],
    "wrongApplications": [
      [
        "전구가 따뜻해지면 빛으로 바뀌는 비율도 커진다.",
        "A lamp that grows warmer turns a larger share into light."
      ],
      [
        "질량이 다른 두 공이 같은 속력으로 구르면 운동 에너지도 같아진다.",
        "Two balls of different mass moving at the same speed have equal energy of motion."
      ],
      [
        "높은 선반의 책과 바닥의 책은 무게가 같으면 위치 에너지도 같은 값이 된다.",
        "A shelved book and a floor book of equal weight have equal potential energy."
      ],
      [
        "손전등이 켜지지 않으면 배터리에 있던 에너지가 사라진 결과다.",
        "A flashlight that will not light shows its battery's energy vanishing."
      ],
      [
        "선풍기에서 나는 열은 선풍기가 쓰는 전기와 따로 생긴 것이라고 확인한다.",
        "Heat coming from a running fan can arise apart from the electricity that the fan uses."
      ],
      [
        "브레이크를 잡아 바퀴가 따뜻해지면 자전거의 운동 에너지도 함께 커진다.",
        "When braking warms the wheel, the bicycle's energy of motion grows as well."
      ],
      [
        "그늘에 둔 태양 전지도 밝은 곳에서와 같은 양의 전기를 만든다.",
        "A solar cell in the shade can make as much electricity as one in bright light."
      ],
      [
        "같은 일을 할 때 열이 더 나는 쪽이 에너지를 더 잘 쓰는 기계일 수 있다.",
        "A machine that gives off more heat can be a sign that the energy put in is being used well."
      ]
    ],
    "wrongExtra": [
      [
        "높은 곳에 있던 물체가 바닥에 닿는 순간 그 물체가 지녔던 에너지는 없어진다.",
        "The energy an object had while raised disappears at the moment it reaches the floor."
      ],
      [
        "배터리는 전기 에너지를 안에 담아 두었다가 필요할 때 그대로 내보내는 장치다.",
        "A battery is a device that holds electrical energy inside and sends that same energy out when needed."
      ],
      [
        "태양 전지는 빛의 밝기와 무관하게 정해진 양의 전기 에너지를 만들어 낸다.",
        "A solar cell produces a set amount of electrical energy regardless of how bright the light is."
      ]
    ]
  },
  "TECH-DIGITAL-SAFETY": {
    "intro": [
      "온라인에서 계정과 정보를 지키려면 무엇을 먼저 확인해야 하는지 짚어 보자.",
      "The points below outline what to check in order to protect accounts and information online."
    ],
    "inferences": [
      [
        "짧은 비밀번호를 오래 써 온 사람도 글자 수를 늘리면 추측에 대한 저항을 높일 수 있다.",
        "Someone who has used a short password can make it more resistant to guessing by adding characters."
      ],
      [
        "여러 서비스에 같은 비밀번호를 쓴다면 한 곳에서 생긴 사고가 나머지 계정의 위험도 키운다.",
        "If one password is shared across services, a single incident raises the risk to the remaining accounts."
      ],
      [
        "비밀번호가 이미 알려진 상황에서도 추가로 요구되는 확인 단계가 남아 있으면 침입을 막는 문턱은 유지된다.",
        "Even when a password is known, the extra verification step remains, so intrusion does not follow at once."
      ],
      [
        "링크를 누른 뒤에 보낸 사람을 확인하는 순서에서는 그 절차가 피해를 막는 힘을 잃게 된다.",
        "Checking the sender after the link has already been opened leaves the check unable to prevent the harm."
      ],
      [
        "업데이트를 오래 미룬 기기는 이미 공개되어 알려진 약점을 그대로 지닌 채 사용되는 셈이다.",
        "A device left without updates keeps operating with the weaknesses that have already been made public."
      ],
      [
        "글에 직접 쓰지 않았더라도 사진이나 설명에서 사는 곳이 드러나면 같은 종류의 위험이 생긴다.",
        "Even without writing it out, a photo or caption that reveals where someone lives creates the same kind of risk."
      ],
      [
        "백업을 원본과 같은 기기에 함께 두면 그 기기가 물에 젖거나 고장 났을 때 같이 잃게 된다.",
        "A backup kept on the same device as the original is lost along with it if that device gets wet or breaks."
      ],
      [
        "한 자료를 그대로 옮긴 여러 글에서는 글의 수가 늘어도 확인에 쓸 출처는 하나로 유지된다.",
        "Several posts copied word for word from a single source look like many sources but give little basis for confirmation."
      ]
    ],
    "wrongApplications": [
      [
        "짧고 익숙한 단어를 대문자로 바꾸면 길이를 늘린 비밀번호만큼 안전해질 수 있다.",
        "Capitalizing a short familiar word can make it about as safe as a much longer password."
      ],
      [
        "여러 사이트에 같은 비밀번호를 쓰고 아이디만 다르게 해 두었으므로 안전하다고 판단한다.",
        "Using one password with a different ID at each site keeps a breach from spreading."
      ],
      [
        "휴대전화를 잃어버린 뒤에는 다단계 인증을 꺼 두면 계정이 더 안전해질 수 있다.",
        "After losing a phone, switching multi-factor authentication off keeps the account safer."
      ],
      [
        "친구 이름으로 온 메시지라면 링크 주소를 따로 살피지 않고 눌러도 위험이 적다고 볼 수 있다.",
        "A link in a message that uses a friend's name can be opened without looking at its address."
      ],
      [
        "업데이트 알림이 자주 뜨면 기기가 최신이라는 뜻이므로 알림을 꺼 둔다.",
        "Frequent update notices mean a device is current, so they can be switched off."
      ],
      [
        "명찰이 작게 나오면 개인정보가 드러나지 않아 올려도 된다.",
        "A small-looking name tag reveals nothing, so the photo can be posted as is."
      ],
      [
        "파일을 같은 기기의 다른 폴더에 두면 기기가 고장 나도 복구된다.",
        "A copy in another folder on the same device allows recovery if it fails."
      ],
      [
        "같은 문장이 여러 블로그에 있으면 독립적인 출처가 많다고 볼 수 있다.",
        "The same sentence on several blogs can count as many independent sources."
      ]
    ],
    "wrongExtra": [
      [
        "다단계 인증을 켜 두면 비밀번호가 주기적으로 새로 만들어지므로 같은 비밀번호를 계속 써도 된다.",
        "Turning on multi-factor authentication regenerates the password periodically, so the same one can stay in use."
      ],
      [
        "앱 업데이트는 새 기능을 넣는 작업이므로 보안 문제는 기기를 바꿀 때 함께 해결하는 편이 낫다.",
        "An app update adds features, so security problems are better handled when the device itself is replaced."
      ],
      [
        "공개한 개인정보는 게시물을 지우면 이미 복사되어 퍼진 내용까지 되돌릴 수 있어 다시 안전해진다.",
        "Deleting a post can undo private details that were already copied and shared, making them safe again."
      ]
    ]
  },
  "SOC-DEMOCRATIC-DECISION": {
    "intro": [
      "여럿이 함께 결정을 내릴 때는 무엇을 놓치기 쉬운지 짚어 보자.",
      "The points below set out what to consider when a group makes a decision together."
    ],
    "inferences": [
      [
        "발언 순서가 일부에게 치우친 회의에서는 결정에 이르렀더라도 듣지 못한 의견이 남아 있다.",
        "A meeting where a few participants held most turns leaves views unheard even though it reached a decision."
      ],
      [
        "같은 결론을 말하는 두 의견이라도 근거의 출처가 다르면 확인해야 할 지점도 다르게 된다.",
        "Two views with the same conclusion need different points checked when their sources of evidence differ."
      ],
      [
        "표결에서 진 쪽의 요구라도 권리에 관한 것이라면 결과를 시행하기 전에 다시 살펴볼 이유가 된다.",
        "A losing side's demand about rights is a reason to re-examine the outcome before it is carried out."
      ],
      [
        "상대의 태도를 문제 삼는 발언이 늘어난 토론은 쟁점 자체에 쓰이는 시간을 줄이게 된다.",
        "A discussion filled with remarks about an opponent's manner and tone leaves less time for the issue itself."
      ],
      [
        "판단 기준을 밝히지 않은 채 결과만 알리면 나중에 그 결정을 두고 책임을 묻기가 어려워진다.",
        "Announcing the result without the criteria makes it harder to hold anyone answerable for that decision later."
      ],
      [
        "모두에게 같은 내용을 적용한 정책이라도 놓인 처지에 따라 사람마다 부담의 크기는 달라질 수 있다.",
        "A policy applied in the same way to everyone can still place unequal burdens on people in different situations."
      ],
      [
        "몇몇 사람에게 남은 이견이 있다는 사실만으로 그 안을 합의에 이르지 못한 것으로 볼 수는 없다.",
        "The fact that some disagreement remains among members does not by itself mean an option has failed to reach consensus."
      ],
      [
        "시행 뒤에 드러난 문제는 처음 결정이 잘못이었다는 뜻이기보다 규칙의 세부를 다시 손볼 근거가 된다.",
        "A problem that appears after implementation is less a sign of an initial error than a basis for revising the rule."
      ]
    ],
    "wrongApplications": [
      [
        "회의 시간을 줄이려고 반대 의견은 회의가 끝난 뒤 서면으로 받기로 한다.",
        "To save time, opposing views are collected in writing after the meeting."
      ],
      [
        "두 제안 가운데 발표 자료가 더 자세한 쪽을 근거가 튼튼한 제안으로 볼 수 있다.",
        "The proposal with more detailed slides counts as the better-supported one."
      ],
      [
        "표결에서 이긴 안이므로 소수 학생의 이동권 문제는 다음 학기로 미뤄도 된다.",
        "Since the proposal won the vote, a minority's access problem can wait a term."
      ],
      [
        "상대가 지난 회의에 늦었던 점은 이번 제안의 신뢰도를 낮추는 근거가 될 수 있다.",
        "An opponent's past lateness can serve as a reason that the new proposal is unreliable."
      ],
      [
        "결정 내용을 공지할 때 혼란을 줄이려고 고른 기준은 빼고 결과만 알리기로 정한다.",
        "The decision is announced, but the criteria behind the choice are left out to reduce confusion."
      ],
      [
        "통학로를 바꾸기 전 차량 이용 학생의 의견을 물으면 전체 영향을 알 수 있다.",
        "Surveying students who drive captures a route change's full impact."
      ],
      [
        "의견이 갈리자 양쪽이 모두 만족할 때까지 결정을 미루기로 한다.",
        "When views split, the group waits until both sides are satisfied."
      ],
      [
        "시행 뒤 문제가 확인되어도 이미 정한 규칙은 그대로 두는 편이 낫다.",
        "Even when results show a problem, a set rule is better left unchanged."
      ]
    ],
    "wrongExtra": [
      [
        "회의에서 발언 기회를 고르게 나누면 참여자 수가 늘어도 결정에 걸리는 시간은 비슷하게 유지된다.",
        "Sharing speaking turns evenly keeps the time a decision takes about the same even as participants increase."
      ],
      [
        "합의에 이른 안은 참여자들의 의견 차이가 정리된 결과이므로 이후에 다시 논의할 일이 적다.",
        "A consensus option has settled the differences among participants, so it rarely needs to be discussed again."
      ],
      [
        "이해관계가 다른 집단이 있을 때에는 영향을 가장 크게 받는 집단의 의견으로 전체 영향을 파악한다.",
        "When interests differ, the view of the most affected group can stand for a policy's overall impact."
      ]
    ]
  },
  "MATH-RATIO": {
    "intro": [
      "두 양을 비교할 때 쓸 수 있는 방법과 그때 놓치기 쉬운 점을 살펴보자.",
      "The points below describe ways of comparing two quantities and what to watch for."
    ],
    "inferences": [
      [
        "비를 말할 때에는 어느 쪽을 앞에 두었는지 밝혀야 뜻이 통한다.",
        "Stating a ratio means saying which quantity comes first for the meaning to be clear."
      ],
      [
        "6 대 9처럼 두 항이 모두 3배가 된 비도 2 대 3과 같은 관계를 나타낸다.",
        "A ratio such as 6 to 9, with both terms tripled, shows the same relationship as 2 to 3."
      ],
      [
        "단위율로 바꾸어 두면 전체 양이 서로 다른 두 경우도 곧바로 견줄 수 있다.",
        "Converting to unit rates lets two cases with different overall totals be compared directly."
      ],
      [
        "참가한 인원이 같아도 전체 학생 수가 늘어난 해에는 참가 비율이 낮아진다.",
        "With the same number of people taking part, a year with more students overall shows a lower share."
      ],
      [
        "한 양이 2배가 될 때 다른 양이 그대로 남는다면 두 양은 비례 관계가 아니다.",
        "If one quantity doubles while the other stays fixed at its earlier value, the two are not proportional."
      ],
      [
        "직선으로 그려졌더라도 그래프가 원점에서 떨어진 곳을 지나면 비례가 아닌 관계가 된다.",
        "Even a straight line on a graph is hard to treat as proportional when it does not pass through the origin."
      ],
      [
        "20%라는 표현을 보고 몇 명에 해당하는지 정하려면 전체 인원이 얼마인지 알아야 한다.",
        "A figure such as 20 percent does not name a number of people until the size of the whole is known."
      ],
      [
        "숫자가 더 큰 쪽이 더 빠르다고 말하려면 두 값의 단위가 같은지 먼저 살펴야 한다.",
        "Before calling the larger number the faster one, the two values being compared should share the same unit."
      ]
    ],
    "wrongApplications": [
      [
        "빨간 공 2개와 파란 공 5개를 비교하면 파랑 대 빨강의 비는 2 대 5다.",
        "With 2 red balls and 5 blue balls, the ratio of blue to red is 2 to 5."
      ],
      [
        "2 대 3의 두 항에 3을 더해도 같은 비인 5 대 6이 된다.",
        "Adding 3 to both terms of 2 to 3 gives an equal 5 to 6."
      ],
      [
        "180킬로미터를 3시간에 갔다면 한 시간당 거리는 540킬로미터다.",
        "Traveling 180 kilometers in 3 hours gives a unit rate of 540 kilometers per hour."
      ],
      [
        "두 학년의 참가자가 각각 12명이므로 두 학년의 참가 비율도 서로 같다.",
        "Both grades have 12 participants, so their participation rates are equal."
      ],
      [
        "재료를 3배로 늘리면서 물은 2배로 넣어도 조리법의 비는 유지된다.",
        "Tripling each ingredient while doubling the water keeps the recipe's ratios unchanged."
      ],
      [
        "출발할 때 이미 5킬로미터를 간 자료라도 그래프가 직선이면 원점을 지난다.",
        "A straight-line graph of a trip that starts 5 kilometers along still passes through the origin."
      ],
      [
        "학생 200명의 25%는 전체를 100으로 바꾸어 세면 25명이 된다.",
        "Twenty-five percent of 200 students means a group of 25 students."
      ],
      [
        "시속 6킬로미터와 분속 100미터 중 숫자가 작은 쪽이 느리다.",
        "Of 6 kilometers an hour and 100 meters a minute, the smaller is slower."
      ]
    ],
    "wrongExtra": [
      [
        "단위율은 두 양 가운데 큰 쪽을 1로 놓아 서로 다른 경우를 견줄 수 있게 한 값이다.",
        "A unit rate compares different cases by setting the larger of the two quantities to one."
      ],
      [
        "백분율로 나타낸 두 값이 같으면 두 집단에 해당하는 사람 수도 비슷하다고 볼 수 있다.",
        "When two percentages are equal, the numbers of people in the two groups are also similar."
      ],
      [
        "원점을 지나지 않는 직선 그래프도 일정하게 올라간다면 두 양의 비는 그대로 유지된다.",
        "A line graph that misses the origin keeps the ratio of the two quantities steady when it rises evenly."
      ]
    ]
  },
  "ART-LOOKING": {
    "intro": [
      "미술 작품을 앞에 두었을 때 무엇을 어떻게 살펴보면 좋을지 알아보자.",
      "The points below describe what a viewer can look at, and how, when facing an artwork."
    ],
    "inferences": [
      [
        "작품의 의미를 곧바로 정하면 화면에 있는 것을 놓친 채 이야기가 이어질 수 있다.",
        "Fixing a meaning at first sight can let the talk go on while what is actually shown is missed."
      ],
      [
        "같은 그림을 두고 나눈 설명이 달라도 색과 질감을 짚어 말하면 견주어 볼 수 있다.",
        "Two different accounts of one painting can still be compared when each points to color and texture."
      ],
      [
        "해석이 서로 달라도 각자가 화면에서 찾은 근거가 다르면 두 해석이 함께 성립할 수 있다.",
        "A difference between two readings is not by itself a sign that one viewer looked at the work wrongly."
      ],
      [
        "느낌만 길게 늘어놓은 감상문은 화면의 부분을 짚은 짧은 글보다 설득력이 약할 수 있다.",
        "A long response built out of feelings can be less persuasive than a short one pointing to parts of the picture."
      ],
      [
        "같은 표시라도 그것이 쓰이던 시대를 알고 나서 보면 다른 뜻으로 읽힐 수 있다.",
        "The same sign in a painting can be read as something else once a viewer knows the period in which it was used."
      ],
      [
        "작가의 설명을 들은 뒤에도 화면에서 새 근거를 찾으면 해석을 더할 여지가 남는다.",
        "Even after hearing the artist's own account, new evidence found in the work leaves room for another reading."
      ],
      [
        "같은 형상을 돌이나 천 같은 다른 재료로 다시 만들면 관람자가 받는 인상도 달라질 수 있다.",
        "Remaking the same form in a different material such as stone or fabric can change the impression a viewer receives."
      ],
      [
        "‘무섭다’는 말과 ‘어둡게 칠했다’는 말은 감상문을 적을 때 서로 다른 자리에 놓인다.",
        "Saying a work is frightening and saying it is painted in dark colors occupy different places in a written response."
      ]
    ],
    "wrongApplications": [
      [
        "그림에 파란색 곡선이 반복된다는 말은 관찰보다 해석에 가깝다.",
        "Saying that blue curves repeat in a painting is closer to interpretation than to observation."
      ],
      [
        "작품에서 느낀 긴장감을 말하면서 그 근거로 색이 어둡다는 점만 언급하고 선과 형태는 살피지 않아도 충분하다고 본다.",
        "Citing only the picture's dark color as evidence for a reading of tension is treated as enough, without also checking its line and shape."
      ],
      [
        "두 해석이 다르면 작품을 더 오래 본 사람의 해석을 맞는 것으로 볼 수 있다.",
        "When two readings differ, the one from the viewer who looked longer can be taken as correct."
      ],
      [
        "‘불안해 보인다’고 해석했다면, 그 이유를 그림의 색이나 선이 아니라 관람자 자신의 최근 경험에서 찾아 설명한다.",
        "Having read the picture as anxious, a viewer explains that reading by pointing to their own recent experience rather than to anything in the picture."
      ],
      [
        "그림의 시대를 알게 되자 화면에 반복되는 표시는 넘기고 시대 설명으로 해석을 정한다.",
        "Knowing a painting's period, a viewer skips its repeated signs and writes about the era."
      ],
      [
        "작가가 밝힌 뜻과 다른 근거를 찾은 관람자는 자신의 해석을 접고 작가의 설명을 따른다.",
        "A viewer who finds evidence for another reading drops it and follows the artist's statement."
      ],
      [
        "같은 형상이라면 돌로 만들든 천으로 만들든 무게감은 같게 느껴진다고 정리한다.",
        "The same form feels equally heavy in stone and in fabric."
      ],
      [
        "‘화면 중앙에 인물이 있다’와 ‘외로워 보인다’는 같은 종류의 관찰이다.",
        "‘A figure is centered’ and ‘the figure seems lonely’ are the same kind of observation."
      ]
    ],
    "wrongExtra": [
      [
        "관찰한 내용을 자세히 적을수록 개인의 느낌은 감상에서 따로 다루지 않아도 되는 부분이 된다.",
        "The more closely observations are written down, the less a personal reaction needs a place in the discussion."
      ],
      [
        "작품이 만들어진 시대를 알면 화면에서 근거를 찾는 일보다 시대 설명이 해석의 출발점이 된다.",
        "Knowing when a work was made makes historical explanation, not evidence in the picture, the starting point."
      ],
      [
        "재료가 같은 두 작품은 제작 방법이 달라도 관람자에게 비슷한 느낌을 전하게 된다.",
        "Two works made of the same material give viewers a similar impression even when the techniques differ."
      ]
    ]
  },
  "KO-MEDIA-EVIDENCE": {
    "intro": "정보를 믿을지 정하기 전에 무엇을 확인해야 하는지 살펴보자.",
    "inferences": [
      "내용이 그럴듯해도 누가 어떤 근거로 썼는지 모르면 판단을 미루는 편이 낫다.",
      "같은 사건을 다룬 두 글의 인상이 다르다면 고른 자료가 서로 달랐을 가능성이 있다.",
      "날짜가 적히지 않은 자료에서는 지금도 통하는 내용인지 가릴 단서가 하나 줄어든다.",
      "한 문단에 자료와 해석이 함께 있으면 둘을 나눈 뒤에 각각의 무게를 따로 정해야 한다.",
      "여러 곳에서 같은 내용을 보았어도 한 자료를 옮긴 것이면 확인한 출처는 하나로 유지된다.",
      "그림 자료가 준 인상이 강할수록 촬영 범위와 그래프 축의 간격을 다시 살펴야 한다.",
      "직함이 붙은 사람의 말도 그 사람이 연구해 온 분야가 발언 내용과 맞는지 따져 봐야 한다.",
      "결론이 아직 확실하지 않다는 점을 함께 알리면 읽는 사람의 잘못된 이해를 미리 줄이게 된다."
    ],
    "wrongApplications": [
      "건강 정보의 설명이 자세해서 작성 기관은 찾아보지 않고 정리한다.",
      "경기의 일부 장면만 담은 영상으로 전체 흐름을 짐작해 비교한다.",
      "여행 안내문에 적힌 게시 날짜가 최근으로 보여서, 실제 운행 시간과는 대조하지 않고 안내문 내용을 그대로 따른다.",
      "기사에 조사 수치가 인용되어 있어 기자의 해설도 결과로 표시한다.",
      "같은 문장을 실은 사이트가 많아서 확인된 자료로 보고 쓴다.",
      "막대 사이의 차이가 커 보여 세로축은 살피지 않고 길이만으로 판단한다.",
      "식품 조언을 한 사람이 '박사'라는 호칭으로 소개되어, 그 호칭만으로 식품 분야를 연구해 온 사람이라고 본다.",
      "초기 조사 결과가 뚜렷해서 표본이 작다는 점은 빼고 결론만 정리해 알린다."
    ],
    "wrongExtra": []
  },
  "KO-RULES-EXCEPTIONS": {
    "intro": "규칙을 지키고 고칠 때 무엇을 살펴야 하는지 하나씩 짚어 보자.",
    "inferences": [
      "규칙이 무엇을 말하는지 알려지지 않은 곳에서는 서로의 행동을 예상하기 어려워진다.",
      "규칙의 문장만 외운 사람은 처음 겪는 상황에서 무엇을 지켜야 할지를 놓칠 수 있다.",
      "자기 사정만 내세운 예외 요청은 같은 처지에 놓인 다른 사람에게 설명하기 어려운 요구다.",
      "어느 쪽이 더 편한지만 따져 결론을 내리면 상대가 겪게 될 불편이 판단에서 빠지게 된다.",
      "모두에게 같은 기준을 적용했다는 사실만으로 그 결정이 공정한 것이었다고 말하기는 어려운 일이다.",
      "새 규칙이 눈앞의 문제를 줄였더라도 그 과정에서 어떤 불편이 생겨났는지 함께 살펴야 한다.",
      "다른 곳에서 잘 통한 방법이라도 조건이 다르면 여기서 같은 결과로 이어지지 않을 수도 있다.",
      "결론만 발표하고 그 근거를 밝히지 않으면 결정을 다시 살펴볼 통로가 그만큼 좁아지게 된다."
    ],
    "wrongApplications": [
      "도서관에 통화 금지 규칙이 있다는 것만으로, 다른 도서관에도 같은 규칙이 있을 것이라 여기고 따로 확인하지 않는다.",
      "대피 상황에서는 출입 금지문의 목적이 평소의 안전 관리에 있다고 보고, 그 목적은 평소에만 해당하므로 지금은 참고하지 않아도 된다고 판단한다.",
      "과제 기한의 예외를 자신이 그동안 바빴다는 사정만 이유로 들어 그대로 요청한다.",
      "사진 촬영의 자유가 먼저라고 보고 찍히는 사람의 불편은 빼고 사진을 게시한다.",
      "같은 시간 안에 계단을 오르는 조건을 모두에게 똑같이 적용했으니 공정하다고 본다.",
      "교실 소음을 줄이는 규칙을 만들며 발표 활동이 줄어들 가능성은 뒤로 미룬다.",
      "예외가 한 번 인정된 사례를 근거로 조건이 다른 요청도 그대로 받아들인다.",
      "학급 투표에서 나온 결론만 알리고, 그 근거와 다시 논의할 시점은 밝히지 않는다."
    ],
    "wrongExtra": []
  },
  "EN-ATTENTION-NOTIFICATIONS": {
    "intro": "A phone that buzzes every few minutes is doing something to your focus, and this passage looks at what that is.",
    "inferences": [
      "Adding a second demand to a focused task lowers the depth given to each.",
      "The cost of an alert is not well described by the seconds spent reading it.",
      "The time lost to a message extends past the moment the message is dealt with.",
      "A person may open an alert out of habit even when its content turns out to be minor.",
      "Fewer incoming alerts leave a person with more control over when work is set aside.",
      "Waiting to read messages at a set time is different from refusing to read them at all.",
      "An interruption during a demanding problem costs more than the same pause during routine work.",
      "Judging attention during a task involves the timing of tool use rather than the tool itself."
    ],
    "wrongApplications": [
      "A student opens several unrelated tabs so that each one receives the same careful attention.",
      "A writer treats a message read in three seconds as costing the work three seconds.",
      "After an alert, a reader resumes at the next line and expects the earlier argument to return.",
      "A phone user counts frequent checking as proof that the incoming alerts were worth opening.",
      "A student leaves promotional alerts on so that urgent family calls are not delayed.",
      "A group sets a shared checking time and answers every message in it with the same urgency.",
      "A learner allows interruptions during a proof, expecting its many steps to serve as reminders.",
      "A designer removes digital tools from the whole workday to keep serious work offline."
    ],
    "wrongExtra": []
  },
  "EN-URBAN-TREES": {
    "intro": "City blocks do not all heat up the same way, and trees are a big part of why.",
    "inferences": [
      "A surface's color helps explain why one part of a street feels warmer.",
      "Shade lowers heat by acting before sunlight is absorbed rather than after.",
      "Air near leaves can lose heat even when no breeze moves along the street.",
      "Two trees of the same age can differ in the amount of cooling they provide.",
      "A newly planted street will not deliver its full cooling benefit for some years.",
      "Tree placement changes how much of a city's shade is actually used by residents.",
      "A planting program can add ongoing expenses that appear after the trees are in the ground.",
      "Trees form one part of a city's wider heat plan rather than a complete answer to summer heat."
    ],
    "wrongApplications": [
      "A visitor picks a bench on dark pavement because that surface traps its heat underneath.",
      "A city waits until a street heats up before expecting its new canopy to help.",
      "A gardener expects air near watered leaves to warm as the water evaporates.",
      "Planners record each tree's height and expect equal cooling from trees of equal height.",
      "A neighborhood removes its old trees on the day when the new saplings arrive.",
      "A city counts its newly planted trees and stops checking where the shade falls.",
      "A planting plan picks the fastest-growing species and leaves root space out of the budget.",
      "A school plants a row of trees and drops its plans for water and covered seating."
    ],
    "wrongExtra": []
  },
  "KO-COMPARISON-STANDARDS": {
    "intro": "두 가지를 견주어 볼 때 무엇을 먼저 정해야 하는지 짚어 보자.",
    "inferences": [
      "기준을 밝히지 않은 비교는 읽는 사람마다 다른 결론으로 이어질 수 있다.",
      "인원이 많은 학교에서 사례 수가 크게 나온 것은 특별한 결과가 아니다.",
      "측정한 날이 다른 두 값의 차이에는 대상의 변화와 시기의 영향이 섞여 있다.",
      "평균만 나와 있는 표에서는 값이 어느 한쪽에 몰려 있는지까지 알 수 없다.",
      "한 가지 기준으로 앞선 쪽을 고르면 다른 면에서 더 큰 차이를 놓칠 수 있다.",
      "측정 조건이 서로 달랐다면 대상의 차이와 조건의 차이가 결과에 함께 섞여 있다.",
      "성공한 사례 하나는 그런 일이 실제로 일어날 수 있다는 점을 알려 주는 자료이다.",
      "한계를 함께 밝힌 비교는 그 결론을 어디까지 믿어도 될지를 읽는 사람에게 알려 준다."
    ],
    "wrongApplications": [
      "두 이동 수단을 견줄 때 기준을 세우기 전에 눈에 띄는 차이부터 살핀다.",
      "학생 수가 다른 두 학교의 결석을 그해에 발생한 건수 그대로 비교한다.",
      "여름과 겨울의 전력량 차이를 계절과 무관한 습관 변화로 정리한다.",
      "두 반의 평균 점수가 같으므로 최고점과 최저점의 분포도 비슷하다고 본다.",
      "값이 싼 쪽을 두고 수명과 수리 가능성까지 나은 편이라고 본다.",
      "두 식물의 키만 재고서 빛과 물의 조건이 달랐던 점은 빼고 비교한다.",
      "한 사람의 성공 사례가 뚜렷해서 그것을 학습자 전체의 경향으로 정리한다.",
      "조사 지역이 좁았다는 점은 밝히지 않고 결론을 전국의 경향으로 넓혀 쓴다."
    ],
    "wrongExtra": []
  },
  "KO-CAUSE-ALTERNATIVES": {
    "intro": "어떤 일의 원인을 찾을 때 무엇을 함께 따져야 하는지 살펴보자.",
    "inferences": [
      "두 값이 나란히 오르내린 자료는 아직 원인을 정하기 전 단계에 있다.",
      "두 현상이 함께 움직였다면 둘에 같이 작용한 다른 요인이 있는지 찾아보아야 한다.",
      "결과가 나타난 뒤에 시작된 변화라면 그 결과의 원인 후보에서 빠지게 된다.",
      "조건이 제각각인 대상끼리 견주면 나타난 차이가 어디에서 왔는지 가려내기 힘들다.",
      "원인을 하나만 들어 마무리한 설명은 함께 작용한 다른 원인을 빠뜨렸을 수 있다.",
      "한 곳에서 확인한 효과의 크기를 조건이 다른 곳에 그대로 옮겨 쓰기는 어려운 일이다.",
      "설명에 맞지 않는 사례가 나오면 그 설명이 통하는 범위를 좁혀 볼 필요가 새로 생긴다.",
      "같은 결과가 여러 번 되풀이되고 다른 설명이 밀려날수록 그 원인 주장은 더 튼튼해진다."
    ],
    "wrongApplications": [
      "운동량과 성적이 함께 늘어난 자료에서 운동이 성적을 올렸다고 정리한다.",
      "우산 판매와 교통 체증이 함께 늘었으므로 우산이 늘어 길이 막혔다고 본다.",
      "성장이 빨라진 다음에 화분을 옮겼는데 이동 덕분에 자란 것으로 판단한다.",
      "비교할 화분의 수가 많으므로 빛과 물의 양이 달라도 효과를 비교한다.",
      "집중력이 달라진 이유로 수면만 남기고 소음과 식사 시간은 목록에서 뺀다.",
      "같은 양의 비가 내렸으니 흙과 경사가 달라도 침수 정도가 비슷하다고 본다.",
      "약을 먹고도 회복이 느린 사례를 드문 일로 여기고 조건은 살피지 않는다.",
      "한 학급에서 같은 결과가 나왔으니 다른 설명은 더 살피지 않고 마무리한다."
    ],
    "wrongExtra": []
  },
  "EN-RETRIEVAL-PRACTICE": {
    "intro": "Not all study methods leave the same trace in memory, and this passage looks at why.",
    "inferences": [
      "A smooth feeling while rereading is weak evidence about what is remembered.",
      "Keeping the answer in view during review removes the work retrieval requires.",
      "Struggling to recall something can still leave the learner better off afterward.",
      "An unchecked recall leaves a mistaken answer free to settle into later memory.",
      "The same amount of study time is worth more when it is spread across several days.",
      "Repeating one type of problem can hide whether a learner knows which method fits.",
      "A blank spot in a recalled answer tells the learner which part of the topic to study next.",
      "One corrected attempt is not the full cycle of spaced practice that review should include."
    ],
    "wrongApplications": [
      "A student rereads the page twice, and the familiar feeling confirms that it is learned.",
      "A learner reads the answer key first and then recalls the three causes from it.",
      "A student drops a concept that felt hard to recall and reviews easier ones instead.",
      "A student skips the model answer because the recalled response came from memory.",
      "A learner studies the whole vocabulary list in one long evening to keep it fresh.",
      "A worksheet groups identical equations, so students rarely have to choose which method fits.",
      "A student ignores the missing step in an explanation and rereads the finished notes.",
      "A student recalls, checks feedback, and moves on because the idea now feels clear."
    ],
    "wrongExtra": []
  },
  "EN-ANIMAL-SIGNALS": {
    "intro": "An animal's signal only matters once another animal responds to it, and that exchange is what this passage traces.",
    "inferences": [
      "Part of a signal's effect appears in what the receiver does next.",
      "An observer who records sound alone may miss a visible part of a message.",
      "The value of a signal depends on the conditions between sender and receiver.",
      "Reaching a distant partner and staying hidden pull in different directions.",
      "Cost is one reason a receiver can trust what a display shows about the sender's condition.",
      "Reading a signal without noticing the surrounding situation can lead to a mistake.",
      "Treating a doubtful signal like a dependable one can carry a cost for the receiver.",
      "A change on the receiver's side over many generations can reshape which signals continue to develop."
    ],
    "wrongApplications": [
      "A bird hears an alarm call, keeps feeding, and is counted as responding.",
      "A lizard must finish its movement before any color display begins.",
      "A quiet signal is expected to carry better beside a loud, rushing stream.",
      "A far-carrying mating call is treated as safe because predators are assumed to be too far away to hear it.",
      "A weak animal's frequent display is taken as evidence of good condition.",
      "The same movement is recorded as a warning in the next setting without checking.",
      "An animal reacts in the same way to dependable callers and to uncertain callers.",
      "A study tracks signaler changes across generations and treats receiver behavior as fixed."
    ],
    "wrongExtra": []
  },
  "KO-HIDDEN-ASSUMPTIONS": {
    "intro": "주장을 평가하는 과정에서 전제라는 요소를 어떻게 다루는지 살펴보자.",
    "inferences": [
      "글의 문장을 다 읽어도 주장의 바탕이 드러나지 않을 수 있다.",
      "근거와 결론이 각각 옳아 보여도 둘을 잇는 곳이 비면 주장은 흔들린다.",
      "같은 자료에서 다른 결론이 나왔다면 두 사람의 전제가 달랐을 수 있다.",
      "근거에서 빠진 조건을 찾는 일이 곧 숨은 전제를 드러내는 과정이 된다.",
      "자료의 정확성을 검토하는 것으로는 결론의 신뢰도를 충분히 판단하지 못한다.",
      "무엇이 더 낫다는 결론의 차이는 사실 확인이 아니라 전제의 차이에서 생긴다.",
      "전제가 통하지 않는 상황을 찾아보면 주장의 범위를 좁혀 말할 수 있다.",
      "근거 목록을 길게 늘어놓는 평가로는 그 주장의 약한 부분을 놓치기 쉽다."
    ],
    "wrongApplications": [
      "공원을 넓히자는 주장에 빠진 생각도 글에 쓰여 있다고 보고 그 문장들만 차례로 살핀다.",
      "자료와 결론이 타당하므로 둘 사이의 연결도 문제없다고 본다.",
      "같은 판매 자료에서 서로 다른 결론이 나오자 한쪽이 자료를 잘못 읽은 것이라고 판단한다.",
      "결론에 필요한 조건을 글에 이미 적힌 문장 가운데에서 골라 확인한다.",
      "이용자 수 자료가 정확한 것을 확인하고 그 주장의 결론도 믿을 만하다고 본다.",
      "가장 싼 선택이 좋다는 주장에서 값을 더한 계산이 맞는지 확인하고 마무리한다.",
      "도시에서 통한 교통 주장이 농촌에 맞지 않자 특수한 사례로 떼어 둔다.",
      "정책 주장을 평가하면서 제시된 통계 자료의 출처와 개수를 세어 판단한다."
    ],
    "wrongExtra": []
  },
  "KO-MAIN-RELEVANCE": {
    "intro": "긴 글에서 무엇을 남기고 무엇을 줄일지, 그 판단 방법을 살펴보자.",
    "inferences": [
      "한 문장을 따로 옮겨 적으면 글 전체를 아우르는 중심 생각은 빠지게 된다.",
      "기억에 남는 이야기라도 글의 중심과 멀면 요약에서 빠질 수 있다.",
      "낱말이 겹치지 않는 문장들도 하나의 관계를 함께 설명하고 있을 수 있다.",
      "인상 깊은 예시를 그대로 옮긴 요약은 원문의 주제보다 좁은 내용을 담게 된다.",
      "원인과 결과를 각각 적어 두어도 둘을 잇는 설명이 빠지면 요약이 부족해진다.",
      "한쪽 대상을 자세히 소개한 요약은 서로 대조하는 글의 짜임을 살리지 못한다.",
      "어떤 정보를 지웠을 때 결론이 달라지는지 따져 보면 남길 내용을 정할 수 있다.",
      "원문에 없던 조언을 덧붙인 요약은 글쓴이가 한 말과 다른 내용을 전하게 된다."
    ],
    "wrongApplications": [
      "각 문단에서 가장 긴 문장을 뽑아 그대로 이어 붙인다.",
      "재미있는 일화가 인상 깊게 남았으므로 요약의 첫 문장으로 적어 둔다.",
      "여러 문장에 겹치는 낱말이 적으므로 서로 다른 내용이라고 본다.",
      "여러 동물 사례 가운데 가장 자세히 나온 하나를 글의 주제로 정한다.",
      "비와 식물 성장을 다룬 글에서 가장 자세히 설명된 강수량을 골라 요약한다.",
      "두 재료를 비교한 글에서 글쓴이가 좋게 소개한 쪽의 특징을 골라 정리한다.",
      "장소와 사람 이름을 빼도 결론이 유지되므로 이름을 요약에 남긴다.",
      "일부 지역의 조사 결과를 요약하면서 전국에 맞는 결론까지 함께 정한다."
    ],
    "wrongExtra": []
  },
  "EN-MODELS-PREDICTIONS": {
    "intro": "A model always leaves details out on purpose. This passage looks at what stays in, what gets dropped, and how the predictions get checked.",
    "inferences": [
      "Leaving some detail out of a model can be a deliberate choice, not a flaw.",
      "Some loss of detail is the price of seeing a broad relationship clearly.",
      "A poor prediction may come from the data rather than the model itself.",
      "A model stays untested until its prediction meets an actual observation.",
      "A wrong result is worth examining closely rather than simply discarding.",
      "Past success gives little information about behavior outside the tested range.",
      "Asking which model is better makes sense once the purpose of the work is stated.",
      "A complicated model still needs a record of successful tests standing behind it."
    ],
    "wrongApplications": [
      "A map is redrawn with every small object so that travelers can trust it.",
      "A climate model keeps every detail intact so large patterns stay visible.",
      "A weather prediction is left unchanged after new temperature data arrive.",
      "Researchers adjust the measured river height to match the predicted height.",
      "An unexpected result leads researchers to leave the soil assumption alone.",
      "A growth model tested on young trees is applied confidently to old forests.",
      "A city drops its pollution model because the travel model performs better.",
      "A model earns confidence after more features are added to its equations."
    ],
    "wrongExtra": []
  },
  "EN-FEEDBACK-SYSTEMS": {
    "intro": "Sometimes a system's own output shapes what happens next without anyone noticing, and that hidden loop is what this passage traces.",
    "inferences": [
      "A process whose result does not return to the system is not feedback.",
      "Balancing feedback tends to keep a system within a range rather than drifting.",
      "A small starting difference can end up large without any new outside push.",
      "A response arriving late may fit an earlier situation that no longer exists.",
      "Judging a feedback process needs attention to where in the system it is operating.",
      "A single observation can miss a pattern that appears across several later steps.",
      "A change that looks local may later show up somewhere far from where it started.",
      "Following a chain in a single direction leaves the loop only partly described."
    ],
    "wrongApplications": [
      "A thermostat sends warm air into the room and its work ends right there.",
      "Sweating returns body temperature to the exact point where it began.",
      "Ice melt continues because a new outside source of heat arrives with each summer.",
      "A heater's older sensor reading holds the whole room at its earlier temperature.",
      "Rapid sharing spreads an emergency message, so spreading rumors is beneficial too.",
      "One look at falling supply is taken as the whole pattern behind the price change.",
      "Removing one predator changes the nearby prey while plants stay unaffected.",
      "A student traces demand to price and stops once the price change is explained."
    ],
    "wrongExtra": []
  }
};
