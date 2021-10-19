module.exports = {
    name : "about",
    description : "list of commands and about the bot",

    execute (message, Discord) {
        const aboutEmbed = new Discord.MessageEmbed() 
            .setColor("#da70d6")
            .setTitle("About This Bot & List of Commands")
            .setDescription(`This Bot is for personal use **ONLY**\n\n**Only Works for Spotify and Youtube**\nNote that loading spotify playlist may take a while and is prone to errors but still **WORKS**\n\nFound a bug? just chat me 😊👍\n**KNOWN ISSUES**\nMusic Stops while playing - This issue happens because the bot is being hosted in a free server as such there is no way to fix this other than hosting it in a better server\n**What to do if this happens?**\nTry $leave then play the song again DO NOT use $stop as this will kill the bot and might take a while to reboot\n\n**LIST OF COMMANDS**`)
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