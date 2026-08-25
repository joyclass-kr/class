const BOOK_TITLE = "춘향전";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "광한루에서",
        art: ["story-01-a.png", "story-01-b.png", "story-01-c.png"],
        paras: [
            "전라도 남원 땅에 광한루라는 누각이 있었습니다. 앞으로는 맑은 물이 흐르고 둘레에는 버드나무가 늘어져, 남원에서 경치 좋기로 으뜸가는 자리였습니다. 봄이면 꽃구경 온 사람으로 난간이 비좁았습니다. 난간에 기대면 남원 성안이 한눈에 들어왔습니다. 봄이면 강가에 사람이 그득했습니다.",
            "그해 단오였습니다. 단오는 음력 오월 초닷샛날로, 여자들은 창포물에 머리를 감고 그네를 뛰고 남자들은 씨름을 하는 큰 명절이었습니다. 아침부터 강가에 사람이 그득했습니다.",
            "남원 사또의 아들 이몽룡은 그날 방자<span class=\"gloss\">(관가에서 심부름하던 남자 하인)</span>를 데리고 광한루에 올랐습니다. 나이 열여섯, 글은 잘 읽었으나 아직 세상 구경은 못 해 본 도령이었습니다. 아버지가 글만 읽으라 하여 바깥출입이 드물었습니다. 아버지가 글만 읽으라 하여 광한루에 오른 것도 그날이 처음이었습니다.",
            "\"방자야, 저 아래가 다 보이는구나.\"<br>\"그럼입쇼. 남원 바닥에서 여기보다 높은 데가 어디 있습니까.\"",
            "이몽룡이 난간에 기대어 사방을 둘러보는데, 문득 저 건너 버드나무 숲에서 무언가 오르락내리락했습니다. 버들잎이 바람에 뒤집혔습니다. 버들가지가 물 위까지 늘어져 있었습니다. 그 사이로 무언가 오르내렸습니다.",
            "다홍치마 자락이 바람을 안고 하늘로 솟았다가 다시 내려오고, 또 솟았다가 내려왔습니다. 그네였습니다. 댕기 끝이 하늘에 닿을 듯했습니다.",
            "\"방자야. 저기 저것이 무엇이냐.\"<br>\"그네입지요.\"<br>\"그네 말고, 그네 탄 사람 말이다.\" 이몽룡이 난간에서 몸을 앞으로 내밀었습니다.",
            "방자가 눈을 가늘게 뜨더니 대수롭지 않게 대답했습니다.<br>\"아, 저건 춘향이올시다. 월매라는 이의 딸인데, 남원에서 글도 잘하고 인물도 곱기로 소문났습지요.\" 말끝에 슬쩍 도련님의 눈치를 살폈습니다.",
            "이몽룡은 한참 동안 아무 말도 하지 못했습니다. 그러다 겨우 입을 열었습니다.<br>\"…불러 오너라.\" 방자가 옆에서 킥킥 웃었습니다.",
            "방자가 펄쩍 뛰었습니다.<br>\"도련님, 그 댁 아가씨가 오라 한다고 올 사람이 아닙니다.\"<br>\"그래도 가 보아라.\" 방자가 발을 동동 굴렀습니다. 그러면서도 결국 건너갔습니다.",
            "방자가 버드나무 숲으로 건너갔습니다. 한참 뒤에 혼자 돌아와 머리를 긁적였습니다.<br>\"뭐라 하더냐.\"<br>\"…제가 기생의 딸이기는 하나 부르면 가는 사람은 아니라고, 하실 말씀이 있으면 직접 오시라고 하옵니다.\" 방자의 목소리가 점점 작아졌습니다.",
            "이몽룡의 얼굴이 붉어졌습니다. 그러나 화가 난 것은 아니었습니다.<br>\"…옳은 말이다.\"",
            "이몽룡은 스스로 걸어서 버드나무 숲으로 갔습니다. 춘향이 그네에서 내려 옷매무새를 고치고 서 있었습니다. 숲 안이 서늘했습니다. 숲 안이 서늘하고 조용했습니다. 매미 소리만 멀리서 들려왔습니다.",
            "\"내가 아까 사람을 보낸 것은 무례였소. 용서하시오.\"<br>춘향이 그제야 고개를 들었습니다. 두 사람의 눈이 마주쳤습니다. 이몽룡이 먼저 고개를 숙였습니다.",
            "\"성함이 어찌 되시오.\"<br>\"성은 성이요, 이름은 춘향이라 합니다.\"<br>\"봄 향기라는 뜻이오?\"<br>\"예.\"",
            "이몽룡이 저도 모르게 웃었습니다.<br>\"오늘 광한루에 봄이 왜 이리 짙은가 했더니 까닭이 있었구려.\" 춘향이 그 말에 얼굴을 들지 못했습니다.",
            "춘향은 대꾸하지 않았습니다. 다만 귀 끝이 발갛게 물들었습니다. 멀리서 그네 줄이 흔들리는 소리가 났습니다.",
            "\"오늘 저녁에 댁으로 찾아가도 되겠소.\"<br>\"저희 어머니께 여쭈어 보십시오. 저 혼자 정할 일이 아닙니다.\"",
            "그러고는 그네 줄을 걷어 어깨에 걸치고 돌아섰습니다. 이몽룡은 그 뒷모습이 버드나무 사이로 사라질 때까지 그 자리에 서 있었습니다. 버들잎이 그 자리를 덮었습니다. 그네 줄이 어깨에서 흔들렸습니다. 버들잎이 그 자리를 덮었습니다.",
            "돌아오는 길에 방자가 슬쩍 물었습니다.<br>\"도련님, 무슨 이야기를 그리 오래 하셨습니까.\"<br>\"…책에 없는 것을 하나 배웠다.\"",
            "그날 밤 이몽룡은 글이 눈에 들어오지 않았습니다. 책장을 넘겨도 그네가 오르내리고, 붓을 들어도 다홍치마가 어른거렸습니다. 등잔 심지가 다 타도록 그러고 있었습니다.",
            "마침내 이몽룡은 책을 덮고 일어섰습니다.<br>\"방자야. 등불을 들어라.\" 방자가 눈을 비비며 등불을 챙겼습니다."
        ]
    },
    {
        num: 2,
        title: "백년가약",
        art: ["story-02-a.png", "story-02-b.png", "story-02-c.png"],
        paras: [
            "춘향의 집은 남원 성 밖 조용한 골목에 있었습니다. 담 안에 대나무가 서 있고 마당에는 국화 화분이 줄지어 놓여 있었습니다. 대나무 잎이 바람에 서걱거렸습니다.",
            "문을 열어 준 것은 춘향의 어머니 월매였습니다. 월매는 젊은 시절 기생이었다가 이제는 딸 하나를 키우며 조용히 사는 사람이었습니다. 손끝에 굳은살이 박여 있었습니다.",
            "\"사또 댁 도련님이 이 밤중에 어인 일이십니까.\"<br>\"춘향과 백년가약<span class=\"gloss\">(평생을 함께하기로 맺는 약속)</span>을 맺고 싶어 왔습니다.\"",
            "월매의 얼굴이 굳었습니다. 한참 만에 입을 열었는데 목소리가 낮았습니다. 방 안에 한참 동안 아무 소리도 나지 않았습니다.",
            "\"도련님, 저는 기생이었습니다. 그러니 제 딸도 세상 눈에는 기생의 딸입니다.\"<br>\"압니다.\"",
            "\"사또께서 아시면 어찌 되겠습니까. 도련님은 언젠가 한양으로 올라가실 분입니다. 그때 우리 아이는 무엇이 됩니까.\" 월매의 눈이 젖어 있었습니다.",
            "이몽룡은 한동안 아무 말도 하지 못했습니다. 월매의 말이 하나도 틀리지 않았기 때문입니다. 대답할 말이 없었기 때문입니다.",
            "\"…어머님 말씀이 다 옳습니다. 그래서 종이에 적어 드리려 합니다.\"",
            "이몽룡은 붓을 청해 종이에 글을 썼습니다. 춘향을 아내로 맞아 평생 저버리지 않겠다는 글이었습니다. 그리고 끝에 제 이름을 적고 손도장을 찍었습니다. 붓을 쥔 손이 조금도 떨리지 않았습니다.",
            "\"도련님, 이런 종이가 무슨 힘이 있겠습니까.\"<br>\"힘이 없으면 없는 대로 두십시오. 다만 제가 스스로에게 한 약속입니다.\"",
            "월매는 그 종이를 한참 들여다보다가 접어서 품에 넣었습니다. 그러고는 방문 쪽을 돌아보았습니다.<br>\"춘향아, 나오너라.\" 종이가 손안에서 바스락거렸습니다.",
            "그해 여름 두 사람은 혼례를 올렸습니다. 큰 잔치는 아니었습니다. 월매와 방자와 이웃 몇이 모인 조촐한 자리였습니다. 국화가 마당 가득 피어 있었습니다.",
            "그 뒤로 이몽룡은 낮에는 글을 읽고 저녁이면 춘향의 집으로 갔습니다.",
            "둘은 마루에 나란히 앉아 이야기를 했습니다. 이몽룡이 책에서 읽은 것을 이야기하면 춘향이 되물었습니다. 달이 마루 끝까지 들어왔습니다.",
            "\"도련님, 그 책에는 백성 이야기가 나옵니까.\"<br>\"…나오지 않는구려.\"<br>\"그럼 그 책은 반쪽이네요.\"",
            "이몽룡은 그 말에 한참을 웃었습니다. 그러고는 진지해졌습니다.<br>\"그대는 어디서 그런 것을 배웠소.\"<br>\"저잣거리에서요. 거기 앉아 있으면 다 들립니다.\" 춘향의 목소리가 담담했습니다.",
            "가을이 되자 춘향이 이몽룡에게 글씨를 가르쳐 달라 했습니다. 이몽룡이 붓을 잡아 주었습니다. 벼루에 먹을 갈아 놓고 기다렸습니다.",
            "\"무슨 글자부터 쓰고 싶소.\"<br>\"사람 인 자요.\"<br>\"어찌 그 글자요?\"<br>\"제일 어려운 글자라고 들었습니다.\"",
            "그렇게 한 해가 갔습니다. 두 사람은 그 시절이 그냥 이어질 줄로만 알았습니다. 봄이 가고 여름이 가고 가을이 갔습니다.",
            "그러나 이듬해 봄, 한양에서 사람이 내려왔습니다. 남원 사또가 벼슬이 올라 한양으로 가게 되었다는 기별이었습니다. 관가가 하루아침에 부산해졌습니다.",
            "이몽룡이 그 소식을 들은 것은 아버지의 방에서였습니다.<br>\"짐을 꾸려라. 사흘 뒤에 떠난다.\"<br>\"아버님, 저는…\"<br>\"너도 함께 간다. 과거를 보아야지.\"",
            "이몽룡은 그 자리에 한참을 서 있다가 밖으로 나왔습니다. 마당에 봄볕이 환했습니다. 광한루에서 그네를 처음 본 날과 꼭 같은 볕이었습니다. 담 밖에서 매미 소리가 요란했습니다."
        ]
    },
    {
        num: 3,
        title: "이별",
        art: ["story-03-a.png", "story-03-b.png", "story-03-c.png"],
        paras: [
            "그날 저녁 이몽룡은 춘향의 집으로 갔습니다. 대문 앞에서 몇 번이나 걸음을 돌렸다가 다시 섰습니다. 손에 아무것도 들지 않은 채였습니다.",
            "방으로 들어서자 춘향이 먼저 알아보았습니다.<br>\"…무슨 일이 있으셨군요.\" 얼굴빛만 보고 알아챈 것이었습니다.",
            "이몽룡은 그 자리에 앉아 이야기를 다 했습니다. 아버지의 벼슬, 사흘 뒤의 출발, 한양의 과거. 말하는 동안 고개를 들지 못했습니다. 말이 끝나고도 춘향은 한참 동안 아무것도 묻지 않았습니다.",
            "말이 끝나고도 한참 동안 방 안이 조용했습니다. 등잔불만 흔들렸습니다. 창밖에서 풀벌레 소리가 났습니다.",
            "\"언제 돌아오십니까.\"<br>\"…모르겠소.\"",
            "춘향이 고개를 끄덕였습니다. 울지 않았습니다. 다만 손끝이 떨렸습니다. 무릎 위에 놓인 손이었습니다.",
            "\"도련님. 한 가지만 여쭙겠습니다.\"<br>\"말하시오.\"<br>\"한양에 가시면 저를 잊으십니까.\"",
            "이몽룡이 벌떡 일어났습니다.<br>\"그 무슨 말이오!\"<br>\"화내지 마십시오. 저는 답을 들으려는 것이 아닙니다.\" 목소리가 저도 모르게 높아졌습니다.",
            "춘향이 조용히 말을 이었습니다.<br>\"사람 마음은 사람이 어찌하지 못하는 것입니다. 다만 저는 제 마음을 압니다. 그것만 말씀드리려는 것입니다.\"",
            "그러고는 반짇고리에서 무언가를 꺼냈습니다. 손바닥만 한 거울이었습니다. 오래 닦아 테가 반들반들했습니다.",
            "\"이것을 가져가십시오. 거울은 있는 그대로를 비추지요. 도련님이 어떤 사람이 되시든 이 거울은 그것을 그대로 비출 겁니다.\"",
            "이몽룡은 그 거울을 두 손으로 받았습니다. 그러고는 제 손가락에서 옥가락지를 빼어 춘향에게 주었습니다. 가락지가 등잔불을 받아 반짝였습니다.",
            "\"이것은 우리 어머니가 주신 것이오. 이 가락지가 내 손에 없는 동안, 나는 아직 남원에 있는 것이오.\"",
            "이튿날 새벽, 사또 일행이 남원을 떠났습니다. 관속들이 늘어서고 짐수레가 줄지어 섰습니다. 새벽안개가 자욱했습니다.",
            "춘향은 성 밖 오리정<span class=\"gloss\">(고을에서 오 리쯤 떨어진 곳에 세워, 오가는 사람을 보내고 맞던 정자)</span>까지 따라 나왔습니다. 월매도 뒤에 서 있었습니다. 오리정에는 떠나는 사람과 보내는 사람이 여럿 서 있었습니다.",
            "\"몸조심하시오.\"<br>\"도련님도요.\"<br>더 할 말이 있었지만 두 사람 다 하지 못했습니다. 말고삐를 잡은 손에 힘이 들어갔습니다.",
            "말이 움직이기 시작했습니다. 이몽룡은 몇 번이나 뒤를 돌아보았습니다. 춘향은 그 자리에 그대로 서 있었습니다.",
            "고갯마루를 넘을 때까지, 이몽룡의 눈에 춘향이 점점 작아졌습니다. 마침내 점이 되었다가 사라졌습니다. 고갯마루에서 이몽룡이 말을 세웠습니다.",
            "춘향은 해가 다 기울도록 오리정에 서 있었습니다. 월매가 몇 번이나 소매를 잡아끌었습니다. 치맛자락이 이슬에 다 젖었습니다.",
            "\"들어가자. 남들이 본다.\"<br>\"조금만 더요.\"",
            "그날 밤 춘향은 옥가락지를 실에 꿰어 목에 걸었습니다. 그러고는 등잔불 아래에서 사람 인 자를 쓰고 또 썼습니다. 가락지가 가슴께에서 서늘했습니다.",
            "한양에서는 이몽룡이 밤새 책을 읽었습니다. 거울은 책상 위에 세워 두었습니다. 고개를 들 때마다 제 얼굴이 보였습니다. 글자가 눈에 들어오지 않는 밤도 있었습니다."
        ]
    },
    {
        num: 4,
        title: "새로 온 사또",
        art: ["story-04-a.png", "story-04-b.png", "story-04-c.png"],
        paras: [
            "두 해가 지나고 이듬해 봄, 남원에 새 사또가 왔습니다. 이름은 변학도라 했습니다. 남원 사람들이 길가에 나와 구경했습니다.",
            "부임 행차부터 요란했습니다. 가마 뒤로 짐수레가 열 대나 따라왔고, 그 안에는 비단이며 그릇이며 세간이 그득했습니다. 구경하던 사람들이 서로 얼굴을 쳐다보았습니다.",
            "변학도는 자리에 앉자마자 관속들을 불러 모았습니다. 그런데 묻는 것이 이상했습니다. 관속들이 문서를 안고 줄지어 섰습니다.",
            "\"이 고을 창고에 곡식이 얼마나 있느냐.\"<br>\"예, 그것이…\"<br>\"됐다. 그건 나중에 보고. 이 고을에 이름난 기생이 몇이나 되느냐?\"",
            "관속들이 서로 눈치를 보았습니다. 아무도 얼른 대답하지 못했습니다. 누구도 선뜻 입을 열지 못했습니다.",
            "\"어허, 귀가 먹었느냐. 기생 명부를 가져오너라.\"",
            "그날부터 남원 관가에서는 날마다 잔치가 벌어졌습니다. 풍악 소리가 담을 넘어 저잣거리까지 들렸습니다. 밤이 깊어도 불이 꺼지지 않았습니다.",
            "잔치에 드는 것은 다 고을 창고에서 나갔습니다. 그해 봄에 걷은 세금이 석 달 만에 바닥났습니다. 곳간 문이 활짝 열린 채였습니다.",
            "그러자 변학도는 아직 걷지 않은 이듬해 세금까지 미리 걷으라 했습니다. 못 내는 집에서는 솥을 떼어 갔습니다. 아이들 밥그릇까지 가져갔습니다. 곡식 대신 놋그릇을 떼어 가는 집도 있었습니다.",
            "그러던 어느 날, 변학도가 기생 명부를 넘기다가 손을 멈췄습니다.<br>\"이 고을에 춘향이라는 아이가 있다지.\"",
            "옆에 있던 아전<span class=\"gloss\">(관가에서 실무를 보던 하급 관리)</span>이 조심스레 아뢰었습니다.<br>\"있사옵니다. 그런데 그 아이는 기생이 아니옵니다.\" 아전의 이마에 땀이 맺혔습니다.",
            "\"기생의 딸이 어찌 기생이 아니냐.\"<br>\"이미 지아비가 있는 몸이라 하옵니다. 전 사또 댁 도련님과…\"",
            "변학도가 껄껄 웃었습니다.<br>\"그 도련님이 지금 어디 있느냐. 한양에 있지 않느냐. 한양이 여기서 몇 리인고?\" 웃음소리가 마당까지 울렸습니다.",
            "\"…칠백 리쯤 되옵니다.\"<br>\"칠백 리 밖의 사내가 무슨 지아비냐. 데려오너라.\"",
            "사령들이 춘향의 집으로 갔습니다. 월매가 대문을 막고 섰습니다.<br>\"우리 아이는 기생이 아닙니다!\"<br>\"사또 분부요. 비키시오.\" 사령들의 발소리가 골목을 울렸습니다.",
            "춘향이 방에서 나왔습니다. 옷매무새를 단정히 하고 머리를 곱게 빗은 채였습니다.<br>\"어머니, 괜찮습니다. 다녀오겠습니다.\" 떨리는 기색이 조금도 없었습니다.",
            "\"춘향아!\"<br>\"불려 가는 것을 안 갈 수는 없지요. 다만 갔다가 그냥 돌아오면 됩니다.\"",
            "관가 마당에는 이미 사람이 그득했습니다. 무슨 구경이라도 난 듯 담 밖까지 사람이 늘어섰습니다. 담장 위에까지 사람이 올라앉았습니다. 아이들까지 어른들 틈에 끼어 목을 뺐습니다.",
            "변학도가 대청에 앉아 춘향을 내려다보았습니다. 한참을 보더니 흡족한 얼굴이 되었습니다.",
            "\"과연 소문대로구나. 오늘부터 네 이름을 기생 명부에 올리겠다. 관가에 들어와 내 곁에서 시중을 들어라.\" 말끝에 부채를 접었습니다.",
            "마당이 조용해졌습니다. 사람들이 숨을 죽이고 춘향의 입을 보았습니다. 바람 소리마저 멎은 것 같았습니다.",
            "춘향이 고개를 들었습니다. 목소리는 크지 않았지만 마당 끝까지 또렷하게 들렸습니다.<br>\"사또, 저는 이미 지아비가 있는 사람입니다.\""
        ]
    },
    {
        num: 5,
        title: "옥에 갇히다",
        art: ["story-05-a.png", "story-05-b.png", "story-05-c.png"],
        paras: [
            "변학도의 얼굴에서 웃음이 사라졌습니다.<br>\"지아비라니. 혼서<span class=\"gloss\">(혼인을 약속하며 주고받던 문서)</span>가 있느냐. 나라에 올린 문서가 있느냐.\" 부채를 쥔 손에 힘이 들어갔습니다.",
            "\"종이는 있습니다.\"<br>\"기생의 딸이 도령과 주고받은 종이 쪼가리가 무슨 문서란 말이냐!\"",
            "\"사또께서 문서가 아니라 하시면 문서가 아니겠지요.\"<br>춘향이 담담하게 말했습니다.<br>\"그래도 제 마음은 제 것입니다. 그것까지 사또께서 정하실 수는 없습니다.\" 마당에 있던 사람들이 서로 얼굴을 쳐다보았습니다.",
            "변학도가 상을 내리쳤습니다.<br>\"저것이 사또를 능멸하는구나! 매를 들어라!\" 상 위의 잔이 넘어졌습니다.",
            "사령들이 머뭇거렸습니다. 남원 사람이라면 춘향을 모르는 이가 없었기 때문입니다.<br>\"무엇들 하느냐!\" 매를 든 손이 자꾸 내려갔습니다.",
            "춘향은 매를 맞으면서도 소리를 지르지 않았습니다. 대신 매 한 대에 한마디씩 말을 했습니다. 목소리가 갈라졌지만 또렷했습니다.",
            "\"하나. 한 지아비를 섬기는 것이 무슨 죄입니까.\"<br>\"둘. 두 마음을 품지 않는 것이 무슨 죄입니까.\"",
            "\"셋. 세상이 뒤집혀도 저는 이 말을 바꾸지 않습니다.\"<br>매질하던 사령의 손이 떨렸습니다. 끝내 매를 놓고 물러선 사령도 있었습니다.",
            "담 밖에서 사람들이 울기 시작했습니다. 어떤 이는 돌아섰고 어떤 이는 주먹을 쥐었습니다. 담 위에 올라앉았던 아이들이 울음을 터뜨렸습니다.",
            "\"옥에 가두어라! 제 입으로 그러겠다 할 때까지 내보내지 마라!\"",
            "춘향은 그날로 남원 옥에 갇혔습니다. 옥은 어둡고 축축했습니다. 쥐가 다니고 벽에서 물이 배어 나왔습니다. 햇빛이 하루에 한 뼘도 들지 않았습니다.",
            "월매가 날마다 옥 앞으로 왔습니다. 창살 사이로 밥을 넣어 주며 울었습니다.<br>\"내가 그때 그 종이를 받지 말았어야 했다.\" 창살을 붙든 손이 하얗게 질렸습니다.",
            "\"어머니, 그런 말씀 마세요.\"<br>\"네가 무슨 죄가 있다고…\"<br>\"제가 죄가 없으니까 여기 있는 겁니다.\"",
            "달이 바뀌고 또 바뀌었습니다. 춘향의 얼굴에서 살이 빠지고 손목이 가늘어졌습니다. 옥졸들도 그 모습을 차마 보지 못했습니다.",
            "그래도 춘향은 날마다 옥 바닥에 손가락으로 글씨를 썼습니다. 사람 인 자였습니다. 흙바닥이 반들반들해지도록 썼습니다.",
            "남원을 떠난 지 삼 년째 되던 해, 한양에서 과거가 열렸습니다. 이몽룡이 그 시험을 보았습니다.",
            "시험 문제는 백성을 다스리는 법에 관한 것이었습니다. 이몽룡은 붓을 들고 한참을 생각했습니다. 붓끝이 한참 동안 종이에 닿지 않았습니다.",
            "그러다 문득 오래전에 들은 말이 떠올랐습니다. 그 책에는 백성 이야기가 나옵니까. 그럼 그 책은 반쪽이네요. 춘향의 목소리가 그대로 들리는 것 같았습니다.",
            "이몽룡은 그날 장원으로 뽑혔습니다. 임금이 그를 불러 물었습니다.<br>\"무슨 벼슬을 하고 싶으냐.\"",
            "\"전하, 저를 암행어사로 보내 주십시오.\"<br>\"어느 고을로 가겠느냐.\"<br>\"…전라도 남원이옵니다.\" 임금이 눈을 크게 떴습니다.",
            "임금이 마패<span class=\"gloss\">(암행어사임을 증명하던 둥근 쇠패. 말 그림이 새겨져 있다)</span>를 내렸습니다.",
            "이몽룡은 그 마패를 품에 넣고, 책상 위의 거울도 함께 챙겼습니다. 그러고는 남쪽으로 길을 잡았습니다. 뒤도 돌아보지 않았습니다."
        ]
    },
    {
        num: 6,
        title: "거지가 되어 온 사람",
        art: ["story-06-a.png", "story-06-b.png", "story-06-c.png"],
        paras: [
            "남원에 가까워지자 이몽룡은 옷을 갈아입었습니다. 다 해진 옷에 짚신을 신고, 갓은 챙이 부러진 것을 썼습니다. 얼굴에 일부러 흙을 묻혔습니다.",
            "암행어사는 그렇게 다녔습니다. 아무도 알아보지 못해야 그 고을의 진짜 모습을 볼 수 있기 때문입니다.",
            "남원 땅에 들어서자마자 이몽룡은 걸음을 멈췄습니다. 논에 물이 말라 있었습니다. 사람이 다니지 않아 길에 풀이 자랐습니다. 장터에 사람이 열도 되지 않았습니다.",
            "주막에 들어가 국밥 한 그릇을 시켰습니다. 옆자리 사람들이 나누는 이야기가 그대로 들렸습니다. 국밥에 건더기가 거의 없었습니다.",
            "\"올해도 세금을 두 번 걷는다지.\"<br>\"작년 것도 아직 못 냈는데.\"<br>\"그 양반은 밤마다 잔치라던데.\"",
            "이몽룡의 숟가락이 멈췄습니다. 국이 다 식도록 그러고 있었습니다.",
            "\"그건 그렇고, 춘향이는 아직 옥에 있나.\"<br>\"석 달째지. 이제 사람 꼴이 아니라던데.\" 이몽룡의 손이 상 밑에서 떨렸습니다.",
            "이몽룡이 그 자리에서 일어섰습니다. 국밥은 반도 못 먹었습니다.",
            "해가 진 뒤 이몽룡은 춘향의 집을 찾아갔습니다. 담이 무너지고 마당의 국화 화분이 다 말라 있었습니다. 대나무만 예전 그대로 서 있었습니다.",
            "월매가 등불을 들고 나왔습니다. 그러고는 이몽룡을 보고 한참을 알아보지 못했습니다. 등불을 든 손이 흔들렸습니다.",
            "\"…도련님?\"<br>\"예, 접니다.\"<br>월매의 눈이 이몽룡의 행색을 훑었습니다. 해진 옷, 부러진 갓, 흙투성이 짚신.",
            "월매가 그 자리에 주저앉았습니다.<br>\"아이고… 아이고, 우리 춘향이…\" 울음이 골목까지 새어 나갔습니다.",
            "\"어머님.\"<br>\"우리 애가 저 지경이 되도록 기다린 사람이 겨우… 겨우 이 꼴로 왔단 말입니까.\"",
            "이몽룡은 아무 변명도 하지 않았습니다. 다만 이렇게 말했습니다.<br>\"옥으로 데려다주십시오.\" 목소리가 아주 낮았습니다.",
            "옥 앞에 이르자 이몽룡이 창살에 얼굴을 붙였습니다. 안은 캄캄했습니다.<br>\"춘향아.\"",
            "어둠 속에서 무언가 움직였습니다. 그러고는 아주 낮은 목소리가 들려왔습니다.<br>\"…도련님이십니까.\" 쇠사슬 끄는 소리가 났습니다.",
            "\"어찌 알았소. 얼굴도 안 보일 텐데.\"<br>\"목소리는 안 변했습니다.\"",
            "달빛이 들어와 춘향의 얼굴을 비췄습니다. 이몽룡은 그 얼굴을 보고 숨이 막혔습니다. 뺨이 홀쭉하고 손목이 뼈만 남아 있었습니다.",
            "춘향도 이몽룡의 행색을 보았습니다. 한참을 보다가 조용히 물었습니다.<br>\"…한양에서 뜻을 못 이루셨군요.\"",
            "이몽룡은 대답하지 않았습니다. 사실을 말해 버리면 춘향이 옥 안에서 티를 낼 것이고, 그러면 일이 어그러질 것이었습니다. 말이 목구멍에서 자꾸 걸렸습니다.",
            "그런데 춘향이 창살 사이로 손을 내밀었습니다. 그 손에 옥가락지가 들려 있었습니다.<br>\"이건 도로 가져가십시오. 제가 지니고 있다가 잃을까 겁납니다.\" 가락지가 손가락에서 헐거워져 있었습니다.",
            "\"춘향아.\"<br>\"그리고 도련님. 어머니를 부탁드립니다. 저 사람 혼자 남으면 못 견딥니다.\"<br>이몽룡은 그 창살을 붙잡고 오래도록 고개를 들지 못했습니다."
        ]
    },
    {
        num: 7,
        title: "암행어사 출두야",
        art: ["story-07-a.png", "story-07-b.png", "story-07-c.png"],
        paras: [
            "이튿날은 변학도의 생일이었습니다. 관가에서는 아침부터 큰 잔치가 벌어졌습니다. 새벽부터 풍악 소리가 났습니다.",
            "이웃 고을 수령들까지 불려 와 대청에 늘어앉았습니다. 상마다 고기와 술이 그득했습니다. 광에서 곡식이 자루째 실려 나갔습니다. 기생과 악공이 스무 명도 넘게 불려 왔습니다. 상마다 고기가 산처럼 쌓였습니다.",
            "그때 다 해진 옷을 입은 사내 하나가 슬그머니 마당으로 들어섰습니다.<br>\"어허, 웬 거지가 잔칫상에 끼어드느냐!\"",
            "사령들이 밀어내려 하자 옆 고을 수령 하나가 손을 저었습니다.<br>\"두어라. 잔칫날에 사람 쫓는 것도 흉하다. 저 끝에 상 하나 내주어라.\" 사령들이 못마땅한 얼굴로 물러섰습니다.",
            "이몽룡은 마당 끝 구석에 앉았습니다. 상에는 식은 국 한 그릇과 나물 한 접시가 놓였습니다. 나물은 다 식어 있었습니다. 이몽룡은 숟가락을 들지 않았습니다.",
            "술이 몇 순배 돌자 변학도가 흥이 올랐습니다.<br>\"오늘같이 좋은 날에 시가 없어서 되겠는가. 누가 한 수 지어 보게.\" 부채로 상을 두드리며 흥얼거렸습니다.",
            "그때 마당 끝의 거지가 일어섰습니다.<br>\"소인이 한 수 지어 올려도 되겠습니까.\" 좌중이 그쪽을 돌아보았습니다.",
            "좌중이 웃음바다가 되었습니다.<br>\"거지가 시를 짓는다!\"<br>\"어디 들어나 보자!\" 누구도 그 말을 곧이듣지 않았습니다.",
            "이몽룡이 붓을 청해 종이에 글을 썼습니다. 그러고는 소리 내어 읽었습니다. 붓을 쥔 손이 조금도 떨리지 않았습니다.",
            "\"금 술잔에 담긴 좋은 술은 천 사람의 피요,\"<br>\"옥쟁반에 놓인 좋은 안주는 만백성의 기름이라.\" 글을 읽는 목소리가 낮았는데도 대청 끝까지 들렸습니다.",
            "대청이 조용해졌습니다. 젓가락 소리마저 멎었습니다.",
            "\"촛농이 떨어질 때 백성의 눈물이 떨어지고,\"<br>\"노랫소리 높은 곳에 원망 소리 또한 높더라.\"",
            "잔을 들고 있던 수령 하나가 슬그머니 잔을 내려놓았습니다. 다른 하나는 자리에서 일어나 뒷걸음질을 쳤습니다. 대청에 술 냄새만 남았습니다. 누군가 갓을 챙겨 슬그머니 마당으로 내려섰습니다.",
            "변학도의 얼굴이 붉으락푸르락해졌습니다.<br>\"이, 이놈이 어디서 무엄한 소리를! 당장 끌어내라!\"",
            "사령들이 달려들었습니다. 그 순간 이몽룡이 품에서 무언가를 꺼내 높이 들었습니다. 마당의 사람들이 일제히 그쪽을 보았습니다.",
            "둥근 쇠붙이에 말이 새겨져 있었습니다. 마패였습니다. 햇빛을 받아 쇠붙이가 번쩍였습니다.",
            "동시에 담 밖에서 우렁찬 소리가 터졌습니다.<br>\"암행어사 출두야!\"",
            "대문이 부서지듯 열리고 역졸들이 쏟아져 들어왔습니다. 상이 뒤집히고 술병이 굴렀습니다. 수령들이 갓도 못 챙기고 담을 넘었습니다. 담이 무너지고 발자국이 어지러웠습니다.",
            "변학도가 자리에서 굴러떨어졌습니다.<br>\"어, 어사또… 소인은 그저…\"<br>\"남원 사또는 인장을 내놓으시오. 오늘로 그 자리에서 물러나시오.\" 인장을 내미는 손이 사시나무처럼 떨렸습니다.",
            "이몽룡은 곧바로 옥 문을 열게 했습니다. 춘향이 부축을 받으며 걸어 나왔습니다. 햇빛이 눈부셔 한참을 눈을 뜨지 못했습니다. 옥문이 삐걱거리며 열렸습니다.",
            "겨우 눈을 뜬 춘향 앞에, 어사 관복을 입은 이몽룡이 서 있었습니다. 춘향은 놀라지 않았습니다. 다만 이렇게 말했습니다.<br>\"…어젯밤에 말씀하시지 그러셨어요.\"<br>\"말했으면 그대가 티를 냈을 것이오.\"<br>\"그건 그렇습니다.\"",
            "춘향은 그러고는 이몽룡을 지나쳐 걸었습니다. 담 밖에 월매가 서 있었습니다. 춘향은 어머니를 끌어안고 그제야 소리 내어 울었습니다. 월매가 딸의 이름을 부르며 달려왔습니다. 월매가 딸의 얼굴을 두 손으로 감쌌습니다.",
            "그해 가을 두 사람은 한양으로 올라갔습니다. 월매도 함께 갔습니다.",
            "떠나기 전날, 춘향이 광한루에 올랐습니다. 이몽룡이 뒤따라 올라왔습니다.<br>\"여기서 처음 보았지요.\"<br>\"그때 내가 방자를 시켜 그대를 불렀소. 참으로 무례한 짓이었소.\" 버드나무가 그때보다 훨씬 굵어져 있었습니다.",
            "\"그때 제가 뭐라 했는지 기억하십니까.\"<br>\"하실 말씀이 있으면 직접 오시라고 했지.\"<br>\"예. 그 말을 들어주셔서 제가 여기 있는 겁니다.\" 광한루 아래로 물이 그때처럼 흘렀습니다.",
            "이몽룡이 품에서 거울을 꺼냈습니다. 거울에 두 사람의 얼굴이 함께 비쳤습니다. 삼 년을 지니고 다녀 테두리가 다 닳아 있었습니다.<br>\"이건 도로 주겠소. 이제 내가 어떤 사람이 되었는지는 그대가 보아 주시오.\""
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
                ${artFrame('cover.png', '🌸')}
            </div>
            <div class="story-page-right">
                <h1>춘향전</h1>
                <p>춘향전은 지은이가 알려지지 않은 조선 후기 소설이에요. 판소리 춘향가로 불리던 것이 글로 옮겨진 것이지요.</p>
                <p>판소리 다섯 마당 가운데 가장 널리 불리고 가장 많이 읽힌 것이 춘향가예요. 조금씩 다른 이본이 백 가지가 넘어서, 하나의 작품이라기보다 춘향전 무리라고 부르기도 한답니다.</p>
                <p>이야기의 무대는 전라도 남원이에요. 두 사람이 처음 만나는 광한루는 지금도 남원에 남아 있고, 해마다 봄이면 그곳에서 춘향제가 열린답니다.</p>
                <p>암행어사는 임금이 몰래 보내던 벼슬아치예요. 거지 차림으로 다니다가 마패를 꺼내 보이며 나쁜 수령을 그 자리에서 잡아들였지요. 조선에만 있던 제도랍니다.</p>
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
    { q: "두 사람이 처음 만난 곳은 어디입니까?", choices: ["한양의 궁궐 앞", "남원 광한루", "전주 감영 뜰"], answer: 1 },
    { q: "이몽룡이 춘향을 처음 본 것은 무엇을 할 때입니까?", choices: ["냇가에서 빨래할 때", "글을 읽고 있을 때", "그네를 타고 있을 때"], answer: 2 },
    { q: "두 사람이 헤어진 까닭은 무엇입니까?", choices: ["아버지가 한양으로 가게 되어서", "춘향이 멀리 이사를 가게 되어서", "변 사또가 두 사람을 갈라놓아서"], answer: 0 },
    { q: "헤어질 때 춘향이 건넨 것은 무엇입니까?", choices: ["비단 손수건", "옥으로 만든 붓", "거울 하나"], answer: 2 },
    { q: "새로 온 사또 변학도가 춘향에게 시킨 것은 무엇입니까?", choices: ["기생 명부에 이름을 올리라고", "관가에 들어와 밥을 지으라고", "남원 땅을 떠나 멀리 가라고"], answer: 0 },
    { q: "춘향은 무엇이라고 대답했습니까?", choices: ["조금만 기다려 달라고", "저는 이미 지아비가 있다고", "아무 말도 하지 않았다고"], answer: 1 },
    { q: "춘향은 어떻게 되었습니까?", choices: ["남원에서 쫓겨났다", "매를 맞고 옥에 갇혔다", "관가의 종이 되었다"], answer: 1 },
    { q: "이몽룡은 한양에서 무엇이 되었습니까?", choices: ["병조 판서", "남원 사또", "암행어사"], answer: 2 },
    { q: "이몽룡이 남원에 나타났을 때 차림은 어떠했습니까?", choices: ["거지꼴이었다", "비단옷 차림이었다", "군사를 거느렸다"], answer: 0 },
    { q: "옥에서 춘향은 이몽룡에게 무어라 했습니까?", choices: ["왜 이제 왔느냐고", "다시는 오지 말라고", "어머니를 잘 부탁한다고"], answer: 2 },
    { q: "이몽룡이 잔치에서 지은 시는 무엇에 대한 것입니까?", choices: ["좋은 술이 백성의 피라는 것", "봄날 광한루의 아름다운 경치", "고향을 그리워하는 나그네 마음"], answer: 0 },
    { q: "이몽룡이 잔치에서 높이 들어 보인 것은 무엇입니까?", choices: ["임금의 편지", "마패", "옥으로 만든 도장"], answer: 1 },
    { q: "변학도는 어떻게 되었습니까?", choices: ["한양으로 끌려가 갇혔다", "그 자리에서 벼슬을 잃었다", "스스로 벼슬을 내놓았다"], answer: 1 },
    { q: "춘향이 옥에서 나와 가장 먼저 한 일은 무엇입니까?", choices: ["변학도를 꾸짖었다", "광한루로 달려갔다", "어머니를 끌어안았다"], answer: 2 }
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
    emoji: '🌸',
    art: ['end.png'],
    paras: [
        `먼저 이 이야기가 어디서 왔는지부터입니다. 『춘향전』은 판소리 「춘향가」를 글로 옮긴 것입니다. 소리꾼 한 사람이 북 치는 사람만 데리고 여덟 시간을 부르기도 하는 긴 노래였습니다.`,
        `지은이는 없습니다. 한 사람이 앉아서 지은 것이 아니라 여럿이 부르고 고치며 만들어 온 이야기이기 때문입니다. 그래서 남아 있는 책이 백 가지가 넘고, 그 백 가지가 저마다 조금씩 다릅니다. 어떤 책에서는 춘향이 양반의 딸이고, 어떤 책에서는 끝까지 기생의 딸입니다.`,
        `우리나라 옛이야기 가운데 가장 많이 읽히고 가장 많이 불린 이야기가 이것입니다. 조선 후기에 이 이야기를 모르는 사람은 거의 없었습니다.`,
        `이 이야기의 뿌리에는 신분이 있습니다. 춘향은 퇴기 월매의 딸입니다. 어머니가 기생이면 딸도 기생 명부에 이름이 오르던 시절이었습니다. 그래서 이몽룡과 아무리 마음이 맞아도 정식으로 혼인할 수가 없었습니다.`,
        `이 대목을 잘 보아야 삼 장의 이별이 이해됩니다. 이몽룡이 춘향을 데려가지 못한 것은 마음이 식어서가 아닙니다. 데려갈 자리가 없었기 때문입니다. 양반집 아들이 기생의 딸을 서울로 데려가는 일은 그 시절 법도 안에서는 있을 수 없는 일이었습니다.`,
        `그러니 춘향이 변학도에게 맞선 것도 사랑 하나만은 아닙니다. 기생 명부에 이름이 있으면 사또가 부르면 가야 했습니다. 춘향은 그 명부를 부정한 것입니다. 나는 그런 사람이 아니라고 말한 셈입니다. 매를 맞은 까닭이 거기에 있습니다.`,
        `변학도를 그냥 나쁜 사또로만 읽으면 아깝습니다. 이 사람은 법을 어긴 것이 없습니다. 그 시절 법으로는 사또가 관기를 부를 수 있었습니다. 법대로 했는데 사람이 부서진 것입니다. 이야기가 정말 겨눈 것은 변학도 한 사람이 아니라 그런 법이었습니다.`,
        `칠 장에서 이몽룡이 잔칫상에서 읊은 시는 실제로 널리 알려진 시입니다. 금 술잔의 좋은 술은 천 사람의 피요, 옥쟁반의 좋은 안주는 만백성의 기름이라는 구절입니다. 촛농이 떨어질 때 백성의 눈물이 떨어지고, 노랫소리 높은 곳에 원망 소리 높다는 말이 뒤에 이어집니다.`,
        `그 자리에 있던 사람들이 슬금슬금 빠져나간 것도 그래서입니다. 무슨 뜻인지 알아들었기 때문입니다.`,
        `암행어사는 지어낸 벼슬이 아닙니다. 임금이 몰래 보내는 관리로, 조선 시대에 실제로 있던 제도입니다. 마패는 말을 빌리는 표였고, 함께 지니고 다니는 유척이라는 자로 고을에서 쓰는 되와 자가 제대로 된 것인지 재어 보았습니다. 세금을 속여 걷는 것을 잡아내려는 것이었습니다.`,
        `남원에 가면 광한루가 실제로 서 있습니다. 조선 초에 지은 누각인데, 이 이야기 때문에 유명해졌습니다. 그 옆에는 춘향을 모신 사당도 있고 해마다 춘향제도 열립니다. 이야기 속 사람인데 제사를 받는 셈입니다.`,
        `춘향이 실제로 있었던 사람인지는 아무도 모릅니다. 남원에 그런 처녀가 있었다는 말도 전해 오지만 그것도 이야기입니다. 확인할 길이 없습니다. 다만 사람들이 그토록 오래 있었던 일로 여기고 싶어 했다는 것만은 분명합니다.`,
        `이 이야기가 그토록 오래 사랑받은 까닭 가운데 하나는 뒤집기입니다. 제일 낮은 자리에 있던 사람이 제일 높은 자리에 있던 사람을 이깁니다. 그것도 힘으로가 아니라 버티기로 이깁니다. 듣는 사람들이 대개 낮은 자리에 있었으니 그 대목에서 속이 시원했을 것입니다.`,
        `다시 읽게 되거든 이번에는 월매만 따라가며 읽어 보십시오. 딸을 기생으로 만들지 않으려고 애쓴 사람입니다. 이몽룡이 떠날 때 가장 크게 화를 낸 사람도, 옥바라지를 한 사람도, 거지꼴로 돌아온 사위를 보고 주저앉은 사람도 월매입니다. 이 이야기에서 제일 고생한 사람은 어쩌면 이 사람입니다.`,
        `이몽룡이 끝내 돌아오지 않았다면 춘향이 한 일은 무엇이 되었을까요? 이야기는 돌아오게 만들어 주었지만, 돌아오지 않았을 수도 있습니다. 그때도 춘향의 버팀은 옳은 일이었을까요.`,
        `이몽룡이 거지 차림으로 나타나 춘향을 떠본 대목은 어떻습니까? 죽기 하루 전인 사람을 시험한 것입니다. 어사인 것을 미리 밝혔다면 무엇이 달라졌을지, 그리고 그가 왜 굳이 떠보았을지 생각해 보십시오.`,
        `춘향이 기생의 딸이 아니라 양반의 딸이었다면 이 이야기가 남았을까요? 매를 맞을 일도, 옥에 갇힐 일도 없었을 것입니다. 이야기가 되려면 누군가 그 자리에 있어야 했다는 것이 무슨 뜻인지 생각해 볼 만합니다.`
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
