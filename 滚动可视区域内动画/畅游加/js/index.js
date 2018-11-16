/*!
 * Changyou Plus
 * @author hanbingfeng
 * @version v3
 */
var plus=(function(){

    //滚动条参数
    var niceScrollParams={
        scrollspeed:100,
        cursorcolor:'#eaeaea',
        cursorborder:'1px solid #ccc',
        cursorwidth:'8px',
        zindex:100,
        cursorborderradius:0
    }

    //区块高度
    var COUNTDOWNTIME=0;
    var posArr=[0,848,1528,2208,2888,3568];

    /*functions*/
    function bindRightFixedFn(){
		$("#fix-nav-down").click(function(){
			var sTop=$(window).scrollTop();
			for(var i=0;i<posArr.length;i++){
				if(sTop<posArr[i]){
					$('body,html').stop().animate({scrollTop:posArr[i]});
					break;
				}
			}
		})
	}

    //调用滚动条
    function bindNicescrollFn(){
        if(!($.browser.msie&&$.browser.version=="7.0")){ 
            $("body").niceScroll(niceScrollParams);
        }
    }

    //
    function bindNavFn(height){
        var index = 0;
        for(var i=0; i<posArr.length; i++){
            if(height < posArr[i]){
                  index=i-1;
                  break;
            }
        }
        //根据滚动条切换右侧导航状态
        var fixNavLi=$("#fix-nav li");
        fixNavLi.removeClass("current");
        fixNavLi.eq(index).addClass("current");
    }

    // 右侧导航点击
    function bindNavClick(){
        var fixNavLi=$("#fix-nav li");
        fixNavLi.each(function(index){
            $(this).click(function(){

                var top=posArr[index];
                $('body,html').stop().animate(
                    {scrollTop:top},
                    Math.abs(parseInt(($(window).scrollTop()-top)*1.5)),
                    'easeOutCubic'
                )
            })
        })
    }

    function bindScrollFn(){
        $(window).scroll(function () {
            var scrolled = $(window).scrollTop();
            var bindnav= bindNavFn(scrolled);
            var scrolled2 = (scrolled - 848) > 0 ? (scrolled - 848) : 0;
            var scrolled3 = (scrolled - 1528) > 0 ? (scrolled - 1528) : 0;
            var scrolled4 = (scrolled - 2208) > 0 ? (scrolled - 2208) : 0;
        })
    }

    function init(){
        bindScrollFn();
        bindNicescrollFn();
        bindNavClick();
	    bindRightFixedFn();
    }
    return{
        init:init
    }
}())

$(function(){
    plus.init();
    
    if ($.support.leadingWhitespace) {
        //动画
        var controller;        
        // init controller
        controller = new ScrollMagic();
        var sceneOptions = {duration: 600, offset: -100};

        // container pin
        var startpin = new ScrollScene({
                duration: 500
            })
            .setPin("#layout1")
            .addTo(controller);

        // animations
        var nervousHat = new TimelineMax({repeat: -1, yoyo: true})
            .add(TweenMax.to("#mobi_bg", 1, {top: "+=5", left: "-=6", rotation: -3}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "-=10", left: "+=6", rotation: 0}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "+=5", left: "+=6", rotation: 3}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "-=5", left: "-=3", rotation: 1.5}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "+=5", left: "-=6", rotation: -1.5}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "+=5", left: "+=3", rotation: 0}))
            .add(TweenMax.to("#mobi_bg", 1, {top: "-=10"}));

        // Function1
        new ScrollScene(sceneOptions)
            .addTo(controller)
            .triggerHook(0.7)
            .triggerElement("#page2")
            .setTween(
                new TimelineMax({delay: 1})
                .add(
                    TweenMax.from("#function1", 12, {left: "-5%", marginLeft: -100, ease: Cubic.easeOut, autoAlpha: 0})
                )
                .add(
                    TweenMax.from("#function1_intro", 12, {autoAlpha: 0})
                )
        )

        // Function2
        new ScrollScene(sceneOptions)
            .addTo(controller)
            .triggerElement("#page3")
            .triggerHook(0.7)
            .setTween(
                new TimelineMax({delay: 1})
                .add(
                    TweenMax.from("#function2", 1, {right: "-5%", marginRight: -100, ease: Cubic.easeOut, autoAlpha: 0})
                )
                .add(TweenMax.from("#function2_intro", 1, {autoAlpha: 0}))
        )
        
        // Function3
        new ScrollScene(sceneOptions)
            .addTo(controller)
            .triggerHook(0.7)
            .triggerElement("#page4")
            .setTween(
                new TimelineMax({delay: 1})
                .add(
                    TweenMax.from("#function3", 1, {left: "-5%", marginLeft: -100, ease: Cubic.easeOut, autoAlpha: 0})
                )                        
                .add(TweenMax.from("#function3_intro", 1, {autoAlpha: 0}))
        )

        // Function4
        new ScrollScene(sceneOptions)
            .addTo(controller)
            .triggerHook(0.7)
            .triggerElement("#page5")
            .setTween(
                new TimelineMax({delay: 1})
                .add(
                    TweenMax.from("#function4", 1, {right: "-5%", marginRight: -100, ease: Cubic.easeOut, autoAlpha: 0})
                )                        
                .add(TweenMax.from("#function4_intro", 1, {autoAlpha: 0}))
        )
    } 
})