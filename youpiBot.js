function response(room, msg, sender, isGroupChat, replier, imageDB) {
  if (AppData.getString("boot") == "off") {
    return
  }

  try {
    if (room == "eve") {
      eve(msg, replier, sender);

    } else if (room == "룬자랑") {
      rune(msg, replier, sender);
    }

    etc(msg, replier, sender);

  } catch (e) {
    replier.reply("윤피봇 에러\n" + e)
    FileStream.append("/sdcard/katalkbot/log.txt", e + "\n")
  }

}

function eve(msg, replier, sender) {
  if (msg=="!윤피봇") {
    replier.reply(AppData.getString("younpiBot").trim() + "\n" +AppData.getString("eveYounpiBot").trim());
  }

  if(msg=="!명단"){
    replier.reply("https://bit.ly/2uFoJQ7 EVE길원 명부");
  }

  if (msg=="!규정"){
    replier.reply (AppData.getString("eveNotice"));
  }

  if (msg.indexOf("!규정수정") == 0) {
    if (AppData.getString("eveAuth").split(",").contains(sender)) {
      AppData.putString("eveNotice", msg.substr(6));
      replier.reply("규정이 수정되었습니다.");
    } else {
      replier.reply("권한이 없습니다.");
    }
  }

  if (msg=="!길드프사") {
    replier.reply ("https://bit.ly/2EPJluc 길드 프사");
  }

  if (msg=="!점령전공덱") {
    replier.reply ("https://bit.ly/2wzLANJ 점령전 공덱");
  }

  if (msg=="!리액션") {
    var reaction = AppData.getString("eveReaction").split(",");
    var rand = Math.floor(Math.random() * reaction.length);

    replier.reply(reaction[rand]);
  }

  if (msg == "!리액션확인") {
    replier.reply(AppData.getString("eveReaction"));
  }

  if (msg.indexOf("!리액션수정") == 0) {
    AppData.putString("eveReaction", msg.substr(7));
    replier.reply("리액션이 수정되었습니다.");
  }
}

function rune(msg, replier, sender) {
  if (msg=="!윤피봇") {
    replier.reply(AppData.getString("younpiBot").trim() + "\n" +AppData.getString("runeYounpiBot").trim());
  }

  if (msg=="!규정") {
    replier.reply (AppData.getString("runeNotice"));
  }

  if (msg.indexOf("!규정수정") == 0) {
    if (AppData.getString("runeAuth").split(",").contains(sender)) {
      AppData.putString("runeNotice", msg.substr(6));
      replier.reply("규정 수정되었습니다.");
    } else {
      replier.reply("권한이 없습니다.");
    }
  }

  if (msg=="사진을 보냈습니다." || msg=="!리액션") {
    var reaction = AppData.getString("runeReaction").split(",");
    var rand = Math.floor(Math.random() * reaction.length);

    replier.reply(reaction[rand]);
  }

  if (msg == "!리액션확인") {
    replier.reply(AppData.getString("runeReaction"));
  }

  if (msg.indexOf("!리액션수정") == 0) {
    AppData.putString("runeReaction", msg.substr(7));
    replier.reply("리액션이 수정되었습니다.");
  }

  if (msg == "!메뉴") {
    var menu = AppData.getString("runeMenu").split(",");
    var rand = Math.floor(Math.random() * menu.length);

    replier.reply(menu[rand]);
  }

  if (msg == "!메뉴확인") {
    replier.reply(AppData.getString("runeMenu"));
  }

  if (msg.indexOf("!메뉴수정") == 0) {
    AppData.putString("runeMenu", msg.substr(6));
    replier.reply("메뉴가 수정되었습니다.");
  }
}

function etc(msg, replier) {
  if (msg.indexOf("!날씨") == 0) {
    weather(msg, replier);
  }

  if (msg.indexOf("!서머위키") == 0) {
    summonWiki(msg, replier);
  }

  if (msg == "!사이트") {
    replier.reply(
      "https://godsarmy.garude.de/ 스팩검색\n\n" +
      "https://sw-tools.net/ 중턴계산기"
    )
  }

  if (msg.indexOf("!지도") == 0) {
    replier.reply("https://m.map.naver.com/search2/search.nhn?query=" + msg.substr(4).replace(/ /g, '+') + "&type=#/map")

  }

  if (msg.indexOf("!계산") == 0) {
    calculate(msg, replier);
  }

  if (msg.indexOf("!네이버") == 0) {
    replier.reply("https://search.naver.com/search.naver?query=" + msg.substr(5).replace(/ /g, '+'))
  }

  if (msg.indexOf("!나무위키") == 0) {
    replier.reply("https://namu.wiki/w/" + msg.substr(6).replace(/ /g, '%20'))
  }
}

function weather(msg, replier) {
  var where = msg.substr (4); // where 변수에 메시지의 "/기상정보 " 부분을 잘라낸 값을 정의함

  if (where.length == 0) {
    return
  }

  try { // 오류가 발생하지 않았을 때
    var link = Utils.getWebText ("https://www.google.com/search?q=" + where + "+날씨"); // link 변수에 기상정보 소스를 불러온 값을 정의함
    var weather = link.split ("<span class=\"vk_gy vk_sh\" id=\"wob_dc\">")[1].split ("<")[0]; // weather 변수에 날씨 정보를 정의함
    var temp = link.split ("<span class=\"wob_t\" id=\"wob_tm\" style=\"display:inline\">")[1].split ("<")[0]; // temp 변수에 온도를 정의함
    var rain = link.split ("<span id=\"wob_pp\">")[1].split ("<")[0]; // rain 강수확률

    var weatherMessage = where + "의 기상정보\n날씨: " + weather + "\n온도: " + temp + "℃\n강수확률: " + rain

    var matterLink = Utils.getWebText ("https://www.google.com/search?q=" + where + "+미세먼지");
    try {
      var matter = matterLink.split("<div class=\"uULQNc\"")[1].split(">")[1].split("<")[0].trim();
      weatherMessage += "\n미세먼지: " + matter + "㎍/㎥"
    } catch (e) {

    }

    replier.reply (weatherMessage); // 값을 출력함
  } catch (e) { // 오류가 발생하였을 때
    replier.reply ("검색 결과가 없습니다."); // 오류 메시지를 출력함
  }
}

function summonWiki(msg, replier) {
  replier.reply("https://summonerswar.fandom.com/wiki/Special:Search?query=" + msg.substr(6).replace(/ /g, "+"));
}

function calculate(msg, replier) {
  try {
    var formula = msg.substr(4).replace(/×/g, "*").replace(/÷/g, "/")
    replier.reply(eval(formula))
  } catch(e) {
    replier.reply("계산식 오류입니다.");
  }
}

Array.prototype.contains = function(element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) {
      return true;
    }
  }
  return false;
}
