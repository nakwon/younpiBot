const bot = BotManager.getCurrentBot();

/**
 * (string) msg.content: 메시지의 내용
 * (string) msg.room: 메시지를 받은 방 이름
 * (User) msg.author: 메시지 전송자
 * (string) msg.author.name: 메시지 전송자 이름
 * (Image) msg.author.avatar: 메시지 전송자 프로필 사진
 * (string) msg.author.avatar.getBase64()
 * (boolean) msg.isGroupChat: 단체/오픈채팅 여부
 * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true
 * (string) msg.packageName: 메시지를 받은 메신저의 패키지명
 * (void) msg.reply(string): 답장하기
 */
function onMessage(msg) {}
bot.addListener(Event.MESSAGE, onMessage);


/**
 * (string) msg.content: 메시지의 내용
 * (string) msg.room: 메시지를 받은 방 이름
 * (User) msg.author: 메시지 전송자
 * (string) msg.author.name: 메시지 전송자 이름
 * (Image) msg.author.avatar: 메시지 전송자 프로필 사진
 * (string) msg.author.avatar.getBase64()
 * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true
 * (boolean) msg.isGroupChat: 단체/오픈채팅 여부
 * (string) msg.packageName: 메시지를 받은 메신저의 패키지명
 * (void) msg.reply(string): 답장하기
 * (string) msg.command: 명령어 이름
 * (Array) msg.args: 명령어 인자 배열
 */
function onCommand(msg) {
    onGlobalCommand(msg);
}

function onGlobalCommand(msg) {
    if (msg.command === '점심') {
        msg.reply('나도 몰라');
    }

    if (msg.command === '점심수정') {

    }

    if (msg.command === '날씨') {
        weather(msg);
    }
}

function weather(msg) {
    try {
        var where = msg.args[0];
        var document = org.jsoup.Jsoup.connect("https://www.google.com/search?q=" + where + "+날씨").get();
        var weather = document.select('#wob_dc').text();
        var temp = document.select(".wob_t").select("#wob_tm").text();
        var rain = document.select("#wob_pp").text();
        
        var weatherMessage = where + "의 기상정보\n날씨: " + weather + "\n온도: " + temp + "℃\n강수확률: " + rain;

        var mattetDocument = org.jsoup.Jsoup.connect("https://www.google.com/search?q=" + where + "+미세먼지").get();
        try {
            var matter = mattetDocument.select(".uULQNc").text().trim();
            if (matter != "") {
                weatherMessage += "\n미세먼지: " + matter + "㎍/㎥";
            }
            msg.reply(weatherMessage);
        } catch (e) {
            msg.reply(e);
        }
    
    } catch (e) {
        msg.reply(e);
    }
}


bot.setCommandPrefix("!"); 
bot.addListener(Event.COMMAND, onCommand);
