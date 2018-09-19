package tcurls

import (
	"io/ioutil"
	"strings"
	"testing"

	"gopkg.in/yaml.v2"
)

const rootURL = "https://taskcluster.example.com"

type Spec struct {
	FunctionType   string     `yaml:"type"`
	ExpectedURL    string     `yaml:"expectedUrl"`
	OldExpectedURL string     `yaml:"oldExpectedUrl"`
	ArgSets        [][]string `yaml:"argSets"`
}

type Document struct {
	Specs []Spec `yaml:"specs"`
}

func testFunc(t *testing.T, functionType string, expectedURL string, root string, args ...string) {
	var actualURL string
	switch functionType {
	case "api":
		actualURL = API(root, args[0], args[1], args[2])
	case "apiReference":
		actualURL = APIReference(root, args[0], args[1])
	case "docs":
		actualURL = Docs(root, args[0])
	case "exchangeReference":
		actualURL = ExchangeReference(root, args[0], args[1])
	case "schema":
		actualURL = Schema(root, args[0], args[1])
	case "ui":
		actualURL = UI(root, args[0])
	case "servicesManifest":
		actualURL = ServicesManifest(root)
	default:
		t.Errorf("Unknown function type: %s", functionType)
		return
	}
	if expectedURL != actualURL {
		t.Errorf(`%v %v(%v) = %q but should be %q`, redCross(), functionType, quotedList(root, args), actualURL, expectedURL)
		return
	}
	t.Logf(`%v %v(%v) = %q`, greenTick(), functionType, quotedList(root, args), actualURL)
}

func TestURLs(t *testing.T) {
	data, err := ioutil.ReadFile("specification.yml")
	if err != nil {
		t.Error(err)
	}
	var specs Document
	err = yaml.Unmarshal([]byte(data), &specs)
	if err != nil {
		t.Error(err)
	}

	for _, test := range specs.Specs {
		for _, argSet := range test.ArgSets {

			// Test "new" URLs without slashes
			testFunc(t, test.FunctionType, test.ExpectedURL, rootURL, argSet...)

			// Test "new" URLs with slashes
			testFunc(t, test.FunctionType, test.ExpectedURL, rootURL+"//", argSet...)

			// Test "old" URLs without slashes
			testFunc(t, test.FunctionType, test.OldExpectedURL, oldRootURL, argSet...)

			// Test "old" URLs with slashes
			testFunc(t, test.FunctionType, test.OldExpectedURL, oldRootURL+"//", argSet...)
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

// TODO: change this to a red cross
func redCross() string {
	return "X"
}
