package main

import (
	"LibraryBot/src/database"
	"LibraryBot/src/utils"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/bwmarrin/discordgo"
	"gorm.io/gorm"
)

// libritos-bot -- A Discord bot to save books in a database
//
// -----------------------------------------------------------------------
//
// Author: Jonathan Dyallo
// GNU General Public License v3.0
//
// Copyright (c) 2023 Jonathan <contacto at jonathan dot com dot ar>
//
// All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

type LibraryBot struct {
	config *BotConfig
	client *discordgo.Session
	db     *gorm.DB
}

type BotConfig struct {
	Token          string
	ChannelID      string
	BooksTable     string
	AllowedFormats []string
}

type Config struct {
	token          string
	channelID      string
	allowedFormats []string
	booksTable     string
}

func getConfig() Config {
	return Config{
		token:          os.Getenv("DISCORD_TOKEN"),
		channelID:      os.Getenv("DISCORD_CHANNEL_ID"),
		allowedFormats: strings.Split(os.Getenv("ALLOWED_FORMATS"), ", "),
		booksTable:     os.Getenv("BOOKS_TABLE"),
	}
}

func (bot *LibraryBot) Start() error {
	bot.client.AddHandler(bot.onMessage)
	bot.client.AddHandler(bot.onReady)

	return bot.client.Open()
}

func (bot *LibraryBot) onReady(s *discordgo.Session, event *discordgo.Ready) {
	fmt.Printf("Logged in as %s\n", s.State.User.Username)
}

func (bot *LibraryBot) onMessage(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.Bot || m.ChannelID != bot.config.ChannelID {
		return
	}

	if m.Content == "" {
		s.ChannelMessageSend(m.ChannelID, "You are sending an empty message")
		return
	}

	if !bot.isValidMessage(m.Content) {
		s.ChannelMessageSend(m.ChannelID, "Please send a valid format, usage: ```image: <url>\ndescription: <description>```")
		return
	}

	if len(m.Attachments) == 0 {
		s.ChannelMessageSend(m.ChannelID, "Please send a file")
		return
	}

	if len(m.Attachments) > 1 {
		s.ChannelMessageSend(m.ChannelID, "Please only send one file at a time")
		return
	}

	attachment := m.Attachments[0]
	if !bot.isValidFormat(attachment.ContentType) {
		s.ChannelMessageSend(m.ChannelID, "Please send a valid file")
		return
	}

	if attachment.Size > 20*1024*1024 {
		s.ChannelMessageSend(m.ChannelID, "Please send a file smaller than 20MB")
		return
	}

	image, description := bot.imageAndDescriptionGenerator(m.Content)
	name := bot.nameGenerator(attachment.Filename)

	if err := bot.saveFile(name, attachment.URL, image, description); err != nil {
		s.ChannelMessageSend(m.ChannelID, "An error occurred while saving the file")
		log.Println("Error saving file:", err)
		return
	}

	s.ChannelMessageSend(m.ChannelID, "File saved successfully")
}

func (bot *LibraryBot) isValidMessage(content string) bool {
	return strings.Contains(content, "image:") && strings.Contains(content, "description:")
}

func (bot *LibraryBot) isValidFormat(contentType string) bool {
	for _, format := range bot.config.AllowedFormats {
		if strings.HasSuffix(contentType, format) {
			return true
		}
	}
	return false
}

func (bot *LibraryBot) imageAndDescriptionGenerator(content string) (string, string) {
	image := strings.Split(content, "image: ")[1]
	description := strings.Split(content, "description: ")[1]
	return image, description
}

func (bot *LibraryBot) nameGenerator(filename string) string {
	return strings.TrimSuffix(filename, ".pdf")
}

func (bot *LibraryBot) saveFile(name, url, image, description string) error {
	query := fmt.Sprintf("INSERT INTO %s (name, url, image, description) VALUES ($1, $2, $3, $4)", bot.config.BooksTable)
	err := bot.db.Exec(query, name, url, image, description)
	return err.Error
}

func main() {

	dbConfig := getConfig()
	botConfig := &BotConfig{
		Token:          dbConfig.token,
		ChannelID:      dbConfig.channelID,
		BooksTable:     dbConfig.booksTable,
		AllowedFormats: dbConfig.allowedFormats,
	}

	discord, err := discordgo.New("Bot " + botConfig.Token)
	if err != nil {
		log.Fatal("Error creating Discord session: ", err)
	}

	log.Println("Bot started")

	db := database.GetDatabase()

	if err := utils.CreateSchema(db, botConfig.BooksTable); err != nil {
		log.Fatal("Error creating schema: ", err)
	}

	bot := &LibraryBot{
		config: botConfig,
		client: discord,
		db:     db,
	}

	if err := bot.Start(); err != nil {
		log.Fatal("Error starting bot: ", err)
	}

	select {}
}
