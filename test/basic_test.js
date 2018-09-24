const fs = require('fs');
const path = require('path');
const assert = require('assert');
const yaml = require('js-yaml');
const libUrls = require('../');

const SPEC_FILE = path.join(__dirname, '../tests.yml');

suite('basic test', function() {
  var doc = yaml.safeLoad(fs.readFileSync(SPEC_FILE, {encoding: 'utf8'}));
  for (let test of doc['tests']) {
    for (let argSet of test['argSets']) {
      for (let cluster of Object.keys(doc['rootURLs'])) {
        for (let rootURL of doc['rootURLs'][cluster]) {
          assert.equal(test['expected'][cluster], libUrls.withRootUrl(rootURL)[test['function']](...argSet));
          assert.equal(test['expected'][cluster], libUrls[test['function']](rootURL, ...argSet));
        }
      }
    }
  }
});
