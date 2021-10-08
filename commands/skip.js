const queue = require('./queueList.js');

module.exports = {
    name : "skip" , 
    description: "Skips the music",

    execute(message, Discord) {
        const voice_channel = message.member.voice.channel;
        
        const server_queue = queue.getQueue().get(message.guild.id);

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');
            
        if(!server_queue)
            return message.channel.send("There are no songs in the queue");

        message.channel.send("Skipped the Music!");
        
        server_queue.connect.dispatcher.end();
    }
}