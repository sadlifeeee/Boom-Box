module.exports = {
    name : "ping",
    description: "Shows the ping of the bot!",

    execute(message, args) {
        message.reply('Pong!');
    }
}