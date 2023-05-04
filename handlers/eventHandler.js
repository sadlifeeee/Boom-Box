const getAllFiles = require('../utils/getAllFiles');
const path = require('path');
const { Collection } = require('discord.js');
const fs = require('fs');
const { DisTube } = require("distube");

module.exports = (client) => {

    client.DisTube = new DisTube(client, {
        leaveOnStop: false,
        leaveOnEmpty: true,
        emptyCooldown: 30,
        leaveOnFinish: true,
        nsfw: true,
    });

    const eventFolders = getAllFiles(path.join(__dirname, '..', 'events') , true);

    for (const eventFolder of eventFolders) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a, b) => a > b);

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);

                await eventFunction(client, arg);
            }
        });
    }
};