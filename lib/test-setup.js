'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var chaiSubset = require('chai-subset');
var winston = require('winston');

before(function() {
  chai.use(chaiSubset);
  chai.use(sinonChai);

  if (winston.remove) {
    try {
      winston.remove(winston.transports && winston.transports.Console);
    } catch (_) {
      try { winston.remove('console'); } catch (_) {}
    }
  }
});

beforeEach(function() {
  this.sandbox = sinon.createSandbox();
});

afterEach(function() {
  this.sandbox.restore();
});
