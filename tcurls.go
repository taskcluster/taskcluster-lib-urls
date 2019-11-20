package tcurls

import (
	"fmt"
	"strings"
)

// API generates a url for a resource in a taskcluster service
func API(rootURL string, service string, version string, path string) string {
	path = strings.TrimLeft(path, "/")
	return fmt.Sprintf("%s/api/%s/%s/%s", NormalizeRootURL(rootURL), service, version, path)
}

// APIReference enerates a url for a taskcluster service reference doc
func APIReference(rootURL string, service string, version string) string {
	return fmt.Sprintf("%s/references/%s/%s/api.json", NormalizeRootURL(rootURL), service, version)
}

// Docs generates a url for a taskcluster docs-site page
func Docs(rootURL string, path string) string {
	path = strings.TrimLeft(path, "/")
	return fmt.Sprintf("%s/docs/%s", NormalizeRootURL(rootURL), path)
}

// ExchangeReference generates a url for a taskcluster exchange reference doc
func ExchangeReference(rootURL string, service string, version string) string {
	return fmt.Sprintf("%s/references/%s/%s/exchanges.json", NormalizeRootURL(rootURL), service, version)
}

// Schema generates a url for a taskcluster schema
func Schema(rootURL string, service string, name string) string {
	name = strings.TrimLeft(name, "/")
	return fmt.Sprintf("%s/schemas/%s/%s", NormalizeRootURL(rootURL), service, name)
}

// APIReferenceSchema generates a url for the api reference schema
func APIReferenceSchema(rootURL string, version string) string {
	return Schema(NormalizeRootURL(rootURL), "common", fmt.Sprintf("api-reference-%s.json", version))
}

// ExchangesReferenceSchema generates a url for the exchanges reference schema
func ExchangesReferenceSchema(rootURL string, version string) string {
	return Schema(NormalizeRootURL(rootURL), "common", fmt.Sprintf("exchanges-reference-%s.json", version))
}

// APIManifestSchema generates a url for the api manifest schema
func APIManifestSchema(rootURL string, version string) string {
	return Schema(NormalizeRootURL(rootURL), "common", fmt.Sprintf("manifest-%s.json", version))
}

// MetadataMetaschema generates a url for the metadata metaschema
func MetadataMetaschema(rootURL string) string {
	return Schema(NormalizeRootURL(rootURL), "common", "metadata-metaschema.json")
}

// UI generates a url for a page in taskcluster tools site
func UI(rootURL string, path string) string {
	path = strings.TrimLeft(path, "/")
	return fmt.Sprintf("%s/%s", NormalizeRootURL(rootURL), path)
}

// APIManifest returns a URL for the service manifest of a taskcluster deployment
func APIManifest(rootURL string) string {
	return fmt.Sprintf("%s/references/manifest.json", NormalizeRootURL(rootURL))
}

// NormalizeRootURL returns the normal form of the given rootURL.
func NormalizeRootURL(rootURL string) string {
	return strings.TrimRight(rootURL, "/")
}
