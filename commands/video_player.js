const queue = require('./queueList.js');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ytdlDisc = require('discord-ytdl-core');

module.exports = {
    name: 'videoPlayer',
    description: "Player",

    async player(message, guild, song, Discord) {

        let timeoutID;
        const song_queue = queue.getQueue().get(guild.id);
        const voice_channel = message.member.voice.channel;

        const connection = await voice_channel.join();
        connection.voice.setSelfDeaf(true);
        song_queue.connection = connection;


        const videoPlayer = async(guild, song) => {
           
            const connection = await voice_channel.join();
            connection.voice.setSelfDeaf(true);
            song_queue.connection = connection;
            
            const video_finder = async(query) => {
                const videoResult = await ytSearch(query);
                let result = null;

                if(videoResult.videos.length > 1)
                    result = videoResult.videos[0];
                
                return result.url;
            }

            clearTimeout(timeoutID)
            timeoutID = undefined;
            
            if(!song) {
                queue.removeQueueID(guild.id);
                return;
            } else if(song.url === "playlist") {
                song.url = await video_finder(song.title);
            }

            let stream = ytdlDisc(song.url, {
                filter: "audioonly",
                opusEncoded: true,
            });

            song_queue.connection.play(stream, {seek: 0, volume: 0.45, type: "opus"})
            .on('finish' , () => {
                if(song_queue.songs.length !== 1) {
                    song_queue.songs.shift();
                    videoPlayer(guild, song_queue.songs[0]);
                } else {
                    queue.removeQueueID(guild.id);
                    timeoutID = setTimeout(() => {voice_channel.leave()}, 10000) // Dies in 3 Minute for heroku not to kill the connection and cause a bug to happen
                }
            });
            
            const playingEmbed = new Discord.MessageEmbed() 
            .setColor("#8deeee")
            .setTitle("Now Playing")
            .setDescription(`**${song.title}**`);

            await song_queue.text_channel.send(playingEmbed);
        }

        videoPlayer(guild, song);
       
    },

}