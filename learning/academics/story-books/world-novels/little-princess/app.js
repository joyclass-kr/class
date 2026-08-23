const BOOK_TITLE = "소공녀";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "마차에서 내린 아이",
        emoji: "🚪",
        art: ["story-01-a.png", "story-01-b.png"],
        paras: [
            `어느 겨울날, 런던의 안개 낀 거리를 마차 한 대가 천천히 달리고 있었습니다.`,
            `마차 안에는 아버지와 딸이 앉아 있었습니다. 딸은 일곱 살이었는데, 나이보다 어른스러운 얼굴로 창밖을 보고 있었습니다. 초록빛이 도는 잿빛 눈에 속눈썹이 길었고, 머리카락은 검었습니다.`,
            `아이의 이름은 세라 크루였습니다. 인도에서 태어나 그곳에서 자랐습니다. 어머니는 세라를 낳고 곧 세상을 떠났고, 아버지 크루 대위가 혼자 아이를 키웠습니다.`,
            `세라는 어른들 사이에서 자랐습니다. 또래와 놀아 본 적이 거의 없었고, 대신 아버지의 책장을 뒤지며 놀았습니다. 그래서 말하는 것이 나이보다 어른스러웠습니다.`,
            `인도는 아이가 자라기에 더운 곳이었습니다. 그래서 영국의 학교에 보내는 것이 그곳 사람들의 관례였습니다.`,
            `"아빠." 세라가 말했습니다. "저기가 그 학교인가요?"<br>"그렇단다."`,
            `마차가 멈춘 곳은 크고 어두운 벽돌집이었습니다. 문에 놋쇠 문패가 붙어 있었습니다. 민친 여학교라고 적혀 있었습니다.`,
            `민친 선생은 키가 크고 뼈가 굵은 여자였습니다. 눈이 차가웠는데 웃을 때는 아주 상냥해 보였습니다.`,
            `"세상에, 이렇게 예쁜 아가씨는 처음 봅니다." 민친 선생이 말했습니다.`,
            `세라는 그 말을 듣고 속으로 생각했습니다. 저 말은 사실이 아니야. 나는 예쁘지 않아. 저분은 왜 사실이 아닌 말을 할까.`,
            `세라는 어릴 때부터 그런 생각을 자주 했습니다. 그리고 그런 생각을 입 밖에 내지 않는 법도 일찍 배웠습니다.`,
            `크루 대위는 딸에게 아무것도 아끼지 않았습니다. 세라의 방에는 따로 거실이 붙었고, 조랑말과 마차와 하녀가 딸렸습니다. 옷장에는 어른 옷처럼 지은 값비싼 드레스가 걸렸습니다.`,
            `"이 아이는 책을 아주 좋아합니다." 크루 대위가 말했습니다. "밥 먹듯이 읽지요. 필요한 책은 마음껏 사 주십시오."`,
            `민친 선생은 그 말을 들으며 속으로 셈을 하고 있었습니다. 이 아이 하나로 학교의 이름이 올라갈 것이고, 돈도 많이 들어올 것이었습니다.`,
            `그 학교는 겉으로는 번듯했지만 살림이 넉넉하지 않았습니다. 민친 선생은 부잣집 아이 하나가 들어오면 다른 부잣집 아이들이 따라온다는 것을 잘 알고 있었습니다.`,
            `"세라 양은 저희 학교의 자랑이 될 겁니다."`,
            `그날부터 세라는 그 학교에서 가장 특별한 학생이 되었습니다. 앞자리에 앉았고, 나들이 때는 맨 앞에 섰습니다.`,
            `아이들은 세라를 두고 수군거렸습니다. 세라의 아버지가 인도에서 다이아몬드 광산을 가지고 있다는 소문이 돌았기 때문입니다.`
        ]
    },
    {
        num: 2,
        title: "인형 에밀리",
        emoji: "🧸",
        art: ["story-02-a.png", "story-02-b.png"],
        paras: [
            `학교에 들어가기 전날, 세라와 아버지는 런던 거리를 돌아다니며 물건을 샀습니다.`,
            `"아빠, 인형을 하나 사요."<br>"그러자꾸나. 어떤 인형이 좋겠니?"`,
            `"아무 인형이나 안 돼요." 세라가 진지하게 말했습니다. "저를 기다려 줄 인형이어야 해요. 아빠가 인도로 가시면 저는 혼자 남잖아요. 그때 이야기할 사람이 있어야 해요."`,
            `두 사람은 여러 가게를 돌았습니다. 마침내 어느 진열창에서 세라가 걸음을 멈췄습니다.`,
            `"저 아이예요."`,
            `그것은 세라의 키만 한 큰 인형이었습니다. 잿빛이 도는 초록 눈에 속눈썹이 길고 머리카락이 금빛이었습니다.`,
            `"이름은요?"<br>"에밀리예요. 벌써 정해져 있었어요."`,
            `크루 대위는 웃으며 인형을 샀습니다. 그리고 인형에게 입힐 옷도 여러 벌 맞췄습니다.`,
            `가게 사람들은 어린 손님이 인형을 고르는 모습을 보고 웃었습니다. 세라는 인형의 손을 잡아 보고, 눈이 감기는지 확인하고, 이름이 어울리는지 한참을 생각했습니다.`,
            `그날 밤 세라는 아버지의 무릎에 앉아 말했습니다.<br>"아빠, 아빠가 가시면 저는 에밀리랑 이야기할 거예요."<br>"인형이 대답을 하니?"`,
            `"안 해요." 세라가 말했습니다. "하지만 저는 인형이 들을 수 있다고 생각해요. 사람이 없을 때 인형은 걸어 다니고 이야기도 한대요. 그러다 사람이 오면 얼른 제자리로 돌아가 아무것도 모르는 척하는 거예요."`,
            `"그렇다면 에밀리는 아주 빠르겠구나."<br>"엄청 빨라요."`,
            `이튿날 아침, 크루 대위는 인도로 떠났습니다.`,
            `그는 딸을 두고 가는 것이 견디기 힘들어, 마차가 떠날 때까지 창밖으로 손을 흔들었습니다. 세라도 문 앞에 서서 마차가 안개 속으로 사라질 때까지 서 있었습니다.`,
            `그러고는 방으로 올라가 문을 닫았습니다.`,
            `에밀리는 의자에 앉아 세라를 보고 있었습니다.`,
            `"에밀리." 세라가 인형의 어깨에 얼굴을 묻었습니다. "아빠는 가셨어."`,
            `그날 세라는 저녁을 먹으러 내려가지 않았습니다. 민친 선생이 사람을 보냈지만, 세라는 잠깐만 혼자 있게 해 달라고 했습니다.`,
        ]
    },
    {
        num: 3,
        title: "이야기를 들려주는 아이",
        emoji: "📖",
        art: ["story-03-a.png", "story-03-b.png"],
        paras: [
            `세라는 곧 학교에서 두 가지로 이름이 났습니다.`,
            `세라는 자기가 특별하게 대접받는 것이 마음에 걸렸습니다. 앞자리에 앉는 것도, 나들이 때 맨 앞에 서는 것도 자기가 잘해서가 아니라는 것을 알았기 때문입니다.`,
            `하나는 아버지가 부자라는 것이었고, 다른 하나는 이야기를 아주 잘한다는 것이었습니다.`,
            `쉬는 시간이면 아이들이 세라의 둘레에 모여 앉았습니다. 세라가 이야기를 시작하면 아무도 움직이지 않았습니다.`,
            `세라는 이야기를 지어내는 것이 아니라 자기가 정말로 그 자리에 있는 것처럼 이야기했습니다. 인어가 헤엄치는 바닷속, 얼음으로 된 궁전, 사막을 건너는 낙타 행렬. 아이들은 그 이야기를 들으며 정말로 그것을 보았습니다.`,
            `세라와 가장 친해진 아이는 어먼가드 세인트존이었습니다.`,
            `어먼가드는 학교에서 공부를 제일 못하는 아이였습니다. 얼굴이 통통하고 늘 겁먹은 표정이었으며, 프랑스어 시간이면 울 것 같은 얼굴이 되었습니다. 아버지가 아주 똑똑한 사람이라 더 힘들었습니다.`,
            `"너는 어떻게 그렇게 잘해?" 어먼가드가 물었습니다.<br>"네가 못하는 게 아니야." 세라가 말했습니다. "너는 그냥 배우는 방법이 다른 거야."`,
            `그날부터 세라는 어먼가드에게 프랑스어를 이야기처럼 들려주었습니다. 어먼가드는 조금씩 나아졌습니다.`,
            `또 한 아이가 있었습니다. 로티라는 네 살짜리였습니다. 어머니가 없었고, 어른들이 어쩔 줄 몰라 다 받아 주는 바람에 성질이 사나웠습니다.`,
            `어느 날 로티가 복도 바닥에 누워 발을 구르며 울고 있었습니다. 선생들도 민친 선생도 손을 들었습니다.`,
            `세라가 그 곁에 앉았습니다. 그리고 아주 조용한 목소리로 말했습니다.<br>"로티, 나도 엄마가 없어."`,
            `로티가 울음을 멈추고 눈을 떴습니다.`,
            `"우리 엄마는 하늘에 계셔." 세라가 말했습니다. "거기가 어떤 곳인지 아니? 온통 꽃밭이야. 길에 백합이 깔려 있어서 바람이 불면 향기가 나. 그리고 사람들이 그 위를 걸어 다녀."`,
            `로티는 눈물이 마른 채 세라를 보고 있었습니다.<br>"더 이야기해 줘."`,
            `그날부터 로티는 세라를 엄마라고 부르기 시작했습니다.`,
            `그러나 세라를 좋아하지 않는 아이도 있었습니다. 라비니아라는 큰 아이였습니다. 세라가 오기 전까지 학교에서 가장 대접받던 아이가 라비니아였기 때문입니다.`,
            `"그렇게 잘난 척할 거 없어." 라비니아가 말했습니다. "네가 무슨 공주라도 되니?"`,
            `세라는 잠깐 생각하다가 대답했습니다.<br>"가끔은 그런 생각을 해. 공주라면 어떻게 할까 하고. 그러면 화가 나도 참을 수 있거든."`
        ]
    },
    {
        num: 4,
        title: "부엌의 베키",
        emoji: "🧹",
        art: ["story-04-a.png", "story-04-b.png"],
        paras: [
            `그 학교에는 학생이 아닌 아이도 하나 있었습니다.`,
            `베키라는 열네 살짜리 부엌데기였습니다. 몸집이 작고 늘 재가 묻어 있었으며, 아침 다섯 시부터 밤까지 일했습니다. 아이들은 베키가 있다는 것도 잘 몰랐습니다.`,
            `베키는 벽난로에 석탄을 넣으러 방을 돌아다녔습니다. 세라의 방에 들어갈 때면 그녀는 늘 발끝으로 걸었습니다. 그 방이 자기가 본 것 중 가장 아름다웠기 때문입니다.`,
            `어느 날 저녁, 세라가 방에 들어가 보니 난로 앞 의자에 베키가 잠들어 있었습니다. 손에는 석탄 통을 든 채였습니다.`,
            `세라는 깨우지 않고 가만히 서 있었습니다. 그러다 베키가 눈을 뜨고 소스라치게 놀랐습니다.`,
            `"아이고, 아가씨! 잠깐만 앉는다는 게······ 저를 이르지 마세요, 제발요!"<br>"안 이를게." 세라가 말했습니다. "그리고 왜 그렇게 겁을 내니. 앉으렴. 나도 앉을게."`,
            `베키는 앉으라는 말을 태어나서 처음 들어 본 사람 같았습니다.`,
            `"저는 그냥 부엌데기인데요."<br>"그게 뭐 어때서." 세라가 말했습니다. "너도 여자아이고 나도 여자아이야. 다른 게 뭐가 있어. 우연히 네가 내가 아닌 거고 내가 네가 아닌 것뿐이지."`,
            `세라는 그 말을 하면서 정말로 그렇게 생각했습니다. 인도에서 자랄 때 세라는 자기 집에서 일하던 사람들을 보며 자랐고, 그 사람들이 자기보다 못한 사람이라고 배운 적이 없었습니다.`,
            `베키는 그 말을 오래 곱씹었습니다.`,
            `그날부터 세라는 베키에게 이야기를 들려주었습니다. 하루 일이 끝난 뒤 잠깐씩, 난롯가에 앉아서요.`,
            `베키는 그 짧은 시간을 위해 하루를 견뎠습니다.`,
            `세라는 자기 몫의 간식을 늘 남겨 두었다가 베키에게 주었습니다. 베키는 처음에는 받지 않으려 했습니다.`,
            `"먹어." 세라가 말했습니다. "나는 배가 부르고 너는 배가 고픈데, 그럼 네가 먹는 게 맞잖아."`,
            `민친 선생이 그 일을 알면 큰일이 났을 것입니다. 그래서 두 아이는 그것을 비밀로 했습니다.`,
            `베키는 그 간식을 한 번도 그 자리에서 먹지 않았습니다. 늘 앞치마에 싸서 자기 방으로 가져갔습니다. 혼자 있을 때 천천히 먹으려고요.`,
            `한번은 베키가 물었습니다.<br>"아가씨는 왜 저한테 잘해 주세요?"`,
            `세라는 잠깐 생각하다가 대답했습니다.<br>"내가 만약 아무것도 없는 아이였다면, 누가 나한테 그렇게 해 주기를 바랐을 것 같아서."`
        ]
    },
    {
        num: 5,
        title: "열한 번째 생일",
        emoji: "🎂",
        art: ["story-05-a.png", "story-05-b.png"],
        paras: [
            `세라가 그 학교에서 지낸 지 네 해가 지났습니다.`,
            `그동안 크루 대위는 인도에서 편지를 자주 보냈습니다. 마지막 편지에는 새로운 일에 대한 이야기가 있었습니다.`,
            `"학교 때 친구를 만났단다. 그 친구가 다이아몬드 광산을 하나 찾아냈다는구나. 나는 가진 것을 다 그 일에 넣었단다. 잘되면 너는 세상에서 가장 부자인 아이가 될 게다."`,
            `세라는 그 편지를 읽고 마음이 편치 않았습니다. 다이아몬드 광산이라는 말이 이야기책에 나오는 말 같았기 때문입니다.`,
            `아이들 사이에서는 그 소문이 금세 퍼졌습니다. 라비니아는 그 말을 들을 때마다 코웃음을 쳤습니다.`,
            `열한 번째 생일이 다가왔습니다.`,
            `민친 선생은 그 잔치에 돈을 아끼지 않았습니다. 크루 대위가 넉넉하게 보내 준 데다, 그런 잔치는 학교의 이름을 올려 주기 때문이었습니다.`,
            `교실을 꽃으로 꾸미고 큰 상을 차렸습니다. 인도에서 선물 상자가 여럿 도착했습니다.`,
            `그중에는 에밀리에게 줄 새 옷도 있었습니다. 세라는 열한 살이 되었지만 아직도 에밀리와 이야기를 했습니다.`,
            `잔치가 시작되었습니다. 아이들이 모여 앉았고, 세라가 선물 상자를 하나씩 열었습니다.`,
            `그때 하녀가 들어와 민친 선생에게 무언가를 속삭였습니다.`,
            `"손님이 오셨다는구나." 민친 선생이 나가며 말했습니다. "다들 잠깐 기다리렴."`,
            `응접실에는 검은 옷을 입은 신사가 서 있었습니다. 크루 대위의 변호사 배로라는 사람이었습니다.`,
            `"크루 대위가 두 달 전에 세상을 떠났습니다." 그가 말했습니다.`,
            `민친 선생은 의자를 붙잡았습니다.`,
            `"병으로요. 열병이었습니다. 다만······ 그 전에 재산을 모두 잃으셨습니다. 친구분이 찾아냈다는 광산에 전부 넣으셨는데, 그 친구분이 돈을 들고 사라졌습니다. 대위께서는 그 소식을 듣고 앓아누우셨지요."`,
            `"그럼 저 아이는요?"<br>"한 푼도 없습니다. 친척도 없고요. 저희로서도 해 드릴 것이 없습니다."`,
            `변호사가 나간 뒤 민친 선생은 한참을 서 있었습니다.`,
            `그리고 교실 문을 열었습니다. 아이들이 웃고 있었고, 세라가 그 가운데 앉아 있었습니다.`,
            `"세라." 민친 선생이 말했습니다. "이리 오너라."`
        ]
    },
    {
        num: 6,
        title: "그날 오후",
        emoji: "🖤",
        art: ["story-06-a.png", "story-06-b.png"],
        paras: [
            `"네 아버지가 돌아가셨다." 민친 선생이 말했습니다.`,
            `세라는 그 말을 듣고 아무 말도 하지 못했습니다.`,
            `"그리고 돈도 한 푼 남기지 않으셨다. 너는 이제 거지나 다름없어."`,
            `방 안이 아주 조용해졌습니다.`,
            `"그동안 내가 너에게 들인 것이 얼마인지 아느냐. 이번 잔치 값만 해도 그렇다. 그 돈은 이제 아무도 갚지 않는다."`,
            `세라는 여전히 서 있었습니다. 얼굴이 하얗게 질려 있었지만 울지 않았습니다.`,
            `"너를 길거리에 내보낼 수도 있다. 하지만 나는 그렇게 하지 않겠다. 대신 일을 해야 한다." 민친 선생이 말했습니다. "그 옷을 벗어라. 이제 그런 옷은 못 입는다."`,
            `그날 오후, 세라의 물건은 모두 치워졌습니다. 드레스도, 책도, 방도.`,
            `세라에게 남겨진 것은 검은 옷 한 벌과 낡은 신발, 그리고 인형 에밀리뿐이었습니다. 에밀리는 민친 선생이 보기에 팔 만한 물건이 아니었기 때문입니다.`,
            `세라는 다락방으로 올라갔습니다.`,
            `천장이 비스듬한 좁은 방이었습니다. 벽지가 뜯겨 있었고, 침대에는 얇은 이불 한 장이 있었습니다. 창은 작았고 그 밖으로는 굴뚝과 지붕만 보였습니다.`,
            `쥐가 벽 안에서 달리는 소리가 났습니다.`,
            `세라는 에밀리를 내려놓고 그 앞에 앉았습니다. 그리고 오래 아무 말도 하지 않았습니다.`,
            `"에밀리." 마침내 세라가 말했습니다. "아빠가 돌아가셨어."`,
            `에밀리는 아무 말도 하지 않았습니다.`,
            `세라는 인형을 바라보았습니다. 그러다 갑자기 인형을 집어 방바닥에 던졌습니다.`,
            `"너는 인형일 뿐이야! 너는 아무것도 아니야! 톱밥이랑 헝겊일 뿐이야! 너는 한 번도 마음이 있었던 적이 없어!"`,
            `에밀리는 바닥에 엎드린 채 그대로 있었습니다.`,
            `세라는 한참 뒤에 인형을 주워 들었습니다. 그리고 옷의 먼지를 털어 주고 다시 의자에 앉혔습니다.`,
            `"미안해." 세라가 말했습니다. "네 잘못이 아니야."`,
            `그리고 그날 처음으로 울었습니다.`
        ]
    },
    {
        num: 7,
        title: "다락방의 하녀",
        emoji: "🪣",
        art: ["story-07-a.png", "story-07-b.png"],
        paras: [
            `이튿날부터 세라의 하루가 달라졌습니다.`,
            `새벽에 일어나 부엌일을 하고, 낮에는 심부름을 다니고, 저녁에는 어린아이들에게 프랑스어를 가르쳤습니다. 그러고 나서야 다락방으로 올라갔습니다.`,
            `비가 오는 날에도 심부름을 나갔습니다. 낡은 신발에 물이 들어와 발이 젖었고, 몸에 맞지 않는 검은 옷은 자꾸 짧아졌습니다.`,
            `요리사는 세라에게 화풀이를 했습니다. 심부름이 조금이라도 늦으면 밥을 주지 않았습니다.`,
            `배가 고픈 것이 가장 견디기 힘들었습니다. 어떤 날은 하루 종일 빵 한 조각이 전부였습니다.`,
            `아이들도 달라졌습니다. 라비니아는 지나가면서 일부러 크게 말했습니다.<br>"저 애 좀 봐. 예전엔 공주님이었는데."`,
            `그래도 달라지지 않은 아이가 셋 있었습니다. 어먼가드와 로티, 그리고 베키였습니다.`,
            `베키의 방은 세라의 다락방 바로 옆이었습니다. 벽 하나를 사이에 두고 두 아이가 잤습니다.`,
            `"아가씨." 처음 며칠 동안 베키가 그렇게 부르자 세라가 말했습니다.<br>"이제 아가씨가 아니야."<br>"저한테는 아가씨예요." 베키가 말했습니다. "그건 안 바뀌어요."`,
            `밤이면 두 아이는 벽을 두드려 서로가 깨어 있는지 알렸습니다. 한 번은 잘 자라는 뜻이었고, 두 번은 이야기를 하고 싶다는 뜻이었습니다.`,
            `어느 밤, 세라가 베키에게 말했습니다.<br>"베키, 나는 요즘 한 가지 생각을 해."<br>"뭔데요?"`,
            `"내가 공주라고 생각하는 거야."`,
            `베키가 웃었습니다.<br>"저희 같은 애들이요?"`,
            `"그러니까 더 그래야 해." 세라가 말했습니다. "좋은 옷을 입고 있을 때는 아무나 공주 같아 보여. 그건 어렵지 않아. 아무도 몰라줄 때 그렇게 하는 게 진짜야."`,
            `"어떻게 하는 건데요?"`,
            `"요리사가 소리를 지르면 나는 속으로 생각해. 너는 내가 누구인지 모르는구나. 그러면 화가 나지 않아. 마음속으로는 아무도 나를 어쩌지 못하니까."`,
            `베키는 벽에 기대어 그 말을 들었습니다.`,
            `"그럼 저도 할래요." 베키가 말했습니다. "저는 그럼 뭐가 될까요."<br>"너는 시녀 말고." 세라가 말했습니다. "너도 공주야. 나라가 다를 뿐이지."`
        ]
    },
    {
        num: 8,
        title: "다락방의 잔치",
        emoji: "🕯️",
        art: ["story-08-a.png", "story-08-b.png"],
        paras: [
            `어먼가드는 세라를 만나러 밤마다 다락방으로 올라왔습니다. 들키면 벌을 받는 일이었지만 그만두지 않았습니다.`,
            `어느 날 어먼가드가 커다란 상자를 안고 올라왔습니다.<br>"아버지가 책을 보내셨어. 나는 하나도 못 읽겠어."`,
            `상자 안에는 책이 가득했습니다. 세라는 그 앞에서 손이 떨렸습니다. 책을 만져 본 지 여러 달이었습니다.`,
            `"내가 읽고 너한테 이야기해 줄까?"<br>"응! 그게 훨씬 좋아!"`,
            `그때부터 세라는 밤마다 책을 읽고, 낮에 심부름을 다니면서 머릿속으로 그것을 이야기로 바꾸었습니다.`,
            `어느 겨울날, 어먼가드가 또 상자를 하나 들고 왔습니다. 이번에는 먹을 것이었습니다.`,
            `"오늘 잔치를 하자." 세라가 말했습니다. "다락방 잔치야. 베키도 부르자."`,
            `세 아이는 낡은 탁자에 헌 손수건을 깔고, 종이로 만든 꽃을 놓고, 촛동강에 불을 붙였습니다.`,
            `"이건 그냥 상상이야." 세라가 말했습니다. "하지만 상상은 아주 잘하면 진짜랑 비슷해져."`,
            `세 아이는 웃었습니다. 그 다락방에서 웃음소리가 난 것은 처음이었습니다.`,
            `그런데 계단에서 발소리가 났습니다.`,
            `문이 열리고 민친 선생이 서 있었습니다. 라비니아가 일러바친 것이었습니다.`,
            `"이게 무슨 짓이냐."`,
            `민친 선생은 상자를 뒤엎고 촛불을 껐습니다. 어먼가드는 울면서 끌려 내려갔고, 베키도 쫓겨 갔습니다.`,
            `"내일은 아무것도 못 먹을 줄 알아라." 민친 선생이 문을 닫고 나갔습니다.`,
            `방이 캄캄해졌습니다.`,
            `세라는 어둠 속에 앉아 있었습니다. 몸이 떨렸습니다. 배가 고팠고 추웠고, 이번에는 공주 생각도 잘 되지 않았습니다.`,
            `"에밀리." 세라가 말했습니다. "오늘은 못 하겠어."`,
            `세라는 그대로 침대에 쓰러져 잠이 들었습니다.`
        ]
    },
    {
        num: 9,
        title: "빵 네 개",
        emoji: "🍞",
        art: ["story-09-a.png", "story-09-b.png"],
        paras: [
            `그 무렵 어느 비 오는 날이었습니다.`,
            `세라는 아침부터 아무것도 먹지 못한 채 심부름을 나갔습니다. 신발에 구멍이 나서 진창이 발가락 사이로 들어왔습니다.`,
            `머릿속에는 온통 먹을 것 생각뿐이었습니다. 그런 자기가 부끄러웠지만 어쩔 수 없었습니다.`,
            `세라는 걸으면서 이야기를 지어내 보려고 했습니다. 그러면 배고픔이 조금 잊히기 때문이었습니다. 그런데 그날은 어떤 이야기도 떠오르지 않았습니다.`,
            `그때 진창 속에서 무언가가 반짝였습니다. 은화 한 닢이었습니다. 사 펜스짜리였습니다.`,
            `세라는 그것을 주워 들고 주위를 둘러보았습니다. 잃어버린 사람을 찾을 수 없었습니다.`,
            `바로 앞에 빵집이 있었습니다. 진열창에서 김이 오르는 빵이 막 나오고 있었습니다.`,
            `세라가 문으로 다가가려는데, 계단 밑에 웅크린 아이가 보였습니다.`,
            `세라보다 어린 여자아이였습니다. 옷이라고 할 수 없는 것을 걸치고 있었고, 맨발이었으며, 얼굴에는 때가 앉아 있었습니다. 그 아이는 빵집 창을 올려다보고 있었습니다.`,
            `세라가 물었습니다.<br>"너 배고프니?"`,
            `아이가 고개를 들었습니다.<br>"배고파. 엄청."`,
            `세라는 잠깐 서 있었습니다. 자기도 하루 종일 굶었습니다. 그리고 이 사 펜스는 자기가 주운 것이었습니다.`,
            `그러나 그 아이의 눈을 보고 나니 다른 생각이 들지 않았습니다.`,
            `세라는 빵집에 들어가 사 펜스로 빵을 샀습니다. 빵집 아주머니는 세라를 보고 잠깐 무언가 생각하는 얼굴이 되더니, 네 개 값으로 여섯 개를 담아 주었습니다.`,
            `세라는 밖으로 나와 아이 곁에 앉았습니다.`,
            `그리고 빵을 하나씩 아이에게 주었습니다. 하나, 둘, 셋, 넷, 다섯.`,
            `아이는 말도 못 하고 먹었습니다.`,
            `여섯 번째 빵을 손에 들고 세라는 잠깐 망설였습니다. 그러다 그것도 아이 앞에 놓았습니다.`,
            `"나는 집에 가면 먹을 게 있어." 세라가 말했습니다. 사실이 아니었습니다.`,
            `아이가 처음으로 입을 열었습니다.<br>"고마워."`,
            `빵집 아주머니가 창가에서 그 광경을 보고 있었습니다.`,
            `그녀는 밖으로 나와 그 아이를 안으로 데려갔습니다. 그리고 세라에게 물었습니다.<br>"얘야, 너는 왜 다 줬니?"<br>"저보다 더 배고팠으니까요."`,
            `아주머니는 한참 세라를 보다가 말했습니다.<br>"들어와서 몸이라도 녹이렴."<br>"고맙습니다. 하지만 늦으면 혼나요."`,
            `세라가 빗속으로 걸어간 뒤, 아주머니는 아이에게 말했습니다.<br>"너, 오늘부터 여기서 잔심부름을 하겠니?"`
        ]
    },
    {
        num: 10,
        title: "옆집에 온 신사",
        emoji: "🪟",
        art: ["story-10-a.png", "story-10-b.png"],
        paras: [
            `민친 여학교 옆집이 오래 비어 있다가, 어느 날 사람이 들어왔습니다.`,
            `짐이 여러 날에 걸쳐 들어왔습니다. 인도에서 온 물건이 많았습니다. 무늬가 화려한 융단, 놋으로 만든 그릇, 나무를 파서 만든 궤짝 같은 것들이었습니다.`,
            `집주인은 몸이 몹시 아픈 신사였습니다. 얼굴이 누렇고 여위었으며, 사람들은 그를 인도 신사라고 불렀습니다.`,
            `그의 곁에는 램 다스라는 인도 사람이 있었습니다. 하인이라고들 했지만, 신사는 그를 사람 대하듯 대했고 그의 말을 귀담아들었습니다.`,
            `세라는 심부름을 다니며 그 집을 지나칠 때마다 창을 올려다보았습니다.`,
            `어느 날 그 집 창에서 원숭이 한 마리가 나왔습니다. 원숭이는 지붕 처마를 타고 달리더니, 세라의 다락방 창턱에 폴짝 올라앉았습니다.`,
            `세라가 창을 열자 원숭이가 방 안으로 들어왔습니다. 그리고 세라의 어깨에 올라앉았습니다.`,
            `옆 지붕에서 사람이 나타났습니다. 램 다스였습니다.`,
            `"놀라셨다면 죄송합니다." 그가 지붕을 건너오며 말했습니다. "저 녀석이 자꾸 달아납니다."`,
            `램 다스는 세라를 보고, 그 방을 보았습니다. 벽지가 뜯긴 벽, 얇은 이불 한 장, 불기 없는 벽난로.`,
            `램 다스는 인도에서 오래 남의 집에서 일한 사람이었습니다. 그래서 그 방이 어떤 방인지 한눈에 알아보았습니다.`,
            `그리고 세라가 하는 말을 듣고 다시 한번 놀랐습니다. 세라가 인도 말로 인사를 했기 때문입니다.`,
            `"인도에서 사셨습니까?"<br>"태어난 곳이에요." 세라가 말했습니다.`,
            `램 다스는 원숭이를 안고 돌아갔습니다.`,
            `그날 저녁 그는 주인에게 그 이야기를 했습니다. 인도 신사는 창가에 앉아 오래 듣고 있었습니다.`,
            `그 신사의 이름은 캐리스퍼드였습니다.`,
            `그는 몇 해 전 친구와 함께 다이아몬드 광산에 돈을 넣었습니다. 그러다 광산이 잘못되었다는 소문을 듣고 겁에 질려 그 자리를 떠났습니다. 친구에게 한마디도 하지 못한 채였습니다.`,
            `그런데 광산은 잘못된 것이 아니었습니다. 오히려 큰 광산이었습니다.`,
            `그가 그 사실을 알고 돌아왔을 때, 친구는 이미 세상을 떠난 뒤였습니다.`,
            `그 친구의 이름이 크루 대위였습니다.`,
            `캐리스퍼드는 그때부터 그 친구의 딸을 찾고 있었습니다. 그러나 학교 이름을 몰랐습니다. 그는 프랑스의 학교를 뒤지고 다녔고, 지금도 사람을 보내 찾는 중이었습니다.`,
            `그 아이는 벽 하나 너머에 있었습니다.`
        ]
    },
    {
        num: 11,
        title: "하룻밤 사이",
        emoji: "✨",
        art: ["story-11-a.png", "story-11-b.png"],
        paras: [
            `며칠 뒤, 유난히 추운 밤이었습니다.`,
            `그날 세라는 눈길을 여러 번 왕복했고, 저녁도 먹지 못했습니다. 다락방에 올라왔을 때는 손발의 감각이 없었습니다.`,
            `베키가 벽을 두 번 두드렸지만 세라는 대답하지 못했습니다.`,
            `세라는 옷을 입은 채 이불을 뒤집어쓰고 누웠습니다. 그리고 이렇게 생각했습니다. 만약 이 방에 불이 지펴져 있다면. 탁자에 따뜻한 음식이 놓여 있다면. 침대에 두꺼운 이불이 있다면.`,
            `그렇게 상상하다가 잠이 들었습니다.`,
            `눈을 떴을 때 방이 밝았습니다.`,
            `세라는 아직 꿈을 꾸고 있다고 생각했습니다.`,
            `벽난로에 불이 활활 타고 있었습니다. 그 앞에는 발판이 놓였고, 침대에는 두꺼운 이불과 비단 덮개가 덮여 있었습니다. 창에는 커튼이 걸렸고, 바닥에는 융단이 깔려 있었습니다.`,
            `탁자에는 흰 천이 깔리고 그 위에 뜨거운 음식이 놓여 있었습니다. 국이 담긴 그릇에서 김이 올라왔습니다. 옆에는 책이 몇 권 쌓여 있었습니다.`,
            `세라는 침대에서 내려와 벽난로를 만져 보았습니다. 뜨거웠습니다.`,
            `세라는 벽을 두드렸습니다. 세 번, 네 번, 다섯 번.`,
            `베키가 뛰어 들어왔습니다. 그리고 문간에서 그대로 굳어 섰습니다.`,
            `"아가씨······ 이게 뭐예요?"<br>"나도 몰라." 세라가 말했습니다. "아침이 되면 사라질지도 몰라. 그러니까 지금 먹자."`,
            `국은 아직 뜨거웠습니다. 베키는 숟가락을 들다가 손이 떨려 몇 번이나 놓쳤습니다.`,
            `두 아이는 탁자에 마주 앉아 먹었습니다. 베키는 먹으면서 계속 울었습니다.`,
            `아침이 되어도 아무것도 사라지지 않았습니다.`,
            `그날부터 다락방은 다른 방이 되었습니다. 세라가 심부름을 다녀오면 늘 불이 지펴져 있었고, 밥이 놓여 있었습니다.`,
            `누가 하는 일인지 세라는 알지 못했습니다. 다만 밤에 지붕에서 아주 작은 발소리가 나는 것 같기도 했습니다.`,
            `옆집에서는 캐리스퍼드 씨가 램 다스에게 날마다 물었습니다.<br>"오늘은 그 아이가 뭐라고 하던가?"<br>"오늘은 웃었습니다." 램 다스가 대답했습니다.`
        ]
    },
    {
        num: 12,
        title: "원숭이가 넘어온 날",
        emoji: "🐒",
        art: ["story-12-a.png", "story-12-b.png"],
        paras: [
            `어느 아침, 세라가 눈을 떠 보니 원숭이가 침대 발치에 앉아 있었습니다.`,
            `밤사이 추워서 창틈으로 들어온 모양이었습니다. 원숭이는 몸을 잔뜩 웅크리고 떨고 있었습니다.`,
            `"돌려보내 줘야겠구나." 세라가 말했습니다.`,
            `세라는 원숭이를 품에 안고 옆집으로 갔습니다. 부엌문으로 가려다가, 원숭이가 자꾸 앞문 쪽으로 몸을 틀어 그냥 앞문으로 갔습니다.`,
            `하인이 문을 열었습니다. 세라는 인도 말로 인사를 했습니다. 그 소리를 듣고 램 다스가 나왔습니다.`,
            `"주인님께서 뵙고 싶어 하십니다." 램 다스가 말했습니다.`,
            `세라는 처음으로 그 집 안으로 들어갔습니다.`,
            `방 안은 따뜻했고 온통 인도의 물건으로 가득했습니다. 창가의 큰 의자에 병든 신사가 담요를 덮고 앉아 있었습니다.`,
            `그 옆에 손님이 하나 있었습니다. 젊은 변호사 카마이클 씨였습니다. 그는 마침 러시아에 다녀온 이야기를 하는 중이었습니다.`,
            `"그 학교에도 없었습니다." 카마이클 씨가 말했습니다. "이번에도 헛걸음이었습니다."`,
            `캐리스퍼드 씨가 한숨을 쉬었습니다.<br>"프랑스도, 러시아도. 그럼 대체 어디 있단 말입니까."`,
            `세라는 원숭이를 내려놓고 인사를 했습니다.`,
            `"원숭이가 제 방으로 들어와서 데려왔습니다."<br>"고맙구나." 신사가 말했습니다. "너는 옆집 학교에 다니니?"<br>"다니지는 않습니다. 거기서 일을 합니다."`,
            `"부모님은?"<br>"두 분 다 안 계십니다."`,
            `"아버지는 어떤 분이셨니?"<br>"군인이셨어요. 인도에서요. 저도 인도에서 태어났습니다."`,
            `캐리스퍼드 씨가 몸을 일으켰습니다.`,
            `"그럼······ 그럼 이 학교에 다니다가 아버지를 잃고 남게 된 거니?"<br>"네."`,
            `"이름이 뭐냐."`,
            `"세라 크루입니다."`,
            `방 안이 아주 조용해졌습니다.`,
            `캐리스퍼드 씨는 담요를 붙잡고 카마이클 씨를 보았습니다. 말이 나오지 않는 모양이었습니다.`,
            `카마이클 씨가 대신 세라 곁으로 갔습니다.<br>"얘야, 여기 이분이 네 아버지의 친구분이시란다. 이 년 동안 너를 찾아다니셨어."`,
            `세라는 그 말을 얼른 알아듣지 못했습니다. 방 안의 것들이 갑자기 아주 멀게 느껴졌습니다.<br>"제 아버지를 아셨어요?"<br>"가장 가까운 친구였단다." 캐리스퍼드 씨가 겨우 말했습니다.`,
        ]
    },
    {
        num: 13,
        title: "다이아몬드 광산",
        emoji: "💎",
        art: ["story-13-a.png", "story-13-b.png"],
        paras: [
            `이야기를 다 듣고 나서 세라가 물었습니다.`,
            `"그럼 그 방에 불을 지피고 밥을 놓아둔 것도······."<br>"저희였습니다." 램 다스가 말했습니다. "주인님께서 시키셨습니다. 저는 지붕으로 넘어가 창으로 들어갔습니다."`,
            `"몇 번이나요?"<br>"여러 번입니다. 아가씨께서 잠든 것을 늘 확인하고 들어갔습니다."`,
            `세라는 웃다가 울었습니다.`,
            `캐리스퍼드 씨는 세라의 손을 잡고 말했습니다.<br>"광산은 잘못된 게 아니었단다. 오히려 아주 큰 광산이었어. 네 아버지가 넣으신 몫은 그대로 있단다. 그건 다 네 것이야."`,
            `"저는 부자인가요?"<br>"아주 부자란다."`,
            `세라는 한참 말이 없다가 물었습니다.<br>"그럼 하나만 부탁드려도 될까요."<br>"무엇이든지."`,
            `"베키를 데려오고 싶어요. 옆집 부엌에 있는 아이예요. 저랑 같이 지낸 아이예요."`,
            `그 시각 민친 여학교에서는 난리가 났습니다. 세라가 아침부터 보이지 않았기 때문입니다.`,
            `민친 선생은 옆집으로 사람을 보냈다가, 그 집에 세라가 있다는 말을 듣고 직접 찾아왔습니다.`,
            `"제 학교 아이가 여기 있다고 들었습니다." 민친 선생이 말했습니다. "세라, 당장 나오너라."`,
            `"세라 크루 양은 이제 그 학교로 돌아가지 않습니다." 카마이클 씨가 말했습니다. "이분이 세라 양의 후견인이십니다."`,
            `"후견인이라니요? 저 아이는 한 푼도 없습니다!"`,
            `"세라 양의 아버님이 남기신 재산은 그대로 있습니다. 액수를 말씀드리면 놀라실 겁니다."`,
            `민친 선생의 얼굴빛이 몇 번이나 달라졌습니다.`,
            `그러고는 갑자기 목소리를 바꾸었습니다.<br>"세라, 나는 너를 늘 아꼈단다. 그동안 조금 엄하게 대한 것은 다 너를 위해서였어."`,
            `세라는 아무 말도 하지 않고 그저 민친 선생을 보았습니다.`,
            `그 눈빛에 민친 선생은 말을 멈추었습니다. 그리고 그대로 돌아갔습니다.`,
            `그날 저녁 베키가 짐을 들고 옆집으로 왔습니다. 짐이라고 해야 보자기 하나였습니다.`,
            `"아가씨." 베키가 말했습니다. "저는 이제 뭐가 되나요?"<br>"내 곁에 있는 사람." 세라가 말했습니다.`
        ]
    },
    {
        num: 14,
        title: "빵집으로",
        emoji: "🥖",
        art: ["story-14-a.png", "story-14-b.png"],
        paras: [
            `며칠 뒤 세라는 캐리스퍼드 씨에게 가 보고 싶은 곳이 있다고 했습니다.`,
            `마차가 멈춘 곳은 어느 빵집 앞이었습니다.`,
            `빵집 아주머니는 잘 차려입은 아이를 보고 처음에는 알아보지 못했습니다. 그러다 얼굴을 보고 앞치마에 손을 닦았습니다.`,
            `"너, 그때 그 아이구나."<br>"네." 세라가 말했습니다. "그날 빵을 여섯 개 주셨지요."`,
            `"네 개 값밖에 안 받았는데도 그걸 다 남을 줬잖니." 아주머니가 말했습니다. "나는 그날 일을 아직도 생각한단다."`,
            `그때 가게 안쪽에서 여자아이 하나가 나왔습니다. 얼굴이 깨끗해지고 옷을 갖춰 입었지만, 세라는 그 아이를 알아보았습니다. 그날 계단 밑에 웅크려 있던 아이였습니다.`,
            `"앤이라고 한단다." 아주머니가 말했습니다. "그날부터 여기서 지내고 있어."`,
            `앤은 세라를 알아보고 얼굴이 빨개졌습니다.`,
            `"고마워." 앤이 말했습니다. 그날 했던 말과 같은 말이었습니다.`,
            `세라는 아주머니에게 부탁을 하나 했습니다.`,
            `"저처럼 배고픈 아이가 오면 빵을 주세요. 값은 제가 낼게요. 그 아이들에게는 값을 받지 마시고요."`,
            `"그러면 하루에 몇 명이 올지 모른다."<br>"몇 명이 와도 좋아요."`,
            `아주머니가 웃었습니다.<br>"그럼 앤이 나눠 주면 되겠구나. 그 애가 제일 잘 알 테니까."`,
            `세라는 앤에게 다가가 말했습니다.<br>"그때 네가 고맙다고 했잖아. 나는 그 말을 아직도 기억해."<br>앤은 대답하지 못하고 앞치마만 만지작거렸습니다.`,
            `앤이 고개를 들었습니다. 그리고 처음으로 웃었습니다.`,
            `돌아오는 마차에서 캐리스퍼드 씨가 물었습니다.<br>"세라, 그렇게 배가 고팠던 때가 힘들지 않았니?"`,
            `"힘들었어요." 세라가 말했습니다. "그런데 그때 굶어 보지 않았으면 그 아이가 얼마나 배고픈지 몰랐을 거예요."`,
            `캐리스퍼드 씨는 한참 창밖을 보다가 말했습니다.<br>"네 아버지가 너를 보셨으면 좋았을 텐데."`,
        ]
    },
    {
        num: 15,
        title: "그래도 공주",
        emoji: "👑",
        art: ["story-15-a.png", "story-15-b.png"],
        paras: [
            `세라는 캐리스퍼드 씨의 집에서 살게 되었습니다.`,
            `방에는 책이 벽을 채웠고, 창밖으로는 광장이 보였습니다. 아침에 눈을 뜨면 불이 지펴져 있었고, 옷은 몸에 맞았습니다.`,
            `그러나 세라는 예전의 세라와 조금 달라져 있었습니다.`,
            `어먼가드와 로티는 자주 놀러 왔습니다. 로티는 여전히 세라를 엄마라고 불렀습니다.`,
            `베키는 세라의 곁에서 지냈습니다. 이제 새벽에 일어나지 않아도 되었지만, 습관이 되어 한동안은 다섯 시면 눈이 떠졌습니다.`,
            `베키는 아침마다 눈을 뜨고 천장을 확인했습니다. 비스듬한 다락방 천장이 아니라는 것을 보고 나서야 다시 누웠습니다.`,
            `민친 선생의 학교는 그 뒤로 학생이 줄었습니다. 라비니아가 세라의 이야기를 떠들고 다녔기 때문에, 그 소문이 부모들에게까지 흘러갔던 것입니다.`,
            `어느 날 어먼가드가 물었습니다.<br>"세라, 그때 다락방에서 정말로 네가 공주라고 생각했어?"`,
            `"응."<br>"진짜로?"`,
            `"진짜로." 세라가 말했습니다. "그렇게 생각하지 않으면 견딜 수가 없었거든."`,
            `"그럼 지금도 공주야?"`,
            `세라는 창밖을 보았습니다. 광장 건너편에 민친 여학교의 지붕이 보였습니다. 그 꼭대기에 작은 창이 하나 있었습니다.`,
            `그 창 안쪽이 어떤 방인지 세라는 알고 있었습니다. 지금은 아무도 살지 않는 방이었습니다.`,
            `"공주라는 건 옷 이야기가 아니야." 세라가 말했습니다. "아무것도 없을 때 어떻게 하느냐 하는 이야기야. 화가 나도 함부로 말하지 않고, 배가 고파도 나보다 더 고픈 사람을 보면 나눠 주고."`,
            `"그거 어려워."<br>"어려워." 세라가 말했습니다. "그래서 하는 거야."`,
            `그날 저녁, 세라는 다시 그 작은 창을 올려다보았습니다.`,
            `저 방에서 자기가 무엇을 배웠는지 세라는 알고 있었습니다. 그리고 그것만은 누가 가져갈 수 없다는 것도요.`
        ]
    }
];
/* ── 쪽 나누기 ─────────────────────────────────────────
   그림이 있는 펼침면은 왼쪽 쪽에만 글이 들어가고,
   그림이 없는 펼침면은 양쪽 쪽에 모두 글이 들어간다.
   진짜 책이 그렇듯 문단 한가운데에서도 쪽을 넘긴다. 그래야 쪽마다 글이 고르게 찬다.
   글자 수로 어림잡으면 대사가 많은 문단은 실제로 차지하는 줄이 훨씬 많아 어긋나므로,
   보이지 않는 쪽을 하나 만들어 실제 높이를 재어 가며 나눈다. */

const PROBE = (() => {
    const book = document.getElementById('book');
    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;inset:10px;visibility:hidden;pointer-events:none;z-index:-1;';
    holder.innerHTML = '<div class="page page-story"><div class="story-page-left"><div class="probe-box"></div></div><div class="story-page-right"></div></div>';
    book.appendChild(holder);

    const col = holder.querySelector('.story-page-left');
    const box = holder.querySelector('.probe-box');
    box.style.display = 'flow-root';   // 문단의 아래 여백이 밖으로 새지 않게 한다

    const cs = getComputedStyle(col);
    const usable = col.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    box.innerHTML = '<h2>제목</h2>';
    const headHeight = box.getBoundingClientRect().height;

    return {
        // 창이 아직 크기를 갖지 못한 채 열리면 잰 값이 0이 된다. 그때는 어림값으로 버틴다.
        usable: usable > 40 ? usable : 620,
        headHeight: headHeight > 0 ? headHeight : 45,
        measure(html) {
            box.innerHTML = html;
            return box.getBoundingClientRect().height;
        },
        close() { book.removeChild(holder); }
    };
})();

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
function fillPages(segs, pageCount, headHeight, usable) {
    const ranges = [];
    let i = 0;
    for (let p = 0; p < pageCount; p++) {
        const rest = pageCount - p - 1;
        if (rest === 0) { ranges.push([i, segs.length]); break; }
        // 남은 글을 남은 쪽 수로 나눠 이번 쪽에 담을 양을 정한다.
        // 매 쪽마다 다시 계산하므로, 한 쪽이 덜 차면 그만큼이 뒤쪽에 고르게 얹힌다.
        const remainingH = PROBE.measure(runHtml(segs, i, segs.length)) + (p === 0 ? headHeight : 0);
        const target = remainingH / (rest + 1);
        const room = Math.min(usable, target) - (p === 0 ? headHeight : 0);
        const maxTake = Math.max(1, segs.length - i - rest);
        let take = 1;
        let lo = 1, hi = maxTake;
        while (lo <= hi) {
            const mid = (lo + hi) >> 1;
            if (PROBE.measure(runHtml(segs, i, i + mid)) <= room) { take = mid; lo = mid + 1; }
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
        ranges = fillPages(segs, pageCount, headHeight, usable);
        // 마지막 쪽이 넘치면 쪽을 늘려 다시 나눈다
        const lastH = PROBE.measure(runHtml(segs, ranges[ranges.length - 1][0], ranges[ranges.length - 1][1]));
        if (lastH <= usable || arts.length + textSpreads >= maxSpreads) break;
        textSpreads++;
    }
    if (!ranges) {
        slots = slotPlan(arts.length, textSpreads);
        ranges = fillPages(segs, slots.reduce((n, kind) => n + (kind === 'img' ? 1 : 2), 0), headHeight, usable);
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
                ${artFrame('cover.png', '👑')}
            </div>
            <div class="story-page-right">
                <h1>소공녀</h1>
                <p class="cover-tag">프랜시스 호지슨 버넷 원작</p>
                <p>인도에서 온 부잣집 딸 세라 크루가 런던의 기숙 학교에 들어옵니다. 그러나 열한 번째 생일날, 세라는 하루 만에 가진 것을 모두 잃고 그 학교의 하녀가 됩니다.</p>
                <p>가진 것이 하나도 없어진 뒤에도 세라가 끝내 놓지 않은 것이 무엇이었는지에 대한 이야기입니다.</p>
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
    { q: "세라 크루가 태어나 자란 곳은 어디입니까?", choices: ["인도", "프랑스", "러시아"], answer: 0 },
    { q: "세라가 아버지와 헤어지기 전에 산 것은 무엇입니까?", choices: ["새 드레스", "자기 키만 한 인형", "조랑말"], answer: 1 },
    { q: "세라가 프랑스어를 도와준 친구는 누구입니까?", choices: ["라비니아", "로티", "어먼가드"], answer: 2 },
    { q: "세라를 엄마라고 부른 아이는 누구입니까?", choices: ["로티", "앤", "베키"], answer: 0 },
    { q: "다락방 옆방에서 지낸 부엌데기 아이는 누구입니까?", choices: ["앤", "베키", "어먼가드"], answer: 1 },
    { q: "열한 번째 생일날 세라가 들은 소식은 무엇입니까?", choices: ["인도로 돌아간다는 것", "학교를 옮긴다는 것", "아버지가 돌아가셨다는 것"], answer: 2 },
    { q: "민친 선생이 세라에게 남겨 준 것은 무엇입니까?", choices: ["검은 옷과 인형", "책 몇 권", "아무것도 없었다"], answer: 0 },
    { q: "세라가 힘들 때 스스로에게 한 생각은 무엇입니까?", choices: ["곧 아버지가 오신다", "나는 공주다", "언젠가 갚아 주겠다"], answer: 1 },
    { q: "세라가 진창에서 주운 것은 무엇입니까?", choices: ["열쇠", "은화 한 닢", "반지"], answer: 1 },
    { q: "세라는 그 돈으로 산 빵을 어떻게 했습니까?", choices: ["베키와 나눠 먹었다", "혼자 다 먹었다", "더 배고픈 아이에게 주었다"], answer: 2 },
    { q: "옆집 신사가 세라를 찾고 있던 까닭은 무엇입니까?", choices: ["아버지의 친구였기 때문", "친척이었기 때문", "학교의 후원자였기 때문"], answer: 0 },
    { q: "다락방을 몰래 바꿔 놓은 사람은 누구입니까?", choices: ["빵집 아주머니", "램 다스", "카마이클 씨"], answer: 1 },
    { q: "세라의 정체가 밝혀진 계기는 무엇입니까?", choices: ["원숭이를 돌려주러 갔다가", "편지가 도착해서", "민친 선생이 말해서"], answer: 0 },
    { q: "아버지가 넣었던 다이아몬드 광산은 어떻게 되었습니까?", choices: ["완전히 망했다", "아주 큰 광산이었다", "다른 사람 손에 넘어갔다"], answer: 1 },
    { q: "세라가 빵집 아주머니에게 부탁한 것은 무엇입니까?", choices: ["앤을 데려가겠다는 것", "가게를 사겠다는 것", "배고픈 아이에게 빵을 주라는 것"], answer: 2 },
    { q: "세라가 말한 공주란 어떤 사람입니까?", choices: ["좋은 옷을 입은 사람", "아무것도 없을 때도 그렇게 하는 사람", "다이아몬드를 가진 사람"], answer: 1 }
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
            ${artFrame('end.png', '🕯️')}
            <h2>소공녀를 다 읽었습니다</h2>
            <a class="home-btn" href="../../../../../">학습 허브로 돌아가기</a>
        </div>`;
}

const PAGES = [
    { kind: 'cover' },
    ...TOC_GROUPS.map((_, i) => ({ kind: 'toc', part: i })),
    ...CHAPTERS.flatMap(paginateChapter),
    { kind: 'quiz' },
    { kind: 'end' }
];

PROBE.close();   // 쪽을 다 나눴으니 재는 데 쓰던 숨은 쪽은 치운다

const TWO_PAGE_KINDS = new Set(['chapter', 'toc', 'cover']);

let folioCounter = 0;
const FOLIOS = PAGES.map(p => {
    const width = TWO_PAGE_KINDS.has(p.kind) ? 2 : 1;
    const start = folioCounter + 1;
    folioCounter += width;
    return { start, width };
});

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
