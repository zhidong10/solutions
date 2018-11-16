;(function($){
	$.fn.jtips = function(tips, options){
		var o = $.extend({pos: 'bottom'}, options)
		var tips = $(tips), selector = this.selector;		
		return this.each(function(){

			tips.css({position: 'absolute', display: 'none', zIndex: 99});
			
			var i = $(selector).index(this), pos = o.pos;
			if(pos == 'top'){
				
				$(this).mousemove(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()- 20, left: e.pageX - $(tips).outerWidth()*0.5, display: 'block'});
				}).hover(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()- 20, left: e.pageX - $(tips).outerWidth()*0.5, display: 'block'});
				}, function(){
					$(tips).css({top: 0, left: 0, display: 'none'});		
				});
			}else if(pos == 'right'){
				
				$(this).mousemove(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX + 20, display: 'block'});
				}).hover(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX + 20, display: 'block'});
				}, function(){
					$(tips).css({top: 0, left: 0, display: 'none'});		
				});	
			}else if(pos == 'left'){
			
				$(this).mousemove(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX-400 , display: 'block'});
				}).hover(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX-400, display: 'block'});
				}, function(){
					$(tips).css({top: 0, display: 'none'});		
				});		
								
			}else if(pos == 'bottom'){
				
				$(this).mousemove(function(e){
					$(tips).css({top: e.pageY + 20, left: e.pageX - $(tips).outerWidth()*0.5, display: 'block'});
				}).hover(function(e){
					$(tips).css({top: e.pageY + 20, left: e.pageX - $(tips).outerWidth()*0.5, display: 'block'});
				}, function(){
					$(tips).css({top: 0, left: 0, display: 'none'});		
				});				
			}else{
				$(this).mousemove(function(e){
					
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX - $(tips).outerWidth() - 20, display: 'block'});
				}).hover(function(e){
					$(tips).css({top: e.pageY -$(tips).outerHeight()*0.5, left: e.pageX - $(tips).outerWidth() - 20, display: 'block'});
				}, function(){
					$(tips).css({top: 0, left: 0, display: 'none'});		
				});		
			}
			//$(tips).css({top: e.pageY + (o.top == 'bottom' ? 20 : -$(tips).outerHeight()*0.5), left: e.pageX - (o.left == 'center' ? $(tips).outerWidth()*0.5 : $(tips).outerWidth()+20), display: 'block'});
		});	
	};
})(jQuery);