package utils

import (
	"strings"
)

func IsValidMessage(content string) bool {
	return strings.Contains(content, "image:") && strings.Contains(content, "description:")
}
