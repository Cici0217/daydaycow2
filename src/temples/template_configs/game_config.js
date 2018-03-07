 /*
  *   我的牛栏
  */ 
const mybullpenConfig = {
    "my-bullpen":{
        pageTitle:"我的牛栏",
        hasFootNav : true, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
        ],
        scripts:[
            "../scripts/swiper.min.js",
            "../scripts/doT.min.js",
            "../scripts/game/restful.js",
        ]
    },    
    "test-api":{
        pageTitle:"天天牛游戏",
        hasFootNav : true, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
        ],
        scripts:[
            "../scripts/restful.js",
            "../scripts/game/test-api.js",
        ]
    },
}
module.exports = mybullpenConfig;