const gulp = require('gulp'),
    config = require('../config'),
    imagemin = require('gulp-imagemin');

gulp.task('imgs_minify_task', ()=>{
    return gulp.src(config.images.src)           //less源文件
        .pipe( imagemin() )
        .pipe( gulp.dest(config.images.dest) )   //输出目录
});