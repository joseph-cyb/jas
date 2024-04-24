module.exports = {
	config: {
			name: "GabYu",
			version: "1.0",
        aliases: ["Gab"],
			author: "GabYu",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "@Gab Yu") return message.reply("Busy Owner ko");
}
};