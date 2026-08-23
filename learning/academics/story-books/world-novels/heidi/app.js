const BOOK_TITLE = "알프스의 소녀 하이디";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "산으로 올라가는 길",
        emoji: "⛰️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `유월의 어느 맑은 아침, 스위스의 작은 마을 마이엔펠트에서 두 사람이 산길을 오르고 있었습니다.`,
            `앞선 사람은 스물대여섯쯤 된 여자였습니다. 이름은 데테였습니다. 뒤따르는 것은 다섯 살쯤 된 여자아이였습니다.`,
            `아이는 뺨이 볕에 익어 붉었습니다. 그런데 옷차림이 이상했습니다. 옷을 여러 벌 껴입고 있었기 때문입니다.`,
            `데테가 짐을 줄이려고 아이에게 옷을 다 입혀 놓은 것이었습니다. 겨울옷 위에 여름옷을 입고, 그 위에 목도리까지 두르고 있었습니다.`,
            `아이는 걸을 때마다 땀을 흘렸습니다. 도르플리라는 마을을 지날 때 사람들이 데테를 불러 세웠습니다.`,
            `"데테 아니냐. 그 아이는 누구야?"<br>"제 언니 아델하이트의 딸이에요. 하이디라고 해요."`,
            `"저런. 그럼 그 애 부모가 다 세상을 떠난 거로구나."`,
            `하이디의 아버지는 목수였는데 집을 짓다가 사고로 세상을 떠났습니다. 어머니는 그 소식을 듣고 앓다가 몇 주 뒤에 따라갔습니다. 하이디가 한 살 때 일이었습니다.`,
            `그때부터 데테와 그 어머니가 아이를 키웠는데, 이제 어머니마저 세상을 떠났습니다.`,
            `"그래서 어디로 데려가는 거냐?"<br>"산 위의 알름 할아버지께요."`,
            `사람들이 웅성거렸습니다.`,
            `"데테, 정신이 있는 게냐. 그 노인네한테?"<br>"제 조카의 할아버지시잖아요. 그분도 이 아이를 맡을 몫이 있지요."`,
            `"그 노인은 몇 해째 사람하고 말도 안 섞는데. 교회에도 안 오고. 마을에 내려오면 다들 길을 비킨다."`,
            `"저는 프랑크푸르트에 일자리가 났어요. 이런 자리를 놓칠 수는 없어요."`,
            `데테는 그렇게 말하고 다시 걷기 시작했습니다. 길이 가팔라졌습니다.`,
            `한참 오르자 염소 떼가 나타났습니다. 그 뒤로 열한 살쯤 된 남자아이가 맨발로 따라오고 있었습니다.`,
            `"페터구나." 데테가 말했습니다.<br>"그래, 아직도 염소를 치니?"`,
            `하이디는 그 염소들을 보고 눈을 뗄 수가 없었습니다. 그러다 갑자기 걸음을 멈추고 옷을 벗기 시작했습니다.`,
            `"하이디, 뭐 하는 거야!"<br>"더워요."`,
            `아이는 겉옷을 벗고, 그 아래 옷도 벗고, 목도리도 풀었습니다. 그러고는 그것을 한 무더기로 쌓아 길가 풀밭에 놓았습니다.`,
            `그리고 속치마 차림으로 염소들 뒤를 따라 뛰어 올라갔습니다. 데테는 소리를 질렀지만 아이는 이미 저만치 가 있었습니다.`
        ]
    },
    {
        num: 2,
        title: "알름 할아버지",
        emoji: "🧔",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `산꼭대기 가까이에 오두막이 하나 있었습니다.`,
            `그 앞에 커다란 전나무 세 그루가 서 있었습니다. 바람이 불면 그 나무들이 낮게 우는 소리를 냈습니다.`,
            `오두막 앞 나무 걸상에 노인이 앉아 있었습니다.`,
            `수염이 하얗고 눈썹이 짙었습니다. 어깨가 넓고 손이 컸습니다. 그는 아무 말 없이 파이프를 물고 산 아래를 내려다보고 있었습니다.`,
            `데테가 인사를 했습니다. 노인은 대답하지 않았습니다.`,
            `"아버님, 이 아이를 데려왔습니다. 아드님의 딸이에요."`,
            `노인이 그제야 고개를 들었습니다.`,
            `"이 아이를 여기 두고 가겠다는 거냐."<br>"저는 프랑크푸르트에 가야 합니다. 사 년을 데리고 있었으니 이제 아버님 차례입니다."`,
            `"그래서 이 아이가 나에게 안 맞으면? 밤에 울면 어떻게 하지? 내가 어떻게 달래야 하나?"`,
            `"그건 아버님이 알아서 하실 일이지요."`,
            `데테는 그 말을 하고 돌아섰습니다. 그리고 산길을 뛰어 내려갔습니다.`,
            `노인은 그 뒷모습을 한참 보았습니다. 그러고는 걸상에 앉아 다시 파이프를 물었습니다. 하이디는 그동안 그 자리에 없었습니다.`,
            `아이는 오두막 뒤로 돌아가 염소 우리를 들여다보고, 전나무 밑에 서서 바람 소리를 듣고, 산 아래를 내려다보고 있었습니다. 한참 뒤에 하이디가 돌아왔습니다.`,
            `"할아버지, 저 나무들이 소리를 내요."<br>"바람이 그러는 거다."`,
            `"저는 어디서 자요?"`,
            `노인이 아이를 보았습니다. 울지도 않고 무서워하지도 않는 얼굴이었습니다.`,
            `"네가 자고 싶은 데서 자거라." 하이디는 사다리를 타고 다락으로 올라갔습니다.`,
            `그 위에는 갓 벤 건초가 잔뜩 쌓여 있었습니다. 그리고 벽에 둥근 창이 하나 있었는데, 그 창으로 골짜기가 다 보였습니다.`,
            `"여기서 잘래요!" 노인이 올라와 보았습니다.`,
            `그러고는 아무 말 없이 내려가 자기 침대에서 홑이불을 가져와 건초 위에 깔아 주었습니다. 그리고 자루를 하나 가져와 베개를 만들어 주었습니다.`,
            `저녁으로 노인은 빵을 자르고 치즈를 불에 녹여 그 위에 얹어 주었습니다. 하이디는 그것을 다 먹었습니다.`,
            `"할아버지, 저는 이런 걸 처음 먹어 봐요."`,
            `노인은 아무 말도 하지 않았습니다. 그런데 그날 밤 두 번이나 사다리를 올라가 아이가 잘 자는지 보았습니다.`
        ]
    },
    {
        num: 3,
        title: "산 위의 여름",
        emoji: "🐐",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `이튿날 아침, 페터가 휘파람을 불며 올라왔습니다. 마을 사람들의 염소를 모아 산꼭대기 목장으로 데리고 가는 것이 페터의 일이었습니다. 할아버지는 하이디를 그 무리에 딸려 보냈습니다.`,
            `할아버지의 염소는 두 마리였습니다. 하얀 염소와 갈색 염소였는데, 하이디가 곧 이름을 붙였습니다. 백조와 곰이었습니다.`,
            `그날부터 하이디는 날마다 페터와 함께 산으로 갔습니다.`,
            `목장은 산 중턱의 넓은 풀밭이었습니다. 그 위로는 바위산이 솟아 있었고, 아래로는 골짜기가 까마득했습니다.`,
            `하이디는 그곳에서 처음 보는 것들을 배웠습니다. 노란 꽃이 무리 지어 피는 자리, 매가 도는 시각, 염소마다 성질이 다르다는 것.`,
            `"저 매는 왜 저렇게 소리를 질러?"<br>"화가 나서 그래." 페터가 말했습니다.<br>"왜 화가 나?"<br>"저 아래 사람들이 시끄러워서."`,
            `해가 질 무렵이면 산봉우리가 붉게 물들었습니다. 하이디는 처음 그것을 본 날 울었습니다.`,
            `"산에 불이 났어요!"<br>"안 났다." 할아버지가 말했습니다.<br>"해가 산에게 잘 자라고 인사하는 거다."`,
            `"내일 또 그래요?"<br>"날마다 그런다."`,
            `그해 여름 하이디는 볕에 새까맣게 탔고 살이 붙었습니다.`,
            `할아버지는 겨울이 오기 전에 아이 침대를 만들었습니다. 그리고 다락 창에 덧문을 달았습니다.`,
            `그러면서도 아이가 있어서 그런다는 말은 한 번도 하지 않았습니다. 그해 가을, 할아버지는 하이디에게 신발과 두꺼운 옷을 마련해 주었습니다. 마을에서 그것을 산 날, 가게 주인이 몹시 놀랐습니다.`,
            `알름 할아버지가 마을에 내려온 것이 여러 해 만이었기 때문입니다. 그 무렵 산 아래가 온통 붉고 노랬습니다.`,
            `페터는 그 무렵 학교에 가야 했습니다. 눈이 오면 산에서 못 내려간다고 겨울에만 다녔습니다.`,
            `하이디는 페터가 학교에 간다는 말을 듣고 부러워했습니다.`,
            `"학교에서 뭘 배워?"<br>"글자."<br>"재미있어?"<br>"하나도 안 재미있어."`,
            `하이디는 그 말을 믿지 않았습니다. 그해 겨울, 눈이 오두막 문 높이까지 쌓였습니다. 할아버지는 아침마다 나가서 눈을 치웠습니다.`,
            `하이디는 그 옆에서 작은 삽으로 따라 했습니다. 눈을 다 치우고 나면 두 사람은 안에 들어가 불을 쬐었습니다. 할아버지는 나무를 깎아 숟가락과 그릇을 만들었습니다.`,
            `하이디는 그 옆에 앉아 나뭇밥이 떨어지는 것을 보았습니다.`
        ]
    },
    {
        num: 4,
        title: "페터의 할머니",
        emoji: "👵",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `첫눈이 온 뒤, 하이디는 페터의 집에 가고 싶다고 졸랐습니다.`,
            `페터의 집은 산 아래쪽 비탈에 있었습니다. 낡은 오두막이었는데, 바람이 불면 온 집이 삐걱거렸습니다.`,
            `그 집에는 페터와 어머니, 그리고 할머니가 살았습니다. 할아버지가 하이디를 썰매에 태워 데려다주었습니다. 방 안에 들어서자 물레 앞에 앉은 늙은 여인이 고개를 들었습니다.`,
            `"누구냐?"<br>"하이디예요."`,
            `할머니는 손을 뻗어 하이디의 얼굴을 더듬었습니다.<br>"네가 알름 할아버지 손녀로구나."`,
            `하이디는 그제야 알았습니다. 할머니는 앞이 보이지 않았습니다.`,
            `"할머니, 저 산이 안 보이세요?"<br>"안 보인단다."<br>"저 큰 나무들도요?"<br>"안 보여."`,
            `하이디는 울음을 터뜨렸습니다. 할머니가 웃으며 아이를 무릎에 앉혔습니다.`,
            `"울지 마라. 나는 소리는 다 듣는단다. 전나무가 우는 소리도 듣고, 네 목소리도 듣지."`,
            `"할머니, 제가 산을 이야기해 드릴게요."`,
            `하이디는 그날부터 그 집에 갈 때마다 산 이야기를 했습니다. 오늘 꽃이 어디에 피었는지, 매가 몇 번 돌았는지, 저녁에 봉우리가 얼마나 붉었는지요.`,
            `할머니는 그 이야기를 들으며 웃었습니다.`,
            `그러다 어느 날 할머니가 말했습니다.<br>"저 선반에 낡은 책이 하나 있단다. 찬송가 책이야. 내가 젊었을 때 좋아하던 노래가 그 안에 있는데, 이제는 읽어 줄 사람이 없구나."<br>"제가 읽어 드릴게요!"`,
            `하이디가 그 책을 꺼내 펼쳤습니다. 그리고 한참 들여다보다가 책을 내려놓았습니다.`,
            `"할머니, 저 글을 못 읽어요." 그리고 그날, 하이디는 처음으로 글을 배우고 싶다고 생각했습니다.`,
            `돌아오는 길에 하이디는 할아버지에게 말했습니다.<br>"할아버지, 그 집 덧문이 다 부서졌어요. 바람이 들어와요."`,
            `할아버지는 아무 말도 하지 않았습니다. 그런데 며칠 뒤, 그 집에서 망치질 소리가 났습니다. 할아버지가 못과 나무를 지고 내려가 덧문을 고쳐 놓은 것이었습니다.`
        ]
    },
    {
        num: 5,
        title: "데테 이모가 돌아오다",
        emoji: "🚪",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그해 봄, 산 아래에서 사람이 하나 올라왔습니다.`,
            `데테였습니다. 도시 옷차림에 모자를 쓰고 있었습니다.`,
            `"아버님, 하이디를 데려가겠습니다." 할아버지가 파이프를 내려놓았습니다.`,
            `"뭐라고?"<br>"프랑크푸르트의 좋은 댁에서 사람을 찾습니다. 그 댁 따님이 다리를 못 써서 늘 집에만 있는데, 또래 아이가 함께 있어 주기를 바라신답니다."<br>"그 댁은 아주 부자예요. 하이디는 좋은 옷을 입고 좋은 것을 먹고 공부도 하게 됩니다. 이런 자리가 어디 있습니까."<br>"안 된다."<br>"아버님, 이 아이를 언제까지 이 산에 두실 겁니까? 여기서 뭘 배웁니까? 이 아이는 여덟 살이 되도록 글도 못 읽습니다."`,
            `할아버지가 자리에서 일어섰습니다.`,
            `"나가라."<br>"아버님이 이 아이 앞길을 막으시는 겁니다." 데테가 말했습니다.<br>"사람들이 뭐라고 하는지 아세요? 저 노인이 손녀까지 산에 가둬 놓고 있다고 합니다."`,
            `할아버지는 아무 말도 하지 않았습니다. 그러고는 안으로 들어가 문을 닫았습니다. 데테는 하이디를 데리고 산을 내려갔습니다.`,
            `"이모, 저는 할아버지한테 갈래요."<br>"조금 있다 오면 돼."<br>"언제요?"<br>"곧."`,
            `데테는 그렇게 말하면서 걸음을 늦추지 않았습니다.`,
            `하이디는 페터의 집 앞을 지나면서 소리쳤습니다.<br>"할머니! 제가 글을 배워 올게요! 그러면 책을 읽어 드릴게요!"`,
            `할머니는 문가로 나와 손을 흔들었습니다. 그러고는 아이의 발소리가 멀어질 때까지 그 자리에 서 있었습니다.`,
            `그날 저녁, 할아버지는 오두막에서 나오지 않았습니다. 이튿날 아침 그는 아이가 자던 다락으로 올라갔습니다. 건초 위에 홑이불이 그대로 있었습니다.`,
            `그는 그 창밖을 오래 보았습니다. 산길을 내려가는 동안 하이디는 여러 번 뒤를 돌아보았습니다. 전나무 세 그루가 점점 작아졌습니다.`,
            `"이모, 정말 곧 와요?"<br>"그래."<br>"할아버지한테 말도 안 하고 왔는데."<br>"아까 봤잖니."`,
            `그것은 인사가 아니었습니다. 하이디는 그것을 알고 있었습니다. 마이엔펠트에서 기차를 탔습니다.`,
            `하이디는 기차를 처음 탔습니다. 창밖으로 산이 뒤로 밀려 갔습니다. 산이 낮아지고, 낮아지다가, 마침내 보이지 않게 되었습니다.`,
            `하이디는 그때까지 산이 없는 곳이 있다는 것을 몰랐습니다.`
        ]
    },
    {
        num: 6,
        title: "클라라",
        emoji: "🦽",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `프랑크푸르트의 제제만 씨 댁은 아주 큰 집이었습니다. 방마다 융단이 깔려 있었고, 계단이 넓었고, 창에 두꺼운 커튼이 쳐져 있었습니다. 그 집 딸 클라라는 열두 살이었습니다.`,
            `얼굴이 하얗고 머리가 길었습니다. 어릴 때부터 다리가 약해서 걷지 못했고, 늘 바퀴 의자에 앉아 지냈습니다.`,
            `어머니는 몇 해 전에 세상을 떠났고, 아버지는 사업 때문에 집에 있는 날이 드물었습니다.`,
            `살림은 로텐마이어 부인이라는 사람이 맡고 있었습니다. 키가 크고 마르고, 옷깃을 아주 높이 세우고 다니는 사람이었습니다.`,
            `데테는 하이디를 그 집에 데려다 놓고, 인사를 하고 나갔습니다. 그리고 다시 오지 않았습니다.`,
            `로텐마이어 부인이 하이디를 훑어보았습니다.`,
            `"이름이 뭐냐."<br>"하이디예요."<br>"그건 이름이 아니다. 세례명이 있을 것 아니냐."<br>"모르겠어요."`,
            `부인의 눈썹이 올라갔습니다.`,
            `"몇 살이냐."<br>"모르겠어요."`,
            `"글은 읽을 줄 아느냐."<br>"몰라요."`,
            `부인은 두 손을 들었습니다.`,
            `"이건 아이가 아니라······."<br>그때 클라라가 말했습니다.<br>"로텐마이어 부인, 저는 이 아이가 좋아요."`,
            `그날부터 하이디는 그 집에서 살게 되었습니다. 클라라와 하이디는 곧 친해졌습니다.`,
            `클라라는 그동안 웃을 일이 없었습니다. 그런데 하이디가 하는 이야기를 들으면 웃음이 났습니다.`,
            `하이디는 산 이야기를 했습니다. 백조와 곰 이야기, 페터 이야기, 저녁이면 산봉우리가 붉게 타는 이야기.`,
            `"그 산이 정말 그렇게 붉어져?"<br>"온통 불붙은 것처럼요."`,
            `클라라는 그 이야기를 들을 때마다 창밖을 보았습니다. 그 창밖에는 맞은편 집 벽밖에 보이지 않았습니다. 그 집에는 하인이 여럿이었습니다.`,
            `제바스티안이라는 하인이 하이디에게 친절했습니다. 그 사람은 하이디가 야단을 맞고 나면 몰래 빵을 가져다주었습니다.`,
            `"아가씨, 여기 사람들은 원래 저래요. 마음에 담지 마세요."`,
            `하이디는 그 집에서 좋은 것을 많이 받았습니다. 부드러운 침대, 따뜻한 물, 하루 세 번 나오는 밥. 그런데 그 어느 것도 마음에 들지 않았습니다.`,
            `왜 그런지는 하이디도 몰랐습니다.`
        ]
    },
    {
        num: 7,
        title: "도시의 규칙",
        emoji: "🍞",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그 집에는 규칙이 아주 많았습니다. 식탁에서는 등을 펴야 했고, 손은 무릎 위에 두어야 했고, 어른이 말을 걸기 전에 먼저 말하면 안 되었습니다. 하이디는 그 규칙을 다 어겼습니다.`,
            `점심때 하얀 빵이 나오자 하이디는 그것을 먹지 않고 주머니에 넣었습니다.`,
            `"왜 안 먹느냐."<br>"이건 할머니 드리려고요. 할머니는 이가 없어서 딱딱한 빵을 못 드시거든요."`,
            `로텐마이어 부인은 그것이 무슨 소리인지 알아듣지 못했습니다. 며칠 뒤 하이디는 혼자 밖에 나갔습니다. 산이 보이는 데를 찾으려고 한 것이었습니다.`,
            `높은 데 올라가면 보일 것 같아 교회 탑에 올라갔습니다. 그런데 꼭대기에서 보인 것은 지붕과 굴뚝뿐이었습니다.`,
            `내려오는 길에 종지기 노인이 하이디에게 고양이 새끼를 보여 주었습니다. 하이디는 그중 두 마리를 얻어 주머니에 넣고 돌아왔습니다.`,
            `그날 오후 공부 시간에 주머니에서 야옹 소리가 났습니다.`,
            `로텐마이어 부인이 의자 위로 올라갔습니다. 부인은 고양이를 아주 무서워했습니다.`,
            `클라라는 그날 배가 아플 때까지 웃었습니다. 그날 저녁 하이디는 크게 야단을 맞았습니다. 그런데 하이디는 자기가 무엇을 잘못했는지 알지 못했습니다.`,
            `그 집에는 하이디를 나무라지 않는 사람이 하나 있었습니다. 제제만 씨의 어머니, 그러니까 클라라의 할머니였습니다. 할머니는 그해 가을에 그 집에 와서 몇 주를 지냈습니다.`,
            `할머니는 하이디의 이야기를 다 들어 주었고, 그림책을 주었습니다.`,
            `"글을 배우고 싶으냐?"<br>"저는 못 배워요. 페터가 그러는데 글은 아주 어려워서 못 배운대요."`,
            `"페터가 못 배운 거지 네가 못 배우는 건 아니란다."`,
            `그리고 할머니는 그림책을 펴서 이야기를 하나 읽어 주었습니다. 이야기가 재미있어지려는 데서 책을 덮었습니다.`,
            `"나머지는 네가 읽으렴."`,
            `하이디는 그날부터 글을 배웠습니다. 그리고 사흘 만에 읽게 되었습니다.`
        ]
    },
    {
        num: 8,
        title: "밤마다 열리는 문",
        emoji: "🌙",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `그런데 하이디는 점점 야위어 갔습니다. 밥을 잘 먹지 못했고, 웃는 일이 줄었습니다.`,
            `밤에는 잠이 오지 않았습니다. 눈을 감으면 전나무 소리가 들리는 것 같았습니다.`,
            `할머니가 그것을 알아차리고 물었습니다.`,
            `"하이디, 무슨 일이 있느냐."<br>"아니에요."<br>"울고 싶으면 울어도 된단다."<br>"울면 안 돼요. 이모가 여기서 울면 안 된다고 했어요."`,
            `할머니는 그 아이를 안았습니다.`,
            `"울고 싶으면 울어라. 그리고 견디기 힘들면 마음속으로 말해도 된단다. 아무도 못 듣는 데다 대고 다 말해도 돼."`,
            `그러나 할머니는 곧 그 집을 떠났습니다. 그 뒤로 그 집에 이상한 일이 생겼습니다. 밤마다 현관문이 열려 있는 것이었습니다.`,
            `아침에 하인이 내려와 보면 빗장이 풀려 있고 문이 반쯤 열려 있었습니다.`,
            `집 안이 시끄러워졌습니다. 도둑이 든다는 사람도 있고 유령이라는 사람도 있었습니다.`,
            `제제만 씨가 집에 돌아왔습니다. 그리고 친구인 의사와 함께 밤을 새우기로 했습니다.`,
            `두 사람은 촛불을 끄고 현관 옆방에서 기다렸습니다. 새벽 한 시가 지났을 때, 계단에서 아주 작은 소리가 났습니다. 두 사람은 문틈으로 내다보았습니다.`,
            `하얀 것이 계단을 내려오고 있었습니다. 제제만 씨가 등불을 들고 나섰습니다.`,
            `잠옷 차림의 하이디가 맨발로 서 있었습니다. 눈을 뜨고 있었지만 아무것도 보고 있지 않았습니다.`,
            `의사가 아이를 살며시 붙잡았습니다.<br>"하이디, 어디 가려고 했니?"`,
            `아이가 깨어났습니다. 그리고 자기가 어디 있는지 몰라 두리번거렸습니다.`,
            `"저는······ 아무 데도 안 갔어요." 의사가 아이를 방으로 데려가 앉혔습니다.`,
            `"하이디, 낮에는 잘 지내니?"<br>"네."<br>"밤에는 무슨 꿈을 꾸니?"`,
            `하이디는 잠깐 아무 말도 하지 않았습니다.`,
            `"산에 가는 꿈을 꿔요. 그런데 갈 때마다 눈을 뜨면 여기예요."`,
            `그러고는 울기 시작했습니다. 참았던 것이 한꺼번에 터져 나왔습니다. 의사는 그 아이가 우는 것을 한참 지켜보았습니다.`,
            `그리고 방을 나와 제제만 씨에게 말했습니다.<br>"이 아이는 병이 났습니다. 그런데 약으로 낫는 병이 아닙니다."`,
            `"그럼 무엇으로 낫습니까."<br>"집으로 보내십시오. 당장요."`
        ]
    },
    {
        num: 9,
        title: "산으로 돌아가다",
        emoji: "🎒",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `이튿날 아침, 하이디는 자기가 산으로 돌아간다는 말을 들었습니다. 아이는 그 말을 처음에는 믿지 못했습니다.`,
            `"오늘요? 정말 오늘요?"`,
            `짐을 꾸리는데 클라라가 말했습니다.<br>"하이디, 이거 가져가."`,
            `커다란 바구니였습니다. 안에는 하얀 빵이 열두 개 들어 있었습니다. 페터의 할머니를 위한 것이었습니다.`,
            `하이디는 클라라를 끌어안았습니다.`,
            `"클라라, 언젠가 우리 산에 와."<br>"갈게. 꼭 갈게."`,
            `제제만 씨는 하이디에게 사람을 딸려 보냈습니다. 그리고 클라라의 할머니에게 편지를 썼습니다.`,
            `기차가 산 쪽으로 갈수록 창밖이 달라졌습니다. 마이엔펠트에 닿았을 때 하이디는 뛰기 시작했습니다. 도르플리를 지나 페터의 집에 먼저 갔습니다.`,
            `문을 열고 들어가자 할머니가 물레 앞에 앉아 있었습니다.<br>"할머니!" 할머니가 물레를 놓았습니다.`,
            `"하이디냐. 정말 하이디냐."`,
            `하이디는 바구니를 열어 빵을 꺼내 할머니 무릎에 쌓았습니다.`,
            `"할머니, 이거 하얀 빵이에요. 부드러워요."`,
            `할머니가 그 빵을 손으로 만졌습니다. 그리고 울었습니다.`,
            `"그리고 할머니, 저 이제 글 읽어요."`,
            `하이디는 선반에서 찬송가 책을 꺼내 펴고 읽기 시작했습니다. 할머니는 두 손을 모으고 그것을 들었습니다.`,
            `해가 기울 무렵 하이디는 산으로 올라갔습니다. 전나무 세 그루가 보였습니다. 그 아래 걸상에 할아버지가 앉아 있었습니다.`,
            `하이디는 산길을 뛰어 올라가 그 목에 매달렸습니다. 할아버지는 아무 말도 하지 못했습니다.`,
            `한참 뒤에 이렇게 말했습니다.<br>"돌아왔구나."`,
            `그리고 손등으로 눈을 닦았습니다. 그날 저녁 세 사람이 오두막 앞에 앉았습니다. 할아버지가 빵을 자르고 치즈를 불에 녹여 얹었습니다.`,
            `하이디가 그것을 받아 들고 말했습니다.<br>"할아버지, 저는 프랑크푸르트에서 이걸 제일 생각했어요."<br>"그 집에는 더 좋은 게 많았을 텐데."<br>"많았어요. 그런데 이게 더 맛있어요."`,
            `할아버지는 대답 대신 한 조각을 더 잘라 주었습니다. 그날 밤 하이디는 다락에 올라가 둥근 창을 열었습니다. 별이 가득했습니다.`,
            `하이디는 그것을 한참 보다가 잠들었습니다. 그리고 그날 밤에는 걸어 나가지 않았습니다.`
        ]
    },
    {
        num: 10,
        title: "겨울 마을",
        emoji: "🏘️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그해 가을, 할아버지가 하이디에게 말했습니다.<br>"겨울에는 마을에서 지내자."`,
            `하이디는 놀랐습니다. 할아버지는 마을 사람들과 말도 섞지 않는 사람이었습니다.`,
            `"왜요?"<br>"네가 학교에 다녀야 하니까."`,
            `도르플리에는 할아버지가 오래전에 쓰던 집이 하나 있었습니다. 무너져 가는 집이었습니다.`,
            `할아버지는 그 집을 고쳤습니다. 지붕을 얹고 벽을 세우고 난로를 놓았습니다.`,
            `그해 겨울, 두 사람은 그 집에서 지냈습니다. 그리고 하이디는 학교에 다녔습니다. 마을 사람들은 알름 할아버지가 마을에 내려온 것을 보고 처음에는 어색해했습니다. 그런데 겨울이 지나는 동안 조금씩 달라졌습니다.`,
            `할아버지가 눈길을 치우는 것을 사람들이 보았습니다. 남의 집 앞까지 치우는 것도요.`,
            `누가 아프면 할아버지가 나무를 지고 가는 것도 보았습니다.`,
            `봄이 되자 목사님이 할아버지에게 인사를 했습니다. 할아버지도 인사를 했습니다.`,
            `그해 겨울 페터는 학교에 잘 나오지 않았습니다. 눈이 많이 오면 못 온다고 했습니다.`,
            `하이디가 화가 나서 말했습니다.`,
            `"페터, 너 글 배워야 해."<br>"나는 못 배워."<br>"할머니가 그러셨는데, 못 배우는 게 아니라 안 배우는 거래."`,
            `그날부터 하이디가 페터에게 글을 가르쳤습니다.`,
            `페터는 몇 번이나 그만두려고 했습니다. 그때마다 하이디가 붙잡았습니다.`,
            `그해 겨울이 끝날 무렵, 페터가 처음으로 한 줄을 읽었습니다. 할머니는 그 소리를 듣고 손자의 손을 잡았습니다.`,
            `그해 겨울 하이디는 처음으로 학교에 갔습니다. 글을 이미 읽을 줄 알아서 선생님이 놀랐습니다.`,
            `"이 아이는 어디서 배웠습니까?"<br>"프랑크푸르트에서요."`,
            `선생님은 그 말을 듣고 고개를 끄덕였습니다. 하이디는 학교에서 셈도 배우고 글씨 쓰는 법도 배웠습니다. 학교가 끝나면 곧장 페터의 집으로 갔습니다. 그리고 할머니에게 그날 배운 것을 다 이야기했습니다.`,
            `"할머니, 오늘은 이만큼 배웠어요."`,
            `할머니는 그 이야기를 들으면서 물레를 돌렸습니다. 그 겨울 페터의 할머니는 오랜만에 살이 조금 붙었습니다.`
        ]
    },
    {
        num: 11,
        title: "클라라가 오다",
        emoji: "🚂",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `그다음 해 여름, 편지가 왔습니다. 클라라가 산에 오겠다는 편지였습니다.`,
            `의사 선생님이 먼저 와서 산을 보고 갔습니다. 그리고 클라라가 여기서 지내면 좋겠다고 했습니다.`,
            `유월의 어느 날, 산길로 사람들이 올라왔습니다. 가마에 앉은 클라라와 그 할머니, 그리고 짐꾼들이었습니다. 하이디는 산길을 뛰어 내려가 마중을 나갔습니다.`,
            `클라라는 오두막 앞에 이르러 주위를 둘러보았습니다.`,
            `전나무 세 그루가 바람에 울고 있었습니다. 아래로 골짜기가 펼쳐졌고, 위로는 바위산이 솟아 있었습니다.`,
            `"하이디." 클라라가 말했습니다.<br>"네가 말한 그대로야."`,
            `할아버지는 클라라를 안아 바퀴 의자에서 걸상으로 옮겨 앉혔습니다. 그리고 염소젖을 한 잔 짜서 가져왔습니다. 클라라는 그 냄새를 맡고 얼굴을 찌푸렸습니다.`,
            `"드셔 보십시오." 할아버지가 말했습니다. 클라라는 한 모금 마시고 눈을 크게 떴습니다.<br>"맛있어요."`,
            `그날 저녁, 산봉우리가 붉게 물들었습니다. 클라라는 그것을 보고 아무 말도 하지 못했습니다.`,
            `그날 밤 클라라는 다락의 건초 위에서 잤습니다. 둥근 창으로 별이 보였습니다.`,
            `"하이디, 나는 이런 데서 자 본 적이 없어."`,
            `"어때?"<br>"이상해. 그런데 좋아."`,
            `클라라의 할머니는 며칠 뒤 산을 내려갔습니다.`,
            `"클라라를 잘 부탁드립니다." 할머니가 할아버지에게 말했습니다.<br>"염려 마십시오."`,
            `그해 여름 클라라는 그 산에서 지냈습니다. 클라라는 그 여름 산에서 하루하루가 달라졌습니다. 볕에 얼굴이 그을렸고, 밥을 두 그릇씩 먹었습니다.`,
            `밤에는 깊이 잤습니다. 프랑크푸르트에서는 늘 잠을 설쳤는데 여기서는 그러지 않았습니다.`,
            `아침에는 하이디가 클라라를 밖으로 데리고 나갔습니다. 그리고 산에 대해 하나씩 알려 주었습니다.`,
            `어느 바위 밑에 물이 나는지, 어느 풀을 염소가 좋아하는지, 매가 어느 시각에 뜨는지. 클라라는 그것을 다 외웠습니다.`,
            `"하이디, 나는 여기 있으면 내가 아픈 사람인 걸 잊어버려."`
        ]
    },
    {
        num: 12,
        title: "페터의 마음",
        emoji: "😠",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그런데 그해 여름 페터는 즐겁지 않았습니다. 하이디가 자기와 놀지 않았기 때문입니다.`,
            `아침에 염소를 몰고 올라가면 하이디는 늘 클라라 옆에 있었습니다. 클라라의 의자를 밀어 주고, 클라라에게 이것저것 설명해 주었습니다.`,
            `페터는 몇 번이나 하이디를 불렀지만 하이디는 클라라 곁을 떠나지 않았습니다.<br>"저 애가 오고 나서 다 이상해졌어." 페터가 중얼거렸습니다. 어느 아침, 페터가 오두막 앞으로 올라왔습니다.`,
            `아무도 없었습니다. 하이디와 할아버지는 안에 있었고, 클라라의 바퀴 의자만 문 앞에 놓여 있었습니다.`,
            `페터는 그 의자를 한참 노려보았습니다. 그리고 두 손으로 밀었습니다.`,
            `의자는 비탈을 굴러 내려갔습니다. 몇 번 튀어 오르더니 바위에 부딪히며 부서졌습니다. 그리고 낭떠러지 아래로 사라졌습니다.`,
            `페터는 그 자리에서 도망쳤습니다. 그날 오두막에서는 난리가 났습니다.`,
            `"의자가 없어졌어요!" 할아버지가 비탈 아래를 살펴보고 돌아왔습니다.<br>"바람에 굴렀나 보군."`,
            `그런데 클라라는 울지 않았습니다.`,
            `"그럼 저는 어떻게 하죠?"<br>"내가 업고 다니면 됩니다." 할아버지가 말했습니다.`,
            `그날부터 할아버지가 클라라를 업고 목장까지 올라갔습니다.`,
            `그리고 이렇게 말했습니다.<br>"아가씨, 오늘은 조금만 서 보시겠습니까. 제 팔을 잡고요."`,
            `클라라는 무서워했습니다.`,
            `"안 돼요. 저는 못 서요."<br>"넘어지면 제가 잡습니다."`,
            `클라라는 할아버지의 팔을 잡고 발을 땅에 디뎠습니다. 그리고 곧 소리를 질렀습니다.`,
            `"아파요!"<br>"그럼 오늘은 여기까지 합시다."`,
            `이튿날 할아버지가 또 그렇게 했습니다. 그다음 날도요.`,
            `클라라는 처음에 자기가 걷게 될 거라고 믿지 않았습니다. 의사도 여러 사람 만나 보았고, 다 안 된다고 했기 때문입니다. 그런데 알름 할아버지는 그런 말을 하지 않았습니다.`,
            `"오늘은 어제보다 조금만 더 해 봅시다."`,
            `그 말만 했습니다. 그리고 클라라가 아프다고 하면 그날은 거기서 그만두었습니다.`,
            `"더 하면 안 됩니까?"<br>"안 됩니다. 오늘은 여기까지가 오늘 몫입니다."`,
            `클라라는 그 말이 이상하게 마음에 남았습니다. 누가 자기에게 그렇게 말해 준 적이 없었기 때문입니다.`
        ]
    },
    {
        num: 13,
        title: "두 걸음",
        emoji: "🌼",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `어느 날 아침, 하이디가 클라라에게 꽃밭 이야기를 했습니다.`,
            `"저 위에 노란 꽃이 가득 핀 데가 있어. 온통 노래. 그걸 꼭 봐야 하는데."`,
            `"나는 못 가잖아."`,
            `그날 세 아이는 목장에 있었습니다. 하이디와 클라라와 페터였습니다.`,
            `페터는 그 여름 내내 마음이 편치 않았습니다. 자기가 한 일 때문이었습니다.`,
            `하이디가 말했습니다.`,
            `"페터, 우리 클라라를 저기까지 데려가자."<br>"어떻게."<br>"둘이서 붙잡고."`,
            `두 아이가 클라라의 양옆에 섰습니다.<br>"클라라, 발을 디뎌 봐."`,
            `클라라는 두 아이의 어깨를 붙잡고 일어섰습니다. 그리고 한 발을 내밀었습니다.`,
            `"아파."<br>"조금만 더."`,
            `또 한 발을 내밀었습니다. 두 걸음이었습니다.`,
            `클라라는 그 자리에 주저앉았습니다. 그런데 얼굴이 빨갛게 상기되어 있었습니다.`,
            `"하이디, 나 걸었어."`,
            `그날부터 세 아이는 날마다 그 연습을 했습니다. 두 걸음이 세 걸음이 되고, 세 걸음이 열 걸음이 되었습니다. 그동안 페터는 아무에게도 그 이야기를 하지 않았습니다. 그리고 어느 날 하이디에게 털어놓았습니다.`,
            `"하이디, 그 의자······ 내가 그랬어." 하이디는 한참 아무 말도 하지 않았습니다.`,
            `"왜 그랬어?"<br>"네가 나랑 안 놀아서."`,
            `하이디는 그 말을 듣고 화가 났습니다. 그런데 화가 오래가지 않았습니다.`,
            `"페터, 그 의자가 없어져서 클라라가 걷게 된 거야." 페터는 그 말이 무슨 뜻인지 잘 몰랐습니다.`,
            `"그러니까 나쁜 짓을 한 건 맞는데, 결과가 좋았다는 거야." 하이디가 말했습니다.<br>"그래도 할아버지한테는 말해."`,
            `페터는 며칠을 더 미루다가 결국 말했습니다. 할아버지는 페터를 한참 보았습니다.`,
            `"그래. 말했으니 됐다."`,
            `그것이 전부였습니다.`
        ]
    },
    {
        num: 14,
        title: "아버지가 오다",
        emoji: "🎩",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `가을이 되기 전, 제제만 씨가 산에 올라왔습니다. 딸을 데리러 온 것이었습니다. 그는 오두막 앞에서 하이디를 만났습니다.`,
            `"클라라는 어디 있느냐?"<br>"저기요."`,
            `제제만 씨가 돌아보았습니다. 풀밭 저쪽에서 사람이 걸어오고 있었습니다.`,
            `하이디가 한쪽 팔을 잡고, 알름 할아버지가 다른 쪽에 서 있었습니다. 그리고 그 사이에서 클라라가 걷고 있었습니다.`,
            `천천히 걸었습니다. 다리가 떨렸습니다. 그래도 걷고 있었습니다.`,
            `제제만 씨는 그 자리에 굳어 섰습니다. 그리고 두 손으로 얼굴을 가렸습니다. 클라라가 아버지 앞까지 와서 멈췄습니다.`,
            `"아버지, 저 걸어요."`,
            `제제만 씨는 무릎을 꿇고 딸을 안았습니다. 한참 뒤에 그는 할아버지에게 걸어갔습니다.`,
            `"무엇으로 갚아야 할지 모르겠습니다."<br>"갚을 것 없습니다." 할아버지가 말했습니다.<br>"산이 한 일입니다. 그리고 저 아이들이 한 일이고요."<br>"그래도 무엇이든 말씀해 주십시오."`,
            `할아버지는 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"저는 늙었습니다. 제가 죽고 나면 하이디에게는 아무도 없습니다."<br>"그 아이는 제 딸과 같습니다." 제제만 씨가 말했습니다.<br>"제가 살아 있는 동안 그 아이가 어려운 일을 겪는 일은 없을 겁니다. 약속드립니다."`,
            `그날 저녁 클라라의 할머니도 올라왔습니다. 할머니는 손녀가 걷는 것을 보고 아무 말도 하지 못했습니다. 그리고 페터를 불러 세웠습니다.`,
            `"너에게도 무언가 주고 싶구나. 무엇을 갖고 싶으냐?"`,
            `페터는 얼굴이 새빨개져서 아무 말도 못 했습니다. 그는 며칠 동안 자기가 벌을 받을 거라고 생각하고 있었기 때문입니다.`,
            `제제만 씨는 그날 저녁 하이디를 따로 불렀습니다.<br>"하이디야, 너에게 무엇을 해 주면 좋겠느냐. 무엇이든 말해 보아라."`,
            `하이디는 한참 생각했습니다.`,
            `그러고는 이렇게 말했습니다.<br>"페터의 할머니께 부드러운 빵을 보내 주세요."`,
            `"그것뿐이냐?"<br>"네. 할머니는 이가 없으셔서 딱딱한 빵을 못 드세요."`,
            `제제만 씨는 잠깐 아무 말도 하지 못했습니다. 그러고는 그렇게 하겠다고 했습니다. 그리고 그 약속은 할머니가 살아 계신 동안 지켜졌습니다.`
        ]
    },
    {
        num: 15,
        title: "전나무 소리",
        emoji: "🌲",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `클라라가 떠나기 전날, 두 아이는 목장에 앉아 있었습니다.`,
            `"하이디, 나 내년에도 올 거야."<br>"응."`,
            `"그때는 혼자 걸어서 올라올 거야." 클라라는 그렇게 말하고 웃었습니다.`,
            `이튿날 아침 가마가 준비되었습니다. 그런데 클라라는 타지 않겠다고 했습니다.`,
            `"조금이라도 걸어서 내려갈래요."`,
            `그래서 산길 첫머리까지는 걸어서 내려갔습니다. 그 뒤로 여러 해가 지났습니다.`,
            `클라라는 해마다 여름에 산으로 왔습니다. 그리고 해마다 조금씩 더 걸었습니다.`,
            `페터의 할머니는 겨울마다 새 숄을 받았습니다. 클라라의 할머니가 보낸 것이었습니다. 그리고 하얀 빵이 끊이지 않았습니다.`,
            `페터는 글을 읽게 되었습니다. 아주 잘 읽지는 못했지만, 할머니에게 찬송가를 읽어 드릴 수는 있게 되었습니다.`,
            `알름 할아버지는 마을에 자주 내려갔습니다.`,
            `이제 사람들은 그를 보고 길을 비키지 않았습니다. 오히려 인사를 했습니다.`,
            `하이디는 학교에 다녔고, 겨울에는 마을에서 여름에는 산에서 지냈습니다. 밤에 다락 창으로 별을 보다가 하이디는 가끔 이런 생각을 했습니다. 프랑크푸르트의 그 큰 집에서 밤마다 문 앞에 서 있던 때를요.`,
            `그때 아이는 자기가 무엇을 그리워하는지도 몰랐습니다. 다만 견딜 수가 없어서 자면서 걸어 나갔던 것입니다.`,
            `이제는 압니다. 창밖에서 전나무 세 그루가 낮게 울고 있었습니다. 하이디는 그 소리를 들으며 잠들었습니다.`,
            `클라라의 할머니는 페터를 다시 불렀습니다. 페터는 이번에도 얼굴이 새빨개졌습니다.`,
            `"무엇을 갖고 싶으냐?"<br>"······없습니다."`,
            `할머니는 웃으면서 페터의 손에 돈을 쥐여 주었습니다.`,
            `"이건 해마다 보내마. 겨울에 쓰거라."`,
            `페터는 그 돈을 들고 집으로 뛰어갔습니다. 그리고 할머니에게 그것을 다 드렸습니다.`,
            `"할머니, 이제 겨울에 나무 살 수 있어요." 페터의 할머니는 손자의 머리를 쓰다듬었습니다.`
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
                ${artFrame('cover.png', '⛰️')}
            </div>
            <div class="story-page-right">
                <h1>알프스의 소녀 하이디</h1>
                <p class="cover-tag">요한나 슈피리 원작</p>
                <p>부모를 잃은 다섯 살 하이디가 알프스 산꼭대기의 할아버지에게 맡겨집니다. 마을 사람들이 무서워하며 피하던 노인이었습니다.</p>
                <p>산에서 자라던 아이가 어느 날 도시의 큰 집으로 보내지면서, 아이도 노인도 자기가 무엇을 잃었는지 알게 되는 이야기입니다.</p>
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
    { q: "하이디를 산으로 데려간 사람은 누구입니까?", choices: ["데테 이모", "페터", "목사님"], answer: 0 },
    { q: "하이디가 산길에서 옷을 벗어 던진 까닭은 무엇입니까?", choices: ["옷이 미워서", "여러 벌 껴입어 더워서", "이모에게 화가 나서"], answer: 1 },
    { q: "하이디가 산 위에서 잠자리로 고른 곳은 어디입니까?", choices: ["건초가 쌓인 다락", "할아버지 침대", "염소 우리 옆"], answer: 0 },
    { q: "하이디가 할아버지의 염소 두 마리에게 붙인 이름은 무엇입니까?", choices: ["백조와 곰", "눈과 밤", "구름과 바위"], answer: 0 },
    { q: "저녁에 산봉우리가 붉어지는 것을 보고 하이디가 처음에 한 생각은 무엇입니까?", choices: ["해가 진다", "산에 불이 났다", "비가 온다"], answer: 1 },
    { q: "페터의 할머니에게 있는 어려움은 무엇입니까?", choices: ["귀가 들리지 않는다", "앞이 보이지 않는다", "걷지 못한다"], answer: 1 },
    { q: "하이디가 할머니의 찬송가를 읽어 드리지 못한 까닭은 무엇입니까?", choices: ["책이 낡아서", "글을 몰라서", "시간이 없어서"], answer: 1 },
    { q: "할아버지가 페터의 집에 가서 한 일은 무엇입니까?", choices: ["부서진 덧문을 고쳤다", "염소를 주었다", "돈을 주었다"], answer: 0 },
    { q: "클라라가 바퀴 의자에 앉아 지낸 까닭은 무엇입니까?", choices: ["다쳐서", "다리가 약해 걷지 못해서", "벌을 받아서"], answer: 1 },
    { q: "하이디가 하얀 빵을 먹지 않고 모은 까닭은 무엇입니까?", choices: ["배가 불러서", "페터의 할머니께 드리려고", "맛이 없어서"], answer: 1 },
    { q: "프랑크푸르트에서 밤마다 현관문이 열려 있던 까닭은 무엇입니까?", choices: ["도둑이 들어서", "하이디가 자면서 걸어 나가서", "하인이 잊어서"], answer: 1 },
    { q: "의사가 내린 처방은 무엇입니까?", choices: ["약을 먹인다", "집으로 돌려보낸다", "더 쉬게 한다"], answer: 1 },
    { q: "할아버지가 겨울에 마을로 내려와 지낸 까닭은 무엇입니까?", choices: ["산이 추워서", "하이디를 학교에 보내려고", "돈이 떨어져서"], answer: 1 },
    { q: "페터가 클라라의 바퀴 의자를 밀어 버린 까닭은 무엇입니까?", choices: ["실수로", "하이디를 빼앗겼다고 여겨서", "의자가 낡아서"], answer: 1 },
    { q: "클라라가 걷게 되는 데 도움이 된 것은 무엇입니까?", choices: ["새 약", "새 의사", "날마다 한 걸음씩 늘린 연습"], answer: 2 },
    { q: "페터가 자기 잘못을 털어놓았을 때 할아버지가 한 말은 무엇입니까?", choices: ["말했으니 됐다", "다시는 오지 마라", "값을 물어라"], answer: 0 }
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
            ${artFrame('end.png', '🌲')}
            <h2>알프스의 소녀 하이디를 다 읽었습니다</h2>
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
