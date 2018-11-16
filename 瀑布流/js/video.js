$(function(){
	
	$('.video_lists ul li').each(function(){
		var video_title=$(this).find("p").text();
		$(this).attr({"title":video_title});
	});	
	
	$('.video_lists ul li').click(function(){
		if(!$(this).hasClass("current")){
			$(this).addClass("current").siblings().removeClass("current");
			var title=$(this).attr("title");
			var id=$(this).attr("rel");
			$(".video_show p").text(title);
			
			if(id.length > 8 ){
				$(".video_show div").html($('<span id="replaced-Single">视频正在下载中...</span>'));
				$('#replaced-Single').flash({
				  'src':'/gddflvplayer.swf',
				  'width':'476',
				  'height':'266',
				  'allowfullscreen':'true',
				  'allowscriptaccess':'always',
				  'wmode':'transparent',
				  'flashvars': {
					'vdo':id,
					'sound':'60',
					'splashscreen':'',
					'autoplay':'true'
				  }
				});
			}else{
				$(".video_show div").html($('<span id="replaced-Single">视频正在下载中...</span>'));
				$("#replaced-Single").playSohuVideo({
					v_id: id,
					width: 476,
					height: 266
				});
			}
		}
	});
	
//视频初始加载
	function video_ready(){
		$('.video_lists ul li').eq(0).addClass("current");
		var title=$('.video_lists ul li').eq(0).attr("title");
		var id=$('.video_lists ul li').eq(0).attr("rel");
		$(".video_show p").text(title);
		if(id.length > 8 ){
			$(".video_show div").html($('<span id="replaced-Single">视频正在下载中...</span>'));
			$('#replaced-Single').flash({
			  'src':'/gddflvplayer.swf',
			  'width':'476',
			  'height':'266',
			  'allowfullscreen':'true',
			  'allowscriptaccess':'always',
			  'wmode':'transparent',
			  'flashvars': {
				'vdo':id,
				'sound':'60',
				'splashscreen':'',
				'autoplay':'false'
			  }
			});
		}else{
			$(".video_show div").html($('<span id="replaced-Single">视频正在下载中...</span>'));
			$("#replaced-Single").playSohuVideo({
				v_id: id,
				autoPlay:false,
				width: 476,
				height: 266
			});
		}
	};
	video_ready();
	
//视频切换
    $('.jcarousel').jcarousel({
        vertical: true,
        scroll: 1
    });
	
});
