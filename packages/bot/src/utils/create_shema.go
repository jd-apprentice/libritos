package utils

import (
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
		return fmt.Errorf("error creating schema: %v", err)
	}

	books := []Book{
		{
			Name:        "The Hobbit",
			URL:         "https://web.seducoahuila.gob.mx/biblioweb/upload/J.R.R.%20Tolkien%20-%20El%20Hobbit.pdf",
			Image:       "https://html.scribdassets.com/2mwbygnz281w5bt0/images/1-6344347f1b.jpg",
			Description: "The Hobbit is a children's fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.",
		},
		{
			Name:        "The Lord of the Rings",
			URL:         "https://gosafir.com/mag/wp-content/uploads/2019/12/Tolkien-J.-The-lord-of-the-rings-HarperCollins-ebooks-2010.pdf",
			Image:       "https://www.readingsanctuary.com/wp-content/uploads/2018/03/the-lord-of-the-rings.png",
			Description: "The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien. The story began as a sequel to Tolkien's 1937 fantasy novel The Hobbit, but eventually developed into a much larger work.",
		},
	}

	if err := db.Table(tableName).Create(&books).Error; err != nil {
		return fmt.Errorf("error inserting data: %v", err)
	}

	return nil
}
