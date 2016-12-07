var gulp 		= require('gulp');
var	clean 		= require('gulp-clean');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var es 			= require('event-stream')
var	sass 		= require('gulp-sass');
var rename		= require('gulp-rename');
var sourcemaps	= require('gulp-sourcemaps');
var watch 		= require('gulp-watch');
var	runSequence = require('run-sequence');

gulp.task('clean', function() {
	return gulp.src('css/')
		.pipe(clean());
});

gulp.task('sass', function() {
	return gulp.src('scss/**/*.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(sourcemaps.init())
	    .pipe(rename('style.css'))
	    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: 'assets/css'}))
	    .pipe(gulp.dest('assets/css'));
});

gulp.task('uglify', function () {
	return es.merge([
		gulp.src(['assets/lib/bootstrap/3.3.6/js/bootstrap.min.js']),
		gulp.src('assets/js/*.js')
		.pipe(concat('scripts-all.js'))
		.pipe(uglify())
	])
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
	gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', function(cb) {
	return runSequence('clean', ['watch', 'sass'], cb)
});



