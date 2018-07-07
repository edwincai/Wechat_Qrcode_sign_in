<?php
//查看自己发起的所有签到，接受FormerID，返回自己发起的所有签到，json数组形式返回
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
//$date = date("Y/m/d H:i:s", time() + 3600 * 6);	//时间比本地时间慢了6个小时，加上
//var_dump($date);
/* $sql = "INSERT INTO sign (name, date)
VALUES ('语文', '$date')";
$result = $conn->query($sql); */
//var_dump($result);

/* $conn = new mysqli($servername, $username, $password, $dbname);
$sql = "SELECT * FROM Myguests";
$result = $conn->query($sql); */

$sql = "SELECT * FROM signin
WHERE FormerID='$_POST[FormerID]'";
//var_dump($_POST);

//查询数据库，结果集保存在result中
$result = $conn->query($sql);

//json化此数组，返回数据给微信
$arr = [];
//var_dump($arr);

//把数据库拿到的结果集转化成数组
if ($result){
	while ($row = $result->fetch_assoc())
		$arr[] = $row;
}
//echo $arr[];
//var_dump($arr);
//var_dump(json_encode($arr));
//$a = ['1'=>1, '2'=>['2'=>34, '3a'=>'da'], '3v'=>'bgf'];
//var_dump($a);
//var_dump(json_encode($a));

//返回给微信的json数据，注意json接受的参数只能是数组或者对象
echo json_encode($arr);
$conn->close();
?>