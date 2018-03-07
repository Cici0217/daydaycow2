var petmarket = {
	init:function(){
		this.dropLoad();
	},
	dropLoad: function(){
	    // 页数
	    var page = 0;
	    // 每页展示5个
	    var size = 5;
		$('.content').dropload({
	        scrollArea : window,
	        loadDownFn : function(me){
	            page++;
	            // 拼接HTML
	            var result = '';
	            $.ajax({
	                type: 'GET',
	                url: 'http://ons.me/tools/dropload/json.php?page='+page+'&size='+size,
	                dataType: 'json',
	                success: function(data){
	                    var arrLen = data.length;
	                    if(arrLen > 0){
	                        for(var i=0; i<arrLen; i++){
	                            result +=   '<li>'
	                                            +'<a href="my-cow-detail.html">天天牛</a>'+ i
	                                        +'</li>';
	                        }
	                    // 如果没有数据
	                    }else{
	                        // 锁定
	                        me.lock();
	                        // 无数据
	                        me.noData();
	                    }
	                    // 为了测试，延迟1秒加载
	                    setTimeout(function(){
	                        // 插入数据到页面，放到最后面
	                        $('.lists').append(result);
	                        // 每次数据插入，必须重置
	                        me.resetload();
	                    },1000);
	                },
	                error: function(xhr, type){
	                    alert('Ajax error!');
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
	            });
	        }
	    });
	}
}

Zepto(function($){
	petmarket.init();
})