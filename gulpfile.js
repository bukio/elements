const { series, src, dest } = require('gulp');
const sass = require('gulp-dart-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function sassCompile() {
  return src('./scss/elements.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('elements.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./css'));
}

function cssMinify() {
  return src('./scss/elements.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(concat('elements.min.css'))
    .pipe(dest('./css'));
}

exports.default = series(sassCompile, cssMinify);