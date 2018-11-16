/** jquery.switchable.js **/

;(function($) {
	$.switchable = $.switchable || {};

	$.switchable = {
		cfg: {
			// 触点
			triggers: "span",
			// 当前触点的clwangssName
			currentCls: "current",
			// 默认激活项
			initIndex: 0,
			// 触发类型
			triggerType: "mouse", // or click
			// 触发延迟
			delay: .1, // 100ms

			// 切换效果
			effect: "default",
			// 每次切换的 Panel 数量
			steps: 1,
			// 可见区域的 Panel 数量
			visible: 1,
			// 动画步时
			speed: .7, // 700ms
			easing: "swing",
			
			// 循环
			circular: false,
			// 纵向切换
			vertical: false,
			// 点击视图区切换
			panelSwitch: false,
			
			beforeSwitch: null,
			onSwitch: null,
			api: false
		},
		//自定义效果
		addEffect: function(name, fn) {
			effects[name] = fn;
		}
	};
	//内置效果
	var effects = {
		"default": function(i, done) {
			this.getPanels().hide();
			this.getVisiblePanel(i).show();
			done.call();
		}, 
		"ajax": function(i, done)  {			
			this.getPanels().first().load(this.getTriggers().eq(i).attr("href"), done);	
		}
	};   	

	function switchTo(triggers, panels, cfg) { 
		
		var self = this,
			$self = $(this),
			current,
			index = triggers.length -1;

		// 绑定所有回调函数
		$.each(cfg, function(name, fn) {
			if ( $.isFunction(fn) ) {
				$self.bind(name, fn);
			}
		});
		
		// 公共方法
		$.extend(this, {
			click: function(i, e) {

				var trigger = triggers.eq(i);
				
				if ( typeof i == 'string' && i.replace("#", "") ) {
					trigger = triggers.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(trigger.index(), 0);
				}
				/*
				if ( !trigger.length ) { 
					if ( current >= 0 ) {
						return self;
					}
					i = cfg.initIndex;
					trigger = triggers.eq(i);
				}
				*/
				e = e || $.Event();
				e.type = "beforeSwitch";
				$self.trigger(e, [i]);
				if ( e.isDefaultPrevented() ) {
					return;
				}
				
				// Call the effect
				effects[cfg.effect].call(self, i, function() {
					// onSwitch callback
					e.type = "onSwitch";
					$self.trigger(e, [i]);					
				});			
				
				// onStart
				e.type = "onStart";
				$self.trigger(e, [i]);				
				if ( e.isDefaultPrevented() ) {
					return;
				}
				
				current = i;
				triggers.removeClass(cfg.currentCls);	
				trigger.addClass(cfg.currentCls);
				
				return self;
			},
			
			getCfg: function() {
				return cfg;	
			},

			getTriggers: function() {
				return triggers;	
			},
			
			getPanels: function() {
				return panels;	
			},
			
			getVisiblePanel: function(i) {
				return self.getPanels().slice(i * cfg.steps, (i + 1) * cfg.steps);	
			},
			
			getIndex: function() {
				return current;	
			}, 
			
			move: function(i) {
				if ( panels.parent().is(":animated") || panels.length <= cfg.visible ) {
					return self;
				}
				
				if ( typeof i == 'number' ) {
					if ( i < 0 ) {
						return cfg.circular ? self.click(index) : self;
					}
					else if ( i > index ) {
						return cfg.circular ? self.click(0) : self;
					}
					else {
						return self.click(i);
					}
				} else {
					return self.click();
				}
			}, 
			
			next: function() {
				return self.move(current + 1);
			},
			
			prev: function() {
				return self.move(current - 1);	
			},
			
			bind: function(name, fn) {
				$self.bind(name, fn);
				return self;	
			},	
			
			unbind: function(name) {
				$self.unbind(name);
				return self;
			},
			
			beforeSwitch: function(fn) {
				return this.bind("beforeSwitch", fn);
			},
			
			onSwitch: function(fn) {
				return this.bind("onSwitch", fn);
			},
			
			resetPosition: function(isBackward) {}
		
		});
		
		//为每个触点绑定事件
		var switchTimer;
		triggers.each(function(i) {
			if ( cfg.triggerType === "mouse" ) {//响应鼠标悬浮
				$(this).bind({
					"mouseenter": function(e) {
						//不重复触发
						if ( i !== current ) {
							//延时处理，鼠标快速滑过不触发
							switchTimer = setTimeout(function() {
								self.click(i, e);
							}, cfg.delay * 1000);
						}
					},
					"mouseleave": function() {
						//鼠标快速滑出，取消悬浮事件
						clearTimeout(switchTimer);
					}
				});
			} else {//响应点击
				$(this).bind("click", function(e) {
					//不重复触发
					if ( i !== current ) {
						self.click(i, e);
					}
					return false;
				});
			}
		});

		if ( location.hash ) {
			self.click(location.hash);
		} else {
			if ( cfg.initIndex === 0 || cfg.initIndex > 0 ) {
				self.click(cfg.initIndex);
			}
		}		
		
		// 视图区通过锚链切换
		panels.find("span[href^=#]").click(function(e) {
			self.click($(this).attr("href"), e);		
		}); 

		// 点击视图区切换
		if ( cfg.panelSwitch ) {
			panels.css("cursor", "pointer").click(function() {
				self.next();
				return false;
			}); 
		}
	}
	
	$.fn.switchable = function(container, cfg) {

		var el = this.eq(typeof cfg == 'number' ? cfg : 0).data("switchable");
		if ( el ) {
			return el;
		}

		if ( $.isFunction(cfg) ) {
			cfg = { beforeSwitch: cfg };
		}
		
		var globals = $.extend({}, $.switchable.cfg), len = this.length;
		cfg = $.extend(globals, cfg);

		this.each(function(i) {
			var root = $(this);
			
			// 获取 panels
			var panels = container.jquery ? container : root.children(container);
			if ( !panels.length ) {
				panels = len == 1 ? $(container) : root.parent().find(container);
			}

			// 获取 triggers
			var els = root.find(cfg.triggers);
			// 自动创建 triggers
			if ( !els.length ) {
				// 向上取整
				var counts = Math.ceil(panels.length / cfg.steps);
				for (var i = 1; i <= counts; i++) {
					$("<span>", {
						href: "javascript:void(0);",
						target: "_self",
						text: i
					}).appendTo( root );
				}
				els = root.children("span");
			}

			el = new switchTo(els, panels, cfg);
			root.data("switchable", el);

		});		
		
		return cfg.api ? el : this;		
	};		
		
})(jQuery);

/** plugin-autoplay.js **/

;(function($) {		

	var t = $.switchable; 
	t.plugin = t.plugin || {};
	
	t.plugin.autoplay = {
		cfg: {
			// 自动播放
			autoplay: true,
			// 自动播放间隔
			interval: 3, // 3000ms
			// 鼠标悬停暂停
			autopause: true,
			api: false
		}
	};	
	
	$.fn.autoplay = function(cfg) { 

		if ( typeof cfg == 'number' ) {
			cfg = { interval: cfg };	
		}
		
		var opts = $.extend({}, t.plugin.autoplay.cfg), ret;
		$.extend(opts, cfg);   	
		
		this.each(function() {		
				
			var api = $(this).switchable();			
			if ( api ) {
				ret = api;
			}
			
			var timer, hoverTimer, stopped = true;
	
			api.play = function() {
	
				// do not start additional timer if already exists
				if ( timer ) {
					return;
				}
				
				stopped = false;
				
				// construct new timer
				timer = setInterval(function() {
					api.next();
				}, opts.interval*1000);
				
				api.next();
			};	

			api.pause = function() {
				timer = clearInterval(timer);	
			};
			
			// when stopped - mouseover won't restart 
			api.stop = function() {
				api.pause();
				stopped = true;	
			};
		
			/* when mouse enters, autoplay stops */
			if ( opts.autopause ) {
				api.getPanels().hover(function() {			
					api.pause();
					clearTimeout(hoverTimer);
				}, function() {
					if ( !stopped ) {						
						hoverTimer = setTimeout(api.play, opts.interval*1000);						
					}
				});
			}			
			
			if ( opts.autoplay ) {
				setTimeout(api.play, opts.interval*1000);				
			}

		});
		
		return opts.api ? ret : this;
		
	}; 
	
})(jQuery);

/** plugin-carousel.js **/

;(function($) {		

	$.fn.carousel = function() {

		this.each(function() {
				
			var api = $(this).switchable(),
				cfg = api.getCfg(),
				panels = api.getPanels(),
				wrap = panels.parent(),

				index = api.getTriggers().length -1,
				firstItem = panels.slice(0, cfg.steps),
				lastItem = panels.slice(index * cfg.steps),

				lastPosition = cfg.vertical ? lastItem.position().top : lastItem.position().left,
				direction = cfg.vertical ? "top" : "left",

				allow = panels.length > cfg.visible,
				size = 0;

			panels.css("position", "relative").each(function() {
				size += cfg.vertical ? $(this).outerHeight(true) : $(this).outerWidth(true);
			});

			if ( allow && lastItem.length < cfg.visible ) {
				wrap.append( panels.slice(0, cfg.visible).clone().addClass("clone") );
			}

			$.extend(api, {

				move: function(i) {
					if ( wrap.is(":animated") || !allow ) {
						return this;
					}

					// 从第一个反向滚动到最后一个
					if ( i < 0 ) {
						// 调整位置
						this.adjustPosition(true);
						// 触发最后一组 panels
						return this.click(index);
					}
					// 从最后一个正向滚动到第一个
					else if ( i > index ) {
						// 调整位置
						this.adjustPosition(false);
						// 触发第一组 panels
						return this.click(0);
					}
					else {
						return this.click(i);
					}
				}, 

				adjustPosition: function(isBackward) {
					var theItem = isBackward ? lastItem : firstItem;

					// 调整 panels 到下一个视图中
					$.each(theItem, function() {
						$(this).css(direction, isBackward ? -size : size + "px");
					});
				},

				resetPosition: function(isBackward) {
					var theItem = isBackward ? lastItem : firstItem;
					
					// 滚动完成后，复位到正常状态
					$.each(theItem, function() {
						$(this).css(direction, "0px");
					});
					// 瞬移到正常位置
					wrap.css(direction, isBackward ? -lastPosition : 0 + "px");
				}
			
			});

		});
		
		return this;
		
	}; 
	
})(jQuery);

/** plugin-mousewheel.js **/

;(function($) {
		
	$.fn.wheel = function( fn ){
		return this[ fn ? "bind" : "trigger" ]( "wheel", fn );
	};

	// special event cfgig
	$.event.special.wheel = {
		setup: function(){
			$.event.add( this, wheelEvents, wheelHandler, {} );
		},
		teardown: function(){
			$.event.remove( this, wheelEvents, wheelHandler );
		}
	};

	// events to bind ( browser sniffed... )
	var wheelEvents = !$.browser.mozilla ? "mousewheel" : // IE, opera, safari
		"DOMMouseScroll" + ( $.browser.version < "1.9" ? " mousemove" : "" ); // firefox

	// shared event handler
	function wheelHandler( event ) {
		
		switch ( event.type ){
			
			// FF2
			case "mousemove": 
				return $.extend( event.data, { // 存储正确的属性
					clientX: event.clientX, clientY: event.clientY,
					pageX: event.pageX, pageY: event.pageY
				});
				
			// firefox	
			case "DOMMouseScroll": 
				$.extend( event, event.data );
				event.delta = -event.detail / 3;
				break;
				
			// IE, opera, safari	
			case "mousewheel":				
				event.delta = event.wheelDelta / 120;
				break;
		}
		
		event.type = "wheel"; // 事件劫持
		return $.event.handle.call( this, event, event.delta );
	}

	$.fn.mousewheel = function() {

		this.each(function() {		

			var api = $(this).switchable();
			
			api.getPanels().parent().wheel(function(e, delta)  {
				if ( delta < 0 ) {
					api.next();
				} else {
					api.prev();
				}
				return false;
			});
		});

		return this;
	};
	
})(jQuery);

/** switchable.effect.js **/

/**
 * 淡隐淡现
**/
$.switchable.addEffect("fade", function(i, done) {
	var self = this,
		cfg = self.getCfg(),
		items = self.getPanels(),
		thisItem = self.getVisiblePanel(i);

	items.hide();
	thisItem.fadeIn(cfg.speed * 1000, done);
});

/**
 * 滚动
 *
 * Panel's HTML Makeup:
 * <container>
 *    <wrapper>
 *       <panel />
 *       <panel />
 *       <panel />
 *    </wrapper>
 * </container>
**/
$.switchable.addEffect("scroll", function(i, done) {
	var self = this,
		cfg = self.getCfg(),
		thisItem = self.getVisiblePanel(i),
		wrap = self.getPanels().parent(),
		current = self.getIndex(),
		len = self.getTriggers().length - 1,

		// 从第一个反向滚动到最后一个 or 从最后一个正向滚动到第一个
		isCritical = (current === 0 && i === len) || (current === len && i === 0),
		isBackward = (current === 0 && i === len) ? true : false,
		prop = cfg.vertical ? { top : -thisItem.position().top } : { left : -thisItem.position().left };
	
	// 开始动画
	if ( wrap.is(":animated") ) {
		wrap.stop(true);
	}
	wrap.animate(prop, cfg.speed * 1000, cfg.easing, function() {
		done.call();
		// 复原位置（为了兼容plugin-carousel.js）
		if ( isCritical ) {
			self.resetPosition(isBackward);
		}
	});
});
