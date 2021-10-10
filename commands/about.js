module.exports = {
    name : "about",
    description : "list of commands and about the bot",

    execute (message, Discord) {
        const aboutEmbed = new Discord.MessageEmbed() 
            .setColor("#da70d6")
            .setTitle("About This Bot & List of Commands")
            .setDescription(`This Bot is for personal use **ONLY**\n\n**ONLY YOUTUBE WORKS**,Support for Spotify coming soon (pag sinipag hehe)\n\nFound a bug? just chat me 😊👍\n\n**LIST OF COMMANDS**`)
            .addFields(
                {name : '**play/queue**' ,value: "Plays the music or adds to the queue"},
                {name : '**skip/next**'  ,value: "Skips the current song and plays the next song"},
                {name : '**about/help**'  ,value: "Displays the list of commands and about this Bot"},
                {name : '**stop**'  ,value: "Stops the current song and resets the queue"},
                {name : '**list**'  ,value: "List of songs in the queue"},
                {name : '**ping**'  ,value: "Pings the Bot"},
                {name : '**leave**'  ,value: "The Bot leaves the voice channel"},
            )   
            .setFooter("Developed by Jerickson Lee")

        message.channel.send(aboutEmbed);
    }
}