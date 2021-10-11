const queue = require('./queueList.js');

module.exports = {
    name : "leave",
    description: "Bot leaves the channel",

    execute(message , Discord) {
        const voice_channel = message.member.voice.channel;
        
        const server_queue = queue.getQueue().get(message.guild.id);
        
        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');

        const leaveEmbed = new Discord.MessageEmbed() 
            .setColor("#c6e2ff")
            .setTitle("Leaving the Channel!")
            .setDescription(`Thanks for using the bot!`);

        message.channel.send(leaveEmbed);

        server_queue.songs = [];
        queue.deleteQueue(message);
        voice_channel.leave()
    }
}