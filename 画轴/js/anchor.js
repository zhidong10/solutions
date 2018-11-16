;(function($){
    function F(target, option){
        this.opts = $.extend({
            width: 988
            , height: 620
            , path: [
                'M0,0L320,0L320,110L280,184L200,254L0,254L0,0Z'
                , 'M590,0L988,0L988,245L730,245L642,120L590,0Z'
                , 'M309,114L526,98L640,115L722,227L690,360L546,396L339,369L236,277L270,207L309,114Z'
                , 'M0,329L305,329L442,424L442,620L0,620L0,329Z'
                , 'M615,620L615,400L814,311L988,311L988,620L615,620Z'
            ]
            , tipsElem: '#map'
            , debugs: true // 是否支持debug
        }, option);  
        // length of svg elements 
        this.len = this.opts.path.length;
        // svg elements
        this.units = [];
		this.tipsElem = $(this.opts.tipsElem).find('img');
        // this.RA = Raphael('paper', 500, 400);
        // target
        this.target = target; 
        this.debugs = this.opts.debugs;
        // this.isIE6 = $.browser.msie && parseFloat($.browser.version) < 7;
        this.init();
    }

    F.prototype = {
        init: function(){
            this.anchor();
        }
        , anchor: function(){
            var self = this
                , opts = this.opts
                , len = this.len
                , paths = opts.path
                , RA = Raphael( this.target, opts.width, opts.height)
                , units = RA.set() // 存放svg元素的数组
                , stl = {
                    'fill'        : '#fff',
                    'stroke'      : '#000',
                    'stroke-width': 0,
                    'fill-opacity': 0,
                    'stroke-opacity': 0,
					'opacity': 0,
                    'cursor'      : 'pointer'
                }
                ;

            this.RA = RA;

            // 锚点
            for(var i=0; i<len; i++){

                var ra = RA.path( paths[i] ).attr( stl ).data('idx', i);

                ra.hover( function(){
					
                    self.mouseover( this );

                }, function(){

                   self.mouseout( this );              

                }).click(function(){
                   self.popOut( this );
                });

                units.push( ra ); 
            }

            this.units = units; 
        }
        , mouseover: function( el ){

            var self = this
                , idx = el.data('idx')
                , tipsEl = self.tipsElem.eq(idx)
                ;
   			
			self.debug( idx );
			
            setTimeout( function(){

                tipsEl.animate({
                    opacity: 1
                }, 450);

            }, 100);
			

        }
        , mouseout: function( el ){

            var self = this
                , idx = el.data('idx')
                , tipsEl = self.tipsElem.eq(idx)
                ;
				
            setTimeout( function(){

                tipsEl.animate({
                    opacity: 0
                }, 450);

            }, 100);

        }
		, popOut: function( el ){
			
			var idx = el.data('idx');
			$('.pop').eq(idx).show(0);
			//popup( $('#gift' + (idx+1)) );	
		}
        // debug
        , debug: function(){
            this.debugs && window.console && console.log && console.log( '[anchor] ' + Array.prototype.join.call(arguments, ' ') );
        }
    }

    $.fn.anchor = function(o) {

        // var instance = $.data( this, 'anchor' );
        var instance = $(this).data( 'anchor' );

        this.each(function() {              
            if ( instance ) {
                // instance.init();         
            }
            else {
                instance = $.data( this, 'anchor', new F(this, o) );          
            }
        });
        return instance;
    }

})(jQuery);