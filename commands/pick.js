const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = require('./queueList.js');
const video_player = require('./video_player.js');

module.exports = {
    name : 'pick',
    description: 'lets you pick from top search',

    async execute(message , args , command , client , Discord) {

        const voice_channel = message.member.voice.channel;

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');
            
        voice_channel.guild.me.edit({deafen:true})

        const permissions = voice_channel.permissionsFor(message.client.user);

        if(!permissions.has('CONNECT')) 
            return message.reply('You do not have the correct permissions **CONNECT**');
        
        if(!permissions.has('SPEAK'))
            return message.reply('You do not have the correct permissions **SPEAK**');
        
        const server_queue = queue.getQueue().get(message.guild.id);
        
        if(!args.length)
            return message.reply('You need to send the second argument for the command to work!');

        let song = {};

        if(ytdl.validateURL(args)) {
            message.reply('Link does not work with this command');  
        } else {

            const video_finder = async(query) => {
                const videoResult = await ytSearch(query);
                let result ;

                const pickEmbed = new Discord.MessageEmbed() 
                .setColor("#ffbdcc")
                .setTitle("Youtube Top 5 Result")
                .setDescription("Pick from **1 to 5**");

                for(i = 0; i < 5; i++) {
                    pickEmbed.addField("[" + (i + 1) + "]" , videoResult.videos[i].title );
                }

                message.channel.send(pickEmbed);

                const filter = (m) => m.author.id === message.author.id;
                
                await message.channel.awaitMessages(filter, {max : 1, time : 10000, errors: ["time"]})
                .then((collected) => {
                    const msg = collected.first();

                    if(isNaN(parseInt(msg.content)) || (parseInt(msg.content) > 5 && parseInt(msg.content) < 0))
                        return message.channel.reply("Invalid Input, Try the command again");
                    else {
                        const index = parseInt(msg.content)
                        result = videoResult.videos[index - 1]
                    }

                })
                .catch((err) => {
                    console.log(err) 
                });
                
                return result;
            }

            const video = await video_finder(args.join(' '));

            if(video) {
                song = {title: video.title, url: video.url}
            } else {
                return message.reply("Invalid Input or Time Exceeded, Try again");
            }
        }

            if(!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel, 
                    text_channel: message.channel, 
                    connection: null,
                    songs: []
                }
            
                queue_constructor.songs.push(song);

                try {
                    const connection = await voice_channel.join();
                    connection.voice.setSelfDeaf(true);
                    queue_constructor.connection = connection;
                    
                    queue.queueConstruct(message, queue_constructor);
                    video_player.player(message , message.guild, queue_constructor.songs[0], Discord);
                } catch(err) {
                    queue.deleteQueue(message);
                    message.channel.send('There was an error connecting to the server!');
                    throw err;
                }
    
            } else {
                server_queue.songs.push(song);

                const addedEmbed = new Discord.MessageEmbed()
                .setColor("#3f00ff")
                .setTitle("Added to Queue")
                .setDescription(`**${song.title}** was added to the queue!`);
                
                return message.channel.send(addedEmbed);
            }
        
        
    },

}