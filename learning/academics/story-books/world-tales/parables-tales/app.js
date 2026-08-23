const STORIES = [
    {
        num: 1,
        title: "값비싼 진주",
        hook: "정말 소중한 걸 위해 다 내려놓을 수 있을까?",
        art: "story-01-pearl.png",
        art2: "story-01-pearl-2.png",
        emoji: "💎",
        open: [
            "어느 마을에 진주를 감정하는 눈이 남달리 좋은 상인이 있었어요. 그는 세상에서 제일 아름다운 진주를 찾아 이 나라 저 나라를 떠돌아다녔죠. 좋은 진주를 보면 살 형편이 안 돼도 눈을 떼지 못했고, 시시한 진주는 아무리 싸도 쳐다보지 않았어요.",
            "그러던 어느 날, 낯선 항구 마을의 허름한 좌판에서 상인은 숨이 멎을 뻔했어요. 지금껏 본 적 없는, 달빛을 그대로 굳혀놓은 것 같은 진주 한 알이 놓여 있었거든요. '이거다. 평생 찾던 게 바로 이거야.'"
        ],
        close: [
            "상인은 그 자리에서 값을 물었어요. 좌판 주인이 부른 값은 상인이 가진 전 재산을 다 합쳐도 모자랄 만큼 엄청났어요. 상인은 며칠을 고민하지 않았어요. 집도 팔고, 배도 팔고, 지금까지 모아온 다른 보석들도 전부 팔았어요.",
            "사람들은 혀를 찼어요. '전 재산을 진주 한 알에 걸다니, 제정신이야?' 하지만 상인은 그 진주를 손에 쥔 순간, 후회는커녕 세상을 다 가진 듯한 표정을 지었답니다. 그에게는 그럴 만한 가치가 있는 단 하나였으니까요."
        ],
        moral: "정말 소중한 걸 알아본 사람은, 그걸 위해 나머지를 미련 없이 내려놓을 수 있어요. 무엇을 가장 소중히 여기는지가 결국 그 사람의 선택을 결정한답니다.",
        question: "나에게 그 무엇과도 안 바꿀 만큼 소중한 건 무엇인가요?"
    },
    {
        num: 2,
        title: "착한 사마리아인",
        hook: "누가 정말로 이웃이 되어주었을까?",
        art: "story-02-samaritan.png",
        art2: "story-02-samaritan-2.png",
        emoji: "🩹",
        open: [
            "어느 날 한 나그네가 예루살렘에서 여리고로 가는 험한 산길을 홀로 걷고 있었어요. 그런데 갑자기 강도들이 나타나 나그네를 흠씬 두들겨 패고, 가진 것을 몽땅 빼앗은 뒤 길가에 버려두고 사라졌어요. 나그네는 피투성이가 된 채 정신을 잃고 쓰러져 있었답니다.",
            "잠시 후, 마침 그 길을 지나던 한 제사장이 쓰러진 나그네를 발견했어요. 하지만 제사장은 흘깃 보고는 길 반대편으로 슬쩍 비켜 지나가 버렸어요. 얼마 뒤엔 성전에서 일하는 사람도 지나갔지만, 그 역시 눈길만 주고는 그냥 가버렸죠."
        ],
        close: [
            "그렇게 얼마나 시간이 흘렀을까, 마침내 한 사마리아 사람이 그 길을 지나가게 됐어요. 사마리아 사람들은 그 지역에서 흔히 무시당하고 손가락질받는 처지였어요. 하지만 그는 쓰러진 나그네를 보자마자 망설임 없이 다가가 상처를 정성껏 싸매주었어요.",
            "사마리아 사람은 나그네를 자기 나귀에 태워 가까운 여관까지 데려간 뒤, 여관 주인에게 돈을 넉넉히 주며 부탁했어요. '이 사람을 잘 돌봐주세요. 부족하면 제가 돌아올 때 더 드리겠습니다.' 정작 도와줄 거라 여겨졌던 사람들은 지나쳤고, 무시당하던 이가 나그네를 살렸답니다."
        ],
        moral: "누군가를 진짜로 돕는 사람은, 겉모습이나 신분이 아니라 그 순간 멈춰 서서 손을 내미는 사람이에요. 도움은 자격이 아니라 마음에서 나온답니다.",
        question: "지나칠 뻔했지만 멈춰서 도와준 적이 있나요? 아니면 반대로, 도와줬어야 했는데 그냥 지나친 적은요?"
    },
    {
        num: 3,
        title: "한밤중에 빵을 빌리러 온 친구",
        hook: "끈질기게 두드리면 정말 열릴까?",
        art: "story-03-friend.png",
        art2: "story-03-friend-2.png",
        emoji: "🍞",
        open: [
            "깊은 밤, 한 사람이 다급하게 친구네 집 대문을 두드렸어요. '여보게, 자고 있나? 나 좀 도와줘!' 알고 보니 먼 길을 오던 손님이 갑자기 찾아왔는데, 집에 대접할 빵이 하나도 없었던 거예요. 그는 어쩔 줄 몰라 하다가 한밤중에 친구네 집까지 달려온 참이었어요.",
            "친구는 침대에서 부스스 일어나 짜증 섞인 목소리로 소리쳤어요. '지금 몇 신 줄 알아? 문도 이미 다 잠겼고, 애들이랑 나도 다 누웠는데 이 시간에 무슨 빵이야. 그냥 좀 가주게.'"
        ],
        close: [
            "하지만 문밖의 친구는 포기하지 않았어요. '미안하지만 정말 급해서 그래. 딱 세 덩이만 빌려주게!' 그는 계속, 계속 문을 두드렸어요. 이웃이 다 깰 정도로 끈질기게 졸라댔죠.",
            "결국 친구는 두 손 두 발 다 들었어요. '아이고, 알겠다, 알겠어!' 친구는 단지 미안해서가 아니라, 저렇게까지 끈질기게 조르니 도저히 못 이기고 자리에서 일어나 빵을 챙겨줬답니다. 문밖의 친구는 결국 원하던 빵을 손에 들고 환하게 웃으며 돌아갔어요."
        ],
        moral: "부끄러워하지 않고 끝까지 두드리는 사람은, 결국 원하는 걸 얻어내요. 정중하게 포기하지 않는 것도 때로는 큰 힘이 된답니다.",
        question: "부탁하기 부끄러워서 포기했는데, 사실 조금만 더 졸랐으면 됐을 것 같은 적이 있나요?"
    },
    {
        num: 4,
        title: "되찾은 은전 한 닢",
        hook: "작은 것 하나에도 이렇게 기뻐할 수 있을까?",
        art: "story-04-coin.png",
        art2: "story-04-coin-2.png",
        emoji: "🪙",
        open: [
            "한 여인에게는 소중히 간직해온 은전 열 닢이 있었어요. 그런데 어느 날 세어보니 아홉 닢뿐이었죠. '어라? 하나가 어디 갔지?' 여인은 화들짝 놀라 온 집안을 살피기 시작했어요.",
            "여인은 등불을 켜고 방 구석구석을 쓸기 시작했어요. 침대 밑도 들여다보고, 항아리 뒤편도 뒤지고, 마루 틈까지 샅샅이 살폈어요. 겨우 은전 한 닢이었지만, 여인에게는 절대 포기할 수 없는 소중한 것이었답니다."
        ],
        close: [
            "한참을 찾아 헤매던 여인은 마침내 방구석 어두운 틈에서 반짝이는 은전을 발견했어요! '찾았다!' 여인은 뛸 듯이 기뻐하며 이웃들을 불러 모았어요. '제가 잃어버렸던 은전을 찾았어요! 우리 같이 기뻐해요!'",
            "이웃들은 은전 한 닢에 이렇게까지 기뻐하는 여인을 보며 미소 지었어요. 여인에게 중요했던 건 은전의 값어치만이 아니라, 자기 것을 하나도 잃어버리지 않겠다는 마음이었으니까요."
        ],
        moral: "아무리 작은 것이라도 소중히 여기는 사람은 그것을 잃었을 때 끝까지 찾아 나서요. 그리고 되찾았을 때의 기쁨은 그 정성만큼이나 크답니다.",
        question: "작지만 나에게 소중한 걸 잃어버렸다가 다시 찾은 적이 있나요? 그때 기분이 어땠나요?"
    },
    {
        num: 5,
        title: "반석 위에 지은 집",
        hook: "폭풍이 몰아치면 어떤 집이 버틸까?",
        art: "story-05-house.png",
        art2: "story-05-house-2.png",
        emoji: "🏠",
        open: [
            "두 사람이 각자 살 집을 짓기로 했어요. 한 사람은 서두르는 마음에 손쉬운 모래밭 위에 집을 뚝딱 지었어요. 모래는 파기도 쉽고 평평해서 일이 훨씬 빨리 끝났거든요. '역시 요령이 최고지.' 그는 흡족해하며 새집으로 이사했답니다.",
            "다른 한 사람은 달랐어요. 그는 땅을 깊이깊이 파 내려가 단단한 바위, 즉 반석을 찾아낼 때까지 멈추지 않았어요. 이웃들은 고개를 저었죠. '그렇게까지 힘들게 지을 필요가 있나? 시간 낭비 아니야?'"
        ],
        close: [
            "몇 달 뒤, 거센 폭풍우가 마을을 덮쳤어요. 비바람이 몰아치고 강물이 넘쳐흘렀죠. 모래 위에 지은 집은 순식간에 기우뚱하더니, 결국 와르르 무너져 내리고 말았어요. 집주인은 넋을 잃고 그 자리에 주저앉았어요.",
            "하지만 반석 위에 지은 집은 그 무서운 폭풍 속에서도 흔들림 없이 우뚝 서 있었어요. 그 집 주인은 창밖으로 몰아치는 비바람을 바라보며 조용히 말했답니다. '처음엔 힘들었지만, 제대로 다져두길 잘했구나.'"
        ],
        moral: "무슨 일이든 눈에 보이는 빠른 결과보다, 시간이 걸려도 튼튼한 기초를 다지는 게 중요해요. 진짜 위기가 닥쳤을 때 그 차이가 드러난답니다.",
        question: "당장은 힘들어도 제대로 기초를 다져두면 좋은 일에는 뭐가 있을까요?"
    },
    {
        num: 6,
        title: "포도원 일꾼들의 품삯",
        hook: "한 시간 일해도 똑같이 받을 수 있을까?",
        art: "story-06-vineyard.png",
        art2: "story-06-vineyard-2.png",
        emoji: "🍇",
        open: [
            "어느 포도원 주인이 이른 아침, 시장에 나가 일꾼들을 구했어요. '하루 품삯으로 은화 한 닢을 주겠소.' 일꾼들은 흔쾌히 따라나섰어요. 그런데 주인은 낮 열두 시에도, 오후 세 시에도, 심지어 해 지기 한 시간 전에도 다시 시장에 나가 놀고 있는 사람들을 불러 모았어요. '자네들도 포도원에 가서 일해주게.'",
            "저녁이 되어 일이 끝나자, 주인은 모든 일꾼을 불러 품삯을 나눠주기 시작했어요. 놀랍게도 딱 한 시간 일한 사람에게도 아침부터 일한 사람과 똑같이 은화 한 닢을 주었답니다."
        ],
        close: [
            "아침부터 뙤약볕 아래서 종일 땀 흘린 일꾼들은 눈이 휘둥그레졌어요. '한 시간 일한 사람이랑 우리랑 품삯이 똑같다고요?' 그들은 투덜거리며 주인에게 따졌어요. '이건 불공평합니다!'",
            "주인은 차분하게 대답했어요. '내가 자네들과 약속한 품삯을 주지 않았나? 내 것을 내가 원하는 만큼 나눠주는 게 어째서 불공평한가? 자네들이 속상한 건, 내가 다른 이들에게도 후하게 대했기 때문 아닌가?' 일꾼들은 아무 말도 하지 못했답니다."
        ],
        moral: "누군가에게 후하게 베푸는 게, 나에게 손해가 되는 건 아니에요. 남과 비교하기 시작하면, 내가 이미 받은 것에 감사하는 마음을 잃기 쉽답니다.",
        question: "남이 나보다 더 많이 받은 것 같아서 속상했는데, 사실 나도 약속받은 걸 다 받았던 적이 있나요?"
    },
    {
        num: 7,
        title: "돌아온 둘째 아들",
        hook: "떠났던 아들이 돌아오면 어떻게 맞이해야 할까?",
        art: "story-07-son.png",
        art2: "story-07-son-2.png",
        emoji: "🤲",
        open: [
            "어느 부잣집에 아들 둘이 있었어요. 어느 날 둘째 아들이 아버지에게 말했어요. '아버지, 제 몫의 재산을 지금 주세요.' 아버지는 순순히 재산을 나눠주었고, 둘째 아들은 얼마 지나지 않아 짐을 싸서 먼 나라로 훌쩍 떠나버렸어요.",
            "둘째 아들은 낯선 도시에서 흥청망청 돈을 써댔어요. 친구도 많이 사귀고 매일 잔치를 벌였죠. 하지만 돈은 금세 바닥났고, 설상가상으로 그 나라에 큰 흉년까지 들었어요. 결국 그는 남의 집 돼지를 치는 신세로 전락해, 돼지 먹이라도 나눠 먹고 싶을 만큼 배를 곯게 되었답니다."
        ],
        close: [
            "둘째 아들은 문득 정신이 들었어요. '아버지 집 일꾼들도 나보다 훨씬 잘 먹고 사는데…… 차라리 돌아가서 용서를 빌자. 아들이라 부를 자격은 없지만, 일꾼으로라도 써달라고 하자.' 그는 무거운 발걸음으로 고향을 향해 걷기 시작했어요.",
            "그런데 저 멀리서 아들을 알아본 아버지가 버선발로 달려나왔어요. 아버지는 아들을 와락 끌어안고는 큰 잔치를 열라고 명령했어요. 이해할 수 없다는 큰아들에게 아버지는 말했답니다. '네 동생은 죽었다가 다시 살아난 것과 같고, 잃었다가 다시 찾은 것과 같으니 어찌 기뻐하지 않을 수 있겠니.'"
        ],
        moral: "누군가 잘못을 뉘우치고 돌아왔을 때, 따지기보다 먼저 반겨주는 마음이야말로 가장 큰 사랑이에요. 늦었더라도 돌아오는 걸음은 언제나 환영받을 자격이 있답니다.",
        question: "누군가 실수를 인정하고 다시 다가왔을 때, 나는 어떻게 맞아줄 수 있을까요?"
    },
    {
        num: 8,
        title: "가라지 씨앗",
        hook: "지금 뽑아야 할까, 기다려야 할까?",
        art: "story-08-weeds.png",
        art2: "story-08-weeds-2.png",
        emoji: "🌾",
        open: [
            "어느 농부가 정성껏 밭을 갈아 좋은 밀 씨앗을 뿌렸어요. 싹이 나기를 기다리며 매일 밭을 살폈죠. 그런데 밤사이, 농부와 사이가 나쁜 이웃이 몰래 밭에 숨어들어 밀과 비슷하게 생긴 잡초, 가라지 씨앗을 잔뜩 뿌리고 사라졌어요.",
            "며칠 뒤 싹이 자라기 시작하자, 일꾼들이 화들짝 놀라 농부에게 달려왔어요. '주인님, 밭에 이상한 잡초가 밀이랑 섞여서 자라고 있어요! 지금 당장 뽑아버릴까요?'"
        ],
        close: [
            "농부는 고개를 저었어요. '지금 뽑았다간 뿌리가 엉켜서 애써 심은 밀까지 같이 뽑힐 거야. 추수 때까지 그냥 함께 자라게 두어라. 그때 가서 밀은 곳간에 거두고, 가라지는 따로 모아 태워버리면 된다.'",
            "일꾼들은 처음엔 답답해했지만, 추수철이 되자 농부의 말이 옳았다는 걸 깨달았어요. 가라지와 밀을 뒤섞어 서둘러 뽑았다면 애써 기른 밀까지 잃었을 테니까요. 기다림 끝에 농부는 알곡만 온전히 거둘 수 있었답니다."
        ],
        moral: "당장 눈에 거슬리는 걸 성급하게 없애려다, 오히려 소중한 걸 함께 잃을 수 있어요. 때로는 옳고 그름을 가려낼 적절한 때를 기다리는 것도 지혜랍니다.",
        question: "성급하게 결론 내리기보다 좀 더 기다려봐야 했던 적이 있나요?"
    },
    {
        num: 9,
        title: "땅에 묻은 한 달란트",
        hook: "받은 걸 땅에 묻어두면 무슨 일이 벌어질까?",
        art: "story-09-talent.png",
        art2: "story-09-talent-2.png",
        emoji: "💰",
        open: [
            "먼 길을 떠나야 했던 주인이 종 세 명을 불러 재산을 맡겼어요. 첫째 종에게는 다섯 달란트, 둘째 종에게는 두 달란트, 셋째 종에게는 한 달란트를 주며 말했어요. '내가 돌아올 때까지 이걸로 잘 꾸려보게.'",
            "첫째와 둘째 종은 곧바로 그 돈을 밑천 삼아 장사를 시작했어요. 부지런히 뛰어다니며 물건을 사고팔았죠. 하지만 셋째 종은 겁이 났어요. '괜히 잘못 굴렸다가 다 잃으면 어떡하지?' 그는 받은 한 달란트를 그대로 땅속 깊이 파묻어 버렸어요."
        ],
        close: [
            "오랜 시간이 지나 주인이 돌아왔어요. 첫째 종은 다섯 달란트를 열 달란트로, 둘째 종은 두 달란트를 네 달란트로 불려서 가져왔어요. 주인은 크게 기뻐하며 두 사람을 칭찬했답니다.",
            "셋째 종의 차례가 되자, 그는 땅속에서 파낸 달란트를 그대로 내밀며 말했어요. '혹시 잃어버릴까 봐 고이 묻어뒀습니다. 여기 그대로 있습니다.' 하지만 주인은 기뻐하기는커녕 크게 꾸짖었어요. '차라리 은행에라도 맡겼으면 이자라도 붙었을 것을! 두려움 때문에 아무것도 하지 않은 게 문제였다.'"
        ],
        moral: "가진 재능이나 기회를 잃을까 봐 아예 안 써버리면, 결국 그대로 썩혀버리는 것과 같아요. 실패를 두려워해 아무것도 안 하는 것보다, 써보고 키워나가는 용기가 더 값지답니다.",
        question: "실패가 두려워서 아예 시도조차 안 해본 일이 있나요?"
    },
    {
        num: 10,
        title: "끈질긴 과부",
        hook: "포기하지 않으면 정말 마음을 움직일 수 있을까?",
        art: "story-10-widow.png",
        art2: "story-10-widow-2.png",
        emoji: "⚖️",
        open: [
            "어느 마을에 아무도 두려워하지 않는 고약한 재판관이 살았어요. 그런데 그 마을에는 억울한 일을 당한 과부가 한 명 있었죠. 과부는 재판관을 찾아가 애원했어요. '제발 제 억울함을 풀어주세요!' 하지만 재판관은 귀찮다는 듯 그녀를 매번 그냥 돌려보냈어요.",
            "과부는 포기하지 않았어요. 다음 날도, 그다음 날도 재판관을 찾아가 똑같이 부탁했어요. '제발 제 사정을 좀 들어주세요.' 재판관은 매번 짜증을 내며 거절했지만, 과부는 아랑곳하지 않고 계속 찾아왔답니다."
        ],
        close: [
            "결국 재판관은 두 손을 들고 말았어요. '내가 아무도 두렵지 않지만, 이 여자가 하도 귀찮게 굴어서 도저히 못 버티겠구나. 차라리 이 사람의 억울함을 풀어줘서 더는 안 찾아오게 해야겠다.'",
            "재판관은 결국 과부의 손을 들어주었어요. 마을 사람들은 그 소식을 듣고 놀라워했어요. 그렇게 매정하던 재판관마저 움직인 건, 다름 아닌 과부의 끈질긴 마음이었으니까요."
        ],
        moral: "당장 응답이 없어도 포기하지 않고 계속 구하는 마음은, 결국 가장 완고한 상대의 마음까지도 움직일 수 있어요. 끈기는 그 자체로 힘이 된답니다.",
        question: "당장 안 될 것 같아도 포기하지 않고 계속 시도해서 결국 이뤄낸 적이 있나요?"
    },
    {
        num: 11,
        title: "영리한 청지기",
        hook: "쫓겨나기 직전, 그는 무슨 꾀를 냈을까?",
        art: "story-11-steward.png",
        art2: "story-11-steward-2.png",
        emoji: "📜",
        open: [
            "어느 부자에게 재산을 관리하는 청지기가 있었어요. 그런데 이 청지기가 재산을 함부로 낭비한다는 소문이 부자의 귀에 들어갔어요. 부자는 청지기를 불러 말했어요. '자네 소문이 사실인가? 더 이상은 자네에게 일을 맡길 수 없으니, 장부를 정리해서 가져오게.'",
            "쫓겨날 위기에 처한 청지기는 머리를 굴리기 시작했어요. '이제 일자리도 없고, 몸 쓰는 일은 자신 없고, 구걸하기는 부끄럽고…… 어떻게 해야 앞날을 대비할 수 있을까?'"
        ],
        close: [
            "청지기는 묘안을 떠올렸어요. 그는 주인에게 빚진 사람들을 하나씩 몰래 불러 물었어요. '자네가 얼마를 빚졌지?' '기름 백 말입니다.' '그럼 장부에 쉰 말이라고 적게.' 이런 식으로 청지기는 빚진 사람들의 부담을 이것저것 깎아주었어요.",
            "훗날 이 사실을 알게 된 주인은 뜻밖에도 청지기의 영리함에 감탄했어요. 청지기는 당장의 이익 대신, 훗날 자신이 도움받을 인맥을 미리 만들어둔 거였거든요. 눈앞의 위기 속에서도 앞날을 내다본 그 재치가 사람들 입에 오르내렸답니다."
        ],
        moral: "위기가 닥쳤을 때, 당장의 손해에만 매달리기보다 앞날을 내다보고 준비하는 지혜가 필요해요. 어려운 상황일수록 머리를 써야 할 때랍니다.",
        question: "당장은 손해 같아도, 나중을 생각하면 현명한 선택이었던 경우가 있을까요?"
    },
    {
        num: 12,
        title: "용서할 줄 모르는 종",
        hook: "큰 빚을 탕감받은 사람은 어떻게 행동했을까?",
        art: "story-12-servant.png",
        art2: "story-12-servant-2.png",
        emoji: "⛓️",
        open: [
            "어느 임금이 신하들의 빚을 정산하기로 했어요. 그중 한 신하는 도저히 갚을 수 없는 어마어마한 빚을 지고 있었어요. 임금이 '가족까지 다 팔아서라도 갚아라' 하자, 신하는 무릎을 꿇고 애원했어요. '제발 시간을 좀 주십시오. 반드시 다 갚겠습니다.'",
            "그 모습이 안쓰러웠던 임금은 놀랍게도 그 큰 빚을 통째로 탕감해 주었어요. '됐다, 그 빚은 없던 걸로 하마.' 신하는 뛸 듯이 기뻐하며 궁을 나섰답니다."
        ],
        close: [
            "그런데 궁을 나서던 신하는 마침 자신에게 작은 돈을 빚진 동료를 마주쳤어요. 그는 대뜸 동료의 멱살을 잡고 소리쳤어요. '당장 내 돈 갚아!' 동료가 '조금만 시간을 달라'고 사정했지만, 그는 들은 척도 하지 않고 동료를 감옥에 가둬버렸어요.",
            "이 소식을 들은 임금은 크게 노했어요. '내가 너의 그 큰 빚을 다 탕감해 주었는데, 너는 어찌 작은 빚 하나를 그렇게 매정하게 대할 수 있느냐!' 임금은 결국 신하를 다시 불러들여 엄히 꾸짖었답니다."
        ],
        moral: "큰 은혜를 받은 사람일수록, 남에게도 그만한 너그러움을 베풀 줄 알아야 해요. 받은 것만 챙기고 베풀 줄 모르면 결국 자기가 받은 은혜의 의미마저 잃는답니다.",
        question: "누군가에게 큰 도움을 받고도, 다른 사람에게는 야박하게 굴었던 적이 있나요?"
    },
    {
        num: 13,
        title: "포도원을 노린 소작농들",
        hook: "욕심을 부리다 결국 무엇을 잃었을까?",
        art: "story-13-tenants.png",
        art2: "story-13-tenants-2.png",
        emoji: "🍷",
        open: [
            "어느 지주가 포도원을 정성껏 일구고는 소작농들에게 맡기고 먼 길을 떠났어요. 수확철이 되자 지주는 몫을 받으러 종을 보냈어요. 그런데 소작농들은 그 종을 흠씬 두들겨 패서 빈손으로 돌려보냈답니다.",
            "지주는 다시 다른 종을 보냈지만, 이번엔 더 심하게 대접받고 쫓겨났어요. 몇 번을 더 시도해도 결과는 마찬가지였어요. 소작농들은 점점 대담해져서, '이 포도원을 아예 우리 것으로 만들어버리자'는 엉큼한 마음까지 품게 되었죠."
        ],
        close: [
            "결국 지주는 자기 아들을 보내기로 했어요. '내 아들이라면 그래도 존중해 주겠지.' 하지만 소작농들은 오히려 서로 수군거렸어요. '저 아들만 없애면 이 포도원은 완전히 우리 것이 될 거야!' 그들은 아들마저 붙잡아 포도원 밖으로 끌고 나가 해치고 말았어요.",
            "소식을 들은 지주는 크게 분노해 그 소작농들을 모두 내쫓고, 정직하게 몫을 나눌 새로운 사람들에게 포도원을 맡겼답니다. 욕심에 눈이 멀어 은혜를 저버린 이들에게는, 결국 그 욕심조차 허락되지 않았던 거예요."
        ],
        moral: "맡겨진 것을 자기 것인 양 욕심내다 보면, 결국 그 자리마저 잃게 돼요. 내게 주어진 몫에 감사하며 정직하게 지키는 것이 진짜 지혜랍니다.",
        question: "맡겨진 것을 내 것처럼 여기고 욕심부리고 싶었던 적이 있나요?"
    },
    {
        num: 14,
        title: "기름을 준비한 다섯 처녀",
        hook: "기름을 안 챙긴 사람들은 어떻게 됐을까?",
        art: "story-14-lamps.png",
        art2: "story-14-lamps-2.png",
        emoji: "🪔",
        open: [
            "열 명의 처녀가 신랑을 맞이하러 등불을 들고 기다리고 있었어요. 그중 다섯은 지혜로워서 등불용 기름을 넉넉히 여분으로 챙겨왔고, 나머지 다섯은 어리석게도 당장 쓸 기름만 딱 들고 왔답니다.",
            "그런데 신랑이 좀처럼 오지 않았어요. 기다림이 길어지자 열 명 모두 꾸벅꾸벅 졸다가 잠이 들어버렸어요. 그러다 한밤중에 외침이 들렸어요. '신랑이 온다! 어서 나가서 맞이하라!'"
        ],
        close: [
            "화들짝 깬 처녀들이 등불을 정비하는데, 어리석은 다섯은 기름이 다 떨어져 있었어요. '기름 좀 나눠줘!' 하지만 지혜로운 다섯은 고개를 저었어요. '나눠주면 우리도 모자라. 가서 사 오는 게 낫겠어.' 어리석은 다섯은 기름을 사러 급히 달려갔어요.",
            "그사이 신랑이 도착했고, 준비돼 있던 다섯은 함께 잔치에 들어가 문이 닫혔어요. 뒤늦게 기름을 구해 돌아온 다섯은 문을 두드렸지만, 끝내 들어가지 못했답니다. 언제 올지 모르는 순간을 위해 미리 준비해두는 것, 그것이 갈랐던 거예요."
        ],
        moral: "중요한 순간이 언제 찾아올지 모를 땐, 미리미리 준비해두는 사람만이 그 기회를 놓치지 않아요. 준비는 그 순간이 오기 전에 끝나 있어야 한답니다.",
        question: "미리 준비해뒀으면 좋았을 텐데, 닥쳐서야 허둥댔던 적이 있나요?"
    },
    {
        num: 15,
        title: "혼인 잔치에 초대받은 사람들",
        hook: "초대받고도 준비하지 않으면 어떻게 될까?",
        art: "story-15-wedding.png",
        art2: "story-15-wedding-2.png",
        emoji: "🎊",
        open: [
            "어느 임금이 아들의 혼인 잔치를 성대하게 준비하고 손님들을 초대했어요. 잔치 날이 되어 종들을 보내 손님들을 부르게 했지만, 초대받은 사람들은 저마다 핑계를 대며 오지 않았어요. '저는 밭을 사서 가봐야 해서요.' '저는 장사가 바빠서요.' 심지어 종들을 붙잡아 함부로 대하는 사람들까지 있었답니다.",
            "임금은 크게 화가 났어요. '초대받고도 저리 무례하다니! 이제 아무나 데려오너라.' 종들은 길거리로 나가 마주치는 사람은 누구든, 좋은 사람이든 나쁜 사람이든 가리지 않고 잔치에 데려왔어요. 덕분에 잔칫상은 금세 손님들로 가득 찼답니다."
        ],
        close: [
            "그런데 임금이 손님들을 둘러보다, 예복을 갖춰 입지 않은 한 사람을 발견했어요. '자네는 어찌 예복도 없이 여기 들어왔는가?' 그 사람은 아무 대답도 하지 못했어요. 잔치에 초대받았다는 사실만 믿고, 정작 그 자리에 걸맞은 준비는 하지 않았던 거예요.",
            "결국 그 사람은 잔치에서 쫓겨나고 말았어요. 초대는 누구에게나 열려 있었지만, 그 초대를 진심으로 받아들이고 합당하게 준비하는 것까지는 저절로 되는 게 아니었던 거랍니다."
        ],
        moral: "좋은 기회가 누구에게나 열려 있어도, 그것을 진심으로 소중히 여기고 준비하지 않으면 결국 놓치고 말아요. 초대받는 것과 그 자리에 어울리게 준비하는 것은 다른 문제랍니다.",
        question: "좋은 기회를 얻었는데 제대로 준비하지 않아서 아쉬웠던 적이 있나요?"
    },
    {
        num: 16,
        title: "곳간을 더 크게 지은 부자",
        hook: "곳간을 키우던 부자는 그날 밤 어떻게 됐을까?",
        art: "story-16-barn.png",
        art2: "story-16-barn-2.png",
        emoji: "🏺",
        open: [
            "어느 부자의 밭에서 그해 유난히 곡식이 풍성하게 자랐어요. 부자는 흐뭇해하며 생각했어요. '곳간이 좁아서 이 많은 곡식을 다 못 넣겠는걸. 어떻게 할까?'",
            "곰곰이 생각하던 부자는 결심했어요. '옳지, 낡은 곳간을 헐고 훨씬 더 큰 곳간을 새로 지어야겠다. 거기에 곡식과 재산을 잔뜩 쌓아두고, 이제부터는 편히 먹고 마시며 즐기기만 하면 되겠구나!'"
        ],
        close: [
            "부자는 새 곳간을 짓느라 여념이 없었어요. 그런데 바로 그날 밤, 부자는 갑자기 세상을 떠나고 말았어요. 그 많던 곡식과 새로 지은 곳간, 부자가 그렇게 자랑스러워하던 모든 것은 하루아침에 그의 것이 아니게 되어버렸답니다.",
            "부자는 평생을 곳간 채울 궁리만 하느라, 정작 그 재산을 나누거나 의미 있게 쓸 시간은 만들지 않았어요. 사람들은 그 소식을 듣고 씁쓸하게 되뇌었어요. '쌓아두기만 하고 떠난 재산이, 대체 그에게 무슨 의미가 있었을까.'"
        ],
        moral: "쌓아두는 데만 몰두하다 보면, 정작 그것을 나누고 누릴 기회를 놓칠 수 있어요. 가진 것을 어떻게 쓸지가, 얼마나 많이 가졌는지보다 중요하답니다.",
        question: "무언가를 쌓아두기만 하고 정작 써보지도 못한 적이 있나요?"
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
                ${artFrame('cover.png', '🌾')}
            </div>
            <div class="story-page-right">
                <h1>예수님의 비유</h1>
                <p>비유는 예수가 사람들을 가르칠 때 쓴 이야기 방식이에요. 어려운 말로 설명하는 대신 농사짓기, 양 치기, 돈 빌려주기, 잔치처럼 듣는 사람이라면 누구나 아는 일에 빗대어 이야기했지요.</p>
                <p>이 이야기들은 신약성경의 마태복음, 마가복음, 누가복음에 실려 있어요. 짧은 것은 두세 줄이고, 긴 것도 한 쪽을 넘지 않는답니다.</p>
                <p>비유의 특징은 설명을 붙이지 않는다는 점이에요. 이야기를 던져 놓고 그대로 끝내서 듣는 사람이 스스로 뜻을 생각하게 만들지요. 그래서 같은 비유를 두고 이천 년 동안 서로 다른 해석이 이어져 왔어요.</p>
                <p>이 책은 종교를 가르치려고 엮은 것이 아니에요. 비유를 이야기 그대로 읽으면서 그 안에 담긴 정직함과 너그러움 같은 삶의 교훈을 함께 생각해 보려고 담았답니다.</p>
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
    { q: "상인은 최고의 진주를 발견하고 무엇을 했나요?", choices: ["그냥 지나쳤다", "전 재산을 다 팔았다", "값을 깎아달라 했다"], answer: 1 },
    { q: "쓰러진 나그네를 도운 사람은 누구였나요?", choices: ["제사장", "성전에서 일하는 사람", "사마리아 사람"], answer: 2 },
    { q: "친구는 결국 왜 빵을 내주었나요?", choices: ["미안해서", "끈질기게 졸라서", "날이 밝아서"], answer: 1 },
    { q: "여인은 은전을 찾고 나서 무엇을 했나요?", choices: ["혼자 조용히 넣어뒀다", "이웃을 불러 기뻐했다", "다시 숨겨두었다"], answer: 1 },
    { q: "폭풍이 몰아치자 어떤 집이 무너졌나요?", choices: ["반석 위의 집", "모래 위의 집", "둘 다 무너졌다"], answer: 1 },
    { q: "한 시간 일한 사람은 품삯을 얼마나 받았나요?", choices: ["못 받았다", "조금만 받았다", "똑같이 받았다"], answer: 2 },
    { q: "돌아온 아들을 본 아버지는 어떻게 했나요?", choices: ["크게 꾸짖었다", "잔치를 열어줬다", "모른 척했다"], answer: 1 },
    { q: "농부는 가라지를 언제 뽑으라고 했나요?", choices: ["바로 지금", "추수 때", "아예 안 뽑는다"], answer: 1 },
    { q: "한 달란트를 땅에 묻은 종은 어떻게 됐나요?", choices: ["칭찬받았다", "꾸중을 들었다", "상을 받았다"], answer: 1 },
    { q: "재판관은 왜 결국 과부의 청을 들어줬나요?", choices: ["법이 그래서", "과부가 끈질겨서", "돈을 받아서"], answer: 1 },
    { q: "청지기는 쫓겨나기 전에 무엇을 했나요?", choices: ["빚을 다 갚았다", "빚진 사람들 부담을 깎아줬다", "돈을 숨겼다"], answer: 1 },
    { q: "임금은 왜 다시 화가 났나요?", choices: ["빚을 안 갚아서", "동료에게 매정해서", "도망쳐서"], answer: 1 },
    { q: "소작농들은 결국 왜 쫓겨났나요?", choices: ["농사를 못 지어서", "아들마저 해쳐서", "세금을 안 내서"], answer: 1 },
    { q: "기름을 못 챙긴 처녀들은 어떻게 됐나요?", choices: ["잔치에 못 들어갔다", "기름을 빌렸다", "일찍 왔다"], answer: 0 },
    { q: "예복 없이 온 손님은 어떻게 됐나요?", choices: ["환영받았다", "잔치에서 쫓겨났다", "예복을 빌렸다"], answer: 1 },
    { q: "곳간을 새로 지은 부자는 어떻게 됐나요?", choices: ["오래오래 누렸다", "그날 밤 세상을 떠났다", "곳간이 무너졌다"], answer: 1 }
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
            <h2>열여섯 가지 이야기를 모두 읽었어요!</h2>
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
