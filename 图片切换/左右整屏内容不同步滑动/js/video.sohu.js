	$.fn.playSohuVideo = function(o){
	  var conf = {
		  v_id : '75956079',//视频id
		  title : '',
		  width : 640 ,
		  height: 360 ,
		  allowFullScreen:'true',
		  allowscriptaccess:'always',
		  wmode:'Transparent',
		  api_key:'2b7e9d5dc22b6c6b66e770b5793c4190',//去广告
		  autoPlay: 1 //传入值：1-自动播放，0-不自动播放
		  },
		  url = '';
		  conf = $.extend(conf, o);
		  url = 'http://share.vrs.sohu.com/my/v.swf&id='+ conf.v_id +'&skinNum=8&fbarad=0&autoplay='+ conf.autoPlay +'&sogouBtn=0&showCtrlBar=0&api_key=' + conf.api_key +'&topBar=0&showRecommend=0&shareBtn=0&likeBtn=0&topBarFull=0&topBarNor=0&sogouBtn=0&isListPlay=0&mainswf=1';
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
