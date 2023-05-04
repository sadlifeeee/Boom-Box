const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'leave',
    description: "leaves the voicecall",
    inVoiceChannel: true,
  
    execute : async (client, message, args) => {
        
        client.DisTube.voices.leave(message);

        const leaveEmbed = new EmbedBuilder() 
            .setColor("#c6e2ff")
            .setTitle("Leaving the Channel!")
            .setDescription(`Thanks for using the bot! 👋 👋 `);

        message.channel.send({ embeds: [leaveEmbed]})
    } 
}