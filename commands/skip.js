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

        const skipEmbed = new Discord.MessageEmbed() 
            .setColor("#faed72")
            .setTitle("Skipped Song")
            .setDescription(`Loading ...`);

        message.channel.send(skipEmbed);
        
        server_queue.connection.dispatcher.end();

    }
}