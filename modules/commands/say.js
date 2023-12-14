module.exports.config = {
  name: "say",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Mirai Team/Modified By Shen",
  description: "Make the bot return google's audio file via text",
  commandCategory: "Song/video",
  usages: "$say [ISO-139 code] (Like en-US, zh-CN, ko, vi, ja) [Text]",
  cooldowns: 5,
  dependencies: {
    "path": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  try {
    const { createReadStream, unlinkSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];

    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    var languageToSay = "";
    var supportedLanguages = ["en-US", "en-GB", "en-AU", "ja", "zh-CN", "zh-TW", "vi", "ko", "tl", "af", "sq", "am", "ar", "hy", "as","ay", "az", "bm", "eu", "be", "bn", "bho", "bs", "bg", "ca", "ceb", "co", "hr", "cs", "da", "dv", "doi", "nl", "et", "ee", "fil", "fi", "fr", "fy", "gl", "ka", "de", "el", "gn", "gu", "ht", "ha", "haw" ,"he", "iw", "hi", "hu", "is", "ig", "ilo", "id", "ga", "it", "kk", "jv", "jw", "kn", "rw", "gom", "kri", "ku", "ckb", "ky", "lo", "la", "lv", "ln", "lt", "lg", "lb", "mk", "mai", "mg", "ms", "ml", "mt", "mi", "mr", "lus", "mn", "my", "ne", "no", "ny", "or", "om", "ps", "fa", "pl", "pt", "pa", "qu", "ro", "ru", "sm", "sa", "gd", "nso", "sr", "st", "sn", "sd", "si", "sk", "sl", "so", "es", "su", "sw", "sv", "tg", "ta", "tt", "te", "th", "ti", "ts", "tr", "tk", "ak", "uk", "ur", "ug", "uz", "cy", "xh", "yi", "yo", "zu"];

    for (let lang of supportedLanguages) {
      if (content.indexOf(lang) == 0) {
        languageToSay = lang;
        break;
      }
    }

    if (!languageToSay) {
      return api.sendMessage(`Invalid language code. Supported languages: ${supportedLanguages.join(", ")}`, event.threadID, event.messageID);
    }

    var msg = content.slice(languageToSay.length + 1);

    const path = resolve(__dirname, 'cache', `${event.threadID}_${event.senderID}.mp3`);
    await global.utils.downloadFile(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(msg)}&tl=${languageToSay}&client=tw-ob`, path);
    return api.sendMessage({ attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path), event.messageID);
  } catch (e) {
    return console.log(e);
  }
};