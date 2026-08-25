const BOOK_TITLE = "괴도 뤼팽";

const CHAPTER_LABEL = () => '';

const CHAPTERS = [
    {
        num: 1,
        title: "대서양 위의 도둑",
        emoji: "🚢",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `프로방스 호는 프랑스에서 미국으로 가는 큰 여객선이었습니다. 배는 이레째 바다 위에 있었고, 승객들은 서로 낯이 익어 있었습니다. 저녁마다 같은 사람들이 같은 자리에 앉았습니다.`,
            `그날 오후, 배에 전보가 하나 들어왔습니다. 무선 전신이라는 것이 막 쓰이기 시작한 때였습니다. 바다 한가운데로 소식이 날아온다는 것 자체가 신기한 일이었습니다. 전보에는 이렇게 적혀 있었습니다.<br>"아르센 뤼팽이 그 배에 타고 있음. 일등실 승객. 금발. 오른팔에 부상. 이름은 R로 시작함."`,
            `그 소식이 퍼지자 배 안이 발칵 뒤집혔습니다. 아르센 뤼팽은 그 무렵 프랑스에서 모르는 사람이 없는 이름이었습니다. 귀족의 저택을 털고, 은행 금고를 열고, 경찰을 여러 번 놀렸습니다.`,
            `그런데 사람을 다치게 한 적은 한 번도 없었습니다. 그리고 가난한 집은 건드리지 않았습니다. 그래서 신문마다 그 이야기를 실었고, 사람들은 그것을 재미있어했습니다.`,
            `배 안의 일등실 승객은 마흔 명쯤이었습니다. 그날부터 사람들은 서로를 훑어보기 시작했습니다. 금발이고, 오른팔이 불편해 보이고, 이름이 R로 시작하는 사람. 그런 사람이 여럿이었습니다. 팔에 붕대를 감은 사람만 셋이었습니다.`,
            `이 이야기를 적는 저도 그 배에 타고 있었습니다. 저는 그 항해에서 로장 후작이라는 젊은이와 친해졌습니다. 말이 재미있고, 아는 것이 많고, 카드를 아주 잘 치는 사람이었습니다.`,
            `그리고 넬리 언더다운이라는 아가씨가 있었습니다. 배에서 제일 눈에 띄는 사람이었습니다. 로장 후작은 그 아가씨 옆에 늘 붙어 있었습니다.`,
            `그런데 로장의 머리는 금발이었습니다. 그리고 이름이 R로 시작했습니다. 사람들이 그것을 두고 수군거렸습니다.`,
            `로장은 그 이야기를 듣고 크게 웃었습니다.<br>"제가 뤼팽이라면 좋겠군요. 그러면 여러분 지갑이 벌써 다 비었을 겁니다."`,
            `그날 밤 일이 났습니다. 배 안에서 도난 사건이 여러 건 일어난 것입니다. 보석과 시계와 지갑이 사라졌습니다. 잠긴 가방 속에서 없어진 것도 있었습니다.`,
            `이튿날 아침 승객들이 모여 소리를 질렀습니다. 선장이 배를 다 뒤졌지만 아무것도 나오지 않았습니다.`,
            `그리고 이틀 뒤 배가 뉴욕에 닿았습니다.`,
            `부두에 프랑스 경찰의 가니마르 형사가 나와 있었습니다. 가니마르는 뤼팽을 여러 번 잡으려다 놓친 사람이었습니다. 그 이름만 들어도 얼굴이 굳는 사람이었습니다. 승객들이 하나씩 내렸습니다.`,
            `가니마르는 트랩 아래 서서 얼굴을 하나하나 보았습니다. 그러다 한 사람 앞에서 손을 들었습니다.<br>"아르센 뤼팽 씨."`,
            `사람들이 돌아보았습니다. 가니마르가 붙잡은 사람은 로장 후작이었습니다. 로장은 잠깐 아무 말도 하지 않았습니다. 그러다 가볍게 어깨를 으쓱했습니다.<br>"들켰군요."`,
            `그리고 넬리 아가씨 쪽을 보았습니다. 넬리는 얼굴이 하얘져서 서 있었습니다. 두 사람의 눈이 잠깐 마주쳤습니다. 그 손에 뤼팽이 몇 시간 전에 건네준 사진기가 들려 있었습니다.`,
            `그 안에 훔친 보석이 다 들어 있었습니다. 넬리는 그것을 알고 있었습니다.`,
            `세관 앞에서 넬리는 그 사진기를 손에 든 채 한참 서 있었습니다. 그리고 검사대를 그냥 지나쳤습니다.`,
            `배에서 내려 사람들이 다 흩어진 뒤, 넬리는 부두 끝으로 가서 그 사진기를 바다에 던졌습니다. 뤼팽은 경찰차 창으로 그것을 보았습니다. 그리고 웃었습니다.`
        ]
    },
    {
        num: 2,
        title: "감옥에서 성을 털다",
        emoji: "🏰",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `노르망디에 말라키 성이라는 오래된 성이 있었습니다. 강 한가운데 바위섬 위에 세워진 성이었습니다. 물이 성벽 밑까지 차 있었습니다. 뭍과는 다리 하나로만 이어져 있었습니다.`,
            `그 성의 주인은 카오른 남작이라는 사람이었습니다. 아주 인색한 사람이었습니다. 하인도 몇 두지 않았습니다. 그런데 그 성 안에는 대단한 것들이 있었습니다.`,
            `루벤스의 그림 넉 점, 유명한 화가가 만든 벽걸이 천, 그리고 옛날 은그릇과 보석들이었습니다.`,
            `어느 날 남작에게 편지가 왔습니다.<br>"남작께. 귀댁의 화랑에 있는 루벤스 넉 점과 벽걸이 천, 그리고 은그릇 일체를 보내 주시기 바랍니다. 구월 이십칠 일 밤에 가지러 가겠습니다. 아르센 뤼팽 올림."`,
            `남작은 그 편지를 보고 웃었습니다. 왜냐하면 그때 아르센 뤼팽은 감옥에 있었기 때문입니다. 상테 감옥에 갇혀 재판을 기다리고 있었습니다. 그런데 며칠 뒤 다시 편지가 왔습니다.<br>"남작께. 아직 짐을 싸지 않으셨더군요. 서두르십시오."`,
            `남작은 그제야 무서워졌습니다. 그는 경찰에 알렸습니다. 그런데 지방 경찰은 대수롭지 않게 여겼습니다.<br>"뤼팽은 감옥에 있습니다."`,
            `남작은 파리로 편지를 썼습니다. 가니마르 형사에게 보낸 것이었습니다. 가니마르는 그때 일을 쉬고 있었는데, 그 편지를 받고 짐을 쌌습니다.`,
            `구월 이십칠 일 저녁, 가니마르가 부하 둘을 데리고 성에 왔습니다. 세 사람은 성 안을 다 살폈습니다. 지하실까지 내려가 보았습니다. 다리에 보초를 세우고, 창을 잠그고, 화랑 문에 봉인을 붙였습니다. 봉인에 도장까지 찍었습니다. 그리고 밤새 화랑 앞에 앉아 지켰습니다. 셋이 번갈아 눈을 붙였습니다.`,
            `아무 일도 없었습니다. 아침이 되어 세 사람이 봉인을 뜯고 화랑에 들어갔습니다. 벽이 비어 있었습니다. 못 자국만 남아 있었습니다.`,
            `루벤스 넉 점도, 벽걸이 천도, 은그릇도 다 사라졌습니다. 문은 봉인된 채였고, 창은 잠긴 채였습니다. 가니마르는 그 자리에 주저앉을 뻔했습니다. 밤새 문 앞에 앉아 있었기 때문입니다.`,
            `수사는 여러 날 이어졌습니다. 그러다 이런 것이 밝혀졌습니다. 사건이 나기 두 달 전에, 남작이 하인 둘을 새로 들였습니다. 그 두 사람은 소개장이 아주 훌륭했습니다. 그리고 그 두 사람은 사건 다음 날 사라졌습니다.`,
            `또 한 가지가 있었습니다. 그 성에는 지하로 이어지는 옛날 통로가 있었습니다. 수백 년 전에 만든 것인데, 그 성 사람들도 잊고 있었습니다. 그것을 어떻게 알아냈을까요.`,
            `가니마르가 상테 감옥으로 뤼팽을 찾아갔습니다.`,
            `"당신이 한 짓이오?"<br>"저는 여기 있었습니다."<br>"그건 아오. 그러니까 묻는 거요."`,
            `뤼팽이 웃었습니다.<br>"형사님, 어떤 일은 그 자리에 있으면 오히려 못 합니다."<br>그러고는 이렇게 덧붙였습니다.<br>"그런데 그 남작님 말입니다. 그 성에 사는 마을 사람들에게 소작료를 얼마나 받는지 한번 알아보시지요."`,
            `가니마르는 그 말을 흘려들었습니다. 그런데 나중에 알아보았습니다. 마을 사람들을 하나씩 만나 물어보았습니다. 그리고 아무에게도 그 이야기를 하지 않았습니다.`
        ]
    },
    {
        num: 3,
        title: "탈옥",
        emoji: "🔓",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `아르센 뤼팽은 감옥에서 신문에 나는 사람이 되었습니다. 기자들이 그 이야기를 날마다 실었습니다. 뤼팽이 무엇을 먹었는지까지 기사가 되었습니다. 그런데 뤼팽이 어느 날 이런 말을 흘렸습니다.<br>"저는 재판을 받으러 나가지 않을 겁니다."`,
            `그 말이 신문에 실렸습니다. 감옥이 발칵 뒤집혔습니다. 간수를 두 배로 늘리고, 방을 옮기고, 하루에 몇 번씩 몸수색을 했습니다. 면회도 못 하게 했습니다.`,
            `그런데 이상한 일이 벌어졌습니다. 뤼팽이 앓기 시작한 것입니다. 밥을 먹지 못했고, 살이 빠졌고, 얼굴이 창백해졌습니다. 한 달 만에 아주 다른 사람이 되었습니다.`,
            `의사가 여러 번 다녀갔습니다.<br>"이대로 두면 재판까지 못 갑니다."`,
            `재판 날이 왔습니다. 뤼팽은 들것에 실려 법정으로 갔습니다. 혼자 앉아 있지도 못했습니다. 사람들이 그 몰골을 보고 놀랐습니다. 신문에서 보던 얼굴이 아니었습니다.`,
            `재판장이 물었습니다.<br>"이름을 대시오."<br>"보드뤼입니다. 데지레 보드뤼."`,
            `법정이 술렁였습니다.<br>"당신은 아르센 뤼팽 아니오?"<br>"저는 뤼팽이 누군지도 모릅니다."`,
            `그 남자는 자기가 잡혀 온 이유를 모르겠다고 했습니다. 배가 고파서 빵을 훔쳤는데 갑자기 이런 데 와 있다는 것이었습니다. 말투도 배운 데 없는 사람의 말투였습니다. 법정에서는 그 말을 믿지 않았습니다. 그런데 문제가 하나 있었습니다.`,
            `그 사람의 몸을 재어 보니 뤼팽의 기록과 맞지 않았습니다. 키가 달랐고, 귀 모양이 달랐고, 손가락 길이가 달랐습니다. 그때는 사람의 몸을 재서 신원을 확인하는 방법을 쓰던 시절이었습니다.`,
            `가니마르가 불려 나왔습니다.<br>"이 사람이 뤼팽입니까?"<br>가니마르는 그 얼굴을 한참 보았습니다. 그리고 이렇게 말했습니다.<br>"······모르겠습니다."`,
            `그것이 가니마르가 평생 한 말 가운데 가장 아픈 말이었습니다. 그 한마디로 재판이 무너졌습니다. 재판은 미뤄졌습니다. 그리고 데지레 보드뤼는 증거 부족으로 풀려났습니다.`,
            `그날 그 사람은 감옥 문을 나섰습니다. 가니마르가 뒤를 밟았습니다. 보드뤼는 하루 종일 파리 시내를 걸었습니다. 갈 데가 없는 사람처럼 걸었습니다.`,
            `빵집 앞에서 서성이고, 벤치에 앉아 졸았습니다. 밤이 되자 어느 다리 아래로 들어가 잤습니다.`,
            `가니마르는 사흘을 따라다녔습니다. 그러다 나흘째 되는 날, 보드뤼가 갑자기 사라졌습니다.`,
            `그날 저녁 가니마르의 집에 편지가 왔습니다.<br>"형사님, 사흘 동안 고생하셨습니다. 다리 아래는 참 춥더군요. 그리고 한 가지 알려 드리겠습니다. 감옥에서 앓는 척하는 것은 어렵지 않습니다. 어려운 것은 한 달 동안 밥을 안 먹는 것입니다. 저는 그 한 달 동안 정말로 굶었습니다. 몸을 줄여 놓지 않으면 재는 것이 맞아떨어지니까요. 아르센 뤼팽 올림."`,
            `가니마르는 그 편지를 읽고 오래 앉아 있었습니다. 그리고 이렇게 중얼거렸습니다.<br>"저놈은 한 달을 굶었구나."`
        ]
    },
    {
        num: 4,
        title: "기차 안의 사람",
        emoji: "🚂",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `어느 여름날 아침, 저는 파리에서 루앙으로 가는 기차를 탔습니다. 그때 그 노선의 객차는 칸마다 따로 떨어져 있었습니다. 한번 타면 다음 역까지 밖으로 나갈 수 없었습니다. 옆 칸으로 넘어갈 수도 없었습니다.`,
            `제가 탄 칸에는 저 혼자였습니다. 기차가 막 떠나려는데 사람이 하나 뛰어들어 왔습니다. 키가 크고, 옷차림이 좋고, 나이는 마흔쯤 되어 보였습니다. 짐은 작은 가방 하나뿐이었습니다.`,
            `그 사람은 자리에 앉아 신문을 폈습니다. 그런데 자꾸 창밖을 보았습니다. 그리고 제가 볼 때마다 눈을 피했습니다. 신문은 한 쪽도 넘기지 않았습니다.`,
            `저는 그날 아침 신문에서 읽은 기사가 생각났습니다. 이레 전에 이 노선에서 사건이 하나 있었습니다. 기차 칸 안에서 사람이 하나 세상을 떠났고, 그 사람의 돈이 사라졌습니다.`,
            `범인은 잡히지 않았습니다. 그런데 그날 신문에는 이런 것이 실려 있었습니다. 그 범인의 인상착의였습니다. 키가 크고, 마흔쯤 되었고, 갈색 눈에 옷차림이 좋다고 했습니다.`,
            `저는 앞에 앉은 사람을 보았습니다. 그리고 등에 땀이 났습니다.`,
            `다음 역까지 두 시간이었습니다. 그 두 시간 동안 저는 여러 가지를 생각했습니다. 비상 줄을 당길까. 그런데 잘못 당기면 벌금을 물고 망신을 당합니다.`,
            `그리고 제가 착각한 것일 수도 있었습니다. 저는 그 사람을 계속 지켜보았습니다. 그러다 그 사람이 잠든 것 같았습니다.`,
            `저는 아주 천천히 일어나 짐칸에서 제 가방을 내렸습니다. 그리고 그 안에서 무엇이든 꺼내려고 했습니다.`,
            `그때 그 사람이 눈을 떴습니다. 저는 그 사람과 눈이 마주쳤습니다. 그리고 그 순간 그 사람이 웃었습니다. 놀라는 기색이 하나도 없었습니다.`,
            `"선생, 저를 어떻게 하실 생각입니까."<br>"······."<br>"신문을 읽으셨군요."`,
            `저는 아무 말도 하지 못했습니다.`,
            `그 사람이 말했습니다.<br>"제 사정을 말씀드리지요. 저는 그 사람이 아닙니다. 그런데 지금 경찰에 붙잡히면 곤란한 사람입니다."<br>"그럼 누구십니까."<br>"이름은 말씀 안 드리겠습니다."`,
            `기차가 다음 역에 가까워졌습니다. 그 사람이 이렇게 말했습니다.<br>"선생께 부탁이 하나 있습니다. 역에 내리시거든 저를 못 봤다고 해 주십시오."<br>"왜 그래야 합니까."<br>"이유는 없습니다. 그냥 부탁입니다."`,
            `기차가 섰습니다. 그리고 승강장에 경찰이 서 있었습니다. 저는 내렸습니다.`,
            `경찰이 물었습니다.<br>"그 칸에 누가 있었습니까?"`,
            `저는 잠깐 아무 말도 하지 못했습니다. 그러다 이렇게 말했습니다.<br>"저 혼자였습니다."`,
            `왜 그렇게 말했는지는 저도 지금까지 모르겠습니다.`,
            `그런데 그 뒤에 이런 일이 있었습니다. 기차가 떠난 뒤, 그 다음 역에서 진짜 범인이 붙잡혔습니다.`,
            `제가 탄 칸의 그 사람이 그자를 묶어서 짐칸에 밀어 넣어 두었던 것입니다. 제가 자리에서 일어나 있던 그 잠깐 사이에 한 일이었습니다. 그리고 좌석 위에 명함이 한 장 놓여 있었습니다. 아르센 뤼팽이라고 적혀 있었습니다.`
        ]
    },
    {
        num: 5,
        title: "하트 일곱",
        emoji: "🃏",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `어느 밤 저는 집에 돌아와 서재에 들어갔다가 걸음을 멈췄습니다. 제 책상 위에 카드가 한 장 놓여 있었습니다. 하트 일곱이었습니다. 놀이용 카드 한 장이었습니다. 그런데 그 카드에 이상한 것이 있었습니다.`,
            `일곱 개의 하트 무늬 가운데 일곱 군데에 바늘로 구멍이 뚫려 있었습니다. 불빛에 비춰야 겨우 보이는 구멍이었습니다. 저는 그것을 서랍에 넣어 두었습니다. 그리고 잊어버렸습니다.`,
            `그런데 여러 달 뒤에 사건이 하나 났습니다.`,
            `어느 발명가가 사라진 것입니다. 온 신문이 그 이야기로 시끄러웠습니다. 이름은 루이 라콩브라고 했습니다. 그 사람은 잠수함의 설계도를 만들고 있었습니다. 물속으로 다니는 배였습니다.`,
            `그때는 나라마다 그런 것을 몹시 탐내던 시절이었습니다. 먼저 가지는 나라가 바다를 쥐게 되기 때문입니다. 라콩브는 어느 부자의 집에서 지내며 연구했습니다. 방 하나를 통째로 실험실로 쓰고 있었습니다. 그 부자가 돈을 대 주었기 때문입니다. 그런데 어느 날 라콩브가 사라졌습니다.`,
            `설계도도 함께 사라졌습니다. 종이 한 장 남지 않았습니다. 그리고 그 부자는 얼마 뒤 큰돈을 벌었습니다.`,
            `저는 그 사건 기사를 읽다가 무언가 생각이 났습니다.`,
            `서랍을 열어 그 카드를 꺼냈습니다. 여러 달 만에 다시 든 것이었습니다. 구멍이 일곱 개였습니다. 저는 그 카드를 불빛에 비춰 보았습니다. 그리고 종이에 대고 구멍 자리를 찍어 보았습니다. 연필 끝으로 하나씩 찍었습니다.`,
            `점 일곱 개가 나왔습니다. 그 점들을 이어 보았습니다. 자를 대고 이어도 보았습니다. 아무것도 아니었습니다.`,
            `저는 그것을 며칠 들여다보았습니다. 밥을 먹으면서도 들여다보았습니다. 그러다 어느 날 밤, 그 카드를 뒤집어 보았습니다. 앞뒤가 뒤집히면 자리도 뒤집힙니다. 그리고 알았습니다.`,
            `그 점들은 어떤 방의 벽에 있는 무늬 자리를 표시한 것이었습니다. 그 방은 라콩브가 연구하던 방이었습니다.`,
            `저는 그날 밤 그 집으로 갔습니다. 그리고 담을 넘었습니다.`,
            `이 이야기를 적는 저는 도둑이 아닙니다. 평생 남의 담을 넘어 본 적이 없었습니다. 그런데 그날은 그렇게 했습니다. 그 방에 들어가 벽의 무늬를 찾았습니다. 벽지에 같은 무늬가 죽 늘어서 있었습니다.`,
            `일곱 번째 자리를 눌렀습니다. 손끝에 딱 하는 느낌이 왔습니다. 벽이 열렸습니다. 손바닥만 한 문이 안쪽으로 밀려 들어갔습니다. 그 안에 서류 뭉치가 들어 있었습니다. 먼지가 앉아 있었습니다.`,
            `라콩브의 설계도였습니다. 그리고 그 위에 종이가 한 장 얹혀 있었습니다.<br>"저는 이것을 두 해 전에 찾아냈습니다. 그런데 가져가지 않았습니다. 이것을 가져가면 어느 나라가 이것으로 배를 만들 것이고, 그러면 사람이 많이 죽습니다. 저는 도둑이지 그런 사람은 아닙니다. 선생이 이것을 찾아내시면 정부에 넘기지 마시고 태우십시오. 아르센 뤼팽."`,
            `저는 그 종이를 오래 들여다보았습니다. 그리고 그 설계도를 어떻게 했는지는 여기 적지 않겠습니다. 다만 한 가지는 적어 두겠습니다.`,
            `라콩브라는 사람은 끝내 돌아오지 않았습니다. 어디로 갔는지 아무도 모릅니다. 그리고 그 부자는 그 뒤에 벌을 받았습니다. 라콩브를 어떻게 했는지가 밝혀진 것입니다. 뤼팽이 그렇게 만들었습니다.`
        ]
    },
    {
        num: 6,
        title: "검은 진주",
        emoji: "⚫",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `파리의 어느 낡은 아파트 이층에, 앙드리요 백작 부인이라는 노부인이 살았습니다. 젊었을 때는 궁전에 드나들던 사람이었습니다. 그런데 이제는 늙고 가난했습니다. 난방도 제대로 못 하고 지냈습니다.`,
            `남은 것은 하나뿐이었습니다. 검은 진주였습니다. 아주 크고 귀한 것이라 값을 매길 수 없다고 했습니다. 그런 진주가 세상에 몇 개 없다고 했습니다.`,
            `부인은 그것을 팔지 않았습니다. 그 진주를 볼 때마다 젊었을 때가 생각났기 때문입니다. 부인은 그것을 아주 잘 숨겨 두었습니다. 어디에 두었는지는 아무에게도 말하지 않았습니다.`,
            `어느 겨울 아침, 그 집에서 부인이 세상을 떠난 채 발견되었습니다. 그리고 검은 진주가 없어졌습니다. 경찰이 조사에 나섰습니다.`,
            `그 집은 아주 이상했습니다. 문이 안에서 잠겨 있었습니다. 창도 잠겨 있었습니다. 그런데 방 안이 뒤집혀 있었습니다. 옷장이 다 열려 있고, 서랍이 바닥에 쏟아져 있었습니다.`,
            `경찰은 그 집 하녀를 의심했습니다. 그런데 하녀는 그날 밤 다른 데 있었습니다. 그리고 아래층 사람들도 조사를 받았습니다.`,
            `아래층에는 젊은 남자가 하나 살았습니다. 그 사람이 며칠 뒤 이사를 갔습니다.`,
            `그 뒤로 여섯 달이 지났습니다. 그러다 어느 날 가니마르 형사가 저를 찾아왔습니다.<br>"그 검은 진주 사건 기억하시오?"<br>"기억합니다."<br>"오늘 그 진주가 어느 보석상에 나왔소."`,
            `경찰이 그 보석상을 지켰습니다. 가게 안팎에 사람을 심어 두었습니다. 그리고 진주를 팔러 온 사람을 붙잡았습니다. 평범하게 생긴 남자였습니다. 이름은 다니그레라고 했습니다.`,
            `그런데 그 사람이 이렇게 말했습니다.<br>"저는 훔치지 않았습니다. 저는 그 방에 들어갔을 때 부인이 이미······."`,
            `그리고 이런 이야기를 했습니다. 그날 밤 그 사람은 그 집에 도둑질을 하러 들어갔습니다. 그런데 방에 들어가 보니 부인이 이미 세상을 떠나 있었습니다. 그리고 방이 이미 뒤집혀 있었습니다. 서랍이 다 열려 있었습니다.`,
            `자기보다 먼저 누가 다녀간 것이었습니다. 그 사람은 무서워서 나가려다가, 나가기 전에 방을 한 번 둘러보았습니다. 그리고 침대 밑을 보았습니다.`,
            `거기에 진주가 떨어져 있었습니다. 먼저 다녀간 사람이 못 찾은 것을, 나중에 온 사람이 우연히 찾은 것이었습니다.`,
            `경찰은 그 말을 믿지 않았습니다. 그런데 그 뒤에 이상한 일이 있었습니다. 재판을 앞두고 신문에 편지가 하나 실렸습니다.<br>"그날 밤 그 방을 먼저 뒤진 것은 저입니다. 저는 진주를 못 찾고 나왔습니다.<br>그리고 부인께서 그 전에 이미 돌아가셨다는 것도 밝혀 둡니다.<br>저는 그날 아무도 해치지 않았습니다. 다니그레도 마찬가지입니다. 그 사람은 도둑이지 그 이상은 아닙니다. 아르센 뤼팽 올림."`,
            `그 편지 때문에 다니그레는 도둑질에 대해서만 벌을 받았습니다.`,
            `가니마르는 그 신문을 접으면서 이렇게 말했습니다.<br>"저놈은 자기가 못 훔친 것까지 편지를 쓰는군."<br>그러고는 이렇게 덧붙였습니다.<br>"그런데 저 편지가 없었으면 그 사람은 훨씬 무거운 벌을 받았을 거요."`
        ]
    },
    {
        num: 7,
        title: "왕비의 목걸이",
        emoji: "💎",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `드뢰수비즈 백작 집안에는 대대로 내려오는 목걸이가 있었습니다. 백여 년 전 왕비의 것이었다고 전해지는 목걸이였습니다. 온 나라가 아는 이야기가 붙어 있는 물건이었습니다.`,
            `실제로는 그 목걸이가 조각조각 팔려 나갔고, 이 집에 남은 것은 그 가운데 일부를 다시 엮은 것이었습니다. 그래도 대단한 것이었습니다. 값을 매기기 어려운 물건이었습니다.`,
            `그 집에는 아이가 하나 있었습니다. 앙리에트라는 여자의 아들이었습니다. 앙리에트는 백작 부인과 어릴 때 함께 자란 사람이었는데, 형편이 어려워져 그 집 다락방에 얹혀살고 있었습니다. 그 아이의 이름은 라울이었습니다. 집 안을 마음대로 뛰어다니던 아이였습니다. 여섯 살이었습니다.`,
            `어느 무도회 날 밤, 백작 부인이 그 목걸이를 걸었습니다. 그날 그 목걸이를 본 사람이 수십 명이었습니다. 그리고 밤에 돌아와 목걸이를 벗어 화장대 위에 두었습니다. 문을 안에서 잠그고 잤습니다.`,
            `이튿날 아침, 목걸이가 없어졌습니다. 방은 잠겨 있었습니다. 창은 안에서 걸려 있었고, 밖은 삼층 높이였습니다. 굴뚝은 사람이 들어갈 수 없을 만큼 좁았습니다.`,
            `아무리 조사해도 답이 나오지 않았습니다. 경찰도 손을 들었습니다. 백작은 집안 사람들을 다 의심했습니다. 하인들을 하나씩 불러 캐물었습니다. 특히 다락방에 사는 앙리에트를 의심했습니다. 그 사람이 가난했기 때문입니다.`,
            `증거는 하나도 없었습니다. 그런데 백작은 그 모자를 집에서 내보냈습니다. 앙리에트는 아무 말도 하지 않고 아들을 데리고 나갔습니다. 짐이라고는 보따리 하나였습니다.`,
            `그 뒤로 여러 해가 지났습니다. 백작 부인은 해마다 앙리에트에게 돈을 조금씩 보냈습니다. 미안한 마음이 있었기 때문입니다. 그런데 어느 해부터 앙리에트가 그 돈을 사양했습니다.`,
            `그러면서 편지에 이렇게 적었습니다.<br>"이제 형편이 폈습니다. 제 아들이 벌어 옵니다."`,
            `그리고 그 뒤로 소식이 끊겼습니다.`,
            `이십 년쯤 지난 어느 날, 백작 부인에게 소포가 하나 왔습니다. 그 안에 그 목걸이가 들어 있었습니다. 잃어버렸던 그 목걸이였습니다. 그리고 쪽지가 하나 있었습니다.<br>"부인. 이것을 돌려드립니다. 그리고 앙리에트는 이 일과 아무 상관이 없었다는 것을 밝힙니다. 그 사람은 이십 년 동안 도둑으로 몰린 채 살았고, 그것을 자기 아들에게도 말하지 않았습니다."<br>"그날 밤 그 방에 들어간 것은 여섯 살짜리 아이였습니다. 굴뚝이 좁아서 어른은 못 들어가지만 여섯 살은 들어갑니다. 그 아이는 그것이 무슨 짓인지도 몰랐습니다."<br>"제가 그 아이입니다. 아르센 뤼팽 올림."`,
            `백작 부인은 그 쪽지를 오래 들고 있었습니다. 몇 번을 다시 읽었습니다. 그리고 백작에게 보여 주었습니다. 백작은 그것을 읽고 아무 말도 하지 못했습니다. 쪽지를 든 손이 떨렸습니다.`,
            `그 사람은 이십 년 전에 증거 하나 없이 사람을 내쫓았던 것입니다. 그 뒤로 이십 년 동안 한 번도 그 일을 다시 생각해 보지 않았습니다. 앙리에트는 그보다 몇 해 전에 세상을 떠난 뒤였습니다.`,
            `쪽지의 마지막에는 이런 줄이 있었습니다.<br>"저는 그 목걸이를 이십 년 동안 팔지 않았습니다. 팔면 어머니가 정말로 도둑의 어머니가 되기 때문입니다."`
        ]
    },
    {
        num: 8,
        title: "숄메스 선생, 한발 늦다",
        emoji: "🕵️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `여기서 한 가지를 먼저 말해 두어야 합니다. 이 이야기를 쓴 모리스 르블랑은 처음에 영국의 유명한 탐정 이름을 그대로 썼습니다. 그런데 그 탐정을 만든 작가가 항의를 했습니다. 남의 이름을 함부로 썼다는 것이었습니다. 그래서 이름을 바꿨습니다.`,
            `셜록 홈스를 에를로크 숄메스로, 왓슨을 윌슨으로요. 이름만 살짝 비틀어 놓은 것입니다. 소리 내어 읽으면 거의 같습니다. 누구를 말하는지는 그 시절 독자도 다 알았습니다.`,
            `이야기는 이렇습니다. 파리 근처 크로종이라는 곳에 오래된 성이 하나 있었습니다. 몇백 해 된 성이었습니다. 그 성의 새 주인이 수리를 하다가, 이상한 것을 발견했습니다. 벽을 헐다가 나온 것이었습니다.`,
            `옛날 유물이 잔뜩 나온 것입니다. 그리고 며칠 뒤 그 유물이 몽땅 사라졌습니다. 사라진 방법이 이상했습니다. 방문은 잠겨 있었고, 창밖은 절벽이었습니다.`,
            `주인은 영국에서 에를로크 숄메스 선생을 불렀습니다. 숄메스는 조수 윌슨과 함께 왔습니다. 숄메스는 그 방에 들어가 삼십 분을 있었습니다. 그리고 나와서 이렇게 말했습니다.<br>"저는 이 일을 맡겠습니다. 다만 조건이 있습니다. 아무도 저를 따라다니지 마십시오."`,
            `숄메스는 이틀 동안 그 고장을 돌아다녔습니다. 그리고 사흘째 되는 날 아침, 이렇게 말했습니다.<br>"물건은 오늘 오후 세 시에 파리 북역에서 짐칸에 실려 나갑니다. 상자에는 다른 이름이 적혀 있을 겁니다."`,
            `사람들이 놀랐습니다. 숄메스는 그것을 어떻게 알아냈는지 말하지 않았습니다. 묻는 사람에게 대답도 하지 않았습니다.`,
            `그날 오후, 경찰이 파리 북역을 지켰습니다. 그리고 세 시에 그 상자를 찾아냈습니다. 상자를 열자 안에 유물이 다 들어 있었습니다. 하나도 빠지지 않았습니다. 그리고 그 위에 종이가 한 장 있었습니다.`,
            `"숄메스 선생께. 선생이 도착하신 날 저녁, 저는 선생이 무엇을 볼지 다 알았습니다. 그래서 선생이 알아내실 자리에 물건을 두었습니다. 선생이 아니었으면 이 물건들은 개인 수집가에게 팔려 나갔을 겁니다. 저는 그것이 싫었습니다."<br>"이것은 이 나라 땅에서 나온 것이니 박물관에 있어야 합니다. 그런데 제가 그렇게 하면 아무도 믿지 않습니다. 그래서 선생이 찾아내신 것으로 해 주십시오."<br>"선생과 겨루어 보고 싶었는데 그러지 못해 아쉽습니다. 다음에는 제대로 하지요. 아르센 뤼팽 올림."`,
            `숄메스는 그 종이를 다 읽고 접었습니다.<br>윌슨이 물었습니다.<br>"선생님, 저희가 진 겁니까?"<br>"물건은 찾았네."<br>"그래도 저 사람이 시킨 대로 한 것 아닙니까."`,
            `숄메스는 잠깐 아무 말도 하지 않았습니다. 그리고 이렇게 말했습니다.<br>"윌슨, 나는 저 사람을 좋아하지 않네. 남의 것을 가져가는 사람은 도둑일세. 그건 어떤 이유를 대도 마찬가지일세."<br>"그런데요?"<br>"그런데 오늘 저 물건들이 박물관으로 가네."<br>그러고는 모자를 썼습니다.<br>"윌슨, 세상은 우리가 배운 것보다 조금 더 복잡하네."`,
            `그 뒤로 두 사람은 여러 번 다시 부딪쳤습니다. 이긴 적도 있고 진 적도 있습니다. 그런데 두 사람이 처음 마주친 것은 이날이었습니다. 그 뒤로 여러 편에 걸쳐 두 사람이 겨룹니다. 그리고 이날 두 사람은 얼굴도 보지 못했습니다.`
        ]
    }
];
/* ── 쪽 나누기 ─────────────────────────────────────────
   그림은 쪽 위쪽에 가로로 꽉 차게 얹고 그 아래를 글로 채운다.
   그러니 그림이 있는 펼침면에도 양쪽 쪽에 다 글이 들어간다.
   다만 그림이 얹힌 쪽은 그림 높이만큼 글이 적게 들어간다.
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

    // 그림처럼 위쪽 여백이 음수인 것도 있으므로 위아래 여백을 다 셈한다.
    const contentHeight = () => [...col.children].reduce((h, el) => {
        const s = getComputedStyle(el);
        return h + el.getBoundingClientRect().height
            + (parseFloat(s.marginTop) || 0) + (parseFloat(s.marginBottom) || 0);
    }, 0);

    col.innerHTML = '<h2>제목</h2>';
    const headHeight = contentHeight();

    // 그림이 얹힌 쪽은 그림 높이만큼 글이 적게 들어간다. 그 높이를 미리 재 둔다.
    // 그림 파일이 없어도 자리는 같으므로, 파일이 뒤에 들어와도 쪽이 밀리지 않는다.
    col.innerHTML = '<div class="story-art-top"><div class="art-frame"></div></div>';
    const artHeight = contentHeight();
    col.innerHTML = '';

    return {
        // 창이 아직 크기를 갖지 못한 채 열리면 잰 값이 0이 된다. 그때는 어림값으로 버틴다.
        usable: measured > 40 ? measured : 620,
        headHeight: headHeight > 0 ? headHeight : 45,
        artHeight: artHeight > 40 ? artHeight : 300,
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
        // 대화는 줄을 바꿀 때마다 한 칸 들여 쓴다. 국어 표기 규칙이다.
        // 첫 줄만 들여쓰는 text-indent로는 안 되므로 줄 앞에 한 칸짜리 자리를 넣는다.
        // 쪽 끝에 걸린 <br>는 빈 줄만 만드니 떼어 낸다.
        inner = inner.replace(/(<br\s*\/?>)+\s*$/i, '')
            .replace(/<br\s*\/?>/gi, '<br><span class="ln"></span>');
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
function fillPages(segs, caps, headHtml) {
    const pageHeight = (a, b, first) => PROBE.measure((first ? headHtml : '') + runHtml(segs, a, b));
    const ranges = [];
    let i = 0;
    for (let p = 0; p < caps.length; p++) {
        const rest = caps.length - p - 1;
        if (rest === 0) { ranges.push([i, segs.length]); break; }
        // 남은 글을 남은 쪽들의 크기에 비례해 나눈다. 그래야 쪽마다 고르게 찬다.
        // 꽉꽉 채워 넘기면 장의 마지막 펼침면이 거의 비어 버린다.
        // 그림이 얹힌 쪽은 담을 수 있는 높이가 작으므로 그만큼 적게 가져간다.
        const remainingH = pageHeight(i, segs.length, p === 0);
        let capSum = 0, capRest = 0;
        for (let q = p; q < caps.length; q++) capSum += caps[q];
        for (let q = p + 1; q < caps.length; q++) capRest += caps[q];
        // 뒤쪽 쪽들에 남은 글이 다 안 들어가면 이번 쪽이 그만큼 더 가져가야 한다.
        const share = remainingH * caps[p] / capSum;
        const room = Math.min(caps[p], Math.max(remainingH - capRest, share));
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

    // 조각 단위로 끊다 보면 마지막 쪽에 넘치는 만큼이 남을 수 있다.
    // 뒤에서부터 훑어, 넘치는 쪽의 앞머리를 한 조각씩 앞 쪽으로 밀어 준다.
    for (let p = caps.length - 1; p > 0; p--) {
        while (ranges[p][1] - ranges[p][0] > 1 &&
               pageHeight(ranges[p][0], ranges[p][1], false) > caps[p]) {
            const prev = ranges[p - 1];
            if (pageHeight(prev[0], prev[1] + 1, p - 1 === 0) > caps[p - 1]) break;
            prev[1]++;
            ranges[p][0]++;
        }
    }
    return ranges;
}

function paginateChapter(ch, chIndex) {
    const segs = CHAPTER_SEGS[chIndex];
    const arts = (ch.art && ch.art.length) ? ch.art : [];
    const { usable, headHeight, artHeight } = PROBE;
    const headHtml = `<h2>${CHAPTER_LABEL(ch.num)}${ch.title}</h2>`;
    const totalH = PROBE.measure(runHtml(segs, 0, segs.length));

    // 그림이 얹힌 쪽에도 그 아래에 글이 들어간다. 그래서 담을 수 있는 높이가 쪽마다 다르다.
    const underArt = Math.max(60, usable - artHeight);
    const capsOf = slots => {
        const caps = [];
        slots.forEach(kind => { caps.push(usable); caps.push(kind === 'img' ? underArt : usable); });
        return caps;
    };

    // 그림 한 장이 펼침면 하나를 쓴다. 거기서 시작해 글이 다 들어갈 때까지 펼침면을 늘린다.
    // 쪽 수는 조각 수를 넘을 수 없다 — 빈 쪽이 생기면 안 되기 때문이다.
    const minSpreads = Math.max(arts.length, 1);
    const maxSpreads = Math.max(minSpreads, Math.floor(segs.length / 2));
    let spreadCount = minSpreads;
    while (spreadCount < maxSpreads) {
        const caps = capsOf(slotPlan(arts.length, spreadCount - arts.length));
        if (caps.reduce((a, b) => a + b, 0) >= totalH + headHeight) break;
        spreadCount++;
    }

    let slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
    let caps = capsOf(slots);
    let ranges = fillPages(segs, caps, headHtml);
    for (let guard = 0; guard < 8; guard++) {
        // 한 쪽이라도 넘치면 펼침면을 늘려 다시 나눈다.
        // 마지막 쪽만 보면 안 된다 — 첫 쪽에는 장 제목이 얹히므로 그쪽이 먼저 넘칠 수 있다.
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 0.25);
        if (!over || spreadCount >= maxSpreads) break;
        spreadCount++;
        slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
        caps = capsOf(slots);
        ranges = fillPages(segs, caps, headHtml);
    }

    const spreads = [];
    let pageIdx = 0;
    let artIdx = 0;
    slots.forEach((kind, s) => {
        const left = ranges[pageIdx++];
        const right = ranges[pageIdx++];
        spreads.push({
            kind: 'chapter', ch, chIndex, first: s === 0,
            art: kind === 'img' ? arts[artIdx++] : null, left, right
        });
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
                ${artFrame('cover.png', '🎩')}
            </div>
            <div class="story-page-right">
                <h1>괴도 뤼팽</h1>
                <p class="cover-tag">모리스 르블랑 원작</p>
                <p>귀족의 저택과 은행 금고를 털면서도 사람을 다치게 한 적이 없고 가난한 집은 건드리지 않는 도둑. 프랑스가 그 이름을 재미있어하는 동안 가니마르 형사만 잠을 못 잡니다.</p>
                <p>여덟 편을 골라 담았습니다. 통쾌한 편도 있고, 마지막에 마음이 무거워지는 편도 있습니다.</p>
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
                    <div class="story-art-top">${artFrame(spread.art, ch.emoji)}</div>
                    ${runHtml(segs, spread.right[0], spread.right[1])}
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
    { q: "배 안에서 뤼팽을 찾을 단서로 전보에 적힌 것이 아닌 것은 무엇입니까?", choices: ["이름은 R로 시작한다는 것", "금발에 오른팔의 상처", "쇠테를 두른 둥근 안경"], answer: 2 },
    { q: "넬리 아가씨가 보석이 든 사진기를 어떻게 했습니까?", choices: ["아무 말 없이 바다에 던졌다", "경찰에게 곧바로 넘겨주었다", "뤼팽에게 도로 돌려주었다"], answer: 0 },
    { q: "말라키 성이 털렸을 때 뤼팽은 어디 있었습니까?", choices: ["갇혀 있던 감옥 안", "파리로 가는 밤 기차", "성 근처의 작은 여관"], answer: 0 },
    { q: "말라키 성 사건에서 뤼팽이 이용한 것은 무엇입니까?", choices: ["성주가 낸 신문 광고 하나", "새로 들인 하인 두 사람", "잊혀 있던 옛날 지하 통로"], answer: 2 },
    { q: "뤼팽이 재판에서 다른 사람 행세를 할 수 있었던 까닭은 무엇입니까?", choices: ["닮은 사람을 미리 구해 두어서", "간수 하나를 돈으로 사서", "한 달을 굶어 몸 치수를 바꿔서"], answer: 2 },
    { q: "가니마르가 법정에서 한 말은 무엇입니까?", choices: ["다시 조사하겠다", "모르겠다", "저 사람이 맞다"], answer: 1 },
    { q: "기차 안에서 뤼팽이 한 일은 무엇입니까?", choices: ["경찰에게 제 이름을 대고 내렸다", "옆자리 신사의 지갑을 가져갔다", "진짜 범인을 묶어 짐칸에 넣었다"], answer: 2 },
    { q: "하트 일곱 카드에 뚫린 구멍이 가리킨 것은 무엇입니까?", choices: ["그 집에 숨은 사람의 이름", "벽 무늬에서 눌러야 할 자리", "금고 문을 여는 숫자 일곱 개"], answer: 1 },
    { q: "뤼팽이 잠수함 설계도를 가져가지 않은 까닭은 무엇입니까?", choices: ["그것으로 배를 만들면 사람이 많이 죽어서", "이미 다른 나라에 팔린 뒤였기 때문에", "설계도가 가짜라는 것을 알아채서"], answer: 0 },
    { q: "검은 진주를 침대 밑에서 찾은 사람은 누구입니까?", choices: ["그 집에서 일하던 하녀 하나", "나중에 그 방에 들어간 다니그레", "제일 먼저 달려온 가니마르"], answer: 1 },
    { q: "뤼팽이 신문에 편지를 실은 까닭은 무엇입니까?", choices: ["다니그레가 안 한 일까지 쓰지 않게", "자기가 한 일임을 자랑하고 싶어서", "가니마르에게 다음 일을 예고하려고"], answer: 0 },
    { q: "왕비의 목걸이를 가져간 사람은 누구입니까?", choices: ["그때 여섯 살이던 라울", "손님으로 왔던 백작 하나", "그 집에서 일하던 어머니"], answer: 0 },
    { q: "여섯 살 아이가 그 방에 들어간 길은 어디입니까?", choices: ["이층으로 이어진 창틀", "사람이 못 지나는 좁은 굴뚝", "잠기지 않은 뒤쪽 쪽문"], answer: 1 },
    { q: "뤼팽이 그 목걸이를 이십 년 동안 팔지 않은 까닭은 무엇입니까?", choices: ["너무 알려진 물건이라 팔 수가 없어서", "값이 더 오를 때를 기다리고 있어서", "팔면 어머니가 정말 도둑의 어머니가 되어서"], answer: 2 },
    { q: "숄메스라는 이름이 쓰인 까닭은 무엇입니까?", choices: ["셜록 홈스를 만든 작가가 항의해서 비튼 것", "프랑스에서는 그 이름이 읽기 어려워서", "다른 사람이라는 것을 밝히고 싶어서"], answer: 0 },
    { q: "숄메스가 마지막에 윌슨에게 한 말은 무엇입니까?", choices: ["다시는 프랑스 땅을 밟지 않을 것이다", "세상은 우리가 배운 것보다 조금 더 복잡하다", "저런 자는 언젠가 반드시 제 손에 잡힌다"], answer: 1 }
];

// 선지를 세로로 쌓으니 한 쪽에 열여섯 문항이 다 들어가지 않는다. 몇 개씩 나눠 싣는다.
// 문제는 한 쪽에 다 넣고 스크롤해서 푼다.
// 쪽을 쪼개 놓으면 쪽마다 절반이 비고, 답을 고르려고 여러 번 넘겨야 한다.
const QUIZ_GROUPS = [{ from: 0, items: QUIZ }];

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
            ${artFrame('end.png', '🕵️')}
            <h2>괴도 뤼팽를 다 읽었습니다</h2>
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
