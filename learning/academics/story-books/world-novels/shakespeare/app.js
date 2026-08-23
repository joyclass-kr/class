const BOOK_TITLE = "셰익스피어 이야기";

const CHAPTER_LABEL = () => '';

const CHAPTERS = [
    {
        num: 1,
        title: "극장을 짓던 사람",
        emoji: "🎭",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `사백 년쯤 전, 영국에 윌리엄 셰익스피어라는 사람이 살았습니다.`,
            `런던에서 극단에 들어가 배우 노릇을 하다가, 나중에는 희곡을 썼습니다.`,
            `희곡이란 무대에서 하는 연극의 대본입니다.`,
            `셰익스피어는 평생 서른일곱 편을 썼습니다.`,
            `그런데 이 사람에 대해 알아 두어야 할 것이 하나 있습니다.`,
            `그 시절 연극은 지금과 아주 달랐습니다.`,
            `극장은 지붕이 없는 둥근 건물이었습니다.`,
            `가운데가 뻥 뚫려 있어서 해가 있어야만 공연을 했습니다.`,
            `무대에는 배경 그림이 거의 없었습니다.`,
            `숲이면 배우가 "이 숲은 어둡구나" 하고 말했습니다.`,
            `그러면 그것이 숲이 되었습니다.`,
            `조명도 없었습니다.`,
            `밤 장면이면 배우가 횃불을 들고 나왔습니다.`,
            `그리고 여자 역은 소년 배우가 했습니다.`,
            `그 시절 영국에서는 여자가 무대에 서는 것이 금지되어 있었기 때문입니다.`,
            `그러니 줄리엣도 소년이 연기했습니다.`,
            `관객도 지금과 달랐습니다.`,
            `제일 싼 자리는 무대 앞의 맨바닥이었습니다.`,
            `거기 서서 보는 사람들을 '한 푼짜리'라고 불렀습니다.`,
            `그 사람들은 마음에 안 들면 야유하고 물건을 던졌습니다.`,
            `그러니까 셰익스피어는 아주 까다로운 관객을 앞에 두고 쓴 사람입니다.`,
            `그 사람들을 두 시간 동안 붙들어 두어야 했습니다.`,
            `그래서 그의 작품에는 늘 무언가가 벌어집니다.`,
            `칼싸움, 유령, 변장, 뒤바뀐 편지, 잘못 전해진 소식.`,
            `그런데 그 사이사이에 사람의 마음을 파고드는 말이 들어 있습니다.`,
            `그것이 사백 년 동안 남은 까닭입니다.`,
            `이 책에는 그 가운데 일곱 편을 담았습니다.`,
            `연극을 이야기로 바꾸어 옮긴 것입니다.`,
            `이런 일을 이백 년 전에 처음 한 사람들이 있습니다.`,
            `찰스 램과 메리 램이라는 남매입니다.`,
            `두 사람이 아이들이 읽을 수 있게 셰익스피어를 이야기로 바꿔 썼습니다.`,
            `이 책도 그 방식을 따랐습니다.`
        ]
    },
    {
        num: 2,
        title: "한여름 밤의 꿈",
        emoji: "🧚",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `아테네에 헤르미아라는 아가씨가 있었습니다.`,
            `라이샌더라는 젊은이를 좋아했습니다.`,
            `그런데 아버지는 데메트리우스라는 다른 젊은이와 혼인시키려고 했습니다.`,
            `그 시절 아테네 법으로는 아버지가 정한 대로 하지 않으면 큰 벌을 받았습니다.`,
            `그래서 헤르미아와 라이샌더는 도망치기로 했습니다.`,
            `숲에서 만나 다른 나라로 가기로 한 것입니다.`,
            `헤르미아가 그 계획을 친구 헬레나에게 말했습니다.`,
            `그런데 헬레나는 데메트리우스를 좋아하고 있었습니다.`,
            `헬레나는 그 이야기를 데메트리우스에게 알려 주었습니다.`,
            `잘 보이고 싶어서 그런 것입니다.`,
            `그래서 그날 밤 네 사람이 다 숲으로 들어갔습니다.`,
            `그런데 그 숲에는 요정들이 살고 있었습니다.`,
            `요정의 왕 오베론과 왕비 티타니아가 그날 크게 다투고 있었습니다.`,
            `오베론은 아랫사람 퍽에게 심부름을 시켰습니다.`,
            `어떤 꽃의 즙을 가져오라고 한 것입니다.`,
            `그 즙을 자는 사람의 눈에 바르면, 깨어나서 처음 본 것을 사랑하게 되는 꽃이었습니다.`,
            `오베론은 그것을 왕비에게 쓸 생각이었습니다.`,
            `그러다 숲에서 헬레나가 데메트리우스에게 매달렸다가 밀쳐지는 것을 보았습니다.`,
            `오베론이 딱하게 여겨 퍽에게 말했습니다.`,
            `"아테네 옷을 입은 젊은이가 있다. 그 눈에도 이것을 발라라."`,
            `그런데 그날 밤 그 숲에는 아테네 옷을 입은 젊은이가 둘이었습니다.`,
            `퍽은 엉뚱한 사람에게 발랐습니다.`,
            `라이샌더가 깨어나서 처음 본 것이 헬레나였습니다.`,
            `그래서 라이샌더가 헬레나를 쫓아다니기 시작했습니다.`,
            `오베론이 그것을 알고 다시 시켰습니다.`,
            `이번에는 데메트리우스에게 발랐습니다.`,
            `데메트리우스도 깨어나 헬레나를 보았습니다.`,
            `그래서 두 젊은이가 다 헬레나를 쫓아다니게 되었습니다.`,
            `헬레나는 두 사람이 자기를 놀리는 줄 알고 화를 냈습니다.`,
            `헤르미아는 하루아침에 아무도 자기를 안 보게 되어 울었습니다.`,
            `네 사람은 그 밤 내내 숲을 뛰어다니며 다투었습니다.`,
            `한편 그 숲에서는 다른 일도 벌어지고 있었습니다.`,
            `마을의 일꾼 몇이 연극 연습을 하러 숲에 와 있었습니다.`,
            `퍽이 장난삼아 그 가운데 하나의 머리를 나귀 머리로 바꿔 놓았습니다.`,
            `그리고 그때 마침 티타니아가 깨어났습니다.`,
            `그래서 요정의 왕비가 나귀 머리를 한 일꾼에게 반했습니다.`,
            `새벽이 되자 오베론이 다 되돌려 놓았습니다.`,
            `아침에 네 사람이 숲에서 깨어났습니다.`,
            `그리고 그 밤에 있었던 일을 다 꿈이라고 여겼습니다.`,
            `다만 한 가지가 남았습니다.`,
            `데메트리우스가 헬레나를 좋아하게 된 것은 그대로 남았습니다.`,
            `오베론이 일부러 그것만 풀지 않은 것입니다.`,
            `그래서 두 쌍이 다 혼인했습니다.`
        ]
    },
    {
        num: 3,
        title: "베니스의 상인",
        emoji: "⚖️",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `베니스에 안토니오라는 상인이 있었습니다.`,
            `친구 바사니오가 돈을 빌리러 왔습니다.`,
            `벨몬트의 포샤라는 아가씨에게 청혼하러 가려면 차림새를 갖추어야 했기 때문입니다.`,
            `안토니오는 돈이 다 배에 실려 나가 있었습니다.`,
            `그래서 샤일록이라는 사람에게 빌리기로 했습니다.`,
            `샤일록은 돈을 빌려주고 이자를 받는 일을 했습니다.`,
            `그 시절 베니스에서 유대인은 다른 일을 할 수 없었습니다.`,
            `법으로 직업이 제한되어 있었고, 정해진 구역 밖에서 살 수 없었고, 밖에 나갈 때는 표시가 있는 모자를 써야 했습니다.`,
            `그리고 안토니오는 그동안 샤일록을 여러 번 모욕했습니다.`,
            `길에서 침을 뱉은 적도 있었습니다.`,
            `샤일록이 말했습니다.`,
            `"이번에는 이자를 안 받겠소. 그 대신 재미로 조건을 하나 걸읍시다. 갚지 못하면 당신 살 한 근을 주시오."`,
            `안토니오는 그것을 농담으로 여기고 서명했습니다.`,
            `배가 곧 돌아올 것이라고 믿었기 때문입니다.`,
            `바사니오는 그 돈으로 벨몬트에 가서 포샤와 혼인했습니다.`,
            `그런데 그때 소식이 왔습니다.`,
            `안토니오의 배가 다 가라앉았다는 것이었습니다.`,
            `그리고 샤일록이 재판을 걸었습니다.`,
            `재판이 열렸습니다.`,
            `공작이 샤일록에게 사정했습니다.`,
            `"돈을 세 배로 받고 물러서시오."`,
            `샤일록은 거절했습니다.`,
            `그리고 이렇게 말했습니다.`,
            `"유대인에게는 눈이 없습니까? 손이 없습니까? 찔리면 피가 안 납니까? 웃기면 안 웃습니까? 독을 먹이면 안 죽습니까?"`,
            `"당신들이 우리에게 하는 대로 우리가 배운 것입니다."`,
            `이것이 이 작품에서 가장 유명한 대사입니다.`,
            `그때 젊은 법률가가 하나 들어왔습니다.`,
            `사실은 포샤가 남자 옷을 입고 온 것이었습니다.`,
            `포샤가 말했습니다.`,
            `"이 문서는 유효합니다. 살 한 근을 가져가십시오."`,
            `샤일록이 칼을 들었습니다.`,
            `"다만 이 문서에는 살이라고만 적혀 있습니다. 피는 적혀 있지 않습니다."`,
            `"그러니 피는 한 방울도 흘리지 마십시오. 한 방울이라도 흘리면 당신 재산을 다 몰수합니다."`,
            `샤일록은 그 자리에 굳었습니다.`,
            `그리고 물러서겠다고 했습니다.`,
            `그런데 재판은 거기서 끝나지 않았습니다.`,
            `법정은 샤일록에게 재산의 절반을 빼앗고, 나머지도 마음대로 못 쓰게 했습니다.`,
            `그리고 종교를 바꾸라고 했습니다.`,
            `샤일록은 그것을 받아들이고 법정을 나갔습니다.`,
            `그 뒤로 그 사람은 이 작품에 다시 나오지 않습니다.`,
            `이 작품은 원래 희극으로 쓰였습니다.`,
            `그런데 요즘은 이것을 웃으며 보는 사람이 거의 없습니다.`,
            `사백 년 사이에 보는 사람이 달라진 것입니다.`
        ]
    },
    {
        num: 4,
        title: "로미오와 줄리엣",
        emoji: "🌹",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `이탈리아 베로나에 두 집안이 있었습니다.`,
            `몬터규 집안과 캐풀렛 집안이었습니다.`,
            `두 집안은 아주 오래 원수로 지냈습니다.`,
            `왜 그렇게 되었는지는 그 집안 사람들도 몰랐습니다.`,
            `너무 오래되었기 때문입니다.`,
            `길에서 만나면 하인들끼리도 칼을 뽑았습니다.`,
            `어느 날 캐풀렛 집에서 큰 잔치가 열렸습니다.`,
            `몬터규 집안의 로미오가 친구들과 함께 가면을 쓰고 몰래 들어갔습니다.`,
            `그리고 거기서 줄리엣을 보았습니다.`,
            `줄리엣은 캐풀렛 집안의 딸이었습니다.`,
            `열세 살이었습니다.`,
            `로미오는 열여섯쯤이었습니다.`,
            `두 사람은 그 자리에서 서로에게 마음이 갔습니다.`,
            `그리고 서로가 누구인지 알고 나서 얼어붙었습니다.`,
            `그날 밤 로미오는 담을 넘어 캐풀렛 집 정원으로 들어갔습니다.`,
            `줄리엣이 발코니에 나와 혼잣말을 하고 있었습니다.`,
            `"로미오, 당신은 왜 로미오인가요."`,
            `"이름이 무엇입니까. 장미를 다른 이름으로 불러도 향기는 그대로인데요."`,
            `그 말을 로미오가 아래에서 들었습니다.`,
            `이튿날 두 사람은 로렌스 신부에게 가서 몰래 혼인했습니다.`,
            `신부가 그것을 도운 까닭이 있습니다.`,
            `이 혼인으로 두 집안이 화해할지도 모른다고 생각한 것입니다.`,
            `그런데 그날 오후에 일이 났습니다.`,
            `길에서 줄리엣의 사촌 티볼트와 로미오의 친구 머큐시오가 부딪쳤습니다.`,
            `로미오가 말리려고 두 사람 사이에 들어갔습니다.`,
            `그리고 그 틈에 머큐시오가 찔렸습니다.`,
            `머큐시오는 죽어 가면서 이렇게 말했습니다.`,
            `"두 집안 다 망해 버려라."`,
            `로미오는 그때 이성을 잃었습니다.`,
            `그리고 티볼트를 찔렀습니다.`,
            `그날 로미오는 베로나에서 추방되었습니다.`,
            `한편 줄리엣의 아버지는 딸을 파리스라는 사람과 혼인시키기로 했습니다.`,
            `혼례가 사흘 뒤였습니다.`,
            `줄리엣은 로렌스 신부에게 달려갔습니다.`,
            `신부가 약을 하나 주었습니다.`,
            `그것을 마시면 마흔두 시간 동안 죽은 것처럼 보이는 약이었습니다.`,
            `계획은 이랬습니다.`,
            `줄리엣이 그것을 마시고 무덤에 옮겨지면, 로미오가 그리로 와서 깨어난 줄리엣을 데리고 떠나는 것이었습니다.`,
            `신부는 그 계획을 적은 편지를 로미오에게 보냈습니다.`,
            `그런데 그 편지를 든 사람이 가는 길에 붙잡혔습니다.`,
            `그 지방에 돌림병이 돌아서 오가는 사람을 가두어 두었기 때문입니다.`,
            `그래서 로미오는 그 편지를 받지 못했습니다.`,
            `대신 다른 소식을 들었습니다.`,
            `줄리엣이 죽었다는 소식이었습니다.`,
            `이 이야기의 마지막에 벌어진 일은 잘 알려져 있습니다.`,
            `그 뒤에 두 집안이 무덤 앞에서 만났습니다.`,
            `그리고 그날 화해했습니다.`,
            `이 작품에서 제일 무서운 것은 원수도 독약도 아닙니다.`,
            `편지 한 통이 늦은 것입니다.`
        ]
    },
    {
        num: 5,
        title: "햄릿",
        emoji: "💀",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `덴마크의 왕이 갑자기 세상을 떠났습니다.`,
            `뜰에서 낮잠을 자다가 뱀에 물렸다고 했습니다.`,
            `그리고 두 달 만에 왕비가 왕의 동생 클로디어스와 혼인했습니다.`,
            `클로디어스가 새 왕이 되었습니다.`,
            `왕자 햄릿은 그것을 견디지 못했습니다.`,
            `아버지가 돌아가신 지 두 달이었습니다.`,
            `어느 밤, 성벽을 지키던 병사들이 이상한 것을 보았습니다.`,
            `죽은 왕의 모습을 한 것이 성벽을 걷고 있었던 것입니다.`,
            `햄릿이 그 이야기를 듣고 밤에 그리로 갔습니다.`,
            `그리고 그것을 만났습니다.`,
            `그것이 이렇게 말했습니다.`,
            `"나는 뱀에 물려 죽은 것이 아니다. 네 삼촌이 내 귀에 독을 부었다."`,
            `"복수해 다오."`,
            `햄릿은 그 말을 듣고 그 자리에 주저앉았습니다.`,
            `그런데 여기서 이 작품이 다른 복수 이야기와 갈립니다.`,
            `보통 이런 이야기에서는 주인공이 곧바로 복수하러 갑니다.`,
            `햄릿은 그러지 않았습니다.`,
            `햄릿은 이렇게 생각했습니다.`,
            `저것이 정말 아버지일까.`,
            `아니면 나를 속여 삼촌을 죽이게 하려는 것일까.`,
            `내가 확인하지 않고 사람을 죽이면, 나는 삼촌과 무엇이 다른가.`,
            `그래서 햄릿은 확인하기로 했습니다.`,
            `마침 떠돌이 극단이 성에 왔습니다.`,
            `햄릿은 그 배우들에게 어떤 연극을 시켰습니다.`,
            `왕의 귀에 독을 붓는 장면이 나오는 연극이었습니다.`,
            `그리고 그 장면에서 삼촌의 얼굴을 지켜보았습니다.`,
            `클로디어스는 그 장면에서 자리를 박차고 나갔습니다.`,
            `햄릿은 그것으로 알았습니다.`,
            `그런데 그 뒤로도 햄릿은 오래 미루었습니다.`,
            `사백 년 동안 사람들이 이것을 두고 다퉜습니다.`,
            `왜 미루었는가 하는 것입니다.`,
            `겁이 많아서라고 하는 사람도 있고, 생각이 너무 많아서라고 하는 사람도 있습니다.`,
            `이런 말도 있습니다.`,
            `햄릿은 사람을 죽이는 일이 옳은지를 계속 묻고 있었다는 것입니다.`,
            `그 사이에 여러 사람이 죽었습니다.`,
            `햄릿이 커튼 뒤에 숨은 사람을 삼촌인 줄 알고 찌른 일이 있었습니다.`,
            `그 사람은 폴로니어스라는 대신이었고, 햄릿이 좋아하던 오필리아의 아버지였습니다.`,
            `오필리아는 그 뒤로 정신이 흐려졌고, 얼마 뒤 강가에서 세상을 떠났습니다.`,
            `마지막 장면에서 여러 사람이 한꺼번에 죽습니다.`,
            `햄릿도 죽습니다.`,
            `햄릿이 죽기 전에 마지막으로 한 부탁은 이것이었습니다.`,
            `친구 호레이쇼에게, 자기 이야기를 사람들에게 제대로 전해 달라는 것이었습니다.`,
            `이 작품에서 제일 유명한 대사는 이것입니다.`,
            `"사느냐 죽느냐, 그것이 문제로다."`,
            `그런데 그 말은 죽고 싶다는 말이 아닙니다.`,
            `견디는 것과 맞서는 것 가운데 어느 쪽이 옳으냐를 묻는 말입니다.`
        ]
    },
    {
        num: 6,
        title: "리어 왕",
        emoji: "👑",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `옛 브리튼에 리어라는 늙은 왕이 있었습니다.`,
            `딸이 셋이었습니다.`,
            `고너릴, 리건, 코딜리아였습니다.`,
            `리어는 나이가 들자 나라를 셋으로 나누어 주기로 했습니다.`,
            `그런데 나누기 전에 이런 것을 시켰습니다.`,
            `"너희가 나를 얼마나 사랑하는지 말해 보아라. 제일 잘 말하는 아이에게 제일 좋은 땅을 주겠다."`,
            `첫째 고너릴이 말했습니다.`,
            `"저는 아버지를 눈보다, 목숨보다, 자유보다 사랑합니다."`,
            `둘째 리건이 말했습니다.`,
            `"언니가 말한 것으로는 모자랍니다. 저는 아버지 말고는 아무것도 기쁘지 않습니다."`,
            `리어는 흡족했습니다.`,
            `그리고 막내 코딜리아를 보았습니다.`,
            `코딜리아는 아버지가 제일 아끼는 딸이었습니다.`,
            `"너는 무엇이라고 하겠느냐."`,
            `코딜리아가 말했습니다.`,
            `"드릴 말씀이 없습니다."`,
            `"뭐라고?"`,
            `"저는 자식으로서 마땅한 만큼 아버지를 사랑합니다. 그 이상도 그 이하도 아닙니다."`,
            `"저에게 남편이 생기면 그 사람에게도 마음의 절반을 줄 것입니다. 언니들처럼 아버지가 전부라고 말한다면, 그럼 언니들은 왜 혼인을 했겠습니까."`,
            `그 말은 사실 아주 정직한 말이었습니다.`,
            `그런데 리어는 그 말을 듣고 화가 났습니다.`,
            `그리고 코딜리아를 내쫓았습니다.`,
            `땅도 주지 않았습니다.`,
            `그 자리에 프랑스 왕이 와 있었습니다.`,
            `프랑스 왕이 말했습니다.`,
            `"저는 저 아가씨를 아내로 맞겠습니다. 땅이 없어도 좋습니다."`,
            `코딜리아는 프랑스로 갔습니다.`,
            `리어는 나라를 두 딸에게 나누어 주었습니다.`,
            `그리고 자기는 기사 백 명을 데리고 두 딸 집에 번갈아 지내기로 했습니다.`,
            `그런데 땅을 받고 나자 두 딸이 달라졌습니다.`,
            `첫째 집에서는 기사를 오십 명으로 줄이라고 했습니다.`,
            `그래서 둘째 집으로 갔습니다.`,
            `둘째는 스물다섯 명으로 줄이라고 했습니다.`,
            `그래서 다시 첫째에게 갔습니다.`,
            `이번에는 한 명도 안 된다고 했습니다.`,
            `리어는 그날 밤 두 딸의 집에서 다 쫓겨났습니다.`,
            `그리고 폭풍이 치는 벌판으로 나갔습니다.`,
            `그 벌판에서 리어가 미쳐 갑니다.`,
            `그런데 이 작품에서 이상한 것이 있습니다.`,
            `리어는 미쳐 가면서 처음으로 옳은 말을 하기 시작합니다.`,
            `벌판에서 리어가 이런 말을 합니다.`,
            `"헐벗은 자들아, 너희는 어디에 있느냐. 이런 밤을 어떻게 견디느냐."`,
            `"나는 이것을 너무 늦게 알았다. 왕이었을 때 나는 이런 것을 한 번도 생각한 적이 없다."`,
            `마지막에 코딜리아가 프랑스에서 군대를 이끌고 아버지를 구하러 옵니다.`,
            `그리고 두 사람이 만납니다.`,
            `그런데 그 뒤가 좋게 끝나지 않습니다.`,
            `코딜리아는 그 싸움에서 목숨을 잃고, 리어도 딸을 안은 채 세상을 떠납니다.`,
            `셰익스피어가 이 작품을 쓸 때, 원래 전해 오던 이야기에서는 결말이 좋았습니다.`,
            `코딜리아가 아버지를 구하고 다 잘되는 것이었습니다.`,
            `셰익스피어가 그것을 일부러 바꿨습니다.`,
            `그리고 그 뒤 백오십 년 동안, 영국 극장에서는 그 결말이 너무 견디기 어려워서 다시 고쳐 올렸습니다.`,
            `원래대로 올리기 시작한 것은 그 뒤의 일입니다.`
        ]
    },
    {
        num: 7,
        title: "맥베스",
        emoji: "🗡️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `스코틀랜드에 맥베스라는 장군이 있었습니다.`,
            `싸움에서 크게 이기고 돌아오는 길이었습니다.`,
            `황야에서 세 여자를 만났습니다.`,
            `그들이 이렇게 말했습니다.`,
            `"글래미스의 영주 만세."`,
            `"코더의 영주 만세."`,
            `"장차 왕이 되실 분 만세."`,
            `맥베스는 그때 글래미스의 영주였습니다.`,
            `코더의 영주는 아니었습니다.`,
            `그런데 성에 닿기도 전에 소식이 왔습니다.`,
            `왕이 맥베스를 코더의 영주로 삼았다는 것이었습니다.`,
            `그러니까 두 번째 말이 맞은 것입니다.`,
            `맥베스는 그때부터 세 번째 말을 생각하기 시작했습니다.`,
            `맥베스는 그 이야기를 아내에게 편지로 알렸습니다.`,
            `맥베스 부인은 그 편지를 읽고 곧바로 마음을 정했습니다.`,
            `며칠 뒤 던컨 왕이 맥베스의 성에 묵으러 왔습니다.`,
            `그날 밤 맥베스는 여러 번 망설였습니다.`,
            `"그분은 나를 믿고 여기 오셨소. 나는 그분의 장수이고 친척이오. 손님을 지켜야 하는데 오히려 내가······."`,
            `맥베스 부인이 말했습니다.`,
            `"그럼 그만두시오. 다만 앞으로 평생 자기가 겁쟁이인 줄 알고 사시오."`,
            `그날 밤 던컨 왕이 세상을 떠났습니다.`,
            `맥베스가 왕이 되었습니다.`,
            `그런데 그때부터가 이 작품의 본론입니다.`,
            `맥베스는 왕이 되고 나서 잠을 자지 못했습니다.`,
            `그리고 자기가 한 일을 아는 사람이 있을까 봐 무서워졌습니다.`,
            `그래서 뱅쿠오라는 친구를 없앴습니다.`,
            `그 사람도 그 예언을 함께 들었기 때문입니다.`,
            `그리고 그 뒤로 계속 사람을 없앴습니다.`,
            `한 번 시작하면 멈출 수가 없었습니다.`,
            `맥베스가 이런 말을 합니다.`,
            `"나는 피 속에 너무 깊이 들어와서, 이제 돌아가는 것이 건너가는 것만큼 힘들다."`,
            `맥베스 부인도 무너졌습니다.`,
            `밤마다 자면서 걸어 다니고, 손을 계속 씻었습니다.`,
            `"이 손에서 냄새가 안 없어져."`,
            `그러다 세상을 떠났습니다.`,
            `그 소식을 들었을 때 맥베스가 한 말이 이 작품에서 가장 유명합니다.`,
            `"인생은 걸어 다니는 그림자, 무대에서 한동안 뽐내다가 사라지는 서투른 배우, 아무 뜻도 없는 이야기."`,
            `마지막에 맬컴이 군대를 이끌고 옵니다.`,
            `그리고 맥베스는 그 싸움에서 끝납니다.`,
            `이 작품이 무서운 까닭은 괴물이 나와서가 아닙니다.`,
            `맥베스가 처음부터 못된 사람이 아니었기 때문입니다.`,
            `첫 장면에서 맥베스는 나라를 구한 장수였습니다.`
        ]
    },
    {
        num: 8,
        title: "폭풍우",
        emoji: "🌪️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `밀라노의 공작 프로스페로는 책 읽는 것을 좋아했습니다.`,
            `나라 일은 동생 안토니오에게 맡기고 서재에서 지냈습니다.`,
            `그러다 안토니오가 형의 자리를 빼앗았습니다.`,
            `프로스페로와 세 살짜리 딸 미란다를 낡은 배에 태워 바다에 띄워 보냈습니다.`,
            `두 사람은 어느 섬에 닿았습니다.`,
            `그리고 그 섬에서 열두 해를 살았습니다.`,
            `프로스페로는 그 섬에서 마법을 배웠습니다.`,
            `그 섬에는 원래 사는 것이 둘 있었습니다.`,
            `공기의 정령 에어리얼과, 캘리번이라는 이였습니다.`,
            `캘리번은 그 섬에서 태어난 이였습니다.`,
            `프로스페로가 처음 왔을 때 캘리번은 그에게 섬을 안내해 주었습니다.`,
            `물이 어디 있고 무엇을 먹어도 되는지 다 알려 주었습니다.`,
            `그런데 나중에 프로스페로는 캘리번을 부리게 되었습니다.`,
            `캘리번이 이렇게 말하는 대목이 있습니다.`,
            `"이 섬은 원래 내 것이었소. 당신이 처음 왔을 때 나는 당신에게 물이 어디 있는지 알려 주었소."`,
            `"그런데 지금 나는 이 섬에서 당신의 종이오."`,
            `이 대사 때문에 이 작품은 사백 년 뒤에 아주 다르게 읽히게 되었습니다.`,
            `배를 타고 와서 원래 살던 사람을 부리게 되는 이야기가, 그 뒤 실제로 세계 곳곳에서 일어났기 때문입니다.`,
            `그해에 프로스페로는 기회를 잡았습니다.`,
            `동생 안토니오가 탄 배가 그 섬 근처를 지나게 된 것입니다.`,
            `프로스페로는 폭풍을 일으켜 그 배를 섬에 밀어붙였습니다.`,
            `아무도 다치지 않게 했습니다.`,
            `사람들이 섬 여기저기에 흩어져 내렸습니다.`,
            `그 가운데 나폴리 왕의 아들 페르디난드가 있었습니다.`,
            `페르디난드는 미란다를 만났습니다.`,
            `미란다는 열두 해 동안 아버지와 캘리번 말고는 사람을 본 적이 없었습니다.`,
            `그래서 이렇게 말했습니다.`,
            `"오, 놀라워라. 이런 것들이 여기 있었구나. 사람이 이렇게 아름답구나."`,
            `"이런 사람들이 있는 세상이라니, 그 세상은 얼마나 멋질까."`,
            `그 말은 이 작품에서 아주 유명한 대사입니다.`,
            `그런데 그 말을 하는 순간, 미란다가 보고 있는 사람들 가운데는 자기 아버지를 배신한 자도 있었습니다.`,
            `미란다는 그것을 몰랐습니다.`,
            `마지막에 프로스페로는 모두를 한자리에 불러 모읍니다.`,
            `그리고 동생을 용서합니다.`,
            `그리고 이렇게 말합니다.`,
            `"복수보다 용서가 더 귀한 일이다."`,
            `그러고는 마법을 버립니다.`,
            `지팡이를 부러뜨려 땅에 묻고, 책을 바다에 던집니다.`,
            `이것이 셰익스피어가 혼자 쓴 마지막 작품입니다.`,
            `그래서 사람들은 프로스페로가 마법을 버리는 대목을 셰익스피어 자신의 작별로 읽기도 합니다.`,
            `이 작품의 마지막 대사는 이렇습니다.`,
            `프로스페로가 관객 쪽으로 돌아서서 이렇게 말합니다.`,
            `"이제 제 마법은 다 사라졌습니다. 저를 여기서 놓아 주십시오. 여러분의 손으로요."`,
            `그것은 박수를 쳐 달라는 말입니다.`
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
                ${artFrame('cover.png', '🎭')}
            </div>
            <div class="story-page-right">
                <h1>셰익스피어 이야기</h1>
                <p class="cover-tag">윌리엄 셰익스피어 원작</p>
                <p>사백 년 전 런던, 지붕도 조명도 없는 둥근 극장에서 해가 있는 동안만 하던 연극입니다. 여자 역은 소년 배우가 했고, 관객은 마음에 안 들면 물건을 던졌습니다.</p>
                <p>그 까다로운 관객 앞에서 쓴 서른일곱 편 가운데 일곱 편을 이야기로 옮겼습니다.</p>
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
    { q: "셰익스피어 시대 극장의 특징이 아닌 것은 무엇입니까?", choices: ["지붕이 없어 낮에만 공연했다", "배경 그림이 거의 없었다", "여자 배우가 주역을 맡았다"], answer: 2 },
    { q: "셰익스피어를 처음 아이들이 읽을 이야기로 옮긴 사람들은 누구입니까?", choices: ["찰스 램과 메리 램 남매", "찰스 디킨스", "벤 존슨"], answer: 0 },
    { q: "한여름 밤의 꿈에서 일이 꼬인 까닭은 무엇입니까?", choices: ["퍽이 엉뚱한 사람에게 꽃즙을 발라서", "요정 왕이 화가 나서", "숲에서 길을 잃어서"], answer: 0 },
    { q: "베니스의 상인에서 샤일록이 이자 대신 건 조건은 무엇입니까?", choices: ["배 한 척", "안토니오의 살 한 근", "가게"], answer: 1 },
    { q: "포샤가 재판을 뒤집은 근거는 무엇입니까?", choices: ["문서가 가짜라서", "문서에 살은 있고 피는 없어서", "돈을 대신 갚아서"], answer: 1 },
    { q: "이 책이 샤일록에 대해 함께 밝힌 것은 무엇입니까?", choices: ["그 시절 유대인은 직업과 사는 곳이 법으로 제한돼 있었다", "그가 원래 부자였다", "안토니오와 친했다"], answer: 0 },
    { q: "로미오와 줄리엣에서 계획이 어긋난 까닭은 무엇입니까?", choices: ["약이 잘못돼서", "신부의 편지를 든 사람이 돌림병 때문에 길에서 붙잡혀서", "줄리엣이 마음을 바꿔서"], answer: 1 },
    { q: "햄릿이 복수를 곧바로 하지 않고 확인부터 한 까닭은 무엇입니까?", choices: ["겁이 나서", "확인 없이 사람을 죽이면 삼촌과 다를 게 없어서", "증거를 모으려고"], answer: 1 },
    { q: "햄릿이 삼촌을 확인한 방법은 무엇입니까?", choices: ["직접 물었다", "같은 장면이 나오는 연극을 시키고 얼굴을 지켜봤다", "편지를 찾았다"], answer: 1 },
    { q: "리어 왕에서 코딜리아가 한 대답은 무엇입니까?", choices: ["아버지가 전부입니다", "자식으로서 마땅한 만큼 사랑합니다", "아무 말도 안 했다"], answer: 1 },
    { q: "리어가 벌판에서 처음으로 생각한 것은 무엇입니까?", choices: ["딸들에 대한 복수", "헐벗은 사람들이 이런 밤을 어떻게 견디는가", "나라를 되찾는 일"], answer: 1 },
    { q: "셰익스피어가 리어 왕의 결말을 어떻게 했습니까?", choices: ["전해 오던 좋은 결말을 그대로 썼다", "전해 오던 좋은 결말을 일부러 비극으로 바꿨다", "결말을 안 썼다"], answer: 1 },
    { q: "맥베스가 무서운 까닭은 무엇입니까?", choices: ["마녀가 나와서", "처음부터 못된 사람이 아니라 나라를 구한 장수였기 때문", "유령이 나와서"], answer: 1 },
    { q: "맥베스가 멈추지 못한 까닭을 스스로 뭐라고 말했습니까?", choices: ["피 속에 너무 깊이 들어와 돌아가는 것이 건너가는 것만큼 힘들다", "예언 때문이다", "아내 때문이다"], answer: 0 },
    { q: "폭풍우에서 캘리번이 한 말은 무엇입니까?", choices: ["이 섬은 원래 내 것이었고 내가 물이 어디 있는지 알려 주었다", "나를 내보내 달라", "마법을 가르쳐 달라"], answer: 0 },
    { q: "프로스페로가 마지막에 한 일은 무엇입니까?", choices: ["동생에게 복수했다", "동생을 용서하고 마법을 버렸다", "섬에 남았다"], answer: 1 }
];

function quizPage() {
    const items = QUIZ.map((item, i) => `
        <div class="quiz-item" data-qindex="${i}">
            <p class="quiz-question">${i + 1}. ${item.q}</p>
            <div class="quiz-choices">
                ${item.choices.map((c, ci) => `<button type="button" class="quiz-choice" data-choice="${ci}">${c}</button>`).join('')}
            </div>
        </div>`).join('');
    return `
        <div class="page page-quiz">
            <h2>이야기 문제</h2>
            <p class="quiz-intro-text" id="quizProgress">0 / 총 ${QUIZ.length}문항 완료</p>
            <div class="quiz-list">${items}</div>
        </div>`;
}

function endPage() {
    return `
        <div class="page page-end">
            ${artFrame('end.png', '🌪️')}
            <h2>셰익스피어 이야기를 다 읽었습니다</h2>
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
        { kind: 'quiz' },
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
        case 'quiz': return quizPage();
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
    let answeredCount = 0;
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
                answeredCount++;
                progressEl.textContent = `${answeredCount} / 총 ${QUIZ.length}문항 완료`;
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
