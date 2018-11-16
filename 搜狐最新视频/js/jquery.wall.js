/**
 * jquery.wall.js 
 * Author: ZouJL
 */

;( function( $, window, undefined ) {
	
	'use strict';

	$.Wall = function( options, element ) {
		
		this.$el = $( element );
		this._init( options );
		
	};

	// the options
	$.Wall.defaults = {
		// The number of items
		wallNum: 10,
		// The delay each item animate
		delay: 300,
		// boundaries for the items
		boundaries: {
			// The offset of show items
			visibleX: { min: 0 , max: 600 },
			visibleY: { min: 0 , max: 258 },
			// The offset of hidden items
			hiddenX: { min: -200 , max: 900 },
			hiddenY: { min: -400 , max: -200 },
			hiddenZ: { min: 400 , max: 600 }
		},
		markup: {
			close: '<i class="close">&#10005</i>'
		},
		eases: ['easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']
		//eases: null
	};

	$.Wall.prototype = {

		_init: function( options ) {
			
			// options
			this.options = $.extend( true, {}, $.Wall.defaults, options );

			this.$items = this.$el.children( 'li' );
			this.itemsCount = this.$items.length;
			this.slideNum = this.options.wallNum;
			// how many slides of the items
			this.maxSlideNum = Math.ceil( this.itemsCount / this.slideNum );
			this.eases = this.options.eases || {};
			this.zIndex = 1;
			this.showNum = 0;

			// show first item
			this.current = 0;			
			//this.$activeItems = this._getItems( this.current );

			//this.$items.eq( this.current ).show();
			
			this._initEvents();			

		}, 
		_initEvents: function(){

			var self = this;
			
			this.$items.hide(0).css('zIndex', '0')
				.append( this.options.markup.close )
				.each( function(){

					$(this).bind({

						'click, mouseover': function(){
						
							$(this).css({zIndex: self.zIndex, cursor: 'move'});

							self.zIndex += 1;

						}/*,
						'mouseout': function(){

							$(this).css({cursor: 'default'});

						}*/
					});

					self.bindDrag( this );

				} )
				.find('i').bind('click', function(){

					self.hidewall( $(this).parent() );
					self.showNum -= 1;

					if( self.showNum < 1 ){
						self.next();
					}

				});

			this.navigate( this.current );

		},
		_getItems: function( idx ){

			var $items = this.$items
				, num = this.slideNum;

			return $items.filter( function(index){
				var i = $(this).index();
				return i >= idx*num && i < (idx+1)*num;
			} );

		},
		_getRandomXYZZ: function() {

			var o = {
				vx: Math.floor( Math.random() * ( this.options.boundaries.visibleX.max - this.options.boundaries.visibleX.min + 1 ) + this.options.boundaries.visibleX.min ),
				vy: Math.floor( Math.random() * ( this.options.boundaries.visibleY.max - this.options.boundaries.visibleY.min + 1 ) + this.options.boundaries.visibleY.min ),
				hx: Math.floor( Math.random() * ( this.options.boundaries.hiddenX.max - this.options.boundaries.hiddenX.min + 1 ) + this.options.boundaries.hiddenX.min ),
				hy: Math.floor( Math.random() * ( this.options.boundaries.hiddenY.max - this.options.boundaries.hiddenY.min + 1 ) + this.options.boundaries.hiddenY.min ),
				hz: Math.floor( Math.random() * ( this.options.boundaries.hiddenZ.max - this.options.boundaries.hiddenZ.min + 1 ) + this.options.boundaries.hiddenZ.min )				
			};

			if( this.eases.length ){

				o.ea = this.eases[ Math.floor( Math.random() * this.eases.length ) ];

			}

			return o;

		},
		// public method: shows item with index idx
		navigate: function( idx ) {

			var self = this,
				// current items
				$current = this._getItems( idx ),
				len = $current.length,				
				i = 0;

			var timer = setInterval( function(){

				self.wallIt( $current.eq(i), function(){ 
					
					i++; 
					if( i>=len ) clearInterval( timer );

				} )

			}, self.options.delay);

			this.$activeItems = $current;
			this.current = idx;
			this.showNum = len;	

		},
		wallIt: function( $el, callback ){

			var randomXYZ = this._getRandomXYZZ(),
				ease = randomXYZ.ea || 'swing',
				styleStart = {
					opacity: 0
				},
				styleEnd = {
					opacity: 1
				};			

			styleStart.left = randomXYZ.hx;
			styleStart.top = randomXYZ.hy;
			styleEnd.left = randomXYZ.vx;
			styleEnd.top = randomXYZ.vy;

			$el.css( styleStart ).show();

			setTimeout( function() {

				$el.animate( styleEnd, ease );

			}, 20 );

			if( callback && typeof callback == 'function' ){
				callback();
			}

		},
		hidewall: function( $el ){

			var self = this;
			
			$el.each(function(){

				var randomXYZ = self._getRandomXYZZ(),
					ease = randomXYZ.ea || 'swing',
					styleStart = {
						opacity: 0,
						show: 'hide'
					};			

				styleStart.left = randomXYZ.hx;
				styleStart.top = randomXYZ.hz;

				$(this).animate( styleStart );

			});

		},
		// public method: returns total number of items
		getItemsCount: function() {

			return this.itemsCount;

		},
		// public method: shows next item
		next: function() {

			//if( this.current < this.maxSlideNum - 1 ) {
				
				if( this.$activeItems.length ){
					this.hidewall( this.$activeItems );
				}

				//var idx = this.current + 1;
				var idx="";
				if( this.current==this.maxSlideNum - 1 ) {
					idx = 0;
				}else{
					idx = this.current + 1;
				}
				
				this.navigate( idx );

			//}

		},
		// public method: shows previous item
		prev: function() {

			if( this.current > 0 ) {
				
				if( this.$activeItems.length ){
					this.hidewall( this.$activeItems );
				}

				var idx = this.current - 1;
				this.navigate( idx );

			}

		},
		bindDrag: function( el ){

			var els = el.style,
				// offsetX/Y of the mouse
				x = 0,
				y = 0;

			// mouse down
			$(el).mousedown(function(e){

				// get the X/Y of mouse when mouse down
				x = e.clientX - el.offsetLeft;
				y = e.clientY - el.offsetTop;
				// IE, get focus
				el.setCapture && el.setCapture();
				// bind
				$(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);

			});
			// mouse move
			function mouseMove(e){

				els.top  = e.clientY - y + 'px';
				els.left = e.clientX - x + 'px';
				
			}
			// mouse up ( stop )
			function mouseUp(){
				// release focus in IE
				el.releaseCapture && el.releaseCapture();
				// unbind
				$(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
			}
		}

	};
	
	var logError = function( message ) {

		if ( window.console ) {

			window.console.error( message );
		
		}

	};
	
	$.fn.wall = function( options ) {

		var instance = $.data( this, 'wall' );
		
		if ( typeof options === 'string' ) {
			
			var args = Array.prototype.slice.call( arguments, 1 );
			
			this.each(function() {
			
				if ( !instance ) {

					logError( "cannot call methods on wall prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {

					logError( "no such method '" + options + "' for wall instance" );
					return;
				
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
				
				if ( instance ) {

					instance._init();
				
				}
				else {

					instance = $.data( this, 'wall', new $.Wall( options, this ) );
				
				}

			});
		
		}
		
		return instance;
		
	};
	
} )( jQuery, window );