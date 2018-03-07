const gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require("gulp-util"),//日志打印插件：比console.log更加优化美观;
    config = require('../config');

gulp.task('watch_task', ()=>{
    gutil.log(gutil.colors.green("监听文件变化："+"imgs、css、html、js 任务开启..."));
    watch(config.less.all, ()=>{  //监听所有less
        gulp.start('less_task');             //出现修改、立马执行less任务
    });
    watch(config.css.src, ()=>{  //监听所有less
        gulp.start('css_task');             //出现修改、立马执行css任务
    });
    watch(config.images.src, ()=>{  //监听imgs
        gulp.start('imgs_task');             //出现修改、立马执行img任务
    });
    watch(config.scripts.src, ()=>{  //监听所有js
        gulp.start('scripts_task','switchEnv_task');             
    });
    watch(config.htmls.src, ()=>{  //监听html变化
        gulp.start('htmls_task');             
    });
    watch(config.ejsToHtml.src, ()=>{  //监听html变化
        gulp.start('concat_ejs-temp_task');             
    });
    watch(config.ejsToHtml.ejsSrc, ()=>{  //监听ejs模板文件变化
        gulp.start('concat_ejs-temp_task');             
    });
})