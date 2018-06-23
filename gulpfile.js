// Packages
var gulp = require('gulp'),
less = require('gulp-less'),
imagemin = require('gulp-imagemin'),
watch = require('gulp-watch'),
rename = require('gulp-rename');

// path
var path = {
	source:		'./src/',
	views:		'./src/*.html',
	styles: 	'./src/less/*.less',
	images: 	'./src/img/**/*{.jpg,.gif,.png,.svg,.eot,.ttf,.woff,.woff2,.ico}'
}

// local
var local = {
	dest:		'./dist',
	views:		'./dist/',
	styles:		'./dist/css/',
	images:		'./dist/img/',
}

// template engine / html
gulp.task('views', function () {
	return gulp.src(path.views)
	.pipe(gulp.dest(local.views));
});

// less compiler
gulp.task('less', function () {
	return gulp.src(path.styles)
	.pipe(less())
	.pipe(gulp.dest(local.styles));
});

// image minify
gulp.task('imagemin', function(){
	gulp.src(path.images)
	.pipe(imagemin([
		imagemin.svgo({
			plugins: [ 
				{ removeUselessDefs: false },
				{ cleanupIDs: false}
			]
		}),
		imagemin.gifsicle(),
		imagemin.jpegtran(),
		imagemin.optipng()
	]))
	.pipe(gulp.dest(local.images))
});

// waiting for changes
gulp.task('watch', function() {
	gulp.watch(path.views, ['views']);
	gulp.watch(path.styles, ['less']);
	gulp.watch(path.images, ['imagemin']);
});

// default task
gulp.task('default', function(){
	gulp.start('views', 'less', 'imagemin')
});