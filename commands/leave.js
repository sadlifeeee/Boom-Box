module.exports = {
    name : "leave",
    description: "Bot leaves the channel",

    execute(message) {
        const voice_channel = message.member.voice.channel;
        
        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');

        message.channel.send("Leaving the Channel!");
        voice_channel.leave()
    }
}