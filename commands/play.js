const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();
let connect = {};

module.exports = {
    name : "player" , 
    description : "plays music" , 
    async execute (message, args , bot , cmd) {

        const voiceChannel = message.member.voiceState.channelID;

        if(!voiceChannel)
            return bot.createMessage(message.channel.id, "You need to be in a channel to execute this command!");
        
        const channelID = message.channel.id;

        if(args.length === 0) 
            bot.createMessage(channelID, "You need to send the second argument!");

        if(cmd === "play" || cmd === "queue" || cmd === "q" || cmd === "p") {
            const serverQueue = queue.get(message.member.guild.id);
            let song = {};

            if(ytdl.validateURL(args)) {
                const song_info = await ytdl.getInfo(args);
                song = {title : song_info.videoDetails.title , url: song_info.videoDetails.video_url}
            } else {
                const videoFinder = async(query) => {
                    const videoResult = await ytSearch(query);
                    let result = null;

                    if(videoResult.videos.length > 1)
                        result = videoResult.videos[0];

                    return result;
                }

                const video = await videoFinder(args.join(' '));

                if(video) {
                    song = {title : video.title , url : video.url};
                } else {
                    bot.createMessage(channelID, 'No video found!');
                }
            }

            if(!serverQueue) {

                const queue_construct = {
                    voice_channel : voiceChannel,
                    text_channel : message.channel.id,
                    songs : []
                }

                queue.set(message.member.guild.id, queue_construct);
                queue_construct.songs.push(song);
                
                try { 
                    player(message, message.member.guild , queue_construct , bot , voiceChannel);
                } catch (err){
                    queue.delete(message.guild.id);
                    bot.createMessage(channelID, "There was an error in playing");
                    throw err;
                }
                
            } else {
                serverQueue.songs.push(song);
                return bot.createMessage(channelID, {
                    embed : {
                        title : "***Added to Queue***",
                        description :  `${song.title}` + "\n" + `${song.url}`,
                        color: 3447003,
                    }
                });
            }
        } else if(cmd === "skip" || cmd === "next" || cmd === "n") {
            skip_song(message, serverQueue);
        } else if(cmd === "stop") {
            stop_song(message, serverQueue);
        }
        
    }
}

const skip_song = (message, serverQueue) => {
    if(!serverQueue) 
        return bot.createMessage(message.channel.id , "There are no songs in the queue");

    
}


const player = async(message , guild, queue_construct , bot , voiceChannel) => {

    const channelID = message.channel.id;
    
    if(!song) {
        bot.leaveVoiceChannel(message.channel.id);
        queue.delete(guild.id);
        return;
    }
    

    bot.joinVoiceChannel(voiceChannel).catch((err) => {
        console.log(err);
        bot.createMessage(channelID , "Error Joining Voice Channel!! ERR: " + err.message);
    }).then((connection) => {
        if(connection.playing) {
            connection.stopPlaying();
        }

        
        const song = queue_construct.songs[0];

        const stream = ytdl(song.url , {filter: 'audioonly' , quality: 'highestaudio'});
        connection.play(stream, {seek: 0 , volume: 1});

        connection.once('end' , () => {
            queue_construct.songs.shift();
            player(message, guild, queue_construct, bot, voiceChannel);
        });

        console.log(song);

        await bot.createMessage(channelID, {
            embed : {
                title : "***Currently Playing***",
                description :  `${song.title}` + "\n" + `${song.url}`,
                color: 3066993,
            }
        });
    });
}