const { ActivityType } = require('discord.js');

module.exports = (client) => {
    client.user.setPresence({
        activities: [{ name: `$help`, type: ActivityType.Listening}],
        status: 'online',
    });
    
    console.log(`${client.user.tag} is online`);
};