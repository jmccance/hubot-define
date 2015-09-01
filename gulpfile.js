var del = require('del');
var gulp = require('gulp');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var rename = require('gulp-regex-rename');
var gutil = require('gutil');
var _ = require('lodash');
var path = require('path');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var paths = {
  source: 'src/**/*.js',
  target: 'scripts'
};

// Tasks ////////////////////////////////////////////////////////////

gulp.task('clean', function(cb) {
  del([
   paths.target + './*'
  ],
  { force: true },
  cb);
});

gulp.task('lint', function () {
  return gulp.src(paths.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('compile', function() {
  return gulp.src(paths.source)
    .pipe(babel())
    .pipe(gulp.dest(paths.target));
});

gulp.task('default', ['clean', 'lint', 'compile']);
