const Discord = require('discord.js');
const dotenv = require("dotenv").config();
const fs = require('fs');
const client = new Discord.Client({
    restTimeOffset: 0
});

client.commands = new Discord.Collection();

client.user.setPresence({
    activity: {
        name: `$help for commands`
    }, status: 'idle'
})

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

        case "play":
        case "p":
        case "queue":
        case "q":
        {
            client.commands.get('play').execute(message, args, command, client, Discord);
            break;
        }

        case "skip":
        case "next":
        case "n": 
        {
            client.commands.get('skip').execute(message, Discord);
            break;
        }

        case "ping" :
            client.commands.get('ping').execute(message, args);
            break;

        case "leave" :
            client.commands.get('leave').execute(message, Discord);
            break;

        case "about":
        case "help": 
        {
            client.commands.get('about').execute(message, Discord);
            break;
        }

        case "list" :
            client.commands.get('queueList').execute(message, Discord);
            break;

        default: 
            message.reply("Command does not Exist!");
    }


});


client.login(process.env.BOT_TOKEN);