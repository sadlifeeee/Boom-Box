const { DisTube } = require("distube");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'play',
    description: 'test',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply(`test`);
    },

    execute: async (client, message, args) => {

        const queue = client.DisTube.getQueue(message)

        if(!queue) {

            try {
                
                client.DisTube.play(message.member.voice.channel , args.join(" "), {
                    member: message.member,
                    textChannel:message.channel,
                    message
                });
                
                client.DisTube.on("playSong" , (queue, song) => {
                    const playingEmbed = new EmbedBuilder() 
                            .setColor("#8deeee")
                            .setTitle("Now Playing")
                            .setDescription(`**${song.name}** **(${song.formattedDuration})**`);

                    
                    queue.textChannel.send({ embeds: [playingEmbed] });
                })

            } catch(DisTubeError) {

                const playingEmbed = new EmbedBuilder() 
                    .setColor("#8deeee")
                    .setTitle("Not Found")
                    .setDescription(`**URL / Music cannot be found**`);

                    
                queue.textChannel.send({ embeds: [playingEmbed] });
            }

            

        } else {
            
        }

        
        
    }
};