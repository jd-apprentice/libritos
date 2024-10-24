/* libritos-bot -- A Discord bot to save books in a database
 *
 * -----------------------------------------------------------------------
 *
 * Author: Jonathan Dyallo
 * GNU General Public License v3.0
 *
 * Copyright (c) 2023 Jonathan <contacto at jonathan dot com dot ar>
 * 
 * All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Client, GatewayIntentBits } from 'discord.js';
import { db } from './config/database.js';
import {
    isBot,
    isNotSelectedChannel,
    hasMoreThanOneAttachment,
    fileExists, moreThan20MB,
    isValidMessage,
    messageExists,
    isValidFormat
} from './utils/validations.js';
import { nameGenerator, imageAndDescriptionGenerator } from './utils/generators.js';

/**
 * @example
    import { LibraryBot } from 'libritos-bot';
    import { config } from './src/config/index.js';

    const bot = new LibraryBot({
        config
    });

    bot.start();
    @description This is the main class of the bot, it is responsible for starting the bot and listening to the events
    @param {Object} options - Options for the bot
    @param {Object} options.config - Configuration for the bot
    @param {string} options.config.token - Discord bot token
    @param {string} options.config.channelId - Discord channel id where the bot will be listening
    @param {string} options.config.booksTable - Name of the table where the books will be saved
    @param {string[]} options.config.allowedFormarts - Allowed file formats
    @returns {void}
 */

// https://github.com/oven-sh/bun/issues/4760#issuecomment-1712752276
export class LibraryBot {
    #config;
    #client;

    constructor(options = {}) {
        this.#config = options.config;
        this.#client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ],
        });

        this.#client.login(this.#config.token);
        this.#client.on('ready', this.#onReady.bind(this));
        this.#client.on('messageCreate', this.#onMessage.bind(this));
    }

    async start() {
        db.connection();
    };

    async #executeQuery(database, query, message) {
        try {
            const result = await database.insertInto(this.#config.booksTable).values(query).execute();
            return result;
        } catch (error) {
            console.error(error);
            message.reply('An error occurred while saving the file');
            return;
        }
    };

    async #onReady() {
        console.log(`Logged in as ${this.#client.user.tag}!`);
    };

    async #onMessage(message) {
        if (isBot(message)) return;
        if (isNotSelectedChannel(message, this.#config.channelId)) return;

        if (!messageExists(message)) {
            await message.reply('You are sending an empty message');
            return;
        }

        if (!isValidMessage(message)) {
            await message.reply('Please send a valid format, usage: ```image: <url>\ndescription: <description>```');
            return;
        }

        const { name: fileName, url, contentType } = message.attachments.first() || {};

        if (!fileExists(message)) {
            await message.reply('Please send a file');
            return;
        }

        if (hasMoreThanOneAttachment(message)) {
            await message.reply('Please only send one file at a time');
            return;
        }


        if (!isValidFormat(contentType, this.#config.allowedFormarts)) {
            await message.reply('Please send a valid file');
            return;
        }

        if (moreThan20MB(message)) {
            await message.reply('Please send a file smaller than 20MB');
            return;
        }

        const { image, description } = imageAndDescriptionGenerator(message);
        const name = nameGenerator(fileName);

        this.#executeQuery(db, {
            name,
            url,
            image,
            description,
        }, message);

        await message.reply('File saved');
    }
}