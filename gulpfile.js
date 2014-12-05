var gulp = require('gulp');
var stylus = require('gulp-stylus');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
//var react = require('gulp-react');

var stylusDir = './assets/styles/src/*.styl';
var jsxDir = './assets/js/src/*.js';
var coffeeDir = './assets/js/src/*.coffee';

gulp.task('css', function () {
  gulp.src(stylusDir)
      .pipe(stylus({compress: false}))
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

gulp.task('default', ['watch', 'coffee']);