const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝗝𝗔𝗞𝗘 𝗝𝗢𝗦𝗛𝗨𝗔',
      gender: '𝗠𝗔𝗟𝗘',
      age: '𝗡𝗢𝗡𝗘',
      height: '𝗡𝗢𝗡𝗘',
      facebookLink: 'https://www.facebook.com/profile.php?id=100076651767866',
      nick: '𝗝𝗔𝗞𝗘'
    };

    const bold = 'https://scontent-fra3-1.xx.fbcdn.net/v/t15.5256-10/344285141_1443149709783586_10012193223158773_n.jpg?stp=dst-jpg_p180x540&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ot6KLkODUY0Ab6AESyi&_nc_ht=scontent-fra3-1.xx&oh=00_AfC56ytlF93G0_fMVoviqDChrsV4DjTLFD7An3gSxUiAjw&oe=6628E796'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
Owner Information:🧾
Name: ${ownerInfo.name}
Gender: ${ownerInfo.gender}
Age: ${ownerInfo.age}
Height: ${ownerInfo.height}
Facebook: ${ownerInfo.facebookLink}
Nick: ${ownerInfo.nick}
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};