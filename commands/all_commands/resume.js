const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'resume',
    description: "resumes the paused song",
    inVoiceChannel: true,
  
    execute : async (client, message, args) => {
        
        const queue = client.DisTube.getQueue(message)
        
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        
        if (queue.paused) {
            queue.resume()

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