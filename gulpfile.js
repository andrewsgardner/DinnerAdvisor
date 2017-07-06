var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var lessOrigin = './src/less/*.less',
    cssDest = './dist/css';

var jsOrigin = './src/js/app/**/*.js',
    jsDest = './dist/js/app';

// compile less into css
gulp.task('build-css', function(){
  return gulp.src(lessOrigin)
  .pipe(concat('main.css'))
  .pipe(less())
  .pipe(gulp.dest(cssDest));
});

// concatenate and uglify js
gulp.task('build-js', function(){
  return gulp.src(jsOrigin)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest));
});

// watch for changes
gulp.task('watch', function(){
  gulp.watch('./src/less/**/*.less', ['build-css']);
  gulp.watch('./src/js/app/**/*.js', ['build-js']);
});

// perform all tasks with the command: gulp
gulp.task('default', ['watch', 'build-css', 'build-js']);
