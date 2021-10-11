const Discord = require('discord.js');
const dotenv = require("dotenv").config();
const fs = require('fs');
const express = require('express');

const app = express();

const client = new Discord.Client({
    restTimeOffset: 0
});

client.commands = new Discord.Collection();

fs.readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {

    const command = require(`./commands/${file}`);
    client.commands.set(command.name , command);

    console.log(`Command ${command.name} loaded`);
});

// To Keep Bot Up 
app.get('/' , function(req, res) {
    console.log("Bot is Alive!!!");
    res.status(200);
    return res.send("Bot is alive");
});

client.once('ready' , async () => {

    client.user.setPresence({
        activity: {
            name: `$help for commands`
        }, status: 'online'
    })

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

        case "stop" :
            client.commands.get('stop').execute(message, Discord);
            break;
        
        case "resume" :
            client.commands.get('resume').execute(message, Discord);
            break;
            
        case "pause":
            client.commands.get('pause').execute(message, Discord);
            break;

        case "pick":
            client.commands.get('pick').execute(message , args , command , client , Discord);
            break;

        default:  
            message.reply("Command does not Exist!");
    }


});

// Bounding Server (Essentially checking if the server is listening (working))
app.listen(5000, "0.0.0.0", function () {
    console.log('Server Running at:');
    console.log('http://' + "0.0.0.0" + ':' + 5000);
});

client.login(process.env.BOT_TOKEN);