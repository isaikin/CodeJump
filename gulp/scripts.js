(function () {
	'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();
var del = require('del');


gulp.task('scripts',['clean-scripts-tmp'], function() {
  return gulp.src(path.join(conf.paths.src, '/js/**/*.js'))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.size());
});

gulp.task('wscripts', ['scripts'], function() {
  gulp.watch(path.join(conf.paths.src, '/js/**/*.js'), function() {
    gulp.start('scripts');
  });
});


gulp.task('clean-scripts-tmp', function() {
  return del([path.join(conf.paths.temp.root, '/**/*.js')]);
});

}());