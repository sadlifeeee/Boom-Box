const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: "resumes the paused song",
    inVoiceChannel: true,
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {
        
        const queueDisTube = client.DisTube.getQueue(message)
        
        if (!queueDisTube) return message.channel.send(`There is nothing in queue right now`)
        
        if (queueDisTube.paused) {
            queueDisTube.resume()

            const resumeEmbed = new EmbedBuilder() 
                .setColor("#c6e2ff")
                .setTitle("Resuming Music!")
                .setDescription(`$pause to pause`);

            message.channel.send({ embeds: [resumeEmbed]})

        } else {
            const resumeEmbed = new EmbedBuilder() 
                .setColor("#c6e2ff")
                .setTitle("Queue not Paused!")
                .setDescription(`$pause to pause`);

            message.channel.send({ embeds: [resumeEmbed]})
        }

    } 
}