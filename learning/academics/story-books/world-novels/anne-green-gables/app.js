const BOOK_TITLE = "빨간 머리 앤";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "역에 서 있던 아이",
        emoji: "🚉",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `캐나다 동쪽 끝에 프린스에드워드섬이라는 섬이 있습니다. 그 섬의 에이번리라는 마을에 초록 지붕 집이 있었습니다.`,
            `그 집에는 남매가 살았습니다. 예순 살 매슈 커스버트와, 그보다 다섯 살 아래인 마릴라 커스버트였습니다. 두 사람 다 결혼을 하지 않았습니다.`,
            `매슈는 몹시 수줍은 사람이었습니다. 낯선 사람만 보면 말을 못 했고, 특히 여자 앞에서는 더 그랬습니다. 마릴라는 반대로 말이 짧고 단단했습니다. 웃는 일이 드물었습니다.`,
            `두 사람은 나이가 들었고 농장 일은 힘에 부쳤습니다. 그래서 고아원에서 남자아이를 하나 데려오기로 했습니다. 열한 살쯤 되어 일손을 도울 수 있는 아이면 좋겠다고 했습니다.`,
            `그날 오후, 매슈는 그 아이를 데리러 브라이트 리버 역으로 마차를 몰았습니다.`,
            `역에 닿았을 때 기차는 이미 떠난 뒤였습니다. 승강장에는 아무도 없었습니다.`,
            `"아까 그 기차로 온 남자아이가 없었습니까?" 매슈가 역장에게 물었습니다.`,
            `"남자아이는 없었는데요." 역장이 말했습니다. "여자아이가 하나 왔습니다. 저기 널빤지 위에 앉아 있는데요. 안으로 들어오라고 했더니 밖이 더 상상할 거리가 많다면서 저러고 있습니다."`,
            `매슈가 돌아보았습니다.`,
            `승강장 끝의 널빤지 더미 위에 여자아이가 하나 앉아 있었습니다. 열한 살쯤 되어 보였습니다. 몸에 맞지 않는 낡은 옷을 입었고, 낡은 여행 가방을 무릎에 안고 있었습니다.`,
            `가장 먼저 눈에 들어온 것은 머리카락이었습니다. 두 갈래로 땋아 늘였는데 아주 새빨간 빛이었습니다.`,
            `얼굴은 작고 마르고 주근깨가 많았습니다. 그런데 눈이 아주 컸습니다. 그 눈은 어떤 때는 초록빛으로, 어떤 때는 잿빛으로 보였습니다.`,
            `아이는 매슈를 보자마자 일어나 가방을 들고 걸어왔습니다.`,
            `"초록 지붕 집의 매슈 커스버트 씨지요?" 아이가 손을 내밀며 말했습니다. "만나서 반갑습니다. 안 오시면 어쩌나 하고 아까부터 생각하고 있었어요. 그래서 오시지 않으면 저 아래 굽은 길에 있는 큰 벚나무에 올라가서 밤을 새울 작정이었어요. 하나도 안 무서웠을 거예요. 하얀 꽃이 핀 벚나무 위에서 달빛을 맞으며 자는 건 근사한 일이잖아요. 안 그래요?"`,
            `매슈는 그 아이의 손을 잡았습니다. 그리고 아무 말도 하지 못했습니다.`,
            `무언가 잘못되었다는 것을 그는 알았습니다. 그러나 이 아이에게 "너는 우리가 부른 아이가 아니다"라는 말을 이 자리에서 할 자신이 없었습니다.`,
            `"자, 타거라." 그는 겨우 그렇게 말했습니다.`
        ]
    },
    {
        num: 2,
        title: "초록 지붕 집으로 가는 길",
        emoji: "🌸",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `마차가 달리는 동안 아이는 쉬지 않고 말했습니다.`,
            `"제 이름은 앤 셜리예요. 그런데 부르실 때는 코딜리아라고 불러 주시면 안 될까요? 아, 안 되겠죠. 그럼 앤이라고 불러 주세요. 대신 꼭 끝에 이(e)가 붙은 앤이에요. 앤(Ann)은 밋밋한데 앤(Anne)은 훨씬 근사해 보이거든요."`,
            `"아저씨, 제가 너무 말을 많이 하나요? 그러면 그만하라고 하세요. 저는 그만할 수 있어요. 어려운 일이지만 마음먹으면 할 수 있어요."`,
            `"괜찮다." 매슈가 말했습니다. "얼마든지 하려무나."`,
            `그것은 매슈가 살면서 처음 해 보는 말이었습니다. 그는 남의 말을 듣는 것을 좋아했지만, 대개는 아무도 그에게 말을 걸지 않았습니다.`,
            `앤은 자기 이야기를 했습니다.`,
            `부모는 앤이 태어난 지 석 달 만에 열병으로 세상을 떠났습니다. 앤은 토머스 아주머니 집에서 아이 넷을 돌보며 자랐고, 그 집이 어려워지자 해먼드 아주머니 집으로 갔습니다. 그 집에는 아이가 여덟이었고 그중 쌍둥이가 세 쌍이었습니다. 그 집도 무너지자 고아원으로 갔습니다.`,
            `"그래서 저는 쌍둥이를 아주 잘 봐요." 앤이 말했습니다.`,
            `앤은 그 이야기를 하면서도 슬퍼하지 않았습니다. 다만 학교를 제대로 다니지 못한 것이 아쉽다고 했습니다.`,
            `길이 굽어지자 앞이 온통 하얘졌습니다. 벚나무와 사과나무가 길 양쪽에서 가지를 뻗어 꽃 지붕을 이루고 있었습니다.`,
            `앤은 말을 멈추었습니다. 그리고 두 손을 모으고 그것을 올려다보았습니다.`,
            `한참이 지나서야 아이가 말했습니다.`,
            `"이 길 이름이 뭐예요?"<br>"가로수 길이라고 부른다."<br>"그건 이 길에 안 어울려요. 아무 뜻도 없잖아요. 저는 이 길을 환희의 하얀 길이라고 부르겠어요."`,
            `조금 더 가자 다리 아래로 호수가 보였습니다. 저녁 해를 받아 물빛이 붉게 물들어 있었습니다.`,
            `"저건 배리네 연못이라고 한다."<br>"그것도 안 어울려요. 저건······ 빛나는 물의 호수예요."`,
            `앤은 그런 식으로 가는 길에 있는 것마다 이름을 새로 붙였습니다.`,
            `해가 질 무렵 마차가 초록 지붕 집 앞에 닿았습니다.`,
            `앤은 마차에서 내려 그 집을 올려다보았습니다.`,
            `"여기가······ 제 집이에요?"`,
            `매슈는 대답하지 못했습니다.`
        ]
    },
    {
        num: 3,
        title: "돌려보내야 한다",
        emoji: "🕰️",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `마릴라는 부엌에서 저녁을 차리다가 문 쪽을 보고 그대로 굳었습니다.`,
            `"매슈 커스버트, 저 아이는 누구니? 남자아이는 어디 있어?"`,
            `"없었다." 매슈가 겨우 말했습니다. "저 아이만 있더구나."`,
            `앤이 두 사람을 번갈아 보았습니다. 그리고 알아들었습니다.`,
            `아이는 가방을 바닥에 내려놓았습니다.`,
            `"저를 원하지 않으시는군요." 앤이 말했습니다. "제가 남자아이가 아니라서요."`,
            `그러고는 식탁에 엎드려 울기 시작했습니다. 마릴라가 지금까지 본 어떤 울음보다 큰 울음이었습니다.`,
            `"얘야, 그만하렴. 그런 일로 울 것까지는……."`,
            `"울 일이에요!" 앤이 고개를 들었습니다. 얼굴이 눈물범벅이었습니다. "아주머니도 고아였다가 어떤 집에 갔는데, 그 집이 남자아이를 원했다는 걸 알게 되면 우실 거예요. 이건 제 인생에서 가장 비극적인 일이에요."`,
            `마릴라는 그날 밤 앤을 다락방에 재웠습니다.`,
            `아이가 올라간 뒤 마릴라가 말했습니다.<br>"내일 스펜서 부인에게 데려다주고 사정을 이야기해야겠다."`,
            `"그래야겠지." 매슈가 말했습니다. 그러고는 잠깐 있다가 덧붙였습니다. "그런데 마릴라, 저 아이는 참 재미있는 아이더구나."`,
            `"매슈 커스버트, 설마 저 아이를 데리고 있자는 건 아니겠지."<br>"아니, 그런 건 아니고······." 매슈는 그렇게 말하고 입을 다물었습니다.`,
            `이튿날 아침, 앤은 눈을 뜨자마자 창가로 달려갔습니다.`,
            `창밖에 벚나무 한 그루가 꽃을 활짝 피우고 서 있었습니다. 그 너머로 과수원과 시냇물과 언덕이 보였습니다.`,
            `앤은 창턱에 무릎을 꿇고 앉아 그것을 오래 보았습니다.`,
            `"이건 볼 수 있어서 다행이야." 아이가 혼잣말을 했습니다. "여기서 살지 못하더라도, 오늘 아침에 이걸 본 건 남는 거니까."`,
            `아침을 먹는 동안 앤은 한마디도 하지 않았습니다.`,
            `"왜 말을 안 하니?" 마릴라가 물었습니다.<br>"생각하면 말이 안 나와요." 앤이 말했습니다. "떠날 생각을 하니까요."`,
            `마릴라는 왠지 마음이 좋지 않았습니다.`
        ]
    },
    {
        num: 4,
        title: "마릴라의 마음",
        emoji: "🏡",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `그날 오후 마릴라는 앤을 데리고 스펜서 부인의 집으로 갔습니다.`,
            `가는 길에도 앤은 이야기를 했습니다. 다만 오늘은 목소리가 작았습니다.`,
            `"아주머니, 오늘 하루만은 여기 사는 아이처럼 생각하면서 가도 될까요? 그러면 조금 덜 슬플 것 같아요."`,
            `마릴라는 대답하지 않았습니다. 대답할 말이 떠오르지 않았습니다.`,
            `스펜서 부인의 집에 닿아 사정을 이야기하자 부인이 손뼉을 쳤습니다.`,
            `"어머, 이런 착오가 있었군요. 그런데 마침 잘됐어요. 블루엣 부인이 오늘 아침에 여자아이를 하나 구한다고 했거든요."`,
            `그때 블루엣 부인이 들어왔습니다.`,
            `얼굴이 좁고 눈이 날카로운 사람이었습니다. 그 부인은 아이를 위아래로 훑어보았습니다.`,
            `"몇 살이냐? 이름이 뭐지?"<br>"열한 살이고 앤 셜리예요."`,
            `"우리 집에 애가 여덟이다. 젖먹이가 둘이야. 일이 아주 많아. 게으름은 못 봐준다."`,
            `앤은 아무 말도 하지 않았습니다. 다만 얼굴이 하얗게 질려 있었습니다.`,
            `마릴라는 그 얼굴을 보았습니다.`,
            `그리고 자기가 무슨 말을 하는지 알기도 전에 이렇게 말하고 있었습니다.`,
            `"블루엣 부인, 죄송합니다. 저희가 아직 결정한 것이 아니라서요. 오늘은 데리고 돌아가겠습니다."`,
            `돌아오는 마차에서 앤은 한참 말이 없었습니다. 그러다 물었습니다.`,
            `"저를 데리고 계실 거예요?"<br>"아직 모르겠다." 마릴라가 말했습니다. "다만 저 부인에게 보낼 수는 없겠더구나."`,
            `앤이 갑자기 마릴라의 팔을 붙잡았습니다.<br>"아주머니, 정말이에요? 정말요?"<br>"팔을 놓으렴. 마차가 흔들린다."`,
            `그날 저녁, 마릴라는 매슈에게 말했습니다.<br>"저 아이를 데리고 있기로 했다. 다만 내가 제대로 가르칠 거야. 저 애는 지금 머릿속에 뜬구름만 가득해."`,
            `매슈는 아무 말도 하지 않았습니다. 다만 그날 저녁 내내 웃는 얼굴이었습니다.`,
            `그날 밤 앤은 창가에 무릎을 꿇고 앉아 말했습니다.<br>"이제 저 벚나무를 눈의 여왕이라고 불러도 되겠어."`
        ]
    },
    {
        num: 5,
        title: "린드 아주머니",
        emoji: "😠",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `에이번리에서 모르는 일이 없는 사람이 하나 있었습니다. 레이철 린드 부인이었습니다.`,
            `그 부인은 창가에 앉아 바느질을 하면서 길로 지나가는 것을 하나도 놓치지 않았고, 무엇이든 생각한 대로 말했습니다.`,
            `며칠 뒤 린드 부인이 초록 지붕 집에 왔습니다.`,
            `"그래, 그 아이를 보러 왔어요." 부인이 말했습니다.`,
            `앤이 부엌으로 들어왔습니다.`,
            `린드 부인은 앤을 한참 보더니 말했습니다.`,
            `"어머나, 마릴라. 이건 너무하잖아요. 어쩌면 이렇게 말랐을까. 얘야, 이리 와 봐라. 세상에, 주근깨 좀 봐. 그리고 머리는 왜 이렇게 당근 같으니."`,
            `앤이 방 한가운데로 걸어 나왔습니다. 얼굴이 새빨개졌습니다.`,
            `"아주머니가 미워요!" 아이가 발을 굴렀습니다. "제가 마르고 못생긴 건 저도 알아요. 그런데 그걸 굳이 말로 하셔야 해요? 아주머니가 만약 저에게 뚱뚱하고 못생기고 상상력이라고는 하나도 없어 보인다고 하면 기분이 어떠시겠어요?"`,
            `"앤!" 마릴라가 소리쳤습니다.`,
            `"그런 말을 듣고도 아무렇지 않을 수는 없어요. 저는 아주머니를 절대로 용서하지 않겠어요. 절대로요!"`,
            `앤은 방으로 뛰어 올라가 문을 쾅 닫았습니다.`,
            `린드 부인은 어이가 없어 한동안 말을 못 했습니다. 그러고는 "그런 아이를 데려오다니, 나중에 후회할 거예요" 하고 돌아갔습니다.`,
            `마릴라는 앤의 방으로 올라갔습니다.`,
            `앤은 침대에 엎드려 있었습니다.`,
            `"앤, 그렇게 하면 안 되는 거였다."<br>"저도 알아요. 그런데 참을 수가 없었어요."`,
            `"린드 부인에게 사과해야 한다."<br>"못 해요."<br>"그러면 사과할 마음이 들 때까지 이 방에서 나오지 못한다."`,
            `그날 저녁, 매슈가 몰래 다락방으로 올라왔습니다.`,
            `"앤, 그냥 사과하려무나." 그가 조심스럽게 말했습니다. "그러면 다 끝나는 일이야."<br>"아저씨도 제가 잘못했다고 생각하세요?"<br>"음······ 그 아주머니 말도 심하기는 했지." 매슈가 말했습니다. "다만 마릴라 말도 들어야 하지 않겠니."`,
            `이튿날 앤은 사과를 하겠다고 했습니다.`,
            `린드 부인의 집에서 앤은 무릎을 꿇고 두 손을 모았습니다.`,
            `"린드 아주머니, 저는 제가 한 짓을 후회하고 있어요. 아주 깊이 후회해요. 이 세상의 모든 말을 다 가져와도 제 잘못을 다 말할 수 없을 거예요. 저를 용서해 주세요. 용서해 주지 않으시면 저는 평생 슬픔을 안고 살아야 할 거예요."`,
            `마릴라는 그 사과를 들으며 얼굴을 다른 데로 돌렸습니다. 웃음이 나오려는 것을 참느라 힘들었습니다.`,
            `린드 부인은 마음이 풀려 앤을 일으켰습니다.<br>"괜찮다, 얘야. 내 말도 좀 심했지. 나는 원래 말을 그대로 하는 사람이라서."`,
            `돌아오는 길에 앤이 마릴라의 손을 잡았습니다.<br>"사과라는 걸 해 보니까 근사한 데가 있네요."<br>"앤 셜리."`
        ]
    },
    {
        num: 6,
        title: "마음의 친구",
        emoji: "🌿",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `앤에게는 오래전부터 바라던 것이 하나 있었습니다.`,
            `"마음의 친구요." 앤이 말했습니다. "속에 있는 것을 다 이야기할 수 있는 친구요."`,
            `언덕 아래 과수원 집에 다이애나 배리라는 아이가 살았습니다. 앤과 같은 나이였습니다.`,
            `처음 만나는 날, 앤은 손이 떨렸습니다.`,
            `"마릴라 아주머니, 만약 저 아이가 저를 좋아하지 않으면 어떡하죠?"<br>"쓸데없는 걱정 말고 가자."`,
            `다이애나는 검은 머리에 볼이 발그레한 아이였습니다. 앤과는 아주 달랐습니다. 조용했고, 상상하는 것보다 있는 그대로를 좋아했습니다.`,
            `두 아이는 과수원에서 마주 섰습니다.`,
            `앤은 미리 연습한 말을 다 잊어버렸습니다. 다이애나도 무슨 말을 해야 할지 몰라 발끝만 보고 있었습니다.`,
            `"다이애나, 나랑 마음의 친구가 되어 줄래?" 앤이 물었습니다. "그러면 맹세를 해야 해."`,
            `"맹세? 그건 나쁜 말 아니야?"<br>"이 맹세는 달라. 아주 엄숙하게 약속하는 거야."`,
            `두 아이는 손을 맞잡았습니다.`,
            `앤이 먼저 말했습니다. 목소리가 아주 엄숙했습니다.`,
            `"해와 달이 있는 한, 나는 나의 마음의 친구 다이애나 배리에게 언제나 진실할 것을 엄숙히 맹세합니다."`,
            `다이애나도 같은 말을 했습니다. 이름만 바꾸어서요.`,
            `그날부터 두 아이는 늘 함께였습니다.`,
            `숲에 자기들만의 놀이집을 지었고, 시냇가에 이름을 붙였고, 나무 사이로 편지를 주고받았습니다.`,
            `놀이집은 자작나무 사이의 빈터에 널빤지를 얹어 만든 것이었습니다. 접시로 쓸 조각과 이 빠진 잔을 모아 두었고, 그 자리를 아이들끼리만 아는 이름으로 불렀습니다.`,
            `앤은 태어나서 처음으로 친구라는 것을 가졌습니다.`,
            `그해 가을부터 앤은 에이번리 학교에 다니기 시작했습니다.`,
            `학교에는 아이들이 스무 명 남짓 있었습니다. 앤은 곧 공부에서 앞자리에 섰습니다. 책을 좋아했고, 한 번 본 것은 잘 잊지 않았습니다.`,
            `다만 산수만은 잘하지 못했습니다.`,
            `"산수에는 상상할 것이 하나도 없어요." 앤이 말했습니다.`,
            `"삼각형은 왜 삼각형이어야 하는지 아무도 설명해 주지 않아요." 앤이 말했습니다. 마릴라는 그런 말에 대답하는 법을 끝내 배우지 못했습니다.`,
        ]
    },
    {
        num: 7,
        title: "석판이 부러진 날",
        emoji: "✏️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `학교에서 가장 공부를 잘하는 아이는 길버트 블라이드였습니다.`,
            `키가 크고 잘생겼으며 웃기를 잘하는 아이였습니다. 여자아이들은 대개 길버트를 좋아했습니다.`,
            `길버트는 그것을 알고 있었고, 그래서 더 짓궂었습니다. 여자아이들의 땋은 머리를 잡아당기는 것이 그의 버릇이었습니다.`,
            `길버트는 며칠 동안 학교를 쉬었다가 돌아왔습니다. 그래서 앤을 처음 보았습니다.`,
            `그는 앤의 눈길을 끌고 싶었습니다. 앤이 창밖만 보고 있었기 때문입니다.`,
            `길버트는 앤의 땋은 머리 끝을 잡아당기며 말했습니다.`,
            `"홍당무! 홍당무!"`,
            `앤이 벌떡 일어섰습니다.`,
            `"어떻게 그런 말을 할 수 있어!"`,
            `그러고는 석판을 들어 길버트의 머리 위에 내리쳤습니다. 석판이 두 동강이 났습니다.`,
            `교실이 조용해졌습니다.`,
            `필립스 선생님이 앤을 앞으로 불러 세우고, 칠판에 이렇게 썼습니다.<br>"앤 셜리는 성질이 아주 사납다. 앤 셜리는 성질을 다스리는 법을 배워야 한다."`,
            `앤은 오후 내내 그 앞에 서 있었습니다.`,
            `앤은 울지 않았습니다. 고개도 숙이지 않았습니다. 다만 얼굴이 빨간 머리보다 더 빨갰습니다.`,
            `그날 길버트는 학교가 끝나고 앤을 기다렸습니다.`,
            `"앤, 미안해. 네 머리를 놀리려던 건 아니었어. 정말이야. 이제 화 풀어."`,
            `앤은 그를 지나쳐 걸어갔습니다. 그러고는 뒤도 돌아보지 않았습니다.`,
            `다이애나가 말했습니다.<br>"앤, 길버트는 원래 여자애들 놀리는 걸 잘해. 나한테도 검둥이 머리라고 한 적 있어. 나는 그냥 웃고 말았는걸."`,
            `"나는 못 웃어." 앤이 말했습니다. "내 머리는 내가 이 세상에서 제일 싫어하는 거야."`,
            `그날 앤은 집에 돌아와 거울 앞에 오래 서 있었습니다. 그리고 마릴라에게 물었습니다.<br>"아주머니, 제 머리가 크면 검어질 수도 있을까요?"<br>"그런 일은 없다." 마릴라가 말했습니다. "그런 걱정을 할 시간에 산수를 하렴."`,
            `그날부터 앤은 길버트에게 한마디도 하지 않았습니다.`,
            `다만 공부에서는 그를 이기기로 마음먹었습니다.`,
            `그해부터 학교의 일 등은 두 사람이 번갈아 했습니다. 어떤 시험에서는 앤이 앞섰고 어떤 시험에서는 길버트가 앞섰습니다. 한번은 두 사람의 점수가 똑같아 함께 일 등이 되기도 했습니다.`,
            `그때마다 앤은 길버트 쪽을 보지 않았습니다.`
        ]
    },
    {
        num: 8,
        title: "딸기 물",
        emoji: "🍇",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `어느 날 마릴라가 외출하면서 말했습니다.`,
            `"다이애나를 불러 차를 마시렴. 찬장 두 번째 칸에 딸기 물이 있으니 꺼내 먹고."`,
            `앤은 그날을 위해 아침부터 준비했습니다. 손님을 맞는 일이 처음이었기 때문입니다.`,
            `두 아이는 어른들처럼 마주 앉았습니다.`,
            `앤은 마릴라의 제일 좋은 찻잔을 꺼내 놓고 싶었지만 참았습니다. 대신 상보를 반듯하게 펴고 의자를 똑바로 놓았습니다.`,
            `"다이애나 양, 딸기 물 한 잔 드시겠어요?"<br>"네, 앤 양."`,
            `앤은 찬장에서 붉은 병을 꺼내 잔에 따랐습니다.`,
            `다이애나는 한 잔을 마시고 말했습니다.<br>"앤, 이거 참 맛있다."<br>"많이 마셔. 얼마든지 있어."`,
            `다이애나는 세 잔을 마셨습니다.`,
            `그러더니 갑자기 일어섰습니다.<br>"나 집에 가야겠어. 머리가 아주 어지러워."`,
            `"조금만 더 있다 가."<br>"아니야, 지금 가야 해."`,
            `다이애나는 비틀거리며 길을 내려갔습니다.`,
            `앤은 문 앞에 서서 그 뒷모습을 보았습니다. 그리고 다이애나가 감기에라도 걸렸나 보다고 생각했습니다.`,
            `이튿날 앤은 다이애나를 만나러 갔습니다. 그런데 배리 부인이 문 앞에서 앤을 막았습니다.`,
            `"앤 셜리, 다시는 우리 다이애나 근처에 오지 마라. 어제 우리 애를 취하게 만들어 놓고."`,
            `"취하다니요?"<br>"딸기 물이라고 하고 포도주를 세 잔이나 먹였다면서. 다이애나가 집에 와서 곧장 쓰러졌다."`,
            `앤은 집으로 뛰어와 마릴라에게 그 이야기를 했습니다.`,
            `마릴라가 찬장을 열어 보고 이마를 짚었습니다.`,
            `"딸기 물은 지하실에 내려다 두었더구나. 그 자리에 있던 건 삼 년 묵은 포도주였다."`,
            `마릴라는 배리 부인을 찾아가 설명했습니다. 그러나 배리 부인은 듣지 않았습니다.`,
            `앤은 그날 밤 울다가 잠들었습니다.`,
            `"마릴라 아주머니, 저는 다이애나 말고 마음의 친구를 다시는 못 가질 거예요."`,
            `마릴라는 아무 말 없이 이불을 덮어 주었습니다. 그리고 방을 나와서 오래 서 있었습니다.`,
            `이튿날 앤은 학교에서 다이애나 옆을 지나가면서도 말을 걸지 못했습니다. 다이애나가 몰래 쪽지를 하나 건넸습니다. 나는 너를 미워하지 않는다고, 다만 엄마가 무섭다고 적혀 있었습니다.`,
        ]
    },
    {
        num: 9,
        title: "한밤중의 눈길",
        emoji: "🌨️",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `그해 겨울 어느 밤이었습니다.`,
            `매슈와 마릴라는 이웃 마을에 다니러 가고 앤 혼자 집에 있었습니다.`,
            `밤 열한 시에 누가 문을 두드렸습니다.`,
            `다이애나였습니다. 숄만 걸치고 눈 속을 뛰어온 것이었습니다.`,
            `"앤, 우리 미니 메이가 크루프에 걸렸어!" 다이애나가 울며 말했습니다. "숨을 못 쉬어. 엄마 아빠는 시내에 가셨고, 집에는 나랑 늙은 하녀뿐이야. 의사 선생님도 안 계셔."`,
            `크루프는 목이 부어 숨길이 막히는 병이었습니다. 어린아이에게는 아주 위험했습니다.`,
            `앤은 이미 옷을 걸치고 있었습니다.`,
            `"내가 갈게. 나는 크루프를 여러 번 봤어."`,
            `앤은 해먼드 아주머니 집에서 쌍둥이 여섯을 돌보며 자랐습니다. 그중 크루프에 걸린 아이가 셋이었습니다.`,
            `앤은 부엌에서 토근 시럽을 챙겨 병에 담고, 다이애나와 함께 눈길을 달렸습니다.`,
            `"괜찮을까?" 다이애나가 물었습니다.<br>"괜찮을 거야." 앤이 말했습니다. 사실은 확신이 없었습니다. 다만 그 말을 해야 다이애나가 걸을 수 있을 것 같았습니다.`,
            `배리네 집에 닿았을 때 세 살짜리 미니 메이는 얼굴이 새파랬습니다. 숨을 쉴 때마다 목에서 쇳소리가 났습니다.`,
            `앤은 물을 끓이라고 하고, 아이를 안아 세우고, 약을 조금씩 먹였습니다. 그리고 몇 시간 동안 그 일을 되풀이했습니다.`,
            `새벽 세 시에 미니 메이의 숨소리가 부드러워졌습니다.`,
            `의사가 도착한 것은 새벽 다섯 시였습니다. 그는 아이를 살펴보고 말했습니다.`,
            `"제가 왔으면 늦었을 겁니다. 그 빨간 머리 아이가 아니었으면 이 아이는 못 살았을 거예요."`,
            `이튿날 오후, 배리 부인이 초록 지붕 집에 왔습니다.`,
            `"앤." 부인이 말했습니다. "내가 잘못했다. 용서해 주겠니?"`,
            `앤은 잠깐 어리둥절한 얼굴이 되었다가 말했습니다.<br>"저는 아주머니를 원망한 적이 없어요. 다만 다이애나를 못 만나는 게 슬펐을 뿐이에요."`,
            `"그럼 오늘 저녁에 우리 집에 오려무나. 다이애나가 기다린다."`,
            `앤은 마릴라를 돌아보았습니다. 얼굴이 온통 붉어져 있었습니다.`,
            `그날 저녁 두 아이는 다시 만났습니다.`,
            `문을 열자 다이애나가 뛰어나와 앤의 목을 끌어안았습니다. 두 아이는 한참 동안 아무 말도 하지 못했습니다.`,
        ]
    },
    {
        num: 10,
        title: "지붕 위에서",
        emoji: "🩹",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `앤은 나이가 들어도 사고를 그치지 않았습니다.`,
            `한번은 케이크에 향료 대신 진통제를 넣어 목사님 부부를 대접했습니다. 앨런 목사 부인은 한 입 먹고도 아무 말 없이 웃어 주었습니다. 앤은 그날 부인에게 반해 버렸습니다.`,
            `한번은 머리 색이 싫어서 떠돌이 장수에게 산 물약으로 머리를 물들였습니다. 검은 머리가 된다고 했는데, 이튿날 아침 거울 앞에서 앤은 비명을 질렀습니다. 머리가 초록빛이 되어 있었습니다.`,
            `물로도 지워지지 않아 결국 머리를 아주 짧게 잘라야 했습니다. 앤은 몇 주 동안 모자를 쓰고 학교에 갔습니다.`,
            `조시 파이는 그것을 두고 여러 번 놀렸습니다. 그때마다 앤은 대답하지 않았습니다. 대답하면 또 석판이 부러질 것 같았기 때문입니다.`,
            `"이제 알겠니." 마릴라가 말했습니다.<br>"네." 앤이 말했습니다. "이제 저는 겉모습에 대해 욕심을 부리지 않겠어요. 다만 이 머리가 자랄 때까지는 슬플 거예요."`,
            `그리고 그해 여름, 가장 큰 사고가 났습니다.`,
            `여자아이들이 배리네 마당에서 놀다가 서로 겁쟁이라고 놀리기 시작했습니다.`,
            `조시 파이가 부엌 지붕 위를 걸어 보였습니다. 그러고는 앤을 보며 웃었습니다.`,
            `"앤 셜리는 못 하겠지."`,
            `앤의 얼굴이 하얘졌습니다. 그러고는 사다리를 타고 지붕에 올라갔습니다.`,
            `"앤, 하지 마!" 다이애나가 소리쳤습니다.`,
            `앤은 지붕 마루를 몇 걸음 걸었습니다. 그러다 발이 미끄러졌습니다.`,
            `아이들의 비명 소리가 났습니다.`,
            `앤은 마당으로 떨어졌습니다. 다행히 담쟁이덩굴에 한 번 걸려 속도가 줄었습니다.`,
            `그래도 발목뼈가 부러졌습니다.`,
            `앤은 일곱 주 동안 누워 있어야 했습니다.`,
            `그 일곱 주 동안 앤의 방에는 손님이 끊이지 않았습니다. 학교 아이들이 날마다 찾아왔고, 앨런 목사 부인도 열네 번을 다녀갔습니다. 조시 파이까지 왔습니다.`,
            `"이렇게 많은 사람이 나를 좋아하는 줄 몰랐어요." 앤이 말했습니다.`,
            `마릴라는 그 말을 듣고 밖으로 나갔습니다.`,
            `그리고 부엌 계단에 앉아 한참을 있었습니다. 아이가 떨어졌다는 소리를 듣고 마당으로 달려가던 순간에, 자기가 무슨 생각을 했는지를 그제야 알았기 때문입니다.`,
            `그날 저녁 마릴라는 앤의 방에 올라가 이불을 여며 주며 말했습니다.<br>"앤, 네가 이 집에 온 것은······ 나에게 좋은 일이었다."`,
            `앤은 눈을 크게 떴습니다. 마릴라가 그런 말을 한 것은 처음이었습니다.`
        ]
    },
    {
        num: 11,
        title: "여왕 학원",
        emoji: "📚",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `앤이 열세 살이 되던 해, 새 선생님이 왔습니다.`,
            `스테이시 선생님이었습니다. 아이들의 이야기를 듣고, 밖으로 데리고 나가 나무와 새를 보여 주고, 각자 잘하는 것을 찾아 주는 사람이었습니다.`,
            `스테이시 선생님은 몇몇 아이를 따로 모아 여왕 학원 입학 준비를 시켰습니다. 여왕 학원은 섬의 도시에 있는 학교로, 그곳을 나오면 교사가 될 수 있었습니다.`,
            `앤은 그 반에 들어갔습니다. 길버트도 있었습니다.`,
            `"제가 여왕 학원에 가도 될까요?" 앤이 마릴라에게 물었습니다.<br>"가야지." 마릴라가 말했습니다. "여자아이도 스스로 벌어먹을 수 있어야 한다. 우리가 언제까지나 있는 건 아니니까."`,
            `그때부터 두 해 동안 앤은 공부했습니다.`,
            `저녁마다 등불 아래에서 책을 읽었고, 겨울이면 손이 곱아 연필을 놓치기도 했습니다.`,
            `길버트도 마찬가지였습니다. 두 사람은 여전히 말을 하지 않았지만, 서로가 어디까지 왔는지는 늘 알고 있었습니다.`,
            `시험지가 돌아오는 날이면 두 사람은 서로의 점수를 보지 않는 척하면서 다 보았습니다. 반 아이들은 그것을 구경거리로 여겼습니다.`,
            `앤은 이따금 이런 생각을 했습니다. 길버트와 이야기할 수 있었다면 공부가 훨씬 재미있었을 텐데.`,
            `그러나 이제 와서 먼저 말을 걸 수는 없었습니다. 오 년이나 지났으니까요.`,
            `시험 날이 왔습니다.`,
            `앤은 도시로 가서 사흘 동안 시험을 치렀습니다. 마지막 날 시험지를 내고 나오면서 앤은 자기가 떨어졌다고 확신했습니다.`,
            `결과가 나오는 데는 세 주가 걸렸습니다.`,
            `그날 저녁 다이애나가 신문을 들고 언덕을 뛰어 올라왔습니다.`,
            `"앤! 앤! 네가 일 등이야!"`,
            `앤이 신문을 받아 들었습니다. 이백 명 가운데 맨 위에 이름이 둘 나란히 있었습니다.`,
            `길버트 블라이드, 앤 셜리. 두 사람이 똑같은 점수로 함께 일 등이었습니다.`,
            `앤은 그 자리에 주저앉았습니다.`,
            `그날 밤 매슈는 마당에서 마릴라에게 말했습니다.<br>"내가 뭐랬니. 저 아이는 처음부터 될 아이라고 했지."<br>"매슈 커스버트, 자랑도 정도껏 해라." 마릴라가 말했습니다. 그러나 마릴라도 웃고 있었습니다.`
        ]
    },
    {
        num: 12,
        title: "매슈의 선물",
        emoji: "👗",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `앤은 여왕 학원에서 한 해 만에 이 년 과정을 마쳤습니다.`,
            `졸업식이 있기 전, 매슈는 마을 가게에 갔습니다.`,
            `그는 여자 옷을 사 본 적이 없었습니다. 가게에 들어가 무엇을 사야 할지 몰라 한참을 서 있다가, 갈퀴를 하나 사서 나왔습니다. 갈퀴는 이미 세 개나 있었습니다.`,
            `다음 날 다시 갔습니다. 이번에는 설탕을 스무 근 샀습니다.`,
            `사흘째 되던 날, 그는 린드 부인을 찾아갔습니다.`,
            `"레이철, 부탁이 하나 있소." 매슈가 말했습니다. "앤에게 옷을 하나 지어 주고 싶은데, 내가 그런 걸 몰라서."`,
            `린드 부인이 웃었습니다.<br>"매슈 커스버트, 드디어 알아차렸군요. 마릴라가 지어 준 옷은 다 튼튼하기만 하지요. 요새 아이들은 소매에 주름을 넣은 옷을 입어요."`,
            `그해 성탄절 아침, 앤은 방에서 내려오다가 걸음을 멈추었습니다.`,
            `부엌 문 옆에 갈색 옷이 하나 걸려 있었습니다. 부드러운 천에 소매에는 크게 주름이 잡혀 있었습니다.`,
            `"이건······."<br>"매슈가 너에게 주는 거란다." 마릴라가 말했습니다.`,
            `앤은 그 옷을 두 손으로 받아 들고 아무 말도 하지 못했습니다.`,
            `그날 앤은 그 옷을 입고 발표회 무대에 섰습니다. 매슈는 맨 뒷줄에 앉아 있었습니다.`,
            `여왕 학원 졸업식 날, 앤은 에이버리 장학금을 받았습니다. 사 년 동안 대학에 다닐 수 있는 장학금이었습니다.`,
            `무대에서 이름이 불렸을 때 앤은 객석을 보았습니다.`,
            `매슈가 서 있었습니다. 손뼉을 치면서 아무에게나 이렇게 말하고 있었습니다.<br>"저 아이가 우리 앤입니다. 내가 데려온 아이예요."`,
            `앤이 집으로 돌아온 것은 유월이었습니다.`,
            `그해 여름은 초록 지붕 집에서 가장 좋은 여름이었습니다.`,
            `다만 앤은 매슈가 예전 같지 않다는 것을 알아차렸습니다. 밭에서 일하다 자꾸 손을 짚고 쉬었고, 얼굴빛이 좋지 않았습니다.`,
            `"올해는 사람을 좀 쓰세요." 앤이 말했습니다.<br>"괜찮다." 매슈가 웃었습니다. "나는 아직 일할 수 있어."`
        ]
    },
    {
        num: 13,
        title: "그날 아침",
        emoji: "🌾",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `팔월의 어느 아침이었습니다.`,
            `매슈가 우편물을 들고 마당에서 들어왔습니다. 그런데 문 앞에서 걸음을 멈추었습니다. 손에 든 종이가 떨어졌습니다.`,
            `"매슈, 왜 그래요?" 마릴라가 달려왔습니다.`,
            `애비 은행이 문을 닫았다는 소식이었습니다. 두 사람이 평생 모은 돈이 그 은행에 있었습니다.`,
            `매슈는 마당으로 쓰러졌습니다.`,
            `의사가 왔지만 이미 늦은 뒤였습니다. 심장이 오래전부터 좋지 않았다고 했습니다.`,
            `초록 지붕 집에 사람들이 모였습니다.`,
            `앤은 이틀 동안 울지 못했습니다. 눈물이 나오지 않았습니다.`,
            `사흘째 되던 밤, 앤은 자기 방에서 창밖을 보다가 문득 매슈가 자기에게 옷을 사 주려고 가게에서 갈퀴를 샀다는 이야기를 떠올렸습니다.`,
            `그때 눈물이 터졌습니다.`,
            `마릴라가 방으로 올라와 앤을 안았습니다. 마릴라가 앤을 안은 것은 그날이 처음이었습니다.`,
            `"울어라." 마릴라가 말했습니다. "나도 울고 싶었는데 안 나오더구나."`,
            `며칠 뒤, 마릴라가 말했습니다.`,
            `"앤, 초록 지붕 집을 팔아야겠다."`,
            `"왜요?"<br>"돈이 없어졌고, 내 눈이 나빠지고 있다. 의사가 그러는데 조심하지 않으면 못 보게 된대. 나 혼자서는 이 농장을 못 꾸린다."`,
            `앤은 그날 밤 자기 방에서 오래 앉아 있었습니다.`,
            `이튿날 아침, 앤이 말했습니다.`,
            `"아주머니, 초록 지붕 집을 팔면 안 돼요."<br>"앤, 나도 그러고 싶지 않다. 하지만······."`,
            `"제가 여기 있을게요." 앤이 말했습니다. "대학에는 안 갈래요."`,
            `마릴라가 자리에서 일어섰습니다.<br>"그건 안 된다. 너는 그 장학금을 받으려고 사 년을 공부했어."`,
            `"에이번리 학교 자리가 비어 있대요. 거기서 가르치면 돼요. 그리고 대학은 통신으로 공부할 수 있어요. 시간이 좀 더 걸릴 뿐이에요."`,
            `"앤, 나 때문에 그러는 거라면……."<br>"아주머니 때문이 아니에요." 앤이 말했습니다. "저는 이 집이 좋아요. 그리고 아주머니가 좋아요."`,
            `마릴라는 그 자리에 앉아 앞치마로 얼굴을 가렸습니다.`
        ]
    },
    {
        num: 14,
        title: "길모퉁이",
        emoji: "🌅",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `며칠 뒤 린드 부인이 소식을 하나 가지고 왔습니다.`,
            `"앤, 너 그거 아니? 에이번리 학교 자리 말이다. 원래 길버트 블라이드가 맡기로 되어 있었잖니."`,
            `"그런데요?"<br>"그 애가 그 자리를 그만두겠다고 했단다. 대신 화이트샌즈로 가겠다고 했대. 거기는 여기서 멀어서 하숙을 해야 하는데 말이다."`,
            `앤은 손에 든 것을 내려놓았습니다.`,
            `"왜요?"<br>"몰라서 묻니." 린드 부인이 말했습니다. "네가 마릴라 곁에 있으려는 걸 알고 그런 거지."`,
            `그날 저녁, 앤은 매슈의 무덤에 다녀오는 길이었습니다.`,
            `언덕길에서 앞쪽에 누가 걸어오고 있었습니다. 길버트였습니다.`,
            `앤은 그 자리에 멈춰 섰습니다.`,
            `길버트는 모자를 벗고 지나가려 했습니다.`,
            `"길버트." 앤이 불렀습니다.`,
            `길버트가 돌아섰습니다.`,
            `"학교 자리 말인데······ 고마워." 앤이 말했습니다.`,
            `길버트는 얼굴이 빨개졌습니다.<br>"별것 아니야. 나는 어디서 시작하든 상관없거든."`,
            `두 사람은 잠깐 아무 말도 하지 못했습니다.`,
            `"길버트." 앤이 다시 말했습니다. "오 년 전에 네가 사과했을 때 내가 안 받아 줬잖아. 그 뒤로 계속······ 미안했어."`,
            `"나도 그랬어."`,
            `"우리 이제 친구 할래?"`,
            `길버트가 웃었습니다.<br>"우리는 좋은 친구가 될 거야, 앤. 원래부터 그랬어야 했는데."`,
            `두 사람은 언덕길을 함께 걸어 내려왔습니다. 그리고 삼십 분 동안 이야기했습니다.`,
            `그날 밤 마릴라가 물었습니다.<br>"오는 데 왜 그렇게 오래 걸렸니?"<br>"길버트 블라이드하고 이야기했어요."<br>"세상에, 앤 셜리." 마릴라가 말했습니다. "너희 둘이 삼십 분씩이나 이야기를 했다고?"`,
            `앤은 그날 밤 잠이 잘 오지 않았습니다. 오 년 동안 하지 않았던 말을 하고 나니 마음이 이상하게 가벼웠습니다.`,
        ]
    },
    {
        num: 15,
        title: "굽어진 길",
        emoji: "🍁",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `그해 가을, 앤은 에이번리 학교의 선생님이 되었습니다.`,
            `아침이면 언덕길을 걸어 학교로 갔습니다. 지나가는 길마다 앤이 붙인 이름이 아직 남아 있었습니다. 환희의 하얀 길, 빛나는 물의 호수, 눈의 여왕.`,
            `저녁이면 초록 지붕 집으로 돌아와 마릴라와 함께 밥을 먹고, 등불을 켜고 통신 강의 책을 폈습니다.`,
            `아이들은 앤을 좋아했습니다. 앤이 산수를 가르칠 때는 아이들이 조금 지루해했지만, 역사를 이야기할 때는 종이 울려도 아무도 일어나지 않았습니다.`,
            `대학에 가는 데는 사 년이 아니라 그보다 더 걸릴 것이었습니다.`,
            `어느 날 저녁, 앤은 창가에 앉아 있었습니다.`,
            `열한 살에 이 집에 처음 온 날이 떠올랐습니다. 그날 밤 앤은 이 다락방에서 울었습니다. 자기를 원하지 않는다고 생각했기 때문입니다.`,
            `그때 앤은 앞으로 자기 인생이 곧은 길처럼 뻗어 있는 줄 알았습니다. 여왕 학원, 대학, 그리고 그 너머까지 훤히 보이는 길 말입니다.`,
            `이제 그 길은 굽어져 있었습니다. 굽어진 데 너머로 무엇이 있는지는 보이지 않았습니다.`,
            `그러나 앤은 무섭지 않았습니다.`,
            `앤은 자기가 무엇을 잃었는지 알고 있었습니다. 사 년 동안 대학에서 공부할 기회였습니다. 그러나 자기가 무엇을 지켰는지도 알고 있었습니다.`,
            `"길이 굽었다고 나쁜 건 아니야." 앤이 혼잣말을 했습니다. "저 모퉁이를 돌면 무엇이 있는지는 아무도 몰라. 초록빛 언덕일 수도 있고 부드러운 빛일 수도 있어."`,
            `창밖으로 매슈가 심어 놓은 사과나무가 보였습니다.`,
            `그 나무는 앤이 이 집에 온 해에 매슈가 심은 것이었습니다. 이제 앤의 키보다 훨씬 높이 자라 있었습니다.`,
            `아래층에서 마릴라가 앤을 부르는 소리가 났습니다.`,
            `"앤, 차 마시자꾸나."`,
            `"네, 지금 가요."`,
            `앤은 등불을 들고 계단을 내려갔습니다.`
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
                ${artFrame('cover.png', '🍁')}
            </div>
            <div class="story-page-right">
                <h1>빨간 머리 앤</h1>
                <p class="cover-tag">루시 모드 몽고메리 원작</p>
                <p>나이 든 남매가 농장 일을 도울 남자아이를 하나 데려오기로 합니다. 그런데 역에 나가 보니 널빤지 위에 빨간 머리 여자아이가 앉아 있었습니다.</p>
                <p>착오로 초록 지붕 집에 오게 된 열한 살 앤 셜리가 그 집과 그 마을을 어떻게 바꾸어 놓았는지에 대한 이야기입니다.</p>
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
    { q: "매슈와 마릴라가 원래 데려오려던 아이는 누구입니까?", choices: ["일손을 도울 남자아이", "글을 아는 여자아이", "친척집 아이"], answer: 0 },
    { q: "앤이 가로수 길에 새로 붙인 이름은 무엇입니까?", choices: ["빛나는 물의 호수", "환희의 하얀 길", "눈의 여왕"], answer: 1 },
    { q: "마릴라가 앤을 데리고 있기로 마음먹은 까닭은 무엇입니까?", choices: ["매슈가 졸라서", "블루엣 부인에게 보낼 수 없어서", "일손이 부족해서"], answer: 1 },
    { q: "앤이 린드 부인에게 화를 낸 까닭은 무엇입니까?", choices: ["거짓말을 해서", "다이애나를 흉봐서", "머리와 얼굴을 두고 말해서"], answer: 2 },
    { q: "앤이 다이애나와 나눈 약속은 무엇입니까?", choices: ["마음의 친구가 되겠다는 맹세", "함께 학교에 가겠다는 약속", "비밀을 지키겠다는 약속"], answer: 0 },
    { q: "길버트가 앤을 뭐라고 불러 석판이 부러졌습니까?", choices: ["고아", "홍당무", "주근깨"], answer: 1 },
    { q: "앤이 다이애나에게 실수로 준 것은 무엇입니까?", choices: ["상한 우유", "약이 든 차", "딸기 물 대신 포도주"], answer: 2 },
    { q: "앤이 한밤중에 눈길을 달려가 한 일은 무엇입니까?", choices: ["의사를 불러왔다", "미니 메이를 살렸다", "다이애나를 찾아왔다"], answer: 1 },
    { q: "앤이 머리를 짧게 자르게 된 까닭은 무엇입니까?", choices: ["물약으로 물들였다가 초록이 되어서", "불에 그을려서", "벌을 받아서"], answer: 0 },
    { q: "앤이 지붕에서 떨어진 까닭은 무엇입니까?", choices: ["고양이를 잡으려다", "겁쟁이라는 말을 듣고", "다이애나를 도우려다"], answer: 1 },
    { q: "여왕 학원 입학 시험에서 앤은 몇 등이었습니까?", choices: ["길버트와 함께 일 등", "혼자 일 등", "이 등"], answer: 0 },
    { q: "매슈가 앤에게 지어 준 옷의 특징은 무엇입니까?", choices: ["소매에 주름이 있었다", "흰 레이스가 달렸다", "털이 달렸다"], answer: 0 },
    { q: "앤이 여왕 학원에서 받은 것은 무엇입니까?", choices: ["교사 자격증만", "에이버리 장학금", "우등상"], answer: 1 },
    { q: "앤이 대학에 가지 않기로 한 까닭은 무엇입니까?", choices: ["시험에 떨어져서", "마릴라와 초록 지붕 집을 지키려고", "돈이 모자라서"], answer: 1 },
    { q: "길버트가 에이번리 학교 자리를 그만둔 까닭은 무엇입니까?", choices: ["앤이 그 자리를 맡게 하려고", "도시로 가려고", "몸이 아파서"], answer: 0 },
    { q: "앤이 굽어진 길을 두고 한 말은 무엇입니까?", choices: ["돌아가는 것이 안전하다", "곧은 길이 더 좋다", "모퉁이 너머에 무엇이 있을지 모른다"], answer: 2 }
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
            ${artFrame('end.png', '🌿')}
            <h2>빨간 머리 앤을 다 읽었습니다</h2>
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
