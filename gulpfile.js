var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');

var lessOrigin = './src/less/*.less',
    cssDest = './dist/css';

// compile less into css
gulp.task('build-css', function(){
  return gulp.src(lessOrigin)
  .pipe(concat('main.css'))
  .pipe(less())
  .pipe(cssmin())
  .pipe(gulp.dest(cssDest));
});

// watch for changes
gulp.task('watch', function(){
  gulp.watch('./src/less/**/*.less', ['build-css']);
});

// perform all tasks with the command: gulp
gulp.task('default', [
  'watch',
  'build-css'
]);
