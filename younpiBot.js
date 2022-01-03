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

    if (msg.room === '룬자랑') {
        onRtaCommand(msg);
    } 

    if (msg.room === 'eve') {
        onEveCommand(msg);
    }
}

var rtaCommandList = [
    '!메뉴',
     "!메뉴확인", 
     "!메뉴수정",
      "!메뉴추가", 
      '!리액션', 
      "!리액션확인", 
      "!리액션수정", 
      "!리액션추가", 
      '!추천', 
      "!추천확인", 
      "!추천수정", 
      "!추천추가", 
      "!날씨"
    ];
var managerList = ['5초맨', '김윤피', '윤피'];
function onRtaCommand(msg) {
    if (msg.command === '명령어' || msg.command === 'ㅁㄹㅇ') {
        var result = ''
        rtaCommandList.forEach(command => result += (command + "\n"));
        msg.reply(result.substring(0, result.length - 1));
    }

    if (msg.command === '메뉴' || msg.command === 'ㅁㄴ') {
        try {
            var menu = Database.readString("rtamenu");
            var menuList = menu.split(',');
            var selectedMenu = menuList[Math.floor(Math.random() * menuList.length)].trim();
            msg.reply(selectedMenu);
        } catch (e) {
            msg.reply(e);
        }
    }

    if (msg.command === '메뉴확인' || msg.command === 'ㅁㄴㅎㅇ') {
        try {
            var menu = Database.readString("rtamenu").split(',').map(x => x.trim()).join(', ');
            msg.reply(menu);
        } catch (e) {
            msg.reply(e);
        }
    }

   
    if (msg.command === '메뉴수정' || msg.command === 'ㅁㄴㅅㅈ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtamenu", menu);
        msg.reply("수정 완료");
    }

    if (msg.command === '메뉴추가' || msg.command === 'ㅁㄴㅊㄱ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtamenu", Database.readString("rtamenu") + "," + menu);
        msg.reply("수정 완료");
    }

    if (msg.command === '리액션' || msg.command === 'ㄹㅇㅅ') {
        try {
            var menu = Database.readString("rtaReaction");
            var menuList = menu.split(',');
            var selectedMenu = menuList[Math.floor(Math.random() * menuList.length)].trim();
            msg.reply(selectedMenu);
        } catch (e) {
            msg.reply(e);
        }
    }

    if (msg.command === '리액션확인' || msg.command === 'ㄹㅇㅅㅎㅇ') {
        try {
            var menu = Database.readString("rtaReaction").split(',').map(x => x.trim()).join(', ');
            msg.reply(menu);
        } catch (e) {
            msg.reply(e);
        }
    }

    if (msg.command === '리액션수정' || msg.command === 'ㄹㅇㅅㅅㅈ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtaReaction", menu);
        msg.reply("수정 완료");
    }

    if (msg.command === '리액션추가' || msg.command === 'ㄹㅇㅅㅊㄱ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtaReaction", Database.readString("rtaReaction") + "," + menu);
        msg.reply("수정 완료");
    }

    if (msg.command === '추천' || msg.command === 'ㅊㅊ') {
        try {
            var menu = Database.readString("rtaRecommand");
            var menuList = menu.split(',');
            var selectedMenu = menuList[Math.floor(Math.random() * menuList.length)].trim();
            msg.reply(selectedMenu);
        } catch (e) {
            msg.reply(e);
        }
    }

    if (msg.command === '추천확인' || msg.command === 'ㅊㅊㅎㅇ') {
        try {
            var menu = Database.readString("rtaRecommand").split(',').map(x => x.trim()).join(', ');
            msg.reply(menu);
        } catch (e) {
            msg.reply(e);
        }
    }

    if (msg.command === '추천수정' || msg.command === 'ㅊㅊㅅㅈ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtaRecommand", menu);
        msg.reply("수정 완료");
    }

    if (msg.command === '추천추가' || msg.command === 'ㅊㅊㅊㄱ') {
        if (!managerList.includes(msg.author.name)) return; 

        var menu = msg.content.substring(6, msg.content.length);
        Database.writeString("rtaRecommand", Database.readString("rtaRecommand") + "," + menu);
        msg.reply("수정 완료");
    }
}

var eveCommandList = ['!공덱', "!명단", "!날씨"];
function onEveCommand(msg) {
    if (msg.command === '명령어' || msg.command === 'ㅁㄹㅇ') {
        var result = ''
        eveCommandList.forEach(command => result += (command + "\n"));
        msg.reply(result.substring(0, result.length - 1));
    }

    if (msg.command === '공덱' || msg.command === 'ㄱㄷ') {
        msg.reply("https://docs.google.com/spreadsheets/d/1gRLYUi6McCpKImUHolhcvE_EhsBHWPBgtW0d-0C8P9w/edit#gid=502219620");
    }

    if (msg.command === '명단' || msg.command === 'ㅁㄷ') {
        msg.reply("https://docs.google.com/spreadsheets/d/1-UFbvNWupRgYyEt3ceZIfGlXtp6rIjgLw5ZR1AGH0DY/edit#gid=0");
    }
}

function onGlobalCommand(msg) {
    if (msg.command === '날씨' || msg.command === 'ㄴㅆ') {
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
