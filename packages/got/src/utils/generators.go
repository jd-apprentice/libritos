package utils

import (
	"regexp"
	"strings"
)

type Content struct {
	Image       string
	Description string
}

// NameGenerator takes a string and returns a modified version of the string.
// It replaces all non-alphanumeric characters with spaces and removes the
// string "pdf" from the end of the string (if present). It also trims all
// whitespace from the string.
func NameGenerator(bookName string) string {
	re := regexp.MustCompile(`[-\d\W_]+`)

	bookName = re.ReplaceAllString(bookName, " ")
	bookName = strings.Replace(bookName, "pdf", "", -1)
	bookName = strings.TrimSpace(bookName)

	return bookName
}

// ImageAndDescriptionGenerator extracts image URL and description from a message string.
// The message should contain "image: <url>\ndescription: <message>" format.
// Returns a pointer to a Content struct with the extracted image and description, or nil if no match is found.
func ImageAndDescriptionGenerator(message string) *Content {
	regexImageAndDescription := regexp.MustCompile(`image: (.*?)\ndescription: (.*)`)

	matches := regexImageAndDescription.FindStringSubmatch(message)

	if matches != nil {
		contentImage := strings.TrimSpace(matches[1])
		contentDescription := strings.TrimSpace(matches[2])
		return &Content{Image: contentImage, Description: contentDescription}
	}

	return nil
}
