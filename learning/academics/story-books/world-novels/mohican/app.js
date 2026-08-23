const BOOK_TITLE = "모히컨 족의 최후";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "이 이야기를 읽기 전에",
        emoji: "🗺️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `이 이야기는 이백칠십 년쯤 전 북아메리카에서 벌어진 전쟁을 배경으로 합니다.`,
            `영국과 프랑스가 그 땅을 놓고 싸운 전쟁이었습니다. 그런데 그 땅은 원래 두 나라 것이 아니었습니다.`,
            `수천 년 전부터 그곳에 살던 사람들이 있었습니다. 모히컨, 델라웨어, 휴런, 이로쿼이, 모호크······ 부족이 아주 많았습니다.`,
            `저마다 말이 달랐고, 살아온 방식이 달랐고, 이웃과 사이가 좋기도 하고 나쁘기도 했습니다. 이것부터 짚어 두어야 합니다. '인디언'이라는 말은 그 사람들이 스스로 쓰던 말이 아닙니다.`,
            `콜럼버스가 그 땅을 인도인 줄 알고 그렇게 불렀고, 그 말이 그대로 굳었습니다. 그 사람들에게는 저마다 자기 이름이 있었습니다.`,
            `그러니 이 책에서는 될 수 있으면 부족 이름으로 부르겠습니다.`,
            `유럽 사람들이 배를 타고 오면서 그 땅이 뒤집혔습니다. 유럽에서 온 병이 먼저 퍼졌습니다. 천연두 같은 병이었습니다.`,
            `그 병에 대한 저항력이 그 땅 사람들에게는 없었습니다. 어떤 지방에서는 열에 아홉이 세상을 떠났습니다. 싸움이 나기도 전에 그렇게 되었습니다.`,
            `그다음에 땅을 빼앗겼습니다. 그리고 영국과 프랑스가 싸울 때, 각 부족은 어느 한쪽 편에 서야 했습니다. 어느 쪽에도 안 서는 것이 제일 위험했기 때문입니다. 그래서 그 땅 사람들끼리 서로 싸우게 되었습니다.`,
            `그것이 이 이야기의 배경입니다. 이 책을 쓴 사람은 제임스 페니모어 쿠퍼라는 미국 사람입니다.`,
            `백구십 년쯤 전에 썼습니다. 그런데 이 책에는 문제가 있습니다.`,
            `쿠퍼는 그 땅 사람들을 두 가지로만 그렸습니다. 한쪽은 아주 고결한 사람으로, 다른 쪽은 아주 사나운 사람으로요. 그리고 백인 편에 선 부족은 좋게, 프랑스 편에 선 부족은 나쁘게 그렸습니다.`,
            `실제로는 그렇지 않았습니다. 양쪽 다 살아남으려고 어느 편엔가 선 것이었습니다. 그리고 제목도 사실과 다릅니다.`,
            `모히컨 사람들은 그때 사라지지 않았습니다. 수가 크게 줄었지만 살아남았고, 지금도 미국 위스콘신주에 그 후손들이 마을을 이루고 삽니다. 그러니까 '최후'라는 제목은 그 시절 백인들이 그렇게 믿고 싶어 했던 것이지 사실이 아닙니다.`,
            `이 책에서는 그 점을 밝혀 두고 이야기를 시작하겠습니다.`,
            `옛날 책을 읽을 때는 두 가지를 같이 해야 합니다. 하나는 그 이야기를 재미있게 읽는 것입니다.`,
            `다른 하나는 그 이야기가 어느 자리에서 쓰인 것인지를 아는 것입니다. 둘 가운데 하나만 하면 반쪽입니다.`,
            `이 책은 그 두 가지를 함께 하려고 합니다.`
        ]
    },
    {
        num: 2,
        title: "숲으로 들어간 일행",
        emoji: "🌲",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `천칠백오십칠 년 여름이었습니다. 지금의 뉴욕주 북쪽 숲이었습니다. 그 숲 한가운데에 윌리엄 헨리라는 영국군 요새가 있었습니다.`,
            `그 요새의 사령관은 먼로 대령이었습니다. 먼로 대령에게 딸이 둘 있었습니다. 언니 코라와 동생 앨리스였습니다.`,
            `두 사람은 남쪽 에드워드 요새에 있다가, 아버지가 있는 곳으로 가는 길이었습니다. 일행은 여섯이었습니다.`,
            `코라와 앨리스, 두 사람을 데려다주는 던컨 헤이워드라는 젊은 소령, 노래 선생 데이비드 가무트, 그리고 길잡이였습니다. 길잡이의 이름은 마과였습니다. 휴런 부족 사람이라고 했는데, 영국군에서 일하고 있었습니다.`,
            `일행은 큰길로 가지 않고 숲길로 갔습니다. 마과가 그쪽이 빠르다고 했기 때문입니다.`,
            `그 무렵 그 숲은 사람이 다니기 아주 어려운 곳이었습니다. 나무가 빽빽해서 한낮에도 어두웠고, 길이라고 할 만한 것이 거의 없었습니다. 길을 아는 사람 없이 들어가면 나오지 못했습니다. 그래서 길잡이가 반드시 필요했습니다.`,
            `그런데 한나절이 지나자 헤이워드는 이상하다고 느꼈습니다. 길이 자꾸 깊어졌기 때문입니다. 저녁 무렵 일행은 사람 셋을 만났습니다.`,
            `한 사람은 백인이었습니다. 사슴 가죽옷을 입고 긴 총을 들고 있었습니다. 이름은 내티 범포라고 했는데, 사람들은 매의 눈이라고 불렀습니다.`,
            `숲에서 나고 자란 사람이었습니다. 그 옆에 두 사람이 있었습니다. 늙은 사람과 젊은 사람이었습니다.`,
            `늙은 사람은 칭가치국, 젊은 사람은 그 아들 웅카스였습니다. 두 사람은 모히컨 사람이었습니다. 매의 눈은 백인이었지만 백인 마을에서 살지 않았습니다.`,
            `어릴 때부터 숲에서 지냈고, 델라웨어 사람들에게 사냥을 배웠습니다. 그래서 두 세계를 다 알았습니다. 그런데 어느 쪽에도 온전히 속하지 못했습니다.`,
            `이 소설에서 매의 눈이 자기가 '피가 섞이지 않은 백인'이라고 여러 번 말하는 대목이 나오는데, 그것은 그 사람이 늘 자기 자리를 확인해야 했다는 뜻이기도 합니다.`,
            `헤이워드가 길을 물었습니다. 그리고 마과의 이야기를 했습니다.`,
            `매의 눈이 그 말을 듣고 얼굴빛이 달라졌습니다.`,
            `"그 사람이 지금 어디 있소?"<br>"저기 나무 아래에 있습니다."<br>매의 눈이 아주 낮은 소리로 말했습니다.<br>"저 사람은 당신들을 엉뚱한 데로 데려가고 있소."`
        ]
    },
    {
        num: 3,
        title: "마과",
        emoji: "🔥",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `마과는 그 자리에서 달아났습니다. 매의 눈이 그 뒤를 쫓았지만 놓쳤습니다.`,
            `그날 밤 매의 눈이 헤이워드에게 마과 이야기를 했습니다. 마과는 원래 휴런 부족 사람이었습니다. 그런데 몇 해 전에 부족에서 쫓겨났습니다. 그리고 모호크 부족에게 갔다가 다시 영국군에서 일하게 되었습니다.`,
            `그 사이에 이런 일이 있었습니다. 마과가 영국군 진영에서 술에 취해 소란을 피운 적이 있었습니다.`,
            `그때 사령관이 마과를 병사들 앞에서 채찍으로 때리게 했습니다. 그 사령관이 먼로 대령이었습니다.`,
            `여기서 짚어 둘 것이 있습니다.`,
            `원작에서 마과는 그저 못된 사람으로 나옵니다. 그런데 그 사람이 왜 그렇게 되었는지를 원작도 이 대목에서 밝혀 놓았습니다.`,
            `사람들 앞에서 매를 맞은 뒤로 마과는 달라졌습니다.`,
            `그 시절 그 땅의 부족들에게 사람들 앞에서 매를 맞는 것은 목숨을 잃는 것보다 무거운 일이었습니다. 그 사람들에게 벌은 부끄러움을 주는 것이 아니었습니다. 잘못을 하면 값을 물게 하거나 무리에서 내보냈습니다.`,
            `그런데 사람을 묶어 놓고 여럿이 보는 앞에서 때리는 것은 그 사람을 사람으로 안 본다는 뜻이었습니다. 먼로 대령은 그것을 몰랐습니다. 그리고 알아보려고 하지도 않았습니다.`,
            `마과는 그것을 잊지 않았습니다. 그리고 먼로 대령의 딸들을 노린 것이었습니다.`,
            `이 이야기에서 마과가 하는 일은 잔인합니다. 그것을 좋게 볼 수는 없습니다. 다만 이 이야기를 읽을 때, 그 사람 하나만 나쁜 사람이었던 것으로 읽으면 이 책을 잘못 읽는 것입니다.`,
            `그날 밤 일행은 강 한가운데 바위섬의 동굴에 숨었습니다. 그런데 새벽에 마과가 무리를 데리고 왔습니다. 싸움이 벌어졌습니다.`,
            `매의 눈과 두 모히컨 사람은 화약이 다 떨어졌습니다.`,
            `매의 눈이 말했습니다.<br>"우리가 남아 있어도 소용이 없소. 우리가 빠져나가서 사람을 데려오겠소."<br>코라가 말했습니다.<br>"가세요. 그것이 낫습니다."`,
            `세 사람은 강물로 뛰어들었습니다. 그리고 나머지 사람들은 붙잡혔습니다.`,
            `동굴을 떠나기 전에 코라가 매의 눈에게 이렇게 말했습니다.<br>"우리 아버지에게 전해 주세요. 저희가 겁내지 않았다고요."<br>매의 눈이 말했습니다.<br>"내가 반드시 돌아오겠소."`,
            `그리고 그 약속은 지켜졌습니다.`
        ]
    },
    {
        num: 4,
        title: "구출",
        emoji: "🌊",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `마과는 붙잡은 사람들을 데리고 숲으로 갔습니다.`,
            `그리고 어느 언덕에서 코라에게 이렇게 말했습니다.<br>"네가 나와 함께 살겠다고 하면 나머지를 다 놓아 주겠다."<br>코라가 물었습니다.<br>"왜 그런 것을 원합니까."<br>마과가 말했습니다.<br>"네 아버지가 나를 사람들 앞에서 때렸다. 그 사람 딸이 내 오두막에서 물을 긷고 옥수수를 빻으면, 그 사람이 그것을 알게 될 것이다."`,
            `코라는 거절했습니다.`,
            `그리고 이렇게 말했습니다.<br>"제 아버지가 당신에게 한 일이 잘못이라는 것은 압니다. 그런데 그것을 저에게 갚으라고 하는 것도 잘못입니다."`,
            `마과는 그 대답을 듣고 아무 말도 하지 않았습니다. 코라는 그 자리에서 겁을 먹지 않았습니다.`,
            `이 소설에서 코라는 아주 강한 사람으로 나옵니다.`,
            `동생 앨리스가 무서워서 울면 코라가 안아 주었고, 결정을 해야 할 때는 늘 코라가 했습니다. 쿠퍼가 이 인물을 그렇게 그린 것은 그 시절 소설에서 드문 일이었습니다.`,
            `그때 숲에서 총소리가 났습니다. 매의 눈과 칭가치국과 웅카스가 돌아온 것이었습니다. 싸움 끝에 사람들이 풀려났습니다.`,
            `마과는 또 달아났습니다. 일행은 다시 요새로 향했습니다. 가는 길에 코라가 웅카스와 이야기를 나누게 되었습니다.`,
            `웅카스는 말이 아주 적은 사람이었습니다. 그런데 코라에게는 몇 마디를 했습니다.`,
            `"당신들은 왜 이 숲으로 왔습니까."<br>"아버지를 뵈러 갑니다."<br>"이 숲은 당신들이 다닐 데가 아닙니다."<br>"압니다."<br>그러고는 코라가 이렇게 물었습니다.<br>"당신 부족은 몇 사람입니까?"<br>웅카스가 대답했습니다.<br>"저희 아버지와 저입니다."`,
            `코라는 그다음 말을 잇지 못했습니다.`,
            `그날 밤 헤이워드가 매의 눈에게 물었습니다.<br>"저 두 분은 왜 우리를 돕습니까."<br>매의 눈이 말했습니다.<br>"당신들을 돕는 게 아니오."<br>"그럼 무엇입니까."<br>"저 사람들은 자기가 옳다고 여기는 것을 하는 거요. 그건 당신들과 상관이 없소."`,
            `헤이워드는 그 말을 오래 생각했습니다.`
        ]
    },
    {
        num: 5,
        title: "칭가치국의 이야기",
        emoji: "🌅",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그날 밤 불가에서 칭가치국이 이런 이야기를 했습니다.`,
            `"내 부족은 원래 저 아래 바다 쪽에 살았소."<br>"우리는 그곳을 흐르는 물의 땅이라고 불렀소."<br>"거기서 우리는 오래 살았소. 마을이 여럿이었고, 강마다 우리 사람이 있었소."<br>"그러다 큰 배가 왔소."<br>"처음에는 사이가 나쁘지 않았소. 우리가 그 사람들에게 먹을 것을 주었고, 그 사람들이 우리에게 물건을 주었소."<br>"그런데 그 사람들이 자꾸 늘었소."<br>"그리고 우리는 자꾸 줄었소."<br>"병이 먼저 왔소. 한 마을이 한 달 만에 비었소."<br>"그다음에 땅이 갔소."<br>"우리는 서쪽으로 옮겼고, 또 옮겼고, 또 옮겼소."<br>"옮길 때마다 조약을 맺었소."<br>"여기까지가 너희 땅이라고 종이에 적었소."<br>"그리고 그 종이가 몇 해를 못 갔소."<br>"나는 그런 종이를 여러 장 보았소."<br>헤이워드가 물었습니다.<br>"지금은 몇 분이나 남으셨습니까."`,
            `칭가치국이 불을 오래 보았습니다.`,
            `그리고 이렇게 말했습니다.<br>"나와 내 아들이오."<br>"그리고 내 아들이 마지막이오."`,
            `아무도 아무 말도 하지 못했습니다.`,
            `여기서 이 책이 무엇을 잘못 말했는지를 다시 짚어 두겠습니다. 쿠퍼는 이 대목을 아주 슬프게 썼습니다.`,
            `그리고 사람들이 그 슬픔에 감동했습니다.`,
            `그런데 그 슬픔에는 이상한 점이 있습니다. 그것은 '저 사람들은 사라지게 되어 있다'는 생각입니다. 그 시절 백인들이 그렇게 여겼습니다.`,
            `해가 지듯이 저 사람들도 지는 것이라고요. 그런데 사라진 것이 아닙니다. 사라지게 만든 것입니다.`,
            `병을 옮긴 것도, 땅을 가져간 것도, 조약을 어긴 것도 사람이 한 일이었습니다. 그리고 앞에서 말했듯이 모히컨 사람들은 사라지지 않았습니다. 지금도 살고 있습니다.`
        ]
    },
    {
        num: 6,
        title: "요새에 닿다",
        emoji: "🏰",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `일행은 마침내 윌리엄 헨리 요새에 닿았습니다. 그런데 그 요새는 이미 프랑스군에 포위되어 있었습니다. 안개 낀 새벽에 일행이 몰래 들어갔습니다.`,
            `먼로 대령이 두 딸을 맞았습니다. 요새 안 사정은 아주 나빴습니다. 프랑스군이 대포를 계속 쏘았고, 성벽이 무너져 가고 있었습니다.`,
            `먼로 대령은 남쪽 에드워드 요새에 여러 번 사람을 보내 도움을 청했습니다. 그런데 답이 오지 않았습니다.`,
            `그러던 어느 날, 프랑스군이 편지를 하나 보내왔습니다. 에드워드 요새의 사령관이 쓴 편지였습니다. 프랑스군이 그 편지를 가로챈 것이었습니다.`,
            `그 편지에는 이렇게 적혀 있었습니다.`,
            `"보낼 군대가 없다. 알아서 하라."`,
            `먼로 대령은 그 편지를 읽고 오래 앉아 있었습니다. 프랑스군 사령관 몽칼름 장군이 회담을 청했습니다. 몽칼름은 그 시절 프랑스군에서 가장 이름난 장수였습니다. 그리고 규칙을 지키는 사람으로 알려져 있었습니다.`,
            `그 사람은 요새를 부수고 사람을 다 없애는 방식을 좋아하지 않았습니다. 그래서 이런 조건을 낸 것입니다.`,
            `그리고 이렇게 말했습니다.<br>"요새를 넘기십시오. 그 대신 여러분은 무기를 들고 남쪽으로 걸어 나가도 좋습니다. 아무도 건드리지 않겠습니다."`,
            `그 시절 전쟁에서는 그런 방식이 있었습니다. 싸움을 끝내는 대신 진 쪽이 안전하게 물러가게 해 주는 것이었습니다. 먼로 대령은 그것을 받아들였습니다.`,
            `병사와 여자와 아이가 이천 명 가까이 되었습니다. 이튿날 아침 그 사람들이 요새를 나섰습니다. 그런데 몽칼름이 미처 생각하지 못한 것이 있었습니다.`,
            `프랑스군과 함께 싸운 여러 부족 사람들이 있었습니다. 그 사람들은 그 조건에 동의한 적이 없었습니다. 그리고 그 사람들에게 프랑스군이 약속한 것을 주지 않았습니다.`,
            `그날 그 길에서 큰일이 났습니다. 몽칼름은 그 뒤로 오랫동안 그 일로 비난을 받았습니다. 그리고 그 사람 자신도 그 일을 무겁게 여겼다는 기록이 있습니다.`,
            `다만 그 사람은 함께 싸운 부족들에게 애초에 약속한 것을 주지 않았습니다. 그 사람들은 먼 데서 여러 달을 걸어와 싸웠는데 아무것도 받지 못한 채 돌아가게 되어 있었습니다. 그 일이 그날 아침의 배경입니다.`
        ]
    },
    {
        num: 7,
        title: "그날 아침",
        emoji: "🌫️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그날 벌어진 일을 여기 자세히 적지는 않겠습니다. 다만 이것은 적어 두겠습니다. 실제로 있었던 일입니다.`,
            `천칠백오십칠 년 팔월, 윌리엄 헨리 요새에서 물러나던 사람들이 길에서 습격을 받았습니다. 몇 사람이 목숨을 잃었는지는 지금도 정확히 모릅니다. 백 명이 안 된다는 기록도 있고, 훨씬 많다는 기록도 있습니다.`,
            `이 소설이 나온 뒤 오랫동안 사람들은 그 수를 아주 크게 알고 있었습니다. 이 소설이 그렇게 썼기 때문입니다.`,
            `나중에 학자들이 실제 기록을 조사해서 수를 다시 셈했습니다. 그런데 사람들 머릿속에 남은 것은 소설이었습니다.`,
            `이야기가 사실보다 오래 남는 일이 있습니다. 그리고 이런 일은 지금도 일어납니다. 어떤 사건이 있으면, 그 사건 자체보다 그 사건을 다룬 이야기가 사람들 머릿속에 남습니다.`,
            `그러니 이야기를 만드는 사람은 그것을 알고 만들어야 합니다. 그리고 그 이야기가 어느 한쪽만 잔인하게 그려 놓으면, 그 그림이 백 년을 갑니다.`,
            `그날 그 혼란 속에서 마과가 코라와 앨리스를 데려갔습니다. 그리고 북쪽으로 갔습니다.`,
            `며칠 뒤 매의 눈과 칭가치국과 웅카스와 헤이워드가 그 자리에 도착했습니다. 아무도 없었습니다. 웅카스가 땅을 살폈습니다. 그리고 발자국을 찾아냈습니다.`,
            `"이쪽입니다."`,
            `네 사람은 그 자국을 따라 북쪽으로 갔습니다. 그 추적이 여러 날 이어졌습니다. 땅에 남은 발자국, 꺾인 나뭇가지, 눌린 이끼, 물가의 자국.`,
            `웅카스는 그것을 다 읽었습니다. 헤이워드는 그것을 옆에서 보면서 아무것도 알아보지 못했습니다. 그리고 이런 생각을 했습니다.`,
            `이 숲에서는 자기가 아무것도 아니라는 생각이었습니다. 헤이워드는 그 며칠 사이에 그것을 처음 알았습니다.`
        ]
    },
    {
        num: 8,
        title: "델라웨어 마을",
        emoji: "🛖",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `자국을 따라가니 두 갈래로 나뉘어 있었습니다. 마과가 두 사람을 따로 떼어 놓은 것이었습니다. 앨리스는 휴런 마을에, 코라는 그 근처 델라웨어 마을에 맡겨져 있었습니다.`,
            `네 사람은 나뉘어 두 마을에 들어갔습니다. 그리고 여러 가지 방법을 썼습니다. 헤이워드는 의원 행세를 하고 휴런 마을에 들어갔습니다.`,
            `그 마을에 앓는 사람이 있었기 때문입니다. 그 마을 사람들은 앓는 사람이 있으면 낯선 이라도 들여보내 주었습니다. 고칠 수 있는 사람이면 부족이 달라도 상관하지 않았습니다.`,
            `헤이워드는 그것을 이용한 것입니다. 나중에 헤이워드는 그 일을 오래 마음에 두었습니다. 매의 눈은 곰 가죽을 뒤집어쓰고 들어갔습니다. 그리고 웅카스는 붙잡혔습니다.`,
            `여기서 이 이야기에서 가장 중요한 장면이 나옵니다. 델라웨어 마을에는 타메눈드라는 아주 늙은 사람이 있었습니다. 백 살이 넘었다고 했습니다.`,
            `그 마을의 일을 정하는 사람이었습니다. 마과가 그 앞에 나와 코라를 자기에게 달라고 했습니다. 붙잡힌 웅카스도 그 앞에 끌려 나왔습니다.`,
            `타메눈드가 웅카스를 보았습니다.`,
            `그리고 이렇게 물었습니다.<br>"너는 누구냐."`,
            `웅카스는 대답하지 않았습니다. 대신 웃옷을 벗었습니다. 그 가슴에 문신이 있었습니다.`,
            `푸른 거북이었습니다. 타메눈드가 자리에서 일어섰습니다. 그 거북은 아주 오래된 표시였습니다.`,
            `델라웨어와 모히컨은 원래 한 갈래에서 나온 사람들이었고, 그 표시를 쓰는 집안은 그 갈래에서 가장 오래된 집안이었습니다.`,
            `타메눈드가 말했습니다.<br>"나는 어릴 때 이 표시를 가진 사람을 보았다. 그것이 팔십 년 전이다."<br>"그 집안이 아직 남아 있느냐."<br>웅카스가 말했습니다.<br>"저와 제 아버지입니다."`,
            `마을이 조용해졌습니다.`
        ]
    },
    {
        num: 9,
        title: "타메눈드의 판단",
        emoji: "⚖️",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `타메눈드는 웅카스를 풀어 주었습니다.`,
            `그리고 마과에게 이렇게 말했습니다.<br>"너는 이 마을에 손님으로 왔다. 손님은 자기 것을 가지고 간다. 그것이 우리 법이다."<br>"그 여자는 네 것이라고 했으니 데려가라."<br>헤이워드가 소리쳤습니다.<br>"사람을 물건처럼 말씀하십니까!"<br>타메눈드가 말했습니다.<br>"나는 그렇게 말한 적이 없다. 나는 우리 법을 말했다."<br>"그리고 그 법을 만든 것은 우리가 아니다. 그 법은 우리가 너희에게서 배운 것이다."`,
            `헤이워드는 그 말에 아무 대답도 하지 못했습니다. 그 시절 유럽 사람들이 그 땅에서 사람을 잡아다 팔고 있었기 때문입니다. 그리고 부족들 사이의 오래된 규칙도 그것 때문에 뒤틀려 있었습니다.`,
            `타메눈드가 마과에게 물었습니다.<br>"너는 그 여자만 데려가겠느냐, 나머지도 원하느냐."<br>"그 여자만 데려가겠다."<br>"그럼 가거라. 다만 해가 질 때까지는 아무도 너를 쫓지 못한다. 그것도 우리 법이다."<br>"해가 지고 나면 나는 막지 않겠다."`,
            `마과는 코라를 데리고 마을을 나갔습니다. 해가 지자 웅카스가 일어섰습니다. 델라웨어 사람들이 함께 일어섰습니다.`,
            `그날 저녁 그 골짜기에서 싸움이 벌어졌습니다. 그것이 이 이야기의 마지막 싸움입니다.`
        ]
    },
    {
        num: 10,
        title: "벼랑 위",
        emoji: "⛰️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `마과는 코라를 데리고 벼랑 쪽으로 달아났습니다. 웅카스가 그 뒤를 쫓았습니다. 벼랑 위 좁은 바위 길에서 마과가 걸음을 멈췄습니다.`,
            `그리고 코라에게 말했습니다.<br>"함께 가겠느냐, 여기 남겠느냐."<br>코라가 말했습니다.<br>"저는 가지 않겠습니다."`,
            `마과가 칼을 들었습니다. 그런데 내리치지 못했습니다. 한참 그대로 서 있었습니다.`,
            `원작에는 이 대목이 이렇게 적혀 있습니다. 마과의 손이 떨렸다고요. 이 대목은 이 소설에서 아주 중요한 자리입니다.`,
            `쿠퍼는 마과를 처음부터 끝까지 무서운 사람으로 그려 왔습니다. 그런데 마지막 순간에 그 손이 떨렸다고 적었습니다.`,
            `그러니까 이 소설을 쓴 사람도, 자기가 만든 인물이 괴물이 아니라는 것을 알고 있었던 것입니다.`,
            `그때 마과의 무리 가운데 하나가 뒤에서 나섰습니다. 그리고 그 일을 했습니다. 마과는 그것을 보고 그 사람에게 달려들었습니다.`,
            `자기가 하지 못한 일을 남이 했다고 화를 낸 것입니다. 그 순간 웅카스가 벼랑 위에서 뛰어내렸습니다. 그리고 마과와 부딪쳤습니다.`,
            `그 자리에서 웅카스가 마과의 손에 쓰러졌습니다. 매의 눈이 바위 아래에서 그것을 보았습니다. 그리고 마과가 벼랑을 건너뛰려는 순간에 총을 쏘았습니다.`,
            `마과는 그 자리에서 떨어졌습니다. 그날 그 벼랑에서 코라와 웅카스가 세상을 떠났습니다. 그리고 마과도요.`,
            `세 사람이 다 같은 자리에서 끝났습니다.`
        ]
    },
    {
        num: 11,
        title: "장례",
        emoji: "🍂",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `이튿날 델라웨어 마을에서 장례가 치러졌습니다. 코라와 웅카스를 나란히 묻었습니다. 마을의 여자들이 노래를 불렀습니다.`,
            `그 노래는 두 사람이 저세상에서 함께 지낼 것이라는 노래였습니다.`,
            `먼로 대령이 그 노래를 듣고 헤이워드에게 물었습니다.<br>"저 사람들이 무어라고 하는가."`,
            `헤이워드는 그 노래를 그대로 옮기지 못했습니다. 그 시절 백인 사회에서는 그런 말을 그대로 옮기기가 어려웠기 때문입니다.`,
            `먼로 대령이 이렇게 말했습니다.<br>"저 사람들에게 전해 주게. 언젠가 우리가 다 같은 자리에 설 날이 온다고. 그때는 살빛이 아무 상관도 없을 것이라고."`,
            `헤이워드는 그 말도 그대로 옮기지 못했습니다. 원작에는 그 대목이 이렇게 적혀 있습니다.`,
            `헤이워드가 그 말을 옮기기를 망설였다고요. 그리고 칭가치국이 마지막으로 일어섰습니다.`,
            `그 사람은 아들의 무덤 앞에서 이렇게 말했습니다.<br>"나는 이제 혼자다."<br>"내 부족의 마을이 있던 자리에 지금은 다른 사람들의 마을이 있다."<br>"내 아버지의 무덤이 어디 있는지 나는 안다. 그런데 그 자리에 지금은 밭이 있다."<br>"나는 마지막 모히컨이다."`,
            `그때 타메눈드가 일어섰습니다. 아주 늙은 사람이었습니다.`,
            `타메눈드가 이렇게 말했습니다.<br>"나는 너무 오래 살았다."<br>"나는 우리가 이 땅의 주인이던 때를 보았다."<br>"그리고 오늘 우리 가운데 마지막 한 사람이 자기 아들을 묻는 것을 본다."`,
            `그것이 이 소설의 마지막 장면입니다.`,
            `이 장면은 아주 유명합니다. 그림으로도 여러 번 그려졌고, 연극과 영화로도 여러 번 만들어졌습니다. 그리고 볼 때마다 사람들이 울었습니다.`,
            `그런데 다음 장을 꼭 읽어 주십시오.`
        ]
    },
    {
        num: 12,
        title: "그 뒤에 있었던 일",
        emoji: "📖",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `여기서 이 책을 그대로 덮으면 안 됩니다.`,
            `이 소설은 백구십 년 전에 나왔습니다. 그리고 아주 많이 읽혔습니다. 그런데 이 소설이 만들어 놓은 그림이 하나 있습니다.`,
            `원래 살던 사람들은 안타깝지만 사라지게 되어 있다는 그림입니다. 그 그림이 아주 오래갔습니다. 그리고 그 그림에는 한 가지 편한 점이 있었습니다.`,
            `사라지게 되어 있다고 하면, 아무도 책임을 지지 않아도 됩니다. 해가 지는 것을 두고 누구를 탓하지는 않으니까요.`,
            `그 무렵 미국은 서쪽으로 계속 넓어지고 있었습니다. 그리고 그 땅에는 이미 사람이 살고 있었습니다. 그러니 그 땅을 가지려면 무언가 설명이 필요했습니다.`,
            `'저 사람들은 어차피 사라지는 중이다'라는 말이 그 설명이 되어 주었습니다. 그런데 사실은 이랬습니다.`,
            `이 소설이 나온 바로 그 무렵, 미국에서는 법이 하나 만들어졌습니다.`,
            `천팔백삼십 년에 만들어진 법인데, 동쪽에 살던 부족들을 미시시피강 서쪽으로 옮기게 하는 법이었습니다. 그 법에 따라 여러 부족이 걸어서 서쪽으로 갔습니다.`,
            `체로키 부족의 경우, 그 길에서 사람이 아주 많이 세상을 떠났습니다. 그 길을 지금 '눈물의 길'이라고 부릅니다. 그러니까 그 사람들은 사라진 것이 아닙니다.`,
            `옮겨진 것입니다. 그리고 옮긴 사람들이 있었습니다. 모히컨 사람들도 마찬가지였습니다.`,
            `이 소설에서는 웅카스가 마지막이라고 했습니다.`,
            `실제로는 그렇지 않았습니다. 그 사람들은 매사추세츠에서 뉴욕으로, 뉴욕에서 인디애나로, 인디애나에서 위스콘신으로 옮겨졌습니다. 그리고 지금 위스콘신주에 모히컨 사람들의 자치 구역이 있습니다.`,
            `학교가 있고, 도서관이 있고, 자기들 말을 다시 가르치는 수업이 있습니다. 그 사람들은 이 소설의 제목을 잘 알고 있습니다. 그리고 그 제목에 대해 이렇게 말합니다.`,
            `"우리는 아직 여기 있습니다."`,
            `이 이야기를 읽고 나서 남기면 좋을 것이 있다면 그 문장입니다. 옛이야기는 재미있게 읽으면 됩니다.`,
            `다만 그 이야기가 어느 편에서 쓰인 것인지, 그리고 그 뒤에 실제로 무슨 일이 있었는지는 알아 두는 것이 좋습니다.`
        ]
    }
];
/* ── 쪽 나누기 ─────────────────────────────────────────
   그림이 있는 펼침면은 왼쪽 쪽에만 글이 들어가고,
   그림이 없는 펼침면은 양쪽 쪽에 모두 글이 들어간다.
   진짜 책이 그렇듯 문단 한가운데에서도 쪽을 넘긴다. 그래야 쪽마다 글이 고르게 찬다.
   글자 수로 어림잡으면 대사가 많은 문단은 실제로 차지하는 줄이 훨씬 많아 어긋나므로,
   보이지 않는 쪽을 하나 만들어 실제 높이를 재어 가며 나눈다. */

function makeProbe() {
    const book = document.getElementById('book');
    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;inset:10px;visibility:hidden;pointer-events:none;z-index:-1;';
    holder.innerHTML = '<div class="page page-story"><div class="story-page-left"></div><div class="story-page-right"></div></div>';
    book.appendChild(holder);

    // 따로 만든 상자에 재면 실제 쪽과 미묘하게 어긋난다.
    // 그래서 진짜 쪽과 똑같은 칸을 하나 숨겨 두고 거기에 넣어 잰다.
    // 칸이 넘치면 scrollHeight가 칸 높이에서 잘리므로, 안에 든 것들의 높이를 직접 더한다.
    const col = holder.querySelector('.story-page-left');
    const cs = getComputedStyle(col);
    const measured = col.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);

    const contentHeight = () => [...col.children].reduce((h, el) =>
        h + el.getBoundingClientRect().height + parseFloat(getComputedStyle(el).marginBottom || 0), 0);

    col.innerHTML = '<h2>제목</h2>';
    const headHeight = contentHeight();
    col.innerHTML = '';

    return {
        // 창이 아직 크기를 갖지 못한 채 열리면 잰 값이 0이 된다. 그때는 어림값으로 버틴다.
        usable: measured > 40 ? measured : 620,
        headHeight: headHeight > 0 ? headHeight : 45,
        measure(html) {
            col.innerHTML = html;
            return contentHeight();
        },
        close() { book.removeChild(holder); }
    };
}

let PROBE = null;   // 쪽을 나눌 때마다 새로 만든다

// 문단을 쪽 넘길 수 있는 조각으로 나눈다. 문장 끝과 대사 줄바꿈이 자를 수 있는 자리다.
// 낱말 뜻풀이처럼 태그로 묶인 부분 안에서는 자르지 않는다.
function splitSegments(html) {
    const tokens = html.split(/(<[^>]+>)/).filter(t => t !== '');
    const segs = [];
    let buf = '';
    let depth = 0;
    for (const tok of tokens) {
        if (tok.startsWith('<')) {
            buf += tok;
            if (/^<br\s*\/?>$/i.test(tok)) {
                if (depth === 0) { segs.push(buf); buf = ''; }
            } else if (tok.startsWith('</')) {
                depth = Math.max(0, depth - 1);
            } else if (!tok.endsWith('/>')) {
                depth++;
            }
            continue;
        }
        if (depth > 0) { buf += tok; continue; }
        // 문장이 끝나고 빈칸이 오는 자리에서 자른다
        const parts = tok.split(/(?<=[.!?"”][\s])/);
        for (let i = 0; i < parts.length; i++) {
            buf += parts[i];
            if (i < parts.length - 1) { segs.push(buf); buf = ''; }
        }
    }
    if (buf.trim() !== '') segs.push(buf);
    return segs.length ? segs : [html];
}

const CHAPTER_SEGS = CHAPTERS.map(ch => {
    const segs = [];
    ch.paras.forEach((html, paraIdx) => {
        splitSegments(html).forEach((piece, k) => {
            segs.push({ paraIdx, html: piece, start: k === 0 });
        });
    });
    return segs;
});

// 조각 묶음을 문단 단위로 다시 묶어 화면에 그릴 모양으로 만든다.
// 앞 쪽에서 이어진 문단은 첫 줄을 들여쓰지 않는다.
function runHtml(segs, a, b) {
    let out = '';
    let i = a;
    while (i < b) {
        const pi = segs[i].paraIdx;
        let inner = '';
        const contd = !segs[i].start;
        let j = i;
        while (j < b && segs[j].paraIdx === pi) { inner += segs[j].html; j++; }
        out += `<p${contd ? ' class="cont"' : ''}>${inner}</p>`;
        i = j;
    }
    return out;
}

function slotPlan(imgCount, textCount) {
    const total = imgCount + textCount;
    const slots = new Array(total).fill('text');
    for (let k = 0; k < imgCount; k++) {
        let pos = Math.min(Math.round((k * total) / imgCount), total - 1);
        while (slots[pos] === 'img') pos = (pos + 1) % total;
        slots[pos] = 'img';
    }
    return slots;
}

// 글을 쪽마다 같은 높이만큼 나눠 담는다. 마지막 쪽만 남은 만큼 담는다.
// 장 제목이 붙는 첫 쪽은 제목까지 함께 얹어서 재야 한다.
// 제목 높이를 따로 빼서 계산하면 실제로 나란히 놓였을 때의 높이와 조금씩 어긋난다.
function fillPages(segs, pageCount, headHtml, usable) {
    const pageHeight = (a, b, first) => PROBE.measure((first ? headHtml : '') + runHtml(segs, a, b));
    const ranges = [];
    let i = 0;
    for (let p = 0; p < pageCount; p++) {
        const rest = pageCount - p - 1;
        if (rest === 0) { ranges.push([i, segs.length]); break; }
        // 남은 글을 남은 쪽 수로 나눠 이번 쪽에 담을 양을 정한다.
        // 매 쪽마다 다시 계산하므로, 한 쪽이 덜 차면 그만큼이 뒤쪽에 고르게 얹힌다.
        const remainingH = pageHeight(i, segs.length, p === 0);
        const room = Math.min(usable, remainingH / (rest + 1));
        const maxTake = Math.max(1, segs.length - i - rest);
        let take = 1;
        let lo = 1, hi = maxTake;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (pageHeight(i, i + mid, p === 0) <= room) { take = mid; lo = mid + 1; }
            else { hi = mid - 1; }
        }
        ranges.push([i, i + take]);
        i += take;
    }
    return ranges;
}

function paginateChapter(ch, chIndex) {
    const segs = CHAPTER_SEGS[chIndex];
    const arts = (ch.art && ch.art.length) ? ch.art : [];
    const { usable, headHeight } = PROBE;
    const headHtml = `<h2>${CHAPTER_LABEL(ch.num)}${ch.title}</h2>`;
    const totalH = PROBE.measure(runHtml(segs, 0, segs.length));

    // 필요한 글 쪽 수를 구하고, 그림 면(1쪽)과 글만 면(2쪽)으로 맞춘다.
    // 쪽 수는 조각 수를 넘을 수 없다 — 빈 쪽이 생기면 안 되기 때문이다.
    const maxSpreads = Math.max(arts.length, Math.ceil(segs.length / 2));
    const needPages = Math.max(arts.length || 1, Math.ceil((totalH + headHeight) / usable));
    let textSpreads = Math.max(arts.length ? 0 : 1, Math.ceil(Math.max(0, needPages - arts.length) / 2));

    let slots = slotPlan(arts.length, textSpreads);
    let ranges = null;
    for (let guard = 0; guard < 8; guard++) {
        slots = slotPlan(arts.length, textSpreads);
        const pageCount = slots.reduce((n, kind) => n + (kind === 'img' ? 1 : 2), 0);
        if (pageCount > segs.length && textSpreads > 0) { textSpreads--; continue; }
        ranges = fillPages(segs, pageCount, headHtml, usable);
        // 한 쪽이라도 넘치면 쪽을 늘려 다시 나눈다.
        // 마지막 쪽만 보면 안 된다 — 첫 쪽에는 장 제목이 얹히므로 그쪽이 먼저 넘칠 수 있다.
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > usable);
        if (!over || arts.length + textSpreads >= maxSpreads) break;
        textSpreads++;
    }
    if (!ranges) {
        slots = slotPlan(arts.length, textSpreads);
        ranges = fillPages(segs, slots.reduce((n, kind) => n + (kind === 'img' ? 1 : 2), 0), headHtml, usable);
    }

    const spreads = [];
    let pageIdx = 0;
    let artIdx = 0;
    slots.forEach((kind, s) => {
        if (kind === 'img') {
            spreads.push({
                kind: 'chapter', ch, chIndex, first: s === 0,
                art: arts[artIdx++], left: ranges[pageIdx++], right: null
            });
        } else {
            const left = ranges[pageIdx++];
            const right = ranges[pageIdx++];
            spreads.push({ kind: 'chapter', ch, chIndex, first: s === 0, art: null, left, right });
        }
    });
    return spreads;
}
/* ── 그리기 ───────────────────────────────────────── */

function artFrame(src, emoji) {
    return `
        <div class="art-frame">
            <img src="images/${src}" alt="" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="art-fallback" style="display:none">${emoji}</div>
        </div>`;
}

function coverPage() {
    return `
        <div class="page page-cover">
            <div class="story-page-left story-page-left-full">
                ${artFrame('cover.png', '🌲')}
            </div>
            <div class="story-page-right">
                <h1>모히컨 족의 최후</h1>
                <p class="cover-tag">제임스 페니모어 쿠퍼 원작</p>
                <p>이백칠십 년 전, 영국과 프랑스가 북아메리카의 땅을 놓고 싸웁니다. 그 땅은 원래 두 나라 것이 아니었습니다.</p>
                <p>이 소설이 만들어 놓은 그림과 실제로 있었던 일이 어떻게 다른지도 함께 실었습니다. 제목부터가 사실이 아닙니다.</p>
            </div>
        </div>`;
}

function tocPage(part) {
    // 한 편으로 이어지는 이야기라 차례는 장 번호와 제목만 둔다.
    // 줄거리 한 줄을 붙이면 차례가 두 펼침면으로 늘어나고, 앞으로 읽을 대목을 미리 알려 주는 셈도 된다.
    const itemHtml = ch => `
        <li>
            <button type="button" data-goto="${ch.num}">
                <span class="toc-num">${ch.num}</span>
                <span><strong>${ch.title}</strong></span>
            </button>
        </li>`;
    const extraItems = `
        <li>
            <button type="button" data-goto-kind="quiz">
                <span class="toc-num">?</span>
                <span><strong>이야기 문제</strong></span>
            </button>
        </li>`;
    const group = TOC_GROUPS[part];
    const half = Math.ceil(group.length / 2);
    const last = part === TOC_GROUPS.length - 1;
    return `
        <div class="page page-toc">
            <div class="story-page-left">
                ${part === 0 ? '<h2>차례</h2>' : ''}
                <ul class="toc-list">${group.slice(0, half).map(itemHtml).join('')}</ul>
            </div>
            <div class="story-page-right">
                <ul class="toc-list">${group.slice(half).map(itemHtml).join('') + (last ? extraItems : '')}</ul>
            </div>
        </div>`;
}

// 한 펼침면에 담을 수 있는 차례 항목은 여덟 개까지다. 그보다 많으면 차례도 여러 쪽이 된다.
const TOC_PER_SPREAD = 16;
const TOC_GROUPS = [];
for (let i = 0; i < CHAPTERS.length; i += TOC_PER_SPREAD) {
    TOC_GROUPS.push(CHAPTERS.slice(i, i + TOC_PER_SPREAD));
}

function chapterSpreadPage(spread) {
    const ch = spread.ch;
    const segs = CHAPTER_SEGS[spread.chIndex];
    const head = spread.first ? `<h2>${CHAPTER_LABEL(ch.num)}${ch.title}</h2>` : '';

    if (spread.art) {
        return `
            <div class="page page-story">
                <div class="story-page-left">
                    ${head}
                    ${runHtml(segs, spread.left[0], spread.left[1])}
                </div>
                <div class="story-page-right story-page-right-image">
                    ${artFrame(spread.art, ch.emoji)}
                </div>
            </div>`;
    }

    return `
        <div class="page page-story">
            <div class="story-page-left">
                ${head}
                ${runHtml(segs, spread.left[0], spread.left[1])}
            </div>
            <div class="story-page-right story-page-right-text">
                ${runHtml(segs, spread.right[0], spread.right[1])}
            </div>
        </div>`;
}

const QUIZ = [
    { q: "유럽 사람들이 오면서 그 땅 사람들에게 먼저 닥친 것은 무엇입니까?", choices: ["사냥터를 가르는 새 경계선", "총과 화약을 앞세운 싸움", "유럽에서 건너온 돌림병"], answer: 2 },
    { q: "부족들이 영국이나 프랑스 한쪽 편에 선 까닭은 무엇입니까?", choices: ["어느 한쪽과 오래전부터 가까이 지내서", "어느 쪽에도 안 서는 것이 제일 위험해서", "이기는 쪽에 서면 땅을 준다고 해서"], answer: 1 },
    { q: "이 책이 제목에 대해 밝힌 사실은 무엇입니까?", choices: ["모히컨 사람들은 지금도 위스콘신에 살고 있다", "마지막 사람이 죽은 해까지 기록에 남아 있다", "모히컨이라는 부족은 처음부터 없던 이름이다"], answer: 0 },
    { q: "매의 눈이라 불린 사람의 본이름은 무엇입니까?", choices: ["내티 범포", "웅카스", "칭가치국"], answer: 0 },
    { q: "마과가 먼로 대령을 미워하게 된 까닭은 무엇입니까?", choices: ["제 부족 땅을 빼앗겼기 때문에", "사람들 앞에서 채찍으로 맞았기 때문에", "약속한 삯을 끝내 받지 못했기 때문에"], answer: 1 },
    { q: "코라가 마과의 요구를 거절하며 한 말은 무엇입니까?", choices: ["그 일은 아버지에게 직접 가서 따지는 것이 옳다", "아버지 잘못은 알지만 나에게 갚으라는 것도 잘못이다", "아버지가 한 일은 나와 아무 상관이 없는 일이다"], answer: 1 },
    { q: "칭가치국이 부족이 줄어든 순서로 말한 것은 무엇입니까?", choices: ["먼저 땅을 잃었고 그다음에 싸움이 났다", "먼저 싸움이 났고 그다음에 병이 왔다", "먼저 병이 왔고 그다음에 땅을 잃었다"], answer: 2 },
    { q: "이 책이 쿠퍼의 슬픔에 대해 짚은 문제는 무엇입니까?", choices: ["싸움 장면을 너무 길게 늘여 썼다는 것", "사라지게 되어 있다는 생각이 깔려 있다는 것", "실제 부족 이름을 잘못 적어 놓았다는 것"], answer: 1 },
    { q: "요새를 넘기는 조건은 무엇이었습니까?", choices: ["무기를 다 내려놓고 배를 타고 떠나는 것", "장교만 남고 나머지는 그대로 돌아가는 것", "무기를 들고 안전하게 남쪽으로 걸어 나가는 것"], answer: 2 },
    { q: "그 조건이 지켜지지 않은 까닭은 무엇입니까?", choices: ["함께 싸운 부족들이 그 조건에 동의한 적이 없어서", "영국 군사들이 무기를 몰래 숨겨 나갔기 때문에", "프랑스 쪽이 처음부터 지킬 생각이 없었기 때문에"], answer: 0 },
    { q: "그날 희생자 수에 대해 이 책이 밝힌 것은 무엇입니까?", choices: ["소설이 크게 부풀렸고 사람들 머리에는 소설이 남았다", "소설이 오히려 실제보다 적게 적어 놓았다", "기록마다 달라서 지금도 정확한 수를 알 수 없다"], answer: 0 },
    { q: "웅카스가 타메눈드 앞에서 보인 것은 무엇입니까?", choices: ["아버지에게 받은 목걸이", "부족의 표시가 든 낡은 띠", "가슴에 새긴 푸른 거북 문신"], answer: 2 },
    { q: "타메눈드가 마과에게 코라를 데려가라고 하며 덧붙인 말은 무엇입니까?", choices: ["그 법은 우리가 너희에게서 배운 것이다", "그 법은 오늘로 마지막이 될 것이다", "그 법은 우리 조상 때부터 있던 것이다"], answer: 0 },
    { q: "먼로 대령의 마지막 말을 헤이워드가 그대로 옮기지 못한 까닭은 무엇입니까?", choices: ["그 자리에서 말소리를 잘 알아듣지 못해서", "그 시절 백인 사회에서 옮기기 어려운 말이라서", "먼로가 옮기지 말라고 못을 박았기 때문에"], answer: 1 },
    { q: "천팔백삼십 년에 미국에서 만들어진 법은 무엇입니까?", choices: ["동쪽 부족들을 미시시피강 서쪽으로 옮기게 한 법", "부족 아이들을 학교에 보내게 정한 법", "부족들에게 땅문서를 나눠 주도록 정한 법"], answer: 0 },
    { q: "오늘날 모히컨 사람들이 이 소설 제목에 대해 하는 말은 무엇입니까?", choices: ["이제 와서 따질 일은 아닙니다", "그 이름은 우리 것이 아닙니다", "우리는 아직 여기 있습니다"], answer: 2 }
];

// 선지를 세로로 쌓으니 한 쪽에 열여섯 문항이 다 들어가지 않는다. 몇 개씩 나눠 싣는다.
const QUIZ_PER_SPREAD = 3;
const QUIZ_GROUPS = [];
for (let i = 0; i < QUIZ.length; i += QUIZ_PER_SPREAD) {
    QUIZ_GROUPS.push({ from: i, items: QUIZ.slice(i, i + QUIZ_PER_SPREAD) });
}

// 쪽을 넘겼다 돌아와도 이미 푼 문항은 풀린 채로 있어야 한다.
const QUIZ_PICKED = new Array(QUIZ.length).fill(null);

function quizPage(part) {
    const group = QUIZ_GROUPS[part];
    const done = QUIZ_PICKED.filter(v => v !== null).length;
    const items = group.items.map((item, k) => {
        const i = group.from + k;
        const picked = QUIZ_PICKED[i];
        const graded = picked !== null;
        const cls = ci => graded
            ? (ci === item.answer ? ' correct' : (ci === picked ? ' incorrect' : ''))
            : '';
        return `
        <div class="quiz-item${graded ? ' graded' : ''}" data-qindex="${i}">
            <p class="quiz-question">${i + 1}. ${item.q}</p>
            <div class="quiz-choices">
                ${item.choices.map((c, ci) => `<button type="button" class="quiz-choice${cls(ci)}" data-choice="${ci}">${c}</button>`).join('')}
            </div>
        </div>`;
    }).join('');
    return `
        <div class="page page-quiz">
            ${part === 0 ? '<h2>이야기 문제</h2>' : ''}
            <p class="quiz-intro-text" id="quizProgress">${done} / 총 ${QUIZ.length}문항 완료</p>
            <div class="quiz-list">${items}</div>
        </div>`;
}

function endPage() {
    return `
        <div class="page page-end">
            ${artFrame('end.png', '📖')}
            <h2>모히컨 족의 최후를 다 읽었습니다</h2>
            <a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a>
        </div>`;
}

const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover']);

let PAGES = [];
let FOLIOS = [];

function buildPages() {
    PROBE = makeProbe();
    PAGES = [
        { kind: 'cover' },
        ...TOC_GROUPS.map((_, i) => ({ kind: 'toc', part: i })),
        ...CHAPTERS.flatMap(paginateChapter),
        ...QUIZ_GROUPS.map((_, i) => ({ kind: 'quiz', part: i })),
        { kind: 'end' }
    ];
    PROBE.close();   // 쪽을 다 나눴으니 재는 데 쓰던 숨은 쪽은 치운다

    let folioCounter = 0;
    FOLIOS = PAGES.map(p => {
        const width = TWO_PAGE_KINDS.has(p.kind) ? 2 : 1;
        const start = folioCounter + 1;
        folioCounter += width;
        return { start, width };
    });
}

buildPages();

function renderPage(page) {
    switch (page.kind) {
        case 'cover': return coverPage();
        case 'toc': return tocPage(page.part);
        case 'chapter': return chapterSpreadPage(page);
        case 'quiz': return quizPage(page.part);
        case 'end': return endPage();
        default: return '';
    }
}

let current = 0;
let animating = false;

const spreadEl = document.getElementById('spread');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorEl = document.getElementById('pageIndicator');
const folioLeftEl = document.getElementById('folioLeft');
const folioRightEl = document.getElementById('folioRight');

function paint() {
    spreadEl.innerHTML = renderPage(PAGES[current]);
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === PAGES.length - 1;
    indicatorEl.textContent = `${current + 1} / ${PAGES.length}`;

    const folio = FOLIOS[current];
    folioLeftEl.classList.toggle('folio-center', folio.width === 1);
    folioLeftEl.textContent = folio.start;
    folioLeftEl.hidden = false;
    if (folio.width === 2) {
        folioRightEl.textContent = folio.start + 1;
        folioRightEl.hidden = false;
    } else {
        folioRightEl.hidden = true;
    }

    spreadEl.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => {
            const num = Number(btn.dataset.goto);
            const idx = PAGES.findIndex(p => p.kind === 'chapter' && p.first && p.ch.num === num);
            if (idx >= 0) goTo(idx);
        });
    });
    spreadEl.querySelectorAll('[data-goto-kind]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = PAGES.findIndex(p => p.kind === btn.dataset.gotoKind);
            if (idx >= 0) goTo(idx);
        });
    });

    if (PAGES[current].kind === 'quiz') initQuiz();
}

function initQuiz() {
    const progressEl = document.getElementById('quizProgress');

    spreadEl.querySelectorAll('.quiz-item').forEach(item => {
        const qi = Number(item.dataset.qindex);
        const q = QUIZ[qi];
        item.querySelectorAll('.quiz-choice').forEach(btn => {
            btn.addEventListener('click', () => {
                if (item.classList.contains('graded')) return;
                item.classList.add('graded');
                const chosen = Number(btn.dataset.choice);
                item.querySelectorAll('.quiz-choice').forEach(b => {
                    const ci = Number(b.dataset.choice);
                    if (ci === q.answer) b.classList.add('correct');
                    else if (ci === chosen) b.classList.add('incorrect');
                });
                QUIZ_PICKED[qi] = chosen;
                const done = QUIZ_PICKED.filter(v => v !== null).length;
                progressEl.textContent = `${done} / 총 ${QUIZ.length}문항 완료`;
            });
        });
    });
}

function goTo(index) {
    if (animating || index === current || index < 0 || index >= PAGES.length) return;
    animating = true;
    const dir = index > current ? 'flip-next' : 'flip-prev';
    spreadEl.classList.add(dir);
    setTimeout(() => {
        current = index;
        paint();
    }, 230);
    setTimeout(() => {
        spreadEl.classList.remove('flip-next', 'flip-prev');
        animating = false;
    }, 480);
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

document.getElementById('tocLink').addEventListener('click', () => {
    const idx = PAGES.findIndex(p => p.kind === 'toc');
    if (idx >= 0) goTo(idx);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
});

paint();

// 본문 글꼴은 늦게 내려온다. 글꼴이 바뀌면 한 줄에 들어가는 글자 수가 달라져서
// 먼저 나눠 둔 쪽이 넘치게 된다. 그래서 글꼴을 다 받은 뒤에 한 번 다시 나눈다.
if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(() => {
        const here = PAGES[current];
        buildPages();
        current = Math.min(current, PAGES.length - 1);
        if (here && here.kind === 'chapter') {
            const idx = PAGES.findIndex(p => p.kind === 'chapter' && p.first && p.ch.num === here.ch.num);
            if (idx >= 0) current = idx;
        }
        paint();
    });
}
