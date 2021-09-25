const Eris = require("eris");
const dotenv = require("dotenv").config();
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name : "play" , 
    description : "plays music" , 
    async execute (message, args , bot) {

        const voiceChannel = message.member.voiceState.channelID;

        if(!voiceChannel)
            return bot.createMessage(message.channel.id, "You need to be in a channel to execute this command!");
        
        const channelID = message.channel.id;

        if(args.length === 0) 
            bot.createMessage(channelID, "You need to send the second argument!");

        const videoFinder = async(query) => {
            const videoResult = await ytSearch(query);
            let result = null;
            
            if(videoResult.videos.length > 1) 
                result = videoResult.videos[0];
            
            return result;
        }

        const video = await videoFinder(args.join(' '));

        if(video) {

            bot.joinVoiceChannel(voiceChannel).catch((err) => {
                console.log(err);
                bot.createMessage(channelID , "Error Joining Voice Channel!! ERR: " + err.message);
            }).then((connection) => {
                if(connection.playing) {
                    connection.stopPlaying();
                }

                const stream = ytdl(video.url , {filter: 'audioonly' , quality: 'highestaudio'});
                connection.play(stream, {seek: 0 , volume: 1});

                connection.once('end' , () => {
                    bot.leaveVoiceChannel(channelID);
                });

                bot.createMessage(channelID, `Now Playing ***${video.title}***`)
            });

        } else {
            bot.createMessage(channelID, 'No video found!');
        }

    }
}