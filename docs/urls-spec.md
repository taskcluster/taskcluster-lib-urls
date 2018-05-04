---
title: Specific paths for various Taskcluster resources
order: 10
---

A Taskcluster `rootUrl` is a partial web address containing at least the scheme, host, and optionally a port. In addition, it can optionally specify a
path which will end up being a prefix for all other resources.

Examples:

```
https://taskcluster.example.com
https://taskcluster.example.com/cluster1
https://example.com/
https://example.com/cluster2
```

At a given `rootUrl`, the following resources will exist:

`$rootUrl/<path>`: At the root, the ui will be served.
`$rootUrl/docs/<path>`: The taskcluster documentation site.
`$rootUrl/references/<service>/<version>/api.json`: A reference for the api exposed by a service.
`$rootUrl/references/<service>/<version>/exchanges.json`: A reference for exchanges published by a service.
`$rootUrl/schemas/<service>/<version>/<schema>`: A schema associated with a service.
`$rootUrl/api/<service>/<version>/<path>`: All services will be routed to under the prefix of `api` with the service name and version in the path as well.
