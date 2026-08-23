const BOOK_TITLE = "그리스 신화";

const CHAPTER_LABEL = () => '';

const CHAPTERS = [
    {
        num: 1,
        title: "불을 훔친 프로메테우스",
        emoji: "🔥",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `아주 오랜 옛날, 세상에는 신들이 살았습니다. 그 신들 가운데 프로메테우스라는 이가 있었습니다. 프로메테우스라는 이름은 '먼저 생각하는 자'라는 뜻입니다.`,
            `그에게는 동생이 있었습니다. 에피메테우스, 곧 '나중에 생각하는 자'였습니다.`,
            `두 형제는 땅 위의 생물들에게 재주를 하나씩 나누어 주는 일을 맡았습니다. 동생이 먼저 하겠다고 했습니다. 에피메테우스는 신이 나서 나누어 주었습니다.`,
            `사자에게는 이빨과 발톱을, 새에게는 날개를, 거북에게는 등딱지를, 여우에게는 꾀를 주었습니다. 말에게는 빠른 다리를, 곰에게는 두꺼운 털을 주었습니다. 그러다 다 나누어 주고 나서 뒤를 돌아보니, 아직 아무것도 못 받은 것이 하나 남아 있었습니다.`,
            `사람이었습니다. 사람은 이빨도 약하고, 발톱도 없고, 털도 없고, 빠르지도 않았습니다. 곰보다 약하고, 말보다 느리고, 새처럼 날지도 못했습니다.`,
            `밤이 되면 추웠고, 짐승이 오면 도망칠 수밖에 없었습니다. 프로메테우스가 보기에 사람은 그대로 두면 한 해도 못 넘길 것 같았습니다. 에피메테우스는 형에게 갔습니다.`,
            `"형, 큰일 났어. 사람한테 줄 것이 없어."`,
            `프로메테우스는 사람을 오래 지켜보았습니다. 그리고 사람에게 무엇을 주어야 할지 알았습니다. 불이었습니다. 그런데 불은 신들의 것이었습니다.`,
            `신들의 왕 제우스는 그것을 사람에게 주지 말라고 했습니다.<br>"사람이 불을 가지면 우리처럼 되려고 할 것이다."`,
            `프로메테우스는 그 말을 듣고도 마음을 정했습니다. 그는 속이 빈 회향나무 줄기를 하나 들고 올림포스 산으로 올라갔습니다. 그리고 신들의 화로에서 불씨를 하나 옮겨 담았습니다. 그리고 그것을 사람에게 가져다주었습니다.`,
            `그날 밤 땅 위 여기저기에 불빛이 생겼습니다. 불이 생기자 사람의 삶이 통째로 달라졌습니다. 밤에 짐승이 다가오지 못했습니다.`,
            `고기를 익혀 먹으니 병이 줄었습니다. 그리고 무엇보다, 밤에도 무언가를 할 수 있게 되었습니다. 그 불에서 대장간이 나왔고, 그릇을 굽는 가마가 나왔고, 나중에는 쇠가 나왔습니다.`,
            `제우스가 하늘에서 그것을 내려다보았습니다. 그리고 알았습니다. 프로메테우스는 붙잡혀 카우카소스 산의 바위에 묶였습니다. 그리고 벌을 받았습니다.`,
            `날마다 독수리가 와서 그를 괴롭혔고, 밤이 지나면 상처가 다시 아물었습니다. 그래서 그 벌은 끝나지 않았습니다. 제우스가 그에게 사람을 보내 이렇게 물은 적이 있습니다.`,
            `"뉘우치면 풀어 주겠다."<br>프로메테우스는 이렇게 대답했습니다.<br>"뉘우칠 것이 없소. 나는 저들이 얼어 죽는 것을 보았소."`,
            `그 뒤 아주 오랜 세월이 지나서, 헤라클레스라는 사람이 그 산을 지나다가 그 독수리를 쏘아 떨어뜨리고 사슬을 끊었습니다. 그리스 사람들은 이 이야기를 아주 좋아했습니다.`,
            `사람이 가진 것 가운데 제일 좋은 것은 누가 그냥 준 것이 아니라, 누군가 벌을 무릅쓰고 가져다준 것이라는 이야기였기 때문입니다.`
        ]
    },
    {
        num: 2,
        title: "판도라의 항아리",
        emoji: "🏺",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `제우스는 프로메테우스를 벌하고도 화가 풀리지 않았습니다. 그래서 사람에게도 무언가를 보내기로 했습니다. 신들은 여자를 하나 만들었습니다.`,
            `아름다움을 맡은 신이 그 얼굴을 만들고, 솜씨를 맡은 신이 옷을 짓고, 말을 맡은 신이 목소리를 주었습니다. 그리고 신들이 하나씩 선물을 얹었습니다. 그래서 그 사람의 이름은 판도라가 되었습니다.`,
            `'모든 선물'이라는 뜻입니다. 판도라는 세상에 온 첫 여자라고 전해집니다. 그리고 이 이야기를 처음 적은 사람은 헤시오도스라는 그리스 시인입니다.`,
            `이천칠백 년쯤 전 사람입니다. 그 시절 이야기라는 것을 알고 읽어야 합니다. 제우스는 판도라를 에피메테우스에게 보냈습니다.`,
            `프로메테우스는 동생에게 미리 말해 두었습니다.<br>"제우스가 무엇을 보내거든 절대 받지 마라."`,
            `그런데 에피메테우스는 '나중에 생각하는 자'였습니다. 그는 판도라를 보자마자 받아들였습니다. 그리고 그 집에서 함께 살았습니다.`,
            `그 집에는 항아리가 하나 있었습니다. 커다란 항아리였는데, 뚜껑이 단단히 봉해져 있었습니다.`,
            `에피메테우스가 말했습니다.<br>"이건 열면 안 되오."<br>"안에 뭐가 있는데요?"<br>"나도 모르오."`,
            `그 대답이 문제였습니다. 판도라는 그날부터 그 항아리 생각을 했습니다. 밥을 먹다가도 생각하고, 밤에 자다가도 생각했습니다.`,
            `안에 무엇이 들었는지 모른다면, 좋은 것일 수도 있지 않습니까. 누가 무엇을 하지 말라고 하면, 사람은 그것부터 생각하게 됩니다. 그것은 판도라만 그런 것이 아닙니다.`,
            `지금 이 글을 읽는 사람도 그럴 것입니다. 그러다 어느 날 판도라는 뚜껑을 열었습니다. 아주 조금만 열었습니다. 그러자 안에서 무언가가 쏟아져 나왔습니다.`,
            `병, 늙음, 미움, 시기, 다툼, 거짓, 두려움. 그때까지 세상에 없던 것들이었습니다. 그것들이 문틈으로 창틈으로 빠져나가 온 세상에 퍼졌습니다.`,
            `판도라는 놀라서 뚜껑을 눌러 닫았습니다. 그리고 울면서 주저앉았습니다. 한참 뒤에 항아리 안에서 아주 작은 소리가 났습니다.`,
            `"나도 내보내 줘."<br>판도라가 물었습니다.<br>"너는 누구니?"<br>"나는 희망이야."`,
            `판도라는 다시 뚜껑을 열었습니다. 그리고 희망이 나왔습니다. 이 이야기를 두고 사람들은 여러 가지를 말합니다.`,
            `어떤 사람은 판도라가 잘못했다고 합니다. 그런데 그리스 사람들은 다르게 보기도 했습니다. 그 항아리를 만들어 그 집에 갖다 놓은 것은 제우스였습니다. 그리고 열지 말라고만 하고 왜 열면 안 되는지는 아무도 말해 주지 않았습니다.`,
            `아무도 이유를 말해 주지 않으면, 사람은 결국 열어 봅니다. 그리고 한 가지가 더 있습니다. 그 나쁜 것들이 다 나온 뒤에도, 사람이 아직 살고 있는 것은 마지막에 나온 그것 때문입니다.`
        ]
    },
    {
        num: 3,
        title: "돌아오지 않는 딸",
        emoji: "🌾",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `데메테르는 땅의 신이었습니다. 밀과 보리를 자라게 하고, 열매를 익게 하는 이였습니다. 그에게 딸이 하나 있었습니다.`,
            `이름은 페르세포네였습니다. 어느 날 페르세포네가 들에서 꽃을 따고 있었습니다.`,
            `그때 땅이 갈라졌습니다. 그리고 그 아래에서 검은 말이 끄는 수레가 올라왔습니다. 지하 세계의 신 하데스였습니다.`,
            `하데스는 페르세포네를 수레에 태워 데려갔습니다. 땅이 다시 닫혔습니다. 들에는 딴 꽃이 흩어져 있을 뿐이었습니다.`,
            `함께 있던 사람들이 아무것도 보지 못했습니다. 너무 빨랐기 때문입니다. 그리고 그 자리에는 수레바퀴 자국도 남지 않았습니다.`,
            `땅이 다시 닫히면서 다 지워 버렸기 때문입니다. 데메테르는 딸을 찾아 온 세상을 돌아다녔습니다. 아흐레 동안 아무것도 먹지 않고 걸었습니다.`,
            `그동안 밀이 자라지 않았고, 열매가 익지 않았습니다. 땅이 마르고 갈라졌습니다. 사람들이 굶기 시작했습니다.`,
            `밭에 씨를 뿌려도 싹이 나지 않았습니다. 소가 먹을 풀도 나지 않았습니다. 사람들은 신들에게 제물을 바쳤습니다. 그런데 바칠 곡식이 없었습니다.`,
            `그래서 신들도 곤란해졌습니다. 열흘째 되는 날, 해의 신이 데메테르에게 말해 주었습니다.`,
            `"내가 다 보았소. 하데스가 데려갔소."`,
            `데메테르는 제우스에게 갔습니다.`,
            `"돌려주십시오."<br>"그건 어렵다."<br>"그럼 이 땅에는 아무것도 자라지 않을 것입니다."`,
            `제우스는 그 말을 흘려들었습니다. 그런데 정말로 아무것도 자라지 않았습니다. 한 해가 지나자 땅 위에 살아 있는 것이 얼마 남지 않았습니다.`,
            `제우스는 결국 지하 세계로 사람을 보냈습니다.<br>"돌려보내라."`,
            `하데스는 그러겠다고 했습니다. 그런데 페르세포네를 보내기 전에 석류를 하나 주었습니다. 페르세포네는 그동안 아무것도 먹지 않고 있었습니다. 그런데 그날 그 석류를 여섯 알 먹었습니다.`,
            `지하 세계의 규칙이 하나 있었습니다. 그곳의 것을 먹으면 그곳 사람이 된다는 규칙이었습니다. 그래서 이렇게 정해졌습니다.`,
            `한 해 열두 달 가운데 여섯 달은 어머니와 지내고, 여섯 달은 지하 세계에서 지내기로요. 페르세포네가 땅 위로 올라오면 데메테르가 기뻐서 온 땅에 싹이 났습니다. 그것이 봄과 여름입니다.`,
            `페르세포네가 내려가면 데메테르가 슬퍼서 땅이 얼었습니다. 그것이 가을과 겨울입니다. 그리스 사람들은 계절이 왜 바뀌는지를 그렇게 설명했습니다. 그런데 이 이야기에는 짚어 둘 것이 하나 있습니다.`,
            `데메테르가 딸을 되찾은 것은 부탁을 잘해서가 아니었습니다. 땅을 멈춰 세웠기 때문입니다.`
        ]
    },
    {
        num: 4,
        title: "이카로스의 날개",
        emoji: "🪶",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `다이달로스는 손재주가 세상에서 제일 좋은 사람이었습니다. 무엇이든 만들었습니다. 크레타 섬의 미노스 왕이 그를 불렀습니다. 그리고 미궁을 하나 지으라고 했습니다.`,
            `한번 들어가면 나올 수 없는 미로였습니다. 다이달로스는 그것을 지었습니다. 그런데 다 짓고 나자 왕이 그를 놓아주지 않았습니다.`,
            `그 미궁의 구조를 아는 사람이 밖에 나가면 안 된다는 것이었습니다. 다이달로스와 그 아들 이카로스는 그 섬에 갇혔습니다. 다이달로스는 그 섬에서 대접은 잘 받았습니다.`,
            `좋은 집에 살았고, 먹을 것이 넉넉했습니다. 다만 나갈 수가 없었습니다. 항구마다 왕의 사람이 지키고 있었습니다.`,
            `배를 만들어도 소용이 없었습니다. 여러 해가 지났습니다.`,
            `다이달로스가 어느 날 하늘을 보다가 이렇게 말했습니다.<br>"땅도 바다도 왕의 것이다. 그런데 하늘은 왕의 것이 아니다."`,
            `그는 새 깃털을 모으기 시작했습니다. 그리고 그것을 크기 순서대로 늘어놓고 실로 묶고 밀랍으로 붙였습니다. 그렇게 날개를 두 쌍 만들었습니다.`,
            `만드는 데 여러 달이 걸렸습니다. 이카로스는 그 옆에서 깃털을 주워 오고 밀랍을 반죽했습니다. 그리고 아버지가 일하는 것을 지켜보았습니다.`,
            `그때 이카로스는 열대여섯 살이었습니다.`,
            `떠나기 전날 밤, 다이달로스가 아들에게 말했습니다.<br>"잘 들어라. 너무 낮게 날지 마라. 바다 물보라가 깃털을 적시면 무거워진다."<br>"그리고 너무 높이 날지 마라. 해에 가까워지면 밀랍이 녹는다."<br>"가운데로 날아라. 나만 따라오면 된다."`,
            `이카로스는 알겠다고 했습니다. 이튿날 아침, 두 사람은 절벽에서 뛰어내렸습니다. 그리고 날았습니다.`,
            `아래에서 밭을 갈던 농부가 그것을 보고 쟁기를 놓쳤습니다. 배를 젓던 어부가 노를 놓쳤습니다. 사람이 하늘을 나는 것을 그때까지 아무도 본 적이 없었기 때문입니다.`,
            `처음에 이카로스는 아버지 뒤를 잘 따라갔습니다. 그런데 조금 지나자 마음이 달라졌습니다. 나는 것이 너무 좋았습니다. 그래서 조금 더 올라갔습니다.`,
            `아무 일도 없었습니다. 그래서 조금 더 올라갔습니다. 아버지가 아래에서 부르는 소리가 들렸습니다. 그런데 이카로스는 이미 아주 높이 올라가 있었습니다.`,
            `해가 뜨거웠습니다. 밀랍이 녹기 시작했습니다. 깃털이 하나둘 떨어져 나갔습니다.`,
            `이카로스는 팔을 저었습니다. 그런데 저을 것이 없었습니다. 다이달로스가 아들의 이름을 부르며 뒤를 돌아보았을 때, 하늘에는 깃털만 떠 있었습니다.`,
            `그 바다는 지금도 이카로스의 바다라고 불립니다. 다이달로스는 시칠리아까지 날아가 그곳에서 살았습니다. 그리고 다시는 날개를 만들지 않았습니다.`
        ]
    },
    {
        num: 5,
        title: "미다스의 손",
        emoji: "🪙",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `프리기아라는 나라에 미다스라는 왕이 있었습니다. 이미 아주 부자였습니다. 그런데 늘 부족하다고 여겼습니다.`,
            `창고에 금이 가득했습니다. 그런데 미다스는 그것을 세는 것이 낙이었습니다. 그리고 셀 때마다 어제보다 얼마나 늘었는지를 따졌습니다.`,
            `늘지 않은 날은 하루 종일 기분이 나빴습니다. 어느 날 왕의 뜰에서 늙은 사람이 하나 잠들어 있는 것이 발견되었습니다. 술의 신 디오니소스를 따라다니는 이였습니다.`,
            `미다스는 그 사람을 열흘 동안 잘 대접해서 돌려보냈습니다.`,
            `디오니소스가 그것을 고맙게 여겨 미다스에게 말했습니다.<br>"소원을 하나 말하시오."<br>미다스는 잠깐도 생각하지 않고 말했습니다.<br>"제 손에 닿는 것이 다 금이 되게 해 주십시오."`,
            `디오니소스는 그 말을 듣고 얼굴을 찌푸렸습니다.`,
            `"정말 그것이오?"<br>"그렇습니다."<br>"그럼 그렇게 하시오."`,
            `미다스는 뛰어서 궁으로 돌아갔습니다. 가는 길에 나뭇가지를 하나 꺾었습니다. 그것이 금가지가 되었습니다.`,
            `돌을 주웠습니다. 금덩이가 되었습니다.`,
            `사과를 땄습니다. 금사과가 되었습니다.`,
            `미다스는 세상에서 가장 기뻤습니다. 궁에 돌아와 잔치를 열라고 했습니다. 상이 차려졌습니다.`,
            `미다스가 빵을 집었습니다. 빵이 금이 되었습니다.`,
            `고기를 집었습니다. 금이 되었습니다.`,
            `물을 마시려고 했습니다. 입술에 닿는 순간 금이 되었습니다.`,
            `미다스는 그제야 무슨 일이 벌어졌는지 알았습니다. 그날 밤 미다스는 아무것도 먹지 못했습니다. 그리고 잠자리에 들었습니다.`,
            `이불이 금이 되어 몸을 눌렀습니다. 이튿날 아침, 어린 딸이 아버지에게 달려왔습니다. 미다스는 그 아이를 안았습니다. 그리고 그 자리에 굳었습니다.`,
            `이 대목을 옛사람들은 여러 가지로 이야기했습니다. 어떤 이야기에서는 딸이 금상이 되었다고 하고, 어떤 이야기에서는 미다스가 팔을 뒤로 빼서 겨우 닿지 않았다고 합니다.`,
            `어느 쪽이든 미다스는 그 자리에 주저앉아 울었습니다. 미다스는 디오니소스를 찾아가 빌었습니다.`,
            `"거두어 주십시오."<br>"소원을 이루어 주었는데 거두라는 것이오?"<br>"제가 어리석었습니다."<br>디오니소스가 말했습니다.<br>"팍톨로스 강에 가서 몸을 씻으시오."`,
            `미다스는 그 강으로 달려가 몸을 담갔습니다. 그러자 그 힘이 빠져나가 강바닥으로 가라앉았습니다.`,
            `그 뒤로 그 강의 모래에서 금이 나왔다고 합니다. 물에 들어가는 순간 손끝이 아려 왔습니다. 그리고 물빛이 잠깐 노랗게 흐려졌습니다.`,
            `미다스는 물속에서 손을 폈다 오므렸습니다. 그리고 옆에 있는 돌을 만져 보았습니다. 돌이었습니다.`,
            `미다스는 그 자리에서 한참 울었습니다. 미다스는 그 뒤로 궁을 떠나 시골에서 살았습니다. 그리고 금을 만지지 않았습니다.`
        ]
    },
    {
        num: 6,
        title: "메두사의 머리",
        emoji: "🛡️",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `아르고스라는 나라에 아크리시오스라는 왕이 있었습니다. 그 왕이 신탁을 하나 들었습니다. 신탁이란 신의 뜻을 미리 알려 주는 말입니다.`,
            `"네 딸이 낳은 아들의 손에 네가 죽을 것이다."`,
            `왕은 그 말을 듣고 딸 다나에를 청동으로 만든 방에 가두었습니다. 그런데 세월이 지나 그 방에서 아이가 태어났습니다.`,
            `사내아이였습니다. 이름은 페르세우스였습니다.`,
            `왕은 그 모자를 나무 상자에 넣어 바다에 띄웠습니다. 상자는 세리포스라는 섬에 닿았습니다. 그 섬의 어부가 그것을 건져 두 사람을 거두었습니다.`,
            `페르세우스는 그 섬에서 자랐습니다. 그런데 그 섬의 왕이 다나에를 아내로 삼으려고 했습니다. 다나에는 싫다고 했습니다. 그리고 그때 아들 페르세우스가 자라 있었으므로 왕도 함부로 하지 못했습니다.`,
            `그래서 왕은 꾀를 냈습니다. 잔치를 열고 사람들에게 선물을 가져오라고 한 것입니다. 페르세우스는 가난해서 가져올 것이 없었습니다.`,
            `왕이 말했습니다.<br>"그럼 무엇이든 가져오겠다고 해 보아라."<br>젊은 페르세우스가 말했습니다.<br>"메두사의 머리라도 가져오겠습니다."`,
            `왕은 그 말을 기다리고 있었습니다.<br>"그럼 그렇게 하여라."`,
            `메두사는 괴물이었습니다. 머리카락이 다 뱀이었고, 그 눈을 본 사람은 돌이 되었습니다. 그 앞에는 이미 돌이 된 사람들이 잔뜩 서 있었습니다.`,
            `페르세우스는 신들에게 도움을 받았습니다. 날개 달린 신발과 몸이 보이지 않게 되는 투구, 그리고 청동 방패를 얻었습니다. 페르세우스는 세상 끝까지 날아갔습니다. 그리고 메두사가 자는 동굴에 이르렀습니다.`,
            `페르세우스는 눈을 감지 않았습니다. 대신 방패를 거울처럼 들고, 그 안에 비친 것을 보면서 뒷걸음으로 다가갔습니다. 그리고 낫으로 그 목을 베었습니다.`,
            `돌아오는 길에 페르세우스는 바닷가에서 이상한 것을 보았습니다. 바위에 사람이 하나 묶여 있었습니다. 안드로메다라는 여자였습니다.`,
            `그 나라 사람들이 바다 괴물에게 제물로 바치려고 묶어 놓은 것이었습니다. 페르세우스는 그 괴물을 물리치고 안드로메다를 풀어 주었습니다. 두 사람은 함께 세리포스로 돌아갔습니다. 그리고 그 섬의 왕에게 메두사의 머리를 보여 주었습니다.`,
            `그 뒤 페르세우스는 고향 아르고스로 갔습니다. 할아버지를 만나러 간 것이었습니다. 그런데 아크리시오스는 이미 그 나라를 떠나 다른 곳에 가 있었습니다.`,
            `여러 해 뒤, 페르세우스는 어느 도시의 경기 대회에 나가 원반을 던졌습니다. 그 원반이 빗나가 관중석으로 날아갔습니다. 그리고 한 노인에게 맞았습니다.`,
            `그 노인이 아크리시오스였습니다. 신탁은 그렇게 이루어졌습니다. 그리스 사람들은 이런 이야기를 여럿 지었습니다.`,
            `피하려고 한 일이 피하려고 했기 때문에 일어나는 이야기들이었습니다.`
        ]
    },
    {
        num: 7,
        title: "미궁의 실",
        emoji: "🧵",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `크레타 섬의 미노스 왕은 아테네를 이긴 뒤 이런 것을 요구했습니다. 아홉 해마다 젊은이 열네 명을 보내라는 것이었습니다. 남자 일곱과 여자 일곱이었습니다.`,
            `그 젊은이들은 크레타의 미궁에 들여보내졌습니다. 다이달로스가 지은 그 미궁이었습니다. 그 안에는 미노타우로스가 살았습니다.`,
            `몸은 사람이고 머리는 소인 것이었습니다. 들어간 사람은 아무도 나오지 못했습니다. 세 번째로 젊은이를 보내는 해가 왔습니다.`,
            `아테네의 왕자 테세우스가 아버지에게 말했습니다.<br>"제가 가겠습니다."`,
            `아버지 아이게우스가 말렸습니다.`,
            `"안 된다."<br>"이 일을 언제까지 되풀이하실 겁니까."`,
            `아버지는 결국 허락했습니다.`,
            `그리고 이렇게 말했습니다.<br>"배에 검은 돛을 달고 가거라. 살아 돌아오거든 흰 돛으로 바꿔 달아라. 나는 저 언덕에서 그 배를 보고 있겠다."`,
            `테세우스는 크레타에 닿았습니다. 그리고 그 섬에서 미노스 왕의 딸 아리아드네를 만났습니다. 아리아드네는 그 미궁에 사람을 밀어 넣는 일을 오래 보아 왔습니다. 그리고 그것을 견디지 못하고 있었습니다.`,
            `아리아드네가 테세우스에게 실타래를 하나 주었습니다.<br>"입구에 실 끝을 매어 두고 풀면서 들어가세요."`,
            `그것을 가르쳐 준 것은 다이달로스였습니다. 자기가 지은 것에 사람이 갇히는 것을 그도 견딜 수 없었던 것입니다. 테세우스는 미궁으로 들어갔습니다.`,
            `실을 풀면서 갔습니다. 안은 캄캄했고, 길이 몇 번이나 갈라졌습니다. 그리고 가장 안쪽에서 미노타우로스를 만났습니다.`,
            `테세우스는 그것과 싸워 이겼습니다. 그리고 실을 따라 되돌아 나왔습니다.`,
            `이 이야기에서 사람들이 자주 잊는 것이 하나 있습니다.`,
            `테세우스가 미궁에서 나올 수 있었던 것은 힘 때문이 아니었습니다. 실 때문이었습니다. 그리고 그 실을 준 사람은 그 섬에 남아야 하는 사람이었습니다.`,
            `테세우스는 열세 명을 데리고 배를 탔습니다. 아리아드네도 함께 떠났습니다. 그런데 돌아오는 길에 낙소스라는 섬에 들렀다가, 아리아드네를 그 섬에 두고 떠났습니다.`,
            `왜 그랬는지에 대해서는 이야기가 여러 가지입니다. 어느 이야기에서도 테세우스가 잘한 것으로 그리지는 않습니다. 그리고 마지막에 한 가지 일이 더 있었습니다.`,
            `테세우스는 아테네에 가까워지도록 돛을 바꿔 다는 것을 잊었습니다. 언덕에서 기다리던 아이게우스는 검은 돛을 보았습니다. 그리고 아들이 죽은 줄 알고 바다로 몸을 던졌습니다.`,
            `그 바다를 그 뒤로 아이게우스의 바다, 곧 에게 해라고 부릅니다.`
        ]
    },
    {
        num: 8,
        title: "뒤를 돌아본 사람",
        emoji: "🎵",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `오르페우스는 노래를 부르는 사람이었습니다. 그가 노래를 하면 나무가 가지를 기울였고, 짐승이 다가와 앉았고, 강물이 흐름을 늦추었습니다. 오르페우스에게 에우리디케라는 아내가 있었습니다. 그런데 혼인한 지 얼마 되지 않아 에우리디케가 들에서 뱀에게 물려 세상을 떠났습니다.`,
            `오르페우스는 여러 날 동안 아무것도 하지 못했습니다. 그러다 어느 날 일어나 지하 세계로 내려가기로 했습니다. 산 사람이 그리로 내려간 일은 거의 없었습니다.`,
            `오르페우스는 노래를 부르며 내려갔습니다. 문을 지키는 개가 그 노래를 듣고 조용해졌습니다. 강을 건네주는 뱃사공이 그 노래를 듣고 삯을 받지 않았습니다. 그리고 마침내 하데스 앞에 이르렀습니다.`,
            `오르페우스는 노래를 불렀습니다. 자기가 무엇을 잃었는지를 노래했습니다. 지하 세계의 모든 것이 그 자리에 멈춰 섰습니다.`,
            `벌을 받고 있던 이들의 벌도 그동안 멈추었다고 합니다. 그리고 하데스가 처음으로 마음이 움직였습니다.`,
            `"데려가라."<br>"고맙습니다."<br>"다만 조건이 있다. 땅 위에 완전히 나갈 때까지 뒤를 돌아보지 마라. 한 번이라도 돌아보면 그 사람은 여기 남는다."`,
            `오르페우스는 그러겠다고 했습니다. 그리고 앞장서서 올라가기 시작했습니다. 길이 아주 길었습니다. 그리고 뒤에서 아무 소리도 나지 않았습니다.`,
            `죽은 이는 발소리가 나지 않기 때문입니다. 오르페우스는 걸으면서 계속 생각했습니다. 정말 뒤에 있는 것일까.`,
            `하데스가 나를 속인 것은 아닐까. 내가 지금 아무도 없는 길을 혼자 걷고 있는 것은 아닐까. 그렇게 아주 오래 걸었습니다. 그리고 마침내 앞에 빛이 보였습니다.`,
            `오르페우스가 그 빛 속으로 걸어 나갔습니다. 그리고 발이 땅 위에 닿는 순간, 참지 못하고 뒤를 돌아보았습니다. 에우리디케는 바로 뒤에 있었습니다. 그런데 아직 어둠 속에 있었습니다.`,
            `한 걸음이 모자랐습니다. 에우리디케는 아무 말도 하지 못하고 뒤로 물러났습니다. 오르페우스는 손을 뻗었습니다.`,
            `그 손이 허공을 잡았습니다. 그 뒤로 오르페우스는 다시 지하 세계로 내려가려고 했습니다. 그런데 뱃사공이 두 번은 태워 주지 않았습니다.`,
            `이 이야기를 두고 사람들은 이렇게 말합니다. 오르페우스는 거의 다 해냈습니다. 그런데 마지막 한 걸음을 참지 못했습니다.`,
            `그리스 사람들이 이 이야기를 오래 전한 것은 그 때문입니다. 사람이 실패하는 자리는 대개 처음이 아니라 마지막입니다.`
        ]
    },
    {
        num: 9,
        title: "헤라클레스의 열두 가지 일",
        emoji: "🦁",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `헤라클레스는 힘이 세상에서 제일 센 사람이었습니다. 그런데 그 힘 때문에 큰 잘못을 저질렀습니다.`,
            `어느 날 정신이 흐려져서 자기 가족을 해친 것입니다. 깨어나 그것을 알고 헤라클레스는 죽으려고 했습니다.`,
            `그때 사람들이 말렸습니다. 그리고 신탁을 들으러 갔습니다. 신탁은 이랬습니다.`,
            `"에우리스테우스 왕에게 가서 십이 년 동안 그가 시키는 일을 하여라."`,
            `헤라클레스는 그 말대로 했습니다. 에우리스테우스는 헤라클레스를 미워하는 사람이었습니다. 그래서 아무도 못 할 일만 골라 시켰습니다.`,
            `첫 번째는 네메아의 사자였습니다. 가죽이 어떤 무기로도 뚫리지 않는 사자였습니다. 헤라클레스는 맨손으로 그것을 잡았습니다. 그리고 그 가죽을 벗겨 입고 다녔습니다.`,
            `가죽을 벗길 때는 그 사자의 발톱을 썼습니다. 다른 것으로는 안 잘렸기 때문입니다.`,
            `두 번째는 히드라였습니다. 머리가 아홉인 뱀인데, 하나를 자르면 둘이 돋아났습니다. 헤라클레스는 조카 이올라오스를 데려가서, 자기가 머리를 자르면 조카가 그 자리를 불로 지지게 했습니다.`,
            `그래야 새로 돋지 않았습니다. 이 대목이 이 이야기에서 중요합니다. 헤라클레스가 처음으로 혼자 힘으로 안 되는 일이 있다는 것을 인정한 것입니다.`,
            `세 번째는 아주 빠른 사슴을 산 채로 잡는 일이었습니다. 헤라클레스는 그것을 한 해 동안 쫓아다녔습니다. 힘이 아니라 참을성으로 한 일이었습니다.`,
            `네 번째는 커다란 멧돼지, 다섯 번째는 삼십 년 동안 치우지 않은 외양간이었습니다. 소가 삼천 마리인 외양간을 하루 만에 치우라고 한 것입니다. 헤라클레스는 강물의 물길을 돌려 그 안으로 흘려보냈습니다.`,
            `여섯 번째는 새 떼, 일곱 번째는 크레타의 황소, 여덟 번째는 사람을 해치는 말들이었습니다. 아홉 번째는 아마존의 여왕이 가진 띠를 얻어 오는 일이었습니다. 그 여왕은 사정을 듣고 그것을 그냥 주려고 했습니다. 그런데 곁에서 오해가 생겨 싸움이 났습니다.`,
            `헤라클레스가 나중에 이 일을 제일 마음 아파했다고 합니다. 열 번째는 세상 서쪽 끝의 소 떼였습니다. 열한 번째는 황금 사과였습니다.`,
            `그것은 하늘을 떠받치고 있는 아틀라스만 딸 수 있었습니다. 헤라클레스는 아틀라스 대신 하늘을 떠받치고 있겠다고 했습니다.`,
            `아틀라스는 사과를 따 와서 이렇게 말했습니다.<br>"그냥 자네가 계속 들고 있게. 나는 좀 쉬겠네."<br>헤라클레스가 말했습니다.<br>"그러지요. 그런데 어깨에 받칠 것을 좀 대야겠으니 잠깐만 다시 들어 주십시오."`,
            `아틀라스가 하늘을 받아 들었습니다. 헤라클레스는 사과를 들고 갔습니다. 열두 번째는 지하 세계의 개를 데려오는 일이었습니다.`,
            `머리가 셋인 개였습니다. 헤라클레스는 하데스에게 가서 허락을 구했습니다.`,
            `"무기를 쓰지 않는다면 데려가라."`,
            `헤라클레스는 맨손으로 그것을 붙잡아 데려갔습니다. 에우리스테우스는 그것을 보고 항아리 속에 숨었습니다. 그렇게 십이 년이 끝났습니다.`
        ]
    },
    {
        num: 10,
        title: "베 짜는 아라크네",
        emoji: "🕸️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `리디아라는 곳에 아라크네라는 여자가 살았습니다. 염색장이의 딸이었고, 집이 가난했습니다. 그런데 베 짜는 솜씨가 대단했습니다.`,
            `그 사람이 짠 천을 보려고 사람들이 먼 데서 찾아왔습니다.`,
            `사람들이 이렇게 말했습니다.<br>"아테나 여신에게 배운 솜씨로구나."`,
            `아테나는 솜씨를 맡은 신이었습니다.`,
            `그 말을 듣고 아라크네가 이렇게 말했습니다.<br>"저는 아무에게도 배우지 않았습니다. 아테나와 겨루어도 지지 않습니다."`,
            `그 말이 신에게 전해졌습니다. 아테나가 노파로 변장해서 아라크네를 찾아갔습니다.`,
            `"얘야, 그런 말은 하지 마라. 신에게 용서를 빌어라."`,
            `"할머니는 상관 마세요."`,
            `그러자 노파가 그 자리에서 본모습으로 돌아왔습니다. 아테나였습니다. 사람들이 다 엎드렸습니다. 그런데 아라크네만 서 있었습니다.`,
            `얼굴이 하얘졌지만 무릎을 꿇지는 않았습니다.<br>"그럼 겨루자."`,
            `두 사람은 베틀을 하나씩 놓고 짜기 시작했습니다. 아테나는 신들이 사람에게 은혜를 베푸는 장면을 짰습니다. 그리고 네 귀퉁이에 신에게 대들었다가 벌을 받은 사람들을 짜 넣었습니다.`,
            `아라크네는 다른 것을 짰습니다. 신들이 사람을 속이고, 사람을 데려가고, 사람을 망쳐 놓은 일들을 짰습니다. 그것도 다 실제로 있었다고 전해지는 이야기들이었습니다.`,
            `천이 다 짜였습니다. 아테나는 아라크네의 천을 보았습니다. 흠잡을 데가 없었습니다.`,
            `솜씨로는 정말 지지 않았습니다. 아테나는 그 천을 찢었습니다. 그리고 베틀의 북으로 아라크네의 이마를 쳤습니다.`,
            `아라크네는 그날 밤 스스로 목숨을 끊으려고 했습니다.`,
            `아테나가 그것을 보고 말했습니다.<br>"살아라. 다만 평생 매달려 짜거라."`,
            `그리고 아라크네는 거미가 되었습니다. 그 뒤로 거미들이 실을 뽑아 그물을 짭니다. 그리스 사람들이 이 이야기를 전한 방식은 두 가지입니다.`,
            `하나는 사람이 신에게 잘난 척하면 벌을 받는다는 것입니다. 그런데 이 이야기를 적은 로마의 시인 오비디우스는 다르게 적었습니다. 그 사람은 아라크네가 짠 천이 흠잡을 데 없었다는 것을 분명히 적어 놓았습니다. 그러니까 아라크네는 솜씨로 진 것이 아닙니다.`,
            `힘으로 진 것입니다. 옛이야기 가운데는 이렇게 두 가지로 읽히는 것이 여럿 있습니다.`
        ]
    },
    {
        num: 11,
        title: "물에 비친 얼굴",
        emoji: "💧",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `나르키소스는 아주 잘생긴 젊은이였습니다. 그런데 아무도 사랑하지 않았습니다. 그를 좋아한 사람이 여럿이었는데, 다 매몰차게 돌려보냈습니다.`,
            `그 가운데 에코라는 이가 있었습니다. 에코에게는 어려움이 하나 있었습니다. 남이 한 말의 끝만 되풀이할 수 있고, 자기 말을 먼저 할 수 없었습니다.`,
            `벌을 받아 그렇게 된 것이었습니다. 에코는 숲에서 나르키소스를 만났습니다.`,
            `나르키소스가 일행을 찾다가 소리쳤습니다.<br>"거기 누구 있어?"<br>"누구 있어."<br>"이리 나와."<br>"나와."`,
            `에코가 나갔습니다. 나르키소스는 그 사람을 밀쳐 냈습니다. 에코는 그 뒤로 사람들 앞에 나서지 않고 골짜기에 숨어 살았습니다. 그리고 몸이 점점 야위어 마침내 목소리만 남았습니다.`,
            `지금도 산에서 소리를 지르면 그 소리가 되돌아옵니다. 그것이 에코입니다.`,
            `어느 날 나르키소스가 사냥을 하다가 목이 말라 샘을 찾았습니다. 아주 맑은 샘이었습니다. 물을 마시려고 몸을 숙였습니다. 그리고 물속에 있는 얼굴을 보았습니다.`,
            `나르키소스는 그것이 다른 사람인 줄 알았습니다. 손을 뻗었습니다. 물이 흔들려 그 얼굴이 흩어졌습니다.`,
            `가만히 있으니 다시 나타났습니다. 말을 걸었습니다. 대답이 없었습니다. 그런데 그 얼굴도 자기처럼 입을 움직였습니다.`,
            `나르키소스는 그 자리를 떠나지 못했습니다. 밥도 먹지 않고 잠도 자지 않고 그 물가에 앉아 있었습니다. 그러다 마침내 그 자리에서 세상을 떠났습니다.`,
            `사람들이 그를 묻으러 갔더니 그 자리에 꽃이 하나 피어 있었습니다. 가운데가 노랗고 둘레가 흰 꽃이었습니다. 그 꽃을 지금도 나르키소스라고 부릅니다.`,
            `우리말로는 수선화입니다. 이 이야기를 그저 잘생긴 사람 이야기로 읽으면 재미가 없습니다. 나르키소스가 못 한 것은 자기 얼굴에서 눈을 떼는 일이었습니다. 그리고 그 앞에는 오래전부터 그를 부르던 목소리가 있었습니다.`,
            `그런데 그는 그 소리를 한 번도 제대로 듣지 않았습니다.`
        ]
    },
    {
        num: 12,
        title: "트로이의 목마",
        emoji: "🐴",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `트로이라는 도시가 있었습니다. 성벽이 아주 두꺼워서 어떤 군대도 뚫지 못했습니다. 그리스 사람들이 그 성을 열 해 동안 둘러싸고 있었습니다.`,
            `열 해였습니다. 그동안 양쪽에서 사람이 아주 많이 죽었습니다. 그리스 쪽에는 아킬레우스라는 이름난 장수가 있었고, 트로이 쪽에는 헥토르가 있었습니다.`,
            `두 사람 다 그 열 해 사이에 세상을 떠났습니다. 열 해가 지나자 양쪽 다 지쳤습니다. 그리스 쪽 배는 열 해 동안 바닷가에 올려져 있어서 밑바닥이 다 썩었습니다.`,
            `트로이 쪽은 성 안에 갇혀서 밭에 나가지 못했습니다. 양쪽 다 이길 수 없다는 것을 알고 있었습니다. 그런데 아무도 먼저 그만두자고 하지 못했습니다.`,
            `열 해를 들였기 때문입니다. 그때 오디세우스라는 사람이 방법을 하나 냈습니다. 나무로 아주 큰 말을 만드는 것이었습니다.`,
            `속을 비워서 사람이 들어갈 수 있게요. 그리스 군대는 그것을 만들어 성 앞에 세워 두었습니다. 그리고 배를 타고 떠나는 척했습니다.`,
            `섬 뒤에 숨어 있었을 뿐인데, 성 위에서 보면 다 떠난 것 같았습니다. 트로이 사람들이 성문을 열고 나왔습니다. 열 해 만에 처음으로 성 밖에 나온 것이었습니다. 그리고 그 나무 말을 보았습니다.`,
            `"이건 뭐지?" 그때 그리스 사람 하나가 일부러 남아 있다가 붙잡혔습니다.`,
            `그는 이렇게 말했습니다.<br>"그것은 신에게 바치는 것입니다. 성 안에 들이면 이 도시가 무너지지 않는다고 합니다."`,
            `그 말을 믿지 않은 사람도 있었습니다.`,
            `라오콘이라는 사제가 말했습니다.<br>"저는 그리스 사람이 주는 것은 무엇이든 무섭습니다."`,
            `그리고 창을 들어 그 말의 옆구리를 찔렀습니다. 안에서 쇠붙이 부딪치는 소리가 났습니다. 그런데 그때 마침 바다에서 큰 뱀 두 마리가 올라와 라오콘을 덮쳤습니다.`,
            `사람들은 그것을 보고 라오콘이 신을 거스른 벌을 받았다고 여겼습니다. 그래서 그 말을 성 안으로 끌어들였습니다. 성문이 좁아서 성벽 일부를 헐어야 했습니다.`,
            `그날 밤 트로이에서는 잔치가 열렸습니다. 열 해 만의 잔치였습니다. 다들 마시고 노래하다가 잠들었습니다. 그리고 한밤중에 그 말의 배가 열렸습니다.`,
            `안에서 사람들이 내려와 성문을 열었습니다. 섬 뒤에 숨어 있던 배들이 이미 돌아와 있었습니다.`,
            `그날 밤 트로이는 무너졌습니다. 그 뒤에 벌어진 일은 여기 자세히 적지 않겠습니다. 다만 이것은 적어 두겠습니다.`,
            `이 이야기를 전한 그리스 사람들은 이긴 쪽이었습니다. 그런데 이 대목을 통쾌하게 적지 않았습니다.`,
            `오히려 진 쪽 사람들의 이름을 하나하나 불렀습니다. 그리고 그 뒤 여러 해 동안 이긴 쪽 장수들이 하나씩 불행해지는 이야기를 이어 붙였습니다.`,
            `이 이야기는 세상에서 가장 오래된 이야기 가운데 하나입니다.`,
            `삼천 년 가까이 전해졌습니다. 그런데 이것이 다 지어낸 이야기라고 여겨지던 시절이 있었습니다. 그러다 백오십 년쯤 전에 어떤 사람이 그 이야기를 믿고 땅을 팠습니다.`,
            `그리고 트로이를 찾아냈습니다. 지금 터키 서쪽에 그 자리가 남아 있습니다. 성벽이 불에 탄 자리도 나왔습니다. 그러니까 이 신화 가운데 어디까지가 지어낸 것이고 어디부터가 있었던 일인지는 아직도 다 밝혀지지 않았습니다.`
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
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 1);
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
                ${artFrame('cover.png', '🏛️')}
            </div>
            <div class="story-page-right">
                <h1>그리스 신화</h1>
                <p class="cover-tag">그리스에서 전해 오는 이야기</p>
                <p>삼천 년 가까이 전해져 온 이야기들 가운데 열두 편을 골라 담았습니다.</p>
                <p>신들이 늘 옳게 나오지는 않습니다. 이 이야기들을 오래 전한 사람들도 그것을 알고 있었고, 그것까지 함께 전했습니다.</p>
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
    { q: "프로메테우스가 사람에게 준 것은 무엇입니까?", choices: ["불", "글자", "쇠붙이"], answer: 0 },
    { q: "프로메테우스가 뉘우치라는 말에 한 대답은 무엇입니까?", choices: ["뉘우칠 것이 없다, 저들이 얼어 죽는 것을 봤다", "잘못했으니 이제 이 사슬을 풀어 주기 바란다", "다시는 그런 일을 하지 않겠다고 약속하겠다"], answer: 0 },
    { q: "판도라라는 이름의 뜻은 무엇입니까?", choices: ["첫 여자", "모든 선물", "닫힌 항아리"], answer: 1 },
    { q: "항아리에서 마지막에 나온 것은 무엇입니까?", choices: ["다툼", "희망", "병"], answer: 1 },
    { q: "페르세포네가 여섯 달만 땅 위에 있게 된 까닭은 무엇입니까?", choices: ["지하 세계에서 석류를 여섯 알 먹어서", "어머니가 여섯 달만 허락을 받아서", "여섯 달마다 문이 열리게 되어 있어서"], answer: 0 },
    { q: "데메테르가 딸을 되찾은 방법은 무엇입니까?", choices: ["땅에 아무것도 자라지 않게 한 것", "지하 세계로 직접 내려가 데려온 것", "제우스에게 오래 빌고 매달린 것"], answer: 0 },
    { q: "다이달로스가 이카로스에게 한 당부는 무엇입니까?", choices: ["내 뒤를 세 걸음 떨어져서 따라오너라", "무슨 일이 있어도 뒤를 돌아보지 마라", "너무 낮게도 너무 높게도 날지 마라"], answer: 2 },
    { q: "미다스의 소원이 불러온 문제는 무엇입니까?", choices: ["손이 굳어 아무것도 잡지 못하게 되었다", "온 나라 사람이 그를 미워하게 되었다", "먹을 수도 마실 수도 없게 되었다"], answer: 2 },
    { q: "페르세우스가 메두사를 볼 때 쓴 방법은 무엇입니까?", choices: ["눈을 감고 소리만 듣고 다가갔다", "청동 방패에 비친 모습을 보았다", "물웅덩이에 비친 그림자를 보았다"], answer: 1 },
    { q: "테세우스가 미궁에서 나올 수 있었던 까닭은 무엇입니까?", choices: ["길을 미리 외워 두고 들어갔기 때문에", "아리아드네가 준 실을 풀면서 들어가서", "벽에 칼로 표시를 하며 들어가서"], answer: 1 },
    { q: "테세우스가 아테네에서 저지른 실수는 무엇입니까?", choices: ["아리아드네를 섬에 두고 온 것", "괴물의 머리를 가져오지 않은 것", "흰 돛으로 바꿔 다는 것을 잊은 것"], answer: 2 },
    { q: "오르페우스가 아내를 데려오지 못한 까닭은 무엇입니까?", choices: ["지하 세계의 왕이 마음을 바꾸어서", "마지막 한 걸음을 남기고 뒤를 돌아봐서", "노래를 부르다가 그만 길을 잃어서"], answer: 1 },
    { q: "헤라클레스가 히드라를 이길 때 알게 된 것은 무엇입니까?", choices: ["힘보다 꾀가 언제나 앞선다는 것", "괴물도 약한 데가 하나 있다는 것", "혼자 힘으로는 안 되는 일이 있다는 것"], answer: 2 },
    { q: "아라크네가 진 것은 무엇 때문입니까?", choices: ["솜씨가 아니라 상대의 힘 때문에", "천에 실을 잘못 꿴 실수 때문에", "겨루기를 도중에 그만두었기 때문에"], answer: 0 },
    { q: "나르키소스가 끝내 하지 못한 것은 무엇입니까?", choices: ["제 얼굴에서 눈을 떼는 것", "물가에서 걸어 나오는 것", "에코의 이름을 불러 주는 것"], answer: 0 },
    { q: "트로이가 지어낸 곳이 아니라는 것은 어떻게 밝혀졌습니까?", choices: ["옛 그리스 지도에 그 이름이 남아 있어서", "이집트 기록에 같은 싸움이 적혀 있어서", "백오십 년쯤 전에 그 자리를 파서 찾아내서"], answer: 2 }
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
            ${artFrame('end.png', '🐴')}
            <h2>그리스 신화를 다 읽었습니다</h2>
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
