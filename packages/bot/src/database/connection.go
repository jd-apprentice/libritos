package database

import (
	"LibraryBot/src/constants"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func GetDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open(constants.DatabaseName+".db"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}
	return db
}
