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
?>