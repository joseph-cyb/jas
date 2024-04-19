module.exports = {
 config: {
  name: "shoti",
  aliases: ["st"],
  version: "1.0.0",
  role: 0,
  author: "libyzxy0",//convert Kaizenji
  longDescription: { en: "Generate a random tiktok video."},
  category: "fun",
  countDown: 0,
},

onStart: async ({ api, event, args }) => {

  api.setMessageReaction("⏳", event.messageID, (err) => {
     }, true);
api.sendTypingIndicator(event.threadID, true);

  const { messageID, threadID } = event;
  const fs = require("fs");
  const axios = require("axios");
  const request = require("request");
  const prompt = args.join(" ");

  if (!prompt[0]) { api.sendMessage("Sending mga shoti ni GabYu...", threadID, messageID);
    }

 try {
  const response = await axios.post(`https://shoti-server-v2.vercel.app/api/v1/get`, { apikey: `$shoti-1hjvb0q3sokk2bvme` });

  const path = __dirname + `/cache/shoti.mp4`;
  const file = fs.createWriteStream(path);
  const rqs = request(encodeURI(response.data.data.url));
  rqs.pipe(file);
  file.on(`finish`, () => {
     setTimeout(function() {
       api.setMessageReaction("✅", event.messageID, (err) => {
          }, true);
      return api.sendMessage({
      body: `SHOTI DOWNLOADED! \n\n🍑 •| userName: @${response.data.data.user.username}\n🍑 •| userNickname: ${response.data.data.user.nickname}\n👾 •| userID: ${response.data.data.user.userID}\n👾 •| Duration: ${response.data.data.duration}`, 
      attachment: fs.createReadStream(path)
    }, threadID);
      }, 5000);
        });
  file.on(`error`, (err) => {
      api.sendMessage(`Error: ${err}`, threadID, messageID);
  });
   } catch (err) {
    api.sendMessage(`Error: ${err}`, threadID, messageID);
  }
}
};