//share
var share = new Cyoushare('share', {
	offset : ['0px', '0px'],
	icon : 'small', // 使用小图标
	gap : '5px', // 图标间隔5px
	notShareTo : 's_qzone,s_renren,s_kaixin', // 不分享到(如's_copy, s_txwb') 默认为空，表示为分享到所有
	title : '',
	url : '', // 分享的地址
	content : '十一年对于一个人来说，是一去不复返的青春。十一年对于一款游戏来说，是一个重要的里程碑。为了忘却的纪念，为了不朽的情怀，这个十一年《刀剑英雄》有你们陪伴。',
	showTitle : 'true'
});

//视频
$(".btn_video a").click(function(){
	var video_id=$(this).attr("data-id");
	var video_title=$(this).attr("data-title");
	$(".pop dt span").html(video_title);
	$(".pop dd span").commVideoPlayer({
		v_id  : video_id
	})	
	popup($(".pop"));
});
$(".pop .close").click(function(){
	$(".pop dd").html("<span></span>");
});

//留言板
var wall=$('.walljs ul').wall({
	wallNum: 8,
	boundaries: {
		// The offset of show items
		visibleX: { min: 0 , max: 470 },
		visibleY: { min: 0 , max: 130 },
		// The offset of hidden items
		hiddenX: { min: -200 , max: 670 },
		hiddenY: { min: -400 , max: -200 },
		hiddenZ: { min: 300 , max: 500 }
	},
	markup: {
		close: ''
	}
 });

$('.walljs-prev').click(function(){
	wall.prev();
});

$('.walljs-next').click(function(){
	wall.next();
});

$(".walljs ul li:nth-child(3n+1)").addClass("color_01");
$(".walljs ul li:nth-child(3n+2)").addClass("color_02");

$(".walljs ul li p").each(function(){
	var txt=$(this).text().slice(0,100)+"……";
	$(this).text(txt)
});

//照片墙
$('.slide').switchable({
    //triggers: '&bull;',  //&amp;bull应用时，触点样式变为圆点;
	putTriggers: 'insertBefore',//默认 insertAfter
    effect: 'scrollLeft',//scrollDown时需要调整groupSize: [400, 130]参数；
	panels: 'li',
    autoplay: true,
    easing: 'ease-in-out',
	steps: 1,
    visible: 1,
	interval: 4,
	//groupSize: [400, 130],
    end2end: true, 
    loop: true
});

$('.slide a').lightBox();
