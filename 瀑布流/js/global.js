	//视频
$.fn.playSohuVideo = function(o){
	var conf = {
		v_id : '77726009',//视频id
		title : '',
		width : 640 ,
		height: 360 ,
		allowFullScreen:'true',
		allowscriptaccess:'always',
		wmode:'Transparent',
		api_key:'2b7e9d5dc22b6c6b66e770b5793c4190',//去广告
		co:'31',//清晰度(默认原画)：2，1，21，31 依次为普清、高清、超清、原画
		autoPlay: true //传入值：true-自动播放，false-不自动播放
		},
		url = '';
		conf = $.extend(conf, o);
		url = 'http://share.vrs.sohu.com/my/v.swf&id='+ conf.v_id +'&skinNum=8&fbarad=0&autoplay='+ conf.autoPlay +'&sogouBtn=0&showCtrlBar=0&api_key=' + conf.api_key +'&co=' + conf.co +'&topBar=0&showRecommend=0&shareBtn=0&likeBtn=0&topBarFull=0&topBarNor=0&sogouBtn=0&isListPlay=0&mainswf=1';
	  return this.each(function(){
		  $(this).replaceWith('<object id="'+ $(this).attr('id') +'" width="'+ conf.width +'" height="'+ conf.height +'">\
						<param name="movie" value="'+ url +'"></param>\
						<param name="allowFullScreen" value="'+ conf.allowFullScreen +'"></param>\
						<param name="allowscriptaccess" value="'+ conf.allowscriptaccess +'"></param>\
						<param name="wmode" value="'+ conf.wmode +'"></param>\
						<embed width="'+ conf.width +'" \
						   height="'+ conf.height +'" \
						   wmode="'+ conf.wmode +'" \
						   allowFullScreen="'+ conf.allowFullScreen +'" \
						   allowscriptaccess="'+ conf.allowscriptaccess +'" \
						   quality="high" \
						   src="'+ url +'"\
						   type="application/x-shockwave-flash" /></embed>\
					</object>');
	});
};

$(function(){
	$('.nav').hover(function(){
		$('.nav_sub').show();
	},function(){
		$('.nav_sub').hide();
	})

	//if($(".jCarouselLite li").length > 1){
	//	$(".jCarouselLite").jCarouselLite({
	//		auto: 2000, //图片停留时间
	//		scroll: 1, //每次滚动覆盖的图片个数
	//		speed: 800, //设置速度，0是不动。其次就是数字越大 ，移动越慢。
	//		vertical: true, //横向（true），竖向（false）
	//		visible: 1, //显示的数量
	//
	//		circular: true, //是否循环
	//		play: true//停止自动播放，true则是自动播放
	//	});
	//}
	
	//壁纸视频小导航激活判断
	var address=window.location.href;
	$(".sub_nav a").each(function(){
		var href=$(this).attr("href");
		if(address.indexOf(href)>-1){
			$(this).addClass("current");
		}
	   
	});
	
});
//合作媒体展示
$('.media').hover(function(){
	$('.media_box').stop(true,true).slideDown()
},function(){
	$('.media_box').stop(true,true).slideUp()
});