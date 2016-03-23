var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulpNotify = require('gulp-notify');
var multiPipe = require('multipipe');
var browserSync = require('browser-sync').create();
var sourceMaps = require('gulp-sourcemaps');

// set true for minified output
const isDevelopment = true;

// build task
gulp.task('build', function () {
    return multiPipe(
        gulp.src([
            'app/**/*.js',
            'app/index.js'
        ]),
        sourceMaps.init(),
        gulpConcat('app.js'),
        gulpIf(isDevelopment, sourceMaps.write()),
        gulpIf(!isDevelopment, gulpUglify()),
        gulp.dest('public/js'),
        browserSync.stream()
    ).on('error', gulpNotify.onError(function(error){
        return {
            title: 'Compile error!',
            message: error.message
        };
    }));
});

// watcher for app
gulp.task('watch-app', function() {
    gulp.watch('app/**/*.js', gulp.series('build'));
});

// live reload
gulp.task('live-reload', function() {
    browserSync.init({
        // TODO: add proxy using apache
        server: "./public"
    });

    browserSync.watch(['public/**/*.*']).on('change', browserSync.reload);
});


// for development
gulp.task('dev', gulp.series('build', gulp.parallel('watch-app', 'live-reload')));