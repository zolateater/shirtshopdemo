var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var gulpUglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulpNotify = require('gulp-notify');
var multiPipe = require('multipipe');
var browserSync = require('browser-sync').create();
var sourceMaps = require('gulp-sourcemaps');

// set true for minified output
const isDevelopment = false;

// build task
gulp.task('build', function () {
    return multiPipe(
        gulp.src([
            'src/vendor/*.js',
            'src/lib/*.js',
            'src/gl/*.js',
            'src/components/*.js',
            'src/index.js'
        ]),
        sourceMaps.init(),
        gulpConcat('app.js'),
        gulpIf(isDevelopment, sourceMaps.write()),
        gulpIf(!isDevelopment, gulpUglify()),
        gulp.dest('build/js'),
        browserSync.stream()
    ).on('error', gulpNotify.onError(function(error){
        return {
            title: 'Compile error!',
            message: error.message
        };
    }));
});

gulp.task('build-tests', function() {
    return multiPipe(
        gulp.src('tests/**/*.js'),
        sourceMaps.init(),
        gulpConcat('tests.js'),
        gulpIf(isDevelopment, sourceMaps.write()),
        gulpIf(!isDevelopment, gulpUglify()),
        gulp.dest('build/js'),
        browserSync.stream()
    ).on('error', gulpNotify.onError(function(error){
        return {
            title: 'Tests compile error!',
            message: error.message
        };
    }));
});

// watcher for app
gulp.task('watch-app', function() {
    gulp.watch('src/**/*.js', gulp.series('build'));
});

// watcher for tests
gulp.task('watch-tests', function() {
    gulp.watch('tests/**/*.js', gulp.series('build-tests'));
});

// live reload
gulp.task('live-reload', function() {
    browserSync.init({
        // TODO: add proxy using apache
        server: "./build"
    });

    browserSync.watch(['build/**/*.*']).on('change', browserSync.reload);
});


// for development
gulp.task('dev', gulp.series('build', gulp.parallel('watch-app', 'watch-tests', 'live-reload')));