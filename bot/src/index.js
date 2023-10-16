import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/index.js';

/**
 @description
 
 There will be a specific channel where the bot will be listening for messages

 If there is no attachment, the bot will reply with a message

 One file per user
 */

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // The idea here is to only react to messages in a specific channel so we can send files there
    if (message.channelId !== config.channelId) {
        return;
    }

    if (message.attachments.size > 1) {
        await message.reply('Please only send one file at a time');
        return;
    }

    const attachment = message.attachments.first().url;
    if (!attachment) {
        await message.reply('Please send a file');
        return;
    }
});

client.login(config.TOKEN);