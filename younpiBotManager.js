const sourceUrl = "https://raw.githubusercontent.com/nakwon/younpiBot/master/younpiBot.js";

function response(room, msg, sender, isGroupChat, replier, imageDB) {
  if (sender != "윤피") {
    return
  }

  try {

    if (msg == "!확인") {
      var source = Utils.getWebText(sourceUrl);
      var length = source.length
      var sourceCode = source.substring(29, length - 15).trim()
      replier.reply(sourceCode);
    }

    if (msg == "!update") {
      var source = Utils.getWebText(sourceUrl);
      var length = source.length
      var sourceCode = source.substring(29, length - 15).trim()
      FileStream.write("/sdcard/katalkbot/test2.js", sourceCode);
      Api.reload("test2.js");
      replier.reply("업데이트 되었습니다.")
      return
    }

    if (msg.indexOf("!commit") == 0) {
      AppData.putString(msg.split(" ")[1], msg.substr(8 + msg.split(" ")[1].length));
      replier.reply(msg.split(" ")[1] + "가 수정되었습니다.");
    }

    if (msg.indexOf("!log") == 0) {
      replier.reply(AppData.getString(msg.substr(5)));
    }

  } catch (e) {
    replier.reply("윤피봇 에러\n" + e)
    FileStream.append("/sdcard/katalkbot/log.txt", e + "\n")
  }

}
