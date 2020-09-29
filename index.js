const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();


client.on('message', (message) => {
    // Check if the command has the from the bot neccessary prefix
    if (message.content.startsWith(config.commandPrefix)) {
        
        const strippedCommand = message.content.slice(config.commandPrefix.length);
        
        // Check if the user wants to join a game
        if (strippedCommand.split(' ')[1] === 'join') {
            // Get the game name
            const gameName = strippedCommand.split(' ')[2].toLowerCase();

            const user = message.guild.member(message.author);
            
            const role = message.guild.roles.cache.find( role => role.name === gameName);
            if (role) {
                user.roles.add(role);
                message.reply('You were added to the game, you can now use the respective game channels :)');
            } else {
                message.reply('This game is not supported by the server yet!');
            }
        } else if (strippedCommand.split(' ')[1] === 'leave') {
            // Get the game name
            const gameName = strippedCommand.split(' ')[2].toLowerCase();
            
            const user = message.guild.member(message.author);
            
            const role = message.guild.roles.cache.find( role => role.name === gameName);
            if (role) {
                user.roles.remove(role);
                message.reply('You were removed from the game, the channels are not visible anymore :(');
            } else {
                message.reply('This game is not supported by the server yet! Contact the mods.');
            }
        } else if (strippedCommand.split(' ')[1] === 'add') {
            const user = message.guild.member(message.author);

            if (user.hasPermission('ADMINISTRATOR')) {
                message.guild.roles.create({
                    data: {
                        name: strippedCommand.split(' ')[2].toLowerCase()
                    }
                });
                message.reply(`New game role: ${strippedCommand.split(' ')[2].toLowerCase()} was added to the server!`)   
            } else {
                message.reply('You don\'t have the permission to create new game roles! Contact the mods.')
            }
        } else if (strippedCommand.split(' ')[1] === 'remove') {
            const user = message.guild.member(message.author);

            if (user.hasPermission('ADMINISTRATOR')) {
                const roleName = strippedCommand.split(' ')[2].toLowerCase();
                const roleToDelete = message.guild.roles.cache.find(role => role.name === roleName);

                if (roleToDelete.delete()) {
                    message.reply(`Role: ${roleName} was successfully removed!`);
                } else {
                    message.reply(`Error while deleting the role: ${roleName}! Contact the developer`);
                }
            } else {
                message.reply('You don\'t have the permission to create new game roles! Contact the mods.')
            }
        }
    }
});






client.login(config.clientCode);

