<?php
include("class.phpmailer.php");
include("class.smtp.php");
try
{
	$name = urldecode($_POST["name"]);
	$gender = urldecode($_POST["gender"]);
	$phone = urldecode($_POST["phone"]);
	$body = "收到来自 <strong>{$name}({$gender})</strong> 的预约<br/>联系方式: {$phone}";

	$mail = new PHPMailer;

	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.qq.com';						  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = '402843969@qq.com';                 // SMTP username
	$mail->Password = 'nferkapcsuozbjdh';                 // SMTP password
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;                                    // TCP port to connect to

	$mail->setFrom('402843969@qq.com', '西点金融运营团队');
	$mail->addAddress('westpointfinance@163.com', '');    // Add a recipient            // Name is optional
	$mail->addAddress('lb-drfto@163.com', '');            // Add a recipient            // Name is optional

	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = '客户预约';
	$mail->Body    = $body;
	$mail->Charset = "utf-8";

	$status = $mail->send();
	$data = array("status"=>$status);

	echo json_encode($data);
}
catch (Exception $exception)
{
	$data = array("status"=>false);
	echo json_encode($data);
    die();
}
?>
