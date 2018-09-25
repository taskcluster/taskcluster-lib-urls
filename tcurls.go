package tcurls

import (
	"fmt"
	"net/url"
	"strconv"
	"strings"
)

type TaskclusterDeployment struct {
	// intentionally not exported to force that NewRoot is called, and that
	// checks are made
	rootURL *url.URL
}

type TaskclusterDotNet struct{}

type InvalidRootURL struct {
	message string
	rootURL string
}

type RootURL interface {
	API(service string, version string, path string) (*url.URL, error)
	APIReference(service string, version string) (*url.URL, error)
	Docs(path string) (*url.URL, error)
	ExchangeReference(service string, version string) (*url.URL, error)
	Schema(service string, name string) (*url.URL, error)
	UI(path string) (*url.URL, error)
	ServicesManifest() (*url.URL, error)
	String() string
}

func (err *InvalidRootURL) Error() string {
	return err.message + ": " + strconv.Quote(err.rootURL)
}

func NewRootURL(rootURL string) (RootURL, error) {
	u, err := url.Parse(rootURL)
	if err != nil {
		return nil, &InvalidRootURL{"Error parsing rootURL: " + err.Error(), rootURL}
	}
	if !u.IsAbs() {
		return nil, &InvalidRootURL{"URL not absolute", rootURL}
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return nil, &InvalidRootURL{"Bad scheme", rootURL}
	}
	if u.Host == "" {
		return nil, &InvalidRootURL{"Missing host", rootURL}
	}
	if u.Opaque != "" {
		return nil, &InvalidRootURL{"Contains opaque data", rootURL}
	}
	if u.Fragment != "" {
		return nil, &InvalidRootURL{"Fragment included", rootURL}
	}
	u.Host = strings.ToLower(u.Host)
	if strings.HasSuffix(u.Host, ":80") && u.Scheme == "http" {
		u.Host = u.Host[:len(u.Host)-3]
	}
	if strings.HasSuffix(u.Host, ":443") && u.Scheme == "https" {
		u.Host = u.Host[:len(u.Host)-4]
	}
	if strings.TrimSuffix(u.String(), "/") == "https://taskcluster.net" {
		return &TaskclusterDotNet{}, nil
	}
	return &TaskclusterDeployment{
		rootURL: u,
	}, nil
}

// API generates a url for a resource in a taskcluster service
func (root *TaskclusterDotNet) API(service string, version string, path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://%s.taskcluster.net/%s/%s", service, version, path))
}

// APIReference enerates a url for a taskcluster service reference doc
func (root *TaskclusterDotNet) APIReference(service string, version string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://references.taskcluster.net/%s/%s/api.json", service, version))
}

// Docs generates a url for a taskcluster docs-site page
func (root *TaskclusterDotNet) Docs(path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://docs.taskcluster.net/%s", path))
}

// ExchangeReference generates a url for a taskcluster exchange reference doc
func (root *TaskclusterDotNet) ExchangeReference(service string, version string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://references.taskcluster.net/%s/%s/exchanges.json", service, version))
}

// Schema generates a url for a taskcluster schema
func (root *TaskclusterDotNet) Schema(service string, name string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://schemas.taskcluster.net/%s/%s", service, name))
}

// UI generates a url for a page in taskcluster tools site
func (root *TaskclusterDotNet) UI(path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("https://tools.taskcluster.net/%s", path))
}

// ServicesManifest returns a URL for the service manifest of a taskcluster deployment
func (root *TaskclusterDotNet) ServicesManifest() (*url.URL, error) {
	return url.Parse("https://references.taskcluster.net/manifest.json")
}

func (root *TaskclusterDotNet) String() string {
	return "https://taskcluster.net"
}

// API generates a url for a resource in a taskcluster service
func (root *TaskclusterDeployment) API(service string, version string, path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/api/%s/%s/%s", root, service, version, path))
}

// APIReference enerates a url for a taskcluster service reference doc
func (root *TaskclusterDeployment) APIReference(service string, version string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/references/%s/%s/api.json", root, service, version))
}

// Docs generates a url for a taskcluster docs-site page
func (root *TaskclusterDeployment) Docs(path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/docs/%s", root, path))
}

// ExchangeReference generates a url for a taskcluster exchange reference doc
func (root *TaskclusterDeployment) ExchangeReference(service string, version string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/references/%s/%s/exchanges.json", root, service, version))
}

// Schema generates a url for a taskcluster schema
func (root *TaskclusterDeployment) Schema(service string, name string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/schemas/%s/%s", root, service, name))
}

// UI generates a url for a page in taskcluster tools site
func (root *TaskclusterDeployment) UI(path string) (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/%s", root, path))
}

// ServicesManifest returns a URL for the service manifest of a taskcluster deployment
func (root *TaskclusterDeployment) ServicesManifest() (*url.URL, error) {
	return url.Parse(fmt.Sprintf("%s/references/manifest.json", root))
}

func (root *TaskclusterDeployment) String() string {
	return strings.TrimSuffix(root.rootURL.String(), "/")
}
