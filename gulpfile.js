'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');

// Очищаем папку build перед сборкой
gulp.task('clean', function() {
  return del('build');
});

// Копируем в папку build
gulp.task('copy', function() {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    '*.html',
    'libs/**'
  ], {
    base: '.'
  })
  .pipe(gulp.dest('build'));
});

// CSS
gulp.task('style', function() {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({browsers: [
        'last 5 versions'
      ]})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', function(){
  return gulp.src('js/**/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*.{png,jpg,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});

// SVG sprite
gulp.task('svg-sprite', function() {
  return gulp.src('img/svg-sprite/*.svg')
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

// SVG min
gulp.task('svg-min', function() {
  return gulp.src('img/svg-icons/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img/icons'));
});

// Сборка проекта
gulp.task('build', function(fn) {
  run(
    'clean',
    'copy',
    'style',
    'js',
    'images',
    'svg-sprite',
    'svg-min',
    fn
  );
});

// Копируем html в build
gulp.task('html:copy', function() {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
});

// Обновляем страничку в браузере после копирования html
gulp.task('html:update', ['html:copy'], function(done) {
  browserSync.reload();
  done();
});

// Browser Sync
gulp.task('serve', function() {
  browserSync.init({
    server: 'build/'
  });

  gulp.watch('sass/**/*.scss', ['style']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('*.html', ['html:update']);
});
