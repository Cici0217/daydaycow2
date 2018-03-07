;(function(window){
function Restful(){
    this.version = "1.0.0";
    //this.apiBaseUrl = "http://xx.com/DayDayAccount/";  //开发环境
    this.apiBaseUrl = "http://172.17.84.170/"
}
Restful.prototype = {
    tapOrClick:function(){
        var wWidth =  $(window).width();
        if(wWidth<=768){
            return "tap";
        }else{
            return "click";
        }
    },
    /**  ajax请求：基于zepto
    *	@param {String}   URL        : 请求地址
    *	@param {Object}   options    : ajax参数设置
    */
    data : function(URL,options){
        let self = this;
        // console.log(self.apiBaseUrl+URL);
        var ajaxConf = {
            type : options.type||"get",
            url : self.apiBaseUrl+URL,
            timeout:30000,
            dataType: 'json',
            cache:false,
            data:options.data,
            contentType: options.contentType||"application/json;charset=utf-8",
            headers:options.headers===undefined ? "" : options.headers,
            beforeSend : function(XMLHttpRequest){
                //显示加载动画
            },
            success : function(result){//数据请求成功时回调
                options.success&&options.success(result);
            },
            complete : function(){//请求完成时的回调
                //隐藏加载动画
                options.complete&&options.complete();
            },
            error : function(err){
                //请求出错处理
                options.error&&options.error();//self.openNotice({text:"网络连接异常"})
            }	
        };
        // console.log(ajaxConf);
        $.ajax(ajaxConf);
    },
     /** 获取url参数
     *  @param {String}   url
     */
    query2json : function(url){
        var getSearch="";
        var getSearchJson={};
        //url支持两种模式，第一种是标准模式a.html?b=c#d.html，第二种是hash在前a.html#d.html?b=c
        var search = url ? url : location.search;
        //对第二种url提供兼容支持
        if(!url&&!location.search&&location.hash){
            search = location.hash.substring(location.hash.indexOf("?")+1);
        }
        var turlstr =(decodeURIComponent(search).replace(/\S*\?/,""));
        getSearch=turlstr.replace(/\&/g ,",");
        var getSearchArr=getSearch.split(",");
        for(var i=0,len=getSearchArr.length;i<len;i++){
            var temp=getSearchArr[i].split("=");
            getSearchJson[temp[0]] = temp[1];
        }
        return getSearchJson;
    },
     /** 倒计时 :短时间倒计时
     *  @param {Number}     second
     *  @param {String}     objElemStr
     *  @param {Function}   callback
     *  Using :  FJS.countDownJS(60,".timeCount",function(){});
     */
    countDown : function(second,objElemStr,callback){//原生JS倒计时函数：不依赖jQuery
        var sendCheckCodeBtn = document.querySelector(objElemStr),
            _this = this;
        second--;
        if (second == 0) {
            sendCheckCodeBtn.innerHTML = '发送验证码';
            if(typeof callback === 'function'){
                callback();
            }
        }else {
            sendCheckCodeBtn.innerHTML = second + '秒后可重发';
            setTimeout(function() {
                _this.countDown(second,objElemStr,callback);
            }, 1000);
        }
    },
    /** 倒计时 :长时间倒计时（03:60:60）
     *  @param {Number}     minutes  : 分钟数
     *  @param {String}     objElemStr
     *  @param {Function}   callback
     *  Using :  FJS.countDownJS(60,".timeCount",function(){});
     */
    countDownHourMinute:function(minutes,objElemStr,callback){
        var allM = minutes*60+1,//补一秒
            targetElement = document.querySelector(objElemStr),
            isOver = false,
            _restTime,hour,minite,second,_html;
        countDownInner(allM);
        function countDownInner(allM){
            _restTime = allM;
            _restTime--;
            if(_restTime==0){
                isOver = true;
            }else{
                hour = Math.floor(_restTime/3600);
                minite = Math.floor((_restTime-hour*3600)/60);
                second = _restTime-hour*3600-minite*60;
                if(hour<10){
                    hour = "0"+hour;
                }
                if(minite<10){
                    minite = "0"+minite;
                }
                if(second<10){
                    second = "0"+second;
                }
                _html = hour+":"+minite+":"+second;
            }
            if (isOver) {
                targetElement.innerHTML = '00:00:00';
                if(typeof callback === 'function'){
                    callback();
                }
            }else {
                targetElement.innerHTML = _html;
                setTimeout(function() {
                    countDownInner(_restTime,objElemStr,callback);
                }, 1000);
            }
        }
    },
    /** 图片懒加载
     *  @param  {String} elem
     **/
    lazyLoadImg:function(elem){
        var _this = this,
            oAllImg = $(elem);
        oAllImg.each(function (i) {
            var _currentImg = oAllImg.eq(i);
            loadImg(_currentImg);
        });
        function loadImg(currentImg){
            var trueImgLink = $(currentImg).attr("data-lazyload");
            checkImgLoadOver(trueImgLink,function(){
                // $(currentImg).attr("src",trueImgLink);
                $(currentImg).attr("src",trueImgLink)
                    .animate({
                        opacity : 1
                    },300);
            });
        }
        function checkImgLoadOver(url,callbackFn){
            var _img = new Image();
            _img.src = url;
            if(_img.complete){
                callbackFn.call(_img);
                return;
            }
            _img.onload = function(){
                callbackFn.call(_img);
            }
        }
    },
    /**
     * 客户端检测
     */
    userAgent : {
        text:navigator.userAgent,
        device:{
            Desktop:(window.navigator.userAgent.indexOf("Windows")!=-1) || (window.navigator.userAgent.indexOf("Macintosh")!=-1),
            Mobile: (window.navigator.userAgent.indexOf("iPhone")!=-1) || (window.navigator.userAgent.indexOf("iPad")!=-1 ) || (window.navigator.userAgent.indexOf("iPod")!=-1 ) || (window.navigator.userAgent.indexOf("Android")!=-1) || (window.navigator.userAgent.indexOf("BlackBerry")!=-1)
        },
        os:{
            Windows:(window.navigator.userAgent.indexOf("Windows")!=-1),
            Mac:(window.navigator.userAgent.indexOf("Macintosh")!=-1),
            IPhone:(window.navigator.userAgent.indexOf("iPhone")!=-1),
            IPad:(window.navigator.userAgent.indexOf("iPad")!=-1 ),
            IPod:(window.navigator.userAgent.indexOf("iPod")!=-1 ),
            Android:(window.navigator.userAgent.indexOf("Android")!=-1),
            BlackBerry:(window.navigator.userAgent.indexOf("BlackBerry")!=-1)
        },
        browser:{
            IE:(window.navigator.userAgent.indexOf("MSIE")!=-1) || (window.navigator.userAgent.indexOf("Trident/")!=-1),
            Firefox:(window.navigator.userAgent.indexOf("Firefox")!=-1),
            Chrome:(window.navigator.userAgent.indexOf("Chrome")!=-1),
            Safari:(window.navigator.userAgent.indexOf("Safari")!=-1),
            Opera:(window.navigator.userAgent.indexOf("Opera")!=-1),
            type:function(){
                if(UserAgent.browser.IE)
                    return "IE";
                else if(UserAgent.browser.Firefox)
                    return "Firefox";
                else if(UserAgent.browser.Chrome)
                    return "Chrome";
                else if(UserAgent.browser.Safari)
                    return "Safari";
                else if(UserAgent.browser.Opera)
                    return "Opera";
            },
            version:function(){
                ua = window.navigator.userAgent;
                if(UserAgent.browser.IE)
                {
                    var rv = -1;
                    if (navigator.appName == 'Microsoft Internet Explorer')
                    {
                        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                        if (re.exec(ua) != null)
                            rv = parseFloat( RegExp.$1 );
                    }
                    else if (navigator.appName == 'Netscape')
                    {
                        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
                        if (re.exec(ua) != null)
                            rv = parseFloat( RegExp.$1 );
                    }
                    return rv;
                }
                else if(UserAgent.browser.Firefox)
                {
                    uaMatch = /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua.toLowerCase());
                    return uaMatch[2];
                }
                else if(UserAgent.browser.Chrome)
                {
                    uaMatch = /(chrome)[ \/]([\w.]+)/.exec(ua.toLowerCase());
                    return uaMatch[2];
                }
                else if(UserAgent.browser.Safari)
                {
                    uaMatch = /(version)[ \/]([\w.]+)/.exec(ua.toLowerCase());
                    return uaMatch[2];
                }
                else if(UserAgent.browser.Opera)
                {
                    uaMatch = /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua.toLowerCase());
                    return uaMatch[2];
                }
            }
        }
    },
    /** 加载框
     *  @param  {Boolean} isLoading
     */
    isLoading : function(isLoading){
        var oDiv = document.createElement("div");
        oDiv.className = "app-loading";
        var loadHtml = `<div class="app-loading-content"><div class="load-effect">
                            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                        </div></div>`;
        oDiv.innerHTML = loadHtml;
        var loadingEl = document.querySelector(".app-loading"),
            hasLoadingEl = loadingEl?true:false;
        try {
            if(isLoading&&!hasLoadingEl){
                document.body.appendChild(oDiv);
            }else{
                document.body.removeChild(loadingEl);
            }
        } catch (error) {
            console.log(error);
        }
            
    },
    /**
    *  打开模态框
    *  @param   {Object} options
    *           {String} title          
    *           {String} text 
    *           {String} minutes 
    */
   openNotice:function(options){
        var randomString = Math.random().toString(36).substr(2),
            randomId = "#js-dialogNotice"+"-"+randomString;//生成唯一id
        var oDiv = document.createElement("div");
        oDiv.className = "dialog-wrap";
        oDiv.id = randomId;
        var noticeHtml = `<div class="dialog-content">
                            <header>
                                <h3>${options.title||"温馨提示"}</h3>
                            </header>
                            <div class="main">
                                <div class="notice-content">${options.text}</div>
                            </div>
                        </div>`;
        oDiv.innerHTML = noticeHtml;
        var noticeEl = document.getElementById(randomId),
            hasNoticeEl = noticeEl?true:false;
        if(!hasNoticeEl){
            document.body.appendChild(oDiv);
            setTimeout(function(){
                document.body.removeChild(document.getElementById(randomId));
            },options.minutes||2000);
        }else{
            document.body.removeChild(noticeEl);
        }
    },
    openModal:function(options){
        var randomString = Math.random().toString(36).substr(2),
            randomId = "#js-dialogNotice"+"-"+randomString;//生成唯一id
        var oDiv = document.createElement("div");
        oDiv.className = "dialog-wrap";
        oDiv.id = randomId;
        var noticeHtml = `<div class="dialog-content">
                            <header>
                                <h3>${options.title||"温馨提示"}</h3>
                            </header>
                            <div class="main">
                                <div class="notice-content">${options.text}</div>
                                <div class="notice-innerBtn">
                                    <input id="js-callBack" type="button" value="${options.btnText||'确定'}" class="app-btn app-btn-default">
                                </div>
                            </div>
                        </div>`;
        oDiv.innerHTML = noticeHtml;
        var noticeEl = document.getElementById(randomId),
            hasNoticeEl = noticeEl?true:false;
        if(!hasNoticeEl){
            document.body.appendChild(oDiv);
            $("#js-callBack").on("click",function(){
                if(options.callback){
                    options.callback();
                    document.body.removeChild(document.getElementById(randomId));
                }else{
                    document.body.removeChild(document.getElementById(randomId));
                }
            })
        }else{
            document.body.removeChild(noticeEl);
        }
    },
    openModalBtns:function(options){
        var randomString = Math.random().toString(36).substr(2),
            randomId = "#js-dialogNotice"+"-"+randomString;//生成唯一id
        var oDiv = document.createElement("div");
        oDiv.className = "dialog-wrap";
        oDiv.id = randomId;
        var noticeHtml = `<div class="dialog-content has-footer">
                            <header>
                                <h3>${options.title||"温馨提示"}</h3>
                            </header>
                            <div class="main">
                                <div class="notice-content">${options.text}</div>
                            </div>
                            <footer>
                                <a href="javascript:;" id="cancel-${randomString}">${options.cancelText||'取消'}</a>
                                <a href="javascript:;" id="check-${randomString}">${options.checkText||'确定'}</a>
                            </footer>
                        </div>`;
        oDiv.innerHTML = noticeHtml;
        var noticeEl = document.getElementById(randomId),
            hasNoticeEl = noticeEl?true:false;
        if(!hasNoticeEl){
            document.body.appendChild(oDiv);
            $("#cancel-"+randomString).on("click",function(){
                document.body.removeChild(document.getElementById(randomId));
            });
            $("#check-"+randomString).on("click",function(){
                if(options.checkFn){
                    options.checkFn();
                    document.body.removeChild(document.getElementById(randomId));
                }else{
                    document.body.removeChild(document.getElementById(randomId));
                }
            });
        }else{
            document.body.removeChild(noticeEl);
        }
    },
    /** 判断数据是否为手机号
     *  @param   {String} str_mobile
     *  @returns {Boolean}
     **/
    isMobile : function (str_mobile) {
        var length = str_mobile.length;
        return length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(str_mobile);
    },
    /**
     * 判断移动端还是PC端
     */
    isMobileDevice:function(){
        var userAgentStr = navigator.userAgent;
        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgentStr)) {
            return true;
        } else {
            return false;
        }
    },
    /**  时间格式化
     * @param   {String} timestamp  时间戳
     * @param   {String} pattern 格式化字符串,如 "yy-MM-dd hh:mm:ss"
     * @returns {String}, 格式化后的时间
     * @example Mtils.text.format(new Date().getTime(), "yy年MM月dd日  hh时mm分ss秒");
     **/
    formatDate : function (timestamp, pattern) {
        var tmp = new Date(Number(timestamp));
        var o = {
            "M+": tmp.getMonth() + 1, //month
            "d+": tmp.getDate(), //day
            "h+": tmp.getHours(), //hour
            "m+": tmp.getMinutes(), //minute
            "s+": tmp.getSeconds(), //second
            "q+": Math.floor((tmp.getMonth() + 3) / 3), //quarter
            "S": tmp.getMilliseconds() //millisecond
        }

        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (tmp.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(pattern)) {
                pattern = pattern.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return pattern;
    },
    /**
     * 保证页面不读取缓存
     */
    hackWKWebView:function(obj){
        var browserType = /^.*((iPhone)|(iPad)|(Safari))+.*$/;
        if(browserType.test(navigator.userAgent)){
            window.onpageshow=function(event){
                //event.persisted
                if(event.persisted){
                    console.log("persisted:"+event.persisted);
                    obj.init();
                }
            }
        }
    },
      /**
     * 判断是否是微信
     */
    isWeiXin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        }else {
            return false;
        }
    },
     /**
     * 验证手机号码
     */
    checkPhoneNumber:function(obj){
        var reg = /^1[345789]\d{9}$/;
        var phone = $("."+obj).val();
        return reg.test(phone);
    },
    /**
     * 验证是否是大于0的数字
     */
    checkNumber:function(obj){
        var reg = /^[0-9]*$/;
        var checkNumber = $("#"+obj).val();
        return reg.test(checkNumber);
    },
    /*错误码含义*/
    codeState:function(code,desc){
        var str = '';
        switch(code){
            case '104':
                str = '游戏不存在';
            case '110':
                str = '今日已预约三个新开服游戏,请明天再预约';
            case '111':
                str = '预约新开服提醒失败';
            case '120':
                str = '加载游戏获取积分失败';
            case '202':
                str = '没有剩余礼包可领取';
            case '501':
                str = desc;
                break;
            case '502':
                str = '验证码错误';
                break;
            case '503':
                str = '验证码过期';
                break;
            case '504':
                str = '验证码已使用';
                break;
            case '505':
                str = '请求验证码超出次数';
                break;
            case '506':
                str = '请求验证码过快';
                break;
            case '507':
                str = '账号已存在，请直接登录';
                break;
            case '508':
                str = '密码未设置';
                break;
            case '509':
                str = '密码错误';
                break;
            case '510':
                str = '账户不存在';
                break;
            case '511':
                str = '参数错误';
                break;
            case '512':
                str = '获取用户信息（站内）错误';
                break;
            case '513':
                str = '订单号不存在';
                break;
            case '514':
                str = '用户已签到';
                break;
            case '515':
                str = '签到错误';
                break;
            case '516':
                str = 'token已失效';
                break;
            default:
                str = '获取信息失败';
        };
        return str;
    },
    /**
     * 分转元
     * @param fen 可以是一个对象,或者一个数字
     * @param props  对象中需要转换的属性列表
     * @returns {number}
     */
    fenToYuan:function(fen,props){
        try{
            if(!fen){
                return 0.00;
            } else if(null == fen){
                return 0.00;
            } else if(fen == 'NaN'){
                return 0.00;
            } else if(0 == fen){
                return 0.00;
            } else if(fen == 'noData'){
                return '';
            }
            if(!props){
                return (parseInt(fen)/100).toFixed(2);
            }else{
                for(var index in props){
                    if(fen[props[index]]){
                        fen[props[index]]=(parseInt(fen[props[index]])/100).toFixed(2);
                    }
                }
                return fen;
            }
        }catch (e){
            return fen;
        }
    },
    /**
     * 元转分
     * @param yuan
     * @param props   如果传入该参数,说明yuan参数是个对象,props是需要转换的属性列表
     * @param notCopy  默认会copy一个新的对象出来
     * @returns {*}
     */
    yuanToFen:function(yuan,props,notCopy){
        if(!props){
            return parseInt(yuan * 100);
        }else{
            var newObj=yuan;
            if(!notCopy){
              newObj=JSON.parse( JSON.stringify( yuan ) );
            }
            for(var index in props){
                if(newObj[props[index]]){
                    newObj[props[index]]=newObj[props[index]]*100;
                }
            }
            return newObj;
        }
    },
    /**
     * 唤起QQ app
     */ 
    awakenQQ:function (){  
        var type = undefined;  
        var param = "";  
        var sid = 2;  
        var rawuin = 0;//写qq号  
        var qsig = "undefined";  
        var QQApi = {  
            openURL: function(url){  
                var i = document.createElement('iframe');  
                i.style.display = 'none';  
                i.onload = function() { 
                    i.parentNode.removeChild(i); 
                };  
                i.src = url;  
                document.body.appendChild(i);  
   
                var returnValue = QQApi.__RETURN_VALUE;  
                QQApi.__RETURN_VALUE = undefined;  
                return returnValue;  
            },  
            isAppInstalled: function(scheme) {  
                var parameters = {'scheme':scheme};  
                var r = QQApi.openURL('jsbridge://app/isInstalled_?p=' + encodeURIComponent(JSON.stringify(parameters)));  
                return r ? r.result : null;  
            },  
            isQQWebView: function(){  
                return QQApi.isAppInstalled('mqq') == true;  
            },  
            __RETURN_VALUE: undefined  
        };  
        var usa=navigator.userAgent;  
        var p;  
        var mobile_q_jump = {  
            android:"https://play.google.com/store/apps/details?id=com.tencent.mobileqq",  
            ios:"itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8",  
            winphone:"http://www.windowsphone.com/zh-cn/store/app/qq/b45f0a5f-13d8-422b-9be5-c750af531762",  
            pc:"http://mobile.qq.com/index.html"  
        };  
        var isMQ = 0;  
        if(typeof type == "undefined") type = 1;  
        if(usa.indexOf("Android")>-1){  
            p = "android";  
        }  
        else if(usa.indexOf("iPhone")>-1 || usa.indexOf("iPad")>-1 || usa.indexOf("iPod")>-1){  
            p = "ios";  
        }  
        else if(usa.indexOf("Windows Phone") > -1 || usa.indexOf("WPDesktop") > -1){  
            p = "winphone";  
        }  
        else {  
            p = "pc";  
        }  
        if(p == "ios"){  
            //防止循环  
            if(history.pushState)  
            history.pushState({},"t","#");  
            isMQ = QQApi.isQQWebView();  
            if (!isMQ){  
                var sc = document.createElement("script");  
                sc.src = "http://__.qq.com/api/qqapi.js";  
                sc.onload = function(){  
                    if(window['iOSQQApi']){  
                        isMQ =iOSQQApi.device.isMobileQQ();  
                    }  
                };  
                document.body.appendChild(sc);  
            }  
        }else if(p == "pc" && qsig != "undefined"){  
             window.open(qsig,"_self");  
        }  
        if(type == 1){//手Q  
            var isSuccess = true;  
            var f = document.createElement("iframe");  
            f.style.display = "none";  
            document.body.appendChild(f);  
            f.onload = function(){  
                isSuccess = false;  
            };  
            if(p == "ios" && sid == 1){  
                f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin="+ rawuin +"&card_type=person&source=qrcode";  
            }  
            if(p == "ios" && sid == 2){//ios并且为群名片  
                f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin="+ rawuin +"&card_type=person&source=qrcode";  
            } else if(p != "pc"){  
                var url = window.location.href.split("&");  
                f.src = "mqqopensdkapi://bizAgent/qm/qr?url=" + encodeURIComponent(url[0]);  
            }  
            if(p == "android" && sid == 1){  
                f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin="+ rawuin +"&card_type=person&source=qrcode";  
            }  
            if(p == "android" && sid == 2){//ios并且为群名片  
                f.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin="+ rawuin +"&card_type=person&source=qrcode";  
            }  
            var now = Date.now();  
            setTimeout( function(){  
                if((p == "ios" && !isMQ && Date.now() - now < 2000) || (p == "android" && !isSuccess) || ((p == "winphone" && Date.now() - now < 2000))){  
                    var jumpUrl = mobile_q_jump[p];  
                    if(jumpUrl) window.open(jumpUrl,"_self");  
                }  
            } , 1500);  

        }  
    },  
    /**
     * 数字检测
     */
    isInt : function (str_data) {
        var re = /^[0-9]+.?[0-9]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
    　　if (!re.test(str_data)) {
    　　　　return false;
    　　}else{
            return true;
        }
    },
    dragMobile:function(element){
        var winW = $(window).width(),
            winH = $(window).height(),
            el = $(element),
            elW = el.width(),
            elH = el.height(),
            fingerW = null,
            fingerH = null;
        //console.log(winW,winH,elW,elH);
        var obj = document.querySelector(element);
        //console.log(obj);
        obj.addEventListener("touchstart",function(e){
            //console.log(e);
            var touches = e.touches[0];
            //元素上的
            fingerW = touches.clientX - obj.offsetLeft;
            fingerH = touches.clientY - obj.offsetTop;
            /*
            console.log('clientXY：'+touches.clientX+','+touches.clientY);
            console.log('offsetXY：'+obj.offsetLeft+','+obj.offsetTop);
            console.log("鼠标在icon上的位置："+fingerW+','+fingerH);
            */
            //阻止页面的滑动默认事件
            // document.addEventListener("touchmove",function(e){
            //     e.preventDefault();
            // },false);
        },false);
        obj.addEventListener('touchmove',function(e){
            var touches = e.touches[0],
                lefResult = 0,topResult = 0;
            //console.log("移动位置:"+touches.clientX+','+touches.clientY);

            if(touches.clientX<=fingerW){
                leftResult = 0;
            }else if(touches.clientX>=winW-elW){
                lefResult = winW-elW;
            }else{
                lefResult = touches.clientX-fingerW;
            }
            if(touches.clientY<=fingerH){
                topResult = 0;
            }else if(touches.clientY>=winH-elH){
                topResult = winH-elH;
            }else{
                topResult = touches.clientY-fingerH;
            }
            /*
            console.log('resultX:'+touches.clientX);
            console.log('resultY:'+touches.clientY);
            */
            obj.style.top = topResult + 'px';
            obj.style.left = lefResult + 'px';
        });
        obj.addEventListener("touchend",function() {
            document.removeEventListener("touchmove",function(e){
                e.preventDefault();
            },false);
        },false);
    },
    dragPC:function(element){
        var winW = $(window).width(),
            winH = $(window).height(),
            bodyW = $('body').width(),
            bodyH = $('body').height(),
            el = $(element),
            elW = el.width(),
            elH = el.height(),
            harfW = (winW-bodyW)/2,
            fingerW = null,
            fingerH = null;
        //console.log(winW,winH,bodyW,bodyH,elW,elH,harfW);
        var obj = document.querySelector(element);
        obj.onmousedown = function(e){
            //console.log(e);
            // 元素上的
            fingerW = e.clientX - obj.offsetLeft;
            fingerH = e.clientY - obj.offsetTop;
            /*
            console.log('clientXY：'+e.clientX+','+e.clientY);
            console.log('offsetXY：'+obj.offsetLeft+','+obj.offsetTop);
            console.log("鼠标在icon上的位置："+fingerW+','+fingerH);
            */
            document.body.onmousemove = function(e){
                e.preventDefault();
                var lefResult = 0,topResult = 0;
                //console.log("移动位置:"+e.clientX+','+e.clientY);
    
                if(e.clientX<=fingerW){
                    leftResult = 0;
                }else if(e.clientX>=(bodyW+harfW-elW)){
                    lefResult = bodyW-elW;
                }else{
                    lefResult = e.clientX-fingerW;
                }
                //console.log(bodyW-elW);
                if(e.clientY<=fingerH){
                    topResult = 0;
                }else if(e.clientY>= bodyH-elH){
                    topResult = bodyH-elH;
                }else{
                    topResult = e.clientY-fingerH;
                }
                /*
                console.log('bodyW-elW:'+(bodyW-elW));
                console.log('resultX:'+e.clientX);
                console.log('resultY:'+e.clientY);
                */
                obj.style.left = lefResult + 'px';
                obj.style.top = topResult + 'px';
            }	
            obj.onmouseup = function(){
                document.body.onmousemove = null;
            };
        };
    }
};
Object.defineProperty(Restful.prototype, 'constructor', {
    value: Restful,
    writable: true,
    configurable: true,
    enumerable: false
});
window.rf = window.restful = new Restful();
})(window);

