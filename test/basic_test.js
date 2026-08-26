const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const yaml = require('js-yaml');
const libUrls = require('../');

const SPEC_FILE = path.join(__dirname, '../tests.yml');
const TESTS = yaml.load(fs.readFileSync(SPEC_FILE, { encoding: 'utf8' }));

suite('basic test', () => {
  for (const t of TESTS.tests) {
    for (const argSet of t.argSets) {
      for (const cluster of Object.keys(TESTS.rootURLs)) {
        for (const rootURL of TESTS.rootURLs[cluster]) {
          test(`${t.function} - ${argSet}`, () => {
            assert.equal(t.expected[cluster], libUrls.withRootUrl(rootURL)[t.function](...argSet));
            assert.equal(t.expected[cluster], libUrls[t.function](rootURL, ...argSet));
          });
        }
      }
    }
  }
});

suite('normalization', () => {
  const correct = TESTS.rootURLs.new[0];
  for (const rootUrl of TESTS.rootURLs.new) {
    test(`normalize ${rootUrl}`, () => {
      assert.equal(libUrls.normalizeRootUrl(rootUrl), correct);
    });
  }
});
