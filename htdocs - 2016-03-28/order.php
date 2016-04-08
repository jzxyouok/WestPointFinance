
<?php
try {
	

    $dbh = new PDO('mysql:host='.SAE_MYSQL_HOST_M.';port='.SAE_MYSQL_PORT.';dbname='.SAE_MYSQL_DB, SAE_MYSQL_USER, SAE_MYSQL_PASS);
   // $dbh->exec("INSERT INTO user_info(name,gender,phone_num,order_time) values('"+$_POST["name"]+"','"+$_POST["gender"]+"','"+$_POST["phone"]+"',now())");
   //echo("INSERT INTO user_info(name,gender,phone_num,order_time) values('"+$_POST["name"]."','".$_POST["gender"]."','".$_POST["phone"]."',now())");
    $dbh->exec("INSERT INTO user_info(name,gender,phone_num,order_time) values('".urldecode($_POST["name"])."','".urldecode($_POST["gender"])."','".$_POST["phone"]."',now())");
    $dbh = null;
	$data = array("status"=>"true");
	echo json_encode($data);
} catch (PDOException $e) {
    //print "Error!: " . $e->getMessage() . "<br/>";
	$data = array("status"=>"false");
	echo json_encode($data);
    die();
}
?>
