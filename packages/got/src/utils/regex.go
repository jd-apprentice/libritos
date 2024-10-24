package utils

import (
	"regexp"
)

var RegexImageAndDescription = regexp.MustCompile(`image: (.*?)\ndescription: (.*)`)
