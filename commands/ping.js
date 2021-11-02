module.exports = {
    name : "ping",
    description: "Ping Bot!",

    execute(message, args) {
        message.channel.send(`Pong! 🏓Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
    }
}