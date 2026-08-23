const BOOK_TITLE = "집없는 소년";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "주워 온 아이",
        emoji: "🏡",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `프랑스 남쪽 산골에 샤바농이라는 작은 마을이 있었습니다. 그 마을에 레미라는 아이가 살았습니다. 어머니와 단둘이 살았습니다.`,
            `아버지는 파리에서 석수로 일했는데, 몇 해에 한 번씩만 집에 왔습니다. 어머니 바르베랭 아주머니는 아주 다정한 사람이었습니다. 레미는 그 집에서 가난하지만 편안하게 자랐습니다.`,
            `소를 치고, 나무를 하고, 어머니 옆에서 밥을 먹었습니다. 그 집은 방이 하나였습니다. 지붕은 짚으로 이었고, 바닥은 흙이었습니다.`,
            `겨울에는 소를 방 옆 칸에 들여놓고 지냈습니다. 그 소의 온기로 겨울을 났습니다. 레미는 그것이 가난한 것인 줄 몰랐습니다.`,
            `다른 집도 다 그랬기 때문입니다. 그해 레미는 여덟 살이었습니다.`,
            `어느 날 아버지가 돌아왔습니다. 그런데 다리를 절고 있었습니다. 공사장에서 비계가 무너져 크게 다친 것이었습니다. 그리고 그 집 사람들이 값을 물어 주지 않았습니다.`,
            `아버지는 그것 때문에 재판을 걸었다가 졌습니다. 돈이 다 떨어졌습니다.`,
            `그날 밤 레미는 자는 척하고 두 사람의 이야기를 들었습니다.`,
            `"이제 저 애를 고아원에 보내야겠소."<br>"안 돼요."<br>"우리 애도 아니잖소."`,
            `레미는 그 말을 듣고 이불 속에서 숨을 죽였습니다. 아버지가 이런 이야기를 했습니다. 여덟 해 전, 파리의 어느 거리에서 아기를 하나 주웠다는 것이었습니다.`,
            `아주 좋은 옷을 입고 있었고, 레이스가 달린 배내옷이었습니다. 아버지는 그 아기를 부잣집 아이라고 여겼습니다. 그래서 언젠가 부모가 찾으러 오면 사례를 받을 생각으로 데려다 키웠습니다. 그런데 여덟 해가 지나도록 아무도 오지 않았습니다.`,
            `"그러니 이제 소용이 없소."<br>이튿날 아침 레미는 어머니에게 물었습니다.<br>"어머니, 제가 어머니 아들이 아니에요?"`,
            `바르베랭 아주머니는 아무 말도 하지 못했습니다. 그러다 레미를 끌어안았습니다.`,
            `"너는 내 아들이다."<br>"그런데 어제 아버지가······."<br>"너는 내 아들이야."`,
            `그런데 며칠 뒤 마을에 나그네가 하나 왔습니다. 아버지가 그 사람과 이야기를 나누었습니다. 그리고 그날 저녁, 레미는 팔렸습니다.`,
            `값은 사십 프랑이었습니다.`
        ]
    },
    {
        num: 2,
        title: "비탈리스",
        emoji: "🐕",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `그 나그네의 이름은 비탈리스였습니다. 키가 크고 등이 곧은 노인이었습니다. 흰 수염이 있었고, 낡았지만 깨끗한 옷을 입고 있었습니다.`,
            `말투가 아주 정중했습니다. 그 사람은 짐승들과 함께 다니는 떠돌이 광대였습니다. 일행은 이랬습니다.`,
            `카피는 흰 삽살개였습니다. 이 무리의 우두머리였고, 아주 영리했습니다.`,
            `제르비노는 검은 개였습니다. 크고 힘이 셌습니다.`,
            `돌체는 회색 개였는데 겁이 많고 순했습니다.`,
            `그리고 졸리쾨르라는 원숭이가 있었습니다. 옷을 입고 다니고 성질이 사나웠습니다.`,
            `레미가 끌려 나올 때 어머니는 집에 없었습니다. 아버지가 일부러 어머니를 심부름 보낸 것이었습니다. 레미는 마을 어귀에서 몇 번이나 뒤를 돌아보았습니다.`,
            `길이 굽어 마을이 보이지 않게 되자, 레미는 길가에 주저앉아 울었습니다. 비탈리스는 그것을 기다려 주었습니다. 재촉하지 않았습니다.`,
            `옆에 앉지도 않았습니다. 저만치 떨어져 서서 개들을 쓰다듬고 있었습니다. 레미는 나중에 그것을 여러 번 생각했습니다.`,
            `그 노인은 사람이 울 때 어떻게 해야 하는지를 알고 있었습니다.`,
            `한참 뒤에 이렇게 말했습니다.<br>"울어라. 그런데 다 울고 나면 일어나야 한다."<br>"저를 어디로 데려가십니까."<br>"길로 데려간다."`,
            `그날 밤 두 사람은 헛간에서 잤습니다. 비탈리스는 자기 담요를 레미에게 덮어 주었습니다.`,
            `그리고 이렇게 말했습니다.<br>"나는 너를 때리지 않는다. 그리고 굶기지 않는다. 그 대신 너는 일을 배워야 한다."<br>"무슨 일이요?"<br>"사람 앞에 서는 일이다."<br>이튿날 아침 비탈리스가 카피를 불렀습니다.<br>"카피, 이 아이가 우리 식구다. 인사해라."`,
            `카피가 앞발을 들었습니다. 레미가 그 발을 잡았습니다. 그리고 그때 처음으로 조금 웃었습니다.`
        ]
    },
    {
        num: 3,
        title: "무대",
        emoji: "🎭",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `비탈리스의 공연은 이런 것이었습니다. 마을 광장에 자리를 잡고, 하프를 켜서 사람들을 모읍니다. 그리고 짧은 연극을 합니다.`,
            `제목은 언제나 같았습니다. '하인 카피의 이야기'였습니다. 개들이 옷을 입고 사람 노릇을 하는 연극이었습니다.`,
            `졸리쾨르가 주인 노릇을 하고, 카피가 하인 노릇을 했습니다. 사람들은 그것을 보고 웃었습니다. 그 연극은 아주 단순했습니다. 그런데 개들이 사람 옷을 입고 사람처럼 앉아 있으면 다들 웃었습니다.`,
            `졸리쾨르가 카피에게 호통을 치는 대목에서 제일 크게 웃었습니다. 비탈리스는 그 사이에 하프를 켰습니다. 그 하프 소리를 듣고 걸음을 멈추는 사람도 있었습니다.`,
            `공연이 끝나면 카피가 접시를 물고 사람들 사이를 돌았습니다. 그러면 사람들이 동전을 넣었습니다. 레미는 처음에 아무것도 하지 못했습니다.`,
            `사람들 앞에 서면 목이 막혔습니다. 비탈리스는 서두르지 않았습니다.`,
            `"오늘은 옆에 서 있기만 해라."<br>그다음 날에는 이렇게 말했습니다.<br>"오늘은 접시를 들고 있어라."`,
            `그렇게 조금씩 늘려 갔습니다. 한 달쯤 지나자 레미가 노래를 부르게 되었습니다. 비탈리스가 하프를 켜고 레미가 노래했습니다. 그런데 어느 날 노래가 끝나고 나서 비탈리스가 이상한 얼굴을 했습니다.`,
            `그리고 아무 말 없이 한참 앉아 있었습니다.`,
            `"제가 잘못했습니까?"<br>"아니다."<br>"그럼 왜요?"<br>"네 목소리가 좋아서 그런다."`,
            `그러고는 다른 이야기를 했습니다. 그리고 그날 저녁, 비탈리스는 나뭇조각으로 글자를 만들기 시작했습니다.`,
            `"오늘부터 글을 배운다."<br>"왜요?"<br>"떠돌이라도 글은 알아야 한다."`,
            `레미는 그 나뭇조각으로 글을 배웠습니다. 그리고 나중에는 악보 보는 법도 배웠습니다. 비탈리스는 음악을 아주 잘 알았습니다.`,
            `레미는 그것이 이상했습니다. 떠돌이 광대가 왜 그렇게 음악을 잘 알까요. 그런데 묻지 않았습니다.`,
            `비탈리스가 자기 이야기를 한 적이 한 번도 없었기 때문입니다.`
        ]
    },
    {
        num: 4,
        title: "감옥",
        emoji: "⛓️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `두 해 동안 두 사람은 프랑스 남쪽을 돌아다녔습니다. 여름에는 벌이가 좋았고, 겨울에는 힘들었습니다. 툴루즈라는 큰 도시에서 일이 났습니다.`,
            `광장에서 공연을 하는데 경찰이 와서 그만두라고 했습니다. 허가가 없다는 것이었습니다. 비탈리스는 정중하게 사정을 말했습니다. 그런데 그 경찰이 카피를 발로 찼습니다.`,
            `비탈리스는 그때 처음으로 화를 냈습니다. 그리고 그 경찰의 멱살을 잡았습니다. 그 일로 비탈리스는 두 달 동안 감옥에 갇혔습니다.`,
            `재판을 받는 날, 레미는 방청석에 앉아 있었습니다. 그리고 그때 이상한 것을 보았습니다. 판사가 비탈리스에게 이름을 물었습니다.`,
            `비탈리스가 대답했습니다. 그러자 판사가 잠깐 고개를 들었습니다. 그리고 그 얼굴을 다시 보았습니다.`,
            `"······선생, 혹시."<br>비탈리스가 아주 낮은 소리로 말했습니다.<br>"판사님, 그 이야기는 하지 말아 주십시오."`,
            `판사는 더 묻지 않았습니다. 그리고 벌을 아주 가볍게 내렸습니다. 레미는 그것을 보고도 무슨 일인지 몰랐습니다.`,
            `다만 그 순간 비탈리스의 얼굴이 아주 짧게 달라진 것을 보았습니다. 무언가를 들킨 사람의 얼굴이었습니다. 레미는 그날 밤 그것을 물어보려다가 그만두었습니다.`,
            `그 두 달 동안 레미는 혼자 짐승들을 데리고 지내야 했습니다. 열 살이었습니다. 레미는 스스로 공연을 했습니다.`,
            `하프를 켤 줄 몰라서 노래만 불렀습니다. 카피가 접시를 물고 돌았습니다. 처음 며칠은 아무도 동전을 넣지 않았습니다. 그런데 조금씩 나아졌습니다.`,
            `레미는 그 두 달 동안 짐승 넷을 굶기지 않았습니다. 그것이 레미가 처음으로 혼자 해낸 일이었습니다.`
        ]
    },
    {
        num: 5,
        title: "백조 호",
        emoji: "🦢",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그 무렵 레미는 운하 옆에서 배를 하나 보았습니다. 아주 예쁜 배였습니다. 하얗게 칠했고, 창에 꽃이 놓여 있었습니다.`,
            `배 이름은 백조 호였습니다. 그 배 갑판에 아이가 하나 누워 있었습니다. 널빤지에 몸을 묶은 채였습니다.`,
            `등이 아파서 그렇게 누워 있어야 하는 아이였습니다. 이름은 아서라고 했습니다. 그 옆에 어머니가 앉아 있었습니다.`,
            `영국 사람 밀리건 부인이었습니다. 레미가 노래를 부르자 아서가 손을 들었습니다.`,
            `"어머니, 저 아이 노래 좀 더 듣고 싶어요."`,
            `밀리건 부인이 레미를 배로 불렀습니다. 그리고 사정을 물었습니다. 레미가 다 이야기했습니다.`,
            `밀리건 부인은 그 두 달 동안 레미와 짐승들을 배에 태워 주었습니다. 배가 운하를 따라 천천히 갔습니다. 레미는 아서 옆에서 지냈습니다.`,
            `두 아이는 곧 친해졌습니다. 아서는 아는 것이 많았고, 레미는 본 것이 많았습니다. 아서는 아홉 해 동안 그 널빤지에 묶여 지냈습니다. 그래서 밖에 나가 본 적이 거의 없었습니다.`,
            `레미가 본 것을 이야기하면 아서는 눈을 반짝이며 들었습니다. 산, 눈, 늑대, 장터, 물레방아. 레미는 그때 처음으로 자기가 가진 것이 있다는 것을 알았습니다.`,
            `밀리건 부인은 레미에게 영어를 가르쳤습니다. 그리고 이런 이야기를 했습니다. 밀리건 부인에게는 아들이 둘 있었습니다.`,
            `큰아들이 갓난아기 때 없어졌다는 것이었습니다.`,
            `"어떻게요?"<br>"모르겠어요. 남편이 세상을 떠난 직후였고, 저는 아주 아팠어요. 깨어 보니 아이가 없었습니다."<br>"찾아보셨어요?"<br>"여덟 해를 찾았습니다."`,
            `레미는 그 이야기를 들으며 이런 생각을 했습니다. 세상에는 아이를 잃은 사람도 있고, 부모를 모르는 아이도 있구나.`,
            `그때 레미는 그 두 가지가 같은 이야기일 수도 있다는 생각은 하지 못했습니다. 두 달이 끝나고 비탈리스가 감옥에서 나왔습니다.`,
            `밀리건 부인이 이렇게 말했습니다.<br>"이 아이를 저에게 맡기시겠습니까. 제가 학교에 보내겠습니다."`,
            `레미는 숨을 죽이고 그 대답을 기다렸습니다. 비탈리스는 한참 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"안 됩니다."`,
            `그 대답을 레미는 여러 해 동안 원망했습니다.`
        ]
    },
    {
        num: 6,
        title: "눈 속의 밤",
        emoji: "🐺",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `그해 겨울은 아주 추웠습니다. 두 사람은 프랑스 가운데쯤을 지나 파리 쪽으로 가고 있었습니다. 그런데 그해에는 마을마다 벌이가 없었습니다.`,
            `사람들도 다 어려웠기 때문입니다. 눈이 오기 시작했습니다.`,
            `어느 날 두 사람은 숲속에서 밤을 맞았습니다. 묵을 데를 찾지 못한 것입니다. 비탈리스가 나무를 모아 불을 피웠습니다.`,
            `짐승 넷이 그 둘레에 붙어 앉았습니다. 밤중에 불이 사그라들었습니다. 그리고 새벽에 무슨 소리가 났습니다.`,
            `레미가 깨어 보니 제르비노와 돌체가 없었습니다. 눈 위에 발자국이 있었습니다. 개의 발자국 옆에 다른 발자국이 있었습니다.`,
            `늑대였습니다. 비탈리스와 레미는 그 자국을 따라갔습니다. 그런데 얼마 못 가 자국이 흩어졌습니다.`,
            `두 마리 다 돌아오지 않았습니다. 레미는 그 자리에서 울었습니다. 비탈리스는 울지 않았습니다.`,
            `다만 그날 하루 종일 말을 하지 않았습니다. 그리고 그 뒤로 걸음이 느려졌습니다. 제르비노와 돌체는 여섯 해를 함께 다닌 식구였습니다.`,
            `비탈리스가 새끼 때부터 길러 가르친 것이었습니다. 그날 이후 비탈리스는 밤에 자다가 자주 깼습니다. 그리고 일어나 앉아 카피의 머리를 만졌습니다.`,
            `며칠 뒤에는 졸리쾨르가 앓았습니다. 추위에 폐를 다친 것이었습니다. 비탈리스는 자기 웃옷을 벗어 그 원숭이를 싸안고 걸었습니다.`,
            `약을 사려고 하프를 팔았습니다. 그 하프는 비탈리스가 평생 지니고 다니던 것이었습니다. 그런데 졸리쾨르도 살리지 못했습니다.`,
            `이제 남은 것은 카피 하나였습니다. 비탈리스는 그 뒤로 늙은 사람처럼 걸었습니다. 그전까지는 등이 곧은 사람이었습니다.`
        ]
    },
    {
        num: 7,
        title: "파리의 문 앞",
        emoji: "❄️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `이월 어느 밤, 두 사람은 파리 근처에 이르렀습니다. 눈보라가 몰아쳤습니다. 비탈리스는 아는 사람이 하나 있다고 했습니다.`,
            `가르폴리라는 사람인데, 아이들에게 악기를 가르쳐 거리에 내보내는 사람이었습니다.`,
            `"저 사람은 좋은 사람이 아니다. 그래도 오늘 밤만 신세를 지자."`,
            `그런데 그 집을 찾지 못했습니다. 길을 잘못 든 것입니다.`,
            `밤이 아주 깊었고, 눈이 무릎까지 쌓였습니다. 비탈리스가 걸음을 멈췄습니다.`,
            `"레미야."<br>"네."<br>"저 담 밑에 짚더미가 있다. 저기서 자자."`,
            `두 사람은 그 짚더미를 파고 들어갔습니다. 카피가 두 사람 사이에 들어와 누웠습니다. 비탈리스가 자기 겉옷을 벗어 레미에게 덮어 주었습니다.`,
            `"할아버지, 이거 입으세요."<br>"나는 괜찮다."<br>"안 괜찮으세요."<br>"레미야, 내 말을 들어라."`,
            `그리고 비탈리스가 이런 말을 했습니다.`,
            `"내가 너를 밀리건 부인에게 보내지 않은 것 말이다."<br>"······."<br>"그때 내가 잘못했다."<br>"할아버지."<br>"나는 그때 네가 옆에 없으면 내가 못 견딜 것 같았다. 그래서 그랬다. 그건 너를 위한 게 아니었다."`,
            `레미는 아무 말도 하지 못했습니다.`,
            `비탈리스가 말했습니다.<br>"자라. 아침이 되면 가자."`,
            `아침에 사람들이 그 짚더미를 헤쳤습니다. 카피가 밤새 짖었기 때문에 사람들이 온 것이었습니다. 레미는 살았습니다.`,
            `비탈리스는 그러지 못했습니다. 사람들이 그 노인의 짐을 뒤지다가 낡은 서류를 하나 찾아냈습니다. 그 서류에는 다른 이름이 적혀 있었습니다.`,
            `카를로 발자니. 삼십 년 전 이탈리아에서 가장 이름난 성악가였습니다. 목소리를 잃고 무대를 떠난 뒤로 아무도 그 사람이 어디로 갔는지 몰랐습니다.`,
            `레미는 그제야 알았습니다. 그 사람이 왜 음악을 그렇게 잘 알았는지, 그리고 자기 노래를 듣고 왜 그런 얼굴을 했는지요.`
        ]
    },
    {
        num: 8,
        title: "화원",
        emoji: "🌷",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `레미를 거둔 것은 그 짚더미가 있던 집 사람들이었습니다. 아캥 씨네였습니다. 파리 근교에서 화원을 하는 집이었습니다.`,
            `아캥 씨는 아내를 일찍 잃고 아이 넷을 혼자 키우고 있었습니다. 에티에네트, 알렉시, 뱅자맹, 그리고 리즈였습니다. 제일 어린 리즈는 말을 하지 못했습니다.`,
            `어릴 때 크게 앓고 나서 목소리를 잃은 것이었습니다. 그런데 눈으로 다 말했습니다. 레미는 그 집에서 두 해를 지냈습니다.`,
            `아캥 씨는 레미에게 꽃 기르는 일을 가르쳤습니다. 씨를 뿌리는 때, 물을 주는 양, 온실 창을 여닫는 시각. 레미는 그 일이 좋았습니다. 그리고 무엇보다 한자리에 있는 것이 좋았습니다.`,
            `아침에 눈을 뜨면 어제와 같은 천장이 있었습니다. 그것이 레미에게는 처음이었습니다. 떠돌아다닐 때는 아침에 눈을 뜨면 늘 다른 곳이었습니다.`,
            `헛간이거나 다리 밑이거나 숲이었습니다. 그래서 눈을 뜨면 여기가 어디인지부터 알아내야 했습니다. 그 집에서는 그럴 필요가 없었습니다.`,
            `저녁이면 레미가 노래를 불렀습니다. 리즈가 그 노래를 제일 좋아했습니다. 카피는 그 집 아이들과 온 뜰을 뛰어다녔습니다.`,
            `그 두 해 동안 레미는 자기가 주워 온 아이라는 것을 거의 잊었습니다. 그해 여름, 아캥 씨네 화원에서는 큰돈이 걸린 일이 있었습니다. 여름꽃을 잔뜩 길러 팔 참이었습니다.`,
            `그 돈으로 빚을 갚기로 되어 있었습니다. 팔월 어느 오후, 하늘이 갑자기 어두워졌습니다. 그리고 우박이 쏟아졌습니다.`,
            `달걀만 한 것이었습니다. 십오 분이었습니다. 십오 분 만에 온실 유리가 다 깨졌습니다. 그리고 꽃이 다 뭉개졌습니다.`,
            `우박이 그치고 사람들이 밖으로 나왔습니다. 아캥 씨는 뜰 한가운데 서서 아무 말도 하지 않았습니다.`
        ]
    },
    {
        num: 9,
        title: "흩어지다",
        emoji: "🚪",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `아캥 씨는 빚을 갚지 못했습니다. 그 시절에는 빚을 못 갚으면 감옥에 갔습니다. 아캥 씨는 오 년 형을 받고 감옥에 들어갔습니다.`,
            `아이 넷은 흩어져 친척 집에 하나씩 맡겨졌습니다. 에티에네트는 남쪽으로, 알렉시는 탄광 마을로, 뱅자맹은 다른 삼촌에게, 리즈는 이모에게 갔습니다. 헤어지던 날 아침, 다섯 아이가 뜰에 서 있었습니다.`,
            `레미는 갈 데가 없었습니다. 친척이 아니었기 때문입니다. 리즈가 레미의 손을 잡았습니다. 그리고 손으로 무언가를 가리켰습니다.`,
            `길이었습니다. 레미는 그 뜻을 알았습니다. 가라는 것이 아니라, 다시 오라는 뜻이었습니다.`,
            `레미는 그날 카피를 데리고 다시 길에 나섰습니다. 이번에는 스스로 정한 것이었습니다. 레미는 이렇게 마음을 먹었습니다.`,
            `'네 사람을 다 찾아가 보겠다. 그리고 어떻게 지내는지 보고 서로에게 전해 주겠다.'`,
            `열세 살이었습니다. 카피는 그때 이미 늙어 있었습니다. 걸음이 느렸고, 밤에 다리를 절었습니다. 그래도 레미가 짐을 들면 먼저 일어나 문 앞에 가서 섰습니다.`,
            `레미는 그 개를 두고 갈 수 없었습니다. 그 개도 레미를 두고 갈 생각이 없었습니다. 길에서 레미는 마티아라는 아이를 만났습니다.`,
            `가르폴리라는 사람 밑에 있던 아이였습니다. 비탈리스가 좋은 사람이 아니라고 했던 그 사람입니다. 마티아는 그 집에서 얻어맞으며 지내다가 쫓겨난 참이었습니다.`,
            `몸이 아주 말랐고, 머리가 컸습니다. 그리고 바이올린을 아주 잘 켰습니다.`,
            `"나도 데려가 줘."<br>"나도 먹고살기 힘든데."<br>"둘이면 벌이가 두 배야."`,
            `그 말이 맞았습니다. 그래서 두 아이는 함께 다니게 되었습니다. 레미가 노래하고 마티아가 켜면 사람들이 훨씬 많이 모였습니다.`,
            `마티아는 셈에도 밝았습니다. 그리고 레미보다 세상을 잘 알았습니다.`
        ]
    },
    {
        num: 10,
        title: "탄광",
        emoji: "⛏️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `두 아이는 먼저 알렉시를 찾아갔습니다. 바르스라는 탄광 마을이었습니다. 알렉시는 그 탄광에서 일하고 있었습니다.`,
            `열세 살짜리가 하는 일은 석탄 수레를 미는 것이었습니다. 갱도가 낮아서 어른이 못 들어가는 데를 아이가 들어갔습니다. 레미는 알렉시를 따라 한번 내려가 보았습니다.`,
            `승강기가 아주 오래 내려갔습니다. 아래는 캄캄했고, 더웠고, 공기가 답답했습니다. 사람들이 등불 하나에 의지해 곡괭이질을 하고 있었습니다.`,
            `그날 레미는 그 아래에서 갇혔습니다. 갱도에 물이 터진 것입니다. 가까운 강의 물길이 무너져 갱 안으로 쏟아져 들어왔습니다.`,
            `물이 아래쪽 갱도를 다 채웠습니다. 레미와 광부 여섯 명이 위쪽 막장에 갇혔습니다. 물이 그 아래까지 차올라 멈췄습니다.`,
            `밖으로 나갈 길이 없었습니다. 그 안에서 열나흘을 있었습니다. 먹을 것이 없었습니다.`,
            `등불 기름이 떨어져서 사흘째부터는 캄캄했습니다. 사람들은 처음에 시각을 셌습니다. 그러다 그것도 못 하게 되었습니다.`,
            `그 시절 탄광에서 그런 사고는 드문 일이 아니었습니다. 갱도를 받치는 나무를 아끼면 무너지고, 물길을 제대로 살피지 않으면 물이 터졌습니다. 그런데 그것을 아끼는 쪽이 돈을 더 벌었습니다. 그래서 아꼈습니다.`,
            `그 안에서 사람이 어떻게 되는지를 레미는 다 보았습니다. 한 사람은 계속 기도했습니다. 한 사람은 계속 화를 냈습니다.`,
            `한 사람은 아무 말도 하지 않았습니다. 그리고 나이 든 광부 하나가 있었습니다. 그 사람은 시각을 셌고, 남은 물을 나눴고, 이야기를 했습니다.`,
            `옛날에 자기가 겪은 사고 이야기를 계속 했습니다. 그때도 살아 나왔다는 이야기였습니다. 나중에 레미는 그것이 그 사람이 한 제일 큰 일이었다고 생각했습니다.`,
            `열나흘째 되는 날, 위에서 소리가 났습니다. 밖에서 사람들이 새 갱도를 파 내려온 것이었습니다. 여섯 사람이 살아 나왔습니다.`,
            `한 사람은 못 나왔습니다.`
        ]
    },
    {
        num: 11,
        title: "리즈",
        emoji: "💧",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `두 아이는 다시 길을 나섰습니다. 에티에네트를 찾아 남쪽으로 갔고, 뱅자맹을 만났고, 마지막으로 리즈를 찾아갔습니다. 리즈는 운하 옆 마을의 이모 집에 있었습니다.`,
            `레미를 보자 리즈가 뛰어나왔습니다. 그리고 두 손으로 레미의 옷깃을 잡았습니다. 말은 못 했지만 다 말한 것이었습니다.`,
            `그날 저녁 레미가 노래를 불렀습니다. 리즈는 그것을 눈을 감고 들었습니다. 그리고 이상한 일이 있었습니다.`,
            `레미가 아캥 씨네 이야기를 하다가, 형제들이 다 잘 지낸다고 말했을 때입니다. 리즈가 소리를 냈습니다. 아주 작은 소리였습니다. 그런데 소리였습니다.`,
            `이모가 그것을 듣고 그 자리에 주저앉았습니다. 의사가 나중에 이렇게 말했습니다. 그 아이는 목이 상한 것이 아니라 마음이 막혔던 것이라고요. 그래서 언젠가 다시 말할 수 있을지 모른다고 했습니다.`,
            `레미가 떠나던 날, 리즈가 운하 둑까지 따라 나왔습니다. 그리고 그 자리에서 손을 흔들었습니다. 레미는 그 뒤로도 그 장면을 자주 떠올렸습니다.`,
            `운하 둑에 서서 손을 흔들던 작은 아이를요. 그때 레미는 자기가 언제 다시 올 수 있을지 몰랐습니다. 그래도 온다고 손짓으로 말했습니다.`,
            `두 아이는 그 뒤로 여러 곳을 다녔습니다. 그러다 어느 날 마티아가 이런 말을 꺼냈습니다.`,
            `"레미, 우리 네 어머니를 찾아보자."<br>"내 어머니가 어디 있는지 알 수가 없잖아."<br>"바르베랭 아주머니한테 가서 물어보자. 그 아주머니는 네 배내옷을 봤을 거 아니야."`,
            `그래서 두 아이는 샤바농으로 갔습니다. 몇 해 만이었습니다. 바르베랭 아주머니는 레미를 보자마자 알아보았습니다.`,
            `그리고 이렇게 말했습니다.<br>"레미야, 너를 찾는 사람이 왔었다."`
        ]
    },
    {
        num: 12,
        title: "찾는 사람",
        emoji: "📜",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `바르베랭 아주머니는 이런 이야기를 했습니다. 얼마 전에 어떤 사람이 마을에 와서 여덟 해 전에 주운 아이를 찾는다고 했다는 것입니다. 그리고 그 아이의 배내옷 이야기를 아주 자세히 알고 있었습니다.`,
            `남편 바르베랭이 그 사람을 만나러 파리로 갔다고 했습니다.`,
            `"그 사람 이름이 뭐라고 했습니까?"<br>"드리스콜이라고 했다. 영국 사람이야."`,
            `두 아이는 파리로 갔습니다. 그리고 그 주소를 찾아갔습니다. 런던으로 가는 배를 타야 했습니다.`,
            `런던의 그 집은 좁은 골목 안에 있었습니다. 문을 두드리자 여자가 나왔습니다. 그리고 레미를 보고 소리를 질렀습니다.`,
            `"우리 아들이다!"`,
            `그 집에는 아버지와 어머니, 그리고 아이가 여럿 있었습니다. 그 사람들은 레미를 끌어안고 울었습니다. 레미는 그날 밤 처음으로 자기 가족이라는 사람들과 한방에서 잤습니다. 그런데 잠이 오지 않았습니다.`,
            `무언가 이상했기 때문입니다. 그 집은 아주 가난했습니다. 그런데 밤이면 사람들이 물건을 잔뜩 지고 들어왔습니다. 그리고 그것을 곧바로 어디론가 팔았습니다.`,
            `장부도 없고 가게도 없었습니다. 마티아가 며칠 만에 알아냈습니다.`,
            `"레미, 저 사람들 도둑이야."<br>"우리 아버지야."<br>"아니야. 내 말 들어 봐."`,
            `마티아가 이런 것들을 짚었습니다.`,
            `첫째, 저 집 아이들은 다 머리가 붉은데 레미만 갈색이다.`,
            `둘째, 저 사람들은 레미가 온 날 울기는 했는데, 그 뒤로 레미에게 아무것도 묻지 않았다.`,
            `여덟 해 동안 어디서 어떻게 살았는지 한 번도 안 물었습니다.`,
            `셋째, 저 집에는 아기 때 물건이 하나도 없다. 아들을 잃은 집에 그런 것이 하나도 없을 리가 없다는 것이었습니다.`,
            `레미는 그 말을 듣고 화를 냈습니다.<br>"너는 부모가 없어 봤어?" 마티아는 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"나는 여섯 살에 팔렸어."`,
            `레미는 그 자리에서 아무 말도 하지 못했습니다. 그리고 미안하다고 하지도 못했습니다.`,
            `그날 밤 두 아이는 서로 등을 돌리고 잤습니다. 그런데 그날 밤 잠을 못 잤습니다.`
        ]
    },
    {
        num: 13,
        title: "밝혀지다",
        emoji: "🔍",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `며칠 뒤, 그 집에 손님이 하나 왔습니다. 잘 차려입은 영국 신사였습니다. 레미는 그 사람의 이름을 들었습니다.`,
            `제임스 밀리건이라고 했습니다. 레미는 그 이름을 알고 있었습니다. 백조 호의 밀리건 부인이 이야기한 적이 있었습니다.`,
            `세상을 떠난 남편의 동생이라고요. 그 사람은 레미를 보고 아주 놀랐습니다. 그리고 곧 얼굴빛을 고쳤습니다.`,
            `"이 아이가 그 아이인가?"<br>"그렇습니다."`,
            `두 사람이 다른 방으로 들어갔습니다. 마티아가 문에 귀를 대고 들었습니다.`,
            `그리고 나와서 이렇게 말했습니다.<br>"레미, 저 사람이 돈을 주고 있어."`,
            `일이 이렇게 된 것이었습니다. 제임스 밀리건은 형이 죽고 조카가 둘 남았을 때, 그 아이들이 없으면 재산이 자기에게 온다는 것을 알고 있었습니다. 그래서 갓난아기였던 큰조카를 없애기로 했습니다.`,
            `그런데 차마 죽이지는 못하고, 드리스콜이라는 사람에게 돈을 주고 파리로 데려가 버리게 했습니다. 드리스콜은 그 아기를 거리에 놓고 왔습니다. 그 아기를 주운 사람이 바르베랭이었습니다.`,
            `그리고 여덟 해 뒤, 밀리건 부인이 그 아이를 찾는다는 소문이 돌자, 드리스콜이 먼저 찾아내서 자기 아들이라고 하기로 한 것입니다. 그러면 제임스 밀리건이 그 아이를 계속 손에 쥐고 있을 수 있었습니다.`,
            `마티아가 말했습니다.<br>"여기서 나가야 해."`,
            `두 아이는 그날 밤 그 집을 빠져나왔습니다. 그리고 프랑스로 돌아가는 배를 탔습니다. 그런데 어디로 가야 할지 몰랐습니다.`,
            `그때 마티아가 말했습니다.<br>"백조 호를 찾자."<br>"그 배가 어디 있는지 어떻게 알아."<br>"운하를 따라가면 되지. 그 배는 운하로만 다니잖아."`,
            `두 아이는 운하를 따라 걸었습니다. 프랑스에는 운하가 아주 많았습니다. 그 시절에는 짐을 운하로 날랐기 때문입니다.`,
            `두 아이는 물길을 따라 남쪽으로 갔다가 동쪽으로 갔습니다. 가는 데마다 노래를 팔아 밥을 먹었습니다. 마티아가 셈을 맡았습니다. 그리고 하루에 얼마씩 남겨 두었습니다.`,
            `"이건 안 써. 이건 배 삯이야."`,
            `여러 달을 걸었습니다.`,
            `가는 데마다 노래를 부르며 물었습니다.<br>"하얀 배 못 보셨습니까. 이름이 백조 호입니다."`
        ]
    },
    {
        num: 14,
        title: "백조 호를 다시 만나다",
        emoji: "🌊",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `스위스 쪽 어느 호숫가에서 두 아이는 그 배를 찾아냈습니다. 배는 그대로였습니다. 하얗게 칠했고, 창에 꽃이 놓여 있었습니다.`,
            `다만 갑판에 아무도 없었습니다. 레미가 노래를 불렀습니다. 백조 호에서 늘 부르던 노래였습니다. 그러자 선실 문이 열렸습니다.`,
            `밀리건 부인이 나왔습니다. 그리고 레미를 보았습니다. 한참 아무 말도 하지 않았습니다.`,
            `아서도 나왔습니다. 아서는 이제 널빤지에 묶여 있지 않았습니다. 걸어서 나왔습니다.`,
            `여러 해 동안 나아졌던 것입니다. 레미는 그동안 있었던 일을 다 이야기했습니다. 드리스콜 이야기, 제임스 밀리건 이야기, 마티아가 알아낸 것까지 다요.`,
            `밀리건 부인은 그 이야기를 다 들었습니다. 그리고 사람을 시켜 알아보게 했습니다. 여러 달이 걸렸습니다.`,
            `드리스콜은 결국 다 털어놓았습니다. 그리고 배내옷이 나왔습니다. 밀리건 부인이 여덟 해 전에 손수 짠 것이었습니다.`,
            `바르베랭 아주머니가 그것을 그동안 상자에 넣어 두고 있었습니다. 버리지 않은 것이었습니다. 그 상자가 도착한 날, 밀리건 부인은 그것을 펴 놓고 오래 앉아 있었습니다. 그리고 레미를 불렀습니다.`,
            `레미는 그 앞에 섰습니다. 무슨 말을 해야 할지 몰랐습니다.`,
            `밀리건 부인이 이렇게 말했습니다.<br>"내가 너를 처음 봤을 때 왜 그렇게 오래 봤는지 그때는 몰랐다."`,
            `레미는 그 자리에 서 있었습니다. 다가가지 못했습니다. 열네 해 동안 그 자리에 아무도 없었기 때문입니다.`,
            `그때 뒤에서 마티아가 레미의 등을 밀었습니다. 그리고 두 팔을 벌렸습니다.`
        ]
    },
    {
        num: 15,
        title: "그 뒤의 일",
        emoji: "🎻",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `레미는 그날부터 어머니와 함께 살았습니다. 열네 해 만이었습니다. 그런데 레미가 제일 먼저 한 일은 그것이 아니었습니다.`,
            `레미는 어머니에게 이렇게 부탁했습니다.<br>"제가 신세 진 사람들이 있습니다."`,
            `그리고 그 사람들을 하나씩 이야기했습니다. 바르베랭 아주머니는 레미가 여덟 해 동안 어머니라고 부른 사람이었습니다. 그 아주머니는 그 뒤로 넉넉하게 지냈습니다.`,
            `아캥 씨는 남은 빚을 다 갚고 감옥에서 나왔습니다. 그리고 다시 화원을 열었습니다. 아이 넷도 그 집으로 돌아왔습니다.`,
            `리즈는 그 뒤로 조금씩 말을 하게 되었습니다. 아주 천천히였습니다. 여러 해가 걸렸습니다.`,
            `마티아는 음악을 배우러 갔습니다. 밀리건 부인이 이탈리아의 좋은 선생에게 보냈습니다. 마티아는 나중에 이름난 연주자가 되었습니다. 그리고 레미와 평생 형제처럼 지냈습니다.`,
            `카피는 아주 오래 살았습니다. 말년에는 눈이 잘 안 보이고 다리가 아팠습니다. 그래도 레미가 노래를 부르면 일어나 앉았습니다. 그리고 앞발을 들었습니다.`,
            `레미는 그 앞발을 잡았습니다. 여덟 살 때 마을 어귀에서 처음 잡았던 그 발이었습니다.`,
            `그때 레미는 아무것도 없는 아이였습니다. 카피는 그때부터 끝까지 곁에 있었습니다. 그 버릇이 끝까지 남아 있었습니다.`,
            `레미는 어른이 되어 아서의 곁에서 밀리건 집안의 일을 맡았습니다. 그리고 리즈와 혼인했습니다. 이 이야기를 지은 사람은 엑토르 말로라는 프랑스 사람입니다.`,
            `백사십 년쯤 전에 썼습니다. 그 시절 프랑스에는 레미 같은 아이가 아주 많았습니다. 여덟 살에 팔려 가고, 열세 살에 탄광에 들어가는 아이들이었습니다.`,
            `이 책이 나오고 나서 그 아이들 이야기가 사람들 입에 오르기 시작했습니다.`,
            `이야기가 세상을 바꾸는 일은 드뭅니다. 그런데 아주 없지는 않습니다.`
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
                ${artFrame('cover.png', '🐕')}
            </div>
            <div class="story-page-right">
                <h1>집없는 소년</h1>
                <p class="cover-tag">엑토르 말로 원작</p>
                <p>여덟 살 레미가 사십 프랑에 떠돌이 광대에게 팔려 갑니다. 함께 다니게 된 것은 개 세 마리와 원숭이 한 마리였습니다.</p>
                <p>가진 것이 아무것도 없는 아이가 길 위에서 사람을 하나씩 얻어 가는 이야기입니다.</p>
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
    { q: "레미가 자기가 주워 온 아이라는 것을 어떻게 알았습니까?", choices: ["어머니가 말해 줘서", "밤에 부모의 이야기를 들어서", "마을 사람이 말해서"], answer: 1 },
    { q: "레미가 팔려 간 값은 얼마입니까?", choices: ["사십 프랑", "백 프랑", "십 프랑"], answer: 0 },
    { q: "비탈리스가 레미에게 처음 시킨 것은 무엇입니까?", choices: ["노래", "옆에 서 있는 것", "접시 돌리기"], answer: 1 },
    { q: "비탈리스가 레미에게 글을 가르친 까닭은 무엇입니까?", choices: ["떠돌이라도 글은 알아야 해서", "학교에 보내려고", "심심해서"], answer: 0 },
    { q: "비탈리스가 감옥에 간 까닭은 무엇입니까?", choices: ["도둑질", "경찰이 카피를 발로 차서 멱살을 잡아서", "허가 없이 공연해서"], answer: 1 },
    { q: "밀리건 부인이 잃어버린 것은 무엇입니까?", choices: ["재산", "갓난아기 때의 큰아들", "배"], answer: 1 },
    { q: "비탈리스가 나중에 잘못했다고 말한 일은 무엇입니까?", choices: ["레미를 산 것", "레미를 밀리건 부인에게 보내지 않은 것", "짐승을 잃은 것"], answer: 1 },
    { q: "비탈리스의 진짜 정체는 무엇입니까?", choices: ["귀족", "이름난 성악가였던 카를로 발자니", "군인"], answer: 1 },
    { q: "아캥 씨네 화원이 망한 까닭은 무엇입니까?", choices: ["불", "십오 분 동안 쏟아진 우박", "가뭄"], answer: 1 },
    { q: "리즈가 말을 하지 못한 까닭은 무엇입니까?", choices: ["태어날 때부터", "크게 앓고 나서 목소리를 잃어서", "다쳐서"], answer: 1 },
    { q: "레미가 탄광에 갇혀 있던 날은 며칠입니까?", choices: ["사흘", "이레", "열나흘"], answer: 2 },
    { q: "마티아가 드리스콜 가족을 의심한 근거가 아닌 것은 무엇입니까?", choices: ["아이들 머리 빛깔", "레미에게 그동안 일을 아무것도 묻지 않은 것", "말이 통하지 않은 것"], answer: 2 },
    { q: "제임스 밀리건이 조카를 없애려 한 까닭은 무엇입니까?", choices: ["미워서", "조카가 없으면 재산이 자기에게 와서", "빚 때문에"], answer: 1 },
    { q: "두 아이가 백조 호를 찾은 방법은 무엇입니까?", choices: ["편지를 보냈다", "운하를 따라 걸으며 물었다", "신문에 냈다"], answer: 1 },
    { q: "레미의 신분을 밝혀 준 물건은 무엇입니까?", choices: ["반지", "바르베랭 아주머니가 간직한 배내옷", "편지"], answer: 1 },
    { q: "어머니를 찾은 레미가 제일 먼저 한 일은 무엇입니까?", choices: ["재산을 받았다", "신세 진 사람들을 하나씩 이야기했다", "여행을 떠났다"], answer: 1 }
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
            ${artFrame('end.png', '🎻')}
            <h2>집없는 소년를 다 읽었습니다</h2>
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
