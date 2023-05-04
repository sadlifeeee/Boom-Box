const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    description: "stops the song",
    inVoiceChannel: true,
  
    execute : async (client, message, args) => {
        
        const queue = client.DisTube.getQueue(message)
        
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)

        queue.stop()

        const stopEmbed = new EmbedBuilder() 
            .setColor("#b7235b")
            .setTitle("Stopped Music!")
            .setDescription(`Music Stopped and Resetting Queue`);

        message.channel.send({ embeds: [stopEmbed]})

    } 
}