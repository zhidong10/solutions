$(document).ready(function(){
	$("img").lazyload();
	$(".address .fr span").click(function(){
		if($(this).index()>0){
			$(this).addClass("current").siblings().removeClass();
			$(this).addClass("current").siblings().removeClass();
			$(".addr img").eq($(this).index()-1).show().siblings("img").hide();
			showDialog.show(big_pic);
			$(".addr img").eq($(this).index()-1).lazyload({skip_invisible : false});
		};
	});
	
	$(".scenery area").click(function(){
		var numShow=$(this).index();
		$(".scen img").eq(numShow).show().siblings("img").hide();
		showDialog.show(big_pic);
		$(".scen img").eq(numShow).lazyload({skip_invisible : false});
		
	});
	
	$(".result_before input,.rule .fr").click(function(){
		showDialog.show(tips);
	});
	
	$(".result_after input").click(function(){
		showDialog.show(result);
	});
	
	$(".point input").click(function(){
		showDialog.show(nojoin);
	});
	
	$(".dialog ins").click(function(){
		showDialog.hide();
		$(".dialog center img").hide();
	});
	
});

var share_config = { 
	url:top.location.href||document.location.href,
	title:'您排名已超越了'+$(".inquire_after ul li:eq(1) strong").text()+'的玩家，您的角色名将永远的铭刻在冰岛纪念碑上。', 
	pic:'https://img1.tiancitycdn.com/eve/event/monument/images/share_pic.jpg'
}
$('.tsina').attr('href',"http://v.t.sina.com.cn/share/share.php?title="+encodeURIComponent(share_config.title)+"&url="+encodeURIComponent(share_config.url)+"&pic="+encodeURIComponent(share_config.pic));
$('.tqq').attr('href',"http://v.t.qq.com/share/share.php?title="+encodeURIComponent(share_config.title)+"&url="+encodeURIComponent(share_config.url)+"&pic="+encodeURIComponent(share_config.pic));
