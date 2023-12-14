const fs = require('fs');

let messageCounts = {};
const spamThreshold = 10;
const spamInterval = 60000;
let spamDetectionActive = true;
const warnedUsers = new Set();

fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));

module.exports.config = {
  name: "spamkick",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Jonell Magallanes and BLUE",
  description: "Automatically detect and act on spam",
  usePrefix: "true",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID } = event;
  const action = args[0];
  const target = args[1];

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (action === 'on') {
    spamDetectionActive = true;
    api.sendMessage("🛡️ | Spam detection turned ON", threadID);
  } else if (action === 'off') {
    spamDetectionActive = false;
    api.sendMessage("📪 | Spam detection turned OFF", threadID);
  } else if (action === 'unwarn') {
    if (target) {
      if (messageCounts[threadID] && messageCounts[threadID][target]) {
        delete messageCounts[threadID][target];
        warnedUsers.delete(`${threadID}_${target}`);
        api.sendMessage(`User ${target} has been unwarned.`, threadID);
      } else {
        api.sendMessage(`User ${target} is not warned yet.`, threadID);
      }
    } else {
      api.sendMessage(`You should specify a user to unwarn.`, threadID);
    }
  } else {
    api.sendMessage(`Invalid command. Use 'on' or 'off' or 'unwarn'.`, threadID);
  }

  fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));
};

module.exports.handleEvent = async function({ api, event }) {
  if (!spamDetectionActive) return;

  const { threadID, messageID, senderID } = event;

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (!messageCounts[threadID]) {
    messageCounts[threadID] = {};
  }

  if (!messageCounts[threadID][senderID]) {
    messageCounts[threadID][senderID] = {
      count: 1,
      timer: setTimeout(() => {
        delete messageCounts[threadID][senderID];
      }, spamInterval)
    };
  } else {
    messageCounts[threadID][senderID].count++;
    if (messageCounts[threadID][senderID].count > spamThreshold && !warnedUsers.has(`${threadID}_${senderID}`)) {
      warnedUsers.add(`${threadID}_${senderID}`);
      api.removeUserFromGroup(senderID, threadID);
      api.sendMessage({
        body: "🛡️ | Detected spamming. The user has been removed from the group.",
        mentions: [{
          tag: senderID,
          id: senderID
        }]
      }, threadID, messageID);
    }
  }
  
  fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));
};