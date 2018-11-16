<?php
	/*
	get请求
	 */
      function httpGet($url){
	 $info=curl_init();
	 curl_setopt($info,CURLOPT_RETURNTRANSFER,true);
	 curl_setopt($info,CURLOPT_HEADER,0);
	 curl_setopt($info,CURLOPT_NOBODY,0);
	 curl_setopt($info,CURLOPT_SSL_VERIFYPEER, false);
	 curl_setopt($info,CURLOPT_SSL_VERIFYHOST, false);
	 curl_setopt($info,CURLOPT_URL,$url);
	 $output= curl_exec($info);
	 curl_close($info);
	 return $output;
	}
	/*
	post请求
	 */
	  function httpPost($url,$data){

          $ch = curl_init();// 创建一个新cURL资源
          curl_setopt($ch, CURLOPT_POST, 1);//设置请求为post;
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $data);// 添加post数据到请求中
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);//支持https请求
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//curl获取页面内容或提交数据，作为变量储存，而不是直接输出。
          curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json; charset=utf-8','Content-Length: ' . strlen($data)));
          $return_content=curl_exec($ch);// 抓取URL并把它传递给浏览器
          curl_close($ch);//关闭cURL资源，并且释放系统资源 
          return $return_content;
	}

	// 截取字符串 参数：字符串，长度 
	function mbStrSplit ($string, $len=1) {
		$start = 0;
		$strlen = mb_strlen($string);
		while ($strlen) {
			$array[] = mb_substr($string,$start,$len,"utf8");
			$string = mb_substr($string, $len, $strlen,"utf8");
			$strlen = mb_strlen($string);
		}
		return $array;
	}
/**
 * 删除非空目录的解决方案
 * @param  String $dirName 目录
 * @return [type]  返回删除目录
 */
function removeDir($dirName) { 
    if(! is_dir($dirName)) 
    { 
        return false; 
    } 
    $handle = @opendir($dirName); 
    while(($file = @readdir($handle)) !== false) 
    { 
        if($file != '.' && $file != '..') 
        { 
            $dir = $dirName . '/' . $file; 
            is_dir($dir) ? removeDir($dir) : @unlink($dir); 
        } 
    } 
    closedir($handle); 
      
    return rmdir($dirName) ; 
}
//php生成GUID-唯一码
function getGuid() {
 $charid = strtoupper(md5(uniqid(mt_rand(), true))); 
 
 $hyphen = chr(45);// "-" 
 $uuid = substr($charid, 0, 8).$hyphen 
 .substr($charid, 8, 4).$hyphen 
 .substr($charid,12, 4).$hyphen 
 .substr($charid,16, 4).$hyphen 
 .substr($charid,20,12);
 return $uuid; 
}
/**
* 自动解析编码读入文件
* @param string $file 文件路径
* @param string $charset 读取编码
* @return string 返回读取内容
*/
function auto_read($file, $charset='UTF-8') {
    $list = array('GBK', 'UTF-8', 'UTF-16LE', 'UTF-16BE', 'ISO-8859-1');
     $str = file_get_contents($file);
     foreach ($list as $item) {
        $tmp = mb_convert_encoding($str, $item, $item);
        if (md5($tmp) == md5($str)) {
             return mb_convert_encoding($str, $charset, $item);
         }
     }
    return "";
}
?>