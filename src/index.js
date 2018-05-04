const TASKCLUSTER_NET = 'https://taskcluster.net';

const cleanRoot = rootUrl => rootUrl.replace(/\/$/, '');
const cleanPath = path => path.replace(/^\//, '');

/**
 * Generate url for path in the Taskcluster docs website.
 */
exports.docs = (rootUrl, path) => {
  rootUrl = cleanRoot(rootUrl);
  path = cleanPath(path);
  return rootUrl === TASKCLUSTER_NET ?
    `https://docs.taskcluster.net/${path}` :
    `${rootUrl}/docs/${path}`;
};

/**
 * Generate url for path in a Taskcluster service.
 */
exports.api = (rootUrl, service, version, path) => {
  rootUrl = cleanRoot(rootUrl);
  path = cleanPath(path);
  return rootUrl === TASKCLUSTER_NET ?
    `https://${service}.taskcluster.net/${version}/${path}` :
    `${rootUrl}/api/${service}/${version}/${path}`;
};

/**
 * Generate url for the schemas of a Taskcluster service.
 */
exports.schema = (rootUrl, service, version, schema) => {
  rootUrl = cleanRoot(rootUrl);
  schema = cleanPath(schema);
  return rootUrl === TASKCLUSTER_NET ?
    `https://schemas.taskcluster.net/${service}/${version}/${schema}` :
    `${rootUrl}/schemas/${service}/${version}/${schema}`;
};

/**
 * Generate url for the api reference of a Taskcluster service.
 */
exports.apiReference = (rootUrl, service, version) => {
  rootUrl = cleanRoot(rootUrl);
  return rootUrl === TASKCLUSTER_NET ?
    `https://references.taskcluster.net/${service}/${version}/api.json` :
    `${rootUrl}/references/${service}/${version}/api.json`;
};

/**
 * Generate url for the exchange reference of a Taskcluster service.
 */
exports.exchangeReference = (rootUrl, service, version) => {
  rootUrl = cleanRoot(rootUrl);
  return rootUrl === TASKCLUSTER_NET ?
    `https://references.taskcluster.net/${service}/${version}/exchanges.json` :
    `${rootUrl}/references/${service}/${version}/exchanges.json`;
};

/**
 * Generate url for Taskcluser UI.
 */
exports.ui = (rootUrl, path) => {
  rootUrl = cleanRoot(rootUrl);
  path = cleanPath(path);
  return rootUrl === TASKCLUSTER_NET ?
    `https://tools.taskcluster.net/${path}` :
    `${rootUrl}/${path}`;
};
