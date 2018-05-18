var gulp = require ( 'gulp' );
var rename = require ('gulp-rename');
var browserSync = require('browser-sync').create();
var sass = require ('gulp-sass');


var styleSRC = './src/scss/style.scss';
var styleDIST = './dist/css/';

gulp.task('serve', ['style'], function() {

    browserSync.init({
        proxy: "http://localhost:8888/"
    });

    gulp.watch("src/scss/*.scss", ['style']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task ('style', function (){
  gulp.src( styleSRC )
      .pipe ( sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
      }) )
      .on ( 'error', console.error.bind ( console) )
      .pipe( rename( { suffix: '.min'} ) )
      .pipe( gulp.dest( styleDIST ))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
