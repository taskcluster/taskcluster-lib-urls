package org.mozilla.taskcluster.urls;

public class Clean {

    private Clean() {
    }

    public static String path(String path) {
        if (path.startsWith("/")) {
            return path.substring(1);
        }
        return path;
    }

    public static String url(String url) {
        if (url.endsWith("/")) {
            return url.substring(0, url.length() - 1);
        }
        return url;
    }
}
