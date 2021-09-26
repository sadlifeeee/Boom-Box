const Eris = require("eris");
const dotenv = require("dotenv").config();
const fs = require('fs');

const bot = new Eris(process.env.BOT_TOKEN);
let prefix = "$";

bot.commands = new Eris.Collection();

fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
.forEach(file => {
    const command = require(`./commands/${file}`);
    console.log(`Command ${command.name} loaded`);
    bot.commands.set(command.name , command);
});


bot.on("ready" , () => {
    console.log("Ready!");
    bot.editStatus("idle" , {name: "$help for commands" , type: 0})
});

bot.on("error" , (err) => {
    console.error(err);
});

bot.on("messageCreate" , async message => {

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(message.author.bot || !message.channel.guild) return;

    if(!message.content.startsWith(prefix)) return;

    if(command === "ping") {
        bot.commands.get('ping').execute(message , bot);
    } else if(command === "help") {
        bot.commands.get('help').execute(message, bot);
    } else if(command === "play" || command === "p" || command === "queue" || command === "q") {
        bot.commands.get('player').execute(message, args, bot , command);
    } else if(command === "leave") {
        bot.commands.get('leave').execute(message, bot);
    } else if(command === "skip" || command === "next" || command === "n") {
        bot.commands.get('player').execute(message, args, bot, command);
    }

});

bot.connect();
