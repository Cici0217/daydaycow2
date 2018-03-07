const gulp = require('gulp'),
    config = require('../config');

gulp.task('imgs_task', ()=>{
    return gulp.src(config.images.src)           //less源文件
        .pipe( gulp.dest(config.images.dest) )   //输出目录
});