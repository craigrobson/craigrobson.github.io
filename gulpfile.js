var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')();

// Error notifications for plumber
var plumber_error = function(err) {
  plugin.notify.onError({
    title: "Error",
    message: "Error: <%= error.message %>"
  })(err);
  console.log('Error!');
  this.emit('end');
}

// `gulp`
gulp.task('default', [
  'scss',
  'js',
  'watch'
]);

// `gulp scss`
gulp.task('scss', function() {

  gulp.src('scss/*.scss')
    .pipe(plugin.plumber({
      errorHandler: plumber_error
    }))
    .pipe(plugin.sass({
      includePaths: [
        'node_modules/foundation-sites/scss',
        'node_modules/motion-ui/src'
      ]
    }).on('error', plugin.sass.logError))
    .pipe(plugin.autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(plugin.cleanCss())
    .pipe(plugin.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
})

// gulp js
gulp.task('js', function() {
  gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/foundation-sites/dist/js/foundation.js'
  ])
    .pipe(plugin.plumber({ errorHandler: plumber_error }))
    .pipe(plugin.babel({
      presets: ['env']
    }))
    .pipe(plugin.concat('vendors.js'))
    .pipe(gulp.dest('js'))
    .pipe(plugin.uglify())
    .pipe(plugin.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js'))
});

// `gulp watch`
gulp.task('watch', function() {
  gulp.watch('scss/*.scss', ['scss']);
});
