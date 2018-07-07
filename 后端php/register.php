<?php
//注册，接受name， id， university，返回true或false
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
$sql = "INSERT INTO registeruser (name, id, university)
VALUES ('$_POST[name]', '$_POST[id]', '$_POST[university]')";
//var_dump($_POST);
$result = $conn->query($sql);

if ($result)
	echo "t";
else
	echo "f";
?>