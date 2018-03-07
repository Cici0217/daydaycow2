$(function () {
    testapi.init();
});
var testapi = {
    init: function init() {
    	this.searchBind();
    	this.bind();
    },
    /* 查询云账户是否绑定区块链账户接口 */
    searchBind: function searchBind(){
        var self = this;
        rf.data('isPhoneBindAddress', {
            type: 'get',
            data: { phoneNumber: '18317150561'},
            contentType: 'tex/html',
            success: function success(data) {
                console.log(data);
                if (data && data.errorCode == "000") {
                	if (data.blockChainAddress) {
                		$("#blockChainAddress").val(data.blockChainAddress);
                	}
                	testapi.getRandomNumber();
                } else {
                	window.location.href = "game-home.html"
                }
            }
        });
    },
    /* 区块链账户与云账户绑定接口 */
    bind: function bind() {
    	$("#bind").click(function(){
	    	var self = this;
	        rf.data('bindBlockChainAddressToCloud', {
	            type: 'POST',
	            data: { uid: '11', phoneNumber: '18317150561', blockChainAddress: $("#blockChainAddress").val() },
	            contentType: 'application/x-www-form-urlencoded',
	            success: function success(data) {
	                console.log(data);
	                if (data && data.errorCode == "000") {
	                    window.location.href="game-home.html";
	                } else {
	                	rf.openNotice({text:'未创建钱包账户地址或未按要求金额转账'});
	                }
	            }
	        });
    	})
 		
    },
    /* 返回随机数 */
    getRandomNumber: function(){
        var self = this;
        rf.data('getRandomNumber', {
            type: 'POST',
            data: { phoneNumber: '18317150561'},
            contentType: 'application/x-www-form-urlencoded',
            success: function success(data) {
                console.log(data);
                if (data && data.errorCode == "000") {
                	if (data.verifyCode) {
                		$("#randomNumber").html(data.verifyCode);
                	}
                } 
            }
        });
    }
};