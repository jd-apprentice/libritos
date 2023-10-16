/**
 * @description: Check if the message is a bot
 * @param {boolean} message 
 * @returns { boolean } 
 */
export const isBot = (message) => message.author.bot;

/**
 * @description: Check if the message is from the desired channel
 * @param {string} message 
 * @param {string} channelId 
 * @returns { boolean } 
 */
export const isNotSelectedChannel = (message, channelId) => message.channelId !== channelId;

/**
 * @description: Check if the message has more than one attachment
 * @param {string} message 
 * @returns { boolean }
 */
export const hasMoreThanOneAttachment = (message) => message.attachments.size > 1;

/**
 * @description: Check if the message has a url
 * @param {string} message 
 * @returns { boolean }
 */
export const fileExists = (message) => message.attachments.first()?.url;