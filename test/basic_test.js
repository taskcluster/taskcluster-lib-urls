const assert = require('assert');
const tcUrl = require('../');

suite('redeployability', function() {
  const rootUrl = 'https://taskcluster.example.com';

  test('docs', function() {
    const desiredUrl = `${rootUrl}/docs/foo/bar`;
    assert.equal(tcUrl.docs(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl + '/', '/foo/bar'), desiredUrl);
  });

  test('api', function() {
    const desiredUrl = `${rootUrl}/api/auth/v1/foo/bar`;
    assert.equal(tcUrl.api(rootUrl, 'auth', 'v1', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl + '/', 'auth', 'v1', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl, 'auth', 'v1', '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl + '/', 'auth', 'v1', '/foo/bar'), desiredUrl);
  });

  test('schemas', function() {
    const desiredUrl = `${rootUrl}/schemas/auth/v1/something.yml`;
    assert.equal(tcUrl.schema(rootUrl, 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl + '/', 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl, 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl + '/', 'auth', 'v1/something.yml'), desiredUrl);
  });

  test('api references', function() {
    const desiredUrl = `${rootUrl}/references/auth/v1/api.json`;
    assert.equal(tcUrl.apiReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
  });

  test('exchange references', function() {
    const desiredUrl = `${rootUrl}/references/auth/v1/exchanges.json`;
    assert.equal(tcUrl.exchangeReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
  });

  test('ui', function() {
    const desiredUrl = `${rootUrl}/foo/bar`;
    assert.equal(tcUrl.ui(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', '/foo/bar'), desiredUrl);
  });

  test('test root url', function() {
    assert.equal(tcUrl.testRootUrl(), 'https://tc-tests.localhost');
  });
});

suite('heroku', function() {
  const rootUrl = 'https://taskcluster.net';

  test('docs', function() {
    const desiredUrl = 'https://docs.taskcluster.net/foo/bar';
    assert.equal(tcUrl.docs(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.docs(rootUrl + '/', '/foo/bar'), desiredUrl);
  });

  test('api', function() {
    const desiredUrl = 'https://auth.taskcluster.net/v1/foo/bar';
    assert.equal(tcUrl.api(rootUrl, 'auth', 'v1', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl + '/', 'auth', 'v1', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl, 'auth', 'v1', '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.api(rootUrl + '/', 'auth', 'v1', '/foo/bar'), desiredUrl);
  });

  test('schemas', function() {
    const desiredUrl = 'https://schemas.taskcluster.net/auth/v1/something.yml';
    assert.equal(tcUrl.schema(rootUrl, 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl + '/', 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl, 'auth', 'v1/something.yml'), desiredUrl);
    assert.equal(tcUrl.schema(rootUrl + '/', 'auth', 'v1/something.yml'), desiredUrl);
  });

  test('api references', function() {
    const desiredUrl = 'https://references.taskcluster.net/auth/v1/api.json';
    assert.equal(tcUrl.apiReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.apiReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
  });

  test('exchange references', function() {
    const desiredUrl = 'https://references.taskcluster.net/auth/v1/exchanges.json';
    assert.equal(tcUrl.exchangeReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl, 'auth', 'v1'), desiredUrl);
    assert.equal(tcUrl.exchangeReference(rootUrl + '/', 'auth', 'v1'), desiredUrl);
  });

  test('ui', function() {
    const desiredUrl = 'https://tools.taskcluster.net/foo/bar';
    assert.equal(tcUrl.ui(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', '/foo/bar'), desiredUrl);
  });
});
