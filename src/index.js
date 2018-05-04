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
 * Generate url for Taskcluser UI.
 */
exports.ui = (rootUrl, path) => {
  rootUrl = cleanRoot(rootUrl);
  path = cleanPath(path);
  return rootUrl === TASKCLUSTER_NET ?
    `https://tools.taskcluster.net/${path}` :
    `${rootUrl}/${path}`;
};
