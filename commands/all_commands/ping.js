module.exports = {
  name: 'ping',
  description: 'Pong! (Check Bot Latency)',
  // devOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    interaction.reply(`Pong! Bot Latency: ${client.ws.ping}`);
  },

  execute: (client, message, args) => {
    message.reply(`Pong! Bot Latency: ${client.ws.ping}`);
  }
};