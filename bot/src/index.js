import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/index.js';
import { db } from './config/database.js';

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


client.on('ready', async () => {
    db.connection();
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.channelId !== config.channelId) {
        return;
    }

    const attachment = message.attachments.first()?.url;
    if (!attachment) {
        await message.reply('Please send a file');
        return;
    }

    if (message.attachments.size > 1) {
        await message.reply('Please only send one file at a time');
        return;
    }

    if (!message.attachments.first().contentType !== config.allowedFormarts) {
        await message.reply('Please send a valid file');
        return;
    }

    const query = await db
        .insertInto('books')
        .values({
            name: message.attachments.first().name,
            url: message.attachments.first().url,
            description: message.content,
        })
        .execute()

    if (!query) {
        await message.reply('Error saving file');
        return;
    }

    await message.reply('File saved');
    return;
});

client.login(config.TOKEN);