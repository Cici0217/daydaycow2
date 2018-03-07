var mycowdetail = {
	init:function(){
		this.goForward();
	},
	goForward: function(){
		$("#purchase").click(function(){
			window.location.href = "purchase.html"
		})
	}
}

Zepto(function($){
	mycowdetail.init();
})