var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var precss = require('precss');

var runSequence = require('run-sequence');

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/styles/**/*.scss', ['sass']); 
  gulp.watch('**/*.html', browserSync.reload); 
  gulp.watch('app/js/*.js', browserSync.reload); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    }
  })
})

gulp.task('sass', function(){
  return gulp.src('app/styles/main.scss')
    .pipe(sass()) 
    .pipe(gulp.dest('app/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('vendor-prefix', function () {
    var processors = [
	  autoprefixer,
	  cssnext,
	  precss
	];
    return gulp.src('styles/main.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('styles'));
});
