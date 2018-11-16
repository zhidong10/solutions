// JavaScript Document

var $ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

function Event(e){
	var oEvent = document.all ? window.event : e;
	if (document.all) {
		if(oEvent.type == "mouseout") {
			oEvent.relatedTarget = oEvent.toElement;
		}else if(oEvent.type == "mouseover") {
			oEvent.relatedTarget = oEvent.fromElement;
		}
	}
	return oEvent;
}

function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}


var GlideView = Class.create();
GlideView.prototype = {
  //容器对象 容器宽度 展示标签 展示宽度
  initialize: function(obj, iWidth, sTag, iMaxWidth, options) {
    var oContainer = $(obj), oThis=this, len = 0;
	
	this.SetOptions(options);
	
	this.Step = Math.abs(this.options.Step);
	this.Time = Math.abs(this.options.Time);
	this.Showtext = false;//是否显示说明文本
	
	this._list = oContainer.getElementsByTagName(sTag);
	len = this._list.length;
	this._count = len;
	this._width = parseInt(iWidth / len);
	this._width_max = parseInt(iMaxWidth);
	this._width_min = parseInt((iWidth - this._width_max) / (len - 1));
	this._timer = null;
	
	//有说明文本
	if(this.options.TextTag && this.options.TextHeight > 0){
		this.Showtext = true;
		this._text = oContainer.getElementsByTagName(this.options.TextTag);
		this._height_text = -parseInt(this.options.TextHeight);
	}
	
	this.Each(function(oList, oText, i){
		oList._target = this._width * i;//自定义一个属性放目标left
		oList.style.left = oList._target + "px";
		oList.style.position = "absolute";
		addEventHandler(oList, "mouseover", function(){ oThis.Set.call(oThis, i); });
		
		//有说明文本
		if(oText){
			oText._target = this._height_text;//自定义一个属性放目标bottom
			oText.style.bottom = oText._target + "px";
			oText.style.position = "absolute";
		}
	})
	
	//容器样式设置
	oContainer.style.width = iWidth + "px";
	oContainer.style.overflow = "hidden";
	oContainer.style.position = "relative";
	//移出容器时返回默认状态
	addEventHandler(oContainer, "mouseout", function(e){
		//变通防止执行oList的mouseout
		var o = Event(e).relatedTarget;
		if (oContainer.contains ? !oContainer.contains(o) : oContainer != o && !(oContainer.compareDocumentPosition(o) & 16)) oThis.Set.call(oThis, -1);
	})
  },
  //设置默认属性
  SetOptions: function(options) {
    this.options = {//默认值
		Step:			15,//滑动变化率
		Time:			15,//滑动延时
		TextTag:		"",//说明容器tag
		TextHeight:		0//说明容器高度
    };
    Object.extend(this.options, options || {});
  },
  //相关设置
  Set: function(index) {
	if (index < 0) {
		//鼠标移出容器返回默认状态
		this.Each(function(oList, oText, i){ oList._target = this._width * i; if(oText){ oText._target = this._height_text; } })
	} else {
		//鼠标移到某个滑动对象上
		this.Each(function(oList, oText, i){
			oList._target = (i <= index) ? this._width_min * i : this._width_min * (i - 1) + this._width_max;
			if(oText){ oText._target = (i == index) ? 0 : this._height_text; }
		})
	}
	this.Move();
  },
  //移动
  Move: function() {
	clearTimeout(this._timer);
	var bFinish = true;//是否全部到达目标地址
	this.Each(function(oList, oText, i){
		var iNow = parseInt(oList.style.left), iStep = this.GetStep(oList._target, iNow);
		if (iStep != 0) { bFinish = false; oList.style.left = (iNow + iStep) + "px"; }
		//有说明文本
		if (oText) {
			iNow = parseInt(oText.style.bottom), iStep = this.GetStep(oText._target, iNow);
			if (iStep != 0) { bFinish = false; oText.style.bottom = (iNow + iStep) + "px"; }
		}
	})
	//未到达目标继续移动
	if (!bFinish) { var oThis = this; this._timer = setTimeout(function(){ oThis.Move(); }, this.Time); }
  },
  //获取步长
  GetStep: function(iTarget, iNow) {
	var iStep = (iTarget - iNow) / this.Step;
	if (iStep == 0) return 0;
	if (Math.abs(iStep) < 1) return (iStep > 0 ? 1 : -1);
	return iStep;
  },
  Each:function(fun) {
	for (var i = 0; i < this._count; i++)
		fun.call(this, this._list[i], (this.Showtext ? this._text[i] : null), i);
  }
};

window.onload=function(){
	new GlideView("slide_pic", 960, "li", 600, { TextTag: "a", TextHeight: 30 });
}
