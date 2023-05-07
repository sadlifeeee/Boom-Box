const { DisTube } = require("distube");
const { EmbedBuilder, Embed } = require('discord.js');
const queue = require('./queueList');

module.exports = {
    name: 'invite',
    description: "sends the invite link",
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {
        
        const inviteEmbed = new EmbedBuilder() 
            .setColor("#b7235b")
            .setTitle("Thanks for inviting the bot to your server!")
            .setDescription(`Paste this link: \n https://discord.com/api/oauth2/authorize?client_id=890246640890445844&permissions=8&scope=bot`);

        message.channel.send({ embeds: [inviteEmbed]})

    } 
}