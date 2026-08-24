(() => {
  const unitSpecs = [
    ["alphabet", "1. 알파벳과 짧은 모음", "1–34 · 글자와 소리, CVC 읽기", "violet", `
a /ă/|a|ant,apple,ax,map,mat,man,cat,cap
m /m/|m|map,mat,man,ham,ram,mop,mom,jam
s /s/|s|sun,sit,sock,sat,cats,maps,cups,kiss
t /t/|t|tap,ten,top,ant,mat,sit,hat,cat
VC/CVC 합성|a,m,s,t|am,at,mat,sat
p /p/|p|pan,pig,pop,pin,nap,cup,cap,rip
f /f/|f|fan,fin,fun,fox,fish,frog,leaf,roof
i /ĭ/|i|in,pin,sit,pig,fin,did,fish,milk
n /n/: 처음과 끝|n|nap,in,pin,fan,man,pan,fin,tin
CVC 연습: a, i|a,i|sat,pin,mat,pig,tap,sit,fin,pan
비음화 a: an, am|an,am|fan,ham,ram,man,pan,jam,clam,hand
o /ŏ/: 처음과 가운데|o|on,not,top,pot,mop,mom,hot,pop
d /d/: 처음과 끝|d|dad,did,dim,dip,dot,nod,sad,mad
c /k/|c|cat,cap,cot,cup,cats,rock,lock,clock
u /ŭ/|u|up,sun,cup,gum,bus,run,rug,luck
g /g/|g|gum,gap,dog,pig,rug,leg,log,frog
b /b/|b|bat,bed,bus,web,box,black,ball,bug
e /ĕ/|e|ten,bed,hen,red,leg,web,jet,vet
짧은 모음 전체 복습|a,e,i,o,u|cat,hen,pig,dog,sun,bed,fox,cup
-s /s/|s|cats,maps,cups,hats,rocks,books,roofs,clocks
s /z/|s|dogs,pigs,beds,webs,bells,hands,rams,moms
k /k/|k|kid,kit,kiss,milk,rock,lock,luck,skin
h /h/|h|hat,hen,hot,ham,hand,hill,house,horse
r /r/ 1|r|rat,red,run,ram,rip,rock,rug,roof
r /r/ 2|r|rip,rock,rug,ram,frog,roof,red,drum
l /l/ 1|l|leg,lip,log,leaf,milk,lock,clock,ball
l /l/ 2 · al|al,l|lamp,lock,luck,apple,leaf,milk,plum,pal
w /w/: 처음과 자음군|w|web,win,wag,swim,twin,swam,swell,twig
j /j/|j|jam,jet,jog,jump,jar,jeep,jelly,jacket
y /y/|y|yam,yes,yet,yak,yoyo,yarn,yogurt,yellow
x /ks/|x|box,fox,six,ax,ox,wax,mix,fix
qu /kw/|qu|quiz,quit,quack,queen,quilt,quill,squid,square
v /v/|v|van,vet,vivid,vase,vest,five,oven,seven
z /z/|z|zip,zap,zigzag,zoo,zebra,zero,maze,quiz`],
    ["review", "2. 짧은 모음과 긴 단어", "35–41 · 복습, 자음군, 긴 단어", "coral", `
짧은 a 복습|a|cat,hand,stamp,black,rat,mat,cap,bat
짧은 i 복습|i,n|fish,milk,skin,spin,pig,sit,pin,fin
짧은 o 복습|o|frog,pond,stop,clock,dog,hot,rock,log
a·i·o 섞어 읽기|a,i,o|black,spin,clock,cat,pig,dog,stamp,fish
짧은 u 복습|u|drum,plum,jump,sun,fun,cup,gum,rug
짧은 e 복습|e|step,desk,blend,bed,hen,red,leg,web
짧은 모음 전체 복습|a,e,i,o,u|cat,fish,frog,drum,step,black,spin,clock`],
    ["digraphs", "3. 두 글자 한 소리", "42–53 · sh, th, ch, wh, ph, ng, nk", "blue", `
FLSZ 끝 글자 겹치기|ff,ll,ss,zz|cliff,bell,mess,hill,ball,kiss,buzz,puff
-all, -oll, -ull|all,oll,ull|ball,doll,bull,tall,roll,full,wall,fall
ck /k/|ck|duck,sock,rock,back,check,lock,clock,jacket
sh /sh/|sh|fish,ship,shop,shell,dish,wish,brush,shut
유성 th /ð/|th|this,that,then,them,mother,father,brother,feather
무성 th /θ/|th|thin,bath,moth,thumb,three,thick,teeth,path
ch /ch/|ch|chin,chip,lunch,bench,chick,much,rich,chop
wh /w/|wh|what,when,where,which,why,whale,wheel,whistle
ph /f/|ph|phone,photo,graph,dolphin,elephant,trophy,alphabet,sphere
ng /ŋ/|ng|ring,king,song,wing,hang,long,sing,bang
nk /ŋk/|nk|pink,sink,bank,ink,trunk,drink,wink,tank
이중자 전체 복습|ck,sh,th,ch,wh,ph,ng,nk|check,ship,thin,chin,whale,phone,ring,pink`],
    ["vce", "4. 매직 e와 부드러운 c·g", "54–62 · VCe, c /s/, g /j/", "gold", `
a_e /ā/|a_e|cake,game,lake,gate,cape,wave,maze,vase
i_e /ī/|i_e|bike,kite,five,nine,time,line,dive,smile
o_e /ō/|o_e|home,nose,rose,bone,cone,rope,note,stone
VCe 복습 1 · e_e /ē/|e_e,a_e,i_e,o_e|these,theme,complete,cake,bike,home,stone,rose
u_e /ū, yū/|u_e|cube,tube,mule,cute,flute,tune,huge,dune
VCe 전체 복습|a_e,i_e,o_e,u_e|brave,smile,stone,cake,bike,home,cube,flute
ce /s/|ce|race,ice,space,face,mice,place,nice,fence
g /j/: e, i, y 앞|g|cage,huge,stage,page,giant,giraffe,orange,large
VCe 예외와 복습|vce|have,give,come,love,done,none,some,live`],
    ["syllables", "5. 긴 단어 읽기", "63–68 · 어미, 음절, 합성어", "green", `
-es|es|wishes,boxes,dishes,buses,foxes,roses,classes,brushes
-ed|ed|jumped,filled,wanted,helped,played,painted,kicked,landed
-ing|ing|jumping,resting,helping,running,singing,reading,painting,sleeping
음절 나누기|syllable|sunset,rabbit,napkin,picnic,kitten,magnet,basket,insect
합성어와 닫힌 두 음절|compound,closed|sunset,catfish,backpack,bathtub,rabbit,napkin,picnic,kitten
열린 음절과 닫힌 음절|open,closed,n|no,robot,tulip,music,pilot,tiger,lemon,hotel`],
    ["endings", "6. 단어 끝 철자", "69–76 · tch, dge, y, -le", "pink", `
tch /ch/|tch|catch,watch,match,patch,witch,hutch,fetch,stitch
dge /j/|dge|badge,bridge,edge,fudge,judge,hedge,wedge,fridge
tch·dge 복습|tch,dge|patch,fudge,edge,catch,badge,witch,bridge,watch
긴 모음 VCC|ild,old,ind,olt,ost|child,cold,find,wild,colt,gold,kind,most
y /ī/|y|my,fly,cry,sky,try,shy,dry,why
y /ē/|y|happy,sunny,baby,puppy,funny,city,candy,body
-le 음절|le|table,little,puzzle,candle,apple,bottle,turtle,castle
단어 끝 규칙 복습|tch,dge,y,le,ild|candle,puppy,witch,table,badge,child,happy,puzzle`],
    ["rcontrolled", "7. R이 바꾸는 모음", "77–83 · ar, or, er, ir, ur", "violet", `
ar /ar/|ar|car,farm,star,park,arm,jar,card,shark
or·ore /or/|ore,or|fork,corn,shore,horse,storm,porch,snore,chore
ar·or·ore 복습|ar,ore,or|park,shark,storm,short,shore,star,corn,farm
er /er/|er|fern,herd,term,germ,clerk,perch,serve,verb
ir·ur /er/|ir,ur|bird,girl,turn,shirt,skirt,turtle,nurse,purse
/er/ 철자 선택|er,ir,ur,or|fern,clerk,bird,shirt,turn,nurse,worm,world
R 통제 모음 복습|ar,or,er,ir,ur|farm,storm,bird,shark,shore,fern,shirt,turn`],
    ["longteams", "8. 긴 모음 조합", "84–88 · ai, ee, oa, igh", "coral", `
ai·ay /ā/|ai,ay|rain,train,play,snail,mail,gray,day,tray
ee·ea·ey /ē/|ee,ea,ey|tree,feet,key,green,leaf,beach,monkey,honey
oa·ow·oe /ō/|oa,ow,oe|boat,snow,toe,coach,road,goat,window,hoe
ie·igh /ī/|ie,igh|pie,night,light,bright,tie,high,right,sigh
긴 모음 조합 복습|ai,ee,ea,oa,igh|snail,green,coach,bright,train,beach,boat,night`],
    ["vowelteams", "9. 다른 모음 조합", "89–98 · oo, aw, oi, ow, 묵음", "blue", `
u·oo /ʊ/|u,oo|put,bull,full,book,foot,cook,wood,good
oo /ū/|oo|moon,food,noodle,spoon,room,boot,pool,zoo
ew·ui·ue /ū/|ew,ui,ue|chew,fruit,blue,screw,suit,glue,juice,clue
모음 조합 복습 2|oo,ew,ui,ue|book,moon,chew,fruit,blue,screw,suit,food
au·aw·augh /aw/|augh,au,aw|haul,saw,caught,yawn,paw,sauce,daughter,straw
ea /ĕ/ · a /ŏ/|ea,a|head,bread,dead,feather,wash,want,swan,watch
oi·oy /oi/|oi,oy|coin,boy,toy,point,oil,soil,joy,annoy
ou·ow /ow/|ou,ow|out,cow,brown,cloud,house,mouse,down,owl
모음 조합·이중모음 복습|oi,oy,ou,ow|point,joy,cloud,brown,coin,toy,out,cow
묵음 kn /n/ · wr /r/ · -mb /m/|kn,wr,mb|knee,write,thumb,knife,wrist,lamb,comb,knock`],
    ["affixes", "10. 접두사와 접미사", "99–106 · -s, -er, un-, re-, dis-", "green", `
접미사 -s·-es|es,s|cats,boxes,wishes,dogs,foxes,roses,maps,cups
-er·-est|est,er|faster,fastest,smaller,bigger,biggest,hotter,tallest,shortest
-ly|ly|slowly,quickly,kindly,softly,loudly,quietly,happily,sadly
-less·-ful|less,ful|helpful,careless,hopeful,fearless,useful,useless,colorful,harmless
접두사 un-|un|unfair,unlock,unsafe,unhappy,untie,unwrap,unplug,uncover
접두사 pre-·re-|pre,re|preview,preheat,preschool,prepay,redo,replay,restart,rebuild
접두사 dis-|dis|dislike,disconnect,dishonest,disagree,disappear,disobey,discolor,disorder
접사 복습|un,pre,dis,re|unhappy,unlock,preview,preheat,replay,restart,dislike,disagree`],
    ["changes", "11. 접미사 철자 변화", "107–110 · 겹치기, e·y 변화", "gold", `
자음 겹치기: -ed·-ing|ed,ing|planned,clapped,skipped,dragged,running,swimming,hopping,stopping
자음 겹치기: -er·-est|est,er|bigger,biggest,hotter,faster,fastest,smaller,tallest,shortest
끝 e 빼기|drop-e|making,riding,hoped,baking,smiling,closing,using,waved
y를 i로 바꾸기|y-to-i|cried,happier,happiest,tried,carried,dried,easier,busiest`],
    ["rare", "12. 드문 철자와 묵음", "111–118 · ough, c·g, gn·gh·silent t", "pink", `
ar·or /er/|ar,or|dollar,doctor,collar,actor,sailor,mirror,sugar,calendar
air·are·ear /air/|air,are,ear|chair,care,bear,hair,pair,fair,square,pear
ear /ear/|ear|hear,near,year,ear,dear,clear,gear,tear
긴 a의 드문 철자|eigh,aigh,ei,ey,ea|vein,eight,they,sleigh,reindeer,grey,steak,straight
긴 u의 드문 철자|ew,eu,ue,ou|few,feud,rescue,soup,neutral,fuel,statue,group
ough /aw, ō/|ough|bought,thought,dough,brought,fought,sought,doughnut,though
신호 모음: c /s/ · g /j/|c,g|city,germ,giant,center,cell,giraffe,gym,gem
ch /sh, k/ · gn /n/ · gh /g/ · 묵음 t|ch,gn,gh,t|chef,school,gnome,listen,chorus,character,sign,ghost`],
    ["morphology", "13. 확장 접사", "119–128 · -tion, -ture, -ness, bi-", "violet", `
-sion·-tion|sion,tion|vision,action,station,mission,nation,vacation,mansion,lotion
-ture|ture|picture,nature,future,adventure,creature,furniture,capture,mixture
-er·-or·-ist|er,or,ist|teacher,actor,artist,farmer,singer,sailor,dentist,scientist
-ish|ish|childish,greenish,selfish,foolish,pinkish,ticklish,sheepish,feverish
-y|y|rainy,salty,windy,sunny,cloudy,snowy,messy,sleepy
-ness|ness|kindness,darkness,sadness,happiness,softness,brightness,sickness,weakness
-ment|ment|payment,movement,enjoyment,excitement,agreement,improvement,amazement,treatment
-able·-ible|able,ible|readable,visible,possible,washable,edible,flexible,breakable,comfortable
bi-·tri-·uni-|bi,tri,uni|bicycle,triangle,unicorn,binoculars,tricycle,uniform,bilingual,tripod
확장 접사 복습|suffix,prefix|careless,preview,kindness,readable,bicycle,rainy,payment,teacher`]
  ];

  const parseRows = (text) => text.trim().split("\n").map((line) => {
    const [title, focusText, wordText] = line.trim().split("|");
    return { title, focus: focusText.split(","), words: wordText.split(",") };
  });

  const atlases = [
    ["assets/images/alphabet-late-atlas.webp", "lip,hill,house,jar,jeep,jelly,jacket,yak,yoyo,yarn,yogurt,yellow,wax,mix,fix,queen,quilt,quill,squid,square,vase,vest,five,oven,seven,zoo,zebra,zero,pizza,maze", 6, 5],
    ["assets/images/lesson-w-h-atlas.webp", "water,wall,wolf,worm,well,horse", 3, 2],
    ["assets/images/lesson-w-position-atlas.webp", "swim,twin,swam,swell,twig,wave", 3, 2],
    ["assets/images/lesson-42-flsz-atlas.webp", "cliff,bell,mess,buzz,puff,dress", 3, 2],
    ["assets/images/lesson-43-all-atlas.webp", "doll,bull,tall,roll,full,duck", 3, 2],
    ["assets/images/lesson-27-43-corrections-atlas.webp", "pal,fall", 2, 1],
    ["assets/images/lesson-44-45-atlas.webp", "back,neck,check,shell,ship,shop", 3, 2],
    ["assets/images/lesson-45-sh-atlas.webp", "dish,wish,brush,shut,shark,shoe", 3, 2],
    ["assets/images/lesson-46-th-atlas.webp", "this,that,then,them,mother,father", 3, 2],
    ["assets/images/lesson-47-th-atlas.webp", "brother,feather,thin,bath,moth,thumb", 3, 2],
    ["assets/images/lesson-47-48-atlas.webp", "three,thick,teeth,path,chin,chip", 3, 2],
    ["assets/images/lesson-48-ch-atlas.webp", "lunch,bench,chick,much,rich,chop", 3, 2],
    ["assets/images/lesson-49-wh-atlas.webp", "what,when,where,which,why,whale,wheel,whistle", 4, 2],
    ["assets/images/lesson-50-wh-ph-atlas.webp", "whip,phone,graph,whale,photo,dolphin", 3, 2],
    ["assets/images/lesson-50-ph-extra-atlas.webp", "elephant,trophy,alphabet,orphan,nephew,sphere", 3, 2],
    ["assets/images/lesson-51-ng-atlas.webp", "ring,king,song,wing,hang,long", 3, 2],
    ["assets/images/lesson-51-ng-extra-atlas.webp", "sing,bang,thing,string,swing,spring", 3, 2],
    ["assets/images/lesson-52-nk-atlas.webp", "pink,sink,bank,ink,trunk,drink", 3, 2],
    ["assets/images/lesson-52-nk-extra-atlas.webp", "wink,tank,junk,blink,think,honk", 3, 2],
    ["assets/images/lesson-54-vce-a-atlas.webp", "cake,game,lake,gate,cape,wave", 3, 2],
    ["assets/images/lesson-55-vce-i-atlas.webp", "bike,kite,nine,time,line,dive", 3, 2],
    ["assets/images/lesson-56-vce-o-atlas.webp", "smile,home,nose,rose,bone,cone", 3, 2],
    ["assets/images/lesson-57-vce-review-atlas.webp", "rope,note,stone,these,theme,complete", 3, 2],
    ["assets/images/lesson-58-vce-u-atlas.webp", "cube,tube,mule,cute,flute,tune", 3, 2],
    ["assets/images/lesson-60-ce-atlas.webp", "race,ice,space,face,mice,place", 3, 2],
    ["assets/images/lesson-60-ce-extra-atlas.webp", "nice,fence,dance,prince,slice,once", 3, 2],
    ["assets/images/lesson-61-ge-atlas.webp", "cage,huge,stage,page,giant,giraffe", 3, 2],
    ["assets/images/lesson-62-vce-exception-a-atlas.webp", "orange,large,have,give,come,love", 3, 2],
    ["assets/images/lesson-62-vce-exception-b-atlas.webp", "done,none,some,live,brave,dune", 3, 2],
    ["assets/images/lesson-63-es-atlas.webp", "wishes,boxes,dishes,buses,foxes,roses,classes,brushes", 4, 2],
    ["assets/images/lesson-64-ed-atlas.webp", "jumped,filled,wanted,helped,played,painted,kicked,landed", 4, 2],
    ["assets/images/lesson-65-ing-atlas.webp", "jumping,resting,helping,running,singing,reading,painting,sleeping", 4, 2],
    ["assets/images/lesson-66-syllable-atlas.webp", "sunset,rabbit,napkin,picnic,kitten,magnet,basket,insect", 4, 2],
    ["assets/images/lesson-67-compound-atlas.webp", "sunset,rabbit,catfish,backpack,bathtub,hotdog,football,cupcake", 4, 2],
    ["assets/images/lesson-68-open-closed-atlas.webp", "no,robot,tulip,music,pilot,tiger,lemon,hotel", 4, 2],
    ["assets/images/lesson-69-tch-atlas.webp", "catch,watch,match,patch,witch,hutch,fetch,stitch", 4, 2],
    ["assets/images/lesson-70-dge-atlas.webp", "badge,bridge,edge,fudge,judge,hedge,wedge,fridge", 4, 2],
    ["assets/images/lesson-72-vcc-atlas.webp", "child,cold,find,wild,old,gold,kind,most", 4, 2],
    ["assets/images/lesson-73-y-long-i-atlas.webp", "my,fly,cry,sky,try,shy,dry,why", 4, 2],
    ["assets/images/lesson-74-y-long-e-atlas.webp", "happy,sunny,baby,puppy,funny,city,candy,body", 4, 2],
    ["assets/images/lesson-75-le-atlas.webp", "table,little,puzzle,candle,apple,bottle,turtle,castle", 4, 2],
    ["assets/images/lesson-77-ar-atlas.webp", "car,farm,star,park,arm,jar,card,shark", 4, 2],
    ["assets/images/lesson-78-or-atlas.webp", "fork,corn,shore,horse,storm,porch,short,north", 4, 2],
    ["assets/images/lesson-80-er-atlas.webp", "fern,herd,term,germ,clerk,perch,serve,verb", 4, 2],
    ["assets/images/lesson-81-ir-ur-atlas.webp", "bird,girl,turn,shirt,skirt,first,nurse,purse", 4, 2],
    ["assets/images/lesson-84-ai-ay-atlas.webp", "rain,train,play,snail,mail,chain,day,tray", 4, 2],
    ["assets/images/lesson-85-ee-ea-ey-atlas.webp", "tree,feet,key,green,leaf,beach,monkey,honey", 4, 2],
    ["assets/images/lesson-86-oa-ow-oe-atlas.webp", "boat,snow,toe,coach,road,goat,window,hoe", 4, 2],
    ["assets/images/lesson-87-ie-igh-atlas.webp", "pie,night,light,bright,tie,high,right,sigh", 4, 2],
    ["assets/images/lesson-89-short-oo-atlas.webp", "put,book,foot,cook,look,wood,good,hook", 4, 2],
    ["assets/images/lesson-90-long-oo-atlas.webp", "moon,food,noodle,spoon,room,boot,pool,zoo", 4, 2],
    ["assets/images/lesson-91-ew-ui-ue-atlas.webp", "chew,fruit,blue,screw,suit,glue,juice,clue", 4, 2],
    ["assets/images/lesson-93-aw-atlas.webp", "haul,saw,caught,yawn,paw,sauce,daughter,straw", 4, 2],
    ["assets/images/lesson-94-ea-a-atlas.webp", "head,bread,wash,dead,feather,weather,want,swan", 4, 2],
    ["assets/images/lesson-95-oi-oy-atlas.webp", "coin,boy,toy,point,oil,soil,joy,annoy", 4, 2],
    ["assets/images/lesson-96-ou-ow-atlas.webp", "out,cow,brown,cloud,house,mouse,down,owl", 4, 2],
    ["assets/images/lesson-98-silent-atlas.webp", "knee,write,thumb,knife,wrist,lamb,comb,knock", 4, 2],
    ["assets/images/lesson-100-comparison-atlas.webp", "faster,fastest,smaller,bigger,biggest,hotter,taller,shortest", 4, 2],
    ["assets/images/lesson-101-ly-atlas.webp", "slowly,quickly,kindly,softly,loudly,quietly,happily,sadly", 4, 2],
    ["assets/images/lesson-102-less-ful-atlas.webp", "helpful,careless,hopeful,fearless,useful,useless,colorful,painful", 4, 2],
    ["assets/images/lesson-103-un-atlas.webp", "unfair,unlock,unsafe,unhappy,untie,unwrap,unplug,uncover", 4, 2],
    ["assets/images/lesson-104-pre-re-atlas.webp", "preview,redo,replay,restart,preheat,rebuild,reread,repaint", 4, 2],
    ["assets/images/lesson-105-dis-atlas.webp", "dislike,disconnect,dishonest,disagree,disappear,disobey,discolor,disorder", 4, 2],
    ["assets/images/lesson-107-double-atlas.webp", "hopped,running,planned,stopped,clapped,swimming,skipped,dragged", 4, 2],
    ["assets/images/lesson-109-drop-e-atlas.webp", "making,riding,hoped,baking,smiling,closing,using,waved", 4, 2],
    ["assets/images/lesson-110-y-i-atlas.webp", "cried,happier,happiest,tried,carried,dried,easier,busiest", 4, 2],
    ["assets/images/lesson-111-ar-or-schwa-atlas.webp", "dollar,doctor,collar,actor,sailor,mirror,motor,visitor", 4, 2],
    ["assets/images/lesson-112-air-atlas.webp", "chair,care,bear,hair,pair,fair,square,pear", 4, 2],
    ["assets/images/lesson-113-ear-atlas.webp", "hear,near,year,ear,dear,clear,gear,tear", 4, 2],
    ["assets/images/lesson-114-rare-a-atlas.webp", "vein,eight,they,sleigh,reindeer,grey,weigh,neighbor", 4, 2],
    ["assets/images/lesson-115-rare-u-atlas.webp", "few,feud,rescue,soup,neutral,fuel,statue,group", 4, 2],
    ["assets/images/lesson-116-ough-atlas.webp", "bought,thought,dough,brought,fought,sought,rough,though", 4, 2],
    ["assets/images/lesson-117-soft-cg-atlas.webp", "city,germ,giant,center,cell,giraffe,gym,gem", 4, 2],
    ["assets/images/lesson-118-rare-silent-atlas.webp", "chef,school,gnome,listen,chorus,character,sign,light", 4, 2],
    ["assets/images/lesson-119-sion-tion-atlas.webp", "vision,action,station,mission,nation,vacation,mansion,lotion", 4, 2],
    ["assets/images/lesson-120-ture-atlas.webp", "picture,nature,future,adventure,creature,furniture,capture,mixture", 4, 2],
    ["assets/images/lesson-121-occupations-atlas.webp", "teacher,actor,artist,farmer,singer,sailor,dentist,scientist", 4, 2],
    ["assets/images/lesson-122-ish-atlas.webp", "childish,greenish,selfish,foolish,pinkish,ticklish,sheepish,feverish", 4, 2],
    ["assets/images/lesson-123-y-atlas.webp", "rainy,salty,windy,sunny,cloudy,snowy,messy,sleepy", 4, 2],
    ["assets/images/lesson-124-ness-atlas.webp", "kindness,darkness,sadness,happiness,softness,brightness,sickness,weakness", 4, 2],
    ["assets/images/lesson-125-ment-atlas.webp", "payment,movement,enjoyment,excitement,agreement,improvement,amazement,treatment", 4, 2],
    ["assets/images/lesson-126-able-ible-atlas.webp", "readable,visible,possible,washable,edible,flexible,breakable,comfortable", 4, 2],
    ["assets/images/lesson-127-prefix-number-atlas.webp", "bicycle,triangle,unicorn,binoculars,tricycle,uniform,bilingual,tripod", 4, 2],
    ["assets/images/phonics-corrections-atlas.webp", "harmless,preschool,prepay,world,doughnut,ghost", 3, 2],
    ["assets/images/phonics-audit-extra-atlas.webp", "clam,colt,sugar,calendar,steak,straight", 3, 2],
    ["assets/images/lesson-f-b-atlas.webp", "leaf,roof,ball", 3, 1],
    ["assets/images/lesson-n-o-atlas.webp", "tin,pot,mop,mom", 2, 2],
    ["assets/images/lesson-d-atlas.webp", "dad,did,dim,dip,dot,nod,sad,mad", 4, 2],
    ["assets/images/n-position-atlas.webp", "noodle,knee,napkin,on,in,skin", 3, 2],
    ["assets/images/alphabet-atlas-01.webp", "ant,apple,ax,map,mat,man,sun,sit,sock,tap,ten,top,pan,pig,pop,fan,fin,fun,in,pin,net,nut,nap,hot,log,ox,dog,dad,dot,cat,cap,cot,up,cup,gum,gap", 6, 6],
    ["assets/images/alphabet-atlas-02.webp", "at,sat,ham,ram,on,not,did,bat,bus,bug,bed,pet,hen,cats,maps,cups,dogs,pigs,beds,kid,kit,kiss,hat,rat,red,run,rip,rock,rug,leg,lips,lamp,lock,luck,web,win", 6, 6],
    ["assets/images/alphabet-atlas-03.webp", "wag,jam,jet,jog,yam,yes,yet,box,fox,six,quiz,quit,quack,van,vet,vivid,zip,zap,zigzag,fish,milk,grin,frog,pond,stop,black,hand,stamp,spin,clock,drum,plum,jump,step,desk,blend", 6, 6]
  ].map(([file, words, columns, rows]) => ({ file, words: words.split(","), columns, rows }));

  const pictureFor = (word) => {
    const pictureAliases = { am: "man", gray: "grey", hopping: "hopped", stopping: "stopped", tallest: "taller", snore: "sleeping", chore: "mop" };
    const lookupWord = pictureAliases[word] || word;
    for (const atlas of atlases) {
      const index = atlas.words.indexOf(lookupWord);
      if (index >= 0) return { file: atlas.file, index, columns: atlas.columns, rows: atlas.rows };
    }
    if (word.endsWith("s") && word.length > 2) {
      const singular = word.slice(0, -1);
      for (const atlas of atlases) {
        const index = atlas.words.indexOf(singular);
        if (index >= 0) return { file: atlas.file, index, columns: atlas.columns, rows: atlas.rows };
      }
    }
    return null;
  };

  const stages = unitSpecs.map(([id, title, subtitle, color], index) => ({
    id, title, subtitle, color, order: index + 1
  }));

  const koreanGlosses = {
    ant: "개미", apple: "사과", ax: "도끼", map: "지도", mat: "매트", man: "남자",
    ham: "햄", ram: "숫양", mop: "대걸레", mom: "엄마", jam: "잼", sun: "해",
    sit: "앉다", sock: "양말", sat: "앉았다", cats: "고양이들", maps: "지도들",
    cups: "컵들", kiss: "입맞춤", tap: "두드리다", ten: "열", top: "꼭대기",
    hat: "모자", cat: "고양이", at: "~에", pan: "프라이팬", pig: "돼지", pop: "펑 터지다",
    pin: "핀", nap: "낮잠", cup: "컵", cap: "모자", rip: "찢다", fan: "선풍기",
    fin: "지느러미", fun: "재미", fox: "여우", fish: "물고기", frog: "개구리",
    leaf: "잎", roof: "지붕", in: "안에", did: "했다", milk: "우유", tin: "깡통",
    on: "위에", not: "아니다", pot: "냄비", hot: "뜨거운", dad: "아빠", dim: "어두운",
    dip: "담그다", dot: "점", nod: "끄덕이다", sad: "슬픈", mad: "화난", cot: "아기 침대",
    rock: "바위", lock: "자물쇠", clock: "시계", up: "위로", gum: "껌", bus: "버스",
    run: "달리다", rug: "깔개", luck: "행운", gap: "틈", dog: "개", leg: "다리",
    log: "통나무", bat: "야구 방망이", bed: "침대", web: "거미줄", box: "상자",
    black: "검은색", ball: "공", bug: "벌레", hen: "암탉", red: "빨간색", jet: "제트기",
    vet: "수의사", dogs: "개들", pigs: "돼지들", beds: "침대들", kid: "아이",
    kit: "구급상자", skin: "피부", hand: "손", hill: "언덕", house: "집", horse: "말",
    rat: "쥐", drum: "북", lip: "입술", lamp: "램프", plum: "자두", blend: "섞다",
    win: "이기다", wag: "흔들다", water: "물", wall: "벽", wolf: "늑대", worm: "지렁이",
    swim: "수영하다", twin: "쌍둥이", swam: "수영했다", swell: "큰 파도", twig: "잔가지", wave: "파도",
    cliff: "절벽", bell: "종", mess: "어질러진 것", buzz: "윙윙거리다", puff: "훅 불기",
    doll: "인형", bull: "황소", tall: "키가 큰", roll: "구르다", full: "가득 찬", duck: "오리",
    back: "등", neck: "목", check: "확인 표시", shell: "조개껍데기", ship: "배", shop: "가게",
    dish: "접시", wish: "소원", brush: "솔", shut: "닫다", shark: "상어", shoe: "신발",
    this: "이것", that: "저것", then: "그다음", them: "그들을", mother: "엄마", father: "아빠",
    brother: "형제", feather: "깃털", thin: "얇은", bath: "목욕", moth: "나방", thumb: "엄지손가락",
    three: "셋", thick: "두꺼운", teeth: "치아", path: "길", chin: "턱", chip: "칩",
    lunch: "점심", bench: "벤치", chick: "병아리", much: "많은 양", rich: "부유한", chop: "썰다",
    whip: "채찍", phone: "전화기", graph: "그래프", whale: "고래", photo: "사진", dolphin: "돌고래",
    elephant: "코끼리", trophy: "트로피", alphabet: "알파벳", orphan: "고아", nephew: "조카", sphere: "구",
    ring: "반지", king: "왕", song: "노래", wing: "날개", hang: "걸다", long: "긴",
    sing: "노래하다", bang: "쾅 소리", thing: "것", string: "끈", swing: "그네", spring: "용수철",
    pink: "분홍색", sink: "싱크대", bank: "은행", ink: "잉크", trunk: "큰 가방", drink: "마시다",
    wink: "윙크하다", tank: "탱크", junk: "잡동사니", blink: "눈을 깜박이다", think: "생각하다", honk: "빵빵 울리다",
    cake: "케이크", game: "게임", lake: "호수", gate: "문", cape: "망토",
    bike: "자전거", kite: "연", nine: "아홉", time: "시간", line: "선", dive: "다이빙하다", smile: "미소",
    home: "집", nose: "코", rose: "장미", bone: "뼈", cone: "원뿔", rope: "밧줄", note: "메모", stone: "돌",
    these: "이것들", theme: "주제", complete: "완성하다", cube: "정육면체", tube: "통", mule: "노새",
    cute: "귀여운", flute: "플루트", tune: "조율하다", dune: "모래 언덕", brave: "용감한",
    race: "경주", ice: "얼음", space: "우주", face: "얼굴", mice: "생쥐들", place: "자리", nice: "친절한", fence: "울타리",
    dance: "춤추다", prince: "왕자", slice: "조각", once: "한 번", cage: "우리", huge: "거대한",
    stage: "무대", page: "쪽", giant: "거인", giraffe: "기린", orange: "오렌지", large: "큰",
    have: "가지다", give: "주다", come: "오다", love: "사랑", done: "끝난", none: "아무것도 없음", some: "조금", live: "살다",
    well: "우물", jog: "천천히 달리다", jump: "뛰다", jar: "병", jeep: "지프",
    jelly: "젤리", jacket: "재킷", yam: "고구마", yes: "네", yet: "아직", yak: "야크",
    yoyo: "요요", yarn: "털실", yogurt: "요구르트", yellow: "노란색", six: "여섯",
    ox: "황소", wax: "밀랍", mix: "섞다", fix: "고치다", quiz: "퀴즈", quit: "그만두다",
    quack: "꽥꽥 울다", queen: "여왕", quilt: "누비이불", quill: "깃펜", squid: "오징어",
    square: "정사각형", van: "승합차", vivid: "선명한", vase: "꽃병", vest: "조끼",
    five: "다섯", oven: "오븐", seven: "일곱", zip: "지퍼", zap: "찌릿", zigzag: "지그재그",
    zoo: "동물원", zebra: "얼룩말", zero: "영", maze: "미로", stamp: "도장",
    spin: "돌다", pond: "연못", stop: "멈추다", step: "걸음", desk: "책상",
    napkin: "냅킨", noodle: "국수", knee: "무릎"
  };

  Object.assign(koreanGlosses, {
    wishes: "소원들", boxes: "상자들", dishes: "접시들", buses: "버스들", foxes: "여우들", roses: "장미들", classes: "학급들", brushes: "솔들",
    jumped: "뛰었다", filled: "채웠다", wanted: "원했다", helped: "도왔다", played: "놀았다", painted: "그렸다", kicked: "찼다", landed: "착륙했다",
    jumping: "뛰는 중", resting: "쉬는 중", helping: "돕는 중", running: "달리는 중", singing: "노래하는 중", reading: "읽는 중", painting: "그리는 중", sleeping: "자는 중",
    sunset: "일몰", rabbit: "토끼", picnic: "소풍", kitten: "새끼 고양이", magnet: "자석", basket: "바구니", insect: "곤충",
    catfish: "메기", backpack: "책가방", bathtub: "욕조", hotdog: "핫도그", football: "축구공", cupcake: "컵케이크",
    no: "아니요", robot: "로봇", tulip: "튤립", music: "음악", pilot: "조종사", tiger: "호랑이", lemon: "레몬", hotel: "호텔",
    catch: "잡다", watch: "손목시계", match: "짝", patch: "헝겊 조각", witch: "마녀", hutch: "토끼장", fetch: "물어오다", stitch: "바느질 한 땀",
    badge: "배지", bridge: "다리", edge: "가장자리", fudge: "퍼지", judge: "판사", hedge: "생울타리", wedge: "쐐기", fridge: "냉장고",
    child: "아이", cold: "추운", find: "찾다", wild: "야생의", old: "나이 든", gold: "금", kind: "친절한", most: "대부분",
    my: "나의", fly: "파리", cry: "울다", sky: "하늘", try: "시도하다", shy: "수줍은", dry: "마른", why: "왜",
    happy: "행복한", sunny: "화창한", baby: "아기", puppy: "강아지", funny: "우스운", city: "도시", candy: "사탕", body: "몸",
    table: "탁자", little: "작은", puzzle: "퍼즐", candle: "양초", bottle: "병", turtle: "거북이", castle: "성"
  });
  Object.assign(koreanGlosses, {
    car: "자동차", farm: "농장", star: "별", park: "공원", arm: "팔", jar: "병", card: "카드", shark: "상어",
    fork: "포크", corn: "옥수수", shore: "물가", storm: "폭풍", porch: "현관", short: "짧은", north: "북쪽",
    fern: "양치식물", herd: "동물 떼", term: "기간", germ: "세균", clerk: "점원", perch: "앉다", serve: "나르다", verb: "동사",
    bird: "새", girl: "소녀", turn: "돌다", shirt: "셔츠", skirt: "치마", first: "첫째", nurse: "간호사", purse: "손가방", her: "그녀의", word: "단어",
    rain: "비", train: "기차", play: "놀다", snail: "달팽이", mail: "우편", chain: "사슬", day: "낮", tray: "쟁반",
    tree: "나무", feet: "발들", key: "열쇠", green: "초록색", beach: "해변", monkey: "원숭이", honey: "꿀",
    boat: "배", snow: "눈", toe: "발가락", coach: "코치", road: "도로", goat: "염소", window: "창문", hoe: "괭이",
    pie: "파이", night: "밤", light: "빛", bright: "밝은", tie: "넥타이", high: "높은", right: "오른쪽", sigh: "한숨 쉬다",
    put: "놓다", book: "책", foot: "발", cook: "요리하다", look: "보다", wood: "나무", good: "좋은", hook: "갈고리",
    moon: "달", food: "음식", spoon: "숟가락", room: "방", boot: "장화", pool: "수영장",
    chew: "씹다", fruit: "과일", blue: "파란색", screw: "나사", suit: "정장", glue: "풀", juice: "주스", clue: "단서",
    haul: "끌다", saw: "톱", caught: "잡았다", yawn: "하품", paw: "동물 발", sauce: "소스", daughter: "딸", straw: "빨대",
    head: "머리", bread: "빵", wash: "씻다", dead: "죽은", weather: "날씨", want: "원하다", swan: "백조",
    coin: "동전", boy: "소년", toy: "장난감", point: "가리키다", oil: "기름", soil: "흙", joy: "기쁨", annoy: "짜증나게 하다",
    out: "밖으로", cow: "소", brown: "갈색", cloud: "구름", mouse: "생쥐", down: "아래로", owl: "부엉이",
    write: "쓰다", knife: "칼", wrist: "손목", lamb: "어린 양", comb: "빗", knock: "두드리다"
  });

  Object.assign(koreanGlosses, {
    faster: "더 빠른", fastest: "가장 빠른", smaller: "더 작은", bigger: "더 큰", biggest: "가장 큰", hotter: "더 뜨거운", taller: "더 키 큰", shortest: "가장 짧은",
    slowly: "천천히", quickly: "빠르게", kindly: "친절하게", softly: "부드럽게", loudly: "큰 소리로", quietly: "조용히", happily: "행복하게", sadly: "슬프게",
    helpful: "도움이 되는", careless: "부주의한", hopeful: "희망에 찬", fearless: "두려움 없는", useful: "쓸모 있는", useless: "쓸모없는", colorful: "알록달록한", painful: "아픈",
    unfair: "불공평한", unlock: "잠금을 풀다", unsafe: "안전하지 않은", unhappy: "행복하지 않은", untie: "풀다", unwrap: "포장을 풀다", unplug: "플러그를 빼다", uncover: "덮개를 벗기다",
    preview: "미리 보기", redo: "다시 하다", replay: "다시 재생하다", restart: "다시 시작하다", preheat: "미리 데우다", rebuild: "다시 짓다", reread: "다시 읽다", repaint: "다시 칠하다",
    dislike: "싫어하다", disconnect: "연결을 끊다", dishonest: "정직하지 않은", disagree: "동의하지 않다", disappear: "사라지다", disobey: "따르지 않다", discolor: "색이 바래다", disorder: "어지러움",
    hopped: "깡충 뛰었다", planned: "계획했다", stopped: "멈췄다", clapped: "박수쳤다", swimming: "수영하는 중", skipped: "줄넘기했다", dragged: "끌었다",
    making: "만드는 중", riding: "타는 중", hoped: "바랐다", baking: "굽는 중", smiling: "웃는 중", closing: "닫는 중", using: "사용하는 중", waved: "손을 흔들었다",
    cried: "울었다", happier: "더 행복한", happiest: "가장 행복한", tried: "시도했다", carried: "날랐다", dried: "말렸다", easier: "더 쉬운", busiest: "가장 바쁜",
    dollar: "달러", doctor: "의사", collar: "목걸이", actor: "배우", sailor: "선원", mirror: "거울", motor: "모터", visitor: "방문객",
    chair: "의자", care: "돌보다", bear: "곰", hair: "머리카락", pair: "한 쌍", fair: "놀이 장터", square: "정사각형", pear: "배",
    hear: "듣다", near: "가까운", year: "해", ear: "귀", dear: "소중한", clear: "맑은", gear: "톱니바퀴", tear: "눈물",
    vein: "정맥", eight: "여덟", they: "그들", sleigh: "썰매", reindeer: "순록", grey: "회색", weigh: "무게를 재다", neighbor: "이웃",
    few: "조금의", feud: "다툼", rescue: "구조하다", soup: "수프", neutral: "중립적인", fuel: "연료", statue: "조각상", group: "무리",
    bought: "샀다", thought: "생각했다", dough: "반죽", brought: "가져왔다", fought: "싸웠다", sought: "찾았다", rough: "거친", though: "비록"
  });

  Object.assign(koreanGlosses, {
    center: "가운데", cell: "세포", gym: "체육관", gem: "보석", chef: "요리사", school: "학교", gnome: "난쟁이", listen: "듣다", chorus: "합창", character: "등장인물", sign: "표지판", light: "빛",
    vision: "시야", action: "행동", station: "역", mission: "임무", nation: "나라", vacation: "휴가", mansion: "대저택", lotion: "로션",
    picture: "그림", nature: "자연", future: "미래", adventure: "모험", creature: "생물", furniture: "가구", capture: "잡다", mixture: "혼합물",
    teacher: "선생님", artist: "예술가", farmer: "농부", singer: "가수", dentist: "치과 의사", scientist: "과학자",
    childish: "아이 같은", greenish: "초록빛의", selfish: "이기적인", foolish: "어리석은", pinkish: "분홍빛의", ticklish: "간지럼 타는", sheepish: "멋쩍은", feverish: "열이 나는",
    rainy: "비 오는", salty: "짠", windy: "바람 부는", cloudy: "흐린", snowy: "눈 오는", messy: "어지러운", sleepy: "졸린",
    kindness: "친절함", darkness: "어둠", sadness: "슬픔", happiness: "행복", softness: "부드러움", brightness: "밝음", sickness: "아픔", weakness: "약함",
    payment: "지불", movement: "움직임", enjoyment: "즐거움", excitement: "신남", agreement: "동의", improvement: "향상", amazement: "놀라움", treatment: "치료",
    readable: "읽을 수 있는", visible: "보이는", possible: "가능한", washable: "씻을 수 있는", edible: "먹을 수 있는", flexible: "잘 휘는", breakable: "깨질 수 있는", comfortable: "편안한",
    bicycle: "자전거", triangle: "삼각형", unicorn: "유니콘", binoculars: "쌍안경", tricycle: "세발자전거", uniform: "제복", bilingual: "두 언어를 쓰는", tripod: "삼각대"
  });

  Object.assign(koreanGlosses, {
    am: "~이다",
    hats: "모자들", rocks: "바위들", books: "책들", roofs: "지붕들", clocks: "시계들",
    webs: "거미줄들", bells: "종들", hands: "손들", rams: "숫양들", moms: "엄마들"
  });

  Object.assign(koreanGlosses, {
    what: "무엇", when: "언제", where: "어디", which: "어느 것", wheel: "바퀴", whistle: "호루라기",
    pal: "친구", fall: "가을", harmless: "해가 없는", preschool: "유치원", prepay: "미리 지불하다",
    world: "세계", doughnut: "도넛", ghost: "유령",
    clam: "대합조개", colt: "망아지", sugar: "설탕", calendar: "달력", steak: "스테이크", straight: "곧은",
    gray: "회색", hopping: "깡충 뛰는 중", stopping: "멈추는 중", tallest: "가장 키 큰", snore: "코를 골다", chore: "집안일"
  });

  const childTitleFor = (title, order) => {
    if (order === 57) return "e–e 소리와 a–e·i–e·o–e 복습";
    if (order === 59) return "끝 e 긴 모음 전체 복습";
    const exact = {
      "l /l/ 2 · al": "l 소리 2 · al 단어",
      "wh /w/": "wh로 시작하는 /w/ 소리",
      "ph /f/": "ph가 만드는 /f/ 소리",
      "VCe 복습 1 · e_e /ē/": "e–e 소리와 긴 모음 복습",
      "ough /aw, ō/": "ough의 /aw/·/ō/ 소리",
      "VC/CVC 합성": "소리를 이어 짧은 단어 읽기",
      "CVC 연습: a, i": "a·i가 들어간 짧은 단어 읽기",
      "비음화 a: an, am": "an·am 단어 읽기",
      "FLSZ 끝 글자 겹치기": "짧은 모음 뒤 끝 글자 겹치기",
      "-all, -oll, -ull": "all·oll·ull로 끝나는 단어",
      "-s /s/": "끝 s가 또렷하게 나는 단어",
      "s /z/": "끝 s가 부드럽게 나는 단어",
      "VCe 전체 복습": "끝 e가 있는 긴 모음 복습",
      "VCe 예외와 복습": "끝 e 규칙과 예외 복습",
      "긴 모음 VCC": "자음 두 개 앞의 긴 모음",
      "ce /s/": "끝 ce에서 c가 /s/로 나는 단어",
      "ea /ĕ/ · a /ŏ/": "짧게 나는 ea와 w 뒤의 a",
      "g /j/: e, i, y 앞": "e·i·y 앞의 g 소리",
      "y /ī/": "한 음절 끝의 y 소리",
      "y /ē/": "두 음절 끝의 y 소리",
      "/er/ 철자 선택": "같은 소리의 er·ir·ur·w+or 고르기",
      "oo /ū/": "길게 나는 oo 소리",
      "묵음 kn /n/ · wr /r/ · -mb /m/": "kn은 k, wr은 w, -mb는 끝 b가 소리 나지 않아요",
      "음절 나누기": "긴 단어를 음절로 나누어 읽기",
      "합성어와 닫힌 두 음절": "합성어와 닫힌 두 음절 단어 구별하기",
      "열린 음절과 닫힌 음절": "모음으로 끝나는 음절과 자음으로 끝나는 음절",
      "-es": "끝에 es가 붙은 단어",
      "-ed": "끝 ed의 세 가지 소리",
      "-ing": "하고 있는 일을 나타내는 ing",
      "접미사 -s·-es": "하나보다 많을 때 붙이는 s·es",
      "-er·-est": "비교할 때 붙이는 er·est",
      "-ly": "방법을 나타내는 ly",
      "-less·-ful": "없음과 가득함을 나타내는 less·ful",
      "접두사 un-": "반대 뜻을 만드는 un",
      "접두사 pre-·re-": "미리·다시를 뜻하는 pre·re",
      "접두사 dis-": "반대·떨어짐을 뜻하는 dis",
      "-sion·-tion": "명사를 만드는 sion·tion",
      "-ture": "명사를 만드는 ture",
      "-er·-or·-ist": "사람을 나타내는 er·or·ist",
      "-ish": "비슷함을 나타내는 ish",
      "-y": "성질을 나타내는 y",
      "-ness": "상태를 나타내는 ness",
      "-ment": "결과·상태를 나타내는 ment",
      "-able·-ible": "할 수 있음을 나타내는 able·ible",
      "bi-·tri-·uni-": "숫자를 나타내는 bi·tri·uni",
      "신호 모음: c /s/ · g /j/": "e·i·y 앞에서 달라지는 c와 g",
      "ch /sh, k/ · gn /n/ · gh /g/ · 묵음 t": "ch·gn·gh의 드문 소리와 묵음 t"
    };
    if (exact[title]) return exact[title];
    return title
      .replace(/([a-z]+)_e/gi, "$1–e")
      .replace(/\s*\/[^/]+\//g, " 소리")
      .replace(/\bVCe\b/g, "끝 e 규칙")
      .replace(/\bVCC\b/g, "모음·자음·자음")
      .replace(/\bCVC\b/g, "짧은 단어")
      .replace(/\s+/g, " ")
      .trim();
  };

  const activityTypeFor = (order, title) => {
    if (title === "VC/CVC 합성") return "blend";
    if (title === "-s /s/" || title === "s /z/") return "pattern";
    if (/음절|합성어|긴 단어/.test(title)) return "syllable";
    if (/접두사|접미사|접사|자음 겹치기|끝 e 빼기|y를 i로/.test(title) || order >= 119) return "word-parts";
    if (/복습|섞어 읽기|철자 선택/.test(title)) return "review";
    if (order <= 34) return "sound";
    return "pattern";
  };

  const activityCopy = {
    sound: { label: "새 소리", instruction: "단어를 듣고 같은 그림과 글자를 고르세요." },
    blend: { label: "소리 잇기", instruction: "낱소리를 차례로 이은 뒤 완성된 단어를 고르세요." },
    review: { label: "누적 복습", instruction: "지금까지 배운 소리를 떠올리며 들은 단어를 고르세요." },
    pattern: { label: "읽기 규칙", instruction: "오늘의 글자 규칙을 확인하고 들은 단어를 고르세요." },
    syllable: { label: "긴 단어 읽기", instruction: "단어를 작은 소리 덩어리로 나누어 읽고 고르세요." },
    "word-parts": { label: "단어 조각", instruction: "낱말의 앞뒤 조각과 철자 변화를 살펴보고 고르세요." }
  };

  const segmentWord = (word, focus) => {
    const patterns = focus.flatMap((item) => item.replace(/^-/, "").split("_")).filter(Boolean).sort((a, b) => b.length - a.length);
    const parts = [];
    for (let index = 0; index < word.length;) {
      const pattern = patterns.find((item) => item.length > 1 && word.startsWith(item, index));
      if (pattern) {
        parts.push(pattern);
        index += pattern.length;
      } else {
        parts.push(word[index]);
        index += 1;
      }
    }
    return parts;
  };

  const wordBank = {};
  const lessons = [];
  let lessonNumber = 0;

  unitSpecs.forEach(([stageId, , , , rows]) => {
    parseRows(rows).forEach((row, stageIndex) => {
      lessonNumber += 1;
      row.words.forEach((word) => {
        if (!wordBank[word]) wordBank[word] = { scene: "", korean: koreanGlosses[word] || "", hint: `${row.title} 예시 단어`, picture: pictureFor(word) };
      });
      const activityType = activityTypeFor(lessonNumber, row.title);
      const displayTitle = childTitleFor(row.title, lessonNumber);
      const uniquePictureWords = [...new Set(row.words.filter((word) => wordBank[word]?.picture))];
      lessons.push({
        stageId,
        id: lessonNumber === 1 ? "s1-l1" : `ufli-${String(lessonNumber).padStart(3, "0")}`,
        order: lessonNumber,
        stageOrder: stageIndex + 1,
        title: displayTitle,
        sourceTitle: row.title,
        activityType,
        activityLabel: activityCopy[activityType].label,
        instruction: activityCopy[activityType].instruction,
        questionCount: Math.min(8, uniquePictureWords.length),
        focus: row.focus,
        review: [],
        words: row.words,
        sentence: `${row.words[0]} · ${row.words[1]} · ${row.words[2]}`,
        note: activityCopy[activityType].instruction,
        blend: row.words.slice(0, 3).map((word) => ({ parts: segmentWord(word, row.focus), answer: word })),
        dictation: row.words.slice(0, 3)
      });
    });
  });

  window.PHONICS_CURRICULUM = {
    version: 6,
    framework: "UFLI Foundations 공개 scope and sequence 기반",
    stages,
    lessons,
    wordBank
  };
})();
