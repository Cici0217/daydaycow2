/*
*  个人中心
*/ 
const leaguercenterConfig = {
    "leaguer-center":{
        pageTitle:"个人中心",
        hasFootNav : true, //是否具有底部导航
        footNavIndex: 2, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/leaguercenter/leaguercenter.css",
        ],
        scripts:[
            "../scripts/leaguercenter/leaguercenter.js",
        ]
    },
    "recharge":{
        pageTitle:"充值记录",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/leaguercenter/recharge.css",
        ],
        scripts:[
            "../scripts/leaguercenter/recharge.js",
        ]
    },
    "billing-record":{
        pageTitle:"账单记录",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
        ],
        scripts:[
        ]
    }
}
module.exports = leaguercenterConfig;