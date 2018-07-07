<?php
//发起签到，接受FormID，startTime， endTime，FormerID, topic, content,返回true或false
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
$sql = "INSERT INTO signin 
VALUES ('$_POST[FormID]', '$_POST[startTime]', '$_POST[endTime]', '$_POST[FormerID]', '$_POST[topic]', '$_POST[content]')";

$result = $conn->query($sql);
var_dump($result);
var_dump($_POST);
echo $_POST;
?>