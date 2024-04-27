const moment = require("moment-timezone");
const axios = require('axios');
 
module.exports = {
    config: {
    name: "gpt",
    version: "1.0.0",
    role: 0,
    author: "api by jerome",//api by jerome
    longDescription: "Gojo architecture",
    category: "ai",
    countDown: 5,
},
 
 
onChat: async function ({ api, event }) {
 const message = event.body;
  const command = "gojo";
 
  if (message.indexOf(command) === 0 || message.indexOf(command.charAt(0).toUpperCase() + command.slice(1)) === 0) {
    const args = message.split(/\s+/);
    args.shift();
   
try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');
 
        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }
 
        if (!prompt) {
            return api.sendMessage('🐱 𝙷𝚎𝚕𝚕𝚘, 𝙸 𝚊𝚖 𝚐𝚘𝚓𝚘 𝚝𝚛𝚊𝚒𝚗𝚎𝚍 𝚋𝚢 𝙶𝚊𝚋𝚈𝚞\n\n𝙷𝚘𝚠 𝚖𝚊𝚢 𝚒 𝚊𝚜𝚜𝚒𝚜𝚝 𝚢𝚘𝚞 𝚝𝚘𝚍𝚊𝚢?', event.threadID, messageID);
        }
        api.sendMessage('🗨️ | 𝚐𝚘𝚓𝚘 𝚒𝚜 𝚜𝚎𝚊𝚛𝚌𝚑𝚒𝚗𝚐, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...', event.threadID);
 
        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed
 
        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;
        const manilaTime = moment.tz('Asia/Manila');
        const formattedDateTime = manilaTime.format('MMMM D, YYYY h:mm A');
 
        const response = await axios.get(gpt4_api);
 
        if (response.data && response.data.response) {
            const generatedText = response.data.response;
 
            // Ai Answer Here
            api.sendMessage(`☣️ 𝐆𝐨𝐣𝐨 𝐀𝐧𝐬𝐰𝐞𝐫\n━━━━━━━━━━━━━━━━\n\n🖋️ 𝙰𝚜𝚔: '${prompt}'\n\n𝗔𝗻𝘀𝘄𝗲𝗿: ${generatedText}\n\n🗓️ | ⏰ 𝙳𝚊𝚝𝚎 & 𝚃𝚒𝚖𝚎:\n.⋅ ۵ ${formattedDateTime} ۵ ⋅.\n\n━━━━━━━━━━━━━━━━`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Response data: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
}
},
onStart: async function ({ api, event, args }) {
 
}
};