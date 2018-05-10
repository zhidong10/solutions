//横竖屏幕
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
function hengshuping() {
	var dis = (window.orientation == 90 || window.orientation == -90)?'block':'none';
    document.getElementById('error').style.display = dis;
};
//enter
var enterNum = 0;
//微信对话
(function(e, t) {//(window, document);
	function i(e) {
		var t = this;
		t.config = e;
		t.count = e.data.data.length;
		t.over = e.over;
		e.preload && e.preload();
		n.setTitle(e.data.chat_name);
		n.imgPreloader(n.images(e.data.data), function(n, r) {
			e.finishload && e.finishload(function(){
				t.init();
			});
		});
	}
	var n = {
		images: function(e) {
			var t = 0;
			var n = e.length;
			var r = [];
			for (; t < n; t++) {
				var i = e[t].data;
				for (var s in i){
					if (i[s].match(/.(png|jpg|jpeg|gif)$/)) {
						var o = !1;
						for (var u = 0; u < r.length; u++){
							r[u] === i[s] && (o = !0);
						};
						o || r.push(i[s]);
					}
				}
			}
			return r
		},
		imgPreloader: function(e, t) {
			if (e.length === 0) return t && t(), !1;
			var n = e.length;
			var r = 0;
			var i = 0;
			var s = 0;
			var o = [];
			var u = function(e, t, n) {
					var r = new Image;
					r.onload = function() {
						t && t();
					}, r.onerror = function() {
						n && n();
					};
					r.src = e;
				};
			for (; r < n; r++) {
				var a = e[r];
				u(a, function() {
					i++;
					i + s === n && t.call(e, s, o);
				}, function() {
					s++;
					o.push(a);
					i + s === n && t.call(e, s, o);
				});
			}
		},
		setTitle: function(e) {
			t.title = e;
			var $body = $('body');
			var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {  
				setTimeout(function() {
					$iframe.off('load').remove();   
				}, 0);
			}).appendTo($body);
		}
	};
	n.msgBox = t.querySelector(".base-msgbox");
	var oAudio = t.getElementById("msgr");
	n.audio = new Audio();
	n.audio.src = oAudio.src;//填入你的音频地址
	n.audio.preload = "auto";
	n.audio.play();
	n.queue = {
		time: function(e) {
			var r = t.createElement("div");
			r.className = "component-time";
			r.innerHTML = "<b>" + e.text + "</b>";
			n.msgBox.appendChild(r);
		},
		info: function(e) {
			var r = t.createElement("div");
			r.className = "component-info";
			r.innerHTML = "<b>" + e.text + "</b>";
			n.msgBox.appendChild(r);
		},
		"m-text": function(e, r) {
			var i = t.createElement("div");
			i.className = "component-" + e;
			i.innerHTML = '<div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="content">' + '<div class="name">' + r.name + "</div>" + '<div class="message-wrapper text">' + r.text + "</div>" + "</div>";
			n.msgBox.appendChild(i);
		},
		"m-card": function(e, r) {
			var i = t.createElement("div");
			i.className = "component-" + e;
			i.innerHTML = '<div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="content">' + '<div class="name">' + r.name + "</div>" + "<div onclick=\"javascript:window.location.href='" + r.url + '\'" class="message-wrapper card">' + '<div class="wrap">' + '<div class="card-type">\u4e2a\u4eba\u540d\u7247</div>' + '<div class="card-info">' + '<div class="card-avatar"><img src="' + r.cardAvatar + '"></div>' + '<div class="card-name">' + r.cardName + "</div>" + '<div class="card-num">' + r.cardNum + "</div>" + "</div>", "</div>", "</div></div>";
			n.msgBox.appendChild(i);
		},
		"m-emoji": function(e, r) {
			var i = t.createElement("div");
			i.className = "component-" + e;
			i.innerHTML = '<div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="content">' + '<div class="name">' + r.name + "</div>" + '<div class="message-wrapper emoji"><img src="' + r.image + '"></div>' + "</div>";
			n.msgBox.appendChild(i);
		},
		"m-image": function(e, r) {
			var i = t.createElement("div");
			i.className = "component-" + e;
			i.innerHTML = '<div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="content">' + '<div class="name">' + r.name + "</div>" + '<div class="message-wrapper image"><img src="' + r.image + '"></div>' + "</div>";
			n.msgBox.appendChild(i);
		},
		"m-envelop": function(e, r) {
			var i = t.createElement("div");
			i.className = "component-" + e;
			i.innerHTML = '<div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="content">' + '<div class="name">' + r.name + "</div>" + '<div class="message-wrapper envelop">' + '<div class="pack">' + '<div class="logo"></div>' + '<div class="text">' + "<span>\u5e74\u5e74\u6709\u7ea2\u5305\uff0c\u7334\u5e74\u7334…</span>" + "<span>\u9886\u53d6\u7ea2\u5305</span>" + "</div>" + "</div>" + '<div class="info">\u5fae\u4fe1\u7ea2\u5305<div class="logo"><div class="mask"><div class="face"></div></div></div></div>' + "</div>" + "</div>";
			var s = t.createElement("div");
			s.className = "base-open-envelop";
			s.innerHTML = '<div class="wrap"><div class="close"></div><div class="avatar"><img src="' + r.avatar + '"></div>' + '<div class="name">' + r.name + "</div>" + '<div class="tips">\u53d1\u4e86\u4e00\u4e2a\u7ea2\u5305\uff0c\u91d1\u989d\u968f\u673a</div>' + '<div class="desc">' + r.text + "</div>" + '<div class="open">\u62c6\u7ea2\u5305</div>' + "</div>";
			
			n.msgBox.appendChild(i);
			i.querySelector(".envelop").addEventListener(touchstart, function () {
				s.style.display = "block";
				var $s = $(s);
				var close = $s.find('.close');
				var open = $s.find('.open');
				$(t.body).append($s);
				close.on(touchstart, function(){
					$s.remove();
				});
				open.on(touchstart, function(){
					envelop.setObj(open, $s).isShow(true);
				});
			},!1);
		}
	};
	var r = function(e) {
		return new i(e);
	};
	i.prototype.init = function() {
		this.queue(this.config.data.data);
	};
	i.prototype.queue = function(e) {
		var r = this;
		var i = e[0];
		var s = +(new Date);
		var o = null;
		if (typeof i == "undefined") return !1;

		if (+(new Date) - s >= parseInt(i.delay)) {
			if (i.type.indexOf("-") > 0) {
				var u = "m-" + i.type.split("-")[1];
				n.queue[u](i.type.split("-")[0], i.data);
				n.audio.play();
			} else n.queue[i.type](i.data);

			setTimeout(function() {
				t.querySelector(".base-msgbox").scrollTop += 1e3;
			}, 10);
			e.shift();
			r.queue(e)
		} else 
		o = setInterval(function() {
			if (+(new Date) - s >= parseInt(i.delay)) {
				if (i.type.indexOf("-") > 0) {
					var u = "m-" + i.type.split("-")[1];
					n.queue[u](i.type.split("-")[0], i.data);
					n.audio.play();
				} else 
					n.queue[i.type](i.data);
				setTimeout(function() {
					t.querySelector(".base-msgbox").scrollTop += 1e3;
				}, 10);
				clearInterval(o);
				e.shift();
				r.queue(e);
			}
		}, 133);
		if(--this.count === 0){
			this.over && this.over();
		}
	};
	//输入工号
	var ipt = $('#jobnum');
	ipt.blur(function(){
		sendmsg.call(this);
		return false;
	});
	$(document).keydown(function(e){
		if(e.keyCode == 13){
			sendmsg.call(ipt.get(0));
		};
	});
	
	function sendmsg(){
		var _this = this;
		var jobnum = this.value;
		if(jobnum == ''){return false;}
		console.log('send..');
		this.value = '';
		n.queue['m-text']('send', {avatar:user.avatar,name:'',text:jobnum});
		t.querySelector(".base-msgbox").scrollTop += 1e3;
		jobnum = jobnum.toUpperCase();
		var fail = function(){
			n.queue['m-emoji']('message', {avatar:'images/04.png',name:'晓建',image:'images/tip.gif'});
			n.audio.play();
		};
//		if(jobnum && jobnum == '\u6211\u8981\u7ea2\u5305'){
//			n.queue['m-envelop']('message', {avatar:'images/01.png',name:'小德哥',text:''});
//			n.audio.play();
//			return false;
//		};
		if(!/^(CY|CP|SX)\d{3,6}/.test(jobnum)){
			setTimeout(fail,800);
		}else{
			//ajax
			$.post(url1,{
				'openid':openid,
				'jobnum':jobnum
			},function(data){
				console.log(data);
				if(data.code == 0){
					$(_this).remove();
					goOn(data.data);
				}else if(data.code == 10007){
					n.queue['m-text']('message', {avatar:'images/04.png',name:'晓建',text : '亲爱的 '+user.name+'，我记得你，虽然你已经离开畅游，但仍然祝福你发展越来越好～也希望你能常回家来看看～'});
					t.querySelector(".base-msgbox").scrollTop += 1e3;
					n.audio.play();
					setTimeout(function(){page5show();}, 7000);
				}else{
					n.queue['m-text']('message', {avatar:'images/04.png',name:'晓建',text : data.msg});
					n.audio.play();
				}
			},'json');
		}
	}
	
	function goOn(data){
		enterNum = 1;
		envelop.jobnum = data.jobnum;
		var date1 = +new Date();  //当前时间
		var date2 = date1 - data.entryDate*1000;  //时间差的毫秒数
 		var mouths = Math.floor(date2/(30*24*3600*1000)%12);
 		var years = Math.floor(date2/(365*24*3600*1000));
 		var time = years ? years+'年'+mouths+'个月' : mouths+'个月';
 		
 		var date3 = new Date(data.entryDate*1000);
 		var year = date3.getFullYear();

		var data2 = {
			chat_name:"畅游第一天团",
			data:[
			{type:"message-text",delay:1500,data:{avatar:"images/02.png",name:"Jasmine",text:"噢！我知道你，你是"+data.name+"，"+year+"年来公司的吧"}},
			{type:"message-text",delay:2000,data:{avatar:"images/04.png",name:"晓建",text:"感谢你这"+time+"来为公司做的贡献，今年再接再厉"}},
			{type:"message-text",delay:1100,data:{avatar:"images/03.png",name:"韦青",text:"等会小德哥要给你去个电话"}}
			]
		};
		wechat({
			data:data2,
			preload:function(){
				console.log(+(new Date));
			},
			finishload:function(startit){
				startit();
				console.log(+(new Date));
			},
			over:function(){
				setTimeout(function(){
					$call.show();
					var oAudio = document.getElementById('wx_mp3');
					var a = new Audio();
					a.src = oAudio.src ;//填入你的音频地址
					a.preload="auto";
					a.play();
				},6600);
				
			}
		});
	};
	//开红包
	var envelop = {
		obj : $('#alercode'),
		ipt : $('#scIpt'),
		btn : $('#scBtn'),
		msg : $('#msg'),
		hb : $('#hb'),
		money : $('#money'),
		money2 : $('#money2'),
		tip : $('#tip'),
		listory : $('#listory'),
		jobnum : '',
		num : $('#num'),
		myphoto : $('#myphoto'),
		init : function(){
			var _this = this;
			$(document).keydown(function(e){
				if(e.keyCode == 13 && enterNum){
					sub.call(_this);
				};
			});
			this.btn.on(touchstart, function(){
				sub.call(_this);
			});
			
			function sub(){
				var _this = this;
				_this.msg.html('');
				var val = _this.ipt.val();
				if(!val || !/^\d{5}[0-9xX]$/.test(val)){
					_this.msg.html('身份证/护照号码后6位有误');
				}else{
					_this.isShow(false);//关闭弹窗
					_this.open.addClass('round');//
					//ajax
					$.post(url2,{
						'openid':openid,
						'jobnum':_this.jobnum,
						'idcard':val
					},function(data){
						console.log(data);
						_this.result(data);
					},'json');
				}
			}
		},
		result : function(data){
			var _this = this;
			//成功 2秒后
			//setTimeout(function(){
			if(data.code == 0 || data.code == 10005){
				$('#bsbox').remove();
				$('#bsbar').remove();
				$('#alercode').remove();
				_this.hb.show();
				_this.$s.remove();
				data.data.length && _this.drawData(data.data);
				if(data.code != 10005){//红包没领完
					_this.money.show();
				}else{//红包领完了
					_this.myphoto.attr('src', user.avatar);
					_this.tip.html('红包领完了！');
					_this.money2.show();
				};
			}else{
				//失败
				_this.isShow(true);
				_this.open.removeClass('round');
				_this.msg.html(data.msg);
			}
			//},1000);
		},
		setObj : function(obj,$s){
			this.open = obj;
			this.$s = $s;
			return this;
		},
		isShow : function(bln){
			bln ? this.obj.show():this.obj.hide();
			return this;
		},
		drawData : function(data){
			var _html = '';
			var l = data.length;
			for(var i = 0; i<l; i++){
				_html += '<li><img src="'+data[i].headimgurl+'" alt="" /><span class="name">'+data[i].name+'</span><span class="price">'+(data[i].amountMoney/100).toFixed(2)+'元</span></li>';
			};
			this.num.html((data[0].amountMoney/100).toFixed(2));
			this.myphoto.attr('src', data[0].headimgurl);
			this.listory.html(_html);
			return this;
		}
	};
	envelop.init();
	
	//call
	var $call = $('#base-call');
	$call.find('a').on(touchstart,function(){
		var callIn = document.querySelector('video');
		$(callIn).parent().show();
		callIn.src = callIn.src;
		callIn.play();
		
		$call.remove();
		$('#wx_mp3').remove();
		
		var second = 0;
		var $sec = $('#second');
		var time = '00:00';
		var timer = null;
		timer = setInterval(function(){
			var sec = ++second%60;
			time = '00:'+(sec>=10?sec:'0'+sec);
			$sec.html(time);
		},1000);
		//视频播放结束
		callIn.addEventListener("ended", function () {
			n.queue['m-text']('message', {avatar:'images/01.png',name:'小德哥',text:'<i class="videox"></i>通话时长 '+time});
			n.queue['m-envelop']('message', {avatar:'images/01.png',name:'小德哥',text:''});
			n.audio.play();
			document.querySelector(".base-msgbox").scrollTop += 1e3;

	        clearInterval(timer);
	        $sec.html('对方已挂断');
	        
	        setTimeout(function(){
	        	var video = $('#video');
	        	video.addClass('close');
	        	setTimeout(function(){
	        		video.remove();
	        	},500);
	        },1000);
	    },!1);
	});
	e.wechat = r;
})(window, document);

$(function(){
	//预加载
	;(function(){
		var arr = ['01.png','02.png','03.png','04.png','bj.jpg','call.jpg','duil_l.jpg','duil_top.jpg','duil-r.png','end.png','houb.png','icon.png','kun02.png','nniu1.png','nniu2.png','shang.png','tij.png','tip.gif','tools.png','shareImg.png','emoji01.png'];
		var l = arr.length ;
		var i = 0;
		var j = 0;
		for( ; i < l; i++){
			var Img = new Image();
			var setNum = function(src){
				console.log(src);
				if(++j == l){
					//$('#xxx').remove();
					console.log('over');
				}
			};
			Img.onload = function(){
				setNum(this.src);
			};
			Img.onerror = function(){
				setNum(this.src);
			};
			Img.src = 'images/'+arr[i];
		};
	})();
	//滑动效果
	;(function(){
		var oBtn = document.getElementById("pb-box");
		var $oBtn = $(oBtn);
	    var disX = 0;
	    var maxL = Math.min(640,window.innerWidth);
	    oBtn.addEventListener(touchstart, function(e){
	    	e.preventDefault();
	    	if(e.changedTouches){
				e=e.changedTouches[e.changedTouches.length-1];                     
			}
		    disX = e.clientX;
		    
		    var move = function (e){
		    	e.preventDefault();
		    	if(e.changedTouches){
					e=e.changedTouches[e.changedTouches.length-1];                     
				}
			    var l = e.clientX - disX;
			    l < 0 && (l = 0);
			    l > maxL && (l = maxL);
			    oBtn.style.left = l + "px";
			    return false;
		    };
	    	var up = function (){
			    document.removeEventListener(touchmove, move, false);
	    		document.removeEventListener(touchend, up, false);
			    oBtn.releaseCapture && oBtn.releaseCapture();
			    if(oBtn.offsetLeft > maxL / 2){
			    	//预先加载视频
			    	if(navigator.userAgent.indexOf('iPhone') != -1){
						var callIn = document.querySelector('video');
						callIn.src = callIn.src;
						callIn.play();callIn.pause();
					};
					$oBtn.animate({'left':maxL},300,function(){
			    		$oBtn.hide();
		    			$('#base-pb').animate({'opacity':0},300,start);
	    			});
			    }else{
			    	$oBtn.animate({'left':0},300);
			    }
	    	};
	    	document.addEventListener(touchmove, move, false);
	    	document.addEventListener(touchend, up, false);
	    	this.setCapture && this.setCapture();
	   	 	return false
	    }, false);
	    function startMove (iTarget, onEnd){
	    	clearInterval(oBtn.timer);
	    	oBtn.timer = setInterval(function ()	{
				doMove(iTarget, onEnd)
	   	 	}, 30)
	    }
	    function doMove (iTarget, onEnd)
	    {
	    	var iSpeed = (iTarget - oBtn.offsetLeft) / 5;
	    	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	    	iTarget == oBtn.offsetLeft ? (clearInterval(oBtn.timer), onEnd && onEnd()) : oBtn.style.left = iSpeed + oBtn.offsetLeft + "px"
	    }
	    function start(){
	    	$('#base-pb').remove();
	    	wechat({
				data:data,
				preload:function(){
					console.log(+(new Date));
				},
				finishload:function(startit){
					startit();
					console.log(+(new Date));
				},
				over:function(){
					$('#jobnum').show();
				}
			});
	    }
	})();
	//mo页
	$('#endin').on(touchstart, function(){
		page5show();
	});
	
});

function page5show(){
	var oAudio = document.getElementById('xj_mp3');
	var a = new Audio();
	a.src = oAudio.src;//填入你的音频地址
	a.preload="auto";
	a.loop = "loop";
	a.play();
	
	document.getElementById('page5').className = 'page5 toDance';
	$('#hb').remove();
	
	var confrom = {
		$share:$('#share'),
		$shareBg:$('#share-bg'),
		lock:false,
		init:function(){
			var _this = this;
			this.$share.on(touchstart,function(){
				_this.$shareBg.show();
			});
			this.$shareBg.on(touchstart,function(){
				_this.$shareBg.hide();
			});
		}
	}
	confrom.init();
}
