const BOOK_TITLE = "허클베리 핀의 모험";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "나는 헉이라고 한다",
        emoji: "🪵",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `내 이름을 모르는 사람은 「톰 소여의 모험」이라는 책을 안 읽은 사람일 것이다. 그 책은 대체로 사실이었다. 조금 부풀린 데가 있기는 했지만, 사람이 이야기를 하다 보면 다 그렇게 되는 법이다.`,
            `내 이름은 허클베리 핀이다. 다들 헉이라고 부른다.`,
            `그 책 끝에서 나와 톰은 동굴에서 돈을 찾아냈다. 우리는 각각 육천 달러씩 갖게 되었고, 대처 판사님이 그 돈을 은행에 넣어 주셔서 하루에 일 달러씩 이자가 나왔다.`,
            `그리고 더글러스 과부 아주머니가 나를 데려다 아들처럼 키우겠다고 하셨다.`,
            `그 집에 사는 것은 참 힘들었다.`,
            `아주머니는 좋은 분이었다. 그건 분명하다. 다만 그 집에서는 밥 먹기 전에 종이 울리고, 종이 울리면 밥상에 앉아야 하고, 앉으면 곧바로 먹으면 안 되고, 아주머니가 음식을 두고 뭐라고 한참 말씀하시는 것을 기다려야 했다.`,
            `옷은 뻣뻣했고 신발은 발을 죄었다. 담배도 못 피우게 했다.`,
            `아주머니의 언니인 왓슨 아주머니도 그 집에 있었다. 그분은 나에게 철자를 가르쳤고, 하루 종일 앉음새가 어떻고 자세가 어떻고를 말했다.`,
            `그래도 나는 견뎠다. 몇 달쯤 지나니 조금 익숙해지기도 했다.`,
            `그러던 어느 겨울날 아침, 눈 위에 발자국이 나 있었다.`,
            `왼쪽 구두 뒤축에 못을 박아 십자 모양을 낸 발자국이었다. 나는 그것을 보자마자 온몸이 굳었다.`,
            `나는 그길로 대처 판사님께 달려갔다.`,
            `"판사님, 제 돈을 다 가져가세요."<br>"무슨 소리냐."<br>"그냥 가지시라고요. 그리고 저한테 아무것도 물어보지 마세요."`,
            `판사님은 한참 나를 보시더니, 종이를 한 장 쓰셨다. 내가 그 돈을 판사님께 넘긴다는 종이였다. 나는 거기에 이름을 적었다.`,
            `그날 밤 내 방에 촛불을 켜고 들어가 보니, 의자에 사람이 하나 앉아 있었다.`,
            `우리 아버지였다.`,
            `한 해가 넘도록 보지 못한 사람이었다. 다들 강에서 죽었다고 했었다.`,
            `아버지는 쉰 살쯤 되어 보였다. 머리가 길고 기름졌고, 얼굴은 살아 있는 사람 것 같지 않게 하얬다. 그 하얀 얼굴을 보고 있으면 등에 소름이 돋았다.`,
            `"제법 차려입었구나." 아버지가 말했다. "학교에도 다닌다며."<br>"네."<br>"글도 읽는다며. 네 아비는 못 읽는데 네가 읽어? 그런 건 그만둬라."`,
            `"돈이 육천 달러 있다던데."<br>"없어요. 다 넘겼어요."<br>"거짓말 마라."`,
            `아버지는 다음 날 대처 판사님을 찾아갔고, 그 뒤로 몇 주 동안 그 돈을 뺏으려고 별짓을 다 했다.`
        ]
    },
    {
        num: 2,
        title: "통나무집",
        emoji: "🪓",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `봄이 되자 아버지는 나를 붙잡아 강 건너 숲속의 통나무집으로 데려갔다.`,
            `그 집은 사람이 살지 않던 오두막이었다. 문이 하나뿐이고 창은 없었다.`,
            `아버지는 나갈 때마다 문을 잠갔다. 낚시를 하거나 술을 마시러 갈 때는 며칠씩 걸렸다.`,
            `처음 한동안은 오히려 나았다. 학교에 안 가도 되고, 씻지 않아도 되고, 담배를 피워도 아무도 뭐라 하지 않았다.`,
            `그런데 아버지가 술을 마시고 돌아오는 날이 늘었다.`,
            `그런 날에는 나를 때렸다. 그리고 자기 아버지에게 들었다는 이야기, 세상이 자기에게 얼마나 잘못했는지에 대한 이야기를 밤새 했다.`,
            `어느 밤에는 나를 죽은 사람으로 착각하고 칼을 들고 방을 돌아다녔다. 나는 구석에서 밤을 새웠다.`,
            `그때부터 나는 방법을 궁리했다.`,
            `아버지가 없는 사이 나는 통나무 벽 아래쪽을 톱으로 조금씩 켰다. 톱은 지붕 서까래 밑에서 찾아낸 낡은 것이었다. 켜고 나면 톱밥을 치우고 통나무를 도로 맞춰 놓았다.`,
            `그렇게 며칠이 걸렸다.`,
            `그리고 강가에서 떠내려오는 카누를 하나 건졌다. 물에 반쯤 잠긴 것을 끌어내 덤불 속에 숨겨 두었다.`,
            `준비가 끝난 날, 아버지는 마을에 술을 마시러 갔다.`,
            `나는 벽의 통나무를 밀어내고 나왔다.`,
            `그리고 오두막 안을 아주 자세히 꾸며 놓았다.`,
            `도끼로 문을 부수어 놓고, 마당에서 잡은 멧돼지를 끌어와 바닥에 피를 흘려 놓고, 그 피를 문밖까지 끌리게 했다. 내 머리카락 몇 올을 도끼날에 붙여 두었다.`,
            `돌을 자루에 담아 강 쪽으로 끌고 간 자국을 냈다.`,
            `누가 보아도 강도가 들어 나를 죽이고 시신을 강에 버린 것처럼 보이게 했다.`,
            `그러고는 카누에 먹을 것과 담요를 싣고 강으로 나갔다.`,
            `달이 뜨자 강이 아주 넓게 보였다.`,
            `나는 강 아래쪽의 잭슨 섬으로 갔다.`,
            `그 섬은 사람이 살지 않는 곳이었다. 어렸을 때 톰과 조 하퍼와 함께 해적 놀이를 하러 갔던 그 섬이었다.`
        ]
    },
    {
        num: 3,
        title: "섬의 모닥불",
        emoji: "🔥",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `이튿날 낮에 배 한 척이 섬 둘레를 돌며 대포를 쏘았다.`,
            `물에 빠져 죽은 사람을 찾을 때 그렇게 한다고들 했다.`,
            `나는 덤불 속에 엎드려 그것을 보았다. 갑판에 마을 사람들이 다 나와 있었다. 아버지도 있었고, 대처 판사님도, 톰 소여도, 폴리 이모도 있었다.`,
            `내 장례를 치르러 나온 사람들이었다.`,
            `그날 나는 온종일 섬에서 지냈다. 사흘째 되던 날, 섬 안쪽에서 모닥불 자리를 발견했다.`,
            `재가 아직 따뜻했다.`,
            `나는 그날 밤을 뜬눈으로 새우고, 이튿날 새벽에 그 자리로 다시 가 보았다.`,
            `담요를 덮고 자는 사람이 하나 있었다.`,
            `한참 뒤에 그 사람이 일어나 앉으며 담요를 걷었다.`,
            `왓슨 아주머니 댁의 짐이었다.`,
            `나는 반가워서 뛰어나갔다.`,
            `"짐! 나야, 헉이야!"`,
            `짐은 나를 보고 그 자리에 무릎을 꿇었다.`,
            `"헉 도련님. 도련님은 물에 빠져 죽었다고 했는데요."<br>"안 죽었어. 그냥 그렇게 보이게 한 거야."`,
            `우리는 불을 다시 피우고 앉았다.`,
            `"짐, 너는 여기서 뭐 해?"`,
            `짐은 한참 대답하지 않았다.`,
            `"도련님, 제가 말하면 아무한테도 안 하실 거지요?"<br>"안 해."`,
            `"저는 도망쳐 나왔습니다."`,
            `그때 세상은 지금과 아주 달랐다. 그 시절 남쪽 지방에서는 사람이 사람을 재산처럼 사고팔았다. 짐도 왓슨 아주머니의 재산으로 되어 있었다.`,
            `"아주머니가 나를 판다는 이야기를 들었습니다." 짐이 말했다. "저 아래 뉴올리언스로요. 팔백 달러에 팔면 큰돈이라고 하시더군요."`,
            `"뉴올리언스로 가면 어떻게 되는데?"<br>"거기 가면 다시는 못 나옵니다. 그리고 제 아내와 아이들을 영영 못 봅니다."`,
            `짐에게는 아내가 있었고 아이가 둘 있었다. 다른 집에 있어서 자주 보지 못했다.`,
            `"그래서 그날 밤에 나왔습니다."`,
            `나는 그 말을 듣고 아무 말도 하지 못했다.`,
            `그때 내가 배운 대로 하자면, 도망친 사람을 보면 신고해야 했다. 그렇게 하지 않으면 나쁜 짓이라고 했다.`,
            `그런데 나는 이렇게 말했다.<br>"나도 아무한테도 말 안 할게."`
        ]
    },
    {
        num: 4,
        title: "강으로",
        emoji: "🛶",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `그해 봄에 강이 크게 불었다.`,
            `강물에 온갖 것이 떠내려왔다. 통나무, 널빤지, 부서진 배.`,
            `어느 밤에는 뗏목이 하나 떠내려왔다. 통나무를 엮은 좋은 뗏목이었다. 우리는 그것을 건져 섬에 묶어 두었다.`,
            `또 어느 밤에는 집이 통째로 떠내려왔다. 이층집인데 한쪽으로 기울어 떠 있었다.`,
            `우리는 카누를 저어 그 집에 올라갔다.`,
            `안은 어두웠다. 짐이 먼저 들어갔다.`,
            `방 한구석에 사람이 하나 누워 있었다.`,
            `짐이 다가가 살펴보더니, 곧 담요를 덮어 주었다.`,
            `"헉 도련님, 보지 마세요." 짐이 말했다. "죽은 사람입니다. 죽은 지 한참 됐어요."`,
            `"누군데?"<br>"보실 것 없습니다."`,
            `우리는 그 집에서 쓸 만한 것들을 챙겨 나왔다. 낡은 옷가지, 초, 칼, 낚싯줄, 그리고 담요 몇 장이었다.`,
            `그때 나는 짐이 왜 나에게 그 얼굴을 보지 못하게 했는지 몰랐다. 한참 뒤에야 알았다.`,
            `며칠 뒤, 나는 여자 옷을 얻어 입고 마을로 건너갔다. 소식을 알아보려는 것이었다.`,
            `어느 집에 새로 이사 온 아주머니가 있어서, 나는 그 집에 들어가 사라라는 이름을 댔다.`,
            `아주머니는 내가 여자아이가 아니라는 것을 금방 알아차렸다. 실을 던지는 자세와 무릎을 모으는 방식으로 알았다고 했다.`,
            `그래도 나쁜 사람은 아니었다. 그 아주머니에게서 나는 두 가지를 알아냈다.`,
            `하나는 사람들이 아직도 내가 죽은 줄 안다는 것이었다. 다만 어떤 사람들은 아버지가 그랬다고 하고, 어떤 사람들은 도망친 사람이 그랬다고 한다고 했다.`,
            `다른 하나는, 짐에게 삼백 달러의 현상금이 걸렸다는 것이었다.`,
            `"그리고 오늘 밤에 남자들이 잭슨 섬으로 건너간대." 아주머니가 말했다. "거기 연기가 났다더구나."`,
            `나는 인사를 하고 나와 카누로 뛰었다.`,
            `섬에 닿자마자 소리를 질렀다.`,
            `"짐! 빨리 일어나! 사람들이 온대!"`,
            `우리는 그 밤에 뗏목을 풀고 강으로 나갔다.`
        ]
    },
    {
        num: 5,
        title: "뗏목 위에서",
        emoji: "🌊",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그때부터 우리는 강을 내려갔다.`,
            `낮에는 뗏목을 나뭇가지로 덮고 강가 덤불에 숨어 잤다. 밤이 되면 풀고 물살에 맡겼다.`,
            `강은 넓었다. 어떤 데는 이 킬로미터가 넘었다.`,
            `밤에 뗏목 위에 누워 있으면 하늘에 별이 가득했다. 우리는 그 별이 만들어진 것인지 그냥 생긴 것인지를 두고 이야기했다.`,
            `짐은 만들어진 것이라고 했다. 그렇게 많은 것이 저절로 생기려면 시간이 너무 오래 걸린다는 것이었다. 나는 달이 별을 낳은 것 같다고 했고, 짐은 그럴듯하다고 했다.`,
            `우리는 옷을 벗고 물에 들어갔다가 뗏목에 누워 몸을 말렸다.`,
            `짐은 요리를 잘했다. 강에서 잡은 메기와 옥수수빵으로 아침을 지었다.`,
            `밤에 증기선이 지나가면 그 불빛이 물 위에서 흔들렸다. 우리는 그 배가 어디로 가는지 이야기했다.`,
            `내 평생에 그때만큼 편했던 적이 없었다.`,
            `우리 계획은 이랬다.`,
            `강을 내려가다 보면 카이로라는 마을이 나온다. 거기서 오하이오강이 미시시피강으로 흘러든다. 카이로에서 뗏목을 팔고 증기선을 타고 오하이오강을 거슬러 올라가면, 사람을 재산으로 두지 않는 자유주가 나온다.`,
            `짐은 그곳에 가면 일을 해서 돈을 모으겠다고 했다.`,
            `"그래서 뭘 하려고?"<br>"제 아내를 사겠습니다." 짐이 말했다. "아내가 있는 그 집 주인한테 돈을 주고요. 그러고 나서 둘이 벌어서 아이들을 데려올 겁니다."`,
            `"안 팔겠다고 하면?"<br>"그러면······ 사람을 사서 훔쳐 오겠습니다."`,
            `그 말을 듣고 나는 등이 오싹했다.`,
            `그때 내가 배운 대로 하자면 그건 남의 재산을 훔치는 것이었다. 그리고 나는 그것을 옆에서 도와주고 있는 것이었다.`,
            `나는 그 밤에 잠이 잘 오지 않았다.`,
            `짐은 뗏목 뒤쪽에서 자기 아이들 이야기를 혼자 중얼거리고 있었다.`,
            `한번은 짐이 이런 이야기를 했다.`,
            `딸 엘리자베스가 네 살 때 성홍열을 앓았다고 했다. 낫고 나서 어느 날 짐이 문을 닫으라고 했는데 아이가 가만히 서 있더란다.`,
            `짐은 화가 나서 아이를 때렸다.`,
            `그런데 잠시 뒤 바람이 불어 문이 쾅 닫혔는데, 아이가 돌아보지도 않았다.`,
            `그 병을 앓고 나서 아이는 귀가 들리지 않게 되었던 것이다.`,
            `"제가 그것도 모르고." 짐이 말했다. 그러고는 한참 아무 말도 하지 않았다.`
        ]
    },
    {
        num: 6,
        title: "안개",
        emoji: "🌫️",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `카이로가 가까워질수록 짐은 들떴다.`,
            `"이제 며칠만 있으면 자유입니다, 헉 도련님."`,
            `그런데 나는 그 말을 들을 때마다 마음이 나빠졌다.`,
            `나는 이렇게 생각했다. 왓슨 아주머니는 나에게 잘못한 것이 없다. 나에게 글을 가르쳐 주었고 밥을 먹여 주었다. 그런데 나는 그 집 사람을 데리고 도망치고 있다.`,
            `어느 밤 짐이 말했다.<br>"헉 도련님, 도련님은 저에게 하나뿐인 친구입니다. 늙은 짐한테 남은 사람은 도련님뿐이에요."`,
            `그 말을 듣고 나는 더 마음이 나빠졌다.`,
            `그날 밤 나는 카누를 타고 뭍으로 나갔다. 사람들에게 알릴 작정이었다.`,
            `"다녀오세요, 도련님." 짐이 뒤에서 말했다. "도련님은 늙은 짐이 만난 사람 중에 가장 좋은 사람입니다. 약속을 지킨 사람은 도련님뿐이에요."`,
            `나는 노를 저으면서 그 말을 계속 들었다.`,
            `얼마 못 가서 배 한 척을 만났다. 남자 둘이 총을 들고 있었다.`,
            `"얘야, 저기 저 뗏목에 누가 있냐?"<br>"······있어요."<br>"백인이냐?"`,
            `나는 잠깐 아무 말도 하지 못했다.`,
            `"저희 아버지예요." 내가 말했다. "그런데 병에 걸리셨어요. 좀 도와주시면 안 될까요? 아무도 안 도와줘요."`,
            `두 사람이 노를 저어 가까이 왔다.`,
            `"무슨 병인데?"<br>"그게······ 그러니까······."`,
            `내가 말을 흐리자 두 사람이 노를 뒤로 저었다.`,
            `"천연두구나!" 하나가 소리쳤다. "이 녀석, 왜 진작 말 안 했어!"`,
            `"미안해요. 다들 그 말만 하면 도망가서요."`,
            `"우리도 도망갈 거다." 그가 말했다. "얘야, 딱하지만 우리는 못 가겠다. 이십 마일쯤 내려가면 마을이 있으니 거기 가 봐라."`,
            `그러고는 물 위에 금화를 하나 띄워 보냈다. 다른 하나도 그렇게 했다.`,
            `"그 돈 받아라. 그리고 아버지 잘 봐드려라."`,
            `나는 뗏목으로 돌아갔다.`,
            `짐은 물속에 들어가 뗏목 옆에 매달려 있었다. 목만 내놓고 있었다.`,
            `"도련님, 잘하셨습니다." 짐이 말했다. "그렇게 잘하는 사람은 없을 겁니다."`,
            `나는 뗏목 위에 앉아서 오래 생각했다.`,
            `내가 옳은 일을 했으면 마음이 좋아야 하는데 그렇지 않았다. 그리고 나쁜 일을 했으면 마음이 나빠야 하는데 그렇지도 않았다.`,
            `그날 밤 짙은 안개가 왔다.`,
            `우리는 카이로를 지나쳤다. 안개 속에서 강줄기가 갈라지는 것을 보지 못한 것이다.`,
            `그리고 알아차렸을 때는 이미 한참 아래로 내려온 뒤였다.`
        ]
    },
    {
        num: 7,
        title: "두 집안",
        emoji: "🏛️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그리고 그날 밤 증기선 한 척이 뗏목을 들이받았다.`,
            `우리는 물로 뛰어들었다. 나는 한참을 헤엄쳐 왼쪽 강기슭으로 올라갔다.`,
            `짐을 부르며 돌아다녔지만 대답이 없었다.`,
            `숲을 헤매다 큰 집을 하나 만났다. 그레인저퍼드라는 집안의 집이었다.`,
            `그 집 사람들은 나를 받아 주었다. 나는 조지 잭슨이라는 이름을 대고 그 집에 며칠 묵게 되었다.`,
            `그 집은 훌륭했다. 방마다 그림이 걸려 있고 피아노가 있었다.`,
            `그 집에는 벅이라는 아이가 있었다. 나와 나이가 같았다.`,
            `벅은 나에게 사냥하는 법을 가르쳐 주었고, 우리는 곧 친해졌다.`,
            `어느 날 벅이 말했다.<br>"너, 셰퍼드슨네를 조심해."<br>"그게 누군데?"<br>"저 아래 사는 사람들이야. 우리랑 원수야."`,
            `"왜 원수인데?"<br>"몰라."<br>"모른다고?"`,
            `"응. 아버지도 모르시고 할아버지도 모르셨대. 아주 오래전에 뭔가 있었는데 그게 뭔지는 아무도 몰라." 벅이 말했다. "다만 우리 집안에서 셋이 죽었고 저쪽에서 넷이 죽었어."`,
            `"삼십 년쯤 됐대."`,
            `일요일에 두 집안 사람들이 다 같은 교회에 갔다. 총을 무릎 사이에 세워 두고 앉아서, 사람을 사랑하라는 말씀을 들었다.`,
            `그리고 집에 돌아와 다들 그 설교가 참 좋았다고 했다.`,
            `며칠 뒤 그 집 딸 소피아가 셰퍼드슨네 젊은이와 달아났다.`,
            `그날 강가에서 싸움이 났다.`,
            `나는 나무 위에서 그것을 보았다.`,
            `그 일을 여기 자세히 적지는 않겠다. 나는 그날 본 것을 잊으려고 오래 애썼는데 아직도 잊지 못했다. 벅도 그날 죽었다.`,
            `나는 나무에서 내려와 강 쪽으로 뛰었다.`,
            `그리고 갈대밭에서 누가 나를 불렀다.`,
            `짐이었다.`,
            `짐은 그 며칠 동안 뗏목을 건져 고치고 나를 기다리고 있었다.`,
            `"헉 도련님!"`,
            `그때만큼 반가운 적이 없었다.`,
            `우리는 그 밤에 다시 강으로 나갔다.`,
            `뗏목 위에 눕자 나는 그제야 숨이 쉬어졌다.`,
            `강은 좋았다. 다른 데는 다 좁고 답답한데 강 위에서는 그렇지 않았다.`
        ]
    },
    {
        num: 8,
        title: "왕과 공작",
        emoji: "🎭",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `며칠 뒤 아침, 물가에서 남자 둘이 뛰어왔다.`,
            `쫓기고 있다고 했다. 우리는 그들을 뗏목에 태웠다.`,
            `한 사람은 일흔쯤 되었고 머리가 벗어졌다. 다른 사람은 서른쯤 되었다.`,
            `그날 오후, 젊은 쪽이 한숨을 쉬며 말했다.<br>"사실 나는 공작이오. 브리지워터 공작 집안의 정당한 후계자인데 집안이 나를 밀어냈소."`,
            `우리는 그 말을 믿는 척했다. 그리고 그를 공작님이라고 부르며 시중을 들었다.`,
            `그러자 늙은 쪽이 더 우울해졌다.`,
            `"나도 털어놓을 것이 있소." 그가 말했다. "나는 프랑스 왕의 후손이오."`,
            `그때부터 우리 뗏목에는 왕과 공작이 타고 있게 되었다.`,
            `나는 곧 알아차렸다. 두 사람은 왕도 공작도 아니고 그냥 사기꾼이었다.`,
            `하지만 나는 아무 말도 하지 않았다. 우리 아버지에게서 배운 것이 하나 있다면, 그런 사람들과는 다투지 않는 것이 편하다는 것이었다.`,
            `두 사람은 마을마다 내려가 사기를 쳤다.`,
            `한 마을에서는 왕이 인도양에서 해적질을 하다 회개했다며 사람들 앞에서 울었다. 사람들은 감동해서 돈을 걷어 주었다. 왕은 여든일곱 달러를 챙겼다.`,
            `다른 마을에서는 셰익스피어 연극을 한다며 표를 팔았다. 두 사람은 대사를 아무렇게나 섞어서 외웠다.`,
            `사흘째 되던 날에는 아예 어른만 들어오는 공연이라며 표를 팔고, 무대에 잠깐 나왔다가 돈을 챙겨 달아났다.`,
            `속은 사람들은 창피해서 아무 말도 하지 못했다. 오히려 이튿날 다른 사람들에게 아주 훌륭한 공연이라고 소문을 냈다. 자기들만 당할 수는 없었기 때문이다.`,
            `나는 그것을 보면서 사람이라는 게 참 그렇구나 하고 생각했다.`,
            `짐은 그 두 사람을 아주 싫어했다.`,
            `"저 사람들은 왕이 아닙니다." 짐이 나에게 말했다.<br>"알아."<br>"그럼 왜 아무 말 안 하십니까?"<br>"말하면 우리가 곤란해져. 저 사람들이 화나면 무슨 짓을 할지 몰라."`,
            `짐은 고개를 끄덕였다. 그리고 그 뒤로는 아무 말도 하지 않았다.`
        ]
    },
    {
        num: 9,
        title: "윌크스 집안",
        emoji: "💼",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `어느 마을에서 왕이 젊은이 하나를 붙잡고 이야기를 들었다.`,
            `그 마을의 피터 윌크스라는 부자가 막 세상을 떠났는데, 영국에 있는 두 동생이 오기를 기다리다 못 보고 갔다는 것이었다. 재산이 육천 달러가 넘고, 딸이 셋 있다고 했다.`,
            `왕은 그 이야기를 다 듣고 나서 공작을 불렀다.`,
            `그날 오후, 두 사람은 그 집에 나타났다.`,
            `"우리가 피터의 동생들입니다."`,
            `세 딸이 울면서 두 사람을 끌어안았다. 큰딸 메리 제인은 열아홉 살이었는데, 머리가 붉고 얼굴이 환한 사람이었다.`,
            `왕은 관 앞에서 통곡을 했다. 그리고 마을 사람들 앞에서 조카딸들을 끝까지 지키겠다고 말했다.`,
            `나는 그 광경을 보면서 사람이 저렇게까지 할 수 있다는 것에 놀랐다.`,
            `그날 밤 두 사람은 다락방에서 유산을 세었다. 금화 육천 달러였다.`,
            `그리고 다음 날, 왕은 집과 땅까지 다 팔아 치우겠다고 했다.`,
            `그런데 그 집 살림을 하던 사람들도 함께 팔았다.`,
            `어머니 하나와 아들 둘이었는데, 어머니는 저 아래 뉴올리언스로, 아들 둘은 다른 데로 팔렸다.`,
            `세 사람이 서로 붙잡고 우는 것을 나는 그날 마당에서 보았다.`,
            `메리 제인이 온종일 방에서 울었다.`,
            `나는 그날 밤 결심했다.`,
            `이튿날 아침 메리 제인의 방으로 갔다.`,
            `"메리 제인 아가씨, 놀라지 마시고 들으세요."`,
            `나는 다 이야기했다. 저 사람들이 삼촌이 아니라는 것, 사기꾼이라는 것, 팔려 간 사람들도 곧 돌아오게 될 것이라는 것을.`,
            `메리 제인은 얼굴이 하얘졌다가 새빨개졌다.`,
            `"저 사람들을 그냥······."<br>"안 됩니다. 그러면 저도 곤란해집니다. 다만 오늘 하루만 시골 친구 댁에 가 계세요. 그리고 오늘 밤 안으로 다 밝혀지게 하겠습니다."`,
            `"내가 왜 가 있어야 하죠?"<br>"아가씨는 얼굴에 다 나타나거든요."`,
            `메리 제인은 잠깐 있다가 웃었다.`,
            `"나는 자네를 잊지 않겠네." 그녀가 말했다. "자네를 위해 기도하겠어."`,
            `그런 말을 나한테 해 준 사람은 처음이었다. 나는 그 말을 그 뒤로도 여러 번 생각했다.`,
            `그날 오후, 진짜 동생 둘이 도착했다.`,
            `마을이 뒤집혔고, 사람들이 두 패로 갈렸고, 결국 무덤을 파서 관을 열게 되었다.`,
            `그 소동 틈에 왕과 공작이 달아났다. 나도 달아났다.`,
            `그런데 뗏목에 닿아 보니 두 사람이 벌써 거기 있었다.`
        ]
    },
    {
        num: 10,
        title: "사십 달러",
        emoji: "🗞️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그 뒤로 두 사람은 돈이 떨어져 갔다.`,
            `밤마다 뗏목 구석에서 무언가를 소곤거렸다.`,
            `어느 날 아침, 나는 뗏목에 짐이 없는 것을 알았다.`,
            `한참 찾다가 강가에서 만난 아이에게 물었더니, 저 아래 펠프스 씨네 농장에 도망친 사람이 하나 잡혀 있다고 했다.`,
            `"누가 잡았대?"<br>"어떤 늙은이가 신고했대. 사십 달러 받고."`,
            `사십 달러였다.`,
            `짐이 그 사람들에게 사십 달러였다.`,
            `나는 뗏목으로 돌아와 한참 앉아 있었다.`,
            `그리고 그동안 생각해 오던 것을 마저 생각했다.`,
            `나는 이렇게 배웠다. 남의 재산을 도망치게 돕는 것은 나쁜 짓이다. 그런 짓을 하면 지옥에 간다.`,
            `나는 왓슨 아주머니께 편지를 쓰기로 했다.`,
            `종이를 꺼내 이렇게 썼다.`,
            `"왓슨 아주머니께. 아주머니의 짐이 여기 펠프스 씨 농장에 있습니다. 사십 달러를 주면 돌려받으실 수 있습니다. 헉 핀 올림."`,
            `쓰고 나니 마음이 아주 가벼워졌다.`,
            `나는 그 종이를 놓고 앉아서, 이제 나는 나쁜 아이가 아니라고 생각했다.`,
            `그런데 그러고 있으려니 자꾸 다른 것이 떠올랐다.`,
            `강을 내려오던 밤들이 떠올랐다. 짐이 내 몫까지 노를 젓던 것, 자기 차례가 끝나도 나를 깨우지 않고 그냥 더 지키던 것, 안개 속에서 나를 찾아 목이 쉬도록 부르던 것.`,
            `내가 물에 빠졌던 날 짐이 나를 끌어올리며 도련님 도련님 하고 부르던 것.`,
            `그리고 이렇게 말하던 것.<br>"헉 도련님은 늙은 짐이 만난 사람 중에 가장 좋은 사람입니다. 하나뿐인 친구입니다."`,
            `나는 그 편지를 집어 들었다.`,
            `손이 떨렸다. 이걸 찢으면 나는 지옥에 간다고 배웠기 때문이다.`,
            `나는 잠깐 숨을 참았다.`,
            `그리고 이렇게 말했다.`,
            `"그럼 좋다. 나는 지옥에 가겠다."`,
            `그러고는 편지를 찢었다.`,
            `찢고 나니 이상하게 마음이 편해졌다.`,
            `나는 다시는 그런 생각을 하지 않기로 했다. 그리고 짐을 다시 빼내 오기로 했다.`
        ]
    },
    {
        num: 11,
        title: "펠프스 농장",
        emoji: "🌾",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `나는 펠프스 씨네 농장으로 걸어갔다.`,
            `작은 목화 농장이었다. 마당에 개가 여러 마리 있었다.`,
            `문을 두드리기도 전에 아주머니 한 분이 뛰어나와 나를 끌어안았다.`,
            `나는 무슨 일인지 몰라서 그냥 안겨 있었다. 그 집 개들이 내 다리에 코를 대고 킁킁거렸다.`,
            `"드디어 왔구나! 세상에, 어쩌면 이렇게 늦었니!"`,
            `나는 무슨 영문인지 몰랐다.`,
            `"배가 얕은 데 걸려서요." 나는 그렇게 둘러댔다.`,
            `아주머니는 나를 데리고 들어가 이것저것 물었다. 나는 아무거나 대답했다.`,
            `그러다 아주머니가 아저씨를 부르며 이렇게 말했다.<br>"여보, 톰이 왔어요! 언니네 톰이요!"`,
            `그 집은 톰 소여의 이모 댁이었다.`,
            `그리고 그 집에서는 톰이 오기를 기다리고 있었다.`,
            `그러니까 나는 그날부터 톰 소여가 되었다.`,
            `그날 오후, 나는 길에서 진짜 톰 소여를 만났다.`,
            `톰은 나를 보고 유령을 본 사람처럼 뒷걸음질을 쳤다.`,
            `"헉! 너 죽었잖아!"`,
            `나는 그동안 있었던 일을 다 이야기했다. 그리고 짐을 빼내려 한다고 했다.`,
            `말을 하면서 나는 이제 톰과는 끝이겠구나 하고 생각했다. 톰은 반듯한 집 아이였고, 그런 아이가 이런 일에 끼어들 리가 없었다.`,
            `톰이 이렇게 말할 줄 알았다. 그건 나쁜 짓이라고, 나는 그런 데 끼지 않겠다고.`,
            `그런데 톰은 이렇게 말했다.<br>"내가 도와줄게."`,
            `나는 그 말을 듣고 톰을 다시 보았다. 톰은 반듯한 집 아이였다. 그런데 그런 말을 했다.`,
            `우리는 이렇게 하기로 했다. 나는 톰 소여가 되고, 톰은 자기 동생 시드라고 하기로.`,
            `짐은 마당 끝의 오두막에 갇혀 있었다.`,
            `창이 하나 있는데 널빤지로 막아 두었고, 문에는 자물쇠가 두 개 걸려 있었다. 밥은 하루에 두 번 넣어 준다고 했다.`,
            `나는 그날 밤 그 오두막 창으로 짐을 보았다.`,
            `짐이 나를 알아보고 소리를 지르려 했다. 나는 얼른 손을 저었다.`
        ]
    },
    {
        num: 12,
        title: "톰의 방법",
        emoji: "🪜",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `나는 아주 간단한 방법을 생각해 두었다.`,
            `자물쇠를 뜯고, 짐을 데리고 나와, 뗏목을 타고 강을 내려가면 되었다. 두 시간이면 끝날 일이었다.`,
            `그런데 톰은 그 말을 듣고 코웃음을 쳤다.`,
            `"그건 너무 시시해."`,
            `"시시하면 어때. 되기만 하면 되지."`,
            `"안 되지." 톰이 말했다. "책에 나오는 대로 해야 해. 죄수를 빼낼 때는 굴을 파야 하고, 밧줄 사다리를 넣어 줘야 하고, 벽에 글을 새겨야 해."`,
            `그때부터 나는 삼 주 동안 고생을 했다.`,
            `톰은 굴을 파야 한다고 해서 우리는 칼로 흙을 팠다. 사흘을 파고 나서 톰이 삽을 가져왔다.`,
            `밧줄 사다리를 넣어 줘야 한다고 해서 이모의 침대보를 잘라 만들었다.`,
            `죄수는 벽에 사연을 새겨야 한다고 해서, 짐이 못으로 벽을 긁게 했다.`,
            `죄수의 방에는 거미와 쥐와 뱀이 있어야 한다고 해서, 우리는 그것들을 잡아다 넣었다. 그 바람에 이모가 몇 번이나 기절할 뻔했다.`,
            `톰은 죄수가 꽃을 길러야 한다고도 했다. 그래서 짐은 오두막 안에서 물을 주며 풀을 하나 길러야 했다. 물이 모자라면 눈물로 주라고 했는데, 짐은 그건 못 하겠다고 했다.`,
            `그동안 짐은 그 오두막에 갇혀 있었다.`,
            `나는 그것이 자꾸 마음에 걸렸다.`,
            `"톰, 그냥 데리고 나가자."<br>"제대로 안 하면 재미가 없잖아."`,
            `그때 나는 톰에게 화를 내지 못했다. 지금 생각하면 화를 냈어야 했다.`,
            `짐은 그 안에서 삼 주를 더 갇혀 있었다. 나는 그 삼 주를 생각하면 지금도 마음이 좋지 않다.`,
            `짐은 한 번도 불평하지 않았다. 우리가 넣어 준 쥐와 뱀을 그냥 받았고, 못으로 벽을 긁으라고 하면 긁었다.`,
            `그저 이따금 나를 보며 이렇게 말했다.<br>"도련님, 이게 다 무슨 소용입니까?"<br>"나도 몰라."`,
            `마침내 톰이 정한 밤이 왔다.`,
            `우리는 굴로 짐을 꺼냈다.`,
            `그런데 톰이 미리 편지를 보내 두었다. 오늘 밤 도둑이 든다는 익명의 편지였다. 그래야 근사하다는 것이었다.`,
            `그래서 마당에는 총을 든 사람 열다섯이 기다리고 있었다.`,
            `우리는 뛰었다. 개들이 짖고 총소리가 났다.`,
            `짐이 앞장서서 뛰었다. 그런데 몇 번이나 걸음을 늦추고 뒤를 돌아보았다. 우리가 따라오는지 보려고 그런 것이었다.`,
            `울타리를 넘을 때 톰이 다리에 총알을 맞았다.`
        ]
    },
    {
        num: 13,
        title: "짐이 남은 까닭",
        emoji: "🩺",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `우리는 강가의 카누까지 갔다.`,
            `톰의 다리에서 피가 많이 났다. 톰은 아무렇지 않은 척했지만 얼굴이 하얬다.`,
            `"의사를 불러야 해." 내가 말했다.<br>"안 돼. 그러면 다 들켜."<br>"들켜도 상관없어."`,
            `그때 짐이 말했다.`,
            `"도련님, 의사를 부르십시오. 저는 여기 있겠습니다."`,
            `나는 짐을 보았다.`,
            `"짐, 지금 가면 자유야."<br>"압니다." 짐이 말했다. "그런데 저 도련님을 이렇게 두고는 못 갑니다."`,
            `나는 카누를 타고 마을로 가서 의사를 데려왔다.`,
            `의사는 밤중에 아이 하나가 문을 두드리는 것을 이상하게 여겼다. 나는 형이 꿈결에 자기 총을 밟아서 다쳤다고 둘러댔다.`,
            `의사가 카누를 타고 섬으로 건너가 톰을 보았다. 그리고 혼자서는 옮길 수 없다고 했다.`,
            `그때 짐이 덤불에서 걸어 나왔다.`,
            `"제가 돕겠습니다."`,
            `의사는 놀라서 아무 말도 하지 못했다. 도망친 사람이 제 발로 나오는 것을 본 적이 없었기 때문이다.`,
            `짐은 그날 밤새 톰을 돌보았다. 의사를 도와 상처를 씻고 붙잡아 주고 물을 떠 왔다.`,
            `날이 밝자 사람들이 왔다.`,
            `사람들은 짐을 붙잡아 밧줄로 묶고 오두막으로 끌고 갔다. 몇몇은 짐을 때리려 했다.`,
            `그때 의사가 나섰다.`,
            `"이 사람에게 손대지 마시오." 의사가 말했다. "이 사람은 어젯밤에 달아날 수 있었소. 그런데 나오지 않으면 저 아이가 죽는다는 것을 알고 제 발로 나왔소. 그리고 밤새 나를 도왔소. 내가 본 어떤 간호인보다 잘했소."`,
            `"나는 이 사람만큼 훌륭한 사람을 본 적이 없소."`,
            `사람들이 조용해졌다.`,
            `그중 몇은 모자를 벗었다. 조금 전까지 밧줄을 들고 있던 사람들이었다.`,
            `그날부터 사람들이 짐에게 욕을 하지 않았다. 다만 묶어 두기는 했다.`,
            `누구는 담배를 넣어 주었고 누구는 먹을 것을 가져다주었다. 그러면서도 밧줄은 아무도 풀어 주지 않았다. 나는 그게 어떻게 둘 다 되는 일인지 오래 생각했다.`,
        ]
    },
    {
        num: 14,
        title: "짐은 이미 자유였다",
        emoji: "📜",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `톰은 사흘 만에 정신을 차렸다.`,
            `눈을 뜨자마자 톰이 물었다.<br>"짐은 어떻게 됐어?"<br>"묶여 있어."`,
            `톰이 침대에서 벌떡 일어나 앉았다.`,
            `"당장 풀어 줘! 짐은 나만큼 자유로운 사람이야!"`,
            `방에 있던 사람들이 다 톰을 보았다.`,
            `그리고 톰이 말했다.`,
            `왓슨 아주머니는 두 달 전에 세상을 떠났다고 했다. 그리고 돌아가시기 전에 유언장에 짐을 자유롭게 한다고 써 두셨다는 것이었다.`,
            `짐을 팔려고 했던 것을 두고 두고두고 마음이 편치 않으셨던 모양이라고 했다.`,
            `나는 톰을 쳐다보았다.`,
            `"그럼 너는 그걸 알고 있었어?"<br>"응."<br>"처음부터?"<br>"응."`,
            `"그런데 왜 그 삼 주 동안······."`,
            `톰은 대답하지 못했다.`,
            `한참 뒤에 톰이 이렇게 말했다.<br>"짐을 제대로 구해 내고 싶었어. 그냥 문을 열어 주는 건 구해 내는 게 아니잖아."<br>나는 그 말에 아무 대답도 하지 않았다.`,
            `그것이 톰 소여였다. 톰은 나쁜 아이가 아니다. 다만 톰의 머릿속에는 책에서 읽은 것들이 가득해서, 눈앞에 있는 사람이 잘 안 보였다.`,
            `짐은 아무 말도 하지 않았다.`,
            `나중에 내가 미안하다고 하자 짐은 이렇게 말했다.<br>"도련님은 저를 찾으러 오셨잖습니까."`,
            `그 말을 듣고 나는 더 미안해졌다. 나는 짐을 찾으러 간 것이 대단한 일이라고 생각한 적이 없었다. 다른 수가 없었을 뿐이다.`,
            `그리고 짐이 나에게 해 준 이야기가 하나 더 있었다.`,
            `강을 내려오던 그 봄에 떠내려온 집이 하나 있었다. 그 안에 죽은 사람이 있었고, 짐이 나에게 보지 말라고 했다.`,
            `"그 사람이 도련님 아버지였습니다."`,
            `나는 아무 말도 하지 못했다.`,
            `"그때 말씀드리면 도련님이 못 견디실 것 같았습니다." 짐이 말했다. "그래서 여태 안 했습니다."`,
            `그러니까 나는 그해 봄부터 이미 아버지를 무서워할 필요가 없었던 것이다. 그것을 알고 있던 사람은 짐 하나였고, 짐은 그 말을 몇 달 동안 혼자 지고 있었다.`,
            `나는 그 말을 듣고 강 쪽을 보았다. 그리고 그 봄에 짐이 나에게 보지 말라고 하던 목소리를 떠올렸다.`,
        ]
    },
    {
        num: 15,
        title: "서쪽으로",
        emoji: "🌅",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `톰은 상처가 나은 뒤에도 며칠 더 누워 있었다.`,
            `그리고 자기 총알을 실에 꿰어 목에 걸고 다녔다. 사람들에게 보여 주려고 했다.`,
            `짐은 사십 달러를 받았다. 톰이 준 것이었다. 죄수 노릇을 아주 잘해 주었다면서.`,
            `짐은 그 돈을 세어 보고 나에게 말했다.`,
            `"도련님, 저는 이 돈으로 뭘 할 건지 아십니까?"<br>"뭘 할 건데?"<br>"제 아내와 아이들을 찾으러 갈 겁니다."`,
            `"찾으면 어떻게 할 거야?"<br>"일을 하겠습니다." 짐이 말했다. "이제는 제가 번 것이 제 것이니까요."<br>짐이 그 말을 할 때 목소리가 조금 떨렸다.`,
            `그 뒤로 짐이 어떻게 되었는지는 나도 다 알지 못한다. 다만 짐은 그날 강을 거슬러 올라갔고, 나는 짐이 그 사람들을 찾았기를 바란다.`,
            `그리고 나는 또 한 가지를 알게 되었다.`,
            `내 돈 육천 달러는 그대로 있었다. 대처 판사님이 잘 넣어 두셨던 것이다.`,
            `그리고 샐리 이모가 나를 아들로 삼겠다고 하셨다.`,
            `학교에 보내 주고, 옷을 입혀 주고, 예의범절을 가르쳐 주겠다고 하셨다.`,
            `나는 그 말을 듣고 등이 서늘해졌다.`,
            `나는 그것을 이미 한 번 해 봤다. 더글러스 과부 아주머니 댁에서였다.`,
            `그 아주머니는 나쁜 분이 아니었다. 다만 나를 좋게 만들려고 하셨고, 나는 그게 견디기 힘들었다.`,
            `그 집에서 나는 밥 먹기 전에 종을 기다리고, 옷깃을 세우고, 신발을 신고 잤다.`,
            `그래서 나는 서쪽으로 가기로 했다.`,
            `서쪽에는 아직 아무도 살지 않는 땅이 있다고 한다.`,
            `톰도 같이 가겠다고 했다. 그런데 톰은 늘 그렇게 말하고 안 간다. 나는 혼자 갈 작정이다.`,
            `이 이야기는 여기서 끝이다.`,
            `쓰기가 얼마나 힘든지 미리 알았으면 시작도 안 했을 것이다. 그리고 다시는 안 쓸 작정이다.`,
            `그런데 한 가지는 적어 두고 싶다.`,
            `나는 그해 강 위에서 배운 것이 학교에서 배운 것보다 많았다.`,
            `그리고 그때 내가 옳다고 배운 것과 내가 옳다고 느낀 것이 서로 달랐을 때, 나는 느낀 쪽을 골랐다.`,
            `그것이 내가 한 일 중에 제일 잘한 일이었다.`
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
                ${artFrame('cover.png', '🛶')}
            </div>
            <div class="story-page-right">
                <h1>허클베리 핀의 모험</h1>
                <p class="cover-tag">마크 트웨인 원작</p>
                <p>「톰 소여의 모험」에 나오던 헉이 자기 이야기를 직접 들려줍니다. 아버지에게 갇혔다가 죽은 척하고 달아난 헉은, 섬에서 도망친 짐을 만나 함께 미시시피강을 내려갑니다.</p>
                <p>사람이 사람을 재산처럼 사고팔던 시절의 이야기입니다. 그 시절 옳다고 가르치던 것과 헉이 스스로 옳다고 느낀 것이 어긋났을 때, 헉이 무엇을 골랐는지에 대한 이야기이기도 합니다.</p>
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
    { q: "헉이 대처 판사에게 돈을 넘긴 까닭은 무엇입니까?", choices: ["아버지가 돌아와서", "학교에 가려고", "과부댁을 떠나려고"], answer: 0 },
    { q: "헉이 통나무집에서 달아날 때 꾸민 일은 무엇입니까?", choices: ["불을 질렀다", "자기가 죽은 것처럼 꾸몄다", "아버지를 묶어 두었다"], answer: 1 },
    { q: "짐이 도망친 까닭은 무엇입니까?", choices: ["매를 맞아서", "먼 곳으로 팔려 갈 것을 알아서", "길을 잃어서"], answer: 1 },
    { q: "두 사람이 카이로로 가려 한 까닭은 무엇입니까?", choices: ["일자리가 많아서", "뗏목을 팔려고", "거기서 자유주로 갈 수 있어서"], answer: 2 },
    { q: "짐이 자유를 얻으면 하려던 일은 무엇입니까?", choices: ["아내와 아이들을 데려오는 일", "농장을 사는 일", "배를 타는 일"], answer: 0 },
    { q: "노예 사냥꾼들을 만났을 때 헉이 한 일은 무엇입니까?", choices: ["짐을 신고했다", "아버지가 병에 걸렸다고 둘러댔다", "달아났다"], answer: 1 },
    { q: "그레인저퍼드 집안과 셰퍼드슨 집안은 왜 싸웠습니까?", choices: ["땅 때문에", "돈 때문에", "아무도 까닭을 몰랐다"], answer: 2 },
    { q: "뗏목에 올라탄 두 사람의 정체는 무엇입니까?", choices: ["떠돌이 사기꾼", "진짜 왕과 공작", "노예 사냥꾼"], answer: 0 },
    { q: "윌크스 집안에서 헉이 한 일은 무엇입니까?", choices: ["돈을 훔쳤다", "메리 제인에게 사실을 알렸다", "모른 척했다"], answer: 1 },
    { q: "왕은 짐을 얼마에 팔아넘겼습니까?", choices: ["사십 달러", "팔백 달러", "육천 달러"], answer: 0 },
    { q: "헉이 왓슨 아주머니께 쓴 편지를 어떻게 했습니까?", choices: ["부쳤다", "찢었다", "숨겼다"], answer: 1 },
    { q: "편지를 찢으며 헉이 한 말은 무엇입니까?", choices: ["그럼 좋다, 나는 지옥에 가겠다", "다시는 안 그러겠다", "짐은 내 것이다"], answer: 0 },
    { q: "톰이 짐을 빼내는 데 삼 주나 걸린 까닭은 무엇입니까?", choices: ["감시가 심해서", "책에 나오는 대로 하려고", "길을 몰라서"], answer: 1 },
    { q: "톰이 총에 맞았을 때 짐이 한 일은 무엇입니까?", choices: ["혼자 달아났다", "숨어서 기다렸다", "제 발로 나와 의사를 도왔다"], answer: 2 },
    { q: "짐은 사실 어떤 처지였습니까?", choices: ["이미 자유의 몸이었다", "다시 팔릴 참이었다", "빚이 있었다"], answer: 0 },
    { q: "짐이 헉에게 끝까지 숨겼던 것은 무엇입니까?", choices: ["돈을 숨긴 곳", "떠내려온 집의 죽은 사람이 헉의 아버지였다는 것", "자기 나이"], answer: 1 }
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
            ${artFrame('end.png', '🌅')}
            <h2>허클베리 핀의 모험을 다 읽었습니다</h2>
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
