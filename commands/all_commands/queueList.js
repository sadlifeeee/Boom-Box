let queue = new Map();
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name : "queuelist",
    description : "List of Queues / Songs Played",

    callback: (client, interaction) => {
        interaction.reply(`Use the Prefix $`);
    },

    execute (client, message , args) {

        const queueDisTube = client.DisTube.getQueue(message)

        if (!queueDisTube) return message.channel.send(`There is nothing in queue right now`)

        const songLeng = queueDisTube.songs.length;

        const queueListEmbed = new EmbedBuilder() 
            .setColor("#ffbdcc")
            .setTitle("List of Queues")
            .setDescription("Total in Queue: " + songLeng);
        
            let max = 0;

            if(songLeng > 6)
                max = 6;
            else 
                max = songLeng;

            for(let i = 0; i < max; i++) {
                    
                let song = queueDisTube.songs[i].name;
                
                if(song === undefined) {
                    queueListEmbed.addFields({name: `No More Songs`, value:"Try Queuing a song!"});
                    break;
                }
                else {
                    if(i === 0)
                        queueListEmbed.addFields({name: `Now Playing:`, value: `${song}`});
                    else
                        queueListEmbed.addFields({name: `Queued Song # (${i})`, value: `${song}`});
                    
                }
                
            }

            message.channel.send({embeds: [queueListEmbed]});
    },

    queueConstruct(message, queue_constructor) {
        queue.set(message.guild.id, queue_constructor);
    },


    getQueue() {
        return queue;
    },

    removeQueueID(id) {
        queue.delete(id);
    },

    deleteQueue(message) {
        queue.delete(message.guild.id);
    },

    shiftSong(id, song) {
        console.log(queue.get(id))
        queue.get(id).songs.shift();
    }


}