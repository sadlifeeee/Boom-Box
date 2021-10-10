const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = require('./queueList.js');
const video_player = require('./video_player.js');

module.exports = {
    name : 'play',
    description: 'Plays Music',

    async execute(message , args , command , client , Discord) {

        const voice_channel = message.member.voice.channel;
        
        voice_channel.guild.me.edit({deafen:true})

        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');
            
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
            const song_info = await ytdl.getInfo(args);
            song = {title : song_info.videoDetails.title , url: song_info.videoDetails.video_url}
        } else {
            const video_finder = async(query) => {
                const videoResult = await ytSearch(query);
                let result = null;

                if(videoResult.videos.length > 1)
                    result = videoResult.videos[0];
                
                return result;
            }

            const video = await video_finder(args.join(' '));

            if(video) {
                song = {title: video.title, url: video.url}
            } else {
                message.reply("An Error happened while finding the video!");
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
                video_player.player(message.guild, queue_constructor.songs[0], Discord);
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

    async replay(guild, song) {
        video_player.player(guild, song);
    },
}