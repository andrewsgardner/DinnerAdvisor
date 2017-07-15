var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var lessOrigin = './src/less/*.less',
    cssDest = './dist/css';

var jsAppOrigin = './src/js/app/**/*.js',
    jsAppDest = './dist/js/app';

var jsLibOrigin = './src/js/lib/**/*.js',
    jsLibDest = './dist/js/lib';

// compile less into css
gulp.task('build-css', function(){
  return gulp.src(lessOrigin)
  .pipe(concat('main.css'))
  .pipe(less())
  .pipe(gulp.dest(cssDest));
});

// concatenate and uglify app js
gulp.task('build-js-app', function(){
  return gulp.src(jsAppOrigin)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(jsAppDest))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsAppDest));
});

// copy js libs
gulp.task('build-js-lib', function(){
  gulp.src(jsLibOrigin)
    .pipe(gulp.dest(jsLibDest));
});

// watch for changes
gulp.task('watch', function(){
  gulp.watch('./src/less/**/*.less', ['build-css']);
  gulp.watch('./src/js/app/**/*.js', ['build-js-app']);
  gulp.watch('./src/js/lib/**/*js', ['build-js-lib']);
});

// perform all tasks with the command: gulp
gulp.task('default', ['watch', 'build-css', 'build-js-app', 'build-js-lib']);
