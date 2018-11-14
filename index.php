<?php
/**
 * 对文件 路径进行编码
 *
 * @param string $path
 */
function encodePath($path)
{
    $tmp_array = explode('/', $path);
    foreach ($tmp_array as $key => $value){
        if ($value == '')           //删除空内容
            unset($tmp_array[$key]);
        $tmp_array[$key]=rawurlencode($value);
    }
    return implode("/", $tmp_array);
}

/**
 * 显示验证的输入窗口
 * @param string $user 用户名
 * @param string $pass 密码
 * @access public
 */
function webAuthenticate($user,$pass){
    if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])  || !isset($user)  || !isset($pass)  
        || $_SERVER['PHP_AUTH_USER']!=$user | $_SERVER['PHP_AUTH_PW']!=$pass 
        )
    {
        header('WWW-Authenticate: Basic realm="Authentication System"');
        header('HTTP/1.0 401 Unauthorized');
        echo "You must enter a valid login ID and password to access this resource ";
        exit;
    }
    return true;
}

if(!webAuthenticate("ggg","123"))        //验证用户
{
    die();
}
//2005-4-11
//显示当前目录下的文件
$_CONFIG["SiteName"]="文件下载系统 by  ggg  ";        //网站名称
$_CONFIG["SiteUrl"]="http://soft.zggo.com";            //网站地址

?>
<!DOCTYPE html>
<html>
<head>
<title><?php print($_CONFIG["SiteName"])." ".$_CONFIG["SiteUrl"];?></title>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
</head>

<body bgcolor="#FFFFFF" text="#000000">
<center><font color=#ee0000><?php print($_CONFIG["SiteName"]);?></font>
<br><a href=<?php print($_CONFIG["SiteUrl"]);?>><?php print($_CONFIG["SiteUrl"]);?></a></center>
<table border=1  width=98% align="center"  bordercolordark="#FFFFFF"  cellpadding="2" cellspacing="2">
<tr>
<?php

$_DIR_PATH="./";
echo strpos($_GET["dir"],"..");
//die();
if(!empty($_GET["dir"]) && strlen($_GET["dir"])>3 && ".."!=substr($_GET["dir"], 0, 2) && !(strpos($_GET["dir"],"..")>=0))
{
    $prevRealpath=dirname($_GET["dir"]);    //得到上一层的目录
    if(substr($_GET["dir"], -1) != '/')
    {    $_GET["dir"] .= '/';
    }
    $_DIR_PATH=$_GET["dir"];

    print($_DIR_PATH);
    //die();

    print("<td>当前目录路径：[<b>".$_DIR_PATH."</b>]</td>");
    print("<td align=right>");
    print("　<a href='?dir='>");
    print("[返回根目录]");
    print("</a>");
    
    print("　<a href='?dir=".rawurlencode($prevRealpath)."'>");
    print("返回上一层目录");
    print("</a>　");
    print("</td>");


}
$numb=0;
if(empty($_DIR_PATH))
    $DIRObject=dir("./");
else
    $DIRObject=dir($_DIR_PATH);


?>
</tr></table>

<table border=1  width=98% align="center"  bordercolordark="#FFFFFF"  cellpadding="2" cellspacing="2">

<?php

while($tmp_Str=$DIRObject->read())
{
    if($tmp_Str!="."&&$tmp_Str!="..")
    {
        $numb++;
        print("<tr>");


        if(is_dir($DIRObject->path.$tmp_Str))        //是目录
        {
            print("<td align=center>");
            print(strftime("%Y-%m-%d %H:%M:%S",filemtime($_DIR_PATH.$tmp_Str)));
            print(" </td>");
            print("<td>");
            print("<a href='?dir=".encodePath($_DIR_PATH.$tmp_Str)."'>");
            print("[<font color=red>目录</font>] ");
            print("</a>");
            print(" </td>");

            print("<td>");
            print("<a href='?dir=".encodePath($_DIR_PATH.$tmp_Str)."'>");
            print($tmp_Str);
            print("</a>");
            print(" </td>");
        }
        else    //其他显示的文件
        {
            if(strstr($tmp_Str,".php") || strstr($tmp_Str,".asp")  )    //不显示 .php .asp的文件
                continue;
            print("<td align=center>");
            print(strftime("%Y-%m-%d %H:%M:%S",filemtime($_DIR_PATH.$tmp_Str)));
            print(" </td>");

            print("<td>");
            print(filesize($_DIR_PATH.$tmp_Str)."");
            $kbSize=round(filesize($_DIR_PATH.$tmp_Str)/1000,2);
            $mbSize=round($kbSize/1000,2);
            if($mbSize>1)
                print("[".$mbSize."MB]");
            else
                print("[".$kbSize."KB]");
            print(" </td>");

            print("<td>");
            print("<a target=_blank href='".encodePath($_DIR_PATH.$tmp_Str)."'>");
            print($tmp_Str);    //$_DIR_PATH.
            print("</a>");
            print(" </td>");
        }

        print("</tr>");
        //if($numb%5==0)
        //    print("</tr><tr>");
    }
}
$DIRObject->close();


?>
</table>
</body>
</html>