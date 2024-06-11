const axios = require('axios');

module.exports = {
  config: {
    name: 'globalgpt',
    aliases: ["gpt2"],
    version: '1.0.1',
    author: 'Kaizenji',//Hashier's API 
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'ask Globalgpt for an answer.',
    },
    longDescription: {
      en: 'Asks an Global Gpt for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function ({ api, event, args, message }) {
    try {
      const prompt = event.body.trim();

      if (prompt) {
        const unsendFirstMessage = await api.sendMessage("💭 | 𝖦𝗅𝗈𝖻𝖺𝗅 𝖦𝖯𝖳 𝗂𝗌 𝗍𝗁𝗂𝗇𝗄𝗂𝗇𝗀 𝗉𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍...", event.threadID);

        const response = await axios.get(`https://hashier-api-globalgpt.vercel.app/api/globalgpt?q=${encodeURIComponent(prompt)}`);

        if (response.status === 200 && response.data && response.data.content) {
          const messageText = response.data.content.trim();
          await api.sendMessage({
            body: messageText,
            mentions: event.mentions,
          }, event.threadID, unsendFirstMessage.messageID);
          console.log('Sent answer as a reply to the user');
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nApi sucks bro, better luck next time.`,
        event.threadID
      );
    }
  },
};
