const STORIES = [
    {
        num: 1,
        title: "토끼와 거북이",
        hook: "느려도 멈추지 않으면 결국 이긴다",
        art: "story-01-race.png",
        art2: "story-01-race-2.png",
        emoji: "🐢",
        open: [
            "숲속에서 제일 빠른 건 누가 뭐래도 토끼였어요. 토끼는 만나는 동물마다 자랑을 늘어놓았죠. '나보다 빠른 건 이 세상에 없을걸?' 어느 날 느릿느릿 걷던 거북이가 그 말을 듣고 조용히 말했어요. '그럼 나랑 한번 달려볼래?' 숲속 동물들이 다 모여들어 웅성거렸어요. '거북이가 토끼한테 도전을 했다고?'",
            "출발선에 선 토끼는 웃음을 참지 못했어요. '좋아, 재미있겠는걸.' 신호와 함께 토끼는 눈 깜짝할 사이에 저 멀리 사라졌고, 거북이는 여전히 한 걸음, 한 걸음 천천히 걸어 나갔어요."
        ],
        close: [
            "한참을 달리던 토끼는 뒤를 돌아보고 코웃음을 쳤어요. 거북이는 아직 출발점 근처에서 어슬렁거리고 있었거든요. '이 정도면 낮잠 한숨 자고 가도 넉넉하겠는걸.' 토끼는 나무 그늘에 벌러덩 누워 눈을 감았어요.",
            "그런데 토끼가 쿨쿨 자는 사이, 거북이는 쉬지 않고 한 걸음씩, 한 걸음씩 계속 걸었어요. 느리지만 단 한 번도 멈추지 않았죠. 해가 뉘엿뉘엿 저물 무렵, 토끼는 화들짝 놀라 잠에서 깼어요. '아차!' 토끼는 있는 힘껏 달렸지만, 결승선에는 이미 거북이가 먼저 도착해 환하게 웃고 있었답니다.",
            "동물들의 함성 속에서 거북이가 씩 웃으며 말했어요. '너는 나보다 빠르지만, 나는 너보다 꾸준했거든.'"
        ],
        moral: "아무리 재능이 뛰어나도 방심하면 꾸준한 사람을 이길 수 없어요. 느리더라도 멈추지 않는 것이 진짜 힘이랍니다.",
        question: "나도 자신 있다고 방심하다가 꾸준한 사람에게 따라잡힌 적이 있나요?"
    },
    {
        num: 2,
        title: "여우와 신 포도",
        hook: "못 먹은 포도는 정말 실까요?",
        art: "story-02-grapes.png",
        art2: "story-02-grapes-2.png",
        emoji: "🍇",
        open: [
            "배고픈 여우 한 마리가 숲을 어슬렁거리다 포도나무 덩굴을 발견했어요. 높다란 시렁 위로 탐스러운 포도송이가 주렁주렁 매달려 있었죠. '오, 저거 딱이네!' 여우는 침을 삼키며 팔짝 뛰어올랐어요. 하지만 포도는 손끝에 아슬아슬하게 닿지 않았어요.",
            "여우는 몇 걸음 물러났다가 다시 힘차게 도약했어요. 이번에도 실패. 세 번째, 네 번째... 여우는 몇 번이고 계속 뛰어올랐지만, 포도는 여전히 저 높은 곳에서 흔들거릴 뿐이었어요."
        ],
        close: [
            "땀을 뻘뻘 흘리며 한참을 뛰던 여우는 결국 헉헉대며 주저앉았어요. 도저히 닿을 수가 없었거든요. 여우는 옷에 묻은 흙을 툭툭 털며 자리에서 일어났어요.",
            "'흥, 저 포도는 분명 시고 맛도 없을 거야. 안 먹길 잘했지 뭐.' 여우는 고개를 빳빳이 들고 그 자리를 떠났어요. 사실은 포도에 손도 대보지 못했으면서 말이에요."
        ],
        moral: "가질 수 없는 걸 억지로 나쁘다고 말하면 잠깐은 마음이 편해질 수 있어요. 하지만 그건 진짜 이유가 아니라 그냥 핑계일 뿐이에요.",
        question: "갖고 싶었지만 못 가진 걸 '사실 별로였어'라고 둘러댄 적이 있나요?"
    },
    {
        num: 3,
        title: "양치기 소년",
        hook: "거짓말을 세 번 하면 생기는 일",
        art: "story-03-wolf-boy.png",
        art2: "story-03-wolf-boy-2.png",
        emoji: "🐺",
        open: [
            "산비탈에서 혼자 양을 치던 소년은 하루하루가 너무 심심했어요. '뭐 재미있는 일 없을까...' 소년은 짓궂은 생각을 떠올렸어요. 그러고는 마을을 향해 목청껏 소리쳤죠. '늑대다! 늑대가 나타났어요!'",
            "마을 사람들이 낫과 몽둥이를 들고 헐레벌떡 산으로 뛰어 올라왔어요. 하지만 늑대는 그림자도 보이지 않았죠. 소년은 배꼽을 잡고 웃었어요. '다들 속았다! 하하하!' 어른들은 얼굴을 붉히며 툴툴대고 마을로 돌아갔어요."
        ],
        close: [
            "그 뒤로도 소년은 심심할 때마다 '늑대다!'를 외쳤고, 마을 사람들은 몇 번이나 헛걸음을 했어요. 그러던 어느 날, 정말로 늑대 한 마리가 수풀 사이에서 스윽 나타났어요! 소년은 새파랗게 질려 목이 터져라 소리쳤어요. '진짜예요! 늑대가 진짜 나타났다고요!'",
            "하지만 마을 사람들은 이번에도 장난인 줄 알고 아무도 올라오지 않았어요. '또 저러네, 신경 쓰지 말자.' 소년은 홀로 양 떼를 지키며 벌벌 떨어야 했답니다. 다행히 마침 지나가던 사냥꾼이 소란을 듣고 도와준 덕분에 큰 사고는 막을 수 있었지만, 소년은 그날 이후 두 번 다시 거짓말을 하지 않았대요."
        ],
        moral: "거짓말을 자꾸 하면, 정작 진실을 말해야 할 때 아무도 믿어주지 않아요. 신뢰는 한 번 무너지면 다시 쌓기 어렵답니다.",
        question: "친구가 자꾸 장난으로 거짓말을 하면, 다음엔 진짜 얘기도 믿기 어려워지지 않을까요?"
    },
    {
        num: 4,
        title: "개미와 베짱이",
        hook: "여름에 놀기만 하면 겨울엔...",
        art: "story-04-ant.png",
        art2: "story-04-ant-2.png",
        emoji: "🐜",
        open: [
            "뜨거운 여름날, 개미들은 땀을 뻘뻘 흘리며 곡식을 창고로 나르고 있었어요. 그 옆 그늘에서는 베짱이가 바이올린을 켜며 노래를 부르고 있었죠. '얘들아, 이 좋은 날씨에 뭘 그렇게 열심히 일해? 나랑 노래나 부르자!'",
            "개미 한 마리가 이마의 땀을 닦으며 대답했어요. '겨울이 오면 먹을 게 없을 텐데, 지금 모아둬야지.' 베짱이는 어깨를 으쓱하며 웃었어요. '겨울은 아직 멀었잖아. 걱정도 팔자다!' 그러고는 다시 신나게 노래를 불렀답니다."
        ],
        close: [
            "계절이 바뀌고 찬바람이 불기 시작하자, 들판의 풀과 곡식은 모두 사라져 버렸어요. 베짱이는 배가 고파 덜덜 떨며 여기저기를 헤맸지만, 먹을 거라곤 아무것도 없었죠. 결국 베짱이는 개미네 집 문을 두드렸어요. '저... 먹을 것 좀 나눠줄 수 있을까?'",
            "개미들은 따뜻한 창고 안에서 여름 내내 모아둔 곡식을 나눠 먹고 있었어요. 개미 한 마리가 문을 열어주며 말했어요. '들어와서 좀 먹어. 대신 다음 여름엔 같이 준비하는 게 어때?' 베짱이는 부끄러운 듯 고개를 끄덕이며 따뜻한 방 안으로 들어갔답니다."
        ],
        moral: "즐거운 오늘도 중요하지만, 다가올 내일을 준비하는 것도 그만큼 중요해요. 미리 준비하면 힘든 날에도 든든하답니다.",
        question: "지금 조금 귀찮아도, 나중을 위해 미리 준비해두면 좋은 일이 있을까요?"
    },
    {
        num: 5,
        title: "늑대와 아기 양",
        hook: "억지 트집엔 끝이 없어요",
        art: "story-05-lamb.png",
        art2: "story-05-lamb-2.png",
        emoji: "🐑",
        open: [
            "목이 마른 아기 양이 시냇물을 마시고 있었어요. 그런데 저 아래쪽에서 늑대 한 마리가 어슬렁어슬렁 다가오더니 괜한 트집을 잡기 시작했어요. '너 지금 내가 마실 물을 흐려놓았지?' 아기 양은 깜짝 놀라 대답했어요. '저는 늑대 아저씨보다 아래쪽에서 물을 마시고 있는걸요. 제가 흐린 물이 아저씨 쪽으로 어떻게 올라가겠어요?'",
            "늑대는 잠시 말문이 막혔지만 곧 다른 트집을 꺼냈어요. '그럼 작년에 네가 내 욕을 하고 다녔다며?' 아기 양은 더 놀라며 말했어요. '저는 태어난 지 이제 겨우 여섯 달밖에 안 됐는걸요. 작년엔 세상에 있지도 않았어요!'"
        ],
        close: [
            "늑대는 슬슬 화가 났어요. 어떤 핑계도 통하지 않았으니까요. '흥, 그럼 네 형이 그랬겠지! 어차피 한통속 아니냐!' 늑대가 으르렁대며 다가오는 순간, 마침 근처에서 양 떼를 지키던 커다란 목양견이 짖으며 달려왔어요. '거기 누구냐!'",
            "깜짝 놀란 늑대는 걸음아 나 살려라 숲속으로 줄행랑을 쳤어요. 아기 양은 가슴을 쓸어내리며 목양견에게 꾸벅 인사했어요. '고맙습니다! 늑대 아저씨는 처음부터 진짜 이유 같은 건 필요 없었나 봐요.'"
        ],
        moral: "누군가를 괴롭히려고 마음먹은 사람은 어떤 그럴듯한 이유든 갖다 붙여요. 억울한 트집에는 차분히 맞서고, 도움을 요청하는 것도 용기랍니다.",
        question: "말도 안 되는 트집을 잡히면 어떻게 침착하게 대응할 수 있을까요?"
    },
    {
        num: 6,
        title: "황금알을 낳는 거위",
        hook: "한 번에 다 가지려다 다 잃은 이야기",
        art: "story-06-goose.png",
        art2: "story-06-goose-2.png",
        emoji: "🥚",
        open: [
            "가난한 농부 부부에게 어느 날 특별한 거위 한 마리가 생겼어요. 글쎄, 이 거위가 매일 아침 반짝이는 황금알을 하나씩 낳는 게 아니겠어요? 부부는 뛸 듯이 기뻐하며 그 알을 팔아 하나둘 살림을 늘려갔어요.",
            "하지만 시간이 지날수록 농부는 조바심이 났어요. '하루에 딱 하나라니, 너무 느려. 이 거위 뱃속에는 분명 황금이 잔뜩 들어있을 거야!' 농부의 눈이 반짝였어요."
        ],
        close: [
            "농부는 아내에게 말했어요. '거위 배를 갈라서 안에 있는 황금을 한 번에 다 꺼내자!' 아내는 말렸지만 농부는 듣지 않았어요. 결국 농부는 도끼를 들고 거위의 배를 가르고 말았어요.",
            "하지만 거위의 배 속에는... 황금 같은 건 하나도 없었어요. 그냥 평범한 거위의 내장뿐이었죠. 농부는 그제야 눈물을 흘리며 후회했어요. 매일 하나씩 얻던 황금알마저 이제 영영 사라지고 말았거든요."
        ],
        moral: "지금 가진 작은 행운에 만족하지 못하고 욕심을 부리면, 가진 것마저 몽땅 잃을 수 있어요. 조급함은 종종 가장 큰 손해를 부른답니다.",
        question: "조금씩 얻는 것에 만족하지 못하고 한 번에 다 가지려다 오히려 손해 본 적이 있나요?"
    },
    {
        num: 7,
        title: "시골 쥐와 도시 쥐",
        hook: "화려한 도시 vs 마음 편한 시골",
        art: "story-07-mice.png",
        art2: "story-07-mice-2.png",
        emoji: "🐭",
        open: [
            "시골에 사는 쥐는 도시에 사는 사촌을 초대해 정성껏 대접했어요. 보리 낟알과 말린 옥수수가 전부였지만, 시골 쥐는 자랑스럽게 내놓았죠. 도시 쥐는 몇 입 먹는 척하다가 코를 찡긋했어요. '음... 이것뿐이야? 이렇게 심심한 음식만 먹고 사는 거야?'",
            "도시 쥐가 말했어요. '나랑 도시로 가자. 거기엔 치즈에, 빵 부스러기에, 맛있는 게 넘쳐난다고!' 호기심이 생긴 시골 쥐는 사촌을 따라 반짝이는 도시로 향했답니다."
        ],
        close: [
            "도시에 도착한 시골 쥐는 눈이 휘둥그레졌어요. 커다란 식탁 위에 정말로 진귀한 음식들이 가득했거든요! 두 쥐가 신나게 치즈를 갉아먹으려는 순간, 갑자기 문이 벌컥 열리며 사람들과 커다란 고양이가 뛰어들었어요! 두 쥐는 화들짝 놀라 벽 틈으로 죽어라 도망쳤어요.",
            "겨우 숨을 돌린 시골 쥐가 헐떡이며 말했어요. '이렇게 마음 졸이며 먹느니, 나는 그냥 소박해도 마음 편한 우리 시골집 보리밥이 낫겠어.' 시골 쥐는 그 길로 짐을 챙겨 조용한 고향으로 돌아갔답니다."
        ],
        moral: "화려하고 풍족해 보여도 늘 불안하다면 진짜 행복이 아니에요. 소박하더라도 마음 편한 것이 더 값진 것일 수 있답니다.",
        question: "화려해 보이지만 사실 마음 편하지 않은 것과, 소박하지만 편안한 것 중 뭐가 더 좋을까요?"
    },
    {
        num: 8,
        title: "사자와 쥐",
        hook: "작은 쥐가 사자를 구할 수 있을까?",
        art: "story-08-lion.png",
        art2: "story-08-lion-2.png",
        emoji: "🦁",
        open: [
            "낮잠을 자던 사자의 코 위로 작은 생쥐 한 마리가 실수로 쪼르르 지나가고 말았어요. 사자는 벌떡 깨어나 화가 나서 앞발로 쥐를 콱 붙잡았죠. '감히 내 잠을 깨워? 오늘 너를 한 입에 삼켜버리겠다!'",
            "생쥐는 벌벌 떨며 애원했어요. '사자님, 제발 살려주세요! 언젠가 제가 이 은혜를 꼭 갚을게요!' 사자는 어이가 없다는 듯 코웃음을 쳤어요. '너 같은 작은 녀석이 나를 어떻게 돕는다는 거야?' 하지만 사자는 피식 웃으며 생쥐를 놓아주었답니다."
        ],
        close: [
            "며칠 뒤, 사자는 사냥꾼이 쳐놓은 튼튼한 그물에 걸리고 말았어요. 아무리 몸부림쳐도 그물은 풀리지 않았고, 사자는 절망스러운 포효를 내질렀어요. 그 소리를 들은 생쥐가 쪼르르 달려왔어요. '사자님, 제가 왔어요!'",
            "생쥐는 작고 날카로운 이빨로 그물의 밧줄을 밤새 갉고 또 갉았어요. 마침내 그물이 툭 끊어지고, 사자는 자유의 몸이 되었답니다. 사자는 생쥐를 내려다보며 말했어요. '작다고 무시해서 미안했다. 네가 내 목숨을 구했구나.'"
        ],
        moral: "아무리 작고 약해 보이는 존재라도 큰 도움을 줄 수 있어요. 베푼 작은 친절은 언젠가 예상치 못한 방식으로 돌아온답니다.",
        question: "작아 보이는 친절이 나중에 큰 도움이 되어 돌아온 적이 있나요?"
    },
    {
        num: 9,
        title: "여우와 까마귀",
        hook: "치즈를 훔친 진짜 방법",
        art: "story-09-crow.png",
        art2: "story-09-crow-2.png",
        emoji: "🐦",
        open: [
            "까마귀 한 마리가 어디선가 먹음직스러운 치즈 한 조각을 물어와 나뭇가지 위에 앉았어요. 마침 배가 고팠던 여우가 그 모습을 발견하고는 나무 아래로 살금살금 다가왔어요. '까마귀님, 오늘따라 깃털이 어쩜 그리 까맣고 윤기가 흐르는지요! 숲에서 제일 아름다우세요.'",
            "까마귀는 우쭐해져서 가슴을 폈어요. 여우는 능청스럽게 말을 이었어요. '목소리도 그렇게 고우시다던데, 한번 들려주실 수 있을까요? 분명 새들의 여왕 같은 목소리일 거예요.'"
        ],
        close: [
            "우쭐해진 까마귀는 자기도 모르게 입을 크게 벌리고 '까악!' 하고 소리를 질렀어요. 그 순간, 물고 있던 치즈가 툭 떨어지고 말았죠! 여우는 잽싸게 치즈를 낚아채고는 씩 웃으며 말했어요. '치즈, 잘 먹을게요. 그리고 하나 알려드리자면... 아부하는 말은 절대 다 믿으면 안 된답니다.'",
            "까마귀는 빈 나뭇가지 위에서 후회막심한 표정을 지었지만, 이미 치즈는 여우의 뱃속으로 사라진 뒤였어요."
        ],
        moral: "달콤한 칭찬 뒤에는 다른 속셈이 숨어있을 때가 있어요. 기분 좋은 말일수록 한 번 더 생각해보는 지혜가 필요하답니다.",
        question: "너무 좋은 칭찬을 들었을 때, 그 말이 진심인지 한 번 더 생각해본 적이 있나요?"
    },
    {
        num: 10,
        title: "북풍과 해님",
        hook: "바람과 햇살, 누가 외투를 벗겼을까",
        art: "story-10-sun.png",
        art2: "story-10-sun-2.png",
        emoji: "☀️",
        open: [
            "북풍과 해님이 서로 자기가 더 힘이 세다고 다투고 있었어요. 마침 길을 걷는 나그네가 두꺼운 외투를 입고 지나가자, 해님이 제안했어요. '저 나그네의 외투를 먼저 벗기는 쪽이 이기는 걸로 하자.'",
            "북풍이 먼저 나섰어요. '식은 죽 먹기지!' 북풍은 있는 힘껏 세찬 바람을 몰아쳤어요. 나뭇가지가 부러질 듯 흔들리고 먼지가 휘몰아쳤죠. 하지만 나그네는 추위에 몸을 웅크리며 외투를 오히려 더 꽁꽁 여몄어요."
        ],
        close: [
            "북풍이 아무리 세게 불어도 나그네는 외투를 벗지 않았어요. 결국 지친 북풍이 물러나자, 이번엔 해님 차례였어요. 해님은 부드럽고 따스한 햇살을 나그네에게 가만히 비춰주었어요.",
            "따뜻한 햇볕이 계속되자 나그네의 이마에 땀이 송글송글 맺혔어요. '아이고, 덥다.' 나그네는 스스로 외투를 훌훌 벗어 팔에 걸쳤답니다. 해님이 부드럽게 미소 지으며 말했어요. '억지로 밀어붙이는 것보다, 따뜻하게 다가가는 게 더 큰 힘을 낼 때도 있단다.'"
        ],
        moral: "강하게 몰아붙인다고 늘 마음을 움직일 수 있는 건 아니에요. 때로는 부드러움이 강함보다 훨씬 큰 힘을 발휘한답니다.",
        question: "억지로 시켜서 될 일과, 부드럽게 다가가야 되는 일은 어떻게 다를까요?"
    },
    {
        num: 11,
        title: "개와 그림자",
        hook: "그림자 속 고기를 탐내다가",
        art: "story-11-dog.png",
        art2: "story-11-dog-2.png",
        emoji: "🐕",
        open: [
            "맛있는 고깃덩어리 하나를 입에 문 개가 신나게 집으로 돌아가고 있었어요. 그런데 길 중간에 놓인 작은 나무다리를 건너던 개는 우연히 아래를 내려다보게 됐어요. 잔잔한 개울물에 자기 모습이 비쳤는데, 입에 문 고기까지 그대로 비쳤죠.",
            "개는 눈을 크게 떴어요. '어라? 물속에도 고기를 문 개가 있잖아? 저건 내 것보다 더 커 보이는데!' 개는 그 그림자 속 고기가 진짜인 줄로만 알았답니다."
        ],
        close: [
            "욕심이 난 개는 물속의 고기까지 빼앗아야겠다고 마음먹었어요. '왈!' 개는 크게 짖으며 물속의 개를 향해 이빨을 드러냈어요. 그 순간, 입이 쩍 벌어지면서 물고 있던 진짜 고깃덩어리가 풍덩! 개울물 속으로 떨어지고 말았어요.",
            "물살에 고기가 둥둥 떠내려가는 걸 멍하니 바라보던 개는 그제야 깨달았어요. 물속의 개는 그저 자기 자신의 그림자였다는 것을요. 개는 빈 입으로 축 처진 채 터덜터덜 집으로 돌아가야 했답니다."
        ],
        moral: "더 큰 걸 욕심내다가 지금 가진 소중한 것까지 잃어버릴 수 있어요. 눈앞의 것에 만족할 줄 아는 것도 지혜랍니다.",
        question: "더 좋아 보이는 걸 욕심내다가 원래 가지고 있던 걸 놓친 적이 있나요?"
    },
    {
        num: 12,
        title: "박쥐의 두 얼굴",
        hook: "양쪽 다 편들다 양쪽에서 버림받은 이야기",
        art: "story-12-bat.png",
        art2: "story-12-bat-2.png",
        emoji: "🦇",
        open: [
            "오래전, 새들의 나라와 짐승들의 나라 사이에 큰 전쟁이 벌어졌어요. 박쥐는 어느 편에 서야 유리할지 눈치를 살폈어요. 처음엔 새들이 이길 것 같아 보이자 박쥐는 날개를 펼치며 새들에게 다가갔어요. '저도 날개가 있으니 새랍니다! 저를 새 편으로 받아주세요.'",
            "그런데 얼마 뒤 전세가 뒤집혀 짐승들이 우세해지자, 박쥐는 재빨리 말을 바꿨어요. 이빨을 드러내고 짐승들에게 달려가 말했죠. '저는 털도 있고 이빨도 있으니 짐승이랍니다! 저를 짐승 편으로 받아주세요.'"
        ],
        close: [
            "결국 전쟁이 끝나고 새들과 짐승들이 화해했어요. 그런데 화해 축하 잔치에서 박쥐가 슬쩍 끼어들려 하자, 새도 짐승도 모두 등을 돌렸어요. 새들이 말했어요. '너는 우리가 불리할 때 짐승 편에 붙었잖아.' 짐승들도 고개를 저었어요. '너는 우리가 불리할 때 새 편에 붙었잖아.'",
            "결국 박쥐는 어느 쪽에도 끼지 못하고 쓸쓸히 동굴 속으로 숨어들었어요. 그날 이후로 박쥐는 낮에는 아무도 만나지 않고, 아무도 없는 깜깜한 밤에만 조용히 날아다니게 되었답니다."
        ],
        moral: "상황에 따라 이쪽저쪽 말을 바꾸며 이익만 챙기려 하면, 결국 어느 쪽에서도 진짜 친구가 되지 못해요. 신의를 지키는 게 결국 나를 지켜준답니다.",
        question: "상황이 유리한 쪽으로만 말을 바꾸는 사람을 보면 어떤 생각이 드나요?"
    }
];

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
                ${artFrame('cover.png', '🦊')}
            </div>
            <div class="story-page-right">
                <h1>이솝 이야기</h1>
                <p class="cover-tag">지혜를 배우는 열두 가지 이야기</p>
                <p>아주 먼 옛날, 고대 그리스에 이솝이라는 사람이 살았대요. 그는 동물들을 주인공으로 삼아 짧지만 깊은 뜻이 담긴 이야기를 많이 남겼어요. 그게 바로 '이솝 우화'랍니다.</p>
                <p>이솝 이야기 속에는 꾀 많은 여우, 부지런한 개미, 느긋한 거북이처럼 친숙한 동물 친구들이 등장해요. 이야기 끝에는 늘 살면서 기억해두면 좋을 지혜 한 조각이 남아요.</p>
                <p>이천 년도 더 된 이야기인데 지금 읽어도 여전히 도움이 돼요. 이 책에는 그중 가장 사랑받는 열두 가지를 담았어요.</p>
            </div>
        </div>`;
}

function tocPage() {
    const itemHtml = s => `
        <li>
            <button type="button" data-goto="${s.num}">
                <span class="toc-num">${s.num}</span>
                <span>
                    <strong>${s.title}</strong>
                    <small>${s.hook}</small>
                </span>
            </button>
        </li>`;
    const quizItemHtml = `
        <li>
            <button type="button" data-goto-kind="quiz">
                <span class="toc-num">❓</span>
                <span>
                    <strong>이야기 문제</strong>
                    <small>다 읽고 나서 확인해봐요</small>
                </span>
            </button>
        </li>`;
    const half = Math.ceil(STORIES.length / 2);
    const leftItems = STORIES.slice(0, half).map(itemHtml).join('');
    const rightItems = STORIES.slice(half).map(itemHtml).join('') + quizItemHtml;
    return `
        <div class="page page-toc">
            <div class="story-page-left">
                <h2>차례</h2>
                <ul class="toc-list">${leftItems}</ul>
            </div>
            <div class="story-page-right">
                <ul class="toc-list">${rightItems}</ul>
            </div>
        </div>`;
}

function storyMedia(story, artFile, caption) {
    const captionHtml = caption ? `<div class="art-caption">${caption}</div>` : '';
    return `
        <div class="story-media">
            ${captionHtml}
            ${artFrame(artFile, story.emoji)}
        </div>`;
}

function storyOpenPage(story) {
    const paras = story.open.map(p => `<p>${p}</p>`).join('');
    return `
        <div class="page page-story">
            <div class="story-page-left">
                <h2>${story.title}</h2>
                ${paras}
            </div>
            <div class="story-page-right story-page-right-image">
                ${storyMedia(story, story.art, '')}
            </div>
        </div>`;
}

function storyClosePage(story, closeParas) {
    const paras = closeParas.map(p => `<p>${p}</p>`).join('');
    return `
        <div class="page page-story">
            <div class="story-page-left">
                ${paras}
            </div>
            <div class="story-page-right">
                ${storyMedia(story, story.art2, `${story.title} · 결말`)}
                <div class="moral-box">
                    <strong>생각해봐요</strong>
                    <p>${story.moral}</p>
                    <p style="margin-top:6px;font-style:italic;">${story.question}</p>
                </div>
            </div>
        </div>`;
}

function storyExtraArt(story) {
    return story.art2.replace(/-2(\.\w+)$/, '-3$1');
}

function storyExtraPage(story, paras) {
    const html = paras.map(p => `<p>${p}</p>`).join('');
    return `
        <div class="page page-story">
            <div class="story-page-left">
                ${html}
            </div>
            <div class="story-page-right">
                ${storyMedia(story, storyExtraArt(story), story.title)}
            </div>
        </div>`;
}

const CLOSE_SPLIT_THRESHOLD = 480;

function storyPageEntries(story) {
    const closeLen = story.close.reduce((sum, p) => sum + p.length, 0);
    if (closeLen > CLOSE_SPLIT_THRESHOLD && story.close.length >= 2) {
        const mid = Math.ceil(story.close.length / 2);
        return [
            { kind: 'story-open', story },
            { kind: 'story-extra', story, paras: story.close.slice(0, mid) },
            { kind: 'story-close', story, paras: story.close.slice(mid) }
        ];
    }
    return [
        { kind: 'story-open', story },
        { kind: 'story-close', story, paras: story.close }
    ];
}

const QUIZ = [
    { q: "경주에서 결국 누가 이겼나요?", choices: ["토끼", "거북이", "무승부"], answer: 1 },
    { q: "여우는 포도를 못 따자 뭐라고 말했나요?", choices: ["다시 오면 되겠다", "저 포도는 실 것이다", "포기하지 않겠다"], answer: 1 },
    { q: "소년이 거짓말을 반복한 결과 무슨 일이 생겼나요?", choices: ["마을 사람이 칭찬했다", "아무도 믿어주지 않았다", "양이 더 늘어났다"], answer: 1 },
    { q: "겨울이 되자 베짱이는 어떻게 됐나요?", choices: ["여전히 노래 불렀다", "개미를 찾아가 빌었다", "스스로 먹이 구했다"], answer: 1 },
    { q: "누가 나타나 아기 양을 구해주었나요?", choices: ["사냥꾼", "목양견", "다른 늑대"], answer: 1 },
    { q: "농부가 거위 배를 가르자 무엇이 있었나요?", choices: ["황금이 가득했다", "아무것도 없었다", "그냥 평범한 내장"], answer: 2 },
    { q: "시골 쥐는 결국 어디로 돌아갔나요?", choices: ["도시", "시골", "새로운 곳"], answer: 1 },
    { q: "생쥐는 사자를 어떻게 구했나요?", choices: ["그물을 갉아 끊었다", "사람을 불러왔다", "힘으로 그물 찢었다"], answer: 0 },
    { q: "까마귀가 노래를 부르자 어떤 일이 벌어졌나요?", choices: ["치즈가 떨어졌다", "여우가 도망갔다", "새들이 몰려왔다"], answer: 0 },
    { q: "나그네의 외투를 벗긴 건 누구였나요?", choices: ["북풍", "해님", "둘 다"], answer: 1 },
    { q: "개가 짖자 어떤 일이 일어났나요?", choices: ["그림자만 남았다", "고기를 놓쳐버렸다", "고기가 두 배 됐다"], answer: 1 },
    { q: "전쟁이 끝난 후 박쥐는 어떻게 됐나요?", choices: ["새들과 다시 어울렸다", "짐승들과 다시 어울렸다", "둘 다에게 외면당했다"], answer: 2 }
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
            ${artFrame('end.png', '🌟')}
            <h2>열두 가지 이야기를 모두 읽었어요!</h2>
            <a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a>
        </div>`;
}

const PAGES = [
    { kind: 'cover' },
    { kind: 'toc' },
    ...STORIES.flatMap(storyPageEntries),
    { kind: 'quiz' },
    { kind: 'end' }
];

const TWO_PAGE_KINDS = new Set(['story-open', 'story-close', 'story-extra', 'toc', 'cover']);

let folioCounter = 0;
const FOLIOS = PAGES.map(p => {
    const width = TWO_PAGE_KINDS.has(p.kind) ? 2 : 1;
    const start = folioCounter + 1;
    folioCounter += width;
    return { start, width };
});

function renderPage(page) {
    switch (page.kind) {
        case 'cover':
            return coverPage();
        case 'toc':
            return tocPage();
        case 'story-open':
            return storyOpenPage(page.story);
        case 'story-extra':
            return storyExtraPage(page.story, page.paras);
        case 'story-close':
            return storyClosePage(page.story, page.paras);
        case 'quiz':
            return quizPage();
        case 'end':
            return endPage();
        default:
            return '';
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
    if (folio.width === 2) {
        folioLeftEl.textContent = folio.start;
        folioRightEl.textContent = folio.start + 1;
        folioLeftEl.hidden = false;
        folioRightEl.hidden = false;
    } else {
        folioLeftEl.textContent = folio.start;
        folioLeftEl.hidden = false;
        folioRightEl.hidden = true;
    }

    spreadEl.querySelectorAll('[data-goto]').forEach(btn => {
        btn.addEventListener('click', () => {
            const storyNum = Number(btn.dataset.goto);
            const idx = PAGES.findIndex(p => p.kind === 'story-open' && p.story.num === storyNum);
            if (idx >= 0) goTo(idx);
        });
    });
    spreadEl.querySelectorAll('[data-goto-kind]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = PAGES.findIndex(p => p.kind === btn.dataset.gotoKind);
            if (idx >= 0) goTo(idx);
        });
    });

    if (PAGES[current].kind === 'quiz') {
        initQuiz();
    }
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
