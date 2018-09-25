package tcurls

import (
	"io/ioutil"
	"net/url"
	"strings"
	"testing"

	"gopkg.in/yaml.v2"
)

type TestCase struct {
	Function string            `yaml:"function"`
	Expected map[string]string `yaml:"expected"`
	ArgSets  [][]string        `yaml:"argSets"`
}

type TestsSpecification struct {
	RootURLs map[string][]string `yaml:"rootURLs"`
	Tests    []TestCase          `yaml:"tests"`
}

func testFunc(t *testing.T, function string, expectedURL string, root string, args ...string) {
	rootURL, err := NewRootURL(root)
	if err != nil {
		t.Fatalf("%s", err)
	}
	var actualURL *url.URL
	switch function {
	case "api":
		actualURL, err = rootURL.API(args[0], args[1], args[2])
	case "apiReference":
		actualURL, err = rootURL.APIReference(args[0], args[1])
	case "docs":
		actualURL, err = rootURL.Docs(args[0])
	case "exchangeReference":
		actualURL, err = rootURL.ExchangeReference(args[0], args[1])
	case "schema":
		actualURL, err = rootURL.Schema(args[0], args[1])
	case "ui":
		actualURL, err = rootURL.UI(args[0])
	case "servicesManifest":
		actualURL, err = rootURL.ServicesManifest()
	default:
		t.Errorf("Unknown function type: %s", function)
		return
	}
	if err != nil {
		t.Fatalf("%s", err)
	}
	if expectedURL != actualURL.String() {
		t.Errorf("%v %v(%v) = `%v` but should be `%v`", redCross(), function, quotedList(root, args), actualURL, expectedURL)
		return
	}
	t.Logf("%v %v(%v) = `%v`", greenTick(), function, quotedList(root, args), actualURL)
}

func TestURLs(t *testing.T) {
	data, err := ioutil.ReadFile("tests.yml")
	if err != nil {
		t.Error(err)
	}
	var spec TestsSpecification
	err = yaml.Unmarshal([]byte(data), &spec)
	if err != nil {
		t.Error(err)
	}

	for _, test := range spec.Tests {
		for _, argSet := range test.ArgSets {
			for cluster, rootURLs := range spec.RootURLs {
				for _, rootURL := range rootURLs {
					testFunc(t, test.Function, test.Expected[cluster], rootURL, argSet...)
				}
			}
		}
	}
}

// quotedList returns a backtick-quoted list of the arguments passed in
func quotedList(url string, args []string) string {
	all := append([]string{url}, args...)
	return "`" + strings.Join(all, "`, `") + "`"
}

// greenTick returns an ANSI string including escape codes to render a light
// green tick (✓) in a color console
func greenTick() string {
	return string([]byte{0x1b, 0x5b, 0x33, 0x32, 0x6d, 0xe2, 0x9c, 0x93, 0x1b, 0x5b, 0x30, 0x6d})
}

func redCross() string {
	return "❌"
}
