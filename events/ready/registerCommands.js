const { testServer } = require('../../config.json');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {

    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client);

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if(existingCommand) {
                if(localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted Command: ${name}`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id ,{
                        description, options
                    });

                    console.log(`Edited Command: ${name}`);
                }

            } else {
                if(localCommand.deleted) {
                    console.log(`Skipping Register Command ${name} as it is set to delete`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                })

                console.log(`Registered Command : ${name}`);
            }
        }

    } catch(error) {
        console.log(`There was an error :${error}`)
    }
};