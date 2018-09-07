package org.mozilla.taskcluster.urls;

public class NewURLs implements URLProvider {

    private String rootURL;

    private NewURLs() {
    }

    public NewURLs(String rootURL) {
        this.rootURL = Clean.url(rootURL);
    }

    /**
     * Generate URL for path in a Taskcluster service.
     */
    public String api(String service, String version, String path) {
        return this.rootURL + "/api/" + service + "/" + version + "/" + Clean.path(path);
    }

    /**
     * Generate URL for the api reference of a Taskcluster service.
     */
    public String apiReference(String service, String version) {
        return this.rootURL + "/references/" + service + "/" + version + "/api.json";
    }

    /**
     * Generate URL for path in the Taskcluster docs website.
     */
    public String docs(String path) {
        return this.rootURL + "/docs/" + Clean.path(path);
    }

    /**
     * Generate URL for the exchange reference of a Taskcluster service.
     */
    public String exchangeReference(String service, String version) {
        return this.rootURL + "/references/" + service + "/" + version + "/exchanges.json";
    }

    /**
     * Generate URL for the schemas of a Taskcluster service.
     * The schema usually have the version in its name i.e. "v1/whatever.json"
     */
    public String schema(String service, String schema) {
        return this.rootURL + "/schemas/" + service + "/" + Clean.path(schema);
    }

    /**
     * Generate URL for Taskcluser UI.
     */
    public String ui(String path) {
        return this.rootURL + "/" + Clean.path(path);
    }

    /**
     * Returns a URL for the service manifest of a taskcluster deployment.
     */
    public String servicesManifest() {
        return this.rootURL + "/references/manifest.json";
    }
}
