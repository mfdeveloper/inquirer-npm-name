# inquirer-npm-name [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

Helper function using [inquirer](https://github.com/SBoudrias/Inquirer.js) to validate a value provided in a prompt does not exist as a npm package.

If the value is already used as a npm package, then the users will be prompted and asked if they want to choose another one. If so, we'll recurse through the same validation process until we have a name that is unused on the npm registry. This is a helper to catch naming issue in advance, it is not a validation rule as the user can always decide to continue with the same name.

## Install

```sh
$ npm install --save inquirer-npm-name
```


## Usage

```js
var inquirer = require('inquirer');
var askName = require('inquirer-npm-name');

askName({
  name: 'name',
  message: 'Module Name'
}, inquirer, function (name) {
  console.log(name);
});
```

Inside a **Yeoman Generator** you'd call it this way:

```js
var generators = require('yeoman-generator');
var inquirer = require('inquirer');
var askName = require('inquirer-npm-name');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    askName({
      name: 'name',
      message: 'Module Name'
    }, this, function (name) {
      console.log(name);
      done();
    });
  }
});
```

`askName` takes 3 parameters:

1. `prompt` an [Inquirer prompt configuration](https://github.com/SBoudrias/Inquirer.js#question).
2. `inquirer` or any object with a `obj.prompt()` method.
3. The `callback` who'll take the selected name as parameter.

## License

MIT © [Simon Boudrias](http://twitter.com/vaxilart)


[npm-image]: https://badge.fury.io/js/inquirer-npm-name.svg
[npm-url]: https://npmjs.org/package/inquirer-npm-name
[travis-image]: https://travis-ci.org/SBoudrias/inquirer-npm-name.svg?branch=master
[travis-url]: https://travis-ci.org/SBoudrias/inquirer-npm-name
[daviddm-image]: https://david-dm.org/SBoudrias/inquirer-npm-name.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/SBoudrias/inquirer-npm-name
[coveralls-image]: https://coveralls.io/repos/SBoudrias/inquirer-npm-name/badge.svg
[coveralls-url]: https://coveralls.io/r/SBoudrias/inquirer-npm-name
