const { testServer } = require('../../config.json');

module.exports = (client, message) => {

    const prefix = '$';
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    switch(command) {

        case "ping" :
            client.commands.get('ping').execute(client, message);
            break;

        case "about":
        case "help": 
            client.commands.get('help').execute(client, message);
            break;

        default:  
            message.reply("Command does not Exist!");
    }

};