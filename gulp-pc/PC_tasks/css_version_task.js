const gulp = require('gulp'),
    config = require('../config'),
    rev = require('gulp-rev'); //生成版本号
gulp.task('cssVersion_task', ()=>{
    return gulp.src(config.hashVersion.cssSrc)
        .pipe( rev() )//定义一个流，将所有匹配到的文件名全部生成相应的版本号
        .pipe( rev.manifest() )//把所有生成的带版本号的文件名保存到json文件中
        .pipe( gulp.dest(config.hashVersion.cssHashDest) )   //输出目录
});
