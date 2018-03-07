var leaguercenter = {
	init:function(){
		this.goForward();
	},
	goForward: function(){
		$("#recharge").click(function(){
			window.location.href = "recharge.html"
		})	
	}
}

Zepto(function($){
	leaguercenter.init();
})