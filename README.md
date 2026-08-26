# Taskcluster URL Building Library

[![License](https://img.shields.io/badge/license-MPL%202.0-orange.svg)](http://mozilla.org/MPL/2.0)

A simple library to generate URLs for various Taskcluster resources across our various deployment methods.

This serves as both a simple shim for projects that use JavaScript but also is the reference implementation for
how we define these paths.

URLs are defined in the '[Taskcluster URL Format](https://docs.taskcluster.net/docs/reference/url-structure).

Changelog
---------
View the changelog on the [releases page](https://github.com/taskcluster/taskcluster-lib-urls/releases).

Requirements
------------

This is tested on and should run on any of Node.js `{8, 10}`.

General Usage
-------------

While the capitalization and punctunation of the function names varies depending on the language, each language provides the following methods:

| method | result |
| --- | --- |
| api(rootUrl, service, version, path) -> | `<rootUrl>/api/<service>/<version>/<path>` |
| apiReference(rootUrl, service, version) -> | `<rootUrl>/references/<service>/<version>/api.json` |
| docs(rootUrl, path) -> | `<rootUrl>/docs/<path>` |
| exchangeReference(rootUrl, service, version) -> | `<rootUrl>/references/<service>/<version>/exchanges.json` |
| schema(rootUrl, service, schema) -> | `<rootUrl>/schemas/<service>/<schema>` |
| apiSchema(rootUrl, version) -> | `<rootUrl>/schemas/common/api-reference-<version>.json` |
| exchangesSchema(rootUrl, version) -> | `<rootUrl>/schemas/common/exchanges-reference-<version>.json` |
| apiManifestSchema(rootUrl, version) -> | `<rootUrl>/schemas/common/manifest-<version>.json` |
| metadataMchema(rootUrl) -> | `<rootUrl>/schemas/common/metadata-metaschema.json` |
| ui(rootUrl, path) -> | `<rootUrl>/<path>` |
| apiManifest(rootUrl) -> | `<rootUrl>/references/manifest.json` |
| normalizeRootUrl(rootUrl) -> | the normal form of the given rootUrl |
| testRootUrl() -> | `https://tc-tests.example.com` |

`testRootUrl()` is used to share a common fake `rootUrl` between various Taskcluster mocks in testing.
The URL does not resolve.

JS Usage
--------
[![Node.js Build Status](https://travis-ci.org/taskcluster/taskcluster-lib-urls.svg?branch=main)](https://travis-ci.org/taskcluster/taskcluster-lib-urls)
[![npm](https://img.shields.io/npm/v/taskcluster-lib-urls.svg?maxAge=2592000)](https://www.npmjs.com/package/taskcluster-lib-urls)

This package exports several methods for generating URLs conditionally based on
a root URL, as well as a few helper classes for generating URLs for a pre-determined
root URL:

* `api(rootUrl, service, version, path)` -> `String`
* `apiReference(rootUrl, service, version)` -> `String`
* `docs(rootUrl, path)` -> `String`
* `exchangeReference(rootUrl, service, version)` -> `String`
* `schema(rootUrl, service, schema)` -> `String`
* `apiManifestSchema(rootUrl, version)` -> `String`
* `apiReferenceSchema(rootUrl, version)` -> `String`
* `exchangesReferenceSchema(rootUrl, version)` -> `String`
* `metadataMetaschema(rootUrl)` -> `String`
* `ui(rootUrl, path)` -> `String`
* `apiManifest(rootUrl)` -> `String`
* `testRootUrl()` -> `String`
* `withRootUrl(rootUrl)` -> `Class` instance for above methods
* `normalizeRootUrl(rootUrl)` -> `String` (the "normalized" form of the given rootUrl)

```js
// Specifying root URL every time:
const libUrls = require('taskcluster-lib-urls');

libUrls.api(rootUrl, 'auth', 'v1', 'foo/bar');
libUrls.schema(rootUrl, 'auth', 'v1/foo.yml'); // Note that schema names have versions in them
libUrls.apiReference(rootUrl, 'auth', 'v1');
libUrls.exchangeReference(rootUrl, 'auth', 'v1');
libUrls.ui(rootUrl, 'foo/bar');
libUrls.apiManifest(rootUrl);
libUrls.docs(rootUrl, 'foo/bar');
```

```js
// Specifying root URL in advance:
const libUrls = require('taskcluster-lib-urls');

const urls = libUrls.withRoot(rootUrl);

urls.api('auth', 'v1', 'foo/bar');
urls.schema('auth', 'v1/foo.yml');
urls.apiReference('auth', 'v1');
urls.exchangeReference('auth', 'v1');
urls.ui('foo/bar');
urls.apiManifest();
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

Test with:

```
yarn install
yarn test
```


Go Usage
--------

[![GoDoc](https://godoc.org/github.com/taskcluster/taskcluster-lib-urls?status.svg)](https://godoc.org/github.com/taskcluster/taskcluster-lib-urls)

Add it to your project with:

```sh
go get github.com/taskcluster/taskcluster-lib-urls/v13
```

```go
import tcurls "github.com/taskcluster/taskcluster-lib-urls/v13"
```

Note the `/v13` suffix: Go requires the module path to carry the major version for
v2 and above.

The go package exports the following functions:

```go
func API(rootURL string, service string, version string, path string) string
func APIReference(rootURL string, service string, version string) string
func Docs(rootURL string, path string) string
func ExchangeReference(rootURL string, service string, version string) string
func Schema(rootURL string, service string, name string) string
func APIManifestSchema(rootURL string, version string) string
func APIReferenceSchema(rootURL string, version string) string
func ExchangesReferenceSchema(rootURL string, version string) string
func MetadataMetaschema(rootURL string) string
func UI(rootURL string, path string) string
func APIManifest(rootURL string) string
func NormalizeRootURL(rootURL string) string
```

Install with:

```
go install ./..
```

Test with:

```
go test -v ./...
```

Python Usage
------------

You can install the python client with `pip install taskcluster-urls`;

```python
import taskcluster_urls

taskcluster_urls.api(root_url, 'auth', 'v1', 'foo/bar')
taskcluster_urls.schema(root_url, 'auth', 'v1/foo.yml') # Note that schema names have versions in them
taskcluster_urls.api_manifest_schema(root_url, 'v1')
taskcluster_urls.api_reference_schema(root_url, 'v1')
taskcluster_urls.exchanges_reference_schema(root_url, 'v1')
taskcluster_urls.metadata_metaschema(root_url, 'v1')
taskcluster_urls.api_reference(root_url, 'auth', 'v1')
taskcluster_urls.exchange_reference(root_url, 'auth', 'v1')
taskcluster_urls.ui(root_url, 'foo/bar')
taskcluster_urls.apiManifest(root_url)
taskcluster_urls.docs(root_url, 'foo/bar')
taskcluster_urls.normalize_root_url(root_url)
taskcluster_urls.test_root_url()
```

Test with:

```
tox
```

Java Usage
----------

[![JavaDoc](https://img.shields.io/badge/javadoc-reference-blue.svg)](http://taskcluster.github.io/taskcluster-lib-urls/apidocs)

In order to use this library from your maven project, simply include it as a project dependency:

```
<project>
  ...
  <dependencies>
    ...
    <dependency>
      <groupId>org.mozilla.taskcluster</groupId>
      <artifactId>taskcluster-lib-urls</artifactId>
      <version>1.0.0</version>
    </dependency>
  </dependencies>
</project>
```

The taskcluster-lib-urls artifacts are now available from the [maven central repository](http://central.sonatype.org/):

* [Search Results](http://search.maven.org/#search|gav|1|g%3A%22org.mozilla.taskcluster%22%20AND%20a%3A%22taskcluster-lib-urls%22)
* [Directory Listing](https://repo1.maven.org/maven2/org/mozilla/taskcluster/taskcluster-lib-urls/)

To use the library, do as follows:

```java
import org.mozilla.taskcluster.urls.*;

...

    URLProvider urlProvider = URLs.provider("https://mytaskcluster.acme.org");

    String fooBarAPI        = urlProvider.api("auth", "v1", "foo/bar");
    String fooSchema        = urlProvider.schema("auth", "v1/foo.yml"); // Note that schema names have versions in them
    String apiSchema        = urlProvider.apiReferenceSchema("v1");
    String exchangesSchema  = urlProvider.exchangesReferenceSchema("v1");
    String manifestSchema   = urlProvider.apiManifestSchema("v1");
    String metaschema       = urlProvider.metadataMetaschema();
    String authAPIRef       = urlProvider.apiReference("auth", "v1");
    String authExchangesRef = urlProvider.exchangeReference("auth", "v1");
    String uiFooBar         = urlProvider.ui("foo/bar");
    String apiManifest      = urlProvider.apiManifest();
    String docsFooBar       = urlProvider.docs("foo/bar");

...
```

Install with:

```
mvn install
```

Test with:

```
mvn test
```


Releasing
---------

There is no publish automation — `.taskcluster.yml` only runs the test tasks. Every step
below is manual, and each ecosystem is published separately.

Make the Node release first, as Python reads its version from `package.json`.

### Node / npm

```sh
npm version minor  # or patch, or major
git push upstream --follow-tags
npm publish
```

Use `npm version` rather than editing `package.json` by hand. `--follow-tags` matters: a
plain `git push` will not push the tag `npm version` just created, and both the GitHub
release and Go consumers depend on that tag.

### Go

Go consumers resolve the pushed git tag directly, so there is no separate publish step.
When making a **major** version bump you must also update the module path in `go.mod` to
match (`.../v13` -> `.../v14`) in the same commit, or Go will reject the new tag with
`module path must match major version`.

### Python / PyPI

Requires being one of the [maintainers on PyPI](https://pypi.org/project/taskcluster-urls/#files).
The version is read from `package.json`, so there is nothing to bump here.

```sh
rm -rf dist build *.egg-info
python3 -m pip install --upgrade build twine
python3 -m build
twine check dist/*
twine upload dist/*
```

### Java / Maven

Versioned independently in `pom.xml` and released to Maven Central on its own schedule;
it does not track the npm version.

Make sure to update [the changelog](https://github.com/taskcluster/taskcluster-lib-urls/releases)!

License
-------

[Mozilla Public License Version 2.0](https://github.com/taskcluster/taskcluster-lib-urls/blob/main/LICENSE)
