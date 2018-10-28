package tcurls

import (
	"fmt"
	"strings"
)

const oldRootURL = "https://taskcluster.net"

// API generates a url for a resource in a taskcluster service
func API(rootURL string, service string, version string, path string) string {
	path = strings.TrimLeft(path, "/")
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://%s.taskcluster.net/%s/%s", service, version, path)
	default:
		return fmt.Sprintf("%s/api/%s/%s/%s", r, service, version, path)
	}
}

// APIReference enerates a url for a taskcluster service reference doc
func APIReference(rootURL string, service string, version string) string {
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://references.taskcluster.net/%s/%s/api.json", service, version)
	default:
		return fmt.Sprintf("%s/references/%s/%s/api.json", r, service, version)
	}
}

// Docs generates a url for a taskcluster docs-site page
func Docs(rootURL string, path string) string {
	path = strings.TrimLeft(path, "/")
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://docs.taskcluster.net/%s", path)
	default:
		return fmt.Sprintf("%s/docs/%s", r, path)
	}
}

// ExchangeReference generates a url for a taskcluster exchange reference doc
func ExchangeReference(rootURL string, service string, version string) string {
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://references.taskcluster.net/%s/%s/exchanges.json", service, version)
	default:
		return fmt.Sprintf("%s/references/%s/%s/exchanges.json", r, service, version)
	}
}

// Schema generates a url for a taskcluster schema
func Schema(rootURL string, service string, name string) string {
	name = strings.TrimLeft(name, "/")
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://schemas.taskcluster.net/%s/%s", service, name)
	default:
		return fmt.Sprintf("%s/schemas/%s/%s", r, service, name)
	}
}

// UI generates a url for a page in taskcluster tools site
func UI(rootURL string, path string) string {
	path = strings.TrimLeft(path, "/")
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return fmt.Sprintf("https://tools.taskcluster.net/%s", path)
	default:
		return fmt.Sprintf("%s/%s", r, path)
	}
}

// ServicesManifest returns a URL for the service manifest of a taskcluster deployment
func ServicesManifest(rootURL string) string {
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return "https://references.taskcluster.net/manifest.json"
	default:
		return fmt.Sprintf("%s/references/manifest.json", r)
	}
}

// TaskInspector returns a link to the task group or the task in Task Inspector
func TaskInspector(rootURL string, ids ...string) string {
	taskGroupID := ids[0]
	var taskDetails string
	if len(ids) > 1 {
		taskID := ids[1]
		taskDetails = fmt.Sprintf("/tasks/%s/details", taskID)
	} else {
		taskDetails = ""
	}
	switch r := strings.TrimRight(rootURL, "/"); r {
	case oldRootURL:
		return "https://references.taskcluster.net/manifest.json"
	default:
		return fmt.Sprintf("%s/groups/%s%s", r, taskGroupID, taskDetails)
	}
}
