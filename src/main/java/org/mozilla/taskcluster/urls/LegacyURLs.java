package org.mozilla.taskcluster.urls;

public class LegacyURLs implements URLProvider {

    public LegacyURLs() {
    }

    /**
     * Generate URL for path in a Taskcluster service.
     */
    public String api(String service, String version, String path) {
        return "https://" + service + ".taskcluster.net/" + version + "/" + Clean.path(path);
    }

    /**
     * Generate URL for the api reference of a Taskcluster service.
     */
    public String apiReference(String service, String version) {
        return "https://references.taskcluster.net/" + service + "/" + version + "/api.json";
    }

    /**
     * Generate URL for path in the Taskcluster docs website.
     */
    public String docs(String path) {
        return "https://docs.taskcluster.net/" + Clean.path(path);
    }

    /**
     * Generate URL for the exchange reference of a Taskcluster service.
     */
    public String exchangeReference(String service, String version) {
        return "https://references.taskcluster.net/" + service + "/" + version + "/exchanges.json";
    }

    /**
     * Generate URL for the schemas of a Taskcluster service.
     * The schema usually have the version in its name i.e. "v1/whatever.json"
     */
    public String schema(String service, String schema) {
        return "https://schemas.taskcluster.net/" + service + "/" + Clean.path(schema);
    }

    /**
     * Generate URL for Taskcluser UI.
     */
    public String ui(String path) {
        return "https://tools.taskcluster.net/" + Clean.path(path);
    }

    /**
     * Returns a URL for the service manifest of a taskcluster deployment.
     */
    public String servicesManifest() {
        return "https://references.taskcluster.net/manifest.json";
    }

    /**
     * Returns a link to the task group in Task Inspector
     */
    public String taskInspector(String taskGroupId) {
        return "https://tools.taskcluster.net/groups/" + taskGroupId;
    }

    /**
     * Returns a link to the task in Task Inspector
     */
    public String taskInspector(String taskGroupId, String taskId) {
        return "https://tools.taskcluster.net/groups/" + taskGroupId + "/tasks/" + taskId + "/details";
    }
}
