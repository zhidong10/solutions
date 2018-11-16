var LazyLoad = function(elems, options) {
	//初始化程序
	this._initialize(elems, options);
	//如果没有元素就退出
	if ( this.isFinish() ) return;
	//初始化模式设置
	this._initMode();
	//进行第一次触发
	this.resize(true);
};

LazyLoad.prototype = {
  //初始化程序
  _initialize: function(elems, options) {
	this._elems = elems;//加载元素集合
	this._rect = {};//容器位置参数对象
	this._range = {};//加载范围参数对象
	this._loadData = null;//加载程序
	this._timer = null;//定时器
	this._lock = false;//延时锁定
	//静态使用属性
	this._index = 0;//记录索引
	this._direction = 0;//记录方向
	this._lastScroll = { "left": 0, "top": 0 };//记录滚动值
	this._setElems = function(){};//重置元素集合程序
	
	var opt = this._setOptions(options);
	
	this.delay = opt.delay;
	this.threshold = opt.threshold;
	this.beforeLoad = opt.beforeLoad;
	
	this._onLoadData = opt.onLoadData;
	this._container = this._initContainer($$(this.options.container));//容器
  },
  //设置默认属性
  _setOptions: function(options) {
    this.options = {//默认值
		container:	window,//容器
		mode:		"dynamic",//模式
		threshold:	0,//加载范围阈值
		delay:		100,//延时时间
		beforeLoad:	function(){},//加载前执行
		onLoadData:	function(){}//显示加载数据
    };
    return $$.extend(this.options, options || {});
  },
  //初始化容器设置
  _initContainer: function(container) {
	var doc = document,
		isWindow = container == window || container == doc
			|| !container.tagName || (/^(?:body|html)$/i).test( container.tagName );
	if ( isWindow ) {
		container = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
	}
	//定义执行方法
	var oThis = this, width = 0, height = 0;
	this.load = $$F.bind( this._load, this );
	this.resize = $$F.bind( this._resize, this );
	this.delayLoad = function() { oThis._delay( oThis.load ); };
	this.delayResize = function(){//防止重复触发bug
		var clientWidth = container.clientWidth,
			clientHeight = container.clientHeight;
		if( clientWidth != width || clientHeight != height ) {
			width = clientWidth; height = clientHeight;
			oThis._delay( oThis.resize );
		}
	};
	//记录绑定元素方便移除
	this._binder = isWindow ? window : container;
	//绑定事件
	$$E.addEvent( this._binder, "scroll", this.delayLoad );
	isWindow && $$E.addEvent( this._binder, "resize", this.delayResize );
	//获取容器位置参数函数
	this._getContainerRect = isWindow && ( "innerHeight" in window )
		? function(){ return {
				"left":	0, "right":	window.innerWidth,
				"top":	0, "bottom":window.innerHeight
			}}
		: function(){ return oThis._getRect(container); }	;
	//设置获取scroll值函数
	this._getScroll = isWindow
		? function() { return {
				"left": $$D.getScrollLeft(), "top": $$D.getScrollTop()
			}}
		: function() { return {
				"left": container.scrollLeft, "top": container.scrollTop
			}};
	return container;
  },
  //初始化模式设置
  _initMode: function() {
	switch ( this.options.mode.toLowerCase() ) {
		case "vertical" ://垂直方向
			this._initStatic( "vertical", "vertical" );
			break;
		case "horizontal" ://水平方向
			this._initStatic( "horizontal", "horizontal" );
			break;
		case "cross" :
		case "cross-vertical" ://垂直正交方向
			this._initStatic( "cross", "vertical" );
			break;
		case "cross-horizontal" ://水平正交方向
			this._initStatic( "cross", "horizontal" );
			break;
		case "dynamic" ://动态加载
		default :
			this._loadData = this._loadDynamic;
	}
  },
  //初始化静态加载设置
  _initStatic: function(mode, direction) {
	//设置模式
	var isVertical = direction == "vertical";
	if ( mode == "cross" ) {
		this._crossDirection = $$F.bind( this._getCrossDirection, this,
			isVertical ? "_verticalDirection" : "_horizontalDirection",
			isVertical ? "_horizontalDirection" : "_verticalDirection" );
	}
	//设置元素
	var pos = isVertical ? "top" : "left",
		sortFunction = function( x, y ) { return x._rect[ pos ] - y._rect[ pos ]; },
		getRect = function( elem ) { elem._rect = this._getRect(elem); return elem; };
	this._setElems = function() {//转换数组并排序
		this._elems = $$A.map( this._elems, getRect, this ).sort( sortFunction );
	};
	//设置加载函数
	this._loadData = $$F.bind( this._loadStatic, this,
		"_" + mode + "Direction",
		$$F.bind( this._outofRange, this, mode, "_" + direction + "BeforeRange" ),
		$$F.bind( this._outofRange, this, mode, "_" + direction + "AfterRange" ) );
  },
  //延时程序
  _delay: function(run) {
	clearTimeout(this._timer);
	if ( this.isFinish() ) return;
	var oThis = this, delay = this.delay;
	if ( this._lock ) {//防止连续触发
		this._timer = setTimeout( function(){ oThis._delay(run); }, delay );
	} else {
		this._lock = true; run();
		setTimeout( function(){ oThis._lock = false; }, delay );
	}
  },
  //重置范围参数并加载数据
  _resize: function(change) {
	if ( this.isFinish() ) return;
	this._rect = this._getContainerRect();
	//位置改变的话需要重置元素位置
	if ( change ) { this._setElems(); }
	this._load(true);
  },
  //加载程序
  _load: function(force) {
	if ( this.isFinish() ) return;
	var rect = this._rect, scroll = this._getScroll(),
		left = scroll.left, top = scroll.top,
		threshold = Math.max( 0, this.threshold | 0 );
	//记录原始加载范围参数
	this._range = {
		top:	rect.top + top - threshold,
		bottom:	rect.bottom + top + threshold,
		left:	rect.left + left - threshold,
		right:	rect.right + left + threshold
	}
	//加载数据
	this.beforeLoad();
	this._loadData(force);
  },
  //动态加载程序
  _loadDynamic: function() {
	this._elems = $$A.filter( this._elems, function( elem ) {
			return !this._insideRange( elem );
		}, this );
  },
  //静态加载程序
  _loadStatic: function(direction, beforeRange, afterRange, force) {
	//获取方向
	direction = this[ direction ]( force );
	if ( !direction ) return;
	//根据方向历遍图片对象
	var elems = this._elems, i = this._index,
		begin = [], middle = [], end = [];
	if ( direction > 0 ) {//向后滚动
		begin = elems.slice( 0, i );
		for ( var len = elems.length ; i < len; i++ ) {
			if ( afterRange( middle, elems[i] ) ) {
				end = elems.slice( i + 1 ); break;
			}
		}
		i = begin.length + middle.length - 1;
	} else {//向前滚动
		end = elems.slice( i + 1 );
		for ( ; i >= 0; i-- ) {
			if ( beforeRange( middle, elems[i] ) ) {
				begin = elems.slice( 0, i ); break;
			}
		}
		middle.reverse();
	}
	this._index = Math.max( 0, i );
	this._elems = begin.concat( middle, end );
  },
  //垂直和水平滚动方向获取程序
  _verticalDirection: function(force) {
	  return this._getDirection( force, "top" );
  }, 
  _horizontalDirection: function(force) {
	  return this._getDirection( force, "left" );
  },
  //滚动方向获取程序
  _getDirection: function(force, scroll) {
	var now = this._getScroll()[ scroll ], _scroll = this._lastScroll;
	if ( force ) { _scroll[ scroll ] = now; this._index = 0; return 1; }
	var old = _scroll[ scroll ]; _scroll[ scroll ] = now;
	return now - old;
  },
  //cross滚动方向获取程序
  _getCrossDirection: function(primary, secondary, force) {
	var direction;
	if ( !force ) {
		direction = this[ primary ]();
		secondary = this[ secondary ]();
		if ( !direction && !secondary ) {//无滚动
			return 0;
		} else if ( !direction ) {//次方向滚动
			if ( this._direction ) {
				direction = -this._direction;//用上一次的相反方向
			} else {
				force = true;//没有记录过方向
			}
		} else if ( secondary && direction * this._direction >= 0 ) {
			force = true;//同时滚动并且方向跟上一次滚动相同
		}
	}
	if ( force ) {
		this._lastScroll = this._getScroll(); this._index = 0; direction = 1;
	}
	return ( this._direction = direction );
  },
  //判断是否加载范围内
  _insideRange: function(elem, mode) {
	var range = this._range, rect = elem._rect || this._getRect(elem),
		insideH = rect.right >= range.left && rect.left <= range.right,
		insideV = rect.bottom >= range.top && rect.top <= range.bottom,
		inside = {
				"horizontal":	insideH,
				"vertical":		insideV,
				"cross":		insideH && insideV
			}[ mode || "cross" ];
	//在加载范围内加载数据
	if ( inside ) { this._onLoadData(elem); }
	return inside;
  },
  //判断是否超过加载范围
  _outofRange: function(mode, compare, middle, elem) {
	if ( !this._insideRange( elem, mode ) ) {
		middle.push(elem);
		return this[ compare ]( elem._rect );
	}
  },
  _horizontalBeforeRange: function(rect) { return rect.right < this._range.left; },
  _horizontalAfterRange: function(rect) { return rect.left > this._range.right; },
  _verticalBeforeRange: function(rect) { return rect.bottom < this._range.top; },
  _verticalAfterRange: function(rect) { return rect.top > this._range.bottom; },
  //获取位置参数
  _getRect: function(node) {
	var n = node, left = 0, top = 0;
	while (n) { left += n.offsetLeft; top += n.offsetTop; n = n.offsetParent; };
	return {
		"left": left, "right": left + node.offsetWidth,
		"top": top, "bottom": top + node.offsetHeight
	};
  },
  //是否完成加载
  isFinish: function() {
	if ( !this._elems || !this._elems.length ) {
		this.dispose(); return true;
	} else {
		return false;
	}
  },
  //销毁程序
  dispose: function(load) {
	clearTimeout(this._timer);
	if ( this._elems || this._binder ) {
		//加载全部元素
		if ( load && this._elems ) {
			$$A.forEach( this._elems, this._onLoadData, this );
		}
		//清除关联
		$$E.removeEvent( this._binder, "scroll", this.delayLoad );
		$$E.removeEvent( this._binder, "resize", this.delayResize );
		this._elems = this._binder = null;
	}
  }
}