const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'pause',
    description: "pauses the song",
    inVoiceChannel: true,
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {
        
        const queueDisTube = client.DisTube.getQueue(message)
        
        if (!queueDisTube) return message.channel.send(`There is nothing in queue right now`)

        queueDisTube.pause()

        const leaveEmbed = new EmbedBuilder() 
            .setColor("#c6e2ff")
            .setTitle("Pausing Music!")
            .setDescription(`$resume to resume`);

        message.channel.send({ embeds: [leaveEmbed]})
    } 
}