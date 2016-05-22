# gulp-vapor

[![Build Status](https://travis-ci.org/mckomo/gulp-vapor.svg)](https://travis-ci.org/mckomo/gulp-vapor)

[Gulp](http://gulpjs.com/) task suite for [Vapor](http://qutheory.io/) web framework.

Use `gulp-vapor` to **automate project recompilation** after source code change (see [Usage](#usage)).

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

##### Reload project when a source file changes

Modify your `gulpfile.js` to include following parts:

```js
'use strict';

let gulp = require('gulp');
let vapor = require('gulp-vapor');

gulp.task('vapor:start', vapor.start);
gulp.task('vapor:reload', vapor.reload);

gulp.task('watch', () => {
   gulp.watch('./App/**/*', ['vapor:reload']);
});


gulp.task('default', ['vapor:start', 'watch']);
```

then just run `gulp` and enjoy automated project recompilation.

```
$ gulp
```

By now, you should be able to see you project running in a browser at [http://localhost:8080](http://localhost:8080/). From now on, If you change something in your `App` folder, project will **reload automatically**.



