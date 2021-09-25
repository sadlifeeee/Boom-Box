module.exports = {
    name: "leave",
    description: "stops the bot and leaves the channel",
    async execute(message, bot) {
        const voiceChannel = message.member.voiceState.channelID;

        if(!voiceChannel)
            return bot.createMessage(message.channel.id , "You need to be in a voice channel to stop the music!");
        
        await bot.createMessage(message.channel.id, "Leaving the Channel, Thanks for using Boom Box!");
        bot.leaveVoiceChannel(message.channel.id)
        
    }
}