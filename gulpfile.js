var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var pxtorem = require('postcss-pxtorem');
var parker = require('gulp-parker');

var cssstats = require('postcss-cssstats');

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano,
        pxtorem({
            replace: true,
            propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'width', 'max-width', 'height', 'max-height', 'box-shadow']
        })
    ];
    return gulp.src('./public/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('stats', function() {
    return gulp.src('./public/css/*.css')
        .pipe(parker());
});

// Static Server + watching scss/html files
gulp.task('serve', ['css', 'stats'], function() {

  browserSync.init({
      proxy: "localhost:3000"
  });

    gulp.watch("./public/scss/**/*.scss", ['css']);
    gulp.watch("./templates/**/*.hbs").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
