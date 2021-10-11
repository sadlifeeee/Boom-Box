const queue = require('./queueList.js');

module.exports = {
    name : "resume",
    description: "resume the music",

    execute(message , Discord) {
        const voice_channel = message.member.voice.channel;

        const server_queue = queue.getQueue().get(message.guild.id);

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');

        if(!server_queue)
            return message.channel.send("There are no songs in the queue");

        const leaveEmbed = new Discord.MessageEmbed() 
            .setColor("#c6e2ff")
            .setTitle("Resuming Music!")
            .setDescription(`$pause to pause`);

        message.channel.send(leaveEmbed);

        
        if (server_queue.connection.dispatcher.paused) 
            server_queue.connection.dispatcher.resume();
        else {
            message.reply('Music is already resumed');
        }
    }
}