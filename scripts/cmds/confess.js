 module.exports = {
  config: {
    name: "confess",
    aliases: ["confess"],
    version: "1.1",
    author: "Jmlabaco & Xicz Latte",
    countDown: 5,
    role: 0,
    shortDescription: "Send a confession message to a specific thread.",
    longDescription: "Send a confession message anonymously or openly to someone special using their thread ID.",
    category: "Anon",
    guide: "Usage: {p}confess <thread-id> | <message>",
  },
  onStart: async function ({ api, event, args }) {
    if (args.length < 2) {
      api.sendMessage("Invalid format. Use: confess <thread/uid> | <message>", event.threadID, event.messageID);
      return;
    }

    const [threadID, confession] = args.join(" ").split(" | ");

    if (!confession || !threadID) {
      api.sendMessage("Invalid format. Use: {p}confess <thread/uid> | <message>", event.threadID, event.messageID);
      return;
    }

    const confessionMessage = `
            Anonymous confession for you!
📬ُ Marian's mailing service!
            ⤿ ${confession.trim()}
    `;

    api.sendMessage(confessionMessage, threadID, () => {
      const successMessage = `Successfully Sent To (${threadID})\n\nYou Sent: ${confession.trim()}`;
      api.sendMessage(successMessage, event.threadID);
    });
  }
};