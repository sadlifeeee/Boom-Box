const { EmbedBuilder } = require('discord.js');

const generateAboutEmbed = () => {
    const aboutEmbed = new EmbedBuilder() 
        .setColor("#da70d6")
        .setTitle("About This Bot & List of Commands")
        .setDescription(`This Bot is for personal use **ONLY**\n\n**Youtube and Spotify is supported**\n\nFound a bug? just chat me 😊👍\n\n**LIST OF COMMANDS**`)
        .addFields (
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
        .setFooter({text: "Developed by Jerickson Lee 👍"});
                
    return aboutEmbed
}
 
module.exports = {
    name: 'help',
    aliases: ['about'],
    description: 'Information About This Bot',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,
    
    callback: (client, interaction) => {
        const aboutEmbed = generateAboutEmbed();
        interaction.reply({ embeds: [aboutEmbed]});
    },
  
    execute: (client, message, args) => {
        const aboutEmbed = generateAboutEmbed();
        message.channel.send({ embeds: [aboutEmbed] });
    },

  
    
};