const gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),//自动添加浏览器前缀
    // minifycss = require('gulp-minify-css'),//压缩css
    minifycss = require('gulp-clean-css'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors');

gulp.task('less_minify_task', ()=>{
    return gulp.src(config.less.src)           //less源文件
        .pipe( less(config.less.settings) )
        .pipe( autoprefixer() )
        .pipe( minifycss() )
        .on( 'error',handleErrors )            //交给notify处理错误
        .pipe( gulp.dest(config.less.dest) )   //输出目录
});