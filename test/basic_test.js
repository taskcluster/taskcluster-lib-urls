const fs = require('fs');
const path = require('path');
const assert = require('assert');
const yaml = require('js-yaml');
const libUrls = require('../');

const SPEC_FILE = path.join(__dirname, '../tests.yml');
const TESTS = yaml.safeLoad(fs.readFileSync(SPEC_FILE, {encoding: 'utf8'}));

suite('basic test', function() {
  for (let t of TESTS['tests']) {
    for (let argSet of t['argSets']) {
      for (let cluster of Object.keys(TESTS['rootURLs'])) {
        for (let rootURL of TESTS['rootURLs'][cluster]) {
          test(`${t['function']} - ${argSet}`, function() {
            assert.equal(t['expected'][cluster], libUrls.withRootUrl(rootURL)[t['function']](...argSet));
            assert.equal(t['expected'][cluster], libUrls[t['function']](rootURL, ...argSet));  
          });
        }
      }
    }
  }
});

suite('normalization', function() {
  const correct = TESTS.rootURLs['new'][0];
  for (let rootUrl of TESTS.rootURLs['new']) {
    test(`normalize ${rootUrl}`, function() {
      assert.equal(libUrls.normalizeRootUrl(rootUrl), correct);
    });
  }
});
