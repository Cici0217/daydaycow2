/*
*  宠物市场
*/ 
const petmarketConfig = {
    "pet-market":{
        pageTitle:"宠物集市",
        hasFootNav : true, //是否具有底部导航
        footNavIndex: 1, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/swiper.min.css", 
            "../css/petmarket/petmarket.css",
            "../css/dropload.css",
        ],
        scripts:[
            "../scripts/dropload.min.js",
            "../scripts/petmarket/petmarket.js"
        ]
    },
    "my-cow-detail":{
        pageTitle:"牛详情页",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/petmarket/mycowdetail.css"
        ],
        scripts:[
            "../scripts/petmarket/mycowdetail.js"
        ]
    },
    "purchase":{
        pageTitle:"购买页",
        hasFootNav : false, //是否具有底部导航
        footNavIndex:0, //从0开始
        homePageNav:true,//首页导航配置
        homePageIndex:0,//首页导航索引
        styles:[
            "../css/petmarket/purchase.css"
        ],
        scripts:[
            "../scripts/petmarket/purchase.js"
        ]
    }
}
module.exports = petmarketConfig;