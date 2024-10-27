package utils

import "strings"

func ImageAndDescriptionGenerator(content string) (string, string) {
	image := strings.Split(content, "image: ")[1]
	description := strings.Split(content, "description: ")[1]
	return image, description
}

func NameGenerator(filename string) string {
	return strings.TrimSuffix(filename, ".pdf")
}
