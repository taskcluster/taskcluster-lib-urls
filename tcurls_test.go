package tcurls

import (
	"fmt"
	"io/ioutil"
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
	default:
		return "", fmt.Errorf("Unknown function type: %s", functionType)
	}
}

func TestUrls(t *testing.T) {
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
		// First test "new" urls
		for _, argSet := range test.ArgSets {
			result, err := testFunc(t, test.FunctionType, rootURL, argSet...)
			if err != nil {
				t.Error(err)
				continue
			}
			if result != test.ExpectedURL {
				t.Errorf("Url is not correct. Got %s wanted %s", result, test.ExpectedURL)
				continue
			}
			result, err = testFunc(t, test.FunctionType, fmt.Sprintf("%s/", rootURL), argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.ExpectedURL {
				t.Errorf("Url is not correct. Got %s wanted %s", result, test.ExpectedURL)
				continue
			}

			// Now the old ones
			result, err = testFunc(t, test.FunctionType, oldRootURL, argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.OldExpectedURL {
				t.Errorf("Url is not correct. Got %s wanted %s", result, test.OldExpectedURL)
			}
			result, err = testFunc(t, test.FunctionType, fmt.Sprintf("%s/", oldRootURL), argSet...)
			if err != nil {
				t.Error(err)
			}
			if result != test.OldExpectedURL {
				t.Errorf("Url is not correct. Got %s wanted %s", result, test.OldExpectedURL)
			}
		}
	}
}
