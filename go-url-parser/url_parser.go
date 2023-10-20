package http_client

import (
	"errors"
	"unicode/utf8"
)

// type UrlRecord struct {
// 	scheme   string
// 	username string
// 	password string
// 	host     string
// 	port     uint16
// 	path     []string
// 	query    string
// 	fragment string
// 	// blobUrlEntry
// }

// // think if we need to separate Scheme from SpecialScheme
// type Scheme struct {
// 	scheme      string
// 	defaultPort int
// }

var ErrInvalidUrlUnit = errors.New("invalid_url_unit")

func validateUrl(url string) error {
	// SPEC
	// If input contains any leading or trailing C0 control or space, invalid-URL-unit validation error.
	firstChar, _ := utf8.DecodeRune([]byte(url))
	lastChar, _ := utf8.DecodeLastRune([]byte(url))
	if firstChar <= 0x001F || lastChar <= 0x001F {
		return ErrInvalidUrlUnit
	}

	// If input contains any ASCII tab or newline, invalid-URL-unit validation error.
	for _, c := range url {
		if c == 0x9 || c == 0xA || c == 0xD {
			return ErrInvalidUrlUnit
		}
	}

	// WIP now parse scheme (item 4 of https://url.spec.whatwg.org/#concept-basic-url-parser)

	return nil
}
