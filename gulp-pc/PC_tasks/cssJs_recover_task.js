const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    config = require('../config'),
    handleErrors = require('../util/handleErrors'),
    revCollector = require('gulp-rev-collector');//替换版本号
gulp.task('cssJsRecover_task', ()=>{
    return gulp.src([config.hashVersion.hashSrc,config.hashVersion.htmlSrc])
        .pipe( revCollector() )
        .pipe( gulp.dest(config.htmls.dest) )   //输出目录
});
