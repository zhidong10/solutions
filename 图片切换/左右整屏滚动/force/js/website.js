
// 分享
var share2 = new Cyoushare('share', {
	offset: ['0', '0']
	,icon: 'small' // 使用小图标
	,gap: '5px' // 图标间隔5px
	,title: '《星际战甲》剧情揭晓！国服首测资格预约中，期待你的到来！' //分享的标题
	,url: '' // 分享的地址
	,content: '《星际战甲》剧情揭晓！国服首测资格预约中，期待你的到来！' //分享的内容
	,pic:'http://i0.cy.com/wf/main/20150324/share_img.jpg'
	,showTitle: 'true'
});
		
		
var num;
var address=window.location.search;
if(address=="?id=1"){
	num=1;
}else if(address=="?id=2"){
	num=2;
}else {
	num=0;
};

$('.slide').switchable({
	effect: 'fade',
	panels: 'li',
	autoplay: false,
	loop: true,
	initIndex: num,
	triggerType: "click",
	easing: 'ease-in-out',
	prev: '.button .prev',
    next: '.button .next'
});

$(".banner>.triggers li:eq(0)").html("天诺").attr({"title":"天诺"});
$(".banner>.triggers li:eq(1)").html("克隆尼").attr({"title":"克隆尼"});
$(".banner>.triggers li:eq(2)").html("科普斯商会").attr({"title":"科普斯商会"});


$('.info01 .txt').switchable({
	effect: 'fade',
	panels: 'p',
	autoplay: false,
	loop: false,
	triggersWrapCls: "trig",
	triggerType: "click",
	easing: 'ease-in-out',
	duration: 0.001,
	prev: '.info01 .prev',
    next: '.info01 .next'
});

$('.info02 .txt').switchable({
	effect: 'fade',
	panels: 'p',
	autoplay: false,
	loop: false,
	triggersWrapCls: "trig",
	triggerType: "click",
	easing: 'ease-in-out',
	duration: 0.001,
	prev: '.info02 .prev',
    next: '.info02 .next'
});

$('.info03 .txt').switchable({
	effect: 'fade',
	panels: 'p',
	autoplay: false,
	loop: false,
	triggersWrapCls: "trig",
	triggerType: "click",
	easing: 'ease-in-out',
	duration: 0.001,
	prev: '.info03 .prev',
    next: '.info03 .next'
});

(function(){
	var enter_action , leave_action;
	$(".content,.button a").hover(function(){
		clearTimeout(leave_action);
		enter_action = setTimeout(function(){
			$(".button .prev").animate({"opacity":"show","left":"150px"},400);
			$(".button .next").animate({"opacity":"show","right":"150px"},400);
		},401);
	},function(){
		clearTimeout(enter_action);
		leave_action=setTimeout(function(){
			$(".button .prev").animate({"opacity":"hide","left":"0px"},200);
			$(".button .next").animate({"opacity":"hide","right":"0px"},200);
		},201);
	});
})();


