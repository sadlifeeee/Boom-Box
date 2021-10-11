const queue = new Map();

module.exports = {
    name : "queueList",
    description : "List of Queues",

    execute (message, Discord) {

        const server_queue = queue.get(message.guild.id);

        if(server_queue !== undefined) {
        
            const songLeng = server_queue.songs.length;
            
            const queueListEmbed = new Discord.MessageEmbed() 
                .setColor("#ffbdcc")
                .setTitle("List of Queues")
                .setDescription("Total in Queue: " + songLeng);
                
                let max = 0;

                if(songLeng > 5)
                    max = 5;
                else 
                    max = songLeng;

                for(let i = 0; i < max; i++) {
                    
                    let song = server_queue.songs[i].title;

                    if(song === undefined) {
                        queueListEmbed.addField("No More Songs" , "Try Queuing a song!");
                        break;
                    }
                    else {
                        queueListEmbed.addField("Song #" + (i+1) , song);
                    }
                }

            message.channel.send(queueListEmbed);

        } else {
            const queueListEmbed = new Discord.MessageEmbed() 
                .setColor("#ffbdcc")
                .setTitle("List of Queues")
                .setDescription("Total in Queue: 0")
                .addField("No More Songs" , "Try Queuing a song!");

            message.channel.send(queueListEmbed);
        }
        
        
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
    }

}