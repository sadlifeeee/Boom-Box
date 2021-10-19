const queue = require('./queueList.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'videoPlayer',
    description: "Player",

    async player(message, guild, song, Discord) {
        
        let timeoutID;
        const song_queue = queue.getQueue().get(guild.id);
        const connection = song_queue.connection;
        const voice_channel = message.member.voice.channel;

        const videoPlayer = async(guild, song) => {

            song_queue.connection = connection;

            clearTimeout(timeoutID)
            timeoutID = undefined;
            
            if(!song) {
                queue.removeQueueID(guild.id);
                return;
            }

            const stream = ytdl(song.url, {filter: 'audioonly' , type: 'opus'});
            song_queue.connection.play(stream, {seek: 0, volume: 0.45})
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