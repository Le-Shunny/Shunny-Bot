module.exports.config = {
  name: "osucatch",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Shen",
  description: "Get osucatch info through username",
  commandCategory: "game",
  usages: "[username]",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};


module.exports.run = ({ event, api, args, getText }) => {
    if (args.length == 0) return api.sendMessage("please provide a valid username!", event.threadID, event.messageID);
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    request(`https://lemmmy.pw/osusig/sig.php?colour=pink&uname=${args.join(" ")}&mode=2&countryrank&onlineindicator=undefined`).pipe(fs.createWriteStream(__dirname + `/cache/${event.senderID}-osu.png`)).on("close", () => api.sendMessage({ attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}-osu.png`) }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}-osu.png`), event.messageID));}
