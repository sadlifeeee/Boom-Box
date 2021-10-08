const Discord = require('discord.js');
const dotenv = require("dotenv").config();
const fs = require('fs');
const client = new Discord.Client({
    restTimeOffset: 0
});

client.commands = new Discord.Collection();


fs.readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name , command);

    console.log(`Command ${command.name} loaded`);
});


client.once('ready' , async () => {
    console.log('Bot is running!');
});

const prefix = "$";

client.on('message' , message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command) {
        case "play" :
            client.commands.get('play').execute(message, args, command, client, Discord);
            break;
        
        case "skip" :
            client.commands.get('skip').execute(message, args);
            break;

        case "ping" :
            client.commands.get('ping').execute(message, args);
            break;

        case "leave" :
            client.commands.get('leave').execute(message);
            break;

        default: 
            message.reply("Command does not Exist!");
    }


});


client.login(process.env.BOT_TOKEN);