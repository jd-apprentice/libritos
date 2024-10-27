# 📚 Libritos

<p align="center">
  <img width="500" height="500" src="static/images/logo.png">
</p>

# Table of Contents 📚

- [About 📔](#about-)
- [Deployment 🚀](#Deployment-)
    - [Requirements 📋](#requirements-)
        - [Create a cloudflare account and add your domain.](#create-a-cloudflare-account-and-add-your-domain)
        - [Migration](#migration)
        - [Create a discord bot and add it to your server](#create-a-discord-bot-and-add-it-to-your-server)
- [Usage](#usage)
    - [Discord Bot 🤖](#discord-bot-)
    - [Web Application 🌐](#web-application-)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

# About 📔

Libritos is a simple web application that allows you to search for books that you previously added from a discord bot.

The discord bot is set at a specific channel and it will listen to files such as pdf, epub, mobi, etc. and it will upload them to a server. The server will then process the file and add it to the database. The web application will then allow you to search for the book and download it.

# Deployment 🚀

## Requirements 📋

- Go >1.23 [Link](https://golang.org)
- Bun >1.1.28 [Link](https://bun.sh)
- Cloudflare [Link](https://cloudflare.com)
- Github [Link](https://github.com)
- Discord [Link](https://discord.com/developers/applications)

### Create a cloudflare account and add your domain.

The domain should point to the render deployment something like this

![DNS](static/images/cloudflare.png)

So in my case the website will be available at `https://libritos.jonathan.com.ar`

### Migration

In the root of the project run the following command

```bash
make migration
```

### Create a render account and add the repository

Create a `web service` and add my repository which is `https://github.com/jd-apprentice/libritos`

![web service](static/images/web_service.png)

![repository](static/images/add_repository.png)

Base configuration would be something like this

![base](static/images/base_config.png)

Now for advance configuration is where we add our environment variables

![environment](static/images/environment_variables.png)

Also remember to add the /health endpoint to the health check

Here is a table with the environment variables

| Name | Value | Example |
| ---- | ----- | ------- |
| DISCORD_TOKEN | Discord bot token from the developer portal | 123456789 |
| DISCORD_CHANNEL_ID | Discord channel id where the bot is allowed to receive files | 123456789 |
| ALLOWED_FORMATS | Allowed formats for the bot to upload | "application/pdf, application/epub+zip, application/x-mobipocket-ebook"
| BOOKS_TABLE | Name of the table where the books are going to be stored | books |

### Create a discord bot and add it to your server

In the discord developer portal create a bot

![developer portal](static/images/developer_portal.png)

Under the `Bot` section we are going to retrieve the token

![token](static/images/token.png)

Bot is going to need the following permissions in the `OAuth2` section

- Read Messages/View Channels
- Send Messages
- Read Message History
- Use Slash Commands

Then in the `Bot` section make sure message intents are enabled like this

![intents](static/images/intents.png)

# Usage 📖

## Discord Bot 🤖

How to use the discord bot:

send a message with the following format

```
image: <url>
description: <message>
```

and a file attached to the message

`files must be smaller than 20MB`

![send_file](static/images/send_sample.png)

if everything was okay you will see the `file saved` message

![save](static/images/save.png)

else you will see the proper validation that is stopping the file from being uploaded

## Web Application 🌐

Once the file is uploaded to the server you can see it in the web application

![web](static/images/web.png)

# Contributing 🤝

Contributions, issues and feature requests are welcome!

# License 📝

This project is [GPL-3.0](LICENSE) licensed.

# Contact 📧

Social media links and email address available at my [linktr.ee](https://linktr.ee/jd_apprentice)
