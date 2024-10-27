package utils

import (
	"LibraryBot/src/constants"
	"fmt"

	"gorm.io/gorm"
)

type Book struct {
	ID          uint   `gorm:"primaryKey;autoIncrement"`
	Name        string `gorm:"not null"`
	URL         string `gorm:"not null"`
	Image       string `gorm:"not null"`
	Description string `gorm:"type:text;not null"`
}

func CreateSchema(db *gorm.DB, tableName string) error {
	err := db.Table(tableName).AutoMigrate(&Book{})
	if err != nil {
		return fmt.Errorf(constants.ErrorSchema, err)
	}

	books := []Book{
		{
			Name:        constants.SampleNameOne,
			URL:         constants.SampleUrlOne,
			Image:       constants.SampleImageOne,
			Description: constants.SampleDescriptionOne,
		},
		{
			Name:        constants.SampleNameTwo,
			URL:         constants.SampleUrlTwo,
			Image:       constants.SampleImageTwo,
			Description: constants.SampleDescriptionTwo,
		},
	}

	if err := db.Table(tableName).Create(&books).Error; err != nil {
		return fmt.Errorf(constants.ErrorInsert, err)
	}

	return nil
}
