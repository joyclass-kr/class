const BOOK_TITLE = "콩쥐 팥쥐";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "새어머니와 검은 소",
        art: ["story-01-a.webp", "story-01-b.webp", "story-01-c.webp"],
        paras: [
            "옛날 전라도 전주 고을에 최만춘이라는 사람이 살았습니다. 늦게 얻은 딸이 하나 있었는데 이름을 콩쥐라 하였습니다. 집은 넉넉하지 않았지만 부부 사이가 좋았습니다.",
            "콩쥐가 태어난 지 백일 만에 어머니가 세상을 떠났습니다. 아버지는 딸을 업고 다니며 젖동냥을 하여 길렀습니다. 아버지는 그 뒤로 다시 장가들 생각을 하지 않았습니다. 동네 아낙들이 번갈아 젖을 물려 주었습니다.",
            "콩쥐는 손끝이 야무지고 마음이 고왔습니다. 예닐곱 살에 벌써 밥을 짓고 빨래를 했습니다. 이웃들이 혀를 내둘렀습니다.<br>\"어미 없이 자란 아이가 저리 반듯하기도 어렵지.\" 칭찬을 들어도 콩쥐는 늘 고개를 숙였습니다. 동네 아낙들이 콩쥐를 볼 때마다 어미 없이 자란 티가 안 난다고 했습니다.",
            "콩쥐가 열 살이 되던 해, 아버지가 새 아내를 맞았습니다. 배 씨라는 여인이었는데, 앞서 낳은 딸 하나를 데리고 들어왔습니다. 그 아이의 이름이 팥쥐였습니다. 팥쥐는 콩쥐보다 한 살이 위였습니다.",
            "혼례를 올리던 날, 배 씨는 콩쥐의 손을 잡고 눈물까지 흘렸습니다.<br>\"이제 내가 네 어미다. 서럽게 하지 않으마.\"<br>콩쥐는 그 말이 고마워 밤새 잠을 이루지 못했습니다. 배 씨의 손이 어찌나 따뜻하던지요.",
            "그러나 그 말은 아버지가 듣는 자리에서만 살아 있었습니다. 아버지만 그것을 끝내 알지 못했습니다.",
            "아버지가 장에 나간 첫날부터 배 씨의 얼굴이 달라졌습니다. 콩쥐에게 부엌일을 몽땅 맡기고, 팥쥐에게는 손끝 하나 까딱하지 못하게 했습니다. 문지방을 넘는 소리부터 달랐습니다. 팥쥐는 해가 중천에 뜨도록 이불 속에 있었습니다.",
            "\"콩쥐야, 물 길어라.\"<br>\"콩쥐야, 불 때라.\"<br>\"콩쥐야, 빨래하고 나서 마당도 쓸어라.\"<br>부르는 소리가 하루에도 백 번은 되었습니다. 콩쥐는 한 번도 대답을 미룬 적이 없었습니다.",
            "밥상이 두 개 차려졌습니다. 안방에는 흰쌀밥과 고깃국이 들어가고, 부엌에는 식은 보리밥 한 그릇이 남았습니다. 콩쥐는 그 밥을 부뚜막에 서서 먹었습니다.",
            "팥쥐는 어미보다 더했습니다. 일부러 마당에 물을 엎지르고는 콩쥐를 불렀습니다.<br>\"이것 좀 봐라. 네가 흘렸지?\"<br>\"내가 흘리지 않았어.\"<br>\"어머니! 콩쥐가 물을 엎지르고 거짓말해요!\" 팥쥐는 그때마다 뒤에서 웃었습니다.",
            "그때마다 배 씨는 콩쥐의 종아리를 때렸습니다. 콩쥐는 울지 않았습니다. 울면 아버지가 아실까 봐 걱정되었기 때문입니다. 종아리에 자국이 가실 날이 없었습니다. 아버지가 돌아오는 날이면 종아리 자국을 치마로 가렸습니다.",
            "아버지가 돌아오면 배 씨는 다시 다정한 얼굴이 되었습니다.<br>\"우리 콩쥐가 오늘도 어찌나 부지런한지요.\"<br>아버지는 그 말에 흐뭇해했고, 콩쥐는 아무 말도 하지 않았습니다. 아버지는 장에 다니느라 집을 자주 비웠습니다.",
            "콩쥐가 열두 살이 되던 봄이었습니다. 배 씨가 두 아이를 마당에 세워 놓고 호미를 하나씩 내주었습니다. 아직 아침 이슬도 마르지 않은 때였습니다.",
            "\"오늘은 밭을 매고 오너라. 다 매기 전에는 들어올 생각 마라.\" 해가 아직 산머리에 걸려 있었습니다.",
            "팥쥐가 받은 것은 날이 시퍼렇게 선 쇠 호미였습니다. 콩쥐가 받은 것은 나무를 깎아 만든 호미였습니다. 자루도 팥쥐 것은 매끈했고 콩쥐 것은 거칠었습니다.",
            "밭도 달랐습니다. 팥쥐에게 준 것은 집 앞 모래밭이었습니다. 콩쥐에게 준 것은 산 밑 자갈밭이었습니다. 어른도 하루에 반나절을 못 매는 밭이었습니다. 돌이 어른 주먹만 했습니다.",
            "팥쥐는 모래밭을 한 시간 만에 다 매고 돌아와 낮잠을 잤습니다. 돌아오면서 콩쥐 밭 쪽을 힐끔 보고 웃었습니다.",
            "콩쥐는 자갈밭에 엎드려 나무 호미를 내리찍었습니다. 자갈에 부딪힐 때마다 손아귀가 울렸습니다. 몇 고랑 못 가서 호미 날이 뚝 부러지고 말았습니다. 손바닥이 금세 부르텄습니다. 나무 호미는 자갈에 부딪힐 때마다 손아귀를 울렸습니다.",
            "콩쥐는 부러진 호미를 들고 밭 가운데 주저앉았습니다. 그제야 눈물이 났습니다. 해는 벌써 머리 위에 있었습니다.",
            "\"이걸로 어떻게 저 밭을 다 매나.\" 해가 벌써 기울고 있었습니다.",
            "그때 산 쪽에서 무언가 걸어 내려왔습니다. 콩쥐가 고개를 들어 보니 검은 소 한 마리였습니다. 목에 고삐도 없고 코뚜레도 없는 소였습니다. 털이 윤이 나고 뿔이 반듯한 소였습니다.",
            "소는 콩쥐 앞으로 와서 크고 검은 눈으로 한참을 들여다보았습니다. 그러고는 밭으로 들어가 앞발로 땅을 갈기 시작했습니다. 콩쥐는 무섭다는 생각이 들지 않았습니다. 숨소리가 따뜻했습니다.",
            "자갈이 튀어 오르고 흙이 뒤집혔습니다. 소가 한 바퀴를 돌 때마다 밭 한 고랑이 반듯하게 갈렸습니다. 해가 기울기 전에 밭이 다 갈렸습니다. 콩쥐는 밭둑에 서서 그 모습을 지켜보았습니다.",
            "콩쥐가 일어나 소에게 절을 했습니다.<br>\"고맙습니다. 그런데 어느 댁 소인지요.\"<br>소는 대답 대신 입에 물고 온 과일 몇 알을 콩쥐 앞에 떨어뜨렸습니다. 소의 발자국이 밭둑에 또렷했습니다. 처음 보는 붉은 과일이었습니다. 콩쥐가 그것을 주워 드는 사이에 소는 산으로 돌아갔습니다."
        ]
    },
    {
        num: 2,
        title: "밑 빠진 독과 참새 떼",
        art: ["story-02-a.webp", "story-02-b.webp", "story-02-c.webp"],
        paras: [
            "그해 가을, 마을 큰집에서 잔치가 열렸습니다. 온 마을 사람이 초대를 받았습니다. 떡을 치는 소리가 마을 어귀까지 들렸습니다.",
            "배 씨는 팥쥐에게 새 옷을 입히고 머리를 곱게 땋아 주었습니다. 콩쥐는 부엌에 서서 그 모습을 보고 있었습니다. 팥쥐는 거울 앞에서 몇 번이나 돌아보았습니다. 콩쥐의 옷은 소매가 짧아져 있었습니다.",
            "\"어머니, 저도 가고 싶습니다.\"<br>배 씨가 돌아보았습니다.<br>\"가고 싶으면 가려무나. 다만 집안일은 다 하고 가야지.\" 배 씨의 입가에 웃음이 스쳤습니다. 콩쥐의 손에는 아직 물기가 마르지 않았습니다.",
            "\"무엇을 하면 됩니까.\"<br>\"마당의 저 독에 물을 가득 채워 놓아라. 그것만 하면 된다.\" 마당 한쪽에 커다란 독이 놓여 있었습니다.",
            "콩쥐는 얼른 물동이를 이었습니다. 우물을 열 번이나 오갔습니다. 그런데 아무리 부어도 독이 차지 않았습니다. 물동이가 어깨를 짓눌렀습니다.",
            "이상해서 손을 넣어 보니 독 밑바닥에 주먹만 한 구멍이 뚫려 있었습니다. 물은 붓는 족족 땅으로 새어 나갔습니다. 누가 일부러 뚫어 놓은 구멍이었습니다. 구멍 둘레의 흙이 파여 있었습니다. 누가 손을 댄 자국이 그대로 남아 있었습니다.",
            "콩쥐는 그 자리에 주저앉았습니다. 대문 밖에서 배 씨와 팥쥐가 웃는 소리가 들려왔습니다. 두 사람은 이미 잔칫집으로 떠난 뒤였습니다. 마당에 물이 흥건했습니다.",
            "해가 뉘엿뉘엿 기울었습니다. 콩쥐는 그래도 물동이를 다시 이었습니다. 붓고 새고, 붓고 새고를 되풀이했습니다. 팔이 저리고 다리가 후들거렸습니다. 치맛자락이 다 젖었습니다. 해가 산머리에 걸리도록 물동이를 이었습니다. 어깨에 붉은 자국이 났습니다.",
            "그때 담 밑에서 무언가 뒤뚱뒤뚱 기어 나왔습니다. 커다란 두꺼비 한 마리였습니다. 등이 울퉁불퉁한 늙은 두꺼비였습니다.",
            "두꺼비가 콩쥐를 올려다보며 말했습니다.<br>\"내가 저 구멍을 막아 주마.\" 목소리가 낮고 느렸습니다.",
            "두꺼비는 독 안으로 기어 들어가 밑바닥 구멍 위에 배를 딱 붙이고 엎드렸습니다.<br>\"이제 부어라.\" 몸으로 구멍을 꽉 막은 것이었습니다.",
            "콩쥐가 물을 붓자 이번에는 새지 않았습니다. 열 동이를 붓자 독이 가득 찼습니다. 두꺼비의 등이 차가웠습니다. 콩쥐가 두꺼비를 꺼내 주며 물었습니다.<br>\"어찌 저를 도우십니까.\"<br>\"지난여름 네가 나를 마당에서 밟지 않고 비켜 갔다.\" 두꺼비의 등이 물에 잠긴 채로 꼼짝하지 않았습니다.",
            "콩쥐가 옷을 갈아입고 나서려는데 대문이 열렸습니다. 배 씨가 되돌아온 것입니다. 콩쥐의 가슴이 철렁했습니다.",
            "독이 가득 찬 것을 본 배 씨의 얼굴이 굳었습니다. 그러나 곧 아무렇지 않은 척 말했습니다.<br>\"참, 한 가지를 깜빡했구나. 곳간에 벼 석 섬이 있다. 그것을 다 찧어 놓고 오너라.\" 말끝이 유난히 부드러웠습니다. 배 씨는 콩쥐의 얼굴을 보지 않고 말했습니다. 그러고는 치맛자락을 털며 돌아섰습니다.",
            "\"석 섬을요? 오늘 안에요?\"<br>\"그럼 하지 말든가. 대신 잔치에도 오지 마라.\" 배 씨의 입가에 웃음이 스쳤습니다.",
            "배 씨는 그 말만 남기고 다시 나갔습니다.",
            "곳간 문을 열어 보니 벼가 산더미처럼 쌓여 있었습니다. 혼자서는 사흘이 걸려도 못 할 일이었습니다. 문턱까지 벼가 쏟아져 나올 지경이었습니다. 문턱에 발을 들여놓기도 어려울 지경이었습니다.",
            "콩쥐는 절구를 끌어다 놓고 벼를 한 됫박 부었습니다. 절굿공이가 어찌나 무거운지 두 손으로 겨우 들었습니다. 절구가 콩쥐 키만 했습니다.",
            "쿵. 쿵. 쿵.<br>스무 번을 찧고 나니 팔이 떨어져 나갈 것 같았습니다. 그런데 껍질을 벗긴 쌀은 겨우 한 줌이었습니다. 이마에서 땀이 뚝뚝 떨어졌습니다. 절굿공이가 손에서 자꾸 미끄러졌습니다. 콩쥐는 두 손에 침을 뱉어 다시 잡았습니다.",
            "콩쥐는 절굿공이를 놓고 마당에 주저앉았습니다.<br>\"안 되겠구나.\" 손바닥이 다 까졌습니다.",
            "그때 하늘이 갑자기 어두워졌습니다. 콩쥐가 올려다보니 구름이 아니었습니다. 참새 떼였습니다. 짹짹거리는 소리가 온 하늘을 덮었습니다.",
            "수백 마리가 마당으로 내려앉았습니다. 참새들은 벼 무더기 위에 앉아 부리로 껍질을 벗기기 시작했습니다. 마당이 참새로 하얗게 덮였습니다. 부리 소리가 소나기처럼 마당을 덮었습니다.",
            "짹짹거리는 소리와 부리 소리가 뒤섞여 온 마당이 시끄러웠습니다. 참새들은 껍질만 골라 벗기고 쌀은 한 톨도 물어 가지 않았습니다. 콩쥐는 그 자리에 서서 보고만 있었습니다.",
            "한 시간이 채 못 되어 벼 석 섬이 하얀 쌀이 되었습니다. 참새들이 한꺼번에 날아오르며 지붕 위를 한 바퀴 돌았습니다.<br>콩쥐가 손을 흔들었습니다.<br>\"고맙습니다! 콩쥐가 마당 한가운데에 서 있었습니다. 고맙습니다!\""
        ]
    },
    {
        num: 3,
        title: "잃어버린 꽃신",
        art: ["story-03-a.webp", "story-03-b.webp", "story-03-c.webp"],
        paras: [
            "일은 다 끝났지만 콩쥐에게는 입고 갈 옷이 없었습니다. 저고리는 소매가 해지고 치마는 무릎이 나가 있었습니다. 신도 짚신 한 켤레가 전부였습니다.",
            "콩쥐가 우물가에서 얼굴을 씻고 있는데, 물 위에 무언가가 비쳤습니다. 돌아보니 하늘에서 무엇이 내려오고 있었습니다. 햇빛이 아닌 다른 빛이었습니다. 물빛이 잔잔했습니다.",
            "연둣빛 저고리와 다홍치마가 마당에 사뿐 내려앉았습니다. 그 위에는 곱게 수를 놓은 꽃신 한 켤레가 놓여 있었습니다. 옷감에서 은은한 향이 났습니다. 옷감에서 은은한 향이 났습니다. 손끝에 닿는 감촉이 물처럼 부드러웠습니다.",
            "콩쥐는 한참 동안 그것을 만지지 못했습니다. 그러다 문득 검은 소가 떠올랐습니다. 두꺼비가, 참새 떼가 떠올랐습니다. 모두 아무 말 없이 도와준 것들이었습니다.",
            "콩쥐는 옷을 갈아입고 꽃신을 신었습니다. 발에 꼭 맞았습니다. 신코에 수놓은 꽃이 살아 있는 듯했습니다.",
            "잔칫집으로 가는 길에 개울이 하나 있었습니다. 다리라고는 통나무 하나뿐이었습니다. 콩쥐가 조심조심 건너기 시작했습니다. 물살이 제법 셌습니다. 통나무가 이끼에 덮여 미끄러웠습니다. 콩쥐는 두 팔을 벌리고 한 걸음씩 옮겼습니다.",
            "개울 한복판에 이르렀을 때였습니다. 저쪽 길에서 요란한 소리가 났습니다.<br>\"물렀거라! 감사<span class=\"gloss\">(한 도를 다스리던 가장 높은 벼슬)</span> 나리 행차시다!\" 말발굽 소리가 땅을 울렸습니다.",
            "말을 탄 행렬이 다가왔습니다. 콩쥐는 놀라서 서두르다가 그만 발을 헛디뎠습니다. 징 소리가 귀를 울렸습니다.",
            "첨벙— 하고 한쪽 발이 물에 빠졌습니다. 그 바람에 꽃신 한 짝이 발에서 벗겨져 물살에 떠내려갔습니다. 잡으려 손을 뻗었지만 이미 늦었습니다.",
            "콩쥐는 급히 개울을 건너 길가 나무 뒤에 몸을 숨겼습니다. 한 짝만 신은 발이 부끄러웠습니다. 한 짝만 신은 발이 부끄러워 치마를 끌어당겼습니다.",
            "행렬이 개울가에 이르렀을 때, 감사가 말을 세웠습니다. 물가 풀숲에 무언가 걸려 있었기 때문입니다. 햇빛에 무언가 반짝였습니다.",
            "하인이 건져 올린 것은 수를 놓은 꽃신 한 짝이었습니다. 감사는 그것을 한참 들여다보았습니다.<br>\"이런 신을 지을 사람이 이 고을에 있었더냐.\"<br>그러고는 하인에게 일렀습니다.<br>\"이 신의 임자를 찾아라.\" 수가 어찌나 고운지 손이 다 떨렸습니다.",
            "이튿날부터 고을에 방이 붙었습니다. 꽃신 한 짝의 임자를 찾는다는 것이었습니다. 장터에도 우물가에도 같은 방이 붙었습니다.",
            "집집마다 처녀들이 나와 신을 신어 보았습니다. 그러나 발에 맞는 사람이 하나도 없었습니다. 크면 헐렁하고 작으면 들어가지 않았습니다. 하인들이 고을을 사흘이나 돌았습니다. 큰 발은 억지로 밀어 넣다 신코가 터졌고, 작은 발은 신이 벗겨져 굴렀습니다.",
            "사흘째 되던 날, 하인들이 최만춘의 집 앞에 이르렀습니다. 대문 앞에 사람이 몰려들었습니다.",
            "배 씨는 소식을 듣자마자 팥쥐를 안방으로 끌고 들어갔습니다.<br>\"이건 하늘이 준 기회다.\" 문을 닫고 목소리를 낮추었습니다.",
            "배 씨는 팥쥐의 발에 참기름을 바르고 억지로 신을 밀어 넣었습니다. 팥쥐의 발은 콩쥐보다 훨씬 컸습니다. 발가락이 접혀 들어갔습니다. 팥쥐가 비명을 지르며 발을 뺐습니다. 배 씨는 그 발을 붙들고 다시 밀어 넣었습니다.",
            "\"아파요! 어머니!\"<br>\"참아라! 조금만 참으면 감사 댁 마님이 된다!\" 팥쥐의 얼굴이 일그러졌습니다.",
            "발뒤꿈치가 반이나 밖으로 나와 있었습니다. 배 씨는 치마를 길게 늘어뜨려 발을 가렸습니다. 걸을 때마다 신이 벗겨지려 했습니다.",
            "팥쥐가 절뚝거리며 마당으로 나갔습니다.<br>\"제 신입니다.\" 목소리가 기어들어 갔습니다.",
            "하인이 치마를 걷어 보라 하였습니다. 팥쥐가 뒷걸음질을 쳤습니다. 그 바람에 신이 툭 벗겨지고 말았습니다. 마당이 조용해졌습니다.",
            "그때 부엌 문틈으로 지켜보던 콩쥐가 있었습니다. 배 씨는 콩쥐를 부엌에 가두고 밖에서 빗장을 질러 놓았습니다. 부엌에는 창도 없었습니다. 콩쥐는 문틈으로 마당을 내다볼 뿐 소리를 내지 못했습니다.",
            "그런데 마당의 감나무에서 까치가 요란하게 울었습니다.<br>\"깍깍! 부엌이다! 부엌!\" 까치는 지붕 위를 몇 바퀴나 돌았습니다.",
            "하인이 이상히 여겨 부엌 문을 열었습니다. 그을음 묻은 얼굴의 처녀 하나가 서 있었습니다. 마당이 조용해졌습니다. 발에는 꽃신 한 짝이 신겨 있었습니다.<br>하인이 들고 온 다른 한 짝을 내밀자, 콩쥐의 발이 그 안에 꼭 들어갔습니다."
        ]
    },
    {
        num: 4,
        title: "감사 댁과 연못",
        art: ["story-04-a.webp", "story-04-b.webp", "story-04-c.webp"],
        paras: [
            "콩쥐는 감사 댁으로 가게 되었습니다. 아버지 최만춘은 딸의 손을 잡고 한참을 놓지 못했습니다. 가마가 대문을 나설 때까지 손을 흔들었습니다.",
            "\"내가 못난 아비였구나. 네가 그리 고생하는 줄을 여태 몰랐다.\"<br>\"아닙니다, 아버지.\" 아버지의 손이 거칠어져 있었습니다.",
            "혼례를 올리던 날, 배 씨와 팥쥐도 자리에 앉았습니다. 두 사람의 얼굴은 웃고 있었지만 눈은 웃지 않았습니다. 잔칫상이 마당 가득 차려졌습니다.",
            "감사 댁에서의 나날은 콩쥐에게 낯설었습니다. 아침에 눈을 뜨면 누군가 이미 물을 길어다 놓았고, 밥상이 차려져 있었습니다. 방이 하도 넓어 잠이 오지 않았습니다.",
            "콩쥐는 그것이 도무지 익숙해지지 않아 새벽마다 몰래 일어나 마당을 쓸었습니다. 하인들이 놀라 말렸습니다.<br>\"마님, 그런 일은 저희가 합니다.\"<br>\"손이 심심해서요.\" 하인들이 그 말에 서로 얼굴을 쳐다보았습니다.",
            "감사가 그 말을 듣고 웃었습니다.<br>\"부인은 아직도 그 집 부엌에 있는 모양이오.\" 콩쥐는 그 말에 얼굴을 붉혔습니다.",
            "어느 날 감사가 물었습니다.<br>\"부인, 무엇이든 가지고 싶은 것을 말해 보시오. 다 들어주겠소.\" 비단이든 패물이든 무엇이든 좋다고 했습니다.",
            "콩쥐는 한참을 생각하다 대답했습니다.<br>\"검은 소 한 마리를 찾아 주십시오.\" 감사가 눈을 껌뻑였습니다.",
            "\"검은 소라니요.\"<br>\"제가 어려울 때 자갈밭을 갈아 준 소가 있습니다. 목에 고삐도 코뚜레도 없었습니다. 이제는 제가 그 소를 먹여 주고 싶습니다.\" 감사가 눈을 크게 떴습니다.",
            "감사는 사람을 풀어 온 고을을 뒤졌습니다. 그러나 그런 소를 보았다는 사람은 아무도 없었습니다. 장마당에도 사람을 보내 물었습니다.",
            "대신 이상한 일이 있었습니다. 감사 댁 뒤뜰 연못가에 어느 날부터 두꺼비 한 마리가 나와 앉아 있게 된 것입니다. 콩쥐는 날마다 그 앞에 밥알을 놓아 주었습니다. 아무리 쫓아도 이튿날이면 그 자리에 다시 와 있었습니다. 두꺼비는 사람이 다가가도 달아나지 않았습니다.",
            "그리고 처마에는 참새들이 유난히 많이 모여들었습니다. 하인들이 쫓으려 하면 콩쥐가 말렸습니다.<br>\"그냥 두세요. 저 새들은 제 손님입니다.\" 처마 밑이 늘 소란스러웠습니다.",
            "몇 달이 지난 어느 날, 배 씨와 팥쥐가 감사 댁을 찾아왔습니다. 손에 무엇 하나 들지 않은 채였습니다.",
            "팥쥐는 예전과 딴판으로 다정했습니다.<br>\"언니, 그동안 내가 못되게 굴었어. 미안해.\"<br>콩쥐는 그 말에 눈물이 났습니다.<br>\"괜찮아. 다 지난 일인걸.\" 팥쥐의 눈은 웃지 않았습니다.",
            "그날부터 팥쥐는 자주 드나들었습니다. 콩쥐는 올 때마다 반가워하며 밥을 차리고 옷감을 내주었습니다. 감사도 처제라 하여 잘 대접했습니다. 콩쥐는 그것을 조금도 아까워하지 않았습니다. 감사는 처제가 자주 오는 것을 좋은 일이라 여겼습니다.",
            "그러던 어느 여름날이었습니다. 감사가 나랏일로 한양에 올라가 여러 날 집을 비우게 되었습니다. 콩쥐가 대문까지 나와 배웅했습니다.",
            "팥쥐가 찾아와 말했습니다.<br>\"언니, 날이 덥지? 뒤뜰 연못에서 몸이나 씻자.\" 팥쥐의 목소리가 유난히 다정했습니다.",
            "두 사람이 연못가로 갔습니다. 물이 맑고 연잎이 넓게 깔려 있었습니다. 매미 소리가 요란했습니다.",
            "\"언니가 먼저 들어가 봐. 물이 시원한지.\"<br>콩쥐가 옷을 걷고 물가에 앉았습니다. 발을 담그니 정말로 시원했습니다. 물이 무릎까지 찼습니다. 연못 가장자리에 이끼가 파랗게 끼어 있었습니다.",
            "\"언니, 저기 봐. 연꽃이 폈어.\"<br>콩쥐가 팥쥐가 가리키는 쪽으로 고개를 돌렸습니다. 연잎 사이로 아무것도 보이지 않았습니다.",
            "바로 그 순간이었습니다. 등 뒤에서 두 손이 콩쥐를 힘껏 밀었습니다.",
            "첨벙— 하는 소리가 났습니다. 물결이 몇 번 크게 일었다가 이내 잔잔해졌습니다. 연잎 몇 장이 뒤집혔다가 다시 가라앉았습니다.",
            "팥쥐는 한참 동안 연못을 내려다보았습니다. 그러고는 콩쥐가 벗어 놓은 옷을 주워 입고, 콩쥐의 방으로 들어가 문을 걸어 잠갔습니다. 손끝이 잘게 떨렸습니다. 콩쥐의 신 한 켤레가 연못가에 그대로 놓여 있었습니다.",
            "그날 밤 연못가에서는 두꺼비 한 마리가 물가를 오래도록 맴돌았습니다. 그리고 지붕에서는 참새들이 밤새 잠들지 못하고 짹짹거렸습니다. 아무도 그 뜻을 알지 못했습니다."
        ]
    },
    {
        num: 5,
        title: "붉은 연꽃",
        art: ["story-05-a.webp", "story-05-b.webp", "story-05-c.webp"],
        paras: [
            "감사가 한양에서 돌아왔습니다. 말에서 내리자마자 안채로 걸음을 옮겼습니다.",
            "방문을 열자 부인이 이불을 뒤집어쓰고 누워 있었습니다.<br>\"부인, 어디 편찮으시오?\"<br>\"…얼굴에 종기가 나서 뵐 수가 없습니다.\"",
            "목소리가 이상했습니다. 그러나 감사는 병 때문이려니 하였습니다. 평소보다 한결 낮고 걸걸했습니다.",
            "며칠이 지나 부인이 자리에서 일어났습니다. 얼굴이 달라져 있었습니다. 감사가 놀라 물었습니다.<br>\"어찌 이리 얼굴이 상하셨소.\"<br>\"병을 앓고 나서 그렇습니다.\" 목소리마저 굵어져 있었습니다.",
            "감사는 고개를 갸웃했습니다. 얼굴만 달라진 것이 아니었습니다. 부인은 더 이상 새벽에 마당을 쓸지 않았고, 두꺼비에게 밥알을 놓아 주지 않았습니다. 웃음소리도 달라져 있었습니다. 웃는 소리도, 걷는 걸음도 예전 부인이 아니었습니다.",
            "오히려 하인을 시켜 처마의 참새 둥지를 다 헐어 버리게 했습니다. 새끼 참새들이 마당에 떨어져 울었습니다.",
            "그 무렵 뒤뜰 연못에 붉은 연꽃 한 송이가 피었습니다. 다른 연꽃은 아직 봉오리도 맺히지 않았는데 그 한 송이만 활짝 피었습니다. 빛깔이 어찌나 붉은지 멀리서도 눈에 띄었습니다.",
            "감사는 그 꽃이 마음에 들어 날마다 연못가에 나가 보았습니다. 그런데 이상한 일이 있었습니다. 감사가 지나가면 연꽃이 고개를 들었고, 부인이 지나가면 꽃잎이 오므라들었습니다. 감사가 고개를 갸웃했습니다. 감사는 그것이 이상해 몇 번이나 다시 나가 보았습니다.",
            "한번은 부인이 연못가를 지나는데, 연꽃 줄기가 휘어 부인의 머리채를 후려쳤습니다. 바람 한 점 없는 날이었습니다.",
            "부인이 비명을 지르며 하인을 불렀습니다.<br>\"저 꽃을 당장 꺾어서 아궁이에 넣어라!\"",
            "연꽃은 아궁이에 던져졌습니다. 그런데 불에 타지 않았습니다. 잿더미 속에서 붉은 구슬 하나가 반짝이고 있었습니다. 아무리 불을 지펴도 꽃잎이 그대로였습니다.",
            "그것을 발견한 것은 부엌일을 하던 늙은 할멈이었습니다. 할멈은 그 구슬을 주워 치마 주머니에 넣었습니다. 어쩐지 버릴 수가 없었습니다. 구슬이 손안에서 따뜻했습니다. 잿더미 속에서 그것만 뜨겁지 않았습니다.",
            "할멈은 그 구슬을 제 방 문갑 위에 올려 두었습니다. 구슬에서 은은한 빛이 났습니다.",
            "그날 밤이었습니다. 할멈이 잠결에 눈을 떴는데, 방 안에 사람이 앉아 있었습니다. 등잔불도 켜지 않은 캄캄한 방이었습니다.",
            "젊은 여인이었습니다. 할멈이 소스라쳐 일어나려는데, 여인이 조용히 말했습니다.<br>\"할머니, 접니다. 콩쥐입니다.\" 얼굴이 낯익은데도 한참을 알아보지 못했습니다.",
            "할멈이 입을 틀어막았습니다.<br>\"마, 마님……. 마님은 방에 계신데.\" 다리가 후들거려 일어설 수가 없었습니다.",
            "\"저 방에 있는 것은 제 아우 팥쥐입니다. 저는 지난여름 연못에서 그 아이의 손에 밀렸습니다.\" 할멈의 손이 떨렸습니다.",
            "할멈은 그제야 그동안의 일이 하나로 꿰어졌습니다. 달라진 얼굴, 달라진 목소리, 헐린 참새 둥지. 할멈의 등에 소름이 돋았습니다.",
            "\"어찌하면 좋습니까.\"<br>\"영감마님께 아뢰어 주십시오. 다만 말로만 하면 믿지 않으실 겁니다.\" 할멈은 손이 떨려 등잔을 놓칠 뻔했습니다.",
            "콩쥐가 방법을 일러 주었습니다. 그러고는 스르르 사라졌습니다.",
            "이튿날, 할멈은 감사를 제 방으로 청했습니다. 감사가 무슨 일인가 하여 따라 들어갔습니다. 방문을 조심스레 닫았습니다.",
            "할멈은 상 위에 젓가락 한 쌍을 놓았습니다. 그런데 한 짝은 길고 한 짝은 짧았습니다. 감사가 눈살을 찌푸렸습니다.",
            "\"이런 젓가락으로 어찌 밥을 먹으라는 것이냐.\"<br>할멈이 고개를 숙였습니다.<br>\"영감마님께서는 짝이 안 맞는 젓가락은 금방 알아보시면서, 짝이 바뀐 사람은 어찌 모르십니까.\" 감사가 젓가락을 들었다가 도로 내려놓았습니다.",
            "감사의 얼굴이 굳었습니다. 바로 그때 문갑 위의 붉은 구슬이 데굴데굴 굴러 감사의 발 앞에 멈춰 섰습니다. 구슬에서 붉은빛이 번졌습니다. 그러고는 방 안 가득 낮은 목소리가 번졌습니다.<br>\"나리, 저를 좀 보십시오.\""
        ]
    },
    {
        num: 6,
        title: "연못을 치다",
        art: ["story-06-a.webp", "story-06-b.webp", "story-06-c.webp"],
        paras: [
            "이튿날 새벽, 감사는 하인들을 모두 불러 모았습니다.<br>\"뒤뜰 연못의 물을 다 퍼내라.\" 아직 해도 뜨지 않은 때였습니다.",
            "두레박과 물통이 총동원되었습니다. 반나절이 지나자 연못 바닥이 드러났습니다. 물이 줄어들수록 하인들의 손이 빨라졌습니다.",
            "진흙 속에 무언가 있었습니다. 하인들이 조심조심 진흙을 걷어 냈습니다. 아무도 숨을 쉬지 못했습니다. 진흙이 무릎까지 왔습니다.",
            "콩쥐가 잠든 듯이 누워 있었습니다. 그런데 얼굴빛이 산 사람과 다르지 않았고, 몸이 조금도 상하지 않았습니다. 몇 달 동안 두꺼비가 그 곁을 지켰다고 했습니다. 옷자락에 진흙이 묻었을 뿐 얼굴은 잠든 사람 같았습니다.",
            "감사가 콩쥐를 안아 올려 마른 자리에 눕혔습니다. 할멈이 붉은 구슬을 콩쥐의 손에 쥐여 주었습니다. 옷자락에서 물이 뚝뚝 떨어졌습니다.",
            "구슬이 스르르 스며들 듯 사라지자, 콩쥐가 크게 숨을 들이켰습니다. 그러고는 눈을 떴습니다. 온 마당이 조용해졌습니다.",
            "\"…나리.\"<br>감사가 아무 말도 하지 못하고 콩쥐의 손을 잡았습니다. 콩쥐의 손이 아직 차가웠습니다.",
            "그 소식이 안채에 닿았습니다. 팥쥐는 옷도 제대로 갖춰 입지 못한 채 담을 넘어 달아나려 했습니다. 그러나 대문 앞에서 붙들리고 말았습니다. 짐도 챙기지 못한 채였습니다. 담을 넘다가 치마가 걸려 그대로 굴러떨어졌습니다.",
            "팥쥐와 배 씨가 마당에 끌려 나왔습니다. 감사가 호령했습니다.<br>\"이 죄가 어떤 죄인지 아느냐. 관가로 넘겨 국법대로 다스리겠다.\"",
            "그때 콩쥐가 감사의 소매를 잡았습니다.<br>\"나리, 잠깐만요.\" 마당에 있던 사람들이 모두 콩쥐를 보았습니다.",
            "콩쥐는 마당으로 내려가 두 사람 앞에 섰습니다. 팥쥐가 고개를 들지 못했습니다. 팥쥐의 어깨가 떨렸습니다.",
            "\"팥쥐야.\"<br>\"…언니.\"<br>\"나는 네가 왜 나를 밀었는지 안다. 어릴 적부터 어머니가 너에게 나보다 앞서라고만 하셨지.\"<br>배 씨가 그 말에 얼굴을 감쌌습니다. 콩쥐의 목소리에는 미움이 없었습니다. 팥쥐의 어깨가 잘게 떨렸습니다. 배 씨는 그 자리에 주저앉았습니다.",
            "콩쥐가 감사를 돌아보았습니다.<br>\"나리, 이 사람들을 옥에 가두지 말아 주십시오.\"",
            "감사가 어이없어했습니다.<br>\"부인, 이자들이 부인을 물에 밀어 넣었소.\"<br>\"압니다. 그래도 옥은 아니 됩니다.\" 감사의 목소리가 높아졌습니다.",
            "\"그러면 어찌하란 말이오.\"<br>\"이 고을 밖으로 내보내 주십시오. 다시는 이 땅에 들이지 마십시오.\" 감사가 한참을 생각했습니다.",
            "\"그것이 벌이 되겠소?\"<br>콩쥐가 조용히 말했습니다.<br>\"저 사람들이 평생 바란 것이 이 집 안방이었습니다. 그 문 밖으로 내보내는 것보다 아픈 벌이 있겠습니까.\" 감사가 한참 만에 고개를 끄덕였습니다.",
            "배 씨와 팥쥐는 그날로 고을 밖으로 쫓겨났습니다. 대문을 나서면서 팥쥐가 딱 한 번 뒤를 돌아보았습니다. 콩쥐는 그 자리에 서서 끝까지 지켜보았습니다. 아무 말도 하지 않았습니다.",
            "아버지 최만춘은 그 뒤 딸의 집 가까이로 옮겨 와 살았습니다. 아버지는 딸을 볼 때마다 미안하다는 말을 했고, 콩쥐는 그때마다 밥상을 한 번 더 차렸습니다.",
            "그해 가을, 감사가 콩쥐를 데리고 산자락으로 나갔습니다.<br>\"부인이 찾던 소를 보았다는 사람이 나타났소.\" 가을볕이 좋은 날이었습니다.",
            "산 밑 자갈밭에 소 한 마리가 서 있었습니다. 검고 늙은 소였습니다. 목에는 고삐도 코뚜레도 없었습니다. 소의 등에 흙이 묻어 있었습니다.",
            "콩쥐가 다가가자 소가 고개를 들었습니다. 크고 검은 눈이 그때와 똑같았습니다. 콩쥐의 눈에 눈물이 고였습니다. 소가 콩쥐의 어깨에 코를 대고 킁킁거렸습니다.",
            "콩쥐는 소의 목을 끌어안았습니다. 오래도록 놓지 않았습니다.<br>\"이제 밭은 안 갈아도 됩니다.\"",
            "검은 소는 감사 댁 뒤뜰에서 여생을 보냈습니다. 그 곁에는 두꺼비가 늘 앉아 있었고, 처마에는 참새들이 다시 둥지를 틀었습니다. 뒤뜰이 늘 부산했습니다.",
            "사람들은 콩쥐를 두고 복이 많은 사람이라고 했습니다. 그러나 콩쥐는 그 말을 들을 때마다 고개를 저었습니다. 콩쥐는 그 말이 부끄러웠습니다.",
            "\"복이 아닙니다. 제가 어려울 때 저를 도와준 것들이 있었을 뿐입니다. 소도, 두꺼비도, 참새도, 할머니도요.\" 말하면서 콩쥐는 뒤뜰 쪽을 보았습니다.",
            "그러고는 이렇게 덧붙였습니다.<br>\"그것들이 왜 나를 도왔는지는 나도 몰랐습니다. 나중에 알고 보니, 내가 언젠가 밟지 않고 비켜 간 것들이더군요.\""
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

    let slots = slotPlan(arts.length, Math.max(0, spreadCount - arts.length));
    let caps = capsOf(slots);
    let ranges = fillPages(segs, caps, headHtml);
    for (let guard = 0; guard < 8; guard++) {
        // 한 쪽이라도 넘치면 펼침면을 늘려 다시 나눈다.
        // 마지막 쪽만 보면 안 된다 — 첫 쪽에는 장 제목이 얹히므로 그쪽이 먼저 넘칠 수 있다.
        // 여유를 1px이나 두면 안 된다. 0.8px만 넘쳐도 그 칸에 스크롤 막대가 생기고,
        // 막대가 칸을 15px 좁히면 글이 다시 길어져 넘침이 32px로 불어난다.
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
                ${artFrame('cover.webp', '👟')}
            </div>
            <div class="story-page-right">
                <h1>콩쥐 팥쥐</h1>
                <p>콩쥐 팥쥐는 지은이가 알려지지 않은 조선 후기 소설이에요. 전라도 전주 지방을 무대로 삼고 있답니다.</p>
                <p>이 이야기는 세계 곳곳에 퍼져 있는 신데렐라형 이야기 가운데 하나예요. 잃어버린 신 한 짝으로 사람을 찾아낸다는 대목이 똑같이 나온답니다.</p>
                <p>그 가운데 가장 오래된 것은 중국 당나라 때 책 유양잡조에 실린 섭한 이야기예요. 천이백 년쯤 전에 적힌 글이니 유럽의 신데렐라보다 팔백 년이나 앞선 셈이지요.</p>
                <p>콩쥐를 돕는 것은 요정이 아니라 검은 소와 두꺼비와 참새 떼예요. 우리 옛이야기에서는 도움이 하늘에서 내려오지 않고 늘 논밭에서 걸어 나온답니다.</p>
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
    { q: "계모가 콩쥐에게 준 호미는 어떤 것이었습니까?", choices: ["쇠로 만든 새 호미", "나무로 만든 호미", "날이 아주 무딘 호미"], answer: 1 },
    { q: "자갈밭을 대신 갈아 준 것은 무엇입니까?", choices: ["이웃집 머슴", "지나가던 나그네", "검은 소 한 마리"], answer: 2 },
    { q: "밑 빠진 독을 막아 준 것은 무엇입니까?", choices: ["두꺼비 한 마리", "커다란 자라", "구렁이 한 마리"], answer: 0 },
    { q: "벼 석 섬을 찧어 준 것은 무엇입니까?", choices: ["까치 떼", "제비 떼", "참새 떼"], answer: 2 },
    { q: "콩쥐가 잔치에 가면서 잃어버린 것은 무엇입니까?", choices: ["꽃신 한 짝", "옥비녀 하나", "비단 손수건"], answer: 0 },
    { q: "꽃신을 주운 사람은 누구입니까?", choices: ["잔칫집 주인", "그 고을 감사", "장터의 장사꾼"], answer: 1 },
    { q: "팥쥐는 꽃신을 신으려고 무엇을 했습니까?", choices: ["신을 몰래 늘렸다", "발을 억지로 밀어 넣었다", "다른 신을 대신 내놓았다"], answer: 1 },
    { q: "콩쥐가 감사 댁으로 간 뒤 계모는 무엇을 했습니까?", choices: ["먼 고을로 이사를 가 버렸다", "콩쥐를 찾아가 사과를 했다", "팥쥐를 대신 들여보내려 했다"], answer: 2 },
    { q: "연못가에서 피어난 것은 무엇입니까?", choices: ["붉은 연꽃 한 송이", "하얀 매화 한 그루", "노란 국화 한 무더기"], answer: 0 },
    { q: "할멈이 감사 앞에 내놓은 것은 무엇입니까?", choices: ["콩쥐가 쓰던 나무 빗", "연못에서 건진 꽃신", "짝이 안 맞는 젓가락"], answer: 2 },
    { q: "콩쥐가 팥쥐 모녀에게 내린 벌은 무엇입니까?", choices: ["고을 밖으로 내보냈다", "옥에 가두었다", "집 안에 그대로 두었다"], answer: 0 },
    { q: "콩쥐가 감사에게 부탁한 것은 무엇입니까?", choices: ["꽃신을 돌려 달라고", "검은 소를 찾아 달라고", "연못을 메워 달라고"], answer: 1 }
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
    emoji: '🌺',
    art: ['end.webp'],
    paras: [
        `이 이야기를 읽으면서 어디서 들어 본 것 같다고 느꼈다면 맞습니다. 어머니를 여읜 딸, 새로 온 어머니와 그 딸, 궂은일, 잃어버린 신 한 짝, 그 신으로 사람을 찾는 일. 신데렐라와 뼈대가 같습니다.`,
        `이런 뼈대의 이야기는 세계에 수백 가지가 있습니다. 학자들이 하나하나 모아 세어 보았더니 대륙마다 나왔습니다. 서로 만난 적 없는 곳에서 같은 이야기가 나온 것이 아니라, 아주 오래전부터 사람에서 사람으로 건너다닌 이야기로 봅니다.`,
        `「섭한」에서 딸을 돕는 것은 물고기 한 마리입니다. 유럽에서는 요정이나 나무이고요. 뼈대는 그대로인데 돕는 쪽만 그 땅에서 가장 가까운 것으로 바뀝니다.`,
        `우리 이야기가 그 이야기들과 뚜렷하게 다른 데가 한 군데 있습니다. 결혼에서 끝나지 않는다는 것입니다. 서양 신데렐라는 신발이 맞고 나면 행복하게 살았다는 말로 끝납니다. 콩쥐 팥쥐는 거기가 절반입니다. 사 장부터가 진짜입니다.`,
        `뒷부분은 콩쥐가 연못에 빠진 뒤부터입니다. 콩쥐는 붉은 연꽃으로, 구슬로 모습을 바꾸어 가며 자기가 여기 있다고 알립니다. 사라진 사람이 사라진 채로 끝나지 않고 기어이 제 자리를 되찾는 이야기입니다. 서양 신데렐라에는 이런 대목이 아예 없습니다.`,
        `그래서 콩쥐 팥쥐는 책마다 끝나는 자리가 다릅니다. 신발이 맞는 데서 덮는 책도 있고 연못까지 가는 책도 있습니다. 이 책은 연못까지 갑니다. 그 뒤가 있어야 이 이야기가 우리 이야기가 되기 때문입니다.`,
        `콩쥐를 도운 것이 무엇이었는지 한번 세어 보십시오. 검은 소, 두꺼비, 참새 떼, 그리고 선녀입니다. 요정 대모도 마법 지팡이도 없습니다. 밭 갈던 소와 마당의 두꺼비와 처마의 참새입니다. 옛사람들이 날마다 보던 것들이 그대로 돕는 편이 된 것입니다.`,
        `밑 빠진 독 대목은 특히 눈여겨볼 만합니다. 두꺼비가 한 일은 물을 길어 준 것이 아닙니다. 제 몸으로 구멍을 막았을 뿐입니다. 콩쥐는 그대로 제 힘으로 물을 길어 부었습니다. 도움이란 대신 해 주는 것이 아니라 할 수 있게 해 주는 것이라는 말을, 이 대목이 말없이 하고 있습니다.`,
        `신 한 짝으로 사람을 찾는다는 것도 생각해 보면 이상한 일입니다. 발 크기가 같은 사람은 얼마든지 있습니다. 그런데도 이런 이야기가 세계 곳곳에 있는 까닭은, 신이란 것이 본래 그 사람이 어디를 어떻게 걸어왔는지를 담은 물건이기 때문일 것입니다.`,
        `팥쥐도 다시 보아야 할 사람입니다. 이 아이가 태어날 때부터 못됐던 것은 아닙니다. 어머니가 시키는 대로 했고, 어머니가 하는 것을 보고 배웠습니다. 마지막에 무너져 앉은 사람이 팥쥐가 아니라 배 씨였던 것도 그래서입니다.`,
        `아버지 이야기도 빼놓을 수 없습니다. 이 사람은 아무 잘못도 하지 않았습니다. 다만 집에 없었습니다. 장에 다니느라 딸의 종아리를 한 번도 보지 못했습니다. 나쁜 일이 벌어지는 데 나쁜 사람만 필요한 것은 아니라는 것을 이 사람이 보여 줍니다.`,
        `마지막 쪽에서 콩쥐가 복이 많다는 말을 부끄러워한 대목을 기억하십시오. 이 이야기가 끝내 하고 싶었던 말이 거기 있습니다.`,
        `콩쥐가 도움을 받은 것은 착해서였을까요, 운이 좋아서였을까요? 콩쥐 자신은 언젠가 밟지 않고 비켜 간 것들이었다고 했습니다. 그렇다면 착한 것과 운이 좋은 것은 다른 일일까요, 같은 일일까요.`,
        `콩쥐는 왜 연꽃으로, 구슬로 모습을 바꾸어 가며 자기를 알렸을까요? 곧바로 나서서 말하면 될 일인데 그러지 않았습니다. 말해도 믿어 주지 않을 사람들 앞에서 무엇을 할 수 있을지 생각해 보십시오.`,
        `배 씨는 왜 콩쥐를 미워했을까요? 콩쥐가 배 씨에게 잘못한 일은 하나도 없습니다. 아무 잘못도 하지 않은 사람을 미워하게 되는 일이 어떻게 생기는지, 이 물음에는 이야기가 답해 주지 않습니다.`
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
