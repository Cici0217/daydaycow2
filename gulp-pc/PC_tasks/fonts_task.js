const gulp = require('gulp'),
    config = require('../config');

gulp.task('fonts_task', ()=>{
    
    return gulp.src(config.fonts.src)    
        .pipe( gulp.dest(config.fonts.dest) );
});