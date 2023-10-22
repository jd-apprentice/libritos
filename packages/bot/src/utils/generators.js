import { Collection } from 'discord.js';
import { regexImageAndDescription } from './regex.js';

/**
 * @example
 * 
 * const { nameGenerator } = require('./utils/generator');
 * const bookName = 'The_Book_Name';
 * 
 * console.log(nameGenerator(bookName));
 * // Output: The Book Name
 * 
 * @description Removes special characters, numbers and underscores from the book name
 * @param { string } bookName - The name of the book
 * @returns { string } - The clean and readable name of the book
 */

export const nameGenerator = (bookName) => {
    bookName = bookName.replace(/[-\d\W_]+/g, ' ');
    bookName = bookName.replace("pdf", '')
    bookName = bookName.trim();
    return bookName;
}

/**
 * @typedef { import("../@types/types.js").Content } Content
 * @description Parse the message to get the image and description
 * @param { Collection } message - The message to be parsed
 * @returns { Content } The image and description of the message
 */

export const imageAndDescriptionGenerator = (message) => {
    const { content } = message;
    const matches = content.match(regexImageAndDescription);

    if (matches) {
        const contentImage = matches[1].trim();
        const contentDescription = matches[2].trim();
        return { image: contentImage, description: contentDescription };
    }

    return null;
}