
/*!
 * gulp
 * $ npm install gulp-less gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename');
   //clean = require('gulp-clean');
 
// Styles
gulp.task('styles', function() {
  return gulp.src('src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('build/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify())
    .pipe(gulp.dest('build/css'));
    //.pipe(clean());
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/*.js') 
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('build'));
    //.pipe(notify({ message: 'Scripts task complete' }));
});
 
// Watch
gulp.task('watch', function() {
 
  // Watch .less files
  gulp.watch('less/*.less', ['styles']);
 
  // Watch .js files
  gulp.watch('**/*.js', ['scripts']);
 
  livereload.listen();
 
 
});