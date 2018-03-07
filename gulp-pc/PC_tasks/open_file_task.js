const gulp = require('gulp'),
    gshell = require('shelljs'),
    defaultOpenFiles = require('../config').defaultOpenFiles,//打包文件路径
    gutil = require("gulp-util");//日志打印插件：比console.log更加优化美观;

 //检测node环境是Windows还是Mac：启动文件的终端命令不一样
const platForm = process.platform,
    START_OPEN = platForm.indexOf("darwin")>-1?"open":"start";
gulp.task("open_file_task",()=>{
    gshell.exec(START_OPEN+' '+defaultOpenFiles);
});
