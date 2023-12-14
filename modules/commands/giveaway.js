module.exports.config = {
	name: "giveaway",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "",
	commandCategory: "other",
	usages: "[create/details/join/roll/end] [IDGiveAway]",
	cooldowns: 5
};

module.exports.handleReaction = async ({ api, event, Users, handleReaction }) => {
	let data = global.data.GiveAway.get(handleReaction.ID);
	if (data.status == "close" || data.status == "ended") return;
	if (event.reaction == undefined) {
		data.joined.splice(data.joined.indexOf(event.userID), 1);
		global.data.GiveAway.set(handleReaction.ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
		else value = (value.nicknames)[event.userID];
		return api.sendMessage(`${value} Left Giveaway #${handleReaction.ID}`, event.userID);
	}
	data.joined.push(event.userID);
	global.data.GiveAway.set(handleReaction.ID, data);
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.userID)).name;
	else value = (value.nicknames)[event.userID];
	return api.sendMessage(`${value} Successfully participated in Giveaway #${handleReaction.ID}`, event.userID);
}

module.exports.run = async ({ api, event, args, Users }) => {
	if (!global.data.GiveAway) global.data.GiveAway = new Map();
	if (args[0] == "create") {
		let reward = args.slice(1).join(" ");
		let randomNumber = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.senderID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		api.sendMessage(
			"====== Give Away ======" +
			"\nCreated by: " + value +
			"\nReward: " + reward +
			"\nID GiveAway: #" + randomNumber +
			"\nREACTION TO THIS MESSAGE TO JOIN GIVE AWAY"
			, event.threadID, (err, info) => {
				let dataGA = {
					"ID": randomNumber,
					"author": value,
					"authorID": event.senderID,
					"messageID": info.messageID,
					"reward": reward,
					"joined": [],
					"status": "open"
				}
				global.data.GiveAway.set(randomNumber, dataGA);
				client.handleReaction.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					ID: randomNumber
				})
			}
		)
	}
	else if (args[0] == "details") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("You must enter your GiveAway ID to view giveaway information! (e.g. #12345)", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("The GiveAway ID you entered does not exist!", event.threadID, event.messageID);
		return api.sendMessage(
			"====== Give Away ======" +
			"\nCreated by: " + data.author + "(" + data.authorID + ")" +
			"\nReward: " + data.reward +
			"\nID GiveAway: #" + data.ID +
			"\nNumber of giveaway participants: " + data.joined.length + " Members" +
			"\nStatus: " + data.status
			, event.threadID, data.messageID
		);
	}
	else if (args[0] == "join") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("You must enter your GiveAway ID to participate in the giveaway. (e.g. #12345)", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("The GiveAway ID you entered does not exist!", event.threadID, event.messageID);
		if (data.joined.includes(event.senderID)) return api.sendMessage("You have entered the giveaway.", event.threadID);
		data.joined.push(event.senderID);
		global.data.GiveAway.set(ID, data);
		var value = await api.getThreadInfo(event.threadID);
		if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
		else value = (value.nicknames)[event.senderID];
		return api.sendMessage(`${value} Successfully participated in giveaway with ID: #${ID}`, event.senderID);
	}
	else if (args[0] == "roll") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("You must enter your GiveAway ID to participate in the giveaway! (e.g. #12345)", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("The GiveAway ID you entered does not exist!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("You are not the host of this giveaway!", event.threadID, event.messageID);
		let winner = data.joined[Math.floor(Math.random() * data.joined.length)];
		let userInfo = await Users.getInfo(winner);
		var name = userInfo.name;
		return api.sendMessage({
			body: `Congrats ${name}, you have won the giveaway #${data.ID}\nPlease contact ${data.author}(https://fb.me/${data.authorID})`,
			mentions: [{
				tag: name,
				id: winner
			}]
		}, event.threadID, event.messageID);
	}
	else if (args[0] == "end") {
		let ID = args[1].replace("#", "");
		if (!ID) return api.sendMessage("You must enter your GiveAway ID to participate in the giveaway! (e.g. #12345)", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("The GiveAway ID you entered does not exist!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("You are not the host of this giveaway!", event.threadID, event.messageID);
		data["status"] = "ended";
		global.data.GiveAway.set(ID, data);
		api.unsendMessage(data.messageID);
		return api.sendMessage(`Giveaway #${data.ID} ended by: ${data.author}`, event.threadID, event.messageID);
	}
	else return global.utils.throwError(this.config.name, event.threadID, event.messageID);
}