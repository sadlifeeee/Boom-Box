const queue = require('./queueList.js');

module.exports = {
    name : "stop" , 
    description : "Stops the music and resets the queueList", 

    execute(message, args) {
        const voice_channel = message.member.voice.channel;
        
        const server_queue = queue.getQueue().get(message.guild.id);

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');
            
        message.channel.send("Stopped the Music, Queue Reset!");
        
        server_queue.songs = [];
        server_queue.connect.dispatcher.end();
    }
}