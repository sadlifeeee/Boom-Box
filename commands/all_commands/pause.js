const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: "pauses the song",
    inVoiceChannel: true,
  
    execute : async (client, message, args) => {
        
        const queue = client.DisTube.getQueue(message)
        
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        
        if (queue.paused) {
            queue.resume()
            return message.channel.send('Resumed the song for you :)')
        }

        queue.pause()

        const leaveEmbed = new EmbedBuilder() 
            .setColor("#c6e2ff")
            .setTitle("Pausing Music!")
            .setDescription(`$resume to resume`);

        message.channel.send({ embeds: [leaveEmbed]})
    } 
}