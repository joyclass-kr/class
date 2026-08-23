const BOOK_TITLE = "지킬 박사와 하이드";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "그 문 이야기",
        emoji: "🚪",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `런던에 어터슨이라는 변호사가 살았습니다. 말이 적고, 웃는 일이 드물고, 남의 잘못을 함부로 말하지 않는 사람이었습니다. 그래서 사람들이 곤란한 일이 생기면 그 사람을 찾아왔습니다.`,
            `어터슨은 남을 잘 나무라지 않았습니다. 누가 잘못을 저질러도 그 사람과 끝까지 사귀었습니다. 그래서 그 사람의 친구 가운데는 남들이 상대하지 않는 이도 여럿 있었습니다.`,
            `어터슨은 그것에 대해 이렇게 말한 적이 있습니다.`,
            `"나는 카인의 편에 서겠소. 형제를 자기 방식으로 지옥에 가게 두는 거요."`,
            `그런 사람이었습니다. 어터슨에게는 먼 친척인 엔필드라는 사람이 있었습니다. 두 사람은 일요일마다 함께 산책을 했습니다. 그런데 걷는 동안 거의 말을 하지 않았습니다.`,
            `그래도 두 사람은 그 산책을 한 주의 가장 좋은 시간으로 여겼습니다. 어느 일요일, 두 사람은 런던의 어느 뒷골목을 지나고 있었습니다. 그 골목은 깨끗하고 가게들이 잘 정돈되어 있었습니다. 그런데 그 가운데 건물 하나만 이상했습니다.`,
            `창이 하나도 없고, 문이 하나뿐이었습니다. 그 문은 칠이 벗겨졌고, 아래쪽이 발길에 채여 움푹 들어가 있었습니다. 문 앞에 아이들이 앉아 놀고, 부랑자들이 자고 갔습니다.`,
            `엔필드가 그 문을 보더니 걸음을 멈췄습니다.`,
            `"저 문 말인데요."<br>"응."<br>"이상한 일이 있었습니다."`,
            `그리고 엔필드가 이야기를 시작했습니다. 언젠가 겨울 새벽 세 시쯤, 엔필드는 어디를 다녀오는 길에 이 골목을 지났습니다. 거리에 아무도 없었습니다.`,
            `그때 저쪽 모퉁이에서 남자 하나가 빠르게 걸어왔습니다. 그리고 다른 쪽에서는 여자아이 하나가 뛰어왔습니다. 의사를 부르러 가는 길이었던 모양입니다.`,
            `두 사람이 모퉁이에서 부딪쳤습니다. 아이가 넘어졌습니다. 여기까지는 그냥 사고입니다. 그런데 그다음이 이상했습니다.`,
            `그 남자는 넘어진 아이를 일으키지 않았습니다. 그 위를 그대로 밟고 지나갔습니다. 그리고 아이가 우는데도 걸음을 늦추지 않았습니다.`,
            `"저는 그때 사람을 그렇게 보고 그런 마음이 든 적이 처음이었습니다." 엔필드는 뛰어가 그 남자의 옷깃을 잡았습니다.<br>"놓지 않으셨습니까?" 어터슨이 물었습니다.`,
            `"안 놓았습니다. 그자를 끌고 도로 그 자리로 갔습니다."`,
            `"저항하던가."<br>"전혀요. 아주 조용했습니다. 그런데 저를 한 번 보는데······."`,
            `엔필드는 말을 멈추었습니다.`,
            `"그런 눈으로 보는 사람은 처음이었습니다. 저는 그때 땀이 났습니다."`
        ]
    },
    {
        num: 2,
        title: "수표",
        emoji: "💷",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `아이의 식구들이 몰려왔고, 의사도 왔습니다. 사람들이 그 남자를 둘러쌌습니다.`,
            `"경찰을 부릅시다."<br>그러자 그 남자가 말했습니다.<br>"소란 피우고 싶지 않소. 돈을 내지."`,
            `그리고 백 파운드를 물어내겠다고 했습니다. 그 시절 백 파운드는 아주 큰돈이었습니다. 사람들은 그 남자를 놓아주지 않고 함께 그 문 앞까지 갔습니다.`,
            `남자는 열쇠를 꺼내 그 문을 열고 들어갔습니다. 그리고 잠시 뒤 금화 열 닢과 수표 한 장을 들고 나왔습니다. 엔필드가 수표를 보고 놀랐습니다.`,
            `그 수표에 적힌 이름이 아주 유명한 사람의 이름이었기 때문입니다. 점잖고 존경받는 사람이었습니다.`,
            `"위조 아니오?"<br>"아침에 은행에 가 봅시다."`,
            `그래서 사람들은 그 남자를 데리고 아침까지 함께 있었습니다. 아침에 은행에 갔는데 수표는 진짜였습니다. 은행 창구 사람이 아무렇지 않게 돈을 내주었습니다.`,
            `그 계좌에는 돈이 넉넉했습니다. 엔필드는 그것을 보면서 이런 생각을 했습니다. 이 수표에 이름을 적어 준 사람은 그 작은 남자가 무슨 짓을 했는지 알고 있을 것입니다. 그런데도 돈을 내주었습니다.`,
            `그러면 그 두 사람은 무슨 사이일까요. 엔필드가 이야기를 마쳤습니다.`,
            `어터슨이 물었습니다.<br>"그 남자 이름이 뭐라던가."<br>"하이드라고 했습니다."`,
            `어터슨은 그 이름을 듣고 걸음을 늦추었습니다.<br>"생김새가 어떻던가." 엔필드가 잠깐 생각했습니다.`,
            `"말하기가 어렵습니다."<br>"어떻게 어렵나."<br>"어디가 이상한지 딱 짚어 말할 수가 없습니다. 키가 작고, 몸이 좀 굽었고······ 그런데 그게 다가 아닙니다. 보고 있으면 견디기가 힘듭니다."<br>"어떻게 견디기 힘든가."<br>"저는 그 사람을 보자마자 미웠습니다. 왜 미운지 모르겠는데 미웠습니다."`,
            `그날 밤 어터슨은 집에 와서 금고를 열었습니다. 그리고 봉투를 하나 꺼냈습니다. 겉에 이렇게 적혀 있었습니다.`,
            `헨리 지킬 박사의 유언장. 어터슨은 그 유언장을 손에 들고 오래 앉아 있었습니다. 그것을 쓴 것은 지킬 자신이었습니다.`,
            `어터슨은 그 문서를 만드는 데 손도 대지 않았습니다. 변호사로서 도와줄 수 없다고 했기 때문입니다. 그러자 지킬이 혼자 써서 봉해 맡긴 것이었습니다.`
        ]
    },
    {
        num: 3,
        title: "유언장",
        emoji: "📜",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `헨리 지킬은 어터슨의 오랜 친구였습니다. 의사이자 학자였고, 큰 집에 살았고, 사람들이 존경했습니다. 그 유언장은 지킬이 직접 써서 어터슨에게 맡긴 것이었습니다.`,
            `둘은 학생 때부터 알던 사이였습니다. 서른 해 가까이 된 사귐이었습니다.`,
            `어터슨은 그것을 처음 받았을 때부터 마음에 들지 않았습니다. 거기에는 이렇게 적혀 있었습니다.`,
            `"내가 죽으면 내 모든 재산을 에드워드 하이드에게 물려준다." 그리고 한 줄이 더 있었습니다.<br>"내가 석 달 넘게 사라지거나 소식이 없을 경우에도, 아무런 지체 없이 에드워드 하이드가 내 자리를 대신한다."`,
            `어터슨은 그 두 번째 줄이 특히 마음에 걸렸습니다. 보통 유언장에는 그런 것을 적지 않습니다. 그것은 사람이 없어지는 것을 미리 생각해 두었다는 뜻이었습니다.`,
            `사람이 죽는 것은 누구에게나 일어나는 일입니다. 그런데 사라지는 것은 다릅니다. 사라지는 것을 미리 적어 두려면, 사라질 일이 있다는 것을 알고 있어야 합니다.`,
            `어터슨은 그 하이드라는 사람이 누구인지 물은 적이 있었습니다. 지킬은 대답하지 않았습니다.`,
            `한 번 묻고 그만두었습니다. 어터슨은 남에게 두 번 묻는 사람이 아니었습니다.`,
            `"그건 자네가 상관할 일이 아닐세."`,
            `어터슨은 이렇게 짐작했습니다. 지킬이 젊었을 때 무슨 잘못을 저질렀고, 그것을 그 하이드라는 자가 알고 있어서 협박을 하고 있는 것이라고요. 어터슨은 그날 밤 잠을 이루지 못했습니다.`,
            `자꾸 그 이야기가 떠올랐습니다. 새벽 세 시의 빈 거리, 뛰어오는 아이, 그리고 그 위를 밟고 지나가는 발. 그 발의 주인 얼굴이 보이지 않았습니다.`,
            `어터슨은 그 얼굴을 보고 싶었습니다. 이튿날부터 어터슨은 그 문 앞을 지키기 시작했습니다. 밤에 일을 마치고 그 골목에 가서 서 있었습니다.`,
            `한 주 넘게 아무도 오지 않았습니다. 그러다 어느 밤, 발소리가 났습니다. 가볍고 이상한 걸음이었습니다.`,
            `비가 오는 밤도 있었고 안개가 짙은 밤도 있었습니다. 어터슨은 외투 깃을 세우고 그 자리에 서 있었습니다.`,
            `밤마다 그 골목에 서 있는 동안 어터슨은 여러 가지를 생각했습니다. 자기가 지금 하고 있는 것이 변호사가 할 일은 아니었습니다. 그런데 그만두지 못했습니다.`,
            `친구가 무언가에 붙들려 있는 것이 분명했기 때문입니다. 그리고 그 무언가에 얼굴이 없다는 것이 견디기 힘들었습니다.`,
            `이름은 알았습니다. 그런데 이름만으로는 아무것도 알 수 없었습니다.`
        ]
    },
    {
        num: 4,
        title: "하이드",
        emoji: "🌫️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `작은 남자가 문 앞으로 다가와 열쇠를 꺼냈습니다. 어터슨이 어둠에서 나왔습니다.`,
            `발소리가 먼저 들렸습니다. 사람 발소리 같지 않았습니다.`,
            `"하이드 씨 아니십니까." 남자가 숨을 들이켜며 물러섰습니다.`,
            `그러고는 얼굴을 들지 않고 물었습니다.<br>"어떻게 내 이름을 아시오."<br>"저는 지킬 박사의 오랜 친구입니다. 어터슨이라고 합니다."<br>"지킬은 집에 없소."<br>"압니다. 뵙고 싶어서 온 겁니다. 얼굴을 좀 보여 주시겠습니까."`,
            `남자가 잠깐 망설이다가 고개를 들었습니다. 가로등 불빛이 그 얼굴에 닿았습니다. 어터슨은 그 얼굴을 오래 보았습니다. 그리고 나중에 이렇게 적었습니다.`,
            `그 얼굴은 어디가 어떻다고 말할 수 있는 얼굴이 아니었습니다. 눈, 코, 입이 다 제자리에 있었습니다. 키가 작고 몸이 조금 굽었지만, 그런 사람은 얼마든지 있습니다. 그런데 그 사람을 보고 있으면 속이 뒤집혔습니다.`,
            `"그자는 어딘가 잘못 만들어져 있었소. 그런데 어디가 잘못되었는지는 끝까지 말할 수 없었소."`,
            `그것은 아주 짧은 순간이었습니다. 몇 초도 되지 않았습니다. 그런데 어터슨은 그 뒤로 그 얼굴을 여러 해 동안 기억했습니다.`,
            `가로등 하나뿐인 골목이었고 안개가 끼어 있었습니다.`,
            `하이드가 말했습니다.<br>"내 주소를 알려 드리지."`,
            `그리고 소호의 어느 거리를 댔습니다. 어터슨은 그것이 이상했습니다. 묻지도 않았는데 주소를 알려 주었기 때문입니다.`,
            `소호는 그 무렵 런던에서 값싼 방을 얻어 사는 사람들이 모이던 데였습니다.`,
            `유언장 생각이 났습니다. 이 사람은 나중에 재산을 받으려면 이 변호사를 찾아와야 한다는 것을 알고 있었던 것입니다.`,
            `"그럼 이만."`,
            `하이드는 문을 열고 들어가 버렸습니다. 어터슨은 한참 그 자리에 서 있었습니다. 그리고 골목을 돌아 큰길로 나갔습니다.`,
            `열쇠를 쓰는 손이 익숙했습니다. 처음 오는 사람의 손이 아니었습니다.`,
            `그 뒷골목의 문과, 지킬 박사의 크고 훌륭한 집이 같은 건물의 앞뒤라는 것을 그때 알았습니다. 그 문은 지킬의 실험실 뒷문이었습니다. 집에 돌아와 어터슨은 이런 생각을 했습니다.`,
            `저 사람이 지킬의 재산을 노리고 있다면, 지킬이 살아 있는 것이 저 사람에게는 걸림돌입니다. 그리고 유언장에는 지킬이 사라지기만 해도 된다고 적혀 있었습니다. 어터슨은 그날 밤 잠자리에서 몸을 일으켰습니다.`,
            `"헨리를 저 사람에게서 떼어 내야 한다."`,
            `그때 어터슨은 자기가 무엇에서 친구를 떼어 내려는 것인지 알지 못했습니다.`
        ]
    },
    {
        num: 5,
        title: "지킬 박사",
        emoji: "🏠",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `보름 뒤, 지킬의 집에서 저녁 모임이 있었습니다. 손님들이 다 돌아간 뒤 어터슨이 남았습니다. 지킬은 쉰 살쯤 된 크고 잘생긴 사람이었습니다.`,
            `그 집은 런던에서도 좋은 자리에 있었습니다. 앞은 넓은 길에 면해 있었고 창이 크고 밝았습니다. 그 집 뒤가 그 뒷골목이라는 것을 아는 사람은 별로 없었습니다.`,
            `얼굴이 반듯하고 목소리가 좋았습니다.`,
            `사람들이 그 사람과 이야기하고 나면 기분이 좋아졌습니다. 그런 사람이었습니다.`,
            `"자네 무슨 할 말이 있는 얼굴이군."<br>"자네 유언장 말일세."`,
            `지킬의 얼굴이 조금 굳었습니다.`,
            `"그 이야기는 그만하세."<br>"나는 그 하이드라는 자를 만났네."`,
            `지킬의 입술이 하얘졌습니다.`,
            `어터슨은 그것을 보았습니다. 사람이 놀라는 것과 들키는 것은 얼굴에 다르게 나타납니다.`,
            `"헨리, 자네가 무슨 곤란한 일에 걸려 있다면 나에게 말하게. 나는 자네 변호사일세. 내가 꺼내 주겠네."`,
            `지킬은 어터슨의 손을 잡았습니다.`,
            `그 손이 뜨거웠습니다.`,
            `"고맙네. 정말 고맙네. 자네는 좋은 사람일세."`,
            `"그럼 말해 보게."<br>"그런데 이건 자네가 생각하는 그런 일이 아닐세."<br>"그럼 무슨 일인가."`,
            `지킬은 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"이건 아무에게도 말할 수 없는 일일세. 그리고 내가 원하면 언제든 그자를 떼어 낼 수 있네. 그건 자네에게 손을 걸고 약속하겠네."<br>"정말인가."<br>"정말일세."<br>그리고 지킬이 덧붙였습니다.<br>"다만 한 가지만 들어주게. 나에게 무슨 일이 생기면, 그자의 권리를 지켜 주게. 자네는 그자를 싫어하겠지만."`,
            `어터슨은 한숨을 쉬었습니다.<br>"내가 그자를 좋아하게 되지는 않겠네."`,
            `지킬이 웃었습니다. 그 웃음이 조금 이상했습니다.`,
            `웃는 얼굴인데 눈이 웃지 않았습니다.`,
            `"좋아할 필요 없네. 그건 나도 마찬가지니까."<br>"그래도 되네. 다만 지켜만 주게."`,
            `어터슨은 그 말을 그때는 흘려들었습니다.`,
            `어터슨은 그러겠다고 했습니다. 그리고 그날 밤 집으로 돌아왔습니다. 지킬이 한 말 가운데 한 대목이 계속 걸렸습니다.`,
            `변호사로서 한 약속이었습니다. 그리고 어터슨은 한번 한 약속을 어기는 사람이 아니었습니다. 그것이 나중에 그 사람을 오래 괴롭힙니다.`,
            `내가 원하면 언제든 떼어 낼 수 있다는 말이었습니다. 사람이 그런 말을 할 때는, 대개 아직 해 보지 않은 것입니다.`,
            `해 본 사람은 그렇게 말하지 않습니다. 해 본 사람은 어렵다고 말합니다.`
        ]
    },
    {
        num: 6,
        title: "커루 경 사건",
        emoji: "🌕",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `거의 한 해가 지났습니다. 그동안 아무 일도 없었습니다. 그러다 시월 어느 밤, 런던에 큰 사건이 났습니다.`,
            `그동안 어터슨은 여러 번 지킬을 만났습니다. 지킬은 아무렇지 않아 보였습니다. 하이드 이야기는 서로 꺼내지 않았습니다.`,
            `강가 어느 집 하녀가 창가에 앉아 밖을 보고 있었습니다. 달이 아주 밝은 밤이었습니다. 길에 나이 지긋한 신사가 하나 걸어오고 있었습니다.`,
            `잠이 오지 않아 앉아 있었다고 했습니다. 그 하녀는 나중에 재판에서 그날 본 것을 다 말했습니다.`,
            `머리가 하얗고, 몸가짐이 점잖았습니다. 하녀는 나중에 그 사람의 얼굴이 아주 다정해 보였다고 말했습니다. 그 신사가 맞은편에서 오는 작은 남자를 만났습니다.`,
            `신사가 모자를 들고 무언가를 물었습니다. 길을 묻는 것 같았습니다.`,
            `그때 그 작은 남자가 갑자기 지팡이를 들었습니다. 하녀는 그 뒤를 보지 못했습니다. 그 자리에서 기절했기 때문입니다.`,
            `길을 묻는 사람에게 그런 일이 일어날 까닭이 하나도 없었습니다. 그것이 이 사건에서 사람들을 제일 무섭게 한 대목이었습니다.`,
            `깨어난 것은 새벽 두 시였습니다. 하녀는 경찰을 불렀습니다. 그 신사는 댄버스 커루 경이라는 사람이었습니다.`,
            `국회 의원이었고, 온 나라가 아는 사람이었습니다. 그 사람이 그렇게 되었다는 소식에 런던이 발칵 뒤집혔습니다. 그 자리에서 부러진 지팡이 반쪽이 나왔습니다. 그리고 그 신사의 주머니에서 편지가 하나 나왔습니다.`,
            `그 사람은 어터슨의 의뢰인이기도 했습니다. 그래서 어터슨은 그 얼굴을 잘 알고 있었습니다.`,
            `어터슨에게 보내려던 편지였습니다. 그래서 경찰이 어터슨을 불렀습니다. 어터슨은 그 부러진 지팡이를 보았습니다. 그리고 얼굴이 굳었습니다.`,
            `그 지팡이는 여러 해 전에 어터슨이 지킬에게 선물한 것이었습니다.<br>"범인이 누군지 알 것 같습니다."`,
            `어터슨은 경찰을 데리고 소호로 갔습니다. 하이드가 알려 준 주소였습니다. 그 집은 안개 속에 잠겨 있었습니다.`,
            `방 안은 훌륭하게 꾸며져 있었습니다. 벽에 좋은 그림이 걸려 있었고, 은식기가 있었습니다. 그런데 옷장이 뒤집혀 있었고, 벽난로에 무언가 태운 재가 남아 있었습니다.`,
            `그 방을 꾸민 사람은 좋은 것을 볼 줄 아는 사람이었습니다. 어터슨은 그것이 이상했습니다. 그 얼굴을 한 자가 이런 방에 살고 있었던 것입니다.`,
            `그 재 속에서 수표책의 남은 조각이 나왔습니다. 하이드는 이미 떠난 뒤였습니다.`,
            `그날 이후로 런던에서 그 사람을 보았다는 사람이 하나도 없었습니다. 사람이 그렇게 감쪽같이 사라지는 일은 드뭅니다.`
        ]
    },
    {
        num: 7,
        title: "그 뒤 두 달",
        emoji: "🕯️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그다음 날 어터슨은 지킬을 찾아갔습니다. 지킬은 실험실 안쪽 방에서 나왔습니다. 몹시 상해 있었습니다.`,
            `그 집에 들어가 본 것이 여러 달 만이었습니다.`,
            `살이 빠졌고, 얼굴빛이 나빴습니다.`,
            `"헨리, 자네 그자를 숨겨 주고 있는 건 아니겠지."<br>"맹세하네. 나는 이제 그자와 아무 상관이 없네. 그자는 다시 오지 않을 걸세."<br>"어떻게 그렇게 확신하나."<br>"그냥 아네."`,
            `그러고는 편지를 하나 내밀었습니다. 하이드가 보냈다는 편지였습니다. 그동안 도와줘서 고맙다, 걱정하지 마라, 나에게는 달아날 길이 있다는 내용이었습니다.`,
            `어터슨은 그 편지를 가지고 나왔습니다. 봉투가 없는 편지였습니다. 지킬은 하이드가 가지고 왔다가 봉투를 태웠다고 했습니다.`,
            `어터슨은 그것이 이상했습니다. 그런데 그 자리에서는 묻지 않았습니다. 그리고 자기 사무실의 서기에게 보여 주었습니다.`,
            `그 서기는 글씨를 보는 데 아주 밝은 사람이었습니다. 서기는 그 편지와 지킬이 쓴 다른 글을 나란히 놓고 한참 들여다보았습니다.`,
            `여러 해 동안 계약서를 다룬 사람이라 남의 글씨를 보는 눈이 있었습니다.`,
            `그리고 이렇게 말했습니다.<br>"기울기만 다릅니다. 나머지는 같은 사람 글씨입니다."`,
            `어터슨은 그 말을 듣고 아무 말도 하지 못했습니다. 그날 밤 어터슨은 이렇게 생각했습니다. 지킬이 살인자를 위해 편지를 위조해 준 것이라고요.`,
            `그것 말고 다른 설명은 떠오르지 않았습니다. 그런데 그 뒤 두 달 동안 이상한 일이 있었습니다. 지킬이 아주 좋아진 것입니다.`,
            `집 문을 열고 손님을 맞았고, 사람들과 어울렸고, 가난한 사람들을 돕는 일에 다시 나섰습니다. 얼굴이 밝아졌습니다.`,
            `그렇게 두 달이 지난 어느 날, 어터슨이 찾아가자 하인이 이렇게 말했습니다.<br>"박사님은 아무도 만나지 않으십니다."`,
            `그 뒤로 지킬은 다시 나오지 않았습니다. 어터슨은 여러 번 그 집에 갔습니다.`,
            `그때마다 하인이 같은 말을 했습니다.`,
            `"박사님은 실험실에 계십니다. 아무도 만나지 않으십니다."`,
            `어터슨은 그 실험실 문 앞까지 가 본 적도 있었습니다. 안에서 발소리가 났습니다. 아주 느린 발소리가 방 안을 왔다 갔다 했습니다.`,
            `밤낮으로 그랬습니다.`,
            `하인들은 그 소리를 들으며 잠을 잤습니다. 그리고 그 발소리가 주인의 발소리와 다르다는 것을 다들 알고 있었습니다.`
        ]
    },
    {
        num: 8,
        title: "래니언 박사",
        emoji: "🩺",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `어터슨은 래니언이라는 의사를 찾아갔습니다. 래니언은 지킬과 어터슨의 오랜 친구였습니다. 셋은 학생 때부터 알던 사이였습니다.`,
            `래니언은 런던에서 손꼽히는 의사였습니다. 환자가 많았고 학회에서 이름이 높았습니다.`,
            `다만 래니언과 지킬은 몇 해 전에 사이가 틀어졌습니다. 지킬이 하는 연구가 말이 안 된다고 래니언이 말했기 때문입니다.`,
            `"그건 학문이 아니라 헛소리일세."`,
            `그 뒤로 두 사람은 왕래를 끊었습니다. 젊었을 때 세 사람은 자주 어울렸습니다. 래니언은 목소리가 크고 잘 웃는 사람이었습니다.`,
            `말다툼이 크게 났던 것도 아니었습니다. 그냥 서로 부르지 않게 된 것입니다. 오래된 사귐은 대개 그렇게 끊어집니다.`,
            `지킬은 늘 무언가를 골똘히 생각했습니다. 어터슨은 그 사이에서 듣는 쪽이었습니다. 어터슨이 래니언의 집에 들어섰을 때, 그는 놀라서 걸음을 멈췄습니다.`,
            `래니언이 죽어 가는 사람처럼 보였기 때문입니다. 보름 전에 만났을 때만 해도 혈색이 좋고 목소리가 컸습니다. 그런데 지금은 얼굴이 하얗고 손이 떨렸습니다.`,
            `"자네 어디 아픈가."<br>"나는 곧 죽네."<br>"무슨 소린가."<br>"나는 무언가를 보았네. 그리고 그것을 보고 나서 살고 싶은 마음이 없어졌네."<br>어터슨이 물었습니다.<br>"지킬 때문인가."`,
            `그 이름이 나오자 래니언이 손을 들어 막았습니다.`,
            `"그 사람 이름을 내 앞에서 말하지 말게."<br>"셋이 오랜 친구 아닌가."<br>"헨리 지킬은 나에게 이미 죽은 사람일세."`,
            `어터슨은 더 묻지 못했습니다. 래니언은 두 주 뒤에 세상을 떠났습니다. 장례를 치른 뒤 어터슨에게 봉투가 하나 전해졌습니다.`,
            `의사들이 까닭을 대지 못했습니다. 몸에 병이 없었기 때문입니다.`,
            `래니언의 글씨로 이렇게 적혀 있었습니다.`,
            `"어터슨에게. 헨리 지킬이 죽거나 사라지기 전에는 열지 말 것."`,
            `어터슨은 그것을 금고에 넣었습니다. 그리고 여러 번 그 앞에 서서 망설였습니다.`,
            `그때마다 문을 닫았습니다. 직업이 변호사였기 때문입니다. 변호사는 남이 맡긴 것을 함부로 열지 않습니다.`,
            `어터슨은 그 봉투를 볼 때마다 지킬의 유언장이 떠올랐습니다. 두 문서가 다 같은 말을 하고 있었습니다. 헨리 지킬이 사라질 수 있다는 말이었습니다.`,
            `한 사람은 그것을 미리 준비해 두었고, 다른 사람은 그것을 보고 죽어 갔습니다.`,
            `어터슨은 그 두 문서를 같은 금고에 넣어 두었습니다.`
        ]
    },
    {
        num: 9,
        title: "창가에서",
        emoji: "🪟",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `어느 일요일, 어터슨과 엔필드가 또 산책을 하다가 그 골목에 이르렀습니다.`,
            `그 산책은 여러 해 동안 이어진 것이었습니다. 그리고 두 사람은 그날 이후로 다시는 그 골목으로 가지 않았습니다.`,
            `"저 문이 그 문일세." 어터슨이 말했습니다.<br>"저 뒤가 지킬의 집이야."`,
            `두 사람은 그 뒷마당 쪽으로 돌아 들어갔습니다. 마당은 눅눅하고 어두웠습니다. 그 마당은 원래 무언가를 짓던 자리라고 했습니다.`,
            `해가 거의 들지 않았습니다. 낮인데도 벽 아래가 어두웠습니다.`,
            `지금은 아무것도 없고, 돌바닥에 이끼가 끼어 있었습니다. 지킬은 그 실험실을 어느 외과 의사에게서 사들였습니다. 그 의사가 죽고 나서 오래 비어 있던 건물이었습니다.`,
            `이층에 창이 셋 있었는데, 그 가운데 하나가 반쯤 열려 있었습니다. 그 창가에 지킬이 앉아 있었습니다. 죄수처럼 앉아 있었습니다.`,
            `"헨리!" 지킬이 고개를 들었습니다.`,
            `그 얼굴을 보고 어터슨은 놀랐습니다. 창가에 앉은 사람은 여윈 데다 얼굴빛이 흙빛이었습니다.`,
            `"자네인가."<br>"내려오게. 같이 좀 걷세. 바람을 쐬어야지."<br>"고맙네. 그러고 싶네. 그런데 안 되네."<br>"왜 안 되나."<br>"안 되네."`,
            `두 사람은 마당에 서서 잠깐 이야기를 나누었습니다. 그러다 어터슨이 무슨 말을 하려는데, 지킬의 얼굴이 갑자기 달라졌습니다. 무엇을 본 것 같았습니다.`,
            `날씨 이야기를 했습니다. 그것 말고 할 이야기가 없었기 때문입니다.`,
            `아니면 무엇이 안에서 올라온 것 같았습니다. 그 얼굴에 아주 짧게 무서움과 절망이 지나갔습니다. 그리고 창이 쾅 닫혔습니다.`,
            `커튼이 내려왔습니다. 그 뒤로 아무 소리도 나지 않았습니다.`,
            `어터슨과 엔필드는 그 자리에 굳어 섰습니다. 한참 뒤에 두 사람은 아무 말 없이 마당을 나왔습니다.`,
            `큰길에 이르러서야 어터슨이 입을 열었습니다.<br>"하느님, 저희를 용서하십시오."`,
            `엔필드는 고개만 끄덕였습니다. 두 사람은 그날 그 이야기를 더 하지 않았습니다.`,
            `그날 밤 어터슨은 잠을 이루지 못했습니다. 그 얼굴이 눈앞에서 사라지지 않았습니다. 지킬은 무언가를 무서워하고 있었습니다. 그런데 그것은 밖에 있는 것이 아니었습니다.`,
            `밖에 있는 것이라면 도망칠 수 있습니다. 지킬은 도망치지 않고 그 방에 앉아 있었습니다.`,
            `그러니 그것은 그 방 안에 있는 것이었습니다. 아니면 그보다 더 가까운 데 있는 것이었습니다.`
        ]
    },
    {
        num: 10,
        title: "문을 부수다",
        emoji: "🪓",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `어느 밤, 지킬의 늙은 하인 풀이 어터슨을 찾아왔습니다. 얼굴이 하얗게 질려 있었습니다.`,
            `비바람이 치는 밤이었습니다. 풀은 우산도 없이 왔습니다.`,
            `"변호사님, 뭔가 잘못됐습니다."<br>"무슨 일인가."<br>"박사님이 한 주 넘게 실험실에서 안 나오십니다. 문을 잠그고 계십니다."<br>"아프신 것 아닌가."<br>"그게 아닙니다. 저희에게 심부름을 시키시는데, 종이에 적어서 문틈으로 내보내십니다. 약을 사 오라는 심부름입니다."<br>"그럼 사다 드리면 되지 않나."<br>"사다 드렸습니다. 그런데 자꾸 아니라고 하십니다. 이건 순수하지 않다고, 다른 약방에 가 보라고 하십니다. 벌써 온 런던의 약방을 다 돌았습니다."<br>풀은 말을 잇지 못하다가 이렇게 덧붙였습니다.<br>"그리고 그건 박사님 목소리가 아닙니다."`,
            `어터슨은 풀을 따라나섰습니다. 그 집에는 하인들이 다 부엌에 모여 있었습니다. 무서워서 흩어지지 못하고 있었던 것입니다.`,
            `가는 길에 바람이 몹시 불었습니다. 거리에 사람이 하나도 없었습니다.`,
            `두 사람은 실험실로 갔습니다. 풀이 문을 두드렸습니다.`,
            `"박사님, 어터슨 변호사님이 오셨습니다." 안에서 목소리가 났습니다.<br>"아무도 못 만난다고 하게."`,
            `어터슨은 그 소리를 듣고 한 발 물러섰습니다. 지킬의 목소리가 아니었습니다.`,
            `"풀, 저건 누구 목소리인가."<br>"그러니까 제가 말씀드리지 않았습니까."`,
            `풀이 또 이런 이야기를 했습니다. 며칠 전에 그 방에서 사람이 나오는 것을 보았는데, 그것이 박사님이 아니었다는 것입니다. 키가 작았고, 박사님 옷을 입었는데 옷이 너무 컸다고 했습니다.`,
            `그 사람이 풀을 보고 짐승 같은 소리를 내며 안으로 달아났다고 했습니다.<br>"변호사님, 저 안에 있는 게 우리 주인님이 아닙니다."`,
            `풀은 스무 해 넘게 그 집에서 일한 사람이었습니다. 주인의 발소리와 기침 소리를 다 아는 사람이었습니다. 그런 사람이 그렇게 말하고 있었습니다.`,
            `어터슨은 그 말을 흘려들을 수 없었습니다. 어터슨은 도끼를 가져오라고 했습니다.`,
            `변호사가 남의 집 문을 부수는 것은 법에 어긋나는 일이었습니다. 어터슨은 그것을 알면서 했습니다.`,
            `"헨리! 문을 열게! 열지 않으면 부수겠네!"`,
            `안에서 소리가 났습니다.`,
            `"어터슨, 제발! 제발 그러지 말게!"`,
            `그 목소리는 지킬의 목소리였습니다. 어터슨이 도끼를 들었습니다. 문이 부서지고 두 사람이 안으로 들어갔습니다.`,
            `그 안에서 무언가 떨어지는 소리가 났습니다. 그리고 조용해졌습니다.`
        ]
    },
    {
        num: 11,
        title: "래니언의 편지",
        emoji: "✉️",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `방 안은 조용했습니다. 난롯불이 타고 있었고, 찻잔이 놓여 있었습니다. 그리고 바닥에 사람이 하나 쓰러져 있었습니다.`,
            `실험 도구가 늘어서 있었고 종이가 흩어져 있었습니다. 그리고 거울이 하나 서 있었습니다. 실험실에 있을 만한 물건이 아니었습니다.`,
            `작은 사람이었습니다. 지킬의 옷을 입고 있었는데 소매와 바짓단이 접혀 있었습니다. 얼굴은 하이드였습니다.`,
            `그 손에 작은 병이 쥐여 있었고, 방 안에 쓴 냄새가 났습니다. 두 사람은 온 집을 뒤졌습니다. 지킬은 어디에도 없었습니다.`,
            `병은 비어 있었습니다.`,
            `책상 위에 봉투가 셋 놓여 있었습니다. 하나는 지킬이 어터슨에게 남긴 짧은 쪽지였습니다.`,
            `"이것을 읽거든 나는 이미 없을 걸세. 어떻게 없어졌는지는 나도 모르네. 다만 그때가 왔다는 것은 아네."`,
            `"래니언이 준 봉투를 먼저 읽게. 그리고 이 두꺼운 것을 읽게."`,
            `어터슨은 집으로 돌아가 래니언의 봉투를 열었습니다. 거기에는 이렇게 적혀 있었습니다.`,
            `어느 밤 래니언에게 지킬의 편지가 왔습니다. 지킬의 집에 가서 실험실 서랍 하나를 통째로 꺼내 오라는 부탁이었습니다. 그리고 자정에 어떤 사람이 찾아올 텐데, 그 사람에게 그것을 내주라고 했습니다.`,
            `그때 두 사람은 여러 해 동안 말을 하지 않던 사이였습니다. 그런데도 편지가 온 것입니다.`,
            `편지가 몹시 다급했습니다. 래니언은 시키는 대로 했습니다. 서랍 안에는 흰 가루가 든 종이 봉지 몇 개와, 붉은 액체가 든 병이 있었습니다.`,
            `자정에 사람이 왔습니다. 키가 작고 몸이 굽은 남자였습니다. 래니언은 그 사람을 보고 견디기 힘든 기분이 들었습니다.`,
            `남자는 그 서랍을 보고 손을 떨었습니다. 그리고 가루와 액체를 섞었습니다. 색이 붉은빛에서 보랏빛으로, 다시 옅은 초록빛으로 변했습니다.`,
            `남자가 잔을 들고 래니언을 보았습니다.`,
            `"당신은 학자요. 나가 있겠소, 아니면 볼 거요?"`,
            `"보겠소."<br>"그럼 보시오. 그리고 오늘 본 것을 잊지 마시오."`,
            `그리고 남자가 그것을 마셨습니다. 래니언은 그다음에 무엇을 보았는지 그 편지에 적었습니다. 그 몸이 부풀고 얼굴이 바뀌더니, 거기에 헨리 지킬이 서 있었다고요.`,
            `편지의 마지막 줄은 이랬습니다.`,
            `"나는 그날 이후 잠을 자지 못한다. 나는 그것을 보았고, 그래서 나는 못 산다."`,
            `사람이 무엇을 보고 죽을 수도 있다는 것을, 어터슨은 그때 알았습니다.`
        ]
    },
    {
        num: 12,
        title: "헨리 지킬의 진술",
        emoji: "⚗️",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그리고 어터슨은 두꺼운 봉투를 열었습니다. 지킬이 스스로 쓴 진술서였습니다. 아래는 그 글의 내용입니다.`,
            `그 봉투는 아주 두꺼웠습니다. 여러 밤에 걸쳐 쓴 글이었습니다. 글씨가 뒤로 갈수록 흔들려 있었습니다.`,
            `나는 좋은 집에 태어났고, 머리가 좋았고, 일찍부터 존경을 받았다. 그런데 나에게는 다른 쪽이 있었다. 놀고 싶고, 규칙을 어기고 싶고, 남이 보지 않는 데서 마음대로 하고 싶은 쪽이었다.`,
            `그런 마음은 누구에게나 있다. 그런데 나는 존경받는 사람이었으므로 그것을 감추어야 했다. 그리고 감추면 감출수록 그 마음이 커졌다.`,
            `다른 사람들은 그것을 데리고 산다. 조금 부끄러워하면서, 가끔 지면서, 그래도 데리고 산다. 나는 그러지 못했다.`,
            `나는 오랫동안 두 사람으로 살았다. 그러다 이런 생각을 하게 되었다. 사람이 한 몸에 두 마음을 담고 있는 것이 문제라면, 그 둘을 갈라놓으면 되지 않겠는가.`,
            `낮에는 존경받는 의사였고, 그러면서 속으로는 다른 것을 원했다. 그 두 가지가 다 나였다. 그런데 나는 그것을 견디지 못했다.`,
            `그러면 좋은 쪽은 나쁜 쪽 때문에 부끄러워하지 않아도 되고, 나쁜 쪽은 좋은 쪽 눈치를 볼 필요가 없다. 나는 그 생각을 여러 해 붙들었다. 그리고 마침내 약을 만들었다.`,
            `처음 그것을 마신 밤을 나는 잊지 못한다. 뼈가 갈리는 것처럼 아팠고, 죽는 줄 알았다. 그리고 그것이 지나가자 나는 아주 가벼웠다.`,
            `나는 그 약이 나를 죽일 수도 있다는 것을 알고 있었다. 그래도 마셨다. 그때 나는 그것을 용기라고 여겼다.`,
            `거울을 보니 다른 사람이 서 있었다. 키가 작고 몸이 굽어 있었다. 왜 그런가 하면, 그것은 내 안의 한쪽만 떼어 낸 것이었기 때문이다.`,
            `내 평생의 대부분은 좋은 쪽으로 살았으므로 그쪽이 컸다. 그러니 나쁜 쪽만 떼어 내면 작을 수밖에 없었다. 나는 그를 하이드라고 불렀다.`,
            `숨는다는 뜻이었다. 처음 얼마 동안은 즐거웠다. 나는 밤에 하이드가 되어 나갔다. 그리고 아침에 약을 마시고 지킬로 돌아와 아무 일 없었던 얼굴로 살았다.`,
            `이름을 그렇게 지은 것도 나였다. 나는 그때 그것이 재치 있다고 생각했다.`,
            `그런데 어느 아침, 나는 깨어나 손을 보고 놀랐다. 약을 마시지 않았는데 하이드의 손이었다.`,
            `그날부터 무너지기 시작했다. 약을 두 배로 마셔야 지킬로 돌아올 수 있게 되었다. 그리고 곧 세 배가 되었다.`,
            `나는 두려웠다. 그런데 그만두지 못했다. 그때는 이미 그만두는 것이 내 손에 있지 않았다.`,
            `커루 경의 일이 있고 나서 나는 다시는 하이드가 되지 않겠다고 맹세했다. 두 달을 지켰다. 그 두 달이 내 인생에서 가장 좋은 때였다. 그러다 어느 날 공원 벤치에 앉아 있다가, 나는 내가 남들보다 낫다는 생각을 했다.`,
            `나는 다시 사람들 사이에 나갔다. 아픈 사람을 보았고, 친구를 만났고, 밤에 잘 잤다.`,
            `그 생각을 하는 순간 몸이 뒤틀렸다. 약을 마시지 않았는데 하이드가 되었다.`,
            `그때부터는 그가 주인이었다. 내가 약을 마셔야 잠깐 지킬이 되었다. 그리고 마지막에는 약을 만들 수 없게 되었다.`,
            `처음에 사 두었던 가루에 무언가 다른 것이 섞여 있었던 모양이다. 그 섞인 것이 약을 듣게 한 것이었다. 그러니 깨끗한 가루로는 아무리 만들어도 듣지 않았다.`,
            `나는 온 런던의 약방을 뒤졌다. 그런데 그 섞인 것이 든 가루를 다시 찾지 못했다. 내가 만든 것이 무엇이었는지 나조차 끝내 알지 못한 것이다.`,
            `이제 나는 한 시간 뒤면 영영 하이드가 된다. 그가 어떻게 할지 나는 모른다. 이것이 내가 지킬로서 쓰는 마지막 글이다.`,
            `다만 한 가지는 적어 두고 싶다. 나는 내 안의 나쁜 쪽을 떼어 내면 좋은 쪽이 자유로워질 줄 알았다. 그런데 그렇게 되지 않았다.`,
            `떼어 내고 보니 좋은 쪽도 온전한 사람이 아니었다. 사람은 그 둘을 다 데리고 살아야 하는 것이었다. 그것이 힘들다고 해서 하나를 잘라 내면, 남은 쪽도 사람이 아니게 된다.`,
            `나는 그것을 알아내는 데 평생을 썼다.`,
            `여기서 헨리 지킬의 진술은 끝납니다. 어터슨은 그 글을 다 읽고 오래 앉아 있었습니다. 그러고는 불을 끄고 창가로 갔습니다.`,
            `밖에 런던의 불빛이 아직 켜져 있었습니다. 그 불빛 아래 사람들이 걸어 다니고 있었습니다. 어터슨은 그 사람들을 오래 보았습니다.`,
            `그 가운데 누구도 온전히 좋은 사람은 아닐 것이었습니다. 그리고 어터슨은 그것이 처음으로 다행이라고 생각했습니다.`
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
                ${artFrame('cover.png', '🚪')}
            </div>
            <div class="story-page-right">
                <h1>지킬 박사와 하이드</h1>
                <p class="cover-tag">로버트 루이스 스티븐슨 원작</p>
                <p>런던의 존경받는 의사 헨리 지킬과, 그와 어울릴 리 없는 사내 에드워드 하이드. 변호사 어터슨이 그 둘의 관계를 파고듭니다.</p>
                <p>괴물이 나오는 이야기가 아니라, 사람이 자기 안의 한쪽을 떼어 내려다 어떻게 되는지에 대한 이야기입니다.</p>
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
    { q: "엔필드가 목격한 새벽의 사건은 무엇입니까?", choices: ["넘어진 아이를 밟고 지나간 일", "빈집 문을 열고 들어간 일", "길에서 사람을 붙잡고 다툰 일"], answer: 0 },
    { q: "하이드가 물어낸 돈은 누구의 수표였습니까?", choices: ["어터슨 변호사", "헨리 지킬 박사", "래니언 박사"], answer: 1 },
    { q: "지킬의 유언장에서 어터슨이 가장 이상하게 여긴 대목은 무엇입니까?", choices: ["지킬이 사라질 경우까지 적어 둔 것", "재산을 하이드에게 준다고 한 것", "어터슨을 집행인으로 세운 것"], answer: 0 },
    { q: "하이드를 본 사람들이 공통으로 말한 것은 무엇입니까?", choices: ["키가 아주 커서 위에서 내려다본다", "어디가 이상한지 못 짚겠는데 견디기 힘들다", "얼굴이 몹시 흉해서 보기가 어려웠다"], answer: 1 },
    { q: "그 뒷골목의 문은 어디로 이어져 있었습니까?", choices: ["지킬 박사 집 실험실 뒷문", "하이드가 세를 든 소호의 방", "래니언 박사의 진료실 옆문"], answer: 0 },
    { q: "커루 경 사건의 목격자는 누구입니까?", choices: ["맞은편 집의 늙은 의사", "길을 지나던 야경꾼", "창가에 앉아 있던 하녀"], answer: 2 },
    { q: "어터슨이 범인을 짐작한 단서는 무엇입니까?", choices: ["하녀가 말한 옷차림과 걸음", "커루 경 주머니에 있던 편지", "자기가 지킬에게 선물한 지팡이"], answer: 2 },
    { q: "하이드가 보냈다는 편지의 글씨는 어떠했습니까?", choices: ["글씨가 흔들려 누구 것인지 알 수 없었다", "기울기만 다르고 지킬의 글씨와 같았다", "지킬의 글씨와 아무 데도 닮지 않았다"], answer: 1 },
    { q: "래니언 박사가 앓아누운 까닭은 무엇입니까?", choices: ["겨울에 오래 앓던 병이 도져서", "지킬과 크게 다투고 마음이 상해서", "그 일을 자기 눈으로 직접 보고 나서"], answer: 2 },
    { q: "하인 풀이 이상하다고 여긴 것은 무엇입니까?", choices: ["실험실에서 밤마다 불빛이 새어 나왔다", "안에서 나는 목소리가 주인 것이 아니었다", "주인이 열흘 넘게 밥을 들이지 않았다"], answer: 1 },
    { q: "실험실 문을 부수고 들어가 발견한 것은 무엇입니까?", choices: ["책상에 엎드려 있는 지킬", "지킬의 큰 옷을 입은 하이드", "아무도 없이 비어 있는 방"], answer: 1 },
    { q: "지킬이 두 마음을 갈라놓으려 한 까닭은 무엇입니까?", choices: ["존경받는 쪽과 감추는 쪽을 따로 살게 하려고", "병든 몸에서 아픈 쪽만 떼어 내 보려고", "사람의 마음이 몇 개인지 알아보려고"], answer: 0 },
    { q: "하이드의 몸집이 작았던 까닭은 무엇입니까?", choices: ["지킬의 삶에서 그쪽이 작은 부분이어서", "먹지도 자지도 않고 지냈기 때문에", "약을 아주 조금만 마셨기 때문에"], answer: 0 },
    { q: "지킬이 하이드에게 붙인 이름의 뜻은 무엇입니까?", choices: ["쫓는다", "가른다", "숨는다"], answer: 2 },
    { q: "두 달을 잘 지내던 지킬이 다시 하이드가 된 계기는 무엇입니까?", choices: ["커루 경 사건이 신문에 난 순간", "약을 다시 한 모금 마셔 본 순간", "자기가 남들보다 낫다고 생각한 순간"], answer: 2 },
    { q: "지킬이 끝내 약을 다시 만들지 못한 까닭은 무엇입니까?", choices: ["처음 쓴 가루에 섞였던 것을 못 구해서", "약방들이 그 가루를 팔지 않게 되어서", "만드는 법을 적은 공책을 잃어버려서"], answer: 0 }
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
            ${artFrame('end.png', '⚗️')}
            <h2>지킬 박사와 하이드를 다 읽었습니다</h2>
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
