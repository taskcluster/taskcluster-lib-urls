package tcurls

import (
	"fmt"
	"io/ioutil"
	"strings"
	"testing"

	"gopkg.in/yaml.v2"
)

const rootURL = "https://taskcluster.example.com"

type spec struct {
	FunctionType   string     `yaml:"type"`
	ExpectedURL    string     `yaml:"expectedUrl"`
	OldExpectedURL string     `yaml:"oldExpectedUrl"`
	ArgSets        [][]string `yaml:"argSets"`
}

type document struct {
	Specs []spec `yaml:"specs"`
}

func testFunc(t *testing.T, functionType string, root string, args ...string) (string, error) {
	switch functionType {
	case "api":
		return API(root, args[0], args[1], args[2]), nil
	case "apiReference":
		return APIReference(root, args[0], args[1]), nil
	case "docs":
		return Docs(root, args[0]), nil
	case "exchangeReference":
		return ExchangeReference(root, args[0], args[1]), nil
	case "schema":
		return Schema(root, args[0], args[1]), nil
	case "ui":
		return UI(root, args[0]), nil
	case "servicesManifest":
		return ServicesManifest(root), nil
	default:
		return "", fmt.Errorf("Unknown function type: %s", functionType)
	}
}

func TestURLs(t *testing.T) {
	data, err := ioutil.ReadFile("specification.yml")
	if err != nil {
		t.Error(err)
	}
	var specs document
	err = yaml.Unmarshal([]byte(data), &specs)
	if err != nil {
		t.Error(err)
	}

	for _, test := range specs.Specs {
		for _, argSet := range test.ArgSets {

			// Test "new" URLs
			result, err := testFunc(t, test.FunctionType, rootURL, argSet...)
			if err != nil {
				t.Error(err)
				continue
			}
			if result != test.ExpectedURL {
				t.Errorf("URL is not correct. Got %q wanted %q", result, test.ExpectedURL)
				continue
			}
			result, err = testFunc(t, test.FunctionType, fmt.Sprintf("%s//", rootURL), argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.ExpectedURL {
				t.Errorf("URL is not correct. Got %q wanted %q", result, test.ExpectedURL)
				continue
			}
			t.Logf(`%v %v(%v) = %q`, greenTick(), test.FunctionType, quotedList(rootURL, argSet), result)

			// Test "old" URLs
			result, err = testFunc(t, test.FunctionType, oldRootURL, argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.OldExpectedURL {
				t.Errorf("URL is not correct. Got %q wanted %q", result, test.OldExpectedURL)
			}
			result, err = testFunc(t, test.FunctionType, fmt.Sprintf("%s//", oldRootURL), argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.OldExpectedURL {
				t.Errorf("URL is not correct. Got %q wanted %q", result, test.OldExpectedURL)
			}
			t.Logf(`%v %v(%v) = %q`, greenTick(), test.FunctionType, quotedList(oldRootURL, argSet), result)
		}
	}
}

// quotedList returns a quoted list of the arguments passed in
func quotedList(url string, args []string) string {
	all := append([]string{url}, args...)
	return `'` + strings.Join(all, `', '`) + `'`
}

// greenTick returns an ANSI string including escape codes to render a light
// green tick (✓) in a color console
func greenTick() string {
	return string([]byte{0x1b, 0x5b, 0x33, 0x32, 0x6d, 0xe2, 0x9c, 0x93, 0x1b, 0x5b, 0x30, 0x6d})
}
