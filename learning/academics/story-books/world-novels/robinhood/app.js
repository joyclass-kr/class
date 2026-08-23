const BOOK_TITLE = "로빈 훗의 모험";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "숲으로 들어가다",
        emoji: "🏹",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `영국 노팅엄 가까이에 셔우드라는 큰 숲이 있었습니다. 참나무가 아주 크게 자라서, 한낮에도 숲 안은 어두웠습니다.`,
            `그 무렵 영국의 숲은 다 왕의 것이었습니다. 숲에 사는 사슴도 왕의 것이었습니다. 그래서 굶주린 사람이 사슴 한 마리를 잡으면 목숨을 잃을 수도 있었습니다.`,
            `그 숲 가까이에 로빈 훗이라는 젊은이가 살았습니다. 아버지가 물려준 작은 땅이 있었고, 활을 아주 잘 쏘았습니다.`,
            `그해 봄, 노팅엄에서 활쏘기 대회가 열린다는 소식이 있었습니다. 로빈은 활을 메고 그리로 가는 길이었습니다. 숲을 지나는데 나무 아래에서 사람들이 술을 마시고 있었습니다.`,
            `왕의 숲을 지키는 사람들이었습니다.`,
            `그 가운데 우두머리가 로빈을 보고 소리쳤습니다.<br>"이봐, 꼬마. 그 활은 어디 쓰려고?"<br>"활쏘기 대회에 나갑니다."`,
            `사람들이 웃었습니다.<br>"저 나이에 무슨 활이야." 로빈은 그때 열여덟이었습니다.`,
            `"저는 삼백 걸음 밖의 사슴도 맞힙니다."<br>"그래? 그럼 저기 사슴 떼가 있는데, 저 가운데 하나를 맞히면 은화 스무 닢을 주지."`,
            `저 멀리 골짜기 건너편에 사슴이 있었습니다. 아주 멀었습니다. 로빈은 활을 당겼습니다.`,
            `화살이 날아가서 그 가운데 제일 큰 수사슴을 맞혔습니다. 사람들이 조용해졌습니다. 그러다 우두머리가 일어섰습니다.`,
            `"네가 왕의 사슴을 죽였구나."<br>"내기를 하자고 하시지 않았습니까."<br>"내기는 내기고 법은 법이다. 너는 이제 목이 매달릴 것이다."`,
            `그리고 사람들이 로빈을 붙잡으려고 했습니다. 로빈은 몸을 빼서 숲으로 뛰었습니다. 뒤에서 화살이 날아왔습니다.`,
            `한 발이 로빈의 모자를 뚫고 지나갔습니다. 로빈은 그날부터 숲에서 살게 되었습니다. 집으로 돌아갈 수 없었고, 이름을 쓸 수도 없었습니다.`,
            `법의 보호를 받지 못하는 사람, 곧 무법자가 된 것입니다. 그때 로빈은 열여덟 살이었습니다.`
        ]
    },
    {
        num: 2,
        title: "리틀 존",
        emoji: "🪵",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `숲에는 로빈 말고도 쫓겨 온 사람들이 있었습니다. 빚을 못 갚아 집을 빼앗긴 사람, 세금을 못 내 도망친 사람, 굶어서 사슴을 잡았다가 쫓긴 사람. 한 해가 지나자 그 사람들이 로빈 둘레에 모였습니다.`,
            `모두 초록 옷을 입었습니다. 숲에서는 초록 옷이 눈에 띄지 않기 때문입니다. 사람들은 그 무리를 즐거운 사람들이라고 불렀습니다.`,
            `어느 날 로빈이 혼자 숲을 걷다가 개울에 이르렀습니다. 개울 위에 통나무 다리가 하나 걸쳐 있었습니다. 사람 하나가 겨우 지나갈 만한 좁은 다리였습니다.`,
            `로빈이 다리에 발을 올리는데, 맞은편에서도 사람이 하나 올라섰습니다.`,
            `키가 아주 컸습니다. 로빈보다 머리 하나가 더 컸습니다.`,
            `"비키시오." 로빈이 말했습니다.`,
            `"당신이 비키시오."<br>"나는 활을 들고 있소. 세 발이면 당신이 물에 빠질 거요."<br>그 사람이 말했습니다.<br>"활을 든 사람이 몽둥이 든 사람에게 그런 말을 하다니, 겁쟁이로군."`,
            `로빈은 그 말에 얼굴이 붉어졌습니다. 그래서 활을 덤불에 던져 놓고, 참나무 가지를 잘라 몽둥이를 만들었습니다.`,
            `"자, 그럼 이걸로 합시다. 다리에서 떨어지는 쪽이 지는 걸로."`,
            `두 사람은 다리 위에서 몽둥이로 싸웠습니다. 한 시간 가까이 싸웠습니다. 로빈이 몇 번 좋은 자리를 잡았지만, 상대의 팔이 너무 길어서 소용이 없었습니다. 그러다 결국 로빈이 개울에 빠졌습니다.`,
            `로빈은 물속에서 웃으면서 나왔습니다.`,
            `"내가 졌소. 이름이 뭐요?"`,
            `"존 리틀이오." 로빈이 그 큰 몸집을 위아래로 보았습니다.`,
            `"이름이 안 맞는군. 오늘부터 리틀 존이라고 부르겠소."`,
            `그렇게 해서 이 이야기에서 가장 큰 사람의 이름이 '작은 존'이 되었습니다. 리틀 존은 그날부터 로빈의 무리에 들어왔습니다. 그리고 이 무리에서 로빈 다음가는 사람이 되었습니다.`
        ]
    },
    {
        num: 3,
        title: "터크 수사",
        emoji: "⛪",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `무리에는 여러 사람이 있었습니다. 윌 스칼렛은 로빈의 사촌이었습니다.`,
            `옷을 늘 붉게 입어서 그렇게 불렸습니다. 검을 잘 썼습니다.`,
            `머치는 방앗간 집 아들이었습니다. 앨런 어 데일은 노래를 부르는 사람이었습니다. 앨런은 어느 날 숲에서 울고 있다가 로빈에게 발견되었습니다.`,
            `사연은 이랬습니다. 앨런에게는 혼인을 약속한 사람이 있었는데, 그 여자의 아버지가 돈 많은 늙은 기사에게 딸을 주기로 했다는 것입니다. 혼례가 사흘 뒤였습니다.`,
            `로빈이 말했습니다.<br>"그럼 우리가 가서 그 혼례를 뒤집읍시다."`,
            `그런데 혼례를 뒤집으려면 성직자가 필요했습니다. 혼례를 다시 치러 줄 사람이 있어야 했기 때문입니다.`,
            `누가 말했습니다.<br>"파운틴 개울가에 사는 수사가 있는데, 그 사람이라면 할지도 모릅니다."`,
            `로빈이 그 개울로 갔습니다. 물가에 뚱뚱한 수사가 하나 앉아 있었습니다. 머리를 둥글게 밀었고, 목이 굵고, 옆에 술병과 구운 고기를 놓고 있었습니다.`,
            `"수사님, 저를 업어서 저 개울을 건네주십시오." 수사는 아무 말 없이 로빈을 업고 개울을 건넜습니다.`,
            `그러고는 로빈을 내려놓고 말했습니다.<br>"이번엔 자네가 나를 업고 도로 건너게."`,
            `로빈은 그 큰 사람을 업고 건넜습니다. 그리고 다시 한 번, 또 한 번 오갔습니다. 그러다 수사가 개울 한가운데서 로빈을 물에 떨어뜨렸습니다.`,
            `두 사람은 물속에서 싸웠습니다. 그리고 둘 다 지쳐서 물가에 나란히 앉았습니다.`,
            `"수사님, 이름이 뭡니까."<br>"터크라고 하네."<br>"우리와 함께 가시겠습니까. 술과 고기는 넉넉합니다."`,
            `터크 수사는 그 말을 듣고 술병을 들여다보았습니다. 비어 있었습니다.`,
            `"가지."`,
            `사흘 뒤, 그 혼례식장에 초록 옷을 입은 사람들이 나타났습니다. 앨런이 노래를 불렀고, 터크 수사가 두 사람을 맺어 주었습니다. 늙은 기사는 화가 나서 갔지만, 그 자리에 있던 사람들은 다 박수를 쳤습니다.`
        ]
    },
    {
        num: 4,
        title: "부자의 짐, 가난한 이의 짐",
        emoji: "💰",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `무리에는 규칙이 몇 가지 있었습니다. 로빈이 정한 것이었습니다.`,
            `첫째, 여자와 아이는 절대 건드리지 않는다.`,
            `둘째, 농부와 일하는 사람의 것은 손대지 않는다.`,
            `셋째, 숲을 지나는 사람은 누구든 먼저 불러 밥을 먹인다. 그리고 밥값은 그 사람의 주머니 사정에 맞춰 받는다.`,
            `셋째 규칙이 이 무리의 방식이었습니다.`,
            `숲길로 사람이 지나가면 리틀 존이 나가서 정중하게 말했습니다.<br>"주인께서 기다리십니다. 저녁을 대접하겠습니다."`,
            `대개는 무서워서 따라왔습니다. 숲속 빈터에 상이 차려져 있었고, 사슴 고기와 빵과 술이 나왔습니다.`,
            `다 먹고 나면 로빈이 물었습니다.<br>"주머니에 얼마나 있으십니까?"`,
            `그리고 사실대로 말하는 사람에게는 그대로 받았습니다. 거짓말을 하는 사람은 뒤져서 다 가져갔습니다.`,
            `어느 날 저녁, 초라한 옷차림의 기사가 하나 지나갔습니다. 말도 여위었고 갑옷도 낡았습니다. 로빈이 그를 불러 밥을 먹였습니다.`,
            `"주머니에 얼마나 있으십니까?"<br>"열 실링밖에 없소."`,
            `리틀 존이 짐을 뒤졌습니다. 정말로 열 실링뿐이었습니다.`,
            `"어쩌다 이렇게 되셨습니까?"<br>기사가 말했습니다.<br>"내 아들이 사람을 죽였소. 싸움 끝에 벌어진 일이었소. 그 값을 치르느라 땅을 다 저당 잡혔소. 사백 파운드요."<br>"누구에게 잡히셨습니까?"<br>"세인트메리 수도원장이오. 내일이 갚는 날인데, 못 갚으면 땅을 다 가져가오."`,
            `로빈은 한참 아무 말도 하지 않았습니다.`,
            `그러고는 리틀 존에게 말했습니다.<br>"사백 파운드를 내주게."`,
            `기사가 놀랐습니다.`,
            `"언제 갚으면 되겠소?"<br>"한 해 뒤에 이 나무 아래로 오십시오."<br>"보증인이 필요하지 않소?"<br>"보증은 필요 없습니다."`,
            `그리고 로빈은 옷과 말과 신발까지 새로 내주었습니다. 기사는 눈물을 흘리며 갔습니다. 이름은 리처드 오브 리라고 했습니다.`
        ]
    },
    {
        num: 5,
        title: "수도원장의 셈",
        emoji: "📜",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `이튿날 세인트메리 수도원에서는 잔치 준비가 한창이었습니다. 수도원장이 아주 기분이 좋았기 때문입니다.`,
            `"오늘이 그 기사가 갚는 날이지. 못 갚을 게 뻔하니 그 땅은 우리 것이야."`,
            `그 땅은 아주 좋은 땅이었습니다. 그날 정오가 다 되었는데 기사가 오지 않았습니다. 수도원장은 웃으면서 서류를 준비시켰습니다.`,
            `그때 문이 열렸습니다. 기사가 들어왔습니다.`,
            `그런데 옷차림이 초라했습니다. 일부러 낡은 옷을 입고 온 것이었습니다.`,
            `기사가 무릎을 꿇었습니다.`,
            `"원장님, 기한을 조금만 늘려 주십시오."<br>"안 되오."<br>"제 아이들이 있습니다."<br>"법은 법이오. 오늘 못 갚으면 땅은 우리 것이오."`,
            `그 자리에 다른 사람도 몇 있었습니다.`,
            `그 가운데 한 사람이 말했습니다.<br>"원장님, 백 파운드만이라도 깎아 주시지요."<br>"한 푼도 안 되오."`,
            `그 자리에 있던 사람들이 서로 눈을 마주쳤습니다. 수도원의 벽에는 금실로 짠 천이 걸려 있었고, 상 위에는 은그릇이 놓여 있었습니다. 그런데 백 파운드를 깎아 주지 않겠다고 하는 것이었습니다.`,
            `그때 기사가 일어섰습니다. 그리고 자루를 상 위에 쏟았습니다. 금화 사백 파운드가 쏟아졌습니다.`,
            `수도원장의 얼굴이 하얘졌습니다.`,
            `"자, 셈은 끝났습니다. 서류를 주십시오."`,
            `수도원장은 아무 말도 하지 못했습니다. 기사는 서류를 받아 들고 나왔습니다. 그리고 집으로 돌아가 아내에게 그동안 있었던 일을 다 이야기했습니다.`,
            `한 해 뒤, 리처드 오브 리는 사백 파운드를 마련해 셔우드로 갔습니다. 그런데 가는 길에 씨름 대회를 지나게 되었습니다.`,
            `그 자리에서 어떤 젊은이가 우승했는데, 사람들이 상을 주지 않고 그 사람을 때리려고 했습니다. 그 젊은이가 그 고장 사람이 아니었기 때문입니다. 기사는 말에서 내려 그 사람들을 말렸습니다.`,
            `그러느라 시간이 걸려 약속한 날에 늦었습니다. 리처드 오브 리는 셔우드에 하루 늦게 닿았습니다.`,
            `로빈이 물었습니다.<br>"왜 늦으셨습니까?"`,
            `기사가 씨름 대회에서 있었던 일을 이야기했습니다. 로빈이 웃었습니다.`,
            `"그럼 늦은 게 아니지요." 그리고 사백 파운드를 받지 않겠다고 했습니다.<br>"그 돈은 이미 그 젊은이에게 쓰셨습니다."`,
            `기사는 그 돈을 두고 갔습니다. 그리고 그 뒤로 여러 해 동안, 셔우드에 급한 일이 생기면 늘 그 기사의 집이 문을 열어 주었습니다.`
        ]
    },
    {
        num: 6,
        title: "노팅엄 성주",
        emoji: "🏰",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `노팅엄에는 성주가 하나 있었습니다. 그 고장의 세금을 걷고 재판을 하는 사람이었습니다. 그 사람은 로빈 훗 때문에 몹시 시달렸습니다.`,
            `왕에게 보낼 세금을 실은 짐이 숲에서 자꾸 사라졌기 때문입니다. 그런데 그 세금 가운데 얼마는 성주가 몰래 자기 것으로 돌리던 것이었습니다. 그래서 그 사람은 그것을 크게 떠들 수도 없었습니다.`,
            `그 시절에는 세금을 걷는 사람이 얼마를 걷었는지 아무도 확인하지 않았습니다. 그래서 걷는 사람 마음대로였습니다. 성주는 왕에게 보낼 몫을 정해 놓고, 그 위에 얹어서 걷었습니다.`,
            `얹은 몫이 자기 것이었습니다. 성주는 로빈을 잡으려고 여러 가지를 해 보았습니다. 숲에 사람을 보내면 돌아오지 못했습니다.`,
            `상금을 걸었더니 오히려 숲으로 들어가는 사람이 늘었습니다. 그래서 성주는 꾀를 냈습니다. 활쏘기 대회를 여는 것이었습니다.`,
            `상은 금과 은으로 만든 화살로 정했습니다.`,
            `"로빈 훗은 활을 자랑하는 자다. 그런 대회가 열리면 반드시 온다."`,
            `그리고 대회장 곳곳에 병사를 숨겨 두었습니다. 숲에서 그 소식을 들었을 때, 리틀 존이 말렸습니다.`,
            `"덫입니다."<br>"알아."<br>"그럼 가지 마십시오."<br>"가야지."<br>"왜요?"<br>로빈이 말했습니다.<br>"안 가면 저쪽이 이긴 것이 되니까."`,
            `그런데 로빈도 아주 무모하지는 않았습니다. 무리는 초록 옷을 벗었습니다. 거지 옷, 농부 옷, 수사 옷을 입고 하나씩 따로 들어갔습니다.`,
            `로빈은 눈에 안대를 하고 붉은 옷을 입었습니다. 대회가 시작되었습니다. 성주는 사람들 얼굴을 하나하나 살폈습니다.`,
            `초록 옷을 입은 사람은 하나도 없었습니다. 성주는 관람석 맨 앞자리에 앉았습니다. 그리고 활을 쏘는 사람이 나올 때마다 손짓으로 병사에게 신호를 보냈습니다.`,
            `저 사람을 살펴보라는 신호였습니다. 그런데 하루가 다 가도록 아무 일도 일어나지 않았습니다.`
        ]
    },
    {
        num: 7,
        title: "황금 화살",
        emoji: "🎯",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `활쏘기는 하루 종일 이어졌습니다. 여든 명이 나왔다가 스무 명이 남고, 스무 명이 열 명이 되고, 결국 셋이 남았습니다. 그 가운데 하나가 안대를 한 붉은 옷의 사람이었습니다.`,
            `마지막 판이 시작되었습니다. 과녁이 아주 멀리 놓였습니다.`,
            `첫 번째 사람이 쏘았습니다. 가운데에서 손가락 두 마디쯤 벗어났습니다.`,
            `두 번째 사람이 쏘았습니다. 가운데에 아주 가까웠습니다.`,
            `사람들이 소리를 질렀습니다. 붉은 옷의 사람이 앞으로 나왔습니다. 그리고 활을 당겼습니다.`,
            `화살이 날아가서 앞사람의 화살을 쪼개고 그 자리에 박혔습니다. 사람들이 한꺼번에 일어섰습니다. 성주가 그 사람을 불러 황금 화살을 주었습니다.`,
            `"자네 솜씨가 대단하군. 내 밑에서 일할 생각은 없나?"`,
            `"저는 매인 데가 있어서요."<br>"이름이 뭔가?"<br>"저는 이름이 없습니다."`,
            `성주는 그 목소리를 어디선가 들은 것 같았습니다. 그런데 어디서 들었는지 떠오르지 않았습니다. 안대 때문에 얼굴이 반쯤 가려져 있었습니다.`,
            `성주는 손을 뻗어 그 안대를 벗겨 보고 싶었습니다. 그런데 그러지 못했습니다. 사람들이 다 보고 있었기 때문입니다.`,
            `우승한 사람의 얼굴을 벗기는 것은 성주가 할 짓이 아니었습니다. 성주는 그 사람을 한참 보다가 보냈습니다.`,
            `그날 밤 성주는 잠자리에 들려다가 화살이 창에 박히는 소리를 들었습니다. 창틀에 화살이 하나 꽂혀 있었습니다. 그 화살에 종이가 매여 있었습니다.`,
            `종이에는 이렇게 적혀 있었습니다.`,
            `"황금 화살 잘 받았습니다. 로빈 훗."`,
            `성주는 그 화살을 뽑아 부러뜨렸습니다. 그리고 그날 밤 잠을 이루지 못했습니다. 그런데 이 이야기에는 다른 쪽도 있습니다.`,
            `그 대회에서 로빈의 무리 하나가 붙잡혔습니다. 윌 스터틀리라는 사람이었습니다. 성주는 그 사람을 사흘 뒤에 처형하겠다고 알렸습니다.`,
            `사람들을 많이 모아 놓고 하겠다고 했습니다. 로빈이 오리라고 생각했기 때문입니다. 무리는 그 소식을 그날 밤에 들었습니다.`,
            `숲이 조용해졌습니다. 윌 스터틀리는 그 무리에서 제일 오래된 사람 가운데 하나였습니다.`,
            `리틀 존이 말했습니다.<br>"이번에는 제가 가겠습니다."<br>"덫인 줄 알면서?"<br>"덫인 줄 알고 가는 것과 모르고 가는 것은 다릅니다."`
        ]
    },
    {
        num: 8,
        title: "윌 스터틀리",
        emoji: "⚔️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `사흘 뒤 노팅엄 성 앞에 사람이 가득 모였습니다. 윌 스터틀리가 손이 묶인 채 끌려 나왔습니다. 그 자리에 노팅엄 사람들이 다 나와 있었습니다.`,
            `성주는 그것이 좋은 구경거리라고 생각했습니다. 사람들이 무서워하면 다시는 숲으로 도망칠 생각을 하지 않을 것이라고 여긴 것입니다. 그런데 사람들의 얼굴은 성주가 생각한 것과 달랐습니다.`,
            `성주가 물었습니다.<br>"마지막으로 할 말이 있느냐."<br>"있습니다. 손을 풀어 주고 칼을 하나 주십시오. 그리고 병사 몇 명과 겨루다가 죽게 해 주십시오."<br>"안 된다."<br>"그럼 두 손을 자유롭게 해 주십시오. 맨손으로라도 싸우겠습니다."<br>"안 된다."<br>윌이 말했습니다.<br>"성주님, 당신은 참 겁이 많은 사람이군요."`,
            `그때 사람들 속에서 목소리가 났습니다.<br>"그 사람 손을 풀어 주시오!"`,
            `사람들이 갈라졌습니다. 키가 아주 큰 사람이 걸어 나왔습니다. 리틀 존이었습니다.`,
            `리틀 존은 성큼성큼 걸어가 윌의 밧줄을 끊었습니다. 병사들이 달려들었습니다.`,
            `그때 성벽 위와 지붕 위, 그리고 사람들 속에서 초록 옷들이 일어섰습니다. 화살이 병사들의 발밑에 꽂혔습니다. 일부러 맞히지 않고 발밑에 쏜 것이었습니다. 그리고 목소리가 들렸습니다.`,
            `"다음 화살은 발밑이 아닙니다."`,
            `병사들이 멈췄습니다. 로빈의 무리는 윌 스터틀리를 데리고 성문 밖으로 걸어 나갔습니다. 아무도 막지 못했습니다.`,
            `모여 있던 사람들이 길을 열어 주었기 때문입니다. 성주는 성벽 위에서 그것을 보고 있었습니다. 그리고 그때 깨달았습니다.`,
            `자기가 싸우고 있는 상대는 숲속의 스무 명이 아니었습니다. 노팅엄 사람들이었습니다.`,
            `그날 저녁 노팅엄의 집집에서 그 이야기를 했습니다. 화살이 발밑에 꽂히던 이야기, 병사들이 멈추던 이야기, 사람들이 길을 열어 주던 이야기. 그 이야기를 하면서 사람들은 목소리를 낮추었습니다. 그런데 목소리를 낮추면서도 웃었습니다.`
        ]
    },
    {
        num: 9,
        title: "푸줏간 장수",
        emoji: "🥩",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `로빈은 변장을 아주 좋아했습니다. 한번은 이런 일이 있었습니다. 숲길에서 푸줏간 장수를 만났는데, 고기를 잔뜩 실은 수레를 끌고 노팅엄 장으로 가는 길이었습니다.`,
            `로빈이 물었습니다.<br>"그 수레와 고기와 옷을 다 얼마에 파시겠소?"<br>"네?"<br>"내가 사겠소."`,
            `로빈은 값을 넉넉히 치르고 그 옷을 입었습니다. 그리고 노팅엄 장으로 갔습니다. 장에 자리를 잡고 고기를 팔기 시작했습니다. 그런데 값을 아주 이상하게 매겼습니다.`,
            `옷이 좋은 사람에게는 아주 비싸게 팔았습니다. 옷이 낡은 사람에게는 거의 공짜로 주었습니다. 아이를 안고 온 여자에게는 그냥 주었습니다. 그러자 사람들이 몰려들었습니다.`,
            `다른 푸줏간 장수들이 화가 났습니다.<br>"저 사람 때문에 우리 고기가 안 팔린다." 그런데 한편으로는 궁금하기도 했습니다.`,
            `'저렇게 팔면 손해일 텐데. 저 사람은 부자인가?'`,
            `그래서 그날 저녁, 푸줏간 장수들이 로빈을 성주의 잔치에 데려갔습니다. 그 고장 장사꾼들이 성주와 함께 밥을 먹는 날이었습니다.`,
            `성주는 새로 온 사람을 보고 물었습니다.<br>"자네는 처음 보는군. 소가 많은가?"<br>"많습니다. 오백 마리쯤 있습니다."`,
            `성주의 눈이 반짝였습니다.`,
            `"그걸 다 팔 생각은 없나?"<br>"싸게 드리겠습니다. 삼백 파운드만 주십시오."`,
            `그 값이면 거저였습니다. 성주는 그 젊은이가 셈에 어두운 시골 사람이라고 생각했습니다.`,
            `이튿날 성주는 삼백 파운드를 챙겨 로빈을 따라나섰습니다. 두 사람은 말을 타고 숲으로 들어갔습니다. 숲 깊이 들어가자 성주가 불안해했습니다.`,
            `"이보게, 여기는 그······ 로빈 훗이 사는 데인데."<br>"소는 저 안에 있습니다."`,
            `빈터에 이르자 사슴 떼가 풀을 뜯고 있었습니다.<br>"저것이 제 소입니다."`,
            `성주가 얼굴이 하얘졌습니다. 그때 나무 사이에서 초록 옷들이 나왔습니다.`
        ]
    },
    {
        num: 10,
        title: "성주가 저녁을 먹다",
        emoji: "🍖",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `성주는 그날 저녁을 숲에서 먹었습니다. 사슴 고기와 빵과 술이 나왔습니다. 로빈은 성주를 아주 정중하게 대접했습니다.`,
            `상석에 앉히고, 제일 좋은 부위를 잘라 주고, 잔이 비면 채워 주었습니다. 성주는 아무것도 먹지 못했습니다. 옆에서 리틀 존이 계속 술을 따랐습니다.`,
            `"드십시오, 성주님. 이런 고기는 노팅엄에서도 못 드십니다."`,
            `성주는 그 고기가 어디서 온 고기인지 알고 있었습니다. 왕의 사슴이었습니다. 그것을 먹으면 자기도 같은 죄가 되는 것이었습니다. 그런데 안 먹을 수도 없었습니다.`,
            `밥이 끝나자 로빈이 말했습니다.<br>"밥값을 셈해야지요."`,
            `리틀 존이 성주의 자루를 가져와 쏟았습니다. 삼백 파운드가 상 위에 굴렀습니다.`,
            `"이 돈이 어디서 났는지 여쭤도 되겠습니까?" 성주는 대답하지 못했습니다.`,
            `로빈이 말했습니다.<br>"이 고장 사람들에게서 걷은 돈이지요. 그러니 이 고장 사람들에게 돌아가야 맞습니다."`,
            `그리고 성주를 풀어 주었습니다.`,
            `"말도 돌려드리겠습니다. 다만 한 가지 약속을 하셔야 합니다."`,
            `"무슨 약속인가."<br>"앞으로 이 숲에서 우리 사람을 잡으면, 재판 없이 목매달지 마십시오. 재판을 하십시오."`,
            `성주는 그러겠다고 했습니다. 그리고 밤길을 달려 노팅엄으로 돌아갔습니다. 가는 내내 성주는 한 가지 생각만 했습니다.`,
            `이 이야기가 퍼지면 안 된다는 것이었습니다. 그런데 이튿날 아침에 이미 다 퍼져 있었습니다.`,
            `그 뒤로 그 이야기가 온 고장에 퍼졌습니다. 성주가 숲에서 저녁을 얻어먹고 자기 돈을 뺏겼다는 이야기였습니다. 사람들은 그 이야기를 하면서 웃었습니다.`,
            `성주에게는 그것이 돈을 잃은 것보다 아팠습니다.`,
            `여기서 한 가지 짚어 둘 것이 있습니다. 이 이야기들은 실제로 있었던 일을 적은 것이 아닙니다.`,
            `로빈 훗이 정말로 살았던 사람인지도 확실하지 않습니다. 이 이야기는 영국의 시골 사람들이 오백 년 넘게 입에서 입으로 전한 노래에서 나왔습니다. 그러니까 이것은 힘없는 사람들이 지어낸 이야기입니다.`,
            `그 사람들이 무엇을 바랐는지가 이 이야기에 다 들어 있습니다.`
        ]
    },
    {
        num: 11,
        title: "가이 오브 기스본",
        emoji: "🐴",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `성주는 결국 사람을 하나 불렀습니다. 가이 오브 기스본이라는 사람이었습니다. 돈을 받고 사람을 쫓는 일을 하는 자였습니다.`,
            `말가죽을 뒤집어쓰고 다녔는데, 머리와 꼬리가 그대로 붙어 있었습니다. 그자는 숲에 혼자 들어갔습니다.`,
            `한편 그날 숲에서는 리틀 존이 혼자 나가 있다가 병사들에게 붙잡혔습니다. 그리고 로빈은 숲속에서 말가죽을 쓴 사람을 만났습니다. 두 사람은 서로를 모르는 척하고 이야기를 나누었습니다.`,
            `"누구를 찾으시오?"<br>"로빈 훗이라는 자를 찾소. 그놈 목에 돈이 걸려 있소."<br>"내가 그 사람을 아오. 같이 갑시다."`,
            `두 사람은 함께 걸었습니다. 가다가 활쏘기 내기를 했습니다. 로빈이 이겼습니다.`,
            `"자네 솜씨가 대단하군. 이름이 뭔가?"`,
            `"로빈 훗이오."`,
            `그자는 그 자리에서 칼을 뽑았습니다. 그 싸움은 아주 길었습니다. 그자는 로빈이 만난 상대 가운데 가장 강했습니다.`,
            `로빈은 나무뿌리에 걸려 넘어졌습니다. 칼이 내려오는 것을 겨우 막았습니다. 그리고 몸을 굴려 일어서면서 칼을 휘둘렀습니다.`,
            `그 싸움은 그것으로 끝났습니다. 로빈은 한참 그 자리에 서 있었습니다.`,
            `그리고 이렇게 말했습니다.<br>"이 사람도 누구의 아들이었겠지."`,
            `그러고는 그 말가죽을 벗겨 자기가 뒤집어썼습니다. 그리고 그자의 뿔피리를 불었습니다. 그 뿔피리 소리는 일이 끝났다는 신호였습니다.`,
            `저편에서 병사들이 그 소리를 듣고 리틀 존을 끌고 나왔습니다.`,
            `말가죽을 쓴 사람이 다가와 말했습니다.<br>"저놈은 내가 처리하겠소."`,
            `그러고는 리틀 존의 밧줄을 끊었습니다. 그리고 두 사람은 활을 들었습니다.`
        ]
    },
    {
        num: 12,
        title: "매리언",
        emoji: "🌿",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그 무렵 숲으로 사람이 하나 찾아왔습니다. 젊은 기사 차림이었는데, 얼굴을 투구로 가리고 있었습니다. 숲길에서 로빈과 마주쳤습니다.`,
            `"길을 비키시오."<br>"먼저 이름을 밝히시오."`,
            `두 사람은 칼을 뽑았습니다. 한참을 겨루었는데 승부가 나지 않았습니다.`,
            `그러다 로빈이 물러서며 말했습니다.<br>"당신은 대단한 검객이오. 이름이 뭐요?"`,
            `상대가 투구를 벗었습니다. 긴 머리가 흘러내렸습니다. 젊은 여자였습니다.`,
            `"매리언."`,
            `로빈이 칼을 떨어뜨렸습니다. 매리언은 귀족 집안의 딸이었습니다. 로빈과 어릴 때부터 알던 사이였는데, 로빈이 무법자가 된 뒤로 만나지 못했습니다.`,
            `그동안 집안에서는 매리언을 다른 사람에게 시집보내려고 했습니다. 매리언은 그것이 싫어서 집을 나왔습니다. 그리고 남자 옷을 입고 로빈을 찾아온 것이었습니다.`,
            `"여기서 살겠어."<br>"여기는 위험한 데야."<br>"거기도 위험했어."`,
            `로빈은 더 말리지 못했습니다. 매리언은 그날부터 숲에서 살았습니다. 그리고 곧 무리에서 아주 중요한 사람이 되었습니다.`,
            `매리언은 활도 잘 쏘았지만, 그보다 잘하는 것이 따로 있었습니다. 매리언은 아직 노팅엄의 집들을 드나들 수 있었습니다. 귀족 집안 딸이었기 때문입니다. 그래서 성주가 무엇을 꾸미는지, 병사가 어디로 가는지를 알아 왔습니다.`,
            `그 뒤로 성주의 계획은 번번이 미리 새어 나갔습니다. 성주는 자기 집안에 첩자가 있다고 생각했습니다. 그리고 하인들을 여럿 내쫓았습니다.`,
            `엉뚱한 사람들이었습니다.`
        ]
    },
    {
        num: 13,
        title: "붙잡히다",
        emoji: "🔒",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `그러던 어느 날 로빈이 붙잡혔습니다. 숲 밖의 어느 마을에 병든 사람을 보러 갔다가, 그 집을 지키고 있던 병사들에게 붙잡힌 것입니다. 누가 알려 준 것이었습니다.`,
            `그 사람은 돈이 필요했습니다. 아이가 아팠기 때문입니다.`,
            `로빈은 나중에 그 사람을 원망하지 않았습니다. 나중에 리틀 존이 그 사람의 집을 찾아냈습니다. 그리고 로빈에게 어떻게 할지 물었습니다.`,
            `로빈이 말했습니다.<br>"그 집 아이가 나았는지 알아보고, 안 나았으면 약값을 두고 오게."`,
            `리틀 존은 그 말을 한참 알아듣지 못했습니다.`,
            `"그 사람이 나리를 팔았습니다."<br>"알아. 그런데 나라면 안 그랬을 거라고 말할 수 있나?"`,
            `리틀 존은 대답하지 못했습니다. 로빈은 노팅엄 성의 지하 감옥에 갇혔습니다. 처형은 사흘 뒤로 정해졌습니다.`,
            `이번에는 성주가 아주 조심했습니다. 성문을 다 닫고, 성 안에서 처형하기로 했습니다. 구경꾼도 들이지 않기로 했습니다.`,
            `숲에서는 밤새 회의가 열렸습니다.`,
            `"성벽을 넘읍시다."<br>"성벽이 열 자가 넘습니다."<br>"그럼 문으로 들어가야지요."<br>"문은 닫혔습니다."<br>그때 매리언이 말했습니다.<br>"열리는 문이 하나 있어."<br>"어디."<br>"부엌 뒷문. 새벽에 빵 수레가 들어가."<br>그리고 이렇게 덧붙였습니다.<br>"그리고 그 빵집 주인은 지난겨울에 우리한테 도움을 받은 사람이야."`,
            `사흘째 되는 날 새벽, 빵 수레가 성으로 들어갔습니다. 수레에는 밀가루 자루가 잔뜩 실려 있었습니다. 그 가운데 몇 자루 안에는 사람이 들어 있었습니다.`,
            `성 안에서 소란이 나기 시작했을 때, 성주는 아직 잠자리에 있었습니다. 일어나 보니 감옥 문이 열려 있었고, 성문 빗장이 안에서 풀려 있었습니다. 그리고 성 밖 언덕에서 뿔피리 소리가 났습니다.`,
            `성주는 창가에 서서 그 소리를 오래 들었습니다. 그러고는 창을 닫았습니다.`,
            `그날 성주는 왕에게 편지를 썼습니다. 이제 자기 힘으로는 안 되겠다는 편지였습니다. 성 안에서는 아무도 그 자루들을 뒤지지 않았습니다.`,
            `빵 수레는 이십 년째 그 문으로 들어오던 수레였습니다. 성문을 지키는 병사도 그 수레를 이십 년째 보고 있었습니다. 성주는 성벽을 높이고 문을 잠갔습니다. 그런데 이십 년 동안 아무도 의심하지 않은 것 하나를 잊었습니다.`
        ]
    },
    {
        num: 14,
        title: "숲에 온 손님",
        emoji: "👑",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `그 무렵 영국의 왕이 바뀌었습니다. 사자심왕 리처드가 전쟁에서 돌아온 것입니다. 그동안 나라를 맡고 있던 존 왕자가 여러 가지로 나라를 어지럽혀 놓았습니다.`,
            `노팅엄 성주도 그 사람 쪽 사람이었습니다. 왕은 노팅엄에 왔습니다. 그리고 로빈 훗 이야기를 들었습니다.`,
            `왕은 그 이야기를 다 듣고 나서 이렇게 말했습니다.<br>"그자를 한번 보고 싶군."`,
            `왕은 수사 옷을 빌려 입었습니다. 그리고 시종 몇을 데리고 숲길로 들어갔습니다. 얼마 가지 않아 리틀 존이 나타났습니다.`,
            `"주인께서 저녁을 대접하겠답니다."`,
            `왕은 웃으면서 따라갔습니다. 숲속 빈터에서 왕은 저녁을 대접받았습니다.`,
            `사슴 고기가 나왔습니다. 왕의 사슴이었습니다.`,
            `왕은 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 물었습니다.<br>"왕이 여기 오면 어떻게 하겠소?"<br>"왕께는 무릎을 꿇겠습니다. 왕이 없는 나라는 없으니까요."<br>밥을 먹으면서 왕이 물었습니다.<br>"왜 이런 짓을 하시오?"<br>로빈이 대답했습니다.<br>"저희는 사람을 해치지 않습니다. 여자와 아이는 건드리지 않고, 일하는 사람의 것은 손대지 않습니다."<br>"그래도 남의 것을 뺏는 것 아니오."<br>"그 사람들이 그 돈을 어떻게 얻었는지 물어보십시오."<br>왕이 물었습니다.<br>"그럼 그대는 재판관인가?"<br>"아닙니다."<br>"재판관도 아닌 자가 어떻게 남의 죄를 판단하는가?"`,
            `로빈은 잠깐 아무 말도 하지 못했습니다.`,
            `그러고는 이렇게 말했습니다.<br>"저희 고장에 재판이 있었으면 저희가 숲에 있지 않았을 것입니다."`,
            `왕은 그 말을 오래 생각했습니다. 그때 왕이 수사의 두건을 벗었습니다. 로빈은 그 얼굴을 알아보았습니다. 그리고 무릎을 꿇었습니다.`,
            `무리 전체가 함께 무릎을 꿇었습니다.`,
            `왕이 말했습니다.<br>"일어나시오."`,
            `그리고 로빈에게 죄를 사해 주었습니다. 무리 전체가 다시 사람 구실을 할 수 있게 된 것입니다. 노팅엄 성주는 그 자리를 잃었습니다.`,
            `그 자리에서 왕은 한 가지를 더 정했습니다. 숲에서 사슴을 잡았다는 이유로 목숨을 빼앗는 것을 그만두게 한 것입니다. 그것이 이 이야기에서 가장 크게 바뀐 일이었습니다.`,
            `화살 한 발보다 그 한 줄이 더 많은 사람을 살렸습니다.`
        ]
    },
    {
        num: 15,
        title: "마지막 화살",
        emoji: "🌳",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `그 뒤로 로빈은 왕을 따라 궁으로 갔습니다. 기사가 되었고, 매리언과 혼인했고, 좋은 옷을 입었습니다. 그런데 한 해를 못 채웠습니다.`,
            `궁에서 로빈은 자꾸 병이 났습니다. 밥맛이 없고 잠이 오지 않았습니다.`,
            `어느 날 로빈이 왕에게 청했습니다.<br>"한 이레만 숲에 다녀오게 해 주십시오."`,
            `왕은 허락했습니다. 로빈은 셔우드로 갔습니다. 숲에 들어서서 참나무 냄새를 맡는 순간, 로빈은 자기가 어디 사람인지 알았습니다.`,
            `로빈은 뿔피리를 불었습니다. 그러자 숲 여기저기에서 사람들이 나왔습니다. 다들 그동안 숲에 남아 있었던 것입니다.`,
            `로빈은 그 이레가 지나도 돌아가지 않았습니다. 그 뒤로 여러 해가 지났습니다. 그 여러 해가 로빈에게는 가장 좋은 시절이었습니다. 그러다 로빈이 늙고 병이 들었습니다.`,
            `그 무렵에는 피를 뽑아 병을 고친다고 믿었습니다. 로빈은 커클리스라는 수도원으로 갔습니다. 그 수도원의 원장이 먼 친척이었기 때문입니다.`,
            `리틀 존이 함께 갔습니다. 그런데 그 원장은 로빈을 좋아하지 않았습니다. 그 집안이 로빈 때문에 왕실에서 미움을 받았다고 여겼기 때문입니다.`,
            `원장은 피를 너무 많이 뽑았습니다. 로빈은 힘이 빠져 일어나지 못했습니다. 그제야 알아차리고 뿔피리를 불었습니다.`,
            `소리가 아주 약했습니다. 그런데 리틀 존이 그것을 들었습니다. 리틀 존은 문을 부수고 들어왔습니다.`,
            `"이 수도원을 다 태우겠습니다." 로빈이 그 팔을 잡았습니다.`,
            `"안 된다."<br>"왜요."<br>"나는 평생 여자를 해치지 않았다. 마지막에 그걸 깨뜨릴 수는 없다."`,
            `그리고 로빈은 창을 열어 달라고 했습니다. 창밖으로 숲이 보였습니다. 로빈은 활을 달라고 해서 화살을 하나 메겼습니다.`,
            `팔에 힘이 없어서 활이 거의 당겨지지 않았습니다. 그래도 쏘았습니다. 화살은 창밖으로 날아가 숲 언저리에 떨어졌습니다.`,
            `"저 화살이 떨어진 자리에 나를 묻어 다오."`,
            `사람들은 그렇게 했습니다. 그 뒤로 오랫동안 영국의 시골 사람들은 이 이야기를 노래로 불렀습니다. 밭에서 일하면서 부르고, 겨울밤에 불가에서 불렀습니다.`,
            `그 노래를 부르는 사람들도 대개 가난했습니다. 그래서 그 노래가 오래 남았습니다.`
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
                ${artFrame('cover.png', '🏹')}
            </div>
            <div class="story-page-right">
                <h1>로빈 훗의 모험</h1>
                <p class="cover-tag">하워드 파일 엮음</p>
                <p>왕의 사슴을 쏘았다는 이유로 하루아침에 법 밖으로 밀려난 열여덟 살 로빈이 셔우드 숲으로 들어갑니다.</p>
                <p>영국의 시골 사람들이 오백 년 넘게 입에서 입으로 전한 노래를 모은 이야기입니다. 힘없는 사람들이 무엇을 바랐는지가 그 안에 다 들어 있습니다.</p>
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
    { q: "로빈 훗이 무법자가 된 까닭은 무엇입니까?", choices: ["도둑질을 해서", "내기로 왕의 사슴을 쏘아서", "싸움을 해서"], answer: 1 },
    { q: "리틀 존이라는 이름은 어떻게 붙었습니까?", choices: ["키가 아주 작아서", "몸집이 아주 큰데 로빈이 반대로 지어서", "나이가 어려서"], answer: 1 },
    { q: "로빈과 리틀 존이 처음 겨룬 곳은 어디입니까?", choices: ["숲속 빈터", "개울 위 통나무 다리", "성문 앞"], answer: 1 },
    { q: "앨런 어 데일을 도운 일은 무엇입니까?", choices: ["빚을 갚아 준 일", "혼례를 뒤집어 준 일", "집을 지어 준 일"], answer: 1 },
    { q: "무리의 규칙이 아닌 것은 무엇입니까?", choices: ["여자와 아이는 건드리지 않는다", "일하는 사람의 것은 손대지 않는다", "지나가는 사람은 무조건 빼앗는다"], answer: 2 },
    { q: "리처드 오브 리 기사가 땅을 저당 잡힌 까닭은 무엇입니까?", choices: ["노름 빚", "아들이 저지른 일의 값을 치르느라", "세금"], answer: 1 },
    { q: "로빈이 기사에게 빌려주면서 보증을 요구했습니까?", choices: ["요구하지 않았다", "땅을 잡았다", "사람을 잡았다"], answer: 0 },
    { q: "성주가 활쏘기 대회를 연 진짜 까닭은 무엇입니까?", choices: ["잔치를 열려고", "로빈 훗을 잡으려고", "군사를 뽑으려고"], answer: 1 },
    { q: "로빈이 대회에서 쓴 방법은 무엇입니까?", choices: ["초록 옷을 입고 갔다", "변장을 하고 갔다", "가지 않았다"], answer: 1 },
    { q: "윌 스터틀리를 구할 때 병사들의 발밑에 화살을 쏜 까닭은 무엇입니까?", choices: ["빗맞아서", "맞히지 않고 멈추게 하려고", "화살이 모자라서"], answer: 1 },
    { q: "로빈이 푸줏간 장수로 변장해 고기를 판 방식은 무엇입니까?", choices: ["값을 똑같이 매겼다", "잘사는 사람에게는 비싸게, 가난한 사람에게는 거의 공짜로 팔았다", "다 공짜로 주었다"], answer: 1 },
    { q: "성주가 로빈에게 한 약속은 무엇입니까?", choices: ["세금을 낮춘다", "잡은 사람을 재판 없이 목매달지 않는다", "숲에 들어오지 않는다"], answer: 1 },
    { q: "매리언이 무리에서 맡은 가장 중요한 일은 무엇입니까?", choices: ["활쏘기", "노팅엄을 드나들며 소식을 알아 오는 일", "밥 짓기"], answer: 1 },
    { q: "로빈을 가둔 성에서 무리가 들어간 길은 어디입니까?", choices: ["성벽", "새벽에 들어가는 빵 수레", "지하 통로"], answer: 1 },
    { q: "숲에 수사 차림으로 찾아온 사람은 누구입니까?", choices: ["존 왕자", "리처드 왕", "수도원장"], answer: 1 },
    { q: "죽음을 앞둔 로빈이 리틀 존을 말린 까닭은 무엇입니까?", choices: ["소용없어서", "평생 여자를 해치지 않았는데 마지막에 그걸 깨뜨릴 수 없어서", "무서워서"], answer: 1 }
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
            ${artFrame('end.png', '🌳')}
            <h2>로빈 훗의 모험를 다 읽었습니다</h2>
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
