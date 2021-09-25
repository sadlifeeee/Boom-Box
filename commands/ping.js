module.exports = {
    name: 'ping',
    description: "Ping Command",
    execute(message) {
        message.channel.createMessage("Pong!");
    }
}