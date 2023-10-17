
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
 * @param {string} bookName - The name of the book
 * @returns {string} - The clean and readable name of the book
 */

export const nameGenerator = (bookName) => {
    bookName = bookName.replace(/[-\d\W_]+/g, ' ');
    bookName = bookName.replace("pdf", '')
    bookName = bookName.trim();
    return bookName;
}