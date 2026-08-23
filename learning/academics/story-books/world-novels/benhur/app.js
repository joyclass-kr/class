const BOOK_TITLE = "벤허";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "로마가 다스리던 땅",
        emoji: "🏛️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `이야기는 이천 년쯤 전 예루살렘에서 시작합니다. 그 무렵 그 땅은 로마가 다스리고 있었습니다. 로마는 그 땅을 직접 다스리지 않고, 총독을 보내고 세금을 걷었습니다. 그리고 군대를 두었습니다.`,
            `그 땅 사람들은 그것을 견디기 어려워했습니다. 자기 나라가 있던 땅에 남의 군대가 있었기 때문입니다. 그래서 여러 번 들고일어났고, 그때마다 크게 눌렸습니다.`,
            `로마 병사가 큰길을 지나가면 사람들은 벽 쪽으로 물러섰습니다. 그리고 고개를 숙였습니다. 눈을 마주쳐서 좋을 것이 없었기 때문입니다.`,
            `예루살렘에 허라는 집안이 있었습니다. 아주 오래되고 부유한 집안이었습니다. 장사를 크게 해서 안티오키아와 로마에까지 사람을 두고 있었습니다.`,
            `그 집 아들이 유다였습니다. 유다 벤허라고 불렀습니다. 벤허는 허의 아들이라는 뜻입니다.`,
            `그해 유다는 열일곱쯤이었습니다. 아버지는 세상을 떠났고, 어머니와 누이동생 티르사와 살고 있었습니다. 그 집에는 아모라는 늙은 하인과 그 딸 에스더가 있었습니다. 그리고 유다에게는 어릴 때부터 함께 자란 친구가 하나 있었습니다.`,
            `메살라라는 로마 사람이었습니다. 그 아버지가 그 지방의 세금을 걷는 관리였습니다. 두 아이는 같은 뜰에서 놀았고, 같이 공부했습니다. 그러다 메살라가 로마로 공부하러 갔습니다.`,
            `두 아이가 함께 자란 뜰에는 오래된 무화과나무가 한 그루 있었습니다. 어릴 때 둘은 그 아래에서 창던지기를 하고 놀았습니다. 메살라가 거의 언제나 이겼고, 유다는 언제나 한 번만 더 하자고 했습니다.`,
            `그리고 다섯 해 뒤에 돌아왔습니다. 유다는 반가워서 달려갔습니다. 그런데 그 자리에서 무언가가 어긋났습니다.`,
            `유다는 그 다섯 해 동안 편지를 여러 번 썼습니다. 답장은 두 번 왔습니다. 그래도 돌아온다는 소식을 듣고 제일 먼저 달려 나간 것은 유다였습니다.`,
            `메살라가 달라져 있었습니다. 메살라가 이런 말을 했습니다.`,
            `"유다, 너희 신은 하나뿐이라며. 우리 신은 여럿인데."`,
            `"너희는 언제까지 그 오래된 것을 붙들고 있을 거냐."<br>"세상은 이미 로마의 것이다. 로마 편에 서라. 그러면 내가 너를 위로 끌어 주겠다."<br>유다가 말했습니다.<br>"내 나라를 팔라는 말이냐."<br>"나라라는 게 어디 있느냐. 여기는 로마의 한 지방이다."`,
            `그날 두 사람은 다투고 헤어졌습니다. 그리고 다시는 친구가 되지 못했습니다.`,
            `그날 밤 유다는 어머니에게 그 이야기를 했습니다. 어머니가 이렇게 말했습니다.<br>"그 아이는 이제 로마 사람이다."<br>"어릴 때는 그런 것을 모르고 놀았지. 이제는 서로 알게 된 것뿐이다."`
        ]
    },
    {
        num: 2,
        title: "떨어진 기와",
        emoji: "🧱",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `며칠 뒤 새 총독이 예루살렘에 들어오는 날이었습니다. 행렬이 큰길을 지나가게 되어 있었습니다. 유다는 그것을 보려고 자기 집 옥상에 올라갔습니다.`,
            `누이 티르사도 함께 있었습니다. 그 집은 큰길에 면해 있었고, 옥상 난간이 낮았습니다. 행렬이 지나가고, 총독이 말을 타고 그 아래를 지났습니다.`,
            `그 집 옥상 난간은 오래된 것이었습니다. 여름마다 볕에 마르고 겨울마다 얼어서, 위쪽 기와 몇 장은 손만 대도 흔들렸습니다. 그 집에 사는 사람은 다들 그것을 알고 있었습니다.`,
            `유다는 난간에 손을 짚고 몸을 내밀었습니다. 그때 그 자리의 기와 하나가 떨어졌습니다. 그 기와가 총독의 머리에 맞았습니다.`,
            `총독이 말에서 떨어졌습니다. 아래가 순식간에 뒤집혔습니다. 병사들이 그 집으로 몰려 들어왔습니다.`,
            `유다는 옥상에서 그 자리를 내려다보았습니다. 무슨 일이 일어난 것인지 알아차리는 데 잠깐이 걸렸습니다. 그리고 티르사가 유다의 팔을 붙잡았습니다.`,
            `여기서 짚어 둘 것이 있습니다. 그것은 사고였습니다. 유다는 아무 뜻도 없었습니다. 그런데 그때 그 자리에서 그것을 사고로 봐 줄 사람이 없었습니다.`,
            `총독을 노린 것이라고 여겼습니다. 그 지방에서 그런 일이 실제로 여러 번 있었기 때문입니다. 그리고 그 조사를 맡은 사람이 메살라였습니다.`,
            `메살라는 그 집안을 잘 알았습니다. 그 옥상이 어떻게 생겼는지도 알았습니다. 그래서 그것이 사고라는 것을 알 수 있는 유일한 사람이었습니다.`,
            `유다가 메살라에게 말했습니다.<br>"메살라, 너는 알잖아. 저 난간이 어떤지 너도 알잖아."`,
            `메살라는 그 자리에서 유다를 보았습니다. 그리고 아무 말도 하지 않았습니다.`,
            `그러고는 병사들에게 이렇게 말했습니다.<br>"데려가라."`,
            `유다는 끌려 나가면서 뒤를 돌아보았습니다. 어머니가 뜰에 서 있었습니다. 그것이 유다가 어머니를 본 마지막이었습니다.`,
            `그날 그 집안이 끝났습니다. 유다는 배에 노 젓는 사람으로 보내졌습니다. 어머니와 티르사는 감옥에 갇혔습니다.`,
            `그 집은 봉해졌고, 재산은 몰수되었습니다. 그 재산의 상당 부분이 메살라에게 갔습니다. 그것이 이 일의 진짜 까닭이었을 수도 있습니다.`,
            `그날 늙은 하인 아모도 끌려갔습니다. 에스더는 아버지에게 보내졌습니다. 그 집 사람들은 그렇게 흩어졌습니다.`,
            `이 소설은 그것을 단정하지 않습니다. 다만 결과가 그랬다고만 적어 놓았습니다.`
        ]
    },
    {
        num: 3,
        title: "나사렛의 우물",
        emoji: "💧",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `유다는 사슬에 묶여 바닷가로 끌려갔습니다. 걸어서 가는 길이었습니다. 여러 날이 걸렸고, 물을 거의 주지 않았습니다.`,
            `죄수들은 열 명씩 한 줄로 묶여 걸었습니다. 앞사람이 넘어지면 뒷사람도 함께 넘어졌습니다. 그래서 다들 앞사람의 발뒤꿈치만 보고 걸었습니다.`,
            `나사렛이라는 마을을 지날 때 유다는 쓰러졌습니다. 병사들이 그 마을 우물가에서 쉬었습니다. 그리고 죄수들에게는 물을 주지 않았습니다.`,
            `마을 사람들이 나와서 구경했습니다. 그런데 아무도 가까이 오지 않았습니다. 로마 병사가 끌고 가는 죄수에게 손을 대면 어떻게 되는지 다들 알았기 때문입니다.`,
            `유다는 땅에 엎드려 있었습니다. 그때 누가 다가와 물그릇을 입에 대 주었습니다. 유다가 고개를 들었습니다.`,
            `그 마을의 젊은 목수였습니다. 병사 하나가 소리를 질렀습니다.`,
            `"저놈에게 물 주지 마라."`,
            `그 젊은이는 그 병사를 보았습니다. 그리고 아무 말도 하지 않았습니다. 그런데 그 병사가 손을 내렸습니다.`,
            `유다는 그 물이 어떤 맛이었는지 나중에도 말하지 못했습니다. 다만 그때까지 살면서 마신 어떤 것과도 달랐다고만 했습니다.`,
            `유다는 물을 다 마셨습니다. 그리고 그 사람의 얼굴을 보았습니다.`,
            `그 사람은 유다와 나이가 비슷해 보였습니다. 손에는 나무를 다루는 사람의 굳은살이 있었습니다. 아무 말도 하지 않았고, 그릇을 거두어 돌아갔습니다.`,
            `그 뒤로 유다는 그 얼굴을 잊지 못했습니다.`,
            `이 소설의 원래 제목은 『벤허, 그리스도 이야기』입니다. 그러니까 이 소설에는 예수라는 인물이 나옵니다. 다만 이 소설은 그 인물을 정면으로 그리지 않습니다.`,
            `이 이야기의 주인공은 유다이고, 그 인물은 유다의 인생이 크게 꺾이는 자리마다 아주 잠깐씩 스쳐 갑니다. 처음이 이 우물가입니다.`,
            `이 책에서는 그 대목을 원작대로 두겠습니다. 이것은 이천 년 전 그 지방을 배경으로 한 소설이고, 그 시절 그 땅에서 실제로 일어난 일과 사람들이 믿던 것이 그 안에 들어 있습니다.`,
            `종교를 권하는 책으로 읽을 필요는 없습니다. 그 시절 사람들이 무엇을 겪고 무엇에 기대었는지를 보는 것으로 충분합니다.`,
            `유다는 그날 배에 실렸습니다. 그리고 노 젓는 자리에 사슬로 묶였습니다.`,
            `배가 뜨기 전에 유다는 한 가지를 마음에 새겼습니다. 죽지 않겠다는 것이었습니다. 그날 그 우물가에서 왜 그런 생각이 들었는지는 유다도 알지 못했습니다.`
        ]
    },
    {
        num: 4,
        title: "노 젓는 자리",
        emoji: "⛓️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `로마의 군선은 사람이 노를 저어 갔습니다. 배 한 척에 노 젓는 사람이 백 명이 넘었습니다. 그 사람들은 갑판 아래에 사슬로 묶여 지냈습니다.`,
            `노 젓는 자리는 세 층으로 되어 있었습니다. 위층이 그나마 나았고, 아래층으로 갈수록 견디기 어려웠습니다. 유다는 아래층에서 시작했습니다.`,
            `밖을 볼 수 없었고, 어디로 가는지도 몰랐습니다. 이름 대신 번호로 불렸습니다. 유다는 육십일 번이었습니다.`,
            `갑판 아래는 늘 어두웠습니다. 낮인지 밤인지는 북소리로 알았습니다. 북이 빨라지면 배가 급한 것이고, 느려지면 그저 가는 길이었습니다.`,
            `그 자리에서 삼 년을 지냈습니다. 이 대목을 이 소설은 아주 자세히 씁니다. 그리고 유다가 그 삼 년을 어떻게 견뎠는지도 적어 놓았습니다.`,
            `유다는 그 자리에서 몸을 만들었습니다. 노를 저으면서 일부러 힘을 더 썼습니다. 그리고 어머니와 누이가 어디 있는지를 알아내려고 했습니다.`,
            `노를 한 번 젓고 숨을 한 번 쉬는 것이 삼 년 동안 유다가 한 일의 전부였습니다. 손바닥은 굳은살이 벗겨지고 다시 앉기를 되풀이했습니다. 어깨는 넓어지고 팔은 굵어졌습니다.`,
            `살아 있다면 언젠가 찾아야 했기 때문입니다. 그것 하나로 삼 년을 버텼습니다. 그 배의 사령관은 아리우스라는 사람이었습니다.`,
            `해적을 치러 가는 함대를 이끌고 있었습니다. 아리우스는 노 젓는 자리를 둘러보다가 유다를 보았습니다. 그리고 이상하게 여겼습니다.`,
            `그 자리에서 삼 년을 버틴 사람이 드물었기 때문입니다. 대개 한 해를 넘기지 못했습니다.`,
            `아리우스는 그날 밤 유다를 갑판으로 불러올렸습니다. 삼 년 만에 하늘을 본 것이었습니다. 유다는 한참 동안 아무 말도 하지 못했습니다.`,
            `아리우스가 물었습니다.<br>"너는 누구냐."<br>"육십일 번입니다."<br>"그전에는."<br>"예루살렘의 유다 벤허입니다."<br>아리우스가 다시 물었습니다.<br>"무엇으로 여기까지 버텼느냐."<br>유다가 말했습니다.<br>"제 어머니와 누이가 살아 있는지 알아야 합니다."`,
            `아리우스는 그날 유다의 사슬을 풀어 주라고 했습니다. 싸움이 벌어지면 사슬을 푸는 일이 없었습니다. 배가 가라앉으면 그 사람들도 함께 가라앉는 것이 규칙이었습니다. 그런데 아리우스는 그날 유다만 풀어 주었습니다.`,
            `유다는 그 까닭을 묻지 않았습니다. 아리우스도 말하지 않았습니다. 다만 그 뒤로 유다는 그날 밤을 여러 번 떠올렸습니다.`
        ]
    },
    {
        num: 5,
        title: "바다에서",
        emoji: "🌊",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `그날 해적선과 큰 싸움이 벌어졌습니다. 아리우스의 배가 들이받혀 가라앉았습니다. 노 젓던 사람들은 사슬에 묶인 채 배와 함께 가라앉았습니다.`,
            `그날 아침부터 북이 빨라져 있었습니다. 갑판 위에서 사람들이 뛰는 소리가 났습니다. 아래에서는 아무것도 보이지 않았고, 소리로만 알 수 있었습니다.`,
            `유다만 사슬이 풀려 있었습니다. 유다는 물 위로 올라왔습니다. 그리고 널빤지를 하나 붙잡았습니다.`,
            `배가 기울 때 유다는 뚫린 데로 빠져나왔습니다. 물이 차오르는 소리와 사람들이 부르는 소리가 뒤에서 들렸습니다. 유다는 그 소리를 오래 잊지 못했습니다.`,
            `그때 옆에서 사람이 하나 떠올랐습니다. 아리우스였습니다. 갑옷 때문에 가라앉고 있었습니다.`,
            `갑옷은 무거웠습니다. 사령관의 갑옷일수록 더 그랬습니다. 그래서 배가 가라앉으면 사령관이 제일 먼저 가라앉았습니다.`,
            `유다는 그를 끌어올렸습니다. 그리고 갑옷을 벗겨 냈습니다. 두 사람은 그 널빤지에 매달려 밤을 보냈습니다.`,
            `바다는 잔잔했습니다. 널빤지는 두 사람이 매달리기에 겨우 넉넉했습니다. 유다는 그 사람이 누구인지 알면서도 아무 말도 하지 않았습니다.`,
            `밤중에 아리우스가 깨어났습니다. 그리고 사방을 보았습니다.`,
            `그가 이렇게 말했습니다.<br>"내 배가 졌구나."<br>"모르겠습니다."<br>"졌으면 나는 살아 돌아갈 수 없다. 로마에서는 진 사령관이 살아 돌아가지 않는다."<br>그리고 이렇게 말했습니다.<br>"내 칼을 다오."`,
            `유다는 주지 않았습니다.`,
            `"아직 모르는 일입니다."<br>"너는 내가 무엇을 하려는지 아느냐."<br>"압니다."<br>"그런데 왜 막느냐."<br>유다가 말했습니다.<br>"저는 삼 년 동안 죽고 싶었습니다. 그런데 죽지 않았습니다."<br>"제가 죽으면 제 어머니와 누이를 아무도 안 찾을 테니까요."`,
            `아리우스는 그 말을 듣고 아무 말도 하지 못했습니다. 아침에 배가 하나 나타났습니다. 로마 배였습니다. 그리고 그 싸움에서 로마가 이겼습니다.`,
            `날이 밝을 때까지 두 사람은 아무 말도 하지 않았습니다.`,
            `아리우스는 승리한 사령관으로 로마에 돌아갔습니다. 그리고 유다를 데려갔습니다.`,
            `돌아가는 배 위에서 아리우스가 물었습니다.<br>"너는 이제 무엇을 하겠느냐."<br>"찾아야 할 사람이 둘 있습니다."<br>"그다음은."<br>유다는 대답하지 않았습니다.`
        ]
    },
    {
        num: 6,
        title: "로마에서",
        emoji: "🏇",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `아리우스에게는 아들이 없었습니다. 그래서 유다를 양자로 삼았습니다. 유다는 그날부터 로마 시민이 되었습니다.`,
            `로마에서 양자를 들이는 것은 드문 일이 아니었습니다. 이름과 재산을 물려줄 사람이 필요했기 때문입니다. 그래도 노 젓던 사람을 양자로 삼은 것은 흔한 일이 아니었습니다.`,
            `이것이 이 이야기에서 아주 중요한 대목입니다. 로마 시민이라는 것은 그 시절에 아주 큰 것이었습니다. 함부로 매를 맞지 않았고, 재판을 요구할 수 있었고, 어디든 갈 수 있었습니다.`,
            `유다는 다섯 해 동안 로마에서 지냈습니다. 그리고 그동안 두 가지를 했습니다.`,
            `첫째, 싸우는 법을 배웠습니다.`,
            `로마의 검투 학교에서 배웠습니다. 그리고 말과 전차 모는 법을 배웠습니다. 유다는 그것을 아주 잘했습니다. 삼 년 동안 노를 저은 팔이었기 때문입니다.`,
            `전차는 말 넷을 한 사람이 모는 것이었습니다. 고삐를 몸에 감고 몰았습니다. 넘어지면 그 고삐 때문에 끌려갔습니다. 그래서 다들 허리에 칼을 하나 차고 몰았습니다.`,
            `둘째, 사람을 보냈습니다. 예루살렘에 사람을 여러 번 보내 어머니와 누이를 찾게 했습니다. 그런데 아무것도 나오지 않았습니다.`,
            `살아 있다는 말도, 세상을 떠났다는 말도 없었습니다. 그것이 제일 견디기 어려운 것이었습니다.`,
            `기록이 없었습니다. 그 집안이 몰수될 때 관련 서류가 다 사라진 것이었습니다. 그리고 그것을 처리한 사람이 메살라였습니다.`,
            `아리우스가 세상을 떠나자 유다는 그 재산을 물려받았습니다. 그리고 동쪽으로 갔습니다. 안티오키아라는 도시였습니다.`,
            `유다는 그때 로마에서 하려면 무엇이든 할 수 있는 사람이 되어 있었습니다. 그런데 로마에 남을 생각은 하지 않았습니다.`,
            `그 도시에 유다 집안의 옛 하인 시모니데스가 살고 있었습니다. 유다의 아버지가 장사를 맡겨 두었던 사람입니다. 유다가 그 집을 찾아갔습니다. 그리고 놀랐습니다.`,
            `시모니데스는 몸을 쓰지 못하는 상태였습니다. 여러 해 전에 고문을 받았기 때문입니다. 로마 쪽에서 허 집안의 재산이 어디 있는지 대라고 여러 번 고문한 것이었습니다.`,
            `시모니데스는 끝까지 말하지 않았습니다. 그래서 그 재산이 그대로 남아 있었습니다. 그 집 딸이 에스더였습니다.`,
            `유다가 어릴 때 그 집에서 함께 자란 그 에스더였습니다.`,
            `에스더는 유다를 알아보았습니다. 그런데 아무 말도 하지 않았습니다. 그 집에서 유다는 도련님이었고, 에스더는 종의 딸이었기 때문입니다.`
        ]
    },
    {
        num: 7,
        title: "시모니데스",
        emoji: "📜",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `유다가 자기가 누구인지 밝혔습니다. 시모니데스는 처음에 믿지 않았습니다. 그런 사람이 여러 번 왔었기 때문입니다.`,
            `시모니데스는 바퀴 달린 의자에 앉아 있었습니다. 손도 발도 마음대로 쓰지 못했습니다. 그런데 눈만은 아주 밝았습니다.`,
            `재산을 노리고 유다 벤허 행세를 하는 자들이었습니다. 시모니데스가 여러 가지를 물었습니다. 그 집 뜰의 나무가 무엇이었는지, 아버지의 인장에 무엇이 새겨져 있었는지.`,
            `유다가 다 대답했습니다. 장부는 한 권이 아니었습니다. 사람이 여럿 들어야 할 만큼이었습니다. 여러 해 동안 하루도 빠뜨리지 않고 적은 것이었습니다.`,
            `시모니데스가 사람을 불러 그 장부를 가져오게 했습니다.`,
            `그리고 이렇게 말했습니다.<br>"이것이 그동안의 셈입니다."`,
            `그 장부에는 여러 해치 거래가 다 적혀 있었습니다. 그리고 마지막 줄에 합계가 있었습니다. 유다가 그것을 보고 놀랐습니다.`,
            `아버지가 남긴 것보다 훨씬 늘어나 있었습니다. 시모니데스가 그동안 장사를 계속했던 것입니다. 주인이 없는 채로요.`,
            `주인이 죽었는지 살았는지도 모르는 채로였습니다. 그러면서 그 재산이 어디 있는지는 끝까지 말하지 않았습니다. 말했으면 고문이 그날로 끝났을 것입니다.`,
            `"이것은 다 도련님 것입니다."<br>"그리고 저와 제 딸도 법으로는 이 집안의 종입니다. 그러니 저희도 도련님 것입니다."<br>유다가 말했습니다.<br>"어르신은 고문을 받으면서도 이것을 지키셨습니다."<br>"그것이 제 일이었습니다."<br>"저는 어르신을 종으로 두지 않겠습니다."`,
            `그리고 그 자리에서 두 사람을 풀어 주는 문서를 썼습니다. 에스더가 그 자리에 있었습니다. 그리고 아버지의 어깨에 손을 얹고 있었습니다.`,
            `시모니데스가 그 문서를 받아 들고 오래 보았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"이 문서는 받겠습니다. 그런데 저는 계속 이 집안 일을 하겠습니다."<br>"왜요."<br>"제가 그러고 싶어서 하는 것과 그래야 해서 하는 것은 다릅니다."<br>"오늘부터는 앞의 것입니다."`,
            `유다는 그 사람에게서 한 가지를 더 알아냈습니다. 메살라가 안티오키아에 와 있다는 것이었습니다. 그리고 그 도시에서 곧 큰 전차 경주가 열린다는 것도요.`,
            `유다가 그 말을 듣고 자리에서 일어섰습니다. 시모니데스가 물었습니다.<br>"무엇을 하시려고요."<br>"그 경주에 나가겠습니다."<br>"이겨서 무엇을 얻으시려고요."<br>유다는 대답하지 않았습니다.`
        ]
    },
    {
        num: 8,
        title: "발타사르",
        emoji: "🐪",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `안티오키아 근처에서 유다는 사람 둘을 만났습니다. 일데림이라는 아랍 족장과, 발타사르라는 아주 늙은 이집트 사람이었습니다. 일데림은 말을 기르는 사람이었습니다.`,
            `일데림의 천막은 검은 염소 털로 짠 것이었습니다. 사막 사람들이 오래 써 온 천막이었습니다. 낮에는 볕을 막고 밤에는 바람을 막았습니다.`,
            `아주 좋은 말 넷을 가지고 있었습니다. 그리고 그 말들로 전차 경주에 나가려고 했습니다. 그런데 모는 사람이 없어서 애를 먹고 있었습니다.`,
            `그 넷이 성질이 제각각이라 함께 몰기가 어려웠기 때문입니다. 유다가 그 말들을 보았습니다. 그리고 하루 종일 그 말들 곁에 있었습니다.`,
            `말 넷을 나란히 매어 끄는 것을 사두마차라고 했습니다. 가운데 둘이 힘을 쓰고, 바깥 둘이 방향을 잡았습니다. 그래서 넷이 서로를 알아야 했습니다.`,
            `이름을 하나씩 익히고, 먹이를 주고, 성질을 살폈습니다. 이튿날 유다가 그 말들을 몰아 보았습니다. 일데림이 그것을 보고 자리에서 일어섰습니다.`,
            `제일 빠른 놈은 왼쪽 흰말이었습니다. 그런데 겁이 많았습니다. 유다는 그 말을 안쪽에 두지 않기로 했습니다.`,
            `"자네가 몰아 주게."`,
            `일데림이 유다에게 물었습니다.<br>"자네는 왜 이 경주에 나가려는가."<br>"갚아 줄 사람이 하나 있습니다."<br>일데림이 웃었습니다.<br>"그런 사람이 모는 전차가 제일 빠르지."`,
            `발타사르는 아주 늙었고 몸이 약했습니다. 그런데 이야기를 할 때만은 목소리가 또렷했습니다.`,
            `발타사르는 다른 이야기를 하는 사람이었습니다. 아주 젊었을 때 별을 따라 먼 길을 갔다는 이야기였습니다.`,
            `그때 다른 두 사람과 함께 갔는데, 그 두 사람은 이미 세상을 떠났다고 했습니다. 그리고 그 여행 끝에서 갓 태어난 아기를 보았다고 했습니다.`,
            `"그 아이가 지금 살아 있다면 서른쯤 되었을 것입니다."<br>유다가 물었습니다.<br>"그 사람이 왕이 됩니까."<br>"저는 그렇게 알고 갔습니다."<br>"그럼 로마를 몰아냅니까."`,
            `발타사르가 한참 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"저는 그날 그 아기를 보았을 때 다르게 느꼈습니다."<br>"어떻게요."<br>"이 아이가 세울 나라는 땅 위의 나라가 아니겠구나 하고요."`,
            `유다는 그 말을 알아듣지 못했습니다. 유다가 바라는 것은 아주 분명했습니다. 로마를 몰아내는 것, 그리고 메살라에게 갚아 주는 것이었습니다.`,
            `이 두 가지가 이 소설을 끝까지 끌고 갑니다. 그리고 마지막에 그 두 가지가 다 뒤집힙니다.`
        ]
    },
    {
        num: 9,
        title: "전차 경주",
        emoji: "🏁",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `이 소설에서 제일 유명한 대목입니다.`,
            `안티오키아의 원형 경기장에 전차 아홉 대가 나왔습니다. 그 시절 전차 경주는 로마 세계에서 제일 큰 구경거리였습니다.`,
            `경기장은 가운데에 긴 담이 있고, 그 양 끝에 반환점 기둥이 서 있었습니다. 전차는 그 담을 끼고 돌았습니다. 관중은 그 담 너머로 반대편 전차를 보았습니다.`,
            `말 넷이 끄는 가벼운 수레를 몰고 타원형 경기장을 일곱 바퀴 도는 것이었습니다. 제일 위험한 곳이 반환점이었습니다. 거기서 안쪽으로 바짝 붙으면 빠른데, 잘못하면 바퀴가 부딪쳐 부서졌습니다.`,
            `그날 경기장에 사람이 가득 찼습니다. 그리고 그 자리에 메살라가 나와 있었습니다. 자기가 직접 몰았습니다.`,
            `구경꾼들은 저마다 돈을 걸었습니다. 그날 걸린 돈이 그 도시에서 하루에 오가는 돈보다 많았다고 합니다.`,
            `메살라는 자기 전 재산을 그 경주에 걸었습니다. 이길 자신이 있었기 때문입니다. 유다는 일데림의 말 넷을 몰았습니다.`,
            `출발선에서 두 사람이 눈을 마주쳤습니다. 그리고 아무 말도 하지 않았습니다. 경주가 시작되었습니다.`,
            `유다는 고삐를 허리에 감았습니다. 그리고 칼을 옆에 두었습니다. 넘어지면 그 칼로 고삐를 끊어야 했기 때문입니다.`,
            `메살라의 전차 바퀴통에는 쇠가 튀어나와 있었습니다. 규칙에 어긋나는 것이었습니다. 그것으로 남의 바퀴를 부수려는 것이었습니다.`,
            `실제로 메살라는 그 방법으로 다른 전차 하나를 부쉈습니다. 그리고 그 전차가 뒤집히면서 다른 두 대가 걸려 넘어졌습니다. 유다는 그것을 보았습니다. 그리고 반환점에서 안쪽으로 들어갔습니다.`,
            `두 전차가 나란히 붙었습니다. 메살라가 그 쇠로 유다의 바퀴를 노렸습니다. 그런데 유다가 그 순간 바깥으로 살짝 벌렸습니다.`,
            `메살라의 바퀴가 헛돌면서 축이 어긋났습니다. 그리고 그 전차가 뒤집혔습니다. 유다는 일곱 바퀴를 다 돌고 첫 번째로 들어왔습니다.`,
            `유다가 한 것은 부딪치는 것이 아니라 비키는 것이었습니다. 그 쇠는 남의 바퀴에 걸려야 힘을 쓰는 것이었기 때문입니다. 걸릴 것이 없으면 제 축이 어긋났습니다.`,
            `경기장이 뒤집혔습니다. 메살라는 그 자리에서 크게 다쳤습니다. 그리고 다시는 걷지 못하게 되었습니다. 그리고 전 재산을 잃었습니다.`,
            `유다가 이겼습니다. 그런데 이 소설은 그 뒤에 이런 대목을 붙여 놓았습니다. 유다가 그날 밤 잠을 못 잤다는 것입니다.`,
            `그날 밤 유다는 이겼다는 말을 여러 번 들었습니다. 사람들이 찾아와 축하했습니다. 그런데 사람들이 다 돌아간 뒤에 유다는 혼자 앉아 있었습니다.`,
            `"내가 바라던 것이 이것이었다."<br>"그런데 왜 아무것도 달라지지 않았을까."`,
            `어머니와 누이는 여전히 어디 있는지 몰랐습니다.`
        ]
    },
    {
        num: 10,
        title: "문둥이 골짜기",
        emoji: "🕯️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그 뒤에 유다는 어머니와 누이가 어떻게 되었는지 알아냈습니다. 두 사람은 여러 해 전에 예루살렘의 안토니아 요새 지하 감옥에 갇혔습니다. 그리고 잊혔습니다.`,
            `알아낸 것은 아모였습니다. 늙은 하인 하나가 여덟 해 동안 그 일만 하고 있었던 것입니다.`,
            `기록에 올리지 않고 넣어 둔 것이었습니다. 그러다 새 총독이 오면서 감옥을 정리하다가 발견되었습니다. 그런데 두 사람은 그 지하에서 병에 걸려 있었습니다.`,
            `그 지하에는 볕이 들지 않았습니다. 두 사람은 그 안에서 몇 해가 지났는지도 몰랐습니다. 티르사는 갇힐 때 열다섯이었습니다.`,
            `그 시절에 나병이라고 부르던 병이었습니다. 그 병에 걸린 사람은 도시에 들어갈 수 없었습니다. 법으로 그랬습니다. 그리고 가족을 만나는 것도 금지되어 있었습니다.`,
            `두 사람은 성 밖의 골짜기로 보내졌습니다. 그 병에 걸린 사람들이 모여 사는 곳이었습니다.`,
            `그 골짜기에 들어가는 사람은 이름을 잃었습니다. 죽은 사람으로 치고 장례를 지내는 일도 있었습니다.`,
            `여기서 짚어 둘 것이 있습니다.`,
            `그 시절 사람들은 그 병이 어떻게 옮는지 몰랐습니다. 그래서 아주 무서워했고, 걸린 사람을 사람 취급하지 않았습니다. 지금은 그 병이 잘 옮지 않고, 약으로 낫는다는 것을 압니다.`,
            `그러니 이 대목을 읽을 때 그 시절의 무지를 함께 읽어야 합니다.`,
            `유다의 어머니는 아들에게 알리지 말라고 했습니다. 아들이 자기를 그 모습으로 보는 것을 견딜 수 없었기 때문입니다. 그런데 늙은 하인 아모가 두 사람을 찾아냈습니다.`,
            `그리고 몰래 먹을 것을 날랐습니다. 유다도 결국 알게 되었습니다. 그리고 그 골짜기로 갔습니다.`,
            `아모는 그 일을 여러 해 했습니다. 그러면서 유다에게는 알리지 않았습니다. 어머니가 그렇게 시켰기 때문입니다.`,
            `어머니가 멀리서 소리쳤습니다.<br>"오지 마라!"`,
            `유다가 소리쳤습니다.<br>"어머니."<br>"오지 마라. 거기 서 있어라."<br>"제가 갑니다."<br>"오면 나는 다시는 너를 보지 않겠다."`,
            `유다는 그 자리에 섰습니다. 그리고 아무것도 할 수 없었습니다.`,
            `그날 유다는 이런 것을 알았습니다. 자기는 로마 시민이 되었고, 큰 재산이 있었고, 전차 경주에서 이겼습니다. 그런데 그 어느 것도 이 자리에서는 아무 소용이 없었습니다.`,
            `유다는 그날 밤 골짜기 위쪽 바위에 앉아 날이 밝을 때까지 있었습니다. 아래에서 불빛 몇 개가 흔들렸습니다. 그것이 어머니가 있는 곳인지 아닌지도 알 수 없었습니다.`
        ]
    },
    {
        num: 11,
        title: "그 사람을 다시 보다",
        emoji: "🌿",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `그 무렵 유다는 아직 로마와 싸울 준비를 하고 있었습니다. 일데림의 도움을 받아 사람을 모으고 훈련시켰습니다. 그리고 그 무렵 갈릴리에서 사람이 하나 나타나 사람들을 모으고 있다는 소식을 들었습니다.`,
            `유다가 모은 사람이 여러 천 명이었습니다. 무기도 있었고 돈도 있었습니다. 신호만 하면 되는 상태였습니다.`,
            `유다는 그 사람이 자기가 기다리던 사람일지 모른다고 생각했습니다. 왕이 나서서 로마를 몰아낼 것이라고요. 그래서 그 사람을 보러 갔습니다.`,
            `가서 보니 그 사람은 군사를 모으고 있지 않았습니다. 병든 사람을 고치고 있었습니다. 그리고 사람들에게 이런 말을 하고 있었습니다.`,
            `언덕에 사람들이 앉아 있었습니다. 무기를 든 사람은 하나도 없었습니다. 유다는 그 자리에 서서 한참을 보았습니다.`,
            `원수를 사랑하라는 말이었습니다. 유다는 그 말을 듣고 화가 났습니다. 자기가 무엇을 겪었는지를 생각하면 견딜 수 없는 말이었습니다. 그런데 그 사람의 얼굴을 보고 유다는 얼어붙었습니다.`,
            `여러 해 전 나사렛 우물가에서 물을 준 그 사람이었습니다. 유다는 그 자리에서 오래 서 있었습니다.`,
            `유다는 그 얼굴을 여덟 해 동안 잊지 않고 있었습니다. 그런데 그 사람은 유다를 알아보지 못하는 것 같았습니다. 알아보고도 아무 말을 하지 않은 것인지도 모릅니다.`,
            `그 뒤로 유다는 여러 번 그 사람을 따라다녔습니다. 그리고 끝까지 이해하지 못했습니다. 유다가 바란 것은 로마를 몰아내는 일이었기 때문입니다. 그런데 그 사람은 그럴 생각이 없어 보였습니다.`,
            `유다가 발타사르에게 물었습니다.<br>"저 사람은 왜 아무것도 안 합니까."<br>발타사르가 말했습니다.<br>"당신이 바라는 것을 안 하는 것이지요."`,
            `그리고 얼마 뒤 그 사람이 붙잡혔습니다. 유다는 사람을 모아 구하려고 했습니다. 그런데 그 사람이 저항하지 않았습니다. 그래서 아무것도 하지 못했습니다.`,
            `유다는 그날 밤 무기를 나눠 주었습니다. 그리고 사람들을 성안으로 들여보냈습니다. 그런데 아무 일도 일어나지 않았습니다.`,
            `그리고 그날 예루살렘에서 그 일이 있었습니다. 이 소설은 그 장면을 유다와 어머니와 티르사가 멀리서 보는 것으로 그립니다. 세 사람은 그날 성 밖 길가에 있었습니다.`,
            `그 병 때문에 도시에 들어갈 수 없었기 때문입니다.`,
            `셋은 길가에 서서 사람들이 지나가는 것을 보았습니다. 티르사가 얼굴을 가린 천 사이로 물었습니다.<br>"오빠가 말하던 그 사람이에요?"<br>"그래."<br>"그런데 왜 아무것도 안 하죠."<br>유다는 대답하지 못했습니다.`
        ]
    },
    {
        num: 12,
        title: "그 뒤",
        emoji: "🌅",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `이 소설의 마지막에서 어머니와 티르사가 낫습니다.`,
            `원작은 그것을 기적으로 그립니다. 이 책에서도 그대로 두겠습니다.`,
            `이 이야기는 이천 년 전 그 지방 사람들이 무엇을 믿었는지를 배경으로 쓰인 소설이기 때문입니다.`,
            `그리고 그 뒤에 유다가 달라집니다. 유다는 그때까지 여덟 해가 넘도록 한 가지만 생각하고 살았습니다.`,
            `여덟 해 전 그 옥상에서 기와가 떨어진 날, 유다는 열일곱이었습니다. 이제 스물다섯이 넘었습니다.`,
            `메살라에게 갚아 주는 것이었습니다. 그리고 그것을 이루었습니다. 메살라는 다시 걷지 못하게 되었고 전 재산을 잃었습니다. 그런데 유다는 그것으로 아무것도 얻지 못했습니다.`,
            `어머니와 누이는 그 사이에 병들었고, 자기는 그 골짜기 앞에서 아무것도 할 수 없었습니다. 이 소설은 그 대목을 아주 분명하게 씁니다. 갚아 주는 것으로는 되돌아오는 것이 없다는 것입니다.`,
            `마지막에 유다는 준비하던 군사를 해산합니다. 그리고 그 돈을 다른 데 씁니다. 로마에 가서, 그곳에서 쫓기던 사람들이 숨을 곳을 마련해 줍니다.`,
            `모아 놓은 사람들을 다 돌려보냈습니다. 일데림이 물었습니다.<br>"이걸 다 접겠다는 말인가."<br>"예."<br>"까닭을 물어도 되겠나."<br>"이겨 봤습니다. 그런데 아무것도 돌아오지 않았습니다."`,
            `유다는 에스더와 혼인합니다. 시모니데스는 그 집안 일을 계속 맡습니다. 자기가 그러고 싶어서요.`,
            `메살라가 그 뒤에 어떻게 되었는지는 이 소설이 길게 적지 않습니다. 다시 걷지 못하게 되었고, 가진 것을 다 잃었다는 것까지만 적어 놓았습니다.`,
            `이 소설을 쓴 사람은 루 월리스라는 미국 사람입니다.`,
            `이 사람은 원래 소설가가 아니었습니다. 남북 전쟁에서 장군이었습니다. 그리고 어느 전투에서 판단을 잘못해 크게 비난을 받았습니다.`,
            `그 뒤로 여러 해 동안 그 일이 따라다녔습니다.`,
            `그 사람이 이 소설을 쓴 것은 자기 이름을 되찾으려던 것이 아니었습니다. 다만 갚아 주는 일에 대해 오래 생각한 사람이 쓴 이야기인 것은 분명합니다.`,
            `이 소설을 쓴 것은 그 뒤였습니다. 그리고 이 소설이 십구 세기 미국에서 성경 다음으로 많이 팔린 책이 되었습니다.`,
            `한 가지를 덧붙여 두겠습니다. 이 소설의 주인공은 여덟 해 동안 복수만 생각했습니다.`,
            `그리고 이겼습니다. 그런데 이긴 날 밤에 잠을 못 잤습니다.`,
            `이 이야기에서 남는 것이 있다면 아마 그 밤일 것입니다.`
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
                ${artFrame('cover.png', '🏇')}
            </div>
            <div class="story-page-right">
                <h1>벤허</h1>
                <p class="cover-tag">루 월리스 원작</p>
                <p>옥상에서 기와 하나가 떨어진 그 순간, 예루살렘의 부유한 집안 아들 유다 벤허가 노 젓는 배로 보내집니다. 어머니와 누이는 감옥에 갇힙니다.</p>
                <p>여덟 해 동안 갚아 줄 것만 생각하고 살아 마침내 이기는 사람의 이야기입니다. 그리고 이긴 날 밤에 잠을 못 잔 사람의 이야기이기도 합니다.</p>
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
    { q: "유다와 메살라가 갈라선 까닭은 무엇입니까?", choices: ["어릴 때 창던지기에서 진 것을 앙갚음하려고", "메살라가 로마 편에 서라고 하고 유다가 거절해서", "메살라가 유다네 집 재산을 노리고 다투어서"], answer: 1 },
    { q: "총독이 다친 일은 무엇이었습니까?", choices: ["옥상에서 떨어진 기와에 맞은 사고였다", "유다가 노려서 기와를 던진 일이었다", "메살라가 처음부터 꾸며 낸 거짓 사고였다"], answer: 0 },
    { q: "메살라가 그것이 사고임을 알 수 있었던 까닭은 무엇입니까?", choices: ["그 자리에서 처음부터 다 보고 있어서", "함께 있던 병사에게 말을 전해 들어서", "그 집 옥상이 어떤지 어릴 때부터 알아서"], answer: 2 },
    { q: "나사렛 우물가에서 유다에게 물을 준 사람은 누구입니까?", choices: ["죄수를 딱하게 여긴 병사", "물을 길으러 온 마을 여자", "그 마을에 살던 젊은 목수"], answer: 2 },
    { q: "유다가 노 젓는 배에서 삼 년을 버틴 힘은 무엇입니까?", choices: ["어머니와 누이가 살아 있는지 알아야 한다는 것", "언젠가 로마 시민이 되고 말겠다는 바람이었다", "메살라에게 갚아 주겠다는 마음 하나뿐이었다"], answer: 0 },
    { q: "아리우스가 유다의 사슬을 풀어 준 것이 왜 특별합니까?", choices: ["싸움이 끝나기 전에는 아무도 갑판에 오를 수 없어서", "노 젓는 사람의 사슬은 사령관도 풀 수 없는 것이라서", "배가 가라앉으면 노 젓는 사람도 함께 가라앉는 규칙이라서"], answer: 2 },
    { q: "바다에서 유다가 아리우스에게 칼을 주지 않은 까닭은 무엇입니까?", choices: ["그 칼을 자기가 쓰려고 몰래 감추어 두었기 때문에", "로마 사람을 도울 마음이 조금도 없었기 때문에", "자기도 삼 년 동안 죽고 싶었지만 죽지 않았기 때문에"], answer: 2 },
    { q: "로마 시민이 된다는 것이 그 시절 왜 컸습니까?", choices: ["나라에서 해마다 곡식과 돈을 받게 되기 때문에", "함부로 매를 맞지 않고 재판을 요구할 수 있어서", "군대에 들어가 높은 벼슬을 얻을 수 있게 되어서"], answer: 1 },
    { q: "시모니데스가 고문을 받고도 말하지 않은 것은 무엇입니까?", choices: ["허 집안의 재산이 어디 있는지", "유다가 어느 배에 실려 갔는지", "누가 총독을 다치게 한 것인지"], answer: 0 },
    { q: "풀려난 뒤에도 시모니데스가 그 집안 일을 계속한 까닭은 무엇입니까?", choices: ["그 일 말고는 달리 할 줄 아는 것이 없었기 때문에", "그러고 싶어서 하는 것과 그래야 해서 하는 것은 다르니까", "몸을 쓰지 못해 다른 데로 갈 수 없었기 때문에"], answer: 1 },
    { q: "발타사르가 그 아기를 보고 느낀 것은 무엇입니까?", choices: ["이 아이가 자라 로마를 몰아내는 왕이 되겠구나", "이 아이가 세울 나라는 땅 위의 나라가 아니겠구나", "이 아이를 데려다 내가 길러야 하지 않겠는가"], answer: 1 },
    { q: "전차 경주에서 메살라가 쓴 반칙은 무엇입니까?", choices: ["남의 말에 미리 몰래 약을 먹여 두었다", "바퀴통에 쇠를 튀어나오게 달아 두었다", "출발 신호가 나기 전에 먼저 달려 나갔다"], answer: 1 },
    { q: "이긴 날 밤 유다가 잠을 못 잔 까닭은 무엇입니까?", choices: ["바라던 것을 이뤘는데 아무것도 달라지지 않아서", "메살라가 크게 다친 것이 마음에 걸렸기 때문에", "사람들이 밤새 찾아와 축하해 주었기 때문에"], answer: 0 },
    { q: "어머니와 누이가 병에 걸린 곳은 어디입니까?", choices: ["기록에 올리지 않고 넣어 둔 지하 감옥", "봉해진 채 비어 있던 자기네 집 안", "성 밖 골짜기에 있던 병든 사람들 마을"], answer: 0 },
    { q: "유다가 그 사람을 보러 갔다가 화가 난 까닭은 무엇입니까?", choices: ["군사를 모으지 않고 원수를 사랑하라고 해서", "자기를 끝내 알아보지 못하고 지나가 버려서", "어머니와 누이의 병을 고쳐 주지 않아서"], answer: 0 },
    { q: "마지막에 유다가 한 일은 무엇입니까?", choices: ["메살라를 찾아가 마지막으로 갚아 주고 왔다", "모은 군사를 이끌고 끝내 로마와 싸우러 나갔다", "군사를 해산하고 그 돈을 쫓기는 사람들에게 썼다"], answer: 2 }
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
            <h2>벤허를 다 읽었습니다</h2>
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
