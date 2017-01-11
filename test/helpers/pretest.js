'use strict';
const testSupport = require('./test-support');
const path = require('path');
const sandboxDir = path.resolve(__dirname, '../sandbox/');

testSupport.givenEmptySandbox(sandboxDir, function(err) {
  if (err) throw err;
});