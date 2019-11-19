---
title: Taskcluster URL Format
order: 10
---

# RootUrl

A Taskcluster `rootUrl` is a partial web address containing at least the scheme, host, and optionally a port. It cannot specify a path.

Example:

```
https://taskcluster.example.com
```

Normally, a rootUrl has no trailing `/` characters.
We suggest that libraries and tools be lenient and accept rootUrls containing a trailing `/`, but produce rootUrls without a trailing `/`.
The `normalizeRootUrl` function supports this practice.

# URLs

Taskcluster uses URLs with the following pattern:

| method | result |
| --- | --- |
| api(rootUrl, service, version, path) | `<rootUrl>/api/<service>/<version>/<path>` |
| apiReference(rootUrl, service, version) | `<rootUrl>/references/<service>/<version>/api.json` |
| docs(rootUrl, path) | `<rootUrl>/docs/<path>` |
| exchangeReference(rootUrl, service, version) | `<rootUrl>/references/<service>/<version>/exchanges.json` |
| schema(rootUrl, service, schema) | `<rootUrl>/schemas/<service>/<schema>` |
| apiSchema(rootUrl, version) | `<rootUrl>/schemas/common/api-reference-<version>.json` |
| exchangesSchema(rootUrl, version) | `<rootUrl>/schemas/common/exchanges-reference-<version>.json` |
| apiManifestSchema(rootUrl, version) | `<rootUrl>/schemas/common/manifest-<version>.json` |
| metadataMchema(rootUrl) | `<rootUrl>/schemas/common/metadata-metaschema.json` |
| ui(rootUrl, path) | `<rootUrl>/<path>` |
| apiManifest(rootUrl) | `<rootUrl>/references/manifest.json` |

*NOTE*: you should *always* use this library to generate URLs, rather than
hard-coding any of the above patterns.

