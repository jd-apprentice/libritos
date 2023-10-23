FROM ubuntu:jammy

WORKDIR /app

COPY packages ./packages
COPY lerna.json ./
COPY package.json ./

RUN apt-get update && apt-get install -y curl unzip

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

RUN curl -fsSL https://bun.sh/install | bash

## https://stackoverflow.com/questions/36399848/install-node-in-dockerfile

ENV NODE_VERSION=18.18.2
ENV NVM_DIR=/root/.nvm
ENV BUN_PATH=/root/.bun

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
ENV PATH="/root/.bun/bin/:${PATH}"

RUN npm run bootstrap
RUN npm run build

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:3000/health || exit 1

CMD ["npm", "run", "start"]