var rotateOBJ={
    i:0, //默认滑动卡片第一个的index
    timer:null, //定时器
    len:0, //默认滑动卡片的总长度
    isPc:function(){ //判断浏览器类型
        var sUserAgent = navigator.userAgent.toLowerCase(),
            bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
            bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
            bIsMidp = sUserAgent.match(/midp/i) == "midp",
            bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
            bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
            bIsAndroid = sUserAgent.match(/android/i) == "android",
            bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
            bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return false;
        } else {
            return true;
        };
    },
    createDom:function(list){ //获取后台数据 渲染dom
        var liStr1='',liStr2='',hotStr='',str='',objLength='';
        objLength=list.length;
        for(var i=0;i<objLength;i++){
            liStr1+='<li>'+
                        '<h3>'+list[i].name+'</h3><img src='+list[i].imgUrl+' class="img-circle" />'+
                    '</li>';
            liStr2+='<li>'+
                        '<h3>'+list[i].name+'</h3><img src='+list[i].imgUrl+' class="img-circle" />'+
                    '</li>';
        }
        for(var k=0;k<objLength*2;k++){
            hotStr+='<li class=""></li>'
        }
        str='<div class="prevBtn"></div>'+
        '<div class="nextBtn"></div>'+
        '<div class="swiper-wrapper">'+
            '<div class="model-hero" style="display: block;">'+
                '<div class="hero-item">'+
                    '<ul id="rotateUl">'+liStr1+liStr2+'</ul>'+
                '</div>'+
                '<div class="hero-dot">'+
                    '<ul>'+hotStr+'</ul>'+
                '</div>'+
            '</div>'+
        '</div>';
        $('#owl-brandB').html(str);
    },
    init:function(parames){
        rotateOBJ.createDom(parames.ready)
        rotateOBJ.isPc();
        
        $('.hero-item ul li:first').addClass('active');
        $('.hero-item ul li').eq(1).addClass('active-next');
        $('.hero-item ul li:last').addClass('active-prev');
        rotateOBJ.autoloop()
        $('.hero-dot ul li').on('click', function() {
            var that = $(this).index();
            rotateOBJ.i = that;
            rotateOBJ.imgloop(that);
        });
        
        // 绑定事件
        $('.hero-item ul li').on('click', function() {
            if ($(this).hasClass('active')) {
    
            } else {
                var that = $(this).index();
                rotateOBJ.i = that;
                rotateOBJ.imgloop(that);
            };
        });
        $('.hero-item,.hero-dot').on('mouseenter', function() {
            clearTimeout(rotateOBJ.timer);
        }).on('mouseleave', function() {
            rotateOBJ.timer = setTimeout(rotateOBJ.autoloop, 3000)
        });
        $("#owl-brandB .prevBtn").click(function(){
          $("#owl-brandB .active-prev").click();
        });
        $("#owl-brandB .nextBtn").click(function(){
          $("#owl-brandB .active-next").click();
        });
        if(parames.isTouch && !rotateOBJ.isPc()){ //移动端滑动
            $('body').on('touchstart', '.model-hero', function(e) {
                var touch = e.originalEvent,
                    startX = touch.changedTouches[0].pageX,
                    startY = touch.changedTouches[0].pageY,
                    slider = $(this);
                slider.on('touchmove', function(e) {                
                    touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                    if (touch.pageX - startX > 10) {
                        console.log("右划");
                        slider.off('touchmove');
                        $("#owl-brandB .active-prev").click();
                    } else if (touch.pageX - startX < -10) {
                        console.log("左划");
                        slider.off('touchmove');
                        $("#owl-brandB .active-next").click();
                    };
                    e.stopPropagation();
                }); 
            })
        }
    },
    autoloop:function(){ // 自动播放
        rotateOBJ.len=$('.hero-item ul li').length;
        if ($('.vedio-src').hasClass('on')) {
            return false;
        }
        rotateOBJ.timer = setTimeout(rotateOBJ.autoloop, 3000)
        if (rotateOBJ.i == rotateOBJ.len) { rotateOBJ.i = 0 }
        rotateOBJ.imgloop(rotateOBJ.i)
        rotateOBJ.i++;
    },
    imgloop:function(that){  // 定位图片位置
        var len = $('.hero-item ul li').length - 1,
            index = $('.hero-item ul li').eq(that),
            prev = $('.hero-item ul li').eq(that - 1),
            next = $('.hero-item ul li').eq(that + 1);
        $('.hero-dot ul li').eq(that).addClass('on').siblings().removeClass('on');
        $('.hero-item ul li').removeAttr("class");
        index.addClass('active');  // 图片对应的热点
        that == 0 ? $('.hero-item ul li:last').addClass('active-prev') : prev.addClass('active-prev');
        that == len ? $('.hero-item ul li:first').addClass('active-next') : next.addClass('active-next');
    }
}


    
    