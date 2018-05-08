const TASKCLUSTER_NET = 'https://taskcluster.net';

const cleanRoot = rootUrl => rootUrl.replace(/\/$/, '');
const cleanPath = path => path.replace(/^\//, '');

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
   */
  schema(service, version, schema) {
    return `https://schemas.taskcluster.net/${service}/${version}/${
      cleanPath(schema)
    }`;
  }

  /**
   * Generate URL for Taskcluser UI.
   */
  ui(path) {
    return `https://tools.taskcluster.net/${cleanPath(path)}`;
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
   */
  schema(service, version, schema) {
    return `${this.rootUrl}/schemas/${service}/${version}/${schema}`;
  }

  /**
   * Generate URL for Taskcluser UI.
   */
  ui(path) {
    return `${this.rootUrl}/${cleanPath(path)}`;
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
};
