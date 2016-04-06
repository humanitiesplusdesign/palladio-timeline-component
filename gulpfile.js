var gulp = require('gulp');

var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var rename = require('gulp-rename');
var angularTemplates = require('gulp-angular-templates');

var palladioSources = [ "palladio-timeline-filter.js" ];
var palladioCSS = [ "palladio-timeline-filter.css" ];
var palladioTemplate = [ "template.html" ];

gulp.task('scripts', function () {
	var files = gulp.src(palladioSources)
		.pipe(concat('jsFiles.js'));

	var templates = gulp.src(palladioTemplate)
		.pipe(angularTemplates({ module: 'palladio', basePath: 'partials/palladio-timeline-component/' }))
		.pipe(rename('templates.tmpl'));

	merge(files, templates)
		.pipe(order(['*.js', '*.tmpl']))
        .pipe(concat('palladio-timeline-component.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
	gulp.src(palladioCSS)
		.pipe(concat('palladio-timeline-component.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('images', function () {
	gulp.src('./bower_components/mapbox.js/images/*')
		.pipe(gulp.dest('./images/'))
        .pipe(gulp.dest('./apps/projectexample/assets/images/'))
        .pipe(gulp.dest('./apps/timespans/images/'))
        .pipe(gulp.dest('./apps/template/images/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(palladioSources, ['scripts']);
  gulp.watch(palladioCSS, ['css']);
  gulp.watch(palladioTemplate, ['scripts']);
});

gulp.task('default', ['scripts','css','watch']);