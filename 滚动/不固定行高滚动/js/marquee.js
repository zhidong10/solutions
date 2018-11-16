var marq = function (d){
    typeof d == "string" &&(d = document.getElementById(d)); 
    return marq.fn.call(d);
};
marq.fn = function (){//附加2个方法
	this.marqADD = function (fn){CLS.add(this,fn)};
	this.addEvent = function (sEventType,fnHandler){
		if (this.addEventListener) {this.addEventListener(sEventType, fnHandler, false);} 
	    else if (this.attachEvent) {this.attachEvent("on" + sEventType, fnHandler);} 
	    else {this["on" + sEventType] = fnHandler;}
	}
	this.removeEvent = function (sEventType,fnHandler){
		if (this.removeEventListener) {this.removeEventListener(sEventType, fnHandler, false);} 
	    else if (this.detachEvent) {this.detachEvent("on" + sEventType, fnHandler);} 
	    else { this["on" + sEventType] = null;}
	}
	return this;
};
var Class = {create: function() {return function() { this.initialize.apply(this, arguments); }}};
var Bind = function (obj,fun,arr){return function() {return fun.apply(obj,arr);}}
var Marquee = Class.create();
Marquee.prototype = {
  initialize: function(id,name,out,speed) {
    this.name = name;
	this.box = marq(id);
	this.out  = out;
	this.speed = speed;
	this.d = 1;
	this.box.style.position = "relative";
	this.box.scrollTop = 0;
	var _li = this.box.firstChild;
	while(typeof(_li.tagName)=="undefined")_li = _li.nextSibling;
	this.lis = this.box.getElementsByTagName(_li.tagName);
	this.len = this.lis.length;	
	for(var i=0;i<this.lis.length;i++){//计算该复制多少节点，保证无缝滚动，没必要的就不复制
	    var __li = document.createElement(_li.tagName);
		__li.innerHTML = this.lis[i].innerHTML;
		this.box.appendChild(__li);
		if(this.lis[i].offsetTop>=this.box.offsetHeight)break;
	}
	this.Start();
	this.box.addEvent("mouseover",Bind(this,function(){clearTimeout(this.timeout);},[]));
	this.box.addEvent("mouseout",Bind(this,this.Start,[]));
  },
  Start:function (){
	  clearTimeout(this.timeout);
	  this.timeout = setTimeout(this.name+".Up()",this.out*1000)
  },
  Up:function(){
	  clearInterval(this.interval);
	  this.interval = setInterval(this.name+".Fun()",10);
  },
  Fun:function (){
      this.box.scrollTop+=this.speed;
	  if(this.lis[this.d].offsetTop <= this.box.scrollTop){
	    clearInterval(this.interval);
		this.box.scrollTop = this.lis[this.d].offsetTop;
		this.Start();
		this.d++;
	  }
	  if(this.d >= this.len + 1){
	     this.d = 1;
	     this.box.scrollTop = 0;
	  }
  }
};
marq(window).addEvent("load",function (){
  different1 = new Marquee("marquee1","different1",1,2);
  different2 = new Marquee("marquee2","different2",3,1);//加载完后运行代码，marquee1/2是外框的id，a是间隔滚动的时间（越大越慢），b是滚动距离递增的速度（越大越快）
});





