"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser

var config = {
    port: 9005,
    devBaseUrl: 'http:localhost',
    paths: {
        html: './src/*.html',
        dist: './dist'
    }
}

// start a local development server, name of the gulp task is connect
gulp.task('connect', function() {
    connect.server({
        root: ['dist'], // where files are
        port: config.port,
        base: config.devBaseUrl,
        livereload: true // any time file changes it should reload
    });
});

// open task has dependency on connect task
gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// we need to reload whatever was running (connect.reload is our dev server task)
gulp.task('html', function(){
    gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
});

// run multiple tasks with default one
gulp.task('default', ['html', 'open', 'watch']);