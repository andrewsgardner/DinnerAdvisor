// load gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
      rename: {
        'gulp-live-reload': 'serve'
      }
    });

// start watching: run "gulp"
gulp.task('default', ['watch']);

// run "gulp server"
gulp.task('server', ['serve', 'watch']);

// minify custom js: run manually with: "gulp build-js"
gulp.task('build-js', function(){
  return gulp.src('src/js/app/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.uglify({
      output: {
        'ascii_only': true
      }
    }))
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(gulp.dest('dist/js'));
});

// compile less to css: run manually with: "gulp build-css"
gulp.task('build-css', function(){
  return gulp.src('src/less/main.less')
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .on('error', function(err){
      gutil.log(err);
      this.emit('end');
    })
    .pipe(plugins.autoprefixer({
      browsers: [
        '> 1%',
        'last 2 versions',
        'firefox >= 4',
        'safari 7',
        'safari 8',
        'IE 8',
        'IE 9',
        'IE 10',
        'IE 11'
      ],
    cascade: false
    }))
    .pipe(plugins.cssmin())
    .pipe(gulp.dest('dist/css')).on('error', gutil.log);
});

// default task
gulp.task('watch', function(){
  gulp.watch('src/js/app/**/*.js', ['build-js']);
  gulp.watch('src/less/**/*.less', ['build-css']);
});

// livereload server at: http://localhost:3000
gulp.task('serve', function(){
  var server = plugins.serve.static('/', 3000);
  server.start();
  gulp.watch(['dist/*'], function(file){
    server.notify.apply(server, [file]);
  });
});
