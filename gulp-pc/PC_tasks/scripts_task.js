const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    config = require('../config'),
    babel = require("gulp-babel");

gulp.task('scripts_task', ()=>{
    return gulp.src(config.scripts.src)           //less源文件
        .pipe(babel({
            presets:[
                ["es2015",{"modules":false}]
            ]
        })) 
        .pipe( gulp.dest(config.scripts.dest) )   //输出目录
});