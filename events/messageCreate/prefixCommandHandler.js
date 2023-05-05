const { testServer } = require('../../config.json');

module.exports = async (client, message) => {

    const prefix = '$';
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    const serverChecker = (message) => {
        const voice_channel = message.member.voice.channel;
        if(!voice_channel) {
            message.reply('You need to be in a channel to execute this command!');
            return false;
        } else {
            return true;
        }
    }

    switch(command) {

        case "ping" :
            client.commands.get('ping').execute(client, message);
            break;

        case "about":
        case "help": 
        {
            client.commands.get('help').execute(client, message, args);
            break;
        }
        
        case "play":
        case "p":
        case "queue":
        case "q":
        {
            if(serverChecker(message))
                client.commands.get('play').execute(client, message, args);
            break;
        }

        case "pause":
            if(serverChecker(message))
                client.commands.get('pause').execute(client, message, args);
            break;

        case "resume" :
            if(serverChecker(message))
                client.commands.get('resume').execute(client, message, args);
            break;

        case "stop" :
            if(serverChecker(message))
                client.commands.get('stop').execute(client, message, args);
            break;

        case "leave" :
            if(serverChecker(message))
                client.commands.get('leave').execute(client, message, args);
            break;

        case "list" :
        case "queuelist":
        {
            if(serverChecker(message))
                client.commands.get('queuelist').execute(client, message, args);
            break;
        }
        case "skip":
        case "next":
        case "n": 
        {   
            if(serverChecker(message))
                client.commands.get('next').execute(client, message, args);
            break;
        }

        case "shuffle" :
            client.commands.get('shuffle').execute(client, message, args);
            break;

        default:  
            message.reply("What you smoking? This command does not exist!");
    }

};