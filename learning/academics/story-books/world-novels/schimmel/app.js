const BOOK_TITLE = "백마의 기수";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "제방 위의 그림자",
        emoji: "🌊",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `독일 북쪽 끝에 북해와 맞닿은 지방이 있습니다.`,
            `그 지방을 북프리슬란트라고 부릅니다.`,
            `그곳의 땅은 바다보다 낮습니다.`,
            `그래서 사람들이 흙을 쌓아 긴 둑을 만들어 놓았습니다.`,
            `그 둑을 제방이라고 합니다.`,
            `제방이 없으면 그 땅은 하루 만에 바다가 됩니다.`,
            `그래서 그 지방 사람들은 몇백 년 동안 제방을 쌓고 고치며 살았습니다.`,
            `그 지방에는 이런 말이 전해 옵니다.`,
            `"제방을 지키는 것이 목숨을 지키는 것이다."`,
            `이 이야기는 어느 늙은 선생이 젊은 나그네에게 들려준 것입니다.`,
            `백오십 년쯤 전, 어느 가을밤이었습니다.`,
            `나그네가 말을 타고 제방 위를 지나고 있었습니다.`,
            `바람이 몹시 불고 비가 뿌리는 밤이었습니다.`,
            `아래는 바다였고, 물이 제방 턱까지 올라와 있었습니다.`,
            `그때 나그네는 앞에서 무언가를 보았습니다.`,
            `제방 위를 말을 탄 사람이 지나가고 있었습니다.`,
            `그 말이 하얀 말이었습니다.`,
            `나그네가 인사를 하려고 했는데, 그 사람이 아무 말도 하지 않았습니다.`,
            `그리고 소리가 나지 않았습니다.`,
            `말발굽 소리가 나야 하는데 나지 않았습니다.`,
            `조금 뒤에 그 사람과 말이 제방 아래로 내려가더니 사라졌습니다.`,
            `나그네는 그 밤에 마을 여관에 들었습니다.`,
            `그리고 사람들에게 그 이야기를 했습니다.`,
            `여관 안이 조용해졌습니다.`,
            `한참 뒤에 누가 이렇게 말했습니다.`,
            `"백마의 기수를 보셨군요."`,
            `"그게 무엇입니까."`,
            `"그것이 나타나면 그해에 제방이 터집니다."`,
            `그때 구석에 앉아 있던 늙은 선생이 말했습니다.`,
            `"그런 것이 아닙니다."`,
            `"그럼 무엇입니까."`,
            `늙은 선생이 말했습니다.`,
            `"내가 그 사람 이야기를 해 드리지요. 아주 긴 이야기입니다."`
        ]
    },
    {
        num: 2,
        title: "제방 감독관의 아들이 아닌 아이",
        emoji: "📐",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `그 사람의 이름은 하우케 하이엔이었습니다.`,
            `백 년쯤 전 사람입니다.`,
            `하우케의 아버지 테데 하이엔은 작은 밭을 부치는 사람이었습니다.`,
            `가난하지는 않았지만 잘살지도 않았습니다.`,
            `그런데 그 사람에게는 남다른 것이 하나 있었습니다.`,
            `땅을 재는 법을 알고 있었습니다.`,
            `젊을 때 측량을 배웠던 것입니다.`,
            `하우케는 어릴 때부터 아버지 옆에서 그것을 보고 자랐습니다.`,
            `그리고 아버지가 가지고 있던 낡은 기하학 책을 혼자 읽었습니다.`,
            `그 책은 네덜란드 말로 되어 있었습니다.`,
            `하우케는 그 말을 모르는 채로 그림과 숫자만 보고 읽었습니다.`,
            `그리고 결국 알아냈습니다.`,
            `하우케는 다른 아이들과 놀지 않았습니다.`,
            `학교가 끝나면 제방으로 갔습니다.`,
            `그리고 제방을 보았습니다.`,
            `하루 종일 보았습니다.`,
            `어느 날 아버지가 물었습니다.`,
            `"거기서 무엇을 하느냐."`,
            `"제방을 봅니다."`,
            `"무엇을 보느냐."`,
            `하우케가 말했습니다.`,
            `"아버지, 우리 제방은 잘못 만들어졌습니다."`,
            `아버지가 웃었습니다.`,
            `"저 제방은 삼백 년 되었다."`,
            `"압니다. 그런데 잘못됐습니다."`,
            `그리고 하우케가 이런 이야기를 했습니다.`,
            `그 지방의 제방은 바다 쪽 면이 가팔랐습니다.`,
            `벽처럼 서 있었습니다.`,
            `그러면 파도가 와서 그 벽을 때립니다.`,
            `그리고 때린 자리가 파입니다.`,
            `그 자리가 여러 해 파이면 그 아래가 비고, 어느 날 그 부분이 무너집니다.`,
            `"그럼 어떻게 해야 하느냐."`,
            `"완만하게 해야 합니다."`,
            `"바다 쪽 면을 길게 눕히면, 파도가 때리는 것이 아니라 타고 올라옵니다."`,
            `"그러면 힘이 흩어집니다."`,
            `아버지는 그 말을 듣고 한참 아무 말도 하지 않았습니다.`,
            `그 말이 맞았기 때문입니다.`
        ]
    },
    {
        num: 3,
        title: "고양이와 겨울",
        emoji: "🐈",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `그 마을의 제방 감독관은 테데 폴커츠라는 사람이었습니다.`,
            `제방 감독관은 제방을 관리하고 사람을 부리는 자리였습니다.`,
            `그 지방에서 가장 중요한 자리였습니다.`,
            `그런데 그 사람은 그 일을 잘 몰랐습니다.`,
            `땅을 많이 가지고 있어서 그 자리에 앉은 것이었습니다.`,
            `그 시절 그 자리는 땅을 많이 가진 사람이 맡게 되어 있었습니다.`,
            `그래서 셈을 할 줄 아는 사람을 하나 두었습니다.`,
            `그 사람이 그만두게 되자 하우케가 그 자리에 들어갔습니다.`,
            `열여덟 살이었습니다.`,
            `하우케는 그 집에서 일하면서 감독관의 서류를 다 보게 되었습니다.`,
            `그리고 곧 알아냈습니다.`,
            `그 마을의 제방 셈이 여러 해 동안 어긋나 있었습니다.`,
            `공사에 쓴 돈과 실제로 한 일이 맞지 않았습니다.`,
            `하우케는 그것을 조용히 바로잡았습니다.`,
            `감독관은 그것을 고마워하면서도 조금 불편해했습니다.`,
            `그 집에는 딸이 하나 있었습니다.`,
            `엘케였습니다.`,
            `엘케도 셈이 밝은 사람이었습니다.`,
            `사실 그 집 살림과 서류를 실제로 굴리던 것은 엘케였습니다.`,
            `엘케와 하우케는 서류를 놓고 이야기하다가 가까워졌습니다.`,
            `그런데 이 이야기에는 하우케의 다른 면도 나옵니다.`,
            `어느 겨울, 하우케가 제방에서 늙은 고양이 한 마리와 부딪친 일이 있었습니다.`,
            `그 고양이는 마을의 트린이라는 노파가 기르던 것이었습니다.`,
            `하우케가 잡은 물새를 그 고양이가 물고 가려고 했습니다.`,
            `하우케가 그것을 붙잡았습니다.`,
            `그리고 화가 나서 세게 뿌리쳤습니다.`,
            `그 고양이는 그날 죽었습니다.`,
            `하우케는 그 노파에게 가서 잘못했다고 했습니다.`,
            `그리고 나중에 다른 고양이를 사다 주었습니다.`,
            `그런데 마을에서는 그 이야기가 오래 돌았습니다.`,
            `이 대목을 이 소설에 넣은 데는 까닭이 있습니다.`,
            `하우케는 옳은 것을 아는 사람이었습니다.`,
            `그런데 성질이 급했습니다.`,
            `그리고 그 성질이 나중에 여러 번 문제가 됩니다.`
        ]
    },
    {
        num: 4,
        title: "감독관이 되다",
        emoji: "📜",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `여러 해 뒤 테데 폴커츠가 세상을 떠났습니다.`,
            `그리고 감독관 자리가 비었습니다.`,
            `마을 사람들은 다른 사람을 앉히려고 했습니다.`,
            `올레 페테르스라는 사람이었습니다.`,
            `땅이 많고 목소리가 크고 사람들과 잘 어울리는 사람이었습니다.`,
            `그런데 제방에 대해서는 아무것도 몰랐습니다.`,
            `엘케가 사람들 앞에서 이렇게 말했습니다.`,
            `"이 자리는 땅을 많이 가진 사람이 맡게 되어 있습니다. 그렇지요?"`,
            `"그렇소."`,
            `"그럼 제 아버지 땅은 이제 누구 것입니까."`,
            `"······당신 것이지요."`,
            `"저는 하우케 하이엔과 혼인합니다."`,
            `그 자리가 조용해졌습니다.`,
            `엘케는 그렇게 해서 하우케를 그 자리에 앉혔습니다.`,
            `사람들은 그것을 받아들였습니다.`,
            `규칙이 그랬기 때문입니다.`,
            `그런데 마음으로는 받아들이지 않았습니다.`,
            `그날부터 마을 사람들 사이에 이런 말이 돌았습니다.`,
            `"저 사람은 여자 덕에 저 자리에 앉았다."`,
            `하우케는 그 말을 다 들었습니다.`,
            `그리고 아무 대꾸도 하지 않았습니다.`,
            `그 대신 일을 했습니다.`,
            `하우케는 감독관이 되고 나서 제방을 하나하나 다시 쟀습니다.`,
            `그리고 고쳐야 할 자리를 다 적었습니다.`,
            `사람들은 그것을 못마땅해했습니다.`,
            `고치는 데 돈이 들고, 그 돈은 땅을 가진 사람들이 나눠 내야 했기 때문입니다.`,
            `그래도 하우케는 밀어붙였습니다.`,
            `그리고 여기서 하우케의 문제가 시작됩니다.`,
            `하우케는 사람들에게 설명하지 않았습니다.`,
            `자기가 옳다는 것을 알고 있었기 때문에, 설명할 필요를 못 느낀 것입니다.`,
            `엘케가 여러 번 말했습니다.`,
            `"사람들한테 왜 그런지 말해 주세요."`,
            `"말해도 모릅니다."`,
            `"그래도 말은 해야지요."`,
            `하우케는 그러지 않았습니다.`
        ]
    },
    {
        num: 5,
        title: "새 제방",
        emoji: "🏞️",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `하우케에게는 오래된 계획이 하나 있었습니다.`,
            `제방 밖에 새로 생긴 땅이 있었습니다.`,
            `바닷물이 흙을 실어다 쌓아 놓은 땅이었습니다.`,
            `그 땅은 아직 바다에 잠기는 땅이었습니다.`,
            `하우케는 그 땅 바깥에 새 제방을 쌓아서 그 땅을 밭으로 만들려고 했습니다.`,
            `그러면 마을 땅이 크게 늘어납니다.`,
            `그리고 그 새 제방은 하우케가 어릴 때 생각한 그 모양으로 쌓을 참이었습니다.`,
            `바다 쪽 면을 길게 눕힌 제방이었습니다.`,
            `하우케는 그 계획을 관청에 냈습니다.`,
            `그리고 허가를 받아 냈습니다.`,
            `그런데 마을에서 반대가 아주 컸습니다.`,
            `까닭은 여럿이었습니다.`,
            `첫째, 돈이 많이 들었습니다.`,
            `둘째, 그 공사에 사람이 여러 해 매여야 했습니다.`,
            `셋째, 그리고 이것이 제일 컸는데, 새로 생긴 땅의 상당 부분이 하우케의 것이 되게 되어 있었습니다.`,
            `그것은 법에 따른 것이었습니다.`,
            `제방을 쌓는 데 돈을 댄 사람이 그 안의 땅을 나눠 갖는 것이 그 지방의 규칙이었습니다.`,
            `그런데 사람들이 보기에는 이랬습니다.`,
            `저 사람이 자기 땅을 늘리려고 우리를 부린다.`,
            `하우케는 그 말이 억울했습니다.`,
            `그리고 억울한 만큼 더 말을 하지 않았습니다.`,
            `공사가 시작되었습니다.`,
            `여러 해가 걸렸습니다.`,
            `하우케는 날마다 그 자리에 나갔습니다.`,
            `비가 와도 나갔고 눈이 와도 나갔습니다.`,
            `그리고 사람들을 아주 몰아붙였습니다.`,
            `어느 날 사람들이 일을 멈췄습니다.`,
            `그리고 이런 말을 했습니다.`,
            `"새 제방에는 산 것을 하나 넣어야 합니다."`,
            `그 지방에는 오래된 미신이 있었습니다.`,
            `새 제방을 쌓을 때 살아 있는 것을 하나 묻어야 그 제방이 무너지지 않는다는 것이었습니다.`,
            `사람들이 개를 한 마리 끌고 왔습니다.`,
            `그리고 구덩이에 넣으려고 했습니다.`,
            `하우케가 달려가 그 개를 빼앗았습니다.`,
            `"이런 짓은 안 됩니다!"`,
            `"이건 옛날부터 하던 것입니다."`,
            `"그런다고 제방이 서는 게 아닙니다. 제방은 흙과 각도가 세우는 겁니다!"`,
            `하우케는 그 개를 안고 집으로 갔습니다.`,
            `그리고 그 개를 길렀습니다.`,
            `그날 마을 사람들이 하우케를 보는 눈이 또 달라졌습니다.`
        ]
    },
    {
        num: 6,
        title: "백마",
        emoji: "🐎",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `공사가 한창일 때 하우케가 말을 한 마리 샀습니다.`,
            `그 말을 산 데에는 사연이 있습니다.`,
            `제방 밖 갯벌 건너에 예베르스산트라는 작은 모래섬이 있었습니다.`,
            `그 섬에 오래전에 말 뼈로 보이는 흰 것이 있다는 이야기가 있었습니다.`,
            `밤에 그 섬을 보면 하얀 것이 움직인다고들 했습니다.`,
            `어느 날 떠돌이 하나가 마을에 왔습니다.`,
            `그리고 말라빠진 흰 말을 한 마리 끌고 있었습니다.`,
            `갈비뼈가 다 드러나고 털이 다 빠진 말이었습니다.`,
            `"이걸 사시겠습니까."`,
            `사람들이 다 웃었습니다.`,
            `그런데 하우케가 그 말을 샀습니다.`,
            `그리고 집에 데려가 먹였습니다.`,
            `몇 달이 지나자 그 말이 달라졌습니다.`,
            `털에 윤이 돌고, 살이 붙고, 아주 훌륭한 말이 되었습니다.`,
            `그리고 아주 빨랐습니다.`,
            `하우케는 그 말을 타고 제방을 오갔습니다.`,
            `그런데 그때부터 마을에 이런 말이 돌았습니다.`,
            `그 섬의 흰 것이 그날 이후로 안 보인다는 것이었습니다.`,
            `"저 말이 그것이다."`,
            `"저 사람이 그것을 데려온 것이다."`,
            `이런 소문이 어떻게 생기는지는 이 소설이 아주 자세히 보여 줍니다.`,
            `처음에는 누가 지나가는 말로 합니다.`,
            `그다음에 다른 사람이 그것을 옮깁니다.`,
            `그리고 세 번째 사람이 그것을 사실로 말합니다.`,
            `그 무렵 하우케는 마을에서 거의 혼자였습니다.`,
            `말을 섞는 사람이 엘케와 그 집 하녀뿐이었습니다.`,
            `그리고 그해에 아이가 태어났습니다.`,
            `딸이었고, 이름은 빈케였습니다.`,
            `빈케는 다른 아이들과 달랐습니다.`,
            `말을 늦게 배웠고, 셈을 못했고, 늘 조용했습니다.`,
            `마을 사람들이 또 수군거렸습니다.`,
            `하우케는 그 딸을 아주 아꼈습니다.`,
            `그리고 그 아이를 데리고 제방에 자주 나갔습니다.`
        ]
    },
    {
        num: 7,
        title: "이음매",
        emoji: "⚠️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `새 제방이 완성되었습니다.`,
            `사람들이 그 제방을 하우케 하이엔 제방이라고 불렀습니다.`,
            `그 안의 땅이 밭이 되었습니다.`,
            `여러 해가 지났습니다.`,
            `그리고 그 제방은 한 번도 문제가 없었습니다.`,
            `가을 폭풍이 여러 번 왔는데 다 견뎠습니다.`,
            `그동안 하우케는 옛 제방도 살폈습니다.`,
            `그리고 한 가지를 알아냈습니다.`,
            `새 제방과 옛 제방이 만나는 자리가 있었습니다.`,
            `그 이음매가 약했습니다.`,
            `옛 제방 쪽이 오래되어 안이 삭아 있었습니다.`,
            `그리고 그 자리에 물길이 하나 생겨 있었습니다.`,
            `쥐구멍이나 물길 같은 것이 제방 안에 생기면, 그 안으로 물이 스며서 안에서부터 무너집니다.`,
            `하우케는 그것을 고쳐야 한다고 관청에 알렸습니다.`,
            `그리고 마을 사람들을 모아 놓고 공사를 하자고 했습니다.`,
            `그런데 사람들이 반대했습니다.`,
            `"또 공사요?"`,
            `"새 제방 쌓느라 여러 해를 부렸잖소."`,
            `"저 제방은 삼백 년을 서 있었소."`,
            `그리고 올레 페테르스가 이렇게 말했습니다.`,
            `"그리고 그 이음매를 그렇게 만든 건 당신 아니오?"`,
            `그것은 사실이었습니다.`,
            `새 제방을 옛 제방에 붙인 것은 하우케였습니다.`,
            `하우케는 그 자리에서 아무 말도 하지 못했습니다.`,
            `그리고 여기서 이 소설에서 가장 중요한 일이 일어납니다.`,
            `하우케가 물러섰습니다.`,
            `"······그럼 봄에 합시다."`,
            `그때 하우케는 마흔이 넘어 있었습니다.`,
            `그리고 여러 해 동안 지쳐 있었습니다.`,
            `그리고 그해 가을에 폭풍이 왔습니다.`
        ]
    },
    {
        num: 8,
        title: "그 밤",
        emoji: "🌪️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `시월 어느 날이었습니다.`,
            `아침부터 하늘빛이 이상했습니다.`,
            `바람이 서북쪽에서 불었습니다.`,
            `그 지방에서 서북풍은 제일 나쁜 바람이었습니다.`,
            `바다를 그대로 뭍 쪽으로 밀어붙이기 때문입니다.`,
            `하우케는 낮부터 말을 타고 제방을 돌았습니다.`,
            `그리고 그 이음매 자리에 갔습니다.`,
            `물이 이미 제방 중간까지 올라와 있었습니다.`,
            `하우케는 사람들을 불러 모았습니다.`,
            `그리고 그 자리를 짚으로 덮고 흙을 쌓게 했습니다.`,
            `밤이 되자 바람이 더 세졌습니다.`,
            `사람들이 등불을 들고 제방 위에 늘어섰습니다.`,
            `그때 하우케가 새 제방 쪽에서 이상한 것을 보았습니다.`,
            `사람들이 새 제방을 파고 있었습니다.`,
            `"뭐 하는 겁니까!"`,
            `올레 페테르스가 말했습니다.`,
            `"새 제방을 터야 합니다. 그래야 물이 그리로 빠져서 옛 제방이 견딥니다."`,
            `하우케가 소리쳤습니다.`,
            `"안 됩니다! 새 제방은 멀쩡합니다! 터지는 건 이음매입니다!"`,
            `"저 새 제방 때문에 이렇게 된 거요!"`,
            `사람들이 하우케 말을 듣지 않았습니다.`,
            `여러 해 동안 쌓인 것이 그날 밤에 터진 것입니다.`,
            `하우케는 말을 몰아 그 사람들에게 갔습니다.`,
            `그리고 삽을 빼앗았습니다.`,
            `그때였습니다.`,
            `이음매 쪽에서 소리가 났습니다.`,
            `아주 낮고 긴 소리였습니다.`,
            `사람들이 다 그쪽을 보았습니다.`,
            `옛 제방이 안에서부터 무너지고 있었습니다.`,
            `물이 그 구멍으로 쏟아져 들어갔습니다.`,
            `그 안쪽에 하우케의 집이 있었습니다.`
        ]
    },
    {
        num: 9,
        title: "물속으로",
        emoji: "🌑",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `하우케는 말을 몰아 집 쪽으로 달렸습니다.`,
            `물이 이미 밭을 덮고 있었습니다.`,
            `그런데 도중에 마차를 하나 만났습니다.`,
            `엘케와 빈케가 타고 있었습니다.`,
            `하녀가 그 두 사람을 데리고 높은 데로 가려던 참이었습니다.`,
            `그런데 물이 이미 길을 덮어 마차가 서 있었습니다.`,
            `하우케가 소리쳤습니다.`,
            `"돌아가시오! 그쪽은 물이오!"`,
            `엘케가 소리쳤습니다.`,
            `"당신은요!"`,
            `"나는 제방으로 가야 하오!"`,
            `그때 물이 한 번 더 크게 밀려왔습니다.`,
            `마차가 기울었습니다.`,
            `하우케는 그것을 보았습니다.`,
            `그리고 그 뒤에 하우케가 무엇을 했는지를 이 소설은 이렇게 적었습니다.`,
            `하우케는 말 머리를 그쪽으로 돌렸습니다.`,
            `그리고 물속으로 들어갔습니다.`,
            `그러면서 이렇게 말했습니다.`,
            `"주여, 저를 데려가십시오. 다만 저 사람들은 살려 주십시오."`,
            `그날 밤 하우케 하이엔과 그 아내와 딸이 세상을 떠났습니다.`,
            `그리고 그 말도요.`,
            `이튿날 아침 물이 빠지자 사람들이 나가 보았습니다.`,
            `옛 제방은 크게 무너져 있었습니다.`,
            `그 안쪽 마을이 절반쯤 물에 잠겨 있었습니다.`,
            `그런데 새 제방은 멀쩡했습니다.`,
            `한 군데도 상하지 않았습니다.`,
            `사람들이 그것을 보고 아무 말도 하지 못했습니다.`,
            `하우케가 옳았던 것입니다.`,
            `처음부터 끝까지요.`
        ]
    },
    {
        num: 10,
        title: "그 뒤에 남은 것",
        emoji: "🕯️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `늙은 선생이 이야기를 마쳤습니다.`,
            `여관 안이 조용했습니다.`,
            `나그네가 물었습니다.`,
            `"그럼 그 백마의 기수는······."`,
            `"사람들이 그렇게 말합니다."`,
            `"선생님은 어떻게 생각하십니까."`,
            `늙은 선생이 말했습니다.`,
            `"나는 그런 것을 믿지 않습니다."`,
            `"그럼 오늘 밤에 제가 본 것은 무엇입니까."`,
            `"비가 오고 바람이 부는 밤에 제방 위를 지나면, 사람이 여러 가지를 봅니다."`,
            `"······."`,
            `"그런데 한 가지는 말씀드릴 수 있습니다."`,
            `"무엇입니까."`,
            `"저 제방 말입니다. 하우케 하이엔 제방이라고 부르는 저것 말입니다."`,
            `"백 년이 되었는데 아직 한 번도 터지지 않았습니다."`,
            `"그리고 그 뒤로 이 지방의 제방을 다 그 모양으로 고쳤습니다."`,
            `나그네가 물었습니다.`,
            `"그 사람이 옳았는데 왜 그렇게 되었습니까."`,
            `늙은 선생이 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.`,
            `"옳은 것을 아는 것과, 그것을 사람들에게 하게 만드는 것은 다른 일입니다."`,
            `"하우케는 앞의 것은 아주 잘했습니다."`,
            `"그리고 뒤의 것은 하지 않았습니다."`,
            `"자기가 옳으니까 그것으로 됐다고 여긴 것입니다."`,
            `"그런데 그렇게 되지 않습니다."`,
            `나그네가 물었습니다.`,
            `"그럼 마을 사람들이 잘못한 것입니까, 하우케가 잘못한 것입니까."`,
            `늙은 선생이 말했습니다.`,
            `"둘 다입니다."`,
            `"그런데 값은 하우케가 다 치렀습니다."`,
            `이 소설을 쓴 사람은 테오도어 슈토름이라는 독일 사람입니다.`,
            `북프리슬란트에서 나고 자랐고, 평생 그 지방을 썼습니다.`,
            `이 작품은 그가 마지막으로 쓴 것입니다.`,
            `병으로 앓으면서 썼고, 다 쓰고 몇 달 뒤에 세상을 떠났습니다.`,
            `그 지방에는 지금도 제방이 있습니다.`,
            `그리고 그 제방의 바다 쪽 면은 길게 누워 있습니다.`
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
                ${artFrame('cover.png', '🌊')}
            </div>
            <div class="story-page-right">
                <h1>백마의 기수</h1>
                <p class="cover-tag">테오도어 슈토름 원작</p>
                <p>바다보다 낮은 땅에 사는 사람들에게 제방은 목숨입니다. 어릴 때부터 제방을 들여다본 하우케 하이엔이 삼백 년 된 제방이 잘못 만들어졌다는 것을 알아냅니다.</p>
                <p>옳은 것을 아는 것과 그것을 사람들에게 하게 만드는 것은 다른 일이라는 이야기입니다.</p>
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
    { q: "북프리슬란트 사람들에게 제방이 무엇입니까?", choices: ["길", "없으면 그 땅이 바다가 되는 둑", "울타리"], answer: 1 },
    { q: "하우케가 옛 제방의 무엇이 잘못됐다고 했습니까?", choices: ["너무 낮다", "바다 쪽 면이 가팔라 파도가 때린다", "흙이 나쁘다"], answer: 1 },
    { q: "하우케가 제안한 제방 모양은 무엇입니까?", choices: ["바다 쪽 면을 길게 눕히는 것", "돌로 쌓는 것", "두 겹으로 쌓는 것"], answer: 0 },
    { q: "하우케가 네덜란드 말로 된 기하학 책을 어떻게 읽었습니까?", choices: ["배워서", "그림과 숫자만 보고 알아내서", "번역본으로"], answer: 1 },
    { q: "그 시절 제방 감독관 자리는 누가 맡게 되어 있었습니까?", choices: ["가장 잘 아는 사람", "땅을 많이 가진 사람", "나이 많은 사람"], answer: 1 },
    { q: "하우케가 그 자리에 앉게 된 계기는 무엇입니까?", choices: ["시험", "엘케가 아버지 땅을 물려받고 혼인하겠다고 밝혀서", "관청이 임명해서"], answer: 1 },
    { q: "고양이 이야기를 이 소설에 넣은 까닭은 무엇입니까?", choices: ["하우케가 옳은 것을 알면서도 성질이 급했다는 것을 보이려고", "고양이를 좋아해서", "미신 때문에"], answer: 0 },
    { q: "마을 사람들이 새 제방 공사에 반대한 가장 큰 까닭은 무엇입니까?", choices: ["위험해서", "새로 생긴 땅의 상당 부분이 하우케 것이 되어서", "시간이 없어서"], answer: 1 },
    { q: "사람들이 새 제방에 산 것을 넣으려 한 까닭은 무엇입니까?", choices: ["오래된 미신 때문에", "무게를 늘리려고", "표시를 하려고"], answer: 0 },
    { q: "하우케가 그때 한 말은 무엇입니까?", choices: ["제방은 흙과 각도가 세우는 것이다", "그냥 하시오", "나중에 하자"], answer: 0 },
    { q: "백마에 대한 소문은 어떻게 생겼습니까?", choices: ["누가 지어냈다", "지나가는 말이 옮겨지고 세 번째 사람이 사실로 말하면서", "책에 있었다"], answer: 1 },
    { q: "실제로 무너진 곳은 어디입니까?", choices: ["새 제방", "새 제방과 옛 제방이 만나는 이음매", "옛 제방 한가운데"], answer: 1 },
    { q: "하우케가 그 이음매 공사를 봄으로 미룬 까닭은 무엇입니까?", choices: ["돈이 없어서", "여러 해 지쳐 있었고 사람들 반대에 물러서서", "겨울이라서"], answer: 1 },
    { q: "그날 밤 사람들이 새 제방을 파려고 한 까닭은 무엇입니까?", choices: ["물을 그리로 빼면 옛 제방이 견딘다고 여겨서", "하우케가 시켜서", "실수로"], answer: 0 },
    { q: "이튿날 아침에 밝혀진 것은 무엇입니까?", choices: ["새 제방은 한 군데도 상하지 않았다", "새 제방이 먼저 무너졌다", "둘 다 무너졌다"], answer: 0 },
    { q: "늙은 선생이 말한 이 이야기의 핵심은 무엇입니까?", choices: ["미신을 믿지 마라", "옳은 것을 아는 것과 그것을 사람들에게 하게 만드는 것은 다른 일이다", "제방을 잘 쌓아라"], answer: 1 }
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
            ${artFrame('end.png', '🕯️')}
            <h2>백마의 기수를 다 읽었습니다</h2>
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
