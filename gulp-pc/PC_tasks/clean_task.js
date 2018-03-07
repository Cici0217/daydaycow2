const gulp = require('gulp'),
    clean = require("gulp-clean"),
    config = require('../config').clean,
    gutil = require("gulp-util");//日志打印插件：比console.log更加优化美观;
    

gulp.task("clean_task", ()=>{
    gutil.log(gutil.colors.green("清除文件："+"BEGIN..."));
    return gulp.src(config.src)
        .pipe( clean() )
        .on("end",()=>{
            gutil.log(gutil.colors.green("清除文件："+"END✅"));
        });
});

