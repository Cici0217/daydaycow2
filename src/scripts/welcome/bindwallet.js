var bindwallet = {
	init: function(){
		this.searchBind();
		this.goForward();
	},
	goForward:function(){
		$("#begin_game_btn").click(function(){
			window.location.href = 'pet-market.html'
		})
		$("#next_step").click(function(){
			$("#bind_account").html($("#wallet_address").val());	
			bindwallet.changBindStep("sencond_step");	
		})
		$("#bind_blockchain_to_cloud_btn").click(function(){
			bindwallet.changBindStep("third_step");	
		})
		$("#bind_blockchainaddress_to_cloud_btn").click(function(){
			bindwallet.bind();
		})
		$("#chang_bind_account_btn").click(function(){
			bindwallet.changBindStep("first_step");	
		})
		
	},
	//查询云账户是否绑定区块链账户接口
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
                		$("#blockChainAddress").html(data.blockChainAddress);
                	}
                	bindwallet.getRandomNumber();
                } else {
                	window.location.href = "pet-market.html"
                }
            }
        });
    },
    //区块链账户与云账户绑定接口
    bind: function bind() {
    	var self = this;
        rf.data('bindBlockChainAddressToCloud', {
            type: 'POST',
            data: { uid: '11', phoneNumber: '18317150561', blockChainAddress: $("#blockChainAddress").val() },
            contentType: 'application/x-www-form-urlencoded',
            success: function success(data) {
                console.log(data);
                if (data && data.errorCode == "000") {
                    window.location.href="pet-market.html";
                } else {
                	rf.openNotice({text:'未创建钱包账户地址或未按要求金额转账'});
                }
            }
        });
    },
    // 返回随机数
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
                		$("#transferAmount").html(data.verifyCode);
                	}
                } 
            }
        })
    },
    // 切换绑定显示
    changBindStep: function(ID){
		$("#first_step").hide();
		$("#sencond_step").hide();	
		$("#third_step").hide();
		$("#"+ID).show();	
    }
}

Zepto(function($){
	bindwallet.init();
})