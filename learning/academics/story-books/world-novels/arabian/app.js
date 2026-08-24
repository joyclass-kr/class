const BOOK_TITLE = "아라비안나이트";

const CHAPTER_LABEL = () => '';

const CHAPTERS = [
    {
        num: 1,
        title: "천 하룻밤을 벌다",
        emoji: "🌙",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `아주 오랜 옛날, 페르시아에 샤리아르라는 왕이 있었습니다. 젊고, 힘이 세고, 나라를 잘 다스리던 왕이었습니다. 그런데 어느 해에 왕은 크게 배신을 당했습니다.`,
            `가장 가까운 사람에게 속은 것입니다. 그 뒤로 왕이 달라졌습니다. 왕은 이렇게 생각했습니다.`,
            `'사람은 아무도 믿을 수 없다. 그러니 정을 붙이기 전에 끝내면 된다.' 그때부터 왕은 무서운 일을 시작했습니다. 날마다 새로 혼인을 하고, 이튿날 아침이면 그 사람의 목숨을 빼앗았습니다. 삼 년이 지났습니다.`,
            `나라 안에 딸을 가진 집이 남지 않았습니다. 다들 딸을 데리고 다른 나라로 달아났기 때문입니다. 그 일을 맡아 하던 것은 재상이었습니다.`,
            `재상은 날마다 왕에게 사람을 데려가야 했습니다. 그 재상에게 딸이 둘 있었습니다. 큰딸은 셰에라자드, 작은딸은 두냐자드였습니다.`,
            `셰에라자드는 책을 아주 많이 읽은 사람이었습니다. 역사와 시와 옛이야기를 천 가지도 넘게 알고 있었습니다.`,
            `어느 날 셰에라자드가 아버지에게 말했습니다.<br>"아버지, 저를 왕께 보내 주십시오."`,
            `재상은 그 말을 듣고 자리에서 일어섰습니다.`,
            `"무슨 소리를 하는 거냐."<br>"이 일을 끝내야 합니다."<br>"너까지 잃으라는 말이냐."<br>"아버지, 지금까지 몇 사람이 갔습니까."`,
            `재상은 대답하지 못했습니다.`,
            `셰에라자드가 말했습니다.<br>"저는 방법이 있습니다."`,
            `재상은 여러 날 말렸습니다. 그런데 딸은 뜻을 굽히지 않았습니다. 결국 셰에라자드가 궁으로 갔습니다.`,
            `가기 전에 동생에게 이렇게 일러 두었습니다.<br>"밤이 깊거든 나에게 이야기를 하나 해 달라고 해라." 그날 밤, 동생 두냐자드가 그렇게 했습니다.`,
            `"언니, 이야기를 하나 해 주세요."<br>셰에라자드가 왕에게 물었습니다.<br>"허락해 주시겠습니까."`,
            `왕은 그러라고 했습니다. 어차피 아침이면 끝날 일이라고 생각했습니다. 셰에라자드는 이야기를 시작했습니다. 그리고 이야기가 가장 재미있어지는 대목에서 멈췄습니다.`,
            `"날이 밝았습니다. 나머지는 다음에 하겠습니다."`,
            `왕은 그 뒷이야기가 궁금했습니다. 그래서 하루를 미루었습니다.`,
            `이튿날 밤 셰에라자드는 그 이야기를 마쳤습니다. 그리고 곧바로 다음 이야기를 시작했습니다. 그리고 또 재미있어지는 데서 멈췄습니다.`,
            `그렇게 하루가 이틀이 되고, 이틀이 열흘이 되고, 열흘이 한 해가 되었습니다. 아래에 그 이야기 가운데 몇 편을 옮겨 적습니다.`
        ]
    },
    {
        num: 2,
        title: "항아리 속의 마신",
        emoji: "🏺",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `가난한 어부가 하나 있었습니다. 그 어부에게는 규칙이 하나 있었습니다. 하루에 그물을 네 번만 던지는 것이었습니다.`,
            `어느 날 첫 번째 그물에 죽은 나귀가 걸려 올라왔습니다. 두 번째에는 모래가 가득 든 항아리가 올라왔습니다. 세 번째에는 깨진 그릇과 유리 조각이 올라왔습니다.`,
            `어부는 하늘을 보고 한숨을 쉬었습니다. 그리고 네 번째 그물을 던졌습니다.`,
            `이번에는 놋쇠 항아리가 올라왔습니다. 입구가 납으로 봉해져 있었고, 그 위에 도장이 찍혀 있었습니다. 어부는 '이 안에 무언가 값나가는 것이 들었겠지' 하고 그 봉을 뜯었습니다. 그러자 안에서 연기가 쏟아져 나왔습니다.`,
            `연기가 하늘로 올라가 뭉치더니, 어마어마하게 큰 마신이 되었습니다. 머리가 구름에 닿고 발이 땅에 닿았습니다. 어부는 다리에 힘이 빠졌습니다.`,
            `마신이 소리쳤습니다.<br>"준비해라. 나는 너를 죽이겠다."<br>"제가 당신을 꺼내 드렸는데요."<br>"그러니까 죽이겠다는 것이다."`,
            `그리고 마신이 이런 이야기를 했습니다. 그는 옛날에 어느 왕의 명을 어겨 그 항아리에 갇혔습니다. 첫 백 년 동안 그는 이렇게 생각했습니다.`,
            `'나를 꺼내 주는 자에게 세상의 모든 재물을 주겠다.' 아무도 오지 않았습니다. 두 번째 백 년 동안은 이렇게 생각했습니다. '나를 꺼내 주는 자에게 땅속의 보물을 다 알려 주겠다.' 아무도 오지 않았습니다. 세 번째 백 년 동안은 이렇게 생각했습니다.`,
            `'나를 꺼내 주는 자에게 소원을 세 가지 들어주겠다.' 아무도 오지 않았습니다. 그러다 사백 년이 지나자 그는 이렇게 생각했습니다. '이제 누가 나를 꺼내 주든, 나는 그자를 죽이겠다.' 어부는 그 이야기를 다 들었습니다.`,
            `그리고 벌벌 떨면서 이렇게 말했습니다.<br>"한 가지만 여쭙겠습니다. 정말 그렇게 큰 분이 이 작은 항아리에 들어가 계셨습니까?"<br>"그렇다."<br>"저는 못 믿겠습니다. 발 하나도 안 들어갈 것 같은데요."`,
            `마신이 화를 냈습니다.<br>"내가 보여 주지."`,
            `그리고 다시 연기가 되어 항아리 속으로 들어갔습니다. 어부는 그 순간 뚜껑을 눌러 닫았습니다.`,
            `"이제 도로 바다에 던지겠습니다." 안에서 마신이 사정했습니다.`,
            `"내가 잘못했다. 꺼내 주면 너를 부자로 만들어 주겠다."<br>"사백 년 동안 마음이 세 번 바뀌신 분을 제가 어떻게 믿습니까."`,
            `그런데 어부는 결국 그를 꺼내 주었습니다. 마신이 그 은혜를 갚겠다고 맹세했기 때문입니다. 그리고 그 마신은 정말로 약속을 지켰습니다.`,
            `어부는 그 뒤로 잘살았습니다. 셰에라자드는 이 이야기를 마치고 왕을 보았습니다. 왕은 아무 말도 하지 않았습니다. 그런데 이 이야기가 무슨 이야기인지는 알아들었습니다.`,
            `오래 미움에 잠겨 있으면 마음이 그렇게 바뀐다는 이야기였습니다.`
        ]
    },
    {
        num: 3,
        title: "알라딘과 요술 램프",
        emoji: "🪔",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `어느 도시에 알라딘이라는 아이가 살았습니다. 아버지는 재봉사였는데 일찍 세상을 떠났습니다. 알라딘은 일을 배우지 않고 골목에서 놀기만 했습니다.`,
            `어머니가 실을 자아 팔아 겨우 먹고살았습니다. 어느 날 낯선 사람이 알라딘을 찾아왔습니다.`,
            `"내가 네 아버지의 동생이다."`,
            `알라딘도 어머니도 그런 사람이 있다는 말을 들어 본 적이 없었습니다. 그런데 그 사람은 돈을 잘 썼습니다. 그리고 알라딘에게 좋은 옷을 사 주고, 가게를 차려 주겠다고 했습니다.`,
            `며칠 뒤 그 사람이 알라딘을 데리고 도시 밖으로 나갔습니다. 한참을 걸어 산 밑에 이르렀습니다. 그 사람이 땅에 무언가를 뿌리고 주문을 외웠습니다. 그러자 땅이 갈라지고 돌문이 나왔습니다.`,
            `그 사람은 마법을 쓰는 사람이었습니다. 아주 멀리서 이 램프를 찾아 여기까지 온 것이었습니다. 그 문은 정해진 아이만 열 수 있었습니다. 그래서 알라딘이 필요했던 것입니다.`,
            `"들어가라. 안에 뜰이 있고 나무가 있다. 아무것도 만지지 말고, 벽에 걸린 낡은 램프만 가지고 나와라."`,
            `그리고 반지를 하나 끼워 주었습니다.<br>"이건 지키는 반지다."`,
            `알라딘은 계단을 내려갔습니다. 안에는 정말로 뜰이 있었습니다. 나무에 열매가 달려 있었는데, 그 열매가 다 보석이었습니다.`,
            `알라딘은 그것을 주머니에 잔뜩 넣었습니다. 그리고 램프를 들고 계단으로 올라왔습니다. 그런데 짐이 무거워 마지막 계단을 오르지 못했습니다.`,
            `"손 좀 잡아 주십시오."<br>"램프를 먼저 던져라."<br>"손부터 잡아 주십시오. 저 혼자 못 올라갑니다."<br>"램프를 먼저 던지라니까!"`,
            `두 사람은 그렇게 실랑이를 했습니다. 그러다 그 사람이 화가 나서 주문을 외웠습니다. 그리고 문을 닫아 버렸습니다.`,
            `알라딘은 어둠 속에 갇혔습니다. 이틀 동안 알라딘은 그 안에서 울었습니다. 그러다 손을 비비다가 반지를 문질렀습니다. 그러자 반지에서 무언가가 나왔습니다.`,
            `"주인님, 무엇을 원하십니까."`,
            `그렇게 알라딘은 밖으로 나왔습니다. 집에 돌아와 그 낡은 램프를 어머니에게 보여 주었습니다. 어머니가 그것을 팔려고 닦았습니다. 그리고 그때 램프의 마신이 나왔습니다.`,
            `그 뒤 일은 잘 알려진 대로입니다. 알라딘은 부자가 되었고, 그 나라 공주와 혼인했습니다. 그런데 이 이야기의 뒷부분을 아는 사람은 많지 않습니다. 여러 해 뒤에 그 마법사가 알라딘이 잘사는 것을 알고 다시 왔습니다.`,
            `그리고 거리에서 이렇게 외쳤습니다.<br>"헌 램프를 새 램프로 바꿔 드립니다!"`,
            `그때 알라딘은 사냥을 나가 있었습니다. 공주가 그 소리를 듣고, 창고에 굴러다니는 낡은 램프를 내주었습니다. 그 램프가 무엇인지 몰랐기 때문입니다.`,
            `알라딘은 그것을 아내에게도 말하지 않았던 것입니다. 그날 궁전이 통째로 사라졌습니다. 알라딘은 그것을 되찾는 데 아주 오래 걸렸습니다. 그리고 되찾은 뒤에 이렇게 말했다고 합니다.`,
            `"내가 이 램프 이야기를 진작 했더라면 이런 일은 없었을 것이오."`
        ]
    },
    {
        num: 4,
        title: "알리바바와 사십 인의 도적",
        emoji: "🗝️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `페르시아의 어느 마을에 형제가 살았습니다. 형 카심은 부자와 혼인해서 잘살았습니다. 동생 알리바바는 나귀 세 마리로 나무를 해다 팔았습니다.`,
            `어느 날 알리바바가 숲에서 나무를 하고 있는데 말발굽 소리가 났습니다. 알리바바는 나무 위로 올라가 숨었습니다. 말 탄 사람이 마흔 명이었습니다. 다들 짐을 잔뜩 싣고 있었습니다.`,
            `그 무리의 우두머리가 바위 앞에 서서 말했습니다.<br>"열려라, 참깨."`,
            `그러자 바위가 갈라졌습니다. 사람들이 짐을 지고 안으로 들어갔습니다. 그리고 한참 뒤에 빈손으로 나왔습니다.`,
            `우두머리가 말했습니다.<br>"닫혀라, 참깨."`,
            `바위가 닫혔고, 무리가 떠났습니다. 알리바바는 나무에서 내려왔습니다. 그리고 그 바위 앞에 서서 말해 보았습니다.`,
            `"열려라, 참깨."`,
            `바위가 갈라졌습니다. 안에는 굴이 있었습니다. 그 굴에 금과 은과 비단이 산더미처럼 쌓여 있었습니다.`,
            `수십 년 동안 모아 놓은 것이었습니다. 알리바바는 금화를 자루에 담아 나귀에 실었습니다. 그런데 다 가져가지 않았습니다.`,
            `나귀 세 마리에 실을 만큼만 가져갔습니다. 집에 와서 아내가 그 금을 되로 재려고 했습니다. 그런데 되가 없어서 형수네 집에서 빌려 왔습니다.`,
            `형수는 그 되에 몰래 밀랍을 발라 두었습니다. 동생네가 무엇을 재는지 궁금했기 때문입니다. 되를 돌려받아 보니 밀랍에 금화가 하나 붙어 있었습니다.`,
            `형 카심이 동생을 불렀습니다.<br>"그 금이 어디서 났느냐."`,
            `알리바바는 사실대로 다 말했습니다. 그리고 그 굴을 함께 쓰자고 했습니다. 그런데 카심은 이튿날 새벽에 혼자 나귀 열 마리를 끌고 그리로 갔습니다.`,
            `"열려라, 참깨."`,
            `바위가 열렸습니다. 카심은 안에 들어가 자루에 금을 채웠습니다. 그리고 나오려는데 주문이 생각나지 않았습니다.`,
            `"열려라, 보리."<br>"열려라, 콩."`,
            `금을 눈앞에 두고 있는 동안 참깨라는 말이 머리에서 지워진 것입니다. 그날 도적들이 돌아왔습니다. 카심은 그 굴에서 나오지 못했습니다.`,
            `그 뒤 도적들은 그 마을을 뒤져 알리바바를 찾아냈습니다. 그리고 여러 번 그를 없애려고 했습니다. 그때마다 그것을 알아채고 막아 낸 사람이 있었습니다. 알리바바의 집에서 일하는 모르지아나라는 여자였습니다.`,
            `도적들이 기름 항아리 서른일곱 개를 실은 장사꾼 행세를 하고 그 집에 들었을 때, 모르지아나는 기름을 뜨러 갔다가 항아리 안에서 사람 숨소리를 들었습니다. 모르지아나는 소리를 지르지 않았습니다. 그 대신 조용히 방법을 썼습니다. 그리고 그날 밤 그 집에서는 아무 일도 일어나지 않았습니다.`,
            `이 이야기에서 사람을 살린 것은 알리바바가 아니라 모르지아나였습니다. 알리바바는 나중에 그 사실을 알고, 모르지아나를 자기 아들과 혼인시키고 집안의 가족으로 삼았습니다.`
        ]
    },
    {
        num: 5,
        title: "신드바드와 로크 새",
        emoji: "🥚",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `바그다드에 신드바드라는 짐꾼이 살았습니다. 무거운 짐을 지고 다니며 먹고살았습니다. 어느 더운 날, 그는 어느 큰 집 대문 앞에서 짐을 내려놓고 쉬었습니다. 안에서 음악 소리와 웃음소리가 났습니다.`,
            `짐꾼은 이렇게 중얼거렸습니다.<br>"어떤 이는 저 안에 있고 어떤 이는 이 밖에 있구나."`,
            `그 소리를 그 집 사람이 들었습니다. 그리고 주인이 그를 안으로 불렀습니다. 그 집 주인의 이름도 신드바드였습니다. 일곱 번 바다에 나갔다가 돌아온 뱃사람 신드바드였습니다.`,
            `"자네 이름이 나와 같군. 그럼 내 이야기를 들어 보게."`,
            `그리고 그는 이런 이야기를 했습니다. 두 번째 항해 때의 일일세. 배가 어느 섬에 들렀네.`,
            `나는 뭍에 내려 나무 그늘에서 쉬다가 잠이 들었네. 깨어 보니 배가 없었네. 사람들이 나를 두고 떠난 것이네.`,
            `나는 섬을 돌아다녔네. 그러다 흰 둥근 것을 하나 보았네. 지붕만큼 컸네.`,
            `나는 그것이 무엇인지 한참 몰랐네. 그런데 해가 갑자기 어두워졌네. 하늘을 보니 새가 한 마리 내려오고 있었네.`,
            `구름을 가릴 만큼 큰 새였네. 로크라는 새라고 하네. 그 흰 것은 그 새의 알이었네.`,
            `새가 알 위에 내려앉아 날개를 접었네. 나는 그때 이렇게 생각했네. 이 섬에 있으면 나는 굶어 죽네. 그래서 나는 터번을 풀어 그 새의 다리에 내 몸을 묶었네.`,
            `아침이 되자 새가 날아올랐네. 나는 구름 위로 올라갔네. 한참 뒤에 새가 어느 골짜기에 내려앉았네.`,
            `나는 줄을 풀고 뛰어내렸네. 그 골짜기 바닥에 무엇이 깔려 있었는지 아나. 다이아몬드였네. 그런데 그 골짜기에는 큰 뱀들이 살고 있었네.`,
            `그리고 절벽이 너무 높아 올라갈 수도 없었네. 나는 그 다이아몬드 위에 앉아 이렇게 생각했네. 세상에서 가장 값진 것 위에 앉아서 굶어 죽는구나.`,
            `그때 위에서 무언가가 떨어졌네. 커다란 고깃덩이였네. 그리고 또 하나 떨어졌네.`,
            `나는 그것을 보고 알아챘네. 절벽 위의 사람들이 고기를 던져 넣고 있었네. 고기에 다이아몬드가 박히면, 독수리가 그것을 물고 올라가네.`,
            `그러면 위에서 그 고기를 빼앗는 것이네. 그래서 나는 자루에 다이아몬드를 담고, 그 고깃덩이에 내 몸을 묶었네. 그리고 독수리가 나를 물고 올라갔네. 절벽 위에서 사람들이 소리를 지르며 달려왔다가, 고기에 사람이 매달려 있는 것을 보고 얼어붙었네.`,
            `이야기가 끝나자 짐꾼 신드바드가 물었습니다.<br>"그렇게 무서운 일을 겪고 왜 또 나가셨습니까?"`,
            `뱃사람 신드바드가 웃었습니다.`,
            `"자네 말이 맞네. 그런데 뭍에 있으면 또 바다가 생각나네."`
        ]
    },
    {
        num: 6,
        title: "바다의 노인",
        emoji: "🌊",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `다섯 번째 항해 때의 일일세. 배가 부서져서 나 혼자 어느 섬에 닿았네. 그 섬에는 물이 있고 열매가 있었네. 그래서 굶지는 않았네.`,
            `며칠 뒤 시냇가에서 노인을 하나 보았네. 아주 늙은 사람이었네. 그 노인이 손짓으로 나를 불렀네. 그리고 자기를 업어서 저 개울을 건네 달라고 했네.`,
            `나는 딱하게 여겨 그 사람을 업었네. 개울을 건너 내려놓으려고 했네. 그런데 내려오지 않았네.`,
            `두 다리로 내 목을 감고 놓지 않았네. 그 다리에 힘이 어찌나 센지 목이 졸릴 지경이었네.`,
            `그때부터 그 노인은 내 등에서 내려오지 않았네. 내가 자면 등에서 자고, 내가 걸으면 발로 옆구리를 차서 방향을 시켰네. 열매를 따라고 하면 따야 했고, 물을 뜨라고 하면 떠야 했네.`,
            `그렇게 여러 달이 지났네. 나는 등이 굽고 다리가 떨렸네. 그러다 어느 날 나는 방법을 하나 생각해 냈네.`,
            `그 섬에는 커다란 조롱박이 열려 있었네. 나는 그것을 따서 속을 파냈네. 그리고 그 안에 포도를 짜 넣고 며칠 놓아두었네.`,
            `그것이 익어 술이 되었네. 나는 그것을 마시고 기운이 난 척했네. 노래를 부르고 춤을 추었네.`,
            `등에 업힌 노인이 그것을 보고 그 조롱박을 빼앗았네. 그리고 다 마셨네. 조금 뒤 그 다리에서 힘이 빠졌네.`,
            `나는 그를 등에서 내려놓았네. 그리고 그 섬을 벗어났네. 며칠 뒤 지나가는 배가 나를 건져 주었네. 그 배 사람들이 내 이야기를 듣고 이렇게 말했네.`,
            `"그자를 바다의 노인이라고 부릅니다. 그 등에 업힌 사람 가운데 살아 돌아온 사람은 당신이 처음입니다."`,
            `이야기가 끝나자 짐꾼 신드바드가 이렇게 물었습니다.<br>"그 노인은 왜 그렇게 합니까?"<br>"모르네."<br>"그럼 왜 업어 주셨습니까?"`,
            `뱃사람 신드바드는 잠깐 아무 말도 하지 않았습니다.`,
            `그러고는 이렇게 말했습니다.<br>"딱해 보였으니까."<br>"후회하십니까?"<br>"아니."<br>"왜요?"<br>"업어 주지 않았으면 나는 그자가 어떤 자인지 모른 채로 살았을 것이고, 그다음에 정말로 딱한 사람을 만났을 때도 안 업었을 걸세."<br>그러고는 이렇게 덧붙였습니다.<br>"다만 다음부터는 내려놓는 방법을 먼저 생각해 두네."`
        ]
    },
    {
        num: 7,
        title: "하늘을 나는 나무 말",
        emoji: "🐎",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `페르시아의 어느 왕이 새해 잔치를 열었습니다. 그 자리에 세 사람이 신기한 것을 가지고 왔습니다. 첫 번째 사람은 금으로 만든 공작을 가져왔습니다.`,
            `한 시간마다 날개를 치고 소리를 내는 것이었습니다. 두 번째 사람은 놋쇠 나팔수를 가져왔습니다. 성문 위에 세워 두면 적이 오는 것을 보고 나팔을 부는 것이었습니다.`,
            `세 번째 사람은 검은 나무로 만든 말을 가져왔습니다. 보기에는 그냥 말 조각이었습니다.`,
            `"이것은 하늘을 납니다."`,
            `사람들이 웃었습니다. 그 사람이 말에 올라 목 아래의 손잡이를 돌렸습니다. 그러자 말이 떠올랐습니다. 그리고 성 위로 한 바퀴 돌고 내려왔습니다.`,
            `왕이 크게 놀랐습니다.`,
            `"무엇을 원하는가."<br>"공주님을 아내로 주십시오."`,
            `왕은 대답을 미루었습니다. 그런데 그 자리에 왕자 카마르가 있었습니다. 왕자는 그 말을 타 보고 싶어 견딜 수가 없었습니다.`,
            `"제가 한번 타 보겠습니다."`,
            `왕자는 말에 올라 손잡이를 돌렸습니다. 말이 떠올랐습니다. 그리고 계속 올라갔습니다.`,
            `왕자는 내리는 방법을 묻지 않았던 것입니다. 말은 구름을 뚫고 올라갔습니다. 왕자는 숨이 막혔습니다. 그리고 손으로 말의 몸을 더듬었습니다.`,
            `어깨 쪽에 손잡이가 하나 더 있었습니다. 그것을 돌리자 말이 내려가기 시작했습니다. 왕자는 그날 밤 아주 먼 나라의 궁전 지붕에 내렸습니다.`,
            `그 나라는 벵골이라는 곳이었습니다. 그리고 거기서 공주를 만났습니다. 두 사람은 서로 마음이 맞았습니다.`,
            `왕자는 공주를 말에 태우고 자기 나라로 돌아왔습니다. 여기까지는 흔한 이야기입니다. 그런데 그다음이 있습니다.`,
            `그 나무 말을 만든 사람이 그것을 되찾으러 온 것입니다. 그 사람은 왕자가 없는 사이에 공주를 속여 말에 태우고 날아가 버렸습니다. 왕자는 온 세상을 돌아다니며 공주를 찾았습니다. 그리고 마침내 어느 나라에서 찾아냈습니다.`,
            `그 나라 왕이 공주를 궁에 데리고 있었는데, 공주가 아무 말도 하지 않고 아무것도 먹지 않아 걱정하고 있었습니다. 왕자는 의원 행세를 하고 그 궁에 들어갔습니다.`,
            `그리고 공주에게 몰래 말했습니다.<br>"그 나무 말이 이 궁 어디에 있는지 아십니까."<br>"압니다."`,
            `그날 두 사람은 그 말을 타고 떠났습니다. 이 이야기는 아주 오래되었습니다. 그런데 이 이야기를 지금 읽으면 이상한 기분이 듭니다.`,
            `사람이 하늘을 나는 것을 상상한 이야기가 천 년도 더 전에 있었던 것입니다. 그리고 그 이야기에서 제일 큰 문제는 나는 것이 아니라 내리는 것이었습니다. 실제로 사람이 하늘을 날게 되었을 때도 그랬습니다.`
        ]
    },
    {
        num: 8,
        title: "하룻밤의 왕",
        emoji: "👑",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `바그다드에 하룬 알라시드라는 칼리프가 있었습니다. 칼리프는 그 나라에서 가장 높은 사람입니다. 하룬은 밤이면 옷을 바꿔 입고 시내를 걸어 다녔습니다.`,
            `백성이 실제로 어떻게 사는지 보려는 것이었습니다. 어느 밤, 다리 위에서 젊은이를 하나 만났습니다. 이름은 아부 하산이었습니다.`,
            `아버지가 남긴 재산이 있어서 넉넉히 사는 사람이었습니다. 아부 하산은 낯선 나그네인 하룬을 집에 데려가 밥을 먹였습니다.`,
            `그리고 이야기를 나누다가 이렇게 말했습니다.<br>"저에게 소원이 하나 있습니다."<br>"무엇이오."<br>"딱 하루만 칼리프가 되어 보고 싶습니다."<br>"왜요?"<br>"우리 동네에 못된 사람이 넷 있습니다. 그 사람들을 제가 하루만 다스릴 수 있으면 좋겠습니다."`,
            `하룬은 그 말을 듣고 웃었습니다. 그리고 그날 밤 아부 하산의 잔에 잠드는 약을 조금 탔습니다. 아부 하산은 곧 잠들었습니다.`,
            `하룬은 그를 궁으로 옮기게 했습니다. 그리고 신하들에게 이렇게 일러 두었습니다.`,
            `"내일 이 사람이 깨거든, 하루 동안 이 사람을 칼리프로 대하라."`,
            `이튿날 아침, 아부 하산이 깼습니다. 비단 침대에 누워 있었고, 사람들이 엎드려 있었습니다.`,
            `"칼리프시여, 일어나셨습니까."`,
            `아부 하산은 자기가 꿈을 꾸는 줄 알았습니다. 손등을 물어 보았습니다. 아팠습니다.`,
            `그날 아부 하산은 칼리프 노릇을 했습니다. 그리고 제일 먼저 한 일이 있습니다. 그 동네의 못된 사람 넷을 잡아들이라고 한 것입니다.`,
            `그 사람들이 끌려왔습니다. 아부 하산은 그 사람들의 죄를 하나하나 말했습니다. 누가 누구의 밭을 빼앗았는지, 누가 과부의 돈을 떼먹었는지, 누가 아이들을 때렸는지.`,
            `아주 자세히 알고 있었습니다. 그 동네에서 오래 살았기 때문입니다. 그리고 벌을 내렸습니다. 그다음에는 어머니와 이웃들에게 돈을 보내라고 했습니다.`,
            `그러고는 이렇게 말했습니다.<br>"그 집 지붕이 새는데 아무도 고쳐 주지 않았소. 사람을 보내시오."`,
            `옆에서 하룬이 그것을 다 지켜보고 있었습니다. 그날 밤 아부 하산은 다시 잠들었고, 깨어 보니 자기 집이었습니다. 아부 하산은 그것이 꿈인지 아닌지 몰라 여러 날을 앓았습니다. 그러다 얼마 뒤 그 나그네가 다시 찾아왔습니다.`,
            `아부 하산이 그 이야기를 했습니다. 나그네가 웃으면서 두건을 벗었습니다. 아부 하산은 그 자리에 엎드렸습니다. 하룬이 그를 일으켜 세웠습니다.`,
            `"그대가 하루 동안 한 일을 내가 다 보았소."<br>"용서해 주십시오."<br>"용서할 것이 없소. 그대는 그 하루 동안 나보다 그 동네를 잘 알고 있었소."`,
            `그리고 하룬은 아부 하산을 곁에 두었습니다. 그 뒤로 아부 하산은 칼리프에게 바깥 이야기를 전하는 사람이 되었습니다.`
        ]
    },
    {
        num: 9,
        title: "검은 섬의 왕자",
        emoji: "🪨",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `어느 왕이 사냥을 나갔다가 길을 잃었습니다. 그러다 큰 호수를 하나 발견했습니다. 그 호수에는 물고기가 네 가지 빛깔로 헤엄치고 있었습니다.`,
            `흰 것과 붉은 것과 파란 것과 노란 것이었습니다. 그리고 호수 건너편에 궁전이 하나 있었습니다. 왕은 그 궁전으로 갔습니다.`,
            `문이 열려 있었습니다. 안에 들어가 보니 사람이 하나도 없었습니다. 방마다 등이 켜져 있고, 상에 밥이 차려져 있었습니다. 그런데 사람이 없었습니다.`,
            `왕이 큰 소리로 불렀습니다. 아무 대답이 없었습니다. 그러다 안쪽 방에서 우는 소리가 났습니다.`,
            `왕이 그 방에 들어갔습니다. 젊은 남자가 하나 옥좌에 앉아 있었습니다. 잘생긴 사람이었는데 얼굴이 몹시 슬펐습니다.`,
            `"어서 오십시오. 일어나 맞지 못하는 것을 용서하십시오."<br>"괜찮소."<br>"제가 일어날 수 없어서 그럽니다."`,
            `그리고 그 사람이 옷자락을 걷었습니다. 허리 아래가 돌이었습니다. 왕은 그 자리에 굳었습니다.`,
            `젊은이가 이야기를 시작했습니다. 그는 검은 섬이라는 나라의 왕이었습니다. 여러 해 전, 그 나라 안에서 큰 배신이 있었습니다.`,
            `그 일을 꾸민 사람은 마법을 쓸 줄 알았습니다. 그 사람은 왕을 이렇게 만들어 놓고, 나라 전체에도 마법을 걸었습니다. 그 나라의 도시가 통째로 호수가 되었습니다. 그리고 그 도시 사람들이 물고기가 되었습니다.`,
            `네 가지 빛깔은 그 나라의 네 부족이었습니다.`,
            `"저는 날마다 여기 앉아서 그 호수를 봅니다."<br>왕은 그 이야기를 다 듣고 이렇게 물었습니다.<br>"그 마법을 푸는 방법이 있소?"<br>"있습니다. 그런데 그것을 하려면 목숨을 걸어야 합니다."`,
            `왕은 그것을 하기로 했습니다. 그 방법이 무엇이었는지는 이야기마다 조금씩 다릅니다. 다만 결과는 같습니다.`,
            `왕이 그것을 해냈고, 마법이 풀렸습니다. 호수가 사라지고 그 자리에 도시가 다시 나타났습니다. 물고기들이 사람이 되었습니다.`,
            `장에서 물건을 팔던 사람은 물건을 팔던 자리에 서 있었고, 밥을 짓던 사람은 부뚜막 앞에 서 있었습니다. 여러 해가 지난 줄도 모르고 있었습니다. 그런데 젊은 왕은 자기 나라로 돌아가지 않았습니다. 그 도시가 있던 자리가 너무 외진 곳이라 사람이 살기 어려워졌기 때문입니다.`,
            `늙은 왕이 이렇게 말했습니다.<br>"내 나라로 갑시다. 내게는 아들이 없소."`,
            `그래서 두 나라 사람들이 함께 옮겨 가 살았습니다. 그 길이 한 해가 걸렸다고 합니다.`
        ]
    },
    {
        num: 10,
        title: "이야기의 값",
        emoji: "📖",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `아라비안나이트에는 이런 이야기가 수백 편 들어 있습니다. 그런데 이 책에는 이상한 점이 하나 있습니다. 한 가지 나라의 이야기가 아니라는 것입니다.`,
            `인도에서 온 이야기가 있고, 페르시아에서 온 이야기가 있고, 이집트에서 온 이야기가 있고, 바그다드에서 지어진 이야기가 있습니다. 천 년이 넘는 동안 여러 나라에서 흘러온 이야기가 이 한 권에 쌓인 것입니다. 그래서 이 책 안에는 서로 어긋나는 이야기도 있습니다.`,
            `어떤 편에서는 마신이 무섭고, 어떤 편에서는 마신이 심부름을 합니다. 어떤 편은 아주 짧고, 어떤 편은 백 쪽이 넘습니다. 그리고 한 가지가 더 있습니다.`,
            `알라딘과 알리바바는 사실 원래 아랍어 원본에 없었습니다. 삼백 년쯤 전에 프랑스 사람 앙투안 갈랑이 이 책을 유럽에 소개하면서 함께 실은 이야기입니다.`,
            `그가 시리아에서 온 어떤 사람에게 들은 것이라고 적어 두었습니다. 그래서 그 두 편은 아라비안나이트에서 제일 유명한데, 원본에는 없습니다. 이야기라는 것이 그렇게 흘러다닙니다.`,
            `이제 셰에라자드의 이야기로 돌아가겠습니다. 셰에라자드는 천 하룻밤 동안 이야기를 했습니다. 햇수로 거의 세 해였습니다. 그동안 그 사이에 아이가 셋 태어났습니다.`,
            `천 하룻날 밤, 셰에라자드가 이야기를 마치고 이렇게 말했습니다.<br>"임금님, 이제 제가 아는 이야기가 다 떨어졌습니다."`,
            `그리고 아이 셋을 데려오게 했습니다.<br>"이 아이들을 어미 없이 두지는 마십시오." 왕은 한참 아무 말도 하지 않았습니다.`,
            `그러다 이렇게 말했습니다.<br>"나는 그대를 죽이지 않겠소."<br>"고맙습니다."<br>"그런데 그것은 오늘 정한 것이 아니오."<br>"언제 정하셨습니까."<br>왕이 말했습니다.<br>"아주 오래되었소. 나도 정확히 언제인지는 모르겠소."`,
            `이 이야기를 어떻게 읽어야 하는지는 사람마다 다릅니다. 한 가지는 분명합니다. 셰에라자드가 목숨을 건 방법은 싸움이 아니었습니다. 그리고 애원도 아니었습니다.`,
            `그 사람은 이야기를 했습니다. 날마다 다른 사람의 인생을 하나씩 왕 앞에 가져다 놓은 것입니다. 어부 이야기, 짐꾼 이야기, 도둑 이야기, 왕자 이야기.`,
            `그 이야기들을 천 밤 동안 듣는 동안, 왕은 사람이라는 것을 다시 보게 되었습니다. 사람을 미워하기는 쉽습니다. 그런데 그 사람의 이야기를 끝까지 듣고 나서도 미워하기는 어렵습니다. 셰에라자드는 그것을 알고 있었습니다.`
        ]
    }
];
/* ── 쪽 나누기 ─────────────────────────────────────────
   그림은 쪽 위쪽에 가로로 꽉 차게 얹고 그 아래를 글로 채운다.
   그러니 그림이 있는 펼침면에도 양쪽 쪽에 다 글이 들어간다.
   다만 그림이 얹힌 쪽은 그림 높이만큼 글이 적게 들어간다.
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
        const over = ranges.some(([a, b], n) =>
            PROBE.measure((n === 0 ? headHtml : '') + runHtml(segs, a, b)) > caps[n] + 1);
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
                ${artFrame('cover.png', '🌙')}
            </div>
            <div class="story-page-right">
                <h1>아라비안나이트</h1>
                <p class="cover-tag">여러 나라에서 전해 온 이야기</p>
                <p>사람을 믿지 못하게 된 왕 앞에서, 셰에라자드가 천 하룻밤 동안 이야기를 이어 갑니다. 재미있어지는 대목에서 늘 멈춥니다.</p>
                <p>그 안에서 나온 이야기 가운데 아홉 편을 골라 담았습니다.</p>
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
    { q: "셰에라자드가 이야기를 밤마다 중간에서 멈춘 까닭은 무엇입니까?", choices: ["밤이 깊어 목이 아팠기 때문에", "왕이 뒷이야기를 궁금해하게 하려고", "다음 이야기를 아직 못 지어서"], answer: 1 },
    { q: "항아리 속 마신이 마지막 백 년 동안 한 결심은 무엇입니까?", choices: ["꺼내 준 이를 왕으로 만들겠다", "꺼내 준 이를 죽이겠다", "꺼내 준 이를 종으로 삼겠다"], answer: 1 },
    { q: "어부가 마신을 다시 항아리에 넣은 방법은 무엇입니까?", choices: ["그 큰 몸이 들어갔다는 것을 못 믿겠다고 해서", "항아리에 새긴 글자를 소리 내어 읽어서", "소원 세 가지 가운데 하나로 그것을 빌어서"], answer: 0 },
    { q: "알라딘을 굴로 데려간 사람은 누구입니까?", choices: ["어머니가 부탁한 이웃", "이웃 나라에서 온 상인", "삼촌 행세를 한 마법사"], answer: 2 },
    { q: "알라딘이 굴에 갇힌 까닭은 무엇입니까?", choices: ["램프를 먼저 던져 올리지 않아서", "굴 안의 보석에 손을 대어서", "주문을 거꾸로 외웠기 때문에"], answer: 0 },
    { q: "알라딘이 궁전을 빼앗긴 까닭은 무엇입니까?", choices: ["램프가 무엇인지 아내에게 말하지 않아서", "마법사에게 궁전 문을 열어 주어서", "램프를 창가에 놓아둔 채 사냥을 나가서"], answer: 0 },
    { q: "알리바바가 굴에서 금을 다 가져가지 않은 것은 무엇과 견주어 다릅니까?", choices: ["도둑들은 해마다 다시 채워 넣었다", "모르지아나는 아예 손을 대지 않았다", "형 카심은 나귀 열 마리를 끌고 갔다"], answer: 2 },
    { q: "카심이 굴에서 나오지 못한 까닭은 무엇입니까?", choices: ["도둑들이 먼저 돌아왔기 때문에", "금을 보는 동안 주문이 생각나지 않아서", "나귀가 놀라 달아나 버렸기 때문에"], answer: 1 },
    { q: "알리바바의 집을 여러 번 구한 사람은 누구입니까?", choices: ["집안일을 하던 모르지아나", "이웃에 살던 기름 장수", "알리바바의 아들과 며느리"], answer: 0 },
    { q: "신드바드가 로크 새의 다리에 몸을 묶은 까닭은 무엇입니까?", choices: ["그 새의 알을 가져가고 싶어서", "섬 건너편을 보고 싶었기 때문에", "그 섬에 그대로 있으면 굶어 죽어서"], answer: 2 },
    { q: "다이아몬드 골짜기에서 신드바드가 빠져나온 방법은 무엇입니까?", choices: ["위에서 던져진 고깃덩이에 몸을 묶었다", "골짜기 벽을 손으로 짚고 기어올랐다", "뱀들이 다니는 길을 따라 걸어 나왔다"], answer: 0 },
    { q: "바다의 노인을 등에서 내려놓은 방법은 무엇입니까?", choices: ["물속으로 들어가 씻어 내려서", "조롱박에 담근 술을 마시게 해서", "나무에 몸을 비벼 떼어 내서"], answer: 1 },
    { q: "나무 말을 처음 탄 왕자가 겪은 문제는 무엇입니까?", choices: ["내리는 방법을 미리 묻지 않은 것", "말이 날다가 부서져 버린 것", "타는 방법을 잘못 배운 것"], answer: 0 },
    { q: "아부 하산이 하루 동안 칼리프가 되어 제일 먼저 한 일은 무엇입니까?", choices: ["온 나라의 세금을 한 해 없앴다", "어머니에게 큰 집을 지어 주었다", "동네의 못된 사람 넷을 잡아들였다"], answer: 2 },
    { q: "알라딘과 알리바바 이야기에 대해 이 책이 밝힌 사실은 무엇입니까?", choices: ["가장 오래된 사본에 처음부터 들어 있었다", "아랍어 원본에 없고 나중에 실린 이야기다", "셰에라자드가 지어낸 것으로 적혀 있다"], answer: 1 },
    { q: "셰에라자드가 목숨을 건 방법은 무엇입니까?", choices: ["왕에게 잘못을 빌고 오래 용서를 구한 것", "왕의 신하들을 하나씩 자기 편으로 만든 것", "천 밤 동안 남의 이야기를 들려준 것"], answer: 2 }
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

function endPage() {
    return `
        <div class="page page-end">
            ${artFrame('end.png', '📖')}
            <h2>아라비안나이트를 다 읽었습니다</h2>
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
        ...QUIZ_GROUPS.map((_, i) => ({ kind: 'quiz', part: i })),
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
        case 'quiz': return quizPage(page.part);
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
