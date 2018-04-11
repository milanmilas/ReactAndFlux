"use strict";

// Gulp
var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser

// Browserify
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transform React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text stream with Gulp

// Bootstrap
var concat = require('gulp-concat'); // concatenate files

var config = {
    port: 9005,
    devBaseUrl: 'http:localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        css: [ // bootstrap
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'            
        ],
        dist: './dist',
        mainJs: './src/main.js' // mainJs
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

gulp.task('js', function(){
    browserify(config.paths.MainJs)
        .transform(reactify) // transform js
        .bundle() // put it all in one file
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js')) // name of the bundle
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']); // watch java script files
});

// run multiple tasks with default one
gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);