const { DisTube } = require("distube");
const { EmbedBuilder } = require("discord.js");
const queue = require('./queueList');
const ytsr = require('ytsr');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const fetch = require('isomorphic-unfetch')
const { getData, getPreview, getTracks } = require('spotify-url-info')(fetch)


module.exports = {
    name: 'play',
    description: 'plays a music',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,


    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute: async (client, message, args) => {

        let server_queue = queue.getQueue().get(message.guild.id);

        if(args.join('').trim() === '') {
            return message.reply("What are you gonna play? Nothing?")
        }

        const playMusic = async (client, message, server_queue) => {

            await client.DisTube.play(message.member.voice.channel , server_queue.songs.shift(), {
                member: message.member,
                textChannel:message.channel,
                message
            }).catch(err => {
                const addedEmbed = new EmbedBuilder()
                    .setColor("#FF0000")
                    .setTitle("Not Found")
                    .setDescription(`**URL / Song cannot be found**`);

                message.channel.send({ embeds: [addedEmbed]})
            });

        };  

        // START

        try {

            let spotifyLink = /((open|play)\.spotify\.com\/)/;

            // Means Queue does not exist (new play)
            if(!server_queue) {

                const queue_constructor = {
                    voice_channel: message.member.voice.channel, 
                    text_channel: message.channel, 
                    connection: null,
                    songs: []
                }
                
                

                // Youtube Playlist Checker
                if(ytpl.validateID(args.toString())){

                    const video_playlist = async(query) => {

                        const playlistResult = await ytpl(query, { limit: Infinity });
                        
                        for(i = 0; i < playlistResult.items.length; i++) {
                            queue_constructor.songs.push(playlistResult.items[i].url);
                        }
                        
                        return playlistResult.items.length;
                    }

                    const songLength = await video_playlist(args.toString())

                    const addedEmbed = new EmbedBuilder()
                        .setColor("#3f00ff")
                        .setTitle("Added to Queue")
                        .setDescription(`**${songLength}** music was added to the queue!`);

                    message.channel.send({embeds: [addedEmbed]});

                
                // Youtube + Youtube Music URL Checker (NOT PLAYLIST)
                } else if(ytdl.validateURL(args.toString())) {

                    const song_info = await ytdl.getInfo(args.toString());
                    queue_constructor.songs.push(song_info.videoDetails.video_url)
            
                // Spotify Link Checker
                }  else if(spotifyLink.test(args.toString())){

                    const video_finder = async(query) => {
                        let song = await ytsr(query , {limit: 1});

                        if(song === undefined) 
                            return message.reply("Unavailable Song");

                        let songTitle = song.items[0].title;
                        
                        return songTitle;
                    }

                    let track = /((open|play)\.spotify\.com\/track\/)/;
                    
                    let playlistSpotify = /((open|play)\.spotify\.com\/playlist\/)/;

                    const spotifyMusicData = await getData(args.toString())

                    let spotifyTitle = "";

                    // Track Spotify
                    if(track.test(args.toString())) {

                        spotifyTitle = spotifyMusicData.name + " " + spotifyMusicData.artists[0].name
                        
                        const video = await video_finder(spotifyTitle);

                        if(video) {
                            queue_constructor.songs.push(spotifyMusicData.artists[0].name + "  -  " + spotifyMusicData.name)
                        } else {
                            message.reply("An Error happened while finding the video!");
                        }
                    
                    // Playlist Spotify
                    } else if(playlistSpotify.test(args.toString())) {

                        const video_playlist = async() => {
                            for(i = 0; i < spotifyMusicData.trackList.length; i++) {
                                queue_constructor.songs.push(spotifyMusicData.trackList[i].title + "  -  " + spotifyMusicData.trackList[i].subtitle)
                            }
                        }

                        await video_playlist();
                        
                        const addedEmbed = new EmbedBuilder()
                            .setColor("#3f00ff")
                            .setTitle("Added to Queue")
                            .setDescription(`**${spotifyMusicData.trackList.length}** music was added to the queue!`);

                        message.channel.send({embeds: [addedEmbed]});

                    } else {
                        return message.channel.send("Spotify Artist Link are not Supported");
                    }
                
                // Not Youtube Link nor Spotify Just Search YT
                } else {
                    let song = await ytsr(args.join(' ') , {limit: 1});
                    let songTitle = song.items[0].title;
                    
                    if(songTitle === undefined) {
                        return message.reply("No songs found!");
                    }

                    queue_constructor.songs.push(songTitle);
                }

                queue.queueConstruct(message, queue_constructor);
                server_queue = queue.getQueue().get(message.guild.id);
                await playMusic(client, message, server_queue);
                
            } else {

                // QUEUE ALREADY EXIST


                // Youtube Playlist Checker
                if(ytpl.validateID(args.toString())){

                    const video_playlist = async(query) => {

                        const playlistResult = await ytpl(query, { limit: Infinity });
                        
                        for(i = 0; i < playlistResult.items.length; i++) {
                            server_queue.songs.push(playlistResult.items[i].url);
                        }
                    
                        return playlistResult.items.length;
                    }

                    const songLength = await video_playlist(args.toString())

                    const addedEmbed = new EmbedBuilder()
                        .setColor("#3f00ff")
                        .setTitle("Added to Queue")
                        .setDescription(`**${songLength}** music was added to the queue!`);

                    message.channel.send({embeds: [addedEmbed]});

                
                // Youtube + Youtube Music URL Checker (NOT PLAYLIST)
                } else if(ytdl.validateURL(args.toString())) {

                    const song_info = await ytdl.getInfo(args.toString());
                    server_queue.songs.push(song_info.videoDetails.url)
                    
                    const addedEmbed = new EmbedBuilder()
                        .setColor("#3f00ff")
                        .setTitle("Added to Queue")
                        .setDescription(`**${song_info.videoDetails.title}** was added to the queue!`);

                    message.channel.send({embeds: [addedEmbed]});

                // Spotify Link Checker
                }  else if(spotifyLink.test(args.toString())){

                    const video_finder = async(query) => {
                        let song = await ytsr(query , {limit: 1});

                        if(song === undefined) 
                            return message.reply("Unavailable Song");

                        let songTitle = song.items[0].title;
                        
                        return songTitle;
                    }

                    let track = /((open|play)\.spotify\.com\/track\/)/;
                    
                    let playlistSpotify = /((open|play)\.spotify\.com\/playlist\/)/;

                    const spotifyMusicData = await getData(args.toString())

                    let spotifyTitle = "";

                    // Track Spotify
                    if(track.test(args.toString())) {

                        spotifyTitle = spotifyMusicData.name + " " + spotifyMusicData.artists[0].name
                        
                        const video = await video_finder(spotifyTitle);

                        if(video) {
                            server_queue.songs.push(spotifyMusicData.artists[0].name + "  -  " + spotifyMusicData.name)
                        } else {
                            message.reply("An Error happened while finding the video!");
                        }

                        const addedEmbed = new EmbedBuilder()
                            .setColor("#3f00ff")
                            .setTitle("Added to Queue")
                            .setDescription(`**${spotifyMusicData.artists[0].name + "  -  " + spotifyMusicData.name}** was added to the queue!`);

                        message.channel.send({embeds: [addedEmbed]});
                    
                    // Playlist Spotify
                    } else if(playlistSpotify.test(args.toString())) {

                        const video_playlist = async() => {
                            for(i = 0; i < spotifyMusicData.trackList.length; i++) {
                                server_queue.songs.push(spotifyMusicData.trackList[i].title + "  -  " + spotifyMusicData.trackList[i].subtitle)
                            }
                        }

                        await video_playlist();

                        const addedEmbed = new EmbedBuilder()
                            .setColor("#3f00ff")
                            .setTitle("Added to Queue")
                            .setDescription(`**${spotifyMusicData.trackList.length}** music was added to the queue!`);

                        message.channel.send({embeds: [addedEmbed]});

                    } else {
                        return message.channel.send("Spotify Artist Link are not Supported");
                    }
                
                // Not Youtube Link nor Spotify Just Search YT
                } else {
                    let song = await ytsr(args.join(' ') , {limit: 1});
                    let songTitle = song.items[0].title;
                    
                    if(songTitle === undefined) {
                        return message.reply("No songs found!");
                    }

                    server_queue.songs.push(songTitle);

                    const addedEmbed = new EmbedBuilder()
                        .setColor("#3f00ff")
                        .setTitle("Added to Queue")
                        .setDescription(`**${songTitle}** was added to the queue!`);

                    message.channel.send({embeds: [addedEmbed]});
                }

                await playMusic(client, message, server_queue);

            }   

        } catch(err) {
            message.channel.send(`An error occured to the bot while trying to queue, report this to the developer! \n${err}`)
        }
        
    }
};