module.exports = {
    name : "help",
    description : "About this Bot",
    execute(message , bot) {

        bot.createMessage(message.channel.id , {
            embed: {
                title: "About This Bot", 
                description: "This Bot is a Music Bot and a Text to Speech Bot",
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