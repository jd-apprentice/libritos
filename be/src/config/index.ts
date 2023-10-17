export const config = {
    token: process.env.DISCORD_TOKEN,
    channelId: process.env.DISCORD_CHANNEL_ID,
    allowedFormarts: process.env.ALLOWED_FORMATS?.split(', '),
    booksTable: process.env.BOOKS_TABLE ?? "books",
}