<?php
//查看自己参与的所有签到，接受studentID，studentName，返回所有参与的签到信息，json数组形式返回
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
$sql = "SELECT * FROM signinrecord
WHERE studentID='$_POST[studentID]' AND studentName='$_POST[studentName]'";

//查询数据库，结果集保存在result中
$result = $conn->query($sql);

//保存所有含有本学生信息的signinrecord记录，
$arr = [];
//var_dump($arr);

//把数据库拿到的结果集转化成数组
if ($result){
	while ($row = $result->fetch_assoc())
		$arr[] = $row;
}
//var_dump($arr);
//echo "<br>";
//保存所有不同的FormID字段值的数组,目的是删去arr中重复的FormID
$formid = [];

foreach ($arr as $value){
	// if (!in_array($value['FormID'], $formid){
		 // $formid = $value['FormID'];
	// }
	//echo $value['FormID'];
	if (!in_array($value['FormID'], $formid)){
		$formid[] = $value['FormID'];
	}
		
}
//echo "<br>";
//var_dump($formid);
$result = [];   //返回给微信的参与签到信息数组

foreach ($formid as $value){
	$sql = "SELECT * FROM signin
WHERE FormID='$value'";
	$request = $conn->query($sql);	//查询结果集
	//echo "<br>";
	//var_dump($request);
	if ($request){
		//echo "aa";
		//var_dump($request);
		while ($row = $request->fetch_assoc())
			//var_dump($row);
			$result[] = $row;
	}
}

//var_dump($result);
//echo "<br>";
//var_dump($formid);
//echo "<br>";
//
//返回给微信的json数据，注意json接受的参数只能是数组或者对象
echo json_encode($result);
//var_dump($result);
?>