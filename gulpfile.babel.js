'use strict';

import gulp from 'gulp';
import vapor from './scripts/index';

gulp.task('vapor:start', vapor.start);
gulp.task('vapor:reload', vapor.reload);

gulp.task('watch', () => {
   gulp.watch('./Sources/**/*', ['vapor:reload']);
});


gulp.task('default', ['vapor:start', 'watch']);
