const { DisTube } = require("distube");
const { EmbedBuilder } = require('discord.js');
const queue = require('./queueList');
const skipEmbed = new EmbedBuilder() 
    .setColor("#faed72")
    .setTitle("Skipped Song")
    .setDescription(`Loading next song if there is something in queue...`);

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

        console.log(queueDisTube.repeatMode);

        if(queueDisTube.songs.length === 1 && (queueDisTube.repeatMode === 1 || queueDisTube.repeatMode === 2)) {

            const url = queueDisTube.songs[0].url;
            queueDisTube.stop();
            queue.deleteQueue(message);

            
            message.channel.send({ embeds: [skipEmbed]})

            await client.DisTube.play(message.member.voice.channel , url, {
                member: message.member,
                textChannel:message.channel,
                message
            });

        } else if(queueDisTube.songs.length === 1){
            queueDisTube.stop();
            queue.deleteQueue(message);
            
            const noSongsEmbed = new EmbedBuilder() 
                .setColor("#faed72")
                .setTitle("No More Songs to Play!")
                .setDescription(`Thank you for using the bot!`);

            return message.channel.send({ embeds: [noSongsEmbed]})

        } else {
            await queueDisTube.skip();
            message.channel.send({ embeds: [skipEmbed]})
        }


    } 
}