const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermission: 0,
    credits: "AJ",//api by jerome
    description: "Gpt architecture",
    hasPrefix: false,
    commandCategory: "GPT4",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('ℹ 𝚙𝚕𝚎𝚊𝚜𝚎 𝚝𝚢𝚙𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗', event.threadID, messageID);
        }
        api.sendMessage('🕙 | 𝗔𝗡𝗦𝗪𝗘𝗥𝗜𝗡𝗚 𝗬𝗢𝗨𝗥 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡 𝗪𝗔𝗜𝗧 𝗔 𝗠𝗢𝗠𝗘𝗡𝗧...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(prompt)}&model=gpt-4-32k-0314`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🎓 ( 𝐀𝐈 )\n━━━━━━━━━━━━━━━━\n📝 𝘼𝙉𝙎𝙒𝙀𝙍: ➪ ${generatedText}\n━━━━━━━━━━━━━━━━\n❇ 𝙏𝙃𝙄𝙎 𝘼𝙐𝙏𝙊𝘽𝙊𝙏 𝙄𝙎 𝘾𝙍𝙀𝘼𝙏𝙀𝘿 𝘽𝙔: 𝙆𝙔𝙎𝙇𝙀𝙍\n✳ 𝙔𝙊𝙐 𝘾𝘼𝙉 𝘾𝙍𝙀𝘼𝙏𝙀 𝙔𝙊𝙐𝙍 𝙊𝙒𝙉 𝘽𝙊𝙏 𝙃𝙀𝙍𝙀 ➪ https://autobot-by-kyschiro.onrender.com/`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ 𝙰𝙽 𝙴𝚁𝚁𝙾𝚁 𝙾𝙲𝙲𝚄𝚁𝚁𝙴𝙳 𝚆𝙷𝙸𝙻𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚃𝙷𝙴 𝚃𝙴𝚇𝚃 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴. 𝙿𝙻𝙴𝙰𝚂𝙴 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽 𝙻𝙰𝚃𝙴𝚁. 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴 𝙳𝙰𝚃𝙰: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌  error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
          
