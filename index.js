const { Collection, Client, IntentsBitField } = require('discord.js');
const dotenv = require("dotenv").config();
const eventHandler = require('./handlers/eventHandler');
const fs = require('fs');

const client = new Client({
    restTimeOffset: 5,
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});

client.commands = new Collection();

fs.readdirSync('./commands/all_commands').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/all_commands/${file}`);
    client.commands.set(command.name , command);
    console.log(`Command ${command.name} loaded`);
});

eventHandler(client);


client.login(process.env.BOT_TOKEN);