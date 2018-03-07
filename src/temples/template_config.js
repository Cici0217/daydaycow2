const   welcomeConfig = require("./template_configs/welcome_config"),
    gameConfig = require("./template_configs/game_config"),
    petmarketConfig = require("./template_configs/petmarket_config"),
    leaguercenterConfig = require("./template_configs/leaguercenter_config");

//全局配置
var globStyleJsConfig = {
    site:"Smart-Data",
    styles:[
        "../css/common.css",
    ],
    scripts:[
        "../scripts/zepto.min.js",
        "../scripts/htmladapt.js",
        "../scripts/common.js"
    ]
};
//页面导航配置
var pageNavConfig = [];
//每个页面配置
var pagesStyleJsConfig = Object.assign(welcomeConfig,gameConfig,petmarketConfig,leaguercenterConfig);

module.exports = {
    globConfig : globStyleJsConfig,
    pageNavConfig:pageNavConfig,
    pagesConfig : pagesStyleJsConfig
};