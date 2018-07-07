<?php
//删除自己发起的签到，接受FormID,将删除数据表里signin里面的一条FormID记录，同时删除所有表signinrecord中所有FormID的记录，返回“true”或“false“
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

//删除signin表中一条记录
$sql = "DELETE FROM signin WHERE FormID='$_POST[FormID]'";
$result1 = $conn->query($sql);

//var_dump(FormID);

//删除表signinrecord中所有FormID的记录
$sql = "DELETE FROM signinrecord WHERE FormID='$_POST[FormID]'";
$result2 = $conn->query($sql);

echo $result1 && $result2;
?>