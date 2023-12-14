const fs = require("fs");
module.exports.config = {
        name: "autoreact",
  version: "1.0.0",
        hasPermssion: 0,
        credits: "Shen",
        description: "non prefix reply",
        commandCategory: "no prefix",
        usages: "noprefix",
    cooldowns: 0,
};
 
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
 let haha = event.body.toLowerCase();
  if (haha.includes("heil") || haha.includes("Heil")){
    api.sendMessage("HEIL HITLER 🙋‍♂️", event.threadID, event.messageID)
  }
  if (haha.includes("Sieg") || haha.includes("sieg")){
    api.sendMessage("HEIL", event.threadID, event.messageID)
      }
}
        module.exports.run = function({ api, event, client, __GLOBAL }) {
      }