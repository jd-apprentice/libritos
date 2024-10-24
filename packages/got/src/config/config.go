package config

import (
	"os"
	"strings"
)

type Config struct {
	token          string
	channelID      string
	allowedFormats []string
	booksTable     string
}

func GetConfig() Config {
	return Config{
		token:          os.Getenv("DISCORD_TOKEN"),
		channelID:      os.Getenv("DISCORD_CHANNEL_ID"),
		allowedFormats: strings.Split(os.Getenv("ALLOWED_FORMATS"), ", "),
		booksTable:     os.Getenv("BOOKS_TABLE"),
	}
}
