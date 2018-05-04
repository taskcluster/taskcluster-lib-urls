Taskcluster URL Building Library
================================

[![Build Status](https://travis-ci.org/taskcluster/taskcluster-lib-urls.svg?branch=master)](https://travis-ci.org/taskcluster/taskcluster-lib-urls)
[![npm](https://img.shields.io/npm/v/taskcluster-lib-urls.svg?maxAge=2592000)](https://www.npmjs.com/package/taskcluster-lib-urls)
[![License](https://img.shields.io/badge/license-MPL%202.0-orange.svg)](http://mozilla.org/MPL/2.0)

A simple library to generate urls for various Taskcluster resources across our various deployment methods.

This serves as both a simple shim for projects that use javascript but also is the reference implementation for
how we define these paths.

Changelog
---------
View the changelog on the [releases page](https://github.com/taskcluster/taskcluster-lib-urls/releases).

Requirements
------------

This is tested on and should run on any of node `{8, 10}`.

Usage
-----

```js
const tcUrl = require('taskcluster-lib-url');
tcUrl.ui(rootUrl, 'foo/bar');
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
