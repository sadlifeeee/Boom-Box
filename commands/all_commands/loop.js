const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'loop',
    description: "loops the music / queuelist",
    inVoiceChannel: true,
    
    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute : async (client, message, args) => {

        const queue = client.DisTube.getQueue(message)

        if (!queue) return message.channel.send(`There is nothing playing!`)

        let mode = null
        switch (args.toString()) {
            case 'off':
                mode = 0
                break
            case 'single':
                mode = 1
                break
            case 'queue':
                mode = 2
                break

            default: 
                return message.channel.reply('Options are off, single , queue. Remember the options okay?')
        }
        
        mode = queue.setRepeatMode(mode)
        
        const loopEmbed = new EmbedBuilder() 
            .setColor("#c6e2ff")
            .setTitle("Loop mode")
            .setDescription(`Mode is set to ${args}`);

        message.channel.send({ embeds: [loopEmbed]})
        
    } 
}