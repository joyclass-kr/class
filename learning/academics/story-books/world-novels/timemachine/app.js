const BOOK_TITLE = "타임 머신";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "네 번째 방향",
        emoji: "🕰️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `천팔백구십몇 년 어느 목요일 저녁이었습니다. 런던 리치먼드에 사는 어느 사람의 집에 손님 예닐곱이 모여 있었습니다. 그 집 주인은 발명을 하는 사람이었습니다.`,
            `돈을 벌려고 발명하는 사람은 아니었습니다. 자기가 궁금한 것을 만들어 보는 사람이었습니다. 그래서 그 집 작업실에는 쓸모를 알 수 없는 것들이 잔뜩 있었습니다.`,
            `이름은 여기 적지 않겠습니다. 그 사람이 알려지기를 바라지 않았기 때문입니다.`,
            `이 글에서는 그냥 시간 여행자라고 부르겠습니다. 손님들은 의사, 심리학자, 신문 기자, 시장, 그리고 저였습니다. 저녁을 먹고 난롯가에 앉아 있는데 주인이 말을 꺼냈습니다.`,
            `"여러분, 학교에서 배운 것 가운데 틀린 것이 하나 있습니다."<br>"무엇 말입니까."<br>"우리가 사는 세상에 방향이 몇 개 있습니까?"<br>"셋이지요. 앞뒤, 좌우, 위아래."<br>"넷입니다."`,
            `사람들이 웃었습니다.`,
            `"네 번째가 뭡니까?"<br>"시간입니다."`,
            `그리고 주인은 이렇게 설명했습니다. 사람이 태어나서 죽을 때까지, 그 사람은 계속 시간 위를 지나갑니다. 그러니까 시간도 우리가 지나가는 길입니다.`,
            `키를 재면 위아래가 나오고, 방의 넓이를 재면 앞뒤와 좌우가 나옵니다. 그런데 사람 하나를 제대로 말하려면 언제 태어나서 언제까지 살았는지도 말해야 합니다. 그것이 네 번째 것입니다.`,
            `다만 우리는 그 길을 한 방향으로만, 그리고 늘 같은 빠르기로만 갑니다.`,
            `"앞뒤로는 마음대로 갔다 오지 않습니까. 위아래도 애를 쓰면 갑니다. 그런데 시간만은 왜 한쪽으로만 갑니까?"`,
            `"그야 그런 것이니까요."<br>"저는 그렇게 생각하지 않습니다."`,
            `그러고는 주인이 옆방에서 무언가를 가져왔습니다. 아주 작은 것이었습니다. 놋쇠와 상아와 수정으로 만든 것인데, 자전거만큼도 안 되게 작았습니다.`,
            `그 위에 작은 안장이 있고, 앞에 지렛대가 두 개 달려 있었습니다.<br>"이것이 제가 만든 기계의 모형입니다." 주인은 그것을 탁자 한가운데 놓았습니다.`,
            `그리고 심리학자에게 말했습니다.<br>"이 지렛대를 눌러 보시겠습니까."`,
            `심리학자가 손가락을 뻗어 눌렀습니다. 그러자 그 작은 기계가 흔들리더니, 흐릿해지더니, 사라졌습니다. 탁자 위에 아무것도 남지 않았습니다.`,
            `방 안이 조용해졌습니다. 누가 탁자 밑을 들여다보았습니다. 아무것도 없었습니다.`,
            `"속임수요."<br>"그렇게 생각하셔도 됩니다." 주인이 말했습니다.<br>"저는 설득할 생각이 없습니다."`,
            `그 말이 오히려 사람들을 불안하게 했습니다. 속이려는 사람은 대개 설득하려고 하기 때문입니다.`
        ]
    },
    {
        num: 2,
        title: "이레 뒤",
        emoji: "🚪",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `그날 밤 주인은 손님들을 작업실로 데려갔습니다. 거기에 큰 기계가 하나 있었습니다. 아까 그 모형을 사람이 탈 수 있게 크게 만든 것이었습니다.`,
            `작업실은 마당 건너 별채에 있었습니다. 안이 어수선했습니다. 쇠붙이와 유리 조각과 도면이 바닥에 널려 있었습니다.`,
            `절반쯤 만들어져 있었습니다.`,
            `놋쇠 뼈대가 서 있고, 그 안에 수정 막대가 여럿 박혀 있었습니다. 안장 앞에 지렛대 두 개가 있었습니다. 모형과 똑같은 모양이었습니다.`,
            `"다음 주 목요일에 다시 오십시오. 그때 보여 드리겠습니다."`,
            `이레 뒤, 손님들이 다시 모였습니다. 그런데 주인이 없었습니다. 식탁에는 이런 쪽지가 놓여 있었습니다.`,
            `그 이레 동안 손님들은 저마다 그 일을 곱씹었습니다. 의사는 손 빠른 속임수라고 했고, 심리학자는 자기가 헛것을 본 것이라고 했습니다.`,
            `"늦을지도 모릅니다. 먼저 드시고 계십시오."`,
            `사람들은 웃으면서 저녁을 먹기 시작했습니다.<br>"또 무슨 장난을 치려는 모양이지."`,
            `그때 문이 열렸습니다. 사람들이 고개를 들다가 다 굳었습니다. 주인이 서 있었습니다. 그런데 몰골이 말이 아니었습니다.`,
            `웃옷이 흙투성이였고, 소매가 찢어져 있었습니다. 얼굴이 창백했고, 턱에 마른 피가 붙어 있었습니다.`,
            `머리가 세어 있었습니다. 이레 전에는 그렇지 않았습니다.`,
            `사람이 이레 만에 머리가 세지는 않습니다.`,
            `그리고 발에 신발이 없었습니다. 양말만 신고 있었는데 그것도 다 찢어져 있었습니다.`,
            `절뚝거리며 걸어 들어와 식탁 끝에 앉았습니다. 아무 말 없이 술을 한 잔 따라 마셨습니다. 그리고 고기를 집어 먹었습니다.`,
            `허겁지겁 먹었습니다. 사람들이 물으려고 하자 손을 들어 막았습니다.`,
            `며칠 굶은 사람이 먹는 모양이었습니다. 그런데 이레 전에 이 집에서 저녁을 먹은 사람이었습니다.`,
            `"조금만 기다려 주십시오. 먹고 나서 다 말씀드리겠습니다."`,
            `그렇게 십 분이 지났습니다. 그리고 주인은 옷을 갈아입고 와서 난롯가에 앉았습니다.`,
            `"오늘 저는 여드레를 살았습니다."<br>"무슨 말씀입니까."<br>"여러분이 이레를 사시는 동안, 저는 팔십만 년을 다녀왔습니다."`,
            `그리고 이야기를 시작했습니다. 아래는 그 사람이 그날 밤 한 이야기를 그대로 옮긴 것입니다.`,
            `저는 그날 밤 집에 돌아가 기억나는 대로 적어 두었습니다. 그래서 여기 적힌 것은 그 사람의 말투 그대로입니다.`
        ]
    },
    {
        num: 3,
        title: "출발",
        emoji: "⚙️",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `오늘 아침 열 시에 기계가 완성되었습니다. 저는 안장에 앉아 지렛대를 잡았습니다. 손이 떨렸습니다. 그러고는 눌렀습니다.`,
            `마지막에 끼운 것은 수정 막대 두 개였습니다. 그것을 끼우자 기계가 조금 흔들렸습니다. 저는 한참 그것을 보고 있었습니다.`,
            `처음에는 떨어지는 느낌이었습니다. 배를 타고 파도를 넘을 때처럼 속이 뒤집혔습니다. 그리고 작업실을 보니 이상했습니다.`,
            `속이 뒤집히고 귀가 멍했습니다. 저는 지렛대를 놓칠 뻔했습니다.`,
            `벽에 걸린 시계의 바늘이 아주 빨리 돌고 있었습니다. 조금 뒤에는 바늘이 보이지 않을 만큼 빨라졌습니다. 창밖에서 해가 하늘을 가로질러 지나갔습니다.`,
            `그리고 밤이 왔습니다. 그리고 다시 낮이 왔습니다. 하루가 몇 초였습니다.`,
            `그것이 점점 빨라져서 나중에는 깜빡거리는 것처럼 되었습니다. 그러다 아예 하나로 이어졌습니다. 하늘이 짙푸른 빛이 되고, 해는 하늘을 도는 불의 띠가 되었습니다.`,
            `작업실 벽이 흐릿해지더니 사라졌습니다. 제가 앉아 있는 자리에 다른 건물이 서고, 그것이 무너지고, 또 다른 것이 섰습니다. 너무 빨라서 형태를 알아볼 수가 없었습니다.`,
            `사람은 하나도 보이지 않았습니다. 한 사람이 지나가는 데 걸리는 시간이 제게는 눈 깜빡할 새보다 짧았기 때문입니다. 저는 처음에 조금 즐거웠습니다. 그러다 무서워졌습니다.`,
            `그러니 저는 사람이 가득한 도시 한가운데를 지나가면서도 아무도 보지 못했습니다. 그 생각을 하면 지금도 이상합니다.`,
            `한 가지 생각이 들었기 때문입니다. 제가 멈추는 그 순간에, 그 자리에 무언가가 있으면 어떻게 될까요. 벽이나 바위나, 아니면 흙더미가요.`,
            `그러면 제 몸과 그것이 같은 자리를 차지하게 됩니다. 그러면 어떻게 되는지 저도 모릅니다. 그 생각을 하자 견딜 수가 없어졌습니다.`,
            `저는 지렛대를 잡아당겼습니다. 너무 갑자기 잡아당겼습니다. 기계가 옆으로 넘어갔고, 저는 풀밭으로 굴러떨어졌습니다.`,
            `우박이 쏟아지고 있었습니다. 저는 그 자리에 엎드린 채 계기판을 보았습니다. 팔십만 이천칠백일 년.`,
            `기계는 옆으로 넘어져 있었고, 저는 등이 젖은 채 엎드려 있었습니다. 우박이 목덜미를 때렸습니다.`,
            `제가 온 곳으로부터 팔십만 년 뒤였습니다.`,
            `사람이 글자를 쓰기 시작한 지가 오천 년쯤 됩니다. 그 백육십 배입니다. 저는 그 숫자를 몇 번이나 다시 보았습니다.`
        ]
    },
    {
        num: 4,
        title: "하얀 스핑크스",
        emoji: "🗿",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `우박이 그치고 해가 났습니다. 저는 일어나 둘러보았습니다.`,
            `저는 먼저 기계를 살폈습니다. 지렛대 하나가 휘어 있었습니다. 그것을 손으로 펴 놓고 나서야 둘러볼 마음이 들었습니다.`,
            `풀밭이었습니다. 꽃이 아주 많았습니다.`,
            `제가 아는 어떤 꽃과도 달랐습니다. 공기가 따뜻했고 냄새가 좋았습니다. 그리고 제 앞에 큰 조각상이 하나 서 있었습니다.`,
            `잎이 크고 색이 짙었습니다. 그리고 사람이 심어 놓은 것처럼 줄지어 나 있었습니다. 저는 그때 그것을 대수롭지 않게 넘겼습니다.`,
            `하얀 돌로 만든 것이었는데, 사람 얼굴에 짐승 몸을 하고 날개가 있었습니다. 스핑크스라고 부르는 모양의 상이었습니다. 높이가 이층집만 했습니다.`,
            `아주 오래된 것이 분명했습니다. 돌이 삭아 있었고 이끼가 끼어 있었습니다.`,
            `그런데 이상한 것이 하나 있었습니다. 이끼가 끼어 있는데도 얼굴만은 또렷했습니다. 누가 손을 대고 있다는 뜻이었습니다.`,
            `그 얼굴이 저를 내려다보고 있었습니다. 저는 조금 무서워졌습니다.`,
            `그때 소리가 났습니다. 돌아보니 사람들이 오고 있었습니다. 저는 놀랐습니다.`,
            `팔십만 년 뒤의 사람이 어떤 모습일지 저는 여러 가지로 상상해 보았습니다.`,
            `기계를 타고 오는 동안 저는 그 생각만 했습니다. 그 사람들이 저를 어떻게 대할지도요. 붙잡아 가둘지도 모른다고 생각했습니다.`,
            `머리가 크고 몸이 작을 것이라고 생각했습니다. 기계를 쓰니까 몸을 안 쓸 테니까요.`,
            `아니면 아주 크고 힘이 셀 것이라고도 생각했습니다. 그런데 눈앞에 온 것은 아이들 같았습니다. 키가 넉 자쯤 되었습니다.`,
            `머리가 곱슬거리고, 얼굴이 갸름하고, 눈이 컸습니다. 아주 예쁘게 생겼습니다. 보라색과 분홍색 천으로 만든 옷을 입고 있었고, 발이 맨발이었습니다. 그리고 남자와 여자가 잘 구별되지 않았습니다.`,
            `그 사람들은 저를 보고도 무서워하지 않았습니다. 웃으면서 다가와 저를 만졌습니다. 손이 아주 작고 부드러웠습니다.`,
            `한 사람이 제 목에 꽃목걸이를 걸어 주었습니다.`,
            `저는 그 사람들에게 물었습니다.<br>"여기가 어디입니까? 지금이 언제입니까?"`,
            `그 사람들은 서로 얼굴을 보고 웃었습니다. 그리고 새가 우는 것 같은 소리로 무어라 말했습니다. 저는 알아듣지 못했습니다.`,
            `그 사람들의 말은 아주 짧았습니다. 두세 마디를 하고 나면 더 할 말이 없는 것 같았습니다. 저는 그것도 그때는 대수롭지 않게 넘겼습니다.`
        ]
    },
    {
        num: 5,
        title: "엘로이",
        emoji: "🌸",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그 사람들은 자기들을 엘로이라고 불렀습니다. 저는 그날 그 사람들을 따라 큰 건물로 갔습니다.`,
            `그것이 제가 알아들은 첫 낱말이었습니다.`,
            `아주 오래된 건물이었습니다. 돌기둥이 서 있고 지붕이 반쯤 무너져 있었습니다.`,
            `그 안에 낮은 상들이 놓여 있고, 사람들이 거기서 밥을 먹었습니다. 먹는 것은 과일뿐이었습니다. 고기도 없고 빵도 없었습니다. 그런데 그 과일이 제가 아는 어떤 과일과도 달랐습니다.`,
            `누가 오랜 세월에 걸쳐 골라 기른 것이 분명했습니다. 씨가 없고, 껍질이 얇고, 아주 달았습니다. 그렇다면 누군가 그것을 기르고 있다는 뜻이었습니다. 그런데 밭이 없었습니다.`,
            `저는 사방을 둘러보았습니다. 갈아 놓은 땅도 없고, 연장도 없고, 일하는 사람도 없었습니다.`,
            `저는 그때 그것을 이상하게 여겼어야 했습니다. 저는 여러 날 동안 그 사람들을 지켜보았습니다. 그리고 이런 것들을 알게 되었습니다.`,
            `그 사람들은 일을 하지 않았습니다. 밭도 없고 공장도 없었습니다. 하루 종일 놀고, 노래하고, 물에서 헤엄치고, 꽃을 땄습니다. 그리고 밤이 되면 무리 지어 그 큰 건물 안에 들어가 잤습니다.`,
            `저는 그것을 여러 날 확인했습니다. 아침에 일어나 하루를 따라다녀 보았습니다. 정말로 아무 일도 하지 않았습니다.`,
            `혼자 자는 사람은 하나도 없었습니다. 그 사람들은 몹시 약했습니다. 조금만 걸어도 지쳤습니다. 그리고 어른이 되어도 아이 같았습니다.`,
            `무엇에도 오래 마음을 두지 않았습니다. 제가 무언가를 물으면 잠깐 웃다가 다른 데로 가 버렸습니다. 저는 그 사람들에게 말을 가르쳐 보려고 했습니다.`,
            `손가락으로 물건을 가리키고 이름을 말하는 식이었습니다. 그 사람들은 재미있어하며 따라 했습니다. 그런데 십 분쯤 지나면 다 잊어버렸습니다.`,
            `무엇을 오래 붙들고 있는 힘이 없었던 것입니다. 저는 여러 날에 걸쳐 겨우 낱말 몇 개를 배웠습니다. 저는 처음에 이렇게 생각했습니다.`,
            `'사람이 완성된 모습이구나.' 병도 없고, 싸움도 없고, 먹을 것 걱정도 없습니다. 그러니 힘이 셀 필요도 없고, 머리를 쓸 필요도 없습니다.`,
            `사람을 강하게 만드는 것은 어려움입니다. 어려움이 하나도 없어지면 사람은 이렇게 되는 것이구나 하고 생각했습니다. 저는 그날 저녁 언덕에 앉아 그 생각을 정리했습니다.`,
            `제 생각은 그럴듯했습니다. 그런데 완전히 틀린 생각이었습니다. 저는 그것을 사흘 뒤에 알게 됩니다.`,
            `사람이 무언가를 보고 그럴듯한 설명을 만들어 내면, 그다음부터는 그 설명에 맞는 것만 보입니다. 저는 학자인데도 그랬습니다.`
        ]
    },
    {
        num: 6,
        title: "기계가 사라지다",
        emoji: "🌑",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `그날 밤 저는 풀밭으로 돌아갔습니다. 기계를 두고 온 자리였습니다. 그런데 기계가 없었습니다.`,
            `기계를 두고 온 지 사흘째였습니다. 저는 그동안 그것을 한 번도 살펴보지 않았습니다.`,
            `저는 그 자리에 얼어붙었습니다. 풀밭을 뛰어다니며 찾았습니다. 소리를 질렀습니다.`,
            `풀이 눌린 자리는 있었습니다. 그러니까 제가 자리를 잘못 찾은 것이 아니었습니다.`,
            `엘로이 몇이 나와서 저를 보았습니다. 저는 그 사람들을 붙잡고 흔들었습니다.`,
            `"내 기계 어디 있어! 누가 가져갔어!"`,
            `그 사람들은 무서워서 울었습니다. 저는 그때 제가 무슨 짓을 하고 있는지 알았습니다. 아이를 붙잡고 흔들고 있었던 것입니다.`,
            `저는 손을 놓고 물러섰습니다. 그리고 그날 밤 풀밭에 앉아 있었습니다. 기계가 없으면 저는 영영 여기서 살아야 했습니다.`,
            `팔십만 년 뒤에, 말도 안 통하는 곳에서요. 저는 그날 밤 여러 가지를 생각했습니다.`,
            `여기서 늙어 죽는다면 아무도 제가 어디로 갔는지 모를 것입니다.`,
            `친구들은 제가 장난을 치다가 사라졌다고 여길 것입니다. 그리고 몇 해가 지나면 저를 잊을 것입니다. 그 생각을 하자 견디기가 어려웠습니다.`,
            `아침이 되어 저는 침착해졌습니다. 그리고 땅에 남은 자국을 살폈습니다. 기계는 끌린 자국을 남기고 있었습니다.`,
            `그 자국이 스핑크스 조각상 쪽으로 이어져 있었습니다. 그 조각상의 받침 부분에 청동 문이 두 짝 있었습니다. 그 문 안으로 자국이 들어가 있었습니다.`,
            `저는 그 문을 두드렸습니다. 안에서 무언가 움직이는 소리가 났습니다. 그리고 웃음소리 같은 것이 들렸습니다.`,
            `문에는 손잡이도 열쇠 구멍도 없었습니다. 안에서만 여는 문이었습니다.`,
            `저는 그 문을 돌로 쳤습니다. 열리지 않았습니다. 그런데 문 안에 무언가 있었습니다.`,
            `엘로이가 그것을 열 수 있을 리가 없었습니다. 그 사람들은 그렇게 무거운 것을 밀 힘이 없었기 때문입니다. 그렇다면 이 세상에는 엘로이 말고 다른 것이 있었습니다.`,
            `저는 그날부터 그 문 앞을 여러 번 오갔습니다. 그리고 엘로이에게 그 문에 대해 물었습니다. 말이 통하는 만큼 물었습니다.`,
            `그 사람들은 그 조각상 쪽을 보려고도 하지 않았습니다. 제가 손으로 가리키기만 해도 자리를 떴습니다. 무서워하는 것과는 조금 달랐습니다.`,
            `보지 않기로 정해 놓은 것 같았습니다.`,
            `모르는 것과 보지 않기로 한 것은 다릅니다. 저는 그 차이를 그때 처음 생각했습니다.`
        ]
    },
    {
        num: 7,
        title: "위나",
        emoji: "💐",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그다음 날 강가에서 일이 하나 있었습니다. 엘로이 여럿이 물에서 놀고 있었는데, 그 가운데 하나가 물살에 휩쓸렸습니다. 저는 그것을 보고 물에 뛰어들어 건져 냈습니다.`,
            `그 강은 넓고 물살이 느렸습니다. 그런데 한가운데에 물이 빠르게 도는 데가 있었습니다.`,
            `아주 가벼웠습니다. 그런데 이상한 일이 있었습니다. 물가에 있던 다른 엘로이들이 아무도 나서지 않았던 것입니다.`,
            `누가 물에 빠져 떠내려가는데 다들 그냥 보고 있었습니다. 무섭거나 슬퍼 보이지도 않았습니다. 그것이 저에게는 제일 이상했습니다.`,
            `제가 살던 곳에서는 누가 물에 빠지면 다들 뛰어듭니다. 뛰어들지 못하는 사람도 소리는 지릅니다. 그런데 그 사람들은 소리도 지르지 않았습니다.`,
            `잠깐 그쪽을 보다가 다시 놀던 것을 계속했습니다. 제가 건져 낸 사람은 여자였습니다. 저는 그 사람을 위나라고 불렀습니다.`,
            `물에서 끌어냈을 때 그 사람은 놀라지도 않았습니다. 무슨 일이 있었는지 모르는 것 같았습니다.`,
            `그 사람이 낸 소리를 제가 그렇게 알아들었기 때문입니다. 위나는 그날부터 저를 따라다녔습니다. 제가 어디를 가든 따라왔습니다.`,
            `제 주머니에 꽃을 넣어 주었습니다. 그것이 그 사람이 아는 유일한 고마움의 표시였습니다. 위나는 다른 엘로이와 조금 달랐습니다.`,
            `한 사람에게 오래 마음을 두었기 때문입니다. 그것은 그 사람들 사이에서 드문 일이었습니다. 위나 덕분에 저는 한 가지를 알게 되었습니다.`,
            `엘로이는 어둠을 몹시 무서워했습니다. 해가 지면 다들 큰 건물 안으로 들어갔고, 밖에 남으려고 하지 않았습니다. 그리고 밤에는 절대 혼자 있지 않았습니다.`,
            `해가 지기 한참 전부터 다들 안으로 들어갔습니다. 그리고 문 가까이에는 아무도 자지 않았습니다.`,
            `한번은 제가 밤에 밖에 나가려고 하자 위나가 울면서 매달렸습니다.`,
            `저는 물었습니다.<br>"밤에 뭐가 있어?"`,
            `위나는 대답하지 못했습니다. 말을 몰라서가 아니었습니다. 그 사람들에게는 그것을 가리키는 말이 없었습니다.`,
            `저는 그때 몇 가지를 짐작했습니다. 그 사람들이 무서워하는 것은 어둠 자체가 아니었습니다. 어둠 속에 무언가가 있었습니다. 그리고 그것은 사람이 지어낸 이야기 속의 무엇이 아니었습니다.`,
            `정말로 있는 것이었습니다. 그러지 않고서는 어른들까지 그렇게 무서워할 까닭이 없었습니다.`,
            `무서움이 오래되면 이야기가 됩니다. 그런데 그 사람들에게는 이야기도 없었습니다. 그것이 더 이상했습니다.`
        ]
    },
    {
        num: 8,
        title: "우물",
        emoji: "🕳️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `저는 그 땅을 돌아다니면서 이상한 것을 여럿 보았습니다. 여기저기에 둥근 우물 같은 것이 있었습니다. 가장자리가 청동으로 되어 있었고, 안이 깊었습니다.`,
            `무너진 건물이 아주 많았습니다. 그런데 새로 지은 건물은 하나도 없었습니다. 그 사람들은 있는 것을 쓰다가 무너지면 다른 데로 옮겨 갔습니다.`,
            `귀를 대면 소리가 났습니다.`,
            `쿵쿵거리는 소리가 규칙적으로 들렸습니다. 아주 큰 것이 천천히 도는 소리였습니다.`,
            `아주 깊은 데서 무언가 돌아가는 소리였습니다. 기계 소리였습니다.`,
            `그리고 그 우물에서는 바람이 나왔습니다. 공기가 위로 올라오고 있었던 것입니다. 그러니까 저 아래에 무언가 있고, 거기에 공기를 넣어 주고 있었습니다.`,
            `엘로이에게 그것이 무엇이냐고 물었습니다. 대답하지 못했습니다. 그 사람들은 그 우물을 아예 보지 않으려고 했습니다.`,
            `제가 세어 본 것만 그런 우물이 여남은 개였습니다. 그리고 그것들이 아무렇게나 놓여 있지 않았습니다. 일정한 간격으로, 이 땅 전체에 골고루 흩어져 있었습니다.`,
            `그리고 그 우물 둘레에는 풀이 자라지 않았습니다. 사람이 자주 드나든다는 뜻이었습니다.`,
            `누가 설계해서 만든 것이었습니다. 그런데 엘로이는 그런 것을 만들 수 있는 사람들이 아니었습니다.`,
            `그러던 어느 날 새벽이었습니다. 저는 일찍 깨서 폐허 사이를 걷고 있었습니다.`,
            `그때 어둠 속에서 무언가가 움직였습니다. 저는 그것을 짐승이라고 생각했습니다. 흰빛이 도는 것이었는데, 네 발로 기다가 두 발로 서기도 했습니다.`,
            `그것이 저를 보고 달아났습니다. 저는 따라갔습니다. 그것이 우물 안으로 사라졌습니다. 그런데 사라지기 전에 잠깐 돌아보았습니다.`,
            `저는 그 얼굴을 보았습니다. 사람이었습니다. 살갗이 희고, 머리에 색이 없고, 눈이 아주 컸습니다.`,
            `밤에 사는 짐승의 눈이었습니다. 저는 그날 하루 종일 그 생각을 했습니다. 그리고 알아냈습니다.`,
            `이 세상에는 사람이 두 종류 살고 있었습니다. 땅 위에 사는 엘로이와, 땅 아래에 사는 무엇이었습니다. 엘로이들은 그것을 몰록이라고 불렀습니다.`,
            `그 이름을 말할 때 엘로이들의 얼굴이 달라졌습니다. 웃음이 사라졌습니다. 위나는 그 말을 듣자 제 손을 잡고 다른 데로 끌었습니다.`,
            `그것이 제가 그 사람들에게서 본 유일하게 진지한 얼굴이었습니다.`,
            `저는 그날 위나에게 여러 번 물었습니다. 위나는 그때마다 고개를 저었습니다.`
        ]
    },
    {
        num: 9,
        title: "땅 아래",
        emoji: "🔦",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `저는 내려가 보기로 했습니다. 기계가 그 문 안에 있고, 그 문을 여는 것이 저것들이라면, 저것들을 알아야 했기 때문입니다. 위나가 울면서 말렸습니다.`,
            `저는 겁이 많은 사람입니다. 그런데 그때는 다른 방법이 없었습니다.`,
            `저는 위나를 폐허에 앉혀 놓고 우물로 갔습니다.`,
            `우물 벽에 쇠막대가 박혀 있었습니다. 사다리였습니다.`,
            `사람이 오르내리라고 박아 놓은 것이었습니다. 그런데 간격이 좁았습니다. 저보다 작은 것이 다니는 사다리였습니다.`,
            `저는 그것을 잡고 내려갔습니다. 이백 자쯤 내려갔습니다.`,
            `팔이 떨렸습니다. 쇠막대 하나가 부러져서 하마터면 떨어질 뻔했습니다.`,
            `내려가면서 저는 제가 얼마나 어리석은 짓을 하고 있는지 생각했습니다. 성냥 한 통과 쇠막대 하나로 저 아래에 무엇이 있는지도 모르고 내려가는 것이었습니다. 그런데 올라갈 수도 없었습니다.`,
            `여기서 돌아서면 저는 팔십만 년 뒤에 남는 것이었습니다. 아래에 이르자 좁은 옆굴이 있었습니다. 저는 그리로 기어들어 갔습니다.`,
            `안은 캄캄했고, 기계 소리가 컸습니다. 그리고 냄새가 났습니다. 저는 성냥을 켰습니다.`,
            `아주 큰 방이었습니다. 기계가 여러 대 돌아가고 있었습니다. 무슨 기계인지는 알 수 없었습니다. 그리고 그 사이에 몰록들이 서 있었습니다.`,
            `천장이 보이지 않을 만큼 높았습니다. 그리고 벽을 따라 관이 여러 가닥 지나가고 있었습니다.`,
            `수십 마리였습니다. 성냥불을 보고 다들 손으로 눈을 가렸습니다. 빛을 견디지 못하는 것이었습니다.`,
            `그 가운데 한쪽에 상이 하나 있었습니다. 그 위에 고기가 놓여 있었습니다. 저는 그것을 보고 성냥을 떨어뜨렸습니다.`,
            `그 고기가 무슨 고기인지 알았기 때문입니다. 그리고 그때 몰록들이 저를 붙잡았습니다. 손이 여럿 뻗어와 제 목과 팔을 잡았습니다.`,
            `저는 성냥을 다시 켜서 휘둘렀습니다. 그것들이 놓았습니다. 저는 사다리까지 뛰어가 기어올랐습니다.`,
            `발목을 붙잡히면서 올라갔습니다. 밖으로 나와 풀밭에 쓰러졌을 때, 해가 지고 있었습니다. 위나가 폐허 계단에 앉아 저를 기다리고 있었습니다.`,
            `제가 나오는 것을 보고 뛰어왔습니다. 그리고 제 얼굴을 보더니 울기 시작했습니다. 제 얼굴이 어떻게 되어 있었는지는 저도 모릅니다.`,
            `다만 그 사람이 그때 처음으로 저를 걱정했다는 것은 알았습니다.`,
            `그 사람들은 누가 없어져도 슬퍼하지 않는 사람들이었습니다. 그런데 위나는 울었습니다.`
        ]
    },
    {
        num: 10,
        title: "두 종족",
        emoji: "⚖️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그날 밤 저는 다 알아냈습니다. 제가 처음에 한 생각은 틀렸습니다. 이 세상은 사람이 완성된 세상이 아니었습니다.`,
            `앞뒤가 다 맞아떨어졌습니다. 그리고 맞아떨어질수록 견디기가 어려웠습니다.`,
            `이 세상은 사람이 둘로 갈라진 세상이었습니다. 제가 살던 시대에도 이미 그 갈라짐이 시작되고 있었습니다. 한쪽에는 일하지 않고 사는 사람들이 있었습니다.`,
            `다른 쪽에는 땅 아래에서 일하는 사람들이 있었습니다. 제 시대의 런던에도 지하철이 있었고, 지하 공장이 있었고, 하수도에서 일하는 사람들이 있었습니다. 그 사람들은 햇빛을 거의 보지 못하고 살았습니다.`,
            `땅 아래에서 일하는 사람과 땅 위에서 그 덕을 보는 사람이 이미 나뉘어 있었습니다. 다만 그때는 같은 사람으로 보였습니다.`,
            `그것이 몇십만 년 이어지면 어떻게 될까요. 한 세대가 삼십 년이라면 몇십만 년은 만 세대가 넘습니다. 사람이 그만큼 갈라져 살면 서로 다른 것이 됩니다.`,
            `땅 위에서 놀기만 한 쪽은 점점 약해지고 작아졌습니다. 힘이 필요 없었고, 머리를 쓸 일이 없었기 때문입니다.`,
            `그것이 엘로이가 되었습니다. 땅 아래에서 일한 쪽은 어둠에 맞게 바뀌었습니다. 눈이 커지고 살갗이 희어졌습니다.`,
            `그것이 몰록이 되었습니다. 그런데 여기서 한 가지가 뒤집혔습니다. 처음에는 위쪽이 주인이고 아래쪽이 일꾼이었을 것입니다. 그런데 오랜 세월이 지나자, 아래쪽에는 기계와 힘과 어둠 속에서 보는 눈이 남았고 위쪽에는 아무것도 남지 않았습니다.`,
            `그래서 지금은 아래쪽이 위쪽을 먹입니다. 몰록이 엘로이의 옷을 만들어 주고, 먹을 과일이 자라게 해 주고, 다 돌봐 줍니다.`,
            `그리고 밤이 되면 몇을 데려갑니다. 엘로이가 밤을 무서워하는 것이 그 때문이었습니다.`,
            `저는 이것을 알아내고 나서 제가 처음에 한 생각이 얼마나 얕았는지 알았습니다. 저는 이 세상을 사흘 보고 다 안다고 여겼습니다. 예쁜 것만 보고 그것이 전부라고 여긴 것입니다.`,
            `저는 학자입니다. 그런 사람이 사흘 보고 결론을 냈습니다.`,
            `엘로이가 물에 빠진 동료를 구하지 않은 것도 그 때문이었습니다. 그 사람들은 누가 없어지는 일에 익숙해져 있었습니다. 그러지 않고서는 살 수 없었기 때문입니다.`,
            `저는 그것을 알아내고 오래 앉아 있었습니다. 그리고 제 시대가 생각났습니다. 저는 그날 밤 처음으로 집에 가고 싶었습니다.`,
            `제 시대는 좋은 시대가 아니었습니다. 그런데 아직 갈라지지 않은 시대였습니다.`
        ]
    },
    {
        num: 11,
        title: "숲의 불",
        emoji: "🔥",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `저는 무기가 필요했습니다. 그래서 며칠 걸어 큰 폐허로 갔습니다. 초록빛 도자기로 지은 아주 큰 건물이었습니다.`,
            `쇠막대 하나면 되었습니다. 그런데 그 땅에는 쇠붙이가 하나도 없었습니다. 팔십만 년 동안 다 삭은 것입니다.`,
            `안에 들어가 보니 그것은 옛날 박물관이었습니다. 깨진 유리 진열장이 줄지어 서 있었고, 그 안에 삭아 버린 것들이 놓여 있었습니다. 기계, 뼈, 돌, 책.`,
            `그것도 아주 오래된 박물관이었습니다. 여기 놓인 것들이 만들어진 때와 제 시대 사이가, 제 시대와 지금 사이만큼 멀지도 모릅니다.`,
            `책은 손을 대자 가루가 되었습니다. 저는 그 안에서 두 가지를 찾아냈습니다. 쇠막대 하나와, 성냥 한 통이었습니다.`,
            `찾는 데 반나절이 걸렸습니다. 위나가 옆에서 제 흉내를 내며 진열장을 들여다보았습니다.`,
            `성냥은 유리병 안에 들어 있어서 아직 그어졌습니다. 그 박물관을 돌아보면서 저는 이상한 기분이 들었습니다. 여기 있는 것들은 사람이 알아낸 것을 모아 둔 자리였습니다.`,
            `누군가 그것을 모으고, 이름을 붙이고, 순서대로 놓았습니다. 그런데 이제 그것을 읽을 수 있는 사람이 하나도 없었습니다. 저는 진열장 하나를 오래 보았습니다.`,
            `안에 든 것이 무엇인지 알 수 없었습니다. 저에게도 이미 너무 먼 것이었습니다. 저는 위나와 함께 돌아오는 길에 숲에서 밤을 맞았습니다.`,
            `숲에서 밤을 보내는 것은 위험했습니다. 저는 불을 피웠습니다. 몰록들이 불을 무서워하기 때문이었습니다. 그런데 잠이 들었습니다.`,
            `깨어 보니 불이 꺼져 있었고, 사방에서 손이 뻗어 오고 있었습니다. 저는 쇠막대를 휘두르며 싸웠습니다. 그리고 위나의 손을 잡고 뛰었습니다.`,
            `달아나면서 저는 마른 나뭇가지에 불을 붙여 던졌습니다. 숲에 불이 붙었습니다. 불은 아주 빨리 번졌습니다.`,
            `몰록들이 불빛에 눈이 멀어 이리저리 부딪히며 헤맸습니다. 그 광경은 보기 좋지 않았습니다. 저는 그때 그것들이 미웠습니다. 그런데 지금 그 밤을 생각하면 다른 마음이 듭니다.`,
            `그것들은 팔십만 년 동안 어둠 속에 갇혀 살았습니다. 누가 그렇게 만들었습니까.`,
            `그날 밤 저는 위나의 손을 놓쳤습니다. 불과 연기 속에서 놓친 것입니다.`,
            `날이 밝을 때까지 찾았습니다. 찾지 못했습니다. 저는 그 뒤로 위나를 다시 보지 못했습니다.`,
            `주머니에 그 사람이 넣어 준 꽃 두 송이가 남아 있었습니다.`,
            `그것을 언제 넣었는지 저는 기억하지 못합니다.`
        ]
    },
    {
        num: 12,
        title: "더 먼 곳",
        emoji: "🌅",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `저는 하얀 스핑크스로 돌아갔습니다. 그리고 놀랐습니다. 청동 문이 열려 있었습니다.`,
            `안에 기계가 놓여 있었습니다. 깨끗이 닦여 있었습니다.`,
            `그것은 덫이었습니다. 제가 들어오기를 기다린 것이었습니다. 저는 알면서 들어갔습니다.`,
            `문이 뒤에서 닫혔습니다. 사방이 캄캄해졌고, 손들이 다가왔습니다. 저는 안장에 올라 지렛대를 더듬어 찾았습니다.`,
            `손이 목에 닿는 순간 지렛대가 잡혔습니다. 저는 그것을 밀었습니다. 어둠이 사라지고 다시 낮과 밤이 깜빡이기 시작했습니다.`,
            `저는 그때 제정신이 아니었습니다. 그래서 멈추지 않고 계속 갔습니다. 계기판의 숫자가 백만을 넘고, 천만을 넘었습니다. 그리고 어느 순간 낮과 밤의 깜빡임이 느려졌습니다.`,
            `지구가 도는 것이 느려진 것입니다. 아주 먼 미래에 저는 멈췄습니다. 바닷가였습니다.`,
            `해가 하늘에 붙박여 있었습니다. 지지도 뜨지도 않았습니다.`,
            `그리고 그 해가 붉고 아주 컸습니다. 바람이 몹시 찼습니다.`,
            `풀도 나무도 없었습니다. 검은 이끼만 바위에 붙어 있었습니다.`,
            `바다는 기름처럼 잔잔했습니다. 그 물가에 무언가 움직이는 것이 있었습니다. 게처럼 생긴 것인데 탁자만큼 컸습니다.`,
            `저는 지렛대를 밀어 더 갔습니다. 삼천만 년쯤 갔을 때, 저는 마지막으로 멈췄습니다. 그 자리에는 아무것도 없었습니다.`,
            `해가 검게 이지러져 있었고, 바다가 얼어 있었습니다. 공기가 얇아서 숨쉬기가 어려웠습니다. 저는 물가에서 검은 것이 하나 꿈틀거리는 것을 보았습니다.`,
            `그것이 제가 본 마지막 생물이었습니다. 저는 정신을 잃을 것 같아 지렛대를 반대로 밀었습니다. 그리고 오늘 저녁 이 작업실로 돌아왔습니다.`,
            `여러분이 저녁을 드시고 계실 때였습니다.`,
            `여기까지가 그 사람이 그날 밤에 한 이야기입니다. 이야기가 끝나자 아무도 말을 하지 않았습니다.`,
            `그러다 의사가 물었습니다.<br>"증거가 있습니까?"`,
            `주인은 주머니에서 꽃 두 송이를 꺼내 상 위에 놓았습니다. 말라 있었지만 아직 형태가 남아 있었습니다. 의사가 그것을 집어 들여다보다가 얼굴이 굳었습니다.`,
            `"이런 꽃은 본 적이 없습니다."`,
            `그날 밤 손님들은 한마디씩 하고 돌아갔습니다. 믿는다고 한 사람은 하나도 없었습니다. 저만 남아서 조금 더 있었습니다.`,
            `주인이 저에게 이렇게 말했습니다.<br>"내일 다시 오시겠습니까. 이번에는 증거를 가져오겠습니다. 사진기를 가지고 가겠습니다."`,
            `이튿날 저는 다시 갔습니다. 작업실 문이 열려 있었고, 안이 비어 있었습니다. 유리 깨지는 소리 같은 것이 들렸고, 바람이 지나가는 것 같았습니다.`,
            `저는 그 자리에 서서 기다렸습니다. 한 시간을 기다렸습니다. 그리고 그날부터 삼 년을 기다렸습니다.`,
            `그 사람은 돌아오지 않았습니다. 저는 가끔 이런 생각을 합니다. 그 사람이 지금 어느 시대에 가 있을까요.`,
            `사람이 아직 짐승과 다르지 않던 아주 먼 옛날일 수도 있고, 우리가 알지 못할 어느 앞날일 수도 있습니다. 그 사람은 사람에게 앞날이 없다고 여기고 떠났습니다. 저는 그렇게 생각하지 않습니다.`,
            `그 사람이 본 것은 사람이 이렇게 될 수도 있다는 것이지, 반드시 그렇게 된다는 것은 아니었습니다. 저는 그 마른 꽃 두 송이를 아직 가지고 있습니다. 사람이 다 사라진 뒤에도 꽃은 피었다는 뜻이니까요.`
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
                ${artFrame('cover.png', '🕰️')}
            </div>
            <div class="story-page-right">
                <h1>타임 머신</h1>
                <p class="cover-tag">H. G. 웰스 원작</p>
                <p>시간도 우리가 지나가는 길이라고 주장하던 발명가가 기계를 타고 팔십만 년 뒤로 갑니다. 거기서 만난 것은 꽃밭에서 놀기만 하는 작고 약한 사람들이었습니다.</p>
                <p>그 사람들이 왜 그렇게 되었는지를 알아내는 순간, 이 이야기는 먼 미래가 아니라 지금 이야기가 됩니다.</p>
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
    { q: "시간 여행자가 말한 네 번째 방향은 무엇입니까?", choices: ["시간", "높이", "속도"], answer: 0 },
    { q: "손님들 앞에서 사라진 것은 무엇입니까?", choices: ["시계", "타임 머신의 작은 모형", "촛불"], answer: 1 },
    { q: "이레 뒤 돌아온 시간 여행자의 모습은 어떠했습니까?", choices: ["말끔했다", "옷이 찢어지고 머리가 세어 있었다", "그대로였다"], answer: 1 },
    { q: "시간 여행 중에 하늘의 해는 어떻게 보였습니까?", choices: ["하늘을 도는 불의 띠로", "그대로", "사라져서"], answer: 0 },
    { q: "시간 여행자가 도착한 해는 언제입니까?", choices: ["삼천 년", "팔십만 이천칠백일 년", "일억 년"], answer: 1 },
    { q: "땅 위에 사는 사람들을 무엇이라고 불렀습니까?", choices: ["엘로이", "몰록", "위나"], answer: 0 },
    { q: "엘로이의 특징이 아닌 것은 무엇입니까?", choices: ["일을 하지 않는다", "몸이 약하다", "머리가 아주 좋다"], answer: 2 },
    { q: "시간 여행자의 기계는 어디로 옮겨졌습니까?", choices: ["강 속", "하얀 스핑크스 아래 청동 문 안", "숲속"], answer: 1 },
    { q: "위나는 어떻게 만난 사람입니까?", choices: ["물에 떠내려가는 것을 건져 냈다", "길을 안내해 줬다", "먼저 찾아왔다"], answer: 0 },
    { q: "엘로이가 밤을 무서워한 까닭은 무엇입니까?", choices: ["어두워서", "밤에 몰록이 사람을 데려가서", "짐승이 나와서"], answer: 1 },
    { q: "땅 아래 사는 몰록의 특징은 무엇입니까?", choices: ["살갗이 희고 눈이 커서 빛을 견디지 못한다", "몸집이 크다", "말을 잘한다"], answer: 0 },
    { q: "두 종족이 갈라진 까닭은 무엇입니까?", choices: ["전쟁", "일하지 않는 쪽과 땅 아래에서 일하는 쪽이 오래 나뉘어서", "다른 별에서 와서"], answer: 1 },
    { q: "처음과 나중에 주인과 일꾼의 자리는 어떻게 되었습니까?", choices: ["그대로였다", "뒤집혔다", "둘 다 사라졌다"], answer: 1 },
    { q: "숲에서 시간 여행자가 잃은 사람은 누구입니까?", choices: ["위나", "의사", "몰록"], answer: 0 },
    { q: "아주 먼 미래의 바닷가에서 본 해는 어떠했습니까?", choices: ["작고 밝았다", "붉고 크고 하늘에 붙박여 있었다", "둘이었다"], answer: 1 },
    { q: "시간 여행자가 남긴 증거는 무엇입니까?", choices: ["사진", "마른 꽃 두 송이", "돌"], answer: 1 }
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
            ${artFrame('end.png', '🌅')}
            <h2>타임 머신를 다 읽었습니다</h2>
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
