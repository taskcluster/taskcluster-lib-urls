const assert = require('assert');

const TASKCLUSTER_NET = 'https://taskcluster.net';

const cleanRoot = rootUrl => rootUrl.replace(/\/*$/, '');
const cleanPath = path => path.replace(/^\/*/, '');

class LegacyUrls {
  /**
   * Generate URL for path in a Taskcluster service.
   */
  api(service, version, path) {
    return `https://${service}.taskcluster.net/${version}/${cleanPath(path)}`;
  }

  /**
   * Generate URL for the api reference of a Taskcluster service.
   */
  apiReference(service, version) {
    return `https://references.taskcluster.net/${service}/${version}/api.json`;
  }

  /**
   * Generate URL for path in the Taskcluster docs website.
   */
  docs(path) {
    return `https://docs.taskcluster.net/${cleanPath(path)}`;
  }

  /**
   * Generate URL for the exchange reference of a Taskcluster service.
   */
  exchangeReference(service, version) {
    return `https://references.taskcluster.net/${service}/${
      version
    }/exchanges.json`;
  }

  /**
   * Generate URL for the schemas of a Taskcluster service.
   * The schema usually have the version in its name i.e. "v1/whatever.json"
   */
  schema(service, schema) {
    return `https://schemas.taskcluster.net/${service}/${cleanPath(schema)}`;
  }

  /**
   * Generate URL for Taskcluser UI.
   */
  ui(path) {
    return `https://tools.taskcluster.net/${cleanPath(path)}`;
  }

  /**
   * Returns a URL for the service manifest of a taskcluster deployment.
   */
  servicesManifest() {
    return 'https://references.taskcluster.net/manifest.json';
  }

  /**
   * Returns a link to the task group or the task in Task Inspector
   */
  taskInspector(taskGroupId, taskId) {
    let taskDetails = taskId ? `/tasks/${taskId}/runs/0/logs/public/logs/live.log` : '';
    return this.ui(`groups/${taskGroupId}${taskDetails}`);
  }
}

class Urls {
  constructor(rootUrl) {
    this.rootUrl = cleanRoot(rootUrl);
  }

  /**
   * Generate URL for path in a Taskcluster service.
   */
  api(service, version, path) {
    return `${this.rootUrl}/api/${service}/${version}/${cleanPath(path)}`;
  }

  /**
   * Generate URL for the api reference of a Taskcluster service.
   */
  apiReference(service, version) {
    return `${this.rootUrl}/references/${service}/${version}/api.json`;
  }

  /**
   * Generate URL for path in the Taskcluster docs website.
   */
  docs(path) {
    return `${this.rootUrl}/docs/${cleanPath(path)}`;
  }

  /**
   * Generate URL for the exchange reference of a Taskcluster service.
   */
  exchangeReference(service, version) {
    return `${this.rootUrl}/references/${service}/${version}/exchanges.json`;
  }

  /**
   * Generate URL for the schemas of a Taskcluster service.
   * The schema usually have the version in its name i.e. "v1/whatever.json"
   */
  schema(service, schema) {
    return `${this.rootUrl}/schemas/${service}/${cleanPath(schema)}`;
  }

  /**
   * Generate URL for Taskcluser UI.
   */
  ui(path) {
    return `${this.rootUrl}/${cleanPath(path)}`;
  }

  /**
   * Returns a URL for the service manifest of a taskcluster deployment.
   */
  servicesManifest() {
    return `${this.rootUrl}/references/manifest.json`;
  }

  /**
   * Returns a link to the task group or the task in Task Inspector
   */
  taskInspector(taskGroupId, taskId) {
    let taskLog = taskId ? `/tasks/${taskId}/runs/0/logs/public/logs/live.log` : '';
    return `${this.rootUrl}/groups/${taskGroupId}${taskLog}`;
  }
}

const withRootUrl = rootUrl =>
  cleanRoot(rootUrl) === TASKCLUSTER_NET ?
    new LegacyUrls() :
    new Urls(rootUrl);

module.exports = {
  /**
   * Generate URLs for redeployable services and entities from
   * an initial root URL.
   */
  Urls,

  /**
   * Generate URLs for legacy services and entities like Heroku
   * from an initial root URL.
   */
  LegacyUrls,

  /**
   * Generate URLs for either redeployable or legacy services and entities
   * from an initial root URL.
   */
  withRootUrl,

  /**
   * Generate URL for path in a Taskcluster service.
   */
  api(rootUrl, service, version, path) {
    return withRootUrl(rootUrl).api(service, version, path);
  },

  /**
   * Generate URL for the api reference of a Taskcluster service.
   */
  apiReference(rootUrl, service, version) {
    return withRootUrl(rootUrl).apiReference(service, version);
  },

  /**
   * Generate URL for path in the Taskcluster docs website.
   */
  docs(rootUrl, path) {
    return withRootUrl(rootUrl).docs(path);
  },

  /**
   * Generate URL for the exchange reference of a Taskcluster service.
   */
  exchangeReference(rootUrl, service, version) {
    return withRootUrl(rootUrl).exchangeReference(service, version);
  },

  /**
   * Generate URL for the schemas of a Taskcluster service.
   */
  schema(rootUrl, service, version, schema) {
    return withRootUrl(rootUrl).schema(service, version, schema);
  },

  /**
   * Generate URL for Taskcluser UI.
   */
  ui(rootUrl, path) {
    return withRootUrl(rootUrl).ui(path);
  },

  /**
   * Returns a URL for the service manifest of a taskcluster deployment.
   */
  servicesManifest(rootUrl) {
    return withRootUrl(rootUrl).servicesManifest();
  },

  /**
   * Method for generating links to task group or a task in Task Inspector
   *
   * @param rootUrl - string; rootUrl of the Taskcluster deployment,
   *                  expected to be without a trailing slash
   * @param taskGroupId - string
   * @param taskId - string. Optional
   *
   * @returns string. URL to the task group (or the task if that parameter was also given) in Task Inspector
   */
  taskInspector(rootUrl, taskGroupId, taskId) {
    return withRootUrl(rootUrl).taskInspector(taskGroupId, taskId);
  },

  /**
   * Return the standardized taskcluster "testing" rootUrl.
   * Useful for nock and such things.
   */
  testRootUrl() {
    return 'https://tc-tests.example.com';
  },
};
