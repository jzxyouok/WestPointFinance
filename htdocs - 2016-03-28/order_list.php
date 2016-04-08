<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh-CN">
<head>
	<title>西点金融 香港保险 预约人员列表</title>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
	<meta name="format-detection" content="telephone=no"/>
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<meta name="applicable-device" content="mobile">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="keywords" content="香港保险、香港保险产品">
	<meta name="description" content="慧择保险网为广大客户提供更为优质的香港保险产品，香港保险费率更低，保障更全，保额更高，投资回报高。立即预约，即可获得香港保险顾问一对一为您定制的投保计划书。">
	<link rel="shortcut icon" type="image/x-icon" href="http://images.hzins.com/short/hzh5/favicon.ico">
	<link rel="apple-touch-icon" href="http://images.hzins.com/short/hzh5/apple-touch-icon.png">
	<meta name="apple-mobile-web-app-title" content="慧择保险网">
	<!--<link rel="canonical" href="m.hzins.com/product/xianggangbaoxian/" />
	<link rel="stylesheet" href="http://activities.huizecdn.com/hz/touch/activities/2015/xianggangbaoxian1019/style.css?v=1.3"/>-->

<style type="text/css">
<-- * {
margin:0;
padding:0;
}
body {
background:#FFF;
font:12px Geneva, Arial, Helvetica, sans-serif #000;
line-height:1;
text-align:center;
}
a:link, a:visited {
text-decoration:none;
color:#000;
}
a:hover {
text-decoration:underline;
color:#39c;
}
img {
border:0;
}
select {
border:0;
}
ul, li {
list-style:none;
}
h1 {
font-size:14px;
font-weight:bold;
color:#444;
}
.list {
width:500px;
margin:0 auto;
}
.list ul {
background:url(images/row_bg.gif);
}
.list li {
height:25px;
line-height:25px;
text-align:left;
padding-left:10px;
}
.list li:nth-child(2n-1){
	background:#ccc;
}
-->
</style>
</head>
<body>
<div class="list">
<ul>
<li>姓名&nbsp;&nbsp;&nbsp; 性别 &nbsp; 联系电话 &nbsp 预约时间 </li>
<?php
try {
    $dbh = new PDO('mysql:host='.SAE_MYSQL_HOST_M.';port='.SAE_MYSQL_PORT.';dbname='.SAE_MYSQL_DB, SAE_MYSQL_USER, SAE_MYSQL_PASS);
    foreach($dbh->query('SELECT * from user_info') as $row) {
	
		 
         echo("<li>$row[1]&nbsp;&nbsp;&nbsp;$row[2] &nbsp; $row[3] &nbsp $row[4] </li>");
    }
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>

</ul>
</div>
</body>
</html>