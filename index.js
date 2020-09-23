const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();


client.on('message', (message) => {
    // Check if the command has the from the bot neccessary prefix
    if (message.content.startsWith(config.commandPrefix)) {
        
        const strippedCommand = message.content.slice(config.commandPrefix.length);
        console.log(strippedCommand);
        
        // Check if the user wants to join a game
        if (strippedCommand.split(' ')[1] === 'add') {
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
        } else if (strippedCommand.split(' ')[1] === 'remove') {
            // Get the game name
            const gameName = strippedCommand.split(' ')[2].toLowerCase();
            
            const user = message.guild.member(message.author);
            
            const role = message.guild.roles.cache.find( role => role.name === gameName);
            if (role) {
                user.roles.remove(role);
                message.reply('You were removed from the game, the channels are not visible anymore :(');
            } else {
                message.reply('This game is not supported by the server yet!');
            }
        }
    }
});






client.login(config.clientCode);

