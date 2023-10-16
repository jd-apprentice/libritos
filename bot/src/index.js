import { Client, GatewayIntentBits } from 'discord.js';
import { config } from './config/index.js';
import { db } from './config/database.js';
import { isBot, isNotSelectedChannel, hasMoreThanOneAttachment, fileExists } from './utils/validations.js';

export class LibraryBot {
    constructor(options = {}) {
        this._options = options;
        this._client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        this._client.login(config.token);
        this._client.on('ready', this._onReady.bind(this));
        this._client.on('messageCreate', this._onMessage.bind(this));
    }

    async start() {
        db.connection();
    }

    async _onReady() {
        console.log(`Logged in as ${this._client.user.tag}!`);
    }

    async _onMessage(message) {
        if (isBot(message)) return;
        if (isNotSelectedChannel(message, config.channelId)) return;

        const { name, url, contentType } = message.attachments.first() || {};

        if (!fileExists(message)) {
            await message.reply('Please send a file');
            return;
        }

        if (hasMoreThanOneAttachment(message)) {
            await message.reply('Please only send one file at a time');
            return;
        }


        if (!config.allowedFormarts.includes(contentType)) {
            await message.reply('Please send a valid file');
            return;
        }

        const query = await db
            .insertInto(config.booksTable)
            .values({
                name,
                url,
                description: message.content,
            })
            .execute()

        if (!query) {
            await message.reply('Error saving file');
            return;
        }

        await message.reply('File saved');
        return;
    }
}