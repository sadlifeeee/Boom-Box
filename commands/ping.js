module.exports = {
    name: 'ping',
    description: "Ping Command",
    execute(message , bot) {
        bot.createMessage(message.channel.id ,"Pong!");
    }
}