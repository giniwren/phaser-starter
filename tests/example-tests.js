global.window = {};

const assert = require('assert');

describe('Test Data', function () {
  var testGameData = require('./mocks/example');

  it('runs a test', function() {
    assert.equal(testGameData.example, 'test data');
  });
});
