//预约
var appoint = {}
    $(function(){
    appoint = {
        conf:{
            game:"toufang",//游戏 toufang
            actv_key:"ldj_20180608",//活动key
            cdk_type:"",//礼包码是否相同（不填获取不同CDK）
            phone_num:"",
            device_type:"",//手机型号（非必填）
            phone_code:""
        },
        times:"",
        time_num:60,
        u_phone:new RegExp("^1[0-9][0-9]{9}$"),
        code:new RegExp("^[0-9]{6}$"),
        clear_times:function(){
            clearInterval(this.times);
            $("#getCodeBtn").removeClass('btn_disabled');
            $("#getCodeBtn").text('获取验证码');
        },
        countdown:function(){
                this.time_num--;
                $("#getCodeBtn").text("*" + this.time_num + "s后再试");
                if (this.time_num <= 0) {
                    this.clear_times();
                    this.time_num = 60;
                }
        },    
        //验证码检测
        checkCode:function(){
            var num = $.trim($("#code-input").val());
            this.conf.phone_code = '';
            if(!this.code.test(num)){            
                alert("请输入正确的验证码");
                return false;
            }else{
                this.conf.phone_code = num;
                return true;
            }
        },
        //手机号验证
        checkPhone:function(){
            var phone = $.trim($("#phone-input").val());
            this.conf.phone_num = '';
            if(!this.u_phone.test(phone)){            
                alert("请输入正确的手机号");
                return false;
            }else{
                this.conf.phone_num = phone;
                return true;
            }
        },
        //根据手机号获取验证码
        getPhoneCode:function(){
            var _this = this;
            if(!this.checkPhone()){
                return;
            }
            $.ajax({
            type: "get",
            url: "http://activity2.changyou.com/appoint/getVerificationCode.ncdo",
            dataType: "jsonp",
            data: {
                game: _this.conf.game,
                actvKey: _this.conf.actv_key,
                phone: _this.conf.phone_num
            },
            success: function(data) {
                if (data) {
                    if (data.errCode == "000") {
                        _this.times = setInterval(function(){
                            _this.countdown();
                        }, 1000);
                        $("#getCodeBtn").addClass('btn_disabled');
                    } else if (data.errCode == "016") {
                        alert("您已预约！");                    
                    } else {
                        alert(data.errMsg);
                    }
                }
            },
            error: function() {}
        });
        },
        //提交验证码
        codeSubmit:function(){
            var _this = this;
            if(!this.checkPhone()){
                return;
            }
            if(!this.checkCode()){
                return;
            }
            var urlName, qudao,order;
            //获取页面文件名 
            function GetPageName() 
            { 
                var url=window.location.href;//获取完整URL 
                var tmp= new Array();//临时变量，保存分割字符串 
                tmp=url.split("/");//按照"/"分割 
                var pp = tmp[tmp.length-1];//获取最后一部分，即文件名和参数 
                tmp=pp.split("?");//把参数和文件名分割开
                tmp[0].split(".");
                return tmp[0].split(".")[0]; 
            }
            urlName = GetPageName();
            qudao = urlName.split('-')[0];
            order = urlName.split('-')[1]?urlName.split('-')[1]:"kong";
            $.ajax({
                type: "get",
                url: "http://activity2.changyou.com/appoint/verificationCode.ncdo",
                dataType: "jsonp",
                data: {
                    game: _this.conf.game,
                    actvKey: _this.conf.actv_key,
                    phone: _this.conf.phone_num,
                    numCode: _this.conf.phone_code,
                    col01 : qudao,
                    col02 : order
                },
                success: function(data) {
                    if (data) {
                        if (data.errCode == "000" || data.errCode == "016") {
                            _this.clear_times();
                            _this.time_num = 60;
                            // $(".mail_num").val("");
                            $("#phone-input").val("");
                            $("#code-input").val("");
                            $("#step1").hide();
                            $("#step2").show();
                        } else {
                            alert(data.errMsg);
                        }
                    }
                },
                error: function() {}
            });
        },
        init:function(){
            var _this = this;
            var mask = document.getElementById("pop-mask");
            $(mask).bind('touchstart',function(e){
                    e.preventDefault(); //标准  
                    e.stopPropagation();
                    return false;
            })
            $("#subBtn").click(function(){
                _this.codeSubmit();
            });
            $("#getCodeBtn").click(function(){
                _this.getPhoneCode();
            });
            $("#pop-back").click(function(){
                $("#step2").hide();
                $("#step1").show();
            });
            $(".close-box").click(function(){
                $("#Dialog1").hide();
            });
            $(".os-sel label").click(function(){
                var ind = $(this).index();
                $(".os-sel .active").removeClass("active");
                $(this).find('em').addClass('active');
            })
        }
    }
    $(window).scroll(function(event) {
        var target = $(".con-dialog");
        if($("#Dialog1").is(":visible")){
            target.css("top",($(window).height()-target.height())/2 + $(window).scrollTop())
               .css("left",($(window).width()-target.width())/2+$(window).scrollLeft())
               .css("z-index","9999")
               .fadeIn();
        }
    });
    appoint.init();
    $(window).scroll();
    });
