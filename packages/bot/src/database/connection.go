package database

import (
	"LibraryBot/src/constants"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(constants.DatabaseName+constants.DatabaseExtension), &gorm.Config{})
	if err != nil {
		panic(constants.FailMessage)
	}
	return db
}
