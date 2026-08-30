const BOOK_TITLE = "흥부전";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "쫓겨난 아우",
        art: ["story-01-a.webp", "story-01-b.webp", "story-01-c.webp"],
        artAt: ["오늘부터 나가 살아라", "주걱이 흥부의 뺨을 후려쳤습니다", "이쪽도 한 번만 때려 주십시오"],
        paras: [
            "옛날 전라도 어느 고을에 형제가 살았습니다. 형은 놀부요 아우는 흥부였습니다. 집안은 논밭이 제법 되어 먹고살 걱정은 없었습니다.",
            "한배에서 났는데도 두 사람은 물과 불처럼 달랐습니다. 흥부는 마음이 여려서 남의 일에 먼저 소매를 걷었고, 놀부는 제 것 아니면 눈길도 주지 않았습니다. 한 사람은 주려고 태어났고 한 사람은 받으려고 태어난 듯했습니다.",
            "놀부의 심술은 온 고을이 다 알았습니다. 남의 논에 물꼬를 트고, 잘 자란 호박에 말뚝을 박고, 애호박에 침을 놓고, 초상난 집에 가서 춤을 추었습니다. 심술을 부리지 않으면 밥이 넘어가지 않는 사람이었습니다. 그러고도 부끄러운 줄을 몰랐습니다. 동네 아이들도 놀부가 지나가면 골목으로 숨었습니다.",
            "아버지가 세상을 떠나던 날, 두 형제를 머리맡에 불러 앉히고 말했습니다.<br>\"재산은 둘이 똑같이 나누어라. 그리고 서로 등지지 마라.\" 숨이 가빠 말이 자꾸 끊겼습니다.",
            "그러나 아버지가 눈을 감자마자 놀부는 그 말을 잊었습니다. 아니, 잊은 척했습니다. 곳간 열쇠부터 제 허리춤에 찼습니다.",
            "삼우제<span class=\"gloss\">(장사 지낸 뒤 세 번째 날에 지내는 제사)</span>가 끝난 날 저녁, 놀부가 흥부를 마당으로 불러냈습니다.<br>\"오늘부터 나가 살아라.\" 목소리에 미안한 기색이라고는 없었습니다. 삼우제 상도 아직 물리기 전이었습니다.",
            "흥부가 어리둥절해했습니다.<br>\"형님, 그게 무슨 말씀입니까.\"<br>\"장자가 집을 잇는 것이 법도다. 너는 나가서 네 살림을 차려라.\" 흥부는 제 귀를 의심했습니다.",
            "\"아버님께서는 똑같이 나누라 하셨습니다.\"<br>\"죽은 사람 말을 누가 들었느냐. 나는 못 들었다.\" 흥부는 더 조르지 못했습니다.",
            "흥부는 그날 밤으로 아내와 아이들을 데리고 집을 나왔습니다. 손에 든 것이라고는 헌 옷가지 한 보따리뿐이었습니다. 막내는 아직 걸음마도 떼지 못한 나이였습니다.",
            "형수는 문간까지도 나오지 않았습니다. 담 안에서 이런 소리만 들려왔습니다.<br>\"저것들 먹일 쌀이 아까웠지.\" 그 말이 담을 넘어 골목까지 들렸습니다.",
            "흥부네 식구는 마을에서 한참 떨어진 산자락에 자리를 잡았습니다. 수숫대를 얽고 흙을 발라 겨우 방 한 칸을 들였습니다. 지붕은 짚을 얹었는데 그것도 겨우 한 겹이었습니다.",
            "방이 어찌나 좁은지 다리를 뻗으면 발이 밖으로 나갔습니다. 흥부가 웃으며 말했습니다.<br>\"여보, 우리 집은 방 안에서 발끝으로 봄바람을 쐬는 집이오.\"<br>아내는 웃지 못했습니다. 아이가 열둘이었기 때문입니다. 그래도 아이들은 그 방에서 잘 잤습니다.",
            "흥부는 부지런했습니다. 남의 논을 매 주고, 산에서 나무를 하고, 짚신을 삼아 장에 내다 팔았습니다. 새벽에 나가 별을 보고 돌아왔습니다.",
            "그래도 열두 아이의 입을 채우기에는 턱없이 모자랐습니다. 아이들은 하나같이 배를 곯았습니다. 젖먹이는 젖이 나오지 않아 밤새 보챘습니다.",
            "그해 흉년이 들었습니다. 사흘을 물만 먹은 날, 막내가 흥부의 옷자락을 잡고 말했습니다.<br>\"아버지, 밥 냄새만이라도 맡아 보면 안 될까요.\" 막내의 목소리가 아주 작았습니다.",
            "흥부는 그 말에 밤새 잠을 이루지 못했습니다. 이튿날 새벽, 그는 옷을 갈아입고 길을 나섰습니다. 문밖에 서서 한참을 망설였습니다.",
            "\"어디 가시오?\" 아내가 물었습니다.<br>\"형님 댁에 좀 다녀오겠소.\"<br>아내가 그의 소매를 잡았습니다.<br>\"가지 마세요. 무슨 봉변을 당하시려고.\"<br>\"그래도 형님인데요.\" 아내는 문밖까지 따라 나왔습니다.",
            "놀부네 집 대문 앞에 서니 안에서 밥 짓는 냄새가 담을 넘어왔습니다. 흥부는 침을 삼키고 문을 두드렸습니다. 담 안에서 웃음소리도 들려왔습니다.",
            "놀부가 나왔습니다. 흥부를 보더니 인상부터 찌푸렸습니다.<br>\"네가 어인 일이냐.\" 대문을 반만 열어 놓은 채였습니다.",
            "흥부가 무릎을 꿇었습니다.<br>\"형님, 아이들이 사흘을 굶었습니다. 쌀 한 되만 꾸어 주십시오. 가을에 품을 팔아서라도 갚겠습니다.\" 땅바닥에 이마가 닿도록 숙였습니다.",
            "놀부의 눈이 가늘어졌습니다.<br>\"쌀? 우리 집에 쌀이 어디 있느냐. 있어도 너 줄 쌀은 없다.\"<br>그러고는 문을 닫으려 했습니다. 흥부는 문틈에 손을 넣었습니다.",
            "그때 부엌에서 형수가 나왔습니다. 손에는 밥주걱이 들려 있었습니다. 방금 뜬 밥알이 주걱에 하얗게 붙어 있었습니다. 김이 모락모락 오르고 있었습니다. 형수의 손가락에는 은가락지가 두 개나 끼워져 있었습니다.",
            "\"형수님, 한 되만…….\"<br>말이 끝나기도 전이었습니다. 철썩! 주걱이 흥부의 뺨을 후려쳤습니다. 소리가 어찌나 큰지 담 밖까지 들렸습니다.",
            "흥부는 얼굴을 감쌌습니다. 볼이 금세 벌겋게 부어올랐습니다. 그런데 손바닥에 무언가 붙어 있었습니다. 주걱에서 떨어진 밥알이었습니다.<br>흥부는 그 밥알을 손바닥에서 조심조심 떼어 품에 넣었습니다. 그러고는 반대쪽 뺨을 내밀었습니다.<br>\"형수님, 이쪽도 한 번만 때려 주십시오.\""
        ]
    },
    {
        num: 2,
        title: "처마 밑의 제비",
        art: ["story-02-a.webp", "story-02-b.webp", "story-02-c.webp"],
        artAt: ["제비 한 쌍이 날아들었습니다", "실로 조심조심 감았습니다", "흥부의 발 앞에 무언가를 떨어뜨렸습니다"],
        paras: [
            "이듬해 봄이 왔습니다. 흥부네 오두막 처마 밑에 제비 한 쌍이 날아들었습니다. 지지배배 우는 소리가 마당에 가득했습니다.",
            "아이들이 손뼉을 쳤습니다.<br>\"아버지, 제비가 우리 집에 집을 지어요!\"<br>\"그렇구나. 우리 집이 마음에 들었나 보다.\" 막내는 하루에도 몇 번씩 처마를 올려다보았습니다.",
            "제비 부부는 진흙을 물어다 부지런히 집을 지었습니다. 얼마 뒤 새끼 다섯 마리가 깨어났습니다. 노란 입을 짝짝 벌리는 소리가 온종일 그치지 않았습니다. 새끼들이 자라는 것을 보는 것이 흥부네 낙이었습니다.",
            "흥부는 아침마다 그 아래에 서서 새끼들을 올려다보았습니다. 제 아이들 먹일 것도 없으면서 마당에 곡식 부스러기를 뿌려 주었습니다. 제 몫의 좁쌀을 덜어 낸 것이었습니다.",
            "그러던 어느 날이었습니다. 흥부가 나무를 하고 돌아오는데 마당이 소란스러웠습니다. 아이들이 발을 동동 구르고 있었습니다. 아이들의 얼굴이 새하얬습니다.",
            "처마 밑 제비집 아래에 커다란 구렁이가 몸을 감고 있었습니다. 새끼 제비들이 자지러지게 울었습니다. 어른 팔뚝만 한 놈이었습니다.",
            "흥부가 지게 작대기를 들고 뛰어들었습니다.<br>\"이놈! 저리 가라!\"<br>작대기로 땅을 요란하게 두드리자 작대기 소리에 아이들이 귀를 막았습니다. 구렁이가 스르르 담 밖으로 빠져나가다 담 위에서 한 번 뒤를 돌아보았습니다. 흥부의 등에서 식은땀이 흘렀습니다.",
            "그런데 그 소동에 새끼 한 마리가 둥지에서 떨어지고 말았습니다. 흥부가 얼른 주워 보니 다리 하나가 힘없이 꺾여 있었습니다. 작은 몸이 마당 흙바닥에 나동그라져 있었습니다.",
            "\"아이고, 이를 어쩌나.\"<br>흥부는 새끼 제비를 손바닥에 올려놓고 방으로 들어갔습니다. 새끼는 눈도 제대로 뜨지 못했습니다.",
            "아내가 반짇고리에서 실을 꺼냈습니다. 흥부는 부러진 다리에 얇은 나뭇조각을 대고 실로 조심조심 감았습니다. 손이 커서 몇 번이나 놓칠 뻔했습니다. 아이들이 숨을 죽이고 둘러앉았습니다. 나뭇조각은 흥부가 손톱으로 다듬어 얇게 깎은 것이었습니다.",
            "\"살겠소?\" 아내가 물었습니다.<br>\"살아야지요.\" 아내가 등잔을 가까이 대 주었습니다.",
            "흥부는 며칠 동안 그 새끼를 방 안에 두고 돌보았습니다. 제 밥은 굶어도 좁쌀을 구해다 먹였습니다. 열흘쯤 지나자 새끼 제비가 다리를 짚고 일어섰고, 보름째 되던 날 마당을 낮게 한 바퀴 돌아 처마로 올라갔습니다. 그 자리에서 몇 번이나 미끄러졌지만 다시 일어섰습니다. 아이들이 날마다 방문을 열어 보았고, 막내는 좁쌀을 손바닥에 올려 두고 기다렸습니다. 마침내 흥부네 식구가 모두 마당에 나와 손뼉을 쳤습니다.",
            "가을이 되자 제비들은 강남으로 떠났습니다. 다리를 다쳤던 새끼도 무리를 따라 하늘로 사라졌습니다. 처마 밑이 갑자기 조용해졌습니다. 처마 밑 빈 둥지에 눈이 쌓였습니다.",
            "겨울은 여느 해보다 길었습니다. 흥부네는 나무껍질을 벗겨 죽을 쑤어 먹으며 겨우 넘겼습니다. 아이들은 배고픈 것도 잊고 제비 이야기를 했습니다.",
            "이듬해 삼월 삼짇날이었습니다. 마당에서 아이들이 소리쳤습니다.<br>\"제비다! 제비가 왔어요!\" 아이들이 마당으로 우르르 뛰어나갔습니다.",
            "제비 한 마리가 마당 위를 몇 바퀴 돌더니 흥부의 발 앞에 무언가를 떨어뜨렸습니다. 그러고는 처마 위에 앉아 지지배배 울었습니다. 온 식구가 마당으로 뛰어나와 하늘을 올려다보았습니다.",
            "흥부가 주워 보니 씨앗 하나였습니다. 여느 박씨보다 훨씬 크고, 겉에 무슨 글씨 같은 무늬가 있었습니다. 손바닥에 올려놓으니 제법 묵직했습니다.",
            "아내가 들여다보았습니다.<br>\"박씨 같은데요.\"<br>\"저 제비가 작년에 다리를 다쳤던 그놈이오. 저 걸음걸이를 보시오.\" 아내가 씨앗을 손바닥에 올려 보았습니다.",
            "과연 제비는 한쪽 다리를 조금 절었습니다. 흥부는 한참 동안 그 제비를 올려다보았습니다. 흥부가 손을 내밀자 제비가 손끝에 앉았습니다.",
            "\"고맙구나. 그런데 나는 너에게 해 준 것이 없다.\" 제비는 대답 대신 지지배배 울었습니다.",
            "흥부는 그 씨앗을 지붕 옆 흙벽 아래에 심었습니다. 물을 주고 흙을 다독였습니다. 아침저녁으로 물을 길어다 주었습니다. 아이들이 돌아가며 물을 주겠다고 다투었습니다.",
            "싹이 트더니 덩굴이 무섭게 뻗었습니다. 사흘 만에 지붕에 올라가고, 열흘 만에 지붕을 다 덮었습니다. 잎이 어른 손바닥보다 컸습니다.",
            "그리고 그 덩굴에 박이 열렸습니다. 하나, 둘, 셋, 넷. 모두 네 통이었습니다. 그런데 그 크기가 사람 키만 했습니다. 지붕이 그 무게에 삐걱거렸습니다. 아이들이 그 아래에서 올려다보며 입을 벌렸습니다.",
            "이웃들이 구경을 왔습니다.<br>\"이런 박은 난생처음 보네.\"<br>\"저걸 타서 바가지를 만들면 온 마을이 다 쓰겠소.\"<br>흥부는 아내와 마주 보았습니다. 사실 그 집에는 그날 저녁 먹을 것이 없었습니다.<br>\"여보, 저거라도 타서 속을 끓여 먹읍시다.\" 흥부는 얼른 대답하지 못했습니다."
        ]
    },
    {
        num: 3,
        title: "박을 타다",
        art: ["story-03-a.webp", "story-03-b.webp", "story-03-c.webp"],
        artAt: ["긴 톱을 마주 잡았습니다", "배가 터지도록 밥을 먹었습니다", "기둥을 세우고 대들보를 올리고"],
        paras: [
            "흥부 부부는 지붕에서 박 하나를 내려 마당에 놓았습니다. 그러고는 긴 톱을 마주 잡았습니다. 박이 얼마나 무거운지 둘이서 겨우 굴려 내렸습니다.",
            "\"슬근슬근 톱질하세.\"<br>흥부가 장단을 넣자 아내가 받았습니다.<br>\"이 박을 타서 속을랑 끓여 먹고 바가지는 팔아 봅세.\" 톱날이 박 껍질에 스윽 걸렸습니다. 톱질 소리가 마당에 울렸습니다.",
            "아이들이 둘러앉아 구경했습니다. 톱날이 반쯤 들어갔을 때였습니다. 톱날이 박 속으로 들어갈수록 소리가 달라졌습니다. 그러더니 박 속에서 눈이 부실 만큼 환한 빛이 새어 나왔습니다.",
            "\"어어?\"<br>흥부 부부가 손을 놓자 박이 저절로 쩍 갈라졌습니다. 톱이 손에서 떨어졌습니다.",
            "그 속에서 무언가 스르르 올라왔습니다. 흰 옷을 입은 아이 하나가 상을 받쳐 들고 나왔습니다. 아이의 옷자락에서 은은한 빛이 났습니다.",
            "상 위에는 김이 오르는 흰쌀밥이 고봉으로 담겨 있었습니다. 그 옆에는 고깃국과 나물과 김치가 놓여 있었습니다. 난생처음 보는 상이었습니다. 아이들이 침을 삼키는 소리가 났습니다.",
            "아이가 상을 마당에 내려놓고 말했습니다.<br>\"많이 드십시오.\"<br>그러고는 연기처럼 사라졌습니다. 김이 마당 가득 퍼졌습니다. 아이들이 숟가락을 쥔 채 어른들 눈치를 보았습니다.",
            "흥부네 식구는 한참 동안 아무도 움직이지 못했습니다. 막내가 먼저 밥그릇에 손을 뻗었습니다. 아무도 그것이 참인지 꿈인지 알 수 없었습니다.",
            "그날 흥부네 열네 식구는 배가 터지도록 밥을 먹었습니다. 아이들이 밥알을 씹으며 울었습니다. 흥부 내외도 울었습니다. 막내는 먹으면서도 울음을 그치지 못했습니다.",
            "그런데 이상한 일이었습니다. 상을 다 비우고 나면 그릇에 밥이 도로 그득 차 있었습니다. 아무리 먹어도 줄지 않았습니다. 흥부 내외는 서로 얼굴만 쳐다보았습니다. 흥부가 그릇을 들었다 놓았다 하며 몇 번이나 확인했습니다.",
            "\"여보.\" 아내가 말했습니다. \"저 박이 아직 세 통 남았어요.\" 아내의 목소리가 떨렸습니다.",
            "이튿날 아침, 흥부 부부는 다시 톱을 잡았습니다. 이번에는 손이 떨렸습니다. 아이들도 숨을 죽이고 지켜보았습니다.",
            "두 번째 박이 갈라지자 그 속에서 비단이 쏟아져 나왔습니다.",
            "붉은 비단, 푸른 비단, 노란 비단이 파도처럼 밀려 나와 마당을 덮었습니다. 아이들이 그 위에서 뒹굴었습니다. 빛깔이 어찌나 고운지 눈이 다 부셨습니다. 비단이 마당을 넘어 담까지 흘러넘쳤습니다.",
            "비단이 끝나자 무명과 삼베가 나왔고, 그다음에는 솜이 나왔습니다. 흥부네 열두 아이가 그해 처음으로 솜옷을 입었습니다. 아이들이 서로 옷을 만져 보았습니다.",
            "세 번째 박에서는 목수들이 나왔습니다. 톱과 자귀를 든 사람들이 줄줄이 걸어 나오더니 흥부에게 절을 했습니다.<br>\"집을 지으러 왔습니다.\" 열 사람도 넘었습니다.",
            "목수들은 그 자리에서 낡은 오두막을 헐고 새 집을 짓기 시작했습니다. 기둥을 세우고 대들보를 올리고 기와를 얹는 데 사흘이 걸렸습니다. 톱질 소리와 망치 소리가 밤낮으로 온 산자락에 울렸습니다.",
            "사흘째 저녁, 산자락에 커다란 기와집 한 채가 서 있었습니다. 방이 열두 칸이요 곳간이 세 채였습니다. 기와가 저녁놀을 받아 붉게 빛났습니다.",
            "마지막 네 번째 박이 남았습니다. 흥부가 톱을 잡으며 아내에게 말했습니다.<br>\"이제 그만 탈까요. 너무 과합니다.\"<br>\"열어는 봐야지요.\" 아내가 흥부의 손을 잡았습니다.",
            "네 번째 박이 갈라지자 금은보화가 쏟아졌습니다. 금덩이와 은덩이가 마당에 산처럼 쌓였습니다. 햇빛에 눈을 뜰 수가 없었습니다. 금덩이가 굴러 흥부의 발등에 닿았습니다.",
            "흥부는 그 앞에 한참을 서 있었습니다. 그러고는 이상하게도 기뻐하지 않았습니다. 오히려 얼굴이 어두워졌습니다.",
            "\"여보, 왜 그러세요.\"<br>\"내가 한 일이라고는 제비 다리 하나 싸매 준 것뿐인데, 이것이 다 내 것이 되어도 되는 것인지 모르겠소.\" 흥부는 마당을 오래 내려다보았습니다.",
            "이튿날 흥부는 마을로 내려갔습니다. 그러고는 굶는 집을 찾아다니며 쌀을 나누어 주었습니다. 빚에 눌린 집의 빚을 대신 갚아 주었습니다. 누가 시킨 것이 아니었습니다. 빚 문서를 받아 든 사람들이 그 자리에서 울었습니다.",
            "한 달이 지나자 그 고을에 굶는 사람이 없어졌습니다. 사람들은 흥부네 집을 지날 때마다 담 너머로 인사를 했습니다. 그래도 흥부는 늘 먼저 고개를 숙였습니다. 흥부는 누구에게도 갚으라는 말을 하지 않았습니다.",
            "그리고 그 소문은 곧 놀부의 귀에 들어갔습니다."
        ]
    },
    {
        num: 4,
        title: "놀부의 제비",
        art: ["story-04-a.webp", "story-04-b.webp", "story-04-c.webp"],
        artAt: ["제비라니", "뚝, 하고 소리가 났습니다", "잊지 마라! 나다! 놀부다!"],
        paras: [
            "놀부는 소문을 듣고도 처음에는 믿지 않았습니다.<br>\"그 거지 같은 것이 부자가 됐다고? 헛소리다.\" 듣고도 코웃음을 쳤습니다.",
            "그러나 사흘이 지나도 소문이 잦아들지 않았습니다. 놀부는 결국 아우의 집으로 향했습니다. 장에 다녀온 종까지 같은 말을 했기 때문입니다.",
            "산자락에 이르러 놀부는 걸음을 멈추었습니다. 예전에 수숫대 오두막이 있던 자리에 커다란 기와집이 서 있었습니다. 기와가 햇빛을 받아 번쩍였습니다.",
            "놀부는 대문을 걷어차듯 열고 들어갔습니다.<br>\"흥부야! 어디 있느냐!\" 대문 돌쩌귀가 떨어져 나갈 뻔했습니다.",
            "흥부가 버선발로 뛰어나왔습니다.<br>\"형님! 어서 오십시오!\"<br>흥부의 얼굴에는 반가움뿐이었습니다. 주걱으로 맞은 일은 입에도 올리지 않았습니다. 손을 잡고 마루로 이끌었습니다. 흥부의 아이들이 큰아버지를 처음 보았습니다.",
            "놀부는 인사도 받지 않고 집 안을 휘휘 둘러보았습니다. 곳간 문을 열어 보고, 방마다 문을 열어 보았습니다. 쌀가마를 세어 보고는 아무 말도 하지 못했습니다.",
            "\"바른대로 말해라. 도둑질을 했느냐.\"<br>\"형님도 참. 제비 덕입니다.\" 흥부는 조금도 성내지 않았습니다.",
            "놀부의 눈이 번쩍 뜨였습니다.<br>\"제비라니.\" 놀부의 목소리가 갈라졌습니다.",
            "흥부는 있었던 일을 하나도 빼지 않고 이야기했습니다. 처마 밑 제비집, 구렁이, 부러진 다리, 실로 싸매 준 일, 이듬해 봄에 물어다 준 박씨. 말하는 내내 흥부의 얼굴이 환했습니다. 흥부는 형수의 주걱 이야기만은 끝내 하지 않았습니다.",
            "놀부는 이야기를 들으며 손가락을 꼽았습니다. 그러고는 벌떡 일어섰습니다. 아우의 이야기는 귀에 들어오지도 않았습니다.",
            "\"형님, 진지라도 잡숫고 가시지요.\"<br>\"됐다.\"<br>놀부는 뒤도 돌아보지 않고 나갔습니다. 흥부가 대문 밖까지 따라 나와 인사를 했지만 놀부는 손을 내저었습니다. 흥부는 대문 밖에서 오래 서 있었습니다.",
            "집으로 돌아가는 길에 놀부의 머릿속에는 딱 한 가지 생각뿐이었습니다.<br>'제비 다리만 부러뜨리면 되는구나.' 걸음이 저절로 빨라졌습니다.",
            "그날부터 놀부는 제비를 기다렸습니다. 그러나 놀부네 처마에는 제비가 오지 않았습니다. 처마 밑이 텅 빈 채로 봄이 다 갔습니다.",
            "놀부는 종을 시켜 처마 밑에 미리 흙집을 지어 놓게 했습니다. 마당에 좁쌀도 뿌렸습니다. 그래도 제비는 오지 않았습니다. 애가 타서 잠도 오지 않았습니다. 종들이 사흘 밤을 새워 처마 밑을 지켰습니다.",
            "놀부는 대나무 장대를 들고 마을을 돌아다니며 남의 집 제비집을 헐었습니다. 종들도 그 짓을 말리지 못했습니다. 갈 곳 없는 제비들이 온 마을을 맴돌다가, 한 쌍이 마침내 놀부네 처마로 날아들었습니다.",
            "\"오냐, 어서 오너라.\"<br>놀부는 그날 밤 잠도 오지 않았습니다.",
            "제비 부부가 새끼를 쳤습니다. 새끼 세 마리가 노란 입을 벌렸습니다. 놀부는 하루에도 몇 번씩 사다리를 놓고 올라가 들여다보았습니다. 사다리가 삐걱거려도 아랑곳하지 않았습니다. 어미 제비가 놀부의 머리 위를 맴돌았습니다. 놀부는 새끼들이 자라는 것을 손가락으로 세었습니다.",
            "\"아직 다리가 가늘구나. 조금만 더 굵어지면…….\"",
            "보름이 지나자 새끼들의 다리에 힘이 붙었습니다. 놀부는 사다리를 놓고 올라가 새끼 한 마리를 꺼냈습니다. 둥지 안에서 어미 제비가 자지러지게 울었습니다.",
            "새끼 제비가 손안에서 파닥거렸습니다. 놀부는 잠깐 망설였습니다. 새끼는 놀부의 손가락을 꼭 붙들었습니다. 작은 심장이 손바닥에서 빠르게 뛰었습니다.",
            "그러나 곧 눈을 질끈 감았습니다.<br>\"조금만 참아라. 곧 고쳐 줄 테니.\"<br>뚝, 하고 소리가 났습니다. 새끼가 짧게 울었습니다.",
            "놀부는 실과 나뭇조각을 가져다 다리를 감았습니다. 손놀림이 어찌나 급했는지 매듭이 제대로 지어지지 않았습니다. 실이 자꾸 미끄러졌습니다.",
            "놀부는 새끼를 도로 둥지에 올려놓고 두 손을 모았습니다.<br>\"내가 네 다리를 고쳐 주었다. 잊지 마라. 내년 봄에 꼭 갚아야 한다.\" 둥지 안이 조용했습니다.",
            "가을이 되어 제비들이 떠났습니다. 놀부는 마당에 서서 하늘을 올려다보며 몇 번이나 소리쳤습니다.<br>\"잊지 마라! 나다! 놀부다!\" 하늘에는 아무 대답도 없었습니다."
        ]
    },
    {
        num: 5,
        title: "열두 통의 박",
        art: ["story-05-a.webp", "story-05-b.webp", "story-05-c.webp"],
        artAt: ["세다 보니 열두 통이었습니다", "두 번째 박에서는 사당패가 나왔습니다", "흙더미만 남아 있었습니다"],
        paras: [
            "그해 겨울, 놀부는 밤마다 박 꿈을 꾸었습니다. 금덩이가 쏟아지는 꿈이었습니다. 아침에 깨면 그 꿈 이야기부터 했습니다.",
            "이듬해 삼월 삼짇날, 놀부는 아침부터 마당에 나와 하늘을 살폈습니다. 아침을 거르고 하늘만 보았습니다.",
            "해가 기울 무렵 제비 한 마리가 날아들었습니다. 한쪽 다리를 심하게 절었습니다. 놀부는 두 팔을 벌리고 뛰어나갔습니다. 온 식구가 마당으로 뛰어나왔습니다.",
            "제비가 무언가를 떨어뜨리고 곧바로 하늘로 솟아올랐습니다. 놀부가 얼른 주웠습니다. 흥부가 받았다는 것보다 더 큰 박씨였습니다. 어른 두 손으로 겨우 쥘 만했습니다.",
            "\"됐다! 됐어!\"<br>놀부는 그 자리에서 덩실덩실 춤을 추었습니다.",
            "놀부는 마당 한복판을 파고 박씨를 심었습니다. 그러고는 하루에 열 번씩 물을 주었습니다. 종들에게는 밤새 지키게 했습니다. 행여 누가 파 갈까 담까지 높였습니다. 종 하나가 밤새 마당을 지키다 졸다 매를 맞았습니다.",
            "싹이 트더니 덩굴이 무섭게 뻗었습니다. 지붕을 덮고 담을 넘고 이웃집 지붕까지 올라갔습니다. 잎이 어찌나 무성한지 낮에도 마당이 어두웠습니다. 담이 덩굴 무게에 기울었습니다.",
            "박이 열렸습니다. 하나, 둘, 셋…… 세다 보니 열두 통이었습니다. 흥부네보다 세 배가 많았습니다. 하나하나가 사람 키를 넘었습니다.",
            "\"열두 통! 열두 통이면 흥부네 세 곱절이 아니냐!\"<br>놀부는 밤에도 마당에 나와 박을 쓰다듬었습니다. 밤마다 등불을 들고 나가 세어 보았습니다.",
            "아내가 조심스레 말했습니다.<br>\"영감, 아무래도 좀 이상합니다. 박이 너무 커요.\"<br>\"이 사람이 복이 굴러 들어오는데 무슨 소리를 하는가.\" 아내는 며칠째 잠을 설치고 있었습니다.",
            "드디어 박을 타는 날이 왔습니다. 놀부는 마을 사람들까지 불러 모았습니다. 제 부자 되는 것을 구경시키고 싶었던 것입니다. 마당에 멍석까지 깔았습니다.",
            "놀부가 톱을 잡고 목청을 돋우었습니다.<br>\"슬근슬근 톱질하세! 이 박을 타서 금은보화 쏟아지면 온 나라 제일가는 부자가 되어 보세!\" 구경꾼들이 담 위까지 올라앉았습니다.",
            "첫 번째 박이 쩍 갈라졌습니다. 그런데 빛이 나오지 않았습니다. 구경꾼들이 목을 빼고 들여다보았습니다.",
            "대신 사람들이 우르르 쏟아져 나왔습니다. 손에 장부를 든 사람들이었습니다.<br>\"놀부 있느냐! 빚을 갚아라!\" 옷차림이 하나같이 관가 아전 같았습니다. 장부가 열 권도 넘었습니다.",
            "놀부가 어리둥절해했습니다.<br>\"내가 무슨 빚이 있다고!\"<br>\"네가 남의 논에 물꼬를 터서 망친 벼 값, 남의 호박에 말뚝 박아 못 쓰게 한 값, 다 여기 적혀 있다.\" 장부가 마당에 척 펼쳐졌습니다.",
            "장부에는 놀부가 평생 부린 심술이 하나도 빠짐없이 적혀 있었습니다. 놀부는 곳간에서 엽전 궤짝을 내주어야 했습니다. 구경꾼들이 술렁였습니다. 장부를 든 사람들이 곳간에서 궤짝을 지고 나갔습니다.",
            "두 번째 박에서는 사당패가 나왔습니다. 마당 한복판에서 밤새 놀고는 놀아 준 값을 받아 갔습니다. 꽹과리 소리가 밤새 그치지 않았습니다.",
            "세 번째 박에서는 무당이 나와 굿을 하고 굿값을 받아 갔고, 네 번째 박에서는 노승이 나와 시주를 받아 갔습니다. 곳간이 하루가 다르게 비어 갔습니다.",
            "놀부는 박이 하나 갈라질 때마다 곳간 문을 열어야 했습니다.<br>\"그만! 그만 타자!\"<br>그런데 손이 말을 듣지 않았습니다. 팔이 저절로 움직였습니다.",
            "다섯 번째, 여섯 번째, 일곱 번째. 박은 계속 갈라졌습니다. 그때마다 무언가가 나와 놀부의 재산을 한 짐씩 지고 나갔습니다. 놀부의 얼굴이 점점 하얘졌습니다. 놀부의 옷이 땀에 흠뻑 젖었습니다.",
            "여덟 번째 박에서는 흙탕물이 쏟아져 나와 마당을 뒤덮었습니다. 아홉 번째 박에서는 똥이 쏟아져 나왔습니다. 냄새가 어찌나 지독한지 구경꾼들이 다 달아났습니다.",
            "열 번째 박에서는 온갖 벌레가 쏟아져 나와 곳간의 곡식을 다 갉아 먹었습니다. 열한 번째 박에서는 커다란 구렁이가 나와 마당을 한 바퀴 돌고 담을 넘어갔습니다.",
            "마지막 열두 번째 박이 남았습니다. 놀부는 그 앞에 주저앉아 있었습니다. 이미 곳간은 텅 비었고 종들은 다 달아난 뒤였습니다. 아내는 아이들을 데리고 담 밖에 나가 있었습니다.",
            "열두 번째 박이 갈라지자 갑옷을 입은 장수들이 걸어 나왔습니다. 장수들은 아무 말도 하지 않고 연장을 들었습니다. 그러고는 놀부의 집을 헐기 시작했습니다. 아무도 말리지 못했습니다.",
            "기와가 떨어지고 기둥이 넘어갔습니다. 담이 무너지고 곳간이 주저앉았습니다. 해가 질 무렵, 놀부네 집이 있던 자리에는 흙더미만 남아 있었습니다. 기둥 하나 성한 것이 없었습니다."
        ]
    },
    {
        num: 6,
        title: "다시 심은 박씨",
        art: ["story-06-a.webp", "story-06-b.webp", "story-06-c.webp"],
        artAt: ["무너진 집터에 서 있었습니다", "담 밖에 그냥 서 있었습니다", "흰쌀밥에 고깃국이었습니다"],
        paras: [
            "놀부와 그 식구는 무너진 집터에 서 있었습니다. 비가 내리기 시작했습니다. 아무도 도롱이 하나 걸쳐 주지 않았습니다.",
            "구경하던 마을 사람들이 하나둘 돌아갔습니다. 아무도 놀부에게 자기 집으로 가자는 말을 하지 않았습니다. 놀부는 그동안 마을에서 그런 말을 들을 만한 일을 한 적이 없었습니다. 비가 옷 속까지 스몄습니다.",
            "밤이 되자 비가 더 굵어졌습니다. 놀부네 식구는 무너진 담 밑에 웅크리고 앉았습니다. 담이라고 해 봐야 어른 무릎 높이였습니다.",
            "아내가 흐느꼈습니다.<br>\"이제 어디로 갑니까.\"<br>놀부는 대답하지 못했습니다. 아이들이 어미 치맛자락을 붙들었습니다.",
            "새벽녘, 놀부가 자리에서 일어섰습니다. 그러고는 산자락 쪽으로 걸음을 옮겼습니다. 옷에서 물이 뚝뚝 떨어졌습니다.",
            "\"어디 가세요.\"<br>\"…흥부한테.\"<br>아내가 놀부의 소매를 잡았습니다.<br>\"무슨 낯으로요.\"<br>\"낯이 없으니까 가는 것이오.\" 빗소리에 목소리가 묻혔습니다.",
            "놀부는 비를 맞으며 걸었습니다. 걸으면서 흥부가 저에게 했던 말들이 자꾸 떠올랐습니다. 빗물이 눈으로 자꾸 들어왔습니다.",
            "형님, 어서 오십시오. 형님, 진지라도 잡숫고 가시지요. 그때 흥부의 얼굴에는 원망이 한 점도 없었습니다. 그 얼굴이 자꾸 눈앞에 어른거렸습니다.",
            "놀부는 걸음을 멈추었습니다. 그러고는 처음으로 스스로에게 물었습니다.<br>'나는 저 사람에게 무엇을 해 주었던가.' 처음 해 보는 물음이었습니다.",
            "아무것도 없었습니다. 아버지 재산을 혼자 차지했고, 한겨울에 열두 아이와 함께 내쫓았고, 쌀 한 되를 얻으러 온 아우의 뺨을 주걱으로 때리게 했습니다. 생각할수록 낯이 뜨거웠습니다.",
            "놀부는 그 자리에 주저앉았습니다. 빗물인지 눈물인지 모를 것이 얼굴을 타고 흘렀습니다. 한참을 그렇게 있었습니다.",
            "해가 뜰 무렵, 놀부는 흥부네 대문 앞에 이르렀습니다. 문을 두드릴 용기가 나지 않아 담 밖에 그냥 서 있었습니다. 대문 안에서 사람 소리가 났습니다.",
            "그때 대문이 열렸습니다. 흥부가 맨발로 뛰어나왔습니다. 문지방을 넘는 소리가 급했습니다.",
            "\"형님!\"<br>흥부는 놀부를 보자마자 그 젖은 어깨를 끌어안았습니다. 옷이 젖는 것도 아랑곳하지 않았습니다.",
            "\"소, 소식을 들었습니다. 밤새 사람을 보내 찾았는데 어디 계셨습니까.\"<br>놀부는 아무 말도 하지 못했습니다. 흥부의 목소리가 떨렸습니다.",
            "흥부는 놀부네 식구를 모두 집 안으로 들였습니다. 아궁이에 불을 지피게 하고, 마른 옷을 내오게 하고, 밥상을 차리게 했습니다. 아이들에게는 마른 수건과 따뜻한 물부터 내주었습니다.",
            "상이 들어왔습니다. 흰쌀밥에 고깃국이었습니다. 놀부는 숟가락을 들지 못하고 상만 내려다보았습니다. 손이 자꾸 떨렸습니다.",
            "\"형님, 식습니다.\"<br>\"…흥부야.\"<br>\"예.\"<br>\"내가 너에게 이런 밥상을 한 번이라도 차려 준 적이 있느냐.\" 방 안이 조용해졌습니다.",
            "흥부가 웃었습니다.<br>\"어릴 적에 형님이 저에게 홍시를 주신 적이 있습니다. 감나무에 올라가서 따다 주셨지요.\"<br>\"그런 일이 있었느냐.\"<br>\"저는 그것만 기억하기로 했습니다.\"",
            "놀부가 상 위로 얼굴을 묻었습니다. 어깨가 크게 흔들렸습니다. 흥부는 아무 말 없이 형의 등에 손을 얹었습니다. 숟가락이 상 위에 그대로 놓여 있었습니다.",
            "그날부터 놀부네 식구는 흥부네 집에서 지냈습니다. 흥부는 형에게 곳간 열쇠를 내밀었습니다.<br>\"형님이 맡아 주십시오.\"<br>놀부는 그 열쇠를 받지 않았습니다.<br>\"아니다. 나는 그것부터 다시 배워야 한다.\" 흥부는 더 권하지 않았습니다.",
            "놀부는 그해 봄부터 흥부네 논에 나가 일을 했습니다. 평생 남을 부리기만 하던 사람이 처음으로 제 손에 흙을 묻혔습니다. 손바닥이 터지고 아물기를 여러 번 했습니다. 아침마다 제일 먼저 들에 나갔습니다.",
            "그리고 여름이 되자 놀부는 뒤꼍 한 귀퉁이를 파고 무언가를 심었습니다. 흥부가 물었습니다.<br>\"형님, 그게 무엇입니까.\"<br>\"박씨다.\" 흙 묻은 손이 그대로였습니다.",
            "흥부가 놀랐습니다.<br>\"형님, 또…….\"<br>놀부가 고개를 저었습니다.<br>\"이번에는 바가지를 만들려고 심는 것이다. 우리 집에 물바가지가 없더구나.\"",
            "그 덩굴에서는 아주 평범한 박이 세 통 열렸습니다. 놀부는 그것을 타서 속을 파내고 볕에 말려 바가지를 만들었습니다. 금도 은도 나오지 않았습니다.",
            "그러고는 그 가운데 하나를 마을 우물가에 걸어 두었습니다. 지나가는 사람 누구나 물을 떠 마실 수 있게 말입니다. 놀부가 평생 처음으로 남에게 그냥 내준 물건이었습니다. 바가지는 여러 해가 지나도록 그 자리에 걸려 있었다고 합니다."
        ]
    }
];

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

    // 그림처럼 위쪽 여백이 음수인 것도 있으므로 위아래 여백을 다 셈한다.
    const contentHeight = () => [...col.children].reduce((h, el) => {
        const s = getComputedStyle(el);
        return h + el.getBoundingClientRect().height
            + (parseFloat(s.marginTop) || 0) + (parseFloat(s.marginBottom) || 0);
    }, 0);

    col.innerHTML = '<h2>제목</h2>';
    const headHeight = contentHeight();

    // 그림이 얹힌 쪽은 그림 높이만큼 글이 적게 들어간다. 그 높이를 미리 재 둔다.
    // 그림 파일이 없어도 자리는 같으므로, 파일이 뒤에 들어와도 쪽이 밀리지 않는다.
    col.innerHTML = '<div class="story-art-top"><div class="art-frame"></div></div>';
    const artHeight = contentHeight();
    col.innerHTML = '';

    return {
        // 창이 아직 크기를 갖지 못한 채 열리면 잰 값이 0이 된다. 그때는 어림값으로 버틴다.
        usable: measured > 40 ? measured : 620,
        headHeight: headHeight > 0 ? headHeight : 45,
        artHeight: artHeight > 40 ? artHeight : 300,
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
        // 대화는 줄을 바꿀 때마다 한 칸 들여 쓴다. 국어 표기 규칙이다.
        // 첫 줄만 들여쓰는 text-indent로는 안 되므로 줄 앞에 한 칸짜리 자리를 넣는다.
        // 쪽 끝에 걸린 <br>는 빈 줄만 만드니 떼어 낸다.
        inner = inner.replace(/(<br\s*\/?>)+\s*$/i, '')
            .replace(/<br\s*\/?>/gi, '<br><span class="ln"></span>');
        out += `<p${contd ? ' class="cont"' : ''}>${inner}</p>`;
        i = j;
    }
    return out;
}

// 그림은 제가 그린 장면보다 **앞에 나오면 안 된다.** 앞에 나오면 아직 읽지도
// 않은 일을 먼저 보여 주는 셈이라 김이 새고 헷갈린다. 실제로 흥부전 5장에서
// 사당패 그림이 사당패가 나오기 열일곱 쪽 전에 붙어 있었다.
// 그래서 장마다 그림 옆에 「이 장면이다」 하는 문구(artAt)를 달아 두고,
// 그 문구가 든 펼침면에 그림을 얹는다. 두 그림이 같은 쪽으로 몰리면 뒤로 민다.
function anchorSlots(segs, ranges, count, anchors, total) {
    // 1) 문구가 든 펼침면을 찾는다. 못 찾으면 예전처럼 고르게 나눈 자리.
    const want = [];
    for (let k = 0; k < count; k++) {
        let at = -1;
        const a = anchors[k];
        if (a) {
            const segIdx = segs.findIndex(g => g.html.indexOf(a) >= 0);
            if (segIdx >= 0) {
                for (let p = 0; p < ranges.length; p++) {
                    if (segIdx >= ranges[p][0] && segIdx < ranges[p][1]) { at = p >> 1; break; }
                }
            }
        }
        want.push(at < 0 ? Math.min(Math.round((k * total) / count), total - 1) : at);
    }
    // 2) 앞으로 훑으며 겹치면 뒤로 민다.
    for (let k = 1; k < count; k++) {
        if (want[k] <= want[k - 1]) want[k] = want[k - 1] + 1;
    }
    // 3) 뒤로 훑으며 끝을 넘은 것을 앞으로 당긴다.
    //    이 두 번으로 자리가 반드시 서로 다르고 순서도 범위도 지켜진다.
    for (let k = count - 1; k >= 0; k--) {
        const cap = total - 1 - (count - 1 - k);
        if (want[k] > cap) want[k] = cap;
        if (k > 0 && want[k - 1] >= want[k]) want[k - 1] = want[k] - 1;
    }
    const slots = new Array(total).fill('text');
    for (let k = 0; k < count; k++) {
        if (want[k] >= 0 && want[k] < total) slots[want[k]] = 'img';
    }
    return slots;
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
function fillPages(segs, caps, headHtml) {
    const pageHeight = (a, b, first) => PROBE.measure((first ? headHtml : '') + runHtml(segs, a, b));
    const ranges = [];
    let i = 0;
    for (let p = 0; p < caps.length; p++) {
        const rest = caps.length - p - 1;
        if (rest === 0) { ranges.push([i, segs.length]); break; }
        // 남은 글을 남은 쪽들의 크기에 비례해 나눈다. 그래야 쪽마다 고르게 찬다.
        // 꽉꽉 채워 넘기면 장의 마지막 펼침면이 거의 비어 버린다.
        // 그림이 얹힌 쪽은 담을 수 있는 높이가 작으므로 그만큼 적게 가져간다.
        const remainingH = pageHeight(i, segs.length, p === 0);
        let capSum = 0, capRest = 0;
        for (let q = p; q < caps.length; q++) capSum += caps[q];
        for (let q = p + 1; q < caps.length; q++) capRest += caps[q];
        // 뒤쪽 쪽들에 남은 글이 다 안 들어가면 이번 쪽이 그만큼 더 가져가야 한다.
        const share = remainingH * caps[p] / capSum;
        const room = Math.min(caps[p], Math.max(remainingH - capRest, share));
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

    // 조각 단위로 끊다 보면 마지막 쪽에 넘치는 만큼이 남을 수 있다.
    // 뒤에서부터 훑어, 넘치는 쪽의 앞머리를 한 조각씩 앞 쪽으로 밀어 준다.
    for (let p = caps.length - 1; p > 0; p--) {
        while (ranges[p][1] - ranges[p][0] > 1 &&
               pageHeight(ranges[p][0], ranges[p][1], false) > caps[p]) {
            const prev = ranges[p - 1];
            if (pageHeight(prev[0], prev[1] + 1, p - 1 === 0) > caps[p - 1]) break;
            prev[1]++;
            ranges[p][0]++;
        }
    }
    return ranges;
}

function paginateChapter(ch, chIndex) {
    const segs = CHAPTER_SEGS[chIndex];
    const arts = (ch.art && ch.art.length) ? ch.art : [];
    const { usable, headHeight, artHeight } = PROBE;
    const headHtml = `<h2>${CHAPTER_LABEL(ch.num)}${ch.title}</h2>`;
    const totalH = PROBE.measure(runHtml(segs, 0, segs.length));

    // 그림이 얹힌 쪽에도 그 아래에 글이 들어간다. 그래서 담을 수 있는 높이가 쪽마다 다르다.
    const underArt = Math.max(60, usable - artHeight);
    const capsOf = slots => {
        const caps = [];
        slots.forEach(kind => { caps.push(usable); caps.push(kind === 'img' ? underArt : usable); });
        return caps;
    };

    // 그림 한 장이 펼침면 하나를 쓴다. 거기서 시작해 글이 다 들어갈 때까지 펼침면을 늘린다.
    // 쪽 수는 조각 수를 넘을 수 없다 — 빈 쪽이 생기면 안 되기 때문이다.
    const minSpreads = Math.max(arts.length, 1);
    const maxSpreads = Math.max(minSpreads, Math.floor(segs.length / 2));
    let spreadCount = minSpreads;
    while (spreadCount < maxSpreads) {
        const caps = capsOf(slotPlan(arts.length, spreadCount - arts.length));
        if (caps.reduce((a, b) => a + b, 0) >= totalH + headHeight) break;
        spreadCount++;
    }

    const anchors = (ch.artAt && ch.artAt.length === arts.length) ? ch.artAt : null;
    let tries = 0;
    let slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
    let caps = capsOf(slots);
    let ranges = fillPages(segs, caps, headHtml);
    for (let guard = 0; guard < 24; guard++) {
        // 그림을 제 장면이 있는 쪽으로 옮긴다. 옮기면 글 나눔이 달라지므로
        // 자리가 더 안 움직일 때까지 되풀이한다.
        if (anchors && tries < 10) {
            const want = anchorSlots(segs, ranges, arts.length, anchors, spreadCount);
            if (want.join() !== slots.join()) {
                tries++;
                slots = want;
                caps = capsOf(slots);
                ranges = fillPages(segs, caps, headHtml);
                continue;
            }
        }
        // 한 쪽이라도 넘치면 펼침면을 늘려 다시 나눈다.
        // 마지막 쪽만 보면 안 된다 — 첫 쪽에는 장 제목이 얹히므로 그쪽이 먼저 넘칠 수 있다.
        // 여유를 1px이나 두면 안 된다. 0.8px만 넘쳐도 그 칸에 스크롤 막대가 생기고,
        // 막대가 칸을 15px 좁히면 글이 다시 길어져 넘침이 32px로 불어난다.
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 0.25);
        if (!over || spreadCount >= maxSpreads) break;
        spreadCount++;
        tries = 0;
        slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
        caps = capsOf(slots);
        ranges = fillPages(segs, caps, headHtml);
    }

    const spreads = [];
    let pageIdx = 0;
    let artIdx = 0;
    slots.forEach((kind, s) => {
        const left = ranges[pageIdx++];
        const right = ranges[pageIdx++];
        spreads.push({
            kind: 'chapter', ch, chIndex, first: s === 0,
            art: kind === 'img' ? arts[artIdx++] : null, left, right
        });
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
                ${artFrame('cover.webp', '🐦')}
            </div>
            <div class="story-page-right">
                <h1>흥부전</h1>
                <p>흥부전은 지은이가 알려지지 않은 조선 후기 소설이에요. 판소리 흥보가로 불리던 것이 글로 옮겨진 것이지요.</p>
                <p>판소리 다섯 마당은 춘향가, 심청가, 흥보가, 수궁가, 적벽가예요. 흥보가는 그 가운데 웃음이 가장 많은 마당이랍니다.</p>
                <p>박은 옛날 집집마다 심던 덩굴 열매예요. 다 자라 속을 파내고 말리면 바가지가 되어 물을 뜨고 쌀을 담는 그릇이 되었지요. 흔한 살림살이였기 때문에 그 속에서 보물이 나온다는 이야기가 더 재미있었던 것이랍니다.</p>
                <p>제비는 봄에 왔다가 가을에 강남으로 떠나는 새예요. 옛사람들은 제비가 처마 밑에 집을 지으면 그 집에 복이 온다고 여겼답니다.</p>
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
                    <div class="story-art-top">${artFrame(spread.art, ch.emoji)}</div>
                    ${runHtml(segs, spread.right[0], spread.right[1])}
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
    { q: "놀부가 흥부를 집에서 내보낸 까닭은 무엇입니까?", choices: ["흥부가 잘못을 저질러서", "재산을 혼자 차지하려고", "아버지가 그리 이르셔서"], answer: 1 },
    { q: "흥부가 형의 집에 쌀을 얻으러 갔을 때 받은 것은 무엇입니까?", choices: ["쌀 한 되를 얻었다", "문도 열어 주지 않았다", "주걱으로 뺨을 맞았다"], answer: 2 },
    { q: "흥부는 부러진 다리를 무엇으로 감았습니까?", choices: ["나뭇조각과 실", "짚과 흙 한 줌", "지게 작대기 하나"], answer: 0 },
    { q: "이듬해 봄에 제비가 물어다 준 것은 무엇입니까?", choices: ["금덩이 하나", "박씨 하나", "밥알 한 알"], answer: 1 },
    { q: "첫 번째 박에서 나온 것은 무엇입니까?", choices: ["쏟아져 나온 비단", "집 지으러 온 목수들", "흰쌀밥이 담긴 상"], answer: 2 },
    { q: "놀부가 흥부를 찾아온 까닭은 무엇입니까?", choices: ["그동안 저지른 일을 사과하려고", "어떻게 부자가 됐는지 캐물으려고", "쌀을 조금 나눠 주려고"], answer: 1 },
    { q: "놀부는 제비에게 무엇을 했습니까?", choices: ["먹이를 잔뜩 주었다", "일부러 다리를 부러뜨렸다", "집을 새로 지어 주었다"], answer: 1 },
    { q: "놀부의 박에서 처음 나온 것은 누구입니까?", choices: ["장부를 든 사람들", "굿을 하는 무당", "곳간을 갉는 벌레 떼"], answer: 0 },
    { q: "놀부의 박에서 마지막에 나온 것은 무엇입니까?", choices: ["갑옷을 입은 장수들", "커다란 구렁이 한 마리", "끝없이 쏟아진 흙탕물"], answer: 0 },
    { q: "박이 하나씩 갈라질 때마다 놀부는 무엇을 했습니까?", choices: ["톱을 손에서 놓았다", "구경꾼들을 불러 모았다", "곳간 문을 열어야 했다"], answer: 2 },
    { q: "흥부는 찾아온 형을 어떻게 대했습니까?", choices: ["집 안으로 들여 밥상을 차렸다", "문을 닫고 돌려보냈다", "재물을 반만 나누어 주었다"], answer: 0 },
    { q: "놀부는 마지막에 박을 타서 무엇을 만들었습니까?", choices: ["멍석", "도롱이", "바가지"], answer: 2 }
];

// 선지를 세로로 쌓으니 한 쪽에 열여섯 문항이 다 들어가지 않는다. 몇 개씩 나눠 싣는다.
// 문제는 한 쪽에 다 넣고 스크롤해서 푼다.
// 쪽을 쪼개 놓으면 쪽마다 절반이 비고, 답을 고르려고 여러 번 넘겨야 한다.
const QUIZ_GROUPS = [{ from: 0, items: QUIZ }];

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

/* 읽고 나서 — 장과 같은 방식으로 쪽을 나눈다. 그림은 오른쪽 위에 얹힌다. */
const AFTERWORD = {
    title: '읽고 나서',
    emoji: '🐦',
    art: ['end.webp'],
    paras: [
        `이 이야기도 노래가 먼저였습니다. 판소리 「흥보가」를 글로 옮긴 것이 『흥부전』입니다. 지금도 판소리로 부르는 다섯 마당 가운데 하나입니다.`,
        `「흥보가」에서 가장 이름난 대목이 박을 켜는 대목입니다. 톱질하는 소리에 맞춰 부르기 때문에 「박타령」이라고 따로 부르기도 합니다. 슬근슬근 톱질하세 하는 그 소리입니다. 이 책에서 박을 켜는 대목이 유난히 길고 되풀이가 많은 것은 노래였던 흔적입니다.`,
        `형제가 하나는 착하고 하나는 못됐다가 결국 뒤집히는 이야기는 우리나라에만 있는 것이 아닙니다. 신라 사람 방이 이야기가 중국 책에 실려 전하는데, 형제가 나오고 씨앗이 나오고 금은보화가 나옵니다. 몽골에도 비슷한 이야기가 있습니다. 아주 오래되고 널리 퍼진 이야기 틀입니다.`,
        `박은 지어낸 물건이 아닙니다. 옛날에는 마당가에 박을 심어 열매를 켜서 바가지를 만들었습니다. 가난한 집이면 어디나 있던 것입니다. 이 이야기가 하필 박에서 보물이 나오게 한 것은, 가장 흔하고 값없는 것에서 뜻밖의 것이 나오게 하려던 것입니다.`,
        `제비가 은혜를 갚는 대목도 흔한 틀입니다. 다친 짐승을 살려 주었더니 갚으러 오는 이야기는 세계 어디에나 있습니다. 다만 여기서는 갚는 방법이 씨앗 하나입니다. 갚기는 갚되 당장 손에 쥐여 주지 않고, 심고 기르고 켜야 얻게 만든 것입니다.`,
        `놀부가 제비 다리를 일부러 부러뜨린 대목은 이 이야기에서 가장 서늘한 자리입니다. 흥부가 한 일을 그대로 흉내 냈는데 결과가 반대입니다. 같은 일을 했는데 왜 달랐는지, 그 답이 이 이야기 전체입니다.`,
        `원래 이야기에서 놀부의 박에서는 더 많은 것이 나옵니다. 빚쟁이와 상여꾼과 무당과 사당패가 줄줄이 나와 재물을 뜯어 갑니다. 하나가 나올 때마다 놀부가 남은 것을 헐어 갚고, 그러고도 다음 박을 켭니다. 그만두지 못하는 것이 이 사람의 병입니다.`,
        `이 이야기는 돈 이야기이기도 합니다. 놀부는 논밭을 물려받았고 흥부는 빈손으로 나갔습니다. 흥부가 게을러서 가난한 것이 아닙니다. 새벽에 나가 별을 보고 돌아왔는데도 가난했습니다. 부지런하면 잘살게 된다는 말이 언제나 맞는 말은 아니라는 것을 이 이야기가 조용히 보여 줍니다.`,
        `이 이야기가 만들어지던 조선 후기는 그런 일이 실제로 흔하던 때였습니다. 맏이가 재산을 다 받고 아우들은 빈손으로 나가는 집이 늘었습니다. 흥부 같은 사람이 마을마다 있었습니다. 그런 사람들이 이 이야기를 들으며 웃었습니다.`,
        `형수가 주걱으로 뺨을 친 대목을 다시 보십시오. 흥부가 반대쪽 뺨을 내민 것은 착해서가 아닙니다. 뺨에 붙은 밥알 때문입니다. 한 대 더 맞으면 밥알이 하나 더 붙기 때문입니다. 웃긴 대목인데 웃고 나면 마음이 좋지 않습니다. 판소리는 이런 자리를 잘 만듭니다.`,
        `끝에서 놀부를 죽이지 않은 것도 눈여겨볼 만합니다. 벌은 받았지만 목숨은 붙어 있고, 흥부가 그를 거두어들입니다. 옛이야기가 못된 사람을 다루는 방식은 대개 둘입니다. 아주 없애 버리거나, 빈털터리로 만들어 다시 시작하게 하거나. 이 이야기는 뒤쪽을 골랐습니다.`,
        `다만 이 결말을 두고는 예부터 말이 많았습니다. 놀부가 정말 뉘우친 것인지, 아니면 가진 것이 없어져서 어쩔 수 없이 고개를 숙인 것인지는 이야기가 밝혀 주지 않습니다.`,
        `흥부가 제비를 고쳐 준 것은 갚음을 바라서가 아니었습니다. 그런데 갚음을 받았습니다. 만약 아무 일도 일어나지 않았다면, 흥부가 한 일은 헛일이 되는 것일까요.`,
        `놀부가 벌을 받은 까닭은 무엇일까요? 제비 다리를 부러뜨려서일까요, 아우를 내쫓아서일까요, 아니면 갚음을 바라고 흉내 냈기 때문일까요. 셋 가운데 어느 것이 가장 큰 잘못인지 정해 보십시오.`,
        `흥부가 부자가 되지 않았어도 이 이야기가 남았을까요? 착한 사람이 반드시 잘살게 된다고 이야기가 말해 주면 마음이 놓입니다. 그러나 정말 그런지는 다른 문제입니다. 이야기가 우리에게 그렇게 말해 주는 까닭이 무엇일지 생각해 보십시오.`
    ]
};

const AFTER_SEGS = (() => {
    const segs = [];
    AFTERWORD.paras.forEach((html, paraIdx) => {
        splitSegments(html).forEach((piece, k) => {
            segs.push({ paraIdx, html: piece, start: k === 0 });
        });
    });
    return segs;
})();

const AFTER_FOOT = `<p class="after-home"><a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a></p>`;

function paginateAfterword() {
    const segs = AFTER_SEGS;
    const arts = AFTERWORD.art || [];
    const { usable, headHeight, artHeight } = PROBE;
    const headHtml = `<h2>${AFTERWORD.title}</h2>`;
    const totalH = PROBE.measure(runHtml(segs, 0, segs.length));

    const underArt = Math.max(60, usable - artHeight);

    // 맨 끝에는 학습 허브로 가는 단추가 붙는다. 그 높이를 미리 빼 두지 않으면
    // 마지막 쪽만 넘친다.
    const footH = PROBE.measure(AFTER_FOOT);

    const capsOf = slots => {
        const caps = [];
        slots.forEach(kind => { caps.push(usable); caps.push(kind === 'img' ? underArt : usable); });
        caps[caps.length - 1] = Math.max(60, caps[caps.length - 1] - footH);
        return caps;
    };

    const minSpreads = Math.max(arts.length, 1);
    const maxSpreads = Math.max(minSpreads, Math.floor(segs.length / 2));
    let spreadCount = minSpreads;
    while (spreadCount < maxSpreads) {
        const caps = capsOf(slotPlan(arts.length, spreadCount - arts.length));
        if (caps.reduce((a, b) => a + b, 0) >= totalH + headHeight) break;
        spreadCount++;
    }

    let slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
    let caps = capsOf(slots);
    let ranges = fillPages(segs, caps, headHtml);
    for (let guard = 0; guard < 8; guard++) {
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 0.25);
        if (!over || spreadCount >= maxSpreads) break;
        spreadCount++;
        slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
        caps = capsOf(slots);
        ranges = fillPages(segs, caps, headHtml);
    }

    const spreads = [];
    let pageIdx = 0;
    let artIdx = 0;
    slots.forEach((kind, s) => {
        const left = ranges[pageIdx++];
        const right = ranges[pageIdx++];
        spreads.push({
            kind: 'after', first: s === 0, last: s === slots.length - 1,
            art: kind === 'img' ? arts[artIdx++] : null, left, right
        });
    });
    return spreads;
}

function afterSpreadPage(spread) {
    const segs = AFTER_SEGS;
    const head = spread.first ? `<h2>${AFTERWORD.title}</h2>` : '';
    // 학습 허브로 돌아가는 길은 맨 끝에 한 번만 둔다.
    const foot = spread.last ? AFTER_FOOT : '';

    if (spread.art) {
        return `
            <div class="page page-story page-after">
                <div class="story-page-left">
                    ${head}
                    ${runHtml(segs, spread.left[0], spread.left[1])}
                </div>
                <div class="story-page-right story-page-right-image">
                    <div class="story-art-top">${artFrame(spread.art, AFTERWORD.emoji)}</div>
                    ${runHtml(segs, spread.right[0], spread.right[1])}
                    ${foot}
                </div>
            </div>`;
    }

    return `
        <div class="page page-story page-after">
            <div class="story-page-left">
                ${head}
                ${runHtml(segs, spread.left[0], spread.left[1])}
            </div>
            <div class="story-page-right story-page-right-text">
                ${runHtml(segs, spread.right[0], spread.right[1])}
                ${foot}
            </div>
        </div>`;
}

const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover', 'after']);

let PAGES = [];
let FOLIOS = [];

function buildPages() {
    PROBE = makeProbe();
    PAGES = [
        { kind: 'cover' },
        ...TOC_GROUPS.map((_, i) => ({ kind: 'toc', part: i })),
        ...CHAPTERS.flatMap(paginateChapter),
        ...QUIZ_GROUPS.map((_, i) => ({ kind: 'quiz', part: i })),
        ...paginateAfterword()
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
        case 'after': return afterSpreadPage(page);
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
