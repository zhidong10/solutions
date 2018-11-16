/*	
** Email Auto Complete
** Author: ZouJL
** Date: 2012.11.05
** How to Use
** 
var conf = {
  	borderColor: '#C4CAD1' // 边框颜色
  	, backgroundColor: '#fff' // 背景色
	, fontColor: '#333' // 字体颜色
	, highlight: '#a53b50' // 选中背景色
	, lineHeight: '22px'
	, width: '330px'
	, zIndex: 9999
	, popUp: false
	, adjustLeft: 5 // left矫正值，当popUp为弹框时（true），其值为left值
	, adjustTop: 5 // top矫正值，当popUp为弹框时（true），其值为top值 
	, checkPhone: false
	, txtLetter: false
	, emails: ['changyou.com', 'game.sohu.com', 'qq.com', '163.com', 'sohu.com', 
		'17173.com', '126.com', 'sina.com', 'vip.qq.com', 'hotmail.com', 'foxmail.com', 
		'sogou.com', 'yahoo.com.cn', 'yahoo.cn', 'yahoo.com', '263.net', 'gmail.com' , 
		'msn.com', 'tom.com', 'changren.com', 'chinaren.com']
}
*/

var EmailAutoComplete = window.EmailAutoComplete || function(target, conf){

	var target = $('#'+target)
		, conf = conf || {};

	this.target = target; // 输入框
	this.parent = target.parent(); // 自动提示的父级元素 （默认为输入框的父级元素）
	this.style = {
		borderColor: conf.borderColor || '#C4CAD1'
		, backgroundColor: conf.backgroundColor || '#fff'
		, fontColor: conf.fontColor || '#333'
		, fontFamily: 'tahoma, arial'
		, highlight: conf.highlight || '#a53b50'
		, lineHeight: conf.lineHeight || '22px'
		, width: conf.width || $(target).outerWidth() - parseFloat( $(target).css('borderLeftWidth') ) - parseFloat( $(target).css('borderRightWidth') ) + 'px'
		/*, left: $(target).offset().left 
		, top: $(target).offset().top + $(target).outerHeight() + parseFloat( $(target).css('borderTopWidth') )*/
		, zIndex: conf.zIndex || 9999
	};

	this.popUp = conf.popUp || false;

	this.checkPhone = true;//conf.checkPhone || false; conf配置文件中checkPhone作废，默认启用手机号码匹配
	this.txtLetter = conf.txtLetter || false;

	this.offsetAdjust = {
		left: conf.adjustLeft || 0
		, top: conf.adjustTop || 0
	};

	this.emails = conf.emails || ["changyou.com","game.sohu.com","qq.com","163.com","sohu.com","17173.com","126.com","sina.com","vip.qq.com","hotmail.com","foxmail.com","sogou.com","yahoo.com.cn","yahoo.cn","yahoo.com","263.net","gmail.com" ,"msn.com","tom.com","changren.com","chinaren.com"];

	this.init();
};

EmailAutoComplete.prototype = {
	
	init: function(){

		var self = this;
		
		var isPopUp = self.popUp,
			$parent = self.parent,
			pos_val = $(self.parent).css('position');

		if( isPopUp ){

			if( pos_val != 'absolute' && pos_val != 'relative' ){
				$parent.css('position', 'relative');			
			}

			self.style.left = self.offsetAdjust.left;
			self.style.top = self.offsetAdjust.top;

		}else{

			var pos = self.getPos();
			self.style.left = pos.left;
			self.style.top = pos.top;

			$parent = $('body');			

		}		

		if( $.browser.msie && $.browser.version<7 ){
			hackIe = ';_width:' + self.style.width;
		}else{
			hackIe = 'width:100%';
		}

		var style = {

				box: 'display:none;position:absolute'
					+ ';left:' + (self.style.left + self.offsetAdjust.left) + 'px'
					+ ';top:' + (self.style.top + self.offsetAdjust.top)  + 'px'
					+ ';min-width:' + self.style.width 
					+ hackIe 
					+ ';border:1px solid ' + self.style.borderColor 
					+ ';z-index:' + self.style.zIndex 
					+ ';background-color:' + self.style.backgroundColor
					+ ';'

				, a: 'display:block;text-decoration:none;cursor:pointer;white-space:nowrap;'
					+ ';color:' + self.style.fontColor
					+ ';width:100%' 
					+ ';height:' + self.style.lineHeight 
					+ ';line-height:' + self.style.lineHeight 
					+ ';font-family:' + self.style.fontFamily
					+ ';'
			}
			, $markup = $('<div style="' + style.box + '" class="emailAutoComplete" />')	
			, markup = '<a style="' + style.a + '"><div class="prefix" style="display:inline; padding-left:10px; width:auto;"></div></a>'			
			, emails = self.emails
			, i = 0;
		
		
		while( emails[i] ){
			markup += 
				'<a style="padding-left:10px;' + style.a + '"> \
					<div class="prefix" style="display:inline; padding-left:0px; width:auto;"></div> \
					<div class="suffix" style="display:inline; padding-right:10px; width:auto;">@' + emails[i] + '</div></a>';
			i++;
		}
		markup += '<a style="' + style.a + '"><div class="prefix" style="display:inline; padding-left:10px; width:auto;"></div></a>';

		$parent.append( $markup.append(markup) );
		
		self.keyup(self.target, $markup);

		self.bindResize( $markup );
	}

	, keyup: function(target, box){

		var self = this;

		var $target = $(target)
			, $box = $(box)
			, move = self.move
			, moved = false
			, $as = $('a', $box)
			, $prefix = $('.prefix', $as)
			, mouseover = false; // 判定鼠标移开时，是否放置在下拉列表上
		
		$target.keyup(function(e){

			if (e == null) { // ie
				keycode = event.keyCode;
			} else { // mozilla
				keycode = e.which;
			}

			if(keycode == 40){ 
				// 向下				
				moved = move($box, self, 'down');

			}else if(keycode == 38){ 				
				// 向上
				moved = move($box, self, 'up');

			}else if( keycode == 13 ){ 
				// 回车确认
				$box.find('.selected').click();

			}else{	

				self.complete(this, $box, $prefix, $as);
								
			}

		}).focusin(function(){

			self.complete(this, $box, $prefix, $as);

		}).focusout(function(){

			if( !mouseover ){
				var $selected = $as.filter('.selected');
				
				if( $selected.length ){
					self.setInputValue( $selected );
				}
				
				$box.hide();
			}				

		});

		$as.click(function(){
			self.setInputValue(this);
			$box.hide();
			return false;
		}).hover(function(){

			$(this).css('color', self.style.highlight);
			mouseover = true;

		}, function(){
			
			if( !$(this).hasClass('selected') ){
				$(this).css('color', self.style.fontColor);
			}	
			mouseover = false;
		});		
	}

	, complete: function($this, $box, $prefix, $as){

		var value = $.trim($this.value)
			, value = value.split('@')
			, prefix = value[0]
			, suffix = value[1];

		$as.removeClass('selected').css('color', this.style.fontColor);

		if( !prefix ) { // 输入框内容 @ 前没有内容

			$box.hide();
			return ; 

		}else if( suffix ) { // 输入框内容 @ 前有内容，而且 @ 后也有内容

			$prefix.text(prefix);

			var filters = $as.filter(':contains("@' + suffix + '")');

			if( filters.length ){

				$as.hide();

				filters.show().css('display', 'block')
					.eq(0).addClass('selected').css('color', this.style.highlight);

				$box.show();

			}else{
				$box.hide();
			}
			
		}else{ // 输入框内容不包含 @ 字符
			
			$prefix.text(prefix);
			
			$box.show();

			if( this.checkPhone ){
				// 如果均为数字，且为11位时
				// if( /\d{11}/.test( prefix ) && prefix.length == 11 ){
				// 如果均为数字，且位数不大于11
				if( /^\d+$/.test( prefix ) && prefix.length <= 11 ){
					$as.show().css('display', 'block')
						.eq(0).addClass('selected').css('color', this.style.highlight);
					$as.eq($as.length-1).hide(0).removeClass('selected').css('color', this.style.highlight);
						//.eq($as.length-1).hide(0).removeClass('selected').css('color', this.style.highlight);
				}else{

					$as.show().css('display', 'block')
						.eq(0).hide(0).removeClass('selected')
						.end()
						.eq($as.length-1).addClass('selected').css('color', this.style.highlight);

				}					

			}else if( this.txtLetter ){ 
				$as.show().css('display', 'block')
				   .eq(0).hide(0).removeClass('selected').css('color', this.style.highlight);
			   $as.eq($as.length-1).addClass('selected').css('color', this.style.highlight);
			}else{

				$as.show().css('display', 'block')
					.eq(0).hide(0).removeClass('selected').css('color', this.style.highlight);
			   $as.eq($as.length-1).addClass('selected').css('color', this.style.highlight);
			}
			
		}

	}

	, move: function($box, self, dir){	

		var $as = $box.find('a:visible');
		//console.log($as.length)

		if( !$as.length ) return ;

		var $selected = $as.filter('.selected')
			, idx = $as.index($selected);
		
		if( idx === -1 ) return ;

		var $thisA = $as.eq(idx);

		if(dir == 'down')	{

			if( $thisA.nextAll(':visible').length ){

				var $next = $thisA.nextAll(':visible').eq(0);

			}else{

				var $next = $as.eq(0);

			}

		}else if(dir == 'up'){

			if( $thisA.prevAll(':visible').length){

				var $next = $thisA.prevAll(':visible').eq(0);

			}else{

				var $next = $as.eq($as.length-1);

			} 
		}

		$as.removeClass('selected').css('color', self.style.fontColor);	
		$next.addClass('selected').css('color', self.style.highlight);

		//self.setInputValue($next);

		return true;
	}
	, setInputValue: function(elem){

		$(this.target).val( $('.prefix', elem).text() + $('.suffix', elem).text() );

	}
	, getPos: function(){

		var self = this,
			target = $(this.target);

		if( self.popUp ){

			return {
				left: self.adjustLeft,				
				top: self.adjustTop 
			}

		}else{

			return {
				left: target.offset().left 
				, top: target.offset().top + target.outerHeight() + parseFloat( target.css('borderTopWidth') )
			}

		}

	}
	, bindResize: function( $box ){

		var self = this;

		if( !self.popUp ){

			$(window).bind('resize', function(){

				var pos = self.getPos();

				$box.css({
					left: pos.left,
					top: pos.top
				});
			});
		}

	}

};