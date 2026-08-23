const BOOK_TITLE = "작은 아씨들";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "선물 없는 성탄절",
        emoji: "🕯️",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `"선물도 없는 성탄절이 성탄절이야?"<br>조가 난롯가 융단에 엎드린 채 말했습니다.<br>"가난한 건 정말 싫어." 메그가 자기 낡은 옷을 내려다보며 한숨을 쉬었습니다.<br>"어떤 애들은 예쁜 걸 잔뜩 가졌는데 어떤 애들은 하나도 못 갖는 건 불공평해." 에이미가 코를 훌쩍이며 덧붙였습니다.<br>"그래도 우리한테는 아버지랑 어머니랑 우리 넷이 있잖아." 베스가 구석에서 조용히 말했습니다.`,
            `그 말에 세 사람의 얼굴이 잠깐 밝아졌습니다. 그러다 조가 다시 말했습니다.<br>"아버지는 안 계시잖아. 앞으로도 한참 못 뵐 거고."`,
            `그해 미국은 전쟁 중이었습니다. 마치 씨는 군목으로 남쪽 전쟁터에 가 있었습니다. 그 집은 원래 넉넉했지만 아버지가 남을 돕다가 재산을 잃었고, 이제는 네 자매가 저마다 벌이를 해야 했습니다.`,
            `네 자매는 이렇게 생겼습니다.`,
            `맏이 메그는 열여섯 살이었습니다. 얼굴이 예뻤고 손이 고왔습니다. 다만 예쁜 것을 좋아하는 마음 때문에 자주 마음이 상했습니다.`,
            `둘째 조는 열다섯 살이었습니다. 키가 크고 마르고 팔다리가 길었으며, 긴 밤색 머리가 하나뿐인 자랑이었습니다. 여자아이답게 굴라는 말을 세상에서 제일 싫어했고, 책을 읽거나 이야기를 쓰는 일에 정신을 놓았습니다.`,
            `셋째 베스는 열세 살이었습니다. 조용하고 부끄럼이 많아 학교도 다니지 못하고 집에서 배웠습니다. 낡은 피아노를 치는 것이 가장 좋아하는 일이었습니다.`,
            `막내 에이미는 열두 살이었습니다. 금발에 파란 눈이었고, 그림을 잘 그렸으며, 어려운 말을 쓰다가 자주 틀렸습니다.`,
            `그날 저녁 어머니가 돌아왔습니다. 네 자매는 어머니를 마미라고 불렀습니다.`,
            `"오늘 아버지 편지가 왔단다." 네 자매가 어머니 둘레로 모였습니다.`,
            `편지의 끝은 이렇게 씌어 있었습니다.<br>"우리 딸들에게 사랑을 전해 주시오. 낮에는 아이들 생각을 하고 밤에는 아이들을 위해 기도하오. 일 년은 긴 시간이지만, 그동안 아이들이 부지런히 지내고 마음을 잘 다스린다면, 내가 돌아갔을 때 나는 내 작은 아씨들을 더욱 자랑스러워하게 될 거요."`,
            `읽기가 끝나자 다들 아무 말도 하지 못했습니다. 에이미가 어머니의 어깨에 얼굴을 묻고 울었습니다.`,
            `"우리 잘 지내자." 메그가 말했습니다.<br>"아버지가 돌아오셨을 때 부끄럽지 않게."`
        ]
    },
    {
        num: 2,
        title: "성탄절 아침",
        emoji: "🥣",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `성탄절 아침, 네 자매는 어머니가 준 책을 베개 밑에서 찾아냈습니다. 그것이 그해의 선물이었습니다.`,
            `아침 식탁에는 오랜만에 좋은 것이 올라왔습니다. 빵과 우유, 그리고 메밀 팬케이크였습니다.`,
            `그런데 어머니가 들어오면서 말했습니다.<br>"얘들아, 한 가지 부탁이 있단다. 저 아래 후멜 아주머니 댁에 갓난아기가 있는데, 여섯 아이가 한 침대에 누워 있더구나. 불도 없고 먹을 것도 없단다. 우리 아침을 그 집에 가져다주면 어떻겠니?"`,
            `잠깐 아무도 말을 하지 못했습니다. 다들 배가 몹시 고픈 참이었습니다.`,
            `"가져가요." 조가 먼저 일어섰습니다.<br>"제가 들게요."`,
            `네 자매는 빵과 우유와 팬케이크를 담아 눈길을 걸어 내려갔습니다.`,
            `그 집은 창이 깨져 있었고 방 안에 흰 김이 서려 있었습니다. 아이들이 한 이불 밑에 누워 서로를 안고 있었습니다.`,
            `"천사가 왔나 봐." 아이 하나가 말했습니다.`,
            `후멜 부인은 말을 잘하지 못했습니다. 다만 네 자매의 손을 하나씩 잡고 오래 놓지 않았습니다.`,
            `자매들은 불을 지피고 아이들에게 옷을 입히고 밥을 먹였습니다. 그러고는 자기들은 빈손으로 돌아왔습니다.`,
            `그날 자매들은 빵과 우유만 먹었습니다. 그런데도 그 성탄절 아침을 그들은 오래 기억했습니다.`,
            `저녁 무렵, 문을 두드리는 소리가 났습니다.`,
            `옆집 로렌스 씨의 하인이 커다란 바구니를 들고 서 있었습니다. 안에는 아이스크림과 과일과 꽃과 케이크가 들어 있었습니다.`,
            `"할아버지가 보내셨습니다. 아침에 창으로 보셨답니다."`,
            `옆집은 커다란 회색 저택이었습니다. 담쟁이가 덮여 있었고 언제나 조용했습니다. 그 집에는 늙은 로렌스 씨와 그의 손자가 산다고 했습니다.`,
            `그 집에는 온실이 있고 서재가 있고 그림이 걸려 있다고 했습니다. 다만 아이가 놀 만한 것은 하나도 없다고들 했습니다.`,
            `"저 집 아이는 왜 밖에 안 나올까." 조가 말했습니다.<br>"저 집 창가에서 우리 집을 보고 있는 걸 몇 번이나 봤는데."`,
            `그날 밤 네 자매는 그 바구니를 앞에 놓고 오래 웃었습니다.`
        ]
    },
    {
        num: 3,
        title: "옆집 소년",
        emoji: "💃",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `그해 섣달 그믐에 가디너 씨네 집에서 무도회가 열렸습니다. 메그와 조가 초대를 받았습니다.`,
            `조에게는 걱정이 하나 있었습니다. 얼마 전 난롯가에 너무 가까이 앉는 바람에 드레스 뒤가 그을렸던 것입니다.`,
            `"등을 벽에 붙이고 있으면 돼." 메그가 말했습니다.<br>"그리고 제발 손을 뒤로 하고 있지 마. 그리고 휘파람 불지 마. 그리고 팔짝팔짝 뛰지 마."`,
            `"알았어, 알았어."`,
            `무도회장에서 조는 곧 견디기 힘들어졌습니다. 그래서 사람들을 피해 커튼 뒤로 들어갔습니다.`,
            `그런데 그 안에 이미 사람이 하나 있었습니다.`,
            `키가 크지 않은 소년이었습니다. 검은 곱슬머리에 눈이 크고 검었습니다.`,
            `"어머, 여기 사람이 있는 줄 몰랐어요." 조가 말했습니다.`,
            `"신경 쓰지 마세요. 저도 피해 온 거예요."`,
            `"옆집 사시죠? 로렌스 씨 손자."<br>"네. 시어도어 로렌스입니다. 그런데 그 이름은 싫어요. 애들이 도라라고 놀려서 로리라고 부르게 했어요."`,
            `"저는 조라고 불러 주세요. 조지핀은 딱 질색이거든요."`,
            `두 사람은 곧 편해졌습니다. 로리는 어릴 때 부모를 잃고 할아버지와 살고 있었습니다. 스위스에서 학교를 다니다 돌아왔고, 지금은 가정 교사에게 배우고 있었습니다.`,
            `조는 자기가 남자아이였으면 좋겠다고 했고, 로리는 자기가 그렇게 부러운 처지가 아니라고 했습니다. 두 사람은 그 이야기로 삼십 분을 보냈습니다.`,
            `"저는 음악을 하고 싶은데 할아버지는 장사를 시키려고 하세요." 로리가 말했습니다.`,
            `그날 밤 돌아가는 길에 메그가 발목을 삐었습니다. 하이힐을 신은 탓이었습니다.`,
            `로리가 자기 집 마차를 내주었습니다.`,
            `"조, 우리 집에 놀러 오세요." 로리가 말했습니다.<br>"그 집 창문에서 우리 집이 다 보이잖아요. 우리 집은 너무 조용해요."`,
            `며칠 뒤 로리가 감기로 누워 있다는 말을 듣고 조가 찾아갔습니다.`,
            `그 집은 정말 조용했습니다. 값비싼 것들이 가득했지만 웃음소리가 나지 않았습니다.`,
            `조는 방을 정리해 주고 이야기를 해 주고 창문을 열어 주었습니다.`,
            `"이 방은 너무 좋기만 해서 병이 나는 거예요." 조가 말했습니다.<br>"우리 집은 좁고 시끄러운데 아무도 안 아파요."`,
            `그때 문이 열리고 로렌스 씨가 들어왔습니다. 눈썹이 짙고 목소리가 큰 노인이었습니다.`,
            `조는 겁이 났지만 물러서지 않았습니다.`,
            `"손자를 좀 밖으로 내보내 주세요." 조가 말했습니다.<br>"저 아이는 지금 심심해서 병이 난 거예요."`,
            `노인은 조를 한참 보다가 껄껄 웃었습니다.<br>"자네 말이 맞네."`
        ]
    },
    {
        num: 4,
        title: "저마다의 짐",
        emoji: "🧺",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `네 자매는 저마다 하는 일이 있었습니다.`,
            `메그는 킹 씨 댁에서 아이 넷을 가르쳤습니다. 그 집에는 좋은 것이 가득했습니다. 메그는 날마다 그것을 보고 집에 돌아와 자기 옷을 내려다보았습니다.`,
            `"부러워하는 게 나쁜 건 아니란다." 어머니가 말했습니다.<br>"다만 부러움이 커지면 네가 가진 걸 못 보게 되지."`,
            `조는 마치 대고모 댁에 다녔습니다. 부자였지만 성질이 사나운 노부인이었습니다. 하루 종일 책을 읽어 드리고 잔소리를 들어야 했습니다. 다만 그 집에는 커다란 서재가 있었습니다. 조는 노부인이 낮잠을 자는 동안 그 서재에서 책을 읽었습니다.`,
            `먼지 쌓인 책장 사이에 앉아 사과를 먹으며 책을 읽는 그 시간이 조에게는 하루 중 가장 좋은 때였습니다.`,
            `베스는 집에서 살림을 도왔습니다. 학교는 부끄러워서 다니지 못했습니다. 대신 낡은 피아노를 쳤습니다. 건반 몇 개는 소리가 나지 않았지만 베스는 개의치 않았습니다.`,
            `베스는 그 피아노에게도 이름을 붙여 주었고, 낡은 인형들을 버리지 않고 하나하나 고쳐 두었습니다. 남들이 버린 인형만 골라 데려왔기 때문입니다.`,
            `에이미는 학교에 다녔습니다. 그 학교에서 에이미는 자기 집이 가난한 것이 늘 부끄러웠습니다.`,
            `어느 날 에이미가 울면서 돌아왔습니다. 선생님에게 손바닥을 맞고 벌을 섰다는 것이었습니다. 절인 라임을 몰래 가지고 왔다가 들킨 것이었습니다.`,
            `"그런 학교에는 안 보내겠다." 어머니가 말했습니다.<br>"다만 에이미, 너도 배울 것이 있다. 남들이 가진 것을 부러워하는 마음 말이다."`,
            `그해 봄, 네 자매는 어머니에게 한 가지를 배웠습니다. 일주일 동안 아무 일도 하지 말고 놀아 보라는 것이었습니다.`,
            `첫날은 좋았습니다. 사흘째부터는 지루해졌습니다. 엿새째 되던 날 부엌에 먹을 것이 없었고, 베스의 카나리아가 물을 못 먹어 죽었습니다.`,
            `일곱째 날 저녁, 자매들은 아무 말도 하지 못했습니다.`,
            `"일이 없으면 좋을 것 같지." 어머니가 말했습니다.<br>"그런데 사람은 할 일이 있어야 마음이 편하단다. 놀이도 일이 있어야 재미있는 거고."`,
            `그해 여름 로리가 소풍을 마련했습니다. 영국에서 온 손님들과 함께 강가에서 하루를 보냈습니다.`,
            `그날 로리의 가정 교사 브룩 씨도 왔습니다. 조용하고 성실한 젊은이였습니다. 그는 메그와 오래 이야기했습니다.`,
            `조는 그것을 눈여겨보았습니다. 그리고 마음이 좋지 않았습니다.`
        ]
    },
    {
        num: 5,
        title: "타 버린 원고",
        emoji: "🔥",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `조에게는 아무에게도 보여 주지 않은 것이 하나 있었습니다.`,
            `다락방에서 몇 해에 걸쳐 쓴 이야기 묶음이었습니다. 여섯 편이 들어 있었고, 조는 그것을 언젠가 책으로 낼 생각이었습니다.`,
            `어느 날 메그와 조가 로리와 함께 연극을 보러 가기로 했습니다. 에이미가 자기도 가겠다고 했습니다.`,
            `"안 돼. 표가 세 장뿐이야." 조가 말했습니다.<br>"나도 갈래!"<br>"안 된다니까."`,
            `에이미는 문 앞까지 따라 나와 소리쳤습니다.<br>"언니, 후회할 거야!"`,
            `저녁에 돌아와 보니 다락방의 서랍이 열려 있었습니다.`,
            `조는 온 집을 뒤졌습니다. 그러다 에이미의 얼굴을 보고 알았습니다.`,
            `"어디 있어."<br>"태웠어." 에이미가 말했습니다.<br>"난롯불에."`,
            `조는 에이미의 어깨를 붙잡고 흔들었습니다.`,
            `"그건 사 년 동안 쓴 거야! 다시는 못 써!"`,
            `에이미는 그제야 자기가 무슨 짓을 했는지 알았습니다. 울면서 잘못했다고 했지만 조는 듣지 않았습니다.`,
            `그날 밤 어머니가 조에게 말했습니다.<br>"오늘은 화가 난 채로 자지 말아라."<br>"용서 못 해요." 조가 말했습니다.`,
            `이튿날 아침, 조는 로리와 강으로 스케이트를 타러 갔습니다. 에이미가 스케이트를 들고 뒤따라왔습니다.`,
            `조는 뒤를 돌아보지 않았습니다.`,
            `로리가 앞서 가며 소리쳤습니다.<br>"가운데는 얼음이 얇아! 가장자리로 와!"`,
            `조는 그 말을 들었습니다. 그런데 뒤에 있는 에이미는 못 들었을지도 모른다는 생각이 스쳤습니다.`,
            `조는 그 생각을 밀어냈습니다. 알아서 하겠지, 하고요.`,
            `그 순간 뒤에서 얼음이 갈라지는 소리와 비명이 났습니다.`,
            `그 소리는 아주 짧았습니다. 조는 나중에 그 소리를 여러 번 다시 들었습니다. 잠들기 전마다요.`,
            `조가 돌아보았을 때 에이미는 이미 물속에 있었습니다. 로리가 달려와 두 사람이 함께 에이미를 끌어냈습니다.`,
            `그날 밤 에이미가 잠든 뒤, 조는 어머니 옆에 앉았습니다.`,
            `"제 성질 때문에 동생이 죽을 뻔했어요."<br>"나도 그랬단다." 어머니가 말했습니다.<br>"어머니가요?"`,
            `"나는 사십 년 동안 화를 다스리는 법을 배우고 있단다. 아직도 다 못 배웠어. 다만 이제는 화가 난 걸 남이 모르게 할 수는 있게 되었지."`,
            `조는 어머니를 올려다보았습니다. 어머니가 화를 내는 것을 조는 한 번도 본 적이 없었습니다.`
        ]
    },
    {
        num: 6,
        title: "베스의 피아노",
        emoji: "🎹",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `베스는 옆집 로렌스 씨를 무서워했습니다. 목소리가 크고 눈썹이 짙었기 때문입니다.`,
            `그런데 그 집에는 훌륭한 피아노가 있었습니다. 어느 날 로렌스 씨가 자매들의 집에 들렀다가, 어머니에게 들으라는 듯이 큰 소리로 말했습니다.<br>"우리 집 피아노가 요즘 소리가 죽습니다.`,
            `아무도 안 치니까요. 누가 와서 좀 쳐 주면 좋겠는데. 아무 때나 와서 치기만 하고 가면 됩니다. 인사도 필요 없고 말 붙일 것도 없고요."`,
            `그러고는 베스 쪽은 보지도 않고 나갔습니다.`,
            `베스는 어머니의 소매를 붙잡았습니다.<br>"어머니, 저 말은······."<br>"너에게 하신 말이지."`,
            `이튿날부터 베스는 그 집에 다녔습니다.`,
            `처음에는 뒷문으로 들어가 아무도 없는 것을 확인하고 피아노 앞에 앉았습니다. 로렌스 씨는 정말로 나타나지 않았습니다.`,
            `다만 피아노 위에 새 악보가 자꾸 놓였습니다. 베스는 여러 주 만에 처음으로 그 집 문을 두드렸습니다.`,
            `"고맙습니다." 베스가 말했습니다. 그러고는 얼굴이 새빨개져 도망쳤습니다.`,
            `로렌스 씨는 문간에 서서 그 뒷모습을 보았습니다. 그러고는 한참 동안 그 자리에 있었습니다. 그의 딸이 어릴 때 그 피아노를 쳤습니다.`,
            `베스는 몇 주 동안 슬리퍼를 하나 만들었습니다. 밤늦게까지 수를 놓아 만든 것이었습니다. 그리고 그것을 로렌스 씨의 서재에 놓고 왔습니다.`,
            `이튿날 오후, 커다란 짐이 왔습니다.`,
            `그것은 피아노였습니다. 작지만 아주 좋은 것이었습니다.`,
            `쪽지에는 이렇게 씌어 있었습니다.<br>"아가씨. 나는 슬리퍼를 여러 켤레 가지고 있었지만 이렇게 잘 맞는 것은 처음이오. 답례로 이것을 보내오. 늙은 사람의 고집이라 여기고 받아 주시오. 제임스 로렌스."`,
            `베스는 그 자리에서 자기가 무엇을 해야 하는지 알았습니다. 자매들이 말릴 새도 없이 베스는 옆집으로 달려갔습니다. 서재 문을 열고 들어가, 놀라서 돌아보는 노인의 목을 끌어안았습니다.`,
            `그날부터 로렌스 씨는 그 집에서 베스를 가장 아꼈습니다.`,
            `두 사람은 말을 많이 하지 않았습니다. 베스가 피아노를 치는 동안 노인이 문 밖 의자에 앉아 있는 것이 전부였습니다. 그것으로 충분했습니다.`
        ]
    },
    {
        num: 7,
        title: "전보",
        emoji: "✂️",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `그해 십일월 어느 어두운 오후, 전보 한 장이 왔습니다.`,
            `"마치 부인. 남편 위독. 즉시 오시오. 워싱턴 블랭크 병원."`,
            `방 안이 조용해졌습니다.`,
            `어머니는 곧바로 채비를 했습니다. 밤 기차를 타야 했습니다.`,
            `"돈이 있어야 하는데." 어머니가 말했습니다.<br>"마치 대고모께 가서 부탁드려야겠구나."`,
            `조가 말없이 밖으로 나갔습니다.`,
            `저녁에 조가 돌아와 어머니 앞에 지폐 뭉치를 내놓았습니다. 이십오 달러였습니다.`,
            `"이게 어디서 났니?" 조는 모자를 벗었습니다.`,
            `자매들이 비명을 질렀습니다. 조의 긴 밤색 머리가 없어져 있었습니다. 목덜미 위로 짧게 잘려 있었습니다.`,
            `"조! 네 머리!"<br>"팔았어." 조가 말했습니다.<br>"괜찮아. 다시 자랄 거야."`,
            `"조지핀······." 어머니가 말했습니다.`,
            `"아버지를 위한 일인데요." 조가 씩씩하게 말했습니다.<br>"그리고 저는 원래 이 머리가 무거웠어요."`,
            `그날 밤 메그가 잠에서 깨어 보니 조가 이불 속에서 울고 있었습니다.`,
            `"조, 머리 때문에 그러니?"<br>"아니야." 조가 말했습니다.<br>"······응, 조금은."`,
            `어머니는 그날 밤 워싱턴으로 떠났습니다. 브룩 씨가 함께 갔습니다.`,
            `그때부터 네 자매만 남았습니다.`,
            `처음 며칠은 잘 지냈습니다. 다들 자기 몫을 하려고 애썼습니다.`,
            `그런데 몇 주가 지나자 조금씩 느슨해졌습니다.`,
            `그 무렵 베스가 말했습니다.<br>"후멜 아주머니 댁 아기가 아픈데 아무도 안 가 봤어."`,
            `"내일 갈게." 조가 말했습니다. 그러나 그날 조는 원고를 쓰느라 잊었습니다.`,
            `메그도 잊었습니다. 에이미는 무섭다고 했습니다.`,
            `베스는 아무도 나무라지 않았습니다. 다만 숄을 두르고 혼자 나갔습니다. 그것이 베스가 늘 하던 방식이었습니다.`,
            `그래서 베스가 혼자 갔습니다. 며칠 동안 날마다 갔습니다.`
        ]
    },
    {
        num: 8,
        title: "베스가 앓다",
        emoji: "🌡️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `어느 날 베스가 돌아와 조용히 앉아 있었습니다.`,
            `"베스, 왜 그래?"<br>"그 집 아기가 오늘 아침에 갔어." 베스가 말했습니다.<br>"제 무릎 위에서."`,
            `"의사 선생님은 뭐라셨어?"<br>"성홍열이라고 하셨어."`,
            `메그가 벌떡 일어섰습니다.<br>"베스, 너 그 병 앓은 적 없잖아!"`,
            `사흘 뒤 베스가 열이 올랐습니다.`,
            `의사가 왔습니다. 그리고 성홍열이라고 했습니다.`,
            `에이미는 아직 그 병을 앓은 적이 없었기 때문에 마치 대고모 댁으로 보내졌습니다. 에이미는 가지 않겠다고 울었지만 어쩔 수 없었습니다.`,
            `어머니에게는 알리지 않기로 했습니다. 아버지도 위독한 참이었기 때문입니다.`,
            `조와 메그가 밤낮으로 베스를 돌보았습니다.`,
            `둘은 번갈아 잤습니다. 메그가 낮을 맡고 조가 밤을 맡았습니다. 낮보다 밤이 길었습니다.`,
            `열은 내리지 않았습니다. 베스는 자기가 어디 있는지도 모르게 되었습니다. 언니들을 알아보지 못하고 낯선 이름을 불렀습니다.`,
            `조는 베스의 손을 잡고 밤을 새웠습니다.`,
            `그동안 조는 처음으로 알았습니다. 자기가 베스를 얼마나 사랑하는지, 그리고 베스가 이 집에서 무엇이었는지를요.`,
            `베스는 아무것도 요구한 적이 없었습니다. 그래서 다들 베스가 거기 있다는 것을 잊고 살았습니다.`,
            `열이틀째 되던 날, 의사가 말했습니다.<br>"어머니를 부르시는 게 좋겠습니다."`,
            `로리가 그 말을 듣고 이미 전보를 쳐 두었다고 말했습니다.<br>"내가 어제 쳤어." 로리가 말했습니다.<br>"그러지 말았어야 했으면 나를 혼내."`,
            `조는 로리를 끌어안았습니다.`,
            `그날 밤이 고비였습니다. 새벽 두 시가 지나자 베스의 얼굴에서 붉은 기가 가시고 숨이 고르게 바뀌었습니다.`,
            `의사가 말했습니다.<br>"넘겼습니다."`,
            `조는 그 말을 듣고 아무 대답도 하지 못했습니다. 그리고 부엌으로 내려가 아무도 없는 데서 한참을 서 있었습니다.`,
            `새벽에 문이 열리고 어머니가 들어왔습니다. 두 언니는 그때야 울었습니다.`
        ]
    },
    {
        num: 9,
        title: "돌아온 사람들",
        emoji: "🎄",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `그해 성탄절 아침, 베스는 처음으로 자리에서 일어나 앉았습니다.`,
            `창밖에는 눈이 쌓여 있었고, 로리가 밤새 만들어 놓은 커다란 눈사람이 서 있었습니다. 눈사람은 한 손에 꽃바구니를 들고 다른 손에 악보를 들고 있었습니다.`,
            `목에는 붉은 목도리를 둘렀고 입에는 종이 나팔을 물렸습니다. 베스는 그것을 보고 오랜만에 소리 내어 웃었습니다.`,
            `그날 오후, 마차 소리가 났습니다.`,
            `문이 열리고 브룩 씨가 들어왔습니다. 그리고 그 뒤에서 마치 씨가 들어왔습니다.`,
            `아버지는 아주 여위었고 지팡이를 짚고 있었습니다. 그러나 웃고 있었습니다.`,
            `네 자매가 한꺼번에 달려들었습니다. 아버지는 딸들을 하나씩 보았습니다.`,
            `"메그, 손이 거칠어졌구나. 그런데 나는 이 손이 예전 손보다 좋구나."`,
            `"조는······." 아버지가 웃었습니다.<br>"머리가 짧아졌구나. 그런데 그것보다, 조가 아주 조용해졌구나. 목소리가 낮아지고 앉는 자세가 달라졌어. 나는 우리 아들 같던 조가 조금 그립기도 하다만, 이 조가 더 자랑스럽다."`,
            `"에이미는 이제 언니들 몫을 챙기는구나."`,
            `에이미는 그 말에 얼굴이 빨개졌습니다. 대고모 댁에서 지내는 동안 배운 것이 있었기 때문입니다. 남의 집에서는 아무도 자기 몫을 챙겨 주지 않는다는 것이었습니다.`,
            `그리고 베스 앞에 앉았습니다. 아버지는 아무 말도 하지 않고 베스의 손을 오래 잡고 있었습니다.`,
            `그날 저녁 식탁에는 오랜만에 모두가 모였습니다. 저녁을 먹고 나서 브룩 씨가 메그에게 무언가를 말했습니다. 조는 그 뒤로 며칠 동안 기분이 좋지 않았습니다.`,
            `"메그가 결혼하면 우리 집이 부서지는 거야." 조가 어머니에게 말했습니다.<br>"부서지는 게 아니라 늘어나는 거란다."`,
            `"저는 언니가 그냥 우리랑 있으면 좋겠어요."<br>"조." 어머니가 말했습니다.<br>"사람은 자기 길을 가야 한단다. 그것이 네 길과 다르더라도 말이야."`,
            `이듬해 여름, 메그와 브룩 씨의 약혼이 정해졌습니다. 결혼은 삼 년 뒤에 하기로 했습니다.`,
            `브룩 씨는 가진 것이 없었습니다. 그래서 삼 년 동안 집을 마련하기로 한 것입니다. 마치 대고모는 그 혼사를 반대하며 재산을 한 푼도 주지 않겠다고 했습니다. 메그는 그래도 좋다고 했습니다.`
        ]
    },
    {
        num: 10,
        title: "메그의 결혼",
        emoji: "💐",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `삼 년이 지났습니다. 메그는 스무 살이 되었고, 조는 열아홉, 베스는 열일곱, 에이미는 열여섯이 되었습니다.`,
            `조는 그동안 이야기를 써서 신문에 팔기 시작했습니다. 처음 원고료를 받은 날, 조는 그 돈으로 베스와 어머니를 바닷가에 보냈습니다.`,
            `베스는 몸이 예전 같지 않았습니다. 성홍열을 앓은 뒤로 쉽게 지쳤습니다. 계단을 오르면 한참을 앉아 있어야 했습니다.`,
            `에이미는 그림을 배우고 있었습니다. 마치 대고모가 에이미를 마음에 들어 해서, 여러 곳에 데리고 다녔습니다.`,
            `에이미는 그동안 많이 달라졌습니다. 예쁜 것을 여전히 좋아했지만, 이제는 그것 때문에 남을 부러워하지는 않았습니다.`,
            `유월의 어느 날 아침, 메그의 결혼식이 있었습니다.`,
            `화려한 결혼식이 아니었습니다. 메그는 자기가 지은 흰 옷을 입었고, 조와 베스와 에이미가 들러리를 섰습니다. 로리가 마당에 꽃을 엮어 아치를 만들었습니다.`,
            `아침에 메그가 부엌에서 팬케이크를 뒤집는 것을 보고 자매들이 웃었습니다.<br>"오늘 아침까지 하는 거야?"<br>"오늘 아침이니까 하는 거야." 메그가 말했습니다.`,
            `식이 끝나고 메그는 남편과 함께 작은 집으로 갔습니다. 브룩 씨가 마련한 집이었는데, 방이 셋뿐이었습니다.`,
            `메그는 그 집에 자기 손으로 만든 것들을 들여놓았습니다. 킹 씨 댁에서 보던 것에 견줄 만한 것은 하나도 없었습니다. 그래도 메그는 그 집이 좋았습니다.`,
            `자매들이 돌아온 뒤, 조는 다락방으로 올라갔습니다. 그리고 창가에 앉아 오래 있었습니다. 로리가 올라왔습니다.`,
            `"조, 왜 여기 있어?"<br>"아무것도 아니야."`,
            `"섭섭하지."<br>"응." 조가 말했습니다.<br>"우리 넷은 언제까지나 넷일 줄 알았거든."`,
            `로리가 창턱에 걸터앉았습니다.`,
            `"조." 그가 말했습니다.<br>"우리는 안 변할 거야. 나는 어디에도 안 가."`,
            `조는 대답하지 않았습니다. 그때 이미 조는 무언가를 눈치채고 있었습니다.`
        ]
    },
    {
        num: 11,
        title: "조가 한 대답",
        emoji: "🍂",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `그해 가을, 로리가 대학을 마쳤습니다.`,
            `그 무렵부터 로리는 조를 볼 때마다 이상해졌습니다. 말이 줄었고, 조가 다른 이야기를 하면 듣지 않았습니다.`,
            `조는 그것을 알고 로리를 피했습니다. 그러나 피할 수 없는 날이 왔습니다.`,
            `낙엽이 쌓인 언덕에서 로리가 말했습니다.<br>"조, 너도 알잖아. 나는 열다섯 살 때부터 너를 좋아했어."`,
            `조는 오래 아무 말도 하지 못했습니다.`,
            `"로리." 마침내 조가 말했습니다.<br>"나는 너를 아주 좋아해. 세상 누구보다 좋아해. 그런데 그건 그 좋아함이 아니야."`,
            `"왜 안 되는데."<br>"우리는 둘 다 성질이 급해. 너도 나도 하고 싶은 말은 다 하고. 그렇게 사는 두 사람이 한집에 있으면 서로를 못 견딜 거야." 조가 말했습니다.<br>"그리고 나는 결혼이 나에게 맞는지 아직 모르겠어. 나는 글을 쓰고 싶어."`,
            `"나는 기다릴 수 있어."<br>"기다려도 안 바뀔 거야. 그건 너한테 더 못할 짓이야."`,
            `로리는 발로 낙엽을 찼습니다.`,
            `"그럼 나는 어떡해."<br>"너는 나보다 훨씬 좋은 사람을 만날 거야." 조가 말했습니다.<br>"그게 나는 아니야."`,
            `로리는 그날 저녁 집을 떠나 할아버지와 함께 유럽으로 갔습니다. 조는 그 뒤로 며칠 동안 아무것도 쓰지 못했습니다.`,
            `로리가 떠난 뒤 조는 그 언덕에 몇 번 올라갔습니다. 그리고 자기가 옳은 말을 했는데도 왜 이렇게 마음이 안 좋은지 생각했습니다.`,
            `"어머니, 제가 잘못한 걸까요?"<br>"아니다." 어머니가 말했습니다.<br>"좋아하지 않는 마음으로 그러겠다고 하는 것이 훨씬 나쁜 일이야."`,
            `"그런데 왜 이렇게 마음이 안 좋죠."<br>"옳은 일을 해도 마음이 안 좋을 때가 있단다."`,
            `이듬해 봄, 조는 뉴욕으로 갔습니다. 하숙집에서 아이들을 가르치며 글을 쓰기로 한 것입니다.`,
            `그 하숙집에 베어라는 독일 사람이 살고 있었습니다. 마흔 살쯤 되었고, 옷차림이 허름했고, 손이 컸습니다. 가난한 아이들을 무료로 가르치고 있었습니다.`,
            `그는 조가 쓴 글을 읽고 이렇게 말했습니다.<br>"이건 잘 팔리는 글이오. 그런데 이건 당신이 정말 쓰고 싶은 글이오?"`,
            `조는 화가 나서 사흘 동안 말을 하지 않았습니다. 그러다 자기가 쓴 것을 다시 읽어 보고, 그것을 난로에 넣었습니다.`,
            `"왜 태웠소." 베어 교수가 물었습니다.<br>"부끄러워서요." 조가 말했습니다.<br>"부끄러운 줄 아는 사람은 더 좋은 걸 쓰게 되오."`
        ]
    },
    {
        num: 12,
        title: "베스가 알고 있던 것",
        emoji: "🌊",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `그해 봄, 조는 집으로 돌아왔습니다. 베스는 더 여위어 있었습니다.`,
            `두 자매는 바닷가에 함께 갔습니다. 베스가 바람을 쐬면 나을지도 모른다고 했기 때문입니다.`,
            `어느 날 오후, 두 사람은 모래 위에 앉아 있었습니다.`,
            `"조 언니." 베스가 말했습니다.<br>"언니는 알고 있지?"`,
            `조는 대답하지 못했습니다.`,
            `"나는 오래전부터 알고 있었어." 베스가 말했습니다.<br>"그러니까 이제 그만 아닌 척해도 돼."`,
            `"베스."<br>"나는 무섭지 않아." 베스가 말했습니다.<br>"언니들은 다 어딘가로 가잖아. 메그 언니는 결혼했고, 언니는 글을 쓰고, 에이미는 그림을 그리고. 나는 갈 데가 없었어. 나는 원래 집에 있는 사람이었으니까."<br>"그런 말 하지 마."<br>"나는 슬프지 않아. 다만 언니들을 두고 가는 게 걸려." 베스가 말했습니다.<br>"언니가 제일 걱정돼. 언니는 나를 제일 아꼈으니까."`,
            `조는 모래에 얼굴을 묻었습니다. 그해 겨울 베스는 자기 방에서 지냈습니다.`,
            `조가 곁에 있었습니다. 낮에는 베스에게 책을 읽어 주고, 밤에는 그 방에서 잤습니다.`,
            `베스는 마지막까지 바느질을 했습니다. 창밖으로 지나가는 학교 아이들에게 주려고 장갑과 손수건을 만든 것이었습니다.`,
            `"내가 할 수 있는 게 이것뿐이야." 베스가 말했습니다.`,
            `봄이 오기 전 어느 새벽, 베스는 조용히 갔습니다. 조가 손을 잡고 있었습니다. 그 집에서 가장 조용했던 사람이 없어지자, 집은 견딜 수 없이 조용해졌습니다.`,
            `아침에 아무도 피아노를 치지 않았습니다. 저녁에 아무도 인형을 고치지 않았습니다. 집안일은 그대로 돌아갔지만 무언가가 빠져 있었습니다.`,
            `여러 주가 지난 뒤 어머니가 조에게 말했습니다.<br>"조, 이제 다시 쓰렴."`,
            `"쓸 게 없어요."<br>"있을 거야." 어머니가 말했습니다.<br>"베스 이야기를 쓰렴."`
        ]
    },
    {
        num: 13,
        title: "다락방의 원고",
        emoji: "🖋️",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `조는 다락방으로 올라갔습니다. 그리고 오랫동안 쓰지 않던 책상 앞에 앉았습니다.`,
            `조는 이번에는 팔릴 이야기를 쓰지 않았습니다. 자기가 아는 것을 썼습니다. 네 자매가 사는 낡은 집, 선물 없는 성탄절, 다락방, 낡은 피아노, 그리고 조용했던 셋째.`,
            `쓰는 데 여러 달이 걸렸습니다.`,
            `쓰다가 몇 번이나 그만두었습니다. 베스 이야기를 쓰는 대목에서는 하루에 한 줄도 못 나가는 날이 있었습니다.`,
            `다 쓰고 나서 조는 그것을 신문사에 보냈습니다. 큰 기대는 하지 않았습니다.`,
            `그런데 그 이야기는 실렸고, 사람들이 편지를 보내오기 시작했습니다.`,
            `모르는 사람들이 이렇게 썼습니다. 우리 집 이야기 같다고요.`,
            `어떤 편지에는 이렇게 적혀 있었습니다. 저희 집에도 조용한 아이가 하나 있는데, 이 글을 읽고 나서 그 아이를 다시 보게 되었다고요.`,
            `조는 그 편지들을 읽고 알았습니다. 자기가 무엇을 써야 하는 사람인지를요.`,
            `조는 그 편지들을 상자에 모아 두었습니다. 그리고 글이 안 써지는 날이면 그 상자를 열어 보았습니다.`,
            `한편 에이미는 유럽에 있었습니다. 에이미는 그곳에서 그림을 배우다가 자기가 아주 뛰어난 화가는 되지 못하리라는 것을 알게 되었습니다.`,
            `"어중간하게 되느니 안 하는 게 나아요." 에이미가 편지에 썼습니다. 그곳에서 에이미는 로리를 만났습니다.`,
            `로리는 그동안 유럽을 떠돌며 아무것도 하지 않고 있었습니다. 에이미가 그것을 보고 정면으로 말했습니다.`,
            `"오빠는 지금 아무것도 안 하고 있잖아요. 실연했다고 놀고 있는 사람은 처음 봐요."`,
            `로리는 그 말에 화를 냈다가, 며칠 뒤 다시 찾아와 말했습니다.<br>"네 말이 맞았다."`,
            `그날부터 로리는 할아버지의 일을 배우기 시작했습니다. 음악은 취미로 남겨 두기로 했습니다. 자기가 그렇게 뛰어난 음악가는 못 된다는 것을 스스로 알아차린 것입니다.`,
            `베스가 세상을 떠났다는 소식이 왔을 때, 두 사람은 함께 그 소식을 들었습니다. 그해 가을 두 사람은 결혼해서 돌아왔습니다.`,
            `조는 그 소식을 듣고 놀랐습니다. 그러나 곧 웃었습니다.`,
            `"로리한테는 에이미가 훨씬 나아." 조가 말했습니다.<br>"나는 로리를 이겨 먹으려고만 했을 텐데."`
        ]
    },
    {
        num: 14,
        title: "우산 아래에서",
        emoji: "☔",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `그해 십일월, 조는 이상하게 마음이 허전했습니다. 메그는 남편과 아이들이 있었고, 에이미는 로리와 함께였고, 베스는 없었습니다. 조는 다락방에서 혼자 글을 썼습니다.`,
            `그러던 어느 날, 문 앞에 낯익은 사람이 서 있었습니다.`,
            `베어 교수였습니다. 뉴욕에서 온 것이었습니다.`,
            `"근처에 볼일이 있어서 왔소." 그가 말했습니다.`,
            `그는 그 뒤로 두 주 동안 날마다 왔습니다. 볼일은 아무래도 아주 많은 모양이었습니다.`,
            `그는 올 때마다 무언가를 고쳐 주고 갔습니다. 삐걱거리는 문, 흔들리는 의자, 아이들의 장난감. 어머니는 그것을 보고 아무 말도 하지 않았습니다.`,
            `자매들은 다 알아차렸는데 조만 몰랐습니다.`,
            `"조, 너 정말 모르니?" 메그가 물었습니다.<br>"뭘?"<br>메그는 대답하지 않고 웃기만 했습니다.`,
            `어느 날 저녁, 베어 교수가 이제 서쪽으로 떠나야 한다고 말했습니다. 조는 그날 밤 잠을 못 잤습니다.`,
            `이튿날 조는 우산도 없이 밖으로 나갔습니다. 비가 오는 날이었습니다.`,
            `거리에서 조는 그를 만났습니다. 그도 우산을 하나만 들고 있었습니다.`,
            `두 사람은 그 우산 아래에서 한참을 걸었습니다.`,
            `"조." 그가 말했습니다.<br>"나는 가진 것이 없소. 이 낡은 우산 하나뿐이오. 그리고 나이도 많고."`,
            `"저도 가진 게 없어요." 조가 말했습니다.<br>"그리고 성질도 급하고 글씨도 엉망이고요."`,
            `"그럼 우리 둘이 합치면 무엇이 되겠소."<br>"아무것도 안 되겠죠." 조가 말했습니다.<br>"그래도 저는 좋아요."`,
            `두 사람은 빗속에서 웃었습니다.`,
            `집으로 돌아왔을 때 두 사람은 흠뻑 젖어 있었습니다. 자매들은 그 얼굴을 보고 무슨 일이 있었는지 바로 알았습니다.`
        ]
    },
    {
        num: 15,
        title: "플럼필드",
        emoji: "🏫",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `그 무렵 마치 대고모가 세상을 떠나면서 조에게 플럼필드라는 낡은 저택을 남겼습니다.`,
            `방이 많고 마당이 넓은 집이었습니다. 조가 어릴 때 놀러 갈 때마다 무서워하던 집이기도 했습니다.`,
            `"이 집을 팔면 큰돈이 될 텐데." 사람들이 말했습니다. 조는 팔지 않았습니다.`,
            `"저는 이 집에서 무서웠던 기억밖에 없어요." 조가 말했습니다.<br>"그러니까 이 집이 다른 집이 되는 걸 보고 싶어요."`,
            `조와 베어 교수는 그 집을 학교로 만들었습니다. 갈 데 없는 남자아이들을 데려다 먹이고 가르치는 학교였습니다.`,
            `몇 해 지나지 않아 그 집에는 아이가 열둘이 되었습니다. 부잣집 아이도 있었고 한 푼도 못 내는 아이도 있었습니다. 조는 둘을 똑같이 대했습니다.`,
            `말썽꾸러기일수록 조가 잘 봤습니다. 자기가 그런 아이였기 때문입니다.<br>"저 애는 못 고쳐요." 누가 그렇게 말하면 조는 이렇게 대답했습니다.<br>"저도 그랬어요."`,
            `마당에서는 하루 종일 소리가 났습니다. 조는 그 소리가 좋았습니다.`,
            `로리는 그 학교에 돈을 댔고, 에이미는 아이들에게 그림을 가르쳤습니다. 메그의 아이들도 그곳에서 놀았습니다.`,
            `해마다 시월이면 어머니의 생일에 온 식구가 그 집에 모였습니다. 메그가 아이들을 데리고 왔고, 에이미와 로리가 왔고, 아버지와 어머니가 왔습니다.`,
            `사과나무 아래에 상을 차렸습니다. 아이들이 사과를 따서 던지며 놀았습니다.`,
            `메그의 아이들이 가장 어렸고, 학교 아이들이 그 아이들을 목말 태우고 다녔습니다. 에이미는 그 광경을 그렸습니다.`,
            `어느 해 그 자리에서 어머니가 말했습니다.<br>"오늘보다 좋은 날은 없을 것 같구나."`,
            `조는 사과나무에 기대어 마당을 보았습니다.`,
            `열다섯 살에 조는 이 세상 어딘가로 나가 큰 사람이 되겠다고 생각했습니다. 그때 조가 그린 자기 모습은 이런 것이 아니었습니다.`,
            `그러나 조는 지금이 더 좋았습니다.`,
            `열다섯 살의 조는 유명해지고 싶었습니다. 지금의 조도 글을 씁니다. 다만 이제는 무엇을 위해 쓰는지를 알고 있었습니다.`,
            `"베스가 있었으면 좋았을 텐데." 메그가 말했습니다.`,
            `"있어." 조가 말했습니다.<br>"저 안에 있어."`,
            `집 안에서 누군가 낡은 피아노를 치고 있었습니다. 학교 아이 중 하나였습니다. 서툴렀지만 끝까지 쳤습니다.`
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
                ${artFrame('cover.png', '🕯️')}
            </div>
            <div class="story-page-right">
                <h1>작은 아씨들</h1>
                <p class="cover-tag">루이자 메이 올컷 원작</p>
                <p>아버지가 전쟁터에 가 있는 동안, 메그와 조와 베스와 에이미 네 자매가 어머니와 함께 살아갑니다. 선물 하나 없는 성탄절 아침에 시작하는 이야기입니다.</p>
                <p>네 자매가 자라서 저마다 다른 길로 가기까지, 그 집에서 있었던 일을 담았습니다.</p>
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
    { q: "네 자매의 아버지는 어디에 계셨습니까?", choices: ["다른 도시", "전쟁터", "먼 바다"], answer: 1 },
    { q: "성탄절 아침에 네 자매가 한 일은 무엇입니까?", choices: ["연극을 꾸며 올렸다", "선물을 서로 바꿨다", "아침밥을 이웃에게 주었다"], answer: 2 },
    { q: "조가 무도회에서 커튼 뒤에서 만난 사람은 누구입니까?", choices: ["로렌스 씨", "베어 교수", "옆집 로리"], answer: 2 },
    { q: "조가 마치 대고모 댁에서 가장 좋아한 것은 무엇입니까?", choices: ["책이 가득한 서재", "정원의 큰 나무", "대고모의 앵무새"], answer: 0 },
    { q: "에이미가 화가 나서 태운 것은 무엇입니까?", choices: ["메그가 받은 편지", "베스가 만든 인형", "조가 오래 쓴 원고"], answer: 2 },
    { q: "얼음이 깨졌을 때 물에 빠진 사람은 누구입니까?", choices: ["조", "로리", "에이미"], answer: 2 },
    { q: "로렌스 씨가 베스에게 보낸 것은 무엇입니까?", choices: ["집에 있던 피아노", "고양이 한 마리", "겨울에 쓸 땔감"], answer: 0 },
    { q: "조가 어머니의 여비를 마련한 방법은 무엇입니까?", choices: ["머리를 잘라 팔았다", "대고모에게 빌렸다", "글을 써서 벌었다"], answer: 0 },
    { q: "베스가 병에 걸린 까닭은 무엇입니까?", choices: ["몸이 본디 약했기 때문에", "아픈 이웃집을 돌봤기 때문에", "겨울에 얇게 입고 다녀서"], answer: 1 },
    { q: "조가 로리의 고백에 어떻게 대답했습니까?", choices: ["받아들이지 않았다", "기다려 달라고 했다", "그러겠다고 했다"], answer: 0 },
    { q: "뉴욕에서 만난 베어 교수가 조에게 한 말은 무엇입니까?", choices: ["정말 쓰고 싶은 글이냐고 물었다", "글은 그만두는 게 좋다고 했다", "글솜씨가 아주 좋다고 칭찬했다"], answer: 0 },
    { q: "베스가 마지막까지 한 일은 무엇입니까?", choices: ["피아노를 날마다 쳤다", "아이들에게 줄 것을 만들었다", "언니들에게 편지를 썼다"], answer: 1 },
    { q: "어머니가 조에게 다시 쓰라며 권한 것은 무엇입니까?", choices: ["아버지의 전쟁 이야기", "베스에 대한 이야기", "네 자매의 어린 시절"], answer: 1 },
    { q: "유럽에서 로리와 결혼한 사람은 누구입니까?", choices: ["에이미", "조", "메그"], answer: 0 },
    { q: "조가 마치 대고모에게 물려받은 집을 어떻게 했습니까?", choices: ["식구들과 옮겨 가 살았다", "팔아서 살림에 보탰다", "아이들 학교로 만들었다"], answer: 2 },
    { q: "그 학교에서 조가 지킨 원칙은 무엇입니까?", choices: ["아이들끼리 규칙을 정하게 했다", "돈을 못 내는 아이도 똑같이 대했다", "공부는 하루 두 시간만 시켰다"], answer: 1 }
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
            ${artFrame('end.png', '🍎')}
            <h2>작은 아씨들을 다 읽었습니다</h2>
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
