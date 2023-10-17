FROM oven/bun:latest as build

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
COPY src ./src
COPY tsconfig.json ./

RUN bun install
RUN bun build --target=bun ./src/index.ts --outfile=./dist/server.js

FROM oven/bun:latest as production

WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 3000

## Start the app
CMD ["bun", "dist/server.js"]