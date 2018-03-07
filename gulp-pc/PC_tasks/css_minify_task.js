const gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    //minifycss = require('gulp-clean-css'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors');
gulp.task('css_minify_task', ()=>{
    return gulp.src(config.css.src)         
        .pipe( minifycss() )  // todo... 压缩会报错：因为css文件夹下有.png图片 待优化
        .on( 'error',handleErrors )           //交给notify处理错误
        .pipe( gulp.dest(config.css.dest) )   //输出目录
});