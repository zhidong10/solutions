var h = {}; 
h.get = function (url, data, ok, error) { 
    $.ajax({ 
        url: url, 
        data: data, 
        dataType: 'json', 
        success: ok, 
        error: error 
    }); 
} 
h.post = function (url, data, ok, error) { 
    $.ajax({ 
        url: url, 
        data: data, 
        type: 'post', 
        dataType: 'json', 
        success: ok, 
        error: error 
    }); 
} 
//获取url参数 
h.url = function (url) { 
    if (!url) { 
        url = location.search.substring(1); 
    } else { 
        url = url.substr(url.indexOf('?') + 1); 
    } 
    var args = new Object();   // 声明并初始化一个 "类" 
    // 获得地址(URL)"?"后面的字符串. 
    var query = decodeURI(url); 
    var pairs = query.split("&");  // 分割URL(别忘了'&'是用来连接下一个参数) 
    for (var i = 0; i < pairs.length; i++) { 
        var pos = pairs[i].indexOf('='); 
        if (pos == -1) continue; // 它在找有等号的 数组[i] 
        var argname = pairs[i].substring(0, pos); // 参数名字 
        var value = pairs[i].substring(pos + 1);  // 参数值 
        // 以键值对的形式存放到"args"对象中 
        args[argname] = decodeURI(value); 
    } 
    return args; 
} 
   
// 返回字符串的实际长度, 一个汉字算2个长度  
String.prototype.strlen = function () { 
    return this.replace(/[^\x00-\xff]/g, "**").length; 
} 
//字符串超出省略 
String.prototype.cutstr = function (len) { 
    var restr = this; 
    var wlength = this.replace(/[^\x00-\xff]/g, "**").length; 
    if (wlength > len) { 
        for (var k = len / 2; k < this.length; k++) { 
            if (this.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) { 
                restr = this.substr(0, k) + "..."; 
                break; 
            } 
        } 
    } 
    return restr; 
} 
//替换全部 
String.prototype.replaceAll = function (s1, s2) { 
    return this.replace(new RegExp(s1, "gm"), s2) 
} 
//字符串去空格 
String.prototype.trim = function () { 
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 
String.prototype.trimAll = function () { 
    return this.replace(/\s+/g, ""); 
} 
String.prototype.lTrim = function () { 
    return this.replace(/(^\s*)/g, ""); 
} 
String.prototype.rTrim = function () { 
    return this.replace(/(\s*$)/g, ""); 
} 
//判断是否以某个字符串开头 
String.prototype.startWith = function (s) { 
    return this.indexOf(s) == 0 
} 
//判断是否以某个字符串结束 
String.prototype.endWith = function (s) { 
    var d = this.length - s.length; 
    return (d >= 0 && this.lastIndexOf(s) == d) 
} 
   
//删除数组中存在重复的元素 
function getUnique(someArray) { 
    tempArray = someArray.slice(0); //复制数组到临时数组 
    for (var i = 0; i < tempArray.length; i++) { 
        for (var j = i + 1; j < tempArray.length;) { 
            if (tempArray[j] == tempArray[i]) 
                //后面的元素若和待比较的相同，则删除并计数； 
                //删除后，后面的元素会自动提前，所以指针j不移动 
            { 
                tempArray.splice(j, 1); 
            } 
            else { 
                j++; 
            } 
            //不同，则指针移动 
        } 
    } 
    return tempArray; 
} 
//判断数组中是否存在重复的元素 
function confirmRepeat(someArray) { 
    tempArray = someArray.slice(0); //复制数组到临时数组 
    for (var i = 0; i < tempArray.length; i++) { 
        for (var j = i + 1; j < tempArray.length;) { 
            if (tempArray[j] == tempArray[i]) 
                //后面的元素若和待比较的相同，则删除并计数； 
                //删除后，后面的元素会自动提前，所以指针j不移动 
            { 
                return true; 
            } 
            else { 
                j++; 
            } 
            //不同，则指针移动 
        } 
    } 
    return false; 
} 
   
//判断某个值是否在数组中 
Array.prototype.in_array = function (e) { 
    for (i = 0; i < this.length; i++) { 
        if (this[i] == e) 
            return true; 
    } 
    return false; 
} 
//判断某个值在数组中的位置 
Array.prototype.indexOf = function (e) { 
    for (i = 0; i < this.length; i++) { 
        if (this[i] == e) 
            return i; 
    } 
    return -1; 
} 
   
//转义html标签 
function HtmlEncode(text) { 
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>') 
} 
   
//格式化日期 DateFormat('yyyy_MM_dd hh:mm:ss:SS 星期w 第q季度') 
function DateFormat(format, date) { 
    if (!date) { 
        date = new Date(); 
    } 
    var Week = ['日', '一', '二', '三', '四', '五', '六']; 
    var o = { 
        "y+": date.getYear(), //year 
        "M+": date.getMonth() + 1, //month  
        "d+": date.getDate(), //day  
        "h+": date.getHours(), //hour  
        "H+": date.getHours(), //hour 
        "m+": date.getMinutes(), //minute  
        "s+": date.getSeconds(), //second  
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter  
        "S": date.getMilliseconds(), //millisecond  
        "w": Week[date.getDay()] 
    } 
    if (/(y+)/.test(format)) { 
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); 
    } 
    for (var k in o) { 
        if (new RegExp("(" + k + ")").test(format)) { 
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); 
        } 
    } 
    return format; 
} 
   
//设置cookie值 
function setCookie(name, value, Hours) { 
    var d = new Date(); 
    var offset = 8; 
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000); 
    var nd = utc + (3600000 * offset); 
    var exp = new Date(nd); 
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000); 
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;" 
} 
//获取cookie值 
function getCookie(name) { 
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")); 
    if (arr != null) return unescape(arr[2]); 
    return null 
} 
   
//加入收藏夹 
function AddFavorite(sURL, sTitle) { 
    try { 
        window.external.addFavorite(sURL, sTitle) 
    } catch (e) { 
        try { 
            window.sidebar.addPanel(sTitle, sURL, "") 
        } catch (e) { 
            alert("加入收藏失败，请使用Ctrl+D进行添加") 
        } 
    } 
} 
//设为首页 
function setHomepage(homeurl) { 
    if (document.all) { 
        document.body.style.behavior = 'url(#default#homepage)'; 
        document.body.setHomePage(homeurl) 
    } else if (window.sidebar) { 
        if (window.netscape) { 
            try { 
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect") 
            } catch (e) { 
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true"); 
            } 
        } 
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
        prefs.setCharPref('browser.startup.homepage', homeurl) 
    } 
} 
   
//跨浏览器绑定事件 
function addEventSamp(obj, evt, fn) { 
    if (!oTarget) { return; } 
    if (obj.addEventListener) { 
        obj.addEventListener(evt, fn, false); 
    } else if (obj.attachEvent) { 
        obj.attachEvent('on' + evt, fn); 
    } else { 
        oTarget["on" + sEvtType] = fn; 
    } 
} 
//跨浏览器删除事件 
function delEvt(obj, evt, fn) { 
    if (!obj) { return; } 
    if (obj.addEventListener) { 
        obj.addEventListener(evt, fn, false); 
    } else if (oTarget.attachEvent) { 
        obj.attachEvent("on" + evt, fn); 
    } else { 
        obj["on" + evt] = fn; 
    } 
} 
   
//判断是否移动设备访问 
function isMobileUserAgent() { 
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase())); 
} 
   
//完美判断是否为网址 
function IsURL(strUrl) { 
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i 
    if (regular.test(strUrl)) { 
        return true; 
    } else { 
        return false; 
    } 
} 
   
//获取页面高度 
function getPageHeight() { 
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement; 
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight); 
} 
//获取页面宽度 
function getPageWidth() { 
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat" ? a : g.documentElement; 
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth); 
} 
   
//获取页面可视宽度 
function getPageViewWidth() { 
    var d = document, a = d.compatMode == "BackCompat" 
                    ? d.body 
                    : d.documentElement; 
    return a.clientWidth; 
} 
//获取页面可视高度 
function getPageViewHeight() { 
    var d = document, a = d.compatMode == "BackCompat" 
                    ? d.body 
                    : d.documentElement; 
    return a.clientHeight; 
} 
   
//获取页面scrollLeft 
function getPageScrollLeft() { 
    var a = document; 
    return a.documentElement.scrollLeft || a.body.scrollLeft; 
} 
//获取页面scrollTop 
function getPageScrollTop() { 
    var a = document; 
    return a.documentElement.scrollTop || a.body.scrollTop; 
} 
//获取窗体可见范围的宽与高 
function getViewSize() { 
    var de = document.documentElement; 
    var db = document.body; 
    var viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth; 
    var viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight; 
    return Array(viewW, viewH); 
} 
//随机数时间戳 
function uniqueId() { 
    var a = Math.random, b = parseInt; 
    return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a()); 
} 
   
//获取网页被卷去的位置 
function getScrollXY() { 
    return document.body.scrollTop ? { 
        x: document.body.scrollLeft, 
        y: document.body.scrollTop 
    } : { 
        x: document.documentElement.scrollLeft, 
        y: document.documentElement.scrollTop 
    } 
} 
   
//匹配国内电话号码(0511-4405222 或 021-87888822)  
function istell(str) { 
    var result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/); 
    if (result == null) return false; 
    return true; 
} 
//匹配身份证(15位或18位)  
function isidcard(str) { 
    var result = str.match(/\d{15}|\d{18}/); 
    if (result == null) return false; 
    return true; 
} 
//移动电话 
function checkMobile(str) { 
    if (!(/^1[3|5|8][0-9]\d{4,8}$/.test(str))) { 
        return false; 
    } 
    return true; 
} 
// 判断输入是否是一个由 0-9 / A-Z / a-z 组成的字符串  
function isalphanumber(str) { 
    var result = str.match(/^[a-zA-Z0-9]+$/); 
    if (result == null) return false; 
    return true; 
} 
// 判断输入是否是有效的电子邮件  
function isemail(str) { 
    var result = str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/); 
    if (result == null) return false; 
    return true; 
} 
   
//金额大写转换函数 transform('123431233132.23') 
function transform(tranvalue) { 
    try { 
        var i = 1; 
        var dw2 = new Array("", "万", "亿"); //大单位 
        var dw1 = new Array("拾", "佰", "仟"); //小单位 
        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用 
        //以下是小写转换成大写显示在合计大写的文本框中      
        //分离整数与小数 
        var source = splits(tranvalue); 
        var num = source[0]; 
        var dig = source[1]; 
        //转换整数部分 
        var k1 = 0; //计小单位 
        var k2 = 0; //计大单位 
        var sum = 0; 
        var str = ""; 
        var len = source[0].length; //整数的长度 
        for (i = 1; i <= len; i++) { 
            var n = source[0].charAt(len - i); //取得某个位数上的数字 
            var bn = 0; 
            if (len - i - 1 >= 0) { 
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字 
            } 
            sum = sum + Number(n); 
            if (sum != 0) { 
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面 
                if (n == '0') sum = 0; 
            } 
            if (len - i - 1 >= 0) { //在数字范围内 
                if (k1 != 3) { //加小单位 
                    if (bn != 0) { 
                        str = dw1[k1].concat(str); 
                    } 
                    k1++; 
                } else { //不加小单位，加大单位 
                    k1 = 0; 
                    var temp = str.charAt(0); 
                    if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位 
                        str = str.substr(1, str.length - 1); 
                    str = dw2[k2].concat(str); 
                    sum = 0; 
                } 
            } 
            if (k1 == 3) { //小单位到千则大单位进一 
                k2++; 
            } 
        } 
        //转换小数部分 
        var strdig = ""; 
        if (dig != "") { 
            var n = dig.charAt(0); 
            if (n != 0) { 
                strdig += dw[Number(n)] + "角"; //加数字 
            } 
            var n = dig.charAt(1); 
            if (n != 0) { 
                strdig += dw[Number(n)] + "分"; //加数字 
            } 
        } 
        str += "元" + strdig; 
    } catch (e) { 
        return "0元"; 
    } 
    return str; 
} 
//拆分整数与小数 
function splits(tranvalue) { 
    var value = new Array('', ''); 
    temp = tranvalue.split("."); 
    for (var i = 0; i < temp.length; i++) { 
        value = temp; 
    } 
    return value; 
} 
   
//格式化数字 
function number_format(number, decimals, dec_point, thousands_sep) { 
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */ 
    number = (number + '').replace(/[^0-9+-Ee.]/g, ''); 
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), 
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, 
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point, 
        s = '', 
        toFixedFix = function (n, prec) { 
            var k = Math.pow(10, prec); 
            return '' + Math.ceil(n * k) / k; 
        }; 
   
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.'); 
    var re = /(-?\d+)(\d{3})/; 
    while (re.test(s[0])) { 
        s[0] = s[0].replace(re, "$1" + sep + "$2"); 
    } 
   
    if ((s[1] || '').length < prec) { 
        s[1] = s[1] || ''; 
        s[1] += new Array(prec - s[1].length + 1).join('0'); 
    } 
    return s.join(dec); 
}