/*
jquery.flash v1.3.1 -  02/01/10
(c)2009 Stephen Belanger - MIT/GPL.
http://docs.jquery.com/License
*/
Array.prototype.indexOf=function(o,i){for(var j=this.length,i=i<0?i+j<0?0:i+j:i||0;i<j&&this[i]!==o;i++);return j<=i?-1:i;};$.fn.extend({flash:function(opt){var has,cv,ie;function attr(a,b){return' '+a+'="'+b+'"';}function param(a,b){return'<param name="'+a+'" value="'+b+'" />';}var p=navigator.plugins;if(p&&p.length){var f=p['Shockwave Flash'];if(f){has=true;if(f.description)cv=f.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");}if(p['Shockwave Flash 2.0']){has=true;cv='2.0.0.11';}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");cv=[6,0,21];has=true;}catch(e){};try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){};}if(axo!=null){cv=axo.GetVariable("$version").split(" ")[1].split(",");has=true;ie=true;}}$(this).each(function(){if(has){var e=$(this),s=$.extend({'id':e.attr('id'),'class':e.attr('class'),'width':e.width(),'height':e.height(),'src':e.attr('href'),'classid':'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000','pluginspace':'http://get.adobe.com/flashplayer','availattrs':['id','class','width','height','src'],'availparams':['src','bgcolor','quality','allowscriptaccess','allowfullscreen','flashvars','wmode'],'version':'9.0.24'},opt),a=s.availattrs,b=s.availparams,rv=s.version.split('.'),o='<object';if(!s.codebase){s.codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+rv.join(',');}if(s.express){for(var i in cv){if(parseInt(cv[i])>parseInt(rv[i])){break;}if(parseInt(cv[i])<parseInt(rv[i])){s.src=s.express;}}}if(s.flashvars){s.flashvars=unescape($.param(s.flashvars));}a=ie?a.concat(['classid','codebase']):a.concat(['pluginspage']);for(k in a){var n=(k==a.indexOf('src'))?'data':a[k];o+=s[a[k]]?attr(n,s[a[k]]):'';};o+='>';for(k in b){var n=(k==b.indexOf('src'))?'movie':b[k];o+=s[b[k]]?param(n,s[b[k]]):'';};o+='</object>';e.replaceWith(o);}return this;});}});
//视频
$.fn.playSohuVideo = function(o) {
	var conf = {
			v_id: '75956079', //视频id
			title: '',
			width: 640,
			height: 360,
			allowFullScreen: 'true',
			allowscriptaccess: 'always',
			wmode: 'Transparent',
			isPhone: false,
			api_key: '2b7e9d5dc22b6c6b66e770b5793c4190', //pc游戏去广告
			api_key2: '79d7a39ef613c6b0499e4660af558dd9', //手机游戏去广告，
			co: '31', //清晰度(默认超清)：2，1，21，31 依次为普清、高清、超清、原画
			autoPlay: true //传入值：true-自动播放，false-不自动播放
		},
		url = '',
		keys = '';
	conf = $.extend(conf, o);
	keys = conf.api_key;
	if (conf.isPhone) {
		keys = conf.api_key2;
	}
	url = 'http://share.vrs.sohu.com/my/v.swf&id=' + conf.v_id + '&skinNum=8&fbarad=0&autoplay=' + conf.autoPlay + '&sogouBtn=0&showCtrlBar=0&api_key=' + keys + '&co=' + conf.co + '&topBar=0&showRecommend=0&shareBtn=0&likeBtn=0&topBarFull=0&topBarNor=0&sogouBtn=0&isListPlay=0&mainswf=1';
	return this.each(function() {
		$(this).replaceWith('<object id="' + $(this).attr('id') + '" width="' + conf.width + '" height="' + conf.height + '">\
						<param name="movie" value="' + url + '"></param>\
						<param name="allowFullScreen" value="' + conf.allowFullScreen + '"></param>\
						<param name="allowscriptaccess" value="' + conf.allowscriptaccess + '"></param>\
						<param name="wmode" value="' + conf.wmode + '"></param>\
						<embed width="' + conf.width + '" \
						   height="' + conf.height + '" \
						   wmode="' + conf.wmode + '" \
						   allowFullScreen="' + conf.allowFullScreen + '" \
						   allowscriptaccess="' + conf.allowscriptaccess + '" \
						   quality="high" \
						   src="' + url + '"\
						   type="application/x-shockwave-flash" /></embed>\
					</object>');
	});
};
//旧视频
$.fn.playSohuOldVideo = function(o){
  var conf = {
    v_id : '75956079',//视频id
    title : '',
    width : 640 ,
    height: 360 ,
    allowFullScreen:'true',
    allowscriptaccess:'always',
    wmode:'Transparent',
    api_key:'2b7e9d5dc22b6c6b66e770b5793c4190',//去广告
    autoPlay: true //传入值：1-自动播放，0-不自动播放
    },
    url = '';
    conf = $.extend(conf, o);
    url = 'http://share.vrs.sohu.com/' + conf.v_id + '/v.swf&skinNum=8&fbarad=0&autoplay='+ conf.autoPlay +'&sogouBtn=0&showCtrlBar=0&api_key=' + conf.api_key +'&topBar=0&showRecommend=0&shareBtn=0&likeBtn=0&topBarFull=0&topBarNor=0&sogouBtn=0&isListPlay=0&mainswf=1';
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
//flv播放

$.fn.commVideoPlayer = function(o){
  var conf = {
    v_id : '75956079',//视频id
    width : 640 ,
    height: 360 ,
    isPhone:false,//true-手游，false-端游
    co:'31',//清晰度(默认原画)：2，1，21，31 依次为普清、高清、超清、原画
    autoPlay: true //传入值：true-自动播放，false-不自动播放
    };
	conf = $.extend(conf, o);
	if(conf.v_id.length > 7 && conf.v_id.length<10){//8位长度id通用图标
		$(this).playSohuVideo({
		  v_id : conf.v_id,
		  isPhone:conf.isPhone,
		  co: conf.co,
		  autoPlay:conf.autoPlay,
		  width: conf.width,
		  height: conf.height
		});
	}else if(conf.v_id.length < 8){
		$(this).playSohuOldVideo({
				v_id: conf.v_id,
				autoPlay:conf.autoPlay,
				width: conf.width,
				height: conf.height
			});
	}else if(conf.v_id.length > 10){
		$(this).flash({
			'src':'http://www.changyou.com/cyouFile/commVideoPlayer/gddflvplayer.swf',
			'width':conf.width,
			'height':conf.height,
			'allowfullscreen':'true',
			'allowscriptaccess':'always',
			'wmode':'transparent',
			'flashvars': {
				'vdo':conf.v_id,
				'autoplay':conf.autoPlay,
				'sound':'60',
				'splashscreen':''
			}
		});
	}
}