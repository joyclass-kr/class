const BOOK_TITLE = "돈키호테";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "책을 너무 많이 읽은 사람",
        emoji: "📚",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `에스파냐의 라만차라는 곳에 어느 시골 양반이 살았습니다. 이름은 알론소 키하노였습니다. 나이는 쉰 가까이 되었고, 몸이 마르고 얼굴이 길었습니다.`,
            `살림은 넉넉하지 않았습니다. 밭이 조금 있어서 그것으로 먹고살았습니다. 집에는 조카딸 하나와 살림하는 아주머니 하나가 있었습니다.`,
            `그 사람에게는 한 가지 취미가 있었습니다. 기사 이야기 책을 읽는 것이었습니다. 기사 이야기라는 것은 이런 것입니다.`,
            `갑옷을 입은 기사가 말을 타고 세상을 돌아다니면서, 거인을 무찌르고 마법사를 물리치고 어려움에 빠진 사람을 구해 줍니다. 그리고 그 모든 일을 자기가 사랑하는 여인에게 바칩니다.`,
            `당시 에스파냐에는 그런 책이 아주 많이 나와 있었습니다. 지금으로 치면 만화나 무협지 같은 것이었습니다. 그 책들은 대개 이렇게 시작했습니다.`,
            `어느 나라에 왕자가 하나 있었는데, 그 왕자가 갓난아기 때 버려져 이름 없이 자랍니다. 그러다 자라서 세상에 나가 거인을 무찌르고, 마침내 자기가 누구인지 알게 됩니다. 어느 책이나 비슷했습니다. 그런데 사람들은 그것을 계속 읽었습니다.`,
            `알론소 키하노는 그 책들을 사려고 밭을 팔았습니다. 한 뙈기, 두 뙈기 팔다가 나중에는 꽤 많이 팔았습니다. 그리고 밤을 새워 읽었습니다.`,
            `해가 뜨는 줄도 모르고 읽었고, 밥 먹는 것도 잊고 읽었습니다. 조카딸이 몇 번 말렸습니다.`,
            `"삼촌, 이제 그만 주무세요."<br>"조금만 더 보자. 이 기사가 지금 큰일을 당했다."<br>"그건 지어낸 이야기예요."<br>"지어낸 것이라도 당한 건 당한 것이다."`,
            `조카딸은 그 말에 대꾸하지 못했습니다. 그렇게 몇 해가 지나자, 그 사람의 머릿속에서 책과 세상이 뒤섞였습니다. 책에 나오는 일이 다 진짜로 있었던 일이라고 믿게 된 것입니다. 그리고 어느 날, 그 사람은 이런 생각을 했습니다.`,
            `'요즘 세상에는 왜 기사가 없을까.' '그럼 내가 하면 되지 않나.'`,
            `그때부터 그 사람은 준비를 시작했습니다. 먼저 다락에서 조상의 갑옷을 꺼냈습니다.`,
            `백 년쯤 된 것이라 녹이 슬어 있었습니다. 그것을 사흘 동안 닦았습니다.`,
            `투구는 얼굴 가리개가 없었습니다. 그래서 두꺼운 종이로 만들어 붙였습니다. 잘 붙었는지 보려고 칼로 쳐 보았더니 한 번에 부서졌습니다.`,
            `다시 만들었습니다. 이번에는 쇠막대를 안에 대고 만들었습니다.`,
            `그리고 이번에는 쳐 보지 않았습니다. 그다음은 말이었습니다. 그 집에는 늙고 마른 말이 한 마리 있었습니다.`,
            `갈비뼈가 다 드러나 보였고, 걸음이 느렸습니다. 그 말에게 이름을 지어 주는 데 나흘이 걸렸습니다.`,
            `로시난테라고 지었습니다. 예전에는 그저 말이었으나 이제는 세상에서 으뜸가는 말이라는 뜻이었습니다.`,
            `그다음은 자기 이름이었습니다. 이 일에는 여드레가 걸렸습니다. 그리고 정했습니다.`,
            `돈키호테 데 라만차. 라만차의 돈키호테라는 뜻이었습니다. 그 이름을 정하고 나서 그는 거울 앞에 섰습니다.`,
            `거울 속에 마르고 나이 든 사람이 갑옷을 입고 서 있었습니다. 그런데 그 사람 눈에는 그렇게 보이지 않았습니다. 그 눈에는 젊은 기사가 서 있었습니다.`,
            `그것이 이 이야기의 시작입니다.`
        ]
    },
    {
        num: 2,
        title: "둘시네아",
        emoji: "🌹",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `한 가지가 더 필요했습니다. 기사에게는 반드시 사랑하는 여인이 있어야 했습니다. 사랑하는 여인이 없는 기사는 잎이 없는 나무와 같다고 책에 적혀 있었기 때문입니다.`,
            `돈키호테는 한참 생각했습니다. 그러다 이웃 마을의 어느 농사꾼 딸을 떠올렸습니다. 그 여자의 이름은 알돈사 로렌소였습니다.`,
            `젊었을 때 몇 번 본 적이 있었습니다. 그런데 말을 걸어 본 적은 없었습니다. 그 여자는 돈키호테가 자기를 좋아하는 줄도 몰랐습니다.`,
            `평생 몰랐습니다. 그 여자는 밭일을 하는 사람이었습니다. 팔이 굵고 목소리가 크고, 밀을 까부르는 솜씨가 마을에서 제일이었습니다.`,
            `그런 사람이었습니다. 돈키호테는 그 사람에게 새 이름을 붙였습니다. 둘시네아 델 토보소.`,
            `토보소의 둘시네아라는 뜻이었습니다. 그렇게 준비가 끝났습니다. 칠월 어느 몹시 더운 날 새벽, 돈키호테는 아무에게도 말하지 않고 집을 나섰습니다.`,
            `갑옷을 입고, 창을 들고, 로시난테를 탔습니다. 들판으로 나섰을 때 그는 몹시 기뻤습니다. 그러다 갑자기 멈춰 섰습니다.`,
            `아주 큰일이 생각났기 때문입니다. 자기는 아직 정식 기사가 아니었습니다. 기사가 되려면 누가 정식으로 기사로 만들어 주는 의식을 치러야 했습니다.`,
            `'제일 먼저 만나는 성에서 부탁해야겠다.' 해가 질 무렵, 저 앞에 건물이 하나 보였습니다. 길가의 허름한 여관이었습니다. 그런데 돈키호테의 눈에는 그것이 성으로 보였습니다.`,
            `탑이 있고, 도개교가 있고, 해자가 있는 성이었습니다. 문 앞에 여자 둘이 서 있었습니다. 돈키호테는 그 앞에 말을 세우고 정중하게 인사했습니다.`,
            `여자들은 갑옷을 입은 깡마른 노인이 시를 읊는 것을 보고 웃음을 터뜨렸습니다. 돈키호테는 그것을 나쁘게 여기지 않았습니다. 돈키호테는 그 여자들에게 아주 정중한 말투를 썼습니다.`,
            `귀부인에게 하는 말투였습니다. 그 여자들은 평생 그런 말투를 들어 본 적이 없었습니다. 그래서 웃다가, 조금 뒤에는 웃음을 멈췄습니다.`,
            `그때 여관 주인이 나왔습니다. 여관 주인은 손님이 이상한 사람이라는 것을 곧 알아차렸습니다. 그런데 소란을 피우고 싶지 않았습니다. 그래서 맞장구를 쳐 주기로 했습니다.`,
            `"성주님, 저를 기사로 만들어 주십시오."<br>"그러지요."`,
            `그날 밤 돈키호테는 마당의 물통 옆에서 갑옷을 지키며 밤을 새웠습니다. 기사가 되기 전날 밤에 무기를 지키는 것이 규칙이었기 때문입니다. 새벽에 노새몰이꾼이 물을 먹이러 왔다가 그 갑옷을 치우려고 했습니다.`,
            `돈키호테는 창으로 그를 때려눕혔습니다. 여관 주인은 더 큰일이 나기 전에 서둘러 의식을 치렀습니다. 장부를 펴 놓고 아무 말이나 중얼거리고, 칼등으로 어깨를 두 번 쳤습니다.`,
            `그리고 이렇게 말했습니다.<br>"이제 기사가 되셨습니다. 어서 가십시오."`,
            `돈키호테는 여관 주인에게 깊이 고개를 숙였습니다.<br>"성주님, 이 은혜를 잊지 않겠습니다." 여관 주인은 손을 내저었습니다.`,
            `그러고는 문을 닫고 들어가 아내에게 이렇게 말했습니다.<br>"세상에 별사람이 다 있군."`,
            `그런데 그날 밤 여관 주인은 잠자리에 들면서 문득 이런 생각을 했습니다. 저 노인은 자기가 무엇을 하려는지 알고 있었습니다. 여관 주인은 자기가 무엇을 하려는지 오래전에 잊어버렸습니다.`
        ]
    },
    {
        num: 3,
        title: "첫 번째 출정",
        emoji: "🐴",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `돈키호테는 아주 만족해서 길을 떠났습니다. 얼마 가지 않아 숲에서 비명이 들렸습니다. 가 보니 어떤 농부가 나무에 소년을 묶어 놓고 때리고 있었습니다.`,
            `열대여섯 살쯤 된 양치기 소년이었습니다.`,
            `"무슨 일이냐!"<br>농부가 말했습니다.<br>"이놈이 양을 잃어버려서 벌을 주는 겁니다."<br>소년이 울면서 말했습니다.<br>"거짓말이에요! 저 사람이 아홉 달치 품삯을 안 줬어요! 달라고 하니까 때리는 거예요!"`,
            `돈키호테가 창을 들었습니다.<br>"당장 풀어 주고 품삯을 주어라." 농부는 겁을 먹고 그러겠다고 했습니다.`,
            `"지금은 돈이 없으니 집에 데려가서 주겠습니다."<br>"약속하겠느냐."<br>"약속합니다."`,
            `돈키호테는 아주 흐뭇해하며 떠났습니다. 자기가 세상의 잘못을 하나 바로잡았다고 생각했습니다. 돈키호테가 멀어지자 농부는 소년을 다시 나무에 묶었습니다. 그리고 아까보다 더 때렸습니다.`,
            `"이제 그 기사님을 불러 봐라."`,
            `이것이 이 이야기에서 여러 번 되풀이되는 일입니다. 돈키호테가 돕겠다고 나서면, 그 자리에서는 뭔가 해결된 것 같습니다. 그런데 돈키호테가 떠나고 나면 대개 더 나빠졌습니다.`,
            `그날 오후, 돈키호테는 상인 여섯 명을 만났습니다.`,
            `그는 길을 막고 이렇게 외쳤습니다.<br>"세상에서 둘시네아 델 토보소보다 아름다운 여인은 없다! 그렇다고 말하라!"`,
            `상인들은 어리둥절했습니다.`,
            `그 가운데 하나가 말했습니다.<br>"저희는 그분을 본 적이 없는데요. 초상화라도 보여 주시면······."<br>"보지 않고 믿는 것이 중요하다!"`,
            `그러고는 창을 겨누고 달려들었습니다. 그런데 로시난테가 돌에 걸려 넘어졌습니다. 돈키호테는 갑옷 무게 때문에 일어나지 못했습니다.`,
            `상인들의 하인 하나가 달려와 창을 빼앗아 부러뜨리고, 그 토막으로 돈키호테를 실컷 때렸습니다. 사람들은 그를 길에 두고 가 버렸습니다. 저녁에 같은 마을 사람이 그 길을 지나다가 돈키호테를 발견했습니다.`,
            `그는 돈키호테를 나귀에 실어 집으로 데려갔습니다.`
        ]
    },
    {
        num: 4,
        title: "책을 태우다",
        emoji: "🔥",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `집에서는 난리가 나 있었습니다. 조카딸과 아주머니가 사흘 동안 울고 있었습니다. 그리고 마을 신부와 이발사도 와 있었습니다.`,
            `두 사람은 돈키호테와 오래 알고 지낸 사이였습니다. 돈키호테를 눕히고 나서, 네 사람이 모여 의논했습니다.`,
            `"저 책들 때문입니다." 아주머니가 말했습니다.<br>"저것들을 다 태워야 합니다."`,
            `이튿날 아침, 네 사람이 서재에 들어갔습니다. 책이 백 권이 넘었습니다. 신부는 그것을 하나씩 넘겨 보았습니다. 그런데 이상한 일이 일어났습니다.`,
            `신부가 책을 넘기다가 자꾸 멈췄습니다.`,
            `"이건 잘 쓴 책인데. 이건 남깁시다."`,
            `"이것도 재미있게 읽었지. 이것도 남기고."`,
            `이발사도 마찬가지였습니다. 아주머니가 답답해했습니다.`,
            `"신부님, 태우러 오신 거 아닙니까."`,
            `결국 대부분은 마당에서 태웠습니다. 그리고 서재 문을 벽으로 막아 버렸습니다.`,
            `돈키호테가 깨어나서 서재를 찾자 아주머니가 말했습니다.<br>"마법사가 와서 방째로 가져갔습니다."<br>"그럴 줄 알았다." 돈키호테가 말했습니다.<br>"나를 시기하는 마법사가 있다."`,
            `그 뒤 보름 동안 돈키호테는 집에서 조용히 지냈습니다. 사람들은 이제 나았다고 생각했습니다. 그런데 그동안 돈키호테는 다른 준비를 하고 있었습니다.`,
            `기사에게는 시종이 하나 있어야 한다는 것을 알아낸 것입니다. 그래서 이웃에 사는 농부를 찾아갔습니다. 이름은 산초 판사였습니다.`,
            `배가 나오고 다리가 짧은 사람이었고, 아내와 아이가 둘 있었습니다. 가난했고, 글을 읽을 줄 몰랐고, 속담을 아주 많이 알았습니다.`,
            `돈키호테는 산초에게 이렇게 말했습니다.<br>"나와 함께 가자. 나중에 내가 섬을 하나 정복하면 너를 그 섬의 총독으로 삼겠다."`,
            `산초는 그 말을 들었습니다. 그리고 이렇게 생각했습니다. '섬이라······.'`,
            `산초는 그 말을 반쯤 믿었습니다. 아주 믿은 것은 아니었습니다. 그런데 반쯤 믿은 것만으로도 집을 나서기에는 충분했습니다.`,
            `어느 밤, 두 사람은 마을을 빠져나갔습니다. 돈키호테는 로시난테를 탔고, 산초는 자기 나귀를 탔습니다.`
        ]
    },
    {
        num: 5,
        title: "풍차",
        emoji: "🌬️",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `들판을 가는데 저 앞에 풍차가 서른 개쯤 서 있었습니다. 밀을 빻는 풍차였습니다. 날개가 아주 크고, 바람이 불면 그것이 천천히 돌았습니다.`,
            `돈키호테가 그것을 보고 말했습니다.<br>"산초야, 하늘이 우리를 돕는구나. 저기 거인이 서른 명 있다."`,
            `산초가 눈을 가늘게 떴습니다.`,
            `"어디요?"<br>"저기 팔이 긴 것들 말이다."<br>"나리, 저건 풍차인데요."<br>"싸움을 모르는 자는 그렇게 보이는 법이다."`,
            `그리고 돈키호테는 창을 옆구리에 끼고 달려갔습니다.`,
            `산초가 뒤에서 소리쳤습니다.<br>"풍차라니까요!"`,
            `돈키호테는 듣지 않았습니다. 그는 첫 번째 풍차의 날개에 창을 찔러 넣었습니다.`,
            `그때 바람이 불었습니다. 날개가 돌면서 창이 부러졌습니다. 그리고 사람과 말이 함께 공중으로 들려 올라갔다가 들판으로 굴러떨어졌습니다.`,
            `산초가 나귀를 몰아 달려갔습니다. 돈키호테는 움직이지 못했습니다.`,
            `"제가 풍차라고 했잖습니까."<br>"산초야, 이건 마법이다."<br>"또 마법입니까?"<br>"나를 시기하는 마법사가 있다. 그자가 내 명예를 빼앗으려고 거인을 풍차로 바꾼 것이다."`,
            `산초는 아무 말도 하지 않았습니다. 대꾸해 봐야 소용이 없다는 것을 그때 처음 알았습니다.`,
            `이 대목이 이 책에서 가장 유명한 대목입니다.`,
            `사람들은 이것을 두고 여러 가지 이야기를 합니다. 어리석은 사람의 이야기라고 하는 사람도 있고, 세상이 알아주지 않아도 자기가 옳다고 믿는 것을 하는 사람의 이야기라고 하는 사람도 있습니다.`,
            `이 책은 그 두 가지를 다 담고 있습니다.`,
            `그날 밤 두 사람은 나무 아래에서 잤습니다. 돈키호테는 아파서 잠을 못 잤습니다. 그런데 기사는 아프다고 신음하면 안 된다고 책에 적혀 있어서 참았습니다.`,
            `산초는 옆에서 아주 잘 잤습니다. 산초는 배가 부르면 어디서든 잘 잤습니다.`,
            `아침에 돈키호테가 말했습니다.<br>"기사는 하루쯤 굶어도 된다."<br>"저는 기사가 아니니까 먹겠습니다."`,
            `산초는 자루에서 빵과 양파를 꺼내 먹었습니다.`
        ]
    },
    {
        num: 6,
        title: "양 떼",
        emoji: "🐑",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `며칠 뒤, 들판 저편에서 흙먼지가 크게 일었습니다. 돈키호테가 등자를 딛고 일어섰습니다.`,
            `"산초야, 오늘이 내 인생에서 가장 큰 날이다."<br>"왜요?"<br>"저기 군대가 둘 온다. 곧 큰 싸움이 벌어질 것이다."`,
            `산초가 보니 양 떼였습니다. 양치기들이 양을 몰고 가는 것이었습니다.`,
            `"나리, 저건 양인데요."<br>"잘 보아라. 저기 오른쪽에 오는 것이 알리판파론 황제의 군대다. 그 옆에 노란 갑옷을 입은 자는······."`,
            `돈키호테는 사람마다 이름을 붙여 가며 설명했습니다. 이름이 삼십 개도 넘었습니다. 그런데 그것을 다 어디서 알았을까요.`,
            `다 책에서 읽은 것이었습니다. 산초는 눈을 비비고 다시 보았습니다. 아무리 보아도 양이었습니다.`,
            `"나리, 저는 양 우는 소리밖에 안 들립니다."<br>"두려워서 그렇다."`,
            `그리고 돈키호테는 양 떼 속으로 달려 들어갔습니다. 그리고 창으로 양을 여러 마리 찔렀습니다. 양치기들이 소리를 질렀습니다. 그러다 돌팔매를 꺼냈습니다.`,
            `양치기들은 돌 던지는 솜씨가 아주 좋았습니다. 돌 하나가 돈키호테의 옆구리에 맞았습니다. 또 하나가 얼굴에 맞아 이가 몇 개 부러졌습니다.`,
            `돈키호테는 말에서 굴러떨어졌습니다. 양치기들은 죽은 줄 알고 양을 몰아 달아났습니다. 산초가 달려왔습니다.`,
            `"나리, 괜찮으십니까." 돈키호테가 입에서 부러진 이를 뱉었습니다.`,
            `"산초야, 이것도 마법사 짓이다. 그자가 군대를 양으로 바꾼 것이다."`,
            `"나리."<br>"왜."<br>"제 눈에는 처음부터 양이었습니다."`,
            `돈키호테는 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"산초야, 마법사는 네 눈은 안 건드린 모양이구나."`,
            `산초는 그 말이 무슨 뜻인지 한참 생각했습니다. 그리고 결국 알아내지 못했습니다.`
        ]
    },
    {
        num: 7,
        title: "황금 투구",
        emoji: "🪖",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `어느 날 비가 오고 있었습니다. 길 저쪽에서 사람 하나가 나귀를 타고 오는 것이 보였습니다. 머리에 무언가 번쩍이는 것을 얹고 있었습니다.`,
            `"산초야! 저기 황금 투구가 온다!"`,
            `"저건 이발사인데요. 놋대야를 머리에 얹었네요. 비 맞기 싫어서요."`,
            `"저것은 맘브리노의 투구다. 책에서 읽었다."`,
            `돈키호테는 창을 겨누고 달려갔습니다. 이발사는 그것을 보고 나귀에서 뛰어내려 들판으로 달아났습니다. 놋대야가 땅에 떨어졌습니다.`,
            `돈키호테는 그것을 주워 머리에 썼습니다. 가운데가 움푹하고 가장자리가 넓은 놋대야였습니다. 쓰고 보니 얼굴이 반쯤 가려졌습니다.`,
            `"이건 아주 좋은 투구다. 다만 어느 거인이 자기 머리에 맞게 고쳐 쓴 모양이구나."`,
            `산초는 웃음을 참느라 애를 썼습니다. 돈키호테는 그 뒤로 그 놋대야를 계속 쓰고 다녔습니다. 사람들이 그를 보고 다 웃었습니다.`,
            `돈키호테는 그것을 자기를 부러워하는 것이라고 여겼습니다. 길에서 만난 아이들이 뒤를 따라오며 소리를 질렀습니다. 어른들은 문간에 나와서 구경했습니다.`,
            `개들도 짖었습니다. 그런데 산초는 조금 달랐습니다. 산초는 그것이 놋대야라는 것을 알고 있었습니다. 그런데 사람들이 나리를 보고 웃으면 기분이 좋지 않았습니다.`,
            `왜 그런지는 산초도 잘 몰랐습니다.`,
            `그날 밤 산초가 물었습니다.<br>"나리, 왜 이러고 다니십니까."<br>"무슨 말이냐."<br>"집에 밭도 있고 조카딸도 있는데, 왜 얻어맞으면서 다니십니까."<br>돈키호테는 한참 있다가 대답했습니다.<br>"산초야, 세상에는 두 가지 사람이 있다. 세상을 있는 그대로 두는 사람과, 조금이라도 낫게 하려는 사람이다."<br>"저는 앞쪽인 것 같습니다."<br>"너는 아직 모른다."`,
            `산초는 그 말을 오래 기억했습니다. 나중에 이 이야기가 다 끝난 뒤에도 기억했습니다.`,
            `그 뒤로 산초는 사람들이 웃을 때마다 나리보다 앞에 서서 걸었습니다. 왜 그러는지는 스스로도 설명하지 못했습니다.`
        ]
    },
    {
        num: 8,
        title: "죄수들",
        emoji: "⛓️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `며칠 뒤, 길에서 이상한 행렬을 만났습니다. 사람 열둘이 목에 쇠사슬로 줄줄이 엮여 걸어오고 있었습니다. 그 옆에 총을 든 사람 둘이 따라오고 있었습니다.`,
            `왕의 갤리선으로 끌려가는 죄수들이었습니다. 갤리선은 노를 젓는 배인데, 그 노를 젓는 일은 아주 고된 일이었습니다.`,
            `돈키호테가 죄수들에게 하나씩 물었습니다.<br>"당신은 무슨 일로 가시오?"`,
            `첫 번째 사람이 말했습니다.<br>"사랑에 빠져서요."<br>"사랑이 죄요?"<br>"남의 빨래 바구니를 너무 사랑했지요."`,
            `두 번째 사람은 노래를 잘못 불러서 간다고 했습니다. 그것은 고문을 못 이겨 자백했다는 뜻이었습니다. 세 번째 사람은 돈이 십 두카트만 있었으면 안 갔을 거라고 했습니다.`,
            `그 돈으로 관리에게 손을 썼으면 됐을 거라는 뜻이었습니다.`,
            `돈키호테는 그 이야기를 다 듣고 나서 호송하는 사람들에게 말했습니다.<br>"이 사람들을 풀어 주시오."<br>"뭐라고요?"<br>"사람이 사람을 사슬에 묶어 끌고 가는 것은 옳지 않소."<br>"이건 왕의 명령입니다."<br>"나는 하늘의 명령을 받았소."`,
            `그리고 돈키호테는 창을 겨누고 달려들었습니다. 이번에는 이겼습니다. 호송하는 사람들이 놀라 달아났고, 죄수들은 사슬을 끊었습니다.`,
            `돈키호테는 아주 흡족했습니다.`,
            `그리고 죄수들에게 이렇게 말했습니다.<br>"이제 여러분은 자유요. 다만 한 가지 부탁이 있소. 토보소에 가서 둘시네아 부인께 이 일을 알려 주시오."`,
            `죄수들은 서로 얼굴을 보았습니다.`,
            `그 가운데 제일 무서운 사람이 말했습니다.<br>"우리는 지금 도망쳐야 합니다. 그런 데 갈 시간이 어디 있습니까."<br>"가라고 했다."<br>"이 영감이 정말."`,
            `그러고는 돌을 집어 던졌습니다. 열두 명이 다 던졌습니다. 돈키호테와 산초는 돌을 맞고 쓰러졌습니다.`,
            `죄수들은 두 사람의 겉옷까지 벗겨 가지고 달아났습니다.`,
            `산초는 팬티 바람으로 앉아서 말했습니다.<br>"나리, 좋은 일 하시는 건 알겠는데요."<br>"······."<br>"좋은 일을 할 상대를 좀 고르시면 안 됩니까."`
        ]
    },
    {
        num: 9,
        title: "산속의 편지",
        emoji: "✉️",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `두 사람은 시에라 모레나라는 산으로 들어갔습니다. 죄수를 풀어 준 일 때문에 관리들이 찾고 있었기 때문입니다. 산속에서 돈키호테는 새로운 생각을 했습니다.`,
            `"산초야, 나는 여기 남아 미쳐 보겠다."<br>"이미······ 아닙니다."<br>"기사 이야기에 보면, 훌륭한 기사들은 사랑하는 여인 때문에 산에 들어가 미친 짓을 한다. 나도 해야 한다."<br>"꼭 해야 합니까?"<br>"규칙이다."`,
            `그래서 돈키호테는 옷을 벗고 바위 사이를 뛰어다니고, 나무에 시를 새기고, 공중제비를 돌았습니다. 그리고 산초에게 편지를 하나 써 주었습니다. 둘시네아에게 보내는 편지였습니다.`,
            `"이것을 토보소에 가서 전해라."`,
            `산초는 산을 내려갔습니다. 그런데 가는 길에 그 편지를 잃어버렸습니다. 산초는 글을 읽을 줄 몰랐으므로 외울 수도 없었습니다.`,
            `산초는 잠깐 고민했습니다. 그러고는 이렇게 하기로 했습니다. 그냥 안 가는 것이었습니다.`,
            `가서 전했다고 하면 되는 일이었습니다. 산초는 그날 여관에 들었습니다. 그 여관에서 마을 신부와 이발사를 만났습니다.`,
            `두 사람은 돈키호테를 찾으러 나온 참이었습니다. 산초가 사정을 다 이야기했습니다.`,
            `신부가 말했습니다.<br>"어떻게든 집으로 데려가야 합니다."<br>"그냥 가자고 하면 안 갑니다."<br>"그럼 속여야지요."`,
            `신부와 이발사는 계획을 짰습니다. 여관에서 옷을 빌려 변장을 하고, 곤경에 빠진 공주 행세를 하기로 한 것입니다. 그 공주가 돈키호테에게 도움을 청하면, 돈키호테는 반드시 따라나설 것이었습니다.`,
            `산초는 그 계획을 듣고 마음이 편치 않았습니다. 그런데 반대하지 않았습니다. 나리가 자꾸 얻어맞는 것을 보는 것이 힘들었기 때문입니다.`
        ]
    },
    {
        num: 10,
        title: "우리에 실려 돌아오다",
        emoji: "🚚",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `계획은 잘되었습니다. 돈키호테는 공주를 돕겠다고 산에서 내려왔습니다. 그런데 오는 길에 여러 가지 일이 있었습니다.`,
            `여관에서 술 부대를 거인이라고 여기고 칼로 다 찢어 놓기도 했습니다. 포도주가 방바닥에 흘러넘쳤는데, 돈키호테는 그것을 거인의 피라고 했습니다. 그 여관에는 그날 손님이 여럿 들어 있었습니다.`,
            `다들 방에서 뛰어나와 그 광경을 보았습니다. 방바닥이 온통 붉었고, 찢어진 가죽 부대가 여기저기 널려 있었습니다. 돈키호테는 칼을 든 채 잠옷 바람으로 서 있었습니다.`,
            `눈을 뜨고 있었지만 아직 꿈속에 있었습니다. 여관 주인이 값을 물어내라고 소리를 질렀습니다. 그런데 돈키호테는 기사는 여관비를 내지 않는다고 했습니다.`,
            `그것도 책에 적혀 있었기 때문입니다. 결국 신부가 대신 값을 치렀습니다. 신부와 이발사는 결국 다른 방법을 썼습니다.`,
            `밤에 돈키호테가 잠든 사이에 손발을 묶고, 나무 우리를 짜서 그 안에 넣고, 소달구지에 실은 것입니다.`,
            `깨어난 돈키호테가 소리쳤습니다.<br>"이게 무슨 일이냐!"<br>"마법에 걸리신 겁니다." 이발사가 목소리를 바꿔 말했습니다.<br>"이대로 계시면 곧 풀립니다."`,
            `돈키호테는 그 말을 믿었습니다. 그리고 얌전히 있었습니다.`,
            `우리 안에서 돈키호테는 산초에게 이렇게 물었습니다.<br>"산초야, 마법에 걸린 기사가 소달구지에 실려 가는 이야기를 읽은 적이 있느냐."<br>"저는 글을 못 읽습니다, 나리."<br>"나도 읽은 적이 없다. 마법도 요즘은 방식이 달라졌나 보구나."`,
            `산초는 그 말에 아무 대꾸도 하지 못했습니다. 나리가 알아채신 것 같았기 때문입니다. 그런데 돈키호테는 그 뒤로 아무 말도 하지 않았습니다.`,
            `소달구지는 엿새 걸려 마을에 닿았습니다. 마을 사람들이 다 나와서 그것을 구경했습니다. 조카딸과 아주머니가 울면서 뛰어나왔습니다.`,
            `돈키호테는 자기 침대에 눕혀졌습니다. 그리고 한 달을 앓았습니다. 산초는 집으로 돌아갔습니다.`,
            `산초의 아내가 물었습니다.<br>"섬은 어떻게 됐어요?"<br>"아직."<br>"뭘 벌어 왔어요?"<br>"······."<br>"그럼 뭘 하고 온 거예요?"`,
            `산초는 대답하지 못했습니다. 그런데 산초는 그 몇 달을 후회하지 않았습니다. 그것이 스스로도 이상했습니다.`,
            `그해 겨울에 산초는 밭에 나가 일했습니다. 그리고 일하다가 자꾸 먼 데를 보았습니다.`,
            `아내가 그것을 보고 말했습니다.<br>"또 그 영감 생각해요?"<br>"아니."`,
            `산초는 그렇게 대답하고 다시 밭을 팠습니다.`
        ]
    },
    {
        num: 11,
        title: "두 번째 출정",
        emoji: "🛤️",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `한 달이 지나자 돈키호테가 일어났습니다.`,
            `그리고 산초를 불렀습니다.<br>"산초야, 다시 가자."<br>"나리, 저는 이제······."<br>"섬을 잊었느냐."`,
            `산초는 그날 저녁에 짐을 쌌습니다. 이번에는 토보소로 먼저 갔습니다. 돈키호테가 둘시네아를 직접 만나겠다고 했기 때문입니다.`,
            `산초는 큰일이 났습니다. 산초는 그 여자를 만난 적이 없었습니다. 지난번에 편지도 전하지 않았습니다.`,
            `토보소 마을 앞에서 산초가 말했습니다.<br>"나리, 여기서 기다리십시오. 제가 모셔 오겠습니다."`,
            `산초는 길가에 앉아서 한참 생각했습니다. 그러다 시골 처녀 셋이 나귀를 타고 지나가는 것을 보았습니다. 산초는 뛰어가서 돈키호테를 데려왔습니다.`,
            `"나리! 저기 둘시네아 부인이 오십니다! 시녀 둘을 데리고요!"`,
            `돈키호테가 보았습니다. 볕에 그은 시골 처녀 셋이 나귀를 타고 오고 있었습니다. 옷은 낡았고, 한 사람은 마늘 냄새가 났습니다.`,
            `"산초야, 저건 시골 처녀들 아니냐."<br>"나리, 눈이 어떻게 되셨습니까? 저 아름다운 얼굴이 안 보이십니까?"`,
            `돈키호테는 무릎을 꿇었습니다. 그리고 정중하게 인사했습니다. 처녀가 소리를 질렀습니다.`,
            `"비켜요! 길 막지 말고!"`,
            `그러고는 나귀를 몰아 지나갔습니다. 돈키호테는 한참 그 자리에 무릎을 꿇고 있었습니다.`,
            `그러고는 이렇게 말했습니다.<br>"마법사가 그분을 저렇게 바꿔 놓았구나."`,
            `여기서 두 사람의 자리가 처음으로 바뀌었습니다. 그전까지는 돈키호테가 헛것을 보고 산초가 사실을 말했습니다.`,
            `이번에는 산초가 헛것을 만들어 냈고 돈키호테가 사실을 보았습니다. 그런데 돈키호테는 산초의 말을 믿기로 했습니다.`,
            `그 뒤로 돈키호테는 그 일을 계속 마음에 두었습니다. 둘시네아의 마법을 풀어야 한다는 것이 그의 새로운 목표가 되었습니다.`
        ]
    },
    {
        num: 12,
        title: "공작의 성",
        emoji: "🏰",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그해 여름, 두 사람은 어느 공작 부부를 만났습니다. 공작 부부는 아주 부자였고, 아주 심심했습니다. 그런데 그 부부는 돈키호테의 이야기를 이미 알고 있었습니다.`,
            `그 무렵 돈키호테의 첫 번째 여행을 적은 책이 나와서 널리 읽히고 있었기 때문입니다.`,
            `공작 부인이 말했습니다.<br>"저분을 우리 성으로 모십시다. 재미있겠어요."`,
            `두 사람은 성으로 초대받았습니다. 돈키호테는 태어나서 처음으로 진짜 성에 들어갔습니다. 그리고 처음으로 사람들이 자기를 기사로 대접해 주는 것을 경험했습니다.`,
            `하인들이 줄을 서서 절을 했고, 시녀들이 물을 받쳐 손을 씻겨 주었습니다. 돈키호테는 몹시 감격했습니다. 산초도 좋은 옷을 얻어 입고 잘 먹었습니다. 그런데 그것이 다 꾸민 일이었습니다.`,
            `공작 부부는 하인들에게 미리 시켜 두었습니다. 저 노인이 무슨 말을 하든 진지하게 받아 주라고요. 그리고 그 노인이 어떻게 하는지 보면서 웃자고요.`,
            `그 사람들은 여러 가지 장난을 꾸몄습니다. 수염 난 시녀들이 나타나 마법에 걸렸다고 울며 도움을 청했고, 나무로 만든 말을 타면 하늘을 난다고 속였습니다. 돈키호테는 눈을 가리고 나무 말에 올라탔습니다.`,
            `하인들이 옆에서 풀무로 바람을 불었습니다.`,
            `"산초야, 우리가 지금 아주 높이 올라왔구나."<br>"저는 무섭습니다, 나리."`,
            `사람들이 뒤에서 웃음을 참느라 배를 잡았습니다. 이 대목을 읽으면 웃음이 나옵니다. 그런데 웃다가 문득 이상해집니다.`,
            `그전까지 돈키호테를 때린 사람들은 화가 나서 때린 것이었습니다. 양치기들은 자기 양을 지키려고 돌을 던졌고, 죄수들은 도망치려고 돌을 던졌습니다. 그런데 공작 부부는 아무 이유도 없었습니다.`,
            `그저 심심해서였습니다. 산초는 그것을 어렴풋이 느꼈습니다. 그리고 밤에 잠이 오지 않았습니다.`
        ]
    },
    {
        num: 13,
        title: "산초의 섬",
        emoji: "⚖️",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `공작은 장난을 하나 더 준비했습니다. 산초에게 섬을 하나 주기로 한 것입니다. 진짜 섬이 아니라, 공작이 가진 작은 마을 하나였습니다.`,
            `바다도 없는 내륙의 마을이었습니다. 이름을 바라타리아 섬이라고 붙였습니다. 공작은 그 마을 사람들에게 미리 시켜 두었습니다.`,
            `저 뚱뚱한 농부를 총독이라고 부르고, 어려운 문제를 잔뜩 가져가서 쩔쩔매는 것을 보고 웃자고요. 산초가 총독이 되어 마을로 갔습니다. 떠나기 전에 돈키호테가 산초를 앉혀 놓고 오래 이야기했습니다.`,
            `"산초야, 사람을 다스리게 되었으니 몇 가지를 일러 주겠다."<br>"말씀하십시오."<br>"먼저 너 자신을 알아라. 네가 농부의 아들이라는 것을 잊지 마라. 그것을 부끄러워하지도 말고, 감추지도 마라."<br>"눈물이 나면 죄인 쪽으로 기울어라. 다만 법을 어기지는 마라."<br>"부자의 말과 가난한 사람의 말을 똑같이 들어라. 가난한 사람의 말은 대개 짧고 서툴러서 지기 쉽다."<br>"그리고 뇌물을 받지 마라."<br>"나리, 그건 걱정 마십시오. 저는 남의 것에 손대 본 적이 없습니다."<br>"안다."<br>"그런데 나리, 하나 여쭙겠습니다. 제가 총독 노릇을 잘 못하면 어떻게 됩니까?"<br>"그만두면 된다."<br>"그만두어도 됩니까?"<br>"잘 못하는 자리에 앉아 있는 것이 더 나쁘다."`,
            `산초는 그 말을 마음에 새겼습니다. 산초는 그 말을 다 들었습니다. 그리고 총독이 되었습니다. 그런데 아주 이상한 일이 일어났습니다.`,
            `사람들이 어려운 문제를 가져오면 산초가 다 풀어 버린 것입니다. 한번은 이런 일이 있었습니다. 어떤 여자가 남자 하나를 끌고 와서 그 사람이 자기 돈주머니를 빼앗았다고 했습니다.`,
            `남자는 아니라고 했습니다. 산초는 남자에게 돈주머니를 여자에게 주라고 했습니다. 여자는 그것을 받아 꼭 안고 나갔습니다.`,
            `그러자 산초가 남자에게 말했습니다.<br>"쫓아가서 뺏어 오시오."`,
            `남자가 쫓아가 뺏으려고 했습니다. 그런데 여자가 어찌나 세게 쥐고 버티는지 남자가 뺏지 못했습니다.`,
            `산초가 말했습니다.<br>"이 사람은 저렇게 붙들고 안 놓는 사람이오. 이 사람이 아까 진짜로 빼앗겼다면 그 자리에서 안 놓았을 거요. 거짓말이오."`,
            `여자는 결국 사실을 털어놓았습니다. 그런 일이 여러 번 있었습니다. 마을 사람들은 웃으려고 모였다가 감탄하며 돌아갔습니다.`,
            `산초는 글을 읽을 줄 몰랐습니다. 그런데 사람은 아주 잘 읽었습니다. 열흘째 되는 날, 산초는 총독을 그만두겠다고 했습니다.`,
            `"왜 그만두려고 하나." 공작의 사람이 물었습니다.`,
            `"밥을 못 먹어서요. 저기 의사가 붙어서 다 못 먹게 합니다."`,
            `그러고는 이렇게 말했습니다.<br>"그리고 저는 총독보다 나귀 타는 게 낫습니다. 저는 제가 뭘 못하는지 아는데, 여기 사람들은 그걸 몰라서 자꾸 시킵니다."`,
            `산초는 처음 왔을 때 입고 온 옷을 도로 입고 나귀를 타고 나갔습니다. 가진 것은 하나도 늘지 않았습니다.`
        ]
    },
    {
        num: 14,
        title: "흰 달의 기사",
        emoji: "🌙",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `그 뒤 두 사람은 바르셀로나까지 갔습니다. 돈키호테는 거기서 처음으로 바다를 보았습니다. 그리고 어느 아침, 바닷가 모래밭에서 기사 하나가 나타났습니다.`,
            `갑옷에 흰 달이 그려져 있었습니다.`,
            `"나는 흰 달의 기사다. 돈키호테여, 나와 겨루자."`,
            `"좋다."<br>"조건이 있다. 내가 이기면 그대는 고향으로 돌아가 한 해 동안 무기를 들지 않는다."<br>"그대가 지면?"<br>"내 모든 것을 그대에게 주겠다."`,
            `돈키호테가 창을 들었습니다. 두 사람이 달렸습니다. 그런데 상대는 젊고 튼튼했고 좋은 말을 타고 있었습니다.`,
            `돈키호테는 첫 번째 부딪침에서 말과 함께 나가떨어졌습니다. 흰 달의 기사가 창끝을 그 목에 댔습니다.`,
            `"졌다고 하라."`,
            `돈키호테는 투구 안에서 말했습니다. 목소리가 아주 작았습니다.`,
            `"둘시네아 델 토보소는 세상에서 가장 아름다운 여인이고, 나는 세상에서 가장 못난 기사다. 이 목숨을 가져가라. 다만 그 말은 못 한다."`,
            `흰 달의 기사는 잠깐 아무 말도 하지 않았습니다. 그리고 창을 거두었습니다.`,
            `"그것으로 됐다. 약속만 지키시오."`,
            `그러고는 돌아갔습니다. 그 사람은 산손 카라스코라는 젊은이였습니다. 돈키호테의 마을 사람이었고, 대학에서 공부한 사람이었습니다.`,
            `그는 돈키호테를 집으로 데려가려고 기사로 변장한 것이었습니다. 산초가 달려와 돈키호테를 일으켰습니다. 돈키호테는 엿새 동안 자리에서 일어나지 못했습니다.`,
            `일어나서는 이렇게 말했습니다.<br>"산초야, 집으로 가자."`,
            `가는 길에 돈키호테는 말이 없었습니다. 산초가 이런저런 이야기를 해도 대답하지 않았습니다.`,
            `한번은 산초가 이렇게 말했습니다.<br>"나리, 지는 건 흔한 일입니다. 오늘 진 사람이 내일 이기고요."<br>"산초야."<br>"예."<br>"나는 지금 처음으로 세상이 제대로 보인다."`,
            `산초는 그 말이 반갑지 않았습니다. 왜 그런지는 몰랐습니다.`
        ]
    },
    {
        num: 15,
        title: "알론소 키하노",
        emoji: "🕊️",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `두 사람은 마을에 돌아왔습니다. 돈키호테는 집에 들어가 자리에 누웠습니다. 그리고 엿새 동안 열이 났습니다.`,
            `신부와 이발사와 산손 카라스코가 번갈아 곁을 지켰습니다. 이레째 되는 날 아침, 돈키호테가 눈을 떴습니다.`,
            `그리고 아주 맑은 목소리로 말했습니다.<br>"고맙습니다. 이제 정신이 듭니다."`,
            `사람들이 놀랐습니다.`,
            `"나는 이제 돈키호테가 아닙니다. 나는 알론소 키하노입니다."`,
            `"그 책들 때문에 내 머리가 흐려졌던 것입니다. 이제 다 걷혔습니다."`,
            `"다만 너무 늦게 걷혔군요." 조카딸이 울었습니다.`,
            `"삼촌, 그런 말씀 마세요. 이제 나으셨으니 다시 나가시면 되잖아요."`,
            `"이제는 못 나간다."`,
            `그러고 나서 그는 공증인을 불러 유언을 적게 했습니다. 조카딸에게 재산을 남기고, 아주머니에게 그동안의 품삯을 다 셈해 주라고 했습니다. 그리고 산초에 대해서도 적었습니다.`,
            `산초가 자기 밑에서 일한 삯을 셈해 주라고 하고, 이렇게 덧붙였습니다.<br>"내가 정신이 흐렸을 때 저 사람에게 섬을 주겠다고 했는데, 그것을 지키지 못했다. 그것이 마음에 걸린다."`,
            `산초가 침대 옆에 앉아 있었습니다.`,
            `그리고 이렇게 말했습니다.<br>"나리, 그러지 마십시오."<br>"산초야."<br>"저는 섬 때문에 따라다닌 게 아닙니다."`,
            `돈키호테가 산초를 보았습니다.<br>"그럼 왜 따라다녔느냐." 산초는 대답하지 못했습니다.`,
            `그러다 이렇게 말했습니다.<br>"나리, 지지 마십시오. 일어나서 다시 가십시다. 이번에는 제가 양치기라도 하겠습니다. 나리는 미치신 게 아니었습니다."<br>"산초야, 나는 미쳤었다."<br>"그래도요."<br>"그래도 뭐냐."<br>산초는 울면서 말했습니다.<br>"그래도 나리 옆에 있는 동안 저는 제가 괜찮은 사람 같았습니다."`,
            `돈키호테는 그 말을 듣고 웃었습니다. 그리고 그날 오후에 세상을 떠났습니다. 사람들은 그 무덤 앞에 이렇게 적었다고 합니다.`,
            `살아서는 미친 사람이었고, 죽어서는 제정신이었다고요. 그런데 그 마을에서는 그 뒤로도 오랫동안 이런 이야기가 돌았습니다.`,
            `그 노인이 나무에 창을 겨누고 달려간 뒤로, 그 마을의 농부 하나가 사람을 판단할 때 옷을 보지 않게 되었다고요. 그 농부의 이름은 산초 판사였습니다.`
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
                ${artFrame('cover.png', '🌬️')}
            </div>
            <div class="story-page-right">
                <h1>돈키호테</h1>
                <p class="cover-tag">미겔 데 세르반테스 원작</p>
                <p>기사 이야기 책을 너무 많이 읽은 시골 양반이 녹슨 갑옷을 꺼내 입고 늙은 말에 올라 세상으로 나갑니다. 풍차를 거인으로 보고 창을 겨눕니다.</p>
                <p>웃다가 어느 순간부터 웃기 어려워지는 이야기입니다. 그리고 그 옆에서 사실을 말해 주던 시종 산초 판사가 조금씩 달라지는 이야기이기도 합니다.</p>
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
    { q: "알론소 키하노가 밭을 판 까닭은 무엇입니까?", choices: ["빚을 갚으려고", "기사 이야기 책을 사려고", "말을 사려고"], answer: 1 },
    { q: "돈키호테가 자기 말에게 붙인 이름은 무엇입니까?", choices: ["로시난테", "둘시네아", "바라타리아"], answer: 0 },
    { q: "둘시네아는 실제로 어떤 사람입니까?", choices: ["공주", "이웃 마을 농사꾼의 딸", "지어낸 사람"], answer: 1 },
    { q: "돈키호테를 기사로 만들어 준 사람은 누구입니까?", choices: ["왕", "여관 주인", "신부"], answer: 1 },
    { q: "돈키호테가 매 맞던 양치기 소년을 구해 준 뒤에 벌어진 일은 무엇입니까?", choices: ["소년이 품삯을 받았다", "돈키호테가 떠나자 더 심하게 맞았다", "농부가 벌을 받았다"], answer: 1 },
    { q: "산초 판사가 돈키호테를 따라나선 까닭은 무엇입니까?", choices: ["섬의 총독을 시켜 준다고 해서", "빚을 갚으려고", "심심해서"], answer: 0 },
    { q: "돈키호테가 거인이라고 여기고 달려든 것은 무엇입니까?", choices: ["풍차", "바위", "나무"], answer: 0 },
    { q: "돈키호테가 군대라고 여긴 것은 무엇입니까?", choices: ["구름", "양 떼", "먼지"], answer: 1 },
    { q: "돈키호테가 황금 투구라며 쓰고 다닌 것은 무엇입니까?", choices: ["이발사의 놋대야", "냄비", "바구니"], answer: 0 },
    { q: "풀어 준 죄수들이 돈키호테에게 한 일은 무엇입니까?", choices: ["고마워했다", "돌을 던지고 옷을 벗겨 갔다", "함께 다녔다"], answer: 1 },
    { q: "산초가 시골 처녀를 둘시네아라고 우겼을 때 돈키호테는 어떻게 했습니까?", choices: ["화를 냈다", "마법에 걸린 것이라고 여기고 무릎을 꿇었다", "알아채고 웃었다"], answer: 1 },
    { q: "공작 부부가 돈키호테를 성으로 부른 까닭은 무엇입니까?", choices: ["존경해서", "심심해서 놀리려고", "도움을 받으려고"], answer: 1 },
    { q: "산초가 총독 노릇을 어떻게 했습니까?", choices: ["쩔쩔맸다", "어려운 문제를 잘 풀어 사람들을 놀라게 했다", "곧 도망쳤다"], answer: 1 },
    { q: "산초가 총독을 그만둔 까닭 가운데 하나는 무엇입니까?", choices: ["의사가 못 먹게 해서", "돈을 못 벌어서", "쫓겨나서"], answer: 0 },
    { q: "흰 달의 기사는 사실 누구입니까?", choices: ["공작", "마을 사람 산손 카라스코", "이발사"], answer: 1 },
    { q: "마지막에 산초가 돈키호테에게 한 말은 무엇입니까?", choices: ["섬을 달라", "나리 옆에 있는 동안 제가 괜찮은 사람 같았다", "집에 가겠다"], answer: 1 }
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
            ${artFrame('end.png', '🕊️')}
            <h2>돈키호테를 다 읽었습니다</h2>
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
