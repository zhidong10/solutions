$(function() {
	//返回顶部
	$(window).scroll(function() {
		$('#backToTop').show();
		if ($(document).scrollTop() != 0)
			$('#backToTop').show();
		else
			$('#backToTop').hide();

		//底部导航 判断到达底部
		if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
			$('#door').css('bottom', '110px');
		} else {
			$('#door').css('bottom', '0px');
		}
	});
	$('#backToTop a').click(function() {
		$('html, body').animate({
			scrollTop : 0
		}, 800);
		return false;
	});
});
