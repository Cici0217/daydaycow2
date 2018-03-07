const gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    config = require('../config'),
    babel = require("gulp-babel");
 
gulp.task('scripts_minify_task', ()=>{
    return gulp.src(config.scripts.src)
        .pipe(babel({
        	presets:[
        	   ["es2015",{"modules":false}]
        	]
        })) 
        .pipe( uglify() )
        .pipe( gulp.dest(config.scripts.dest) )   //输出目录
});