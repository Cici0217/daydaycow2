/* gulp命令会由gulpfile.js运行，所以src和build文件夹路径如下（根目录下） */
const path = require('path');

const SRC = path.resolve(__dirname,'../src'),
    DEST = path.resolve(__dirname,'../dist');
module.exports = {
    defaultOpenFiles : DEST+'/pages/pet-market.html',//打包完成后，默认打开的文件
    clean:{
        src: DEST
    },
    less: {
        all: SRC + "/less/**/*.less",  //所有less
        src: SRC + "/less/page-less/*.less",     //需要编译的less
        dest: DEST + "/css",　　　　　　 //输出目录
        settings: {　　　　　　　　　　　 //编译less过程需要的配置，可以为空 
        }
    },
    css: {
        src: SRC + "/css/**/*.*",     //需要编译的less  有些皮肤包含img图片，这里匹配所有文件 "/css/**/*.*",而不是 "/css/**/*.css"
        dest: DEST + "/css",　　　　　　 //输出目录
        //src_img: SRC + "/css/**/*.png", //*(.jpg|.png|.gif)$
        //dest_img: SRC + "/css/",
    },
    fonts:{
        src: SRC + "/fonts/**/*.*", 
        dest: DEST + "/fonts",　
    },
    images:{
        src: SRC + '/images/**/*.*',
        dest: DEST + "/images"
    },
    scripts:{
        src: SRC + '/scripts/**/*.*',
        dest: DEST + "/scripts"
    },
    htmls:{
        src: SRC + '/pages/**/*.*',
        dest: DEST + "/pages"
    },
    ejsToHtml:{
        src: SRC + '/temples/pages/**/*.html',
        ejsSrc: SRC + '/temples/**/*.ejs',//提供ejs文件路径
        dest: DEST + "/pages"
    },
    hashVersion:{
        cssSrc: DEST + "/css/**/*.*",           //css 生成地址
        jsSrc: DEST + "/scripts/**/*.*",        //js  生成地址
        cssHashDest: DEST + "/hash/css",　　　　　　  //hash  地址
        jsHashDest: DEST + "/hash/js",　　　　　　  //hash  地址
        hashSrc :  DEST + '/hash/**/*.*',
        htmlSrc: DEST + "/pages/*.html",
    },
    switchScriptEnv:{
        distScriptsPath : DEST + '/scripts',
        env:{
            'dev' : 'rlog-soho.phicomm.com',
            // 'dev2':'rlog-soho.phicomm.com',
            // 'dev' : '5406b24d.ngrok.io',
            // 'dev2':'rlog-soho.phicomm.com',
            // 'dev' : '5406b24d.ngrok.io',
            'test' : 'gametest.phicomm.com',
            'pro' : 'www.joy84.com'
        }
    },
}