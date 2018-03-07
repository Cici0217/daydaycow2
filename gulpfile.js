const requireDir = require('require-dir'),
    gutil = require("gulp-util");//日志打印插件：比console.log更加优化美观;

var npmConfigArgv = JSON.parse(process.env.npm_config_argv),//JSON.parse(process.env.npm_config_argv)
    CMD_ARRAY = [],
    PACKAGE_TYPE = null;
//得到所执行命令数组
    ///*
for(let key in npmConfigArgv){
    if(key == "original"){
        CMD_ARRAY = npmConfigArgv[key];
        break;
    }
}
    //*/
CMD_ARRAY.forEach((_item)=> {
    if(_item==='--g'){//glob全局任务
        PACKAGE_TYPE = _item;
    }else{
        PACKAGE_TYPE = null;
    }
}, this);
if(PACKAGE_TYPE == null){
    /*PC项目：pc端养老项目打包任务*/
    requireDir('./gulp-pc/PC_tasks',{recurse:true});
}else if(PACKAGE_TYPE == "--g"){
    console.log(PACKAGE_TYPE);
    /*Glob全局任务*/
    requireDir('./gulp-globTask/Glob-tasks',{recurse:true});
}else{
    gutil.log(gutil.colors.magenta("❌ ❌ =====打包类型错误，请添加打包类型参数说明：例如-->>npm run dev --pc ===== ❌ ❌ "))
}
