const gulp = require('gulp'),
    config = require('../config');

gulp.task('htmls_task', ()=>{
    return gulp.src(config.htmls.src)         
        .pipe( gulp.dest(config.htmls.dest) )   //输出目录
});