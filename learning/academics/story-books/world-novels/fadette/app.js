const BOOK_TITLE = "사랑의 요정";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "쌍둥이",
        emoji: "👬",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `프랑스 가운데쯤에 베리라는 지방이 있습니다. 들이 넓고 개울이 많고, 밀과 삼을 심는 고장입니다. 그 고장 코스라는 마을에 바르보라는 농부가 살았습니다.`,
            `바르보 영감은 밭이 제법 있었고, 소가 여섯 마리 있었고, 아이가 여럿이었습니다. 마을에서 살림이 넉넉한 축에 들었습니다. 어느 해 그 집에 쌍둥이가 태어났습니다.`,
            `사내아이 둘이었습니다. 그 시절 시골에서는 쌍둥이가 태어나면 사람들이 걱정을 했습니다. 쌍둥이는 서로 너무 붙어서 자라기 때문에, 나중에 하나가 없으면 다른 하나가 못 산다는 말이 있었습니다.`,
            `아기를 받으러 온 나이 든 여자가 바르보 영감에게 이렇게 말했습니다.<br>"둘을 똑같이 키우지 마시오. 옷도 다르게 입히고, 이름도 헷갈리지 않게 짓고, 되도록 떼어 놓으시오."`,
            `바르보 영감은 그 말을 새겨들었습니다. 그런데 실제로는 그렇게 되지 않았습니다. 아이들이 너무 예뻤기 때문입니다.`,
            `어머니는 두 아이에게 똑같은 옷을 입혔습니다. 둘을 나란히 놓고 보는 것이 좋았기 때문입니다. 형은 실비네, 동생은 랑드리라고 지었습니다.`,
            `두 아이는 아주 닮았습니다. 마을 사람들도 구별하지 못했습니다. 그런데 성격은 달랐습니다.`,
            `실비네는 마음이 여리고 생각이 많았습니다. 랑드리는 몸이 튼튼하고 겁이 없었습니다. 실비네는 나비를 잡았다가도 놓아 주었습니다.`,
            `랑드리는 개울에 뛰어들어 물고기를 손으로 잡았습니다. 실비네는 낯선 사람이 오면 어머니 뒤로 숨었습니다. 랑드리는 앞으로 나가 이름을 물었습니다. 그리고 두 아이는 서로를 몹시 아꼈습니다.`,
            `늘 함께 놀았고, 함께 잤고, 하나가 울면 다른 하나도 울었습니다. 누가 실비네를 놀리면 랑드리가 달려들어 싸웠습니다. 사람들은 그것을 보고 참 보기 좋다고 했습니다. 그런데 바르보 영감만은 마음이 편치 않았습니다.`,
            `두 아이가 서로 말고는 아무도 필요로 하지 않았기 때문입니다. 바르보 영감은 밭에서 일하다가 가끔 두 아이를 지켜보았습니다. 그리고 이런 생각을 했습니다.`,
            `저 둘은 언젠가 떨어져야 합니다. 사람은 누구나 자기 몫의 삶을 따로 살아야 하기 때문입니다. 그런데 언제 어떻게 떼어 놓아야 하는지는 알 수 없었습니다.`,
            `그것을 알려 주는 사람은 아무도 없었습니다.`
        ]
    },
    {
        num: 2,
        title: "떨어뜨려 놓다",
        emoji: "🌾",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `아이들이 열네 살이 되자 바르보 영감이 결심을 했습니다.`,
            `그해 겨울, 그는 아내에게 말했습니다.<br>"저 애들을 떼어 놓아야겠소."<br>"왜요."<br>"저러다 하나가 다치거나 앓으면 다른 하나가 못 견디오. 지금 떼어 놓지 않으면 나중에 더 힘드오."<br>"둘 다 우리 집에 있으면 안 됩니까."<br>"우리 밭에 일손이 둘까지는 필요 없소. 하나는 남의 집에 가서 새경을 받아 오는 게 낫소."`,
            `그 시절 시골에서는 그렇게 하는 집이 많았습니다. 아이가 여럿이면 하나쯤은 남의 농장에 일꾼으로 보냈습니다. 새경이라는 것은 한 해 일하고 받는 삯입니다.`,
            `돈으로 받기도 하고 곡식으로 받기도 했습니다. 열네 살이면 어른의 절반쯤 받았습니다. 이웃 마을 프리슈에 카요 영감이라는 사람이 있었는데, 마침 일손을 구하고 있었습니다.`,
            `걸어서 한 시간 거리였습니다. 아주 먼 데도 아니었습니다.`,
            `바르보 영감은 두 아이를 불렀습니다.<br>"둘 중에 하나가 프리슈에 가야 한다. 누가 갈지 너희가 정해라."`,
            `두 아이는 아무 말도 하지 못했습니다. 그날 밤 두 아이는 잠을 자지 못했습니다.`,
            `이튿날 아침, 랑드리가 말했습니다.<br>"제가 가겠습니다."`,
            `실비네가 울었습니다.`,
            `"네가 왜 가."<br>"내가 너보다 튼튼하니까."`,
            `그것은 사실이었습니다. 그런데 그것 때문만은 아니었습니다. 랑드리는 형이 남의 집에서 견디지 못하리라는 것을 알고 있었습니다.`,
            `랑드리가 떠나던 날 아침, 실비네는 집 뒤로 가서 나오지 않았습니다. 랑드리는 어머니에게 인사하고 길을 나섰습니다. 마을 어귀까지 갔다가 뒤를 돌아보았습니다.`,
            `아무도 없었습니다. 랑드리는 그 길을 혼자 걸었습니다. 열네 살이었습니다.`,
            `가는 길에 랑드리는 여러 번 걸음을 늦추었습니다. 돌아가고 싶은 마음이 몇 번이나 들었습니다.`,
            `그때마다 랑드리는 이렇게 생각했습니다. 지금 돌아가면 형이 가야 합니다. 그러면 걸음이 다시 앞으로 나갔습니다.`,
            `프리슈 농장이 보이는 언덕에 이르렀을 때 해가 높이 떠 있었습니다. 랑드리는 그 자리에 서서 옷을 털었습니다. 그리고 얼굴을 문질러 눈물 자국을 지웠습니다.`,
            `남의 집에 우는 얼굴로 들어가고 싶지 않았기 때문입니다.`
        ]
    },
    {
        num: 3,
        title: "프리슈 농장",
        emoji: "🐄",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `프리슈 농장에서 랑드리는 소를 몰고 밭을 갈았습니다. 카요 영감은 사람이 나쁘지 않았습니다. 그 집 사람들도 랑드리를 잘 대해 주었습니다.`,
            `랑드리는 일을 아주 잘했습니다. 소를 다루는 솜씨가 좋아서 곧 그 집에서 없어서는 안 될 사람이 되었습니다. 새벽 네 시에 일어나 소에게 여물을 주고, 해가 뜨면 밭으로 나갔습니다.`,
            `낮에는 쟁기를 잡았고, 저녁에는 다시 소를 돌보았습니다. 손에 물집이 잡혔다가 굳은살이 되었습니다.`,
            `석 달이 지나자 카요 영감이 이렇게 말했습니다.<br>"저 아이는 열네 살인데 스무 살 몫을 한다."`,
            `일요일마다 랑드리는 집에 갔습니다. 그날은 실비네가 마을 어귀까지 나와 기다렸습니다. 두 아이는 하루 종일 붙어 있었습니다. 그러다 해가 기울면 실비네의 얼굴이 어두워졌습니다.`,
            `랑드리가 돌아가야 했기 때문입니다. 실비네는 프리슈까지 따라갔다가 돌아왔습니다. 그리고 밤에 울었습니다.`,
            `랑드리도 처음 몇 달은 힘들었습니다. 그런데 랑드리는 낮에 일이 많았습니다. 일이 많으면 생각할 겨를이 없습니다. 그래서 랑드리는 조금씩 견딜 만해졌습니다.`,
            `실비네는 그러지 못했습니다. 실비네는 집에서 아버지와 일했는데, 밭일을 하다가도 자꾸 프리슈 쪽을 보았습니다. 그리고 야위어 갔습니다.`,
            `어머니가 걱정했습니다.<br>"저러다 병이 나겠어요."`,
            `바르보 영감은 아무 말도 하지 않았습니다. 속으로는 그도 걱정하고 있었습니다. 그런데 이제 와서 되돌리면 아무 소용이 없다고 생각했습니다.`,
            `그렇게 한 해가 지났습니다. 실비네는 점점 이상해졌습니다. 랑드리가 프리슈에서 다른 사람과 웃고 있는 것을 보면 하루 종일 말을 하지 않았습니다.`,
            `랑드리가 그것을 알아채고 물었습니다.<br>"형, 왜 그래."<br>"아무것도 아니야."<br>어느 일요일, 랑드리가 돌아가는 길에 실비네가 이렇게 물었습니다.<br>"거기 사람들이 잘해 줘?"<br>"응."<br>"거기가 우리 집보다 좋아?"`,
            `랑드리는 그 물음에 대답하지 못했습니다. 어떻게 대답해도 형이 아플 것 같았기 때문입니다. 실비네는 그 침묵을 자기 나름대로 알아들었습니다. 그리고 그날 밤 더 오래 울었습니다.`
        ]
    },
    {
        num: 4,
        title: "사라진 형",
        emoji: "🌫️",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `그해 여름 어느 날이었습니다. 실비네가 집에서 없어졌습니다. 아침에 밭에 나간다고 나갔는데 저녁까지 돌아오지 않았습니다.`,
            `밤이 되자 온 마을이 나섰습니다. 개울을 뒤지고, 숲을 뒤지고, 이웃 마을까지 사람을 보냈습니다. 랑드리도 프리슈에서 달려왔습니다.`,
            `밤새 찾았지만 나오지 않았습니다. 이튿날도 못 찾았습니다. 어머니는 앓아누웠습니다.`,
            `바르보 영감은 개울가에 서서 물을 오래 보았습니다. 아무도 그 말을 입 밖에 내지 않았습니다. 그런데 다들 같은 생각을 하고 있었습니다.`,
            `개울은 그해 여름 물이 많았습니다. 물레방앗간 아래는 어른 키를 넘었습니다. 마을에서는 몇 해 전에도 그 자리에서 사람이 하나 나온 적이 있었습니다. 그래서 다들 그쪽을 보면서도 아무 말도 하지 않았습니다.`,
            `그날 저녁, 랑드리는 혼자 개울 쪽으로 걸었습니다. 그러다 물레방앗간 근처에서 걸음을 멈췄습니다. 그 옆 비탈에 낡은 오두막이 하나 있었습니다.`,
            `파데 할머니가 사는 집이었습니다. 마을 사람들은 그 할머니를 조금 무서워했습니다. 약초를 잘 알아서 아픈 사람을 고쳐 주었는데, 사람들은 그것을 마법이라고 했습니다. 그런데 아프면 다들 그 집에 갔습니다.`,
            `그 집에는 손녀가 둘 있었습니다. 팡셰라는 여자아이와, 그 남동생 자네였습니다. 두 아이의 어머니는 몇 해 전에 마을을 떠났고, 그 뒤로 소식이 없었습니다.`,
            `마을에서는 그 어머니에 대해 좋지 않은 말이 돌았습니다. 그래서 두 아이도 그 말을 듣고 자랐습니다. 팡셰는 랑드리와 나이가 비슷했습니다. 그런데 아이들은 팡셰를 '작은 파데트'라고 불렀습니다.`,
            `그 마을 말로 파데트는 도깨비라는 뜻이었습니다. 팡셰는 키가 작고 말랐고, 머리가 헝클어져 있었고, 옷이 늘 더러웠습니다. 그리고 말이 아주 험했습니다.`,
            `아이들이 놀리면 팡셰는 더 심한 말로 되받았습니다. 그래서 아무도 팡셰와 놀지 않았습니다. 팡셰는 소를 쳤습니다.`,
            `마을 사람들의 소를 맡아 하루 종일 들에서 먹이고 저녁에 돌려주는 일이었습니다. 그 삯으로 세 식구가 먹고살았습니다. 동생 자네는 다리를 절었습니다. 그래서 아이들이 자네도 놀렸습니다.`,
            `팡셰는 누가 자네를 놀리면 돌을 던졌습니다. 그래서 팡셰가 더 미움을 받았습니다.`
        ]
    },
    {
        num: 5,
        title: "조건",
        emoji: "🤝",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `랑드리가 그 오두막 앞을 지날 때였습니다. 담 위에 누가 앉아 있었습니다. 팡셰였습니다.`,
            `"형을 찾는다며?" 랑드리는 대꾸하지 않았습니다.<br>"내가 어디 있는지 아는데."`,
            `랑드리가 고개를 들었습니다.`,
            `"어디 있어?"<br>"조건이 있어."<br>"뭐든 말해."`,
            `팡셰가 담에서 뛰어내렸습니다.`,
            `"지금은 말 안 할래. 나중에 내가 뭘 시키면 그대로 해. 뭐든지."`,
            `"뭘 시킬 건데?"<br>"몰라. 아직 안 정했어."`,
            `랑드리는 잠깐 망설였습니다. 그런데 다른 방법이 없었습니다.`,
            `"약속할게."`,
            `팡셰가 손을 내밀었습니다. 랑드리가 그 손을 잡았습니다.`,
            `"그럼 따라와."`,
            `팡셰는 개울을 따라 한참 내려갔습니다. 가는 동안 팡셰는 뒤도 돌아보지 않았습니다. 걸음이 아주 빨랐습니다.`,
            `랑드리는 뛰다시피 따라갔습니다. 가면서 랑드리는 이런 생각을 했습니다. 이 아이가 거짓말을 하는 것이면 어쩌나. 그런데 그런 것 같지는 않았습니다.`,
            `거짓말을 하는 사람은 자꾸 뒤를 돌아보기 때문입니다. 그리고 물이 굽어 도는 자리에서 멈췄습니다. 그 자리에 커다란 물푸레나무가 있었고, 그 아래 풀이 무성했습니다.`,
            `그 안에 실비네가 웅크리고 앉아 있었습니다. 이틀 동안 아무것도 먹지 않고 그 자리에 있었던 것입니다. 랑드리가 달려가 형을 안았습니다.`,
            `실비네는 울면서 말했습니다.<br>"집에 못 가겠어."<br>"왜."<br>"내가 집을 나오면 다들 나를 찾을 줄 알았어. 그런데 막상 아무도 안 오니까······."<br>"다들 밤새 찾았어."`,
            `실비네는 그 말을 듣고 더 울었습니다. 랑드리는 형을 업고 집으로 갔습니다. 가면서 뒤를 돌아보았습니다.`,
            `팡셰는 이미 없었습니다. 집에 닿았을 때는 한밤중이었습니다. 어머니가 뛰어나와 실비네를 안았습니다.`,
            `바르보 영감은 아무 말도 하지 않고 그 자리에 서 있었습니다. 그러고는 밖으로 나가 한참 뒤에 들어왔습니다.`,
            `그날 밤 랑드리는 프리슈로 돌아가지 않고 집에서 잤습니다. 형 옆에 누웠는데 잠이 오지 않았습니다. 팡셰가 한 말이 자꾸 생각났기 때문입니다.`,
            `무엇을 시킬지 아직 안 정했다는 말이었습니다.`
        ]
    },
    {
        num: 6,
        title: "팡셰는 어떻게 알았나",
        emoji: "🌿",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `마을 사람들은 팡셰가 마법으로 알아낸 것이라고 했습니다.`,
            `"그 집안이 원래 그런 집안이야."<br>"할머니도 그렇고 그 애도 그렇고."`,
            `랑드리는 며칠 뒤 팡셰를 다시 만났습니다.`,
            `그리고 물었습니다.<br>"어떻게 알았어?"`,
            `팡셰가 랑드리를 빤히 보았습니다.`,
            `"진짜로 궁금해?"<br>"응."<br>"나는 하루 종일 밖에 있거든."`,
            `팡셰는 소를 치고 약초를 캐느라 들과 개울을 종일 돌아다녔습니다. 그래서 그 고장의 구석구석을 알았습니다. 어느 자리에 물이 깊은지, 어느 덤불 뒤가 안 보이는지 다 알았습니다.`,
            `비가 오면 어디로 물이 모이는지 알았고, 어느 나무 아래가 마른지 알았습니다. 새가 어느 시각에 우는지 알았고, 그 소리가 달라지면 사람이 지나간 것이라는 것도 알았습니다.`,
            `그것은 마법이 아니라 하루 열 시간씩 밖에 있어서 얻은 것이었습니다.`,
            `"그리고 나는 사람들이 어디로 가는지 봐."<br>"왜 봐?"<br>"할 게 없으니까."`,
            `팡셰는 그날 오후 실비네가 개울 쪽으로 가는 것을 보았습니다. 그리고 그 뒤로 나오지 않는 것도 보았습니다.`,
            `"그게 다야. 마법 같은 건 없어."`,
            `랑드리는 그 말을 듣고 이상한 기분이 들었습니다.<br>"그럼 왜 사람들한테 그렇게 말 안 해?"`,
            `팡셰가 웃었습니다. 그런데 그 웃음이 좋은 웃음이 아니었습니다.`,
            `"말하면 믿을 것 같아?" 랑드리는 대답하지 못했습니다.`,
            `팡셰가 말했습니다.<br>"저 사람들은 내가 마녀라고 하는 게 편해. 그래야 나를 미워해도 되니까."`,
            `그러고는 돌아섰습니다. 랑드리는 그 뒷모습을 오래 보았습니다.`,
            `그날 랑드리는 처음으로 그 아이를 사람으로 보았습니다. 그전까지는 랑드리도 다른 아이들처럼 팡셰를 놀리는 쪽이었습니다. 돌아오는 길에 랑드리는 지난겨울 일이 생각났습니다.`,
            `아이들이 자네의 지팡이를 빼앗아 던졌을 때, 랑드리도 그 자리에 있었습니다. 말리지 않았습니다. 웃지도 않았지만 말리지도 않았습니다.`,
            `그때는 그것이 아무것도 아닌 일 같았습니다. 지금은 아니었습니다.`
        ]
    },
    {
        num: 7,
        title: "성 앙도슈 축제",
        emoji: "💃",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그해 가을, 마을에 큰 축제가 열렸습니다. 성 앙도슈 축제였습니다. 마을 사람들이 다 광장에 모여 춤을 추었습니다.`,
            `젊은 사람들에게는 일 년에 한 번 있는 큰 날이었습니다. 그날 처음 함께 춤을 춘 두 사람이 가을에 혼인하는 일이 흔했습니다. 그래서 누가 누구와 춤을 추는지를 온 마을이 지켜보았습니다.`,
            `그날의 춤은 그냥 춤이 아니었습니다. 랑드리는 그날 마들롱이라는 아이와 춤을 추기로 되어 있었습니다. 마들롱은 카요 영감의 조카딸인데, 마을에서 예쁘기로 소문난 아이였습니다.`,
            `랑드리는 그것이 아주 좋았습니다. 첫 번째 춤을 추려고 손을 내미는데, 옆에서 누가 팔을 잡았습니다. 팡셰였습니다.`,
            `머리가 헝클어져 있었고, 옷이 낡았습니다.<br>"약속 기억나?" 랑드리의 얼굴이 하얘졌습니다.`,
            `"······기억나."<br>"오늘 나랑 춤춰. 일곱 번."`,
            `광장이 조용해졌습니다. 그리고 웃음이 터졌습니다.`,
            `"저 도깨비가 랑드리한테 춤을 추재!"`,
            `마들롱이 얼굴을 붉히며 돌아섰습니다. 랑드리는 그 자리에 서 있었습니다. 도망칠 수도 있었습니다. 그런데 랑드리는 손을 내밀었습니다.`,
            `"그러자."`,
            `두 사람은 춤을 추었습니다. 한 번, 두 번, 세 번. 사람들이 둘러서서 놀렸습니다.`,
            `팡셰는 고개를 들고 춤을 추었습니다. 일곱 번을 다 추었습니다. 네 번째 춤부터 사람들이 조금 조용해졌습니다.`,
            `다섯 번째부터는 아무도 웃지 않았습니다. 여섯 번째와 일곱 번째는 거의 아무 소리도 나지 않았습니다. 무엇 때문에 조용해졌는지는 그 자리에 있던 사람들도 몰랐습니다. 그리고 춤이 끝나자 팡셰는 광장을 빠져나갔습니다.`,
            `랑드리는 마들롱을 찾으러 갔습니다. 마들롱은 다른 사람과 춤을 추고 있었고, 랑드리를 보고도 못 본 척했습니다.`
        ]
    },
    {
        num: 8,
        title: "채석장에서",
        emoji: "😢",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `그날 저녁 랑드리는 집에 가는 길에 채석장 옆을 지났습니다. 거기서 우는 소리가 났습니다. 가 보니 팡셰가 돌 위에 앉아 울고 있었습니다.`,
            `랑드리는 그때까지 팡셰가 우는 것을 본 적이 없었습니다. 팡셰는 누가 무슨 말을 해도 지지 않고 되받는 아이였습니다.`,
            `"왜 울어." 팡셰가 얼굴을 돌렸습니다.<br>"저리 가."`,
            `랑드리는 옆에 앉았습니다. 채석장에는 아무도 없었습니다. 저 아래 광장에서 아직 음악 소리가 났습니다.`,
            `그 소리가 여기까지 들렸습니다.`,
            `한참 뒤에 팡셰가 말했습니다.<br>"오늘 너 때문에 다들 너를 놀렸잖아."<br>"그건 네 잘못이 아니야."<br>"내 잘못이야. 내가 시켰으니까."`,
            `팡셰가 눈을 닦았습니다.`,
            `"나는 오늘 그냥 한 번만 사람들 앞에서 사람 취급 받아 보고 싶었어."<br>"······."<br>"그런데 그것도 남한테 억지로 시켜서 받은 거잖아."`,
            `랑드리는 아무 말도 하지 못했습니다.`,
            `팡셰가 말했습니다.<br>"내가 왜 이렇게 하고 다니는지 알아?"<br>"몰라."<br>"곱게 하고 다니면 사람들이 더 심하게 말해. 어머니 이야기를 꺼내. 그래서 아예 더럽게 하고 다니는 거야. 그러면 그냥 더러운 애가 되니까."`,
            `랑드리는 그 말을 듣고 속이 뜨거워졌습니다.`,
            `"그건······ 그렇게 살 필요 없잖아."<br>"그럼 어떻게 살아."<br>랑드리가 말했습니다.<br>"네가 하고 싶은 대로 하면 되지. 남들이 뭐라고 하든."`,
            `팡셰가 랑드리를 보았습니다. 그리고 처음으로 아무 말도 되받지 않았습니다.`,
            `그날 밤 팡셰는 오래 잠들지 못했습니다. 돌아가는 길에 랑드리는 자기가 한 말을 곱씹었습니다. 네가 하고 싶은 대로 하면 된다고 했습니다. 그런데 랑드리 자신은 그렇게 살아 본 적이 없었습니다.`,
            `아버지가 프리슈에 가라고 해서 갔고, 형이 울면 자기도 울었습니다. 랑드리는 그날 밤 그것이 부끄러웠습니다.`
        ]
    },
    {
        num: 9,
        title: "달라진 사람",
        emoji: "🌼",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `그 뒤로 몇 달 동안 팡셰가 달라졌습니다. 옷을 빨아 입었습니다. 머리를 빗어 묶었습니다.`,
            `말을 험하게 하지 않았습니다. 누가 놀려도 되받지 않고 그냥 지나갔습니다. 그런데 여기서 한 가지 짚어 둘 것이 있습니다.`,
            `팡셰는 랑드리가 시켜서 그렇게 한 것이 아닙니다. 랑드리는 아무것도 시키지 않았습니다. 팡셰는 그 말을 듣고 며칠을 혼자 생각한 끝에, 자기가 정해서 그렇게 한 것입니다.`,
            `팡셰는 나중에 이렇게 말했습니다.<br>"나는 사람들이 나를 어떻게 보든 상관없다고 생각했어. 그런데 아니었어. 상관있었어. 그걸 인정하는 게 제일 어려웠어."`,
            `그런데 그것이 제일 어려웠습니다. 되받지 않으면 이기지 못한 것 같았기 때문입니다. 팡셰는 몇 번이나 참지 못하고 되받았습니다. 그러고는 집에 와서 스스로에게 화를 냈습니다.`,
            `봄이 되자 마을 사람들이 놀랐습니다. 그 도깨비 같던 아이가 사라지고, 그 자리에 조용하고 눈이 맑은 소녀가 있었기 때문입니다. 팡셰는 여전히 키가 작고 얼굴이 예쁘지 않았습니다. 그런데 사람들이 자꾸 그 아이를 다시 보게 되었습니다.`,
            `팡셰는 할머니에게서 약초를 배웠습니다. 그리고 아픈 사람의 집에 가서 밤을 새우고 오는 일이 많아졌습니다. 그러면서 마을에서 팡셰를 좋게 말하는 사람이 하나둘 생겼습니다.`,
            `랑드리는 그동안 프리슈에서 일했습니다. 그리고 일요일마다 개울가에서 팡셰를 만났습니다. 두 사람은 물푸레나무 아래에 앉아서 이야기를 했습니다.`,
            `랑드리는 팡셰와 이야기하는 것이 좋았습니다. 팡셰는 랑드리가 아는 누구보다 아는 것이 많았습니다. 풀 이름을 다 알았고, 새 소리를 구별했고, 사람 마음을 잘 읽었습니다. 그리고 남의 이야기를 오래 들어 주었습니다.`,
            `랑드리는 그해 봄에 이런 생각을 했습니다. '나는 이 사람이 좋다.' 그리고 그 생각을 하고 나서 며칠 동안 밥이 안 넘어갔습니다.`,
            `그해 여름 마을에 열병이 돌았습니다. 여러 집에서 아이들이 앓았습니다. 팡셰는 그 집들을 다니면서 밤을 새웠습니다.`,
            `그 가운데는 팡셰를 도깨비라고 부르던 아이들의 집도 있었습니다. 팡셰는 그 집에도 갔습니다. 그리고 그 이야기를 아무에게도 하지 않았습니다.`
        ]
    },
    {
        num: 10,
        title: "소문",
        emoji: "🗣️",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `여름이 되자 소문이 났습니다. 프리슈의 랑드리가 파데트와 만난다는 소문이었습니다. 그 소문을 퍼뜨린 사람 가운데 마들롱도 있었습니다.`,
            `마들롱은 축제 날 일을 잊지 않고 있었습니다. 소문은 곧 바르보 영감의 귀에 들어갔습니다.`,
            `바르보 영감이 랑드리를 불렀습니다.<br>"그 애를 만난다는 게 사실이냐."<br>"사실입니다."<br>"그만두어라."<br>"왜요."<br>"그 집안이 어떤 집안인지 알지 않느냐."<br>랑드리가 말했습니다.<br>"아버지, 그 집안이 어떤 집안인지는 저도 압니다. 그런데 그 아이가 어떤 아이인지는 아버지가 모르십니다."`,
            `바르보 영감이 손을 들었습니다. 그런데 때리지는 않았습니다. 랑드리가 열여덟이 되어 있었기 때문입니다.`,
            `"내가 반대하면 어쩌겠느냐."<br>"기다리겠습니다."<br>"언제까지."<br>"아버지가 그 아이를 한 번이라도 만나 보실 때까지요."`,
            `바르보 영감은 아들의 얼굴을 보았습니다. 그 얼굴에서 자기 젊을 때가 보였습니다. 그래서 더 화가 났습니다.`,
            `"나가 봐라."`,
            `랑드리가 나가고 나서 바르보 영감은 오래 앉아 있었습니다. 그 무렵 실비네도 힘들어했습니다. 실비네는 팡셰를 아주 미워했습니다. 그런데 그 까닭이 이상했습니다.`,
            `실비네는 팡셰가 나쁜 아이라서 미워한 것이 아니었습니다. 동생이 자기 말고 다른 사람을 좋아하는 것이 견디기 힘들었던 것입니다. 실비네는 그것을 스스로 인정하지 못했습니다. 그래서 팡셰의 흠을 자꾸 찾았습니다.`,
            `그리고 그해 여름 실비네가 다시 앓아누웠습니다. 열이 나고, 헛소리를 하고, 밥을 못 먹었습니다. 의사가 와서 보고 고개를 저었습니다.`,
            `"몸에는 아무 이상이 없습니다."`,
            `그해 여름 랑드리는 형의 방 앞에서 여러 밤을 서성였습니다. 그리고 이런 생각을 했습니다. 형이 이렇게 된 것은 자기 때문입니다. 그런데 어떻게 해야 하는지는 알 수 없었습니다.`,
            `곁에 있어 주면 형이 나을 것 같기도 하고, 그러면 더 나빠질 것 같기도 했습니다.`
        ]
    },
    {
        num: 11,
        title: "마을을 떠나다",
        emoji: "🎒",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `그해 가을, 파데 할머니가 세상을 떠났습니다. 팡셰는 열여덟이었고, 남동생 자네는 열두 살이었습니다. 장례를 치르고 나서 팡셰가 랑드리를 찾아왔습니다.`,
            `"나 마을을 떠날 거야." 랑드리가 놀랐습니다.`,
            `"왜."<br>"여기 있으면 네 아버지가 너를 못 견디게 하실 테니까."<br>"그건 내 일이야."<br>"그리고 나도 좀 배우고 싶어."`,
            `팡셰는 도시로 가서 병자를 돌보는 일을 배우겠다고 했습니다. 할머니에게 배운 것이 있으니 그것을 제대로 배워 보겠다는 것이었습니다.`,
            `그 무렵 도시에는 병자를 돌보는 사람을 구하는 큰 집이 많았습니다. 글을 읽을 줄 알고 약을 다룰 줄 알면 자리를 얻을 수 있었습니다. 팡셰는 할머니에게서 글을 배웠습니다.`,
            `파데 할머니는 젊을 때 어느 집에서 일하며 글을 배운 사람이었습니다. 그것을 아는 사람은 마을에 하나도 없었습니다.`,
            `"자네는 우리 이모가 봐 주기로 했어."<br>랑드리가 말했습니다.<br>"언제 올 거야."<br>"몰라."<br>"기다릴게."`,
            `팡셰는 그 말에 아무 대답도 하지 않았습니다.`,
            `대신 이렇게 말했습니다.<br>"랑드리, 나 하나만 물어볼게."<br>"응."<br>"내가 지금 이대로 여기 있으면, 너희 아버지는 평생 나를 안 받아 주실 거야. 그런데 내가 밖에서 뭔가 되어서 돌아오면 받아 주실까?"`,
            `랑드리는 대답하지 못했습니다.`,
            `팡셰가 말했습니다.<br>"그럼 그건 나를 받아 주시는 게 아니지."`,
            `그러고는 웃었습니다.`,
            `"그래도 갈래. 나를 위해서 가는 거야."`,
            `팡셰는 그해 겨울에 마을을 떠났습니다. 랑드리는 큰길까지 배웅했습니다. 그리고 그 뒤로 한 해 동안 소식을 듣지 못했습니다.`,
            `겨울 아침이었습니다. 길에 서리가 내려 있었습니다. 팡셰는 보따리를 하나 들고 있었습니다.`,
            `그 안에 옷 두 벌과 할머니의 약초 주머니가 들어 있었습니다. 큰길에서 두 사람은 아무 말도 하지 않았습니다. 마차가 오자 팡셰가 올라탔습니다. 그리고 그때 한 번 돌아보았습니다.`
        ]
    },
    {
        num: 12,
        title: "돌아오다",
        emoji: "🚪",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `한 해가 지난 가을, 팡셰가 돌아왔습니다. 마을 사람들이 그 사람을 알아보지 못했습니다. 옷차림이 단정했고, 몸가짐이 조용했고, 말이 또박또박했습니다.`,
            `도시의 어느 큰 집에서 병든 노부인을 돌보았다고 했습니다. 그 집에서 팡셰는 아침 여섯 시부터 밤 열 시까지 일했습니다. 그러면서 의사가 오면 옆에 서서 보고 물었습니다.`,
            `무엇을 왜 그렇게 하는지 하나하나 물었습니다. 의사는 처음에는 귀찮아했습니다. 그러다 나중에는 자기가 먼저 설명해 주었습니다.`,
            `그렇게 묻는 사람을 본 적이 없었기 때문입니다. 그 노부인이 세상을 떠나면서 팡셰에게 얼마간의 돈을 남겼습니다. 그리고 또 한 가지가 있었습니다.`,
            `파데 할머니가 남긴 것이었습니다. 할머니는 평생 아주 가난하게 살았습니다. 그런데 사실은 돈을 모아 두고 있었습니다.`,
            `약초로 병을 고쳐 준 값을 사람들이 조금씩 주었는데, 할머니는 그것을 하나도 쓰지 않고 항아리에 모았습니다. 그 돈이 사만 프랑이었습니다. 마을에서 제일 잘사는 집보다 많은 돈이었습니다.`,
            `할머니는 그것을 손녀와 손자에게 반씩 남겼습니다. 그 소식이 마을에 퍼지자 사람들의 태도가 달라졌습니다. 그전까지 팡셰를 도깨비라고 부르던 사람들이 이제는 팡셰 양이라고 불렀습니다.`,
            `팡셰는 그것을 다 보았습니다. 그리고 아무 말도 하지 않았습니다. 바르보 영감도 그 소식을 들었습니다. 그리고 마음이 흔들렸습니다.`,
            `그것을 스스로도 알았습니다. 그래서 부끄러웠습니다.`,
            `며칠 뒤 팡셰가 바르보 영감을 찾아왔습니다.`,
            `그리고 이렇게 말했습니다.<br>"어른, 제 돈 이야기를 하러 온 것이 아닙니다."<br>"그럼 무슨 이야기냐."<br>"실비네 이야기를 하러 왔습니다."`,
            `바르보 영감은 그날 밤 잠을 못 잤습니다. 실비네 이야기를 하러 왔다는 그 말이 계속 걸렸기 때문입니다. 그 아이가 돈 이야기를 하러 왔으면 오히려 마음이 편했을 것입니다.`,
            `그러면 거절할 수 있었을 테니까요.`
        ]
    },
    {
        num: 13,
        title: "실비네의 병",
        emoji: "🛏️",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `실비네는 그때 여러 달째 앓고 있었습니다. 의사가 몇 번 다녀갔지만 소용이 없었습니다.`,
            `팡셰가 말했습니다.<br>"제가 봐도 되겠습니까."`,
            `바르보 영감은 잠깐 망설였습니다. 그러다 허락했습니다. 팡셰는 그 방에 들어가 문을 닫았습니다. 그리고 사흘 동안 그 방에서 나오지 않았습니다.`,
            `방 안은 어두웠습니다. 실비네가 빛을 싫어해서 덧문을 닫아 두었기 때문입니다. 팡셰가 들어가서 제일 먼저 한 일은 덧문을 반쯤 여는 것이었습니다.`,
            `실비네가 얼굴을 돌렸습니다. 팡셰는 아무 말도 하지 않고 그 옆에 앉았습니다. 팡셰가 한 일은 약을 먹인 것이 아니었습니다.`,
            `팡셰는 실비네 옆에 앉아서 이야기를 들었습니다. 실비네는 처음에는 아무 말도 하지 않았습니다. 팡셰를 미워하고 있었기 때문입니다. 그러다 이틀째 밤에 입을 열었습니다.`,
            `그리고 자기가 열네 살 때부터 어떤 마음으로 살았는지를 다 말했습니다. 동생이 떠나던 날 집 뒤에 숨어 있었던 것. 일요일마다 동생이 돌아가는 뒷모습을 보면서 무슨 생각을 했는지.`,
            `동생이 다른 사람과 웃으면 왜 그렇게 화가 났는지. 그리고 개울가에 이틀 동안 앉아 있었던 날, 사실은 누가 찾으러 오기를 기다리고 있었다는 것. 팡셰는 그 이야기를 다 들었습니다.`,
            `그리고 이렇게 말했습니다.<br>"실비네, 나는 네가 랑드리를 사랑하는 게 잘못이라고 말하지 않을 거야."`,
            `실비네가 놀란 얼굴로 팡셰를 보았습니다.`,
            `"그런데 하나만 물어볼게. 랑드리가 너한테서 아무 데도 못 가면, 랑드리는 어떻게 되지?"`,
            `실비네는 대답하지 못했습니다.`,
            `"너는 랑드리가 아프면 대신 아파 주고 싶잖아. 그런데 지금은 랑드리가 너 때문에 아파."`,
            `실비네는 그날 밤 울었습니다. 그리고 이튿날 아침에 일어나 앉았습니다. 그리고 물을 달라고 했습니다.`,
            `팡셰가 나오자 바르보 영감이 물었습니다.<br>"무슨 약을 썼느냐."<br>"약은 안 썼습니다."<br>"그럼."<br>"그동안 아무도 저 아이한테 왜 그러는지 물어본 적이 없었습니다."`,
            `그날 이후로 실비네는 조금씩 나았습니다. 밥을 먹었고, 마당까지 걸어 나왔습니다.`,
            `그리고 어느 날 랑드리에게 이렇게 말했습니다.<br>"네가 프리슈에 간 첫날, 나는 네가 안 돌아왔으면 좋겠다고 생각한 적도 있어."<br>"왜?"<br>"그러면 내가 슬퍼해도 되니까."`,
            `랑드리는 그 말이 무슨 뜻인지 한참 뒤에 알았습니다.`
        ]
    },
    {
        num: 14,
        title: "바르보 영감",
        emoji: "🪑",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `그날 저녁 바르보 영감이 팡셰를 앉혔습니다. 그리고 한참 아무 말도 하지 않았습니다.`,
            `그러다 이렇게 물었습니다.<br>"네 어머니 이야기를 해도 되겠느냐."`,
            `팡셰가 고개를 끄덕였습니다.`,
            `"저희 어머니는 저희를 두고 떠났습니다. 그건 사실입니다."`,
            `"······."<br>"그런데 어른, 그게 제 잘못입니까?"`,
            `바르보 영감은 대답하지 못했습니다.`,
            `팡셰가 말했습니다.<br>"저는 여덟 살 때부터 그 소리를 들었습니다. 제가 무슨 짓을 한 것도 아닌데요."<br>"······."<br>"저는 어른께 제 돈 이야기를 하지 않겠습니다. 돈 때문에 저를 받아 주신다면 저는 그것도 싫습니다."`,
            `바르보 영감의 얼굴이 붉어졌습니다. 자기가 사흘 동안 그 생각을 하고 있었기 때문입니다.`,
            `팡셰가 말했습니다.<br>"그 대신 이걸 봐 주십시오."<br>그리고 이렇게 말했습니다.<br>"저는 어른 아드님을 개울에서 찾아 드렸습니다. 그리고 이번에 또 한 번 일으켜 드렸습니다. 그때마다 저는 아무것도 받지 않았습니다."<br>"그러니 저를 판단하실 거면 그걸로 판단해 주십시오."`,
            `바르보 영감은 오래 앉아 있었습니다.`,
            `그리고 이렇게 말했습니다.<br>"내가 부끄럽구나."`,
            `팡셰가 고개를 저었습니다.`,
            `"어른만 그러신 게 아닙니다. 이 마을이 다 그랬습니다."`,
            `"그래도 나는 어른이다."`,
            `바르보 영감은 그 말을 하고 나서 손을 무릎에 놓았습니다. 그 손이 조금 떨렸습니다. 그 사람은 평생 남에게 잘못했다는 말을 해 본 적이 없었습니다. 그러고는 자리에서 일어나 손을 내밀었습니다.`,
            `팡셰가 그 손을 잡았습니다.`,
            `그날 밤 바르보 영감은 아내에게 이렇게 말했습니다.<br>"우리가 그 애를 십 년 동안 도깨비라고 불렀소."<br>아내가 말했습니다.<br>"저도 그랬어요."`,
            `이튿날 바르보 영감은 마을 사람 몇을 만났습니다.`,
            `그리고 팡셰 이야기가 나오자 이렇게 말했습니다.<br>"그 아이 이야기는 나한테 하지 마시오."<br>"왜요?"<br>"내가 그 집 신세를 두 번 졌소."`,
            `그 뒤로 마을에서 그 말이 조금씩 돌았습니다. 바르보 영감은 마을에서 말이 무거운 사람이었습니다. 그래서 그 한마디가 여러 사람의 입을 다물게 했습니다.`
        ]
    },
    {
        num: 15,
        title: "그 뒤의 일",
        emoji: "🌾",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `이듬해 봄에 랑드리와 팡셰가 혼인했습니다. 마을 사람들이 다 왔습니다. 그 가운데는 팡셰를 도깨비라고 부르던 사람들도 있었습니다.`,
            `다들 아무 일도 없었던 것처럼 웃으며 왔습니다. 팡셰는 그 사람들을 다 맞았습니다.`,
            `랑드리가 나중에 물었습니다.<br>"화 안 나?"<br>"나."<br>"그런데 왜 그래?"<br>"화를 계속 내면 내가 그 사람들 손에 계속 잡혀 있는 거야."`,
            `혼인한 뒤 팡셰가 제일 먼저 한 일이 있습니다. 할머니가 남긴 돈으로 마을에 집을 하나 마련한 것입니다. 그 집에서 팡셰는 가난한 집 아이들을 돌보았습니다.`,
            `아픈 아이가 있으면 데려다 재우고, 먹이고, 나으면 돌려보냈습니다. 팡셰가 그 일을 시작한 까닭을 아는 사람은 랑드리뿐이었습니다. 팡셰는 어릴 때 아프면 아무도 봐 주는 사람이 없었습니다.`,
            `일곱 살 때 팡셰가 크게 앓은 적이 있습니다. 할머니가 밤새 약초를 달였습니다. 그런데 마을의 어느 집도 문을 열어 주지 않았습니다.`,
            `우유 한 잔을 얻으러 갔다가 그냥 돌아왔습니다. 팡셰는 그것을 기억하고 있었습니다. 실비네는 그 뒤로 나았습니다. 그런데 마을에 남지 않았습니다.`,
            `군대에 들어간 것입니다.`,
            `떠나던 날 실비네가 랑드리에게 말했습니다.<br>"나는 여기 있으면 계속 너만 보고 살 것 같아."<br>"형."<br>"괜찮아. 나도 이제 알아."`,
            `그러고는 팡셰에게 고개를 숙였습니다.<br>"고맙습니다."`,
            `실비네는 그 뒤로 편지를 자주 보냈습니다. 그리고 여러 해 뒤에는 아주 다른 사람이 되어 돌아왔습니다.`,
            `이 이야기는 여기서 끝납니다.`,
            `이 이야기를 지은 사람은 조르주 상드라는 프랑스 사람입니다. 여자였는데, 그 시절에는 여자가 글을 쓰면 잘 실어 주지 않아서 남자 이름으로 책을 냈습니다. 그 사람이 이 이야기를 왜 썼는지는 알 수 없습니다.`,
            `다만 이 이야기에서 마을 사람들이 팡셰를 어떻게 대했는지, 그리고 그 사람이 어떻게 견뎠는지를 아주 자세히 적어 놓은 것을 보면 짐작은 갑니다.`
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

    const contentHeight = () => [...col.children].reduce((h, el) =>
        h + el.getBoundingClientRect().height + parseFloat(getComputedStyle(el).marginBottom || 0), 0);

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
                ${artFrame('cover.png', '🌿')}
            </div>
            <div class="story-page-right">
                <h1>사랑의 요정</h1>
                <p class="cover-tag">조르주 상드 원작</p>
                <p>프랑스 시골 마을에서 아이들이 도깨비라고 부르며 따돌리던 소녀 팡셰가, 개울가에 숨어 있던 쌍둥이 형을 찾아 줍니다. 조건이 하나 있었습니다.</p>
                <p>남이 붙여 준 이름을 벗고 자기 손으로 자기를 다시 세우는 이야기입니다.</p>
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
    { q: "바르보 영감이 두 아들을 떼어 놓으려 한 까닭은 무엇입니까?", choices: ["서로 말고는 아무도 필요로 하지 않아서", "집안 형편이 갑자기 어려워졌기 때문에", "둘이 붙어 다니며 자꾸 다투었기 때문에"], answer: 0 },
    { q: "프리슈 농장에 간 것은 누구입니까?", choices: ["형 실비네", "작은 파데트", "동생 랑드리"], answer: 2 },
    { q: "랑드리가 자기가 가겠다고 한 진짜 까닭은 무엇입니까?", choices: ["아버지가 그러기를 바란다고 여겨서", "형이 남의 집에서 못 견딜 것을 알아서", "프리슈 농장 삯이 더 낫다고 들어서"], answer: 1 },
    { q: "마을 아이들이 팡셰를 부르던 이름은 무엇입니까?", choices: ["들판의 마녀", "작은 파데트", "개울가 아이"], answer: 1 },
    { q: "팡셰가 실비네가 있는 곳을 알아낸 방법은 무엇입니까?", choices: ["실비네가 전에 그 자리를 말한 적이 있었기 때문에", "할머니에게 배운 점치는 법을 그대로 써 봐서", "하루 종일 들에 있어서 사람 다니는 길을 다 봐서"], answer: 2 },
    { q: "실비네가 개울가에 이틀 동안 앉아 있던 까닭은 무엇입니까?", choices: ["발을 다쳐 걸을 수 없었기 때문에", "돌아갈 길을 잃어버렸기 때문에", "누가 찾으러 오기를 기다렸기 때문에"], answer: 2 },
    { q: "팡셰가 랑드리에게 요구한 것은 무엇입니까?", choices: ["축제에서 일곱 번 춤춰 달라는 것", "할머니 심부름을 도와 달라는 것", "마을 사람들 앞에서 사과하라는 것"], answer: 0 },
    { q: "팡셰가 일부러 옷을 더럽게 하고 다닌 까닭은 무엇입니까?", choices: ["들일을 하느라 옷이 성할 틈이 없어서", "곱게 하면 사람들이 어머니 이야기를 꺼내서", "할머니가 새 옷을 사 주지 않아서"], answer: 1 },
    { q: "팡셰가 달라진 것은 누구 때문입니까?", choices: ["누구 때문도 아니고 스스로 정했다", "랑드리가 그러라고 일러 주어서", "할머니가 세상을 떠나고 나서"], answer: 0 },
    { q: "실비네가 팡셰를 미워한 진짜 까닭은 무엇입니까?", choices: ["마을 소문을 그대로 믿었기 때문에", "팡셰가 자기를 놀렸기 때문에", "동생을 빼앗길까 두려웠기 때문에"], answer: 2 },
    { q: "팡셰가 마을을 떠난 까닭은 무엇입니까?", choices: ["병자 돌보는 일을 배우려고", "마을 사람들 눈을 피하려고", "할머니 고향을 찾아보려고"], answer: 0 },
    { q: "파데 할머니가 남긴 것은 무엇입니까?", choices: ["약초를 적은 두꺼운 공책", "평생 모은 사만 프랑", "개울가의 작은 밭 한 뙈기"], answer: 1 },
    { q: "팡셰가 실비네를 낫게 한 방법은 무엇입니까?", choices: ["랑드리를 불러 곁에 있게 한 것", "사흘 동안 곁에서 이야기를 들어 준 것", "할머니에게 배운 약초를 달여 먹인 것"], answer: 1 },
    { q: "팡셰가 바르보 영감에게 판단해 달라고 한 기준은 무엇입니까?", choices: ["자기가 그 집에 한 일로만 봐 달라는 것", "마을 사람들 말을 들어 보라는 것", "할머니가 남긴 돈의 액수로 봐 달라는 것"], answer: 0 },
    { q: "팡셰가 혼인한 뒤 제일 먼저 한 일은 무엇입니까?", choices: ["할머니가 살던 낡은 집을 고쳐 지었다", "마을 사람들을 불러 큰 잔치를 열었다", "가난한 집 아이들을 돌볼 집을 마련했다"], answer: 2 },
    { q: "팡셰가 자기를 놀리던 사람들에게 화를 계속 내지 않은 까닭은 무엇입니까?", choices: ["화를 계속 내면 그 사람들 손에 계속 잡혀 있어서", "랑드리가 그만두라고 여러 번 말렸기 때문에", "그 사람들이 먼저 찾아와 잘못을 빌었기 때문에"], answer: 0 }
];

// 선지를 세로로 쌓으니 한 쪽에 열여섯 문항이 다 들어가지 않는다. 몇 개씩 나눠 싣는다.
const QUIZ_PER_SPREAD = 3;
const QUIZ_GROUPS = [];
for (let i = 0; i < QUIZ.length; i += QUIZ_PER_SPREAD) {
    QUIZ_GROUPS.push({ from: i, items: QUIZ.slice(i, i + QUIZ_PER_SPREAD) });
}

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
            ${artFrame('end.png', '🌾')}
            <h2>사랑의 요정를 다 읽었습니다</h2>
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
