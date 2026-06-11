import React, { useState } from "react";
import "./App.css";

const BGNAME = {
  science: "/images/bg-retreat-storage-room.webp",
  bath: "/images/bg-retreat-bathroom.webp",
  broadcast: "/images/bg-retreat-auditorium.webp",
  class: "/images/bg-retreat-room.webp",
  hall: "/images/bg-retreat-hallway.webp",
  dark: "/images/bg-dark.webp",
};

const BG = Object.fromEntries(
  Object.entries(BGNAME).map(([key, value]) => [key, `url("${value}")`])
);

const CHAR = {
  none: "",
  bloodHand: "/images/char-blood-hand.webp",
  yubin: "/images/char-cha-yubin.webp",
  taeo: "/images/char-kang-taeo.webp",
  seoyoon: "/images/char-han-seoyoon.webp",
};

const ENDING_IMG = {
  endPlayerFrame: "/images/ending-player-frame.webp",
  endPlayerFrame2: "/images/ending-player-frame.webp",
  endPlayerFrame3: "/images/ending-player-frame.webp",
  endTaeoFrame: "/images/ending-taeo-frame.webp",
  endTaeoFrame2: "/images/ending-taeo-frame.webp",
  endTaeoFrame3: "/images/ending-taeo-frame.webp",
  endSeoyoonFrame: "/images/ending-seoyoon-frame.webp",
  endSeoyoonFrame2: "/images/ending-seoyoon-frame.webp",
  endSeoyoonFrame3: "/images/ending-seoyoon-frame.webp",
  endYubinConfess: "/images/ending-yubin-confess.webp",
  endYubinConfess2: "/images/ending-yubin-confess.webp",
  endYubinConfess3: "/images/ending-yubin-confess.webp",
  endYubinConfess4: "/images/ending-yubin-confess.webp",
  endFrame: "/images/ending-player-frame.webp",
  endTaeo: "/images/ending-taeo-frame.webp",
  endSeoyoon: "/images/ending-seoyoon-frame.webp",
  endTruth: "/images/ending-yubin-confess.webp",
  endTruth2: "/images/ending-yubin-confess.webp",
  endCover: "/images/ending-yubin-confess.webp",
  endCover2: "/images/ending-yubin-confess.webp",
};

const iconMap = {
  "손에 묻은 피": "/images/evidence-blood-hand.webp",
  "뒤통수 상처": "/images/evidence-head-wound.webp",
  "깨진 액정 조각": "/images/evidence-phone-glass.webp",
  "도윤 팔의 교흔": "/images/evidence-bite-mark.webp",
  "서윤 협박 메시지": "/images/evidence-seoyoon-threat-message.webp",
  "준비실 쪽 목격담": "/images/evidence-seoyoon-hallway-witness.webp",
};

const baseChat = [['18:12','한서윤','수련회 조별 활동 시작할게.'],['18:13','강태오','집 가면 안 됨?'],['18:15','서도윤','태오는 시켜도 안 하잖아.'],['18:15','강태오','시비냐?'],['18:44','차유빈','플레이어는 어디 있어?'],['19:02','서도윤','강당 마이크 한 번만 써도 됨?'],['19:05','강태오','또 사고 치려고?'],['20:26','차유빈','플레이어 보면 나한테 말해줘.'],['20:31','서도윤','나 잠깐 수련원 준비실 감.'],['20:40','SYSTEM','정전']];

const SCENES = {
start:{title:'정전 20분',text:'고2 수련회 첫날 밤.\n산 속 수련원 전체가 정전됐다.\n\n20분 뒤, 같은 반 서도윤이 죽은 채 발견된다.\n그리고 당신은 그의 시체 옆에서 깨어난다.\n손에 묻은 피. 기억은 없다.',start:true},
p1:{p:'1',title:'프롤로그',bg:'science',text:'눈을 떴을 때, 가장 먼저 보인 건 수련원 준비실 천장이었다.\n머리가 깨질 듯 아팠다.\n바닥에는 서도윤이 쓰러져 있었다.',choices:[['다음','p2']]},
p2:{p:'2',title:'프롤로그',bg:'science',char:'bloodHand',text:'손을 내려다보니 피가 묻어 있었다.\n“이게..뭐야..?”\n\n아무것도 기억나지 않았다.\n복도 계단 끝에서 발소리가 다가오는 게 느껴진다.\n“...”',choices:[['화장실로 간다','p3',{inv:['손에 묻은 피','사건 직후 손에 묻어 있었다. 내가 한 짓인지, 누가 그렇게 만든 건지 알 수 없다.'],sus:1,suspect:'player'}]]},
p3:{p:'3',title:'화장실',bg:'bath',text:'세면대 물소리가 화장실 안에 울렸다. 당신은 손을 씻었다.\n피는 지워졌지만, 머릿속은 여전히 비어 있었다.\n그때 문이 열렸다.',choices:[['다음','p4']]},
p4:{p:'4',title:'화장실',bg:'bath',char:'yubin',text:'차유빈이었다.\n유빈은 잠깐 멈춰 섰다.\n\n“여기 있었네.”',choices:[['다음','p5']]},
p5:{p:'5',title:'화장실',bg:'bath',char:'yubin',text:'“다들 플레이어랑 서도윤 찾고 있어.”\n유빈은 당신 얼굴을 가만히 바라봤다.\n\n“플레이어, 왜 그래? 어디 아파?”',choices:[['대답한다','choiceYubin1']]},
choiceYubin1:{title:'어떻게 대답할까?',bg:'bath',char:'yubin',choices:[['아프긴... 괜찮아.','rY1',{sus:1}],['안 아파. 나도 서도윤 찾는 중이야.','rY2',{lie:1}],['그냥 좀 어지러워.','rY3',{truth:1}],['왜? 아파 보여?','rY4',{yubin:1}]]},
rY1:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“괜찮은 얼굴은 아닌데.”\n유빈은 한 걸음 다가왔다.\n\n“너 손 떨려.”',choices:[['다음','call']]},
rY2:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“그래?”\n유빈은 아주 잠깐 말을 멈췄다.\n\n“그럼 같이 찾자.”',choices:[['다음','call']]},
rY3:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“앉을래?”\n“아니면... 강당 먼저 갈래?”\n\n유빈은 휴대폰을 확인했다.',choices:[['다음','call']]},
rY4:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“응.”\n“많이.”\n\n유빈은 웃지 않았다.\n“너 지금 꼭... 뭔가 본 사람 같아.”',choices:[['다음','call']]},
call:{p:'7',title:'강당 호출',bg:'bath',char:'yubin',on(){if(!state.chat.find(c=>c[1]==='한서윤'&&c[2].includes('강당으로 와'))) {state.chat.push(['21:09','한서윤','다들 이거 보면 지금 강당으로 와. 빨리.']);state.chatUnread++}},text:'휴대폰이 짧게 울렸다.\n단톡방 알림이었다.\n\n한서윤: 다들 이거 보면 지금 바로 강당으로 와.',choices:[['강당으로 간다','br1']]},
br1:{p:'8',title:'강당',bg:'broadcast',char:'seoyoon',text:'강당에는 서윤, 태오, 유빈이 모여 있었다.\n서윤이 입을 열었다.\n\n“도윤이 안 보여.”\n\n서윤은 당신 쪽을 봤다.\n“플레이어, 혹시 뭐 아는 거 있어?”',choices:[['다음','br2']]},
br2:{p:'9',title:'강당',bg:'broadcast',char:'seoyoon',text:'“마지막으로 같이 있었던 사람 있어?”',choices:[['대답한다','choiceLast']]},
choiceLast:{title:'어떻게 할까?',bg:'broadcast',char:'seoyoon',choices:[['마지막으로 같이 있었다고 말한다.','lastA',{truth:1,sus:2}],['아무 말도 하지 않는다.','lastB',{suspect:'player',lie:1,sus:1}],['도윤이 어딨는데?','lastC',{sus:1}],['다른 사람들 반응을 본다.','lastD',{truth:1}]]},
lastA:{p:'10',title:'강당',bg:'broadcast',char:'seoyoon',text:'“...나.”\n\n순간 강당이 조용해졌다.\n서윤이 바로 물었다.\n\n“언제?”',choices:[['다음','teacher']]},
lastB:{p:'10',title:'강당',bg:'broadcast',text:'당신은 입을 다물었다.\n손바닥에 식은땀이 났다.\n\n혹시...\n내가 정말...',choices:[['다음','teacher']]},
lastC:{p:'10',title:'강당',bg:'broadcast',char:'taeo',text:'“도윤이 어딨는데?”\n\n태오가 짜증 섞인 얼굴로 말했다.\n“플레이어, 그걸 우리가 묻는 거잖아.”',choices:[['다음','teacher']]},
lastD:{p:'10',title:'강당',bg:'broadcast',text:'태오는 불쾌해 보였다.\n서윤은 침착했다.\n유빈은 당신만 보고 있었다.\n\n이상하게도, 그게 제일 신경 쓰였다.',choices:[['다음','teacher']]},
teacher:{p:'11',title:'사망 발표',bg:'broadcast',text:'강당 문이 열렸다.\n담임이 들어왔다.\n\n“수련원 준비실에서 학생이 발견됐다.”\n“...서도윤이다.”',choices:[['다음','afterDeath']]},
afterDeath:{p:'12',title:'사망 발표',bg:'broadcast',text:'당신은 아무 말도 하지 못했다.\n\n왜냐하면.\n당신은 이미 알고 있었기 때문이다.',choices:[['어떻게 할까?','choiceAfterDeath']]},
choiceAfterDeath:{title:'어떻게 할까?',bg:'broadcast',choices:[['수련원 준비실 이야기를 꺼낸다.','adA',{suspect:'seoyoon',sus:2,truth:1}],['아직 말하지 않는다.','adB',{suspect:'player',lie:1}],['단톡방을 확인한다.','adC',{suspect:'seoyoon',chatObs:1,truth:1}],['유빈을 본다.','adD',{suspect:'yubin',yubin:1}]]},
adA:{p:'13',title:'강당',bg:'broadcast',text:'“나... 수련원 준비실에 갔던 것 같아.”\n\n모두의 시선이 당신에게 꽂혔다.',choices:[['현장으로 간다','invest1']]},
adB:{p:'13',title:'강당',bg:'broadcast',text:'말하지 않았다.\n말하는 순간, 모든 게 나를 향할 것 같았다.',choices:[['현장으로 간다','invest1']]},
adC:{p:'13',title:'단톡방',bg:'class',text:'단톡방 마지막 메시지는 하나였다.\n\n20:31\n서도윤: 나 잠깐 수련원 준비실 감.',choices:[['현장으로 간다','invest1']]},
adD:{p:'13',title:'강당',bg:'broadcast',char:'yubin',text:'유빈은 걱정스러운 얼굴로 당신을 보고 있었다.\n\n“플레이어, 괜찮아?”\n\n그 표정이 이상하게 편해서, 더 불안했다.',choices:[['현장으로 간다','invest1']]},
invest1:{p:'14',title:'수련원 준비실',bg:'science',text:'수련원 준비실은 통제되어 있었다.\n하지만 문 너머로 보이는 것들이 있었다.\n\n책상 모서리.\n바닥의 작은 조각.\n도윤의 팔.',choices:[['무엇을 먼저 볼까?','choiceInspect1']]},
choiceInspect1:{title:'무엇을 먼저 볼까?',bg:'science',choices:[['내 상태를 확인한다.','headEvidence',{truth:2,inv:['뒤통수 상처','뒤통수에 최근 충격 흔적이 있다. 내가 먼저 쓰러졌을 가능성이 생겼다.']}],['바닥의 작은 조각을 본다.','glassEvidence',{truth:1,yubin:1,inv:['깨진 액정 조각','수련원 준비실 바닥에서 발견된 휴대폰 액정 조각. 내 것도 도윤 것도 아닌 듯하다.']}],['도윤의 팔을 본다.','biteEvidence',{truth:1,inv:['도윤 팔의 교흔','도윤의 팔에 남은 물린 자국. 누군가 도윤과 몸싸움을 했다.']}],['아무것도 보지 않는다.','noEvidence',{suspect:'player',sus:1}]]},
headEvidence:{p:'15',title:'증거',bg:'science',text:'손을 뒤통수에 가져가자, 작은 혹이 만져졌다.\n\n내가 누군가를 때린 게 아니라.\n누군가에게 당한 건 아닐까.',choices:[['다음','taeo1']]},
glassEvidence:{p:'15',title:'증거',bg:'science',text:'바닥에 작은 액정 조각이 있었다.\n\n내 휴대폰은 멀쩡하다.\n도윤의 휴대폰도 깨져 있지 않았다.',choices:[['다음','taeo1']]},
biteEvidence:{p:'15',title:'증거',bg:'science',text:'도윤의 팔에 물린 자국이 있었다.\n\n정전 중, 도윤은 누군가와 몸싸움을 했다.',choices:[['다음','taeo1']]},
noEvidence:{p:'15',title:'현장',bg:'science',text:'더 보지 않았다.\n\n보면 볼수록, 내가 더 위험해질 것 같았다.',choices:[['다음','taeo1']]},
taeo1:{p:'16',title:'태오',bg:'science',char:'taeo',text:'태오는 벽에 기대 서 있었다.\n\n“왜?”\n“너도 나 의심하냐?”',choices:[['대답한다','choiceTaeo']]},
choiceTaeo:{title:'태오에게 뭐라고 할까?',bg:'class',char:'taeo',choices:[['너 도윤이랑 싸웠잖아.','taeoA',{suspect:'taeo',wrong:2}],['도윤이랑 마지막으로 무슨 얘기 했어?','taeoB',{suspect:'taeo',truth:1}],['넌 범인 아닌 것 같아.','taeoC',{truth:1}],['아무 말 없이 본다.','taeoD',{suspect:'player',sus:1}]]},
taeoA:{p:'17',title:'태오',bg:'science',char:'taeo',text:'“싸웠지.”\n“걔랑 안 싸운 사람이 있긴 해?”\n\n태오는 당신을 빤히 봤다.\n“플레이어, 너도 걔 싫어했잖아.”',choices:[['다음','yubin2']]},
taeoB:{p:'17',title:'태오',bg:'science',char:'taeo',text:'“마지막?”\n태오는 코웃음을 쳤다.\n\n“그 새끼가 나한테만 시비 턴 줄 알아?”',choices:[['다음','yubin2']]},
taeoC:{p:'17',title:'태오',bg:'science',char:'taeo',text:'“그 말도 기분 더럽네.”\n“너 지금 누구 편 드는 거야?”',choices:[['다음','yubin2']]},
taeoD:{p:'17',title:'태오',bg:'science',char:'taeo',text:'“뭐야.”\n“그 눈깔.”\n\n“너도 뭔가 숨기는 거 있지?”',choices:[['다음','yubin2']]},
yubin2:{p:'18',title:'유빈',bg:'hall',char:'yubin',text:'유빈의 휴대폰 화면이 켜졌다.\n액정 한쪽이 깨져 있었다.\n\n당신은 수련원 준비실 바닥의 액정 조각을 떠올렸다.',choices:[['어떻게 할까?','choiceYubin2']]},
choiceYubin2:{title:'유빈에게 어떻게 할까?',bg:'hall',char:'yubin',choices:[['액정 언제 깨졌어?','yuA',{suspect:'yubin',yubin:2,truth:1}],['현장에서 액정 조각 봤어.','yuB',{suspect:'yubin',yubin:2,truth:1}],['아무것도 묻지 않는다.','yuC',{lie:1}],['내 휴대폰도 확인한다.','yuD',{suspect:'yubin',truth:1}]]},
yuA:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'“아, 이거?”\n유빈은 휴대폰을 뒤집어 쥐었다.\n\n“아까 떨어뜨렸어.”\n“왜?”',choices:[['다음','prePolice1']]},
yuB:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'유빈의 표정이 아주 잠깐 멈췄다.\n정말 잠깐이었다.\n\n“그래?”\n“그런 게 있었어?”',choices:[['다음','prePolice1']]},
yuC:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'유빈은 아무 일 없다는 듯 말했다.\n\n“가자.”\n“혼자 있지 말고.”',choices:[['다음','prePolice1']]},
yuD:{p:'19',title:'휴대폰',bg:'hall',text:'당신의 휴대폰은 멀쩡했다.\n\n그렇다면 수련원 준비실의 액정 조각은\n당신 것도, 도윤 것도 아니다.',choices:[['다음','prePolice1']]},

prePolice1:{p:"20",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"강당으로 돌아오자 서윤이 휴대폰을 내려놓았다.\n\n그때 누군가 말했다.\n\n“정전 직전에 준비실 쪽으로 간 사람을 봤다는 얘기가 있어.”",choices:[["다음","prePolice1_2"]]},
prePolice1_2:{p:"20",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"목격자는 이름을 확실히 말하지 못했다.\n하지만 한 가지는 말했다.\n\n짧은 머리. 단정한 집업. 반장 명찰.\n\n모두의 시선이 서윤에게 옮겨갔다.",choices:[["서윤에게 준비실 쪽에 갔는지 묻는다","prePolice1A",{suspect:"seoyoon",truth:1,inv:["준비실 쪽 목격담","정전 직전 준비실 쪽으로 반장 명찰을 단 학생이 갔다는 목격담. 확실한 증거는 아니지만 서윤을 의심하게 만들기엔 충분하다."]}],["목격담은 애매하다고 말한다","prePolice1B",{suspect:"player"}],["유빈을 본다","prePolice1C",{suspect:"yubin",yubin:1}],["태오를 본다","prePolice1D",{suspect:"taeo"}]]},
prePolice1A:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"“서윤아, 정전 직전에 준비실 쪽에 갔어?”\n\n서윤은 바로 대답하지 못했다.\n\n“...잠깐 지나가긴 했어.”\n“근데 안에 들어가진 않았어.”\n\n말은 차분했지만, 모두가 듣기엔 충분히 수상했다.",choices:[["다음","prePolice2"]]},
prePolice1B:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"당신은 목격담이 너무 애매하다고 말했다.\n\n하지만 그 말이 오히려 이상하게 들렸다.\n\n“왜 네가 서윤을 감싸?”\n\n시선 일부가 다시 당신에게 돌아왔다.",choices:[["다음","prePolice2"]]},
prePolice1C:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"yubin",text:"당신은 유빈을 봤다.\n\n유빈은 고개를 숙이고 있었다.\n\n그 순간만큼은 유빈보다 서윤 쪽에 더 많은 시선이 쏠려 있었다.",choices:[["다음","prePolice2"]]},
prePolice1D:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"taeo",text:"태오는 인상을 찌푸렸다.\n\n“왜 또 나를 봐.”\n\n태오의 말투는 날카로웠지만, 이번 목격담과는 잘 맞지 않았다.",choices:[["다음","prePolice2"]]},
prePolice2:{p:"21",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"그때 서윤의 휴대폰 화면이 켜졌다.\n\n잠금화면 위로 도윤에게서 온 예전 메시지 일부가 보였다.\n\n[오늘 밤까지 말 안 하면 다 퍼뜨린다]\n\n서윤이 급하게 화면을 껐다.\n\n강당 안 공기가 바뀌었다.",choices:[["서윤에게 협박받았냐고 묻는다","prePolice2A",{suspect:"seoyoon",points:2,inv:["서윤 협박 메시지","도윤이 서윤에게 보낸 협박성 메시지. 원한관계가 드러나면서 서윤에게 의심이 몰릴 수 있다."]}],["왜 숨겼는지 묻는다","prePolice2B",{suspect:"seoyoon",points:1}],["유빈의 위치 진술을 다시 묻는다","prePolice2C",{suspect:"yubin",yubin:1,truth:1}],["태오와 도윤의 다툼을 꺼낸다","prePolice2D",{suspect:"taeo"}]]},
prePolice2A:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"“도윤한테 협박받고 있었어?”\n\n서윤은 입술을 깨물었다.\n\n“...그건 사건이랑 상관없어.”\n\n하지만 이미 늦었다.\n원한이 있었다는 말은, 모두에게 가장 이해하기 쉬운 이유가 됐다.",choices:[["다음","prePolice3"]]},
prePolice2B:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"“왜 숨겼어?”\n\n서윤은 한참 뒤에야 말했다.\n\n“말하면 더 커질까 봐.”\n\n그 말은 현실적이었다.\n하지만 동시에 변명처럼 들렸다.",choices:[["다음","prePolice3"]]},
prePolice2C:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"yubin",text:"당신은 유빈에게 물었다.\n\n“정전됐을 때 정확히 어디 있었어?”\n\n유빈은 잠깐 늦게 대답했다.\n\n“나는... 별관 복도.”\n\n별관 쪽이면 준비실과 멀지 않았다.",choices:[["다음","prePolice3"]]},
prePolice2D:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"taeo",text:"당신은 태오와 도윤이 다퉜다는 이야기를 꺼냈다.\n\n태오가 바로 목소리를 높였다.\n\n“싸운 거랑 죽인 거랑 같냐?”\n\n태오의 반응은 거칠었다.\n그래서 누군가에겐 더 수상해 보였다.",choices:[["다음","prePolice3"]]},


prePolice3:{p:"22",title:"추궁 3",bg:"science",char:"none",text:"머리가 다시 아파왔다.\n\n끊긴 기억 사이로 짧은 장면이 떠올랐다.\n\n누군가 도윤을 밀쳤다.\n누군가 당신 쪽을 돌아봤다.\n그리고 정전.",choices:[["그 얼굴을 떠올린다","prePolice3A",{suspect:"yubin",truth:2}],["기억을 억지로 누른다","prePolice3B",{suspect:"player",sus:1}],["도윤의 팔을 떠올린다","prePolice3C",{suspect:"taeo",truth:1}],["서윤의 협박 메시지를 떠올린다","prePolice3D",{suspect:"seoyoon",points:1}]]},
prePolice3A:{p:"22-1",title:"추궁 3",bg:"science",char:"yubin",text:"흐릿했던 얼굴이 조금씩 선명해졌다.\n\n겁에 질린 눈.\n떨리던 손.\n\n차유빈이었다.",choices:[["다음","finalAsk"]]},
prePolice3B:{p:"22-1",title:"추궁 3",bg:"science",text:"떠올리면 안 될 것 같았다.\n\n하지만 피할수록 더 선명해지는 것들이 있다.\n\n이제 누군가는 지목해야 한다.",choices:[["다음","finalAsk"]]},
prePolice3C:{p:"22-1",title:"추궁 3",bg:"science",text:"도윤의 팔.\n물린 자국.\n\n그건 일방적인 폭행이 아니었다.\n누군가 도윤에게서 벗어나려 했다.",choices:[["다음","finalAsk"]]},
prePolice3D:{p:"22-1",title:"추궁 3",bg:"science",char:"yubin",text:"정전 직전, 누군가 이렇게 말했었다.\n\n“그만해.”\n\n그 목소리는 차유빈이었다.",choices:[["다음","finalAsk"]]},

finalAsk:{p:'23',title:'마지막 판단',bg:'broadcast',text:'경찰이 도착했다.\n\n수련원 강당 안은 조용했다.\n누군가를 직접 지목하지 않아도, 지금까지의 말과 선택은 이미 한 사람을 향하고 있었다.',choices:[['결말 확인하기','AUTO_END']]},

truthLead:{p:'21',title:'기억',bg:'science',char:'yubin',text:'끊겼던 기억이 이어졌다.\n\n수련원 준비실.\n서도윤.\n차유빈.\n그리고 피.\n\n그 순간 알았다.\n정전 20분 동안, 차유빈도 그곳에 있었다.',choices:[['진실을 말할까?','choiceTruth']]},
choiceTruth:{title:'진실을 말할까?',bg:'class',char:'yubin',choices:[['차유빈이 서도윤을 죽였다고 말한다.','endTruth'],['차유빈의 이름을 말하지 않는다.','endCover']]},

endPlayerFrame:{p:'END',title:'플레이어 누명 엔딩',bg:'dark',char:'yubin',text:'유빈이 떨리는 목소리로 말했다.\n\n“처음에 발견된 건 너였잖아.”\n“손에 피도 묻어 있었고.”\n“기억도 안 난다고 했고.”\n\n모두가 당신을 봤다.\n\n당신은 반박하려 했지만, 정확히 기억나는 게 없었다.\n\n결국 경찰은 당신을 데려갔다.\n수련원 창문 너머로 유빈이 보였다.\n\n유빈은 끝까지 울고 있었다.\n그래서 더 찝찝했다.',choices:[['처음부터 다시 하기','restart']]},
endTaeoFrame:{p:'END',title:'태오 지목 엔딩',bg:'dark',char:'taeo',text:'처음엔 아무도 확신하지 못했다.\n\n하지만 누군가 말했다.\n\n“태오, 도윤이랑 사이 안 좋았잖아.”\n“아까도 싸웠고.”\n“정전 때 강당 근처에 있었다며?”\n\n말들이 하나씩 쌓였다.\n태오가 벌떡 일어났다.\n\n“야, 미쳤냐?”\n“나 아니라고!”\n\n하지만 이미 강당 안의 시선은 태오에게 꽂혀 있었다.\n\n경찰은 태오를 데려갔다.\n태오는 끝까지 아니라고 소리쳤다.',choices:[['처음부터 다시 하기','restart']]},
endSeoyoonFrame:{p:'END',title:'서윤 누명 엔딩',bg:'dark',char:'seoyoon',text:'범인을 찾기 어려운 가운데, 서윤의 이름이 나왔다.\n\n정전 직전 준비실 쪽으로 갔다는 목격담.\n도윤에게 협박받고 있었다는 메시지.\n그 사실을 숨기려 했던 태도.\n\n하나하나는 완벽하지 않았다.\n하지만 함께 놓이자 너무 그럴듯했다.\n\n서윤은 조용히 말했다.\n\n“나 아니야.”\n“나 정말 안 들어갔어.”\n\n하지만 아무도 쉽게 믿지 않았다.\n\n경찰이 서윤을 데려가는 동안,\n서윤은 딱 한 번 당신을 돌아봤다.\n\n억울하다는 말도 못 할 만큼 지친 얼굴이었다.',choices:[['처음부터 다시 하기','restart']]},
endYubinConfess:{p:'END',title:'유빈 자백 엔딩',bg:'dark',char:'yubin',text:'증거는 점점 차유빈을 향했다.\n\n깨진 휴대폰.\n정전 당시 위치.\n도윤 팔의 교흔.\n그리고 끊겨 있던 기억.\n\n누군가 떨리는 목소리로 말했다.\n\n“너였어?”\n“차유빈, 네가 범인이었어?”\n\n유빈은 처음엔 고개를 저었다.\n\n“아니야.”\n“나 아니야.”\n\n하지만 시선은 점점 더 유빈에게 모였다.\n\n“너 맞잖아.”\n“증거가 뻔히 있는데.”\n\n그 순간 유빈이 작게 웃었다.\n\n“큭.”\n“큭큭...”\n\n“너희 실은 도윤이 잘 죽었다고 생각하고 있잖아.”\n\n강당이 얼어붙었다.\n\n“여기 서도윤한테 협박 안 받은 사람 있어?”\n“서도윤 나쁜 놈이야.”\n“잘 죽었다고!”\n\n유빈은 숨을 몰아쉬며 소리쳤다.\n\n“오히려 나한테 고마워해야 하는 거 아니야?!”\n\n그 말이 끝나자, 아무도 유빈을 감싸지 않았다.\n경찰이 유빈의 손목을 잡았다.',choices:[['처음부터 다시 하기','restart']]},

endFrame:{p:'END',title:'플레이어 누명 엔딩',bg:'dark',char:'yubin',text:'유빈이 떨리는 목소리로 말했다.\n\n“처음에 발견된 건 너였잖아.”\n“손에 피도 묻어 있었고.”\n“기억도 안 난다고 했고.”\n\n모두가 당신을 봤다.\n\n당신은 반박하려 했지만, 정확히 기억나는 게 없었다.\n\n결국 경찰은 당신을 데려갔다.\n수련원 창문 너머로 유빈이 보였다.\n\n유빈은 끝까지 울고 있었다.\n그래서 더 찝찝했다.',choices:[['처음부터 다시 하기','restart']]},endTaeo:{p:'END',title:'태오 오답 엔딩',bg:'dark',text:'당신은 태오를 지목했다.\n태오는 조사받고 풀려났다.\n\n며칠 뒤, 단톡방에서 아무도 태오의 이름을 꺼내지 않았다.\n\n범인을 찾는다는 말이, 누군가를 범인으로 만드는 말이 될 수도 있었다.',choices:[['처음부터 다시 하기','restart']]},
endSeoyoon:{p:'END',title:'서윤 오답 엔딩',bg:'dark',text:'당신은 서윤을 지목했다.\n서윤은 끝까지 침착했다.\n\n그리고 다음 날부터, 아무도 서윤에게 말을 걸지 않았다.\n\n진실을 찾은 게 아니라, 그럴듯한 사람을 고른 것뿐이었다.',choices:[['처음부터 다시 하기','restart']]},
endNoProof:{p:'END',title:'증거 없는 진실',bg:'dark',text:'당신은 무언가 떠올리려 했다.\n하지만 기억은 끝까지 이어지지 않았다.\n\n진실에 가까웠다.\n하지만 가까운 것만으로는 아무것도 바꿀 수 없었다.',choices:[['처음부터 다시 하기','restart']]},
endSilent:{p:'END',title:'침묵 엔딩',bg:'dark',text:'당신은 모른다고 말했다.\n\n사건은 애매하게 끝났다.\n누명은 피했다.\n하지만 진실도 잃었다.\n\n손을 씻을 때마다, 아직도 그날의 피가 남아 있는 것 같았다.',choices:[['처음부터 다시 하기','restart']]},

truth1:{p:'FINAL-1',title:'최종 추궁',bg:'broadcast',char:'yubin',text:'당신은 차유빈을 바라봤다.\n\n“범인은 차유빈이야.”\n\n강당 안이 조용해졌다.\n유빈은 놀란 얼굴로 당신을 봤다.\n\n“...나?”',choices:[['증거를 꺼낸다','truth2']]},
truth2:{p:'FINAL-2',title:'최종 추궁',bg:'broadcast',char:'yubin',text:'당신은 하나씩 말했다.\n\n수련원 준비실 바닥의 액정 조각.\n도윤 팔의 교흔.\n그리고 내 뒤통수의 상처.\n\n“그때 준비실에는 나랑 도윤만 있었던 게 아니야.”',choices:[['유빈의 휴대폰을 본다','truth3']]},
truth3:{p:'FINAL-3',title:'최종 추궁',bg:'broadcast',char:'yubin',text:'유빈은 휴대폰을 뒤로 숨겼다.\n\n액정 한쪽이 깨져 있었다.\n\n당신은 준비실 바닥에 있던 조각을 떠올렸다.\n\n“그 조각, 네 휴대폰 거지?”',choices:[['마지막 기억을 떠올린다','truth4']]},
truth4:{p:'FINAL-4',title:'기억',bg:'science',char:'yubin',text:'끊겨 있던 장면이 이어졌다.\n\n도윤이 유빈의 팔을 잡았다.\n유빈이 도윤을 밀쳤다.\n당신은 뒤통수를 부딪치고 쓰러졌다.\n\n그리고 정전.\n\n유빈은 네가 죽은 줄 알았던 거다.',choices:[['차유빈의 이름을 말한다','endTruth']]},
endTruth:{p:'END',title:'진실 엔딩 - 차유빈',bg:'dark',char:'yubin',text:'당신은 마지막으로 말했다.\n\n“차유빈이 서도윤을 죽였습니다.”\n\n처음으로 유빈의 표정이 무너졌다.\n\n“기억 못 할 줄 알았어.”\n“정말로.”\n\n잠시 뒤, 수련원 마당에 경찰차 불빛이 번졌다.\n형사가 차유빈의 손목을 잡았다.\n\n유빈은 끝까지 당신을 보지 않았다.',choices:[['처음부터 다시 하기','restart']]},
endCover:{p:'END',title:'침묵의 공범 - 차유빈',bg:'dark',char:'yubin',text:'당신은 진실을 알았다.\n차유빈이 서도윤을 죽였다는 것도.\n\n하지만 당신은 차유빈의 이름을 말하지 않았다.\n\n차유빈은 아무 말도 하지 않았다.\n\n그 침묵이 고맙다는 뜻인지, 협박인지, 당신은 끝내 알 수 없었다.',choices:[['처음부터 다시 하기','restart']]}
};

function initialState() {
  return {
    name: "",
    scene: "start",
    history: [],
    chat: [],
    chatUnread: 0,
    invUnread: 0,
    inv: {},
    sus: 0,
    truth: 0,
    yubin: 0,
    lie: 0,
    chatObs: 0,
    suspects: { player: 0, taeo: 0, seoyoon: 0, yubin: 0 },
  };
}

function getDisplayName(raw) {
  const base = (raw || "").trim() || "플레이어";
  return base.endsWith("쨩") ? base : base + "쨩";
}

function addSuspicion(state, who, amount = 1) {
  if (!who) return state;
  return {
    ...state,
    suspects: {
      ...state.suspects,
      [who]: (state.suspects?.[who] || 0) + amount,
    },
  };
}

function applyEffect(state, effect = {}) {
  let next = {
    ...state,
    sus: state.sus + (effect.sus || 0),
    truth: state.truth + (effect.truth || 0),
    yubin: state.yubin + (effect.yubin || 0),
    lie: state.lie + (effect.lie || 0),
    chatObs: state.chatObs + (effect.chatObs || 0),
  };

  if (effect.suspect) {
    next = addSuspicion(next, effect.suspect, effect.points || 1);
  }

  if (effect.inv) {
    const [name, desc] = effect.inv;
    next = {
      ...next,
      inv: { ...next.inv, [name]: desc },
      invUnread: next.invUnread + 1,
    };
  }

  return next;
}

function getAutoEnding(state) {
  const s = state.suspects || { player: 0, taeo: 0, seoyoon: 0, yubin: 0 };
  const order = ["player", "taeo", "seoyoon", "yubin"];
  let best = "player";

  for (const key of order) {
    if ((s[key] || 0) > (s[best] || 0)) best = key;
  }

  return {
    player: "endPlayerFrame",
    taeo: "endTaeoFrame",
    seoyoon: "endSeoyoonFrame",
    yubin: "endYubinConfess",
  }[best];
}

function route(key, state) {
  if (key === "AUTO_END") return getAutoEnding(state);
  if (key === "route:self") return "endPlayerFrame";
  if (key === "route:taeo") return "endTaeoFrame";
  if (key === "route:seoyoon") return "endSeoyoonFrame";
  if (key === "route:yubin") return "endYubinConfess";
  return key;
}

function isChoiceOnlyScene(key) {
  const target = SCENES[key];
  return !!(
    target &&
    !target.start &&
    !target.text &&
    target.choices &&
    target.choices.length > 1
  );
}

function fillText(text, state) {
  const name = state.name || "플레이어쨩";
  return String(text || "")
    .replaceAll("{name}", name)
    .replaceAll("플레이어랑", `${name}이랑`)
    .replaceAll("플레이어는", `${name}는`)
    .replaceAll("플레이어,", `${name},`)
    .replaceAll("플레이어", name);
}

function chatClass(name) {
  if (name === "한서윤") return "seoyoon";
  if (name === "강태오") return "taeo";
  if (name === "서도윤") return "doyoon";
  if (name === "차유빈") return "yubin";
  if (name === "SYSTEM") return "system";
  return "";
}

function chatAvatar(name) {
  if (name === "한서윤") return "서";
  if (name === "강태오") return "태";
  if (name === "서도윤") return "도";
  if (name === "차유빈") return "유";
  return "";
}

export default function App() {
  const [state, setState] = useState(initialState);
  const [view, setView] = useState("story");
  const [nameInput, setNameInput] = useState("");
  const [modal, setModal] = useState(null);

  const scene = SCENES[state.scene] || SCENES.start;
  const isStart = !!scene.start;
  const isChoiceView = view === "choice";

  const makeHistoryItem = (sceneKey, viewName) => ({
    scene: sceneKey,
    view: viewName || "story",
  });

  const readHistoryItem = (item) => {
    if (!item) return null;
    if (typeof item === "string") {
      return { scene: item, view: "story" };
    }
    return {
      scene: item.scene || "start",
      view: item.view || "story",
    };
  };

  const go = (key, effect = {}) => {
    if (key === "restart") {
      setState(initialState());
      setView("story");
      setModal(null);
      setNameInput("");
      return;
    }

    const predictedState = applyEffect(state, effect);
    const predictedRoute = route(key, predictedState);
    const nextView = isChoiceOnlyScene(predictedRoute) ? "choice" : "story";

    setState((prev) => {
      let next = applyEffect(prev, effect);
      const routed = route(key, next);

      return {
        ...next,
        scene: routed,
        history: [
          ...(next.history || []),
          makeHistoryItem(prev.scene, view),
        ],
      };
    });

    setView(nextView);
    setModal(null);
  };

  const back = () => {
    if (state.scene === "start") return;

    const history = [...(state.history || [])];
    const last = readHistoryItem(history.pop());

    if (!last) {
      setView("story");
      return;
    }

    setState((prev) => ({
      ...prev,
      scene: last.scene,
      history,
    }));

    setView(last.view);
    setModal(null);
  };

  const startGame = () => {
    const displayName = getDisplayName(nameInput);

    setState((prev) => ({
      ...prev,
      name: displayName,
      scene: "p1",
      history: [makeHistoryItem("start", "story")],
      chat: baseChat.map(([time, name, msg]) => [
        time,
        name,
        fillText(msg, { ...prev, name: displayName }),
      ]),
    }));

    setView("story");
    setModal(null);
  };

  const showChoices = () => {
    if (scene.choices && scene.choices.length === 1) {
      const [, next, effect] = scene.choices[0];
      go(next, effect || {});
      return;
    }
    setView("choice");
  };

  const openChat = () => {
    setState((prev) => ({
      ...prev,
      chatUnread: 0,
      chat: prev.chat.length
        ? prev.chat
        : baseChat.map(([time, name, msg]) => [time, name, fillText(msg, prev)]),
    }));
    setModal("chat");
  };

  const openInventory = () => {
    setState((prev) => ({ ...prev, invUnread: 0 }));
    setModal("inventory");
  };

  const bg = BG[scene.bg || "dark"];
  const ch = CHAR[scene.char || "none"];
  const endingBg = ENDING_IMG[state.scene]
    ? `url("${ENDING_IMG[state.scene]}")`
    : bg;
  const btnLabel =
    scene.choices && scene.choices.length === 1 ? scene.choices[0][0] : "선택하기";

  return (
    <div className={`app ${isStart ? "app-main" : ""}`}>
      <header>
        <button
          className="ghost"
          onClick={back}
          style={{ visibility: state.scene === "start" ? "hidden" : "visible" }}
        >
          이전
        </button>
        <div className="top-title"></div>
        <div className="progress">{scene.p || ""}</div>
      </header>

      <main id="screen">
      {isStart ? (
        <div className="main-start">
          <div className="main-bg-name">/images/bg-main.webp</div>
          <div className="main-bottom">
            <p className="main-copy">{scene.text}</p>
            <div className="start-card">
              <div className={`name-field ${nameInput ? "has-value" : ""}`}>
                <input
                  id="nameInput"
                  placeholder="당신의 이름은 무엇인가요?"
                  maxLength={8}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <span className="name-suffix">쨩</span>
              </div>
              <button className="primary" onClick={startGame}>
                게임 입장
              </button>
            </div>
          </div>
        </div>
      ) : (isChoiceView || isChoiceOnlyScene(state.scene)) ? (
          <div className="choice-page">
            <div className="choice-card">
              <h2>{scene.title}</h2>
              <div className="choices">
                {(scene.choices || []).map(([label, next, effect], idx) => (
                  <button key={idx} onClick={() => go(next, effect || {})}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : scene.p === "END" ? (
          <div className="scene ending-scene" style={{ "--scene-bg": endingBg }}>
            <div className="bg">
              <div className="bg-name">
                {ENDING_IMG[state.scene] || "/images/ending-placeholder.webp"}
              </div>
            </div>
            <div className="ending-card">
              <h2>{scene.title}</h2>
              <p>{fillText(scene.text, state)}</p>
            </div>
            <div className="actions">
              {scene.choices ? (
                <button className="primary" onClick={showChoices}>
                  {btnLabel}
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="scene" style={{ "--scene-bg": bg }}>
            <div className="bg">
              <div className="bg-name">{BGNAME[scene.bg || "dark"] || ""}</div>
            </div>
            <div className={`char ${ch ? "" : "none"} char-${scene.char || "none"}`}> {ch ? <img src={ch} alt="" /> : null} </div>
            <div className="card">
              <h2>{scene.title}</h2>
              <p>{fillText(scene.text, state)}</p>
            </div>
            <div className="actions">
              {scene.choices ? (
                <button className="primary" onClick={showChoices}>
                  {btnLabel}
                </button>
              ) : null}
            </div>
          </div>
        )}
      </main>


      {modal === "chat" && (
        <div className="modal" onClick={() => setModal(null)}>
          <div className="modal-panel chat-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <strong>2학년 수련회 단톡방</strong>
              <button onClick={() => setModal(null)}>닫기</button>
            </div>
            <div id="chatList" className="chat-list">
              {state.chat.map(([time, name, msg], idx) => {
                const cls = chatClass(name);

                if (name === "SYSTEM") {
                  return (
                    <div className="chat-row system" key={idx}>
                      <div className="chat-pack">
                        <div className="bubble">{msg}</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className={`chat-row ${cls}`} key={idx}>
                    <div className="chat-avatar">{chatAvatar(name)}</div>
                    <div className="chat-pack">
                      <div className="chat-meta">
                        <span className="chat-name">{name}</span>
                        <span>{time}</span>
                      </div>
                      <div className="bubble">{fillText(msg, state)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {modal === "inventory" && (
        <div className="modal" onClick={() => setModal(null)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <strong>증거</strong>
              <button onClick={() => setModal(null)}>닫기</button>
            </div>
            <div className="inv-grid">
              {Object.keys(state.inv).length ? (
                Object.entries(state.inv).map(([name, desc]) => (
                  <div className="inv-card" key={name}>
                    <div className="inv-img">
                      {iconMap[name] || "//images/evidence-placeholder.webp"}
                    </div>
                    <div className="inv-name">{name}</div>
                    <div className="inv-desc">{desc}</div>
                  </div>
                ))
              ) : (
                <p className="muted">아직 확보한 증거가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
