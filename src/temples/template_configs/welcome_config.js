 /*
  *   欢迎
  */ 
const welcomeConfig = {
    "welcome":{
        pageTitle:"欢迎",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:false,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/swiper.min.css", 
        ],
        scripts:[
            "../scripts/swiper.min.js",
            "../scripts/doT.min.js",
            "../scripts/welcome/welcome.js",
           // "../scripts/game/game_home.js",
        ]
    },
    "bindwallet":{
        pageTitle:"绑定钱包",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:false,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
        ],
        scripts:[
            "../scripts/restful.js",
            "../scripts/welcome/bindwallet.js",
        ]
    }
}
module.exports = welcomeConfig;