(function ()
{
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		conf = require('./conf');

	gulp.task('inject', ['copy-css', 'copy-js','copy-png','copy-jpg'], function ()
	{
		var injectScripts = gulp.src([
				conf.paths.temp.root + '/js/app.js',
				conf.paths.temp.root + '/**/*.js',
			]),
			injectStyles = gulp.src([
				conf.paths.temp.root + '/**/*.css',
			]);

		return gulp.src(conf.paths.src + '/*.html')
			.pipe($.inject(injectStyles, { ignorePath: conf.paths.temp.root }))
			.pipe($.inject(injectScripts, { ignorePath: conf.paths.temp.root }))
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-css', ['styles'], function ()
	{
		return gulp.src(conf.paths.src + '/css/**/*.css')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-jpg', [], function ()
	{
		return gulp.src(conf.paths.src + '/**/*.jpg')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-png', [], function ()
	{
		return gulp.src(conf.paths.src + '/**/*.png')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-js', ['scripts'], function ()
	{
		return gulp.src(conf.paths.src + '/js/**/*.js')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

}());