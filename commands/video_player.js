const queue = require('./queueList.js');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'videoPlayer',
    description: "Player",

    async player(guild, song, Discord) {

        const videoPlayer = async(guild, song) => {
            const song_queue = queue.getQueue().get(guild.id);

            if(!song) {
                queue.removeQueueID(guild.id);
                return;
            }

            const stream = ytdl(song.url, {filter: 'audioonly' , quality: 'highestaudio' , highWaterMark: 1<<25 , type: 'opus'});
            song_queue.connection.play(stream, {seek: 0, volume: 0.5})
            .on('finish' , () => {
                song_queue.songs.shift();
                videoPlayer(guild, song_queue.songs[0]);
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