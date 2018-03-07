var recharge = {
	init:function(){
		this.goForward();
	},
	goForward: function(){
		$("#refresh").click(function(){
			window.location.href = "leaguer-center.html"
		})	
	}
}

Zepto(function($){
	recharge.init();
})