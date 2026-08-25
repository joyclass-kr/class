const BOOK_TITLE = "토끼전";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "용왕의 병",
        art: ["story-01-a.png", "story-01-b.png", "story-01-c.png"],
        paras: [
            "남해 바다 깊은 곳에 수정으로 지은 궁궐이 하나 있었습니다. 기둥은 산호요 지붕은 자개라, 물살이 지날 때마다 온 궁이 무지갯빛으로 일렁였습니다. 그곳을 다스리는 이가 남해 용왕이었습니다. 물고기들이 그 앞을 지날 때면 지느러미를 모으고 고개를 숙였습니다.",
            "그해 봄, 용왕은 큰 잔치를 열었습니다. 동해와 서해와 북해의 용왕들까지 불러 모아 사흘 밤낮을 놀았습니다. 풍악이 그치지 않았고 술잔이 마를 새가 없었습니다. 상에 오른 음식만 백 가지가 넘었습니다.",
            "나흘째 되던 날 아침이었습니다. 용왕이 자리에서 일어나려다 그대로 주저앉고 말았습니다.<br>\"어, 어지럽구나.\" 곁에 있던 시녀들이 놀라 달려들었습니다.",
            "그날부터 용왕은 자리에 누웠습니다. 밥을 넘기지 못하고 물조차 겨우 축였습니다. 온몸이 불덩이처럼 달아올랐다가 이내 얼음장처럼 식었습니다. 밤이면 헛소리를 하기도 했습니다.",
            "수궁이 발칵 뒤집혔습니다. 이름난 의원이란 의원은 다 불려 왔습니다. 잉어 의원이 맥을 짚어 보고, 문어 의원이 온몸을 주물러 보고, 해마 의원이 침을 놓아 보았습니다. 그러나 아무 소용이 없었습니다. 의원들은 하나같이 고개를 젓고 물러났습니다.",
            "약도 지어 보았습니다. 미역과 다시마를 달여 보고, 진주를 갈아 넣어 보고, 천 년 묵은 조개의 살을 고아 보았습니다. 용왕은 한 모금 넘기고는 도로 고개를 저었습니다. 약 냄새만 궁 안에 가득했습니다.",
            "달이 두 번 바뀌었습니다. 그사이 용왕의 얼굴에서 살이 다 빠지고 비늘에서 빛이 사라졌습니다. 신하들은 궁 앞에 모여 서서 발만 굴렀습니다. 궁 안에서 웃음소리가 사라진 지 오래였습니다.",
            "\"이러다 큰일 나겠소.\"<br>\"천하의 명의를 다 데려왔는데 어쩌란 말이오.\"<br>\"바다에 없으면 육지에서라도 찾아야지요.\"",
            "그러나 아무도 육지 이야기를 크게 하지는 못했습니다. 바다에 사는 것들에게 육지란 숨을 쉴 수 없는 무서운 곳이었기 때문입니다. 숨이 막히고 몸이 마르는 곳이라 들었습니다.",
            "그러던 어느 날 밤이었습니다. 잠결에 용왕이 눈을 떠 보니, 침상 곁에 흰 옷을 입은 노인이 서 있었습니다. 수염이 가슴까지 내려오고 손에는 지팡이를 들고 있었습니다. 문은 잠겨 있었고 지키던 군사도 그대로였습니다.",
            "\"뉘, 뉘시오?\"<br>\"나는 이 바다를 오래 지켜본 사람이오. 대왕의 병을 고칠 약을 하나 알고 있어 왔소.\"",
            "용왕이 겨우 몸을 일으켰습니다.<br>\"말씀해 주시오. 무엇이든 구해 오겠소.\"",
            "노인은 한참 동안 용왕을 내려다보았습니다. 그러고는 천천히 입을 열었습니다.<br>\"대왕의 병은 물에서 난 병이 아니오. 그러니 물에서 난 약으로는 낫지 않소.\" 목소리가 물결처럼 낮게 울렸습니다.",
            "\"그럼 어찌해야 합니까?\"<br>\"뭍에 사는 짐승 가운데 토끼라는 것이 있소. 그 토끼의 간을 얻어 잡수시면 씻은 듯이 나을 것이오.\"",
            "\"토끼라…….\" 용왕이 되뇌었습니다. 처음 들어 보는 이름이었습니다. \"그것이 어떻게 생긴 짐승입니까?\"<br>\"귀가 길고 눈이 붉고 뒷다리가 앞다리보다 긴 짐승이오. 산속을 뛰어다니며 풀을 뜯어 먹고 사는데, 겁이 아주 많고 꾀도 아주 많소.\"",
            "\"꾀가 많다니요?\"<br>노인이 처음으로 웃었습니다.<br>\"세상 짐승 가운데 제 목숨을 지키는 재주로 그만한 것이 없소. 그러니 데려오려거든 힘으로 될 일이 아니라는 것만은 알아 두시오.\"",
            "용왕이 무어라 물으려는데 노인의 모습이 스르르 흐려졌습니다. 정신을 차려 보니 침상 곁에는 아무도 없었습니다. 다만 방 안에 낯선 풀 냄새가 남아 있었습니다. 코끝에 오래 남는 냄새였습니다.",
            "이튿날 아침, 용왕은 신하들을 모두 불러들였습니다. 목소리에 오랜만에 힘이 실려 있었습니다.<br>\"간밤에 신선이 다녀갔다. 내 병에는 토끼의 간이 약이라 하더구나.\" 신하들이 서로 눈치를 살폈습니다.",
            "수궁 대신들이 서로 얼굴을 마주 보았습니다.<br>\"토끼라 하면 육지 짐승이 아닙니까.\"<br>\"그렇다. 그러니 누군가 육지로 나가야 한다.\"",
            "순간 넓은 조정이 물속처럼 조용해졌습니다. 아니, 물속이었지만 그보다 더 조용했습니다. 기침 소리 하나 나지 않았습니다.",
            "용왕이 신하들의 얼굴을 하나하나 훑어보았습니다.<br>\"누가 가겠느냐?\"",
            "아무도 대답하지 않았습니다. 문어 승상은 다리 여덟 개를 슬그머니 몸 아래로 말아 넣었고, 상어 장군은 갑자기 천장을 올려다보았습니다. 조기 대감은 눈을 껌뻑껌뻑하기만 했습니다. 다들 제 발끝만 내려다보았습니다.",
            "\"어허, 대답이 없구나.\"<br>용왕의 목소리가 조금 높아졌습니다. 그제야 신하들이 하나둘 입을 열었습니다. 그런데 그것이 하나같이 남에게 미루는 말이었습니다. 듣고 있던 용왕의 손이 떨렸습니다."
        ]
    },
    {
        num: 2,
        title: "누가 뭍에 오르겠느냐",
        art: ["story-02-a.png", "story-02-b.png", "story-02-c.png"],
        paras: [
            "먼저 문어 승상이 나섰습니다.<br>\"신은 다리가 여덟이라 헤엄은 잘 칩니다만, 뭍에 오르면 다리가 하나도 소용이 없습니다. 바싹 말라붙고 말 것이니 아무래도 상어 장군이 마땅할 듯합니다.\" 말끝에 슬쩍 남을 끌어들였습니다.",
            "상어 장군이 펄쩍 뛰었습니다.<br>\"신이 뭍에 오르면 어찌 되겠습니까. 이 큰 몸이 모래밭에 얹히면 그대로 끝입니다. 게다가 신은 생김새가 험해서 토끼가 보기만 해도 달아날 것입니다. 조기 대감이 어떻겠습니까.\" 말하면서도 눈은 조기 대감을 보고 있었습니다.",
            "조기 대감이 지느러미를 홰홰 저었습니다.<br>\"신은 뭍에 오르면 곧바로 소금에 절여져 굴비가 되고 맙니다. 그것은 신 하나 죽는 일로 끝나지 않고 나라의 체면이 걸린 일입니다.\" 말은 그럴듯했지만 결국 못 가겠다는 소리였습니다.",
            "듣고 있던 용왕의 얼굴이 붉어졌다 푸르러졌다 했습니다.<br>\"그러면 게 대감은 어떠한가.\"<br>\"신은 옆으로만 걷습니다. 곧장 가야 할 길을 옆으로만 가서야 언제 산에 닿겠습니까.\" 게 대감이 집게를 들었다 놓았습니다.",
            "\"고래 장군은?\"<br>\"신은 몸이 너무 커서 갯가에 닿기도 전에 배가 땅에 걸립니다.\"",
            "\"새우 대감은?\"<br>\"신은 몸이 너무 작아 산길에서 밟혀 죽습니다.\"",
            "크면 커서 못 가고, 작으면 작아서 못 가고, 험하게 생겨서 못 가고, 옆으로 걸어서 못 갔습니다. 온 조정이 못 간다는 말로만 가득 찼습니다. 핑계는 저마다 달랐지만 뜻은 하나였습니다.",
            "용왕이 마침내 자리에서 몸을 일으켰습니다. 야윈 손이 부들부들 떨렸습니다.<br>\"내가 그동안 너희를 어떻게 대접하였느냐. 좋은 자리에 앉히고 좋은 것을 먹였다. 그런데 이 나라에 나를 위해 뭍에 오를 자가 하나도 없단 말이냐.\" 말끝이 자꾸 흔들렸습니다.",
            "그 말에 신하들이 일제히 고개를 숙였습니다. 그러나 여전히 나서는 이는 없었습니다. 숨소리마저 죽인 채였습니다.",
            "그때 조정 맨 끝자리에서 목소리 하나가 들려왔습니다. 크지도 않고 떨리지도 않는 목소리였습니다.<br>\"신이 다녀오겠습니다.\" 조정 안이 술렁였습니다.",
            "모두가 소리 나는 쪽을 돌아보았습니다. 기둥 아래 자리에 자라 한 마리가 엎드려 있었습니다. 벼슬이 높지 않아 평소에는 말할 차례조차 오지 않던 별주부였습니다. 등딱지에 이끼가 앉은, 나이 든 자라였습니다.",
            "대신들이 웅성거렸습니다.<br>\"저 작은 것이 무슨 수로.\"<br>\"헤엄이 느리기로는 수궁에서 으뜸인데.\" 뒤에서 웃음을 참는 소리도 났습니다.",
            "자라는 그 말들을 못 들은 척하고 앞으로 걸어 나왔습니다. 걸음이 정말로 느렸습니다. 조정을 가로지르는 데만 한참이 걸렸습니다. 그래도 한 번도 멈추지 않았습니다.",
            "용왕 앞에 이르자 자라가 고개를 조아렸습니다.<br>\"신은 큰 벼슬을 한 적도 없고 이렇다 할 공을 세운 적도 없습니다. 그러나 신에게는 남들에게 없는 것이 두 가지 있습니다.\"",
            "\"무엇이냐?\"<br>\"하나는 등딱지입니다. 뭍에 올라도 몸이 마르지 않고, 위험을 만나면 머리와 다리를 안으로 넣을 수 있습니다. 다른 하나는 물과 뭍을 모두 다닐 수 있는 발입니다.\"",
            "용왕이 자라를 오래 내려다보았습니다.<br>\"그동안 내가 너를 몰라보았구나.\"<br>\"신을 알아보고 말고 할 것이 무엇 있겠습니까. 다만 갈 수 있는 자가 가는 것이 마땅할 뿐입니다.\" 자라의 목소리는 처음부터 끝까지 한결같았습니다.",
            "그러자 아까까지 못 간다던 대신들이 갑자기 말이 많아졌습니다.<br>\"과연 별주부요!\"<br>\"내 진작부터 저 사람이 보통이 아니라 생각했소.\"<br>자라는 고개를 돌리지 않았습니다. 누구도 자라와 눈을 마주치지 못했습니다.",
            "용왕이 물었습니다.<br>\"그래, 무엇이 필요하냐. 군사를 붙여 주랴? 보물을 지워 주랴?\"",
            "\"군사는 소용없습니다. 여럿이 가면 토끼가 먼저 달아납니다. 보물도 무겁기만 합니다.\"<br>\"그러면 무엇이 필요하냐.\"<br>\"토끼의 생김새를 그린 그림 한 장이면 됩니다.\" 자라가 잠시 생각하더니 대답했습니다.",
            "\"그림이라?\"<br>\"신은 평생 바닷속에서만 살아 토끼라는 것을 본 적이 없습니다. 산에 올라가서 아무나 붙들고 물을 수도 없는 노릇이니, 눈으로 알아볼 수 있어야 합니다.\"",
            "용왕이 무릎을 쳤습니다.<br>\"과연 생각이 깊구나. 화공을 부르라.\" 그날로 수궁에서 제일가는 화공이 불려 왔습니다.",
            "그날 밤 자라는 제 집으로 돌아가 늙은 어머니에게 절을 올렸습니다.<br>\"먼 길을 다녀오겠습니다.\"<br>어머니 자라가 아들의 등딱지를 오래 쓰다듬었습니다.<br>\"몸조심하여라. 그리고 무슨 일이 있어도 거짓말은 하지 마라.\"<br>자라는 그 말에 얼른 대답하지 못했습니다. 어머니는 눈이 어두워 아들의 얼굴을 손으로 더듬었습니다."
        ]
    },
    {
        num: 3,
        title: "화상 한 장 들고 뭍으로",
        art: ["story-03-a.png", "story-03-b.png", "story-03-c.png"],
        paras: [
            "이튿날 아침, 수궁에서 가장 그림을 잘 그린다는 화공이 불려 왔습니다. 화공은 붓과 벼루를 갖추어 놓고 자리에 앉았습니다. 종이도 수궁에서 가장 좋은 것으로 내왔습니다.",
            "그러나 곧 난처한 얼굴이 되었습니다.<br>\"신도 토끼를 본 적이 없습니다.\" 붓을 든 손이 허공에서 멈추었습니다.",
            "조정이 다시 술렁였습니다. 그때 늙은 거북 하나가 앞으로 나왔습니다. 젊었을 적에 갯가에 여러 번 올라가 보았다는 거북이었습니다.<br>\"내가 말하는 대로 그려 보시오.\" 나이가 하도 많아 등딱지에 조개가 붙어 있었습니다.",
            "거북이 눈을 감고 옛 기억을 더듬으며 말했습니다.<br>\"먼저 몸은 어른 주먹 두 개를 붙여 놓은 만하게 그리시오. 털은 잿빛이 도는 갈색이고, 배 쪽은 희끗하오.\" 화공이 붓을 놀리기 시작했습니다.",
            "붓이 종이 위를 스윽 지나갔습니다.<br>\"귀를 그리시오. 아주 길게. 그 몸에 어울리지 않을 만큼 길게 그려야 하오. 끝은 검은빛이 도오.\" 종이 위에 귀 두 개가 쭉 올라갔습니다.",
            "\"눈은 어떠하오?\"<br>\"눈은 붉소. 놀란 것처럼 늘 동그랗게 뜨고 있소. 코는 작고 늘 실룩거리며, 입술은 위쪽이 셋으로 갈라져 있소.\"",
            "\"다리는?\"<br>\"앞다리는 짧고 뒷다리가 아주 기오. 그래서 걷는 것이 아니라 뛰오. 앉아 있을 때는 뒷다리를 접고 앞다리로 몸을 세우오. 꼬리는 짧고 동그랗소.\" 신하들이 목을 빼고 들여다보았습니다.",
            "화공의 붓이 마지막으로 한 번 지나가자, 종이 위에 없던 짐승 한 마리가 나타났습니다. 귀가 길고 눈이 붉고 뒷다리가 긴 짐승이었습니다.",
            "수궁 신하들이 그림을 빙 둘러싸고 들여다보았습니다.<br>\"거참 우습게도 생겼구나.\"<br>\"저것의 간이 그렇게 좋다는 말이지.\" 누구는 손가락으로 그림을 가리키며 웃었습니다.",
            "용왕이 그림을 자라에게 내주었습니다. 자라는 그림을 곱게 말아 등딱지 밑에 단단히 끼워 넣었습니다. 행여 젖을까 기름 먹인 종이로 한 번 더 쌌습니다.",
            "\"별주부야.\"<br>\"예, 대왕.\"<br>\"살아서 돌아오너라. 토끼를 못 데려와도 좋다.\"<br>자라가 처음으로 고개를 들어 용왕을 마주 보았습니다. 그러고는 아무 말 없이 절을 올렸습니다.",
            "수궁의 온 신하가 궁문 밖까지 나와 자라를 배웅했습니다. 자라는 뒤를 한 번도 돌아보지 않고 물살을 헤치며 위로, 위로 올라갔습니다. 궁문이 닫히는 소리가 등 뒤에서 났습니다.",
            "물빛이 점점 밝아지더니 어느 순간 머리 위가 환해졌습니다. 자라가 처음으로 물 밖에 머리를 내밀었습니다. 머리 위로 흰 것이 일렁였습니다. 그것이 하늘이었습니다.",
            "숨이 턱 막혔습니다. 공기라는 것이 이렇게 가볍고 마른 것인 줄 몰랐습니다. 햇빛이 어찌나 밝은지 눈을 제대로 뜰 수가 없었습니다. 숨을 쉴 때마다 목이 따가웠습니다.",
            "자라는 모래밭을 기어올라 갔습니다. 물속에서는 몸이 저절로 떠올랐는데 뭍에서는 등딱지가 바위처럼 무거웠습니다. 백 걸음을 가고 한 번 쉬고, 백 걸음을 가고 또 쉬었습니다.",
            "그렇게 사흘을 기어 마침내 산자락에 닿았습니다. 소나무가 늘어서고 시냇물이 흐르는 곳이었습니다. 자라는 바위 그늘에 엎드려 숨을 골랐습니다. 등딱지가 햇볕에 달아올라 뜨거웠습니다.",
            "그때 산 위쪽에서 왁자한 소리가 들려왔습니다. 자라가 조심조심 다가가 보니, 넓은 풀밭에 온갖 짐승이 모여 있었습니다. 노루도 있고 멧돼지도 있고 여우도 있었습니다.",
            "무슨 잔치가 열렸는데 누가 윗자리에 앉을지를 두고 다투는 중이었습니다.<br>\"나이로 치면 내가 위요.\" 노루가 말했습니다.<br>\"나이가 무슨 소용이오. 힘으로 쳐야지.\" 멧돼지가 코를 킁킁거렸습니다.",
            "여우가 꼬리를 살랑거리며 끼어들었습니다.<br>\"힘도 나이도 아니오. 세상은 슬기로운 자가 위에 앉는 법이오.\"<br>\"그럼 슬기는 어찌 재느냐?\" 오소리가 물었습니다.<br>\"그거야…….\" 여우가 말끝을 흐렸습니다.",
            "그때 뒤쪽에서 조그만 목소리가 튀어나왔습니다.<br>\"그러지 말고 이렇게 합시다. 여기 있는 이들 가운데 아침 해를 가장 먼저 본 이가 윗자리에 앉기로.\" 다투던 짐승들이 일제히 입을 다물었습니다.",
            "짐승들이 일제히 그쪽을 돌아보았습니다. 뒷다리를 접고 앉은 작은 짐승 하나가 앞발을 들고 있었습니다. 귀가 길고 눈이 붉었습니다. 몸집은 그 자리에서 가장 작았습니다.",
            "자라의 가슴이 쿵 내려앉았습니다. 얼른 등딱지 밑에서 그림을 꺼내 펼쳐 보았습니다. 그림 속 짐승과 저 짐승이 꼭 같았습니다. 귀 끝의 검은 빛깔까지 그대로였습니다.",
            "\"찾았다.\"<br>자라는 숨을 죽이고 바위 뒤에 몸을 낮추었습니다.",
            "풀밭에서는 다툼이 계속되고 있었습니다. 결국 아무도 윗자리에 앉지 못했고, 짐승들은 저마다 투덜거리며 흩어졌습니다. 토끼는 마지막까지 남아 남이 흘린 밤톨을 주워 먹고 있었습니다. 아무도 그 작은 짐승을 눈여겨보지 않았습니다."
        ]
    },
    {
        num: 4,
        title: "벼슬을 준다는 말",
        art: ["story-04-a.png", "story-04-b.png", "story-04-c.png"],
        paras: [
            "자라가 슬금슬금 걸어 나갔습니다. 토끼가 먼저 알아채고 뒷다리에 힘을 주었습니다.<br>\"거 누구요?\" 귀가 자라 쪽으로 쫑긋 섰습니다.",
            "\"놀라지 마시오. 나는 남해 수궁에서 온 별주부라 하오.\"<br>토끼가 자라의 등딱지를 위아래로 훑어보았습니다.<br>\"수궁? 물속에 있다는 그 궁궐 말이오?\"<br>\"그렇소.\" 토끼가 한 걸음 다가왔습니다.",
            "토끼가 코를 실룩거렸습니다.<br>\"그런 데서 여기까지는 왜 왔소.\"<br>\"인재를 찾으러 왔소.\" 자라는 서두르지 않았습니다.",
            "\"인재?\"<br>\"우리 대왕께서 뭍에 슬기로운 짐승이 하나 있다는 말을 들으셨소. 데려다 벼슬을 내리고 싶어 하시오. 아까 그 자리싸움에서 나서는 것을 보니, 과연 그 말이 헛말이 아니었소.\"",
            "토끼의 두 귀가 쫑긋 섰습니다.<br>\"내가……. 그렇소? 하기야 이 산중에서 나만한 머리가 어디 있겠소.\" 아까 다투던 일이 떠올랐던 것입니다.",
            "자라는 속으로만 웃고 겉으로는 정색을 했습니다.<br>\"그런데 산중 살림이 어떠하오?\"",
            "그 말에 토끼의 얼굴이 대번에 어두워졌습니다.<br>\"말도 마시오. 봄에는 굶주린 짐승들이 눈에 불을 켜고 다니고, 여름에는 뱀이 들끓고, 가을에는 사냥꾼이 덫을 놓고, 겨울에는 먹을 것이 없어 나무껍질을 갉아 먹소. 하루도 마음 놓고 잠들어 본 적이 없소.\" 말하는 동안 토끼의 목소리가 떨렸습니다.",
            "\"그럴 것이오.\" 자라가 고개를 끄덕였습니다. \"그러니 수궁 이야기를 좀 들어 보시오.\"",
            "자라가 목소리를 낮추었습니다.<br>\"수궁에는 사냥꾼이 없소. 덫도 없고 독수리도 없소. 궁궐은 수정으로 지어 기둥이 산호요 지붕이 자개라, 물살이 지날 때마다 무지개가 이오. 상에는 진주가 굴러다니고, 먹을 것은 사철 넘치오.\" 토끼가 저도 모르게 몸을 앞으로 기울였습니다.",
            "토끼의 붉은 눈이 점점 커졌습니다.<br>\"게다가 대왕께서 그대에게 벼슬을 내리겠다 하셨소. 관을 쓰고 옥대를 두르고 높은 자리에 앉게 되는 것이오.\"",
            "\"벼, 벼슬을…….\" 토끼가 침을 꿀꺽 삼켰습니다.<br>\"어떻소, 나와 함께 가지 않겠소?\" 산에서 벼슬이라는 말을 들어 본 적이 없었습니다.",
            "토끼는 얼른 대답하지 못했습니다. 그러나 두 귀는 이미 자라 쪽으로 바짝 기울어 있었습니다. 가슴이 두근거려 말이 나오지 않았습니다.",
            "그때 머리 위 소나무 가지에서 까마귀 한 마리가 깍 하고 울었습니다.<br>\"토끼야, 가지 마라.\" 온 산이 울릴 만큼 큰 소리였습니다.",
            "토끼가 위를 올려다보았습니다.<br>\"너는 또 왜 참견이냐.\"<br>\"내가 그 바닷가에서 오래 살았다. 물에 사는 것들이 뭍에 올라오는 일은 없다. 하물며 벼슬을 주겠다고 기어 올라오는 일은 더더욱 없다.\"",
            "자라의 등딱지 밑에서 식은땀이 흘렀습니다. 그러나 겉으로는 껄껄 웃었습니다.<br>\"저 새가 나를 시기하는 모양이오. 남이 잘되는 꼴을 못 보는 것이지.\" 말은 그렇게 했지만 목소리가 조금 높아졌습니다.",
            "까마귀가 다시 울었습니다.<br>\"토끼야, 잘 생각해라. 저 짐승이 너에게 무엇을 얻으려 하는지 물어보아라. 세상에 까닭 없이 좋은 것을 주는 이는 없다.\" 까마귀는 가지 끝까지 내려와 앉았습니다.",
            "토끼가 잠시 망설였습니다. 그 순간 자라가 한 걸음 물러섰습니다.<br>\"정 그러면 그만두시오. 나도 여기까지 오느라 사흘을 기었소. 그대가 싫다면 다른 이를 찾아보겠소. 이 산에 슬기로운 짐승이 그대 하나뿐이겠소.\"",
            "그러고는 정말로 몸을 돌려 내려가기 시작했습니다. 걸음이 어찌나 느린지 열 걸음을 가는 데도 한참이 걸렸습니다. 일부러 그러는 것이었습니다.",
            "토끼가 그 뒷모습을 보았습니다. 그러자 다른 짐승이 관을 쓰고 옥대를 두르고 높은 자리에 앉아 있는 모습이 눈앞에 어른거렸습니다. 아까 풀밭에서 저를 밀어내던 여우의 얼굴도 떠올랐습니다. 그 생각을 하자 발이 저절로 움직였습니다.",
            "\"자, 잠깐!\"<br>토끼가 껑충 뛰어 자라를 앞질렀습니다.<br>\"가겠소. 내가 가겠소.\"",
            "까마귀가 가지 위에서 몇 번이나 더 울었습니다. 토끼는 한 번도 위를 올려다보지 않았습니다. 나중에는 그 소리가 성가시게만 들렸습니다.",
            "자라가 물었습니다.<br>\"헤엄은 칠 줄 아오?\"<br>\"그건 못 하오.\"<br>\"그러면 내 등에 타시오. 눈을 감고 있으면 물이 코로 들어오지 않소.\"",
            "토끼가 자라의 등딱지 위에 올라앉았습니다. 등딱지는 넓고 단단해서 앉기에 꼭 알맞았습니다. 토끼는 앞발로 등딱지 가장자리를 꼭 붙들었습니다.",
            "모래밭을 지나 물가에 이르렀습니다. 자라가 물속으로 몸을 들이밀자 토끼는 두 눈을 꼭 감았습니다. 마지막으로 산 쪽에서 까마귀 우는 소리가 아득하게 들려왔습니다. 물이 목까지 차오르자 토끼가 몸을 움츠렸습니다."
        ]
    },
    {
        num: 5,
        title: "수궁에서 생긴 일",
        art: ["story-05-a.png", "story-05-b.png", "story-05-c.png"],
        paras: [
            "얼마쯤 갔을까요. 자라가 말했습니다.<br>\"이제 눈을 떠도 되오.\" 물살이 한결 부드러워져 있었습니다.",
            "토끼가 눈을 뜬 순간 숨이 멎는 줄 알았습니다. 사방이 푸른 빛으로 가득했습니다. 물고기 떼가 무리 지어 지나가고, 산호가 숲처럼 자라 있고, 바닥에서는 조개가 입을 벌렸다 오므렸다 했습니다. 산에서는 본 적 없는 빛깔들이었습니다.",
            "그리고 저 앞에 궁궐이 있었습니다. 자라가 말한 그대로였습니다. 기둥은 산호요 지붕은 자개라, 물살이 지날 때마다 온 궁이 무지갯빛으로 일렁였습니다. 토끼는 입을 다물지 못했습니다.",
            "\"과연!\" 토끼가 감탄했습니다. \"내 평생 이런 것은 처음 보오.\"",
            "궁문이 열리고 신하들이 죽 늘어서 있었습니다. 그런데 토끼를 보는 눈들이 어쩐지 이상했습니다. 반가워하는 것도 아니고 놀라는 것도 아닌, 무언가를 아까워하는 듯한 눈이었습니다. 누구도 먼저 인사를 건네지 않았습니다.",
            "토끼는 잠깐 걸음을 멈추었습니다. 그러나 곧 스스로를 다독였습니다. 새로 온 자를 처음부터 반겨 주는 자리가 어디 있겠느냐고 말입니다. 그래도 자꾸 뒤가 서늘했습니다.",
            "너른 대궐 안으로 들어서니 높은 자리에 용왕이 앉아 있었습니다. 야윈 얼굴이었지만 두 눈만은 무섭게 빛나고 있었습니다. 숨소리가 방 안까지 들릴 만큼 가빴습니다.",
            "\"저것이 토끼렷다.\"<br>\"그러하옵니다.\" 자라가 엎드려 아뢰었습니다.<br>\"수고했다. 물러가 쉬어라.\"",
            "자라가 물러났습니다. 그런데 물러나면서 토끼 쪽을 한 번도 보지 않았습니다. 등딱지가 유난히 무거워 보였습니다.",
            "토끼가 앞으로 나아가 절을 올렸습니다.<br>\"산중에 사는 미천한 것이 대왕을 뵈옵니다. 벼슬을 내리신다는 말씀을 듣고 왔사옵니다.\" 목소리에 자랑스러운 기색이 묻어났습니다.",
            "그 말에 대궐 안이 잠시 조용해졌습니다. 그러고는 여기저기서 킥킥거리는 소리가 났습니다. 토끼는 그 웃음의 뜻을 알지 못했습니다.",
            "용왕이 손을 들어 조용히 시켰습니다. 그러고는 아주 천천히 입을 열었습니다.<br>\"벼슬이라……. 그래, 벼슬보다 더 큰 것을 주마. 네 이름이 이 바다에 길이 남을 것이다.\" 말끝이 이상하게 차가웠습니다.",
            "\"여봐라.\"<br>용왕의 목소리가 대궐을 울렸습니다.<br>\"저 토끼의 배를 갈라 간을 꺼내어라.\"",
            "토끼의 온몸이 얼음이 되었습니다.<br>\"예? 지, 지금 무어라 하셨습니까?\" 귀가 저절로 뒤로 눕혀졌습니다.",
            "\"내 병에는 산 토끼의 간이 약이라 하였다. 네가 여기까지 온 것은 그 때문이다.\"<br>군사들이 창을 들고 다가왔습니다. 창끝이 등불을 받아 번들거렸습니다.",
            "토끼의 머릿속이 새하얘졌습니다. 소나무 가지에서 울던 까마귀 소리가 그제야 또렷하게 되살아났습니다. 세상에 까닭 없이 좋은 것을 주는 이는 없다던 그 말이었습니다.",
            "그러나 토끼는 산중에서 제 목숨을 지키며 살아온 짐승이었습니다. 다리가 후들거리는 그 순간에도 머리만은 무섭게 돌아갔습니다. 숨을 크게 한 번 골랐습니다.",
            "창끝이 목에 닿기 직전, 토끼가 갑자기 무릎을 치며 큰 소리로 웃었습니다.<br>\"아이고, 이런 낭패가 있나!\"",
            "용왕이 손을 들어 군사를 멈춰 세웠습니다.<br>\"무엇이 낭패란 말이냐.\" 웃음소리가 대궐 안에 울렸습니다.",
            "\"대왕이시여, 진작 말씀을 하셨더라면 좋았을 것을. 소인의 간이 필요하셨다면 그저 그렇게 말씀하시면 될 일이 아니었습니까. 무엇하러 벼슬이니 무어니 하는 거짓말로 사람을 데려오셨습니까.\" 말하는 목소리가 조금도 떨리지 않았습니다.",
            "\"그게 무슨 말이냐.\"<br>\"소인의 간은 지금 뱃속에 없습니다.\"",
            "대궐 안이 술렁였습니다. 용왕의 눈썹이 꿈틀했습니다.<br>\"간이 없다니. 그런 짐승이 어디 있느냐.\" 대신들이 서로 얼굴을 쳐다보았습니다.",
            "\"다른 짐승은 그렇지 않으나 토끼만은 다릅니다.\" 토끼가 태연하게 말을 이었습니다. \"저희 간은 예로부터 온갖 짐승이 탐을 냅니다. 그래서 몸에 지니고 다니다가는 언제 배를 갈릴지 모릅니다. 하여 저희는 보름마다 간을 꺼내어 맑은 물에 씻어 바위틈에 감춰 두고, 필요할 때만 도로 넣습니다.\"",
            "\"그러면 지금은?\"<br>\"마침 어제가 씻는 날이었습니다. 지금 소인의 간은 산속 바위틈에 볕을 쬐고 있습니다. 배를 가르셔도 헛수고이십니다. 아무도 선뜻 칼을 들지 못했습니다. 못 믿으시겠거든 어디 갈라 보십시오.\"<br>그러고는 배를 쭉 내밀었습니다."
        ]
    },
    {
        num: 6,
        title: "뭍에 닿은 뒤",
        art: ["story-06-a.png", "story-06-b.png", "story-06-c.png"],
        paras: [
            "용왕이 한참 동안 토끼를 노려보았습니다. 토끼는 눈 하나 깜짝하지 않았습니다. 대궐 안이 숨소리도 나지 않았습니다.",
            "문어 승상이 조심스레 아뢰었습니다.<br>\"대왕이시여, 배를 갈랐다가 정말로 간이 없으면 저것도 잃고 약도 잃습니다.\"<br>다른 대신들도 고개를 끄덕였습니다. 말끝을 흐리며 용왕의 눈치를 살폈습니다.",
            "그때 자라가 앞으로 나섰습니다.<br>\"대왕이시여, 저 말은 거짓입니다. 짐승이 어찌 간을 꺼내 두고 삽니까.\" 목소리가 저도 모르게 높아졌습니다.",
            "토끼가 자라를 돌아보았습니다. 그리고 아주 서운한 얼굴을 지어 보였습니다.<br>\"별주부, 그대야말로 나에게 벼슬을 준다 하지 않았소. 그 말은 참이었소?\" 귀를 축 늘어뜨리기까지 했습니다.",
            "자라가 말문이 막혔습니다. 대궐 안이 조용해졌습니다. 거짓말을 한 쪽은 자라였고, 그것을 모두가 보고 있었습니다. 자라는 고개를 들지 못했습니다.",
            "용왕이 길게 숨을 내쉬었습니다.<br>\"토끼야, 네 말이 참이라면 어찌하겠느냐.\"<br>\"소인을 뭍에 데려다주십시오. 반나절이면 간을 찾아 돌아오겠습니다. 대왕의 병을 고치고 큰 상까지 받을 일을 무엇하러 마다하겠습니까.\"",
            "그 말이 그럴듯하게 들렸습니다. 용왕은 마침내 고개를 끄덕였습니다.<br>\"그리하여라. 다만 오늘 저지른 무례는 잊어 주마. 네 간을 가져오면 그때는 정말로 벼슬을 내리겠다.\" 토끼가 넙죽 절을 올렸습니다.",
            "그날 저녁 수궁에서는 큰 잔치가 열렸습니다. 토끼는 상석에 앉아 진귀한 음식을 배가 터지도록 먹었습니다. 다만 술만은 한 방울도 입에 대지 않았습니다. 취하면 말이 헛나올 것을 알고 있었기 때문입니다.",
            "이튿날 새벽, 자라가 토끼를 등에 태우고 다시 물길을 올랐습니다. 둘 다 아무 말이 없었습니다. 물살을 가르는 소리만 났습니다.",
            "모래밭에 닿자 토끼가 등딱지에서 폴짝 뛰어내렸습니다. 그러고는 앞발로 흙을 몇 번 긁어 보고, 코를 실룩거려 풀 냄새를 맡아 보았습니다. 오랜만에 맡는 흙냄새였습니다.",
            "\"별주부.\"<br>\"어서 가서 간을 가져오시오.\"<br>토끼가 씩 웃었습니다.<br>\"세상에 간을 꺼내 놓고 사는 짐승이 어디 있소.\"",
            "자라가 그 자리에 굳어 버렸습니다. 토끼는 이미 열 걸음 밖에 있었습니다.<br>\"그대가 나를 속였으니 나도 그대를 속인 것이오. 이만하면 셈이 맞지 않소?\"<br>그러고는 산 쪽으로 껑충껑충 뛰어 사라졌습니다. 자라는 한 걸음도 쫓아가지 못했습니다.",
            "자라는 한나절이 넘도록 그 모래밭에 그대로 엎드려 있었습니다. 해가 기울고 물이 발끝까지 밀려와도 움직이지 않았습니다. 파도가 등딱지를 몇 번이나 넘어갔습니다.",
            "무슨 낯으로 수궁에 돌아간단 말입니까. 대왕은 여전히 자리에 누워 계신데 저는 빈손이었습니다. 게다가 대궐 한복판에서 거짓말쟁이가 되었습니다. 돌아갈 길이 물속에 있는데도 아득했습니다.",
            "자라의 눈에서 눈물이 뚝뚝 떨어져 모래에 스몄습니다.<br>\"어머니께서 무슨 일이 있어도 거짓말은 하지 말라 하셨는데.\"",
            "그때 등 뒤에서 목소리가 들려왔습니다.<br>\"울지 마라.\" 낮고 느린 목소리였습니다.",
            "돌아보니 흰 옷을 입은 노인이 서 있었습니다. 수염이 가슴까지 내려오고 손에는 지팡이를 들고 있었습니다. 자라는 그 노인을 본 적이 없었지만, 어쩐지 낯설지가 않았습니다.",
            "\"뉘시옵니까.\"<br>\"네 임금의 침상에 한 번 다녀간 사람이다.\"",
            "자라가 얼른 엎드렸습니다.<br>\"어르신, 소인은 토끼를 놓쳤습니다. 대왕을 살릴 길이 없어졌습니다.\" 모래에 이마가 닿도록 엎드렸습니다.",
            "노인이 지팡이로 모래를 짚으며 말했습니다.<br>\"내가 토끼의 간을 말한 것은 약을 알려 준 것이 아니었다. 이 넓은 나라에 임금을 위해 뭍에 오를 자가 하나라도 있는지 보고자 한 것이다.\" 자라가 눈을 크게 떴습니다.",
            "\"예?\"<br>\"큰 벼슬을 한 자들은 모두 못 간다 하였고, 아무 벼슬도 없던 네가 가겠다 하였다. 그것으로 되었다.\"",
            "노인이 품에서 조그만 뿌리 하나를 꺼내 자라 앞에 놓았습니다. 흙빛이 도는 늙은 산삼이었습니다.<br>\"이것을 달여 드시게 하여라. 사흘이면 일어나실 것이다.\" 잔뿌리에 흙이 그대로 묻어 있었습니다.",
            "자라가 고개를 들었을 때 노인은 이미 없었습니다. 모래밭에는 지팡이 자국만 몇 개 남아 있었습니다.",
            "자라가 산삼을 등딱지 밑에 끼우고 물로 들어갔습니다. 사흘 뒤, 남해 용왕은 자리를 털고 일어났습니다. 궁 안이 오랜만에 웃음소리로 찼습니다.",
            "용왕은 자라에게 높은 벼슬을 내리려 했습니다. 그러나 자라는 사양했습니다.<br>\"신은 거짓말로 남을 속여 데려온 자입니다. 상을 받을 낯이 없습니다.\"<br>\"그 거짓말은 나를 위한 것이 아니었느냐.\"<br>\"그래도 거짓말은 거짓말입니다.\"",
            "용왕은 한참 만에 고개를 끄덕였습니다. 그러고는 자라를 조정 맨 앞자리에 앉히되 벼슬 이름은 붙이지 않았습니다. 벼슬 없이 앞자리에 앉은 신하는 수궁이 생긴 이래 처음이었습니다. 그 자리는 지금도 별주부 자리라 불린답니다.",
            "한편 산속의 토끼는 그 뒤로 물가에 얼씬도 하지 않았다고 합니다. 다만 누가 벼슬을 준다는 말을 꺼내기만 하면 귀를 착 눕히고 먼저 뒷걸음질을 쳤다지요."
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
                ${artFrame('cover.png', '🐢')}
            </div>
            <div class="story-page-right">
                <h1>토끼전</h1>
                <p>토끼전은 지은이가 알려지지 않은 조선 시대 소설이에요. 별주부전, 토생원전, 수궁가 같은 여러 이름으로 불린답니다.</p>
                <p>이 이야기는 원래 판소리로 불리던 것이 글로 옮겨진 것이에요. 판소리 다섯 마당 가운데 수궁가가 바로 이 이야기지요. 그래서 문장에 노래하듯 늘어놓는 대목이 유난히 많답니다.</p>
                <p>뿌리는 훨씬 오래되었어요. 삼국사기에 실린 구토 설화가 그것인데, 신라의 김춘추가 고구려에 붙잡혔을 때 이 이야기를 듣고 꾀를 내어 풀려났다고 적혀 있답니다.</p>
                <p>조선 후기에는 같은 이야기의 끝이 수십 가지로 갈렸어요. 부르는 소리꾼마다, 듣는 사람마다 바라는 것이 달랐기 때문이지요. 그래서 토끼전은 어느 책을 펴느냐에 따라 마지막 쪽이 다르답니다.</p>
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
    { q: "용왕이 병을 얻은 까닭은 무엇입니까?", choices: ["싸움을 하다 크게 다쳐서", "사흘 밤낮 이어진 잔치 끝에", "차가운 물살에 오래 있어서"], answer: 1 },
    { q: "신선이 일러 준 약은 무엇입니까?", choices: ["천 년 묵은 산삼", "용의 비늘 가루", "산 토끼의 간"], answer: 2 },
    { q: "육지로 가겠다고 나선 것은 누구입니까?", choices: ["별주부 자라", "문어 승상", "잉어 대신"], answer: 0 },
    { q: "자라가 육지로 가면서 챙겨 간 것은 무엇입니까?", choices: ["용왕이 준 구슬", "바다에서 난 약초", "토끼를 그린 화상"], answer: 2 },
    { q: "자라가 토끼를 꾈 때 내세운 것은 무엇입니까?", choices: ["수궁의 벼슬자리", "금은보화 한 자루", "산속의 넓은 땅"], answer: 0 },
    { q: "토끼에게 가지 말라고 말린 것은 누구입니까?", choices: ["여우", "까마귀", "노루"], answer: 1 },
    { q: "토끼가 용왕 앞에서 한 말은 무엇입니까?", choices: ["간이 원래 없다고 했다", "간을 바위틈에 두고 왔다", "간을 줄 수 없다고 했다"], answer: 1 },
    { q: "용왕은 토끼의 말을 듣고 어떻게 했습니까?", choices: ["그 자리에서 가두었다", "믿지 않고 화를 냈다", "잔치를 열어 대접했다"], answer: 2 },
    { q: "육지에 닿은 토끼는 무엇을 했습니까?", choices: ["껑충 뛰어 달아났다", "간을 찾아다 주었다", "자라를 물에 밀었다"], answer: 0 },
    { q: "용왕의 병은 끝내 무엇으로 나았습니까?", choices: ["토끼가 보낸 간", "수궁 의원의 침", "신선이 준 산삼"], answer: 2 },
    { q: "자라는 상을 사양하며 무어라 했습니까?", choices: ["거짓말을 한 낯이 없다고", "이미 충분히 받았다고", "고향으로 가겠다고"], answer: 0 },
    { q: "이 이야기의 뿌리가 되는 옛 기록은 무엇입니까?", choices: ["삼국유사의 건국 신화", "삼국사기의 구토 설화", "조선왕조실록의 기사"], answer: 1 }
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
    emoji: '🐢',
    art: ['end.png'],
    paras: [
        `이 이야기는 책이 되기 전에 노래였고, 노래가 되기 전에는 아주 짧은 옛이야기였습니다. 지금까지 확인되는 가장 오래된 자리는 『삼국사기』입니다.`,
        `김유신 편에 이런 대목이 있습니다. 신라의 김춘추가 고구려에 갔다가 붙잡혀 갇혔을 때, 고구려 사람 하나가 몰래 이 이야기를 들려주었습니다. 거북이 토끼를 속여 데려갔는데 토끼가 간을 두고 왔다고 둘러대어 빠져나온 이야기입니다. 김춘추는 그 말뜻을 알아듣고 같은 수로 풀려났습니다.`,
        `그러니까 이 이야기는 처음부터 재미로만 하는 이야기가 아니었습니다. 갇힌 사람에게 빠져나가는 법을 알려 주는 이야기였습니다.`,
        `더 멀리 가면 인도까지 닿습니다. 인도의 옛이야기 모음에는 악어가 원숭이의 심장을 노리는 이야기가 있습니다. 원숭이는 심장을 나무에 걸어 두고 왔다고 말해 살아납니다. 짐승만 바뀌었을 뿐 뼈대가 같습니다. 이야기가 인도에서 중국을 거쳐 우리 땅까지 건너온 것으로 봅니다.`,
        `그 짧은 이야기가 조선에 와서 판소리 「수궁가」가 되었습니다. 부르는 사람마다 살을 붙이다 보니 용궁 신하들이 서로 안 가겠다고 다투는 대목이 생기고, 토끼가 뭍에서 만난 짐승들 이야기가 생기고, 자라가 화상을 들고 헤매는 대목이 생겼습니다. 원래는 몇 줄이던 것이 몇 시간짜리가 된 것입니다.`,
        `책 이름도 여럿입니다. 토끼전, 별주부전, 토의 간. 무엇을 앞에 놓느냐에 따라 이야기의 주인이 달라집니다. 토끼전이라 하면 꾀로 살아난 토끼 이야기가 되고, 별주부전이라 하면 임금을 위해 목숨 걸고 뭍에 오른 자라 이야기가 됩니다.`,
        `이 이야기가 겨눈 곳은 분명합니다. 용왕은 제 병을 고치자고 남의 배를 가르려 합니다. 신하들은 서로 미루기만 합니다. 자라 하나만 나섭니다. 그리고 그 자라도 결국 남을 속여야 임금을 살릴 수 있습니다. 위쪽 사람들이 하는 일이 대개 그렇다고 말하는 이야기입니다.`,
        `토끼가 이기는 방식도 눈여겨볼 만합니다. 힘으로 이기지 않습니다. 발이 빨라서 이기지도 않습니다. 말로 이깁니다. 간을 꺼내 놓고 다닌다는, 조금만 생각해 보면 말이 안 되는 소리를 온 수궁이 믿어 버립니다.`,
        `왜 믿었을까요. 믿고 싶었기 때문입니다. 용왕은 살고 싶었고, 신하들은 이 일이 어서 끝나기를 바랐습니다. 사람이 속는 것은 속이는 사람이 똑똑해서가 아니라 속는 쪽이 바라는 것이 있기 때문이라는 것을, 이 이야기가 웃으며 짚어 줍니다.`,
        `토끼가 뭍으로 나가겠다고 마음먹은 대목도 다시 볼 만합니다. 애초에 토끼를 물로 끌어들인 것은 벼슬을 준다는 말이었습니다. 산속에서 잘 살던 토끼가 높은 자리를 준다는 말 한마디에 물속까지 따라 들어갔습니다. 속은 쪽에도 빌미가 있었던 셈입니다.`,
        `끝맺음은 책마다 다릅니다. 자라가 빈손으로 돌아가 벌을 받는 것도 있고, 바다에 뛰어드는 것도 있고, 이 책처럼 신선이 나타나 약을 주는 것도 있습니다. 부르는 사람이 듣는 사람의 얼굴을 보고 정했기 때문입니다. 어느 것이 원래 결말인지는 정할 수 없습니다.`,
        `이 책이 신선을 부른 데는 까닭이 있습니다. 자라를 벌하기가 마땅치 않았기 때문입니다. 이 사람은 거짓말을 했지만 그 거짓말로 제 이익을 챙기지 않았습니다. 그렇다고 상을 주기도 어렵습니다. 그래서 벼슬 이름 없이 앞자리에 앉히는 것으로 끝냈습니다.`,
        `자라가 한 거짓말은 용서받을 만한 것일까요? 남을 죽이러 가면서 한 거짓말입니다. 그런데 제 임금을 살리려고 한 것이기도 합니다. 자라 스스로는 상을 받을 낯이 없다고 했습니다. 여러분 생각은 어떻습니까.`,
        `토끼가 한 거짓말은 어떻습니까? 자라의 거짓말과 무엇이 다른지, 아니면 다를 것이 없는지 견주어 보십시오. 둘 다 살자고 한 거짓말입니다.`,
        `용왕은 아무 벌도 받지 않았습니다. 남의 목숨을 가져다 제 병을 고치려 한 사람인데 그렇습니다. 이야기가 용왕을 벌하지 않은 까닭이 무엇일지, 그리고 벌했다면 이야기가 어떻게 달라졌을지 생각해 보십시오.`
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
