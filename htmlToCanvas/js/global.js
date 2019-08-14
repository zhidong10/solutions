var url = window.location.href;
$('.link').each(function(){
	if(url.indexOf($(this).attr('href')) > -1){
		$(this).addClass('link-act');
	}
})
function getQueryString(name) {
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");
	if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " ")); 
	return ""; 
}
$('.bkTop').click(function(){
    window.scrollTo(0, 1);
});
var mySwiper = new Swiper('.swiper-container',{
	effect : 'fade',
	fade: {
	  crossFade: false,
	},
	onInit: function(swiper){
		$('.swiper-slide').eq(0).find('em').addClass('show');
		$('.pagination a').eq(0).addClass('active');
    },
	onSlideChangeEnd: function(swiper){
		$('.swiper-slide em').removeClass('show');
		$('.swiper-slide').eq(swiper.activeIndex).find('em').addClass('show');
		$('.pagination a').removeClass('active').eq(swiper.activeIndex).addClass('active');
    }
})
$('.pagination a').on('click', function(){
	if(!$(this).hasClass('active')){
		var idx = $('.pagination a').index($(this));
		$('.pagination a').removeClass('active').eq(idx).addClass('active');
		mySwiper.slideTo(idx);
	}
})

//tabs
$('.tabs a').each(function(){
	var _this = $(this);
	_this.on('click', function(){
		if(!$(this).hasClass('active')){
			var idx = $('.tabs a').index($(this));
			$('.tabs a').removeClass('active').eq(idx).addClass('active');
			$('.bag .tab-cont').hide().eq(idx).show(0);
		}
	})
})

$('.get-bag').on('click', function(){
	$('.mask,.bag').show(500);
})
$('.get-box').on('click', function(){
	$('.mask,.box').show(500);
})

$('.close').on('click', function(){
	$('.mask,.bag,.box').hide();
})

$(function(){
	//是否从导航跳转过来
	var links = getQueryString('links') || 0;
	if(links){
		window.scrollTo(0, 950);
	}
})