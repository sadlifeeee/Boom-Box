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

        if(queueDisTube.songs.length === 0) {
            const skipEmbed = new EmbedBuilder() 
                .setColor("#faed72")
                .setTitle("Nothing to Skip")
                .setDescription(`......`);

            return message.channel.send({ embeds: [skipEmbed]})
            
        }


        if(queueDisTube.songs.length === 1) {
             queueDisTube.stop();
             queue.deleteQueue(message);
        } else {
            await queueDisTube.skip();
        }

        const skipEmbed = new EmbedBuilder() 
            .setColor("#faed72")
            .setTitle("Skipped Song")
            .setDescription(`Loading ...`);

        message.channel.send({ embeds: [skipEmbed]})

    } 
}