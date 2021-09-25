const Eris = require("eris");
const dotenv = require("dotenv").config();

let bot = new Eris(process.env.BOT_TOKEN);

module.exports = {
    name : "About Command",
    description : "About this Bot",
    execute(message) {

        bot.createMessage(message.channel.id , {
            embed: {
                title: "About This Bot", 
                description: "This Bot is a Music Bot and a Text to Speech Bot",
                author: { 
                    text : "test",
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                color: 0x008000,
                fields: [ 
                    {
                        name: "Commands", 
                        value: "*$play {title/url}*\n*$tts {message}* \n*$help* \n*$about*\n", // Field
                        inline: true 
                    },
                    {
                        name: "Description",
                        value: "to play music\nto play message\nfor help on commands\nfor information about this bot\n",
                        inline: true
                    }
                ],
                footer: { 
                    text: "This Bot is for Personal Use ONLY"
                }
            }
        });
    }
}