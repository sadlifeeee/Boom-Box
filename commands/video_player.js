const queue = require('./queueList.js');
const ytdl = require('ytdl-core');
const play = require('./play.js');

module.exports = {
    name: 'Video Player',
    description: "Player",

    async player(guild, song) {

        const videoPlayer = async(guild, song) => {
            const song_queue = queue.getQueue().get(guild.id);

            if(!song) {
                queue.removeQueueID(guild.id);
                return;
            }

            const stream = ytdl(song.url, {filter: 'audioonly'});
            song_queue.connection.play(stream, {seek: 0, volume: 0.5})
            .on('finish' , () => {
                song_queue.songs.shift();
                videoPlayer(guild, song_queue.songs[0]);
            });

            await song_queue.text_channel.send(` Now Playing! **${song.title}**`);
        }

        videoPlayer(guild, song);
       
    },

}