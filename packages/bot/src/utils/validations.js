import { Collection } from "discord.js";
import { regexImageAndDescription } from './regex.js';

/**
 * @description Check if the message is a bot
 * @param { Collection } message 
 * @returns { boolean } 
 */
export const isBot = (message) => message.author.bot;

/**
 * @description Check if the message is from the desired channel
 * @param { Collection } message 
 * @param { string } channelId 
 * @returns { boolean } 
 */
export const isNotSelectedChannel = (message, channelId) => message.channelId !== channelId;

/**
 * @description Check if the message has more than one attachment
 * @param { Collection } message 
 * @returns { boolean }
 */
export const hasMoreThanOneAttachment = (message) => message.attachments.size > 1;

/**
 * @description Check if the message has a url
 * @param { Collection } message 
 * @returns { boolean }
 */
export const fileExists = (message) => message.attachments.first()?.url;

/**
 * @description Check if the file is smaller than 25MB
 * @param { Collection } message 
 * @returns { boolean }
 */

export const moreThan20MB = (message) => message.attachments.first().size > 20000000;

/**
 * @description Check if the message has a valid format
 * @param { Collection } message 
 * @returns { boolean }
 */

export const isValidMessage = (message) => regexImageAndDescription.test(message.content);