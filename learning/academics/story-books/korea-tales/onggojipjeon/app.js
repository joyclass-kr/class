const BOOK_TITLE = "옹고집전";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "옹당촌 옹고집",
        emoji: "🏯",
        art: ["story-01-a.png", "story-01-b.png", "story-01-c.png"],
        paras: [
            `옛날 옹진골 옹당촌이라는 마을에 옹고집이라는 사람이 살았습니다. 이 고을에서 그만한 부자가 없었습니다. 논이 백 마지기요 밭이 그 곱절이요, 곳간이 여섯 채나 되었습니다.`,
            `그런데 사람됨이 재물만 못했습니다. 아니, 재물이 늘어날수록 사람됨은 줄어들었습니다.`,
            `옹고집은 남에게 무엇 하나 내주는 법이 없었습니다. 곳간에 쌀이 썩어 나가도 굶는 이웃에게 한 되를 꾸어 주지 않았습니다. 오히려 쌀이 상하면 개천에 내다 버렸습니다.<br>"남 주느니 버리는 게 낫지. 한 번 주면 자꾸 얻으러 온다."`,
            `종들에게는 새벽부터 밤까지 일을 시켰습니다. 그러면서 새참 한 그릇이 아까워 물만 떠다 주었습니다. 누가 앓아누우면 약을 지어 주기는커녕 밥부터 끊었습니다.<br>"일 안 하는 입에 밥이 왜 들어가느냐."`,
            `지나가는 나그네가 하룻밤 재워 달라 하면 몽둥이를 들고 나섰습니다. 거지가 문 앞에 서면 개를 풀었습니다. 옹당촌 개들은 사람을 물도록 길러져 있었습니다.`,
            `마을 사람들은 옹고집 집 앞을 지날 때면 일부러 먼 길로 돌아갔습니다.<br>"저 집 담 밑을 지나면 재수가 없대."<br>"쌀 한 톨 나오지 않는 부잣집이 다 무슨 소용이야."`,
            `그렇다고 옹고집이 부끄러워한 것은 아닙니다. 오히려 그 소문을 은근히 자랑스러워했습니다.<br>"내가 저놈들처럼 물러 터졌으면 이만큼 모았겠느냐."`,
            `옹고집에게는 아내와 아들딸이 있었습니다. 그러나 집 안에도 웃음소리가 없었습니다. 밥상에서 반찬 하나를 더 집어도 눈총을 받았기 때문입니다.`,
            `아내가 어쩌다 친정에 쌀을 보내려 하면 저울부터 가져왔습니다.<br>"몇 되나 보내려는가. 세어 보고 보내게."`,
            `아들이 서당에 다니고 싶다 하면 코웃음을 쳤습니다.<br>"글 읽어 봐야 밥이 나오느냐 떡이 나오느냐. 그 시간에 논에 물이나 대라."`,
            `그렇게 옹고집의 곳간은 해마다 불어났습니다. 그리고 그 집 담장은 해마다 높아졌습니다.`,
            `그런데 그 높은 담장 안, 안채에서도 가장 구석진 방 하나에 옹고집의 늙은 어머니가 누워 있었습니다.`,
            `옹고집의 어머니는 여든이 넘었습니다. 몇 해 전부터 다리를 쓰지 못해 누워만 지냈습니다.`,
            `그런데 그 방에는 한겨울에도 불을 때지 않았습니다.<br>"누워만 계신 분이 무슨 땔감이 필요하냐. 이불을 덮으면 될 것을."`,
            `밥상은 하루에 두 번 들어갔습니다. 식은 밥에 간장 한 종지가 전부였습니다. 종이 밥을 들여놓고 나오면 그것으로 끝이었습니다.`,
            `어느 날 밤, 어머니가 기침을 심하게 했습니다. 며느리가 조심스레 옹고집에게 말했습니다.<br>"어머님께서 밤새 기침을 하십니다. 의원을 부를까요?"`,
            `옹고집은 장부에서 눈도 떼지 않았습니다.<br>"의원 값이 얼만 줄 아느냐. 늙으면 다 그런 것이다."`,
            `"그러면 방에 불이라도……."<br>"이 사람이 오늘따라 말이 많구먼."`,
            `이튿날 아침, 어머니가 아들을 불렀습니다. 옹고집은 마지못해 방에 들어섰습니다. 방 안 공기가 바깥보다 차가웠습니다.`,
            `"아범아."<br>"무슨 일이십니까."<br>"내가 오래 살아 미안하구나."`,
            `옹고집이 잠깐 말문이 막혔습니다. 그러나 곧 퉁명스럽게 대답했습니다.<br>"별말씀을 다 하십니다."`,
            `"다만 한 가지만 부탁하마. 문 앞에 온 사람은 그냥 돌려보내지 마라. 물 한 그릇이라도 주어 보내라. 네 아버지가 그렇게 사셨다."`,
            `옹고집은 대답하지 않고 방을 나왔습니다. 그러고는 마당에서 종을 불러 야단을 쳤습니다.<br>"어머니 방에 누가 군불을 땠느냐! 아까워서 못 살겠구나."`,
            `종이 우물쭈물했습니다.<br>"아무도 안 땠습니다요."<br>"그럼 왜 아침에 굴뚝이 미지근하냐."<br>"그건 부엌 것이 옆으로 스민 것입지요."<br>옹고집은 그 부엌 아궁이마저 반으로 줄이라고 일렀습니다.`
        ]
    },
    {
        num: 2,
        title: "문전박대와 취암사의 밤",
        emoji: "🪵",
        art: ["story-02-a.png", "story-02-b.png", "story-02-c.png"],
        paras: [
            `그해 가을이었습니다. 월출봉 취암사에서 스님 하나가 시주<span class="gloss">(절에 쌀이나 돈을 보태는 일)</span>를 받으러 옹당촌에 내려왔습니다.`,
            `스님은 마을을 돌며 목탁을 두드렸습니다. 사람들은 형편대로 쌀을 한 줌씩 내주었습니다. 가난한 집에서는 보리를 한 움큼 내주며 미안해했습니다.`,
            `마지막으로 스님이 옹고집의 집 앞에 섰습니다. 담이 어찌나 높은지 지붕이 보이지 않을 지경이었습니다. 스님이 목탁을 두드렸습니다.`,
            `한참 만에 대문이 열리고 옹고집이 나왔습니다. 스님을 위아래로 훑어보더니 대뜸 물었습니다.<br>"무슨 일이오."<br>"소승은 월출봉 취암사에서 왔습니다. 절이 낡아 지붕을 고치려 하니 시주를 좀 하십시오."`,
            `옹고집이 코웃음을 쳤습니다.<br>"절이 낡았으면 중들이 고치면 될 것을, 왜 남의 집 쌀을 얻으러 다니시오."`,
            `"소승들도 손수 나무를 나르고 있습니다. 다만 기와를 살 돈이 없어……."<br>"그럼 기와를 얹지 마시오. 짚으로 덮으면 될 것 아니오."`,
            `스님은 화를 내지 않았습니다.<br>"댁의 곳간이 여섯 채라 들었습니다. 쌀 한 되면 소승이 그저 물러가겠습니다."`,
            `그 말에 옹고집의 얼굴이 붉어졌습니다.<br>"내 곳간을 세고 다녔단 말이냐! 이놈이 도둑질하러 온 것이 분명하다!"`,
            `옹고집은 마당에서 몽둥이를 집어 들었습니다. 종들이 말릴 새도 없었습니다.`,
            `"에이, 이 중놈아!"<br>몽둥이가 스님의 어깨를 후려쳤습니다. 스님이 비틀거리며 물러섰습니다. 목탁이 땅에 떨어져 데굴데굴 굴렀습니다.`,
            `옹고집은 그 목탁을 발로 밟아 부수고, 스님의 바랑<span class="gloss">(스님이 등에 지는 자루 모양의 짐)</span>을 빼앗아 담 밖으로 던져 버렸습니다.<br>"다시 오면 개를 풀 것이다!"`,
            `스님은 흙투성이가 된 채로 한참을 서 있었습니다. 그러고는 부서진 목탁 조각을 하나하나 주워 담고, 옹고집을 향해 조용히 합장했습니다.<br>"댁의 집에 곧 손님이 하나 들 것입니다."<br>그 말만 남기고 스님은 산으로 올라갔습니다.`,
            `그날 밤 취암사에서는 스님들이 모여 앉았습니다. 매를 맞고 돌아온 스님의 어깨에 시퍼런 자국이 나 있었습니다.`,
            `"관가에 알립시다."<br>"알려 봐야 소용없습니다. 그 사람이 원님과 술을 나누는 사이랍니다."`,
            `젊은 스님들이 목소리를 높였습니다.<br>"그런 자는 혼쭐이 나야 합니다."<br>"곳간에 불이라도 놓아야……."`,
            `그때 절에서 가장 나이 많은 노승이 눈을 떴습니다. 오랫동안 아무 말 없이 앉아 있던 노승이었습니다.<br>"불을 놓으면 그 집 종들이 먼저 탄다."`,
            `스님들이 입을 다물었습니다. 노승이 말을 이었습니다.<br>"그리고 재물을 태워 봐야 그 사람은 재물이 아까울 뿐 제 잘못은 끝내 모른다."`,
            `"그러면 어찌합니까."<br>"제가 남에게 한 짓을 제가 그대로 겪게 해 주면 된다."`,
            `노승은 마당으로 내려가 짚단을 한 아름 안고 왔습니다. 그러고는 밤새 짚을 엮기 시작했습니다.`,
            `팔이 생기고 다리가 생기고 몸통이 생겼습니다. 마지막으로 짚을 둥글게 말아 머리를 얹으니, 사람 크기의 허수아비 하나가 되었습니다.`,
            `노승은 붓을 들어 누런 종이에 글씨를 썼습니다. 그러고는 그 부적을 허수아비의 이마에 붙였습니다.`,
            `노승이 낮은 소리로 무어라 읊조리자, 허수아비의 짚이 스르르 살갗이 되고 눈이 열렸습니다. 이마에 붙은 부적은 스며들 듯 사라졌습니다.`,
            `짚으로 만든 것이 자리에서 일어나 앉았습니다. 그 얼굴이 옹고집과 털끝 하나 다르지 않았습니다. 젊은 스님 하나가 저도 모르게 뒷걸음질을 쳤습니다.`,
            `"내려가거라." 노승이 말했습니다. "다만 사람을 해치지는 마라. 집을 다스리고, 곳간을 열고, 그 집 노인을 잘 모셔라. 그것이 네가 할 일이다."<br>가짜 옹고집이 고개를 숙이고 산을 내려갔습니다.`
        ]
    },
    {
        num: 3,
        title: "또 하나의 옹고집",
        emoji: "👥",
        art: ["story-03-a.png", "story-03-b.png", "story-03-c.png"],
        paras: [
            `이튿날 낮이었습니다. 옹고집은 사랑방에서 장부를 들여다보고 있었습니다. 그때 마당이 소란스러워졌습니다.`,
            `"주인어른께서 들어오십니다!"<br>옹고집이 고개를 들었습니다. 무슨 소리인가 싶었습니다. 자기는 아침부터 이 방에 앉아 있었기 때문입니다.`,
            `문을 열고 마당을 내다본 순간, 옹고집은 그 자리에 얼어붙었습니다.`,
            `제 옷을 입고 제 걸음으로 걸어 들어오는 사람이 있었습니다. 얼굴도 키도 목소리도 저와 똑같았습니다. 왼쪽 눈썹 끝의 점까지 같았습니다.`,
            `"네, 네 이놈! 너는 누구냐!"<br>옹고집이 버선발로 뛰어나갔습니다.`,
            `가짜 옹고집이 천천히 돌아보았습니다. 그러고는 아주 태연하게 되물었습니다.<br>"그 말은 내가 물어야겠구나. 남의 집에 들어와 남의 옷을 입고 있는 네가 누구냐."`,
            `"뭐라고! 이 집이 내 집이다!"<br>"이 집은 내 집이다."`,
            `종들이 하나둘 모여들었습니다. 그러고는 두 사람을 번갈아 보며 어쩔 줄을 몰랐습니다.<br>"어느 분이 우리 어른이신가……."<br>"이쪽인 것 같기도 하고, 저쪽인 것 같기도 하고."`,
            `아내가 달려 나왔습니다. 옹고집이 반색을 했습니다.<br>"여보! 어느 쪽이 나요! 말해 보시오!"`,
            `아내는 두 사람 사이에 서서 한참을 살폈습니다. 얼굴을 보고, 손을 보고, 목소리를 들었습니다. 그러고는 새파랗게 질려 뒷걸음질을 쳤습니다.<br>"…모르겠습니다."`,
            `아들이 왔습니다. 딸이 왔습니다. 아무도 가리지 못했습니다.`,
            `옹고집이 발을 굴렀습니다.<br>"내 얼굴을 보아라! 삼십 년을 한집에 산 사람 얼굴을 못 알아본단 말이냐!"<br>가짜 옹고집이 조용히 말했습니다.<br>"얼굴을 알아보지 못하는 것이 아니라, 얼굴 말고는 아는 것이 없어서 그렇겠지."`,
            `집안에서 결판이 나지 않자 두 옹고집은 관가로 갔습니다. 온 마을 사람이 구경하러 따라나섰습니다.`,
            `고을 원님은 두 사람을 보고 눈을 몇 번이나 비볐습니다.<br>"허, 이런 일은 내 평생 처음이로다."`,
            `원님이 물었습니다.<br>"네가 옹고집이냐?"<br>"그러하옵니다." 두 사람이 동시에 대답했습니다. 목소리마저 같았습니다.`,
            `원님은 한참을 궁리하다가 무릎을 쳤습니다.<br>"좋다. 얼굴로는 못 가리니 살림으로 가려 보자. 제 집 일을 아는 자가 그 집 주인이다."`,
            `원님이 먼저 물었습니다.<br>"곳간이 몇 채이며 그 안에 무엇이 얼마나 들어 있느냐."`,
            `진짜 옹고집이 얼른 대답했습니다.<br>"곳간은 여섯 채이옵고, 쌀이 삼백 석, 보리가 백 석이옵니다."<br>가짜 옹고집이 고개를 저었습니다.<br>"곳간은 여섯 채가 맞으나 다섯째 곳간은 지난여름 비가 새어 반이 상했습니다. 지금 쌀은 이백사십 석이고, 상한 것을 골라내어 스무 석은 마을에 내주었습니다."`,
            `구경하던 사람들이 웅성거렸습니다. 마을 사람 하나가 소리쳤습니다.<br>"맞습니다요! 지난달에 저희가 쌀을 얻어 갔습니다!"`,
            `진짜 옹고집의 얼굴이 하얘졌습니다. 저는 그런 일을 시킨 적이 없었습니다.`,
            `원님이 다시 물었습니다.<br>"네 집 종이 몇이며 그 이름을 대어라."<br>진짜 옹고집이 우물거렸습니다.<br>"열둘, 아니 열넷쯤 되옵고, 이름은…… 돌쇠와 삼월이와……."<br>거기서 말이 막혔습니다.`,
            `가짜 옹고집이 열넷의 이름을 하나도 빠짐없이 댔습니다. 나이와 고향과 병까지 덧붙였습니다.<br>"막동이는 왼쪽 어깨를 다쳐 무거운 것을 지지 못하니 부엌일로 돌렸사옵니다."`,
            `마지막으로 원님이 물었습니다.<br>"네 어머니께서는 무엇을 잡숫고 계시냐."`,
            `진짜 옹고집이 입을 열지 못했습니다. 그는 어머니 밥상에 무엇이 오르는지 한 번도 본 적이 없었습니다.<br>가짜 옹고집이 대답했습니다.<br>"이가 성치 않으셔서 무른 죽을 올리고 있사옵니다. 사흘 전부터 방에 군불을 넣었사옵니다."`
        ]
    },
    {
        num: 4,
        title: "쫓겨나 빌어먹다",
        emoji: "🚪",
        art: ["story-04-a.png", "story-04-b.png", "story-04-c.png"],
        paras: [
            `원님이 판결을 내렸습니다.<br>"이쪽이 진짜 옹고집이다. 저쪽은 남의 집을 빼앗으려 든 자이니 곤장을 쳐서 고을 밖으로 내쫓아라."`,
            `"안 됩니다! 제가 옹고집입니다! 제가!"<br>진짜 옹고집이 발버둥을 쳤습니다. 그러나 사령들이 양팔을 붙들었습니다.`,
            `옹고집은 관가 마당에서 곤장을 맞았습니다. 평생 남에게 매를 들기만 했지 맞아 본 적은 없었습니다.`,
            `매질이 끝나자 사령들이 그를 고을 어귀까지 끌고 가 길바닥에 던졌습니다.<br>"다시 이 고을에 발을 들이면 그때는 옥에 가둘 것이다."`,
            `옹고집은 한참을 일어나지 못했습니다. 지나가는 사람들이 힐끔거리며 지나갔습니다. 그 가운데는 낯익은 마을 사람도 있었지만 아무도 부축해 주지 않았습니다.`,
            `해가 지자 추워졌습니다. 옹고집은 다리를 절며 걸었습니다. 갈 데가 없었습니다.`,
            `첫 번째 집 문을 두드렸습니다.<br>"하룻밤만 재워 주십시오."<br>안에서 대답이 돌아왔습니다.<br>"우리도 방이 없소."`,
            `두 번째 집에서는 문도 열어 주지 않았습니다. 세 번째 집에서는 개를 풀었습니다. 옹고집은 개에 쫓겨 논두렁으로 굴러떨어졌습니다.`,
            `그날 밤 옹고집은 남의 집 헛간 처마 밑에서 웅크리고 잤습니다. 밤새 이가 딱딱 부딪쳤습니다.`,
            `새벽에 눈을 뜨니 온몸이 얼어붙어 있었습니다. 손끝이 감각이 없었습니다.`,
            `그 순간 문득 어머니 방이 떠올랐습니다. 한겨울에도 불을 때지 않던 그 방. 이불 한 채로 여러 해를 나던 여든 넘은 노인.`,
            `옹고집은 처마 밑에서 몸을 웅크린 채로 오래도록 움직이지 못했습니다.`,
            `그때부터 옹고집은 이 마을 저 마을을 떠돌았습니다. 옷은 해지고 신은 떨어져 발이 다 드러났습니다.`,
            `배가 고파 견딜 수 없으면 남의 집 문 앞에 서서 손을 내밀었습니다. 처음에는 그 짓이 죽기보다 싫었습니다. 사흘을 굶고 나서야 손이 저절로 나갔습니다.`,
            `어떤 집에서는 밥을 한 덩이 싸 주었습니다. 어떤 집에서는 문을 쾅 닫았습니다. 어떤 집에서는 물을 끼얹었습니다.`,
            `옹고집은 물벼락을 맞고 돌아서면서 처음으로 그 생각을 했습니다.<br>'내가 저 짓을 했구나.'`,
            `그는 문 앞에 온 사람에게 물 한 그릇 준 적이 없었습니다. 개를 풀었고, 몽둥이를 들었습니다. 그때 그 사람들도 지금의 저처럼 사흘을 굶었을 것입니다.`,
            `겨울이 왔습니다. 옹고집은 다리를 절며 눈길을 걸었습니다. 발가락이 얼어 감각이 없어졌습니다.`,
            `한번은 어느 마을 잔칫집 담 밖에서 음식 냄새를 맡으며 서 있다가, 그 집 종에게 쫓겨났습니다. 그 종이 그를 밀치며 말했습니다.<br>"저리 가시오. 잔칫날 재수 없게."`,
            `옹고집은 그 말에 대꾸도 못 하고 물러섰습니다. 예전 같으면 몽둥이를 들었을 것입니다. 이제는 몽둥이도 없고 기운도 없었습니다.`,
            `그러던 어느 날, 옹고집은 제 고을 쪽으로 발길이 갔습니다. 들어가면 옥에 갇힐 줄 알면서도 그랬습니다.`,
            `그는 밤중에 마을 뒷산으로 올라가 제 집을 내려다보았습니다. 담장 안이 환했습니다.`,
            `놀랍게도 안채 구석방에서 불빛이 새어 나오고 있었습니다. 굴뚝에서는 연기가 곧게 올라갔습니다. 어머니 방이었습니다.`,
            `옹고집은 그 자리에 주저앉았습니다. 저 방에 불을 넣어 준 것은 짚으로 만든 것이었고, 불을 끊은 것은 아들이었습니다. 옹고집은 소매로 얼굴을 감쌌습니다.`
        ]
    },
    {
        num: 5,
        title: "눈 위의 노승",
        emoji: "❄️",
        art: ["story-05-a.png", "story-05-b.png", "story-05-c.png"],
        paras: [
            `그해 겨울은 유난히 길었습니다. 옹고집은 눈 덮인 산길을 넘다가 그만 쓰러지고 말았습니다.`,
            `며칠을 굶은 데다 발이 얼어 더는 걸을 수가 없었습니다. 눈발이 얼굴 위로 내려앉았습니다.`,
            `'이대로 끝나는구나.'<br>옹고집은 눈을 감았습니다. 이상하게도 억울하다는 생각이 들지 않았습니다. 다만 한 가지가 마음에 걸렸습니다.`,
            `어머니께 끝내 한 번도 죄송하다는 말을 하지 못했다는 것이었습니다.`,
            `얼마나 지났을까요. 누군가 어깨를 흔들었습니다.<br>"일어나시오."`,
            `옹고집이 겨우 눈을 떴습니다. 흰 눈 위에 잿빛 승복을 입은 노승이 서 있었습니다. 손에는 지팡이가 들려 있었습니다.`,
            `노승은 품에서 주먹밥 하나를 꺼내 옹고집의 손에 쥐여 주었습니다. 옹고집은 그것을 허겁지겁 먹었습니다. 다 먹고 나서야 목이 메었습니다.`,
            `"스님……. 어찌하여 저 같은 것에게……."<br>"길에 쓰러진 사람에게 밥을 주는 데 까닭이 필요하오?"`,
            `옹고집은 그 말에 고개를 들지 못했습니다. 저는 평생 까닭을 따졌습니다. 남에게 무엇을 주기 전에 그것이 돌아올지부터 셈했습니다.`,
            `"스님, 저는 벌을 받아 마땅한 사람입니다. 절에서 오신 스님을 몽둥이로 때려 내쫓은 일이 있습니다."<br>"알고 있소."`,
            `옹고집이 놀라 노승을 올려다보았습니다. 노승의 얼굴은 조금도 성난 기색이 없었습니다.`,
            `"그대가 그 일을 스스로 입에 올리기까지 겨울 하나가 걸렸구려."<br>노승은 품에서 누런 종이 한 장을 꺼냈습니다. 부적이었습니다.<br>"집으로 가시오. 그리고 이것을 그자에게 던지시오."`,
            `"스님, 그 사람은 대체 누구입니까."<br>노승이 담담하게 말했습니다.<br>"짚으로 엮은 것이오. 부적 한 장으로 사람 노릇을 하고 있을 뿐이오."`,
            `옹고집이 눈을 크게 떴습니다.<br>"짚이라고요? 그것이 제 집을 다스리고 제 식구를 돌보고……."<br>"그렇소. 짚으로 엮은 것도 하는 일을, 그대는 삼십 년을 하지 않았소."`,
            `그 말이 몽둥이보다 아팠습니다. 옹고집은 부적을 두 손으로 받쳐 들었습니다.`,
            `"스님, 한 가지만 여쭙겠습니다. 제가 집에 돌아가면 다시 예전으로 돌아갈까 봐 두렵습니다. 사람이 그렇게 쉽게 바뀌겠습니까."`,
            `노승이 처음으로 웃었습니다.<br>"그것을 두려워할 줄 알게 된 것이 바뀐 것이오."`,
            `옹고집이 고개를 들었을 때 노승은 이미 없었습니다. 눈 위에 지팡이 자국만 몇 개 나 있었습니다.`,
            `옹고집은 산을 내려갔습니다. 발이 부르텄지만 걸음이 전보다 빨랐습니다.`,
            `고을 어귀에 이르렀을 때 그는 잠시 걸음을 멈추었습니다. 사령에게 붙들리면 옥에 갇힐 것이었습니다.`,
            `그러나 옹고집은 큰길로 걸어 들어갔습니다. 숨어 들어가고 싶지 않았습니다.`,
            `마을 사람들이 그를 알아보고 수군거렸습니다. 그런데 이상하게도 아무도 사령을 부르지 않았습니다. 한 노인이 다가와 물었습니다.<br>"거지 노릇 하느라 고생 많았소?"<br>옹고집이 고개를 끄덕였습니다.<br>"예. 많았습니다."`,
            `노인이 혀를 찼습니다.<br>"그래도 요새 그 댁이 사람 사는 집이 됐소. 곳간을 열어 겨울을 나게 해 주었지. 우리 손주가 그 댁 쌀로 살았소."`,
            `옹고집은 그 말에 아무 대꾸도 하지 못했습니다. 그러고는 제 집 대문 앞에 섰습니다. 담장이 여전히 높았습니다.`
        ]
    },
    {
        num: 6,
        title: "짚으로 돌아가다",
        emoji: "🌾",
        art: ["story-06-a.png", "story-06-b.png", "story-06-c.png"],
        paras: [
            `대문이 열려 있었습니다. 예전에는 늘 빗장이 걸려 있던 문이었습니다.`,
            `마당에서 종들이 일하고 있었습니다. 그런데 새참 그릇이 놓여 있었고, 웃음소리가 났습니다.`,
            `누군가 옹고집을 알아보고 소리쳤습니다.<br>"어, 어른이 또 오셨다!"`,
            `안채에서 가짜 옹고집이 걸어 나왔습니다. 두 사람이 마당 한가운데에서 마주 섰습니다.`,
            `식구들이 몰려나왔습니다. 아내도, 아들도, 딸도 나왔습니다. 이번에도 아무도 어느 쪽이 진짜인지 알지 못했습니다.`,
            `그러나 이번에는 옹고집도 그것을 따지지 않았습니다. 그는 품에서 부적을 꺼냈습니다.`,
            `"내가 이 집 주인이라고 우기러 온 것이 아니오."<br>가짜 옹고집이 조용히 그를 바라보았습니다.<br>"그러면 무엇 하러 오셨소."`,
            `"고맙다는 말을 하러 왔소."<br>마당이 조용해졌습니다.`,
            `"내가 삼십 년을 하지 않은 일을 그대가 반년 만에 다 했소. 어머니 방에 불을 넣어 준 것도, 곳간을 연 것도 그대요. 나는 그 값을 갚을 길이 없소."`,
            `옹고집은 부적을 두 손으로 들었습니다. 손이 떨렸습니다.<br>"다만 이제부터는 내가 하겠소."`,
            `그러고는 부적을 던졌습니다. 부적이 가짜 옹고집의 가슴에 닿는 순간, 사람의 몸이 스르르 무너져 내렸습니다.`,
            `옷이 힘없이 주저앉고, 그 안에서 마른 짚이 우수수 쏟아졌습니다. 바람이 한 번 지나가자 짚 몇 오라기가 마당 위로 날아올랐습니다.`,
            `식구들이 비명을 지르며 물러섰습니다. 옹고집만이 그 짚 더미 앞에 무릎을 꿇고 앉았습니다. 그러고는 짚을 한 움큼 쥐어 가슴에 안았습니다.`,
            `옹고집이 자리에서 일어났습니다. 식구들이 그를 둘러싸고 어쩔 줄을 몰라 했습니다.`,
            `그런데 옹고집은 곳간으로도, 사랑방으로도 가지 않았습니다. 그는 뒤꼍으로 가서 장작을 한 아름 안고 나왔습니다.`,
            `"어른, 그건 종에게 시키시지요."<br>"내가 하겠다."`,
            `옹고집은 어머니 방 아궁이 앞에 쪼그리고 앉아 불을 지폈습니다. 평생 처음 해 보는 일이라 연기만 매캐하게 났습니다. 눈이 시려 눈물이 났습니다. 옹고집은 소매로 눈을 닦으며 계속 불을 밀어 넣었습니다.`,
            `이윽고 불길이 잡히고 굴뚝에서 연기가 곧게 올라갔습니다.`,
            `옹고집은 방문을 열고 들어가 어머니 앞에 무릎을 꿇었습니다. 어머니는 눈이 어두워 아들의 얼굴을 알아보지 못했습니다.`,
            `"아범이냐."<br>"예, 어머니."<br>"오늘은 목소리가 다르구나."`,
            `옹고집이 어머니의 마른 손을 잡았습니다. 그러고는 오랫동안 아무 말도 하지 못했습니다.`,
            `"어머니, 제가 잘못했습니다."<br>어머니는 그 말에 놀라지도 않았습니다. 다만 아들의 손등을 천천히 쓰다듬었습니다.<br>"그 말을 하는 데 오래 걸렸구나."`,
            `그 뒤로 옹고집은 사람이 달라졌습니다. 곳간 문에는 빗장 대신 됫박을 걸어 두었고, 문 앞에 온 사람은 누구든 물 한 그릇이라도 대접해 보냈습니다.`,
            `종들에게는 새참을 내주었고, 앓는 이가 있으면 사흘씩 쉬게 했습니다. 아들은 서당에 다니게 되었습니다.`,
            `그런데 옹고집은 딱 한 가지, 남들이 이상하게 여기는 버릇이 생겼습니다. 마당 한쪽에 짚단을 한 단 세워 두고 아무도 손대지 못하게 한 것입니다.`,
            `누가 까닭을 물으면 옹고집은 그저 이렇게 대답했습니다.<br>"내 스승이오."`,
            `그리고 월출봉 취암사 지붕에는 그해 가을 새 기와가 얹혔습니다. 누가 시주했는지는 절에서도 끝내 말하지 않았다고 합니다.`
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
                ${artFrame('cover.png', '🌾')}
            </div>
            <div class="story-page-right">
                <h1>옹고집전</h1>
                <p>옹고집전은 지은이가 알려지지 않은 조선 후기 소설이에요. 원래는 판소리로 불리던 것이 글로 옮겨진 것이랍니다.</p>
                <p>판소리 열두 마당 가운데 하나였지만 노래로 부르는 법은 끊기고 글만 남았어요. 이렇게 사설만 남은 판소리를 실전 판소리라고 부른답니다.</p>
                <p>고집이 세고 남의 말을 듣지 않는 사람을 옹고집이라 부르는 말이 여기서 나왔어요. 사람 이름이 그대로 낱말이 된 드문 경우지요.</p>
                <p>짚으로 사람 모양을 만들어 부적을 붙이면 진짜 사람처럼 움직인다는 생각은 우리 옛이야기에 자주 나와요. 짚으로 만든 것이 사람 노릇을 한다는 이야기는 홍길동전에도 비슷하게 나온답니다.</p>
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
    { q: "옹고집은 어떤 사람이었습니까?", choices: ["가난한데 마음이 넉넉한 사람", "재물이 많은데 몹시 인색한 사람", "글은 많이 읽었으나 겁이 많은 사람"], answer: 1 },
    { q: "옹고집이 어머니를 어떻게 모셨습니까?", choices: ["따로 좋은 집을 지어 드렸다", "날마다 문안을 드렸다", "불도 안 땐 방에 두었다"], answer: 2 },
    { q: "시주를 청하러 온 스님에게 옹고집은 무엇을 했습니까?", choices: ["매질하여 내쫓았다", "쌀 한 되를 주었다", "그냥 못 본 척했다"], answer: 0 },
    { q: "취암사 노승은 무엇으로 가짜 옹고집을 만들었습니까?", choices: ["나무를 깎은 인형", "흙으로 빚은 사람", "짚으로 엮은 허수아비"], answer: 2 },
    { q: "식구들이 두 옹고집을 가리지 못한 까닭은 무엇입니까?", choices: ["생김새가 털끝 하나까지 같아서", "둘 다 얼굴을 가리고 있어서", "날이 너무 어두워서"], answer: 0 },
    { q: "고을 원님은 무엇으로 진짜를 가리려 했습니까?", choices: ["글씨를 똑같이 써 보게 해서", "집안 살림의 내력을 물어서", "서로 힘을 겨루어 보게 해서"], answer: 1 },
    { q: "재판에서 진짜 옹고집이 진 까닭은 무엇입니까?", choices: ["겁이 나서 말을 더듬어서", "제 집 일을 하나도 몰라서", "편들어 줄 증인이 없어서"], answer: 1 },
    { q: "집에서 쫓겨난 옹고집은 어떻게 되었습니까?", choices: ["관가에 붙들려 갇혔다", "산속 절로 들어갔다", "빌어먹으며 떠돌았다"], answer: 2 },
    { q: "옹고집이 남의 집 문간에서 깨달은 것은 무엇입니까?", choices: ["제가 스님을 그렇게 내쫓았다는 것", "제 집이 세상에서 제일 좋다는 것", "재물이 다 헛된 것이라는 것"], answer: 0 },
    { q: "노승이 옹고집에게 준 것은 무엇입니까?", choices: ["쌀 한 자루", "지팡이 하나", "부적 한 장"], answer: 2 },
    { q: "부적을 던지자 가짜 옹고집은 어떻게 되었습니까?", choices: ["짚단으로 변해 흩어졌다", "문밖으로 뛰쳐나가 달아났다", "연기처럼 스르르 사라졌다"], answer: 0 },
    { q: "집에 돌아온 옹고집이 가장 먼저 한 일은 무엇입니까?", choices: ["곳간부터 열어 살펴보았다", "어머니 방에 불을 지폈다", "종들을 마당에 불러 모았다"], answer: 1 }
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
            ${artFrame('end.png', '📿')}
            <h2>옹고집전을 다 읽었습니다</h2>
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
