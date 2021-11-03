module.exports = {
    name : "about",
    description : "list of commands and about the bot",

    execute (message, Discord) {
        const aboutEmbed = new Discord.MessageEmbed() 
            .setColor("#da70d6")
            .setTitle("About This Bot & List of Commands")
            .setDescription(`This Bot is for personal use **ONLY**\n\n**Youtube and Spotify is supported**\n\nFound a bug? just chat me 😊👍\n**KNOWN ISSUES**\n\n**1.**  Music Stops while playing - This issue happens because of a library used in code which I cannot fix, the only possible fix for this is to change many things, will do this if I have the time\n**What to do if this happens?**\nTry $leave then play the song again DO NOT use $stop as this will kill the bot and might take a while to reboot\n\n**2.** Spotify may play the wrong music (low chance of happening but does happen) - still finding a way to fix this\n\n**LIST OF COMMANDS**`)
            .addFields(
                {name : '**play/queue**' ,value: "Plays the music or adds to the queue"},
                {name : '**skip/next**'  ,value: "Skips the current song and plays the next song"},
                {name : '**about/help**'  ,value: "Displays the list of commands and about this Bot"},
                {name : '**stop**'  ,value: "Stops the current song and resets the queue"},
                {name : '**list**'  ,value: "List of songs in the queue"},
                {name : '**shuffle**'  ,value: "Shuffles the queue"},
                {name : '**pause**'  ,value: "Pauses the music"},
                {name : '**resume**'  ,value: "Resumes the music"},
                {name : '**ping**'  ,value: "Pings the Bot"},
                {name : '**leave**'  ,value: "The Bot leaves the voice channel"},
            )   
            .setFooter("Developed by Jerickson Lee 👍");

        message.channel.send(aboutEmbed);
    }
}