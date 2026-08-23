const BOOK_TITLE = "시튼 동물기";

const CHAPTER_LABEL = () => '';

const CHAPTERS = [
    {
        num: 1,
        title: "늑대 왕 로보",
        emoji: "🐺",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `미국 뉴멕시코에 쿠럼포라는 목장 지대가 있습니다. 풀이 넓게 자라고 소를 많이 치는 곳입니다. 천팔백구십 년대에 그 지방에는 늑대 무리가 하나 있었습니다.`,
            `쿠럼포는 강 이름에서 온 말입니다. 그 강을 따라 목장이 늘어서 있었습니다.`,
            `다섯 마리뿐이었는데, 그 다섯이 다섯 해 동안 소를 이천 마리 넘게 잡았습니다. 그 무리의 우두머리를 사람들은 로보라고 불렀습니다. 늙은 수컷이었고, 보통 늑대보다 몸집이 훨씬 컸습니다.`,
            `발자국이 아주 커서 그것만 보고도 로보인 줄 알았습니다. 로보에게는 여러 가지가 알려져 있었습니다.`,
            `앞발 자국이 어른 손바닥만 했습니다.`,
            `첫째, 로보는 독을 절대 먹지 않았습니다.`,
            `사람들이 고기에 독을 넣어 놓으면, 로보는 그것을 파내어 한데 모아 놓고 그 위에 표시를 하고 갔습니다.`,
            `그렇게 하고 간 자리를 시튼은 여러 번 보았습니다.`,
            `둘째, 로보는 덫을 알아보았습니다. 사람들이 덫을 놓으면 그 자리를 피해 갔습니다.`,
            `덫에 사람 냄새가 남아 있으면 그 자리를 멀찍이 돌아갔습니다. 그래서 사냥꾼들은 덫을 피에 삶고 나서 놓았습니다.`,
            `셋째, 로보는 죽은 짐승을 먹지 않았습니다. 자기가 잡은 것만 먹었습니다. 그 지방 목장 주인들이 로보의 머리에 상금을 걸었습니다.`,
            `천 달러였습니다. 그 시절 큰돈이었습니다. 사냥꾼들이 몰려왔습니다.`,
            `말 한 필이 스무 달러 하던 때였습니다.`,
            `아무도 잡지 못했습니다. 천팔백구십사 년, 이 글을 쓰는 시튼이 그 지방에 갔습니다. 시튼은 그때 서른 몇 살이었고, 덫을 놓는 데 자신이 있었습니다.`,
            `시튼은 넉 달 동안 온갖 방법을 다 썼습니다.`,
            `그동안 로보는 소를 계속 잡았습니다. 시튼이 온 뒤로 오히려 더 잡았습니다.`,
            `독을 여섯 가지로 바꿔 가며 놓았습니다. 로보는 다 파냈습니다.`,
            `덫을 백서른 개 놓았습니다. 로보는 다 피했습니다.`,
            `한번은 좁은 길목에 덫을 넉 줄로 늘어놓았습니다. 이튿날 가 보니 로보가 그 길로 들어와서, 덫이 없는 자리만 골라 밟고 지나갔습니다. 그리고 그 끝에서 덫을 하나 파내어 뒤집어 놓고 갔습니다.`,
            `시튼은 그날 하루 종일 아무 말도 하지 않았다고 적었습니다.`,
            `시튼은 그해 여름에 이런 것을 알아냈습니다. 로보의 무리에 흰 늑대가 하나 있었습니다. 발자국이 작고 걸음이 가벼웠습니다.`,
            `사람들은 그것을 블랑카라고 불렀습니다. 그리고 로보가 그 늑대와 늘 함께 다닌다는 것을 알았습니다. 블랑카는 로보만큼 조심스럽지 않았습니다.`,
            `시튼은 그것을 이용하기로 했습니다.`,
            `그 방법이 어떤 것이었는지 시튼은 나중에 아주 자세히 적었습니다. 자기가 한 일을 감추지 않으려고 그렇게 적은 것입니다.`,
            `여기서부터가 이 이야기에서 제일 아픈 대목입니다. 시튼은 블랑카를 먼저 덫으로 잡았습니다. 그리고 그 몸을 끌고 다니면서 그 냄새를 온 들판에 묻혔습니다.`,
            `그 냄새를 따라가면 덫이 있게 해 놓은 것입니다. 로보는 그 뒤로 이틀 동안 그 자리를 맴돌며 울었습니다. 그 소리를 목장 사람들이 다 들었습니다.`,
            `한 사람은 나중에 이렇게 말했습니다.<br>"짐승이 그렇게 우는 것은 처음 들었습니다."`,
            `그리고 로보는 그 냄새를 따라갔습니다. 그동안 그렇게 조심하던 짐승이, 그날은 덫을 살피지 않았습니다. 사흘째 되는 날 아침, 시튼은 덫에 걸린 로보를 발견했습니다.`,
            `네 발이 다 걸려 있었습니다. 로보는 시튼을 보고 일어섰습니다. 그리고 짖지 않았습니다.`,
            `기운이 다 빠졌는데도 서 있었습니다.`,
            `시튼은 그 자리에서 로보를 쏘지 못했습니다. 대신 목에 줄을 걸어 목장으로 데려갔습니다. 그리고 마당에 매어 두고 고기와 물을 주었습니다.`,
            `로보는 그것을 먹지 않았습니다. 그리고 들판 쪽만 보고 있었습니다.`,
            `사람들이 사흘을 두고 보았지만 물 한 모금 마시지 않았습니다.`,
            `이튿날 아침, 로보는 그 자리에서 세상을 떠나 있었습니다. 상처는 없었습니다. 사람들은 그 몸을 블랑카 옆에 놓아 주었습니다.`,
            `줄이 끊긴 것도 아니었습니다. 목걸이가 그대로 매여 있었습니다.`,
            `시튼은 그 뒤로 다시는 늑대를 잡지 않았습니다. 그리고 평생 야생 동물을 지키는 일을 했습니다.`
        ]
    },
    {
        num: 2,
        title: "은점박이",
        emoji: "🐦‍⬛",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `캐나다 토론토 가까이에 소나무 골짜기가 있었습니다. 그곳에서 해마다 겨울이면 까마귀 이백 마리가 함께 잤습니다. 그 무리의 우두머리는 늙은 수컷이었습니다.`,
            `까마귀는 겨울에 그렇게 한데 모여 잡니다. 여럿이 모이면 밤에 부엉이를 막기 쉽기 때문입니다.`,
            `턱 아래에 은빛 반점이 하나 있어서, 시튼은 그것을 은점박이라고 불렀습니다. 시튼은 다섯 해 동안 그 무리를 지켜보았습니다. 그리고 까마귀에 대해 이런 것들을 알아냈습니다.`,
            `첫째, 까마귀는 말을 씁니다. 소리가 스무 가지가 넘었습니다. 짧게 두 번은 안전, 길게 세 번은 사람, 아주 날카롭게 하나는 총이었습니다.`,
            `시튼은 그 소리를 하나하나 공책에 적어 두었습니다.`,
            `시튼이 총을 들고 나가면 그 소리가 났고, 총 없이 나가면 나지 않았습니다.`,
            `둘째, 무리에 규율이 있었습니다. 아침에 골짜기를 나설 때 순서가 있었습니다. 그리고 먹이를 찾으러 갈 때 늘 보초를 세웠습니다.`,
            `보초를 서는 까마귀는 먹지 않고 높은 데 앉아 있었습니다. 그러다 교대를 했습니다.`,
            `보초가 소리를 내면 이백 마리가 한꺼번에 날아올랐습니다.`,
            `셋째, 은점박이는 훈련을 시켰습니다.`,
            `여름이면 그해에 태어난 어린 까마귀들을 데리고 다니면서 하나씩 가르쳤습니다. 시튼은 그것을 여러 번 보았습니다.`,
            `가르치는 일이 여름 내내 이어졌습니다.`,
            `허수아비 앞에 데려가서 그것이 사람이 아니라는 것을 보여 주고, 총을 든 사람 앞에는 못 가게 했습니다. 한번은 이런 일이 있었습니다. 시튼이 소나무 뒤에 숨어 있었는데 은점박이가 그것을 못 보고 지나갔습니다. 그런데 오십 걸음쯤 가서 갑자기 돌아섰습니다.`,
            `그리고 그 나무를 한 바퀴 돌아 시튼을 확인했습니다. 그러고 나서 경고 소리를 냈습니다. 무언가 이상하다고 느끼면 반드시 돌아와 확인하는 것이었습니다.`,
            `은점박이는 아주 늙었습니다. 날개 깃이 닳아 있었고, 부리에 흠이 많았습니다. 시튼은 그 나이를 스무 살이 넘었을 것으로 보았습니다.`,
            `그렇게 오래 사는 까마귀는 드뭅니다.`,
            `어느 해 봄, 은점박이가 무리와 함께 오지 않았습니다. 시튼은 여러 날 그 골짜기를 뒤졌습니다. 그리고 언덕 아래에서 그 몸을 찾아냈습니다.`,
            `부엉이에게 당한 것이었습니다. 늙어서 밤에 눈이 어두워진 것이 아닐까 하고 시튼은 적었습니다.`,
            `부엉이는 까마귀의 오랜 적입니다. 밤에는 부엉이 쪽이 훨씬 잘 봅니다.`,
            `그 뒤로 그 무리에는 다른 우두머리가 생겼습니다. 그런데 그 뒤로 여러 해 동안, 그 무리는 예전만큼 하지 못했습니다. 시튼은 그 대목에 이렇게 적었습니다.`,
            `"우리는 짐승이 그저 본능으로 산다고 배웠다. 그런데 저 무리가 잘하던 것들은 은점박이가 죽자 함께 사라졌다."`,
            `"그것이 본능이라면 사라질 리가 없다. 저것은 가르쳐서 이어지던 것이었다."`
        ]
    },
    {
        num: 3,
        title: "솜꼬리토끼 랙",
        emoji: "🐇",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `올리팬트 늪에 솜꼬리토끼가 살았습니다. 어미 이름은 몰리, 새끼 이름은 랙이었습니다. 랙은 아주 어릴 때 뱀에게 귀를 물려 찢어졌습니다. 그래서 그런 이름이 붙었습니다.`,
            `솜꼬리토끼는 꼬리 안쪽이 하얗습니다. 달아날 때 그 하얀 것이 깜빡깜빡 보입니다.`,
            `찢어진 귀라는 뜻입니다. 몰리는 랙에게 여러 가지를 가르쳤습니다. 토끼가 배워야 할 것은 아주 많았습니다.`,
            `첫째, 위험할 때는 뛰지 말고 얼어붙어야 합니다. 토끼는 털빛이 풀빛과 비슷해서, 가만히 있으면 잘 보이지 않습니다. 뛰면 그때 눈에 띕니다.`,
            `랙은 이것을 익히는 데 제일 오래 걸렸습니다. 무서우면 다리가 저절로 움직였기 때문입니다.`,
            `둘째, 굴 근처에서는 절대 곧장 굴로 들어가지 않습니다. 한 바퀴 돌아서, 뛰어서 건너뛰어 들어갑니다. 발자국이 굴 앞에서 끊기게 하는 것입니다.`,
            `쫓아오던 짐승은 그 자리에서 냄새를 잃습니다.`,
            `셋째, 개에게 쫓기면 물로 갑니다. 물에 들어가면 냄새가 끊깁니다.`,
            `넷째, 가시덤불로 들어갑니다.`,
            `랙이 사는 늪 가운데에도 아주 두꺼운 찔레 덤불이 하나 있었습니다.`,
            `토끼는 낮게 지나갈 수 있지만 큰 짐승은 못 들어옵니다. 랙은 이것을 하나씩 배웠습니다. 그리고 여러 번 죽을 뻔했습니다.`,
            `한번은 뱀에게 붙잡혔습니다. 그때 몰리가 달려와 뱀을 물어뜯어 구했습니다.`,
            `몰리는 그때 앞발로 뱀의 머리를 밟고 물어뜯었습니다.`,
            `한번은 매에게 쫓겼습니다. 그때 덤불로 들어가 살았습니다.`,
            `한번은 사냥개에게 쫓겼습니다. 그때 몰리가 한 일이 이 이야기에서 제일 놀랍습니다. 몰리는 개가 랙을 쫓는 것을 보고, 일부러 개 앞으로 나갔습니다. 그리고 개가 자기를 쫓게 만들었습니다.`,
            `그러고는 늪 쪽으로 달렸습니다. 그 늪 한가운데에는 깊은 물이 있었습니다. 몰리는 그 물을 헤엄쳐 건널 수 있었습니다.`,
            `토끼는 헤엄을 잘 치지 않습니다. 그런데 몰리는 칠 줄 알았습니다.`,
            `개는 그러지 못했습니다. 그 개는 그날 그 늪에서 나오지 못했습니다. 랙은 그것을 보고 자랐습니다.`,
            `한 해가 지나자 랙은 그 늪에서 제일 빠른 토끼가 되었습니다. 그리고 그 늪을 손금 보듯 알았습니다. 어느 굴에 뱀이 사는지, 어느 자리에 발이 빠지는지, 어느 덤불이 제일 두꺼운지.`,
            `몰리는 그해 겨울에 세상을 떠났습니다. 누가 놓은 총에 맞은 것이었습니다. 랙은 그 늪에서 오래 살았습니다.`,
            `랙을 쫓던 총이 아니었습니다. 몰리가 랙 앞으로 나갔던 것입니다.`,
            `시튼은 이 이야기 끝에 이렇게 적었습니다.`,
            `"토끼가 오래 사는 것은 빠르기 때문이 아니다. 아는 것이 많기 때문이다."`,
            `"그리고 그 아는 것은 다 어미에게서 온 것이다."`
        ]
    },
    {
        num: 4,
        title: "스프링필드의 여우",
        emoji: "🦊",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `이 이야기는 시튼이 소년 때 겪은 일입니다.`,
            `열몇 살 무렵의 일이라고 했습니다.`,
            `그 무렵 마을에서 닭이 자꾸 없어졌습니다. 사람들은 여우 짓이라고 했습니다.`,
            `한 집에서 하루에 세 마리가 없어진 적도 있었습니다.`,
            `시튼과 몇 사람이 그 여우 굴을 찾아냈습니다. 언덕 비탈의 모래 굴이었습니다. 그 앞에 새끼 네 마리가 놀고 있었습니다.`,
            `굴 앞에 뼈와 깃털이 흩어져 있었습니다. 그것을 보고 찾아낸 것입니다.`,
            `시튼은 여러 날 그 굴을 지켜보았습니다. 그리고 어미 여우가 하는 것을 다 보았습니다. 어미는 밤에 나가 먹이를 물어 왔습니다. 그리고 새끼들에게 사냥을 가르쳤습니다.`,
            `살아 있는 쥐를 물어다 놓아주고 잡게 하는 식이었습니다. 한번은 어미가 새끼 하나를 발로 밀어 냈습니다. 그 새끼가 굴 밖으로 너무 멀리 나갔기 때문입니다.`,
            `새끼가 놓치면 어미가 다시 잡아다 놓아주었습니다.`,
            `여우는 새끼를 그렇게 가르쳤습니다. 그런데 마을 사람들이 그 굴을 파기로 했습니다. 사람들이 삽을 들고 갔습니다.`,
            `굴을 파는 데 어른 여럿이 반나절을 매달렸습니다.`,
            `그날 새끼 셋이 죽고 하나가 살아남았습니다. 살아남은 새끼를 사람들이 데려와 마당의 기둥에 사슬로 매어 두었습니다. 시튼은 그것을 보고 마음이 좋지 않았습니다. 그런데 어른들이 하는 일이라 말리지 못했습니다.`,
            `그날 밤부터 이상한 일이 일어났습니다. 어미 여우가 밤마다 그 마당에 왔습니다. 그리고 새끼에게 먹이를 물어다 주었습니다.`,
            `닭이나 쥐를 물어 왔습니다. 어떤 밤에는 두 번도 왔습니다.`,
            `개가 있고 사람이 있는 마당이었습니다. 그런데도 왔습니다. 시튼은 밤에 창가에 앉아 그것을 보았습니다.`,
            `여우가 사람 사는 마당에 밤마다 들어오는 것은 있을 수 없는 일이었습니다.`,
            `어미는 사슬을 물어뜯으려고 했습니다. 이빨이 부러질 때까지 물었습니다. 그래도 끊어지지 않았습니다.`,
            `쇠사슬이었습니다.`,
            `그렇게 여러 밤이 지났습니다. 그리고 어느 날 아침, 새끼가 죽어 있었습니다. 상처는 없었습니다.`,
            `새끼는 그동안 사슬에 목이 쓸려 털이 벗겨져 있었습니다.`,
            `그 옆에 먹이가 놓여 있었습니다. 독이 있는 미끼였습니다. 사람들이 여우를 잡으려고 마을 여기저기에 놓아둔 것이었습니다.`,
            `그 미끼는 여우에게 잘 알려진 것이었습니다. 어미가 그것을 몰랐을 리 없습니다.`,
            `어미가 그것을 물어다 준 것입니다. 시튼은 그것이 실수인지 아닌지를 오래 생각했습니다. 그리고 이 이야기 끝에 이렇게만 적었습니다.`,
            `"나는 그 뒤로 그 여우를 다시 보지 못했다."<br>"그리고 나는 그 마당의 기둥을 지날 때마다 걸음이 빨라진다."`
        ]
    },
    {
        num: 5,
        title: "내 개 빙고",
        emoji: "🐶",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `이것은 시튼이 캐나다에서 농장 일을 할 때의 이야기입니다. 이웃집에서 강아지를 하나 얻었습니다. 검은 개였고, 이름을 빙고라고 지었습니다.`,
            `그 무렵 시튼은 스물 몇 살이었고, 그림을 그려 팔면서 농장 일을 도왔습니다.`,
            `빙고는 자라면서 이상한 개가 되었습니다. 집에 붙어 있지 않았습니다. 낮에는 어디로 갔는지 알 수 없었고, 저녁이면 돌아왔습니다. 그리고 사람 곁에 오래 있지 않았습니다.`,
            `개는 사람 곁에 있으려고 하는 짐승인데 빙고는 그러지 않았습니다.`,
            `쓰다듬으면 잠깐 있다가 슬쩍 빠져나갔습니다. 그래도 빙고는 시튼을 알아보았습니다. 아주 멀리서도 알아보았습니다.`,
            `이름을 부르면 귀만 움직이고 오지는 않았습니다.`,
            `빙고에게는 한 가지 재주가 있었습니다. 소를 모는 것이었습니다. 누가 가르친 적이 없는데 아주 잘했습니다.`,
            `어느 소가 어느 우리 것인지도 알았습니다.`,
            `저녁에 소가 안 들어오면 빙고 혼자 나가서 몰고 왔습니다. 시튼은 나중에 그 농장을 떠났습니다. 빙고는 다른 사람에게 맡겨졌습니다.`,
            `그 농장에서 빙고를 대신할 것은 없었습니다.`,
            `여러 해가 지났습니다. 어느 겨울, 시튼이 그 지방에 다시 갔습니다. 늑대를 잡으려고 덫을 여러 개 놓아둔 참이었습니다. 그런데 밤에 덫을 살피러 가다가 시튼 자신이 덫에 걸렸습니다.`,
            `손이 걸렸습니다. 그리고 다른 손으로 그것을 벌리려다가 그 손마저 다른 덫에 걸렸습니다. 두 손이 다 묶인 것이었습니다.`,
            `늑대 덫은 사람 힘으로는 잘 벌어지지 않습니다.`,
            `영하 이십 도가 넘는 밤이었습니다. 그리고 아무도 그가 어디 있는지 몰랐습니다. 시튼은 그 자리에서 여러 시간을 보냈습니다.`,
            `그런 밤에 손이 얼면 손을 잘라 내야 합니다.`,
            `손이 얼기 시작했습니다. 그때 어둠 속에서 무언가가 다가왔습니다. 늑대인 줄 알았습니다. 그런데 개였습니다.`,
            `빙고였습니다. 빙고는 여러 해 동안 그 지방을 돌아다니고 있었던 것입니다. 빙고는 시튼 곁에 와서 앉았습니다. 그리고 밤새 그 옆에 있었습니다.`,
            `여러 해 만에 만난 것인데도 알아보았습니다.`,
            `늑대가 다가오면 짖어서 쫓았습니다. 아침에 사람들이 시튼을 찾아냈습니다. 빙고가 그 자리에서 계속 짖고 있었기 때문입니다.`,
            `아침까지 그 자리를 뜨지 않았습니다.`,
            `시튼은 손을 잃지 않았습니다. 그 뒤로 빙고는 또 사라졌습니다. 그리고 몇 해 뒤에 세상을 떠났습니다.`,
            `손가락 두 개가 오래 저렸다고만 적었습니다.`,
            `독이 든 미끼를 먹은 것이었습니다. 늑대를 잡으려고 놓아둔 것이었습니다. 죽기 전에 빙고는 예전에 살던 그 농장 문 앞까지 걸어갔습니다. 그리고 그 자리에서 발견되었습니다.`,
            `시튼은 이렇게 적었습니다.`,
            `"나는 빙고를 길들이지 못했다. 그런데 빙고는 나를 잊지 않았다."`
        ]
    },
    {
        num: 6,
        title: "회색곰 왑",
        emoji: "🐻",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `미국 서부 산악 지대에 회색곰이 살았습니다. 왑은 새끼 넷 가운데 하나였습니다. 왑이 아주 어릴 때, 사냥꾼이 그 굴을 찾아냈습니다.`,
            `회색곰은 북아메리카에서 제일 큰 짐승 가운데 하나입니다. 다 자라면 몸무게가 사람 다섯 몫이 넘습니다.`,
            `그날 어미와 형제 셋이 죽었습니다. 왑만 덤불 속에 숨어 살아남았습니다. 왑은 그때 젖도 못 뗀 새끼였습니다.`,
            `그런 새끼가 혼자 살아남는 일은 거의 없습니다.`,
            `왑은 혼자 자랐습니다. 가르쳐 주는 것이 없어서 다 스스로 알아내야 했습니다. 무엇을 먹어도 되는지, 벌집을 어떻게 여는지, 겨울을 어떻게 나는지. 그리고 여러 번 크게 다쳤습니다.`,
            `어미가 있는 새끼는 두 해 동안 그것을 배웁니다.`,
            `호저의 가시가 앞발에 박혀 여러 달을 절었습니다. 그런데 왑은 살아남았습니다. 그리고 아주 크게 자랐습니다.`,
            `호저의 가시는 끝이 낚싯바늘처럼 되어 있어서 한번 박히면 빠지지 않습니다.`,
            `왼쪽 앞발에 흰 발자국 자국이 남아서 사람들이 알아보았습니다. 왑은 그 골짜기에서 제일 센 짐승이 되었습니다. 다른 곰도, 늑대도, 퓨마도 그를 피했습니다.`,
            `왑에게는 자기 땅이 있었습니다. 그 둘레의 나무에 발톱 자국을 내어 표시했습니다. 곰은 나무에 서서 될 수 있는 한 높이 발톱 자국을 냅니다.`,
            `그 땅은 골짜기 하나만 한 넓이였습니다.`,
            `다른 곰이 와서 그 높이를 보고 물러가기 때문입니다. 왑의 자국은 아주 높았습니다. 그렇게 여러 해가 지났습니다.`,
            `왑이 늙었습니다. 이빨이 닳고 발이 아팠습니다. 그리고 어느 해, 젊은 곰이 그 골짜기에 들어왔습니다.`,
            `왑은 그 곰과 싸워 쫓아냈습니다. 그런데 이기고 나서 여러 날을 앓았습니다. 그다음 해에 또 젊은 곰이 왔습니다. 그리고 그해에는 왑이 이기지 못했습니다.`,
            `늙은 짐승은 이겨도 손해입니다. 회복하는 데 걸리는 시간이 다르기 때문입니다.`,
            `왑은 자기 골짜기에서 밀려났습니다. 그리고 산속을 헤맸습니다. 그 산에는 '죽음의 골짜기'라고 불리는 곳이 있었습니다.`,
            `제 땅을 잃은 곰이 갈 데는 없습니다. 어느 골짜기에나 이미 임자가 있기 때문입니다.`,
            `땅에서 이상한 기체가 새어 나오는 곳이었습니다. 그 안에 들어간 짐승은 나오지 못했습니다. 왑은 그 골짜기 앞까지 갔습니다. 그리고 한참 서 있었습니다.`,
            `왑은 그 골짜기가 무엇인지 알고 있었습니다. 그 앞에서 평생 발길을 돌렸기 때문입니다.`,
            `그날은 돌리지 않았습니다. 시튼은 이 대목에 이렇게 적었습니다.`,
            `"내가 저 곰의 마음을 안다고 말할 수는 없다. 그런데 나는 그날 그 골짜기 입구에 남은 발자국을 보았고, 그 발자국은 한 번도 뒤로 돌아오지 않았다."`
        ]
    },
    {
        num: 7,
        title: "붉은 목의 뇌조",
        emoji: "🌲",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `캐나다 돈 강 골짜기에 뇌조가 살았습니다. 뇌조는 꿩과 비슷한 새입니다. 목에 붉은 깃이 도드라진 수컷이 있어서, 시튼은 그것을 붉은 목이라고 불렀습니다.`,
            `땅에서 지내는 새라 나무 위보다 낙엽 위에 있는 때가 많습니다.`,
            `봄이면 수컷 뇌조는 통나무 위에 올라가 날개를 칩니다. 아주 빨리 쳐서 북소리 같은 소리를 냅니다. 그 소리로 암컷을 부르는 것입니다.`,
            `그 소리는 아주 멀리까지 갑니다. 사람 귀에는 북을 두드리는 소리로 들립니다.`,
            `붉은 목은 그 골짜기에서 제일 좋은 통나무를 차지하고 있었습니다. 그해 봄 붉은 목은 짝을 만났습니다. 암컷은 낙엽 속에 둥지를 짓고 알을 열두 개 낳았습니다.`,
            `그 통나무를 두고 다른 수컷과 여러 번 싸웠습니다.`,
            `새끼가 나온 날 시튼이 그것을 보았습니다. 막 알에서 나온 새끼가 벌써 걸었습니다. 그리고 어미가 소리를 내자 그 자리에서 다 얼어붙었습니다.`,
            `알에서 나온 지 몇 시간 만이었습니다.`,
            `낙엽 위에 있으니 하나도 보이지 않았습니다. 어미가 다시 소리를 내자 다시 움직였습니다. 한번은 여우가 다가왔습니다.`,
            `그 소리는 사람 귀에 거의 들리지 않을 만큼 낮았습니다.`,
            `어미가 여우 앞으로 나가서 날개가 부러진 척했습니다. 땅에 끌면서 절뚝거렸습니다. 여우는 그것을 쫓아갔습니다.`,
            `잡힐 듯 말 듯한 거리를 지켰습니다. 너무 멀면 여우가 쫓지 않기 때문입니다.`,
            `충분히 멀어지자 어미가 날아올랐습니다. 그해 여름, 새끼들이 하나씩 줄었습니다. 매가 하나 물어 갔습니다.`,
            `족제비가 둘을 잡았습니다. 사람이 놓은 덫에 셋이 걸렸습니다.`,
            `사람이 놓은 덫은 뇌조를 잡으려던 것이 아니었습니다. 그래도 걸렸습니다.`,
            `가을이 되자 넷이 남았습니다. 겨울에 눈이 왔습니다. 뇌조는 눈 속에서 잡니다.`,
            `열둘 가운데 넷이면 그해에는 많이 남은 편이었습니다.`,
            `눈에 구멍을 파고 들어가면 그 안이 따뜻합니다. 그런데 그해 겨울에는 비가 왔다가 얼었습니다. 눈 위에 얼음이 두껍게 덮인 것입니다.`,
            `눈 속이 바깥보다 이십 도쯤 따뜻합니다.`,
            `밤에 눈 속에 들어간 새들이 아침에 나오지 못했습니다. 붉은 목은 발톱으로 얼음을 깨고 나왔습니다. 그런데 그해 봄까지 살아남은 것은 붉은 목 하나였습니다. 그리고 그해 겨울 끝에 붉은 목도 덫에 걸렸습니다.`,
            `사람이 놓은 올가미였습니다. 시튼은 이 이야기를 이렇게 맺었습니다.`,
            `"이 골짜기에는 그해에 뇌조가 백 마리 넘게 있었다. 봄이 되었을 때 남은 것은 없었다."`,
            `"우리는 이런 새를 두고 흔하다고 말한다. 흔하다는 것은 많이 죽어도 된다는 뜻이 아니다."`
        ]
    },
    {
        num: 8,
        title: "시튼이라는 사람",
        emoji: "✏️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `어니스트 톰프슨 시튼은 천팔백육십 년 영국에서 태어났습니다. 여섯 살 때 가족이 캐나다로 옮겨 갔습니다. 아버지는 아주 엄한 사람이었습니다.`,
            `열넷이나 되는 아이를 그 사람은 회초리로 다스렸습니다.`,
            `아이가 열넷인 집의 여덟째였습니다.`,
            `시튼이 스물한 살이 되던 날, 아버지가 청구서를 하나 내밀었다고 합니다. 태어나서 스물한 살까지 먹이고 입힌 값이었습니다. 시튼은 그 돈을 다 갚았습니다. 그리고 다시는 아버지를 만나지 않았습니다.`,
            `그 돈은 오백삼십칠 달러였습니다.`,
            `시튼은 어릴 때 숲에서 지냈습니다. 짐승을 보고 그림을 그리고, 본 것을 공책에 적었습니다.`,
            `아버지가 그림 그리는 것을 못마땅해했기 때문에 숨어서 그렸습니다.`,
            `그 공책이 나중에 이 책들이 되었습니다.`,
            `시튼은 공책을 평생 오십 권 넘게 썼습니다. 짐승의 발자국을 실제 크기로 그려 놓은 쪽이 많습니다.`,
            `젊을 때 시튼은 사냥꾼이었습니다. 늑대와 곰을 잡아 상금을 받는 일을 했습니다. 그것이 그 시절 서부에서 돈을 버는 방법 가운데 하나였습니다. 그러다 로보를 잡은 뒤로 달라졌습니다.`,
            `잡은 짐승의 값을 받아 살았으니, 그 무렵의 시튼은 이 책에 나오는 사냥꾼들과 다르지 않았습니다.`,
            `로보를 잡는 데 넉 달이 걸렸고, 그 넉 달 동안 시튼은 그 짐승을 아주 잘 알게 되었습니다. 그리고 알고 나니 잡을 수가 없어졌습니다.`,
            `시튼은 그 뒤로 야생 동물을 지키는 일에 평생을 썼습니다. 그리고 아이들에게 숲을 가르치는 단체를 만들었습니다. 그 단체가 나중에 보이스카우트가 되는 데 큰 몫을 했습니다.`,
            `그 단체의 이름은 우드크래프트 인디언스였습니다.`,
            `아이들을 숲으로 데려가 불 피우는 법과 발자국 읽는 법을 가르쳤습니다. 시튼은 그 단체에 등수를 두지 않았습니다. 자기가 그렇게 자랐기 때문입니다.`,
            `시튼의 이야기에는 한 가지 규칙이 있습니다. 주인공이 대개 마지막에 죽습니다. 사람들이 그것을 두고 시튼을 여러 번 나무랐습니다.`,
            `로보도, 은점박이도, 왑도, 붉은 목도 그렇습니다.`,
            `살아서 끝나는 것은 솜꼬리토끼 랙 하나뿐입니다.`,
            `아이들이 읽는 책인데 왜 그렇게 쓰느냐는 것이었습니다.`,
            `그때마다 시튼은 물러서지 않았습니다.`,
            `한번은 이름난 학자가 시튼의 글을 두고 지어낸 이야기라고 했습니다. 시튼은 자기 공책을 내놓았습니다. 날짜와 자리와 잰 것이 다 적혀 있었습니다.`,
            `시튼은 이렇게 대답했습니다.<br>"야생 동물의 삶은 언제나 끝이 좋지 않다. 그것이 사실이다."<br>"내가 그것을 바꿔 쓰면, 읽는 사람은 저 짐승들이 잘 지내고 있다고 생각할 것이다."<br>"그러면 아무도 저들을 지키려고 하지 않을 것이다."`,
            `시튼의 이야기가 그전의 동물 이야기와 다른 점이 하나 더 있습니다. 그전까지 동물 이야기는 대개 사람 이야기를 짐승에 빗댄 것이었습니다. 여우가 꾀를 부리고 토끼가 게으르고 하는 식입니다.`,
            `시튼은 그렇게 쓰지 않았습니다. 실제로 그 짐승이 무엇을 먹고 어떻게 새끼를 기르고 어떻게 위험을 피하는지를 적었습니다. 그것을 알아내려고 여러 해씩 한 짐승을 따라다녔습니다. 그래서 시튼의 책은 이야기이면서 관찰 기록입니다.`,
            `그래서 시튼의 책에 나오는 짐승에게는 다 이름이 있습니다. 이름을 붙이면 그 하나하나가 다른 짐승이 됩니다. 늑대 한 마리와 늑대 이천 마리는 읽는 사람에게 아주 다른 것입니다.`,
            `시튼은 여든여섯 살까지 살았습니다. 그리고 마지막까지 짐승을 그렸습니다.`,
            `천구백사십육 년에 미국 뉴멕시코에서 세상을 떠났습니다. 로보를 잡았던 그 지방입니다.`,
            `그가 쓴 책은 마흔 권이 넘습니다. 그 가운데 여러 권이 지금도 읽히고 있습니다.`,
            `이 책에 실린 여덟 편은 시튼이 남긴 것 가운데 아주 일부입니다.`
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
                ${artFrame('cover.png', '🐺')}
            </div>
            <div class="story-page-right">
                <h1>시튼 동물기</h1>
                <p class="cover-tag">어니스트 톰프슨 시튼 원작</p>
                <p>늑대를 잡아 상금을 받던 사냥꾼이 로보를 잡은 뒤로 사냥을 그만두고, 평생 야생 동물을 지키는 일을 했습니다.</p>
                <p>여덟 편을 골라 담았습니다. 대개 주인공이 마지막에 죽습니다. 시튼이 왜 그렇게 썼는지도 함께 실었습니다.</p>
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
    { q: "로보가 다른 늑대와 달랐던 점이 아닌 것은 무엇입니까?", choices: ["무리를 아주 작게 데리고 다녔다", "사람을 잘 따르고 가까이 왔다", "독을 넣은 미끼를 건드리지 않았다"], answer: 1 },
    { q: "시튼이 로보를 잡은 방법은 무엇입니까?", choices: ["여러 날 밤을 새우며 뒤를 밟았다", "블랑카를 먼저 잡아 그 냄새로 이끌었다", "덫을 오십 개 넘게 골짜기에 늘어놓았다"], answer: 1 },
    { q: "잡힌 뒤 로보는 어떻게 되었습니까?", choices: ["먹지 않고 들판만 보다가 세상을 떠났다", "사슬을 끊고 산으로 달아나 버렸다", "여러 해 우리 안에서 길러졌다"], answer: 0 },
    { q: "은점박이가 무리를 위해 한 일은 무엇입니까?", choices: ["먹이가 있는 곳을 혼자 찾아 두었다", "사람 사는 마을에 가까이 가지 않았다", "어린 까마귀들을 데리고 다니며 가르쳤다"], answer: 2 },
    { q: "은점박이가 죽은 뒤 무리에 생긴 변화는 무엇입니까?", choices: ["예전만큼 잘 해내지 못하게 되었다", "더 큰 무리로 불어나게 되었다", "곧 다른 우두머리가 나와 이어받았다"], answer: 0 },
    { q: "몰리가 랙에게 가르친 것이 아닌 것은 무엇입니까?", choices: ["가시덤불 사이로 빠져나가기", "쫓길 때 물을 건너 냄새 끊기", "위험할 때 큰 소리로 울기"], answer: 2 },
    { q: "몰리가 사냥개를 따돌린 방법은 무엇입니까?", choices: ["개가 지칠 때까지 들판을 빙빙 돌았다", "새끼를 굴에 넣고 입구를 막아 두었다", "일부러 자기가 쫓기며 깊은 물로 이끌었다"], answer: 2 },
    { q: "시튼이 랙 이야기 끝에 적은 말은 무엇입니까?", choices: ["짐승도 사람처럼 자식을 아끼는 법이다", "토끼가 오래 사는 것은 아는 것이 많아서다", "토끼는 빠른 발 하나로 살아남는 짐승이다"], answer: 1 },
    { q: "사슬에 매인 새끼 여우에게 어미가 밤마다 한 일은 무엇입니까?", choices: ["사람들이 잠든 사이 굴을 파 주었다", "먹이를 물어다 주고 사슬을 물어뜯었다", "멀리서 지켜보다가 날이 밝으면 갔다"], answer: 1 },
    { q: "빙고가 시튼을 구한 상황은 무엇입니까?", choices: ["두 손이 덫에 걸려 밤새 갇혔을 때", "눈보라 속에서 길을 잃었을 때", "늑대 무리에 둘러싸였을 때"], answer: 0 },
    { q: "빙고가 죽은 까닭은 무엇입니까?", choices: ["늑대 잡으려고 놓은 독 미끼를 먹어서", "늑대와 싸우다 크게 다쳤기 때문에", "너무 늙어 겨울을 못 넘겨서"], answer: 0 },
    { q: "왑이 혼자 자란 까닭은 무엇입니까?", choices: ["아주 어릴 때 사냥꾼에게 식구를 잃어서", "형제들과 싸우고 무리에서 나와서", "어미가 다른 골짜기로 떠나 버려서"], answer: 0 },
    { q: "곰이 나무에 발톱 자국을 높이 내는 까닭은 무엇입니까?", choices: ["다른 곰이 그 높이를 보고 물러가라고", "발톱을 갈아 날카롭게 하려고", "나무 열매를 따 먹으려고 오르다가"], answer: 0 },
    { q: "어미 뇌조가 여우 앞에서 한 행동은 무엇입니까?", choices: ["큰 소리를 내며 마주 달려들었다", "새끼를 몸 아래 감추고 버텼다", "날개가 부러진 척하며 끌고 갔다"], answer: 2 },
    { q: "시튼의 이야기가 대개 죽음으로 끝나는 까닭은 무엇입니까?", choices: ["슬픈 이야기가 사람들 마음에 오래 남아서", "그렇게 안 쓰면 아무도 저들을 지키려 안 해서", "실제로 그 짐승들이 다 그렇게 되었기 때문에"], answer: 1 },
    { q: "시튼의 동물 이야기가 그전 것들과 다른 점은 무엇입니까?", choices: ["사냥꾼의 눈으로만 짐승을 그렸다", "짐승이 사람처럼 말하게 하지 않았다", "여러 해 따라다니며 관찰한 것을 적었다"], answer: 2 }
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
            ${artFrame('end.png', '✏️')}
            <h2>시튼 동물기를 다 읽었습니다</h2>
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
