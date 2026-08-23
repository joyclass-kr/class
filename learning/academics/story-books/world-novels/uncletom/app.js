const BOOK_TITLE = "톰 아저씨의 오두막";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "사람을 사고팔던 시절",
        emoji: "⛓️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `이 이야기를 읽기 전에 알아 두어야 할 것이 있습니다.`,
            `백칠십 년쯤 전, 미국의 남쪽 여러 주에서는 사람을 사고팔았습니다.`,
            `아프리카에서 배에 실려 온 사람들과 그 자손들이었습니다.`,
            `그 사람들은 법으로 물건이었습니다.`,
            `주인이 팔면 팔려 갔고, 주인이 빚을 지면 빚 대신 넘어갔습니다.`,
            `부부를 따로 팔 수 있었고, 어머니와 아기를 따로 팔 수 있었습니다.`,
            `그것이 법에 어긋나지 않았습니다.`,
            `글을 가르치는 것은 오히려 법으로 금지되어 있었습니다.`,
            `글을 알면 위험해진다고 여겼기 때문입니다.`,
            `이 이야기에 나오는 일들은 지어낸 것이 아닙니다.`,
            `이 책을 쓴 해리엇 비처 스토는 실제로 있었던 일들을 모아서 썼습니다.`,
            `그리고 책이 나온 뒤 사람들이 지어냈다고 하자, 그 근거를 모은 책을 따로 한 권 더 냈습니다.`,
            `그 책에는 신문 기사와 재판 기록과 사람들의 증언이 실려 있습니다.`,
            `이야기는 미국 켄터키의 어느 농장에서 시작합니다.`,
            `주인 이름은 셸비였습니다.`,
            `셸비는 그 지방에서 나쁜 주인이 아니라고 알려져 있었습니다.`,
            `사람을 때리지 않았고, 밥을 굶기지 않았습니다.`,
            `그 농장에 톰이라는 사람이 있었습니다.`,
            `마흔이 넘었고, 몸이 크고, 말이 느리고, 사람들이 다 믿는 사람이었습니다.`,
            `셸비는 톰에게 농장의 돈을 맡기기도 했습니다.`,
            `톰이 돈을 들고 강 건너 다른 주에 심부름을 다녀온 적도 있습니다.`,
            `강 건너는 자유가 있는 주였습니다.`,
            `그러니까 톰은 그때 달아날 수 있었습니다.`,
            `그런데 돌아왔습니다.`,
            `톰에게는 아내 클로이와 아이 셋이 있었습니다.`,
            `농장 한쪽에 통나무 오두막이 있었고, 그 집이 톰의 집이었습니다.`,
            `저녁이면 그 오두막에 사람들이 모였습니다.`,
            `클로이가 만든 옥수수빵을 먹고, 노래를 부르고, 톰이 성경을 읽었습니다.`,
            `톰은 글을 겨우 읽었습니다.`,
            `주인집 아들 조지 도련님이 몰래 가르쳐 준 것이었습니다.`,
            `그것도 법을 어긴 일이었습니다.`
        ]
    },
    {
        num: 2,
        title: "팔리다",
        emoji: "📜",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `그해 겨울, 셸비의 형편이 나빠졌습니다.`,
            `투자를 잘못해서 큰 빚을 진 것입니다.`,
            `헤일리라는 사람이 그 빚 문서를 들고 찾아왔습니다.`,
            `사람을 사고파는 것을 업으로 하는 사람이었습니다.`,
            `"셈을 하십시오."`,
            `"지금은 돈이 없소."`,
            `"그럼 사람으로 주십시오."`,
            `셸비는 그 말을 듣고 한참 아무 말도 하지 않았습니다.`,
            `"누구를 원하시오."`,
            `"톰을 주십시오. 그 사람 값이 제일 나갑니다."`,
            `"안 되오."`,
            `"그럼 다른 방법이 없습니다. 농장을 넘기셔야 합니다."`,
            `셸비는 결국 그러겠다고 했습니다.`,
            `그런데 헤일리가 한 사람을 더 요구했습니다.`,
            `엘리자라는 여자의 아들이었습니다.`,
            `해리라는 다섯 살 아이였습니다.`,
            `헤일리는 그 아이를 아까부터 보고 있었습니다.`,
            `"저 아이도 넣으십시오."`,
            `"안 되오. 그 애 어미가 못 견디오."`,
            `"어미들은 다 처음에는 그럽니다. 그런데 다들 견딥니다."`,
            `셸비는 그 말을 듣고 얼굴을 돌렸습니다.`,
            `그리고 서류에 이름을 적었습니다.`,
            `그날 밤 셸비 부인이 그 일을 알고 남편에게 따졌습니다.`,
            `"당신이 그 사람들에게 뭐라고 했는지 잊으셨어요? 언젠가 다 놓아 주겠다고 하셨잖아요."`,
            `"나도 어쩔 수 없었소."`,
            `"어쩔 수 없다는 말로 사람을 파는 겁니까."`,
            `셸비는 대답하지 못했습니다.`,
            `그 밤에 엘리자가 그 이야기를 들었습니다.`,
            `문밖에서 우연히 들은 것이었습니다.`,
            `엘리자는 그 자리에 한참 서 있었습니다.`,
            `그리고 방으로 들어가 자는 아이를 안았습니다.`
        ]
    },
    {
        num: 3,
        title: "톰의 밤",
        emoji: "🕯️",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `엘리자는 그날 밤 톰의 오두막에 갔습니다.`,
            `"톰 아저씨, 아저씨도 팔렸어요."`,
            `클로이가 일어섰습니다.`,
            `"뭐라고?"`,
            `"주인님이 오늘 서류에 이름을 적으셨어요. 아저씨하고 우리 해리요."`,
            `그리고 엘리자가 말했습니다.`,
            `"저는 오늘 밤에 도망칠 거예요. 아저씨도 같이 가요."`,
            `톰은 아무 말도 하지 않았습니다.`,
            `한참 뒤에 이렇게 말했습니다.`,
            `"너는 가거라."`,
            `"아저씨는요?"`,
            `"나는 못 간다."`,
            `"왜요."`,
            `톰이 말했습니다.`,
            `"내가 도망치면 주인님은 나 대신 다른 사람을 팔아야 한다. 그러면 이 농장 사람이 다 팔려 나갈 수도 있다."`,
            `"그건 아저씨 잘못이 아니잖아요."`,
            `"그래도 그렇게 된다."`,
            `클로이가 울면서 말했습니다.`,
            `"당신은 왜 늘 그래요."`,
            `톰은 아내의 손을 잡았습니다.`,
            `그리고 그날 밤 톰은 잠들지 못했습니다.`,
            `여기서 한 가지를 짚어 두어야 합니다.`,
            `톰이 도망치지 않은 것을 두고, 오랫동안 사람들이 두 가지로 말했습니다.`,
            `한쪽에서는 톰이 참을성 있고 착한 사람이라고 했습니다.`,
            `다른 쪽에서는 톰이 주인 말을 너무 잘 들었다고 했습니다.`,
            `그런데 이 이야기를 자세히 읽으면 그 두 가지가 다 맞지 않습니다.`,
            `톰은 순종한 것이 아니라 계산을 한 것입니다.`,
            `자기 하나 도망치면 마흔 사람이 대신 팔린다는 계산이었습니다.`,
            `그리고 그 계산은 실제로 맞았습니다.`,
            `이튿날 아침, 헤일리가 톰을 데리러 왔습니다.`,
            `톰의 손목에 쇠고랑을 채웠습니다.`,
            `셸비 부인이 그것을 보고 밖으로 나왔습니다.`,
            `"톰, 내가 반드시 다시 사 올게. 꼭 데려올게."`,
            `톰은 고개를 숙였습니다.`,
            `조지 도련님이 뛰어왔습니다.`,
            `열세 살이었습니다.`,
            `그리고 자기 목에 걸고 있던 은화를 끈에 매어 톰의 목에 걸어 주었습니다.`,
            `"아저씨, 내가 어른이 되면 반드시 찾아갈게."`
        ]
    },
    {
        num: 4,
        title: "얼음을 건너다",
        emoji: "🧊",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `그날 밤 엘리자는 아이를 업고 농장을 나섰습니다.`,
            `밤새 걸었습니다.`,
            `그리고 이튿날도 걸었습니다.`,
            `해가 질 무렵 오하이오 강에 이르렀습니다.`,
            `그 강을 건너면 자유가 있는 주였습니다.`,
            `그런데 강에 얼음이 떠 있었습니다.`,
            `한겨울 얼음이 녹기 시작한 참이라, 강 전체가 깨진 얼음덩이로 뒤덮여 있었습니다.`,
            `배가 다니지 못했습니다.`,
            `엘리자는 강가 여관에 들어가 기다리기로 했습니다.`,
            `그때 창밖에서 헤일리와 사람들이 오는 것이 보였습니다.`,
            `엘리자는 뒷문으로 나갔습니다.`,
            `그리고 강가로 뛰었습니다.`,
            `뒤에서 사람들이 쫓아왔습니다.`,
            `엘리자는 강둑에 섰습니다.`,
            `앞은 깨진 얼음이 떠다니는 강이었습니다.`,
            `뒤는 사람들이었습니다.`,
            `엘리자는 아이를 고쳐 업었습니다.`,
            `그리고 뛰었습니다.`,
            `첫 번째 얼음덩이 위에 발이 닿았습니다.`,
            `그것이 물속으로 가라앉았습니다.`,
            `엘리자는 그 위에서 다음 것으로 뛰었습니다.`,
            `그것도 기울었습니다.`,
            `그다음으로 뛰었습니다.`,
            `그렇게 강을 건넜습니다.`,
            `이 대목은 실제로 있었던 일입니다.`,
            `스토 부인은 이 이야기를 어느 목사에게서 들었습니다.`,
            `오하이오 강가에서 실제로 그렇게 강을 건넌 여자가 있었습니다.`,
            `강 건너에서 어떤 남자가 엘리자를 끌어올려 주었습니다.`,
            `그 사람은 엘리자가 어디서 왔는지 알아보았습니다.`,
            `그리고 이렇게 말했습니다.`,
            `"이 길로 저 언덕 위 흰 집으로 가시오. 거기 사람들이 도와줄 거요."`,
            `그 무렵 오하이오에는 도망친 사람들을 숨겨 주고 북쪽으로 보내 주는 사람들이 있었습니다.`,
            `퀘이커 교도들이 많았습니다.`,
            `그 일은 법을 어기는 일이었습니다.`,
            `그때 미국에는 도망친 노예를 도우면 벌을 받는 법이 있었습니다.`,
            `그런데도 그 사람들은 그렇게 했습니다.`
        ]
    },
    {
        num: 5,
        title: "강을 내려가는 배",
        emoji: "🚢",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `한편 톰은 헤일리에게 끌려 남쪽으로 갔습니다.`,
            `배를 타고 미시시피 강을 내려갔습니다.`,
            `그 배에는 팔려 가는 사람이 여럿 있었습니다.`,
            `그 가운데 아기를 안은 여자가 하나 있었습니다.`,
            `이름은 루시였습니다.`,
            `루시는 남편이 다른 데로 팔려 간 뒤였습니다.`,
            `그런데 아기는 아직 데리고 있었습니다.`,
            `배가 어느 나루에 섰을 때, 헤일리가 뭍에 내려갔습니다.`,
            `그리고 돌아와 그 아기를 데려갔습니다.`,
            `팔아 버린 것이었습니다.`,
            `루시가 잠깐 잠든 사이에요.`,
            `루시가 깨어나서 아기를 찾았습니다.`,
            `헤일리가 말했습니다.`,
            `"저 아래 나루에서 좋은 집에 갔다."`,
            `루시는 아무 소리도 내지 않았습니다.`,
            `그리고 갑판 끝에 가서 앉았습니다.`,
            `밤이 되었습니다.`,
            `톰은 밤에 그 자리를 지켜보았습니다.`,
            `그리고 새벽에 그 자리가 비어 있었습니다.`,
            `루시는 그 강에서 나오지 않았습니다.`,
            `헤일리는 그 일을 두고 이렇게 말했습니다.`,
            `"저러니까 손해라니까."`,
            `그 사람은 그 일을 사람이 죽은 일로 여기지 않았습니다.`,
            `장부에서 값이 빠진 일로 여겼습니다.`,
            `이 대목은 읽기가 아주 힘듭니다.`,
            `그런데 스토 부인이 이 대목을 넣은 까닭이 있습니다.`,
            `그 시절 미국 북쪽 사람들 가운데는 남쪽 일을 잘 모르는 사람이 많았습니다.`,
            `그리고 "그 사람들도 나름대로 잘 지낸다더라" 하고 말했습니다.`,
            `스토 부인은 그 말을 끝내려고 이 책을 썼습니다.`,
            `톰은 그 뒤로 여러 날 아무 말도 하지 않았습니다.`
        ]
    },
    {
        num: 6,
        title: "에바",
        emoji: "🌼",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `그 배에 승객이 하나 타고 있었습니다.`,
            `뉴올리언스의 부자 오귀스탱 생클레어였습니다.`,
            `그리고 그 딸 에반젤린이 함께 타고 있었습니다.`,
            `다들 에바라고 불렀습니다.`,
            `여섯 살이었고, 몸이 약했습니다.`,
            `에바는 배 안을 돌아다니며 사람들에게 말을 걸었습니다.`,
            `그리고 톰과 친해졌습니다.`,
            `톰이 나무를 깎아 장난감을 만들어 주었기 때문입니다.`,
            `어느 날 에바가 뱃전에서 몸을 내밀다가 물에 빠졌습니다.`,
            `톰이 뛰어들어 건져 냈습니다.`,
            `그날 저녁 생클레어가 톰에게 왔습니다.`,
            `"얼마면 되겠소."`,
            `"저는 값을 모릅니다."`,
            `"그 사람에게 물어보겠소."`,
            `생클레어는 헤일리에게서 톰을 샀습니다.`,
            `그리고 뉴올리언스의 자기 집으로 데려갔습니다.`,
            `그 집은 아주 컸습니다.`,
            `마당에 분수가 있고, 방마다 융단이 깔려 있었습니다.`,
            `생클레어는 이상한 사람이었습니다.`,
            `그 사람은 사람을 사고파는 것이 잘못이라는 것을 알고 있었습니다.`,
            `그리고 그것을 말로도 했습니다.`,
            `"이건 옳지 않소. 나도 아오."`,
            `그런데 아무것도 바꾸지 않았습니다.`,
            `그 집에는 그 사람이 부리는 사람이 서른 명 있었습니다.`,
            `톰이 물은 적이 있습니다.`,
            `"나리, 그럼 왜 그렇게 하십니까."`,
            `생클레어가 웃었습니다.`,
            `"톰, 나는 게으른 사람이오. 옳은 줄 아는 것과 그것을 하는 것은 다르오."`,
            `이 책에서 제일 무서운 사람은 나중에 나오는 못된 주인이 아닙니다.`,
            `생클레어입니다.`,
            `잘못인 줄 다 알면서 아무것도 하지 않는 사람이기 때문입니다.`,
            `그런 사람이 그 시절에 아주 많았습니다.`
        ]
    },
    {
        num: 7,
        title: "북쪽에서 온 사촌",
        emoji: "🧹",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `생클레어의 사촌 오필리아가 북쪽에서 왔습니다.`,
            `버몬트 사람이었습니다.`,
            `오필리아는 사람을 사고파는 것에 반대하는 사람이었습니다.`,
            `평생 그렇게 말해 왔습니다.`,
            `그런데 그 집에 와서 이상한 일이 생겼습니다.`,
            `오필리아는 흑인이 옆에 오는 것을 견디지 못했습니다.`,
            `말로는 반대했는데 몸이 그랬습니다.`,
            `생클레어가 그것을 알아채고 말했습니다.`,
            `"누님, 누님은 저 사람들을 위해서 애를 쓰지요. 그런데 저 사람들을 좋아하지는 않는군요."`,
            `"무슨 소리를 하는 거냐."`,
            `"우리 남쪽 사람들은 저 사람들과 붙어 자라서 가까이 있는 것은 아무렇지 않소. 다만 저 사람들을 사람으로 안 보지요."`,
            `"누님네는 저 사람들을 사람으로 보는데 옆에 오는 건 못 견디고."`,
            `"어느 쪽이 나은지는 나도 모르겠소."`,
            `오필리아는 그 말에 아무 대꾸도 하지 못했습니다.`,
            `그리고 그 뒤로 그 말을 오래 생각했습니다.`,
            `그 무렵 생클레어가 여자아이를 하나 사 왔습니다.`,
            `이름은 톱시였습니다.`,
            `여덟아홉 살쯤 되어 보였는데 자기 나이를 몰랐습니다.`,
            `부모도 몰랐습니다.`,
            `"너는 어디서 태어났니?"`,
            `"몰라요."`,
            `"어머니가 누구니?"`,
            `"없어요."`,
            `"그럼 너는 어떻게 생겼니?"`,
            `"그냥 자랐어요."`,
            `톱시는 물건을 훔치고 거짓말을 했습니다.`,
            `그리고 야단을 맞으면 웃었습니다.`,
            `생클레어가 오필리아에게 말했습니다.`,
            `"누님이 저 아이를 맡아 가르쳐 보시오."`,
            `오필리아는 그것을 맡았습니다.`,
            `그리고 여러 달 동안 아무것도 못 했습니다.`,
            `가르치면 그때뿐이었습니다.`,
            `어느 날 오필리아가 화가 나서 물었습니다.`,
            `"너는 왜 이러니?"`,
            `톱시가 이렇게 대답했습니다.`,
            `"저는 원래 나쁜 애예요. 다들 그러던데요."`,
            `오필리아는 그 대답을 듣고 말문이 막혔습니다.`,
            `그 아이는 평생 그 말만 들으며 자란 것이었습니다.`
        ]
    },
    {
        num: 8,
        title: "에바의 부탁",
        emoji: "✂️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `에바는 톱시를 미워하지 않은 유일한 사람이었습니다.`,
            `어느 날 에바가 톱시에게 말했습니다.`,
            `"톱시, 나는 네가 좋아."`,
            `톱시가 웃었습니다.`,
            `"거짓말."`,
            `"거짓말 아니야."`,
            `"아가씨는 저를 좋아할 수 없어요."`,
            `"왜?"`,
            `"저는 검으니까요."`,
            `에바가 손을 뻗어 톱시의 손을 잡았습니다.`,
            `그리고 이렇게 말했습니다.`,
            `"나는 그런 건 몰라. 나는 네가 좋아."`,
            `톱시는 그 자리에서 울기 시작했습니다.`,
            `아주 오래 울었습니다.`,
            `누가 자기를 좋아한다고 말한 것이 처음이었기 때문입니다.`,
            `오필리아가 그것을 옆에서 보고 있었습니다.`,
            `그리고 자기가 여러 달 동안 못 한 일을 여섯 살짜리가 한마디로 했다는 것을 알았습니다.`,
            `그해에 에바가 앓기 시작했습니다.`,
            `원래 몸이 약한 아이였습니다.`,
            `여러 달에 걸쳐 나빠졌습니다.`,
            `에바는 그것을 스스로 알고 있었습니다.`,
            `어느 날 에바가 아버지에게 말했습니다.`,
            `"아버지, 부탁이 하나 있어요."`,
            `"무엇이든 말해라."`,
            `"우리 집 사람들을 다 놓아 주세요."`,
            `생클레어는 아무 말도 하지 못했습니다.`,
            `"그리고 톰 아저씨는 꼭요."`,
            `"그래."`,
            `"약속해 주세요."`,
            `"약속하마."`,
            `에바는 그해 여름에 세상을 떠났습니다.`,
            `그리고 그 뒤로 그 집이 통째로 조용해졌습니다.`,
            `오필리아는 그 무렵 생클레어에게 이렇게 부탁했습니다.`,
            `"톱시를 나에게 법으로 넘겨 주게."`,
            `"왜요?"`,
            `"내가 저 아이를 데리고 북쪽으로 가겠네. 그리고 놓아 주겠네."`,
            `생클레어는 서류를 써 주었습니다.`,
            `오필리아는 그 서류를 받고 처음으로 톱시를 안았습니다.`
        ]
    },
    {
        num: 9,
        title: "지키지 못한 약속",
        emoji: "📄",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `생클레어는 딸의 부탁을 지키려고 했습니다.`,
            `그리고 톰에게 이렇게 말했습니다.`,
            `"톰, 자네를 자유롭게 해 주겠네. 서류를 준비하고 있네."`,
            `"고맙습니다, 나리."`,
            `"그런데 자네는 왜 그렇게 기뻐하지 않나."`,
            `"기쁩니다."`,
            `"자네 얼굴이 그렇지 않은데."`,
            `톰이 말했습니다.`,
            `"나리, 제가 자유가 되면 저는 켄터키로 가서 제 식구를 사 오려고 합니다. 그러려면 돈이 있어야 합니다."`,
            `생클레어는 그 말을 듣고 잠깐 아무 말도 하지 않았습니다.`,
            `자기가 지금까지 톰에게 삯을 준 적이 없다는 것을 그제야 생각한 것입니다.`,
            `"내가 돈도 주겠네."`,
            `"고맙습니다."`,
            `그리고 며칠 뒤였습니다.`,
            `생클레어가 저녁에 밖에 나갔습니다.`,
            `어느 술집 앞에서 사람들이 싸우고 있었습니다.`,
            `생클레어는 그것을 말리려고 들어갔습니다.`,
            `그리고 그 자리에서 칼에 찔렸습니다.`,
            `집으로 옮겨졌지만 그날 밤을 넘기지 못했습니다.`,
            `서류는 아직 만들어지지 않은 채였습니다.`,
            `생클레어 부인은 남편과 아주 다른 사람이었습니다.`,
            `그 사람은 사람을 사고파는 것에 아무 생각이 없었습니다.`,
            `장례가 끝나자 그 집 사람들을 다 팔기로 했습니다.`,
            `오필리아가 사정했습니다.`,
            `"동생이 톰에게 약속했네."`,
            `"서류가 없잖아요."`,
            `"약속을 했다니까."`,
            `"법이 그렇지 않습니다."`,
            `그 말이 그 시절 법으로는 맞는 말이었습니다.`,
            `그해 가을, 뉴올리언스의 어느 시장에서 그 집 사람들이 팔렸습니다.`,
            `톰도 그 자리에 섰습니다.`,
            `단 위에 서서 사람들이 값을 부르는 것을 들었습니다.`,
            `그리고 제일 높은 값을 부른 사람에게 넘어갔습니다.`,
            `그 사람의 이름은 사이먼 리그리였습니다.`
        ]
    },
    {
        num: 10,
        title: "붉은 강의 농장",
        emoji: "🌾",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `리그리의 농장은 붉은 강 상류의 외진 곳에 있었습니다.`,
            `가장 가까운 이웃까지 여러 시간이 걸렸습니다.`,
            `그리고 그 농장에서 무슨 일이 일어나는지 아무도 몰랐습니다.`,
            `리그리는 목화를 길렀습니다.`,
            `그 사람의 방식은 이랬습니다.`,
            `사람을 아주 싸게 사서, 오륙 년 안에 다 써 버리고, 다시 사는 것이었습니다.`,
            `그것이 오래 먹이며 부리는 것보다 남는다고 계산한 것입니다.`,
            `실제로 그 계산을 하는 사람들이 있었습니다.`,
            `리그리는 그것을 자랑처럼 말했습니다.`,
            `가는 배 안에서 리그리가 톰에게 말했습니다.`,
            `"너, 내가 어떤 사람인지 아나."`,
            `"모릅니다."`,
            `리그리가 주먹을 들어 보였습니다.`,
            `"이게 무엇 같나."`,
            `"주먹입니다."`,
            `"쇠다. 사람을 치면 뼈가 부러진다."`,
            `그리고 톰의 옷을 벗겨 좋은 것을 빼앗고 낡은 것을 주었습니다.`,
            `조지 도련님이 걸어 준 은화도 그때 빼앗겼습니다.`,
            `그런데 톰이 그것만은 되찾았습니다.`,
            `리그리가 값이 안 나가는 것이라고 던져 준 것입니다.`,
            `그 농장에는 사람이 여럿 있었습니다.`,
            `다들 얼굴에 표정이 없었습니다.`,
            `그리고 서로 돕지 않았습니다.`,
            `리그리가 그렇게 만들어 놓았기 때문입니다.`,
            `리그리는 사람들 가운데 둘을 골라 감독으로 세웠습니다.`,
            `샘보와 큄보였습니다.`,
            `같은 처지에 있는 사람들인데, 리그리가 그 둘에게 조금 나은 대접을 해 주고 나머지를 때리게 시켰습니다.`,
            `그것이 리그리가 쓰는 방법이었습니다.`,
            `사람들끼리 미워하게 만들어 놓으면, 아무도 함께 무언가를 하지 못합니다.`,
            `톰은 그 농장에 와서 그것을 보고 알았습니다.`
        ]
    },
    {
        num: 11,
        title: "채찍을 들라는 명령",
        emoji: "🪶",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `톰은 그 농장에서 일을 아주 잘했습니다.`,
            `목화를 남보다 많이 땄습니다.`,
            `그런데 일이 하나 났습니다.`,
            `그 농장에 나이 든 여자가 하나 있었습니다.`,
            `몸이 약해서 하루치를 못 채웠습니다.`,
            `저녁에 무게를 다는데 모자라면 벌을 받게 되어 있었습니다.`,
            `톰은 그것을 보고 자기 자루에서 목화를 덜어 그 사람 자루에 넣어 주었습니다.`,
            `그것이 리그리에게 들켰습니다.`,
            `리그리는 그날 밤 톰을 불렀습니다.`,
            `그리고 채찍을 주었습니다.`,
            `"저 여자를 때려라."`,
            `톰은 그 채찍을 받지 않았습니다.`,
            `"저는 못 합니다."`,
            `"뭐라고?"`,
            `"저는 그 일은 못 합니다."`,
            `리그리가 소리쳤습니다.`,
            `"너는 내 것이다. 내가 산 것이다. 값을 다 치렀다."`,
            `톰이 말했습니다.`,
            `"나리, 제 몸은 사셨습니다. 그건 맞습니다."`,
            `"그런데 제 안에 있는 것은 못 사셨습니다. 그건 값을 치를 수 있는 것이 아닙니다."`,
            `이 대목이 이 책에서 가장 중요한 대목입니다.`,
            `톰은 명령을 거부한 것입니다.`,
            `그것이 그 시절 그 자리에서 할 수 있는 가장 위험한 일이었습니다.`,
            `그날 밤 톰은 크게 맞았습니다.`,
            `그 뒤에 벌어진 일을 여기 자세히 적지 않겠습니다.`,
            `다만 톰은 그 뒤로도 여러 번 같은 말을 되풀이했습니다.`,
            `그리고 그때마다 맞았습니다.`,
            `그 농장 사람들이 그것을 다 보았습니다.`,
            `그리고 조금씩 달라졌습니다.`,
            `그전까지 그 사람들은 서로를 도우면 자기가 손해라고 배워 왔습니다.`,
            `그런데 손해를 보면서 남을 돕는 사람을 눈으로 본 것입니다.`
        ]
    },
    {
        num: 12,
        title: "카시",
        emoji: "🕯️",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그 농장에 카시라는 여자가 있었습니다.`,
            `그 집에서 오래 산 사람이었습니다.`,
            `카시는 원래 교육을 받은 사람이었습니다.`,
            `프랑스어를 할 줄 알았고, 피아노를 칠 줄 알았습니다.`,
            `아버지가 부자였고, 어릴 때는 좋은 집에서 자랐습니다.`,
            `그런데 아버지가 갑자기 죽고, 빚 문서가 나오면서 카시도 재산으로 셈해졌습니다.`,
            `그 뒤 여러 번 팔렸습니다.`,
            `카시에게는 아이가 둘 있었습니다.`,
            `둘 다 팔려 갔습니다.`,
            `카시는 톰을 처음 보았을 때 이렇게 말했습니다.`,
            `"당신은 오래 못 갑니다. 여기서는 착한 사람이 제일 먼저 부서집니다."`,
            `"그럴지도 모르지요."`,
            `"그럼 왜 그럽니까."`,
            `"저는 다른 방법을 모릅니다."`,
            `어느 날 밤 카시가 톰에게 왔습니다.`,
            `그리고 이렇게 말했습니다.`,
            `"오늘 밤에 저 사람을 끝냅시다. 술에 취해 자고 있습니다. 방법이 있습니다."`,
            `톰이 말했습니다.`,
            `"안 됩니다."`,
            `"왜요."`,
            `"그렇게 하면 우리도 저 사람과 같아집니다."`,
            `카시가 화를 냈습니다.`,
            `"당신은 저 사람이 우리한테 무슨 짓을 했는지 알잖아요."`,
            `"압니다."`,
            `"그런데도요?"`,
            `톰은 한참 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.`,
            `"카시, 여기서 나가시오. 죽이지 말고 나가시오. 그게 이기는 것입니다."`,
            `그리고 톰은 방법을 하나 일러 주었습니다.`,
            `그 농장 다락에는 아무도 올라가지 않는 방이 있었습니다.`,
            `리그리가 그 다락을 무서워했기 때문입니다.`,
            `귀신이 나온다는 소문이 있었습니다.`,
            `그 소문을 처음 낸 것도 카시였습니다.`,
            `카시와 에멀린이라는 젊은 여자는 그 다락에 숨었습니다.`,
            `그리고 도망친 것처럼 꾸몄습니다.`,
            `리그리는 개를 풀어 늪을 다 뒤졌습니다.`,
            `그리고 못 찾았습니다.`,
            `두 사람은 바로 그 집 다락에 있었습니다.`
        ]
    },
    {
        num: 13,
        title: "말하지 않다",
        emoji: "🌑",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `리그리는 톰이 무언가를 알고 있다고 여겼습니다.`,
            `그래서 톰을 불렀습니다.`,
            `"그 여자들 어디 있나."`,
            `"모릅니다."`,
            `"거짓말 마라. 너는 안다."`,
            `톰은 아무 말도 하지 않았습니다.`,
            `리그리가 말했습니다.`,
            `"말하면 놓아 주겠다. 그리고 감독으로 세워 주겠다."`,
            `"······."`,
            `"안 말하면 죽인다."`,
            `톰이 말했습니다.`,
            `"나리, 저는 안다고 해도 말하지 않을 것입니다."`,
            `"왜냐."`,
            `"그 사람들은 이제 겨우 살길을 찾았습니다."`,
            `리그리는 그날 샘보와 큄보를 불렀습니다.`,
            `그 뒤에 있었던 일은 적지 않겠습니다.`,
            `이틀이 지났습니다.`,
            `톰은 그 농장의 헛간에 누워 있었습니다.`,
            `샘보와 큄보가 밤에 그리로 왔습니다.`,
            `두 사람은 리그리가 시키는 대로 한 사람들이었습니다.`,
            `그런데 그날 밤에는 물을 가지고 왔습니다.`,
            `그리고 톰에게 물었습니다.`,
            `"아저씨, 우리를 미워하십니까."`,
            `톰이 말했습니다.`,
            `"아니오."`,
            `"우리가 그렇게 했는데요."`,
            `"당신들도 시키니까 한 거요."`,
            `두 사람은 그 자리에서 울었습니다.`,
            `그리고 그날 밤 이후로 그 두 사람은 다시는 사람을 때리지 않았습니다.`,
            `리그리가 시켜도 하지 않았습니다.`,
            `그 농장에서 그런 일이 일어난 것은 처음이었습니다.`
        ]
    },
    {
        num: 14,
        title: "너무 늦게 온 사람",
        emoji: "🐎",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `그 무렵 켄터키에서 사람이 하나 출발했습니다.`,
            `조지 셸비였습니다.`,
            `톰이 팔려 간 그해에 열세 살이던 아이가 이제 청년이 되어 있었습니다.`,
            `아버지 셸비 씨는 세상을 떠났습니다.`,
            `조지는 농장을 물려받자마자 톰을 찾기 시작했습니다.`,
            `여러 해가 걸렸습니다.`,
            `기록을 따라가고, 사람을 만나고, 편지를 쓰고, 배를 탔습니다.`,
            `그러다 마침내 붉은 강의 그 농장을 찾아냈습니다.`,
            `조지는 그 집 마당에 말을 세웠습니다.`,
            `그리고 리그리에게 톰을 사겠다고 했습니다.`,
            `리그리가 헛간을 가리켰습니다.`,
            `조지는 그 헛간에 들어갔습니다.`,
            `그리고 톰을 찾아냈습니다.`,
            `"톰 아저씨."`,
            `톰이 눈을 떴습니다.`,
            `그리고 그 얼굴을 알아보았습니다.`,
            `"······조지 도련님."`,
            `"제가 왔어요. 아저씨를 사러 왔어요. 집에 갑시다."`,
            `톰은 그 손을 잡았습니다.`,
            `"도련님이 오셨으니 저는 됐습니다."`,
            `"아저씨, 일어나세요."`,
            `"도련님."`,
            `"네."`,
            `"클로이에게 제가 마지막까지 잊지 않았다고 전해 주십시오."`,
            `조지는 그 자리에서 울었습니다.`,
            `톰은 그날 세상을 떠났습니다.`,
            `조지는 톰의 목에 걸린 은화를 보았습니다.`,
            `자기가 열세 살에 걸어 준 것이었습니다.`,
            `여러 해 동안, 여러 사람의 손을 거쳐 팔려 다니면서도 그것이 그 자리에 있었습니다.`,
            `조지는 리그리를 찾아갔습니다.`,
            `그리고 그를 쳤습니다.`,
            `그런데 그 이상은 할 수 없었습니다.`,
            `그 시절 법으로는 리그리가 아무 잘못도 하지 않은 것이었기 때문입니다.`,
            `자기 재산을 자기가 어떻게 하든 상관없다는 것이 그 시절 법이었습니다.`,
            `조지는 톰을 그 농장 옆 언덕에 묻었습니다.`,
            `그리고 그 무덤 앞에서 이렇게 말했습니다.`,
            `"제가 오늘 여기서 정하겠습니다. 제 손에 있는 모든 사람을 놓아 주겠습니다."`
        ]
    },
    {
        num: 15,
        title: "그 뒤에 일어난 일",
        emoji: "📖",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `조지 셸비는 켄터키로 돌아가 그 약속을 지켰습니다.`,
            `농장 사람들을 다 불러 모으고 서류를 나누어 주었습니다.`,
            `사람들이 물었습니다.`,
            `"이제 어디로 갑니까?"`,
            `조지가 말했습니다.`,
            `"여기 있어도 됩니다. 다만 이제부터는 삯을 받고 일하는 겁니다. 그리고 가고 싶으면 언제든 가도 됩니다."`,
            `그리고 이렇게 덧붙였습니다.`,
            `"이걸 볼 때마다 톰 아저씨를 생각하십시오. 저는 그럴 겁니다."`,
            `엘리자와 해리는 그 뒤 캐나다까지 갔습니다.`,
            `가는 길에 엘리자의 남편 조지 해리스도 만났습니다.`,
            `그 사람은 따로 도망친 참이었습니다.`,
            `세 식구는 캐나다에서 다시 만났습니다.`,
            `그리고 카시도 나중에 그 가족을 찾아냈습니다.`,
            `엘리자가 카시가 어릴 때 잃은 딸이었기 때문입니다.`,
            `톱시는 오필리아와 함께 북쪽으로 갔습니다.`,
            `그리고 자유가 되었고, 학교에 다녔습니다.`,
            `나중에 아프리카로 가서 아이들을 가르치는 일을 했다고 합니다.`,
            `이 책은 천팔백오십이 년에 나왔습니다.`,
            `그리고 그해에만 삼십만 부가 팔렸습니다.`,
            `그때 미국 인구를 생각하면 어마어마한 수입니다.`,
            `남쪽에서는 이 책을 금지했습니다.`,
            `가지고 있다가 걸리면 벌을 받는 주도 있었습니다.`,
            `그리고 십 년 뒤에 남북 전쟁이 났습니다.`,
            `그 전쟁이 끝나면서 미국에서 사람을 사고파는 일이 법으로 끝났습니다.`,
            `나중에 링컨 대통령이 스토 부인을 만나 이렇게 말했다는 이야기가 전해집니다.`,
            `"이 큰 전쟁을 일으킨 책을 쓰신 작은 부인이시군요."`,
            `그 말을 정말로 했는지는 확실하지 않습니다.`,
            `그런데 그 말이 오래 전해진 까닭은 있습니다.`,
            `이 책이 나오기 전까지, 북쪽 사람들 가운데 상당수는 그 일을 남의 일로 여겼습니다.`,
            `이 책을 읽고 나서 그러기가 어려워졌습니다.`,
            `한 가지 덧붙일 것이 있습니다.`,
            `이 책이 나온 뒤로 '톰 아저씨'라는 말이 나쁜 뜻으로 쓰이게 된 적이 있습니다.`,
            `백인에게 굽실거리는 사람이라는 뜻이었습니다.`,
            `그런데 그 뜻은 이 책에서 온 것이 아닙니다.`,
            `이 책이 나온 뒤 여기저기서 이 이야기를 연극으로 올렸는데, 그 연극들이 톰을 그렇게 바꿔 놓았습니다.`,
            `원작의 톰은 굽실거리는 사람이 아닙니다.`,
            `채찍을 들라는 명령을 거부하고, 두 사람이 숨은 곳을 끝까지 말하지 않은 사람입니다.`,
            `그리고 그 때문에 세상을 떠난 사람입니다.`
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
                ${artFrame('cover.png', '🏚️')}
            </div>
            <div class="story-page-right">
                <h1>톰 아저씨의 오두막</h1>
                <p class="cover-tag">해리엇 비처 스토 원작</p>
                <p>백칠십 년쯤 전 미국 남부에서는 사람을 사고팔았습니다. 부부를 따로 팔 수 있었고, 어머니와 아기를 따로 팔 수 있었습니다. 그것이 법에 어긋나지 않았습니다.</p>
                <p>이 책이 나오고 십 년 뒤에 남북 전쟁이 났습니다. 지어낸 이야기가 아니라 실제로 있었던 일들을 모아 쓴 책입니다.</p>
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
    { q: "이 책에 나오는 일들은 어떤 것입니까?", choices: ["지어낸 이야기", "실제로 있었던 일들을 모은 것", "옛날 전설"], answer: 1 },
    { q: "톰이 강 건너 자유가 있는 주에 심부름을 갔다가 돌아온 것은 무엇을 보여 줍니까?", choices: ["겁이 많았다", "달아날 수 있었는데 돌아왔다", "길을 몰랐다"], answer: 1 },
    { q: "셸비가 톰을 판 까닭은 무엇입니까?", choices: ["미워서", "투자를 잘못해 빚을 져서", "일을 못해서"], answer: 1 },
    { q: "톰이 도망치지 않은 진짜 까닭은 무엇입니까?", choices: ["주인을 좋아해서", "자기가 도망치면 다른 사람들이 대신 팔린다고 계산해서", "겁이 나서"], answer: 1 },
    { q: "엘리자가 오하이오 강을 건넌 방법은 무엇입니까?", choices: ["배를 탔다", "깨진 얼음덩이를 밟고 건넜다", "다리로 건넜다"], answer: 1 },
    { q: "그 시절 도망친 사람을 도우면 어떻게 되었습니까?", choices: ["상을 받았다", "법으로 벌을 받았다", "아무 일도 없었다"], answer: 1 },
    { q: "톰을 사서 뉴올리언스로 데려간 사람은 누구입니까?", choices: ["헤일리", "생클레어", "리그리"], answer: 1 },
    { q: "이 책에서 생클레어가 무서운 사람인 까닭은 무엇입니까?", choices: ["사람을 때려서", "잘못인 줄 다 알면서 아무것도 하지 않아서", "돈이 많아서"], answer: 1 },
    { q: "오필리아가 스스로 알게 된 것은 무엇입니까?", choices: ["말로는 반대하면서 곁에 오는 것은 못 견뎠다는 것", "남쪽이 옳다는 것", "가르치는 재주가 있다는 것"], answer: 0 },
    { q: "톱시가 달라진 계기는 무엇입니까?", choices: ["매를 맞아서", "에바가 좋아한다고 말해 줘서", "공부를 해서"], answer: 1 },
    { q: "톰이 자유가 되지 못한 까닭은 무엇입니까?", choices: ["거절해서", "생클레어가 서류를 만들기 전에 세상을 떠나서", "돈이 없어서"], answer: 1 },
    { q: "리그리가 사람들끼리 미워하게 만든 까닭은 무엇입니까?", choices: ["재미로", "함께 무언가를 하지 못하게 하려고", "감독이 필요해서"], answer: 1 },
    { q: "톰이 리그리에게 한 말은 무엇입니까?", choices: ["제 몸은 사셨지만 제 안에 있는 것은 못 사셨습니다", "저를 놓아 주십시오", "잘못했습니다"], answer: 0 },
    { q: "톰이 카시에게 죽이지 말라고 한 까닭은 무엇입니까?", choices: ["무서워서", "그렇게 하면 우리도 저 사람과 같아져서", "들킬까 봐"], answer: 1 },
    { q: "톰이 끝까지 말하지 않은 것은 무엇입니까?", choices: ["주인의 비밀", "카시와 에멀린이 숨은 곳", "돈이 있는 곳"], answer: 1 },
    { q: "'톰 아저씨'가 나쁜 뜻으로 쓰이게 된 것은 어디서 왔습니까?", choices: ["원작", "원작을 바꿔 올린 연극들", "작가의 말"], answer: 1 }
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
            ${artFrame('end.png', '📖')}
            <h2>톰 아저씨의 오두막를 다 읽었습니다</h2>
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
