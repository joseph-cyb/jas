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

      name: '𝗚𝗔𝗕 𝗬𝗨',

      gender: '𝗠𝗔𝗟𝗘',

      age: '𝟭𝟰',

      height: '𝟱 𝟳',

      facebookLink: 'https://www.facebook.com/profile.php?id=100079114908948',

      nick: '𝗚𝗜𝗬𝗨'

    };


    const bold = 'https://i.imgur.com/0Obqcax.mp4'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id


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

      api.setMessageReaction('☣', event.messageID, (err) => {}, true);

    }

  } catch (error) {

    console.error('Error in ownerinfo command:', error);

    return api.sendMessage('An error occurred while processing the command.', event.threadID);

   }

    },

    onChat: async function({ api, event }) {

      try {

        const lowerCaseBody = event.body.toLowerCase();

        

        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {

          await this.onStart({ api, event });

        }

      } catch (error) {

        console.error('Error in onChat function:', error);

      }

    }

  };