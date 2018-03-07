const gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    config = require('../config');
// var scriptsPath = path.resolve(__dirname,"../../dist/scripts");
var scriptsPath = config.switchScriptEnv.distScriptsPath,
    envConfig = config.switchScriptEnv.env;


if(undefined!=process.env.NODE_ENV){
    var env = process.env.NODE_ENV.trim(); 
    console.log("当前执行环境："+env);
}
gulp.task('switchEnv_task',function(){
    fileDisplay(scriptsPath);
});
/** 
 * 文件遍历方法 
 * @param filePath 需要遍历的文件路径 
 */  
function fileDisplay(filePath){  
    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath,function(err,files){  
        if(err){  
            console.warn(err)  
        }else{  
            //遍历读取到的文件列表  
            files.forEach(function(filename){  
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath,filename);  
                //根据文件路径获取文件信息，返回一个fs.Stats对象  
                fs.stat(filedir,function(eror,stats){  
                    if(eror){  
                        console.warn('获取文件stats失败');  
                    }else{  
                        var isFile = stats.isFile();//是文件  
                        var isDir = stats.isDirectory();//是文件夹  
                        if(isFile){  
                            // console.log(filedir);  
                            reWriteFile(filedir);
                        }  
                        if(isDir){  
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件  
                        }  
                    }  
                })  
            });  
        }  
    });  
} 
function reWriteFile(file){
    // console.log(file);
    fs.readFile(file,{flag: 'r+', encoding: 'utf-8'},function(err,data){
        if(err){  
            console.warn("读取文件失败:"+err);  
        }else{
            var oldText = data.toString('utf-8');
            //var result = new Buffer(text,'utf-8'); 
            console.log('/******检测文件：'+path.basename(file)+'******/');
            var currentHost = null;
            for (const key in envConfig) {
                // console.log(JSON.stringify(envConfig));
                if ( oldText.indexOf(envConfig[key])>=0 ) {
                    console.log("++检测到host:"+envConfig[key]);
                    currentHost = envConfig[key];
                    var regExp = new RegExp(currentHost,"gm");//通过RegExp使用变量
                    var newText = oldText.replace(regExp,envConfig[env]);
                    console.log('>>当前host:'+currentHost);
                    console.log('>>替换host:'+envConfig[env]);
                    fs.writeFile(file,newText,'utf-8',function(err){
                        if(err){
                            console.log(path.basename(file)+"   ×重写文件失败");
                        }else{
                            console.log(path.basename(file)+'   √重写文件成功');
                        }
                    })
                }else{
                    console.log(`--未检测到 ${key} host:null`);
                }
            }
        }
    });
} 
/*
console.log(__dirname + '/css_task.js');
fs.readFile(__dirname + '/css_task.js','utf-8',function(err,data){
    if(err){  
        console.warn("读取文件失败:"+err);  
    }else{
        var text = data.toString('utf-8');
        //var result = new Buffer(text,'utf-8'); 
        // console.log(text);
        if(text.indexOf('rlog-soho.phicomm.com')>=0){
            var p = text.replace(/rlog-soho.phicomm.com/g,'hahah');
            console.log(p);
            // console.log(text.indexOf('autoprefixer') >= 0);
            fs.writeFile(__dirname + '/css_task.js',p,'utf-8',function(err){
                if(err){
                    console.log("重写文件失败");
                }else{
                    console.log('重写文件成功');
                }
            })
        }
    }
});
*/
