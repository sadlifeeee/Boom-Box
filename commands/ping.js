module.exports = {
    name : "ping",
    description: "Ping Bot!",

    execute(message, args) {
        message.reply('Pong!');
    }
}