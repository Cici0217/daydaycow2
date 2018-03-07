const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors');
gulp.task('css_task', ()=>{
    return gulp.src(config.css.src) 
        .on( 'error',handleErrors )           //交给notify处理错误
        .pipe( gulp.dest(config.css.dest) )   //输出目录
});

// gulp.task('css_task', function(){
//     //console.log("正在处理css中的图片打包...");
//     // return gulp.src(config.css.src_img)         
//     //     .pipe( gulp.dest(config.css.dest_img) )   
// });