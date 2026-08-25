const BOOK_TITLE = "효녀 심청";

const CHAPTER_LABEL = n => `${n}장 · `;

const CHAPTERS = [
    {
        num: 1,
        title: "젖동냥으로 기른 딸",
        emoji: "👶",
        art: ["story-01-a.png", "story-01-b.png", "story-01-c.png"],
        paras: [
            `옛날 황해도 황주 도화동에 심학규라는 사람이 살았습니다. 본디 글을 읽던 집안이었으나 살림이 기울어 가난하게 지냈습니다.`,
            `심학규는 스무 살 무렵 큰 병을 앓고 나서 앞을 보지 못하게 되었습니다. 그때부터 사람들은 그를 심 봉사<span class="gloss">(앞 못 보는 남자를 가리키던 옛말)</span>라 불렀습니다.`,
            `아내 곽 씨 부인은 삯바느질을 하고 남의 집 방아를 찧어 두 사람의 끼니를 이었습니다. 가난했지만 부부 사이는 더없이 좋았습니다.`,
            `혼인한 지 십여 년 만에 곽 씨 부인이 아이를 가졌습니다. 심 봉사는 그 소식에 밤새 잠을 이루지 못했습니다.`,
            `이듬해 봄에 딸이 태어났습니다. 이름을 청이라 지었습니다.`,
            `그런데 아이가 태어난 지 이레 만에 곽 씨 부인이 세상을 떠났습니다. 몸이 약한 데다 산후에 몸조리를 하지 못한 탓이었습니다.`,
            `심 봉사는 갓난아이를 안고 마당에 주저앉아 울었습니다. 앞이 보이지 않는 사람이 젖먹이를 어떻게 기른단 말입니까.`,
            `그러나 심 봉사는 울고만 있지 않았습니다. 이튿날부터 아이를 포대기에 싸서 업고 마을을 돌기 시작했습니다.`,
            `"이 댁에 젖먹이가 있다지요. 우리 아이 한 모금만 먹여 주십시오."`,
            `동네 아낙들이 아이를 받아 젖을 물렸습니다. 어떤 집에서는 미음을 쑤어 주었고, 어떤 집에서는 낡은 옷가지를 내주었습니다.`,
            `심 봉사는 아침에 나가 저녁에 돌아왔습니다. 하루에 열 집도 넘게 다녔습니다. 그 손에는 늘 지팡이가 들려 있었고, 등에는 늘 아이가 있었습니다.`,
            `그렇게 청이는 온 동네의 젖을 먹고 자랐습니다. 사람들이 말했습니다.<br>"저 아이는 도화동이 함께 기른 아이일세."`,
            `청이는 자라면서 아버지의 눈이 되었습니다.`,
            `여섯 살에 벌써 아버지의 손을 잡고 길을 안내했습니다.<br>"아버지, 여기 돌 있어요."<br>"아버지, 이제 왼쪽으로 도세요."`,
            `일곱 살에는 밥을 지었습니다. 부뚜막이 높아 발판을 놓고 올라서야 했습니다.`,
            `여덟 살이 되자 아버지를 집에 모셔 두고 혼자 동냥을 나섰습니다.<br>"아버지는 계세요. 제가 다녀올게요."<br>"안 된다. 어린것이 무슨 동냥이냐."<br>"아버지가 나가시면 제가 걱정되어 아무것도 못 해요."`,
            `청이는 바가지를 들고 이 집 저 집을 다녔습니다. 사람들은 그 어린것이 안쓰러워 밥을 두 술씩 더 떠 주었습니다.`,
            `그런데 청이는 얻어 온 밥을 제가 먼저 먹는 법이 없었습니다. 늘 아버지 앞에 놓고 물었습니다.<br>"아버지, 잡수셨어요?"<br>"오냐, 먹었다."`,
            `심 봉사가 밥그릇을 다 비우고 나면 청이는 그제야 부뚜막에 쪼그리고 앉아 남은 것을 먹었습니다. 어떤 날은 남은 것이 없어 물만 마셨습니다.`,
            `열두 살이 되자 청이는 삯바느질을 배웠습니다. 어머니가 하던 일이었습니다. 손끝이 야무져 금세 동네에서 이름이 났습니다.`,
            `열다섯이 되자 청이는 도화동에서 가장 부지런한 처녀가 되었습니다. 마을에서는 그를 심청이라 부르며 아꼈습니다.`,
            `장 승상 댁 부인이 그 소문을 듣고 심청을 불렀습니다. 부인은 심청을 보자마자 마음에 들어 했습니다.<br>"내 수양딸이 되지 않겠느냐. 네 아버지도 내가 돌보아 주마."`,
            `심청은 고개를 숙였습니다.<br>"고마우신 말씀입니다. 그러나 제가 없으면 아버지는 물 한 그릇도 못 뜨십니다."`,
            `부인은 그 말에 눈시울을 붉혔습니다. 그러고는 이렇게 말했습니다.<br>"언제든 힘든 일이 있거든 나를 찾아오너라."`
        ]
    },
    {
        num: 2,
        title: "공양미 삼백 석",
        emoji: "🌾",
        art: ["story-02-a.png", "story-02-b.png", "story-02-c.png"],
        paras: [
            `심청이 열다섯 되던 해 겨울이었습니다. 그날 심청은 장 승상 댁에 바느질감을 가져다주러 갔습니다.`,
            `날이 저물었는데도 딸이 돌아오지 않자 심 봉사는 걱정이 되었습니다.<br>"이것이 왜 이리 늦누."`,
            `기다리다 못한 심 봉사는 지팡이를 짚고 마중을 나섰습니다. 눈이 얼어붙은 길이었습니다.`,
            `개울에 놓인 다리를 건너려는데, 지팡이 끝이 얼음에 미끄러졌습니다.`,
            `첨벙— 하고 심 봉사가 물에 빠졌습니다. 겨울 물은 살을 에는 듯했습니다. 심 봉사는 어디가 뭍인지 알 수가 없어 허우적거리기만 했습니다.`,
            `"사, 사람 살려!"<br>목소리가 점점 잦아들었습니다.`,
            `그때 누군가 물속으로 뛰어들었습니다. 심 봉사를 끌어올려 뭍에 눕히고 등을 두드렸습니다.`,
            `심 봉사가 물을 토해 내고 겨우 정신을 차렸습니다.<br>"뉘, 뉘십니까."<br>"몽운사에서 온 중입니다."`,
            `스님은 심 봉사를 부축해 집까지 데려다주었습니다. 젖은 옷을 갈아입히고 불을 지펴 주었습니다.`,
            `심 봉사는 스님의 손을 잡고 흐느꼈습니다.<br>"이 은혜를 어찌 갚습니까. 사실 나는 죽는 것이 두려운 것이 아니라, 내가 죽으면 우리 청이가 혼자 남을 것이 두렵습니다."`,
            `스님이 한참 동안 심 봉사의 얼굴을 들여다보았습니다.<br>"댁의 눈은 못 고칠 눈이 아닙니다."`,
            `심 봉사가 고개를 번쩍 들었습니다.<br>"그, 그게 무슨 말씀입니까."`,
            `"우리 절 부처님께 공양미<span class="gloss">(부처님께 바치는 쌀)</span> 삼백 석을 올리고 정성껏 빌면 눈을 뜨실 것입니다."`,
            `심 봉사는 그 말을 듣자마자 앞뒤를 재지 않았습니다.<br>"바치겠습니다! 삼백 석을 바치겠습니다!"`,
            `스님이 놀라 물었습니다.<br>"댁의 형편에 삼백 석이 가당키나 합니까."<br>"됩니다! 적어 주십시오!"`,
            `스님은 마지못해 시주 책자에 심학규라는 이름과 삼백 석을 적었습니다. 그러고는 몇 번이나 뒤를 돌아보며 절로 돌아갔습니다.`,
            `스님이 떠나고 나자 심 봉사는 그제야 정신이 들었습니다.`,
            `삼백 석이라니. 이 집에는 쌀 세 되도 없었습니다. 논 한 뙈기, 밭 한 뙈기 없는 사람이 무슨 수로 삼백 석을 마련한단 말입니까.`,
            `심 봉사는 방바닥을 치며 후회했습니다.<br>"아이고, 내가 미쳤지. 부처님을 속인 죄를 어찌 받으려고."`,
            `밤늦게 심청이 돌아왔습니다. 아버지가 이불을 뒤집어쓰고 누워 있었습니다.<br>"아버지, 어디 편찮으세요?"`,
            `심 봉사는 처음에는 말하지 않으려 했습니다. 그러나 딸이 자꾸 묻자 결국 털어놓고 말았습니다.`,
            `이야기를 다 들은 심청은 한참 동안 아무 말이 없었습니다. 그러고는 이렇게 말했습니다.<br>"잘하셨어요, 아버지."`,
            `"잘하다니. 우리가 무슨 수로."<br>"부처님께서 하신 약속인데 설마 못 지키게 하시겠어요. 걱정 마시고 주무세요."`,
            `그날 밤 심청은 뒤뜰로 나가 정화수 한 그릇을 떠 놓고 오래도록 빌었습니다. 어머니가 살아 계실 때 하던 그대로였습니다.`
        ]
    },
    {
        num: 3,
        title: "뱃사람들과 거짓말",
        emoji: "⛵",
        art: ["story-03-a.png", "story-03-b.png", "story-03-c.png"],
        paras: [
            `며칠 뒤 심청은 마을 어귀에서 낯선 사람들을 보았습니다. 뱃사람 차림의 사내 여럿이 무언가를 붙이고 있었습니다.`,
            `심청이 다가가 물었습니다.<br>"무슨 일이신지요."`,
            `우두머리로 보이는 사내가 대답했습니다.<br>"우리는 남경으로 장사를 다니는 배꾼들이오. 가는 길에 인당수라는 곳을 지나야 하는데, 그 물길이 어찌나 사나운지 해마다 배가 여러 척 뒤집힌다오."`,
            `"그런데요?"<br>"예로부터 그 바다는 열다섯 처녀를 제물로 받으면 잔잔해진다고 하오. 그래서 사람을 구하고 있소. 값은 얼마든지 치르겠소."`,
            `심청의 가슴이 크게 뛰었습니다.`,
            `"…얼마든지라 하셨습니까."<br>"그렇소."<br>"쌀 삼백 석도 가능합니까."`,
            `사내들이 심청을 돌아보았습니다.<br>"가능하오. 그런데 왜 묻는 게요."`,
            `"제가 가겠습니다."`,
            `사내들이 한참 동안 말을 잇지 못했습니다. 우두머리가 심청의 얼굴을 살폈습니다.<br>"낭자, 이건 장난이 아니오. 바다에 몸을 던지는 일이오."<br>"압니다."`,
            `"어찌하여 그런 결심을 하셨소."<br>심청은 담담하게 말했습니다.<br>"저희 아버지가 앞을 못 보십니다. 쌀 삼백 석을 절에 바치면 눈을 뜨신다고 합니다."`,
            `우두머리가 고개를 돌렸습니다. 그 곁의 젊은 뱃사람 하나는 아예 소매로 눈을 눌렀습니다.`,
            `"…쌀은 언제 보내 드리면 되겠소."<br>"오늘 안에 몽운사로 보내 주십시오. 저는 배 떠나는 날에 나가겠습니다."<br>"떠나는 날은 삼월 보름이오."`,
            `그날 저녁 심청은 아버지 앞에 앉았습니다.`,
            `"아버지, 좋은 소식이 있어요. 공양미 삼백 석이 마련되었어요."`,
            `심 봉사가 벌떡 일어났습니다.<br>"뭐라고! 어떻게!"`,
            `심청은 미리 생각해 둔 말을 꺼냈습니다.<br>"장 승상 댁 부인께서 저를 수양딸로 삼고 싶어 하셨잖아요. 그 댁에 들어가기로 했어요. 대신 삼백 석을 절에 보내 주시기로 했고요."`,
            `"수양딸이라니. 그러면 너는 그 댁에서 살게 되는 것이냐."<br>"삼월 보름에 들어가요. 아버지도 자주 뵈러 올게요."`,
            `심 봉사는 처음에는 서운해했습니다. 그러나 곧 기뻐했습니다.<br>"잘되었다. 잘되었어. 그 댁에 가면 너도 고생을 면하겠구나."`,
            `심청은 웃으며 대답했습니다.<br>"예, 아버지."<br>그러고는 얼른 부엌으로 나갔습니다. 아버지가 볼 수 없다는 것이 그날처럼 다행스러운 적이 없었습니다.`,
            `그날부터 심청은 밤마다 바느질을 했습니다. 아버지의 사철 옷을 다 지어 놓았습니다. 봄옷, 여름옷, 가을옷, 겨울옷을 차례로 개어 장롱에 넣었습니다.`,
            `버선도 여러 켤레 지었습니다. 마을 아낙들에게는 따로 부탁을 해 두었습니다.<br>"제가 없는 동안 아버지 진지를 좀 챙겨 주세요."`,
            `삼월 보름 전날 밤이었습니다. 심청은 아버지의 밥상을 어느 때보다 정성껏 차렸습니다.`,
            `심 봉사가 밥을 먹다 말고 물었습니다.<br>"오늘은 반찬이 유난하구나. 무슨 날이냐."<br>"…그냥요."`,
            `그날 밤 심청은 잠든 아버지의 곁에 앉아 밤을 새웠습니다. 아버지의 손을 잡았다 놓았다 하며, 얼굴을 오래오래 들여다보았습니다.`
        ]
    },
    {
        num: 4,
        title: "인당수",
        emoji: "🌊",
        art: ["story-04-a.png", "story-04-b.png", "story-04-c.png"],
        paras: [
            `새벽닭이 울었습니다. 심청은 아버지의 아침상을 차려 놓고 옷을 갈아입었습니다.`,
            `그때 대문 밖에서 뱃사람들의 목소리가 들렸습니다.<br>"낭자, 때가 되었소."`,
            `심 봉사가 잠에서 깼습니다.<br>"밖에 누가 왔느냐."<br>"장 승상 댁에서 저를 데리러 왔어요."`,
            `그런데 대문 밖의 목소리가 사내들의 것이었습니다. 심 봉사가 고개를 갸웃했습니다.<br>"승상 댁에서 웬 사내들이 온단 말이냐."`,
            `심청은 아버지 앞에 무릎을 꿇었습니다. 그러고는 마지막 절을 올렸습니다.`,
            `"아버지."<br>"오냐."<br>"몸조심하세요. 진지 거르지 마시고요."<br>"오냐, 오냐. 너나 잘 지내라."`,
            `심청이 자리에서 일어섰습니다. 문지방을 넘는데 발이 떨어지지 않았습니다.`,
            `그때 마을 아낙 하나가 참지 못하고 울음을 터뜨렸습니다.<br>"아이고, 심청아……."`,
            `심 봉사가 그 소리를 들었습니다.<br>"저 사람은 왜 우는 게냐."`,
            `대답이 없었습니다. 심 봉사는 그제야 무언가 잘못되었다는 것을 알아챘습니다. 그는 지팡이도 짚지 않고 마당으로 뛰쳐나갔습니다.`,
            `"청아! 청아! 어디 있느냐!"<br>심 봉사는 마당에서 허공을 더듬었습니다. 손에 아무것도 잡히지 않았습니다.`,
            `"이놈들아! 내 딸을 어디로 데려가느냐! 눈이 다 무엇이냐! 나는 눈 안 떠도 좋다! 내 딸을 다오!"<br>심 봉사가 대문 밖으로 몇 걸음 쫓아 나가다 돌부리에 걸려 넘어졌습니다. 마을 사람들이 달려와 그를 붙들었습니다. 길 저편에서 심청이 딱 한 번 뒤를 돌아보았습니다.`,
            `배는 사흘을 나아갔습니다. 심청은 뱃머리에 앉아 바다만 보았습니다.`,
            `뱃사람들은 심청을 정성껏 대접했습니다. 좋은 밥을 지어 올리고, 밤이면 따로 자리를 마련해 주었습니다. 그러면서도 아무도 심청과 눈을 마주치지 못했습니다.`,
            `젊은 뱃사람 하나가 밤중에 심청 곁에 와서 말했습니다.<br>"낭자, 지금이라도 마음을 돌리시오. 우리가 뭍에 내려 드리리다. 쌀은 이미 절에 보냈으니 그냥 두면 되오."`,
            `심청이 고개를 저었습니다.<br>"그러면 부처님을 속이는 것이 됩니다. 아버지가 눈을 못 뜨실 거예요."`,
            `나흘째 되던 날 아침, 배가 인당수에 이르렀습니다.`,
            `바다가 갑자기 달라졌습니다. 방금까지 잔잔하던 물이 시커멓게 소용돌이치기 시작했습니다. 배가 위아래로 크게 흔들렸습니다.`,
            `뱃사람들이 돛을 내리고 제물상을 차렸습니다. 향을 피우고 절을 올렸습니다.`,
            `우두머리가 심청 앞에 와서 무릎을 꿇었습니다.<br>"낭자, 우리는 평생 이 죄를 지고 살 것이오."`,
            `심청은 그를 일으켜 세웠습니다.<br>"제가 스스로 온 것입니다. 다만 한 가지만 부탁드리겠습니다."<br>"무엇이든 말씀하시오."<br>"돌아가시는 길에 도화동에 들러 저희 아버지가 살아 계신지만 보아 주세요."`,
            `심청은 뱃머리로 걸어갔습니다. 그러고는 서쪽 하늘을 향해 두 손을 모았습니다.`,
            `"하늘이시여. 이 몸은 아깝지 않으나 저희 아버지의 눈은 꼭 뜨게 해 주십시오."`,
            `그러고는 치맛자락을 머리에 뒤집어쓰고 소용돌이 속으로 몸을 던졌습니다. 물살이 한 번 크게 일었다가 이내 잔잔해졌습니다. 뱃사람들이 뱃전에 엎드려 통곡했습니다.`
        ]
    },
    {
        num: 5,
        title: "물 아래, 그리고 연꽃",
        emoji: "🪷",
        art: ["story-05-a.png", "story-05-b.png", "story-05-c.png"],
        paras: [
            `심청은 물속으로 한없이 가라앉았습니다. 이상하게도 숨이 막히지 않았습니다.`,
            `얼마쯤 내려갔을까요. 발밑이 환해지더니 누군가 심청의 몸을 받쳐 들었습니다.`,
            `눈을 떠 보니 옥으로 만든 가마 위였습니다. 좌우로 낯선 사람들이 늘어서서 절을 하고 있었습니다.`,
            `"어서 오십시오."<br>"…여기가 어디입니까."<br>"물 아래 용궁입니다."`,
            `심청은 커다란 궁궐로 안내되었습니다. 기둥은 산호요 바닥은 진주였습니다. 사람들이 심청을 상석에 앉히고 상을 차려 올렸습니다.`,
            `"저는 제물로 바쳐진 몸입니다. 이런 대접을 받을 까닭이 없습니다."<br>"낭자께서는 제물이 아니십니다. 하늘이 낭자를 여기로 보내신 것입니다."`,
            `며칠이 지난 어느 날, 궁의 발이 걷히고 한 부인이 들어왔습니다.`,
            `심청은 그 얼굴을 본 적이 없었습니다. 그런데도 가슴이 먼저 알아보았습니다.`,
            `"…어머니?"<br>곽 씨 부인이었습니다. 부인은 심청을 끌어안고 오래도록 놓지 않았습니다.`,
            `"내 딸이 이렇게 컸구나. 손이 어쩌다 이리 거칠어졌누."<br>심청은 어머니의 품에서 처음으로 소리 내어 울었습니다. 열다섯 해 동안 참았던 울음이었습니다.`,
            `며칠 뒤 어머니가 말했습니다.<br>"이제 돌아가야 한다."<br>"어머니, 여기 있으면 안 됩니까."<br>"네 아버지가 아직 눈을 못 뜨셨다."`,
            `심청이 고개를 들었습니다.<br>"쌀 삼백 석을 바쳤는데도요?"<br>"쌀로 뜨는 눈이 아니란다. 네가 가야 뜨는 눈이다."`,
            `이별하는 날, 어머니는 심청을 커다란 연꽃 봉오리 속에 앉혔습니다.`,
            `"이 안에서 잠들어 있거라. 눈을 뜨면 다시 세상이다."<br>"어머니는요?"<br>"나는 여기서 늘 보고 있으마."`,
            `꽃잎이 하나씩 오므라들었습니다. 심청은 그 안에서 스르르 잠이 들었습니다.`,
            `연꽃은 천천히 떠올랐습니다. 물살을 따라 흔들리며, 며칠이 걸려 인당수 한복판에 이르렀습니다.`,
            `그 무렵 남경에서 장사를 마치고 돌아오던 배 한 척이 인당수를 지나고 있었습니다. 심청을 데려갔던 바로 그 배였습니다.`,
            `뱃사람들은 그 바다를 지날 때마다 술을 붓고 절을 했습니다. 그날도 뱃전에 상을 차리고 있는데, 물 위에 무언가 떠 있는 것이 보였습니다.`,
            `"저것이 무엇이냐."<br>"꽃입니다! 연꽃입니다!"`,
            `한겨울도 아니고 연못도 아닌 바다 한복판에, 사람 키만 한 붉은 연꽃 한 송이가 떠 있었습니다.`,
            `우두머리가 배를 대게 했습니다. 꽃을 건져 올리자 배 전체에 은은한 향이 퍼졌습니다.`,
            `"이것은 예사 꽃이 아니다."<br>뱃사람들은 그 꽃을 배 한가운데에 모셔 두고 뭍으로 향했습니다.`,
            `뭍에 닿자 소문이 삽시간에 퍼졌습니다. 바다에서 건진 신비한 연꽃 이야기는 곧 대궐까지 들어갔습니다.`,
            `그 무렵 나라의 임금은 왕후를 여의고 홀로 지내고 있었습니다. 임금은 그 꽃 이야기를 듣고 뱃사람들을 불렀습니다.<br>"그 꽃을 궐로 들여라."`
        ]
    },
    {
        num: 6,
        title: "맹인 잔치",
        emoji: "👑",
        art: ["story-06-a.png", "story-06-b.png", "story-06-c.png"],
        paras: [
            `연꽃은 대궐 뜰에 놓였습니다. 임금은 날마다 그 앞에 나와 꽃을 보았습니다.`,
            `며칠이 지난 밤이었습니다. 달빛이 유난히 밝았습니다. 그 빛을 받은 꽃잎이 하나씩 열리기 시작했습니다.`,
            `꽃 속에 처녀 하나가 앉아 있었습니다. 궁 안이 발칵 뒤집혔습니다.`,
            `임금이 물었습니다.<br>"그대는 누구인가."<br>"저는 황주 도화동에 살던 심청이라 하옵니다."`,
            `심청은 있었던 일을 하나도 숨기지 않고 아뢰었습니다. 앞 못 보는 아버지, 공양미 삼백 석, 인당수.`,
            `임금은 이야기를 다 듣고 한참 동안 말이 없었습니다. 그러고는 이렇게 말했습니다.<br>"하늘이 이 나라에 보낸 사람이로다."`,
            `그해 가을 심청은 왕후가 되었습니다. 온 나라가 그 혼례를 축하했습니다.`,
            `그러나 심청은 웃지 않았습니다. 대궐의 비단옷도, 산해진미도 마음에 들어오지 않았습니다.`,
            `임금이 물었습니다.<br>"무엇이 그리 마음에 걸리시오."<br>"아버지가 살아 계신지조차 알 수 없습니다."`,
            `임금은 사람을 풀어 황주 도화동을 뒤졌습니다. 그러나 심학규라는 사람은 이미 그 마을을 떠난 뒤였습니다. 딸이 죽은 뒤 마을에 있을 수가 없어 어디론가 떠났다는 것이었습니다.`,
            `심청은 여러 날 밤을 새웠습니다. 그러다 어느 날 아침 임금 앞에 나아가 아뢰었습니다.`,
            `"이 나라의 앞 못 보는 사람을 모두 대궐로 불러 잔치를 열어 주십시오. 사흘도 좋고 열흘도 좋습니다. 다 오실 때까지 열어 주십시오."<br>임금이 고개를 끄덕였습니다.<br>"그리하시오."`,
            `방이 팔도에 붙었습니다. 앞 못 보는 사람은 누구든 대궐로 오라는 방이었습니다. 오는 길의 밥과 잠자리는 나라에서 대 준다고 했습니다.`,
            `사람들이 길을 나섰습니다. 지팡이를 짚고, 서로 어깨를 붙들고, 아이 손에 이끌려 한양으로 향했습니다.`,
            `그 무렵 심 봉사는 어느 낯선 고을을 떠돌고 있었습니다. 딸을 보낸 뒤 도화동을 떠나 정처 없이 다니던 참이었습니다.`,
            `방 소식을 들은 심 봉사는 처음에는 가지 않으려 했습니다.<br>"내가 무슨 낯으로 밥을 얻어먹는단 말인가."`,
            `그러나 마을 사람이 등을 떠밀었습니다.<br>"가 보시오. 밥이라도 한 끼 잡숫고 오시오."`,
            `심 봉사는 지팡이를 짚고 길을 나섰습니다. 노잣돈이라고는 몇 푼이 전부였습니다.`,
            `가는 길에 이런저런 일을 겪었습니다. 주막에서 만난 사람이 좋은 길을 알려 주겠다며 앞장서더니, 자는 사이에 봇짐과 노잣돈을 몽땅 들고 달아났습니다.`,
            `심 봉사는 빈손으로 남았습니다. 그래도 걸었습니다. 남의 집 처마 밑에서 자고, 얻어먹고, 또 걸었습니다.`,
            `그러다 발을 헛디뎌 도랑에 빠지기도 하고, 길을 잘못 들어 하루를 헤매기도 했습니다.`,
            `한양에 닿았을 때는 잔치가 시작된 지 이미 여러 날이 지난 뒤였습니다. 옷은 다 해지고 발은 부르터 있었습니다.`,
            `대궐 문 앞에서 관리가 말했습니다.<br>"오늘이 마지막 날이오. 어서 들어가시오."`,
            `심 봉사는 그 말에 안도했습니다. 그러고는 지팡이로 문지방을 더듬으며 대궐 안으로 들어섰습니다.`
        ]
    },
    {
        num: 7,
        title: "눈을 뜨다",
        emoji: "👁️",
        art: ["story-07-a.png", "story-07-b.png", "story-07-c.png"],
        paras: [
            `잔치 마당에는 앞 못 보는 사람들이 가득 앉아 있었습니다. 상마다 밥과 국이 올라 있었습니다.`,
            `심청은 발 뒤에 앉아 하루 종일 그 마당을 내려다보았습니다. 벌써 여러 날째였습니다.`,
            `관리가 명부를 들고 다니며 이름을 적었습니다. 심청은 그 이름을 하나하나 확인했습니다. 심학규라는 이름은 나오지 않았습니다.`,
            `마지막 날 저녁이었습니다. 상이 거의 다 치워지고 사람들이 하나둘 일어서고 있었습니다.`,
            `그때 마당 끝자리에 늦게 들어온 노인 하나가 앉았습니다. 옷이 몹시 해지고 머리가 온통 하얀 노인이었습니다.`,
            `관리가 다가가 물었습니다.<br>"이름을 대시오."<br>"…황주 도화동 심학규올시다."`,
            `발 뒤에서 무언가 쓰러지는 소리가 났습니다. 심청이 자리에서 벌떡 일어서다 병풍을 넘어뜨린 것입니다.`,
            `심청은 발을 걷고 마당으로 뛰어 내려갔습니다. 왕후의 옷자락이 흙에 끌렸지만 아무도 말리지 못했습니다.`,
            `심청이 그 노인 앞에 무릎을 꿇었습니다. 목이 메어 말이 나오지 않았습니다.`,
            `노인이 인기척에 고개를 들었습니다.<br>"뉘시오."`,
            `심청이 겨우 입을 열었습니다.<br>"아버지."`,
            `노인의 몸이 굳었습니다. 지팡이가 손에서 떨어졌습니다.<br>"…무어라 하셨소."<br>"아버지. 저예요. 청이예요."`,
            `심 봉사가 손을 뻗어 허공을 더듬었습니다.<br>"아니다. 아니야. 우리 청이는 물에 빠져 죽었소. 내가 그 아이를 물에 팔아먹은 사람이오."`,
            `"살아 있어요, 아버지. 여기 있어요."<br>심청이 아버지의 손을 잡아 제 얼굴에 갖다 댔습니다.`,
            `심 봉사의 손끝이 딸의 이마를, 눈을, 볼을 더듬었습니다. 손이 몹시 떨렸습니다.`,
            `"청이냐. 정말 청이냐. 내가 네 얼굴을 한 번도 못 봤는데. 어떻게 생겼는지도 모르는데."`,
            `"아버지."<br>"아이고, 내 딸아! 어디 좀 보자! 어디 좀 보자!"`,
            `심 봉사가 두 눈을 부릅떴습니다. 그 순간이었습니다.`,
            `눈앞이 번쩍하더니 무언가 걷혔습니다. 캄캄하던 자리에 빛이 들어왔습니다.`,
            `흐릿하던 것이 차츰 또렷해졌습니다. 그리고 심 봉사는 스물다섯 해 만에 세상을 보았습니다.`,
            `가장 먼저 보인 것은 제 앞에 무릎 꿇고 앉은 딸의 얼굴이었습니다.`,
            `"…청아."<br>부녀가 마당 한가운데에서 서로를 끌어안았습니다.`,
            `그런데 그때 마당 곳곳에서 소리가 터져 나왔습니다.<br>"보인다!"<br>"내가 보인다!"`,
            `잔치에 왔던 사람들이 하나둘 눈을 떴습니다. 지팡이가 땅에 떨어지는 소리가 마당 가득 울렸습니다. 늦게 도착해 문밖에 있던 사람들까지 눈을 떴습니다.`,
            `그날 대궐 마당에서 온 나라의 앞 못 보는 사람이 다 눈을 떴다고 합니다. 사람들은 그것을 심청의 효성이 하늘에 닿은 것이라 했습니다.`,
            `심 봉사는 그 뒤로 오래 살았습니다. 사람들이 딸 자랑을 청하면 늘 이렇게 말했다고 합니다.<br>"내 딸이 나를 살렸다고들 하는데, 그건 아니오. 저 아이는 내 눈을 뜨게 한 것이 아니라, 내가 눈을 뜨고 싶게 만든 것이오."`
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
                ${artFrame('cover.png', '🪷')}
            </div>
            <div class="story-page-right">
                <h1>효녀 심청</h1>
                <p>심청전은 지은이가 알려지지 않은 조선 후기 소설이에요. 판소리 심청가로 불리던 것이 글로 옮겨진 것이지요.</p>
                <p>이야기의 무대인 인당수는 황해도 앞바다에 있었다고 전해지는 물길이에요. 물살이 사납기로 이름나, 뱃사람들은 그 바다를 지날 때 제사를 지냈답니다.</p>
                <p>사람을 제물로 바쳐 물길을 달랜다는 이야기는 아주 오래된 것이에요. 심청전은 그 옛 이야기를 뒤집어 놓았어요. 물에 빠진 사람이 죽지 않고 도로 살아 돌아오고, 그 힘으로 온 나라의 눈먼 사람이 눈을 뜨거든요.</p>
                <p>판소리 심청가에서 가장 유명한 대목은 심 봉사가 눈을 뜨는 마지막 장면이에요. 소리꾼이 그 대목에 이르면 듣는 사람들이 다 같이 울었다고 전해진답니다.</p>
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
    { q: "심 봉사가 앞을 못 보게 된 것은 언제입니까?", choices: ["태어날 때부터 그러했다고 한다", "스무 살 무렵 병을 앓고 나서", "싸움을 하다 크게 다쳐서"], answer: 1 },
    { q: "어린 심청을 먹여 살린 것은 무엇입니까?", choices: ["절에서 보내 준 쌀", "외가에서 보낸 돈", "동네 아낙들의 젖동냥"], answer: 2 },
    { q: "심 봉사가 물에 빠졌을 때 구해 준 사람은 누구입니까?", choices: ["몽운사 스님", "뱃사람 하나", "이웃집 노인"], answer: 0 },
    { q: "스님이 눈을 뜨려면 무엇이 필요하다고 했습니까?", choices: ["백일 동안의 기도", "귀한 약초 한 뿌리", "공양미 삼백 석"], answer: 2 },
    { q: "뱃사람들이 사람을 구한 까닭은 무엇입니까?", choices: ["인당수를 무사히 건너려고", "배에서 일할 사람이 없어서", "임금의 명을 받아서"], answer: 0 },
    { q: "심청은 아버지에게 뭐라고 둘러댔습니까?", choices: ["몽운사에 일을 하러 간다고", "장 승상 댁 수양딸이 된다고", "먼 외가에 잠깐 다녀온다고"], answer: 1 },
    { q: "심청이 인당수로 떠나던 날은 언제입니까?", choices: ["정월 초하루", "삼월 보름", "팔월 한가위"], answer: 1 },
    { q: "물에 빠진 심청을 받아 준 것은 무엇입니까?", choices: ["지나가던 고깃배", "커다란 거북 한 마리", "용궁에서 온 이들"], answer: 2 },
    { q: "심청은 무엇에 실려 물 위로 돌아왔습니까?", choices: ["커다란 연꽃 한 송이", "금빛 배 한 척", "흰 구름 한 조각"], answer: 0 },
    { q: "뱃사람들은 그 꽃을 어떻게 했습니까?", choices: ["그 자리에 두고 그냥 갔다", "가까운 절에 가져다주었다", "배에 싣고 가 임금께 바쳤다"], answer: 2 },
    { q: "왕후가 된 심청이 연 것은 무엇입니까?", choices: ["앞 못 보는 이들의 잔치", "글재주를 겨루는 자리", "나라의 큰 제사"], answer: 0 },
    { q: "심 봉사가 잔치에 늦은 까닭은 무엇입니까?", choices: ["가는 길을 잃어버려서", "노잣돈을 몽땅 잃어서", "몸이 아파 앓아누워서"], answer: 1 },
    { q: "심 봉사는 언제 눈을 떴습니까?", choices: ["잔치 음식을 먹은 뒤", "딸을 알아본 순간", "왕후가 약을 준 뒤"], answer: 1 },
    { q: "심 봉사가 눈을 뜨자 무슨 일이 벌어졌습니까?", choices: ["하늘에서 꽃비가 쏟아져 내렸다", "인당수 물살이 잔잔해졌다", "잔치에 온 이들이 다 눈을 떴다"], answer: 2 }
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
    emoji: '👁️',
    art: ['end.png'],
    paras: [
        `이 이야기는 책이기 전에 노래였습니다. 소리꾼 한 사람이 북 치는 사람 하나만 데리고 서너 시간을 내리 부르는 「심청가」가 먼저 있었고, 그것을 글로 옮겨 적은 것이 지금 읽은 『심청전』입니다.`,
        `판소리로 지금까지 남아 전하는 것은 다섯 마당입니다. 춘향가, 심청가, 흥보가, 수궁가, 적벽가. 이 가운데 세 마당이 이 서가에 소설로 들어와 있습니다. 춘향전, 심청전, 그리고 흥부전입니다. 수궁가는 토끼전이 되었으니 넷인 셈입니다.`,
        `그래서 이 이야기에는 지은이가 없습니다. 한 사람이 앉아서 지어낸 것이 아니라, 소리꾼들이 부르고 또 부르면서 조금씩 고쳐 온 것이기 때문입니다. 사람들이 울던 대목은 더 늘었고, 지루해하던 대목은 저절로 줄었습니다.`,
        `그러다 보니 책마다 내용이 다릅니다. 옛날에 서울에서 찍어 팔던 것과 전주에서 찍어 팔던 것을 견주어 보면 길이부터 세 배 가까이 차이가 납니다. 어느 쪽이 진짜인지 따질 수가 없습니다. 둘 다 진짜입니다.`,
        `이 책에도 덜어 낸 대목이 있습니다. 원래 이야기에는 심청이 떠난 뒤에 뺑덕 어멈이라는 사람이 나옵니다. 심 봉사에게 붙어살면서 딸이 남기고 간 재물을 야금야금 축내고, 맹인 잔치를 찾아가는 길에서는 그마저 챙겨 달아나 버립니다. 심 봉사가 빈털터리로 대궐에 닿게 만드는 대목입니다.`,
        `이 이야기의 뿌리로 흔히 세 가지를 꼽습니다. 『삼국사기』에 실린 효녀 지은 이야기는 가난한 딸이 제 몸을 남의 집에 팔아 어머니를 봉양한 이야기입니다. 『삼국유사』의 거타지 이야기에는 사람을 제물로 바치는 바다가 나옵니다. 전라도 관음사에 전해 오는 원홍장 이야기는 눈먼 아버지를 둔 딸이 뱃사람들에게 팔려 가는 이야기입니다.`,
        `사람을 제물로 바다에 바치는 이야기는 우리나라에만 있는 것이 아닙니다. 배를 타고 먼바다로 나가야 먹고사는 곳이면 어디든 비슷한 이야기가 있습니다. 그만큼 바다가 무서웠다는 뜻입니다.`,
        `그런데 심청은 그런 이야기들과 한 군데가 다릅니다. 끌려간 것이 아니라 제 발로 갔습니다. 값을 매기고 흥정을 한 것도 심청 자신입니다. 제물이 된 사람이 아니라 제 몸을 팔기로 정한 사람입니다. 이 한 가지 차이 때문에 이야기가 완전히 달라집니다.`,
        `공양미 삼백 석이라는 셈도 한 번 짚어 볼 만합니다. 삼백 석은 어른 백 사람이 한 해를 먹고도 남을 쌀입니다. 동냥으로 딸을 키운 집에서 마련할 수 있는 양이 아닙니다. 애초에 갚을 수 없는 값이었습니다.`,
        `그것이 이 이야기의 급소입니다. 심 봉사는 눈이 보이지 않으니 쌀 삼백 석이 마당에 쌓이면 얼마나 되는지를 볼 수 없었습니다. 보았다면 그 자리에서 스님을 붙들었을 것입니다. 약속을 한 것이 아니라, 얼마나 큰 약속인지 모른 채 고개를 끄덕인 것입니다.`,
        `삼 장을 다시 펴 보십시오. 심청이 아버지에게 장 승상 댁 수양딸로 간다고 둘러대는 대목이 있습니다. 이 책에서 심청이 하는 유일한 거짓말입니다. 효도한 딸이 아버지를 속이고 떠난 것입니다. 이야기가 그 거짓말을 나무라지 않는 까닭도 생각해 볼 만합니다.`,
        `장 승상 댁 부인이 삼백 석을 대신 내주겠다고 했을 때 심청이 그 길을 마다한 것도 그렇습니다. 돈만 놓고 보면 받는 편이 낫습니다. 심청이 마다한 것은 값을 치르지 않고 얻은 것이 아버지의 눈이 되어서는 안 된다고 여겼기 때문입니다.`,
        `인당수는 지어낸 곳이 아닙니다. 서해 백령도 앞바다의 물살 센 자리를 그렇게 불렀다고 전해 옵니다. 지금도 백령도에는 심청을 기리는 집이 서 있고, 맞은편 황해도 땅에 심청이 나고 자란 마을이 있었다는 말도 함께 전해 옵니다.`,
        `심청이 다시 나온 자리가 하필 연꽃인 것에도 까닭이 있습니다. 연꽃은 맑은 물에서 피지 않습니다. 진창에 뿌리를 박고 그 위로 깨끗한 꽃을 밀어 올립니다. 이 이야기를 지어 온 사람들이 절과 가까웠던 것을 생각하면, 연꽃을 고른 것은 우연이 아닙니다.`,
        `마지막 장에서 심 봉사가 눈을 뜬 것은 약을 먹어서가 아닙니다. 쌀 삼백 석을 절에 바쳐서도 아닙니다. 쌀은 벌써 오래전에 들어갔는데 눈은 그대로였습니다. 눈이 떠진 것은 딸의 목소리를 들은 그 자리에서였습니다.`,
        `그리고 그날 눈을 뜬 사람은 심 봉사만이 아니었습니다. 잔치에 왔던 사람도, 늦게 와서 문밖에 서 있던 사람도 다 떴습니다. 한 사람의 일로 끝내지 않은 것입니다. 옛이야기가 좋은 일을 마무리하는 방식이 대개 이렇습니다.`,
        `이 이야기를 효도 이야기로만 읽으면 절반만 읽은 것이 됩니다. 효도 이야기라면 심청이 인당수에 몸을 던지는 데서 끝나야 합니다. 그런데 이야기는 거기서 끝나지 않고 심청을 기어이 되돌려 놓습니다. 이 이야기를 지어 온 사람들도 그대로 보내지는 못한 것입니다.`,
        `심 봉사도 다시 보아야 할 사람입니다. 이 사람은 딸을 팔아 눈을 뜬 아버지입니다. 그것을 알고 나서 이 사람이 어떻게 살았을지 생각해 보면, 마지막 쪽에서 그가 한 말이 달리 들립니다. 제 눈을 뜨게 한 것이 아니라 눈을 뜨고 싶게 만든 것이라고 했지요.`,
        `오늘 이 이야기를 읽으면서 마음이 불편했다면 그것이 맞습니다. 아버지를 위해 딸이 목숨을 내놓는 것을 우리는 더 이상 아름답다고 하지 않습니다. 옛사람들이 아름답게 여긴 것을 오늘 사람이 그대로 따라 여길 필요는 없습니다. 이야기는 남고 값매김은 바뀝니다.`,
        `마지막으로 생각해 볼 것을 남겨 둡니다. 답은 적어 두지 않겠습니다.`,
        `심청이 제 몸을 판 것은 잘한 일이었을까요? 아버지 눈은 떠졌습니다. 그러나 아버지가 그것을 바랐을 리는 없습니다. 누군가를 위한 일인데 그 사람이 바라지 않는 일이라면, 그것은 누구를 위한 일일까요.`,
        `심 봉사가 삼백 석의 크기를 알았더라면 어땠을까요? 이 이야기는 눈이 보이지 않아서 생긴 일입니다. 몰라서 한 약속의 값을 딸이 치른 셈인데, 그렇다면 잘못은 누구에게 있을까요.`,
        `몽운사 스님은 왜 하필 삼백 석이라고 했을까요? 서른 석이라고 했다면 심청은 팔려 가지 않았을 것입니다. 스님이 그 값을 부를 때 무슨 생각을 했을지, 이 물음에는 이야기가 끝내 답해 주지 않습니다.`
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
