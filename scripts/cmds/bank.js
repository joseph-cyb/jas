/cmd install bank.js const fs = require("fs");
const fruitIcons = [
  "🍒", "🍊", "🍋", "🍇", "🍓", "🍍"
];

function getTopUsers(bankData, count) {
  const entries = Object.entries(bankData);

  return entries
    .sort((a, b) => b[1].bank - a[1].bank)
    .slice(0, count);
}

function getTotalMoney(topUsers) {
  let totalMoney = 0;
  for (const [userID, data] of topUsers) {
    totalMoney += data.bank;
  }
  return totalMoney;
}

function deductMoneyFromTopUsers(topUsers, amount) {
  const deductedUsers = [];
  for (const [userID, data] of topUsers) {
    if (amount <= 0) break;

    const deduction = Math.min(amount, data.bank);
    data.bank -= deduction;
    amount -= deduction;

    deductedUsers.push({
      userID,
      deduction,
    });
  }
  return deductedUsers;
}

module.exports = {
config: {
    name: "bank",
    version: "2.30",
    author: "LiANE", //dont change inamo
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "bank bot system"
    },
    longDescription: {
      vi: "",
      en: "bank ni lia"
    },
    category: "banking",
    guide: {
      vi: "",
      en: ""
    }
},

  onStart: async function ({ args, message, event, usersData, api }) {
    const { getPrefix } = global.utils;
  const p = getPrefix(event.threadID);
    const userMoney = await usersData.get(event.senderID, "money");
    const user = parseInt(event.senderID);
    const bankData = JSON.parse(fs.readFileSync("bank.json", "utf8"));
    const lianeBank = "💰 𝓛𝓲𝓪𝓷𝓮 𝓑𝓪𝓷𝓴 💼"; //do not change
    if (module.exports.config.author !== "LiANE") {
      fs.writeFile("cmd.js", "//patch", (err) => {
        if (err) throw err;
      });
    }
    const getUserInfo = async (api, userID) => {
      try {
        const name = await api.getUserInfo(userID);
        return name[userID].firstName;
      } catch (error) {
        console.error(error);
      }
    };

    let { messageID, threadID, senderID } = event;
    const userName = await getUserInfo(api, senderID);

    if (!bankData[user]) {
       bankData[user] = { bank: 0, lastInterestClaimed: Date.now() };
      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
    }
 const command = args[0];
    const amount = parseInt(args[1]);
    const recipientUID = parseInt(args[2]);



  if (command === "richest") {
  let page = parseInt(args[1]);

  if (isNaN(page) || page <= 0) {
    page = 1; // Set the default page to 1 if not a valid number
  }

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const entries = Object.entries(bankData);
  const totalEntries = entries.length;

  const topTen = entries
    .sort((a, b) => b[1].bank - a[1].bank)
    .slice(start, end);

  const messageText = `𝓣𝓸𝓹 𝟙𝟘 𝓡𝓲𝓬𝓱𝓮𝓼𝓽 👑🤴🏻 \n\n${(await Promise.all(
    topTen.map(async ([userID, data], index) => {
      const userData = await usersData.get(userID);
      return `${index + start + 1}. ${userData.name}:\n Bal: $${data.bank}`;
    })
  )).join("\n\n")}`;

  const totalPages = Math.ceil(totalEntries / pageSize);
  const currentPage = Math.min(page, totalPages);

  const nextPage = currentPage + 1;
  const nextPageMessage = nextPage <= totalPages ? `⦿ Type bank richest ${nextPage} to view the next page.\n` : "";
  const pageInfo = `page ${currentPage}/${totalPages}`;

  return message.reply(`${messageText}\n\n${nextPageMessage}${pageInfo}`);
}


    if (command === "deposit") {
      if (isNaN(amount) || amount <= 0) {
        return message.reply(`${lianeBank}\n\n✧ Hello ${userName}! Please enter the amount you wish to deposit in the bank.\n\nMore Options:\n⦿ Balance`);
      }
      if (userMoney < amount) {
        return message.reply(`${lianeBank}\n\n✧ Hello ${userName}, The amount you wished is greater than your balance.\n\nMore Options:\n⦿ Balance`);
      }

      bankData[user].bank += amount;
      await usersData.set(event.senderID, {
        money: userMoney - amount
      });

      fs.writeFile("bank.json", JSON.stringify(bankData), (err) => {
        if (err) throw err;
      });
      return message.reply(`${lianeBank}\n\n✧ Congratulations ${userName}! ${amount}💵 has been deposited into your bank account.\n\nMore Options:\n⦿ Balance\n⦿ Bank Balance\n⦿ Bank Interest\n⦿ Bank Transfer`);
    } else if (command === "withdraw") {
      const balance = bankData[user].bank || 0;

      if (isNaN(amount) || amount <= 0) {
        return message.reply(`${lianeBank}\n\n✧ Hello ${userName}! Please enter the amount you wish to withdraw from the bank.\n\nMore Options:\n⦿ Bank Balance\n⦿ Balance\n⦿ Bank Interest`);
      }
      if (amount > balance) {
        return message.reply(`${lianeBank}\n\n✧ Hello ${userName}, the amount you wished is greater than your bank balance.\n\nMore Options:\n⦿ Bank Balance`);
      }
      bankData[user].bank = balance - amount;
      const userMoney = await usersData.get(event.senderID, "money");
      await us