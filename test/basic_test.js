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

  test('ui', function() {
    const desiredUrl = `${rootUrl}/foo/bar`;
    assert.equal(tcUrl.ui(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', '/foo/bar'), desiredUrl);
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

  test('ui', function() {
    const desiredUrl = 'https://tools.taskcluster.net/foo/bar';
    assert.equal(tcUrl.ui(rootUrl, 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', 'foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl, '/foo/bar'), desiredUrl);
    assert.equal(tcUrl.ui(rootUrl + '/', '/foo/bar'), desiredUrl);
  });
});
