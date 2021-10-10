const queue = require('./queueList.js');

module.exports = {
    name : "stop" , 
    description : "Stops the music and resets the queueList", 

    execute(message, Discord) {
        const voice_channel = message.member.voice.channel;
        
        const server_queue = queue.getQueue().get(message.guild.id);

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');
        
        const stopEmbed = new Discord.MessageEmbed() 
            .setColor("#b7235b")
            .setTitle("Stopped Music!")
            .setDescription(`Music Stopped and Resetting Queue`);

        message.channel.send(stopEmbed);

        server_queue.songs = [];

        queue.deleteQueue(message);

        server_queue.connect.dispatcher.end();
    }
}