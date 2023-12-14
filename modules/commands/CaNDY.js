module.exports.config = {
    name: "Bot",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Ralph",
    description: "War In Chatbox",
    commandCategory: "Noprefix",
    usages: "noprefix",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
 var mention = Object.keys(event.mentions)[0];
    
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention});
    var a = function (a) { api.sendMessage(a, event.threadID); }
a("🌆𝙊𝙒𝙉𝙀𝙍 𝙄𝙉𝙁𝙊🌆\n\n Ralph Angelo Garcia (JEKA)\n\n𝐀𝐠𝐞 : 17\n\n𝐒𝐭𝐮𝐝𝐲 : BS EDUC\n\n𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 :https://www.facebook.com/6ixAxie")
  attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => 
    fs.unlinkSync(__dirname + "/cache/1.png"));  
      return request(encodeURI(`https://graph.facebook.com/${100080328720199}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(
fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
};