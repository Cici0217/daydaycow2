const gulp = require('gulp'),
    path = require("path"),
    data = require("gulp-data"),
    ejs = require("gulp-ejs"),
    flatten = require("gulp-flatten"),    
    htmlMinify = require('gulp-htmlmin'),
    gutil = require("gulp-util"),//日志打印插件：比console.log更加优化美观
    config = require('../config'),
    templateConfig = require('../../src/temples/template_config');

gulp.task("concat_ejs-temp-minify_task",()=>{
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    //注意：缺少return会导致读取文件遗漏
    return gulp.src(config.ejsToHtml.src)
        .pipe(data( (file)=>{
            let _filePath = file.path,
                _fileDirname = path.dirname(_filePath), //路径名：例->‘/Users/admin/Documents/git/pensionCollegeProject/pension-college/src/pages’
                _fileBasename = path.basename(_filePath), //文件.后缀名：例->‘home-page.html’
                _fileName = _fileBasename.split(".")[0]; // 文件名 ： home-page            

            // console.log( Object.assign(templateConfig.globConfig,{
            //     local: templateConfig.pagesConfig[_fileName]
            // }));
            
            //组装每页的 style&js 配置数据
            return Object.assign(
                {glob:templateConfig.globConfig},
                {pageNav:templateConfig.pageNavConfig},
                {local: templateConfig.pagesConfig[_fileName]}
            )
        }))
        .pipe(ejs().on('error',(err)=>{
            gutil.log(err);
            this.emit('end');
        }))
        .pipe( htmlMinify(options) )
        .pipe(flatten())
        .pipe(gulp.dest(config.ejsToHtml.dest));
});


/*

gulp.task('ejs-watch', ['ejs'], browserSync.reload);

// 开发服务
gulp.task('dev', function() {

    browserSync.init({
        server: {
            baseDir: distDir
        },
        reloadDebounce: 0
    });

    // 无论是数据文件更改还是模版更改都会触发页面自动重载
    gulp.watch(tplDir + '\/**\/*.*', ['ejs-watch']); // '\'转义：不然不能注释

 });

*/

