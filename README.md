# gulp-vapor

[![Build Status](https://travis-ci.org/mckomo/gulp-vapor.svg)](https://travis-ci.org/mckomo/gulp-vapor)

[Gulp](http://gulpjs.com/) task suite for [Vapor](http://qutheory.io/) web framework.


Use `gulp-vapor` to **hot-reaload** your [Vapor](http://qutheory.io/) project (see [Usage](#usage)).

### Installation

Install `gulp-vapor` via npm:

```
$ npm install gulp-vapor
```

or:

```
$ npm install --save-dev gulp-vapor
```

if you already have `package.json` file.

### Usage

##### Reload project when a source code changes

Modify your `gulpfile.js` to include following parts:

```js
'use strict';

var gulp = require('gulp');
var vapor = require('gulp-vapor');

gulp.task('vapor:start', vapor.start);
gulp.task('vapor:reload', vapor.reload);

gulp.task('watch', function() {
   gulp.watch('./Sources/**/*', ['vapor:reload']);
});


gulp.task('default', ['vapor:start', 'watch']);
```

then just run `gulp` and enjoy automated project recompilation.

```
$ gulp
```

By now, you should be able to see you project running in a browser at [http://localhost:8080](http://localhost:8080/). From now on, If you change something in your `App` folder, project will **reload automatically**.

### Configuration

If your project requires special configuration during  

```js
var vapor = require('gulp-vapor');

vapor.config.commands.build = 'swift build --some-flag';
vapor.config.commands.start = ['.build/debug/gulp-vapor', ['serve', '--port=80']];
```

### Compatiblity

* **v1.1.x** - 2016/09/10:

	`gulp-vapor` is compatible with **Vapor 1.0.x**.

* **v1.0.6** - 2016/05/22:

	`gulp-vapor` is compatible with **Vapor 0.8.x**.
