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
            const gameName = strippedCommand.split(' ')[2].toLowerCase();

            if (user.hasPermission('ADMINISTRATOR')) {
                message.guild.roles.create({
                    data: {
                        name: strippedCommand.split(' ')[2].toLowerCase()
                    }
                }).then(() => {
                    const everyoneRole = message.guild.roles.cache.find(role => role.name === 'everyone');
                    const role = message.guild.roles.cache.find(role => role.name === gameName);
                    message.guild.channels.create(strippedCommand.split(' ')[2].toLowerCase(), {
                        type: 'voice',
                        parent: '757603920850845797',
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone.id,
                                deny: [
                                    'VIEW_CHANNEL',
                                    'CONNECT',
                                    'SPEAK',
                                    'STREAM'
                                ]
                            },
                            {
                                id: role.id,
                                allow: [
                                    'VIEW_CHANNEL',
                                    'CONNECT',
                                    'SPEAK',
                                    'STREAM'
                                ]
                            }
                        ]
                    }).then(()=> {
                        console.log('voice channel created')
                    });

                    message.guild.channels.create(gameName, {
                        type: 'text',
                        parent: '757603920850845797',
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone.id,
                                deny: [
                                    'VIEW_CHANNEL', 
                                    'SEND_MESSAGES',
                                    'READ_MESSAGE_HISTORY'
                                ]
                            },
                            {
                                id: role.id,
                                allow: [
                                    'VIEW_CHANNEL',
                                    'CONNECT',
                                    'SEND_MESSAGES',
                                    'READ_MESSAGE_HISTORY'
                                ]
                            }
                        ]
                    });
                }).catch(err => {
                    console.log(err)
                });

                message.reply(`@everyone New game role: ${gameName} was added to the server!`)   
            } else {
                message.reply('You don\'t have the permission to create new game roles! Contact the mods.')
            }
        } else if (strippedCommand.split(' ')[1] === 'remove') {
            const user = message.guild.member(message.author);
            const gameName = strippedCommand.split(' ')[2].toLowerCase();
            const voiceChannel = message.guild.channels.cache.find(channel => channel.name === gameName && channel.type === 'voice');
            const textChannel = message.guild.channels.cache.find(channel => channel.name === gameName && channel.type === 'text');
            if (user.hasPermission('ADMINISTRATOR')) {
                const roleName = strippedCommand.split(' ')[2].toLowerCase();
                const roleToDelete = message.guild.roles.cache.find(role => role.name === roleName);
                if (roleToDelete) {
                    roleToDelete.delete();
                    textChannel.delete();
                    voiceChannel.delete();
                    message.reply(`@everyone Game: ${roleName} was successfully removed!`);
                } else {
                    message.reply(`Error while deleting the role: ${roleName}! Contact the developer`);
                }
            } else {
                message.reply('You don\'t have the permission to create new game roles! Contact the mods.')
            }
        } else if (strippedCommand.split(' ')[1] === 'list') {
            let voiceChannels = [];
            voiceChannels = message.guild.channels.cache.filter(channel => channel.parentID == '757603920850845797' && channel.type == 'text');
            const embedInfo = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Game List')
                .setAuthor('Game Roller', 'https://cdn.discordapp.com/attachments/714585796287660103/760490581314633748/a.jpg')
                .setDescription('Available Games');

            voiceChannels.forEach(element => {
                embedInfo.addField('Game', element.name, false);
            });
            message.reply(embedInfo);
        }
    }
});






client.login(config.clientCode);

