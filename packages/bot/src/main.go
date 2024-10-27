package main

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

import (
	"LibraryBot/src/constants"
	"LibraryBot/src/database"
	"LibraryBot/src/utils"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type LibraryBot struct {
	config *Config
	client *discordgo.Session
	db     *gorm.DB
}

type Config struct {
	token          string
	channelID      string
	allowedFormats []string
	booksTable     string
}

func getConfig() Config {

	if err := godotenv.Load(); err != nil {
		log.Println(constants.MissingDotEnv)
	}

	token := os.Getenv("DISCORD_TOKEN")
	channelID := os.Getenv("DISCORD_CHANNEL_ID")
	allowedFormats := strings.Split(os.Getenv("ALLOWED_FORMATS"), ", ")
	booksTable := os.Getenv("BOOKS_TABLE")

	if token == "" {
		log.Fatal(constants.MissingToken)
	}

	if channelID == "" {
		log.Fatal(constants.MissingChannelID)
	}

	if len(allowedFormats) == 0 {
		log.Fatal(constants.MissingAllowedFormats)
	}

	if booksTable == "" {
		booksTable = constants.DatabaseName
	}

	return Config{
		token,
		channelID,
		allowedFormats,
		booksTable,
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
	if m.Author.Bot || m.ChannelID != bot.config.channelID {
		return
	}

	if m.Content == constants.EmptyMessage {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseEmptyMessage)
		return
	}

	if utils.IsValidMessage(m.Content) {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseInvalidFormat)
		return
	}

	if len(m.Attachments) == 0 {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseEmptyFile)
		return
	}

	if len(m.Attachments) > constants.MaxAttachments {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseMaxAttachments)
		return
	}

	attachment := m.Attachments[0]
	if !bot.isValidFormat(attachment.ContentType) {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseInvalidFile)
		return
	}

	if attachment.Size > constants.MaxSize {
		s.ChannelMessageSend(m.ChannelID, constants.ResponseMaxSize)
		return
	}

	image, description := utils.ImageAndDescriptionGenerator(m.Content)
	name := utils.NameGenerator(attachment.Filename)

	if err := bot.saveFile(name, attachment.URL, image, description); err != nil {
		s.ChannelMessageSend(m.ChannelID, "An error occurred while saving the file")
		log.Println("Error saving file:", err)
		return
	}

	s.ChannelMessageSend(m.ChannelID, constants.ResponseValidOperation)
}

func (bot *LibraryBot) isValidFormat(contentType string) bool {
	for _, format := range bot.config.allowedFormats {
		if strings.HasSuffix(contentType, format) {
			return true
		}
	}
	return false
}

func (bot *LibraryBot) saveFile(name, url, image, description string) error {
	query := fmt.Sprintf("INSERT INTO %s (name, url, image, description) VALUES ($1, $2, $3, $4)", bot.config.booksTable)
	err := bot.db.Exec(query, name, url, image, description)
	return err.Error
}

func main() {

	config := getConfig()

	botConfig := &Config{
		token:          config.token,
		channelID:      config.channelID,
		booksTable:     config.booksTable,
		allowedFormats: config.allowedFormats,
	}

	discord, err := discordgo.New("Bot " + botConfig.token)
	if err != nil {
		log.Fatal("Error creating Discord session: ", err)
	}

	log.Println("Bot started")

	db := database.GetDatabase()

	if err := utils.CreateSchema(db, botConfig.booksTable); err != nil {
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
