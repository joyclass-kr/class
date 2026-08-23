const BOOK_TITLE = "닐스의 이상한 여행";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "작아진 아이",
        emoji: "🧝",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `스웨덴 남쪽 끝에 스코네라는 지방이 있습니다.`,
            `밭이 넓고 바다가 가까운 곳입니다.`,
            `그 지방의 어느 농가에 닐스라는 아이가 살았습니다.`,
            `열네 살이었습니다.`,
            `닐스는 마을에서 손꼽히게 못된 아이였습니다.`,
            `일을 시키면 도망쳤고, 책을 펴면 잤습니다.`,
            `그리고 짐승을 괴롭혔습니다.`,
            `고양이 꼬리를 밟고, 거위를 쫓아 몰고, 새 둥지를 헐었습니다.`,
            `그 집 짐승들은 다 닐스를 무서워했습니다.`,
            `삼월 어느 일요일 아침이었습니다.`,
            `부모가 교회에 가면서 닐스에게 말했습니다.`,
            `"오늘은 성경을 열 쪽만 읽어라."`,
            `"네."`,
            `두 사람이 나가자 닐스는 곧 책상에 엎드렸습니다.`,
            `그리고 졸았습니다.`,
            `그때 방 안에서 무언가 움직이는 소리가 났습니다.`,
            `닐스가 고개를 들어 보니, 어머니의 옷장 뚜껑이 열려 있었습니다.`,
            `그리고 그 안에서 아주 작은 사람이 무언가를 뒤지고 있었습니다.`,
            `손바닥만 한 사람이었습니다.`,
            `수염이 있고, 챙 넓은 모자를 쓰고, 무릎 아래를 여민 바지를 입고 있었습니다.`,
            `스웨덴 시골에서 톰테라고 부르는 것이었습니다.`,
            `집을 지켜 준다는 작은 도깨비입니다.`,
            `닐스는 잠자리채를 들었습니다.`,
            `그리고 그것을 덮어씌워 잡았습니다.`,
            `톰테가 말했습니다.`,
            `"놓아 다오. 놓아 주면 은동전 하나를 주마."`,
            `닐스는 그 말을 듣고 욕심이 났습니다.`,
            `"동전 하나로는 안 돼요."`,
            `"그럼 무엇을 원하느냐."`,
            `"금동전 두 개하고, 은수저하고, 저 옷장 안에 있는 것 다요."`,
            `톰테는 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.`,
            `"너는 참 못된 아이로구나."`,
            `닐스가 잠자리채를 흔들었습니다.`,
            `그때 톰테가 빠져나왔습니다.`,
            `그리고 닐스의 뺨을 한 대 쳤습니다.`,
            `아주 작은 손이었는데 눈앞이 캄캄해졌습니다.`,
            `닐스는 그 자리에 쓰러졌습니다.`
        ]
    },
    {
        num: 2,
        title: "거위 등에 오르다",
        emoji: "🪿",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `닐스가 눈을 떴을 때 방이 아주 이상했습니다.`,
            `천장이 까마득히 높았습니다.`,
            `의자가 산처럼 컸습니다.`,
            `닐스는 거울 앞으로 갔습니다.`,
            `그리고 그 안을 보았습니다.`,
            `자기가 톰테만큼 작아져 있었습니다.`,
            `닐스는 소리를 질렀습니다.`,
            `그런데 그때 이상한 일이 하나 더 있었습니다.`,
            `밖에서 참새들이 하는 말이 들렸습니다.`,
            `"저것 봐! 저 못된 애가 저렇게 됐어!"`,
            `"쌤통이다!"`,
            `짐승의 말이 다 들렸습니다.`,
            `닐스는 마당으로 나갔습니다.`,
            `고양이가 앞을 막았습니다.`,
            `닐스는 늘 하던 대로 발로 차려고 했습니다.`,
            `그런데 이제 그 고양이가 닐스보다 훨씬 컸습니다.`,
            `고양이가 앞발로 닐스를 눌렀습니다.`,
            `그리고 이렇게 말했습니다.`,
            `"이제 내가 원하면 언제든 되겠구나."`,
            `그러고는 놓아 주었습니다.`,
            `거위 우리 앞을 지나는데 거위들이 소리쳤습니다.`,
            `"저 애가 우리를 얼마나 괴롭혔는데!"`,
            `그때 하늘에서 소리가 났습니다.`,
            `기러기 떼였습니다.`,
            `삼월이라 북쪽으로 올라가는 길이었습니다.`,
            `기러기들이 아래를 내려다보며 소리쳤습니다.`,
            `"올라와라! 우리와 함께 라플란드로 가자!"`,
            `그 집 거위들은 다 우리 안에서 목만 뺐습니다.`,
            `그런데 하얀 수거위 한 마리가 날개를 폈습니다.`,
            `이름은 모르텐이었습니다.`,
            `모르텐은 집거위였습니다.`,
            `집거위는 오래 날지 못합니다.`,
            `살이 쪄서 그렇습니다.`,
            `그런데 모르텐은 늘 날고 싶어 했습니다.`,
            `모르텐이 날개를 치며 뛰었습니다.`,
            `그리고 공중으로 떠올랐습니다.`,
            `닐스는 그것을 보고 뛰어가 그 목을 붙잡았습니다.`,
            `말리려고 한 것이었습니다.`,
            `"안 돼! 내려와!"`,
            `그런데 모르텐은 이미 올라가고 있었습니다.`,
            `닐스는 그 목에 매달린 채 하늘로 올라갔습니다.`,
            `아래로 자기 집이 점점 작아졌습니다.`
        ]
    },
    {
        num: 3,
        title: "아카",
        emoji: "🕊️",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `기러기 떼의 우두머리는 아주 늙은 암컷이었습니다.`,
            `이름은 케브네카이세의 아카였습니다.`,
            `케브네카이세는 스웨덴에서 제일 높은 산 이름입니다.`,
            `아카는 그 산에서 태어났고, 백 살이 넘었다고 했습니다.`,
            `그해에도 아카가 무리를 이끌고 북쪽으로 가는 길이었습니다.`,
            `저녁이 되자 무리가 호수에 내려앉았습니다.`,
            `아카가 모르텐 앞에 왔습니다.`,
            `"너는 집거위구나."`,
            `"그렇습니다."`,
            `"집거위는 우리를 따라올 수 없다. 라플란드까지는 아주 멀다."`,
            `"저는 갈 수 있습니다."`,
            `"그리고 저 아이는 무엇이냐."`,
            `아카가 닐스를 보았습니다.`,
            `"사람 아니냐. 사람은 안 된다."`,
            `모르텐이 말했습니다.`,
            `"이 아이는 이제 사람이 아닙니다. 사람들도 이 아이를 못 알아봅니다."`,
            `아카는 한참 닐스를 보았습니다.`,
            `그러고는 이렇게 말했습니다.`,
            `"내일 아침까지 따라와 봐라. 못 따라오면 두고 간다."`,
            `그날 밤 여우가 하나 그 호숫가에 왔습니다.`,
            `스미레라는 여우였습니다.`,
            `여우는 물가에서 자는 기러기를 노렸습니다.`,
            `기러기들은 물 한가운데 얼음 위에서 잤습니다.`,
            `여우가 얼음 위로 살금살금 갔습니다.`,
            `그때 닐스가 그것을 보았습니다.`,
            `닐스는 소리를 질렀습니다.`,
            `"아카! 여우예요!"`,
            `기러기들이 다 날아올랐습니다.`,
            `여우는 아무것도 못 잡았습니다.`,
            `그런데 마지막에 한 마리를 물었습니다.`,
            `닐스는 그것을 보고 달려갔습니다.`,
            `그리고 여우 꼬리를 붙잡았습니다.`,
            `여우가 놀라 입을 벌렸습니다.`,
            `기러기가 빠져나갔습니다.`,
            `여우는 그 뒤로 닐스를 미워했습니다.`,
            `그리고 그해 내내 그 무리를 쫓아다녔습니다.`,
            `이튿날 아침, 아카가 닐스에게 말했습니다.`,
            `"너를 데려가겠다."`,
            `"왜요?"`,
            `"어젯밤 일 때문이다."`,
            `그리고 이렇게 덧붙였습니다.`,
            `"그런데 하나 알아 두어라. 우리는 너를 태워 주는 것이 아니라 함께 가는 것이다."`
        ]
    },
    {
        num: 4,
        title: "글리밍겐 성의 황새",
        emoji: "🏰",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `스코네에 글리밍겐이라는 오래된 돌집이 있었습니다.`,
            `벽이 아주 두꺼운 성이었습니다.`,
            `그 지붕에 황새 부부가 둥지를 틀고 살았습니다.`,
            `수컷 황새의 이름은 에르멘리히였습니다.`,
            `어느 날 에르멘리히가 아카를 찾아왔습니다.`,
            `"큰일 났습니다. 쥐들이 몰려옵니다."`,
            `그 성에는 오래전부터 쥐가 살고 있었습니다.`,
            `회색 쥐라고 불리는 것들이었습니다.`,
            `그런데 그 성의 지하에 다른 쥐들이 살고 있었습니다.`,
            `검은 쥐라고 불렀습니다.`,
            `검은 쥐들은 오래전부터 그 성에 살던 쥐들이었고, 회색 쥐들은 나중에 온 쥐들이었습니다.`,
            `회색 쥐가 수가 훨씬 많았습니다.`,
            `그리고 그 성을 통째로 빼앗으려고 몰려오고 있었습니다.`,
            `"그 성에는 사람이 없습니까?"`,
            `"없습니다. 오래전에 비었습니다."`,
            `아카가 말했습니다.`,
            `"우리는 도울 수 없다. 우리에게는 이빨도 발톱도 없다."`,
            `그때 닐스가 말했습니다.`,
            `"저한테 방법이 있을지도 몰라요."`,
            `닐스는 그 성 지하에서 무언가를 찾았습니다.`,
            `피리였습니다.`,
            `아주 오래된 나무 피리였습니다.`,
            `닐스는 그것을 불었습니다.`,
            `그러자 쥐들이 그 소리를 따라오기 시작했습니다.`,
            `회색 쥐들이 다 나왔습니다.`,
            `닐스는 피리를 불며 걸었습니다.`,
            `성 밖으로, 들판을 가로질러, 호수 쪽으로.`,
            `쥐들이 다 따라왔습니다.`,
            `그리고 닐스는 그 쥐들을 아주 먼 데까지 데려갔습니다.`,
            `여기서 한 가지를 짚어 두어야 합니다.`,
            `이 대목은 독일에 전해 오는 '하멜른의 피리 부는 사나이' 이야기에서 온 것입니다.`,
            `이 책을 쓴 셀마 라겔뢰프는 그 이야기를 잘 알고 있었습니다.`,
            `그리고 일부러 가져다 썼습니다.`,
            `다만 하멜른의 피리 부는 사나이는 값을 못 받자 아이들까지 데려갔습니다.`,
            `닐스는 아무 값도 받지 않았습니다.`,
            `황새 에르멘리히가 물었습니다.`,
            `"무엇을 드리면 되겠습니까."`,
            `닐스가 말했습니다.`,
            `"제가 언제 다시 사람이 되는지 아세요?"`,
            `"모릅니다."`,
            `"그럼 됐습니다."`
        ]
    },
    {
        num: 5,
        title: "학들의 춤",
        emoji: "🦩",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `해마다 봄이면 쿨라베리라는 산에서 큰 모임이 열렸습니다.`,
            `짐승들의 모임이었습니다.`,
            `그날 하루만은 서로 잡아먹지 않기로 되어 있었습니다.`,
            `사슴과 늑대가 같은 자리에 있어도 아무 일이 없었습니다.`,
            `그런 규칙이 아주 오래전부터 있었습니다.`,
            `기러기 무리도 그리로 갔습니다.`,
            `닐스는 모르텐의 등에 앉아 그것을 보았습니다.`,
            `산기슭 넓은 풀밭에 짐승이 가득했습니다.`,
            `까마귀와 갈까마귀가 하늘을 덮었고, 사슴과 노루가 줄지어 서 있었습니다.`,
            `그리고 놀이가 시작되었습니다.`,
            `먼저 산토끼들이 나와 달음질을 했습니다.`,
            `그다음에 뇌조들이 나와 노래를 불렀습니다.`,
            `그다음에 사슴들이 뿔을 맞대고 겨루었습니다.`,
            `마지막에 학들이 나왔습니다.`,
            `학들이 춤을 추었습니다.`,
            `풀밭 한가운데에서 회색 새들이 목을 세우고, 날개를 반쯤 펴고, 뛰어올랐다가 내려앉았습니다.`,
            `아무도 소리를 내지 않았습니다.`,
            `닐스는 그것을 보다가 목이 메었습니다.`,
            `왜 그런지 몰랐습니다.`,
            `그런데 그날 그 모임에서 사고가 하나 났습니다.`,
            `여우 스미레가 규칙을 어긴 것입니다.`,
            `기러기를 하나 물어 갔습니다.`,
            `그날은 그러면 안 되는 날이었습니다.`,
            `짐승들이 스미레를 붙잡았습니다.`,
            `그리고 벌을 내렸습니다.`,
            `벌은 이랬습니다.`,
            `스미레는 그날부터 그 지방에서 쫓겨났습니다.`,
            `그리고 어느 짐승도 그와 말을 섞지 않기로 했습니다.`,
            `죽이지는 않았습니다.`,
            `짐승들의 규칙에는 죽이는 벌이 없었습니다.`,
            `스미레는 혼자 산을 내려갔습니다.`,
            `닐스는 그것을 보면서 이상한 마음이 들었습니다.`,
            `그 여우는 자기를 여러 번 죽이려고 한 짐승이었습니다.`,
            `그런데 그 뒷모습을 보고 있으니 마음이 편치 않았습니다.`
        ]
    },
    {
        num: 6,
        title: "빙어 마을",
        emoji: "🌊",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `무리는 북쪽으로 올라가면서 여러 곳을 지났습니다.`,
            `이 책은 사실 스웨덴의 지리를 가르치려고 쓴 책입니다.`,
            `백이십 년쯤 전에, 스웨덴의 학교에서 쓸 책이 필요했습니다.`,
            `아이들에게 이 나라가 어떻게 생겼는지 가르치는 책이었습니다.`,
            `그 일을 셀마 라겔뢰프라는 작가에게 맡겼습니다.`,
            `라겔뢰프는 삼 년 동안 스웨덴 곳곳을 돌아다녔습니다.`,
            `그리고 이 이야기를 썼습니다.`,
            `그래서 닐스가 지나가는 곳은 다 실제로 있는 곳입니다.`,
            `산도 호수도 도시도 다 진짜입니다.`,
            `그 가운데 이런 곳이 있었습니다.`,
            `발트해 어느 섬에 낡은 성터가 있었습니다.`,
            `사람이 살지 않는 곳이었습니다.`,
            `닐스는 어느 밤 그 섬에 내렸습니다.`,
            `그리고 이상한 것을 보았습니다.`,
            `밤중에 그 성터에 도시가 나타난 것입니다.`,
            `사람들이 걸어 다니고, 가게에 물건이 쌓여 있고, 항구에 배가 들어와 있었습니다.`,
            `아주 오래전 옷을 입은 사람들이었습니다.`,
            `닐스는 어느 가게로 들어갔습니다.`,
            `상인이 물건을 보여 주었습니다.`,
            `"이걸 사시오. 값은 동전 하나면 되오."`,
            `닐스는 주머니를 뒤졌습니다.`,
            `아무것도 없었습니다.`,
            `상인이 다른 가게로 데려갔습니다.`,
            `거기서도 값은 동전 하나였습니다.`,
            `그 도시 사람들이 다 몰려나와 닐스를 둘러쌌습니다.`,
            `다들 무언가를 팔려고 했습니다.`,
            `값은 다 동전 하나였습니다.`,
            `닐스는 그 동전이 없었습니다.`,
            `그러자 새벽닭이 울었습니다.`,
            `그리고 도시가 사라졌습니다.`,
            `닐스는 빈 성터에 혼자 서 있었습니다.`,
            `나중에 닐스가 아카에게 그 이야기를 했습니다.`,
            `아카가 말했습니다.`,
            `"백 년에 한 번 그 도시가 나타난다고 한다. 그리고 그 밤에 누가 그 도시에서 물건을 하나라도 사면, 그 도시가 다시 살아난다고 한다."`,
            `닐스는 그 자리에 주저앉았습니다.`,
            `"제가 동전이 없어서······."`,
            `"그래."`,
            `그날 닐스는 밤새 울었습니다.`,
            `자기 때문이 아니라 그 도시 사람들 때문이었습니다.`,
            `닐스가 그런 마음을 낸 것은 그때가 처음이었습니다.`
        ]
    },
    {
        num: 7,
        title: "곰의 굴",
        emoji: "🐻",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `무리가 더 북쪽으로 올라갔습니다.`,
            `그 지방에는 광산이 있었습니다.`,
            `쇠를 캐는 광산이었습니다.`,
            `어느 날 닐스가 무리에서 떨어졌습니다.`,
            `바람이 세게 불어 모르텐의 등에서 미끄러진 것입니다.`,
            `닐스는 숲에 떨어졌습니다.`,
            `그리고 밤이 되었습니다.`,
            `추워서 굴을 찾다가 어느 굴로 들어갔습니다.`,
            `안이 따뜻했습니다.`,
            `그런데 그 굴이 곰의 굴이었습니다.`,
            `어미 곰이 새끼 둘과 함께 자고 있었습니다.`,
            `새끼들이 먼저 닐스를 찾아냈습니다.`,
            `그리고 장난감처럼 굴리며 놀았습니다.`,
            `어미 곰이 깼습니다.`,
            `그리고 닐스를 앞발로 눌렀습니다.`,
            `"사람 냄새가 나는구나."`,
            `"저는 사람이 아니에요."`,
            `"사람 냄새가 난다."`,
            `그때 밖에서 소리가 났습니다.`,
            `사람들이었습니다.`,
            `광산 사람들이 다이너마이트를 들고 그 굴을 찾아온 것이었습니다.`,
            `그 곰이 광산 근처에 나타나 골칫거리였기 때문입니다.`,
            `어미 곰이 굳었습니다.`,
            `사람들이 굴 앞에 화약을 놓았습니다.`,
            `그리고 심지에 불을 붙이려고 했습니다.`,
            `닐스가 소리쳤습니다.`,
            `"저를 놓아 주세요! 제가 저걸 끄겠어요!"`,
            `어미 곰이 닐스를 놓았습니다.`,
            `닐스는 굴 밖으로 기어 나갔습니다.`,
            `그리고 이미 불이 붙은 심지를 붙잡았습니다.`,
            `불꽃이 손을 태웠습니다.`,
            `닐스는 그것을 눌러 껐습니다.`,
            `사람들은 아무것도 보지 못했습니다.`,
            `너무 작았기 때문입니다.`,
            `사람들은 화약이 불량이라고 여기고 돌아갔습니다.`,
            `닐스가 굴로 돌아왔습니다.`,
            `어미 곰이 한참 닐스를 보았습니다.`,
            `그러고는 이렇게 말했습니다.`,
            `"가거라."`,
            `"저를 안 잡아먹으시겠어요?"`,
            `"오늘은 안 잡아먹는다. 다음에 만나면 모른다."`,
            `닐스는 그것으로 됐다고 생각했습니다.`
        ]
    },
    {
        num: 8,
        title: "청동상과 나무상",
        emoji: "🗿",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `무리가 스톡홀름 근처를 지날 때의 일입니다.`,
            `닐스는 그 도시에 하루 내렸습니다.`,
            `그리고 공원에서 노인을 하나 만났습니다.`,
            `그 노인은 닐스를 보고도 놀라지 않았습니다.`,
            `그리고 스웨덴 이야기를 오래 해 주었습니다.`,
            `그 노인은 그 공원의 야외 박물관을 지키는 사람이었습니다.`,
            `밤이 되었습니다.`,
            `닐스는 공원에 남아 있었습니다.`,
            `그리고 아주 이상한 일을 겪었습니다.`,
            `공원 한쪽에 커다란 청동 기마상이 있었습니다.`,
            `옛날 왕의 상이었습니다.`,
            `그런데 그 상이 말에서 내려 걷기 시작했습니다.`,
            `발소리가 온 도시에 울렸습니다.`,
            `닐스는 무서워서 달아났습니다.`,
            `청동상이 따라왔습니다.`,
            `닐스는 항구 쪽으로 달렸습니다.`,
            `거기에 다른 상이 하나 있었습니다.`,
            `나무로 만든 뱃사람 상이었습니다.`,
            `아주 낡은 것이었습니다.`,
            `닐스가 그 뒤로 숨었습니다.`,
            `그러자 그 나무상도 움직였습니다.`,
            `그리고 청동상 앞을 막아섰습니다.`,
            `두 상이 마주 섰습니다.`,
            `청동상이 말했습니다.`,
            `"비켜라."`,
            `나무상이 말했습니다.`,
            `"이 아이가 무엇을 잘못했습니까."`,
            `"나를 보고 달아났다."`,
            `"그건 무서워서 그런 것입니다."`,
            `그때 새벽닭이 울었습니다.`,
            `두 상은 그 자리에 멈췄습니다.`,
            `그리고 다시 상이 되었습니다.`,
            `닐스는 그 나무상 발치에 앉아 아침까지 있었습니다.`,
            `그리고 그 뒤로 그 이야기를 아무에게도 하지 않았습니다.`,
            `누가 믿겠습니까.`,
            `이 대목을 두고 사람들은 여러 가지를 말합니다.`,
            `어떤 사람은 이것이 스웨덴의 역사를 말한 것이라고 합니다.`,
            `청동상은 전쟁을 하던 시절의 왕이고, 나무상은 배를 타고 일하던 보통 사람이라는 것입니다.`,
            `그리고 아이를 지킨 것은 나무상이었습니다.`
        ]
    },
    {
        num: 9,
        title: "돌아가고 싶은 마음",
        emoji: "🏠",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `여름이 되자 무리는 라플란드에 닿았습니다.`,
            `스웨덴의 제일 북쪽입니다.`,
            `여름에 해가 지지 않는 곳입니다.`,
            `기러기들은 그곳에서 알을 낳고 새끼를 길렀습니다.`,
            `모르텐도 짝을 만났습니다.`,
            `던핀이라는 이름의 기러기였습니다.`,
            `모르텐과 던핀 사이에 새끼가 여섯 마리 났습니다.`,
            `닐스는 그 여름 동안 그 새끼들을 돌보았습니다.`,
            `그리고 그해 여름에 닐스는 아주 달라졌습니다.`,
            `스스로도 그것을 알았습니다.`,
            `어느 날 아카가 물었습니다.`,
            `"너는 사람으로 돌아가고 싶으냐."`,
            `닐스는 잠깐 대답하지 못했습니다.`,
            `"모르겠어요."`,
            `"왜 모르느냐."`,
            `"사람으로 돌아가면 이 말들이 안 들리잖아요."`,
            `아카는 그 말에 아무 대꾸도 하지 않았습니다.`,
            `그해 가을, 무리가 남쪽으로 내려가기 시작했습니다.`,
            `가는 길에 닐스는 여러 번 자기 마을 쪽을 보았습니다.`,
            `그리고 어머니와 아버지를 생각했습니다.`,
            `봄에 떠날 때는 그 생각을 하지 않았습니다.`,
            `그해 가을에는 자꾸 났습니다.`,
            `어느 날 닐스는 자기 집에 몰래 가 보았습니다.`,
            `창으로 들여다보았습니다.`,
            `어머니가 식탁에 앉아 있었습니다.`,
            `아버지가 옆에 있었습니다.`,
            `두 사람은 아무 말도 하지 않고 있었습니다.`,
            `닐스가 없어진 뒤로 두 사람이 어떻게 지냈는지 닐스는 그때 알았습니다.`,
            `두 사람은 닐스를 찾아 여기저기 다녔습니다.`,
            `그리고 못 찾았습니다.`,
            `그리고 그 집을 팔지 못하고 있었습니다.`,
            `닐스가 돌아올지도 모른다고 여겼기 때문입니다.`,
            `닐스는 그 창밑에 오래 앉아 있었습니다.`,
            `그리고 그날 돌아가기로 마음을 정했습니다.`
        ]
    },
    {
        num: 10,
        title: "다시 사람이 되는 값",
        emoji: "🪶",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그런데 어떻게 하면 사람이 되는지를 아무도 몰랐습니다.`,
            `닐스는 여러 사람에게 물었습니다.`,
            `그러다 어느 날 대답을 들었습니다.`,
            `올빼미가 이런 이야기를 하는 것을 들은 것입니다.`,
            `"내가 톰테에게 들었는데, 그 아이가 사람이 되는 방법이 있다더군."`,
            `"뭔데?"`,
            `"자기 대신 다른 누구를 그렇게 만들면 된다더군."`,
            `닐스는 그 말을 듣고 얼어붙었습니다.`,
            `자기 대신 누군가가 작아져야 한다는 것이었습니다.`,
            `그 뒤로 닐스는 여러 날 잠을 못 잤습니다.`,
            `그리고 이 이야기의 여러 판본에서 그다음이 조금씩 다릅니다.`,
            `가장 널리 전해지는 것은 이렇습니다.`,
            `무리가 남쪽으로 내려와 닐스의 마을 가까이에 이르렀습니다.`,
            `그리고 그때 일이 났습니다.`,
            `닐스의 아버지가 밭에서 모르텐을 발견한 것입니다.`,
            `봄에 날아간 자기 집 거위였습니다.`,
            `아버지는 그것을 붙잡았습니다.`,
            `그리고 부엌으로 가져갔습니다.`,
            `그날 저녁 손님이 오기로 되어 있었습니다.`,
            `모르텐과 던핀과 새끼 여섯 마리가 다 붙잡혔습니다.`,
            `닐스는 그것을 창밖에서 보았습니다.`,
            `그리고 방법이 없었습니다.`,
            `작은 몸으로는 아무것도 할 수 없었습니다.`,
            `닐스는 그때 이렇게 생각했습니다.`,
            `'내가 사람이면 저것을 막을 수 있는데.'`,
            `그리고 그 순간이었습니다.`,
            `닐스가 부엌으로 뛰어들어 갔습니다.`,
            `그리고 소리를 질렀습니다.`,
            `"안 돼요!"`,
            `그 소리가 아주 컸습니다.`,
            `어머니가 돌아보았습니다.`,
            `부엌 한가운데에 열네 살짜리 아이가 서 있었습니다.`,
            `닐스였습니다.`,
            `그 순간 사람이 된 것이었습니다.`,
            `누구를 대신 작게 만들어서가 아니었습니다.`,
            `자기가 사람이면 무엇을 할 수 있는지를 처음으로 생각했기 때문입니다.`,
            `그전까지 닐스는 사람인 것으로 남을 괴롭히기만 했습니다.`
        ]
    },
    {
        num: 11,
        title: "그날 저녁",
        emoji: "🕯️",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `어머니가 그 자리에 주저앉았습니다.`,
            `아버지는 손에 든 것을 떨어뜨렸습니다.`,
            `"닐스냐."`,
            `"저예요."`,
            `"어디 있었느냐."`,
            `닐스는 대답하려다가 말았습니다.`,
            `말해도 믿지 않을 것이었기 때문입니다.`,
            `그때 닐스가 제일 먼저 한 말은 이것이었습니다.`,
            `"저 거위들 놓아 주세요."`,
            `아버지가 물었습니다.`,
            `"왜?"`,
            `"제 친구예요."`,
            `아버지는 그 말이 무슨 뜻인지 몰랐습니다.`,
            `그런데 여덟 달 만에 돌아온 아들이 처음으로 한 부탁이었습니다.`,
            `그래서 놓아 주었습니다.`,
            `모르텐과 던핀과 새끼들이 마당으로 나갔습니다.`,
            `그리고 하늘로 올라갔습니다.`,
            `그날 저녁, 마당에서 기러기 소리가 났습니다.`,
            `닐스가 나가 보았습니다.`,
            `무리가 낮게 날면서 지나가고 있었습니다.`,
            `아카가 맨 앞에 있었습니다.`,
            `닐스는 손을 들었습니다.`,
            `그런데 아무 소리도 들리지 않았습니다.`,
            `기러기 소리는 났습니다.`,
            `그런데 그것이 무슨 말인지 알 수 없었습니다.`,
            `닐스는 그 자리에 서서 그 소리를 들었습니다.`,
            `그리고 처음으로 자기가 무엇을 잃었는지 알았습니다.`,
            `무리가 지나가고 하늘이 조용해졌습니다.`,
            `닐스는 한참 마당에 서 있었습니다.`,
            `그러고는 안으로 들어갔습니다.`,
            `그날 밤 어머니가 이렇게 물었습니다.`,
            `"닐스야, 너 어디 아프냐? 얼굴이 달라졌다."`,
            `아버지가 말했습니다.`,
            `"컸구먼."`,
            `그 뒤로 닐스는 그 여덟 달 이야기를 아무에게도 하지 않았습니다.`,
            `다만 그 뒤로 짐승을 괴롭히지 않았습니다.`,
            `그리고 봄이 되면 하늘을 보았습니다.`,
            `이 책을 쓴 셀마 라겔뢰프는 여자로서는 처음으로 노벨 문학상을 받았습니다.`,
            `이 책이 나온 지 몇 해 뒤였습니다.`,
            `학교에서 쓸 지리 교과서로 시작한 책이었습니다.`
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
                ${artFrame('cover.png', '🪿')}
            </div>
            <div class="story-page-right">
                <h1>닐스의 이상한 여행</h1>
                <p class="cover-tag">셀마 라겔뢰프 원작</p>
                <p>짐승 괴롭히기를 일삼던 열네 살 닐스가 손바닥만 하게 작아집니다. 그리고 집거위 모르텐의 등에 매달려 기러기 떼를 따라 스웨덴 끝까지 올라갑니다.</p>
                <p>학교에서 쓸 지리 교과서로 시작한 책입니다. 닐스가 지나가는 산과 호수와 도시는 다 실제로 있는 곳입니다.</p>
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
    { q: "닐스가 작아진 까닭은 무엇입니까?", choices: ["병에 걸려서", "톰테를 잡아 놓고 욕심을 부려서", "약을 먹어서"], answer: 1 },
    { q: "작아진 닐스에게 생긴 능력은 무엇입니까?", choices: ["짐승의 말이 들린다", "날 수 있다", "힘이 세진다"], answer: 0 },
    { q: "닐스를 태우고 날아간 거위의 이름은 무엇입니까?", choices: ["아카", "모르텐", "던핀"], answer: 1 },
    { q: "기러기 무리의 우두머리는 누구입니까?", choices: ["케브네카이세의 아카", "스미레", "에르멘리히"], answer: 0 },
    { q: "아카가 닐스를 데려가기로 한 까닭은 무엇입니까?", choices: ["가엾어서", "여우에게서 기러기를 구해서", "부탁을 해서"], answer: 1 },
    { q: "글리밍겐 성에서 닐스가 쥐를 몰아낸 방법은 무엇입니까?", choices: ["덫", "오래된 나무 피리", "고양이"], answer: 1 },
    { q: "그 대목이 어느 옛이야기에서 온 것입니까?", choices: ["하멜른의 피리 부는 사나이", "브레멘 음악대", "장화 신은 고양이"], answer: 0 },
    { q: "쿨라베리 모임의 규칙은 무엇입니까?", choices: ["그날 하루는 서로 잡아먹지 않는다", "싸움으로 우두머리를 정한다", "사람은 못 온다"], answer: 0 },
    { q: "규칙을 어긴 여우 스미레가 받은 벌은 무엇입니까?", choices: ["죽음", "쫓겨나고 아무도 말을 섞지 않는 것", "갇히는 것"], answer: 1 },
    { q: "밤에 나타난 도시에서 닐스가 물건을 사지 못한 까닭은 무엇입니까?", choices: ["가게가 닫혀서", "동전 하나가 없어서", "값이 비싸서"], answer: 1 },
    { q: "곰의 굴에서 닐스가 한 일은 무엇입니까?", choices: ["달아났다", "이미 불붙은 심지를 눌러 껐다", "사람들을 불렀다"], answer: 1 },
    { q: "스톡홀름에서 닐스를 지켜 준 것은 무엇입니까?", choices: ["청동 기마상", "낡은 나무 뱃사람 상", "노인"], answer: 1 },
    { q: "이 책이 원래 어떤 목적으로 쓰였습니까?", choices: ["학교에서 쓸 지리 교과서", "동화책", "여행기"], answer: 0 },
    { q: "닐스가 다시 사람이 된 계기는 무엇입니까?", choices: ["누구를 대신 작게 만들어서", "자기가 사람이면 무엇을 할 수 있는지 처음으로 생각해서", "톰테가 풀어 줘서"], answer: 1 },
    { q: "사람이 된 닐스가 제일 먼저 한 말은 무엇입니까?", choices: ["배고파요", "저 거위들 놓아 주세요", "어디 갔다 왔냐고 묻지 마세요"], answer: 1 },
    { q: "사람이 된 뒤 닐스가 잃은 것은 무엇입니까?", choices: ["기억", "짐승의 말을 알아듣는 것", "친구"], answer: 1 }
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
            ${artFrame('end.png', '🪶')}
            <h2>닐스의 이상한 여행를 다 읽었습니다</h2>
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
