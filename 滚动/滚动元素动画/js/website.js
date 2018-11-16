//音频
var thePlayer = new jwplayer('jw').setup({
	flashplayer: 'flash/jwplayer.flash.swf'
	,file: $(".music").attr("data-music")
	,autostart: true
	,repeat: true
	,height: 0
	,width: 0
});

var has_closed=false;
$(".music").click(function(){
	if($(this).hasClass("open")){
		$(this).removeClass("open");
		has_closed=true;
	}else{
		$(this).addClass("open");
		has_closed=false;
	}
	thePlayer.play();
});
function music_switch(){
	if($(".music").hasClass("open")){
		$(".music").removeClass("open");
		thePlayer.play(false);
	}
}

//视频
function video_show(self){
	var video_id=$(self).attr("rel");
	var video_title=$(self).attr("title");
	$(".video_player dt strong").html(video_title);
	$(".video_player dd span").commVideoPlayer({
		width: 640 ,
		height: 360,
		v_id  : video_id
	})
	popup($(".video_player"));
}

$(".btn_video").click(function(){
	music_switch();
	video_show(this);
});

$(".video_player .close").click(function(){
	if(has_closed==false){
		$(".music").addClass("open");
		thePlayer.play(true);
	}
	$(".video_player dd").html("<span></span>");
});

//微信下拉
(function(){
	var enter_action , leave_action;
	$(".links a.btn_wechat").live("mouseenter",function(){
		clearTimeout(leave_action);
		enter_action = setTimeout(function(){
			$(".links a.btn_wechat img").animate({"opacity":"show","top":"34px"});
		},101);
	});
	$(".links a.btn_wechat").live("mouseleave",function(){
		clearTimeout(enter_action);
		leave_action=setTimeout(function(){
			$(".links a.btn_wechat img").animate({"opacity":"hide","top":"14px"});
		},101);
	});
})();


//分享
var share = new Cyoushare('share', {
	offset: ['0px', '0px'],
	icon: 'small', // 使用小图标
	gap: '4px', // 图标间隔5px
	notShareTo: '', // 不分享到(如's_copy, s_txwb') 默认为空，表示为分享到所有
	title: '',
	url: '', // 分享的地址
	content: '这还是你熟知的上古神话吗？#蛮荒搜神记#大荒山海图今日开启，告诉你蛮荒世界真实的模样。@蛮荒搜神记',
	showTitle: 'false'
});

$(".links a.btn_sina").live("click",function(){
	$(".s_xlwb").click();	
});
	


//手机号获取验证码并提交验证码
$(".links a:contains(预约)").live("click",function(){
	popup($(".pop_appoint"));
});

var times,time_num=60,time_default=time_num,code_default="获取验证码",phone_num="",phone_code="",device_type="android";
var u_phone = new RegExp("^1[3|4|5|7|8][0-9]{9}$");

function boolean_phone(phone_num){
	if (phone_num=="") {
		alert("请填写手机号码！");
		return false;
	} else if (!u_phone.test(phone_num)) {
		alert("请填写正确的手机号码！");
		return false;
	} else {
		return true;
	}
}

//倒计时
function clear_times(){
	clearInterval(times)
	$(".btn_code").html(code_default).attr({"title":code_default}).removeClass("disabled");
	$(".phone_num").attr({"disabled":false});
	time_num=time_default;
}

function countdown(){
	time_num--;
	$(".btn_code font").html(time_num);
	if(time_num==0){
		clear_times();
	}
}
function phone_submit(phone_num){
	$.ajax({
		type: "get",
		url: "http://activity2.changyou.com/appoint/getVerificationCode.ncdo",
		dataType: "jsonp",
		data: {
			actvKey:"event_201707",
			deviceType:"pc",
			phone:phone_num,
			game:"mh"
		},
		success: function(data){
			if(data){
				if(data.errCode=="000"){
					$(".btn_code").html("*<font>"+time_num+"</font>s后再试").attr({"title":"*"+time_num+"s后再试"}).addClass("disabled");
					$(".phone_num").attr({"disabled":true});
					times=setInterval("countdown()",1000);
				}else {
					alert(data.errMsg);
				}
			}
		},
		error: function(){
		}
	});
}


$(".btn_code").click(function(){
	if(!$(this).hasClass("disabled")){
		phone_num=$.trim($(".phone_num").val());
		if(boolean_phone(phone_num)){
			phone_submit(phone_num);
		};
	};
});

function code_submit(phone_num,phone_code){
	$.ajax({
		type: "get",
		url: "http://activity2.changyou.com/appoint/verificationCode.ncdo",
		dataType: "jsonp",
		data: {
			actvKey:"event_201707",
			deviceType:"pc",
			phone:phone_num,
			game:"mh",
			numCode:phone_code
		},
		success: function(data){
			if(data){
				if(data.errCode=="000"){
					$(".step_02").show();
					$(".step_01").hide();
					$(".phone_num,.phone_code").val("");
					clear_times();
				}else {
					alert(data.errMsg);
				}
			}
		},
		error: function(){
		}
	});
}

$(".btn_appoint").click(function(){
	if(boolean_phone(phone_num)){
		phone_code=$.trim($(".phone_code").val());
		if(phone_code==""||phone_code.length>6){
			alert("请填写正确的验证码！")
		}else{
			code_submit(phone_num,phone_code);
		};
	};
});

$(".pop_appoint dt a.close").click(function(){
	$(".step_01").show();
	$(".step_02").hide();
	$(".phone_num,.phone_code").val("");
});

var scrollTops,btn_num,first_screen=true;
$(".btn a").click(function(){
	first_screen=false;
	$(this).addClass("current");
	btn_num=$(".btn a").index(this);
	$(".btn a:not('.current')").hide(400);
	$(this).animate({"opacity":"1"},500,'easeInQuint',function(){
		$(".btn").css({"border-color":"transparent"});
		$(".btn a.current").animate({"bottom":"-150%"},800,'easeInQuint');
		$(".slogan").animate({"top":"-20%"},800,'easeInQuint');
		$(".btn_video").delay(200).animate({"top":"-10%"},800,'easeInQuint',function(){
			$("html,body").css({"overflow-y":"hidden"});
			$(".sub").fadeIn().load("inc/sub0"+(parseInt(btn_num)+1)+".shtml",function(){
				loading(btn_num);
				$(".btn a").show().removeClass("current").animate({"bottom":"0"},0);;
				$(".btn").animate({"bottom":"-40%"},0);
			});
		})
			
	});
})

$(".nav a:gt(0)").live("click",function(){
	var btn_num=$(".nav a").index(this)-1;
	$(".sub").empty().load("inc/sub0"+(parseInt(btn_num)+1)+".shtml",function(){
		loading(btn_num);
	});
})

$(".nav a:eq(0)").live("click",function(){
	first_screen=true;
	$(".sub").fadeOut(function(){
		$(this).empty();
		$(".index").height("auto");
		$("html,body").css({"overflow-y":"auto"});
		$(".btn a").show(function(){
			$(".btn").animate({"bottom":"14.54%"},1200,'easeOutQuint',function(){
				$(".btn").css({"border-color":"#1f1f20"});
			});
		});
		$(".slogan").delay(200).animate({"top":"7.21%"},800,'easeOutQuint');
		$(".btn_video").animate({"top":"29.18%"},800,'easeOutQuint');
		
	});
})


//js与flash建立通信
function thisMovie(movieName) { 
	if (navigator.appName.indexOf("Microsoft") != -1) { //IE
		return window[movieName]; 
	} else { 
		return document[movieName]; //非IE
	} 
} 

var flashon=true,backto=true,flashloaded=false;//flash是否可以重播,是否经过可触发flash区域后离开，flash是否加载完
function jsFun(str){
	if(str=="finishLoad"){
		flashloaded=true;
		if(scrollTops>=2400){
			thisMovie("flash").showMovie()
			flashon=false;
			backto=false;
		}
	}
	if(str=="finishMovie"){
		flashon=true;
	}
}	



function loading(num){
//loading预加载
var imgPath = "images/",
	sourceArr = [
		['box01_01.jpg','box01_02.jpg','box01_03.jpg','box01_04.jpg','txt01_01.png','txt01_02.png','txt01_03.png','txt01_04.png','sub.png','filter.png','lu.png','yun.png','stone_right.png','stone_left.png','stone_right.png','fire.png','tree_left.png','tree_right.png']
		,['box02_01.jpg','box02_02.jpg','box02_03.jpg','box02_04.jpg','txt02_01.png','txt02_02.png','txt02_03.png','txt02_04.png','sub.png','filter.png','he.png','diao_right.png','diao_left.png','tree02_02.png','xiezi.png','qizi.png','tree02_03.png','green.png']
		,['box03_01.jpg','box03_02.jpg','box03_03.jpg','box03_04.jpg','txt03_01.png','txt03_02.png','txt03_03.png','txt03_04.png','sub.png','filter.png','flower_left.png','flower_right.png','pink.png','pink03_02.png','wood_right.png','wood_left.png','fog.png']
	];
	
sourceArr=sourceArr[num];//loading数组



for (var i = 0; i < sourceArr.length; i++) {
	sourceArr[i] = imgPath + sourceArr[i] ;
};
var loadImage = function(path, callback) {
	var img = new Image();
	img.onload = function() {
		img.onload = null;
		callback(path);
	}
	img.src = path;
}
var imgLoader = function(imgs, callback) {
	var len = imgs.length,
		i = 0;
	while (imgs.length) {
		loadImage(imgs.shift(), function(path) {
			callback(path, ++i, len);
		});
	}
}
imgLoader(sourceArr, function(path, curNum, total) {
	var percent = curNum / total;
	$('.loading div span strong').html( Math.floor(percent * 100));
	if (percent == 1) {
		setTimeout(showPage, 10);
	}
});

function showPage(){
	$(".loading").fadeOut();
	$(".nav a").eq(num+1).addClass("current");//导航激活判断

	if(num==0){
		addSWF('http://files2.changyou.com/vc/mhssj/2017/0705/3-3.swf?0705', 'flash', "1920", "900");
	}
	if(num==1){
		addSWF('http://files2.changyou.com/vc/mhssj/2017/0705/1-3.swf?0705', 'flash', "1920", "900");
	}
	if(num==2){
		addSWF('http://files2.changyou.com/vc/mhssj/2017/0705/2-3.swf?0705', 'flash', "1920", "900");
	}
}

//模拟滚动条
function resizeHeight(){
	if(first_screen==false){
		var windowHeight=$(window).height()-55;	
		$(".scroll,.sub,.index").height(windowHeight);
		$(".scroll").jScrollPane();
	}
}
resizeHeight();
$(window).resize(function(){
	resizeHeight();
});

//跟随鼠标移动
if(navigator.userAgent.indexOf("MSIE 6.0")==-1&&navigator.userAgent.indexOf("MSIE 7.0")==-1&&navigator.userAgent.indexOf("MSIE 8.0")==-1){
	var scene = document.getElementById('scroll');
	var parallax = new Parallax(scene);
}


//飞入效果
$(".box").children().each(function(){
	if($(this).attr("id")!="flash"){
		var data_p=$(this).attr("data-p").split(","), data_x=$(this).attr("data-x").split(","), data_y=$(this).attr("data-y").split(",");
		$(this).css({"left":data_x[0]+"px","top":data_y[0]+"px","position":"absolute"})
	}
})

function animations(scrollTops){
	$(".box").children().each(function(){
		if($(this).attr("id")!="flash"){
			var data_p=$(this).attr("data-p").split(","), data_x=$(this).attr("data-x").split(","), data_y=$(this).attr("data-y").split(",");
			//console.log("scrollTopsbbbb:"+scrollTops)
			if(scrollTops>=data_p[0]&&scrollTops<=data_p[1]){
				var scroll_p=data_p[1]-data_p[0];
				var scroll_n=scrollTops-data_p[0];
				var scroll_x=data_x[1]-data_x[0];
				var scroll_y=data_y[1]-data_y[0];
				$(this).stop().animate({"left":parseFloat(data_x[0])+scroll_n*scroll_x/scroll_p,"top":parseFloat(data_y[0])+scroll_n*scroll_y/scroll_p},800,'easeOutCirc',function(){
				})
			}
			
			if(scrollTops>=2400){
				if(flashon==true&&backto==true&&flashloaded==true){
					thisMovie("flash").showMovie();
					flashon=false;
					backto=false;
				}
			}else{
				backto=true;
			}
		}
	})
}

//$(window).scroll(function(){
$(".jspContainer").mousewheel(function(){
	//scrollTops=-parseInt($(".jspPane").css("top"));
	//console.log(scrollTops)
	animations(scrollTops);
	
	//右漂当前状态判断
	for(i=0; i<alength; i++){
		if(i<alength-1){
			if(scrollTops>=bgtop[i]-100&&scrollTops<bgtop[i+1]-100){
				$(".float a").eq(i).addClass("current").siblings().removeClass("current");
			}
		}else{
			if(scrollTops>=bgtop[i]-100){
				$(".float a").eq(i).addClass("current").siblings().removeClass("current");
			}
		}
	}
})

//右飘
$(".float a").eq(0).addClass("current");

var alength=$(".box").length;
var bgtop=[]
$(".box").each(function(index){
	bgtop[index]=900*(index);
});

var max_num=[0,600,1500,2400]
$(".float a").click(function(){
	var index=$(".float a").index($(this));
	$(".float a").eq(index).addClass("current").siblings().removeClass("current");
	$(".jspPane").animate({"top":-bgtop[index]});
	var jspDrag_height=$(".jspTrack").height();	
	$(".jspDrag").animate({"top":0.25*index*jspDrag_height});
	scrollTops=bgtop[index];
	for(var i=0;i<=index; i++){
		animations(max_num[i]);
	}
});

}