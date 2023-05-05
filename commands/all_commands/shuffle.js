module.exports = {
    name: 'shuffle',
    description: "shuffles the queue",
    inVoiceChannel: true,

    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute: async (client, message , args) => {
        const queue = client.distube.getQueue(message)

        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)

        queue.shuffle()

        const addedEmbed = new EmbedBuilder()
            .setColor("#51F020")
            .setTitle("Shuffled!")
            .setDescription(`**Queue was shuffled**`);

        message.channel.send({ embeds: [addedEmbed]})
    }
}