const BOOK_TITLE = "엄마 찾아 삼만리";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "떠난 어머니",
        emoji: "✉️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `백사십 년쯤 전, 이탈리아 제노바에 마르코라는 아이가 살았습니다. 열세 살이었습니다. 아버지는 병원에서 일했고, 형은 가게 점원이었습니다.`,
            `그 무렵 이탈리아는 아주 가난했습니다. 나라가 하나로 합쳐진 지 얼마 되지 않았고, 남쪽과 북쪽 다 일자리가 없었습니다. 그래서 그 시절 이탈리아 사람들이 배를 타고 밖으로 나갔습니다.`,
            `한 해에 수십만 명이 나갔습니다. 제일 많이 간 곳이 남아메리카였습니다. 아르헨티나와 브라질이었습니다.`,
            `배는 대개 제노바나 나폴리에서 떠났습니다. 부두에는 떠나는 사람과 배웅하는 사람이 늘 가득했습니다.`,
            `그 나라들은 그때 사람이 모자랐고, 일자리가 있었습니다. 왜 남아메리카였는지에는 까닭이 있습니다.`,
            `그 무렵 아르헨티나는 넓은 벌판을 밭으로 만들고 있었습니다. 밀과 소고기를 유럽에 팔면 돈이 되던 시절이었습니다. 그런데 그 넓은 땅을 갈 사람이 모자랐습니다. 그래서 아르헨티나 정부가 유럽에 사람을 보내 오라고 선전을 했습니다.`,
            `그 선전을 보고 이탈리아 사람들이 배를 탔습니다. 마르코의 집도 형편이 아주 나빠졌습니다. 아버지가 빚을 졌고, 갚을 길이 없었습니다.`,
            `그때 어머니가 말했습니다.<br>"제가 가겠습니다."`,
            `제노바에 어머니와 아는 집안이 하나 있었는데, 그 집이 아르헨티나로 옮겨 가면서 살림을 맡아 줄 사람을 구하고 있었습니다. 삯이 이탈리아에서 받는 것의 서너 배였습니다. 아버지가 반대했습니다.`,
            `"먼 데다."<br>"이 년만 있다 오겠습니다."`,
            `그렇게 어머니가 배를 탔습니다. 마르코가 열한 살 때였습니다. 배가 떠나던 날 마르코는 부두에서 오래 서 있었습니다.`,
            `배가 아주 컸는데, 항구를 나가자 점처럼 작아졌습니다. 그 뒤로 어머니의 편지가 왔습니다. 한 달에 한 번쯤이었습니다. 그리고 돈도 부쳐 왔습니다.`,
            `그 돈으로 집안이 다시 일어섰습니다. 아버지의 빚도 갚았습니다. 그런데 두 해째 되던 해부터 편지가 뜸해졌습니다. 그리고 어느 날부터 아예 끊겼습니다.`,
            `편지는 늘 짧았습니다. 잘 있다는 말과 몸조심하라는 말이 전부였습니다.`,
            `마르코는 그해에 학교를 그만두었습니다. 집안 형편 때문이 아니었습니다. 어머니가 부친 돈으로 형편은 나아졌습니다. 그런데 마르코는 앉아 있지를 못했습니다.`,
            `선생님이 아버지를 불러 이렇게 말했습니다.<br>"이 아이는 지금 여기 없습니다."`,
            `마르코는 그때부터 부두에 나가 살다시피 했습니다. 남아메리카에서 오는 배가 들어오면 내리는 사람들을 하나하나 보았습니다.`
        ]
    },
    {
        num: 2,
        title: "가겠습니다",
        emoji: "🚢",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `아버지는 여러 군데에 편지를 썼습니다. 어머니가 일하던 집으로도 쓰고, 이탈리아 영사관에도 썼습니다. 그리고 여러 달 만에 답이 하나 왔습니다.`,
            `편지 한 통이 그 먼 데까지 갔다 오는 데 넉 달이 걸렸습니다. 그래서 한 번 물어보고 답을 듣는 데 계절이 두 번 바뀌었습니다.`,
            `어머니가 일하던 집 주인이 부에노스아이레스에서 코르도바라는 도시로 옮겨 갔고, 어머니도 함께 갔다는 것이었습니다. 그런데 그 뒤로는 어디 있는지 모른다고 했습니다. 그리고 그 편지에 이런 줄이 있었습니다.`,
            `"그분이 몸이 좋지 않으셨습니다." 그 줄을 읽고 온 집안이 조용해졌습니다.`,
            `그날 밤 마르코가 아버지에게 말했습니다.<br>"제가 가겠습니다."`,
            `아버지가 웃었습니다.`,
            `웃었지만 웃는 얼굴이 아니었습니다.`,
            `"무슨 소리를 하는 거냐."<br>"제가 가서 찾아오겠습니다."<br>"거기까지 몇 달이 걸리는지 아느냐."<br>"압니다."<br>"돈은 어떻게 하고."<br>"뱃삯은 알아보았습니다. 삼등실이면 됩니다."`,
            `마르코는 그동안 혼자 다 알아보고 있었습니다. 아버지는 그것을 그때 알았습니다. 마르코는 항구에 몇 번이나 나가서 물어보았습니다.`,
            `열세 살짜리가 항구에 나가서 그런 것을 묻고 다니면 대개 쫓겨납니다. 마르코는 여러 번 쫓겨나면서 조금씩 알아냈습니다.`,
            `삼등실 삯이 얼마인지, 어느 배가 언제 떠나는지, 가는 데 며칠이 걸리는지. 그리고 종이에 다 적어 두었습니다. 아버지가 그 종이를 보고 아무 말도 하지 못했습니다.`,
            `여러 날 다투었습니다. 그런데 결국 아버지가 허락했습니다. 아버지도 이제 방법이 없었기 때문입니다.`,
            `형이 마르코에게 이렇게 말했습니다.<br>"네가 가서 못 찾으면 어떻게 할래."<br>"찾을 때까지 안 옵니다."<br>"찾을 때까지가 몇 년이면."<br>마르코는 대답하지 않았습니다.`,
            `병원 일 때문에 자기가 갈 수는 없었고, 형은 가게를 그만둘 수 없었습니다. 그리고 마침 제노바에서 아르헨티나로 가는 배에, 아버지가 아는 선장이 타고 있었습니다. 그 사람이 마르코를 봐 주기로 했습니다.`,
            `사월 어느 날 아침, 마르코가 배를 탔습니다. 열세 살이었습니다. 짐은 작은 가방 하나였습니다.`,
            `그 안에 옷 두 벌과, 어머니의 편지 묶음과, 아버지가 준 돈이 들어 있었습니다. 그리고 어머니 주소가 적힌 종이가 있었습니다. 이미 소용없어진 주소였습니다.`,
            `그래도 마르코는 그 종이를 여행 내내 가지고 다녔습니다.`
        ]
    },
    {
        num: 3,
        title: "스물일곱 날",
        emoji: "🌊",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `배를 타고 가는 데 스물일곱 날이 걸렸습니다. 삼등실은 배 밑바닥이었습니다. 창이 없었고, 사람이 아주 많았습니다.`,
            `그 시절 배는 증기와 돛을 함께 썼습니다. 바람이 좋으면 빨랐고 나쁘면 한없이 느렸습니다. 스물일곱 날은 운이 좋은 편이었습니다.`,
            `침상이 벽에 삼층으로 붙어 있었습니다. 그 배에 탄 사람들은 다 마르코와 비슷한 처지였습니다. 이탈리아 여러 곳에서 온 사람들이었습니다.`,
            `한 사람 몫이 널빤지 한 장 넓이였습니다. 짐은 그 발치에 두었습니다. 통로에서 사람이 지나가면 몸을 옆으로 세워야 했습니다.`,
            `북쪽에서 온 사람도 있고 남쪽 시칠리아에서 온 사람도 있었습니다. 그런데 서로 말이 잘 안 통했습니다. 그 시절 이탈리아는 지방마다 말이 달랐기 때문입니다. 그래서 사람들이 손짓을 섞어 가며 이야기했습니다.`,
            `그때 이탈리아는 나라가 합쳐진 지 스무 해쯤밖에 되지 않았습니다. 그전까지는 여러 나라로 나뉘어 있었습니다. 그래서 북쪽 사람과 남쪽 사람이 서로 말이 안 통했습니다. 그런데 배 위에서 여러 주를 함께 지내면서 조금씩 통하게 되었습니다.`,
            `이탈리아 말이 하나로 되는 데는 그 뒤로도 오래 걸렸습니다. 배가 지중해를 지나 대서양으로 나갔습니다. 첫 열흘은 견딜 만했습니다. 그런데 열흘이 지나자 다들 지쳤습니다.`,
            `밑바닥이라 공기가 나빴고, 사람이 아프기 시작했습니다. 아이 하나가 배 위에서 세상을 떠났습니다.`,
            `배 안에서 물이 상하고 음식이 상했습니다. 그 시절 이런 배에서 사람이 죽는 일은 드물지 않았습니다.`,
            `그날 갑판에서 짧은 장례가 있었습니다. 마르코는 그것을 보고 밤에 잠을 자지 못했습니다.`,
            `그 아이의 어머니가 갑판 난간을 붙잡고 오래 서 있었습니다. 아무도 말을 걸지 않았습니다.`,
            `어떤 사람이 마르코에게 이렇게 물었습니다.<br>"너는 왜 혼자 가니?"<br>"어머니를 찾으러 갑니다."<br>"어디 계신데?"<br>"모릅니다."<br>그 사람이 한참 마르코를 보다가 말했습니다.<br>"돌아가라."<br>"안 돌아갑니다."<br>그 사람이 다시 말했습니다.<br>"저기가 얼마나 넓은지 너는 모른다."`,
            `그 말은 맞는 말이었습니다. 아르헨티나는 이탈리아의 아홉 배가 넘습니다. 마르코는 그것을 그때 몰랐습니다.`,
            `배가 남쪽으로 갈수록 밤하늘이 달라졌습니다. 이탈리아에서 보던 별자리가 하나씩 사라졌습니다. 마르코는 갑판에 올라가 그것을 보았습니다.`
        ]
    },
    {
        num: 4,
        title: "부에노스아이레스",
        emoji: "🏙️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `배가 부에노스아이레스에 닿았습니다. 마르코는 그 도시를 보고 놀랐습니다. 길이 아주 넓고 곧았습니다. 그리고 사람이 아주 많았습니다.`,
            `배에서 내리는 데만 반나절이 걸렸습니다. 이름을 적고, 어디로 가는지를 대고, 짐을 검사받았습니다.`,
            `그런데 그 사람들 가운데 절반쯤이 이탈리아 말을 했습니다. 그 시절 부에노스아이레스는 인구의 상당수가 이탈리아에서 온 사람들이었습니다. 마르코는 어머니를 소개해 준 사람의 사촌을 찾아갔습니다.`,
            `아버지가 그 주소를 알려 준 것이었습니다. 그 집을 찾는 데 하루가 걸렸습니다. 그리고 그 집에 가 보니 문이 잠겨 있었습니다.`,
            `그런데 그 도시는 마르코가 생각한 것보다 훨씬 컸습니다. 같은 이름의 거리가 여럿 있었습니다.`,
            `이웃 사람이 말했습니다.<br>"그 사람은 죽었소. 지난달에."`,
            `마르코는 그 자리에 주저앉았습니다. 그 도시에 아는 사람이 그 한 사람뿐이었습니다. 그리고 마르코에게 남은 돈은 며칠치였습니다.`,
            `그 자리에 얼마나 앉아 있었는지 마르코는 기억하지 못했습니다.`,
            `이탈리아 말을 하는 사람은 많았지만, 그 가운데 마르코를 아는 사람은 없었습니다. 낯선 사람이 많은 것과 아는 사람이 있는 것은 아주 다릅니다. 그런데 그 이웃이 이런 말을 했습니다.`,
            `"그런데 그 사람 물건을 정리한 사람이 있소. 그리로 가 보시오."`,
            `마르코는 그 사람을 찾아갔습니다. 그리고 그 사람에게서 실마리를 하나 얻었습니다. 어머니가 일하던 집안의 성이 메키네스였고, 그 집이 코르도바로 옮겨 갔다는 것이었습니다.`,
            `코르도바까지는 기차로 갈 수 있었습니다. 그런데 삯이 마르코가 가진 것보다 많았습니다. 마르코는 그 도시에서 며칠 일을 했습니다.`,
            `항구에서 짐을 나르는 일이었습니다. 그리고 삯을 모아 기차를 탔습니다. 가는 데 하루가 걸렸습니다.`,
            `열세 살에게 시키는 일은 삯이 적었습니다. 그래도 마르코는 하루도 쉬지 않았습니다.`,
            `기차 창밖으로 팜파스라는 벌판이 지나갔습니다. 아무리 가도 끝이 없었습니다. 나무도 집도 없이 풀만 있었습니다.`,
            `해가 뜨고 지는 것을 창밖으로 다 볼 수 있었습니다. 가리는 것이 하나도 없었기 때문입니다.`,
            `마르코는 그 창밖을 보면서, 배에서 만난 그 사람이 한 말을 생각했습니다. 저기가 얼마나 넓은지 너는 모른다는 말이었습니다.`,
            `그때 마르코는 그 말이 무슨 뜻인지 조금 알게 되었습니다. 그런데 돌아갈 생각은 하지 않았습니다.`
        ]
    },
    {
        num: 5,
        title: "코르도바",
        emoji: "🏜️",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `코르도바에서 마르코는 메키네스 집안을 찾아냈습니다. 그런데 또 늦었습니다. 그 집안은 다시 옮겨 간 뒤였습니다.`,
            `그 도시는 부에노스아이레스보다 작았습니다. 오래된 성당이 여럿 있고 길이 좁았습니다. 마르코는 그 집을 사흘 만에 찾아냈습니다.`,
            `투쿠만이라는 도시였습니다. 코르도바에서 북쪽으로 아주 먼 곳이었습니다. 그리고 그 집 사람이 이렇게 말해 주었습니다.`,
            `"그 부인은 함께 안 갔소."<br>"그럼 어디 계십니까."<br>"몸이 나빠져서 이 도시 어느 집에 남았소. 그러다 어떻게 됐는지는 모르겠소."`,
            `마르코는 코르도바를 뒤졌습니다. 여러 날 걸었습니다. 이탈리아 사람이 모이는 데를 다 찾아다녔습니다. 그리고 마침내 어머니를 아는 사람을 하나 만났습니다.`,
            `이탈리아 사람이 하는 가게, 이탈리아 사람이 다니는 성당, 이탈리아 사람이 묵는 여관을 다 찾아갔습니다. 그리고 같은 말을 되풀이했습니다. 이런 부인을 보셨습니까.`,
            `그 사람이 이렇게 말했습니다.<br>"그 부인은 회복하고 나서 그 집안을 따라 투쿠만으로 갔소."<br>"언제요?"<br>"두 달쯤 됐소."`,
            `마르코는 그 자리에서 웃었습니다. 웃음이 나와서 웃은 것이 아니었습니다. 투쿠만까지는 또 아주 멀었습니다.`,
            `두 달 차이였습니다. 두 달만 빨랐으면 만났을 것이었습니다.`,
            `코르도바에서 투쿠만까지가 오백 킬로미터가 넘습니다. 그리고 그 길은 사막에 가까운 땅을 지나갑니다.`,
            `걸어서 가면 한 달이 넘게 걸립니다. 그리고 그 길에는 마을이 드물었습니다.`,
            `그 무렵에는 기차가 거기까지 다 닿지 않았습니다. 그래서 짐은 소달구지로 날랐습니다. 그리고 마르코에게는 돈이 없었습니다.`,
            `기차 삯이 없었습니다. 그때 마르코가 한 가지를 알아냈습니다. 그 방향으로 짐을 실어 나르는 소달구지 행렬이 있었습니다.`,
            `가진 돈은 부에노스아이레스에서 기차를 타면서 다 썼습니다.`,
            `여러 대가 줄지어 몇 주씩 걸려 가는 것이었습니다. 마르코는 그 행렬의 우두머리를 찾아갔습니다.`,
            `"저를 태워 주십시오. 삯 대신 일하겠습니다."`,
            `그 사람이 마르코를 위아래로 보았습니다.`,
            `마르코는 그때 몹시 말라 있었습니다. 신발은 다 해져 있었습니다.`,
            `"어디까지 가나."<br>"투쿠만까지요."<br>"몇 주가 걸리는지 아나."<br>"압니다."`,
            `그 사람은 결국 태워 주었습니다.`,
            `까닭은 말하지 않았습니다. 다만 이렇게 한마디 했습니다.<br>"먹는 건 네가 알아서 해라."`
        ]
    },
    {
        num: 6,
        title: "소달구지 길",
        emoji: "🐂",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `그 길이 이 이야기에서 제일 긴 대목입니다. 달구지 행렬은 하루에 아주 조금씩 갔습니다. 소가 끌기 때문에 사람 걸음보다 느렸습니다.`,
            `달구지는 바퀴가 사람 키만 했습니다. 길이 나쁜 데가 많아서 그렇게 만들었습니다. 소는 두 마리씩 또는 네 마리씩 맸습니다.`,
            `마르코는 그 옆에서 걸었습니다. 밤에는 달구지 아래에서 잤습니다. 낮에는 몹시 더웠습니다.`,
            `그 지방은 물이 귀했습니다. 우물이 있는 자리까지 하루씩 걸리기도 했습니다. 사람들이 물을 아껴 나눠 마셨습니다.`,
            `물통은 달구지마다 하나씩 실려 있었습니다. 그 물은 사람보다 소가 먼저 마셨습니다. 소가 서면 아무 데도 못 가기 때문입니다.`,
            `마르코는 그 행렬에서 여러 가지 일을 했습니다. 소에게 물을 먹이고, 짐을 묶고, 밥 짓는 것을 거들었습니다.`,
            `밤이면 사람들이 불가에 모여 이야기를 했습니다. 그 사람들도 대개 어디선가 온 사람들이었습니다. 이탈리아, 스페인, 그리고 그 땅에 원래 살던 사람들.`,
            `불은 마른 나무와 소똥으로 피웠습니다. 그 지방에는 땔나무가 귀했기 때문입니다.`,
            `그 가운데 늙은 사람이 하나 있었습니다.`,
            `그 사람이 마르코에게 이렇게 물었습니다.<br>"너는 어머니 얼굴을 아직 기억하나."`,
            `마르코가 대답하지 못했습니다. 두 해가 지났기 때문입니다. 얼굴이 흐려져 있었습니다.`,
            `그 사람이 말했습니다.<br>"괜찮다. 만나면 알게 된다."`,
            `그 사람들이 부르는 노래가 있었습니다. 마르코는 그 노래의 말을 알아듣지 못했습니다. 그런데 여러 밤을 듣다 보니 가락은 외웠습니다.`,
            `나중에 이탈리아로 돌아간 뒤에도 마르코는 그 가락을 기억했습니다. 그 길에서 마르코는 여러 번 앓았습니다. 발이 부었고, 열이 났습니다.`,
            `한번은 사흘 동안 달구지에 실려 갔습니다.`,
            `그때 그 늙은 사람이 마르코 옆에 앉아 있어 주었습니다. 물을 적셔 입에 대 주고, 해를 가려 주었습니다.`,
            `사람들이 마르코에게 이렇게 말했습니다.<br>"돌아가라."`,
            `그 말을 이 여행에서 마르코는 몇 번이나 들었습니다. 배에서도 들었고, 부에노스아이레스에서도 들었고, 코르도바에서도 들었습니다. 그리고 그때마다 마르코는 같은 대답을 했습니다.`,
            `"안 돌아갑니다."`,
            `그 길에서 마르코가 배운 것이 하나 있습니다. 하루에 얼마나 갔는지를 세지 않는 것이었습니다. 세면 견딜 수가 없었기 때문입니다.`,
            `그 대신 오늘 할 일만 생각했습니다. 소에게 물을 먹이고, 짐을 묶고, 밥 짓는 것을 거들고, 자는 것입니다.`,
            `그것을 여러 주 되풀이했습니다.`
        ]
    },
    {
        num: 7,
        title: "투쿠만",
        emoji: "🌵",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `여러 주 만에 투쿠만에 닿았습니다. 마르코는 그 도시에서 메키네스 집안을 찾아냈습니다.`,
            `투쿠만은 사탕수수를 심는 지방이었습니다. 코르도바 쪽의 마른 땅과 달리 푸르고 축축했습니다. 마르코는 몇 주 만에 처음으로 나무 그늘에 앉았습니다.`,
            `그리고 문 앞에서 물었습니다.<br>"이 댁에 이탈리아 부인이 계십니까."<br>"있었소."<br>"있었다니요."<br>"그 부인은 여기 없소. 살타로 갔소."`,
            `마르코는 그 말을 듣고 문설주를 붙잡았습니다. 다리에 힘이 빠졌기 때문입니다.`,
            `살타는 또 북쪽으로 먼 곳이었습니다. 그런데 이번에는 사정이 달랐습니다.`,
            `그 집 사람이 이런 이야기를 해 주었습니다. 어머니는 그 집안 주인 부부가 살타로 옮겨 갈 때 함께 갔습니다. 그런데 가서 크게 앓았다고 했습니다.`,
            `그 집 사람들은 어머니를 좋게 말했습니다. 일을 잘하고 말수가 적은 사람이었다고 했습니다.`,
            `배에 병이 생겨서 수술을 받아야 하는데, 어머니가 그것을 거부했다는 것입니다.`,
            `"왜 거부하십니까."<br>"모르겠소. 그 부인이 그냥 싫다고 했다더군."`,
            `마르코는 그 까닭을 알 것 같았습니다. 수술을 받으려면 돈이 들었습니다. 그리고 어머니는 그 돈을 집으로 부치고 있었습니다.`,
            `어머니는 제 몸에 쓸 돈을 아까워하는 사람이었습니다. 제노바에 있을 때도 그랬습니다.`,
            `그 집 사람이 이렇게 덧붙였습니다.<br>"주인 나리가 값을 대 주겠다고 하셨소. 그런데도 안 받겠다고 하셨소."<br>"왜요?"<br>"신세를 지기 싫다고 하셨소."`,
            `마르코는 그 말을 듣고 어머니가 어떤 사람인지 다시 생각났습니다. 마르코는 그날 밤 잠들지 못했습니다. 그리고 새벽에 다시 길을 나섰습니다.`,
            `이번에는 삯을 낼 것이 아무것도 없었습니다. 그래서 걸었습니다. 가는 길에 마르코는 어느 농가에서 며칠 일을 하고 밥을 얻어먹었습니다. 그리고 또 걸었습니다.`,
            `길에서 자고, 얻어먹고, 또 걸었습니다. 마르코는 그때 이미 열 달째 길 위에 있었습니다.`,
            `그러다 어느 마을에서 이탈리아 사람을 만났습니다. 그 사람이 사정을 듣고 말을 한 마리 빌려주었습니다.`,
            `"살타까지 타고 가라. 그리고 그쪽 여관에 맡겨 두면 내가 찾아온다."`,
            `마르코가 물었습니다.<br>"왜 저를 도와주십니까."<br>그 사람이 말했습니다.<br>"나도 어머니를 두고 왔다."`,
            `그 사람은 그 말만 하고 더 묻지 않았습니다. 마르코도 더 묻지 않았습니다.`
        ]
    },
    {
        num: 8,
        title: "살타",
        emoji: "🐎",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `살타에 닿는 데 또 여러 날이 걸렸습니다. 길이 산으로 올라갔습니다. 공기가 얇아져서 숨이 찼습니다.`,
            `말을 타고 갔는데도 그랬습니다. 산길은 좁았고 밤에는 아주 추웠습니다. 낮에는 볕이 따가웠습니다.`,
            `살타는 안데스 산맥 자락에 있는 도시입니다. 제노바에서 여기까지, 마르코가 온 거리를 이어 보면 지구를 사분의 일쯤 돈 것입니다. 그리고 그 대부분을 배와 소달구지와 두 발로 왔습니다.`,
            `그 도시에서 서쪽을 보면 눈 덮인 산이 보입니다. 마르코가 태어난 제노바에서도 산이 보였습니다. 그런데 이 산은 훨씬 높았습니다.`,
            `열세 살이 그렇게 왔습니다. 살타에 닿아서 마르코는 그 집을 찾아냈습니다. 그리고 문을 두드렸습니다.`,
            `주인이 나왔습니다.<br>"저희 어머니를 찾으러 왔습니다."`,
            `주인은 마르코를 한참 보았습니다. 문 앞에 선 아이는 신발이 다 해져 있었고 얼굴이 새까맣게 타 있었습니다. 그런데 눈만은 또렷했습니다.`,
            `주인은 마르코를 안으로 들여보냈습니다. 그 집 사람들이 이런 이야기를 했습니다.`,
            `어머니는 그 집에서 여러 달 앓았습니다. 의사가 여러 번 왔고, 수술을 해야 한다고 했습니다. 그런데 어머니가 계속 거절했습니다.`,
            `그 집 사람들이 여러 번 권했습니다. 그런데 그때마다 어머니가 고개를 저었습니다.`,
            `"그럼 지금은요?"<br>"이 집에 계시오."`,
            `마르코는 그 말을 듣고 아무 말도 하지 못했습니다.`,
            `여기 계신다는 말이었습니다. 열 달 동안 마르코가 듣고 싶어 하던 말이었습니다.`,
            `주인이 말했습니다.<br>"그런데 알아 두어야 할 것이 있소."<br>"뭡니까."<br>"그 부인은 이제 아무것도 하려고 하지 않으시오."<br>"무슨 말씀입니까."<br>"밥도 잘 안 드시고, 약도 안 드시고, 수술도 안 받겠다고 하시오."<br>"저희 어머니가 왜 그러십니까."<br>주인이 말했습니다.<br>"고향 소식이 끊긴 지 오래되어서 그럴 거요. 그 부인은 자기 식구들이 자기를 잊었다고 여기고 있소."`,
            `마르코는 그 말을 듣고 얼굴을 감쌌습니다. 편지는 끊긴 것이 아니었습니다. 양쪽에서 다 보냈는데, 그 사이에 어머니가 세 번 옮겨 다녔던 것입니다. 그래서 어느 편지도 닿지 않았습니다.`,
            `어머니는 자기가 잊혔다고 여기고 있었습니다. 그런데 그 사이에 아들이 바다를 건너와 있었습니다.`,
            `마르코는 이층으로 올라갔습니다.`,
            `계단이 열두 칸이었습니다. 마르코는 그 열두 칸을 오르는 데 아주 오래 걸렸습니다.`
        ]
    },
    {
        num: 9,
        title: "그 방",
        emoji: "🚪",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `방문 앞에서 마르코가 걸음을 멈췄습니다. 그리고 한참 서 있었습니다. 무서웠기 때문입니다.`,
            `그 문 하나를 열면 되는 것이었습니다. 배를 스물일곱 날 타고, 소달구지 옆에서 몇 주를 걷고, 산을 넘어온 끝이 그 문 하나였습니다.`,
            `문을 열고 들어갔는데 어머니가 자기를 못 알아보면 어떻게 하나. 그리고 열 달 동안 걸어온 것이 다 무엇이 되나. 마르코는 문을 열었습니다.`,
            `문이 소리를 냈습니다. 마르코는 그 소리에 놀라서 잠깐 멈췄습니다.`,
            `방 안이 어두웠습니다. 덧문이 닫혀 있었습니다. 창틈으로 들어온 빛이 바닥에 줄 하나를 그어 놓고 있었습니다. 방 안에서는 약 냄새가 났습니다.`,
            `침대에 사람이 하나 누워 있었습니다. 마르코는 그 사람이 자기 어머니인지 알아보지 못했습니다. 너무 여위어 있었기 때문입니다.`,
            `그 침대에 누운 사람은 마르코가 기억하는 어머니보다 작았습니다. 머리가 하얗게 세어 있었습니다.`,
            `마르코가 아주 작은 소리로 불렀습니다.<br>"어머니."`,
            `그 사람이 눈을 떴습니다. 그리고 아무 반응이 없었습니다. 마르코가 한 발 다가갔습니다.`,
            `천장을 보고 있었습니다. 소리가 난 쪽을 돌아보지도 않았습니다.`,
            `"어머니, 저예요." 그 사람이 몸을 일으키려다가 다시 누웠습니다.`,
            `그리고 이렇게 말했습니다.<br>"······누구세요."`,
            `그 목소리는 마르코가 아는 목소리였습니다. 마르코는 그것으로 알아보았습니다.`,
            `마르코는 그 자리에 무릎을 꿇었습니다.`,
            `그 방에서 마르코가 한 말은 그것뿐이었습니다. 다른 말은 생각나지 않았습니다.`,
            `"저 마르코예요. 제노바에서 왔어요."`,
            `그 순간이었습니다. 어머니가 두 손으로 마르코의 얼굴을 잡았습니다. 그리고 소리를 냈습니다.`,
            `어머니가 몸을 일으켰습니다. 그때까지 여러 주 동안 혼자 일어나 앉지 못하던 사람이었습니다.`,
            `말이 아니었습니다. 사람이 아주 오래 참았던 것을 한꺼번에 놓을 때 내는 소리였습니다.`,
            `그 방 밖에 있던 사람들이 그 소리를 듣고 뛰어 올라왔습니다. 어머니가 마르코를 안고 놓지 않았습니다.`,
            `그리고 이렇게 말했습니다.<br>"네가 어떻게······ 네가 어떻게 여기를······."`,
            `마르코는 대답하지 못했습니다. 열 달 동안 걸어온 이야기를 어디서부터 해야 할지 몰랐기 때문입니다.`,
            `그래서 그냥 어머니의 손을 잡고 있었습니다. 그 손이 아주 가벼웠습니다.`
        ]
    },
    {
        num: 10,
        title: "수술",
        emoji: "🩺",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `그날 저녁 의사가 왔습니다.`,
            `그 도시에서 제일 나은 의사였습니다. 그 집 주인이 불러온 것이었습니다.`,
            `의사는 어머니를 살펴보고 나서 이렇게 말했습니다.<br>"수술을 받으셔야 합니다. 지금도 늦었습니다."`,
            `어머니는 또 고개를 저었습니다. 그때 마르코가 어머니의 손을 잡았습니다.`,
            `여러 달 동안 되풀이한 몸짓이었습니다.`,
            `"어머니, 받으세요."<br>"······."<br>"제가 여기까지 온 게 무엇 때문이겠어요."`,
            `어머니가 마르코를 보았습니다.`,
            `그 얼굴에 흙과 볕에 탄 자국이 있었습니다. 열한 살에 두고 온 아이의 얼굴이 아니었습니다.`,
            `마르코가 말했습니다.<br>"저는 배를 스물일곱 날 탔어요. 그리고 소달구지 옆에서 몇 주를 걸었어요. 발이 다 부었어요."<br>"어머니가 안 받으시면 그게 다 무엇이 됩니까."`,
            `어머니는 한참 아무 말도 하지 않았습니다.`,
            `그러고는 의사에게 이렇게 말했습니다.<br>"받겠습니다."`,
            `그 뒤에 있었던 일을 이 책은 이렇게 적었습니다.`,
            `그 시절 수술은 지금과 아주 달랐습니다. 살아날 확률이 반이 안 되는 일도 있었습니다. 그런데 어머니는 살았습니다.`,
            `마취도 지금 같지 않았고 상처가 곪는 일이 많았습니다. 수술을 받겠다고 하는 것 자체가 큰 결심이었습니다.`,
            `수술을 마치고 나서 의사가 이렇게 말했다고 합니다.`,
            `"이분은 살고 싶어 하셨습니다. 그것이 절반입니다."`,
            `어머니가 회복하는 데 여러 달이 걸렸습니다. 처음 몇 주는 일어나 앉지도 못했습니다. 그러다 앉게 되었고, 창가까지 걷게 되었고, 마당에 나가게 되었습니다.`,
            `마르코는 그것을 하나씩 다 보았습니다.`,
            `그리고 나중에 이렇게 말했습니다.<br>"저는 어머니가 다시 걷는 걸 봤어요. 그게 제일 좋았어요."`,
            `그동안 마르코는 살타에서 일을 했습니다. 돌아갈 뱃삯을 벌어야 했기 때문입니다. 그리고 저녁이면 어머니 곁에 앉아 그동안 있었던 일을 하나씩 이야기했습니다.`,
            `가게에서 짐을 나르고, 마구간을 치우고, 심부름을 했습니다. 그러면서 돈을 모았습니다.`,
            `배 밑바닥 이야기, 팜파스 이야기, 소달구지 이야기, 말을 빌려준 사람 이야기. 어머니는 그 이야기를 들으면서 여러 번 울었습니다.`,
            `그리고 한번은 이렇게 말했습니다.<br>"내가 그 이 년 동안 무엇을 하고 있었는지 모르겠구나."<br>마르코가 말했습니다.<br>"어머니가 보내 주신 돈으로 저희가 살았어요."`,
            `어머니는 그 말을 듣고 아무 대꾸도 하지 않았습니다. 그런데 그날부터 밥을 다 먹었습니다.`
        ]
    },
    {
        num: 11,
        title: "돌아가는 길",
        emoji: "🏡",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `이듬해 봄, 두 사람은 부에노스아이레스로 내려갔습니다. 그리고 제노바로 가는 배를 탔습니다. 이번에도 삼등실이었습니다. 그런데 마르코는 이번에는 무섭지 않았습니다.`,
            `내려가는 길은 올라온 길과 같았습니다. 그런데 이번에는 기차를 탈 수 있었습니다. 그리고 옆자리에 어머니가 있었습니다.`,
            `가는 길이 어떤지 이미 알고 있었기 때문입니다.`,
            `배 위에서 어머니가 물었습니다.<br>"마르코야, 그때 문 앞에서 왜 그렇게 오래 서 있었니?"<br>"알고 계셨어요?"<br>"발소리가 났는데 문이 안 열렸잖니."<br>마르코가 말했습니다.<br>"어머니가 저를 못 알아보실까 봐 무서웠어요."`,
            `어머니는 그 말을 듣고 한참 아무 말도 하지 않았습니다.`,
            `그리고 이렇게 말했습니다.<br>"나는 네가 문 앞에 서 있는 동안 이런 생각을 했다."<br>"밖에 누가 왔구나. 그런데 나는 이제 아무도 안 기다린다."<br>"그런데 네가 어머니라고 부르더구나."`,
            `배가 제노바에 닿은 것은 그해 여름이었습니다. 부두에 아버지와 형이 나와 있었습니다. 아버지는 마르코가 떠난 뒤로 그 부두에 자주 나왔다고 합니다.`,
            `마르코가 떠난 지 열여섯 달 만이었습니다.`,
            `배가 들어올 때마다 나가 보았다고 합니다. 형도 함께 나왔습니다. 가게가 쉬는 날이면 둘이 부두에 앉아 있었습니다. 그리고 아무 말도 하지 않았습니다.`,
            `배가 들어와도 아는 얼굴이 없으면 그냥 일어나 돌아갔습니다. 그것을 열 달 동안 했습니다.`,
            `이 이야기는 사실 더 큰 책의 한 부분입니다.`,
            `에드몬도 데 아미치스라는 이탈리아 사람이 쓴 『쿠오레』라는 책입니다. 초등학교 삼학년 아이의 한 해 일기 형식으로 된 책인데, 그 안에 선생님이 달마다 읽어 주는 짧은 이야기가 아홉 편 들어 있습니다.`,
            `이 이야기는 그 가운데 오월 이야기입니다.`,
            `선생님이 교실에서 소리 내어 읽어 주는 이야기라는 뜻입니다. 그래서 문장이 짧고 장면이 또렷합니다.`,
            `원래 제목은 「아펜니노에서 안데스까지」입니다. 이탈리아의 산에서 남아메리카의 산까지라는 뜻입니다.`,
            `그 시절 이탈리아 사람들이 실제로 그렇게 갔습니다. 천팔백팔십 년부터 오십 년 동안 이탈리아를 떠난 사람이 천삼백만 명이 넘습니다.`,
            `그러니까 이 이야기는 지어낸 이야기이면서, 그 시절 아주 많은 집에서 실제로 있었던 이야기입니다. 배를 타고 떠난 어머니와 아버지가 그만큼 많았다는 뜻입니다.`,
            `그 사람들이 무엇을 겪었는지를 이 이야기가 대신 적어 두었습니다.`
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
                ${artFrame('cover.png', '🚢')}
            </div>
            <div class="story-page-right">
                <h1>엄마 찾아 삼만리</h1>
                <p class="cover-tag">에드몬도 데 아미치스 원작</p>
                <p>일자리를 찾아 아르헨티나로 떠난 어머니의 소식이 끊깁니다. 열세 살 마르코가 혼자 배를 타고 어머니를 찾으러 갑니다.</p>
                <p>『쿠오레』에 실린 오월 이야기입니다. 그 시절 이탈리아를 떠난 사람이 오십 년 동안 천삼백만 명이 넘었습니다.</p>
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
    { q: "마르코의 어머니가 아르헨티나로 간 까닭은 무엇입니까?", choices: ["여행", "집안 빚을 갚으려고 삯이 몇 배인 일자리를 얻어서", "친척을 만나러"], answer: 1 },
    { q: "어머니의 편지가 끊긴 진짜 까닭은 무엇입니까?", choices: ["잊어서", "어머니가 세 번 옮겨 다녀 양쪽 편지가 다 닿지 않아서", "돈이 없어서"], answer: 1 },
    { q: "마르코가 탄 배의 삼등실은 어떤 곳입니까?", choices: ["창이 없는 배 밑바닥", "갑판", "선실"], answer: 0 },
    { q: "배를 타고 가는 데 걸린 날은 며칠입니까?", choices: ["이레", "스물일곱 날", "석 달"], answer: 1 },
    { q: "그 시절 부에노스아이레스의 특징은 무엇입니까?", choices: ["사람이 적었다", "인구의 상당수가 이탈리아에서 온 사람들이었다", "이탈리아 사람이 없었다"], answer: 1 },
    { q: "코르도바까지 기차 삯을 마련한 방법은 무엇입니까?", choices: ["빌렸다", "항구에서 짐 나르는 일을 했다", "얻었다"], answer: 1 },
    { q: "투쿠만까지 마르코가 탄 것은 무엇입니까?", choices: ["기차", "소달구지 행렬", "배"], answer: 1 },
    { q: "여행 내내 마르코가 되풀이해서 들은 말은 무엇입니까?", choices: ["돌아가라", "힘내라", "같이 가자"], answer: 0 },
    { q: "어머니가 수술을 거부한 까닭으로 마르코가 짐작한 것은 무엇입니까?", choices: ["무서워서", "그 돈을 집으로 부치고 있어서", "의사를 못 믿어서"], answer: 1 },
    { q: "집 주인이 말한 어머니의 상태는 무엇입니까?", choices: ["곧 나을 것이다", "식구들이 자기를 잊었다고 여겨 아무것도 하려 하지 않는다", "이미 떠났다"], answer: 1 },
    { q: "마르코가 방문 앞에서 오래 서 있었던 까닭은 무엇입니까?", choices: ["숨이 차서", "어머니가 못 알아보실까 봐 무서워서", "잠겨 있어서"], answer: 1 },
    { q: "어머니가 수술을 받겠다고 한 계기는 무엇입니까?", choices: ["의사가 설득해서", "마르코가 여기까지 온 것이 다 무엇이 되느냐고 물어서", "돈이 생겨서"], answer: 1 },
    { q: "수술 뒤 의사가 한 말은 무엇입니까?", choices: ["운이 좋았다", "이분은 살고 싶어 하셨고 그것이 절반이다", "늦었다"], answer: 1 },
    { q: "이 이야기가 실린 책의 제목은 무엇입니까?", choices: ["쿠오레", "피노키오", "삼총사"], answer: 0 },
    { q: "원래 제목은 무엇입니까?", choices: ["엄마 찾아 삼만리", "아펜니노에서 안데스까지", "오월 이야기"], answer: 1 },
    { q: "천팔백팔십 년부터 오십 년 동안 이탈리아를 떠난 사람은 몇 명입니까?", choices: ["백만 명", "천삼백만 명이 넘는다", "십만 명"], answer: 1 }
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
            ${artFrame('end.png', '🏡')}
            <h2>엄마 찾아 삼만리를 다 읽었습니다</h2>
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
