const fs = require('fs');
const path = require('path');
const assert = require('assert');
const yaml = require('js-yaml');
const libUrls = require('../');

const SPEC_FILE = path.join(__dirname, '../specification.yml');
const ROOT_URL = 'https://taskcluster.example.com';
const OLD_ROOT_URL = 'https://taskcluster.net';

suite('basic test', function() {
  yaml.safeLoad(fs.readFileSync(SPEC_FILE, {encoding: 'utf8'})).specs.forEach(testCase => {
    const {type, expectedUrl, oldExpectedUrl, argSets} = testCase;

    test(expectedUrl, function() {
      const w = libUrls.withRootUrl(ROOT_URL);
      const ws = libUrls.withRootUrl(ROOT_URL + '/');

      argSets.forEach(args => {
        assert.equal(expectedUrl, libUrls[type](ROOT_URL, ...args));
        assert.equal(expectedUrl, libUrls[type](ROOT_URL + '/', ...args));
        assert.equal(expectedUrl, w[type](...args));
        assert.equal(expectedUrl, ws[type](...args));
      });
    });

    test(oldExpectedUrl, function() {
      const w = libUrls.withRootUrl(OLD_ROOT_URL);
      const ws = libUrls.withRootUrl(OLD_ROOT_URL + '/');

      argSets.forEach(args => {
        assert.equal(oldExpectedUrl, libUrls[type](OLD_ROOT_URL, ...args));
        assert.equal(oldExpectedUrl, libUrls[type](OLD_ROOT_URL + '/', ...args));
        assert.equal(oldExpectedUrl, w[type](...args));
        assert.equal(oldExpectedUrl, ws[type](...args));
      });
    });
  });
});
