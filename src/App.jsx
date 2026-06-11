import React, { useEffect, useState } from "react";
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
  phone: "/images/char-chat-phone.webp",
};

const ENDINGS = [
  {
    id: "endPlayerFrame",
    title: "플레이어 누명 엔딩",
    char: "yubin",
    image: "/images/ending-player-frame.webp",
    pages: [
      `유빈이 떨리는 목소리로 말했다.

“처음에 도윤이 옆에서 발견된 건 너였어.”
“손에 피도 묻어 있었고.”
“기억도 안 난다고 했고.”

그 말은 너무 쉽게 모두의 머릿속에 들어갔다.

도윤 옆에 늘 붙어 다니던 사람.
도윤이 누군가를 웃음거리로 만들 때, 말리기보다 같이 웃던 사람.
기억을 잃은 당신은 가장 편한 범인이었다.`,
      `당신은 아니라고 말하려 했다.
하지만 준비실 바닥의 감촉, 손에 묻어 있던 피, 끊긴 기억이 동시에 떠올랐다.

“너 도윤이랑 제일 가까웠잖아.”

누군가의 그 한마디가 강당 안에 떨어졌다.
확실히 반박할 수 있는 말이 없었다.

서윤은 고개를 숙였고, 태오는 입술만 깨물었다.
유빈은 울고 있었다.`,
      `경찰이 당신을 데려가는 동안, 유빈은 끝내 당신과 눈을 마주치지 않았다.

수련원 창문에 비친 당신의 얼굴은 낯설었다.

그제야 이상한 생각이 들었다.

정말 유빈은 당신이 걱정돼서 울고 있었을까.
아니면, 당신이 마지막까지 아무것도 기억하지 못해서 안도한 걸까.`,
    ],
  },
  {
    id: "endTaeoFrame",
    title: "태오 지목 엔딩",
    char: "taeo",
    image: "/images/ending-taeo-frame.webp",
    pages: [
      `처음엔 아무도 확신하지 못했다.

하지만 누군가 태오의 이름을 꺼냈다.

“태오, 도윤이랑 사이 안 좋았잖아.”
“아까도 싸웠고.”
“정전 때도 강당 근처에서 언성 높였다며?”

말은 증거보다 빨랐다.`,
      `태오가 벌떡 일어났다.

“야, 미쳤냐?”
“나 아니라고!”

목소리가 커질수록 사람들은 더 확신하는 얼굴이 됐다.
화가 난 사람은 늘 뭔가 숨기는 사람처럼 보이니까.`,
      `경찰은 태오를 데려갔다.
태오는 끝까지 아니라고 소리쳤다.

강당은 조용해졌다.
사건이 해결된 것처럼.

하지만 당신은 알고 있었다.
태오를 의심하게 만든 건 진실이 아니라, 모두가 이해하기 쉬운 이야기였다는 걸.`,
    ],
  },
  {
    id: "endSeoyoonFrame",
    title: "서윤 누명 엔딩",
    char: "seoyoon",
    image: "/images/ending-seoyoon-frame.webp",
    pages: [
      `범인을 찾기 어려워지자, 서윤의 이름이 떠올랐다.

정전 직전 준비실 쪽으로 갔다는 목격담.
도윤에게 협박받고 있었다는 메시지.
그 사실을 숨기려 했던 태도.

하나하나는 완벽하지 않았다.
하지만 함께 놓이자 너무 그럴듯했다.`,
      `서윤은 조용히 말했다.

“나 아니야.”
“나 정말 안 들어갔어.”

목소리는 무너지지 않았다.
그래서 오히려 더 차갑게 들렸다.

누군가는 말했다.
“너무 침착한 것도 이상하지 않아?”`,
      `경찰이 서윤을 데려가는 동안, 서윤은 딱 한 번 당신을 돌아봤다.

억울하다는 말도 못 할 만큼 지친 얼굴이었다.

그때서야 당신은 깨달았다.
도윤의 협박 메시지는 서윤이 범인이라는 증거가 아니었다.

서윤도 피해자였다는 증거였다.`,
    ],
  },
  {
    id: "endYubinConfess",
    title: "유빈 자백 엔딩",
    char: "yubin",
    image: "/images/ending-yubin-confess.webp",
    pages: [
      `증거는 점점 차유빈을 향했다.

깨진 휴대폰.
정전 당시 위치.
도윤 팔의 교흔.
그리고 끊겨 있던 기억.

누군가 떨리는 목소리로 말했다.

“너였어?”
“차유빈, 네가 범인이었어?”`,
      `유빈은 처음엔 고개를 저었다.

“아니야.”
“나 아니야.”

하지만 시선은 점점 더 유빈에게 모였다.
유빈의 손끝이 떨렸다.

그 떨림을 본 순간, 당신의 머릿속에 짧은 장면이 스쳤다.

정전.
도윤의 목소리.
“그때 일, 애들한테 말해도 돼?”
그리고 유빈의 숨죽인 울음.`,
      `유빈이 작게 웃었다.

“실수였어.”
“난 그냥 벗어나려고 했어.”

“도윤이 먼저 잡았고, 내가 물었고, 걔가 밀리면서 넘어졌어.”

강당이 얼어붙었다.
유빈은 고개를 들었다.

“근데 너희도 알잖아.”
“도윤이 어떤 애였는지.”`,
      `“여기 서도윤한테 한 번도 상처 안 받은 사람 있어?”
“협박 안 당한 사람 있어?”
“숨기고 싶은 일로 잡혀본 사람 없어?”
“무시당하고, 웃음거리 되고, 참으라고만 들은 사람 없어?”

유빈은 숨을 몰아쉬며 소리쳤다.

“그러니까 아무도 날 말리지 못한 거잖아.”

그 말이 끝나자, 아무도 유빈을 감싸지 않았다.
경찰이 유빈의 손목을 잡았다.

유빈은 끌려가면서도 끝까지 당신을 보지 않았다.

그제야 당신은 알았다.
유빈이 마지막까지 두려워한 건 경찰이 아니었다.

당신이 기억을 되찾는 일이었다.`,
    ],
  },
];

function createEndingScenes(endings) {
  return endings.reduce((acc, ending) => {
    acc[ending.id] = {
      p: "END",
      title: ending.title,
      bg: "dark",
      char: ending.char,
      endingImage: ending.image,
      text: ending.pages.join("\n\n"),
      choices: [["처음부터 다시 하기", "restart"]],
    };

    return acc;
  }, {});
}

const ENDING_SCENES = createEndingScenes(ENDINGS);

function getEndingIndex(sceneKey) {
  const index = ENDINGS.findIndex((ending) => sceneKey === ending.id);
  return index >= 0 ? String(index + 1).padStart(2, "0") : "";
}

const SCENES = {

start:{title:'정전 20분',text:'고2 수련회 첫날 밤.\n산 속 수련원 전체가 정전됐다.\n\n20분 뒤, 같은 반 서도윤이 죽은 채 발견된다.\n그리고 당신은 그의 시체 옆에서 깨어난다.\n손에 묻은 피. 기억은 없다.',start:true},
p1:{p:'1',title:'프롤로그',bg:'science',text:'눈을 떴을 때, 가장 먼저 보인 건 수련원 준비실 천장이었다.\n머리가 깨질 듯 아팠다.\n바닥에는 서도윤이 쓰러져 있었다.',choices:[['다음','p2']]},
p2:{p:'2',title:'프롤로그',bg:'science',char:'bloodHand',text:'손을 내려다보니 피가 묻어 있었다.\n“이게..뭐야..?”\n\n아무것도 기억나지 않았다.\n복도 계단 끝에서 발소리가 다가오는 게 느껴진다.\n“...”',choices:[['화장실로 간다','p3',{sus:1,suspect:'player'}]]},
p3:{p:'3',title:'화장실',bg:'bath',text:'세면대 물소리가 화장실 안에 울렸다. 당신은 손을 씻었다.\n피는 지워졌지만, 머릿속은 여전히 비어 있었다.\n그때 문이 열렸다.',choices:[['다음','p4']]},
p4:{p:'4',title:'화장실',bg:'bath',char:'yubin',text:'차유빈이었다.\n유빈은 잠깐 멈춰 섰다.\n\n“여기 있었네.”',choices:[['다음','p5']]},
p5:{p:'5',title:'화장실',bg:'bath',char:'yubin',text:'“다들 플레이어랑 서도윤 찾고 있어.”\n유빈은 당신 얼굴을 가만히 바라봤다.\n\n“플레이어, 왜 그래? 어디 아파?”',choices:[['대답한다','choiceYubin1']]},
choiceYubin1:{title:'어떻게 대답할까?',bg:'bath',char:'yubin',choices:[['아프긴... 괜찮아.','rY1',{sus:1}],['안 아파. 나도 서도윤 찾는 중이야.','rY2',{lie:1}],['그냥 좀 어지러워.','rY3',{truth:1}],['왜? 아파 보여?','rY4',{yubin:1}]]},
rY1:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“괜찮은 얼굴은 아닌데.”\n유빈은 한 걸음 다가왔다.\n\n“너 손 떨려.”',choices:[['다음','call']]},
rY2:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“그래?”\n유빈은 아주 잠깐 말을 멈췄다.\n\n“그럼 같이 찾자.”',choices:[['다음','call']]},
rY3:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“앉을래?”\n“아니면... 강당 먼저 갈래?”\n\n유빈은 휴대폰을 확인했다.',choices:[['다음','call']]},
rY4:{p:'6',title:'유빈의 반응',bg:'bath',char:'yubin',text:'“응.”\n“많이.”\n\n유빈은 웃지 않았다.\n“너 지금 꼭... 뭔가 본 사람 같아.”',choices:[['다음','call']]},
call:{p:'7',title:'강당 호출',bg:'bath',char:'phone',text:'휴대폰이 짧게 울렸다.\n휴대폰 알림이었다.\n\n한서윤: 다들 이거 보면 지금 바로 강당으로 와.',choices:[['강당으로 간다','br1']]},
br1:{p:'8',title:'강당',bg:'broadcast',char:'seoyoon',text:'강당에는 서윤, 태오, 유빈이 모여 있었다.\n서윤이 입을 열었다.\n\n“도윤이 안 보여.”\n\n서윤은 당신 쪽을 봤다.\n“플레이어, 혹시 뭐 아는 거 있어?”\n\n태오가 낮게 웃었다.\n“네가 모를 리가 없잖아.”\n“너 맨날 도윤이 옆에 붙어 다녔잖아.”',choices:[['다음','br2']]},
br2:{p:'9',title:'강당',bg:'broadcast',char:'seoyoon',text:'서윤은 잠깐 태오를 제지하듯 보다가 다시 물었다.\n\n“도윤이 마지막으로 누구랑 있었는지,”\n“솔직히 다들 너부터 떠올렸을 거야.”\n\n“마지막으로 같이 있었던 사람 있어?”',choices:[['대답한다','choiceLast']]},
choiceLast:{title:'어떻게 할까?',bg:'broadcast',char:'seoyoon',choices:[['마지막으로 같이 있었다고 말한다.','lastA',{truth:1,sus:2}],['아무 말도 하지 않는다.','lastB',{suspect:'player',lie:1,sus:1}],['도윤이 어딨는데?','lastC',{sus:1}],['다른 사람들 반응을 본다.','lastD',{truth:1}]]},
lastA:{p:'10',title:'강당',bg:'broadcast',char:'seoyoon',text:'“...나.”\n\n순간 강당이 조용해졌다.\n누군가 아주 작게 숨을 들이켰다.\n\n도윤과 붙어 다니던 당신이, 마지막으로 도윤과 있었다.\n그 사실만으로 강당 안의 공기가 당신 쪽으로 기울었다.\n\n서윤이 바로 물었다.\n“언제?”',choices:[['다음','teacher']]},
lastB:{p:'10',title:'강당',bg:'broadcast',text:'당신은 입을 다물었다.\n손바닥에 식은땀이 났다.\n\n침묵은 생각보다 빨리 번졌다.\n\n“왜 말을 안 해?”\n누군가 그렇게 중얼거렸다.\n\n혹시...\n내가 정말...',choices:[['다음','teacher']]},
lastC:{p:'10',title:'강당',bg:'broadcast',char:'taeo',text:'“도윤이 어딨는데?”\n\n태오가 짜증 섞인 얼굴로 말했다.\n“플레이어, 그걸 우리가 묻는 거잖아.”\n\n몇몇 시선이 당신에게 꽂혔다.\n도윤과 가까웠던 당신이 모르는 척하는 것처럼 보인 것이다.',choices:[['다음','teacher']]},
lastD:{p:'10',title:'강당',bg:'broadcast',text:'태오는 불쾌해 보였다.\n서윤은 침착했다.\n유빈은 당신만 보고 있었다.\n\n이상하게도, 그게 제일 신경 쓰였다.',choices:[['다음','teacher']]},
teacher:{p:'11',title:'사망 발표',bg:'broadcast',text:'강당 문이 열렸다.\n담임이 들어왔다.\n\n“수련원 준비실에서 학생이 발견됐다.”\n“...서도윤이다.”',choices:[['다음','afterDeath']]},
afterDeath:{p:'12',title:'사망 발표',bg:'broadcast',text:'당신은 아무 말도 하지 못했다.\n\n왜냐하면.\n당신은 이미 알고 있었기 때문이다.',choices:[['어떻게 할까?','choiceAfterDeath']]},
choiceAfterDeath:{title:'어떻게 할까?',bg:'broadcast',choices:[['수련원 준비실 이야기를 꺼낸다.','adA',{suspect:'seoyoon',sus:2,truth:1}],['아직 말하지 않는다.','adB',{suspect:'player',lie:1}],['휴대폰 기록을 확인한다.','adC',{suspect:'seoyoon',truth:1}],['유빈을 본다.','adD',{suspect:'yubin',yubin:1}]]},
adA:{p:'13',title:'강당',bg:'broadcast',text:'“나... 수련원 준비실에 갔던 것 같아.”\n“근데 기억이 안 나.”\n\n모두의 시선이 당신에게 꽂혔다.\n도윤 옆에 있던 사람.\n정전 뒤 기억을 잃은 사람.\n\n그 두 문장이 당신을 더 수상하게 만들었다.',choices:[['현장으로 간다','invest1']]},
adB:{p:'13',title:'강당',bg:'broadcast',text:'말하지 않았다.\n말하는 순간, 모든 게 나를 향할 것 같았다.\n\n하지만 침묵은 안전하지 않았다.\n도윤과 늘 같이 있던 당신이 조용해질수록, 사람들은 더 많은 걸 상상하기 시작했다.',choices:[['현장으로 간다','invest1']]},
adC:{p:'13',title:'휴대폰 기록',bg:'broadcast',text:'휴대폰에 남은 마지막 메시지 근처에는 지워지다 만 대화가 있었다.\n\n20:24\n강태오: 너 진짜 그만해라.\n서도윤: 왜, 들키면 곤란한 거라도 있어?\n\n20:31\n서도윤: 나 잠깐 수련원 준비실 감.\n\n도윤은 누군가의 약점을 잡고 흔드는 데 익숙한 사람처럼 보였다.',choices:[['현장으로 간다','invest1']]},
adD:{p:'13',title:'강당',bg:'broadcast',char:'yubin',text:'유빈은 걱정스러운 얼굴로 당신을 보고 있었다.\n\n“플레이어, 괜찮아?”\n\n그 표정이 이상하게 편해서, 더 불안했다.\n하지만 당신이 유빈을 바라보는 시간이 길어질수록, 유빈은 조금씩 고개를 숙였다.',choices:[['현장으로 간다','invest1']]},
invest1:{p:'14',title:'수련원 준비실',bg:'science',text:'수련원 준비실은 통제되어 있었다.\n하지만 문 너머로 보이는 것들이 있었다.\n\n책상 모서리.\n바닥의 작은 조각.\n덮여진 천 아래로 드러난 도윤의 팔.',choices:[['무엇을 먼저 볼까?','choiceInspect1']]},
choiceInspect1:{title:'무엇을 먼저 볼까?',bg:'science',choices:[['내 상태를 다시 확인한다.','headEvidence',{truth:2}],['바닥의 작은 조각을 본다.','glassEvidence',{truth:1,yubin:1}],['도윤의 팔을 본다.','biteEvidence',{truth:1}],['아무것도 보지 않는다.','noEvidence',{suspect:'player',sus:1}]]},
headEvidence:{p:'15',title:'증거',bg:'science',text:'손을 뒤통수에 가져가자, 작은 혹이 만져졌다.\n\n내가 누군가를 때린 게 아니라.\n누군가에게 당한 건 아닐까.',choices:[['다음','taeo1']]},
glassEvidence:{p:'15',title:'증거',bg:'science',text:'바닥에 작은 액정 조각이 있었다.\n\n내 휴대폰은 멀쩡하다.\n도윤의 휴대폰도 깨져 있지 않았다.',choices:[['다음','taeo1']]},
biteEvidence:{p:'15',title:'증거',bg:'science',text:'도윤의 팔에 물린 자국이 있었다.\n\n정전 중, 도윤은 누군가와 몸싸움을 했다.',choices:[['다음','taeo1']]},
noEvidence:{p:'15',title:'현장',bg:'science',text:'더 보지 않았다.\n\n보면 볼수록, 내가 더 위험해질 것 같았다.',choices:[['다음','taeo1']]},
taeo1:{p:'16',title:'태오',bg:'broadcast',char:'taeo',text:'태오는 벽에 기대 서 있었다.\n\n“왜?”\n“너도 나 의심하냐?”',choices:[['대답한다','choiceTaeo']]},
choiceTaeo:{title:'태오에게 뭐라고 할까?',bg:'broadcast',char:'taeo',choices:[['너 도윤이랑 싸웠잖아.','taeoA',{suspect:'taeo',wrong:2}],['도윤이랑 마지막으로 무슨 얘기 했어?','taeoB',{suspect:'taeo',truth:1}],['넌 범인 아닌 것 같아.','taeoC',{truth:1}],['아무 말 없이 본다.','taeoD',{suspect:'player',sus:1}]]},
taeoA:{p:'17',title:'태오',bg:'broadcast',char:'taeo',text:'“싸웠지.”\n“걔랑 안 싸운 사람이 있긴 해?”\n\n태오는 당신을 빤히 봤다.\n“ㄴ너도 걔한테 약점 잡힌 거 하나쯤은 있을 거 아냐.”',choices:[['다음','yubin2']]},
taeoB:{p:'17',title:'태오',bg:'broadcast',char:'taeo',text:'“마지막?”\n태오는 코웃음을 쳤다.\n\n“그 새끼가 나한테만 시비 턴 줄 알아?”\n“애들 약점 하나씩 잡고, 웃으면서 돌려 말하는 거 좋아했잖아.”\n\n태오의 목소리가 낮아졌다.\n“오늘도 누군가 하나는 울릴 생각이었겠지.”\n\n그 말에 몇몇 아이들이 고개를 돌렸다.\n태오의 분노가 이해되는 순간, 오히려 태오가 더 위험해 보였다.',choices:[['다음','yubin2']]},
taeoC:{p:'17',title:'태오',bg:'broadcast',char:'taeo',text:'“그 말도 기분 더럽네.”\n“너 지금 누구 편 드는 거야?”\n\n태오는 당신을 노려봤다.\n당신이 감싸려 할수록, 태오의 날 선 반응은 더 눈에 띄었다.',choices:[['다음','yubin2']]},
taeoD:{p:'17',title:'태오',bg:'broadcast',char:'taeo',text:'“뭐야.”\n“그 눈깔.”\n\n“너도 뭔가 숨기는 거 있지?”',choices:[['다음','yubin2']]},
yubin2:{p:'18',title:'유빈',bg:'hall',char:'yubin',text:'유빈의 휴대폰 화면이 켜졌다.\n액정 한쪽이 깨져 있었다.\n\n당신은 수련원 준비실 바닥의 액정 조각을 떠올렸다.',choices:[['어떻게 할까?','choiceYubin2']]},
choiceYubin2:{title:'유빈에게 어떻게 할까?',bg:'hall',char:'yubin',choices:[['액정 언제 깨졌어?','yuA',{suspect:'yubin',yubin:2,truth:1}],['현장에서 유리 조각 같은 걸 봤어.','yuB',{suspect:'yubin',yubin:2,truth:1}],['아무것도 묻지 않는다.','yuC',{lie:1}],['내 휴대폰도 확인한다.','yuD',{suspect:'yubin',truth:1}]]},
yuA:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'“아, 이거?”\n유빈은 휴대폰을 뒤집어 쥐었다.\n\n“아까 떨어뜨렸어.”\n“왜?”',choices:[['다음','prePolice1']]},
yuB:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'유빈의 표정이 아주 잠깐 멈췄다.\n정말 잠깐이었다.\n\n“그래?”\n“그런 게 있었어?”',choices:[['다음','prePolice1']]},
yuC:{p:'19',title:'유빈',bg:'hall',char:'yubin',text:'유빈은 아무 일 없다는 듯 말했다.\n\n“가자.”\n“혼자 있지 말고.”',choices:[['다음','prePolice1']]},
yuD:{p:'19',title:'휴대폰',bg:'hall',text:'당신의 휴대폰은 멀쩡했다.\n\n그렇다면 수련원 준비실의 액정 조각은\n당신 것도, 도윤 것도 아니다.',choices:[['다음','prePolice1']]},

prePolice1:{p:"20",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"강당으로 돌아오자 서윤이 휴대폰을 내려놓았다.\n\n그때 누군가 말했다.\n\n“정전 직전에 준비실 쪽으로 간 사람을 봤다는 얘기가 있어.”",choices:[["다음","prePolice1_2"]]},
prePolice1_2:{p:"20",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"목격자는 이름을 확실히 말하지 못했다.\n하지만 한 가지는 말했다.\n\n짧은 머리. 단정한 집업. 반장 명찰.\n\n모두의 시선이 서윤에게 옮겨갔다.",choices:[["서윤에게 준비실 쪽에 갔는지 묻는다","prePolice1A",{suspect:"seoyoon",truth:1}],["목격담은 애매하다고 말한다","prePolice1B",{suspect:"player"}],["유빈을 본다","prePolice1C",{suspect:"yubin",yubin:1}],["태오를 본다","prePolice1D",{suspect:"taeo"}]]},
prePolice1A:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"“서윤아, 정전 직전에 준비실 쪽에 갔어?”\n\n서윤은 바로 대답하지 못했다.\n\n“...잠깐 지나가긴 했어.”\n“근데 안에 들어가진 않았어.”\n\n말은 차분했지만, 모두가 듣기엔 충분히 수상했다.",choices:[["다음","prePolice2"]]},
prePolice1B:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"seoyoon",text:"당신은 목격담이 너무 애매하다고 말했다.\n\n하지만 그 말이 오히려 이상하게 들렸다.\n\n“왜 네가 서윤을 감싸?”\n\n시선 일부가 다시 당신에게 돌아왔다.",choices:[["다음","prePolice2"]]},
prePolice1C:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"yubin",text:"당신은 유빈을 봤다.\n\n유빈은 고개를 숙이고 있었다.\n\n그 순간만큼은 유빈보다 서윤 쪽에 더 많은 시선이 쏠려 있었다.",choices:[["다음","prePolice2"]]},
prePolice1D:{p:"20-1",title:"추궁 1",bg:"broadcast",char:"taeo",text:"태오는 인상을 찌푸렸다.\n\n“왜 또 나를 봐.”\n\n태오의 말투는 날카로웠지만, 이번 목격담과는 잘 맞지 않았다.",choices:[["다음","prePolice2"]]},
prePolice2:{p:"21",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"그때 서윤의 휴대폰 화면이 켜졌다.\n\n잠금화면 위로 도윤에게서 온 예전 메시지 일부가 보였다.\n서윤은 화면을 보자마자 숨을 삼켰다.",choices:[["다음","prePolice2_2"]]},
prePolice2_2:{p:"21",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"[오늘 밤까지 준비 안 하면 다 퍼뜨린다]\n\n그 아래에는 더 오래된 메시지도 겹쳐 보였다.\n\n[반장님 범생이 이미지 지키고 싶으면 조용히 해]\n\n서윤이 급하게 화면을 껐다.\n강당 안 공기가 바뀌었다.",choices:[["도윤이 협박했냐고 묻는다","prePolice2A",{suspect:"seoyoon",points:2}],["왜 숨겼는지 묻는다","prePolice2B",{suspect:"seoyoon",points:1}],["유빈의 위치 진술을 다시 묻는다","prePolice2C",{suspect:"yubin",yubin:1,truth:1}],["태오와 도윤의 다툼을 꺼낸다","prePolice2D",{suspect:"taeo"}]]},
prePolice2A:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"“도윤이 협박했어?”\n\n서윤은 입술을 깨물었다.\n\n“...그건 사건이랑 상관없어.”\n\n하지만 이미 늦었다.\n커닝 문제로 협박받고 있었다는 말은, 모두에게 가장 이해하기 쉬운 원한이 됐다.\n\n서윤의 침묵이 대답처럼 번졌다.",choices:[["다음","prePolice3"]]},
prePolice2B:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"seoyoon",text:"“왜 숨겼어?”\n\n서윤은 한참 뒤에야 말했다.\n\n“말하면 더 커질까 봐.”\n\n그 말은 현실적이었다.\n하지만 동시에 변명처럼 들렸다.",choices:[["다음","prePolice3"]]},
prePolice2C:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"yubin",text:"당신은 유빈에게 물었다.\n\n“정전됐을 때 정확히 어디 있었어?”\n\n유빈은 잠깐 늦게 대답했다.\n\n“나는... 별관 복도.”\n\n별관 쪽이면 준비실과 멀지 않았다.\n그 짧은 정적을, 강당 안의 모두가 들은 것 같았다.",choices:[["다음","prePolice3"]]},
prePolice2D:{p:"21-1",title:"추궁 2",bg:"broadcast",char:"taeo",text:"당신은 태오와 도윤이 다퉜다는 이야기를 꺼냈다.\n\n태오가 바로 목소리를 높였다.\n\n“싸운 거랑 죽인 거랑 같냐?”\n\n태오의 반응은 거칠었다.\n그래서 누군가에겐 더 수상해 보였다.",choices:[["다음","prePolice3"]]},

prePolice3:{p:"22",title:"추궁 3",bg:"science",char:"none",text:"머리가 다시 아파왔다.\n\n끊긴 기억 사이로 짧은 장면이 떠올랐다.\n\n누군가 도윤을 밀쳤다.\n누군가 당신 쪽을 돌아봤다.\n그리고 정전.",choices:[["그 얼굴을 떠올린다","prePolice3A",{suspect:"yubin",truth:2}],["기억을 억지로 누른다","prePolice3B",{suspect:"player",sus:1}],["도윤의 팔을 떠올린다","prePolice3C",{suspect:"taeo",truth:1}],["서윤의 협박 메시지를 떠올린다","prePolice3D",{suspect:"seoyoon",points:1}]]},
prePolice3A:{p:"22-1",title:"추궁 3",bg:"science",char:"yubin",text:"흐릿했던 얼굴이 조금씩 선명해졌다.\n\n겁에 질린 눈.\n떨리던 손.\n\n차유빈이었다.",choices:[["다음","finalAsk"]]},
prePolice3B:{p:"22-1",title:"추궁 3",bg:"science",text:"떠올리면 안 될 것 같았다.\n\n하지만 피할수록 더 선명해지는 것들이 있다.\n\n이제 누군가는 지목해야 한다.",choices:[["다음","finalAsk"]]},
prePolice3C:{p:"22-1",title:"추궁 3",bg:"science",text:"도윤의 팔.\n물린 자국.\n\n그건 일방적인 폭행이 아니었다.\n누군가 도윤에게서 벗어나려 했다.",choices:[["다음","finalAsk"]]},
prePolice3D:{p:"22-1",title:"추궁 3",bg:"science",char:"yubin",text:"정전 직전, 누군가 이렇게 말했었다.\n\n“그만해.”\n\n그 목소리는 차유빈이었다.",choices:[["다음","finalAsk"]]},

finalAsk:{p:'23',title:'마지막 판단',bg:'broadcast',text:'경찰이 도착했다.\n\n수련원 강당 안은 조용했다.\n누군가를 직접 지목하지 않아도, 지금까지의 말과 선택은 이미 한 사람을 향하고 있었다.',choices:[['결말 확인하기','AUTO_END']]},

  ...ENDING_SCENES,
};

function initialState() {
  return {
    name: "",
    scene: "start",
    history: [],
    sus: 0,
    truth: 0,
    yubin: 0,
    lie: 0,
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
  };

  if (effect.suspect) {
    next = addSuspicion(next, effect.suspect, effect.points || 1);
  }

  return next;
}

function getAutoEnding(state) {
  const suspects = state.suspects || { player: 0, taeo: 0, seoyoon: 0, yubin: 0 };
  const order = ["player", "taeo", "seoyoon", "yubin"];
  let best = "player";

  for (const key of order) {
    if ((suspects[key] || 0) > (suspects[best] || 0)) {
      best = key;
    }
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

export default function App() {
  const [state, setState] = useState(initialState);
  const [view, setView] = useState("story");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const preloadImages = new Set([
      ...Object.values(BGNAME),
      ...Object.values(CHAR).filter(Boolean),
      ...ENDINGS.map((ending) => ending.image),
    ]);

    preloadImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  const scene = SCENES[state.scene] || SCENES.start;
  const isStart = !!scene.start;
  const isChoiceView = view === "choice";

  const makeHistoryItem = (sceneKey, viewName) => ({
    scene: sceneKey,
    view: viewName || "story",
  });

  const readHistoryItem = (item) => {
    if (!item) return null;
    if (typeof item === "string") return { scene: item, view: "story" };

    return {
      scene: item.scene || "start",
      view: item.view || "story",
    };
  };

  const go = (key, effect = {}) => {
    if (key === "restart") {
      setState(initialState());
      setView("story");
      setNameInput("");
      return;
    }

    const predictedState = applyEffect(state, effect);
    const predictedRoute = route(key, predictedState);
    const nextView = isChoiceOnlyScene(predictedRoute) ? "choice" : "story";

    setState((prev) => {
      const next = applyEffect(prev, effect);
      const routed = route(key, next);

      return {
        ...next,
        scene: routed,
        history: [...(next.history || []), makeHistoryItem(prev.scene, view)],
      };
    });

    setView(nextView);
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
  };

  const startGame = () => {
    const displayName = getDisplayName(nameInput);

    setState((prev) => ({
      ...prev,
      name: displayName,
      scene: "p1",
      history: [makeHistoryItem("start", "story")],
    }));

    setView("story");
  };

  const showChoices = () => {
    if (scene.choices && scene.choices.length === 1) {
      const [, next, effect] = scene.choices[0];
      go(next, effect || {});
      return;
    }

    setView("choice");
  };

  const bg = BG[scene.bg || "dark"];
  const ch = CHAR[scene.char || "none"];

  const history = state.history || [];
  const previousHistoryItem = readHistoryItem(history[history.length - 1]);
  const previousScene = previousHistoryItem ? SCENES[previousHistoryItem.scene] : null;
  const choiceBg = BG[previousScene?.bg || scene.bg || "dark"];

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
        <div className="top-title" />
        <div className="progress">{scene.p ? (scene.p === "END" ? "END" : `ep.${scene.p}`) : ""}</div>
      </header>

      <main id="screen">
        {isStart ? (
          <div className="main-start">
            <div className="main-bottom">
              <p className="main-copy">{scene.text}</p>
              <div className="start-card">
                <div className={`name-field ${nameInput ? "has-value" : ""}`}>
                  <input
                    id="nameInput"
                    placeholder="당신의 이름은 무엇인가요?"
                    maxLength={8}
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                  />
                  <span className="name-suffix">쨩</span>
                </div>
                <button className="primary" onClick={startGame}>
                  게임 입장
                </button>
              </div>
            </div>
          </div>
        ) : isChoiceView || isChoiceOnlyScene(state.scene) ? (
          <div
            key={`choice-${state.scene}`}
            className="choice-page"
            style={{ "--scene-bg": bg, "--choice-bg": choiceBg }}
          >
            <div className="choice-bg" />
            <div className="choice-card">
              <h2>{scene.title}</h2>
              <div className="choices">
                {(scene.choices || []).map(([label, next, effect], index) => (
                  <button key={index} onClick={() => go(next, effect || {})}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : scene.p === "END" ? (
          <div key={`ending-${state.scene}`} className="ending-page">
            <div className="ending-hero">
              {scene.endingImage ? <img key={`ending-img-${state.scene}`} src={scene.endingImage} alt="" /> : null}
            </div>

            <div className="ending-result">
              <div className="ending-card">
                <div className="ending-kicker">ENDING {getEndingIndex(state.scene)}</div>
                <h2>{scene.title}</h2>
                <p>{fillText(scene.text, state)}</p>
              </div>

              <div className="actions ending-actions">
                {scene.choices ? (
                  <button className="primary" onClick={showChoices}>
                    {btnLabel}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div key={`scene-${state.scene}`} className={`scene scene-${state.scene}`} style={{ "--scene-bg": bg }}>
            <div className="bg" />
            <div className={`char ${ch ? "" : "none"} char-${scene.char || "none"}`}>
              {ch ? <img key={`${state.scene}-${scene.char}-${ch}`} src={ch} alt="" /> : null}
            </div>
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
    </div>
  );
}
