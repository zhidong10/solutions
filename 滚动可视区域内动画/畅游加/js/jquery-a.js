var url = document.location;
var domain = url.hostname;
var domain_sub = domain.substr(domain.indexOf(".") + 1);
var stat_url = "http://mon.changyou.com/stat.html?";
var stat_url2 = "http://mon.changyou.com/stat_pt.html?";
var query_str = url.search;
var is_posted = false;
var is_rcc_id=false;
var last_url = document.referrer;
var method = "normal";
var search_engine = new Array();
var search_key = new Array();
var engine_ids = new Array();
search_engine[0] = "www.baidu.com";
search_key[0] =  "wd";
engine_ids[0] = 1;
search_engine[1] = "www.google.com.hk";
search_key[1] = "q";
engine_ids[1] = 2;
search_engine[2] = "cn.bing.com";
search_key[2] = "q";
engine_ids[2] = 3;
search_engine[3] = "www.sogou.com";
search_key[3] = "query";
engine_ids[3] = 4;
search_engine[4] = "www.soso.com";
search_key[4] = "w";
engine_ids[4] = 5;
search_engine[5] = "www.youdao.com";
search_key[5] = "q";
engine_ids[5] = 6;
search_engine[6] = "search.yahoo.com";
search_key[6] = "p";
engine_ids[6] = 7;
search_engine[7] = "www.yahoo.cn";
search_key[7] = "p";
engine_ids[7] = 8;
search_engine[8] = "so.360.cn";
search_key[8] = "q";
engine_ids[8] = 9;
search_engine[9] = "www.so.com";
search_key[9] = "q";
engine_ids[9] = 10;
search_engine[10] = "m.baidu.com";
search_key[10] =  "word";
engine_ids[10] = 1;
search_engine[11] = "m.sogou.com";
search_key[11] = "keyword";
engine_ids[11] = 4;
search_engine[12] = "www.google.com";
search_key[12] = "q";
engine_ids[12] = 2;

var products = new Object();
products["dj.changyou.com"] = 1;
products["tl.changyou.com"] = 2;
products["tl3.changyou.com"] = 2;
products["tl.cy.com"] = 2;
products["xsh.changyou.com"] = 4;
products["ldj.changyou.com"] = 8;
products["jd.changyou.com"] = 9;
products["gy.changyou.com"] = 11;
products["gy.cy.com"] = 11;
products["dpol.changyou.com"] = 31;
products["dpcq.changyou.com"] = 31;
products["ty.playcool.com"] = 35;
products["x7.changyou.com"] = 36;
products["yz.changyou.com"] = 50;
products["x6.changyou.com"] = 53;
products["tzcs.changyou.com"] = 54;
products["event.changyou.com"] = 55;
products["db.changyou.com"] = 58;
products["hardcore.changyou.com"] = 58;
products["xtl.changyou.com"] = 59;
products["www.dragonoath2.com"] = 59;
products["ffo.changyou.com"] = 62;
products["eos.changyou.com"] = 63;
products["hz.changyou.com"] = 64;
products["asta.changyou.com"] = 65;
products["tsj.changyou.com"] = 65;
//平台
products["auth.changyou.com"]=301;
products["member.changyou.com"] = 302;
products["aq.changyou.com"] = 303;
products["anquan.changyou.com"] = 303;
products["protect.changyou.com"] = 304;
products["chong.changyou.com"]=305;

var access_id = ""; 
var first_visit = 0; 
var source_type = "";  
var engine_id = getCookie("engineid")==null?"":getCookie("engineid");  
var key_word = getCookie("keyword")==null?"":getCookie("keyword"); 
var product_id = -1; 
var last_product_id=-1;
var soft_link_domain = getCookie("softlinkdomain")==null?"":getCookie("softlinkdomain");  
var soft_link_page = getCookie("softlinkpage")==null?"":getCookie("softlinkpage");  
var mac_new=0;
var is_mobi=0;
if(getCookie("mac_new")!=null&&getCookie("mac_new")!=""){
   mac_new=getCookie("mac_new");
}else if(getCookie("macid")==null||getCookie("macid")==""){
   mac_new=1;
   setCookieByDate("mac_new",mac_new,NewDate(cookieLoseTime(1)));
}
function getParam(url,paramName) {
    var p = url.indexOf("?");
    if ( p != -1) {
        url = url.substr(p + 1);
    }
    
    var strs = url.split("&");
    var theRequest = new Object();
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
    }
    
    return theRequest[paramName]; 
}

function cyou_url(url) {
    if (url.substr(0, 7) == "http://") {
        url = url.substr(7)
    } else if (url.substr(0, 8) == "https://") {
        url = url.substr(8)
    }    
    return url
}
    
function cyou_domain(domain) {
    var d = cyou_url(domain);
    var p = d.indexOf("/");
    if(p > 0) {
        d = d.substr(0, p);
    }

    return d;
}
function returnBase(number, base){
    var convert = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    if (number < base) var output = convert[number];
    else {
        var MSD = '' + Math.floor(number / base);
        var LSD = number - MSD*base;
        if (MSD >= base) var output = this.returnBase(MSD,base) + convert[LSD];
        else var output = convert[MSD] + convert[LSD];
    }
    return output;
}
function getIntegerBits(val,start,end){
    var base16 = returnBase(val,16);
    var quadArray = new Array();
    var quadString = '';
    var i = 0;
    for(i=0;i<base16.length;i++){
        quadArray.push(base16.substring(i,i+1));    
    }
    for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
        if(!quadArray[i] || quadArray[i] == '') quadString += '0';
        else quadString += quadArray[i];
    }
    return quadString;
}
function rand(max){
    return Math.floor(Math.random() * max);
}
function createUUID() {
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var h = '';
    var tl = getIntegerBits(t,0,31);
    var tm = getIntegerBits(t,32,47);
    var thv = getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
    var csar = getIntegerBits(rand(4095),0,7);
    var csl = getIntegerBits(rand(4095),0,7);
    var n = getIntegerBits(rand(8191),0,7) + 
            getIntegerBits(rand(8191),8,15) + 
            getIntegerBits(rand(8191),0,7) + 
            getIntegerBits(rand(8191),8,15) + 
            getIntegerBits(rand(8191),0,15); // this last number is two octets long
    return tl + h + tm + h + thv + h + csar + csl + h + n; 
}
function getAccessId(){
    var access_id = getCookie("accessid");
    if(access_id == null || access_id == "") {
        first_visit = 1;
        access_id = createUUID(); 
        setCookie("accessid", access_id, null);
		var now = new Date();
		setCookie("accessid_settime",now.getTime(), null);
    }    
    return access_id;
}
function cyou_getMac() {
    var mac_id = getCookie("macid");
    if(mac_id == null || mac_id == "") {
        mac_id = createUUID();
        setCookie("macid", mac_id, 999999);
    }
    return mac_id;
}
function clear_msg() {
    engine_id = "";
    key_word = "";
    soft_link_domain = "";
    soft_link_page = "";
    
    setCookie("softlinkdomain",soft_link_domain,null);
    setCookie("softlinkpage",soft_link_page,null);
    setCookie("keyword",key_word,null);
    setCookie("engineid",engine_id,null);
}

function getSourceType() {
    var adid = get_adid_from_url();
    if(adid != null && adid != "") {
        clear_msg();
        source_type = "from_ad";  
    }else{        
        var current_product_id = getProductId();	
        var this_last_product_id=getLastProductId();	
        if(this_last_product_id != null && this_last_product_id != "" && this_last_product_id != -1 && current_product_id == this_last_product_id) {
            source_type = getCookie("sourcetype");
        }
        if(source_type == null || source_type == "") {
            var l_domain = cyou_domain(last_url); 
            var se_length = search_engine.length;
            for(var i=0; i<se_length; i++) {
                if(search_engine[i] == l_domain) {
                    source_type = "search_engine"; 
                    clear_msg();
                    key_word = getParam(last_url,search_key[i]);
                    engine_id = engine_ids[i];
                    
                    setCookie("keyword",key_word,null);
                    setCookie("engineid",engine_id,null);
                }
            }
            
            if(source_type == null || source_type == "") {  
                if(l_domain == null || l_domain == "" || l_domain.indexOf(domain_sub) > 0) {  
                    source_type = "direct_access"; 
                    clear_msg();
                } else {
                    source_type = "soft_link";  
                    clear_msg();
                    soft_link_domain = l_domain;
                    soft_link_page = last_url;
                    
                    setCookie("softlinkdomain",soft_link_domain,null);
                    setCookie("softlinkpage",soft_link_page,null);
                }
            }
        }		
    }    
    setCookie("sourcetype",source_type,null);
    return source_type;
}
function getLastProductId() {
    if(last_product_id == -1) {
        last_product_id = products[cyou_domain(last_url+"")];
        if(last_product_id == null || last_product_id == "") {
            last_product_id = -1;
        }
    }
    
    if(last_product_id!= -1) {
        setCookie("last_product_id", last_product_id, null);
    }
    setCookie("last_product_id",last_product_id, null);
    return last_product_id;
}
function getProductId() {
    if(product_id == -1) {
        product_id = products[cyou_domain(url + "")];
        if(product_id == null || product_id == "") {
            product_id = -1;
        }
    }
    
    if(product_id != -1) {
        setCookie("productid", product_id, null);
    }
    setCookie("productid", product_id, null);
    return product_id;
}
function getStayTime() {
    var stayTime = 0;
    var now = new Date();
    if(products[cyou_domain(last_url+"")] > 0 ) {
        var visittime = getCookie("visittime");        
        if(visittime != null && visittime != "") {            
            stayTime =Math.round((now.getTime() - visittime) / 1000);
        }
    }  
    if(cyou_if()=='top'){
      setCookie("visittime",now.getTime(),null);
    }
    return stayTime;
}
function getLastDomain() {
    var a = "";
    if (last_url && last_url != "") {
        if (last_url.indexOf("?") > 0) {
            a = last_url.substring(0, last_url.indexOf("?"))
        } else {
            a = last_url
        }
    }    
    return a;
}
function cyou_random() {
    var a = Math.round(Math.random() * 3364721474);
    return a;
}
function getCookie(a) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(a + "=");
        if (c_start != -1) {
            c_start = c_start + a.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return ""
}
function setCookie(b, c, a) {
    var d = new Date();
    d.setDate(d.getDate() + a);
    document.cookie = b + "=" + escape(c) + ((a == null) ? "": "; expires=" + d.toGMTString()) + "; path=/; domain=" + domain_sub;
}
function setCookieByDate(b, c, a) {   
    document.cookie = b + "=" + escape(c) + ((a == null) ? "": "; expires=" + a.toGMTString()) + "; path=/; domain=" + domain_sub;
}
function get_adid_from_url() {
    var a = "";
    if (query_str && query_str != "") {
        var b = query_str.match("rcc_id=[^&]*");
        if (b && b != "") {
            a = b[0].split("=")[1];
			is_rcc_id=true;
        }
    }
    if (a == "") {
        a = getCookie("adid");
    }
    return a;
}
(function() {
    var Client = function() {  
    var engine = { ie: 0, webkit: 0, gecko: 0, opera: 0, khtml: 0 };
    var browser = { se360: 0, se: 0, maxthon: 0, qq: 0, tt: 0, theworld: 0, cometbrowser: 0, greenbrowser: 0, ie: 0, chrome: 0, netscape: 0, firefox: 0, opera: 0, safari: 0, konq: 0 };
    var ua = navigator.userAgent.toLowerCase(); 
    for (var type in engine) {
         if (typeof type === 'string') {
            var regexp = 'gecko' === type ? /rv:([\w.]+)/ : RegExp(type + '[ \\/]([\\w.]+)');
             if (regexp.test(ua)) {
                 engine.version = window.opera ? window.opera.version() : RegExp.$1;
                 engine[type] = parseFloat(engine.version);
                 engine.type = type;
                 break;
             }
         }
    }    
    for (var type in browser) {
         if (typeof type === 'string') {
             var regexp = null;
             switch(type) {
                 case "se360": regexp = /360se(?:[ \/]([\w.]+))?/; break;
                 case "se": regexp = /se ([\w.]+)/; break;
                 case "qq": regexp = /qqbrowser\/([\w.]+)/; break;
                 case "tt": regexp = /tencenttraveler ([\w.]+)/; break;
                 case "safari": regexp = /version\/([\w.]+)/; break;
                 case "konq": regexp = /konqueror\/([\w.]+)/; break;
                 case "netscape": regexp = /navigator\/([\w.]+)/; break;
                 default: regexp = RegExp(type + '(?:[ \\/]([\\w.]+))?');
             }
             if (regexp.test(ua)) {
                 browser.version = window.opera ? window.opera.version() : RegExp.$1 ? RegExp.$1 : 'unknown';
                 browser[type] = parseFloat(browser.version);
                 browser.type = type;
                 break;
             }
         }
     }
     return { engine: engine, browser: browser };
     }();
     window.Client = Client;
 })();
function cyou_getBrowser() {
    var clientBrowser = 'Unknown';
    if(Client.browser.type == 'ie') {
        clientBrowser = 'IE '+Client.browser.version;
    } else {
        clientBrowser = Client.browser.type;
    }    
    return clientBrowser;
}
function cyou_getOS() {
    var sUserAgent = navigator.userAgent;

    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMobi = cyou_isMobi();

    var isUnix = (navigator.platform == "X11" && !isWin && !isMac);
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var isWin95 = isWin98 = isWinNT4 = isWin2K = isWinME = isWinXP = isWin2K3 = isVista = false;

    if(isWin){
        isWin95 = sUserAgent.indexOf("Win95") > -1 || sUserAgent.indexOf("Windows 95") >-1;
        isWin98 = sUserAgent.indexOf("Win98") > -1 || sUserAgent.indexOf("Windows 98") >-1;
        isWinME = sUserAgent.indexOf("Win 9x 4.90") > -1 || sUserAgent.indexOf("Windows ME") >-1;
        isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") >-1;
        isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") >-1;
        
        isWin2K3 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") >-1;
        isVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") >-1;
        if(!isWin2K3&&!isVista){
            isWinNT4 = (sUserAgent.indexOf("WinNT") > -1
                        || sUserAgent.indexOf("Windows NT") >-1
                        || sUserAgent.indexOf("WinNT4.0") >-1
                        || (sUserAgent.indexOf("Windows NT 4.0") >-1))
                        && (!isWinME&&!isWin2K&&!isWinXP);
        }
    }
    switch(true) { 
        case isMobi:
         return cyou_getPhoneOS();
        case isUnix:
         return "Unix";
        case isLinux:
            return "Linux";
        case isWin95:
         return "Windows 95";
        case isWin98:
         return "Windows 98";
        case isWinME:
         return "Windows ME";
        case isWin2K:
         return "Windows 2000";
        case isWinXP:
         return "Windows XP";
        case isWin2K3:
         return "Windows 2003";
        case isVista:
         return "Windows Vista";
        case isWinNT4:
         return "Windows NT";
        default:
         return "Unknown";
    }
}
function cyou_getUserlanguage() {
    var ul = "";
    if (navigator.language) {
        ul = navigator.language.toLowerCase()
    } else if (navigator.browserLanguage) {
        ul = navigator.browserLanguage.toLowerCase()
    }
    return typeof(ul) != 'undefined' ? ul: 'Unknown'
}
function cyou_getScreenSize() {
    var sr = "";
    if (self.screen) {
        sr = screen.width + "x" + screen.height
    } else if (self.java) {
        sr = java.awt.Toolkit.getDefaultToolkit().getScreenSize().width + "x" + java.awt.Toolkit.getDefaultToolkit().getScreenSize().height
    }
    return typeof(sr) != 'undefined' ? sr: 'Unknown'
}
function cyou_getColorDepth() {
    var sc = "";
    if (self.screen) {
        sc = screen.colorDepth + "-bit"
    }
    
    return typeof(sc) != 'undefined' ? sc: 'Unknown';
}
function cyou_getFlash() {
    var f = "";
    if (navigator.plugins && navigator.plugins.length) {
        for (var ii = 0; ii < navigator.plugins.length; ii++) {
            if (navigator.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
                f = navigator.plugins[ii].description.split('Shockwave Flash ')[1];
                break
            }
        }
    } else if (window.ActiveXObject) {
        for (var ii = 10; ii >= 2; ii--) {
            try {
                if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');")) {
                    f = ii + '.0';
                    ii = null;
                    break
                }
            } catch(e) {}
        }
    }
    if(typeof(f) == 'undefined'  || f == "") {
        return 'Unknown';
    } else {
        return f;
    }
}
function cyou_javaEnabled() {
    var je = "";
    je = navigator.javaEnabled() ? 1: 0;
    return typeof(je) != 'undefined' ? je: 'Unknown';
}

function cyou_if() {
    if (top.location == self.location) return 'top';
    return 'iframe';
}

function transformInterface(cn,regType,gameType,success,reason) {
    var msg = stat_url 
        + "location=" +  cyou_if() 
        + "&access_id=" + getAccessId() 
        + "&source_type=" + getSourceType() 
        + "&adid=" + get_adid_from_url() 
        + "&engine_id=" + engine_id 
        + "&soft_link_domain=" + soft_link_domain 
        + "&last_domain=" + getLastDomain()
        + "&current_domain=" + gameType
        + "&cn=" + cn
        + "&regType=" + regType 
        + "&success=" + success 
        + "&reason=" + reason;
    send(msg);    
}

function send(b) {
    img = new Image(1, 1);
    img.id = "cyou_ad_track";
    var a = cyou_random();
    img.src = b + "&cyou_rdm=" + a;
    img.onload = function() {
        is_posted = true;
        return
    }
}
function post_info() {
    adid = get_adid_from_url();
    last_domain = getLastDomain();
    if (!is_posted) {
        if (adid != "" && adid) {
            setCookie("adid", adid, 1);           
        }
        var visittime = getCookie("visittime");
        var flag =  domain_sub.match("cy.com");
	    var flag1 = domain_sub.match("dragonoath2.com");
		var flag2 = domain_sub.match("playcool.com");
        if((flag && flag != "")||(flag1 && flag1 != "")||(flag2 && flag2 !="")){
          document.write("<iframe style='display:none;' src='http://mon.changyou.com/cookie.html?adid=" + adid + "&visittime="+visittime+"' ></iframe>");
        }
        
        if (last_domain && last_domain != "") {
            setCookie("last_domain", last_domain, null)
        }
    }
    var current_domain = document.URL.replace(query_str, "");      
    var product_id = getProductId();	
	var last_product_id=getLastProductId();	
	var arrive_visit="0";
	if(is_rcc_id){
	   arrive_visit="1";
	}
	if(cyou_isMobi()){
	  is_mobi=1;
	}
	if(product_id>300){
	  stat_url=stat_url2;
	}
    var access_msg = stat_url
            + "location=" +  cyou_if() 
            + "&access_id=" + getAccessId() 
            + "&product_id=" + product_id 
			+ "&arrive_visit=" + arrive_visit
            + "&first_visit=" + first_visit
            + "&source_type=" + getSourceType() 
            + "&adid=" + adid 
            + "&engine_id=" + engine_id
            + "&key_word=" + key_word 
            + "&soft_link_domain=" + soft_link_domain
            + "&soft_link_page=" + soft_link_page
			+ "&last_product_id="+last_product_id
            + "&last_domain=" + getLastDomain()
            + "&current_domain=" + current_domain
            + "&stay_time=" + getStayTime() 
            + "&mac_id=" + cyou_getMac() 
			+ "&mac_new=" + mac_new
			+ "&is_mobi=" +is_mobi
            + "&browser=" + cyou_getBrowser()
            + "&os=" + cyou_getOS() 
            + "&user_language=" + cyou_getUserlanguage()
            + "&screen_size=" + cyou_getScreenSize()
            + "&color_depth=" + cyou_getColorDepth()
            + "&flash_version=" + cyou_getFlash()
            + "&java_enabled=" + cyou_javaEnabled();
    send(access_msg);
    var v_top_page="";		
    try{
       top.location.href;
       v_top_page=top.location;	
    }catch(ex){
       v_top_page="";}	
    try
    {
        var v_access_id = getCookie("accessid");
        var v_product_id = getCookie("productid");
        var v_source_type = getCookie("sourcetype");
        var v_engine_id = getCookie("engineid")
        var v_key_word = getCookie("keyword");
        var v_soft_link_domain = getCookie("softlinkdomain");
        var v_soft_link_page = getCookie("softlinkpage");
		var v_last_product_id=getCookie("last_product_id");	
		var v_mac_id = getCookie("macid");        	  
        var regok_msg = "adid_"  + getCookie("adid") 
            + "_access_id_" + v_access_id  
            + "_product_id_" + v_product_id 
            + "_source_type_" + v_source_type  
            + "_engine_id_" + v_engine_id
            + "_key_word_" + v_key_word 
            + "_soft_link_domain_" + v_soft_link_domain
            + "_soft_link_page_" + v_soft_link_page
			+ "_last_product_id_" +v_last_product_id
			+ "_last_domain_" +last_domain
			+ "_current_domain_" +current_domain
			+ "_top_page_"+v_top_page
			+ "_mac_id_"+v_mac_id
			+ "_mac_new_"+mac_new
            + "_method_" + method
            + "_sessionid_" + getCookie("Apache");
        setCookie("tongji", regok_msg, null);
    }
    catch(ex){}
    window.setTimeout(function(){checkAccessId();},2000000);
}
function checkAccessId(){
	 var beginTime=getCookie("accessid_settime");
	 var now=new Date();
	 var nowTime=now.getTime();
	 if((nowTime-beginTime)>=1800000){
          setCookie("accessid","", null);
          setCookie("visittime","", null);
	 }
}
function cyou_getPhoneOS(){
    var sUserAgent = navigator.userAgent;   
        isIpod = sUserAgent.indexOf("Ipod") > -1;
        isIphone = sUserAgent.indexOf("iphone") > -1;
        isAndroid = sUserAgent.indexOf("Android") > -1;
        isSymbian = sUserAgent.indexOf("symbian") > -1;
        isWince = sUserAgent.indexOf("win ce") > -1;        
        isJ2me = sUserAgent.indexOf("j2me") > -1;    
     switch(true) { 
        case isIpod:
         return "ios";
        case isIphone:
         return "ios";
        case isAndroid:
            return "android";
        case isSymbian:
         return "symbian";
        case isWince:
         return "wince";
        case isJ2me:
         return "j2me";        
        default:
         return "Unknown";
    }
}
function cookieLoseTime(day){
    var d = new Date();
    d.setDate(d.getDate()+day);
    var sdate = d.getFullYear() + '-';
    var month = d.getMonth()+1;
              if(month < 10) {
                        sdate += '0';
               }
    sdate += month + '-';
    var day = d.getDate();
    if(day < 10) {
            sdate += '0';
    }
   sdate += day;
   return sdate+" 00:00:00";
}
function NewDate(str){
      var part=str.split(' ');
      var fullYear=part[0].split('-');
      var fullTime=part[1].split(':');
      var year=fullYear[0];
      var month=fullYear[1]-1;
      var day=fullYear[2];
      var hour=fullTime[0];
      var minutes=fullTime[1];
      var seconds=fullTime[2];
      var thisDate=new Date(year,month,day,hour,minutes,seconds);
       return thisDate;
}
function cyou_isMobi(){
  var isMobi = navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|win ce)/i) != null;
  return isMobi;
}
post_info();