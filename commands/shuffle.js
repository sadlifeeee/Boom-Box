const queue = require('./queueList.js');

module.exports = {
    name : "shuffle",
    description: "Shuffles the music in queue",

    execute(message , Discord) {
        const voice_channel = message.member.voice.channel;
        
        if(!voice_channel) 
            return message.reply('You need to be in a channel to execute this command!');

        const shuffleEmbed = new Discord.MessageEmbed() 
            .setColor("#c6e2ff")
            .setTitle("Shuffle")
            .setDescription(`Shuffled Queue!`);

        message.channel.send(shuffleEmbed);

        const server_queue = queue.getQueue().get(message.guild.id);
        const length = server_queue.songs.length;
        let songs = server_queue.songs; 
        let currentSong = server_queue.songs[0];

        let shuffledSongs =  songs
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        server_queue.songs = [];

        for(i = 0; i < length; i++) {
            if(shuffledSongs[i].title === currentSong.title) {
                shuffledSongs.splice(i , 1);
                shuffledSongs.unshift(currentSong);
                server_queue.songs = shuffledSongs;
                break;
            }
        }

        // There is probably a better way to do this but yeah
        

    }
}