module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'test',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
      interaction.reply(`test`);
    },
};