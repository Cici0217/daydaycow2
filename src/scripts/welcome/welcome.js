var welcome = {
	init: function(){
		this.goForward();
	},
	goForward:function(){
		$("#enter_game_btn").click(function(){
			window.location.href = 'bindwallet.html'
		})
	}
}

Zepto(function($){
	welcome.init();
})