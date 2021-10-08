const queue = new Map();

module.exports = {
    name : "queueList",
    description : "List of Queues",

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