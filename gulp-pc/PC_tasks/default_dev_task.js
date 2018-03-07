const gulp = require('gulp'),
    gutil = require("gulp-util"),//日志打印插件：比console.log更加优化美观;
    runSequence = require('run-sequence');
/*====gulp同步执行任务（按顺序执行）====*/
gulp.task("dev",(callback)=>{
    gutil.log(gutil.colors.green("开发环境打包："+"正在执行生产环境打包，请稍等..."));
    runSequence(
        //注：[]里面的是异步的执行队列，外层的是同步执行的任务队列
        'clean_task',
        ['imgs_task','fonts_task','less_task','css_task','scripts_task','concat_ejs-temp_task','watch_task'],
        'cssVersion_task',
        'scriptsVersion_task',
        'cssJsRecover_task',//这个任务必须在上面两个任务之后进行
        'switchEnv_task',
        'open_file_task',
        function(){
            gutil.log(gutil.colors.green("开发环境打包："+"END✅"));
        }
    );
});
/*====gulp异步执行任务（不分先后）====*/
// gulp.task("default",['clean_task'],()=>{
//     gutil.log(gutil.colors.green("开发环境打包："+"正在执行生产环境打包，请稍等..."));
//     /*传统方法：htmls_task*/ 
//     //gulp.start('imgs_task','fonts_task','less_task','css_task','scripts_task','htmls_task','watch_task');
//     /*ejs模板生成方法：*/
//     gulp.start('imgs_task','fonts_task','less_task','css_task','scripts_task','concat_ejs-temp_task','watch_task');
// });
