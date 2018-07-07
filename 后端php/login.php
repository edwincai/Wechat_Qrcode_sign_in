<?php
//启动的时候，连接服务器查询是否是已注册用户，接受name和id，返回true或false
header("Content-type:text/html;charset=utf-8");    //设置php连接数据库用utf8编码，不然中文乱码
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
$conn->query("set names utf8");	//设置php连接数据库用utf8编码，不然中文乱码
$sql = "SELECT * FROM registeruser
WHERE name='$_POST[name]' AND id='$_POST[id]'";

$result = $conn->query($sql);

if ($resul)
	echo "t";
else
	echo "f";

var_dump($result);
?>