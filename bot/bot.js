import { LibraryBot } from './src/index.js';
import { config } from './src/config/index.js';

const bot = new LibraryBot({
    config
});
bot.start();