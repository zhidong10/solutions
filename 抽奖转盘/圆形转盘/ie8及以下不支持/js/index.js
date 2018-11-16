//全局变量
var tag_num="";//提交手机号场合
var prize_treasure="";//宝箱获得的礼物
var prize_txt=["护宝大礼包","呵呵哒礼包"]
var prize_qiaofeng="";//乔帮主赠送的礼物
//手机正则表达式
var u_phone = new RegExp("^1[3|4|5|7|8][0-9]{9}$");

//全局字体rem
var zoom;
function global_font(){
	zoom=$(window).width() / 640 * 100;
	$('html').css({"font-size":zoom });
};
global_font();
$(window).resize(function(){
	global_font();
});

//打开弹窗
function pop_show(element){
	$(element).show();
	var margin_bottom=-$(element).children("dl").outerHeight()/2;
	$(element).children("dl").css({"margin-bottom":margin_bottom});
};

//关闭弹窗
$(".pop dl dd center[title='确定'],.pop dl dt").click(function(){
	if(share_click==true){
		has_closed=true;
	}
	$(this).parents(".pop").hide();
	//$(".appoint input,.phone input").val("");
});


//switch banner
function switchBan(_pos,_id){
	var wrap=document.getElementById(_id), bullets = document.getElementById(_pos),length=wrap.getElementsByTagName('img').length,str='';
	for(var i=0;i<length;i++){
			str+='<li'+ (i==0?' class="cur"':'') +'></li>';
		}
		bullets.innerHTML=str;
		bullets=bullets.getElementsByTagName('li');
	Swipe(document.getElementById(_id), {
		auto: 0,//设置为0，停止自动轮播
		continuous: true,
		disableScroll: false,//是否支持纵向手势，true为停止纵向手势
		callback: function(pos){
			var i = bullets.length;
			while (i--) {
				bullets[i].className = '';
			}
			bullets[pos].className = 'cur';
		}
	});
}
switchBan('feature_trigger','feature_box');


//全局变量
var u_phone = new RegExp("^1[3|4|5|7|8][0-9]{9}$");//手机正则表达式
var submitted=false;//是否提交过手机号
var cellphone_num='';//预约手机号
var share_type='';//分享类型
var has_closed=false;//没提交手机号的前提下，是否关闭提交手机号弹窗
var share_click=false;//是否为分享按钮点击弹出提交手机号弹窗

//用户提交手机号
function submit_tel(cellphone_num){
	$.ajax({
		type: "get",
		url: "http://tevent.cy.com/fy1/api/user/submit.json",
		//url: "http://tevent.cy.com/xj1/api/user/submit.json",
		dataType: "json",
		data:{
			//'system': 1,
			//'tel':cellphone_num
			phone:cellphone_num
			},
		success: function(data){
			if(data.status==0){//提交成功
				$(".pop").hide();
				$(".info").html("预约成功，恭喜你获得一次抽奖机会！");
				pop_show(".pop_tips");
				submitted=true;
			}else{
				$(".pop").hide();
				$(".info").html(data.message);
				pop_show(".pop_tips");
				submitted=false;
			}
		},
		error: function(){}
	});
}

//点击提交手机号
$(".appoint span").click(function(){
	cellphone_num=$.trim($(this).siblings("input").val());
	if (cellphone_num == "") {
		$(".pop_submit .phone input").val(cellphone_num);
		$(".pop_submit .prompt").html("*请填写手机号码！");
		pop_show(".pop_submit");
	} else if (cellphone_num.length != 11||!u_phone.test(cellphone_num)) {
		$(".pop_submit .phone input").val(cellphone_num);
		$(".pop_submit .prompt").html("*请填写正确的手机号码！");
		pop_show(".pop_submit");
	} else {
		submit_tel(cellphone_num);
	}
});

$(".pop_submit center[title='提交']").click(function(){
	cellphone_num=$.trim($(".phone input").val());
	if (cellphone_num == "") {
		$(".pop_submit .phone input").val(cellphone_num);
		$(".pop_submit .prompt").html("*请填写手机号码！");
	} else if (cellphone_num.length != 11||!u_phone.test(cellphone_num)) {
		$(".pop_submit .phone input").val(cellphone_num);
		$(".pop_submit .prompt").html("*请填写正确的手机号码！");
	} else {
		submit_tel(cellphone_num);
	}
});

//查看奖励
function check_prize(cellphone_num){
	$.ajax({
		type: "get",
		url: "http://tevent.cy.com/fy1/api/user/useraward.json",
		dataType: "json",
		data:{
			phone:cellphone_num
			},
		success: function(data){
			if(data.status==0){//提交成功
			
				var prize_list='';
				var prize_length=data.awardList.length;
				if(prize_length==0){
					$(".prize").html("您目前暂未获得奖品，继续努力哦！");
					pop_show(".pop_prize");
				}else{
					for(i=1;i<=prize_length;i++){
						prize_list=prize_list+data.awardList.type+"："+data.awardList.name+"&nbsp;&nbsp;";
					}
					$(".prize").html(prize_list);
					pop_show(".pop_prize")
				}
			}else{
				$(".info").html(data.message);
				pop_show(".pop_tips")
			}
		},
		error: function(){}
	});
}

//点击查看奖励
$(".lottery dd p").click(function(){
	if(submitted==true){
		check_prize(cellphone_num);
	}else{
		pop_show(".pop_submit");
	}
});


//分享
function share(cellphone_num,share_type){
	$.ajax({
		type: "get",
		url: "http://tevent.cy.com/fy1/api/user/share.json",
		dataType: "json",
		data:{
			phone:cellphone_num
			,type:share_type
			},
		success: function(data){
			if(data.status==0){//提交成功
				$(".info").html(data.message);
				pop_show(".pop_tips")
			}else{
				$(".info").html(data.message);
				pop_show(".pop_tips")
			}
		},
		error: function(){}
	});
}

//微博分享
var share1 = new Cyoushare('share_weibo', {
	offset: ['0px', '0px'],
	icon: 'small', // 使用小图标
	gap: '2px', // 图标间隔5px
	notShareTo: '', // 不分享到(如's_copy, s_txwb') 默认为空，表示为分享到所有
	title: '超级礼包抢先约 幸运转盘 百万豪礼中奖率100%',
	url: location.href.split('#')[0],
	content: '首款电影级武侠MMO手游《风云》，由港漫教父马荣成正版授权，是畅游天龙八部3D团队打造最新力作。多种PK方式全景战斗模式，带来电影级武侠体验。',
	showTitle: 'false'
});

//微信分享
var shareToWeiXin = new ShareToWx({
	shareUrl : location.href.split('#')[0],
	shareTitle : '超级礼包抢先约 幸运转盘 百万豪礼中奖率100%',
	shareDesc : '首款电影级武侠MMO手游《风云》，由港漫教父马荣成正版授权，是畅游天龙八部3D团队打造最新力作。多种PK方式全景战斗模式，带来电影级武侠体验。',
	shareImg : window.location.protocol+'//'+window.location.host+'/fy/201508/baidu/mobile/images/logo_fy.png'
});

$(".lottery dd center span").click(function(){
	if(has_closed==false&&submitted==false){
		pop_show(".pop_submit");
		share_click=true;
	}else{
		if($(this).hasClass("sina")){
			share_type=1;
			$(".s_xlwb").click();
		}else if($(this).hasClass("tencent")){
			share_type=2;
			$(".s_txwb").click();
		}else if($(this).hasClass("weixin")){
			share_type=3;
			$(".share_weixin").fadeIn();
		}else if($(this).hasClass("qzone")){
			share_type=4;
			$(".s_qzone").click();
		}
		
		if(submitted==true){
			share(cellphone_num,share_type);
		}		
	}
});

$(".share_weixin").click(function(){
	$(".share_weixin").fadeOut();
});


//抽奖
function lottery(cellphone_num){
	$.ajax({
		type: "get",
		url: "http://tevent.cy.com/fy1/api/user/lottery.json",
		dataType: "json",
		data:{
			phone:cellphone_num
			},
		success: function(data){
			if(data.status==0){//提交成功
				var angle=data.angle;
		
				$(".lottery dt span").rotate({
					duration:4000, //转动时间
					angle: 0,
					animateTo:5400+angle, //转动角度
					easing: $.easing.easeOutSine,
					callback: function(){
						var lottery_prize=data.type+"："+data.name;
						$(".info").html("恭喜您获得："+lottery_prize);
						pop_show(".pop_tips");
					}
				});
			}else{
				$(".lottery dt span").rotate({
					duration:4000, //转动时间
					angle: 0,
					animateTo:5400, //转动角度
					easing: $.easing.easeOutSine,
					callback: function(){
						$(".info").html(data.message);
						pop_show(".pop_tips");
					}
				});
			}
		},
		error: function(){}
	});
}


$(".lottery dt").click(function(){
		//var angle=67;

		$(".lottery dt span").rotate({
			duration:4000, //转动时间
			angle: 67,
			animateTo:5400+67, //转动角度
			easing: $.easing.easeOutSine,
			callback: function(){

			}
		});

});


/*
$(el).rotate({ 　
　　　　angle:0,  //起始角度
　　　　　animateTo:180,  //结束的角度
　　　　　duration:500， //转动时间
　　　　　callback:function(){}, //回调函数
　　　　　easing: $.easing.easeInOutExpo //定义运动的效果，需要引用jquery.easing.min.js的文件
　 })

$(el).rotate(45); //直接这样子调用的话就是变换角度

$(el).getRotateAngle(); //返回对象当前的角度

$(el).stopRotare(); //停止旋转动画

另外可以更方便的通过调用$(el).rotateRight()和$(el).rotateLeft()来分别向右旋转90度和向左旋转90度。*///测试过报错2017.06.06

		

			setTimeout(function () {
               // $(".lottery dt span").stopRotate();
            },14000)