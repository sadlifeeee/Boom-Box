module.exports = {
    name: "leave",
    description: "stops the bot and leaves the channel",
    async execute(message, bot) {
        const voiceChannel = message.member.voiceState.channelID;

        if(!voiceChannel)
            return bot.createMessage(message.channel.id , "You need to be in a voice channel to stop the music!");
        
        await bot.createMessage(message.channel.id, {
                    embed : {
                        title : "***Leaving Voice Channel***",
                        description :  "Thank you for using the bot!",
                        color: 15158332,
                    }
                });
        bot.leaveVoiceChannel(message.channel.id)
        
    }
}