const { DisTube } = require("distube");
const { EmbedBuilder, Embed } = require('discord.js');
const queue = require('./queueList');

module.exports = {
    name: 'stop',
    description: "stops the music",
    inVoiceChannel: true,
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {
        
        const queueDisTube = client.DisTube.getQueue(message)
        
        if (!queueDisTube) return message.channel.send(`There is nothing in queue right now`)
        
        queueDisTube.stop();

        const stopEmbed = new EmbedBuilder() 
            .setColor("#b7235b")
            .setTitle("Stopped Music!")
            .setDescription(`Music Stopped and Resetting Queue`);

        message.channel.send({ embeds: [stopEmbed]})

        queue.deleteQueue(message);

    } 
}