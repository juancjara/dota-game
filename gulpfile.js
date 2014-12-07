var gulp = require('gulp');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
minifyCSS = require('gulp-minify-css');
//var react = require('gulp-react');

var stylusDir = './assets/styles/src/*.styl';
var jsxDir = './assets/js/src/*.js';
var coffeeDir = './assets/js/src/*.coffee';

gulp.task('css', function () {
  gulp.src(stylusDir)
      .pipe(stylus({compress: true}))
      .pipe(gulp.dest('./assets/styles'));
});
/*
gulp.task('jsx', function () {
  return gulp.src(jsxDir)
    .pipe(react())
    .pipe(gulp.dest('./assets/js/build'));
});*/

gulp.task('coffee', function() {
  gulp.src(coffeeDir)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./assets/js/build'))
});

gulp.task('watch', function() {
  gulp.watch(stylusDir, ['css']),
  //gulp.watch(jsxDir, ['jsx']),
  gulp.watch(coffeeDir, ['coffee'])
});

gulp.task('compressJS', function() {
  gulp.src(
      [
        './assets/js/api.js',
        './assets/js/vendor/react.min.js',
        './assets/js/key.js',
        './assets/js/dispatcher.js',
        './assets/js/build/*.js',
        './assets/js/main.js',
      ]
    )
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./assets/js/min'))
});

gulp.task('minify-css', function() {
  gulp.src([
      './assets/styles/*.css',
    ])
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./assets/styles/'))
});

gulp.task('default', ['watch', 'coffee']);

gulp.task('pro', ['compressJS', 'minify-css'])