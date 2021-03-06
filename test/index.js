'use strict';

var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var askName = require('../lib');

describe('inquirer-npm-name', function () {
  beforeEach(function () {
    this.conf = {
      name: 'name',
      message: 'Module name'
    };

    this.inquirer = {
      prompt: sinon.stub()
    };
  });

  it('only ask name if name is free', function (done) {
    this.inquirer.prompt.callsArgWith(1, {name: 'foo'});

    askName(this.conf, this.inquirer, function (val) {
      assert.equal(val, 'foo');
      done();
    });
  });

  it('recurse if name is taken', function (done) {
    this.inquirer.prompt
      .onFirstCall().callsArgWith(1, {name: 'foo', askAgain: true})
      .onSecondCall().callsArgWith(1, {name: 'bar'});

    askName(this.conf, this.inquirer, function (val) {
      assert.equal(val, 'bar');
      done();
    });
  });

  describe('npm validation logic (inquirer `when` function)', function () {
    beforeEach(function () {
      var askName2 = proxyquire('../lib', {
        'npm-name': function (name, cb) {
          cb.apply(null, this.npmNameMock);
        }.bind(this)
      });
      askName2(this.conf, this.inquirer, function () {});

      this.when = this.inquirer.prompt.getCall(0).args[0][1].when;
    });

    it('ask question if npm name is taken', function (done) {
      this.npmNameMock = [null, false];
      this.when.call({
        async: function () {
          return function (shouldAsk) {
            assert.ok(shouldAsk);
            done();
          };
        }
      }, {name: 'foo'});
    });

    it('does not ask question if npm name is free', function (done) {
      this.npmNameMock = [null, true];
      this.when.call({
        async: function () {
          return function (shouldAsk) {
            assert.equal(shouldAsk, null);
            done();
          };
        }
      }, {name: 'foo'});
    });

    it('does not ask if npm-name fails', function (done) {
      this.npmNameMock = [new Error('network failure')];
      this.when.call({
        async: function () {
          return function (shouldAsk) {
            assert.equal(shouldAsk, null);
            done();
          };
        }
      }, {name: 'foo'});
    });
  });
});
