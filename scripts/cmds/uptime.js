module.exports = {
  config: {
    name: "uptime",
    aliases: ["up", "upt"],
    version: "1.0",
    author: "unknown",
    role: 0,
    shortDescription: {
      en: "Displays the uptime of the bot."
    },
    longDescription: {
      en: "Displays the amount of time that the bot has been running for."
    },
    category: "system",
    guide: {
      en: "Use {p}uptime to display the uptime of the bot."
    }
  },
  onStart: async function ({ api, event, args }) {
    
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
    api.sendMessage(`𝗛𝗲𝗹𝗹𝗼 𝗠𝗮𝘀𝘁𝗲𝗿 🌀,

🤖 𝗧𝗚𝗙 𝗯𝗼𝘁 𝗶𝘀 𝗿𝘂𝗻𝗻𝗶𝗻𝗴 𝗳𝗿𝗼𝗺
 
 
 ${uptimeString}.`, event.threadID);
  }
};