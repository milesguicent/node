'use strict';
require('../common');
const assert = require('assert');
const fixtures = require('../common/fixtures');
const { execFileSync } = require('child_process');

const node = process.argv[0];

execFileSync(node, [fixtures.path('es-modules', 'test-esm-ok.mjs')]);
execFileSync(node, [fixtures.path('es-modules', 'noext')]);
execFileSync(node, ['--experimental-ext', 'ts', fixtures.path('es-modules', 'noext-ts')]);
execFileSync(node, ['--experimental-ext', 'cts', fixtures.path('es-modules', 'noext-ts')]);

// when dealing with files without extentions, the `--experimental-ext` option
// should behave as if we specified an extention, so specifying a js extention
// on a ts file should result in an error
assert.throws(
  () => execFileSync(node, ['--experimental-ext', 'cjs', fixtures.path('es-modules', 'noext-ts')]),
  (err) => err.message.startsWith('Command failed:')
);
