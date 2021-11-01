const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = require('./queueList.js');
const video_player = require('./video_player.js');
const ytpl = require('ytpl');
const { getData, getPreview, getTracks } = require('spotify-url-info')

module.exports = {
    name : 'play',
    description: 'Plays Music',

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
        let playlist = false;
        let allsongs = [];
        let spotifyLink = /((open|play)\.spotify\.com\/)/;

        if(ytpl.validateID(args[0].toString())){
            playlist = true;

            const video_playlist = async(query) => {
                const playlistResult = await ytpl(query, { limit: Infinity });
                for(i = 0; i < playlistResult.items.length; i++) {
                    song = {title: playlistResult.items[i].title, url: playlistResult.items[i].url};
                    allsongs.push(song);
                }
            }

            await video_playlist(args[0].toString())
            // for people reading this code, there might be a better way to do this but yeah 
        } else if(ytdl.validateURL(args)) {
            const song_info = await ytdl.getInfo(args);
            song = {title : song_info.videoDetails.title , url: song_info.videoDetails.video_url};

        } else if(spotifyLink.test(args[0].toString())){
            

            const video_finder = async(query) => {
                const videoResult = await ytSearch(query);
                let result = null;

                if(videoResult.videos.length > 1)
                    result = videoResult.videos[0];
                
                return result;
            }

            let track = /((open|play)\.spotify\.com\/track\/)/;
            
            let playlistSpotify = /((open|play)\.spotify\.com\/playlist\/)/;

            const songPromise = await getData(args[0].toString()).then(data => data)

            let spotifyTitle = "";

            if(track.test(args[0].toString())) {

                spotifyTitle = songPromise.name + " " + songPromise.artists[0].name
                
                const video = await video_finder(spotifyTitle);

                if(video) {
                    song = {title: songPromise.artists[0].name + "  -  " + songPromise.name, url: video.url}
                } else {
                    message.reply("An Error happened while finding the video!");
                }
                
            } else if(playlistSpotify.test(args[0].toString())) {
                
                playlist = true;

                const video_playlist = async() => {
                    for(i = 0; i < songPromise.tracks.items.length; i++) {
                        spotifyTitle = songPromise.tracks.items[i].track.artists[0].name + "  -  " + songPromise.tracks.items[i].track.name

                            song = {title: spotifyTitle, url: "playlist"}

                        allsongs.push(song);
                    }
                }

                await video_playlist();

            } else {
                return message.channel.send("Spotify Artist Link are not Supported");
            }
        
        
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

        if(playlist === false) {
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
        } else {
            if(!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel, 
                    text_channel: message.channel, 
                    connection: null,
                    songs: []
                }
                for(i = 0; i < allsongs.length; i++) {
                    queue_constructor.songs.push(allsongs[i]);
                }

                const addedEmbed = new Discord.MessageEmbed()
                .setColor("#3f00ff")
                .setTitle("Added playlist to Queue")
                .setDescription(`**${allsongs.length}** tracks was added to the queue!`);

                message.channel.send(addedEmbed);
            
                try {
                    const connection = await voice_channel.join();
                    connection.voice.setSelfDeaf(true);
                    queue_constructor.connection = connection;
                    
                    queue.queueConstruct(message, queue_constructor);
                    video_player.player(message, message.guild, queue_constructor.songs[0], Discord);
                } catch(err) {
                    queue.deleteQueue(message);
                    message.channel.send('There was an error connecting to the server!');
                    throw err;
                }
                
            } else {
                 for(i = 0; i < allsongs.length; i++) {
                    server_queue.songs.push(allsongs[i]);
                }

                const addedEmbed = new Discord.MessageEmbed()
                .setColor("#3f00ff")
                .setTitle("Added playlist to Queue")
                .setDescription(`**${allsongs.length}** tracks was added to the queue!`);

                return message.channel.send(addedEmbed);
            }
        }
        
    },

}