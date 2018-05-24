# Taskcluster URL Building Library

[![Build Status](https://travis-ci.org/taskcluster/taskcluster-lib-urls.svg?branch=master)](https://travis-ci.org/taskcluster/taskcluster-lib-urls)
[![npm](https://img.shields.io/npm/v/taskcluster-lib-urls.svg?maxAge=2592000)](https://www.npmjs.com/package/taskcluster-lib-urls)
[![License](https://img.shields.io/badge/license-MPL%202.0-orange.svg)](http://mozilla.org/MPL/2.0)

A simple library to generate URLs for various Taskcluster resources across our various deployment methods.

This serves as both a simple shim for projects that use JavaScript but also is the reference implementation for
how we define these paths.

Changelog
---------
View the changelog on the [releases page](https://github.com/taskcluster/taskcluster-lib-urls/releases).

Requirements
------------

This is tested on and should run on any of Node.js `{8, 10}`.

JS Usage
-----

This package exports several methods for generating URLs conditionally based on
a root URL, as well as a few helper classes for generating URLs for a pre-determined
root URL:

* `api(rootUrl, service, version, path)` -> `String`
* `apiReference(rootUrl, service, version)` -> `String`
* `docs(rootUrl, path)` -> `String`
* `exchangeReference(rootUrl, service, version)` -> `String`
* `schema(rootUrl, service, schema)` -> `String`
* `ui(rootUrl, path)` -> `String`
* `testRootUrl()` -> `String`
* `withRootUrl(rootUrl)` -> `Class` instance for above methods

When the `rootUrl` is `https://taskcluster.net`, the generated URLs will be to the Heroku cluster. Otherwise they will follow the
[spec defined in this project](https://github.com/taskcluster/taskcluster-lib-urls/tree/master/docs/urls-spec.md).

`testRootUrl` is used to share a common `rootUrl` between various Taskcluster mocks in testing.

```js
// Specifying root URL every time:
const libUrls = require('taskcluster-lib-url');

libUrls.api(rootUrl, 'auth', 'v1', 'foo/bar');
libUrls.schema(rootUrl, 'auth', 'v1/foo.yml'); // Note that schema names have versions in them
libUrls.apiReference(rootUrl, 'auth', 'v1');
libUrls.exchangeReference(rootUrl, 'auth', 'v1');
libUrls.ui(rootUrl, 'foo/bar');
libUrls.docs(rootUrl, 'foo/bar');
```

```js
// Specifying root URL in advance:
const libUrls = require('taskcluster-lib-url');

const urls = libUrls.withRoot(rootUrl);

urls.api('auth', 'v1', 'foo/bar');
urls.schema('auth', 'v1/foo.yml');
urls.apiReference('auth', 'v1');
urls.exchangeReference('auth', 'v1');
urls.ui('foo/bar');
urls.docs('foo/bar');
```

If you would like, you can set this up via [taskcluster-lib-loader](https://github.com/taskcluster/taskcluster-lib-loader) as follows:

```js
{
  libUrlss: {
    require: ['cfg'],
    setup: ({cfg}) => withRootUrl(cfg.rootURl),
  },
}
```

Go Usage
--------

The go package exports the following functions:

```go
func API(rootURL string, service string, version string, path string) string
func APIReference(rootURL string, service string, version string) string
func Docs(rootURL string, path string) string
func ExchangeReference(rootURL string, service string, version string) string
func Schema(rootURL string, service string, name string) string
func UI(rootURL string, path string) string
```

Python Usage
--------

You can install the python client with `pip install taskcluster-urls`;

```python
import taskcluster_urls

taskcluster_urls.api(root_url, 'auth', 'v1', 'foo/bar')
taskcluster_urls.schema(root_url, 'auth', 'v1/foo.yml') # Note that schema names have versions in them
taskcluster_urls.api_reference(root_url, 'auth', 'v1')
taskcluster_urls.exchange_reference(root_url, 'auth', 'v1')
taskcluster_urls.ui(root_url, 'foo/bar')
taskcluster_urls.docs(root_url, 'foo/bar')
```

Testing
-------

`yarn install` and `yarn test`.

Hacking
-------

New releases should be tested on Travis to allow for all supported versions of Node to be tested. Once satisfied that it works, new versions should be created with
`yarn version` rather than by manually editing `package.json` and tags should be pushed to Github. Make sure to update [the changelog](https://github.com/taskcluster/taskcluster-lib-urls/releases)!

License
-------

[Mozilla Public License Version 2.0](https://github.com/taskcluster/taskcluster-lib-urls/blob/master/LICENSE)
