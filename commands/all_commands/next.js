const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');
const queue = require('./queueList');

module.exports = {
    name: 'next',
    description: "skips the song",
    inVoiceChannel: true,
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {
        
        const queueDisTube = client.DisTube.getQueue(message)
        
        if (!queueDisTube) return message.channel.send(`There is nothing in queue right now`)

        await queueDisTube.skip()

        const skipEmbed = new EmbedBuilder() 
            .setColor("#faed72")
            .setTitle("Skipped Song")
            .setDescription(`Loading ...`);

        message.channel.send({ embeds: [skipEmbed]})

        queue.deleteQueue(message);

    } 
}