module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "turn the bot off",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = [`100074565147887`,``];
	if (!permission.includes(event.senderID)) return api.sendMessage("You don't have permission to use this command.", event.threadID, event.messageID);
  api.sendMessage(`Gago ka Shen ayoko pa mamatay pleeeaseee\n\noh no /*namatay`,event.threadID, () =>process.exit(0))
      }