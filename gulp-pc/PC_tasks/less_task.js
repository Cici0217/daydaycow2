const gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),//自动添加浏览器前缀
    config = require('../config'),
    handleErrors = require('../util/handleErrors');

gulp.task('less_task', ()=>{
    return gulp.src(config.less.src)           //less源文件
        .pipe( less(config.less.settings) )
        .pipe( autoprefixer() )
        .on( 'error',handleErrors )            //交给notify处理错误
        .pipe( gulp.dest(config.less.dest) )   //输出目录
});