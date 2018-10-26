package org.mozilla.taskcluster.urls;

public interface URLProvider {

    /**
     * Generate URL for path in a Taskcluster service.
     */
    public String api(String service, String version, String path);

    /**
     * Generate URL for the api reference of a Taskcluster service.
     */
    public String apiReference(String service, String version);

    /**
     * Generate URL for path in the Taskcluster docs website.
     */
    public String docs(String path);

    /**
     * Generate URL for the exchange reference of a Taskcluster service.
     */
    public String exchangeReference(String service, String version);

    /**
     * Generate URL for the schemas of a Taskcluster service.
     * The schema usually have the version in its name i.e. "v1/whatever.json"
     */
    public String schema(String service, String schema);

    /**
     * Generate URL for Taskcluser UI.
     *
     * @param path - may or may not have an initial slash
     */
    public String ui(String path);

    /**
     * Returns a URL for the service manifest of a taskcluster deployment.
     */
    public String servicesManifest();
}
