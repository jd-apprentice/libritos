FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY src ./src
COPY bot.js ./

RUN bun install

EXPOSE 3000

## Start the app
CMD ["bun", "bot.js"]