# 그림 검증 기록

924장을 하나씩 열어 본문·그림말과 견주는 중입니다.
**끝난 자리를 여기 적어 둡니다.** 다음에 이어서 하려면 여기부터 보면 됩니다.

## 지금까지

    본 그림   232장 / 925장   (전수조사 2026-08-29 다시 시작)
    끝난 책   15권 — 박혁거세 · 밤에 찾아온 도깨비 · 방귀 며느리 · 반쪽이 ·
              봉이 김선달 · 청개구리 · 단군 · 들쥐와 손톱 · 도깨비 방망이 ·
              도깨비 감투 · 두꺼비와 토끼와 호랑이 · 은혜 갚은 두꺼비 ·
              은혜 갚은 까치 · 강도 잡은 개 · 금도끼 은도끼

## 보는 법 — 한 권을 한 장으로 붙여서 본다

한 장씩 열면 그림 하나에 한 번씩 눈이 가야 해서 오래 걸린다.
**한 권의 그림을 3열로 이어 붙인 한 장**을 만들어 놓고 보면 한 번에
훑을 수 있고, 수상한 것만 크게 잘라서 다시 본다.

    for f in $(ls 책이름/images/*.webp | sort); do ... scale=440:248 ... done
    ffmpeg -i %02d.png -vf "tile=3x행수:margin=4:padding=4" 한장.png

닮은 그림을 기계로 먼저 거르는 도구도 만들었다.

    python _tools/imgdup.py        한 책 안에서 너무 닮은 그림 짝을 찾는다

62권에서 서른일곱 짝이 걸렸고, 눈으로 가려 보니 셋이 진짜였다
(방귀 며느리 05·06, 청개구리 05·06, 은혜 갚은 까치 05·06).
나머지는 같은 자리에서 다음 장면을 그린 것이라 괜찮다.

## 찾은 것

| 자리 | 문제 | 상태 |
|---|---|---|
| `banjjogi` 전권 15장 | 반쪽이 몸·김 부자 낯빛·어머니 나이 | **다 고쳐져 옴** |
| `eunhye-dukkeobi` 지네 | 마디·다리를 다 그려 징그러웠음 | **다 고쳐져 옴** |
| `bak-hyeokgeose/03-horse` | 글은 「앞무릎을 꿇고」인데 앞발을 들고 섰음 | 주문서에 있음 |
| `bak-hyeokgeose/03-horse` | **붉은 알이 벌써 우물 위에 있다.** 알은 말이 사라진 뒤에 나와야 한다 | 주문서에 올림 |
| `bak-hyeokgeose/02-light` | 촌장이 **다섯**만 보임 (글은 여섯) | 주문서에 올림 |
| `bak-hyeokgeose/11-thirteen` | 촌장이 **넷**만 보임 (글은 여섯) | 주문서에 있음 |
| `hokburi-yeonggam/09-greedy` | 욕심쟁이 얼굴이 딱딱함 | 주문서에 있음 |

## 글을 고쳐 맞춘 것 (그림이 맞아서)

| 자리 | 무엇 |
|---|---|
| `bak-hyeokgeose/14-people` | 글은 「언덕 위에서 내려다보았다」인데 그림은 사람들 가운데 서 있다. 그림이 맞다 |

## 낮은 순위 (내용 오류는 아님)

*멸치의 꿈은 화풍이 달라 적어 두었으나 사용자가 그대로 두라고 하여 뺐습니다.*

| 자리 | 무엇이 |
|---|---|
| `bak-hyeokgeose/05-boy` | 말이 아직 하늘에 있다. 앞 펼침에서 사라졌다 |
| `bak-hyeokgeose/06-bath` | 글은 촌장들이 씻겼는데 그림에는 한 사람뿐 |
| `bame-chajaon-dokkaebi/02-challenge` | 글은 「키가 두 배」인데 그만큼 크지 않다 (표지는 두 배로 잘 그렸다) |
| `bame-chajaon-dokkaebi/05-remember` | 전래동화에 전구가 떠 있다 |

## 본 책·본 그림

    bak-hyeokgeose      03-horse 06-bath 08-dragon 11-thirteen
    banjjogi            cover 03-grow 05-tie 01-carp(새것) end
    banggwi-myeoneuri   cover
    dangun              02-descend
    geumdokki-eundokki  06-silver 07-iron 10-greedy
    geuneul-san-saram   08-friends
    gureongdeongdeong   cover 07-burn
    heungbujeon         story-01-c
    hokburi-yeonggam    09-greedy 10-sing 11-angry 12-two
    imgeumnim-gwi       cover
    jaringobi           04-fan 14-fish
    jige-iyagi          cover 03-jige(중복이라 지움)
    kkongji-datbal      cover
    kongjwi-patjwi      story-01-b
    myeolchi-kkum       cover 09-catfish
    eunhye-dukkeobi     cover
    gyeonu-jiknyeo      cover
    haewa-dari-doen-onui cover
    seok-talhae         12-friend
    horangi-sogin-tokki 01-caught
    jwi-sawi            cover
    muyeongtap          cover
    cheonggaeguri       02-backwards
    dokkaebi-bangmangi  04-dokkaebi
    eunhye-kkachi       08-ring
    gangdo-jabeun-gae   cover
    gotgam-horangi      05-scared
    halmikkot           cover
    hwangso-nongbu      cover
    jopssal-han-tol     cover
    juin-guhan-nureongi cover
    jinju-geowi         cover
    mangduseok-jaepan   cover
    ppalgan-buchae      cover
    samnyeon-gogae      cover
    yosul-hangari       cover
    samhyeongje-jaeju   08-cliff
    ureongi-gaksi       13-jar
    yeoni-beodeul       02-order 03-snow

## 괴물 그림 훑기 (규칙 고친 뒤)

    은혜 갚은 두꺼비  cover 08-centipede 09-glow 10-retreat   ★ 다시 그려야 함
    삼형제의 재주     08-cliff        이무기가 멀리 작게 있어 좋음
    구렁덩덩          05-shed         허물이 반짝이는 흰 껍질로 곱게
    호랑이 속인 토끼   01-caught       민화풍 큰 면, 무섭되 징그럽지 않음

## 특히 잘 나온 것

    무영탑 cover     못에 산과 구름은 비치는데 **탑만 안 비친다.**
                    「그림자 없는 탑」이라는 뜻이 그림으로 들어갔다
    쥐의 사위 cover   해·바람·돌부처가 다 나오고 쥐 부부가 아주 작다.
                    뒤집기가 그림으로 보인다
    해와 달이 된 오누이 cover
                    오누이는 튼튼한 줄, 호랑이는 썩은 줄이 끊긴다
    빨간 부채 cover   코가 하늘 궁궐까지. 매끈한 관 모양이라 안 징그럽다
    좁쌀 한 톨 cover  좁쌀→쥐→고양이→개→말→소가 위로 커진다.
                    누적담의 구조가 그림 하나로 보인다
    누렁이 cover      젖은 풀밭에 물기가 반짝인다. 개가 몸을 적셔
                    불길을 막은 자리라는 것이 그림에 있다
    할미꽃 cover      줄기가 활처럼 굽어 꽃이 땅을 본다. 표지 소개 그대로
    황소가 된 농부 cover
                    소 탈이 웃고 뒤에서 게으른 농부가 하품한다
    은혜 갚은 까치 08-ring
                    까치가 종을 치고 구렁이가 당황한다. 뱀 모습과 사람
                    모습을 함께 그려 「내가 저것 때문에 못 올라간다」가 보인다
    곶감과 호랑이 05-scared
                    호랑이 머릿속에 무시무시한 곶감이 떠 있다

## 표지를 훑고 나서

표지를 스물몇 장 봤는데 **하나만 빼고 다 좋다.** 나쁜 하나가
반쪽이였고, 그것이 해부도였다.

문제가 고루 흩어져 있지 않다. **어긋나는 책은 통째로 어긋나고,
멀쩡한 책은 표지부터 끝까지 멀쩡하다.** 그래서 책 단위로 훑는 것이
맞다. 한 책에서 한 장이 이상하면 그 책 전체를 봐야 한다.

## 훑는 방법 — 책마다 대표 한 장

문제가 책 단위로 몰리므로, 책마다 **대표 한 장**만 먼저 보고
어긋난 책을 골라낸다. 그 책만 통째로 들여다본다.
924장을 다 보는 것보다 훨씬 빠르고, 놓치는 것도 적다.

대표 한 장은 이렇게 고른다.
- 주인공의 생김새가 특별한 책이면 주인공이 크게 나온 장 (반쪽이가 이 경우)
- 괴물이 나오면 괴물이 제일 크게 나온 장
- 그 밖에는 이야기의 고비 (도깨비 방망이의 04-dokkaebi 같은)

## 반쪽이에서 배운 것 — 그림 모델이 못 하는 것이 있다

세 번 고쳐 써도 얼굴만은 자꾸 온전하게 나온다.

    팔 하나·다리 하나   대체로 해낸다
    얼굴 반쪽           거의 못 한다

가만히 선 정면(05-tie, cover)은 맞았고 움직이는 자세(03-grow,
08-catch, 11-contest)는 다 얼굴이 온전했다. **얼굴은 그림 모델에게
가장 강한 습관이라 글로는 잘 안 눌린다.**

지시 자체도 두 번 틀렸다.
1. 「one eye, one arm, one leg」 — 어느 쪽인지 안 적음
2. 「오른쪽 반」 — 몸 기준이라 인물이 돌아서면 화면에서 뒤집힘

**그림 지시에 몸 기준 좌우를 쓰면 안 된다.** 화면 기준으로 적어야
판단할 여지가 없다. 그래도 얼굴은 남는 문제라, 이럴 때는 글이 아니라
**잘 나온 그림을 참고로 붙이는** 것이 맞다.

## 배운 것

**표지를 꼭 본다.** 지금까지 가장 심한 것이 반쪽이 **표지**였다.
내장이 다 드러난 해부도였는데, 본문 그림만 보다가 하마터면 넘길 뻔했다.

**괴물은 「덜 보여 주기」가 아니라 「어떻게 그리느냐」다.**
지네가 징그럽다는 말을 듣고 처음에는 "그림자로 숨겨라"라고 규칙을 썼다.
그러면 안 징그럽긴 한데 재미도 없어진다. 사용자가 1990년 KBS 만화의
게 괴물을 보여 주었다 — 이빨도 크고 입도 쩍 벌어졌는데 신난다.
큰 면·둥근 덩어리·굵은 선·자루 눈·세모 이빨이면 이빨이 많아도 괜찮고,
젖은 살갗·침·잔털·촘촘한 마디가 징그럽게 만든다. 규칙을 다시 썼다.

**주인공의 생김새가 이야기의 전부인 책은 그것부터 본다.**
반쪽이는 몸이 반쪽인 것이 이야기 전부인데 멀쩡한 몸으로 그려져 있었다.
한 장만 봐도 알 수 있는 것을 책 절반을 보고서야 알았다.
