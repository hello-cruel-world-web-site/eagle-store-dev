'use strict';

let { src, dest, parallel, series, watch } = require('gulp');
let sourcemaps = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let changed = require('gulp-changed');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let cleanCss = require('gulp-clean-css');
let htmlMin = require('gulp-htmlmin');
let htmlReplace = require('gulp-html-replace');

let forceDel = require('force-del');
let es = require('event-stream');
let del = require('del');
let browserSync = require('browser-sync');

sass.compiler = require('node-sass');

var diretorios = {
    dist: 'build/',
    distview: 'build/view/',

    cssin: 'src/css/**/*.css',
    cssoutname: 'style.min.css',
    cssoutsrc: 'src/css',
    cssout: 'build/css/',
    cssreplaceout: 'css/style.min.css',
    cssreplaceoutview: '../css/style.min.css',


    scssin: 'src/sass/**/*.scss',
    scssout: 'src/css/',

    imgin: 'src/img/**/*.{jpg,jpeg,png,gif}',
    imgout: 'build/img/',
    imgoutsrc: 'src/img/',


    jsin: 'src/js/**/*.js',
    jsout: 'build/js/',
    jsoutsrc: 'src/js/',
    jsoutname: 'script.min.js',
    jsreplaceout: 'js/script.min.js',
    jsreplaceoutview: '../js/script.min.js',

    htmlin: 'src/*.html',
    htmlviewin: 'src/view/**/*.html',

    src: 'src/'
};



function compilarSass() {
    return src(diretorios.scssin)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 version'] }))
        .pipe(sourcemaps.write())
        .pipe(dest(diretorios.scssout));
};

function css() {
    return src(diretorios.cssin)
        .pipe(cleanCss())
        .pipe(concat(diretorios.cssoutname))
        .pipe(dest(diretorios.cssout))
        .pipe(dest(diretorios.cssoutsrc));
};

function js() {
    return src(['node_modules/jquery/dist/jquery.min.js', 
                'node_modules/jquery-ui/ui/jquery-1-7.js',
                diretorios.jsin])
        .pipe(uglify())
        .pipe(concat(diretorios.jsoutname))
        .pipe(dest(diretorios.jsoutsrc))
        .pipe(dest(diretorios.jsout));
};

function html() {
    return es.merge([
            src(diretorios.htmlin)
            .pipe(htmlReplace({
                'css': diretorios.cssreplaceout,
                'js': diretorios.jsreplaceout
            }))
            .pipe(dest(diretorios.dist)),
            src(diretorios.htmlviewin)
            .pipe(htmlReplace({
                'css': diretorios.cssreplaceoutview,
                'js': diretorios.jsreplaceoutview
            }))
            .pipe(dest(diretorios.distview))
        ])
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }));
};

function img() {
    return src(diretorios.imgin)
        .pipe(changed(diretorios.imgout))
        .pipe(imagemin())
        .pipe(dest(diretorios.imgoutsrc))
        .pipe(dest(diretorios.imgout));
};

function limparForcado() {
    return forceDel([diretorios.dist]);
};

function limparSrc() {
    return del(['src/js/script.min.js', 'src/css/style.min.css']);
};

function recarregarNavegador() {
    browserSync.reload();
};

function servidor() {
    browserSync({ server: diretorios.src });

    watch([diretorios.htmlin, diretorios.jsin, diretorios.imgin], series(limparSrc, img, js, recarregarNavegador));
    watch([diretorios.scssin], series(limparSrc, compilarSass, css, recarregarNavegador));


};

exports.build = series(compilarSass,css,js,html);
exports.limparSrc = limparSrc;
exports.servidor = servidor;
exports.recarregar = recarregarNavegador;
exports.html = series(js, css, html);
exports.sass = compilarSass;
exports.css = series(limparSrc, compilarSass, css);
exports.js = series(limparSrc, js);
exports.img = img;
exports.limpar = limparForcado;