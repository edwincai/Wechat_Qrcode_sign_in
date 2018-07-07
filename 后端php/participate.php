<?php
//参与签到，接受FormID，studentID, studentName, topic返回true或false
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
$sql = "INSERT INTO signinrecord 
VALUES ('$_POST[FormID]', '$_POST[studentID]', '$_POST[studentName]', '$_POST[topic]')";

$result = $conn->query($sql);
//echo $result;
//var_dump($result);
echo json_encode($_POST);
?>