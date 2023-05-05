const { DisTube } = require("distube");
const { EmbedBuilder } = require("discord.js");
const queue = require('./queueList');
const ytsr = require('ytsr');

module.exports = {
    name: 'play',
    description: 'plays a music',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,


    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute: async (client, message, args) => {
        
        let server_queue = queue.getQueue().get(message.guild.id);

        if(args.join('').trim() === '') {
            return message.reply("What are you gonna play? Nothing?")
        }

        const playMusic = async (client, message, server_queue) => {

            let song = server_queue.songs[0]
            
            if(song) {
                
                await client.DisTube.play(message.member.voice.channel , song, {
                    member: message.member,
                    textChannel:message.channel,
                    message
                }).catch(err => {
                    const addedEmbed = new EmbedBuilder()
                        .setColor("#FF0000")
                        .setTitle("Not Found")
                        .setDescription(`**URL / Song cannot be found**`);

                    message.channel.send({ embeds: [addedEmbed]})
                });

            } else {
                queues.deleteQueue(message);
            } 
            
        };  

        // START

        try {

            // Means Queue does not exist (new play)
            if(!server_queue) {

                const queue_constructor = {
                    voice_channel: message.member.voice.channel, 
                    text_channel: message.channel, 
                    connection: null,
                    songs: []
                }

                let song = await ytsr(args.join(' ') , {limit: 1});
                let songTitle = song.items[0].title;

                if(songTitle === undefined) {
                    return message.reply("No songs found!");
                }

                queue_constructor.songs.push(songTitle);

                queue.queueConstruct(message, queue_constructor);
                server_queue = queue.getQueue().get(message.guild.id);

                await playMusic(client, message, server_queue);

            } else {

                let song = await ytsr(args.join(' ') , {limit: 1});
                let songTitle = song.items[0].title;
                
                if(songTitle === undefined) {
                    return message.reply("No songs found!");
                }

                server_queue.songs.push(songTitle);

                const addedEmbed = new EmbedBuilder()
                    .setColor("#3f00ff")
                    .setTitle("Added to Queue")
                    .setDescription(`**${songTitle}** was added to the queue!`);

                message.channel.send({embeds: [addedEmbed]});

                await playMusic(client, message, server_queue);

            }   

        } catch(err) {
            message.channel.send(`An error occured to the bot while trying to queue, report this to the developer! \n${err}`)
        }
        
    }
};